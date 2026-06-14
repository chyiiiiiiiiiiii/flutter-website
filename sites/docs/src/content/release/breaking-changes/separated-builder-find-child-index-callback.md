---
title: 在 `ListView` 和 `SliverList` 的 separated 建構子中，以 `findItemIndexCallback` 取代已棄用的 `findChildIndexCallback`
description: >-
  ListView.separated 和 SliverList.separated 中的 findChildIndexCallback 參數
  已被棄用，請改用 findItemIndexCallback。
---

## 摘要

`ListView.separated` 和 `SliverList.separated` 建構子中的 `findChildIndexCallback` 參數已被棄用，請改用 `findItemIndexCallback`。新的回呼（callback）直接回傳項目索引，不再需要手動計算索引以處理分隔元件 (Widget) 的偏移。

## 背景

在 `ListView.separated` 和 `SliverList.separated` 建構子中，`findChildIndexCallback` 用來透過 key 定位元件。然而，此回呼回傳的是子元件索引，其中同時包含了內部元件樹中的項目與分隔元件。這意味著開發者必須將項目索引乘以 2 才能得到正確的子元件索引，容易造成混淆並產生容易出錯的程式碼。

新的 `findItemIndexCallback` 參數直接使用項目索引（不含分隔元件），簡化了此流程。這讓 API 更直覺，也降低了索引計算錯誤的可能性。

若您使用已棄用的 `findChildIndexCallback` 參數，將會看到以下棄用警告：

```plaintext
'findChildIndexCallback' is deprecated and shouldn't be used.
Use findItemIndexCallback instead.
findChildIndexCallback returns child indices (which include separators),
while findItemIndexCallback returns item indices (which do not).
If you were multiplying results by 2 to account for separators,
you can remove that workaround when migrating to findItemIndexCallback.
This feature was deprecated after v3.37.0-1.0.pre.
```

此外，若您同時提供兩個參數，將會遇到斷言錯誤：

```plaintext
Cannot provide both findItemIndexCallback and findChildIndexCallback.
Use findItemIndexCallback as findChildIndexCallback is deprecated.
```

## 遷移指南

若要從 `findChildIndexCallback` 遷移至 `findItemIndexCallback`，請將參數名稱替換，並移除原本用來處理分隔元件的索引乘法運算。

遷移前的程式碼：

```dart
ListView.separated(
  itemCount: items.length,
  findChildIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    // Multiply by 2 to account for separators.
    return itemIndex == -1 ? null : itemIndex * 2;
  },
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      key: ValueKey<String>(items[index]),
      title: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

遷移後的程式碼：

```dart
ListView.separated(
  itemCount: items.length,
  findItemIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    // Return item index directly - no need to multiply by 2.
    return itemIndex == -1 ? null : itemIndex;
  },
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      key: ValueKey<String>(items[index]),
      title: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

同樣的遷移方式也適用於 `SliverList.separated`：

遷移前的程式碼：

```dart
SliverList.separated(
  itemCount: items.length,
  findChildIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    return itemIndex == -1 ? null : itemIndex * 2;
  },
  itemBuilder: (BuildContext context, int index) {
    return Container(
      key: ValueKey<String>(items[index]),
      child: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

遷移後的程式碼：

```dart
SliverList.separated(
  itemCount: items.length,
  findItemIndexCallback: (Key key) {
    final ValueKey<String> valueKey = key as ValueKey<String>;
    final int itemIndex = items.indexOf(valueKey.value);
    return itemIndex == -1 ? null : itemIndex;
  },
  itemBuilder: (BuildContext context, int index) {
    return Container(
      key: ValueKey<String>(items[index]),
      child: Text(items[index]),
    );
  },
  separatorBuilder: (BuildContext context, int index) => const Divider(),
)
```

## 時間軸

導入版本：3.38.0-1.0.pre<br>
穩定版本：3.41

## 參考資料

API 文件：

* [`ListView.separated`][]
* [`SliverList.separated`][]

相關 PR：

* [Deprecate findChildIndexCallback for separated constructors][]

[`ListView.separated`]: {{site.api}}/flutter/widgets/ListView/ListView.separated.html
[`SliverList.separated`]: {{site.api}}/flutter/widgets/SliverList/SliverList.separated.html
[Deprecate findChildIndexCallback for separated constructors]: {{site.repo.flutter}}/pull/174491
