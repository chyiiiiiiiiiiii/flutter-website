# 為 Linux 設定 Flutter flavor

> 如何為 Linux 桌面應用程式建立 Flutter flavor。



本指南將說明如何為 Linux 桌面應用程式建立 Flutter flavor。

:::note
若要為其他平台建立應用程式 flavor，
請參考以下設定 flavor 的頁面：

* [Android][]
* [iOS 與 macOS][iOS and macOS]
* [Windows][]
:::

## 概觀 {:#overview}

Flutter flavor 代表一組設定的集合，用來定義
特定版本的應用程式如何建置與執行。
例如，flavor 可以決定一次建置所使用的視窗標題、
應用程式 ID、API 端點、資源集合與日誌設定。

:::version-note
Linux 上的內建 flavor 支援需要 Flutter 3.47 或更新版本。
:::

在 Linux 上，Flutter 使用 [CMake][] 來設定並建置
原生桌面 runner。
當你執行 `flutter run` 或 `flutter build` 並帶上 `--flavor` 旗標時，
Flutter 會將 flavor 名稱以 `FLUTTER_APP_FLAVOR` 變數的形式寫入
`linux/flutter/ephemeral/generated_config.cmake`，
並把建置輸出隔離到各 flavor 專屬的目錄中。

:::important
`generated_config.cmake` 檔案是由
`linux/flutter/CMakeLists.txt` 引入的，因此 `FLUTTER_APP_FLAVOR`
要到頂層 `CMakeLists.txt` 中 `add_subdirectory(${FLUTTER_MANAGED_DIR})` 這一行**之後**才看得到。
任何放在該行之前的 `if(DEFINED FLUTTER_APP_FLAVOR)` 區塊
都會被靜默略過。
:::

下表說明當專案定義了兩個 flavor（`staging`、`production`）
與兩種建置模式（`debug`、`release`）時，
Flutter 所建立的建置目錄：

| Flavor     | 建置模式 | 輸出目錄                                             |
|------------|------------|------------------------------------------------------|
| staging    | debug      | `build/linux/<arch>/staging/debug/bundle/`           |
| production | debug      | `build/linux/<arch>/production/debug/bundle/`        |
| staging    | release    | `build/linux/<arch>/staging/release/bundle/`         |
| production | release    | `build/linux/<arch>/production/release/bundle/`      |
{:.table .table-striped}

[CMake]: https://cmake.org/

## 為 flavor 設定 CMake（選用） {: #configure-cmake }

在 Linux 上，不需要任何專案設定就能使用 `--flavor`。
既有的 Flutter 專案不需更新範本或修改設定，即可支援 flavor。
當你傳入 `--flavor` 時，Flutter 會自動隔離建置目錄、
填入 `appFlavor`，並過濾 flavor 專屬的資源。

只有在你想要依 flavor 區分原生 runner 時，
例如它的 GTK 應用程式 ID 或視窗標題，才需要完成下列選用步驟。
這個範例會設定兩個 flavor，分別名為 `staging` 與 `production`。

1.  建立一個名為 `flavors_example` 的新 Flutter 專案：

    ```console
    $ flutter create flavors_example
    $ cd flavors_example
    ```

1.  在 `linux/CMakeLists.txt` 中設定各 flavor 專屬的應用程式 ID：

    開啟 `linux/CMakeLists.txt`，找到
    `add_subdirectory(${FLUTTER_MANAGED_DIR})` 這一行。
    在該行之後立即依 flavor 設定 `APPLICATION_ID`：

    ```cmake title="linux/CMakeLists.txt"
    # Flutter library and tool build rules.
    set(FLUTTER_MANAGED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/flutter")
    add_subdirectory(${FLUTTER_MANAGED_DIR})

    if(DEFINED FLUTTER_APP_FLAVOR)
      if(FLUTTER_APP_FLAVOR STREQUAL "staging")
        set(APPLICATION_ID "com.example.staging")
      elseif(FLUTTER_APP_FLAVOR STREQUAL "production")
        set(APPLICATION_ID "com.example.production")
      endif()
    endif()
    ```

    `APPLICATION_ID` 必須在
    `add_subdirectory(${FLUTTER_MANAGED_DIR})` 之後設定，
    因為 `FLUTTER_APP_FLAVOR` 要到這個位置才會可用，
    同時也必須在使用 `APPLICATION_ID` 的 `add_subdirectory("runner")` 之前設定。

    :::important
    請保持 `set(BINARY_NAME ...)` 不變。
    Flutter CLI 是逐字解析該行來取得可執行檔路徑，
    因此若依 flavor 重新命名二進位檔，
    `flutter run` 就無法啟動應用程式。
    :::

1.  確認你的 flavor 能正確執行：

    執行 `staging` flavor：

    ```console
    $ flutter run -d linux --flavor staging
    ```

    執行 `production` flavor：

    ```console
    $ flutter run -d linux --flavor production
    ```

## 啟動 flavor {:#launch-a-flavor}

為應用程式設定好 flavor 之後，
即可使用 Flutter CLI 的 `--flavor` 旗標
來執行、建置或測試特定的 flavor。

### 以 debug 模式執行 flavor {: #run-a-flavor }

若要在開發期間執行特定的 flavor，
請將 `--flavor` 選項傳給 `flutter run`：

```console
$ flutter run -d linux --flavor <flavor_name>
```

將 `<flavor_name>` 替換為你的 flavor 名稱
（例如 `staging` 或 `production`）。

### 建置 release 二進位檔 {: #build-a-flavor }

若要為特定 flavor 建置 release 可執行檔，
請將 `--flavor` 選項傳給 `flutter build`：

```console
$ flutter build linux --flavor <flavor_name>
```

Flutter 會將編譯好的 bundle 輸出到
`build/linux/<arch>/<flavor_name>/release/bundle/`。

### 以 flavor 執行測試 {: #test-a-flavor }

`--flavor` 選項同樣適用於 `flutter test` 與 `flutter drive`，
讓你能針對特定的 flavor 設定
執行單元測試、元件 (Widget) 測試或整合測試：

```console
$ flutter test --flavor <flavor_name>
```

## 在 Flutter 程式碼中使用 flavor {: #use-flavors-in-code }

加入 flavor 之後，
你可以根據目前啟用的 flavor 調整應用程式行為，
例如選擇 API 端點、
切換功能或設定分析用的金鑰。

Flutter 框架在 `services` 函式庫中提供
`appFlavor` 常數，
用來識別執行或建置應用程式時所使用的 flavor。

1.  **匯入 services 函式庫：**

    在你的 Dart 檔案中加入以下 import：

    ```dart
    import 'package:flutter/services.dart';
    ```

1.  **讀取 flavor 值：**

    在應用程式邏輯中（通常是在 `main()` 裡）使用 `appFlavor` 常數
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
    `appFlavor` 的值與傳給 `--flavor` 旗標的字串相同。
    如果省略 `--flavor`，
    `appFlavor` 會與 `pubspec.yaml` 中設定的[預設 flavor](#set-default-flavor)相同。
    如果兩者都未指定，`appFlavor` 則為 `null`。
    :::

## 自訂設定 {:#customize-configurations}

加入 flavor 之後，
你可以為每個設定自訂原生設定與資源。

### 建立不同的視窗標題 {:#create-distinct-window-titles}

為了在執行階段區分不同的 flavor，
可以為每個 flavor 自訂原生視窗標題。

1.  在 `linux/runner/CMakeLists.txt` 中，緊接在現有的
    `APPLICATION_ID` 定義之後，將 `FLUTTER_APP_FLAVOR`
    作為前置處理器定義傳入：

    ```cmake title="linux/runner/CMakeLists.txt"
    # Add preprocessor definitions for the application ID.
    add_definitions(-DAPPLICATION_ID="${APPLICATION_ID}")

    if(DEFINED FLUTTER_APP_FLAVOR AND NOT FLUTTER_APP_FLAVOR STREQUAL "")
      add_definitions(-DFLUTTER_APP_FLAVOR="${FLUTTER_APP_FLAVOR}")
    endif()
    ```

1.  在 `linux/runner/my_application.cc` 中，於 `my_application_activate` 函式裡
    更新視窗標題：

    ```c title="linux/runner/my_application.cc"
      const gchar* window_title = "flavors_example";
    #ifdef FLUTTER_APP_FLAVOR
      if (g_strcmp0(FLUTTER_APP_FLAVOR, "staging") == 0) {
        window_title = "Staging App";
      } else if (g_strcmp0(FLUTTER_APP_FLAVOR, "production") == 0) {
        window_title = "Production App";
      }
    #endif
    ```

    接著更新 `my_application_activate`，改用 `window_title`
    取代寫死的字串常值：

    ```c title="linux/runner/my_application.cc"
        gtk_header_bar_set_title(header_bar, window_title);
        // ...
        gtk_window_set_title(window, window_title);
    ```

### 設定應用程式圖示 {:#configure-app-icons}

在 Linux 上，應用程式圖示不會直接嵌入編譯後的
可執行二進位檔中。
桌面環境是透過
`.desktop` 啟動器檔案與已安裝的圖示主題來解析應用程式圖示。

若要為每個 flavor 提供不同的圖示或啟動器項目，
請設定你的 Linux 套件格式（例如 Snap、Flatpak 或 Debian
套件），以安裝不同的桌面項目與圖示資源。
若想進一步了解如何打包 Linux 應用程式，請參閱
[建置並發布 Linux 桌面應用程式][Build and release a Linux desktop app]。

### 依 flavor 打包資源 {: #bundle-assets }

如果有些資源只適用於特定的 flavor，
可以設定 Flutter 只在建置該 flavor 時才打包這些資源。
這樣可以避免未使用的資源增加應用程式 bundle 的大小。

若要有條件地打包資源，
請在 `pubspec.yaml` 的資源項目中加入 `flavors` 清單：

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

若要指定在未帶 `--flavor` 旗標時
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

如需更多關於 flavor 與桌面端部署的資訊，
請參考以下資源：

* [為 Android 設定 Flutter flavor][Android]
* [為 iOS 與 macOS 設定 Flutter flavor][iOS and macOS]
* [為 Windows 設定 Flutter flavor][Windows]
* [建置並發布 Linux 桌面應用程式][Build and release a Linux desktop app]

[Android]: /deployment/flavors
[iOS and macOS]: /deployment/flavors-ios
[Windows]: /deployment/flavors-windows
[Build and release a Linux desktop app]: /deployment/linux

