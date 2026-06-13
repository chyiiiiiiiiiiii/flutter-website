---
title: 聊天用戶端範例
sidenav: ai
description: >
  了解 AI Toolkit 中所包含的聊天用戶端範例。
prev:
  title: Custom LLM providers
  path: /ai/ai-toolkit/custom-llm-providers
---

AI Chat 範例旨在提供一個完整的聊天應用程式，使用 Flutter AI Toolkit 與 Firebase AI Logic SDK 建置而成。除了從 AI Toolkit 獲得的多輪對話、多媒體、串流等功能之外，AI Chat 範例還展示了如何在自己的應用程式中同時儲存及管理多個聊天記錄。在桌面裝置上，AI Chat 範例的外觀如下所示：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


在行動裝置上，外觀如下所示：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

聊天記錄儲存於已驗證身分的 Cloud Firestore 資料庫中；任何已驗證的使用者都可以擁有任意數量的聊天記錄。

此外，對於每個新建的聊天，使用者雖然可以手動設定任意標題，但系統會將初始提示與回應傳送給 LLM，由其建議適當的標題。事實上，本頁截圖中的聊天標題均是自動設定的。

若要建置並執行此範例，請依照 [AI Chat README][] 中的說明進行操作。

{% comment %} TODO: If Mit agrees, move this to an official Flutter repo Chris
didn't want to do it so close to release {% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat
