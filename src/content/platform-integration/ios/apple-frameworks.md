---
title: 善用 Apple 的系統 API 與框架
description: >-
  了解提供與 Apple 框架等效功能的 Flutter 套件（plugin）。
---

當你來自 iOS 開發背景時，你可能需要尋找能提供與 Apple 系統函式庫相同功能的 Flutter 套件（plugin）。這可能包括存取裝置硬體或與特定框架（如 `HealthKit`）互動。

若想了解 SwiftUI 框架與 Flutter 的比較，請參閱 [Flutter for SwiftUI developers][Flutter for SwiftUI developers]。

## 介紹 Flutter 套件（plugin）

Dart 稱包含平台專屬程式碼的函式庫為 _plugin_（套件），即「plugin package」的簡稱。
當你使用 Flutter 開發應用程式時，會透過 _plugin_ 與系統函式庫互動。

在 Dart 程式碼中，你會使用該 plugin 的 Dart API 來呼叫所需的系統原生程式碼。這代表你只需撰寫呼叫 Dart API 的程式碼，API 會自動處理所有該 plugin 支援的平台。

想進一步了解 plugin，請參閱 [Using packages][Using packages]。
雖然本頁面僅列出部分熱門 plugin，你可以在 [pub.dev][pub.dev] 上找到數千個 plugin 及其範例。
下表並不推薦任何特定 plugin。
如果你找不到符合需求的套件，可以自行開發，或直接在專案中使用平台通道（platform channels）。
欲了解更多，請參閱 [Writing platform-specific code][Writing platform-specific code]。

## 將 plugin 加入你的專案

若要在原生專案中使用 Apple 框架，需在 Swift 或 Objective-C 檔案中匯入該框架。

若要新增 Flutter plugin，請在專案根目錄執行 `flutter pub add package_name`。
這會將相依性加入你的 [`pubspec.yaml`][`pubspec.yaml`] 檔案。
加入相依性後，請在 Dart 檔案中加入該套件的 `import` 陳述式。

你可能還需要調整應用程式設定或初始化邏輯。
如有需要，請參閱該套件於 [pub.dev][pub.dev] 上的「Readme」頁面以取得詳細說明。

### Flutter 套件與 Apple 框架對照表

| 使用情境                                       | Apple 框架或類別                                                              | Flutter 套件（Plugin）       |
|------------------------------------------------|-------------------------------------------------------------------------------|------------------------------|
| 存取相簿                                       | `PhotoKit`，使用 `Photos` 與 `PhotosUI ` 框架及 `UIImagePickerController`                | [`image_picker`][`image_picker`]           |
| 存取相機                                       | `UIImagePickerController`，使用 `.camera` `sourceType`                            | [`image_picker`][`image_picker`]           |
| 使用進階相機功能                               | `AVFoundation`                                                                        | [`camera`][`camera`]                 |
| 提供應用程式內購買                             | `StoreKit`                                                                            | [`in_app_purchase`][`in_app_purchase`][^1]    |
| 處理支付流程                                   | `PassKit`                                                                             | [`pay`][`pay`][^2]                |
| 發送推播通知                                   | `UserNotifications`                                                                   | [`firebase_messaging`][`firebase_messaging`][^3] |
| 取得 GPS 座標                                  | `CoreLocation`                                                                        | [`geolocator`][`geolocator`]             |
| 存取感測器資料[^4]                             | `CoreMotion`                                                                          | [`sensors_plus`][`sensors_plus`]           |
| 執行網路請求                                   | `URLSession`                                                                          | [`http`][`http`]                   |
| 儲存鍵值資料                                   | `@AppStorage` 屬性包裝器及 `NSUserDefaults`                                   | [`shared_preferences`][`shared_preferences`]     |
| 資料庫持久化                                   | `CoreData` 或 SQLite                                                                  | [`sqflite`][`sqflite`]                |
| 存取健康資料                                   | `HealthKit`                                                                           | [`health`][`health`]                 |
| 使用機器學習                                   | `CoreML`                                                                              | [`google_ml_kit`][`google_ml_kit`][^5]      |
| 文字辨識                                       | `VisionKit`                                                                           | [`google_ml_kit`][`google_ml_kit`][^5]      |
| 語音辨識                                       | `Speech`                                                                              | [`speech_to_text`][`speech_to_text`]         |
| 擴增實境                                       | `ARKit`                                                                               | [`ar_flutter_plugin`][`ar_flutter_plugin`]      |
| 存取天氣資料                                   | `WeatherKit`                                                                          | [`weather`][`weather`][^6]            |
| 存取與管理聯絡人                               | `Contacts`                                                                            | [`contacts_service`][`contacts_service`]       |
| 主畫面顯示快速操作                             | `UIApplicationShortcutItem`                                                           | [`quick_actions`][`quick_actions`]          |
| Spotlight 搜尋索引                             | `CoreSpotlight`                                                                       | [`flutter_core_spotlight`][`flutter_core_spotlight`] |
| 設定、更新與與 Widget 溝通                     | `WidgetKit`                                                                           | [`home_widget`][`home_widget`]            |
| 透過 Siri/捷徑自動化應用程式操作               | `AppIntents`                                                                          | [`intelligence`][`intelligence`]            |

{:.table .table-striped .nowrap}

[^1]: Supports both Google Play Store on Android and Apple App Store on iOS.
[^2]: Adds Google Pay payments on Android and Apple Pay payments on iOS.
[^3]: Uses Firebase Cloud Messaging and integrates with APNs.
[^4]: Includes sensors like accelerometer, gyroscope, etc.
[^5]: Uses Google's ML Kit and supports various features like text recognition, face detection, image labeling, landmark recognition, and barcode scanning. You can also create a custom model with Firebase. To learn more, see [Use a custom TensorFlow Lite model with Flutter][Use a custom TensorFlow Lite model with Flutter].
[^6]: Uses the [OpenWeatherMap API][OpenWeatherMap API]. Other packages exist that can pull from different weather APIs.

[Flutter for SwiftUI developers]: /get-started/flutter-for/swiftui-devs
[Using packages]: /packages-and-plugins/using-packages
[pub.dev]: {{site.pub-pkg}}
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[`http`]: {{site.pub-pkg}}/http
[`sensors_plus`]: {{site.pub-pkg}}/sensors_plus
[`geolocator`]: {{site.pub-pkg}}/geolocator
[`image_picker`]: {{site.pub-pkg}}/image_picker
[`pubspec.yaml`]: /tools/pubspec
[`quick_actions`]: {{site.pub-pkg}}/quick_actions
[`in_app_purchase`]: {{site.pub-pkg}}/in_app_purchase
[`pay`]: {{site.pub-pkg}}/pay
[`firebase_messaging`]: {{site.pub-pkg}}/firebase_messaging
[`google_ml_kit`]: {{site.pub-pkg}}/google_ml_kit
[Use a custom TensorFlow Lite model with Flutter]: {{site.firebase}}/docs/ml/flutter/use-custom-models
[`speech_to_text`]: {{site.pub-pkg}}/speech_to_text
[`ar_flutter_plugin`]: {{site.pub-pkg}}/ar_flutter_plugin
[`weather`]: {{site.pub-pkg}}/weather
[`contacts_service`]: {{site.pub-pkg}}/contacts_service
[`health`]: {{site.pub-pkg}}/health
[OpenWeatherMap API]: https://openweathermap.org/api
[`sqflite`]: {{site.pub-pkg}}/sqflite
[Writing platform-specific code]: /platform-integration/platform-channels
[`camera`]: {{site.pub-pkg}}/camera
[`flutter_core_spotlight`]: {{site.pub-pkg}}/flutter_core_spotlight
[`home_widget`]: {{site.pub-pkg}}/home_widget
[`intelligence`]: {{site.pub-pkg}}/intelligence
