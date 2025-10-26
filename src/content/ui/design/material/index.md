---
title: Flutter 的 Material Design
description: 了解 Flutter 的 Material Design。
---

Material Design 是一套由 Google 設計師與開發者建立並維護的開源設計系統。

最新版本 Material 3，能夠帶來個人化、自適應且具表現力的體驗——從動態色彩與增強的無障礙功能，到大型螢幕版面配置的基礎，以及設計標記（design tokens）。

:::warning
自 Flutter 3.16 版本起，**Material 3 預設啟用**。目前，你可以透過設定 [`useMaterial3`][`useMaterial3`] 屬性為 `false` 來選擇停用 Material 3。但請注意，`useMaterial3` 屬性以及對 Material 2 的支援，最終將依照 Flutter 的[淘汰政策][deprecation policy]被棄用。
:::

對於_大多數_ Flutter 元件 (Widgets) 來說，升級到 Material 3 是無縫的。但_部分_元件無法直接更新——需要全新實作，例如 [`NavigationBar`][`NavigationBar`]。
你必須手動對程式碼進行這些更動。在你的應用程式完全更新之前，UI 可能會出現外觀或行為上的異常。
你可以造訪 [受影響元件][Affected widgets] 頁面，查看所有全新 Material 元件。


[Affected widgets]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html#affected-widgets
[deprecation policy]: /release/compatibility-policy#deprecation-policy
[demo]: {{site.github}}/flutter/samples/blob/main/material_3_demo/
[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html
[`useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html

你可以透過 [Material 3 demo][demo] 體驗更新後的元件、字體系統、色彩系統與陰影支援。

## 更多資訊 {:.no_toc}

若想進一步了解 Material Design 與 Flutter，請參考：

* [Material.io 開發者文件][Material.io developer documentation]
* Taha Tesser 撰寫的 [將 Flutter 應用程式遷移至 Material 3][Migrating a Flutter app to Material 3] 部落格文章
* [GitHub 上的總覽議題][Umbrella issue on GitHub]

[Material.io developer documentation]: {{site.material}}/develop/flutter
[Migrating a Flutter app to Material 3]: https://blog.codemagic.io/migrating-a-flutter-app-to-material-3/
[Umbrella issue on GitHub]: {{site.github}}/flutter/flutter/issues/91605
