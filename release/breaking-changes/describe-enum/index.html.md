# describeEnum 與 EnumProperty 的遷移指南

> 了解 describeEnum 的移除與遷移方式。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

全域方法 `describeEnum` 已被棄用。先前使用
`describeEnum(Enum.something)` 的情境，應改為使用
`Enum.something.name`。

類別 `EnumProperty` 已修改為
繼承自 `<T extends Enum?>`，而非 `<T>`。
現有使用 `EnumProperty<NotAnEnum>` 的程式碼，
應改為使用 `DiagnosticsProperty<NotAnEnum>`。

## 背景說明

Dart 2.17 引入了[加強型 enum][enhanced enums]，這讓 `Enum` 成為一種型別。
因此，所有 enum 都有了一個 `name` getter，這使得 `describeEnum`
變得多餘。在此之前，enum 類別通常會透過
`EnumProperty` 進行分析。

`describeEnum` 方法過去用於將 enum 值轉換為字串，
因為 `Enum.something.toString()` 會產生 `Enum.something`，
而不是許多使用者想要的 `something`。現在，`name` getter 已可達成此需求。

`describeEnum` 函式即將被棄用，
因此 `EnumProperty` 類別已更新為僅接受 `Enum` 物件。

[enhanced enums]: https://dart.dev/language/enums#declaring-enhanced-enums

## 變更說明

移除 `describeEnum`。

- 將 `describeEnum(Enum.something)` 替換為 `Enum.something.name`。

`EnumProperty` 現在只接受 null 或 `Enum`；
你不能再傳入非 `Enum` 類別。

## 遷移指南

如果你先前使用 `describeEnum(Enum.field)` 來取得 enum 的字串值，
現在可以直接呼叫 `Enum.field.name`。

如果你先前使用 `EnumProperty<NotAnEnum>`，
現在可以改用泛型的 `DiagnosticsProperty<NotAnEnum>`。

遷移前的程式碼：

```dart
enum MyEnum { paper, rock }

print(describeEnum(MyEnum.paper)); // output: paper

// TextInputType is not an Enum
properties.add(EnumProperty<TextInputType>( ... ));
```

遷移後的程式碼：

```dart
enum MyEnum { paper, rock }

print(MyEnum.paper.name); // output: paper

// TextInputType is not an Enum
properties.add(DiagnosticsProperty<TextInputType>( ... ));
```

## 時程

合併於版本：3.14.0-2.0.pre<br>
穩定版釋出：3.16

## 參考資料

API 文件：

* [`describeEnum`][]
* [`EnumProperty`][]

相關議題：

* [Cleanup SemanticsFlag and SemanticsAction issue][]

相關 PR：

* [Deprecate `describeEnum` PR][]

[`describeEnum`]: https://api.flutter.dev/flutter/foundation/describeEnum.html
[`EnumProperty`]: https://api.flutter.dev/flutter/foundation/EnumProperty-class.html

[Cleanup SemanticsFlag and SemanticsAction issue]: https://github.com/flutter/flutter/issues/123346
[Deprecate `describeEnum` PR]: https://github.com/flutter/flutter/pull/125016

