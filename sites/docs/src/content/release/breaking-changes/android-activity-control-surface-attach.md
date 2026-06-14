---
title: Android ActivityControlSurface attachToActivity 簽章變更
description: >
  attachToActivity 的 activity 參數已從 Activity
  改為 ExclusiveAppComponent。
---

{% render "docs/breaking-changes.md" %}

## 摘要

:::note
如果你是使用標準的 Android 嵌入式 Java 類別，例如
[`FlutterActivity`][] 或 [`FlutterFragment`][]，
且沒有在自訂的 `Activity` 中手動嵌入 [`FlutterView`][]
（這種情況應該很少見），
你可以不用再繼續閱讀。
:::

新增了一個 [`ActivityControlSurface`][] 方法：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

正在取代現已棄用的方法：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

既有已棄用、帶有 `Activity` 參數的方法已於 Flutter 2 中移除。

## 背景

為了讓自訂 Activity 也能提供 Flutter 插件所需的 `Activity` 生命週期事件（lifecycle events），並透過 [`ActivityAware`][] 介面，[`FlutterEngine`][] 提供了一個 [`getActivityControlSurface()`][] API。

這讓自訂 Activity 能夠向引擎（其與引擎有 `(0|1):1` 關係）發出訊號，表示它已被附加（attached）或卸除（detached）於引擎。

:::note
當你使用引擎內建的 [`FlutterActivity`][] 或 [`FlutterFragment`][] 時，這些生命週期訊號會自動處理，這也是最常見的情境。
:::

然而，先前的 API 有一個缺陷：它未強制排他性，允許多個 Activity 同時連接到引擎，從而產生 `n:1` 關係，導致生命週期交叉干擾的問題。

## 變更說明

自 [Issue #21272][] 起，請不要再透過以下方式，將你的 Activity 附加到 [`FlutterEngine`][]：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

此 API 現已棄用，請改用：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

現在預期使用 `ExclusiveAppComponent<Activity>` 介面，而不是 `Activity`。
`ExclusiveAppComponent<Activity>` 提供了一個回呼（callback），
以便當你的專屬 activity 被
另一個 activity 附加到 `FlutterEngine` 時能收到通知。

```java
void detachFromActivity();
```

此 API 保持不變，你仍然需要在自訂 activity 被自然銷毀時呼叫它。

## 遷移指南

如果你有自己的 activity 持有 [`FlutterView`][]，請將以下呼叫：

```java
void attachToActivity(@NonNull Activity activity, @NonNull Lifecycle lifecycle);
```

替換為：

```java
void attachToActivity(
    @NonNull ExclusiveAppComponent<Activity> exclusiveActivity,
    @NonNull Lifecycle lifecycle);
```

在你透過呼叫 [`getActivityControlSurface()`][] 於 [`FlutterEngine`][] 上所取得的 [`ActivityControlSurface`][] 上進行呼叫。

請使用 `ExclusiveAppComponent<Activity>` 將你的 activity 包裹起來，並實作回呼方法：

```java
void detachFromFlutterEngine();
```

以處理你的 activity 被另一個 activity 替換並附加到 [`FlutterEngine`][] 的情境。
一般來說，你需要執行與 activity 被自然銷毀時相同的卸除（detaching）操作。

## 時程

合併進版本：1.23.0-7.0.pre<br>
正式版釋出：2.0.0

## 參考資料

相關問題：[Issue #66192][]—非專屬 UI 元件附加到 FlutterEngine 會導致事件串擾（event crosstalk）


[`ActivityAware`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityAware.html
[`ActivityControlSurface`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/activity/ActivityControlSurface.html
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterEngine`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterView`]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[`getActivityControlSurface()`]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html#getActivityControlSurface--
[Issue #66192]: {{site.repo.flutter}}/issues/66192.
[Issue #21272]: {{site.repo.engine}}/pull/21272
