---
title: Flutter 與 Dart 的 AI 規則
description: >
  學習如何將 AI 規則加入工具，以加速你的
  開發工作流程。
---

本指南說明如何運用 AI 規則來
簡化你的 Flutter 與 Dart 開發流程。

## 概覽

AI 驅動的編輯器會使用規則檔（rules file）來為底層的大型語言模型 (LLM) 提供上下文與指示。這些檔案能協助你：

*   根據團隊需求自訂 AI 行為。
*   強制執行專案的程式碼風格與設計最佳實踐。
*   為 AI 提供關鍵的專案背景資訊。

<a class="filled-button" style="margin-bottom: 0.5rem;" href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/master/docs/rules/rules.md" download>
  <span aria-hidden="true" class="material-symbols" translate="no">download</span>
  <span>下載 Flutter 與 Dart 規則範本</span>
</a>

## 支援規則的環境

許多 AI 環境支援規則檔，用以引導
大型語言模型 (LLM) 的行為。以下是一些常見範例及其對應的規則檔名稱：

| 環境 | 規則檔 | 安裝說明                     |
| :--- | :--- |:----------------------------------------------|
| Copilot 驅動的 IDE | `copilot-instructions.md` | [Configure .github/copilot-instructions.md][Configure .github/copilot-instructions.md] |
| Cursor | `cursor.md` | [Configure cursorrules.md][Configure cursorrules.md]                  |
| Firebase Studio | `airules.md` | [Configure airules.md][Configure airules.md]                      |
| Gemini CLI | `GEMINI.md` | [Configure GEMINI.md][Configure GEMINI.md]                       |
| JetBrains IDEs | `guidelines.md` | [Configure guidelines.md][Configure guidelines.md]                   |
| VS Code | `.instructions.md` | [Configure .instructions.md][Configure .instructions.md]                |
| Windsurf | `guidelines.md` | [Configure guidelines.md][Configure guidelines.md]                   |

[Configure airules.md]: https://firebase.google.com/docs/studio/set-up-gemini#custom-instructions
[Configure .github/copilot-instructions.md]: https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions
[Configure cursorrules.md]: https://docs.cursor.com/en/context/rules
[Configure guidelines.md]: https://www.jetbrains.com/help/junie/customize-guidelines.html
[Configure .instructions.md]: https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions
[Configure guidelines.md]: https://docs.windsurf.com/windsurf/cascade/memories#rules
[Configure GEMINI.md]: https://codelabs.developers.google.com/gemini-cli-hands-on

## 為你的編輯器建立規則

你可以根據我們的 Flutter 與 Dart 規則範本，調整成適合你特定環境的版本。請依照下列步驟操作：

1.  下載 Flutter 與 Dart 規則範本：
    <a href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/master/docs/rules/rules.md" download>rules.md</a>

1.  在像 [Gemini][Gemini] 這樣的大型語言模型 (LLM) 中，附加你在
    上一步下載的 `rules.md` 檔案。
    
1.  提供提示詞（prompt），請 AI 重新格式化該檔案以符合你想要的編輯器。

    範例提示詞：

    ```text
    Convert the attached rules.md file
    into a guidelines.md file for Gemini CLI. Make sure
    to use the styles required for a guidelines.md file.
    ```

1.  檢查大型語言模型 (LLM) 的輸出，並進行必要的調整。

1.  依照您的環境指示，新增規則檔案。這可能包括將內容加入現有檔案，或建立新的檔案。

1.  確認您的 AI 助理已經使用新規則來引導其回應。

[Gemini]: https://gemini.google.com/
