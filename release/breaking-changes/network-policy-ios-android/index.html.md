# 預設停用 iOS 與 Android 上的不安全 HTTP 連線

> 除非網域已被政策明確允許，否則存取 HTTP 協定的 URL 會拋出例外。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

如果您的程式碼嘗試在 iOS 或 Android 上對主機建立 HTTP 連線，現在會拋出 `StateException`，並顯示以下訊息：

```plaintext
Insecure HTTP is not allowed by platform: <host>
```

請改用 HTTPS。

## 背景說明

自 Android [API 28][] 及 [iOS 9][] 起，這些平台預設會停用不安全的 HTTP 連線。

此變更使 Flutter 也在行動平台上停用不安全的連線。其他平台（桌面、網頁等）則不受影響。

你可以依照各平台的指引，定義特定網域的網路政策來覆寫此行為。詳情請參考下方的遷移指南。

[API 28]: https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted
[iOS 9]: https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity

:::important
以下內容僅適用於平台原生 socket（由 Android 和 iOS 平台所擁有的 socket）。

Flutter 不會在 socket 層級強制執行任何政策；你需要自行負責連線的安全性。如果 socket 由 Dart/Flutter 所擁有，則不會強制執行任何政策。
:::

## 遷移指南

在 iOS 上，你可以在應用程式的 Info.plist 中加入 [NSExceptionDomains][]。

在 Android 上，你可以新增一個 [network security config][] XML 檔案。

### 為 Debug 版本允許明文連線

如果你希望在 Android 的 debug 版本中允許 HTTP 連線，可以將以下程式碼片段加入到你的 `$project_path\android\app\src\debug\AndroidManifest.xml`：

```xml
<application android:networkSecurityConfig="@xml/network_security_config">
  ...
</application>
```

接著，將網路設定加入你的 `$project_path/android/app/src/debug/res/xml/network_security_config.xml`：
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

也可以針對個別網域設定政策。詳情請參閱 Android 說明文件。

對於 iOS，你可以依照[這些指引][]來建立 `Info-debug.plist`，並將以下內容放入其中：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

我們**不建議**你在正式發行（release）版本中這麼做。

## 其他資訊

* 建置時（build time）設定是唯一能更改網路政策的方式。無法在執行時（runtime）修改。

[network security config]: https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted
[NSExceptionDomains]: https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity/nsexceptiondomains

## 時程

納入版本：1.23<br>
穩定版發行：2.0.0<br>
於版本 2.2.0 回復（提案中）

## 參考資料

API 文件：此變更沒有 API，因為網路政策的修改是透過上述的平台專屬設定完成。

相關 PR：

* [PR 20218: Plumbing for setting domain network policy][]
* [Introduce per-domain policy for strict secure connections][]

[PR 20218: Plumbing for setting domain network policy]: https://github.com/flutter/engine/pull/20218
[Introduce per-domain policy for strict secure connections]: https://github.com/dart-lang/sdk/commit/d878cfbf20375befa09f9bf85f0ba2b87b319427
[這些指引]: /add-to-app/ios/project-setup#local-network-permissions

