---
title: 在 Flutter 和 Dart DevTools 中建置自訂工具
breadcrumb: DevTools 
description: 
---

你是否曾想過為 Dart 和 Flutter 建置開發者工具，
卻不知道從何開始？
或者你不想花費大量心力建立與運行中的 Dart 或 Flutter 應用程式的連線，
只為了取得除錯資料？
即使你真的建立了一個開發工具，
你又該如何部署它，或讓使用者方便地存取它？
你可以在不受這些阻礙的情況下建立開發者工具。

透過 Dart & Flutter DevTools 擴充套件框架，
你可以輕鬆地建置與現有 DevTools 工具套件緊密整合的開發者工具。
擴充套件使用 Flutter web 建置，並利用 DevTools 現有的框架與工具，
以簡化開發者工具的撰寫體驗。

![`package:foo` 的 DevTools 擴充套件範例](/assets/images/docs/tools/devtools/custom-devtools-extension.png)

## DevTools 擴充套件如何運作？ {:#how-do-devtools-extensions-work}

擴充套件作為 pub 套件的一部分發佈。
你可以將 DevTools 擴充套件新增至現有的 pub 套件，
或是建立一個僅提供 DevTools 擴充套件的新套件。
在這兩種情況下，
終端使用者必須在其相依套件中列出提供 DevTools 擴充套件的套件，
才能在 DevTools 中看到該擴充套件。

舉例來說，假設我們有一個 `package:foo`，
這個套件提供了一個 DevTools 擴充套件。
當使用者在其應用程式中依賴 `package:foo` 時，
他們便自動獲得了這個套件所提供的 DevTools 擴充套件的存取權限。
當 DevTools 根據使用者應用程式或其 IDE 中的資訊，
偵測到 `package:foo` 擴充套件可用時，
DevTools 中將新增一個名為「Foo」的新索引標籤，
其中包含 `package:foo` 提供的開發者工具。

![說明 DevTools 擴充套件如何運作的示意圖](/assets/images/docs/tools/devtools/how-devtools-extension-works.png)

已將 DevTools 擴充套件新增至現有套件的範例套件包括
[`package:shared_preferences`][]、
[`package:provider`][]、[`package:patrol`][] 以及 [`package:drift`][]。

[`package:drift`]: {{site.pub-pkg}}/drift
[`package:patrol`]: {{site.pub-pkg}}/patrol
[`package:provider`]: {{site.pub-pkg}}/provider
[`package:shared_preferences`]: {{site.pub-pkg}}/shared_preferences

## 支援哪些類型的工具？ {:#what-types-of-tools-are-supported}

透過 DevTools 擴充套件框架，你可以建置多種類型的工具，包括：

* 現有套件的配套工具。
* 以獨立套件形式發佈的新工具。
* 與運行中的應用程式互動的工具。
* 與 IDE 中開啟的專案檔案互動的工具。
* 與 Analysis server 互動的工具。

DevTools 擴充套件框架內建多項功能，
讓你向使用者發佈擴充套件的過程更加順暢。
例如，使用者可以：

* 在瀏覽器中從 DevTools 使用你的工具。
* 直接嵌入 IDE 中使用你的工具。
* 從 Dart 和 Flutter 支援的 IDE 中探索並開啟你的工具。

接下來，了解如何撰寫 DevTools 擴充套件。

---

## 撰寫 DevTools 擴充套件 {:#write-a-devtools-extension}

在開始之前，你需要準備：

* Flutter SDK >= 3.17 & Dart SDK >= 3.2。
* 一個你認為需要自訂 DevTools 擴充套件的 [pub][] 套件。

[pub]: {{site.pub}}

### 設定套件層級結構 {:#set-up-your-package-hierarchy}

你將提供獨立擴充套件或配套擴充套件。

#### 獨立擴充套件 {:#standalone-extension}

對於獨立擴充套件（不隨現有 pub 套件一起發佈的擴充套件），
你的擴充套件可以將原始碼包含在與擴充套件一起發佈的同一套件中。
這簡化了開發流程，
且由於套件使用者會將你的套件新增為 dev_dependency，
套件的大小不會影響使用者的應用程式大小。
你的套件結構如下所示：

```yaml
my_new_tool
  extension/
    devtools/
      build/
        ...  # pre-compiled output of the Flutter web app under lib/
      config.yaml
  lib/  # source code for your extension Flutter web app
    src/
      ...
```

由於擴充套件是以 Flutter web 應用程式建置的，
請使用 `flutter create` 來產生套件：

```console
flutter create --template app --platforms web my_new_tool
```

接下來，在下一步驟中使用 `my_new_tool` 套件來設定你的擴充套件。

#### 配套擴充套件 {:#companion-extensions}

對於配套擴充套件（隨現有 pub 套件一起發佈的擴充套件），
建議將擴充套件原始碼放置在 pub 套件之外。
這樣可以讓套件大小保持最小，避免增加依賴你套件的使用者應用程式大小。
以下是推薦的套件結構：

```yaml
foo/  # formerly the repository root of your pub package
  packages/
    foo/  # your pub package
      extension/
        devtools/
          build/
            ...  # pre-compiled output of foo_devtools_extension/lib
          config.yaml
    foo_devtools_extension/
      lib/  # source code for your extension Flutter web app
```

## 設定你的擴充套件 {:#configure-your-extension}

在向使用者提供 DevTools 擴充套件的 Dart 套件中，
新增一個頂層 extension 目錄：

```yaml
foo/
  extension/
  lib/
  ...
```

在 `extension` 目錄下，
**完全按照如下所示**建立以下結構：

```yaml
extension/
  devtools/
    build/
    config.yaml
```

`config.yaml` 檔案包含 DevTools 載入擴充套件所需的中繼資料：

```yaml
name: foo
version: 0.0.1
issueTracker: <link_to_your_issue_tracker.com>
materialIconCodePoint: '0xe0b1'
requiresConnection: true  # optional field - defaults to true
```

複製如上所示的 `config.yaml` 檔案內容，
並貼上到你剛才在套件中建立的 `config.yaml` 檔案中。
**請務必使用如上所示的確切檔案名稱和欄位名稱，
否則你的擴充套件可能無法在 DevTools 中載入**。

為每個鍵填入適合你套件的值。

* `name`：此 DevTools 擴充套件的套件名稱。
  此欄位的值用於擴充套件頁面的標題列。[**必填**]
* `version`：你的 DevTools 擴充套件版本。
  隨著你為擴充套件發佈新功能，此版本號碼應隨時間演進。
  此欄位的值用於擴充套件頁面的標題列。[**必填**]
* `issueTracker`：你的問題追蹤器的 URL。
  當使用者在 DevTools UI 中點擊 **回報問題** 連結時，
  將被導向此 URL。[**必填**]

![DevTools 擴充套件畫面標題列](/assets/images/docs/tools/devtools/devtools-extension-screen-title-bar.png){:width="80%"}

* `materialIconCodePoint`：對應 [`material/icons.dart`][] 中圖示的字碼點值。
  此圖示用於頂層 DevTools 索引標籤列中擴充套件的索引標籤。[**必填**]

![DevTools 擴充套件索引標籤圖示](/assets/images/docs/tools/devtools/devtools-extension-tab-icon.png){:width="12%"}

* `requiresConnection`：指示擴充套件是否需要連線到 Dart 或 Flutter 應用程式才能使用。
  這是一個選填欄位，若未指定，預設值為 `true`。[**選填**]

有關 `config.yaml` 規格的最新文件，
請造訪 [extension_config_spec.md][]。

[extension_config_spec.md]: {{site.github}}/flutter/devtools/blob/master/packages/devtools_extensions/extension_config_spec.md
[`material/icons.dart`]: {{site.github}}/flutter/flutter/blob/master/packages/flutter/lib/src/material/icons.dart

## 建置你的擴充套件 {:#build-your-extension}

使用以下步驟建置擴充套件。

### 建立 Flutter web 應用程式 {:#create-the-flutter-web-app}

:::note
如果你正在建置獨立擴充套件，請跳過此步驟，
因為你在設定套件層級結構時已經完成了這個步驟。
:::

在你希望存放擴充套件原始碼的目錄中，
執行以下指令，將 `foo_devtools_extension` 替換為
`<your_package_name>_devtools_extension`：

```console
flutter create --template app --platforms web foo_devtools_extension
```

### 新增 `package:devtools_extensions` 相依套件 {:#add-the-packagedevtools_extensions-dependency}

```console
flutter pub add devtools_extensions
```

你可能還需要新增 [`package:devtools_app_shared`][] 的相依套件，
其中包含建置擴充套件時可使用的共享服務、工具程式與 UI 元件。
請造訪 [`devtools_app_shared/example`][] 查看使用範例。

```console
flutter pub add devtools_app_shared
```

[`package:devtools_app_shared`]: {{site.pub-pkg}}/devtools_app_shared
[`devtools_app_shared/example`]: {{site.github}}/flutter/devtools/tree/master/packages/devtools_app_shared/example

### 新增 `DevToolsExtension` 元件 (Widget) {:#add-the-devtoolsextension-widget}

在 `lib/main.dart` 中，新增以下 import：

```dart
import 'package:devtools_extensions/devtools_extensions.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const FooDevToolsExtension());
}

class FooDevToolsExtension extends StatelessWidget {
  const FooDevToolsExtension({super.key});

  @override
  Widget build(BuildContext context) {
    return const DevToolsExtension(
      child: Placeholder(), // Build your extension here
    );
  }
}
```

`DevToolsExtension` 元件會自動初始化所有與 DevTools 互動所需的擴充套件。
在擴充套件 web 應用程式中的任何位置，你都可以存取以下全域變數：

* `extensionManager`：用於與 DevTools 或擴充套件框架互動的管理員。
* `serviceManager`：用於與已連線的 vm service 互動的管理員（若有）。
* `dtdManager`：用於與 Dart Tooling Daemon 互動的管理員（若有）。

## 除錯你的擴充套件 {:#debug-your-extension}

在開發和維護 DevTools 擴充套件時，
你會想要執行、除錯並測試你的擴充套件 Flutter web 應用程式。
以下概述了幾種不同的選擇。

### 選項 A：使用模擬 DevTools 環境（建議用於開發） {:#option-a-use-the-simulated-devtools-environment-recommended-for-development}

為了除錯目的，
你可能會想使用「模擬 DevTools 環境」。
這是一個模擬環境，讓你無需在 DevTools 中以嵌入 iFrame 的方式開發擴充套件。
以這種方式執行你的擴充套件時，
擴充套件將被包裹在一個模擬 DevTools 與 DevTools 擴充套件連線的環境中。
它還讓你可以使用熱重啟 (hot restart) 和更快的開發週期。

![使用模擬 DevTools 環境除錯擴充套件](/assets/images/docs/tools/devtools/devtools-extension-debugger.png)

1. _你的 DevTools 擴充套件。_
2. _你的 DevTools 擴充套件將與之互動的測試應用程式的 VM service URI。
   此應用程式應依賴你的擴充套件的父套件（此範例中為 `package:foo`）。_
3. _執行使用者可能從 DevTools 觸發的操作的按鈕。_
4. _顯示將在擴充套件與 DevTools 之間傳送的訊息的日誌。_

模擬環境由環境參數 `use_simulated_environment` 啟用。
若要在啟用此旗標的情況下執行擴充套件 web 應用程式，
請在 VS Code 的 `launch.json` 檔案中新增一個設定：

```json
{
    ...
    "configurations": [
        ...
        {
            "name": "foo_devtools_extension + simulated environment",
            "cwd": "packages/foo_devtools_extension",
            "request": "launch",
            "type": "dart",
            "args": [
                "--dart-define=use_simulated_environment=true"
            ],
        },
    ]
}
```

或從命令列使用額外的旗標啟動你的應用程式：

```console
flutter run -d chrome -dart-define=use_simulated_environment=true
```

### 選項 B：使用真實的 DevTools 環境 {:#option-b-use-a-real-devtools-environment}

一旦你將擴充套件開發到可以在真實 DevTools 環境中測試變更的程度，
你需要執行一系列設定步驟：

<ol>
<li>將擴充套件開發到可以在真實 DevTools 環境中測試變更的程度。
    建置你的 Flutter web 應用程式，並將建置的資源從
    `your_extension_web_app/build/web` 複製到你的 pub 套件的
    `extension/devtools/build directory`。

    使用 `package:devtools_extensions` 的 `build_and_copy` 指令
    來協助完成此步驟。

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions build_and_copy --source=. --dest=path/to/your_pub_package/extension/devtools
    ```

:::note
    如果你使用推薦的套件結構將擴充套件新增至現有 pub 套件，
    `--dest` 的值應為 `../your_pub_package/extension/devtools`。
:::

    為了確保你的擴充套件已正確設定以在 DevTools 中載入，
    請執行 `package:devtools_extensions` 的 `validate` 指令。
    `--package` 引數應指向此擴充套件將隨之發佈的 Dart 套件根目錄。

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions validate --package=path/to/your_pub_package
    ```
</li>

<li>準備一個依賴提供擴充套件的 pub 套件的測試環境。

    在你要新增套件相依性的 Dart 或 Flutter 專案中，
    新增一個指向本機套件原始碼的 [`path`][] 相依套件
    （包含擴充套件資源的 `extension/devtools/` 目錄的套件）。
    完成後，在套件上執行 `pub get`。

    * **如果你的擴充套件需要運行中的應用程式**，
      則你需要執行依賴你擴充套件的應用程式。
    * **如果你的擴充套件不需要運行中的應用程式**，
      則你需要在支援的 IDE（VS Code 或 IntelliJ / Android Studio）中
      開啟依賴你套件的測試 Dart 或 Flutter 專案。

[`path`]: {{site.dart-site}}/tools/pub/dependencies#path-packages
</li>

<li>啟動 DevTools

    使用以下任一方式啟動 DevTools：

    * **如果你的擴充套件需要運行中的應用程式**，
      你可以從執行測試應用程式時在命令列印出的 URI 開啟 DevTools，
      或從執行測試應用程式的 IDE 開啟 DevTools。
    * **如果你的擴充套件不需要運行中的應用程式**，
      你可以在支援的 IDE（VS Code 或 IntelliJ / Android Studio）中
      開啟依賴你套件的 Dart 或 Flutter 專案。
      從 IDE 開啟 DevTools 以在瀏覽器中檢視你的擴充套件。
    * **如果你需要 DevTools 的本機或未發佈的變更**，
      你需要從原始碼建置並執行 DevTools。
      請參閱 DevTools 的 [CONTRIBUTING.md][] 以取得相關指南。
      你需要同時建置 DevTools 的伺服器和前端來測試擴充套件（[說明][instructions]）。
</li>

<li>如果你的測試應用程式尚未連線到 DevTools，請將其連線，
    你應該會在 DevTools 應用程式列中看到你的擴充套件的索引標籤。
    你的擴充套件的啟用或停用狀態由 DevTools 管理，
    可從 DevTools 的 **Extensions** 選單存取，
    該選單位於畫面右上角的操作按鈕中。
</li>
</ol>

開啟 DevTools 後，
DevTools 應用程式列中應出現你的擴充套件的索引標籤。
你的擴充套件的啟用或停用狀態由 DevTools 管理，
可從「Extensions」選單存取，
該選單位於畫面右上角的操作按鈕中。

![DevTools 擴充套件選單按鈕](/assets/images/docs/tools/devtools/devtools-extensions-menu-button.png){:width="80%"}

![DevTools 擴充套件選單](/assets/images/docs/tools/devtools/devtools-extensions-menu.png)

[CONTRIBUTING.md]: {{site.github}}/flutter/devtools/tree/master/packages/devtools_extensions
[instructions]: {{site.github}}/flutter/devtools/blob/master/CONTRIBUTING.md#development-devtools-server--devtools-flutter-web-app

## 發佈含有 DevTools 擴充套件的套件 {:#publish-your-package-with-a-devtools-extension}

若要讓套件向其使用者提供 DevTools 擴充套件，
必須在 `your_pub_package/extension/devtools/` 目錄中包含預期的內容後才能發佈
（如前述設定說明所描述）。

<ol>
<li>確保 `extension/devtools/config.yaml` 檔案存在
    並根據上述規格進行設定。
    你可以執行 `package:devtools_extensions` 的 `validate` 指令來驗證。

 ```console
 cd your_extension_web_app;
 flutter pub get;
 dart run devtools_extensions validate --package=path/to/pkg_providing_your_extension_assets
 ```
</li>

<li>使用 `package:devtools_extensions` 提供的 `build_and_copy` 指令
    建置你的擴充套件並將輸出複製到 `extension/devtools` 目錄：

    ```console
    cd your_extension_web_app;
    flutter pub get;
    dart run devtools_extensions build_and_copy --source=. --dest=path/to/your_pub_package/extension/devtools
    ```
</li>
</ol>

然後，在 [`pub.dev`][] 上發佈你的套件：

```console
flutter pub publish
```

執行 `pub publish` 時，
如果你沒有 `config.yaml` 檔案和非空的 `build` 目錄（如所要求的），
你將看到警告訊息。

有關發佈套件的其他指引，
請造訪 `package:devtools_extensions` 的[發佈指南][publishing guide]。

[`pub.dev`]: {{site.pub}}
[publishing guide]: {{site.pub-pkg}}/devtools_extensions#publish-your-package-with-a-devtools-extension

---

完成了！現在，
當使用者依賴你套件的最新版本時，
他們將自動獲得你在 DevTools 擴充套件中提供的工具的存取權限。

你可能會覺得以下連結很有用：

* 有關此功能的最新資訊，
  請造訪 GitHub 上的 [DevTools Extensions README][]。
* 如需回報問題或提出功能請求，
  請在 DevTools 問題追蹤器上[提交問題][file an issue]。
* 有關一般支援以及加入 DevTools 擴充套件作者社群，
  請查看 [#devtools-extension-authors][extensions-discord] Discord 頻道
  （你需要先加入 [Flutter Discord 伺服器][Flutter Discord server]）。

[DevTools Extensions README]: {{site.github}}/flutter/devtools/blob/master/packages/devtools_extensions/README.md
[extensions-discord]: https://discord.com/channels/608014603317936148/1159561514072690739
[file an issue]: {{site.github}}/flutter/devtools/issues
[Flutter Discord server]: {{site.github}}/flutter/flutter/wiki/Chat
