---
title: OverlayEntries 和 Routes 的重建最佳化
description: OverlayEntries 現在僅在明確的狀態變更時才會重建。
---

{% render docs/breaking-changes.md %}

## 摘要

這項最佳化提升了路由（Route）轉場的效能，
但也可能暴露出你應用程式中遺漏呼叫 `setState` 的情況。

## 背景說明

在此變更之前，當有新的不透明項目（opaque entry）被加入到 `OverlayEntry` 之上，
或是在其上方被移除時，`OverlayEntry` 都會重建。
這些重建其實是多餘的，因為它們並非由受影響的 `OverlayEntry` 狀態變更所觸發。
這個破壞性變更（breaking change）最佳化了我們處理
`OverlayEntry` 新增與移除的方式，移除了不必要的重建，
以提升效能。

由於 `Navigator` 內部會將每個 `Route` 放入
`OverlayEntry`，因此這項變更同樣適用於 `Route` 的轉場：
如果有不透明的 `Route` 被推到另一個 `Route` 之上或從其上方移除，
在不透明的 `Route` 之下的 `Route`
將不再不必要地重建。

## 變更說明

在大多數情況下，這項變更不需要你修改任何程式碼。
然而，如果你的應用程式錯誤地依賴於這些隱含的重建，
你可能會遇到問題。這些問題可以透過將任何狀態變更包裹在 `setState` 呼叫中來解決。

此外，這項變更也稍微調整了元件樹（widget tree）的結構：
在這項變更之前，`OverlayEntry` 會被包裹在 `Stack` 元件中。
現在，明確的 `Stack` 元件已從元件階層中移除。

## 移轉指南

如果你在升級至包含此變更的 Flutter 版本後遇到問題，
請檢查你的程式碼是否有遺漏呼叫 `setState` 的情況。
在下方範例中，將 `Navigator.pushNamed` 的回傳值指定給 `buttonLabel`
其實是隱式地修改了狀態，因此應該將其包裹在明確的 `setState` 呼叫中。

移轉前的程式碼：

```dart
class FooState extends State<Foo> {
  String buttonLabel = 'Click Me';
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        // Illegal state modification that should be wrapped in setState.
        buttonLabel = await Navigator.pushNamed(context, '/bar');
      },
      child: Text(buttonLabel),
    );
  }
}
```

遷移後的程式碼：

```dart
class FooState extends State<Foo> {
  String buttonLabel = 'Click Me';
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final newLabel = await Navigator.pushNamed(context, '/bar');
        setState(() {
          buttonLabel = newLabel;
        });
      },
      child: Text(buttonLabel),
    );
  }
}
```

## 時程

合併於版本：1.16.3<br>  
正式版釋出：1.17

## 參考資料

API 文件：

* [`setState`][`setState`]
* [`OverlayEntry`][`OverlayEntry`]
* [`Overlay`][`Overlay`]
* [`Navigator`][`Navigator`]
* [`Route`][`Route`]
* [`OverlayRoute`][`OverlayRoute`]

相關議題：

* [Issue 45797][Issue 45797]

相關 PR：

* [Do not rebuild Routes when a new opaque Route is pushed on top][Do not rebuild Routes when a new opaque Route is pushed on top]
* [Reland "Do not rebuild Routes when a new opaque Route is pushed on top"][Reland "Do not rebuild Routes when a new opaque Route is pushed on top"]


[Do not rebuild Routes when a new opaque Route is pushed on top]: {{site.repo.flutter}}/pull/48900
[Issue 45797]: {{site.repo.flutter}}/issues/45797
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Overlay`]: {{site.api}}/flutter/widgets/Overlay-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[`OverlayRoute`]: {{site.api}}/flutter/widgets/OverlayRoute-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[Reland "Do not rebuild Routes when a new opaque Route is pushed on top"]: {{site.repo.flutter}}/pull/49376
