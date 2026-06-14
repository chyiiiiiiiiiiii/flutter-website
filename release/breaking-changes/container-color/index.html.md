# 具有顏色最佳化的 Container

> 當 Container 只有顏色且沒有其他背景裝飾時， 現在不再建置相同的子元件。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在框架中新增了一個 `ColoredBox` 元件 (Widget)，
並且對 `Container` 元件進行了最佳化，
當使用者指定 `color` 而非 `decoration` 時會使用該元件。

## 背景

在實務上，經常會如下使用 `Container` 元件：

```dart
return Container(color: Colors.red);
```

過去，這段程式碼會產生一個元件階層，實際上是使用 `BoxDecoration` 來繪製背景顏色。
`BoxDecoration` 元件除了繪製背景顏色之外，還涵蓋了許多其他情境，
因此在僅需繪製背景顏色時，效率不如新的 `ColoredBox` 元件，
`ColoredBox` 元件只負責繪製背景顏色。

在元件測試（Widget tests）中，若要根據元件樹中某個容器的顏色進行斷言，
過去必須找到 `BoxDecoration`，才能實際取得該容器的顏色。
現在，除非有明確指定 `BoxDecoration` 作為 `decoration` 屬性，否則可以直接檢查 `Container` 本身的 `color` 屬性。
若同時提供 `color` 和 `decoration` 給 `Container`，仍然會發生錯誤。

## 遷移指南

針對 `Container` 的顏色進行斷言，或預期其會建立 `BoxDecoration` 的測試程式碼，需要進行修改。

遷移前的程式碼：

```dart
testWidgets('Container color', (WidgetTester tester) async {
  await tester.pumpWidget(Container(color: Colors.red));

  final Container container = tester.widgetList<Container>().first;
  expect(container.decoration.color, Colors.red);
  // Or, a test may have specifically looked for the BoxDecoration, e.g.:
  expect(find.byType(BoxDecoration), findsOneWidget);
});
```

遷移後的程式碼：

```dart
testWidgets('Container color', (WidgetTester tester) async {
  await tester.pumpWidget(Container(color: Colors.red));

  final Container container = tester.widgetList<Container>().first;
  expect(container.color, Colors.red);
  // If your test needed to work directly with the BoxDecoration, it should
  // instead look for the ColoredBox, e.g.:
  expect(find.byType(BoxDecoration), findsNothing);
  expect(find.byType(ColoredBox), findsOneWidget);
});
```

## 時程

導入版本：1.15.4<br>
穩定版本：1.17

## 參考資料

API 文件：

* [`Container`][]
* [`ColoredBox`][]
* [`BoxDecoration`][]

相關議題：

* [Issue 9672][]
* [Issue 28753][]

相關 PR：

* [Colored box and container optimization #50979][]

[`Container`]: https://api.flutter.dev/flutter/widgets/Container-class.html
[`ColoredBox`]: https://api.flutter.dev/flutter/widgets/ColoredBox-class.html
[`BoxDecoration`]: https://api.flutter.dev/flutter/painting/BoxDecoration-class.html
[Issue 9672]: https://github.com/flutter/flutter/issues/9672
[Issue 28753]: https://github.com/flutter/flutter/issues/28753
[Colored box and container optimization #50979]: https://github.com/flutter/flutter/pull/50979

