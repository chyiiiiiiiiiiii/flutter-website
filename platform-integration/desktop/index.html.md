# Flutter 桌面端支援

> 關於 Flutter 支援桌面應用程式的一般資訊。



Flutter 提供將原生 Windows、macOS 或 Linux 桌面應用程式編譯的支援。Flutter 的桌面端支援同樣延伸至插件（plugins）&mdash;你可以安裝已支援 Windows、macOS 或 Linux 平台的現有插件，或自行建立專屬插件。

:::note
本頁涵蓋所有桌面平台的應用程式開發。閱讀完本頁後，你可以進一步參考以下連結，深入瞭解各特定平台：

* [使用 Flutter 建立 Windows 應用程式][Building Windows apps with Flutter]
* [使用 Flutter 建立 macOS 應用程式][Building macOS apps with Flutter]
* [使用 Flutter 建立 Linux 應用程式][Building Linux apps with Flutter]
:::

[Building Windows apps with Flutter]: /platform-integration/windows/building
[Building macOS apps with Flutter]: /platform-integration/macos/building
[Building Linux apps with Flutter]: /platform-integration/linux/building

## 建立新專案

你可以依照下列步驟，建立支援桌面端的新專案。

### 設定桌面開發工具

請參考你目標桌面環境的相關指南：

* [安裝 Linux 桌面開發工具][Linux-devtools]
* [安裝 macOS 桌面開發工具][macOS-devtools]
* [安裝 Windows 桌面開發工具][Windows-devtools]

[Linux-devtools]: /platform-integration/linux/setup#set-up-tooling
[macOS-devtools]: /platform-integration/macos/setup#set-up-tooling
[Windows-devtools]: /platform-integration/windows/setup#set-up-tooling

如果 `flutter doctor` 偵測到你不打算開發的平台有問題或缺少元件，你可以忽略這些警告。或者，你也可以使用 `flutter config` 指令完全停用該平台，例如：

```console
$ flutter config --no-enable-ios
```

其他可用的旗標：

* `--no-enable-windows-desktop`
* `--no-enable-linux-desktop`
* `--no-enable-macos-desktop`
* `--no-enable-web`
* `--no-enable-android`
* `--no-enable-ios`

啟用桌面支援後，請重新啟動你的 IDE，以便偵測到新的裝置。

### 建立與執行

建立支援桌面的新專案，與[建立其他平台的 Flutter 專案][creating a new Flutter project]沒有任何不同。

當你已經將開發環境設定好支援桌面後，你可以在 IDE 或命令列中建立並執行桌面應用程式。

[creating a new Flutter project]: /reference/create-new-app

#### 使用 IDE

當你已經設定好支援桌面的開發環境後，如果 IDE 已經在執行，請務必重新啟動。

在 IDE 中建立新的應用程式時，會自動建立 iOS、Android、Web 以及桌面版本的應用程式。從裝置下拉選單中，選擇 **windows (desktop)**、**macOS (desktop)** 或 **linux (desktop)**，然後執行你的應用程式，即可在桌面上看到它啟動。

#### 使用命令列

若要建立包含桌面支援（以及行動裝置與 Web 支援）的新應用程式，請執行以下指令，並將 `my_app` 替換為你的專案名稱：

```console
$ flutter create my_app
$ cd my_app
```

要從命令列啟動您的應用程式，請在套件的頂層目錄輸入以下其中一個指令：

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

## 為現有的 Flutter 應用程式新增桌面支援

若要為現有的 Flutter 專案新增桌面支援，請在終端機中於專案根目錄執行以下指令：

```console
$ flutter create --platforms=windows,macos,linux .
```

這會將必要的桌面檔案與目錄新增到你現有的 Flutter 專案中。
若只想新增特定的桌面平台，
請將 `platforms` 清單更改為只包含
你想要新增的平台。

## 插件支援

Flutter 在桌面端支援使用與建立插件。
若要使用支援桌面的插件，
請依照 [使用套件][using packages] 章節的說明操作。
Flutter 會自動將必要的原生程式碼
加入你的專案，就像在其他平台上一樣。

### 撰寫插件

當你開始建立自己的插件時，
請務必考慮到聯邦（Federation）設計。
聯邦（Federation）是指能夠定義多個
針對不同平台的套件，並將它們
整合成單一插件，方便開發者使用。
例如，`url_launcher` 的 Windows 實作
其實是 `url_launcher_windows`，
但 Flutter 開發者只需將
`url_launcher` 套件加入他們的 `pubspec.yaml`
做為相依套件，建置流程就會根據目標平台
自動拉取正確的實作。
聯邦設計很實用，因為不同專業領域的團隊
可以為不同平台開發插件實作。
你可以為 pub.dev 上任何經認可的聯邦插件
新增新的平台實作，
只要你有與原始插件作者協調這項工作。

如需更多資訊，包括有關認可（endorsed）插件的說明，請參考以下資源：

* [開發套件與插件][Developing packages and plugins]，特別是
  [聯邦插件（Federated plugins）][Federated plugins] 章節。
* [如何撰寫 Flutter Web Plugin，第二部分][How to write a Flutter web plugin, part 2]，
  說明聯邦插件的結構，並包含適用於桌面
  插件的相關資訊。
* [現代 Flutter Plugin 開發][Modern Flutter Plugin Development]
  涵蓋 Flutter 插件支援的最新增強功能。

[using packages]: /packages-and-plugins/using-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
[How to write a Flutter web plugin, part 2]: https://blog.flutter.dev/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Modern Flutter Plugin Development]: https://blog.flutter.dev/modern-flutter-plugin-development-4c3ee015cf5a

<a id="samples-and-codelabs" aria-hidden="true"></a>

## 範例

你可以將下列範例作為桌面應用程式執行，
也可以下載並檢視原始碼，
以深入了解 Flutter 桌面支援。

Wonderous app [線上體驗][wonderous-app]、[原始碼庫][wonderous-repo]
：一個展示型應用程式，利用 Flutter 打造極具表現力的使用者介面。
  Wonderous 著重於提供無障礙且高品質的使用體驗，
  同時包含引人入勝的互動與創新動畫。
  若要將 Wonderous 作為桌面應用程式執行，請先複製專案並依照 [README][wonderous-readme] 中的說明操作。

Flokk [公告部落格][gskinner-flokk-blogpost]、[原始碼庫][gskinner-flokk-repo]
：一款 Google 聯絡人管理工具，可與 GitHub 及 Twitter 整合。
  它會與你的 Google 帳號同步，匯入聯絡人，
  並讓你進行管理。

[Photo Search app][Photo Search app]
：一個以桌面應用程式形式打造的範例，
  使用了支援桌面的插件。

[wonderous-app]: https://wonderous.app//web
[wonderous-repo]: https://github.com/gskinnerTeam/flutter-wonderous-app
[wonderous-readme]: https://github.com/gskinnerTeam/flutter-wonderous-app#wonderous
[Photo Search app]: https://github.com/flutter/samples/tree/main/desktop_photo_search
[gskinner-flokk-repo]: https://github.com/gskinnerTeam/flokk
[gskinner-flokk-blogpost]: https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html

