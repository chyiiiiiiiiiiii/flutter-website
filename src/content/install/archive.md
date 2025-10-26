---
title: Flutter SDK（Flutter 軟體開發套件）檔案庫
shortTitle: 檔案庫
description: "所有現行 Flutter SDK 發行版本：穩定版、Beta 版，以及 Main 版。"
---

{% render docs/china-notice.md %}

## 概述

Flutter SDK 檔案庫收錄了所有過去版本的 Flutter SDK。這個檔案庫對於需要因相容性需求或問題調查而使用舊版 Flutter 的開發者非常有用。

檔案庫包含適用於 Windows、macOS 及 Linux 的 Flutter SDK，並依照以下[頻道][channels]分類：

*   **{{site.sdk.channel | capitalize }} 頻道**：此頻道提供最穩定的 Flutter 版本。大約每三個 Beta 版本會有一個升級為穩定版。穩定頻道是新手及正式應用程式發佈推薦使用的頻道。

*   **Beta 頻道**：此頻道提供最新但尚未穩定的 Flutter 版本。Beta 分支通常於每月的第一個星期三發佈。修正通常會在進入 Main 頻道後約兩週，才進入 Beta 頻道。發行版本會以[安裝 bundle 檔案][installation bundles]方式提供。

*   **Main 頻道**：此頻道擁有最新功能，但尚未經過完整測試，可能存在一些錯誤。除非你正在貢獻 Flutter 本身，否則不建議使用此頻道。

在 SDK 檔案庫中，每個 Flutter 發行版本都會提供以下資訊：

*   **Flutter 版本**：Flutter SDK 的版本號（例如：3.35.0、2.10.5），採用一種修改過的[日曆版本管理][calendar versioning]方案，稱為 _CalVer_。更多資訊請參考 [Flutter SDK 版本管理][Flutter SDK versioning]頁面。
*   **架構**：SDK 所建置的處理器架構（例如：x64、arm64），代表 SDK 可相容的處理器類型。
*   **Ref**：唯一識別該發行版本所用程式碼庫的 Git commit hash。
*   **發行日期**：該 Flutter 版本正式發佈的日期。
*   **Dart 版本**：此 Flutter SDK 發行版本所包含的 Dart SDK 對應版本。
*   **來源證明（Provenance）**：提供 SDK 建置流程及來源的詳細資訊，可能包含安全認證或所使用的建置系統等資訊。結果會以 JSON 格式呈現。

[calendar versioning]: https://calver.org/
[Flutter SDK versioning]: {{site.repo.flutter}}/blob/main/docs/releases/Release-versioning.md

## 穩定頻道

{% tabs "os-archive-tabs" %}

{% tab "Windows" %}

{% render docs/release/archive-release.md, os: "Windows", channel: "stable" %}

{% endtab %}

{% tab "macOS" %}

{% render docs/release/archive-release.md, os: "macOS", channel: "stable" %}

{% endtab %}

{% tab "Linux" %}

{% render docs/release/archive-release.md, os: "Linux", channel: "stable" %}

{% endtab %}

{% endtabs %}


## Beta 頻道

{% tabs "os-archive-tabs" %}

{% tab "Windows" %}

{% render docs/release/archive-release.md, os: "Windows", channel: "beta" %}

{% endtab %}

{% tab "macOS" %}

{% render docs/release/archive-release.md, os: "macOS", channel: "beta" %}

{% endtab %}

{% tab "Linux" %}

{% render docs/release/archive-release.md, os: "Linux", channel: "beta" %}

{% endtab %}

{% endtabs %}


<a id="master-channel" aria-hidden="true"></a>

## Main 頻道

`main` 頻道（先前稱為 `master` 頻道）目前不提供[安裝 bundle 檔案][Installation bundles]。
不過，你可以直接從 [GitHub repo][GitHub repo] 取得 SDK，
方法是複製 Main 頻道，然後觸發下載 SDK 相依套件：

```console
$ git clone -b main https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

## 更多資訊

若想了解 Flutter 主要版本的最新變更，請參閱[發行說明][release notes]頁面。

關於我們的安裝套件（installation bundles）結構細節，請參閱[安裝套件][Installation bundles]。

[channels]: {{site.repo.flutter}}/blob/main/docs/releases/Flutter-build-release-channels.md
[release notes]: /release/release-notes
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}/blob/main/docs/infra/Flutter-Installation-Bundles.md
