---
title: 聊天客戶端範例
description: >
  了解 AI Toolkit 所附的聊天客戶端範例。
prev:
  title: 自訂大型語言模型 (LLM) 供應商
  path: /ai-toolkit/custom-llm-providers
---

AI Chat 範例是一個完整的聊天應用程式，
使用 Flutter AI Toolkit 與 Vertex AI for Firebase 建構而成。
除了繼承自 AI Toolkit 的多輪對話、多媒體、
串流等功能外，
AI Chat 範例還展示了如何在自己的應用程式中
同時儲存並管理多個聊天紀錄。
在桌面裝置上，AI Chat 範例的介面如下所示：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


在行動裝置上，則呈現如下：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

所有聊天紀錄都儲存在已驗證的
Cloud Firestore 資料庫中；任何已驗證的
使用者都可以擁有任意數量的聊天紀錄。

此外，每建立一個新聊天時，雖然使用者可以
手動命名標題，
但系統會根據最初的提示與回應，
請大型語言模型 (LLM) 建議合適的標題。
事實上，本頁截圖中的聊天標題皆為自動產生。

如需建構與執行此範例，
請依照 [AI Chat README][AI Chat README] 中的說明操作。

{% comment %}
TODO: 若 Mit 同意，將此內容移至官方 Flutter repo
  Chris 不希望在發佈前太接近時進行
{% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat

