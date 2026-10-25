# 移除 describeEnum

> `describeEnum` 方法已從 Flutter framework 中移除。 自 Dart 2.14 起，enum 就有 `name` getter，功能與其相同。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`describeEnum` 方法已從 framework 中移除，因為它與 `Enum` 上的 `name`
getter 功能重複，而該 getter 是在 `Dart 2.14` 中引入的。

## 背景

過去 Flutter 使用 `describeEnum` 來回傳 enum 值的 `String` 描述。
自從 `Dart 2.14` 引入 `Enum` 的 `name` getter 後，這個方法就變得多餘了。

## 遷移指南

如果你的程式碼先前使用 `describeEnum` 方法來取得 enum 成員的值名稱，
請改為直接使用實例本身的 `name` getter。

```dart diff
  enum Theme { light, dark }

- final theme = describeEnum(Theme.light);

+ Theme.light.name;
```

:::important
`dart fix` 不支援這項遷移。
:::

## 時程

合併於版本：TBD<br>
穩定版發布：TBD

## 參考資料

API 文件：

* [`enums`][]


相關 PR：

* [PR 94496][]
* [PR 190076][]

[`enums`]: https://dart.dev/language/enums
[PR 94496]: https://github.com/flutter/flutter/pull/94496
[PR 190076]: https://github.com/flutter/flutter/pull/190076



