---
title: "使用 dart:ffi 綁定原生 iOS 程式碼"
description: "若要在 Flutter 程式中使用 C 程式碼，請使用 dart:ffi 函式庫。"
---

<?code-excerpt path-base="platform_integration"?>

Flutter 行動裝置與桌面應用程式可以使用
[dart:ffi][dart:ffi] 函式庫來呼叫原生 C API。
_FFI_ 代表 [_foreign function interface_，外部函式介面][FFI]。
其他類似功能的術語還包括
_native interface_（原生介面）與 _language bindings_（語言綁定）。

:::note
本頁說明如何在 iOS 應用程式中使用 `dart:ffi` 函式庫。
如需 Android 相關資訊，請參閱
[Binding to native Android code using dart:ffi][android-ffi]。
如需 macOS 相關資訊，請參閱
[Binding to native macOS code using dart:ffi][macos-ffi]。
此功能目前尚未支援 Web 外掛程式。
:::

[android-ffi]: /platform-integration/android/c-interop
[macos-ffi]: /platform-integration/macos/c-interop
[dart:ffi]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

在您的函式庫或程式能夠使用 FFI 函式庫
綁定至原生程式碼之前，必須確保
原生程式碼已載入，且其符號對 Dart 可見。
本頁重點說明如何在 Flutter 外掛程式或應用程式中
編譯、封裝與載入 iOS 原生程式碼。

本教學將示範如何在 Flutter 外掛程式中
打包 C/C++ 原始碼，並在 iOS 上
透過 Dart FFI 函式庫進行綁定。
在這個操作流程中，您將建立一個實作 32 位元加法的 C 函式，
然後透過名為 "native_add" 的 Dart 外掛程式將其公開。

## 動態連結與靜態連結

原生函式庫可以動態或靜態地連結至應用程式。
靜態連結的函式庫會嵌入在應用程式的可執行映像檔中，
並於應用程式啟動時載入。

來自靜態連結函式庫的符號可以透過 `DynamicLibrary.executable` 或
`DynamicLibrary.process` 來載入。

相較之下，動態連結的函式庫會以獨立檔案或資料夾的形式
分佈於應用程式內，並在需要時動態載入。
在 iOS 上，動態連結函式庫會以 `.framework` 資料夾的形式發佈。

動態連結的函式庫可以透過 `DynamicLibrary.open` 載入到 Dart 中。

API 文件可參考
[Dart API reference documentation][Dart API reference documentation]。


[Dart API reference documentation]: {{site.dart.api}}

## 建立 FFI 外掛程式

若要建立名為 "native_add" 的 FFI 外掛程式，
請依照下列步驟操作：

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
$ cd native_add
```

:::note
你可以從 `--platforms` 中排除你不想要建置的平臺。不過，你必須包含你正在測試裝置所屬的平臺。
:::

這會在 `native_add/src` 中建立一個包含 C/C++ 原始碼的外掛。這些原始碼會由各作業系統建置資料夾中的原生建置檔案進行編譯。

FFI 函式庫只能綁定到 C 符號，因此在 C++ 中，這些符號需要標記為 `extern "C"`。

你也應該加上屬性來標示這些符號會從 Dart 被參考，以避免連結器在連結時最佳化（link-time optimization）過程中將這些符號移除。`__attribute__((visibility("default"))) __attribute__((used))`。

在 iOS 上，`native_add/ios/native_add.podspec` 會負責連結這些程式碼。

原生程式碼會從 Dart 於 `lib/native_add_bindings_generated.dart` 呼叫。

綁定檔是使用 [package:ffigen]({{site.pub-pkg}}/ffigen) 產生。

## 其他使用情境

### iOS 與 macOS

動態連結函式庫會在應用程式啟動時自動由動態連結器載入。其內部的符號可以透過 [`DynamicLibrary.process`][`DynamicLibrary.process`] 來解析。
你也可以使用 [`DynamicLibrary.open`][`DynamicLibrary.open`] 取得函式庫的 handle，以限制符號解析的範圍，但目前尚不清楚 Apple 的審查流程會如何處理這種情況。

靜態連結進應用程式二進位檔的符號，可以透過 [`DynamicLibrary.executable`][`DynamicLibrary.executable`] 或 [`DynamicLibrary.process`][`DynamicLibrary.process`] 來解析。


[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

#### 平臺函式庫

若要連結至平臺函式庫，請依照下列步驟操作：

1. 在 Xcode 中開啟 `Runner.xcworkspace`。
1. 選擇目標平臺。
1. 在 **Linked Frameworks and Libraries** 區段中點選 **+**。
1. 選擇要連結的系統函式庫。

#### 第一方函式庫

第一方原生函式庫可以直接以原始碼或（已簽署的）`.framework` 檔案方式納入。
理論上也有可能包含靜態連結的歸檔檔案，不過這部分需要進一步測試。

#### 原始碼

若要直接連結至原始碼，請依照下列步驟操作：

 1. 在 Xcode 中開啟 `Runner.xcworkspace`。
 2. 將 C/C++/Objective-C/Swift 原始檔加入 Xcode 專案中。
 3. 在要導出的符號宣告前加上下列前綴，以確保這些符號能被 Dart 存取：

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
1. 將 framework 檔案加入至 **Embedded Binaries** 區段。
1. 也將其加入 Xcode 目標的 **Linked Frameworks & Libraries** 區段。

#### 開源第三方函式庫

若要建立同時包含 C/C++/Objective-C 及 Dart 程式碼的 Flutter 套件（plugin），請依照以下步驟操作：

1. 在你的套件專案中，開啟 `ios/<myproject>.podspec`。
1. 將原生程式碼加入至 `source_files` 欄位。

這些原生程式碼會被靜態連結進所有使用此套件的應用程式二進位檔中。

#### 封閉原始碼第三方函式庫

若要建立包含 Dart 原始碼，但以二進位形式分發 C/C++ 函式庫的 Flutter 套件，請依照以下步驟操作：

1. 在你的套件專案中，開啟 `ios/<myproject>.podspec`。
1. 新增 `vendored_frameworks` 欄位。
   請參考 [CocoaPods 範例][CocoaPods example]。

:::warning
**請勿**將此套件（或任何包含二進位程式碼的套件）上傳至 pub.dev。
此類套件應由可信賴的第三方下載，如 CocoaPods 範例所示。
:::

[CocoaPods example]: {{site.github}}/CocoaPods/CocoaPods/blob/master/examples/Vendored%20Framework%20Example/Example%20Pods/VendoredFrameworkExample.podspec

## 移除 iOS 符號（Stripping iOS symbols）

當建立發行版封存（IPA）時，Xcode 會自動移除符號。

1. 在 Xcode 中，前往 **Target Runner > Build Settings > Strip Style**。
2. 將選項從 **All Symbols** 改為 **Non-Global Symbols**。

{% render docs/resource-links/ffi-video-resources.md, site: site %}
