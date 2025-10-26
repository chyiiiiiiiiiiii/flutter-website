---
title: 平台慣用法
description: >-
  學習如何建立能夠響應螢幕尺寸變化的響應式應用程式。
shortTitle: 慣用法
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

在開發自適應（adaptive）應用程式時，最後需要考慮的領域是平台標準。
每個平台都有其自身的慣用法（idioms）與規範（norms）；
這些名義上或實際上的標準會影響使用者對應用程式行為的預期。
部分由於網路的普及，使用者已經習慣於更客製化的體驗，
但遵循這些平台標準仍然能帶來顯著的好處：

* **降低認知負擔**
: 配合使用者既有的心理模型，完成任務會變得直覺，
  需要思考的時間更少，提升生產力，也減少挫折感。

* **建立信任感**
: 當應用程式不符合使用者預期時，使用者可能會感到疑慮或不信任。
  相反地，熟悉的 UI 能建立使用者信任，也有助於提升品質印象。
  這通常還能帶來更好的應用程式商店評分——這是大家都樂見其成的！

## 考慮各平台的預期行為

第一步是花點時間思考，在這個平台上，
預期的外觀、呈現方式或行為是什麼。
試著暫時忘記你目前實作上的限制，
只需想像理想的使用者體驗，
然後再反推回來。

另一種思考方式是問自己：
「這個平台的使用者會如何預期達成這個目標？」
接著，試著想像在你的應用程式中，沒有任何妥協的情況下，這會怎麼運作。

如果你不是該平台的常用者，這可能會很困難。
你可能不了解某些特定的慣用法，甚至完全忽略它們。
舉例來說，長期使用 Android 的人可能完全不清楚 iOS 上的慣例，
macOS、Linux 和 Windows 之間也是如此。
這些差異對你來說可能很細微，
但對有經驗的使用者來說卻一目了然。

### 尋找平台倡議者

如果可能的話，為每個平台指派一位倡議者（advocate）。
理想情況下，這位倡議者會將該平台作為主要裝置，
能以高度主觀的使用者角度提供意見。
為了減少人力，可以合併角色。
例如，一位負責 Windows 和 Android，
一位負責 Linux 和 Web，
另一位負責 Mac 和 iOS。

目標是持續獲得有見地的回饋，讓應用程式在每個平台上都能有絕佳體驗。
應鼓勵倡議者對細節十分講究，指出任何與該裝置常見應用程式不同的地方。
舉個簡單例子，對話框中的預設按鈕在 Mac 和 Linux 上通常在左側，
而在 Windows 上則在右側。
如果你不是該平台的常用者，這類細節很容易被忽略。

:::secondary Important
倡議者不需要是開發者，甚至不必是全職團隊成員。
他們可以是設計師、利害關係人，或是定期取得測試版本的外部測試者。
:::

### 保持獨特性

遵循預期行為並不代表你的應用程式必須使用預設元件或樣式。
許多最受歡迎的多平台應用程式都有非常鮮明且有主見的 UI，
包括自訂按鈕、情境選單和標題列等。

你能越多地統一跨平台的樣式與行為，開發與測試就會越容易。
訣竅在於在打造獨特且具識別度的體驗，與尊重各平台規範之間取得平衡。

## 常見的慣用法與規範

快速瀏覽幾個你可能需要考慮的具體規範與慣用法，
以及你可以如何在 Flutter 中實現它們。

### 捲軸（Scrollbar）的外觀與行為

桌面與行動裝置的使用者都期望有捲軸（scrollbar），
但他們對捲軸的行為在不同平台上有不同的預期。
行動裝置使用者期望捲軸較小，且僅在捲動時出現；
而桌面使用者則通常期望捲軸隨時可見、較大，且可以點擊或拖曳。

Flutter 內建的 `Scrollbar` 元件已經根據目前平台支援自適應的顏色與尺寸。
你可能會想做的其中一個調整，是在桌面平台上切換 `alwaysShown`：

<?code-excerpt "lib/pages/adaptive_grid_page.dart (scrollbar-always-shown)"?>
```dart
return Scrollbar(
  thumbVisibility: DeviceType.isDesktop,
  controller: _scrollController,
  child: GridView.count(
    controller: _scrollController,
    padding: const EdgeInsets.all(Insets.extraLarge),
    childAspectRatio: 1,
    crossAxisCount: colCount,
    children: listChildren,
  ),
);
```

這種對細節的微妙關注，能讓你的應用程式在特定平台上感覺更加舒適自然。

### 多重選取（Multi-select）

在清單中處理多重選取（multi-select）是另一個在不同平台間存在細微差異的領域：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (multi-select-shift)"?>
```dart
static bool get isSpanSelectModifierDown =>
    isKeyDown({LogicalKeyboardKey.shiftLeft, LogicalKeyboardKey.shiftRight});
```

若要進行平台感知（platform-aware）的 Control 或 Command 檢查，
你可以這樣撰寫：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (multi-select-modifier-down)"?>
```dart
static bool get isMultiSelectModifierDown {
  bool isDown = false;
  if (Platform.isMacOS) {
    isDown = isKeyDown({
      LogicalKeyboardKey.metaLeft,
      LogicalKeyboardKey.metaRight,
    });
  } else {
    isDown = isKeyDown({
      LogicalKeyboardKey.controlLeft,
      LogicalKeyboardKey.controlRight,
    });
  }
  return isDown;
}
```

對於鍵盤使用者，最後一個需要考慮的動作是 **全選（Select All）**。
如果你有一個包含大量可選項目的清單，
許多鍵盤使用者會期望可以使用
`Control+A` 來選取所有項目。

#### 觸控裝置

在觸控裝置上，多重選取通常會被簡化，
其預期行為類似於桌面上持續按下
`isMultiSelectModifier` 的情境。
你可以透過單次點擊來選取或取消選取項目，
通常也會有一個按鈕來 **全選（Select All）** 或
**清除（Clear）** 目前的選取狀態。

你如何在不同裝置上處理多重選取，
取決於你的具體使用情境，但最重要的是
確保你為每個平台都提供了最佳的
互動模型。

### 可選取文字

在網頁（以及在桌面上較少見）上，一個常見的預期行為是大多數可見文字都可以用滑鼠游標選取。
當文字無法被選取時，
網頁使用者通常會產生負面反應。

幸運的是，這可以很容易地透過 [`SelectableText`][`SelectableText`] 元件（Widget）來支援：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (selectable-text)"?>
```dart
return const SelectableText('Select me!');
```

若要支援 rich text（豐富文字），請使用 `TextSpan`：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (rich-text-span)"?>
```dart
return const SelectableText.rich(
  TextSpan(
    children: [
      TextSpan(text: 'Hello'),
      TextSpan(
        text: 'Bold',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ],
  ),
);
```

[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html

### 標題列（Title bars）

在現代桌面應用程式中，客製化應用程式視窗的標題列相當常見，例如加入品牌標誌以強化品牌識別，或加入情境控制元件，以幫助在主要 UI 中節省垂直空間。

![Samples of title bars](/assets/images/docs/ui/adaptive-responsive/titlebar.png){:width="100%"}

Flutter 並未直接支援這項功能，但你可以使用 [`bits_dojo`][`bits_dojo`] 套件來停用原生標題列，並以你自訂的標題列取代。

這個套件讓你可以在 `TitleBar` 中加入任何你想要的元件（Widgets），因為它底層完全採用 Flutter 元件實作。這讓你在導覽至應用程式不同區段時，能輕鬆調整標題列內容。

[`bits_dojo`]: {{site.github}}/bitsdojo/bitsdojo_window

### 右鍵選單（Context menus）與工具提示（Tooltips）

在桌面環境中，有幾種互動會以覆蓋層（overlay）顯示元件的方式呈現，但在觸發、關閉與定位方式上各有不同：

* **右鍵選單（Context menu）**
: 通常由滑鼠右鍵點擊觸發，選單會顯示在滑鼠附近。當使用者點擊任意處、從選單中選擇一個選項，或點擊選單外部時，選單會被關閉。

* **工具提示（Tooltip）**
: 通常在滑鼠懸停於互動元件上 200-400 毫秒後觸發，工具提示通常錨定於某個元件（而非滑鼠位置），當滑鼠游標離開該元件時，提示會消失。

* **彈出面板（Popup panel，也稱為 flyout）**
: 類似於工具提示，彈出面板通常錨定於某個元件。主要差異在於面板多半是由點擊事件觸發，且當滑鼠游標離開時通常不會自動隱藏。相反地，面板一般會在點擊面板外部，或按下 **關閉（Close）** 或 **送出（Submit）** 按鈕時被關閉。

若要在 Flutter 中顯示基本的工具提示（Tooltip），請使用內建的 [`Tooltip`][`Tooltip`] 元件（Widget）：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (tooltip)"?>
```dart
return const Tooltip(
  message: 'I am a Tooltip',
  child: Text('Hover over the text to show a tooltip.'),
);
```

Flutter 也在編輯或選取文字時，提供了內建的內容選單（context menu）。

若要顯示更進階的提示訊息（tooltip）、彈出面板（popup panel），
或建立自訂的內容選單（context menu），
你可以選擇使用現有的套件，
或是自行利用 `Stack` 或 `Overlay` 來實作。

部分可用的套件包括：

* [`context_menus`][`context_menus`]
* [`anchored_popups`][`anchored_popups`]
* [`flutter_portal`][`flutter_portal`]
* [`super_tooltip`][`super_tooltip`]
* [`custom_pop_up_menu`][`custom_pop_up_menu`]

雖然這些控制項對於觸控使用者來說可作為加速器（accelerator），
但對於滑鼠使用者而言則是不可或缺的。這些使用者預期
可以右鍵點擊項目、直接編輯內容，
並且將滑鼠懸停以獲取更多資訊。若無法滿足這些預期，
可能會導致使用者感到失望，或至少
覺得體驗上有些不對勁。

[`anchored_popups`]: {{site.pub}}/packages/anchored_popups
[`context_menus`]: {{site.pub}}/packages/context_menus
[`custom_pop_up_menu`]: {{site.pub}}/packages/custom_pop_up_menu
[`flutter_portal`]: {{site.pub}}/packages/flutter_portal
[`super_tooltip`]: {{site.pub}}/packages/super_tooltip
[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html

### 水平按鈕順序

在 Windows 上，當呈現一排按鈕時，
確認按鈕會放在該排的起始處（左側）。而在其他所有平台上，
則相反，確認按鈕會放在該排的結尾處（右側）。

這可以透過 Flutter 中 `TextDirection` 屬性搭配 `Row` 輕鬆實現：

<?code-excerpt "lib/widgets/ok_cancel_dialog.dart (row-text-direction)"?>
```dart
TextDirection btnDirection = DeviceType.isWindows
    ? TextDirection.rtl
    : TextDirection.ltr;
return Row(
  children: [
    const Spacer(),
    Row(
      textDirection: btnDirection,
      children: [
        DialogButton(
          label: 'Cancel',
          onPressed: () => Navigator.pop(context, false),
        ),
        DialogButton(
          label: 'Ok',
          onPressed: () => Navigator.pop(context, true),
        ),
      ],
    ),
  ],
);
```

![Sample of embedded image](/assets/images/docs/ui/adaptive-responsive/embed_image1.png){:width="75%"}

![Sample of embedded image](/assets/images/docs/ui/adaptive-responsive/embed_image2.png){:width="90%"}

### 選單列（Menu bar）

在桌面應用程式中，另一個常見的設計模式是選單列（menu bar）。
在 Windows 和 Linux 上，這個選單會作為 Chrome 標題列的一部分存在，
而在 macOS 上，則位於主螢幕的頂部。

目前，你可以透過一個原型外掛（prototype plugin）來指定自訂選單列項目，
但預期這項功能最終會整合進主要的 SDK 中。

值得一提的是，在 Windows 和 Linux 上，
你無法將自訂標題列與選單列結合使用。
當你建立自訂標題列時，
你會完全取代原生的標題列，
這也意味著你會失去整合的原生選單列。

如果你同時需要自訂標題列和選單列，
可以在 Flutter 中自行實作，方式類似於自訂右鍵選單（context menu）。

### 拖放（Drag and drop）

對於觸控式和指標式輸入來說，拖放（drag and drop）是核心互動之一。
雖然這種互動在兩種輸入方式中都很常見，
但在涉及可拖曳項目的滾動清單時，
有一些重要的差異需要考慮。

一般來說，觸控使用者會期望看到拖曳把手（drag handles），
以區分可拖曳區域與可滾動區域，
或者透過長按手勢來啟動拖曳。
這是因為滾動和拖曳通常都是用同一根手指進行操作。

滑鼠使用者則有更多輸入選項。
他們可以使用滾輪或捲軸來滾動，通常就不需要專門的拖曳把手。
如果你觀察 macOS Finder 或 Windows Explorer，
你會發現它們的運作方式是：只要選取一個項目並開始拖曳即可。

在 Flutter 中，你可以用多種方式實作拖放功能。
具體實作細節超出本文範疇，但高階的選項包括：

* 直接使用 [`Draggable`][`Draggable`] 和 [`DragTarget`][`DragTarget`] API，
  以打造自訂的外觀與操作體驗。

* 監聽 `onPan` 手勢事件，
  並在父層 `Stack` 中自行移動物件。

* 使用 pub.dev 上的 [預製清單套件][pre-made list packages]。

[`Draggable`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`DragTarget`]: {{site.api}}/flutter/widgets/DragTarget-class.html
[pre-made list packages]: {{site.pub}}/packages?q=reorderable+list
