---
title: 狀態管理
description: 如何設計應用程式架構，以管理其中流動的資料狀態。
next:
  title: 開始以宣告式思維思考
  path: /data-and-backend/state-mgmt/declarative
---

:::note
如果你曾經使用 Flutter 開發行動應用程式，
並且疑惑為什麼應用程式在重新啟動後狀態會遺失，
請參考 [Restore state on Android][Restore state on Android]
或 [Restore state on iOS][Restore state on iOS]。
:::

[Restore state on Android]: /platform-integration/android/restore-state-android
[Restore state on iOS]: /platform-integration/ios/restore-state-ios

_如果你已經熟悉在 reactive 應用程式中的狀態管理，
可以跳過本節，但你可能會想要瀏覽
[不同方法的清單][list of different approaches]。_

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/state-management-explainer.webp' width="100%" alt="一個簡短的動畫 gif，展示簡單宣告式狀態管理系統的運作方式。完整說明請見後續頁面，此處僅作為裝飾。">

{% comment %}
上述動畫的來源於內部追蹤為 b/122314402
{% endcomment %}

當你深入探索 Flutter 時，
總會遇到需要在多個螢幕間、甚至整個應用程式中
共享應用程式狀態的時刻。
你可以採用許多不同的方法，
也有許多問題需要思考。

在接下來的幾頁中，
你將學習在 Flutter 應用程式中處理狀態的基本知識。

[list of different approaches]: /data-and-backend/state-mgmt/options
