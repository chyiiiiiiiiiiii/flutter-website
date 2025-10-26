---
title: 為文件網站撰寫內容
short-tile: 撰寫
description: >-
  了解 Dart 與 Flutter 文件網站在撰寫時所遵循的寫作風格指南與流程。
---

:::warning
本文檔仍在撰寫中。
:::

## 撰寫指引

在為文件網站撰寫內容時，
請遵循 [Google 開發者文件風格指南][Google developer documentation style guide]，
但若 [Dash docs 指南][Dash docs guidelines] 與其有衝突時，請以 Dash docs 指南為準。

[Google developer documentation style guide]: https://developers.google.com/style
[Dash docs guidelines]: #dash-docs-風格

### Dash docs 風格

:::warning
本節內容仍在撰寫中。
未來將持續補充。
:::

## 語意斷行（Semantic breaks）

為了讓 PR 審查、差異比對與歷史追蹤更加容易，
在撰寫 Markdown 時請使用 [語意斷行（semantic breaks）][semantic breaks]。
可參考[完整規範][sembr-spec]，
但大致上請遵循以下原則：

- 每行請保持在 80 個字元以內。
- 於句子結尾處換行，除非句子非常短，也可在句內片語處換行。
- 若必須將一句話拆成多行，
  請盡量選擇讓人一眼看出
  下一行是同一句話延續的位置斷行。
  這樣未來的編輯者或審查者較容易
  注意到這次的修改可能會影響到其他行。

一開始在寫作時加入語意斷行可能會覺得繁瑣，
但很快就會發現這樣做非常有幫助，並且會變得自然。
不需要擔心斷行是否完美或完全一致，
只要有朝語意斷行努力就非常有幫助。

若想進一步了解這個技巧的由來，
也可以參考 Brandon Rhode 的 [Semantic Linefeeds][Semantic Linefeeds] 文章。

[semantic breaks]: https://sembr.org/
[sembr-spec]: https://sembr.org/#:~:text=seen%20by%20readers.-,Semantic%20Line%20Breaks%20Specification,-(SemBr)
[Semantic Linefeeds]: https://rhodesmill.org/brandon/2012/one-sentence-per-line/

## 連結

### 撰寫連結文字

請使用具描述性的連結文字，並遵循
Google 關於[交叉參照與連結][Cross-references and linking]的指引。

[Cross-references and linking]: https://developers.google.com/style/cross-references

### 設定連結目標

為了讓編輯更容易、行數更短且減少重複，
建議優先使用 Markdown 連結參照方式，而非行內連結。

請將連結定義放在
當前區段結尾處、下一個標題之前。

若某個連結定義在同一頁多次使用，
可以將其放在文件最底部。

### 讓連結於新分頁開啟

如果你希望連結預設於新分頁開啟，
請加上 `target="_blank"` 與 `rel="noopener"` 屬性。

Markdown 連結範例如下：

```md
[Link text][link-ref]{: target="_blank" rel="noopener"}
```

針對 HTML 連結：

```html
<a href="#link-ref" target="_blank" rel="noopener">Link text</a>
```
