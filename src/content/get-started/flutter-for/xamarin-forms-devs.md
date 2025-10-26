---
title: 給 Xamarin.Forms 開發者的 Flutter 指南
description: 學習如何將 Xamarin.Forms 開發經驗應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/xamarin_devs"?>

本文件適用於希望將現有知識應用於 Flutter 行動應用程式開發的 Xamarin.Forms 開發者。
如果你已經了解 Xamarin.Forms 框架的基本原理，
那麼你可以將本文件作為快速入門 Flutter 開發的參考。

你在 Android 和 iOS 上的知識與技能，
在使用 Flutter 開發時同樣非常有價值，
因為 Flutter 依賴於原生作業系統的設定方式，
這與你在設定原生 Xamarin.Forms 專案時的方式相似。
Flutter 框架也與 Xamarin.Forms 類似，都是建立一套單一 UI，
可在多個平台上共用。

本文件可作為食譜（cookbook）使用，你可以跳著閱讀，
尋找最符合你需求的問題與解答。

## 專案設定

### 應用程式如何啟動？

在 Xamarin.Forms 的每個平台中，
你會呼叫 `LoadApplication` 方法，
這個方法會建立一個新的應用程式並啟動你的 app。

```csharp
LoadApplication(new App());
```

在 Flutter 中，預設的主要進入點是 `main`，您可以在這裡載入您的 Flutter 應用程式。

<?code-excerpt "lib/main.dart (main)"?>
```dart
void main() {
  runApp(const MyApp());
}
```

在 Xamarin.Forms 中，您會將 `Page` 指派給 `Application` 類別中的 `MainPage` 屬性。

```csharp
public class App : Application
{
    public App()
    {
        MainPage = new ContentPage
        {
            Content = new Label
            {
                Text = "Hello World",
                HorizontalOptions = LayoutOptions.Center,
                VerticalOptions = LayoutOptions.Center
            }
        };
    }
}
```

在 Flutter 中，「一切皆為元件（Widget）」，即使是應用程式本身也是如此。
以下範例展示了 `MyApp`，這是一個簡單的應用程式 `Widget`。

<?code-excerpt "lib/main.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  /// This widget is the root of your application.
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Hello World!', textDirection: TextDirection.ltr),
    );
  }
}
```

### 如何建立一個頁面？

Xamarin.Forms 有許多不同類型的頁面；`ContentPage` 是最常見的類型。
在 Flutter 中，你需要指定一個應用程式元件（Widget），用來承載你的根頁面。
你可以使用 [`MaterialApp`][`MaterialApp`] 元件（Widget），它支援 [Material Design][Material Design]；
或者你可以使用 [`CupertinoApp`][`CupertinoApp`] 元件（Widget），它支援 iOS 風格的應用程式；
你也可以使用較低階的 [`WidgetsApp`][`WidgetsApp`]，並根據你的需求進行任何自訂。

[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html

以下程式碼定義了一個首頁，這是一個有狀態元件（Stateful widget）。
在 Flutter 中，所有元件（Widget）都是不可變的（immutable），
但支援兩種類型的元件：_有狀態_（Stateful）和 _無狀態_（Stateless）。
無狀態元件（Stateless widget）的例子有標題、圖示或圖片等。

以下範例使用 `MaterialApp`，
它會將根頁面存放在 `home` 屬性中。

<?code-excerpt "lib/page.dart (my-app)"?>
```dart
class MyApp extends StatelessWidget {
  /// This widget is the root of your application.
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

從這裡開始，你的實際第一個頁面會是另一個 `Widget`，
在這裡你可以建立你的狀態（state）。

像下面的 `MyHomePage` 這樣的 _有狀態元件（Stateful Widget）_，由兩個部分組成。
第一部分本身是不可變的（immutable），它會建立一個 `State` 物件，
用來保存該物件的狀態。`State` 物件會在元件（Widget）生命週期中持續存在。

<?code-excerpt "lib/page.dart (my-home-page)"?>
```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}
```

`State` 物件為 stateful widget（有狀態元件）實作了 `build()` 方法。

當元件樹（widget tree）的狀態發生變化時，請呼叫 `setState()`，這會觸發該部分 UI 的重新建構（build）。請務必僅在必要時呼叫 `setState()`，而且只針對已變更的元件樹部分，否則可能導致 UI 效能不佳。

<?code-excerpt "lib/page.dart (my-home-page-state)"?>
```dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set the appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

在 Flutter 中，UI（也稱為元件樹，widget tree）是不可變的，  
這表示一旦建立後，你無法直接改變其狀態。  
你需要在你的 `State` 類別中變更欄位，然後呼叫 `setState()`  
以重新建立整個元件樹。

這種產生 UI 的方式和 Xamarin.Forms 不同，  
但這種方法有許多優點。

## 視圖（Views）

### Flutter 中對應 Page 或 Element 的是什麼？

:::secondary
react 風格，或稱為 _宣告式_（declarative）程式設計，和傳統的命令式（imperative）風格有什麼不同？  
如需比較，請參閱 [Introduction to declarative UI][Introduction to declarative UI]。
:::

`ContentPage`、`TabbedPage`、`FlyoutPage` 都是你在 Xamarin.Forms 應用程式中可能會用到的頁面類型。  
這些頁面會包含 `Element` 來顯示各種控制項。  
在 Xamarin.Forms 中，`Entry` 或 `Button` 都是 `Element` 的例子。

在 Flutter 中，幾乎所有東西都是元件（Widget）。  
`Page`，在 Flutter 中稱為 `Route`，也是一個元件。  
按鈕、進度條、動畫控制器等也都是元件。  
當你建立一個路由時，你會建立一個元件樹。

Flutter 包含了 [Material 元件 (Material components)][Material Components] 函式庫。  
這些元件實作了 [Material Design 指南][Material Design guidelines]。  
Material Design 是一套靈活的設計系統，  
[針對所有平台進行最佳化][optimized for all platforms]，包括 iOS。

但 Flutter 具有足夠的彈性與表現力，  
可以實現任何設計語言。  
例如，在 iOS 上，你可以使用 [Cupertino 元件 (Widgets)][Cupertino widgets]  
來打造外觀符合 [Apple 的 iOS 設計語言][Apple's iOS design language] 的介面。

### 如何更新元件（Widgets）？

在 Xamarin.Forms 中，每個 `Page` 或 `Element` 都是有狀態的類別，  
擁有屬性與方法。  
你可以透過更新屬性來更新你的 `Element`，  
這些變更會向下傳遞到原生控制項。

在 Flutter 中，`Widget` 是不可變的，你無法直接透過更改屬性來更新它們，  
而是必須與元件的狀態（state）一起運作。

這就是 Stateful 與 Stateless 元件概念的由來。  
`StatelessWidget` 顧名思義——  
就是沒有狀態資訊的元件。

`StatelessWidgets` 在你描述的 UI 部分  
只依賴於物件中的設定資訊時非常有用。

例如，在 Xamarin.Forms 中，這類似於  
放置一個帶有你 Logo 的 `Image`。  
Logo 在執行期間不會改變，  
因此在 Flutter 中應使用 `StatelessWidget`。

如果你想根據 HTTP 請求後取得的資料或使用者互動來動態改變 UI，  
那麼你就必須使用 `StatefulWidget`，  
並告訴 Flutter 框架該元件的 `State` 已被更新，  
以便它可以更新該元件。

這裡要注意的重要一點是，  
無論是無狀態還是有狀態元件，本質上行為都一樣。  
它們每一幀都會重建，差別在於  
`StatefulWidget` 擁有一個 `State` 物件，  
可在多個幀之間儲存狀態資料並恢復它。

如果你不確定，請記住這個原則：如果一個元件會改變  
（例如因為使用者互動），那它就是有狀態的。  
但如果一個元件只是對變化做出反應，而其父元件本身不會因變化而改變，則父元件仍可為無狀態。

以下範例展示如何使用 `StatelessWidget`。  
一個常見的 `StatelessWidget` 是 `Text` 元件。  
如果你查看 `Text` 元件的實作，  
會發現它是繼承自 `StatelessWidget`。

<?code-excerpt "lib/views.dart (text)" replace="/return //g"?>
```dart
const Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

如你所見，`Text` 元件（Widget）本身沒有任何狀態資訊，
它只會根據建構函式中傳入的內容進行渲染，除此之外不會有其他行為。

但如果你希望「I Like Flutter」這段文字能夠動態變化，
例如，當點擊 `FloatingActionButton` 時改變內容，該怎麼做呢？

要達成這個目的，可以將 `Text` 元件（Widget）包裹在 `StatefulWidget` 中，
並在使用者點擊按鈕時進行更新，
如下方範例所示：

<?code-excerpt "lib/views_stateful.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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
  /// Default placeholder text
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

### 我該如何排版我的元件（Widgets）？有對應的 XAML 檔案嗎？

在 Xamarin.Forms 中，大多數開發者會使用 XAML 來撰寫版面配置，有時也會用 C#。  
而在 Flutter 中，你會以程式碼的方式，透過元件樹（widget tree）來撰寫你的版面配置。

以下範例展示如何顯示一個帶有內距（padding）的簡單元件：

<?code-excerpt "lib/padding.dart (padding)"?>
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

你可以在 [widget catalog][widget catalog] 中查看 Flutter 所提供的各種版面配置元件 (Layout widgets)。

### 如何在我的版面配置中新增或移除元素？

在 Xamarin.Forms 中，你需要在程式碼中新增或移除 `Element`。這通常涉及設定 `Content` 屬性，或如果是清單，則呼叫 `Add()` 或 `Remove()`。

在 Flutter 中，由於元件（Widgets）是不可變的，因此沒有直接對應的做法。相對地，你可以傳遞一個回傳元件（Widget）的函式給父元件，並透過布林旗標來控制該子元件的建立。

以下範例展示了當使用者點擊 `FloatingActionButton` 時，如何在兩個元件（Widget）之間切換顯示：

<?code-excerpt "lib/views.dart (add-remove-element)"?>
```dart
class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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
  /// Default value for toggle
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

### 如何為元件（Widget）加入動畫（Animation）？

在 Xamarin.Forms 中，你可以使用 ViewExtensions 來建立簡單的動畫（Animation），其中包含像是 `FadeTo` 和 `TranslateTo` 這類方法。
你可以在某個 view 上呼叫這些方法，以執行所需的動畫效果。

```xml
<Image Source="{Binding MyImage}" x:Name="myImage" />
```

然後在後端程式碼（code behind）或行為（behavior）中，這將會在 1 秒的時間內淡入該圖片。

```csharp
myImage.FadeTo(0, 1000);
```

在 Flutter 中，你可以使用動畫函式庫來為元件添加動畫效果，方法是將元件包裹在動畫元件內。

你可以使用 `AnimationController`，這是一種 `Animation<double>`，能夠暫停、尋找（seek）、停止以及反轉動畫。

它需要一個 `Ticker`，這個物件會在 vsync 發生時發出訊號，並且在動畫執行期間，每一幀都會產生 0 到 1 之間的線性插值。

接著，你可以建立一個或多個 `Animation`，並將它們附加到 controller 上。

舉例來說，你可以使用 `CurvedAnimation` 來沿著插值曲線實現動畫。

在這個意義上，controller 是動畫進度的「主控」來源，而 `CurvedAnimation` 則計算取代 controller 預設線性運動的曲線。

和元件一樣，Flutter 中的動畫也是透過組合（composition）來運作。

在建立元件樹時，你可以將 `Animation` 指定給元件的動畫屬性，例如 `FadeTransition` 的透明度，然後指示 controller 啟動動畫。

以下範例展示如何撰寫一個 `FadeTransition`，當你按下 `FloatingActionButton` 時，讓元件淡入顯示 logo：

<?code-excerpt "lib/animation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  /// This widget is the root of your application.
  const FadeAppTest({super.key});

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

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  late final AnimationController controller;
  late final CurvedAnimation curve;

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

### 如何在螢幕上繪製/繪畫？

Xamarin.Forms 並沒有內建直接在螢幕上繪製的方式。
如果需要自訂圖片繪製，許多人會使用 SkiaSharp。
在 Flutter 中，你可以直接存取 Skia Canvas，
並且可以輕鬆地在螢幕上繪製。

Flutter 有兩個協助你在 canvas 上繪製的類別：`CustomPaint`
以及 `CustomPainter`，後者則是實作你的繪製演算法來繪製到 canvas 上。

若想了解如何在 Flutter 中實作簽名繪製器，
請參考 Collin 在[自訂繪製 (Custom Paint)][Custom Paint]的解答。

[Custom Paint]: {{site.so}}/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter


<?code-excerpt "lib/draw.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: DemoApp()));
}

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
  List<Offset?> _points = <Offset?>[];

  void _onPanUpdate(DragUpdateDetails details) {
    setState(() {
      final RenderBox referenceBox = context.findRenderObject() as RenderBox;
      final Offset localPosition = referenceBox.globalToLocal(
        details.globalPosition,
      );
      _points = List.from(_points)..add(localPosition);
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: _onPanUpdate,
      onPanEnd: (details) => _points.add(null),
      child: CustomPaint(
        painter: SignaturePainter(_points),
        size: Size.infinite,
      ),
    );
  }
}

class SignaturePainter extends CustomPainter {
  const SignaturePainter(this.points);

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

### 元件的透明度在哪裡？

在 Xamarin.Forms 中，所有的 `VisualElement` 都有 Opacity 屬性。
在 Flutter 中，則需要將元件（Widget）包裹在
[`Opacity` 元件（Widget）][`Opacity` widget] 中來達成相同效果。

### 如何建立自訂元件（Widget）？

在 Xamarin.Forms 中，通常會繼承 `VisualElement`，
或使用現有的 `VisualElement`，以覆寫和
實作方法來達到所需的行為。

在 Flutter 中，建立自訂元件（Widget）時，會透過[組合][composing]
較小的元件（Widget）（而不是繼承它們）。
這有點類似於基於 `Grid` 實作自訂控制項，
並加入多個 `VisualElement`，同時擴充自訂邏輯。

舉例來說，若要建立一個
在建構函式中接收標籤（label）的 `CustomButton`，
可以建立一個 CustomButton，並組合一個帶有標籤的 `ElevatedButton`，
而不是繼承 `ElevatedButton`：

<?code-excerpt "lib/custom_button.dart (custom-button)"?>
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

然後就可以像使用其他 Flutter 元件（Widgets）一樣使用 `CustomButton`：

<?code-excerpt "lib/custom_button.dart (use-custom-button)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Center(child: CustomButton('Hello'));
}
```

## 導覽

### 如何在頁面之間進行導覽？

在 Xamarin.Forms 中，`NavigationPage` 類別
提供了階層式的導覽體驗，
讓使用者能夠在頁面之間前進與返回。

Flutter 也有類似的實作，
使用 `Navigator` 和 `Routes`。
`Route` 是應用程式 `Page` 的一種抽象，
而 `Navigator` 則是一個管理路由的 [元件 (Widget)][widget]。

一個路由大致上對應到一個 `Page`。
Navigator 的運作方式與 Xamarin.Forms 的 `NavigationPage` 類似，
也就是說它可以根據你想要導覽到某個檢視或返回時，
`push()` 和 `pop()` 路由。

要在頁面之間導覽，你有幾種選擇：

* 指定一個路由名稱的 `Map`。（`MaterialApp`）
* 直接導覽到某個路由。（`WidgetsApp`）

以下範例建立了一個 `Map`。

<?code-excerpt "lib/navigation.dart (main)"?>
```dart
void main() {
  runApp(
    MaterialApp(
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

透過將其名稱推送到`Navigator`，即可導向至指定的命名路由。

<?code-excerpt "lib/navigation.dart (push-named)"?>
```dart
Navigator.of(context).pushNamed('/b');
```

`Navigator` 是一個堆疊（stack），用來管理您應用程式的路由（Route）。
將一個路由推入堆疊（push）會切換到該路由。
從堆疊中彈出（pop）一個路由，則會返回到前一個路由。
這是透過等待 `push()` 所回傳的 `Future` 來完成的。

`async`/`await` 與 .NET 的實作非常相似，
並在 [Async UI][Async UI] 有更詳細的說明。

舉例來說，若要啟動一個讓使用者選擇位置的 `location` 路由，
您可以這樣做：

<?code-excerpt "lib/navigation.dart (await)"?>
```dart
Object? coordinates = await Navigator.of(context).pushNamed('/location');
```

然後，在你的 `location` 路由內，當使用者選擇好他們的位置後，使用 pop 將堆疊彈出並帶回結果：

<?code-excerpt "lib/navigation.dart (pop-location)"?>
```dart
Navigator.of(context).pop({'lat': 43.821757, 'long': -79.226392});
```

### 如何導向到另一個應用程式？

在 Xamarin.Forms 中，若要將使用者導向到另一個應用程式，
你會使用特定的 URI scheme，並透過 `Device.OpenUrl("mailto://")` 來實現。

若要在 Flutter 中實作這個功能，
你可以建立原生平台整合，或使用[現有的套件][existing plugin]，
例如[`url_launcher`][`url_launcher`]，這類套件與許多其他套件都可在 [pub.dev][pub.dev] 上取得。

## 非同步 UI

### Flutter 中有什麼對應於 Device.BeginOnMainThread() 的功能？

Dart 採用單執行緒執行模型，
同時支援 `Isolate`（讓 Dart 程式碼在另一個執行緒上執行的方式），
事件迴圈，以及非同步程式設計。
除非你啟動了一個 `Isolate`，
否則 Dart 程式碼會在主 UI 執行緒上執行，
並由事件迴圈驅動。

Dart 的單執行緒模型並不代表你必須將所有操作
都當作阻塞式操作來執行，導致 UI 卡住。
就像 Xamarin.Forms 一樣，你需要保持 UI 執行緒的暢通。
你可以使用 `async`/`await` 來執行需要等待回應的任務。

在 Flutter 中，請善用 Dart 語言所提供的非同步功能，
同樣稱為 `async`/`await`，來執行非同步作業。
這與 C# 非常類似，對於任何 Xamarin.Forms 開發者來說都很容易上手。

舉例來說，你可以使用 `async`/`await` 來執行網路程式碼，
讓 Dart 處理繁重的工作，而不會造成 UI 停頓：

<?code-excerpt "lib/data.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

當等待的網路呼叫完成後，
請透過呼叫 `setState()` 來更新 UI，
這會觸發元件（Widget）子樹的重建並更新資料。

以下範例會以非同步方式載入資料，
並將其顯示在 `ListView` 中：

<?code-excerpt "lib/data.dart"?>
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

請參考下一節以取得更多關於在背景執行工作的資訊，以及 Flutter 與 Android 的差異。

### 如何將工作移至背景執行緒？

由於 Flutter 是單執行緒並運行事件迴圈，你不需要擔心執行緒管理或建立背景執行緒。這點與 Xamarin.Forms 非常相似。如果你正在進行 I/O 密集型的工作，例如磁碟存取或網路呼叫，那麼你可以安全地使用 `async`/`await`，這樣就可以了。

另一方面，如果你需要進行計算密集型的工作，會讓 CPU 持續忙碌，則應該將這些工作移到 `Isolate`，以避免阻塞事件迴圈，就像你會將任何類型的工作移出主執行緒一樣。這與你在 Xamarin.Forms 中透過 `Task.Run()` 將工作移至不同執行緒的做法類似。

對於 I/O 密集型的工作，只需將函式宣告為 `async` 函式，並在函式內對長時間執行的任務使用 `await`：

<?code-excerpt "lib/data.dart (load-data)"?>
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

然而，有時你可能需要處理大量資料，導致 UI 停滯。在 Flutter 中，可以使用 `Isolate` 來善用多核心 CPU，執行長時間或運算密集的任務。

Isolates（隔離區）是獨立的執行緒，與主執行記憶體堆（main execution memory heap）不共享任何記憶體。這與 `Task.Run()` 有所不同。這代表你無法存取主執行緒的變數，或透過呼叫 `setState()` 來更新 UI。

以下範例展示如何在一個簡單的 isolate 中，將資料回傳給主執行緒以更新 UI。

<?code-excerpt "lib/isolates.dart (simple-isolate)"?>
```dart
Future<void> loadData() async {
  final ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  final SendPort sendPort = await receivePort.first as SendPort;
  final List<Map<String, dynamic>> msg = await sendReceive(
    sendPort,
    'https://jsonplaceholder.typicode.com/posts',
  );
  setState(() {
    data = msg;
  });
}

// The entry point for the isolate
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

在這裡，`dataLoader()` 是運行於自己獨立執行緒中的 `Isolate`。  
在該 isolate 中，你可以執行更耗費 CPU 的處理（例如解析大型 JSON），或進行計算密集型的數學運算，例如加密或訊號處理。

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

    // The 'echo' isolate sends its SendPort as the first message
    final SendPort sendPort = await receivePort.first as SendPort;
    final List<Map<String, dynamic>> msg = await sendReceive(
      sendPort,
      'https://jsonplaceholder.typicode.com/posts',
    );
    setState(() {
      data = msg;
    });
  }

  // The entry point for the isolate
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
      body: getBody(),
    );
  }
}
```

### 如何進行網路請求？

在 Xamarin.Forms 中，你會使用 `HttpClient`。
當你在 Flutter 中使用熱門的 [`http` 套件][`http` package] 時，
進行網路呼叫變得非常簡單。
這個套件幫你封裝了許多原本需要自行實作的網路處理細節，
讓你可以輕鬆地進行網路請求。

要使用 `http` 套件，請將其加入你的 `pubspec.yaml` 依賴項中：

```yaml
dependencies:
  http: ^1.4.0
```

若要發送網路請求，請在 `async` 函式 `http.get()` 上呼叫 `await`：

<?code-excerpt "lib/data.dart (load-data)"?>
```dart
Future<void> loadData() async {
  final Uri dataURL = Uri.parse('https://jsonplaceholder.typicode.com/posts');
  final http.Response response = await http.get(dataURL);
  setState(() {
    data = (jsonDecode(response.body) as List).cast<Map<String, Object?>>();
  });
}
```

### 如何顯示長時間執行任務的進度？

在 Xamarin.Forms 中，你通常會建立一個載入指示器（loading indicator），
可以直接在 XAML 中建立，或是透過第三方套件（如 AcrDialogs）來實現。

在 Flutter 中，請使用 `ProgressIndicator` 元件（Widget）。
你可以透過布林旗標來控制何時渲染，程式化地顯示進度。
在長時間任務開始前，通知 Flutter 更新其狀態以顯示進度指示器，
任務結束後則隱藏它。

在下方範例中，build 函式被拆分為三個不同的函式。
如果 `showLoadingDialog` 為 `true`
（當 `widgets.length == 0` 時），則渲染 `ProgressIndicator`。
否則，則以從網路呼叫取得的資料渲染 `ListView`。

<?code-excerpt "lib/loading.dart"?>
```dart
import 'dart:async';
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
      body: getBody(),
    );
  }
}
```

## 專案結構與資源

### 我應該將圖片檔案存放在哪裡？

Xamarin.Forms 沒有平台無關的圖片存放方式，
你必須將圖片放在 iOS 的 `xcasset` 資料夾，
或是在 Android 的各個 `drawable` 資料夾中。

雖然 Android 和 iOS 將資源（resources）與資產（assets）視為不同的項目，
但 Flutter 應用程式只有資產（assets）。
所有原本放在 Android
`Resources/drawable-*` 資料夾中的資源，
在 Flutter 中都會放在 assets 資料夾下。

Flutter 採用與 iOS 類似的簡單密度（density）格式。
資產（assets）可以是 `1.0x`、`2.0x`、`3.0x` 或任何其他倍率。
Flutter 沒有 `dp`，但有邏輯像素（logical pixels），
這基本上等同於裝置無關像素（device-independent pixels）。
Flutter 的 [`devicePixelRatio`][`devicePixelRatio`] 代表
單一邏輯像素所對應的實體像素比例。

對應於 Android 密度分組（density buckets）的關係如下：

| Android density qualifier | Flutter pixel ratio |
|---------------------------|---------------------|
| `ldpi`                    | `0.75x`             |
| `mdpi`                    | `1.0x`              |
| `hdpi`                    | `1.5x`              |
| `xhdpi`                   | `2.0x`              |
| `xxhdpi`                  | `3.0x`              |
| `xxxhdpi`                 | `4.0x`              |

資產（assets）可以放在任意資料夾&mdash;
Flutter 沒有預設的資料夾結構。
你需要在 `pubspec.yaml` 檔案中宣告資產（包含路徑），Flutter 會自動載入。

舉例來說，若要在 Flutter 專案中新增一個名為 `my_icon.png` 的圖片資產，
並決定將它放在一個我們隨意命名為 `images` 的資料夾，
你會將基礎圖片（1.0x）放在 `images` 資料夾中，
而其他倍率的圖片則放在以對應倍率命名的子資料夾下：

```plaintext
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

接下來，你需要在`pubspec.yaml`檔案中宣告這些圖片：

```yaml
assets:
 - images/my_icon.png
```

你可以直接在`Image.asset`元件（Widget）中存取你的圖片（images）：

<?code-excerpt "lib/images.dart (image-asset)"?>
```dart
@override
Widget build(BuildContext context) {
  return Image.asset('images/my_icon.png');
}
```

或使用 `AssetImage`：

<?code-excerpt "lib/images.dart (asset-image)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Image(image: AssetImage('images/my_image.png'));
}
```

更詳細的資訊請參見 [Adding assets and images][Adding assets and images]。

### 我應該將字串存放在哪裡？如何處理在地化（localization）？

與 .NET 使用 `resx` 檔案不同，
Flutter 目前尚未有專門處理字串的系統。
目前的最佳做法是將你的文案字串
宣告在一個類別中作為 static 欄位，並從該處存取。例如：

<?code-excerpt "lib/strings.dart (strings-class)"?>
```dart
class Strings {
  static const String welcomeMessage = 'Welcome To Flutter';
}
```

你可以這樣存取你的字串：

<?code-excerpt "lib/strings.dart (access-string)" replace="/return const //g"?>
```dart
Text(Strings.welcomeMessage);
```

預設情況下，Flutter 只支援美式英文（US English）字串。
如果你需要支援其他語言，請加入 `flutter_localizations` 套件。
你可能也需要加入 Dart 的 [`intl`][`intl`] 套件，以使用國際化（i10n）相關功能，例如日期／時間格式化。

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any # Use version of intl from flutter_localizations.
```

要使用 `flutter_localizations` 套件，
請在應用程式元件（Widget）上指定 `localizationsDelegates` 和
`supportedLocales`：

<?code-excerpt "lib/strings.dart (localization)"?>
```dart
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

委派（delegates）包含實際的在地化值，而`supportedLocales`則定義了應用程式支援哪些語系（locale）。上面的範例使用了`MaterialApp`，因此同時包含了`GlobalWidgetsLocalizations`（用於基礎元件（Widgets）的在地化值）以及`MaterialWidgetsLocalizations`（用於 Material 元件（Widgets）的在地化值）。如果你的應用程式使用`WidgetsApp`，則不需要後者。請注意，這兩個委派都包含「預設」值，但如果你希望自己的應用程式內容也能被在地化，則必須額外提供一個或多個委派來處理自訂的可在地化內容。

初始化時，`WidgetsApp`（或`MaterialApp`）會根據你指定的委派，為你建立一個[`Localizations`][`Localizations`]元件（Widget）。你可以隨時從目前 context 中的`Localizations`元件（Widget）取得裝置目前的語系（以`Locale`物件的形式），或是透過[`Window.locale`][`Window.locale`]來取得。

若要存取在地化資源，可以使用`Localizations.of()`方法，取得由特定委派所提供的在地化類別。使用[`intl_translation`][`intl_translation`]套件，可以將可翻譯內容匯出為[arb][arb]檔案進行翻譯，再匯入回應用程式中，搭配`intl`使用。

如需更多 Flutter 國際化與在地化的詳細資訊，請參閱[國際化指南][internationalization guide]，其中包含有與沒有`intl`套件的範例程式碼。

### 我的專案檔案在哪裡？

在 Xamarin.Forms 中，你會有一個`csproj`檔案。Flutter 中最接近的對應檔案是 pubspec.yaml（設定檔），其中包含套件相依性與各種專案細節。類似於 .NET Standard，同一目錄下的檔案都被視為專案的一部分。

### Nuget 的對應物是什麼？我要如何加入相依性？

在 .NET 生態系中，原生 Xamarin 專案與 Xamarin.Forms 專案都能使用 Nuget 及內建的套件管理系統。Flutter 應用程式同時包含原生 Android 應用、原生 iOS 應用以及 Flutter 應用。

在 Android 中，你會將相依性加入 Gradle build script。在 iOS 中，則是加入`Podfile`。

Flutter 採用 Dart 自己的建置系統與 Pub 套件管理工具。工具會將原生 Android 與 iOS 外掛應用的建置委託給各自的建置系統。

一般來說，請使用`pubspec.yaml`來宣告 Flutter 所需的外部相依套件。尋找 Flutter 套件的好地方是 [pub.dev][pub.dev]。

## 應用程式生命週期

### 我要如何監聽應用程式生命週期事件？

在 Xamarin.Forms 中，你有`Application`，其中包含`OnStart`、`OnResume`和`OnSleep`。在 Flutter 中，你可以透過監聽`WidgetsBinding`觀察者（observer），並監聽`didChangeAppLifecycleState()`變更事件，來達到類似的生命週期監聽效果。

可觀察的生命週期事件如下：

`inactive`
: 應用程式處於非活動狀態，且不會接收使用者輸入。此事件僅適用於 iOS。

`paused`
: 應用程式目前對使用者不可見，不會回應使用者輸入，但仍在背景執行。

`resumed`
: 應用程式可見並且正在回應使用者輸入。

`suspending`
: 應用程式暫時被掛起。此事件僅適用於 Android。

關於這些狀態的詳細說明，請參閱[`AppLifecycleStatus`文件][`AppLifecycleStatus` documentation]。

[`AppLifecycleStatus` documentation]: {{site.api}}/flutter/dart-ui/AppLifecycleState.html

## 版面配置（Layouts）

### StackLayout 的對應物是什麼？

在 Xamarin.Forms 中，你可以建立`StackLayout`，其`Orientation`可設定為水平（horizontal）或垂直（vertical）。Flutter 採用類似的方式，不過你會使用`Row`或`Column`元件（Widgets）。

你會發現這兩個程式碼範例除了`Row`與`Column`元件（Widget）不同外，其餘完全相同。children 也一樣，這個特性可以用來開發豐富的版面配置，並且能隨著時間變化而重複利用相同的 children。

<?code-excerpt "lib/layouts.dart (row)"?>
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

<?code-excerpt "lib/layouts.dart (column)"?>
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
```

### Grid 的對應元件是什麼？

`Grid` 在 Flutter 中最接近的對應元件是 `GridView`。
這個元件比你在 Xamarin.Forms 中習慣使用的功能更為強大。
`GridView` 當內容超出可視範圍時，會自動提供滾動功能。

<?code-excerpt "lib/layouts.dart (grid)"?>
```dart
@override
Widget build(BuildContext context) {
  return GridView.count(
    // Create a grid with 2 columns. If you change the scrollDirection to
    // horizontal, this would produce 2 rows.
    crossAxisCount: 2,
    // Generate 100 widgets that display their index in the list.
    children: List<Widget>.generate(100, (index) {
      return Center(
        child: Text(
          'Item $index',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      );
    }),
  );
}
```

你可能曾在 Xamarin.Forms 中使用 `Grid` 來實作覆蓋於其他元件（Widgets）上的元件。在 Flutter 中，你可以使用 `Stack` 元件（Widget）來達成相同的效果。

以下範例會建立兩個彼此重疊的圖示。

<?code-excerpt "lib/layouts.dart (stack)"?>
```dart
@override
Widget build(BuildContext context) {
  return const Stack(
    children: <Widget>[
      Icon(Icons.add_box, size: 24, color: Colors.black),
      Positioned(
        left: 10,
        child: Icon(Icons.add_circle, size: 24, color: Colors.black),
      ),
    ],
  );
}
```

### ScrollView 的對應元件是什麼？

在 Xamarin.Forms 中，`ScrollView` 會包覆 `VisualElement`，
如果內容超過裝置螢幕大小，就會出現捲動效果。

在 Flutter 中，最接近的對應元件是 `SingleChildScrollView` 元件 (Widget)。
你只需要將想要可捲動的內容放入該元件即可。

<?code-excerpt "lib/layouts.dart (scroll-view)"?>
```dart
@override
Widget build(BuildContext context) {
  return const SingleChildScrollView(child: Text('Long Content'));
}
```

如果你有許多項目需要包裹在可滾動區域中，即使這些項目是不同的`Widget`類型，你可能會想要使用`ListView`。這看起來或許有點大材小用，但在 Flutter 中，這種方式比 Xamarin.Forms 的`ListView`更加優化且資源消耗更低，因為 Xamarin.Forms 的`ListView`是依賴於平台特定的控制項。

<?code-excerpt "lib/layouts.dart (list-view)"?>
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

### 如何在 Flutter 中處理橫向（landscape）螢幕轉換？

橫向螢幕轉換可以透過在 AndroidManifest.xml 中設定 `configChanges` 屬性來自動處理：

```xml
<activity android:configChanges="orientation|screenSize" />
```

## 手勢偵測與觸控事件處理

### 如何在 Flutter 中為元件（Widget）加入 GestureRecognizers？

在 Xamarin.Forms 中，`Element` 可能包含可供綁定的 click 事件。
許多元素也包含與此事件綁定的 `Command`。
或者你也可以使用 `TapGestureRecognizer`。
在 Flutter 中，有兩種非常類似的方式：

1. 如果該元件（Widget）支援事件偵測，可以直接傳入一個函式，並在該函式中處理。例如，ElevatedButton 有一個 `onPressed` 參數：

   <?code-excerpt "lib/gestures.dart (elevated-button)"?>
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

2. 如果該元件（Widget）本身不支援事件偵測，可以將該元件包裹在`GestureDetector`中，並將函式傳遞給`onTap`參數。

   <?code-excerpt "lib/gestures.dart (gesture-detector)"?>
   ```dart
   class SampleApp extends StatelessWidget {
     const SampleApp({super.key});
   
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

在 Xamarin.Forms 中，你會將 `GestureRecognizer` 加到 `View` 上。
通常你只能使用 `TapGestureRecognizer`、
`PinchGestureRecognizer`、`PanGestureRecognizer`、`SwipeGestureRecognizer`、
`DragGestureRecognizer` 和 `DropGestureRecognizer`，除非你自行實作。

在 Flutter 中，透過 GestureDetector，
你可以監聽各種手勢，例如：

* 點擊（Tap）

`onTapDown`
：一個可能觸發點擊的指標
  已經在特定位置接觸螢幕。

`onTapUp`
：觸發點擊的指標
  已經在特定位置離開螢幕。

`onTap`
：已發生一次點擊。

`onTapCancel`
：先前觸發 `onTapDown` 的指標
  不會再觸發點擊。

* 雙擊（Double tap）

`onDoubleTap`
：使用者在同一位置快速連續點擊兩次螢幕。

* 長按（Long press）

`onLongPress`
：指標在同一位置長時間接觸螢幕。

* 垂直拖曳（Vertical drag）

`onVerticalDragStart`
：指標已接觸螢幕，可能會開始垂直移動。

`onVerticalDragUpdate`
：與螢幕接觸的指標
  已經在垂直方向上移動更遠。

`onVerticalDragEnd`
：原本與螢幕接觸並垂直移動的指標
  現在已離開螢幕，且離開時具有特定速度。

* 水平拖曳（Horizontal drag）

`onHorizontalDragStart`
：指標已接觸螢幕，可能會開始水平移動。

`onHorizontalDragUpdate`
：與螢幕接觸的指標
  已經在水平方向上移動更遠。

`onHorizontalDragEnd`
：原本與螢幕接觸並水平移動的指標
  現在已離開螢幕，且離開時具有特定速度。

以下範例展示了一個 `GestureDetector`，
在雙擊時會旋轉 Flutter 標誌：

<?code-excerpt "lib/gestures.dart (rotating-flutter-detector)"?>
```dart
class RotatingFlutterDetector extends StatefulWidget {
  const RotatingFlutterDetector({super.key});

  @override
  State<RotatingFlutterDetector> createState() =>
      _RotatingFlutterDetectorState();
}

class _RotatingFlutterDetectorState extends State<RotatingFlutterDetector>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller;
  late final CurvedAnimation curve;

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

## ListView 和 adapter

### Flutter 中對應於 ListView 的是什麼？

Flutter 中對應於 `ListView` 的就是……`ListView`！

在 Xamarin.Forms 的 `ListView` 中，你會建立一個 `ViewCell`，可能還有一個 `DataTemplateSelector`，然後將它傳遞給 `ListView`，由它根據你的 `DataTemplateSelector` 或 `ViewCell` 回傳的內容來渲染每一列。不過，你通常必須確保啟用 Cell Recycling，否則會遇到記憶體問題以及滾動速度變慢的情況。

由於 Flutter 採用不可變元件（Widget）模式，你只需將元件（Widget）清單傳遞給 `ListView`，Flutter 會自動處理確保滾動流暢且快速。

<?code-excerpt "lib/listview.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Sample App', home: SampleAppPage());
  }
}

class SampleAppPage extends StatelessWidget {
  const SampleAppPage({super.key});

  List<Widget> _getListData() {
    return List<Widget>.generate(
      100,
      (index) =>
          Padding(padding: const EdgeInsets.all(10), child: Text('Row $index')),
    );
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

### 如何知道哪一個清單項目被點擊？

在 Xamarin.Forms 中，ListView 有 `ItemTapped` 方法
可以用來判斷哪一個項目被點擊。
你也可能用過其他技術，
例如監聽 `SelectedItem` 或 `EventToCommand`
行為的變化。

在 Flutter 中，請使用傳入元件 (Widgets) 所提供的觸控處理方式。

<?code-excerpt "lib/listview_item_clicked.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

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
  List<Widget> _getListData() {
    return List<Widget>.generate(
      100,
      (index) => GestureDetector(
        onTap: () {
          developer.log('Row $index tapped');
        },
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Text('Row $index'),
        ),
      ),
    );
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

### 如何動態更新 ListView？

在 Xamarin.Forms 中，如果你將 `ItemsSource` 屬性繫結到 `ObservableCollection`，你只需要在 ViewModel 中更新該清單即可。  
另外，你也可以將新的 `List` 指派給 `ItemSource` 屬性。

在 Flutter 中，情況則有些不同。  
如果你在 `setState()` 方法內更新元件清單，你會很快發現資料在畫面上並沒有發生變化。  
這是因為當呼叫 `setState()` 時，Flutter 的渲染引擎會檢查 widget tree（元件樹），以判斷是否有任何變化。  
當它走到你的 `ListView` 時，會執行一次 `==` 檢查，並判斷兩個 `ListView` 是相同的。  
既然沒有變化，因此不需要更新。

如果你想用簡單的方法來更新你的 `ListView`，可以在 `setState()` 內建立一個新的 `List`，然後將舊清單的資料複製到新清單中。  
雖然這種做法很簡單，但如下一個範例所示，不建議用於大量資料集。

<?code-excerpt "lib/dynamic_listview.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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
  List<Widget> widgets = <Widget>[];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  Widget getRow(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets = List<Widget>.from(widgets);
          widgets.add(getRow(widgets.length));
          developer.log('Row $index');
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Text('Row $index'),
      ),
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

建議且高效的清單建立方式是使用`ListView.Builder`。  
當你有動態清單或資料量非常大的清單時，這種方法特別適合。  
這本質上等同於 Android 上的 RecyclerView，會自動為你回收清單元素：

<?code-excerpt "lib/listview_builder.dart"?>
```dart
import 'dart:developer' as developer;
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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
  List<Widget> widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  Widget getRow(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length));
          developer.log('Row $index');
        });
      },
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Text('Row $index'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample App')),
      body: ListView.builder(
        itemCount: widgets.length,
        itemBuilder: (context, index) {
          return getRow(index);
        },
      ),
    );
  }
}
```

與其建立`ListView`，不如建立`ListView.builder`，  
它接收兩個主要參數：清單的初始長度，以及一個 item builder 函式。

item builder 函式類似於 Android adapter 中的`getView`函式；  
它會接收一個位置（position），並回傳你希望在該位置渲染的資料列（row）。

最後，也是最重要的一點，請注意`onTap()`函式  
不再重新建立清單，而是直接將項目新增到現有清單中。

如需更多資訊，請參閱  
[Your first Flutter app][first_codelab] codelab。

## 處理文字

### 如何在我的文字元件 (Text Widgets) 上設定自訂字型？

在 Xamarin.Forms 中，你必須在每個原生專案中加入自訂字型。  
然後，在`Element`中，將這個字型名稱  
指派給`FontFamily`屬性，並使用`filename#fontname`，  
iOS 則只需`fontname`。

在 Flutter 中，請將字型檔案放入資料夾，並在`pubspec.yaml`檔案中引用，  
這與匯入圖片的方式類似。

```yaml
fonts:
  - family: MyCustomFont
    fonts:
      - asset: fonts/MyCustomFont.ttf
      - style: italic
```

然後將該字型指派給你的`Text`元件（Widget）：

<?code-excerpt "lib/strings.dart (custom-font)"?>
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
`Text` 元件的 `style` 參數接受一個 `TextStyle` 物件，
你可以在其中自訂許多參數，例如：

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

## 表單輸入

### 如何取得使用者輸入？

在 Xamarin.Forms 中，`element` 可以讓你直接查詢 `element`，
以判斷其屬性的狀態，
或是它是否綁定到 `ViewModel` 中的某個屬性。

在 Flutter 中，取得資訊是由專門的元件 (Widgets) 處理，
這與你過去習慣的方式不同。
如果你有一個 `TextField` 或 `TextFormField`，
你可以提供一個 [`TextEditingController`][`TextEditingController`]
來取得使用者的輸入：

<?code-excerpt "lib/form.dart"?>
```dart
import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  const MyForm({super.key});

  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  /// Create a text controller and use it to retrieve the current value
  /// of the TextField.
  final TextEditingController myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when disposing of the widget.
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
        // text that the user has typed into our text field.
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // Retrieve the text that the user has entered using the
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

你可以在 [Retrieve the value of a text field][Retrieve the value of a text field] 找到更多資訊以及完整的程式碼範例。

### Entry 的 Placeholder 對應 Flutter 的什麼？

在 Xamarin.Forms 中，部分 `Elements` 支援 `Placeholder` 屬性，你可以為其指定值。例如：

```xml
<Entry Placeholder="This is a hint">
```

在 Flutter 中，你可以很容易地為你的輸入元件（Input Widgets）顯示「提示」或佔位文字，只需在文字元件的 `decoration` 建構子參數中加入 `InputDecoration` 物件即可。

<?code-excerpt "lib/input_decoration.dart (hint-text)" replace="/child: //g"?>
```dart
TextField(decoration: InputDecoration(hintText: 'This is a hint')),
```

### 如何顯示驗證錯誤？

在 Xamarin.Forms 中，如果你想要為驗證錯誤提供視覺提示，通常需要建立新的屬性，並在有驗證錯誤的 `Element` 周圍建立 `VisualElement`。

在 Flutter 中，你可以將 InputDecoration 物件傳遞給文字元件 (Text Widgets) 的 decoration 建構子。

然而，你不會一開始就顯示錯誤訊息。相反地，當使用者輸入了無效資料時，請更新狀態，並傳遞一個新的 `InputDecoration` 物件。

<?code-excerpt "lib/validation.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const SampleApp());
}

class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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
  String? _errorText;

  String? _getErrorText() {
    return _errorText;
  }

  bool isEmail(String em) {
    const String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|'
        r'(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
        r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    final RegExp regExp = RegExp(emailRegexp);
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
            errorText: _getErrorText(),
          ),
        ),
      ),
    );
  }
}
```

## Flutter 插件

## 與硬體、第三方服務及平台互動

### 如何與平台及原生程式碼互動？

Flutter 並不是直接在底層平台上執行程式碼；相反地，組成 Flutter 應用程式的 Dart 程式碼會在裝置上以原生方式執行，從而「繞過」平台所提供的 SDK。這代表，例如當你在 Dart 中發出網路請求時，它會直接在 Dart 執行環境中運作。你不會像撰寫原生應用程式時那樣，直接使用 Android 或 iOS 的 API。你的 Flutter 應用程式仍然會被託管在原生應用程式的 `ViewController` 或 `Activity` 中，作為一個 view，但你無法直接存取這個 view 或原生框架。

這並不代表 Flutter 應用程式無法與這些原生 API 或你自有的原生程式碼互動。Flutter 提供了[平台通道（platform channels）][platform channels]，可用來與託管你 Flutter view 的 `ViewController` 或 `Activity` 進行通訊與資料交換。平台通道本質上是一種非同步訊息機制，能夠橋接 Dart 程式碼與主機端的 `ViewController` 或 `Activity` 以及其所運行的 iOS 或 Android 框架。你可以利用平台通道在原生端執行方法，或從裝置的感測器取得資料等。

除了直接使用平台通道外，你還可以利用各式各樣的[預製插件（plugins）][plugins]，這些插件已經將原生與 Dart 程式碼封裝好，針對特定需求提供解決方案。例如，你可以透過插件直接從 Flutter 存取相簿或裝置相機，而無需自行撰寫整合程式碼。這些插件可在 [pub.dev][pub.dev]（Dart 與 Flutter 的開源套件倉庫）上找到。有些套件可能只支援 iOS 或 Android 的原生整合，或同時支援兩者。

如果你在 pub.dev 上找不到符合需求的插件，你也可以[自行撰寫插件][write your own]，並[發佈到 pub.dev][publish it on pub.dev]。

### 如何存取 GPS 感測器？

請使用 [`geolocator`][`geolocator`] 社群插件。

### 如何存取相機？

[`camera`][`camera`] 插件是存取相機時常用的選擇。

### 如何使用 Facebook 登入？

若要使用 Facebook 登入，請使用 [`flutter_facebook_login`][`flutter_facebook_login`] 社群插件。

### 如何使用 Firebase 功能？

大多數 Firebase 功能都已由[官方插件（first party plugins）][first party plugins]支援。這些插件由 Flutter 團隊維護，屬於官方整合：

 * [`google_mobile_ads`][`google_mobile_ads`]：Google Mobile Ads for Flutter
 * [`firebase_analytics`][`firebase_analytics`]：Firebase Analytics
 * [`firebase_auth`][`firebase_auth`]：Firebase Auth
 * [`firebase_database`][`firebase_database`]：Firebase RTDB
 * [`firebase_storage`][`firebase_storage`]：Firebase Cloud Storage
 * [`firebase_messaging`][`firebase_messaging`]：Firebase Messaging（FCM）
 * [`flutter_firebase_ui`][`flutter_firebase_ui`]：快速整合 Firebase Auth（Facebook、Google、Twitter 及 Email）
 * [`cloud_firestore`][`cloud_firestore`]：Firebase Cloud Firestore

你也可以在 pub.dev 上找到一些第三方 Firebase 插件，涵蓋官方插件尚未支援的領域。

### 如何建立自訂的原生整合？

如果有 Flutter 或其社群插件尚未支援的平台專屬功能，你可以依照[開發套件與插件][developing packages and plugins]頁面的指引自行開發。

簡單來說，Flutter 的插件架構類似於 Android 中使用 Event bus：你發送一個訊息，讓接收端處理後再回傳結果。在這裡，接收端就是運行於 Android 或 iOS 原生端的程式碼。

## 主題（樣式）

### 如何為我的應用程式設計主題？

Flutter 內建了美觀的 Material Design 實作，能夠處理大部分你常見的樣式與主題化（theming）需求。

Xamarin.Forms 提供全域的 `ResourceDictionary`，可讓你在整個應用程式中共用樣式。另有主題（Theme）支援，目前正處於預覽階段。

在 Flutter 中，你可以在最上層的元件（Widget）宣告主題。

為了充分發揮 Material 元件（Material components）在應用程式中的優勢，你可以將最上層元件宣告為 `MaterialApp`，作為應用程式的進入點。`MaterialApp` 是一個便利元件，包裝了許多實作 Material Design 應用程式時常用的元件。它是在 `WidgetsApp` 基礎上，加入 Material 專屬功能。

你也可以使用 `WidgetsApp` 作為應用程式元件，這個元件提供部分相同功能，但不像 `MaterialApp` 那麼豐富。

若要自訂任何子元件的顏色與樣式，只需將 `ThemeData` 物件傳遞給 `MaterialApp` 元件。例如，下方程式碼中，色彩方案（color scheme）以 seed 設為 deepPurple，文字選取顏色設為紅色。

<?code-excerpt "lib/theme.dart (theme)"?>
```dart
class SampleApp extends StatelessWidget {
  /// This widget is the root of your application.
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

## 資料庫與本機儲存

### 如何存取 shared preferences 或 UserDefaults？

Xamarin.Forms 開發者可能對 `Xam.Plugins.Settings` 套件很熟悉。

在 Flutter 中，可以使用 [`shared_preferences`][`shared_preferences`] 套件來實現類似的功能。這個套件同時包裝了 `UserDefaults` 以及 Android 上的對應功能 `SharedPreferences`。

### 如何在 Flutter 中存取 SQLite？

在 Xamarin.Forms 中，大多數應用程式會使用 `sqlite-net-pcl` 套件來存取 SQLite 資料庫。

在 Flutter 上，於 macOS、Android 和 iOS 平台，可使用 [`sqflite`][`sqflite`] 套件來實現這項功能。

## 除錯

### 在 Flutter 中可以使用哪些工具來除錯我的應用程式？

可以使用 [DevTools][DevTools] 工具套件來除錯 Flutter 或 Dart 應用程式。

DevTools 支援效能分析、堆疊檢查、元件樹（widget tree）檢視、診斷日誌、除錯、觀察已執行的程式碼行、偵測記憶體洩漏與記憶體碎片化等功能。更多資訊請參考 [DevTools][DevTools] 文件。

## 通知

### 如何設定推播通知（push notifications）？

在 Android 上，您可以使用 Firebase Cloud Messaging 來為應用程式設定推播通知。

在 Flutter 中，可透過 [`firebase_messaging`][`firebase_messaging`] 套件來存取這項功能。關於如何使用 Firebase Cloud Messaging API，請參考 [`firebase_messaging`][`firebase_messaging`] 套件文件。


[Adding assets and images]: /ui/assets/assets-and-images
[Animation & Motion widgets]: /ui/widgets/animation
[Animations overview]: /ui/animations
[Animations tutorial]: /ui/animations/tutorial
[Apple's iOS design language]: {{site.apple-dev}}/design/resources/
[arb]: {{site.github}}/google/app-resource-bundle
[Async UI]: #非同步-ui
[`cloud_firestore`]: {{site.pub}}/packages/cloud_firestore
[composing]: /resources/architectural-overview#composition
[Cupertino widgets]: /ui/widgets/cupertino
[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[developing packages and plugins]: /packages-and-plugins/developing-packages
[DevTools]: /tools/devtools
[existing plugin]: {{site.pub}}/flutter
[`google_mobile_ads`]: {{site.pub}}/packages/google_mobile_ads
[`firebase_analytics`]: {{site.pub}}/packages/firebase_analytics
[`firebase_auth`]: {{site.pub}}/packages/firebase_auth
[`firebase_database`]: {{site.pub}}/packages/firebase_database
[`firebase_messaging`]: {{site.pub}}/packages/firebase_messaging
[`firebase_storage`]: {{site.pub}}/packages/firebase_storage
[first party plugins]: {{site.pub}}/flutter/packages?q=firebase
[`flutter_facebook_login`]: {{site.pub}}/packages/flutter_facebook_login
[`flutter_firebase_ui`]: {{site.pub}}/packages/flutter_firebase_ui
[`geolocator`]: {{site.pub}}/packages/geolocator
[`camera`]: {{site.pub-pkg}}/camera
[`http` package]: {{site.pub}}/packages/http
[internationalization guide]: /ui/internationalization
[`intl`]: {{site.pub}}/packages/intl
[`intl_translation`]: {{site.pub}}/packages/intl_translation
[Introduction to declarative UI]: /get-started/flutter-for/declarative
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[Material Components]: /ui/widgets/material
[Material Design]: {{site.material}}/styles
[Material Design guidelines]: {{site.material}}/styles
[`Opacity` widget]: {{site.api}}/flutter/widgets/Opacity-class.html
[optimized for all platforms]: {{site.material2}}/design/platform-guidance/cross-platform-adaptation.html#cross-platform-guidelines
[platform channels]: /platform-integration/platform-channels
[plugins]: /packages-and-plugins/using-packages
[pub.dev]: {{site.pub}}
[publish it on pub.dev]: /packages-and-plugins/developing-packages#publish
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[`shared_preferences`]: {{site.pub}}/packages/shared_preferences
[`sqflite`]: {{site.pub}}/packages/sqflite
[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[`url_launcher`]: {{site.pub}}/packages/url_launcher
[widget]: /resources/architectural-overview#widgets
[widget catalog]: /ui/widgets/layout
[`Window.locale`]: {{site.api}}/flutter/dart-ui/Window/locale.html
[first_codelab]: {{site.codelabs}}/codelabs/flutter-codelab-first
[write your own]: /packages-and-plugins/developing-packages
