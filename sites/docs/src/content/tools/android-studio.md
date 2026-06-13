---
title: Android Studio 與 IntelliJ
description: >-
  學習如何在 Android Studio 及其他 IntelliJ 產品中開發 Flutter 應用程式。
---

<ul class="nav nav-tabs" id="ide" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" role="tab" aria-selected="true">Android Studio 與 IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/tools/vs-code" role="tab" aria-selected="false">Visual Studio Code</a>
  </li>
</ul>

<a id="installation-and-setup" aria-hidden="true"></a>

## 安裝與設定 {: #setup}

Android Studio 與 IntelliJ IDEA 在安裝 Flutter 插件後，能提供完整的 IDE 體驗。

請依照下列 IDE 的官方指示安裝最新版本：

- [Android Studio][]
- [IntelliJ IDEA Community][]
- [IntelliJ IDEA Ultimate][]

[Android Studio]: {{site.android-dev}}/studio/install
[IntelliJ IDEA Community]: https://www.jetbrains.com/idea/download/
[IntelliJ IDEA Ultimate]: https://www.jetbrains.com/idea/download/

### 安裝 Flutter 插件 {: #install-plugin}

<Tabs key="dev-os">

<Tab name="Windows">

1. 前往 **File** <span aria-label="and then">></span>
   **Settings**。

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> +
   <kbd>S</kbd>。

   將會開啟 **Preferences** 對話框。

1. 在左側清單中選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在插件搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 插件。

1. 點擊 **Install**。

1. 當系統提示安裝插件時，點擊 **Yes**。

1. 當系統提示時，點擊 **Restart**。

</Tab>
<Tab name="macOS">

1. 啟動 Android Studio 或 IntelliJ。

1. 在 macOS 選單列中，前往 **Android Studio**（或 **IntelliJ**）
   <span aria-label="and then">></span> **Settings...**。

   你也可以按下 <kbd>Cmd</kbd> + <kbd>,</kbd>。

   將會開啟 **Preferences** 對話框。

1. 在左側清單中選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在插件搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 插件。

1. 點擊 **Install**。

1. 當系統提示安裝插件時，點擊 **Yes**。

1. 當系統提示時，點擊 **Restart**。

</Tab>
<Tab name="Linux">

1. 前往 **File** <span aria-label="and then">></span>
   **Settings**。

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> +
   <kbd>S</kbd>。

   將會開啟 **Preferences** 對話框。

1. 在左側清單中選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在插件搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 插件。

1. 點擊 **Install**。

1. 當系統提示安裝插件時，點擊 **Yes**。

1. 當系統提示時，點擊 **Restart**。

</Tab>

</Tabs>

### 更新插件 {:#updating}

插件會定期推出更新。當有新版本可用時，IDE 會主動提示你更新。

若要手動檢查更新：

 1. 開啟偏好設定（macOS 上為 **Android Studio > Check for Updates**，
    Linux 上為 **Help > Check for Updates**）。
 1. 若有 `dart` 或 `flutter` 顯示於列表中，請進行更新。

## 建立專案

你可以透過多種方式建立新專案。

### 建立新專案

從 Flutter 起始應用程式範本建立新 Flutter 專案，在 Android Studio 與 IntelliJ 之間略有不同。

**在 Android Studio：**

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **New Flutter Project**，或在主 IDE 視窗選擇 **File > New > New Flutter Project**。
 1. 指定 **Flutter SDK path**，然後點擊 **Next**。
 1. 輸入你想要的 **Project name**、**Description** 及 **Project location**。
 1. 若你有發佈應用程式的需求，請[設定公司網域](#set-the-company-domain)。
 1. 點擊 **Finish**。

**在 IntelliJ：**

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **New Project**，或在主 IDE 視窗選擇 **File > New > Project**。
 1. 在左側面板的 **Generators** 清單中選擇 **Flutter**。
 1. 指定 **Flutter SDK path**，然後點擊 **Next**。
 1. 輸入你想要的 **Project name**、**Description** 及 **Project location**。
 1. 若你有發佈應用程式的需求，請[設定公司網域](#set-the-company-domain)。
 1. 點擊 **Finish**。

#### Set the company domain

建立新應用程式時，部分 Flutter IDE 插件會要求你輸入反向網域格式的組織名稱，例如 `com.example`。這個名稱會與應用程式名稱一起作為 Android 的套件名稱，以及 iOS 發佈時的 Bundle ID。如果你有發佈應用程式的可能，建議現在就設定好。應用程式發佈後，這些資訊將無法再更改。你的組織名稱應具有唯一性。

### 從現有原始碼開啟專案

若要開啟現有的 Flutter 專案：

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **Open**，或在主 IDE 視窗選擇 **File > Open**。
 1. 瀏覽至存放現有 Flutter 原始碼檔案的目錄。
 1. 點擊 **Open**。

    :::important
    請*不要*使用 **New > Project from existing sources** 選項來開啟 Flutter 專案。
    :::


## 編輯程式碼與檢視問題

Flutter 插件會執行程式碼分析，提供以下功能：

* 語法高亮顯示。
* 基於豐富型別分析的程式碼自動補全。
* 跳至型別宣告（**Navigate > Declaration**），以及尋找型別使用處（**Edit > Find > Find Usages**）。
* 檢視所有目前原始碼問題（**View > Tool Windows > Dart Analysis**）。
  任何分析問題都會顯示在 Dart Analysis 面板中：<br>
  ![Dart Analysis pane](/assets/images/docs/tools/android-studio/dart-analysis.png){:width="90%"}

## 執行與除錯

:::note
你可以用多種方式除錯你的應用程式。

* 使用 [DevTools][]，這是一套在瀏覽器中運行的除錯與效能分析工具，_並包含 Flutter inspector_。
* 使用 Android Studio（或 IntelliJ）內建的除錯功能，例如設定中斷點。
* 使用 Flutter inspector，可直接在 Android Studio 與 IntelliJ 中存取。

下方說明 Android Studio 與 IntelliJ 可用的功能。若需啟動 DevTools，請參考 [DevTools][] 文件中的[從 Android Studio 執行 DevTools][Running DevTools from Android Studio]。
:::

執行與除錯可透過主工具列控制：

![Main IntelliJ toolbar](/assets/images/docs/tools/android-studio/main-toolbar.png){:width="90%"}

### 選擇目標裝置

當 Flutter 專案在 IDE 中開啟時，你應該會在工具列右側看到一組 Flutter 專用按鈕。

:::note
如果執行（Run）與除錯（Debug）按鈕為灰色，且沒有任何目標裝置可選，表示 Flutter 尚未偵測到任何已連接的 iOS 或 Android 裝置或模擬器。
你需要連接裝置，或啟動模擬器後才能繼續。
:::

 1. 找到 **Flutter Target Selector** 下拉按鈕，這裡會顯示可用的目標裝置清單。
 2. 選擇你要啟動應用程式的目標裝置。當你連接新裝置或啟動模擬器時，會出現更多選項。

### 不設中斷點執行應用程式

 1. 點擊工具列上的 **Play 圖示**，或執行 **Run > Run**。
    下方的 **Run** 面板會顯示日誌輸出。

### 設中斷點執行應用程式

 1. 如有需要，在原始碼中設置中斷點。
 1. 點擊工具列上的 **Debug 圖示**，或執行 **Run > Debug**。
    * 下方的 **Debugger** 面板會顯示 Stack Frames 與變數。
    * 下方的 **Console** 面板會顯示詳細日誌輸出。
    * 除錯會根據預設啟動組態進行。若要自訂，請點擊裝置選擇器右側的下拉按鈕，選擇 **Edit configuration**。

## 快速編輯與即時刷新開發循環

Flutter 提供業界最佳的開發循環，透過 _Stateful Hot Reload_ 功能，讓你幾乎能即時看到程式碼變更的效果。
進一步了解，請參考 [Hot reload][]。

### 顯示效能資料

:::note
如需檢查 Flutter 的效能問題，請參考 [Timeline view][]。
:::

若要檢視效能資料（包含元件 (Widget) 重建資訊），請以 **Debug** 模式啟動應用程式，然後透過
**View > Tool Windows > Flutter Performance** 開啟效能工具視窗。

![Flutter performance window](/assets/images/docs/tools/android-studio/widget-rebuild-info.png){:width="90%"}

若要查看哪些元件被重建，以及重建次數，請在 **Performance** 面板中點擊 **Show widget rebuild information**。該影格的重建次數會顯示在右數第二欄。若重建次數較多，會顯示黃色旋轉圈。最右側欄位顯示自進入當前畫面以來，該元件被重建的總次數。未被重建的元件會顯示實心灰色圓圈，否則會顯示灰色旋轉圈。

:::secondary
截圖中的應用程式設計上就是要產生較差的效能，重建分析工具能協助你找出畫面中可能導致效能不佳的原因。元件重建分析工具本身並非效能診斷工具。
:::

這個功能的目的是讓你意識到元件何時正在重建&mdash;僅從程式碼可能無法察覺。如果有元件被重建而你沒有預期，通常表示你應該將大型的 build 方法拆分成多個元件。

這個工具可協助你除錯至少四種常見效能問題：

1. 整個畫面（或大部分）由單一 StatefulWidget 建構，導致不必要的 UI 重建。請將 UI 拆分成多個擁有較小 `build()` 函數的元件。

1. 螢幕外的元件被重建。例如，當 ListView 被放在一個很高、超出螢幕的 Column 內，或未為超出螢幕的清單設置 RepaintBoundary，導致整個清單被重繪。

1. AnimatedBuilder 的 `build()` 函數繪製了一個不需要動畫的子樹，導致靜態物件被不必要地重建。

1. Opacity 元件被放在元件樹過高的位置，或直接操作 Opacity 元件的 opacity 屬性來產生動畫，導致該元件及其子樹都被重建。

你可以點擊表格中的一行，跳轉到該元件在原始碼中的建立位置。程式執行時，旋轉圖示也會顯示在程式碼面板中，協助你視覺化哪些重建正在發生。

請注意，重建次數多不一定代表有問題。通常只有在你已經用 profile 模式執行應用程式，並確認效能不如預期時，才需要擔心過度重建。

請記得，_元件重建資訊僅在 debug build 可用_。請在真實裝置上以 profile build 測試效能，但在 debug build 下除錯效能問題。

## Flutter 程式碼編輯小技巧

如果你有其他值得分享的技巧，歡迎[告訴我們][let us know]！

### 協助（Assists）與快速修正（Quick Fixes）

協助（Assists）是針對特定程式碼識別符號的程式碼變更。當游標停在 Flutter 元件識別符號上時，會出現黃色燈泡圖示，表示有可用的協助。你可以點擊燈泡，或使用鍵盤快捷鍵（Linux 與 Windows 為 `Alt`+`Enter`，macOS 為 `Option`+`Return`）來啟用協助，如下圖所示：

![IntelliJ editing assists](/assets/images/docs/tools/android-studio/assists.webp){:width="100%"}

快速修正（Quick Fixes）類似，但僅在程式碼有錯誤時顯示，並協助你修正錯誤。會以紅色燈泡標示。

#### 使用「包裹新元件」協助

當你想將某個元件包裹在其他元件外層時可以使用，例如將元件包裹在 `Row` 或 `Column` 中。

#### 使用「將元件清單包裹新元件」協助

與上述協助類似，但適用於包裹現有的元件清單，而非單一元件。

#### 使用「將 child 轉換為 children」協助

將 child 參數轉換為 children 參數，並將參數值包裹在清單中。

### Live templates（即時範本）

Live templates 可加速輸入常見程式碼結構。只需輸入其前綴詞，然後在程式碼自動補全視窗中選取即可：

![IntelliJ live templates](/assets/images/docs/tools/android-studio/templates.webp){:width="100%"}

Flutter 插件內建以下範本：

* 前綴 `stless`：建立 `StatelessWidget` 的新子類別。
* 前綴 `stful`：建立 `StatefulWidget` 及其對應 State 子類別的新子類別。
* 前綴 `stanim`：建立 `StatefulWidget` 及其對應 State 子類別的新子類別，並包含初始化為 `AnimationController` 的欄位。

你也可以在 **Settings > Editor > Live Templates** 中自訂範本。

### 鍵盤快捷鍵

**Hot reload**

在 Linux（預設 XWin 鍵盤配置）與 Windows 上，快捷鍵為 `Control`+`Alt`+`;` 與 `Control`+`Backslash`。

在 macOS（鍵盤配置 _Mac OS X 10.5+ copy_）上，快捷鍵為 `Command`+`Option` 與 `Command`+`Backslash`。

可在 IDE 的 Preferences/Settings 中變更鍵盤對應：選擇 *Keymap*，然後在右上角搜尋框輸入 _flutter_。右鍵點擊要變更的綁定項目，選擇 _Add Keyboard Shortcut_。

![IntelliJ settings keymap](/assets/images/docs/tools/android-studio/keymap-settings-flutter-plugin.png){:width="100%"}

### Hot reload 與 hot restart

Hot reload 的運作方式是將更新的原始碼檔案注入正在執行的 Dart VM（虛擬機器）。這不僅包括新增類別，也包括對現有類別新增方法與欄位，以及變更現有函數。
不過，有幾種程式碼變更無法透過 hot reload 生效：

* 全域變數初始化器
* 靜態欄位初始化器
* 應用程式的 `main()` 方法

對於這些變更，你可以完全重新啟動應用程式，而無需結束除錯工作階段。若要執行 hot restart，請不要點擊 Stop 按鈕，只需重新點擊 Run 按鈕（若在執行工作階段中）或 Debug 按鈕（若在除錯工作階段中），或是按住 Shift 點擊「hot reload」按鈕。

## 在 Android Studio 中以完整 IDE 支援編輯 Android 程式碼 {:#android-ide}

開啟 Flutter 專案的根目錄並不會將所有 Android 檔案公開給 IDE。Flutter 應用程式包含一個名為 `android` 的子目錄。如果你以獨立專案的形式在 Android Studio 中開啟這個子目錄，IDE 就能完整支援所有 Android 檔案（例如 Gradle 腳本）的編輯與重構。

如果你已經在 Android Studio 中以 Flutter 應用程式的形式開啟整個專案，有兩種等效的方式可以單獨開啟 Android 檔案進行編輯。在嘗試之前，請確保你使用的是最新版本的 Android Studio 與 Flutter 插件。

* 在[「project view」][]中，你應該會在 Flutter 應用程式根目錄正下方看到一個名為 `android` 的子目錄。右鍵點擊它，然後選擇 **Flutter > Open Android module in Android Studio**。
* 或者，你可以開啟 `android` 子目錄下的任何檔案進行編輯。這時你應該會在編輯器頂部看到「Flutter commands」橫幅，其中有一個標示為 **Open for Editing in Android Studio** 的連結。點擊該連結。

這兩種選項在開啟第二個專案時，Android Studio 都會讓你選擇使用獨立視窗或以新專案取代現有視窗。兩種選擇皆可。

如果你尚未在 Android Studio 中開啟 Flutter 專案，你可以從一開始就以獨立專案的形式開啟 Android 檔案：

1. 在歡迎頁面點擊 **Open an existing Android Studio Project**，或在 Android Studio 已開啟時選擇 **File > Open**。
2. 開啟 Flutter 應用程式根目錄正下方的 `android` 子目錄。例如，若專案名稱為 `flutter_app`，則開啟 `flutter_app/android`。

如果你尚未執行過 Flutter 應用程式，開啟 `android` 專案時，Android Studio 可能會回報建置錯誤。在應用程式根目錄執行 `flutter pub get`，然後選擇 **Build > Make** 重新建置專案以修正此問題。

## 在 IntelliJ IDEA 中編輯 Android 程式碼 {:#edit-android-code}

若要在 IntelliJ IDEA 中啟用 Android 程式碼編輯，你需要設定 Android SDK 的位置：

 1. 在 **Preferences > Plugins** 中，若尚未啟用，請啟用 **Android Support**。
 1. 在 Project view 中右鍵點擊 **android** 資料夾，然後選擇 **Open Module Settings**。
 1. 在 **Sources** 標籤中，找到 **Language level** 欄位，並選擇第 8 級或更高。
 1. 在 **Dependencies** 標籤中，找到 **Module SDK** 欄位，然後選擇 Android SDK。若沒有列出任何 SDK，請點擊 **New** 並指定 Android SDK 的位置。請確保選擇與 Flutter 使用的 Android SDK 相符（可透過 `flutter doctor` 確認）。
 1. 點擊 **OK**。

## Flutter Property Editor {: #property-editor}

Flutter Property Editor 是由 [Flutter 插件][Flutter plugin]提供的強大工具，讓你可以直接透過視覺化介面檢視和修改元件屬性。

### 如何在 Android Studio 與 IntelliJ 中開啟 Flutter Property Editor

1. 點擊 Android Studio 或 IntelliJ 側邊欄中的 Flutter Property Editor **圖示** ![Flutter Property Editor Android Studio/IntelliJ icon](/assets/images/docs/tools/devtools/property-editor-icon-android-studio.png){:width="20px"}。
2. Flutter Property Editor 將在側面板中載入。
3. 請參閱 Flutter Property Editor [文件][documentation]以取得詳細的使用說明。

![Flutter Property Editor side panel in Android Studio/IntelliJ](/assets/images/docs/tools/devtools/property-editor-android-studio.png){:width="600px"}

[Flutter plugin]: https://plugins.jetbrains.com/plugin/9212-flutter
[documentation]: /tools/property-editor

## 疑難排解

### 已知問題與意見回饋

可能影響你使用體驗的重要已知問題，已記錄在 [Flutter 插件 README][Flutter plugin README] 檔案中。

已知錯誤與功能請求可在以下問題追蹤系統中查詢：

* [Flutter 插件問題追蹤系統][Flutter plugin issue tracker]
* [Dart 插件問題追蹤系統][Dart plugin issue tracker]

我們歡迎你提供意見回饋，無論是錯誤/問題回報或功能請求。提交新問題前，請先：

* 在問題追蹤系統中快速搜尋，確認該問題是否已被追蹤。
* 確認你已[更新](#updating)至最新版本的插件。

提交新問題時，請附上 [`flutter doctor`][] 的輸出結果。

[DevTools]: /tools/devtools
[Flutter plugin issue tracker]: https://github.com/flutter/flutter-intellij/issues
[Dart plugin issue tracker]: https://github.com/flutter/dart-intellij-third-party/issues
[`flutter doctor`]: /resources/bug-reports#provide-some-flutter-diagnostics
[Debugging Flutter apps]: /testing/debugging
[Flutter plugin README]: {{site.repo.flutter}}-intellij/blob/master/README.md
["project view"]: {{site.android-dev}}/studio/projects/#ProjectView
[let us know]: {{site.repo.this}}/issues/new
[Running DevTools from Android Studio]: /tools/devtools/android-studio
[Hot reload]: /tools/hot-reload
[Timeline view]: /tools/devtools/performance
