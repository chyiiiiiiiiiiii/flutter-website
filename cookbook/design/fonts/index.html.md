# 使用自訂字型

> 如何使用自訂字型。



<?code-excerpt path-base="cookbook/design/fonts/"?>

:::secondary 你將學到什麼
* 如何選擇字型。
* 如何匯入字型檔案。
* 如何將字型設為預設。
* 如何在特定元件（Widget）中使用字型。
:::

雖然 Android 和 iOS 都提供高品質的系統字型，
但設計師通常希望能支援自訂字型。
你可能有設計師專門設計的自訂字型，
或者你從 [Google Fonts][] 下載了字型。

字體（typeface）是由一組字形（glyphs）或形狀組成的特定字母樣式集合。
字型（font）則是在特定字重或變化下的字體表現形式。
Roboto 是一種字體（typeface），而 Roboto Bold 則是一種字型（font）。

Flutter 允許你將自訂字型套用到整個應用程式，或僅套用到個別元件 (Widget)。
本教學將透過以下步驟建立一個使用自訂字型的應用程式：

1. 選擇你的字型。
1. 匯入字型檔案。
1. 在 pubspec 中宣告字型。
1. 將字型設為預設。
1. 在特定元件中使用字型。

你不需要逐步跟著每個步驟操作，
本指南在最後會提供完整的範例檔案。

:::note
本指南假設你已經完成以下事項：

1. 你已經[設定好你的 Flutter 開發環境][set up your Flutter environment]。
1. 你已經[建立了一個新的 Flutter 應用程式][new-flutter-app]，名稱為 `custom_fonts`。
   如果你還沒完成這些步驟，請先完成再繼續本指南。
1. 你是在 macOS 或 Linux shell 中執行指令，並使用 `vi`。
   你可以將任何文字編輯器替換為 `vi`。
   Windows 使用者在執行步驟時，請使用適合的指令與路徑。
1. 你要將 Raleway 和 RobotoMono 字型加入你的 Flutter 應用程式。
:::

[set up your Flutter environment]: /install
[new-flutter-app]: /reference/create-new-app

## 選擇字型

你對字型的選擇不僅僅是個人偏好。
請考慮哪些檔案格式與 Flutter 相容，
以及字型如何影響設計選項與應用程式效能。

#### 選擇支援的字型格式

Flutter 支援以下字型格式：

* OpenType 字型集合：`.ttc`
* TrueType 字型：`.ttf`
* OpenType 字型：`.otf`

Flutter 在桌面平台上不支援 Web Open Font Format，
`.woff` 和 `.woff2`。

#### 根據特定優勢選擇字型

很少有資料來源對於什麼是字型檔案類型或哪種較省空間有一致看法。
不同字型檔案類型的關鍵差異在於格式如何在檔案中編碼字形（glyphs）。
大多數 TrueType 與 OpenType 字型檔案功能相似，
因為隨著格式與字型的演進，彼此互相借鑑。

你該選擇哪種字型，需根據以下考量：

* 你的應用程式需要多少字型變化？
* 你能接受字型在應用程式中佔用多少檔案大小？
* 你的應用程式需要支援多少種語言？

請研究每種字型所提供的選項，
例如每個字型檔案是否支援多種字重或樣式、
[可變字型功能][variable-fonts]、
是否有多個字型檔案對應多種字重，
或是否支援多種字寬。

請選擇能滿足你應用程式設計需求的字體（typeface）或字型家族（font family）。

:::secondary
若想了解如何直接取得超過 1,000 種開源字型家族，
請參考 [google_fonts][] 套件。

<YouTubeEmbed id="8Vzv2CdbEY0"
  title="google_fonts | Flutter package of the week"></YouTubeEmbed>

若想了解另一種可讓你在多個專案間重複使用同一字型的自訂字型用法，
請參考[從套件匯出字型][Export fonts from a package]。
:::

## 匯入字型檔案

要在 Flutter 專案中使用字型，需先將其字型檔案匯入專案。

請依照以下步驟匯入字型檔案：

1. 若有需要，為了與本指南後續步驟一致，
   請將你的 Flutter 應用程式名稱更改為 `custom_fonts`。

   ```console
   $ mv /path/to/my_app /path/to/custom_fonts
   ```

1. 前往你的 Flutter 專案根目錄。

   ```console
   $ cd /path/to/custom_fonts
   ```

1. 在你的 Flutter 專案根目錄下建立一個 `fonts` 目錄。

   ```console
   $ mkdir fonts
   ```

1. 將字型檔案移動或複製到 Flutter 專案根目錄下的 `fonts` 或 `assets` 目錄中。

   ```console
   $ cp ~/Downloads/*.ttf ./fonts
   ```

最終的資料夾結構應該如下所示：

```plaintext
custom_fonts/
|- fonts/
  |- Raleway-Regular.ttf
  |- Raleway-Italic.ttf
  |- RobotoMono-Regular.ttf
  |- RobotoMono-Bold.ttf
```

## 在 pubspec.yaml（設定檔）中宣告字型

下載字型後，
請在 `pubspec.yaml` 檔案中加入字型定義。
這個字型定義同時指定了在你的應用程式中，
針對不同字重或樣式應該使用哪個字型檔案來呈現。

### 在 `pubspec.yaml` 檔案中定義字型

若要將字型檔案加入你的 Flutter 應用程式，請依照以下步驟操作。

1. 在你的 Flutter 專案根目錄下，開啟 `pubspec.yaml` 檔案。

   ```console
   $ vi pubspec.yaml
   ```

1. 將以下 YAML 區塊貼在 `flutter` 宣告之後。

   ```yaml
     fonts:
       - family: Raleway
         fonts:
           - asset: fonts/Raleway-Regular.ttf
           - asset: fonts/Raleway-Italic.ttf
             style: italic
       - family: RobotoMono
         fonts:
           - asset: fonts/RobotoMono-Regular.ttf
           - asset: fonts/RobotoMono-Bold.ttf
             weight: 700
   ```

這個 `pubspec.yaml` 檔案定義了 `Raleway` 字型家族的斜體樣式，對應的字型檔案為 `Raleway-Italic.ttf`。
當你設定 `style: TextStyle(fontStyle: FontStyle.italic)` 時，
Flutter 會將 `Raleway-Regular` 替換為 `Raleway-Italic`。

`family` 值設定了字型的名稱。
你可以在 [`fontFamily`][] 屬性中，於 [`TextStyle`][] 物件使用這個名稱。

`asset` 的值是從 `pubspec.yaml` 檔案到字型檔案的相對路徑。
這些檔案包含了字型中字形（glyphs）的輪廓。
在建置應用程式時，
Flutter 會將這些檔案包含在應用程式的資源包（asset bundle）中。

### 為每種字型包含字型檔案

不同的字型設計會以不同方式實作字型檔案。
如果你需要一個有多種字重與樣式的字型，
請選擇並匯入能代表這些變化的字型檔案。

當你匯入的字型檔案本身不包含多種字型或可變字型（variable font）功能時，
請不要使用 `style` 或 `weight` 屬性來調整顯示方式。
如果你在一般字型檔案上使用這些屬性，
Flutter 會嘗試_模擬_該外觀。
這樣的視覺效果會與使用正確字型檔案時有明顯差異。

### 宣告樣式與字重

Flutter 不會從字型檔名推斷字型的字重或樣式。
若要使用特定字重或樣式，你必須在 `pubspec.yaml` 中為該字型檔案明確宣告 `weight` 或 `style` 屬性。

#### 設定字型粗細（weight）

`weight` 屬性以 100 到 900 之間、100 的整數倍指定檔案中字形輪廓的粗細。
這些值對應到 [`FontWeight`][]，並可用於
[`fontWeight`][fontWeight property] 屬性，於 [`TextStyle`][] 物件中。

在本指南中展示的 `pubspec.yaml`，
你已將 `RobotoMono-Bold` 定義為該字型家族的 `700` 粗細。
若要使用你加入應用程式的 `RobotoMono-Bold` 字型，
請在 `TextStyle` 元件中將 `fontWeight` 設為 `FontWeight.w700`。

如果你沒有將 `RobotoMono-Bold` 加入應用程式並宣告其字重，
Flutter 會嘗試讓字型看起來較粗（bold）。
這樣文字可能會顯得較深色。

你無法使用 `weight` 屬性來覆蓋字型的粗細。
你不能將 `RobotoMono-Bold` 設為 `700` 以外的其他粗細。
即使你設定了 `TextStyle(fontFamily: 'RobotoMono', fontWeight: FontWeight.w900)`，
實際顯示的字型仍會以 `RobotoMono-Bold` 的粗細呈現。

#### 設定字型樣式（style）

`style` 屬性用來指定字型檔案中的字形顯示為 `italic` 或 `normal`。
這些值對應到 [`FontStyle`][]。
你可以在 [`TextStyle`][] 物件的 [`fontStyle`][fontStyle property] 屬性中使用這些樣式。

在本指南展示的 `pubspec.yaml` 中，
你已將 `Raleway-Italic` 定義為 `italic` 樣式。
若要使用你加入應用程式的 `Raleway-Italic` 字型，
請設定 `style: TextStyle(fontStyle: FontStyle.italic)`。
Flutter 在渲染時會將 `Raleway-Regular` 替換為 `Raleway-Italic`。

如果你沒有將 `Raleway-Italic` 加入應用程式，
Flutter 會嘗試讓字型_看起來_像斜體。
這樣的文字可能會向右傾斜。

你無法使用 `style` 屬性來覆蓋字型的字形。
即使你設定了 `TextStyle(fontFamily: 'Raleway', fontStyle: FontStyle.normal)`，
實際顯示的字型仍會以斜體方式呈現。
斜體字型的 `regular` 樣式本身就是斜體。

## 設定預設字型

若要將字型套用於文字，你可以在應用程式的 `theme` 中將其設為預設字型。

要設定預設字型，請在應用程式的 `theme` 中設定 `fontFamily` 屬性。
`fontFamily` 的值需與 `pubspec.yaml` 檔案中宣告的 `family` 名稱相符。

其結果會類似以下程式碼。

<?code-excerpt "lib/main.dart (MaterialApp)"?>
```dart
return MaterialApp(
  title: 'Custom Fonts',
  // Set Raleway as the default app font.
  theme: ThemeData(fontFamily: 'Raleway'),
  home: const MyHomePage(),
);
```

想進一步了解主題化（theming），
請參考[使用主題共享顏色和字型樣式][Using Themes to share colors and font styles]教學。

## 在特定元件（Widget）中設定字型

若要將字型應用於特定元件（Widget），如 `Text` 元件，
請為該元件提供一個 [`TextStyle`][]。

在本指南中，
請嘗試將 `RobotoMono` 字型應用於單一 `Text` 元件。
請將 `fontFamily` 的值設定為在
`pubspec.yaml` 檔案中宣告的 `family` 名稱。

最終效果會類似下方的程式碼。

<?code-excerpt "lib/main.dart (Text)"?>
```dart
child: Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
),
```

:::important
如果一個 [`TextStyle`][] 物件指定了字重（weight）或字型樣式（style），但沒有對應的字型檔案，Flutter 引擎會使用通用的字型檔案，並嘗試推算出所要求的字重和樣式的輪廓。

請避免依賴這項功能。建議直接匯入正確的字型檔案。
:::

## 嘗試完整範例

### 下載字型

從 [Google Fonts][] 下載 Raleway 和 RobotoMono 字型檔案。

### 更新 `pubspec.yaml` 檔案

1. 開啟你 Flutter 專案根目錄下的 `pubspec.yaml` 檔案。

   ```console
   $ vi pubspec.yaml
   ```

1. 將其內容替換為以下 YAML。

   ```yaml
   name: custom_fonts
   description: An example of how to use custom fonts with Flutter

   dependencies:
     flutter:
       sdk: flutter

   dev_dependencies:
     flutter_test:
       sdk: flutter

   flutter:
     fonts:
       - family: Raleway
         fonts:
           - asset: fonts/Raleway-Regular.ttf
           - asset: fonts/Raleway-Italic.ttf
             style: italic
       - family: RobotoMono
         fonts:
           - asset: fonts/RobotoMono-Regular.ttf
           - asset: fonts/RobotoMono-Bold.ttf
             weight: 700
     uses-material-design: true
   ```

### 使用這個 `main.dart` 檔案

1. 在你的 Flutter 專案中的 `lib/` 目錄下，打開 `main.dart` 檔案。

   ```console
   $ vi lib/main.dart
   ```

1. 將其內容替換為以下 Dart 程式碼。

   <?code-excerpt "lib/main.dart"?>
   ```dart
   import 'package:flutter/material.dart';
   
   void main() => runApp(const MyApp());
   
   class MyApp extends StatelessWidget {
     const MyApp({super.key});
   
     @override
     Widget build(BuildContext context) {
       return MaterialApp(
         title: 'Custom Fonts',
         // Set Raleway as the default app font.
         theme: ThemeData(fontFamily: 'Raleway'),
         home: const MyHomePage(),
       );
     }
   }
   
   class MyHomePage extends StatelessWidget {
     const MyHomePage({super.key});
   
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         // The AppBar uses the app-default Raleway font.
         appBar: AppBar(title: const Text('Custom Fonts')),
         body: const Center(
           // This Text widget uses the RobotoMono font.
           child: Text(
             'Roboto Mono sample',
             style: TextStyle(fontFamily: 'RobotoMono'),
           ),
         ),
       );
     }
   }
   ```

最終的 Flutter 應用程式應該會顯示以下螢幕畫面。

![自訂字型示範](/assets/images/docs/cookbook/fonts.png){:.site-mobile-screenshot}

[variable-fonts]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
[Export fonts from a package]: /cookbook/design/package-fonts
[`fontFamily`]: https://api.flutter.dev/flutter/painting/TextStyle/fontFamily.html
[fontStyle property]: https://api.flutter.dev/flutter/painting/TextStyle/fontStyle.html
[`FontStyle`]: https://api.flutter.dev/flutter/dart-ui/FontStyle.html
[fontWeight property]: https://api.flutter.dev/flutter/painting/TextStyle/fontWeight.html
[`FontWeight`]: https://api.flutter.dev/flutter/dart-ui/FontWeight-class.html
[Google Fonts]: https://fonts.google.com
[google_fonts]: https://pub.dev/packages/google_fonts
[`TextStyle`]: https://api.flutter.dev/flutter/painting/TextStyle-class.html
[Using Themes to share colors and font styles]: /cookbook/design/themes

