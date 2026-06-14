---
title: 介紹 package:flutter_lints
description: >
  遷移至 package:flutter_lints，以取得最新推薦的 lint 規則集，
  這些規則有助於養成良好的程式撰寫習慣。
---

{% render "docs/breaking-changes.md" %}

## 摘要

[`package:flutter_lints`][] 定義了最新一套推薦的 lint 規則，
鼓勵 Flutter 應用程式、套件與插件（plugins）採用良好的程式撰寫習慣。
使用 Flutter 2.5 或更新版本，並透過 `flutter create` 建立的專案，
已經預設啟用最新的推薦 lint 規則集。較舊版本建立的專案，
可以依照本指南的說明進行升級。

## 背景說明

在 `package:flutter_lints` 推出之前，Flutter 框架內建了一套由 [`analysis_options_user.yaml`][]
所定義的 lint 規則，這些規則會由 [dart analyzer][]
在 Flutter 專案未自訂 `analysis_options.yaml` 檔案時協助檢查程式碼問題。
由於 `analysis_options_user.yaml` 綁定於特定框架版本，
因此難以在不破壞既有應用程式、套件與插件的情況下進行演進。
因此，`analysis_options_user.yaml` 中所定義的 lint 規則已嚴重過時。
為了解決這個問題，`package:flutter_lints` 應運而生。
這個套件將 lint 規則集版本化，讓它能夠持續演進，
而不會破壞既有專案。由於該套件是建立在 Dart 的 [`package:lints`][] 之上，
因此也讓 Flutter 專案所推薦的 lint 規則與整個 Dart 生態系統保持一致。

## 遷移指南

請依照下列步驟，將你的 Flutter 專案遷移至使用 `package:flutter_lints` 提供的最新推薦 lint 規則：

在專案根目錄下執行 `flutter pub add --dev flutter_lints`，於你的 `pubspec.yaml`
新增對 `package:flutter_lints` 的 dev_dependency。

在專案根目錄（與 `pubspec.yaml` 檔案同一層）建立 `analysis_options.yaml` 檔案，
內容如下：

```yaml
include: package:flutter_lints/flutter.yaml
```

新啟用的 lint 規則集可能會在你的程式碼中發現一些新的問題。要找出這些問題，請在[支援 Dart 的 IDE][IDE with Dart support]中開啟你的專案，或是在命令列執行 `flutter analyze`。你也可以透過在專案根目錄下執行 `dart fix --apply`，自動修正部分回報的問題。

### 已有自訂 analysis_options.yaml 檔案

如果你的專案根目錄下已經有自訂的 `analysis_options.yaml` 檔案，請在檔案最上方加入 `include: package:flutter_lints/flutter.yaml`，以啟用 `package:flutter_lints` 的 lint 規則。如果你的 `analysis_options.yaml` 已經包含 `include:` 指令，你需要決定是否要保留這些 lint 規則，還是要改用 `package:flutter_lints` 的 lint，因為 Dart analyzer 每個 `analysis_options.yaml` 檔案只支援一個 `include:` 指令。

## 自訂 lint 規則

針對特定專案所啟用的 lint 規則，可以在 `analysis_options.yaml` 檔案中進一步自訂。這一點可以從下方的範例檔案中看到，該檔案是 `flutter create` 為新專案所產生的 `analysis_options.yaml` 檔案內容的複製版本。

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

合併於版本：2.3.0-12.0.pre<br>
穩定版發佈於：2.5

## 參考資料

文件：

* [`package:flutter_lints`][]
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
