---
title: 混淆 Dart 程式碼
description: 如何從 Dart 二進位檔中移除函式與類別名稱。
---

<?code-excerpt path-base="deployment/obfuscate"?>

## 什麼是程式碼混淆？

[程式碼混淆 (Code obfuscation)][Code obfuscation] 是一種修改應用程式二進位檔，讓人類更難理解其內容的過程。混淆會隱藏你編譯後 Dart 程式碼中的函式與類別名稱，將每個符號替換成另一個符號，使攻擊者難以對你的專有應用程式進行逆向工程。

[Code obfuscation]: https://en.wikipedia.org/wiki/Obfuscation_(software)

## 限制與警告 {: #limitations}

**Flutter 的程式碼混淆僅適用於 [release build][release build]。**

:::warning
在應用程式中儲存機密資訊是**極差的安全實踐**。
:::

混淆你的程式碼並_不會_加密資源，也無法防止逆向工程。它僅僅是將符號名稱替換為更難辨識的名稱。

Web 應用程式不支援混淆。不過，Web 應用程式可以進行 [壓縮 (minify)][minified]，達到類似的效果。當你建置 Flutter Web 應用程式的 release 版本時，Web 編譯器會自動壓縮應用程式。如需進一步了解，請參閱 [建置與發布 Web 應用程式][Build and release a web app]。

[release build]: /testing/build-modes#release
[Build and release a web app]: /deployment/web
[minified]: https://en.wikipedia.org/wiki/Minification_(programming)

## 支援的目標平台

以下建置目標支援本頁所述的混淆流程：

* `aar`
* `apk`
* `appbundle`
* `ios`
* `ios-framework`
* `ipa`
* `linux`
* `macos`
* `macos-framework`
* `windows`

如需某個建置目標可用的命令列選項詳細資訊，請執行以下指令。你應該會在輸出中看到 `--obfuscate` 與 `--split-debug-info` 選項。如果沒有，請安裝較新版本的 Flutter 以啟用程式碼混淆功能。

```console
$ flutter build <build-target> -h
```
   *  `<build-target>`：建置目標。例如，
      `apk`。

## 混淆（Obfuscate）您的應用程式

若要對您的應用程式進行混淆並建立符號對應表（symbol map），請在 release 模式下使用
`flutter build` 指令，並加上 `--obfuscate` 和 `--split-debug-info` 選項。
如果您未來需要除錯已混淆的應用程式，則必須保留此符號對應表。

1. 執行以下指令以混淆您的應用程式並產生 SYMBOLS 檔案：

   ```console
   $ flutter build <build-target> \ 
      --obfuscate \ 
      --split-debug-info=/<symbols-directory>
   ```

   *  `<build-target>`：建置目標。例如，
      `apk`。
   *  `<symbols-directory>`：SYMBOLS
      檔案應該放置的目錄。例如，
      `out/android`。

1. 當你完成二進位檔混淆後，**請備份
   SYMBOLS 檔案**。如果你遺失了原始的 SYMBOLS 檔案，
   並且想要還原（de-obfuscate）堆疊追蹤（stack trace），
   這個檔案可能會用得上。

## 讀取混淆後的堆疊追蹤

若要除錯由混淆後應用程式產生的堆疊追蹤，
請依照下列步驟將其轉換為可讀格式：

1. 找到對應的 SYMBOLS 檔案。
   例如，來自 Android arm64
   裝置的崩潰紀錄會需要 `app.android-arm64.symbols`。

1. 將堆疊追蹤（儲存在檔案中）
   以及 SYMBOLS 檔案一併提供給 `flutter symbolize` 指令。

   ```console
   $ flutter symbolize \
      -i <stack-trace-file> \
      -d <obfuscated-symbols-file>
   ```

   *  `<stack-trace-file>`：stacktrace 的檔案路徑。例如，`???`。
*  `<obfuscated-symbols-file>`：包含混淆符號的 symbols 檔案路徑。例如，`out/android/app.android-arm64.symbols`。

如需有關 `symbolize` 指令的更多資訊，請執行 `flutter symbolize -h`。

## 讀取混淆後的名稱

你可以產生一個包含混淆對應表（obfuscation map）的 JSON 檔案。混淆對應表是一個 JSON 陣列，內含原始名稱與混淆後名稱的配對。例如，`["MaterialApp", "ex", "Scaffold", "ey"]`，其中 `ex` 是 `MaterialApp` 的混淆名稱。

若要產生混淆對應表，請使用以下指令：

```console
$ flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory> \
   --extra-gen-snapshot-options=--save-obfuscation-map=/<obfuscation-map-file>
```

*  `<build-target>`：建置目標。例如，`apk`。
*  `<symbols-directory>`：應放置符號的目錄。例如，`out/android`。
*  `<obfuscation-map-file>`：應放置 JSON 混淆對應檔的檔案路徑。例如，`out/android/map.json`。

## 注意事項

當你編寫最終將會被混淆成二進位檔的應用程式時，請注意以下事項：

* 依賴於比對特定類別、函式或函式庫名稱的程式碼將會失敗。
  例如，以下對 `expect()` 的呼叫，在混淆後的二進位檔中將無法運作：

   <?code-excerpt "lib/main.dart (Expect)"?>
   ```dart
   expect(foo.runtimeType.toString(), equals('Foo'));
   ```

* Enum 名稱目前不會進行混淆處理。
