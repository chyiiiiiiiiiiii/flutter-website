# 欠阻尼彈簧公式已變更

> `SpringDescription` 的公式已變更以修正先前的錯誤， 影響到欠阻尼彈簧（阻尼比小於 1）。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`SpringDescription` 的公式已變更，以修正先前的錯誤，
這會影響到阻尼比小於 1 且質量不等於 1 的欠阻尼彈簧。
在此變更之前建立的彈簧，在升級後可能會出現
不同的彈跳行為。

## 背景

[`SpringDescription`][] 類別描述了阻尼彈簧的行為，
讓 Flutter 元件 (Widget) 能根據所提供的參數進行真實的動畫。
阻尼彈簧的物理行為在學術上已有廣泛的研究與記錄。關於阻尼的概述，
可參考 [Wikipedia: Damping][]。

先前，Flutter 用於計算欠阻尼彈簧行為的公式
是錯誤的，如 [Issue 163858][] 所回報。這個錯誤影響了所有阻尼比小於 1 且質量不等於 1 的彈簧。因此，動畫
無法符合預期的真實物理行為，且在臨界阻尼點（阻尼比正好為 1）附近的行為會出現不連續的情況。
特別是當使用 `SpringDescription.withDampingRatio` 時，像是阻尼比 1.0001 與 0.9999 這樣的
微小差異，會導致動畫產生顯著不同。

這個問題已在 PR [Fix SpringSimulation formula for underdamping][]
中修正，更新了底層的計算方式。因此，先前受影響的
動畫現在會有不同的行為，雖然框架本身不會明確回報錯誤。

## 遷移指南

只有阻尼比小於 1 且質量不等於 1 的彈簧需要進行遷移。

若要恢復先前的動畫行為，請相應地調整您的彈簧參數。
您可以使用提供的 [JSFiddle for migration][] 來計算所需的參數調整。
詳細的公式與說明請見下方章節。

### 預設建構子

如果 `SpringDescription` 是使用預設建構子建立，並帶有
質量 `m`、剛性 `k` 與阻尼 `c`，
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

如果 `SpringDescription` 是使用 `.withDampingRatio` 建構函式，並指定質量 `m`、剛性 `k` 以及比率 `z` 建立的，則請先計算阻尼值：

```plaintext
c = z * 2 * sqrt(m * k)
```

然後套用上面的公式。
您也可以選擇將結果轉換回阻尼比（damping ratio），方法如下：

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

納入版本：3.31.0-0.1.pre<br>
正式版發佈：3.32

## 參考資料

API 文件：

* [`SpringDescription`][]

相關議題：

* [Issue 163858][]，此處發現了該錯誤，並可取得更多背景資訊。

相關 PR：

* [修正 SpringSimulation 欠阻尼公式][Fix SpringSimulation formula for underdamping]

工具：
* [遷移用 JSFiddle][JSFiddle for migration]

[Fix SpringSimulation formula for underdamping]: https://github.com/flutter/flutter/pull/165017
[Issue 163858]: https://github.com/flutter/flutter/issues/163858
[JSFiddle for migration]: https://jsfiddle.net/6jgvbzps/30/
[`SpringDescription`]: https://api.flutter.dev/flutter/physics/SpringDescription-class.html
[Wikipedia: Damping]: https://en.wikipedia.org/wiki/Damping

