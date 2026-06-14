# CupertinoTabBar 需要 Localizations 父元件

> 為了提供符合語言地區的語意，CupertinoTabBar 需要有 Localizations 父元件。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`CupertinoTabBar` 的實例必須有 `Localizations` 父元件，才能提供在地化的 `Semantics` 提示。若嘗試在沒有 localizations 的情況下建立 `CupertinoTabBar`，將會出現如下的 assertion：

```plaintext
CupertinoTabBar requires a Localizations parent in order to provide an appropriate Semantics hint
for tab indexing. A CupertinoApp provides the DefaultCupertinoLocalizations, or you can
instantiate your own Localizations.
'package:flutter/src/cupertino/bottom_tab_bar.dart':
Failed assertion: line 213 pos 7: 'localizations != null'
```

## 背景

為了支援在地語系化的語意資訊，`CupertinoTabBar` 需要本地化（localizations）。

在此變更之前，提供給 `CupertinoTabBar` 的 `Semantics` 提示（hint）是一個硬編碼的字串：'tab, $index of $total'。語意提示的內容也從原本的這個字串，更新為英文的 'Tab $index of $total'。

如果你的 `CupertinoTabBar` 位於 `CupertinoApp` 的範圍內，`DefaultCupertinoLocalizations` 已經被實例化，通常可以直接滿足你的需求，無需對現有程式碼做任何修改。

如果你的 `CupertinoTabBar` 不在 `CupertinoApp` 之內，你可以使用 `Localizations` 元件 (Widget) 提供你所需的本地化內容。

## 遷移指南

如果你遇到 `'localizations != null'` 斷言錯誤，請確認你的 `CupertinoTabBar` 已正確提供 locale（語系）資訊。

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

遷移後的程式碼（使用 `Localizations` 元件 (Widget) 提供在地化）：

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

## 時間軸

合併於版本：1.18.0-9.0.pre<br>
進入穩定版：1.20.0

## 參考資料

API 文件：

* [`CupertinoTabBar`][]
* [`Localizations`][]
* [`DefaultCupertinoLocalizations`][]
* [`Semantics`][]
* [`CupertinoApp`][]
* [Internationalizing Flutter Apps][]


相關 PR：

* [PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations][]
* [PR 56582: Update Tab semantics in Cupertino to be the same as Material][]

[`CupertinoTabBar`]: https://api.flutter.dev/flutter/cupertino/CupertinoTabBar-class.html
[`Localizations`]: https://api.flutter.dev/flutter/widgets/Localizations-class.html
[`DefaultCupertinoLocalizations`]: https://api.flutter.dev/flutter/cupertino/DefaultCupertinoLocalizations-class.html
[`Semantics`]: https://api.flutter.dev/flutter/widgets/Semantics-class.html
[`CupertinoApp`]: https://api.flutter.dev/flutter/cupertino/CupertinoApp-class.html
[Internationalizing Flutter Apps]: /ui/internationalization
[PR 55336: Adding tabSemanticsLabel to CupertinoLocalizations]: https://github.com/flutter/flutter/pull/55336
[PR 56582: Update Tab semantics in Cupertino to be the same as Material]: https://github.com/flutter/flutter/pull/56582#issuecomment-625497951

