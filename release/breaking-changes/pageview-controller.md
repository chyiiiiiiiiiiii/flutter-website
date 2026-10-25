# 讓 PageView.controller 可為 null

> PageView.controller 現在可為 null。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

如果在建構函式中未提供 controller，
`controller` 成員將會是 `null`。這讓
`PageView` 及其 `controller` 屬性與其他元件 (Widget) 保持一致。

## 遷移指南

變更前：

```dart
pageView.controller.page
```

變更後：

```dart
pageView.controller!.page
```

## 時程

導入版本：3.19.0-12.0.pre<br>
穩定版發布：3.22.0

## 參考資料

相關議題：

* [PageView uses global controller, that is never disposed. (Issue 141119)][]

[PageView uses global controller, that is never disposed. (Issue 141119)]: https://github.com/flutter/flutter/issues/141119

