---
title: 使用分頁（Tabs）
description: 如何在版面配置中實作分頁（Tabs）。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/design/tabs/"?>

在遵循 Material Design 指南的應用程式中，使用分頁（tabs）是一種常見的設計模式。
Flutter 在其 [material library][material library] 中，提供了方便建立分頁版面配置的方法。

本教學將透過以下步驟建立一個分頁範例：

  1. 建立 `TabController`。
  2. 建立分頁（tabs）。
  3. 為每個分頁建立內容。

## 1. 建立 `TabController`

為了讓分頁運作，你需要讓所選分頁與內容區塊保持同步。
這正是 [`TabController`][`TabController`] 的工作。

你可以手動建立 `TabController`，
或是透過 [`DefaultTabController`][`DefaultTabController`] 元件（Widget）自動建立。

使用 `DefaultTabController` 是最簡單的選擇，因為它
會建立一個 `TabController`，並讓所有子元件（descendant widgets）都能存取。

<?code-excerpt "lib/partials.dart (TabController)"?>
```dart
return MaterialApp(
  home: DefaultTabController(length: 3, child: Scaffold()),
);
```

## 2. 建立分頁（Tabs）

當某個分頁被選取時，需要顯示對應的內容。
你可以使用 [`TabBar`][`TabBar`] 元件（Widget）來建立分頁。
在本範例中，建立一個 `TabBar`，其中包含三個
[`Tab`][`Tab`] 元件（Widgets），並將其放置在 [`AppBar`][`AppBar`] 內。

<?code-excerpt "lib/partials.dart (Tabs)"?>
```dart
return MaterialApp(
  home: DefaultTabController(
    length: 3,
    child: Scaffold(
      appBar: AppBar(
        bottom: const TabBar(
          tabs: [
            Tab(icon: Icon(Icons.directions_car)),
            Tab(icon: Icon(Icons.directions_transit)),
            Tab(icon: Icon(Icons.directions_bike)),
          ],
        ),
      ),
    ),
  ),
);
```

預設情況下，`TabBar` 會在元件樹（widget tree）中向上查找最近的 `DefaultTabController`。如果你是手動建立 `TabController`，請將其傳遞給 `TabBar`。

## 3. 為每個分頁建立內容

現在你已經有了分頁，當選取某個分頁時就要顯示對應的內容。為此，請使用 [`TabBarView`][`TabBarView`] 元件（Widget）。

:::note
順序很重要，必須與 `TabBar` 中分頁的順序相對應。
:::

<?code-excerpt "lib/main.dart (TabBarView)"?>
```dart
body: const TabBarView(
  children: [
    Icon(Icons.directions_car),
    Icon(Icons.directions_transit),
    Icon(Icons.directions_bike),
  ],
),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter TabBar DartPad hands-on example" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const TabBarDemo());
}

class TabBarDemo extends StatelessWidget {
  const TabBarDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            bottom: const TabBar(
              tabs: [
                Tab(icon: Icon(Icons.directions_car)),
                Tab(icon: Icon(Icons.directions_transit)),
                Tab(icon: Icon(Icons.directions_bike)),
              ],
            ),
            title: const Text('Tabs Demo'),
          ),
          body: const TabBarView(
            children: [
              Icon(Icons.directions_car),
              Icon(Icons.directions_transit),
              Icon(Icons.directions_bike),
            ],
          ),
        ),
      ),
    );
  }
}
```

<img src="/assets/images/docs/cookbook/tabs.webp" alt="分頁範例" class="site-mobile-screenshot" />
