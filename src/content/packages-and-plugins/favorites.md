---
title: Flutter Favorite 計畫
description: 標示某個套件或插件為 Flutter Favorite 的指引。
---

![The Flutter Favorite program logo](/assets/images/docs/development/packages-and-plugins/FlutterFavoriteLogo.png){:width="20%"}

**Flutter Favorite** 計畫的目標，是協助你在開發應用程式時，優先考慮這些經過推薦的套件與插件。
這並不代表對品質或是否適合你專案的保證——你仍然需要自行評估這些套件與插件是否符合你的需求。

你可以在 pub.dev 上查看完整的
[Flutter Favorite 套件清單][Flutter Favorite packages]。

:::note
如果你是為了尋找 Happy Paths 推薦而來，我們已經停止該專案，改以 Flutter Favorite 取而代之。
:::

## 評選指標

Flutter Favorite 套件通過了以下高品質標準的評選指標：

* [整體套件分數][Overall package score]
* **寬鬆授權條款**，
  包含（但不限於）
  Apache、Artistic、BSD、CC BY、MIT、MS-PL 及 W3C
* GitHub 上的 **版本標籤** 與 pub.dev 上的當前版本一致，
  讓你能清楚看到套件的實際原始碼
* 功能**完整**——且未被標示為未完成
  （例如帶有「beta」或「under construction」等標籤）
* [已驗證的發佈者][Verified publisher]
* 在總覽、文件、範例／示例程式碼及 API 質量方面的整體**可用性**
* 執行時的 **CPU 與記憶體使用效能** 表現良好
* 高品質的**相依套件**

## Flutter 生態系委員會

Flutter 生態系委員會（Flutter Ecosystem Committee）由 Flutter 團隊成員及來自生態系各處的社群成員組成。
他們的其中一項職責，就是決定某個套件是否達到成為 Flutter Favorite 的品質門檻。

現任委員會成員
（依姓氏字母順序排列）如下：

* Pooja Bhaumik
* Hillel Coren
* Ander Dobo
* Majid Hajian
* Simon Lightfoot
* John Ryan
* Diego Velasquez

如果你想推薦某個套件或插件成為未來的 Flutter Favorite，或有其他議題想讓委員會注意，
請[寄信給委員會][send the committee]。

## Flutter Favorite 使用指引

Flutter Favorite 套件會在 pub.dev 上由 Flutter 團隊加註標籤。
如果你擁有被指定為 Flutter Favorite 的套件，請遵守以下指引：

* Flutter Favorite 套件作者可以將 Flutter Favorite 標誌放在該套件的 GitHub README、pub.dev 的 **Overview** 分頁，以及與該套件相關的社群媒體貼文上。
* 我們鼓勵你在社群媒體上使用 **#FlutterFavorite** 標籤。
* 當使用 Flutter Favorite 標誌時，作者必須連結回本 Flutter Favorite 首頁，以說明該標示的意義。
* 若某個 Flutter Favorite 套件失去其 Flutter Favorite 身分，作者將會收到通知，屆時必須立即移除該套件中所有「Flutter Favorite」字樣及標誌。
* 請勿以任何方式更改、扭曲或修改 Flutter Favorite 標誌，包括更換顏色或加入未經授權的視覺元素。
* 請勿以誤導、不公平、誹謗、侵權、中傷、貶低、猥褻或 Google 認為不當的方式展示 Flutter Favorite 標誌。

## 後續發展

隨著生態系持續蓬勃發展，你可以預期 Flutter Favorite 套件的清單會不斷成長與變動。
委員會將持續與套件作者合作，提升品質，同時也會考慮將 Flutter Favorite 計畫擴展到生態系中其他受益領域，例如工具、顧問公司，以及活躍的 Flutter 貢獻者。

隨著 Flutter 生態系成長，
我們也會考慮擴充評選指標，可能包括：

* 使用 [pubspec.yaml 格式][pubspec.yaml format]，明確標示插件支援的平台。
* 支援 Flutter 最新穩定版。
* 支援 AndroidX。
* 支援多平台，例如 web、macOS、Windows、Linux 等。
* 整合測試與單元測試覆蓋率。

## Flutter Favorites

你可以在 pub.dev 上查看完整的
[Flutter Favorite 套件清單][Flutter Favorite packages]。


[send the committee]: mailto:flutter-committee@googlegroups.com
[Flutter Favorite packages]: {{site.pub}}/flutter/favorites
[Overall package score]: {{site.pub}}/help
[pubspec.yaml format]: /packages-and-plugins/developing-packages#plugin-platforms
[Verified publisher]: {{site.dart-site}}/tools/pub/verified-publishers
