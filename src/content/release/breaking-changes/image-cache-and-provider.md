---
title: ImageCache 和 ImageProvider 的變更
description: >
  ImageCache 現在要求實作時必須覆寫 containsKey，
  而 ImageProvider 已將 resolve 標記為 @nonVirtual。
---

{% render docs/breaking-changes.md %}

## 摘要

`ImageCache` 現在新增了一個名為 `containsKey` 的方法。
`ImageProvider` 的子類別不應再覆寫 `resolve`，
而是應該在 `ImageProvider` 上實作新的方法。
這些變更已以單一提交合併到 framework 中。

## 變更說明

以下章節將說明對 `containsKey`
以及 `ImageProvider` 的變更。

### containsKey 變更

`ImageCache` 的使用者，例如自訂的 `ImageProvider`，
可能會希望知道快取是否已經追蹤某張圖片。
新增 `containsKey` 方法讓呼叫端可以查詢這個狀態，
而不需要呼叫像 `putIfAbsent` 這樣的方法，
以避免觸發不希望發生的 `ImageProvider.load` 呼叫。

預設實作會同時檢查待處理與已快取的圖片儲存區。

```dart
  bool containsKey(Object key) {
    return _pendingImages[key] != null || _cache[key] != null;
  }
```

### ImageProvider 變更

`ImageProvider.resolve` 方法會進行一些複雜的錯誤處理，通常不應該被覆寫。先前它也會透過 `ImageProvider.obtainKey` 和 `ImageProvider.load` 來將圖片載入圖片快取（image cache）。子類別如果想要覆寫這個行為，必須覆寫 `resolve`，而如果有多個 `ImageProvider` 需要覆寫 `resolve`，則組合 `ImageProvider` 的能力會受到限制。

為了解決這個問題，`resolve` 現在被標記為不可覆寫（non-virtual），並新增了兩個受保護的方法：`createStream()` 和 `resolveStreamForKey()`。這些方法讓子類別能夠控制 `resolve` 的大部分行為，而不需要重複所有錯誤處理的邏輯。這也讓組合多個 `ImageProvider` 的子類別可以更有信心，確保只有一個公開的進入點來處理多層串接的 provider。

## 遷移指南

### ImageCache 變更

遷移前，程式碼不會覆寫 `containsKey`。

遷移後的程式碼如下：

```dart
class MyImageCache implements ImageCache {
  @override
  bool containsKey(Object key) {
    // Check if your custom cache is tracking this key.
  }

  ...
}
```

### ImageProvider 變更

遷移前的程式碼：

```dart
class MyImageProvider extends ImageProvider<Object> {
  @override
  ImageStream resolve(ImageConfiguration configuration) {
    // create stream
    // set up error handling
    // interact with ImageCache
    // call obtainKey/load, etc.
  }
  ...
}
```

遷移後的程式碼：

```dart
class MyImageProvider extends ImageProvider<Object> {
  @override
  ImageStream createStream(ImageConfiguration configuration) {
    // Return stream, or use super.createStream(),
    // which returns a new ImageStream.
  }

  @override
  void resolveStreamForKey(
    ImageConfiguration configuration,
    ImageStream stream,
    Object key,
    ImageErrorListener handleError,
  ) {
    // Interact with the cache, use the key, potentially call `load`,
    // and report any errors back through `handleError`.
  }
  ...
}

```

## 時程

合併於版本：1.16.3<br>  
進入穩定版：1.17

## 參考資料

API 文件：

* [`ImageCache`][`ImageCache`]
* [`ImageProvider`][`ImageProvider`]
* [`ScrollAwareImageProvider`][`ScrollAwareImageProvider`]

相關議題：

* [Issue #32143][Issue #32143]
* [Issue #44510][Issue #44510]
* [Issue #48305][Issue #48305]
* [Issue #48775][Issue #48775]

相關 PR：

* [Defer image decoding when scrolling fast #49389][Defer image decoding when scrolling fast #49389]

[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`ImageProvider`]: {{site.api}}/flutter/painting/ImageProvider-class.html
[`ScrollAwareImageProvider`]: {{site.api}}/flutter/widgets/ScrollAwareImageProvider-class.html
[Issue #32143]: {{site.repo.flutter}}/issues/32143
[Issue #44510]: {{site.repo.flutter}}/issues/44510
[Issue #48305]: {{site.repo.flutter}}/issues/48305
[Issue #48775]: {{site.repo.flutter}}/issues/48775
[Defer image decoding when scrolling fast #49389]: {{site.repo.flutter}}/pull/49389
