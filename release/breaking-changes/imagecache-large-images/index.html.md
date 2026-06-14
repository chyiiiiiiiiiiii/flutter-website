# ImageCache 大型圖片

> 停止自動增加 ImageCache 的 maxByteSize 以容納大型圖片。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`ImageCache` 的 `maxByteSize` 現在不會再自動變大來容納大型圖片。

## 背景說明

過去，當將圖片載入 `ImageCache`，且該圖片的位元組大小超過 `ImageCache` 的 `maxByteSize` 時，
Flutter 會永久增加 `maxByteSize` 的數值以容納這些圖片。
這樣的邏輯有時會導致 `maxByteSize` 數值膨脹，讓在記憶體有限的系統上運作變得更加困難。

## 變更說明

以下「變更前」與「變更後」的偽程式碼，展示了對 `ImageCache` 演算法所做的調整：

```dart
// Old logic pseudocode
void onLoadImage(Image image) {
  if (image.byteSize > _cache.maxByteSize) {
    _cache.maxByteSize = image.byteSize + 1000;
  }
  _cache.add(image);
  while (_cache.count > _cache.maxCount
      || _cache.byteSize > _cache.maxByteSize) {
    _cache.discardOldestImage();
  }
}
```

```dart
// New logic pseudocode
void onLoadImage(Image image) {
  if (image.byteSize < _cache.maxByteSize) {
    _cache.add(image);
    while (_cache.count > _cache.maxCount
        || _cache.byteSize > cache.maxByteSize) {
      cache.discardOldestImage();
    }
  }
}
```

## 遷移指南

在某些情況下，`ImageCache` 可能會因為新的邏輯而發生 thrashing（頻繁清除與重建快取），而這在先前版本中並未出現，特別是當你載入的圖片大於你的 `cache.maxByteSize` 值時。
你可以透過以下其中一種方式來解決這個問題：

1. 提高 `ImageCache.maxByteSize` 值，以容納更大的圖片。
1. 調整你的圖片載入邏輯，確保圖片能夠適當地符合你所設定的 `ImageCache.maxByteSize` 值。
1. 繼承（subclass）`ImageCache`，實作你想要的邏輯，並建立一個新的綁定（binding）來提供你自訂的 `ImageCache` 子類別（詳見 [`image_cache.dart`][] 原始碼）。

## 時程

舊的演算法已不再支援。

合併於版本：1.16.3<br>
穩定版釋出：1.17

## 參考資料

API 文件：

* [`ImageCache`][]

相關議題：

* [Issue 45643][]

相關 PR：

* [Stopped increasing the cache size to accommodate large images][]

其他：

* [`ImageCache` 原始碼][`ImageCache` source]


[Stopped increasing the cache size to accommodate large images]: https://github.com/flutter/flutter/pull/47387
[`ImageCache`]: https://api.flutter.dev/flutter/painting/ImageCache-class.html
[`image_cache.dart`]: https://github.com/flutter/flutter/blob/72a3d914ee5db0033332711224e728b8a5281d89/packages/flutter/lib/src/painting/image_cache.dart#L34
[`ImageCache` source]: https://github.com/flutter/flutter/blob/main/packages/flutter/lib/src/painting/image_cache.dart
[Issue 45643]: https://github.com/flutter/flutter/issues/45643

