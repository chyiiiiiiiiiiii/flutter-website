# Dart 與 Flutter MCP 伺服器

> 瞭解 Dart 與 Flutter MCP 伺服器工具，該工具可將 Dart 與 Flutter 工具公開給相容的 AI 助理用戶端與代理程式。



本指南介紹 Dart 與 Flutter MCP 伺服器。

:::experimental
Dart 與 Flutter MCP 伺服器目前仍處於實驗性階段，可能會快速演進。
以下操作說明需要 Dart 3.9 或更新版本。
:::

## 概觀

[Dart 與 Flutter MCP 伺服器][Dart and Flutter MCP server]
可將 Dart 與 Flutter 開發工具動作公開給
相容的 AI 助理用戶端。MCP（模型情境協定 (model context protocol)）
是一種協定，可讓開發工具與 AI 助理之間進行通訊，
使助理能夠理解程式碼的情境，並代替開發者執行動作。

Dart 與 Flutter MCP 伺服器可與任何支援
標準 I/O (stdio) 作為傳輸媒介的 MCP 用戶端搭配使用。
若要存取 Dart 與 Flutter MCP 伺服器的所有功能，
MCP 用戶端必須支援 [Tools][] 與 [Resources][]。
為了獲得使用 Dart 與 Flutter MCP 伺服器的最佳開發體驗，
MCP 用戶端還應支援 [Roots][]。

若您使用的用戶端宣稱支援 roots 但實際上並未設定，
請傳遞 `--force-roots-fallback` 旗標以啟用管理 roots 的工具。

Dart 與 Flutter MCP 伺服器提供一份持續增長的工具清單，
可讓 AI 助理深入瞭解您的專案。
以下為部分功能概覽：

*  分析並修正專案程式碼中的錯誤。
*  將符號解析為元素，以確認其是否存在，
   並取得相關文件與簽名資訊。
*  自我檢視並與正在執行的應用程式互動。
*  在 [pub.dev 網站](https://pub.dev) 上搜尋最適合特定使用情境的套件。
*  管理 `pubspec.yaml` 檔案中的套件相依性。
*  執行測試並分析結果。
*  使用與 [`dart format`][] 和 Dart 分析伺服器相同的格式化器和設定來格式化程式碼。

[Tools]: https://modelcontextprotocol.io/docs/concepts/tools
[Resources]: https://modelcontextprotocol.io/docs/concepts/resources
[Roots]: https://modelcontextprotocol.io/docs/concepts/roots
[Dart and Flutter MCP server]: https://github.com/dart-lang/ai/tree/main/pkgs/dart_mcp_server
[`dart format`]: https://dart.dev/tools/dart-format

## 設定您的 MCP 用戶端

使用 `dart mcp-server` 指令來執行伺服器，
並在您偏好的用戶端中完成設定。

本節提供在常用工具（例如 Antigravity、Gemini CLI、Cursor 和 GitHub Copilot）中
設定 Dart 與 Flutter MCP 伺服器的操作說明。

### Antigravity

若要設定 Google [Antigravity][] 以使用 Dart 與 Flutter MCP 伺服器，
您可以從可用伺服器清單中安裝，或
[將其作為自訂 MCP 伺服器連接][antigravity-mcp]。

1.  前往或開啟 **Agent** 側邊面板。

    若已關閉，請透過下列任一方式開啟：

    - 按下 <kbd class="special-key">Cmd/Ctrl</kbd> + <kbd>L</kbd>。
    - 前往 **View**
      <span aria-label="and then">></span> **Open View...**
      <span aria-label="and then">></span> **Agent**。

1.  在 **Agent** 面板的右上角，
    點選 **Additional options**（`...`）選單按鈕。
1.  選取 **MCP Servers**。
1.  在 **Agent** 面板的右上角，
    點選 **Manage MCP Servers**。

從這裡，您可以選擇從
[內建 MCP 商店安裝](#antigravity-mcp-store-install)，或
[手動設定](#antigravity-mcp-manual-install)。

[Antigravity]: https://antigravity.google/
[antigravity-mcp]: https://antigravity.google/docs/mcp#connecting-custom-mcp-servers

#### 從 MCP 商店安裝 {: #antigravity-mcp-store-install}

1.  在可用 MCP 伺服器清單中，
    尋找或搜尋 **Dart**，然後點選 **Install**。

#### 手動連接 {: #antigravity-mcp-manual-install}

1.  在 **Manage MCPs** 編輯器視圖的右上角，
    點選 **View raw config**。
1.  將以下 `dart-mcp-server` 項目新增至 `mcpServers` 映射中：

    ```json title="mcp_config.json" highlightLines=3-10
    {
      "mcpServers": {
        "dart-mcp-server": {
          "command": "dart",
          "args": [
            "mcp-server"
          ],
          "env": {}
        }
      }
    }
    ```

#### 安裝擴充功能

同時建議安裝 Dart 與 Flutter 擴充功能：

1.  透過下列任一方式開啟 **Extensions** 視圖：

    - 按下 <kbd>Shift</kbd> +
      <kbd class="special-key">Cmd/Ctrl</kbd> +
      <kbd>P</kbd>。
    - 前往 **View**
      <span aria-label="and then">></span> **Extensions**。

1.  在 **Search Extensions** 輸入框中，輸入 **Flutter**。
1.  從擴充功能清單中，選取 **Flutter**。
1.  在開啟的 **Extension: Flutter** 視圖中，
    點選 **Install** 按鈕。

    這將同時安裝 Dart 與 Flutter 擴充功能。

若要深入瞭解 Dart 與 Flutter 擴充功能，
請參閱[在 VS Code 中開發 Flutter 應用程式][Develop Flutter apps in VS Code]。

[Develop Flutter apps in VS Code]: /tools/vs-code

### Gemini CLI

若要設定 [Gemini CLI][] 以使用 Dart 與 Flutter MCP 伺服器，
請在 Gemini 設定檔的 `mcpServers` 區段中新增 Dart 項目。

-  若要為裝置上的所有專案啟用伺服器，
   請編輯您主目錄中的 `~/.gemini/settings.json` 檔案。
-  若要為特定專案啟用伺服器，
   請編輯該專案根目錄中的 `.gemini/settings.json` 檔案。

```json title=".gemini/settings.json"
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": [
        "mcp-server"
      ]
    }
  }
}
```

如需更多資訊，請參閱 Gemini CLI 官方文件中
關於[設定 MCP 伺服器][setting up MCP servers]的說明。

[Gemini CLI]: https://geminicli.com/
[setting up MCP servers]: https://geminicli.com/docs/tools/mcp-server/#how-to-set-up-your-mcp-server

### VS Code 中的 Gemini Code Assist

[Gemini Code Assist][] 的 [Agent mode][]（代理模式）整合了
Gemini CLI，可在您的 IDE 中直接提供強大的 AI 代理程式。
若您尚未設定 Gemini Code Assist 或其代理模式，
請按照其[開始之前的操作說明][gca-setup]進行設定。

若要設定 Gemini Code Assist 以使用 Dart 與 Flutter MCP 伺服器，
請按照[設定 Gemini CLI][configure the Gemini CLI] 的說明操作。

您可以在代理模式的聊天視窗中輸入 `/mcp`，
以確認 MCP 伺服器是否已正確設定。

如需更多資訊，請參閱 Gemini Code Assist 官方文件中
關於[使用代理模式][using agent mode]的說明。

[gca-setup]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer#before-you-begin
[Gemini Code Assist]: https://codeassist.google/
[Agent mode]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer
[configure the Gemini CLI]: #gemini-cli
[using agent mode]: https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer#before-you-begin

### VS Code 中的 GitHub Copilot

:::note
在 VS Code 中支援 Dart 與 Flutter MCP 伺服器需要
[Dart Code 擴充功能][Dart Code extension] v3.116 或更新版本。
:::

預設情況下，Dart 擴充功能會使用
[VS Code MCP API][] 來註冊 Dart 與 Flutter MCP 伺服器，
以及提供作用中 Dart Tooling Daemon URI 的工具。

透過在 VS Code 設定中設定 `dart.mcpServer` 來
明確啟用或停用 Dart 與 Flutter MCP 伺服器。

若要全域變更此設定，請更新使用者設定：

1.  在 VS Code 中，點選 **View > Command Palette**，然後
    搜尋 **Preferences: Open User Settings (JSON)**。

1.  新增以下設定：

    ```json
    "dart.mcpServer": true
    ```

若您希望此設定僅套用至特定工作區，
請將該項目新增至工作區設定：

1.  在 VS Code 中，點選 **View > Command Palette**，然後
    搜尋 **Preferences: Open Workspace Settings (JSON)**。

1.  新增以下設定：

    ```json
    "dart.mcpServer": true
    ```

如需更多資訊，請參閱 VS Code 官方文件中
關於[啟用 MCP 支援][enabling MCP support]的說明。

[Dart Code extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[VS Code MCP API]: https://code.visualstudio.com/api/extension-guides/mcp
[enabling MCP support]: https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_enable-mcp-support-in-vs-code

### Cursor

設定 Dart 與 Flutter MCP 伺服器與 Cursor 搭配使用的最簡便方式，
是點選 **Add to Cursor** 按鈕：

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=dart&config=eyJjb21tYW5kIjoiZGFydCBtY3Atc2VydmVyIn0%3D){:.light-mode-visible}
[![Add to Cursor](https://cursor.com/deeplink/mcp-install-light.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=dart&config=eyJjb21tYW5kIjoiZGFydCBtY3Atc2VydmVyIn0%3D){:.dark-mode-visible}

或者，您也可以手動設定伺服器：

1.  前往 **Cursor > Settings > Cursor Settings > Tools & Integrations**。
1.  根據您是否已設定其他 MCP 伺服器，
    點選 **Add Custom MCP** 或 **New MCP Server**。
1.  編輯本機專案中的 `.cursor/mcp.json` 檔案
    （設定僅套用至此專案），或
    編輯主目錄中的全域 `~/.cursor/mcp.json` 檔案
    （設定將套用至所有專案），
    以設定 Dart 與 Flutter MCP 伺服器：

    ```json title=".cursor/mcp.json"
    {
      "mcpServers": {
        "dart": {
          "command": "dart",
          "args": [
            "mcp-server"
          ]
        }
      }
    }
    ```

如需更多資訊，請參閱 Cursor 官方文件中
關於[安裝 MCP 伺服器][installing MCP servers]的說明。

[installing MCP servers]: https://docs.cursor.com/context/model-context-protocol#installing-mcp-servers

### OpenCode

若要設定 [OpenCode][] 以使用 Dart 與 Flutter MCP 伺服器，
請在 OpenCode 設定中新增 `dart-mcp-server` 項目。

OpenCode 設定通常位於 `~/.opencode/config.json`
或您專案的 `opencode key` 設定中。

```json title="~/.opencode/config.json"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "dart-mcp-server": {
      "type": "local",
      "command": [
        "dart",
        "mcp-server"
      ],
      "enabled": true,
      "environment": {}
    }
  }
}
```

[OpenCode]: https://opencode.ai/

### Claude Code

若要設定 Claude Code 為目前專案使用 Dart 與 Flutter MCP 伺服器，
請使用 `claude mcp add` CLI 指令：

```console
$ claude mcp add --transport stdio dart -- dart mcp-server
```

若要深入瞭解如何在 Claude Code 中設定 MCP 伺服器，
請參閱其關於[安裝 MCP 伺服器][claude-install]的文件。

[claude-install]: https://code.claude.com/docs/en/mcp#installing-mcp-servers

### Codex CLI

若要設定 Codex CLI 為目前專案使用 Dart 與 Flutter MCP 伺服器，
請使用 `codex mcp add` CLI 指令：

```console
$ codex mcp add dart -- dart mcp-server --force-roots-fallback
```

若要深入瞭解如何在 Codex CLI 中設定 MCP 伺服器，
請參閱其關於[連接至 MCP 伺服器][codex-connect]的文件。

[codex-connect]: https://developers.openai.com/codex/mcp

## 使用您的 MCP 用戶端

在您完成 Dart 與 Flutter MCP 伺服器與用戶端的設定後，
Dart 與 Flutter MCP 伺服器不僅可讓用戶端推理您專案的情境，
還能透過工具採取行動。

[大型語言模型 (LLM)][LLM] 會決定使用哪些工具以及何時使用，
因此您可以專注於以自然語言描述您的目標。
以下透過幾個在 VS Code 中使用 GitHub Copilot 代理模式的範例，
來了解其實際運作方式。

[LLM]: https://developers.google.com/machine-learning/resources/intro-llms

### 修正 Flutter 應用程式中的執行時期版面配置錯誤

您一定曾經遇過這種情況：建置了漂亮的 UI，執行應用程式，
卻看到令人頭痛的 RenderFlex 溢位錯誤黃黑條紋。
現在您不必手動偵錯元件 (Widget) 樹，
只需向 AI 助理提出類似以下的提示即可尋求協助：

> 檢查並修正靜態和執行時期分析問題。
> 檢查並修正任何版面配置問題。

在背後，AI 代理程式使用 Dart 與 Flutter MCP 伺服器的工具來：

*  查看錯誤：使用工具從正在執行的應用程式取得目前的執行時期錯誤。
*  檢視 UI：存取 Flutter 元件樹，以瞭解造成溢位的版面配置。
*  套用修正：掌握此情境後，套用修正並再次檢查是否有任何殘留錯誤。

您可以自行決定是否保留或還原程式碼變更。

### 透過套件搜尋新增功能

假設您需要在應用程式中新增圖表。
應該使用哪個套件？如何新增並撰寫樣板程式碼？
Dart 與 Flutter MCP 伺服器可透過類似以下的提示來簡化整個流程：

> 尋找適合的套件，以新增一個
> 隨時間顯示按鈕按壓次數的折線圖。

AI 代理程式現在可作為真正的助理：

*  尋找合適工具：使用 `pub_dev_search` 工具
   尋找熱門且評價良好的圖表函式庫。
*  管理相依性：在您確認其選擇（例如 [`package:fl_chart`][]）後，
   使用工具將該套件新增為相依套件。
*  產生程式碼：產生新的元件程式碼，
   並附上折線圖的完整樣板，然後將其置入 UI 中。
   甚至會自動修正過程中引入的語法錯誤，
   您可以從此基礎進一步自訂。

過去需要多個步驟的流程——包括研究、閱讀文件、編輯 `pubspec.yaml`，
以及在應用程式中撰寫適當的程式碼——
現在只需一個請求即可完成。

[`package:fl_chart`]: https://pub.dev/packages/fl_chart

## 提供意見回饋

若您在使用 Dart 與 Flutter MCP 伺服器時遇到任何問題或有意見回饋，
請在 [`dart-lang/ai` 問題追蹤器][ai-issues]上提交問題。

[ai-issues]: https://github.com/dart-lang/ai/issues

