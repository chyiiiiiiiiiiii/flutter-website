# 新的按鈕與按鈕主題

> 基本的 Material 按鈕類別已被取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Flutter 新增了一組全新的基本 Material 按鈕元件 (Widget) 與主題。原有的類別已被棄用，未來將會移除。這次更新的整體目標，是讓按鈕更具彈性，並且更容易透過建構函式參數或主題（theme）進行設定。

`FlatButton`、`RaisedButton` 與 `OutlineButton` 元件已分別被 `TextButton`、`ElevatedButton` 和 `OutlinedButton` 取代。每個新的按鈕類別都有對應的主題：`TextButtonTheme`、`ElevatedButtonTheme` 和 `OutlinedButtonTheme`。原本的 `ButtonTheme` 類別已不再使用。按鈕的外觀現在是由 `ButtonStyle` 物件來指定，而不再是透過大量的元件參數與屬性。這種設計大致上類似於用 `TextStyle` 物件來定義文字外觀。新的按鈕主題同樣是透過 `ButtonStyle` 物件來設定。`ButtonStyle` 本身就是一組視覺屬性的集合。其中許多屬性是用 `MaterialStateProperty` 定義的，這代表它們的值可以根據按鈕的狀態而變化。


## 背景說明

我們選擇不直接在原有的按鈕類別及其主題上進行演進，而是推出全新的替代按鈕元件與主題。這樣除了可以避免因相容性導致的複雜問題外，新的命名也讓 Flutter 再次與 Material Design 規範同步，因為規範中對按鈕元件已採用這些新名稱。

| 舊元件（Widget） | 舊主題（Theme） | 新元件（Widget） | 新主題（Theme）             |
|-----------------|---------------|------------------|-----------------------|
| `FlatButton`    | `ButtonTheme` | `TextButton`     | `TextButtonTheme`     |
| `RaisedButton`  | `ButtonTheme` | `ElevatedButton` | `ElevatedButtonTheme` |
| `OutlineButton` | `ButtonTheme` | `OutlinedButton` | `OutlinedButtonTheme` |

{:.table .table-striped .nowrap}

新的主題遵循 Flutter 約一年前針對新 Material 元件所採用的「標準化」模式。主題屬性與元件建構函式參數預設為 null。若主題屬性或元件參數非 null，則代表要覆寫元件的預設值。實作與說明預設值，是按鈕元件本身的唯一責任。這些預設值主要根據整體主題（Theme）的 colorScheme 與 textTheme 來決定。

在視覺上，新的按鈕會有些微不同，因為它們符合最新的 Material Design 規範，並且顏色設定是以整體主題的 ColorScheme 為基礎。此外，內距（padding）、圓角半徑，以及 hover/focus/pressed 等回饋效果也有些細微差異。

許多應用程式只需將舊的類別名稱直接替換為新的即可。若您的應用程式有 golden image 測試，或是按鈕外觀是透過建構函式參數或原本的 `ButtonTheme` 進行設定，則可能需要參考遷移指南與下方的說明內容。

## API 變更：以 ButtonStyle 取代個別樣式屬性

除了簡單的使用情境外，新的按鈕類別 API 與舊類別並不相容。新的按鈕與主題的視覺屬性，都是透過單一的 `ButtonStyle` 物件來設定，這類似於如何用 `TextField` 或 `Text` 元件搭配 `TextStyle` 物件進行設定。大多數 `ButtonStyle` 屬性都是用 `MaterialStateProperty` 定義，因此單一屬性可以根據按鈕的 pressed/focused/hovered 等不同狀態，對應不同的值。

按鈕的 `ButtonStyle` 並不會定義按鈕的視覺屬性，而是用來覆寫按鈕預設的視覺屬性，這些預設屬性是由按鈕元件本身計算得出。例如，若要覆寫 `TextButton` 在所有狀態下的預設前景（文字/圖示）顏色，可以這麼寫：

```dart
TextButton(
  style: ButtonStyle(
    foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

這類覆寫（override）很常見；然而，在許多情況下，還需要覆寫文字按鈕（text button）用來表示其滑鼠懸停、聚焦（focus）或按下（pressed）狀態時所使用的覆蓋色（overlay colors）。這可以透過在 `ButtonStyle` 中新增 `overlayColor` 屬性來達成。

```dart
TextButton(
  style: ButtonStyle(
    foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.hovered))
          return Colors.blue.withOpacity(0.04);
        if (states.contains(MaterialState.focused) ||
            states.contains(MaterialState.pressed))
          return Colors.blue.withOpacity(0.12);
        return null; // Defer to the widget's default.
      },
    ),
  ),
  onPressed: () { },
  child: Text('TextButton')
)
```

一個色彩 `MaterialStateProperty` 只需要針對預設值需要被覆寫的顏色回傳一個值即可。如果回傳 `null`，則會使用元件的預設值。例如，若只想覆寫文字按鈕的 focus overlay 顏色：

```dart
TextButton(
  style: ButtonStyle(
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.focused))
          return Colors.red;
        return null; // Defer to the widget's default.
      }
    ),
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

### `styleFrom()` ButtonStyle 工具方法

Material Design 規範以色彩方案（color scheme）的主色（primary color）來定義按鈕的前景色（foreground）和覆蓋色（overlay）。主色會根據按鈕的不同狀態，以不同的不透明度來呈現。為了簡化建立包含所有依賴色彩方案顏色屬性的按鈕樣式，每個按鈕類別都包含一個靜態的 `styleFrom()` 方法，可以根據一組簡單的值（包括其所依賴的 `ColorScheme` 顏色）來建構 `ButtonStyle`。

以下範例建立了一個按鈕，並使用指定的主色來覆寫其前景色以及覆蓋色，同時套用 Material Design 規範中定義的不透明度。

```dart
TextButton(
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,
  ),
  onPressed: () { },
  child: Text('TextButton'),
)
```

`TextButton` 文件指出，當按鈕處於停用狀態時，其前景顏色會根據配色方案（color scheme）的 `disabledForegroundColor` 顏色來設定。若要一併覆寫這個設定，可以使用 `styleFrom()`：

```dart
TextButton(
  style: TextButton.styleFrom(
    foregroundColor: Colors.blue,
    disabledForegroundColor: Colors.red,
  ),
  onPressed: null,
  child: Text('TextButton'),
)
```

使用 `styleFrom()` 方法是建立 `ButtonStyle` 的首選方式，特別是當你想要創建一個 Material Design 變體時。最具彈性的做法是直接定義一個 `ButtonStyle`，並針對你想要覆蓋外觀的狀態，為其指定 `MaterialStateProperty` 值。

## ButtonStyle 預設值

像新按鈕類別這樣的元件會根據整體主題的 `colorScheme` 和 `textTheme`，以及按鈕目前的狀態，來「計算」它們的預設值。在某些情況下，它們也會考慮整體主題的色彩方案是明亮還是深色。每個按鈕都有一個受保護的方法，會在需要時計算其預設樣式。雖然應用程式不會直接呼叫這個方法，但其 API 文件會說明所有預設值。當按鈕或按鈕主題指定 `ButtonStyle` 時，只有按鈕樣式中非 null 的屬性會覆蓋計算出的預設值。按鈕的 `style` 參數會覆蓋對應按鈕主題中指定的非 null 屬性。例如，如果 `TextButton` 的樣式中的 `foregroundColor` 屬性非 null，則會覆蓋 `TextButtonTheme` 樣式中的同一屬性。

如前所述，每個按鈕類別都包含一個名為 `styleFrom` 的靜態方法，該方法會從一組簡單的值（包括它所依賴的 `ColorScheme` 顏色）建立 ButtonStyle。在許多常見情境下，使用 `styleFrom` 來建立一個臨時的 `ButtonStyle` 以覆蓋預設值，是最簡單的做法。這在自訂樣式的目的是要覆蓋預設樣式所依賴的某個色彩方案顏色（如 `primary` 或 `onPrimary`）時尤其適用。對於其他情況，你可以直接建立 `ButtonStyle` 物件。這樣做可以讓你控制所有按鈕可能狀態（如按下、懸停、停用、聚焦）下的視覺屬性值，例如顏色。


## 遷移指南

請參考以下資訊，將你的按鈕遷移到新 API。

### 還原原始按鈕的視覺效果

在許多情況下，只需將舊的按鈕類別切換為新的即可。這假設你不在意尺寸／形狀上的微小變化，以及顏色上可能較大的變動。

若要在這些情況下保留原始按鈕的外觀，可以定義與原始按鈕外觀盡可能相符的按鈕樣式。例如，以下樣式會讓 `TextButton` 看起來像預設的 `FlatButton`：

```dart
final ButtonStyle flatButtonStyle = TextButton.styleFrom(
  foregroundColor: Colors.black87,
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
);

TextButton(
  style: flatButtonStyle,
  onPressed: () { },
  child: Text('Looks like a FlatButton'),
)
```

同樣地，若要讓 `ElevatedButton` 看起來像預設的 `RaisedButton`：

```dart
final ButtonStyle raisedButtonStyle = ElevatedButton.styleFrom(
  foregroundColor: Colors.black87,
  backgroundColor: Colors.grey[300],
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
);
ElevatedButton(
  style: raisedButtonStyle,
  onPressed: () { },
  child: Text('Looks like a RaisedButton'),
)
```

`OutlinedButton` 的 `OutlineButton` 樣式會稍微複雜一些，因為當按鈕被按下時，外框（outline）的顏色會變為主色（primary color）。外框的外觀是由 `BorderSide` 定義的，而你會使用 `MaterialStateProperty` 來定義按下時的外框顏色：

```dart
final ButtonStyle outlineButtonStyle = OutlinedButton.styleFrom(
  foregroundColor: Colors.black87,
  minimumSize: Size(88, 36),
  padding: EdgeInsets.symmetric(horizontal: 16),
  shape: const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(2)),
  ),
).copyWith(
  side: MaterialStateProperty.resolveWith<BorderSide?>(
    (Set<MaterialState> states) {
      if (states.contains(MaterialState.pressed)) {
        return BorderSide(
          color: Theme.of(context).colorScheme.primary,
          width: 1,
        );
      }
      return null;
    },
  ),
);

OutlinedButton(
  style: outlineButtonStyle,
  onPressed: () { },
  child: Text('Looks like an OutlineButton'),
)
```

若要在整個應用程式中還原按鈕的預設外觀，您可以在應用程式的主題（theme）中設定新的按鈕主題（button themes）：

```dart
MaterialApp(
  theme: ThemeData.from(colorScheme: ColorScheme.light()).copyWith(
    textButtonTheme: TextButtonThemeData(style: flatButtonStyle),
    elevatedButtonTheme: ElevatedButtonThemeData(style: raisedButtonStyle),
    outlinedButtonTheme: OutlinedButtonThemeData(style: outlineButtonStyle),
  ),
)
```

若要在應用程式的某一部分恢復按鈕的預設外觀，您可以將元件（Widget）子樹包裹在 `TextButtonTheme`、`ElevatedButtonTheme` 或 `OutlinedButtonTheme` 中。例如：

```dart
TextButtonTheme(
  data: TextButtonThemeData(style: flatButtonStyle),
  child: myWidgetSubtree,
)
```

### 遷移具有自訂顏色的按鈕

以下章節將說明如何使用 `FlatButton`、`RaisedButton` 和 `OutlineButton` 這些顏色參數：

```dart
textColor
disabledTextColor
color
disabledColor
focusColor
hoverColor
highlightColor*
splashColor
```

新的按鈕類別（button classes）不再支援獨立的高亮顏色（highlight color），因為這已經不再是 Material Design 的一部分。

#### 遷移具有自訂前景色與背景色的按鈕

在原有的按鈕類別中，兩個常見的自訂方式分別是為 `FlatButton` 設定自訂前景色，或是為 `RaisedButton` 設定自訂前景色與背景色。要在新的按鈕類別中達到相同的效果，其實很簡單：

```dart
FlatButton(
  textColor: Colors.red, // foreground
  onPressed: () { },
  child: Text('FlatButton with custom foreground/background'),
)

TextButton(
  style: TextButton.styleFrom(
    foregroundColor Colors.red,
  ),
  onPressed: () { },
  child: Text('TextButton with custom foreground'),
)
```

在此情境下，`TextButton` 的前景（文字／圖示）顏色，以及其滑鼠懸停／獲得焦點／按下時的覆蓋顏色，將會根據 `Colors.red` 設定。預設情況下，`TextButton` 的背景填充顏色為透明。

遷移具有自訂前景與背景顏色的 `RaisedButton`：

```dart
RaisedButton(
  color: Colors.red, // background
  textColor: Colors.white, // foreground
  onPressed: () { },
  child: Text('RaisedButton with custom foreground/background'),
)

ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.red,
    foregroundColor: Colors.white,
  ),
  onPressed: () { },
  child: Text('ElevatedButton with custom foreground/background'),
)
```

在這個情境下，按鈕對於配色方案中的 primary 色彩的使用方式，與 `TextButton` 相較是相反的：primary 成為按鈕的背景填充顏色，而 `onPrimary` 則作為前景（文字／圖示）顏色。

#### 遷移具有自訂疊加色的按鈕

覆寫按鈕預設的聚焦（focused）、懸停（hovered）、高亮（highlighted）或波紋（splash）顏色的情況較為少見。`FlatButton`、`RaisedButton` 和 `OutlineButton` 這些類別，各自有對應這些狀態相關顏色的獨立參數。新的 `TextButton`、`ElevatedButton` 和 `OutlinedButton` 類別則改為僅使用單一的 `MaterialStateProperty<Color>` 參數。新的按鈕允許你為所有顏色指定狀態相關的值，而原本的按鈕僅支援指定現在稱為 "overlayColor" 的部分。

```dart
FlatButton(
  focusColor: Colors.red,
  hoverColor: Colors.green,
  splashColor: Colors.blue,
  onPressed: () { },
  child: Text('FlatButton with custom overlay colors'),
)

TextButton(
  style: ButtonStyle(
    overlayColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.focused))
          return Colors.red;
        if (states.contains(MaterialState.hovered))
            return Colors.green;
        if (states.contains(MaterialState.pressed))
            return Colors.blue;
        return null; // Defer to the widget's default.
    }),
  ),
  onPressed: () { },
  child: Text('TextButton with custom overlay colors'),
)
```

新版本雖然不如舊版精簡，但更加靈活。在原本的版本中，不同狀態的優先順序是隱含（且未記錄）且固定的；而在新版本中，這些優先順序是明確的。對於經常需要自訂這些顏色的應用程式來說，最簡單的遷移方式是定義一個或多個 `ButtonStyles`，使其符合上述範例，然後直接使用 `style` 參數，或者定義一個無狀態包裝元件（stateless wrapper widget），將這三個顏色參數封裝起來。

#### 遷移具有自訂停用顏色的按鈕

這是一種相對少見的自訂需求。`FlatButton`、`RaisedButton` 和 `OutlineButton` 類別都擁有 `disabledTextColor` 與 `disabledColor` 參數，用來定義當按鈕的 `onPressed` 回呼（callback）為 null 時的背景與前景顏色。

預設情況下，所有按鈕都會使用色彩方案（color scheme）中的 `disabledForegroundColor` 顏色，並將停用狀態下的前景顏色透明度設為 0.38。只有 `ElevatedButton` 具有非透明的背景顏色，其預設值為 `disabledForegroundColor` 顏色並設置透明度為 0.12。因此，在許多情況下，你只需要使用 `styleFrom` 方法來覆寫停用狀態下的顏色即可：

```dart
RaisedButton(
  disabledColor: Colors.red.withOpacity(0.12),
  disabledTextColor: Colors.red.withOpacity(0.38),
  onPressed: null,
  child: Text('RaisedButton with custom disabled colors'),
),

ElevatedButton(
  style: ElevatedButton.styleFrom(disabledForegroundColor: Colors.red),
  onPressed: null,
  child: Text('ElevatedButton with custom disabled colors'),
)
```

若要完全控制 disabled 狀態下的顏色，必須明確地以 `MaterialStateProperties` 的方式定義 `ElevatedButton` 的樣式：

```dart
RaisedButton(
  disabledColor: Colors.red,
  disabledTextColor: Colors.blue,
  onPressed: null,
  child: Text('RaisedButton with custom disabled colors'),
)

ElevatedButton(
  style: ButtonStyle(
    backgroundColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled))
          return Colors.red;
        return null; // Defer to the widget's default.
    }),
    foregroundColor: MaterialStateProperty.resolveWith<Color?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.disabled))
          return Colors.blue;
        return null; // Defer to the widget's default.
    }),
  ),
  onPressed: null,
  child: Text('ElevatedButton with custom disabled colors'),
)
```

如同前述案例，在經常需要進行此遷移的應用程式中，有明顯的方法可以讓新版實作更加簡潔。

#### 遷移具有自訂陰影高度（elevation）的按鈕

這同樣屬於相對少見的自訂情境。通常，只有 `ElevatedButton`（最初稱為 `RaisedButtons`）會包含陰影高度的變化。若陰影高度是依據基準陰影高度（根據 Material Design 規範）成比例調整，可以很簡單地覆寫所有相關設定。

預設情況下，停用（disabled）按鈕的陰影高度為 0，其餘狀態則是以基準值 2 為相對基準來定義：

```dart
disabled: 0
hovered or focused: baseline + 2
pressed: baseline + 6
```

因此，若要遷移一個已經定義所有 elevation 的 `RaisedButton`：

```dart
RaisedButton(
  elevation: 2,
  focusElevation: 4,
  hoverElevation: 4,
  highlightElevation: 8,
  disabledElevation: 0,
  onPressed: () { },
  child: Text('RaisedButton with custom elevations'),
)

ElevatedButton(
  style: ElevatedButton.styleFrom(elevation: 2),
  onPressed: () { },
  child: Text('ElevatedButton with custom elevations'),
)
```

若只想任意覆寫某一個 elevation，例如 pressed elevation：

```dart
RaisedButton(
  highlightElevation: 16,
  onPressed: () { },
  child: Text('RaisedButton with a custom elevation'),
)

ElevatedButton(
  style: ButtonStyle(
    elevation: MaterialStateProperty.resolveWith<double?>(
      (Set<MaterialState> states) {
        if (states.contains(MaterialState.pressed))
          return 16;
        return null;
      }),
  ),
  onPressed: () { },
  child: Text('ElevatedButton with a custom elevation'),
)
```

#### 遷移具有自訂形狀與邊框的按鈕

原本的 `FlatButton`、`RaisedButton` 和 `OutlineButton` 類別都提供了一個 shape 參數，用來同時定義按鈕的形狀以及其外框（outline）的外觀。對應的新類別及其主題化（theming）則支援分別指定按鈕的形狀與邊框，分別透過 `OutlinedBorder shape` 和 `BorderSide side` 參數來設定。

在這個範例中，原本的 `OutlineButton` 版本在按鈕被高亮（按下）狀態時，為邊框指定了與其他狀態相同的顏色。

```dart
OutlineButton(
  shape: StadiumBorder(),
  highlightedBorderColor: Colors.red,
  borderSide: BorderSide(
    width: 2,
    color: Colors.red
  ),
  onPressed: () { },
  child: Text('OutlineButton with custom shape and border'),
)

OutlinedButton(
  style: OutlinedButton.styleFrom(
    shape: StadiumBorder(),
    side: BorderSide(
      width: 2,
      color: Colors.red
    ),
  ),
  onPressed: () { },
  child: Text('OutlinedButton with custom shape and border'),
)
```

大多數新的 `OutlinedButton` 元件的樣式參數，包括其形狀與邊框，都可以使用 `MaterialStateProperty` 值來指定。也就是說，這些參數可以根據按鈕的不同狀態有不同的值。若要在按鈕被按下時指定不同的邊框顏色，請按照以下方式操作：

```dart
OutlineButton(
  shape: StadiumBorder(),
  highlightedBorderColor: Colors.blue,
  borderSide: BorderSide(
    width: 2,
    color: Colors.red
  ),
  onPressed: () { },
  child: Text('OutlineButton with custom shape and border'),
)

OutlinedButton(
  style: ButtonStyle(
    shape: MaterialStateProperty.all<OutlinedBorder>(StadiumBorder()),
    side: MaterialStateProperty.resolveWith<BorderSide>(
      (Set<MaterialState> states) {
        final Color color = states.contains(MaterialState.pressed)
          ? Colors.blue
          : Colors.red;
        return BorderSide(color: color, width: 2);
      }
    ),
  ),
  onPressed: () { },
  child: Text('OutlinedButton with custom shape and border'),
)
```

## 時程

首次納入版本：1.20.0-0.0.pre<br>
穩定版釋出：2.0.0

## 參考資料

API 文件：

* [`ButtonStyle`][]
* [`ButtonStyleButton`][]
* [`ElevatedButton`][]
* [`ElevatedButtonTheme`][]
* [`ElevatedButtonThemeData`][]
* [`OutlinedButton`][]
* [`OutlinedButtonTheme`][]
* [`OutlinedButtonThemeData`][]
* [`TextButton`][]
* [`TextButtonTheme`][]
* [`TextButtonThemeData`][]

相關 PR：

* [PR 59702: New Button Universe][]
* [PR 73352: Deprecated obsolete Material classes: FlatButton, RaisedButton, OutlineButton][]


[`ButtonStyle`]: https://api.flutter.dev/flutter/material/ButtonStyle-class.html
[`ButtonStyleButton`]: https://api.flutter.dev/flutter/material/ButtonStyleButton-class.html
[`ElevatedButton`]: https://api.flutter.dev/flutter/material/ElevatedButton-class.html
[`ElevatedButtonTheme`]: https://api.flutter.dev/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButtonThemeData`]: https://api.flutter.dev/flutter/material/ElevatedButtonThemeData-class.html
[`OutlinedButton`]: https://api.flutter.dev/flutter/material/OutlinedButton-class.html
[`OutlinedButtonTheme`]: https://api.flutter.dev/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButtonThemeData`]: https://api.flutter.dev/flutter/material/OutlinedButtonThemeData-class.html
[`TextButton`]: https://api.flutter.dev/flutter/material/TextButton-class.html
[`TextButtonTheme`]: https://api.flutter.dev/flutter/material/TextButtonTheme-class.html
[`TextButtonThemeData`]: https://api.flutter.dev/flutter/material/TextButtonThemeData-class.html

[PR 59702: New Button Universe]: https://github.com/flutter/flutter/pull/59702
[PR 73352: Deprecated obsolete Material classes: FlatButton, RaisedButton, OutlineButton]: https://github.com/flutter/flutter/pull/73352

