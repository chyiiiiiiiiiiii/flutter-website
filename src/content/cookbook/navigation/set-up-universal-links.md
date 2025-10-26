```markdown
---
title: 設定 iOS 的 universal links
description: >-
   學習如何為使用 Flutter 建立的 iOS 應用程式設定 universal links。
---

深度連結（deep linking）允許應用程式使用者透過 URI 啟動應用程式。
這個 URI 包含 scheme、host 和 path，
並可直接開啟應用程式的特定螢幕。

_universal link_（通用連結）是 iOS 裝置專屬的一種深層連結（deep link），
僅使用 `http` 或 `https` 協定。

要設定 universal links，你必須擁有一個網域名稱。
作為暫時性的解決方案，
可以考慮使用 [Firebase Hosting][Firebase Hosting] 或 [GitHub Pages][GitHub Pages]。

完成深層連結（deep links）設定後，你可以驗證這些連結。
如需進一步了解，請參閱[驗證深層連結][Validate deep links]。

## 建立或修改 Flutter 應用程式

撰寫一個能夠處理傳入 URL 的 Flutter 應用程式。

本範例使用 [go_router][go_router] 套件來處理路由。
Flutter 團隊維護 `go_router` 套件。
它提供簡單的 API 來處理複雜的路由情境。

1. 若要建立新應用程式，請輸入 `flutter create <app-name>`。
```

    ```console
    $ flutter create deeplink_cookbook
    ```

2. 若要將 `go_router` 套件加入為相依套件，
   請執行 `flutter pub add`：

    ```console
    $ flutter pub add go_router
    ```

3. 為了處理路由，請在`main.dart`檔案中建立一個`GoRouter`物件：

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

## 調整 iOS 建置設定

1. 啟動 Xcode。

1. 開啟 Flutter 專案中 `ios` 資料夾內的 `ios/Runner.xcworkspace` 檔案。

   :::version-note
   如果你使用的是 Flutter 3.27 之前的版本，
   你需要手動加入深度連結（deep linking），
   方法是在 `info.Plist` 中新增鍵值對 `FlutterDeepLinkingEnabled` 和 `YES`。
   :::

   :::note
   如果你使用第三方套件來處理深層連結（deep links），
   例如 [app_links][app_links]，
   Flutter 預設的深層連結處理器會導致這些套件無法運作。

   若你使用第三方套件，請在 `info.Plist` 中加入鍵值對 `FlutterDeepLinkingEnabled` 和 `NO`。
   :::

### 新增關聯網域（Associated Domains）

:::warning
個人開發團隊（Personal development teams）不支援 Associated Domains 功能。若要新增關聯網域，請選擇 IDE 分頁。
:::

{% tabs %}
{% tab "Xcode" %}

1. 如有需要，請啟動 Xcode。

1. 點選最上層的 **Runner**。

1. 在編輯器中，點選 **Runner** target。

1. 點選 **Signing & Capabilities**。

1. 在 **Signing & Capabilities** 下方，點選 **+ Capability** 以新增新功能。

1. 點選 **Associated Domains**。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-associated-domains.png"
      alt="Xcode associated domains screenshot"
      width="100%" />

1. 在 **Associated Domains** 區段中，點選 **+**。

1. 輸入 `applinks:<web domain>`。請將 `<web domain>` 替換為你自己的網域名稱。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-add-associated-domains.png"
      alt="Xcode add associated domains screenshot"
      width="100%" />

{% endtab %}
{% tab "Other editors" %}

1. 在你偏好的編輯器中開啟 `ios/Runner/Runner.entitlements` XML 檔案。

1. 在 `<dict>` 標籤內新增關聯網域。

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
     [!<key>com.apple.developer.associated-domains</key>!]
     [!<array>!]
       [!<string>applinks:example.com</string>!]
     [!</array>!]
   </dict>
   </plist>
   ```

1. 儲存 `ios/Runner/Runner.entitlements` 檔案。

若要檢查你所建立的關聯網域是否可用，請依照下列步驟操作：

1. 如有需要，啟動 Xcode。

1. 點擊最上層的 **Runner**。

1. 在編輯器中，點擊 **Runner** target。

1. 點擊 **Signing & Capabilities**。
   這些網域應該會出現在
   **Associated Domains** 區段。

   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-add-associated-domains.png"
      alt="Xcode 新增關聯網域的螢幕截圖"
      width="100%" />

{% endtab %}
{% endtabs %}

你已完成應用程式的深度連結（deep linking）設定。

## 將你的應用程式與網站網域建立關聯

你需要在網站網域上託管一個 `apple-app-site-association` 檔案。
這個檔案會告訴行動瀏覽器，應該開啟哪個
iOS 應用程式，而不是瀏覽器本身。
要建立這個檔案，請找到你在前一節所建立的 Flutter 應用程式的 `appID`。

### 找出 `appID` 的組成部分

Apple 會將 `appID` 格式化為 `<team id>.<bundle id>`。

* 在 Xcode 專案中找到 bundle ID。
* 在 [developer account][developer account] 中找到 team ID。

**例如：** 假設 team ID 為 `S8QB4VV633`，
bundle ID 為 `com.example.deeplinkCookbook`，
你應該輸入 `appID` 項目為
`S8QB4VV633.com.example.deeplinkCookbook`。

### 建立並託管 `apple-app-site-association` JSON 檔案

這個檔案採用 JSON 格式。
儲存此檔案時，請不要包含 `.json` 檔案副檔名。
根據 [Apple 的文件][apple-app-site-assoc]，
這個檔案內容應如下所示：

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": [
          "S8QB4VV633.com.example.deeplinkCookbook"
        ],
        "paths": [
          "*"
        ],
        "components": [
          {
            "/": "/*"
          }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": [
      "S8QB4VV633.com.example.deeplinkCookbook"
    ]
  }
}
```

1. 將 `appIDs` 陣列中的一個值設為
   `<team id>.<bundle id>`。

1. 將 `paths` 陣列設為 `["*"]`。
   `paths` 陣列用來指定允許的 Universal Links（通用連結）。
   使用星號時，`*` 會將所有路徑重新導向到 Flutter 應用程式。
   如有需要，請將 `paths` 陣列的值調整為更
   適合你應用程式的設定。

1. 將檔案託管在類似以下結構的 URL 上。

   `<webdomain>/.well-known/apple-app-site-association`

1. 確認你的瀏覽器可以存取此檔案。

:::note
如果你有多個 scheme/flavor，可以在
`appIDs` 欄位中加入多個 `appID`。
:::

## 測試 Universal Link

請使用實體 iOS 裝置或模擬器（Simulator）測試 Universal Link。

:::note
Apple 的 [Content Delivery Network][Content Delivery Network] (CDN)
可能需要最多 24 小時才會從你的網域請求 `apple-app-site-association`（AASA）檔案。
在 CDN 請求該檔案之前，Universal Link 將無法運作。
若要繞過 Apple 的 CDN，請參考 [alternate mode section][alternate mode section]。
:::

1. 在測試前，
   請先將 Flutter 應用程式安裝到 iOS 裝置或模擬器，
   並在目標裝置上使用 `flutter run`。

   <img
       src="/assets/images/docs/cookbook/set-up-universal-links-simulator.png"
       alt="Simulator screenshot"
       width="50%" />

   完成後，
   Flutter 應用程式會顯示在
   iOS 裝置或模擬器的主畫面上。

1. 如果你使用模擬器進行測試，請使用 Xcode CLI：

   ```console
   $ xcrun simctl openurl booted https://<web domain>/details
   ```

1. 如果你在實體 iOS 裝置上進行測試：

   1. 開啟 **備忘錄**（Note）App。
   1. 在 **備忘錄** App 中輸入該 URL。
   1. 點擊產生的連結。

   如果設定成功，Flutter 應用程式會啟動並顯示其詳細資訊螢幕。
 
   <img
      src="/assets/images/docs/cookbook/set-up-universal-links-simulator-deeplinked.png"
      alt="Deeplinked Simulator screenshot"
      width="50%" />

[Content Delivery Network]: https://en.wikipedia.org/wiki/Content_delivery_network

## 尋找原始碼

你可以在 GitHub 儲存庫中找到 [deeplink_cookbook][deeplink_cookbook]
範例的原始碼。

[apple-app-site-assoc]: {{site.apple-dev}}/documentation/xcode/supporting-associated-domains
[alternate mode section]: {{site.apple-dev}}/documentation/bundleresources/entitlements/com_apple_developer_associated-domains?language=objc
[deeplink_cookbook]: {{site.repo.organization}}/codelabs/tree/main/deeplink_cookbook
[developer account]: {{site.apple-dev}}/account
[Firebase Hosting]: {{site.firebase}}/docs/hosting
[go_router]: {{site.pub-pkg}}/go_router
[GitHub Pages]: https://pages.github.com
[app_links]: {{site.pub-pkg}}/app_links
[Validate deep links]: /tools/devtools/deep-links
