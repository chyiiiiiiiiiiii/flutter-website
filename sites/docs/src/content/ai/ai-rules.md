---
title: Flutter 與 Dart 的 AI 規則
sidenav: ai
shortTitle: AI 規則
description: >-
  了解如何在工具中新增 AI 規則，以加速您的
  開發工作流程。
---

本指南說明如何善用 AI 規則來簡化您的 Flutter 與 Dart 開發流程。

:::note Agent 技能
規則用於設定所有任務的預設行為，
您也可以使用 [Agent 技能](/ai/agent-skills) 為 AI 提供特定工具
與針對個別任務的操作指示。
:::

## 概覽 {:#overview}

以 AI 驅動的編輯器會使用規則檔案，向底層的 LLM (Large Language Model，大型語言模型) 提供情境與指示。這些檔案可協助您：

*   依據團隊需求自訂 AI 行為。
*   強制執行程式碼風格與設計的專案最佳實踐。
*   向 AI 提供關鍵的專案情境資訊。

Flutter 專案提供多個版本的規則檔案，以因應不同工具的字元上限：

*   [`rules.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md)：
    完整的主要規則集。
*   [`rules_10k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_10k.md)：
    精簡版本（< 10,000 字元），適用於情境上限較嚴格的工具。
*   [`rules_4k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_4k.md)：
    高度濃縮版本（< 4,000 字元），適用於情境受限的環境。
*   [`rules_1k.md`](https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules_1k.md)：
    超精簡版本（< 1,000 字元），適用於限制極為嚴格的環境。

<a class="filled-button" style="margin-bottom: 0.5rem;" href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md" download>
  <Icon id="download" />
  <span>下載 Flutter 與 Dart 規則範本</span>
</a>

## 裝置與編輯器的個別上限 {:#device-editor-specific-limits}

不同的 AI 程式碼助理與工具，對其「規則」或「自訂指示」檔案有不同的上限。*最後更新：2026-01-05。*

| 工具 / 產品 | 規則檔案 / 功能 | 上限（軟性 / 硬性） | 文件 |
|:---|:---|:---|:---|
| Antigravity (Google) | `.agent/rules/<rule-name>.md` | 12,000 字元（硬性） | [設定規則][antigravity] |
| Claude Code | `CLAUDE.md` | 無硬性上限 | [Claude Code Docs](https://code.claude.com/docs/en/memory) |
| Cursor | `AGENTS.md` | 無硬性上限 | [Cursor Docs](https://cursor.com/docs/context/rules) |
| Gemini CLI | `GEMINI.md` | 1M+ Token（情境） | [Gemini CLI Docs](https://cloud.google.com/vertex-ai/generative-ai/docs/long-context) |
| GitHub Copilot | `.github/copilot-instructions.md` | 約 4,000 字元 | [GitHub Copilot Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot) |
| JetBrains AI (Junie) | `.junie/guidelines.md` | 無硬性上限 | [JetBrains AI Docs](https://www.jetbrains.com/help/junie/get-started-with-junie.html) |
| VS Code | `.instructions.md` | 未知 | [設定指示][vs-code] |

{:.table .table-striped}

:::note 支援持續演進中
規則檔案的支援仍在持續演進。
請查閱您所使用開發環境的文件，
以取得最新的命名慣例與操作說明。
:::

[copilot]: https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_use-a-githubcopilotinstructionsmd-file
[claude]: https://www.anthropic.com/engineering/claude-code-best-practices#1-customize-your-setup
[cursor]: https://cursor.com/docs/context/rules
[firebase]: https://firebase.google.com/docs/studio/set-up-gemini#custom-instructions
[gemini-cli]: https://geminicli.com/docs/cli/gemini-md
[antigravity]: https://antigravity.google/docs/rules-workflows
[junie]: https://www.jetbrains.com/help/junie/customize-guidelines.html
[vs-code]: https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_use-instructionsmd-files
[windsurf]: https://docs.windsurf.com/windsurf/cascade/memories#rules

## 為您的編輯器建立規則 {:#create-rules-for-your-editor}

您可以依據您的特定環境調整我們的 Flutter 與 Dart 規則範本。請按照以下步驟操作：

1.  下載 Flutter 與 Dart 規則範本：
    <a href="https://raw.githubusercontent.com/flutter/flutter/refs/heads/main/docs/rules/rules.md" download><code>rules.md</code></a>

1.  在 [Gemini][] 等 LLM 中，附上您在上一步下載的
    `rules.md` 檔案。

1.  提供提示詞 (prompt)，將檔案重新格式化為您所需編輯器的格式。

    提示詞範例：

    ```text
    Convert the attached rules.md file
    into a guidelines.md file for Gemini CLI. Make sure
    to use the styles required for a guidelines.md file.
    ```

1.  審閱 LLM 的輸出內容，並進行必要的調整。

1.  依照您所使用環境的說明，新增規則檔案。
    此步驟可能需要在既有檔案中追加內容，或建立新檔案。

1.  確認您的 AI 助理已使用新規則來引導其回應。

[Gemini]: https://gemini.google.com/
