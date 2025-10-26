---
title: 理解 Flutter 的鍵盤焦點系統
description: 如何在你的 Flutter 應用中使用焦點系統。
---

本文說明如何控制鍵盤輸入的導向位置。如果你正在開發一個會使用實體鍵盤的應用程式（如大多數桌面與網頁應用程式），這篇文章適合你。如果你的應用不會搭配實體鍵盤使用，可以略過本篇。

## 概覽

Flutter 內建了一套焦點系統，用於將鍵盤輸入導向應用程式的特定區域。為了做到這一點，使用者會透過點擊或點選想要的 UI 元素，將「焦點」設置到應用程式的那個部分。一旦設置完成，從鍵盤輸入的文字就會流向該部分，直到焦點移動到應用程式的其他地方。焦點也可以透過特定的鍵盤快捷鍵（通常綁定在 <kbd>Tab</kbd> 鍵）來移動，因此有時也稱為「Tab 巡覽」。

本頁將探討在 Flutter 應用中執行這些操作所需的 API，以及焦點系統的運作方式。我們注意到開發者對於如何定義與使用 [`FocusNode`][`FocusNode`] 物件有些混淆。如果你也有這樣的經驗，可以直接跳到[建立 `FocusNode` 物件的最佳實踐](#建立-focusnode-物件的最佳實踐)。

### 焦點使用情境

以下是你可能需要了解焦點系統的幾種情境：

- [接收／處理鍵盤事件](#鍵盤事件)
- [實作需要可聚焦的自訂元件](#focus-元件)
- [在焦點變更時接收通知](#狀態變更通知)
- [變更或定義應用程式中焦點巡覽（Tab 順序）](#focustraversalpolicy)
- [定義應該一起巡覽的控制元件群組](#focustraversalgroup-元件)
- [防止應用中的某些控制元件被聚焦](#控制焦點獲取對象)
## 詞彙表

以下是 Flutter 在焦點系統中使用的相關術語。實作這些概念的各種類別會在下文介紹。

- **焦點樹（Focus tree）** - 由焦點節點組成的樹狀結構，通常稀疏地對應元件樹，代表所有可以接收焦點的元件。
- **焦點節點（Focus node）** - 焦點樹中的單一節點。該節點可以接收焦點，當它成為焦點鏈的一部分時，稱為「擁有焦點」。只有當它擁有焦點時，才會參與鍵盤事件的處理。
- **主要焦點（Primary focus）** - 焦點樹中距離根節點最遠、目前擁有焦點的焦點節點。鍵盤事件會從這個節點開始，並向其祖先節點傳遞。
- **焦點鏈（Focus chain）** - 從主要焦點節點開始，沿著焦點樹分支到根節點的有序焦點節點列表。
- **焦點範圍（Focus scope）** - 一種特殊的焦點節點，用來包含一組其他焦點節點，並只允許這些節點接收焦點。它會記錄其子樹中先前被聚焦的節點資訊。
- **焦點巡覽（Focus traversal）** - 以可預測的順序，從一個可聚焦節點移動到另一個的過程。這通常在使用者按下 <kbd>Tab</kbd> 鍵時出現，用於移動到下一個可聚焦的控制元件或欄位。

## FocusNode 與 FocusScopeNode

`FocusNode` 和 [`FocusScopeNode`][`FocusScopeNode`] 物件實作了焦點系統的機制。它們是長壽命的物件（比元件更長，類似於 render 物件），用來保存焦點狀態與屬性，因此在元件樹重建時能保持持續性。這些物件共同組成焦點樹資料結構。

這些物件最初是設計給開發者直接操作，以控制焦點系統的某些面向，但隨著時間演進，它們大多用於實作焦點系統的細節。為了避免破壞現有應用，它們仍然保留了屬性的公開介面。但一般來說，它們最有用的地方在於作為一個相對不透明的 handle，傳遞給子元件，以便在祖先元件上呼叫 `requestFocus()`，請求某個子元件獲得焦點。其他屬性的設定，建議交由 [`Focus`][`Focus`] 或 [`FocusScope`][`FocusScope`] 元件管理，除非你沒有使用它們，或是自行實作相關功能。

### 建立 FocusNode 物件的最佳實踐

以下是使用這些物件時的一些建議與注意事項：

- 不要在每次 build 時都建立新的 `FocusNode`。這會導致記憶體洩漏，有時在節點擁有焦點時元件重建還會造成焦點遺失。
- 請在 stateful 元件中建立 `FocusNode` 與 `FocusScopeNode` 物件。`FocusNode` 和 `FocusScopeNode` 在不再使用時需要被釋放（dispose），因此應只在 stateful 元件的 state 物件中建立，並在覆寫 `dispose` 時釋放它們。
- 不要讓多個元件共用同一個 `FocusNode`。否則這些元件會互相爭奪節點屬性的管理權，結果可能不如預期。
- 請設定焦點節點元件的 `debugLabel` 屬性，有助於診斷焦點問題。
- 如果焦點節點由 `Focus` 或 `FocusScope` 元件管理，請不要在 `FocusNode` 或 `FocusScopeNode` 上設置 `onKeyEvent` 回呼。如果你需要 `onKeyEvent` 處理器，請在你想要監聽的元件子樹外層新增一個 `Focus` 元件，並將該元件的 `onKeyEvent` 屬性設為你的處理器。如果你也不希望它能取得主要焦點，請在元件上設置 `canRequestFocus: false`。這是因為 `Focus` 元件上的 `onKeyEvent` 屬性在後續 build 時可能會被設為其他值，若發生這種情況，會覆蓋你在節點上設置的 `onKeyEvent` 處理器。
- 請在節點上呼叫 `requestFocus()` 以請求它取得主要焦點，特別是當祖先將它擁有的節點傳遞給子孫，而你希望聚焦在該子孫時。
- 請使用 `focusNode.requestFocus()`。不需要呼叫 `FocusScope.of(context).requestFocus(focusNode)`。`focusNode.requestFocus()` 方法等價且效能更佳。

### 取消聚焦（Unfocusing）

有一個 API 可以讓節點「放棄焦點」，名稱為 `FocusNode.unfocus()`。雖然它確實會移除節點的焦點，但要注意，其實並不存在「所有節點都取消聚焦」這種狀態。如果一個節點取消聚焦，焦點必須轉移到其他地方，因為系統 _永遠_ 會有一個主要焦點。當節點呼叫 `unfocus()` 時，接收焦點的會是最近的 `FocusScopeNode`，或是該範圍內先前聚焦過的節點，這取決於傳給 `unfocus()` 的 `disposition` 參數。如果你想更精確地控制移除焦點後焦點的去向，請直接聚焦到其他節點，而不是呼叫 `unfocus()`，或使用焦點巡覽機制，透過 `FocusNode` 上的 `focusInDirection`、`nextFocus` 或 `previousFocus` 方法尋找其他節點。

呼叫 `unfocus()` 時，`disposition` 參數允許兩種取消聚焦模式：[`UnfocusDisposition.scope`][`UnfocusDisposition.scope`] 與 `UnfocusDisposition.previouslyFocusedChild`。預設為 `scope`，會將焦點交給最近的父焦點範圍。這表示之後若焦點移到下個節點（`FocusNode.nextFocus`），會從該範圍的「第一個」可聚焦項目開始。

`previouslyFocusedChild` 模式會在範圍內搜尋先前聚焦過的子節點，並請求聚焦於該節點。如果沒有先前聚焦的子節點，則等同於 `scope`。

:::secondary 注意
如果沒有其他範圍，則焦點會移到焦點系統的根範圍節點 `FocusManager.rootScope`。這通常不是期望的行為，因為根範圍沒有 `context`，框架無法判斷下一個應聚焦哪個節點。如果你發現應用突然無法透過焦點巡覽進行導航，很可能就是這個原因。要修正此問題，請在請求取消聚焦的焦點節點之上加上一個 `FocusScope`。`WidgetsApp`（`MaterialApp` 與 `CupertinoApp` 的父類別）有自己的 `FocusScope`，因此若你有使用這些元件，通常不會遇到這個問題。
:::

## Focus 元件

`Focus` 元件擁有並管理一個焦點節點，是焦點系統的主力。它負責將所擁有的焦點節點掛接與卸載到焦點樹，管理節點的屬性與回呼，並提供靜態函式以便在元件樹中尋找已掛接的焦點節點。

最簡單的用法是，將 `Focus` 元件包裹在元件子樹外層，讓該子樹在焦點巡覽過程中可以取得焦點，或是當對應的 `FocusNode` 被呼叫時取得焦點。若搭配呼叫 `requestFocus` 的手勢偵測器，則可以在點擊或點選時取得焦點。

你可以將一個 `FocusNode` 物件傳給 `Focus` 元件管理，但如果沒有傳，它會自動建立一個。自行建立 `FocusNode` 的主要原因，是為了能從父元件呼叫 `requestFocus()` 操作該節點，以控制焦點。`FocusNode` 的其他功能，大多建議直接透過調整 `Focus` 元件本身的屬性來存取。

`Focus` 元件被用於大多數 Flutter 內建控制元件，以實作其焦點功能。

以下範例展示如何使用 `Focus` 元件讓自訂控制元件可聚焦。它建立了一個包含文字的容器，並能根據是否獲得焦點做出反應。

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

### 鍵盤事件

如果你希望在某個子樹中監聽鍵盤事件，請將`onKeyEvent`元件的`Focus`屬性設為一個處理器（handler）。這個處理器可以僅僅監聽按鍵，或者處理按鍵並阻止事件繼續傳遞給其他元件。

鍵盤事件會從具有主焦點（primary focus）的焦點節點開始。如果該節點的`KeyEventResult.handled`處理器沒有回傳`onKeyEvent`，則事件會傳遞給其父焦點節點。如果父節點也沒有處理，事件會繼續往上傳遞，直到抵達焦點樹（focus tree）的根節點。

如果事件傳遞到焦點樹的根節點仍未被處理，則會將事件回傳給平台，由平台交給應用程式中的下一個原生控制元件（native control）。這通常發生在 Flutter UI 嵌入於較大的原生應用程式 UI 中。

已被處理的事件不會再傳遞給其他 Flutter 元件，也不會傳遞給原生元件。

以下是一個`Focus`元件的範例，該元件會吸收所有其子樹未處理的按鍵事件，且無法成為主焦點：

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

焦點（Focus）鍵盤事件會在文字輸入事件之前被處理，因此，當焦點元件（focus widget）包覆著一個文字欄位（text field）時，若在該元件中處理某個鍵盤事件，將會阻止該按鍵輸入到文字欄位中。

以下是一個範例：這個元件不允許在文字欄位中輸入字母 "a"：

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

如果目的是輸入驗證，這個範例的功能可能更適合使用`TextInputFormatter`來實作，但這個技巧仍然很有用：例如，`Shortcuts`元件（Widget）就利用這個方法在文字輸入前處理快捷鍵。

### 控制焦點獲取對象

焦點（focus）的主要面向之一，就是控制哪些元件可以獲得焦點，以及如何獲得焦點。屬性`canRequestFocus`、`skipTraversal,`和`descendantsAreFocusable`
用來控制此節點及其子節點參與焦點流程的方式。

如果`skipTraversal`屬性為 true，則此焦點節點不會參與焦點遍歷（focus traversal）。如果對其焦點節點呼叫`requestFocus`，它仍然可以獲得焦點，但在焦點遍歷系統尋找下一個要聚焦的對象時，會被略過。

`canRequestFocus`屬性，顧名思義，是用來控制此`Focus`元件所管理的焦點節點是否可以用來請求焦點。如果此屬性為 false，則對該節點呼叫`requestFocus`將不會有任何效果。這也意味著此節點會在焦點遍歷時被略過，因為它無法請求焦點。

`descendantsAreFocusable`屬性則是控制此節點的子節點是否可以獲得焦點，但仍允許此節點本身獲得焦點。這個屬性可以用來關閉整個元件子樹的可聚焦性。這也是`ExcludeFocus`元件的運作方式：它其實就是一個設定了此屬性的`Focus`元件。

### 自動聚焦（Autofocus）

將`autofocus`屬性設為 true，會讓`Focus`元件在其所屬的焦點範圍（focus scope）第一次獲得焦點時自動請求焦點。如果有多個元件同時設置了`autofocus`，則最終會由哪一個獲得焦點是未定義的，因此建議每個焦點範圍只對一個元件設置此屬性。

`autofocus`屬性只有在其所屬範圍內尚未有任何元件獲得焦點時才會生效。

如果在屬於不同焦點範圍的兩個節點上都設置了`autofocus`屬性，則行為是明確定義的：當各自的焦點範圍被聚焦時，這兩個節點會各自成為被聚焦的元件。

### 狀態變更通知

`Focus.onFocusChanged`回呼（callback）可用於接收特定節點焦點狀態變更的通知。當節點被加入或移除焦點鏈時都會收到通知，也就是說，即使該節點不是主要焦點（primary focus），也會收到通知。如果你只想知道自己是否獲得了主要焦點，可以檢查該焦點節點上的`hasPrimaryFocus`是否為 true。

### 取得 FocusNode

有時候，取得`Focus`元件的焦點節點（FocusNode）以查詢其屬性會很有幫助。

若要從`Focus`元件的父層取得焦點節點，請建立並傳入`FocusNode`作為`Focus`元件的`focusNode`屬性。由於這個焦點節點需要被釋放（dispose），因此你傳入的焦點節點必須由一個有狀態元件（stateful widget）所擁有，所以不要在每次建構時都新建一個。

如果你需要從`Focus`元件的子孫元件中取得焦點節點，可以呼叫`Focus.of(context)`來取得給定 context 最近的`Focus
`元件的焦點節點。如果你需要在同一個 build 函式中取得`FocusNode`元件的`Focus`，請使用[`Builder`][`Builder`]來確保你取得正確的 context。如下範例所示：

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

焦點系統的一個細節是，當請求焦點時，只有在當前的建構（build）階段完成後才會生效。這意味著焦點變更總是會延遲一幀，因為變更焦點可能會導致元件樹（widget tree）的任意部分重新建構，包括當前請求焦點元件的祖先。由於子元件無法標記其祖先為髒（dirty），因此這必須在幀與幀之間發生，讓所有必要的變更能在下一幀進行。

## FocusScope 元件

`FocusScope` 元件是 `Focus` 元件的一個特殊版本，它管理的是 `FocusScopeNode`，而不是 `FocusNode`。`FocusScopeNode` 是焦點樹中的一個特殊節點，用來作為子樹中焦點節點的分組機制。焦點的遍歷會停留在同一個焦點範圍（focus scope）內，除非明確地將焦點設置到範圍外的節點。

焦點範圍也會追蹤目前焦點所在的節點，以及其子樹內曾經獲得焦點的節點歷史。如此一來，如果某個節點釋放了焦點或在獲得焦點時被移除，焦點可以回到先前獲得焦點的節點。

焦點範圍同時也是當所有子節點都沒有焦點時，焦點可以回歸的地方。這讓焦點遍歷的程式碼有一個起始的上下文，可以尋找下一個（或第一個）可獲得焦點的控制元件。

如果你將焦點設在一個焦點範圍節點上，它會優先嘗試聚焦於其子樹中目前或最近獲得焦點的節點，或者是子樹中請求自動聚焦（autofocus）的節點（若有的話）。如果沒有這樣的節點，則焦點會落在它自己身上。

## FocusableActionDetector 元件

[`FocusableActionDetector`][`FocusableActionDetector`] 是一個結合了 [`Actions`][`Actions`]、[`Shortcuts`][`Shortcuts`]、[`MouseRegion`][`MouseRegion`] 以及 `Focus` 元件功能的元件，用來建立一個偵測器，定義動作與按鍵綁定，並提供處理焦點與懸停高亮（hover highlight）的回呼。Flutter 控制元件就是利用它來實現這些功能。它其實就是由這些組成元件所實作而成，因此如果你不需要全部功能，也可以只用你需要的部分，但這是一個方便的方式，能將這些行為整合進自訂控制元件中。

:::note
想進一步了解，請觀看這段關於 `FocusableActionDetector` 元件的 Widget of the Week 短片：

{% ytEmbed 'R84AGg0lKs8', 'FocusableActionDetector - Flutter widget of the week' %}
:::

## 控制焦點遍歷

當應用程式具備焦點能力後，許多應用程式接下來會希望讓使用者能透過鍵盤或其他輸入裝置來控制焦點。最常見的例子就是「Tab 鍵遍歷」，也就是使用者按下 <kbd>Tab</kbd> 鍵來移動到「下一個」控制元件。本節將說明如何控制「下一個」的定義。這類遍歷在 Flutter 中預設就有提供。

在簡單的格狀（grid）版面中，決定下一個控制元件相對容易。如果還沒到該列的結尾，那就是右邊（或在從右至左語系下是左邊）的元件。如果已到該列結尾，則是下一列的第一個元件。不過，實際應用程式很少是格狀排列，因此通常需要更多指引。

Flutter 的預設焦點遍歷演算法（[`ReadingOrderTraversalPolicy`][`ReadingOrderTraversalPolicy`]）表現相當不錯：對大多數應用程式來說都能給出正確結果。不過，總會有特殊情況，或是設計需求與預設排序不符。針對這些情況，還有其他機制可以實現你想要的順序。

### FocusTraversalGroup 元件

[`FocusTraversalGroup`][`FocusTraversalGroup`] 元件應放在需要完整遍歷的元件子樹外層，這樣在移動到另一個元件或元件群組前，會先遍歷完該群組。僅僅將元件分組，通常就能解決許多 Tab 鍵遍歷的排序問題。如果還不夠，也可以為該群組指定 [`FocusTraversalPolicy`][`FocusTraversalPolicy`] 來決定群組內的排序方式。

預設的 [`ReadingOrderTraversalPolicy`][`ReadingOrderTraversalPolicy`] 通常已經足夠，但如果需要更細緻的排序控制，可以使用 [`OrderedTraversalPolicy`][`OrderedTraversalPolicy`]。包裹在可聚焦元件外的 [`FocusTraversalOrder`][`FocusTraversalOrder`] 元件，其 `order` 參數決定排序方式。排序可以是 [`FocusOrder`][`FocusOrder`] 的任何子類別，Flutter 也提供了 [`NumericFocusOrder`][`NumericFocusOrder`] 和 [`LexicalFocusOrder`][`LexicalFocusOrder`]。

如果現有的焦點遍歷策略都無法滿足你的應用需求，你也可以自行撰寫策略，來實現任何自訂的排序。

以下是一個使用 `FocusTraversalOrder` 元件，並透過 `NumericFocusOrder` 讓一排按鈕以 TWO、ONE、THREE 的順序遍歷的範例。

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

### FocusTraversalPolicy

`FocusTraversalPolicy` 是用來決定在收到請求以及當前焦點節點的情況下，下一個元件 (Widget) 應該是誰的物件。這些請求（成員函式）包括像是 `findFirstFocus`、`findLastFocus`、`next`、`previous` 和 `inDirection` 等。

`FocusTraversalPolicy` 是具體政策的抽象基底類別，例如 `ReadingOrderTraversalPolicy`、`OrderedTraversalPolicy` 以及 [`DirectionalFocusTraversalPolicyMixin`][`DirectionalFocusTraversalPolicyMixin`] 類別。

若要使用 `FocusTraversalPolicy`，你需要將其提供給 `FocusTraversalGroup`，這會決定該政策在哪個元件子樹中生效。這個類別的成員函式很少會被直接呼叫：它們主要是供焦點系統內部使用。

## 焦點管理器

[`FocusManager`][`FocusManager`] 負責維護系統目前的主要焦點。它只提供少數幾個對焦點系統使用者有用的 API。其中之一是 `FocusManager.instance.primaryFocus` 屬性，這個屬性包含了目前被聚焦的焦點節點，也可以從全域的 `primaryFocus` 欄位存取。

其他有用的屬性還有 `FocusManager.instance.highlightMode` 和 `FocusManager.instance.highlightStrategy`。這些屬性通常被需要在「觸控」模式與「傳統」（滑鼠和鍵盤）模式間切換焦點高亮顯示的元件所使用。當使用者透過觸控操作時，焦點高亮通常會隱藏；而當使用者切換回滑鼠或鍵盤時，則需要再次顯示焦點高亮，以便讓使用者知道目前聚焦於哪個元件。`hightlightStrategy` 會告訴焦點管理器如何解讀裝置使用模式的變化：它可以根據最近的輸入事件自動在兩種模式間切換，或是將模式鎖定在觸控或傳統模式。Flutter 所提供的元件已經知道如何使用這些資訊，因此只有當你從零開始撰寫自訂控制元件時才需要用到。你可以使用 `addHighlightModeListener` 回呼來監聽高亮模式的變化。

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
