---
title: 使用自訂字型
description: 如何使用自訂字型。
---

<?code-excerpt path-base="cookbook/design/fonts/"?>

:::secondary 你將學到什麼
* 如何選擇字型。
* 如何匯入字型檔案。
* 如何將字型設為預設字型。
* 如何在指定元件（Widget）中使用字型。
:::

雖然 Android 和 iOS 都提供高品質的系統字型，
但設計師通常希望支援自訂字型。
你可能擁有設計師專門打造的自訂字型，
或是從 [Google Fonts][Google Fonts] 下載了字型。

字體（typeface）是指構成特定字母樣式的一組字形（glyphs）或形狀。
字型（font）則是在特定粗細或變化下的字體表現。
Roboto 是一種字體（typeface），而 Roboto Bold 則是一種字型（font）。

Flutter 允許你將自訂字型套用到整個應用程式，或是個別元件（Widget）。
本教學將透過以下步驟建立一個使用自訂字型的應用程式。

1. 選擇你的字型。
1. 匯入字型檔案。
1. 在 pubspec 中宣告字型。
1. 設定預設字型。
1. 在特定元件（Widget）中使用字型。

你不需要逐步跟著每個步驟操作，
本指南在最後會提供完整的範例檔案。

:::note
本指南假設以下前提：

1. 你已經[設定好 Flutter 開發環境][set up your Flutter environment]。
1. 你已經[建立了一個名為 `custom_fonts` 的 Flutter 應用程式][new-flutter-app]。
   如果尚未完成這些步驟，請先完成再繼續本指南。
1. 你是在 macOS 或 Linux 的 shell 中執行所提供的指令，並使用 `vi`。你也可以用任何文字編輯器取代 `vi`。
   Windows 使用者請在執行步驟時使用適合的指令與路徑。
1. 你將 Raleway 和 RobotoMono 字型加入你的 Flutter 應用程式。
:::

[set up your Flutter environment]: /get-started
[new-flutter-app]: /reference/create-new-app

## 選擇字型

你對字型的選擇不應僅僅是個人偏好。
請考慮哪些檔案格式可與 Flutter 相容，
以及字型如何影響設計選項與應用程式效能。

#### 選擇支援的字型格式

Flutter 支援以下字型格式：

* OpenType 字型集合：`.ttc`
* TrueType 字型：`.ttf`
* OpenType 字型：`.otf`

Flutter 在桌面平台上不支援 Web Open Font Format、
`.woff` 以及 `.woff2` 格式的字型。

#### 根據需求選擇字型

很少有來源對於字型檔案類型的定義或空間使用有一致看法。
不同字型檔案類型的主要差異在於格式如何編碼檔案中的字形（glyphs）。
大多數 TrueType 和 OpenType 字型檔案功能相似，
因為這些格式與字型隨著時間演進而互相借鑑。

你應該根據以下考量來選擇字型：

* 你的應用程式需要多少字型變化？
* 你能接受字型在應用程式中佔用多少檔案大小？
* 你的應用程式需要支援多少語言？

請研究特定字型所提供的選項，
例如每個字型檔案是否支援多種粗細或樣式、
[可變字型功能][variable-fonts]、
是否有多個字型檔案對應多種字重，
或是每個字型有多種寬度可選。

選擇能滿足你應用程式設計需求的字體（typeface）或字型家族（font family）。

:::secondary
想要直接存取超過 1,000 種開源字型家族，
請參考 [google_fonts][google_fonts] 套件。

{% ytEmbed '8Vzv2CdbEY0', 'google_fonts | Flutter package of the week' %}

若想了解另一種可讓你在多個專案間重複使用同一字型的自訂字型用法，
請參考[從套件匯出字型][Export fonts from a package]。
:::

## 匯入字型檔案

要使用字型，需先將其字型檔案匯入你的 Flutter 專案。

請依照下列步驟匯入字型檔案：

1. 如有需要，為了與本指南後續步驟一致，
   請將你的 Flutter 應用程式名稱改為 `custom_fonts`。

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

1. 將字型檔案移動或複製到 Flutter 專案根目錄下的 `fonts` 或 `assets` 資料夾中。

   ```console
   $ cp ~/Downloads/*.ttf ./fonts
   ```

最終的資料夾結構應如下所示：

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
這個字型定義同時指定了在應用程式中
對應不同字重或樣式時應該使用哪一個字型檔案。

### 在 `pubspec.yaml` 檔案中定義字型

若要將字型檔案加入你的 Flutter 應用程式，請依照以下步驟操作。

1. 在你的 Flutter 專案根目錄下，開啟 `pubspec.yaml` 檔案。

   ```console
   $ vi pubspec.yaml
   ```

1. 在 `flutter` 宣告之後，貼上以下 YAML 區塊。

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

這個 `pubspec.yaml` 檔案將 `Raleway` 字型家族的斜體樣式定義為 `Raleway-Italic.ttf` 字型檔案。
當你設定 `style: TextStyle(fontStyle: FontStyle.italic)` 時，
Flutter 會將 `Raleway-Regular` 替換為 `Raleway-Italic`。

`family` 值設定字型的名稱。
你可以在 [`fontFamily`][`fontFamily`] 屬性中，於 [`TextStyle`][`TextStyle`] 物件使用這個名稱。

`asset` 的值是從 `pubspec.yaml` 檔案到字型檔案的相對路徑。
這些檔案包含字型中字形（glyphs）的輪廓。
在建置應用程式時，
Flutter 會將這些檔案包含進應用程式的資源（asset）包中。

### 為每個字型包含字型檔案

不同的字型家族實作字型檔案的方式各異。
如果你需要一個具有多種字重與樣式的字型家族，
請選擇並匯入能代表這些變化的字型檔案。

當你匯入的字型檔案不包含多種字型，
或不支援可變字型（variable font）功能時，
請勿使用 `style` 或 `weight` 屬性來調整顯示效果。
如果你在一般字型檔案上使用這些屬性，
Flutter 會嘗試_模擬_該外觀。
視覺效果會與使用正確字型檔案時有明顯差異。

### 透過字型檔案設定樣式與字重

當你宣告哪些字型檔案對應字型的樣式或字重時，
可以套用 `style` 或 `weight` 屬性。

#### 設定字型字重

`weight` 屬性以 100 為單位的整數（介於 100 到 900 之間）指定檔案中字形的字重。
這些值對應到 [`FontWeight`][`FontWeight`]，並可用於
[`fontWeight`][fontWeight property] 屬性，於 [`TextStyle`][`TextStyle`] 物件中。

在本指南展示的 `pubspec.yaml` 中，
你已將 `RobotoMono-Bold` 定義為字型家族的 `700` 字重。
若要使用你新增至應用程式的 `RobotoMono-Bold` 字型，
請在 `TextStyle` 元件中將 `fontWeight` 設為 `FontWeight.w700`。

如果你沒有將 `RobotoMono-Bold` 新增至應用程式，
Flutter 會嘗試讓字型看起來較粗（bold）。
此時文字可能會顯得較深。

你無法使用 `weight` 屬性來覆寫字型的字重。
你不能將 `RobotoMono-Bold` 設定為 `700` 以外的字重。
即使你設定了 `TextStyle(fontFamily: 'RobotoMono', fontWeight: FontWeight.w900)`，
顯示的字型仍會以 `RobotoMono-Bold` 的粗細呈現。

#### 設定字型樣式

`style` 屬性指定字型檔案中的字形顯示為
`italic` 或 `normal`。
這些值對應到 [`FontStyle`][`FontStyle`]。
你可以在 [`TextStyle`][`TextStyle`] 物件的 [`fontStyle`][fontStyle property] 屬性中使用這些樣式。

在本指南展示的 `pubspec.yaml` 中，
你已將 `Raleway-Italic` 定義為 `italic` 樣式。
若要使用你新增至應用程式的 `Raleway-Italic` 字型，
請設定 `style: TextStyle(fontStyle: FontStyle.italic)`。
Flutter 在渲染時會將 `Raleway-Regular` 替換為 `Raleway-Italic`。

如果你沒有將 `Raleway-Italic` 新增至應用程式，
Flutter 會嘗試讓字型_看起來_像是斜體。
此時文字可能會向右傾斜。

你無法使用 `style` 屬性來覆寫字型的字形。
即使你設定了 `TextStyle(fontFamily: 'Raleway', fontStyle: FontStyle.normal)`，
顯示的字型仍會以斜體呈現。
斜體字型的 `regular` 樣式_就是_斜體。

## 設定預設字型

若要將字型套用於文字，你可以在應用程式的 `theme` 中設定預設字型。

要設定預設字型，請在應用程式的 `theme` 中設定 `fontFamily` 屬性。
將 `fontFamily` 值與 `pubspec.yaml` 檔案中宣告的 `family` 名稱對應。

結果會類似以下程式碼。

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
請參考 [使用主題來共用顏色與字型樣式][Using Themes to share colors and font styles] 教學。

## 在特定元件（Widget）中設定字型

若要將字型套用到特定元件（例如 `Text` 元件），
請為該元件提供一個 [`TextStyle`][`TextStyle`]。

在本指南中，
請嘗試將 `RobotoMono` 字型套用到單一 `Text` 元件。
請將 `fontFamily` 的值設定為在
`pubspec.yaml` 檔案中宣告的 `family` 名稱。

最終效果會類似以下程式碼。

<?code-excerpt "lib/main.dart (Text)"?>
```dart
child: Text(
  'Roboto Mono sample',
  style: TextStyle(fontFamily: 'RobotoMono'),
),
```

:::important
如果一個 [`TextStyle`][`TextStyle`] 物件指定了字重（weight）或樣式（style），但沒有對應的字型檔案，Flutter 引擎會使用通用的字型檔案，並嘗試推算出所需的字重與樣式輪廓。

請避免依賴這項功能。建議直接匯入正確的字型檔案。
:::

## 試試完整範例

### 下載字型

從 [Google Fonts][Google Fonts] 下載 Raleway 和 RobotoMono 字型檔案。

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

最終產生的 Flutter 應用程式應該會顯示如下的螢幕。

![自訂字型示範](/assets/images/docs/cookbook/fonts.png){:.site-mobile-screenshot}

[variable-fonts]: https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
[Export fonts from a package]: /cookbook/design/package-fonts
[`fontFamily`]: {{site.api}}/flutter/painting/TextStyle/fontFamily.html
[fontStyle property]: {{site.api}}/flutter/painting/TextStyle/fontStyle.html
[`FontStyle`]: {{site.api}}/flutter/dart-ui/FontStyle.html
[fontWeight property]: {{site.api}}/flutter/painting/TextStyle/fontWeight.html
[`FontWeight`]: {{site.api}}/flutter/dart-ui/FontWeight-class.html
[Google Fonts]: https://fonts.google.com
[google_fonts]: {{site.pub-pkg}}/google_fonts
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[Using Themes to share colors and font styles]: /cookbook/design/themes
