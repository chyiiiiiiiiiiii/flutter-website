---
title: 建立你的專案
description: 如何建立新的 Flutter 應用程式的說明。
permalink: /tutorial/set-up-state-app/
---

在本教學中，你將學習如何在 Flutter 應用程式中處理資料。你將建立一個應用程式，從 [Wikipedia API][Wikipedia API] 擷取並顯示文章摘要。

<img src="/assets/images/docs/tutorial/wikipedia_app.png" height="500px" 
style="border:1px solid black" alt="A screenshot of the completed 
Wikipedia reader app showing an article with image, title, 
description, and extract text.">

本教學將探討：

* 在 Flutter 中發送 HTTP 請求
* 使用 `ChangeNotifier` 管理應用程式狀態
* 採用 MVVM 架構模式
* 建立能隨資料變動自動更新的響應式使用者介面

本教學假設你已完成 [Dart 入門教學][] 以及 [Flutter 入門教學][introductory Flutter tutorial]，因此不會再說明 HTTP、JSON 或元件（Widget）基礎等概念。

:::note 支持 Wikipedia
Wikipedia 是一個極具價值的資源，透過全球志工協作撰寫的數百萬篇文章，免費提供人類知識。請考慮[捐款給 Wikipedia][]，協助讓這項珍貴的資源持續免費並對所有人開放。
:::

## 建立新的 Flutter 專案

請使用 [Flutter CLI][Flutter CLI] 建立新的 Flutter 專案。在終端機中執行下列指令，即可建立一個最小化的 Flutter 應用程式：

```bash
$ flutter create wikipedia_reader --empty
```

## 新增必要的相依套件

你的應用程式需要兩個 [套件][packages] 來處理 HTTP 請求以及 Wikipedia 資料。請將它們加入你的專案中：

```shell
$ cd wikipedia_reader
$ flutter pub add http dartpedia
```

[`http` 套件][`http` package] 提供用於發送 HTTP 請求的工具，而 `dartpedia` 套件則包含用於處理 Wikipedia API 回應的資料模型。

## 檢視起始程式碼

打開 `lib/main.dart`，並將現有程式碼替換為以下這個基本結構，這會加入應用程式所需的匯入（import）。

```dart
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:wikipedia/wikipedia.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Wikipedia Flutter'),
        ),
        body: const Center(
          child: Text('Loading...'),
        ),
      ),
    );
  }
}
```

這段程式碼提供了一個基本的應用程式結構，包含標題列以及佔位內容。最上方的匯入（import）已經包含了你進行 HTTP 請求、JSON 解析，以及 Wikipedia 資料模型所需的一切。

## 執行你的應用程式

透過執行你的應用程式來測試一切是否正常運作：

```bash
$ flutter run -d chrome
```

你應該會看到一個簡單的應用程式，App Bar 上顯示「Wikipedia Flutter」，螢幕中央則顯示「Loading...」。

[Wikipedia API]: https://en.wikipedia.org/api/rest_v1/
[donating to Wikipedia]: https://donate.wikimedia.org/
[introductory Flutter tutorial]: /tutorial/create-an-app/
[Dart Getting Started tutorial]: {{site.dart-site}}/tutorial
[Flutter CLI]: /reference/flutter-cli
[packages]: /packages-and-plugins/using-packages
[`http` package]: {{site.pub}}/packages/http
