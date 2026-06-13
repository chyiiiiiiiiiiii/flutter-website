---
title: 根據螢幕方向更新 UI
description: 回應螢幕方向變化時的處理方式。
---

<?code-excerpt path-base="cookbook/design/orientation"?>

在某些情境下，當可用空間的形狀發生變化時（例如使用者將螢幕從直向模式旋轉為橫向模式），你可能會希望即時更新應用程式的顯示內容。例如，應用程式在直向模式下可能會將項目依序排列顯示，而在橫向模式下則將相同的項目並排顯示。更完整的說明與相關主題，請參閱 [adaptive ui 文件][adaptive ui documentation]。

在 Flutter 中，你可以根據指定的 [`Orientation`][] 建立不同的版面配置。在本範例中，將透過以下步驟，建立一個在直向模式下顯示兩欄、橫向模式下顯示三欄的清單：

  1. 建立一個具有兩欄的 `GridView`。
  2. 使用 `OrientationBuilder` 來改變欄位數量。

## 1. 建立一個具有兩欄的 `GridView`

首先，建立一個項目清單作為資料來源。與其使用一般的清單，不如建立一個以網格方式顯示項目的清單。此處先建立一個具有兩欄的網格。

<?code-excerpt "lib/partials.dart (GridViewCount)"?>
```dart
return GridView.count(
  // A list with 2 columns
  crossAxisCount: 2,
  // ...
);
```

想進一步了解如何使用 `GridViews`，請參考 [Creating a grid list][] 教學。

## 2. 使用 `OrientationBuilder` 動態調整欄數

若要判斷應用程式目前的 `Orientation`，可以使用 [`OrientationBuilder`][] 元件 (Widget)。
`OrientationBuilder` 會透過比較父元件可用的寬度與高度來計算目前的 `Orientation`，並在父元件尺寸變化時自動重建。

利用 `Orientation`，建立一個清單，讓其在直向（portrait）模式下顯示兩欄，在橫向（landscape）模式下顯示三欄。

<?code-excerpt "lib/partials.dart (OrientationBuilder)"?>
```dart
body: OrientationBuilder(
  builder: (context, orientation) {
    return GridView.count(
      // Create a grid with 2 columns in portrait mode,
      // or 3 columns in landscape mode.
      crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
    );
  },
),
```

:::note
如果你關心的是螢幕的方向（orientation），
而不是父元件可用的空間大小，
請使用 `MediaQuery.orientationOf(context)`，而不是
`OrientationBuilder` 元件（Widget）。
使用 `MediaQuery.orientationOf` 來組織 UI
是[不建議的做法][discouraged]。請改用 `MediaQuery.sizeOf(context)`。
:::

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter app orientation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Orientation Demo';

    return const MaterialApp(
      title: appTitle,
      home: OrientationList(title: appTitle),
    );
  }
}

class OrientationList extends StatelessWidget {
  final String title;

  const OrientationList({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: OrientationBuilder(
        builder: (context, orientation) {
          return GridView.count(
            // Create a grid with 2 columns in portrait mode, or
            // 3 columns in landscape mode.
            crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
            // Generate 100 widgets that display their index in the list.
            children: List.generate(100, (index) {
              return Center(
                child: Text(
                  'Item $index',
                  style: TextTheme.of(context).headlineLarge,
                ),
              );
            }),
          );
        },
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/orientation.webp" alt="Orientation Demo" class="site-mobile-screenshot" />
</noscript>

## 鎖定裝置方向

在前一節中，你已經學會了如何讓應用程式 UI 隨裝置方向變化而自動調整。

Flutter 也允許你透過設定 [`DeviceOrientation`] 的值，來指定應用程式支援的螢幕方向。你可以選擇：

* 將應用程式鎖定在單一方向，例如僅允許 `portraitUp` 位置，或是…
* 允許多種方向，例如同時支援 `portraitUp` 和 `portraitDown`，但不允許橫向（landscape）。

在應用程式的 `main()` 方法中，
呼叫 [`SystemChrome.setPreferredOrientations()`]，
並傳入你的應用程式所支援的方向清單。

若要將裝置鎖定在單一方向，
你可以傳入僅包含一個項目的清單。

完整的可用值列表，請參考 [`DeviceOrientation`]。

<?code-excerpt "lib/orientation.dart (PreferredOrientations)"?>
```dart
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const MyApp());
}
```

[Creating a grid list]: /cookbook/lists/grid-lists
[`DeviceOrientation`]: {{site.api}}/flutter/services/DeviceOrientation.html
[`OrientationBuilder`]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
[`Orientation`]: {{site.api}}/flutter/widgets/Orientation.html
[`SystemChrome.setPreferredOrientations()`]: {{site.api}}/flutter/services/SystemChrome/setPreferredOrientations.html
[adaptive ui documentation]: {{site.api}}/ui/adaptive-responsive
[discouraged]: {{site.api}}/ui/adaptive-responsive/best-practices
