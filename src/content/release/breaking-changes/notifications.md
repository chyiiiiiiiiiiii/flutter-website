---
title: 移除 Notification.visitAncestor
description: >
  通知（Notification）現在只遍歷作為通知監聽者的祖先元件（Widgets）。
---

{% render docs/breaking-changes.md %}

## 摘要

通知（Notification）現在僅遍歷作為通知監聽者的祖先元件，提升了效率。

## 背景

通知 API 會遍歷元件樹（element tree），以尋找通知接收者。這導致了一些不理想的效能表現：

  * 如果沒有對應通知類型的接收者，則會遍歷並進行型別檢查整個通知發送點以上的元件樹。
  * 若在同一畫格（frame）中有多個通知（這在滾動元件很常見），則會多次遍歷元件樹。

如果在同一頁面上有多個或巢狀的滾動元件（Scrolling Widgets），情況會變得更糟——每個滾動元件每個畫格都會發送多個通知。例如，在 Dart/Flutter Devtools 的 flamegraph 頁面中，我們發現約有 30% 的 CPU 時間花在發送通知上。

為了降低發送通知的成本，我們已將通知發送機制修改為只拜訪作為通知監聽者的祖先元件，從而減少每個畫格需要遍歷的元件數量。

然而，舊的通知系統在其 API 中透過 `Notification.visitAncestor` 方法暴露了遍歷每個元件的行為。由於現在不再遍歷所有祖先元件，因此此方法已不再支援。

## 變更說明

`Notification.visitAncestor` 已被移除。
任何繼承自 `Notification` 的類別，都不應再覆寫此方法。

**如果你沒有實作自訂 Notification 並覆寫 `Notification.visitAncestor`，
則無需進行任何更動。**

## 遷移指南

如果你有繼承自 `Notification` 並覆寫
`Notification.visitAncestor` 的子類別，則必須刪除該覆寫，或使用以下程式碼選擇性地採用舊式通知發送方式。

遷移前的程式碼：

```dart
import 'package:flutter/widgets.dart';

class MyNotification extends Notification {

  @override
  bool visitAncestor(Element element) {
    print('Visiting $element');
    return super.visitAncestor(element);
  }
}

void methodThatSendsNotification(BuildContext? context) {
  MyNotification().dispatch(context);
}
```

遷移後的程式碼：

```dart
import 'package:flutter/widgets.dart';

class MyNotification extends Notification {

  bool visitAncestor(Element element) {
    print('Visiting $element');
    if (element is ProxyElement) {
      final Widget widget = element.widget;
      if (widget is NotificationListener<MyNotification>) {
        return widget.onNotification?.call(notification) ?? true;
      }
    }
    return true;
  }
}

void methodThatSendsNotification(BuildContext? context) {
  context?.visitAncestor(MyNotification().visitAncestor);
}
```

請注意，這種做法相較於`Notification.dispatch`的新預設行為，效能較差。

## 時間軸

合併於版本：2.12.0-4.1<br>  
穩定版釋出：3.0.0

## 參考資料

API 文件：

* [`Notification`]({{site.api}}/flutter/widgets/Notification-class.html)

相關議題：

* [Issue 97849]({{site.repo.flutter}}/issues/97849)

相關 PR：

* [improve Notification API performance]({{site.repo.flutter}}/pull/98451)
