# 回報錯誤至服務

> 如何追蹤使用者遇到的錯誤。



<?code-excerpt path-base="cookbook/maintenance/error_reporting/"?>

雖然我們總是努力打造沒有錯誤的應用程式，但錯誤仍然難以避免地會偶爾出現。由於有錯誤的應用程式會導致使用者和客戶不滿，因此了解使用者遇到錯誤的頻率以及錯誤發生的位置非常重要。這樣一來，你就能優先處理影響最大的錯誤，並著手修復它們。

那麼，你要如何判斷使用者遇到錯誤的頻率呢？每當發生錯誤時，建立一份包含錯誤內容及相關 stacktrace（堆疊追蹤）的報告。你可以將這份報告發送到錯誤追蹤服務，例如 [Bugsnag][]、[Datadog][]、[Firebase Crashlytics][]、[Rollbar][] 或 Sentry。

錯誤追蹤服務會彙整所有使用者遇到的崩潰事件並將其分組。這讓你能夠了解應用程式失敗的頻率，以及使用者在哪些地方遇到問題。

在本教學中，你將學會如何透過以下步驟，將錯誤回報至 [Sentry][] 崩潰回報服務：

  1. 從 Sentry 取得 DSN。
  2. 匯入 Flutter Sentry 套件
  3. 初始化 Sentry SDK
  4. 以程式方式擷取錯誤

## 1. 從 Sentry 取得 DSN

在將錯誤回報至 Sentry 之前，你需要一組「DSN」來讓 Sentry.io 服務唯一識別你的應用程式。

取得 DSN 的步驟如下：

  1. [註冊 Sentry 帳號][Create an account with Sentry]。
  2. 登入帳號。
  3. 建立新的 Flutter 專案。
  4. 複製包含 DSN 的程式碼片段。

## 2. 匯入 Sentry 套件

將 [`sentry_flutter`][] 套件匯入應用程式中。sentry 套件能讓你更方便地將錯誤報告發送到 Sentry 錯誤追蹤服務。

若要將 `sentry_flutter` 套件加入為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add sentry_flutter
```

## 3. 初始化 Sentry SDK

初始化 SDK，以自動擷取各種未處理的錯誤：

<?code-excerpt "lib/main.dart (InitializeSDK)"?>
```dart
import 'package:flutter/widgets.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

Future<void> main() async {
  await SentryFlutter.init(
    (options) => options.dsn = 'https://example@sentry.io/example',
    appRunner: () => runApp(const MyApp()),
  );
}
```

或者，你也可以使用 `dart-define` 標籤，將 DSN 傳遞給 Flutter：

```sh
--dart-define SENTRY_DSN=https://example@sentry.io/example
```

### 這樣做有什麼效果？

這就是讓 Sentry 捕捉 Dart 及原生層未處理錯誤所需的全部設定。
這包括 iOS 上的 Swift、Objective-C、C 及 C++，
以及 Android 上的 Java、Kotlin、C 和 C++。

## 4. 以程式方式擷取錯誤

除了透過匯入並初始化 SDK 所提供的自動錯誤回報功能外，
你也可以使用 API 來將錯誤回報至 Sentry：

<?code-excerpt "lib/main.dart (CaptureException)"?>
```dart
await Sentry.captureException(exception, stackTrace: stackTrace);
```

如需更多資訊，請參閱 pub.dev 上的 [Sentry API][] 文件。

## 深入了解

有關使用 Sentry SDK 的詳細文件，請參考 [Sentry 官方網站][Sentry's site]。

## 完整範例

若要查看可運作的範例，
請參考 [Sentry flutter 範例][Sentry flutter example] 應用程式。


[Sentry flutter example]: https://github.com/getsentry/sentry-dart/tree/main/flutter/example
[Create an account with Sentry]: https://sentry.io/signup/
[Bugsnag]: https://www.bugsnag.com/platforms/flutter
[Datadog]: https://docs.datadoghq.com/real_user_monitoring/flutter/
[Rollbar]: https://rollbar.com/
[Sentry]: https://sentry.io/welcome/
[`sentry_flutter`]: https://pub.dev/packages/sentry_flutter
[Sentry API]: https://pub.dev/documentation/sentry_flutter/latest/sentry_flutter/sentry_flutter-library.html
[Sentry's site]: https://docs.sentry.io/platforms/flutter/
[Firebase Crashlytics]: https://firebase.google.com/docs/crashlytics

