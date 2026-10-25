# Android 17 大螢幕方向與可調整大小限制將被忽略

> 對於目標版本為 Android 17 或更高版本的應用程式， 方向、可調整大小及長寬比限制在寬度 600dp 或以上的大型螢幕上將不再適用。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

對於目標版本為 Android 17 或更高版本的應用程式，
方向、可調整大小及長寬比限制在寬度 600dp 或以上的螢幕上將不再適用。
這代表 [`SystemChrome.setPreferredOrientations`][] 在這些裝置上將被忽略。

## 背景

Android 正朝著應用程式需適應各種方向、顯示大小及長寬比的模式演進。
固定方向或限制可調整大小等限制會妨礙應用程式的適應能力。
如需詳細資訊，請參閱 [Android 17 行為變更][Android 17 behavior changes]。

在 Android 16 中，此行為作為預設值被引入，
但允許應用程式透過 `PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY`
manifest 屬性暫時退出。
Android 17 移除了此退出選項。

## 變更說明

若您仰賴 [`SystemChrome.setPreferredOrientations`][]
將應用程式鎖定至特定方向，
在您的應用程式目標為 Android 17 或更高版本時，
大型螢幕（寬度 600dp 及以上）上將忽略此設定。
若您的應用程式支援 Android 16
且您未退出此行為，
則在 Android 17 上的行為相同。

若您的應用程式依賴鎖定方向，
請讓應用程式具備自適應能力，以支援不同的螢幕大小和方向。
請參閱 [自適應與響應式 UI][Adaptive and responsive UI]
中關於大型螢幕的操作指引。

## 參考資料

* [Android 17 行為變更][Android 17 behavior changes]
* [Android 16 行為變更][Android 16 behavior changes]
* [`SystemChrome.setPreferredOrientations`][]
* [自適應與響應式 UI][Adaptive and responsive UI]

[Android 17 behavior changes]: https://developer.android.com/about/versions/17/changes/ff-restrictions-ignored
[Android 16 behavior changes]: https://developer.android.com/about/versions/16/behavior-changes-16#ignore-orientation
[`SystemChrome.setPreferredOrientations`]: https://api.flutter.dev/flutter/services/SystemChrome/setPreferredOrientations.html
[Adaptive and responsive UI]: /ui/adaptive-responsive/large-screens

