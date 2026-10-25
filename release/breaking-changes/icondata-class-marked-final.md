# IconData 類別標記為 final

> IconData 類別現在已標記為 final， 禁止對其進行擴充或實作。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 概要

`IconData` 類別現在已標記為 [`final`][]，
這表示它無法再被實作或擴充。
此變更是為了通用化資源 (assets) 與原生程式碼的
Tree Shaking 機制所做的努力之一。

[`final`]: https://dart.dev/language/class-modifiers#final

## 背景

Flutter 團隊正在開發一套通用機制，
以便將資源與原生程式碼的 Tree Shaking 功能帶入套件 (package)。
現有的專用 Icon Tree Shaker 將被整合至此通用機制中。

為了效能、局部性與可理解性，通用機制不支援
在複雜型別階層中記錄 `const` 實例。
因此，`IconData` 類別現在已標記為 `final`。

實作或擴充 `IconData` 的程式碼現在將無法編譯，
並出現下列錯誤：

```text
The class 'IconData' is 'final' and can't be extended or implemented outside of its library.
```

## 遷移指南

若要取代實作 `IconData` 的方式
（例如使用支援點式簡寫 (dot shorthand)、型別安全以及自動 `.values` 清單的 `enum`），
請改用含有 `static const` 實例的包裝類別。

### 遷移自訂圖示型別

若您曾使用實作 `IconData` 的 `enum`，
請遷移至含有 `static const` 實例的類別，並搭配自訂元件 (Widget)。

遷移前的程式碼：

```dart
enum AppIcons implements IconData {
  arrowUpward(0xe062),
  arrowDownward(0xe061);

  const AppIcons(this.codePoint)
    : fontFamily = 'MaterialIcons',
      fontPackage = null,
      matchTextDirection = false;

  @override
  final int codePoint;
  @override
  final String? fontFamily;
  @override
  final String? fontPackage;
  @override
  final bool matchTextDirection;
}

Widget build(BuildContext context) {
  // AppIcons 的使用範例：
  return Icon(AppIcons.arrowUpward);
}
```

若要保留點式簡寫支援與型別安全，
請使用包裝類別與自訂元件。

遷移後的程式碼：

```dart
final class AppIconData {
  final IconData iconData;

  const AppIconData._(this.iconData);

  static const arrowUpward = AppIconData._(
    IconData(0xe062, fontFamily: 'MaterialIcons'),
  );
  static const arrowDownward = AppIconData._(
    IconData(0xe061, fontFamily: 'MaterialIcons'),
  );

  static const values = [arrowUpward, arrowDownward];
}

class AppIcon extends StatelessWidget {
  const AppIcon(this.icon, {super.key});
  final AppIconData icon;

  @override
  Widget build(BuildContext context) {
    return Icon(icon.iconData);
  }
}

Widget build(BuildContext context) {
  // 若可推斷型別，用法仍保留點式簡寫：
  return const AppIcon(AppIconData.arrowUpward);
  // 或在可推斷時使用：const AppIcon(.arrowUpward)
}
```

若您依賴 `.values` 搭配 Widgetbook 等工具，
可如上例手動維護 `values` 清單，或使用程式碼產生工具。

### 忽略 `mustBeConst` 程式碼檢查

為了啟用 Tree Shaking，部分 `IconData` 參數已使用
`mustBeConst` 標注進行標記。
若您必須使用非 const 的 `IconData`，
且願意放棄該圖示的 Tree Shaking，
請為該程式碼檢查加入忽略註解。

```dart
// ignore: non_const_argument_for_const_parameter
Icon(myDynamicIconData);
```

## 時間表

導入版本：3.44.0-0.1.pre<br>
穩定版本：3.44

## 參考資料

相關 PR：

* [Mark `IconData` `final` and `@mustBeConst`][pr-181345]

相關 issues：

* [Breaking Change: Marking `class IconData` as `final`][issue-181342]
* [Marking `IconData`'s constructor parameters as `@mustBeConst`][issue-181344]

[pr-181345]: https://github.com/flutter/flutter/pull/181345
[issue-181342]: https://github.com/flutter/flutter/issues/181342
[issue-181344]: https://github.com/flutter/flutter/issues/181344

