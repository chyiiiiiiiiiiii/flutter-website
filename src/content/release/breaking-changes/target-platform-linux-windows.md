---
title: 在 TargetPlatform 列舉新增 'linux' 與 'windows'
description: >
  於 TargetPlatform 列舉中新增了兩個值，這可能需要在以 TargetPlatform 為條件的 switch 陳述式中增加額外的分支。
---

{% render docs/breaking-changes.md %}

## 摘要

於 [`TargetPlatform`][`TargetPlatform`] 列舉中新增了兩個值，這可能需要在以 `TargetPlatform` 為條件且未包含 `default:` 分支的 switch 陳述式中增加額外的分支。

## 背景說明

在此變更之前，`TargetPlatform` 列舉僅包含四個值，其定義如下：

```dart
enum TargetPlatform {
  android,
  fuchsia,
  iOS,
  macOS,
}
```

`switch` 陳述式只需要處理這些情況，而希望在 Linux 或 Windows 上執行的桌面應用程式，通常會在其 `main()` 方法中加入如下測試：

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

`TargetPlatform` 列舉現在定義如下：

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
[`debugDefaultTargetPlatformOverride`][`debugDefaultTargetPlatformOverride`] 在 `main()`
於 Linux 和 Windows 上已不再需要。

這可能會導致 Dart 分析器對於
[`missing_enum_constant_in_switch`][`missing_enum_constant_in_switch`]
在 switch 陳述式未包含 `default` case 時，給出警告。
撰寫不帶有 `default:` case 的 switch 是
建議處理 enum 的方式，因為這樣分析器
就能協助你找出任何未處理的情況。

## 遷移指南

為了遷移至新的 enum，並避免分析器出現
`missing_enum_constant_in_switch` 錯誤，其錯誤訊息如下：

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

在這類 switch 陳述式中使用 `default:` case 並不建議，因為這樣分析器（analyzer）就無法協助你找出所有需要處理的情境。

此外，像上述提到、會設定 `debugDefaultTargetPlatformOverride` 的測試，在 Linux 和 Windows 應用程式中已不再需要。

## 時程表

合併於版本：1.15.4<br>  
穩定版釋出：1.17

## 參考資料

API 文件：

* [`TargetPlatform`][`TargetPlatform`]

相關議題：

* [Issue #31366][Issue #31366]

相關 PR：

* [Add Windows, and Linux as TargetPlatforms][Add Windows, and Linux as TargetPlatforms]

[Add Windows, and Linux as TargetPlatforms]: {{site.repo.flutter}}/pull/51519
[`debugDefaultTargetPlatformOverride`]: {{site.api}}/flutter/foundation/debugDefaultTargetPlatformOverride.html
[Issue #31366]: {{site.repo.flutter}}/issues/31366
[`missing_enum_constant_in_switch`]: {{site.dart-site}}/tools/diagnostic-messages#missing_enum_constant_in_switch
[`TargetPlatform`]: {{site.api}}/flutter/foundation/TargetPlatform-class.html
