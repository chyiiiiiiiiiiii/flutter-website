# 使用 AI 建置

> 了解如何使用 AI 建置 Flutter 應用程式，從將 AI 功能直接整合至應用程式的強大 SDK，到加速開發工作流程的工具，一應俱全。



本指南介紹如何善用 AI 工具，為您的 Flutter 應用程式建置 AI 驅動的功能，並簡化 Flutter 與 Dart 的開發流程。

AI 既可用於以 Flutter 建置 AI 驅動的應用程式，也可用於加速您的開發工作流程。

您可以使用強大的 SDK（例如 Firebase SDK for Generative AI）將自然語言理解和內容生成等 AI 驅動功能直接整合至您的 Flutter 應用程式。

您也可以使用 AI 工具（例如 Gemini Code Assist 和 Antigravity CLI）來協助程式碼生成與專案鷹架建立。

這些工具由 Dart and Flutter MCP server 提供支援，讓 AI 能夠獲取您程式碼庫的豐富上下文資訊。

Antigravity CLI 讓您能輕鬆運用官方規則、MCP server 以及自訂指令來建置應用程式。

此外，規則檔案有助於微調 AI 的行為，並強制執行專案特定的最佳實務。

## 使用 Flutter 建置 AI 驅動體驗 {:#build-ai-powered-experiences-with-flutter}

在 Flutter 應用程式中使用 AI，可解鎖全新的使用者體驗，讓應用程式支援自然語言理解與內容生成。

若要開始在 Flutter 中建置 AI 驅動體驗，請參閱以下資源：

* [Firebase AI Logic Showcase][] - 一個透過一系列互動示範來展示 Firebase AI Logic 功能的應用程式。
* [Firebase AI Logic][] - 官方 Firebase SDK，可直接在 Flutter 中使用生成式 AI 功能。相容於 Gemini Developer API 或 Vertex AI。若要開始使用，請參閱[官方文件][firebase-ai-logic-docs]。
* [Genkit Dart][] - 一個開放原始碼框架，用於在 Dart 和 Flutter 中建置 AI 驅動功能，支援多個模型提供者、類型安全的結構描述以及內建可觀測性。若要開始使用，請參閱[快速入門指南][genkit-dart-quickstart]。
* [Flutter AI Toolkit][] - 一個範例應用程式，提供預先建置的元件 (Widget)，協助您在 Flutter 中建置 AI 驅動功能。

[Firebase AI Logic]: https://firebase.google.com/docs/ai-logic
[Firebase AI Logic Showcase]: https://github.com/flutter/demos/tree/main/firebase_ai_logic_showcase
[firebase-ai-logic-docs]: https://firebase.google.com/docs/ai-logic/get-started
[Genkit Dart]: https://genkit.dev
[genkit-dart-quickstart]: https://genkit.dev/docs/dart/overview
[Flutter AI Toolkit]: /ai/ai-toolkit

## AI 開發工具 {:#ai-development-tools}

AI 不僅是應用程式中的功能，也可以成為開發工作流程中的強大助手。[Antigravity][]、[Gemini Code Assist][]、[Antigravity CLI][]、[Claude Code][]、[Cursor][] 和 [Windsurf][] 等工具能幫助您更快速地撰寫程式碼、理解複雜概念，並減少樣板程式碼。

[Antigravity]: /ai/antigravity
[Gemini Code Assist]: /ai/coding-assistants
[Antigravity CLI]: /ai/antigravity-cli
[Claude Code]: https://www.claude.com/product/claude-code
[Cursor]: https://cursor.com/
[Windsurf]: https://windsurf.com/

### Flutter 的 GenUI SDK {: #genui }

GenUI SDK 將基於文字的對話轉換為豐富的互動體驗。本質上，它作為一個協調層，負責協調使用者、Flutter 元件與 AI 代理之間的資訊流動。

<YouTubeEmbed id="nWr6eZKM6no" title="Getting started with GenUI"></YouTubeEmbed>

:::experimental
`genui` 套件目前處於
alpha 階段，可能會有所變動。
:::

如需深入了解，請瀏覽 [Flutter 的 GenUI SDK][GenUI SDK for Flutter] 文件。

[GenUI SDK for Flutter]: /ai/genui

### Genkit Dart

[Genkit Dart](https://genkit.dev) 是一個開放原始碼、與模型無關的框架，用於在 Dart 和 Flutter 中建置 AI 驅動的應用程式。它提供一種結構化的方式，將 AI 功能整合至您的應用程式，並支援多個模型提供者，包括 Google Gemini、Anthropic Claude 和 OpenAI。

主要功能包括：

*   **與模型無關的 API**：以最少的程式碼變更在 AI 提供者之間切換。
*   **類型安全的結構描述**：使用 [`schemantic`](https://pub.dev/packages/schemantic) 套件為 AI 互動定義強型別的輸入與輸出。
*   **Flows**：可測試、可觀測且可部署的函式，以具類型的輸入與輸出包裝 AI 邏輯。
*   **Tools**：定義模型可呼叫的函式，用於擷取即時資料或執行動作。
*   **開發者 UI**：內建的網頁 UI，用於測試提示、查看執行追蹤記錄及偵錯 flows。

Genkit Dart 支援多種 Flutter 部署架構，包括完全在應用程式內執行 AI 邏輯、從 Flutter 呼叫後端 flows，或透過 Genkit 後端代理模型請求。

若要開始使用，請參閱 [Genkit Dart 快速入門](https://genkit.dev/docs/dart/get-started)。

### Antigravity

[Antigravity](https://antigravity.google/) 是一套代理式開發工具，包含：

*   **Antigravity 2.0**：核心代理式助手體驗（TUI/CLI 驅動）。
*   **Antigravity IDE**：以整合式代理面板為特色的專注編輯器體驗。

功能包括：

*   **代理式能力**：與聊天式助手不同，Antigravity 能主動編輯檔案並執行終端機指令以完成任務。
*   **複雜推理**：它能規劃並執行多步驟工作流程，適用於大型重構或功能實作。
*   **驗證**：它能執行測試並驗證自身的變更，以確保正確性。

<YouTubeEmbed
  id="YY2w2JEX2xk"
  title="Flutter + Antigravity in 10 minutes">
</YouTubeEmbed>

如需深入了解，請參閱 [Antigravity IDE](/ai/antigravity) 指南。

### Gemini Code Assist

[Gemini Code Assist](https://codeassist.google/) 是一款 AI 驅動的協作工具，適用於 Visual Studio Code、JetBrains IDE 和 Android Studio 等 IDE。它對您的專案程式碼庫有深入的了解，可協助您：

* **程式碼補全與生成**：根據您正在撰寫的內容上下文，建議並生成完整的程式碼區塊。
* **編輯器內聊天**：您可以直接在 IDE 中詢問關於程式碼、Flutter 概念或最佳實務的問題。
* **偵錯與說明**：若您遇到錯誤，可以請 Gemini Code Assist 加以說明並建議修正方案。

如需深入了解，請參閱 [AI 程式碼助手](/ai/coding-assistants)指南。

### Antigravity CLI

[Antigravity CLI](/ai/antigravity-cli) 是 Antigravity 2.0 代理式程式碼助手（`agy`）的終端機介面 (TUI)。它讓您能夠：

* 快速建立新 Flutter 元件、Dart 函式或完整應用程式的鷹架。
* 使用 MCP server 工具，例如 Dart and Flutter MCP server。
* 自動化任務，例如提交變更並推送至 Git 儲存庫。

如需深入了解，請參閱 [Antigravity CLI](/ai/antigravity-cli) 指南。

[dart-mcp-dart-docs]: /ai/mcp-server
[AI rules for Flutter and Dart]: /ai/ai-rules

### Dart and Flutter MCP server

為了在 Flutter 開發期間提供協助，AI 工具需要與 Dart 和 Flutter 的開發者工具進行通訊。Dart and Flutter MCP server 負責促進這項通訊。MCP（模型情境協定，model context protocol）規範概述了開發工具如何與 AI 模型共享使用者程式碼的上下文，讓 AI 能夠更好地理解並與程式碼互動。

Dart and Flutter MCP server 透過直接連接您的開發環境，釋放 AI 助手的完整潛力。它讓 AI 能夠：

*   **檢視元件樹**：在執行中的應用程式中視覺化並偵錯版面配置問題。
*   **管理相依套件**：在 pub.dev 上搜尋套件並新增至您的專案。
*   **控制執行時期**：觸發熱重載與重新啟動，立即查看變更。
*   **修復複雜錯誤**：以深度上下文分析靜態與執行時期錯誤。

這架起了 AI 自然語言理解能力與 Dart 和 Flutter 開發者工具套件之間的橋樑。

若要開始使用，請參閱 [Dart and Flutter MCP server][dart-mcp-dart-docs] 的官方文件。

### Flutter 和 Dart 的規則 {:#rules-for-flutter-and-dart}

您可以在 AI 驅動的編輯器中使用規則檔案，為底層 LLM 提供上下文與指示。若要開始使用，請瀏覽 [Flutter 和 Dart 的 AI 規則][AI rules for Flutter and Dart]指南。

