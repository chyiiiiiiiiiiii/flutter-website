---
title: CupertinoTabBar 需要 Localizations 父元件
description: >
  為了提供符合在地語系的語意，CupertinoTabBar 需要有 Localizations 父元件。
---

{% render docs/breaking-changes.md %}

## 摘要

`CupertinoTabBar` 的實例必須有一個
`Localizations` 父元件，以便提供在地化的
`Semantics` 提示。若嘗試在沒有 localizations 的情況下實例化
`CupertinoTabBar`，將會出現如下的 assertion 錯誤：

```plaintext
CupertinoTabBar requires a Localizations parent in order to provide an appropriate Semantics hint
for tab indexing. A CupertinoApp provides the DefaultCupertinoLocalizations, or you can
instantiate your own Localizations.
'package:flutter/src/cupertino/bottom_tab_bar.dart':
Failed assertion: line 213 pos 7: 'localizations != null'
```

## 背景

為了支援在地語系化的語意資訊，`CupertinoTabBar` 需要提供本地化（localizations）。

在此變更之前，提供給 `CupertinoTabBar` 的 `Semantics` 提示是一個硬編碼的字串，'tab, $index of $total'。語意提示的內容也從原本的這個字串，更新為英文的 'Tab $index of $total'。

如果你的 `CupertinoTabBar` 位於 `CupertinoApp` 的範圍內，`DefaultCupertinoLocalizations` 已經被實例化，且可能已經符合你的需求，無需對現有程式碼進行修改。

如果你的 `CupertinoTabBar` 不在 `CupertinoApp` 之內，你可以使用 `Localizations` 元件（Widget）來提供你所需的本地化內容。

## 遷移指南

如果你遇到 `'localizations != null'` 斷言錯誤，請確保你的 `CupertinoTabBar` 已正確提供語系（locale）資訊。

遷移前的程式碼：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MediaQuery(
      data: const MediaQueryData(),
      child: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled),
            label: 'Tab 1',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled_solid),
            label: 'Tab 2',
          ),
        ],
        currentIndex: 1,
      ),
    );
  }
}
```

遷移後的程式碼（透過 `CupertinoApp` 提供在地化）：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      home: CupertinoTabBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled),
            label: 'Tab 1',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.add_circled_solid),
            label: 'Tab 2',
          ),
        ],
        currentIndex: 1,
      ),
    );
  }
}
```

遷移後的程式碼（使用`Localizations`元件 (Widget) 提供在地化）：

```dart
import 'package:flutter/cupertino.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Localizations(
      locale: const Locale('en', 'US'),
      delegates: <LocalizationsDelegate<dynamic>>[
        DefaultWidgetsLocalizations.delegate,
        DefaultCupertinoLocalizations.delegate,
      ],
      child: MediaQuery(
        data: const MediaQueryData(),
        child: CupertinoTabBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.add_circled),
              label: 'Tab 1',
            ),
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.add_circled_solid),
              label: 'Tab 2',
            ),
          ],
          currentIndex: 1,
        ),
      ),
    );
  }
}
```

## 時程

合併於版本：1.18.0-9.0.pre<br>  
進入穩定版：1.20.0

## 參考資料

API 文件：

* [`CupertinoTabBar`][`CupertinoTabBar`]
* [`Localizations`][`Localizations`]
* [`DefaultCupertinoLocalizations`][`DefaultCupertinoLocalizations`]
* [`Semantics`][`Semantics`]
* [`CupertinoApp`][`CupertinoApp`]
* [Internationalizing Flutter Apps][Internationalizing Flutter Apps]

相關 PR：

* [PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations][PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations]
* [PR 56582: Update Tab semantics in Cupertino to be the same as Material][PR 56582: Update Tab semantics in Cupertino to be the same as Material]

[`CupertinoTabBar`]: {{site.api}}/flutter/cupertino/CupertinoTabBar-class.html
[`Localizations`]: {{site.api}}/flutter/widgets/Localizations-class.html
[`DefaultCupertinoLocalizations`]: {{site.api}}/flutter/cupertino/DefaultCupertinoLocalizations-class.html
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[Internationalizing Flutter Apps]: /ui/internationalization
[PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations]: {{site.repo.flutter}}/pull/55336
[PR 56582: Update Tab semantics in Cupertino to be the same as Material]: {{site.repo.flutter}}/pull/56582#issuecomment-625497951
