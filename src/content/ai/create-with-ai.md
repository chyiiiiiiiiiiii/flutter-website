---
title: 使用 AI 創建
description: >
  學習如何利用 AI 建構 Flutter 應用程式，從強大的 SDK 直接將 AI 功能整合進你的應用，到加速開發流程的工具，全面提升開發效率。
---

本指南將介紹如何運用 AI 工具，為你的 Flutter 應用程式打造 AI 驅動的功能，並簡化 Flutter 與 Dart 的開發流程。

## 概覽

AI 不僅能用於打造 AI 驅動的 Flutter 應用程式，也能加速你的開發工作流程。你可以透過強大的 SDK（如適用於生成式 AI 的 Firebase SDK），將自然語言理解與內容生成等 AI 功能直接整合進你的 Flutter 應用程式。你也可以使用 AI 工具，例如 Gemini Code Assist 和 Gemini CLI，協助程式碼生成與樣板建立。這些工具由 Dart 和 Flutter MCP Server 提供支援，讓 AI 能夠取得你程式碼庫的豐富上下文。Flutter Extension for Gemini CLI 讓你能輕鬆運用官方規則、MCP server 及自訂指令來建構應用程式。此外，規則檔案有助於微調 AI 行為並強制執行專案特定的最佳實踐。

## 使用 Flutter 打造 AI 驅動體驗

在你的 Flutter 應用程式中運用 AI，可以解鎖全新的使用者體驗，讓你的應用支援自然語言理解與內容生成。

若要開始在 Flutter 中打造 AI 驅動體驗，請參考以下資源：

* [Firebase AI Logic][Firebase AI Logic] - 官方 Firebase SDK，讓你能直接在 Flutter 中使用生成式 AI 功能。相容於 Gemini Developer API 或 Vertex AI。請參閱[官方文件][firebase-ai-logic-docs]以開始使用。
* [Flutter AI Toolkit][Flutter AI Toolkit] - 一個包含預建元件（Widgets）的範例應用程式，協助你在 Flutter 中打造 AI 驅動功能

[Firebase AI Logic]: {{site.firebase}}/docs/ai-logic
[firebase-ai-logic-docs]: {{site.firebase}}/docs/ai-logic/get-started
[Flutter AI Toolkit]: {{site.url}}/ai-toolkit

## AI 開發工具

AI 不僅僅是你應用程式中的一項功能，也可以成為你開發流程中的強大助手。像是 [Gemini Code Assist](#gemini-code-assist)、[Gemini CLI](#gemini-cli)、[Claude Code][Claude Code]、[Cursor][Cursor] 和 [Windsurf][Windsurf] 等工具，可以幫助你更快撰寫程式碼、理解複雜概念並減少樣板程式碼。

[Claude Code]: https://www.claude.com/product/claude-code
[Cursor]: https://cursor.com/
[Windsurf]: https://windsurf.com/

### Gemini Code Assist

[Gemini Code Assist][Gemini Code Assist] 是一款 AI 驅動的協作工具，可在 Visual Studio Code 及 JetBrains IDE（包含 Android Studio）中使用。它能深入理解你的專案程式碼庫，並協助你：

* **程式碼補全與生成**：根據你正在撰寫的內容，建議並生成整個程式碼區塊。
* **編輯器內聊天**：你可以直接在 IDE 內詢問有關程式碼、Flutter 概念或最佳實踐的問題。
* **除錯與說明**：遇到錯誤時，你可以請 Gemini Code Assist 解釋錯誤並建議修正方式，並可結合
  [Dart 和 Flutter MCP Server][dart-mcp-flutter-docs]

[Gemini Code Assist]: https://codeassist.google/

### Gemini CLI

[Gemini CLI][Gemini CLI] 是一款命令列 AI 工作流程工具。它讓你能在不離開開發環境的情況下，與 Gemini 模型互動，執行各種任務。你可以用它來：

* 快速建立 Flutter 元件（Widget）、Dart 函式或完整應用程式的樣板。
* 使用 MCP server 工具，例如 Dart 和 Flutter MCP server
* 自動化像是將變更提交並推送到 Git 儲存庫等任務

若要開始使用，請造訪 [Gemini CLI][Gemini CLI] 官方網站，或參考這個 [Gemini CLI codelab][Gemini CLI codelab]。

[Gemini CLI]: https://geminicli.com/
[Gemini CLI codelab]: https://codelabs.developers.google.com/gemini-cli-hands-on

## Flutter Extension for Gemini CLI

[Flutter Extension for Gemini CLI][flutter-extension] 結合了 [Dart 和 Flutter MCP Server][dart-mcp-dart-docs]、規則與指令。它預設使用[Flutter 與 Dart 的 AI 規則][AI rules for Flutter and Dart]，並新增如 `/create-app` 與 `/modify` 等指令，協助你對應用程式進行結構化變更，同時自動設定 [Dart 和 Flutter MCP Server][dart-mcp-dart-docs]。

你可以透過以下指令安裝：

```bash
gemini extensions install https://github.com/gemini-cli-extensions/flutter
```

想了解更多資訊，請參閱 [blog post][flutter-extension-blog] 或 [README][flutter-extension]。

[flutter-extension]: {{site.github}}/gemini-cli-extensions/flutter
[flutter-extension-blog]: https://blog.flutter.dev/meet-the-flutter-extension-for-gemini-cli-f8be3643eaad

## Dart 與 Flutter MCP Server

為了在 Flutter 開發過程中提供協助，AI 工具需要與 Dart 與 Flutter 的開發工具進行溝通。Dart 與 Flutter MCP Server 就是用來促進這種溝通的工具。MCP（model context protocol，模型上下文協議）規範說明了開發工具如何將使用者程式碼的上下文分享給 AI 模型，讓 AI 能更好地理解並互動於程式碼之中。

Dart 與 Flutter MCP Server 提供越來越多的工具，能夠分析與修復錯誤、熱重載（hot reload）、取得選取的元件（Widget）等。這有效地橋接了 AI 的自然語言理解能力，與 Dart 與 Flutter 的開發工具套件之間的鴻溝。

若要開始使用，請參閱 dart.dev 上的 [Dart and Flutter MCP server][dart-mcp-dart-docs] 官方文件，以及 [Dart and Flutter MCP repository][dart-mcp-github]。

[dart-mcp-dart-docs]: {{site.dart-site}}/tools/mcp-server
[dart-mcp-github]: {{site.github}}/dart-lang/ai/tree/main/pkgs/dart_mcp_server
[dart-mcp-flutter-docs]: #dart-與-flutter-mcp-server

## Flutter 與 Dart 的 AI 規則

你可以在支援 AI 的編輯器中使用規則檔（rules file），為底層的大型語言模型 (LLM) 提供上下文與指令。若要開始，請參考 [AI rules for Flutter and Dart][AI rules for Flutter and Dart] 指南。

[AI rules for Flutter and Dart]: /ai/ai-rules
