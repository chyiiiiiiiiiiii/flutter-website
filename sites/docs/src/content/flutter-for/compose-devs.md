---
title: 給 Jetpack Compose 開發者的 Flutter 指南
description: 學習如何將 Jetpack Compose 的開發經驗應用於建置 Flutter 應用程式。
---

<?code-excerpt path-base="get-started/flutter-for/compose_devs"?>

:::note
如果你有使用 Views（XML）開發 Android 應用程式的經驗，
請參考 [Flutter for Android developers][]。
:::

Flutter 是一個用於建置跨平台應用程式的框架，採用 Dart 程式語言。

你在 Jetpack Compose 上累積的知識與經驗，在使用 Flutter 開發時同樣非常有價值。

:::tip
若你想將 Flutter 程式碼整合進**現有**的 Android 應用程式，請參考 [Add Flutter to existing app][]。
:::

本文件可作為參考手冊，讓你依需求跳閱並找到最相關的解答。本指南內嵌了範例程式碼。
只要在滑鼠懸停或聚焦時點選「Open in DartPad」按鈕，即可在 DartPad 上開啟並執行部分範例。

## 概覽

Flutter 與 Jetpack Compose 的程式碼皆用來描述 UI 的外觀與運作方式。
開發者稱這類程式碼為_宣告式框架_（declarative framework）。

雖然兩者在與舊有 Android 程式碼互動時有明顯差異，但這兩個框架之間也有許多共通點。

### Composables 與 Widgets

**Jetpack Compose** 以 _composable functions_（可組合函式）來表示 UI 元件 (Widget)，
本文之後將簡稱為 _composables_。Composables 可透過 _Modifier_ 物件進行變更或裝飾。

``` kotlin
Text("Hello, World!",
   modifier: Modifier.padding(10.dp)
)
Text("Hello, World!",
    modifier = Modifier.padding(10.dp))
```

**Flutter** 將 UI 元件表示為 _widgets_。

無論是 composables 還是 widgets，都只會存在到需要變更時為止。
這些語言將這種特性稱為 _不可變性_。
Jetpack Compose 透過可選的 _modifier_ 屬性（由 `Modifier` 物件支援）來修改 UI 元件屬性。
相較之下，Flutter 則是直接透過建構函式參數來設定元件（Widget）屬性。

```dart
Padding(                         // <-- This is a Widget
  padding: EdgeInsets.all(10.0), // <-- a parameter to Padding
  child: Text("Hello, World!"),  // <-- This is also a Widget
);
```

要進行版面配置（layout），Jetpack Compose 和 Flutter 都是將 UI 元件彼此巢狀嵌套。
Jetpack Compose 巢狀 `Composables`，而 Flutter 則巢狀 `Widgets`。

### 版面配置流程

Jetpack Compose 和 Flutter 處理版面配置 (layout) 的方式非常相似。兩者都會在單一流程中進行 UI 的版面配置，並且由父元素將版面限制（constraints）傳遞給子元素。更具體來說：

1. 父元件會遞迴地測量自身及其子元件，並將任何來自父層的限制傳遞給子元件。
2. 子元件會嘗試利用上述方法來決定自己的大小，並將自己的限制以及來自祖先節點的限制傳遞給其子元件。
3. 當遇到葉節點（沒有子元件的節點）時，其大小與屬性會根據提供的限制來決定，並將該元素放置於 UI 上。
4. 當所有子元件都已經決定大小並放置完成後，根節點就能決定自身的測量方式、大小與位置。

在 Jetpack Compose 和 Flutter 中，父元件都可以覆寫或限制子元件想要的大小。元件（Widget）無法隨意設定任何大小，也通常無法知道或決定自己在螢幕上的位置，因為這是由父元件決定的。

若要強制子元件以特定大小渲染（render），父元件必須設置嚴格的限制（tight constraints）。
當限制的最小尺寸值等於最大尺寸值時，該限制就成為嚴格限制（tight constraint）。

想進一步了解 Flutter 中的限制（constraints）如何運作，
請參閱 [Understanding constraints][]。

### 設計系統

由於 Flutter 支援多平台，你的應用程式不需要遵循任何特定的設計系統。
雖然本指南主要介紹 [Material][] 元件（Widget），但你的 Flutter 應用程式可以使用多種不同的設計系統：

- 自訂 Material 元件
- 社群開發的元件
- 你自行設計的自訂元件

如果你正在尋找一個展示自訂設計系統的優秀參考應用程式，請參考 [Wonderous][]。

## UI 基礎

本節將介紹 Flutter 的 UI 開發基礎，以及其與 Jetpack Compose 的比較。
內容包含如何開始開發應用程式、顯示靜態文字、建立按鈕、響應點擊事件、顯示清單、網格等。

### 入門

對於 **Compose** 應用程式，你的主要進入點會是 _Activity_ 或其子類別，
通常是 _ComponentActivity_。

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SampleTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}
```

要啟動你的 **Flutter** 應用程式，請將你的應用程式實例傳遞給 `runApp` 函式。

```dart
void main() {
  runApp(const MyApp());
}
```

`App` 是一個元件（Widget）。它的 `build` 方法描述了它所代表的使用者介面部分。
通常會以一個 [`WidgetApp`][] 類別作為應用程式的起點，
例如 [`MaterialApp`][]。

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomePage(),
    );
  }
}
```

在 `HomePage` 中所使用的元件（Widget）可能會以 `Scaffold` 類別作為起始。
`Scaffold` 實作了一個應用程式的基本版面配置結構。

```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text(
          'Hello, World!',
        ),
      ),
    );
  }
}
```

請注意 Flutter 如何使用 [`Center`][] 元件（Widget）。

Compose 繼承自 Android Views，因此有許多預設行為。
除非另有指定，大多數元件會「包裹」其內容大小，
也就是在渲染時只佔用所需的空間。
但在 Flutter 中，情況並不總是如此。

若要讓文字置中，請將其包裹在 `Center` 元件（Widget）中。
想進一步了解不同元件及其預設行為，請參考
[Widget catalog][]。

### 新增按鈕

在 **Compose** 中，你可以使用 `Button` composable 或其變體
來建立按鈕。當使用 Material 主題時，`Button` 是 `FilledTonalButton`
的別名。

```kotlin
Button(onClick = {}) {
    Text("Do something")
}
```

要在 **Flutter** 中達到相同的效果，
請使用 `FilledButton` 類別：

```dart
FilledButton(
  onPressed: () {
    // This closure is called when your button is tapped.
  },
  const Text('Do something'),
),
```

**Flutter** 提供多種具有預設樣式的按鈕可供使用。


### 水平或垂直對齊元件
Jetpack Compose 與 Flutter 在處理水平與垂直排列的項目集合時方式相似。

以下 Compose 程式碼片段會在 `Row` 與 `Column` 容器中，分別加入地球圖示與文字，並將項目置中顯示：

```kotlin
Row(horizontalArrangement = Arrangement.Center) {
   Image(Icons.Default.Public, contentDescription = "")
   Text("Hello, world!")
}

Column(verticalArrangement = Arrangement.Center) {
   Image(Icons.Default.Public, contentDescription = "")
   Text("Hello, world!")
}
```

**Flutter** 也使用 [`Row`][] 和 [`Column`][]，但在指定子元件（child widgets）和對齊方式時有些許差異。以下範例與 Compose 範例等價。

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(Icons.public),
    Text('Hello, world!'),
  ],
),

Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(MaterialIcons.globe),
    Text('Hello, world!'),
  ],
)

```

`Row` 和 `Column` 需要在 `children` 參數中傳入 `List<Widget>`。
`mainAxisAlignment` 屬性告訴 Flutter 如何在有多餘空間時排列子元件（children）。
`MainAxisAlignment.center` 會將子元件排列在主軸（main axis）的中央。對於 `Row` 來說，主軸是水平軸；而對於 `Column`，主軸則是垂直軸。

::: note
雖然 Flutter 的 `Row` 和 `Column` 有 `MainAxisAlignment` 和 `CrossAxisAlignment` 屬性來控制項目的排列方式，但在 Jetpack Compose 中，控制排列的屬性則是從下列中各選一個垂直和一個水平屬性：`verticalArrangement`、`verticalAlignment`、`horizontalAlignment` 和 `horizontalArrangement`。判斷哪一個是 `MainAxis` 的訣竅是找出以 `arrangement` 結尾的屬性；`CrossAxis` 則是以 `alignment` 結尾的屬性。
:::

### 顯示清單檢視

在 **Compose** 中，你有幾種方式可以根據要顯示的清單大小來建立清單。對於可以一次顯示所有項目的少量資料，你可以在 `Column` 或 `Row` 中遍歷集合。

如果是大量項目的清單，`LazyList` 會有更好的效能。它只會排版可見的元件，而不是全部排版。

```kotlin
data class Person(val name: String)

val people = arrayOf(
   Person(name = "Person 1"),
   Person(name = "Person 2"),
   Person(name = "Person 3")
)

@Composable
fun ListDemo(people: List<Person>) {
   Column {
      people.forEach {
         Text(it.name)
      }
   }
}

@Composable
fun ListDemo2(people: List<Person>) {
   LazyColumn {
      items(people) { person ->
         Text(person.name)
      }
   }
}
```

若要在 Flutter 中延遲建立（lazily build）清單，....

```dart
class Person {
  String name;
  Person(this.name);
}

var items = [
  Person('Person 1'),
  Person('Person 2'),
  Person('Person 3'),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(items[index].name),
          );
        },
      ),
    );
  }
}
```

Flutter 對於清單有一些慣例：

- [`ListView`] 元件（Widget）有一個 builder 方法。
  這個方法的運作方式類似於 Compose 中 `LazyList` 的 `item` 閉包。

- `ListView` 的 `itemCount` 參數用來設定
  `ListView` 要顯示多少個項目。

- `itemBuilder` 有一個 index 參數，其值會介於 0 到 itemCount 減 1 之間。

前面的範例會為每個項目回傳一個 [`ListTile`][] 元件（Widget）。
`ListTile` 元件包含像是 `height` 和 `font-size` 這樣的屬性。
這些屬性有助於建立清單。不過，Flutter 允許你回傳幾乎任何能代表資料的元件（Widget）。

### 顯示網格（Grid）

在 **Compose** 中建構網格（Grid）與 LazyList（`LazyColumn` 或 `LazyRow`）類似。
你可以使用相同的 `items` 閉包。每種網格型態都有相關屬性可用來指定項目的排列方式，
無論是自適應（adaptive）還是固定（fixed）版面配置等，都可以設定。


```kotlin
val widgets = arrayOf(
        "Row 1",
        Icons.Filled.ArrowDownward,
        Icons.Filled.ArrowUpward,
        "Row 2",
        Icons.Filled.ArrowDownward,
        Icons.Filled.ArrowUpward
    )

    LazyVerticalGrid (
        columns = GridCells.Fixed(3),
        contentPadding = PaddingValues(8.dp)
    ) {
        items(widgets) { i ->
            if (i is String) {
                Text(i)
            } else {
                Image(i as ImageVector, "")
            }
        }
    }
```

要在 **Flutter** 中顯示網格（grids），請使用 [`GridView`] 元件（Widget）。
此元件有多種建構函式（constructors），每個建構函式的目標類似，但所需的輸入參數不同。
以下範例使用 `.builder()` 初始化器：

```dart
const widgets = [
  Text('Row 1'),
  Icon(Icons.arrow_downward),
  Icon(Icons.arrow_upward),
  Text('Row 2'),
  Icon(Icons.arrow_downward),
  Icon(Icons.arrow_upward),
];

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisExtent: 40,
        ),
        itemCount: widgets.length,
        itemBuilder: (context, index) => widgets[index],
      ),
    );
  }
}
```

`SliverGridDelegateWithFixedCrossAxisCount` delegate 會決定格線（grid）在排版其元件（components）時所使用的各種參數。其中包含 `crossAxisCount`，它用來指定每一列顯示的項目數量。

Jetpack Compose 的 `LazyHorizontalGrid`、`LazyVerticalGrid` 與 Flutter 的 `GridView` 有些類似。`GridView` 會使用 delegate 來決定格線應如何排版其元件。`rows`、`columns` 以及 `LazyHorizontalGrid` \ `LazyVerticalGrid` 上的其他相關屬性，也都具有相同的作用。

### 建立可滾動檢視

**Jetpack Compose** 中的 `LazyColumn` 與 `LazyRow` 內建支援滾動功能。

若要建立可滾動檢視，**Flutter** 則會使用 [`SingleChildScrollView`][]。在下方範例中，函式 `mockPerson` 會模擬 `Person` 類別的實例，以建立自訂的 `PersonView` 元件（Widget）。

```dart
SingleChildScrollView(
  child: Column(
    children: mockPersons
        .map(
          (person) => PersonView(
            person: person,
          ),
        )
        .toList(),
  ),
),
```

### 響應式與自適應設計

**Compose** 中的自適應設計是一個複雜的主題，且有許多可行的解決方案：
* 使用自訂版面配置
* 僅使用 `WindowSizeClass`
* 使用 `BoxWithConstraints` 根據可用空間控制顯示內容
* 使用 Material 3 自適應函式庫，該函式庫結合 `WindowSizeClass` 以及針對常見版面配置設計的專用 composable 版面配置

因此，建議你直接參考 **Flutter** 的相關選項，根據你的需求選擇最合適的方式，而不是嘗試尋找一對一的對應解法。

在 **Flutter** 中建立相對版面配置，你可以使用以下兩種方式之一：

- 在 [`LayoutBuilder`][] 類別中取得 `BoxConstraints` 物件。
- 在建構函式中使用 [`MediaQuery.of()`][]，以取得目前應用程式的尺寸與方向。

想了解更多，請參閱 [Creating responsive and adaptive apps][]。

### 狀態管理

**Compose** 透過 `remember` API 以及 `MutableState` 介面的子類別來儲存狀態 (state)。

```kotlin
Scaffold(
   content = { padding ->
      var _counter = remember {  mutableIntStateOf(0) }
      Column(horizontalAlignment = Alignment.CenterHorizontally,
         verticalArrangement = Arrangement.Center,
         modifier = Modifier.fillMaxSize().padding(padding)) {
            Text(_counter.value.toString())
            Spacer(modifier = Modifier.height(16.dp))
            FilledIconButton (onClick = { -> _counter.intValue += 1 }) {
               Text("+")
            }
      }
   }
)
```


**Flutter** 使用 [`StatefulWidget`][] 來管理本地狀態（local state）。
要實作一個有狀態元件（Stateful Widget），需包含以下兩個類別：

- `StatefulWidget` 的子類別
- `State` 的子類別

`State` 物件會儲存元件（Widget）的狀態。
若要改變元件的狀態，請在 `State` 子類別中呼叫 `setState()`，
以通知框架重新繪製該元件。

以下範例顯示了一個計數器應用程式的一部分：

```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('$_counter'),
            TextButton(
              onPressed: () => setState(() {
                _counter++;
              }),
              child: const Text('+'),
            ),
          ],
        ),
      ),
    );
  }
}
```

想了解更多管理狀態的方法，請參閱[狀態管理][State management]。


### 螢幕繪製

在 **Compose** 中，你會使用 `Canvas` composable 來在螢幕上繪製圖形、圖片和文字。

**Flutter** 則有一套基於 `Canvas` 類別的 API，並提供兩個協助你繪製的類別：

1. 需要 painter 的 [`CustomPaint`][]：

    ```dart
    CustomPaint(
      painter: SignaturePainter(_points),
      size: Size.infinite,
    ),
    ```

2. [`CustomPainter`][]，實作你的演算法以繪製到畫布上。

    ```dart
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

## 主題、樣式與媒體

你可以輕鬆地為 Flutter 應用程式進行樣式設定。
樣式設定包括在淺色與深色主題之間切換、
變更文字與 UI 元件（Widget）的設計，
以及更多功能。本節將介紹如何為你的應用程式進行樣式設定。

### 使用深色模式

在 **Compose** 中，你可以在任意層級控制淺色與深色，
方法是將元件包裹在 `Theme` composable 內。

在 **Flutter** 中，你可以在應用程式層級控制淺色與深色模式。
若要控制亮度模式，請使用 `App` 類別的 `theme` 屬性：

```dart
const MaterialApp(
  theme: ThemeData(
    brightness: Brightness.dark,
  ),
  home: HomePage(),
);
```

### 文字樣式設定

在 **Compose** 中，你可以直接使用 `Text` 的屬性來設定一兩個屬性，或是建立一個 `TextStyle` 物件，一次設定多個屬性。

```kotlin
Text("Hello, world!", color = Color.Green,
        fontWeight = FontWeight.Bold, fontSize = 30.sp)
```
```kotlin
Text("Hello, world!",
   style = TextStyle(
      color = Color.Green,
      fontSize = 30.sp,
      fontWeight = FontWeight.Bold
   ),
)
```

要在 **Flutter** 中為文字設計樣式，請在 `Text` 元件（Widget）的 `style` 參數中，加入 `TextStyle` 元件作為其值。

```dart
Text(
  'Hello, world!',
  style: TextStyle(
    fontSize: 30,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
),
```

### 按鈕樣式設定

在 **Compose** 中，你可以透過 `colors` 屬性來修改按鈕的顏色。如果未進行修改，則會使用當前主題的預設值。

```kotlin
Button(onClick = {},
   colors = ButtonDefaults.buttonColors().copy(
      containerColor = Color.Yellow, contentColor = Color.Blue,
       )) {
    Text("Do something", fontSize = 30.sp, fontWeight = FontWeight.Bold)
}
```

在 **Flutter** 中，若要為按鈕元件（Widget）設定樣式，你同樣可以設定其子元件（child）的樣式，或直接修改按鈕本身的屬性。

```dart
FilledButton(
  onPressed: (){},
  style: FilledButton.styleFrom(backgroundColor: Colors.amberAccent),
  child: const Text(
    'Do something',
    style: TextStyle(
      color: Colors.blue,
      fontSize: 30,
      fontWeight: FontWeight.bold,
    )
  )
)
```
## 將資源（Assets）打包以供 Flutter 使用

在開發應用程式時，經常需要將各種資源（Assets）打包進應用程式中。這些資源可能包括動畫（Animation）、向量圖形、圖片（images）、字型，或其他一般檔案。

與原生 Android 應用程式不同，原生 Android 會要求在 `/res/<qualifier>/` 下有特定的目錄結構，這些目錄名稱可能用來標示檔案類型、螢幕方向或 Android 版本；而 Flutter 則不要求資源必須放在特定位置，只要你在 `pubspec.yaml` 檔案中有列出這些參考的檔案即可。以下是一段 `pubspec.yaml` 的範例，參考了多個圖片（images）與一個字型檔案。

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
  fonts:
    - family: FiraSans
      fonts:
        - asset: fonts/FiraSans-Regular.ttf
```

### 使用字型

在 **Compose** 中，你有兩種在應用程式中使用字型的方式。
你可以使用一個執行階段服務來擷取字型，例如 [Google Fonts][]。
或者，你也可以將字型檔案打包在資源檔案中。

**Flutter** 也有類似的方法來使用字型，以下我們將一起說明這兩種方式。

### 使用打包字型

以下範例分別展示了在 Compose 與 Flutter 中，如何使用放在 `/res/` 或 `fonts` 目錄中的字型檔案，這與上面所列的方式大致相同。

```kotlin
// Font files bundled with app
val firaSansFamily = FontFamily(
   Font(R.font.firasans_regular, FontWeight.Normal),
   // ...
)

// Usage
Text(text = "Compose", fontFamily = firaSansFamily, fontWeight = FontWeight.Normal)
```

```dart
Text(
  'Flutter',
  style: TextStyle(
    fontSize: 40,
    fontFamily: 'FiraSans',
  ),
),
```

### 使用字型提供者（Google Fonts）

一個不同之處在於，使用像 Google Fonts 這類字型提供者的字型。在 **Compose** 中，
實例化的方式是直接在程式碼中進行，與參考本地檔案的程式碼大致相同。

在實例化一個參考字型服務專用字串的提供者之後，
你會使用相同的 `FontFamily` 宣告。

```kotlin
// Font files bundled with app
val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

val firaSansFamily = FontFamily(
    Font(
        googleFont = GoogleFont("FiraSans"),
        fontProvider = provider,
    )
)

// Usage
Text(text = "Compose", fontFamily = firaSansFamily, fontWeight = FontWeight.Light)
```

在 Flutter 中，這可以透過 [google_fonts][] 套件，使用字型名稱來實現。

```dart
import 'package:google_fonts/google_fonts.dart';
//...
Text(
  'Flutter',
  style: GoogleFonts.firaSans(),
  // or
  //style: GoogleFonts.getFont('FiraSans')
),
```

### 使用圖片

在 **Compose** 中，通常會將圖片檔案放置於資源的 drawable 目錄 `/res/drawable`，並使用 `Image` composable 來顯示圖片。資源的參考方式是使用類似 `R.drawable.<file name>` 的資源定位器（resource locator），不包含副檔名。

在 **Flutter** 中，資源的位置則會在 `pubspec.yaml` 中列出，如下方程式碼片段所示。

```yaml
    flutter:
      assets:
        - images/Blueberries.jpg
   ```

加入圖片後，你可以使用 `Image` 元件（Widget）的 `.asset()` 建構函式來顯示圖片。此建構函式：

若要查看完整範例，請參考 [`Image`][] 文件。


[Flutter for Android developers]: /flutter-for/android-devs
[Add Flutter to existing app]: /add-to-app
[Material]: {{site.material}}/develop/flutter/
[Platform adaptations]: /platform-integration/platform-adaptations
[widget catalog]: /ui/widgets/layout
[Understanding constraints]: /ui/layout/constraints
[`WidgetApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListTile`]: {{site.api}}/flutter/widgets/ListTitle-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html
[`LayoutBuilder`]: {{site.api}}/flutter/widgets/LayoutBuilder-class.html
[`AnimatedRotation`]: {{site.api}}/flutter/widgets/AnimatedRotation-class.html
[`TweenAnimationBuilder`]: {{site.api}}/flutter/widgets/TweenAnimationBuilder-class.html
[`RotationTransition`]: {{site.api}}/flutter/widgets/RotationTransition-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[State management]:  /data-and-backend/state-mgmt
[Wonderous]: https://flutter.gskinner.com/wonderous/?utm_source=flutterdocs&utm_medium=docs
[video_player]: {{site.pub-pkg}}/video_player
[video_player example]: {{site.pub-pkg}}/video_player/example
[Creating responsive and adaptive apps]: /ui/adaptive-responsive
[`MediaQuery.of()`]: {{site.api}}/flutter/widgets/MediaQuery-class.html
[`CustomPaint`]: {{site.api}}/flutter/widgets/CustomPaint-class.html
[`CustomPainter`]: {{site.api}}/flutter/rendering/CustomPainter-class.html
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[go_router]: {{site.pub-pkg}}/go_router
[Google Fonts]: https://fonts.google.com/
[google_fonts]: https://pub.dev/packages/google_fonts
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp-class.html
