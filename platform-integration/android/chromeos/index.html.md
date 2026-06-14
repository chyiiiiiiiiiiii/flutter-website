# 以 Flutter 為 Android 應用程式支援 ChromeOS

> 使用 Flutter 為 ChromeOS 建置時需注意的平台專屬事項。



本頁說明在使用 Flutter 建置
支援 ChromeOS 的 Android 應用程式時，需特別注意的事項。

## Flutter & ChromeOS 技巧與提示

在目前版本的 ChromeOS 中，只有特定的 Linux 連接埠會對外開放給其他環境使用。
以下是一個範例，說明如何在 Android 應用程式中啟動
Flutter DevTools，並使用可用的連接埠：

```console
$ flutter pub global run devtools --port 8000
$ cd path/to/your/app
$ flutter run --observatory-port=8080
```

然後，在你的 Chrome 瀏覽器中導航至 http://127.0.0.1:8000/#，並輸入你的應用程式的，並輸入你的應用程式的 URL。你剛才執行的最後一個 `flutter run` 指令，應該會輸出一個類似 `http://127.0.0.1:8080/auth_code=/` 格式的 URL。請使用這個 URL，然後選擇「Connect」來啟動你的 Android 應用程式的 Flutter DevTools。

#### Flutter ChromeOS 程式碼檢查（lint analysis）

Flutter 提供了專為 ChromeOS 設計的程式碼檢查（lint analysis）機制，以確保你正在建置的應用程式能夠在 ChromeOS 上良好運作。這些檢查會尋找以下內容：

- 在 Android Manifest 中要求但 ChromeOS 裝置上不可用的必要硬體
- 暗示請求不支援硬體的權限
- 以及其他可能導致這些裝置上體驗不佳的屬性或程式碼

若要啟用這些檢查，你需要在專案資料夾中建立一個新的 `analysis_options.yaml` 檔案，並將這些選項包含進去。（如果你已經有 `analysis_options.yaml` 檔案，也可以直接更新它）

```yaml
include: package:flutter/analysis_options_user.yaml
analyzer:
 optional-checks:
   chrome-os-manifest-checks
```

若要從命令列執行這些操作，請使用以下指令：

```console
$ flutter analyze
```

此指令的範例輸出可能如下所示：

```console
Analyzing ...
warning • This hardware feature is not supported on ChromeOS •
android/app/src/main/AndroidManifest.xml:4:33 • unsupported_chrome_os_hardware
```

