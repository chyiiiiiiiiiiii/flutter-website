---
title: Modal 路由中 Overlay 項目的語意順序
description: >
  Modal 路由的範圍（scope）在語意遍歷順序上
  高於其 modal barrier。
---

{% render docs/breaking-changes.md %}

## 摘要

我們調整了 Modal 路由中 overlay 項目的語意遍歷順序。
現在，無障礙輔助功能（如 TalkBack 或 VoiceOver）會優先聚焦於 Modal 路由的範圍（scope），而非其 modal barrier。

## 背景

Modal 路由包含兩個 overlay 項目：範圍（scope）與 modal barrier。  
範圍是 Modal 路由實際的內容，而 modal barrier 則是在範圍未覆蓋整個螢幕時，作為路由背景的部分。  
如果 Modal 路由對於 `barrierDismissible` 回傳 true，modal barrier 會變為可被無障礙聚焦，因為使用者可以點擊 modal barrier 來彈出（pop）Modal 路由。  
本次變更特別讓無障礙聚焦於範圍（scope）之後，才聚焦於 modal barrier。

## 變更說明

我們在 Modal 路由的兩個 overlay 項目之上新增了額外的語意節點（semantics node）。
這些語意節點標示了這兩個 overlay 項目的語意遍歷順序。
這同時也改變了語意樹（semantics tree）的結構。

## 移轉指南

如果在更新後，您的測試因語意樹結構變更而失敗，
您可以透過預期 Modal 路由 overlay 項目上方會有一個新的節點，來調整您的程式碼。

移轉前的程式碼：

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
  bool visiter(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visiter);
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
  bool visiter(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visiter);
  return child;
}
```

## 時程

合併於版本：1.19.0<br>  
正式版發佈於：1.20

## 參考資料

API 文件：

* [`ModalRoute`][`ModalRoute`]
* [`OverlayEntry`][`OverlayEntry`]

相關議題：

* [Issue 46625][Issue 46625]

相關 PR：

* [PR 59290][PR 59290]

[`ModalRoute`]: {{site.api}}/flutter/widgets/ModalRoute-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[Issue 46625]: {{site.repo.flutter}}/issues/46625
[PR 59290]: {{site.repo.flutter}}/pull/59290
