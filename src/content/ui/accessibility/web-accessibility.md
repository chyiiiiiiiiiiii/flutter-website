---
title: 網頁無障礙
description: 關於網頁無障礙的資訊
---

## 背景

Flutter 透過將其內部的 Semantics 樹轉換為可供螢幕閱讀器理解的 HTML DOM 結構，來支援網頁無障礙功能。
由於 Flutter 會將 UI 繪製在單一畫布上，因此需要一個特殊的層來向網頁瀏覽器揭露 UI 的意義與結構。

## 選擇性啟用網頁無障礙功能

### 隱形按鈕

為了提升效能，Flutter 的網頁無障礙功能預設並未啟用。
若要開啟無障礙功能，使用者需透過`aria-label="Enable accessibility"`按下隱形按鈕。
按下按鈕後，DOM 樹將會反映所有元件（Widgets）的無障礙資訊。

### 以程式碼啟用無障礙模式

另一種方式是於執行應用程式時，加入以下程式碼以啟用無障礙模式。

```dart
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  if (kIsWeb) {
    SemanticsBinding.instance.ensureSemantics();
  }
}
```



## 透過語意角色提升無障礙體驗

### 什麼是語意角色（Semantic Roles）？

語意角色定義了 UI 元件（Widget）的用途，協助螢幕閱讀器和其他輔助工具有效地解讀並呈現您的應用程式給使用者。例如，角色可以指示某個元件是按鈕（button）、連結（link）、標題（heading）、滑桿（slider），或是表格的一部分。

雖然 Flutter 的標準元件（Widgets）通常會自動提供這些語意資訊，但如果自訂元件沒有明確定義角色，螢幕閱讀器使用者可能無法理解其用途。

透過指派適當的角色，您可以確保：

* 螢幕閱讀器能正確宣告元件的類型與用途。
* 使用者能利用輔助技術更有效地瀏覽您的應用程式。
* 您的應用程式符合網頁無障礙標準，提升可用性。

### 在 Flutter for web 中使用 `SemanticsRole`

Flutter 提供了 [`Semantics` 元件（Widget）][`Semantics` widget] 搭配 [`SemanticsRole` 列舉（enum）][`SemanticsRole` enum]，讓開發者可以為元件（Widgets）指定特定角色。當您的 Flutter 網頁應用程式被渲染時，這些 Flutter 特有的角色會轉換為網頁 HTML 結構中的對應 ARIA 角色。

[`Semantics` widget]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsRole` enum]: {{site.api}}/flutter/dart-ui/SemanticsRole.html

**1. 標準元件自動提供語意資訊**

許多標準 Flutter 元件（如 `TabBar`、`MenuAnchor` 和 `Table`）會自動包含語意資訊及其角色。建議盡可能使用這些標準元件，因為它們已內建多項無障礙功能。

**2. 明確新增或覆寫角色**

針對自訂元件，或當預設語意資訊不足時，可以使用 `Semantics` 元件來定義角色：

以下範例說明如何明確定義一個清單及其項目：

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
