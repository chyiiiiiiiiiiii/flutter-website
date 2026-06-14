---
title: 棄用 `TextInputConnection.setStyle`
description: >-
  `TextInputConnection.setStyle` 方法已被棄用，
  請改用 `TextInputConnection.updateStyle` 方法。
---

{% render "docs/breaking-changes.md" %}

## 摘要

`TextInputConnection.setStyle` 已被棄用，請改用
`TextInputConnection.updateStyle`，後者支援將
`letterSpacing`、`wordSpacing` 與 `lineHeight` 同步至引擎。

## 背景

舊版的 `setStyle` 方法不支援 `letterSpacing`、`wordSpacing`
或 `lineHeight`。當使用這些屬性時，會造成選取醒目提示與
輸入法 (IME) 游標發生視覺位移錯誤。

替換後的 `updateStyle` 方法使用
`TextInputStyle` 來支援這些屬性，
確保系統輸入與渲染後的文字保持同步。

## 遷移指南

若您自行實作了自訂文字輸入客戶端，
請將 `TextInputConnection.setStyle` 的呼叫
替換為 `TextInputConnection.updateStyle`。

### 遷移前的程式碼

```dart
connection.setStyle(
  fontFamily: 'Roboto',
  fontSize: 14.0,
  fontWeight: FontWeight.normal,
  textDirection: TextDirection.ltr,
  textAlign: TextAlign.start,
);
```

### 遷移後的程式碼

```dart
connection.updateStyle(
  TextInputStyle(
    fontFamily: 'Roboto',
    fontSize: 14.0,
    fontWeight: FontWeight.normal,
    textDirection: TextDirection.ltr,
    textAlign: TextAlign.start,
    letterSpacing: 1.2,
    wordSpacing: 1.0,
    lineHeight: 1.5,
  ),
);
```

## 時間軸

導入版本：3.43.0-0.1.pre<br>
穩定版發布：3.44

## 參考資料

相關 PR：

* [Fix IME and selection by syncing more text styles][pr-180436]

相關 issue：

* [Incorrect position of Japanese predictive conversion popup in TextFormField using maxLines on the Web][issue-161592]

[pr-180436]: {{site.repo.flutter}}/pull/180436
[issue-161592]: {{site.repo.flutter}}/issues/161592
