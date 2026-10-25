# 在 release 模式下限制 Android engine 旗標

> 不再支援透過 Android `Intent` extras 或 `--use-application-binary` 將 engine 設定旗標傳遞給 Android release 二進位檔。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

過去，Flutter Android embedding 在所有建置模式下，
都會在啟動時透過 Android `Intent` extras 接受 engine 設定旗標
（例如 `--dart-flags`、`--route` 或追蹤相關旗標）。
這個機制讓開發者與工具（包含使用 `--use-application-binary` 的 Flutter CLI）
能夠在不修改原始碼或 manifest 的情況下，動態設定執行中的應用程式。

為了保護正式環境的應用程式，避免遭受以 `Intent` 為基礎的偽造攻擊與參數注入漏洞，
Flutter Android release 建置現在會忽略透過 `Intent` extras 傳入的 engine 設定旗標，
並嚴格從編譯後的 `AndroidManifest.xml`，
或在 engine 初始化之前以程式方式提供的設定中讀取 engine 設定。

這項變更會在兩個方面影響工作流程：

- **直接以 `Intent` 啟動：**
  在 release 建置中，embedding 會忽略透過 `Intent` extras 傳入的 engine 設定旗標
  （例如透過 `adb shell am start` 或原生 Android 程式碼）。
- **Flutter CLI 預先建置的二進位檔：**
  由於預先建置的二進位檔在編譯後無法動態修改其 manifest，
  如果你使用 `flutter run --release --use-application-binary`
  將 engine 設定旗標傳給預先建置的 release 二進位檔，
  Flutter CLI 現在會產生嚴重錯誤（fatal error）。
  這可避免旗標被默默忽略。

標準的 release 建置
（CLI 使用 Gradle 編譯應用程式，並將旗標注入 manifest）
以及所有 debug 與 profile 工作流程，仍可照常運作，無需變更。

## 背景

Flutter engine 接受設定旗標
（例如 `--dart-flags`、`--route` 或 `--trace-startup`），
以便在執行或驅動應用程式時設定執行階段行為。
過去，Flutter Android embedding 會在執行階段
透過 [`Intent`][] extras 接受這些旗標。
開發者（使用 `adb shell am start` 或原生程式碼）
與 Flutter CLI（透過 `adb`）都依賴 `Intent` extras
將旗標傳遞給執行中的應用程式。

然而，Android 上的執行階段 `Intent` extras 可能被使用者裝置上的其他應用程式偽造或攔截。
在正式環境建置中允許任意的 engine 旗標，會帶來安全漏洞，
例如動態參數注入攻擊
（例如偽造 `--aot-shared-library-name`）。

為了強化正式環境的應用程式，Flutter 建立了
依建置模式區分的信任邊界：

- **Release 模式：**
  正式應用程式的邊界被視為不可變。
  Android embedding 會忽略透過 `Intent` extras 傳入的 engine 設定旗標，
  並記錄一則警告。
  Release 建置只會從已簽署的 `AndroidManifest.xml`，
  或在 engine 啟動前以程式方式進行的設定中讀取設定。
- **Debug 與 profile 模式：**
  刻意保留動態 `Intent` 旗標支援，
  以維持開發者的開發速度、動態效能評測與本機測試工作流程。

對於標準的 Gradle 專案的 release 建置，
Flutter CLI 會在編譯期間自動將命令列旗標
注入 `AndroidManifest.xml`。
當你搭配 `--use-application-binary` 使用預先建置的 release 二進位檔時，
CLI 無法修改已編譯的 manifest，
而且該二進位檔會忽略執行階段的 `Intent` 旗標。
為了避免測試或腳本在未察覺設定失敗的情況下繼續執行，
CLI 會回報嚴重錯誤。

同樣地，任何直接建構帶有設定 extras 的 Android `Intent` 的
自動化腳本、測試執行器或宿主應用程式，
在啟動 release 二進位檔時，都會發現這些旗標被忽略。

[`Intent`]: https://developer.android.com/reference/android/content/Intent

## 變更說明

### Android embedding 行為

當透過 Android `Intent` extras 接收 engine 設定旗標
（例如來自 `adb shell am start` 或原生 `Intent.putExtra()` 呼叫）時，
Flutter Android embedding 會強制執行以下行為：

| 建置模式 | Intent extras 行為 | 備註 |
| :--- | :--- | :--- |
| **Debug / Profile** | 接受並解析 | 旗標會在啟動時動態套用。 |
| **Release** | **忽略** | Embedding 會記錄一則警告，並捨棄所有從 `Intent` extras 收到的 engine 設定旗標。 |

此外，內部介面方法
`FlutterActivityAndFragmentDelegate.Host.getFlutterShellArgs` 已棄用，
請改用 `getFlutterEngineFlags()`。

### Flutter CLI 行為

在 Android 上執行 Flutter 應用程式時，
Flutter CLI 會強制執行以下行為：

| 建置模式 | 使用 `--use-application-binary` | CLI 行為 | 備註 |
| :--- | :--- | :--- | :--- |
| **Debug / Profile** | 是 | 透過 `adb` 將旗標傳遞給二進位檔 | 無需重新建置；旗標在執行階段套用。 |
| **Debug / Profile** | 否 | 建置並透過 `adb` 傳遞旗標 | 標準開發工作流程。 |
| **Release** | 是 | 若提供設定旗標則產生**嚴重錯誤** | 預先建置的 release 二進位檔無法動態設定。 |
| **Release** | 否 | 在編譯期間將旗標注入 `AndroidManifest.xml` | 標準 release 建置工作流程。 |

## 遷移指南

:::note
如果符合以下情況，你**不受影響**，也無需採取任何動作：
- 你使用 Flutter CLI 建置並執行標準 release 應用程式
  （`flutter run --release`、`flutter build apk --release`
  或 `flutter build appbundle`）。
- 你在 **debug** 或 **profile** 模式下執行測試與效能評測。
- 你使用 `--use-application-binary`，但沒有傳入 engine 設定旗標。
:::

如果符合以下情況，你就**受到影響**：
- 你直接使用 Android `Intent` extras 啟動 release 建置
  （例如使用 `adb shell am start`，或在原生程式碼中使用自訂啟動 intent），
  以傳遞 engine 設定旗標或路由參數。
- 你的 CI/CD 管線、自動化腳本或測試執行器，
  使用 `--use-application-binary` 將旗標傳給預先建置的 release 二進位檔。
- 你使用非 Gradle 或封閉式（hermetic）建置系統
  （例如 Bazel）建置 Flutter Android 應用程式，並以啟動時旗標設定 release 二進位檔。

如果你的工作流程受到影響，請使用以下其中一種遷移方式：

### 將測試與效能評測切換為 profile 模式

如果你的自動化測試管線、腳本或效能評測
在啟動時動態地將旗標傳給 release 二進位檔：

1.  將你的測試目標切換為 **profile 模式**（`--profile`）。
    Profile 模式反映 release 的效能特性，
    同時保留透過 `Intent` extras 與 Flutter CLI 動態設定執行階段旗標的支援，
    且無需重新編譯。

### 設定直接 Intent 啟動與封閉式建置系統

如果你直接使用 Android `Intent` 啟動 release 建置
（例如透過 `adb shell am start` 或自訂測試執行器），
或是使用將編譯與執行分離的非 Gradle 或封閉式建置系統
（例如 Bazel）建置 Flutter Android 應用程式：

1.  **不要在 release 建置中依賴 `Intent` extras。**
    傳給 release 二進位檔的任何 `Intent` extras 中的 engine 旗標，
    都會在執行階段被 embedding 默默忽略。
1.  **使用 profile 模式進行動態測試：**
    對於需要在啟動時動態變更旗標的整合測試或效能評測，
    請編譯並執行 **profile** 建置，而不是 release 建置。
1.  **在 `AndroidManifest.xml` 中靜態宣告旗標：**
    如果你必須以特定的 engine 旗標執行 release 二進位檔，
    請在編譯 release 二進位檔之前，
    於 `AndroidManifest.xml` 中靜態宣告這些旗標。
    詳細資訊請參考
    [在 `AndroidManifest.xml` 中宣告 engine 旗標](#declare-engine-flags-in-manifest)。

### 直接使用 Flutter CLI 建置帶有旗標的 release 二進位檔

如果你必須使用 Flutter CLI 針對 release 二進位檔執行測試：

1.  執行 `flutter build` 或 `flutter run` 並帶入你的設定旗標，
    但不要使用 `--use-application-binary`。
    CLI 會自動將旗標嵌入編譯後的 manifest。
1.  或者，為每種所需的設定
    分別編譯獨立的 release 二進位檔。

### 在原生宿主程式碼中以程式方式設定 engine 旗標

如果你從原生 Android 程式碼啟動 Flutter
（例如在 add-to-app 整合或自訂原生 activity 中），
且過去是透過 `Intent` extras 傳遞 engine 旗標：

1.  **覆寫 `getFlutterEngineFlags()`：**
    如果你繼承 `FlutterActivity` 或 `FlutterFragment`，
    請覆寫 `getFlutterEngineFlags()`，
    而不是使用 `Intent` extras
    或已棄用的 `getFlutterShellArgs()`：

    ```kotlin
    class MyFlutterActivity : FlutterActivity() {
        override fun getFlutterEngineFlags(): List<String> {
            val flags = super.getFlutterEngineFlags().toMutableList()
            flags.add("--trace-startup")
            return flags
        }
    }
    ```

1.  **使用 `FlutterFragment.NewEngineFragmentBuilder`：**
    如果你託管 `FlutterFragment`，請使用 builder 傳遞旗標：

    ```kotlin
    val fragment = FlutterFragment.withNewEngine()
        .flutterEngineFlags(listOf("--trace-startup"))
        .build<FlutterFragment>()
    ```

1.  **預先初始化並快取 `FlutterEngine`：**
    如果你直接管理 engine 的生命週期，
    請將 engine 引數提供給 `FlutterEngine` 建構函式：

    ```kotlin
    val args = arrayOf("--trace-startup", "--enable-impeller=true")
    val flutterEngine = FlutterEngine(context, args)
    FlutterEngineCache.getInstance().put("my_engine_id", flutterEngine)
    ```

### 在 manifest 中宣告 engine 旗標 {:#declare-engine-flags-in-manifest}

若要在 release 建置中靜態設定 engine 旗標，
請在 `android/app/src/main/AndroidManifest.xml` 檔案中，
於 `<application>` 標籤下新增 `<meta-data>` 元素：

```xml title="AndroidManifest.xml" highlightLines=6-12
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <!-- Declare engine configuration flags statically -->
        <meta-data
            android:name="io.flutter.embedding.android.DartFlags"
            android:value="--some-dart-flag" />
        <meta-data
            android:name="io.flutter.embedding.android.EnableDartProfiling"
            android:value="false" />
        <activity
            ...
        </activity>
    </application>
</manifest>
```

## 時間軸

合併於版本：3.50.0-0.1.pre<br>
穩定版發布：尚未

## 參考資料

相關 issue：

* [Issue 180686][]
* [Issue 190461][]

相關 pull request：

* [PR 190870][]
* [PR 191328][]
* [PR 191924][]

[Issue 180686]: https://github.com/flutter/flutter/issues/180686
[Issue 190461]: https://github.com/flutter/flutter/issues/190461
[PR 190870]: https://github.com/flutter/flutter/pull/190870
[PR 191328]: https://github.com/flutter/flutter/pull/191328
[PR 191924]: https://github.com/flutter/flutter/pull/191924

