---
title: 建立一個應用程式
description: 如何建立新的 Flutter 應用程式的說明。
permalink: /tutorial/create-an-app/
---

{%- comment %}
<!-- TODO(ewindmill) embed video -->
{%- endcomment %}

在本 Flutter 教學的第一部分，你將建立一個名為「Birdle」的應用程式核心 UI，這是一款類似於 [Wordle，紐約時報熱門遊戲][Wordle, the popular New York Times
game] 的遊戲。

完成本教學後，你將學會建立 Flutter UI 的基本知識，而你的應用程式將會長得像下方的螢幕截圖（而且大部分功能都能正常運作 😀）。

<img src='/assets/images/docs/tutorial/birdle.png' width="100%" alt="A screenshot that resembles the popular game Wordle.">

## 建立新的 Flutter 專案

建立 Flutter 應用程式的第一步，就是建立一個新的專案。你可以使用 [Flutter 命令列介面 (Command Line Interface) 工具][Flutter CLI tool] 來建立新應用程式，該工具已隨 Flutter SDK 一併安裝。

請開啟你的終端機或命令提示字元，並執行下列指令來建立新的 Flutter 專案：

```shell
$ flutter create birdle --empty
```

這會使用最精簡的「空白」範本建立一個新的 Flutter 專案。

## 檢視程式碼

在你的 IDE 中，開啟位於 `lib/main.dart` 的檔案。從檔案頂端開始，你會看到以下程式碼。

```dart
import 'package:flutter/material.dart'; // imports Flutter

void main() {
  runApp(const MainApp());
}
// ...
```

`main` 函式是所有 Dart 程式的進入點，而 Flutter 應用程式本質上就是一個 **Dart** 程式。`runApp` 方法是 Flutter SDK（Flutter 軟體開發套件）的一部分，它會接收一個**元件（Widget）**作為參數。（本教學大多內容都在介紹元件（Widgets），簡單來說，元件就是描述一個 UI 片段的 Dart 物件。）在這裡，傳入的是 `MainApp` 元件（Widget）的實例。

在 `main` 函式的下方，你會看到 `MainApp` 類別的宣告。

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

`MainApp` 是**根元件（root widget）**，因為它是被傳遞給 `runApp` 的元件。在這個元件中，有一個 `build` 方法，該方法會回傳另一個名為 `MaterialApp` 的元件。基本上，這就是一個 Flutter 應用程式的本質：由多個元件（Widgets）組成的樹狀結構，稱為**元件樹（widget tree）**。作為 Flutter 開發者，你的工作就是將 SDK 中的元件組合成更大的自訂元件，來呈現 UI。

目前，元件樹相當簡單：

<img src='/assets/images/docs/tutorial/initial_widget_tree.png' alt="A screenshot that resembles the popular game Wordle.">

## 執行你的應用程式

在終端機中，於你的 Flutter 應用程式根目錄下執行：

```shell
$ cd birdle
$ flutter run -d chrome
```

應用程式將會建置並在新的 Chrome 實例中啟動。

<img src='/assets/images/docs/tutorial/hello_world.png' alt="A screenshot that resembles the popular game Wordle.">

## 使用熱重載（hot reload）

如果你還沒聽過，**有狀態熱重載（Stateful hot reload）** 允許正在執行中的 Flutter 應用程式，在不到一秒的時間內重新渲染已更新的商業邏輯或 UI 程式碼——而且不會失去你在應用程式中的當前位置。

在你的 IDE 中，打開 `main.dart` 檔案，並前往大約第 15 行，找到以下程式碼：

```dart
child: Text('Hello World!'),
```

將字串中的文字更改為你想要的內容。然後，在應用程式執行的終端機中按下`r`，即可熱重載（hot-reload）你的應用程式。執行中的應用程式應該會立即顯示你更新後的文字。


[Flutter CLI tool]: /reference/flutter-cli
[Wordle, the popular New York Times game]: https://www.nytimes.com/games/wordle/index.html 
[read more about using pub packages]: {{site.dart-site}}/tools/pub/packages
[`flutter_gse`]: {{site.pub}}/packages/flutter_gse
