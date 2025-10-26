---
title: 介紹 package:flutter_lints
description: >
  遷移至 package:flutter_lints，以取得最新推薦的
  程式碼檢查規則（lints），這些規則能促進良好的程式撰寫習慣。
---

{% render docs/breaking-changes.md %}

## 摘要

[`package:flutter_lints`][`package:flutter_lints`] 定義了最新一套推薦的程式碼檢查規則（lints），
這些規則能鼓勵 Flutter 應用程式、套件以及插件採用良好的程式撰寫習慣。
使用 Flutter 2.5 或更新版本的 `flutter create` 所建立的專案，
已經預設啟用最新的推薦 lints。早於該版本建立的專案，
可依照本指南的說明進行升級。

## 背景說明

在引入 `package:flutter_lints` 之前，Flutter 框架
內建了一組定義於 [`analysis_options_user.yaml`][`analysis_options_user.yaml`] 的 lints，
當 Flutter 專案未自訂 `analysis_options.yaml` 檔案時，
[dart analyzer][dart analyzer] 會使用這組規則來檢查程式碼問題。
由於 `analysis_options_user.yaml` 綁定於特定的框架版本，
因此難以在不破壞現有應用程式、套件與插件的情況下進行演進。
因此，`analysis_options_user.yaml` 中定義的 lints 已嚴重過時。為了解決這個問題，
`package:flutter_lints` 應運而生。該套件將 lints 規則獨立於框架版本，
讓其可以持續演進而不會影響現有專案。此外，該套件是建立在 Dart 的
[`package:lints`][`package:lints`] 之上，因此也讓 Flutter 專案的推薦 lints
與 Dart 生態系統保持一致。

## 遷移指南

請依照以下步驟，將您的 Flutter 專案遷移至使用 `package:flutter_lints`
所提供的最新推薦 lints：

在專案的 `pubspec.yaml` 中新增 `package:flutter_lints` 為 dev_dependency，
可於專案根目錄執行 `flutter pub add --dev flutter_lints` 完成新增。

於專案根目錄（與 `pubspec.yaml` 檔案同層）建立一個 `analysis_options.yaml` 檔案，
內容如下：

```yaml
include: package:flutter_lints/flutter.yaml
```

新啟用的 lint 規則集可能會在你的程式碼中發現一些新的問題。要找出這些問題，請在[支援 Dart 的 IDE][IDE with Dart support]中開啟你的專案，或是在命令列執行 `flutter analyze`。你可以透過在專案根目錄執行 `dart fix --apply`，自動修正部分回報的問題。

### 已存在的自訂 analysis_options.yaml 檔案

如果你的專案根目錄下已經有自訂的 `analysis_options.yaml` 檔案，請在檔案頂部加入 `include: package:flutter_lints/flutter.yaml`，以啟用來自 `package:flutter_lints` 的 lint 規則。如果你的 `analysis_options.yaml` 已經包含 `include:` 指令，你需要決定是否要保留那些 lint 規則，還是要改用來自 `package:flutter_lints` 的 lint，因為 Dart analyzer 每個 `analysis_options.yaml` 檔案只支援一個 `include:` 指令。

## 自訂 lint 規則

針對特定專案啟用的 lint 規則，可以在 `analysis_options.yaml` 檔案中進一步自訂。以下的範例檔案展示了這個做法，這個範例是由 `flutter create` 為新專案產生的 `analysis_options.yaml` 檔案內容的再現。

```yaml
# This file configures the analyzer, which statically analyzes Dart code to
# check for errors, warnings, and lints.
#
# The issues identified by the analyzer are surfaced in the UI of Dart-enabled
# IDEs (https://dart.dev/tools#ides-and-editors). The analyzer can also be
# invoked from the command line by running `flutter analyze`.

# The following line activates a set of recommended lints for Flutter apps,
# packages, and plugins designed to encourage good coding practices.
include: package:flutter_lints/flutter.yaml

linter:
  # The lint rules applied to this project can be customized in the
  # section below to disable rules from the `package:flutter_lints/flutter.yaml`
  # included above or to enable additional rules. A list of all available lints
  # and their documentation is published at
  # https://dart-lang.github.io/linter/lints/index.html.
  #
  # Instead of disabling a lint rule for the entire project in the
  # section below, it can also be suppressed for a single line of code
  # or a specific dart file by using the `// ignore: name_of_lint` and
  # `// ignore_for_file: name_of_lint` syntax on the line or in the file
  # producing the lint.
  rules:
    # avoid_print: false  # Uncomment to disable the `avoid_print` rule
    # prefer_single_quotes: true  # Uncomment to enable the `prefer_single_quotes` rule

# Additional information about this file can be found at
# https://dart.dev/guides/language/analysis-options
```

## 時程

導入版本：2.3.0-12.0.pre<br>  
穩定版發行：2.5

## 參考資料

文件：

* [`package:flutter_lints`][`package:flutter_lints`]
* [套件相依性][Package dependencies]
* [自訂靜態分析][Customizing static analysis]

相關議題：

* [Issue 78432 - 更新 Flutter 應用程式的 lint 設定][Issue 78432 - Update lint set for Flutter applications]

相關 PR：

* [新增 flutter_lints 套件][Add flutter_lints package]
* [將 package:flutter_lints 整合至範本][Integrate package:flutter_lints into templates]

[Add flutter_lints package]: {{site.repo.packages}}/pull/343
[`analysis_options_user.yaml`]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/analysis_options_user.yaml
[Customizing static analysis]: {{site.dart-site}}/guides/language/analysis-options
[dart analyzer]: {{site.dart-site}}/guides/language/analysis-options
[IDE with Dart support]: {{site.dart-site}}/tools#ides-and-editors
[Integrate package:flutter_lints into templates]: {{site.repo.flutter}}/pull/81417
[Issue 78432 - Update lint set for Flutter applications]: {{site.repo.flutter}}/issues/78432
[`package:flutter_lints`]: {{site.pub-pkg}}/flutter_lints
[`package:lints`]: {{site.pub}}/packages/lints
[Package dependencies]: {{site.dart-site}}/tools/pub/dependencies
