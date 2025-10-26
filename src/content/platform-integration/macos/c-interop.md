---
title: "使用 dart:ffi 綁定原生 macOS 程式碼"
description: "若要在 Flutter 程式中使用 C 程式碼，請使用 dart:ffi 函式庫。"
---

<?code-excerpt path-base="platform_integration"?>

Flutter 行動與桌面應用程式可以使用
[dart:ffi][dart:ffi] 函式庫來呼叫原生 C API。
_FFI_ 代表 [_foreign function interface_，外部函式介面][FFI]。
其他類似功能的術語還包括
_native interface_（原生介面）與 _language bindings_（語言綁定）。

:::note
本頁說明如何在 macOS 桌面應用程式中使用 `dart:ffi` 函式庫。
如需 Android 相關資訊，請參閱
[Binding to native Android code using dart:ffi][android-ffi]。
如需 iOS 相關資訊，請參閱
[Binding to native iOS code using dart:ffi][ios-ffi]。
此功能目前尚未支援 Web 外掛程式。
:::


[android-ffi]: /platform-integration/android/c-interop
[ios-ffi]: /platform-integration/ios/c-interop
[dart:ffi]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

在您的函式庫或程式能夠使用 FFI 函式庫
綁定原生程式碼之前，您必須確保
原生程式碼已載入，且其符號對 Dart 可見。
本頁重點說明如何在 Flutter 外掛程式或應用程式中
編譯、封裝與載入 macOS 原生程式碼。

本教學將示範如何在 Flutter 外掛程式中
打包 C/C++ 原始碼，並透過 Dart FFI 函式庫於 macOS 上進行綁定。
在此操作說明中，您將建立一個 C 函式，
實作 32 位元加法，然後
透過名為 "native_add" 的 Dart 外掛程式將其公開。

## 動態連結與靜態連結

原生函式庫可以以動態或靜態方式連結到應用程式中。靜態連結的函式庫
會嵌入至應用程式的可執行映像檔中，
並於應用程式啟動時載入。

靜態連結函式庫中的符號可以透過 `DynamicLibrary.executable` 或
`DynamicLibrary.process` 來載入。

相較之下，動態連結函式庫會以獨立檔案或資料夾的形式
分佈於應用程式內，並在需要時動態載入。在 macOS 上，動態連結
函式庫會以 `.framework` 資料夾的形式分發。

動態連結函式庫可以透過 `DynamicLibrary.open` 載入至 Dart。

API 文件可參考
[Dart API reference documentation][Dart API reference documentation]。


[Dart API reference documentation]: {{site.dart.api}}

## 建立 FFI 外掛程式

如果您已經有外掛程式，請跳過此步驟。

若要建立名為 "native_add" 的外掛程式，
請執行下列步驟：

```console
$ flutter create --platforms=macos --template=plugin_ffi native_add
$ cd native_add
```

:::note
你可以從 `--platforms` 排除你不想建置的平臺。不過，你必須包含你正在測試裝置所屬的平臺。
:::

這會在 `native_add/src` 中建立一個包含 C/C++ 原始碼的 plugin。
這些原始碼會由各個作業系統建置資料夾中的原生建置檔案進行編譯。

FFI 函式庫只能綁定 C 符號，
因此在 C++ 中這些符號會被標記為 `extern "C"`。

你也應該加入屬性來標示這些符號會從 Dart 被參考，
以避免 linker 在連結時最佳化（link-time optimization）時將這些符號移除。
`__attribute__((visibility("default"))) __attribute__((used))`。

在 iOS 上，`native_add/macos/native_add.podspec` 會負責連結這些程式碼。

原生程式碼會從 Dart 於 `lib/native_add_bindings_generated.dart` 呼叫。

這些綁定會透過 [package:ffigen]({{site.pub-pkg}}/ffigen) 產生。

## 其他使用情境

### iOS 與 macOS

動態連結函式庫（dynamically linked libraries）會在應用程式啟動時自動由動態連結器（dynamic linker）載入。它們的符號可以透過 [`DynamicLibrary.process`][`DynamicLibrary.process`] 解析。
你也可以透過 [`DynamicLibrary.open`][`DynamicLibrary.open`] 取得函式庫的 handle，以限制符號解析的範圍，但目前尚不清楚 Apple 的審查流程會如何處理這種方式。

靜態連結進應用程式二進位檔的符號，可以透過 [`DynamicLibrary.executable`][`DynamicLibrary.executable`] 或 [`DynamicLibrary.process`][`DynamicLibrary.process`] 來解析。


[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

#### 平臺函式庫

若要連結至平臺函式庫，
請依照以下步驟操作：

1. 在 Xcode 中開啟 `Runner.xcworkspace`。
2. 選擇目標平臺（target platform）。
3. 在 **Linked Frameworks and Libraries** 區段中點擊 **+**。
4. 選擇要連結的系統函式庫。

#### 第一方函式庫

第一方原生函式庫可以以原始碼或（已簽署的）`.framework` 檔案的形式包含進來。
理論上也可以包含靜態連結的歸檔檔案（archive），但這需要進一步測試。

#### 原始碼

若要直接連結至原始碼，
請依照以下步驟操作：

 1. 在 Xcode 中開啟 `Runner.xcworkspace`。
 2. 將 C/C++/Objective-C/Swift 原始碼檔案加入 Xcode 專案。
 3. 在要匯出的符號宣告前加上以下前綴，確保這些符號可以被 Dart 存取：

    **C/C++/Objective-C**

    ```objc
    extern "C" /* <= C++ only */ __attribute__((visibility("default"))) __attribute__((used))
    ```

    **Swift**

    ```swift
    @_cdecl("myFunctionName")
    ```

#### 已編譯（動態）函式庫

若要連結至已編譯的動態函式庫，請依照以下步驟操作：

1. 如果有正確簽署的 `Framework` 檔案，請開啟 `Runner.xcworkspace`。
1. 將 framework 檔案加入 **Embedded Binaries** 區段。
1. 也請將其加入 Xcode 目標的 **Linked Frameworks & Libraries** 區段。

#### 已編譯（動態）函式庫（macOS）

若要將封閉原始碼函式庫加入 [Flutter macOS Desktop][Flutter macOS Desktop] 應用程式，請依照以下步驟操作：

1. 依照 Flutter 桌面端的指引建立 Flutter 桌面應用程式。
1. 在 Xcode 中開啟 `yourapp/macos/Runner.xcworkspace`。
   1. 將你預先編譯好的函式庫（`libyourlibrary.dylib`）拖曳到 `Runner/Frameworks`。
   1. 點擊 `Runner` 並切換到 `Build Phases` 分頁。
      1. 將 `libyourlibrary.dylib` 拖曳到 `Copy Bundle Resources` 清單中。
      1. 在 `Embed Libraries` 下，勾選 `Code Sign on Copy`。
      1. 在 `Link Binary With Libraries` 下，將狀態設為 `Optional`。（我們使用動態連結，無需進行靜態連結。）
   1. 點擊 `Runner` 並切換到 `General` 分頁。
      1. 將 `libyourlibrary.dylib` 拖曳到 **Frameworks, Libraries and Embedded Content** 清單中。
      1. 選擇 **Embed & Sign**。
   1. 點擊 **Runner** 並切換到 **Build Settings** 分頁。
      1. 在 **Search Paths** 區段，設定 **Library Search Paths**，將 `libyourlibrary.dylib` 所在路徑加入其中。
1. 編輯 `lib/main.dart`。
   1. 使用 `DynamicLibrary.open('libyourlibrary.dylib')` 動態連結到相關符號。
   1. 在元件（Widget）中的某處呼叫你的原生函式。
1. 執行 `flutter run`，確認你的原生函式已被呼叫。
1. 執行 `flutter build macos`，以建構應用程式的自包含發行版本。

[Flutter macOS Desktop]: /platform-integration/macos/building

{% comment %}

#### 開源第三方函式庫

若要建立同時包含 C/C++/Objective-C 及 Dart 程式碼的 Flutter 套件（plugin），請依照以下步驟操作：

1. 在你的套件專案中，開啟 `macos/<myproject>.podspec`。
1. 將原生程式碼加入 `source_files` 欄位。

原生程式碼會被靜態連結進所有使用該套件的應用程式的應用程式二進位檔中。

#### 封閉原始碼第三方函式庫

若要建立包含 Dart 原始碼、但以二進位形式分發 C/C++ 函式庫的 Flutter 套件，請依照以下步驟操作：

1. 在你的套件專案中，開啟 `macos/<myproject>.podspec`。
1. 新增 `vendored_frameworks` 欄位。請參考 [CocoaPods 範例][CocoaPods example]。

:::warning
**請勿**將此類套件（或任何包含二進位程式碼的套件）上傳至 pub.dev。此類套件應從可信任的第三方下載，如 CocoaPods 範例所示。
:::

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

## 移除 macOS 符號（Stripping macOS symbols）

當建立發行版封存檔（IPA）時，Xcode 會自動移除符號。

1. 在 Xcode 中，前往 **Target Runner > Build Settings > Strip Style**。
2. 將 **All Symbols** 改為 **Non-Global Symbols**。

{% endcomment %}

{% render docs/resource-links/ffi-video-resources.md, site: site %}
