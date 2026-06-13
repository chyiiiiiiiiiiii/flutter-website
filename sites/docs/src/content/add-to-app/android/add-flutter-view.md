---
title: 將 Flutter View 加入 Android 應用程式
shortTitle: 透過 FlutterView 整合
description: 學習如何透過 Flutter View 進行進階整合。
---

:::warning
透過 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 進行整合
屬於進階用法，並需要手動建立自訂、應用程式專屬的綁定。
:::

透過 [FlutterView]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 進行整合
比起前述透過 FlutterActivity 與 FlutterFragment 的方式，需要多做一些工作。

從根本上來說，Dart 端的 Flutter framework 需要存取各種 activity 層級的事件與生命週期，才能正常運作。由於 FlutterView（即 [android.view.View]({{site.android-dev}}/reference/android/view/View.html)）
可以被加入到開發者應用程式所擁有的任何 activity 中，而 FlutterView 並無法直接存取 activity 層級的事件，因此開發者必須手動將這些事件橋接到 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)。

你要如何將應用程式 activity 的事件傳遞給 FlutterView，會依你的應用程式而有所不同。

## 範例

<img src='/assets/images/docs/development/add-to-app/android/add-flutter-view/add-view-sample.webp' alt="Add Flutter View sample video">

與 FlutterActivity 和 FlutterFragment 的教學不同，FlutterView 的整合更適合以範例專案來說明。

有一個範例專案位於 [https://github.com/flutter/samples/tree/main/add_to_app/android_view]({{site.repo.samples}}/tree/main/add_to_app/android_view)，
展示了一個簡單的 FlutterView 整合，如上方 gif 所示，FlutterView 被用於 RecycleView 卡片清單中的部分 cell。

## 一般做法

FlutterView 層級整合的一般要點是，你必須在自己的應用程式程式碼中，重新建立 Activity、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
以及 [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)
與 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
之間的各種互動。
這些連結在 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
中，若使用 [`FlutterActivity`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html)
或 [`FlutterFragment`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html)
時會自動完成，但由於這裡的 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
是被加入到你應用程式中的 `Activity` 或 `Fragment`，
因此你必須手動建立這些連結。
否則，[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
將無法渲染任何內容，或會缺少其他功能。

一個範例 [`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
類別展示了如何在 `Activity`、[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
與 [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)
之間，建立應用程式專屬連結的實作方式。

### 需要實作的 API

為了讓 Flutter 至少能夠繪製任何內容，最基本的實作需求如下：

* 當 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
  被加入到一個已恢復（resumed）`Activity` 的 view 階層且可見時，呼叫 [`attachToFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#attachToFlutterEngine-io.flutter.embedding.engine.FlutterEngine-)；
* 當承載 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
  的 `Activity` 可見時，呼叫 [`appIsResumed`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html#appIsResumed--)
  於 [`FlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 的 `lifecycleChannel` 欄位。

相反地，[`detachFromFlutterEngine`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html#detachFromFlutterEngine--)
以及 [`LifecycleChannel`]({{site.api}}/javadoc/io/flutter/embedding/engine/systemchannels/LifecycleChannel.html)
類別中的其他生命週期方法，也必須在 `FlutterView` 或 `Activity` 不再可見時呼叫，以避免資源洩漏。

此外，請參考 [`FlutterViewEngine`]({{site.repo.samples}}/blob/main/add_to_app/android_view/android_view/app/src/main/java/dev/flutter/example/androidView/FlutterViewEngine.kt)
範例類別或 [`FlutterActivityAndFragmentDelegate`](https://cs.opensource.google/flutter/engine/+/main:shell/platform/android/io/flutter/embedding/android/FlutterActivityAndFragmentDelegate.java)
中的其餘實作，以確保剪貼簿、系統 UI 覆蓋層、外掛（plugin）等其他功能能正確運作。

## 內容尺寸 View

通常，[`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html)
需要透過自身尺寸或匹配父層尺寸來設定固定的大小。這可以在[範例專案]({{site.repo.samples}}/tree/main/add_to_app/android_view/android_view)中看到。
然而，現在也可以讓 `FlutterView` 根據其內容自動調整大小。透過對高度或寬度使用 `content_wrap`，`FlutterView` 便能依內容調整大小，如[內容尺寸範例專案]({{site.repo.samples}}/tree/main/add_to_app/android_view/content_sizing_android_view)所示。

* 若要在部署應用程式時_啟用_內容尺寸 View，
  請在專案的 `AndroidManifest.xml` 檔案中 `<application>` 標籤下
  加入以下設定：
  
```xml
<meta-data
  android:name="io.flutter.embedding.android.EnableContentSizing"
  android:value="true" />
```

### 限制

由於內容尺寸 Flutter View 要求你的 Flutter 應用程式能夠自行調整大小，
因此部分元件 (Widget) 不受支援。

* 尺寸無界的元件，例如 `ListView`。
* 將尺寸交由子元件決定的元件，例如 `LayoutBuilder`。

實際上，這意味著許多常用元件不受支援，
例如 `ScaffoldBuilder`、`CupertinoTimerPicker`，
或任何內部依賴 `LayoutBuilder` 的元件。
若不確定某個元件是否適用，可以使用 `UnconstrainedBox` 來測試
該元件是否能夠用於內容尺寸 View，如下列範例所示：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context)
  => MaterialApp(home: MyPage());
}

class MyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: UnconstrainedBox(
          // TODO: Edit this line to check if a widget
          // can cause problems with content-sized views.
          child: Text('This works!'),
          // child: Column(children: [Column(children: [Expanded(child: Text('This blows up!'))])]),
          // child: ListView(children: [Text('This blows up!')]),
        )
    );
  }
}
```
