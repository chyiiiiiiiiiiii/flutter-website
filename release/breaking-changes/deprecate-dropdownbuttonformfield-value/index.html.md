# 停用 'DropdownButtonFormField' 建構函式的 'value' 參數

> `DropdownButtonFormField` 建構函式參數 `value` 已被參數 `initialValue` 取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`DropdownButtonFormField`][] 建構函式的 `value` 參數已被棄用，建議改用 `initialValue` 參數。

## 背景說明

[`DropdownButtonFormField`][] 建構函式的 `value` 參數過去用來初始化 [`DropdownButtonFormField.initialValue`][]。
由於參數名稱不一致，造成了混淆。例如，開發者可能誤以為設定 `value` 會變更目前選取的值，但實際上並非如此——它僅會設定初始值，或在欄位重設時生效。

## 變更說明

[`DropdownButtonFormField`][] 建構函式的 `value` 參數現已棄用，請改用名為 `initialValue` 的參數。

## 遷移指南

請將 [`DropdownButtonFormField`][] 建構函式中的 `value` 參數，替換為 `initialValue` 參數，以初始化
[`DropdownButtonFormField.initialValue`][]。

遷移前的程式碼：

```dart highlightLines=2
DropdownButtonFormField(
  value: 'Yellow',
),
```

遷移後的程式碼：

```dart highlightLines=2
DropdownButtonFormField(
  initialValue: 'Yellow',
),
```

## 時程

合併於版本：3.35.0-0.0.pre<br>
正式版釋出：3.35

## 參考資料

API 文件：

- [`DropdownButtonFormField`][]
- [`DropdownButtonFormField.initialValue`][]

相關議題：

- [Issue #169983][]

相關 PR：

- [Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`][]

[`DropdownButtonFormField`]: https://api.flutter.dev/flutter/material/DropdownButtonFormField/DropdownButtonFormField.html
[`DropdownButtonFormField.initialValue`]: https://main-api.flutter.dev/flutter/widgets/FormField/initialValue.html
[Issue #169983]: https://github.com/flutter/flutter/issues/169983
[Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]: https://github.com/flutter/flutter/pull/170805

