---
title: 平台慣用語
description: >-
  學習如何建立一個能夠響應螢幕尺寸變化的響應式應用程式。
shortTitle: 慣用語
---

<?code-excerpt path-base="ui/adaptive_app_demos"?>

在開發自適應（adaptive）應用程式時，最後需要考慮的區塊是平台標準。每個平台都有其自身的慣用語（idioms）與規範；這些名義上或事實上的標準會影響使用者對應用程式應有行為的預期。多虧了網路的普及，使用者已經習慣於更客製化的體驗，但反映這些平台標準仍然能帶來顯著的好處：

* **降低認知負擔**
: 透過符合使用者既有的心理模型，完成任務變得更直覺，所需思考更少，提升生產力並減少挫折感。

* **建立信任感**
: 當應用程式未遵循使用者預期時，使用者可能會感到疑慮或不信任。反之，熟悉的 UI 可以建立使用者信任，並有助於提升品質的感受。這通常還能帶來更好的應用程式商店評分——這是大家都樂見的！

## 考慮各平台上的預期行為

第一步是花點時間思考，在這個平台上預期的外觀、呈現方式或行為是什麼。試著拋開你目前實作上的限制，單純想像理想的使用者體驗，然後反推回來。

另一種思考方式是問自己：「這個平台的使用者會如何預期達成這個目標？」然後，試著設想在你的應用程式中，若不做任何妥協，這會如何實現。

如果你不是該平台的常用者，這可能會有難度。你可能不了解特定的慣用語，甚至完全忽略。例如，長期使用 Android 的使用者很可能對 iOS 的平台慣例一無所知，macOS、Linux 與 Windows 亦然。這些差異對你來說可能很細微，但對有經驗的使用者來說卻一目了然。

### 尋找平台倡議者

如果可能，為每個平台指派一位倡議者（advocate）。理想情況下，這位倡議者將該平台作為主要裝置，並能提供高度主觀的使用者觀點。為了減少人數，可以合併角色。例如，一位負責 Windows 與 Android，一位負責 Linux 與網頁（web），另一位負責 Mac 與 iOS。

目標是持續獲得有見地的回饋，讓應用程式在每個平台上都能有絕佳體驗。應鼓勵倡議者對任何與其裝置上典型應用程式不同的地方提出意見。舉個簡單例子，對話框中的預設按鈕在 Mac 與 Linux 上通常位於左側，但在 Windows 上則在右側。如果你不是該平台的常用者，這類細節很容易被忽略。

:::secondary Important
倡議者不必是開發者，甚至不必是全職團隊成員。他們可以是設計師、利害關係人，或是定期獲得測試版本的外部測試者。
:::

### 保持獨特性

遵循預期行為並不代表你的應用程式必須使用預設元件或樣式。許多最受歡迎的多平台應用程式都有非常鮮明且有主見的 UI，包括自訂按鈕、情境選單（context menus）與標題列（title bars）。

你越能在各平台間統一樣式與行為，開發與測試就越容易。訣竅在於，在建立具有強烈識別度的獨特體驗時，同時尊重各平台的規範。

## 常見的慣用語與規範

快速瀏覽幾個你可能需要考慮的特定規範與慣用語，以及你可以如何在 Flutter 中實現它們。

### 捲軸條（Scrollbar）的外觀與行為

桌面與行動裝置的使用者都期望有捲軸條（scrollbar），但他們對其行為的預期在不同平台上有所不同。行動裝置使用者預期捲軸條較小，且僅在捲動時出現；而桌面使用者通常預期捲軸條始終可見、較大，且可以點擊或拖曳。

Flutter 內建的 `Scrollbar` 元件已經根據當前平台支援自適應的顏色與尺寸。你可能想要調整的一點是，在桌面平台上切換 `alwaysShown`：

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

若要根據平台判斷 control 或 command 鍵，
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

對於鍵盤使用者，最後一個需要考慮的功能是 **全選（Select All）** 操作。
如果你有一個包含大量可選項目的清單，
許多鍵盤使用者會預期他們可以使用
`Control+A` 來選取所有項目。

#### 觸控裝置

在觸控裝置上，多重選取通常會被簡化，
其預期行為類似於在桌面端長按
`isMultiSelectModifier` 的效果。
你可以透過單次點擊來選取或取消選取項目，
並且通常會有一個按鈕來**全選（Select All）**或
**清除（Clear）**目前的選取。

你如何在不同裝置上處理多重選取，
會依你的具體使用情境而有所不同，但最重要的是
確保你為每個平台都提供了最佳的
互動模型。

### 可選取文字

在網頁（以及在桌面端較不明顯）上，
一個常見的使用者預期是大多數可見文字都能用滑鼠游標選取。
當文字無法被選取時，
網頁上的使用者通常會感到不便。

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

在現代桌面應用程式中，客製化應用程式視窗的標題列很常見，例如加入品牌 Logo 以強化品牌識別，或加入情境控制元件來協助主 UI 節省垂直空間。

![Samples of title bars](/assets/images/docs/ui/adaptive-responsive/titlebar.png){:width="100%"}

這在 Flutter 中並未直接支援，但你可以使用 [`bits_dojo`][`bits_dojo`] 套件來停用原生標題列，並以你自訂的標題列取代。

這個套件允許你在 `TitleBar` 中加入任何你想要的元件（Widgets），因為它底層採用純 Flutter 元件實作。這讓你能夠在導覽至應用程式不同區段時，輕鬆調整標題列內容。

[`bits_dojo`]: {{site.github}}/bitsdojo/bitsdojo_window

### 快顯選單與工具提示（Context menus and tooltips）

在桌面環境中，有幾種互動會以覆蓋層（overlay）顯示元件的方式呈現，但它們在觸發、關閉及定位方式上有所不同：

* **快顯選單（Context menu）**
: 通常透過滑鼠右鍵點擊觸發，快顯選單會出現在滑鼠附近，並可透過點擊任意處、選擇選單項目，或點擊選單外部來關閉。

* **工具提示（Tooltip）**
: 通常在滑鼠懸停於互動元件上 200-400 毫秒後觸發，工具提示通常會錨定在某個元件（而非滑鼠位置），當滑鼠游標離開該元件時關閉。

* **彈出面板（Popup panel，也稱為 flyout）**
: 與工具提示類似，彈出面板通常也會錨定在某個元件上。主要差異在於面板多半是在點擊事件時顯示，且當游標離開時通常不會自動隱藏。相反地，面板通常需透過點擊面板外部，或按下 **關閉（Close）** 或 **提交（Submit）** 按鈕來關閉。

若要在 Flutter 中顯示基本的工具提示，可使用內建的 [`Tooltip`][`Tooltip`] 元件（Widget）：

<?code-excerpt "lib/widgets/extra_widget_excerpts.dart (tooltip)"?>
```dart
return const Tooltip(
  message: 'I am a Tooltip',
  child: Text('Hover over the text to show a tooltip.'),
);
```

Flutter 也在編輯或選取文字時，提供了內建的內容選單（context menu）。

若要顯示更進階的提示訊息（tooltip）、彈出面板（popup panel），或建立自訂的內容選單，你可以選擇使用現有的套件，或是自行利用 `Stack` 或 `Overlay` 來實作。

部分可用的套件包括：

* [`context_menus`][`context_menus`]
* [`anchored_popups`][`anchored_popups`]
* [`flutter_portal`][`flutter_portal`]
* [`super_tooltip`][`super_tooltip`]
* [`custom_pop_up_menu`][`custom_pop_up_menu`]

雖然這些控制項對於觸控使用者來說能作為加速器，但對於滑鼠使用者而言則是不可或缺的。這些使用者預期可以右鍵點擊項目、直接編輯內容，並且在滑鼠懸停時獲得更多資訊。如果無法滿足這些預期，可能會讓使用者感到失望，或至少覺得哪裡不太對勁。

[`anchored_popups`]: {{site.pub}}/packages/anchored_popups
[`context_menus`]: {{site.pub}}/packages/context_menus
[`custom_pop_up_menu`]: {{site.pub}}/packages/custom_pop_up_menu
[`flutter_portal`]: {{site.pub}}/packages/flutter_portal
[`super_tooltip`]: {{site.pub}}/packages/super_tooltip
[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html

### 水平按鈕順序

在 Windows 上，當呈現一排按鈕時，確認按鈕會放在這一排的開頭（左側）。而在其他所有平台上，則相反，確認按鈕會放在這一排的結尾（右側）。

在 Flutter 中，可以透過 `TextDirection` 屬性搭配 `Row` 輕鬆處理這個需求：

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
在 Windows 和 Linux 上，這個選單會作為 Chrome 標題列的一部分出現，  
而在 macOS 上，則位於主螢幕的頂端。

目前，你可以透過一個原型外掛（prototype plugin）來指定自訂選單列項目，  
但預期這項功能最終會整合進主要的 SDK。

值得一提的是，在 Windows 和 Linux 上，  
你無法將自訂標題列與選單列結合使用。  
當你建立自訂標題列時，會完全取代原生的標題列，  
這也代表你會失去整合的原生選單列。

如果你同時需要自訂標題列和選單列，  
可以考慮在 Flutter 中自行實作，  
類似於自訂右鍵選單（context menu）的方式。

### 拖放（Drag and drop）

拖放（drag and drop）是觸控式與指標式輸入的核心互動之一。  
雖然這種互動在兩種輸入方式中都很常見，  
但在處理可拖曳項目的滾動清單時，  
有一些重要的差異需要考慮。

一般來說，觸控使用者會期望看到拖曳把手（drag handles），  
以區分可拖曳區域與可滾動區域，  
或者是透過長按（long press）手勢來啟動拖曳。  
這是因為在觸控操作下，滾動與拖曳都共用同一根手指作為輸入。

滑鼠使用者則有更多輸入選項。他們可以使用滾輪或捲軸來滾動，  
通常就不需要專門的拖曳把手。  
如果你觀察 macOS Finder 或 Windows Explorer，  
會發現它們就是這樣運作：只要選取一個項目並開始拖曳即可。

在 Flutter 中，你可以用多種方式實作拖放功能。  
本文不會深入討論具體實作細節，但高層級的選項包括：

* 直接使用 [`Draggable`][`Draggable`] 和 [`DragTarget`][`DragTarget`] API，  
  以打造自訂的外觀與體驗。

* 監聽 `onPan` 手勢事件，  
  並在父層 `Stack` 中自行移動物件。

* 使用 pub.dev 上的 [現成清單套件][pre-made list packages]。  

[`Draggable`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`DragTarget`]: {{site.api}}/flutter/widgets/DragTarget-class.html
[pre-made list packages]: {{site.pub}}/packages?q=reorderable+list
