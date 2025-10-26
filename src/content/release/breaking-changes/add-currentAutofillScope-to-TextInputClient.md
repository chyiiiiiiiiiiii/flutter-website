---
title: 新增 TextInputClient.currentAutofillScope 屬性
description: >
  在 TextInputClient 介面中新增了一個新的 getter：TextInputClient.currentAutofillScope，以支援自動填充（autofill）。
---

{% render docs/breaking-changes.md %}

## 摘要

在 `TextInputClient` 介面中新增了一個新的 getter，`TextInputClient.currentAutofillScope`；所有 `TextInputClient` 的子類別都必須提供 `currentAutofillScope` 的具體實作。

這個 getter 允許 `TextInputClient` 觸發涉及多個邏輯上相關聯輸入欄位的自動填充。例如，「使用者名稱」欄位可以觸發自動填充，讓自己和與其關聯的「密碼」欄位同時被填入資料。

## 背景

在許多平台上，自動填充服務能夠在單次自動填充操作中填入多個輸入欄位。例如，使用者名稱欄位和密碼欄位通常可以一次性自動填入。因此，當 Flutter 輸入欄位即將觸發自動填充時，也應該向平台提供與其邏輯上相關聯、可自動填充的其他輸入欄位資訊。
`TextInputClient.currentAutofillScope` 定義了與此 `TextInputClient` 邏輯上相關聯、可一同自動填充的輸入欄位群組。

## 變更說明

`TextInputClient` 現在新增了一個 getter，會回傳此 client 所屬的 `AutofillScope`。
輸入 client 會透過這個 getter，從同一範圍內其他可自動填充的輸入欄位收集與自動填充相關的資訊。

```dart
abstract class TextInputClient {
  AutofillScope get currentAutofillScope;
}
```

如果你在編譯 Flutter 應用程式時看到錯誤訊息「missing concrete implementation of 'getter TextInputClient.currentAutofillScope'」（缺少 'getter TextInputClient.currentAutofillScope' 的具體實作），請依照下方的遷移步驟進行。

## 遷移指南

如果你不打算為你的 `TextInputClient` 子類別新增多欄位自動填入（multifield autofill）支援，只需在 getter 中回傳 `null` 即可：

```dart
class CustomTextField implements TextInputClient {
  // Not having an AutofillScope does not prevent the input field
  // from being autofilled. However, only this input field is
  // autofilled when autofill is triggered on it.
  AutofillScope get currentAutofillScope => null;
}
```

如果需要支援多欄位自動填充（multifield autofill），常用的 `AutofillScope` 是 `AutofillGroup` 元件（Widget）。
若要取得距離文字輸入最近的 `AutofillGroup` 元件，可以使用 `AutofillGroup.of(context)`：

```dart
class CustomTextFieldState extends State<CustomTextField> implements TextInputClient {
  AutofillScope get currentAutofillScope => AutofillGroup.of(context);
}
```

如需更多資訊，請參閱 [`AutofillGroup`][`AutofillGroup`]。

## 時程

合併於版本：1.18.0<br>  
穩定版釋出：1.20

## 參考資料

API 文件：

* [`AutofillGroup`][`AutofillGroup`]
* [`TextInputClient.currentAutofillScope`][`TextInputClient.currentAutofillScope`]

相關議題：

* [Issue 13015: Autofill support][Issue 13015: Autofill support]

相關 PR：

* [Framework PR that added autofill support][Framework PR that added autofill support]


[Framework PR that added autofill support]: {{site.repo.flutter}}/pull/52126
[Issue 13015: Autofill support]: {{site.repo.flutter}}/issues/13015

[`AutofillGroup`]: {{site.api}}/flutter/widgets/AutofillGroup-class.html
[`TextInputClient.currentAutofillScope`]: {{site.api}}/flutter/services/TextInputClient/currentAutofillScope.html
