---
title: 設定 Android 開發環境
description: >-
  設定您的開發環境，以便在 Android 裝置上執行、建置與部署 Flutter 應用程式。
---

學習如何設定您的開發環境，
以便在 Android 裝置上執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未設定 Flutter，
請先參閱並依照 [開始使用 Flutter][Get started with Flutter] 指南操作。

如果您已經安裝了 Flutter，
請確保其為[最新版本][up to date]。
:::

[Get started with Flutter]: /get-started
[up to date]: /install/upgrade

## 選擇您的開發平台 {: #dev-platform}

本頁說明的操作步驟適用於
**Windows**{:.selected-os-text} 裝置上的 Android 開發環境設定。

如果您希望參考其他作業系統的說明，
請選擇下列其中一項。

{% osSelector %}

## 設定 Android 工具鏈 {: #set-up-tooling}

使用 Android Studio，您可以在
實體 Android 裝置或 Android 模擬器上執行 Flutter 應用程式。

如果尚未安裝，
請安裝並設定最新版的 [Android Studio][Android Studio]。

 1. <h3>安裝必要的函式庫</h3>

    如果您是在 Linux 上開發，請先安裝
    [Android Studio 所需的 32 位元函式庫前置套件][64bit-libs]。
    {: .linux-only}

 1. <h3>安裝 Android Studio</h3>

    如果尚未安裝，請[安裝並設定][as-install]
    最新穩定版本的 [Android Studio][Android Studio]。

    如果您已經安裝了 Android Studio，
    請確保其為[最新版本][as-update]。

 1. <h3>安裝 Android SDK 與工具</h3>

    1. 啟動 **Android Studio**。

    1. 開啟 **SDK Manager** 設定對話框。

       1. 如果出現 **Welcome to Android Studio** 對話框，
          請點選 **New Project** 和 **Open** 按鈕後方的 **More Actions** 按鈕，
          然後在下拉選單中點選 **SDK Manager**。

       1. 如果您已開啟專案，
          前往 **Tools** <span aria-label="and then">></span> **SDK Manager**。

       {: type="a"}

    1. 如果尚未開啟 **SDK Platforms** 分頁，請切換至該分頁。

    1. 確認第一個 **API Level** 為 **36** 的項目已被勾選。

       如果 **Status** 欄顯示
       **Update available** 或 **Not installed**：

       1. 勾選該項目或該列的核取方塊。

       1. 點選 **Apply**。

       1. 當出現 **Confirm Change** 對話框時，點選 **OK**。

          此時會顯示 **SDK Component Installer** 對話框與進度指示器。

       1. 安裝完成後，點選 **Finish**。

       {: type="a"}

    1. 切換至 **SDK Tools** 分頁。

    1. 確認下列 SDK 工具已被勾選：

       - **Android SDK Build-Tools**
       - **Android SDK Command-line Tools**
       - **Android Emulator**
       - **Android SDK Platform-Tools**

    1. 如果上述任何工具的 **Status** 欄顯示
       **Update available** 或 **Not installed**：

       1. 勾選所需工具的核取方塊。

       1. 點選 **Apply**。

       1. 當出現 **Confirm Change** 對話框時，點選 **OK**。

          此時會顯示 **SDK Component Installer** 對話框與進度指示器。

       1. 安裝完成後，點選 **Finish**。

       {: type="a"}

   1. <h3>同意 Android 授權條款</h3>

      在您可以使用 Flutter 並安裝所有必要項目後，
      請同意 Android SDK 平台的授權條款。

      1. 開啟您偏好的終端機。

      1. 執行下列指令以檢視並簽署 SDK 授權條款。

         ```console
         $ flutter doctor --android-licenses
         ```

      1. 閱讀並接受所有必要的授權條款。

         如果你之前尚未接受每一個 SDK 授權條款，
         在開發 Android 應用程式前，你需要先審閱並同意這些條款。

         在同意每一份授權條款之前，
         請仔細閱讀其內容。

         當你成功接受所有必要的授權條款後，
         應該會看到類似以下的輸出結果：

         ```console
         All SDK package licenses accepted.
         ```

{: .steps}

[Android Studio]: https://developer.android.com/studio
[64bit-libs]: https://developer.android.com/studio/install#64bit-libs
[as-install]: https://developer.android.com/studio/install
[as-update]: https://developer.android.com/studio/intro/update

## 設定 Android 裝置 {: #set-up-devices}

你可以在實體 Android 裝置上進行 Flutter 應用程式的除錯，或是在 Android 模擬器上執行。

{% tabs "android-emulator-or-not" %}
{% tab "Android emulator" %}

若要將開發環境設定為可在 Android 模擬器上執行 Flutter 應用程式，請依照下列步驟操作：

 1. <h3>設定你的開發裝置</h3>

    在你的開發電腦上啟用 [VM 加速][VM acceleration]。

 1. <h3>建立新的模擬器</h3>

    1. 啟動 **Android Studio**。

    1. 開啟 **Device Manager** 設定對話框。

       1. 如果已開啟 **Welcome to Android Studio** 對話框，
          請點擊 **New Project** 與 **Open** 按鈕後方的 **More Actions** 按鈕，
          然後從下拉選單中選擇 **Virtual Device Manager**。

       1. 如果你已經開啟了一個專案，
          前往 **Tools** <span aria-label="and then">></span>
          **Device Manager**。

       {: type="a"}

    1. 點擊出現為 `+` 圖示的 **Create Virtual Device** 按鈕。

       這時會顯示 **Virtual Device Configuration** 對話框。

    1. 在 **Form Factor** 下選擇 **Phone** 或 **Tablet**。

    1. 選擇一個裝置定義。你可以瀏覽或搜尋裝置。

    1. 點擊 **Next**。

    1. 如果有提供選項，
       請根據你的開發電腦是 x64 或 Arm64 裝置，
       選擇 **x86 Images** 或 **ARM Images**。

    1. 選擇你想要模擬的 Android 版本的系統映像檔。

       1. 如果所需映像檔名稱左側有 **Download** 圖示，請點擊它。

          這時會顯示帶有進度指示器的 **SDK Component Installer** 對話框。

       1. 下載完成後，點擊 **Finish**。

       {: type="a"}

    1. 點擊頂部標籤列中的 **Additional settings**，並捲動至 **Emulated Performance**。

    1. 在 **Graphics acceleration** 下拉選單中，
       選擇包含 **Hardware** 的選項。

       這會啟用 [硬體加速][hardware acceleration]，提升渲染效能。

    1. 確認你的虛擬裝置設定。如果正確，請點擊 **Finish**。

       想了解更多虛擬裝置相關資訊，
       請參閱 [Create and manage virtual devices][Create and manage virtual devices]。

 1. <h3>嘗試執行模擬器</h3>

    在 **Device Manager** 對話框中，
    點擊你想要的虛擬裝置右側的 **Run** 圖示。

    模擬器應會啟動，並顯示你所選 Android 作業系統版本與裝置的預設畫面。

{: .steps}

[VM acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration#accel-vm
[hardware acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration
[Create and manage virtual devices]: {{site.android-dev}}/studio/run/managing-avds

{% endtab %}
{% tab "Physical device" %}

若要將開發環境設定為可在實體 Android 裝置上執行 Flutter 應用程式，請依照下列步驟操作：

 1. <h3>設定你的裝置</h3>

    如 [Configure on-device developer options][Configure on-device developer options] 所述，
    在你的裝置上啟用 **開發人員選項** 與 **USB 除錯**。

 1. <h3>啟用無線除錯</h3>

    若要使用無線除錯功能，
    請依 [Connect to your device using Wi-Fi][Connect to your device using Wi-Fi] 的說明，
    在你的裝置上啟用 **無線除錯**。
    {: .windows-only}

 1. <h3>安裝平台必要條件</h3>

    如果你在 Windows 上開發，請依 [Install OEM USB drivers][Install OEM USB drivers] 的說明，
    先安裝你裝置所需的 USB 驅動程式。

 1. <h3>連接你的裝置</h3>

    將你的裝置插入電腦。
    若裝置出現提示，
    請授權你的電腦存取 Android 裝置。

 1. <h3>驗證裝置連線</h3>

    若要確認 Flutter 是否已辨識你連接的 Android 裝置，
    請在你偏好的終端機執行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    您的裝置應該會被偵測到，並顯示為已連接的裝置。

{: .steps}

[Configure on-device developer options]: {{site.android-dev}}/studio/debug/dev-options
[Connect to your device using Wi-Fi]: {{site.android-dev}}/studio/run/device#wireless
[Install OEM USB drivers]: {{site.android-dev}}/studio/run/oem-usb

{% endtab %}
{% endtabs %}

## 驗證您的設定 {: #validate-setup}

 1. <h3>檢查工具鏈問題</h3>

    若要檢查您的 Android 開發環境是否有任何問題，
    請在您偏好的終端機中執行 `flutter doctor` 指令：

    ```console
    $ flutter doctor
    ```

    如果你在 **Android toolchain** 或 **Android Studio** 區段下看到任何錯誤或待辦事項，

請完成所有提到的事項，然後再次執行 `flutter doctor` 以驗證變更。

1. <h3>檢查 Android 裝置</h3>

為了確保你正確設定了模擬器與/或實體 Android 裝置，
請在你偏好的終端機中執行 `flutter emulators` 和 `flutter devices`：

    ```console
    $ flutter emulators && flutter devices
    ```

    根據你是設定模擬器還是實體裝置，
    至少應該會有一個項目，其平台標記為 **android**。

 1. <h3>疑難排解安裝問題</h3>

    如果你在安裝過程中遇到任何問題需要協助，
    請參考 [安裝與設定疑難排解][Install and setup troubleshooting]。

    如果你仍有問題或疑問，
    歡迎在 Flutter 的 [社群][community] 頻道上發問。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot#android-setup
[community]: {{site.main-url}}/community

## 開始為 Android 開發 {: #start-developing}

恭喜你！
現在你已經完成 Flutter 的 Android 開發環境設定，
你可以繼續學習 Flutter 並在 Android 上測試，
或開始加強與 Android 的整合。

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
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多個裝置上的示意圖。">
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
          <a class="text-button" href="/platform-integration/android/c-interop">串接原生 Android 程式碼</a>
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
