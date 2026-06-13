---
title: Flutter 的 Material Design
description: 了解 Flutter 的 Material Design。
---

Material Design 是一套由 Google 設計師與開發者建立並支援的開源設計系統。

最新版本 Material 3，實現了個人化、自適應且具表現力的體驗——從動態色彩與強化的無障礙功能，到大型螢幕版面配置的基礎，以及設計標記（design tokens）。

:::warning
自 Flutter 3.16 版本起，**Material 3 已預設啟用**。目前，你仍可透過設定 [`useMaterial3`][`useMaterial3`] 屬性為 `false` 來選擇不使用 Material 3。但請注意，`useMaterial3` 屬性與對 Material 2 的支援，最終將依照 Flutter 的[淘汰政策][deprecation policy]被棄用。
:::

對於_大多數_ Flutter 元件 (Widgets) 而言，升級至 Material 3 是無縫的。但_部分_元件無法直接更新——這些元件需要全新實作，例如 [`NavigationBar`][`NavigationBar`]。
你必須手動修改這些程式碼。在你的應用程式完全更新之前，UI 可能會有些異常的外觀或行為。
你可以在 [受影響元件][Affected widgets]頁面找到這些全新 Material 元件 (Material components)。

[Affected widgets]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html#affected-widgets
[deprecation policy]: /release/compatibility-policy#deprecation-policy
[demo]: {{site.github}}/flutter/samples/blob/main/material_3_demo/
[`NavigationBar`]: {{site.api}}/flutter/material/NavigationBar-class.html
[`useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html

歡迎透過 [Material 3 demo][demo]，探索更新後的元件、字體系統、色彩系統與陰影（elevation）支援。

## 更多資訊 {:.no_toc}

若想進一步了解 Material Design 與 Flutter，請參考：

* [Material.io 開發人員文件][Material.io developer documentation]
* Taha Tesser 撰寫的 [將 Flutter 應用程式遷移至 Material 3][Migrating a Flutter app to Material 3] 部落格文章
* [GitHub 上的 umbrella issue][Umbrella issue on GitHub]

[Material.io developer documentation]: {{site.material}}/develop/flutter
[Migrating a Flutter app to Material 3]: https://blog.codemagic.io/migrating-a-flutter-app-to-material-3/
[Umbrella issue on GitHub]: {{site.github}}/flutter/flutter/issues/91605
