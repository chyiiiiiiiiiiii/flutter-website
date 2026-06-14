# 更新 EditableText 捲動至可見行為

> 改善 EditableText 選取範圍捲動至可見的行為，始終 使用目前的選取範圍終點。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`Editable.onCaretChanged` 回呼已被移除。隨著這項變更，
`EditableText` 用於將選取範圍捲動至可見的行為
也有所調整。

## 背景

過去，在捲動至可見以顯示使用者更新時，`EditableText`
會使用多種機制來判斷選取範圍的終點或游標位置。

## 變更說明

透過移除 `Editable.onCaretChanged` 回呼，`EditableText` 現在在捲動以顯示選取範圍時，
將始終使用最新的選取範圍終點位置。
特別是在使用 `userUpdateTextEditingValue()` 從收合狀態變更為非收合狀態後，
這將提升捲動至可見的行為。

## 時程

合併於版本：3.12.0-4.0.pre<br>
正式版本：3.13.0

## 參考資料

API 文件：

* [`EditableText`](https://api.flutter.dev/flutter/widgets/EditableText-class.html)

相關 PR：

* [109114: Remove Editable.onCaretChanged callback](https://github.com/flutter/flutter/pull/109114)

