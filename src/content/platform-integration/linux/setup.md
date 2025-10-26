---
title: 設定 Linux 開發環境
description: >-
  設定您的開發環境，以在 Linux 桌面端執行、建置與部署 Flutter 應用程式。
---

學習如何設定您的開發環境，
以在 Linux 桌面平台執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未安裝 Flutter，
請先參閱並依照 [Get started with Flutter][Get started with Flutter] 指南操作。

如果您已經安裝過 Flutter，
請確保其為[最新版本][up to date]。
:::

[Get started with Flutter]: /get-started
[up to date]: /install/upgrade

## 設定開發工具 {: #set-up-tooling}

若要在 Linux 上執行與除錯桌面版 Flutter 應用程式，
請下載並安裝必要的套件。

請使用您偏好的套件管理工具或安裝方式，
安裝下列套件的最新版本：

- `clang`
- `cmake`
- `ninja-build`
- `pkg-config`
- `libgtk-3-dev`
- `libstdc++-12-dev`

在如 Ubuntu 等基於 Debian 的發行版，使用 `apt-get` 時，
可透過以下指令安裝這些套件：

```console
$ sudo apt-get update -y && sudo apt-get upgrade -y
$ sudo apt-get install -y clang cmake ninja-build pkg-config libgtk-3-dev libstdc++-12-dev
```

## 驗證您的設定 {: #validate-setup}

 1. <h3>檢查工具鏈問題</h3>

    若要檢查您的 Linux 開發環境是否有任何問題，
    請在您偏好的終端機中執行 `flutter doctor` 指令：

    ```console
    $ flutter doctor -v
    ```

    如果你在 **Linux toolchain** 區段下看到任何錯誤或待完成的任務，請先完成並解決這些問題，然後再次執行 `flutter doctor -v` 來驗證變更。

 1. <h3>檢查 Linux 裝置</h3>

    為了確保 Flutter 能正確找到並連接你的 Linux 裝置，請在你偏好的終端機中執行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    如果你已正確完成所有設定，
    應該會看到至少有一個平台標記為 **linux** 的項目。

 1. <h3>疑難排解設定問題</h3>

    如果你在解決設定問題時需要協助，
    請參考 [安裝與設定疑難排解][Install and setup troubleshooting]。

    如果你仍有問題或疑問，
    歡迎在 Flutter 的 [社群][community] 頻道上聯繫我們。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot
[community]: {{site.main-url}}/community

## 開始為 Linux 開發 {: #start-developing}

恭喜你！
現在你已完成 Flutter 的 Linux 桌面開發環境設定，
可以一邊在 Linux 上測試，一邊繼續學習 Flutter，
或開始擴展與 Linux 的整合。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash 幫助你探索 Flutter 學習資源。">
    </div>
    <div class="card-header">
      <span class="card-title">持續學習 Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/get-started/codelab">撰寫你的第一個應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/get-started/fundamentals">學習基礎知識</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widgets)</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">瀏覽範例</a>
        </li>
        <li>
          <a class="text-button" href="/resources/bootstrap-into-dart">了解 Dart 語言</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="Flutter 桌面支援的輪廓圖。">
    </div>
    <div class="card-header">
      <span class="card-title">為 Linux 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/linux/building">建置 Linux 應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/linux">發佈 Linux 應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">撰寫 Linux 專屬程式碼</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages?q=platform%3Alinux+is%3Aplugin">Linux 專用 Flutter 套件 (Plugins)</a>
        </li>
        <li>
          <a class="text-button" href="https://github.com/ubuntu-flutter-community/yaru_tutorial">設計 Ubuntu 主題應用程式</a>
        </li>
      </ul>
    </div>
  </div>
</div>
