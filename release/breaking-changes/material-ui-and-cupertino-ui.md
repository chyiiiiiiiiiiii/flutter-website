# 遷移至獨立的 material_ui 與 cupertino_ui 套件

> Material 與 Cupertino 設計函式庫現已提供獨立套件， 讓設計系統與 Flutter SDK 解耦。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Material 與 Cupertino 設計函式庫現已提供獨立套件：
[`package:material_ui`][] 與 [`package:cupertino_ui`][]。
在 Flutter 3.47 中，開發者可以在框架內建設計函式庫正式棄用之前，
先行選擇採用這些套件。

## 背景

過去，Flutter 的 Material（`package:flutter/material.dart`）
與 Cupertino（`package:flutter/cupertino.dart`）元件 (Widget) 函式庫
直接內建於 Flutter SDK 核心之中。
雖然這讓開發者能輕鬆上手並取得像素級精準的元件，
但將設計系統內建於核心框架中也帶來了幾項挑戰：

* 元件的更新、錯誤修正與新元件，都綁定在
  每季一次的 Flutter SDK 發布。
* 設計函式庫的貢獻與迭代速度，
  比獨立的 Dart 套件更慢。
* 應用程式無法獨立於引擎與框架之外，單獨更新設計函式庫。

為了解決這些挑戰，設計系統現在已與核心框架解耦。
從 Flutter 3.47 開始，獨立的 `material_ui` 與 `cupertino_ui` 套件
1.0 版已發布於 `pub.dev`。

將設計系統解耦帶來以下幾項好處：

* **獨立的發布週期**：
  這些套件可以依自己的發布時程（規劃為每週發布）
  推出錯誤修正、改進與新元件，
  不需要完整升級 Flutter SDK。
* **更快速的貢獻**：
  社群成員可以直接在
  [`flutter/packages`][] 儲存庫中為這些函式庫做出貢獻。
* **風格中立的核心**：
  解耦為風格中立的 Flutter 核心元件目錄奠定了基礎，
  讓建立與維護自訂設計系統變得更容易。

自 Flutter 3.44 起，
核心 SDK 內 Material 與 Cupertino 套件的貢獻已被凍結。
`package:material_ui` 與 `package:cupertino_ui` 最初的 1.0.0 版本
與凍結時的框架程式碼一致，以提供無縫的過渡。
套件未來的發布將採用語意化版本（semantic versioning）
來標示主要、次要與修補更新。
框架內建的設計函式庫預定在未來的穩定版發布中正式棄用。

## 遷移指南

若要將專案從框架內建的設計函式庫遷移至獨立套件，
你可以使用自動化的 `dart fix` 工具，
或手動進行遷移。

### 使用 dart fix 自動遷移

最快的遷移方式是搭配 `dart fix` 使用 `migrate_design_widgets` 修正規則：

```console
$ dart fix --apply --code=migrate_design_widgets
```

此指令會自動將你的 `package:flutter/material.dart` 與
`package:flutter/cupertino.dart` 匯入
更新為對應的獨立套件匯入。

:::note
如果 `dart fix` 沒有自動將新套件加入
`pubspec.yaml` 的相依套件中，請視需要執行
`flutter pub add material_ui` 或 `flutter pub add cupertino_ui` 手動加入。
:::

請再執行一次 `dart fix`，以確保套用所有其他自動遷移，
並處理 lint 警告，例如匯入排序。

### 手動遷移

若要手動遷移，請依照下列步驟進行：

1.  將獨立套件加入你的 `pubspec.yaml` 相依套件：

    ```console
    $ flutter pub add material_ui
    $ flutter pub add cupertino_ui
    ```

1.  更新 Dart 檔案中的匯入，改為參照新套件。

    遷移前的程式碼：

    ```dart
    import 'package:flutter/cupertino.dart';
    import 'package:flutter/material.dart';
    ```

    遷移後的程式碼：

    ```dart
    import 'package:cupertino_ui/cupertino_ui.dart';
    import 'package:material_ui/material_ui.dart';
    ```

### 相容性橋接

在生態系轉換期間，你的應用程式可能相依於
仍然匯入舊有框架內建函式庫
（`package:flutter/material.dart` 或 `package:flutter/cupertino.dart`）的第三方套件。

為了讓你的應用程式能立即遷移至獨立套件，
而不必等待所有相依套件更新，`material_ui` 與
`cupertino_ui` 提供了相容性橋接工具。
請在 `MaterialApp.builder` 中，
使用 `MaterialUiCompatibilityBridge` 包住你的應用程式：

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4),
        ),
      ),
      builder: (BuildContext context, Widget? child) {
        return MaterialUiCompatibilityBridge(child: child!);
      },
      home: const HomeScreen(),
    );
  }
}
```

#### 橋接的功能與限制

`MaterialUiCompatibilityBridge` 會將主題與在地化資料
向下注入元件樹。
這讓尚未遷移的子元件，以及從 context 讀取設計狀態的相依套件
（例如 `Theme.of(context)` 或 `MaterialLocalizations.of(context)`）
能繼續正常運作。

不過，當相依套件在其公開 API 簽章中
公開、接受或回傳框架內建的 SDK 型別時
（例如將 `FloatingActionButtonLocation`、
`ColorScheme` 或 `TextTheme` 作為參數或回呼回傳值傳遞），
相容性橋接無法解決型別不符的問題。
由於 Dart 會在不同套件的匯入之間強制執行靜態型別檢查，
來自 `package:flutter/material.dart` 的值，
無法指派給預期 `package:material_ui` 型別的參數。
與 API 簽章耦合的相依套件，必須先遷移至獨立套件，
你的應用程式才能將新型別傳遞給它們。

### 解耦的在地化

在這次轉換中，`flutter_localizations` 已針對設計元件解除捆綁。
Material 與 Cupertino 元件的在地化委派（delegate）與翻譯字串，
現在直接存放於 `package:material_ui` 與
`package:cupertino_ui` 中。

遷移前的程式碼：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

// ...
MaterialApp(
  localizationsDelegates: const <LocalizationsDelegate<dynamic>>[
    GlobalCupertinoLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  // ...
);
```

遷移後的程式碼：

```dart
import 'package:material_ui/material_ui.dart';

// ...
MaterialApp(
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
  // ...
);
```

將 `localizationsDelegates` 設為 `GlobalMaterialLocalizations.delegates`，
會自動一併包含 Cupertino 與 Widgets 的委派，
讓在地化設定更簡單。

### 給套件作者的指引

如果你在 Flutter 生態系中維護開源套件或插件，
遷移至 `package:material_ui` 或 `package:cupertino_ui`，
對尚未更新相依套件的使用者來說會是一項破壞性變更。
雖然符號與類別名稱維持不變，
但技術上它們是從一個全新的函式庫中被參照。
請將這次遷移視為你的套件的主要版本升級。

## 參考資料

套件文件：

* [`package:material_ui`][]
* [`package:cupertino_ui`][]

相關 issue：

* [Issue 191448][]

相關部落格文章與公告：

* [What's new in Flutter 3.47][]
* [Flutter's Material and Cupertino code freeze][]

[`flutter/packages`]: https://github.com/flutter/packages
[Issue 191448]: https://github.com/flutter/flutter/issues/191448
[`package:cupertino_ui`]: https://pub.dev/packages/cupertino_ui
[`package:material_ui`]: https://pub.dev/packages/material_ui
[Flutter's Material and Cupertino code freeze]: https://flutter.dev/blog/flutters-material-and-cupertino-code-freeze
[What's new in Flutter 3.47]: https://flutter.dev/blog/whats-new-in-flutter-3-47

