---
title: 使用 Flutter 建置 Linux 應用程式
description: 使用 Flutter 為 Linux 建置時需注意的平台專屬事項。
shortTitle: Linux 開發
---

本頁說明使用 Flutter 建置 Linux 應用程式時的專屬考量，包括 Shell 整合，以及應用程式發佈前的準備事項。

## 與 Linux 整合

Linux 的程式設計介面（API），包含函式庫函式與系統呼叫，是以 C 語言及其 ABI 為核心設計。幸運的是，Dart 提供了 `dart:ffi` 套件，讓 Dart 程式能夠呼叫 C 函式庫。

Foreign Function Interfaces（FFI，外部函式介面）讓 Flutter 應用程式能夠與原生函式庫進行以下操作：

* 使用 `malloc` 或 `calloc` 配置原生記憶體
* 支援指標（pointers）、結構（structs）與回呼（callbacks）
* 支援如 `long` 和 `size_t` 等 Application Binary Interface（ABI）型別

如需進一步瞭解如何從 Flutter 呼叫 C 函式庫，請參閱 [使用 `dart:ffi` 進行 C 語言互操作][C interop using `dart:ffi`]。

許多應用程式會受益於使用將底層函式庫呼叫包裝成更便利、符合 Dart 慣用寫法 API 的套件。[Canonical 已經開發了一系列套件][Canonical]，專注於讓 Dart 與 Flutter 能夠在 Linux 上運作，內容涵蓋桌面通知、dbus、網路管理與藍牙等支援。

一般來說，還有許多[支援建立 Linux 應用程式的套件][support-linux]，其中包含常見的 [`url_launcher`]、[`shared_preferences`]、[`file_selector`] 與 [`path_provider`] 等套件。

[C interop using `dart:ffi`]: {{site.dart-site}}/guides/libraries/c-interop
[Canonical]: {{site.pub}}/publishers/canonical.com/packages
[support-linux]: {{site.pub}}/packages?q=platform%3Alinux
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`file_selector`]: {{site.pub-pkg}}/file_selector
[`path_provider`]: {{site.pub-pkg}}/path_provider

## 為 Linux 應用程式發佈做準備

可執行檔會位於專案中的 `build/linux/x64/<build mode>/bundle/`。
在 `bundle` 目錄下，除了可執行檔之外，還會有兩個目錄：

* `lib`：包含必要的 `.so` 函式庫檔案
* `data`：包含應用程式的資料資源，例如字型或圖片

除了這些檔案外，您的應用程式也會依賴多個作業系統函式庫，這些函式庫是在編譯時連結的。若要查看完整的函式庫清單，可以在應用程式目錄下使用 `ldd` 指令。

舉例來說，假設您有一個 Flutter 桌面應用程式，名稱為 `linux_desktop_test`。
若要檢查其系統函式庫相依性，可使用以下指令：

```console
$ flutter build linux --release
$ ldd build/linux/x64/release/bundle/linux_desktop_test
```

要將此應用程式打包發佈，
請包含 `bundle` 目錄中的所有內容，
並確認目標 Linux 系統已安裝所有必要的系統函式庫。

這通常只需要執行以下指令即可。

```console
$ sudo apt-get install libgtk-3-0 libblkid1 liblzma5
```

若要瞭解如何將 Linux 應用程式發佈到 [Snap Store]，請參閱[Build and release a Linux application to the Snap Store][Build and release a Linux application to the Snap Store]。

## 其他資源

若要瞭解如何為您的 Flutter 桌面應用程式建立 Linux Debian（`.deb`）與 RPM（`.rpm`）版本，請參考逐步說明的 [Linux packaging guide][linux_packaging_guide]。

[Snap Store]: https://snapcraft.io/store
[Build and release a Linux application to the Snap Store]: /deployment/linux
[linux_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-3-linux-24ef8d30a5b4
