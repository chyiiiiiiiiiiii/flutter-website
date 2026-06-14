# 新增 ImageProvider.loadBuffer

> ImageProvider 現在必須使用新的 loadBuffer API 來實作， 而非既有的 load API。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

* `ImageProvider` 現在新增了一個名為 `loadBuffer` 的方法，其功能
   與 `load` 類似，但它是從 `ui.ImmutableBuffer` 進行解碼。
* `ui.ImmutableBuffer` 現在可以直接從資源鍵建立。
* `AssetBundle` 類別現在可以載入 `ui.ImmutableBuffer`。
* `PaintingBinding` 現在新增了一個名為
  `instantiateImageCodecFromBuffer` 的方法，其功能與
  `instantiateImageCodec` 類似。
* `ImageProvider.load` 現已被棄用，未來版本將會移除。
* `PaintingBinding.instantiateImageCodec` 現已被棄用，未來版本
   也將會移除。

## 背景說明

`ImageProvider.loadBuffer` 是一個新的方法，必須實作以載入圖片。此 API 讓基於資源的圖片載入能更快速，
並減少對應用程式的記憶體影響。

## 變更說明

過去在載入資源圖片時，image provider API 會產生多份壓縮資料的複本。首先，當開啟資源時，
資料會被複製到外部堆積（external heap），並以型別化資料陣列（typed data array）的形式暴露給 Dart。接著，
該型別化資料陣列最終會被轉換為 `ui.ImmutableBuffer`，
而這個過程會在內部將資料再複製到另一個結構中以進行解碼。

隨著 `ui.ImmutableBuffer.fromAsset` 的加入，壓縮圖片位元組現在可以直接載入到用於解碼的結構中。這種做法
需要對 `ImageProvider` 的位元組載入流程進行調整。這個流程也更快，
因為它繞過了舊有基於 method channel 載入器的額外排程開銷。

`ImageProvider.loadBuffer` 的合約與
`ImageProvider.load` 基本相同，但它提供了一個新的解碼回呼（callback），該回呼期望接收
`ui.ImmutableBuffer` 而非 `Uint8List`。對於從非資源來源取得位元組的 `ImageProvider` 類別，
可以使用便利方法 `ui.ImmutableBuffer.fromUint8List` 以確保相容性。

## 遷移指南

繼承自 `ImageProvider` 的類別，必須實作 `loadBuffer` 方法以載入資源。
直接委派或呼叫 `ImageProvider` 方法的類別，必須改用 `loadBuffer`，而非 `load`。

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

  final ImageProvider provider;

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

  final ImageProvider provider;

  @override
  ImageStreamCompleter loadBuffer(MyDelegatingProvider key, DecoderCallback decode) {
    return provider.loadBuffer(key, decode);
  }
}
```

在這兩種情況下，你都可以選擇保留 `ImageProvider.load` 的舊有實作，讓你的程式碼使用者也有時間進行遷移。

## 時程

合併進版本：3.1.0-0.0.pre.976<br>
正式版釋出：3.3.0

## 參考資料

API 文件：

* [`ImmutableBuffer`](https://api.flutter.dev/flutter/dart-ui/ImmutableBuffer-class.html)
* [`ImageProvider`](https://api.flutter.dev/flutter/painting/ImageProvider-class.html)

相關 PR：

* [Use immutable buffer for loading asset images](https://github.com/flutter/flutter/pull/103496)

