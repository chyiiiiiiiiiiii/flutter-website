---
title: Google Antigravity
shortTitle: Antigravity
sidenav: ai
description: 了解 Google Antigravity 代理程式編碼工具。
---

## 簡介

Google Antigravity 是一套用於建置應用程式（包括 Flutter 應用程式）的代理式 (agentic) 開發工具套件。
你可以與 Antigravity 協作，完成編碼任務、建立全新的程式碼庫、修改現有程式碼庫，以及回答問題。

Antigravity 套件包含：

* **Antigravity 2.0**：核心代理式助理體驗，透過終端機使用者介面 (TUI) 或命令列介面 (CLI) 驅動。
* **Antigravity IDE**：以整合式代理面板為特色的專注編輯器體驗。

本頁說明 Antigravity IDE。
如需使用命令列工具的詳細資訊，請參閱 [Antigravity CLI](/ai/antigravity-cli) 頁面。


若要了解 Antigravity 的部分功能，請觀看這場來自 Google I/O 2026 的演講。

<YouTubeEmbed id="UNdQhnpm8GY"
  title="Vibe once, run anywhere with Google Antigravity and Flutter"></YouTubeEmbed>

## 安裝與設定 {: #setup}

前往 [Antigravity 網站](https://antigravity.google/download)，為你的平台安裝最新版本的 Antigravity。

 1. <h3>開啟 Antigravity</h3>

    第一次開啟 Antigravity 時，畫面上會顯示 **How do you want to use Antigravity**
    畫面，並提供一些單選按鈕與下拉式選單供你自訂工具的使用方式。

    我們建議選取 **Review-driven development**。
    這表示 Antigravity 在每次執行指令前都會要求你核准。

    你可以隨時變更此設定，以賦予 Antigravity 更多或更少的控制權。
    即使你選取 **Agent driven development**（允許 Antigravity 直接執行指令而無需核准），
    你仍可指定某些指令_永遠_需要你的核准，例如刪除檔案的 `rm` 指令。

 1. <h3>安裝 Dart 和 Flutter 擴充功能</h3>

    開啟左側導覽列中的 **Extensions** 選單並搜尋 Dart。
    搜尋結果會同時顯示 Dart 和 Flutter 擴充功能。
    點擊 Dart 的 **Install** 按鈕，然後對 Flutter 執行相同操作。

 1. <h3>設定你使用的 MCP 伺服器</h3>

    1.  導覽至或開啟 **Agent** 側邊面板。

        若已關閉，請透過以下任一方式開啟：

        * 按下 <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>。
        * 前往 **View**
          <span aria-label="and then">></span> **Open View...**
          <span aria-label="and then">></span> **Agent**。

        在 **Agent** 面板的右上角，點擊 **Additional options**（`...`）選單按鈕。

    1.  選取 **MCP Servers**。

    1.  在 **Agent** 面板的右上角，點擊 **Manage MCP Servers**。

        畫面上會出現 **MCP Store**，你可以搜尋 Dart（可能已在清單中）。
        點擊 **Install**。

        安裝完所有所需伺服器後，點擊 **Manage MCP Servers** 按鈕來檢視它們，
        並點擊 **View raw config** 以存取你的 JSON 清單。

 1. <h3>開始開發</h3>

    如需了解這些技巧及更多 Antigravity 優勢，
    請觀看以下 10 分鐘的 [Flutter + Antigravity 影片][ag-video]：

    <YouTubeEmbed id="YY2w2JEX2xk"
      title="Flutter + Antigravity in 10 minutes"></YouTubeEmbed>

    如需在 Antigravity 中建立新 Flutter 應用程式的逐步說明，
    請前往[建立新的 Flutter 應用程式][Create a new Flutter app]。
    若要深入了解 Dart 和 Flutter 擴充功能所啟用的開發功能，
    請參閱[如何在 VS Code 中開發 Flutter 應用程式][vs-code]。

{:.steps}

## 代理式熱重載 (Agentic Hot Reload) {: #agentic-hot-reload}

如果你在 Agent 模式下使用 Antigravity，
當你提示代理程式修改你的應用程式時，代理程式可以自動熱重載 (hot reload) 你正在執行的應用程式。
這實現了免手動操作的「提示即重載」工作流程，
減少了情境切換與開發延遲。

[ag-video]: {{site.youtube-site}}/watch?v=YY2w2JEX2xk&t=1s
[Create a new Flutter app]: /reference/create-new-app#antigravity
[vs-code]: /tools/vs-code
