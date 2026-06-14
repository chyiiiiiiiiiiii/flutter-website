# 設定 Windows 開發環境

> 設定您的開發環境，以在 Windows 上執行、建置與部署 Flutter 應用程式。



瞭解如何設定您的開發環境，以在 Windows 桌面平台上執行、建置與部署 Flutter 應用程式。

:::note
如果您尚未安裝 Flutter，
請先參閱並依照 [Install Flutter][] 指南操作。

如果您已經安裝了 Flutter，
請確保其為[最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## 設定開發工具 {: #set-up-tooling}

透過 [Visual Studio][vs]，您可以在 Windows 上執行 Flutter 應用程式，
同時編譯與除錯原生 C 及 C++ 程式碼。

請注意，**Visual Studio** 是一套與 **Visual Studio _Code_** 不同的 IDE，
且僅支援於 Windows 上使用。

1. <h3>安裝 Visual Studio</h3>

   如果您尚未安裝，
   請依照 Microsoft 指南
   [安裝與設定 Visual Studio][vs]。

   如果您已經安裝 Visual Studio，
   請[更新至最新版本][vs-update]。

1. <h3>設定 Visual Studio 工作負載</h3>

   當 Visual Studio 安裝程式提示您選擇工作負載時，
   請選擇並安裝 **使用 C++ 進行桌面開發**（Desktop development with C++）工作負載。

   如果您已經安裝 Visual Studio，
   請依照 Microsoft 指南
   [修改 Visual Studio 工作負載][vs-modify]。

   :::tip
   如果使用命令列安裝，
   **Desktop development with C++** 工作負載的 ID 為
   `Microsoft.VisualStudio.Workload.NativeDesktop`。
   :::

{: .steps}

[vs]: https://visualstudio.microsoft.com/
[vs-install]: https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio
[vs-update]: https://learn.microsoft.com/en-us/visualstudio/install/update-visual-studio
[vs-modify]: https://learn.microsoft.com/en-us/visualstudio/install/modify-visual-studio

## 驗證您的設定 {: #validate-setup}

1. <h3>檢查工具鏈問題</h3>

   若要檢查您的 Windows 開發環境是否有任何問題，
   請在您偏好的終端機中執行 `flutter doctor` 指令：

   ```console
   $ flutter doctor -v
   ```

   如果您在 **Windows version** 和 **Visual Studio - develop Windows apps** 區段下看到任何錯誤或待完成的事項，
   請先完成並解決這些問題，然後再次執行 `flutter doctor -v` 以驗證變更。

1. <h3>檢查 Windows 裝置</h3>

   為確保 Flutter 能正確找到並連接您的 Windows 裝置，
   請在您偏好的終端機中執行 `flutter devices`：

   ```console
   $ flutter devices
   ```

   如果您已正確完成所有設定，
   應該至少會有一個平台標記為 **windows** 的項目。

1. <h3>疑難排解安裝與設定問題</h3>

   如果您在解決安裝或設定問題時需要協助，
   請參考[安裝與設定疑難排解][troubleshoot]。
   根據您的問題類型，
   也可以參考 Microsoft 的
   [Visual Studio 疑難排解指南][vs-troubleshoot]。

   如果您仍然遇到問題或有其他疑問，
   歡迎在 Flutter [社群][community]頻道上尋求協助。

{: .steps}

[troubleshoot]: /install/troubleshoot
[vs-troubleshoot]: https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/installation/troubleshoot-installation-issues
[community]: https://flutter.dev/community

## 開始為 Windows 開發 {: #start-developing}

恭喜！
現在您已完成 Flutter 的 Windows 桌面開發環境設定，
可以一邊在 Windows 上測試，一邊持續學習 Flutter，
或是開始擴展與 Windows 的整合。

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
          <a class="text-button" href="/learn/pathway">學習基礎知識</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter 元件 (Widget)</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">查看範例</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="Flutter 桌面支援的輪廓圖。">
    </div>
    <div class="card-header">
      <span class="card-title">為 Windows 建置</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/windows/building">建置 Windows 應用程式</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/windows">部署到 Windows</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/platform-channels">撰寫 Windows 專屬程式碼</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/windows/building#customizing-the-windows-host-application">自訂應用程式視窗</a>
        </li>
        <li>
          <a class="text-button" href="https://pub.dev/packages/win32">使用 Dart 存取 Win32 API</a>
        </li>
      </ul>
    </div>
  </div>
</div>

