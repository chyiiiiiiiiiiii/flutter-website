# 為 Windows 設定 Flutter flavor

> 如何為 Windows 桌面應用程式建立 Flutter flavor。



本指南將說明如何為 Windows 桌面應用程式建立 Flutter flavor。

:::note
若要為其他平台建立應用程式 flavor，
請參閱以下設定 flavor 的頁面：

* [Android][]
* [iOS 與 macOS][iOS and macOS]
* [Linux][]
:::

## 概觀 {:#overview}

Flutter flavor 代表一組設定的集合，
用來定義特定版本的應用程式如何建置與執行。
例如，flavor 可以決定某次建置的視窗標題、
應用程式圖示、API 端點、資產 (asset) 組合與日誌 (logging) 設定。

:::version-note
Windows 上對 flavor 的內建支援需要 Flutter 3.47 或更新版本。
:::

在 Windows 上，Flutter 使用 [CMake][] 來設定並建置
原生桌面 runner。
當你搭配 `--flavor` 旗標執行 `flutter run` 或 `flutter build` 時，
Flutter 會將 flavor 名稱以 `FLUTTER_APP_FLAVOR` 變數的形式寫入
`windows/flutter/ephemeral/generated_config.cmake`，
並將建置輸出隔離在各 flavor 專屬的目錄中。

:::important
`generated_config.cmake` 檔案是由
`windows/flutter/CMakeLists.txt` 引入的，因此 `FLUTTER_APP_FLAVOR`
只有在 `add_subdirectory(${FLUTTER_MANAGED_DIR})` 這一行**之後**，
才會在你最上層的 `CMakeLists.txt` 中可見。
任何放在該行之前的 `if(DEFINED FLUTTER_APP_FLAVOR)` 區塊
都會被靜默略過。
:::

下表說明當專案定義了兩個 flavor（`staging`、`production`）
以及兩種建置模式（`debug`、`release`）時，
Flutter 所建立的建置目錄：

| Flavor     | 建置模式 | 輸出目錄                                                |
|------------|------------|---------------------------------------------------------|
| staging    | debug      | `build/windows/<arch>/staging/runner/Debug/`            |
| production | debug      | `build/windows/<arch>/production/runner/Debug/`         |
| staging    | release    | `build/windows/<arch>/staging/runner/Release/`          |
| production | release    | `build/windows/<arch>/production/runner/Release/`       |
{:.table .table-striped}

[CMake]: https://cmake.org/

## 建立並執行 flavor {:#create-and-run-flavors}

在 Windows 上傳入 `--flavor` 不需要任何 CMake 設定。
既有的 Flutter 專案不需要更新範本或變更設定，
即可支援 flavor。
當你傳入 `--flavor` 時，Flutter 會自動隔離建置目錄、
填入 `appFlavor`，並篩選出 flavor 專屬的資產。

若要使用範例專案試用 flavor，
請完成以下步驟：

1.  建立一個名為 `flavors_example` 的新 Flutter 專案：

    ```console
    $ flutter create flavors_example
    $ cd flavors_example
    ```

1.  確認你的 flavor 能正確執行：

    執行 `staging` flavor：

    ```console
    $ flutter run -d windows --flavor staging
    ```

    執行 `production` flavor：

    ```console
    $ flutter run -d windows --flavor production
    ```

若要為每個 flavor 自訂原生 runner 設定，例如
視窗標題或應用程式圖示，請參閱
[自訂設定](#customize-configurations)。

## 啟動 flavor {:#launch-a-flavor}

定義好應用程式的 flavor 之後，
即可使用 Flutter CLI 的 `--flavor` 旗標
來執行、建置或測試特定的 flavor。

### 以 debug 模式執行 flavor {: #run-a-flavor }

若要在開發期間執行特定的 flavor，
請將 `--flavor` 選項傳給 `flutter run`：

```console
$ flutter run -d windows --flavor <flavor_name>
```

請將 `<flavor_name>` 替換為你的 flavor 名稱
（例如 `staging` 或 `production`）。

### 建置 release 執行檔 {: #build-a-flavor }

若要為特定的 flavor 建置 release 可執行檔，
請將 `--flavor` 選項傳給 `flutter build`：

```console
$ flutter build windows --flavor <flavor_name>
```

Flutter 會將編譯後的可執行檔輸出到
`build/windows/<arch>/<flavor_name>/runner/Release/`。

### 搭配 flavor 執行測試 {: #test-a-flavor }

`--flavor` 選項也適用於 `flutter test` 與 `flutter drive`，
讓你可以針對特定的 flavor 設定
執行單元測試、元件 (Widget) 測試或整合測試：

```console
$ flutter test --flavor <flavor_name>
```

## 在 Flutter 程式碼中使用 flavor {: #use-flavors-in-code }

加入 flavor 之後，
你可以依據目前啟用的 flavor 調整應用程式行為，例如選擇 API 端點、
切換功能，或設定分析 (analytics) 金鑰。

Flutter 框架在 `services` 函式庫中提供了
`appFlavor` 常數，
用來識別執行或建置應用程式時所使用的 flavor。

1.  **匯入 services 函式庫：**

    將以下 import 加入你的 Dart 檔案：

    ```dart
    import 'package:flutter/services.dart';
    ```

1.  **讀取 flavor 的值：**

    在應用程式邏輯中（通常是 `main()`）使用 `appFlavor` 常數，
    來處理 flavor 專屬的設定：

    ```dart
    void main() {
      if (appFlavor == 'production') {
        Config.apiUrl = 'https://api.example.com';
      } else if (appFlavor == 'staging') {
        Config.apiUrl = 'https://staging.api.example.com';
      }

      runApp(const MyApp());
    }
    ```

    :::note
    `appFlavor` 的值會與傳給 `--flavor` 旗標的字串相符。
    如果省略 `--flavor`，
    `appFlavor` 會與 `pubspec.yaml` 中設定的
    [預設 flavor](#set-default-flavor) 相符。
    如果兩者皆未指定，`appFlavor` 為 `null`。
    :::

## 自訂設定 {:#customize-configurations}

若要依 flavor 區分原生 Windows runner，例如
讓每個 flavor 擁有獨特的視窗標題或應用程式圖示，請設定
CMake，使用 `configure_file` 來產生 runner 的原始碼與資源檔。

### 設定 CMake 的原生設定 {: #configure-cmake-native }

CMake 會在 `FLUTTER_APP_FLAVOR` 定義之後，
才評估 `windows/runner/CMakeLists.txt`。
你可以檢查這個變數來設定 flavor 專屬的值，
再使用 `configure_file` 將這些值代入
C++ runner (`main.cpp`) 與 Windows 資源指令碼 (`Runner.rc`) 的範本檔中。

在 `windows/runner/CMakeLists.txt` 中，
於 `add_executable(${BINARY_NAME} ...)` 這一行之前加入以下區塊：

```cmake title="windows/runner/CMakeLists.txt"
# Configure flavor-specific settings.
if(DEFINED FLUTTER_APP_FLAVOR)
  if(FLUTTER_APP_FLAVOR STREQUAL "staging")
    set(RUNNER_APP_ICON "staging.ico")
    set(WINDOW_TITLE "Staging App")
  elseif(FLUTTER_APP_FLAVOR STREQUAL "production")
    set(RUNNER_APP_ICON "production.ico")
    set(WINDOW_TITLE "Production App")
  endif()
else()
  set(RUNNER_APP_ICON "app_icon.ico")
  set(WINDOW_TITLE "${BINARY_NAME}")
endif()

configure_file(
  "${CMAKE_CURRENT_SOURCE_DIR}/main.cpp.in"
  "${CMAKE_CURRENT_SOURCE_DIR}/main.cpp"
  @ONLY
)

configure_file(
  "${CMAKE_CURRENT_SOURCE_DIR}/Runner.rc.in"
  "${CMAKE_CURRENT_SOURCE_DIR}/Runner.rc"
  @ONLY
)
```

:::note
由於 `configure_file` 會在建置時於原始碼目錄中產生
`main.cpp` 與 `Runner.rc`，
請將這兩個產生的檔案加入專案的 `.gitignore`：

```gitignore title=".gitignore"
windows/runner/main.cpp
windows/runner/Runner.rc
```

請改為將 `.in` 範本檔提交到版本控制中。
:::

### 建立不同的視窗標題 {:#create-distinct-window-titles}

若要在應用程式啟動時顯示 flavor 專屬的視窗標題：

1.  將 `windows/runner/main.cpp` 重新命名為 `windows/runner/main.cpp.in`。

1.  在 `windows/runner/main.cpp.in` 中，找到呼叫 `window.Create` 的位置，
    並將寫死的標題替換為 `@WINDOW_TITLE@`：

    ```cpp title="windows/runner/main.cpp.in"
      if (!window.Create(L"@WINDOW_TITLE@", origin, size)) {
        return EXIT_FAILURE;
      }
    ```

    當 CMake 設定建置時，
    會將 `@WINDOW_TITLE@` 替換為所選 flavor 的視窗標題。

### 建立不同的應用程式圖示 {:#create-distinct-app-icons}

若要為每個 flavor 提供獨特的桌面圖示：

1.  準備 `.ico` 格式的圖示檔
    （例如 `staging.ico` 與 `production.ico`），
    並將它們與預設的 `app_icon.ico` 一起
    放在 `windows/runner/resources/` 中。

1.  將 `windows/runner/Runner.rc` 重新命名為 `windows/runner/Runner.rc.in`。

1.  在 `windows/runner/Runner.rc.in` 中，找到 `IDI_APP_ICON` 那一行，
    並更新圖示路徑以使用 `@RUNNER_APP_ICON@`：

    ```rc title="windows/runner/Runner.rc.in"
    IDI_APP_ICON            ICON                    "resources\\@RUNNER_APP_ICON@"
    ```

    你也可以更新中繼資料字串，例如 `FileDescription`
    與 `ProductName`，改用 `@WINDOW_TITLE@`：

    ```rc title="windows/runner/Runner.rc.in"
    VALUE "FileDescription", "@WINDOW_TITLE@" "\0"
    VALUE "ProductName",     "@WINDOW_TITLE@" "\0"
    ```

### 依 flavor 打包資產 {: #bundle-assets }

如果有些資產只適用於特定的 flavor，
可以設定 Flutter 僅在建置該 flavor 時才打包這些資產。
這樣可以避免不必要的資產增加應用程式套件的大小。

若要有條件地打包資產，
請在 `pubspec.yaml` 的資產項目中加入 `flavors` 清單：

```yaml title="pubspec.yaml"
flutter:
  assets:
    - assets/common/
    - path: assets/staging/
      flavors:
        - staging
    - path: assets/production/
      flavors:
        - production
```

若想進一步了解，請參閱 [Flutter pubspec 選項][Flutter pubspec options]中的 [`assets` 欄位][`assets` field]。

[`assets` field]: /tools/pubspec#assets
[Flutter pubspec options]: /tools/pubspec

### 設定預設 flavor {: #set-default-flavor }

若要指定在未使用 `--flavor` 旗標時，
執行或建置所使用的 flavor，
請在 `pubspec.yaml` 中加入 `default-flavor` 屬性：

```yaml title="pubspec.yaml"
flutter:
  default-flavor: staging
```

若想進一步了解，請參閱
[Flutter pubspec 選項][Flutter pubspec options]中的 [`default-flavor` 欄位][`default-flavor` field]。

[`default-flavor` field]: /tools/pubspec#default-flavor

## 更多資訊 {:#more-information}

如需更多關於 flavor 與桌面部署的資訊，
請參閱以下資源：

* [為 Android 設定 Flutter flavor][Android]
* [為 iOS 與 macOS 設定 Flutter flavor][iOS and macOS]
* [為 Linux 設定 Flutter flavor][Linux]
* [建置並發佈 Windows 桌面應用程式][Build and release a Windows desktop app]

[Android]: /deployment/flavors
[iOS and macOS]: /deployment/flavors-ios
[Linux]: /deployment/flavors-linux
[Build and release a Windows desktop app]: /deployment/windows

