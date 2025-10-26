---
title: Flutter SDK 歷史版本存檔
shortTitle: 歷史版本
description: "所有現行 Flutter SDK 發行版本：stable、beta 及 main。"
---

{% render docs/china-notice.md %}

## 概覽

Flutter SDK 歷史版本存檔收錄了所有過去版本的 Flutter SDK。這個存檔對於需要因相容性或除錯原因而使用舊版 Flutter 的開發者來說非常有用。

此存檔包含適用於 Windows、macOS 與 Linux 的 Flutter SDK，並依照下列[頻道][channels]分類：

*   **{{site.sdk.channel | capitalize }} 頻道**：此頻道包含最穩定的 Flutter 版本。大約每三個 beta 版本會有一個被提升為 stable 版本。stable 頻道是新手與正式上線應用程式的推薦選擇。

*   **Beta 頻道**：此頻道提供最新但尚未穩定的 Flutter 版本。beta 分支通常於每月的第一個星期三釋出。修正通常會在進入 main 頻道後約兩週進入 beta 頻道。發行版本會以[安裝套件][installation bundles]形式提供。

*   **Main 頻道**：此頻道擁有最新功能，但尚未經過完整測試，可能存在一些錯誤。除非你正在貢獻 Flutter 本身，否則不建議使用 main 頻道。

在 SDK 歷史版本存檔中，每個 Flutter 發行版本都會提供以下資訊：

*   **Flutter 版本**：Flutter SDK 的版本號（例如 3.35.0、2.10.5），採用修改過的[日曆版本管理][calendar versioning]方式，稱為 _CalVer_。更多資訊請參考 [Flutter SDK 版本管理][Flutter SDK versioning]頁面。
*   **架構**：SDK 所建構的處理器架構（例如 x64、arm64），指定 SDK 相容的處理器類型。
*   **Ref**：唯一識別該發行版本程式碼庫的 git commit 雜湊值。
*   **發行日期**：該 Flutter 版本正式發行的日期。
*   **Dart 版本**：此 Flutter SDK 發行版本所包含的對應 Dart SDK 版本。
*   **Provenance**：提供有關 SDK 建構流程與來源的詳細資訊，可能包含安全驗證或所使用的建構系統等資訊。結果會以 JSON 格式呈現。

[calendar versioning]: https://calver.org/
[Flutter SDK versioning]: {{site.repo.flutter}}/blob/main/docs/releases/Release-versioning.md

## Stable 頻道

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

`main` 頻道（先前稱為 `master` 頻道）不提供[安裝套件][Installation bundles]。
不過，你可以直接從
[GitHub repo][GitHub repo] 透過 clone main 頻道來取得 SDK，
然後觸發下載 SDK 相依套件：

```console
$ git clone -b main https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

## 更多資訊

若想了解 Flutter 主要版本的最新變更，請參閱[發行說明][release notes]頁面。

關於我們的安裝 bundle 檔案結構的詳細資訊，請參閱[安裝 bundle 檔案][Installation bundles]。

[channels]: {{site.repo.flutter}}/blob/main/docs/releases/Flutter-build-release-channels.md
[release notes]: /release/release-notes
[GitHub repo]: {{site.repo.flutter}}
[Installation bundles]: {{site.repo.flutter}}/blob/main/docs/infra/Flutter-Installation-Bundles.md
