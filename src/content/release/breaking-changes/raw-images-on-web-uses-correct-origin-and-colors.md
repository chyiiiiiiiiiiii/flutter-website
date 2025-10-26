```markdown
---
title: Web 上的原始圖片現在使用正確的起點與顏色
description: >
  直接呼叫 Web 引擎函式解碼的原始圖片，現在會使用正確的像素格式，並從左上角開始。
---

{% render docs/breaking-changes.md %}

## 摘要

Web 上原始圖片的渲染方式已被修正，
現在與其他平台保持一致。
這將導致舊有應用程式必須傳入錯誤資料給 `ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels` 的情況失效，
否則產生的圖片會上下顛倒且顏色錯誤
（紅色與藍色通道會被對調）。

## 背景

Flutter 內部所使用的「像素串流」格式一直以來都是這樣定義的：
每個像素的四個 8 位元通道，會依照 `format` 參數所定義的順序排列，
然後由左至右組成一列，接著列與列之間由上到下排列。

然而，Flutter for Web，特別是 HTML renderer，
過去因為對 BMP 格式規範的誤解而實作錯誤。
因此，當應用程式或函式庫使用
`ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels` 時，
必須將像素資料由下往上排列，並對調紅色與藍色通道
（例如，使用 `ui.PixelFormat.rgba8888` 格式時，
資料的前 4 個位元組會被當作第一個像素的藍、綠、
紅與 alpha 通道）。

這個錯誤已由 [engine#29593][engine#29593] 修正，
但應用程式與函式庫也必須修正其資料產生方式。

## 變更說明

`ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels` 的 `pixels` 參數
現在會依照 `format` 所描述的正確像素順序，
並以左上角為起點。

直接呼叫這兩個函式所渲染的圖片，
舊有程式碼若直接呼叫這些函式，可能會發現圖片上下顛倒且顏色錯誤。

## 遷移指南

如果應用程式使用最新版 Flutter 並遇到此情況，
最直接的解決方式是手動翻轉圖片，並改用其他像素格式。
但這通常不是最佳化的解決方案，
因為這類像素資料通常來自其他來源，
可以在資料產生過程中直接翻轉。

遷移前的程式碼：
```

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;

// Parse `image` as a displayable image.
//
// Each byte in `image` is a pixel channel, in the order of blue, green, red,
// and alpha, starting from the bottom left corner and going row first.
Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(image),
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.rgba8888,
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

遷移後的程式碼：

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;

Uint8List verticallyFlipImage(Uint8List sourceBytes, int width, int height) {
  final Uint32List source = Uint32List.sublistView(ByteData.sublistView(sourceBytes));
  final Uint32List result = Uint32List(source.length);
  int sourceOffset = 0;
  int resultOffset = 0;
  for (final int row = height - 1; row >= 0; row -= 1) {
    sourceOffset = width * row;
    for (final int col = 0; col < width; col += 1) {
      result[resultOffset] = source[sourceOffset];
      resultOffset += 1;
      sourceOffset += 1;
    }
  }
  return Uint8List.sublistView(ByteData.sublistView(sourceBytes))
}

Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final Uint8List correctedImage = verticallyFlipImage(image, width, height);
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(correctedImage),
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.rgba8888,
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

更棘手的情況是，當你正在撰寫一個函式庫（library），並且希望這個函式庫同時能在最新版本的 Flutter 以及較舊的 Flutter 版本上運作。在這種情況下，你可以先解碼單一像素，來判斷行為是否已經改變。

遷移後的程式碼如下：

```dart
Uint8List verticallyFlipImage(Uint8List sourceBytes, int width, int height) {
  // Same as the example above.
}

late Future<bool> imageRawUsesCorrectBehavior = (() async {
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(Uint8List.fromList(<int>[0xED, 0, 0, 0xFF])),
    width: 1, height: 1, pixelFormat: ui.PixelFormat.rgba8888);
  final ui.Image image = (await (await descriptor.instantiateCodec()).getNextFrame()).image;
  final Uint8List resultPixels = Uint8List.sublistView(
    (await image.toByteData(format: ui.ImageByteFormat.rawStraightRgba))!);
  return resultPixels[0] == 0xED;
})();

Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final Uint8List correctedImage = (await imageRawUsesCorrectBehavior) ?
    verticallyFlipImage(image, width, height) : image;
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(correctedImage), // Use the corrected image
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.bgra8888, // Use the alternate format
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

## 時程

合併於版本：2.9.0-0.0.pre<br>  
穩定版本釋出：2.10

## 參考資料

API 文件：

* [`decodeImageFromPixels`][`decodeImageFromPixels`]
* [`ImageDescriptor.raw`][`ImageDescriptor.raw`]

相關議題：

* [Web: Regression in Master - PDF display distorted due to change in BMP Encoder][Web: Regression in Master - PDF display distorted due to change in BMP Encoder]
* [Web: ImageDescriptor.raw flips and inverts images (partial reason included)][Web: ImageDescriptor.raw flips and inverts images (partial reason included)]

相關 PR：

* [Web: Reland: Fix BMP encoder][Web: Reland: Fix BMP encoder]
* [Clarify ImageDescriptor.raw pixel order and add version detector][Clarify ImageDescriptor.raw pixel order and add version detector]

[`decodeImageFromPixels`]: {{site.api}}/flutter/dart-ui/decodeImageFromPixels.html
[`ImageDescriptor.raw`]: {{site.api}}/flutter/dart-ui/ImageDescriptor/ImageDescriptor.raw.html

[Web: Regression in Master - PDF display distorted due to change in BMP Encoder]: {{site.repo.flutter}}/issues/93615
[Web: ImageDescriptor.raw flips and inverts images (partial reason included)]: {{site.repo.flutter}}/issues/89610

[engine#29593]: {{site.repo.engine}}/pull/29593
[Web: Reland: Fix BMP encoder]: {{site.repo.engine}}/pull/29593
[Clarify ImageDescriptor.raw pixel order and add version detector]: {{site.repo.engine}}/pull/30343
