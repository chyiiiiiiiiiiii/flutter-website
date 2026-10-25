# 深層連結旗標變更

> 如果你在行動應用程式中使用第三方深層連結 (deep linking) 插件套件， 請將 Flutter 的深層連結旗標設為 false。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

**此重大變更僅影響使用第三方深層連結 (deep linking) 插件套件的行動應用程式。**

Flutter 的深層連結選項預設值已從 `false` 變更為 `true`，這表示深層連結 (deep linking) 現在預設為需主動啟用（opt-in）。

## 遷移指南

如果你使用的是 Flutter 預設的深層連結設定，這項變更對你沒有影響。

然而，如果你使用第三方深層連結 (deep links) 插件套件，例如以下這些，這次更新會帶來重大變更：

- [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links)
- [`package:uni_link`](https://pub.dev/packages/uni_links)
- [`package:app_links`](https://pub.dev/packages/app_links)
- [`package:flutter_branch_sdk`](https://pub.dev/packages/flutter_branch_sdk)

在這種情況下，你必須手動將 Flutter 的深層連結選項重設為 `false`。

在你的 Android 應用程式的 `AndroidManifest.xml` 檔案中進行設定：

```xml title="AndroidManifest.xml" highlightLines=4
<manifest>
   <application
       <activity>
<meta-data android:name="flutter_deeplinking_enabled" android:value="false" />
       </activity>
   </application>
</manifest>
```

在你的 iOS 應用程式的 `info.plist` 檔案中：

```xml title="info.plist"
 <key>FlutterDeepLinkingEnabled</key>
 <false/>
```

## 時程

納入版本：3.25.0-0.1.pre<br>
穩定版釋出：3.27

## 參考資料

設計文件：

- [flutter.dev/go/deep-link-flag-migration](https://flutter.dev/go/deep-link-flag-migration)

相關 PR：

* [Set deep linking flag to true by default](https://github.com/flutter/engine/pull/52350)

