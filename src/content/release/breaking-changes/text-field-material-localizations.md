---
title: TextField 需要 MaterialLocalizations 元件（Widget）
description: >
  如果元件樹中沒有 MaterialLocalizations 元件（Widget），
  TextField 現在會拋出 assert 錯誤。
---

{% render docs/breaking-changes.md %}

## 摘要

`TextField` 的實例必須在元件樹中
存在 `MaterialLocalizations`。
如果在沒有正確本地化（localizations）的情況下建立 `TextField`，
會導致如下的斷言（assert）錯誤：

```plaintext
No MaterialLocalizations found.
TextField widgets require MaterialLocalizations to be provided by a Localizations widget ancestor.
The material library uses Localizations to generate messages, labels, and abbreviations.
To introduce a MaterialLocalizations, either use a MaterialApp at the root of your application to
include them automatically, or add a Localization widget with a MaterialLocalizations delegate.
The specific widget that could not find a MaterialLocalizations ancestor was:
  TextField
```

## 上下文

如果 `TextField` 是從 `MaterialApp` 繼承而來，
則 `DefaultMaterialLocalizations` 已經被實例化，
不需要對你現有的程式碼做任何修改。

如果 `TextField` 並非繼承自 `MaterialApp`，
你可以使用 `Localizations` 元件（Widget）來
提供你自訂的在地化內容。

## 遷移指南

如果你遇到 assertion 錯誤，請確保
`TextField` 能夠取得語系（locale）資訊，
可以透過上層的 `MaterialApp`
（會自動提供 `Localizations`），或是
自行建立 `Localizations` 元件（Widget）來達成。

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

遷移後的程式碼（使用 `MaterialApp` 提供在地化）：

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
進入穩定版本：1.20

## 參考資料

API 文件：

* [`TextField`][`TextField`]
* [`Localizations`][`Localizations`]
* [`MaterialLocalizations`][`MaterialLocalizations`]
* [`DefaultMaterialLocalizations`][`DefaultMaterialLocalizations`]
* [`MaterialApp`][`MaterialApp`]
* [Internationalizing Flutter apps][Internationalizing Flutter apps]

相關 PR：

* [PR 58831: Assert debugCheckHasMaterialLocalizations on TextField][PR 58831: Assert debugCheckHasMaterialLocalizations on TextField]

[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html
[`DefaultMaterialLocalizations`]: {{site.api}}/flutter/material/DefaultMaterialLocalizations-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[Internationalizing Flutter apps]: /ui/internationalization
[PR 58831: Assert debugCheckHasMaterialLocalizations on TextField]: {{site.repo.flutter}}/pull/58831
