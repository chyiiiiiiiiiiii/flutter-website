---
title: 新增 ImageProvider.loadBuffer
description: >
  ImageProvider 現在必須使用新的 loadBuffer API 來實作，
  不再使用現有的 load API。
---

{% render docs/breaking-changes.md %}

## 摘要

* `ImageProvider` 現在新增了一個名為 `loadBuffer` 的方法，其功能類似於 `load`，但它是從 `ui.ImmutableBuffer` 進行解碼。
* `ui.ImmutableBuffer` 現在可以直接由資源鍵（asset key）建立。
* `AssetBundle` 類別現在可以載入 `ui.ImmutableBuffer`。
* `PaintingBinding` 現在新增了一個名為 `instantiateImageCodecFromBuffer` 的方法，其功能與 `instantiateImageCodec` 類似。
* `ImageProvider.load` 現已被棄用，未來版本將會移除。
* `PaintingBinding.instantiateImageCodec` 現已被棄用，未來版本將會移除。

## 背景

`ImageProvider.loadBuffer` 是一個必須實作的新方法，用於載入圖片。此 API 讓基於資源的圖片載入能更快速，並減少對應用程式的記憶體影響。

## 變更說明

以往載入資源圖片時，ImageProvider API 需要多次複製壓縮資料。首先，開啟資源時會將資料複製到外部堆積（external heap），並以型別化資料陣列（typed data array）形式暴露給 Dart。接著，該型別化資料陣列最終會轉換成 `ui.ImmutableBuffer`，而其內部又會將資料複製到另一個結構以進行解碼。

隨著 `ui.ImmutableBuffer.fromAsset` 的加入，壓縮圖片位元組可直接載入到解碼所需的結構中。採用此方式需要調整 `ImageProvider` 的位元組載入流程。此流程也更快，因為它省略了先前基於方法通道（method channel）的載入器所需的額外排程負擔。

`ImageProvider.loadBuffer` 的合約基本與 `ImageProvider.load` 相同，但它提供了一個新的解碼回呼（callback），該回呼預期接收 `ui.ImmutableBuffer` 而非 `Uint8List`。對於從非資源來源取得位元組的 `ImageProvider` 類別，可使用便利方法 `ui.ImmutableBuffer.fromUint8List` 以確保相容性。

## 遷移指南

繼承 `ImageProvider` 的類別，必須實作 `loadBuffer` 方法以載入資源。直接委派或呼叫 `ImageProvider` 方法的類別，必須改用 `loadBuffer`，而非 `load`。

遷移前的程式碼：

```dart
class MyImageProvider extends ImageProvider<MyImageProvider> {
  @override
  ImageStreamCompleter load(MyImageProvider key, DecoderCallback decode) {
    return MultiFrameImageStreamCompleter(
        codec: _loadData(key, decode),
    );
  }

  Future<ui.Codec> _loadData(MyImageProvider key, DecoderCallback decode) async {
    final Uint8List bytes = await bytesFromSomeApi();
    return decode(bytes);
  }
}

class MyDelegatingProvider extends ImageProvider<MyDelegatingProvider> {
  MyDelegatingProvider(this.provider);

  final ImageProvder provider;

  @override
  ImageStreamCompleter load(MyDelegatingProvider key, DecoderCallback decode) {
    return provider.load(key, decode);
  }
}
```

遷移後的程式碼：

```dart
class MyImageProvider extends ImageProvider<MyImageProvider> {
  @override
  ImageStreamCompleter loadBuffer(MyImageProvider key, DecoderBufferCallback decode) {
    return MultiFrameImageStreamCompleter(
        codec: _loadData(key, decode),
    );
  }

  Future<ui.Codec> _loadData(MyImageProvider key, DecoderBufferCallback decode) async {
    final Uint8List bytes = await bytesFromSomeApi();
    final ui.ImmutableBuffer buffer = await ui.ImmutableBuffer.fromUint8List(bytes);
    return decode(buffer);
  }
}

class MyDelegatingProvider extends ImageProvider<MyDelegatingProvider> {
  MyDelegatingProvider(this.provider);

  final ImageProvder provider;

  @override
  ImageStreamCompleter loadBuffer(MyDelegatingProvider key, DecoderCallback decode) {
    return provider.loadBuffer(key, decode);
  }
}
```

在這兩種情況下，你都可以選擇保留先前的 `ImageProvider.load` 實作，讓你的程式碼使用者也有時間進行遷移。

## 時程

合併進版本：3.1.0-0.0.pre.976<br>  
穩定版發佈：3.3.0

## 參考資料

API 文件：

* [`ImmutableBuffer`]({{site.api}}/flutter/dart-ui/ImmutableBuffer-class.html)
* [`ImageProvider`]({{site.api}}/flutter/painting/ImageProvider-class.html)

相關 PR：

* [Use immutable buffer for loading asset images]({{site.repo.flutter}}/pull/103496)
