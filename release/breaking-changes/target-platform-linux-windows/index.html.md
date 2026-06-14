# 將 'linux' 和 'windows' 新增至 TargetPlatform 列舉型別

> 兩個新值已新增至 TargetPlatform 列舉型別，這可能會需要在以 TargetPlatform 為條件的 switch 陳述式中補充額外的分支。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`TargetPlatform`][] 列舉型別新增了兩個新值，
這可能會導致在以 `TargetPlatform` 為條件且未包含 `default:` 分支的 switch 陳述式中，需要補充額外的分支。

## 背景說明

在此變更之前，`TargetPlatform` 列舉型別僅包含四個值，
其定義如下：

```dart
enum TargetPlatform {
  android,
  fuchsia,
  iOS,
  macOS,
}
```

`switch` 陳述式只需要處理這些情況，而希望在 Linux 或 Windows 上執行的桌面應用程式，通常會在它們的 `main()` 方法中加入類似以下的測試：

```dart
// Sets a platform override for desktop to avoid exceptions. See
// https://docs.flutter.dev/desktop#target-platform-override for more info.
void _enablePlatformOverrideForDesktop() {
  if (!kIsWeb && (Platform.isWindows || Platform.isLinux)) {
    debugDefaultTargetPlatformOverride = TargetPlatform.fuchsia;
  }
}

void main() {
  _enablePlatformOverrideForDesktop();
  runApp(MyApp());
}
```

## 變更說明

`TargetPlatform` 列舉現在被定義為：

```dart
enum TargetPlatform {
  android,
  fuchsia,
  iOS,
  linux, // new value
  macOS,
  windows, // new value
}
```

而平台測試設定
[`debugDefaultTargetPlatformOverride`][] 在 `main()`
於 Linux 和 Windows 上已不再需要。

這可能會導致 Dart analyzer 針對
[`missing_enum_constant_in_switch`][]
對於未包含 `default` case 的 switch 陳述式給出警告。
撰寫沒有 `default:` case 的 switch 陳述式
是建議用於處理 enum 的方式，因為 analyzer
可以協助你找出尚未處理的 case。

## 遷移指南

為了遷移至新的 enum，並避免 analyzer 出現
`missing_enum_constant_in_switch` 錯誤（如下所示）：

```plaintext
warning: Missing case clause for 'linux'. (missing_enum_constant_in_switch at [package] path/to/file.dart:111)
```

或：

```plaintext
warning: Missing case clause for 'windows'. (missing_enum_constant_in_switch at [package] path/to/file.dart:111)
```

請依下列方式修改您的程式碼：

遷移前的程式碼：

```dart
void dance(TargetPlatform platform) {
  switch (platform) {
    case TargetPlatform.android:
      // Do Android dance.
      break;
    case TargetPlatform.fuchsia:
      // Do Fuchsia dance.
      break;
    case TargetPlatform.iOS:
      // Do iOS dance.
      break;
    case TargetPlatform.macOS:
      // Do macOS dance.
      break;
  }
}
```

遷移後的程式碼：

```dart
void dance(TargetPlatform platform) {
  switch (platform) {
    case TargetPlatform.android:
      // Do Android dance.
      break;
    case TargetPlatform.fuchsia:
      // Do Fuchsia dance.
      break;
    case TargetPlatform.iOS:
      // Do iOS dance.
      break;
    case TargetPlatform.linux: // new case
      // Do Linux dance.
      break;
    case TargetPlatform.macOS:
      // Do macOS dance.
      break;
    case TargetPlatform.windows: // new case
      // Do Windows dance.
      break;
  }
}
```

在這類 switch 陳述式中包含 `default:` case 並不建議，因為這樣分析器（analyzer）將無法協助你找出所有需要處理的 case。

另外，像上述所提到、會設定 `debugDefaultTargetPlatformOverride` 的測試，在 Linux 和 Windows 應用程式中已不再需要。

## 時程表

合併於版本：1.15.4<br>
穩定版釋出：1.17

## 參考資料

API 文件：

* [`TargetPlatform`][]

相關議題：

* [Issue #31366][]

相關 PR：

* [Add Windows, and Linux as TargetPlatforms][]

[Add Windows, and Linux as TargetPlatforms]: https://github.com/flutter/flutter/pull/51519
[`debugDefaultTargetPlatformOverride`]: https://api.flutter.dev/flutter/foundation/debugDefaultTargetPlatformOverride.html
[Issue #31366]: https://github.com/flutter/flutter/issues/31366
[`missing_enum_constant_in_switch`]: https://dart.dev/tools/diagnostic-messages#missing_enum_constant_in_switch
[`TargetPlatform`]: https://api.flutter.dev/flutter/foundation/TargetPlatform-class.html

