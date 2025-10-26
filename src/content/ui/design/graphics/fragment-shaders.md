---
title: 編寫與使用片段著色器
description: 如何撰寫並在 Flutter 應用程式中使用片段著色器，以創造自訂視覺效果。
shortTitle: 片段著色器
---

:::note
Skia 與 [Impeller][Impeller] 兩個後端皆支援撰寫
自訂著色器。除非特別註明，否則以下說明
皆適用於這兩者。
:::

[Impeller]: /perf/impeller

自訂著色器可用於提供比 Flutter SDK 更豐富的
圖形效果。著色器是一種以類 Dart 語言（稱為 GLSL）撰寫的程式，
並於使用者的 GPU 上執行。

自訂著色器可透過在 `pubspec.yaml` 檔案中列出，
並使用 [`FragmentProgram`][`FragmentProgram`] API 來取得，
加入至 Flutter 專案中。

[`FragmentProgram`]: {{site.api}}/flutter/dart-ui/FragmentProgram-class.html

## 將著色器加入應用程式

著色器以副檔名為 `.frag` 的 GLSL 檔案形式存在，
必須在專案的 `pubspec.yaml` 檔案中的 `shaders` 區段宣告。
Flutter 命令列工具會將著色器編譯為
相對應後端格式，
並產生必要的執行期中繼資料。
編譯後的著色器會如同資源 (Assets) 一樣被包含在應用程式中。

```yaml
flutter:
  shaders:
    - shaders/myshader.frag
```

當在除錯模式（debug mode）下執行時，
對著色器程式（shader program）的變更會觸發重新編譯，
並在熱重載（hot reload）或熱重啟（hot restart）時更新著色器。

從套件（package）引入的著色器會以`packages/$pkgname`作為著色器程式名稱的前綴，
其中`$pkgname`是該套件的名稱。

### 於執行時載入著色器

若要在執行時將著色器載入至`FragmentProgram`物件中，
請使用 [`FragmentProgram.fromAsset`][`FragmentProgram.fromAsset`] 建構函式（constructor）。
資源名稱與在`pubspec.yaml`檔案中指定的著色器路徑相同。

[`FragmentProgram.fromAsset`]: {{site.api}}/flutter/dart-ui/FragmentProgram/fromAsset.html

```dart
void loadMyShader() async {
  var program = await FragmentProgram.fromAsset('shaders/myshader.frag');
}
```

`FragmentProgram` 物件可用來建立一個或多個 [`FragmentShader`][`FragmentShader`] 實例。
`FragmentShader` 物件代表一個片段程式（fragment program），以及一組特定的 _uniforms_（設定參數）。
可用的 uniforms 取決於該著色器（shader）的定義方式。

[`FragmentShader`]: {{site.api}}/flutter/dart-ui/FragmentShader-class.html

```dart
void updateShader(Canvas canvas, Rect rect, FragmentProgram program) {
  var shader = program.fragmentShader();
  shader.setFloat(0, 42.0);
  canvas.drawRect(rect, Paint()..shader = shader);
}
```

### Canvas API

片段著色器（fragment shaders）可以搭配大多數 Canvas API 使用，
只需設定 [`Paint.shader`][`Paint.shader`]。
例如，當使用 [`Canvas.drawRect`][`Canvas.drawRect`] 時，
著色器會對矩形內的所有片段進行運算。
對於像 [`Canvas.drawPath`][`Canvas.drawPath`] 這類有描邊路徑（stroked path）的 API，
著色器則會對描邊線內的所有片段進行運算。
某些 API，例如 [`Canvas.drawImage`][`Canvas.drawImage`]，則會忽略著色器的值。

[`Canvas.drawImage`]:  {{site.api}}/flutter/dart-ui/Canvas/drawImage.html
[`Canvas.drawRect`]:   {{site.api}}/flutter/dart-ui/Canvas/drawRect.html
[`Canvas.drawPath`]:   {{site.api}}/flutter/dart-ui/Canvas/drawPath.html
[`Paint.shader`]:      {{site.api}}/flutter/dart-ui/Paint/shader.html

```dart
void paint(Canvas canvas, Size size, FragmentShader shader) {
  // Draws a rectangle with the shader used as a color source.
  canvas.drawRect(
    Rect.fromLTWH(0, 0, size.width, size.height),
    Paint()..shader = shader,
  );

  // Draws a stroked rectangle with the shader only applied to the fragments
  // that lie within the stroke.
  canvas.drawRect(
    Rect.fromLTWH(0, 0, size.width, size.height),
    Paint()
      ..style = PaintingStyle.stroke
      ..shader = shader,
  )
}

```

### ImageFilter API

片段著色器（fragment shaders）也可以與 [`ImageFilter`][`ImageFilter`] API 一起使用。  
這使你能夠將自訂片段著色器搭配 [`ImageFiltered`][`ImageFiltered`] 類別或 [`BackdropFilter`][`BackdropFilter`] 類別，將著色器應用於已經渲染完成的內容上。  
[`ImageFilter`][`ImageFilter`] 提供了一個建構函式 [`ImageFilter.shader`][`ImageFilter.shader`]，可用來建立帶有自訂片段著色器的 [`ImageFilter`][`ImageFilter`]。

使用 `ImageFilter` API 的片段著色器會自動從引擎接收一些數值。  
索引 0 處的 `sampler2D` 值會被設為過濾器的輸入影像，而索引 0 和 1 處的 `float` 值則分別設為影像的寬度與高度。  
你的著色器必須在建構函式中指定這些參數（例如，一個 `sampler2D` 和一個 `vec2`），但你不應該從 Dart 程式碼中自行設定這些值。

```dart
Widget build(BuildContext context, FragmentShader shader) {
  return ClipRect(
    child: SizedBox(
      width: 300,
      height: 300,
      child: BackdropFilter(
        filter: ImageFilter.shader(shader),
        child: Container(
          color: Colors.transparent,
        ),
      ),
    ),
  );
}
```

當你將 [`ImageFilter`][`ImageFilter`] 與 [`BackdropFilter`][`BackdropFilter`] 搭配使用時，可以使用 [`ClipRect`][`ClipRect`] 來限制 [`ImageFilter`][`ImageFilter`] 影響的區域。若沒有 [`ClipRect`][`ClipRect`]，則 [`BackdropFilter`][`BackdropFilter`] 會套用到整個螢幕。


[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`ImageFiltered`]: {{site.api}}/flutter/widgets/ImageFiltered-class.html
[`BackdropFilter`]: {{site.api}}/flutter/widgets/BackdropFilter-class.html
[`ImageFilter.shader`]: {{site.api}}/flutter/dart-ui/ImageFilter/ImageFilter.shader.html
[`ClipRect`]: {{site.api}}/flutter/widgets/ClipRect-class.html

## 編寫著色器

片段著色器（Fragment shaders）是以 GLSL 原始檔的形式編寫。按照慣例，這些檔案會使用 `.frag` 副檔名。（Flutter 不支援頂點著色器（vertex shaders），頂點著色器通常會使用 `.vert` 副檔名。）

任何從 460 到 100 的 GLSL 版本皆受支援，但部分功能會受到限制。本文件後續範例皆採用 `460 core` 版本。

在 Flutter 中使用著色器時，會受到以下限制：

* 不支援 UBOs 和 SSBOs
* 只支援 `sampler2D` 這一種取樣器（sampler）型別
* 僅支援兩個參數版本的 `texture`（sampler 與 uv）
* 不可宣告額外的 varying 輸入
* 針對 Skia 目標時，所有 precision hints 會被忽略
* 不支援無號整數與布林值

### Uniforms

你可以在 GLSL 著色器原始碼中定義 `uniform` 變數，並在 Dart 中為每個片段著色器實例設定這些值，藉此配置片段程式（fragment program）。

GLSL 浮點型 uniform 變數（型別為 `float`、`vec2`、`vec3`、`vec4`）可透過 [`FragmentShader.setFloat`][`FragmentShader.setFloat`] 方法設定。GLSL 取樣器（sampler）變數，型別為 `sampler2D`，則使用 [`FragmentShader.setImageSampler`][`FragmentShader.setImageSampler`] 方法設定。

每個 `uniform` 變數的正確索引，取決於它們在片段程式中宣告的順序。對於由多個浮點數組成的資料型別（例如 `vec4`），你必須對每個值分別呼叫一次 [`FragmentShader.setFloat`][`FragmentShader.setFloat`]。


[`FragmentShader.setFloat`]: {{site.api}}/flutter/dart-ui/FragmentShader/setFloat.html
[`FragmentShader.setImageSampler`]: {{site.api}}/flutter/dart-ui/FragmentShader/setImageSampler.html

例如，假設在 GLSL 片段程式中有以下 uniform 宣告：

```glsl
uniform float uScale;
uniform sampler2D uTexture;
uniform vec2 uMagnitude;
uniform vec4 uColor;
```

對應的 Dart 程式碼用於初始化這些 `uniform` 值如下所示：

```dart
void updateShader(FragmentShader shader, Color color, Image image) {
  shader.setFloat(0, 23);  // uScale
  shader.setFloat(1, 114); // uMagnitude x
  shader.setFloat(2, 83);  // uMagnitude y

  // Convert color to premultiplied opacity.
  shader.setFloat(3, color.red / 255 * color.opacity);   // uColor r
  shader.setFloat(4, color.green / 255 * color.opacity); // uColor g
  shader.setFloat(5, color.blue / 255 * color.opacity);  // uColor b
  shader.setFloat(6, color.opacity);                     // uColor a

  // Initialize sampler uniform.
  shader.setImageSampler(0, image);
 }
 ```

請注意，與 [`FragmentShader.setFloat`][`FragmentShader.setFloat`] 搭配使用的索引並不包含 `sampler2D` uniform。
這個 uniform 需要透過 [`FragmentShader.setImageSampler`][`FragmentShader.setImageSampler`] 另外設定，
其索引會從 0 重新開始計算。

任何未初始化的 float uniform，預設值將為 `0.0`。

#### 目前位置

著色器（shader）可以存取一個 `varying` 值，該值包含了當前被評估片段（fragment）的區域座標。你可以利用這個功能來計算依賴於目前位置的效果，這個位置可以透過匯入 `flutter/runtime_effect.glsl` 函式庫並呼叫 `FlutterFragCoord` 函式來取得。例如：

```glsl
#include <flutter/runtime_effect.glsl>

void main() {
  vec2 currentPos = FlutterFragCoord().xy;
}
```

從 `FlutterFragCoord` 回傳的值與 `gl_FragCoord` 是不同的。
`gl_FragCoord` 提供螢幕空間座標，通常應避免使用，以確保著色器在不同後端之間的一致性。
當目標為 Skia 後端時，
對 `gl_FragCoord` 的呼叫會被重寫為存取本地座標，
但這種重寫在 Impeller 上無法實現。

#### 顏色（Colors）

沒有內建的顏色資料型別。
通常會以 `vec4` 來表示顏色，
每個分量分別對應 RGBA 顏色通道。

單一輸出 `fragColor` 預期顏色值已正規化到 `0.0` 到 `1.0` 的範圍內，
且已進行預乘 alpha（premultiplied alpha）。
這與典型 Flutter 顏色不同，Flutter 顏色通常使用 `0-255` 值編碼，且為未預乘 alpha（unpremultiplied alpha）。

#### 取樣器（Samplers）

取樣器（sampler）用來存取 `dart:ui` `Image` 物件。
這個圖片可以從解碼後的圖片獲得，
或是透過應用程式的一部分，使用
[`Scene.toImageSync`][`Scene.toImageSync`] 或 [`Picture.toImageSync`][`Picture.toImageSync`] 取得。

[`Picture.toImageSync`]: {{site.api}}/flutter/dart-ui/Picture/toImageSync.html
[`Scene.toImageSync`]: {{site.api}}/flutter/dart-ui/Scene/toImageSync.html

```glsl
#include <flutter/runtime_effect.glsl>

uniform vec2 uSize;
uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  fragColor = texture(uTexture, uv);
}
```

預設情況下，圖片會使用
[`TileMode.clamp`][`TileMode.clamp`] 來決定超出
`[0, 1]` 範圍的值該如何處理。
目前不支援自訂平鋪模式（tile mode），如需自訂，需在 shader 中自行模擬實現。

[`TileMode.clamp`]: {{site.api}}/flutter/dart-ui/TileMode.html

### 效能考量

當目標後端為 Skia 時，
載入 shader 可能會較為耗費資源，因為它
必須在執行時編譯成對應平台的
專屬 shader。
如果你打算在動畫過程中使用一個或多個 shader，
建議在動畫開始前預先快取（precaching）fragment program 物件。

你可以在多個畫面間重複使用同一個 `FragmentShader` 物件；
這比每一幀都建立新的 `FragmentShader` 更有效率。

如需撰寫高效能 shader 的詳細指南，
請參考 GitHub 上的 [Writing efficient shaders][Writing efficient shaders]。

[Writing efficient shaders]: {{site.repo.flutter}}/blob/main/engine/src/flutter/impeller/docs/shader_optimization.md

### 其他資源

如需更多資訊，以下是一些資源：

* [The Book of Shaders][The Book of Shaders]，作者為 Patricio Gonzalez Vivo 與 Jen Lowe
* [Shader toy][Shader toy]，一個協作式的 shader 線上遊樂場
* [`simple_shader`][`simple_shader`]，一個簡單的 Flutter fragment shaders 範例專案
* [`flutter_shaders`][`flutter_shaders`]，一個簡化在 Flutter 中使用 fragment shaders 的套件

[Shader toy]: https://www.shadertoy.com/
[The Book of Shaders]: https://thebookofshaders.com/
[`simple_shader`]: {{site.repo.samples}}/tree/main/simple_shader
[`flutter_shaders`]: {{site.pub}}/packages/flutter_shaders
