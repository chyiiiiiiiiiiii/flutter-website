---
title: 使用 Flutter 建置 Linux 應用程式
description: 使用 Flutter 為 Linux 建置應用程式時的平臺專屬注意事項。
shortTitle: Linux 開發
---

本頁說明使用 Flutter 建置 Linux 應用程式時的專屬考量，包括 Shell 整合以及應用程式發佈前的準備事項。

## 與 Linux 整合

Linux 的程式設計介面（包括函式庫函數與系統呼叫）是以 C 語言及其 ABI 為基礎設計的。所幸，Dart 提供了 `dart:ffi` 套件，使 Dart 程式能夠呼叫 C 函式庫。

Foreign Function Interfaces（FFI，外部函式介面）讓 Flutter 應用程式能夠對原生函式庫執行以下操作：

* 使用 `malloc` 或 `calloc` 配置原生記憶體
* 支援指標、結構體與回呼（callback）
* 支援如 `long` 與 `size_t` 等 Application Binary Interface（ABI）型別

如需進一步瞭解如何從 Flutter 呼叫 C 函式庫，請參考 [使用 `dart:ffi` 進行 C 互操作][C interop using `dart:ffi`]。

許多應用程式受益於使用將底層函式庫呼叫包裝成更方便、符合 Dart 慣用寫法的 API 的套件。[Canonical 已經開發了一系列套件][Canonical]，專注於讓 Dart 與 Flutter 能在 Linux 上運作，包括桌面通知、dbus、網路管理及藍牙等支援。

一般來說，還有許多[支援建立 Linux 應用程式的套件][support-linux]，其中包含常用套件如 [`url_launcher`]、[`shared_preferences`]、[`file_selector`] 及 [`path_provider`]。

[C interop using `dart:ffi`]: {{site.dart-site}}/guides/libraries/c-interop
[Canonical]: {{site.pub}}/publishers/canonical.com/packages
[support-linux]: {{site.pub}}/packages?q=platform%3Alinux
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`file_selector`]: {{site.pub-pkg}}/file_selector
[`path_provider`]: {{site.pub-pkg}}/path_provider

## 為 Linux 應用程式發佈做準備

可執行的二進位檔案會位於你的專案目錄下的 `build/linux/x64/<build mode>/bundle/`。
在 `bundle` 目錄下，除了可執行檔之外，還會有兩個目錄：

* `lib` 包含必要的 `.so` 函式庫檔案
* `data` 則包含應用程式的資料資源，例如字型或圖片

除了這些檔案之外，你的應用程式還會依賴多個作業系統函式庫，這些函式庫是在編譯時連結的。若要查看完整的函式庫清單，可以在應用程式目錄下使用 `ldd` 指令。

舉例來說，假設你有一個名為 `linux_desktop_test` 的 Flutter 桌面應用程式。
若要檢查其系統函式庫相依性，可以使用下列指令：

```console
$ flutter build linux --release
$ ldd build/linux/x64/release/bundle/linux_desktop_test
```

要將此應用程式打包發行，
請包含 `bundle` 目錄中的所有內容，
並確認目標 Linux 系統已具備所有必要的系統函式庫。

這通常只需要執行以下指令即可。

```console
$ sudo apt-get install libgtk-3-0 libblkid1 liblzma5
```

若要瞭解如何將 Linux 應用程式發佈到 [Snap Store]，
請參考[將 Linux 應用程式建置並發佈到 Snap Store][Build and release a Linux application to the Snap Store]。

## 其他資源

若要瞭解如何為你的 Flutter 桌面應用程式建立 Linux Debian（`.deb`）與 RPM（`.rpm`）建置檔，
請參考逐步說明的 [Linux 打包指南][linux_packaging_guide]。

[Snap Store]: https://snapcraft.io/store
[Build and release a Linux application to the Snap Store]: /deployment/linux
[linux_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-3-linux-24ef8d30a5b4
