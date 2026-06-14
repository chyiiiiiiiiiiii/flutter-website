## 效能

Flutter 中的平台視圖涉及效能上的取捨。

舉例來說，在典型的 Flutter 應用程式中，Flutter UI 是在專屬的光柵執行緒上進行合成的。這讓 Flutter 應用程式能夠保持高效能，因為主平台執行緒鮮少被阻塞。

當平台視圖以混合合成方式渲染時，Flutter UI 會改由平台執行緒進行合成，這會與其他工作（例如處理作業系統或插件訊息）競爭資源。

在 Android 10 以前，混合合成會將每個 Flutter 畫面從顯示記憶體複製到主記憶體，再複製回 GPU 紋理。由於這個複製動作會逐幀發生，整個 Flutter UI 的效能可能因此受到影響。在 Android 10 及以上版本中，顯示記憶體僅會複製一次。

另一方面，虛擬顯示會讓原生視圖的每個像素流經額外的中間圖形緩衝區，這會消耗顯示記憶體並影響繪製效能。

針對複雜情境，有一些技術可以用來緩解這些問題。

舉例來說，你可以在 Dart 中執行動畫時使用佔位紋理。換句話說，如果在渲染平台視圖時動畫變得緩慢，可以考慮對原生視圖截圖，並以紋理方式渲染。

更多資訊，請參閱：

* [`TextureLayer`][]
* [`TextureRegistry`][]
* [`FlutterTextureRegistry`][]
* [`FlutterImageView`][]

[`FlutterImageView`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterImageView.html
[`FlutterTextureRegistry`]: {{site.api}}/ios-embedder/protocol_flutter_texture_registry-p.html
[`TextureLayer`]: {{site.api}}/flutter/rendering/TextureLayer-class.html
[`TextureRegistry`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html
