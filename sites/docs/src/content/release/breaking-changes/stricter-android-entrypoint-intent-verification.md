---
title: 更嚴格的 Android `Intent` 應用程式進入點驗證
description: >-
  用於路由、進入點與快取引擎的 Android `Intent` extras
  現在會受到嚴格驗證。
---

{% render "docs/breaking-changes.md" %}

## 摘要

為了防止基於 [`Intent`][] 的漏洞攻擊，
Flutter Android embedder
（`FlutterActivity` 與 `FlutterFragmentActivity`）
現在會在處理 `EXTRA_INITIAL_ROUTE`、`EXTRA_DART_ENTRYPOINT`、
`EXTRA_DART_ENTRYPOINT_ARGS`、`EXTRA_CACHED_ENGINE_ID`
以及 `EXTRA_CACHED_ENGINE_GROUP_ID` 之前，
先驗證 `Intent` 物件的發送者。

在 release 模式下，除非能驗證 `Intent` 來自應用程式本身，
否則外部的 `Intent` 物件無法設定這些 extras。
如果驗證失敗，embedder 會忽略這些 extras，
並針對初始路由與 Dart 進入點，
改用 manifest metadata 或預設值。

## 背景

過去，Flutter Android embedder 會直接接受來自 `Intent` extras 的
路由、進入點與引擎設定。
這使得外部應用程式或惡意攻擊者能夠：

1. 劫持應用程式導航，進入敏感的內部路由
   （`EXTRA_INITIAL_ROUTE`）。
1. 執行任意的 Dart 進入點，或傳入不安全的引數
   （`EXTRA_DART_ENTRYPOINT` 與 `EXTRA_DART_ENTRYPOINT_ARGS`）。
1. 重複使用已啟動且已通過身分驗證的記憶體內引擎實例
   （`EXTRA_CACHED_ENGINE_ID` 與 `EXTRA_CACHED_ENGINE_GROUP_ID`）。

為了修補這些漏洞，Flutter 現在會驗證 `Intent` 的發送者。
Deep link 仍然受到支援，
但必須符合你在 `AndroidManifest.xml` 中宣告的
`<intent-filter>`。

## 變更說明

在 release 建置中，Android embedder 會嚴格驗證 `Intent` extras：
`"route"`、`"dart_entrypoint"`、`"dart_entrypoint_args"`、
`"cached_engine_id"` 與 `"cached_engine_group_id"`。

### Intent 驗證規則

符合下列任一條件的 `Intent` 會被視為安全：

* **Activity 未對外公開 (not exported)：**
  設定為 `android:exported="false"` 的 Activity 會自動被信任。
* **Android 14 及以上版本（API 34+）：**
  啟動來源的 UID 與應用程式的 UID 相符（`getLaunchedFromUid()`）。
* **Android 13 及以下版本（API 33 及更低）：**
  呼叫端的套件與應用程式套件相符（`getCallingPackage()`）。
  這需要使用 `startActivityForResult()`
  或 `startActivityIfNeeded()` 來啟動。

對於 deep link（`Intent.ACTION_VIEW`），
連結 URI 必須符合應用程式 manifest 中宣告的 `<intent-filter>`，
除非該 `Intent` 已被驗證為應用程式自行發送。

### 後備行為

如果 release 建置中的驗證失敗，這些 extras 會被忽略：

* **初始路由（`EXTRA_INITIAL_ROUTE`）：**
  改用命令列引數，或 `AndroidManifest.xml` 中的
  `io.flutter.InitialRoute` metadata。
  如果兩者皆未指定，則預設為 `"/"`。
* **Dart 進入點（`EXTRA_DART_ENTRYPOINT`）：**
  改用 `AndroidManifest.xml` 中的 `io.flutter.Entrypoint` metadata。
  如果未指定，則預設為 `"main"`。
* **進入點引數（`EXTRA_DART_ENTRYPOINT_ARGS`）：**
  會被忽略，並回傳 `null`。
* **快取引擎 ID（`EXTRA_CACHED_ENGINE_ID` 與
  `EXTRA_CACHED_ENGINE_GROUP_ID`）：**
  會被忽略，並回傳 `null`。

### debug 與 profile 模式下的行為

在 debug 與 profile 建置中，
embedder 會略過驗證，以保留開發者工具
（例如 `adb shell am start`）與自動化測試的運作。
不過，如果 `Intent` 驗證失敗，
embedder 會記錄一則警告，
內容包含目標元件、intent extras 與遷移指示。

## 遷移指南

在下列情況下，你不需要進行遷移：

* 你沒有在 `Intent` 中傳遞 `route`、`dart_entrypoint`、
  `dart_entrypoint_args`、`cached_engine_id` 或 `cached_engine_group_id` extras。
* 你的目標 `FlutterActivity` 或 `FlutterFragmentActivity`
  未對外公開（`android:exported="false"`）。

如果你會將這些 extras 傳給已對外公開的 Activity，
請從下列遷移策略中擇一：

### 將宿主 Activity 設為不對外公開

如果外部應用程式不需要直接開啟你的 Activity，
請在 `AndroidManifest.xml` 中設定 `android:exported="false"`：

```xml title="AndroidManifest.xml"
<activity
    android:name=".MyFlutterActivity"
    android:exported="false">
</activity>
```

:::note
你應用程式的主要啟動 Activity（具有 `ACTION_MAIN`
與 `CATEGORY_LAUNCHER`）必須維持對外公開，
這樣系統啟動器才能啟動你的應用程式。
:::

### 改用 deep link 進行外部路由

若要從外部來源、捷徑或通知路由到特定畫面，
請使用標準的 [deep link][deep links]，而不是 `EXTRA_INITIAL_ROUTE`：

```java
Intent intent = new Intent(context, MainActivity.class);
intent.setAction(Intent.ACTION_VIEW);
intent.setData(Uri.parse("myapp://product_details"));
```

請在 `AndroidManifest.xml` 中宣告對應的 `<intent-filter>` 項目，
讓 embedder 能夠驗證傳入的 URL。

### 在 AndroidManifest.xml 中宣告進入點與路由

對於靜態的進入點或初始路由，
請在 `AndroidManifest.xml` 中將它們宣告為 `<meta-data>`：

```xml title="AndroidManifest.xml"
<activity 
    android:name=".MyFlutterActivity"
    android:exported="true">
    <meta-data
        android:name="io.flutter.Entrypoint"
        android:value="myCustomEntrypoint" />
    <meta-data
        android:name="io.flutter.InitialRoute"
        android:value="/customRoute" />
</activity>
```

### 在 Android 13 及以下版本使用 startActivityForResult

對於在 Android 13 及以下版本中，
由應用程式內部啟動已對外公開的 Activity，
請呼叫 `startActivityForResult()` 取代 `startActivity()`：

```diff
- startActivity(intent);
+ startActivityForResult(intent, REQUEST_CODE);
```

這會填入 `getCallingPackage()`，讓 embedder 能夠驗證
該 `Intent` 來自你的應用程式。
你不需要在 `onActivityResult()` 中處理結果。

### 在 Activity 子類別中覆寫設定方法

若要在不依賴 `Intent` extras 的情況下提供動態進入點或引數，
請建立 `FlutterActivity` 或 `FlutterFragmentActivity` 的子類別，
並覆寫設定方法：

```java
public class MyFlutterActivity extends FlutterActivity {
    @NonNull
    @Override
    public String getDartEntrypointFunctionName() {
        return ConfigManager.getEntrypoint(); 
    }
    
    @Nullable
    @Override
    public List<String> getDartEntrypointArgs() {
        return ConfigManager.getArgs();
    }
}
```

## 時程

登陸版本：3.50.0-0.1.pre<br>
穩定版釋出：尚未

## 參考資料

* [Android `Intent` 篩選器][Android `Intent` filters]
* [設定 Flutter Android deep link][Set up Flutter Android deep links]

相關 issue：

* [Issue 190450][]
* [Issue 190452][]

相關 PR：

* [PR 190249][]

[`Intent`]: https://developer.android.com/reference/android/content/Intent
[deep links]: /cookbook/navigation/set-up-app-links
[intent filters]: https://developer.android.com/guide/components/intents-filters
[Android `Intent` filters]:
https://developer.android.com/guide/components/intents-filters
[Set up Flutter Android deep links]: /cookbook/navigation/set-up-app-links
[Issue 190450]: https://github.com/flutter/flutter/issues/190450
[Issue 190452]: https://github.com/flutter/flutter/issues/190452
[PR 190249]: https://github.com/flutter/flutter/pull/190249

