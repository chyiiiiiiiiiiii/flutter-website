---
title: 測試插件
description: 學習如何測試你的插件套件。
---

所有[Flutter 常見的測試類型][usual types of Flutter tests]同樣適用於插件套件，但由於插件包含原生程式碼，因此通常還需要其他類型的測試來驗證其所有功能。

[usual types of Flutter tests]: /testing/overview

:::note
若想了解如何測試你的插件程式碼，請繼續閱讀。
若想了解在測試 Flutter 應用程式時，如何避免插件導致當機，請參考
[Flutter 測試中的插件][Plugins in Flutter tests]。
:::

[Plugins in Flutter tests]: /testing/plugins-in-tests

## 插件測試的類型

若想查看每種測試類型的範例，你可以[使用插件範本建立新插件][plugin-tests]，並在指定的目錄中查看。

* <strong>Dart [單元測試][unit tests]與[元件測試][widget tests]</strong>。
  這些測試讓你可以像測試非插件套件的 Dart 程式碼一樣，測試插件中的 Dart 部分。
  不過，插件的原生程式碼[不會被載入][won't be loaded]，
  所以所有對平台通道（platform channels）的呼叫都需要[在測試中進行模擬（mock）][mocked in tests]。

  範例請參考 `test` 目錄。

* <strong>Dart [整合測試][integration tests]</strong>。
  由於整合測試會在 Flutter 應用程式（範例 app）的環境下執行，
  因此可以同時測試 Dart 與原生程式碼，以及它們之間的互動。
  此外，對於需要在瀏覽器中執行的 web 實作程式碼，整合測試也很適合用來做單元測試。

  這類測試通常是插件最重要的測試。
  不過，使用 `integration_test` 的 Dart 整合測試無法與原生 UI 互動，
  例如原生對話框或平台視圖（platform views）的內容。如需原生元件互動支援，
  可以考慮使用 [`patrol`][]。

  範例請參考 `example/integration_test` 目錄。

* <strong>原生單元測試</strong>
  就像 Dart 單元測試可以獨立測試插件的 Dart 部分一樣，原生單元測試可以獨立測試原生部分。
  每個平台都有自己的原生單元測試系統，測試會以與被測試程式碼相同的原生語言撰寫。

  如果你需要模擬（mock）被插件程式碼包裝的 API，而這在 Dart 整合測試中無法做到，原生單元測試會特別有價值。

  你可以依照自己熟悉的平台，設定並使用任何原生測試框架，
  不過以下這些已經在插件範本中預先設定好：

  * <strong>Android</strong>：
    [JUnit][JUnit] 測試可在 `android/src/test/` 找到。

  * <strong>iOS</strong> 與 <strong>macOS</strong>：
    [XCTest][XCTest] 測試分別可在 `example/ios/RunnerTests/`
    與 `example/macos/RunnerTests/` 找到。
    這些測試位於 example 目錄下，
    而非套件的頂層目錄，
    因為它們是透過範例 app 的專案執行。

  * <strong>Linux</strong> 與 <strong>Windows</strong>：
    [GoogleTest][GoogleTest] 測試分別可在 `linux/test/`
    與 `windows/test/` 找到。

其他類型的測試，目前尚未在範本中預先設定的是<strong>原生 UI 測試</strong>。
在原生 UI 測試框架（如 [Espresso][Espresso] 或 [XCUITest][XCUITest]）下執行你的應用程式，
可以讓測試同時與原生及 Flutter UI 元件互動，
因此如果你的插件必須透過原生 UI 互動才能測試，這類測試會很有幫助。

[Espresso]: {{site.repo.packages}}/tree/main/packages/espresso
[GoogleTest]: {{site.github}}/google/googletest
[integration tests]: /cookbook/testing/integration/introduction
[JUnit]: {{site.github}}/junit-team/junit4/wiki/Getting-started
[mocked in tests]: /testing/plugins-in-tests#mock-the-platform-channel
[`patrol`]: {{site.pub-pkg}}/patrol
[plugin-tests]: /packages-and-plugins/developing-packages#step-1-create-the-package-1
[unit tests]: /cookbook/testing/unit/introduction
[widget tests]: /cookbook/testing/widget/introduction
[won't be loaded]: /testing/plugins-in-tests
[XCTest]: {{site.apple-dev}}/documentation/xctest
[XCUITest]: {{site.apple-dev}}/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/09-ui_testing.html

## 執行測試

### Dart 單元測試

這些測試可以像其他 Flutter 單元測試一樣執行，
你可以在偏好的 Flutter IDE 中執行，
或使用 `flutter test`。

### 整合測試

關於執行這類測試的資訊，請參考
[整合測試文件][integration test documentation]。
指令必須在 `example` 目錄下執行。

[integration test documentation]: /cookbook/testing/integration/introduction

### 原生單元測試

所有平台都需要先至少建置一次範例應用程式，
以確保所有平台專屬的建置檔案都已建立，
才能執行單元測試。

<strong>Android JUnit</strong><br>

如果你已經在 Android Studio 中以 Android 專案開啟範例，
可以使用 [Android Studio 測試 UI][Android Studio test UI] 執行單元測試。

若要在命令列執行測試，
請在 `example/android` 目錄下使用以下指令：

```sh
./gradlew testDebugUnitTest
```

<strong>iOS 與 macOS XCTest</strong><br>

如果你已在 Xcode 中開啟範例應用程式，
可以使用 [Xcode Test UI][Xcode Test UI] 來執行單元測試。

若要從命令列執行測試，
請在 `example/ios`（iOS）或 `example/macos`（macOS）目錄下使用以下指令：

```sh
xcodebuild test -workspace Runner.xcworkspace -scheme Runner -configuration Debug
```

對於 iOS 測試，你可能需要先在 Xcode 中開啟 `Runner.xcworkspace` 以設定程式碼簽署（code signing）。

<strong>Linux GoogleTest</strong><br>

若要從命令列執行測試，請在範例目錄下使用以下指令，
並將 "my_plugin" 替換為你的插件專案名稱：

```sh
build/linux/plugins/x64/debug/my_plugin/my_plugin_test
```

如果你是以 release 模式而非 debug 模式建置範例應用程式，請將「debug」替換為「release」。

<strong>Windows GoogleTest</strong><br>

如果你已在 Visual Studio 中開啟範例應用程式，可以使用 [Visual Studio test UI][Visual Studio test UI] 來執行單元測試。

若要從命令列執行測試，請在範例目錄下使用以下指令，並將「my_plugin」替換為你的插件專案名稱：

```sh
build/windows/plugins/my_plugin/Debug/my_plugin_test.exe
```

如果你是以 release 模式（而非 debug 模式）建置範例應用程式，請將 "Debug" 替換為 "Release"。

## 應該新增哪些類型的測試

[測試 Flutter 專案的一般建議][general advice] 同樣適用於插件（plugin）。
針對插件測試，還有以下額外考量：

* 由於只有整合測試（integration tests）能測試 Dart 與原生語言間的通訊，
  請盡量為每個平台通道（platform channel）呼叫至少撰寫一個整合測試。

* 如果有些流程無法透過 `integration_test` 套件來驗證——
  例如需要與原生 UI 互動或模擬裝置狀態時——
  可以考慮使用 [`patrol`][] 套件進行原生 UI 互動，
  或分別針對兩個部分撰寫「端到端」（end to end）單元測試（unit tests）：

  * 原生端的單元測試：建立所需的 mock，然後以合成呼叫（synthesized call）呼叫 method channel 的進入點，並驗證方法回應。

  * Dart 端的單元測試：mock 平台通道（platform channel），然後呼叫插件的公開 API，並驗證結果。

[Android Studio test UI]: {{site.android-dev}}/studio/test/test-in-android-studio
[general advice]: /testing/overview
[Visual Studio test UI]: https://learn.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing?view=vs-2022&tabs=dotnet%2Cmstest#run-unit-tests
[Xcode Test UI]: {{site.apple-dev}}/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/05-running_tests.html
