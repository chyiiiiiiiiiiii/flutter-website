---
title: Android 與 Web 的延遲元件 (Deferred components)
description: 如何建立延遲元件以提升下載效能。
---

<?code-excerpt path-base="perf/deferred_components"?>

## 簡介

使用 Flutter 時，Android 與 Web 應用程式都能在應用程式運行期間下載延遲元件（額外的程式碼與資源）。這對於大型應用程式特別有幫助，因為你可以只在使用者需要時才安裝相關元件。

雖然 Flutter 支援 Android 與 Web 的延遲載入（deferred loading），但兩者的實作方式有所不同。兩者皆需要使用 [Dart 的延遲匯入][dart-def-import]。

*   Android 的 [動態功能模組 (dynamic feature modules)][dynamic feature modules] 會將延遲元件打包成 Android 模組進行發佈。

    在為 Android 建置時，雖然你可以延遲載入模組，但必須將整個應用程式建置並以上傳為單一
    [Android App Bundle][android-app-bundle] (AAB)。
    Flutter 不支援僅針對部分更新進行派送，必須為整個應用程式重新上傳新的 Android App Bundle。

    Flutter 僅在你以 [release 或 profile 模式][release or profile mode] 編譯 Android 應用程式時執行延遲載入；
    在 debug 模式下，所有延遲元件都會被視為一般匯入。

*   Web 會將延遲元件建立為獨立的 `*.js` 檔案。

若想深入了解此功能的技術細節，請參閱 [Deferred Components][Deferred Components]
於 [Flutter wiki][Flutter wiki] 上的說明。

## 如何為 Android 專案設定延遲元件

以下說明如何為你的 Android 應用程式設定延遲載入。

### 步驟 1：依賴項與初始專案設定

<ol>
<li>

將 Play Core 加入 Android 應用程式的
build.gradle 依賴項中。
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

如果使用 Google Play Store 作為動態功能（dynamic features）的發佈模式，應用程式必須支援 `SplitCompat`，並提供 `PlayStoreDeferredComponentManager` 的實例。這兩項任務都可以透過在 `android/app/src/main/AndroidManifest.xml` 中將應用程式的 `android:name` 屬性設為 `io.flutter.embedding.android.FlutterPlayStoreSplitApplication` 來完成：

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

要支援 `SplitCompat`，有三種方法
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

將 `SplitCompatApplication` 宣告為應用程式的子類別，並將來自 `FlutterApplication` 的 Flutter 相容性程式碼加入到你的應用程式類別中：

```xml
<application
    ...
    android:name="com.google.android.play.core.splitcompat.SplitCompatApplication">
</application>
```

</li>
</ul>

Embedder 會依賴注入的 `DeferredComponentManager` 實例來處理延遲元件（deferred components）的安裝請求。
請在應用程式初始化時，將 `PlayStoreDeferredComponentManager` 提供給 Flutter embedder，方法是在初始化程式碼中加入以下程式碼：

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

要啟用 deferred components（延遲元件），請在應用程式的 `pubspec.yaml` 檔案中，於 `flutter` 項目下新增 `deferred-components` 項目：

```yaml
...
flutter:
  ...
  deferred-components:
  ...
```

`flutter` 工具會在 `pubspec.yaml` 中尋找 `deferred-components` 項目，以判斷應用程式是否應該以 deferred 方式建置。除非你已經知道所需的元件（components）以及每個元件所對應的 Dart deferred 函式庫，目前可以先將這個欄位留空。當 `gen_snapshot` 產生 loading units 後，你會在 [步驟 3.3][step 3.3] 補上這個區段。

</li>
</ol>

### 步驟 2：實作 Dart deferred 函式庫

接下來，請在應用程式的 Dart 程式碼中實作 deferred 載入的 Dart 函式庫。這個實作目前不需要完全具備所有功能。本頁後續的範例會新增一個簡單的 deferred 元件（Widget）作為佔位用。你也可以將現有的程式碼轉換為 deferred，只需修改 import 並在使用 deferred 程式碼時加上 `loadLibrary()` `Futures` 來保護。

<ol>
<li>

建立一個新的 Dart 函式庫。例如，建立一個新的 `DeferredBox` 元件（Widget），讓它可以在執行階段下載。這個元件可以有任意複雜度，但為了本指南的說明，請建立一個簡單的方塊作為範例。若要建立一個簡單的藍色方塊元件，請建立 `box.dart`，內容如下：

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
並顯示 `CircularProgressIndicator` 作為佔位元件。

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
當函式庫中的程式碼可供使用時，該物件會成功完成；否則將以錯誤結束。
所有來自延遲載入（deferred）函式庫的符號使用，都應該在 `loadLibrary()` 呼叫完成後才進行保護。
所有對該函式庫的匯入都必須標記為 `deferred`，
這樣才能正確編譯以用於延遲元件（deferred component）。
如果某個元件已經被載入，額外呼叫 `loadLibrary()` 會很快完成（但不是同步完成）。
也可以提前呼叫 `loadLibrary()` 函式來觸發預先載入，以協助隱藏載入時間。

你可以在 [Flutter Gallery 的 `lib/deferred_widget.dart`][Flutter Gallery's `lib/deferred_widget.dart`] 中找到另一個延遲匯入載入的範例。

</li>
</ol>

### 步驟 3：建置應用程式

使用下列 `flutter` 指令來建置延遲元件（deferred components）應用程式：

```console
$ flutter build appbundle
```

此指令可協助你驗證專案是否已正確設定，以建置支援延遲元件（deferred components）的應用程式。預設情況下，若驗證器偵測到任何問題，建置將會失敗，並引導你進行建議的修正。

:::note
你可以使用 `--no-deferred-components` 旗標來選擇不建置延遲元件。啟用此旗標後，所有在延遲元件下定義的資源（assets）都會被視為定義在 `pubspec.yaml` 的 assets 區段下。所有 Dart 程式碼將會編譯成單一共享函式庫，且 `loadLibrary()` 呼叫會在下一個事件迴圈邊界完成（即在保持非同步的情況下盡快完成）。此旗標的效果等同於在 `pubspec.yaml` 中省略 `deferred-components:` 項目。
:::

<ol>
<li><a id="step-3.1"></a>

`flutter build appbundle` 指令會執行驗證器，並嘗試建置應用程式，同時指示 `gen_snapshot` 產生分割的 AOT 共享函式庫（shared libraries），以獨立 SO 檔案形式存在。首次執行時，驗證器很可能會因偵測到問題而失敗；工具會針對如何設定專案及修正這些問題提出建議。

驗證器分為兩個階段：建置前（prebuild）與 gen_snapshot 產生後（post-gen_snapshot）驗證。這是因為任何涉及 loading units 的驗證，都必須等到 `gen_snapshot` 完成並產生最終的 loading units 集合後才能進行。

:::note
你可以透過傳遞 `--no-validate-deferred-components` 旗標，選擇讓工具在未經驗證器檢查的情況下嘗試建置應用程式。這可能會導致解決失敗時出現意外且令人困惑的指示。此旗標主要用於那些不依賴驗證器所檢查的預設 Play 商店（Play-store）實作的自訂實作情境。
:::

驗證器會偵測由 `gen_snapshot` 產生的任何新增、變更或移除的 loading units。當前產生的 loading units 會記錄在你的 `<projectDirectory>/deferred_components_loading_units.yaml` 檔案中。建議將此檔案納入版本控制，以確保其他開發人員對 loading units 的變更能被發現。

驗證器也會檢查 `android` 目錄下的以下項目：

<ul>
<li>

**`<projectDir>/android/app/src/main/res/values/strings.xml`**<br>
每個延遲元件都需有一個條目，將鍵值 `${componentName}Name` 對應到 `${componentName}`。此字串資源會被每個功能模組（feature module）的 `AndroidManifest.xml` 用來定義 `dist:title property`。例如：

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
每個延遲元件（deferred component）都會有一個對應的 Android 動態功能模組（dynamic feature module），並且包含一個`build.gradle`
以及`src/main/AndroidManifest.xml`檔案。
這個檢查僅確認這些檔案是否存在，並不驗證其內容。
如果檔案不存在，則會產生一個預設建議的檔案。

</li>

<li>

**`<projectDir>/android/app/src/main/res/values/AndroidManifest.xml`**<br>
包含一個 meta-data 項目，用來編碼 loading unit 與該 loading unit 所屬元件名稱之間的對應關係。這個對應關係會被嵌入器（embedder）用來將 Dart 內部的 loading unit id 轉換為要安裝的延遲元件（deferred component）名稱。例如：

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

對於這些檢查中的每一項，
工具都會產生已修改或新增的檔案，
以便通過該項檢查。
這些檔案會被放在
`<projectDir>/build/android_deferred_components_setup_files` 目錄中。
建議您將這些變更套用到
專案的 `android` 目錄，方法是複製並覆蓋相同的檔案。在覆蓋之前，
應先將目前的專案狀態提交到
版本控制，並審查建議的變更是否合適。該工具不會自動對您的 `android/` 目錄進行任何修改。

</li>

<li><a id="step-3.3"></a>

一旦可用的
loading units（載入單元）已經在
`<projectDirectory>/deferred_components_loading_units.yaml` 中產生並記錄，
就可以完整設定 pubspec 的
`deferred-components` 區段，將 loading units
依需求分配給 deferred components（延遲元件）。
以 box 範例來說，產生的
`deferred_components_loading_units.yaml` 檔案會包含：

```yaml
loading-units:
  - id: 2
    libraries:
      - package:MyAppName/box.Dart
```

此處的 loading unit id（在本例中為 '2'）是 Dart 內部使用的，可忽略不計。基礎 loading unit（id 為 '1'）不會被列出，並且包含所有未明確歸屬於其他 loading unit 的內容。

你現在可以將以下內容加入 `pubspec.yaml`：

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

要將 loading unit 指派給延遲元件（deferred component），請將 loading unit 中的任一 Dart 函式庫（library）加入 feature module 的 libraries 區段中。請注意以下指引：

<ul>
<li>

同一個 loading unit 不應被包含在多個元件中。

</li>
<li>

只要包含 loading unit 中的一個 Dart 函式庫，即表示整個 loading unit 都會被指派給該延遲元件。

</li>
<li>

所有未被指派給延遲元件的 loading unit，會被包含在基礎元件（base component）中，基礎元件始終隱含存在。

</li>
<li>

指派給同一個延遲元件的 loading unit，會一起下載、安裝與發佈。

</li>
<li>

基礎元件（base component）是隱含存在的，無需在 pubspec 中明確定義。

</li>
</ul>
</li>

<li>

你也可以透過在延遲元件（deferred component）設定中新增 assets 區段來包含資源（Assets）：

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

一個資產（asset）可以被包含在多個延遲元件（deferred components）中，但如果同時安裝這些元件，則會導致資產被重複安裝。

你也可以透過省略 libraries 區段來定義僅包含資產的元件（assets-only components）。這些僅包含資產的元件，必須在服務中使用 [`libraries`][`DeferredComponent`] 工具類別來安裝，而不是使用 `DeferredComponent`。

由於 Dart 函式庫會與資產一起被打包，如果使用 `loadLibrary()` 載入 Dart 函式庫，該元件中的所有資產也會一併載入。然而，若是透過元件名稱安裝以及使用服務工具，則不會載入該元件中的任何 Dart 函式庫。

你可以自由地將資產包含在任何元件中，只要在首次被參照時已經安裝並載入即可。不過，通常建議將資產與使用這些資產的 Dart 程式碼一起打包在同一個元件中。

</li>

<li>

請將你在 `loadLibrary()` 中定義的所有延遲元件，手動加入到 `pubspec.yaml` 檔案中作為 includes。

例如，假設在 pubspec 中定義了三個延遲元件，分別為 `android/settings.gradle`、`boxComponent` 和 `circleComponent`，請確保 `assetComponent` 包含以下內容：

```groovy
include ':app', ':boxComponent', ':circleComponent', ':assetComponent'
...
```

</li>

<li>

重複步驟 [3.1][3.1] 到 3.6（本步驟），
直到所有驗證器建議都已處理完畢，且工具
執行時不再出現新的建議為止。

當執行成功時，此指令會在 `build/app/outputs/bundle/release`
輸出一個 `app-release.aab` 檔案。

建置成功並不一定代表應用程式
完全依照預期方式建置。你需要自行確認所有 loading unit（載入單元）與 Dart 函式庫
都已按照你的預期方式納入。例如，一個常見錯誤是
不小心在匯入 Dart 函式庫時漏掉 `deferred` 關鍵字，
導致延遲載入（deferred）的函式庫被編譯進
基礎 loading unit。這種情況下，該 Dart 函式庫仍然可以正常載入，因為它總是存在於基礎單元中，
而不會被拆分出去。你可以檢查 `deferred_components_loading_units.yaml`
檔案，確認產生的 loading unit 是否如你所設計地被描述。

當你調整 deferred components（延遲元件）設定，
或進行 Dart 程式碼更動（新增、修改或移除 loading unit），
預期驗證器會出現錯誤。
請依照步驟 [3.1][3.1] 到 3.6（本步驟）進行，
依照建議修正以繼續建置流程。
</li>
</ol>

### 在本機執行應用程式

當你的應用程式成功建置出 AAB 檔案後，
可以使用 Android 的 [`bundletool`][`bundletool`]
並搭配 `--local-testing` 旗標進行本機測試。

若要在測試裝置上執行 AAB 檔案，
請從 [github.com/google/bundletool/releases][github.com/google/bundletool/releases] 下載 bundletool jar 執行檔，然後執行：

```console
$ java -jar bundletool.jar build-apks --bundle=<your_app_project_dir>/build/app/outputs/bundle/release/app-release.aab --output=<your_temp_dir>/app.apks --local-testing

$ java -jar bundletool.jar install-apks --apks=<your_temp_dir>/app.apks
```

其中 `<your_app_project_dir>` 是你應用程式的專案目錄路徑，`<your_temp_dir>` 則是用來儲存 bundletool 輸出結果的任何暫存目錄。

這個操作會將你的 AAB 檔案解包成 APK 檔案，並安裝到裝置上。

所有可用的 Android 動態功能都會在本地載入到裝置上，並會模擬延遲元件的安裝過程。

在再次執行 `build-apks` 之前，

請先移除現有的應用程式 APK 檔案：

```console
$ rm <your_temp_dir>/app.apks
```

對 Dart 程式碼庫的變更需要提升 Android build ID，或是先解除安裝再重新安裝應用程式，因為 Android 除非偵測到新版本號，否則不會更新功能模組（feature modules）。

### 發佈至 Google Play 商店

建置完成的 AAB 檔案可以像平常一樣直接上傳至 Play 商店。當呼叫 `loadLibrary()` 時，Flutter 引擎會透過 Play 商店的遞送功能，自動下載包含 Dart AOT 程式庫及資源（assets）的所需 Android 模組。


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
