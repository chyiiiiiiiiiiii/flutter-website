# Flutter SDK 封存檔

> 所有目前的 Flutter SDK 版本：stable、beta 與 main。



:::note Developing in China
If you want to use Flutter in China,
check out [using Flutter in China][].
If you're not developing in China, ignore this notice
and follow the other instructions on this page.

如果你正在中国的网络环境下配置 Flutter，
请参考 [在中国网络环境下使用 Flutter][] 文档.
:::

[using Flutter in China]: /community/china
[在中国网络环境下使用 Flutter]: https://docs.flutter.cn/community/china/


## 概述

Flutter SDK 封存檔 (Archive) 是所有先前版本 Flutter SDK 的集合。此封存檔適合需要使用舊版 Flutter 的開發人員，例如出於相容性考量或需要調查錯誤時。

下載版本後，請依照[手動安裝說明][manual-install]來設定 Flutter。

封存檔包含適用於 Windows、macOS 與 Linux 的 Flutter SDK，分布於以下[頻道][channels]：

*   **Stable 頻道**：此頻道包含最穩定的 Flutter 建置版本。大約每三個 beta 版本中會有一個晉升為 stable 版本。Stable 頻道是新使用者與正式應用程式發布的建議頻道。

*   **Beta 頻道**：此頻道是目前可用的最新 Flutter 版本，但尚未達到穩定狀態。Beta 分支通常於每月第一個星期三發布。修復通常會在進入 main 頻道約兩週後出現在 beta 頻道中。版本以[安裝套件 (installation bundles)][Installation bundles] 的形式發布。

*   **Main 頻道**：此頻道擁有最新功能，但尚未經過完整測試，可能存在一些錯誤。除非您正在為 Flutter 本身做出貢獻，否則我們不建議使用此頻道。

SDK 封存檔中每個 Flutter 版本提供以下資訊：

*   **Flutter 版本**：Flutter SDK 的版本號碼（例如 3.35.0、2.10.5），遵循稱為 _CalVer_ 的修改版[日曆版本控制][calendar versioning]方案。詳細資訊請參閱 [Flutter SDK 版本控制][Flutter SDK versioning]頁面。
*   **架構 (Architecture)**：SDK 所建置的處理器架構（例如 x64、arm64）。此項目指定 SDK 相容的處理器類型。
*   **Ref**：唯一識別該版本所使用特定程式碼庫的 git commit 雜湊值。
*   **發布日期 (Release Date)**：該特定 Flutter 版本的正式發布日期。
*   **Dart 版本**：Flutter SDK 版本中包含的對應 Dart SDK 版本。
*   **來源驗證 (Provenance)**：提供有關 SDK 建置流程與來源的詳細資訊，可能包含安全性認證或所使用建置系統的相關資訊。結果以 JSON 格式回傳。

[calendar versioning]: https://calver.org/
[Flutter SDK versioning]: https://github.com/flutter/flutter/blob/main/docs/releases/Release-versioning.md

## 公開發布時間窗口

可預測性是安全落地複雜功能的關鍵。我們使用公開發布時間窗口，讓社群具備提前規劃所需的能見度。透過明確標示分支截止日期與發布目標，我們讓所有人能夠調整其開發週期，並有效協調功能落地。

### 什麼是分支截止日期？

此日期是 Pull Request 進入預設分支（Dart 的 `main` 與 Flutter 的 `master`）以確保納入下一個 stable 版本的截止期限。

* **截止日期前**：您的 PR 將隨下一個 stable 版本發布。
* **截止日期後**：您的 PR 將等待下一個週期。

### 2026 年排程

| Flutter 版本    | 發布目標       | 分支截止日期       |
|-----------------|----------------|--------------------|
| Flutter 3.41    | 2026 年 2 月   | 2026-01-06         |
| Flutter 3.44    | 2026 年 5 月   | 2026-04-07         |
| Flutter 3.47    | 2026 年 8 月   | 2026-07-07         |
| Flutter 3.50    | 2026 年 11 月  | 2026-10-06         |

{:.table}

---

## Stable 頻道

<Tabs key="os-archive-tabs">
    <Tab name="Windows">
        <ArchiveTable os="Windows" channel="stable" />
    </Tab>
    <Tab name="macOS">
        <ArchiveTable os="macOS" channel="stable" />
    </Tab>
    <Tab name="Linux">
        <ArchiveTable os="Linux" channel="stable" />
    </Tab>
</Tabs>

## Beta 頻道

<Tabs key="os-archive-tabs">
    <Tab name="Windows">
        <ArchiveTable os="Windows" channel="beta" />
    </Tab>
    <Tab name="macOS">
        <ArchiveTable os="macOS" channel="beta" />
    </Tab>
    <Tab name="Linux">
        <ArchiveTable os="Linux" channel="beta" />
    </Tab>
</Tabs>

:::tip
若要查看 beta 版本的變更內容，請在 GitHub 上比較版本標籤。

1. 找到您想查看的版本號碼（標籤），例如 `3.38.0-0.2.pre`。
2. 找到先前的版本號碼，例如 `3.38.0-0.1.pre`。
3. 前往 [GitHub 比較頁面](https://github.com/flutter/flutter/compare)。
4. 在 `base` 欄位選擇較舊的標籤，在 `compare` 欄位選擇較新的標籤。

範例：[`flutter/flutter@3.38.0-0.1.pre...3.38.0-0.2.pre`](https://github.com/flutter/flutter/compare/3.38.0-0.1.pre...3.38.0-0.2.pre)
:::

<a id="master-channel" aria-hidden="true"></a>

## Main 頻道

`main` 頻道（先前稱為 `master` 頻道）無法使用[安裝套件 (Installation bundles)][Installation bundles]。不過，您可以透過複製 `main` 頻道直接從 [GitHub 儲存庫][GitHub repo]取得 SDK，然後觸發 SDK 相依性的下載：

```console
$ git clone -b main https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

<a id="install-from-an-archive" aria-hidden="true"></a>

## 更多資訊

- 有關從已下載的 SDK 安裝 Flutter 的說明，請參閱[手動安裝 Flutter][manual-install]。

- 若要了解主要 Flutter 建置版本的新功能，請查看[版本說明][release notes]頁面。

- 有關安裝套件結構的詳細資訊，請參閱[安裝套件 (Installation bundles)][Installation bundles]。

[channels]: https://github.com/flutter/flutter/blob/main/docs/releases/Flutter-build-release-channels.md
[manual-install]: /install/manual
[release notes]: /release/release-notes
[GitHub repo]: https://github.com/flutter/flutter
[Installation bundles]: https://github.com/flutter/flutter/blob/main/docs/infra/Flutter-Installation-Bundles.md

