---
title: 驗證深層連結 (deep links)
description: 瞭解如何在您的應用程式中驗證深層連結 (deep links)。
---

:::note
自 3.27 版本起，深層連結驗證工具
同時支援 Android 和 iOS。

若想觀看深層連結驗證工具的示範，
請參考 Google I/O 2024 影片，
[No more broken links: Deep linking success in Flutter][No more broken links: Deep linking success in Flutter]。
:::

[No more broken links: Deep linking success in Flutter]: {{site.youtube-site}}/watch?v=d7sZL6h1Elw

深層連結檢視會驗證您應用程式中
所定義的所有深層連結 (deep links)。

若要使用此功能，請開啟 DevTools，
點選 **Deep Links** 分頁，
並匯入包含深層連結 (deep links) 的 Flutter 專案。

![Screenshot of the Deep Link Validator](/assets/images/docs/tools/devtools/deep-link-validator.png){:width="100%"}

這個工具可協助您識別並排除
行動裝置深層連結 (deep links) 設定中的任何錯誤，
從網站設定到 manifest 檔案皆涵蓋在內。
DevTools 會提供修正問題的指引，
讓實作流程更加簡單。 

