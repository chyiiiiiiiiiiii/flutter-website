---
title: 將 Flutter View 加入 Android 應用程式
shortTitle: 透過 FlutterView 整合
description: 了解如何透過 Flutter View 進行進階整合。
---

:::warning
透過 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 進行整合
屬於進階用法，需要手動建立自訂、專屬於應用程式的綁定。
:::

透過 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 進行整合
比起前面介紹的 FlutterActivity 和 FlutterFragment，需要多做一些額外的工作。

從根本上來說，Dart 端的 Flutter 框架需要存取各種與 Activity 相關的事件與生命週期，才能正常運作。由於 FlutterView（即 [android.view.View]({{site.android-dev}}/reference/android/view/View.html)）
可以被加入到任何由開發者應用程式所擁有的 Activity 中，而 FlutterView 本身無法取得 Activity 層級的事件，因此開發者必須手動將這些連結橋接到 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)。

你選擇如何將應用程式 Activity 的事件傳遞給 FlutterView，將會依你的應用程式而有所不同。

## 範例

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-view/add-view-sample.webp' alt="Add Flutter View sample video">

與 FlutterActivity 和 FlutterFragment 的教學不同，FlutterView 的整合更適合透過範例專案來展示。

有一個範例專案位於 [https://github.com/flutter/samples/tree/main/add_to_app/android_view]({{site.repo.samples}}/tree/main/add_to_app/android_view)，
說明如何簡單地整合 FlutterView，如上方 gif 所示，FlutterView 被用於 RecycleView 卡片清單中的部分 cell。

## 一般做法

FlutterView 層級整合的一般要點在於，你必須在自己的應用程式程式碼中，
重新建立 Activity、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
以及
[`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)
與 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java) 之間的各種互動。
在
[`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
中建立的連結，在使用
[`FlutterActivity`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html)
或
[`FlutterFragment`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html)
時會自動完成，
但由於這裡的 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
是被加入到你應用程式的 `Activity` 或 `Fragment` 中，
因此你必須手動建立這些連結。
否則，[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
將無法渲染任何內容，或會缺少其他功能。

一個範例
[`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
類別展示了如何在 `Activity`、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
與 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 之間建立應用程式專屬的連結。

### 需實作的 API

讓 Flutter 至少能夠繪製任何內容的最低限度實作如下：

* 當 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
  被加入到已恢復（resumed）的 `Activity` 的 view 階層且可見時，呼叫 [`attachToFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#attachToFlutterEngine-io.flutter.embedding.engine.FlutterEngine-)；
* 當承載 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 的 `Activity` 可見時，呼叫 [`appIsResumed`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html#appIsResumed--)
  於 [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 的 `lifecycleChannel` 欄位。

相反地，
[`detachFromFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#detachFromFlutterEngine--)
以及 [`LifecycleChannel`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html)
類別中的其他生命週期方法，也必須在 `FlutterView` 或 `Activity` 不再可見時呼叫，以避免資源洩漏。

此外，請參考
[`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
範例類別或
[`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
中的其餘實作，以確保剪貼簿、系統 UI 覆蓋層、插件等其他功能能正常運作。
