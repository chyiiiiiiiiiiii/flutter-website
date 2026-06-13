---
title: Flutter 元件預覽器
description: >-
  瞭解如何使用 Flutter 元件預覽器，在獨立於完整應用程式的環境中即時渲染您的元件 (Widget)。
---

在本指南中，您將學習如何使用 Flutter 元件預覽器 (Flutter Widget Previewer)。

## 概述 {:#overview}

透過 Flutter 元件預覽器，您可以在 Chrome 瀏覽器中即時查看元件 (Widget) 的渲染結果，且獨立於完整應用程式之外。如需啟動預覽器、在其中顯示元件，以及自訂預覽，請參閱以下各節。

:::version-note
Flutter Widget Preview 需要 Flutter 3.35 或更高版本。IDE 支援則需要 Flutter 3.38 或更高版本。

請注意，這是 Flutter 穩定版頻道中提供的**實驗性功能**。API 尚不穩定，_將來可能會變動_。本指南適用於目前的搶先體驗版本，您應預期未來的更新可能會引入重大變更。
:::

## 開啟預覽器 {:#opening-the-previewer}

### IDE

自 Flutter 3.38 起，Android Studio、Intellij 以及 Visual Studio Code 會在啟動時自動開啟 Flutter Widget Previewer。

#### Android Studio 與 Intellij

若要在 Android Studio 或 Intellij 中開啟 Widget Previewer，請在側邊欄開啟「Flutter Widget Preview」標籤頁：

![Flutter Widget Previewer in Android Studio](/assets/images/docs/tools/widget-previewer/android-studio.png "Android Studio")

#### Visual Studio Code

若要在 Visual Studio Code 中開啟 Widget Previewer，請在側邊欄開啟「Flutter Widget Preview」標籤頁：

![Flutter Widget Previewer in Visual Studio Code](/assets/images/docs/tools/widget-previewer/vscode.png "Visual Studio Code")

### 命令列 {:#command-line}

若要啟動 Flutter Widget Previewer，請在終端機中切換至 Flutter 專案的根目錄，並執行以下指令。這將啟動一個本機伺服器，並在 Chrome 中開啟 Widget Preview 環境，該環境會根據您的專案變更自動更新。

```shell
flutter widget-preview start
```

## 預覽元件 {:#preview-a-widget}

啟動預覽器後，若要查看某個元件，您必須使用定義於 `package:flutter/widget_previews.dart` 中的 [`@Preview`][] 標註。此標註可套用於：

- **最上層函式**，其回傳值為 `Widget` 或 `WidgetBuilder`。
- **類別中的靜態方法**，其回傳值為 `Widget` 或 `WidgetBuilder`。
- **公開的 Widget 建構子與工廠方法**，且不需要任何必填引數。

以下是使用 `@Preview` 標註預覽 `Text` 元件的基本範例：

```dart
import 'package:flutter/widget_previews.dart';
import 'package:flutter/material.dart'; // For Material widgets

@Preview(name: 'My Sample Text')
Widget mySampleText() {
  return const Text('Hello, World!');
}
```

![Sample widget in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/widget-previewer.png "Example widget")
每個預覽實例都提供各種控制項以與預覽中的元件互動。從左到右依序為：

- **放大：** 放大預覽中的元件。

- **縮小：** 縮小預覽中的元件。

- **重設縮放：** 將元件預覽恢復至預設縮放等級。

- **切換淺色與深色模式：** 在預覽的淺色與深色配色方案之間切換主題。

- **對單一預覽執行熱重啟：** 僅重啟特定元件預覽，讓您能快速套用變更，而無需重啟整個應用程式。

當全域狀態已被修改（例如靜態初始化器已變更）時，可使用環境右下角的按鈕，讓整個 Widget Previewer 執行熱重啟。

### 依選取的檔案篩選預覽 {:#filter-previews-by-selected-file}

在 IDE 中查看預覽時，Widget Previewer 已設定為根據目前選取的檔案篩選預覽集合：

![Filter by previews selected file in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/filter-by-file.gif "Filter previews by selected file")

若要停用此行為，請切換環境左下角的「Filter previews by selected file」選項。

## 自訂預覽 {:#customize-a-preview}

[`@Preview`][] 標註有幾個參數可讓您自訂預覽：

- **`name`**：預覽的描述性名稱。

- **`group`**：用來在 Widget Previewer 中將相關預覽分組的名稱。

- **`size`**：使用 `Size` 物件設定的人工尺寸限制。

- **`textScaleFactor`**：自訂字體縮放比例。

- **`wrapper`**：將預覽元件包裝在特定元件樹中的函式（例如，用 `InheritedWidget` 將應用程式狀態注入元件樹）。

- **`theme`**：提供 Material 與 Cupertino 主題資料的函式。

- **`brightness`**：初始主題亮度。

- **`localizations`**：套用本地化設定的函式。

## 建立自訂預覽標註 {:#create-custom-preview-annotations}

為了減少定義具有相同屬性組合之預覽所需的樣板程式碼，可以繼承 [`Preview`][] 標註類別來建立專為您的專案量身打造的自訂預覽標註。

以下是一個提供主題資料的自訂預覽標註範例：

```dart
final class MyCustomPreview extends Preview {
  const MyCustomPreview({
    super.name,
    super.group,
    super.size,
    super.textScaleFactor,
    super.wrapper,
    super.brightness,
    super.localizations,
  }) : super(theme: MyCustomPreview.themeBuilder);

  static PreviewThemeData themeBuilder() {
    return PreviewThemeData(
      materialLight: ThemeData.light(),
      materialDark: ThemeData.dark(),
    );
  }
}
```

繼承 [`Preview`][] 標註類別還允許覆寫 [`Preview.transform()`][] 方法。此方法由 Widget Previewer 調用，可用於在執行時期修改預覽，從而實現在 `const` 情境下無法完成的預覽設定：

```dart
final class TransformativePreview extends Preview {
  const TransformativePreview({
    super.name,
    super.group,
    super.size,
    super.textScaleFactor,
    super.wrapper,
    super.brightness,
    super.localizations,
  });

  // Note: this is no longer public or static as it's injected
  // at runtime when transform() is invoked.
  PreviewThemeData _themeBuilder() {
    return PreviewThemeData(
      materialLight: ThemeData.light(),
      materialDark: ThemeData.dark(),
    );
  }

  @override
  Preview transform() {
    final originalPreview = super.transform();
    // Create's a PreviewBuilder that can be used to modify
    // the preview contents.
    final builder = originalPreview.toBuilder();
    builder
      ..name = 'Transformed - ${originalPreview.name}'
      ..theme = _themeBuilder;

    // Return the updated Preview instance.
    return builder.toPreview();
  }
}
```

## 建立多個預覽設定 {:#creating-multiple-preview-configurations}

建立具有不同設定的多個預覽，只需將多個 [`@Preview`][] 標註套用至單一函式或建構子即可：

```dart
@Preview(
  group: 'Brightness',
  name: 'Example - light',
  brightness: Brightness.light,
)
@Preview(
  group: 'Brightness',
  name: 'Example - dark',
  brightness: Brightness.dark,
)
Widget buttonPreview() => const ButtonShowcase();
```

![Multiple previews in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/multi-preview.png "Multiple preview example")

若要簡化建立具有相同設定的多個預覽，您可以繼承 [`MultiPreview`][] 來建立能產生多個預覽的自訂標註。以下 [`MultiPreview`][] 建立與前一個範例相同的兩個預覽：

```dart
/// Creates light and dark mode previews.
final class MultiBrightnessPreview extends MultiPreview {
  const MultiBrightnessPreview();

  @override
  List<Preview> get previews => const [
        Preview(
          group: 'Brightness',
          name: 'Example - light',
          brightness: Brightness.light,
        ),
        Preview(
          group: 'Brightness',
          name: 'Example - dark',
          brightness: Brightness.dark,
        ),
      ];
}

@MultiBrightnessPreview()
Widget buttonPreview() => const ButtonShowcase();
```

與 [`Preview`][] 相同，[`MultiPreview`][] 也提供 [`MultiPreview.transform()`][] 方法，用於在執行時期對每個預覽執行轉換：

```dart
/// Creates light and dark mode previews.
final class MultiBrightnessPreview extends MultiPreview {
  const MultiBrightnessPreview({required this.name});

  final String name;

  @override
  List<Preview> get previews => const [
        Preview(brightness: Brightness.light),
        Preview(brightness: Brightness.dark),
      ];

  @override
  List<Preview> transform() {
    final previews = super.transform();
    return previews.map((preview) {
      final builder = preview.toBuilder()
        ..group = 'Brightness'
        // Building names based on values provided to the annotation
        // isn't possible within a constant constructor. However,
        // there's no such restriction when building a Preview at
        // runtime.
        ..name = '$name - ${preview.brightness!.name}';
      return builder.toPreview();
    }).toList();
  }
}

@MultiBrightnessPreview(name: 'Example')
Widget buttonPreview() => const ButtonShowcase();
```

## 限制與侷限 {:#restrictions-and-limitations}

Flutter Widget Previewer 有一些您應當注意的限制：

- **公開的回呼 (callback) 名稱**：所有提供給預覽標註的回呼引數必須是公開且為常數。這是預覽器的程式碼產生實作正確運作的必要條件。

- **不支援的 API**：原生插件 (plugin) 以及 `dart:io` 或 `dart:ffi` 函式庫中的任何 API 皆不受支援。這是因為 Widget Previewer 是以 Flutter Web 建置的，無法存取底層原生平台 API。雖然 Web 插件在使用 Chrome 時可能可以運作，但不能保證它們在其他環境（例如嵌入 IDE 時）中也能正常運作。

  對 `dart:io` 或 `dart:ffi` 具有傳遞性相依的元件可以正常載入，但這些函式庫中的所有 API 在調用時都會拋出例外。

  請參閱 [Dart 條件匯入文件][Dart documentation on conditional imports]，瞭解如何架構您的應用程式，以便在針對多個平台時能乾淨地支援特定平台函式庫。

- **資產路徑**：使用 `dart:ui` 中的 `fromAsset` API 載入資源時，您必須使用**以套件為基礎的路徑**，而非直接的本機路徑。這可確保資源在預覽器的 Web 環境中能被正確找到並載入。例如，請使用 `'packages/my_package_name/assets/my_image.png'`，而非 `'assets/my_image.png'`。

- **無約束的元件**：無約束的元件會自動被限制在 Widget Previewer 高度和寬度的大約一半。此行為未來可能會有所變更，因此建議盡可能使用 `size` 參數來套用限制。

- **IDE 中的多專案支援**：Widget Previewer 目前僅支援顯示單一專案或 Pub 工作區中的預覽。我們正積極研究支援包含多個 Flutter 專案的 IDE 工作階段的方案（[#173550][]）。

[`@Preview`]: {{site.api}}/flutter/widget_previews/Preview-class.html
[`Preview`]: {{site.api}}/flutter/widget_previews/Preview-class.html
[`Preview.transform()`]: {{site.api}}/flutter/widget_previews/Preview/transform.html
[`MultiPreview`]: {{site.api}}/flutter/widget_previews/MultiPreview-class.html
[`MultiPreview.transform()`]: {{site.api}}/flutter/widget_previews/MultiPreview/transform.html
[Dart documentation on conditional imports]: {{site.dart-site}}/tools/pub/create-packages#conditionally-importing-and-exporting-library-files
[#166431]: https://github.com/flutter/flutter/issues/166431
[#173550]: https://github.com/flutter/flutter/issues/173550
