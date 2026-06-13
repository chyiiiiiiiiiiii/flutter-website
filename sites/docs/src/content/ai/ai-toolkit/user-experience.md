---
title: 使用者體驗
sidenav: ai
description: >
  使用者在你的應用程式中使用 AI Toolkit 的體驗。
prev:
  title: AI Toolkit overview
  path: /ai/ai-toolkit/
next:
  title: Feature integration
  path: /ai/ai-toolkit/feature-integration
---

[`LlmChatView`][] 元件 (Widget) 是 AI Toolkit 提供的互動式聊天體驗的進入點。在應用程式中加入一個 `LlmChatView` 實例，即可啟用多項使用者體驗功能，且無需額外撰寫任何程式碼：

* **多行文字輸入**：允許使用者貼上長篇文字，或在輸入時插入新行。
* **語音輸入**：允許使用者透過語音輸入提示詞，提升使用便利性。
* **多媒體輸入**：使使用者能夠拍照、傳送圖片及其他類型的檔案，並附加 URL 連結至線上資源。
* **圖片縮放**：使使用者能夠放大圖片縮圖。
* **複製至剪貼簿**：允許使用者將訊息文字或 LLM 回應複製至剪貼簿。
* **訊息編輯**：允許使用者編輯最近的訊息，以便重新提交給 LLM。
* **Material 與 Cupertino**：自動適配兩種設計語言的最佳實踐。

[`LlmChatView`]:
    {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## 多行文字輸入

使用者在完成提示詞的編寫後，可依照所在平台選擇以下方式提交：

* **行動裝置**：點選 **Submit** 按鈕
* **Web**：按下 **Enter** 或點選 **Submit** 按鈕
* **桌面**：按下 **Enter** 或點選 **Submit** 按鈕

此外，聊天檢視支援含有嵌入換行符的文字提示詞。若使用者已有包含換行的現有文字，可如常貼入提示詞文字欄位。

若使用者希望在輸入時手動插入換行，也可以這樣做。對應的操作手勢依所在平台而異：

* **行動裝置**：點選虛擬鍵盤上的 Return 鍵
* **Web**：按下 `Shift+Enter`
* **桌面**：按下 `Shift+Enter`

以下為各平台的操作示意：

**Web 與桌面**：

![在桌面輸入文字的截圖](/assets/images/docs/ai-toolkit/desktop-enter-text.png)

**行動裝置**：

![在行動裝置輸入文字的截圖](/assets/images/docs/ai-toolkit/mobile-enter-text.png)

## 語音輸入

除了文字輸入之外，聊天檢視還可透過點選麥克風按鈕以錄音作為輸入，該按鈕會在尚未輸入任何文字時顯示。

點選 **Mic** 按鈕開始錄音：

![輸入文字的截圖](/assets/images/docs/ai-toolkit/enter-textfield.png)

選擇 **Stop** 按鈕，將使用者的語音輸入轉換為文字：

此文字之後可如常進行編輯、補充並提交。

![輸入語音後的截圖](/assets/images/docs/ai-toolkit/enter-voice-into-textfield.png)

## 多媒體輸入

![文字欄包含「Testing, testing, one, two, three」的截圖](/assets/images/docs/ai-toolkit/multi-media-testing-testing.png)

聊天檢視也可接受圖片和檔案作為輸入，並傳遞給底層的 LLM。使用者可點選文字輸入框左側的 **Plus** 按鈕，從 **Take Photo**、**Image Gallery**、**Attach File** 與 **Attach Link** 四個圖示中選擇：

![四個圖示的截圖](/assets/images/docs/ai-toolkit/multi-media-icons.png)

**Take Photo** 按鈕允許使用者使用裝置的相機拍攝照片：

![自拍圖片](/assets/images/docs/ai-toolkit/selfie.png)

選擇 **Image Gallery** 按鈕，讓使用者從裝置的圖片相簿上傳：

![從相簿下載圖片](/assets/images/docs/ai-toolkit/download-from-gallery.png)

選擇 **Attach File** 按鈕，讓使用者選擇裝置上任何類型的檔案，例如 PDF 或 TXT 檔案。

選擇 **Attach Link** 按鈕，讓使用者輸入網頁或線上檔案的連結。

一旦選擇了照片、圖片、檔案或連結，它就會成為附件，並以縮圖的形式顯示在目前有效的提示詞旁：

![圖片縮圖](/assets/images/docs/ai-toolkit/image-thumbnails.png)

使用者可點選縮圖上的 **X** 按鈕來移除附件。

## 圖片縮放

使用者可點選圖片縮圖來放大檢視：

![放大的圖片](/assets/images/docs/ai-toolkit/image-zoom.png)

按下 **Esc** 鍵或點選圖片外的任何位置，即可關閉放大圖片。

## 複製至剪貼簿

使用者可以多種方式複製目前聊天中的任何文字提示詞或 LLM 回應。在桌面或 Web 上，使用者可用滑鼠選取畫面上的文字，並如常複製至剪貼簿：

![複製至剪貼簿](/assets/images/docs/ai-toolkit/copy-to-clipboard.png)

此外，在每個提示詞或回應的底部，使用者可選擇滑鼠停留時出現的 **Copy** 按鈕：

![選擇複製按鈕](/assets/images/docs/ai-toolkit/chatbot-prompt.png)

在行動裝置平台上，使用者可長按提示詞或回應，並選擇 Copy 選項：

![長按以看到複製按鈕](/assets/images/docs/ai-toolkit/long-tap-choose-copy.png)

## 訊息編輯

若使用者希望編輯最後一則提示詞，並讓 LLM 重新回應，可以這樣做。在桌面上，使用者可點選最近的提示詞旁的 **Edit** 按鈕（位於 **Copy** 按鈕旁）：

![如何編輯提示詞](/assets/images/docs/ai-toolkit/how-to-edit-prompt.png)

在行動裝置上，使用者可長按最近的提示詞，即可存取 **Edit** 選項：

![如何存取編輯選單](/assets/images/docs/ai-toolkit/accessing-edit-menu.png)

一旦使用者點選 **Edit** 按鈕，就會進入編輯模式，此模式會從聊天歷史記錄中移除使用者最後的提示詞與 LLM 最後的回應，將提示詞文字放入文字欄位，並顯示編輯中的指示器：

![如何退出編輯模式](/assets/images/docs/ai-toolkit/how-to-exit-editing-mode.png)

在編輯模式中，使用者可自行修改提示詞並提交，讓 LLM 如常產生回應。若使用者改變主意，也可點選編輯中指示器旁的 **X** 取消編輯，並還原先前的 LLM 回應。

## Material 與 Cupertino

當 `LlmChatView` 元件被置於 [Material app][] 中時，它會使用 Material 設計語言所提供的功能，例如 Material 的 [`TextField`][]。同樣地，當置於 [Cupertino app][] 中時，它會使用對應的功能，例如 [`CupertinoTextField`][]。

![Cupertino 範例應用程式](/assets/images/docs/ai-toolkit/cupertino-chat-app.png)

然而，雖然聊天檢視同時支援 Material 與 Cupertino 兩種應用程式類型，但它不會自動套用對應的主題。這部分是透過 `LlmChatView` 的 `style` 屬性來設定，詳情請參閱[自訂樣式][Custom styling]文件。

[Cupertino app]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoTextField`]:
    {{site.api}}/flutter/cupertino/CupertinoTextField-class.html
[Custom styling]: /ai/ai-toolkit/feature-integration#custom-styling
[Material app]: {{site.api}}/flutter/material/MaterialApp-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
