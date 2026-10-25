# 呼叫 JetPack API

> 從 Dart 程式碼使用最新的 Android API



<?code-excerpt path-base="platform_integration"?>

無論何時，執行於 Android 上的 Flutter 應用程式都能在 Android 發布最新 API 的第一天即加以利用。本頁將說明可用於呼叫 Android 專屬 API 的各種方式。

## 使用現有解決方案

在大多數情境下，你可以使用插件（如下一節所示）來呼叫原生 API，而無需自己撰寫任何自訂樣板或橋接程式碼。

### 使用插件

無論你的 Flutter 應用程式運行於何處，使用插件通常是存取原生 API 最簡單的方式。要使用插件，請造訪 [pub.dev][pub] 並搜尋你所需的主題。大多數原生功能，包括存取常見硬體如 GPS、相機或計步器，都有強大的插件支援。

如需將套件加入 Flutter 應用程式的完整指引，請參閱 [Using packages documentation][packages]。

[packages]: /packages-and-plugins/using-packages
[pub]: https://pub.dev

並非所有原生功能都已由插件支援，尤其是在其剛發布時。在你需要的原生功能尚未被 [pub.dev][pub] 上的套件涵蓋的情境下，請繼續閱讀下方章節。

## 建立自訂解決方案

並非所有情境與 API 都會被現有解決方案支援；但幸運的是，你隨時可以自行加入所需的支援。接下來的章節將介紹兩種從 Dart 呼叫原生程式碼的方式。

:::note
下列兩種解決方案本質上並不優於或劣於現有插件，因為所有插件其實都採用以下其中一種方式。
:::

### 透過 FFI 直接呼叫原生程式碼

呼叫原生 API 最直接且高效的方法，就是透過 FFI 直接呼叫 API。這會在編譯時將你的 Dart 執行檔與指定的原生程式碼連結，讓你能透過少量橋接程式碼直接在 UI 執行緒呼叫它。在大多數情況下，[ffigen][ffigen] 或 [jnigen][jnigen] 對於撰寫這些橋接程式碼很有幫助。

如需從 Flutter 應用程式直接呼叫原生程式碼的完整指引，請參閱 [FFI documentation][ffi]。

在未來幾個月內，Dart 團隊期望透過對 FFI 方式的原生 API 呼叫提供直接支援，進一步簡化這個流程，讓開發者無需再撰寫橋接程式碼。

[ffi]: https://dart.dev/interop/c-interop
[ffigen]: https://pub.dev/packages/ffigen
[jnigen]: https://pub.dev/packages/jnigen


### 新增 MethodChannel

[`MethodChannel`][methodchannels-api-docs] 是 Flutter 應用程式呼叫任意原生程式碼的另一種方式。與前述的 FFI 解決方案不同，MethodChannel 一律是非同步 (asynchronous) 的，這對你來說是否重要則取決於你的使用情境。與 FFI 及直接呼叫原生程式碼一樣，使用 `MethodChannel` 也需要少量橋接程式碼，將 Dart 物件轉換為原生物件，再轉換回來。在大多數情況下，[`pkg:pigeon`][pigeon] 可協助你撰寫這些橋接程式碼。

如需將 MethodChannel 加入 Flutter 應用程式的完整指引，請參閱 [`MethodChannel`s documentation][methodchannels]。

[methodchannels]: /platform-integration/platform-channels
[methodchannels-api-docs]: https://api.flutter.dev/flutter/services/MethodChannel-class.html
[pigeon]: https://pub.dev/packages/pigeon

