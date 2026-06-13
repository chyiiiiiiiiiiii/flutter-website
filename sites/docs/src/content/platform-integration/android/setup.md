---
title: 設定 Android 開發環境
description: >-
  設定您的開發環境，以便在 Android 裝置上執行、建置與部署 Flutter 應用程式。
---

學習如何設定您的開發環境，
以便在 Android 裝置上執行、建置與部署 Flutter 應用程式。

:::warning
如果您尚未安裝 Flutter，
請先參閱並依照 [Install Flutter][] 指南進行操作。

僅安裝 Android Studio 的 Flutter 外掛程式是**不夠**的；
您還必須安裝 Flutter SDK 並將其 `bin` 目錄加入 PATH，
才能使用 `flutter` 指令。
:::

:::note
如果您已經安裝了 Flutter，
請確保其為[最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## 選擇您的開發平台 {: #dev-platform}

本頁的說明以在 **Windows**{:.selected-os-text} 裝置上設定 Android 開發為主。

如果您想查看其他作業系統的相關說明，
請選擇下列其中一項。

<OSSelector />

## 設定 Android 工具鏈 {: #set-up-tooling}

透過 Android Studio，您可以在
實體 Android 裝置或 Android 模擬器上執行 Flutter 應用程式。

如果您尚未安裝，
請安裝並設定最新穩定版本的 [Android Studio][]。

 1. <h3>安裝必要的函式庫</h3>

    如果您是在 Linux 上開發，請先安裝
    Android Studio 所需的[32 位元函式庫前置套件][64bit-libs]。
    {: .linux-only}

 1. <h3>安裝 Android Studio</h3>

    如果尚未安裝，請[安裝並設定][as-install]
    最新穩定版本的 [Android Studio][]。

    如果您已經安裝了 Android Studio，
    請確保其為[最新版本][as-update]。

 1. <h3>安裝 Android SDK 與工具</h3>

    1. 啟動 **Android Studio**。

    1. 開啟 **SDK Manager** 設定對話框。

       1. 如果已開啟 **Welcome to Android Studio** 對話框，
          請點擊 **New Project** 與 **Open** 按鈕後方的 **More Actions** 按鈕，
          然後從下拉選單中選擇 **SDK Manager**。

       1. 如果您已開啟專案，
          請前往 **Tools** <span aria-label="and then">></span> **SDK Manager**。

       {: type="a"}

    1. 如果尚未開啟 **SDK Platforms** 分頁，請切換至該分頁。

    1. 確認第一個 **API Level** 為 **36** 的項目已被選取。

       如果 **Status** 欄顯示
       **Update available** 或 **Not installed**：

       1. 勾選該項目的核取方塊。

       1. 點擊 **Apply**。

       1. 當出現 **Confirm Change** 對話框時，點擊 **OK**。

          這時會顯示 **SDK Component Installer** 對話框及進度指示器。

       1. 安裝完成後，點擊 **Finish**。

       {: type="a"}

    1. 切換至 **SDK Tools** 分頁。

    1. 確認下列 SDK 工具已被選取：

       - **Android SDK Build-Tools**
       - **Android SDK Command-line Tools**
       - **Android Emulator**
       - **Android SDK Platform-Tools**
       - **CMake**
       - **NDK (Side by side)**

    1. 如果上述任一工具的 **Status** 欄顯示
       **Update available** 或 **Not installed**：

       1. 勾選所需工具的核取方塊。

       1. 點擊 **Apply**。

       1. 當出現 **Confirm Change** 對話框時，點擊 **OK**。

          這時會顯示 **SDK Component Installer** 對話框及進度指示器。

       1. 安裝完成後，點擊 **Finish**。

       {: type="a"}

   1. <h3>同意 Android 授權條款</h3>

      在您能夠使用 Flutter 並完成所有前置作業後，
      需要同意 Android SDK 平台的授權條款。

      1. 開啟您偏好的終端機。

      1. 執行下列指令來檢視並簽署 SDK 授權條款。

         ```console
         $ flutter doctor --android-licenses
         ```

      1. 閱讀並接受所有必要的授權條款。

         如果您尚未先前接受過每一份 SDK 授權條款，
         在開發 Android 應用程式前，您需要審閱並同意這些條款。

         在同意每一份授權條款之前，
         請仔細閱讀每一份內容。

         當您成功接受所有必要的授權條款後，
         您應該會看到類似以下的輸出結果：

         ```console
         All SDK package licenses accepted.
         ```

{: .steps}

[Android Studio]: https://developer.android.com/studio
[64bit-libs]: https://developer.android.com/studio/install#64bit-libs
[as-install]: https://developer.android.com/studio/install
[as-update]: https://developer.android.com/studio/intro/update

## 設定 Android 裝置 {: #set-up-devices}

您可以在實體 Android 裝置上進行 Flutter 應用程式的除錯，或是在 Android 模擬器上執行它們。

<Tabs key="android-emulator-or-not">
<Tab name="Android emulator">

若要設定開發環境以在 Android 模擬器上執行 Flutter 應用程式，請依照以下步驟操作：

 1. <h3>設定您的開發裝置</h3>

    在您的開發電腦上啟用 [VM 加速][VM acceleration]。

 1. <h3>建立新的模擬器</h3>

    1. 啟動 **Android Studio**。

    1. 開啟 **Device Manager** 設定對話框。

       1. 如果已開啟 **Welcome to Android Studio** 對話框，
          請點擊 **New Project** 和 **Open** 按鈕後方的 **More Actions** 按鈕，
          然後從下拉選單中選擇 **Virtual Device Manager**。

       1. 如果您已經開啟專案，
          前往 **Tools** <span aria-label="and then">></span>
          **Device Manager**。

       {: type="a"}

    1. 點擊出現為 `+` 圖示的 **Create Virtual Device** 按鈕。

       這時會顯示 **Virtual Device Configuration** 對話框。

    1. 在 **Form Factor** 下選擇 **Phone** 或 **Tablet**。

    1. 選擇一個裝置定義。您可以瀏覽或搜尋裝置。

    1. 點擊 **Next**。

    1. 如果有提供選項，
       請根據您的開發電腦是 x64 還是 Arm64 裝置，選擇 **x86 Images** 或 **ARM Images**。

    1. 選擇您想要模擬的 Android 版本的系統映像檔。

       1. 如果所需映像檔名稱左側有 **Download** 圖示，請點擊它。

          這時會顯示 **SDK Component Installer** 對話框並顯示進度指示器。

       1. 下載完成後，點擊 **Finish**。

       {: type="a"}

    1. 點擊上方標籤列的 **Additional settings**，並捲動到 **Emulated Performance**。

    1. 在 **Graphics acceleration** 下拉選單中，
       選擇包含 **Hardware** 的選項。

       這將啟用[硬體加速][hardware acceleration]，提升渲染效能。

    1. 確認您的虛擬裝置設定。
       如果正確，請點擊 **Finish**。

       想了解更多虛擬裝置資訊，
       請參考 [Create and manage virtual devices][]。

 1. <h3>嘗試啟動模擬器</h3>

    在 **Device Manager** 對話框中，
    點擊您想要的虛擬裝置右側的 **Run** 圖示。

    模擬器應會啟動，並顯示您所選 Android 作業系統版本與裝置的預設畫面。

{: .steps}

[VM acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration#accel-vm
[hardware acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration
[Create and manage virtual devices]: {{site.android-dev}}/studio/run/managing-avds

</Tab>
<Tab name="Physical device">

若要設定開發環境以在實體 Android 裝置上執行 Flutter 應用程式，請依照以下步驟操作：

 1. <h3>設定您的裝置</h3>

    如 [Configure on-device developer options][] 所述，
    在您的裝置上啟用**開發人員選項**與 **USB 除錯**。

 1. <h3>啟用無線除錯</h3>

    若要使用無線除錯，
    請依照 [Connect to your device using Wi-Fi][] 的說明，
    在您的裝置上啟用**無線除錯**。
    {: .windows-only}

 1. <h3>安裝平台相依前置需求</h3>

    如果您是在 Windows 上開發，請先依照
    [Install OEM USB drivers][] 的說明，
    為您的裝置安裝必要的 USB 驅動程式。

 1. <h3>連接您的裝置</h3>

    將您的裝置插入電腦。
    若裝置出現提示，
    請授權您的電腦存取 Android 裝置。

 1. <h3>確認裝置連線</h3>

    若要確認 Flutter 是否辨識到您已連接的 Android 裝置，
    請在您偏好的終端機執行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    您的裝置應該會被偵測到，並顯示為已連接的裝置。

{: .steps}

[Configure on-device developer options]: {{site.android-dev}}/studio/debug/dev-options
[Connect to your device using Wi-Fi]: {{site.android-dev}}/studio/run/device#wireless
[Install OEM USB drivers]: {{site.android-dev}}/studio/run/oem-usb

</Tab>
</Tabs>

## 驗證您的設定 {: #validate-setup}

 1. <h3>檢查工具鏈問題</h3>

    若要檢查您的 Android 開發環境是否有任何問題，
    請在您偏好的終端機中執行 `flutter doctor` 指令：

    ```console
    $ flutter doctor
    ```

    如果您在 **Android toolchain** 或 **Android Studio** 區塊下看到任何錯誤或待完成的事項，

    請完成所有提及的任務，然後再次執行 `flutter doctor` 來驗證變更。

 1. <h3>檢查 Android 裝置</h3>

    為了確保您正確設定了模擬器和/或實體 Android 裝置，
    請在您偏好的終端機中執行 `flutter emulators` 和 `flutter devices`：

    ```console
    $ flutter emulators && flutter devices
    ```

    根據您是設定模擬器還是實體裝置，
    至少應該會有一個項目，其平台標記為 **android**。

 1. <h3>疑難排解安裝問題</h3>

    如果您需要協助解決任何安裝問題，
    請參考[安裝與設定疑難排解][Install and setup troubleshooting]。

    如果您仍然遇到問題或有其他疑問，
    歡迎在 Flutter 的[社群][community]頻道上尋求協助。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot#android-setup
[community]: {{site.main-url}}/community

## 開始為 Android 開發 {: #start-developing}

恭喜您！
現在您已經完成 Flutter 的 Android 開發環境設定，
您可以繼續學習 Flutter 並在 Android 上進行測試，
或是開始加強與 Android 的整合。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash 幫助您探索 Flutter 學習資源。">
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
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widget)</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">瀏覽範例</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多個裝置上的呈現。">
    </div>
    <div class="card-header">
      <span class="card-title">為 Android 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/android">建置並部署到 Android</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/bind-native-code">綁定原生 Android 程式碼</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/splash-screen">新增啟動畫面</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/platform-views">嵌入原生 Android 視圖</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/predictive-back">支援預測式返回</a>
        </li>
      </ul>
    </div>
  </div>
</div>
