# 使用 FFI 綁定原生程式碼

> 若要在 Flutter 程式中使用原生程式碼，請搭配 package_ffi 範本使用 dart:ffi 函式庫。



Flutter 應用程式可以使用 [dart:ffi][] 函式庫來呼叫原生 API。_FFI_ 是
[_foreign function interface_][FFI]（外部函式介面）的縮寫。類似功能的其他術語
包括 _native interface_（原生介面）和 _language bindings_（語言綁定）。

自 Flutter 3.38 起，綁定原生程式碼的建議方式是使用
`flutter create --template=package_ffi` 指令。此範本使用
[build hooks][] 在 `build.dart` 腳本中設定原生建置，不再需要特定作業系統的建置檔案。
這種方式適用於 Flutter 和 Dart 獨立專案。

若您需要使用 Flutter Plugin API，或需要在 Android 上設定 Google
Play services 執行環境，請使用標準插件範本（`flutter create
--template=plugin`）。

:::note
正在尋找先前的 FFI 插件工作流程？請參閱
[使用舊版 FFI 插件範本綁定原生程式碼](/platform-integration/legacy-ffi-plugin)，
該頁面記錄了 `plugin_ffi` 範本與特定作業系統的建置檔案。
:::

[build hooks]: https://dart.dev/tools/hooks
[dart:ffi]: https://api.dart.dev/dart-ffi/dart-ffi-library.html
[FFI]: https://en.wikipedia.org/wiki/Foreign_function_interface

## 建立 FFI 套件 {:#create-an-ffi-package}

若要建立 FFI 套件，請執行以下指令：

```console
$ flutter create --template=package_ffi native_add
$ cd native_add
```

這會建立一個包含以下特殊內容的套件：

- **`lib/native_add.dart`**：定義套件 API 的 Dart 程式碼。
- **`lib/native_add_bindings_generated.dart`**：為原生程式碼自動產生的 Dart 綁定。
- **`src/native_add.c`**：原生 C 原始碼。
- **`src/native_add.h`**：原生程式碼的 C 標頭檔。
- **`hook/build.dart`**：由 Flutter SDK 執行以編譯原生程式碼的腳本。
- **`ffigen.yaml`**：[`package:ffigen`][] 用於產生 Dart 綁定的設定檔。
- **`pubspec.yaml`**：套件定義，用以啟用 `build.dart` hook。

[`package:ffigen`]: https://pub.dev/packages/ffigen

## 原生程式碼 {:#the-native-code}

原生程式碼位於 `src/native_add.c` 和 `src/native_add.h`。C 函式
`sum` 定義在 `.c` 檔案中，其函式簽章位於標頭檔中。該函式被標記為可匯出，
以便從 Dart 呼叫。

## Build hook {:#the-build-hook}

原生程式碼會自動編譯並與您的應用程式一起打包。這是由
`hook/build.dart` 腳本完成的，它是一個 [build hook][build hooks]。

這意味著您不再需要撰寫特定作業系統的建置檔案（例如適用於 Linux/Windows 的
`CMakeLists.txt`、適用於 iOS/macOS 的 `.podspec`，或適用於 Android 的
`build.gradle`）來編譯您的原生程式碼。

build hook 使用 `package:native_toolchain_c` 將 C 程式碼編譯為動態函式庫。
您可以自訂此檔案以建置其他原生語言，或下載預先編譯的二進位檔案。

## Dart 程式碼 {:#the-dart-code}

Dart 程式碼定義了套件的公開 API。

### 產生綁定 {:#generating-the-bindings}

若要綁定原生程式碼，範本使用 [`package:ffigen`][] 從標頭檔
（`src/native_add.h`）產生綁定。產生過程在 `ffigen.yaml` 中設定。

這會產生 `lib/native_add_bindings_generated.dart`。

### 呼叫原生函式 {:#calling-the-native-function}

`lib/native_add_bindings_generated.dart` 中產生的綁定包含
`@Native() external` 函式。這些函式在執行時期會自動對應到 build hook（在建置時期執行）
輸出的程式碼資產。這表示不需要特定作業系統的邏輯來 `dlopen` 動態函式庫，
使 Dart 程式碼真正達到跨平台。

主要函式庫檔案 `lib/native_add.dart` 公開了這些函式。您的應用程式
可以透過匯入 `package:native_add/native_add.dart` 來呼叫這些函式。

## 測試 {:#testing}

產生的套件在 `test/native_add_test.dart` 中包含一個單元測試，
展示如何測試原生函式。

## 其他使用案例 {:#other-use-cases}

### 系統函式庫 {:#system-libraries}

若要連結系統函式庫，您需要修改 `build.dart` hook 以指定連結模式。
您不需要編譯原始碼，而是建立一個 `CodeAsset` 並設定其 `linkMode`。

對於 Android、iOS、Linux 和 macOS 上的許多系統函式庫，您可以使用
`LookupInProcess()` 在主處理程序中尋找符號。

對於 Windows，您通常使用 `DynamicLoadingSystem()` 並提供 DLL 的名稱。

:::note
若需要呼叫系統 API 的桌面平台專屬指引&mdash;包括包裝套件，例如
[`package:win32`](https://pub.dev/packages/win32) 和
[Canonical 的 Linux 套件](https://pub.dev/publishers/canonical.com/packages)&mdash;請參閱
[與 Windows 整合](/platform-integration/windows/building#integrating-with-windows)
和[與 Linux 整合](/platform-integration/linux/building#integrate-with-linux)。
:::

以下是一個連結系統函式庫以取得主機名稱的 `build.dart` 範例：

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    final targetOS = input.target.os;
    switch (targetOS) {
      case OS.android || OS.iOS || OS.linux || OS.macOS:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/unix.dart',
            linkMode: LookupInProcess(),
          ),
        );
      case OS.windows:
        output.assets.code.add(
          CodeAsset(
            package: 'host_name',
            name: 'src/third_party/windows.dart',
            linkMode: DynamicLoadingSystem(Uri.file('ws2_32.dll')),
          ),
        );
      default:
        throw Exception('Unsupported target os: $targetOS');
    }
  });
}
```

Dart 檔案（`unix.dart`、`windows.dart`）中則會包含使用這些系統函式庫符號的 `external` 函式。

#### 在 Android 上打包 `libc++_shared.so` {:#bundling-libcsharedso-on-android}

雖然 `libc++_shared.so` 隨 Android NDK 一起提供，
但它並非系統函式庫。
若您的應用程式或套件使用 [C++ 標準函式庫][libcpp-support]，
或包含[多個相依於它的共享函式庫][shared-libraries]，
您的應用程式需要打包 `libc++_shared.so`。

若要在應用程式中打包此函式庫，
請新增對 [`package:android_libcpp_shared`][libcpp-shared] 的相依性，
該套件使用其自身的 build hook 從本機安裝的 NDK 為每個目標架構打包 `libc++_shared.so`。

[libcpp-support]: https://developer.android.com/ndk/guides/cpp-support#cs
[shared-libraries]: https://developer.android.com/ndk/guides/cpp-support#shared_runtimes
[libcpp-shared]: https://pub.dev/packages/android_libcpp_shared

### 閉源函式庫 {:#closed-source-libraries}

您也可以使用 build hooks 來連結預先編譯的閉源函式庫。建議的方式是在建置時期
下載預先編譯的二進位檔案，並使用檔案雜湊驗證其完整性。

在您的 `build.dart` hook 中，您需要：
1.  從 URL 下載函式庫。
2.  驗證已下載檔案的雜湊值。
3.  將函式庫放置在建置輸出目錄中。
4.  建立一個 `CodeAsset`，並將 `DynamicLoading` 指向該函式庫。

以下是 `CodeAsset` 建立的簡化範例：

```dart
// hook/build.dart
import 'package:hooks/hooks.dart';
import 'package:code_assets/code_assets.dart';

void main(List<String> args) async {
  await build(args, (input, output) async {
    // 1. 從 URL 下載函式庫。
    // 2. 驗證已下載檔案的雜湊值。
    // 3. 將函式庫放置在建置輸出目錄中。
    
    output.assets.code.add(
      CodeAsset(
        package: input.packageName,
        name: 'src/my_lib.dart', // Dart file with bindings
        linkMode: DynamicLoadingBundled(),
        file: input.outputDirectory.resolve('my_lib.so'),
      ),
    );
  });
}
```
您需要透過提供預先編譯函式庫的不同版本來處理不同的架構和平台。

更多範例請參閱 [code_assets 套件範例](https://pub.dev/packages/code_assets/example)。

## 動態函式庫命名準則 {:#dynamic-library-naming-guidelines}

在為打包程式碼資產的套件實作 `build.dart` hook 時，
確保動態函式庫在所有目標架構和 SDK 中命名一致至關重要。

在 Apple 平台（iOS 和 macOS）上，動態函式庫會打包到框架中。
Flutter 的建置系統依賴這些名稱來產生中繼資料並打包可發佈的格式，
例如 XCFramework。

### 跨架構的一致性 {:#consistency-across-architectures}

對於給定的資產 ID，您的 hook 將被多次呼叫，每次對應一個架構。
您的 hook 必須無論目標架構為何（例如 `arm64` 與 `x64`），都產生相同的檔案名稱。

*   **原因？** 在單一 SDK 建置中，Flutter 使用 `lipo` 將特定架構的二進位檔案
    合併為單一通用（fat）二進位檔案。如果各架構具有不同的檔案名稱，
    工具將以不確定的方式選擇其中一個並發出警告。此外，如果動態函式庫被重新命名，
    執行時期的錯誤訊息對使用者而言將難以理解。
*   **建議做法**：避免在檔案名稱中加入架構後綴（例如，使用 `libsqlite3.dylib`
    而非 `libsqlite3_arm64.dylib`）。改為將檔案寫入
    `input.outputDirectory`（每個架構唯一）或 `input.outputDirectoryShared` 的
    架構專屬子目錄（例如 `input.outputDirectoryShared.resolve('$architecture/')`）。

### 跨 SDK 的一致性（iOS）{:#consistency-across-sdks-ios}

為 iOS 建置時，您的 hook 將以不同的 SDK 和架構值被多次呼叫。
實體裝置（`iphoneos`）和模擬器（`iphonesimulator`）的呼叫，
對於相同的資產 ID 必須產生相同的框架名稱。

*   **原因？** Flutter 使用 `xcodebuild -create-xcframework` 來合併這些輸出。
    Xcode 要求 XCFramework 中所有平台切片共用相同的框架名稱，
    以允許無縫連結。如果檔案名稱不同，Flutter 工具將無法建立正確的 XCFramework，
    `flutter build ios-framework` 等指令將會失敗。
*   **建議做法**：不要為模擬器建置使用 `_sim` 或 `_simulator` 等後綴。
    XCFramework 結構已在內部處理平台分離（例如，
    `MyLib.xcframework/ios-arm64_x86_64-simulator/MyLib.framework`）。
    改為將檔案寫入 `input.outputDirectory`（每個 SDK 唯一）或
    `input.outputDirectoryShared` 的 SDK 專屬子目錄。

### 資產集合的一致性 {:#consistency-in-the-set-of-assets}

您的 hook 必須在給定目標平台的所有 SDK 中產生相同的資產 ID 集合。

*   **原因？** Apple 的建置系統和 App Store 驗證要求應用程式中包含的所有框架
    都與目標裝置相容。如果您為模擬器（`iphonesimulator`）產生了資產，
    但沒有為實體裝置（`iphoneos`）產生，則產生的 XCFramework 將包含一個
    在裝置端沒有對應項目的切片。這可能導致建置失敗，或 Apple 以在裝置建置中
    包含模擬器專用二進位檔案為由拒絕該應用程式。
*   **建議做法**：確保您的 `build.dart` hook 邏輯一致地處理所有受支援的 SDK。
    如果您為某個 SDK 產生了資產，則必須為該平台的所有其他 SDK 產生對應的資產。
    對於特定 SDK 的程式碼，您可以為其他 SDK 使用 stub 實作。

