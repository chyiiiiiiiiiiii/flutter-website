---
title: Flutter 測試中的插件
shortTitle: 插件測試
description: 在 Flutter 測試中加入插件。
---

:::note
若想了解如何在測試 Flutter 應用程式時避免插件造成崩潰，請繼續閱讀。
如果你想學習如何測試自己的插件程式碼，請參考
[Testing plugins][Testing plugins]。
:::

[Testing plugins]: /testing/testing-plugins

幾乎所有 [Flutter 插件][Flutter plugins] 都包含兩個部分：

* Dart 程式碼，提供你的程式所呼叫的 API。
* 使用平台專屬（或稱「主機」）語言撰寫的程式碼，
  例如 Kotlin 或 Swift，負責實作這些 API。

事實上，原生（或主機）語言程式碼是
插件套件與標準套件的主要區別。

[Flutter plugins]: /packages-and-plugins/using-packages

建置並註冊插件的主機端程式碼是 Flutter 應用程式建置流程的一部分，
因此插件僅在你的程式碼於應用程式中執行時才有效，
例如使用 `flutter run`
或執行 [整合測試][integration tests] 時。
當執行 [Dart 單元測試][Dart unit tests] 或
[元件測試][widget tests] 時，主機端程式碼並不可用。
如果你測試的程式碼有呼叫任何插件，
通常會導致如下錯誤：

```console
MissingPluginException(No implementation found for method someMethodName on channel some_channel_name)
```

[Dart unit tests]: /cookbook/testing/unit/introduction
[integration tests]: /cookbook/testing/integration/introduction
[widget tests]: {{site.api}}/flutter/flutter_test/flutter_test-library.html

:::note
僅使用 Dart 的 [Plugin 實作][only use Dart]
在單元測試中是可運作的。這是 plugin 的實作細節，
因此測試不應依賴此行為。
:::

[only use Dart]: /packages-and-plugins/developing-packages#dart-only-platform-implementations

當單元測試使用到 plugin 的程式碼時，
有幾種方式可以避免這類例外。
以下解決方案依推薦順序排列。

## 包裝 plugin

在大多數情況下，最佳做法是將 plugin
的呼叫包裝在你自己的 API 中，
並提供一種方式在測試中[模擬 (mock)][mocking]你自己的 API。

這麼做有幾個優點：

* 如果 plugin 的 API 有變動，
  你不需要更新測試。
* 你只測試自己的程式碼，
  測試不會因為你使用的 plugin 行為而失敗。
* 不論 plugin 的實作方式如何，
  或甚至是非 plugin 的套件依賴，
  都能用相同方法處理。

[mocking]: /cookbook/testing/unit/mocking

## 模擬 plugin 的公開 API

如果 plugin 的 API 已經是基於類別實例，
你可以直接模擬它，但需注意以下事項：

* 若 plugin 使用非類別函式或靜態方法，這方法將無法運作。
* 當 plugin API 變更時，測試也需要更新。

## 模擬 plugin 的平台介面

如果 plugin 是[聯邦式 plugin (federated plugin)][federated plugin]，
它會包含一個平台介面，允許註冊其內部邏輯的實作。
你可以註冊該平台介面的模擬實作，而非公開 API，
但需注意以下事項：

* 若 plugin 不是聯邦式，這方法將無法運作。
* 你的測試會包含部分 plugin 的程式碼，
  因此 plugin 的行為可能會影響你的測試。
  例如，若 plugin 會在內部快取時寫入檔案，
  測試行為可能會因先前是否執行過而改變。
* 當平台介面變更時，測試可能需要更新。

這種方式的典型需求是
模擬你依賴的套件所使用的 plugin 實作，
而不是你自己的程式碼，
因此你無法改變呼叫方式。
但如果可能，建議改為模擬該依賴套件本身。

[federated plugin]: /packages-and-plugins/developing-packages#federated-plugins

## 模擬平台通道 (platform channel)

如果 plugin 使用[平台通道 (platform channels)][platform channels]，
你可以利用 [`TestDefaultBinaryMessenger`][`TestDefaultBinaryMessenger`] 來模擬平台通道。
這種方式僅在上述方法皆不可行時使用，
因為它有以下幾個缺點：

* 只有使用平台通道的實作才能被模擬。
  這代表若某些實作未使用平台通道，
  在某些平台上執行測試時會意外地使用真實實作。
* 平台通道通常是 plugin 的內部實作細節。
  即使是 plugin 的小幅修正更新，也可能大幅改變，
  導致測試意外失敗。
* 聯邦式 plugin 的各個實作可能有不同的平台通道。
  例如，你可能設置了模擬平台通道讓測試在 Windows 通過，
  但在 macOS 或 Linux 上執行時卻失敗。
* 平台通道型別通常不嚴謹。
  例如，method channel 常用 dictionary，
  你必須閱讀 plugin 的實作才能知道 key 字串與 value 型別。

基於這些限制，`TestDefaultBinaryMessenger`
主要適用於 plugin 實作的內部測試，
而非使用 plugin 的程式碼測試。

你也可以參考
[Testing plugins][Testing plugins]。

[platform channels]: /platform-integration/platform-channels
[`TestDefaultBinaryMessenger`]: {{site.api}}/flutter/flutter_test/TestDefaultBinaryMessenger-class.html
[Testing plugins]: /testing/testing-plugins
