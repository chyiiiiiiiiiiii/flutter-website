---
title: Flutter 中的自適應（Adaptive）與響應式（Responsive）設計
description: >-
  無論是行動裝置還是網頁，打造能夠因應尺寸與方向變化，
  並充分發揮各平台優勢的應用程式至關重要。
shortTitle: 自適應設計
---

![List of supported platforms](/assets/images/docs/ui/adaptive-responsive/platforms.png)

Flutter 的主要目標之一，就是建立一個框架，
讓你能夠以單一程式碼庫開發應用程式，
並在任何平台上都能擁有絕佳的外觀與體驗。

這代表你的應用程式可能會出現在各種不同尺寸的螢幕上，
從智慧手錶、雙螢幕可摺疊手機，到高解析度顯示器。
你的輸入裝置也可能是實體或虛擬鍵盤、滑鼠、觸控螢幕，
或其他各式各樣的裝置。

這些設計概念有兩個常用術語：_自適應（Adaptive）_ 與 _響應式（Responsive）_。
理想狀態下，你會希望你的應用程式同時具備這兩種特性，
但這究竟代表什麼意思呢？

## 什麼是響應式（Responsive）與自適應（Adaptive）？

一個簡單的理解方式是：響應式設計（Responsive design）著重於讓 UI _適應_ 可用空間，
而自適應設計（Adaptive design）則強調 UI 在該空間內_可用_。

因此，響應式應用程式會調整設計元素的位置，以_適應_現有空間；
而自適應應用程式則會選擇合適的版面配置與輸入裝置，
確保在現有空間內_可用_。
舉例來說，平板裝置的 UI 應該使用底部導覽列還是側邊面板導覽？

:::note
自適應與響應式這兩個概念經常被合併為單一術語。
大多數情況下，「自適應設計（Adaptive design）」這個詞會同時指涉自適應與響應式設計。
:::

本章節涵蓋自適應與響應式設計的各個面向：

* [一般設計方法][General approach]
* [SafeArea 與 MediaQuery][SafeArea & MediaQuery]
* [大螢幕與可摺疊裝置][Large screens & foldables]
* [使用者輸入與無障礙][User input & accessibility]
* [裝置能力與政策][Capabilities & policies]
* [自適應應用程式最佳實踐][Best practices for adaptive apps]
* [其他資源][Additional resources]

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
