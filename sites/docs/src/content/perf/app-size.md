---
title: 測量您的應用程式大小
description: 如何測量 iOS 與 Android 的應用程式大小。
---

許多開發者都很關心他們編譯後的應用程式大小。
由於 Flutter 應用程式的 APK、app bundle 或 IPA 版本
是自包含的，並且包含執行應用程式所需的所有程式碼與資源（Assets），
因此其大小可能成為一個問題。應用程式越大，
在裝置上所需的空間就越多，
下載所需的時間也會越長，
而且可能會超過某些實用功能的限制，
例如 Android 即時應用程式（instant apps）。

## Debug 版本不具代表性

預設情況下，使用 `flutter run` 啟動您的應用程式，
或是在您的 IDE 中點擊 **Play** 按鈕，
會產生 Flutter 應用程式的 _debug_ 版本。
Debug 版本的應用程式大小較大，這是因為
其包含了支援 hot reload 及原始碼層級除錯的除錯開銷。
因此，這並不代表最終用戶下載的正式版（production）
應用程式的大小。

## 檢查總體大小

預設的 release 版本，例如使用 `flutter build apk` 或
`flutter build ios` 所建立的版本，是為了方便您組裝
上傳至 Play Store 與 App Store 的套件。
因此，這些也不代表
最終用戶實際下載的大小。應用程式商店通常會重新處理並拆分
您上傳的套件，以針對特定的下載者及其硬體做最佳化，
例如根據手機的 DPI 過濾資源（Assets），
根據手機的 CPU 架構過濾原生程式庫。

### 預估總體大小

要獲得各平台上最接近實際的應用程式大小，請依照下列
說明操作。

#### Android

請依照 Google [Play Console 的說明][Play Console's instructions] 來檢查應用程式的下載與
安裝大小。

為您的應用程式產生一個上傳套件：

```console
flutter build appbundle
```

登入你的 [Google Play Console][]。將你的應用程式二進位檔（.aab 檔案）拖曳上傳。

在 **Android vitals** -> **App size** 分頁中檢視應用程式的下載與安裝大小。

<DashImage figure image="perf/vital-size.png" alt="Google Play Console 中的 App size 分頁" />

下載大小是根據 XXXHDPI（約 640dpi）裝置及 arm64-v8a 架構計算。實際使用者的下載大小可能會依其硬體而有所不同。

上方分頁有下載大小與安裝大小的切換。此頁面下方也提供了優化建議。

#### iOS

建立 [Xcode App Size Report][]。

首先，請依照 [iOS 建立 build archive 指南][iOS create build archive instructions] 設定 app 版本與建置。

接著：

1. 執行 `flutter build ipa --export-method development`。
1. 執行 `open build/ios/archive/*.xcarchive` 以在 Xcode 中開啟 archive。
1. 點選 **Distribute App**。
1. 選擇發佈方式。如果你不打算發佈應用程式，選擇 **Development** 最為簡單。
1. 在 **App Thinning** 中，選擇「all compatible device variants」。
1. 勾選 **Strip Swift symbols**。

簽署並匯出 IPA。匯出後的目錄中會包含 `App Thinning Size Report.txt`，其中詳細說明了你預期在不同裝置與 iOS 版本上的應用程式大小。

Flutter 1.17 預設 demo app 的 App Size Report 顯示如下：

```plaintext
Variant: Runner-7433FC8E-1DF4-4299-A7E8-E00768671BEB.ipa
Supported variant descriptors: [device: iPhone12,1, os-version: 13.0] and [device: iPhone11,8, os-version: 13.0]
App + On Demand Resources size: 5.4 MB compressed, 13.7 MB uncompressed
App size: 5.4 MB compressed, 13.7 MB uncompressed
On Demand Resources size: Zero KB compressed, Zero KB uncompressed
```

在這個範例中，該應用程式於 iPhone12,1（[Model ID / Hardware number][]，即 iPhone 11）及 iPhone11,8（iPhone XR）運行 iOS 13.0 時，約略下載大小為 5.4 MB，安裝後大小約為 13.7 MB。

若要精確測量 iOS 應用程式的大小，必須將發行版 IPA 上傳至 Apple 的 App Store Connect（[操作說明][instructions]），並從該處取得大小報告。正如 [Flutter 引擎有多大？][How big is the Flutter engine?]（Flutter [FAQ][] 內的章節）所說，IPA 通常比 APK 更大。

## 大小拆解

自 Flutter 1.22 版與 DevTools 0.9.1 版起，內建了一個大小分析工具，協助開發者了解應用程式發行版建構結果的組成。

:::warning
如上方 [檢查總大小](#checking-the-total-size) 章節所述，上傳套件並不代表最終使用者的實際下載大小。請注意，分析工具中看到的多餘原生函式庫架構與資產密度，最終會被 Play Store 與 App Store 過濾。
:::

可在建構時傳遞 `--analyze-size` 旗標來呼叫大小分析工具：

- `flutter build apk --analyze-size`
- `flutter build appbundle --analyze-size`
- `flutter build ios --analyze-size`
- `flutter build linux --analyze-size`
- `flutter build macos --analyze-size`
- `flutter build windows --analyze-size`

這種建構方式與標準發行版建構有兩點不同：

1. 工具會以記錄 Dart 套件程式碼大小用量的方式編譯 Dart。
2. 工具會在終端機顯示高層級的大小拆解摘要，並留下 `*-code-size-analysis_*.json` 檔案，供 DevTools 進一步詳細分析。

除了分析單一建構結果外，也可以將兩個 `*-code-size-analysis_*.json` 檔案載入 DevTools 進行差異比較。詳情請參閱 [DevTools 文件][DevTools documentation]。

<DashImage figure image="perf/size-summary.png" alt="Size summary of an Android application in terminal" />

透過這份摘要，你可以快速掌握各類別（如資源、原生程式碼、Flutter 函式庫等）的大小用量。編譯後的 Dart 原生函式庫也會依套件進一步拆解，方便快速分析。

:::warning
此工具在 iOS 上產生的是 .app，而非 IPA。請用此工具評估 .app 內容的相對大小。若要更接近實際下載大小，請參考上方 [估算總大小](#estimating-total-size) 章節。
:::

### 在 DevTools 進行更深入分析

上述產生的 `*-code-size-analysis_*.json` 檔案可於 DevTools 進行更細緻的分析，透過樹狀或樹狀圖（treemap）檢視，將應用程式內容細分到單一檔案層級，甚至 Dart AOT 產物的函式層級。

你可以透過 `dart devtools`，選擇 `Open app size tool` 並上傳該 JSON 檔案來完成。

<DashImage figure image="perf/devtools-size.png" alt="Example breakdown of app in DevTools" />

如需進一步了解如何使用 DevTools 應用程式大小工具，請參閱 [DevTools 文件][DevTools documentation]。

## 減少應用程式大小

建構應用程式發行版時，建議使用 `--split-debug-info` 標籤。此標籤可大幅減少程式碼大小。範例請參閱 [混淆 Dart 程式碼][Obfuscating Dart code]。

你還可以採取以下措施讓應用程式更小：

* 移除未使用的資源
* 最小化從函式庫匯入的資源
* 壓縮 PNG 與 JPEG 檔案

另一種縮減應用程式大小的方式是使用平台特定程式碼。Dart 編譯器會移除目標平台上無法到達的程式碼。例如，如果你有專屬於 Windows 的程式碼，可以使用 `dart:io` 中的 `Platform` 類別將其包裹在條件判斷中，例如 `if (Platform.isWindows)`。當你為 Android 建置應用程式時，編譯器會發現這個判斷式始終為 false，並從發行版建構中移除 Windows 特定的程式碼。


[FAQ]: /resources/faq
[How big is the Flutter engine?]: /resources/faq#how-big-is-the-flutter-engine
[instructions]: /deployment/ios
[Xcode App Size Report]: {{site.apple-dev}}/documentation/xcode/reducing_your_app_s_size#3458589
[iOS create build archive instructions]: /deployment/ios#update-the-apps-build-and-version-numbers
[Model ID / Hardware number]: https://en.wikipedia.org/wiki/List_of_iOS_devices#Models
[Obfuscating Dart code]: /deployment/obfuscate
[Play Console's instructions]: https://support.google.com/googleplay/android-developer/answer/9302563?hl=en
[Google Play Console]: https://play.google.com/apps/publish/
[DevTools documentation]: /tools/devtools/app-size
