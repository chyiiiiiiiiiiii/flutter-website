---
title: 使用舊版 FFI 插件範本繫結至原生程式碼
description: >-
  使用舊版 plugin_ffi 範本及 dart:ffi，在 Flutter 插件或應用程式中
  繫結至原生 C 程式碼。
---

:::warning
本頁說明舊版 `plugin_ffi` C 互通 (C interop) 方式。

自 Flutter 3.38 起，我們建議改用搭配 [build hooks][] 的 `package_ffi` 範本來進行 C 互通。

不過，此處說明的舊版 FFI 插件範本（`plugin_ffi`）在以下情況仍然適用：

- 需要存取 Flutter Plugin API。
- 需要使用靜態連結（iOS 及 macOS）。
- 需要在 Android 上設定 Google Play services 執行階段。
:::

Flutter 行動端與桌面端應用程式可使用 [`dart:ffi`][] 函式庫呼叫原生 C API。
_FFI_ 代表[外部函式介面 (_foreign function interface_)][FFI]。
類似功能的其他術語包括
_native interface_ 及 _language bindings_。

[build hooks]: /platform-integration/bind-native-code
[`dart:ffi`]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

在函式庫或程式使用 FFI 函式庫繫結至原生程式碼之前，
你必須確保原生程式碼已載入，且其符號 (symbols) 對 Dart 是可見的。
本頁著重於在 Flutter 插件或應用程式中編譯、封裝及載入原生程式碼。

本教學示範如何在 Flutter 插件中打包 C/C++ 原始碼，
並使用 Dart FFI 函式庫繫結至這些原始碼。
在本逐步說明中，你將建立一個實作 32 位元加法的 C 函式，
然後透過名為 `native_add` 的 Dart 插件將其對外公開。

## 動態連結與靜態連結 {:#dynamic-versus-static-linking}

原生函式庫可以動態或靜態方式連結至應用程式。
靜態連結函式庫會嵌入至應用程式的可執行映像中，
並於應用程式啟動時載入。

靜態連結函式庫的符號可使用
[`DynamicLibrary.executable`][] 或
[`DynamicLibrary.process`][] 載入。

相對地，動態連結函式庫會以獨立檔案或資料夾的形式
散布於應用程式中，並依需求載入。散布格式依平台而異：

- 在 Android 上，動態連結函式庫以一組 `.so`（ELF）檔案的形式散布，
  每種架構各一個檔案。僅支援動態函式庫，
  因為主執行檔為 JVM，Flutter 不會靜態連結至 JVM。
- 在 iOS 及 macOS 上，動態連結函式庫以 `.framework` 資料夾形式散布。

動態連結函式庫可使用 [`DynamicLibrary.open`][] 載入至 Dart 中。

[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

## 建立 FFI 插件 {:#create-an-ffi-plugin}

若要建立名為 `native_add` 的 FFI 插件，
請使用 `flutter create` 搭配 `plugin_ffi` 範本：

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
```

:::note
你可以從 `--platforms` 中排除不需要建置的平台。
但你必須包含測試裝置所在的平台。
:::

這會在 `native_add/src` 中建立含有 C/C++ 原始碼的插件。
這些原始碼由各作業系統建置資料夾中的原生建置檔案負責建置。

FFI 函式庫只能繫結至 C 符號，
因此在 C++ 中這些符號需標記為 `extern "C"`。

你還應加入屬性，以表明這些符號由 Dart 參照，
防止連結器在連結時期最佳化過程中捨棄這些符號：
`__attribute__((visibility("default"))) __attribute__((used))`。

各平台專屬的建置檔案負責連結程式碼：

- Android：`native_add/android/build.gradle`
- iOS：`native_add/ios/native_add.podspec`
- macOS：`native_add/macos/native_add.podspec`
- Linux：`native_add/linux/CMakeLists.txt`
- Windows：`native_add/windows/CMakeLists.txt`

原生程式碼在 Dart 中透過
`lib/native_add_bindings_generated.dart` 呼叫。

繫結由 [`package:ffigen`][] 產生。

[`package:ffigen`]: {{site.pub-pkg}}/ffigen

## 其他使用情境 {:#other-use-cases}

### iOS

動態連結器會在應用程式啟動時自動載入動態連結函式庫。
其組成符號可使用 [`DynamicLibrary.process`][] 解析。
你也可以使用 [`DynamicLibrary.open`][] 取得函式庫的控制代碼
以限制符號解析的範圍，但目前尚不清楚 Apple 審核流程如何處理此情況。

靜態連結至應用程式二進位檔的符號
可使用 [`DynamicLibrary.executable`][] 或 [`DynamicLibrary.process`][] 解析。

#### 平台函式庫 {:#ios-platform-library}

若要連結至平台函式庫，請依照以下步驟操作：

1.  在 Xcode 中，開啟 `Runner.xcworkspace`。
1.  選取目標平台。
1.  在 **Linked Frameworks and Libraries** 區段中按一下 **+**。
1.  選取要連結的系統函式庫。

#### 第一方函式庫 {:#ios-first-party-library}

第一方原生函式庫可以原始碼或（已簽署的）`.framework` 檔案形式加入。
靜態連結的封存檔可能也可以加入，但需要進一步測試。

#### 原始碼 {:#ios-source-code}

若要直接連結至原始碼，請依照以下步驟操作：

1.  在 Xcode 中，開啟 `Runner.xcworkspace`。
1.  將 C/C++/Objective-C/Swift
    原始碼檔案加入 Xcode 專案。
1.  在匯出的符號宣告前加入以下前綴，
    以確保其對 Dart 可見：

    **C/C++/Objective-C：**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift：**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### 已編譯（動態）函式庫 {:#ios-compiled-dynamic-library}

若要連結至已編譯的動態函式庫，請依照以下步驟操作：

1.  若已有正確簽署的 `Framework` 檔案，
    請開啟 `Runner.xcworkspace`。
1.  將 framework 檔案加入 Xcode 目標的
    **Frameworks, Libraries, and Embedded Content** 區段。
1.  在 **Embed** 欄位下，選取 **Embed & Sign**。

#### 開放原始碼第三方函式庫 {:#ios-open-source-third-party-library}

若要建立同時包含 C/C++/Objective-C _及_ Dart 程式碼的 Flutter 插件，
請依照以下步驟操作：

1.  在你的插件專案中，開啟 `ios/<myproject>.podspec`。
1.  將原生程式碼加入 `source_files` 欄位。

原生程式碼隨後會靜態連結至
任何使用此插件之應用程式的應用程式二進位檔中。

#### 閉源第三方函式庫 {:#ios-closed-source-third-party-library}

若要建立包含 Dart 原始碼但以二進位形式散布 C/C++ 函式庫的 Flutter 插件，
請依照以下步驟操作：

1.  在你的插件專案中，開啟 `ios/<myproject>.podspec`。
1.  加入 `vendored_frameworks` 欄位。
    請參閱 [CocoaPods 範例][CocoaPods example]。

:::warning
**請勿**將此插件
（或任何包含二進位程式碼的插件）上傳至 pub.dev。
此插件應從受信任的第三方下載，
如 CocoaPods 範例所示。
:::

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

#### 移除符號 {:#ios-stripping-symbols}

建立正式版建置時，Xcode 會移除符號。

1.  在 Xcode 中，選取 **Runner** 目標，
    然後前往 **Build Settings > Strip Style**。
1.  將設定從 **All Symbols** 改為 **Non-Global Symbols**。

### macOS

動態連結器會在應用程式啟動時自動載入動態連結函式庫。
其組成符號可使用 [`DynamicLibrary.process`][] 解析。
你也可以使用 [`DynamicLibrary.open`][] 取得函式庫的控制代碼
以限制符號解析的範圍，但目前尚不清楚 Apple 審核流程如何處理此情況。

靜態連結至應用程式二進位檔的符號
可使用 [`DynamicLibrary.executable`][] 或 [`DynamicLibrary.process`][] 解析。

#### 平台函式庫 {:#macos-platform-library}

若要連結至平台函式庫，請依照以下步驟操作：

1.  在 Xcode 中，開啟 `Runner.xcworkspace`。
1.  選取目標平台。
1.  在 **Linked Frameworks and Libraries** 區段中按一下 **+**。
1.  選取要連結的系統函式庫。

#### 第一方函式庫 {:#macos-first-party-library}

第一方原生函式庫可以原始碼或（已簽署的）`.framework` 檔案形式加入。
靜態連結的封存檔可能也可以加入，但需要進一步測試。

#### 原始碼 {:#macos-source-code}

若要直接連結至原始碼，請依照以下步驟操作：

1.  在 Xcode 中，開啟 `Runner.xcworkspace`。
1.  將 C/C++/Objective-C/Swift
    原始碼檔案加入 Xcode 專案。
1.  在匯出的符號宣告前加入以下前綴，
    以確保其對 Dart 可見：

    **C/C++/Objective-C：**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift：**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### 已編譯（動態）函式庫 {:#macos-compiled-dynamic-library}

若要連結至已編譯的動態函式庫，請依照以下步驟操作：

1.  若已有正確簽署的 `Framework` 檔案，
    請開啟 `Runner.xcworkspace`。
1.  將 framework 檔案加入 Xcode 目標的
    **Frameworks, Libraries, and Embedded Content** 區段。
1.  在 **Embed** 欄位下，選取 **Embed & Sign**。

#### 已編譯（動態）函式庫，閉源 {:#macos-compiled-dynamic-library-closed-source}

若要將閉源函式庫加入 [Flutter macOS Desktop][] 應用程式，
請依照以下步驟操作：

1.  依照 Flutter 桌面端說明建立 Flutter 桌面應用程式。
1.  在 Xcode 中開啟 `yourapp/macos/Runner.xcworkspace`。
    1.  將預先編譯的函式庫（`libyourlibrary.dylib`）
        拖曳至 `Runner/Frameworks`。
    1.  按一下 `Runner` 並前往 `Build Phases` 標籤頁。
        1.  將 `libyourlibrary.dylib` 拖曳至 `Copy Bundle Resources` 清單。
        1.  在 `Embed Libraries` 下勾選 `Code Sign on Copy`。
        1.  在 `Link Binary With Libraries` 下，
            將狀態設為 `Optional`。（我們使用動態連結，
            無需靜態連結。）
    1.  按一下 `Runner` 並前往 `General` 標籤頁。
        1.  將 `libyourlibrary.dylib` 拖曳至
            **Frameworks, Libraries, and Embedded Content** 清單。
        1.  選取 **Embed & Sign**。
    1.  按一下 **Runner** 並前往 **Build Settings** 標籤頁。
        1.  在 **Search Paths** 區段中，設定
            **Library Search Paths** 以包含
            `libyourlibrary.dylib` 所在的路徑。
1.  編輯 `lib/main.dart`。
    1.  使用 `DynamicLibrary.open('libyourlibrary.dylib')` 動態連結至符號。
    1.  在元件 (Widget) 中的某處呼叫你的原生函式。
1.  執行 `flutter run` 並確認你的原生函式已被呼叫。
1.  執行 `flutter build macos` 以建置
    可獨立運作的正式版應用程式。

[Flutter macOS Desktop]: /platform-integration/macos/building

#### 移除符號 {:#macos-stripping-symbols}

建立正式版建置時，Xcode 會移除符號。

1.  在 Xcode 中，選取 **Runner** 目標，
    然後前往 **Build Settings > Strip Style**。
1.  將設定從 **All Symbols** 改為 **Non-Global Symbols**。

### Android

#### 平台函式庫 {:#android-platform-library}

若要連結至平台函式庫，請依照以下步驟操作：

1.  在 Android 文件的 [Android NDK Native APIs][] 清單中
    找到所需的函式庫。此清單列出穩定的原生 API。
1.  使用 [`DynamicLibrary.open`][] 載入函式庫。
    例如，載入 OpenGL ES（v3）：

    ```dart
    DynamicLibrary.open('libGLES_v3.so');
    ```

若文件中有指示，你可能需要更新
應用程式或插件的 Android manifest 檔案。

[Android NDK Native APIs]: {{site.android-dev}}/ndk/guides/stable_apis

#### 第一方函式庫 {:#android-first-party-library}

在應用程式或插件中以原始碼或二進位形式加入原生程式碼的流程相同。

#### 開放原始碼第三方函式庫 {:#android-open-source-third-party-library}

依照 Android 文件中的[將 C 和 C++ 程式碼加入專案][Add C and C++ code to your project]
說明，加入原生程式碼並支援原生程式碼工具鏈（CMake 或 `ndk-build`）。

[Add C and C++ code to your project]: {{site.android-dev}}/studio/projects/add-native-code

#### 閉源第三方函式庫 {:#android-closed-source-third-party-library}

若要建立包含 Dart 原始碼但以二進位形式散布 C/C++ 函式庫的 Flutter 插件，
請依照以下步驟操作：

1.  開啟你專案的 `android/build.gradle` 檔案。
1.  將 AAR artifact 加入為相依套件。
    **請勿**將該 artifact 包含在你的 Flutter 套件中。
    它應從如 Maven Central 等儲存庫下載。

#### Android APK 大小（共用物件壓縮）

[Android 準則][Android guidelines]通常建議
以未壓縮方式散布原生共用物件，
因為這實際上可節省裝置儲存空間。
共用物件可直接從 APK 載入，
無需先解壓縮至裝置上的暫存位置再載入。
APK 在傳輸時還會另外壓縮&mdash;這就是
為什麼你應該關注下載大小的原因。

預設情況下，Flutter APK 會壓縮 `libflutter.so` 和 `libapp.so`，
這會使 APK 較小，但裝置上的檔案較大。
若要控制原生函式庫是否在安裝時以壓縮方式儲存並解壓縮，
請設定 Android Gradle 插件的 `useLegacyPackaging` 選項。
目前的建議請參閱 [Android 準則][Android guidelines]。

[Android guidelines]: {{site.android-dev}}/topic/performance/reduce-apk-size#extract-false

## 其他資源 {:#other-resources}

若要深入了解 C 互通，請參閱以下影片：

- [C interoperability with Dart FFI][]
- [How to Use Dart FFI to Build a Retro Audio Player][]

[C interoperability with Dart FFI]: {{site.yt.watch}}?v=2MMK7YoFgaA
[How to Use Dart FFI to Build a Retro Audio Player]: {{site.yt.watch}}?v=05Wn2oM_nWw
