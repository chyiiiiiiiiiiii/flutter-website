---
title: 理解 Flutter 的鍵盤焦點系統
description: 如何在你的 Flutter 應用程式中使用焦點系統。
---

本文說明如何控制鍵盤輸入的導向位置。如果你正在開發需要實體鍵盤的應用程式（例如大多數桌面與網頁應用程式），這一頁將對你有幫助。如果你的應用程式不會搭配實體鍵盤使用，可以略過本頁內容。

## 概覽

Flutter 內建一套焦點系統，能將鍵盤輸入導向應用程式中的特定區域。為了達到這個目的，使用者會透過點擊或點選想要的 UI 元素，將「焦點」集中在應用程式的那個部分。一旦獲得焦點，透過鍵盤輸入的文字就會流向該區域，直到焦點被移動到應用程式的其他部分。焦點也可以透過特定的鍵盤快捷鍵來移動，這通常綁定在 <kbd>Tab</kbd> 鍵，因此有時也稱為「Tab 鍵遍歷」（tab traversal）。

本頁將探討在 Flutter 應用程式中執行這些操作所需的 API，以及焦點系統的運作方式。我們發現開發者對於如何定義與使用 [`FocusNode`][] 物件有些困惑。如果你也有這樣的經驗，請直接參考[建立 `FocusNode` 物件的最佳實踐](#best-practices-for-creating-focusnode-objects)。

### 焦點使用情境

以下是你可能需要了解焦點系統用法的一些情境範例：

- [接收／處理鍵盤事件](#key-events)
- [實作需要可被聚焦的自訂元件](#focus-widget)
- [在焦點變化時接收通知](#change-notifications)
- [變更或定義應用程式中「Tab 鍵順序」的焦點遍歷](#focustraversalpolicy)
- [定義應該一起遍歷的控制群組](#focustraversalgroup-widget)
- [防止應用程式中的某些控制項可被聚焦](#controlling-what-gets-focus)

## 詞彙表

以下是 Flutter 在焦點系統中使用的相關術語。部分概念所對應的類別會在下文介紹。

- **焦點樹（Focus tree）** - 由焦點節點（focus nodes）組成的樹狀結構，通常稀疏地映射元件 (Widget) 樹，代表所有可接收焦點的元件。
- **焦點節點（Focus node）** - 焦點樹中的單一節點。該節點可以接收焦點，當它成為焦點鏈的一部分時，稱為「擁有焦點」。只有在擁有焦點時，它才會參與鍵盤事件的處理。
- **主焦點（Primary focus）** - 焦點樹中距離根節點最遠、且擁有焦點的焦點節點。鍵盤事件會從主焦點節點開始，並向其祖先節點傳遞。
- **焦點鏈（Focus chain）** - 由主焦點節點開始，沿著焦點樹分支一路到根節點的有序焦點節點清單。
- **焦點範圍（Focus scope）** - 一種特殊的焦點節點，用於包含一組其他焦點節點，並僅允許這些節點接收焦點。它會記錄其子樹中先前被聚焦的節點資訊。
- **焦點遍歷（Focus traversal）** - 以可預期順序，從一個可聚焦節點移動到另一個的過程。這通常出現在使用者按下 <kbd>Tab</kbd> 鍵，將焦點移到下一個可聚焦控制項或欄位時。

## FocusNode 與 FocusScopeNode

`FocusNode` 和 [`FocusScopeNode`][] 物件實作了焦點系統的機制。它們是長生命週期的物件（比元件更長，類似於 render objects），用來保存焦點狀態與屬性，讓這些資訊在元件樹重建時仍能持續存在。這些物件共同組成焦點樹資料結構。

這些物件最初設計為開發者可直接操作，用來控制焦點系統的部分行為，但隨著時間演進，它們大多用於實作焦點系統的細節。為了避免破壞現有應用程式，它們仍然保留了屬性的公開介面。但一般來說，它們最有用的用途是作為一個相對不透明的操作柄，傳遞給子元件，讓其可以呼叫 `requestFocus()` 於祖先元件上，以請求讓某個子元件獲得焦點。至於其他屬性的設定，除非你沒有使用 [`Focus`][] 或 [`FocusScope`][] 元件，或是自行實作它們，否則建議由這些元件來管理。

### Best practices for creating FocusNode objects

使用這些物件時，請遵循以下建議：

- 不要在每次 build 時都配置新的 `FocusNode`。這會導致記憶體洩漏，有時也會在節點擁有焦點時，因元件重建而失去焦點。
- 請在有狀態元件（stateful widget）中建立 `FocusNode` 和 `FocusScopeNode` 物件。`FocusNode` 和 `FocusScopeNode` 在不再使用時需要被釋放（dispose），因此應只在有狀態元件的 state 物件中建立，並在覆寫 `dispose` 時釋放它們。
- 不要讓多個元件共用同一個 `FocusNode`。否則這些元件會互相爭奪節點屬性的管理權，結果可能不如預期。
- 請設定焦點節點元件的 `debugLabel`，以利診斷焦點相關問題。
- 若焦點節點由 `Focus` 或 `FocusScope` 元件管理時，不要在 `FocusNode` 或 `FocusScopeNode` 上設定 `onKeyEvent` 回呼（callback）。如果你需要 `onKeyEvent` 處理器，請在你想監聽的元件子樹外層包一個新的 `Focus` 元件，並將該元件的 `onKeyEvent` 屬性設為你的處理器。如果你也不希望它能取得主焦點，請在該元件上設定 `canRequestFocus: false`。這是因為 `Focus` 元件的 `onKeyEvent` 屬性在之後的 build 可能被設為其他值，若發生這種情況，會覆蓋你在節點上設定的 `onKeyEvent` 處理器。
- 請呼叫節點的 `requestFocus()` 以請求讓它獲得主焦點，特別是當祖先元件將它擁有的節點傳給子元件，而你希望聚焦該子元件時。
- 請使用 `focusNode.requestFocus()`。不需要呼叫 `FocusScope.of(context).requestFocus(focusNode)`。`focusNode.requestFocus()` 方法等效且效能更佳。

### 取消聚焦（Unfocusing）

有一個 API 可以讓節點「放棄焦點」，名稱為 `FocusNode.unfocus()`。雖然這會移除節點的焦點，但需要注意，其實並不存在「所有節點都不聚焦」的狀態。如果一個節點被取消聚焦，焦點必須轉移到其他地方，因為系統中 _總是_ 會有一個主焦點。當節點呼叫 `unfocus()` 時，接收焦點的節點會是最近的 `FocusScopeNode`，或是該範圍內先前被聚焦的節點，這取決於傳給 `unfocus()` 的 `disposition` 參數。如果你想更精確地控制焦點移除後的去向，請直接聚焦到其他節點，而不是呼叫 `unfocus()`，或是使用焦點遍歷機制，透過 `FocusNode` 上的 `focusInDirection`、`nextFocus` 或 `previousFocus` 方法尋找其他節點。

呼叫 `unfocus()` 時，`disposition` 參數允許兩種取消聚焦模式：[`UnfocusDisposition.scope`][] 和
`UnfocusDisposition.previouslyFocusedChild`。預設值為 `scope`，會將焦點給最近的父焦點範圍。這表示如果之後將焦點移到下一個節點（使用 `FocusNode.nextFocus`），會從該範圍中的「第一個」可聚焦項目開始。

`previouslyFocusedChild` 方式會在範圍中搜尋先前被聚焦的子節點，並請求聚焦於它。如果沒有先前被聚焦的子節點，則等同於 `scope`。

:::secondary 注意
如果沒有其他範圍，焦點會移到焦點系統的根範圍節點 `FocusManager.rootScope`。這通常不是期望的行為，因為根範圍沒有 `context`，框架無法判斷下一個該聚焦哪個節點。如果你發現應用程式突然無法透過焦點遍歷來導航，很可能就是發生了這種情況。要修正這個問題，請在請求取消聚焦的焦點節點祖先中加入 `FocusScope`。`WidgetsApp`（`MaterialApp` 與 `CupertinoApp` 均繼承自它）有自己的 `FocusScope`，因此如果你有使用這些元件，通常不會遇到這個問題。
:::

## Focus 元件 {:#focus-widget}

`Focus` 元件擁有並管理一個焦點節點，是焦點系統的主力。它負責將所擁有的焦點節點掛接或卸除於焦點樹，管理節點的屬性與回呼，並提供靜態函式以便在元件樹中查找已附加的焦點節點。

最簡單的用法是，將 `Focus` 元件包裹在某個元件子樹外層，讓該子樹能在焦點遍歷過程中獲得焦點，或在對傳入的 `FocusNode` 呼叫 `requestFocus` 時獲得焦點。若再搭配會呼叫 `requestFocus` 的手勢偵測器（gesture detector），則可以在點擊或點選時取得焦點。

你可以將 `FocusNode` 物件傳給 `Focus` 元件管理，但如果沒有這麼做，它會自動建立一個。自行建立 `FocusNode` 的主要原因，是為了能從父元件呼叫 `requestFocus()` 控制該節點的焦點。`FocusNode` 的大部分其他功能，建議直接透過 `Focus` 元件本身的屬性來存取。

`Focus` 元件被用於大多數 Flutter 內建控制項，以實作其焦點功能。

以下範例展示如何使用 `Focus` 元件讓自訂控制項可被聚焦。它會建立一個帶有文字的容器，並在獲得焦點時產生反應。

<?code-excerpt "ui/focus/lib/custom_control_example.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  static const String _title = 'Focus Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[MyCustomWidget(), MyCustomWidget()],
        ),
      ),
    );
  }
}

class MyCustomWidget extends StatefulWidget {
  const MyCustomWidget({super.key});

  @override
  State<MyCustomWidget> createState() => _MyCustomWidgetState();
}

class _MyCustomWidgetState extends State<MyCustomWidget> {
  Color _color = Colors.white;
  String _label = 'Unfocused';

  @override
  Widget build(BuildContext context) {
    return Focus(
      onFocusChange: (focused) {
        setState(() {
          _color = focused ? Colors.black26 : Colors.white;
          _label = focused ? 'Focused' : 'Unfocused';
        });
      },
      child: Center(
        child: Container(
          width: 300,
          height: 50,
          alignment: Alignment.center,
          color: _color,
          child: Text(_label),
        ),
      ),
    );
  }
}
```

### 鍵盤事件 {:#key-events}

如果你希望在某個子樹中監聽鍵盤事件（key events），
請將 `Focus` 元件的 `onKeyEvent` 屬性
設為一個事件處理器，該處理器可以僅僅監聽鍵盤事件，
或是處理該事件並阻止其向其他元件傳遞。

鍵盤事件會從擁有主焦點（primary focus）的焦點節點開始。
如果該節點的 `onKeyEvent` 處理器沒有回傳 `KeyEventResult.handled`，
則會將事件傳遞給其父焦點節點。
如果父節點也未處理，則繼續向上傳遞給其父節點，
如此遞迴，直到到達焦點樹的根節點。
如果事件到達焦點樹的根節點仍未被處理，
則會將事件回傳給平台，由平台交給
應用程式中的下一個原生控制元件
（這種情況通常發生在 Flutter UI 嵌入於較大型原生應用程式 UI 時）。
已被處理的事件不會再傳遞給其他 Flutter 元件，
同時也不會傳遞給原生元件。

以下是一個 `Focus` 元件的範例，
它會吸收所有其子樹未處理的鍵盤事件，
但本身無法成為主焦點：

<?code-excerpt "ui/focus/lib/samples.dart (absorb-keys)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) => KeyEventResult.handled,
    canRequestFocus: false,
    child: child,
  );
}
```

Focus 鍵盤事件會在文字輸入事件之前被處理，因此當 `Focus` 元件包覆著一個文字欄位（text field）時，若你攔截某個鍵盤事件，該按鍵將無法被輸入到文字欄位中。

以下是一個範例，這個元件不允許在文字欄位中輸入字母 "a"：

<?code-excerpt "ui/focus/lib/samples.dart (no-letter-a)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) {
      return (event.logicalKey == LogicalKeyboardKey.keyA)
          ? KeyEventResult.handled
          : KeyEventResult.ignored;
    },
    child: const TextField(),
  );
}
```

如果你的目的是進行輸入驗證，這個範例的功能可能更適合用 `TextInputFormatter` 來實作，但這個技巧仍然很有用：例如，`Shortcuts` 元件就利用這種方法，在文字輸入前先處理快捷鍵。

### 控制哪些元素獲得焦點 {:#controlling-what-gets-focus}

焦點的主要面向之一，就是控制哪些元素可以獲得焦點，以及如何獲得焦點。屬性 `canRequestFocus`、`skipTraversal,` 和 `descendantsAreFocusable`
用來控制此節點及其子節點如何參與焦點流程。

如果 `skipTraversal` 屬性為 true，則此焦點節點不會參與焦點遍歷。若直接對其焦點節點呼叫 `requestFocus`，它仍然可以獲得焦點，但當焦點遍歷系統尋找下一個要聚焦的元素時，會略過它。

`canRequestFocus` 屬性，顧名思義，用來控制此 `Focus` 元件所管理的焦點節點是否可以用來請求焦點。如果這個屬性為 false，則對該節點呼叫 `requestFocus` 將不會有任何效果。這也表示此節點會被焦點遍歷略過，因為它無法請求焦點。

`descendantsAreFocusable` 屬性則控制此節點的子節點是否能獲得焦點，但仍允許此節點本身獲得焦點。這個屬性可以用來關閉整個元件子樹的焦點功能。`ExcludeFocus` 元件就是這樣運作的：它其實就是一個 `Focus` 元件，並將這個屬性設為 true。

### 自動聚焦（Autofocus）

將 `Focus` 元件的 `autofocus` 屬性設為 true，可以讓該元件在其所屬的焦點範圍（focus scope）首次獲得焦點時，自動請求焦點。如果有多個元件同時設置 `autofocus`，則會隨機選擇其中一個獲得焦點，因此建議每個焦點範圍只設置一個元件的自動聚焦。

`autofocus` 屬性只有在該節點所屬範圍內尚未有其他焦點時才會生效。

如果將 `autofocus` 屬性設在屬於不同焦點範圍的兩個節點上，則行為是明確定義的：當各自的焦點範圍被聚焦時，對應的元件會自動獲得焦點。

### 焦點變更通知 {:#change-notifications}

`Focus.onFocusChanged` 回呼（callback）可用來接收特定節點焦點狀態變更的通知。當節點被加入或移出焦點鏈時都會收到通知，也就是說，即使不是主要焦點也會收到通知。如果你只想知道自己是否獲得了主要焦點，可以檢查該焦點節點的 `hasPrimaryFocus` 是否為 true。

### 取得 FocusNode

有時候，取得 `Focus` 元件的焦點節點（focus node）以查詢其屬性會很有幫助。

若要從 `Focus` 元件的父層存取其焦點節點，可以建立一個 `FocusNode`，並將其作為 `Focus` 元件的 `focusNode` 屬性傳入。由於這個焦點節點需要被釋放（dispose），因此你傳入的焦點節點必須由一個有狀態元件（stateful widget）所擁有，不要每次建構時都新建一個。

如果你需要從 `Focus` 元件的子孫存取其焦點節點，可以呼叫 `Focus.of(context)`，以取得距離給定 context 最近的 `Focus`
元件的焦點節點。如果你需要在同一個 build 函式中取得 `FocusNode` 的 `Focus` 元件，請使用 [`Builder`][]，以確保你取得正確的 context。以下範例說明了這個做法：

<?code-excerpt "ui/focus/lib/samples.dart (builder)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    child: Builder(
      builder: (context) {
        final bool hasPrimary = Focus.of(context).hasPrimaryFocus;
        print('Building with primary focus: $hasPrimary');
        return const SizedBox(width: 100, height: 100);
      },
    ),
  );
}
```

### 時機

焦點系統的一個細節在於，當請求焦點時，只有在當前的 build 階段完成後才會生效。這表示焦點的變化總是會延遲一幀，因為改變焦點可能會導致元件樹的任意部分重新建構，包括目前請求焦點的元件的祖先。由於子元件無法標記其祖先為 dirty，因此必須在畫面幀與幀之間進行，這樣任何需要的變更才能在下一幀發生。

## FocusScope 元件

`FocusScope` 元件是一個特殊版本的 `Focus` 元件，它管理的是 `FocusScopeNode`，而不是 `FocusNode`。`FocusScopeNode` 是焦點樹中的一個特殊節點，用來作為子樹中焦點節點的分組機制。焦點的移動（traversal）會維持在同一個焦點範圍（focus scope）內，除非明確地將焦點設置到範圍外的節點。

焦點範圍也會追蹤其子樹內目前獲得焦點的節點，以及過去獲得焦點的節點歷史。這樣一來，如果某個節點釋放焦點或在獲得焦點時被移除，焦點可以回到先前獲得焦點的節點。

焦點範圍同時也是當所有子節點都沒有焦點時，焦點可以回歸的地方。這讓焦點移動的程式碼能有一個起始的上下文，以便尋找下一個（或第一個）可獲得焦點的控制元件。

如果你將焦點設在一個焦點範圍節點上，它會先嘗試將焦點設在其子樹中目前或最近獲得焦點的節點，或是子樹中請求自動獲得焦點（autofocus）的節點（如果有的話）。如果沒有這樣的節點，則焦點會落在它自己身上。

## FocusableActionDetector 元件

[`FocusableActionDetector`][] 是一個結合了 [`Actions`][]、[`Shortcuts`][]、[`MouseRegion`][] 以及 `Focus` 元件功能的元件，用來建立一個偵測器，定義動作（actions）與按鍵綁定（key bindings），並提供處理焦點與懸停（hover）高亮的回呼。Flutter 控制元件就是利用它來實作這些互動行為。它其實是由上述各個元件組合而成，因此如果你不需要全部功能，可以只用你需要的那些元件，但這是一個方便的方式，能將這些行為整合進你的自訂控制元件中。

:::note
想進一步了解，請觀看這支關於 `FocusableActionDetector` 元件的 Widget of the Week 短片：

<YouTubeEmbed id="R84AGg0lKs8" title="FocusableActionDetector - Flutter widget of the week"></YouTubeEmbed>
:::

## 控制焦點移動

當應用程式具備焦點能力後，許多應用程式會希望讓使用者能透過鍵盤或其他輸入裝置來控制焦點。最常見的例子是「Tab 鍵移動」，也就是使用者按下 <kbd>Tab</kbd> 鍵來切換到「下一個」控制元件。本節將說明如何控制「下一個」的定義。這類移動在 Flutter 中預設就有提供。

在簡單的格狀（grid）版面配置中，決定下一個控制元件相對容易。如果目前不在該列的最後一個，下一個就是右邊的（或在從右至左語系中是左邊的）。如果在該列的最後一個，則是下一列的第一個控制元件。不過，實際應用程式很少完全採用格狀排列，因此通常需要更多的指引。

Flutter 的預設焦點移動演算法（[`ReadingOrderTraversalPolicy`][]）表現相當不錯：對大多數應用程式來說都能給出正確的結果。然而，總會有一些特殊情境，或是因為設計需求而需要不同於預設排序的順序。針對這些情況，Flutter 也提供了其他機制來達成你想要的順序。

### FocusTraversalGroup 元件 {:#focustraversalgroup-widget}

[`FocusTraversalGroup`][] 元件應該放在那些需要被完整遍歷（traverse）後才移動到其他元件或元件群組的元件子樹外圍。僅僅將元件分組為相關群組，通常就能解決許多 Tab 鍵移動的排序問題。如果還不夠，這個群組也可以指定一個 [`FocusTraversalPolicy`][] 來決定群組內的排序。

預設的 [`ReadingOrderTraversalPolicy`][] 通常已經足夠，但如果需要更細緻的排序控制，可以使用 [`OrderedTraversalPolicy`][]。包覆在可獲得焦點元件外的 [`FocusTraversalOrder`][] 元件，其 `order` 參數決定了排序方式。排序可以是 [`FocusOrder`][] 的任何子類別，Flutter 也提供了 [`NumericFocusOrder`][] 和 [`LexicalFocusOrder`][]。

如果這些內建的焦點移動策略（focus traversal policy）都無法滿足你的應用程式需求，你也可以自行撰寫策略，來決定任何自訂的排序。

以下是一個使用 `FocusTraversalOrder` 元件，並透過 `NumericFocusOrder` 以 TWO、ONE、THREE 順序遍歷一排按鈕的範例。

<?code-excerpt "ui/focus/lib/samples.dart (ordered-button-row)"?>
```dart
class OrderedButtonRow extends StatelessWidget {
  const OrderedButtonRow({super.key});

  @override
  Widget build(BuildContext context) {
    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Row(
        children: <Widget>[
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(2),
            child: TextButton(child: const Text('ONE'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(1),
            child: TextButton(child: const Text('TWO'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(3),
            child: TextButton(child: const Text('THREE'), onPressed: () {}),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}
```

### FocusTraversalPolicy {:#focustraversalpolicy}

`FocusTraversalPolicy` 是一個用來決定在收到請求及目前焦點節點時，下一個元件為何的物件。這些請求（成員函式）包含像是 `findFirstFocus`、`findLastFocus`、`next`、`previous` 和 `inDirection` 等操作。

`FocusTraversalPolicy` 是具體策略的抽象基底類別，例如 `ReadingOrderTraversalPolicy`、`OrderedTraversalPolicy` 以及 [`DirectionalFocusTraversalPolicyMixin`][] 這些類別。

若要使用 `FocusTraversalPolicy`，你需要將其提供給 `FocusTraversalGroup`，這樣就能決定該策略在哪個元件子樹中生效。這個類別的成員函式很少會被直接呼叫：它們主要是由焦點系統自動使用。

## 焦點管理器（Focus manager）

[`FocusManager`][] 負責維護系統目前的主要焦點。它僅有少數幾個對焦點系統使用者有用的 API。其一是 `FocusManager.instance.primaryFocus` 屬性，該屬性包含目前被聚焦的焦點節點，同時也可透過全域的 `primaryFocus` 欄位存取。

其他有用的屬性還有 `FocusManager.instance.highlightMode` 和 `FocusManager.instance.highlightStrategy`。這些屬性主要給需要在「觸控」模式與「傳統」（滑鼠與鍵盤）模式間切換焦點高亮顯示的元件使用。當使用者以觸控方式導覽時，焦點高亮通常會隱藏；而當切換回滑鼠或鍵盤時，則需要再次顯示焦點高亮，讓使用者知道目前焦點所在。`highlightStrategy` 會告訴焦點管理器如何解讀裝置使用模式的變化：它可以根據最近的輸入事件自動在兩種模式間切換，或是鎖定在觸控或傳統模式。Flutter 提供的元件已經知道如何使用這些資訊，因此只有在你要從零撰寫自訂控制元件時才需要特別處理。你可以使用 `addHighlightModeListener` 回呼來監聽高亮模式的變化。

[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`DirectionalFocusTraversalPolicyMixin`]: {{site.api}}/flutter/widgets/DirectionalFocusTraversalPolicyMixin-mixin.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`FocusableActionDetector`]: {{site.api}}/flutter/widgets/FocusableActionDetector-class.html
[`FocusManager`]: {{site.api}}/flutter/widgets/FocusManager-class.html
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html
[`FocusOrder`]: {{site.api}}/flutter/widgets/FocusOrder-class.html
[`FocusScope`]: {{site.api}}/flutter/widgets/FocusScope-class.html
[`FocusScopeNode`]: {{site.api}}/flutter/widgets/FocusScopeNode-class.html
[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html
[`FocusTraversalOrder`]: {{site.api}}/flutter/widgets/FocusTraversalOrder-class.html
[`FocusTraversalPolicy`]: {{site.api}}/flutter/widgets/FocusTraversalPolicy-class.html
[`LexicalFocusOrder`]: {{site.api}}/flutter/widgets/LexicalFocusOrder-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`NumericFocusOrder`]: {{site.api}}/flutter/widgets/NumericFocusOrder-class.html
[`OrderedTraversalPolicy`]: {{site.api}}/flutter/widgets/OrderedTraversalPolicy-class.html
[`ReadingOrderTraversalPolicy`]: {{site.api}}/flutter/widgets/ReadingOrderTraversalPolicy-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html
[`UnfocusDisposition.scope`]: {{site.api}}/flutter/widgets/UnfocusDisposition.html
