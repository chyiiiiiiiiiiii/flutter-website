---
title: 從套件匯出字型
description: 如何從套件匯出字型。
---

<?code-excerpt path-base="cookbook/design/package_fonts"?>

與其將字型宣告為應用程式的一部分，你也可以將字型宣告在獨立的套件（package）中。這是一種方便的方式，可以在多個不同專案間共用相同的字型，或是在將你的套件發佈到 [pub.dev][pub.dev] 時使用。本教學將會使用以下步驟：

  1. 將字型加入套件。
  2. 在應用程式中加入該套件與字型。
  3. 使用該字型。

:::note
你也可以參考 [google_fonts][google_fonts] 套件，直接存取近千種開源字型家族。
:::

## 1. 將字型加入套件

若要從套件匯出字型，你需要將字型檔案匯入套件專案的 `lib` 資料夾。你可以將字型檔案直接放在 `lib` 資料夾下，或是放在子目錄（例如 `lib/fonts`）中。

在這個範例中，假設你有一個名為 `awesome_package` 的 Flutter 函式庫，字型放在 `lib/fonts` 資料夾中。

```plaintext
awesome_package/
  lib/
    awesome_package.dart
    fonts/
      Raleway-Regular.ttf
      Raleway-Italic.ttf
```

## 2. 將套件與字型加入應用程式

現在，你可以透過更新 *應用程式* 根目錄下的 `pubspec.yaml`，來使用套件中的字型。

### 將套件加入應用程式

若要將 `awesome_package` 套件作為相依套件加入，請執行 `flutter pub add`：

```console
$ flutter pub add awesome_package
```

### 宣告字型資源

現在你已經匯入了套件，接下來需要告訴 Flutter 從哪裡找到 `awesome_package` 中的字型。

要宣告套件字型時，請在字型路徑前加上 `packages/awesome_package`。
這樣 Flutter 就會從該套件的 `lib` 目錄中尋找字型。

```yaml
flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: packages/awesome_package/fonts/Raleway-Regular.ttf
        - asset: packages/awesome_package/fonts/Raleway-Italic.ttf
          style: italic
```

<a id="use" aria-hidden="true"></a>

## 3. 使用字型

使用 [`TextStyle`][`TextStyle`] 來改變文字的外觀。
若要使用套件字型（package fonts），請宣告你想要使用的字型名稱，以及該字型所屬的套件。

<?code-excerpt "lib/main.dart (TextStyle)"?>
```dart
child: Text(
  'Using the Raleway font from the awesome_package',
  style: TextStyle(fontFamily: 'Raleway'),
),
```

## 完整範例

### 字型

Raleway 與 RobotoMono 字型是從 [Google Fonts][Google Fonts] 下載的。

### `pubspec.yaml`

```yaml
name: package_fonts
description: An example of how to use package fonts with Flutter

dependencies:
  awesome_package:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  fonts:
    - family: Raleway
      fonts:
        - asset: packages/awesome_package/fonts/Raleway-Regular.ttf
        - asset: packages/awesome_package/fonts/Raleway-Italic.ttf
          style: italic
  uses-material-design: true
```

### `main.dart`

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Package Fonts', home: MyHomePage());
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // The AppBar uses the app-default font.
      appBar: AppBar(title: const Text('Package Fonts')),
      body: const Center(
        // This Text widget uses the Raleway font.
        child: Text(
          'Using the Raleway font from the awesome_package',
          style: TextStyle(fontFamily: 'Raleway'),
        ),
      ),
    );
  }
}
```

![Package Fonts Demo](/assets/images/docs/cookbook/package-fonts.png){:.site-mobile-screenshot}

[Google Fonts]: https://fonts.google.com
[google_fonts]: {{site.pub-pkg}}/google_fonts
[pub.dev]: {{site.pub}}
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
