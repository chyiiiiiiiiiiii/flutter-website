---
title: 在清單上方放置浮動 app bar
description: 如何在清單上方放置浮動 app bar 或導覽列。
---

<?code-excerpt path-base="cookbook/lists/floating_app_bar/"?>

本指南說明如何在 Flutter 應用程式中，將浮動 app bar 或導覽列放置於清單上方。

## 概覽

為了讓使用者更方便瀏覽項目清單，您可能會希望在使用者往下捲動清單時，最小化 app bar（導覽列）。

將 app bar 移入 [`CustomScrollView`][]，可以讓您建立一個可最小化或隨著清單捲動而隱藏的 app bar，而這個清單的項目則包含在 `CustomScrollView` 之中。

本教學將示範如何使用 `CustomScrollView`，在清單上方顯示一個 app bar，並在使用者往下捲動清單時自動最小化，步驟如下：

  1. 建立 `CustomScrollView`。
  2. 在 `CustomScrollView` 中加入浮動 app bar。
  3. 在 `CustomScrollView` 中加入項目清單。

## 1. 建立 `CustomScrollView`

若要建立浮動 app bar，請將 app bar 放入同時包含項目清單的 `CustomScrollView` 中。這樣可以同步 app bar 與項目清單的捲動位置。您可以將 `CustomScrollView` 元件 (Widget) 想像成一個允許您混合搭配不同類型可捲動清單與元件的 `ListView`。

提供給 `CustomScrollView` 的可捲動清單與元件稱為 _slivers_。slivers 有多種類型，例如 `SliverList`、`SliverGrid` 和 `SliverAppBar`。事實上，`ListView` 與 `GridView` 元件就是利用 `SliverList` 和 `SliverGrid` 元件來實作捲動功能。

在本範例中，請建立一個包含 `SliverList` 的 `CustomScrollView`。如果您的程式碼中有 app bar 屬性，請將其移除。

<Tabs key="device-type-tabs">

<Tab name="Material widgets">

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

</Tab>

<Tab name="Cupertino widgets">

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

</Tab>

</Tabs>


## 2. 新增浮動應用程式列（floating app bar）

接下來，將應用程式列（app bar）加入到 [`CustomScrollView`][]。

<Tabs key="device-type-tabs">

<Tab name="Material widgets">

Flutter 提供了 [`SliverAppBar`][] 元件（Widget），
它與一般的 `AppBar` 元件類似，
同樣使用 `SliverAppBar` 來顯示標題、
分頁（tabs）、圖片（images）等內容。

然而，`SliverAppBar` 還提供了
建立「浮動」應用程式列（floating app bar）的能力，
當你不在頁面頂端時，該列會縮小並浮動顯示。

要實現這個效果：

  1. 先建立一個僅顯示標題的應用程式列（app bar）。
  2. 將 `pinned` 屬性設為 `true`。
  3. 加入一個 `flexibleSpace` 元件（Widget），讓它填滿可用的 `expandedHeight`。

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
並利用 hot reload 立即查看效果。例如，你可以在
`flexibleSpace` 屬性中使用 `Image` 元件（Widget），
來建立一個隨著滾動離開螢幕時會縮小的背景圖片。
:::

</Tab>

<Tab name="Cupertino widgets">

Flutter 提供了 [`CupertinoSliverNavigationBar`][]
元件（Widget），讓你可以擁有一個「浮動」的導覽列，
當你向下滾動時會縮小，當你不在頁面頂部時則會浮動顯示。

要實現這個效果：

  1. 將 `CupertinoSliverNavigationBar` 加入到
     `CustomScrollView` 中。
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

</Tab>

</Tabs>


## 3. 新增項目清單

現在你已經建立好 app bar，接下來要在 `CustomScrollView` 中新增一個項目清單。你有兩種選擇：[`SliverList`][] 或 [`SliverGrid`][]。如果你需要將多個項目依序顯示，請使用 `SliverList` 元件 (Widget)；如果你需要顯示格狀清單，則請使用 `SliverGrid` 元件 (Widget)。

<Tabs key="device-type-tabs">

<Tab name="Material widgets">

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

</Tab>

<Tab name="Cupertino widgets">

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

</Tab>

</Tabs>

## 互動範例

<Tabs key="device-type-tabs">

<Tab name="Material widgets">

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

</Tab>

<Tab name="Cupertino widgets">

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

</Tab>

</Tabs>

[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverChildBuilderDelegate`]: {{site.api}}/flutter/widgets/SliverChildBuilderDelegate-class.html
[`SliverChildDelegate`]: {{site.api}}/flutter/widgets/SliverChildDelegate-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[various properties you can pass to the `SliverAppBar` widget]: {{site.api}}/flutter/material/SliverAppBar/SliverAppBar.html
