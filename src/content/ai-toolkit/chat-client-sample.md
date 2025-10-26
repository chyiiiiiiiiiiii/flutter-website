---
title: 聊天用戶端範例
description: >
  了解 AI Toolkit 所附的聊天用戶端範例。
prev:
  title: 自訂大型語言模型 (LLM) 供應商
  path: /ai-toolkit/custom-llm-providers
---

AI Chat 範例是一個完整的聊天應用程式，
使用 Flutter AI Toolkit 與 Vertex AI for Firebase 所建構。
除了從 AI Toolkit 繼承的多輪對話、多媒體、
串流等功能外，
AI Chat 範例還展示了如何在您的應用程式中
同時儲存與管理多個聊天紀錄。
在桌面裝置上，AI Chat 範例的介面如下所示：

![Desktop app UI](/assets/images/docs/ai-toolkit/desktop-pluto-convo.png)


在行動裝置上，介面如下：

![Mobile app UI](/assets/images/docs/ai-toolkit/mobile-pluto-convo.png)

所有聊天紀錄都會儲存在經過驗證的
Cloud Firestore 資料庫中；任何經過驗證的
使用者都可以擁有任意數量的聊天紀錄。

此外，每當建立新聊天時，雖然使用者可以
手動為其命名，但系統也會根據
初始提示與回應，請大型語言模型 (LLM)
建議一個合適的標題。
事實上，本頁螢幕截圖中的聊天標題
皆為系統自動設定。

如需建構並執行此範例，
請依照 [AI Chat README][AI Chat README] 中的說明操作。

{% comment %}
TODO: 若 Mit 同意，將此內容移至官方 Flutter repo
  Chris 不希望在發佈前太接近時進行
{% endcomment %}

[AI Chat README]: {{site.github}}/csells/flutter_ai_chat

