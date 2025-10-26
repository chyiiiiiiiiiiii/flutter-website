---
title: Android Studio 與 IntelliJ
description: >-
  學習如何在 Android Studio 與其他 IntelliJ 產品中開發 Flutter 應用程式。
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

Android Studio 與 IntelliJ IDEA 在安裝 Flutter 外掛後，能提供完整的 IDE 開發體驗。

請依照下列 IDE 的官方說明安裝最新版本：

- [Android Studio][Android Studio]
- [IntelliJ IDEA Community][IntelliJ IDEA Community]
- [IntelliJ IDEA Ultimate][IntelliJ IDEA Ultimate]

[Android Studio]: {{site.android-dev}}/studio/install
[IntelliJ IDEA Community]: https://www.jetbrains.com/idea/download/
[IntelliJ IDEA Ultimate]: https://www.jetbrains.com/idea/download/

### 安裝 Flutter 外掛 {: #install-plugin}

{% tabs "dev-os" %}

{% tab "Windows" %}

1. 前往 **File** <span aria-label="and then">></span>
   **Settings**。

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> +
   <kbd>S</kbd>。

   **Preferences** 對話框會開啟。

1. 從左側清單選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在外掛搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 外掛。

1. 點擊 **Install**。

1. 當系統提示時，點擊 **Yes** 以安裝外掛。

1. 當系統提示時，點擊 **Restart** 重新啟動。

{% endtab %}
{% tab "macOS" %}

1. 啟動 Android Studio 或 IntelliJ。

1. 從 macOS 選單列，前往 **Android Studio**（或 **IntelliJ**）
   <span aria-label="and then">></span> **Settings...**。

   你也可以按下 <kbd>Cmd</kbd> + <kbd>,</kbd>。

   **Preferences** 對話框會開啟。

1. 從左側清單選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在外掛搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 外掛。

1. 點擊 **Install**。

1. 當系統提示時，點擊 **Yes** 以安裝外掛。

1. 當系統提示時，點擊 **Restart** 重新啟動。

{% endtab %}
{% tab "Linux" %}

1. 前往 **File** <span aria-label="and then">></span>
   **Settings**。

   你也可以按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> +
   <kbd>S</kbd>。

   **Preferences** 對話框會開啟。

1. 從左側清單選擇 **Plugins**。

1. 在此面板頂部選擇 **Marketplace**。

1. 在外掛搜尋欄輸入 `flutter`。

1. 選擇 **Flutter** 外掛。

1. 點擊 **Install**。

1. 當系統提示時，點擊 **Yes** 以安裝外掛。

1. 當系統提示時，點擊 **Restart** 重新啟動。

{% endtab %}

{% endtabs %}

### 更新外掛 {:#updating}

外掛會定期推出更新版本。當有更新可用時，IDE 會主動提示你。

若要手動檢查更新：

 1. 開啟偏好設定（macOS 上為 **Android Studio > Check for Updates**，
    Linux 上為 **Help > Check for Updates**）。
 1. 若有 `dart` 或 `flutter`，請進行更新。

## 建立專案

你可以透過多種方式建立新專案。

### 建立新專案

從 Flutter 起始應用程式範本建立新 Flutter 專案，在 Android Studio 與 IntelliJ 的操作方式略有不同。

**在 Android Studio：**

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **New Flutter Project**，或於主 IDE 視窗選擇 **File > New > New Flutter Project**。
 1. 指定 **Flutter SDK path**，然後點擊 **Next**。
 1. 輸入你想要的 **Project name**、**Description** 與 **Project location**。
 1. 若你有發佈此應用的打算，請[設定公司網域](#設定公司網域)。
 1. 點擊 **Finish**。

**在 IntelliJ：**

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **New Project**，或於主 IDE 視窗選擇 **File > New > Project**。
 1. 在左側面板的 **Generators** 清單中選擇 **Flutter**。
 1. 指定 **Flutter SDK path**，然後點擊 **Next**。
 1. 輸入你想要的 **Project name**、**Description** 與 **Project location**。
 1. 若你有發佈此應用的打算，請[設定公司網域](#設定公司網域)。
 1. 點擊 **Finish**。

#### 設定公司網域

建立新應用時，部分 Flutter IDE 外掛會要求你輸入以反向網域格式（reverse domain order）表示的組織名稱，例如 `com.example`。這個名稱會與應用名稱一起作為 Android 的套件名稱，以及 iOS 發佈時的 Bundle ID。如果你有發佈應用的可能，建議現在就指定這些資訊。應用發佈後這些資訊將無法更改。你的組織名稱應該是唯一的。

### 從現有原始碼開啟專案

若要開啟現有的 Flutter 專案：

 1. 在 IDE 中，於 **Welcome** 視窗點擊 **Open**，或於主 IDE 視窗選擇 **File > Open**。
 1. 瀏覽至存放你現有 Flutter 原始碼檔案的目錄。
 1. 點擊 **Open**。

    :::important
    請*不要*使用 **New > Project from existing sources** 選項來開啟 Flutter 專案。
    :::


## 編輯程式碼與檢視問題

Flutter 外掛會執行程式碼分析，提供以下功能：

* 語法高亮顯示
* 基於型別分析的程式碼自動完成
* 跳至型別宣告（**Navigate > Declaration**），以及尋找型別用法（**Edit > Find > Find Usages**）
* 檢視目前所有原始碼問題（**View > Tool Windows > Dart Analysis**）
  任何分析問題都會顯示於 Dart Analysis 面板：<br>
  ![Dart Analysis pane](/assets/images/docs/tools/android-studio/dart-analysis.png){:width="90%"}

## 執行與除錯

:::note
你可以用幾種方式除錯你的應用程式：

* 使用 [DevTools][DevTools]，這是一套在瀏覽器中執行的除錯與效能分析工具，_並包含 Flutter inspector_。
* 使用 Android Studio（或 IntelliJ）內建的除錯功能，例如設定中斷點。
* 使用 Flutter inspector，直接在 Android Studio 與 IntelliJ 中可用。

下方說明 Android Studio 與 IntelliJ 提供的功能。關於如何啟動 DevTools，請參考 [從 Android Studio 執行 DevTools][Running DevTools from Android Studio] 及 [DevTools][DevTools] 文件。
:::

執行與除錯可透過主工具列控制：

![Main IntelliJ toolbar](/assets/images/docs/tools/android-studio/main-toolbar.png){:width="90%"}

### 選擇目標裝置

當 Flutter 專案在 IDE 中開啟時，你應該會在工具列右側看到一組 Flutter 專用按鈕。

:::note
如果執行與除錯按鈕為停用狀態，且沒有列出任何目標裝置，代表 Flutter 尚未偵測到任何已連接的 iOS 或 Android 裝置或模擬器。
你需要連接裝置或啟動模擬器才能繼續。
:::

 1. 找到 **Flutter Target Selector** 下拉按鈕，這裡會顯示可用的目標裝置清單。
 2. 選擇你想要啟動應用的目標裝置。當你連接裝置或啟動模擬器時，會出現更多選項。

### 不設中斷點執行應用

 1. 點擊工具列上的 **Play icon**，或執行 **Run > Run**。
    下方的 **Run** 面板會顯示日誌輸出。

### 設中斷點執行應用

 1. 若需要，可在原始碼中設置中斷點。
 1. 點擊工具列上的 **Debug icon**，或執行 **Run > Debug**。
    * 下方的 **Debugger** 面板會顯示 Stack Frames 與變數。
    * 下方的 **Console** 面板會顯示詳細日誌輸出。
    * 除錯會根據預設啟動組態進行。若要自訂，請點擊裝置選擇器右側的下拉按鈕，並選擇 **Edit configuration**。

## 快速編輯與即時刷新開發循環

Flutter 提供業界領先的開發循環，透過 _Stateful Hot Reload_ 功能，讓你幾乎能即時看到修改的效果。
想了解更多，請參考 [Hot reload][Hot reload]。

### 顯示效能資料

:::note
若要檢查 Flutter 的效能問題，請參考 [Timeline view][Timeline view]。
:::

若要檢視效能資料（包含元件重建資訊），請以 **Debug** 模式啟動應用，然後透過 **View > Tool Windows > Flutter Performance** 開啟效能工具視窗。

![Flutter performance window](/assets/images/docs/tools/android-studio/widget-rebuild-info.png){:width="90%"}

若要檢視哪些元件（Widgets）被重建以及重建次數，請在 **Performance** 面板中點擊 **Show widget rebuild information**。
本幀的重建次數會顯示在倒數第二欄。若重建次數較高，會顯示黃色旋轉圈。最右側欄位顯示自進入當前畫面以來元件被重建的次數。
未被重建的元件會顯示實心灰色圓圈；否則會顯示灰色旋轉圈。

:::secondary
螢幕截圖中的應用是刻意設計成效能不佳，重建分析器能幫助你找出哪些畫面可能造成效能問題。元件重建分析器本身並不是效能診斷工具。
:::

這個功能的目的是讓你意識到哪些元件正在重建——僅從程式碼可能無法察覺。如果有元件被重建而你沒預期到，這通常表示你應該將大型 build 方法拆分成多個元件。

此工具可協助你除錯至少四種常見效能問題：

1. 整個螢幕（或大部分）由單一 StatefulWidget 建構，導致不必要的 UI 重建。請將 UI 拆分為多個較小的元件與較小的 `build()` 函式。

1. 螢幕外的元件被重建。例如，當 ListView 被嵌套在一個很高的 Column 內且超出螢幕時，或未為延伸至螢幕外的清單設置 RepaintBoundary，導致整個清單被重繪。

1. AnimatedBuilder 的 `build()` 函式繪製了不需要動畫的子樹，導致靜態物件不必要地重建。

1. Opacity 元件被放在元件樹過高的位置，或直接操作 Opacity 元件的 opacity 屬性來製作動畫，導致元件本身及其子樹被重建。

你可以點擊表格中的一行，直接跳至該元件在原始碼中的建立位置。程式執行時，旋轉圖示也會顯示在程式碼面板，幫助你視覺化哪些重建正在發生。

請注意，重建次數多不一定代表有問題。通常只有在你已經用 profile 模式執行過應用，並確認效能不如預期時，才需要擔心重建過多。

請記住，_元件重建資訊僅在 debug build 可用_。請在真實裝置的 profile build 測試效能，但要在 debug build 下除錯效能問題。

## Flutter 程式碼編輯小技巧

如果你有其他值得分享的小技巧，歡迎[告訴我們][let us know]！

### 協助與快速修正（Assists & Quick Fixes）

協助（Assists）是針對特定程式碼識別符號的程式碼變更。當游標停在 Flutter 元件識別符號上時，會出現黃色燈泡圖示，表示可用的協助。你可以點擊燈泡或使用快捷鍵（Linux 與 Windows 為 `Alt`+`Enter`，macOS 為 `Option`+`Return`）來啟動協助，如下圖所示：

![IntelliJ editing assists](/assets/images/docs/tools/android-studio/assists.webp){:width="100%"}

快速修正（Quick Fixes）類似，但僅在程式碼有錯誤時出現，並協助你修正。會以紅色燈泡顯示。

#### Wrap with new widget 協助

當你想將某個元件包裹在其他元件外層時（例如包在 `Row` 或 `Column` 中），可以使用這個協助。

#### Wrap widget list with new widget 協助

與上述協助類似，但適用於包裹現有的元件清單，而非單一元件。

#### Convert child to children 協助

將 child 參數轉換為 children 參數，並將參數值包裝成清單。

### Live templates

Live templates 可加速輸入常見的程式碼結構。輸入前綴字後，於程式碼自動完成視窗中選擇即可：

![IntelliJ live templates](/assets/images/docs/tools/android-studio/templates.webp){:width="100%"}

Flutter 外掛內建以下範本：

* 前綴 `stless`：建立 `StatelessWidget` 的新子類別。
* 前綴 `stful`：建立 `StatefulWidget` 及其對應 State 子類別的新子類別。
* 前綴 `stanim`：建立 `StatefulWidget` 及其對應 State 子類別的新子類別，並包含一個初始化為 `AnimationController` 的欄位。

你也可以在 **Settings > Editor > Live Templates** 中自訂範本。

### 鍵盤快捷鍵

**Hot reload**

在 Linux（keymap _Default for XWin_）與 Windows 上，快捷鍵為 `Control`+`Alt`+`;` 及 `Control`+`Backslash`。

在 macOS（keymap _Mac OS X 10.5
