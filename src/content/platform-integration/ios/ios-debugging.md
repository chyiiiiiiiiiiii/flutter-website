---
title: iOS 偵錯
description: Flutter 應用程式的 iOS 專屬偵錯技巧
---

由於 [iOS 14 或更新版本的本機網路權限][local network permissions in iOS 14 or later] 安全性限制，您必須接受權限對話框，才能啟用 Flutter 偵錯功能，例如 hot-reload（熱重載）和 DevTools。

![「允許網路連線」對話框的螢幕截圖](/assets/images/docs/development/device-connect.png)

這僅影響 debug（偵錯）與 profile（效能分析）版本，並不會在 release（正式）版本中出現。您也可以透過啟用 **設定 > 隱私權 > 本機網路 > 您的 App** 來授予此權限。

[local network permissions in iOS 14 or later]: {{site.apple-dev}}/news/?id=0oi77447

