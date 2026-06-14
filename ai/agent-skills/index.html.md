# 適用於 Flutter 和 Dart 的 Agent 技能

> 了解如何使用 Agent 技能為 AI 代理賦予新的能力與專業知識。



本指南說明如何使用 Agent 技能 (Agent Skills) 為您的 AI 代理和程式碼助理加入特定領域的能力。

## 概觀 {:#overview}

AI 代理能夠撰寫 Flutter 和 Dart 程式碼，但有時並不了解專業開發者所使用的工具與最佳實踐。

[Agent Skills](https://agentskills.io/) 透過提供標準化的方式，將一組以任務為導向的藍圖交給 AI 代理遵循，從而幫助解決這個問題。藉由給予代理真正的領域專業知識與可重複執行的工作流程，您可以大幅減少錯誤，並確保一致的模式。

若要了解 Agent Skills 如何融入您的工作流程，可以將它與其他 AI 能力比較：

*   **規則檔案：** [規則檔案](/ai/ai-rules) 用於配置代理在所有任務中的通用行為，而 Agent Skills 則為代理提供針對單一特定工作的逐步指示。
*   **模型情境協定 (Model Context Protocol，MCP)：** [Dart 和 Flutter MCP 伺服器](/ai/mcp-server) 讓您的代理能夠使用專用工具。如果說 MCP 提供的是原始機械裝置，那麼 Agent Skill 就是正確操作該裝置所需的專業知識。

技能採用我們所稱的「漸進式揭露 (progressive disclosure)」方式，類似於 Flutter 中的延遲載入。代理不會在一開始就將所有指示載入情境視窗，而是先讀取中繼資料，只有在真正需要執行手邊任務時，才載入詳細的指示內容。

## 官方儲存庫 {:#official-repositories}

Dart 和 Flutter 團隊維護了官方儲存庫，其中包含為這兩個框架量身打造的技能。

*   **[dart-lang/skills](https://github.com/dart-lang/skills)**：提供 Dart 開發的技能，可用於產生單元測試、解析套件相依性，以及修正靜態分析錯誤。
*   **[flutter/skills](https://github.com/flutter/skills)**：提供 Flutter 開發的技能，協助 AI 建置響應式版面配置、接上宣告式路由，以及實作 JSON 序列化。

## 快速入門 {:#getting-started}

相容的 AI 代理預設會在您專案工作區的 `.agents/skills` 目錄中探索 Agent Skills。

若要輕鬆下載並管理該資料夾中的技能，您可以使用 `skills` CLI 工具。它透過 npm 發布，因此您需要安裝 [Node.js](https://nodejs.org/)，才能以 `npx` 執行。

安裝官方 Flutter 技能：

```bash
npx skills add flutter/skills --skill '*' --agent universal
```

安裝官方 Dart 技能：

```bash
npx skills add dart-lang/skills --skill '*' --agent universal
```

執行上述指令後，系統會自動建立 `.agents/skills` 目錄，並將所需的技能下載至您的專案中。

如需了解可用技能、更新方式及貢獻方式，請參閱 [Dart 技能儲存庫](https://github.com/dart-lang/skills) 與 [Flutter 技能儲存庫](https://github.com/flutter/skills)。

:::tip
將技能加入專案後，可以嘗試要求您的 AI 代理查看 `.agents/skills` 目錄。您可以詢問：「我已安裝的技能中，哪些能協助我完成 [目前的任務]？」或「請摘要說明我目前可用技能的功能。」
:::

