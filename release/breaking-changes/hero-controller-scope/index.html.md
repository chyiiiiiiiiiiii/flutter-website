# Navigator 與 Hero controller scope 更嚴格的斷言檢查

> 新增了額外的斷言，以保證 一個 hero controller scope 同時只能訂閱一個 navigator。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

當框架偵測到有多個 Navigator 註冊在同一個 hero controller scope 下時，會拋出斷言錯誤。

## 背景

hero controller scope 會為其元件 (Widget) 子樹提供一個 hero controller。hero controller 一次只能支援一個 Navigator。過去，並沒有斷言來保證這一點。

## 變更說明

如果在這次變更後，程式碼開始拋出斷言錯誤，這表示程式碼在這次變更前就已經有問題了。可能有多個 Navigator 被註冊在同一個 hero controller scope 下，這樣在 Route 變更時，將無法觸發 hero 動畫（Animation）。這次變更只是讓這個問題浮現出來。

## 遷移指南

以下是一個在這次變更後開始拋出例外的應用程式範例。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      builder: (BuildContext context, Widget child) {
        // Builds two parallel navigators. This throws
        // error because both of navigators are under the same
        // hero controller scope created by MaterialApp.
        return Stack(
          children: <Widget>[
            Navigator(
              onGenerateRoute: (RouteSettings settings) {
                return MaterialPageRoute<void>(
                  settings: settings,
                  builder: (BuildContext context) {
                    return const Text('first Navigator');
                  }
                );
              },
            ),
            Navigator(
              onGenerateRoute: (RouteSettings settings) {
                return MaterialPageRoute<void>(
                  settings: settings,
                  builder: (BuildContext context) {
                    return const Text('Second Navigator');
                  }
                );
              },
            ),
          ],
        );
      }
    )
  );
}
```

你可以透過自行引入 hero controller 的作用域（hero controller scopes）來修正這個應用程式。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      builder: (BuildContext context, Widget child) {
        // Builds two parallel navigators.
        return Stack(
          children: <Widget>[
            HeroControllerScope(
              controller: MaterialApp.createMaterialHeroController(),
              child: Navigator(
                onGenerateRoute: (RouteSettings settings) {
                  return MaterialPageRoute<void>(
                    settings: settings,
                    builder: (BuildContext context) {
                      return const Text('first Navigator');
                    }
                  );
                },
              ),
            ),
            HeroControllerScope(
              controller: MaterialApp.createMaterialHeroController(),
              child: Navigator(
                onGenerateRoute: (RouteSettings settings) {
                  return MaterialPageRoute<void>(
                    settings: settings,
                    builder: (BuildContext context) {
                      return const Text('second Navigator');
                    }
                  );
                },
              ),
            ),
          ],
        );
      }
    )
  );
}
```

## 時間軸

導入版本：1.20.0<br>
穩定版本：1.20

## 參考資料

API 文件：

* [`Navigator`][]
* [`HeroController`][]
* [`HeroControllerScope`][]

相關議題：

* [Issue 45938][]

相關 PR：

* [Clean up hero controller scope][]

[Clean up hero controller scope]: https://github.com/flutter/flutter/pull/60655
[`Navigator`]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[`HeroController`]: https://api.flutter.dev/flutter/widgets/HeroController-class.html
[`HeroControllerScope`]: https://api.flutter.dev/flutter/widgets/HeroControllerScope-class.html
[Issue 45938]: https://github.com/flutter/flutter/issues/45938

