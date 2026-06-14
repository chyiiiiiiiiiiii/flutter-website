---
title: 為 DropdownButton 新增 enabled 屬性並使 onChanged 改為選填
description: >-
  DropdownButton 和 DropdownButtonFormField 現在支援明確的 enabled
  屬性，且其 onChanged 回呼（callback）不再是必填項目。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`DropdownButton` 和 `DropdownButtonFormField` 現在新增了
`enabled` 屬性，可明確管理其互動狀態，
且 `onChanged` 回呼（callback）不再標記為 `required`。

## 背景

過去，`DropdownButton` 和 `DropdownButtonFormField` 沒有
`enabled` 參數。
停用下拉選單的唯一方式
（使其變灰且無法互動）是將 `null`
傳入 `required` 的 `onChanged` 回呼（callback）。
這導致在動態啟用或停用按鈕時，程式碼不夠直覺，
迫使開發者必須為回呼（callback）本身撰寫條件運算式，
例如 `onChanged: condition ? (value) { ... } : null`。

為了改善此 API，引入了專屬的 `enabled` 屬性，
並將 `onChanged` 改為選填。

`enabled` 屬性為選填。
若強制設為必填，將會造成大規模重大變更，
幾乎會破壞 Flutter 生態系中所有現有的 `DropdownButton` 實作。
為了保持向下相容性，
若未明確提供 `enabled` 引數，
按鈕會根據是否提供 `onChanged` 來決定其狀態（即
若 `onChanged != null` 則啟用，若 `onChanged == null` 則停用）。

此處的輕微重大變更在於結構上：
雖然舊有的條件式 `onChanged` 模式由於回退邏輯在技術上仍可運作，
但建議開發者透過明確使用 `enabled` 屬性來遷移至更清晰的 API。

## 遷移指南

若您先前透過條件式傳入 `null` 給 `onChanged` 來停用 `DropdownButton`，
請遷移至新的 `enabled` 屬性。
這樣可以清楚地將元件 (Widget) 的狀態（啟用/停用）
與其行為（回呼（callback））分離。

若要自動遷移簡單情況下的程式碼
（例如靜態傳入 `null`），請執行以下指令：

```console
$ dart fix --apply
```

:::important
請注意，`dart fix` 不會自動遷移使用條件邏輯設定 `onChanged`
的情況。對於這類情況，您必須手動更新程式碼。
:::

### 案例一：靜態停用的下拉選單 {: #case-1-statically-disabled }

對於下拉選單永久停用的簡單情況，
您現在可以直接省略 `onChanged` 並使用 `enabled: false`。

遷移前的程式碼：

```dart
final disabledDropdown = DropdownButton<String>(
  value: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: null, // This was the only way to disable it
);
```

遷移後的程式碼：

```dart diff
  final disabledDropdown = DropdownButton<String>(
    value: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: null, // This was the only way to disable it
+   enabled: false,
  );
```

### 案例二：條件式停用的下拉選單 {: #case-2-conditionally-disabled }

建議的最佳實踐做法是透過直接使用 `enabled` 屬性，
將回呼（callback）與互動狀態分離。

遷移前的程式碼：

```dart
final conditionalDropdown = DropdownButton<String>(
  value: 'Option 1',
  items: const [
    DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
  ],
  onChanged: condition ? (value) { ... } : null,
);
```

遷移後的程式碼：

```dart diff
  final conditionalDropdown = DropdownButton<String>(
    value: 'Option 1',
    items: const [
      DropdownMenuItem(value: 'Option 1', child: Text('Option 1')),
    ],
-   onChanged: condition ? (value) { ... } : null,
+   onChanged: (value) { ... },
+   enabled: condition,
  );
```

## 時間軸

已落地版本：3.44.0-1.0.pre-629<br>
穩定版本：尚未發布

## 參考資料

API 文件：

* [`DropdownButton`][]
* [`DropdownButtonFormField`][]

相關 issues：

* [為什麼 DropdownButtonFormField 的 onChanged 是必填？][issue-57953]

相關 PR：

* [Update DropdownButton enabled property logic][]

[`DropdownButton`]: {{site.api}}/flutter/material/DropdownButton-class.html
[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField-class.html
[issue-57953]: {{site.repo.flutter}}/issues/57953
[Update DropdownButton enabled property logic]: {{site.repo.flutter}}/pull/182419
