---
title: macOS 與 Windows 上的執行緒合併
description: >-
  了解 Flutter 3.35 在 macOS 與 Windows 上的執行緒變更。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 3.35 預設在 macOS 與 Windows 上合併 UI 與平台執行緒。

## 背景說明

最初，Flutter 會分別使用不同的執行緒來產生 UI 畫面與與原生平台互動。

這種分離執行緒的設計，會阻礙 Flutter 應用程式與套件（plugin）使用 Dart FFI 來與必須在平台執行緒呼叫的原生 API 進行互操作。

## 變更說明

Flutter 3.35 預設在 macOS 與 Windows 上合併 UI 與平台執行緒。

這與 iOS 與 Android 的行為一致，這些平台的執行緒在 Flutter 3.29 就已預設合併。

## 遷移指南

執行緒合併預期不會影響您的應用程式。

如果您懷疑執行緒合併導致您的應用程式出現問題，請至 [Issue 150525][Issue 150525] 回報。

## 時程

合併於版本：3.33.0-0.0.pre<br>  
穩定版釋出：3.35

## 參考資料

相關議題：

* [Issue 150525][Issue 150525]

相關 PR：

* [PR 166536][PR 166536]
* [PR 167472][PR 167472]

[Issue 150525]: {{site.repo.flutter}}/issues/150525
[PR 166536]: {{site.repo.flutter}}/pull/166536
[PR 167472]: {{site.repo.flutter}}/pull/167472

