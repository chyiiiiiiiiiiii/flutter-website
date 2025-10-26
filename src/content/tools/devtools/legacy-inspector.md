---
title: 使用舊版 Flutter Inspector
description: 學習如何使用舊版 Flutter Inspector 來探索 Flutter 應用程式的元件樹（widget tree）。
---

<?code-excerpt path-base="visual_debugging/"?>

:::note
請注意，舊版 Inspector 將在未來的版本中移除。如果有任何問題導致你無法使用[新版 Inspector][new inspector]，請[回報問題][filing a bug]讓我們知道。
:::

[new inspector]: /tools/devtools/inspector
[filing a bug]: https://github.com/flutter/devtools/issues/new 

## 舊版 Flutter Inspector

![舊版 Flutter Inspector 視窗的截圖](/assets/images/docs/tools/devtools/inspector_legacy_screenshot.png){:width="100%"}

### 視覺化除錯版面配置問題

以下是 Inspector 工具列中可用功能的導覽說明。當空間有限時，會以圖示作為標籤的視覺化版本。

![選取元件模式圖示](/assets/images/docs/tools/devtools/select-widget-mode-icon.png){:width="20px"} **選取元件模式（Select widget mode）**
: 啟用此按鈕後，可以在裝置上選取一個元件（Widget）進行檢查。欲了解更多資訊，請參考[檢查元件](#檢查元件-inspecting-a-widget)。

![重新整理樹狀圖圖示](/assets/images/docs/tools/devtools/refresh-tree-icon.png){:width="20px"} **重新整理樹狀圖（Refresh tree）**
: 重新載入目前的元件資訊。

![慢速動畫圖示](/assets/images/docs/tools/devtools/slow-animations-icon.png){:width="20px"} **[慢速動畫][Slow animations]**
: 讓動畫以 5 倍慢速運行，方便微調動畫效果。

![顯示輔助線模式圖示](/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:width="20px"} **[顯示輔助線][Show guidelines]**
: 疊加輔助線，協助修正版面配置問題。

![顯示基線圖示](/assets/images/docs/tools/devtools/paint-baselines-icon.png){:width="20px"} **[顯示基線][Show baselines]**
: 顯示基線（baseline），用於對齊文字。可用來檢查文字是否正確對齊。

![高亮重繪圖示](/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:width="20px"} **[高亮重繪][Highlight repaints]**
: 顯示邊框，當元素重繪時會變色。可用於找出不必要的重繪。

![高亮過大圖片圖示](/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:width="20px"} **[高亮過大圖片][Highlight oversized images]**
: 反轉顏色並翻轉圖片，突顯佔用過多記憶體的圖片。

[Slow animations]: #慢速動畫-slow-animations
[Show guidelines]: #show-guidelines
[Show baselines]: #顯示基線-show-baselines
[Highlight repaints]: #highlight-repaints
[Highlight oversized images]: #標示過大的圖片

## 檢查元件（Inspecting a widget）

你可以瀏覽互動式元件樹（widget tree），以查看附近的元件及其欄位值。

若要在元件樹中定位特定的 UI 元素，請點選工具列中的 **選取元件模式（Select Widget Mode）** 按鈕。這會讓裝置上的應用程式進入「元件選取」模式。點擊應用程式 UI 中的任一元件，即可選取該元件，並自動將元件樹捲動到對應的節點。再次切換 **選取元件模式** 按鈕即可離開元件選取模式。

在除錯版面配置問題時，關鍵欄位為 `size` 和 `constraints` 欄位。限制（constraints）會由樹狀結構向下傳遞，尺寸（sizes）則會向上回傳。關於此運作方式的詳細資訊，請參考[理解 constraints][Understanding constraints]。

## Flutter Layout Explorer

Flutter Layout Explorer 可協助你更深入了解 Flutter 的版面配置。

如需此工具的功能總覽，請參考 Flutter Explorer 影片：

{% ytEmbed 'Jakrc3Tn_y4', 'DevTools Layout Explorer' %}

你也可以參考以下的逐步教學文章：

* [如何使用 Flutter Inspector 除錯版面配置問題][debug-article]

[debug-article]: {{site.flutter-medium}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db

### 使用 Layout Explorer

在 Flutter Inspector 中，選取一個元件。Layout Explorer 支援 [flex 版面配置][flex layouts]與固定尺寸（fixed size）版面配置，並針對這兩種類型提供專屬工具。

#### Flex 版面配置

當你選取一個 flex 元件（例如 [`Row`][`Row`]、[`Column`][`Column`]、[`Flex`][`Flex`]）或其直接子元件時，flex 版面配置工具會出現在 Layout Explorer 中。

Layout Explorer 會視覺化 [`Flex`][`Flex`] 元件及其子元件的版面配置情況。Explorer 會標示主軸（main axis）與交叉軸（cross axis），以及目前每個軸的對齊方式（例如 start、end、spaceBetween）。同時也會顯示如 flex factor、flex fit 及版面配置限制等詳細資訊。

此外，Explorer 會顯示版面配置限制違規（constraint violations）及渲染溢位（render overflow）錯誤。違反的版面限制會以紅色標示，溢位錯誤則以標準的「黃色膠帶」圖樣顯示，就像你在實際裝置上看到的一樣。這些視覺化設計旨在幫助你理解溢位錯誤發生的原因，以及如何修正。

![Layout Explorer 顯示錯誤與裝置 Inspector](/assets/images/docs/tools/devtools/layout_explorer_errors_and_device.webp){:width="100%"}

在 Layout Explorer 中點擊元件，會同步選取裝置上的 Inspector。此功能需啟用 **選取元件模式（Select Widget Mode）**。啟用方式是在 Inspector 中點擊 **選取元件模式** 按鈕。

![Inspector 中的選取元件模式按鈕](/assets/images/docs/tools/devtools/select-widget-mode-button.png)

對於某些屬性，例如 flex factor、flex fit 及對齊方式，你可以透過 Explorer 中的下拉選單修改其值。當你修改元件屬性時，不僅會即時反映在 Layout Explorer，也會顯示在執行中的 Flutter 應用程式裝置上。Explorer 會針對屬性變更進行動畫顯示，讓你清楚看到變更效果。透過 Layout Explorer 修改元件屬性不會影響你的原始程式碼，且在 hot reload 時會還原。

##### 互動式屬性（Interactive Properties）

Layout Explorer 支援修改 [`mainAxisAlignment`][`mainAxisAlignment`]、[`crossAxisAlignment`][`crossAxisAlignment`] 及 [`FlexParentData.flex`][`FlexParentData.flex`]。
未來我們可能會加入更多屬性的支援，例如 [`mainAxisSize`][`mainAxisSize`]、[`textDirection`][`textDirection`] 及 [`FlexParentData.fit`][`FlexParentData.fit`]。

###### mainAxisAlignment

![Layout Explorer 調整主軸對齊方式](/assets/images/docs/tools/devtools/layout_explorer_main_axis_alignment.webp){:width="100%"}

支援的值：

* `MainAxisAlignment.start`
* `MainAxisAlignment.end`
* `MainAxisAlignment.center`
* `MainAxisAlignment.spaceBetween`
* `MainAxisAlignment.spaceAround`
* `MainAxisAlignment.spaceEvenly`

###### crossAxisAlignment

![Layout Explorer 調整交叉軸對齊方式](/assets/images/docs/tools/devtools/layout_explorer_cross_axis_alignment.webp){:width="100%"}

支援的值：

* `CrossAxisAlignment.start`
* `CrossAxisAlignment.center`
* `CrossAxisAlignment.end`
* `CrossAxisAlignment.stretch`

###### FlexParentData.flex

![Layout Explorer 調整 flex factor](/assets/images/docs/tools/devtools/layout_explorer_flex.webp){:width="100%"}

Layout Explorer 在 UI 中支援 7 種 flex 選項（null、0、1、2、3、4、5），但技術上 flex 元件子項目的 flex factor 可以是任意整數。

###### Flexible.fit

![Layout Explorer 調整 fit](/assets/images/docs/tools/devtools/layout_explorer_fit.webp){:width="100%"}

Layout Explorer 支援兩種不同型態的 [`FlexFit`][`FlexFit`]：`loose` 與 `tight`。

#### 固定尺寸版面配置（Fixed size layouts）

當你選取一個不是 flex 元件子項的固定尺寸元件時，固定尺寸版面配置資訊會顯示在 Layout Explorer 中。你可以查看所選元件及其最近的上游 RenderObject 的尺寸、限制與 padding 資訊。

![Layout Explorer 固定尺寸工具](/assets/images/docs/tools/devtools/layout_explorer_fixed_layout.png){:width="100%"}

## 視覺化除錯（Visual debugging）

Flutter Inspector 提供多種選項，協助你以視覺化方式除錯應用程式。

![Inspector 視覺化除錯選項](/assets/images/docs/tools/devtools/visual_debugging_options.png){:width="100%"}

### 慢速動畫（Slow animations）

啟用此選項時，動畫會以 5 倍慢速運行，方便你進行視覺檢查。
如果你想仔細觀察並調整動畫效果，這會非常有用。

你也可以在程式碼中設定此功能：

<?code-excerpt "lib/slow_animations.dart"?>
```dart
import 'package:flutter/scheduler.dart';

void setSlowAnimations() {
  timeDilation = 5.0;
}
```

這會將動畫（Animation）速度減慢 5 倍。

#### 另請參閱

以下連結提供更多相關資訊。

* [Flutter 文件：timeDilation 屬性]({{site.api}}/flutter/scheduler/timeDilation.html)

以下螢幕錄影分別展示了動畫減速前後的效果。

![螢幕錄影：正常動畫速度](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-disabled.webp)
![螢幕錄影：動畫速度減慢](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-enabled.webp)

### 顯示輔助線（Show guidelines）

此功能會在您的應用程式上繪製輔助線，顯示 render boxes、對齊（alignments）、間距（paddings）、滾動視圖（scroll views）、裁剪（clippings）以及間隔元件（spacers）。

這個工具有助於更好地理解您的版面配置，例如找出不需要的間距，或了解元件（Widget）對齊方式。

您也可以在程式碼中啟用此功能：

<?code-excerpt "lib/layout_guidelines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showLayoutGuidelines() {
  debugPaintSizeEnabled = true;
}
```

#### Render boxes

會繪製到螢幕上的元件（Widgets）會建立一個 [render box][render box]，這是 Flutter 版面配置的基礎組件。這些 render box 會以亮藍色邊框顯示：

![Screenshot of render box guidelines](/assets/images/docs/tools/devtools/debug-toggle-guideline-render-box.png)

#### 對齊（Alignments）

對齊會以黃色箭頭顯示。這些箭頭表示元件相對於其父元件的垂直與水平偏移。例如，下方這個按鈕的圖示，透過四個箭頭顯示其已置中：

![Screenshot of alignment guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-alignment.png)

#### Padding（內距）

Padding（內距）會以半透明藍色背景顯示：

![Screenshot of padding guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-padding.png)

#### Scroll views（可滾動視圖）

具有可滾動內容的元件（如 ListView）會以綠色箭頭顯示：

![Screenshot of scroll view guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-scroll.png)

#### Clipping（裁剪）

裁剪，例如使用 [ClipRect widget][ClipRect widget] 時，會以帶有剪刀圖示的粉紅色虛線顯示：

[ClipRect widget]: {{site.api}}/flutter/widgets/ClipRect-class.html

![Screenshot of clip guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-clip.png)

#### Spacers（間距元件）

Spacer 元件會以灰色背景顯示，例如這個沒有子元件的 `SizedBox`：

![Screenshot of spacer guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-spacer.png)

### 顯示基線（Show baselines）

此選項會讓所有基線（baseline）可見。基線是用來定位文字的水平線。

這對於檢查文字是否垂直精確對齊很有幫助。例如，下方螢幕截圖中的文字基線就有些微不對齊：

![Screenshot with show baselines enabled](/assets/images/docs/tools/devtools/debug-toggle-guidelines-baseline.png)

你可以使用 [Baseline][Baseline] 元件來調整基線。

[Baseline]: {{site.api}}/flutter/widgets/Baseline-class.html

只要 [render box][render box] 設定了基線，就會繪製一條線；字母基線會以綠色顯示，表意文字基線則以黃色顯示。

你也可以在程式碼中啟用這個功能：

<?code-excerpt "lib/show_baselines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showBaselines() {
  debugPaintBaselinesEnabled = true;
}
```

### 高亮顯示重繪區域

此選項會在所有 [render boxes][render boxes] 周圍繪製一個邊框，並且每當該區塊重繪時，邊框顏色就會改變。  

[render boxes]: {{site.api}}/flutter/rendering/RenderBox-class.html

這種旋轉變換的彩虹色效果，有助於找出應用程式中過於頻繁重繪、可能影響效能的部分。

舉例來說，一個小型動畫 (Animation) 可能會導致整個頁面在每一幀都重繪。  
將動畫包裹在 [RepaintBoundary widget][RepaintBoundary widget] 中，可以將重繪範圍限制在動畫本身。  

[RepaintBoundary widget]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html

以下範例中，進度指示器會導致其容器 (Container) 一起重繪：

<?code-excerpt "lib/highlight_repaints.dart (everything-repaints)"?>
```dart
class EverythingRepaintsPage extends StatelessWidget {
  const EverythingRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(child: CircularProgressIndicator()),
    );
  }
}
```

![Screen recording of a whole screen repainting](/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-1.webp)

將進度指示器包裹在`RepaintBoundary`中，只會讓螢幕的該區塊進行重繪：

<?code-excerpt "lib/highlight_repaints.dart (area-repaints)"?>
```dart
class AreaRepaintsPage extends StatelessWidget {
  const AreaRepaintsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repaint Example')),
      body: const Center(
        child: RepaintBoundary(child: CircularProgressIndicator()),
      ),
    );
  }
}
```

![Screen recording of a just a progress indicator repainting](/assets/images/docs/tools/devtools/debug-toggle-guidelines-repaint-2.webp)

`RepaintBoundary` 元件（Widgets）有其取捨。它們有助於提升效能，
但同時也會產生建立新 canvas 的額外負擔，
這會佔用更多記憶體。

你也可以在程式碼中啟用這個選項：

<?code-excerpt "lib/highlight_repaints.dart (toggle)"?>
```dart
import 'package:flutter/rendering.dart';

void highlightRepaints() {
  debugRepaintRainbowEnabled = true;
}
```

### 標示過大的圖片

此選項會將過大的圖片以反轉顏色並垂直翻轉的方式加以標示：

![A highlighted oversized image](/assets/images/docs/tools/devtools/debug-toggle-guidelines-oversized.png)

被標示的圖片會佔用比實際需求更多的記憶體；
例如，一張 5MB 的大型圖片僅以 100 x 100 像素顯示。

這類圖片可能導致效能不佳，特別是在低階裝置上，
以及當你有大量圖片（如列表檢視）時，
效能損失會累積。
每張圖片的相關資訊會輸出至偵錯主控台：

```console
dash.png has a display size of 213×392 but a decode size of 2130×392, which uses an additional 2542KB.
```

若圖片資源檔案比實際需求多使用了至少 128KB，則會被視為過大。

#### 修正圖片

在可能的情況下，最佳的解決方式是將圖片資源檔案重新調整大小，使其變得更小。

如果無法這麼做，你可以在 `Image` 建構函式（constructor）上使用 `cacheHeight` 和 `cacheWidth` 參數：

<?code-excerpt "lib/oversized_images.dart (resized-image)"?>
```dart
class ResizedImage extends StatelessWidget {
  const ResizedImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset('dash.png', cacheHeight: 213, cacheWidth: 392);
  }
}
```

這會讓引擎以指定的尺寸解碼此圖片，並降低記憶體使用量（解碼與儲存的成本仍然高於直接縮小圖片資源本身）。不論這些參數如何，圖片都會根據版面配置或寬高的限制進行渲染。

此屬性也可以在程式碼中設定：

<?code-excerpt "lib/oversized_images.dart (toggle)"?>
```dart
void showOversizedImages() {
  debugInvertOversizedImages = true;
}
```

#### 更多資訊

你可以在以下連結了解更多：

* [Flutter 文件：debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

[render box]: {{site.api}}/flutter/rendering/RenderBox-class.html

## 詳細樹（Details Tree）

選擇 **Widget Details Tree** 分頁，可以顯示所選元件（Widget）的詳細樹。你可以在這裡取得元件的屬性、渲染物件（render object）以及子元件（children）的相關資訊。

![詳細樹檢視畫面](/assets/images/docs/tools/devtools/inspector_details_tree.png){:width="100%"}

## 追蹤元件建立（Track widget creation）

Flutter Inspector 的部分功能是透過儀器化（instrumenting）應用程式程式碼，以更好地理解元件（Widget）建立的原始位置。這種原始碼儀器化讓 Flutter Inspector 能以接近你原始程式碼定義 UI 的方式來呈現元件樹。如果沒有這項功能，元件樹中的節點會更深層，且較難理解執行時的元件階層與你的應用程式 UI 之間的對應關係。

你可以在 `flutter run` 命令中傳入 `--no-track-widget-creation` 來停用此功能。

以下是啟用與未啟用追蹤元件建立功能時，元件樹可能的呈現範例。

啟用追蹤元件建立（預設）：

![啟用追蹤元件建立時的元件樹](/assets/images/docs/tools/devtools/track_widget_creation_enabled.png){:width="100%"}

停用追蹤元件建立（不建議）：

![停用追蹤元件建立時的元件樹](/assets/images/docs/tools/devtools/track_widget_creation_disabled.png){:width="100%"}

此功能會讓在 debug 建置中，原本相同的 `const` 元件（Widgets）不被視為相等。更多細節請參考 [除錯時常見問題討論][common problems when debugging]。

## Inspector 設定

![Flutter Inspector 設定對話框](/assets/images/docs/tools/devtools/flutter-inspector-settings.png){:width="100%"}

### 啟用滑鼠懸停檢查（Enable hover inspection）

將滑鼠懸停在任一元件（Widget）上時，會顯示其屬性與數值。

切換此選項可啟用或停用滑鼠懸停檢查功能。

### 套件目錄（Package directories）

預設情況下，DevTools 只會在元件樹中顯示來自專案根目錄以及 Flutter 的元件。這個過濾僅適用於 Inspector Widget Tree（Inspector 左側的元件樹），不適用於 Widget Details Tree（Inspector 右側，與 Layout Explorer 同分頁的詳細樹）。在 Widget Details Tree 中，你可以看到樹中所有套件的所有元件。

若要顯示其他元件，必須將其父目錄加入至 Package Directories。

例如，請參考以下目錄結構：

```plaintext
project_foo
  pkgs
    project_foo_app
    widgets_A
    widgets_B
```

從 `project_foo_app` 執行你的應用程式時，元件檢查器樹（widget inspector tree）中只會顯示來自 `project_foo/pkgs/project_foo_app` 的元件（Widgets）。

若要在元件樹中顯示來自 `widgets_A` 的元件，請將 `project_foo/pkgs/widgets_A` 加入套件目錄（package directories）。

若要在元件樹中從你的專案根目錄顯示「所有」元件，請將 `project_foo` 加入套件目錄。

對套件目錄的變更會在下次為該應用程式開啟元件檢查器時持續生效。

## 其他資源

若想了解元件檢查器（inspector）的一般功能展示，請參考 [DartConf 2018 talk][DartConf 2018 talk]，該影片展示了 Flutter inspector 的 IntelliJ 版本。

若想學習如何使用 DevTools 以視覺化方式偵錯版面配置問題，請參考導覽式的
[Flutter Inspector 教學][inspector-tutorial]。

[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[common problems when debugging]: /testing/debugging
[`crossAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/crossAxisAlignment.html
[DartConf 2018 talk]: {{site.yt.watch}}?v=JIcmJNT9DNI
[debug mode]: /testing/build-modes#debug
[`Flex`]: {{site.api}}/flutter/widgets/Flex-class.html
[flex layouts]: {{site.api}}/flutter/widgets/Flex-class.html
[`FlexFit`]: {{site.api}}/flutter/rendering/FlexFit.html
[`FlexParentData.fit`]: {{site.api}}/flutter/rendering/FlexParentData/fit.html
[`FlexParentData.flex`]: {{site.api}}/flutter/rendering/FlexParentData/flex.html
[`mainAxisAlignment`]: {{site.api}}/flutter/widgets/Flex/mainAxisAlignment.html
[`mainAxisSize`]: {{site.api}}/flutter/widgets/Flex/mainAxisSize.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`textDirection`]: {{site.api}}/flutter/widgets/Flex/textDirection.html
[Understanding constraints]: /ui/layout/constraints
[inspector-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-flutter-inspector-part-2-of-8-bbff40692fc7
