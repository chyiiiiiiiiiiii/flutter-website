---
title: Flutter 中的自適應與響應式設計
description: >-
  無論是行動裝置還是網頁，建立能夠因應尺寸與方向變化，
  並充分發揮各平台特性的應用程式是很重要的。
shortTitle: 自適應設計
---

![List of supported platforms](/assets/images/docs/ui/adaptive-responsive/platforms.png)

Flutter 的主要目標之一，是打造一個能讓你以單一程式碼庫
開發出在任何平台上都擁有絕佳外觀與體驗的應用程式的框架。

這代表你的應用程式可能會出現在各種不同尺寸的螢幕上，
從智慧手錶、到擁有雙螢幕的可摺疊手機、再到高解析度顯示器。
而你的輸入裝置可能是實體或虛擬鍵盤、滑鼠、觸控螢幕，
或是其他各式各樣的裝置。

描述這些設計理念的兩個術語分別是 _自適應_（adaptive）與 _響應式_（responsive）。
理想情況下，你會希望你的應用程式同時具備這兩種特性，
但這究竟代表什麼意思呢？

## 什麼是響應式（responsive）與自適應（adaptive）？

一個簡單的理解方式是：響應式設計（responsive design）關注於將 UI _適應_ 可用空間，
而自適應設計（adaptive design）則關注於讓 UI 在該空間內 _可用_。

因此，響應式應用程式會調整設計元素的位置，以 _適合_ 當前可用空間；
而自適應應用程式則會選擇適當的版面配置與輸入裝置，使其在可用空間內 _可用_。
舉例來說，平板裝置的 UI 應該使用底部導覽列還是側邊面板導覽？

:::note
自適應與響應式這兩個概念經常被合併為單一術語。
大多數情況下，「自適應設計」（adaptive design）同時指涉自適應與響應式設計。
:::

本節將涵蓋自適應與響應式設計的多個面向：

* [一般設計方法][General approach]
* [SafeArea 與 MediaQuery][SafeArea & MediaQuery]
* [大螢幕與可摺疊裝置][Large screens & foldables]
* [使用者輸入與無障礙][User input & accessibility]
* [裝置能力與政策][Capabilities & policies]
* [自適應應用程式最佳實踐][Best practices for adaptive apps]
* [延伸資源][Additional resources]

[Additional resources]: /ui/adaptive-responsive/more-info
[Best practices for adaptive apps]: /ui/adaptive-responsive/best-practices
[Capabilities & policies]: /ui/adaptive-responsive/capabilities
[General approach]: /ui/adaptive-responsive/general
[Large screens & foldables]: /ui/adaptive-responsive/large-screens
[SafeArea & MediaQuery]: /ui/adaptive-responsive/safearea-mediaquery
[User input & accessibility]: /ui/adaptive-responsive/input

:::note
你也可以參考 Google I/O 2024 關於此主題的演講。

{% ytEmbed 'LeKLGzpsz9I', 'How to build adaptive UI with Flutter' %}
:::
