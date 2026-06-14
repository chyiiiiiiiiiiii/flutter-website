# Linux 上的執行緒合併

> 瞭解 Flutter 3.39 在 Linux 上的執行緒變更。



## 摘要

Flutter 3.39 預設將 Linux 上的 UI 執行緒與平台執行緒合併。

## 背景

最初，Flutter 使用獨立的執行緒來產生 UI 畫面，以及與原生平台互動。

分離執行緒的設計導致 Flutter 應用程式與插件無法使用 Dart FFI，與必須在平台執行緒上呼叫的原生 API 進行互通。

## 變更說明

Flutter 3.39 版預設將 Linux 上的 UI 執行緒與平台執行緒合併。

這與其他平台的做法一致，其他平台已分別在 Flutter 3.29（iOS 與 Android）及 3.35（macOS 與 Windows）預設合併執行緒。

## 遷移指南

執行緒合併不應影響您的應用程式。

若您懷疑執行緒合併導致應用程式出現效能退化，請於 [Issue 150525][] 回報。

## 時間軸

導入版本：3.39.0-0.1.pre<br>
穩定版本：3.41

## 參考資料

相關 issue：

* [Issue 150525][]

相關 PR：

* [PR 176759][]

[Issue 150525]: https://github.com/flutter/flutter/issues/150525
[PR 176759]: https://github.com/flutter/flutter/pull/176759

