---
title: 在清單上方放置浮動 app bar
description: 如何在清單上方放置浮動 app bar 或導覽列。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/lists/floating_app_bar/"?>

本指南說明如何在 Flutter 應用程式中，將浮動 app bar 或
導覽列放置於清單上方。

## 概述

為了讓使用者更方便瀏覽項目清單，
你可能會希望在使用者向下捲動清單時，
將 app bar（導覽列）最小化。

將 app bar 移入 [`CustomScrollView`][`CustomScrollView`] 可以
讓你建立一個可最小化或在捲動清單時
隨著內容一起捲出螢幕外的 app bar，
而這些清單項目都包含在 `CustomScrollView` 之中。

本教學將示範如何使用 `CustomScrollView`，
在頂部顯示一個 app bar，並在使用者向下捲動清單時
自動最小化。步驟如下：

  1. 建立 `CustomScrollView`。
  2. 在 `CustomScrollView` 中加入浮動 app bar。
  3. 在 `CustomScrollView` 中加入項目清單。

## 1. 建立 `CustomScrollView`

要建立浮動 app bar，請將 app bar 放入
同時包含項目清單的 `CustomScrollView` 中。
這樣可以同步 app bar 與清單的捲動位置。
你可以將 `CustomScrollView` 元件（Widget）
想像成一個能讓你混合搭配不同類型可捲動清單與元件的
`ListView`。

提供給 `CustomScrollView` 的可捲動清單與元件稱為 _slivers_。
sliver 有多種類型，例如 `SliverList`、`SliverGrid` 和
`SliverAppBar`。事實上，`ListView` 與 `GridView`
元件就是透過 `SliverList` 和 `SliverGrid` 元件來
實作捲動功能。

在這個範例中，請建立一個包含
`SliverList` 的 `CustomScrollView`。如果你的程式碼中
已經有 app bar 屬性，請將其移除。

{% tabs "device-type-tabs" %}

{% tab "Material widgets" %}

<?code-excerpt "lib/starter_material.dart (CustomScrollView)" replace="/^return const //g"?>
```dart
MaterialApp(
  title: 'Floating App Bar',
  home: Scaffold(
    // No app bar property provided yet.
    body: CustomScrollView(
      // Add the app bar and list of items as slivers in the next steps.
      slivers: <Widget>[],
    ),
  ),
);
```

{% endtab %}

{% tab "Cupertino 元件 (Widgets)" %}

<?code-excerpt "lib/starter_cupertino.dart (CustomScrollView)" replace="/^return const //g"?>
```dart
CupertinoApp(
  title: 'Floating Navigation Bar',
  home: CupertinoPageScaffold(
    // No navigation bar property provided yet.
    child: CustomScrollView(
      // Add the navigation bar and list of items as slivers in the next steps.
      slivers: <Widget>[],
    ),
  ),
);
```

{% endtab %}

{% endtabs %}


## 2. 新增浮動應用程式列（Floating App Bar）

接下來，將應用程式列（app bar）新增到 [`CustomScrollView`][`CustomScrollView`]。

{% tabs "device-type-tabs" %}

{% tab "Material widgets" %}

Flutter 提供了 [`SliverAppBar`][`SliverAppBar`] 元件（Widget），其功能與一般的 `AppBar` 元件類似，
同樣使用 `SliverAppBar` 來顯示標題、分頁（tabs）、圖片（images）等內容。

然而，`SliverAppBar` 還能讓你建立一個「浮動」的應用程式列（floating app bar），
當你不在頁面頂部時，該列會縮小並浮動顯示。

要實現這個效果：

  1. 先建立一個只顯示標題的應用程式列（app bar）。
  2. 將 `pinned` 屬性設為 `true`。
  3. 新增一個 `flexibleSpace` 元件，讓它填滿可用的 `expandedHeight`。

<?code-excerpt "lib/step2_material.dart (SliverAppBar)" replace="/^body: //g;/^\),$/)/g"?>
```dart
slivers: [
  // Add the app bar to the CustomScrollView.
  SliverAppBar(
    // Provide a standard title.
    title: Text('Floating App Bar'),
    // Pin the app bar when scrolling.
    pinned: true,
    // Display a placeholder widget to visualize the shrinking size.
    flexibleSpace: Placeholder(),
    // Make the initial height of the SliverAppBar larger than normal.
    expandedHeight: 200,
  ),
],
```

:::tip
試著操作看看
[你可以傳遞給 `SliverAppBar` 元件（Widget）的各種屬性][various properties you can pass to the `SliverAppBar` widget]，
並利用 hot reload 來即時查看結果。例如，你可以在
`flexibleSpace` 屬性中使用 `Image` 元件（Widget），
來建立一個隨著畫面捲動而縮小的背景圖片。
:::

{% endtab %}

{% tab "Cupertino widgets" %}

Flutter 提供了 [`CupertinoSliverNavigationBar`][`CupertinoSliverNavigationBar`]
元件（Widget），讓你可以擁有一個「浮動」的導覽列，
當你向下捲動時會縮小，當你不在頁面頂部時則會浮動顯示。

要實現這個效果：

  1. 將 `CupertinoSliverNavigationBar` 加入到
     `CustomScrollView`。
  2. 先建立一個只顯示標題的 app bar。

<?code-excerpt "lib/step2_cupertino.dart (SliverAppBar)" replace="/^body: //g;/^\),$/)/g"?>
```dart
slivers: [
  // Add the navigation bar to the CustomScrollView.
  CupertinoSliverNavigationBar(
    // Provide a standard title.
    largeTitle: Text('Floating App Bar'),
  ),
],
```

{% endtab %}

{% endtabs %}


## 3. 新增項目清單

現在你已經完成了 app bar，接下來要在 `CustomScrollView` 中新增一個項目清單。你有兩個選擇：[`SliverList`][`SliverList`] 或 [`SliverGrid`][`SliverGrid`]。如果你需要將多個項目依序顯示，請使用 `SliverList` 元件 (Widget)。如果你需要顯示網格清單，則請使用 `SliverGrid` 元件 (Widget)。

{% tabs "device-type-tabs" %}

{% tab "Material widgets" %}

<?code-excerpt "lib/main_material.dart (SliverList)" replace="/^\),$/)/g"?>
```dart
// Next, create a SliverList
SliverList.builder(
  // The builder function returns a ListTile with a title that
  // displays the index of the current item.
  itemBuilder: (context, index) =>
      ListTile(title: Text('Item #$index')),
  // Builds 50 ListTiles
  itemCount: 50,
)
```

{% endtab %}

{% tab "Cupertino 元件 (Widgets)" %}

<?code-excerpt "lib/main_cupertino.dart (SliverList)" replace="/^\),$/)/g"?>
```dart
// Next, create a SliverList
SliverList.builder(
  // The builder function returns a CupertinoListTile with a title
  // that displays the index of the current item.
  itemBuilder: (context, index) =>
      CupertinoListTile(title: Text('Item #$index')),
  // Builds 50 CupertinoListTile
  itemCount: 50,
)
```

{% endtab %}

{% endtabs %}

## 互動範例

{% tabs "device-type-tabs" %}

{% tab "Material 元件 (Widgets)" %}

<?code-excerpt "lib/main_material.dart"?>
```dartpad title="Flutter floating app bar hands-on example in DartPad" run="false"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Floating App Bar';

    return MaterialApp(
      title: title,
      home: Scaffold(
        // No app bar provided to Scaffold, only a body with a
        // CustomScrollView.
        body: CustomScrollView(
          slivers: [
            // Add the app bar to the CustomScrollView.
            const SliverAppBar(
              // Provide a standard title.
              title: Text(title),
              // Pin the app bar when scrolling
              pinned: true,
              // Display a placeholder widget to visualize the shrinking size.
              flexibleSpace: Placeholder(),
              // Make the initial height of the SliverAppBar larger than normal.
              expandedHeight: 200,
            ),
            // Next, create a SliverList
            SliverList.builder(
              // The builder function returns a ListTile with a title that
              // displays the index of the current item.
              itemBuilder: (context, index) =>
                  ListTile(title: Text('Item #$index')),
              // Builds 50 ListTiles
              itemCount: 50,
            ),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/floating-app-bar.webp" alt="使用浮動應用程式列（floating app bar）示範" class="site-mobile-screenshot"/> 
</noscript>

{% endtab %}

{% tab "Cupertino 元件 (Widgets)" %}

<?code-excerpt "lib/main_cupertino.dart"?>
```dartpad title="Flutter floating navigation bar hands-on example in DartPad" run="false"
import 'package:flutter/cupertino.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Floating Navigation Bar';

    return CupertinoApp(
      title: title,
      home: CupertinoPageScaffold(
        // No navigation bar provided to CupertinoPageScaffold,
        // only a body with a CustomScrollView.
        child: CustomScrollView(
          slivers: [
            // Add the navigation bar to the CustomScrollView.
            const CupertinoSliverNavigationBar(
              // Provide a standard title.
              largeTitle: Text(title),
            ),
            // Next, create a SliverList
            SliverList.builder(
              // The builder function returns a CupertinoListTile with a title
              // that displays the index of the current item.
              itemBuilder: (context, index) =>
                  CupertinoListTile(title: Text('Item #$index')),
              // Builds 50 CupertinoListTile
              itemCount: 50,
            ),
          ],
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/floating-app-bar.webp" alt="使用浮動導覽列示範" class="site-mobile-screenshot"/> 
</noscript>

{% endtab %}

{% endtabs %}

[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverChildBuilderDelegate`]: {{site.api}}/flutter/widgets/SliverChildBuilderDelegate-class.html
[`SliverChildDelegate`]: {{site.api}}/flutter/widgets/SliverChildDelegate-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[various properties you can pass to the `SliverAppBar` widget]: {{site.api}}/flutter/material/SliverAppBar/SliverAppBar.html
