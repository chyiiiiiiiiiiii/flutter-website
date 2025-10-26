---
title: 設定 macOS 開發環境
description: >-
  設定您的開發環境，以在 macOS 裝置上執行、建置與部署 Flutter 應用程式。
---

瞭解如何設定您的開發環境，
以在 macOS 桌面平台上執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未安裝 Flutter，
請先參閱並依照 [Get started with Flutter][Get started with Flutter] 指南操作。

如果您已經安裝過 Flutter，
請確保其為[最新版本][up to date]。
:::

[Get started with Flutter]: /get-started
[up to date]: /install/upgrade

## 設定開發工具 {: #set-up-tooling}

透過 Xcode，您可以在 macOS 上執行 Flutter 應用程式，
同時也能編譯與除錯原生 Swift 及 Objective-C 程式碼。

 1. <h3>安裝 Xcode</h3>

    如果您尚未安裝，
    請[安裝並設定最新版的 Xcode][xcode]。

    如果您已經安裝過 Xcode，
    請使用您原本的安裝方式將其更新至最新版本。

 1. <h3>設定 Xcode 命令列工具</h3>

    若要將 Xcode 命令列工具設定為使用您安裝的 Xcode 版本，
    請在您偏好的終端機中執行下列指令：

    ```console
    $ sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
    ```

    如果你是從其他地方下載 Xcode，或需要使用不同版本，請將 `/Applications/Xcode.app` 替換為該路徑。

 1. <h3>同意 Xcode 授權條款</h3>

    在你完成 Xcode 安裝並設定其命令列工具（Command Line Tools）後，請同意 Xcode 的授權條款。

    1. 開啟你偏好的終端機。

    1. 執行以下指令以檢閱並簽署 Xcode 授權條款。

       ```console
       $ sudo xcodebuild -license
       ```

    1. 閱讀並同意所有必要的授權條款。

       在同意每份授權條款之前，
       請仔細閱讀每一份內容。

       當你成功接受所有必要的授權條款後，
       指令會輸出如何檢視這些授權條款的說明。

 1. <h3>安裝 CocoaPods</h3>

    若要支援使用原生 macOS 程式碼的 [Flutter 外掛][Flutter plugins]，
    請安裝最新版的 [CocoaPods][CocoaPods]。

    請依照 [CocoaPods 安裝指南][CocoaPods installation guide] 進行安裝。

    如果你已經安裝過 CocoaPods，
    請依照 [CocoaPods 更新指南][CocoaPods update guide] 進行更新。

{: .steps}

[xcode]: https://developer.apple.com/xcode/
[Flutter plugins]: /packages-and-plugins/developing-packages#types
[CocoaPods]: https://cocoapods.org/
[CocoaPods installation guide]: https://guides.cocoapods.org/using/getting-started.html#installation
[CocoaPods update guide]: https://guides.cocoapods.org/using/getting-started.html#updating-cocoapods

## 驗證你的設定 {: #validate-setup}

 1. <h3>檢查工具鏈問題</h3>

    若要檢查你的 macOS 開發環境是否有任何問題，
    請在你偏好的終端機中執行 `flutter doctor` 指令：

    ```console
    $ flutter doctor -v
    ```

    如果你在 **Xcode** 區塊下看到任何錯誤或待完成的事項，請完成並解決這些問題，然後再次執行 `flutter doctor -v` 以驗證變更。

 1. <h3>檢查 macOS 裝置</h3>

    為確保 Flutter 能正確找到並連接你的 macOS 裝置，請在你偏好的終端機中執行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    如果你已正確完成所有設定，
    應該會有至少一個項目，其平台標記為 **macos**。

 1. <h3>疑難排解設定問題</h3>

    如果你需要協助解決任何設定相關的問題，
    請參考 [安裝與設定疑難排解][Install and setup troubleshooting]。

    如果你仍然遇到問題或有其他疑問，
    歡迎在 Flutter 的 [社群][community] 頻道上尋求協助。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot
[community]: {{site.main-url}}/community

## 開始為 macOS 開發 {: #start-developing}

恭喜你！
現在你已經完成 Flutter 的 macOS 桌面開發環境設定，
可以一邊在 macOS 上測試，一邊持續你的 Flutter 學習之旅，
或開始擴展與 macOS 的整合。

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
          <a class="text-button" href="/resources/bootstrap-into-dart">認識 Dart</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="Flutter 桌面支援的輪廓圖。">
    </div>
    <div class="card-header">
      <span class="card-title">為 macOS 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/macos">建置並部署至 macOS</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/macos/c-interop">綁定原生 macOS 程式碼</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/macos/platform-views">嵌入原生 macOS 視圖</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/flavors-ios">設定應用程式風味</a>
        </li>
        <li>
          <a class="text-button" href="/packages-and-plugins/swift-package-manager/for-app-developers">使用 Swift 套件管理器 (Swift Package Manager)</a>
        </li>
      </ul>
    </div>
  </div>
</div>
