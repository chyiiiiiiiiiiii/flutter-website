---
title: Android ActivityControlSurface attachToActivity 方法簽名變更
description: >
  attachToActivity 的 activity 參數已從 Activity
  改為 ExclusiveAppComponent。
---

{% render docs/breaking-changes.md %}

## 摘要

:::note
如果你使用標準的 Android 嵌入式 Java 類別，例如
[`FlutterActivity`][`FlutterActivity`] 或 [`FlutterFragment`][`FlutterFragment`]，
且沒有在自訂的 `Activity` 中手動嵌入 [`FlutterView`][`FlutterView`]
（這種情況應該很少見），
你可以不用繼續閱讀。
:::

新增了一個 [`ActivityControlSurface`][`ActivityControlSurface`] 方法：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

正在取代現已棄用的方法：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

帶有`Activity`參數的現有已棄用方法已於 Flutter 2 中移除。

## 背景

為了讓自訂 Activity 也能提供 Flutter 套件所需的`Activity`生命週期事件，並透過 [`ActivityAware`][`ActivityAware`] 介面， [`FlutterEngine`][`FlutterEngine`] 提供了一個 [`getActivityControlSurface()`][`getActivityControlSurface()`] API。

這讓自訂 Activity 能夠向引擎（它與引擎有`(0|1):1`關係）發出訊號，表示其已被附加或從引擎分離。

:::note
當你使用引擎內建的 [`FlutterActivity`][`FlutterActivity`] 或 [`FlutterFragment`][`FlutterFragment`] 時，這些生命週期訊號會自動處理，這也是最常見的情境。
:::

然而，先前的 API 有一個缺陷，就是未強制限制多個 Activity 同時連接到引擎，因此可能導致 Activity 與引擎之間產生`n:1`關係，進而引發生命週期交叉干擾的問題。

## 變更說明

自 [Issue #21272][Issue #21272] 起，不再建議透過以下方式將你的 Activity 附加到 [`FlutterEngine`][`FlutterEngine`]：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

API，該 API 現已被棄用，請改用：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

現在預期傳入的是 `ExclusiveAppComponent<Activity>` 介面，而非 `Activity`。
`ExclusiveAppComponent<Activity>` 提供了一個回呼（callback），
當你的專屬 activity 被其他 activity 取代、並且有其他 activity 附加到 `FlutterEngine` 時，會觸發該回呼。

```java
void detachFromActivity();
```

API 保持不變，您仍然需要在自訂的 activity 被自然銷毀時呼叫它。

## 遷移指南

如果您有自己的 activity 持有 [`FlutterView`][`FlutterView`]，請將呼叫：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

呼叫以下方法時：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

在你透過呼叫 [`getActivityControlSurface()`][`getActivityControlSurface()`] 於 [`FlutterEngine`][`FlutterEngine`] 所取得的 [`ActivityControlSurface`][`ActivityControlSurface`] 上。

請使用 `ExclusiveAppComponent<Activity>` 將你的 activity 包裝起來，並實作 callback 方法：

```java
void detachFromFlutterEngine();
```

以處理您的 activity 被另一個 activity 取代時，
被附加到 [`FlutterEngine`][`FlutterEngine`]。
通常，您會希望執行與 activity 被自然銷毀時相同的卸除操作。

## 時程

合併至版本：1.23.0-7.0.pre<br>  
穩定版本釋出：2.0.0

## 參考資料

動機問題回報：[Issue #66192][Issue #66192]—非專屬
UI 元件（UI components）附加到 FlutterEngine 會導致
事件串擾（event crosstalk）


[`ActivityAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityAware.html
[`ActivityControlSurface`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityControlSurface.html
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterEngine`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterView`]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[`getActivityControlSurface()`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html#getActivityControlSurface--
[Issue #66192]: {{site.repo.flutter}}/issues/66192.
[Issue #21272]: {{site.repo.engine}}/pull/21272
