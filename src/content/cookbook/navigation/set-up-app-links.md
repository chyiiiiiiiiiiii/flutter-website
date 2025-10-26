---
title: 為 Android 設定 App 連結
description: >-
  學習如何為使用 Flutter 建置的 Android 應用程式設定 App 連結。
---

深度連結（deep linking）是一種使用 URI 啟動應用程式的機制。
這個 URI 包含 scheme、host 和 path，
並可直接開啟應用程式至特定螢幕。

_App link（App 連結）_ 是一種深層連結（deep link），
它使用 `http` 或 `https`，且僅限於 Android 裝置。

設定 App 連結需要擁有一個網域名稱。
否則，可以考慮暫時使用 [Firebase Hosting][Firebase Hosting]
或 [GitHub Pages][GitHub Pages] 作為解決方案。

當你完成深層連結（deep links）的設定後，可以進行驗證。
如需進一步了解，請參閱 [驗證深層連結][Validate deep links]。

## 1. 自訂 Flutter 應用程式

撰寫一個能夠處理傳入 URL 的 Flutter 應用程式。
本範例使用 [go_router][go_router] 套件來處理路由。
Flutter 團隊維護 `go_router` 套件，
它提供簡單的 API 來處理複雜的路由情境。

 1. 若要建立新應用程式，請輸入 `flutter create <app-name>`：

    ```console
    $ flutter create deeplink_cookbook
    ```

 2. 若要在您的應用程式中加入 `go_router` 套件，
    請在專案中新增 `go_router` 的相依性：

    若要將 `go_router` 套件作為相依性加入，
    請執行 `flutter pub add`：

    ```console
    $ flutter pub add go_router
    ```

 3. 若要處理路由，
    請在`main.dart`檔案中建立`GoRouter`物件：

    ```dart title="main.dart"
    import 'package:flutter/material.dart';
    import 'package:go_router/go_router.dart';
    
    void main() => runApp(MaterialApp.router(routerConfig: router));
    
    /// This handles '/' and '/details'.
    final router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (_, _) => Scaffold(
            appBar: AppBar(title: const Text('Home Screen')),
          ),
          routes: [
            GoRoute(
              path: 'details',
              builder: (_, _) => Scaffold(
                appBar: AppBar(title: const Text('Details Screen')),
              ),
            ),
          ],
        ),
      ],
    );
    ```

## 2. 修改 AndroidManifest.xml

 1. 使用 VS Code 或 Android Studio 開啟 Flutter 專案。
 2. 導航至 `android/app/src/main/AndroidManifest.xml` 檔案。
 3. 在 `<activity>` 標籤內，並搭配 `.MainActivity`，加入以下 metadata 標籤與 intent filter。

    請將 `example.com` 替換為你自己的網域名稱。

    ```xml
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="http" android:host="example.com" />
        <data android:scheme="https" />
    </intent-filter>
    ```

    :::version-note
    如果你使用的 Flutter 版本早於 3.27，
    你需要手動啟用深度連結（deep linking），
    方法是在 `<activity>` 中加入以下 metadata 標籤：

    ```xml
    <meta-data android:name="flutter_deeplinking_enabled" android:value="true" />
    ```
    :::

    :::note
    如果你使用第三方套件來處理深層連結 (deep links)，
    例如 [app_links][app_links]，
    Flutter 預設的深層連結處理器會
    造成這些套件無法正常運作。

    若要停用 Flutter 預設的深層連結處理器，
    請在 `<activity>` 中加入以下 metadata 標籤：

    ```xml
    <meta-data android:name="flutter_deeplinking_enabled" android:value="false" />
    ```
    :::

## 3. 託管 assetlinks.json 檔案

使用你擁有的網域，透過網頁伺服器託管 `assetlinks.json` 檔案。這個檔案會告訴行動瀏覽器，應該開啟哪一個 Android 應用程式，而不是直接在瀏覽器中開啟。要建立這個檔案，請取得你在前一步建立的 Flutter 應用程式的套件名稱（package name），以及你將用來建置 APK 的簽署金鑰（signing key）的 sha256 指紋。

### 套件名稱（Package name）

在 `AndroidManifest.xml` 中找到套件名稱，位於 `<manifest>` 標籤下的 `package` 屬性。套件名稱通常的格式為 `com.example.*`。

### sha256 指紋

根據 APK 的簽署方式，取得 sha256 指紋的流程會有所不同。

#### 使用 Google Play 應用程式簽署（Google Play app signing）

你可以直接在 Play 開發人員主控台（Play Developer Console）中找到 sha256 指紋。開啟你的應用程式，在 **Release > Setup > App Integrity > App Signing** 分頁下：

<img src="/assets/images/docs/cookbook/set-up-app-links-pdc-signing-key.png" alt="Screenshot of sha256 fingerprint in play developer console" width="50%" />

#### 使用本地 keystore

如果你是將金鑰儲存在本地，可以使用以下指令產生 sha256 指紋：

```console
keytool -list -v -keystore <path-to-keystore>
```

### assetlinks.json

託管的檔案應該類似如下所示：

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.deeplink_cookbook",
    "sha256_cert_fingerprints":
    ["FF:2A:CF:7B:DD:CC:F1:03:3E:E8:B2:27:7C:A2:E3:3C:DE:13:DB:AC:8E:EB:3A:B9:72:A1:0E:26:8A:F5:EC:AF"]
  }
}]
```

 1. 將 `package_name` 設定為你的 Android 應用程式 ID。

2. 將 sha256_cert_fingerprints 設定為你在前一步取得的值。

3. 將檔案託管在類似以下格式的 URL 上：
   `<webdomain>/.well-known/assetlinks.json`

4. 確認你的瀏覽器可以存取這個檔案。

:::note
如果你有多個風味（flavor），可以在 sha256_cert_fingerprints 欄位中設定多個 sha256_cert_fingerprint 值。
只要將它們加入 sha256_cert_fingerprints 清單即可。
:::

## 測試

你可以使用實體裝置或模擬器（Emulator）來測試 app link，
但請先確保你已在裝置上至少執行過一次 `flutter run`。
這可確保 Flutter 應用程式已安裝。

<img src="/assets/images/docs/cookbook/set-up-app-links-emulator-installed.png" alt="Emulator screenshot" width="50%" />

若只需測試應用程式的設定，可使用 adb 指令：

```console
adb shell 'am start -a android.intent.action.VIEW \
    -c android.intent.category.BROWSABLE \
    -d "http://<web-domain>/details"' \
    <package name>
```

:::note
這個方法**不會**測試網頁檔案是否正確託管，
即使網頁檔案不存在，該指令仍會啟動應用程式。
:::

若要同時測試**網頁與應用程式**的設定，必須直接透過網頁瀏覽器或其他應用程式點擊連結。
其中一種方式是建立一份 Google 文件，加入該連結，然後點擊它。

:::note
如果你正在本機偵錯（而不是從 Play 商店下載應用程式），
你可能需要手動啟用**支援的網頁位址**（Supported web addresses）切換開關。
:::

如果一切設定正確，Flutter 應用程式會啟動並顯示詳細資訊螢幕：

<img src="/assets/images/docs/cookbook/set-up-app-links-emulator-deeplinked.png" alt="Deeplinked Emulator screenshot" width="50%" />

## 附錄

原始碼：[deeplink_cookbook][deeplink_cookbook]

[deeplink_cookbook]: {{site.github}}/flutter/codelabs/tree/main/deeplink_cookbook
[Firebase Hosting]: {{site.firebase}}/docs/hosting
[go_router]: {{site.pub}}/packages/go_router
[GitHub Pages]: https://pages.github.com
[app_links]: {{site.pub}}/packages/app_links
[Signing the app]: /deployment/android#signing-the-app
[Validate deep links]: /tools/devtools/deep-links
