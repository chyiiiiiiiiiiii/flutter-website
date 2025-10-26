```markdown
---
title: 新版 CupertinoIcons 有圖示字形變更
description: >
  一旦你升級到 cupertino_icons 1.0.0，部分舊有字形會自動對應到新的字形。建議進行視覺上的再次確認。
---

{% render docs/breaking-changes.md %}

## 摘要

現有的 cupertino_icons [0.1.3 圖示][0.1.3 icons]
是以 iOS 11 的美學為基礎，具有銳利的角度與細線條。

隨著 Apple 的圖示設計隨新作業系統版本更新，
`cupertino_icons` 套件也會同步更新。

一般來說，所有先前透過
[`CupertinoIcons`][`CupertinoIcons`] API 參考的字形，
都會自動對應到新 SF Symbols 風格中
外觀非常相似的圖示（特色為更圓潤且線條較粗）。

部分在新 SF Symbols 風格中沒有對應圖示的，
則維持原樣。

部分變化較少的圖示
（如線條粗細、替代外觀等），
會自動對應並合併到新 SF Symbols 風格中
最接近的變體，但建議你再次確認，
以確保其視覺效果是否仍符合預期。

## 變更說明

新的 `cupertino_icons 1.0.0` 字型是手工設計，
以最大程度保留圖示在轉換過程中的設計意圖與美感。
所有現有的
`CupertinoIcons` 的靜態 `IconData` 欄位
（因此所有字型 `.ttf` 的 codepoint）
都能繼續使用，並指向合理的新圖示。

新版 cupertino_icons 1.0.0 套件也新增了約 1,000
個可選用的圖示。

### 未變更的圖示

下列圖示在 SF Symbols 風格中沒有對應的替代品。
cupertino_icons 0.1.3 的這些圖示
在 1.0.0 版本中維持不變。

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

同一組內的圖示在 1.0.0 版本中
現在都會顯示為完全相同的圖示。
換句話說，0.1.3 版本中這些圖示變體的差異
已經消失，現在會渲染為代表該主題的
相同 SF Symbols 風格圖示。

這影響到以下圖示組：

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

這主要是因為原始 `cupertino_icons` 集合在設計時
採取了一些藝術上的自由，
但這些變體的多樣性已不再符合
SF Symbols 較為正式的圖示集。

## 遷移指南

升級到 1.22 之後，
如果你也將 `cupertino_icons`
在 pubspec 依賴項從 0.1.3 升級到 1.0.0，
例如，將以下內容修改為：
```

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

你所有的 `CupertinoIcons` 應會自動更新為新的美學風格（除了上方所列的[未變更圖示](#unchanged-icons)）。

此時，你也可以探索 [`CupertinoIcons`][`CupertinoIcons`]，尋找可在應用程式中使用的新圖示。

建議你在遷移後檢查你的應用程式，以確保自動對應的新圖示符合你所期望的美學風格。

## 時程

合併於：1.22.0-10.0.pre.65<br>  
正式版釋出：1.22

## 參考資料

[0.1.3 icons]: https://raw.githubusercontent.com/flutter/cupertino_icons/master/map.png  
[`CupertinoIcons`]: {{site.api}}/flutter/cupertino/CupertinoIcons-class.html
