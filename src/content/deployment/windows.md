---
title: 建置並發佈 Windows 桌面應用程式
description: 如何將 Flutter 應用程式發佈到 Microsoft Store。
shortTitle: windows
---

分發 Windows 應用程式的一個便利方式是透過 [Microsoft Store][microsoftstore]。
本指南將逐步說明如何以這種方式封裝並部署 Flutter 應用程式。

:::note
你並不一定要透過 Microsoft Store 發佈 Windows 應用程式，特別是當你希望對分發體驗有更多控制權，或不想處理認證流程時。Microsoft 的文件中有關於傳統安裝方式的更多資訊，包括 [Windows Installer][msidocs]。
:::

## 前置作業

在開始將 Flutter Windows 桌面應用程式發佈到 Microsoft Store 之前，請先確認你的應用程式符合 [Microsoft Store 政策][storepolicies]。

此外，你必須加入 [Microsoft Partner Network][microsoftpartner]，才能提交應用程式。

## 在 Partner Center 設定你的應用程式

你可以在 [Microsoft Partner Center][microsoftpartner] 管理應用程式的生命週期。

首先，預留應用程式名稱，並確保你擁有該名稱的必要權利。名稱預留後，應用程式將會啟用相關服務（例如推播通知），你也可以開始新增附加元件。

像是定價、可用性、年齡分級與分類等選項，必須在首次提交時一併設定，這些設定會自動保留給後續的提交。

## 封裝與部署

若要將應用程式發佈到 Microsoft Store，必須先進行封裝。
有效的格式包括 **.msix**、**.msixbundle**、**.msixupload**、**.appx**、**.appxbundle**、**.appxupload** 以及 **.xap**。

### 手動封裝與部署到 Microsoft Store

請參考 [MSIX 封裝][msix packaging]，以瞭解如何封裝 Flutter Windows 桌面應用程式。

請注意，每個產品都有唯一的識別資訊，由 Store 指派。

如果你是手動建立封裝，則必須在封裝過程中手動加入其識別資訊。這些必要資訊可以依下列步驟從 Partner Center 取得：

1. 在 Partner Center 中，前往你的應用程式。
2. 選擇 **產品管理**（Product management）。
3. 點擊 **產品識別**（Product identity）以取得封裝識別名稱、發行者及發行者顯示名稱。

手動封裝應用程式後，請手動將其提交到 [Microsoft Partner Center][microsoftpartner]。
你可以建立新的提交，前往 **Packages**，並上傳你建立的應用程式封裝。

### 持續部署（Continuous deployment）

除了手動建立與部署封裝之外，在首次將應用程式提交到 Microsoft Store 後，你也可以利用 CI/CD 工具自動化建置、封裝、版本管理與部署流程。

#### Codemagic CI/CD

[Codemagic CI/CD][codemagic] 使用 [`msix` pub 套件][msix package] 來封裝 Flutter Windows 桌面應用程式。

對於 Flutter 應用程式，可以使用 [Codemagic Workflow Editor][cmworkfloweditor] 或 [codemagic.yaml][cmyaml] 來封裝應用程式並部署到 Microsoft Partner Center。
你也可以透過此套件設定其他選項（如封裝內包含的功能清單與語言資源）。

在發佈時，Codemagic 會使用 [Partner Center submission API][partnercenterapi]；
因此，Codemagic 需要 [將 Azure Active Directory 與 Partner Center 帳號關聯][azureadassociation]。

#### GitHub Actions CI/CD

GitHub Actions 可利用 [Microsoft Dev Store CLI](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/overview) 將應用程式封裝為 MSIX 並發佈到 Microsoft Store。
[setup-msstore-cli](https://github.com/microsoft/setup-msstore-cli) GitHub Action 會安裝此 CLI，讓 Action 能用於封裝與發佈。

由於 MSIX 封裝會使用 [`msix` pub 套件][msix package]，專案的 `pubspec.yaml` 必須包含正確的 `msix_config` 節點。

你必須在 Dev Center 建立一個具有 [全域管理員權限](https://azure.microsoft.com/documentation/articles/active-directory-assign-admin-roles/) 的 Azure AD 目錄。

GitHub Action 需要來自 Partner Center 的環境機密（environment secrets）。
`AZURE_AD_TENANT_ID`、`AZURE_AD_ClIENT_ID` 與 `AZURE_AD_CLIENT_SECRET` 可依照 [Windows Store Publish Action](https://github.com/marketplace/actions/windows-store-publish#obtaining-your-credentials) 的指示，在 Dev Center 看到。
你還需要 `SELLER_ID` 機密，可在 Dev Center 的 **Account Settings** > **Organization Profile** > **Legal Info** 找到。

應用程式必須已經存在於 Microsoft Dev Center，且至少有一次完整的提交，並且必須在執行 Action 前於儲存庫內執行過 `msstore init`。完成後，在 GitHub Action 中執行 [`msstore package .`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/package-command) 和 [`msstore publish`](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/publish-command)，即可將應用程式封裝為 MSIX 並上傳至 Dev Center 的新提交。

MSIX 發佈所需步驟大致如下：

```yaml
- uses: microsoft/setup-msstore-cli@v1

- name: Configure the Microsoft Store CLI
  run: msstore reconfigure --tenantId ${{ secrets.AZURE_AD_TENANT_ID }} --clientId ${{ secrets.AZURE_AD_ClIENT_ID }} --clientSecret ${{ secrets.AZURE_AD_CLIENT_SECRET }} --sellerId ${{ secrets.SELLER_ID }}

- name: Install Dart dependencies
  run: flutter pub get

- name: Create MSIX package
  run: msstore package .

- name: Publish MSIX to the Microsoft Store
  run: msstore publish -v
```

## 更新應用程式的版本號

對於發佈到 Microsoft Store 的應用程式，
必須在封裝（packaging）過程中設定版本號。

應用程式的預設版本號為 `1.0.0.0`。

:::note
Microsoft Store 的應用程式不允許
版本號中的修訂號（revision number）為非零值。
因此，版本號的最後一位必須在所有發行版本中維持為零。
請務必遵循 Microsoft 的
[版本管理指引][windowspackageversioning]。
:::

如果應用程式沒有發佈到 Microsoft Store，
你可以設定應用程式執行檔的檔案版本（file version）與產品版本（product version）。
執行檔的預設檔案版本為 `1.0.0.1`，
預設產品版本為 `1.0.0+1`。若要更新這些設定，
請前往 `pubspec.yaml` 檔案並更新下列這一行：

```yaml
version: 1.0.0+1
```

建置名稱由三個以點號分隔的數字組成，
後面可選擇性地加上一個以`+`分隔的建置號碼。
在上面的範例中，建置名稱是`1.0.0`，
建置號碼則是`1`。

建置名稱會成為檔案和產品版本的前三個數字，
而建置號碼則會成為檔案和產品版本的第四個數字。

你可以在`flutter build windows`中分別透過指定`--build-name`和
`--build-number`來覆寫建置名稱與建置號碼。

:::note
在 Flutter 3.3 之前建立的 Flutter 專案
需要更新以設定可執行檔的版本資訊。
如需詳細資訊，請參閱[版本遷移指南][version migration guide]。
:::

## 新增應用程式圖示

若要在打包前更新 Flutter Windows
桌面應用程式的圖示，請依照以下步驟操作：

1. 在 Flutter 專案中，前往
   **windows\runner\resources**。
2. 將 **app_icon.ico** 替換為你想要的圖示。
3. 如果圖示名稱不是 **app_icon.ico**，
   請到 **windows\runner\Runner.rc** 檔案中
   修改 **IDI_APP_ICON** 的值，指向新的路徑。

使用 [`msix` pub 套件][msix package] 進行打包時，
也可以在`pubspec.yaml`檔案中設定 logo 路徑。

若要更新應用程式在 Store 上架頁面的圖片，
請前往送出流程中的 Store listing 步驟，
選擇 Store logos。
在此你可以上傳 300 x 300 像素大小的 logo。

所有上傳過的圖片都會保留，供後續送出時使用。

## 驗證應用程式套件

在發佈到 Microsoft Store 之前，
請先在本機驗證應用程式套件。

[Windows App Certification Kit][windowsappcertification]
是包含在 Windows 軟體開發套件（SDK）中的工具。

驗證應用程式的步驟如下：

1. 啟動 Windows App Cert Kit。
2. 選擇 Flutter Windows 桌面套件
   （如 **.msix**、**.msixbundle** 等）。
3. 選擇測試報告的儲存位置。

即使驗證通過，報告中仍可能包含重要的警告與資訊。

[azureadassociation]: https://docs.microsoft.com/windows/uwp/publish/associate-azure-ad-with-partner-center
[cmworkfloweditor]: https://docs.codemagic.io/flutter-publishing/publishing-to-microsoft-store/
[cmyaml]: https://docs.codemagic.io/yaml-publishing/microsoft-store/
[codemagic]: https://codemagic.io/start/
[microsoftstore]: https://www.microsoft.com/store/apps/windows
[msidocs]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[microsoftpartner]: https://partner.microsoft.com/
[msix package]: {{site.pub}}/packages/msix
[msix packaging]: /platform-integration/windows/building#msix-packaging
[partnercenterapi]: https://docs.microsoft.com/azure/marketplace/azure-app-apis
[storepolicies]: https://docs.microsoft.com/windows/uwp/publish/store-policies/
[visualstudiopackaging]: https://docs.microsoft.com/windows/msix/package/packaging-uwp-apps
[visualstudiosubmission]: https://docs.microsoft.com/windows/msix/package/packaging-uwp-apps#automate-store-submissions
[windowspackageversioning]: https://docs.microsoft.com/windows/uwp/publish/package-version-numbering
[windowsappcertification]: https://docs.microsoft.com/windows/uwp/debug-test-perf/windows-app-certification-kit
[version migration guide]: /release/breaking-changes/windows-version-information
