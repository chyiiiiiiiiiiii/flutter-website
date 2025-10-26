---
title: Flutter Favorite 計畫
description: 標示某個套件或插件為 Flutter Favorite 的指引。
---

![The Flutter Favorite program logo](/assets/images/docs/development/packages-and-plugins/FlutterFavoriteLogo.png){:width="20%"}

**Flutter Favorite** 計畫的目標，是協助你在開發應用程式時，優先考慮這些經過推薦的套件與插件。
這並不代表對品質或是否適合你特定情境的保證——你仍然應該根據自己的專案需求，對這些套件與插件進行評估。

你可以在 pub.dev 上查看完整的
[Flutter Favorite 套件清單][Flutter Favorite packages]。

:::note
如果你是為了尋找 Happy Paths 推薦而來，該專案已經停止，改由 Flutter Favorite 取而代之。
:::

## 指標

Flutter Favorite 套件通過了以下高品質標準的指標：

* [整體套件分數][Overall package score]
* **寬鬆授權條款**，
  包含（但不限於）
  Apache、Artistic、BSD、CC BY、MIT、MS-PL 及 W3C
* GitHub 上的 **版本標籤** 與 pub.dev 上的當前版本一致，因此你可以清楚知道套件的原始碼內容
* 功能**完整性**——且未被標示為不完整
  （例如，未標註為「beta」或「施工中」等標籤）
* [已驗證的發佈者][Verified publisher]
* 在總覽、文件、範例／示例程式碼，以及 API 質量方面的整體**可用性**
* 在 CPU 與記憶體使用上的良好**執行時行為**
* 高品質的**相依套件**

## Flutter 生態系統委員會

Flutter 生態系統委員會（Flutter Ecosystem Committee）由 Flutter 團隊成員與來自社群的成員共同組成，分布於整個生態系統。
他們的其中一項工作，就是判斷某個套件是否達到 Flutter Favorite 的品質標準。

目前的委員會成員
（依姓氏字母順序排列）如下：

* Pooja Bhaumik
* Hillel Coren
* Ander Dobo
* Majid Hajian
* Simon Lightfoot
* John Ryan
* Diego Velasquez

如果你想要提名某個套件或插件成為未來的 Flutter Favorite，或是有其他議題希望委員會關注，請[寄信給委員會][send the committee]。

## Flutter Favorite 使用指引

Flutter 團隊會在 pub.dev 上為 Flutter Favorite 套件加註標籤。
如果你擁有被指定為 Flutter Favorite 的套件，請遵循以下指引：

* Flutter Favorite 套件作者可以在套件的 GitHub README、pub.dev 的 **Overview** 分頁，以及與該套件相關的社群貼文上，放置 Flutter Favorite 標誌。
* 我們鼓勵你在社群媒體上使用 **#FlutterFavorite** 標籤。
* 使用 Flutter Favorite 標誌時，作者必須連結至本 Flutter Favorite 首頁，以說明此標章的意義。
* 若某個 Flutter Favorite 套件失去 Flutter Favorite 資格，作者將會收到通知，屆時必須立即移除該套件中所有「Flutter Favorite」字樣及標誌。
* 請勿以任何方式更改、扭曲或修改 Flutter Favorite 標誌，包括變更顏色或加入未經核准的視覺元素。
* 請勿以誤導、不公平、誹謗、侵權、中傷、貶損、猥褻或 Google 認為不當的方式展示 Flutter Favorite 標誌。

## 接下來的發展

隨著生態系持續發展，Flutter Favorite 套件清單預期會持續成長與變動。
委員會會持續與套件作者合作，提升品質，同時也會考慮將 Flutter Favorite 計畫擴展到其他生態系領域，例如工具、顧問公司，以及活躍的 Flutter 貢獻者。

隨著 Flutter 生態系的成長，
我們也會考慮擴充評選指標，可能包括：

* 使用 [pubspec.yaml 格式][pubspec.yaml format]，明確標示插件支援的平台。
* 支援最新穩定版 Flutter。
* 支援 AndroidX。
* 支援多平台，如 web、macOS、Windows、Linux 等。
* 整合測試與單元測試覆蓋率。

## Flutter Favorites

你可以在 pub.dev 上查看完整的
[Flutter Favorite 套件清單][Flutter Favorite packages]。


[send the committee]: mailto:flutter-committee@googlegroups.com
[Flutter Favorite packages]: {{site.pub}}/flutter/favorites
[Overall package score]: {{site.pub}}/help
[pubspec.yaml format]: /packages-and-plugins/developing-packages#plugin-platforms
[Verified publisher]: {{site.dart-site}}/tools/pub/verified-publishers
