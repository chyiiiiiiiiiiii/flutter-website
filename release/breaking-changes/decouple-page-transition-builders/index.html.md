# 頁面轉場建置器重新組織

> CupertinoPageTransitionsBuilder 已從 Material 函式庫移至其所屬的 Cupertino 函式庫。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`CupertinoPageTransitionsBuilder` 已從
`package:flutter/material.dart` 遷移至 `package:flutter/cupertino.dart`。

## 背景

Flutter 提供了多個頁面轉場建置器 (page transition builders)，
用於控制在頁面之間導覽時路由的動畫效果。
這些建置器與 `PageTransitionsTheme` 搭配使用，
可針對各平台自訂轉場效果。

可用的頁面轉場建置器如下：

| 建置器 | 函式庫 | 說明 |
|---------|---------|-------------|
| `FadeUpwardsPageTransitionsBuilder` | Material | Material 3 之前的預設轉場 |
| `OpenUpwardsPageTransitionsBuilder` | Material | 垂直滑動轉場 |
| `ZoomPageTransitionsBuilder` | Material | 縮放轉場（Material 3 預設） |
| `PredictiveBackPageTransitionsBuilder` | Material | Android 預測性返回手勢支援 |
| `CupertinoPageTransitionsBuilder` | **Cupertino** | iOS 風格水平滑動轉場 |

{:.table}

先前，`CupertinoPageTransitionsBuilder` 與其他建置器一同定義於
Material 函式庫中。
由於此類別的實作使用了 Cupertino 轉場 mixin
並提供 iOS 風格的導覽動畫，因此在語意上屬於 Cupertino 元件 (Widget)。

此次移動改善了程式碼的組織方式，
並讓 Cupertino 應用程式無需相依於 Material 函式庫即可使用此建置器。

## 遷移指南

若您使用了 `CupertinoPageTransitionsBuilder`，
且只匯入了 `package:flutter/material.dart`，
請新增 `package:flutter/cupertino.dart` 的匯入。

遷移前的程式碼：

```dart
import 'package:flutter/material.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

遷移後的程式碼：

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

若您的應用程式已同時匯入兩個套件，則無需進行任何變更。

## 時間軸

已落地版本：3.43.0-0.1.pre<br>
穩定版本：3.44

## 參考資料

相關 PR：

* [Decouple CupertinoPageTransitionsBuilder from Material][pr-179776]

[pr-179776]: https://github.com/flutter/flutter/pull/179776

