---
title: 在你的 Flutter 行動應用程式或遊戲中加入廣告
shortTitle: 顯示廣告
description: 如何使用 google_mobile_ads 套件在 Flutter 中顯示廣告。
---

<?code-excerpt path-base="cookbook/plugins/google_mobile_ads"?>

{% comment %}
  這部分內容與 AdMob 文件有部分重複
  參見：https://developers.google.com/admob/flutter/quick-start
  
  本頁的附加價值在於，它對於只擁有 Flutter 應用程式或遊戲並希望加入
  營利化的開發者來說，更加直接易懂。
  
  簡而言之，這是一份更友善（但不如官方文件全面）的
  Flutter 廣告入門介紹。
{% endcomment %}


許多開發者會利用廣告來為他們的行動應用程式和遊戲營利。
這讓他們的應用程式可以免費下載，
進一步提升應用程式的普及度。

![一張顯示廣告的智慧型手機插圖](/assets/images/docs/cookbook/ads-device.jpg){:.site-illustration}

要在你的 Flutter 專案中加入廣告，請使用
[AdMob](https://admob.google.com/home/)，
Google 的行動廣告平台。
本教學將示範如何使用
[`google_mobile_ads`]({{site.pub-pkg}}/google_mobile_ads)
套件，將橫幅廣告（banner ad）加入你的應用程式或遊戲中。

:::note
除了 AdMob 之外，`google_mobile_ads` 套件也支援
Ad Manager，一個專為大型出版商設計的平台。整合 Ad
Manager 的流程與整合 AdMob 類似，但本教學不會涵蓋相關內容。若要使用 Ad Manager，請參考
[Ad Manager 文件]({{site.developers}}/ad-manager/mobile-ads-sdk/flutter/quick-start)。
:::

## 1. 取得 AdMob App ID

1.  前往 [AdMob](https://admob.google.com/) 並建立帳戶。
    這個過程可能需要一些時間，因為你需要提供
    銀行資訊、簽署合約等。

2.  帳戶建立完成後，在 AdMob 中建立兩個 *Apps*：一個給
    Android，一個給 iOS。

3.  開啟 **App 設定** 區段。

4.  取得 Android 應用程式與 iOS 應用程式的 AdMob *App ID*。
    它們的格式類似 `ca-app-pub-1234567890123456~1234567890`。請注意
    兩組數字之間的波浪號（`~`）。
    {% comment %} https://support.google.com/admob/answer/7356431 供日後參考 {% endcomment %}

    ![AdMob 截圖，顯示 App ID 的位置](/assets/images/docs/cookbook/ads-app-id.png)

## 2. 平台專屬設定

更新你的 Android 與 iOS 設定，將 App ID 加入其中。

{% comment %}
    以下內容大致上是從 devsite 複製而來：
    https://developers.google.com/admob/flutter/quick-start#platform_specific_setup
{% endcomment %}

### Android

將你的 AdMob App ID 加入 Android 應用程式。

1.  開啟應用程式的 `android/app/src/main/AndroidManifest.xml` 檔案。

2.  新增一個 `<meta-data>` 標籤。

3.  設定 `android:name` 元素，其值為
    `com.google.android.gms.ads.APPLICATION_ID`。

4.  設定 `android:value` 元素，其值為你在前一步取得的 AdMob App ID。
    請如範例所示加上引號：

    ```xml
    <manifest>
        <application>
            ...
    
            <!-- Sample AdMob app ID: ca-app-pub-3940256099942544~3347511713 -->
            <meta-data
                android:name="com.google.android.gms.ads.APPLICATION_ID"
                android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
        </application>
    </manifest>
    ```

### iOS

將你的 AdMob app ID 加入至你的 iOS 應用程式。

1.  開啟你的應用程式的 `ios/Runner/Info.plist` 檔案。

2.  使用 `key` 標籤包住 `GADApplicationIdentifier`。

3.  使用 `string` 標籤包住你的 AdMob app ID。你已在 [步驟 1](#1-取得-admob-app-id) 中建立了這個 AdMob App ID。

    ```xml
    <key>GADApplicationIdentifier</key>
    <string>ca-app-pub-################~##########</string>
    ```

## 3. 新增 `google_mobile_ads` 插件

要將 `google_mobile_ads` 插件加入為相依套件，請執行
`flutter pub add`：

```console
$ flutter pub add google_mobile_ads
```

:::note
當你加入這個插件後，你的 Android 應用程式可能會因為
`DexArchiveMergerException` 而無法建置：

```plaintext
Error while merging dex archives:
The number of method references in a .dex file cannot exceed 64K.
```

為了解決這個問題，請在終端機中執行 `flutter run` 指令，而不是透過 IDE 外掛程式執行。`flutter` 工具可以偵測到此問題，並詢問是否需要嘗試修復。請回答 `y`，問題就會被解決。之後，你可以回到 IDE 中執行你的應用程式。

![`flutter` 工具詢問是否啟用 multidex 支援的螢幕截圖](/assets/images/docs/cookbook/ads-multidex.png)
:::

## 4. 初始化 Mobile Ads SDK

在載入廣告前，你需要先初始化 Mobile Ads SDK。

1.  呼叫 `MobileAds.instance.initialize()` 來初始化 Mobile Ads SDK。

    <?code-excerpt "lib/main.dart (main)"?>
    ```dart
    void main() async {
      WidgetsFlutterBinding.ensureInitialized();
      unawaited(MobileAds.instance.initialize());
    
      runApp(const MyApp());
    }
    ```

如上所示，請在應用程式啟動時執行初始化步驟，
以確保 AdMob SDK 有足夠的時間進行初始化，並在需要時已經就緒。

:::note
`MobileAds.instance.initialize()` 會回傳一個 `Future`，但由於
SDK 的設計方式，您不需要對其進行 `await`。
如果您在 `Future` 尚未完成時嘗試載入廣告，
SDK 會自動等待初始化完成，然後再載入廣告。
如果您想要得知 AdMob SDK 何時準備就緒，也可以 await 這個 `Future`。
:::

## 5. 載入橫幅廣告（banner ad）

若要顯示廣告，您需要向 AdMob 請求廣告。

要載入橫幅廣告，請建立一個 `BannerAd` 實例，
並對其呼叫 `load()`。

:::note
以下程式碼片段會提及 `adSize`、`adUnitId`
以及 `_bannerAd` 等欄位。這些內容在後續步驟中會更清楚。
:::

<?code-excerpt "lib/my_banner_ad.dart (loadAd)"?>
```dart
/// Loads a banner ad.
void _loadAd() {
  final bannerAd = BannerAd(
    size: widget.adSize,
    adUnitId: widget.adUnitId,
    request: const AdRequest(),
    listener: BannerAdListener(
      // Called when an ad is successfully received.
      onAdLoaded: (ad) {
        if (!mounted) {
          ad.dispose();
          return;
        }
        setState(() {
          _bannerAd = ad as BannerAd;
        });
      },
      // Called when an ad request failed.
      onAdFailedToLoad: (ad, error) {
        debugPrint('BannerAd failed to load: $error');
        ad.dispose();
      },
    ),
  );

  // Start loading.
  bannerAd.load();
}
```

若要查看完整範例，請參考本教學最後一步。


## 6. 顯示橫幅廣告（banner ad）

當你已經有一個已載入的 `BannerAd` 實例後，請使用 `AdWidget` 來顯示它。

```dart
AdWidget(ad: _bannerAd)
```

建議將元件（Widget）包裹在`SafeArea`（這樣可以避免廣告被裝置的瀏海遮擋）以及`SizedBox`（這樣在載入前後都能保持其指定的固定尺寸）中。

<?code-excerpt "lib/my_banner_ad.dart (build)"?>
```dart
@override
Widget build(BuildContext context) {
  return SafeArea(
    child: SizedBox(
      width: widget.adSize.width.toDouble(),
      height: widget.adSize.height.toDouble(),
      child: _bannerAd == null
          // Nothing to render yet.
          ? const SizedBox()
          // The actual ad.
          : AdWidget(ad: _bannerAd!),
    ),
  );
}
```

當你不再需要存取某個廣告時，必須將其釋放（dispose）。最佳實踐是在 `AdWidget` 從元件樹（widget tree）移除之後，或是在 `BannerAdListener.onAdFailedToLoad()` 回呼（callback）中呼叫 `dispose()`。

<?code-excerpt "lib/my_banner_ad.dart (dispose)"?>
```dart
_bannerAd?.dispose();
```


## 7. 設定廣告

若要顯示測試廣告以外的內容，您必須註冊廣告單元（Ad unit）。

1.  開啟 [AdMob](https://admob.google.com/)。

2.  為每個 AdMob 應用程式建立一個 *Ad unit*（廣告單元）。

    ![AdMob 網頁介面中 Ad Units 位置的螢幕截圖](/assets/images/docs/cookbook/ads-ad-unit.png)

    這個步驟會要求您選擇 Ad unit 的格式。AdMob 提供多種格式，
    除了橫幅廣告（banner ads）之外，還有插頁式廣告（interstitials）、獎勵式廣告（rewarded ads）、應用程式開啟廣告（app open ads）等等。
    這些格式的 API 類似，相關說明可參考
    [AdMob 文件]({{site.developers}}/admob/flutter/quick-start)
    以及
    [官方範例](https://github.com/googleads/googleads-mobile-flutter/tree/main/samples/admob)。

3.  選擇橫幅廣告（banner ads）。

4.  取得 Android 應用程式與 iOS 應用程式的 *Ad unit IDs*（廣告單元 ID）。
    您可以在 **Ad units** 區段找到這些 ID。它們的格式類似 `ca-app-pub-1234567890123456/1234567890`，
    其格式與 *App ID* 類似，但兩組數字之間多了一個斜線（`/`）。
    這樣可以區分 *Ad unit ID* 與 *App ID*。

    ![AdMob 網頁介面中 Ad Unit ID 的螢幕截圖](/assets/images/docs/cookbook/ads-ad-unit-id.png)

5.  根據目標應用程式平台，將這些 *Ad unit IDs* 加入 `BannerAd` 的建構函式中。

    <?code-excerpt "lib/my_banner_ad.dart (adUnitId)"?>
    ```dart
    final String adUnitId = Platform.isAndroid
        // Use this ad unit on Android...
        ? 'ca-app-pub-3940256099942544/6300978111'
        // ... or this one on iOS.
        : 'ca-app-pub-3940256099942544/2934735716';
    ```

## 8. 最後修飾

若要在已發佈的應用程式或遊戲中顯示廣告（而非僅在除錯或測試情境下），您的應用程式必須符合額外的要求：

1.  您的應用程式必須經過審核並獲得批准後，才能完整投放廣告。
    請遵循 AdMob 的 [應用程式準備指引](https://support.google.com/admob/answer/10564477)。
    例如，您的應用程式必須至少上架於 Google Play Store 或 Apple App Store 等支援的商店之一。

2.  您必須[建立 `app-ads.txt`](https://support.google.com/admob/answer/9363762)
    檔案並將其發佈在您的開發者網站上。

![An illustration of a smartphone showing an ad](/assets/images/docs/cookbook/ads-device.jpg){:.site-illustration}

如需進一步瞭解應用程式與遊戲的變現方式，請造訪
[AdMob](https://admob.google.com/)
及 [Ad Manager](https://admanager.google.com/)
的官方網站。

## 9. 完整範例

以下程式碼實作了一個簡單的有狀態元件（StatefulWidget），用於載入並顯示橫幅廣告（banner ad）。

<?code-excerpt "lib/my_banner_ad.dart"?>
```dart
import 'dart:io';

import 'package:flutter/widgets.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class MyBannerAdWidget extends StatefulWidget {
  /// The requested size of the banner. Defaults to [AdSize.banner].
  final AdSize adSize;

  /// The AdMob ad unit to show.
  ///
  /// TODO: replace this test ad unit with your own ad unit
  final String adUnitId = Platform.isAndroid
      // Use this ad unit on Android...
      ? 'ca-app-pub-3940256099942544/6300978111'
      // ... or this one on iOS.
      : 'ca-app-pub-3940256099942544/2934735716';

  MyBannerAdWidget({super.key, this.adSize = AdSize.banner});

  @override
  State<MyBannerAdWidget> createState() => _MyBannerAdWidgetState();
}

class _MyBannerAdWidgetState extends State<MyBannerAdWidget> {
  /// The banner ad to show. This is `null` until the ad is actually loaded.
  BannerAd? _bannerAd;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SizedBox(
        width: widget.adSize.width.toDouble(),
        height: widget.adSize.height.toDouble(),
        child: _bannerAd == null
            // Nothing to render yet.
            ? const SizedBox()
            // The actual ad.
            : AdWidget(ad: _bannerAd!),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _loadAd();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  /// Loads a banner ad.
  void _loadAd() {
    final bannerAd = BannerAd(
      size: widget.adSize,
      adUnitId: widget.adUnitId,
      request: const AdRequest(),
      listener: BannerAdListener(
        // Called when an ad is successfully received.
        onAdLoaded: (ad) {
          if (!mounted) {
            ad.dispose();
            return;
          }
          setState(() {
            _bannerAd = ad as BannerAd;
          });
        },
        // Called when an ad request failed.
        onAdFailedToLoad: (ad, error) {
          debugPrint('BannerAd failed to load: $error');
          ad.dispose();
        },
      ),
    );

    // Start loading.
    bannerAd.load();
  }

}
```

:::tip
在許多情況下，你會希望在元件（Widget）_之外_載入廣告。

例如，你可以在`ChangeNotifier`、BLoC、控制器（controller），或你用於應用層狀態管理的其他地方載入。這樣一來，你可以預先載入橫幅廣告（banner ad），當使用者導覽到新螢幕時，廣告就能立即顯示。

請確認在使用`AdWidget`顯示`BannerAd`實例之前，已經成功載入該實例，並且在不再需要時妥善釋放（dispose）該實例。
:::
