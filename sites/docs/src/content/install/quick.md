---
title: 設定並試駕 Flutter
shortTitle: 快速入門
description: >-
  使用以 Code OSS 為基礎的編輯器（例如 VS Code）在您的裝置上設定 Flutter，
  並開始開發您的第一個多平台應用程式！
showBanner: false
sitemap: false
---

{% render "docs/install/quick.md" site: site %}

## 試駕 Flutter {: #test-drive}

現在您已設定好 VS Code 與 Flutter，
是時候建立一個應用程式並試試 Flutter 開發了！

 1. <h3>建立一個新的 Flutter 應用程式</h3>

    1. 在 VS Code 中開啟指令面板 (Command Palette)。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中，開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 插件的指令。

    1. 選擇 **Flutter: New Project** 指令。

       您的作業系統或 VS Code 可能會要求存取您的文件，
       同意後即可繼續下一步。

    1. 選擇 **Application** 範本 (template)。

       VS Code 應該會以 **Which Flutter template?** 提示您。
       選擇 **Application** 以建置 (bootstrap) 一個簡單的計數器應用程式。

    1. 為您的新應用程式資料夾建立或選擇上層目錄 (parent directory)。

       此時應該會出現一個檔案對話框。

       1. 選擇或建立您希望建立專案的上層目錄。
       1. 若要確認您的選擇，
          點擊 **Select a folder to create the project in**。

    1. 輸入您應用程式的名稱。

       VS Code 應該會提示您為新應用程式輸入名稱。
       輸入 `trying_flutter` 或類似的 `lowercase_with_underscores` 名稱。
       若要確認，請按 <kbd>Enter</kbd>。

    1. 等待專案初始化完成。

       工作進度通常會以右下角的通知顯示，
       也可以從 **Output** 面板存取。

    1. 開啟 `lib` 目錄，然後開啟 `main.dart` 檔案。

       如果您對程式碼各部分的功能感到好奇，
       請查閱檔案中各處的前置說明注釋。

 1. <h3>在網頁上執行您的應用程式</h3>

    雖然 Flutter 應用程式可以在許多平台上執行，
    先試著在網頁上執行您的新應用程式吧。

    1. 在 VS Code 中開啟指令面板。

       前往 **View** <span aria-label="and then">></span> **Command Palette**
       或按下 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. 在指令面板中，開始輸入 `flutter:`。

       VS Code 應該會顯示來自 Flutter 插件的指令。

    1. 選擇 **Flutter: Select Device** 指令。

    1. 在 **Select Device** 提示中，選擇 **Chrome**。

    1. 執行或開始對應用程式進行除錯。

       前往 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按下 <kbd>F5</kbd>。

       `flutter run` 用於建置 (build) 並啟動您的應用程式，
       接著會開啟一個新的 Chrome 視窗，
       並開始執行您新建立的應用程式。

 1. <h3>試試熱重載 (Hot Reload)</h3>

    Flutter 透過**有狀態熱重載 (stateful hot reload)** 提供快速的開發週期，
    讓您無需重新啟動或遺失應用程式狀態 (app state)，
    即可重新載入正在執行的應用程式程式碼。

    您可以變更應用程式的原始碼，
    在 VS Code 中執行熱重載指令，
    然後在正在執行的應用程式中看到變更。

    1. 在正在執行的應用程式中，試著點擊幾次
       ![increment (+)][increment-button]{: .text-icon} 按鈕來增加計數器的值。

    1. 在應用程式仍在執行的情況下，對 `lib/main.dart` 檔案進行修改。

       將 `_incrementCounter` 方法中的 `_counter++` 這行
       改為遞減 `_counter` 欄位。

       ```dart diff
         setState(() {
           // ...
       -   _counter++;
       +   _counter--;
         });
       ```

    1. 儲存您的變更
       (**File** <span aria-label="and then">></span> **Save All**) 或
       點擊 **Hot Reload** ![hot reload icon][]{: .text-icon} 按鈕。

       Flutter 會在不遺失任何現有狀態的情況下更新正在執行的應用程式。
       請注意現有的數值保持不變。

    1. 再次嘗試點擊
       ![increment (+)][increment-button]{: .text-icon} 按鈕。
       請注意數值減少而非增加。

 1. <h3>探索 Flutter 側邊欄</h3>

    Flutter 插件為 VS Code 新增了一個專屬側邊欄，
    用於管理 Flutter 除錯工作階段與裝置、
    檢視程式碼與元件 (Widget) 的概覽，
    以及存取 Dart 和 Flutter DevTools。

    1. 如果您的應用程式未在執行，請再次開始除錯。

       前往 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按下 <kbd>F5</kbd>。

    1. 在 VS Code 中開啟 Flutter 側邊欄。

       可透過側邊欄中的 Flutter ![Flutter logo][]{: .text-icon} 按鈕開啟，
       或在指令面板中執行 **Flutter: Focus on Flutter Sidebar View** 指令來開啟。

    1. 在 Flutter 側邊欄的 **DevTools** 下，
       點擊 **Flutter Inspector** 按鈕。

       VS Code 中應該會開啟一個獨立的 **Widget Inspector** 面板。

       在元件檢視器 (widget inspector) 中，您可以檢視應用程式的元件樹 (widget tree)、
       查看每個元件的屬性與版面配置，以及更多功能。

    1. 在元件檢視器中，試著點擊頂層的 `MyHomePage` 元件。

       應該會開啟其屬性與版面配置的檢視，
       VS Code 編輯器也會導覽並聚焦到
       包含該元件的那一行程式碼。

    1. 探索並試用元件檢視器和 Flutter 側邊欄中的其他功能。

{:.steps}

[increment-button]: /assets/images/docs/get-started/increment-button.png
[hot reload icon]: /assets/images/docs/get-started/hot-reload.svg
[Flutter logo]: /assets/images/branding/flutter/logo/square.svg

## 繼續您的 Flutter 學習之旅 {: #next-steps}

**恭喜！**
您已安裝並試用 Flutter，
接下來可以遵循 [Flutter 學習路徑][Flutter learning pathway]、
設定[其他目標平台][additional target platform]的開發環境，
或探索以下資源繼續您的 Flutter 學習之旅。

{% render "docs/get-started/setup-next-steps.html", site: site %}

[Flutter learning pathway]: /learn/pathway
[additional target platform]: /platform-integration#setup
