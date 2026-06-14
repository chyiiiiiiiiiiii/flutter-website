在 iOS 14 及更新版本中，請在 iOS 應用程式的 **Debug** 版本中啟用 Dart multicast DNS 服務。
這可透過 `flutter attach` 新增[除錯功能，例如熱重載與 DevTools](/add-to-app/debugging)。

:::warning
請勿在應用程式的 **Release** 版本中啟用此服務。
Apple App Store 可能會拒絕你的應用程式上架。
:::

若要僅在應用程式的 Debug 版本中設定本機網路隱私權限，
請為每個建置設定建立獨立的 `Info.plist` 檔案。
SwiftUI 專案預設不含 `Info.plist` 檔案。
若需要建立 property list，
可透過 Xcode 或文字編輯器進行。
以下說明假設使用預設的 **Debug** 與 **Release** 設定。
請依照你的應用程式建置設定調整名稱。

1. 建立新的 property list。

   1. 在 Xcode 中開啟你的專案。

   1. 在 **Project Navigator** 中，點擊專案名稱。

   1. 在編輯器面板的 **Targets** 清單中，點擊你的應用程式。

   1. 點擊 **Info** 分頁。

   1. 展開 **Custom iOS Target Properties**。

   1. 在清單上按右鍵，選擇 **Add Row**。

   1. 從下拉選單中選擇 **Bonjour Services**。
      這會在專案目錄中建立一個名為 `Info` 的新 property list 檔案，
      在 Finder 中顯示為 `Info.plist`。

1. 將 `Info.plist` 重新命名為 `Info-Debug.plist`。

   1. 在左側專案清單中點擊 **Info** 檔案。

   1. 在右側的 **Identity and Type** 面板中，
      將 **Name** 從 `Info.plist` 改為 `Info-Debug.plist`。

1. 建立 Release property list。

   1. 在 **Project Navigator** 中，點擊 `Info-Debug.plist`。

   1. 選擇 **File** > **Duplicate...**。
      你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>。

   1. 在對話框中，將 **Save As:** 欄位設為
      `Info-Release.plist`，然後點擊 **Save**。

1. 在 **Debug** property list 中新增必要的屬性。

   1. 在 **Project Navigator** 中，點擊 `Info-Debug.plist`。

   1. 在 **Bonjour Services** 陣列中新增字串值 `_dartVmService._tcp`。

   1. _（選用）_ 若要設定自訂的權限對話框文字，
      新增鍵值 **Privacy - Local Network Usage Description**。

      <DashImage image="development/add-to-app/ios/project-setup/debug-plist.png" caption="已新增 **Bonjour Services** 與 **Privacy - Local Network Usage Description** 鍵值的 `Info-Debug` property list" />

1. 設定目標，讓不同建置模式使用不同的 property list。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Settings** 分頁。

   1. 點擊 **All** 與 **Combined** 子分頁。

   1. 在搜尋框中輸入 `plist`。
      這會將設定篩選為包含 property list 的項目。

   1. 捲動清單直到看見 **Packaging**。

   1. 點擊 **Info.plist File** 設定。

   1. 將 **Info.plist File** 的值
      從 `path/to/Info.plist` 改為 `path/to/Info-$(CONFIGURATION).plist`。

      <DashImage image="development/add-to-app/ios/project-setup/set-plist-build-setting.png" caption="更新 `Info.plist` 建置設定以使用特定建置模式的 property list" />

      這會在 **Debug** 模式下解析為 **Info-Debug.plist**，
      在 **Release** 模式下解析為 **Info-Release.plist**。

      <DashImage image="development/add-to-app/ios/project-setup/plist-build-setting.png" caption="顯示各設定變體的更新後 **Info.plist File** 建置設定" />

1. 從 **Build Phases** 中移除 **Release** property list。

   1. 在 **Project Navigator** 中，點擊你的專案。

   1. 點擊 **Build Phases** 分頁。

   1. 展開 **Copy Bundle Resources**。

   1. 若此清單包含 `Info-Release.plist`，
      點擊該項目，然後點擊其下方的 **-**（減號）
      以將 property list 從資源清單中移除。

      <DashImage image="development/add-to-app/ios/project-setup/copy-bundle.png" caption="顯示 **Info-Release.plist** 設定的 **Copy Bundle** 建置階段，請移除此設定。" />

1. 你的 Debug 應用程式載入的第一個 Flutter 畫面會提示要求本機網路權限。

   點擊 **OK**。

   _（選用）_ 若要在應用程式載入前授予權限，請啟用
   **Settings > Privacy > Local Network > Your App**。

[debugging functionalities such as hot-reload and DevTools]: /add-to-app/debugging
