# Web 無障礙

> 關於 Web 無障礙的資訊



## 背景

Flutter 支援 Web 無障礙，方法是將其內部的 Semantics 樹轉譯為可供螢幕閱讀器理解的無障礙 HTML DOM 結構。
由於 Flutter 會在單一畫布上渲染其 UI，因此需要一個特殊的層來將 UI 的意義與結構暴露給網頁瀏覽器。


## 選擇性啟用 Web 無障礙

### 隱形按鈕

為了效能考量，Flutter 的 Web 無障礙功能預設是關閉的。
若要開啟無障礙功能，使用者需要按下帶有 `aria-label="Enable accessibility"` 的隱形按鈕。
按下此按鈕後，DOM 樹將會反映所有元件 (Widget) 的無障礙資訊。

### 以程式碼開啟無障礙模式

另一種方式是，在執行應用程式時加入以下程式碼，以開啟無障礙模式。

```dart
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  if (kIsWeb) {
    SemanticsBinding.instance.ensureSemantics();
  }
}
```



## 使用語意角色提升無障礙性

### 什麼是語意角色（Semantic Roles）？

語意角色（Semantic Roles）定義了 UI 元件 (Widget) 的用途，協助螢幕閱讀器及其他輔助工具正確解讀並呈現你的應用程式給使用者。例如，一個角色可以指出某個元件是按鈕、連結、標題、滑桿，或是表格的一部分。

雖然 Flutter 的標準元件 (Widget) 通常會自動提供這些語意資訊，但如果自訂元件沒有明確定義角色，對於螢幕閱讀器使用者來說，可能會變得難以理解。


透過指派適當的角色，你可以確保：

* 螢幕閱讀器能正確宣告元素的類型與用途。
* 使用者能透過輔助科技更有效地瀏覽你的應用程式。
* 你的應用程式符合網頁無障礙標準，提升可用性。

### 在 Flutter for web 中使用 `SemanticsRole`

Flutter 提供了 [`Semantics` 元件（Widget）][`Semantics` widget] 搭配 [`SemanticsRole` 列舉（enum）][`SemanticsRole` enum]，讓開發者能為自己的元件 (Widget) 指派特定角色。當你的 Flutter web 應用程式被渲染 (render) 時，這些 Flutter 專屬的角色會被轉換為對應的 ARIA 角色，並反映在網頁的 HTML 結構中。

[`Semantics` widget]: https://api.flutter.dev/flutter/widgets/Semantics-class.html
[`SemanticsRole` enum]: https://api.flutter.dev/flutter/dart-ui/SemanticsRole.html

**1. 標準元件 (Widget) 自動帶有語意資訊**

許多標準 Flutter 元件（如 `TabBar`、`MenuAnchor` 和 `Table`）會自動包含語意資訊及其角色。建議盡可能優先使用這些標準元件，因為它們已經內建處理多項無障礙相關細節。

**2. 明確新增或覆寫角色**

針對自訂元件，或當預設語意資訊不足時，可以使用 `Semantics` 元件來定義角色：

以下是一個明確定義清單及其項目的範例：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';


class MyCustomListWidget extends StatelessWidget {
  const MyCustomListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // This example shows how to explicitly assign list and listitem roles
    // when building a custom list structure.
    return Semantics(
      role: SemanticsRole.list,
      explicitChildNodes: true,
      child: Column(
        children: <Widget>[
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the first custom list item.'),
            ),
          ),
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the second custom list item.'),
            ),
          ),
        ],
      ),
    );
  }
}
```

