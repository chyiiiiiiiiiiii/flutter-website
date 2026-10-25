# Flutter AI 工具如何運作

> 了解 agent skills、Dart 與 Flutter MCP server，以及套件 skills 如何協同運作， 輔助你的開發工作流程。



Flutter 與 Dart 提供一套整合的工具組，協助 AI 程式開發助理理解你的程式碼庫、
遵循最佳實務，並準確地執行開發任務。

## 工具生態系總覽

Flutter AI 工具生態系由六個互補的元件組成：

1. **Agent skills**：以任務為導向的藍圖，教導助理如何執行特定工作流程
   （例如建立響應式版面配置或撰寫測試）。
2. **Dart 與 Flutter MCP server**：一個 Model Context Protocol (MCP) server，
   向助理提供即時的 SDK 診斷、符號解析與執行階段檢視功能。
3. **Developer Knowledge MCP server**：雲端代管的文件搜尋 server，
   讓助理能直接存取官方 Flutter 與 Dart 文件。
4. **套件 skills**：直接發布在第三方 `pub.dev` 套件內的 skills，
   讓助理立即掌握特定函式庫的專業知識。
5. **專用 agents**：配備專注工具與系統指令的專屬 agent 角色，
   用於獨立的工作流程，例如無障礙稽核。
6. **Agent rules**：每次你與助理開啟新工作階段時，
   都會加入情境視窗 (context window) 的持久性規則
   （例如指示助理在修改 Flutter 元件 (Widget) 時主動觸發 hot reload）。

---

## Agent skills

[Agent skills](https://agentskills.io/) 提供一種標準化的方式，
讓 AI 助理具備程序性的領域專業知識。

### 漸進式揭露

Skills 使用**漸進式揭露 (progressive disclosure)** 來節省模型的情境空間：

* **探索階段**：助理一開始只會從 `.agents/skills` 目錄讀取 skill 的中繼資料
  （名稱與簡短描述）。
* **執行階段**：當助理判斷某個 skill 與你的提示相關時，
  才會載入完整的指令 (`SKILL.md`) 與輔助的參考腳本。

### 官方 skills 儲存庫

* [**flutter/agent-plugins**](https://github.com/flutter/agent-plugins)：
  提供 Flutter 開發的 skills，包括元件建構、宣告式導覽、響應式設計與狀態管理。
* [**dart-lang/skills**](https://github.com/dart-lang/skills)：提供 Dart 開發的
  skills，包括撰寫單元測試、相依套件解析與靜態分析問題修復。

---

## Dart 與 Flutter MCP server

[Dart 與 Flutter MCP server](
https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server)
實作了開放的 Model Context Protocol (MCP)，
透過標準輸入輸出 (stdio) 將 AI 助理連接到即時的 Dart SDK 與 Flutter 工具。

MCP server 提供的主要功能包括：

* **靜態分析與診斷**：檢視並修正整個專案中 analyzer 的錯誤與警告。
* **符號解析**：將符號解析至其定義、簽章與文件。
* **執行階段檢視**：在進行中的除錯工作階段期間，查詢執行中 Flutter 應用程式的狀態。
* **套件管理**：搜尋 [pub.dev](https://pub.dev) 並管理 `pubspec.yaml` 中的相依套件。
* **測試與格式化**：執行單元測試與元件測試，並依照 `dart format` 規則格式化程式碼。

---

## Developer Knowledge MCP server

本機的 Dart 與 Flutter MCP server 著重於本機程式碼庫分析與執行階段除錯，
此外你也可以讓助理具備搜尋官方線上文件的能力。

[Developer Knowledge MCP server](
https://developers.google.com/knowledge/mcp)
將 AI 助理連接到 Google 的開發者文件語料庫，包括
[docs.flutter.dev](https://docs.flutter.dev)、
[dart.dev](https://dart.dev) 與官方 API 參考文件。
這讓助理能在對話過程中直接取得最新的指南、遷移說明與 API 參考文件。

---

## 套件 skills

除了 Flutter 核心 skills 之外，函式庫作者也可以將官方 skills
直接打包在他們發布於 [pub.dev](https://pub.dev) 的套件中。

當你為專案加入相依套件時，可以使用 `skills` CLI 探索並安裝它的 skills：

```bash
dart run skills@ get
```

若要了解如何探索與安裝套件 skills，請參閱
[套件 skills](https://dart.dev/ai/package-skills)。
若要將 skills 與你自己的套件一起打包，請參閱
[隨套件發布 skills](https://dart.dev/tools/pub/package-skills)。

---

## 專用 agents

**專用 agents**（在 Antigravity 等平台中稱為自訂 agents）是配置了專屬系統提示、
精選工具組與專注 skill 子集的 AI 助理。

Agent skills 在實際撰寫程式碼時引導通用型助理，
而專用 agents 則在獨立的情境中執行深入且單一目的的工作流程，
不會干擾你的主要對話紀錄。

### Flutter Accessibility agent

**Flutter Accessibility (`a11y`) agent** 是一個官方的專用 agent，
用於稽核 Flutter 元件樹 (widget tree) 並建議無障礙改進方案。
Accessibility agent 目前可在 [Google Antigravity](https://antigravity.google) 中使用。

Accessibility agent 的主要功能包括：

* **語意標籤檢查**：找出缺少描述性語意標籤的互動元件
  （例如 `IconButton` 或 `InkWell`）。
* **觸控目標驗證**：標示出點擊測試區域小於建議的 48x48 邏輯像素的互動元素。
* **對比與視覺檢查**：標示潛在的對比度問題與缺少的焦點指示器。
* **自動化程式碼修正**：產生符合慣用寫法的 Flutter 修正
  （例如以 `Semantics` 包覆元件或調整點擊範圍），供你檢視並接受。

### 在 Antigravity 中使用 accessibility agent

在 Antigravity 中安裝官方的 [Dart and Flutter plugin](
https://antigravity.google/docs/build-with-google/#dart-and-flutter) 後，
你可以在與 Antigravity 對話時直接呼叫 accessibility agent：
從 agent 選擇器中選取 **Flutter Accessibility Agent**、提及 `@flutter_a11y_agent`，
或請助理檢視你的程式碼是否符合無障礙要求：

```text
@flutter_a11y_agent Audit this screen for accessibility issues.
```

---

## Agent rules

**Agent rules** 是每次你與助理開啟新工作階段時，
都會加入情境視窗的持久性規則。
這些規則為整個程式碼庫建立專案慣例與常見限制。

若要探索官方 Flutter rules，請前往 flutter/agent-plugins 儲存庫中的
[rules 目錄](https://github.com/flutter/agent-plugins/tree/main/rules)。

---

## 何時使用哪一種

你可以用下列心智模型來理解不同的 AI 機制如何相互運作：

| 機制 | 範圍與行為 | 最適用於 |
| :--- | :--- | :--- |
| **Agent skill** | 依需求載入 | 多步驟的做法、模式 |
| **Dart MCP server** | 本機 SDK 工具 | 診斷、測試、執行階段 |
| **Developer Knowledge MCP** | 線上搜尋 | 最新文件、API 參考文件 |
| **套件 skill** | 來自相依套件 | 函式庫 API、程式碼產生 |
| **專用 agent** | 獨立的 subagent | 無障礙稽核 |
| **Agent rule** | 持久性情境 | 專案慣例、限制 |

{:.table .table-striped}

## 後續步驟

* 依照[開始使用 AI](/ai/get-started) 指南，在你的編輯器中安裝官方插件。
* 了解如何透過
  [套件 skills](https://dart.dev/ai/package-skills) 安裝 skills。
* 了解如何透過
  [隨套件發布 skills](https://dart.dev/tools/pub/package-skills) 散布 skills。

