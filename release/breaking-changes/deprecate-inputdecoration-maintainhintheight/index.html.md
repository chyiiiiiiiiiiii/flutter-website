# 棄用 `InputDecoration.maintainHintHeight`，改用 `InputDecoration.maintainHintSize`

> `InputDecoration.maintainHintHeight` 參數已被 `InputDecoration.maintainHintSize` 取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`InputDecoration.maintainHintHeight`][] 參數已被棄用，建議改用
[`InputDecoration.maintainHintSize`][] 參數。

## 背景說明

輸入裝飾器（input decorator）的預設內在尺寸會依賴提示文字（hint）的尺寸。
[`InputDecoration.maintainHintSize`][] 參數可以設為 `false`，讓內在尺寸在提示文字不可見時忽略其尺寸。
過去，`InputDecoration.maintainHintHeight` 參數是用來覆寫預設的內在高度，且不會影響內在寬度。

## 變更說明

[`InputDecoration.maintainHintHeight`][] 已被棄用，建議改用
[`InputDecoration.maintainHintSize`][]，此參數會讓內在寬度與高度都依賴提示文字的尺寸。

## 遷移指南

請將 [`InputDecoration.maintainHintHeight`][] 替換為
[`InputDecoration.maintainHintSize`][]，以覆寫預設的內在尺寸計算方式。

遷移前的程式碼：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintHeight: false,
  ),
),
```

遷移後的程式碼：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintSize: false,
  ),
),
```

## 時程

合併於版本：3.30.0-0.0.pre<br>
正式版釋出：3.32

## 參考資料

API 文件：

- [`InputDecoration.maintainHintHeight`][]
- [`InputDecoration.maintainHintSize`][]

相關議題：

- [Issue #93337][]

相關 PR：

- [Fix TextField intrinsic width when hint is not visible][]

[`InputDecoration.maintainHintHeight`]: https://api.flutter.dev/flutter/material/InputDecoration/maintainHintHeight.html
[`InputDecoration.maintainHintSize`]: https://main-api.flutter.dev/flutter/material/InputDecoration/maintainHintSize.html
[Issue #93337]: https://github.com/flutter/flutter/issues/93337
[Fix TextField intrinsic width when hint is not visible]: https://github.com/flutter/flutter/pull/161235

