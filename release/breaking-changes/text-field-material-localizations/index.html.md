# TextField 需要 MaterialLocalizations 元件

> 如果元件樹中沒有 MaterialLocalizations 元件， TextField 現在會拋出 assert 錯誤。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`TextField` 的實例必須在元件樹中
有 `MaterialLocalizations` 存在。
如果嘗試在沒有正確在地化設定的情況下建立 `TextField`，
將會出現如下的 assertion（斷言）錯誤：

```plaintext
No MaterialLocalizations found.
TextField widgets require MaterialLocalizations to be provided by a Localizations widget ancestor.
The material library uses Localizations to generate messages, labels, and abbreviations.
To introduce a MaterialLocalizations, either use a MaterialApp at the root of your application to
include them automatically, or add a Localization widget with a MaterialLocalizations delegate.
The specific widget that could not find a MaterialLocalizations ancestor was:
  TextField
```

## 背景說明

如果 `TextField` 是 `MaterialApp` 的子孫，
則 `DefaultMaterialLocalizations` 已經被實例化，
不需要對您現有的程式碼做任何更動。

如果 `TextField` 不是 `MaterialApp` 的子孫，
您可以使用 `Localizations` 元件（Widget）
來提供您自訂的在地化內容。

## 遷移指南

如果您遇到 assertion error（斷言錯誤），請確保
`TextField` 可以取得 locale（語系）資訊，
這可以透過上層的 `MaterialApp`
（會自動提供 `Localizations`），
或是自行建立 `Localizations` 元件（Widget）來達成。

遷移前的程式碼：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MediaQuery(
      data: const MediaQueryData(),
      child: Directionality(
        textDirection: TextDirection.ltr,
        child: Material(
          child: TextField(),
        ),
      ),
    );
  }
}
```

遷移後的程式碼（使用 `MaterialApp` 來提供在地化）：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Material(
        child: TextField(),
      ),
    );
  }
}
```

遷移後的程式碼（透過 `Localizations` 元件（Widget）提供在地化）：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Localizations(
      locale: const Locale('en', 'US'),
      delegates: const <LocalizationsDelegate<dynamic>>[
        DefaultWidgetsLocalizations.delegate,
        DefaultMaterialLocalizations.delegate,
      ],
      child: MediaQuery(
        data: const MediaQueryData(),
        child: Directionality(
          textDirection: TextDirection.ltr,
          child: Material(
            child: TextField(),
          ),
        ),
      ),
    );
  }
}
```

## 時程

合併於版本：1.20.0-1.0.pre<br>
穩定版釋出：1.20

## 參考資料

API 文件：

* [`TextField`][]
* [`Localizations`][]
* [`MaterialLocalizations`][]
* [`DefaultMaterialLocalizations`][]
* [`MaterialApp`][]
* [Internationalizing Flutter apps][]

相關 PR：

* [PR 58831: Assert debugCheckHasMaterialLocalizations on TextField][]

[`TextField`]: https://api.flutter.dev/flutter/material/TextField-class.html
[`Localizations`]: https://api.flutter.dev/flutter/widgets/Localizations-class.html
[`MaterialLocalizations`]: https://api.flutter.dev/flutter/material/MaterialLocalizations-class.html
[`DefaultMaterialLocalizations`]: https://api.flutter.dev/flutter/material/DefaultMaterialLocalizations-class.html
[`MaterialApp`]: https://api.flutter.dev/flutter/material/MaterialApp-class.html
[Internationalizing Flutter apps]: /ui/internationalization
[PR 58831: Assert debugCheckHasMaterialLocalizations on TextField]: https://github.com/flutter/flutter/pull/58831

