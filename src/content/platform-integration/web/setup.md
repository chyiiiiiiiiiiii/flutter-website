---
title: 設定網頁開發環境
description: >-
  設定您的開發環境，以在網頁平台上執行、建置與部署 Flutter 應用程式。
---

學習如何設定您的開發環境，
以在網頁平台上執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未安裝 Flutter，
請先參閱並依照 [Get started with Flutter][Get started with Flutter] 指南操作。

如果您已經安裝過 Flutter，
請確保其為[最新版本][up to date]。
:::

[Get started with Flutter]: /get-started
[up to date]: /install/upgrade

## 安裝網頁瀏覽器 {: #install}

要在網頁上執行與除錯您的 Flutter 應用程式，
請[下載並安裝 Google Chrome][chrome-install]
或[安裝並使用 Microsoft Edge][edge-install]。

<details>
<summary>展開以查看其他瀏覽器的說明</summary>

如果您希望在其他網頁瀏覽器中除錯應用程式，
可以使用 `flutter run -d web-server` 指令，
並手動在您偏好的瀏覽器中前往指定的 URL。

請注意，在 `web-server` 模式下的除錯支援有限。

</details>


[chrome-install]: https://www.google.com/chrome/
[edge-install]: https://www.microsoft.com/edge

## 驗證您的設定 {: #validate-setup}

為了確保您已成功安裝瀏覽器，
且 Flutter 能夠正確偵測到它，
請在您偏好的終端機中執行 `flutter devices`。

您應該至少會看到一個已連線的裝置，
標示為 **Chrome (web)** 或 **Edge (web)**，類似如下範例：

```console highlightLines=4
$ flutter devices

Found 1 connected devices:
  Chrome (web)    • chrome • web-javascript • Google Chrome
```

如果找不到該指令，或是沒有看到 Chrome 被列出，
請參考[設定疑難排解][troubleshoot]。

[troubleshoot]: /install/troubleshoot

## 開始為 Web 開發 {: #start-developing}

現在你已經完成 Flutter 的 Web 開發環境設定，
可以在學習 Flutter 的同時於 Web 上測試，
或開始擴展與 Web 的整合。

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
          <a class="text-button" href="/resources/bootstrap-into-dart">認識 Dart 語言</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多裝置上的呈現。">
    </div>
    <div class="card-header">
      <span class="card-title">為 Web 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/building">使用 Flutter 建置 Web 應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/initialization">自訂應用程式初始化</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/wasm">編譯為 Wasm</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/web-content-in-flutter">整合 Web 內容</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/embedding-flutter-web">嵌入至其他 Web 應用程式</a>
        </li>
      </ul>
    </div>
  </div>
</div>
