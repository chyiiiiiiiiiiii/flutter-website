---
title: 使用者輸入與無障礙性
description: >-
  一個真正自適應（adaptive）的應用程式，
  也必須處理使用者輸入方式的差異，
  並針對有無障礙需求的使用者進行設計。
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

僅僅讓你的應用程式外觀自適應還不夠，
你還必須支援各種不同的使用者輸入（Input）。
滑鼠與鍵盤帶來了比觸控裝置更多樣的輸入類型，
例如滾輪、右鍵點擊、滑鼠懸停互動、Tab 鍵切換（tab traversal）以及鍵盤快捷鍵等。

其中有些功能在 Material 元件（Widgets）中預設就能運作。
但如果你建立了自訂元件，可能需要自行實作這些功能。

一些良好設計的應用程式所涵蓋的功能，
同時也能幫助使用輔助技術的使用者。
例如，除了屬於**良好應用設計**之外，
像 Tab 鍵切換（tab traversal）與鍵盤快捷鍵這類功能，
對於使用輔助裝置的使用者來說更是_不可或缺_。
除了標準的
[建立無障礙應用程式][creating accessible apps]建議外，本頁還介紹了
如何打造同時具備自適應_與_無障礙性的應用程式。

[creating accessible apps]: /ui/accessibility

## 自訂元件的滾輪支援

像 `ScrollView` 或 `ListView` 這類滾動元件（Scrolling Widgets），
預設就支援滑鼠滾輪，幾乎所有可滾動的自訂元件
也都是基於這些元件所建構，因此同樣能支援滾輪操作。

如果你需要實作自訂的滾動行為，
可以使用 [`Listener`][`Listener`] 元件，這能讓你
自訂 UI 如何回應滑鼠滾輪事件。

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (pointer-scroll)"?>
```dart
return Listener(
  onPointerSignal: (event) {
    if (event is PointerScrollEvent) print(event.scrollDelta.dy);
  },
  child: ListView(),
);
```

[`Listener`]: {{site.api}}/flutter/widgets/Listener-class.html

## Tab 鍵巡覽與焦點互動

使用實體鍵盤的使用者預期可以透過 Tab 鍵快速瀏覽應用程式，而有動作或視覺障礙的使用者則經常完全依賴鍵盤導覽。

針對 Tab 鍵互動有兩個重點考量：一是焦點如何在元件（Widget）間移動，這稱為「巡覽（traversal）」；二是當元件獲得焦點時所顯示的視覺高亮效果。

大多數內建元件（如按鈕和文字欄位）預設就支援巡覽與焦點高亮。如果你有自訂元件希望納入巡覽，可以使用 [`FocusableActionDetector`][`FocusableActionDetector`] 元件來建立自己的控制項。[`FocusableActionDetector`][`FocusableActionDetector`] 元件則有助於將焦點、滑鼠輸入和快捷鍵整合在同一個元件中。你可以建立一個偵測器，定義動作與按鍵綁定，並提供回呼來處理焦點與滑鼠懸停的高亮效果。

<?code-excerpt "lib/pages/focus_examples_page.dart (focusable-action-detector)"?>
```dart
class _BasicActionDetectorState extends State<BasicActionDetector> {
  bool _hasFocus = false;
  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onFocusChange: (value) => setState(() => _hasFocus = value),
      actions: <Type, Action<Intent>>{
        ActivateIntent: CallbackAction<Intent>(
          onInvoke: (intent) {
            print('Enter or Space was pressed!');
            return null;
          },
        ),
      },
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const FlutterLogo(size: 100),
          // Position focus in the negative margin for a cool effect
          if (_hasFocus)
            Positioned(
              left: -4,
              top: -4,
              bottom: -4,
              right: -4,
              child: _roundedBorder(),
            ),
        ],
      ),
    );
  }
}
```

[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`FocusableActionDetector`]: {{site.api}}/flutter/widgets/FocusableActionDetector-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html

### 控制遍歷順序

若想更精確地控制使用者透過 Tab 鍵切換時，元件（Widget）獲得焦點的順序，可以使用 [`FocusTraversalGroup`][`FocusTraversalGroup`] 來定義樹狀結構中，在 Tab 操作時應被視為一組的區塊。

例如，你可能希望在 Tab 鍵切換時，先遍歷表單中的所有欄位，再切換到送出按鈕：

<?code-excerpt "lib/pages/focus_examples_page.dart (focus-traversal-group)"?>
```dart
return Column(
  children: [
    FocusTraversalGroup(child: MyFormWithMultipleColumnsAndRows()),
    SubmitButton(),
  ],
);
```

Flutter 提供了多種內建方式來遍歷元件（Widgets）與群組，預設會使用 `ReadingOrderTraversalPolicy` 類別。
這個類別通常運作良好，但你也可以透過其他預先定義的 `TraversalPolicy` 類別，或是自行建立自訂策略來進行修改。

[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html

## 鍵盤快速鍵（Keyboard accelerators）

除了 Tab 鍵遍歷之外，桌面與網頁使用者也習慣於將各種鍵盤快速鍵綁定到特定動作。
無論是用 `Delete` 鍵來快速刪除，還是用 `Control+N` 建立新文件，都請務必考慮使用者所期待的各種快速鍵。
鍵盤是一個強大的輸入工具，請盡可能地發揮其效率。
你的使用者一定會感激這一點！

在 Flutter 中，根據你的目標，有幾種方式可以實現鍵盤快速鍵。

如果你有單一元件（Widget），像是 `TextField` 或 `Button`，而且它已經有 focus node，你可以將它包裹在 [`KeyboardListener`][`KeyboardListener`] 或 [`Focus`][`Focus`] 元件中，並監聽鍵盤事件：

<?code-excerpt "lib/pages/focus_examples_page.dart (focus-keyboard-listener)"?>
```dart
  @override
  Widget build(BuildContext context) {
    return Focus(
      onKeyEvent: (node, event) {
        if (event is KeyDownEvent) {
          print(event.logicalKey);
        }
        return KeyEventResult.ignored;
      },
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 400),
        child: const TextField(
          decoration: InputDecoration(border: OutlineInputBorder()),
        ),
      ),
    );
  }
}
```

若要將一組鍵盤快捷鍵套用到樹狀結構中的大區塊，請使用 [`Shortcuts`][`Shortcuts`] 元件（Widget）：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (shortcuts)"?>
```dart
// Define a class for each type of shortcut action you want
class CreateNewItemIntent extends Intent {
  const CreateNewItemIntent();
}

Widget build(BuildContext context) {
  return Shortcuts(
    // Bind intents to key combinations
    shortcuts: const <ShortcutActivator, Intent>{
      SingleActivator(LogicalKeyboardKey.keyN, control: true):
          CreateNewItemIntent(),
    },
    child: Actions(
      // Bind intents to an actual method in your code
      actions: <Type, Action<Intent>>{
        CreateNewItemIntent: CallbackAction<CreateNewItemIntent>(
          onInvoke: (intent) => _createNewItem(),
        ),
      },
      // Your sub-tree must be wrapped in a focusNode, so it can take focus.
      child: Focus(autofocus: true, child: Container()),
    ),
  );
}
```

[`Shortcuts`][`Shortcuts`] 元件（Widget）很實用，因為它只允許在此元件樹或其子元件之一具有焦點且可見時，才會觸發快捷鍵。

最後一個選項是全域監聽器（global listener）。這種監聽器可用於始終啟用、全應用程式範圍的快捷鍵，或是當面板可見時即可接受快捷鍵（無論其焦點狀態為何）。使用 [`HardwareKeyboard`][`HardwareKeyboard`] 新增全域監聽器非常簡單：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (hardware-keyboard)"?>
```dart
@override
void initState() {
  super.initState();
  HardwareKeyboard.instance.addHandler(_handleKey);
}

@override
void dispose() {
  HardwareKeyboard.instance.removeHandler(_handleKey);
  super.dispose();
}
```

若要使用全域監聽器檢查按鍵組合，可以使用 `HardwareKeyboard.instance.logicalKeysPressed` 集合。例如，像下面這樣的方法可以檢查所提供的任一按鍵是否正被按住：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (keys-pressed)"?>
```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
  return keys
      .intersection(HardwareKeyboard.instance.logicalKeysPressed)
      .isNotEmpty;
}
```

結合這兩個部分後，
你可以在按下 `Shift+N` 時觸發一個動作：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (handle-key)"?>
```dart
bool _handleKey(KeyEvent event) {
  bool isShiftDown = isKeyDown({
    LogicalKeyboardKey.shiftLeft,
    LogicalKeyboardKey.shiftRight,
  });

  if (isShiftDown && event.logicalKey == LogicalKeyboardKey.keyN) {
    _createNewItem();
    return true;
  }

  return false;
}
```

使用 static listener 時需要特別注意的一點是，當使用者正在某個欄位輸入時，或是該 listener 所關聯的元件（Widget）被隱藏時，通常需要將其停用。這與 `Shortcuts` 或 `KeyboardListener` 不同，這部分需要你自行負責管理。這一點在你為 `Delete` 綁定 Delete/Backspace 快捷鍵時尤其重要，因為其下可能有子 `TextFields`，而使用者可能正在其中輸入。

[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`KeyboardListener`]: {{site.api}}/flutter/widgets/KeyboardListener-class.html

## 自訂元件（Widgets）的滑鼠進入、離開與懸停 {:#custom-widgets}

在桌面端，常見的做法是根據滑鼠懸停於內容上時，改變滑鼠游標，以提示該內容的功能。例如，當你將滑鼠懸停在按鈕上時，通常會看到手型游標；而懸停在文字上時，則會看到 `I` 游標。

Flutter 的 Material 按鈕會自動處理標準按鈕與文字游標的基本焦點狀態。
（值得注意的例外是，如果你將 Material 按鈕的預設樣式修改為將 `overlayColor` 設為透明時，這個行為會有所不同。）

請為應用程式中的任何自訂按鈕或手勢偵測器（gesture detectors）實作焦點狀態。
如果你有修改預設的 Material 按鈕樣式，請測試鍵盤焦點狀態，並在需要時自行實作。

若要在自訂元件（Widgets）中變更游標，請使用 [`MouseRegion`][`MouseRegion`]：

<?code-excerpt "lib/pages/focus_examples_page.dart (mouse-region)"?>
```dart
// Show hand cursor
return MouseRegion(
  cursor: SystemMouseCursors.click,
  // Request focus when clicked
  child: GestureDetector(
    onTap: () {
      Focus.of(context).requestFocus();
      _submit();
    },
    child: Logo(showBorder: hasFocus),
  ),
);
```

`MouseRegion` 也適用於建立自訂的
滑鼠移入（rollover）與懸停（hover）效果：

<?code-excerpt "lib/pages/focus_examples_page.dart (mouse-over)"?>
```dart
return MouseRegion(
  onEnter: (_) => setState(() => _isMouseOver = true),
  onExit: (_) => setState(() => _isMouseOver = false),
  onHover: (e) => print(e.localPosition),
  child: Container(
    height: 500,
    color: _isMouseOver ? Colors.blue : Colors.black,
  ),
);
```

如果你想參考一個在按鈕獲得焦點時，將按鈕樣式改為外框的範例，可以查看 [Wonderous app 的按鈕程式碼][button code for the Wonderous app]。該應用程式會修改 [`FocusNode.hasFocus`][`FocusNode.hasFocus`] 屬性來檢查按鈕是否具有焦點，若有，則加上外框。

[button code for the Wonderous app]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/common/controls/buttons.dart#L143
[`FocusNode.hasFocus`]: {{site.api}}/flutter/widgets/FocusNode/hasFocus.html

## 視覺密度（Visual density）

你可能會考慮將元件（Widget）的「點擊區域」放大，以適應觸控螢幕等裝置。

不同的輸入裝置有不同的精確度，因此需要不同大小的點擊區域。Flutter 的 `VisualDensity` 類別讓你可以輕鬆調整整個應用程式中視圖的密度，例如，讓按鈕在觸控裝置上變得更大（因此更容易點擊）。

當你為 `MaterialApp` 設定 `VisualDensity` 時，支援此功能的 `MaterialComponents` 會自動以動畫方式調整密度以符合設定。預設情況下，水平與垂直密度都設為 0.0，但你可以將密度設為任何正值或負值。透過切換不同的密度值，你可以輕鬆調整 UI。

![Adaptive scaffold](/assets/images/docs/ui/adaptive-responsive/adaptive_scaffold.webp){:width="100%"}

若要設定自訂的視覺密度，請將密度注入到你的 `MaterialApp` 主題中：

<?code-excerpt "lib/main.dart (visual-density)"?>
```dart
double densityAmt = touchMode ? 0.0 : -1.0;
VisualDensity density = VisualDensity(
  horizontal: densityAmt,
  vertical: densityAmt,
);
return MaterialApp(
  theme: ThemeData(visualDensity: density),
  home: MainAppScaffold(),
  debugShowCheckedModeBanner: false,
);
```

若要在你自己的視圖中使用 `VisualDensity`，  
你可以這樣查找：

<?code-excerpt "lib/pages/adaptive_reflow_page.dart (visual-density-own-view)"?>
```dart
VisualDensity density = Theme.of(context).visualDensity;
```

不僅容器會自動對密度（density）的變化做出反應，當密度發生變化時，容器還會產生動畫效果。  
這使你的自訂元件（custom components）與內建元件（built-in components）能夠協同運作，  
在整個應用程式中實現流暢的轉場效果。

如上所示，`VisualDensity` 是無單位（unit-less）的，  
因此在不同的檢視（views）中可能代表不同的意義。  
在下列範例中，1 個密度單位等於 6 個像素（pixels），  
但這完全可以由你自行決定。  
由於它是無單位的，讓它非常靈活，  
也能適用於大多數情境。

值得注意的是，Material 通常會將每個視覺密度單位（visual density unit）設為約 4 個邏輯像素（logical pixels）。  
如需更多支援元件的相關資訊，請參閱 [`VisualDensity`][`VisualDensity`] API。  
若想進一步了解密度（density）設計原則，請參閱 [Material Design guide][Material Design guide]。


[Material Design guide]: {{site.material2}}/design/layout/applying-density.html#usage  
[`VisualDensity`]: {{site.api}}/flutter/material/VisualDensity-class.html

