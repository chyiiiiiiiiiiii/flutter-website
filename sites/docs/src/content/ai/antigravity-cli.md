---
title: Antigravity CLI
shortTitle: CLI
sidenav: ai
description: 了解如何在 Dart 和 Flutter 中使用 Antigravity CLI。
---

## 簡介

[Antigravity CLI][]（使用可執行指令 `agy`）
是 **Antigravity 2.0** 代理式 (agentic) 程式碼助理的終端機介面 (TUI)。
它可直接連線至你的工作區，
並運用 **Dart 與 Flutter MCP 伺服器**，
協助你從命令列建置、修改、測試及發佈 Flutter 應用程式。

Antigravity CLI 取代了舊版的 Gemini CLI。

[Antigravity CLI]: https://antigravity.google/docs/cli

## 安裝

依照你所使用的平台，執行對應的指令，在機器上安裝 Antigravity CLI：

<Tabs key="install-antigravity-cli">
<Tab name="macOS / Linux">

```bash
curl -fsSL https://antigravity.google/install.sh | bash
```

</Tab>
<Tab name="Windows (PowerShell)">

```powershell
irm https://antigravity.google/install.ps1 | iex
```

</Tab>
<Tab name="Windows (Command Prompt)">

```cmd
winget install Google.AntigravityCLI
```

</Tab>
</Tabs>

安裝完成後，執行以下指令確認工具已加入路徑：

```console
$ agy --version
agy version 2.0.0
```

## 從 Gemini CLI 遷移

若你先前使用過 Gemini CLI 或適用於 Flutter 的 Gemini CLI 擴充功能，
遷移至 Antigravity CLI 的步驟十分簡單。

### 自動遷移

第一次在終端機執行 `agy` 時，
工具會檢查現有的 Gemini 設定檔
（例如 `~/.gemini/config/mcp_config.json`
或舊版環境變數）。
若偵測到相關設定，工具會詢問你是否要
自動遷移設定、偏好項目及 API 組態。

### 手動遷移

若你想手動遷移插件與歷史記錄，
或是跳過了自動設定流程，
請執行匯入插件工具指令：

```bash
agy plugin import gemini
```

此指令會解析你本機的 Gemini 組態，
並將其設定複製到你目前的 Antigravity 設定檔中。

## 工作區組態與規則

與舊版 Gemini CLI 工具相同，
Antigravity CLI 支援存放於工作區目錄中的
自訂開發指南與組態：

- **本機規則**：你可以在專案目錄中放置規則檔案
  （例如 `.agents/skills/` 或 `AGENTS.md`），
  以告知代理程式特定的程式碼風格指南
  或架構模式。
  請注意，Antigravity CLI 亦支援向下相容
  舊版 `GEMINI.md` 檔案；
  不過，我們建議將其重新命名為 `AGENTS.md`。
- **全域組態**：Antigravity CLI 將全域設定
  與已設定的 MCP 伺服器儲存於 `~/.antigravity/`
  （例如 `~/.antigravity/mcp_config.json`）。
