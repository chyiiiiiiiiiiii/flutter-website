---
title: LayoutBuilder 最佳化
description: >
  LayoutBuilder 與 SliverLayoutBuilder 現在會更少次地呼叫 builder 函式。
---

{% render docs/breaking-changes.md %}

## 摘要

本指南說明在 [LayoutBuilder 最佳化][1] 後，如何遷移 Flutter 應用程式。

## 背景說明

[LayoutBuilder][2] 與 [SliverLayoutBuilder][3] 會比必要次數更頻繁地呼叫 [builder][4] 函式，
以達到讓應用程式根據父層版面配置限制（layout constraints）調整元件（Widget）結構的主要目標。
這導致元件被不必要地重建，造成應用程式效能降低與卡頓。

這也會間接影響 [OrientationBuilder][5]。

為了提升應用程式效能，進行了 [LayoutBuilder 最佳化][1]，
使得 `builder` 函式被呼叫的次數減少。

如果您的應用程式依賴這個函式以特定頻率被呼叫，可能會因此產生問題。
應用程式可能會出現以下一種或多種現象：

* 在升級到引入此最佳化的 Flutter 版本後，`builder` 函式未被呼叫，而在升級前會被呼叫。
* 某個元件（Widget）的 UI 消失。
* 某個元件（Widget）的 UI 沒有更新。

## 變更說明

在最佳化之前，傳遞給 `LayoutBuilder` 或 `SliverLayoutBuilder` 的 builder 函式會在下列任一情況發生時被呼叫：

1. 由於元件設定變更，`LayoutBuilder` 被重建
   （通常發生在使用 `LayoutBuilder` 的元件因 `setState`、`didUpdateWidget` 或 `didChangeDependencies` 而重建時）。
2. `LayoutBuilder` 進行版面配置，且從父元件收到的版面配置限制與上次收到的不同。
3. `LayoutBuilder` 進行版面配置，且從父元件收到的版面配置限制與上次收到的相同。

最佳化後，builder 函式在第三種情況下將不再被呼叫。
如果版面配置限制相同且元件設定未變，則不會呼叫 builder 函式。

如果您的應用程式依賴重新版面配置（relayout）來觸發 `LayoutBuilder` 的重建，
而不是明確呼叫 `setState`，就可能因此出現問題。
這通常是無意間發生的。您本來應該加上 `setState`，但因為應用程式仍如預期運作而忘記加上，
因此沒有任何提示提醒您補上。

## 遷移指南

請檢查所有 `LayoutBuilder` 與 `SliverLayoutBuilder` 的用法，並確保每當元件狀態改變時都會呼叫 `setState`。

**範例**：在下方範例中，builder 函式的內容依賴 `_counter` 欄位的值。
因此，每當該值被更新時，您應該呼叫 `setState` 來通知框架重建元件（Widget）。
然而，即使未呼叫 `setState`，此範例過去也可能能正常運作，
如果 `_ResizingBox` 會觸發 `LayoutBuilder` 的重新版面配置（relayout）。

遷移前的程式碼（請注意 `onPressed` 回呼中缺少 `setState`）：

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

遷移後的程式碼（已將 `setState` 加入至 `onPressed`）：

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
動畫（Animation）具有內部可變狀態，會在每一幀變化。如果你的 builder 函式邏輯依賴於動畫的值，則可能需要 `setState` 來隨動畫同步更新。為達到此目的，請加入一個[動畫監聽器][7]，並在其中呼叫 `setState`，如下所示：

```dart
Animation animation = … create animation …;
animation.addListener(() {
  setState(() {
    // Intentionally empty. The state is inside the animation object.
  });
});
```

## 時程

此變更於 Flutter v1.20.0 版本中發布。

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
