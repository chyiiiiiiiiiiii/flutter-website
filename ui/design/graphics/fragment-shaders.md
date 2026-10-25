# 撰寫與使用片段著色器 (fragment shaders)

> 如何在 Flutter 應用程式中撰寫並使用片段著色器，打造自訂視覺效果。



:::note
Skia 與 [Impeller][] 兩種後端皆支援撰寫自訂著色器（custom shader）。
除非特別註明，否則以下說明皆適用於兩者。
:::

[Impeller]: /perf/impeller

自訂著色器（custom shaders）可用於提供超越 Flutter SDK 內建功能的豐富圖形效果。
著色器（shader）是一種以類 Dart 語言（GLSL）撰寫的小型程式，並於使用者的 GPU 上執行。

要將自訂著色器加入 Flutter 專案，需在 `pubspec.yaml` 檔案中列出，
並透過 [`FragmentProgram`][] API 取得。

[`FragmentProgram`]: https://api.flutter.dev/flutter/dart-ui/FragmentProgram-class.html

## 將著色器加入應用程式

著色器以副檔名為 `.frag` 的 GLSL 檔案形式存在，
必須在專案的 `pubspec.yaml` 檔案的 `shaders` 區段中宣告。
Flutter 命令列工具會將著色器編譯為對應後端格式，
並產生必要的執行時中繼資料。
編譯後的著色器會如同資源（assets）一樣被包含在應用程式中。

```yaml
flutter:
  shaders:
    - shaders/myshader.frag
```

當以偵錯模式（debug mode）執行時，
對著色器程式（shader program）的變更會觸發重新編譯，
並在熱重載（hot reload）或熱重啟（hot restart）期間即時更新著色器。

來自套件的著色器會被加入專案中，
其著色器程式名稱會加上 `packages/$pkgname` 前綴
（其中 `$pkgname` 為套件名稱）。

### 於執行階段載入著色器

若要在執行階段將著色器載入至 `FragmentProgram` 物件中，
請使用 [`FragmentProgram.fromAsset`][] 建構函式。
資源名稱與在 `pubspec.yaml` 檔案中指定的著色器路徑相同。

[`FragmentProgram.fromAsset`]: https://api.flutter.dev/flutter/dart-ui/FragmentProgram/fromAsset.html

```dart
void loadMyShader() async {
  var program = await FragmentProgram.fromAsset('shaders/myshader.frag');
}
```

`FragmentProgram` 物件可用來建立一個或多個 [`FragmentShader`][] 實例。
`FragmentShader` 物件代表一個片段程式（fragment program），
並包含一組特定的 _uniforms_（設定參數）。
可用的 uniforms 取決於該著色器（shader）的定義方式。

[`FragmentShader`]: https://api.flutter.dev/flutter/dart-ui/FragmentShader-class.html

```dart
void updateShader(Canvas canvas, Rect rect, FragmentProgram program) {
  var shader = program.fragmentShader();
  shader.setFloat(0, 42.0);
  canvas.drawRect(rect, Paint()..shader = shader);
}
```

### Canvas API

片段著色器（fragment shaders）可以搭配大多數 Canvas API 使用，只需設定 [`Paint.shader`][]。
例如，當使用 [`Canvas.drawRect`][] 時，該著色器會對矩形範圍內的所有片段進行運算。
對於像 [`Canvas.drawPath`][] 這類具有描邊路徑的 API，著色器則會對描邊線內的所有片段進行運算。
某些 API，例如 [`Canvas.drawImage`][]，則會忽略著色器的值。

[`Canvas.drawImage`]:  https://api.flutter.dev/flutter/dart-ui/Canvas/drawImage.html
[`Canvas.drawRect`]:   https://api.flutter.dev/flutter/dart-ui/Canvas/drawRect.html
[`Canvas.drawPath`]:   https://api.flutter.dev/flutter/dart-ui/Canvas/drawPath.html
[`Paint.shader`]:      https://api.flutter.dev/flutter/dart-ui/Paint/shader.html

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

片段著色器（fragment shaders）也可以與 [`ImageFilter`][] API 一起使用。
這讓你能夠將自訂片段著色器應用於 [`ImageFiltered`][] 類別或 [`BackdropFilter`][] 類別，
從而對已經渲染完成的內容套用著色器。
[`ImageFilter`][] 提供了一個建構函式 [`ImageFilter.shader`][]，
可用來建立帶有自訂片段著色器的 [`ImageFilter`][]。

:::warning
自訂著色器的 `ImageFilter` API 僅支援 [Impeller][] 後端。
在其他後端使用將會拋出錯誤。
:::

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

當你將 [`ImageFilter`][] 與 [`BackdropFilter`][] 搭配使用時，
可以利用 [`ClipRect`][] 來限制 [`ImageFilter`][] 所影響的區域。
如果沒有 [`ClipRect`][]，則 [`BackdropFilter`][] 會套用到整個螢幕。

`ImageFilter` 的片段著色器會自動從引擎接收一些 uniforms。
索引為 0 的 `sampler2D` 值會被設為過濾器的輸入圖片，
而索引為 0 和 1 的 `float` 值則分別設為該圖片的寬度與高度。
你的著色器必須在建構函式中明確宣告接受這些值（例如，一個 `sampler2D` 和一個 `vec2`），
但你不應該在 Dart 程式碼中自行設定這些值。

當目標為 OpenGLES 時，紋理的 y 座標會被翻轉，
因此著色器在對引擎提供的紋理進行取樣時，應先還原 UV 的翻轉。

```glsl
#version 460 core
#include <flutter/runtime_effect.glsl>

out vec4 fragColor;

// These uniforms are automatically set by the engine.
uniform vec2 u_size;
uniform sampler2D u_texture;

void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#ifdef IMPELLER_TARGET_OPENGLES
  // When sampling from u_texture on OpenGLES the y-coordinates will be flipped.
  uv.y = 1.0 - uv.y;
#endif
  vec4 color = texture(u_texture, uv);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  fragColor = vec4(vec3(gray), color.a);
}
```

[`ImageFilter`]: https://api.flutter.dev/flutter/dart-ui/ImageFilter-class.html
[`ImageFiltered`]: https://api.flutter.dev/flutter/widgets/ImageFiltered-class.html
[`BackdropFilter`]: https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html
[`ImageFilter.shader`]: https://api.flutter.dev/flutter/dart-ui/ImageFilter/ImageFilter.shader.html
[`ClipRect`]: https://api.flutter.dev/flutter/widgets/ClipRect-class.html

## 著色器撰寫

片段著色器 (fragment shaders) 需以 GLSL 原始檔案的形式撰寫。
依照慣例，這些檔案會使用 `.frag` 副檔名。
（Flutter 不支援頂點著色器，頂點著色器會使用 `.vert` 副檔名。）

支援的 GLSL 版本範圍從 460 到 100，
但部分功能會受到限制。
本文件其餘範例皆採用版本 `460 core`。

在 Flutter 中使用時，著色器會受到以下限制：

* 不支援 UBOs 與 SSBOs
* 僅支援 `sampler2D` 這種取樣器 (sampler) 型別
* 僅支援兩個參數版本的 `texture`（sampler 與 uv）
* 不可宣告額外的 varying 輸入
* 針對 Skia，所有精度提示都會被忽略
* 不支援無號整數與布林值

### Uniforms

你可以在 GLSL 著色器原始碼中定義 `uniform` 值，
並於 Dart 中為每個片段著色器 (fragment shader) 實例設定這些值，
以達到片段程式 (fragment program) 的參數化。

GLSL 浮點型 uniforms（設定參數），型別為 `float`、`vec2`、`vec3` 和 `vec4`，
可透過 [`FragmentShader.setFloat`][] 或
[`FragmentShader.getUniformFloat`][] 方法設定。
GLSL 取樣器值（使用 `sampler2D` 型別），
則可透過 [`FragmentShader.setImageSampler`][] 或
[`FragmentShader.getImageSampler`][] 方法設定。

每個 `uniform` 值的正確索引，會依照片段程式 (fragment program) 中 uniform 值的宣告順序決定。
若資料型別由多個浮點數組成，例如 `vec4`，
你必須為每個值各自呼叫一次 [`FragmentShader.setFloat`][]
或 [`UniformFloatSlot.set`][]。

[`FragmentShader.setFloat`]: https://api.flutter.dev/flutter/dart-ui/FragmentShader/setFloat.html
[`UniformFloatSlot.set`]: https://api.flutter.dev/flutter/dart-ui/UniformFloatSlot/set.html
[`FragmentShader.getUniformFloat`]: https://api.flutter.dev/flutter/dart-ui/FragmentShader/getUniformFloat.html
[`FragmentShader.setImageSampler`]: https://api.flutter.dev/flutter/dart-ui/FragmentShader/setImageSampler.html
[`FragmentShader.getImageSampler`]: https://api.flutter.dev/flutter/dart-ui/FragmentShader/getImageSampler.html

例如，假設在 GLSL 片段程式中有以下 uniforms（設定參數）宣告：

```glsl
uniform float uScale;
uniform sampler2D uTexture;
uniform vec2 uMagnitude;
uniform vec4 uColor;
```

對應的 Dart 程式碼用於初始化這些 `uniform` 值如下：

```dart
class Foobar {
  late final UniformFloatSlot _scale;
  late final List<UniformFloatSlot> _magnitude;
  late final List<UniformFloatSlot> _color;
  late final ImageSamplerSlot _texture;

  void setUp(FragmentShader shader) {
    _scale = shader.getUniformFloat('uScale');
    _magnitude = List<UniformFloatSlot>.generate(2, (int index) {
      return shader.getUniformFloat('uMagnitude', index);
    });    
    _color = List<UniformFloatSlot>.generate(4, (int index) {
      return shader.getUniformFloat('uColor', index);
    });
    _texture = shader.getImageSampler('uTexture');
  }

  void update(Color color, Image image) {
    _scale.set(23);
    _magnitude[0].set(114);
    _magnitude[1].set(83);
    _color[0].set(color.r * color.a);
    _color[1].set(color.g * color.a);
    _color[2].set(color.b * color.a);
    _color[3].set(color.a);
    _texture.set(image);
  }
}
 ```

使用 [`FragmentShader.setFloat`][] 時，請注意索引不包含 `sampler2D` uniform。
這個 uniform 會透過 [`FragmentShader.setImageSampler`][] 另外設定，
其索引會從 0 重新開始。

任何未初始化的 float uniforms（設定參數），預設值會是 `0.0`。

Flutter 著色器編譯器產生的反射資料 (reflection data) 可透過以下指令稽核，
以查看 uniform 偏移量等資訊。

```shell
cd $FLUTTER
# Generate the .sl file.
`find bin/ -name impellerc` \
  --runtime-stage-metal \
  --iplr \
  --input=path/to/myshader.frag \
  --sl=foo.sl \
  --spirv=foo.spirv \
  --include=engine/src/flutter/impeller/compiler/shader_lib/ \
  --input-type=frag
# Convert the .sl file to .json
flatc \
  --json \
  ./engine/src/flutter/impeller/runtime_stage/runtime_stage.fbs \
  -- ./foo.sl
# View results
cat foo.json
```

#### 目前位置

著色器可以存取一個 `varying` 值，該值包含了目前正在計算的片段（fragment）的區域座標。
你可以利用這個功能來計算依賴目前位置的效果，
方法是匯入 `flutter/runtime_effect.glsl` 函式庫，
並呼叫 `FlutterFragCoord` 函數來存取。例如：

```glsl
#include <flutter/runtime_effect.glsl>

void main() {
  vec2 currentPos = FlutterFragCoord().xy;
}
```

從 `FlutterFragCoord` 回傳的值與 `gl_FragCoord` 是不同的。
`gl_FragCoord` 提供的是螢幕空間座標，為了確保著色器（shaders）在不同後端之間的一致性，通常應避免使用。
當目標後端為 Skia 時，對 `gl_FragCoord` 的呼叫會被重寫為存取本地座標，
但這種重寫在 Impeller 上無法實現。

#### 顏色（Colors）

沒有內建的顏色資料型別。
通常會以 `vec4` 來表示顏色，每個分量分別對應 RGBA 的顏色通道。

唯一的輸出 `fragColor` 預期顏色值已正規化（normalized），
範圍在 `0.0` 到 `1.0` 之間，並且已經進行 alpha 預乘（premultiplied alpha）。
這與一般 Flutter 顏色使用 `0-255` 值編碼且未預乘 alpha 的方式不同。

#### 取樣器（Samplers）

取樣器（sampler）提供對 `dart:ui` `Image` 物件的存取。
這個圖片可以來自已解碼的圖片，或是應用程式的一部分，透過
[`Scene.toImageSync`][] 或 [`Picture.toImageSync`][] 取得。

[`Picture.toImageSync`]: https://api.flutter.dev/flutter/dart-ui/Picture/toImageSync.html
[`Scene.toImageSync`]: https://api.flutter.dev/flutter/dart-ui/Scene/toImageSync.html

##### GLSL 中取樣器用法範例

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

預設情況下，圖片會使用 [`TileMode.clamp`][] 來決定超出
`[0, 1]` 範圍之外的值應如何處理。
目前不支援自訂平鋪模式（tile mode），如需自訂，必須在著色器（shader）中自行模擬。

[`TileMode.clamp`]: https://api.flutter.dev/flutter/dart-ui/TileMode.html

##### `toImageSync` 範例

```dart
class SDFPainter {
  SDFPainter(this.sdfShader, this.renderShader);

  FragmentShader sdfShader;
  FragmentShader renderShader;
  Image? _sdf;
  bool isDirty = false;
  double radius = 0.5;

  void paint(Canvas canvas, Size size) {
    if (_sdf == null || isDirty) {
      final recorder = PictureRecorder();
      final subCanvas = Canvas(recorder);
      final paint = Paint()..shader = sdfShader;
      sdfShader.setFloat(0, size.width);
      sdfShader.setFloat(1, size.height);
      sdfShader.setFloat(2, radius);
      subCanvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), paint);
      final picture = recorder.endRecording();
      _sdf = picture.toImageSync(size.width.toInt(), size.height.toInt());
      isDirty = false;
    }

    renderShader.setFloat(0, size.width);
    renderShader.setFloat(1, size.height);
    renderShader.setImageSampler(0, _sdf!);

    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Paint()..shader = renderShader,
    );
  }
}
```

## 效能考量

當以 Skia 後端為目標時，
載入著色器（shader）可能會較為耗費資源，因為它
必須在執行階段編譯成對應平台的專屬著色器。
如果你打算在動畫（Animation）過程中使用一個或多個著色器，
建議在動畫開始前預先快取（precaching）片段程式（fragment program）物件。

你可以在多個畫面（frame）間重複使用同一個 `FragmentShader` 物件；
這比每個畫面都建立新的 `FragmentShader` 來得更有效率。

若需撰寫高效能著色器的詳細指南，
請參考 GitHub 上的 [Writing efficient shaders][]。

[Writing efficient shaders]: https://github.com/flutter/flutter/blob/main/docs/engine/impeller/docs/shader_optimization.md

## 其他資源

如需更多資訊，以下是一些資源：

* [The Book of Shaders][]，作者為 Patricio Gonzalez Vivo 與 Jen Lowe
* [Shader toy][]，一個協作式著色器遊樂場
* [`simple_shader`][]，一個簡單的 Flutter 片段著色器（fragment shaders）範例專案
* [`flutter_shaders`][]，一個簡化在 Flutter 中使用片段著色器的套件

[Shader toy]: https://www.shadertoy.com/
[The Book of Shaders]: https://thebookofshaders.com/
[`simple_shader`]: https://github.com/flutter/samples/tree/main/simple_shader
[`flutter_shaders`]: https://pub.dev/packages/flutter_shaders

