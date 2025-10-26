---
title: Android 與 Web 的延遲元件 (Deferred components)
description: 如何建立延遲元件以提升下載效能。
---

<?code-excerpt path-base="perf/deferred_components"?>

## 簡介

使用 Flutter 時，Android 與 Web 應用程式都具備在應用程式執行期間下載延遲元件（額外的程式碼與資源）的能力。這對於大型應用程式特別有用，因為你可以只在使用者需要時才安裝相關元件。

雖然 Flutter 支援 Android 與 Web 的延遲載入（deferred loading），但兩者的實作方式有所不同。兩者都需要 [Dart 的延遲匯入（deferred imports）][dart-def-import]。

*   Android 的 [動態功能模組（dynamic feature modules）][dynamic feature modules]
    會將延遲元件包裝成 Android 模組進行發佈。

    在為 Android 建置時，雖然你可以延遲載入模組，
    但必須將整個應用程式建置並以上傳為單一
    [Android App Bundle][android-app-bundle] (AAB)。
    Flutter 不支援只發佈部分更新，必須重新上傳整個應用程式的 Android App Bundle。

    Flutter 僅在你以 [release 或 profile 模式][release or profile mode] 編譯 Android 應用程式時執行延遲載入，
    在 debug 模式下，所有延遲元件都會被視為一般匯入。

*   Web 會將延遲元件建立為獨立的 `*.js` 檔案。

若想深入了解此功能的技術細節，請參閱 [Deferred Components][Deferred Components]
於 [Flutter wiki][Flutter wiki] 上的說明。

## 如何為 Android 專案設定延遲元件

以下說明如何為你的 Android 應用程式設定延遲載入。

### 步驟 1：相依套件與初始專案設定

<ol>
<li>

將 Play Core 加入 Android 應用程式的
build.gradle 相依套件中。
在 `android/app/build.gradle` 中加入以下內容：

```groovy
...
dependencies {
  ...
  implementation "com.google.android.play:core:1.8.0"
  ...
}
```
</li>

<li>

如果使用 Google Play Store 作為動態功能（dynamic features）的發佈模式，則應用程式必須支援 `SplitCompat`，並提供 `PlayStoreDeferredComponentManager` 的實例。這兩項任務都可以透過在 `android/app/src/main/AndroidManifest.xml` 中將應用程式的 `android:name` 屬性設為 `io.flutter.embedding.android.FlutterPlayStoreSplitApplication` 來完成：

```xml
<manifest ...
  <application
     android:name="io.flutter.embedding.android.FlutterPlayStoreSplitApplication"
        ...
  </application>
</manifest>
```

`io.flutter.app.FlutterPlayStoreSplitApplication` 會為你處理這兩項任務。如果你使用
`FlutterPlayStoreSplitApplication`，
可以直接跳到步驟 1.3。

如果你的 Android 應用程式
較大或較複雜，你可能會希望分別支援
`SplitCompat`，並手動提供
`PlayStoreDynamicFeatureManager`。

為了支援 `SplitCompat`，有三種方法
（詳見 [Android docs][Android docs]），任一方法皆可：

<ul>
<li>

讓你的 application class 繼承 `SplitCompatApplication`：

```java
public class MyApplication extends SplitCompatApplication {
    ...
}
```

</li>

<li>

在 `attachBaseContext()` 方法中呼叫 `SplitCompat.install(this);`：

```java
@Override
protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    // Emulates installation of future on demand modules using SplitCompat.
    SplitCompat.install(this);
}
```

</li>

<li>

將 `SplitCompatApplication` 宣告為應用程式的子類別，並將來自 `FlutterApplication` 的 Flutter 相容性程式碼新增到你的應用程式類別中：

```xml
<application
    ...
    android:name="com.google.android.play.core.splitcompat.SplitCompatApplication">
</application>
```

</li>
</ul>

Embedder 會依賴注入的
`DeferredComponentManager` 實例來處理
延遲元件（deferred components）的安裝請求。
請在您的 Flutter embedder 中提供 `PlayStoreDeferredComponentManager`，
只需將以下程式碼加入至應用程式初始化階段：

```java
import io.flutter.embedding.engine.dynamicfeatures.PlayStoreDeferredComponentManager;
import io.flutter.FlutterInjector;
... 
PlayStoreDeferredComponentManager deferredComponentManager = new
  PlayStoreDeferredComponentManager(this, null);
FlutterInjector.setInstance(new FlutterInjector.Builder()
    .setDeferredComponentManager(deferredComponentManager).build());
```

</li>
    
<li>

要啟用 deferred components，只需在應用程式的 `pubspec.yaml` 檔案中，於 `flutter` 項目下新增 `deferred-components` 項目即可：

```yaml
...
flutter:
  ...
  deferred-components:
  ...
```

`flutter` 工具會在 `pubspec.yaml` 中尋找 `deferred-components` 項目，以判斷應用程式是否應該以延遲（deferred）方式建構。除非你已經知道所需的元件（components）以及每個元件所對應的 Dart 延遲（deferred）函式庫，否則目前可以先將這個欄位留空。在 [步驟 3.3][step 3.3]，當 `gen_snapshot` 產生 loading units 後，你會再回來填寫這個區段。

</li>
</ol>

### 步驟 2：實作 Dart 延遲（deferred）函式庫

接下來，請在你的應用程式 Dart 程式碼中實作延遲載入（deferred loaded）的 Dart 函式庫。這個實作目前不需要完全具備所有功能。此頁後續的範例會新增一個簡單的延遲元件（deferred widget）作為佔位用。你也可以將現有的程式碼轉換為延遲載入，只需修改 import 並將延遲程式碼的使用包裹在 `loadLibrary()` `Futures` 之後。

<ol>
<li>

建立一個新的 Dart 函式庫。例如，建立一個新的 `DeferredBox` 元件（widget），可於執行時下載。這個元件可以有任何複雜度，但本指南建議先建立一個簡單的方塊作為範例。要建立一個簡單的藍色方塊元件，請建立 `box.dart`，內容如下：

<?code-excerpt "lib/box.dart"?>
```dart title="box.dart"
import 'package:flutter/material.dart';

/// A simple blue 30x30 box.
class DeferredBox extends StatelessWidget {
  const DeferredBox({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(height: 30, width: 30, color: Colors.blue);
  }
}
```

</li>

<li>

在你的應用程式中，使用 `deferred` 關鍵字匯入新的 Dart 函式庫，  
並呼叫 `loadLibrary()`（請參閱 [lazily loading a library][lazily loading a library]）。

以下範例使用 `FutureBuilder` 來等待 `loadLibrary` `Future`（在 `initState` 中建立）完成，  
並顯示 `CircularProgressIndicator` 作為暫時的佔位元件。

當 `Future` 完成時，會回傳 `DeferredBox` 元件。

之後就可以像平常一樣在應用程式中使用 `SomeWidget`，  
而且在成功載入之前，永遠不會嘗試存取延遲載入的 Dart 程式碼。

<?code-excerpt "lib/use_deferred_box.dart"?>
```dart
import 'package:flutter/material.dart';
import 'box.dart' deferred as box;

class SomeWidget extends StatefulWidget {
  const SomeWidget({super.key});

  @override
  State<SomeWidget> createState() => _SomeWidgetState();
}

class _SomeWidgetState extends State<SomeWidget> {
  late Future<void> _libraryFuture;

  @override
  void initState() {
    super.initState();
    _libraryFuture = box.loadLibrary();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _libraryFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          }
          return box.DeferredBox();
        }
        return const CircularProgressIndicator();
      },
    );
  }
}
```

`loadLibrary()` 函式會回傳一個 `Future<void>`，
當函式庫中的程式碼可供使用時，該物件會順利完成；否則會以錯誤結束。
所有來自延遲載入（deferred）函式庫的符號使用，都應該在 `loadLibrary()` 呼叫完成後再進行保護。
所有對該函式庫的匯入都必須標記為 `deferred`，
這樣才能正確編譯以供延遲元件（deferred component）使用。
如果某個元件已經被載入，額外呼叫 `loadLibrary()` 會很快完成（但不是同步完成）。
你也可以提前呼叫 `loadLibrary()` 函式，
以觸發預先載入，幫助隱藏載入時間。

你可以在
[Flutter Gallery 的 `lib/deferred_widget.dart`][Flutter Gallery's `lib/deferred_widget.dart`]
找到另一個延遲匯入載入的範例。

</li>
</ol>

### 步驟 3：建置應用程式

請使用以下的 `flutter` 指令來建置
延遲元件（deferred components）應用程式：

```console
$ flutter build appbundle
```

此指令可協助你驗證專案是否正確設定，以建置支援延遲元件（deferred components）的應用程式。預設情況下，若驗證器偵測到任何問題，建置將會失敗，並引導你進行建議的修改來修正這些問題。

:::note
你可以使用 `--no-deferred-components` 旗標選擇不建置延遲元件。啟用此旗標時，所有在延遲元件下定義的資源（assets）都會被視為是在 `pubspec.yaml` 的 assets 區段下定義。所有 Dart 程式碼將會被編譯成單一共用函式庫，且 `loadLibrary()` 的呼叫會在下一個事件迴圈邊界完成（即盡快且以非同步方式執行）。這個旗標的效果等同於在 `pubspec.yaml` 中省略 `deferred-components:` 項目。
:::

<ol>
<li><a id="step-3.1"></a>

`flutter build appbundle` 指令會執行驗證器，並嘗試建置應用程式，並指示 `gen_snapshot` 產生分割的 AOT 共用函式庫（shared libraries）作為獨立的 SO 檔案。首次執行時，驗證器很可能會因偵測到問題而失敗；工具會提供如何設定專案及修正這些問題的建議。

驗證器分為兩個階段：建置前（prebuild）與 gen_snapshot 執行後（post-gen_snapshot）驗證。這是因為任何涉及 loading units 的驗證，都必須等到 `gen_snapshot` 完成並產生最終的 loading units 集合後才能進行。

:::note
你可以透過加入 `--no-validate-deferred-components` 旗標，選擇讓工具在未經驗證器檢查的情況下嘗試建置應用程式。這可能會導致出現意外且令人困惑的解決失敗指示。此旗標主要用於不依賴驗證器所檢查的預設 Play 商店實作的自訂實作情境。
:::

驗證器會偵測由 `gen_snapshot` 產生的任何新增、變更或移除的 loading units。當前產生的 loading units 會記錄在你的 `<projectDirectory>/deferred_components_loading_units.yaml` 檔案中。建議將此檔案納入版本控制，以確保其他開發者對 loading units 的變更能被發現。

驗證器也會檢查 `android` 目錄下的下列項目：

<ul>
<li>

**`<projectDir>/android/app/src/main/res/values/strings.xml`**<br>
每個延遲元件都需有一個條目，將索引鍵 `${componentName}Name` 對應至 `${componentName}`。此字串資源會被每個功能模組（feature module）的 `AndroidManifest.xml` 用來定義 `dist:title property`。例如：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  ...
  <string name="boxComponentName">boxComponent</string>
</resources>
```

</li>

<li>

**`<projectDir>/android/<componentName>`**<br>
每個延遲元件（deferred component）都對應一個 Android 動態功能模組（dynamic feature module），且該模組內包含一個 `build.gradle` 和 `src/main/AndroidManifest.xml` 檔案。
這只會檢查這些檔案是否存在，並不會驗證其內容。
如果檔案不存在，系統會自動產生一個建議的預設檔案。

</li>

<li>

**`<projectDir>/android/app/src/main/res/values/AndroidManifest.xml`**<br>
包含一個 meta-data 條目，用於編碼載入單元（loading unit）與其所屬元件名稱之間的對應關係。
這個對應關係會被嵌入器（embedder）用來將 Dart 內部的 loading unit ID 轉換為要安裝的延遲元件名稱。
例如：

```xml
...
<application
    android:label="MyApp"
    android:name="io.flutter.app.FlutterPlayStoreSplitApplication"
    android:icon="@mipmap/ic_launcher">
    ...
    <meta-data android:name="io.flutter.embedding.engine.deferredcomponents.DeferredComponentManager.loadingUnitMapping" android:value="2:boxComponent"/>
</application>
...
```

</li>
</ul>

`gen_snapshot` 驗證器只有在 prebuild
驗證器通過後才會執行。
</li>

<li>

針對這些檢查中的每一項，
工具都會產生經過修改或新增的檔案，
以通過該檢查。
這些檔案會被放在
`<projectDir>/build/android_deferred_components_setup_files` 目錄中。
建議將這些變更套用到專案的
`android` 目錄中，方法是複製並覆蓋相同的檔案。在覆蓋之前，
應先將目前的專案狀態提交到
版本控制，並審查建議的變更是否合適。這個工具不會自動對你的 `android/` 目錄做任何修改。

</li>

<li><a id="step-3.3"></a>

當可用的
loading units 產生並記錄在
`<projectDirectory>/deferred_components_loading_units.yaml` 之後，
就可以完整設定 pubspec 的
`deferred-components` 區段，讓 loading units
依需求分配給 deferred components。
以 box 範例來說，產生的
`deferred_components_loading_units.yaml` 檔案內容會如下：

```yaml
loading-units:
  - id: 2
    libraries:
      - package:MyAppName/box.Dart
```

這裡的 loading unit id（此例為 '2'）是 Dart 內部使用的，可忽略不計。基礎 loading unit（id 為 '1'）不會被列出，且包含所有未明確歸屬於其他 loading unit 的內容。

你現在可以將以下內容新增到 `pubspec.yaml`：

```yaml
...
flutter:
  ...
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
  ...
```

要將 loading unit（載入單元）分配給 deferred component（延遲元件），請將該 loading unit 中的任一 Dart 函式庫加入 feature module（功能模組）的 libraries 區段。請注意以下指引：

<ul>
<li>

同一個 loading unit 不應被包含在多個元件中。

</li>
<li>

只要在 loading unit 中包含一個 Dart 函式庫，即表示整個 loading unit 都會被分配給該 deferred component。

</li>
<li>

所有未分配給 deferred component 的 loading unit，會自動包含在 base component（基礎元件）中，而 base component 一定會隱式存在。

</li>
<li>

分配給同一個 deferred component 的所有 loading unit，會一起下載、安裝並發佈。

</li>
<li>

base component（基礎元件）是隱式存在的，無需在 pubspec 中定義。

</li>
</ul>
</li>

<li>

也可以透過在 deferred component 設定中新增 assets（資源）區段，來包含資源：

```yaml
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
      assets:
        - assets/image.jpg
        - assets/picture.png
          # wildcard directory
        - assets/gallery/
```

一個資源（asset）可以被包含在多個延遲元件（deferred components）中，
但若安裝了這些元件，則該資源會被重複打包。
你也可以只定義資源型元件（assets-only components），
只要省略 `libraries` 區段即可。
這些僅包含資源的元件必須透過服務中的 [`DeferredComponent`][`DeferredComponent`] 工具類別來安裝，
而不是使用 `loadLibrary()`。
由於 Dart 程式庫會與資源一起打包，
如果使用 `loadLibrary()` 載入 Dart 程式庫時，
該元件中的所有資源也會一併載入。
然而，若是透過元件名稱及服務工具安裝時，
則不會載入該元件中的任何 Dart 程式庫。

你可以自由地將資源包含在任何元件中，
只要在第一次被參照時能正確安裝與載入即可。
不過，通常建議將資源與使用這些資源的 Dart 程式碼
一起打包在同一個元件中。

</li>

<li>

請手動將你在 `pubspec.yaml` 中定義的所有延遲元件（deferred components），
加入到 `android/settings.gradle` 檔案的 includes 區段中。
例如，若在 pubspec.yaml（設定檔）中定義了三個延遲元件，
分別為 `boxComponent`、`circleComponent` 和 `assetComponent`，
請確保 `android/settings.gradle` 包含以下內容：

```groovy
include ':app', ':boxComponent', ':circleComponent', ':assetComponent'
...
```

</li>

<li>

重複步驟 [3.1][3.1] 到 3.6（本步驟），
直到所有驗證器建議都已處理完畢，且工具
執行時不再有其他建議為止。

當成功時，此指令會在 `build/app/outputs/bundle/release`
輸出一個 `app-release.aab` 檔案。

建置成功並不代表應用程式
一定是依照預期方式建置完成。你需要自行確認所有載入單元（loading units）與 Dart 函式庫
都已依照你的預期方式被包含。
舉例來說，一個常見的錯誤是
不小心在匯入 Dart 函式庫時忘記加上 `deferred` 關鍵字，
導致延遲載入（deferred）的函式庫被編譯進
基礎載入單元（base loading unit）。在這種情況下，該 Dart 函式庫會正常載入，因為它總是存在於基礎單元中，
而該函式庫就不會被分離出來。你可以透過檢查 `deferred_components_loading_units.yaml`
檔案，來確認產生的載入單元是否如你所預期地被描述。

當你調整延遲元件（deferred components）設定，
或對 Dart 進行新增、修改或移除載入單元的變更時，
應預期驗證器會失敗。
請依照步驟 [3.1][3.1] 到 3.6（本步驟）來套用任何
建議的變更，以繼續進行建置。
</li>
</ol>

### 在本地執行應用程式

當你的應用程式成功建置出 AAB 檔案後，
請使用 Android 的 [`bundletool`][`bundletool`]
並加上 `--local-testing` 旗標進行本地測試。

若要在測試裝置上執行 AAB 檔案，
請從 [github.com/google/bundletool/releases][github.com/google/bundletool/releases] 下載 bundletool jar 執行檔，然後執行：

```console
$ java -jar bundletool.jar build-apks --bundle=<your_app_project_dir>/build/app/outputs/bundle/release/app-release.aab --output=<your_temp_dir>/app.apks --local-testing

$ java -jar bundletool.jar install-apks --apks=<your_temp_dir>/app.apks
```

其中 `<your_app_project_dir>` 是你的應用程式專案目錄的路徑，`<your_temp_dir>` 則是用來儲存 bundletool 輸出結果的任意暫存目錄。這個步驟會將你的 AAB 檔案解壓縮為 APK 檔案，並安裝到裝置上。所有可用的 Android 動態功能（dynamic features）都會被本地載入到裝置，並且會模擬延遲元件（deferred components）的安裝過程。

在再次執行 `build-apks` 之前，
請先移除現有的應用程式 APK 檔案：

```console
$ rm <your_temp_dir>/app.apks
```

對 Dart 程式碼庫的變更，需要遞增 Android 的 build ID，或是先解除安裝再重新安裝應用程式，因為 Android 除非偵測到新版本號，否則不會更新功能模組。

### 發佈到 Google Play 商店

建置完成的 AAB 檔案可以像往常一樣直接上傳到 Play 商店。當呼叫 `loadLibrary()` 時，Flutter 引擎會透過 Play 商店的遞送功能，下載包含 Dart AOT 函式庫及資源的所需 Android 模組。


[3.1]: #step-3.1
[Android docs]: {{site.android-dev}}/guide/playcore/feature-delivery#declare_splitcompatapplication_in_the_manifest
[`bundletool`]: {{site.android-dev}}/studio/command-line/bundletool
[Deferred Components]: {{site.repo.flutter}}/wiki/Deferred-Components
[`DeferredComponent`]: {{site.api}}/flutter/services/DeferredComponent-class.html
[dynamic feature modules]: {{site.android-dev}}/guide/playcore/feature-delivery
[Flutter Gallery's `lib/deferred_widget.dart`]: {{site.repo.gallery-archive}}/blob/main/lib/deferred_widget.dart
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
[github.com/google/bundletool/releases]: {{site.github}}/google/bundletool/releases
[lazily loading a library]: {{site.dart-site}}/language/libraries#lazily-loading-a-library
[release or profile mode]: /testing/build-modes
[step 3.3]: #step-3.3
[android-app-bundle]: {{site.android-dev}}/guide/app-bundle
[dart-def-import]: https://dart.dev/language/libraries#lazily-loading-a-library
