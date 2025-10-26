---
title: 建立有用的錯誤回報
description: >
  回報 Flutter 及網站錯誤與功能增強需求的地點。
---

本文件說明目前提供最具參考價值的錯誤回報（如閃退或其他異常行為）所需的步驟。每個步驟都是可選的，但能大幅提升問題被診斷與處理的速度。我們非常感謝您盡可能提供更多回饋。

## 在 GitHub 建立 Issue

* 若要回報 Flutter 的閃退或錯誤，請[在 flutter/flutter 專案建立 issue][Flutter issue]。
* 若要回報網站相關問題，請[在 flutter/website 專案建立 issue][Website issue]。

## 提供最小可重現的程式碼範例

請建立一個最小的 Flutter 應用程式來展示您遇到的問題，並將該程式碼貼到 GitHub issue 中。

您可以使用 `flutter create bug` 指令來建立，並更新 `main.dart` 檔案。

另外，您也可以使用 [DartPad][DartPad]，它可以建立並執行小型 Flutter 應用程式。

如果您的問題無法只用單一檔案呈現，例如涉及原生通道（native channels）相關問題，您可以將完整重現程式碼上傳到另一個儲存庫並提供連結。

## 提供一些 Flutter 診斷資訊

* 在您的專案目錄下執行 `flutter doctor -v`，並將結果貼到 GitHub issue 中：

```plaintext
[✓] Flutter (Channel stable, 1.22.3, on Mac OS X 10.15.7 19H2, locale en-US)
    • Flutter version 1.22.3 at /Users/me/projects/flutter
    • Framework revision 8874f21e79 (5 days ago), 2020-10-29 14:14:35 -0700
    • Engine revision a1440ca392
    • Dart version 2.10.3

[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.2)
    • Android SDK at /Users/me/Library/Android/sdk
    • Platform android-30, build-tools 29.0.2
    • Java binary at: /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 1.8.0_242-release-1644-b3-6222593)
    • All Android licenses accepted.

[✓] Xcode - develop for iOS and macOS (Xcode 12.2)
    • Xcode at /Applications/Xcode.app/Contents/Developer
    • Xcode 12.2, Build version 12B5035g
    • CocoaPods version 1.9.3

[✓] Android Studio (version 4.0)
    • Android Studio at /Applications/Android Studio.app/Contents
    • Flutter plugin version 50.0.1
    • Dart plugin version 193.7547
    • Java version OpenJDK Runtime Environment (build 1.8.0_242-release-1644-b3-6222593)

[✓] VS Code (version 1.50.1)
    • VS Code at /Applications/Visual Studio Code.app/Contents
    • Flutter extension version 3.13.2

[✓] Connected device (1 available)
    • iPhone (mobile) • 00000000-0000000000000000 • ios • iOS 14.0
```

## 以詳細模式執行指令

僅當您的問題與 `flutter` 工具相關時，請依照以下步驟操作。

* 所有 Flutter 指令皆可接受 `--verbose` 旗標。
  若將此指令的輸出附加於問題回報，可能有助於診斷問題。
* 請將該指令的執行結果附加至 GitHub 問題單。
![flutter verbose](/assets/images/docs/verbose_flag.png){:width="100%"}

## 提供最新的日誌

* 可使用 `flutter logs` 取得目前連接裝置的日誌。
* 若當機可重現，請先清除日誌（在 Mac 上為 ⌘ + k），然後重現當機，並將新產生的日誌複製到檔案中，隨同錯誤回報一併附上。
* 若您遇到框架丟出例外，請包含第一個此類例外的虛線之間（含虛線）的所有輸出內容。
![flutter logs](/assets/images/docs/logs.png){:width="100%"}

## 提供當機報告

* 當 iOS 模擬器發生當機時，會在 `~/Library/Logs/DiagnosticReports/` 產生當機報告。
* 當 iOS 裝置發生當機時，會在 `~/Library/Logs/CrashReporter/MobileDevice` 產生當機報告。
* 請找到對應於此次當機的報告（通常是最新的），並將其附加至 GitHub 問題單。
![crash report](/assets/images/docs/crash_reports.png){:width="100%"}


[DartPad]: {{site.dartpad}}
[Flutter issue]: {{site.repo.flutter}}/issues/new/choose
[Website issue]: {{site.repo.this}}/issues/new/choose
