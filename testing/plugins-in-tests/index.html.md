# Flutter 測試中的插件

> 在 Flutter 測試中加入插件。



:::note
若想了解如何在測試 Flutter 應用程式時避免因插件導致崩潰，請繼續閱讀下文。
若想了解如何測試您的插件程式碼，請參考
[Testing plugins][Testing plugins]。
:::

[Testing plugins]: /testing/testing-plugins

幾乎所有 [Flutter 插件][Flutter plugins] 都包含兩個部分：

* Dart 程式碼，提供您的程式呼叫的 API。
* 以平台專屬（或稱「host」）語言（如 Kotlin 或 Swift）撰寫的程式碼，負責實作這些 API。

事實上，原生（host）語言的程式碼正是區分插件套件與標準套件的關鍵。

[Flutter plugins]: /packages-and-plugins/using-packages

建置並註冊插件的 host 部分，是 Flutter 應用程式建置流程的一部分，
因此插件僅在您的程式碼於應用程式中執行時才會運作，例如使用 `flutter run`
或執行 [整合測試][integration tests] 時。
當執行 [Dart 單元測試][Dart unit tests] 或
[元件測試][widget tests] 時，host 程式碼並不可用。
如果您正在測試的程式碼有呼叫任何插件，
通常會導致如下錯誤：

```console
MissingPluginException(No implementation found for method someMethodName on channel some_channel_name)
```

[Dart unit tests]: /cookbook/testing/unit/introduction
[integration tests]: /cookbook/testing/integration/introduction
[widget tests]: https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html

:::note
僅使用 Dart 的 [Plugin 實作][only use Dart]
在單元測試中是可運作的。不過，這是 plugin 的實作細節，
因此測試不應該依賴這一點。
:::

[only use Dart]: /packages-and-plugins/developing-packages#dart-only-platform-implementations

當你在單元測試中測試使用 plugin 的程式碼時，
有幾種方式可以避免這個例外。
以下解決方案依推薦順序排列。

## 將 plugin 呼叫包裝起來

在大多數情況下，最佳做法是將 plugin
的呼叫包裝在你自己的 API 中，
並在測試時提供 [mock][mocking] 你自己 API 的方式。

這麼做有幾個優點：

* 如果 plugin 的 API 有變動，
  你不需要更新測試。
* 你只會測試自己的程式碼，
  測試不會因為你所使用的 plugin 行為而失敗。
* 不論 plugin 的實作方式為何，
  甚至是非 plugin 的套件依賴，
  你都可以用相同的方式進行測試。

[mocking]: /cookbook/testing/unit/mocking

## Mock plugin 的公開 API

如果 plugin 的 API 已經是基於類別實例，
你可以直接 mock 它，但需注意以下事項：

* 如果 plugin 使用的是非類別函式或靜態方法，
  這種方式將無法運作。
* 當 plugin API 變動時，
  測試也需要跟著更新。

## Mock plugin 的平台介面

如果 plugin 是 [federated plugin][federated plugin]，
它會包含一個平台介面（platform interface），
允許註冊其內部邏輯的實作。
你可以註冊該平台介面的 mock 實作，
而不是 mock 公開 API，但需注意以下事項：

* 如果 plugin 不是 federated plugin，這種方式將無法運作。
* 你的測試會包含部分 plugin 的程式碼，
  因此 plugin 的行為可能會對你的測試造成影響。
  例如，如果某個 plugin 會在內部快取時寫入檔案，
  你的測試行為可能會因為是否曾經執行過而改變。
* 當平台介面變動時，測試可能也需要更新。

這種方式可能必要的情境是：
你依賴的某個套件使用了 plugin，
而不是你自己的程式碼，
因此你無法改變呼叫方式。
不過，如果可能的話，
你應該 mock 那個使用 plugin 的依賴，而不是直接 mock plugin。

[federated plugin]: /packages-and-plugins/developing-packages#federated-plugins

## Mock 平台通道（platform channel）

如果 plugin 使用 [平台通道（platform channels）][platform channels]，
你可以使用 [`TestDefaultBinaryMessenger`][`TestDefaultBinaryMessenger`] 來 mock 這些平台通道。
只有在上述方法都不可行時，才建議使用這種方式，
因為它有以下幾個缺點：

* 只有使用平台通道實作的 plugin 才能被 mock。
  這代表如果有些實作沒有用到平台通道，
  你的測試在某些平台上會意外地使用到真實實作。
* 平台通道通常是 plugin 的內部實作細節。
  即使是 plugin 的 bugfix 更新，也可能大幅更動，
  造成測試意外失敗。
* 在 federated plugin 的每個實作中，平台通道可能不同。
  例如，你可能設置了 mock 平台通道，
  讓測試在 Windows 機器上通過，
  但在 macOS 或 Linux 上執行時卻失敗。
* 平台通道並非強型別。
  例如，method channel 通常使用字典（dictionary），
  你必須閱讀 plugin 的實作才能知道 key 字串與 value 型別。

由於這些限制，`TestDefaultBinaryMessenger`
主要適用於 plugin 實作本身的內部測試，
而不是用於測試使用 plugin 的程式碼。

你也可以參考
[Testing plugins][Testing plugins]。

[platform channels]: /platform-integration/platform-channels
[`TestDefaultBinaryMessenger`]: https://api.flutter.dev/flutter/flutter_test/TestDefaultBinaryMessenger-class.html
[Testing plugins]: /testing/testing-plugins

