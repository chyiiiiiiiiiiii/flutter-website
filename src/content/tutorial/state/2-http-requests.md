---
title: 從網路擷取資料
description: 說明如何發送 HTTP 請求並解析回應。
permalink: /tutorial/http-request/
---

本教學實作的核心模式稱為 *Model-View-ViewModel*（MVVM）。MVVM 是一種用於用戶端應用程式的[架構模式][architectural pattern]，將應用程式分為三個層次：Model 負責資料操作，View 負責顯示 UI，而 ViewModel 則管理狀態並連接兩者。MVVM（以及許多其他模式）的核心理念是*關注點分離*。將狀態管理放在獨立的類別（不在 UI 元件中）能讓你的程式碼更容易測試、重複利用，也更容易維護。

<img src="/assets/images/docs/tutorial/simple_mvvm.png" width="100%" 
alt="A diagram that shows the three layers of MVVM architecture: Model, ViewModel, and View.">

應用程式中的單一功能會包含每一個 MVVM 元件。在本教學中，你將會建立 `ArticleModel`、`ArticleViewModel` 和 `ArticleView`，以及 Flutter 元件（Widgets）。

## 定義 Model

Model 是應用程式資料的真實來源（source-of-truth），負責處理底層任務，例如發送 HTTP 請求、快取資料，或管理像外掛程式這類的系統資源。Model 通常不需要匯入 Flutter 函式庫。

請在你的 `main.dart` 檔案中建立一個空的 `ArticleModel` 類別：

```dart
class ArticleModel {
  // Properties and methods will be added here.
}
```

## 建立 HTTP 請求

Wikipedia 提供了一個 REST API，可回傳有關條目的 JSON 資料。  
在這個應用程式中，你將會使用一個可以回傳隨機條目摘要的端點。

```txt
https://en.wikipedia.org/api/rest_v1/page/random/summary
```

新增一個方法來擷取隨機 Wikipedia 條目的摘要： 

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);
    
    // TODO: Add error handling and JSON parsing.
  }
}
```

使用 [`async` 和 `await`][`async` and `await`] 關鍵字來處理非同步操作。
`async` 關鍵字會將方法標記為非同步，而 `await` 則標記會回傳 [`Future`][`Future`] 的運算式。

`Uri.https()` 建構函式能安全地建立 URL，處理編碼與格式化。
這種做法比字串串接更可靠，特別是在處理特殊字元或查詢參數時。

## 處理網路錯誤

在發送 HTTP 請求時，務必處理錯誤。狀態碼 200 代表成功，而其他狀態碼則表示錯誤。如果
狀態碼不是 200，模型會拋出錯誤，讓 UI 顯示給使用者。

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw HttpException('Failed to update resource');
    }

    // TODO: Parse JSON and return Summary.
  }
}
```

## 從 Wikipedia 解析 JSON

[Wikipedia API][Wikipedia API] 會回傳 [JSON][JSON] 資料，你需要將其解碼為 `Summary` 類別。請完成 `getRandomArticleSummary` 方法：

```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw HttpException('Failed to update resource');
    }

    return Summary.fromJson(jsonDecode(response.body));
  }
}
```

`dartpedia` 套件提供了 `Summary` 類別。如果你對 JSON 解析不熟悉，請參考 [Dart Getting Started tutorial][]。

[architectural pattern]: /architecture/guide
[JSON]: {{site.dart-site}}/tutorial/json
[`async` and `await`]: https://dart.dev/language/async
[`Future`]: https://api.dart.dev/stable/dart-async/Future-class.html
[Wikipedia API]: https://en.wikipedia.org/api/rest_v1/
[Dart Getting Started tutorial]: {{site.dart-site}}/tutorial/json