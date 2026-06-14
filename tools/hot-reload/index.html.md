# 熱重載（Hot reload）

> 利用 Flutter 的熱重載功能加速開發流程。



<?code-excerpt path-base="tools"?>

Flutter 的熱重載（hot reload）功能能幫助你快速且輕鬆地進行實驗、建置 UI、加入新功能與修復錯誤。
熱重載的原理是將已更新的原始碼檔案注入至 [Dart 執行階段][Dart runtime]。
Dart 執行階段將類別的欄位與函式更新為新版本後，Flutter 框架會自動重建元件 (Widget) 樹，
讓你能立即看到修改後的效果。

![Hot reload GIF](/assets/images/docs/tools/hot-reload.gif){:width="100%"}<br>
在 DartPad 中示範熱重載

## 如何執行熱重載

如果你使用的是 AI 程式輔助工具，例如 [Google Antigravity](/ai/antigravity)，
可以使用 Agent 模式在提示 agent 套用變更後，自動對執行中的應用程式進行熱重載。
詳細資訊請參閱 [Agentic Hot Reload](/ai/antigravity#agentic-hot-reload)。

若要手動對 Flutter 應用程式進行熱重載，請依下列步驟操作：

 1. 從支援的 [Flutter 編輯器][Flutter editor] 或終端機視窗執行應用程式。
    目標裝置可以是實體裝置或虛擬裝置。
    **僅限於偵錯模式（debug mode）下的 Flutter 應用程式才能進行熱重載或熱重啟。**
 1. 修改專案中的其中一個 Dart 檔案。
    大多數類型的程式碼變更都可以熱重載；
    若需查看哪些變更需要進行熱重啟，請參考 [特殊情境](#special-cases)。
 1. 如果你使用的 IDE/編輯器支援 Flutter 的 IDE 工具，且已啟用儲存時自動熱重載（hot reload on save），
    請選擇 **全部儲存**（`cmd-s`/`ctrl-s`），
    或點擊工具列上的熱重載按鈕。

    <a id="hot-reload-on-save" aria-hidden="true"></a>

    :::tip 如何啟用儲存時自動熱重載
    請在你偏好的 IDE 中，啟用自動儲存（autosave）及儲存時自動熱重載（hot reloads on save）。

    **VS Code**

    請將以下內容加入你的 `.vscode/settings.json` 檔案中：

    ```json
    "files.autoSave": "afterDelay",
    "dart.flutterHotReloadOnSave": "all",
    ```

    **Android Studio 與 IntelliJ**

    * 開啟 `Settings > Tools > Actions on Save` 並選擇
      `Configure autosave options`。
        - 勾選 `Save files if the IDE is idle for X seconds` 選項。
        - **建議：** 設定較短的延遲時間，例如 2 秒。

    * 開啟 `Settings > Languages & Frameworks > Flutter`。
        - 勾選 `Perform hot reload on save` 選項。
    :::

    如果你是使用命令列以 `flutter run` 執行應用程式，
    請在終端機視窗中輸入 `r`。

在成功執行熱重載操作後，
你會在主控台（console）看到類似以下的訊息：

```console
Performing hot reload...
Reloaded 1 of 448 libraries in 978ms.
```

應用程式會即時反映你的變更，
且目前的應用程式狀態會被保留。
你的應用程式會從執行熱重載指令前的狀態繼續執行。
程式碼更新後，執行流程會繼續。

<a id="hot-restart" aria-hidden="true"></a>

:::secondary
**Hot reload、hot restart 與 full restart 有什麼不同？**

* **Hot reload（熱重載）** 會將程式碼變更載入至 VM 或瀏覽器，
  並重新建構元件樹，同時保留應用程式狀態；
  它不會重新執行 `main()` 或 `initState()`。
  （IntelliJ 與 Android Studio 中為 `⌘\`，VSCode 中為 `⌃F5`）
* **Hot restart（熱重啟）** 會將程式碼變更載入至 VM 或瀏覽器，
  並重新啟動 Flutter 應用程式，應用程式狀態會遺失。
  在網頁端，這可以在不重新整理整個頁面的情況下重啟應用程式。
  （IntelliJ 與 Android Studio 中為 `⇧⌘\`，VSCode 中為 `⇧⌘F5`）
* **Full restart（完整重啟）** 會重新啟動 iOS、Android 或網頁應用程式。
  這個動作較耗時，因為它同時會重新編譯
  Java / Kotlin / Objective-C / Swift / JavaScript 程式碼。
  在網頁端，也會重新啟動 Dart Development Compiler。
  此操作沒有專屬的鍵盤快捷鍵；
  你需要手動停止並重新啟動執行組態。

Flutter Web 現已支援 hot restart 以及 [hot reload][]。
:::

[hot reload]: /platform-integration/web/building#hot-reload-web

![Android Studio UI](/assets/images/docs/development/tools/android-studio-run-controls.png){:width="100%"}<br>
Android Studio 中的執行、偵錯執行、hot reload 與 hot restart 控制項

只有當修改過的 Dart 程式碼在變更後再次執行時，程式碼變更才會產生可見效果。具體來說，
熱重載會導致所有現有的元件重新建構。
只有參與元件重建的程式碼會自動再次執行。例如，`main()` 與 `initState()`
函式不會被再次執行。

## 特殊情境 {:#special-cases}

接下來的章節將說明涉及熱重載的特定情境。
在某些情況下，對 Dart 程式碼做小幅修改即可讓你繼續使用熱重載。
但在其他情況下，則需要熱重啟或完整重啟（full restart）。

### 應用程式被終止

當應用程式被終止時，熱重載可能會失效。
例如，如果應用程式在背景執行過久。

### 編譯錯誤

當程式碼變更導致編譯錯誤時，
熱重載會產生類似以下的錯誤訊息：

```plaintext
Hot reload was rejected:
'/path/to/project/lib/main.dart': warning: line 16 pos 38: unbalanced '{' opens here
  Widget build(BuildContext context) {
                                     ^
'/path/to/project/lib/main.dart': error: line 33 pos 5: unbalanced ')'
    );
    ^
```

在這種情況下，只需修正 Dart 程式碼中指定行的錯誤，即可繼續使用熱重載。

### CupertinoTabView 的 builder

對 `CupertinoTabView` 的 `builder` 所做的變更，熱重載將不會套用。
如需更多資訊，請參閱 [Issue 43574][]。

### 列舉型別（Enumerated types）

當列舉型別（enumerated types）變更為一般類別，或一般類別變更為列舉型別時，熱重載將無法運作。

例如：

變更前：
<?code-excerpt "lib/hot-reload/before.dart (enum)"?>
```dart
enum Color { red, green, blue }
```

變更後：
<?code-excerpt "lib/hot-reload/after.dart (enum)"?>
```dart
class Color {
  Color(this.i, this.j);
  final int i;
  final int j;
}
```

### 泛型類型

當泛型類型（generic type）宣告被修改時，熱重載將無法運作。例如，下列情況將無法支援：

修改前：
<?code-excerpt "lib/hot-reload/before.dart (class)"?>
```dart
class A<T> {
  T? i;
}
```

變更後：
<?code-excerpt "lib/hot-reload/after.dart (class)"?>
```dart
class A<T, V> {
  T? i;
  V? v;
}
```

### 原生程式碼

如果你修改了原生程式碼（例如 Kotlin、Java、Swift 或 Objective-C），必須執行完整重啟（停止並重新啟動應用程式）才能讓變更生效。

### 先前狀態與新程式碼結合

Flutter 的有狀態熱重載（stateful hot reload）會保留應用程式的狀態。這種方式讓你可以只查看最近一次變更的效果，而不會丟失目前的狀態。例如，如果你的應用程式需要使用者登入，你可以在導覽階層中較深層的頁面進行修改並進行熱重載，而無需重新輸入登入憑證。狀態會被保留，這通常是預期的行為。

如果程式碼變更影響到應用程式的狀態（或其相依性），應用程式可用的資料可能就不會完全與從頭執行時一致。因此，熱重載後的行為可能會與熱重啟後不同。

### 最近的程式碼變更已包含，但應用程式狀態未包含

在 Dart 中，[靜態欄位是延遲初始化的][static-variables]。這表示當你第一次執行 Flutter 應用程式並讀取靜態欄位時，它會被設為初始值運算式所計算出的值。全域變數與靜態欄位會被視為狀態，因此在熱重載期間不會重新初始化。

如果你變更了全域變數與靜態欄位的初始值，則必須進行熱重啟或重啟持有初始值的狀態，才能看到變更效果。例如，請參考以下程式碼：

<?code-excerpt "lib/hot-reload/before.dart (sample-table)"?>
```dart
final sampleTable = [
  Table(
    children: const [
      TableRow(children: [Text('T1')]),
    ],
  ),
  Table(
    children: const [
      TableRow(children: [Text('T2')]),
    ],
  ),
  Table(
    children: const [
      TableRow(children: [Text('T3')]),
    ],
  ),
  Table(
    children: const [
      TableRow(children: [Text('T4')]),
    ],
  ),
];
```

在執行應用程式後，請進行以下變更：

<?code-excerpt "lib/hot-reload/after.dart (sample-table)"?>
```dart
final sampleTable = [
  Table(
    children: const [
      TableRow(children: [Text('T1')]),
    ],
  ),
  Table(
    children: const [
      TableRow(children: [Text('T2')]),
    ],
  ),
  Table(
    children: const [
      TableRow(children: [Text('T3')]),
    ],
  ),
  Table(
    children: const [
      TableRow(
        children: [Text('T10')], // modified
      ),
    ],
  ),
];
```

你進行了熱重載，但變更沒有反映出來。

相反地，在以下範例中：

<?code-excerpt "lib/hot-reload/before.dart (const)"?>
```dart
const foo = 1;
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

第一次執行應用程式時，會印出 `1` 和 `1`。
接著，你進行了以下修改：

<?code-excerpt "lib/hot-reload/after.dart (const)"?>
```dart
const foo = 2; // modified
final bar = foo;
void onClick() {
  print(foo);
  print(bar);
}
```

當 `const` 欄位的值發生變化時，這些變化總是會被熱重載，
但靜態欄位初始化器（static field initializer）不會重新執行。從概念上來說，
`const` 欄位被視為別名（alias），而不是狀態（state）。

Dart VM 會偵測初始化器的變更，並在需要熱重啟才能生效時進行標記。
在上述範例中，大部分的初始化作業都會觸發這個標記機制，
但像以下這種情況則不會：

<?code-excerpt "lib/hot-reload/after.dart (final-foo)"?>
```dart
final bar = foo;
```

若要在熱重載後更新 `foo` 並查看變更，請考慮將該欄位重新定義為 `const`，或使用 getter 來回傳值，而非使用 `final`。例如，以下任一解決方案皆可行：

<?code-excerpt "lib/hot-reload/foo_const.dart (const)"?>
```dart
const foo = 1;
const bar = foo; // Convert foo to a const...
void onClick() {
  print(foo);
  print(bar);
}
```

<?code-excerpt "lib/hot-reload/getter.dart (const)"?>
```dart
const foo = 1;
int get bar => foo; // ...or provide a getter.
void onClick() {
  print(foo);
  print(bar);
}
```

如需更多資訊，請參閱 Dart 中 [`const` 與 `final` 關鍵字的差異][const-new]。

### 最近的 UI 變更未被套用

即使熱重載操作看似成功且未產生任何例外，有些程式碼變更仍可能不會在重新整理後的 UI 中顯示出來。這種情況在修改應用程式的 `main()` 或 `initState()` 方法後很常見。

一般來說，如果修改的程式碼位於根元件的 `build()` 方法之下，則熱重載會如預期運作。然而，如果修改的程式碼在重建元件樹時不會被重新執行，那麼在熱重載後你將無法看到其效果。

例如，請參考以下程式碼：

<?code-excerpt "lib/hot-reload/before.dart (build)"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(onTap: () => print('tapped'));
  }
}
```

執行此應用程式後，請將程式碼修改如下：

<?code-excerpt "lib/hot-reload/after.dart (main)"?>
```dart
import 'package:flutter/widgets.dart';

void main() {
  runApp(const Center(child: Text('Hello', textDirection: TextDirection.ltr)));
}
```

使用熱重啟時，程式會從頭開始執行，
執行新的 `main()` 版本，
並建立一個元件樹，顯示文字 `Hello`。

然而，如果你在這個變更後進行熱重載，
`main()` 和 `initState()` 不會被重新執行，
元件樹會以未變更的 `MyApp` 實例作為根元件重新建立。
因此，熱重載後畫面不會有任何可見變化。

## 運作原理

當熱重載被觸發時，主機會檢查自上次編譯以來被編輯過的程式碼。
以下函式庫（libraries）會被重新編譯：

* 任何有程式碼變更的函式庫
* 應用程式的主函式庫（main library）
* 從主函式庫到受影響函式庫之間的所有函式庫

這些函式庫的原始碼會被編譯成
[kernel files][]，並傳送到行動裝置上的 Dart VM。

Dart VM 會從新的 kernel file 重新載入所有函式庫。
此時，尚未有任何程式碼被重新執行。

接著，熱重載機制會讓 Flutter 框架
觸發所有現有元件與繪製物件（render objects）的重建／重新排版／重新繪製。

[static-variables]: https://dart.dev/language/classes#static-variables
[const-new]: https://dart.dev/language/variables#final-and-const
[Dart runtime]: https://dart.dev/overview#platform
[Flutter editor]: /tools/editors
[Issue 43574]: https://github.com/flutter/flutter/issues/43574
[kernel files]: https://github.com/dart-lang/sdk/tree/main/pkg/kernel

