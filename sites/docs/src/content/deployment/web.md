---
title: 建置與發佈 Web 應用程式
description: 如何準備並發佈 Web 應用程式。
shortTitle: Web
---

在一般的開發週期中，
你會在命令列介面 (Command Line Interface) 上使用 `flutter run -d chrome`
（例如）來測試應用程式。
這會建置出你的應用程式的 _debug_（除錯）版本。

本頁將協助你準備應用程式的 _release_（發佈）版本，
並涵蓋以下主題：

* [建置發佈版本的應用程式](#building-the-app-for-release)
* [部署至 Web](#deploying-to-the-web)
* [部署至 Firebase Hosting](#deploying-to-firebase-hosting)
* [在 Web 上處理圖片](#handling-images-on-the-web)
* [選擇建置模式與渲染器](#choosing-a-build-mode-and-a-renderer)
* [程式碼壓縮（Minification）](#minification)

## 建置發佈版本的應用程式

請使用 `flutter build web` 指令來建置應用程式以進行部署。

```console
flutter build web
```

這個動作會產生應用程式（包含資源），並將檔案放置在專案的 `/build/web` 目錄中。

若要驗證應用程式的發行版本（release build），請啟動一個網頁伺服器（例如 `python -m http.server 8000`，或使用 [dhttpd][] 套件），然後開啟 /build/web 目錄。在瀏覽器中前往 `localhost:8000`（以 Python SimpleHTTPServer 為例），即可檢視應用程式的發行版本。

## 其他建置旗標

你可能需要部署 profile 或 debug 版本以進行測試。
要這麼做，請在 `flutter build web` 指令中加入 `--profile` 或 `--debug` 旗標。
Profile 版本專為使用 Chrome DevTools 進行效能分析而設計，
Debug 版本則可用來設定 dart2js 以支援 assertion 並調整最佳化等級（可使用 `-O` 旗標）。

## 選擇建置模式與渲染器

Flutter Web 提供兩種建置模式（預設與 WebAssembly）以及兩種渲染器（`canvaskit` 和 `skwasm`）。

如需更多資訊，請參閱 [Web renderers][]。

## 部署至 Web

當你準備好部署應用程式時，請將發行套件（release bundle）上傳至 Firebase、雲端或其他類似服務。以下是幾種常見選擇，當然還有其他方式：

* [Firebase Hosting][]
* [GitHub Pages][]
* [Google Cloud Hosting][]

## 部署至 Firebase Hosting

你可以使用 Firebase CLI 來建置並釋出 Flutter 應用程式至 Firebase Hosting。

### 開始之前

首先，請[安裝或更新][install-firebase-cli] Firebase CLI：

```console
npm install -g firebase-tools
```

### 初始化 Firebase

1. 在 [Firebase framework-aware CLI][] 啟用 Web 框架預覽功能：

    ```console
    firebase experiments:enable webframeworks
    ```

2. 在一個空的目錄或現有的 Flutter 專案中，執行初始化指令：

    ```console
    firebase init hosting
    ```

3. 當系統詢問是否要使用 web framework（網頁框架）時，請選擇 `yes`。

4. 如果你目前位於一個空的目錄中，系統會要求你選擇你的 web framework，請選擇 `Flutter Web`。

5. 選擇你的 Hosting 原始目錄（hosting source directory）；這可以是一個現有的 Flutter 應用程式。

6. 選擇一個區域來託管你的檔案。

7. 選擇是否要與 GitHub 設定自動建置與部署。

8. 將應用程式部署到 Firebase Hosting：

    ```console
    firebase deploy
    ```

    執行此指令會自動執行 `flutter build web --release`，
    因此你不需要另外進行應用程式的建置步驟。

如需進一步了解，請參閱官方 [Firebase Hosting][]
Flutter Web 文件。

## 在 Web 上處理圖片

Web 支援標準的 `Image` 元件（Widget）來顯示圖片。
基於設計，網頁瀏覽器會執行不受信任的程式碼，同時不會危害主機電腦。
這使得在圖片處理方面，Web 相較於行動裝置和桌面平台有更多限制。

如需更多資訊，請參閱 [Displaying images on the web][]。

## 程式碼壓縮（Minification）

為了提升應用程式啟動速度，編譯器會透過移除未使用的程式碼（稱為 _tree shaking_ 樹狀搖晃），以及將程式碼符號重新命名為更短的字串（例如將 `AlignmentGeometryTween` 重新命名為像是 `ab`）來減少編譯後程式碼的大小。這兩種最佳化方式的應用，取決於建置模式：

| Web 應用程式建置類型 | 程式碼壓縮？ | 是否執行 tree shaking？ |
|-----------------------|--------------|-------------------------|
| debug                 | 否           | 否                      |
| profile               | 否           | 是                      |
| release               | 是           | 是                      |

## 將 Flutter 應用程式嵌入 HTML 頁面

請參閱 [Embedding Flutter web][]。

[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web

[dhttpd]: {{site.pub}}/packages/dhttpd
[Displaying images on the web]: /platform-integration/web/web-images
[Firebase Hosting]: {{site.firebase}}/docs/hosting/frameworks/flutter
[Firebase framework-aware CLI]: {{site.firebase}}/docs/hosting/frameworks/frameworks-overview
[install-firebase-cli]: {{site.firebase}}/docs/cli#install_the_firebase_cli
[GitHub Pages]: https://pages.github.com/
[give us feedback]: {{site.repo.flutter}}/issues/new?title=%5Bweb%5D:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[Google Cloud Hosting]: https://cloud.google.com/solutions/web-hosting
[Web renderers]: /platform-integration/web/renderers
