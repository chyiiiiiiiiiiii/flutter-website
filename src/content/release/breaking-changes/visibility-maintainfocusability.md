```markdown
---
title: 當啟用 maintainState 時，Visibility 元件（Widget）預設不再可被聚焦
description: >-
  Visibility 元件（Widget）在啟用 maintainState 時，預設不再隱式保留其子元件的可聚焦性。
---

{% render docs/breaking-changes.md %}

## 摘要
此變更是為了解決一個問題，
當 `IndexedStack` 的隱藏子元件會因鍵盤事件而可被聚焦
（請參見 [issue](https://github.com/flutter/flutter/issues/114213)），
這是由於底層 `Visibility` 元件（Widget）的預設行為所導致。

## 變更說明
核心變更在於，當啟用 `maintainState` 時，
`Visibility` 元件（Widget）預設不再可被聚焦。
若要讓隱藏的元件（Widget）維持可聚焦狀態，
必須同時將新的旗標 `maintainFocusability` 與 `maintainState` 設為 true。

## 遷移指南
如果你的應用程式中有 `Visibility` 元件（Widget），且未將 `maintainState` 設為 true，
則無需進行任何變更。

如果你的應用程式中有 `Visibility` 元件（Widget），並且將 `maintainState` 設為 true，
且你仰賴先前預設行為（允許你聚焦隱藏的元件），
你將需要將 `maintainFocusability` 設為 true。

遷移前的程式碼：
```

```dart
child: Visibility(
    maintainState: true,
    child: SomeWidget(),
)
```

遷移後的程式碼：

```dart
child: Visibility(
    maintainState: true,
    maintainFocusability: true,
    child: SomeWidget(),
)
```

## 時程

合併於版本：3.34.0-pre<br>  
正式版發佈於：3.35

## 參考資料

API 文件：

* [`Visibility`]({{site.api}}/flutter/widgets/Visibility-class.html)

相關議題：

* [Issue 114213]({{site.repo.flutter}}/issues/114213)

相關 PR：

* [PR 159133: Add flag to exclude focus for hidden children in Visibility, maintainFocusability. Set maintainFocusability to false in IndexedStack]({{site.repo.flutter}}/pull/159133)
