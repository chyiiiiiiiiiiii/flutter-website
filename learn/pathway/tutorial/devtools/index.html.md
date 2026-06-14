# DevTools

> 學習在開發 Flutter 應用程式時使用 Dart DevTools。



學習使用元件 (Widget) 檢查器與屬性編輯器，來除錯版面配置問題並即時試驗各種屬性。

<YouTubeEmbed id="CIfLE0CShbg" title="Intro to Flutter and Dart DevTools"
  fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: 你將達成的目標
items:
  - title: 使用元件檢查器探索應用程式的元件樹
    icon: account_tree
  - title: 學習除錯版面配置問題，例如無界約束
    icon: bug_report
  - title: 即時試驗各種屬性
    icon: tune
</SummaryCard>

---

### 簡介

隨著 Flutter 應用程式的複雜度增加，理解每個元件屬性如何影響 UI 變得更加重要。
[Dart 與 Flutter DevTools][] 提供了兩個特別實用的功能：
**元件檢查器** 與 **屬性編輯器**。

首先，在應用程式以除錯模式執行的情況下，透過以下指令啟動 DevTools。
請在**與應用程式執行不同的終端機視窗**中執行此指令：

```console
$ dart devtools
```

執行此指令會啟動 DevTools 伺服器，並在瀏覽器中開啟介面。

若要將 DevTools 連接至正在執行的應用程式：

1. 在應用程式執行的終端機中找到印出的 DevTools URL（例如：
   `Serving DevTools at http://127.0.0.1:9101`）。
2. 複製此 URL。
3. 將其貼入 DevTools 瀏覽器頁面的連接列中。

:::note 在 IDE 中執行

只要安裝了對應的 Flutter 插件，你也可以直接在 Code OSS 系列編輯器（例如 [VS Code][]）以及
[IntelliJ 與 Android Studio][IntelliJ and Android Studio] 中執行 DevTools。
本課程的截圖均來自 VS Code。
:::

[Dart 與 Flutter DevTools]: /tools/devtools
[VS Code]: /tools/vs-code
[IntelliJ and Android Studio]: /tools/android-studio

### 元件檢查器

元件檢查器讓你能夠視覺化並探索元件樹。
它幫助你理解 UI 的版面配置，並找出負責畫面各個部分的元件。
針對你目前建置的應用程式執行後，檢查器的外觀如下：

<img src='/assets/images/docs/tutorial/widget_inspector.png'
  width="320px" alt="A screenshot of the Flutter widget inspector tool.">

以你在本節中建立的 `GamePage` 元件為例：

```dart
class GamePage extends StatelessWidget {
  GamePage({super.key});

  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (var guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
                for (var letter in guess) Tile(letter.char, letter.type)
              ]
            ),
        ],
      ),
    );
  }
}
```

以及它在 `MainApp` 中的使用方式：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(child: GamePage()),
      ),
    );
  }
}
```

在元件檢查器中，你應該會看到與程式碼中完全相同的元件樹：
以 `MaterialApp` 為根節點，`Scaffold` 作為其 `home`，
`AppBar` 作為其 `appBar`，以此類推，一路延伸至含有 `Tile` 子元件的 `Row` 元件。
你可以在樹中選擇任何元件，查看其屬性，
甚至直接跳至 IDE 中對應的原始碼。

### 除錯版面配置問題

元件檢查器在除錯版面配置問題時或許最為實用。

在某些情況下，元件的[約束條件（constraints）][constraints]是無界的（unbounded），也就是無限大。
這表示最大寬度或最大高度被設定為 [`double.infinity`][]。
若一個元件嘗試盡可能地擴展，在受到無界約束時將無法正常運作，並且在除錯模式下會拋出例外。

渲染盒（render box）出現無界約束最常見的情況，是在彈性盒元件（[`Row`][] 或 [`Column`][]）內部，
以及在可捲動區域內（例如 [`ListView`][] 或 [`ScrollView`][] 的子類別）。

例如，`ListView` 會嘗試在交叉軸方向上擴展以填滿可用空間，
例如垂直捲動的區塊嘗試與父元件等寬。
如果你將垂直捲動的 `ListView` 嵌套在水平捲動的 `ListView` 內，
內層清單會嘗試盡可能地寬，而由於外層在該方向上是可捲動的，
因此寬度將會是無限大。

建置 Flutter 應用程式時最常遇到的錯誤，
可能就是錯誤使用版面配置元件所導致的。
這個錯誤被稱為「無界約束（unbounded constraints）」錯誤。

觀看以下影片，了解如何識別並解決此問題。

<YouTubeEmbed id="jckqXR5CrPI"
  title="Decoding Flutter: Unbounded height and width"></YouTubeEmbed>

[constraints]: /ui/layout/constraints
[`double.infinity`]: https://api.flutter.dev/flutter/dart-core/double/infinity-constant.html
[`Column`]: https://api.flutter.dev/flutter/widgets/Column-class.html
[`Row`]: https://api.flutter.dev/flutter/widgets/Row-class.html
[`ListView`]: https://api.flutter.dev/flutter/widgets/ListView-class.html
[`ScrollView`]: https://api.flutter.dev/flutter/widgets/ScrollView-class.html

### 屬性編輯器

在元件檢查器中選取元件後，屬性編輯器會顯示該元件的所有屬性。
這是一個強大的工具，可以幫助你理解元件呈現特定外觀的原因，
並能即時試驗屬性值的變更。

<img src='/assets/images/docs/tutorial/property_editor.png'
  width="320px" alt="A screenshot of the Flutter property editor tool.">

回顧稍早 `Tile` 元件的 `build` 方法：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
    );
  }
}
```

如果在元件檢查器中選取 `Tile` 內的 `Container` 元件，
屬性編輯器會顯示其 `width`（60）、`height`（60）以及 `decoration` 屬性。
接著你可以展開 `BoxDecoration`，查看 `border` 和 `color` 屬性。

對於許多屬性，你甚至可以直接在屬性編輯器中修改其值。
例如，若要快速測試 `Tile` 元件中 `Container` 的不同 `width` 或 `height` 效果，
只需在屬性編輯器中更改數值即可。
此工具會將更新直接寫回磁碟上的 `.dart` 原始檔，
讓你在儲存或觸發熱重載（hot reload）後，
能夠立即在執行中的應用程式上看到視覺效果。
這使得 UI 設計的迭代速度大幅提升。

### 回顧

<SummaryCard>
title: 你完成了什麼
subtitle: 以下是本課程中你建置與學習的摘要。
completed: true
items:
  - title: 使用元件檢查器探索了應用程式的元件樹
    icon: account_tree
    details: >-
      元件檢查器讓你能夠視覺化整個元件樹、
      選取任意元件查看其屬性，
      並直接跳至對應的原始碼。
      這是理解應用程式結構不可或缺的工具。
  - title: 學習了常見的版面配置問題
    icon: bug_report
    details: >-
      你學習了**無界約束（unbounded constraints）**，
      這是 Flutter 開發中最常見的錯誤之一。
      當 `Row`、`Column` 或 `ListView` 等元件接收到無限約束時，就會發生此問題。
      現在你已能辨識並修復這類問題。
  - title: 即時試驗了各種屬性
    icon: tune
    details: >-
      屬性編輯器會顯示所選元件的所有屬性，
      並讓你直接將修改寫入磁碟，
      讓你在儲存或觸發熱重載後立即看到更新效果。
      這使得微調 UI 時的迭代更加快速。
</SummaryCard>

### 自我測驗

<Quiz title="DevTools 測驗">
- question: Flutter 中「無界約束」錯誤的常見原因是什麼？
  options:
    - text: 在元件樹中使用了過多的 StatefulWidget。
      correct: false
      explanation: StatefulWidget 的使用不會導致無界約束。
    - text: 將嘗試無限擴展的元件放置在沒有適當約束的可捲動或彈性容器內。
      correct: true
      explanation: 例如將 ListView 放入 Row 內，或是巢狀的可捲動元件，可能會接收到無限約束並造成錯誤。
    - text: 資料變更後忘記呼叫 setState。
      correct: false
      explanation: 缺少 setState 會導致 UI 無法更新，而非約束錯誤。
    - text: 使用 Container 時未指定顏色。
      correct: false
      explanation: 顏色是可選的，與版面配置約束無關。
- question: 在 Flutter DevTools 中，元件檢查器能做什麼？
  options:
    - text: 自動為你的元件產生單元測試。
      correct: false
      explanation: 元件檢查器用於視覺化與除錯，而非測試產生。
    - text: 視覺化元件樹、選取元件查看屬性，並跳至原始碼。
      correct: true
      explanation: 元件檢查器讓你能夠探索應用程式結構、檢查元件屬性，並導覽至對應的原始碼。
    - text: 直接將應用程式部署至應用程式商店。
      correct: false
      explanation: 部署需另行處理；元件檢查器用於除錯。
    - text: 編輯應用程式的主題顏色與字型排版。
      correct: false
      explanation: 主題編輯需要修改程式碼；元件檢查器用於檢查目前狀態。
</Quiz>

