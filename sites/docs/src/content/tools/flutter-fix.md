---
title: Flutter fix
description: 利用 Flutter Fix 功能協助您讓程式碼保持最新狀態。
---

隨著 Flutter 持續演進，我們提供了一個工具，協助您清理程式碼中已淘汰（deprecated）的 API。此工具隨 Flutter 一同提供，會建議您可以對程式碼進行的變更。您可以透過命令列介面（Command Line Interface）使用這個工具，也可以在 Android Studio 和 Visual Studio Code 的 IDE 外掛中找到整合。

:::tip
這些自動化更新在 IntelliJ 和 Android Studio 中稱為 _快速修正（quick-fixes）_，在 VS Code 中則稱為 _程式碼操作（code actions）_。
:::

## 套用單一修正

您可以使用任何支援的 IDE，一次套用一個修正。

### IntelliJ 和 Android Studio

當分析器偵測到已淘汰的 API 時，
該行程式碼會出現一個燈泡圖示。
點擊燈泡會顯示建議的修正，
將該程式碼更新為新的 API。
點擊建議的修正即可執行更新。

![Screenshot showing suggested change in IntelliJ](/assets/images/docs/development/tools/flutter-fix-suggestion-intellij.png)<br>
IntelliJ 中的範例快速修正

### VS Code

當分析器偵測到已淘汰的 API 時，
會顯示一個錯誤提示。
您可以採取以下任一動作：

* 將滑鼠游標懸停在錯誤上，然後點擊
  **Quick Fix** 連結。
  這會顯示一個僅包含
  修正項目的篩選清單。

* 將游標放在有錯誤的程式碼上，並點擊
  出現的燈泡圖示。
  這會顯示所有動作的清單，包括
  重構（refactor）。

* 將游標放在有錯誤的程式碼上，
  然後按下快捷鍵
  （macOS 為 **Command+.**，其他平台為 **Control+.**）
  這會顯示所有動作的清單，包括
  重構（refactor）。

![Screenshot showing suggested change in VS Code](/assets/images/docs/development/tools/flutter-fix-suggestion-vscode.png)<br>
VS Code 中的範例程式碼操作

## 套用專案範圍的修正

[dart fix Decoding Flutter][]

若要檢視或套用整個專案的變更，
您可以使用命令列工具 [`dart fix`][]。

此工具有兩個選項：

* 若要查看所有可用變更的完整清單，請執行以下指令：

  ```console
  $ dart fix --dry-run
  ```

* 若要批次套用所有變更，請執行以下指令：

  ```console
  $ dart fix --apply
  ```

如需更多關於 Flutter 棄用（deprecations）的資訊，請參閱
[Deprecation lifetime in Flutter][]，這是一篇發表於 Flutter 官方 Medium 的免費文章。


[Deprecation lifetime in Flutter]: {{site.flutter-blog}}/deprecation-lifetime-in-flutter-e4d76ee738ad
[`dart fix`]: {{site.dart-site}}/tools/dart-fix
[dart fix Decoding Flutter]: {{site.yt.watch}}?v=OBIuSrg_Quo
