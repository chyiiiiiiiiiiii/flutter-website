---
title: Flutter 給 UIKit 開發者
description: 學習如何將 iOS 與 UIKit 開發經驗應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/ios_devs"?>

有 UIKit 經驗的 iOS 開發者，
若想使用 Flutter 編寫行動應用程式，
建議閱讀本指南。
本指南將說明如何將現有的 UIKit 知識應用到 Flutter 上。

:::note
如果你有使用 SwiftUI 開發應用程式的經驗，
請改參考 [Flutter for SwiftUI developers][Flutter for SwiftUI developers]。
:::

Flutter 是一個用於構建跨平台應用程式的框架，
使用 Dart 程式語言。
若想了解 Dart 程式設計與 Swift 程式設計之間的差異，
請參考 [Learning Dart as a Swift Developer][Learning Dart as a Swift Developer]
以及 [Flutter concurrency for Swift developers][Flutter concurrency for Swift developers]。

你的 iOS 與 UIKit 知識和經驗，
在使用 Flutter 開發時非常有價值。
{% comment %}
  TODO: 當 [iOS and Apple hardware interactions with Flutter][iOS and Apple hardware interactions with Flutter] 釋出時，補充關於與作業系統及硬體互動的 plugin 系統說明。
{% endcomment -%}

Flutter 也針對 iOS 執行時，對應用程式行為做了多項調整。
詳細內容請參考 [Platform adaptations][Platform adaptations]。

:::tip
若要將 Flutter 程式碼整合進**現有**的 iOS 應用程式，
請參考 [Add Flutter to existing app][Add Flutter to existing app]。
:::

請將本指南當作一本食譜（cookbook）來使用，
可依需求跳閱，找到最相關的問題解答。

## 概覽

作為入門，建議先觀看以下影片。
影片概述了 Flutter 在 iOS 上的運作方式，以及如何使用 Flutter 建構 iOS 應用程式。

{% ytEmbed 'ceMsPBbcEGg', 'Flutter for iOS developers', true %}

### Views 與 Widgets

:::secondary
所謂的 react 風格或_宣告式_（declarative）程式設計，
與傳統的命令式（imperative）程式設計有何不同？
比較請參考 [Introduction to declarative UI][Introduction to declarative UI]。
:::

在 UIKit 中，大部分 UI 的建立都是透過 view 物件，
也就是 `UIView` 類別的實例。
這些 view 可以作為其他 `UIView` 類別的容器，
共同組成你的版面配置。

在 Flutter 中，`UIView` 的大致對應是 `Widget`。
雖然元件（Widgets）並不完全等同於 iOS 的 views，
但在你熟悉 Flutter 的運作方式之前，
可以將它們視為「宣告與建構 UI 的方式」。

不過，這兩者與 `UIView` 仍有一些差異。
首先，元件的生命週期不同：元件是不可變的（immutable），
僅存在於需要變更之前。
每當元件或其狀態改變時，
Flutter 框架會建立一棵新的元件樹（widget tree）。
相較之下，UIKit 的 view 在變更時並不會被重新建立，
而是作為一個可變的實體，只會在使用 `setNeedsDisplay()` 使其失效時才重新繪製。

此外，與 `UIView` 不同，Flutter 的元件（Widgets）非常輕量，
部分原因是它們的不可變性。
因為元件本身不是 view，
也不會直接繪製任何內容，
而是對 UI 及其語意的描述，
這些描述會在底層「轉換」成實際的 view 物件。

Flutter 內建 [Material Components][Material Components] 函式庫，
這些元件實作了
[Material Design 指南][Material Design guidelines]。
Material Design 是一套彈性的設計系統，
[針對所有平台最佳化][optimized for all platforms]，包含 iOS。

但 Flutter 也足夠靈活與具表現力，
可實作任何設計語言。
在 iOS 上，你可以使用 [Cupertino 元件 (Widgets)][Cupertino widgets]
函式庫，打造外觀符合
[Apple 的 iOS 設計語言][Apple's iOS design language] 的介面。

### 更新元件（Widgets）

在 UIKit 中，若要更新 view，通常會直接修改它們。
在 Flutter 中，元件是不可變的，無法直接更新。
你必須操作元件的狀態（state）。

這就是 Stateful 與 Stateless 元件的概念來源。
`StatelessWidget` 就如其名——沒有任何狀態的元件。

`StatelessWidgets` 適用於你描述的 UI 部分
只依賴元件初始設定資訊、不會隨後續變化時。

舉例來說，在 UIKit 中，這類情境就像放置一個 `UIImageView`，
並將你的 logo 設為 `image`。
如果 logo 在執行期間不會改變，
在 Flutter 中就可以使用 `StatelessWidget`。

如果你想根據 HTTP 請求取得的資料動態改變 UI，
就要使用 `StatefulWidget`。
當 HTTP 請求完成後，通知 Flutter 框架
該元件的 `State` 已更新，讓 UI 能夠更新。

Stateless 與 Stateful 元件最重要的差異在於，
`StatefulWidget` 會有一個 `State` 物件，
用來儲存狀態資料，並在元件樹重建時保留資料，
不會遺失。

如果不確定該用哪一種，請記住這個原則：
如果元件會在 `build` 方法之外改變
（例如因為使用者互動），
那就是 stateful。
如果元件在建構後就不再改變，則是 stateless。
不過，即使某個元件是 stateful，
其父元件只要本身不會因這些變化（或其他輸入）而改變，
仍然可以是 stateless。

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

如果你查看上面的程式碼，可能會注意到`Text`元件（Widget）本身並沒有攜帶任何明確的狀態。它只會渲染傳入建構函式的內容，除此之外沒有其他行為。

但如果你希望「I Like Flutter」這段文字能夠動態變化，例如在點擊`FloatingActionButton`時改變內容，該怎麼做呢？

要實現這個需求，可以將`Text`元件包裹在`StatefulWidget`中，並在使用者點擊按鈕時進行更新。

例如：

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
或者在你的 view controller 中以程式方式設定約束。
在 Flutter 中，則是透過組合元件樹（widget tree）並在程式碼中宣告你的版面配置。

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

你可以為任何元件（Widget）新增 padding（內距），這類似於 iOS 中 constraints（約束）的功能。

你可以在 [widget catalog][widget catalog] 中查看 Flutter 提供的各種版面配置元件（Layout widgets）。

### 移除元件（Widgets）

在 UIKit 中，你可以在父視圖上呼叫 `addSubview()`，或在子視圖上呼叫 `removeFromSuperview()`，以動態新增或移除子視圖。在 Flutter 中，由於元件（Widget）是不可變的（immutable），因此沒有與 `addSubview()` 完全對應的做法。取而代之的是，你可以將一個函式傳遞給父元件，該函式會回傳一個元件，並透過布林旗標來控制該子元件的建立與否。

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

### 動畫 (Animations)

在 UIKit 中，你可以透過在一個 view 上呼叫 `animate(withDuration:animations:)` 方法來建立動畫 (Animation)。
在 Flutter 中，則使用動畫函式庫 (animation library) 將元件 (Widgets) 包裹在動畫元件 (animated widget) 之中。

在 Flutter 中，可以使用 `AnimationController`，這是一個可以暫停、快轉、停止與反轉動畫的 `Animation<double>`。
它需要一個 `Ticker` 來通知 vsync 發生的時機，並在動畫執行時於每一個 frame 產生 0 到 1 之間的線性內插值。
接著，你可以建立一個或多個 `Animation`，並將它們附加到 controller 上。

舉例來說，你可以使用 `CurvedAnimation` 來沿著插值曲線實現動畫效果。
在這個意義上，controller 是動畫進度的「主控」來源，而 `CurvedAnimation` 則計算取代 controller 預設線性運動的曲線。
和元件 (Widgets) 一樣，Flutter 中的動畫 (Animation) 也採用組合 (composition) 的方式運作。

當你建立元件樹 (widget tree) 時，可以將 `Animation` 指定給元件的動畫屬性，例如 `FadeTransition` 的透明度，然後指示 controller 啟動動畫。

以下範例展示如何撰寫一個 `FadeTransition`，當你按下 `FloatingActionButton` 時，該元件會以淡入的動畫顯示 Logo：

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

如需更多資訊，請參閱[動畫與動態元件 (Animation & Motion widgets)][Animation & Motion widgets]、[動畫教學 (Animations tutorial)][Animations tutorial]，以及[動畫總覽 (Animations overview)][Animations overview]。

### 螢幕繪製

在 UIKit 中，你會使用 `CoreGraphics` 來在螢幕上繪製線條和形狀。Flutter 則有不同的 API，主要是基於 `Canvas` 類別，並有另外兩個協助繪製的類別：`CustomPaint` 和 `CustomPainter`，其中 `CustomPainter` 會實作你的演算法來繪製到畫布上。

若想了解如何在 Flutter 中實作簽名繪製器，請參考 Collin 在 [StackOverflow][StackOverflow] 上的回答。

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

在 UIKit 中，所有東西都有 `.opacity` 或 `.alpha`。
在 Flutter 中，大多數情況下，你需要將元件（Widget）包裹在 `Opacity` 元件中來達成這個效果。

### 自訂元件

在 UIKit 中，你通常會繼承 `UIView`，或使用現有的 view，來覆寫並實作方法以達到預期的行為。
在 Flutter 中，建立自訂元件時，建議[組合][composing]較小的元件（Widgets）（而不是繼承它們）。

例如，如何建立一個在建構函式中接收標籤的 `CustomButton`？
你可以建立一個 CustomButton，將 `ElevatedButton` 與標籤組合，而不是繼承 `ElevatedButton`：

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

然後就可以像使用其他 Flutter 元件（Widget）一樣，使用 `CustomButton`：

<?code-excerpt "lib/custom.dart (use-custom-button)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(child: CustomButton('Hello'));
}
```

### 管理相依套件

在 iOS 中，你可以透過 CocoaPods，將相依套件加入你的`Podfile`。
Flutter 則是使用 Dart 的建置系統與 Pub 套件管理工具來處理相依套件。
這些工具會將原生 Android 與 iOS 包裝應用程式的建置工作，委託給各自的平台建置系統。

雖然你的 Flutter 專案的 iOS 資料夾中有一個 Podfile，但只有在你需要加入每個平台整合所需的原生相依套件時才需要使用它。
一般來說，請使用`pubspec.yaml`來宣告 Flutter 的外部相依套件。
尋找優質 Flutter 套件的好地方是 [pub.dev][pub.dev]。

## 導覽（Navigation）

本節將說明應用程式頁面之間的導覽、push 和 pop 機制等相關內容。

### 頁面之間的導覽

在 UIKit 中，若要在 view controller 之間切換，可以使用`UINavigationController`來管理要顯示的 view controller 堆疊。

Flutter 有類似的實作方式，
是透過`Navigator`與`Routes`來達成。
`Route` 是對應用程式「螢幕」或「頁面」的抽象概念，
而`Navigator`則是一個[元件 (Widget)][widget]
用來管理路由。Route 大致上對應到`UIViewController`。Navigator 的運作方式與 iOS 的`UINavigationController`相似，能夠根據你想要前往或返回某個畫面，進行`push()`與`pop()`路由的操作。

要在頁面之間導覽，你有幾種選擇：

* 指定`Map`的路由名稱。
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

`Navigator` 類別負責在 Flutter 中處理路由，並用於從你推送到堆疊上的路由取得結果。
這可以透過在 `push()` 回傳的 `Future` 上進行 `await` 來完成。

例如，若要啟動一個讓使用者選擇位置的 `location` 路由，你可以這麼做：

<?code-excerpt "lib/intent.dart (push-await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

接著，在你的 `location` 路由（Route）中，當使用者選擇完他們的位置後，`pop()` 堆疊（stack）並帶回結果：

<?code-excerpt "lib/intent.dart (pop)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

### 導航至其他應用程式

在 UIKit 中，若要將使用者導向其他應用程式，會使用特定的 URL scheme。對於系統層級的應用程式，其 scheme 取決於該應用程式。若要在 Flutter 中實作此功能，可以建立原生平台整合，或使用[現有的套件][existing plugin]，例如 [`url_launcher`][`url_launcher`]。

### 手動返回上一層

從 Dart 程式碼呼叫 `SystemNavigator.pop()`，會觸發下列 iOS 程式碼：

```objc
UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
if ([viewController isKindOfClass:[UINavigationController class]]) {
  [((UINavigationController*)viewController) popViewControllerAnimated:NO];
}
```

如果這還無法滿足你的需求，你可以自行建立
[platform channel][platform channel] 來呼叫任意的 iOS 程式碼。

### 處理在地化（localization）

不同於 iOS 使用 `Localizable.strings` 檔案，
Flutter 目前尚未有專門處理字串的系統。
目前的最佳做法是將你的文案字串
宣告在一個類別中作為靜態欄位（static fields），並從該處存取。例如：

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
你可能也需要加入 Dart 的 [`intl`][`intl`] 套件，以使用 i10n 機制，例如日期／時間格式化。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any # Use version of intl from flutter_localizations.
```

要使用 `flutter_localizations` 套件，
請在應用程式元件（Widget）上指定 `localizationsDelegates` 和
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

委派（delegates）包含實際的在地化值，而`supportedLocales`則定義了應用程式支援哪些語系。上述範例使用了`MaterialApp`，因此同時包含`GlobalWidgetsLocalizations`（用於基礎元件的在地化值）以及`MaterialWidgetsLocalizations`（用於 Material 元件的在地化）。如果你的應用程式使用`WidgetsApp`，則不需要後者。請注意，這兩個委派包含「預設」值，但如果你希望自己的應用程式內容也能在地化，則需要額外提供一個或多個委派來處理你自己的可在地化內容。

初始化時，`WidgetsApp`（或`MaterialApp`）會根據你指定的委派自動建立一個 [`Localizations`][`Localizations`] 元件。你可以隨時透過目前 context 中的`Localizations`元件（以`Locale`物件的形式），或使用 [`Window.locale`][`Window.locale`] 來取得裝置目前的語系。

若要存取在地化資源，請使用`Localizations.of()`方法來取得由指定委派所提供的特定在地化類別。你可以使用 [`intl_translation`][`intl_translation`] 套件將可翻譯內容匯出為 [arb][arb] 檔案進行翻譯，並再匯入應用程式中，搭配`intl`使用。

如需更多 Flutter 國際化與在地化的詳細資訊，請參閱 [internationalization guide][internationalization guide]，其中包含有/無`intl`套件的範例程式碼。

## ViewControllers

本節將說明 Flutter 中對應於 ViewController 的概念，以及如何監聽生命週期事件。

### Flutter 中的 ViewController 對應

在 UIKit 中，`ViewController` 代表使用者介面的一部分，最常用於一個螢幕或區段。這些 ViewController 可以組合在一起，構建複雜的使用者介面，並協助應用程式 UI 的擴展。在 Flutter 中，這個角色由元件（Widgets）負責。如同在「導覽」章節所述，Flutter 中的螢幕皆以元件（Widgets）表示，因為「一切皆元件！」。你可以使用`Navigator`在不同的`Route`之間切換，這些`Route`代表不同的螢幕、頁面，或是同一資料的不同狀態或呈現方式。

### 監聽生命週期事件

在 UIKit 中，你可以覆寫`ViewController`的方法以攔截視圖本身的生命週期事件，或是在`AppDelegate`中註冊生命週期回呼。在 Flutter 中並沒有這兩個概念，但你可以透過註冊`WidgetsBinding`觀察者，並監聽`didChangeAppLifecycleState()`變更事件來監聽生命週期事件。

可觀察的生命週期事件包括：

**`inactive`**
：應用程式處於非活動狀態，且不會接收使用者輸入。此事件僅適用於 iOS，Android 上沒有對應事件。

**`paused`**
：應用程式目前對使用者不可見，不會回應使用者輸入，但仍在背景執行。

**`resumed`**
：應用程式可見，且正在回應使用者輸入。

**`suspending`**
：應用程式暫時被掛起。iOS 平台沒有對應事件。

如需這些狀態的詳細說明，請參閱 [`AppLifecycleState` documentation][`AppLifecycleState` documentation]。

## 版面配置（Layouts）

本節將介紹 Flutter 中的不同版面配置方式，並與 UIKit 進行比較。

### 顯示清單檢視（List View）

在 UIKit 中，你可以用`UITableView`或`UICollectionView`來顯示清單。在 Flutter 中，則有類似的`ListView`實作。在 UIKit 中，這些視圖會有委派方法來決定列數、每個 index path 的 cell 內容，以及 cell 的尺寸。

由於 Flutter 採用不可變元件（immutable widget）模式，你只需將元件清單傳遞給`ListView`，Flutter 會自動確保滾動流暢且順暢。

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
在 Flutter 中，則使用傳入元件（Widgets）所提供的觸控處理功能。

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

在 UIKit 中，你會更新 list view 的資料，並使用 `reloadData` 方法通知 table 或 collection view。

在 Flutter 中，如果你在 `setState()` 內部更新 widget 清單，你會很快發現畫面上的資料沒有發生變化。  
這是因為當呼叫 `setState()` 時，Flutter 的渲染引擎會檢查 widget tree，判斷是否有任何變動。  
當它遍歷到你的 `ListView` 時，會執行一次 `==` 檢查，並判斷兩個 `ListView` 是相同的。  
既然沒有發現變化，就不會進行任何更新。

如果你想用簡單的方法來更新你的 `ListView`，可以在 `setState()` 內建立一個新的 `List`，  
然後將舊清單的資料複製到新清單中。  
這種做法雖然簡單，但不建議用於大型資料集，下一個範例會說明原因。

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

建議且高效、有效率的建立清單方式，是使用`ListView.Builder`。  
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

與其建立`ListView`，請建立`ListView.builder`，並帶入兩個主要參數：清單的初始長度，以及`ItemBuilder`函式。

`ItemBuilder`函式類似於 iOS 的 table 或 collection view 中的`cellForItemAt`委派方法，它會接收一個位置，並回傳你希望在該位置渲染的 cell。

最後，也是最重要的一點，請注意`onTap()`函式現在不會再重新建立清單，而是直接對其進行`.add`。

### 建立可捲動視圖

在 UIKit 中，你會將你的視圖包裹在`ScrollView`中，讓使用者在需要時可以捲動內容。

在 Flutter 中，最簡單的方式是使用`ListView`元件 (Widget)。它同時扮演`ScrollView`與 iOS `TableView`的角色，讓你可以以垂直方式排列元件。

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

如需更詳細的 Flutter 元件 (Widgets) 版面配置教學，請參閱 [layout tutorial][layout tutorial]。

## 手勢偵測與觸控事件處理

本節將說明如何在 Flutter 中偵測手勢與處理各種事件，並與 UIKit 進行比較。

### 新增點擊監聽器

在 UIKit 中，你會將 `GestureRecognizer` 附加到一個 view 來處理點擊事件。
在 Flutter 中，新增觸控監聽器有兩種方式：

1. 如果該元件 (Widget) 支援事件偵測，則可以傳入一個函式，並在該函式中處理事件。例如，`ElevatedButton` 元件有一個 `onPressed` 參數：

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

使用 `GestureDetector`，你可以監聽各種手勢事件，例如：

* **點擊（Tapping）**

  **`onTapDown`**
  ：一個可能會觸發點擊的指標已在特定位置接觸螢幕。

  **`onTapUp`**
  ：觸發點擊的指標已在特定位置離開螢幕。

  **`onTap`**
  ：發生了一次點擊。

  **`onTapCancel`**
  ：先前觸發 `onTapDown` 的指標將不會造成點擊。

* **雙擊（Double tapping）**

  **`onDoubleTap`**
  ：使用者在同一位置快速連續點擊兩次螢幕。

* **長按（Long pressing）**

  **`onLongPress`**
  ：指標在同一位置持續接觸螢幕一段較長時間。

* **垂直拖曳（Vertical dragging）**

  **`onVerticalDragStart`**
  ：指標已接觸螢幕，並可能開始垂直移動。

  **`onVerticalDragUpdate`**
  ：與螢幕接觸的指標已在垂直方向上進一步移動。

  **`onVerticalDragEnd`**
  ：先前與螢幕接觸並垂直移動的指標已不再接觸螢幕，並且在離開時具有特定速度。

* **水平拖曳（Horizontal dragging）**

  **`onHorizontalDragStart`**
  ：指標已接觸螢幕，並可能開始水平移動。

  **`onHorizontalDragUpdate`**
  ：與螢幕接觸的指標已在水平方向上進一步移動。

  **`onHorizontalDragEnd`**
  ：先前與螢幕接觸並水平移動的指標已不再接觸螢幕。

以下範例展示了一個 `GestureDetector`，當偵測到雙擊時會旋轉 Flutter 標誌：

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

Flutter 應用程式非常容易進行樣式設定；你可以在明亮與深色主題之間切換、變更文字和 UI 元件的樣式，還有更多功能。本節將介紹如何在 Flutter 應用程式中進行樣式設定，並比較在 UIKit 中如何達成相同效果。

### 使用主題

Flutter 預設即內建了美觀的 Material Design 實作，這涵蓋了許多你通常需要處理的樣式和主題化需求。

若要充分利用 Material 元件於你的應用程式中，請宣告一個頂層元件 `MaterialApp` 作為應用程式的進入點。  
`MaterialApp` 是一個便利元件，它包裝了多個在實作 Material Design 時常用的元件。  
它是在 `WidgetsApp` 的基礎上，加入了 Material 專屬的功能。

不過，Flutter 也足夠靈活且具表現力，能實作任何設計語言。在 iOS 上，你可以使用 [Cupertino library][Cupertino library] 來打造符合 [Human Interface Guidelines][Human Interface Guidelines] 的介面。  
如需完整的這些元件，請參考 [Cupertino widgets][Cupertino widgets] 展示頁。

你也可以將 `WidgetsApp` 作為你的應用程式元件，它提供部分相同的功能，但不如 `MaterialApp` 豐富。

若要自訂任何子元件的顏色與樣式，請將 `ThemeData` 物件傳入 `MaterialApp` 元件。  
例如，在下方的程式碼中，色彩方案（color scheme）以 deepPurple 為種子設定，分隔線顏色則設為灰色。

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

在 UIKit 中，你可以將任何 `ttf` 字型檔案匯入到你的專案中，並在 `info.plist` 檔案中建立參考。
在 Flutter 中，請將字型檔案放在一個資料夾中，並在 `pubspec.yaml` 檔案中參考它，
這個方式與匯入圖片類似。

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

除了字型之外，你還可以自訂`Text`元件（Widget）上的其他樣式元素。`Text`元件的 style 參數接收一個`TextStyle`物件，你可以在其中自訂許多參數，例如：

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

在 iOS 中，圖片（images）和資源（assets）被視為不同的項目，而 Flutter 應用程式只有資源（assets）。在 iOS 上放置於`Images.xcasset`資料夾中的資源，對於 Flutter 則放在 assets 資料夾中。和 iOS 一樣，資源可以是任何類型的檔案，不僅僅是圖片。例如，你可能會有一個位於`my-assets`資料夾中的 JSON 檔案：

```plaintext
my-assets/data.json
```

在 `pubspec.yaml` 檔案中宣告資源（asset）：

```yaml
assets:
 - my-assets/data.json
```

然後，您可以在程式碼中透過 [`AssetBundle`][`AssetBundle`] 來存取它：

<?code-excerpt "lib/asset_bundle.dart"?>
```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}
```

對於圖片，Flutter 採用類似 iOS 的簡單密度倍率格式。
圖片資源（images assets）可以是 `1.0x`、`2.0x`、`3.0x`，或任何其他倍率。
Flutter 的 [`devicePixelRatio`][`devicePixelRatio`] 表示單一邏輯像素中實體像素的比例。

資源（Assets）可以放在任意目錄中——
Flutter 沒有預設的資料夾結構。
你需要在 `pubspec.yaml` 檔案中宣告資源（包含其路徑），Flutter 會自動載入這些資源。

例如，若要將一張名為 `my_icon.png` 的圖片加入你的 Flutter 專案，你可以選擇將它存放在一個任意命名為 `images` 的資料夾中。
將基礎圖片（1.0x）放在 `images` 資料夾，其他不同倍率的版本則放在以對應倍率命名的子資料夾中：

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

如需更多細節，請參閱
[在 Flutter 中新增資源與圖片][Adding Assets and Images in Flutter]。

## 表單輸入

本節將說明如何在 Flutter 中使用表單，以及這與 UIKit 的比較。

### 取得使用者輸入

由於 Flutter 採用不可變元件（widgets）並將狀態分離，你可能會好奇使用者輸入在這樣的架構下該如何處理。在 UIKit 中，通常會在需要提交使用者輸入或對其進行操作時，直接查詢元件的當前值。那麼在 Flutter 中又是如何實現的呢？

實際上，表單的處理方式與 Flutter 中其他功能一樣，是透過專門的元件（Widgets）來完成。如果你有一個 `TextField` 或 `TextFormField`，可以提供一個 [`TextEditingController`][`TextEditingController`] 來取得使用者輸入：

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

你可以在 [Retrieve the value of a text field][Retrieve the value of a text field] 中找到更多資訊以及完整的程式碼範例。

### 文字欄位 (text field) 的預設提示文字

在 Flutter 中，你可以很容易地透過在 `Text` 元件（Widget）的 decoration 建構子參數中加入 `InputDecoration` 物件，來顯示「提示」或預設的佔位文字：

<?code-excerpt "lib/form.dart (input-hint)" replace="/return const //g;/;//g"?>
```dart
Center(
  child: TextField(decoration: InputDecoration(hintText: 'This is a hint')),
)
```

### 顯示驗證錯誤

就像你為「提示」所做的一樣，將 `InputDecoration` 物件
傳遞給 `Text` 元件（Widget）的 decoration 建構子。

然而，你不會一開始就顯示錯誤訊息。
相反地，當使用者輸入了無效資料時，
請更新狀態，並傳遞新的 `InputDecoration` 物件。

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

## 執行緒與非同步

本節將說明 Flutter 中的並行處理（concurrency），以及它與 UIKit 的比較。

### 撰寫非同步程式碼

Dart 採用單執行緒（single-threaded）的執行模型，並支援 `Isolate`（可讓 Dart 程式碼在其他執行緒上執行）、事件迴圈（event loop）以及非同步程式設計。除非你自行產生 `Isolate`，否則 Dart 程式碼都會在主 UI 執行緒上運行，並由事件迴圈所驅動。Flutter 的事件迴圈相當於 iOS 的主迴圈（main loop）——也就是附加在主執行緒上的 `Looper`。

Dart 的單執行緒模型並不代表你必須將所有操作都設為阻塞（blocking）而導致 UI 停滯。相反地，你可以善用 Dart 語言所提供的非同步功能，例如 `async`/`await`，來執行非同步工作。

舉例來說，你可以利用 `async`/`await` 來執行網路程式碼，而不會造成 UI 卡頓，讓 Dart 負責處理繁重的工作：

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

一旦`await`的網路呼叫完成後，
請呼叫`setState()`來更新 UI，
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

如需在背景執行工作的更多資訊，以及 Flutter 與 iOS 的差異，請參考下一節。

### 移動至背景執行緒

由於 Flutter 採用單執行緒並運行事件迴圈（類似 Node.js），你不需要擔心執行緒管理或自行建立背景執行緒。如果你正在執行 I/O 密集型工作，例如磁碟存取或網路呼叫，那麼你可以安全地使用 `async`/`await`，這樣就完成了。另一方面，如果你需要執行會大量佔用 CPU 的運算密集型工作，則應該將其移至 `Isolate`，以避免阻塞事件迴圈。

對於 I/O 密集型工作，請將該函式宣告為 `async` 函式，並在函式內部對長時間運行的任務使用 `await`：

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

這通常是你進行網路或資料庫呼叫的方式，這兩者都是 I/O 操作。

然而，有時你可能需要處理大量資料，導致 UI 卡住。在 Flutter 中，請使用 `Isolate` 來善用多核心 CPU 執行長時間或運算密集的任務。

Isolate（隔離執行緒）是獨立的執行緒，與主執行緒的記憶體堆完全不共享。這表示你無法從主執行緒存取變數，也無法透過呼叫 `setState()` 來更新 UI。Isolate 如其名所示，無法共享記憶體（例如靜態欄位等形式）。

以下範例展示如何在一個簡單的 isolate 中，將資料傳回主執行緒以更新 UI。

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

在這裡，`dataLoader()` 是在自己獨立執行緒中運行的 `Isolate`。  
在該 isolate 中，你可以執行更耗費 CPU 的處理（例如解析大型 JSON），或進行運算密集型的數學運算，例如加密或訊號處理。

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

在 Flutter 中發送網路請求非常容易，只要使用熱門的 [`http` 套件][`http` package] 即可。這個套件幫你封裝了許多你原本可能需要自行實作的網路處理邏輯，讓你可以更輕鬆地進行網路呼叫。

要將 `http` 套件加入為相依套件，只需執行 `flutter pub add`：

```console
flutter pub add http
```

要進行網路呼叫，
請在 `async` 函式的 `http.get()` 上呼叫 `await`：

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

在 UIKit 中，通常會在背景執行長時間任務時，使用`UIProgressView`。

在 Flutter 中，請使用`ProgressIndicator`元件 (Widget)。
透過布林旗標來控制何時渲染，程式化地顯示進度。
在長時間任務開始前，通知 Flutter 更新其狀態，任務結束後則隱藏它。

在下方範例中，`build` 函式被拆分為三個不同的函式。
如果`showLoadingDialog`為`true`（當`widgets.length == 0`時），則渲染`ProgressIndicator`。
否則，則以從網路呼叫取得的資料渲染`ListView`。

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
