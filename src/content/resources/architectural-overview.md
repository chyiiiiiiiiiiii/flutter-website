---
title: Flutter 架構總覽
description: >
  Flutter 架構的高階概覽，
  包含其設計所依據的核心原則與概念。
---

<?code-excerpt path-base="resources/architectural_overview/"?>

本文旨在提供 Flutter 架構的高階概覽，
說明其設計所依據的核心原則與概念。
如果你有興趣了解如何架構一個 Flutter 應用程式，
請參考 [Architecting Flutter apps][Architecting Flutter apps]。

[Architecting Flutter apps]: /app-architecture

Flutter 是一套跨平台 UI 工具包（UI toolkit），
設計目的是讓程式碼能在如 iOS、Android、Web 及桌面等作業系統間重複利用，
同時也允許應用程式直接與底層平台服務介接。
其目標是協助開發者打造高效能、在不同平台上皆能自然運作的應用程式，
在保有平台差異的同時，盡可能共用程式碼。

在開發過程中，Flutter 應用程式會在虛擬機（VM）中執行，
可進行狀態保留的熱重載（stateful hot reload），
無需完整重新編譯即可套用變更。
（在 Web 平台上，Flutter 支援熱重啟（hot restart）以及
[旗標下的熱重載][hot reload behind a flag]。）
正式發佈時，Flutter 應用程式會直接編譯為機器碼，
無論是 Intel x64 或 ARM 指令集，
若目標為 Web 則編譯為 JavaScript。
此框架為開源專案，採用寬鬆的 BSD 授權，
並擁有蓬勃發展的第三方套件生態系，
可補足核心函式庫的功能。

[hot reload behind a flag]: /platform-integration/web/building#hot-reload-web

本總覽分為數個章節：

1. **層級模型**：構成 Flutter 的各個組件。
2. **響應式使用者介面**：Flutter UI 開發的核心概念。
3. **元件（Widgets）簡介**：Flutter UI 的基本構建單元。
4. **繪製流程**：Flutter 如何將 UI 程式碼轉換為像素。
5. **平台嵌入器（Platform embedders）概覽**：讓行動及桌面作業系統執行 Flutter 應用程式的程式碼。
6. **Flutter 與其他程式碼的整合**：Flutter 應用程式可用的各種整合技術。
7. **Web 支援**：關於 Flutter 在瀏覽器環境下特性的結語。

## 架構層級

Flutter 被設計為可擴充的分層系統。它由一系列彼此獨立、依賴底層的函式庫組成。沒有任何一層擁有對下層的特權存取權，且框架層的每一部分都設計為可選且可替換。

{% comment %}
本文件中的 PNG 圖表是使用 draw.io 製作的。draw.io 的中繼資料已嵌入於 PNG 檔案本身，因此你可以直接用 draw.io 開啟 PNG 來編輯各個元件。

使用的設定如下：

 - 全選（避免匯出畫布本身）
 - 匯出為 PNG，縮放 300%（以獲得適當大小的輸出）
 - 啟用 _透明背景_
 - 啟用 _僅選取_、_裁剪_
 - 啟用 _包含我的圖表副本_
{% endcomment %}

![Architectural
diagram](/assets/images/docs/arch-overview/archdiagram.png){:width="100%"}

對底層作業系統而言，Flutter 應用程式的封裝方式與其他原生應用程式相同。平台專屬的嵌入器（embedder）提供進入點；協調底層作業系統以存取如繪圖表面、無障礙服務與輸入等服務；並管理訊息事件迴圈。嵌入器會以適合該平台的語言撰寫：目前 Android 為 Java 與 C++，iOS 與 macOS 為 Swift 及 Objective-C/Objective-C++，
Windows 與 Linux 則為 C++。透過嵌入器，Flutter 程式碼可以作為模組整合到現有應用程式中，
或成為應用程式的全部內容。
Flutter 內建多種常見目標平台的嵌入器，
但也存在其他第三方嵌入器。

Flutter 的核心是 **Flutter 引擎（Flutter engine）**，
主要以 C++ 撰寫，支援所有 Flutter 應用程式所需的基本功能。
引擎負責在每次需要繪製新畫面時光柵化（rasterize）合成場景。
它提供 Flutter 核心 API 的低階實作，
包括圖形（在 iOS、Android 及桌面（需開啟旗標）上透過 [Impeller][Impeller]，
其他平台則為 [Skia][Skia]）、文字排版、
檔案與網路 I/O、無障礙支援、
外掛架構、Dart 執行環境
及編譯工具鏈。

:::note
如果你想了解哪些裝置支援 Impeller，
請參考 [Can I use Impeller?][Can I use Impeller?]
以獲得詳細資訊。
:::

[Can I use Impeller?]: {{site.main-url}}/go/can-i-use-impeller
[Skia]: https://skia.org
[Impeller]: /perf/impeller

Flutter 引擎透過
[`dart:ui`]({{site.repo.flutter}}/tree/main/engine/src/flutter/lib/ui)
向 Flutter 框架開放，
該層將底層 C++ 程式碼包裝為 Dart 類別。此函式庫
提供最低階的功能元件，例如驅動輸入、
圖形與文字渲染子系統的類別。

開發者通常會透過 **Flutter 框架（Flutter framework）**
與 Flutter 互動，
這是一個以 Dart 語言撰寫的現代響應式框架。
它包含豐富的平台、版面配置及基礎函式庫，
並由多個層級組成。自底向上分別為：

* 基本的 **[基礎]({{site.api}}/flutter/foundation/foundation-library.html)**
  類別，以及如
  **[動畫]({{site.api}}/flutter/animation/animation-library.html)、
  [繪製]({{site.api}}/flutter/painting/painting-library.html)、
  [手勢]({{site.api}}/flutter/gestures/gestures-library.html)** 等常用服務，
  提供對底層基礎的抽象。
* **[繪製層（rendering layer）]({{site.api}}/flutter/rendering/rendering-library.html)**
  提供版面配置的抽象。透過此層，你可以建立可渲染物件的樹狀結構，
  並可動態操作這些物件，樹狀結構會自動更新版面以反映你的變更。
* **[元件層（widgets layer）]({{site.api}}/flutter/widgets/widgets-library.html)**
  是組合抽象層。繪製層中的每個渲染物件在元件層都有對應的類別。
  此外，元件層允許你定義可重複使用的類別組合。
  這一層引入了響應式程式設計模型。
* **[Material]({{site.api}}/flutter/material/material-library.html)**
  及
  **[Cupertino]({{site.api}}/flutter/cupertino/cupertino-library.html)**
  函式庫則提供完整的控制項集合，利用元件層的組合機制實作 Material 或 iOS 設計語言。

Flutter 框架本身相對精簡；許多開發者常用的高階功能是以套件形式實作，
包含如 [camera]({{site.pub}}/packages/camera)、[webview]({{site.pub}}/packages/webview_flutter) 等平台外掛，
以及如 [characters]({{site.pub}}/packages/characters)、
[http]({{site.pub}}/packages/http)、
[animations]({{site.pub}}/packages/animations) 等平台無關的功能，
這些皆建立於 Dart 與 Flutter 核心函式庫之上。
部分套件來自更廣泛的生態系，涵蓋如 [應用內支付]({{site.pub}}/packages/square_in_app_payments)、
[Apple 認證]({{site.pub}}/packages/sign_in_with_apple)、
[動畫]({{site.pub}}/packages/lottie) 等服務。

本總覽其餘部分將大致依層級向下介紹，
首先說明 UI 開發的響應式範式，
接著描述元件如何組合並轉換為可被應用程式渲染的物件，
再說明 Flutter 如何在平台層與其他程式碼互通，
最後簡要總結 Flutter 在 Web 支援上與其他目標平台的差異。

## 應用程式剖析

下圖概述由 `flutter create` 產生的一般 Flutter 應用程式所包含的各個組件。
圖中顯示 Flutter 引擎在整體堆疊中的位置、
突顯 API 邊界，並標示各組件所屬的原始碼儲存庫。
下方圖例說明描述 Flutter 應用程式各組件時常用的術語。

<img src='/assets/images/docs/app-anatomy.svg' alt='The layers of a Flutter app created by "flutter create": Dart app, framework, engine, embedder, runner'>

**Dart 應用程式**
* 將元件（Widgets）組合為所需的 UI。
* 實作商業邏輯。
* 由應用程式開發者擁有。

**框架**（[原始碼]({{site.repo.flutter}}/tree/main/packages/flutter/lib)）
* 提供高階 API 以建構高品質應用程式
  （例如元件、命中測試、手勢偵測、
  無障礙、文字輸入）。
* 將應用程式的元件樹組合為場景。

**引擎**（[原始碼]({{site.repo.flutter}}/tree/main/engine/src/flutter/shell/common)）
* 負責光柵化已合成的場景。
* 提供 Flutter 核心 API 的低階實作
  （例如圖形、文字排版、Dart 執行環境）。
* 透過 **dart:ui API** 將功能暴露給框架。
* 透過引擎的 **Embedder API** 與特定平台整合。

**嵌入器（Embedder）**（[原始碼]({{site.repo.flutter}}/tree/main/engine/src/flutter/shell/platform)）
* 協調底層作業系統以存取如繪圖表面、
  無障礙服務與輸入等服務。
* 管理事件迴圈。
* 暴露 **平台專屬 API**，以將嵌入器整合進應用程式。

**Runner**
* 將嵌入器的平臺專屬 API 所暴露的各組件組合成可在目標平台執行的應用程式套件。
* 為 `flutter create` 產生的應用程式範本的一部分，
  由應用程式開發者擁有。

## 響應式使用者介面

從表面上看，Flutter 是[一個響應式、宣告式的 UI 框架][faq]，
開發者負責將應用程式狀態映射為介面狀態，
而框架則負責在應用程式狀態變更時於執行階段更新介面。
這種模型受到
[Facebook 為其 React 框架所提出的相關研究][fb]
啟發，重新思考了許多傳統設計原則。

[faq]: /resources/faq#what-programming-paradigm-does-flutters-framework-use
[fb]: {{site.yt.watch}}?time_continue=2&v=x7cQ3mrcKaY&feature=emb_logo

在多數傳統 UI 框架中，
使用者介面的初始狀態只會描述一次，
之後由使用者程式碼於執行階段根據事件分別更新。
這種做法的挑戰在於，隨著應用程式日益複雜，
開發者必須了解狀態變更如何在整個 UI 中層層傳遞。
舉例來說，請參考下列 UI：

![Color picker dialog](/assets/images/docs/arch-overview/color-picker.png){:width="66%"}

有許多地方都可以變更狀態：色彩方塊、色相滑桿、單選按鈕。
當使用者與 UI 互動時，變更必須反映到所有其他地方。
更糟的是，若未謹慎設計，對 UI 某一部分的小變動可能會對看似無關的程式碼產生連鎖影響。

一種解決方式是採用 MVC 這類架構，
將資料變更推送到模型（model），再透過控制器（controller）將新狀態推送到檢視（view）。
然而這也有問題，因為建立與更新 UI 元素是兩個容易不同步的步驟。

Flutter 及其他響應式框架則採取不同的方式，
明確將使用者介面與其底層狀態解耦。
採用 React 風格 API 時，你只需建立 UI 描述，
框架會自動根據這份設定來建立及/或更新使用者介面。

在 Flutter 中，元件（Widgets，類似於 React 的 components）是不可變的類別，
用來設定物件樹。這些元件用來管理一個獨立的版面配置物件樹，
再由該樹管理另一個合成物件樹。
Flutter 的核心，就是一系列高效遍歷樹狀結構變動部分的機制，
將物件樹轉換為更低階的物件樹，並在這些樹之間傳遞變更。

元件會透過覆寫 `build()` 方法來宣告其使用者介面，
這是一個將狀態轉換為 UI 的函式：

```plaintext
UI = f(state)
```

`build()` 方法在設計上執行速度非常快，且應該沒有副作用，因此框架可以在需要時隨時呼叫它（理論上甚至可以在每次畫面渲染時都呼叫一次）。

這種做法仰賴語言執行時的一些特性（特別是物件的快速建立與刪除）。所幸，[Dart 特別適合執行這項任務]({{site.flutter-medium}}/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30)。

## 元件 (Widgets)

如前所述，Flutter 強調以元件 (Widgets) 作為組合的單位。元件 (Widgets) 是 Flutter 應用程式使用者介面的基礎構建區塊，每個元件都是對使用者介面某一部分的不可變宣告。

元件 (Widgets) 會以組合的方式形成階層結構。每個元件都巢狀於其父元件之內，並可從父元件取得 context。這種結構會一路延伸到根元件（也就是承載 Flutter 應用程式的容器，通常是 `MaterialApp` 或 `CupertinoApp`），如下方這個簡單的例子所示：

<?code-excerpt "lib/main.dart (main)"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('My Home Page')),
        body: Center(
          child: Builder(
            builder: (context) {
              return Column(
                children: [
                  const Text('Hello World'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      print('Click!');
                    },
                    child: const Text('A button'),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
```

在前述程式碼中，所有被實例化的類別都是元件（widgets）。

應用程式會根據事件（例如使用者互動）來更新其使用者介面，方法是告知框架將元件樹中的某個元件替換為另一個元件。框架會比較新舊元件，並有效率地更新使用者介面。

Flutter 為每個 UI 控制元件都提供了自己的實作，而不是依賴系統所提供的元件。例如，[iOS 切換開關控制元件]({{site.material}}/components/switch)和[Android 對應元件]({{site.api}}/flutter/widgets/Center-class.html)都有純 [Dart 實作]({{site.apple-dev}}/design/human-interface-guidelines/toggles)。

這種做法帶來了多項優點：

* 提供無限的擴充性。開發者如果想要 Switch 控制元件的變體，可以用任何方式自行建立，不會受限於作業系統所提供的擴充點。
* 避免顯著的效能瓶頸，讓 Flutter 能一次合成整個場景，而不需在 Flutter 程式碼與平台程式碼之間來回切換。
* 將應用程式行為與作業系統依賴解耦。即使作業系統更改了其控制元件的實作，應用程式在所有 OS 版本上看起來和操作體驗都一致。

### 組合（Composition）

元件通常是由許多其他小型、單一用途的元件組合而成，以產生強大的效果。

在可能的情況下，設計概念的數量會盡量精簡，同時讓總體詞彙量保持豐富。例如，在 widgets 層，Flutter 使用相同的核心概念（`Widget`）來代表繪製到螢幕、版面配置（定位與尺寸）、使用者互動、狀態管理、主題、動畫以及導覽。在動畫層，`Animation` 和 `Tween` 這一對概念涵蓋了大部分設計空間。在繪製層，`RenderObject` 用來描述版面配置、繪製、命中測試和無障礙。這些層級的詞彙都非常豐富：有數百種元件和 render objects，以及數十種動畫和 tween 類型。

類別階層設計刻意保持淺而廣，以最大化組合的可能性，專注於小型、可組合且各司其職的元件。核心功能皆為抽象設計，甚至像 padding 和 alignment 這樣的基本功能也作為獨立元件實作，而非內建於核心。（這也與傳統 API 不同，傳統 API 通常將 padding 這類功能內建於每個版面配置元件的核心。）因此，例如要置中一個元件，不是調整某個假想的 `Align` 屬性，而是將其包裹在 [`Center`]({{site.api}}/flutter/widgets/Container-class.html) 元件中。

Flutter 提供了用於 padding、alignment、row、column 以及 grid 的元件。這些版面配置元件本身沒有可視化的表現，其唯一目的是控制其他元件的版面配置。Flutter 也包含了能善用這種組合方式的實用元件。

舉例來說，[`Container`]({{site.api}}/flutter/widgets/LimitedBox-class.html) 是一個常用元件，由多個負責版面配置、繪製、定位和尺寸的元件組成。具體來說，`Container` 是由 [`LimitedBox`]({{site.api}}/flutter/widgets/ConstrainedBox-class.html)、[`ConstrainedBox`]({{site.api}}/flutter/widgets/Align-class.html)、[`Align`]({{site.api}}/flutter/widgets/Padding-class.html)、[`Padding`]({{site.api}}/flutter/widgets/DecoratedBox-class.html)、[`DecoratedBox`]({{site.api}}/flutter/widgets/Transform-class.html) 以及 [`Transform`]({{site.api}}/flutter/widgets/StatelessWidget/build.html) 元件所組成，你可以從其原始碼中看到。Flutter 的一大特色是，你可以深入檢視任何元件的原始碼。因此，與其繼承 `Container` 來實現自訂效果，不如將其與其他元件以新穎方式組合，或直接以 `Container` 為靈感創建新元件。

### 建立元件（Building widgets）

如前所述，你可以透過覆寫 [`build()`]({{site.api}}/flutter/widgets/Row-class.html) 函式來決定元件的視覺表現，並回傳一個新的元素樹。這棵樹以更具體的方式代表了該元件在使用者介面中的部分。例如，一個工具列元件的 build 函式可能會回傳一個[水平版面配置]({{site.api}}/flutter/widgets/Text-class.html)，其中包含一些 [文字]({{site.api}}/flutter/material/IconButton-class.html) 和[各種]({{site.api}}/flutter/material/PopupMenuButton-class.html)[按鈕]({{site.api}}/flutter/widgets/RenderObjectWidget-class.html)。根據需要，框架會遞迴要求每個元件進行 build，直到整棵樹都由[具體可繪製物件](/resources/inside-flutter#linear-reconciliation)描述。框架接著會將這些可繪製物件組合成一棵可繪製物件樹。

元件的 build 函式應該避免任何副作用。每當該函式被要求執行時，元件都應該回傳一棵新的元件樹[^1]，無論之前回傳的是什麼。框架會自動判斷哪些 build 方法需要被呼叫，這部分會在後文詳細說明。更多相關資訊可參考 [Inside Flutter topic]({{site.api}}/flutter/widgets/StatelessWidget-class.html)。

每當畫面重新繪製時，Flutter 只會針對狀態有變化的 UI 部分，呼叫該元件的 `build()` 方法進行重建。因此，build 方法應該盡快回傳結果，任何較重的運算工作應以非同步方式處理，並將結果存入狀態中供 build 方法使用。

雖然這種自動比較方式看似簡單，實際上卻非常有效，能打造高效能、具互動性的應用程式。而且，build 函式的設計讓你的程式碼更簡潔，重點在於宣告元件的組成，而非處理 UI 狀態轉換的複雜性。

### 元件狀態（Widget state）

框架引入了兩大類元件：_有狀態_（stateful）與_無狀態_（stateless）元件。

許多元件沒有可變狀態：它們沒有會隨時間改變的屬性（例如圖示或標籤）。這些元件會繼承自 [`StatelessWidget`]({{site.api}}/flutter/widgets/StatefulWidget-class.html)。

然而，如果元件的獨特特性需要根據使用者互動或其他因素改變，該元件就是_有狀態_的。例如，若元件有一個計數器，每當使用者點擊按鈕時就遞增，則計數器的值就是該元件的狀態。當這個值改變時，元件需要重新建構，以更新其在 UI 中的部分。這類元件會繼承自 [`StatefulWidget`]({{site.api}}/flutter/widgets/State-class.html)，而（因為元件本身是不可變的）可變狀態會存放在繼承自 [`State`]({{site.api}}/flutter/widgets/State/setState.html) 的獨立類別中。`StatefulWidget` 沒有 build 方法；它們的 UI 是透過其 `State` 物件來建立的。

每當你變更 `State` 物件（例如遞增計數器）時，必須呼叫 [`setState()`]⟦L23⟧，以通知框架再次呼叫 `State` 的 build 方法，進而更新 UI。

將狀態物件與元件物件分離，讓其他元件能以完全相同的方式對待無狀態與有狀態元件，而不用擔心狀態遺失。父元件不需要保留子元件來維持其狀態，隨時都能建立新的子元件實例，而不會遺失子元件的持久狀態。框架會自動在適當時機尋找並重用現有的狀態物件。

### 狀態管理（State management）

那麼，如果許多元件都可以包含狀態，這些狀態要如何管理並在系統中傳遞呢？

如同其他類別一樣，你可以在元件的建構函式中初始化其資料，因此 `build()` 方法可以確保任何子元件都能以所需的資料實例化：

```dart
@override
Widget build(BuildContext context) {
   return ContentWidget([!importantState!]);
}
```

其中 `importantState` 是一個用來代表包含對 `Widget` 重要狀態的類別的占位符。

然而，隨著元件（Widgets）樹越來越深，狀態資訊在樹狀階層中上下傳遞會變得相當繁瑣。因此，第三種元件類型 [`InheritedWidget`][`InheritedWidget`]，提供了一種簡單的方式，讓你可以從共用的祖先取得資料。你可以使用 `InheritedWidget` 來建立一個狀態元件，將其包裹在元件樹中的共用祖先，如下例所示：

![Inherited widgets](/assets/images/docs/arch-overview/inherited-widget.png){:width="50%" .diagram-wrap}

[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html

每當其中一個 `ExamWidget` 或 `GradeWidget` 物件需要從 `StudentState` 取得資料時，現在可以透過如下指令來存取：

```dart
final studentState = StudentState.of(context);
```

`of(context)` 呼叫會接收 build context（即目前元件所在位置的控制權），並回傳[樹狀結構中最接近的父層][the nearest ancestor in the tree]，其型別符合 `StudentState`。

`InheritedWidget` 也提供 `updateShouldNotify()` 方法，Flutter 會呼叫該方法，以判斷狀態變化時，是否應該觸發使用該狀態的子元件重新建構（rebuild）。

[the nearest ancestor in the tree]: {{site.api}}/flutter/widgets/BuildContext/dependOnInheritedWidgetOfExactType.html

Flutter 本身廣泛地將 `InheritedWidget` 作為共用狀態的框架使用，例如應用程式的 _視覺主題_（visual theme），其中包含[像顏色與字型樣式等屬性][properties like color and type styles]，這些屬性在整個應用程式中都會被廣泛使用。

`MaterialApp` 的 `build()` 方法在建構時會將主題插入樹狀結構中，然後在更深層的階層中，元件可以使用 `.of()` 方法來查找相關的主題資料。

例如：

<?code-excerpt "lib/main.dart (container)"?>
```dart
Container(
  color: Theme.of(context).secondaryHeaderColor,
  child: Text(
    'Text with a background color',
    style: Theme.of(context).textTheme.titleLarge,
  ),
);
```

[properties like color and type styles]: {{site.api}}/flutter/material/ThemeData-class.html

隨著應用程式規模的擴大，能夠減少建立和使用有狀態元件（stateful widgets）繁瑣步驟的進階狀態管理方式，變得越來越受歡迎。許多 Flutter 應用程式會使用像 [provider]({{site.pub}}/packages/provider) 這類實用套件，它為 `InheritedWidget` 提供了一層包裝。Flutter 的分層架構也讓其他狀態轉換為 UI 的實作方式成為可能，例如 [flutter_hooks]({{site.pub}}/packages/flutter_hooks) 套件。

## 繪製與版面配置（Rendering and layout）

本節說明繪製管線（rendering pipeline），也就是 Flutter 將元件（Widgets）階層轉換為實際繪製在螢幕上的像素時所經歷的一系列步驟。

### Flutter 的繪製模型（Rendering model）

你可能會好奇：如果 Flutter 是一個跨平台框架，那它怎麼能提供媲美單一平台框架的效能？

我們可以先思考傳統 Android 應用程式的運作方式。繪製時，首先會呼叫 Android 框架的 Java 程式碼。Android 系統函式庫提供負責將自身繪製到 `Canvas` 物件上的元件，Android 隨後會利用 [Skia][Skia]——一個以 C/C++ 撰寫的圖形引擎——呼叫 CPU 或 GPU，完成裝置上的繪圖。

跨平台框架 _通常_ 會在底層的原生 Android 和 iOS UI 函式庫之上建立一層抽象，試圖消弭各平台表現上的差異。應用程式程式碼往往以 JavaScript 這類直譯語言撰寫，必須進一步與以 Java 為基礎的 Android 或以 Objective-C 為基礎的 iOS 系統函式庫互動，才能顯示 UI。這一切都會帶來額外負擔，尤其是在 UI 與應用程式邏輯之間有大量互動時，影響可能相當顯著。

相較之下，Flutter 盡量減少這些抽象層，繞過系統 UI 元件函式庫，改用自有的元件集合。負責繪製 Flutter 視覺效果的 Dart 程式碼會編譯為原生程式碼，並利用 Impeller 進行繪製。Impeller 會隨應用程式一同發佈，讓開發者即使手機尚未升級至新版 Android，也能透過升級應用程式，獲得最新的效能改進。其他原生平台上的 Flutter（如 Windows 或 macOS）同樣適用。

:::note
如果你想了解哪些裝置支援 Impeller，請參考 [Can I use Impeller?][Can I use Impeller?]。
如需更多資訊，請參閱 [Impeller rendering engine][Impeller rendering engine]
:::

[Impeller rendering engine]: /perf/impeller

### 從使用者輸入到 GPU

Flutter 在繪製管線上秉持的核心原則是：**簡單就是快速**。Flutter 對於資料如何流向系統，有一條簡明的管線，如下方的時序圖所示：

![Render pipeline sequencing diagram](/assets/images/docs/arch-overview/render-pipeline.png){:width="100%" .diagram-wrap}

接下來我們將更詳細地介紹這些階段中的部分內容。

### Build：從 Widget 到 Element

請參考這段展示元件階層的程式碼片段：

<?code-excerpt "lib/main.dart (widget-hierarchy)"?>
```dart
Container(
  color: Colors.blue,
  child: Row(
    children: [
      Image.network('https://www.example.com/1.png'),
      const Text('A'),
    ],
  ),
);
```

當 Flutter 需要渲染這個片段時，
會呼叫 `build()` 方法，
該方法會根據目前的應用程式狀態，
回傳一個元件（Widgets）子樹來渲染 UI。
在這個過程中，
`build()` 方法可以根據其狀態，
視需要引入新的元件（Widgets）。
舉例來說，在前述的程式碼片段中，
`Container` 擁有 `color` 和 `child` 屬性。
從 [原始碼]({{site.repo.flutter}}/blob/02efffc134ab4ce4ff50a9ddd86c832efdb80462/packages/flutter/lib/src/widgets/container.dart#L401)
可以看到，若 color 不為 null，
它會插入一個代表該顏色的 `ColoredBox`：

```dart
if (color != null)
  current = ColoredBox(color: color!, child: current);
```

相對地，`Image` 和 `Text` 元件（Widgets）在建構過程中可能會插入像是 `RawImage` 和 `RichText` 這樣的子元件。因此，最終的元件階層可能會比程式碼中所呈現的還要更深，如下例所示[^2]：

![Render pipeline sequencing diagram](/assets/images/docs/arch-overview/widgets.png){:width="40%" .diagram-wrap}

這也說明了，當你透過像
[Flutter inspector](/tools/devtools/inspector)
這類 Flutter/Dart DevTools 的除錯工具檢查樹狀結構時，你可能會看到比原始程式碼中更深層的結構。

在建構階段，Flutter 會將程式碼中所表達的元件轉換成對應的**元素樹（element tree）**，每個元件對應一個元素。每個元素代表樹狀階層中特定位置的元件實例。元素主要分為兩種類型：

- `ComponentElement`，作為其他元素的容器。
- `RenderObjectElement`，參與版面配置（layout）或繪製（paint）階段的元素。

![Render pipeline sequencing diagram](/assets/images/docs/arch-overview/widget-element.png){:width="85%" .diagram-wrap}

`RenderObjectElement` 是其元件對應物與底層 `RenderObject` 之間的中介，後續會進一步說明。

任何元件的元素都可以透過其 `BuildContext` 來參照，這是一個指向元件在樹中位置的控制代碼。在像 `Theme.of(context)` 這樣的函式呼叫中，這就是 `context`，並且會作為參數傳遞給 `build()` 方法。

由於元件是不可變的（immutable），包括節點之間的父子關係，因此只要元件樹有任何變動（例如將前述範例中的 `Text('A')` 換成 `Text('B')`），就會回傳一組新的元件物件。但這並不代表底層的表示方式必須重新建立。元素樹在每一幀（frame）之間是持久存在的，因此在效能上扮演關鍵角色，讓 Flutter 能夠像是元件階層完全可丟棄一樣運作，同時快取其底層表示。Flutter 只需遍歷有變動的元件，便能只重建那些需要重新配置的元素樹部分。

### 版面配置與繪製

很少有應用程式只繪製單一元件。任何 UI 框架的一個重要部分，就是能夠有效率地排列一個元件階層，在繪製到螢幕上之前，決定每個元素的大小與位置。

渲染樹（render tree）中每個節點的基礎類別是
[`RenderObject`]({{site.api}}/flutter/rendering/RenderObject-class.html)，
它定義了一個抽象的版面配置與繪製模型。這個模型非常通用：它不限定維度數量，甚至不侷限於笛卡兒座標系統（如[這個極座標系統範例]({{site.dartpad}}/?id=596b1d6331e3b9d7b00420085fab3e27)所示）。每個 `RenderObject` 都知道自己的父節點，但對於子節點只知道如何「拜訪」它們以及它們的限制（constraints）。這為 `RenderObject` 提供了足夠的抽象能力，能夠處理各種不同的使用情境。

在建構階段，Flutter 會針對元素樹中的每個 `RenderObjectElement` 建立或更新一個繼承自 `RenderObject` 的物件。
`RenderObject` 是基礎元件：
[`RenderParagraph`]({{site.api}}/flutter/rendering/RenderParagraph-class.html)
負責繪製文字，
[`RenderImage`]({{site.api}}/flutter/rendering/RenderImage-class.html)
負責繪製圖片，
[`RenderTransform`]({{site.api}}/flutter/rendering/RenderTransform-class.html)
則會在繪製子元件前套用轉換效果。

![Differences between the widgets hierarchy and the element and render trees](/assets/images/docs/arch-overview/trees.png){:width="100%" .diagram-wrap}

大多數 Flutter 元件都是由繼承自 `RenderBox` 子類別的物件來繪製，該類別代表一個在二維笛卡兒空間中具有固定大小的 `RenderObject`。`RenderBox` 提供了「盒子限制模型」（box constraint model）的基礎，為每個要繪製的元件建立最小與最大寬度和高度的限制。

為了進行版面配置，Flutter 會以深度優先遍歷的方式走訪渲染樹，並將**尺寸限制自父節點向下傳遞**給子節點。在決定自己的尺寸時，子節點_必須_遵守父節點給予的限制。子節點則會在父節點所設定的限制內，**向上回報尺寸**給父物件。

![Constraints go down, sizes go up](/assets/images/docs/arch-overview/constraints-sizes.png){:width="70%" .diagram-wrap}

在這次遍歷樹狀結構的過程結束時，每個物件都已在其父節點的限制內確定了自己的尺寸，並準備好透過呼叫
[`paint()`]({{site.api}}/flutter/rendering/RenderObject/paint.html)
方法進行繪製。

盒子限制模型（box constraint model）是一種非常強大的物件排列方式，可在 _O(n)_ 時間內完成：

- 父節點可以透過將最大和最小限制設為相同值，來決定子物件的尺寸。例如，手機應用程式中最上層的渲染物件會將其子物件限制為螢幕大小。（子物件可以自行決定如何使用這個空間，例如只是在限制範圍內置中想要繪製的內容。）
- 父節點可以限定子物件的寬度，但讓子物件在高度上有彈性（或反之，限定高度但給予寬度彈性）。真實世界的例子如流式文字（flow text），可能必須符合水平限制，但垂直方向則依文字量而變動。

即使子物件需要知道可用空間才能決定如何繪製內容，這個模型依然適用。透過使用
[`LayoutBuilder`]({{site.api}}/flutter/widgets/LayoutBuilder-class.html)
元件，子物件可以檢查自上而下傳遞的限制，並據此決定如何使用，例如：

<?code-excerpt "lib/main.dart (layout-builder)"?>
```dart
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      if (constraints.maxWidth < 600) {
        return const OneColumnLayout();
      } else {
        return const TwoColumnLayout();
      }
    },
  );
}
```

有關約束與版面配置系統的更多資訊，以及實作範例，請參閱 [Understanding constraints](/ui/layout/constraints) 主題。

所有 `RenderObject` 的根節點是 `RenderView`，它代表整個 render tree（渲染樹）的最終輸出。當平台要求渲染新畫格（例如，因為 [vsync](https://source.android.com/devices/graphics/implement-vsync) 或紋理解壓縮／上傳完成），會呼叫 `compositeFrame()` 方法，該方法屬於 render tree 根部的 `RenderView` 物件。這會建立一個 `SceneBuilder`，以觸發場景的更新。當場景完成後，`RenderView` 物件會將合成後的場景傳遞給 `Window.render()` 的 `dart:ui` 方法，進而將控制權交給 GPU 進行渲染。

有關渲染管線中合成（composition）與光柵化（rasterization）階段的更多細節，超出了本文的高階範疇，詳細資訊可參考 [這場關於 Flutter 渲染管線的演講]({{site.yt.watch}}?v=UUfXWzp0-DU)。

## 平台嵌入

如前所述，Flutter 的使用者介面並非轉譯為對應作業系統的元件，而是由 Flutter 自行建構、排版、合成與繪製。獲取紋理並參與底層作業系統應用程式生命週期的機制，必然會因平台的特殊需求而有所不同。引擎本身與平台無關，提供一個 [穩定的 ABI（Application Binary Interface，應用程式二進位介面）]({{site.repo.flutter}}/blob/main/engine/src/flutter/shell/platform/embedder/embedder.h)，讓 _平台嵌入器_ 能夠設定並使用 Flutter。

平台嵌入器是承載所有 Flutter 內容的原生作業系統應用程式，並作為主機作業系統與 Flutter 之間的橋樑。當你啟動 Flutter 應用程式時，嵌入器會提供進入點（entrypoint）、初始化 Flutter 引擎、取得 UI 與光柵化所需的執行緒，並建立一個 Flutter 可寫入的紋理。嵌入器同時負責應用程式生命週期管理，包括輸入手勢（如滑鼠、鍵盤、觸控）、視窗大小調整、執行緒管理與平台訊息處理。Flutter 內建了 Android、iOS、Windows、macOS 與 Linux 的平台嵌入器；你也可以自訂平台嵌入器，例如 [這個支援透過 VNC 風格 framebuffer 遠端 Flutter 工作階段的範例]({{site.github}}/chinmaygarde/fluttercast)，或 [這個 Raspberry Pi 的範例]({{site.github}}/ardera/flutter-pi)。

每個平台都有其專屬的 API 與限制。以下是各平台的簡要說明：

- 在 iOS 與 macOS 上，Flutter 分別以 `UIViewController` 或 `NSViewController` 的形式載入至嵌入器。平台嵌入器會建立 `FlutterEngine`，作為 Dart VM 與 Flutter 執行環境的主機，並建立 `FlutterViewController`，該元件會連接至 `FlutterEngine`，將 UIKit 或 Cocoa 的輸入事件傳遞給 Flutter，並透過 Metal 或 OpenGL 顯示由 `FlutterEngine` 渲染的畫面。
- 在 Android 上，Flutter 預設以 `Activity` 的形式載入至嵌入器。該視圖由 [`FlutterView`]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterView.html) 控制，根據 Flutter 內容的合成與 z 軸排序需求，將內容渲染為視圖或紋理。
- 在 Windows 上，Flutter 被承載於傳統的 Win32 應用程式中，內容則透過 [ANGLE](https://chromium.googlesource.com/angle/angle/+/master/README.md)（一個將 OpenGL API 呼叫轉換為 DirectX 11 等價呼叫的函式庫）進行渲染。

## 與其他程式碼整合

Flutter 提供多種互通機制，無論你是要存取以 Kotlin 或 Swift 等語言撰寫的程式碼或 API、呼叫原生 C-based API、在 Flutter 應用程式中嵌入原生控制項，或是在現有應用程式中嵌入 Flutter。

### 平台通道

針對行動與桌面應用程式，Flutter 允許你透過 _平台通道_ 呼叫自訂程式碼。這是一種讓 Dart 程式碼與主機應用程式平台專屬程式碼溝通的機制。你可以建立一個通用通道（包含名稱與編解碼器），在 Dart 與以 Kotlin 或 Swift 撰寫的平台元件間傳送與接收訊息。資料會從 Dart 型別（如 `Map`）序列化為標準格式，然後在 Kotlin（如 `HashMap`）或 Swift（如 `Dictionary`）中反序列化為對應型別。

![平台通道如何讓 Flutter 與主機程式碼溝通](/assets/images/docs/arch-overview/platform-channels.png){:width="65%" .diagram-wrap}

以下是一個簡短的平台通道範例，展示 Dart 呼叫 Android（Kotlin）或 iOS（Swift）端事件處理器的方式：

<?code-excerpt "lib/main.dart (method-channel)"?>
```dart
// Dart side
const channel = MethodChannel('foo');
final greeting = await channel.invokeMethod('bar', 'world') as String;
print(greeting);
```

```kotlin
// Android (Kotlin)
val channel = MethodChannel(flutterView, "foo")
channel.setMethodCallHandler { call, result ->
  when (call.method) {
    "bar" -> result.success("Hello, ${call.arguments}")
    else -> result.notImplemented()
  }
}
```

```swift
// iOS (Swift)
let channel = FlutterMethodChannel(name: "foo", binaryMessenger: flutterView)
channel.setMethodCallHandler {
  (call: FlutterMethodCall, result: FlutterResult) -> Void in
  switch (call.method) {
    case "bar": result("Hello, \(call.arguments as! String)")
    default: result(FlutterMethodNotImplemented)
  }
}
```

更多有關使用平台通道（platform channels）的範例，包括桌面平台的範例，可以在 [flutter/packages]({{site.repo.packages}})
倉庫中找到。此外，Flutter 已經有[數千個現成的套件]({{site.pub}}/flutter)，涵蓋許多常見情境，從 Firebase、廣告到裝置硬體（如相機與藍牙）等應用。

### 外部函式介面（Foreign Function Interface, FFI）

針對以 C 為基礎的 API（包括可由現代語言如 Rust 或 Go 所撰寫程式碼產生的 API），Dart 提供了直接綁定原生程式碼的機制，使用 `dart:ffi` 函式庫。外部函式介面（FFI, Foreign Function Interface）模型通常比平台通道更快，因為傳遞資料時不需要序列化。Dart 執行階段（runtime）允許在堆積（heap）上配置由 Dart 物件支援的記憶體，並呼叫靜態或動態連結的函式庫。FFI 可用於除了 Web 以外的所有平台，在 Web 上則可以使用 [JS interop libraries][JS interop libraries] 和 [`package:web`][`package:web`] 來達成類似的目的。

要使用 FFI，你需要為 Dart 及非受控（unmanaged）方法簽章各自建立一個 `typedef`，並指示 Dart VM 在它們之間進行對應。以下是一個範例程式碼片段，展示如何呼叫傳統的 Win32 `MessageBox()` API：

<?code-excerpt "lib/ffi.dart" remove="ignore:"?>
```dart
import 'dart:ffi';
import 'package:ffi/ffi.dart'; // contains .toNativeUtf16() extension method

typedef MessageBoxNative =
    Int32 Function(
      IntPtr hWnd,
      Pointer<Utf16> lpText,
      Pointer<Utf16> lpCaption,
      Int32 uType,
    );

typedef MessageBoxDart =
    int Function(
      int hWnd,
      Pointer<Utf16> lpText,
      Pointer<Utf16> lpCaption,
      int uType,
    );

void exampleFfi() {
  final user32 = DynamicLibrary.open('user32.dll');
  final messageBox = user32.lookupFunction<MessageBoxNative, MessageBoxDart>(
    'MessageBoxW',
  );

  final result = messageBox(
    0, // No owner window
    'Test message'.toNativeUtf16(), // Message
    'Window caption'.toNativeUtf16(), // Window title
    0, // OK button only
  );
}
```

[JS interop libraries]: {{site.dart-site}}/interop/js-interop
[`package:web`]: {{site.pub-pkg}}/web

### 在 Flutter 應用程式中渲染原生控制項

由於 Flutter 內容是繪製到一個紋理（texture）上，且其元件樹（widget tree）完全是內部管理，因此在 Flutter 的內部模型中，像 Android view 這樣的東西並沒有存在的位置，也無法與 Flutter 元件（Widgets）交錯渲染。這對於希望在 Flutter 應用程式中加入現有平台元件（例如瀏覽器控制項）的開發者來說，是一個問題。

Flutter 透過引入平台視圖元件（platform view widgets）
([`AndroidView`]({{site.api}}/flutter/widgets/AndroidView-class.html)
以及 [`UiKitView`]({{site.api}}/flutter/widgets/UiKitView-class.html))
來解決這個問題，讓你能在各平台上嵌入這類內容。平台視圖（Platform views）可以與其他 Flutter 內容整合[^3]。這些元件各自作為與底層作業系統之間的中介。例如，在 Android 上，`AndroidView` 主要負責三項功能：

- 複製原生視圖所渲染的圖形紋理，並在每次繪製畫面時，將其呈現給 Flutter，作為 Flutter 渲染畫面的一部分進行合成。
- 回應命中測試（hit testing）與輸入手勢，並將這些轉換為對應的原生輸入。
- 建立無障礙樹（accessibility tree）的對應結構，並在原生層與 Flutter 層之間傳遞指令與回應。

不可避免地，這種同步會帶來一定程度的額外負擔。因此，這種方式通常最適合用於像 Google Maps 這類複雜控制項，因為在 Flutter 中重新實作並不實際。

通常，Flutter 應用程式會根據平台判斷，在 `build()` 方法中實例化這些元件。以下以
[google_maps_flutter]({{site.pub}}/packages/google_maps_flutter) 外掛為例：

```dart
if (defaultTargetPlatform == TargetPlatform.android) {
  return AndroidView(
    viewType: 'plugins.flutter.io/google_maps',
    onPlatformViewCreated: onPlatformViewCreated,
    gestureRecognizers: gestureRecognizers,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
} else if (defaultTargetPlatform == TargetPlatform.iOS) {
  return UiKitView(
    viewType: 'plugins.flutter.io/google_maps',
    onPlatformViewCreated: onPlatformViewCreated,
    gestureRecognizers: gestureRecognizers,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
return Text(
    '$defaultTargetPlatform is not yet supported by the maps plugin');
```

與底層的`AndroidView`或`UiKitView`原生程式碼進行溝通，通常是透過前述的平台通道（platform channels）機制來實現。

目前，桌面平台尚未支援平台視圖（platform views），但這並非架構上的限制；未來有可能會加入支援。

### 在父應用程式中託管 Flutter 內容

與前述情境相反的是，將 Flutter 元件（Widget）嵌入到現有的 Android 或 iOS 應用程式中。如前面章節所述，在行動裝置上新建立的 Flutter 應用程式，會被託管於 Android activity 或 iOS `UIViewController` 之中。Flutter 內容可以透過相同的嵌入 API，嵌入至現有的 Android 或 iOS 應用程式。

Flutter 模組範本設計上便於嵌入；你可以將其作為原始碼相依性，嵌入到現有的 Gradle 或 Xcode 建構定義中，或是將其編譯為 Android Archive 或 iOS Framework 二進位檔，以便在不需要每位開發者都安裝 Flutter 的情況下使用。

Flutter 引擎初始化時需要一點時間，因為它需要載入 Flutter 共用函式庫、初始化 Dart 執行階段、建立並執行 Dart 隔離區（isolate），並將繪製表面（rendering surface）附加到 UI。為了減少顯示 Flutter 內容時的 UI 延遲，建議在整體應用程式初始化流程中，或至少在顯示第一個 Flutter 螢幕之前，先初始化 Flutter 引擎，這樣使用者就不會在載入第一段 Flutter 程式碼時遇到突如其來的停頓。此外，將 Flutter 引擎分離出來，也能讓它在多個 Flutter 螢幕間重複使用，並共享載入必要函式庫所需的記憶體負擔。

關於如何將 Flutter 載入現有 Android 或 iOS 應用程式的更多資訊，請參閱[載入流程、效能與記憶體主題](/add-to-app/performance)。

## Flutter Web 支援

雖然一般的架構概念適用於 Flutter 支援的所有平台，但 Flutter 在 Web 支援上有一些獨特的特性值得說明。

Dart 語言自誕生以來就能編譯為 JavaScript，其工具鏈針對開發與生產環境都做了最佳化。許多重要的應用程式目前都將 Dart 編譯為 JavaScript 並在生產環境中運行，包括 [Google Ads 的廣告主工具](https://ads.google.com/home/)。由於 Flutter 框架是以 Dart 撰寫，因此將其編譯為 JavaScript 相對直接。

然而，Flutter 引擎是以 C++ 撰寫，設計上是為了與底層作業系統互動，而非直接與網頁瀏覽器溝通。因此，在 Web 上需要採用不同的方式。

在 Web 平台上，Flutter 提供兩種繪製引擎（renderer）：

<table class="table table-striped">
<tr>
<th>繪製引擎</th>
<th>編譯目標</th>
</tr>

<tr>
<td>CanvasKit
</td>
<td>JavaScript
</td>
</tr>

<tr>
<td>Skwasm
</td>
<td>WebAssembly
</td>
</tr>
</table>

_建構模式_（build modes）是命令列選項，決定你在執行應用程式時可用的繪製引擎。

Flutter 提供兩種 _建構_ 模式：

<table class="table table-striped">
<tr>
<th>建構模式</th>
<th>可用的繪製引擎</th>
</tr>

<tr>
<td>default</td>
<td>CanvasKit</td>
</tr>

<tr>
<td>`--wasm`</td>
<td>Skwasm（優先）、CanvasKit（備用）</td>
</tr>
</table>

預設模式僅提供 CanvasKit 繪製引擎。`--wasm` 選項則會同時提供兩種繪製引擎，並根據瀏覽器的能力選擇引擎：若瀏覽器支援 Skwasm，則優先使用 Skwasm，否則則退回使用 CanvasKit。

{% comment %}
下圖的 draw.io 原始檔位於 /diagrams/resources
{% endcomment %}

![Flutter web 架構圖](/assets/images/docs/arch-overview/web-framework-diagram.png){:width="80%" .diagram-wrap}

與 Flutter 執行於其他平台相比，最顯著的差異之一是：在 Web 上不需要提供 Dart 執行階段。相反地，Flutter 框架（以及你撰寫的任何程式碼）會被編譯為 JavaScript。同時值得一提的是，Dart 在所有模式下（JIT 與 AOT、本地編譯與 Web 編譯）語言語意差異極小，大多數開發者幾乎不會遇到這類差異。

在開發階段，Flutter Web 使用 [`dartdevc`]({{site.dart-site}}/tools/dartdevc)，這是一個支援增量編譯的編譯器，因此可以進行 hot restart 以及[在旗標下啟用 hot reload][hot reload behind a flag]。相對地，當你準備為 Web 建立正式版應用程式時，則會使用 [`dart2js`]({{site.dart-site}}/tools/dart2js)，這是 Dart 高度最佳化的生產用 JavaScript 編譯器，會將 Flutter 核心、框架以及你的應用程式一同封裝成可部署於任何 Web 伺服器的壓縮（minified）原始檔。程式碼可以單檔提供，也可透過[延遲匯入（deferred imports）][deferred imports]分割為多個檔案。

如需更多 Flutter Web 的資訊，請參閱 [Flutter 的 Web 支援][Web support for Flutter] 與 [Web 繪製引擎][Web renderers]。

[deferred imports]: {{site.dart-site}}/language/libraries#lazily-loading-a-library
[Web renderers]: /platform-integration/web/renderers
[Web support for Flutter]: /platform-integration/web

## 進階資訊

若你對 Flutter 內部運作有更深入的興趣，[Inside Flutter](/resources/inside-flutter) 白皮書提供了框架設計理念的實用指南。

[^1]: While the `build` function returns a fresh tree,
  只有在有新設定需要納入時，你才需要回傳 _不同_ 的內容。如果設定實際上相同，你可以直接回傳同一個元件（Widget）。
[^2]: This is a slight simplification for ease of reading.
  實際上，元件樹可能會更複雜。
[^3]: There are some limitations with this approach, for example,
  透明度在平台視圖（platform view）上的合成方式，與其他 Flutter 元件不同。
[^4]: One example is shadows, which have to be approximated with
  以部分精確度換取與 DOM 等價的基礎元件。
