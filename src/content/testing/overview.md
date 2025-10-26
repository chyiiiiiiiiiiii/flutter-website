---
title: 測試 Flutter 應用程式
description: 
  進一步了解不同類型的測試以及如何撰寫這些測試。
---

隨著您的應用程式功能越來越多，手動測試也會變得更加困難。
自動化測試有助於在您發布應用程式之前，確保其行為正確，同時維持您的功能開發與錯誤修正速度。

:::note
若想實際操作 Flutter 應用程式的測試，請參考
[如何測試 Flutter 應用程式][How to test a Flutter app] codelab。
:::

自動化測試主要分為幾種類型：

* [_單元測試（unit test）_](#單元測試-unit-tests)用於測試單一函式、方法或類別。
* [_元件測試（widget test）_](#元件測試-widget-tests)（在其他 UI 框架中稱為 _component test_）用於測試單一元件（Widget）。
* [_整合測試（integration test）_](#整合測試-integration-tests)用於測試完整的應用程式或應用程式中的大部分功能。

一般來說，一個測試完善的應用程式會有大量的單元測試與元件測試，並透過 [程式碼覆蓋率（code coverage）][code coverage] 進行追蹤，同時也會有足夠的整合測試來涵蓋所有重要的使用案例。這樣的建議是基於不同測試類型之間的權衡，如下表所示。

| 權衡項目              | 單元測試 | 元件測試 | 整合測試   |
|----------------------|----------|----------|------------|
| **信心程度**          | 低       | 較高     | 最高       |
| **維護成本**          | 低       | 較高     | 最高       |
| **依賴性**            | 少       | 較多     | 最多       |
| **執行速度**          | 快速     | 快速     | 較慢       |

{:.table .table-striped}

## 單元測試（Unit tests）

_單元測試（unit test）_ 用於測試單一函式、方法或類別。
單元測試的目標是在各種情境下驗證邏輯單元的正確性。
被測單元的外部依賴通常會被 [mock（模擬）](/cookbook/testing/unit/mocking)。
單元測試通常不會從磁碟讀取或寫入資料、不會渲染到螢幕，也不會接收來自執行測試程序外部的使用者操作。
如需更多關於單元測試的資訊，
您可以參考以下教學範例，
或在終端機執行 `flutter test --help`。

:::note
如果您正在為使用 plugin 的程式碼撰寫單元測試，並希望避免當機，
請參考 [Flutter 測試中的 Plugins][Plugins in Flutter tests]。
若您想測試自己的 Flutter plugin，
請參考 [Plugin 測試][Testing plugins]。
:::

[Plugins in Flutter tests]: /testing/plugins-in-tests
[Testing plugins]: /testing/testing-plugins

### 教學範例 {:.no_toc}

{% include docs/testing-toc.md type='unit' %}

## 元件測試（Widget tests）

_元件測試（widget test）_（在其他 UI 框架中稱為 _component test_）
用於測試單一元件（Widget）。元件測試的目標是驗證元件的 UI 外觀與互動是否如預期。測試元件時會涉及多個類別，並需要一個提供適當元件生命週期上下文的測試環境。

例如，被測試的 Widget 應能夠接收並回應使用者操作與事件、執行版面配置，以及建立子元件。元件測試因此比單元測試更為全面。不過，與單元測試類似，元件測試的環境會被替換為比完整 UI 系統簡化許多的實作。

### 教學範例 {:.no_toc}

{% include docs/testing-toc.md type='widget' %}

## 整合測試（Integration tests）

_整合測試（integration test）_ 用於測試完整的應用程式或應用程式中的大部分功能。
整合測試的目標是驗證所有被測試的元件（Widgets）與服務能否如預期協同運作。
此外，您也可以利用整合測試來驗證應用程式的效能。

一般來說，_整合測試_ 會在真實裝置或作業系統模擬器（如 iOS Simulator 或 Android Emulator）上執行。
被測試的應用程式通常會與測試驅動程式碼隔離，以避免影響測試結果。

如需撰寫整合測試的詳細資訊，請參考 [整合測試頁面][]。

### 教學範例 {:.no_toc}

{% include docs/testing-toc.md type='integration' %}

## 持續整合服務（Continuous integration services）

持續整合（CI）服務可讓您在推送新程式碼變更時，自動執行測試。
這能及時回饋程式碼變更是否如預期運作，且未引入新的錯誤。

如需在各種持續整合服務上執行測試的資訊，請參考以下內容：

* [使用 fastlane 進行 Flutter 持續交付][Continuous delivery using fastlane with Flutter]
* [在 Appcircle 測試 Flutter 應用程式][Test Flutter apps on Appcircle]
* [在 Travis 測試 Flutter 應用程式][Test Flutter apps on Travis]
* [在 Cirrus 測試 Flutter 應用程式][Test Flutter apps on Cirrus]
* [Codemagic CI/CD for Flutter][Codemagic CI/CD for Flutter]
* [Flutter CI/CD with Bitrise][Flutter CI/CD with Bitrise]

[code coverage]: https://en.wikipedia.org/wiki/Code_coverage
[Codemagic CI/CD for Flutter]: https://blog.codemagic.io/getting-started-with-codemagic/
[Continuous delivery using fastlane with Flutter]: /deployment/cd#fastlane
[Flutter CI/CD with Bitrise]: https://devcenter.bitrise.io/en/getting-started/quick-start-guides/getting-started-with-flutter-apps
[How to test a Flutter app]: {{site.codelabs}}/codelabs/flutter-app-testing
[Test Flutter apps on Appcircle]: https://blog.appcircle.io/article/flutter-ci-cd-github-ios-android-web#
[Test Flutter apps on Cirrus]: https://cirrus-ci.org/examples/#flutter
[Test Flutter apps on Travis]: {{site.flutter-medium}}/test-flutter-apps-on-travis-3fd5142ecd8c
[integration testing page]: /testing/integration-tests
