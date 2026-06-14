---
title: Modal Route 中 Overlay Entries 的語意順序
description: >
  Modal route 的 scope 在語意遍歷順序上，會優先於其 modal barrier。
---

{% render "docs/breaking-changes.md" %}

## 摘要

我們調整了 modal route 中 overlay entries 的語意遍歷順序。
無障礙輔助功能（如 TalkBack 或 VoiceOver）現在會優先聚焦於 modal route 的 scope，而不是 modal barrier。

## 背景說明

Modal route 具有兩個 overlay entries，分別是 scope 和 modal barrier。
scope 是 modal route 的實際內容；而 modal barrier 則是在 scope 沒有覆蓋整個螢幕時，作為 route 的背景。
如果 modal route 對 `barrierDismissible` 回傳 true，modal barrier 會變成可被無障礙聚焦，因為使用者可以點擊 modal barrier 來關閉（pop）modal route。
這次變更特別讓無障礙聚焦會先聚焦於 scope，再聚焦於 modal barrier。

## 變更說明

我們在 modal route 的兩個 overlay entries 上方新增了額外的語意節點。
這些語意節點用來標示這兩個 overlay entries 的語意遍歷順序。
這同時也改變了語意樹（semantics tree）的結構。

## 遷移指南

如果你在更新後因語意樹結構變動而導致測試失敗，
你可以透過預期 modal route overlay entries 上方會有一個新的節點，來調整你的程式碼。

遷移前的程式碼：

```dart
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('example test', (WidgetTester tester) async {
    final SemanticsHandle handle =
        tester.binding.pipelineOwner.ensureSemantics();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: Text('test'))));

    final SemanticsNode root =
        tester.binding.pipelineOwner.semanticsOwner.rootSemanticsNode;

    final SemanticsNode firstNode = getChild(root);
    expect(firstNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    // Fixes the test by expecting an additional node above the scope route.
    final SemanticsNode secondNode = getChild(firstNode);
    expect(secondNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    final SemanticsNode thirdNode = getChild(secondNode);
    expect(thirdNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));
    expect(thirdNode.hasFlag(SemanticsFlag.scopesRoute), true);

    final SemanticsNode forthNode = getChild(thirdNode);
    expect(forthNode.rect, Rect.fromLTRB(0.0, 0.0, 56.0, 14.0));
    expect(forthNode.label, 'test');
    handle.dispose();
  });
}

SemanticsNode getChild(SemanticsNode node) {
  SemanticsNode child;
  bool visitor(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visitor);
  return child;
}
```

遷移後的程式碼：

```dart
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('example test', (WidgetTester tester) async {
    final SemanticsHandle handle =
        tester.binding.pipelineOwner.ensureSemantics();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: Text('test'))));

    final SemanticsNode root =
        tester.binding.pipelineOwner.semanticsOwner.rootSemanticsNode;

    final SemanticsNode firstNode = getChild(root);
    expect(firstNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    // Fixes the test by expecting an additional node above the scope route.
    final SemanticsNode secondNode = getChild(firstNode);
    expect(secondNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    final SemanticsNode thirdNode = getChild(secondNode);
    expect(thirdNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));
    expect(thirdNode.hasFlag(SemanticsFlag.scopesRoute), true);

    final SemanticsNode forthNode = getChild(thirdNode);
    expect(forthNode.rect, Rect.fromLTRB(0.0, 0.0, 56.0, 14.0));
    expect(forthNode.label, 'test');
    handle.dispose();
  });
}

SemanticsNode getChild(SemanticsNode node) {
  SemanticsNode child;
  bool visitor(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visitor);
  return child;
}
```

## 時程

已納入版本：1.19.0<br>
穩定版發佈：1.20

## 參考資料

API 文件：

* [`ModalRoute`][]
* [`OverlayEntry`][]

相關議題：

* [Issue 46625][]

相關 PR：

* [PR 59290][]

[`ModalRoute`]: {{site.api}}/flutter/widgets/ModalRoute-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[Issue 46625]: {{site.repo.flutter}}/issues/46625
[PR 59290]: {{site.repo.flutter}}/pull/59290
