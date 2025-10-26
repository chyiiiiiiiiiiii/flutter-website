---
title: 新版 CupertinoIcons 圖示字型有圖示字形變更
description: >
  當你升級至 cupertino_icons 1.0.0 後，部分舊有字形會自動對應到新的字形。建議進行視覺上的再次確認。

---

{% render docs/breaking-changes.md %}

## 摘要

現有的 cupertino_icons [0.1.3 icons][0.1.3 icons]
是以 iOS 11 的美學為基礎，特色為銳利的角度與細線條。

隨著 Apple 的圖示設計在新版本作業系統中持續更新，
`cupertino_icons` 套件也會同步更新。

一般來說，所有先前透過
[`CupertinoIcons`][`CupertinoIcons`] API 參照的字形，會自動對應到
新 SF Symbols 風格中外觀非常相似的圖示
（特色為更圓潤、線條更粗）。

部分在新 SF Symbols 風格中沒有對應的圖示，
則會維持原樣。

部分圖示在新版本中變化較少
（如線條粗細、替代外觀等），
會自動對應並合併到新 SF Symbols 風格中最相近的變化，
但建議再次檢查是否保留了原本預期的視覺效果。

## 變更說明

新的 `cupertino_icons 1.0.0` 字型是手工製作，
以最大程度保留符號的設計意圖與美感。
所有現有的 `CupertinoIcons` 的靜態 `IconData` 欄位
（因此所有字型 `.ttf` 的 codepoint）
都能繼續使用，並會指向合理的新圖示。

新版 cupertino_icons 1.0.0 套件也新增了約 1,000 個
可供選擇的圖示。

### 未變更的圖示

以下列表中的圖示在 SF Symbols 風格中沒有替代品。
先前 cupertino_icons 0.1.3 的圖示在 1.0.0 中維持不變。

* bluetooth
* bus
* car
* car_detailed
* chevron_back
* chevron_forward
* lab_flask
* lab_flask_solid
* news
* news_solid
* train_style_one
* train_style_two

### 合併的圖示

同一群組內的圖示，在 1.0.0 中現在都會顯示為完全相同的圖示。
也就是說，0.1.3 版本中這些圖示的細微差異已經消失，
現在都會呈現代表該群組主題的 SF Symbols 風格圖示。

這影響到以下圖示群組：

* share, share_up
* battery_charging, battery_full, battery_75_percent
* shuffle, shuffle_medium, shuffle_thick
* delete, delete_simple
* refresh, refresh_thin, refresh_thick
* clear, clear_thick
* clear_circled_solid, clear_thick_circled
* gear, gear_alt, gear_big
* loop, loop_thick
* time_solid, clock_solid
* time, clock
* tag, tags
* tag_solid, tags_solid

這主要是因為在創建原始 `cupertino_icons` 集合時採用了部分藝術上的自由，
導致部分圖示的變化多樣性不再符合 SF Symbols 更正式的圖示集。

## 移轉指南

升級至 1.22 之後，
如果你也將 `cupertino_icons`
pubspec 依賴從 0.1.3 升級至 1.0.0，
例如，透過修改：

```yaml
dependencies:
  ... // Other dependencies
  cupertino_icons: ^0.1.0
```

to:

```yaml
dependencies:
  ... // Other dependencies
  cupertino_icons: ^1.0.0
```

你的所有 `CupertinoIcons` 都會自動更新為新的美學風格（除了上方所列的[未變更圖示](#合併的圖示)）。

此時，你也可以探索 [`CupertinoIcons`][`CupertinoIcons`]，尋找可在應用程式中使用的新圖示。

建議你在遷移後，檢查你的應用程式，以確保自動對應的新圖示符合你期望的美學風格。

## 時程

合併於：1.22.0-10.0.pre.65<br>
正式版本：1.22

## 參考資料

[0.1.3 icons]: https://raw.githubusercontent.com/flutter/cupertino_icons/master/map.png
[`CupertinoIcons`]: {{site.api}}/flutter/cupertino/CupertinoIcons-class.html
