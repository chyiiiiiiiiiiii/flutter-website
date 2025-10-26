---
title: 預設停用 iOS 與 Android 上的不安全 HTTP 連線
description: >
  除非網域已被政策明確允許，否則存取 HTTP 協定的 URL 會拋出例外。
---

{% render docs/breaking-changes.md %}

## 摘要

如果您的程式碼嘗試在 iOS 或 Android 上對主機建立 HTTP 連線，現在會拋出`StateException`，並顯示以下訊息：

```plaintext
Insecure HTTP is not allowed by platform: <host>
```

請改用 HTTPS。

:::important
這項變更對本地網路的 HTTP 存取施加了比行動平台本身更嚴格的限制（[flutter/flutter#72723]({{site.repo.flutter}}/issues/72723)）。

此變更現已被還原。
:::

## 背景說明

自 Android [API 28][API 28] 及 [iOS 9][iOS 9] 起，這些平台預設會停用不安全的 HTTP 連線。

此變更使 Flutter 也在行動平台上停用不安全的連線。其他平台（桌面、網頁等）則不受影響。

你可以依照各平台的指引，定義特定網域的網路政策來覆寫此行為。詳情請參考下方的遷移指南。

[API 28]: {{site.android-dev}}/training/articles/security-config#CleartextTrafficPermitted
[iOS 9]: {{site.apple-dev}}/documentation/bundleresources/information_property_list/nsapptransportsecurity

與平台本身類似，應用程式仍然可以開啟不安全的 socket 連線。Flutter 不會在 socket 層級強制執行任何政策；你需要自行負責連線的安全性。

## 遷移指南

在 iOS 上，你可以在應用程式的 Info.plist 中加入 [NSExceptionDomains][NSExceptionDomains]。

在 Android 上，你可以新增一個 [network security config][network security config] XML 檔案。為了讓 Flutter 能找到你的 XML 檔案，你還需要在 manifest 的 `<application>` 標籤中加入一個 `metadata` 項目。
這個 metadata 項目應該使用名稱：
`io.flutter.network-policy`，內容則填入該 XML 的資源識別碼。

例如，如果你將 XML 設定檔放在
`res/xml/network_security_config.xml`，
你的 manifest 會包含以下內容：

```xml
<application ...>
  ...
  <meta-data android:name="io.flutter.network-policy"
             android:resource="@xml/network_security_config"/>
</application>
```

### 為 Debug 版本允許明文連線

如果你希望在 Android 的 debug 版本中允許 HTTP 連線，可以將以下程式碼片段加入到你的 `$project_path\android\app\src\debug\AndroidManifest.xml`：

```xml
<application android:usesCleartextTraffic="true"/>
```

對於 iOS，你可以依照[這些指引](/add-to-app/ios/project-setup/?tab=embed-using-cocoapods#set-local-network-privacy-permissions)來建立`Info-debug.plist`，並將以下內容放入其中：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

我們**不建議**你在正式發行（release）版本中這麼做。

## 其他資訊

* 網路政策（network policy）只能透過建置時（build time）設定進行更改。無法在執行時（runtime）修改。
* 本機（localhost）連線始終允許。
* 你只能允許對網域（domains）的非安全連線（insecure connections）。不接受指定 IP 位址作為輸入。這與平台支援的行為一致。如果你希望允許 IP 位址，唯一的方式是允許應用程式中的明文連線（cleartext connections）。

[network security config]: {{site.android-dev}}/training/articles/security-config#CleartextTrafficPermitted
[NSExceptionDomains]: {{site.apple-dev}}/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsexceptiondomains

## 時程

納入版本：1.23<br>
穩定版發行：2.0.0<br>
於版本 2.2.0 回復（提案中）

## 參考資料

API 文件：此變更沒有 API，因為網路政策的修改是透過上述的平台專屬設定完成。

相關 PR：

* [PR 20218: Plumbing for setting domain network policy][PR 20218: Plumbing for setting domain network policy]
* [Introduce per-domain policy for strict secure connections][Introduce per-domain policy for strict secure connections]

[PR 20218: Plumbing for setting domain network policy]: {{site.repo.engine}}/pull/20218
[Introduce per-domain policy for strict secure connections]: {{site.github}}/dart-lang/sdk/commit/d878cfbf20375befa09f9bf85f0ba2b87b319427
