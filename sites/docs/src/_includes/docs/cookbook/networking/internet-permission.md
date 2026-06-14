若要部署至 Android，請編輯 `AndroidManifest.xml` 檔案以新增網際網路權限。

```xml
<!-- Required to fetch data from the internet. -->
<uses-permission android:name="android.permission.INTERNET" />
```

同樣地，若要部署至 macOS，請編輯
`macos/Runner/DebugProfile.entitlements` 與 `macos/Runner/Release.entitlements`
檔案，加入網路客戶端授權。

```xml
<!-- Required to fetch data from the internet. -->
<key>com.apple.security.network.client</key>
<true/>
```
