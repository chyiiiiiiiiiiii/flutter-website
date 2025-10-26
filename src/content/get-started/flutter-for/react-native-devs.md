---
title: 給 React Native 開發者的 Flutter 指南
description: 學習如何將 React Native 開發經驗應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/react_native_devs"?>

本文件適用於希望將現有 React Native（RN）知識應用於 Flutter 行動應用程式開發的開發者。如果你已經了解 RN 框架的基本原理，可以將本文件作為入門學習 Flutter 開發的參考。

你可以將本文件當作食譜（cookbook）使用，根據需求跳著閱讀最相關的問題。

## 給 JavaScript（ES6）開發者的 Dart 語言簡介

與 React Native 類似，Flutter 採用反應式（reactive-style）視圖。不過，RN 會轉譯（transpile）為原生元件（Widgets），而 Flutter 則會直接編譯為原生程式碼。Flutter 能夠控制螢幕上的每一個像素，這樣就能避免因 JavaScript 橋接（bridge）帶來的效能問題。

Dart 是一門容易學習的語言，具備以下特點：

* 提供一個開源、可擴展的程式語言，用於構建 Web、伺服器及行動應用程式。
* 提供物件導向、單一繼承的語言，採用類似 C 語法，並可進行 AOT（Ahead-of-Time）編譯成原生程式碼。
* 可選擇性地轉譯（transcompile）為 JavaScript。
* 支援介面（interfaces）與抽象類別（abstract classes）。

以下將簡單說明 JavaScript 與 Dart 之間的一些差異。

### 進入點（Entry point）

JavaScript 沒有預先定義的進入函式（entry function）——你可以自行定義進入點。

```js
// JavaScript
function startHere() {
  // Can be used as entry point
}
```

在 Dart 中，每個應用程式都必須有一個頂層的 `main()` 函式，作為應用程式的進入點。

<?code-excerpt "lib/main.dart (main)"?>
```dart
/// Dart
void main() {}
```

在 [DartPad][DartPadA] 試試看。

### 輸出到主控台

要在 Dart 中輸出到主控台，請使用 `print()`。

```js
// JavaScript
console.log('Hello world!');
```

<?code-excerpt "lib/main.dart (print)"?>
```dart
/// Dart
print('Hello world!');
```

在 [DartPad][DartPadB] 試用看看。

### 變數

Dart 是型別安全的語言——它結合了靜態型別檢查與執行時檢查，以確保變數的值始終符合該變數的靜態型別。雖然型別是強制性的，但某些型別註解是可選的，因為 Dart 會進行型別推斷。

#### 建立與賦值變數

在 JavaScript 中，變數無法指定型別。

在 [Dart][Dart] 中，變數必須明確指定型別，或讓型別系統自動推斷正確的型別。

```js
// JavaScript
let name = 'JavaScript';
```

<?code-excerpt "lib/main.dart (variables)"?>
```dart
/// Dart
/// Both variables are acceptable.
String name = 'dart'; // Explicitly typed as a [String].
var otherName = 'Dart'; // Inferred [String] type.
```

在 [DartPad][DartPadC] 試用看看。

欲了解更多資訊，請參閱 [Dart 的型別系統][Dart's Type System]。

#### 預設值

在 JavaScript 中，未初始化的變數為 `undefined`。

在 Dart 中，未初始化的變數初始值為 `null`。
由於數字在 Dart 中也是物件，因此即使是數值型別的未初始化變數，其值也會是 `null`。

:::note
自 2.12 版起，Dart 支援 [Sound Null Safety][Sound Null Safety]，
所有基礎型別預設為不可為 null（non-nullable），
因此必須初始化為非 null 的值。
:::

```js
// JavaScript
let name; // == undefined
```

<?code-excerpt "lib/main.dart (null)"?>
```dart
// Dart
var name; // == null; raises a linter warning
int? x; // == null
```

在 [DartPad][DartPadD] 試用看看。

如需更多資訊，請參閱
[變數][variables] 的文件。

### 檢查 null 或零值

在 JavaScript 中，數值 1 或任何非 null 的物件，在使用 `==` 比較運算子時都會被視為 `true`。

```js
// JavaScript
let myNull = null;
if (!myNull) {
  console.log('null is treated as false');
}
let zero = 0;
if (!zero) {
  console.log('0 is treated as false');
}
```

在 Dart 中，只有布林值 `true` 會被視為 true。

<?code-excerpt "lib/main.dart (true)"?>
```dart
/// Dart
var myNull = potentiallyNull();
if (myNull == null) {
  print('use "== null" to check null');
}
var zero = 0;
if (zero == 0) {
  print('use "== 0" to check zero');
}
```

在 [DartPad][DartPadE] 試用看看。

### 函式

Dart 和 JavaScript 的函式基本上是相似的。
主要的差異在於宣告方式。

```js
// JavaScript
function fn() {
  return true;
}
```

<?code-excerpt "lib/main.dart (function)"?>
```dart
/// Dart
/// You can explicitly define the return type.
bool fn() {
  return true;
}
```

在 [DartPad][DartPadF] 試用看看。

如需更多資訊，請參閱
[functions][functions] 的文件。

### 非同步程式設計

#### Futures

與 JavaScript 類似，Dart 支援單執行緒（single-threaded）執行。在 JavaScript 中，
`Promise` 物件代表非同步操作最終完成（或失敗）以及其結果值。

Dart 則使用 [`Future`][`Future`] 物件來處理這類情境。

```js
// JavaScript
class Example {
  _getIPAddress() {
    const url = 'https://httpbin.org/ip';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const ip = responseJson.origin;
        return ip;
      });
  }
}

function main() {
  const example = new Example();
  example
    ._getIPAddress()
    .then(ip => console.log(ip))
    .catch(error => console.error(error));
}

main();
```

<?code-excerpt "lib/futures.dart"?>
```dart
// Dart
import 'dart:convert';

import 'package:http/http.dart' as http;

class Example {
  Future<String> _getIPAddress() {
    final url = Uri.https('httpbin.org', '/ip');
    return http.get(url).then((response) {
      final ip = jsonDecode(response.body)['origin'] as String;
      return ip;
    });
  }
}

void main() {
  final example = Example();
  example
      ._getIPAddress()
      .then((ip) => print(ip))
      .catchError((error) => print(error));
}
```

如需更多資訊，請參閱[`Future`][`Future`] 物件的文件。

#### `async` 與 `await`

`async` 函式宣告會定義一個非同步函式。

在 JavaScript 中，`async` 函式會回傳一個 `Promise`。
`await` 運算子則用來等待一個 `Promise`。

```js
// JavaScript
class Example {
  async function _getIPAddress() {
    const url = 'https://httpbin.org/ip';
    const response = await fetch(url);
    const json = await response.json();
    const data = json.origin;
    return data;
  }
}

async function main() {
  const example = new Example();
  try {
    const ip = await example._getIPAddress();
    console.log(ip);
  } catch (error) {
    console.error(error);
  }
}

main();
```

在 Dart 中，`async` 函式會回傳 `Future`，而該函式的主體會被排程於稍後執行。
`await` 運算子則用來等待 `Future`。

<?code-excerpt "lib/async.dart"?>
```dart
// Dart
import 'dart:convert';

import 'package:http/http.dart' as http;

class Example {
  Future<String> _getIPAddress() async {
    final url = Uri.https('httpbin.org', '/ip');
    final response = await http.get(url);
    final ip = jsonDecode(response.body)['origin'] as String;
    return ip;
  }
}

/// An async function returns a `Future`.
/// It can also return `void`, unless you use
/// the `avoid_void_async` lint. In that case,
/// return `Future<void>`.
void main() async {
  final example = Example();
  try {
    final ip = await example._getIPAddress();
    print(ip);
  } catch (error) {
    print(error);
  }
}
```

如需更多資訊，請參閱 [async 和 await][async and await] 的文件。

## 基礎知識

### 如何建立一個 Flutter 應用程式？

若要使用 React Native 建立應用程式，
你會在命令列執行 `create-react-native-app`。

```console
$ create-react-native-app <projectname>
```

要在 Flutter 中建立應用程式，可以採用以下其中一種方式：

* 使用已安裝 Flutter 與 Dart 外掛程式的 IDE。
* 在命令列使用 `flutter create` 指令。請確保 Flutter SDK 已加入您的 PATH。

```console
$ flutter create <projectname>
```

如需更多資訊，請參閱 [Getting started][Getting started]，該文件將帶您一步步建立一個按鈕點擊計數器應用程式。建立 Flutter 專案時，會自動產生所有您在 Android 和 iOS 裝置上執行範例應用程式所需的檔案。

### 我要如何執行我的應用程式？

在 React Native 中，您會在專案目錄下執行 `npm run` 或 `yarn run`。

您可以透過以下幾種方式執行 Flutter 應用程式：

* 在安裝有 Flutter 與 Dart 外掛程式的 IDE 中使用「執行」選項。
* 在專案根目錄下執行 `flutter run`。

您的應用程式可以在已連接的裝置、iOS 模擬器或 Android 模擬器上執行。

如需更多資訊，請參閱 Flutter [Getting started][Getting started] 文件。

### 我要如何匯入元件 (Widgets)？

在 React Native 中，您需要分別匯入每個所需的元件。

```js
// React Native
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
```

在 Flutter 中，若要使用來自 Material Design 函式庫的元件（Widgets），請匯入 `material.dart` 套件。若要使用 iOS 風格的元件，請匯入 Cupertino 函式庫。若想使用更基礎的元件組合，請匯入 Widgets 函式庫。  
或者，你也可以自行撰寫元件函式庫並加以匯入。

<?code-excerpt "lib/imports.dart (imports)"?>
```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:my_widgets/my_widgets.dart';
```

無論你匯入哪個元件（Widget）套件，  
Dart 只會載入你在應用程式中實際使用到的元件。

如需更多資訊，請參閱 [Flutter Widget Catalog][Flutter Widget Catalog]。

### Flutter 中對應 React Native「Hello world!」應用程式的範例是什麼？

在 React Native 中，`HelloWorldApp` 類別會繼承 `React.Component`，  
並透過實作 render 方法來回傳一個 view 元件。

```js
// React Native
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
```

在 Flutter 中，你可以使用核心元件 (Widgets) 函式庫中的 `Center` 和 `Text` 元件，建立一個完全相同的 "Hello world!" 應用程式。
`Center` 元件會成為元件樹 (widget tree) 的根節點，並且只有一個子元件，就是 `Text` 元件。

<?code-excerpt "lib/hello_world.dart"?>
```dart
// Flutter
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text('Hello, world!', textDirection: TextDirection.ltr),
    ),
  );
}
```

下列圖片展示了基本 Flutter「Hello world!」應用程式在 Android 和 iOS 上的 UI。

{% render docs/android-ios-figure-pair.md, image: "react-native/hello-world-basic.png", alt: "Hello world app", class: "border" %}

現在你已經看過最基本的 Flutter 應用程式，接下來的章節將說明如何善用 Flutter 豐富的元件 (Widgets) 函式庫，打造現代且精緻的應用程式。

### 我該如何使用元件 (Widgets) 並巢狀組合成元件樹 (widget tree)？

在 Flutter 中，幾乎所有東西都是元件 (Widget)。

元件 (Widgets) 是應用程式使用者介面的基本構建單元。
你可以將元件組合成一個階層結構，稱為元件樹 (widget tree)。
每個元件都巢狀於其父元件之內，並繼承父元件的屬性。
甚至連應用程式物件本身也是一個元件。
這裡沒有獨立的「application」物件，
而是由根元件 (root widget) 扮演這個角色。

一個元件可以定義：

* 結構元素——例如按鈕或選單
* 樣式元素——例如字型或配色方案
* 版面配置的某個面向——例如內距（padding）或對齊（alignment）

下列範例展示了使用 Material 函式庫元件 (Widgets) 實作的「Hello world!」應用程式。在這個範例中，元件樹 (widget tree) 被巢狀於 `MaterialApp` 根元件之中。

<?code-excerpt "lib/widget_tree.dart"?>
```dart
// Flutter
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(title: const Text('Welcome to Flutter')),
        body: const Center(child: Text('Hello world')),
      ),
    );
  }
}
```

以下圖片展示了以 Material Design 元件 (Widgets) 建構的 "Hello world!" 範例。
你可以獲得比基本 "Hello world!" 應用程式更多的內建功能。

{% render docs/android-ios-figure-pair.md, image: "react-native/hello-world.png", alt: "Hello world app" %}

在撰寫應用程式時，你會使用兩種類型的元件 (Widgets)：
[`StatelessWidget`][`StatelessWidget`] 或 [`StatefulWidget`][`StatefulWidget`]。
`StatelessWidget` 顧名思義，就是沒有狀態的元件。
`StatelessWidget` 只會被建立一次，且外觀永遠不會改變。
`StatefulWidget` 則會根據收到的資料或使用者輸入動態改變其狀態。

無狀態元件 (stateless widgets) 和有狀態元件 (stateful widgets) 之間最重要的差異在於，
`StatefulWidget` 會有一個 `State` 物件來儲存狀態資料，並在元件樹重建時保留這些資料，因此狀態不會遺失。

在簡單或基礎的應用程式中，巢狀元件很容易管理，
但隨著程式碼基礎擴大、應用程式變得複雜時，
你應該將深層巢狀的元件拆分成回傳元件的函式或更小的類別。
建立獨立的函式和元件可以讓你在應用程式內重複使用這些元件。

### 如何建立可重複使用的元件？

在 React Native 中，你會定義一個函式（或類別）來建立可重複使用的元件，
然後使用 `props` 方法來設定或回傳所選元素的屬性和值。
在下方範例中，定義了 `CustomCard` 函式，並在父元件中使用它。

```js
// React Native
const CustomCard = ({ index, onPress }) => {
  return (
    <View>
      <Text> Card {index} </Text>
      <Button
        title="Press"
        onPress={() => onPress(index)}
      />
    </View>
  );
};

// Usage
<CustomCard onPress={this.onPress} index={item.key} />
```

在 Flutter 中，您可以定義一個類別來建立自訂元件（Widget），然後重複使用該元件。您也可以像下方範例中的 `build` 函式一樣，定義並呼叫一個會回傳可重複使用元件的函式。

<?code-excerpt "lib/components.dart (components)"?>
```dart
/// Flutter
class CustomCard extends StatelessWidget {
  const CustomCard({super.key, required this.index, required this.onPress});

  final int index;
  final void Function() onPress;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Text('Card $index'),
          TextButton(onPressed: onPress, child: const Text('Press')),
        ],
      ),
    );
  }
}

class UseCard extends StatelessWidget {
  const UseCard({super.key, required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    /// Usage
    return CustomCard(
      index: index,
      onPress: () {
        print('Card $index');
      },
    );
  }
}
```

在前面的範例中，`CustomCard` 類別的建構函式使用 Dart 的大括號語法 `{ }` 來表示[具名參數][named parameters]。

若要強制這些欄位為必填，可以移除建構函式中的大括號，或是在建構函式中加入 `required`。

以下螢幕截圖展示了一個可重複使用的 `CustomCard` 類別範例。

{% render docs/android-ios-figure-pair.md, image: "react-native/custom-cards.png", alt: "Custom cards", class: "border" %}

## 專案結構與資源

### 我該從哪裡開始撰寫程式碼？

請從 `lib/main.dart` 檔案開始。
當你建立 Flutter 應用程式時，這個檔案會自動產生。

<?code-excerpt "lib/examples.dart (main)"?>
```dart
// Dart
void main() {
  print('Hello, this is the main function.');
}
```

在 Flutter 中，進入點檔案是`{project_name}/lib/main.dart`，執行會從`main`函式開始。

### Flutter 應用程式的檔案結構是如何安排的？

當你建立新的 Flutter 專案時，
它會產生以下目錄結構。
你可以在之後自訂，但這是起始的架構。

```plaintext
┬
└ project_name
  ┬
  ├ android      - Contains Android-specific files.
  ├ build        - Stores iOS and Android build files.
  ├ ios          - Contains iOS-specific files.
  ├ lib          - Contains externally accessible Dart source files.
    ┬
    └ src        - Contains additional source files.
    └ main.dart  - The Flutter entry point and the start of a new app.
                   This is generated automatically when you create a Flutter
                    project.
                   It's where you start writing your Dart code.
  ├ test         - Contains automated test files.
  └ pubspec.yaml - Contains the metadata for the Flutter app.
                   This is equivalent to the package.json file in React Native.
```

### 我應該把資源和 Assets 放在哪裡？要怎麼使用它們？

Flutter 的資源（resource）或 Assets（資產）是與你的應用程式一起打包並部署的檔案，並且可以在執行時存取。
Flutter 應用程式可以包含以下類型的資源：

* 靜態資料，例如 JSON 檔案
* 設定檔
* 圖示和圖片（JPEG、PNG、GIF、動畫 GIF、WebP、動畫 WebP、BMP 和 WBMP）

Flutter 會使用`pubspec.yaml`檔案，
該檔案位於你的專案根目錄，
用來識別應用程式所需的資源。

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

`assets` 子區塊用來指定應該隨應用程式一同包含的檔案。
每個資源（Assets）都會以相對於 `pubspec.yaml` 檔案的明確路徑來識別，也就是資源檔案所在的位置。
宣告資源的順序沒有影響。
實際使用的目錄（此例為 `assets`）也沒有影響。
不過，雖然資源可以放在任何應用程式目錄中，最佳做法是將它們放在 `assets` 目錄下。

在建置過程中，Flutter 會將資源放入一個特殊的封存檔，稱為 *asset bundle*，應用程式會在執行時從中讀取資料。
當資源路徑被指定在 `pubspec.yaml` 的 assets 區塊時，
建置流程會尋找相鄰子目錄中任何同名的檔案。
這些檔案也會一併包含在 asset bundle 中，與指定的資源一起打包。
Flutter 會使用資源變體（asset variants）來為你的應用程式選擇合適解析度的圖片。

在 React Native 中，你會將靜態圖片檔案放在原始碼目錄下，並直接引用它。

```js
<Image source={require('./my-icon.png')} />
// OR
<Image
  source={%raw%}{{
    url: 'https://reactnative.dev/img/tiny_logo.png'
  }}{%endraw%}
/>
```

在 Flutter 中，若要將靜態圖片加入你的應用程式，可以在元件（Widget）的 build 方法中，使用 `Image.asset` 建構函式。

<?code-excerpt "lib/examples.dart (image-asset)" replace="/return //g"?>
```dart
Image.asset('assets/background.png');
```

如需更多資訊，請參閱 [在 Flutter 中新增資源與圖片][Adding Assets and Images in Flutter]。

### 如何載入網路上的圖片？

在 React Native 中，你會在 `Image` 元件的 `source` 屬性中指定 `uri`，並在需要時提供圖片尺寸。

在 Flutter 中，請使用 `Image.network` 建構函式來載入來自 URL 的圖片。

<?code-excerpt "lib/examples.dart (image-network)" replace="/return //g"?>
```dart
Image.network('https://docs.flutter.dev/assets/images/docs/owl.jpg');
```

### 如何安裝套件與套件插件？

Flutter 支援使用其他開發者貢獻給 Flutter 與 Dart 生態系統的共用套件（package）。這讓你可以快速建構應用程式，而不需要從零開始開發所有功能。包含平台專屬程式碼的套件稱為套件插件（package plugins）。

在 React Native 中，你會使用 `yarn add {package-name}` 或 `npm install --save {package-name}` 於命令列安裝套件。

在 Flutter 中，請依照以下說明安裝套件：

1. 若要將 `google_sign_in` 套件新增為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add google_sign_in
```

2. 透過命令列使用 `flutter pub get` 安裝套件。
    如果你使用的是 IDE，通常會自動執行 `flutter pub get`，或者可能會提示你手動執行。
3. 如下所示，將該套件匯入你的應用程式程式碼中：

<?code-excerpt "lib/examples.dart (package-import)"?>
```dart
import 'package:flutter/material.dart';
```

如需更多資訊，請參閱 [使用套件][Using Packages] 與
[開發套件與外掛][Developing Packages & Plugins]。

你可以在 [pub.dev][pub.dev] 的 [Flutter 套件][Flutter packages] 區域找到許多 Flutter 開發者分享的套件。

## Flutter 元件 (Widgets)

在 Flutter 中，你會使用元件 (Widgets) 來構建 UI，這些元件會根據其目前的設定與狀態，描述其視圖應該呈現的樣貌。

元件 (Widgets) 通常由許多小型、單一用途的元件組合而成，透過巢狀結構產生強大的效果。例如，`Container` 元件包含了多個負責版面配置、繪製、定位與尺寸調整的元件。具體來說，`Container` 元件包含了 `LimitedBox`、`ConstrainedBox`、`Align`、`Padding`、`DecoratedBox` 與 `Transform` 等元件。你不需要透過繼承 `Container` 來實現自訂效果，而是可以將這些及其他簡單元件，以全新且獨特的方式組合使用。

`Center` 元件是你可以控制版面配置的另一個例子。若要置中一個元件，只需將其包裹在 `Center` 元件中，然後再利用其他版面配置元件 (Layout widgets) 來進行對齊、行、列與網格的安排。這些版面配置元件本身不會有任何視覺表現，其唯一目的是控制其他元件的某些版面配置層面。若想了解某個元件為何以特定方式呈現，通常檢查其相鄰元件會很有幫助。

如需更多資訊，請參閱 [Flutter 技術概覽][Flutter Technical Overview]。

如需 `Widgets` 套件中核心元件的更多資訊，請參閱 [Flutter 基本元件][Flutter Basic Widgets]、[Flutter 元件目錄][Flutter Widget Catalog]，或 [Flutter 元件索引][Flutter Widget Index]。

## 視圖 (Views)

### `View` 容器在 Flutter 中的對應元件是什麼？

在 React Native 中，`View` 是一個支援使用 `Flexbox` 進行版面配置、樣式、觸控處理與無障礙控制的容器。

在 Flutter 中，你可以使用 `Widgets` 函式庫中的核心版面配置元件 (Layout widgets)，例如 [`Container`][`Container`]、[`Column`][`Column`]、[`Row`][`Row`] 以及 [`Center`][`Center`]。如需更多資訊，請參閱 [版面配置元件][Layout Widgets] 目錄。

### `FlatList` 或 `SectionList` 在 Flutter 中的對應元件是什麼？

`List` 是一個可捲動的元件清單，垂直排列各個元件。

在 React Native 中，會使用 `FlatList` 或 `SectionList` 來渲染簡單或分段的清單。

```js
// React Native
<FlatList
  data={[ ... ]}
  renderItem={({ item }) => <Text>{item.key}</Text>}
/>
```

[`ListView`][`ListView`] 是 Flutter 最常用的滾動元件 (Scrolling Widget)。
其預設建構函式會接收一個明確的 `children` 清單。
[`ListView`][`ListView`] 最適合用於元件數量較少的情境。
若是需要顯示大量或無限的清單，請使用 `ListView.builder`，
它會根據需求動態建立子元件，且只會建立目前可見的那些子元件。

<?code-excerpt "lib/examples.dart (list-view)"?>
```dart
var data = ['Hello', 'World'];
return ListView.builder(
  itemCount: data.length,
  itemBuilder: (context, index) {
    return Text(data[index]);
  },
);
```

{% render docs/android-ios-figure-pair.md, image: "react-native/flatlist.webp", alt: "Flat list", class: "border" %}

若想了解如何實作無限滾動清單，請參考官方的
[`infinite_list`][infinite_list] 範例。

### 如何使用 Canvas 進行繪製或繪圖？

在 React Native 中，沒有內建的 canvas 元件，
因此通常會使用像 `react-native-canvas` 這類第三方函式庫來實現。

```js
// React Native
const CanvasComp = () => {
  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'skyblue';
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, 2 * Math.PI);
    ctx.fillRect(150, 100, 300, 300);
    ctx.stroke();
  };

  return (
    <View>
      <Canvas ref={this.handleCanvas} />
    </View>
  );
}
```

在 Flutter 中，你可以使用 [`CustomPaint`][`CustomPaint`] 和 [`CustomPainter`][`CustomPainter`] 類別來進行畫布繪製（canvas 繪製）。

以下範例展示如何在繪製（paint）階段，透過 `CustomPaint` 元件 (Widget) 來繪圖。這個範例實作了抽象類別 `CustomPainter`，並將其傳遞給 `CustomPaint` 的 painter 屬性。
`CustomPaint` 的子類別必須實作 `paint()` 和 `shouldRepaint()` 方法。

<?code-excerpt "lib/examples.dart (custom-paint)"?>
```dart
class MyCanvasPainter extends CustomPainter {
  const MyCanvasPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()..color = Colors.amber;
    canvas.drawCircle(const Offset(100, 200), 40, paint);
    final Paint paintRect = Paint()..color = Colors.lightBlue;
    final Rect rect = Rect.fromPoints(
      const Offset(150, 300),
      const Offset(300, 400),
    );
    canvas.drawRect(rect, paintRect);
  }

  @override
  bool shouldRepaint(MyCanvasPainter oldDelegate) => false;
}

class MyCanvasWidget extends StatelessWidget {
  const MyCanvasWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: CustomPaint(painter: MyCanvasPainter()));
  }
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/canvas.png", alt: "Canvas", class: "border" %}

## 版面配置（Layouts）

### 如何使用元件（Widgets）來定義版面配置屬性？

在 React Native 中，大多數的版面配置都可以透過傳遞給特定元件（component）的 props 來完成。
例如，你可以在 `View` 元件上使用 `style` prop，
以指定 flexbox 的屬性。
若要將你的元件排列成一個欄（column），你可以指定像是 `flexDirection: 'column'` 這樣的 prop。

```js
// React Native
<View
  style={%raw%}{{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}{%endraw%}
>
```

在 Flutter 中，版面配置主要是透過專門設計用於版面配置的元件（Layout widgets），結合控制元件及其樣式屬性來定義。

舉例來說，[`Column`][`Column`] 和 [`Row`][`Row`] 元件會接收一個 `children` 清單，分別將其垂直或水平排列。  
[`Container`][`Container`] 元件則可以同時設定版面配置與樣式屬性，而 [`Center`][`Center`] 元件則會將其子元件置中顯示。

<?code-excerpt "lib/layouts.dart (column)"?>
```dart
@override
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        Container(color: Colors.red, width: 100, height: 100),
        Container(color: Colors.blue, width: 100, height: 100),
        Container(color: Colors.green, width: 100, height: 100),
      ],
    ),
  );
```

Flutter 在其核心元件（Widgets）庫中提供了各種版面配置元件（Layout widgets）。
例如，[`Padding`][`Padding`]、[`Align`][`Align`] 和 [`Stack`][`Stack`]。

完整清單請參見 [Layout Widgets][Layout Widgets]。

{% render docs/android-ios-figure-pair.md, image: "react-native/basic-layout.webp", alt: "Layout", class: "border" %}

### 如何堆疊元件（Widgets）？

在 React Native 中，可以透過 `absolute` 定位來堆疊元件。

Flutter 則使用 [`Stack`][`Stack`] 元件來將子元件（children widgets）以層疊方式排列。
這些元件可以完全或部分地重疊在基礎元件之上。

`Stack` 元件會根據其方框（box）的邊緣來定位其子元件。
如果你只想簡單地讓多個子元件重疊，這個類別會很有用。

<?code-excerpt "lib/layouts.dart (stack)"?>
```dart
@override
Widget build(BuildContext context) {
  return Stack(
    alignment: const Alignment(0.6, 0.6),
    children: <Widget>[
      const CircleAvatar(
        backgroundImage: NetworkImage(
          'https://avatars3.githubusercontent.com/u/14101776?v=4',
        ),
      ),
      Container(color: Colors.black45, child: const Text('Flutter')),
    ],
  );
```

前面的範例使用 `Stack` 來疊加一個 Container
（在半透明黑色背景上顯示其 `Text`）
於 `CircleAvatar` 之上。
Stack 透過 alignment 屬性與 `Alignment` 座標來偏移文字。

{% render docs/android-ios-figure-pair.md, image: "react-native/stack.png", alt: "Stack", class: "border" %}

如需更多資訊，請參閱 [`Stack`][`Stack`] 類別文件。

## 樣式設定

### 如何設定元件（Components）的樣式？

在 React Native 中，會使用行內樣式（inline styling）與 `stylesheets.create`
來設定元件的樣式。

```js
// React Native
<View style={styles.container}>
  <Text style={%raw%}{{ fontSize: 32, color: 'cyan', fontWeight: '600' }}{%endraw%}>
    This is a sample text
  </Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

在 Flutter 中，`Text` 元件（Widget）可以在其 style 屬性中接受 `TextStyle` 類別。如果你想在多個地方使用相同的文字樣式，你可以建立一個 [`TextStyle`][`TextStyle`] 類別，並將其用於多個 `Text` 元件（Widgets）。

<?code-excerpt "lib/examples.dart (text-style)"?>
```dart
const TextStyle textStyle = TextStyle(
  color: Colors.cyan,
  fontSize: 32,
  fontWeight: FontWeight.w600,
);

return const Center(
  child: Column(
    children: <Widget>[
      Text('Sample text', style: textStyle),
      Padding(
        padding: EdgeInsets.all(20),
        child: Icon(
          Icons.lightbulb_outline,
          size: 48,
          color: Colors.redAccent,
        ),
      ),
    ],
  ),
);
```

{% render docs/android-ios-figure-pair.md, image: "react-native/flutterstyling.webp", alt: "Styling", class: "border" %}

### 如何使用 `Icons` 和 `Colors`？

React Native 並未內建圖示（icons）支援，因此通常需透過第三方函式庫來實現。

在 Flutter 中，匯入 Materials 函式庫（Material library）時，也會同時引入豐富的 [Material icons（Material 圖示）][Material icons] 以及 [顏色][colors]。

<?code-excerpt "lib/examples.dart (icon)"?>
```dart
return const Icon(Icons.lightbulb_outline, color: Colors.redAccent);
```

當你使用 `Icons` 類別時，  
請務必在專案的 `uses-material-design: true` 檔案中設定 `pubspec.yaml`。  
這樣可以確保顯示圖示所需的 `MaterialIcons` 字型會被包含在你的應用程式中。

一般來說，如果你打算使用 Material 函式庫，  
你應該加入這一行設定。

```yaml
name: my_awesome_application
flutter:
  uses-material-design: true
```

Flutter 的 [Cupertino（iOS 風格）][Cupertino (iOS-style)] 套件提供高度還原的 iOS 當前設計語言元件（Widgets）。
若要使用 `CupertinoIcons` 字型，
請在專案的 `pubspec.yaml` 檔案中加入對 `cupertino_icons` 的相依性。

```yaml
name: my_awesome_application
dependencies:
  cupertino_icons: ^1.0.8
```

若要全域自訂元件（Widgets）的顏色與樣式，可以使用 `ThemeData` 來指定主題中各種層面的預設顏色。請將 `MaterialApp` 的 theme 屬性設為 `ThemeData` 物件。[`Colors`][`Colors`] 類別會根據 Material Design 的 [color palette][color palette] 提供顏色。

以下範例將色彩方案以 `deepPurple` 作為種子，並將文字選取顏色設為 `red`。

<?code-excerpt "lib/examples.dart (swatch)"?>
```dart
class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        textSelectionTheme: const TextSelectionThemeData(
          selectionColor: Colors.red,
        ),
      ),
      home: const SampleAppPage(),
    );
  }
}
```

### 如何新增主題樣式？

在 React Native 中，常見的主題會在樣式表中為元件（components）定義，然後在元件中使用。

在 Flutter 中，幾乎所有內容都可以透過在 [`ThemeData`][`ThemeData`] 類別中定義樣式，並將其傳遞給 [`MaterialApp`][`MaterialApp`] 元件（Widget）的 theme 屬性，來建立一致的樣式。

<?code-excerpt "lib/examples.dart (theme)"?>
```dart
@override
Widget build(BuildContext context) {
  return MaterialApp(
    theme: ThemeData(primaryColor: Colors.cyan, brightness: Brightness.dark),
    home: const StylingPage(),
  );
}
```

即使不使用`MaterialApp`元件（Widget），也可以套用`Theme`。
[`Theme`][`Theme`]元件（Widget）會在其`data`參數中接收`ThemeData`，並將`ThemeData`套用到所有子元件（children widgets）上。

<?code-excerpt "lib/examples.dart (theme-data)"?>
```dart
@override
Widget build(BuildContext context) {
  return Theme(
    data: ThemeData(primaryColor: Colors.cyan, brightness: brightness),
    child: Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      //...
    ),
  );
}
```

## 狀態管理

狀態（State）是指在元件（Widget）建構時可以同步讀取的資訊，或是在元件生命週期中可能會改變的資訊。要在 Flutter 中管理應用程式狀態，請使用 [`StatefulWidget`][`StatefulWidget`] 搭配 State 物件。

如需更多有關在 Flutter 中管理狀態的方法，請參閱 [State management][State management]。

### 無狀態元件 (StatelessWidget)

Flutter 中的 `StatelessWidget` 是一種不需要狀態變更的元件（Widget）——也就是說，它沒有需要管理的內部狀態。

當你描述的使用者介面部分僅依賴於元件本身的組態資訊，以及該元件被建立時所處的 [`BuildContext`][`BuildContext`]，而不依賴其他任何東西時，無狀態元件特別有用。

[`AboutDialog`][`AboutDialog`]、[`CircleAvatar`][`CircleAvatar`] 和 [`Text`][`Text`] 都是繼承自 [`StatelessWidget`][`StatelessWidget`] 的無狀態元件範例。

<?code-excerpt "lib/stateless.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(
  const MyStatelessWidget(
    text: 'StatelessWidget Example to show immutable data',
  ),
);

class MyStatelessWidget extends StatelessWidget {
  const MyStatelessWidget({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Center(child: Text(text, textDirection: TextDirection.ltr));
  }
}
```

前一個範例使用 `MyStatelessWidget` 類別的建構函式來傳遞 `text`，而這個屬性被標記為 `final`。這個類別繼承自 `StatelessWidget`——它包含不可變的資料。

無狀態元件 (StatelessWidget) 的 `build` 方法通常只會在以下三種情況下被呼叫：

* 當元件被插入到元件樹中時
* 當元件的父元件變更其設定時
* 當它所依賴的 [`InheritedWidget`][`InheritedWidget`] 發生變化時

### StatefulWidget

[`StatefulWidget`][`StatefulWidget`] 是一種會改變狀態的元件 (Widget)。請使用 `setState` 方法來管理 `StatefulWidget` 的狀態變化。呼叫 `setState()` 會通知 Flutter 框架某個狀態已經改變，這會導致應用程式重新執行 `build()` 方法，以便反映這個變化。

_狀態 (State)_ 是指在元件建立時可以同步讀取，並且在元件生命週期內可能會改變的資訊。元件實作者有責任確保當狀態變更時，狀態物件能夠及時收到通知。當元件可能會動態改變時，請使用 `StatefulWidget`。例如，當在表單中輸入文字或移動滑桿時，元件的狀態會改變；又或者，狀態會隨著時間改變——像是資料來源更新 UI。

[`Checkbox`][`Checkbox`]、[`Radio`][`Radio`]、[`Slider`][`Slider`]、[`InkWell`][`InkWell`]、[`Form`][`Form`] 以及 [`TextField`][`TextField`] 都是繼承自 [`StatefulWidget`][`StatefulWidget`] 的 stateful 元件 (StatefulWidget) 範例。

以下範例宣告了一個 `StatefulWidget`，它需要一個 `createState()` 方法。此方法會建立管理元件狀態的狀態物件 `_MyStatefulWidgetState`。

<?code-excerpt "lib/stateful.dart (stateful-widget)"?>
```dart
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({super.key, required this.title});

  final String title;

  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}
```

以下的狀態類別 `_MyStatefulWidgetState`，
為該元件（Widget）實作了 `build()` 方法。
當狀態改變時，例如使用者切換按鈕時，
`setState()` 會以新的切換值被呼叫。
這會導致框架重新建構此元件於 UI 上。

<?code-excerpt "lib/stateful.dart (stateful-widget-state)"?>
```dart
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  bool showText = true;
  bool toggleState = true;
  Timer? t2;

  void toggleBlinkState() {
    setState(() {
      toggleState = !toggleState;
    });
    if (!toggleState) {
      t2 = Timer.periodic(const Duration(milliseconds: 1000), (t) {
        toggleShowText();
      });
    } else {
      t2?.cancel();
    }
  }

  void toggleShowText() {
    setState(() {
      showText = !showText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            if (showText)
              const Text('This execution will be done before you can blink.'),
            Padding(
              padding: const EdgeInsets.only(top: 70),
              child: ElevatedButton(
                onPressed: toggleBlinkState,
                child: toggleState
                    ? const Text('Blink')
                    : const Text('Stop Blinking'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### StatefulWidget 與 StatelessWidget 的最佳實踐是什麼？

設計元件（Widget）時，請考慮以下幾點：

1. 判斷元件應該是 `StatefulWidget` 還是 `StatelessWidget`。

在 Flutter 中，元件分為 Stateful 或 Stateless，這取決於它們是否依賴狀態變化。

* 如果元件會改變——例如使用者與其互動，或資料流中斷 UI，那麼它是 *Stateful*。
* 如果元件是最終的或不可變的，那麼它是 *Stateless*。

2. 判斷哪個物件負責管理元件的狀態（針對 `StatefulWidget`）。

在 Flutter 中，主要有三種管理狀態的方法：

* 元件自行管理其狀態
* 父元件管理該元件的狀態
* 混合搭配的方式

在決定採用哪種方式時，請考慮以下原則：

* 如果相關狀態是使用者資料，例如核取方塊的勾選或未勾選狀態，或滑桿的位置，則建議由父元件管理該狀態。
* 如果相關狀態是美觀性的，例如動畫（Animation），則建議由元件本身管理該狀態。
* 如果不確定，建議讓父元件管理子元件的狀態。

3. 繼承 StatefulWidget 與 State。

`MyStatefulWidget` 類別會自行管理其狀態——它繼承自 `StatefulWidget`，覆寫 `createState()` 方法以建立 `State` 物件，框架會呼叫 `createState()` 來建構元件。在此範例中，`createState()` 會建立 `_MyStatefulWidgetState` 的實例，該實作會在下一個最佳實踐中說明。

<?code-excerpt "lib/best_practices.dart (create-state)" replace="/return const Text\('Hello World!'\);/\/\/.../g"?>
```dart
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({super.key, required this.title});

  final String title;
  @override
  State<MyStatefulWidget> createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  @override
  Widget build(BuildContext context) {
    //...
  }
}
```

4. 將 StatefulWidget 加入元件樹（widget tree）。

在應用程式的 build 方法中，將你自訂的 `StatefulWidget` 加入元件樹（widget tree）。

<?code-excerpt "lib/best_practices.dart (use-stateful-widget)"?>
```dart
class MyStatelessWidget extends StatelessWidget {
  // This widget is the root of your application.
  const MyStatelessWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: MyStatefulWidget(title: 'State Change Demo'),
    );
  }
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/state-change.webp", alt: "State change", class: "border" %}

## Props

在 React Native 中，大多數元件（Components）在建立時都可以透過不同的參數或屬性來自訂，這些參數稱為`props`。這些參數可以在子元件中使用`this.props`來取得。

```js
// React Native
const CustomCard = ({ index, onPress }) => {
  return (
    <View>
      <Text> Card {index} </Text>
      <Button
        title='Press'
        onPress={() => onPress(index)}
      />
    </View>
  );
};

const App = () => {
  const onPress = (index) => {
    console.log('Card ', index);
  };

  return (
    <View>
      <FlatList
        data={[ /* ... */ ]}
        renderItem={({ item }) => (
          <CustomCard onPress={onPress} index={item.key} />
        )}
      />
    </View>
  );
};
```

在 Flutter 中，你可以將帶有 `final` 標記的區域變數或函式，透過帶參數的建構函式所接收到的屬性進行賦值。

<?code-excerpt "lib/components.dart (components)"?>
```dart
/// Flutter
class CustomCard extends StatelessWidget {
  const CustomCard({super.key, required this.index, required this.onPress});

  final int index;
  final void Function() onPress;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: <Widget>[
          Text('Card $index'),
          TextButton(onPressed: onPress, child: const Text('Press')),
        ],
      ),
    );
  }
}

class UseCard extends StatelessWidget {
  const UseCard({super.key, required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    /// Usage
    return CustomCard(
      index: index,
      onPress: () {
        print('Card $index');
      },
    );
  }
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/modular.png", alt: "Cards", class: "border" %}

## 本機儲存（Local storage）

如果你不需要儲存大量資料，且這些資料不需要結構化，你可以使用 `shared_preferences`，它允許你讀寫原始資料型別（布林值、浮點數、整數、長整數和字串）的持久性鍵值對。

### 如何儲存全域且持久的鍵值對資料？

在 React Native 中，你可以使用 `AsyncStorage` 元件的 `setItem` 和 `getItem` 函式，來儲存和讀取全域且持久的資料。

```js
// React Native
const [counter, setCounter] = useState(0)
...
await AsyncStorage.setItem( 'counterkey', json.stringify(++this.state.counter));
AsyncStorage.getItem('counterkey').then(value => {
  if (value != null) {
    setCounter(value);
  }
});
```

在 Flutter 中，請使用 [`shared_preferences`][`shared_preferences`] 套件來儲存與讀取屬於應用程式全域且具備持久性的鍵值資料。`shared_preferences` 套件在 iOS 上包裝了 `NSUserDefaults`，在 Android 上則包裝了 `SharedPreferences`，為簡單資料提供持久化儲存功能。

若要將 `shared_preferences` 套件新增為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add shared_preferences
```

<?code-excerpt "lib/examples.dart (shared-prefs)"?>
```dart
import 'package:shared_preferences/shared_preferences.dart';
```

要實作持久化資料，請使用 `SharedPreferences` 類別所提供的 setter 方法。

setter 方法可用於多種基本型別，例如 `setInt`、`setBool` 和 `setString`。

若要讀取資料，請使用 `SharedPreferences` 類別所提供的適當 getter 方法。

每個 setter 方法都有一個對應的 getter 方法，例如 `getInt`、`getBool` 和 `getString`。

<?code-excerpt "lib/examples.dart (shared-prefs-update)"?>
```dart
Future<void> updateCounter() async {
  final prefs = await SharedPreferences.getInstance();
  int? counter = prefs.getInt('counter');
  if (counter is int) {
    await prefs.setInt('counter', ++counter);
  }
  setState(() {
    _counter = counter;
  });
}
```

## 路由（Routing）

大多數應用程式都包含多個螢幕，用於顯示不同類型的資訊。例如，你可能有一個產品螢幕（product screen），用來顯示圖片，使用者可以點擊某個產品圖片，在新的螢幕上獲取該產品的更多資訊。

在 Android 中，每個新螢幕對應一個新的 Activity。
在 iOS 中，每個新螢幕對應一個新的 ViewController。而在 Flutter 中，螢幕就是元件（Widgets）！要在 Flutter 中導覽到新的螢幕，請使用 Navigator 元件。

### 如何在螢幕之間導覽？

在 React Native 中，主要有三種導覽器（navigator）：StackNavigator、TabNavigator 和 DrawerNavigator。
每一種都提供了設定與定義螢幕的方式。

```js
// React Native
const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: '#e91e63' } }
);
const SimpleApp = StackNavigator({
  Home: { screen: MyApp },
  stackScreen: { screen: StackScreen }
});
export default (MyApp1 = DrawerNavigator({
  Home: {
    screen: SimpleApp
  },
  Screen2: {
    screen: drawerScreen
  }
}));
```

在 Flutter 中，主要有兩種元件（Widgets）用於在螢幕間導覽：

* [`Route`][`Route`] 是應用程式螢幕或頁面的抽象表示。
* [`Navigator`][`Navigator`] 是管理路由的元件（Widget）。

`Navigator` 定義為一個以堆疊方式管理一組子元件（Widgets）的元件（Widget）。Navigator 會管理一個 `Route` 物件的堆疊，並提供管理堆疊的方法，例如 [`Navigator.push`][`Navigator.push`] 和 [`Navigator.pop`][`Navigator.pop`]。
路由清單可以在 [`MaterialApp`][`MaterialApp`] 元件（Widget）中指定，也可以動態建立，例如在 hero 動畫中。
以下範例在 `MaterialApp` 元件（Widget）中指定了命名路由（named routes）。

:::note
命名路由（named routes）目前已不再建議用於大多數應用程式。如需更多資訊，請參閱 [Limitations][Limitations] 於 [navigation overview][navigation overview] 頁面。
:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

<?code-excerpt "lib/navigation.dart (navigator)"?>
```dart
class NavigationApp extends StatelessWidget {
  // This widget is the root of your application.
  const NavigationApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      //...
      routes: <String, WidgetBuilder>{
        '/a': (context) => const UsualNavScreen(),
        '/b': (context) => const DrawerNavScreen(),
      },
      //...
    );
  }
}
```

要導向至命名路由（named route），會使用 [`Navigator.of()`][`Navigator.of()`] 方法，並指定 `BuildContext`（在元件樹中某個元件的位置控制代碼）。路由名稱會傳遞給 `pushNamed` 函式，以導向至指定的路由。

<?code-excerpt "lib/navigation.dart (push-named)"?>
```dart
Navigator.of(context).pushNamed('/a');
```

你也可以使用 `Navigator` 的 push 方法（push() 方法），
這個方法會將指定的 [`Route`][`Route`] 加入到最緊密包覆給定 [`BuildContext`][`BuildContext`] 的 Navigator 的歷史記錄中，
並切換到該路由。在以下範例中，
[`MaterialPageRoute`][`MaterialPageRoute`] 元件（Widget）是一個模態路由（modal route），
會以平台自適應的轉場效果取代整個螢幕。
它需要一個 [`WidgetBuilder`][`WidgetBuilder`] 作為必要參數。

<?code-excerpt "lib/navigation.dart (navigator-push)"?>
```dart
Navigator.push(
  context,
  MaterialPageRoute<void>(builder: (context) => const UsualNavScreen()),
);
```

### 如何使用分頁（Tab）導覽與抽屜（Drawer）導覽？

在 Material Design 應用程式中，Flutter 提供了兩種主要的導覽選項：分頁（tabs）與抽屜（drawers）。
當空間不足以支援分頁時，抽屜是一個很好的替代方案。

#### 分頁（Tab）導覽

在 React Native 中，`createBottomTabNavigator` 和 `TabNavigation` 用於顯示分頁並進行分頁導覽。

```js
// React Native
import { createBottomTabNavigator } from 'react-navigation';

const MyApp = TabNavigator(
  { Home: { screen: HomeScreen }, Notifications: { screen: tabNavScreen } },
  { tabBarOptions: { activeTintColor: '#e91e63' } }
);
```

Flutter 提供了多種專門用於抽屜（drawer）和分頁（tab）導覽的元件（Widgets）：

[`TabController`][`TabController`]
: 協調 `TabBar` 和 `TabBarView` 之間的分頁選擇。

[`TabBar`][`TabBar`]
: 顯示一排橫向排列的分頁。

[`Tab`][`Tab`]
: 建立一個 Material Design 樣式的 TabBar 分頁。

[`TabBarView`][`TabBarView`]
: 顯示與目前所選分頁對應的元件（Widget）。

<?code-excerpt "lib/navigation.dart (tab-nav)"?>
```dart
class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin {
  late TabController controller = TabController(length: 2, vsync: this);

  @override
  Widget build(BuildContext context) {
    return TabBar(
      controller: controller,
      tabs: const <Tab>[
        Tab(icon: Icon(Icons.person)),
        Tab(icon: Icon(Icons.email)),
      ],
    );
  }
}
```


`TabController` 是用來協調 `TabBar` 與 `TabBarView` 之間的分頁（tab）選擇所必須的。
`TabController` 建構子的 `length` 參數代表分頁的總數。
每當畫面（frame）觸發狀態變更時，必須有 `TickerProvider` 來觸發通知。
`TickerProvider` 是 `vsync`。每當你建立新的 `TabController` 時，請將 `vsync: this` 參數傳遞給 `TabController` 建構子。

[`TickerProvider`][`TickerProvider`] 是一個由可以提供 [`Ticker`][`Ticker`] 物件的類別所實作的介面。
Ticker 可以被任何需要在每次畫面（frame）觸發時收到通知的物件使用，但最常見的是透過 [`AnimationController`][`AnimationController`] 間接使用。`AnimationController` 需要 `TickerProvider` 來取得它們的 `Ticker`。
如果你是從 State 建立 AnimationController，那麼你可以使用 [`TickerProviderStateMixin`][`TickerProviderStateMixin`] 或 [`SingleTickerProviderStateMixin`][`SingleTickerProviderStateMixin`] 類別來取得合適的 `TickerProvider`。

[`Scaffold`][`Scaffold`] 元件（Widget）包裹了一個新的 `TabBar` 元件，並建立了兩個分頁（tab）。
`TabBarView` 元件會作為 `Scaffold` 元件的 `body` 參數傳入。
所有對應於 `TabBar` 元件分頁的螢幕，都是 `TabBarView` 元件的子元件（children），並且共用相同的 `TabController`。

<?code-excerpt "lib/navigation.dart (navigation-home-page-state)"?>
```dart
class _NavigationHomePageState extends State<NavigationHomePage>
    with SingleTickerProviderStateMixin {
  late TabController controller = TabController(length: 2, vsync: this);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Material(
        color: Colors.blue,
        child: TabBar(
          tabs: const <Tab>[
            Tab(icon: Icon(Icons.person)),
            Tab(icon: Icon(Icons.email)),
          ],
          controller: controller,
        ),
      ),
      body: TabBarView(
        controller: controller,
        children: const <Widget>[HomeScreen(), TabScreen()],
      ),
    );
  }
}
```

#### Drawer 導覽

在 React Native 中，請匯入所需的 react-navigation 套件，然後使用 `createDrawerNavigator` 和 `DrawerNavigation`。

```js
// React Native
export default (MyApp1 = DrawerNavigator({
  Home: {
    screen: SimpleApp
  },
  Screen2: {
    screen: drawerScreen
  }
}));
```

在 Flutter 中，我們可以將 `Drawer` 元件（Widget）與 `Scaffold` 結合使用，建立具有 Material Design 抽屜（drawer）的版面配置。  
若要將 `Drawer` 新增至應用程式，請將其包裹在 `Scaffold` 元件中。  
`Scaffold` 元件為遵循 [Material Design][Material Design] 指南的應用程式，提供一致的視覺結構。它同時支援特殊的 Material Design 元件（Material components），例如 `Drawers`、`AppBars` 和 `SnackBars`。

`Drawer` 元件是一個 Material Design 面板，會從 `Scaffold` 的邊緣以水平方式滑入，用來在應用程式中顯示導覽連結。你可以提供 [`ElevatedButton`][`ElevatedButton`]、[`Text`][`Text`] 元件，或是一個項目清單作為 `Drawer` 元件的 child 來顯示。  
在下方範例中，[`ListTile`][`ListTile`] 元件提供了點擊時的導覽功能。

<?code-excerpt "lib/examples.dart (drawer)"?>
```dart
@override
Widget build(BuildContext context) {
  return Drawer(
    elevation: 20,
    child: ListTile(
      leading: const Icon(Icons.change_history),
      title: const Text('Screen2'),
      onTap: () {
        Navigator.of(context).pushNamed('/b');
      },
    ),
  );
}
```

`Scaffold` 元件（Widget）同時包含了一個 `AppBar` 元件，當 `Scaffold` 中有 Drawer 可用時，會自動顯示一個合適的 IconButton 來顯示 `Drawer`。`Scaffold` 也會自動處理螢幕邊緣滑動的手勢，以顯示 `Drawer`。

<?code-excerpt "lib/examples.dart (scaffold)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    drawer: Drawer(
      elevation: 20,
      child: ListTile(
        leading: const Icon(Icons.change_history),
        title: const Text('Screen2'),
        onTap: () {
          Navigator.of(context).pushNamed('/b');
        },
      ),
    ),
    appBar: AppBar(title: const Text('Home')),
    body: Container(),
  );
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/navigation.webp", alt: "Navigation", class: "border" %}

## 手勢偵測與觸控事件處理

為了監聽並回應手勢，Flutter 支援點擊（tap）、拖曳（drag）以及縮放（scaling）等操作。Flutter 的手勢系統分為兩個獨立的層級。第一層是原始指標事件（raw pointer events），用來描述指標（例如觸控、滑鼠、手寫筆等）在螢幕上的位置與移動。第二層則是手勢（gestures），用來描述語意上的動作，這些動作通常由一個或多個指標移動所組成。

### 如何為元件（Widget）新增點擊或按壓監聽器？

在 React Native 中，可以透過在元件上加入 `PanResponder` 或使用 `Touchable` 元件來新增監聽器。

```js
// React Native
<TouchableOpacity
  onPress={() => {
    console.log('Press');
  }}
  onLongPress={() => {
    console.log('Long Press');
  }}
>
  <Text>Tap or Long Press</Text>
</TouchableOpacity>
```

對於更複雜的手勢，以及將多個觸控結合為單一手勢時，會使用 [`PanResponder`][`PanResponder`]。

```js
// React Native
const App = () => {
  const panResponderRef = useRef(null);

  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        !!getDirection(gestureState),
      onPanResponderMove: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        const drag = getDirection(gestureState);
      },
      onPanResponderTerminationRequest: (event, gestureState) => true
    });
  }, []);

  return (
    <View style={styles.container} {...panResponderRef.current.panHandlers}>
      <View style={styles.center}>
        <Text>Swipe Horizontally or Vertically</Text>
      </View>
    </View>
  );
};
```

在 Flutter 中，若要為元件（Widget）新增點擊（或按下）監聽器，可以使用具有`onPress: field`的按鈕或可觸控元件。或者，也可以將任何元件包裹在 [`GestureDetector`][`GestureDetector`] 中，以加入手勢偵測功能。

<?code-excerpt "lib/examples.dart (gesture-detector)"?>
```dart
@override
Widget build(BuildContext context) {
  return GestureDetector(
    child: Scaffold(
      appBar: AppBar(title: const Text('Gestures')),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Tap, Long Press, Swipe Horizontally or Vertically'),
          ],
        ),
      ),
    ),
    onTap: () {
      print('Tapped');
    },
    onLongPress: () {
      print('Long Pressed');
    },
    onVerticalDragEnd: (value) {
      print('Swiped Vertically');
    },
    onHorizontalDragEnd: (value) {
      print('Swiped Horizontally');
    },
  );
}
```

如需更多資訊，包括 Flutter `GestureDetector` 回呼（callback）列表，請參閱 [GestureDetector class][GestureDetector class]。

[GestureDetector class]: {{site.api}}/flutter/widgets/GestureDetector-class.html#instance-properties

{% render docs/android-ios-figure-pair.md, image: "react-native/flutter-gestures.webp", alt: "Gestures", class: "border" %}

## 進行 HTTP 網路請求

從網路擷取資料是大多數應用程式的常見需求。在 Flutter 中，`http` 套件提供了最簡單的方法來從網路擷取資料。

### 如何從 API 呼叫中擷取資料？

React Native 提供 Fetch API 進行網路通訊——你可以發送 fetch 請求，然後接收回應以取得資料。

```js
// React Native
const [ipAddress, setIpAddress] = useState('')

const _getIPAddress = () => {
  fetch('https://httpbin.org/ip')
    .then(response => response.json())
    .then(responseJson => {
      setIpAddress(responseJson.origin);
    })
    .catch(error => {
      console.error(error);
    });
};
```

Flutter 使用 `http` 套件。

若要將 `http` 套件新增為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add http
```

Flutter 使用 [`dart:io`][`dart:io`] 核心 HTTP 支援用戶端。
要建立一個 HTTP Client，請匯入 `dart:io`。

<?code-excerpt "lib/examples.dart (import-dart-io)"?>
```dart
import 'dart:io';
```

此用戶端支援以下 HTTP 操作：
GET、POST、PUT 和 DELETE。

<?code-excerpt "lib/examples.dart (http)"?>
```dart
final url = Uri.parse('https://httpbin.org/ip');
final httpClient = HttpClient();

Future<void> getIPAddress() async {
  final request = await httpClient.getUrl(url);
  final response = await request.close();
  final responseBody = await response.transform(utf8.decoder).join();
  final ip = jsonDecode(responseBody)['origin'] as String;
  setState(() {
    _ipAddress = ip;
  });
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/api-calls.webp", alt: "API calls", class: "border" %}

## 表單輸入

文字欄位（text field）允許使用者在你的應用程式中輸入文字，因此可以用來建立表單、即時通訊應用、搜尋體驗等。Flutter 提供了兩個核心的文字欄位元件（text field widgets）：[`TextField`][`TextField`] 和 [`TextFormField`][`TextFormField`]。

### 如何使用文字欄位元件？

在 React Native 中，若要輸入文字，你會使用 `TextInput` 元件來顯示文字輸入框，然後透過回呼（callback）將值儲存到變數中。

```js
// React Native
const [password, setPassword] = useState('')
...
<TextInput
  placeholder="Enter your Password"
  onChangeText={password => setPassword(password)}
/>
<Button title="Submit" onPress={this.validate} />
```

在 Flutter 中，使用 [`TextEditingController`][`TextEditingController`]
類別來管理 `TextField` 元件（Widget）。
每當文字欄位（text field）被修改時，
controller 會通知其監聽者（listeners）。

監聽者會讀取 text 和 selection 屬性，
以了解使用者在欄位中輸入了什麼內容。
你可以透過 controller 的 `text` 屬性，
在 `TextField` 中存取文字內容。

<?code-excerpt "lib/examples.dart (text-editing-controller)"?>
```dart
final TextEditingController _controller = TextEditingController();

@override
Widget build(BuildContext context) {
  return Column(
    children: [
      TextField(
        controller: _controller,
        decoration: const InputDecoration(
          hintText: 'Type something',
          labelText: 'Text Field',
        ),
      ),
      ElevatedButton(
        child: const Text('Submit'),
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text('Alert'),
                content: Text('You typed ${_controller.text}'),
              );
            },
          );
        },
      ),
    ],
  );
}
```

在此範例中，當使用者點擊提交按鈕時，會顯示一個 alert 對話框，內容為目前在文字欄位 (text field) 中輸入的文字。
這是透過 [`AlertDialog`][`AlertDialog`] 元件 (Widget) 來顯示提示訊息，並且由 [`TextEditingController`][`TextEditingController`] 的 `text` 屬性來取得 `TextField` 中的文字。

### 如何使用 Form 元件 (Widgets)？

在 Flutter 中，請使用 [`Form`][`Form`] 元件 (Widget)，
並將 [`TextFormField`][`TextFormField`] 元件 (Widgets) 以及提交按鈕作為 children 傳入。
`TextFormField` 元件 (Widget) 有一個名為 [`onSaved`][`onSaved`] 的參數，
可接受一個 callback，並在表單儲存時執行。
`FormState` 物件可用來儲存、重設或驗證
每個作為此 `Form` 子孫的 `FormField`。
若要取得 `FormState`，你可以使用 `Form.of()`，
並傳入一個其祖先為 `Form` 的 context，
或是在建立 `Form` 時傳入 `GlobalKey`，然後呼叫 `GlobalKey.currentState()`。

<?code-excerpt "lib/examples.dart (form-state)"?>
```dart
@override
Widget build(BuildContext context) {
  return Form(
    key: formKey,
    child: Column(
      children: <Widget>[
        TextFormField(
          validator: (value) {
            if (value != null && value.contains('@')) {
              return null;
            }
            return 'Not a valid email.';
          },
          onSaved: (val) {
            _email = val;
          },
          decoration: const InputDecoration(
            hintText: 'Enter your email',
            labelText: 'Email',
          ),
        ),
        ElevatedButton(onPressed: _submit, child: const Text('Login')),
      ],
    ),
  );
}
```

以下範例展示了如何使用 `Form.save()` 和 `formKey`（其為 `GlobalKey`），在提交時儲存表單。

<?code-excerpt "lib/examples.dart (form-submit)"?>
```dart
void _submit() {
  final form = formKey.currentState;
  if (form != null && form.validate()) {
    form.save();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Alert'),
          content: Text('Email: $_email, password: $_password'),
        );
      },
    );
  }
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/input-fields.webp", alt: "Input", class: "border" %}

## 平台專屬程式碼

當你開發跨平台應用程式時，通常會希望盡可能在不同平台間重複使用程式碼。然而，有些情境下，根據作業系統（OS）讓程式碼有所不同會更為合理。這時就需要針對特定平台宣告，並實作獨立的邏輯。

在 React Native 中，可以使用以下方式來實作：

```js
// React Native
if (Platform.OS === 'ios') {
  return 'iOS';
} else if (Platform.OS === 'android') {
  return 'android';
} else {
  return 'not recognised';
}
```

在 Flutter 中，請使用以下實作方式：

<?code-excerpt "lib/examples.dart (platform)"?>
```dart
final platform = Theme.of(context).platform;
if (platform == TargetPlatform.iOS) {
  return 'iOS';
}
if (platform == TargetPlatform.android) {
  return 'android';
}
if (platform == TargetPlatform.fuchsia) {
  return 'fuchsia';
}
return 'not recognized ';
```

## 除錯

### 我可以使用哪些工具來除錯我的 Flutter 應用程式？

你可以使用 [DevTools][DevTools] 工具套件來除錯 Flutter 或 Dart 應用程式。

DevTools 提供了效能分析、堆積檢查、元件樹（widget tree）檢視、診斷日誌、除錯、觀察程式碼執行行、記憶體洩漏與記憶體碎片化除錯等功能。更多資訊請參考 [DevTools][DevTools] 文件。

如果你使用的是整合式開發環境（IDE），也可以直接利用 IDE 內建的除錯工具來除錯你的應用程式。

### 如何執行熱重載（hot reload）？

Flutter 的 Stateful Hot Reload（狀態熱重載）功能可協助你快速且輕鬆地實驗、建立 UI、加入新功能或修正錯誤。你不需要每次修改後都重新編譯應用程式，只需執行熱重載即可立即看到變更。應用程式會即時更新以反映你的修改，並且保留目前的應用程式狀態。

首先，請在你習慣使用的 IDE 中，啟用自動儲存（autosave）以及儲存時自動熱重載（hot reloads on save）。

    **VS Code**

    Add the following to your `.vscode/settings.json` file:

    ```json
    "files.autoSave": "afterDelay",
    "dart.flutterHotReloadOnSave": "all",
    ```
    **Android Studio and IntelliJ**

    * Open `Settings > Tools > Actions on Save` and select
     `Configure autosave options`.
        - Check the option to `Save files if the IDE is idle for X seconds`.
        - **Recommended:** Set a small delay duration. For example, 2 seconds.
   
    * Open `Settings > Languages & Frameworks > Flutter`.
        - Check the option to `Perform hot reload on save`.


在 React Native 中，
快捷鍵為 iOS 模擬器的 ⌘R，Android 模擬器則是連按兩次 R。

在 Flutter 中，如果你使用 IntelliJ IDE 或 Android Studio，
可以選擇「全部儲存」（⌘s/ctrl-s），或點擊工具列上的
Hot Reload（熱重載）按鈕。如果你
在命令列使用 `flutter run` 執行應用程式，
請在 Terminal 視窗中輸入 `r`。
你也可以在 Terminal 視窗中輸入 `R` 來執行完整重啟。

### 如何存取應用程式內的開發者選單？

在 React Native 中，可以透過搖晃裝置來開啟開發者選單：iOS 模擬器使用 ⌘D，Android 模擬器則是 ⌘M。

在 Flutter 中，如果你使用 IDE，可以直接利用 IDE 工具。如果你是用 `flutter run` 啟動應用程式，也可以在 terminal 視窗中輸入 `h` 來存取選單，或使用下列快捷鍵：

| 動作| Terminal 快捷鍵| 除錯功能與屬性|
| :------- | :------: | :------ |
| 應用程式的元件階層| `w`| debugDumpApp()|
| 應用程式的渲染樹| `t`| debugDumpRenderTree()|
| 圖層| `L`| debugDumpLayerTree()|
| 無障礙資訊 | `S`（遍歷順序）或<br>`U`（反向點擊測試順序）|debugDumpSemantics()|
| 切換元件檢查器 | `i` | WidgetsApp.showWidgetInspectorOverride|
| 切換建構線顯示| `p` | debugPaintSizeEnabled|
| 模擬不同作業系統| `o` | defaultTargetPlatform|
| 顯示效能覆蓋層 | `P` | WidgetsApp.showPerformanceOverlay|
| 儲存螢幕截圖為 flutter.png| `s` ||
| 離開| `q` ||

{:.table .table-striped}

## 動畫 (Animation)

精心設計的動畫能讓 UI 更直覺，
提升應用程式的質感，
並改善使用者體驗。
Flutter 的動畫支援讓你可以輕鬆
實作簡單或複雜的動畫效果。
Flutter SDK（Flutter 軟體開發套件）內建許多 Material Design 元件 (Widgets)，
這些元件包含標準的動態效果，
你也可以輕鬆自訂這些效果，
讓你的應用程式更具個人化。

在 React Native 中，會使用 Animated API 來建立動畫。

在 Flutter 中，請使用 [`Animation`][`Animation`]
類別與 [`AnimationController`][`AnimationController`] 類別。
`Animation` 是一個抽象類別，能夠掌握其
當前值與狀態（完成或關閉）。
`AnimationController` 類別允許你
正向或反向播放動畫，
也能停止動畫並將動畫
設為特定值，以自訂動畫動作。

### 如何加入簡單的淡入動畫？

在下方的 React Native 範例中，會使用 Animated API 建立一個動畫元件，
`FadeInView`。
定義了初始透明度狀態、最終狀態，以及動畫過渡的持續時間。
動畫元件會被加入到 `Animated` 元件中，
透明度狀態 `fadeAnim` 會對應到我們想要動畫的 `Text` 元件的透明度，
然後呼叫 `start()` 來啟動動畫。

```js
// React Native
const FadeInView = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000
    }).start();
  }, []);

  return (
    <Animated.View style={%raw%}{{ ...style, opacity: fadeAnim }}{%endraw%}>
      {children}
    </Animated.View>
  );
};
    ...
<FadeInView>
  <Text> Fading in </Text>
</FadeInView>
    ...
```

要在 Flutter 中建立相同的動畫，請建立一個名為 `controller` 的 [`AnimationController`][`AnimationController`] 物件，並指定持續時間。預設情況下，`AnimationController` 會在指定的持續時間內，線性產生從 0.0 到 1.0 的數值。每當執行你的應用程式的裝置準備好顯示新畫面時，動畫控制器就會產生一個新數值。通常這個速率約為每秒 60 個數值。

在定義 `AnimationController` 時，你必須傳入一個 `vsync` 物件。`vsync` 的存在可以防止離螢幕的動畫消耗不必要的資源。你可以將你的 stateful 物件作為 `TickerProviderStateMixin`，方法是在類別定義中加入 `vsync`。`AnimationController` 需要一個 TickerProvider，這可以透過建構函式中的 `vsync` 參數來設定。

[`Tween`][`Tween`] 用來描述起始值與結束值之間的內插，或是將輸入範圍對應到輸出範圍。若要將 `Tween` 物件用於動畫，請呼叫 `Tween` 物件的 `animate()` 方法，並傳入你想要修改的 `Animation` 物件。

在這個範例中，會使用 [`FadeTransition`][`FadeTransition`] 元件，並將 `opacity` 屬性對應到 `animation` 物件。

要啟動動畫，請使用 `controller.forward()`。你也可以透過控制器執行其他操作，例如 `fling()` 或 `repeat()`。

在這個範例中，[`FlutterLogo`][`FlutterLogo`] 元件會被放在 `FadeTransition` 元件內部使用。

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const Center(child: LogoFade()));
}

class LogoFade extends StatefulWidget {
  const LogoFade({super.key});

  @override
  State<LogoFade> createState() => _LogoFadeState();
}

class _LogoFadeState extends State<LogoFade>
    with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    final CurvedAnimation curve = CurvedAnimation(
      parent: controller,
      curve: Curves.easeIn,
    );
    animation = Tween(begin: 0.0, end: 1.0).animate(curve);
    controller.forward();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: animation,
      child: const SizedBox(height: 300, width: 300, child: FlutterLogo()),
    );
  }
}
```

{% render docs/android-ios-figure-pair.md, image: "react-native/flutter-fade.webp", alt: "Flutter fade", class: "border" %}

### 如何為卡片加入滑動動畫（swipe animation）？

在 React Native 中，可以使用 `PanResponder` 或第三方函式庫來實現滑動動畫（swipe animation）。

在 Flutter 中，若要加入滑動動畫，請使用 [`Dismissible`][`Dismissible`] 元件（Widget），並將子元件（child widgets）巢狀於其中。

<?code-excerpt "lib/examples.dart (dismissible)"?>
```dart
return Dismissible(
  key: Key(widget.key.toString()),
  onDismissed: (dismissDirection) {
    cards.removeLast();
  },
  child: Container(
    //...
  ),
);
```

{% render docs/android-ios-figure-pair.md, image: "react-native/card-swipe.webp", alt: "Card swipe", class: "border" %}

## React Native 與 Flutter 元件（Widgets）對應表

下表列出了常用的 React Native 元件，對應到 Flutter 的元件（Widgets）及其常見屬性。

| React Native 元件                                                                    | Flutter 元件（Widget）                                                                                             | 說明                                                                                                                            |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`Button`](https://reactnative.dev/docs/button)                        | [`ElevatedButton`][`ElevatedButton`]                           | 基本的凸起按鈕（raised button）。                                                                              |
|                                                                                           |  onPressed [required]                                                                                        | 當按鈕被點擊或啟動時的回呼函式。                                                          |
|                                                                                           | Child                                                                              | 按鈕的標籤。                                                                                                      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`Button`](https://reactnative.dev/docs/button)                        | [`TextButton`][`TextButton`]                               | 基本的扁平按鈕（flat button）。                                                                                                         |
|                                                                                           |  onPressed [required]                                                                                        | 當按鈕被點擊或啟動時的回呼函式。                                                            |
|                                                                                           | Child                                                                              | 按鈕的標籤。                                                                                                      |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`ScrollView`](https://reactnative.dev/docs/scrollview)                | [`ListView`][`ListView`]                                    | 可捲動的線性排列元件（Widget）清單。|
||        children                                                                              | 	( <Widget\> [ ])  要顯示的子元件（Widget）清單。
||controller |[ [`ScrollController`][ [`ScrollController`] ] 可用於控制可捲動元件（Widget）的物件。
||itemExtent|[ double ] 若非 null，強制所有子元件在捲動方向上具有指定長度。
||scroll Direction|[ [`Axis`][ [`Axis`] ] 捲動檢視的捲動軸向。
||                                                                                                            |                                                                                                                                        |
| [`FlatList`](https://reactnative.dev/docs/flatlist)                    | [`ListView.builder`][`ListView.builder`]               | 按需建立線性元件（Widget）陣列的建構函式。
||itemBuilder [required] |[[`IndexedWidgetBuilder`][[`IndexedWidgetBuilder`]] 用於按需建立子元件。此回呼僅會以大於等於零且小於 itemCount 的索引呼叫。
||itemCount |[ int ] 提升 `ListView` 預估最大捲動範圍的能力。
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`Image`](https://reactnative.dev/docs/image)                         | [`Image`][`Image`]                                           | 用於顯示圖片的元件（Widget）。                                                                                                       |
|                                                                                           |  image [required]                                                                                          | 要顯示的圖片。                                                                                                                  |
|                                                                                           | Image. asset                                                                                                | 提供多種建構函式以支援不同方式指定圖片。                                                 |
|                                                                                           | width, height, color, alignment                                                                            | 設定圖片的樣式與版面配置。                                                                                                         |
|                                                                                           | fit                                                                                                        | 將圖片填滿在版面配置分配的空間內。                                                                           |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`Modal`](https://reactnative.dev/docs/modal)                          | [`ModalRoute`][`ModalRoute`]                                | 阻擋與前一個路由互動的路由（Route）。                                                                                  |
|                                                                                           | animation                                                                                                  | 控制此路由轉場及前一個路由前進轉場的動畫（Animation）。                                          |
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [`ActivityIndicator`](https://reactnative.dev/docs/activityindicator) | [`CircularProgressIndicator`][`CircularProgressIndicator`] | 顯示圓形進度的元件（Widget）。                                                                                           |
|                                                                                           | strokeWidth                                                                                                | 繪製圓形時使用的線寬。                                                                                         |
|                                                                                           | backgroundColor                                                                                            | 進度指示器的背景顏色，預設為目前主題的 `ThemeData.backgroundColor`。                                   |
|                                                                                           |                                                                                                            |                                                                                                                                        |
|  [`ActivityIndicator`](https://reactnative.dev/docs/activityindicator) | [`LinearProgressIndicator`][`LinearProgressIndicator`]     | 顯示線性進度的元件（Widget）。                                                                                           |
|                                                                                           | value                                                                                                      | 此進度指示器的值。                                                                                                   |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`RefreshControl`](https://reactnative.dev/docs/refreshcontrol)        | [`RefreshIndicator`][`RefreshIndicator`]                   | 支援 Material「滑動以重新整理」操作的元件（Widget）。                                                                          |
|                                                                                           | color                                                                                                      | 進度指示器的前景顏色。                                                                                             |
|                                                                                           | onRefresh                                                                                                  | 當使用者拖曳刷新指示器到足夠距離以示意要重新整理應用程式時所呼叫的函式。  |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`View`](https://reactnative.dev/docs/view)                            | [`Container`][`Container`]                                  | 包覆子元件（Widget）的元件。                                                                                                                |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`View`](https://reactnative.dev/docs/view)                            | [`Column`][`Column`]                                        | 垂直排列其子元件（Widget）的元件。                                                                                              |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`View`](https://reactnative.dev/docs/view)                            | [`Row`][`Row`]                                              | 水平排列其子元件（Widget）的元件。                                                                                            |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`View`](https://reactnative.dev/docs/view)                            | [`Center`][`Center`]                                        | 將子元件（Widget）置中的元件。                                                                                                       |
|                                                                                           |                                                                                                            |                                                                                                                                        |
| [`View`](https://reactnative.dev/docs/view)                            | [`Padding`][`Padding`]                                      | 依指定內距（padding）包覆子元件（Widget）的元件。                                                                                                 |
|                                                                                           | padding [required]                                                                                         | [ EdgeInsets ] 內縮子元件的空間大小。
|||
| [`TouchableOpacity`](https://reactnative.dev/docs/touchableopacity)    | [`GestureDetector`][`GestureDetector`]                      | 偵測手勢的元件（Widget）。                                                                                                                       |
|                                                                                           | onTap                                                                                                      | 點擊時的回呼函式。                                                                                                               |
|                                                                                           | onDoubleTap                                                                                                | 在同一位置短時間內連續點擊兩次時的回呼函式。
|||
| [`TextInput`](https://reactnative.dev/docs/textinput)                | [`TextInput`][`TextInput`]                                   | 系統文字輸入控制介面的元件（Widget）。                                                                                           |
|                                                                                           | controller                                                                                                 | [ [`TextEditingController`][ [`TextEditingController`] ] 用於存取與修改文字。
|||
| [`Text`](https://reactnative.dev/docs/text)                          | [`Text`][`Text`]                                            | 顯示單一樣式文字字串的 Text 元件（Widget）。                                                                                                                                                                           |
|                                                                                         | data                                                                                                      | [ String ] 要顯示的文字。                                                                                                                                                                              |
|                                                                                         | textDirection                                                                                             | [ [`TextAlign`][ [`TextAlign`] ] 文字的流向。                                                                                     |
|                                                                                         |                                                                                                           |                                                                                                                                                                                                              |
| [`Switch`](https://reactnative.dev/docs/switch)                      | [`Switch`][`Switch`]                                      | Material Design 風格的開關元件（switch）。                                                                                                                                                                                    |
|                                                                                         | value [required]                                                                                          | [ boolean ] 此開關目前是否為開啟狀態。                                                                                                                                                                 |
|                                                                                         | onChanged [required]                                                                                      | [ callback ] 當使用者切換開關時呼叫。                                                                                                                                               |

{:.table .table-striped}


[`AboutDialog`]: {{site.api}}/flutter/material/AboutDialog-class.html
[Adding Assets and Images in Flutter]: /ui/assets/assets-and-images
[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[`Align`]: {{site.api}}/flutter/widgets/Align-class.html
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[async and await]: {{site.dart-site}}/language/async
[`Axis`]: {{site.api}}/flutter/painting/Axis.html
[`BuildContext`]: {{site.api}}/flutter/widgets/BuildContext-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[color palette]: {{site.material2}}/design/color/the-color-system.html#color-theme-creation
[colors]: {{site.api}}/flutter/material/Colors-class.html
[`Colors`]: {{site.api}}/flutter/material/Colors-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Checkbox`]: {{site.api}}/flutter/material/Checkbox-class.html
[`CircleAvatar`]: {{site.api}}/flutter/material/CircleAvatar-class.html
[`CircularProgressIndicator`]: {{site.api}}/flutter/material/CircularProgressIndicator-class.html
[Cupertino (iOS-style)]: /ui/widgets/cupertino
[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html
[`CustomPainter`]: {{site.api}}/flutter/rendering/CustomPainter-class.html
[Dart]: {{site.dart-site}}/dart-2
[Dart's Type System]: {{site.dart-site}}/guides/language/sound-dart
[Sound Null Safety]: {{site.dart-site}}/null-safety
[`dart:io`]: {{site.api}}/flutter/dart-io/dart-io-library.html
[DartPadA]: {{site.dartpad}}/?id=0df636e00f348bdec2bc1c8ebc7daeb1
[DartPadB]: {{site.dartpad}}/?id=cf9e652f77636224d3e37d96dcf238e5
[DartPadC]: {{site.dartpad}}/?id=3f4625c16e05eec396d6046883739612
[DartPadD]: {{site.dartpad}}/?id=57ec21faa8b6fe2326ffd74e9781a2c7
[DartPadE]: {{site.dartpad}}/?id=c85038ad677963cb6dc943eb1a0b72e6
[DartPadF]: {{site.dartpad}}/?id=5454e8bfadf3000179d19b9bc6be9918
[Developing Packages & Plugins]: /packages-and-plugins/developing-packages
[DevTools]: /tools/devtools
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html
[`FadeTransition`]: {{site.api}}/flutter/widgets/FadeTransition-class.html
[Flutter packages]: {{site.pub}}/flutter/
[Flutter Architectural Overview]: /resources/architectural-overview
[Flutter Basic Widgets]: /ui/widgets/basics
[Flutter Technical Overview]: /resources/architectural-overview
[Flutter Widget Catalog]: /ui/widgets
[Flutter Widget Index]: /reference/widgets
[`FlutterLogo`]: {{site.api}}/flutter/material/FlutterLogo-class.html
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[functions]: {{site.dart-site}}/language/functions
[`Future`]: {{site.dart-site}}/tutorials/language/futures
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[Getting started]: /get-started
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`IndexedWidgetBuilder`]: {{site.api}}/flutter/widgets/IndexedWidgetBuilder.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[Layout Widgets]: /ui/widgets/layout
[`LinearProgressIndicator`]: {{site.api}}/flutter/material/LinearProgressIndicator-class.html
[`ListTile`]: {{site.api}}/flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[Material Design]: {{site.material}}/styles
[Material icons]: {{site.api}}/flutter/material/Icons-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`MaterialPageRoute`]: {{site.api}}/flutter/material/MaterialPageRoute-class.html
[`ModalRoute`]: {{site.api}}/flutter/widgets/ModalRoute-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.of()`]: {{site.api}}/flutter/widgets/Navigator/of.html
[`Navigator.pop`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Navigator.push`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`onSaved`]: {{site.api}}/flutter/widgets/FormField/onSaved.html
[named parameters]: {{site.dart-site}}/language/functions#named-parameters
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[`PanResponder`]: https://reactnative.dev/docs/panresponder
[pub.dev]: {{site.pub}}
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`RefreshIndicator`]: {{site.api}}/flutter/material/RefreshIndicator-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`ScrollController`]: {{site.api}}/flutter/widgets/ScrollController-class.html
[`shared_preferences`]: {{site.repo.packages}}/tree/main/packages/shared_preferences/shared_preferences
[`SingleTickerProviderStateMixin`]: {{site.api}}/flutter/widgets/SingleTickerProviderStateMixin-mixin.html
[`Slider`]: {{site.api}}/flutter/material/Slider-class.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[State management]: /data-and-backend/state-mgmt
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Switch`]: {{site.api}}/flutter/material/Switch-class.html
[`Tab`]: {{site.api}}/flutter/material/Tab-class.html
[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[`TabBarView`]: {{site.api}}/flutter/material/TabBarView-class.html
[`TabController`]: {{site.api}}/flutter/material/TabController-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`TextAlign`]: {{site.api}}/flutter/dart-ui/TextAlign.html
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
[`TextInput`]: {{site.api}}/flutter/services/TextInput-class.html
[`TextStyle`]: {{site.api}}/flutter/dart-ui/TextStyle-class.html
[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`Ticker`]: {{site.api}}/flutter/scheduler/Ticker-class.html
[`TickerProvider`]: {{site.api}}/flutter/scheduler/TickerProvider-class.html
[`TickerProviderStateMixin`]: {{site.api}}/flutter/widgets/TickerProviderStateMixin-mixin.html
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
[Using Packages]: /packages-and-plugins/using-packages
[variables]: {{site.dart-site}}/language/variables
[`WidgetBuilder`]: {{site.api}}/flutter/widgets/WidgetBuilder.html
[infinite_list]: {{site.repo.samples}}/tree/main/infinite_list
