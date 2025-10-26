---
title: 新增資源與圖片
description: 如何在你的 Flutter 應用程式中使用圖片（以及其他資源）。
shortTitle: 資源與圖片
---

<?code-excerpt path-base="ui/assets_and_images/lib"?>

Flutter 應用程式可以包含程式碼與_資源_（有時也稱為 resources）。資源是一種與你的應用程式一起打包並部署的檔案，並可於執行時存取。常見的資源類型包括靜態資料（例如 JSON 檔案）、設定檔、圖示，以及圖片（JPEG、WebP、GIF、動畫 WebP/GIF、PNG、BMP 和 WBMP）。

## 指定資源

Flutter 會使用位於專案根目錄的 [`pubspec.yaml`][`pubspec.yaml`] 檔案來識別應用程式所需的資源。

以下是一個範例：

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

若要包含某個目錄下的所有資源（Assets），
請在目錄名稱後面加上`/`字元：

```yaml
flutter:
  assets:
    - directory/
    - directory/subdirectory/
```

:::note
只有直接位於該目錄下的檔案才會被包含。
[Resolution-aware asset image variants](#resolution-aware) 是唯一的例外。
若要加入位於子目錄中的檔案，請為每個目錄建立一個條目。
:::

:::note
YAML 的縮排很重要。如果你看到像這樣的錯誤
`Error: unable to find directory entry in pubspec.yaml`
那麼你 _可能_ 在 pubspec 檔案中的縮排有誤。請參考以下這個[錯誤]的範例：
```yaml
flutter:
assets:
  - directory/
```
`assets:` 這一行應該要比 `flutter:` 這一行往內縮排剛好兩個空格：
```yaml
flutter:
  assets:
    - directory/
```
:::

### 資源（Asset）打包

`assets` 子區塊位於 `flutter` 區段中，
用來指定應隨應用程式一同包含的檔案。
每個資源都需以明確的路徑標示
（相對於 `pubspec.yaml` 檔案），指出資源檔案的位置。
資源宣告的順序沒有影響。實際使用的目錄名稱
（如第一個範例中的 `assets` 或上述範例中的 `directory`）
也沒有影響。

在建置過程中，Flutter 會將資源放入一個特殊的
封存檔，稱為 _asset bundle_（資源包），
應用程式會在執行時從中讀取資源。

### 建置時自動轉換資源檔案

Flutter 支援使用 Dart 套件在建置應用程式時轉換資源檔案。
要這麼做，請在 pubspec 檔案中指定資源檔案與轉換器套件。
如需瞭解詳細操作方式及如何撰寫自訂的資源轉換套件，請參閱
[Transforming assets at build time][Transforming assets at build time]。

## 載入資源

您的應用程式可以透過
[`AssetBundle`][`AssetBundle`] 物件存取其資源。

資源包的兩個主要方法，允許您根據邏輯鍵（logical key）從資源包中載入
字串／文字資源（`loadString()`）或圖片／二進位資源（`load()`）。
邏輯鍵會對應到建置時於 `pubspec.yaml` 檔案中指定的資源路徑。

### 載入文字資源

每個 Flutter 應用程式都有一個 [`rootBundle`][`rootBundle`]
物件，方便存取主要的資源包。
您也可以直接使用
`rootBundle` 全域靜態成員來載入資源，
該成員來自 `package:flutter/services.dart`。

然而，建議您透過 [`DefaultAssetBundle`][`DefaultAssetBundle`]
為目前的 `BuildContext` 取得 `AssetBundle`，
而非僅使用隨應用程式建置的預設資源包；
這樣可以讓父元件（Widget）在執行時替換不同的
`AssetBundle`，對於在地化或測試情境特別有用。

通常，您會使用 `DefaultAssetBundle.of()`
間接從應用程式執行時的 `rootBundle` 載入資源，
例如載入一個 JSON 檔案。

{% comment %}
  這裡需要一個範例，說明如何使用 DefaultAssetBundle.of 取得當前 BuildContext 的 AssetBundle
{% endcomment %}

在沒有 `Widget` 上下文，或無法取得
`AssetBundle` 的情況下，
您可以直接使用 `rootBundle` 來載入這類資源。
例如：

<?code-excerpt "main.dart (root-bundle-load)"?>
```dart
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### 載入圖片

要載入圖片，請在元件 (Widget) 的 `build()` 方法中使用 [`AssetImage`][`AssetImage`] 類別。

例如，您的應用程式可以從前述範例中的資源宣告載入背景圖片：

<?code-excerpt "main.dart (background-image)"?>
```dart
return const Image(image: AssetImage('assets/background.png'));
```

### 支援解析度的圖片資源 {:#resolution-aware}

Flutter 可以根據目前的 [device pixel ratio][device pixel ratio] 載入適合解析度的圖片。

[`AssetImage`][`AssetImage`] 會將邏輯上請求的資源，對應到最符合目前 [device pixel ratio][device pixel ratio] 的資源。

為了讓這種對應方式運作，資源應該依照特定的目錄結構進行安排：

```plaintext
.../image.png
.../Mx/image.png
.../Nx/image.png
...etc.
```

其中 _M_ 和 _N_ 是數字識別碼，對應於所包含圖片的標準解析度。換句話說，它們指定了圖片所對應的裝置像素比例（device pixel ratio）。

在這個範例中，`image.png` 被視為*主要資源*（main asset），而 `Mx/image.png` 和 `Nx/image.png` 則被視為*變體*（variants）。

主要資源預設對應解析度為 1.0。例如，以下是名為 `my_icon.png` 的圖片資源配置方式：

```plaintext
.../my_icon.png       (mdpi baseline)
.../1.5x/my_icon.png  (hdpi)
.../2.0x/my_icon.png  (xhdpi)
.../3.0x/my_icon.png  (xxhdpi)
.../4.0x/my_icon.png  (xxxhdpi)
```

在裝置像素比（device pixel ratio）為 1.8 的設備上，會選擇資源 `.../2.0x/my_icon.png`。
若裝置像素比為 2.7，則會選擇資源 `.../3.0x/my_icon.png`。

如果在 `Image` 元件（Widget）上未指定圖片的寬度與高度，則會使用名目解析度（nominal resolution）來縮放資源，使其在螢幕上佔據的空間與主資源相同，只是解析度更高。也就是說，如果 `.../my_icon.png` 是 72px × 72px，那麼 `.../3.0x/my_icon.png` 應該是 216px × 216px；但若未指定寬度與高度，它們都會以 72px × 72px（邏輯像素）呈現。

:::note
[裝置像素比][Device pixel ratio] 取決於 [MediaQueryData.size][MediaQueryData.size]，這需要在你的 [`AssetImage`][`AssetImage`] 的上層有 [MaterialApp][MaterialApp] 或 [CupertinoApp][CupertinoApp]。
:::

#### 解析度感知圖片資源的打包方式 {:#resolution-aware-bundling}

你只需要在 `assets` 區段的 `pubspec.yaml` 中指定主資源或其父目錄即可。
Flutter 會自動為你打包各種變體。
每個條目都應對應到一個實際檔案，主資源條目除外。如果主資源條目沒有對應到實際檔案，則解析度最低的資源會作為低於該解析度的裝置像素比設備的備用資源。不過，該條目仍應包含在 `pubspec.yaml` 清單中。

任何使用預設資源包（asset bundle）載入圖片時都會繼承解析度感知功能。（如果你使用更底層的類別，例如 [`ImageStream`][`ImageStream`] 或 [`ImageCache`][`ImageCache`]，你也會注意到與縮放相關的參數。）

### 套件依賴中的資源圖片 {:#from-packages}

若要從 [套件][package] 依賴載入圖片，必須在 [`AssetImage`][`AssetImage`] 中提供 `package` 參數。

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

套件本身所使用的資源，也應該如上所述，透過 `package` 參數來取得。

#### 套件資源的打包

如果所需的資源已在套件的 `pubspec.yaml` 檔案中指定，這些資源會自動與應用程式一起打包。特別是，套件本身使用的資源，必須在其 `pubspec.yaml` 中明確指定。

套件也可以選擇在其 `lib/` 資料夾中放置未在 `pubspec.yaml` 檔案中指定的資源。在這種情況下，若要將這些圖片一併打包，應用程式必須在其 `pubspec.yaml` 中指定要包含哪些資源。例如，一個名為 `fancy_backgrounds` 的套件可能包含以下檔案：

```plaintext
.../lib/backgrounds/background1.png
.../lib/backgrounds/background2.png
.../lib/backgrounds/background3.png
```

要包含（例如）第一張圖片，應在應用程式的`pubspec.yaml`中於`assets`區段指定該圖片：

```yaml
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

`lib/` 是隱含的，
因此在資源路徑中不需要包含它。

如果你正在開發一個套件，要在該套件內載入資源，請在該套件的 `pubspec.yaml` 中指定它：

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

Flutter 資源（Assets）可透過 `AssetManager`（於 Android）與 `NSBundle`（於 iOS）輕鬆地供平台程式碼存取。

### 在 Android 載入 Flutter 資源

在 Android 上，資源可透過 [`AssetManager`][`AssetManager`] API 取得。舉例來說，在 [`openFd`][`openFd`] 中所使用的查找鍵，可以從 [`PluginRegistry.Registrar`][`PluginRegistry.Registrar`] 上的 `lookupKeyForAsset` 或 [`FlutterView`][`FlutterView`] 上的 `getLookupKeyForAsset` 取得。
當開發插件時可使用 `PluginRegistry.Registrar`，而在開發包含平台檢視（platform view）的應用程式時則建議使用 `FlutterView`。

舉例來說，假設你在 pubspec.yaml（設定檔）中指定了以下內容：

```yaml
flutter:
  assets:
    - icons/heart.png
```

這反映了你的 Flutter 應用程式中的以下結構。

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
例如在 [`pathForResource:ofType:`][`pathForResource:ofType:`] 中所使用的查找鍵（lookup key），
是從 [`FlutterPluginRegistrar`][`FlutterPluginRegistrar`] 上的 `lookupKeyForAsset` 或 `lookupKeyForAsset:fromPackage:`，
或從 [`FlutterViewController`][`FlutterViewController`] 上的 `lookupKeyForAsset:` 或 `lookupKeyForAsset:fromPackage:` 取得。
當開發插件（plugin）時可使用 `FlutterPluginRegistrar`，
而當開發包含平台視圖（platform view）的應用程式時則建議使用 `FlutterViewController`。

舉例來說，假設你有如上所述的 Flutter 設定。

若要從 Objective-C 插件程式碼存取 `icons/heart.png`，
你可以這樣做：

```objc
NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
```

若要從您的 Swift 應用程式存取 `icons/heart.png`，請依照以下步驟操作：

```swift
let key = controller.lookupKey(forAsset: "icons/heart.png")
let mainBundle = Bundle.main
let path = mainBundle.path(forResource: key, ofType: nil)
```

如需更完整的範例，請參考 pub.dev 上
Flutter [`video_player` 外掛][`video_player` plugin] 的實作。

### 在 Flutter 載入 iOS 圖片

當你透過
[將 Flutter 加入現有 iOS 應用程式][add-to-app]
來實作 Flutter 時，你可能會有一些已經在 iOS 上託管的圖片，希望能在 Flutter 中使用。要達成這個目的，可以使用 [平台通道（platform channels）][platform channels]，將圖片資料以 `FlutterStandardTypedData` 的形式傳遞給 Dart。

## 平台資源（Platform assets）

有時你需要直接在平台專案中處理資源。以下是兩個常見情境，這些情境中會在 Flutter 框架載入並執行前先使用資源。

### 更新應用程式圖示

更新 Flutter 應用程式的啟動畫面圖示，方式與在原生 Android 或 iOS 應用程式中更新啟動畫面圖示相同。

![啟動畫面圖示](/assets/images/docs/assets-and-images/icon.png)

#### Android

在你的 Flutter 專案根目錄下，前往
`.../android/app/src/main/res`。各種點陣圖資源資料夾（如 `mipmap-hdpi`）已經包含名為 `ic_launcher.png` 的預設圖示。請依照 [Android Developer Guide][Android Developer Guide] 所建議的每種螢幕密度圖示尺寸，將它們替換為你想要的資源。

![Android 圖示位置](/assets/images/docs/assets-and-images/android-icon-path.png)

:::note
如果你重新命名了 `.png` 檔案，也必須同步更新
`AndroidManifest.xml` 中
`<application>` 標籤的 `android:icon` 屬性名稱。
:::

#### iOS

在你的 Flutter 專案根目錄下，
前往 `.../ios/Runner`。
`Assets.xcassets/AppIcon.appiconset` 資料夾已經包含預設圖示。請依據 Apple [人機介面指引（Human Interface Guidelines）][Human Interface Guidelines]，依檔名規範替換為適當尺寸的圖片。
請保留原始檔案名稱。

![iOS 圖示位置](/assets/images/docs/assets-and-images/ios-icon-path.png)

### 更新啟動畫面

<p align="center">
  <img src="/assets/images/docs/assets-and-images/launch-screen.png" alt="Launch screen" />
</p>

Flutter 也會利用原生平台機制，在 Flutter 框架載入期間，為你的 Flutter 應用程式繪製過渡啟動畫面。這個啟動畫面會一直顯示，直到 Flutter 繪製出應用程式的第一個畫面為止。

:::note
這意味著，如果你沒有在應用程式的 `main()` 函式中呼叫 [`runApp()`][`runApp()`]（更精確地說，是沒有在收到 [`PlatformDispatcher.onDrawFrame`][`PlatformDispatcher.onDrawFrame`] 時呼叫 [`FlutterView.render()`][`FlutterView.render()`]），啟動畫面將會一直存在。
:::

[`FlutterView.render()`]: {{site.api}}/flutter/dart-ui/FlutterView/render.html
[`PlatformDispatcher.onDrawFrame`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/onDrawFrame.html

#### Android

若要為 Flutter 應用程式新增啟動畫面（也稱為「splash screen」），請前往 `.../android/app/src/main`。
在 `res/drawable/launch_background.xml` 中，
你可以使用這個 [layer list drawable][layer list drawable] XML 來自訂啟動畫面的外觀。現有範本已在註解程式碼中提供將圖片置中於白色 splash 畫面的範例。你可以取消註解，或使用其他 [drawables][drawables] 來達到你想要的效果。

更多細節請參考
[為 Android 應用程式新增 splash screen][Adding a splash screen to your Android app]。

#### iOS

若要在「splash screen」中央新增圖片，請前往 `.../ios/Runner`。
在 `Assets.xcassets/LaunchImage.imageset` 中，
放入名為 `LaunchImage.png`、`LaunchImage@2x.png`、`LaunchImage@3x.png` 的圖片。
如果你使用了不同的檔名，請同步更新同一資料夾下的 `Contents.json` 檔案。

你也可以在 Xcode 中完全自訂啟動畫面 storyboard，只需開啟 `.../ios/Runner.xcworkspace`。
在 Project Navigator 前往 `Runner/Runner`，然後開啟 `Assets.xcassets` 放入圖片，或在 `LaunchScreen.storyboard` 中使用 Interface Builder 進行任何自訂。

![在 Xcode 新增啟動畫面圖示](/assets/images/docs/assets-and-images/ios-launchscreen-xcode.png){:width="100%"}

更多細節請參考
[為 iOS 應用程式新增 splash screen][Adding a splash screen to your iOS app]。


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
