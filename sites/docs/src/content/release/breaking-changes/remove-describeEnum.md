---
title: 移除 describeEnum
description: >-
  `describeEnum` 方法已從 Flutter framework 中移除。
  自 Dart 2.14 起，enum 就有 `name` getter，功能與其相同。
---

{% render "docs/breaking-changes.md" %}

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

[`enums`]: {{site.dart-site}}/language/enums
[PR 94496]: {{site.repo.flutter}}/pull/94496
[PR 190076]: {{site.repo.flutter}}/pull/190076


