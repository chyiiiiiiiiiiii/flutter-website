# 自訂選單的新方式

> 多個用於自訂選單的硬編碼參數，現已被通用的元件（Widget）建構器所取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

選單（context menus），或稱文字選取工具列（text selection toolbars），是在 Flutter 中長按或右鍵點擊文字時出現的選單，通常會顯示 **剪下**、**複製**、**貼上** 以及 **全選** 等選項。過去，只能透過 `ToolbarOptions` 和 `TextSelectionControls` 來有限度地自訂這些選單。現在，這些選單已經像 Flutter 其他功能一樣，能夠以元件 (Widget) 組合方式自訂，原本的特定設定參數也已被棄用。

## 背景

過去，可以利用 `TextSelectionControls` 來停用選單中的按鈕，但若要進一步自訂，則必須複製並修改框架中數百行的自訂類別。現在，這一切都被一個簡單的建構器函式 `contextMenuBuilder` 取代，讓你可以將任何 Flutter 元件（Widget）用作選單。

## 變更說明

選單現在是透過 `contextMenuBuilder` 參數來建構，該參數已加入所有文字編輯與文字選取元件（Widget）。如果未提供該參數，Flutter 會自動設為預設值，並根據不同平台建立正確的選單。所有這些預設元件（Widget）都已公開給使用者重複利用。自訂選單現在只需使用 `contextMenuBuilder` 回傳你想要的任何元件（Widget），也可以重複利用內建的選單元件。

以下範例展示如何在選取電子郵件地址時，於預設選單中新增 **傳送電子郵件** 按鈕。完整程式碼可在 GitHub 的 samples repository 中的
[email_button_page.dart](https://github.com/flutter/samples/blob/main/context_menus/lib/email_button_page.dart)
找到。

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    final TextEditingValue value = editableTextState.textEditingValue;
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    if (isValidEmail(value.selection.textInside(value.text))) {
      buttonItems.insert(
          0,
          ContextMenuButtonItem(
            label: 'Send email',
            onPressed: () {
              ContextMenuController.removeAny();
              Navigator.of(context).push(_showDialog(context));
            },
          ));
    }
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

各種不同自訂右鍵選單（context menu）的範例，可在 GitHub 的
[samples repo](https://github.com/flutter/samples/tree/main/context_menus)
中找到。

所有相關的已棄用功能，皆已標註棄用警告：「請改用 `contextMenuBuilder`。」

## 遷移指南

一般來說，所有先前已被棄用的右鍵選單（context menu）相關變更，現在都需要在相關的文字編輯或文字選取元件（Widget）上，使用 `contextMenuBuilder` 參數（
例如[在 `TextField` 上](https://api.flutter.dev/flutter/material/TextField/contextMenuBuilder.html)）。若要使用 Flutter 內建的右鍵選單，請回傳像
[`AdaptiveTextSelectionToolbar`](https://api.flutter.dev/flutter/material/AdaptiveTextSelectionToolbar-class.html)
這樣的內建右鍵選單元件；若需要完全自訂，則可回傳你自訂的元件。

為了遷移至 `contextMenuBuilder`，下列參數與類別已被棄用。

### [`ToolbarOptions`](https://api.flutter.dev/flutter/widgets/ToolbarOptions-class.html)

這個類別先前用於明確啟用或停用右鍵選單中的特定按鈕。在這項變更之前，你可能會像這樣將它傳入 `TextField` 或其他元件：

```dart
// Deprecated.
TextField(
  toolbarOptions: ToolbarOptions(
    copy: true,
  ),
)
```

現在，你可以透過調整傳遞給 `AdaptiveTextSelectionToolbar` 的 `buttonItems` 來達到相同的效果。例如，你可以確保 **Cut** 按鈕永遠不會出現，但其他按鈕則會如常顯示：

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    buttonItems.removeWhere((ContextMenuButtonItem buttonItem) {
      return buttonItem.type == ContextMenuButtonType.cut;
    });
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

或者，你也可以確保 **Cut** 按鈕始終且僅顯示：

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: <ContextMenuButtonItem>[
        ContextMenuButtonItem(
          onPressed: () {
            editableTextState.cutSelection(SelectionChangedCause.toolbar);
          },
          type: ContextMenuButtonType.cut,
        ),
      ],
    );
  },
)
```

### [`TextSelectionControls.canCut`](https://api.flutter.dev/flutter/widgets/TextSelectionControls/canCut.html) 以及其他按鈕布林值

這些布林值先前與 `ToolbarOptions.cut` 等具有相同的效果，用於啟用或停用特定按鈕。在此變更之前，你可能會透過覆寫 `TextSelectionControls` 並設定這些布林值，來隱藏或顯示按鈕，例如：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  bool canCut() => false,
}
```

請參閱前一節關於 `ToolbarOptions` 的說明，以了解如何使用 `contextMenuBuilder` 達到類似效果。

### [`TextSelectionControls.handleCut`](https://api.flutter.dev/flutter/widgets/TextSelectionControls/handleCut.html) 以及其他按鈕回呼函式

這些函式允許在按下按鈕時修改所呼叫的回呼（callback）函式。在這項變更之前，你可能會透過覆寫這些處理程序方法來修改右鍵選單（context menu）按鈕的回呼函式，例如：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  bool handleCut() {
    // My custom cut implementation here.
  },
}
```

這仍然可以透過 `contextMenuBuilder` 實現，包括在自訂處理程序中呼叫原本按鈕的動作，以及使用像 `AdaptiveTextSelectionToolbar.buttonItems` 這樣的工具列元件（Widget）。

以下範例展示如何修改 **Copy** 按鈕，讓它在執行原本的複製邏輯之外，額外顯示一個對話框。

```dart
TextField(
  contextMenuBuilder: (BuildContext context, EditableTextState editableTextState) {
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    final int copyButtonIndex = buttonItems.indexWhere(
      (ContextMenuButtonItem buttonItem) {
        return buttonItem.type == ContextMenuButtonType.copy;
      },
    );
    if (copyButtonIndex >= 0) {
      final ContextMenuButtonItem copyButtonItem =
          buttonItems[copyButtonIndex];
      buttonItems[copyButtonIndex] = copyButtonItem.copyWith(
        onPressed: () {
          copyButtonItem.onPressed();
          Navigator.of(context).push(
            DialogRoute<void>(
              context: context,
              builder: (BuildContext context) =>
                const AlertDialog(
                  title: Text('Copied, but also showed this dialog.'),
                ),
            );
          )
        },
      );
    }
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

一個完整的修改內建右鍵選單（context menu）操作的範例，可以在 GitHub 的 samples 儲存庫中的
[modified_action_page.dart](https://github.com/flutter/samples/blob/main/context_menus/lib/modified_action_page.dart)
找到。

### [`buildToolbar`](https://api.flutter.dev/flutter/widgets/TextSelectionControls/buildToolbar.html)

這個函式產生右鍵選單元件（Widget）的方式與
`contextMenuBuilder` 類似，但需要更多的設定才能使用。在這個變更之前，你可能會像這樣，將 `buildToolbar` 覆寫為 `TextSelectionControls` 的一部分：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  Widget buildToolbar(
    BuildContext context,
    Rect globalEditableRegion,
    double textLineHeight,
    Offset selectionMidpoint,
    List<TextSelectionPoint> endpoints,
    TextSelectionDelegate delegate,
    ClipboardStatusNotifier clipboardStatus,
    Offset lastSecondaryTapDownPosition,
  ) {
    return _MyCustomToolbar();
  },
}
```

現在你可以直接將 `contextMenuBuilder` 作為參數傳遞給 `TextField`（以及其他相關元件）。在傳遞給 `buildToolbar` 的參數中所提供的資訊，現在可以從傳遞給 `contextMenuBuilder` 的 `EditableTextState` 中取得。

以下範例展示如何從零開始建立一個完全自訂的工具列（toolbar），同時仍然使用預設按鈕。

```dart
class _MyContextMenu extends StatelessWidget {
  const _MyContextMenu({
    required this.anchor,
    required this.children,
  });

  final Offset anchor;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top: anchor.dy,
          left: anchor.dx,
          child: Container(
            width: 200,
            height: 200,
            color: Colors.amberAccent,
            child: Column(
              children: children,
            ),
          ),
        ),
      ],
    );
  }
}

class _MyTextField extends StatelessWidget {
  const _MyTextField();

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      maxLines: 4,
      minLines: 2,
      contextMenuBuilder: (context, editableTextState) {
        return _MyContextMenu(
          anchor: editableTextState.contextMenuAnchors.primaryAnchor,
          children: AdaptiveTextSelectionToolbar.getAdaptiveButtons(
            context,
            editableTextState.contextMenuButtonItems,
          ).toList(),
        );
      },
    );
  }
}
```

在 GitHub 的範例程式庫中，
[`custom_menu_page.dart`](https://github.com/flutter/samples/blob/main/context_menus/lib/custom_menu_page.dart)
提供了建立自訂右鍵選單（context menu）的完整範例。

## 時程

合併於版本：3.6.0-0.0.pre<br>
穩定版釋出：3.7.0

## 參考資料

API 文件：

* [`TextField.contextMenuBuilder`](https://api.flutter.dev/flutter/material/TextField/contextMenuBuilder.html)
* [`AdaptiveTextSelectionToolbar`](https://api.flutter.dev/flutter/material/AdaptiveTextSelectionToolbar-class.html)

相關議題（issues）：

* [Simple custom text selection toolbars](https://github.com/flutter/flutter/issues/73574)
* [Right click menu outside of text fields](https://github.com/flutter/flutter/issues/98272)
* [Text editing for desktop - stable](https://github.com/flutter/flutter/issues/90563)
* [Ability to disable context menu on TextFields](https://github.com/flutter/flutter/issues/79796)
* [Missing APIs for text selection toolbar styling](https://github.com/flutter/flutter/issues/22210)
* [Enable copy toolbar in all widgets](https://github.com/flutter/flutter/issues/49996)
* [Disable context menu from browser](https://github.com/flutter/flutter/issues/78671)
* [Custom context menus don't show up for Flutter web](https://github.com/flutter/flutter/issues/84219)

相關 PR：

* [ContextMenus](https://github.com/flutter/flutter/pull/107193)
* [Ability to disable the browser's context menu on web](https://github.com/flutter/flutter/pull/118194)
* [Ability to disable the browser's context menu on web (engine)](https://github.com/flutter/engine/pull/38682)
* [Custom context menus in SelectableRegion on web](https://github.com/flutter/flutter/pull/121653)

