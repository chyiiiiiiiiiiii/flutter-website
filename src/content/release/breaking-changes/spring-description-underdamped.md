---
title: 欠阻尼彈簧公式已變更
description: >-
  `SpringDescription` 的公式已變更，以修正先前的錯誤，
  影響到欠阻尼彈簧（阻尼比小於 1）。
---

{% render docs/breaking-changes.md %}

## 摘要

`SpringDescription` 的公式已變更，以修正先前的錯誤，
這會影響到阻尼比小於 1 且質量不為 1 的欠阻尼彈簧。
在此變更前建立的彈簧，在升級後可能會出現
不同的彈跳行為。

## 背景

[`SpringDescription`][`SpringDescription`] 類別描述了阻尼彈簧的行為，
讓 Flutter 元件（Widgets）能根據所提供的參數進行真實的動畫（Animation）。
阻尼彈簧的物理行為已有廣泛的研究與文獻記載。關於阻尼的概述，
請參考 [Wikipedia: Damping][Wikipedia: Damping]。

過去，Flutter 用於計算欠阻尼彈簧行為的公式
是不正確的，詳見 [Issue 163858][Issue 163858]。此錯誤影響所有阻尼比小於 1 且質量不為 1 的彈簧。因此，動畫（Animation）
無法符合預期的真實物理行為，且在臨界阻尼點（阻尼比正好為 1）附近的行為會出現不連續。
特別是當使用 `SpringDescription.withDampingRatio` 時，
即使是些微的差異，例如阻尼比為 1.0001 與 0.9999，也會導致
動畫出現顯著不同。

此問題已在 PR [Fix SpringSimulation formula for underdamping][Fix SpringSimulation formula for underdamping] 中修正，
更新了底層計算方式。因此，先前受影響的動畫（Animation）現在會有不同的表現，
但框架本身並不會顯示明確的錯誤訊息。

## 遷移指南

只有阻尼比小於 1 且質量不為 1 的彈簧需要遷移。

若要恢復先前的動畫（Animation）行為，請根據需求調整您的彈簧參數。
您可以使用提供的 [JSFiddle for migration][JSFiddle for migration] 來計算所需的參數調整。
詳細的公式與說明請參見下方各節。

### 預設建構函式

如果 `SpringDescription` 是使用預設建構函式建立，並且
質量為 `m`、剛性為 `k`、阻尼為 `c`，
則應依照下列公式進行調整：

```plaintext
new_m = 1
new_c = c * m
new_k = (4 * (k / m) - (c / m)^2 + (c * m)^2) / 4
```

遷移前的程式碼：

```dart
const spring = SpringDescription(
  mass: 20.0,
  stiffness: 10,
  damping: 1,
);
```

遷移後的程式碼：

```dart
const spring = SpringDescription(
  mass: 1.0,
  stiffness: 100.499375,
  damping: 20,
);
```

### `.withDampingRatio` 建構函式

如果 `SpringDescription` 是使用 `.withDampingRatio` 建構函式，並帶有質量 `m`、剛性 `k` 和比率 `z` 建立的，則首先計算阻尼值：

```plaintext
c = z * 2 * sqrt(m * k)
```

然後套用上述公式。
你也可以選擇將結果轉換回阻尼比（damping ratio），方法如下：

```plaintext
new_z = new_c / 2 / sqrt(new_m * new_k)
```

遷移前的程式碼：

```dart
const spring = SpringDescription.withDampingRatio(
  mass: 5.0,
  stiffness: 6.0,
  damping: 0.03,
);
```

遷移後的程式碼：

```dart
const spring = SpringDescription.withDampingRatio(
  mass: 1,
  stiffness: 1.87392,
  ratio: 0.60017287468545,
);
```

## 時程

引入版本：3.31.0-0.1.pre<br>  
正式版釋出：3.32

## 參考資料

API 文件：

* [`SpringDescription`][`SpringDescription`]

相關議題：

* [Issue 163858][Issue 163858]，此處發現該錯誤，並可取得更多背景資訊。

相關 PR：

* [修正 SpringSimulation 欠阻尼公式][Fix SpringSimulation formula for underdamping]

工具：
* [遷移用 JSFiddle][JSFiddle for migration]

[Fix SpringSimulation formula for underdamping]: {{site.repo.flutter}}/pull/165017
[Issue 163858]: {{site.repo.flutter}}/issues/163858
[JSFiddle for migration]: https://jsfiddle.net/6jgvbzps/30/
[`SpringDescription`]: {{site.api}}/flutter/physics/SpringDescription-class.html
[Wikipedia: Damping]: https://en.wikipedia.org/wiki/Damping
