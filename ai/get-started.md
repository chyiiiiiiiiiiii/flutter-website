# 開始使用 AI 開發

> 了解如何使用你偏好的程式碼輔助工具， 設定並使用適用於 Flutter 與 Dart 的 AI 代理程式插件。



AI 程式碼輔助工具可以透過撰寫程式碼、修正錯誤與建置完整功能，
加速你的 Flutter 開發工作流程。

一般用途的 AI 輔助工具預設可能沒有 Flutter 設計模式、專案診斷或
第三方套件的最新背景資訊。安裝官方的 Flutter 代理程式插件後，
你的輔助工具就能取得專為 Flutter 與 Dart 開發量身打造的工具與使用指南。

## Flutter AI 插件的運作方式 {:#how-flutter-ai-plugins-work}

**代理程式插件 (agent plugin)** 會將 AI 輔助工具理解並修改
Flutter 程式碼庫所需的工具與知識整合在一起。

當你安裝官方的 Flutter 代理程式插件後，它會讓你的輔助工具具備
四項核心能力：

* **[Agent skills](/ai/tools#agent-skills)**：來自官方 Flutter 與 Dart 儲存庫的隨選程序性指南，
  教導輔助工具如何執行特定任務，
  例如建立響應式版面配置、管理狀態，
  或撰寫元件 (Widget) 測試。
* **[Agent rules](/ai/tools#agent-rules)**：持續生效的指示，用來引導
  輔助工具的回應，例如在編輯 Flutter 元件時，
  主動觸發具狀態的熱重載 (hot reload)。
* **[Dart and Flutter MCP server](/ai/tools#dart-and-flutter-mcp-server)**：
  一個 Model Context Protocol (MCP) 伺服器，可將輔助工具連接至
  Dart SDK，讓它即時存取分析器診斷、符號解析、
  測試執行器與執行階段檢查。
* **[Specialized agents](/ai/tools#specialized-agents)**：針對特定工作流程
  量身打造的專用輔助工具角色，例如用於自動化無障礙稽核與程式碼修正的
  Flutter Accessibility (`a11y`) 代理程式。

這些工具會自動協同運作：輔助工具使用 MCP 工具查詢
即時的專案狀態與靜態分析結果，同時運用 agent skills 來引導
其程式設計策略與最佳實務。

除了核心的 Flutter 插件之外，你也可以透過
[套件技能 (package skills)](https://dart.dev/ai/package-skills)，
為輔助工具加入由第三方 `pub.dev` 套件直接提供的技能。

若想進一步了解各項工具的底層架構與功能，
請參閱 [Flutter AI 工具的運作方式](/ai/tools)。

## 選擇你的 AI 程式碼代理程式 {:#choose-your-ai-coding-agent}

請在下方選擇你的代理程式，查看如何安裝官方插件，
並設定用於 Flutter 開發的工具。

<Tabs key="ai-agent-tabs" wrapped="true">

<Tab name="Antigravity">

[Antigravity](
https://antigravity.google/docs/build-with-google/#dart-and-flutter)
是 Google 推出的代理式開發平台，包含 Antigravity
IDE、IDE 擴充功能（適用於 VS Code 與其他編輯器），以及 Antigravity CLI。

**Antigravity IDE 與擴充功能**

為 Antigravity IDE 或 Antigravity 擴充功能（例如在 VS Code 中）
安裝官方的 Dart 與 Flutter 工具：

1. 點擊齒輪圖示或按下
   <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>,</kbd>，
   開啟 Antigravity 中的 **Settings**。
1. 點擊 **Customizations** 分頁。
1. 在 **Build with Google Plugins** 區段中，點擊 **Customize**。
1. 點擊 **Dart and Flutter** 整合旁的 **Download**。

若要驗證安裝，請開啟 **Agent** 面板
(<kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>)，並詢問代理程式：

```text
Summarize the Dart and Flutter tools and skills available in this project.
```

**Antigravity CLI**

Antigravity CLI 在終端機中以 `agy` 指令執行。

1. 在專案的
   `.agents/mcp_config.json` 檔案中（或全域的
   `~/.gemini/config/mcp_config.json`）設定 Dart and Flutter MCP server：

   ```json
   {
     "mcpServers": {
       "dart": {
         "command": "dart",
         "args": ["mcp-server"]
       }
     }
   }
   ```

1. 將官方的 Flutter 與 Dart 技能安裝到你的工作區：

   ```bash
   # Install Flutter skills
   npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

   # Install Dart skills
   npx skills add dart-lang/skills --skill '*' --agent universal --yes
   ```

1. 在專案根目錄啟動互動式工作階段：

   ```bash
   agy
   ```

</Tab>

<Tab name="Claude Code">

[Claude Code](https://code.claude.com/) 是 Anthropic 推出的代理式程式碼輔助工具，
可在終端機中執行。

**安裝官方插件**

為 Claude Code 安裝官方的 Flutter 與 Dart 技能及 MCP 設定：

1. 新增 Claude Code 插件的 marketplace：

   ```bash
   claude plugin marketplace add flutter/agent-plugins
   ```

1. 安裝 Flutter 與 Dart 插件：

   ```bash
   claude plugin install dart-flutter@dart-flutter
   ```

**設定 agent rules**

Claude Code 插件會探索技能與 MCP 伺服器，
但不會自動載入插件的規則。
若要為 Claude Code 加入官方的 Flutter 規則，
請從
[官方規則儲存庫](https://github.com/flutter/agent-plugins/tree/main/rules)
中挑選你需要的規則，加入專案的 `CLAUDE.md` 檔案。

**驗證安裝**

驗證插件在 Claude Code 中是否已啟用：

```bash
claude plugin marketplace list
```

</Tab>

<Tab name="Cursor">

[Cursor](https://cursor.com/) 是建構於 VS Code 之上、
由 AI 驅動的程式碼編輯器。

**安裝官方插件**

使用下列任一方法，為 Cursor 安裝官方的 Flutter 與 Dart 技能及 MCP 設定：

* 前往 Cursor Marketplace 上的
  [Dart and Flutter 插件](https://cursor.com/marketplace/flutter)，
  並選擇 **Add to Cursor**。
* 在 Cursor 中開啟 **Customize**，然後搜尋並加入 **Dart and Flutter**。
* 在 Cursor 聊天工作階段中，執行 `/add-plugin dart-flutter`。

Cursor 會自動探索內含的技能，並設定
Dart and Flutter MCP server。

**設定 agent rules**

Cursor 支援在 `.cursor/rules/` 目錄中，
使用 `.mdc` 檔案建立限定檔案範圍的規則。
若要為 Cursor 加入官方的 Flutter 規則，
請從
[官方規則儲存庫](https://github.com/flutter/agent-plugins/tree/main/rules)
下載 `.mdc` 檔案，放入專案的 `.cursor/rules/` 目錄。

</Tab>

<Tab name="Codex">

[Codex](https://chatgpt.com/codex) 是專為
終端機與 IDE 工作流程設計的代理式程式碼輔助工具。

**安裝官方插件**

為 Codex 安裝官方的 Flutter 與 Dart 技能及 MCP 設定：

1. 新增 Codex 插件的 Dart and Flutter marketplace：

   ```bash
   codex plugin marketplace add flutter/agent-plugins
   ```

1. 安裝 Dart and Flutter 插件：

   ```bash
   codex plugin add dart-flutter@dart-flutter
   ```

**設定 agent rules**

Codex 插件會安裝技能與 MCP 伺服器，
但不會自動內含規則。
若要為 Codex 加入官方的 Flutter 規則，
請從
[官方規則儲存庫](https://github.com/flutter/agent-plugins/tree/main/rules)
下載 `.md` 規則檔案，放入專案的 `.agent/rules/` 目錄，
或將規則指示附加到 `CODEX.md`。

**驗證安裝**

驗證插件在 Codex 中是否已啟用：

```bash
codex plugin list
```

</Tab>

<Tab name="GitHub Copilot">

VS Code 中的 [GitHub Copilot](https://github.com/features/copilot) 支援
代理式程式設計、透過 MCP 呼叫工具，以及自訂的工作區指示。

**設定 MCP 伺服器**

1. 確認 VS Code 中已啟用 **Model Context Protocol (MCP)** 擴充功能。
1. 在工作區中建立或開啟 `.vscode/mcp.json`，並加入 Dart MCP
   伺服器：

   ```json
   {
     "servers": {
       "dart": {
         "command": "dart",
         "args": ["mcp-server"]
       }
     }
   }
   ```

**安裝 agent skills**

在 Flutter 專案根目錄中，使用 universal 旗標安裝官方技能：

```bash
# Install Flutter skills
npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

# Install Dart skills
npx skills add dart-lang/skills --skill '*' --agent universal --yes
```

**設定 agent rules**

GitHub Copilot 支援在
`.github/copilot-instructions.md` 中設定自訂的工作區指示。
若要為 Copilot 加入官方的 Flutter 規則，
請從
[官方規則儲存庫](https://github.com/flutter/agent-plugins/tree/main/rules)
中挑選你需要的規則，加入專案的 `.github/copilot-instructions.md` 檔案。

</Tab>

<Tab name="Other">

如果你使用其他支援 Model Context Protocol (MCP) 或
Agent Skills 規範的程式碼輔助工具（例如 Windsurf、Zed 或 Cline），
請手動設定這些工具。

**設定 MCP 伺服器**

大多數相容 MCP 的用戶端都使用標準的 JSON 設定格式。請將下列項目
加入用戶端的 MCP 設定檔：

```json
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": ["mcp-server"]
    }
  }
}
```

如需各用戶端專屬的設定指南、命令列引數與疑難排解，
請參閱 [Dart and Flutter MCP server 儲存庫](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server)。

**安裝 agent skills**

使用 `skills` CLI 將技能下載到工作區標準的
`.agents/skills` 目錄：

```bash
# Install Flutter skills
npx skills add flutter/agent-plugins --skill '*' --agent universal --yes

# Install Dart skills
npx skills add dart-lang/skills --skill '*' --agent universal --yes
```

**設定 agent rules**

如果你的程式碼輔助工具支援專案指示或規則
（例如 Windsurf 的 `.windsurfrules` 或 Cline 的 `.clinerules`），
請從
[官方規則儲存庫](https://github.com/flutter/agent-plugins/tree/main/rules)
複製或下載規則，放入輔助工具的設定檔。

</Tab>

</Tabs>

## 後續步驟 {:#next-steps}

* 若想進一步了解技能與工具如何互動，請參閱
  [Flutter AI 工具的運作方式](/ai/tools)。
* 若要探索並安裝來自相依套件的技能，請參閱
  [套件技能 (Package skills)](https://dart.dev/ai/package-skills)。
* 若要隨你自己的套件一同發布技能，請參閱
  [隨套件發布技能 (Ship skills with packages)](https://dart.dev/tools/pub/package-skills)。
* 若要讓輔助工具能搜尋官方 Flutter 與 Dart
  文件，請連接 [Developer Knowledge MCP server](
  https://developers.google.com/knowledge/mcp)。
* 若要探索官方插件，請參閱
  [flutter/agent-plugins](https://github.com/flutter/agent-plugins) 儲存庫。

