---
title: 建立應用程式
description: 說明如何建立新 Flutter 應用程式的步驟。
layout: tutorial
---

學習建置 Flutter 應用程式的第一步，從建立專案到理解元件 (Widget) 和熱重載。

<YouTubeEmbed id="sE1M2EayFes" title="First steps with Flutter" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: 你將完成的事項
items:
  - title: 使用 CLI 建立新的 Flutter 專案
    icon: terminal
  - title: 理解元件與元件樹
    icon: account_tree
  - title: 執行應用程式並使用熱重載
    icon: bolt
</SummaryCard>

---

### 你將建置的內容

在這個 Flutter 教學的第一節中，
你將建置一個名為「Birdle」的應用程式核心 UI，
這是一個類似於 [Wordle，紐約時報熱門遊戲][Wordle, the popular New York Times game] 的遊戲。

<img src='/assets/images/docs/tutorial/birdle.png' width="320px" class="diagram-wrap" alt="A screenshot that resembles the popular game Wordle.">

在本教學結束時，你將學會建置 Flutter UI 的基本知識，
並且你的應用程式將看起來像下面的螢幕截圖（而且它甚至大部分都能運作 😀）。

[Wordle, the popular New York Times game]: https://www.nytimes.com/games/wordle/index.html


### 建立新的 Flutter 專案

建置 Flutter 應用程式的第一步是建立新專案。
你可以使用 [Flutter CLI 工具][Flutter CLI tool]建立新的應用程式，
它是 Flutter SDK 的一部分。

開啟你的終端機或命令提示字元，執行以下指令來建立新的 Flutter 專案：

```console
$ flutter create birdle --empty
```

這會使用最精簡的「empty」範本建立一個新的 Flutter 專案。

[Flutter CLI tool]: /reference/flutter-cli

### 檢視程式碼

在你的 IDE 中，開啟 `lib/main.dart` 檔案。
從頂部開始，你會看到這段程式碼。

<?code-excerpt "fwe/birdle/lib/step1_main.dart (main)"?>
```dart title="lib/main.dart"
void main() {
  runApp(const MainApp());
}
```

`main` 函式是任何 Dart 程式的進入點，
而 Flutter 應用程式本質上就是一個 **Dart** 程式。
`runApp` 方法是 Flutter SDK 的一部分，
它接受一個**元件**作為引數。
在此範例中，傳入的是 `MainApp` 元件的實例。

在 `main` 函式的正下方，你會找到 `MainApp` 類別的宣告。

<?code-excerpt "fwe/birdle/lib/step1_main.dart (MainApp)"?>
```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}
```

`MainApp` 是**根元件 (root widget)**，
因為它是傳入 `runApp` 的元件。
在這個元件內部，有一個 `build` 方法，
它會回傳另一個名為 `MaterialApp` 的元件。
本質上，這就是 Flutter 應用程式的結構：
由元件組合 (composition) 而成的樹狀結構，稱為**元件樹 (widget tree)**。

作為 Flutter 開發者，你的工作是
將 SDK 中的元件組合成更大的自訂元件，以顯示 UI。

目前，元件樹相當簡單：

<img src='/assets/images/docs/tutorial/initial_widget_tree.png' width="320px" alt="A screenshot that resembles the popular game Wordle.">

### 執行應用程式

1.  在你的終端機中，
    切換到你所建立的 Flutter 應用程式根目錄：

    ```console
    $ cd birdle
    ```

1.  使用 Flutter CLI 工具執行應用程式。

    ```console
    $ flutter run -d chrome
    ```

    應用程式將會建置並在新的 Chrome 視窗中啟動。

<img src='/assets/images/docs/tutorial/hello_world.png' width="320px" alt="A screenshot that resembles the popular game Wordle.">

### 使用熱重載

**有狀態熱重載 (Stateful hot reload)**（如果你之前沒聽過），
能讓正在執行中的 Flutter 應用程式在不到一秒內重新渲染更新後的商業邏輯或 UI 程式碼，
而且不會失去你在應用程式中的操作進度。

在你的 IDE 中，開啟 `main.dart` 檔案，
導覽至第 15 行附近，找到這段程式碼：

<?code-excerpt "fwe/birdle/lib/step1_main.dart (Text)"?>
```dart
child: Text('Hello World!'),
```

將字串內的文字更改為任何你想要的內容。
然後，在應用程式正在執行的終端機中按下 `r` 鍵來熱重載你的應用程式。
正在執行的應用程式應該會立即顯示你更新後的文字。

### 回顧

<SummaryCard expands="false">
title: 你完成了什麼
subtitle: 以下是你在本課程中建置和學習內容的摘要。
completed: true
items:
  - title: 建立了你的第一個 Flutter 專案
    icon: terminal
    details: >-
      你使用了帶有 `--empty` 旗標的 `flutter create` 指令
      來快速建立一個最精簡的 Flutter 專案。
      CLI 會產生專案結構和
      開始所需的樣板程式碼。
  - title: 探索了元件樹
    icon: account_tree
    details: >-
      Flutter UI 是透過將**元件**組合成樹狀結構來建置的。
      `runApp` 函式接受一個根元件，而該元件的
      `build` 方法會回傳其他元件，形成**元件樹**。
      作為 Flutter 開發者，你的工作是
      將這些元件組合成自訂 UI。
  - title: 以熱重載執行了應用程式
    icon: bolt
    details: >-
      你使用 `flutter run` 執行了應用程式，
      並體驗了**有狀態熱重載**，它讓你
      能在不到一秒的時間內看到程式碼變更反映出來，且不會失去應用程式狀態。
      在終端機中按下 `r` 鍵來觸發熱重載。
</SummaryCard>

### 測驗

<Quiz title="Create an App Quiz">
- question: "Flutter 應用程式中 `runApp` 函式的用途是什麼？"
  options:
    - text: 它將 Dart 程式碼編譯成原生機器碼。
      correct: false
      explanation: "編譯發生在應用程式執行之前；`runApp` 使用根元件啟動 Flutter 框架。"
    - text: 它接受一個元件作為引數，並使其成為元件樹的根。
      correct: true
      explanation: "`runApp` 函式會展開指定的元件並將其附加到螢幕上，使其成為元件樹的根。"
    - text: "它為專案建立 `main.dart` 檔案。"
      correct: false
      explanation: "該檔案是由 `flutter create` 建立的；`runApp` 在執行時期呼叫。"
    - text: 它從網路下載 Flutter 相依套件。
      correct: false
      explanation: "相依套件由 `flutter pub get` 管理，而非 `runApp`。"
- question: 如何在終端機中執行 Flutter 應用程式時觸發熱重載？
  options:
    - text: "在終端機中按下 `h` 鍵。"
      correct: false
      explanation: "按下 `h` 會顯示說明選項；`r` 才會觸發熱重載。"
    - text: "在終端機中按下 `r` 鍵。"
      correct: true
      explanation: "在應用程式正在執行的終端機中按下 `r` 鍵會觸發熱重載。"
    - text: "停止並以 `flutter run` 重新啟動應用程式。"
      correct: false
      explanation: 不需要完整重新啟動；熱重載更快。
    - text: 儲存檔案並等待自動重載。
      correct: false
      explanation: "預設情況下，你需要在終端機中按下 `r` 鍵來觸發熱重載。"
</Quiz>
