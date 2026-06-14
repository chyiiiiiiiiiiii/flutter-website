# 滾動

> Flutter 滾動支援總覽



Flutter 內建許多會自動滾動的元件 (Widget)，同時也提供多種可自訂的元件，讓你打造特定的滾動行為。

## 基本滾動

許多 Flutter 元件原生支援滾動，並且會自動處理大部分細節。例如，[`SingleChildScrollView`][] 會在需要時自動讓其子元件滾動。其他實用的元件還有 [`ListView`][] 和 [`GridView`][]。你可以在 Widget 目錄的 [滾動頁面][scrolling page] 查看更多相關元件。

<YouTubeEmbed id="DbkIQSvwnZc" title="Scrollbar | Flutter widget of the week"></YouTubeEmbed>

<YouTubeEmbed id="KJpkjHGiI5A" title="ListView | Flutter widget of the week"></YouTubeEmbed>

### 無限滾動

當你的 `ListView` 或 `GridView` 中有很長的項目清單（包含 _無限_ 清單）時，可以在項目進入可視範圍時動態建置，這樣能大幅提升滾動效能。想了解更多，請參考 [`ListView.builder`][] 或 [`GridView.builder`][]。

[`ListView.builder`]: https://api.flutter.dev/flutter/widgets/ListView/ListView.builder.html
[`GridView.builder`]: https://api.flutter.dev/flutter/widgets/GridView/GridView.builder.html

### 專用滾動元件

以下元件提供更特定的滾動行為。

關於 [`DraggableScrollableSheet`][] 的使用教學影片：

<YouTubeEmbed id="Hgw819mL_78" title="DraggableScrollableSheet | Flutter widget of the week"></YouTubeEmbed>

想要將滾動區域變成輪盤式，可以使用 [`ListWheelScrollView`][]！

<YouTubeEmbed id="dUhmWAz4C7Y" title="ListWheelScrollView | Flutter widget of the week"></YouTubeEmbed>

[`DraggableScrollableSheet`]: https://api.flutter.dev/flutter/widgets/DraggableScrollableSheet-class.html
[`GridView`]: https://api.flutter.dev/flutter/widgets/GridView-class.html
[`ListView`]: https://api.flutter.dev/flutter/widgets/ListView-class.html
[`ListWheelScrollView`]: https://api.flutter.dev/flutter/widgets/ListWheelScrollView-class.html
[scrolling page]: /ui/widgets/scrolling
[`SingleChildScrollView`]: https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html



## 進階滾動效果

你可能想實作 _彈性_ 滾動（elastic scrolling，又稱 scroll bouncing），或是其他動態滾動效果，例如視差滾動（parallax scrolling）。又或者你需要具有特定行為的滾動標頭，例如縮小或消失。

這些效果都可以透過 Flutter 的 `Sliver*` 類別來實現。_sliver_ 指的是可滾動區域中的一部分。你可以將 sliver 定義並插入 [`CustomScrollView`][]，以更細緻地控制該區域。

想了解更多，請參考 [使用 slivers 實現進階滾動效果][Using slivers to achieve fancy scrolling] 以及 [Sliver 類別][Sliver classes]。

[`CustomScrollView`]: https://api.flutter.dev/flutter/widgets/CustomScrollView-class.html
[Sliver classes]: /ui/widgets/layout#sliver-widgets
[Using slivers to achieve fancy scrolling]: /ui/layout/scrolling/slivers

## 巢狀滾動元件

如果你想在一個滾動元件內再嵌入另一個滾動元件，該如何避免影響滾動效能？你應該將 `ShrinkWrap` 屬性設為 true，還是該使用 sliver？

請參考「ShrinkWrap vs Slivers」影片：

<YouTubeEmbed id="LUqDNnv_dh0" title="ShrinkWrap vs Slivers | Decoding Flutter"></YouTubeEmbed>

