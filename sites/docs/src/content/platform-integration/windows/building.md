---
title: 使用 Flutter 建置 Windows 應用程式
description: 使用 Flutter 為 Windows 建置應用程式時的特定平台注意事項。
shortTitle: Windows 開發
---

本頁討論使用 Flutter 建置 Windows 應用程式時的獨特考量，包括 Shell 整合以及透過 Microsoft Store 在 Windows 上發佈 Windows 應用程式。

## 與 Windows 整合

Windows 的程式設計介面結合了傳統的 Win32 API、COM 介面以及較現代的 Windows Runtime 函式庫。由於這些介面都提供 C 語言為基礎的 ABI，你可以透過 Dart 的 Foreign Function Interface 函式庫（`dart:ffi`）呼叫作業系統所提供的服務。FFI 的設計目的是讓 Dart 程式能有效率地呼叫 C 函式庫。它讓 Flutter 應用程式能夠使用 `malloc` 或 `calloc` 配置原生記憶體，支援指標、結構（structs）與回呼（callbacks），以及像 `long` 和 `size_t` 這樣的 ABI 類型。

若需更多關於從 Flutter 呼叫 C 函式庫的資訊，請參閱 [C interop using `dart:ffi`]。
若要將你自己的原生 C 或 C++ 程式碼與應用程式打包並繫結，請參閱 [Bind to native code using FFI][]。

實際上，雖然用 Dart 以這種方式呼叫基本的 Win32 API 相對簡單，但使用包裝函式庫來抽象化 COM 程式設計模型的複雜性會更容易。[win32 package] 提供了一個函式庫，讓你能夠存取數千個常見的 Windows API，並使用 Microsoft 提供的中繼資料來確保一致性與正確性。該套件也包含了各種常見使用情境的範例，例如 WMI、磁碟管理、Shell 整合與系統對話框等。

有許多其他套件是建立在這個基礎之上，為 [Windows registry]、[gamepad support]、[biometric storage]、[taskbar integration] 以及 [serial port access] 等提供符合 Dart 習慣用法的存取方式。

更廣泛來說，還有許多 [packages support Windows]，包含常見的套件如 [`url_launcher`]、[`shared_preferences`]、[`file_selector`] 和 [`path_provider`]。

[C interop using `dart:ffi`]: {{site.dart-site}}/guides/libraries/c-interop
[Bind to native code using FFI]: /platform-integration/bind-native-code
[win32 package]: {{site.pub}}/packages/win32
[Windows registry]: {{site.pub}}/packages/win32_registry
[gamepad support]: {{site.pub}}/packages/win32_gamepad
[biometric storage]: {{site.pub}}/packages/biometric_storage
[taskbar integration]: {{site.pub-pkg}}/windows_taskbar
[serial port access]: {{site.pub}}/packages/serial_port_win32
[packages support Windows]: {{site.pub}}/packages?q=platform%3Awindows
[`url_launcher`]: {{site.pub-pkg}}/url_launcher
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`file_selector`]: {{site.pub-pkg}}/file_selector
[`path_provider`]: {{site.pub-pkg}}/path_provider

## 支援 Windows UI 指引

你可以選擇任何視覺風格或主題（包括 Material），但有些應用程式開發者可能希望打造符合 Microsoft [Fluent design system][Fluent design system] 慣例的應用程式。[fluent_ui][fluent_ui] 套件（也是 [Flutter Favorite][Flutter Favorite]）提供了現代 Windows 應用程式常見的視覺效果與控制項支援，包括導覽檢視、內容對話框、彈出視窗（flyouts）、日期選擇器與樹狀檢視元件 (Widget) 等。

此外，Microsoft 提供了 [fluentui_system_icons][fluentui_system_icons] 套件，讓你能夠輕鬆在 Flutter 應用程式中使用數千個 Fluent 圖示。

最後，[bitsdojo_window][bitsdojo_window] 套件支援「自繪（owner draw）」標題列，讓你可以將標準 Windows 標題列替換為符合應用程式整體風格的自訂標題列。

[Fluent design system]: https://docs.microsoft.com/en-us/windows/apps/design/
[fluent_ui]: {{site.pub}}/packages/fluent_ui
[Flutter Favorite]: /packages-and-plugins/favorites
[fluentui_system_icons]: {{site.pub}}/packages/fluentui_system_icons
[bitsdojo_window]: {{site.pub}}/packages/bitsdojo_window

## 自訂 Windows 主機應用程式

當你建立 Windows 應用程式時，Flutter 會產生一個小型的 C++ 應用程式來作為 Flutter 的主機。這個「runner app」負責建立與調整傳統 Win32 視窗的大小、初始化 Flutter 引擎與任何原生插件，並執行 Windows 訊息迴圈（將相關訊息傳遞給 Flutter 進一步處理）。

你當然可以根據需求修改這段程式碼，包括變更應用程式名稱與圖示，以及設定視窗的初始大小與位置。相關程式碼位於 main.cpp，你會看到類似以下的程式碼：

```cpp
Win32Window::Point origin(10, 10);
Win32Window::Size size(1280, 720);
if (!window.CreateAndShow(L"myapp", origin, size))
{
    return EXIT_FAILURE;
}
```

將 `myapp` 替換為你希望在 Windows 標題列顯示的標題，同時你也可以選擇性地調整視窗的尺寸與座標位置。

若要更換 Windows 應用程式圖示，請將 `windows\runner\resources` 目錄下的 `app_icon.ico` 檔案替換為你想要的圖示檔案。

你可以透過編輯 `windows/CMakeLists.txt` 中的 `BINARY_NAME` 變數，來變更產生的 Windows 執行檔名稱：

```cmake
cmake_minimum_required(VERSION 3.14)
project(windows_desktop_app LANGUAGES CXX)

# The name of the executable created for the application.
# Change this to change the on-disk name of your application.
set(BINARY_NAME "YourNewApp")

cmake_policy(SET CMP0063 NEW)
```

當你執行 `flutter build windows` 時，
在 `build\windows\runner\Release` 目錄下所產生的可執行檔
將會符合你新指定的名稱。

最後，應用程式可執行檔本身的進階屬性
可以在 `windows\runner` 目錄下的 `Runner.rc` 檔案中找到。
你可以在這裡修改
Windows 應用程式內嵌的版權資訊與應用程式版本，
這些資訊會顯示於 Windows 檔案總管的屬性對話框中。
若要變更版本號碼，請編輯 `VERSION_AS_NUMBER`
與 `VERSION_AS_STRING` 屬性；
其他資訊則可以在 `StringFileInfo` 區塊中編輯。

## 使用 Visual Studio 編譯

對於大多數應用程式而言，讓 Flutter
透過 `flutter run` 與 `flutter build` 指令自動處理編譯流程已經足夠。
但如果你對 runner app 做了重大修改，或是要將 Flutter 整合進既有應用程式，
你可能會希望直接在 Visual Studio 中載入或編譯 Flutter 應用程式。

請依照以下步驟操作：

1. 執行 `flutter build windows` 以建立 `build\` 目錄。

1. 開啟 Windows runner 的 Visual Studio 解決方案檔案，
   現在可以在 `build\windows` 目錄中找到，
   檔名會依照父層 Flutter 應用程式命名。

1. 在 Solution Explorer 中，你會看到多個專案。
   右鍵點擊與 Flutter 應用程式同名的專案，
   並選擇 **Set as Startup Project**（設為啟動專案）。

1. 為了產生必要的相依性，
   執行 **Build** > **Build Solution**（建置方案）

   你也可以按下/
   <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>。

   若要從 Visual Studio 執行 Windows 應用程式，請前往 **Debug** > **Start Debugging**（開始偵錯）。

   你也可以按下 <kbd>F5</kbd>。

1. 使用工具列切換 Debug 與 Release
   組態，以符合需求。

## 發佈 Windows 應用程式

你可以採用多種方式來
發佈你的 Windows 應用程式。
以下是幾個選項：

* 使用工具建立 MSIX 安裝程式
  （詳見下一節），
  並透過 Microsoft Windows App Store 發佈。
  此選項不需要你手動建立簽章
  憑證，系統會自動處理。
* 建立 MSIX 安裝程式，並透過你自己的網站發佈。
  若採用此方式，你需要為應用程式
  提供數位簽章，格式為
  `.pfx` 憑證。
* 收集所有必要檔案，
  並自行建立 zip 壓縮檔。

### MSIX 打包

[MSIX][MSIX] 是全新的 Windows 應用程式封裝格式，
提供現代化的打包格式與安裝程式。
你可以利用這個格式將應用程式
發佈到 Windows 的 Microsoft Store，或是
直接分發應用程式安裝檔。

對於 Flutter 專案來說，建立 MSIX 發佈檔最簡單的方法是使用
[`msix` pub 套件][msix package]。
若要參考如何從 Flutter 桌面應用程式
使用 `msix` 套件的範例，
請參考 [Desktop Photo Search][Desktop Photo Search] 範例。

[MSIX]: https://docs.microsoft.com/en-us/windows/msix/overview
[msix package]: {{site.pub}}/packages/msix
[Desktop Photo Search]: {{site.repo.samples}}/tree/main/desktop_photo_search

#### 為本地測試建立自簽 .pfx 憑證

若要利用 MSIX 安裝程式進行私有部署與測試，
你需要為應用程式提供
數位簽章，格式為 `.pfx` 憑證。

若要透過 Windows Store 發佈，
則不需要產生 `.pfx` 憑證。
Windows Store 會自動為
透過其商店發佈的應用程式建立與管理憑證。

如果你選擇自行在網站上發佈應用程式，
則必須使用 Windows 認可的
憑證授權機構（CA）簽署的憑證。

請依照下列指示產生
自簽的 `.pfx` 憑證。

1. 如果尚未安裝，請下載 [OpenSSL][OpenSSL]
   工具組來產生你的憑證。
1. 前往你安裝 OpenSSL 的位置，例如
   `C:\Program Files\OpenSSL-Win64\bin`。
1. 設定環境變數，讓你可以在任何地方
   存取 `OpenSSL`：<br>
   `"C:\Program Files\OpenSSL-Win64\bin"`
1. 產生私鑰，指令如下：<br>
   `openssl genrsa -out mykeyname.key 2048`
1. 使用私鑰產生憑證簽署請求（CSR）檔案：<br>
   `openssl req -new -key mykeyname.key -out mycsrname.csr`
1. 使用私鑰與 CSR 檔案產生已簽署的憑證（CRT）檔案：<br>
   `openssl x509 -in mycsrname.csr -out mycrtname.crt -req -signkey mykeyname.key -days 10000`
1. 使用私鑰與 CRT 檔案產生 `.pfx` 檔案：<br>
   `openssl pkcs12 -export -out CERTIFICATE.pfx -inkey mykeyname.key -in mycrtname.crt`
1. 在安裝應用程式前，請先將 `.pfx` 憑證安裝到本機
   的 `Certificate store`，
   以 `Trusted Root Certification Authorities`
   方式安裝。

[OpenSSL]: https://slproweb.com/products/Win32OpenSSL.html

### 為 Windows 建立自訂 zip 壓縮檔

Flutter 可執行檔 `.exe` 可在你的專案
`build\windows\runner\<build mode>\` 目錄下找到。
除了該可執行檔之外，你還需要以下檔案：

* 來自同一目錄：
  * 所有 `.dll` 檔案
  * `data` 目錄
* Visual C++ 可轉散發套件（redistributables）。
  你可以參考 Microsoft 官方網站上的
  [部署範例教學][deployment example walkthroughs] 中的任一方法，
  以確保最終使用者擁有 C++ 可轉散發套件。
  如果你使用 `application-local` 選項，則需要複製：
  * `msvcp140.dll`
  * `vcruntime140.dll`
  * `vcruntime140_1.dll`

  請將這些 DLL 檔案放在與可執行檔及其他 DLL 相同的目錄下，
  並一併打包成 zip 壓縮檔。
  最終的目錄結構大致如下所示：

  ```plaintext
  Release
  │   flutter_windows.dll
  │   msvcp140.dll
  │   my_app.exe
  │   vcruntime140.dll
  │   vcruntime140_1.dll
  │
  └───data
  │   │   app.so
  │   │   icudtl.dat

  ...
  ```

此時，如果需要，將這個資料夾加入 Windows 安裝程式（例如 Inno Setup、WiX 等）會相對簡單。

## 其他資源

若想瞭解如何使用 Inno Setup 建立 `.exe`，以便發佈你的 Flutter 桌面應用程式（Windows 版本），請參考逐步說明的 [Windows packaging guide][windows_packaging_guide]。

[deployment example walkthroughs]: https://docs.microsoft.com/en-us/cpp/windows/deployment-examples
[windows_packaging_guide]: https://medium.com/@fluttergems/packaging-and-distributing-flutter-desktop-apps-the-missing-guide-part-2-windows-0b468d5e9e70
