---
title: 無障礙支援
description: Flutter 無障礙支援相關資訊。
---

## 背景說明

確保應用程式對廣泛使用者都具備無障礙性，是打造高品質應用程式的重要一環。設計不良的應用程式會對各年齡層的人造成障礙。[聯合國《身心障礙者權利公約》][CRPD] 明確指出，確保資訊系統普及可及是道德與法律上的責任；全球各國也將無障礙納入法規要求；企業則認知到讓更多人可存取其服務所帶來的商業優勢。

我們強烈建議您在應用程式上線前，將無障礙檢查清單納入關鍵標準之一。Flutter 致力於協助開發者提升應用程式的無障礙性，除了底層作業系統的支援外，框架本身也提供一流的無障礙支援功能，包括：

[UI 設計與樣式][UI Design and styling]

[輔助技術（螢幕閱讀器）支援][Assistive Technologies (Screen Reader) supports]

[UI Design and styling]: /ui/accessibility/ui-design-and-styling
[Assistive Technologies (Screen Reader) supports]:/ui/accessibility/assistive-technologies

## 無障礙法規

無障礙標準與法規可確保產品對身心障礙者友善。許多標準已被制定為法律與政策，成為產品與服務的強制要求。

*   **WCAG 2**： [Web Content Accessibility Guidelines (WCAG) 2][Web Content Accessibility Guidelines (WCAG) 2]（網頁內容無障礙指引）是國際公認的標準，旨在讓身心障礙者更容易存取網頁內容。此標準由萬維網聯盟（W3C）制定，技術穩定且具權威性。

*   **EN 301 549**： [EN 301 549][EN 301 549] 是歐洲針對資訊與通訊科技（ICT）產品與服務無障礙需求的統一標準。

*   **VPAT**： [Voluntary Product Accessibility Template (VPAT)][Voluntary Product Accessibility Template (VPAT)]（自願性產品無障礙模板）是一份免費範本，將無障礙需求與標準轉化為可執行的產品與服務測試準則。

全球各地的法律都要求數位內容與服務必須對身心障礙者友善。
在美國，[美國身心障礙者法案（ADA）][Americans with Disabilities Act (ADA)] 禁止在公共場所進行歧視。
[復健法案第 508 條][Section 508 of the Rehabilitation Act ] 則要求聯邦機構及其承包商，所有 ICT 產品必須符合 WCAG 標準。

在歐盟，[歐洲無障礙法案（EAA）][European Accessibility Act (EAA)] 要求公私部門多項服務須具備無障礙性，主要以 [EN 301 549][EN 301 549] 作為技術依據。



[Web Content Accessibility Guidelines (WCAG) 2]: https://www.w3.org/WAI/standards-guidelines/wcag/
[EN 301 549]: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf
[Voluntary Product Accessibility Template (VPAT)]: https://www.itic.org/policy/accessibility/vpat

[Americans with Disabilities Act (ADA)]: https://www.ada.gov/
[Section 508 of the Rehabilitation Act]: https://www.section508.gov/
[European Accessibility Act (EAA)]: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en


## 以無障礙為核心進行開發

確保您的應用程式人人皆可使用，意味著從一開始就將無障礙納入設計。對某些應用程式來說，這說來容易做來難。下方影片中，兩位工程師將一個無障礙性極差的行動應用程式，利用 Flutter 內建元件 (Widget) 大幅提升其無障礙體驗。

<YouTubeEmbed id="bWbBgbmAdQs" title="Building Flutter apps with accessibility in mind" />


## 無障礙上線檢查清單

以下是協助您準備應用程式上線時，應考慮的無障礙檢查項目（非完整清單）：

* **互動操作**：確保所有可互動的操作都有實際功能。任何可按下的按鈕，都應在按下時執行某項動作。例如，若您對 `onPressed` 事件設置了一個無操作（no-op）回呼，請改為在螢幕上顯示 `SnackBar`，說明剛才觸發了哪個控制項。
* **螢幕閱讀器測試**：螢幕閱讀器應能在您點擊時，描述頁面上所有控制項，且描述內容應清楚易懂。請使用 [TalkBack][TalkBack] (Android) 和 [VoiceOver][VoiceOver] (iOS) 測試您的應用程式。
* **對比度**：建議控制項或文字與背景的對比度至少達 4.5:1（停用元件除外）。圖片也應檢查是否有足夠的對比度。
* **情境切換**：在輸入資訊時，任何操作都不應自動改變使用者的情境。一般來說，元件應避免在未經確認的情況下自動切換使用者情境。
* **可點擊目標區域**：所有可點擊的目標區域應至少為 48x48 像素。
* **錯誤處理**：重要操作應可還原。在顯示錯誤的欄位中，若可能請提供修正建議。
* **色覺缺陷測試**：控制項在色盲或灰階模式下也應可用且易讀。
* **縮放因子**：在文字或顯示縮放比例很大時，UI 仍應保持可讀性與可用性。

[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/

## 深入了解

想進一步瞭解 Flutter 與無障礙相關內容，歡迎參考以下社群成員撰寫的文章：

* [深入探討 Flutter 的無障礙元件 (Accessibility Widgets)][A deep dive into Flutter's accessibility widgets]
* [Flutter：打造優質螢幕閱讀器體驗][Flutter: Crafting a great experience for screen readers]

[A deep dive into Flutter's accessibility widgets]: {{site.medium}}/flutter-community/a-deep-dive-into-flutters-accessibility-widgets-eb0ef9455bc
[CRPD]: https://social.desa.un.org/issues/disability/crpd/article-9-accessibility
[Flutter: Crafting a great experience for screen readers]: https://blog.gskinner.com/archives/2022/09/flutter-crafting-a-great-experience-for-screen-readers.html
