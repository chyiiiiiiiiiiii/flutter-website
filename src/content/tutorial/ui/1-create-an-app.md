---
title: 建立應用程式
description: 說明如何建立新的 Flutter 應用程式。
permalink: /tutorial/create-an-app/
---

{%- comment %}
<!-- TODO(ewindmill) embed video -->
{%- endcomment %}

在這個 Flutter 教學的第一部分，你將會建立一個名為「Birdle」的應用程式核心 UI，這是一款類似於 [Wordle, the popular New York Times game][] 的遊戲。

完成本教學後，你將學會建立 Flutter UI 的基本知識，你的應用程式將會如以下螢幕截圖所示（而且大部分功能都能正常運作 😀）。

<img src='/assets/images/docs/tutorial/birdle.png' width="100%" alt="A screenshot that resembles the popular game Wordle.">

## 建立新的 Flutter 專案

開發 Flutter 應用程式的第一步，就是建立一個新的專案。你可以使用 [Flutter 命令列介面 (Command Line Interface) 工具][Flutter CLI tool]，這個工具會隨 Flutter SDK 一同安裝。

請打開你的終端機或命令提示字元，並執行以下指令來建立新的 Flutter 專案：

```shell
$ flutter create birdle --empty
```

這會使用最精簡的「空白」範本建立一個新的 Flutter 專案。

## 檢視程式碼

在你的 IDE 中，開啟位於 `lib/main.dart` 的檔案。從檔案最上方開始，你會看到以下程式碼。

```dart
import 'package:flutter/material.dart'; // imports Flutter

void main() {
  runApp(const MainApp());
}
// ...
```

`main` 函式是任何 Dart 程式的進入點，而 Flutter 應用程式本質上就是一個 **Dart** 程式。`runApp` 方法是 Flutter SDK（Flutter 軟體開發套件）的一部分，它會接收一個**元件（Widget）**作為參數。（本教學大部分內容都與元件有關，但簡單來說，元件就是描述某一段 UI 的 Dart 物件。）在這裡，傳入的是 `MainApp` 元件（Widget）的實例。

在 `main` 函式的下方，你會看到 `MainApp` 類別宣告。

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}

```

`MainApp` 是**根元件（root widget）**，因為它是被傳遞給 `runApp` 的元件。在這個元件中，有一個 `build` 方法，該方法會回傳另一個名為 `MaterialApp` 的元件。基本上，這就是一個 Flutter 應用程式的本質：由多個元件（Widgets）組成的樹狀結構，稱為**元件樹（widget tree）**。作為 Flutter 開發者，你的工作就是將 SDK 中的元件組合起來，建立更大型、客製化的元件來顯示 UI。

目前，元件樹相當簡單：

<img src='/assets/images/docs/tutorial/initial_widget_tree.png' alt="A screenshot that resembles the popular game Wordle.">

## 執行你的應用程式

在你的 Flutter 應用程式根目錄下的終端機中，執行：

```shell
$ cd birdle
$ flutter run -d chrome
```

應用程式會在新的 Chrome 視窗中建置並啟動。

<img src='/assets/images/docs/tutorial/hello_world.png' alt="A screenshot that resembles the popular game Wordle.">

## 使用 hot reload

**Stateful hot reload**（狀態保留的 hot reload），如果你還沒聽過，它允許正在執行的 Flutter 應用程式在不到一秒的時間內重新渲染更新過的商業邏輯或 UI 程式碼——而且不會失去你在應用程式中的當前位置。

在你的 IDE 中，打開 `main.dart` 檔案，並跳至大約第 15 行，找到以下程式碼：

```dart
child: Text('Hello World!'),
```

將字串中的文字更改為你想要的內容。然後，在執行應用程式的終端機中按下 `r` 以進行熱重載（hot-reload）。執行中的應用程式應該會立即顯示你更新後的文字。


[Flutter CLI tool]: /reference/flutter-cli
[Wordle, the popular New York Times game]: https://www.nytimes.com/games/wordle/index.html 
[read more about using pub packages]: {{site.dart-site}}/tools/pub/packages
[`flutter_gse`]: {{site.pub}}/packages/flutter_gse
