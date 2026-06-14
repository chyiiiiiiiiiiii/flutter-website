---
title: TextSelectionTheme 遷移
description: >
  文字選取的預設屬性將遷移至 TextSelectionTheme。
---

{% render "docs/breaking-changes.md" %}

## 摘要

控制 Material 元件 (Widget) 中選取文字外觀的 `ThemeData` 屬性，已被移動到專屬的 `TextSelectionTheme` 中。這些屬性包括 `cursorColor`、`textSelectionColor` 和 `textSelectionHandleColor`。這些屬性的預設值也已更新，以符合 Material Design 規範。

## 背景

作為更大範圍 [Material 主題更新][Material Theme Updates] 的一部分，我們引入了一個新的 [Text Selection Theme][]，用於指定 `TextField` 和 `SelectableText` 元件中選取文字的屬性。這些取代了 `ThemeData` 的多個頂層屬性，並將其預設值更新為符合 Material Design 規範。本文將說明應用程式如何遷移至這個新的 API。

## 遷移指南

如果你目前正在使用 `ThemeData` 的以下屬性，請將它們更新為在 `ThemeData.textSelectionTheme` 上的新對應屬性：

| 遷移前                               | 遷移後                                         |
|--------------------------------------|-----------------------------------------------|
| `ThemeData.cursorColor`              | `TextSelectionThemeData.cursorColor`          |
| `ThemeData.textSelectionColor`       | `TextSelectionThemeData.selectionColor`       |
| `ThemeData.textSelectionHandleColor` | `TextSelectionThemeData.selectionHandleColor` |

<br/>

**遷移前的程式碼：**

```dart
ThemeData(
  cursorColor: Colors.red,
  textSelectionColor: Colors.green,
  textSelectionHandleColor: Colors.blue,
)
```

**遷移後的程式碼：**

```dart
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: Colors.red,
    selectionColor: Colors.green,
    selectionHandleColor: Colors.blue,
  )
)
```

**預設值變更**

如果你之前沒有明確使用這些屬性，但依賴於過去用於文字選取的預設顏色，你可以在你的 `ThemeData` 中新增一個欄位，讓你的應用程式恢復到舊的預設值，如下所示：

```dart
// Old defaults for a light theme
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: const Color.fromRGBO(66, 133, 244, 1.0),
    selectionColor: const Color(0xff90caf9),
    selectionHandleColor: const Color(0xff64b5f6),
  )
)
```

```dart
// Old defaults for a dark theme
ThemeData(
  textSelectionTheme: TextSelectionThemeData(
    cursorColor: const Color.fromRGBO(66, 133, 244, 1.0),
    selectionColor: const Color(0xff64ffda),
    selectionHandleColor: const Color(0xff1de9b6),
  )
)
```

如果你對新的預設值沒有意見，但 golden file 測試失敗，你可以使用以下指令來更新你的 master golden files：

```console
$ flutter test --update-goldens
```

## 時程

合併於版本：1.23.0-4.0.pre<br>
穩定版釋出：2.0.0

## 參考資料

API 文件：

* [`TextSelectionThemeData`][]
* [`ThemeData`][]

相關 PR：

* [PR 62014: TextSelectionTheme support][]

[Material Theme Updates]: /go/material-theme-system-updates
[PR 62014: TextSelectionTheme support]: {{site.repo.flutter}}/pull/62014
[Text Selection Theme]: /go/text-selection-theme
[`TextSelectionThemeData`]: {{site.api}}/flutter/material/TextSelectionThemeData-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
