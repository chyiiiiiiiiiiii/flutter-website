---
title: LayoutBuilder 最佳化
description: >
  LayoutBuilder 與 SliverLayoutBuilder 現在會更少次地呼叫 builder 函式。
---

{% render "docs/breaking-changes.md" %}

## 摘要

本指南說明在 [LayoutBuilder 最佳化][1] 後，如何遷移 Flutter 應用程式。

## 背景說明

[LayoutBuilder][2] 與 [SliverLayoutBuilder][3] 為了讓應用程式能根據父層版面配置約束（layout constraints）動態調整元件（Widget）結構，會頻繁地呼叫 [builder][4] 函式，次數超過實際需求。
這導致元件被不必要地重建，使應用程式效率降低並產生卡頓現象。

這個問題也會間接影響到 [OrientationBuilder][5]。

為了提升應用程式效能，進行了 [LayoutBuilder 最佳化][1]，使得 `builder` 函式的呼叫次數減少。

如果應用程式依賴該函式以特定頻率被呼叫，則可能會發生錯誤。
應用程式可能會出現以下一種或多種現象：

* 在升級到包含此最佳化的 Flutter 版本後，`builder` 函式不再像以前一樣被呼叫。
* 某個元件（Widget）的 UI 消失。
* 某個元件（Widget）的 UI 沒有更新。

## 變更說明

在最佳化之前，傳遞給 `LayoutBuilder` 或 `SliverLayoutBuilder` 的 builder 函式會在下列任一情況發生時被呼叫：

1. 由於元件設定變更，`LayoutBuilder` 被重建
   （通常發生於使用 `LayoutBuilder` 的元件因 `setState`、`didUpdateWidget` 或 `didChangeDependencies` 觸發重建時）。
1. `LayoutBuilder` 在進行版面配置時，從父元件獲得了與上次不同的版面配置約束（layout constraints）。
1. `LayoutBuilder` 在進行版面配置時，從父元件獲得了與上次相同的版面配置約束。

經過最佳化後，builder 函式在第三種情況下將不再被呼叫。若約束條件相同且元件設定未變，則 builder 函式不會被呼叫。

如果你的應用程式依賴於重新版面配置（relayout）來觸發 `LayoutBuilder` 的重建，而不是明確呼叫 `setState`，則可能會發生錯誤。這通常是無意間發生的。你原本應該加入 `setState`，但因為應用程式仍能正常運作，導致你忘記加入。

## 遷移指南

請檢查 `LayoutBuilder` 與 `SliverLayoutBuilder` 的使用情境，並確保每當元件狀態改變時，都有呼叫 `setState`。

**範例**：在下方範例中，builder 函式的內容取決於 `_counter` 欄位的值。因此，每當該值被更新時，應呼叫 `setState` 以通知框架重建元件。不過，即使沒有呼叫 `setState`，如果 `_ResizingBox` 觸發了 `LayoutBuilder` 的重新版面配置，此範例過去仍可能正常運作。

遷移前的程式碼（請注意 `onPressed` 回呼（callback）中缺少 `setState`）：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Counter(),
    );
  }
}

class Counter extends StatefulWidget {
  Counter({Key key}) : super(key: key);

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Center(child: Container(
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return _ResizingBox(
            TextButton(
                onPressed: () {
                  _counter++;
                },
                child: Text('Increment Counter')),
            Text(_counter.toString()),
          );
        },
      ),
    ));
  }
}

class _ResizingBox extends StatefulWidget {
  _ResizingBox(this.child1, this.child2);

  final Widget child1;
  final Widget child2;

  @override
  State<StatefulWidget> createState() => _ResizingBoxState();
}

class _ResizingBoxState extends State<_ResizingBox>
    with SingleTickerProviderStateMixin {
  Animation animation;

  @override
  void initState() {
    super.initState();
    animation = AnimationController(
      vsync: this,
      duration: const Duration(minutes: 1),
    )
      ..forward()
      ..addListener(() {
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 100 + animation.value * 100,
          child: widget.child1,
        ),
        SizedBox(
          width: 100 + animation.value * 100,
          child: widget.child2,
        ),
      ],
    );
  }
}
```

遷移後的程式碼（`setState` 已新增至 `onPressed`）：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Counter(),
    );
  }
}

class Counter extends StatefulWidget {
  Counter({Key key}) : super(key: key);

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Center(child: Container(
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return _ResizingBox(
            TextButton(
                onPressed: () {
                  setState(() {
                    _counter++;
                  });
                },
                child: Text('Increment Counter')),
            Text(_counter.toString()),
          );
        },
      ),
    ));
  }
}

class _ResizingBox extends StatefulWidget {
  _ResizingBox(this.child1, this.child2);

  final Widget child1;
  final Widget child2;

  @override
  State<StatefulWidget> createState() => _ResizingBoxState();
}

class _ResizingBoxState extends State<_ResizingBox>
    with SingleTickerProviderStateMixin {
  Animation animation;

  @override
  void initState() {
    super.initState();
    animation = AnimationController(
      vsync: this,
      duration: const Duration(minutes: 1),
    )
      ..forward()
      ..addListener(() {
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 100 + animation.value * 100,
          child: widget.child1,
        ),
        SizedBox(
          width: 100 + animation.value * 100,
          child: widget.child2,
        ),
      ],
    );
  }
}
```

請留意在同一個元件（Widget）中同時使用 `Animation` 和 `LayoutBuilder` 的情況。
動畫（Animation）具有內部可變狀態，並會在每一幀發生變化。如果你的 builder 函式邏輯依賴於動畫的值，則可能需要讓 `setState` 隨著動畫同步更新。為此，請加入一個[動畫監聽器（animation listener）][7]，並在其中呼叫 `setState`，如下所示：

```dart
Animation animation = … create animation …;
animation.addListener(() {
  setState(() {
    // Intentionally empty. The state is inside the animation object.
  });
});
```

## 時程

此變更已於 Flutter v1.20.0 版本釋出。

## 參考資料

API 文件：

* [`LayoutBuilder`][2]
* [`SliverLayoutBuilder`][3]

相關議題：

* [Issue 6469][8]

相關 PR：

* [LayoutBuilder: skip calling builder when constraints are the same][6]

[1]: /go/layout-builder-optimization
[2]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[3]: {{site.api}}/flutter/widgets/SliverLayoutBuilder-class.html
[4]: {{site.api}}/flutter/widgets/LayoutBuilder/builder.html
[5]: {{site.api}}/flutter/widgets/OrientationBuilder-class.html
[6]: {{site.repo.flutter}}/pull/55414
[7]: {{site.api}}/flutter/animation/Animation/addListener.html
[8]: {{site.repo.flutter}}/issues/6469
