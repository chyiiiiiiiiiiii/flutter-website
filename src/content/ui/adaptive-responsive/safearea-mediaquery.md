---
title: SafeArea 與 MediaQuery
description: >-
  學習如何使用 SafeArea 與 MediaQuery
  來打造自適應的應用程式。
---

本頁將討論如何以及何時使用 `SafeArea` 和 `MediaQuery` 元件。

## SafeArea

當你的應用程式運行於最新裝置時，可能會遇到 UI 的部分區塊被裝置螢幕上的缺口遮擋的情況。你可以透過 [`SafeArea`][`SafeArea`] 元件來解決這個問題，這個元件會自動為其子元件加入內邊距，以避開螢幕的入侵區（例如瀏海和鏡頭缺口）、作業系統的 UI（例如 Android 的狀態列），或是實體螢幕的圓角。

如果你不希望有這樣的行為，`SafeArea` 元件允許你針對其四個邊的 padding 進行啟用或停用。預設情況下，四個邊都會啟用。

一般建議將 `Scaffold` 元件的 body 包裹在 `SafeArea` 內作為起點，但你不一定需要將它放在 `Widget` 樹狀結構的這麼高層。

舉例來說，如果你希望應用程式的內容刻意延伸到缺口下方，你可以將 `SafeArea` 移動到適合的內容外層包裹，讓應用程式的其他部分可以佔滿整個螢幕。

使用 `SafeArea` 可以確保你的應用內容不會被實體螢幕特徵或作業系統 UI 遮擋，並且讓你的應用在未來面對不同形狀與風格缺口的新裝置時也能順利運作。

`SafeArea` 為什麼能用這麼少的程式碼做到這麼多事？其實在背後，它是透過 `MediaQuery` 物件來實現的。  
[`SafeArea`]: {{site.api}}/flutter/widgets/SafeArea-class.html

## MediaQuery

如同在 [SafeArea](#safearea) 章節所討論，`MediaQuery` 是打造自適應應用程式非常強大的元件。有時你會直接使用 `MediaQuery`，有時則會使用 `SafeArea`，而它在背後也是透過 `MediaQuery` 運作。

`MediaQuery` 提供了豐富的資訊，包括應用目前視窗的大小。它也能揭露像是高對比模式、文字縮放等無障礙設定，或是使用者是否啟用了像 TalkBack 或 VoiceOver 這類的無障礙服務。`MediaQuery` 也包含了裝置螢幕特徵的資訊，例如是否有鉸鏈或可折疊設計。

`SafeArea` 會利用來自 `MediaQuery` 的資料來計算應該為其子元件 `Widget` 加入多少內邊距。具體來說，它會使用 `MediaQuery` 的 padding 屬性，這基本上就是被系統 UI、螢幕缺口或狀態列部分遮蔽的螢幕區域。

那麼，為什麼不直接使用 `MediaQuery` 呢？

原因在於 `SafeArea` 做了一件巧妙的事，使得使用它比直接用原始的 `MediaQueryData` 更有優勢。具體來說，它會修改暴露給 `SafeArea` 子元件的 `MediaQuery`，讓這些子元件感覺不到 `SafeArea` 所加上的 padding。這代表你可以巢狀多層 `SafeArea`，而只有最外層的那一個會套用避免缺口與系統 UI 所需的 padding。

隨著你的應用成長並調整元件結構時，即使有多個 `SafeArea`，你也不用擔心會重複套用過多的 padding；但如果直接使用 `MediaQueryData.padding`，就可能會遇到這個問題。

你 _可以_ 用 `SafeArea` 包裹 `Scaffold` 元件的 body，但你 _不必_ 一定要放在元件樹這麼高的層級。`SafeArea` 只需要包裹那些如果被前述硬體特徵遮擋會導致資訊遺失的內容即可。

舉例來說，如果你希望應用內容刻意延伸到缺口下方，你可以將 `SafeArea` 移動到適合的內容外層包裹，讓應用程式的其他部分可以佔滿整個螢幕。補充說明，這也是 `AppBar` 元件預設的行為，因此它會顯示在系統狀態列下方。這也是為什麼建議用 `SafeArea` 包裹 `Scaffold` 的 body，而不是包裹整個 `Scaffold` 本身。

`SafeArea` 能以通用的方式確保你的應用內容不會被遮擋，並讓你的應用即使面對未來不同形狀與風格缺口的新裝置時也能順利運作。
