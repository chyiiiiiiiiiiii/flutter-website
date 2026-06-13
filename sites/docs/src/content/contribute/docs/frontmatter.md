---
title: 前置資料（Frontmatter）
description: >-
  了解 Dart 與 Flutter 文件網站中，每份文件開頭所使用的 YAML 前置資料（frontmatter）。
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
本文件仍在撰寫中。
:::

網站上的每個 Markdown 文件都以 [YAML][YAML] 前置資料（frontmatter）開頭。
你可以編輯前置資料，以自訂產生的頁面及其中繼資料（metadata）。

每個頁面至少需要 `title` 和 `description`。

```yaml
---
title: Build a Flutter app
description: >-
  Learn how to build a basic Flutter app with interactive code samples.
---
```

[YAML]: https://yaml.org/

## 在模板中存取 frontmatter 資料

版型（Layouts）、模板（templates）以及原始檔案（source files）都可以透過模板語法，將 frontmatter 中的值作為頂層資料來存取。

例如，下列 frontmatter 設定了一個 `showData` 變數為 `value`：

```yaml
---
# ...
showDate: false
---
```

在樣板（templates）中可以存取 `showDate` 的設定值：

```md
Should show date: {{showDate}}
{% if showDate %}
  The current data is...
{% endif %}
```

如果你要在 frontmatter 中新增一個值，
建議使用 `lowerCamelCase` 作為名稱。

## Frontmatter 欄位

除了 `title` 和 `description` 之外，
網站還支援多種其他可選欄位，
用於自訂頁面產生。

### `title`

### `description`

### `shortTitle`

### `js`

### `toc`

### `layout`

### `showBreadcrumbs`

### `showBanner`

### `sitemap`
