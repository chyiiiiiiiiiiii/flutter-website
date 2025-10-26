---
title: 建置時轉換資源
description: 如何在你的 Flutter 應用程式中設定圖片（以及其他資源）的自動轉換。
shortTitle: 資源轉換
---

你可以透過相容的 Dart 套件，將專案設定為在建置時自動轉換資源。

## 指定資源轉換

在 `pubspec.yaml` 檔案中，列出要進行轉換的資源以及對應的轉換器套件。

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
```

透過這個設定，`assets/logo.svg` 會在複製到建置輸出時，經由 [`vector_graphics_compiler`][`vector_graphics_compiler`] 套件進行轉換。這個套件會將 SVG 檔案預先編譯成最佳化的二進位檔案，這些檔案可以透過 [`vector_graphics`][`vector_graphics`] 套件顯示，如下所示：

<?code-excerpt "ui/assets_and_images/lib/logo.dart (TransformedAsset)"?>
```dart
import 'package:vector_graphics/vector_graphics.dart';

const Widget logo = VectorGraphic(loader: AssetBytesLoader('assets/logo.svg'));
```

### 傳遞參數給資源轉換器

若要將一串參數傳遞給資源轉換器（asset transformer），
也需要在 pubspec 中進行指定：

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
          args: ['--tessellate', '--font-size=14']
```

### 串接資源轉換器

資源轉換器（asset transformers）可以串接使用，並且會依照宣告的順序依次套用。
請參考以下使用虛構套件的範例：

```yaml
flutter:
  assets:
    - path: assets/bird.png
      transformers:
        - package: grayscale_filter
        - package: png_optimizer
```

在這裡，`bird.png` 會由 `grayscale_filter` 套件進行轉換。
其輸出結果接著會由 `png_optimizer` 套件再次轉換，然後才會被
打包進建置後的應用程式中。

## 撰寫資源轉換器套件

資源轉換器（asset transformer）是一個 Dart [命令列應用程式][command-line app]，會以
`dart run` 執行，並至少帶有兩個參數：`--input`，其內容為
要轉換的檔案路徑，以及 `--output`，即轉換器程式必須將輸出結果寫入的位置。

如果轉換器以非零的結束碼（exit code）結束，應用程式建置
將會失敗，並顯示錯誤訊息，說明資源轉換失敗的原因。
轉換器在處理過程中寫入 [`stderr`] 資料流的任何內容，
都會被包含在錯誤訊息中。

在執行轉換器時，`FLUTTER_BUILD_MODE`
環境變數會被設為所使用建置模式的命令列名稱。
例如，如果你以 `flutter run -d macos --release` 執行應用程式，
則 `FLUTTER_BUILD_MODE` 會被設為 `release`。

## 範例

若要參考一個使用資源轉換並包含自訂 Dart 套件作為轉換器的 Flutter 專案，請參閱
[Flutter samples repo 中的 asset_transformers 專案][asset_transformers project in the Flutter samples repo]。

[command-line app]: {{site.dart-site}}/tutorials/server/cmdline
[asset_transformers project in the Flutter samples repo]: {{site.repo.samples}}/tree/main/asset_transformation
[`vector_graphics_compiler`]: {{site.pub}}/packages/vector_graphics_compiler
[`vector_graphics`]: {{site.pub-pkg}}/vector_graphics
[`stderr`]: {{site.api}}/flutter/dart-io/Process/stderr.html
