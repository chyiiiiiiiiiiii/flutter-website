---
title: Flutter for UIKit 開發者
description: 學習如何將 iOS 與 UIKit 開發經驗應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/ios_devs"?>

具備 UIKit 開發經驗的 iOS 開發者，
若想使用 Flutter 開發行動應用程式，
建議閱讀本指南。
本指南將說明如何將現有的 UIKit 知識應用於 Flutter。

:::note
如果你有使用 SwiftUI 開發應用程式的經驗，
請參考 [Flutter for SwiftUI developers][Flutter for SwiftUI developers]。
:::

Flutter 是一個用於建構跨平台應用程式的框架，
採用 Dart 程式語言。
若想了解 Dart 與 Swift 在程式設計上的差異，
可參考 [Learning Dart as a Swift Developer][Learning Dart as a Swift Developer]
以及 [Flutter concurrency for Swift developers][Flutter concurrency for Swift developers]。

你在 iOS 與 UIKit 上的知識與經驗，
在使用 Flutter 開發時同樣非常有價值。
{% comment %}
  TODO: Add talk about plugin system for interacting with OS and hardware
  when [iOS and Apple hardware interactions with Flutter][iOS and Apple hardware interactions with Flutter] is released.
{% endcomment -%}

Flutter 也針對在 iOS 執行時的應用程式行為做了多項調整。
想了解詳情，請參閱 [Platform adaptations][Platform adaptations]。

:::tip
若要將 Flutter 程式碼整合至**現有**的 iOS 應用程式中，
請參考 [Add Flutter to existing app][Add Flutter to existing app]。
:::

請將本指南視為一本食譜，
可依需求跳閱，尋找最符合你需求的解答。

## 概覽

作為入門，請觀看以下影片。
影片將說明 Flutter 在 iOS 上的運作方式，以及如何使用 Flutter 開發 iOS 應用程式。

{% ytEmbed 'ceMsPBbcEGg', 'Flutter for iOS developers', true %}

### Views vs. Widgets

:::secondary
React 風格或稱_宣告式_（declarative）的程式設計，
與傳統的命令式（imperative）程式設計有何不同？
如需比較，請參閱 [Introduction to declarative UI][Introduction to declarative UI]。
:::

在 UIKit 中，你建立 UI 大多是透過視圖物件，
也就是 `UIView` 類別的實例。
這些視圖可以作為其他 `UIView` 類別的容器，
共同組成你的版面配置。

在 Flutter 中，與 `UIView` 大致相當的概念是 `Widget`。
元件（Widgets）並不完全等同於 iOS 的 views，
但在熟悉 Flutter 運作方式時，
你可以將它們視為「宣告與建構 UI 的方式」。

然而，這兩者與 `UIView` 仍有一些差異。
首先，元件（Widgets）有不同的生命週期：它們是不可變的，
僅存在於需要變更之前。
每當元件或其狀態發生變化時，
Flutter 框架會建立一個新的元件樹。
相比之下，UIKit 的 view 在變更時並不會被重新建立，
而是作為可變的實體，只會在使用 `setNeedsDisplay()` 使其失效後才重新繪製。

此外，不同於 `UIView`，Flutter 的元件（Widgets）非常輕量，
部分原因是它們的不可變特性。
因為元件本身並不是 view，
也不直接負責繪製任何內容，
而是作為 UI 及其語意的描述，
最終會在底層「展開」成實際的視圖物件。

Flutter 內建了 [Material Components][Material Components] 函式庫，
這些元件實作了
[Material Design 指南][Material Design guidelines]。
Material Design 是一套彈性的設計系統，
[針對所有平台最佳化][optimized for all platforms]，包含 iOS。

但 Flutter 本身足夠靈活且具表現力，
可以實現任何設計語言。
在 iOS 上，你可以使用 [Cupertino 元件 (Widgets)][Cupertino widgets]
函式庫，打造外觀符合
[Apple 的 iOS 設計語言][Apple's iOS design language] 的介面。

### 更新元件（Widgets）

在 UIKit 中，若要更新視圖，你會直接修改它們。
在 Flutter 中，元件（Widgets）是不可變的，不能直接更新。
你需要操作的是元件的狀態（state）。

這就是 Stateful 與 Stateless 元件（Widgets）概念的由來。
`StatelessWidget` 顧名思義，
就是沒有任何狀態的元件。

`StatelessWidgets` 適用於你要描述的 UI 部分，
只依賴元件初始設定資訊，不會因其他因素而改變。

舉例來說，在 UIKit 中，這類情境就像放置一個 `UIImageView`，
並將你的 logo 設為 `image`。如果 logo 在執行期間不會變動，
那麼在 Flutter 中就可以使用 `StatelessWidget`。

如果你希望根據 HTTP 請求取得的資料動態改變 UI，
則應使用 `StatefulWidget`。
當 HTTP 請求完成後，需通知 Flutter 框架
該元件的 `State` 已更新，讓 UI 能隨之變更。

無狀態與有狀態元件（Widgets）最重要的差異在於，
`StatefulWidget` 會擁有一個 `State` 物件，
用來儲存狀態資料，並在元件樹重建時保留這些資料，
不會遺失。

如果你不確定該用哪一種，請記住這個原則：
如果元件會在 `build` 方法之外發生變化
（例如因為執行期間的使用者互動），
那就是有狀態元件。
如果元件在建立後就不會再變動，則是無狀態元件。
不過，即使某個元件是有狀態的，
其父元件只要本身不會響應這些變化（或其他輸入），
仍然可以是無狀態元件。

以下範例展示如何使用 `StatelessWidget`。
一個常見的 `StatelessWidget` 是 `Text` 元件。
如果你查看 `Text` 元件的實作，
會發現它是繼承自 `StatelessWidget`。

<?code-excerpt "lib/text_widget.dart (text-widget)" replace="/return const //g"?>
```dart
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

如果你查看上面的程式碼，可能會注意到`Text`元件（Widget）本身並沒有帶有任何明確的狀態。它只會渲染在其建構函式中傳入的內容，除此之外沒有其他行為。

但如果你想讓「I Like Flutter」這段文字能夠動態改變，例如當點擊`FloatingActionButton`時該怎麼辦？

要實現這個功能，可以將`Text`元件包裹在`StatefulWidget`中，並在使用者點擊按鈕時進行更新。

舉例如下：

<?code-excerpt "lib/text_widget.dart (stateful-widget)"?>
```dart

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
  String textToShow = 'I Like Flutter';

  void _updateText() {
    setState(() {
      // Update the text
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

### 元件（Widget）版面配置

在 UIKit 中，你可能會使用 Storyboard 檔案來組織你的視圖並設定約束（constraints），
或者你也可以在 view controller 中以程式方式設定約束。
在 Flutter 中，則是透過組合元件樹（widget tree）在程式碼中宣告你的版面配置。

以下範例展示如何顯示一個帶有內距（padding）的簡單元件：

<?code-excerpt "lib/layout.dart (simple-widget)"?>
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: const Text('Sample App')),
    body: Center(
      child: CupertinoButton(
        onPressed: () {},
        padding: const EdgeInsets.only(left: 10, right: 10),
        child: const Text('Hello'),
      ),
    ),
  );
}
```

你可以為任何元件（Widget）新增內距（padding），這類似於 iOS 中 constraints 的功能。

你可以在 [widget catalog][widget catalog] 中查看 Flutter 提供的各種版面配置元件（Layout widgets）。

### 移除元件（Widgets）

在 UIKit 中，你可以在父視圖上呼叫 `addSubview()`，或在子視圖上呼叫 `removeFromSuperview()`，以動態新增或移除子視圖。在 Flutter 中，由於元件（Widgets）是不可變的，因此沒有直接對應 `addSubview()` 的方法。取而代之的是，你可以傳遞一個函式給父元件，該函式會回傳一個元件，並透過布林旗標來控制該子元件的建立。

以下範例展示了當使用者點擊 `FloatingActionButton` 時，如何在兩個元件之間切換顯示：

<?code-excerpt "lib/layout.dart (toggle-widget)"?>
```dart
class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
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
    }

    return CupertinoButton(onPressed: () {}, child: const Text('Toggle Two'));
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

### 動畫 (Animation)

在 UIKit 中，你可以透過在 view 上呼叫 `animate(withDuration:animations:)` 方法來建立動畫 (Animation)。
在 Flutter 中，則使用動畫函式庫 (animation library)
將元件 (Widget) 包裹在動畫元件 (animated widget) 內。

在 Flutter 中，請使用 `AnimationController`，它是一個可以暫停、快轉、停止及反轉動畫的 `Animation<double>`。
它需要一個 `Ticker`，用來在 vsync 發生時發出訊號，
並在動畫執行期間於每一幀產生 0 到 1 之間的線性內插值。
接著，你可以建立一個或多個 `Animation`，並將它們附加到控制器上。

例如，你可以使用 `CurvedAnimation`
來沿著內插曲線 (interpolated curve) 實現動畫效果。
在這個意義上，控制器 (controller) 是動畫進度的「主」來源，
而 `CurvedAnimation` 則計算用來取代控制器預設線性運動的曲線。
就像元件 (Widgets) 一樣，Flutter 中的動畫 (Animation) 也採用組合式 (composition) 運作。

當你建立元件樹 (widget tree) 時，可以將 `Animation` 指派給元件的動畫屬性，
例如 `FadeTransition` 的透明度 (opacity)，
然後指示控制器開始執行動畫。

以下範例展示如何撰寫一個 `FadeTransition`，
當你按下 `FloatingActionButton` 時，會將元件淡入顯示為 logo：

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Fade Demo',
      home: MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  const MyFadeTest({super.key, required this.title});

  final String title;

  @override
  State<MyFadeTest> createState() => _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest>
    with SingleTickerProviderStateMixin {
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
  void dispose() {
    controller.dispose();
    super.dispose();
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
        onPressed: () {
          controller.forward();
        },
        tooltip: 'Fade',
        child: const Icon(Icons.brush),
      ),
    );
  }
}
```

如需更多資訊，請參閱 [動畫與動態元件][Animation & Motion widgets]、[動畫教學][Animations tutorial]，以及 [動畫總覽][Animations overview]。

### 螢幕繪製

在 UIKit 中，你會使用 `CoreGraphics` 來在螢幕上繪製線條和圖形。Flutter 則有一套不同的 API，主要基於 `Canvas` 類別，並搭配另外兩個協助繪製的類別：`CustomPaint` 和 `CustomPainter`，其中 `CustomPainter` 會實作你的繪製演算法，將內容繪製到畫布上。

若想了解如何在 Flutter 中實作簽名繪圖功能，請參考 Collin 在 [StackOverflow][StackOverflow] 上的解答。

[StackOverflow]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter

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
  State<Signature> createState() => SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset?> _points = <Offset?>[];
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
    final Paint paint = Paint()
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

### 元件透明度

在 UIKit 中，一切都有 `.opacity` 或 `.alpha`。
在 Flutter 中，大多數情況下你需要
將元件（Widget）包裹在 `Opacity` 元件中來達到這個效果。

### 自訂元件

在 UIKit 中，你通常會繼承 `UIView`，或使用現有的 view，
以覆寫並實作方法來達到你想要的行為。
在 Flutter 中，則是透過[組合][composing]較小的元件來建立自訂元件
（而不是繼承它們）。

舉例來說，如何建立一個在建構函式中接收 label 的 `CustomButton`？
你可以建立一個 CustomButton，將 `ElevatedButton` 與 label 組合起來，
而不是繼承 `ElevatedButton`：

<?code-excerpt "lib/custom.dart (custom-button)"?>
```dart
class CustomButton extends StatelessWidget {
  const CustomButton(this.label, {super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: () {}, child: Text(label));
  }
}
```

然後就可以像使用其他 Flutter 元件（Widgets）一樣，使用 `CustomButton`：

<?code-excerpt "lib/custom.dart (use-custom-button)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(child: CustomButton('Hello'));
}
```

### 管理相依套件

在 iOS 中，你可以透過 CocoaPods，將相依套件加入`Podfile` 來管理。
Flutter 則使用 Dart 的建置系統以及 Pub 套件管理工具來處理相依套件。
這些工具會將原生 Android 和 iOS 包裝應用程式的建置工作，委派給各自的平台建置系統。

雖然在你的 Flutter 專案的 iOS 資料夾中會有一個 Podfile，但只有在你需要針對特定平台整合原生相依套件時才需要使用它。
一般來說，請使用 `pubspec.yaml` 來宣告 Flutter 的外部相依套件。
你可以在 [pub.dev][pub.dev] 上找到許多優質的 Flutter 套件。

## 導覽（Navigation）

本節將說明應用程式頁面之間的導覽、push 與 pop 機制等內容。

### 頁面之間的導覽

在 UIKit 中，若要在 view controller 之間切換，你可以使用`UINavigationController` 來管理 view controller 堆疊並顯示。

Flutter 也有類似的實作方式，
是透過`Navigator` 與 `Routes`。
`Route` 是對應用程式「螢幕」或「頁面」的抽象概念，
而 `Navigator` 則是一個[元件 (Widget)][widget]，
用來管理路由。Route 大致上對應到
`UIViewController`。Navigator 的運作方式與 iOS 的
`UINavigationController` 類似，可以根據你要前往或返回某個畫面，執行 `push()` 與 `pop()` 路由的動作。

要在頁面間導覽，你有幾種選擇：

* 指定`Map`（命名路由）的名稱清單。
* 直接導覽至某個路由。

以下範例建立了一個`Map.`

<?code-excerpt "lib/intent.dart (map)"?>
```dart
void main() {
  runApp(
    CupertinoApp(
      home: const MyAppHome(), // becomes the route named '/'
      routes: <String, WidgetBuilder>{
        '/a': (context) => const MyPage(title: 'page A'),
        '/b': (context) => const MyPage(title: 'page B'),
        '/c': (context) => const MyPage(title: 'page C'),
      },
    ),
  );
}
```

透過將其名稱`push`到`Navigator`來導覽至指定的路由（Route）。

<?code-excerpt "lib/intent.dart (push)"?>
```dart
Navigator.of(context).pushNamed('/b');
```

`Navigator` 類別負責在 Flutter 中處理路由，並用於從你推送到堆疊上的路由取得回傳結果。這可以透過在 `push()` 回傳的 `Future` 上`await`來完成。

例如，若要啟動一個讓使用者選擇所在地點的 `location` 路由，你可以這樣做：

<?code-excerpt "lib/intent.dart (push-await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

然後，在你的 `location` 路由（Route）中，當使用者選擇好他們的位置後，`pop()` 堆疊（stack），並帶上結果：

<?code-excerpt "lib/intent.dart (pop)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

### 導航至其他應用程式

在 UIKit 中，若要將使用者導向另一個應用程式，會使用特定的 URL scheme。對於系統層級的應用程式，所使用的 scheme 取決於該應用程式。若要在 Flutter 中實現此功能，可以建立原生平台整合，或使用[現有的套件][existing plugin]，例如 [`url_launcher`][`url_launcher`]。

### 手動返回上一層

從 Dart 程式碼中呼叫 `SystemNavigator.pop()`，會觸發以下的 iOS 程式碼：

```objc
UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
if ([viewController isKindOfClass:[UINavigationController class]]) {
  [((UINavigationController*)viewController) popViewControllerAnimated:NO];
}
```

如果這樣還無法達到你的需求，你可以自行建立
[platform channel][platform channel] 來呼叫任意的 iOS 程式碼。

### 處理在地化（localization）

與 iOS 使用 `Localizable.strings` 檔案不同，
Flutter 目前尚未有專門處理字串的系統。
目前的最佳實踐是將你的文案字串
宣告在一個 class 中作為 static 欄位，並從該處存取。例如：

<?code-excerpt "lib/string_examples.dart (strings)"?>
```dart
class Strings {
  static const String welcomeMessage = 'Welcome To Flutter';
}
```

你可以這樣存取你的字串：

<?code-excerpt "lib/string_examples.dart (access-string)" replace="/const //g; /return //g;"?>
```dart
Text(Strings.welcomeMessage);
```

預設情況下，Flutter 只支援美式英文（US English）字串。
如果你需要支援其他語言，請加入 `flutter_localizations` 套件。
你也可能需要加入 Dart 的 [`intl`][`intl`] 套件，以使用 i10n 機制，例如日期／時間格式化。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any # Use version of intl from flutter_localizations.
```

要使用 `flutter_localizations` 套件，
請在應用程式的元件（Widget）上指定 `localizationsDelegates` 和
`supportedLocales`：

<?code-excerpt "lib/localizations_example.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      localizationsDelegates: <LocalizationsDelegate<dynamic>>[
        // Add app-specific localization delegate[s] here
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: <Locale>[
        Locale('en', 'US'), // English
        Locale('he', 'IL'), // Hebrew
        // ... other locales the app supports
      ],
    );
  }
}
```

委派（delegates）包含實際的在地化值，而`supportedLocales`則定義了應用程式支援哪些語系。上面的範例使用了`MaterialApp`，因此同時有`GlobalWidgetsLocalizations`（用於基礎元件 (Widgets) 的在地化值）以及`MaterialWidgetsLocalizations`（用於 Material 元件 (Material components) 的在地化值）。如果你的應用程式使用`WidgetsApp`，則不需要後者。請注意，這兩個委派都包含「預設」值，但如果你希望自己的應用程式內容也能在地化，則需要另外提供一個或多個委派來處理你自訂的可在地化內容。

初始化時，`WidgetsApp`（或`MaterialApp`）會根據你指定的委派，為你建立一個 [`Localizations`][`Localizations`] 元件 (Widget)。裝置目前的語系，隨時可以從當前 context 的`Localizations`元件（以`Locale`物件的形式）取得，或是使用 [`Window.locale`][`Window.locale`]。

若要存取在地化資源，請使用`Localizations.of()`方法，取得由指定委派所提供的特定在地化類別。使用 [`intl_translation`][`intl_translation`] 套件，將可翻譯內容匯出為 [arb][arb] 檔案進行翻譯，然後再匯入回應用程式，搭配`intl`使用。

如需更多 Flutter 國際化與在地化的細節，請參閱 [internationalization guide][internationalization guide]，其中包含有使用與未使用`intl`套件的範例程式碼。

## ViewControllers

本節將說明 Flutter 中對應 ViewController 的概念，以及如何監聽生命週期事件。

### Flutter 中的 ViewController 對應

在 UIKit 中，`ViewController` 代表一部分使用者介面，最常用於一個螢幕或區段。這些 ViewController 可以組合起來，建立複雜的使用者介面，有助於擴展應用程式的 UI。在 Flutter 中，這個角色則由元件 (Widgets) 擔任。如同在「導覽」章節所述，Flutter 中的螢幕是由元件 (Widgets) 表示，因為「一切皆為元件 (Widget)！」。你可以使用`Navigator`在不同的`Route`之間切換，這些`Route`代表不同的螢幕或頁面，或是同一資料的不同狀態或呈現方式。

### 監聽生命週期事件

在 UIKit 中，你可以覆寫`ViewController`的方法，來攔截視圖本身的生命週期方法，或是在`AppDelegate`中註冊生命週期回呼。在 Flutter 中，沒有這兩個概念，但你可以透過註冊`WidgetsBinding`觀察者，並監聽`didChangeAppLifecycleState()`變更事件，來達到監聽生命週期事件的目的。

可觀察的生命週期事件包括：

**`inactive`**
：應用程式處於非活動狀態，且不會接收使用者輸入。此事件僅適用於 iOS，Android 沒有對應事件。

**`paused`**
：應用程式目前對使用者不可見，不會回應使用者輸入，但仍在背景執行。

**`resumed`**
：應用程式可見，且正在回應使用者輸入。

**`suspending`**
：應用程式暫時被掛起。iOS 平台沒有對應事件。

如需這些狀態的詳細說明，請參閱 [`AppLifecycleState` documentation][`AppLifecycleState` documentation]。

## 版面配置（Layouts）

本節將說明 Flutter 中的不同版面配置方式，以及它們與 UIKit 的對應關係。

### 顯示列表檢視（List View）

在 UIKit 中，你可以使用`UITableView`或`UICollectionView`來顯示列表。在 Flutter 中，則有類似的實作方式，使用`ListView`。在 UIKit 中，這些檢視有委派方法（delegate methods）來決定列數、每個 index path 的 cell，以及 cell 的大小。

由於 Flutter 採用不可變元件（immutable widget）模式，你只需將元件 (Widgets) 清單傳遞給`ListView`，Flutter 會自動確保捲動時的流暢與效能。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> _getListData() {
    final List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(
        Padding(padding: const EdgeInsets.all(10), child: Text('Row $i')),
      );
    }
    return widgets;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }
}
```

### 偵測被點擊的項目

在 UIKit 中，你會實作委派方法 `tableView:didSelectRowAtIndexPath:`。  
在 Flutter 中，則使用傳入元件 (Widgets) 所提供的觸控處理功能。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: _getListData()),
    );
  }
}
```

### 動態更新 ListView

在 UIKit 中，你會更新 list view 的資料，並使用 `reloadData` 方法來通知 table 或 collection view。

在 Flutter 中，如果你在 `setState()` 內部更新 widget 清單，你會很快發現資料在畫面上沒有任何變化。  
這是因為當呼叫 `setState()` 時，Flutter 的渲染引擎會檢查 widget tree，來判斷是否有任何變動。  
當它遍歷到你的 `ListView` 時，會執行 `==` 檢查，並判斷兩個 `ListView` 是相同的。  
既然沒有任何變化，因此不需要更新。

如果你想用簡單的方法來更新你的 `ListView`，可以在 `setState()` 內部建立一個新的 `List`，然後將舊清單的資料複製到新清單。  
這種做法雖然簡單，但不建議用於大量資料集，下一個範例會說明原因。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Widget> widgets = <Widget>[];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView(children: widgets),
    );
  }
}
```

建議且高效、有效率地建立清單的方法是使用`ListView.Builder`。  
當你有動態清單或資料量非常大的清單時，這種方法特別適合。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
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
}
```

與其建立`ListView`，請建立`ListView.builder`，並傳入兩個主要參數：清單的初始長度，以及`ItemBuilder`函式。

`ItemBuilder`函式類似於 iOS table 或 collection view 中的`cellForItemAt`委派方法，會接收一個位置（position），並回傳你希望在該位置渲染的 cell。

最後，也是最重要的一點，請注意`onTap()`函式不再重新建立清單，而是對其進行`.add`。

### 建立可捲動視圖

在 UIKit 中，你會將你的視圖包裹在`ScrollView`中，讓使用者在需要時可以捲動內容。

在 Flutter 中，最簡單的方式是使用`ListView`元件 (Widget)。它同時扮演`ScrollView`和 iOS `TableView`的角色，因為你可以將元件以垂直格式排列。

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

如需更詳細的 Flutter 元件 (Widgets) 版面配置說明，請參閱 [layout tutorial][layout tutorial]。

## 手勢偵測與觸控事件處理

本節將說明如何在 Flutter 中偵測手勢與處理各種事件，並與 UIKit 進行比較。

### 新增點擊監聽器

在 UIKit 中，你會將 `GestureRecognizer` 附加到一個 view 以處理點擊事件。
在 Flutter 中，新增觸控監聽器有兩種方式：

1. 如果該元件（Widget）本身支援事件偵測，則可以直接傳入一個函式，並在該函式中處理事件。例如，`ElevatedButton` 元件有一個 `onPressed` 參數：

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

2. 如果該元件（Widget）不支援事件偵測，  
   請將該元件包裹在 `GestureDetector` 中，並將函式傳遞給 `onTap` 參數。

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

### 處理其他手勢

使用 `GestureDetector`，你可以監聽多種手勢事件，例如：

* **點擊（Tapping）**

  **`onTapDown`**
  ：一個可能會觸發點擊的指標已經在特定位置接觸螢幕。

  **`onTapUp`**
  ：觸發點擊的指標已經在特定位置停止接觸螢幕。

  **`onTap`**
  ：點擊事件已發生。

  **`onTapCancel`**
  ：先前觸發 `onTapDown` 的指標將不會產生點擊事件。

* **雙擊（Double tapping）**

  **`onDoubleTap`**
  ：使用者在同一位置快速連續點擊兩次螢幕。

* **長按（Long pressing）**

  **`onLongPress`**
  ：指標在同一位置長時間接觸螢幕。

* **垂直拖曳（Vertical dragging）**

  **`onVerticalDragStart`**
  ：指標已接觸螢幕，並可能開始垂直移動。

  **`onVerticalDragUpdate`**
  ：與螢幕接觸的指標已進一步向垂直方向移動。

  **`onVerticalDragEnd`**
  ：先前與螢幕接觸並垂直移動的指標已不再接觸螢幕，並且在離開時具有特定速度。

* **水平拖曳（Horizontal dragging）**

  **`onHorizontalDragStart`**
  ：指標已接觸螢幕，並可能開始水平移動。

  **`onHorizontalDragUpdate`**
  ：與螢幕接觸的指標已進一步向水平方向移動。

  **`onHorizontalDragEnd`**
  ：先前與螢幕接觸並水平移動的指標已不再接觸螢幕。

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

## 主題、樣式與媒體

Flutter 應用程式非常容易進行樣式設計；你可以在淺色與深色主題之間切換、變更文字和 UI 元件的樣式，還有更多其他自訂選項。本節將介紹如何為你的 Flutter 應用程式進行樣式設計，並比較在 UIKit 中如何達成相同的效果。

### 使用主題

Flutter 預設就內建了美觀的 Material Design 實作，這涵蓋了許多你通常需要處理的樣式與主題化需求。

為了充分利用 Material 元件，你需要在應用程式的進入點宣告一個頂層元件 `MaterialApp`。  
`MaterialApp` 是一個方便的元件，它包裝了一些在實作 Material Design 應用程式時常用的元件。  
它是在 `WidgetsApp` 的基礎上，加入了 Material 特有的功能。

不過，Flutter 也足夠靈活且具表現力，可以實作任何設計語言。在 iOS 上，你可以使用 [Cupertino library][Cupertino library] 來打造符合 [Human Interface Guidelines][Human Interface Guidelines] 的介面。  
如果你想查看這些元件的完整集合，請參見 [Cupertino widgets][Cupertino widgets] 畫廊。

你也可以將 `WidgetsApp` 作為你的應用程式元件，這會提供部分相同的功能，但不像 `MaterialApp` 那樣豐富。

若要自訂任何子元件的顏色與樣式，請將 `ThemeData` 物件傳遞給 `MaterialApp` 元件。  
例如，在下方的程式碼中，主題色彩方案（color scheme）是以 deepPurple 為種子色，分隔線顏色則設為 grey。

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
        dividerColor: Colors.grey,
      ),
      home: const SampleAppPage(),
    );
  }
}
```

### 使用自訂字型

在 UIKit 中，你需要將任何 `ttf` 字型檔案匯入專案，並在 `info.plist` 檔案中建立參考。
在 Flutter 中，請將字型檔案放置於資料夾中，並在 `pubspec.yaml` 檔案中進行參考，這與匯入圖片的方式類似。

```yaml
fonts:
  - family: MyCustomFont
    fonts:
      - asset: fonts/MyCustomFont.ttf
      - style: italic
```

然後將該字型指派給你的`Text`元件（Widget）：

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

### 文字樣式設定

除了字型之外，你還可以自訂`Text`元件（Widget）的其他樣式元素。`Text`元件的 style 參數接受一個`TextStyle`物件，你可以在其中自訂許多參數，例如：

* `color`
* `decoration`
* `decorationColor`
* `decorationStyle`
* `fontFamily`
* `fontSize`
* `fontStyle`
* `fontWeight`
* `hashCode`
* `height`
* `inherit`
* `letterSpacing`
* `textBaseline`
* `wordSpacing`

### 在應用程式中打包圖片

在 iOS 中，圖片（images）和資源（assets）被視為不同的項目，而 Flutter 應用程式只有資源（assets）。在 iOS 上放置於`Images.xcasset`資料夾中的資源，對於 Flutter 來說則放在 assets 資料夾中。和 iOS 一樣，資源可以是任何類型的檔案，不僅限於圖片。例如，你可能會有一個 JSON 檔案放在`my-assets`資料夾中：

```plaintext
my-assets/data.json
```

在 `pubspec.yaml` 檔案中宣告資源（asset）：

```yaml
assets:
 - my-assets/data.json
```

然後可以在程式碼中透過 [`AssetBundle`][`AssetBundle`] 來存取：

<?code-excerpt "lib/asset_bundle.dart"?>
```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}
```

對於圖片，Flutter 採用類似 iOS 的簡單密度（density）格式。
圖片資源可以是 `1.0x`、`2.0x`、`3.0x`，或任何其他倍數。
Flutter 的 [`devicePixelRatio`][`devicePixelRatio`] 表示單一邏輯像素中實體像素的比例。

資源（Assets）可以放在任意的資料夾中——
Flutter 並沒有預先定義的資料夾結構。
你需要在 `pubspec.yaml` 檔案中宣告資源（包含路徑），Flutter 會自動載入這些資源。

舉例來說，若要將一個名為 `my_icon.png` 的圖片加入你的 Flutter 專案，
你可以選擇將它存放在任意命名為 `images` 的資料夾中。
將基礎圖片（1.0x）放在 `images` 資料夾，
其他不同倍率的圖片則放在以對應倍率命名的子資料夾中：

```plaintext
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

接下來，在 `pubspec.yaml` 檔案中宣告這些圖片：

```yaml
assets:
 - images/my_icon.png
```

你現在可以使用 `AssetImage` 來存取你的圖片：

<?code-excerpt "lib/images.dart (asset-image)"?>
```dart
image: AssetImage('images/a_dot_burr.png'),
```

或直接在`Image`元件（Widget）中使用：

<?code-excerpt "lib/images.dart (image-asset)"?>
```dart
@override
Widget build(BuildContext context) {
  return Image.asset('images/my_image.png');
}
```

如需更多詳細資訊，請參閱
[在 Flutter 中新增資源與圖片][Adding Assets and Images in Flutter]。

## 表單輸入

本節將說明如何在 Flutter 中使用表單，以及其與 UIKit 的比較。

### 取得使用者輸入

考慮到 Flutter 採用不可變元件（Widgets）並分離狀態的設計，你可能會好奇使用者輸入在這樣的架構下該如何處理。在 UIKit 中，通常會在需要提交使用者輸入或對其進行操作時，直接查詢元件的當前值。那麼在 Flutter 中又是如何實現的呢？

實際上，表單在 Flutter 中的處理方式，和其他功能一樣，是透過專門的元件（Widgets）來完成。如果你有一個 `TextField` 或 `TextFormField`，可以提供一個 [`TextEditingController`][`TextEditingController`] 來取得使用者輸入：

<?code-excerpt "lib/form.dart (my-form-state)"?>
```dart
class _MyFormState extends State<MyForm> {
  // Create a text controller and use it to retrieve the current value.
  // of the TextField!
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when disposing of the Widget.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Retrieve Text Input')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(controller: myController),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog with the
        // text the user has typed into our text field.
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text the user has typed in using our
                // TextEditingController.
                content: Text(myController.text),
              );
            },
          );
        },
        tooltip: 'Show me the value!',
        child: const Icon(Icons.text_fields),
      ),
    );
  }
}
```

你可以在 [Retrieve the value of a text field][Retrieve the value of a text field] 中找到更多資訊以及完整程式碼範例。

### 文字欄位 (text field) 的佔位文字

在 Flutter 中，你可以很容易地透過在 `Text` 元件（Widget）的 decoration 建構子參數中加入 `InputDecoration` 物件，來顯示「提示」或佔位文字：

<?code-excerpt "lib/form.dart (input-hint)" replace="/return const //g;/;//g"?>
```dart
Center(
  child: TextField(decoration: InputDecoration(hintText: 'This is a hint')),
)
```

### 顯示驗證錯誤

就像使用「提示」（hint）一樣，將`InputDecoration`物件傳遞給`Text`元件（Widget）的裝飾（decoration）建構子。

不過，你不會一開始就顯示錯誤訊息。相反地，當使用者輸入了無效資料時，更新狀態，並傳遞新的`InputDecoration`物件。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String? _errorText;

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|'
        r'(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
        r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }

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
            errorText: _errorText,
          ),
        ),
      ),
    );
  }
}
```

## 執行緒與非同步性

本節將討論 Flutter 中的並行處理（concurrency），以及其與 UIKit 的比較。

### 撰寫非同步程式碼

Dart 採用單一執行緒（single-threaded）的執行模型，並支援 `Isolate`（可在另一個執行緒上執行 Dart 程式碼）、事件迴圈（event loop）以及非同步程式設計。除非你建立新的 `Isolate`，否則 Dart 程式碼都會在主 UI 執行緒上執行，並由事件迴圈所驅動。Flutter 的事件迴圈等同於 iOS 的主迴圈，也就是附加在主執行緒上的 `Looper`。

Dart 的單一執行緒模型並不代表你必須將所有操作都以阻塞方式執行，導致 UI 停滯。你可以善用 Dart 語言所提供的非同步機制，例如 `async`/`await`，來執行非同步工作。

舉例來說，你可以利用 `async`/`await` 執行網路程式碼，而不會造成 UI 卡頓，Dart 會自動處理繁重的工作：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

當`await`的網路呼叫完成後，
請透過呼叫`setState()`來更新 UI，
這會觸發元件（Widget）子樹的重建，
並更新資料。

以下範例會以非同步方式載入資料，
並將其顯示在`ListView`中：

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
    });
  }

  Widget getRow(int index) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text('Row ${data[index]['title']}'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) {
          return getRow(index);
        },
      ),
    );
  }
}
```

請參考下一節，瞭解更多有關背景執行工作的資訊，以及 Flutter 與 iOS 的差異。

### 移動至背景執行緒

由於 Flutter 是單執行緒（single threaded）並運行事件迴圈（event loop，類似於 Node.js），你不需要擔心執行緒管理或建立背景執行緒。如果你正在執行 I/O 密集型工作，例如磁碟存取或網路呼叫，那麼你可以安全地使用 `async`/`await`，就完成了。如果你需要執行計算密集型工作，會讓 CPU 持續忙碌，則應該將其移至 `Isolate`，以避免阻塞事件迴圈。

針對 I/O 密集型工作，請將函式宣告為 `async` 函式，並在函式內對長時間執行的任務使用 `await`：

<?code-excerpt "lib/async.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

這是你在進行網路或資料庫呼叫時的典型做法，
這兩者都屬於 I/O 操作。

然而，有時你可能需要處理大量資料，導致 UI 停滯。
在 Flutter 中，可以使用`Isolate`來善用多核心 CPU，
以執行長時間運算或計算密集型任務。

Isolate（隔離執行緒）是獨立的執行緒，與主執行緒的記憶體堆完全不共享任何記憶體。
這表示你無法存取主執行緒的變數，
也無法透過呼叫`setState()`來更新 UI。
Isolate 顧名思義，就是完全隔離，無法共享記憶體（例如 static 欄位）。

以下範例展示如何在一個簡單的 isolate 中，
將資料傳回主執行緒以更新 UI。

<?code-excerpt "lib/isolates.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message.
  final SendPort sendPort = await receivePort.first as SendPort;

  final List<Map<String, dynamic>> msg = await sendReceive(
    sendPort,
    'https://jsonplaceholder.typicode.com/posts',
  );

  setState(() {
    data = msg;
  });
}

// The entry point for the isolate.
static Future<void> dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  final ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);

  await for (final dynamic msg in port) {
    final String url = msg[0] as String;
    final SendPort replyTo = msg[1] as SendPort;

    final Uri dataURL = Uri.parse(url);
    final http.Response response = await http.get(dataURL);
    // Lots of JSON to parse
    replyTo.send(jsonDecode(response.body) as List<Map<String, dynamic>>);
  }
}

Future<List<Map<String, dynamic>>> sendReceive(SendPort port, String msg) {
  final ReceivePort response = ReceivePort();
  port.send(<dynamic>[msg, response.sendPort]);
  return response.first as Future<List<Map<String, dynamic>>>;
}
```

在這裡，`dataLoader()` 是運行於自己獨立執行緒（execution thread）中的 `Isolate`。  
在該 isolate（隔離區）中，你可以執行更多需要 CPU 資源的處理（例如解析大型 JSON），或進行運算密集型的數學運算，例如加密或訊號處理。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message.
    final SendPort sendPort = await receivePort.first as SendPort;

    final List<Map<String, dynamic>> msg = await sendReceive(
      sendPort,
      'https://jsonplaceholder.typicode.com/posts',
    );

    setState(() {
      data = msg;
    });
  }

  // The entry point for the isolate.
  static Future<void> dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    final ReceivePort port = ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (final dynamic msg in port) {
      final String url = msg[0] as String;
      final SendPort replyTo = msg[1] as SendPort;

      final Uri dataURL = Uri.parse(url);
      final http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(jsonDecode(response.body) as List<Map<String, dynamic>>);
    }
  }

  Future<List<Map<String, dynamic>>> sendReceive(SendPort port, String msg) {
    final ReceivePort response = ReceivePort();
    port.send(<dynamic>[msg, response.sendPort]);
    return response.first as Future<List<Map<String, dynamic>>>;
  }

  Widget getBody() {
    bool showLoadingDialog = data.isEmpty;

    if (showLoadingDialog) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, position) {
        return getRow(position);
      },
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${data[i]["title"]}"),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }
}
```

### 發送網路請求

在 Flutter 中發送網路請求非常簡單，只要使用熱門的 [`http` 套件][`http` package] 即可。這個套件將許多你原本需要自行實作的網路細節進行了抽象化，讓你可以更輕鬆地進行網路呼叫。

若要將 `http` 套件加入為相依套件，請執行 `flutter pub add`：

```console
flutter pub add http
```

要進行網路呼叫（network call），請在 `async` 函式的 `http.get()` 上呼叫 `await`：

<?code-excerpt "lib/progress.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

### 顯示長時間執行任務的進度

在 UIKit 中，通常會在背景執行長時間任務時，使用 `UIProgressView`。

在 Flutter 中，請使用 `ProgressIndicator` 元件 (Widget)。
透過布林旗標來控制何時渲染，程式化地顯示進度。
在長時間任務開始前，通知 Flutter 更新其狀態，
任務結束後再將其隱藏。

在下方範例中，build 函式被拆分為三個不同的函式。
如果 `showLoadingDialog` 為 `true`
（當 `widgets.length == 0` 時），則渲染 `ProgressIndicator`。
否則，則以從網路呼叫取得的資料渲染 `ListView`。

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
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatefulWidget {
  const SampleAppPage({super.key});

  @override
  State<SampleAppPage> createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List<Map<String, Object?>> data = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  bool get showLoadingDialog => data.isEmpty;

  Future<void> loadData() async {
    final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
    final http.Response response = await http.get(dataURL);
    setState(() {
      data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
    });
  }

  Widget getBody() {
    if (showLoadingDialog) {
      return getProgressDialog();
    }

    return getListView();
  }

  Widget getProgressDialog() {
    return const Center(child: CircularProgressIndicator());
  }

  ListView getListView() {
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        return getRow(index);
      },
    );
  }

  Widget getRow(int i) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Text("Row ${data[i]["title"]}"),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: getBody(),
    );
  }
}
```

[Flutter for SwiftUI developers]: /get-started/flutter-for/swiftui-devs  
[Add Flutter to existing app]: /add-to-app  
[Adding Assets and Images in Flutter]: /ui/assets/assets-and-images  
[Animation & Motion widgets]: /ui/widgets/animation  
[Animations overview]: /ui/animations  
[Animations tutorial]: /ui/animations/tutorial  
[Apple's iOS design language]: {{site.apple-dev}}/design/resources  
[`AppLifecycleState` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html  
[arb]: {{site.github}}/googlei18n/app-resource-bundle  
[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html  
[composing]: /resources/architectural-overview#composition  
[Cupertino library]: {{site.api}}/flutter/cupertino/cupertino-library.html  
[Cupertino widgets]: /ui/widgets/cupertino  
[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html  
[existing plugin]: {{site.pub}}/flutter  
[Flutter concurrency for Swift developers]: /get-started/flutter-for/dart-swift-concurrency  
[`http` package]: {{site.pub-pkg}}/http  
[Human Interface Guidelines]: {{site.apple-dev}}/ios/human-interface-guidelines/overview/themes/  
[internationalization guide]: /ui/internationalization  
[`intl`]: {{site.pub-pkg}}/intl  
[`intl_translation`]: {{site.pub-pkg}}/intl_translation  
[Introduction to declarative UI]: /get-started/flutter-for/declarative  
[layout tutorial]: /ui/widgets/layout  
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html  
[Material Components]: {{site.material}}/develop/flutter/  
[Material Design guidelines]: {{site.material}}/styles/  
[optimized for all platforms]: {{site.material2}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines  
[Platform adaptations]: /platform-integration/platform-adaptations  
[platform channel]: /platform-integration/platform-channels  
[pub.dev]: {{site.pub}}/flutter/packages  
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input  
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html  
[`url_launcher`]: {{site.pub-pkg}}/url_launcher  
[widget]: /resources/architectural-overview#widgets  
[widget catalog]: /ui/widgets/layout  
[`Window.locale`]: {{site.api}}/flutter/dart-ui/Window/locale.html  
[Learning Dart as a Swift Developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart
