---
title: 測量您的應用程式大小
description: 如何測量 iOS 與 Android 的應用程式大小。
---

許多開發者都很關心編譯後的應用程式大小。
由於 Flutter 應用程式的 APK、app bundle 或 IPA 版本
是自包含的，並且包含執行應用程式所需的所有程式碼與資源，
因此其大小可能成為一項考量。應用程式越大，
在裝置上所需的空間就越多，
下載所需的時間也越長，
甚至可能超過某些實用功能的限制，
例如 Android 即時應用程式（instant apps）。

## Debug 版本並不具代表性

預設情況下，使用 `flutter run` 啟動您的應用程式，
或是在您的 IDE 中點擊 **Play** 按鈕
（如 [Write your first Flutter app][Write your first Flutter app] 中所示），
會產生 Flutter 應用程式的 _debug_ 版本。
Debug 版本的應用程式大小較大，原因是
包含了支援 hot reload 及原始碼層級偵錯的額外內容。
因此，這並不代表最終使用者下載的正式
應用程式大小。

## 檢查總大小

預設的 release 版本，例如使用 `flutter build apk` 或
`flutter build ios` 建立的版本，是為了方便將您的上傳套件
提交至 Play Store 和 App Store 而設計的。因此，它們也不代表
最終使用者實際下載的大小。各大商店通常會重新處理並拆分
您的上傳套件，以針對特定下載者及其硬體，
例如過濾出適合手機 DPI 的資源、過濾
針對手機 CPU 架構的原生程式庫。

### 估算總大小

若要在各平台上取得最接近實際的大小，請依照以下
指示操作。

#### Android

請參考 Google [Play Console 的說明][Play Console's instructions]，以檢查應用程式的下載與
安裝大小。

為您的應用程式產生上傳套件：

```console
flutter build appbundle
```

登入你的 [Google Play Console][Google Play Console]。將你的應用程式二進位檔（.aab 檔案）拖曳上傳。

在 **Android vitals** -> **App size** 分頁中檢視應用程式的下載與安裝大小。

{% render docs/app-figure.md, image:"perf/vital-size.png", alt:"Google Play Console 的 App size 分頁" %}

下載大小是根據 XXXHDPI（約 640dpi）裝置，且採用 arm64-v8a 架構計算。最終用戶的下載大小可能會依其硬體而有所不同。

頂部分頁有切換下載大小與安裝大小的選項。此頁面下方也提供優化建議。

#### iOS

建立 [Xcode App Size Report][Xcode App Size Report]。

首先，依照 [iOS 建立建置封存檔的指引][iOS create build archive instructions] 設定應用程式版本與建置。

接著：

1. 執行 `flutter build ipa --export-method development`。
1. 執行 `open build/ios/archive/*.xcarchive` 以在 Xcode 開啟封存檔。
1. 點擊 **Distribute App**。
1. 選擇發佈方式。如果你不打算發佈應用程式，選擇 **Development** 為最簡單。
1. 在 **App Thinning** 中，選擇「所有相容裝置變體」。
1. 選擇 **Strip Swift symbols**。

簽署並匯出 IPA。匯出後的目錄會包含 `App Thinning Size Report.txt`，其中詳細列出你預期在不同裝置與 iOS 版本上的應用程式大小。

Flutter 1.17 預設 demo 應用程式的 App Size Report 顯示：

```plaintext
Variant: Runner-7433FC8E-1DF4-4299-A7E8-E00768671BEB.ipa
Supported variant descriptors: [device: iPhone12,1, os-version: 13.0] and [device: iPhone11,8, os-version: 13.0]
App + On Demand Resources size: 5.4 MB compressed, 13.7 MB uncompressed
App size: 5.4 MB compressed, 13.7 MB uncompressed
On Demand Resources size: Zero KB compressed, Zero KB uncompressed
```

在此範例中，該應用程式在 iPhone12,1（iPhone 11 的 [型號 ID / 硬體編號][Model ID / Hardware
number]）以及 iPhone11,8（iPhone XR）執行 iOS 13.0 時，約略下載大小為 5.4 MB，安裝後大小約為 13.7 MB。

若要精確測量 iOS 應用程式的大小，必須將發佈版 IPA 上傳至 Apple 的 App Store Connect（[操作說明][instructions]），並從那裡取得大小報告。正如 [Flutter 引擎有多大？][How big is the Flutter engine?]（Flutter [FAQ][FAQ] 的一節）所說，IPA 通常比 APK 檔案還要大。

## 拆解應用程式大小

從 Flutter 1.22 版和 DevTools 0.9.1 版開始，內建了一個大小分析工具，協助開發者瞭解應用程式發佈版建置的組成。

:::warning
如上方 [檢查總大小](#檢查總大小) 一節所述，上傳套件並不代表最終用戶的下載大小。請注意，分析工具中出現的多餘原生程式庫架構和資源密度，最終會由 Play 商店和 App Store 過濾。
:::

可在建置時傳遞 `--analyze-size` 旗標來啟用大小分析工具：

- `flutter build apk --analyze-size`
- `flutter build appbundle --analyze-size`
- `flutter build ios --analyze-size`
- `flutter build linux --analyze-size`
- `flutter build macos --analyze-size`
- `flutter build windows --analyze-size`

此建置方式與標準發佈版有兩項不同：

1. 工具會以記錄 Dart 套件程式碼大小使用情形的方式編譯 Dart。
2. 工具會在終端機顯示高層級的大小拆解摘要，並留下 `*-code-size-analysis_*.json` 檔案，供 DevTools 進一步詳細分析。

除了分析單一建置外，也可以將兩個建置產生的 `*-code-size-analysis_*.json` 檔案載入 DevTools 進行差異比對。詳情請參考 [DevTools 文件][DevTools documentation]。

{% render docs/app-figure.md, image:"perf/size-summary.png", alt:"Android 應用程式在終端機中的大小摘要" %}

透過摘要，您可以快速掌握各類別（如資源、原生程式碼、Flutter 函式庫等）的大小使用情形。編譯後的 Dart 原生程式庫還會依套件進一步拆解，方便快速分析。

:::warning
此工具在 iOS 上會產生 .app 檔案而非 IPA。請利用此工具評估 .app 內容的相對大小。若要更接近下載大小的估算，請參考上方 [估算總大小](#估算總大小) 一節。
:::

### 在 DevTools 進行更深入分析

上述產生的 `*-code-size-analysis_*.json` 檔案可在 DevTools 進一步詳細分析，可用樹狀或樹狀圖（treemap）檢視將應用程式內容拆解到單一檔案層級，甚至 Dart AOT 產物的函式層級。

可透過 `dart devtools`，選擇 `Open app size tool` 並上傳 JSON 檔案來完成。

{% render docs/app-figure.md, image:"perf/devtools-size.png", alt:"DevTools 中的應用程式拆解範例" %}

如需進一步瞭解 DevTools 應用程式大小工具的使用方式，請參考 [DevTools 文件][DevTools documentation]。

## 減少應用程式大小

建置發佈版時，建議使用 `--split-debug-info` 標籤。此標籤可大幅減少程式碼大小。關於此標籤的使用範例，請參考 [Dart 程式碼混淆][Obfuscating Dart code]。

其他減少應用程式大小的方法包括：

* 移除未使用的資源
* 最小化從函式庫匯入的資源
* 壓縮 PNG 和 JPEG 檔案

[FAQ]: /resources/faq
[How big is the Flutter engine?]: /resources/faq#how-big-is-the-flutter-engine
[instructions]: /deployment/ios
[Xcode App Size Report]: {{site.apple-dev}}/documentation/xcode/reducing_your_app_s_size#3458589
[iOS create build archive instructions]: /deployment/ios#update-the-apps-build-and-version-numbers
[Model ID / Hardware number]: https://en.wikipedia.org/wiki/List_of_iOS_devices#Models
[Obfuscating Dart code]: /deployment/obfuscate
[Write your first Flutter app]: /get-started/codelab
[Play Console's instructions]: https://support.google.com/googleplay/android-developer/answer/9302563?hl=en
[Google Play Console]: https://play.google.com/apps/publish/
[DevTools documentation]: /tools/devtools/app-size
