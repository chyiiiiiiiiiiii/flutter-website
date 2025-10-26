---
title: 將 Flutter 模組整合至您的 iOS 專案
shortTitle: 整合 Flutter
description: 學習如何將 Flutter 模組整合到您現有的 iOS 專案中。
---

您可以將 Flutter UI 元件（Widgets）以嵌入式 framework 的方式，逐步加入到現有的 iOS 應用程式中。
若要在現有應用程式中嵌入 Flutter，請考慮以下三種方法之一。

| 嵌入方式 | 方法說明 | 優點 |
|---|---|---|
| 使用 CocoaPods _(推薦)_ | 安裝並使用 Flutter SDK（Flutter 軟體開發套件）與 CocoaPods。每次 Xcode 編譯 iOS 應用程式時，Flutter 會從原始碼編譯 `flutter_module`。 | 將 Flutter 嵌入應用程式最簡單的方法。 |
| 使用 [iOS frameworks][iOS frameworks] | 為 Flutter 元件建立 iOS framework，將其嵌入至您的 iOS 專案，並更新現有應用程式的建置設定。 | 不需要每位開發者都在本機安裝 Flutter SDK 與 CocoaPods。 |
| 同時使用 iOS frameworks 與 CocoaPods | 在 Xcode 中嵌入 iOS 應用程式與 plugin 的 framework，但將 Flutter engine 以 CocoaPods podspec 方式發佈。 | 提供一種替代方案，可避免直接分發龐大的 Flutter engine（`Flutter.xcframework`）library。 |

{:.table .table-striped}

[iOS frameworks]: {{site.apple-dev}}/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html

當您將 Flutter 加入現有的 iOS 應用程式時，
[會增加您的 iOS 應用程式的體積][app-size]。

若需使用 UIKit 建立的應用程式範例，
請參考 [add_to_app code samples][add_to_app code samples] 中的 iOS 目錄。
若需 SwiftUI 範例，請參考 [News Feed App][News Feed App] 的 iOS 目錄。

## 開發系統需求

Flutter 需要安裝最新版的 Xcode 以及 [CocoaPods][CocoaPods]。

## 建立 Flutter 模組

無論您選擇哪一種嵌入方式，
都需先建立一個 Flutter 模組。
請使用以下指令來建立 Flutter 模組。

```console
$ cd /path/to/my_flutter
$ flutter create --template module my_flutter
```

Flutter 會在 `/path/to/my_flutter/` 下建立模組專案。
如果你使用 [CocoaPods 方法][CocoaPods method]，請將該模組
儲存在與你現有 iOS 應用程式相同的父目錄下。

[CocoaPods method]: /add-to-app/ios/project-setup/?tab=embed-using-cocoapods

從 Flutter 模組目錄中，
你可以執行與其他 Flutter 專案相同的 `flutter` 指令，
例如 `flutter run` 或 `flutter build ios`。
你也可以在 [VS Code][VS Code] 或
[Android Studio/IntelliJ][Android Studio/IntelliJ] 中，搭配 Flutter 與 Dart 外掛程式來執行該模組。
這個專案在你嵌入到現有 iOS 應用程式之前，
會包含一個單一畫面的範例版本，
方便你測試僅含 Flutter 部分的程式碼。

## 組織你的模組

`my_flutter` 模組目錄結構與一般的 Flutter 應用程式相似。

```plaintext
my_flutter/
├── .ios/
│   ├── Runner.xcworkspace
│   └── Flutter/podhelper.rb
├── lib/
│   └── main.dart
├── test/
└── pubspec.yaml
```

你的 Dart 程式碼應該新增在 `lib/` 目錄下。
你的 Flutter 相依套件、套件（packages）與外掛（plugins）必須新增到
`pubspec.yaml` 檔案中。

`.ios/` 隱藏子資料夾內含一個 Xcode workspace，
你可以在這裡執行你的模組獨立版本。
這個包裝專案會啟動你的 Flutter 程式碼。
它包含協助腳本，方便你建構 framework 或
透過 CocoaPods 將模組嵌入到你現有的應用程式中。

:::note

* 請將自訂 iOS 程式碼新增到你自己現有應用程式的
  專案或外掛（plugin）中，不要放在模組的 `.ios/`
  目錄下。對於模組的 `.ios/`
  目錄所做的變更，不會反映到使用該模組的現有 iOS 專案中，
  且可能會被 Flutter 覆蓋。

* 請將 `.ios/` 目錄排除於版本控制之外，
  因為它是自動產生的。

* 在新機器上建構模組前，
  請在 `my_flutter` 目錄下執行 `flutter pub get`。
  這會在建構使用 Flutter 模組的 iOS 專案前，
  重新產生 `.ios/` 目錄。

:::

## 在你的 iOS 應用程式中嵌入 Flutter 模組

當你開發好 Flutter 模組後，
可以依照本頁上方表格所述的方法進行嵌入。

你可以在模擬器或實體裝置上以 **Debug** 模式執行，
並在實體裝置上以 **Release** 模式執行。

:::note
進一步了解 [Flutter 的建構模式][build modes of Flutter]。

若要使用 Flutter 的除錯功能（如 hot reload 熱重載），
請參考 [Debugging your add-to-app module][Debugging your add-to-app module]。
:::

{% tabs %}
{% tab "Use CocoaPods" %}

{% render docs/add-to-app/ios-project/embed-cocoapods.md %}

{% endtab %}
{% tab "Use frameworks" %}

{% render docs/add-to-app/ios-project/embed-frameworks.md %}

{% endtab %}
{% tab "Use frameworks and CocoaPods" %}

{% render docs/add-to-app/ios-project/embed-split.md %}

{% endtab %}
{% endtabs %}


## 設定本地網路隱私權限

在 iOS 14 及之後版本，請於
iOS 應用程式的 **Debug** 版本中啟用 Dart 的 multicast DNS 服務。
這將透過 `flutter attach`
新增[如 hot-reload 及 DevTools 等除錯功能][debugging functionalities such as hot-reload and DevTools]。

:::warning
切勿在應用程式的 **Release** 版本中啟用此服務。
Apple App Store 可能會拒絕你的應用程式上架。
:::

若只想在 Debug 版本中設定本地網路隱私權限，
請針對每個建構組態建立獨立的 `Info.plist`。
SwiftUI 專案預設沒有 `Info.plist` 檔案。
如果你需要建立屬性列表（property list），
可以透過 Xcode 或文字編輯器完成。
以下說明假設你使用預設的 **Debug** 與 **Release**，
若你的應用程式有不同的建構組態，請視情況調整名稱。

1. 建立新的屬性列表（property list）。

   1. 在 Xcode 中開啟你的專案。

   1. 在 **Project Navigator** 中點選專案名稱。

   1. 在編輯器窗格的 **Targets** 清單中，點選你的 App。

   1. 點選 **Info** 分頁。

   1. 展開 **Custom iOS Target Properties**。

   1. 在清單上按右鍵，選擇 **Add Row**。

   1. 從下拉選單選擇 **Bonjour Services**。
      這會在專案目錄下建立一個名為 `Info` 的新屬性列表檔案，
      在 Finder 中顯示為 `Info.plist`。

1. 將 `Info.plist` 重新命名為 `Info-Debug.plist`

   1. 在專案清單左側點選 **Info** 檔案。

   1. 在右側的 **Identity and Type** 面板中，
      將 **Name** 從 `Info.plist` 改為 `Info-Debug.plist`。

1. 建立 Release 屬性列表。

   1. 在 **Project Navigator** 中點選 `Info-Debug.plist`。

   1. 選擇 **File** > **Duplicate...**  
      你也可以按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>。

   1. 在對話框中，將 **Save As:** 欄位設為
      `Info-Release.plist`，然後點選 **Save**。

1. 在 **Debug** 屬性列表中新增必要屬性。

   1. 在 **Project Navigator** 中點選 `Info-Debug.plist`。

   1. 在 **Bonjour Services** 陣列中新增字串值 `_dartVmService._tcp`。

   1. _(選用)_ 若要自訂權限對話框的文字，
      請新增鍵值 **Privacy - Local Network Usage Description**。

      {% render docs/captioned-image.liquid, image:"development/add-to-app/ios/project-setup/debug-plist.png", caption:"已新增 **Bonjour Services** 與 **Privacy - Local Network Usage Description** 鍵的 `Info-Debug` 屬性列表" %}

1. 設定 target 以便不同建構模式使用不同的屬性列表。

   1. 在 **Project Navigator** 中點選你的專案。

   1. 點選 **Build Settings** 分頁。

   1. 點選 **All** 與 **Combined** 子分頁。

   1. 在搜尋框中輸入 `plist`。  
      這會將設定範圍限制在包含屬性列表的項目。

   1. 捲動清單直到看到 **Packaging**。

   1. 點選 **Info.plist File** 設定。

   1. 將 **Info.plist File** 的值
      從 `path/to/Info.plist` 改為 `path/to/Info-$(CONFIGURATION).plist`。

      {% render docs/captioned-image.liquid, image:"development/add-to-app/ios/project-setup/set-plist-build-setting.png", caption:"將 `Info.plist` 建構設定更新為使用依建構模式區分的屬性列表" %}

      這會在 **Debug** 模式下對應到 **Info-Debug.plist**，
      在 **Release** 模式下對應到 **Info-Release.plist**。

      {% render docs/captioned-image.liquid, image:"development/add-to-app/ios/project-setup/plist-build-setting.png", caption:"更新後的 **Info.plist File** 建構設定，顯示不同組態的設定" %}

1. 從 **Build Phases** 中移除 **Release** 屬性列表。

   1. 在 **Project Navigator** 中點選你的專案。

   1. 點選 **Build Phases** 分頁。

   1. 展開 **Copy Bundle Resources**。

   1. 如果清單中包含 `Info-Release.plist`，
      點選它，然後點選下方的 **-**（減號）
      以將該屬性列表從資源清單中移除。

      {% render docs/captioned-image.liquid, image:"development/add-to-app/ios/project-setup/copy-bundle.png", caption:"**Copy Bundle** 建構階段顯示 **Info-Release.plist** 設定。請移除此設定。" %}

1. 你的 Debug 版 App 載入的第一個 Flutter 螢幕會提示
   本地網路權限。

   點選 **OK**。

   _(選用)_ 若要在 App 載入前就授權，請到
   **設定 > 隱私權 > 本地網路 > 你的 App** 進行啟用。

## 解決 Apple Silicon Mac 已知問題

在 [採用 Apple Silicon 的 Mac][apple-silicon] 上，
主應用程式會針對 `arm64` 模擬器進行建構。
雖然 Flutter 支援 `arm64` 模擬器，但部分外掛可能不支援。
若你使用這類外掛，可能會看到如
**Undefined symbols for architecture arm64** 的編譯錯誤。
若發生此情況，
請將 `arm64` 從主應用程式的模擬器架構中排除。

1. 在 **Project Navigator** 中點選你的專案。

1. 點選 **Build Settings** 分頁。

1. 點選 **All** 與 **Combined** 子分頁。

1. 在 **Architectures** 下，點選 **Excluded Architectures**。

1. 展開以查看可用的建構組態。

1. 點選 **Debug**。

1. 點選 **+**（加號）。

1. 選擇 **iOS Simulator**。

1. 在 **Any iOS Simulator SDK** 的值欄位中雙擊。

1. 點選 **+**（加號）。

1. 在 **Debug > Any iOS Simulator SDK** 對話框中輸入 `arm64`。

   {% render docs/captioned-image.liquid, image:"development/add-to-app/ios/project-setup/excluded-archs.png", caption:"將 `arm64` 新增為你 App 的排除架構" %}

1. 按下 <kbd>Esc</kbd> 關閉此對話框。

1. 對 **Release** 建構模式重複上述步驟。

1. 若有 iOS 單元測試 target，也請重複設定。

## 下一步

你現在可以 [將 Flutter 螢幕加入][add a Flutter screen] 到你現有的 iOS 應用程式中。

[add_to_app code samples]: {{site.repo.samples}}/tree/main/add_to_app
[add a Flutter screen]: /add-to-app/ios/add-flutter-screen
[Android Studio/IntelliJ]: /tools/android-studio
[build modes of Flutter]: /testing/build-modes
[CocoaPods]: https://cocoapods.org/
[debugging functionalities such as hot-reload and DevTools]: /add-to-app/debugging
[app-size]: /resources/faq#how-big-is-the-flutter-engine
[VS Code]: /tools/vs-code
[News Feed app]: https://github.com/flutter/put-flutter-to-work/tree/022208184ec2623af2d113d13d90e8e1ce722365
[Debugging your add-to-app module]: /add-to-app/debugging/
[apple-silicon]: https://support.apple.com/en-us/116943
