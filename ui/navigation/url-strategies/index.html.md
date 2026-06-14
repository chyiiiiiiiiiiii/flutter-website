# 在網頁上設定 URL 策略

> 在網頁上使用 hash 或 path URL 策略



Flutter 網頁應用程式支援兩種在網頁上設定
基於 URL 的導覽方式：

**Hash（預設）**
: 路徑會讀寫於 [hash fragment][hash fragment]。
例如：`flutterexample.dev/#/path/to/screen`。

**Path**
: 路徑會在沒有 hash 的情況下讀寫。例如：
`flutterexample.dev/path/to/screen`。

## 設定 URL 策略

若要將 Flutter 設定為改用 path，請使用
[usePathUrlStrategy][usePathUrlStrategy] 函式，該函式由 [flutter_web_plugins][flutter_web_plugins]（函式庫）提供，
此函式庫是 Flutter SDK（Flutter 軟體開發套件）的一部分。

你無法直接透過 `pub add` 新增 `flutter_web_plugins`。
請在你的 `pubspec.yaml` 檔案中，將其作為 Flutter [SDK 相依性][SDK dependency] 引入：

```yaml highlightLines=4-5
dependencies:
  flutter:
    sdk: flutter
  flutter_web_plugins:
    sdk: flutter
```

然後在`runApp`之前呼叫`usePathUrlStrategy`函式：

```dart highlightLines=4
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(ExampleApp());
}
```

[SDK dependency]: https://dart.dev/tools/pub/dependencies#sdk

## 設定你的網頁伺服器

PathUrlStrategy 會使用 [History API][History API]，這需要對網頁伺服器進行額外設定。

若要讓你的網頁伺服器支援 PathUrlStrategy，請參考你的網頁伺服器文件，將請求重新導向至 `index.html`。請查閱你的網頁伺服器文件，了解如何設定單頁應用程式（single-page app）。

如果你使用的是 Firebase Hosting，初始化專案時請選擇「Configure as a single-page app」選項。更多資訊請參考 Firebase 的 [Configure rewrites][Configure rewrites] 文件。

透過執行 `flutter run -d chrome` 建立的本地開發伺服器，已預設設定為能夠優雅處理任何路徑，並回退至你的應用程式的 `index.html` 檔案。

## 將 Flutter 應用程式部署於非根目錄

請將 `<base href="/">` 標籤於 `web/index.html`
更新為你的應用程式所部署的路徑。
例如，若要將你的 Flutter 應用程式部署於
`my_app.dev/flutter_app`，請將
此標籤改為 `<base href="/flutter_app/">`。

發佈版本支援相對 `base href` 標籤，但必須考量到頁面實際服務的完整 URL。
這代表針對 `/flutter_app/`、
`/flutter_app/nested/route` 和 `/flutter_app/nested/route/` 的請求，其相對 `base href`
會有所不同（例如分別為 `"."`、`".."` 和 `"../.."`）。

[hash fragment]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax
[`HashUrlStrategy`]: https://api.flutter.dev/flutter/flutter_web_plugins/HashUrlStrategy-class.html
[`PathUrlStrategy`]: https://api.flutter.dev/flutter/flutter_web_plugins/PathUrlStrategy-class.html
[`setUrlStrategy`]: https://api.flutter.dev/flutter/flutter_web_plugins/setUrlStrategy.html
[`url_strategy`]: https://pub.dev/packages/url_strategy
[usePathUrlStrategy]: https://api.flutter.dev/flutter/flutter_web_plugins/usePathUrlStrategy.html
[flutter_web_plugins]: https://api.flutter.dev/flutter/flutter_web_plugins/flutter_web_plugins-library.html
[History API]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[Configure rewrites]: https://firebase.google.com/docs/hosting/full-config#rewrites

