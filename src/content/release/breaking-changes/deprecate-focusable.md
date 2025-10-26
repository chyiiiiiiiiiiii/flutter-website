---
title: 停用 `SemanticsProperties.focusable` 和 `SemanticsConfiguration.isFocusable`
description: >
  `focusable` 參數已被 `isFocused` 取代。
---

{% render docs/breaking-changes.md %}

## 摘要

`SemanticsProperties.focusable` 和 `SemanticsConfiguration.isFocusable` 參數已被棄用，建議改用 `SemanticsProperties.focused` 和 `SemanticsConfiguration.isFocused` 參數。

`focused` 參數現在可為 nullable。將其設為 `true` 或 `false` 時，會自動將 `isFocusable` 設為 `true`；而設為 `null` 時，則會將 `isFocusable` 設為 `false`。

## 背景說明

`SemanticsConfiguration.isFocusable` 屬性是一個布林值，表示語意節點（semantics node）是否可以取得輸入焦點，

`SemanticsConfiguration.isFocused` 則是一個布林值，表示該語意節點目前是否擁有輸入焦點。

此變更同樣適用於 `SemanticsProperties.focusable` 和 `SemanticsProperties.focused`。

我們棄用了 `isFocusable`，因為其功能已由 `isFocused` 所涵蓋。
`isFocused` 屬性現在在引擎中以三態旗標（tristate flag）儲存，此變更讓框架與引擎保持一致。

## 變更說明

`SemanticsConfiguration.isFocusable` 屬性已被棄用，建議改用 `SemanticsConfiguration.isFocused`。此屬性為可為 null 的布林值；設為 `true` 或 `false` 時會自動將 `isFocusable` 設為 `true`，設為 `null` 時則會將 `isFocusable` 設為 `false`。

## 遷移指南

請將 `SemanticsConfiguration.isFocusable` 替換為 `SemanticsConfiguration.isFocused`。

### 範例 1：將 `isFocused` 設為 `true` 時會自動將 `isFocusable` 設為 `true`。

遷移前的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocusable = true;
  config.isFocused = true;
}
```

遷移後的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocused = true;
}
```

### 範例 2：將 `isFocused` 設為 null 會自動將 `isFocusable` 設為 `false`。

遷移前的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocusable = false;
  config.isFocused = false;
}
```

遷移後的程式碼：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocused = null;
}
```


## 時程

納入版本：3.37.0-0.0.pre  
穩定版釋出：尚未


## 參考資料

API 文件：

* [`SemanticsConfiguration`][`SemanticsConfiguration`]
* [`SemanticsProperties`][`SemanticsProperties`]
* [`SemanticsNode`][`SemanticsNode`]

相關議題：

* [Issue 166092][Issue 166092]

相關 PR：

* [PR 170935][PR 170935]

[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[`SemanticsProperties`]: {{site.api}}/flutter/semantics/SemanticsProperties-class.html
[`SemanticsNode`]: {{site.api}}/flutter/semantics/SemanticsNode-class.html
[Issue 166092]: {{site.repo.flutter}}/issues/166092
[PR 170935]: {{site.repo.flutter}}/pull/170935
