---
title: 從程式碼偵錯 Flutter 應用程式
description: >
  如何從程式碼與命令列啟用各種偵錯工具。
---

<?code-excerpt path-base="testing/code_debugging"?>

本指南說明你可以在程式碼中啟用哪些偵錯功能。
如需完整的偵錯與效能分析工具列表，請參閱
[Debugging][] 頁面。

## 為應用程式新增日誌紀錄

以下列出幾種你可以用來記錄應用程式行為的敘述。
你可以在 DevTools 的
[Logging view][] 或系統主控台中檢視你的日誌。

*   [`print()`][]：輸出 `stdout`（標準輸出）訊息。屬於
    `dart:io` 函式庫的一部分。

*   [`stderr.method_to_invoke()`][]：輸出 `stderr`（標準錯誤）訊息。
    將 `method_to_invoke()` 替換為 `stderr`
    屬性所支援的方法，例如 `writeln()` 或 `write()`。通常用於 `try...catch`
    區塊中。屬於 `dart:io` 函式庫的一部分。

    <?code-excerpt "lib/main.dart (stderr)"?>
    ```dart
    stderr.writeln('print me');
    ```

*   [`log()`][]：在日誌輸出中包含更細緻的層級與更多資訊。屬於 `dart:developer` 函式庫的一部分。

*   [`debugPrint()`][]：如果過多的輸出導致日誌行被捨棄，可以使用此功能保留這些行。除非是在 debug 模式檢查或 assert 中，否則在 release 模式下也會輸出訊息。屬於 `foundations` 函式庫的一部分。

### 範例 1 {:.no_toc}

<?code-excerpt "lib/main.dart (log)"?>
```dart
import 'dart:developer' as developer;

void main() {
  developer.log('log me', name: 'my.app.category');

  developer.log('log me 1', name: 'my.other.category');
  developer.log('log me 2', name: 'my.other.category');
}
```

你也可以將應用程式資料（app data）傳遞給 log 呼叫。
慣例上，這會使用 `error:` 命名參數於 `log()` 呼叫中，將你想傳送的物件進行 JSON 編碼，並將編碼後的字串傳遞給 error 參數。

### 範例 2 {:.no_toc}

<?code-excerpt "lib/app_data.dart (pass-data)"?>
```dart
import 'dart:convert';
import 'dart:developer' as developer;

void main() {
  var myCustomObject = MyCustomObject();

  developer.log(
    'log me',
    name: 'my.app.category',
    error: jsonEncode(myCustomObject),
  );
}
```

DevTool 的日誌檢視會將 JSON 編碼的錯誤參數
解析為資料物件。
DevTool 會在該日誌條目的詳細資訊檢視中呈現此資料。

## 設定中斷點

你可以在 DevTools 的 [Debugger][] 或
你的 IDE 內建的偵錯工具中設定中斷點。

若要以程式方式設定中斷點：

1. 在相關檔案中匯入 `dart:developer` 套件。
1. 使用 `debugger()` 陳述式插入程式中斷點。
   此陳述式可選擇性地接受 `when` 參數。
   這個布林值參數會在指定條件為 true 時觸發中斷。

   **範例 3** 會說明這一點。

### 範例 3 {:.no_toc}

<?code-excerpt "lib/debugger.dart"?>
```dart
import 'dart:developer';

void someFunction(double offset) {
  debugger(when: offset > 30);
  // ...
}
```

## 使用旗標除錯應用程式層級

Flutter 框架的每一層都提供了一個函式，可以透過 `debugPrint` 屬性將其當前狀態或事件輸出（dump）到主控台。

:::note
以下所有範例皆於 MacBook Pro M1 上以 macOS 原生應用程式執行。這些輸出內容可能會與您的開發機器所顯示的內容不同。
:::

:::tip
任何樹狀結構中的每個 render object（渲染物件）都包含其 [`hashCode`][] 的前五個十六進位數字。
這個雜湊值可作為該 render object 的唯一識別碼。
:::

[`hashCode`]: {{site.api}}/flutter/rendering/TextSelectionPoint/hashCode.html

### 輸出元件樹（Widget tree）

若要輸出 Widgets（元件）函式庫的狀態，
請呼叫 [`debugDumpApp()`][] 函式。

1. 開啟您的原始檔案。
1. 匯入 `package:flutter/rendering.dart`。
1. 在 `runApp()` 函式中呼叫 [`debugDumpApp()`][] 函式。
   您需要讓應用程式處於 debug 模式。
   應用程式正在建構（building）時，無法在 `build()` 方法內呼叫此函式。
1. 如果您尚未啟動應用程式，請使用您的 IDE 進行除錯。
1. 如果您已經啟動應用程式，請儲存您的原始檔案。
   熱重載（Hot reload）會重新渲染您的應用程式。

#### 範例 4：呼叫 `debugDumpApp()`

<?code-excerpt "lib/dump_app.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpApp();
          },
          child: const Text('Dump Widget Tree'),
        ),
      ),
    );
  }
}
```

此函式會從元件樹（widget tree）的根節點開始，遞迴呼叫 `toStringDeep()` 方法。它會回傳一個「扁平化」的樹狀結構。

**範例 4** 產生了以下的元件樹（widget tree）。其中包含：

* 所有經由各自 build 函式投影出來的元件 (Widget)。
* 許多在你的應用程式原始碼中看不到的元件。
  這些元件是由框架的元件 build 函式在建構過程中插入的。

  例如，以下的樹狀結構顯示了 [`_InkFeatures`][]。
  此類別實作了 [`Material`][] 元件（Widget）的一部分。
  它在 **範例 4** 的程式碼中完全沒有出現。

<details>
<summary><strong>展開以檢視範例 4 的元件樹</strong></summary>

{% render "docs/testing/trees/widget-tree.md" -%}

</details>

當按鈕從被按下變為釋放時，
會觸發 `debugDumpApp()` 函式。
這同時也會讓 [`TextButton`][] 物件呼叫 [`setState()`][]，
進而將自身標記為 dirty（髒狀態）。
這說明了為什麼 Flutter 會將特定物件標記為「dirty」。
當你檢視元件樹時，請留意類似以下的行：

```plaintext
└TextButton(dirty, dependencies: [MediaQuery, _InheritedTheme, _LocalizationsScope-[GlobalKey#5880d]], state: _ButtonStyleState#ab76e)
```

如果你撰寫自己的元件（Widgets），請覆寫
[`debugFillProperties()`][widget-fill] 方法以新增資訊。
在該方法的參數中加入 [DiagnosticsProperty][] 物件，
並呼叫父類別的方法。
`toString` 方法會利用這個函式來填充元件（Widget）的描述。

### 列印 render tree（渲染樹）

當你在除錯版面配置問題時，元件（Widgets）層的樹狀結構可能缺乏細節。
下一步的除錯可能需要 render tree（渲染樹）。
要傾印 render tree，請執行下列步驟：

1. 開啟你的原始碼檔案。
1. 呼叫 [`debugDumpRenderTree()`][] 函式。
   你可以在任何時候呼叫這個函式，除了在 layout 或 paint 階段。
   建議從 [frame callback][] 或事件處理器（event handler）中呼叫。
1. 如果你尚未啟動應用程式，請使用你的 IDE 進行除錯。
1. 如果你已經啟動應用程式，請儲存你的原始碼檔案。
   熱重載（Hot reload）會重新渲染你的應用程式。

#### 範例 5：呼叫 `debugDumpRenderTree()`

<?code-excerpt "lib/dump_render_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpRenderTree();
          },
          child: const Text('Dump Render Tree'),
        ),
      ),
    );
  }
}
```

在除錯版面配置問題時，請查看 `size` 和 `constraints` 欄位。
約束（constraints）會沿著樹往下傳遞，而尺寸（sizes）則會往上回傳。

<details>
<summary><strong>展開以檢視 Example 5 的 render tree（渲染樹）</strong></summary>

{% render "docs/testing/trees/render-tree.md" -%}

</details>

在 **範例 5** 的 render tree（渲染樹）中：

* `RenderView`，也就是視窗大小（window size），會限制所有 render object（渲染物件），直到且包含 [`RenderPositionedBox`][]`#dc1df` render object，
  其尺寸都受到螢幕大小的限制。
  此範例將尺寸設為 `Size(800.0, 600.0)`

* 每個 render object 的 `constraints` 屬性會限制每個子項的大小。此屬性會以 [`BoxConstraints`][] render object 作為值。
  從 `RenderSemanticsAnnotations#fe6b5` 開始，constraint 等於 `BoxConstraints(w=800.0, h=600.0)`。

* [`Center`][] 元件（Widget）會在 `RenderSemanticsAnnotations#8187b` 子樹下建立 `RenderPositionedBox#dc1df` render object。

* 此 render object 下的每個子項都有同時包含最小值與最大值的 `BoxConstraints`。舉例來說，`RenderSemanticsAnnotations#a0a4b`
  使用了 `BoxConstraints(0.0<=w<=800.0, 0.0<=h<=600.0)`。

* `RenderPhysicalShape#8e171` render object 的所有子項都使用 `BoxConstraints(BoxConstraints(56.0<=w<=800.0, 28.0<=h<=600.0))`。

* 子項 `RenderPadding#8455f` 設定了 `padding` 值為 `EdgeInsets(8.0, 0.0, 8.0, 0.0)`。
  這會為該 render object 之後的所有子項設定左右各 8 的 padding（內距）。
  它們現在有了新的 constraints：
  `BoxConstraints(40.0<=w<=784.0, 28.0<=h<=600.0)`。

這個物件，根據 `creator` 欄位顯示，很可能是 [`TextButton`][] 的定義的一部分，
它會對其內容設定最小寬度為 88 像素，以及特定高度 36.0。這是 `TextButton` 類別，實作了 Material Design 關於按鈕尺寸的設計指引。

`RenderPositionedBox#80b8d` render object 會再次放寬 constraints，以便將文字置中於按鈕內。
[`RenderParagraph`][]#59bc2 render object 會根據其內容決定自身尺寸。
如果你沿著樹往上追蹤尺寸，
你會看到文字的大小如何影響組成按鈕的所有方塊的寬度。
所有父層都會根據子項的尺寸來決定自身大小。

另一個觀察方式是查看每個方塊描述中的 `relayoutBoundary` 屬性。
這會告訴你有多少祖先會依賴此元素的尺寸。

舉例來說，最內層的 `RenderPositionedBox` 行有一個 `relayoutBoundary=up13`。
這表示當 Flutter 將 `RenderConstrainedBox` 標記為 dirty（需重繪）時，
也會將該方塊的 13 個祖先標記為 dirty，因為新的尺寸可能會影響這些祖先。

如果你要自訂 render object 並希望在 dump 中加入資訊，
請覆寫 [`debugFillProperties()`][render-fill]。
在方法的參數中加入 [DiagnosticsProperty][] 物件，
然後呼叫父類別的方法。

### 列印 layer tree（圖層樹）

若要除錯合成（compositing）問題，請使用 [`debugDumpLayerTree()`][]。

#### 範例 6：呼叫 `debugDumpLayerTree()`

<?code-excerpt "lib/dump_layer_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpLayerTree();
          },
          child: const Text('Dump Layer Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視 Example 6 的 layer tree 輸出</strong></summary>

{% render "docs/testing/trees/layer-tree.md" -%}

</details>

`RepaintBoundary` 元件（Widget）會建立：

1. 一個 `RenderRepaintBoundary` RenderObject 於 render tree 中，
   如 **範例 5** 的結果所示。

   ```plaintext
   ╎     └─child: RenderRepaintBoundary#f8f28
   ╎       │ needs compositing
   ╎       │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   ╎       │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   ╎       │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   ╎       │   UnmanagedRestorationScope ← ⋯
   ╎       │ parentData: <none> (can use size)
   ╎       │ constraints: BoxConstraints(w=800.0, h=600.0)
   ╎       │ layer: OffsetLayer#e73b7
   ╎       │ size: Size(800.0, 600.0)
   ╎       │ metrics: 66.7% useful (1 bad vs 2 good)
   ╎       │ diagnosis: insufficient data to draw conclusion (less than five
   ╎       │   repaints)
   ```

1. 如 **範例 6** 所示，會在圖層樹（layer tree）中產生一個新的圖層。

   ```plaintext
   ├─child 1: OffsetLayer#0f766
   │ │ creator: RepaintBoundary ← _FocusInheritedScope ← Semantics ←
   │ │   FocusScope ← PrimaryScrollController ← _ActionsScope ← Actions
   │ │   ← Builder ← PageStorage ← Offstage ← _ModalScopeStatus ←
   │ │   UnmanagedRestorationScope ← ⋯
   │ │ engine layer: OffsetEngineLayer#1768d
   │ │ handles: 2
   │ │ offset: Offset(0.0, 0.0)
   ```

這樣可以減少需要重繪的範圍。

### 輸出焦點樹（focus tree）

若要除錯焦點（focus）或快捷鍵（shortcut）問題，可以使用 [`debugDumpFocusTree()`][] 函式來輸出焦點樹。

`debugDumpFocusTree()` 方法會回傳應用程式的焦點樹。

焦點樹會以以下方式標記節點：

* 被聚焦（focused）的節點會標記為 `PRIMARY FOCUS`。
* 焦點節點的祖先會標記為 `IN FOCUS PATH`。

如果你的應用程式有使用 [`Focus`][] 元件（Widget），可以利用 [`debugLabel`][]
屬性，讓你更容易在樹狀結構中找到它的焦點節點。

你也可以透過 [`debugFocusChanges`][] 布林屬性，在焦點變更時啟用更詳細的日誌紀錄。

#### 範例 7：呼叫 `debugDumpFocusTree()`

<?code-excerpt "lib/dump_focus_tree.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: TextButton(
          onPressed: () {
            debugDumpFocusTree();
          },
          child: const Text('Dump Focus Tree'),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視 Example 7 的焦點樹</strong></summary>

{% render "docs/testing/trees/focus-tree.md" -%}

</details>

### 列印語意樹（semantics tree）

`debugDumpSemanticsTree()` 函式會列印應用程式的語意樹（semantics tree）。

語意樹（Semantics tree）會提供給系統的無障礙 API 使用。
若要取得語意樹的傾印（dump），請依下列步驟操作：

1. 使用系統的無障礙工具，或是 `SemanticsDebugger`，啟用無障礙功能
1. 使用 [`debugDumpSemanticsTree()`][] 函式。

#### 範例 8：呼叫 `debugDumpSemanticsTree()`

<?code-excerpt "lib/dump_semantic_tree.dart"?>
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

void main() {
  runApp(const MaterialApp(home: AppHome()));
}

class AppHome extends StatelessWidget {
  const AppHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: Semantics(
          button: true,
          enabled: true,
          label: 'Clickable text here!',
          child: GestureDetector(
            onTap: () {
              debugDumpSemanticsTree();
              if (kDebugMode) {
                print('Clicked!');
              }
            },
            child: const Text('Click Me!', style: TextStyle(fontSize: 56)),
          ),
        ),
      ),
    );
  }
}
```

<details>
<summary><strong>展開以檢視範例 8 的語意樹</strong></summary>

{% render "docs/testing/trees/semantic-tree.md" -%}

</details>

### 列印事件時序

如果你想知道事件發生的時間點相對於 frame（畫面幀）的開始與結束，可以設定列印來記錄這些事件。
若要將 frame 的開始與結束列印到主控台（console），請切換 [`debugPrintBeginFrameBanner`][]
以及 [`debugPrintEndFrameBanner`][]。

**範例 1 的 frame banner 日誌輸出**

```plaintext
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

要列印導致目前 frame 被排程的呼叫堆疊（call stack），請使用 [`debugPrintScheduleFrameStacks`][] 旗標。

## 偵錯版面配置（Layout）問題

若要使用圖形介面（GUI）來偵錯版面配置問題，請將 [`debugPaintSizeEnabled`][] 設為 `true`。
此旗標可在 `rendering` 函式庫中找到。
你可以隨時啟用它，並且在 `true` 期間會影響所有繪製（Painting）。
建議將其加入 `void main()` 入口點的最上方。

#### 範例 9

請參考以下程式碼範例：

<?code-excerpt "lib/debug_flags.dart (debug-paint-size-enabled)"?>
```dart
// Add import to the Flutter rendering library.
import 'package:flutter/rendering.dart';

void main() {
  debugPaintSizeEnabled = true;
  runApp(const MyApp());
}
```

啟用後，Flutter 會在您的應用程式中顯示以下變化：

* 以亮青色邊框顯示所有方框。
* 以淡藍色填充和藍色邊框顯示所有 padding，包覆在子元件（Widget）周圍。
* 以黃色箭頭顯示所有對齊（alignment）定位。
* 當 Spacer 沒有子元件時，以灰色顯示。

[`debugPaintBaselinesEnabled`][] 旗標
則針對具有基線（baseline）的物件做類似的顯示。
應用程式會以亮綠色顯示字母基線（alphabetic baseline），
以橘色顯示表意文字基線（ideographic baseline）。
字母字符會「坐」在字母基線上，
但該基線會「穿過」[CJK 字元][cjk]的底部。
Flutter 會將表意文字基線定位在文字行的最底部。

[`debugPaintPointersEnabled`][] 旗標會開啟特殊模式，
讓您點擊時以青色高亮顯示任何物件。
這有助於判斷某個物件是否未通過 hit test。
這種情況可能發生在物件超出其父元件的邊界，
因此一開始就不會被納入 hit testing。

如果您想要除錯 compositor layer，請考慮使用下列旗標。

* 使用 [`debugPaintLayerBordersEnabled`][] 旗標來尋找每個 layer 的邊界。
  啟用後，每個 layer 的邊界會以橘色框線標示。

* 使用 [`debugRepaintRainbowEnabled`][] 旗標來顯示已重繪的 layer。
  每當 layer 重繪時，會以一組旋轉顏色覆蓋。

Flutter 框架中所有以
`debug...` 開頭的函式或方法僅能在 [debug 模式][debug mode] 下運作。

[cjk]: https://en.wikipedia.org/wiki/CJK_characters

## 除錯動畫（Animation）問題

:::note
要用最少的力氣除錯動畫，請將動畫速度放慢。
若要放慢動畫速度，
請在 DevTools 的 [Inspector 檢查器檢視][Inspector view] 中點擊 **Slow Animations**。
這會將動畫速度降至 20%。
如果您想更細緻地控制動畫速度，
請依照下列指示操作。
:::

將 [`timeDilation`][] 變數（來自 `scheduler`
函式庫）設為大於 1.0 的數值，例如 50.0。
建議只在應用程式啟動時設定一次。
如果您在動畫運行期間動態更改這個值，特別是降低它，
框架可能會偵測到時間倒退，這通常會導致 assert 失敗，
並干擾您的除錯工作。

## 除錯效能問題

:::note
您可以使用 [DevTools][] 達到與部分 debug 旗標類似的效果。
有些 debug 旗標帶來的效益有限。
如果您發現某個旗標的功能希望加到 [DevTools][]，
請[提出 issue][file an issue]。
:::

Flutter 提供多種頂層屬性與函式，
協助您在開發週期的不同階段除錯應用程式。
要使用這些功能，請以 debug 模式編譯您的應用程式。

以下列出一些來自 [rendering 函式庫][rendering library]，
用於除錯效能問題的旗標與函式。

[`debugDumpRenderTree()`][]
: 若要將 rendering tree 輸出至主控台，
  請在非 layout 或 repaint 階段呼叫此函式。

  設定這些旗標的方法有：

  * 編輯框架原始碼。
  * 匯入該模組，在您的 `main()` 函式中設定值，
    然後執行 hot restart。

[`debugPaintLayerBordersEnabled`][]
: 若要顯示每個 layer 的邊界，請將此屬性設為 `true`。
  啟用後，每個 layer 會在其邊界繪製一個方框。

[`debugRepaintRainbowEnabled`][]
: 若要在每個元件（Widget）周圍顯示彩色邊框，請將此屬性設為 `true`。
  這些邊框會隨著使用者在應用程式中滾動而改變顏色。
  若要設定此旗標，請在您的應用程式中以頂層屬性加入 `debugRepaintRainbowEnabled = true;`。
  如果設定此旗標後，任何靜態元件會持續變換顏色，
  請考慮在那些區塊加入 repaint boundaries。

[`debugPrintMarkNeedsLayoutStacks`][]
: 若要判斷應用程式是否產生超出預期的 layout，
  請將此屬性設為 `true`。
  這類 layout 問題可能發生在 timeline、profile，
  或 layout 方法中的 `print` 陳述式。
  啟用後，框架會在主控台輸出 stack trace，
  說明為何每個 render object 會被標記為需要 layout。

[`debugPrintMarkNeedsPaintStacks`][]
: 若要判斷應用程式是否繪製超出預期的 layout，
  請將此屬性設為 `true`。

您也可以隨時產生 stack trace。
若要自行輸出 stack trace，請在應用程式中加入 `debugPrintStack()`
函式。

### 追蹤 Dart 程式碼效能

:::note
您可以使用 DevTools 的 [Timeline events 分頁][Timeline events tab] 來進行追蹤。
您也可以在 Timeline 檢視中匯入與匯出追蹤檔案，
但僅限於 DevTools 產生的檔案。
:::

若要自訂效能追蹤並測量任意 Dart 程式碼片段的 wall time 或 CPU time，
請使用 `dart:developer` [Timeline][] 工具。

1. 開啟您的原始碼。
1. 將想要測量的程式碼包裹在 `Timeline` 方法中。

    <?code-excerpt "lib/perf_trace.dart"?>
    ```dart
    import 'dart:developer';
    
    void main() {
      Timeline.startSync('interesting function');
      // iWonderHowLongThisTakes();
      Timeline.finishSync();
    }
    ```

1. 連接到你的應用程式後，打開 DevTools 的 [Timeline events 標籤頁][Timeline events tab]。
1. 在 **Performance settings**（效能設定）中選擇 **Dart** 錄製選項。
1. 執行你想要測量的功能。

為了確保執行時的效能特性能夠與最終產品盡可能相符，請在 [profile mode][] 下執行你的應用程式。

### 新增效能疊加層（performance overlay）

:::note
你可以透過 [Flutter inspector][] 中的 **Performance Overlay** 按鈕，切換應用程式上的效能疊加層顯示。如果你偏好在程式碼中設定，請參考以下說明。
:::

若要在程式碼中啟用 `PerformanceOverlay` 元件，請將 [`MaterialApp`][]、[`CupertinoApp`][] 或 [`WidgetsApp`][] 的建構函式中的 `showPerformanceOverlay` 屬性設為 `true`：

#### 範例 10

<?code-excerpt "lib/performance_overlay.dart (show-overlay)"?>
```dart
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      showPerformanceOverlay: true,
      title: 'My Awesome App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'My Awesome App'),
    );
  }
}
```

（如果你沒有使用 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`，你也可以將你的應用程式包裹在 stack 中，並在 stack 上放置一個由呼叫 [`PerformanceOverlay.allEnabled()`][] 所建立的元件（Widget），即可達到相同效果。）

若要學習如何解讀 overlay（疊加層）中的圖表，請參考 [The performance overlay][] 於
[Profiling Flutter performance][]。

## 新增元件對齊網格

若要在你的應用程式上新增 [Material Design baseline grid][] 疊加層，以協助驗證對齊情況，請在 [`MaterialApp` constructor][] 中加入 `debugShowMaterialGrid` 參數。

若要在非 Material 應用程式中新增疊加層，請加入一個 [`GridPaper`][] 元件（Widget）。

[`_InkFeatures`]: {{site.api}}/flutter/material/InkFeature-class.html
[`BoxConstraints`]: {{site.api}}/flutter/rendering/BoxConstraints-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`debugDumpApp()`]: {{site.api}}/flutter/widgets/debugDumpApp.html
[`debugDumpFocusTree()`]: {{site.api}}/flutter/widgets/debugDumpFocusTree.html
[`debugDumpLayerTree()`]: {{site.api}}/flutter/rendering/debugDumpLayerTree.html
[`debugDumpRenderTree()`]: {{site.api}}/flutter/rendering/debugDumpRenderTree.html
[`debugDumpSemanticsTree()`]: {{site.api}}/flutter/rendering/debugDumpSemanticsTree.html
[`debugFocusChanges`]: {{site.api}}/flutter/widgets/debugFocusChanges.html
[`debugLabel`]: {{site.api}}/flutter/widgets/Focus/debugLabel.html
[`debugPaintBaselinesEnabled`]: {{site.api}}/flutter/rendering/debugPaintBaselinesEnabled.html
[`debugPaintLayerBordersEnabled`]: {{site.api}}/flutter/rendering/debugPaintLayerBordersEnabled.html
[`debugPaintPointersEnabled`]: {{site.api}}/flutter/rendering/debugPaintPointersEnabled.html
[`debugPaintSizeEnabled`]: {{site.api}}/flutter/rendering/debugPaintSizeEnabled.html
[`debugPrint()`]: {{site.api}}/flutter/widgets/debugPrint.html
[`debugPrintBeginFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintBeginFrameBanner.html
[`debugPrintEndFrameBanner`]: {{site.api}}/flutter/scheduler/debugPrintEndFrameBanner.html
[`debugPrintMarkNeedsLayoutStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsLayoutStacks.html
[`debugPrintMarkNeedsPaintStacks`]: {{site.api}}/flutter/rendering/debugPrintMarkNeedsPaintStacks.html
[`debugPrintScheduleFrameStacks`]: {{site.api}}/flutter/scheduler/debugPrintScheduleFrameStacks.html
[`debugRepaintRainbowEnabled`]: {{site.api}}/flutter/rendering/debugRepaintRainbowEnabled.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`GridPaper`]: {{site.api}}/flutter/widgets/GridPaper-class.html
[`log()`]: {{site.api}}/flutter/dart-developer/log.html
[`Material`]: {{site.api}}/flutter/material/Material-class.html
[`MaterialApp` constructor]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp/MaterialApp.html
[`PerformanceOverlay.allEnabled()`]: {{site.api}}/flutter/widgets/PerformanceOverlay/PerformanceOverlay.allEnabled.html
[`print()`]: {{site.api}}/flutter/dart-core/print.html
[`RenderParagraph`]: {{site.api}}/flutter/rendering/RenderParagraph-class.html
[`RenderPositionedBox`]: {{site.api}}/flutter/rendering/RenderPositionedBox-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`stderr.method_to_invoke()`]: {{site.api}}/flutter/dart-io/stderr.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`timeDilation`]: {{site.api}}/flutter/scheduler/timeDilation.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[debug mode]: /testing/build-modes#debug
[Debugger]: /tools/devtools/debugger
[Debugging]: /testing/debugging
[DevTools]: /tools/devtools
[DiagnosticsProperty]: {{site.api}}/flutter/foundation/DiagnosticsProperty-class.html
[file an issue]: {{site.github}}/flutter/devtools/issues
[Flutter inspector]: /tools/devtools/inspector
[frame callback]: {{site.api}}/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html
[Inspector view]: /tools/devtools/inspector
[Logging view]: /tools/devtools/logging
[Material Design baseline grid]: {{site.material}}/foundations/layout/understanding-layout/spacing
[profile mode]: /testing/build-modes#profile
[Profiling Flutter performance]: /perf/ui-performance
[render-fill]: {{site.api}}/flutter/rendering/Layer/debugFillProperties.html
[rendering library]: {{site.api}}/flutter/rendering/rendering-library.html
[The performance overlay]: /perf/ui-performance#the-performance-overlay
[Timeline events tab]: /tools/devtools/performance#timeline-events-tab
[Timeline]: {{site.dart.api}}/dart-developer/Timeline-class.html
[widget-fill]: {{site.api}}/flutter/widgets/Widget/debugFillProperties.html
