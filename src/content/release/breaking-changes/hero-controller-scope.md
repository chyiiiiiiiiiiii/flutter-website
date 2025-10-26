---
title: 在 Navigator 與 Hero controller scope 中更嚴格的斷言
description: >
  新增了額外的斷言，以保證
  一個 hero controller scope 同一時間只能訂閱一個 navigator。
---

{% render docs/breaking-changes.md %}

## 摘要

當框架偵測到有多個 Navigator 註冊到同一個 hero controller scope 時，
將會拋出斷言錯誤。

## 背景說明

hero controller scope 會為其元件（Widget）子樹提供一個 hero controller。
hero controller 一次只能支援一個 Navigator。先前並沒有斷言來保證這一點。

## 變更說明

如果在這次變更後，程式碼開始拋出斷言錯誤，
這代表在這次變更之前，程式碼就已經存在問題。
可能有多個 Navigator 被註冊在同一個 hero controller scope 下，
而當它們的 Route 發生變化時，將無法觸發 hero 動畫（Animation）。
這次的變更只是讓這個問題浮現出來。

## 遷移指南

以下是一個在此變更後開始拋出例外的範例應用程式。

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

你可以透過自行引入 hero controller 範疇（hero controller scopes）來修正這個應用程式。

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

新增於版本：1.20.0<br>  
進入穩定版：1.20

## 參考資料

API 文件：

* [`Navigator`][`Navigator`]
* [`HeroController`][`HeroController`]
* [`HeroControllerScope`][`HeroControllerScope`]

相關議題：

* [Issue 45938][Issue 45938]

相關 PR：

* [Clean up hero controller scope][Clean up hero controller scope]

[Clean up hero controller scope]: {{site.repo.flutter}}/pull/60655
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`HeroController`]: {{site.api}}/flutter/widgets/HeroController-class.html
[`HeroControllerScope`]: {{site.api}}/flutter/widgets/HeroControllerScope-class.html
[Issue 45938]: {{site.repo.flutter}}/issues/45938
