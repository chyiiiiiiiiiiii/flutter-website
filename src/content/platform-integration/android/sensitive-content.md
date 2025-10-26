---
title: 保護您的應用程式敏感內容
shortTitle: 敏感內容
description: >-
  了解如何在您的 Flutter 應用程式中保護敏感內容。
---

此功能適用於 Android API 35 以上版本，您可以透過使用 [`SensitiveContent`] 元件（Widget）來體驗。詳情請參閱下方指南。

## 關於 `SensitiveContent` 元件（Widget）

您可以在應用程式中使用 `SensitiveContent` 元件，將子元件（Widget）`Widget` 的內容敏感度設為下列其中一個 [`ContentSensitivity`] 值：`notSensitive`、`sensitive` 或 `autoSensitive`。您選擇的模式將協助決定在媒體投影期間，是否需要將裝置螢幕遮蔽（黑屏），以保護使用者的敏感資料。

您可以在應用程式中加入任意多個 `SensitiveContent` 元件，但只要其中_任何一個_元件的內容值為 `sensitive`，則在媒體投影期間螢幕都會被遮蔽。因此，在大多數情境下，使用多個 `SensitiveContent` 元件並不會比在元件樹中只放一個 `SensitiveContent` 元件有額外優勢。此功能僅適用於 Android API 35 以上版本，對於較低 API 版本及其他平台則無任何影響。

:::note
截至 Flutter 3.35，`autoSensitive` 值尚未支援，行為與 `notSensitive` 相同。詳情請參閱 [Issue #160879][Issue #160879]。
:::

## 使用 `SensitiveContent` 元件（Widget）

若有某些內容您希望避免被媒體螢幕分享（例如 `MySensitiveContent()` 元件），可以如以下範例所示，將其包裹在 `SensitiveContent` 元件中：

```dart
class MyWidget extends StatelessWidget {
  ...
  Widget build(BuildContext context) {
    return SensitiveContent(
      sensitivity: ContentSensitivity.sensitive,
      child: MySensitiveContent(),
    );
  }
}
```

當在 Android API 34 及以下版本執行時，進行媒體投影期間螢幕不會被遮蔽。該元件（Widget）會存在於元件樹中，但不會產生其他效果，因此在不支援此功能的平台上，無需避免使用 `SensitiveContent`。

## 進一步了解

如需更多資訊，請參閱 [`SensitiveContent`][`SensitiveContent`]
以及 [`ContentSensitivity`][`ContentSensitivity`] API 文件。

[`SensitiveContent`]: {{site.api}}/flutter/widgets/SensitiveContent-class.html
[`ContentSensitivity`]: {{site.api}}/flutter/services/ContentSensitivity.html
[Issue #160879]: {{site.github}}/flutter/flutter/issues/160879
