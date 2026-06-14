# 建置時轉換資源

> 如何在 Flutter 應用程式中設定圖片（以及其他資源）的自動轉換。



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

透過這個設定，`assets/logo.svg` 會在複製到建置輸出時，由 [`vector_graphics_compiler`][] 套件進行轉換。這個套件會將 SVG 檔案預先編譯成最佳化的二進位檔案，這些檔案可以使用 [`vector_graphics`][] 套件來顯示，如下所示：

<?code-excerpt "ui/assets_and_images/lib/logo.dart (TransformedAsset)"?>
```dart
import 'package:vector_graphics/vector_graphics.dart';

const Widget logo = VectorGraphic(loader: AssetBytesLoader('assets/logo.svg'));
```

### 傳遞參數給資源轉換器

若要將一串參數傳遞給資源轉換器 (asset transformers)，
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

資源轉換器 (asset transformers) 可以串接使用，並且會按照宣告的順序依次套用。
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
轉換後的輸出會再由 `png_optimizer` 套件處理，然後才會被
打包進建置後的應用程式中。

## 撰寫資源轉換器套件

資源轉換器是一個 Dart [命令列應用程式 (command-line app)][command-line app]，會以
`dart run` 呼叫，並至少帶有兩個參數：`--input`，其內容為
要轉換的檔案路徑，以及 `--output`，即轉換器程式必須將輸出寫入的位置。

如果轉換器以非零的結束碼 (exit code) 結束，應用程式建置
將會失敗，並顯示錯誤訊息，說明資源轉換失敗。
轉換器寫入程序的 [`stderr`] 輸出流的任何內容，
都會包含在錯誤訊息中。

在執行轉換器時，`FLUTTER_BUILD_MODE`
環境變數會被設為所使用建置模式的 CLI 名稱。
例如，若你以 `flutter run -d macos --release` 執行應用程式，
則 `FLUTTER_BUILD_MODE` 會被設為 `release`。

## 範例

若要查看一個使用資源轉換 (asset transformation) 並包含自訂
Dart 套件作為轉換器的 Flutter 專案範例，請參考
[Flutter samples repo 中的 asset_transformers 專案][asset_transformers project in the Flutter samples repo]。

[command-line app]: https://dart.dev/tutorials/server/cmdline
[asset_transformers project in the Flutter samples repo]: https://github.com/flutter/samples/tree/main/asset_transformation
[`vector_graphics_compiler`]: https://pub.dev/packages/vector_graphics_compiler
[`vector_graphics`]: https://pub.dev/packages/vector_graphics
[`stderr`]: https://api.flutter.dev/flutter/dart-io/Process/stderr.html

