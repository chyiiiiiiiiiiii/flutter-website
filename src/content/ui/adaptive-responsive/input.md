---
title: 使用者輸入與無障礙性
description: >-
  一個真正自適應（adaptive）的應用程式，
  也會處理不同的使用者輸入方式，
  並且針對有無障礙需求的使用者進行設計。
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

僅僅讓你的應用程式外觀自適應還不夠，
你還必須支援多種使用者輸入（Input）。
滑鼠與鍵盤帶來了超越觸控裝置的輸入型態，
例如滾輪、右鍵點擊、滑鼠懸停互動、Tab 鍵切換（tab traversal）以及鍵盤快捷鍵等。

這些功能中，有些在 Material 元件（Widgets）中預設就能運作。
但如果你建立了自訂元件，則可能需要自行實作這些功能。

一個設計良好的應用程式所涵蓋的某些功能，
同時也能幫助需要協助科技（assistive technologies）的使用者。
舉例來說，除了屬於**良好應用程式設計**之外，
像是 Tab 鍵切換與鍵盤快捷鍵等功能，
對於依賴輔助裝置的使用者來說更是_不可或缺_。
除了[建立無障礙應用程式][creating accessible apps]的標準建議外，本頁也會說明如何打造同時具備
自適應 _與_ 無障礙性的應用程式。

[creating accessible apps]: /ui/accessibility

## 自訂元件的滾輪支援

像 `ScrollView` 或 `ListView` 這類滾動元件（Scrolling Widgets）
預設就支援滾輪操作，幾乎所有可滾動的自訂元件
都是以這些元件為基礎建構，因此也能直接支援滾輪。

如果你需要實作自訂的滾動行為，
可以使用 [`Listener`][`Listener`] 元件，這讓你能自訂 UI
對滾輪的反應方式。

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

使用實體鍵盤的使用者通常期望能透過 Tab 鍵快速瀏覽應用程式，而有動作或視覺障礙的使用者則往往完全依賴鍵盤操作來進行導航。

關於 Tab 鍵互動，有兩個重點需要考量：一是焦點如何從一個元件（Widget）移動到另一個元件，這稱為巡覽（traversal）；二是當元件獲得焦點時所顯示的視覺高亮效果。

大多數內建元件（如按鈕和文字欄位）預設就支援巡覽與焦點高亮。如果你有自訂的元件希望納入巡覽流程，可以使用 [`FocusableActionDetector`][`FocusableActionDetector`] 元件來建立自己的控制項。[`FocusableActionDetector`][`FocusableActionDetector`] 元件則有助於將焦點、滑鼠輸入及快捷鍵整合在同一個元件中。你可以建立一個偵測器（detector），定義動作與按鍵綁定，並提供回呼（callback）以處理焦點與滑鼠懸停的高亮效果。

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

### 控制焦點遍歷順序

若想要更精確地控制使用者按下 Tab 鍵時
元件（Widgets）被聚焦的順序，
你可以使用 [`FocusTraversalGroup`][`FocusTraversalGroup`] 來定義樹狀結構中
在 Tab 鍵操作時應被視為一組的區塊。

舉例來說，你可能希望在 Tab 鍵切換時，
先遍歷表單中的所有欄位，再跳到送出按鈕：

<?code-excerpt "lib/pages/focus_examples_page.dart (focus-traversal-group)"?>
```dart
return Column(
  children: [
    FocusTraversalGroup(child: MyFormWithMultipleColumnsAndRows()),
    SubmitButton(),
  ],
);
```

Flutter 提供了多種內建方式來遍歷元件（Widgets）和群組，預設會使用 `ReadingOrderTraversalPolicy` 類別。
這個類別通常能夠良好運作，但你也可以選擇使用另一個預先定義的 `TraversalPolicy` 類別，或是自行建立自訂策略來進行調整。

[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html

## 鍵盤快速鍵（Keyboard accelerators）

除了 Tab 鍵切換外，桌面端和網頁端的使用者也習慣於將各種鍵盤快速鍵（快捷鍵）綁定到特定動作。
無論是用 `Delete` 鍵快速刪除，還是用 `Control+N` 建立新文件，都請務必考慮使用者所期望的不同快速鍵。
鍵盤是一個非常強大的輸入工具，因此請盡可能提升其效率。
你的使用者會因此受益！

在 Flutter 中，根據你的需求，有幾種方式可以實現鍵盤快速鍵。

如果你有像 `TextField` 或 `Button` 這樣已經擁有 focus node 的單一元件（Widget），你可以將它包裹在 [`KeyboardListener`][`KeyboardListener`] 或 [`Focus`][`Focus`] 元件中，並監聽鍵盤事件：

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

最後一種選項是全域監聽器（global listener）。這種監聽器可用於始終啟用、全應用程式範圍的快捷鍵，或是當面板只要可見時（不論其焦點狀態）都能接受快捷鍵。使用 [`HardwareKeyboard`][`HardwareKeyboard`] 新增全域監聽器非常容易：

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

若要使用全域監聽器檢查組合鍵，可以使用 `HardwareKeyboard.instance.logicalKeysPressed` 集合。例如，像下面這樣的方法可以檢查所提供的任意鍵是否被按住：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (keys-pressed)"?>
```dart
static bool isKeyDown(Set<LogicalKeyboardKey> keys) {
  return keys
      .intersection(HardwareKeyboard.instance.logicalKeysPressed)
      .isNotEmpty;
}
```

將這兩個部分結合起來，
你就可以在按下`Shift+N`時觸發一個動作：

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

使用 static listener 時需要特別注意的一點是，
當使用者正在某個欄位輸入時，或是該 listener 所關聯的元件（Widget）被隱藏時，
你通常需要將其停用。
不像 `Shortcuts` 或 `KeyboardListener`，
這部分需要你自行負責管理。這一點在你為 `Delete` 綁定 Delete/Backspace 快捷鍵時尤其重要，
因為其下可能有子 `TextFields`，而使用者可能正在其中輸入。

[`HardwareKeyboard`]: {{site.api}}/flutter/services/HardwareKeyboard-class.html
[`KeyboardListener`]: {{site.api}}/flutter/widgets/KeyboardListener-class.html

## 自訂元件（Widgets）的滑鼠進入、離開與懸停 {:#custom-widgets}

在桌面端，通常會根據滑鼠懸停於內容上的功能性來變更滑鼠游標。
例如，當你將滑鼠懸停在按鈕上時，通常會看到手型游標，
而懸停在文字上時則會看到 `I` 游標。

Flutter 的 Material 按鈕會自動處理標準按鈕與文字游標的基本焦點狀態。
（值得注意的例外情況是，如果你將 Material 按鈕的預設樣式修改為將 `overlayColor` 設為透明時。）

請為應用程式中的任何自訂按鈕或
手勢偵測器實作焦點狀態。
如果你有更改預設的 Material 按鈕樣式，
請測試鍵盤焦點狀態，並在需要時自行實作。

若要在自訂元件（Widgets）中變更游標，
請使用 [`MouseRegion`][`MouseRegion`]：

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

`MouseRegion` 也很適合用來建立自訂的
滑鼠移入（rollover）和懸停（hover）效果：

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

如果你想參考一個在按鈕獲得焦點時改變按鈕樣式、為其加上外框的範例，可以查看 [Wonderous app 的按鈕程式碼][button code for the Wonderous app]。該應用會修改 [`FocusNode.hasFocus`][`FocusNode.hasFocus`] 屬性來檢查按鈕是否有焦點，若有，則加上外框。

[button code for the Wonderous app]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/common/controls/buttons.dart#L143
[`FocusNode.hasFocus`]: {{site.api}}/flutter/widgets/FocusNode/hasFocus.html

## 視覺密度（Visual density）

你可以考慮將元件（Widget）的「點擊區域（hit area）」放大，以便於在觸控螢幕上操作。

不同的輸入裝置有不同的精確度，因此需要不同大小的點擊區域。Flutter 的 `VisualDensity` 類別讓你可以輕鬆調整整個應用程式中畫面的密度，例如在觸控裝置上將按鈕變大（因此更容易點擊）。

當你為 `MaterialApp` 設定 `VisualDensity` 時，支援該屬性的 `MaterialComponents` 會自動以動畫方式調整密度以符合設定。預設情況下，水平和垂直密度都設為 0.0，但你可以將密度設為任何你想要的正值或負值。只要切換不同的密度值，就能輕鬆調整 UI。

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

若要在你自己的視圖中使用`VisualDensity`，  
你可以這樣查詢：

<?code-excerpt "lib/pages/adaptive_reflow_page.dart (visual-density-own-view)"?>
```dart
VisualDensity density = Theme.of(context).visualDensity;
```

不僅容器會自動對密度（density）的變化做出反應，當密度改變時也會有動畫效果。  
這讓你自訂的元件與內建元件能夠在整個應用程式中實現流暢的轉場效果。

如上所示，`VisualDensity` 是無單位的，因此在不同的視圖中可以代表不同的意義。  
在下列範例中，1 個密度單位等於 6 像素，但這完全取決於你的設定。  
由於它是無單位的，因此具有高度的彈性，並且應該能在大多數情境下正常運作。

值得注意的是，Material 通常會將每個視覺密度單位設為約 4 個邏輯像素。  
如需瞭解支援的元件，請參閱 [`VisualDensity`][`VisualDensity`] API。  
若需進一步瞭解密度設計原則，請參閱 [Material Design guide][Material Design guide]。


[Material Design guide]: {{site.material2}}/design/layout/applying-density.html#usage  
[`VisualDensity`]: {{site.api}}/flutter/material/VisualDensity-class.html

