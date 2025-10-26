---
title: 建立有用的錯誤回報
description: >
  在哪裡提交 Flutter 及網站的錯誤回報與功能增強請求。
---

本文件說明目前提交有助於處理崩潰或其他異常行為的錯誤回報所需的步驟。每個步驟都不是強制性的，但都能大幅提升問題被診斷與解決的速度。感謝您盡可能提供更多回饋給我們。

## 在 GitHub 建立 Issue

* 若要回報 Flutter 的崩潰或錯誤，請[在 flutter/flutter 專案中建立 issue][Flutter issue]。
* 若要回報網站相關問題，請[在 flutter/website 專案中建立 issue][Website issue]。

## 提供最小可重現的程式碼範例

建立一個最小的 Flutter 應用程式，能夠展示您遇到的問題，並將其貼到 GitHub issue 內。

您可以使用 `flutter create bug` 指令來建立，並更新 `main.dart` 檔案。

另外，您也可以使用 [DartPad][DartPad]，它可以建立並執行小型 Flutter 應用程式。

如果您的問題無法只用單一檔案重現，例如遇到原生通道（native channels）相關問題，您可以將完整重現用的程式碼上傳到另一個儲存庫，並提供連結。

## 提供一些 Flutter 診斷資訊

* 在您的專案目錄下執行 `flutter doctor -v`，並將結果貼到 GitHub issue 內：

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

僅當你的問題與 `flutter` 工具相關時，請依照以下步驟操作。

* 所有 Flutter 指令皆接受 `--verbose` 旗標。
  若將此指令的輸出附加於問題回報中，可能有助於診斷問題。
* 請將指令執行結果附加至 GitHub 問題單。
![flutter verbose](/assets/images/docs/verbose_flag.png){:width="100%"}

## 提供最新的日誌紀錄

* 目前已連接裝置的日誌可透過 `flutter logs` 取得。
* 若當機可重現，請先清除日誌（在 Mac 上為 ⌘ + k），再重現當機，並將新產生的日誌複製到檔案中，隨同錯誤回報一併附上。
* 若你遇到框架（framework）拋出的例外，請包含第一個此類例外的所有輸出內容（包含首尾的虛線）。
![flutter logs](/assets/images/docs/logs.png){:width="100%"}

## 提供當機報告

* 當 iOS 模擬器發生當機時，會在 `~/Library/Logs/DiagnosticReports/` 產生當機報告。
* 當 iOS 裝置發生當機時，會在 `~/Library/Logs/CrashReporter/MobileDevice` 產生當機報告。
* 請找到與當機對應的報告（通常是最新的一份），並將其附加至 GitHub 問題單。
![crash report](/assets/images/docs/crash_reports.png){:width="100%"}



[DartPad]: {{site.dartpad}}
[Flutter issue]: {{site.repo.flutter}}/issues/new/choose
[Website issue]: {{site.repo.this}}/issues/new/choose
