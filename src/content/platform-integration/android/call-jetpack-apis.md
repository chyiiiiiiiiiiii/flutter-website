---
title: "呼叫 JetPack API"
description: "從你的 Dart 程式碼使用最新的 Android API"
---

<?code-excerpt path-base="platform_integration"?>

無論何時，執行於 Android 上的 Flutter 應用程式都能在 Android 發布最新 API 的第一天就加以利用。本頁將說明如何呼叫 Android 專屬 API 的各種方式。

## 使用現有解決方案

在大多數情境下，你可以使用套件（如下一節所示）來呼叫原生 API，而無需自行撰寫任何自訂樣板或橋接程式碼。

### 使用套件

使用套件通常是存取原生 API 最簡單的方式，無論你的 Flutter 應用程式運行於何處。要使用套件，請前往 [pub.dev][pub] 並搜尋你需要的主題。大多數原生功能，包括存取常見硬體（如 GPS、相機或計步器）都已由成熟的套件支援。

如需將套件加入 Flutter 應用程式的完整指引，請參閱 [Using packages documentation][packages]。

[packages]: /packages-and-plugins/using-packages
[pub]: {{site.pub}}

並非所有原生功能都已被套件支援，特別是在其剛發布時。若你想要的原生功能尚未有 [pub.dev][pub] 上的套件支援，請繼續閱讀下方章節。

## 建立自訂解決方案

不是所有情境與 API 都會被現有解決方案支援；但幸運的是，你總是可以自行加入所需的支援。以下章節將介紹兩種從 Dart 呼叫原生程式碼的方法。

:::note
下述兩種解決方案本質上並不優於或劣於現有套件，因為所有套件其實都使用了以下其中一種方式。
:::

### 透過 FFI 直接呼叫原生程式碼

最直接且高效的方式是透過 FFI 直接呼叫原生 API。這會在編譯時將你的 Dart 執行檔與指定的原生程式碼連結，讓你能透過少量橋接程式碼直接從 UI 執行緒呼叫原生 API。在多數情況下，[ffigen][ffigen] 或 [jnigen][jnigen] 能協助你撰寫這些橋接程式碼。

如需從 Flutter 應用程式直接呼叫原生程式碼的完整指引，請參閱 [FFI documentation][ffi]。

接下來幾個月，Dart 團隊希望能讓這個流程更簡單，直接支援以 FFI 方式呼叫原生 API，且開發者無需再撰寫任何橋接程式碼。

[ffi]: {{site.dart-site}}/interop/c-interop
[ffigen]: {{site.pub}}/packages/ffigen
[jnigen]: {{site.pub}}/packages/jnigen

### 加入 MethodChannel

[`MethodChannel`][methodchannels-api-docs] 是 Flutter 應用程式呼叫任意原生程式碼的另一種方式。與前述 FFI 解決方案不同，MethodChannel 總是非同步的，這對你來說可能有影響，也可能無影響，視你的使用情境而定。與 FFI 及直接呼叫原生程式碼一樣，使用 `MethodChannel` 也需要少量橋接程式碼，將 Dart 物件轉換為原生物件，再轉回來。在多數情況下，[`pkg:pigeon`][pigeon] 能協助你撰寫這些橋接程式碼。

如需將 MethodChannel 加入 Flutter 應用程式的完整指引，請參閱 [`MethodChannel`s documentation][methodchannels]。

[methodchannels]: /platform-integration/platform-channels
[methodchannels-api-docs]: {{site.api}}/flutter/services/MethodChannel-class.html
[pigeon]: {{site.pub}}/packages/pigeon
