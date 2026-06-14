# Flutter 編輯器支援

> Dart 與 Flutter 的編輯器支援。



你可以使用任何文字編輯器或整合式開發環境（IDE），
搭配 Flutter 的命令列工具來開發 Flutter 應用程式。

Flutter 團隊建議使用支援 Flutter 擴充功能或插件的編輯器，例如 VS Code 和 Android Studio。
這些插件提供程式碼自動完成、語法高亮、元件 (Widget) 編輯輔助、除錯支援等多種功能。

## 本地端編輯器

Flutter 團隊提供 VS Code、Android Studio 和 IntelliJ 的插件支援。
這些插件提供完整的開發與除錯功能，並且與 [Dart analyzer][] 及 [Dart 和 Flutter DevTools][Dart and Flutter DevTools] 深度整合。

<div class="card-grid">
  <a class="card outlined-card" href="/tools/vs-code">
    <div class="card-header">
      <span class="card-title">Visual Studio Code</span>
    </div>
    <div class="card-content">
      <p>在精簡且可自訂的程式碼編輯器中開發與除錯 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/tools/android-studio">
    <div class="card-header">
      <span class="card-title">Android Studio 和 IntelliJ</span>
    </div>
    <div class="card-content">
      <p>在具備豐富語言支援與整合工具的 IDE 中開發與除錯 Flutter 應用程式。</p>
    </div>
  </a>
</div>

[Dart analyzer]: https://dart.dev/tools/analysis
[Dart and Flutter DevTools]: /tools/devtools

## 線上編輯器

你可以透過以下其中一種線上編輯器，無需本地端安裝，即可快速體驗 Flutter。

<div class="card-grid">
  <a class="card outlined-card" href="https://dartpad.dev" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span>DartPad</span>
        <Icon id="open_in_new" size="1rem" />
      </span>
    </div>
    <div class="card-content">
      <p>可在網頁上快速建立並執行簡單的單檔 Flutter 應用程式。</p>
    </div>
  </a>
</div>

## 其他編輯器

你也可以使用其他任何文字編輯器與終端機來開發 Dart 與 Flutter 應用程式。

根據編輯器的不同，你可以整合 Dart SDK 的
[Language Server Protocol][lsp] 和 [Debug Adapter Protocol][dap]，
為 Dart 與 Flutter 啟用進階的程式碼編輯與除錯功能。

[lsp]: https://github.com/dart-lang/sdk/tree/main/pkg/analysis_server/tool/lsp_spec/README.md
[dap]: https://github.com/dart-lang/sdk/blob/main/third_party/pkg/dap/tool/README.md

