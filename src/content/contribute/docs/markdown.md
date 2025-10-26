---
title: 撰寫 Markdown
shortTitle: Markdown
description: >-
  了解 Dart 與 Flutter 文件網站支援的 Markdown 語法，以及相關撰寫指引。
---

:::warning
本文件仍在持續編輯中。
:::

我們的網站支援以 [Markdown][Markdown] 撰寫內容，
並加入部分 [GitHub Flavored Markdown][GitHub Flavored Markdown] 的擴充語法，
以及其他自訂語法。

本頁將說明我們支援的 Markdown 語法，
以及撰寫 Markdown 的風格指引。

[Markdown]: https://commonmark.org/
[GitHub Flavored Markdown]: https://github.github.com/gfm/

## 一般指引

請優先使用 Markdown 語法，而非自訂 HTML 或元件。
原生 Markdown 更容易維護、工具也更容易解析，
未來若需移轉也較為方便。

## 程式碼區塊

請勿使用 Markdown 的縮排式程式碼區塊，
僅使用反引號的圍欄式程式碼區塊（fenced code block），
並且務必指定語言。例如：

````markdown
```dart
void main() {
  print('Hello world!');
}
```
````

若想進一步了解如何自訂程式碼區塊，請參閱專門的[Code blocks][Code blocks]文件。

[Code blocks]: /contribute/docs/code-blocks
