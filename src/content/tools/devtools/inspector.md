---
title: 使用 Flutter 檢查器
description: 學習如何使用 Flutter 檢查器來探索 Flutter 應用程式的元件樹（Widget Tree）。
---

<?code-excerpt path-base="visual_debugging/"?>

:::note
檢查器適用於所有 Flutter 應用程式。
:::

若要了解如何在不同的 IDE 中找到 DevTools 螢幕，請參閱 [DevTools overview](/tools/devtools)。

## 什麼是 Flutter 檢查器？

Flutter 元件檢查器（widget inspector）是一個強大的工具，可用於視覺化和探索 Flutter 元件樹（Widget Tree）。Flutter 框架以元件（Widget）作為所有內容的核心建構區塊，無論是控制項（如文字、按鈕、切換開關），還是版面配置（如置中、內距、行與列）。檢查器可協助你視覺化並探索 Flutter 元件樹，並可用於以下用途：

* 理解現有的版面配置
* 診斷版面配置問題

![Flutter 檢查器視窗截圖](/assets/images/docs/tools/devtools/inspector_screenshot.png){:width="100%"}

## 全新 Flutter 檢查器 {:#new}

自 Flutter 3.29 起，新的 Flutter 檢查器預設啟用。不過，你可以在 [檢查器設定對話框][inspector settings dialog] 中將其關閉。

[inspector settings dialog]: #inspector-設定
[legacy inspector]: /tools/devtools/legacy-inspector
[filing a bug]: https://github.com/flutter/devtools/issues/new 

### 視覺化偵錯版面配置問題

以下是檢查器工具列可用功能的導覽。當空間有限時，會以圖示代替標籤。

![選取元件模式按鈕](/assets/images/docs/tools/devtools/select-widget-mode-button.png)
**選取元件模式（Select widget mode）**
: 啟用此按鈕後，可以在裝置上選取一個元件以檢查其資訊。欲了解更多，請參閱[檢查元件](#檢查元件)。

![顯示實作元件按鈕](/assets/images/docs/tools/devtools/show-implementation-widgets-button.png)
**顯示實作元件（Show implementation widgets）**
: 啟用此按鈕可在元件樹中顯示實作元件。欲了解更多，請參閱[使用元件樹](#使用元件樹)。

![重新整理樹狀圖圖示](/assets/images/docs/tools/devtools/refresh-tree-icon.png){:.theme-icon width="20px"} **重新整理樹狀圖（Refresh tree）**
: 重新載入目前的元件資訊。

![慢速動畫圖示](/assets/images/docs/tools/devtools/slow-animations-icon.png){:.theme-icon width="20px"} **[慢速動畫（Slow animations）][Slow animations]**
: 讓動畫以 5 倍慢速執行，方便微調動畫效果。

![顯示輔助線模式圖示](/assets/images/docs/tools/devtools/debug-paint-mode-icon.png){:.theme-icon width="20px"} **[顯示輔助線（Show guidelines）][Show guidelines]**
: 疊加輔助線，協助修正版面配置問題。

![顯示基線圖示](/assets/images/docs/tools/devtools/paint-baselines-icon.png){:.theme-icon width="20px"} **[顯示基線（Show baselines）][Show baselines]**
: 顯示基線（用於對齊文字）。可用來檢查文字是否對齊。

![高亮重繪區域圖示](/assets/images/docs/tools/devtools/repaint-rainbow-icon.png){:.theme-icon width="20px"} **[高亮重繪區域（Highlight repaints）][Highlight repaints]**
: 顯示元素重繪時會變色的邊框，有助於找出不必要的重繪。

![高亮過大圖片圖示](/assets/images/docs/tools/devtools/invert_oversized_images_icon.png){:.theme-icon width="20px"} **[高亮過大圖片（Highlight oversized images）][Highlight oversized images]**
: 反轉顏色並翻轉圖片，以標示佔用過多記憶體的圖片。

[Slow animations]: #慢速動畫
[Show guidelines]: #show-guidelines
[Show baselines]: #顯示基線-show-baselines
[Highlight repaints]: #highlight-repaints
[Highlight oversized images]: #標示過大圖片

## 檢查元件

你可以瀏覽互動式元件樹，查看鄰近元件及其欄位值。

若要在元件樹中定位單一 UI 元素，請點選工具列上的 **選取元件模式（Select Widget Mode）** 按鈕。這會讓裝置上的應用程式進入「元件選取」模式。點擊應用程式 UI 中的任一元件，即可選取該元件，並將元件樹自動捲動至對應節點。再次切換 **選取元件模式** 按鈕即可離開元件選取模式。

在偵錯版面配置問題時，關鍵欄位為 `size` 和 `constraints`。constraints（約束）會自上而下傳遞，size（尺寸）則自下而上回傳。欲了解詳細運作方式，請參閱[理解 constraints][Understanding constraints]。

## Flutter 元件樹（Widget Tree）

Flutter 元件樹可協助你視覺化、理解並瀏覽應用程式的元件樹。

![Flutter 檢查器中高亮顯示元件樹的畫面](/assets/images/docs/tools/devtools/inspector-widget-tree.png){:width="100%"}

### 使用元件樹

#### 檢視專案中建立的元件

預設情況下，Flutter 元件樹會包含你根目錄專案中建立的所有元件。

元件之間的父子關係，若父元件僅有一個子元件，則以單一垂直線表示；若有多個子元件，則以縮排方式表示。

舉例來說，以下是一段元件樹的示意：

![元件樹部分截圖](/assets/images/docs/tools/devtools/widget-tree.png){:width="100%"}

* `Padding` 有一個子元件 `Row`
* `Row` 有三個子元件：`Icon`、`SizedBox` 和 `Flexible`
* `Flexible` 有一個子元件 `Column`
* `Column` 有四個子元件：`Text`、`Text`、`SizedBox` 和 `Divider`

#### 檢視所有元件

若要查看元件樹中的所有元件（包含專案外部建立的元件），請開啟「顯示實作元件（Show implementation widgets）」。

實作元件會以較淺的字體顯示，以便與專案中建立的元件做出視覺區分。這些元件也會被收納在可展開的群組中，可透過內嵌展開按鈕展開。

例如，下圖為同一段元件樹，並已顯示實作元件：

![顯示實作元件的元件樹截圖](/assets/images/docs/tools/devtools/widget-tree-with-implementation-widgets.png){:width="100%"}

* `Icon` 下方收合了五個實作元件
* 兩個 `Text` 元件皆有 `RichText` 實作元件子項
* `Divider` 下方收合了九個實作元件

## Flutter 元件總覽（Widget Explorer）

Flutter 元件總覽（Widget Explorer）可協助你更深入理解被檢查的元件。

![Flutter 檢查器中高亮顯示元件總覽的畫面](/assets/images/docs/tools/devtools/inspector-widget-explorer.png){:width="100%"}

### 使用元件總覽

在 Flutter 檢查器中選取一個元件後，元件總覽會顯示於視窗右側。

根據所選元件的不同，元件總覽會包含下列一個或多個分頁：

* 元件屬性分頁（Widget properties tab）
* Flex 探索器分頁（Flex explorer tab）
* Render object 分頁（Render object tab）

#### 元件屬性分頁

![元件屬性分頁畫面](/assets/images/docs/tools/devtools/widget-properties-tab.png){:width="100%"}

屬性分頁會顯示該元件的版面配置迷你視圖，包括寬度、高度與內距，以及該元件的屬性清單。

這些屬性會標示其值是否與屬性參數的預設值相符。

#### Render object 分頁

![Render object 分頁畫面](/assets/images/docs/tools/devtools/render-object-tab.png){:width="100%"}

Render object 分頁會顯示所選 Flutter 元件 render object 上設定的所有屬性。

#### Flex 探索器分頁

![Flex 探索器分頁畫面](/assets/images/docs/tools/devtools/flex-explorer-tab.png){:width="100%"}

當你選取一個 flex 元件（例如 [`Row`][`Row`]、[`Column`][`Column`]、[`Flex`][`Flex`]）或其直接子元件時，Flex 探索器工具會出現在元件總覽中。

Flex 探索器工具會視覺化 [`Flex`][`Flex`] 元件及其子元件的版面配置。此工具會標示主軸（main axis）與交叉軸（cross axis），以及目前的對齊方式（例如 start、end、spaceBetween）。同時也會顯示如 flex factor、flex fit 與版面配置約束等詳細資訊。

此外，該工具會顯示版面配置約束違反和 render overflow 錯誤。違反的版面配置約束會以紅色標示，overflow 錯誤則以標準「黃色膠帶」圖案顯示，與實際裝置運行時看到的效果一致。這些視覺化旨在幫助你理解 overflow 錯誤發生的原因及其修正方式。

![Flex 探索器顯示錯誤與裝置檢查器](/assets/images/docs/tools/devtools/layout_explorer_errors_and_device.webp){:width="100%"}

在 Flex 探索器中點擊元件，會同步選取裝置上的檢查器。此功能需啟用 **選取元件模式（Select Widget Mode）**。啟用方式為點擊檢查器中的 **選取元件模式** 按鈕。

![檢查器中的選取元件模式按鈕](/assets/images/docs/tools/devtools/select-widget-mode-button.png)

對於某些屬性（如 flex factor、flex fit、alignment），你可以直接在探索器中透過下拉選單修改其值。當你修改元件屬性時，變更會即時反映在 Flex 探索器與執行中的 Flutter 應用程式裝置上。屬性變更時會有動畫效果，讓你清楚看到變化。透過版面配置探索器修改的元件屬性不會影響你的原始碼，且在 hot reload 時會還原。

##### 互動式屬性

Flex 探索器目前支援修改 [`mainAxisAlignment`][`mainAxisAlignment`]、[`crossAxisAlignment`][`crossAxisAlignment`] 和 [`FlexParentData.flex`][`FlexParentData.flex`]。未來可能會支援更多屬性，例如 [`mainAxisSize`][`mainAxisSize`]、[`textDirection`][`textDirection`] 和 [`FlexParentData.fit`][`FlexParentData.fit`]。

###### mainAxisAlignment

![Flex 探索器變更主軸對齊方式](/assets/images/docs/tools/devtools/layout_explorer_main_axis_alignment.webp){:width="100%"}

支援的值：

- `MainAxisAlignment.start`
- `MainAxisAlignment.end`
- `MainAxisAlignment.center`
- `MainAxisAlignment.spaceBetween`
- `MainAxisAlignment.spaceAround`
- `MainAxisAlignment.spaceEvenly`

###### crossAxisAlignment

![Flex 探索器變更交叉軸對齊方式](/assets/images/docs/tools/devtools/layout_explorer_cross_axis_alignment.webp){:width="100%"}

支援的值：

- `CrossAxisAlignment.start`
- `CrossAxisAlignment.center`
- `CrossAxisAlignment.end`
- `CrossAxisAlignment.stretch`

###### FlexParentData.flex

![Flex 探索器變更 flex factor](/assets/images/docs/tools/devtools/layout_explorer_flex.webp){:width="100%"}

Flex 探索器在 UI 上支援 7 種 flex 選項（null、0、1、2、3、4、5），但實際上 flex 元件子項的 flex factor 可以是任意整數。

###### Flexible.fit

![Flex 探索器變更 fit](/assets/images/docs/tools/devtools/layout_explorer_fit.webp){:width="100%"}

Flex 探索器支援兩種不同型態的 [`FlexFit`][`FlexFit`]：`loose` 和 `tight`。

## 視覺化偵錯

Flutter Inspector 提供多種選項，協助你以視覺化方式偵錯應用程式。

![Inspector 視覺化偵錯選項](/assets/images/docs/tools/devtools/visual_debugging_options.png){:width="100%"}

### 慢速動畫

啟用此選項時，動畫會以 5 倍慢速執行，方便你進行視覺檢查。
這對於需要仔細觀察或微調動畫效果時特別有用。

你也可以在程式碼中設定：

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

以下螢幕錄影展示了減慢動畫前後的效果。

![螢幕錄影：正常動畫速度](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-disabled.webp)
![螢幕錄影：減慢後的動畫速度](/assets/images/docs/tools/devtools/debug-toggle-slow-animations-enabled.webp)

### 顯示輔助線（Show guidelines）

此功能會在您的應用程式上繪製輔助線，顯示 render boxes、對齊（alignments）、內距（paddings）、滾動檢視（scroll views）、裁剪（clippings）以及間隔元件（spacers）。

這個工具可用於更好地理解您的版面配置。例如，可以用來找出不需要的內距，或了解元件（Widget）對齊方式。

您也可以在程式碼中啟用此功能：

<?code-excerpt "lib/layout_guidelines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showLayoutGuidelines() {
  debugPaintSizeEnabled = true;
}
```

#### Render boxes

會在螢幕上繪製內容的元件（Widgets）會建立一個 [render box][render box]，這是 Flutter 版面配置的基礎組件。這些 render box 會以亮藍色邊框顯示：

![Screenshot of render box guidelines](/assets/images/docs/tools/devtools/debug-toggle-guideline-render-box.png)

#### 對齊（Alignments）

對齊會以黃色箭頭顯示。這些箭頭表示元件相對於其父元件的垂直與水平偏移。例如，這個按鈕的圖示透過四個箭頭顯示為置中對齊：

![Screenshot of alignment guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-alignment.png)

#### Padding（內距）

Padding（內距）會以半透明的藍色背景顯示：

![Screenshot of padding guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-padding.png)

#### Scroll views（可捲動視圖）

具有可捲動內容的元件（如 list views）會以綠色箭頭顯示：

![Screenshot of scroll view guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-scroll.png)

#### Clipping（裁剪）

裁剪，例如使用 [ClipRect widget][ClipRect widget] 時，會以帶有剪刀圖示的粉紅色虛線顯示：

[ClipRect widget]: {{site.api}}/flutter/widgets/ClipRect-class.html

![Screenshot of clip guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-clip.png)

#### Spacers（間距元件）

Spacer 元件會以灰色背景顯示，例如這個沒有子元件的 `SizedBox`：

![Screenshot of spacer guidelines](/assets/images/docs/tools/devtools/debug-toggle-guidelines-spacer.png)

### 顯示基線（Show baselines）

這個選項會讓所有基線（baseline）可見。基線是用來定位文字的水平線。

這對於檢查文字是否垂直精確對齊非常有用。例如，下方螢幕截圖中的文字基線就有些微未對齊：

![Screenshot with show baselines enabled](/assets/images/docs/tools/devtools/debug-toggle-guidelines-baseline.png)

你可以使用 [Baseline][Baseline] 元件來調整基線。

[Baseline]: {{site.api}}/flutter/widgets/Baseline-class.html

只要 [render box][render box] 設定了基線，就會繪製一條線；字母基線會以綠色顯示，表意基線則以黃色顯示。

你也可以在程式碼中啟用這個功能：

<?code-excerpt "lib/show_baselines.dart"?>
```dart
import 'package:flutter/rendering.dart';

void showBaselines() {
  debugPaintBaselinesEnabled = true;
}
```

### 突顯重繪區域

此選項會在所有 [render boxes][render boxes] 周圍繪製一個邊框，當該區塊發生重繪時，邊框顏色會改變。

[render boxes]: {{site.api}}/flutter/rendering/RenderBox-class.html

這種不斷變換的彩虹色邊框有助於找出應用程式中過於頻繁重繪、可能影響效能的部分。

例如，一個小型動畫 (Animation) 可能會導致整個頁面在每一幀都重繪。
將該動畫包裹在 [RepaintBoundary widget][RepaintBoundary widget] 中，可以將重繪範圍限制在動畫本身。

[RepaintBoundary widget]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html

以下範例中，進度指示器會導致其容器 (Container) 發生重繪：

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

將進度指示器包裹在`RepaintBoundary`中，會使只有該區塊的螢幕被重新繪製（repaint）：

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

`RepaintBoundary` 元件（Widgets）有其取捨。它們可以提升效能，
但同時也會有建立新畫布（canvas）的額外開銷，
這會佔用更多記憶體。

你也可以在程式碼中啟用這個選項：

<?code-excerpt "lib/highlight_repaints.dart (toggle)"?>
```dart
import 'package:flutter/rendering.dart';

void highlightRepaints() {
  debugRepaintRainbowEnabled = true;
}
```

### 標示過大圖片

此選項會透過將圖片顏色反轉並垂直翻轉，來標示過大的圖片：

![A highlighted oversized image](/assets/images/docs/tools/devtools/debug-toggle-guidelines-oversized.png)

被標示的圖片會佔用比實際需求更多的記憶體；
例如，一張 5MB 的大型圖片卻只顯示在 100 x 100 像素的區域。

這類圖片可能導致效能不佳，特別是在低階裝置上或是當你有大量圖片（如列表檢視）時，
這些效能損耗會累積起來。
每張圖片的相關資訊都會輸出在 debug 主控台中：

```console
dash.png has a display size of 213×392 but a decode size of 2130×392, which uses an additional 2542KB.
```

若圖片多使用了至少 128KB 的空間，即被視為過大。

#### 修正圖片

在可能的情況下，最佳的解決方式是將圖片資源檔案（image asset file）調整尺寸，使其變得更小。

如果無法這麼做，你可以在 `Image` 建構函式（constructor）中使用 `cacheHeight` 和 `cacheWidth` 參數：

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

這會讓引擎以指定的尺寸解碼這張圖片（image），並減少記憶體使用量（解碼與儲存的成本仍然比圖片資源本身縮小來得高）。無論這些參數如何，圖片的繪製都會依照版面配置（layout）的限制或寬度與高度來呈現。

你也可以在程式碼中設定這個屬性：

<?code-excerpt "lib/oversized_images.dart (toggle)"?>
```dart
void showOversizedImages() {
  debugInvertOversizedImages = true;
}
```

#### 更多資訊

你可以在以下連結了解更多：

- [Flutter 文件：debugInvertOversizedImages]({{site.api}}/flutter/painting/debugInvertOversizedImages.html)

[render box]: {{site.api}}/flutter/rendering/RenderBox-class.html

## 追蹤元件 (Widget) 建立

Flutter Inspector 的部分功能是透過對應用程式程式碼進行插裝（instrumentation），以便更好地理解元件 (Widget) 建立時的原始碼位置。這種原始碼插裝讓 Flutter Inspector 能夠以接近你在原始碼中定義 UI 的方式來呈現元件樹 (widget tree)。如果沒有這個功能，元件樹中的節點會變得更深，並且更難理解執行時的元件階層與你應用程式 UI 的對應關係。

你可以在 `flutter run` 命令中傳遞 `--no-track-widget-creation` 來停用這個功能。

以下是啟用與未啟用追蹤元件建立時，你的元件樹可能呈現的樣子。

啟用追蹤元件建立（預設）：

![啟用追蹤元件建立時的元件樹](/assets/images/docs/tools/devtools/track_widget_creation_enabled.png){:width="100%"}

停用追蹤元件建立（不建議）：

![停用追蹤元件建立時的元件樹](/assets/images/docs/tools/devtools/track_widget_creation_disabled.png){:width="100%"}

此功能會讓本來相同的 `const` 元件 (Widgets) 在偵錯版本中不會被視為相等。更多細節請參閱 [偵錯時常見問題討論][common problems when debugging]。

## Inspector 設定

![Flutter Inspector 設定對話框](/assets/images/docs/tools/devtools/flutter-inspector-settings.png){:width="100%"}

### 啟用滑鼠懸停檢查

將滑鼠懸停在任何元件 (Widget) 上時，會顯示其屬性與數值。

切換此選項可以啟用或停用滑鼠懸停檢查功能。

### 啟用元件樹自動重新整理

啟用後，元件樹會在 hot-reload 或導覽事件後自動重新整理。

### 使用舊版 Inspector

啟用後，會使用 [舊版 Inspector][legacy inspector]，而非新版 Inspector。

:::note
[舊版 Inspector][legacy inspector] 將在未來版本中移除。
如果有任何問題導致你無法使用新版 Inspector，請[提交錯誤回報][filing a bug]讓我們知道。
:::

[legacy inspector]: /tools/devtools/legacy-inspector

### 套件目錄 (Package directories)

預設情況下，DevTools 只會顯示專案根目錄下建立的元件 (Widgets)。若要查看所有元件，包括那些在專案根目錄之外建立的元件，請切換 [顯示實作元件 (Show implementation widgets)][Show implementation widgets]。

若要將其他元件納入預設元件樹，必須將其父目錄加入套件目錄 (Package Directories)。

例如，請參考以下目錄結構：

```plaintext
project_foo
  pkgs
    project_foo_app
    widgets_A
    widgets_B
```

從 `project_foo_app` 執行您的應用程式時，元件檢查器樹（widget inspector tree）中只會顯示來自 `project_foo/pkgs/project_foo_app` 的元件（Widgets）。

若要在元件樹中顯示來自 `widgets_A` 的元件，請將 `project_foo/pkgs/widgets_A` 加入套件目錄（package directories）。

若要從您的專案根目錄在元件樹中顯示 _所有_ 元件，請將 `project_foo` 加入套件目錄。

對套件目錄的變更會在下次為該應用程式開啟元件檢查器時持續生效。

[Show implementation widgets]: #視覺化偵錯版面配置問題

## 其他資源

若想了解元件檢查器（inspector）的一般功能展示，請參考 [DartConf 2018 talk][DartConf 2018 talk]，該影片展示了 IntelliJ 版 Flutter 檢查器的操作。

若想學習如何使用 DevTools 進行視覺化除錯版面配置問題，請參閱有導覽的
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
