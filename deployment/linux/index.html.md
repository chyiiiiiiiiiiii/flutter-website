# 將 Linux 應用程式建置並發佈到 Snap Store

> 如何準備並將 Linux 應用程式發佈到 Snap Store。



在典型的開發週期中，
你可以在命令列使用 `flutter run` 測試應用程式，
或透過 IDE 中的 **Run** 和 **Debug**
選項進行測試。預設情況下，
Flutter 會建置應用程式的 _debug_ 版本。

當你準備好要建立應用程式的 _release_ 版本時，
例如要[發佈到 Snap Store][snap] 或其他
[替代通道](#其他部署資源)，
本頁將提供協助。

## 先決條件

若要建置並發佈到 Snap Store，你需要以下元件：

* [Ubuntu][] 作業系統，18.04 LTS（或更高版本）
* [Snapcraft][] 命令列工具
* [LXD 容器管理工具][LXD container manager]

## 設定建置環境

請依照下列說明設定你的建置環境。

### 安裝 snapcraft

在命令列執行以下指令：

```console
$ sudo snap install snapcraft --classic
```

### 安裝 LXD

要安裝 LXD，請使用以下指令：

```console
$ sudo snap install lxd
```

在 snap 建置過程中需要安裝 LXD。
安裝完成後，還需要對 LXD 進行設定才能使用。
大多數情境下，預設答案已經適用。

```console
$ sudo lxd init
Would you like to use LXD clustering? (yes/no) [default=no]:
Do you want to configure a new storage pool? (yes/no) [default=yes]:
Name of the new storage pool [default=default]:
Name of the storage backend to use (btrfs, dir, lvm, zfs, ceph) [default=zfs]:
Create a new ZFS pool? (yes/no) [default=yes]:
Would you like to use an existing empty disk or partition? (yes/no) [default=no]:
Size in GB of the new loop device (1GB minimum) [default=5GB]:
Would you like to connect to a MAAS server? (yes/no) [default=no]:
Would you like to create a new local network bridge? (yes/no) [default=yes]:
What should the new bridge be called? [default=lxdbr0]:
What IPv4 address should be used? (CIDR subnet notation, "auto" or "none") [default=auto]:
What IPv6 address should be used? (CIDR subnet notation, "auto" or "none") [default=auto]:
Would you like LXD to be available over the network? (yes/no) [default=no]:
Would you like stale cached images to be updated automatically? (yes/no) [default=yes]
Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]:
```

在第一次執行時，LXD 可能無法連接到其 socket：

```console
An error occurred when trying to communicate with the 'LXD'
provider: cannot connect to the LXD socket
('/var/snap/lxd/common/lxd/unix.socket').
```

這表示你需要將你的使用者名稱加入 LXD（lxd）群組，因此請先登出你的工作階段，然後再重新登入：

```console
$ sudo usermod -a -G lxd <your username>
```

## snapcraft 概述

`snapcraft` 工具會根據 `snapcraft.yaml` 檔案中列出的指令來建構 snap 套件。
若想對 snapcraft 及其核心概念有基本認識，請參閱 [Snap 文件][Snap documentation] 以及 [snapcraft 入門][Introduction to snapcraft]。
本頁底部也列出了其他相關連結與資訊。

## Flutter snapcraft.yaml 範例

請將 YAML 檔案放置於你的 Flutter 專案下的 `<project root>/snap/snapcraft.yaml` 目錄中。
（請注意，YAML 檔案對空白字元非常敏感！）
例如：

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!

confinement: strict
base: core22
grade: stable

slots:
  dbus-super-cool-app: # adjust accordingly to your app name
    interface: dbus
    bus: session
    name: org.bar.super_cool_app # adjust accordingly to your app name and

apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome] # gnome includes the libraries required by flutter
    plugs:
    - network
    slots:
      - dbus-super-cool-app
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```

以下章節將說明 YAML 檔案的各個部分。

### Metadata

此區塊在 `snapcraft.yaml` 檔案中用來定義與描述應用程式。snap 版本會從 build 區塊中取得（採用）。

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!
```

### Grade、confinement 與 base

本節說明如何建構此 snap。

```yaml
confinement: strict
base: core22
grade: stable
```

**Grade（等級）**
: 指定 snap 的品質；這在後續的發佈步驟中會用到。

**Confinement（限制級別）**
: 指定 snap 安裝到最終用戶系統後，能夠存取的系統資源級別。Strict confinement（嚴格限制）會將應用程式的存取權限限制在特定資源（由 `app` 區段中的 plugs 定義）。

**Base（基礎）**
: Snap 設計為自包含的應用程式，因此需要自己的私有核心根檔案系統，稱為 `base`。`base` 關鍵字用來指定所使用的版本，提供最小集合的共用函式庫，並在執行時掛載為應用程式的根檔案系統。

### Apps（應用程式）

此區段定義 snap 內包含的應用程式。每個 snap 可以包含一個或多個應用程式。本範例僅包含一個應用程式——super_cool_app。

```yaml
apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome]
```

**Command**
: 指定相對於 snap 根目錄的二進位檔，並於 snap 被呼叫時執行。

**Extensions**
: 一個或多個 extension（擴充套件）的清單。Snapcraft extension 是可重複使用的元件，能在建置與執行階段，將一組函式庫與工具暴露給 snap，而開發者無需具體了解所包含的 framework。`gnome` extension 會將 GTK 3 函式庫暴露給 Flutter snap。這可確保更小的安裝體積並提升與系統的整合度。


**Plugs**
: 一個或多個系統介面 plug（插頭）的清單。當 snap 採用嚴格隔離時，這些 plug 是提供必要功能所需。此 Flutter snap 需要網路存取權限。

**DBus interface**
: [DBus 介面][DBus interface] 提供 snap 之間透過 DBus 通訊的方式。提供 DBus 服務的 snap 需宣告一個 slot（插槽），指定 well-known DBus 名稱及所使用的 bus。欲與該服務通訊的 snap 則需宣告一個 plug，連接到提供服務的 snap。請注意，若要讓您的 snap 能透過 snap store 發佈並取得此 well-known DBus 名稱，需進行 snap 宣告（只需將 snap 上傳至商店並申請人工審查，審查員會進行審核）。

  當提供服務的 snap 安裝時，snapd 會產生安全性政策，允許其在指定的 bus 上監聽該 well-known DBus 名稱。若指定的是 system bus，snapd 也會產生 DBus bus 政策，允許 'root' 擁有該名稱，並允許任何使用者與該服務通訊。非 snap 的程序可依傳統權限檢查與提供服務的 snap 通訊。其他（消費端）snap 則僅能透過連接兩個 snap 的介面來與提供服務的 snap 進行通訊。

```plaintext
dbus-super-cool-app: # adjust accordingly to your app name
  interface: dbus
  bus: session
  name: dev.site.super_cool_app
```

### Parts

本節說明組裝 snap 所需的來源（parts）。

Parts 可以透過插件（plugins）自動下載與建置。與 extensions 類似，snapcraft 可以使用各種插件（如 Python、C、Java 和 Ruby）來協助建置流程。Snapcraft 也提供了一些特殊插件。

**nil** 插件
: 不執行任何動作，實際的建置流程需透過手動覆寫來處理。

**flutter** 插件
: 提供必要的 Flutter SDK 工具，讓你無需手動下載與設定建置工具即可使用。

```yaml
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```


## Desktop 檔案與圖示

Desktop entry 檔案（桌面啟動項目檔案）用於將應用程式新增到桌面選單。這些檔案會指定應用程式的名稱與圖示、所屬分類、相關搜尋關鍵字等資訊。這些檔案的副檔名為 `.desktop`，並遵循 XDG Desktop Entry Specification 1.1 版規範。

### Flutter super-cool-app.desktop 範例

請將 `.desktop` 檔案放在你的 Flutter 專案中的 `<project root>/snap/gui/super-cool-app.desktop` 目錄下。

**注意**：icon 與 .desktop 檔案名稱必須與你在 yaml 檔案中設定的應用程式名稱相同！

例如：

```yaml
[Desktop Entry]
Name=Super Cool App
Comment=Super Cool App that does everything
Exec=super-cool-app
Icon=${SNAP}/meta/gui/super-cool-app.png # Replace name with your app name.
Terminal=false
Type=Application
Categories=Education; # Adjust accordingly your snap category.
```

請將副檔名為 .png 的圖示放在你的 Flutter 專案中的 `<project root>/snap/gui/super-cool-app.png` 目錄下。


## 建置 snap 套件

當 `snapcraft.yaml` 檔案完成後，
請在專案根目錄下執行 `snapcraft` 指令。

若要使用 Multipass VM 後端：

```console
$ snapcraft
```

要使用 LXD 容器後端：

```console
$ snapcraft --use-lxd
```

## 測試 snap

當 snap 建置完成後，你會在專案根目錄下看到一個 `<name>.snap` 檔案。

$ sudo snap install ./super-cool-app_0.1.0_amd64.snap --dangerous

## 發佈

你現在可以發佈這個 snap 了。
發佈流程包含以下步驟：

1. 如果你尚未註冊，請先到 [snapcraft.io][snapcraft.io] 建立開發者帳號。
1. 註冊應用程式名稱。你可以透過 Snap Store 的網頁管理介面註冊，或是使用命令列如下操作：
   ```console
   $ snapcraft login
   $ snapcraft register
   ```
1. 發佈應用程式。在閱讀下一節以了解如何選擇 Snap Store 頻道後，將 snap 推送到商店：
   ```console
   $ snapcraft upload --release=<channel> <file>.snap
   ```

### Snap Store 頻道（channels）

Snap Store 使用頻道（channels）來區分不同版本的 snap。

`snapcraft upload` 指令會將 snap 檔案上傳到
Snap Store。然而，在執行此指令之前，
你需要先了解不同的發佈頻道。每個頻道由三個組成部分構成：

**Track**
: 所有 snap 都必須有一個預設的 track，稱為 latest。
  除非另有指定，否則會使用這個預設 track。

**Risk**
: 定義應用程式的穩定程度。
  Snap Store 使用的風險等級包括：
  `stable`、`candidate`、`beta` 和 `edge`。

**Branch**
: 允許建立短期存在的 snap
  分支，用於測試 bug 修復。

### Snap Store 自動審查

Snap Store 會對你的 snap 進行多項自動化檢查。
根據 snap 的建置方式，以及是否有特定的安全性疑慮，
也可能會進行人工審查。如果所有檢查都順利通過，
你的 snap 就會在商店中上架。

## 其他 snapcraft 資源

你可以從 [snapcraft.io][snapcraft.io] 網站上的以下連結，
學習更多相關資訊：

* [Channels][]
* [Environment variables][]
* [Interface management][]
* [Parts environment variables][]
* [Releasing to the Snap Store][]
* [Snapcraft extensions][]
* [Supported plugins][]

## 其他部署資源

### [fastforge][]

> 一款全方位的 Flutter 應用程式打包與發佈工具，
為你提供一站式解決方案，滿足各種發佈需求。

支援多種主流打包格式，如 appimage、deb、pacman、rpm 等。

### [flatpak-flutter][]

> 用於離線建置 Flutter 應用程式的 Flatpak manifest 工具。

支援 Flatpak 準備，可用於發佈到 [Flathub][]。


[Environment variables]: https://snapcraft.io/docs/environment-variables
[Flutter wiki]: https://github.com/flutter/flutter/tree/main/docs
[Interface management]: https://snapcraft.io/docs/interface-management
[DBus interface]: https://snapcraft.io/docs/dbus-interface
[Introduction to snapcraft]: https://snapcraft.io/blog/introduction-to-snapcraft
[LXD container manager]: https://linuxcontainers.org/lxd/downloads/
[Multipass virtualization manager]: https://multipass.run/
[Parts environment variables]: https://snapcraft.io/docs/parts-environment-variables
[Releasing to the Snap Store]: https://snapcraft.io/docs/releasing-to-the-snap-store
[Channels]: https://docs.snapcraft.io/channels
[snap]: https://snapcraft.io/store
[Snap documentation]: https://snapcraft.io/docs
[Snapcraft]: https://snapcraft.io/snapcraft
[snapcraft.io]: https://snapcraft.io/
[Snapcraft extensions]: https://snapcraft.io/docs/snapcraft-extensions
[Supported plugins]: https://snapcraft.io/docs/supported-plugins
[Ubuntu]: https://ubuntu.com/download/desktop
[fastforge]: https://github.com/fastforgedev/fastforge
[flatpak-flutter]: https://github.com/TheAppgineer/flatpak-flutter
[Flathub]: https://flathub.org

