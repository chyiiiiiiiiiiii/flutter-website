---
title: 移除 Flutter
shortTitle: 移除
description: >-
    如何從您的開發機器中移除 Flutter SDK（Flutter 軟體開發套件）並清理其設定檔案。
showToc: false
---

若要從您的開發機器中移除 Flutter SDK（Flutter 軟體開發套件），
請刪除存放 Flutter 及其設定檔案的目錄。

## 選擇您的開發平台 {: #dev-platform }

本頁的說明以在 **Windows**{:.selected-os-text} 裝置上
移除 Flutter 為主。

如果您想查看其他作業系統的相關說明，
請選擇下列其中一項。

{% osSelector %}

## 移除 Flutter SDK（Flutter 軟體開發套件） {: #uninstall }

 1. <h3>確認您的 Flutter SDK 安裝位置</h3>

    複製您下載並解壓 Flutter SDK（Flutter 軟體開發套件）所在目錄的絕對路徑。

 1. <h3>移除安裝目錄</h3>

    若要移除 Flutter SDK（Flutter 軟體開發套件），
    請刪除您安裝 Flutter 的 `flutter` 目錄。

    例如，如果您將 Flutter 下載到使用者目錄下的
    `develop\flutter` 資料夾中，
    可以執行下列指令來刪除 SDK：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:USERPROFILE "develop\flutter")
    ```

{: .steps .windows-only}

 1. <h3>確認你的 Flutter SDK 安裝位置</h3>

    複製你下載並解壓 Flutter SDK 的目錄的絕對路徑。

 1. <h3>移除安裝目錄</h3>

    若要解除安裝 Flutter SDK，只需刪除你安裝 Flutter 的 `flutter` 目錄。

    例如，如果你將 Flutter 下載到使用者目錄下的 `develop/flutter` 資料夾，請執行以下指令來刪除 SDK：

    ```console
    $ rm -rf ~/develop/flutter
    ```

{: .steps .macos-only .linux-only .chromeos-only }

## 清除安裝與設定檔案 {: #cleanup }

Flutter 和 Dart 會在你的家目錄中新增其他目錄。
這些目錄包含設定檔案與套件下載內容。
以下的清除步驟為選擇性操作。

 1. <h3>移除 Flutter 設定目錄</h3>

    如果你不需要保留 Flutter 工具設定，請從你的裝置中移除以下目錄。

    <div class="windows-only">

    - `%APPDATA%\.flutter-devtools`

    若要移除這些目錄，請執行以下指令：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".flutter-devtools")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    - `~/.flutter`
    - `~/.flutter-devtools`
    - `~/.flutter_settings`

    To remove these directories, run the following command:

    ```ps
    $ rm -rf  ~/.flutter ~/.flutter-devtools ~/.flutter_settings
    ```

    </div>

 1. <h3>移除 Dart 設定目錄</h3>

    如果你不需要保留 Dart 工具設定，請從你的裝置中移除以下目錄。

    <div class="windows-only">

    - `%APPDATA%\.dart`
    - `%APPDATA%\.dart-tool`
    - `%LOCALAPPDATA%\.dartServer`

    若要移除這些目錄，請執行以下指令：

    ```console
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".dart"), (Join-Path $env:APPDATA ".dart-tool"), (Join-Path $env:LOCALAPPDATA ".dartServer")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    - `~/.dart`
    - `~/.dart-tool`
    - `~/.dartServer`

    To remove these directories, run the following command:

    ```console
    $ rm -rf  ~/.dart ~/.dart-tool ~/.dartServer
    ```

    </div>

 1. <h3>移除 pub 套件目錄</h3>

    如果你不需要保留本機安裝的 pub 套件，
    請從你的裝置中移除 [pub system cache][pub system cache] 目錄。

    <div class="windows-only">

    如果你沒有變更 pub system cache 的位置，
    請執行以下指令以刪除 `%LOCALAPPDATA%\Pub\Cache` 目錄：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:LOCALAPPDATA "Pub\Cache")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    如果你沒有變更 pub 系統快取的位置，
    請執行以下指令來刪除 `~/.pub-cache` 目錄：

    ```console
    $ rm -rf ~/.pub-cache
    ```

    </div>

{: .steps }

[pub system cache]: {{site.dart-site}}/tools/pub/glossary#system-cache

## 重新安裝 Flutter {: #reinstall }

您可以隨時[重新安裝 Flutter][flutter-install]或
[只重新安裝 Dart][dart-install]。
如果您移除了任何設定目錄，
重新安裝 Flutter 會將這些目錄恢復為預設設定。

[flutter-install]: /install
[dart-install]: {{site.dart-site}}/get-dart
