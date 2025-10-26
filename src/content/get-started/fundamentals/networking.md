---
title: 網路與資料
description: 學習如何為你的 Flutter 應用程式加入網路功能。
prev:
  title: 處理使用者輸入
  path: /get-started/fundamentals/user-input
next:
  title: 本地資料與快取
  path: /get-started/fundamentals/local-caching
---

雖然俗話說「沒有任何人是一座孤島」，
但沒有任何網路功能的 Flutter 應用程式
可能會顯得有些與世隔絕。
本頁將介紹如何為你的 Flutter 應用程式
加入網路功能。你的應用程式將會擷取資料、
將 JSON 解析成可用的記憶體表示形式，
然後再將資料傳送出去。

## 網路擷取資料入門

最簡單的情況下，假設你使用 [`http`][`http`]
套件來適應 Dart VM 平台與網頁瀏覽器環境
在網路存取上的差異，
發送一個 HTTP `GET` 請求可以像下面這麼簡單：

```dart
import 'package:http/http.dart' as http;

void main() async {
  var response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  );
  print(response.body);
}
```

以下兩個教學將詳細說明如何將 [`http`][`http`] 套件加入你的應用程式中，無論你是在 Android、iOS、網頁瀏覽器內，還是在 Windows、macOS 或 Linux 原生執行。  
第一個教學會示範如何對網站發送未經驗證的 `GET` 請求，將取得的資料解析為 `JSON`，然後顯示結果資料。第二個教學則在第一個基礎上加入驗證標頭（authentication headers），以便存取需要授權的網頁伺服器。Mozilla Developer Network (MDN) 的文章則提供了網頁授權運作方式的更多背景知識。

* 教學：[從網際網路擷取資料][Fetch data from the internet]
* 教學：[發送帶有驗證的請求][Make authenticated requests]
* 文章：[MDN 關於網站授權的文章][MDN's article on Authorization for websites]

## 讓從網路取得的資料變得有用

當你從網路取得資料後，你需要一種方式，將網路上的資料轉換成在 Dart 中可以輕鬆處理的格式。前一節的教學中，使用手寫的 Dart 程式碼將網路資料轉換為記憶體中的表示。在本節中，你將看到其他處理這種轉換的選項。第一個連結是 YouTube 影片，概述了 [`freezed` 套件][`freezed` package]。第二個連結則是 codelab，透過解析 JSON 的案例研究，介紹 Dart 的 pattern 與 record。

* YouTube 影片：[Freezed（本週套件介紹）][Freezed (Package of the Week)]
* Codelab：[深入探討 Dart 的 pattern 與 record][Dive into Dart's patterns and records]

## 雙向操作，再將資料送出

現在你已經掌握了擷取資料的技巧，是時候來看看如何將資料送出。這部分從將資料傳送到網路開始，接著深入探討非同步處理。事實上，當你與網路進行資料交換時，必須面對物理距離遙遠的網頁伺服器可能需要較長回應時間的現實，而你不能在等待封包來回時暫停畫面渲染。Dart 以及 Flutter 都對非同步處理有很好的支援。你將透過教學學習 Dart 的非同步支援，接著在 Widget of the Week 影片中看到 Flutter 的相關能力。完成這些後，你還會學到如何利用 DevTool 的 Network View 偵錯網路流量。

* 教學：[將資料傳送到網際網路][Send data to the internet]
* 教學：[非同步程式設計：futures、async、await][Asynchronous programming: futures, async, await]
* YouTube 影片：[FutureBuilder（本週元件介紹）][FutureBuilder (Widget of the Week)]
* 文章：[使用 Network View][Using the Network View]

## 延伸學習資源

現在你已經熟悉 Flutter 的網路 API，接下來可以看看 Flutter 網路使用的實際應用情境。第一個 codelab（主要介紹如何在 Flutter 建立自適應應用程式），利用一個用 Dart 撰寫的網頁伺服器，來解決網頁瀏覽器的 [跨來源資源共用（CORS）限制][Cross-Origin Resource Sharing (CORS) restrictions]。

:::note
如果你已經在 [版面配置][layout] 頁面完成過這個 codelab，可以略過這個步驟。
:::

[layout]: /get-started/fundamentals/layout

接下來是一部長篇 YouTube 影片，由 Flutter DevRel 前成員 Fitz 分享資料位置對 Flutter 應用程式的重要性。最後，還有 Flutter GDE Anna (Domashych) Leushchenko 撰寫的一系列實用文章，涵蓋 Dart 與 Flutter 的進階網路技巧。

* Codelab：[Flutter 中的自適應應用程式][Adaptive apps in Flutter]
* 影片：[Keeping it local: 管理 Flutter 應用程式的資料][Keeping it local: Managing a Flutter app's data]
* 文章系列：[Dart 與 Flutter 的基礎與進階網路應用][Basic and advanced networking in Dart and Flutter]


[Adaptive apps in Flutter]: {{site.codelabs}}/codelabs/flutter-adaptive-app
[Asynchronous programming: futures, async, await]: {{site.dart-site}}/codelabs/async-await
[Basic and advanced networking in Dart and Flutter]: {{site.medium}}/tide-engineering-team/basic-and-advanced-networking-in-dart-and-flutter-the-tide-way-part-0-introduction-33ac040a4a1c
[Cross-Origin Resource Sharing (CORS) restrictions]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[Dive into Dart's patterns and records]: {{site.codelabs}}/codelabs/dart-patterns-records
[Fetch data from the internet]: /cookbook/networking/fetch-data
[Freezed (Package of the Week)]: {{site.youtube-site}}/watch?v=RaThk0fiphA
[`freezed` package]: {{site.pub-pkg}}/freezed
[FutureBuilder (Widget of the Week)]: {{site.youtube-site}}/watch?v=zEdw_1B7JHY
[`http`]: {{site.pub-pkg}}/http
[HTTP]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
[Keeping it local: Managing a Flutter app's data]: {{site.youtube-site}}/watch?v=uCbHxLA9t9E
[Make authenticated requests]: /cookbook/networking/authenticated-requests
[MDN's article on Authorization for websites]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
[Using the Network View]: /tools/devtools/network
[Send data to the internet]: /cookbook/networking/send-data

## 意見回饋

由於本網站區塊仍在持續發展中，  
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="networking"
