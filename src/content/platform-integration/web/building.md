---
title: 使用 Flutter 建置網頁應用程式
description: 建立 Flutter 網頁應用程式的操作指引。
shortTitle: 網頁開發
---

本頁將概述如何使用 Flutter 設定、執行及建置網頁應用程式。

## 系統需求

在開始使用 Flutter 建置網頁應用程式之前，
請確保已安裝 [Flutter SDK][Flutter SDK] 以及網頁瀏覽器。
詳細步驟請參考 [Set up web development for Flutter][Setup-web] 指引。

## 設定 Flutter 專案

你可以建立新的 Flutter 專案，
或為現有專案新增網頁支援。

### 建立新專案

若要建立包含網頁支援的新應用程式，請執行以下指令：

```console
$ flutter create my_app
```

### 為現有專案新增 Web 支援

如果你已經有一個專案，請在你的專案目錄中執行 `flutter create` 指令：

```console
$ flutter create . --platforms web
```

這會建立一個 `web/` 目錄，裡面包含用於啟動與執行你的 Flutter 應用程式的網頁資源。

## 執行你的應用程式

請參閱以下章節來執行你的應用程式。

### 透過命令列執行你的應用程式

選擇 [Chrome][Chrome] 作為你的應用程式目標裝置，即可執行與除錯 Flutter Web 應用程式：

```console
$ flutter run -d chrome
```

你也可以在你的 IDE 中選擇 Chrome 作為目標裝置。

如果你希望，也可以在 Windows 上使用 `edge` 裝置類型，
或使用 `web-server` 來在你選擇的瀏覽器中導覽本機 URL。

<a id="hot-reload-web" aria-hidden="true" ></a>

:::note Web 熱重載（Hot reload）
自 Flutter 3.35 版本起，
Web 熱重載（hot reload）預設已啟用。
[熱重啟（Hot restart）][Hot restart] 仍然可用。

如果你發現任何問題，請使用我們的 [Web Hot Reload issue template][Web Hot Reload issue template] 回報錯誤。
請注意，這是在 Dart SDK 儲存庫中，方便我們追蹤問題。已知問題可在相關的 [GitHub project][GitHub project] 查看。
:::

### 使用 WebAssembly 執行你的應用程式

你可以傳遞 `--wasm` 旗標，以使用 WebAssembly 執行你的應用程式：

```console
$ flutter run -d chrome --wasm
```

Flutter Web 提供多種建置模式與繪製器（renderers）。
如需更多資訊，請參閱 [Web renderers][Web renderers]。

### 在 VS Code 中停用 hot reload

若要暫時停用 VS Code 的 hot reload 支援，
請在你的 [`launch.json` file][`launch.json` file] 檔案中加入
旗標 `--no-web-experimental-hot-reload`。

```plaintext
"configurations": [
    ...
    {
      "name": "Flutter for web (hot reload disabled)",
      "type": "dart",
      "request": "launch",
      "program": "lib/main.dart",
      "args": [
        "-d",
        "chrome",
        "--no-web-experimental-hot-reload",
      ]
    }
  ]
```

### 從命令列停用熱重載

如果你在命令列 (Command Line Interface) 使用 `flutter run`，
可以暫時透過以下指令在網頁端停用熱重載 (hot reload)：

```console
flutter run -d chrome --no-web-experimental-hot-reload
```

### 在 DartPad 中使用熱重載（Hot reload）

DartPad 現在也支援熱重載（Hot reload），並新增了「Reload」按鈕。
此功能僅在偵測到 Flutter 正在執行的應用程式時才可用。
你可以透過選擇 DartPad 提供的範例應用程式，開始一個支援熱重載的工作階段。

[Hot restart]: /tools/hot-reload
[How to switch channels]: /install/upgrade#switching-flutter-channels
[`launch.json` file]: https://code.visualstudio.com/docs/debugtest/debugging-configuration
[Web Hot Reload issue template]: {{site.github}}/dart-lang/sdk/issues/new?template=5_web_hot_reload.yml
[GitHub project]: {{site.github}}/orgs/dart-lang/projects/107/views/1

## 建置你的應用程式

請參閱以下各節來建置你的應用程式。

### 透過命令列建置你的應用程式

執行下列指令以產生發行版（release）建置：

```console
$ flutter build web
```

### 使用 WebAssembly 建置你的應用程式
你也可以傳遞 `--wasm` 旗標，透過 WebAssembly 來建置你的應用程式：

```console
$ flutter build web --wasm
```

這會將建置後的檔案填入`build/web`目錄，
其中包含`assets`目錄，
這些檔案需要一起提供服務（serve）。

如需瞭解如何將這些資源 (assets) 部署到 Web，請參閱
[建置與發布 Web 應用程式][Build and release a web app]。
如需其他常見問題的解答，請參閱 [Web 常見問答集 (FAQ)][Web FAQ]。

## 除錯 (Debugging)

請使用 [Flutter DevTools][Flutter DevTools] 執行下列工作：

* [除錯][Debugging]
* [日誌記錄][Logging]
* [執行 Flutter 檢查器 (inspector)][Running Flutter inspector]

請使用 [Chrome DevTools][Chrome DevTools] 執行下列工作：

* [產生事件時間軸][Generating event timeline]
* [效能分析][Analyzing performance] &mdash; 請務必使用
  profile build（效能分析建置）

## 測試 (Testing)

請使用 [元件測試 (widget tests)][Widget tests] 或整合測試 (integration tests)。如需在瀏覽器中執行整合測試的詳細資訊，請參閱 [整合測試 (Integration testing)][Integration testing] 頁面。

[Analyzing performance]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance
[Build and release a web app]: /deployment/web
[Chrome DevTools]: {{site.developers}}/web/tools/chrome-devtools
[Chrome]: https://www.google.com/chrome/
[Debugging]: /tools/devtools/debugger
[Flutter DevTools]: /tools/devtools
[Flutter SDK]: /get-started
[Generating event timeline]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference
[Integration testing]: /testing/integration-tests#test-in-a-web-browser
[Logging]: /tools/devtools/logging
[Running Flutter inspector]: /tools/devtools/inspector
[Setup-web]: {{site.url}}/platform-integration/web/setup
[Web FAQ]: /platform-integration/web/faq
[Web renderers]: /platform-integration/web/renderers
[Widget tests]: /testing/overview#widget-tests

