---
title: SafeArea 與 MediaQuery
description: >-
  學習如何使用 SafeArea 與 MediaQuery
  來打造自適應應用程式。
---

本頁將討論如何以及何時使用 `SafeArea` 和 `MediaQuery` 元件 (Widget)。

## SafeArea

當你的應用程式運行在最新的裝置上時，可能會遇到部分 UI 被裝置螢幕上的缺口遮擋的情況。你可以使用 [`SafeArea`][] 元件來解決這個問題，它會為其子元件自動加入內距（padding），以避免被螢幕缺口（如瀏海和鏡頭開孔）、作業系統 UI（例如 Android 的狀態列），或是實體螢幕的圓角等遮擋。

如果你不希望有這種行為，`SafeArea` 元件允許你針對四個邊的內距分別啟用或停用。預設情況下，四個邊都會啟用。

一般建議將 `Scaffold` 元件的 body 包裹在 `SafeArea` 內作為起點，但你不一定要將它放在 `Widget` 樹這麼高的位置。

舉例來說，如果你有意讓應用程式延伸到螢幕缺口下方，你可以將 `SafeArea` 包裹在適合的內容外層，讓應用程式的其他部分佔滿整個螢幕。

使用 `SafeArea` 可以確保你的應用程式內容不會被實體螢幕特徵或作業系統 UI 遮擋，並且即使未來有不同形狀、不同風格缺口的新裝置問世，也能讓你的應用程式順利運作。

`SafeArea` 為什麼能用這麼少的程式碼做到這麼多？其實它在背後使用了 `MediaQuery` 物件。

[`SafeArea`]: {{site.api}}/flutter/widgets/SafeArea-class.html

## MediaQuery

如同在 [SafeArea](#safearea) 章節所討論，`MediaQuery` 是打造自適應應用程式非常強大的元件。有時你會直接使用 `MediaQuery`，有時則會用到 `SafeArea`，而它的底層則是用 `MediaQuery`。

`MediaQuery` 提供了大量資訊，包括應用程式目前視窗的大小。它也會公開無障礙設定，例如高對比模式、文字縮放，或是使用者是否啟用了像 TalkBack 或 VoiceOver 這類無障礙服務。`MediaQuery` 也包含了裝置螢幕特徵的資訊，例如是否有鉸鏈或可折疊設計。

`SafeArea` 會使用來自 `MediaQuery` 的資料來判斷要為其子元件 `Widget` 加入多少內距。具體來說，它會用到 `MediaQuery` 的 `padding` 屬性，這基本上就是被系統 UI、螢幕缺口或狀態列部分遮擋的螢幕區域大小。

那麼，為什麼不直接使用 `MediaQuery` 呢？

答案是 `SafeArea` 做了一件很聰明的事，讓它比單純使用 `MediaQueryData` 更值得使用。具體來說，它會修改暴露給 `SafeArea` 子元件的 `MediaQuery`，讓這些子元件看起來好像 `SafeArea` 加入的 padding 並不存在。這表示你可以巢狀多個 `SafeArea`，而只有最上層的那一個會套用避免缺口與系統 UI 所需的 padding。

隨著你的應用程式成長並調整元件位置時，即使有多個 `SafeArea`，你也不用擔心會重複套用過多的 padding；但如果直接使用 `MediaQueryData.padding`，就可能會遇到這個問題。

你 _可以_ 將 `Scaffold` 元件的 body 包裹在 `SafeArea` 內，但你不 _一定_ 要將它放在元件樹這麼高的位置。`SafeArea` 只需要包裹那些如果被前述硬體特徵遮擋會導致資訊遺失的內容即可。

舉例來說，如果你有意讓應用程式延伸到螢幕缺口下方，你可以將 `SafeArea` 包裹在適合的內容外層，讓應用程式的其他部分佔滿整個螢幕。一個補充說明是，這也是 `AppBar` 元件預設的行為，因此它會顯示在系統狀態列下方。這也是為什麼建議將 `Scaffold` 的 body 包裹在 `SafeArea`，而不是直接包裹整個 `Scaffold`。

`SafeArea` 能以通用的方式確保你的應用程式內容不會被遮擋，並讓你的應用程式即使面對未來各種不同形狀、風格缺口的新裝置時也能順利運作。
