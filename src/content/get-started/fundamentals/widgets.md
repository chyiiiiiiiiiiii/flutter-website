---
title: 元件 (Widgets)
description: 學習 Flutter 的基本構建區塊。
prev:
  title: Dart 入門
  path: /get-started/fundamentals/dart
next:
  title: 版面配置
  path: /get-started/fundamentals/layout
---

要開始使用 Flutter，
你需要對 Dart 程式語言有一些基本認識，因為 Flutter 應用程式是用 Dart 撰寫的；
同時也要了解元件 (Widgets)，
它們是 Flutter UI 的構建基礎。
這兩個主題都會在本頁介紹，
但你會在本系列後續內容中持續學習更多相關知識。
本頁也會列出額外的學習資源，
但你不需要在這兩個主題上成為專家才能繼續閱讀。

## 元件 (Widgets)

在 Flutter 的相關討論中，你經常會聽到
「一切皆元件 (Everything is a widget)」這句話。
元件 (Widgets) 是 Flutter 應用程式使用者介面的構建基礎，
每個元件 (Widget) 都是 UI 部分的不可變聲明。
元件 (Widgets) 用來描述使用者介面的所有面向，
從文字和按鈕等實體元素，到像是內距 (padding) 和對齊 (alignment) 等版面配置效果。

元件 (Widgets) 會以組合 (composition) 的方式形成階層結構。
每個元件 (Widget) 都會巢狀在其父元件 (parent) 之中，
並且可以從父元件獲取 context。
這個結構會一路延伸到根元件 (root widget)，
如下方這個簡單範例所示：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp( // Root widget
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My Home Page'),
        ),
        body: Center(
          child: Builder(
            builder: (context) {
              return Column(
                children: [
                  const Text('Hello, World!'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      print('Click!');
                    },
                    child: const Text('A button'),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
```

在前述程式碼中，
所有被實例化的類別都是元件（Widgets）：
`MaterialApp`、`Scaffold`、`AppBar`、`Text`、
`Center`、`Builder`、`Column`、`SizedBox`，以及
`ElevatedButton`。

### 元件組合（Widget composition）

如前所述，Flutter 強調以元件（Widget）作為組合的單位。元件通常是由許多其他小型、單一用途的元件所組成，這些元件結合起來可以產生強大的效果。

有一些版面配置元件（Layout widgets），例如
`Padding`、`Alignment`、`Row`、`Column`，
以及 `Grid`。這些版面配置元件本身沒有視覺上的表現，
它們唯一的目的就是
控制其他元件在版面上的某些層面。
Flutter 也包含了一些實用元件（utility widgets），
這些元件善用這種組合式的設計方式。
舉例來說，`Container` 是一個常用的元件，
它是由多個負責版面配置、繪製、定位和尺寸調整的元件所組成。
有些元件具有視覺表現，
例如前述範例中的 `ElevatedButton` 和
`Text`，以及像 `Icon` 和 `Image` 這類元件。

如果你執行前述範例的程式碼，
Flutter 會繪製一個按鈕，並在螢幕中央垂直排列顯示
「Hello, World!」這段文字。
為了排版這些元素，這裡有一個 `Center` 元件，
它會將其子元件置中於可用空間，
還有一個 `Column` 元件，
它會將其子元件垂直一個接一個地排列。

<img src='/assets/images/docs/fwe/simple_composition_example.png' width="100%" alt="A diagram that shows widget composition with a series of lines and nodes.">

在本系列的[下一頁][next page]，你將會
進一步了解 Flutter 的版面配置。

### 建立元件（Building widgets）

要在 Flutter 中建立使用者介面，
你需要覆寫元件物件上的 [`build`][`build`] 方法。
所有元件都必須有一個 build 方法，
而且它必須回傳另一個元件。例如，
如果你想要在螢幕上加入帶有間距的文字，
你可以這樣撰寫：

```dart
class PaddedText extends StatelessWidget {
  const PaddedText({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: const Text('Hello, World!'),
    );
  }
}
```

當這個元件（widget）被建立時，以及當這個元件的相依項發生變化時（例如傳遞進元件的狀態），框架會呼叫 `build` 方法。  
這個方法有可能在每一幀（frame）都被呼叫，因此除了建立元件之外，不應該產生任何副作用。  
若想進一步了解 Flutter 如何渲染元件，請參考 [Flutter architectural overview][Flutter architectural overview]。

### 元件狀態

框架引入了兩大類主要的元件：有狀態（stateful）元件與無狀態（stateless）元件。

沒有可變狀態的元件（也就是它們沒有會隨時間改變的類別屬性）會繼承自 [`StatelessWidget`][`StatelessWidget`]。  
許多內建元件都是無狀態元件，例如 `Padding`、`Text` 和 `Icon`。  
當你建立自己的元件時，大多數情況下你會建立 `Stateless` 元件。

另一方面，如果元件的獨特特性需要根據使用者互動或其他因素而改變，該元件就是有狀態的。  
舉例來說，如果一個元件有一個計數器，每當使用者點擊按鈕時就會遞增，那麼計數器的值就是該元件的狀態。  
當這個值改變時，元件需要被重新建立，以更新其在 UI 上所負責的部分。  
這些元件會繼承自 [`StatefulWidget`][`StatefulWidget`]，而（因為元件本身是不可變的）可變狀態則會儲存在另一個繼承自 [`State`][`State`] 的類別中。  
`StatefulWidgets` 沒有 `build` 方法；相反地，它們的使用者介面是透過其 `State` 物件來建立，如下方範例所示。

```dart
class CounterWidget extends StatefulWidget {
  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('$_counter');
  }
}
```

每當你對 `State` 物件進行變更
（例如，遞增計數器），
你必須呼叫 [`setState`][`setState`] 來通知框架（framework）
再次呼叫 `State` 的 `build` 方法，
以更新使用者介面。

將狀態與元件（Widget）物件分離，
讓其他元件可以用完全相同的方式
對待無狀態元件與有狀態元件，
而不必擔心狀態遺失的問題。
父元件不需要保留子元件來維持其狀態，
可以隨時建立子元件的新實例，
而不會遺失子元件的持久狀態。
框架會自動處理尋找並在適當時重複利用現有狀態物件的工作。

關於 [`StatefulWidget`][`StatefulWidget`] 物件的更多資訊，
會在本系列稍後的[狀態管理課程][state management lesson]中介紹。

## 重要元件（Widgets）介紹

Flutter SDK（Flutter 軟體開發套件）內建了許多元件，
從最小的 UI 元素（如 `Text`），
到版面配置元件（Layout widgets），
以及用於美化應用程式的元件。
以下這些元件是你在學習路徑的下一課中
最需要了解的重點：

* [`Container`][`Container`]
* [`Text`][`Text`]
* [`Scaffold`][`Scaffold`]
* [`AppBar`][`AppBar`]
* [`Row`][`Row`] 和 [`Column`][`Column`]
* [`ElevatedButton`][`ElevatedButton`]
* [`Image`][`Image`]
* [`Icon`][`Icon`]

## 元件預覽工具

你可以即時預覽你的元件渲染效果，而不需啟動完整應用程式。
想了解更多，請參閱 [Flutter Widget Previewer][Flutter Widget Previewer] 指南。

[Flutter Widget Previewer]: /tools/widget-previewer

## 下一步：版面配置

本頁介紹了 Flutter 的基礎概念，例如元件（Widgets），
並協助你熟悉閱讀 Flutter 與 Dart 程式碼。
如果你對於遇到的每個主題還不完全清楚也沒關係，
因為接下來的每一頁都會針對特定主題深入探討。
在下一節，你將開始建立更有趣的 UI，
透過 Flutter 創建更複雜的版面配置。

如果你想要練習本頁學到的內容，
可以閱讀 [Building user interfaces with Flutter][Building user interfaces with Flutter]。

[Building user interfaces with Flutter]: /ui
[`build`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[next page]: /get-started/fundamentals/layout
[Flutter architectural overview]: /resources/architectural-overview
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[state management lesson]: /get-started/fundamentals/state-management
[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`Icon`]: {{site.api}}/flutter/widgets/Icon-class.html
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html

## 意見回饋

由於本網站區塊仍在持續發展中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="widgets"
