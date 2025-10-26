---
title: 本地化訊息將產生於原始碼中，而非虛擬套件
description: >-
  當使用 `package:flutter_localizations` 時，預設產生的位置（最終也將是唯一可能的位置）會在你的原始碼（`lib/`）目錄中，而不是虛擬套件 `package:flutter_gen`。
---

{% render docs/breaking-changes.md %}

## 摘要

`flutter` 工具將不再產生虛擬的 `package:flutter_gen`，也不會修改應用程式的 `package_config.json`。

曾經參考 `package:flutter_gen` 的應用程式或工具，應改為直接參考產生於應用程式原始碼目錄中的來源檔案。

此外，當使用產生的 l10n 原始碼時，現在必須指定 `generate: true` 屬性。

## 背景

`flutter_gen` 是一個由 `flutter` 命令列工具所建立的虛擬（合成）套件，讓開發者可以匯入該套件以存取產生的符號與功能，例如用於[國際化][internationalization]。
由於該套件並未列在應用程式的 `pubspec.yaml` 中，且是透過重寫產生的 `package_config.json` 檔案來建立，因此產生了許多問題。

## 遷移指南

此變更僅影響在其 `pubspec.yaml` 中包含下列項目的應用程式：

```yaml
flutter:
  generate: true
```

如果您的應用程式之前在使用`gen-l10n`時未設定此屬性，現在已經是必填項目。

系統會建立一個合成套件（synthetic package，`package:flutter_gen`），並由應用程式參考：

```dart
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
// ...
const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
);
```

有兩種方式可以遷移，避免匯入 `package:flutter_gen`：

 1. 在對應的 [`l10n.yaml`][`l10n.yaml`] 檔案中指定 `synthetic-package: false`：

    ```yaml title="l10n.yaml"
    synthetic-package: false

    # The files are generated into the path specified by `arb-dir`
    arb-dir: lib/i18n

    # Or, specifically provide an output path:
    output-dir: lib/src/generated/i18n
    ```

 2. 啟用 `explicit-package-dependencies` 功能旗標（feature flag）：

    ```sh
    flutter config --explicit-package-dependencies
    ```

## 時程

合併於版本：3.28.0-0.0.pre<br>  
穩定版釋出：3.32.0

**在此變更進入下一個穩定版後，  
將移除 `package:flutter_gen` 支援。**

## 參考資料

相關議題：

- [Issue 73870][Issue 73870]，首次發現 `package:flutter_gen` pub 問題。
- [Issue 102983][Issue 102983]，概述了 `package:flutter_gen` 問題。
- [Issue 157819][Issue 157819]，討論了 `--implicit-pubspec-resolution`。

相關文章：

- [Internationalizing Flutter apps][internationalization]，此功能的標準文件。

[`l10n.yaml`]: /ui/internationalization#configuring-the-l10n-yaml-file
[Issue 73870]: {{site.repo.flutter}}/issues/73870
[Issue 102983]: {{site.repo.flutter}}/issues/102983
[Issue 157819]: {{site.repo.flutter}}/issues/157819
[internationalization]: /ui/internationalization#adding-your-own-localized-messages
