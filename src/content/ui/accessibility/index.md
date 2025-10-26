---
title: 無障礙支援
description: 關於 Flutter 無障礙支援的資訊。
---

## 背景

確保應用程式對各種使用者都具備無障礙性，是打造高品質應用程式的重要一環。設計不良的應用程式會對所有年齡層的人造成障礙。[聯合國身心障礙者權利公約 (UN Convention on the Rights of Persons with Disabilities)][CRPD] 說明了確保資訊系統普及可及的道德與法律責任；全球各國也將無障礙納入強制規範；各大企業則認知到最大化服務可及性的商業優勢。

我們強烈建議您在應用程式發佈前，將無障礙檢查表納入關鍵審查項目。Flutter 致力於協助開發者提升應用程式的無障礙性，除了底層作業系統的支援外，還提供一流的框架級無障礙功能，包括：

[UI 設計與樣式][UI Design and styling]

[輔助技術（螢幕閱讀器）支援][Assistive Technologies (Screen Reader) supports]

[UI Design and styling]: /ui/accessibility/ui-design-and-styling
[Assistive Technologies (Screen Reader) supports]:/ui/accessibility/assistive-technologies

## 無障礙法規

無障礙標準與法規有助於確保產品對身心障礙者也能使用。許多標準已被制定為法律與政策，成為產品與服務的必要條件。

*   **WCAG 2**：[Web Content Accessibility Guidelines (WCAG) 2][Web Content Accessibility Guidelines (WCAG) 2] 是一項國際公認的網頁內容無障礙標準，旨在讓身心障礙者能更容易存取網頁內容。此標準由萬維網聯盟（W3C）制定，具備穩定且技術性的規範。

*   **EN 301 549**：[EN 301 549][EN 301 549] 是歐洲針對資訊與通訊科技（ICT）產品與服務無障礙需求的統一標準。

*   **VPAT**：[Voluntary Product Accessibility Template (VPAT)][Voluntary Product Accessibility Template (VPAT)] 是一份免費模板，將無障礙需求與標準轉化為可執行的產品與服務測試準則。

全球各地的法律都要求數位內容與服務對身心障礙者具備無障礙性。
在美國，[Americans with Disabilities Act (ADA)][Americans with Disabilities Act (ADA)] 禁止公共場所的歧視行為。
[復健法第 508 條 (Section 508 of the Rehabilitation Act)][Section 508 of the Rehabilitation Act ] 則要求聯邦機構及其承包商，所有 ICT 必須符合 WCAG 標準。

在歐盟，[European Accessibility Act (EAA)][European Accessibility Act (EAA)] 要求多種公私部門服務必須具備無障礙性，主要以 [EN 301 549][EN 301 549] 作為技術依據。



[Web Content Accessibility Guidelines (WCAG) 2]: https://www.w3.org/WAI/standards-guidelines/wcag/
[EN 301 549]: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf
[Voluntary Product Accessibility Template (VPAT)]: https://www.itic.org/policy/accessibility/vpat

[Americans with Disabilities Act (ADA)]: https://www.ada.gov/
[Section 508 of the Rehabilitation Act]: https://www.section508.gov/
[European Accessibility Act (EAA)]: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en 

## 以無障礙為核心進行開發

確保您的應用程式能讓所有人使用，意味著從一開始就將無障礙納入設計。對某些應用程式來說，這並不容易。下方影片中，我們的兩位工程師將一個無障礙狀態極差的行動應用程式，透過 Flutter 內建元件 (Widgets) 的協助，轉變為極具無障礙性的體驗。

{% ytEmbed 'bWbBgbmAdQs', 'Building Flutter apps with accessibility in mind' %}

## 無障礙發佈檢查清單

以下是您準備應用程式發佈時，應考慮的無障礙項目（非完整清單）：

* **主動互動**。請確保所有主動互動都有實際作用。任何可點擊的按鈕都應在點擊時執行某些操作。例如，若您對 `onPressed` 事件設置了一個 no-op callback，請改為在螢幕上顯示 `SnackBar`，說明剛剛按下的是哪個控制項。
* **螢幕閱讀器測試**。螢幕閱讀器應能在您點擊時描述頁面上的所有控制項，且描述內容應易於理解。請使用 [TalkBack][TalkBack] (Android) 和 [VoiceOver][VoiceOver] (iOS) 測試您的應用程式。
* **對比度比率**。我們建議控制項或文字與背景之間的對比度比率至少為 4.5:1，禁用元件除外。圖片也應檢查是否有足夠的對比度。
* **情境切換**。在輸入資訊時，不應自動改變使用者的情境。一般來說，元件應避免在未經確認的情況下自動改變使用者的情境。
* **可點擊目標區域**。所有可點擊目標區域應至少為 48x48 像素。
* **錯誤處理**。重要操作應可還原。在顯示錯誤的欄位中，若可能請提供修正建議。
* **色盲測試**。控制項在色盲與灰階模式下也應可用且易讀。
* **縮放因子**。UI 在文字大小與顯示縮放比例極大時，仍應保持可讀性與可用性。

[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/

## 進一步了解

若想進一步了解 Flutter 與無障礙相關資訊，歡迎參考以下社群成員撰寫的文章：

* [深入探討 Flutter 的無障礙元件 (Accessibility Widgets)][A deep dive into Flutter's accessibility widgets]
* [Flutter 的語意 (Semantics)][Semantics in Flutter]
* [Flutter：打造優質螢幕閱讀器體驗][Flutter: Crafting a great experience for screen readers]

[CRPD]: https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities/article-9-accessibility.html
[A deep dive into Flutter's accessibility widgets]: {{site.medium}}/flutter-community/a-deep-dive-into-flutters-accessibility-widgets-eb0ef9455bc
[Flutter: Crafting a great experience for screen readers]: https://blog.gskinner.com/archives/2022/09/flutter-crafting-a-great-experience-for-screen-readers.html
[Semantics in Flutter]: https://www.didierboelens.com/2018/07/semantics/
