---
title: Flutter 的桌面端支援
description: 關於 Flutter 支援桌面應用程式的一般資訊。
---

Flutter 提供將原生 Windows、macOS 或 Linux 桌面應用程式編譯的支援。  
Flutter 的桌面端支援也延伸至插件（plugins）&mdash;你可以安裝已支援 Windows、macOS 或 Linux 平台的現有插件，或自行建立專屬插件。

:::note
本頁涵蓋所有桌面平台的應用程式開發。閱讀完本頁後，你可以依據下列連結深入瞭解特定平台的相關資訊：

* [使用 Flutter 建立 Windows 應用程式][Building Windows apps with Flutter]
* [使用 Flutter 建立 macOS 應用程式][Building macOS apps with Flutter]
* [使用 Flutter 建立 Linux 應用程式][Building Linux apps with Flutter]
:::

[Building Windows apps with Flutter]: /platform-integration/windows/building
[Building macOS apps with Flutter]: /platform-integration/macos/building
[Building Linux apps with Flutter]: /platform-integration/linux/building

## 建立新專案

你可以依照以下步驟，建立具有桌面支援的新專案。

### 設定桌面開發工具

請參考目標桌面環境的相關指南：

* [安裝 Linux 桌面開發工具][Linux-devtools]
* [安裝 macOS 桌面開發工具][macOS-devtools]
* [安裝 Windows 桌面開發工具][Windows-devtools]

[Linux-devtools]: /platform-integration/linux/setup#set-up-tooling
[macOS-devtools]: /platform-integration/macos/setup#set-up-tooling
[Windows-devtools]: /platform-integration/windows/setup#set-up-tooling

如果 `flutter doctor` 發現你不打算開發的平台有問題或缺少元件，你可以忽略這些警告。或者，你也可以使用 `flutter config` 指令完全停用該平台，例如：

```console
$ flutter config --no-enable-ios
```

其他可用的旗標（flags）：

* `--no-enable-windows-desktop`
* `--no-enable-linux-desktop`
* `--no-enable-macos-desktop`
* `--no-enable-web`
* `--no-enable-android`
* `--no-enable-ios`

啟用桌面支援後，請重新啟動您的 IDE，以便偵測到新的裝置。

### 建立與執行

建立支援桌面的新專案，與[為其他平台建立新的 Flutter 專案][creating a new Flutter project]沒有任何不同。

當您已經將開發環境設定為支援桌面後，可以在 IDE 或命令列（Command Line Interface）中建立並執行桌面應用程式。

[creating a new Flutter project]: /reference/create-new-app

#### 使用 IDE

當您完成桌面支援的環境設定後，若 IDE 已經在執行中，請務必重新啟動 IDE。

在 IDE 中建立新應用程式時，會自動建立 iOS、Android、Web 以及桌面版本的應用程式。從裝置下拉選單中，選擇 **windows (desktop)**、**macOS (desktop)** 或 **linux (desktop)**，然後執行您的應用程式，即可在桌面上看到它啟動。

#### 使用命令列

若要建立同時包含桌面支援（以及行動裝置與 Web 支援）的新應用程式，請執行以下指令，並將 `my_app` 替換為您的專案名稱：

```console
$ flutter create my_app
$ cd my_app
```

要從命令列啟動您的應用程式，請在套件的頂層目錄下輸入以下其中一個指令：

```console
C:\> flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

:::note
如果你沒有提供 `-d` 旗標，`flutter run` 會列出可供選擇的目標。
:::

## 建立發行版應用程式

要產生發行版（release）建置，請執行以下其中一個指令：

```console
PS C:\> flutter build windows
$ flutter build macos
$ flutter build linux
```

## 為現有的 Flutter 應用程式新增桌面端支援

若要為現有的 Flutter 專案新增桌面端支援，請在終端機中於專案根目錄執行以下指令：

```console
$ flutter create --platforms=windows,macos,linux .
```

這會將必要的桌面檔案與目錄加入現有的 Flutter 專案中。
若只想新增特定的桌面平台，
請將 `platforms` 清單改為只包含
你想要新增的平台。

## 套件（Plugin）支援

Flutter 在桌面端支援使用與建立套件（Plugin）。
若要使用支援桌面的套件，
請依照[使用套件][using packages]中的步驟操作。
Flutter 會自動將所需的原生程式碼
加入你的專案，就像在其他平台上一樣。

### 撰寫套件（Plugin）

當你開始開發自己的套件時，
請務必考慮聯邦式（Federation）設計。
聯邦式設計是指你可以定義多個
針對不同平台的套件（Package），
並將它們整合成單一的套件（Plugin），
讓開發者更容易使用。
例如，`url_launcher` 的 Windows 實作
其實是 `url_launcher_windows`，
但 Flutter 開發者只需將
`url_launcher` 套件加入他們的 `pubspec.yaml`
作為相依套件，建置過程會根據目標平台
自動選擇正確的實作。
聯邦式設計的好處在於，不同專長的團隊
可以分別針對不同平台開發套件實作。
你可以為 pub.dev 上任何已認可（endorsed）的聯邦式套件
新增新的平台實作，
只要你與原始套件作者協調即可。

如需更多資訊，包括有關認可套件的說明，請參考以下資源：

* [開發套件與插件][Developing packages and plugins]，特別是
  [聯邦式插件][Federated plugins]章節。
* [如何撰寫 Flutter Web 插件，第二部分][How to write a Flutter web plugin, part 2]，
  介紹聯邦式插件的結構，並包含適用於桌面
  插件的相關資訊。
* [現代 Flutter 插件開發][Modern Flutter Plugin Development]
  說明了 Flutter 插件支援的最新增強功能。

[using packages]: /packages-and-plugins/using-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
[How to write a Flutter web plugin, part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Modern Flutter Plugin Development]: {{site.flutter-medium}}/modern-flutter-plugin-development-4c3ee015cf5a

## 範例與教學（Codelab）

[撰寫 Flutter 桌面應用程式][Write a Flutter desktop application]
：這是一個教學（codelab），會帶你一步步建立
一個將 GitHub GraphQL API
整合進 Flutter 應用程式的桌面應用。

你可以將下列範例作為桌面應用程式執行，
也可以下載並檢視原始碼，
以進一步了解 Flutter 桌面支援。

Wonderous app [線上體驗][wonderous-app]、[原始碼庫][wonderous-repo]
：這是一個展示型應用程式，使用 Flutter 打造極具表現力的使用者介面。
  Wonderous 著重於提供無障礙且高品質的使用體驗，
  同時包含引人入勝的互動與創新動畫。
  若要將 Wonderous 作為桌面應用程式執行，請先複製專案，
  並依照 [README][wonderous-readme] 中的說明操作。

Flokk [發表部落格][gskinner-flokk-blogpost]、[原始碼庫][gskinner-flokk-repo]
：一款 Google 聯絡人管理工具，可與 GitHub 及 Twitter 整合。
  它可同步你的 Google 帳號、匯入聯絡人，
  並讓你進行管理。

[Photo Search app][Photo Search app]
：這是一個以桌面應用程式形式開發的範例，
  並使用支援桌面的套件（Plugin）。

[wonderous-app]: {{site.wonderous}}/web
[wonderous-repo]: {{site.repo.wonderous}}
[wonderous-readme]: {{site.repo.wonderous}}#wonderous
[Photo Search app]: {{site.repo.samples}}/tree/main/desktop_photo_search
[gskinner-flokk-repo]: {{site.github}}/gskinnerTeam/flokk
[gskinner-flokk-blogpost]: https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html
[Write a Flutter desktop application]: {{site.codelabs}}/codelabs/flutter-github-client
