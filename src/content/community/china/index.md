```markdown
---
title: 在中國地區使用 Flutter
description: 如何在中國地區使用、存取及學習 Flutter。
---

{% render docs/china-notice-cn.md %}

為了加快在中國地區下載與安裝 Flutter 的速度，建議使用[鏡像站點][mirror site]或 _mirror_。

:::important
僅在您「信任」該提供者的情況下使用鏡像站點。
Flutter 團隊無法驗證這些鏡像的可靠性或安全性。
:::

[mirror site]: https://en.wikipedia.org/wiki/Mirror_site

## 使用 Flutter 鏡像站點

[中國 Flutter 用戶組][China Flutter User Group] (CFUG) 維護了一個簡體中文的
Flutter 網站 [https://flutter.cn](https://flutter.cn) 及其鏡像。
其他鏡像站點可在[本指南末尾](#known-trusted-community-run-mirror-sites)找到。

### 設定您的機器以使用鏡像站點

若要在中國地區安裝或使用 Flutter，請選擇一個可信賴的 Flutter 鏡像站點。
這需要在您的機器上設定兩個環境變數。

_以下所有範例皆假設您使用的是 CFUG 鏡像站點。_

將您的機器設定為使用鏡像站點：

{% tabs "china-setup-os" %}

{% tab "Windows" %}

這些步驟需要使用 PowerShell。

 1. 開啟一個新的 PowerShell 視窗，以準備執行 Shell 指令。

 1. 將 `PUB_HOSTED_URL` 設定為您的鏡像站點。
```

    ```ps
    $ $env:PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```
 
 1. 將 `FLUTTER_STORAGE_BASE_URL` 設定為你的鏡像站點。

    ```ps
    $ $env:FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. 從你偏好的鏡像站點下載 Flutter 壓縮檔。

    若使用 CFUG，請前往他們的 [Flutter SDK archive][Flutter SDK archive]，
    並下載適用於你作業平台與架構的 SDK。

1. 建立一個用來安裝 Flutter 的資料夾，然後切換到該目錄。
    可以考慮使用像是 `$env:USERPROFILE\dev` 這樣的路徑。

    ```ps
    $ New-Item -Path "$env:USERPROFILE\dev" -ItemType Directory; cd "$env:USERPROFILE\dev"
    ```
 1. 從 zip 壓縮檔案中解壓縮 SDK。

    本範例假設你下載的是 Windows 版本的 Flutter SDK。你需要將壓縮檔案的路徑替換為你實際下載的檔案路徑及版本。

    ```ps
    $ Expand-Archive .\flutter_windows_3.35.5-stable.zip
    ```

 1. 將 Flutter 新增到您的 `PATH` 環境變數中。

    ```ps
    $ $env:PATH = $pwd.PATH + "\flutter\bin",$env:PATH -join ";"
    ```

 1. 開始使用 Flutter 進行開發。

    完成以下步驟後，
    Flutter 會在目前的終端機視窗中，
    從 `flutter-io.cn` 取得套件與相關檔案。

    若要讓這些設定在所有終端機永久生效，
    請依照[將 Flutter 加入 PATH][windows-path]的說明操作，
    並同時加入 `PUB_HOSTED_URL` 與 `FLUTTER_STORAGE_BASE_URL` 變數。

{:.steps}

[windows-path]: /install/add-to-path#windows

{% endtab %}

{% tab "macOS" %}

 1. 在終端機中開啟一個新視窗，以準備執行 shell 指令。

 1. 將 `PUB_HOSTED_URL` 設定為你的鏡像站點。

    ```console
    $ export PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```

 1. 將 `FLUTTER_STORAGE_BASE_URL` 設定為你的鏡像站點。

    ```console
    $ export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. 從您偏好的鏡像站點下載 Flutter 壓縮檔。

    若使用 CFUG，請造訪他們的 [Flutter SDK archive][Flutter SDK archive]，
    並下載適用於您平台與架構的 SDK。

 1. 建立一個資料夾以安裝 Flutter，然後切換到該資料夾。
    可以考慮使用像是 `~/dev` 這樣的路徑。

    ```console
    $ mkdir ~/dev; cd ~/dev
    ```

 1. 從壓縮檔（zip archive file）中解壓縮 SDK。

    本範例假設你下載的是 macOS 版本的 Flutter SDK。  
    你需要將路徑替換為你實際下載的壓縮檔案及其版本的路徑。

    ```console
    $ unzip flutter_macos_3.35.5-stable.zip
    ```

 1. 將 Flutter 新增到您的 `PATH` 環境變數中。

    ```console
    $ export PATH="$PWD/flutter/bin:$PATH"
    ```

 1. 開始使用 Flutter 進行開發。

    完成以下步驟後，
    Flutter 會在目前的終端機視窗中，
    從 `flutter-io.cn` 取得套件與相關檔案。

    若要在所有終端機視窗中永久設定這些值，
    請依照[將 Flutter 加入 PATH][macos-path]的說明操作，
    並同時加入 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 變數。

{:.steps}

[macos-path]: /install/add-to-path#macos

{% endtab %}

{% tab "Linux" %}

 1. 在終端機中開啟一個新視窗，準備執行 Shell 指令。

 1. 將 `PUB_HOSTED_URL` 設定為你的鏡像站點。

    ```console
    $ export PUB_HOSTED_URL="https://pub.flutter-io.cn"
    ```

 1. 將 `FLUTTER_STORAGE_BASE_URL` 設定為你的鏡像站點。

    ```console
    $ export FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
    ```

 1. 從您偏好的鏡像站點下載 Flutter 壓縮檔。

    若使用 CFUG，請前往他們的 [Flutter SDK archive][Flutter SDK archive]，
    並下載適用於您平台與架構的 SDK。

1. 建立一個資料夾以安裝 Flutter，然後切換到該資料夾。
   可以考慮使用像是 `~/dev` 這樣的路徑。

    ```console
    $ mkdir ~/dev; cd ~/dev
    ```

 1. 從壓縮檔（tar archive file）中解壓縮 SDK。

    此範例假設你下載的是 Linux 版本的 Flutter SDK（Flutter 軟體開發套件）。
    你需要將路徑替換為你實際下載的壓縮檔案及其版本的路徑。

    ```console
    $ tar -xf flutter_linux_3.35.5-stable.tar.xz
    ```

 1. 將 Flutter 新增到您的 `PATH` 環境變數中。

    ```console
    $ export PATH="$PWD/flutter/bin:$PATH"
    ```

 1. 開始使用 Flutter 進行開發。

    完成以下步驟後，
    Flutter 會在目前的終端機視窗中，
    從 `flutter-io.cn` 取得套件與相關檔案。

    若要讓這些設定在所有終端機視窗中永久生效，
    請依照[將 Flutter 加入 PATH][linux-path]的說明操作，
    並同時加入 `PUB_HOSTED_URL` 和 `FLUTTER_STORAGE_BASE_URL` 這兩個變數。

{:.steps}

[linux-path]: /install/add-to-path#linux

{% endtab %}

{% endtabs %}

[Flutter SDK archive]: https://docs.flutter.cn/install/archive/

### 透過鏡像站點下載 Flutter 壓縮檔

若要從鏡像站點下載 Flutter 的 [SDK archive][SDK archive]，
請將 `storage.googleapis.com` 替換為您信任的鏡像站點 URL。
您可以在瀏覽器或其他應用程式（如 IDM 或迅雷）中使用您的鏡像站點，
這樣可以提升下載速度。

[SDK archive]: /install/archive

以下範例說明如何將 Flutter 下載站點的 URL
從 Google 的官方檔案庫更改為 CFUG 的鏡像站。

{% tabs "china-setup-os" %}

{% tab "Windows" %}

若要下載 Flutter SDK 的 x64 Windows 版本，
您需要將原始的 URL 從：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/windows/flutter_windows_3.35.5-stable.zip
```

到鏡像站的 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/windows/flutter_windows_3.35.5-stable.zip
```

{% endtab %}

{% tab "macOS" %}

若要下載適用於 arm64 架構的 macOS 版本 Flutter SDK（Flutter 軟體開發套件），
您需要將原始的 URL 由：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.35.5-stable.zip
```

到鏡像 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.35.5-stable.zip
```

{% endtab %}

{% tab "Linux" %}

若要下載 Flutter SDK（Flutter 軟體開發套件）的 Linux 版本，
您需要將原始的 URL 進行如下更改：

```plaintext
[!https://storage.googleapis.com!]/flutter_infra_release/releases/stable/linux/flutter_linux_3.35.5-stable.tar.xz
```

至鏡像 URL：

```plaintext
[!https://storage.flutter-io.cn!]/flutter_infra_release/releases/stable/linux/flutter_linux_3.35.5-stable.tar.xz
```

{% endtab %}

{% endtabs %}

:::note
並非每個鏡像站都支援使用其直接 URL 下載構件（artifacts）。
:::

## 設定您的機器以發佈套件

若要將您的套件發佈到`pub.dev`，
您需要能夠存取 Google Auth 以及`pub.dev`網站。

{% comment %}
From <https://github.com/flutter/website/pull/9338#discussion_r1328077020>
{% endcomment %}

要啟用對`pub.dev`的存取：

{% tabs "china-setup-os" %}

{% tab "Windows" %}

 1. 設定代理伺服器（proxy）。
    如需設定代理伺服器，請參考
    [Dart documentation on proxies][Dart documentation on proxies]。
 
 1. 請確認您的`PUB_HOSTED_URL`環境變數未設定或為空值。
 
    ```ps
    $ echo $env:PUB_HOSTED_URL
    ```
 
    如果此指令回傳任何值，請將其取消設定（unset）。
 
    ```ps
    $ Remove-Item $env:PUB_HOSTED_URL
    ```

{% endtab %}
{% tab "macOS" %}

 1. 設定代理伺服器。  
    如需設定代理伺服器，請參考  
    [Dart documentation on proxies][Dart documentation on proxies]。

 1. 請確認您的 `PUB_HOSTED_URL` 環境變數
    沒有被設定或為空值。
 
    ```console
    $ echo $PUB_HOSTED_URL
    ```
 
    如果此指令有回傳任何值，請將其取消設定（unset）。
 
    ```console
    $ unset $PUB_HOSTED_URL
    ```

{% endtab %}
{% tab "Linux" %}

 1. 設定代理伺服器。  
    如需設定代理伺服器，請參考  
    [Dart documentation on proxies][Dart documentation on proxies]。
 
 1. 請確認您的 `PUB_HOSTED_URL` 環境變數
    尚未設定或為空值。
 
    ```console
    $ echo $PUB_HOSTED_URL
    ```
 
    如果此指令有回傳任何值，請將其取消設定（unset）。
 
    ```console
    $ unset $PUB_HOSTED_URL
    ```

{% endtab %}

{% endtabs %}

想進一步瞭解如何發佈套件，請參考
[Dart documentation on publishing packages][Dart documentation on publishing packages]。

[Dart documentation on proxies]: {{site.dart-site}}/tools/pub/troubleshoot#pub-get-fails-from-behind-a-corporate-firewall
[Dart documentation on publishing packages]: {{site.dart-site}}/tools/pub/publishing

## 已知且受信任的社群運營鏡像站點

Flutter 團隊無法保證任何鏡像站點的長期可用性。
如果有其他鏡像站點出現，您也可以選擇使用。

{% for mirror in mirrors %}

<hr>

### {{mirror.group}}

[{{mirror.group}}][{{mirror.group}}] 維護 `{{mirror.mirror}}` 鏡像站點。
該鏡像包含 Flutter SDK 及 pub 套件。

#### 設定您的機器使用此鏡像

若要讓您的機器使用此鏡像，請執行下列指令。

在 macOS、Linux 或 ChromeOS 上：

```console
export PUB_HOSTED_URL={{mirror.urls.pubhosted}};
export FLUTTER_STORAGE_BASE_URL={{mirror.urls.flutterstorage}}
```

在 Windows 上：

```console
$env:PUB_HOSTED_URL="{{mirror.urls.pubhosted}}";
$env:FLUTTER_STORAGE_BASE_URL="{{mirror.urls.flutterstorage}}"
```

#### 取得此鏡像的支援

如果你在使用 `{{mirror.mirror}}` 鏡像時遇到僅發生於該鏡像的問題，請至他們的 [issue tracker]({{mirror.urls.issues}}) 回報問題。

{% endfor %}

{% for mirror in mirrors %}
[{{mirror.group}}]: {{mirror.urls.group}}
{% endfor %}

## 提供新鏡像站點的申請

如果你有興趣架設自己的鏡像站，請聯絡 [flutter-dev@googlegroups.com](mailto:flutter-dev@googlegroups.com) 以獲得協助。
