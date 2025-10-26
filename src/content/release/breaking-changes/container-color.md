---
title: 具色彩最佳化的 Container
description: >
  具有顏色且沒有其他背景裝飾的 Container，
  現在不再建立相同的子元件（Widgets）。
---

{% render docs/breaking-changes.md %}

## 摘要

框架中新增了一個 `ColoredBox` 元件（Widget），
並且當使用者指定 `color` 而非 `decoration` 時，
`Container` 元件（Widget）已經最佳化為會使用該元件。

## 背景

在實務上，`Container` 元件（Widget）經常被如下使用：

```dart
return Container(color: Colors.red);
```

先前，這段程式碼會產生一個元件（Widget）階層，實際上是使用`BoxDecoration`來繪製背景顏色。
`BoxDecoration`元件涵蓋了許多除了單純繪製背景顏色以外的情境，
而且效能不如新的`ColoredBox`元件，後者僅用於繪製背景顏色。

過去，若要在元件樹中驗證某個Container的顏色，Widget測試必須找到`BoxDecoration`，
才能取得該Container的顏色。
現在，除非有明確指定`BoxDecoration`作為`decoration`屬性，否則可以直接檢查`Container`本身的`color`屬性。
如果同時傳入`color`和`decoration`給`Container`，仍然會發生錯誤。

## 遷移指南

針對`Container`顏色進行驗證，或預期它會建立`BoxDecoration`的測試，都需要進行修改。

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

* [`Container`][`Container`]
* [`ColoredBox`][`ColoredBox`]
* [`BoxDecoration`][`BoxDecoration`]

相關議題：

* [Issue 9672][Issue 9672]
* [Issue 28753][Issue 28753]

相關 PR：

* [Colored box and container optimization #50979][Colored box and container optimization #50979]

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`ColoredBox`]: {{site.api}}/flutter/widgets/ColoredBox-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[Issue 9672]: {{site.repo.flutter}}/issues/9672
[Issue 28753]: {{site.repo.flutter}}/issues/28753
[Colored box and container optimization #50979]: {{site.repo.flutter}}/pull/50979
