# 給 Android 開發者的 Flutter 指南

> 學習如何將 Android 開發知識應用於 Flutter 應用程式開發。



<?code-excerpt path-base="get-started/flutter-for/android_devs"?>

本文件適用於希望將現有 Android 開發知識應用於 Flutter 行動應用程式開發的 Android 開發者。如果你已經了解 Android framework 的基礎知識，這份文件可以作為你快速上手 Flutter 開發的參考。

:::note
Android 有兩套原生使用者介面系統：Views（基於 XML）以及 Jetpack Compose。兩者在某些基礎概念上是共通的，因此不論你熟悉哪一套，本文件都會對你有所幫助。不過，如果你是從 Jetpack Compose 轉換過來，建議參考 [Flutter for Jetpack Compose devs][]，其中有關於 Jetpack Compose 的詳細說明，以及與 Flutter 範例的對應比較。

若你想將 Flutter 程式碼整合到現有的 Android 應用程式中，請參考 [Add Flutter to existing app][]。
:::

你的 Android 知識與技能在使用 Flutter 開發時非常有價值，因為 Flutter 依賴行動作業系統來實現許多功能與設定。Flutter 是一種全新的行動 UI 建構方式，但它有插件系統可與 Android（及 iOS）進行非 UI 任務的溝通。如果你是 Android 專家，無需全部重學即可開始使用 Flutter。

本文件可作為「食譜」使用，你可以依需求跳著閱讀，尋找最相關的問題解答。

## 視圖（Views）

### Flutter 中對應 View 的是什麼？

:::secondary
React 風格，或稱為 _宣告式_（declarative）程式設計，與傳統的命令式（imperative）程式設計有何不同？如需比較，請參考 [Introduction to declarative UI][]。
:::

在 Android 中，`View` 是所有螢幕上顯示內容的基礎。按鈕、工具列、輸入欄位等，一切都是 View。在 Flutter 中，`View` 的大致對應是 `Widget`。雖然元件 (Widget) 與 Android 的 views 並非完全一一對應，但在你熟悉 Flutter 運作方式的過程中，可以將它們理解為「宣告與建構 UI 的方式」。

然而，這些和 `View` 仍有一些不同。首先，元件（Widgets）有不同的生命週期：它們是不可變的，只存在於需要變更時。每當元件或其狀態改變時，Flutter framework 會建立一個新的元件樹。而在 Android 中，view 只會被繪製一次，除非呼叫 `invalidate` 才會重新繪製。

Flutter 的元件（Widgets）之所以輕量，部分原因是它們的不可變性。因為它們本身不是 view，也不直接負責繪製任何內容，而是 UI 及其語意的描述，這些描述會在底層「膨脹」成實際的 view 物件。

Flutter 內建 [Material Components][] 函式庫，這些元件實作了 [Material Design 指南][Material Design guidelines]。Material Design 是一套 [針對所有平台最佳化][optimized for all platforms] 的彈性設計系統，包括 iOS。

但 Flutter 也足夠靈活且具表現力，可以實作任何設計語言。例如，在 iOS 上，你可以使用 [Cupertino 元件][Cupertino widgets]，打造符合 [Apple iOS 設計語言][Apple's iOS design language] 的介面。

### 如何更新元件（Widgets）？

在 Android 中，你會直接修改 view 來更新畫面。然而，在 Flutter 中，`Widget` 是不可變的，不能直接更新，你必須透過元件的狀態來操作。

這就是 `Stateful` 與 `Stateless` 元件概念的由來。`StatelessWidget` 就如其名——沒有狀態資訊的元件。

`StatelessWidgets` 適用於你要描述的 UI 部分僅依賴於元件物件內的設定資訊時。

舉例來說，在 Android 中，這類情境就像放置一個 `ImageView` 來顯示你的 logo。logo 在執行期間不會改變，因此在 Flutter 中應使用 `StatelessWidget`。

如果你想根據 HTTP 請求取得的資料或使用者互動動態改變 UI，就必須使用 `StatefulWidget`，並通知 Flutter framework 該元件的 `State` 已更新，讓它可以重新繪製該元件。

這裡要注意的是，無狀態與有狀態元件的核心行為是一致的：它們每一幀都會重建，差別在於 `StatefulWidget` 會有一個 `State` 物件，能在多個畫面幀間儲存與還原狀態資料。

如果不確定，請記住這個原則：如果元件會改變（例如因使用者互動），它就是有狀態的；但如果元件只是對變化做出反應，且其父元件本身不會因變化而改變，那父元件仍可保持無狀態。

以下範例展示如何使用 `StatelessWidget`。常見的 `StatelessWidget` 是 `Text` 元件。如果你查看 `Text` 元件的實作，會發現它是繼承自 `StatelessWidget`。

<?code-excerpt "lib/text_widget.dart (text-widget)" replace="/return const //g"?>
```dart
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

如你所見，`Text` 元件（Widget）本身並沒有任何狀態資訊與其關聯，
它只會根據建構函式所傳入的內容進行渲染，除此之外不會有其他變化。

但如果你希望「I Like Flutter」這段文字能夠動態變化，
例如在點擊 `FloatingActionButton` 時改變內容，該怎麼做呢？

要達成這個目的，可以將 `Text` 元件包裹在 `StatefulWidget` 中，
並在使用者點擊按鈕時進行更新。

舉例如下：

<?code-excerpt "lib/text_widget.dart (stateful-widget)"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text.
  String textToShow = 'I Like Flutter';

  void _updateText() {
    setState(() {
      // Update the text.
      textToShow = 'Flutter is Awesome!';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(child: Text(textToShow)),
      floatingActionButton: FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: const Icon(Icons.update),
      ),
    );
  }
}
```

### 我該如何配置我的元件（Widgets）？我的 XML 版面配置檔在哪裡？

在 Android 中，你會用 XML 來撰寫版面配置，但在 Flutter 中，你會用元件樹（widget tree）來撰寫你的版面配置。

以下範例展示如何顯示一個帶有內距（padding）的簡單元件：

<?code-excerpt "lib/layout.dart (simple-widget)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: Center(
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.only(left: 20, right: 30),
        ),
        onPressed: () {},
        child: const Text('Hello'),
      ),
    ),
  );
}
```

你可以在 [widget catalog][] 中查看 Flutter 提供的一些版面配置元件。

### 如何在我的版面配置中新增或移除元件？

在 Android 中，你會在父元件上呼叫 `addChild()` 或 `removeChild()` 來動態新增或移除子視圖。
在 Flutter 中，由於元件（Widget）是不可變的，因此沒有直接對應的 `addChild()`。
相對地，你可以將一個函式傳遞給父元件，該函式回傳一個元件，並透過布林旗標來控制該子元件的建立。

例如，以下範例說明當你點擊 `FloatingActionButton` 時，如何在兩個元件之間切換顯示：

<?code-excerpt "lib/layout.dart (toggle-widget)"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default value for toggle.
  bool toggle = true;
  void _toggle() {
    setState(() {
      toggle = !toggle;
    });
  }

  Widget _getToggleChild() {
    if (toggle) {
      return const Text('Toggle One');
    } else {
      return ElevatedButton(onPressed: () {}, child: const Text('Toggle Two'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(child: _getToggleChild()),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: const Icon(Icons.update),
      ),
    );
  }
}
```

### 如何為元件（Widget）加入動畫？

在 Android 中，你可以透過 XML 建立動畫，或是在 view 上呼叫 `animate()` 方法。
在 Flutter 中，則是利用動畫（Animation）函式庫，將元件包裹在動畫元件（animated widget）內來實現動畫效果。

在 Flutter 中，你可以使用 `AnimationController`，它是一個可以暫停、快轉、停止與反轉動畫的 `Animation<double>`。它需要一個 `Ticker` 來通知 vsync（垂直同步）發生的時機，並在動畫執行時於每一幀產生 0 到 1 的線性內插值。接著，你可以建立一個或多個 `Animation`，並將它們附加到 controller 上。

舉例來說，你可以使用 `CurvedAnimation` 來根據插值曲線實作動畫。在這個架構下，controller 是動畫進度的「主控」來源，而 `CurvedAnimation` 則計算取代 controller 預設線性運動的曲線。與元件（Widgets）一樣，Flutter 的動畫也採用組合（composition）方式運作。

在建立元件樹時，你可以將 `Animation` 指定給元件的動畫屬性，例如 `FadeTransition` 的透明度，然後再指示 controller 啟動動畫。

以下範例展示如何撰寫一個 `FadeTransition`，當你按下 `FloatingActionButton` 時，該元件會以淡入效果顯示 logo：

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  const FadeAppTest({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fade Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  const MyFadeTest({super.key, required this.title});

  final String title;
  @override
  State<MyFadeTest> createState() => _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  late AnimationController controller;
  late CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: FadeTransition(
          opacity: curve,
          child: const FlutterLogo(size: 100),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Fade',
        onPressed: () {
          controller.forward();
        },
        child: const Icon(Icons.brush),
      ),
    );
  }
}
```

如需更多資訊，請參閱
[動畫與動態元件 (Animation & Motion widgets)][Animation & Motion widgets]、
[動畫教學 (Animations tutorial)][Animations tutorial]，
以及 [動畫概覽 (Animations overview)][Animations overview]。

### 如何使用 Canvas 進行繪製/繪圖？

在 Android 中，你會使用 `Canvas` 和 `Drawable`
來將圖片和圖形繪製到螢幕上。
Flutter 也有類似的 `Canvas` API，
因為它同樣是基於底層的 Skia 繪圖引擎。
因此，對於 Android 開發者來說，在 Flutter 上使用 Canvas 進行繪製是一個非常熟悉的任務。

Flutter 提供兩個協助你在 Canvas 上繪製的類別：`CustomPaint` 和 `CustomPainter`，
其中 `CustomPainter` 用於實作你的繪製演算法。

若想了解如何在 Flutter 中實作簽名繪製器，請參考 Collin 在 [Custom Paint][] 上的解答。

<?code-excerpt "lib/canvas.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: DemoApp()));

class DemoApp extends StatelessWidget {
  const DemoApp({super.key});

  @override
  Widget build(BuildContext context) => const Scaffold(body: Signature());
}

class Signature extends StatefulWidget {
  const Signature({super.key});

  @override
  SignatureState createState() => SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset?> _points = <Offset>[];
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (details) {
        setState(() {
          RenderBox? referenceBox = context.findRenderObject() as RenderBox;
          Offset localPosition = referenceBox.globalToLocal(
            details.globalPosition,
          );
          _points = List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (details) => _points.add(null),
      child: CustomPaint(
        painter: SignaturePainter(_points),
        size: Size.infinite,
      ),
    );
  }
}

class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);
  final List<Offset?> points;
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5;
    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != null && points[i + 1] != null) {
        canvas.drawLine(points[i]!, points[i + 1]!, paint);
      }
    }
  }

  @override
  bool shouldRepaint(SignaturePainter oldDelegate) =>
      oldDelegate.points != points;
}
```

[Custom Paint]: https://stackoverflow.com/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter

### 如何建立自訂元件 (Widgets)？

在 Android 中，你通常會繼承 `View`，或使用現有的 view，
以覆寫並實作方法來達到你想要的行為。

在 Flutter 中，建立自訂元件 (Widget) 的方式是透過[組合][composing]
較小的元件（而不是繼承它們）。
這有點類似於在 Android 中實作自訂 `ViewGroup`，
所有的建構區塊都已經存在，
但你可以提供不同的行為——例如，
自訂的版面配置邏輯。

舉例來說，若你想建立一個在
建構子中接收 label 的 `CustomButton`，該怎麼做？
你可以建立一個 CustomButton，並組合一個帶有 label 的 `ElevatedButton`，
而不是繼承 `ElevatedButton`：

<?code-excerpt "lib/custom.dart (custom-button)"?>
```dart
class CustomButton extends StatelessWidget {
  final String label;

  const CustomButton(this.label, {super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: () {}, child: Text(label));
  }
}
```

然後像使用其他 Flutter 元件（Widgets）一樣使用 `CustomButton`：

<?code-excerpt "lib/custom.dart (use-custom-button)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(child: CustomButton('Hello'));
}
```

## Intent

### Flutter 中有什麼可以對應 Intent 的概念？

在 Android 中，`Intent` 主要有兩種使用情境：在 Activity 之間導覽，以及與元件進行通訊。而 Flutter 則沒有 Intent 這個概念，不過你仍然可以透過原生整合（使用[外掛程式][a plugin]）來啟動 Intent。

Flutter 並沒有直接對應於 Activity 和 Fragment 的概念；在 Flutter 中，你會在同一個 `Activity` 內，透過 `Navigator` 和 `Route` 來在不同螢幕間導覽。

`Route` 是對應於應用程式「螢幕」或「頁面」的抽象，而 `Navigator` 則是負責管理路由的元件。Route 大致上對應到 `Activity`，但意義並不完全相同。Navigator 可以 push 或 pop route，以在不同螢幕間切換。Navigator 的運作方式類似堆疊（stack），你可以將想要導覽的新 route `push()` 進來，也可以在想要「返回」時將 route `pop()` 出去。

在 Android 中，你需要在應用程式的 `AndroidManifest.xml` 中宣告你的 Activity。

而在 Flutter 中，你有幾種方式可以在頁面間導覽：

* 指定一個 `Map` 路由名稱的清單（使用 `MaterialApp`）
* 直接導覽到某個 route（使用 `WidgetsApp`）

以下範例建立了一個 Map。

<?code-excerpt "lib/intent.dart (map)"?>
```dart
void main() {
  runApp(
    MaterialApp(
      home: const MyAppHome(), // Becomes the route named '/'.
      routes: <String, WidgetBuilder>{
        '/a': (context) => const MyPage(title: 'page A'),
        '/b': (context) => const MyPage(title: 'page B'),
        '/c': (context) => const MyPage(title: 'page C'),
      },
    ),
  );
}
```

透過將其名稱 `push` 到 `Navigator` 來導向至指定的路由（Route）。

<?code-excerpt "lib/intent.dart (push)"?>
```dart
Navigator.of(context).pushNamed('/b');
```

`Intent` 的另一個常見使用情境是呼叫外部元件，例如相機（Camera）或檔案選擇器（File picker）。為此，你需要建立原生平台整合（native platform integration），或使用[現有的套件][existing plugin]。

若想了解如何建立原生平台整合，請參考[開發套件與插件][developing packages and plugins]。

### 如何在 Flutter 中處理來自外部應用程式的傳入 Intent？

Flutter 可以透過直接與 Android 層溝通並請求被分享的資料，來處理來自 Android 的傳入 Intent。

以下範例會在執行 Flutter 程式碼的原生 activity 上註冊一個文字分享（text share）Intent 過濾器（intent filter），讓其他應用程式可以將文字分享給我們的 Flutter 應用程式。

基本流程是，我們首先在 Android 原生端（於 `Activity` 中）處理被分享的文字資料，然後等待 Flutter 請求資料時，透過 `MethodChannel` 提供給 Flutter。

首先，在 `AndroidManifest.xml` 中為所有 Intent 註冊 intent filter：

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTop"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize">
  <!-- ... -->
  <intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="text/plain" />
  </intent-filter>
</activity>
```

然後在 `MainActivity` 中，處理 Intent，從該 Intent 中擷取被分享的文字並保存下來。當 Flutter 準備好處理時，會透過平台通道（platform channel）請求該資料，然後資料會從原生端傳送過來：

```java
package com.example.shared;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;

import io.flutter.plugin.common.MethodChannel;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {

  private String sharedText;
  private static final String CHANNEL = "app.channel.shared.data";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
      if ("text/plain".equals(type)) {
        handleSendText(intent); // Handle text being sent
      }
    }
  }

  @Override
  public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
      GeneratedPluginRegistrant.registerWith(flutterEngine);

      new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
              .setMethodCallHandler(
                      (call, result) -> {
                          if (call.method.contentEquals("getSharedText")) {
                              result.success(sharedText);
                              sharedText = null;
                          }
                      }
              );
  }

  void handleSendText(Intent intent) {
    sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
  }
}
```

最後，當元件（Widget）被渲染時，從 Flutter 端請求資料：

<?code-excerpt "lib/request_data.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample Shared App Handler',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  static const platform = MethodChannel('app.channel.shared.data');
  String dataShared = 'No data';

  @override
  void initState() {
    super.initState();
    getSharedText();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text(dataShared)));
  }

  Future<void> getSharedText() async {
    var sharedData = await platform.invokeMethod('getSharedText');
    if (sharedData != null) {
      setState(() {
        dataShared = sharedData as String;
      });
    }
  }
}
```

### startActivityForResult() 的對應實作是什麼？

`Navigator` 類別在 Flutter 中負責路由（routing），並用於從你推送到堆疊上的 Route 取得回傳結果。這可以透過在 `push()` 所回傳的 `Future` 上進行 `await` 來完成。

例如，若要啟動一個讓使用者選擇位置的 location route，你可以這樣做：

<?code-excerpt "lib/intent.dart (push-await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

然後，在你的 location 路由（Route）內，當使用者選擇完他們的位置後，你可以 `pop` 堆疊（stack）並帶回結果：

<?code-excerpt "lib/intent.dart (pop)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

## 非同步 UI

### Flutter 中對應 runOnUiThread() 的做法是什麼？

Dart 採用單執行緒（single-threaded）的執行模型，並支援 `Isolate`（可讓 Dart 程式碼在另一個執行緒上運行）、事件迴圈（event loop）以及非同步程式設計。除非你建立了 `Isolate`，否則 Dart 程式碼會在主 UI 執行緒上運行，並由事件迴圈驅動。Flutter 的事件迴圈相當於 Android 的主 `Looper`——也就是附加在主執行緒上的 `Looper`。

Dart 的單執行緒模型並不代表你必須讓所有操作都成為阻塞（blocking）操作，導致 UI 停滯。與 Android 必須時時保持主執行緒空閒不同，在 Flutter 中，你可以善用 Dart 語言提供的非同步功能，例如 `async`/`await`，來執行非同步工作。如果你曾在 C#、JavaScript 或使用過 Kotlin 的 coroutine，應該對 `async`/`await` 這種程式設計模式不陌生。

舉例來說，你可以利用 `async`/`await` 來執行網路請求，讓 Dart 處理繁重的運算，而不會造成 UI 停頓：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final response = await http.get(dataURL);
  setState(() {
    widgets = (jsonDecode(response.body) as List)
        .cast<Map<String, Object?>>();
  });
}
```

當 `await` 的網路呼叫完成後，請透過呼叫 `setState()` 來更新 UI，這會觸發元件（Widget）子樹的重建並更新資料。

以下範例會以非同步方式載入資料，並顯示在 `ListView` 中：

<?code-excerpt "lib/async.dart"?>
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (context, position) {
          return getRow(position);
        },
      ),
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${widgets[i]["title"]}"),
    );
  }

  Future<void> loadData() async {
    final dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final response = await http.get(dataURL);
    setState(() {
      widgets = (jsonDecode(response.body) as List)
          .cast<Map<String, Object?>>();
    });
  }

}
```

如需在背景執行工作的更多資訊，以及 Flutter 與 Android 的差異，請參考下一節。

### 如何將工作移至背景執行緒？

在 Android 中，當你需要存取網路資源時，通常會將工作移到背景執行緒進行，以避免阻塞主執行緒並避免 ANR（應用程式無回應）。例如，你可能會使用 `AsyncTask`、`LiveData`、`IntentService`、`JobScheduler` 工作，或是搭配在背景執行緒運作的排程器（scheduler）的 RxJava pipeline。

由於 Flutter 採用單執行緒並運行事件迴圈（類似 Node.js），你不需要擔心執行緒管理或產生背景執行緒。如果你執行的是 I/O 密集型工作，例如磁碟存取或網路呼叫，那麼你可以安心地使用 `async`/`await`，這樣就可以了。另一方面，如果你需要執行會大量佔用 CPU 的運算密集型工作，則應該將其移至 `Isolate`，以避免阻塞事件迴圈，就像你會將任何類型的工作排除在 Android 主執行緒之外一樣。

對於 I/O 密集型工作，請將函式宣告為 `async` 函式，並在函式內對長時間執行的任務使用 `await`：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final response = await http.get(dataURL);
  setState(() {
    widgets = (jsonDecode(response.body) as List)
        .cast<Map<String, Object?>>();
  });
}
```

這通常是你進行網路或資料庫呼叫的方式，這兩者都是 I/O 操作。

在 Android 中，當你繼承 `AsyncTask` 時，通常會覆寫三個方法：`onPreExecute()`、`doInBackground()` 和 `onPostExecute()`。在 Flutter 中沒有對應的做法，因為你只需在長時間運行的函式上 `await`，Dart 的事件迴圈會自動處理其餘部分。

然而，有時你可能需要處理大量資料，導致 UI 停滯。在 Flutter 中，可以使用 `Isolate` 來善用多核心 CPU，執行長時間運算或計算密集型任務。

Isolate（隔離區）是獨立的執行緒，與主執行緒的記憶體堆完全不共享。這表示你無法存取主執行緒的變數，或透過呼叫 `setState()` 來更新 UI。與 Android 的執行緒不同，Isolate 如其名所示，無法共享記憶體（例如：靜態欄位）。

以下範例展示了如何在簡單的 Isolate 中，將資料傳回主執行緒以更新 UI。

<?code-excerpt "lib/isolates.dart (load-data)"?>
```dart
Future<void> loadData() async {
  ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message.
  SendPort sendPort = await receivePort.first as SendPort;

  final msg =
      await sendReceive(
            sendPort,
            'https://jsonplaceholder.typicode.com/posts',
          )
          as List<Object?>;
  final posts = msg.cast<Map<String, Object?>>();

  setState(() {
    widgets = posts;
  });
}

// The entry point for the isolate.
static Future<void> dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);

  await for (var msg in port) {
    String dataUrl = msg[0] as String;
    SendPort replyTo = msg[1] as SendPort;

    http.Response response = await http.get(Uri.parse(dataUrl));
    // Lots of JSON to parse
    replyTo.send(jsonDecode(response.body));
  }
}

Future<Object?> sendReceive(SendPort port, Object? msg) {
  ReceivePort response = ReceivePort();
  port.send([msg, response.sendPort]);
  return response.first;
}
```

這裡，`dataLoader()` 是在其自身獨立執行緒中運行的 `Isolate`。在該 isolate 中，你可以執行更耗費 CPU 的處理（例如解析大型 JSON），或進行計算密集型的數學運算，如加密或訊號處理。

你可以執行以下完整範例：

<?code-excerpt "lib/isolates.dart"?>
```dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Widget getBody() {
    bool showLoadingDialog = widgets.isEmpty;
    if (showLoadingDialog) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (context, position) {
        return getRow(position);
      },
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${widgets[i]["title"]}"),
    );
  }

  Future<void> loadData() async {
    ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message.
    SendPort sendPort = await receivePort.first as SendPort;

    final msg =
        await sendReceive(
              sendPort,
              'https://jsonplaceholder.typicode.com/posts',
            )
            as List<Object?>;
    final posts = msg.cast<Map<String, Object?>>();

    setState(() {
      widgets = posts;
    });
  }

  // The entry point for the isolate.
  static Future<void> dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (var msg in port) {
      String dataUrl = msg[0] as String;
      SendPort replyTo = msg[1] as SendPort;

      http.Response response = await http.get(Uri.parse(dataUrl));
      // Lots of JSON to parse
      replyTo.send(jsonDecode(response.body));
    }
  }

  Future<Object?> sendReceive(SendPort port, Object? msg) {
    ReceivePort response = ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }

}
```

### Flutter 中對應 OkHttp 的是什麼？

在 Flutter 中進行網路呼叫非常簡單，只要使用熱門的 [`http` 套件][`http` package] 即可。

雖然 http 套件沒有 OkHttp 所有的功能，但它幫你抽象化了許多原本需要自行實作的網路處理細節，讓你可以更簡單地進行網路呼叫。

要將 `http` 套件加入為相依套件，只需執行 `flutter pub add`：

```console
$ flutter pub add http
```

要進行網路呼叫時，請在 `async` 函式 `http.get()` 上呼叫 `await`：

<?code-excerpt "lib/network.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:http/http.dart' as http;

Future<void> loadData() async {
  var dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  http.Response response = await http.get(dataURL);
  developer.log(response.body);
}
```

### 如何顯示長時間執行任務的進度？

在 Android 中，你通常會在 UI 中顯示 `ProgressBar`，同時在背景執行緒上執行長時間任務。

在 Flutter 中，請使用 `ProgressIndicator` 元件（Widget）。
你可以透過布林旗標來控制何時渲染進度條，從而以程式方式顯示進度。在長時間任務開始前，通知 Flutter 更新其狀態來顯示進度條，任務結束後則隱藏它。

在以下範例中，`build` 函式被拆分為三個不同的函式。如果 `showLoadingDialog` 為 `true`（當 `widgets.isEmpty` 時），則渲染 `ProgressIndicator`。否則，則以從網路呼叫取得的資料渲染 `ListView`。

<?code-excerpt "lib/progress.dart"?>
```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Widget getBody() {
    bool showLoadingDialog = widgets.isEmpty;
    if (showLoadingDialog) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (context, position) {
        return getRow(position);
      },
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${widgets[i]["title"]}"),
    );
  }

  Future<void> loadData() async {
    final dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final response = await http.get(dataURL);
    setState(() {
      widgets = (jsonDecode(response.body) as List)
          .cast<Map<String, Object?>>();
    });
  }
}
```

## 專案結構與資源

### 要將解析度相關的圖片檔案存放在哪裡？

在 Android 中，資源（resources）與資產（assets）是不同的項目，
而在 Flutter 應用程式中，只有資源（Assets）。
所有原本在 Android 的 `res/drawable-*` 資料夾中的資源，
在 Flutter 中都放在 assets 資料夾下。

Flutter 採用類似 iOS 的簡單密度（density）格式。
資源可以是 `1.0x`、`2.0x`、`3.0x` 或其他任意倍數。
Flutter 沒有 `dp`，但有邏輯像素（logical pixels），
基本上等同於裝置獨立像素（device-independent pixels）。
Flutter 的 [`devicePixelRatio`][] 表示單一邏輯像素中所包含的實體像素比率。

對應於 Android 密度分組（density buckets）的關係如下：

 Android 密度限定詞 | Flutter 像素比率
 --- | ---
 `ldpi` | `0.75x`
 `mdpi` | `1.0x`
 `hdpi` | `1.5x`
 `xhdpi` | `2.0x`
 `xxhdpi` | `3.0x`
 `xxxhdpi` | `4.0x`

資源可以放在任意資料夾&mdash;Flutter 沒有預設的資料夾結構。
你需要在 `pubspec.yaml` 檔案中宣告資源（包含路徑），Flutter 會自動載入。

存放在原生 asset 資料夾的資源，
可以透過 Android 的 `AssetManager` 在原生端存取：

```kotlin
val flutterAssetStream = assetManager.open("flutter_assets/assets/my_flutter_asset.png")
```

Flutter 無法存取原生資源或資產（Assets）。

舉例來說，若要在我們的 Flutter 專案中新增一個名為 `my_icon.png` 的圖片資源（image asset），並決定將其放在一個我們隨意命名為 `images` 的資料夾中，你應該將基礎圖片（1.0x）放在 `images` 資料夾內，其他不同倍率的變體則放在以相對應倍率命名的子資料夾中：

```plaintext
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

接下來，你需要在 `pubspec.yaml` 檔案中宣告這些圖片：

```yaml
assets:
 - images/my_icon.png
```

然後你可以使用 `AssetImage` 來存取你的圖片：

<?code-excerpt "lib/images.dart (asset-image)"?>
```dart
AssetImage('images/my_icon.png'),
```

或直接在 `Image` 元件（Widget）中使用：

<?code-excerpt "lib/images.dart (image-asset)"?>
```dart
@override
Widget build(BuildContext context) {
  return Image.asset('images/my_image.png');
}
```

### 我應該將字串存放在哪裡？要如何處理在地化（localization）？

Flutter 目前尚未提供專門用於字串的類似資源（resources）的系統。
最佳且推薦的做法是將你的字串以 key-value 配對的方式，存放在 `.arb` 檔案中。例如：

<?code-excerpt "lib/arb_examples.arb"?>
```json
{
   "@@locale": "en",
   "hello":"Hello {userName}",
   "@hello":{
      "description":"A message with a single parameter",
      "placeholders":{
         "userName":{
            "type":"String",
            "example":"Bob"
         }
      }
   }
}
```

然後在你的程式碼中，你可以這樣存取你的字串：

<?code-excerpt "lib/localization_examples.dart (access-string)"?>
```dart
Text(AppLocalizations.of(context)!.hello('John'));
```

更多相關資訊請參見 [Internationalizing Flutter apps][]。

### Gradle 檔案的對應物是什麼？我要如何新增相依套件？

在 Android 中，你會透過編輯 Gradle build script 來加入相依套件。
Flutter 則使用 Dart 自己的建置系統與 Pub 套件管理工具。
這些工具會將原生 Android 與 iOS 包裝應用程式的建置工作交由各自的平台建置系統處理。

雖然在你的 Flutter 專案中的 `android` 資料夾下會有 Gradle 檔案，
但只有在你需要加入每個平台整合所需的原生相依套件時才需要編輯這些檔案。
一般來說，請使用 `pubspec.yaml` 來宣告 Flutter 所需的外部相依套件。
你可以在 [pub.dev][] 找到許多優質的 Flutter 套件。

## Activities 與 fragments

### Flutter 中對應 activities 與 fragments 的概念是什麼？

在 Android 中，`Activity` 代表使用者可以執行的單一聚焦操作。
`Fragment` 則代表一個行為或使用者介面的一部分。
Fragments 可以幫助你模組化程式碼、組合大型螢幕的複雜 UI，並協助應用程式 UI 的擴展。
在 Flutter 中，這兩個概念都屬於 `Widget` 的範疇。

想進一步了解如何在 Flutter 中建立 Activities 與 Fragments 的 UI，請參考社群貢獻的文章：
[Flutter for Android Developers: How to design Activity UI in Flutter][]。

如同在 [Intents][] 章節所提到，
Flutter 中的螢幕是由 `Widget` 來表示，因為在 Flutter 裡一切皆為元件（Widget）。
你可以使用 `Navigator` 在不同的 `Route` 之間切換，
這些 `Route` 可能代表不同的螢幕、頁面，或是相同資料的不同狀態或呈現方式。

### 我要如何監聽 Android activity 的生命週期事件？

在 Android 中，你可以覆寫 `Activity` 的方法來捕捉 activity 本身的生命週期事件，
或是在 `Application` 上註冊 `ActivityLifecycleCallbacks`。
在 Flutter 中，這兩個概念都不存在，但你可以透過註冊 `WidgetsBinding` 觀察者並監聽 `didChangeAppLifecycleState()` 變更事件來監聽生命週期。

可觀察的生命週期事件包括：

* `detached` — 應用程式仍然託管於 flutter engine 上，但已經與任何主機視圖分離。
* `inactive` — 應用程式處於非活動狀態，且不會接收使用者輸入。
* `paused` — 應用程式目前對使用者不可見、不回應使用者輸入，並在背景執行。
  這相當於 Android 中的 `onPause()`。
* `resumed` — 應用程式可見且正在回應使用者輸入。
  這相當於 Android 中的 `onPostResume()`。

關於這些狀態的詳細說明，請參見
[`AppLifecycleStatus` 文件][`AppLifecycleStatus` documentation]。

你可能已經注意到，只有極少數的 Activity 生命週期事件可以被監聽；
雖然 `FlutterActivity` 會在內部捕捉幾乎所有的 activity 生命週期事件並傳遞給 Flutter engine，
但這些事件大多被 Flutter 隔離起來。
Flutter 會自動為你處理 engine 的啟動與停止，
在大多數情況下，你不太需要在 Flutter 端觀察 activity 的生命週期。
如果你需要根據生命週期取得或釋放原生資源，建議還是在原生端處理。

以下是一個觀察所屬 activity 生命週期狀態的範例：

<?code-excerpt "lib/lifecycle.dart"?>
```dart
import 'package:flutter/widgets.dart';

class LifecycleWatcher extends StatefulWidget {
  const LifecycleWatcher({super.key});

  @override
  State<LifecycleWatcher> createState() => _LifecycleWatcherState();
}

class _LifecycleWatcherState extends State<LifecycleWatcher>
    with WidgetsBindingObserver {
  AppLifecycleState? _lastLifecycleState;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecycleState = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_lastLifecycleState == null) {
      return const Text(
        'This widget has not observed any lifecycle changes.',
        textDirection: TextDirection.ltr,
      );
    }

    return Text(
      'The most recent lifecycle state this widget observed was: $_lastLifecycleState.',
      textDirection: TextDirection.ltr,
    );
  }
}

void main() {
  runApp(const Center(child: LifecycleWatcher()));
}
```

## 版面配置（Layouts）

### LinearLayout 的對應元件是什麼？

在 Android 中，LinearLayout 用來將你的元件（Widgets）以線性方式排列——可以是水平或垂直方向。在 Flutter 中，可以使用 Row 或 Column 元件（Widgets）來達到相同的效果。

你會發現下面的兩個程式碼範例除了「Row」與「Column」元件外，其餘部分完全相同。`children` 清單也是一樣，這個特性可以被善加利用，讓你能夠用相同的 `children` 清單，隨著需求變化靈活開發豐富的版面配置。

<?code-excerpt "lib/layout.dart (row)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

<?code-excerpt "lib/layout.dart (column)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Column One'),
      Text('Column Two'),
      Text('Column Three'),
      Text('Column Four'),
    ],
  );
}
```

想進一步了解如何建立線性版面配置（Linear Layout），請參考社群貢獻的 Medium 文章
[Flutter for Android Developers: How to design LinearLayout in Flutter][]。

### RelativeLayout 的對應元件是什麼？

RelativeLayout 會根據元件彼此之間的相對位置來排列元件。在 Flutter 中，有幾種方式可以達到相同的效果。

你可以透過組合 Column、Row 和 Stack 等版面配置元件（Layout widgets）來實現 RelativeLayout 的效果。你可以在這些元件的建構子中，指定子元件（children）如何相對於父元件排列的規則。

若想參考在 Flutter 中建立 RelativeLayout 的實作範例，請見 Collin 在 [StackOverflow][] 上的回答。

### ScrollView 的對應元件是什麼？

在 Android 中，當你的內容超過裝置螢幕大小時，會使用 ScrollView 來排列元件，讓使用者可以捲動檢視。

在 Flutter 中，最簡單的做法是使用 ListView 元件（ListView widget）。這對於 Android 開發者來說可能有點大材小用，但在 Flutter 裡，ListView 元件同時具備 ScrollView 和 Android ListView 的功能。

<?code-excerpt "lib/layout.dart (list-view)"?>
```dart
@override
Widget build(BuildContext context) {
  return ListView(
    children: const <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

### 如何在 Flutter 中處理橫向（landscape）螢幕切換？

當 AndroidManifest.xml 包含以下設定時，FlutterView 會自動處理組態變更（config change）：

```yaml
android:configChanges="orientation|screenSize"
```

## 手勢偵測與觸控事件處理

### 如何在 Flutter 中為元件（Widget）加入 onClick 監聽器？

在 Android 中，你可以透過呼叫 `setOnClickListener` 方法，將 onClick 綁定到像按鈕這類的 view 上。

在 Flutter 中，新增觸控監聽器有兩種方式：

 1. 如果該元件（Widget）本身支援事件偵測，可以直接傳入一個函式，並在該函式中處理事件。例如，ElevatedButton 有一個 `onPressed` 參數：

  <?code-excerpt "lib/events.dart (on-pressed)"?>
  ```dart
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        developer.log('click');
      },
      child: const Text('Button'),
    );
  }
  ```

 2. 如果該元件（Widget）不支援事件偵測，可以將該元件包裹在 `GestureDetector` 中，並將函式傳遞給 `onTap` 參數。

  <?code-excerpt "lib/events.dart (on-tap)"?>
  ```dart
  class SampleTapApp extends StatelessWidget {
    const SampleTapApp({super.key});
  
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        body: Center(
          child: GestureDetector(
            onTap: () {
              developer.log('tap');
            },
            child: const FlutterLogo(size: 200),
          ),
        ),
      );
    }
  }
  ```

### 如何在元件（Widgets）上處理其他手勢？

使用 GestureDetector，你可以監聽各種手勢（Gestures），例如：

* 點擊（Tap）

  * `onTapDown` - 可能會觸發點擊的指標已在特定位置接觸螢幕。
  * `onTapUp` - 觸發點擊的指標已在特定位置停止接觸螢幕。
  * `onTap` - 點擊事件已發生。
  * `onTapCancel` - 先前觸發 `onTapDown` 的指標將不會造成點擊。

* 雙擊（Double tap）

  * `onDoubleTap` - 使用者在同一位置快速連續點擊螢幕兩次。

* 長按（Long press）

  * `onLongPress` - 指標在同一位置長時間接觸螢幕。

* 垂直拖曳（Vertical drag）

  * `onVerticalDragStart` - 指標已接觸螢幕，可能開始進行垂直移動。
  * `onVerticalDragUpdate` - 與螢幕接觸的指標已在垂直方向上進一步移動。
  * `onVerticalDragEnd` - 先前與螢幕接觸並垂直移動的指標已不再接觸螢幕，且在離開時具有特定速度。

* 水平拖曳（Horizontal drag）

  * `onHorizontalDragStart` - 指標已接觸螢幕，可能開始進行水平方向移動。
  * `onHorizontalDragUpdate` - 與螢幕接觸的指標已在水平方向上進一步移動。
  * `onHorizontalDragEnd` - 先前與螢幕接觸並水平方向移動的指標已不再接觸螢幕，且在離開時具有特定速度。

以下範例展示了一個 `GestureDetector`，
當雙擊時會旋轉 Flutter 標誌：

<?code-excerpt "lib/events.dart (sample-app)"?>
```dart
class SampleApp extends StatefulWidget {
  const SampleApp({super.key});

  @override
  State<SampleApp> createState() => _SampleAppState();
}

class _SampleAppState extends State<SampleApp>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: GestureDetector(
          onDoubleTap: () {
            if (controller.isCompleted) {
              controller.reverse();
            } else {
              controller.forward();
            }
          },
          child: RotationTransition(
            turns: curve,
            child: const FlutterLogo(size: 200),
          ),
        ),
      ),
    );
  }
}
```

## ListView 與 Adapter

### Flutter 中有什麼可以替代 ListView 的元件？

在 Flutter 中，對應於 Android 的 ListView 的元件就是 ListView！

在 Android 的 ListView 中，你需要建立一個 adapter，並將其傳入 ListView，ListView 會根據你的 adapter 回傳的內容來渲染（render）每一列。不過，你必須確保回收（recycle）你的列，否則很容易出現各種奇怪的視覺錯誤和記憶體問題。

由於 Flutter 採用不可變元件（immutable widget）模式，你只需將一個元件（Widget）清單傳給 ListView，Flutter 會自動處理，確保捲動時的流暢與順暢。

<?code-excerpt "lib/listview.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }

  List<Widget> _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(
        Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
      );
    }
    return widgets;
  }
}
```

### 如何知道點擊了哪個清單項目？

在 Android 中，ListView 有一個方法可以得知被點擊的項目，稱為 `onItemClickListener`。
在 Flutter 中，請使用傳入元件（Widgets）所提供的觸控處理功能。

<?code-excerpt "lib/list_item_tapped.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }

  List<Widget> _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(
        GestureDetector(
          onTap: () {
            developer.log('row tapped');
          },
          child: Padding(
            padding: const EdgeInsets.all(10),
            child: Text('Row $i'),
          ),
        ),
      );
    }
    return widgets;
  }
}
```

### 如何動態更新 ListView？

在 Android 中，你會更新 adapter 並呼叫 `notifyDataSetChanged`。

在 Flutter 中，如果你嘗試在 `setState()` 內部更新元件（Widgets）清單，你會很快發現畫面上的資料並沒有發生變化。這是因為當呼叫 `setState()` 時，Flutter 的渲染（render）引擎會檢查元件樹（widget tree）是否有任何變動。當它走訪到你的 `ListView` 時，會執行 `==` 檢查，並判斷兩個 `ListView` 是相同的。既然沒有變化，就不需要更新。

如果你想用簡單的方式來更新 `ListView`，可以在 `setState()` 內建立一個新的 `List`，然後將舊清單的資料複製到新清單。雖然這種做法簡單，但不建議用於大型資料集，下一個範例會說明原因。

<?code-excerpt "lib/listview_dynamic.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: widgets),
    );
  }

  Widget getRow(int i) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets = List.from(widgets);
          widgets.add(getRow(widgets.length));
          developer.log('row $i');
        });
      },
      child: Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
    );
  }
}
```

建議且高效的清單建立方式是使用 `ListView.Builder`。當你有動態的 `List` 或是包含大量資料的 `List` 時，這種方法特別適合。這本質上等同於 Android 上的 RecyclerView，會自動幫你回收清單元素：

<?code-excerpt "lib/listview_builder.dart"?>
```dart
import 'dart:developer' as developer;

import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (context, position) {
          return getRow(position);
        },
      ),
    );
  }

  Widget getRow(int i) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length));
          developer.log('row $i');
        });
      },
      child: Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
    );
  }
}
```

與其建立一個 "ListView"，不如建立一個
`ListView.builder`，它接收兩個主要參數：清單的初始長度，以及一個 `ItemBuilder` 函式。

`ItemBuilder` 函式類似於 Android adapter 中的 `getView`
函式；它接收一個位置（position），並回傳你希望在該位置渲染的列（row）。

最後，也是最重要的一點，請注意 `onTap()` 函式
不再重新建立清單，而是對其進行 `.add`。

## 處理文字

### 如何在我的文字元件 (Text Widgets) 上設定自訂字型？

在 Android SDK（自 Android O 起），你會建立一個 Font 資源檔，
並將其傳入 TextView 的 FontFamily 參數。

在 Flutter 中，將字型檔案放在一個資料夾中，並在
`pubspec.yaml` 檔案中引用它，這與匯入圖片的方式類似。

```yaml
fonts:
   - family: MyCustomFont
     fonts:
       - asset: fonts/MyCustomFont.ttf
       - style: italic
```

然後將該字型指派給你的 `Text` 元件（Widget）：

<?code-excerpt "lib/text.dart (custom-font)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: const Center(
      child: Text(
        'This is a custom font text',
        style: TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
```

### 如何為我的文字元件 (Text Widgets) 設定樣式？

除了字型之外，你還可以自訂 `Text` 元件的其他樣式元素。
`Text` 元件的 style 參數接受一個 `TextStyle` 物件，你可以在其中自訂許多參數，例如：

* color
* decoration
* decorationColor
* decorationStyle
* fontFamily
* fontSize
* fontStyle
* fontWeight
* hashCode
* height
* inherit
* letterSpacing
* textBaseline
* wordSpacing

## 表單輸入

如需更多有關使用表單 (Forms) 的資訊，請參閱 [Retrieve the value of a text field][]。

### 在 Input 上的 "hint" 對應 Flutter 的什麼？

在 Flutter 中，你可以很容易地透過在 Text Widget 的 decoration 建構子參數中加入 `InputDecoration` 物件，來顯示 "hint" 或預設提示文字。

<?code-excerpt "lib/form.dart (input-hint)" replace="/return const //g;/;//g"?>
```dart
Center(
  child: TextField(decoration: InputDecoration(hintText: 'This is a hint')),
)
```

### 如何顯示驗證錯誤？

就像你為「提示」(hint) 所做的一樣，將一個 `InputDecoration` 物件傳遞給 `Text` 元件（Text Widget）的 `decoration` 建構子。

然而，你不會一開始就顯示錯誤訊息。相反地，當使用者輸入了無效資料時，更新狀態，並傳遞一個新的 `InputDecoration` 物件。

<?code-excerpt "lib/validation_errors.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String? _errorText;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: Center(
        child: TextField(
          onSubmitted: (text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: InputDecoration(
            hintText: 'This is a hint',
            errorText: _getErrorText(),
          ),
        ),
      ),
    );
  }

  String? _getErrorText() {
    return _errorText;
  }

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|'
        r'(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
        r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }
}
```


## Flutter 插件

### 如何存取 GPS 感測器？

請使用 [`geolocator`][] 社群插件。

### 如何存取相機？

[`image_picker`][] 插件是存取相機時常用的選擇。

### 如何使用 Facebook 登入？

要使用 Facebook 登入，請使用
[`flutter_facebook_login`][] 社群插件。

### 如何使用 Firebase 功能？

大多數 Firebase 功能都由
[官方插件][first party plugins] 支援。
這些插件是由 Flutter 團隊維護的官方整合：

 * [`google_mobile_ads`][]：Google Mobile Ads for Flutter
 * [`firebase_analytics`][]：Firebase Analytics
 * [`firebase_auth`][]：Firebase Auth
 * [`firebase_database`][]：Firebase RTDB
 * [`firebase_storage`][]：Firebase Cloud Storage
 * [`firebase_messaging`][]：Firebase Messaging (FCM)
 * [`flutter_firebase_ui`][]：快速整合 Firebase Auth
   （Facebook、Google、Twitter 及 Email）
 * [`cloud_firestore`][]：Firebase Cloud Firestore

你也可以在 pub.dev 上找到一些第三方 Firebase 插件，用於補足官方插件尚未涵蓋的領域。

### 如何建立自訂的原生整合？

如果有 Flutter 或其社群插件尚未支援的平台專屬功能，
你可以依照
[開發套件與插件][developing packages and plugins] 頁面說明自行建立。

簡單來說，Flutter 的插件架構類似於 Android 的事件匯流排（Event bus）：你發送一個訊息，讓接收端處理後再回傳結果。在這裡，接收端是執行於 Android 或 iOS 原生端的程式碼。

### 如何在 Flutter 應用程式中使用 NDK？

如果你在現有的 Android 應用程式中使用 NDK，並希望 Flutter 應用程式也能利用你的原生函式庫，可以透過建立自訂插件來實現。

你的自訂插件會先與 Android 應用程式溝通，並透過 JNI 呼叫你的
`native` 函式。當取得回應後，
再將訊息傳回 Flutter 並呈現結果。

目前 Flutter 尚不支援直接從 Flutter 呼叫原生程式碼。

## 主題（Themes）

### 如何為我的應用程式設計主題？

Flutter 預設提供精美的 Material Design 實作，能滿足大多數樣式與主題化（theming）需求。不同於 Android 需在 XML 宣告主題並於 AndroidManifest.xml 指定，Flutter 則是在頂層元件（Widget）宣告主題。

若要充分利用 Material 元件（Material Components），你可以將頂層元件設為 `MaterialApp`，作為應用程式的進入點。MaterialApp 是一個便利元件，包裝了多個常用於 Material Design 應用程式的元件，並在 WidgetsApp 基礎上加入 Material 專屬功能。

你也可以使用 `WidgetsApp` 作為應用程式元件，這會提供部分相同功能，但不如 `MaterialApp` 豐富。

若要自訂子元件的顏色和樣式，請將 `ThemeData` 物件傳入 `MaterialApp` 元件。例如，下方程式碼將主色調設為 deepPurple，並將文字選取顏色設為紅色。

<?code-excerpt "lib/theme.dart (theme)"?>
```dart
import 'package:flutter/material.dart';

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

## 主畫面元件 (Homescreen widgets)

### 如何建立主畫面元件？

Android 主畫面元件（Homescreen widgets）無法完全使用 Flutter 建立。必須使用 Jetpack Glance（建議方式）或 XML 版面配置程式碼。透過第三方套件 [home_widget][]，你可以將主畫面元件與 Dart 程式碼連接，將 Flutter 元件（以圖片形式）嵌入至宿主元件，並實現 Flutter 與主畫面元件之間的資料共享。

為了提供更豐富且更具吸引力的體驗，建議在元件選擇器中加入元件預覽。對於運行 Android 15 及以上版本的裝置，系統會產生元件預覽，讓使用者能夠看到目標元件的動態且個人化版本，預先瞭解其實際在主畫面上的顯示效果。關於產生式元件預覽（Generated Widget Previews）以及舊裝置的備用方案，請參考 [Add generated previews to your widget picker][] 文件頁面。


## 資料庫與本機儲存

### 如何存取 Shared Preferences？

在 Android 中，你可以使用 SharedPreferences API 儲存一小組鍵值對資料。

在 Flutter 中，可以透過 [Shared_Preferences plugin][] 存取這項功能。
此套件同時包裝了 Shared Preferences 與 NSUserDefaults（iOS 的對應功能）。

<?code-excerpt "lib/shared_prefs.dart"?>
```dart
import 'dart:async';
import 'package:flutter/material.dart';

import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Center(
          child: ElevatedButton(
            onPressed: _incrementCounter,
            child: Text('Increment Counter'),
          ),
        ),
      ),
    ),
  );
}

Future<void> _incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  await prefs.setInt('counter', counter);
}
```

### 如何在 Flutter 中存取 SQLite？

在 Android 中，你可以使用 SQLite 來儲存結構化資料，並透過 SQL 進行查詢。

在 Flutter 中，無論是 macOS、Android 或 iOS，皆可透過 [SQFlite][] 套件來存取這項功能。

## 除錯

### 我可以使用哪些工具來除錯我的 Flutter 應用程式？

你可以使用 [DevTools][] 工具組來除錯 Flutter 或 Dart 應用程式。

DevTools 提供效能分析、堆積檢查、元件樹（widget tree）檢視、診斷日誌、除錯、觀察已執行的程式碼行、記憶體洩漏與記憶體碎片化偵測等功能。更多資訊請參考 [DevTools][] 文件。

## 通知

### 如何設定推播通知（Push Notifications）？

在 Android 中，你可以使用 Firebase Cloud Messaging 來為應用程式設定推播通知。

在 Flutter 中，則可透過 [Firebase Messaging][] 套件來實現相同功能。若需進一步瞭解如何使用 Firebase Cloud Messaging API，請參考 [`firebase_messaging`][] 套件文件。

[Flutter for Jetpack Compose devs]: /flutter-for/compose-devs
[Add Flutter to existing app]: /add-to-app
[Animation & Motion widgets]: /ui/widgets/animation
[Animations tutorial]: /ui/animations/tutorial
[Animations overview]: /ui/animations
[`AppLifecycleStatus` documentation]: https://api.flutter.dev/flutter/dart-ui/AppLifecycleState.html
[Apple's iOS design language]: https://developer.apple.com/design/resources/
[`cloud_firestore`]: https://pub.dev/packages/cloud_firestore
[composing]: /resources/architectural-overview#composition
[Cupertino widgets]: /ui/widgets/cupertino
[developing packages and plugins]: /packages-and-plugins/developing-packages
[`devicePixelRatio`]: https://api.flutter.dev/flutter/dart-ui/FlutterView/devicePixelRatio.html
[DevTools]: /tools/devtools
[existing plugin]: https://pub.dev/flutter/
[`flutter_facebook_login`]: https://pub.dev/packages/flutter_facebook_login
[`google_mobile_ads`]: https://pub.dev/packages/google_mobile_ads
[`firebase_analytics`]: https://pub.dev/packages/firebase_analytics
[`firebase_auth`]: https://pub.dev/packages/firebase_auth
[`firebase_database`]: https://pub.dev/packages/firebase_database
[`firebase_messaging`]: https://pub.dev/packages/firebase_messaging
[`firebase_storage`]: https://pub.dev/packages/firebase_storage
[`flutter_firebase_ui`]: https://pub.dev/packages/flutter_firebase_ui
[Firebase Messaging]: https://github.com/firebase/flutterfire/tree/master/packages/firebase_messaging
[first party plugins]: https://pub.dev/flutter/packages?q=firebase
[Flutter for Android Developers: How to design LinearLayout in Flutter]: https://proandroiddev.com/flutter-for-android-developers-how-to-design-linearlayout-in-flutter-5d819c0ddf1a
[Flutter for Android Developers: How to design Activity UI in Flutter]: https://burhanrashid52.com/flutter-for-android-developers-how-to-design-activity-ui-in-flutter/
[`geolocator`]: https://pub.dev/packages/geolocator
[`http` package]: https://pub.dev/packages/http
[`image_picker`]: https://pub.dev/packages/image_picker
[Intents]: #flutter-中有什麼可以對應-intent-的概念
[intl package]: https://pub.dev/packages/intl
[Introduction to declarative UI]: /flutter-for/declarative
[Material Components]: https://m3.material.io/develop/flutter
[Material Design guidelines]: https://m3.material.io/styles
[optimized for all platforms]: https://m3.material.io/develop
[a plugin]: https://pub.dev/packages/android_intent
[pub.dev]: https://pub.dev/flutter/packages/
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[Shared_Preferences plugin]: https://pub.dev/packages/shared_preferences
[SQFlite]: https://pub.dev/packages/sqflite
[StackOverflow]: https://stackoverflow.com/questions/44396075/equivalent-of-relativelayout-in-flutter
[widget catalog]: /ui/widgets/layout
[Internationalizing Flutter apps]: /ui/internationalization
[home_widget]: https://pub.dev/packages/home_widget
[Add generated previews to your widget picker]: https://developer.android.com/develop/ui/compose/glance/generated-previews

