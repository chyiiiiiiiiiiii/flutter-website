---
title: 使用者體驗
description: >
  使用者在你的應用程式中體驗 AI Toolkit 的方式。
prev:
  title: AI Toolkit 概覽
  path: /ai-toolkit/
next:
  title: 功能整合
  path: /ai-toolkit/feature-integration
---

[`LlmChatView`][`LlmChatView`] 元件（Widget）是 AI Toolkit 提供的互動式聊天體驗的進入點。  
只要在應用中加入 `LlmChatView` 的實例，就能啟用多種使用者體驗功能，這些功能無需額外撰寫程式碼即可使用：

* **多行文字輸入**：允許使用者貼上長文字內容，或在輸入時插入換行。
* **語音輸入**：允許使用者透過語音輸入提示，提升便利性。
* **多媒體輸入**：使用者可以拍照、傳送圖片及其他檔案類型。
* **圖片縮放**：使用者可以放大圖片縮圖檢視細節。
* **複製到剪貼簿**：允許使用者將訊息或大型語言模型 (LLM) 回應的文字複製到剪貼簿。
* **訊息編輯**：使用者可以編輯最近一次訊息並重新提交給 LLM。
* **Material 與 Cupertino**：同時符合 Material 及 Cupertino 設計語言的最佳實踐。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## 多行文字輸入

當使用者完成提示內容編輯後，可以根據不同平台以不同方式提交：

* **行動裝置**：點擊 **提交** 按鈕
* **網頁**：按下 **Enter** 或點擊 **提交** 按鈕
* **桌面**：按下 **Enter** 或點擊 **提交** 按鈕

此外，聊天視圖支援帶有內嵌換行的文字提示。  
如果使用者有包含換行的現有文字，可以直接貼到提示文字欄位中。

若想在輸入時手動插入換行，也可以依照平台進行操作：

* **行動裝置**：在虛擬鍵盤上點擊 Return 鍵
* **網頁**：不支援
* **桌面**：按下 `Ctrl+Enter` 或 `Opt/Alt+Enter`

這些操作方式如下所示：

**桌面**：

![Screenshot of entering text on desktop](/assets/images/docs/ai-toolkit/desktop-enter-text.png)

**行動裝置**：

![Screenshot of entering text on mobile](/assets/images/docs/ai-toolkit/mobile-enter-text.png)

## 語音輸入

除了文字輸入外，聊天視圖也支援點擊麥克風按鈕進行語音錄製（當尚未輸入文字時會顯示該按鈕）。

點擊 **Mic** 按鈕即可開始錄音：

![Screenshot of entering text](/assets/images/docs/ai-toolkit/enter-textfield.png)

按下 **Stop** 按鈕會將使用者的語音輸入轉換為文字：

這段文字可以像一般文字一樣編輯、補充並提交。

![Screenshot of entered voice](/assets/images/docs/ai-toolkit/enter-voice-into-textfield.png)

## 多媒體輸入

![Textfield containing "Testing, testing, one, two, three"](/assets/images/docs/ai-toolkit/multi-media-testing-testing.png)

聊天視圖也支援將圖片與檔案作為輸入，傳遞給底層的 LLM。  
使用者可以點擊文字輸入欄左側的 **加號** 按鈕，從 **拍照**、**圖片庫**、**附加檔案**三個圖示中選擇：

![Screenshot of the 4 icons](/assets/images/docs/ai-toolkit/multi-media-icons.png)

**拍照**按鈕允許使用者使用裝置相機拍攝照片：

![Selfie image](/assets/images/docs/ai-toolkit/selfie.png)

點擊 **圖片庫** 按鈕可讓使用者從裝置的圖片庫上傳圖片：

![Download image from gallery](/assets/images/docs/ai-toolkit/download-from-gallery.png)

點擊 **附加檔案** 按鈕可讓使用者選擇裝置上任何類型的檔案，例如 PDF 或 TXT 檔。

選取照片、圖片或檔案後，該檔案會作為附件顯示於目前提示的縮圖區：

![Thumbnails of images](/assets/images/docs/ai-toolkit/image-thumbnails.png)

使用者可點擊縮圖上的 **X** 按鈕移除附件。

## 圖片縮放

使用者可以點擊圖片縮圖來放大檢視：

![Zoomed image](/assets/images/docs/ai-toolkit/image-zoom.png)

按下 **ESC** 鍵或點擊圖片外任一區域即可關閉放大圖。

## 複製到剪貼簿

使用者可以透過多種方式，將目前聊天中的任何文字提示或 LLM 回應複製。  
在桌面或網頁上，使用者可以用滑鼠選取螢幕上的文字，並像平常一樣複製到剪貼簿：

![Copy to clipboard](/assets/images/docs/ai-toolkit/copy-to-clipboard.png)

此外，在每個提示或回應的下方，當滑鼠游標移過時會出現 **複製** 按鈕，點擊即可複製：

![Press the copy button](/assets/images/docs/ai-toolkit/chatbot-prompt.png)

在行動平台上，使用者可以長按提示或回應，並選擇複製選項：

![Long tap to see the copy button](/assets/images/docs/ai-toolkit/long-tap-choose-copy.png)

## 訊息編輯

如果使用者想要編輯上一則提示，並讓 LLM 重新生成回應，可以這麼做。在桌面上，使用者可以在最近一則提示旁點擊 **編輯** 按鈕（與 **複製** 按鈕並列）：

![How to edit prompt](/assets/images/docs/ai-toolkit/how-to-edit-prompt.png)

在行動裝置上，使用者可長按最近一則提示，取得 **編輯** 選項：

![How to access edit menu](/assets/images/docs/ai-toolkit/accessing-edit-menu.png)

點擊 **編輯** 按鈕後，會進入編輯模式，這時會將使用者最後一則提示與 LLM 的最後一則回應從聊天紀錄中移除，並將提示文字放入文字欄位，同時顯示編輯中指示：

![How to exit editing mode](/assets/images/docs/ai-toolkit/how-to-exit-editing-mode.png)

在編輯模式下，使用者可自由修改提示內容並提交，讓 LLM 正常產生新回應。  
若改變主意，也可點擊編輯指示旁的 **X** 取消編輯，恢復先前的 LLM 回應。

## Material 與 Cupertino

當 `LlmChatView` 元件（Widget）被放在 [Material app][Material app] 中時，會使用 Material 設計語言所提供的功能，例如 Material 的 [`TextField`][`TextField`]。  
同樣地，當放在 [Cupertino app][Cupertino app] 中時，則會使用 Cupertino 設計語言的相關功能，例如 [`CupertinoTextField`][`CupertinoTextField`]。

![Cupertino example app](/assets/images/docs/ai-toolkit/cupertino-chat-app.png)

然而，雖然聊天視圖同時支援 Material 與 Cupertino 應用類型，但不會自動採用相關主題。  
主題設定需透過 `LlmChatView` 的 `style` 屬性來指定，詳見 [自訂樣式][Custom styling] 文件說明。

[Cupertino app]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoTextField`]: {{site.api}}/flutter/cupertino/CupertinoTextField-class.html
[Custom styling]: /ai-toolkit/feature-integration#custom-styling
[Material app]: {{site.api}}/flutter/material/MaterialApp-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
