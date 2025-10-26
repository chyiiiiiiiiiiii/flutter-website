---
title: 新增資源與圖片
description: 如何在 Flutter 應用程式中使用圖片（及其他資源）。
shortTitle: 資源與圖片
---

<?code-excerpt path-base="ui/assets_and_images/lib"?>

Flutter 應用程式可以包含程式碼與_資源_（assets，有時也稱為 resources）。資源是一種與應用程式一起打包並部署的檔案，並可於執行時存取。常見的資源類型包括靜態資料（例如 JSON 檔案）、設定檔、圖示以及圖片（JPEG、WebP、GIF、動畫 WebP/GIF、PNG、BMP 和 WBMP）。

## 指定資源

Flutter 會使用位於專案根目錄下的 [`pubspec.yaml`][`pubspec.yaml`] 檔案來識別應用程式所需的資源。

以下是一個範例：

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

若要包含某個目錄下的所有資源（Assets），請在目錄名稱結尾加上`/`字元：

```yaml
flutter:
  assets:
    - directory/
    - directory/subdirectory/
```

:::note
只有直接位於該目錄下的檔案會被包含進來。
[支援解析度的資源圖片變體](#resolution-aware) 是唯一的例外。
若要加入位於子目錄中的檔案，請為每個目錄建立一個項目。
:::

:::note
YAML 的縮排很重要。如果你看到類似
`Error: unable to find directory entry in pubspec.yaml`
的錯誤，可能是在 pubspec 檔案中縮排不正確。請參考以下[錯誤範例]：
```yaml
flutter:
assets:
  - directory/
```
`assets:` 這一行應該要比 `flutter:` 這一行向下縮排剛好兩個空格：
```yaml
flutter:
  assets:
    - directory/
```
:::

### 資源（Asset）打包

`flutter` 區段下的 `assets` 子區段
用來指定應該隨應用程式一同包含的檔案。
每個資源都以明確的路徑標識
（相對於 `pubspec.yaml` 檔案）來指定資源
檔案的位置。資源宣告的順序沒有影響。實際使用的目錄名稱
（第一個範例中的 `assets` 或上述
範例中的 `directory`）也沒有影響。

在建置期間，Flutter 會將資源放入一個特殊的
封存檔，稱為 _資源包（asset bundle）_，應用程式在執行時會從中讀取資源。

### 建置時自動轉換資源檔案

Flutter 支援在建置應用程式時，使用 Dart 套件來轉換資源檔案。
若要這麼做，請在 pubspec 檔案中指定資源檔案與轉換器套件。
若要了解如何操作及撰寫自己的資源轉換套件，請參考
[Transforming assets at build time][Transforming assets at build time]。

## 載入資源

您的應用程式可以透過
[`AssetBundle`][`AssetBundle`] 物件存取其資源。

資源包（asset bundle）上有兩個主要方法，可讓您根據邏輯鍵（logical key）從資源包中載入
字串／文字資源（`loadString()`）或圖片／二進位資源（`load()`）。
邏輯鍵會對應到建置時在 `pubspec.yaml` 檔案中指定的資源路徑。

### 載入文字資源

每個 Flutter 應用程式都有一個 [`rootBundle`][`rootBundle`]
物件，方便存取主要的資源包。
您也可以直接使用
`rootBundle` 全域靜態成員，來自
`package:flutter/services.dart`，載入資源。

然而，建議您使用 [`DefaultAssetBundle`][`DefaultAssetBundle`]
取得目前 `BuildContext` 的 `AssetBundle`，
而不是直接使用隨應用程式建置的預設資源包；
這種做法允許父元件（widget）在執行時替換成不同的 `AssetBundle`，
對於在地化或測試情境非常有用。

通常，您會使用 `DefaultAssetBundle.of()`
間接從應用程式執行時的 `rootBundle` 載入資源，例如 JSON 檔案。

{% comment %}
  這裡需要一個範例，說明如何使用 DefaultAssetBundle.of 取得目前 BuildContext 的 AssetBundle
{% endcomment %}

在沒有 `Widget` context，或無法取得 `AssetBundle` 的情況下，
您可以直接使用 `rootBundle` 載入這類資源。
例如：

<?code-excerpt "main.dart (root-bundle-load)"?>
```dart
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### 載入圖片

要載入圖片，請在元件（Widget）的 `build()` 方法中使用 [`AssetImage`][`AssetImage`] 類別。

例如，您的應用程式可以從前述範例中的資源（assets）宣告載入背景圖片：

<?code-excerpt "main.dart (background-image)"?>
```dart
return const Image(image: AssetImage('assets/background.png'));
```

### 支援解析度的圖片資源 {:#resolution-aware}

Flutter 可以根據目前的 [device pixel ratio][device pixel ratio] 載入最適合解析度的圖片。

[`AssetImage`][`AssetImage`] 會將邏輯上請求的資源對應到最接近目前 [device pixel ratio][device pixel ratio] 的實際資源。

為了讓這種對應方式能正常運作，資源應按照特定的目錄結構進行排列：

```plaintext
.../image.png
.../Mx/image.png
.../Nx/image.png
...etc.
```

其中 _M_ 和 _N_ 是數字識別碼，對應於所包含圖片的標稱解析度。換句話說，它們指定了這些圖片所對應的裝置像素比（device pixel ratio）。

在這個範例中，`image.png` 被視為*主要資源*（main asset），而 `Mx/image.png` 和 `Nx/image.png` 則被視為*變體*（variants）。

主要資源預設對應於 1.0 的解析度。例如，以下是一個名為 `my_icon.png` 的圖片資源配置方式：

```plaintext
.../my_icon.png       (mdpi baseline)
.../1.5x/my_icon.png  (hdpi)
.../2.0x/my_icon.png  (xhdpi)
.../3.0x/my_icon.png  (xxhdpi)
.../4.0x/my_icon.png  (xxxhdpi)
```

在裝置像素比（device pixel ratio）為 1.8 的裝置上，會選擇資源 `.../2.0x/my_icon.png`。
若裝置像素比為 2.7，則會選擇資源 `.../3.0x/my_icon.png`。

如果在 `Image` 元件（Widget）上未指定圖片的寬度與高度，則會使用標稱解析度（nominal resolution）來縮放資源，使其佔據與主資源相同的螢幕空間，只是解析度更高。也就是說，如果 `.../my_icon.png` 是 72px × 72px，那麼 `.../3.0x/my_icon.png` 應該是 216px × 216px；但如果未指定寬度與高度，兩者最終都會以 72px × 72px（邏輯像素）呈現。

:::note
[裝置像素比（Device pixel ratio）][Device pixel ratio] 取決於 [MediaQueryData.size][MediaQueryData.size]，而這需要 [MaterialApp][MaterialApp] 或 [CupertinoApp][CupertinoApp] 作為你的 [`AssetImage`][`AssetImage`] 的上層元件（ancestor）。
:::

#### 解析度感知圖片資源的打包方式 {:#resolution-aware-bundling}

你只需要在 `assets` 區段的 `pubspec.yaml` 中指定主資源或其父目錄即可。Flutter 會自動幫你打包所有變體。每個條目都應該對應到一個實際檔案，主資源條目除外。如果主資源條目沒有對應到實際檔案，則解析度最低的資源會作為備援，供解析度低於該值的裝置使用。不過，該條目仍然必須包含在 `pubspec.yaml` 清單中。

任何使用預設資源包（default asset bundle）的元件，在載入圖片時都會自動具備解析度感知功能。（如果你使用較低階的類別，例如 [`ImageStream`][`ImageStream`] 或 [`ImageCache`][`ImageCache`]，你也會發現有與縮放（scale）相關的參數。）

### 套件相依中的資源圖片 {:#from-packages}

若要從 [套件（package）][package] 相依中載入圖片，必須為 [`AssetImage`][`AssetImage`] 提供 `package` 參數。

舉例來說，假設你的應用程式依賴一個名為 `my_icons` 的套件，其目錄結構如下：

```plaintext
.../pubspec.yaml
.../icons/heart.png
.../icons/1.5x/heart.png
.../icons/2.0x/heart.png
...etc.
```

要載入圖片，請使用：

<?code-excerpt "main.dart (package-image)"?>
```dart
return const AssetImage('icons/heart.png', package: 'my_icons');
```

套件本身使用的資源，也應該如上所述，透過 `package` 參數來取得。

#### 套件資源的打包

如果所需的資源已在套件的 `pubspec.yaml` 檔案中指定，則會自動與應用程式一起打包。特別是，套件本身使用的資源，必須在其 `pubspec.yaml` 中指定。

套件也可以選擇在其 `lib/` 資料夾中放置未在 `pubspec.yaml` 檔案中指定的資源。在這種情況下，若要將這些圖片打包到應用程式中，應用程式必須在其 `pubspec.yaml` 中指定要包含哪些資源。例如，一個名為 `fancy_backgrounds` 的套件可能包含以下檔案：

```plaintext
.../lib/backgrounds/background1.png
.../lib/backgrounds/background2.png
.../lib/backgrounds/background3.png
```

要包含，例如，第一張圖片，應用程式的`pubspec.yaml`應在`assets`區段中指定它：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

`lib/` 是隱含的，因此在資源路徑中不應包含它。

如果你正在開發套件，要在套件內載入資源，請在該套件的 `pubspec.yaml` 中指定：

```yaml
flutter:
  assets:
    - assets/images/
```

要在您的套件中載入圖片，請使用：

```dart
return const AssetImage('packages/fancy_backgrounds/backgrounds/background1.png');
```

## 與底層平台共享資源

Flutter 資源（Assets）可以透過 `AssetManager`（於 Android）和 `NSBundle`（於 iOS）輕鬆地被平台程式碼存取。

### 在 Android 載入 Flutter 資源

在 Android 上，資源可透過 [`AssetManager`][`AssetManager`] API 取得。舉例來說，在 [`openFd`][`openFd`] 中所使用的查找鍵（lookup key），可以從 [`PluginRegistry.Registrar`][`PluginRegistry.Registrar`] 上的 `lookupKeyForAsset` 或 [`FlutterView`][`FlutterView`] 上的 `getLookupKeyForAsset` 取得。
當你在開發插件時，可以使用 `PluginRegistry.Registrar`；若你正在開發包含平台視圖（platform view）的應用程式，則應選擇 `FlutterView`。

舉例來說，假設你在 pubspec.yaml（設定檔）中指定了以下內容：

```yaml
flutter:
  assets:
    - icons/heart.png
```

這反映了您的 Flutter 應用程式中的以下結構。

```plaintext
.../pubspec.yaml
.../icons/heart.png
...etc.
```

若要從你的 Java 外掛程式碼中存取 `icons/heart.png`，請依照以下步驟操作：

```java
AssetManager assetManager = registrar.context().getAssets();
String key = registrar.lookupKeyForAsset("icons/heart.png");
AssetFileDescriptor fd = assetManager.openFd(key);
```

### 在 iOS 載入 Flutter 資源

在 iOS 上，資源可透過 [`mainBundle`][`mainBundle`] 取得。
舉例來說，在 [`pathForResource:ofType:`][`pathForResource:ofType:`] 中所使用的查找鍵，
是從 [`FlutterPluginRegistrar`][`FlutterPluginRegistrar`] 上的 `lookupKeyForAsset` 或 `lookupKeyForAsset:fromPackage:`，
或 [`FlutterViewController`][`FlutterViewController`] 上的 `lookupKeyForAsset:` 或 `lookupKeyForAsset:fromPackage:` 取得。
當開發 plugin（外掛）時可使用 `FlutterPluginRegistrar`，
而當開發包含平台視圖（platform view）的應用程式時則建議選用 `FlutterViewController`。

舉例來說，假設你已經有上述的 Flutter 設定。

若要從你的 Objective-C plugin 程式碼存取 `icons/heart.png`，
你可以這樣做：

```objc
NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
```

若要從您的 Swift 應用程式存取 `icons/heart.png`，您可以依照以下步驟操作：

```swift
let key = controller.lookupKey(forAsset: "icons/heart.png")
let mainBundle = Bundle.main
let path = mainBundle.path(forResource: key, ofType: nil)
```

如需更完整的範例，請參考 pub.dev 上
Flutter [`video_player` plugin][`video_player` plugin] 的實作。

### 在 Flutter 中載入 iOS 圖片

當你透過
[將 Flutter 加入現有 iOS 應用程式][add-to-app]
來實作 Flutter 時，你可能會有一些已經在 iOS 上託管的圖片想要在 Flutter 中使用。要達成這個目的，請使用 [平台通道（platform channels）][platform channels]，將圖片資料以 `FlutterStandardTypedData` 的形式傳遞到 Dart。

## 平台資源（Platform assets）

有時你需要直接在平台專案中處理資源。以下是兩個常見情境，這些情境下會在 Flutter 框架載入並執行之前使用到資源。

### 更新應用程式圖示

更新 Flutter 應用程式的啟動畫面圖示（launch icon）與在原生 Android 或 iOS 應用程式中更新啟動畫面圖示的方式相同。

![Launch icon](/assets/images/docs/assets-and-images/icon.png)

#### Android

在你的 Flutter 專案根目錄下，前往
`.../android/app/src/main/res`。各個點陣圖資源資料夾（如 `mipmap-hdpi`）已經包含名為 `ic_launcher.png` 的預設圖示。請依照 [Android Developer Guide][Android Developer Guide] 所建議的螢幕密度，將這些圖示替換成你想要的資源，並遵循建議的圖示尺寸。

![Android icon location](/assets/images/docs/assets-and-images/android-icon-path.png)

:::note
如果你重新命名了 `.png` 檔案，也必須同步更新 `AndroidManifest.xml` 中
`<application>` 標籤的 `android:icon` 屬性名稱。
:::

#### iOS

在你的 Flutter 專案根目錄下，前往
`.../ios/Runner`。`Assets.xcassets/AppIcon.appiconset` 目錄已經包含預設圖示。請根據檔名及 Apple [人機介面指引（Human Interface Guidelines）][Human Interface Guidelines] 的建議尺寸，將其替換為適當尺寸的圖片。請保留原始檔名。

![iOS icon location](/assets/images/docs/assets-and-images/ios-icon-path.png)

### 更新啟動畫面（launch screen）

<p align="center">
  <img src="/assets/images/docs/assets-and-images/launch-screen.png" alt="Launch screen" />
</p>

Flutter 也會利用原生平台機制，在 Flutter 框架載入期間，為你的 Flutter 應用程式繪製過渡用的啟動畫面。這個啟動畫面會一直顯示，直到 Flutter 繪製出應用程式的第一個畫面為止。

:::note
這表示如果你沒有在應用程式的 `main()` 函式中呼叫 [`runApp()`][`runApp()`]（或更明確地說，沒有在收到 [`PlatformDispatcher.onDrawFrame`][`PlatformDispatcher.onDrawFrame`] 時呼叫 [`FlutterView.render()`][`FlutterView.render()`]），啟動畫面將會一直存在，不會消失。
:::

[`FlutterView.render()`]: {{site.api}}/flutter/dart-ui/FlutterView/render.html
[`PlatformDispatcher.onDrawFrame`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/onDrawFrame.html

#### Android

若要為 Flutter 應用程式新增啟動畫面（也稱為「splash screen」），請前往 `.../android/app/src/main`。
在 `res/drawable/launch_background.xml` 中，
你可以使用這個 [layer list drawable][layer list drawable] XML 來自訂啟動畫面的外觀。現有的範本在註解程式碼中提供了將圖片加入白色 splash 畫面中央的範例。你可以將其取消註解，或使用其他 [drawables][drawables] 來達到你想要的效果。

更多細節請參考
[Adding a splash screen to your Android app][Adding a splash screen to your Android app]。

#### iOS

若要在「splash screen」中央加入圖片，請前往 `.../ios/Runner`。
在 `Assets.xcassets/LaunchImage.imageset` 中，
放入名為 `LaunchImage.png`、`LaunchImage@2x.png`、`LaunchImage@3x.png` 的圖片。如果你使用不同的檔名，請記得更新同一目錄下的 `Contents.json` 檔案。

你也可以在 Xcode 中完全自訂啟動畫面 storyboard，方法是開啟 `.../ios/Runner.xcworkspace`，
在 Project Navigator 中前往 `Runner/Runner`，然後開啟 `Assets.xcassets` 來放入圖片，或在 `LaunchScreen.storyboard` 使用 Interface Builder 進行任何自訂。

![Adding launch icons in Xcode](/assets/images/docs/assets-and-images/ios-launchscreen-xcode.png){:width="100%"}

更多細節請參考
[Adding a splash screen to your iOS app][Adding a splash screen to your iOS app]。


[add-to-app]: /add-to-app/ios
[Adding a splash screen to your Android app]: /platform-integration/android/splash-screen
[Adding a splash screen to your iOS app]: /platform-integration/ios/splash-screen
[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`AssetImage`]: {{site.api}}/flutter/painting/AssetImage-class.html
[`DefaultAssetBundle`]: {{site.api}}/flutter/widgets/DefaultAssetBundle-class.html
[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`ImageStream`]: {{site.api}}/flutter/painting/ImageStream-class.html
[Android Developer Guide]: {{site.android-dev}}/training/multiscreen/screendensities
[`AssetManager`]: {{site.android-dev}}/reference/android/content/res/AssetManager
[device pixel ratio]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[Device pixel ratio]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html
[drawables]: {{site.android-dev}}/guide/topics/resources/drawable-resource
[`FlutterPluginRegistrar`]: {{site.api}}/ios-embedder/protocol_flutter_plugin_registrar-p.html
[`FlutterView`]: {{site.api}}/javadoc/io/flutter/view/FlutterView.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[Human Interface Guidelines]: {{site.apple-dev}}/design/human-interface-guidelines/app-icons
[platform channels]: /platform-integration/platform-channels
[layer list drawable]: {{site.android-dev}}/guide/topics/resources/drawable-resource#LayerList
[`mainBundle`]: {{site.apple-dev}}/documentation/foundation/nsbundle/1410786-mainbundle
[`openFd`]: {{site.android-dev}}/reference/android/content/res/AssetManager#openFd(java.lang.String)
[package]: /packages-and-plugins/using-packages
[`pathForResource:ofType:`]: {{site.apple-dev}}/documentation/foundation/nsbundle/1410989-pathforresource
[`PluginRegistry.Registrar`]: {{site.api}}/javadoc/io/flutter/plugin/common/PluginRegistry.Registrar.html
[`pubspec.yaml`]: {{site.dart-site}}/tools/pub/pubspec
[`rootBundle`]: {{site.api}}/flutter/services/rootBundle.html
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`video_player` plugin]: {{site.pub}}/packages/video_player
[MediaQueryData.size]: {{site.api}}/flutter/widgets/MediaQueryData/size.html
[MaterialApp]: {{site.api}}/flutter/material/MaterialApp-class.html
[CupertinoApp]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[Transforming assets at build time]: /ui/assets/asset-transformation
[flavors feature]: /deployment/flavors
