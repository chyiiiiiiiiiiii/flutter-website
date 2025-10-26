---
title: 以 Flutter 針對 ChromeOS 開發
description: 使用 Flutter 為 ChromeOS 建構應用程式時的平臺專屬注意事項。
---

本頁說明使用 Flutter 開發支援 ChromeOS 的 Android 應用程式時，需特別注意的事項。

## Flutter & ChromeOS 技巧與提示

在目前版本的 ChromeOS 中，只有部分來自 Linux 的埠口會對外開放給其他環境使用。
以下是一個範例，說明如何在可用埠口下，為 Android 應用程式啟動 Flutter DevTools：

```console
$ flutter pub global run devtools --port 8000
$ cd path/to/your/app
$ flutter run --observatory-port=8080
```

然後，在你的 Chrome 瀏覽器中導航至 http://127.0.0.1:8000/#，並輸入你的應用程式的，並輸入你的應用程式的 URL。你剛剛執行的最後一個 `flutter run` 指令，應該會輸出一個類似 `http://127.0.0.1:8080/auth_code=/` 格式的 URL。請使用這個 URL，然後選擇「Connect」來啟動 Flutter DevTools，開始針對你的 Android 應用程式進行調試。

#### Flutter ChromeOS 程式碼檢查（lint analysis）

Flutter 提供專為 ChromeOS 設計的程式碼檢查（lint analysis），以確保你正在建置的應用程式能夠在 ChromeOS 上良好運作。這些檢查會尋找以下幾種情況：

- 在 Android Manifest 中要求但 ChromeOS 裝置上不存在的必要硬體
- 暗示請求不支援硬體的權限
- 以及其他可能導致在這些裝置上體驗不佳的屬性或程式碼

若要啟用這些檢查，你需要在專案資料夾中建立一個新的 `analysis_options.yaml` 檔案，並將這些選項包含進去。（如果你已經有現有的 `analysis_options.yaml` 檔案，也可以直接更新它）

```yaml
include: package:flutter/analysis_options_user.yaml
analyzer:
 optional-checks:
   chrome-os-manifest-checks
```

要從命令列執行這些操作，請使用以下指令：

```console
$ flutter analyze
```

此指令的範例輸出可能如下所示：

```console
Analyzing ...
warning • This hardware feature is not supported on ChromeOS •
android/app/src/main/AndroidManifest.xml:4:33 • unsupported_chrome_os_hardware
```
