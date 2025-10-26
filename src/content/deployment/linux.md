---
title: 將 Linux 應用程式建置並發佈到 Snap Store
description: 如何準備並將 Linux 應用程式發佈到 Snap Store。
shortTitle: Linux
---

在一般的開發週期中，
你可以在命令列介面 (Command Line Interface) 使用 `flutter run` 指令來測試應用程式，
或是在你的 IDE 中使用 **Run** 和 **Debug**
選項來執行。預設情況下，
Flutter 會建置應用程式的 _debug_ 版本。

當你準備好要建立應用程式的 _release_ 版本時，
例如要[發佈到 Snap Store][snap] 或
[其他通道](#其他部署資源)，
本頁將提供協助。

## 先決條件

要建置並發佈到 Snap Store，你需要以下元件：

* [Ubuntu][Ubuntu] 作業系統，18.04 LTS（或更高版本）
* [Snapcraft][Snapcraft] 命令列工具
* [LXD 容器管理器][LXD container manager]

## 設定建置環境

請依照下列指示來設定你的建置環境。

### 安裝 snapcraft

在命令列介面 (Command Line Interface) 輸入以下指令：

```console
$ sudo snap install snapcraft --classic
```

### 安裝 LXD

要安裝 LXD，請使用以下指令：

```console
$ sudo snap install lxd
```

在 snap 建置過程中需要安裝 LXD。
安裝完成後，還需要對 LXD 進行設定以供使用。
大多數情境下，預設選項已經適用。

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

## snapcraft 概覽

`snapcraft` 工具會根據 `snapcraft.yaml` 檔案中所列的指令來建構 snap 套件。
若您想要對 snapcraft 及其核心概念有基本認識，請參閱 [Snap 文件][Snap documentation] 以及 [snapcraft 入門][Introduction to snapcraft]。
本頁底部也列出了更多相關連結與資訊。

## Flutter snapcraft.yaml 範例

請將 YAML 檔案放在您的 Flutter 專案中的 `<project root>/snap/snapcraft.yaml` 目錄下。
（請注意，YAML 檔案對於空白字元非常敏感！）
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

`snapcraft.yaml` 檔案中的這個區段用來定義並描述應用程式。snap 版本會從 build 區段中取得（採用）。

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!
```

### 等級（Grade）、限制（confinement）與基底（base）

本節說明如何建構 snap。

```yaml
confinement: strict
base: core22
grade: stable
```

**Grade（等級）**
：指定 snap 的品質，這一設定會在後續的發佈步驟中發揮作用。

**Confinement（限制）**
：指定 snap 安裝到最終用戶系統後可存取的系統資源範圍。嚴格限制（strict confinement）會將應用程式的存取權限限制在特定資源（由 `app` 區段中的 plugs 定義）。

**Base（基礎）**
：Snap 設計為自包含的應用程式，因此需要專屬的核心根檔案系統，稱為 `base`。`base` 關鍵字用於指定所採用的版本，該版本提供最小集的通用函式庫，並在執行時作為應用程式的根檔案系統掛載。

### Apps（應用程式）

本區段定義 snap 內包含的應用程式。一個 snap 可以包含一個或多個應用程式。本範例僅包含一個應用程式——super_cool_app。 

```yaml
apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome]
```

**Command**
: 指向可執行檔（binary），其路徑是相對於 snap 根目錄的，並會在 snap 被呼叫時執行。

**Extensions**
: 一個或多個 extension（擴充套件）的清單。Snapcraft extensions 是可重複使用的元件，能在建置與執行期間，將一組函式庫與工具提供給 snap，開發者無需具體了解所包含的 framework。`gnome` extension 會將 GTK 3 函式庫暴露給 Flutter snap。這可確保更小的體積並與系統更好整合。

**Plugs**
: 一個或多個系統介面 plug 的清單。當 snaps 處於嚴格隔離（strictly confined）時，這些 plug 是提供必要功能所需。本 Flutter snap 需要存取網路。

**DBus interface**
: [DBus interface][DBus interface] 提供 snaps 透過 DBus 進行溝通的方式。提供 DBus 服務的 snap 需要宣告一個 slot，指定知名的 DBus 名稱以及所使用的 bus。想要與該服務溝通的 snaps 則需為該提供服務的 snap 宣告 plug。請注意，若要讓你的 snap 能夠透過 snap store 發佈並取得這個知名的 DBus 名稱，需要進行 snap 宣告（只需將 snap 上傳至 store，並申請人工審查，審查員會協助處理）。

當提供服務的 snap 被安裝時，snapd 會產生安全性政策，允許其在指定的 bus 上監聽該知名的 DBus 名稱。如果指定的是 system bus，snapd 也會產生 DBus bus 政策，允許 'root' 擁有該名稱，且任何使用者都能與該服務溝通。非 snap 的程序可依傳統權限檢查與該提供服務的 snap 溝通。其他（消費端）snaps 只能透過連接 snaps 的介面，與該提供服務的 snap 進行溝通。
  
```plaintext
dbus-super-cool-app: # adjust accordingly to your app name
  interface: dbus
  bus: session
  name: dev.site.super_cool_app 
```

### Parts

本節說明組裝 snap 所需的來源（parts）。

Parts 可以透過外掛（plugins）自動下載與建置。類似於 extensions，snapcraft 可以使用各種外掛（如 Python、C、Java 和 Ruby）來協助建置流程。Snapcraft 也提供了一些特殊的外掛。

**nil** 外掛  
: 不執行任何動作，實際的建置流程需透過手動覆寫來處理。

**flutter** 外掛  
: 提供必要的 Flutter SDK 工具，讓你無需手動下載與設定建置工具即可使用。

```yaml
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```


## Desktop 檔案與圖示

Desktop entry 檔案用於將應用程式新增到桌面選單。這些檔案會指定您的應用程式名稱與圖示、所屬分類、相關搜尋關鍵字等資訊。這些檔案的副檔名為 `.desktop`，並遵循 XDG Desktop Entry Specification 1.1 版規範。

### Flutter super-cool-app.desktop 範例

請將 `.desktop` 檔案放置於您的 Flutter 專案中的 `<project root>/snap/gui/super-cool-app.desktop` 目錄下。

**注意**：icon 與 `.desktop` 檔案名稱必須與您在 yaml 檔案中的 app 名稱相同！

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

請將您的圖示（副檔名為 .png）放置於 Flutter 專案的`<project root>/snap/gui/super-cool-app.png`目錄下。

## 建立 snap

完成`snapcraft.yaml`檔案後，請在專案根目錄下執行`snapcraft`。

若要使用 Multipass VM 後端：

```console
$ snapcraft
``` 

要使用 LXD container backend（LXD 容器後端）：

```console
$ snapcraft --use-lxd
```

## 測試 snap

當 snap 建置完成後，你會在專案根目錄下看到一個 `<name>.snap` 檔案。

```bash
$ sudo snap install ./super-cool-app_0.1.0_amd64.snap --dangerous
```

## 發佈

你現在可以發佈這個 snap 了。
發佈流程包含以下步驟：

1. 前往 [snapcraft.io][snapcraft.io] 建立開發者帳號（如果你還沒有的話）。
2. 註冊應用程式名稱。你可以透過 Snap Store 的 Web UI 入口網站註冊，或是在命令列執行以下指令來註冊：
   ```console
   $ snapcraft login
   $ snapcraft register
   ```
1. 發佈應用程式。請先閱讀下一節，了解如何選擇 Snap Store 頻道，然後將 snap 推送到商店：
   ```console
   $ snapcraft upload --release=<channel> <file>.snap
   ```

### Snap Store 通道

Snap Store 使用通道（channels）來區分不同版本的 snap 套件。

`snapcraft upload` 指令會將 snap 檔案上傳到商店。不過，在執行這個指令之前，你需要先了解不同的發佈通道。每個通道包含三個組成部分：

**Track**
: 所有 snap 都必須有一個預設的 track，稱為 latest。除非另有指定，否則預設使用此 track。

**Risk**
: 定義應用程式的穩定性與成熟度。Snap Store 中的風險等級包括：`stable`、`candidate`、`beta` 和 `edge`。

**Branch**
: 允許建立短期存在的 snap 分支，用於測試錯誤修正。

### Snap Store 自動審查

Snap Store 會對你的 snap 套件執行多項自動化檢查。根據 snap 的建置方式，以及是否有特定的安全性疑慮，也有可能進行人工審查。如果所有檢查皆通過且無錯誤，該 snap 就會在商店中上架。

## 其他 snapcraft 資源

你可以從 [snapcraft.io][snapcraft.io] 網站上的以下連結進一步了解：

* [通道（Channels）][Channels]
* [環境變數（Environment variables）][Environment variables]
* [介面管理（Interface management）][Interface management]
* [Parts 環境變數][Parts environment variables]
* [發佈至 Snap Store][Releasing to the Snap Store]
* [Snapcraft 擴充功能（extensions）][Snapcraft extensions]
* [支援的外掛（Supported plugins）][Supported plugins]

## 其他部署資源

### [fastforge][fastforge]

> 一款全方位的 Flutter 應用程式打包與發佈工具，為你提供一站式解決方案，滿足多元發佈需求。

支援多種主流打包格式，例如 appimage、deb、pacman、rpm 等。

### [flatpak-flutter][flatpak-flutter]

> 用於離線建構 Flutter 應用程式的 Flatpak manifest 工具。

支援 Flatpak 準備作業，可發佈至 [Flathub][Flathub]。


[Environment variables]: https://snapcraft.io/docs/environment-variables
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
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
[fastforge]: {{site.github}}/fastforgedev/fastforge
[flatpak-flutter]: {{site.github}}/TheAppgineer/flatpak-flutter
[Flathub]: https://flathub.org
