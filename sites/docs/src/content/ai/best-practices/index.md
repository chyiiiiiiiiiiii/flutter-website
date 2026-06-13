---
title: Flutter AI 最佳實務
sidenav: ai
shortTitle: AI 最佳實務
breadcrumb: Best practices
description: >
  學習使用防護機制來驗證並修正 AI 生成資料，以建置 AI 驅動的 Flutter 應用程式的最佳實務。
next:
  title: Prompting
  path: /ai/best-practices/prompting
---


Flutter 與 AI 在多個層面上相輔相成。如果你使用 AI 來生成 Flutter 程式碼，只需為單一應用程式生成程式碼，即可以目標定為多個平台。而如果你運用 Gemini 在應用程式中實作功能，Firebase AI Logic SDK 讓這一切變得簡單，提供易於使用的 API，並透過將 API 金鑰隔離於程式碼之外來確保安全性。

如果你對這兩種使用情境都是 AI 新手，應該了解：無論 AI 有多好（Gemini 3 Pro Preview 確實*非常*出色），AI 仍會犯錯。如果你使用 AI 來編寫程式碼，則可以使用 Flutter 分析器和單元測試等工具來建立防護機制，讓 AI 保持在正軌上。

但是，當你使用 AI 來實作應用程式中的功能，且明知它有時會出錯，你該怎麼辦？或者，引用一位朋友的話：

***Morgan 定律***  
*「最終，由於從機率分佈中取樣的本質，[AI] 將無法完成必須完成的事情。」*  
*–Brett Morgan，Flutter 開發人員關係工程師，2025 年 7 月。*

好消息是，正如你可以使用開發者工具來為撰寫程式碼的 AI 建立防護機制，你也可以使用 Flutter 來為實作功能的 AI 建立防護機制。[Crossword Companion 應用程式][crossword-app]正是為了展示這些技術而建置的。  
<img
src="/assets/images/docs/ai-best-practices/crossword-companion-app-interface-showin.png"
alt="Crossword Companion app interface showing a 5-step setup process starting
with selecting a crossword image.">  
Crossword Companion 應用程式的目標並非幫助你在迷你填字遊戲中作弊——儘管它在這方面確實相當厲害——而是說明如何使用 Flutter 來引導 AI 的力量。舉例來說，執行應用程式時，你首先要做的是上傳迷你填字謎題的截圖。當你按下 **Next** 按鈕後，AI 會利用該圖片推斷謎題的大小、內容和提示：  
<img
src="/assets/images/docs/ai-best-practices/crossword-companion-app-showing-a-5x5-gr.png"
alt="Crossword Companion app showing a 5x5 grid with settings incorrectly
displaying 4 rows and 5 columns.">  
請注意，雖然填字謎題是 5x5 的格子，但 AI 卻說它是 4x5。因為我們知道錯誤難以避免（顯然 AI 也只是「人」），所以我們將應用程式設計為允許使用者驗證並修正 AI 生成的資料。這一點非常重要；錯誤的資料會導致錯誤的結果。

因此，本文並非詳述這個應用程式，而是介紹使用 Flutter 建置你自己的 AI 應用程式時應採用的最佳實務。那麼，讓我們開始吧！


[crossword-app]: {{site.github}}/flutter/demos/tree/main/crossword_companion
