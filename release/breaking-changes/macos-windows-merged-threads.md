# macOS 與 Windows 上的執行緒合併

> 了解 Flutter 3.35 在 macOS 與 Windows 上的執行緒變更。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Flutter 3.35 預設在 macOS 與 Windows 上合併 UI 與平台執行緒。

## 背景說明

最初，Flutter 會分別使用不同的執行緒來產生 UI 畫面與與原生平台互動。

這種分離執行緒的設計，會導致 Flutter 應用程式與插件無法透過 Dart FFI 與必須在平台執行緒上呼叫的原生 API 進行互操作。

## 變更說明

Flutter 3.35 預設在 macOS 與 Windows 上合併 UI 與平台執行緒。

這與 iOS 與 Android 一致，這兩個平台的執行緒已於 Flutter 3.29 預設合併。

## 遷移指南

執行緒合併應不會影響您的應用程式。

如果您懷疑執行緒合併導致應用程式出現問題，請在 [Issue 150525][] 提出反饋。

## 時程

合併於版本：3.33.0-0.0.pre<br>
穩定版釋出：3.35

## 參考資料

相關議題：

* [Issue 150525][]

相關 PR：

* [PR 166536][]
* [PR 167472][]

[Issue 150525]: https://github.com/flutter/flutter/issues/150525
[PR 166536]: https://github.com/flutter/flutter/pull/166536
[PR 167472]: https://github.com/flutter/flutter/pull/167472

