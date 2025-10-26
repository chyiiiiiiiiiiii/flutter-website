---
title: 給 Jetpack Compose 開發者的 Flutter 指南
description: 學習如何將 Jetpack Compose 的開發經驗應用於 Flutter 應用程式開發。
---

<?code-excerpt path-base="get-started/flutter-for/compose_devs"?>

:::note
如果你有使用 Views（XML）開發 Android 應用程式的經驗，請參考 [Flutter for Android developers][Flutter for Android developers]。
:::

Flutter 是一個用於構建跨平台應用程式的框架，採用 Dart 程式語言。

你在 Jetpack Compose 上的知識與經驗，在使用 Flutter 開發時同樣非常有價值。

:::tip
若你想將 Flutter 程式碼整合進**現有**的 Android 應用程式，請參考 [Add Flutter to existing app][Add Flutter to existing app]。
:::

你可以將本文件作為參考，根據需求跳著閱讀，找到最相關的問題解答。本指南內嵌了範例程式碼。
只要滑鼠移到範例上方或聚焦時，點選「Open in DartPad」按鈕，即可在 DartPad 上開啟並執行部分範例。

## 概覽

Flutter 與 Jetpack Compose 的程式碼都用來描述 UI 的外觀與行為。開發者稱這類程式碼為_宣告式框架_（declarative framework）。

雖然兩者在與舊有 Android 程式碼互動時有一些關鍵差異，但這兩個框架之間也有許多共通點。

### Composables 與 Widgets

**Jetpack Compose** 以 _composable functions_（可組合函式）來表示 UI 元件，本文後續簡稱為 _composables_。你可以透過 _Modifier_ 物件來調整或裝飾 composable。

``` kotlin
Text("Hello, World!", 
   modifier: Modifier.padding(10.dp)
)
Text("Hello, World!",
    modifier = Modifier.padding(10.dp))
```

**Flutter** 將 UI 元件表示為 _widgets_。

Composables 和 widgets 都只存在於它們需要變更之前。  
這些語言稱這個特性為 _不可變性_。

Jetpack Compose 透過一個可選的 _modifier_ 屬性（由 `Modifier` 物件支援）來修改 UI 元件的屬性。

相較之下，Flutter 則同時使用 widgets 來表示 UI 元件以及它們的屬性。

```dart
Padding(                         // <-- This is a Widget
  padding: EdgeInsets.all(10.0), // <-- So is this
  child: Text("Hello, World!"),  // <-- This, too
)));
```

在進行版面配置（layout）時，Jetpack Compose 與 Flutter 都是將 UI 元件（components）彼此巢狀嵌套。
Jetpack Compose 巢狀 `Composables`，而 Flutter 則巢狀 `Widgets`。

### 版面配置流程

Jetpack Compose 與 Flutter 處理版面配置的方式相似。兩者都會在單一流程中完成 UI 的版面配置，並且父元件會將版面限制（constraints）往下傳遞給子元件。更具體來說：

1. 父元件會遞迴地測量自己及其子元件，並將任何來自父層的限制傳遞給子元件。
2. 子元件會嘗試利用上述方法來決定自己的大小，並將自身的限制以及來自祖先節點的限制傳遞給它們的子元件。
3. 當遇到葉節點（沒有子元件的節點）時，會根據所提供的限制來決定其大小與屬性，並將該元素放置於 UI 中。
4. 當所有子元件都已經決定好大小並完成放置後，根節點就可以決定它們的測量結果、大小與位置。

在 Jetpack Compose 與 Flutter 中，父元件都可以覆寫或限制子元件期望的大小。元件（Widget）無法任意設定自己想要的大小，也通常無法得知或決定自己在螢幕上的位置，因為這是由父元件決定的。

若要強制子元件以特定大小渲染，父元件必須設定嚴格（tight）的限制。
當限制的最小值等於最大值時，這個限制就成為嚴格限制。

若想了解 Flutter 中限制（constraints）如何運作，請參閱 [Understanding constraints][Understanding constraints]。

### 設計系統

由於 Flutter 支援多平台，您的應用程式不必遵循任何特定設計系統。
雖然本指南以 [Material][Material] 元件（Widgets）為主，
但您的 Flutter 應用程式可以使用多種不同的設計系統：

- 自訂 Material 元件
- 社群開發的元件
- 您自訂的元件

如果您正在尋找一個展示自訂設計系統的優秀參考應用程式，請參考 [Wonderous][Wonderous]。

## UI 基礎

本節介紹 Flutter 的 UI 開發基礎，以及與 Jetpack Compose 的比較。
內容包含如何開始開發應用程式、顯示靜態文字、建立按鈕、響應按下事件、顯示清單、格狀佈局等。

### 開始使用

對於 **Compose** 應用程式，主要進入點會是 _Activity_ 或其子類別，通常是 _ComponentActivity_。 

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
通常會以一個 [`WidgetApp`][`WidgetApp`] 類別作為應用程式的起點，
例如 [`MaterialApp`][`MaterialApp`]。

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

在`HomePage`中所使用的元件（Widget）可能會以`Scaffold`類別開始。  
`Scaffold`實作了一個應用程式的基本版面配置結構。

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

請注意 Flutter 如何使用 [`Center`][`Center`] 元件（Widget）。

Compose 承襲自 Android Views，因此有許多預設行為。
除非特別指定，否則大多數元件（Components）會「包裹」其內容大小，
也就是在渲染時只佔用所需的空間。
但在 Flutter 中，情況不一定如此。

若要將文字置中，請將其包裹在 `Center` 元件（Widget）中。
想了解不同元件及其預設行為，請參考
[Widget catalog][Widget catalog]。

### 新增按鈕

在 **Compose** 中，你可以使用 `Button` composable 或其變體來建立按鈕。
在使用 Material 主題時，`Button` 是 `FilledTonalButton` 的別名。

```kotlin
Button(onClick = {}) {
    Text("Do something")
}
```

要在 **Flutter** 中達成相同的效果，
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

Jetpack Compose 和 Flutter 在處理水平與垂直排列的項目時，方式相似。

以下 Compose 程式碼片段會在 `Row` 與 `Column` 容器中，分別加入地球圖示與文字，並將項目置中：

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

**Flutter** 也使用 [`Row`][`Row`] 和 [`Column`][`Column`]，但在指定子元件（child widgets）和對齊方式時有些細微差異。以下範例與 Compose 範例等效。

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

`Row` 和 `Column` 需要在 `children` 參數中指定 `List<Widget>`。
`mainAxisAlignment` 屬性用來告訴 Flutter 如何在有額外空間時排列子元件（children）。
`MainAxisAlignment.center` 會將子元件排列在主軸的中央。對於 `Row`，主軸是水平軸；相反地，`Column` 的主軸則是垂直軸。

::: note
Flutter 的 `Row` 和 `Column` 具有 `MainAxisAlignment` 和 `CrossAxisAlignment` 屬性來控制項目的排列方式，而在 Jetpack Compose 中，控制排列的屬性則分為垂直和水平兩種，分別為以下其中之一：`verticalArrangement`、`verticalAlignment`、`horizontalAlignment` 和 `horizontalArrangement`。判斷哪個是 `MainAxis` 的訣竅是看屬性名稱是否以 `arrangement` 結尾。`CrossAxis` 則是以 `alignment` 結尾的屬性。
:::

### 顯示列表檢視

在 **Compose** 中，你可以根據要顯示的列表大小，選擇不同方式建立列表。若只有少量項目且可一次全部顯示，可以在 `Column` 或 `Row` 中遍歷集合。

若列表項目數量較多，`LazyList` 的效能會更好。它只會建立可見的元件，而非全部都建立。

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

在 Flutter 中，若要以懶加載（lazy load）的方式建立清單（list），....

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
  這個方法的運作方式類似於 Compose `LazyList` 中的 `item` 閉包（closure）。

- `ListView` 的 `itemCount` 參數會設定 `ListView` 要顯示多少個項目。

- `itemBuilder` 會有一個 index 參數，其值會介於 0 到 itemCount 減 1 之間。

前面的範例會為每個項目回傳一個 [`ListTile`][`ListTile`] 元件（Widget）。
`ListTile` 元件包含像是 `height` 和 `font-size` 這樣的屬性，
這些屬性有助於建立清單。不過，Flutter 允許你回傳幾乎任何能夠代表資料的元件（Widget）。

### 顯示格狀佈局（Grid）

在 **Compose** 中建構格狀佈局（Grid）與 LazyList（`LazyColumn` 或 `LazyRow`）類似。
你可以使用相同的 `items` 閉包（closure）。
每種格狀佈局類型都有一些屬性可以用來指定項目的排列方式，
包含是否使用自適應（adaptive）或固定（fixed）佈局等。


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

要在 **Flutter** 中顯示網格，請使用 [`GridView`] 元件 (Widget)。
這個元件有多種建構函式，每個建構函式的目標類似，但所需的輸入參數不同。
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

`SliverGridDelegateWithFixedCrossAxisCount` 委派（delegate）決定了網格（grid）在排版其元件（components）時所使用的各種參數。其中包括`crossAxisCount`，這會決定每一列顯示的項目數量。

Jetpack Compose 的 `LazyHorizontalGrid`、`LazyVerticalGrid` 與 Flutter 的 `GridView` 有些類似。`GridView` 會使用委派來決定網格該如何排列其元件。`rows`、`columns` 以及 `LazyHorizontalGrid` \ `LazyVerticalGrid` 上的其他關聯屬性也有相同的用途。

### 建立可滾動視圖

**Jetpack Compose** 中的 `LazyColumn` 和 `LazyRow` 內建支援滾動功能。

若要建立可滾動視圖，**Flutter** 會使用 [`SingleChildScrollView`][`SingleChildScrollView`]。在以下範例中，函式 `mockPerson` 會模擬 `Person` 類別的實例，以建立自訂的 `PersonView` 元件（Widget）。

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

**Compose** 中的自適應設計是一個複雜的主題，且有多種可行的解決方案：
* 使用自訂版面配置
* 僅使用 `WindowSizeClass`
* 使用 `BoxWithConstraints` 根據可用空間控制顯示內容
* 使用 Material 3 的自適應函式庫，該函式庫結合了 `WindowSizeClass` 以及針對常見版面配置設計的專用可組合版面

因此，建議你直接參考 **Flutter** 的相關選項，根據你的需求選擇最合適的方案，而不是嘗試尋找一對一的對應方式。

在 **Flutter** 中建立相對版面配置時，你可以採用以下兩種方式：

- 在 [`LayoutBuilder`][`LayoutBuilder`] 類別中取得 `BoxConstraints` 物件。
- 在建構函式中使用 [`MediaQuery.of()`][`MediaQuery.of()`]，以取得目前應用程式的尺寸與方向。

想了解更多，請參考 [Creating responsive and adaptive apps][Creating responsive and adaptive apps]。

### 狀態管理

**Compose** 透過 `remember` API 以及 `MutableState` 介面的衍生類別來儲存狀態。

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


**Flutter** 使用 [`StatefulWidget`][`StatefulWidget`] 來管理本地狀態。
要實作一個有狀態元件（Stateful widget），需包含以下兩個類別：

- `StatefulWidget` 的子類別
- `State` 的子類別

`State` 物件會儲存該元件的狀態。
若要改變元件的狀態，請從 `State` 子類別中呼叫 `setState()`，
以通知框架重新繪製該元件。

以下範例展示了一個計數器應用程式的一部分：

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

想了解更多狀態管理的方法，請參閱[State management][State management]。


### 螢幕繪製

在 **Compose** 中，你可以使用 `Canvas` composable 來在螢幕上繪製圖形、圖片與文字。

**Flutter** 則是基於 `Canvas` 類別的 API，並提供兩個協助你繪製的類別：

1. [`CustomPaint`][`CustomPaint`]，此類別需要一個 painter：

    ```dart 
    CustomPaint(
      painter: SignaturePainter(_points),
      size: Size.infinite,
    ),
    ```

2. [`CustomPainter`][`CustomPainter`]，實作你的演算法以繪製到畫布上。

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

你可以輕鬆地為 Flutter 應用程式進行樣式設計。  
樣式設計包括在明亮與深色主題之間切換、  
變更文字與 UI 元件（Widgets）的設計，  
以及更多功能。本節將介紹如何為你的應用程式進行樣式設計。

### 使用深色模式

在 **Compose** 中，你可以在任意層級控制明亮與深色，  
只需將元件包裹在 `Theme` composable 內即可。

在 **Flutter** 中，你可以在應用程式層級控制明亮與深色模式。  
若要控制亮度模式，請使用 `App` 類別的 `theme` 屬性：

```dart
const MaterialApp(
  theme: ThemeData(
    brightness: Brightness.dark,
  ),
  home: HomePage(),
);
```

### 設定文字樣式

在 **Compose** 中，你可以直接使用 `Text` 的屬性來設定一到兩個屬性，或是建立一個 `TextStyle` 物件，一次設定多個屬性。

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

在 **Compose** 中，你可以透過 `colors` 屬性來修改按鈕的顏色。如果未進行修改，則會使用目前主題的預設值。

```kotlin
Button(onClick = {},
   colors = ButtonDefaults.buttonColors().copy(
      containerColor = Color.Yellow, contentColor = Color.Blue,
       )) {
    Text("Do something", fontSize = 30.sp, fontWeight = FontWeight.Bold)
}
```

在 **Flutter** 中，為按鈕元件 (Widgets) 設定樣式的方法類似：你可以設定其子元件 (child) 的樣式，或直接修改按鈕本身的屬性來達到目的。

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
## 為 Flutter 打包資源以供使用

在開發應用程式時，通常會需要打包各種資源（Assets）以供使用。這些資源可以是動畫（Animation）、向量圖形、圖片（images）、字型，或其他一般檔案。

與原生 Android 應用程式不同，Android 會要求在`/res/<qualifier>/`下有特定的目錄結構，這些限定詞（qualifier）可能用來標示檔案類型、特定方向或 Android 版本；而 Flutter 則不要求資源必須放在特定位置，只要在`pubspec.yaml`檔案中有列出對應的檔案即可。以下是一段`pubspec.yaml`的範例，參考了多個圖片和一個字型檔案。

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
你可以使用執行階段服務來取得字型，例如 [Google Fonts][Google Fonts]。
或者，也可以將字型檔案打包在資源檔案中。

**Flutter** 也有類似的方法來使用字型，以下我們會一起說明這兩種方式。

### 使用打包字型

以下是 Compose 與 Flutter 使用字型檔案於 `/res/` 或 `fonts` 目錄（如上所述）的對應程式碼範例。

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

一個差異點在於使用像 Google Fonts 這樣的字型提供者。在 **Compose** 中，
實例化的方式是直接在程式碼中撰寫，與參考本機檔案的程式碼大致相同。

在實例化一個參考字型服務特殊字串的提供者之後，
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

在 Flutter 中，這可以透過 [google_fonts][google_fonts] 套件，使用字型名稱來實現。

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

在 **Compose** 中，通常會將圖片檔案放到資源的 drawable 目錄`/res/drawable`，並使用 `Image` composable 來顯示圖片。資源會以 `R.drawable.<file name>` 這種沒有副檔名的資源定位方式來引用。

在 **Flutter** 中，資源的位置會如下面程式碼片段所示，列在 `pubspec.yaml` 中。

```yaml
    flutter:
      assets:
        - images/Blueberries.jpg
   ```

加入圖片後，你可以使用 `Image` 元件（Widget）的 `.asset()` 建構函式來顯示圖片。這個建構函式：

若要查看完整範例，請參閱 [`Image`][`Image`] 文件。


[Flutter for Android developers]: /get-started/flutter-for/android-devs
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
