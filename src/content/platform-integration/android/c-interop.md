---
title: "使用 dart:ffi 綁定原生 Android 程式碼"
description: "若要在 Flutter 程式中使用 C 程式碼，請使用 dart:ffi 函式庫。"
---

<?code-excerpt path-base="platform_integration"?>

Flutter 行動與桌面應用程式可以使用
[dart:ffi][dart:ffi] 函式庫來呼叫原生 C API。
_FFI_ 代表 [_foreign function interface_，外部函式介面][FFI]。
其他類似功能的術語還包括
_native interface_（原生介面）與 _language bindings_（語言綁定）。

:::note
本頁說明如何在 Android 應用程式中使用 `dart:ffi` 函式庫。
若需 iOS 相關資訊，請參閱
[Binding to native iOS code using dart:ffi][ios-ffi]。
若需 macOS 相關資訊，請參閱
[Binding to native macOS code using dart:ffi][macos-ffi]。
目前此功能尚未支援 Web 外掛程式。
:::


[ios-ffi]: /platform-integration/ios/c-interop
[dart:ffi]: {{site.dart.api}}/dart-ffi/dart-ffi-library.html
[macos-ffi]: /platform-integration/macos/c-interop
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

在您的函式庫或程式可以使用 FFI 函式庫
綁定原生程式碼之前，必須確保
原生程式碼已載入且其符號對 Dart 可見。
本頁重點說明如何在 Flutter 外掛程式或應用程式中
編譯、封裝與載入 Android 原生程式碼。

本教學將示範如何在 Flutter 外掛程式中
封裝 C/C++ 原始碼，並透過 Dart FFI 函式庫
在 Android 與 iOS 上進行綁定。
在本教學過程中，您將建立一個 C 函式，
實作 32 位元加法，然後
透過名為 "native_add" 的 Dart 外掛程式公開該功能。

## 動態連結與靜態連結

原生函式庫可以以動態或靜態方式
連結到應用程式。靜態連結的函式庫
會嵌入到應用程式的可執行映像檔中，
並於應用程式啟動時載入。

靜態連結函式庫的符號可以透過
[`DynamicLibrary.executable`][`DynamicLibrary.executable`] 或
[`DynamicLibrary.process`][`DynamicLibrary.process`] 載入。

相較之下，動態連結函式庫則會以
獨立檔案或資料夾的形式隨應用程式一同發佈，
並於需要時動態載入。在 Android 上，
動態連結函式庫會以一組 `.so`（ELF）
檔案發佈，每個架構一個檔案。

動態連結函式庫可透過
[`DynamicLibrary.open`][`DynamicLibrary.open`] 載入至 Dart。

API 文件可參考
[Dart API reference documentation][Dart API reference documentation]。

在 Android 上僅支援動態函式庫
（因為主要可執行檔是 JVM，
我們無法與其進行靜態連結）。


[Dart API reference documentation]: {{site.dart.api}}
[`DynamicLibrary.executable`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.executable.html
[`DynamicLibrary.open`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.open.html
[`DynamicLibrary.process`]: {{site.dart.api}}/dart-ffi/DynamicLibrary/DynamicLibrary.process.html

## 建立 FFI 外掛程式

若要建立名為 "native_add" 的 FFI 外掛程式，
請依照下列步驟進行：

```console
$ flutter create --platforms=android,ios,macos,windows,linux --template=plugin_ffi native_add
$ cd native_add
```

:::note
你可以從 `--platforms` 中排除你不想要建置的平臺。不過，你必須包含你正在測試裝置所屬的平臺。
:::

這會在 `native_add/src` 中建立一個包含 C/C++ 原始碼的外掛（plugin）。
這些原始碼會由各個作業系統建置資料夾中的原生建置檔案進行建置。

FFI 函式庫只能綁定到 C 符號，因此在 C++ 中這些符號會被標記為 `extern "C"`。

你也應該加上屬性來標示這些符號會從 Dart 被參考，以避免連結器在連結時最佳化（link-time optimization）時將這些符號移除。
`__attribute__((visibility("default"))) __attribute__((used))`。

在 Android 上，`native_add/android/build.gradle` 會負責連結這些程式碼。

原生程式碼會從 Dart 於 `lib/native_add_bindings_generated.dart` 中呼叫。

這些綁定會透過 [package:ffigen]({{site.pub-pkg}}/ffigen) 產生。

## 其他使用情境

### 平臺函式庫

若要連結至平臺函式庫，請依照下列指示操作：

 1. 在 Android 文件的 [Android NDK Native APIs][Android NDK Native APIs] 清單中找到你想要的函式庫。這份清單列出了穩定的原生 API。
 1. 使用 [`DynamicLibrary.open`][`DynamicLibrary.open`] 載入該函式庫。
    例如，若要載入 OpenGL ES（v3）：

    ```dart
    DynamicLibrary.open('libGLES_v3.so');
    ```

如果文件中有說明，您可能需要更新應用程式或套件的 Android manifest 檔案。


[Android NDK Native APIs]: {{site.android-dev}}/ndk/guides/stable_apis

#### 第一方函式庫

將原生程式碼（無論是原始碼或二進位檔）納入應用程式或套件的流程是相同的。

#### 開源第三方

請依照 Android 文件中的 [Add C and C++ code to your project][Add C and C++ code to your project] 指引，將原生程式碼及原生程式碼工具鏈（CMake 或 `ndk-build`）的支援加入專案。


[Add C and C++ code to your project]: {{site.android-dev}}/studio/projects/add-native-code

#### 封閉原始碼第三方函式庫

若要建立包含 Dart 原始碼的 Flutter 套件（plugin），但以二進位形式發佈 C/C++ 函式庫，請依照下列步驟操作：

1. 開啟專案的 `android/build.gradle` 檔案。
1. 將 AAR artifact 加入為相依項目。
   **請勿**將該 artifact 直接包含在您的 Flutter 套件中。相反地，應該從如 JCenter 等儲存庫下載。


## Android APK 檔案大小（共享物件壓縮）

[Android 指南][Android guidelines] 通常建議以未壓縮方式發佈原生共享物件（shared object），因為這實際上可以節省裝置空間。共享物件可以直接從 APK 載入，而不需先在裝置上解壓縮到暫存位置再載入。
APK 在傳輸過程中會額外被壓縮——因此您應該關注下載檔案的大小。

Flutter APK 預設**不**遵循這些指南，會壓縮 `libflutter.so` 和 `libapp.so`——這會讓 APK 檔案本身較小，但實際安裝到裝置上的體積較大。

第三方提供的共享物件可以透過在 `AndroidManifest.xml` 中設定 `android:extractNativeLibs="true"` 來改變這個預設行為，並停止壓縮 `libflutter.so`、`libapp.so` 以及任何使用者自訂加入的共享物件。
若要重新啟用壓縮，請在 `your_app_name/android/app/src/main/AndroidManifest.xml` 中依下列方式覆寫設定。

```xml diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
-     package="com.example.your_app_name">
+     xmlns:tools="http://schemas.android.com/tools"
+     package="com.example.your_app_name" >
      <!-- io.flutter.app.FlutterApplication is an android.app.Application that
           calls FlutterMain.startInitialization(this); in its onCreate method.
           In most cases you can leave this as-is, but you if you want to provide
           additional functionality it is fine to subclass or reimplement
           FlutterApplication and put your custom class here. -->

      <application
          android:name="io.flutter.app.FlutterApplication"
          android:label="your_app_name"
-         android:icon="@mipmap/ic_launcher">
+         android:icon="@mipmap/ic_launcher"
+         android:extractNativeLibs="true"
+         tools:replace="android:extractNativeLibs">
```

{% render docs/resource-links/ffi-video-resources.md, site: site %}
