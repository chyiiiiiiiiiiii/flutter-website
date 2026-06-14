---
title: 深層連結旗標變更
description: >-
  如果你在行動應用程式中使用第三方深層連結 (deep linking) 插件套件，
  請將 Flutter 的深層連結旗標設為 false。
---

{% render "docs/breaking-changes.md" %}

## 摘要

**此重大變更僅影響使用第三方深層連結 (deep linking) 插件套件的行動應用程式。**

Flutter 的深層連結選項預設值已從 `false` 變更為 `true`，這表示深層連結 (deep linking) 現在預設為需主動啟用（opt-in）。

## 遷移指南

如果你使用的是 Flutter 預設的深層連結設定，這項變更對你沒有影響。

然而，如果你使用第三方深層連結 (deep links) 插件套件，例如以下這些，這次更新會帶來重大變更：

- [Firebase dynamic links](https://firebase.google.com/docs/dynamic-links)
- [`package:uni_link`]({{site.pub-pkg}}/uni_links)
- [`package:app_links`]({{site.pub-pkg}}/app_links)
- [`package:flutter_branch_sdk`]({{site.pub-pkg}}/flutter_branch_sdk)

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

- [flutter.dev/go/deep-link-flag-migration]({{site.main-url}}/go/deep-link-flag-migration)

相關 PR：

* [Set deep linking flag to true by default]({{site.github}}/flutter/engine/pull/52350)
