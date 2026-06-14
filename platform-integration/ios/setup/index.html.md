# 設定 iOS 開發環境

> 設定您的開發環境，以便在 iOS 裝置上執行、建置與部署 Flutter 應用程式。



瞭解如何設定您的開發環境，
以便在 iOS 裝置上執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未安裝 Flutter，
請先參閱並依照 [Install Flutter][] 指南進行。

如果您已經安裝過 Flutter，
請確保其為[最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## 設定 iOS 工具鏈 {: #set-up-tooling}

使用 Xcode，您可以在
iOS 實體裝置或 iOS 模擬器上執行 Flutter 應用程式。

 1. <h3>安裝 Xcode</h3>

    如果您尚未安裝，
    請[安裝並設定最新版 Xcode][xcode]。

    如果您已經安裝過 Xcode，
    請使用您原本的安裝方式將其更新至最新版。

 1. <h3>設定 Xcode 命令列工具</h3>

    若要設定 Xcode 命令列工具，讓其使用您安裝的 Xcode 版本，
    請在您偏好的終端機中執行下列指令：

    ```console
    $ sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
    ```

    如果你是在其他地方下載 Xcode，或需要使用不同版本，請將 `/Applications/Xcode.app` 替換為該路徑。

 1. <h3>同意 Xcode 授權條款</h3>

    在你完成 Xcode 的安裝並設定其命令列工具後，請同意 Xcode 的授權條款。

    1. 開啟你偏好的終端機。

    1. 執行以下指令來檢視並簽署 Xcode 授權條款。

       ```console
       $ sudo xcodebuild -license
       ```

    1. 閱讀並同意所有必要的授權條款。

       在同意每一份授權條款之前，
       請仔細閱讀每一項內容。

 1. <h3>下載前置工具</h3>

    若要下載 iOS 平台支援與
    最新的 iOS Simulator 執行環境，
    請在你偏好的終端機中執行以下指令。

    ```console
    $ xcodebuild -downloadPlatform iOS
    ```

 1. <h3>安裝 CocoaPods</h3>

    為了支援使用原生 iOS 或 macOS 程式碼的 [Flutter 插件][Flutter plugins]，
    請安裝最新版的 [CocoaPods][]。

    請依照 [CocoaPods 安裝指南][CocoaPods installation guide] 來安裝 CocoaPods。

    如果你已經安裝過 CocoaPods，
    請依照 [CocoaPods 更新指南][CocoaPods update guide] 來進行更新。

{: .steps}

[xcode]: https://developer.apple.com/xcode/
[cocoapods]: https://guides.cocoapods.org/using/getting-started.html#installation
[Flutter plugins]: /packages-and-plugins/developing-packages#types
[CocoaPods installation guide]: https://guides.cocoapods.org/using/getting-started.html#installation
[CocoaPods update guide]: https://guides.cocoapods.org/using/getting-started.html#updating-cocoapods

## 設定 iOS 裝置 {: #set-up-devices}

我們建議你先從 iOS 模擬器（Simulator）開始，
因為它比實體 iOS 裝置更容易設定。
不過，你也應該在實際的實體裝置上測試你的應用程式。

<Tabs key="ios-simulator-or-physical-device">
<Tab name="Simulator">

請使用以下指令啟動 iOS 模擬器（Simulator）：

```console
$ open -a Simulator
```

如果你需要安裝不同作業系統版本的模擬器，
請參考 Apple Developer 網站上的[下載與安裝額外 Xcode 元件][Downloading and installing additional Xcode components]。

[Downloading and installing additional Xcode components]: https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components

</Tab>
<Tab name="Physical device">

[Flutter on latest iOS]: /platform-integration/ios/ios-latest

請為每一台你想要測試的 iOS 裝置進行設定。

 1. <h3>設定你的實體 iOS 裝置</h3>

    1. 將你的 iOS 裝置連接到 Mac 的 USB 埠。

    1. 第一次將 iOS 裝置連接到 Mac 時，
       裝置會顯示 **要信任這台電腦嗎？（Trust this computer?）** 對話框。

    1. 點擊 **信任（Trust）**。

       ![信任 Mac](/assets/images/docs/setup/trust-computer.png)

 1. <h3>設定你的實體 iOS 裝置</h3>

    為了防止惡意軟體，Apple 要求你在裝置上啟用 **[開發者模式（Developer Mode）][Developer Mode]**。

    1. 點選 **設定（Settings）** <span aria-label="and then">></span>
       **隱私權與安全性（Privacy & Security）** <span aria-label="and then">></span>
       **開發者模式（Developer Mode）**。

    1. 點擊切換 **開發者模式** 為 **開啟（On）**。

    1. 重新啟動裝置。

    1. 當出現 **要開啟開發者模式嗎？（Turn on Developer Mode?）** 對話框時，
       點擊 **開啟（Turn On）**。

 1. <h3>建立開發者簽署憑證</h3>

    即使只是測試，也必須在 Mac 與你的 iOS 裝置之間建立信任，
    才能將應用程式傳送到實體 iOS 裝置。
    除了在彈出視窗時信任裝置外，還必須將已簽署的
    開發者憑證上傳到你的裝置。

    若要建立已簽署的開發憑證，
    你需要一個 Apple ID。
    如果你還沒有，請[註冊一個][apple-account-new]。
    你也必須加入 [Apple Developer program][]
    並建立 [Apple Developer 帳號][Apple Developer account]。
    如果你只是要在 iOS 裝置上_測試_你的應用程式，
    個人 Apple Developer 帳號是免費且可用的。

    :::note Apple Developer program
    如果你想要將應用程式_發佈_到 App Store，
    就需要將個人 Apple Developer 帳號升級為
    專業帳號。
    :::

 1. <h3>準備裝置</h3>

    1. 在 **設定（Settings）** 中找到 **VPN 與裝置管理（VPN & Device Management）** 選單。

       將你的憑證切換為 **啟用（Enable）**。

       :::note
       如果你找不到 **VPN 與裝置管理** 選單，
       請先在 iOS 裝置上執行一次你的應用程式，再重試一次。
       :::

    1. 在 **Developer App** 標題下，
       你應該可以找到你的憑證。

    1. 點擊該憑證。

    1. 點擊 **信任「&lt;certificate&gt;」**。

    1. 當對話框顯示時，點擊 **信任（Trust）**。

       如果出現 **codesign wants to access key...** 對話框：

       1. 輸入你的 macOS 密碼。

       1. 點擊 **一律允許（Always Allow）**。

{: .steps}

[apple-account-new]: https://support.apple.com/en-us/108647
[Developer Mode]: https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device
[Apple Developer program]: https://developer.apple.com/programs/
[Apple Developer account]: https://developer.apple.com/account

</Tab>
</Tabs>

---

## 開始為 iOS 開發 {: #start-developing}

**恭喜你。**
現在你已經完成 Flutter 的 iOS 開發環境設定，
可以在 iOS 上測試並繼續你的 Flutter 學習之旅，
或開始強化與 iOS 的整合。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash 幫助你探索 Flutter 學習資源。">
    </div>
    <div class="card-header">
      <span class="card-title">繼續學習 Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">學習基礎知識</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widgets)</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">瀏覽範例</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多裝置上的示意圖。">
    </div>
    <div class="card-header">
      <span class="card-title">為 iOS 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/ios">建置並部署到 iOS</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/bind-native-code">綁定原生 iOS 程式碼</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/apple-frameworks">善用系統 Frameworks</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/platform-views">嵌入原生 iOS 視圖</a>
        </li>
        <li>
          <a class="text-button" href="/packages-and-plugins/swift-package-manager/for-app-developers">使用 Swift Package Manager</a>
        </li>
      </ul>
    </div>
  </div>
</div>

