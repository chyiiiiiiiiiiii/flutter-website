---
title: 從網際網路擷取資料
description: 說明如何發出 HTTP 請求並解析回應的操作步驟。
layout: tutorial
---

學習 MVVM 架構模式，以及如何使用 async/await 建置 HTTP 請求。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Understand the MVVM architecture pattern
    icon: layers
  - title: Build HTTP requests with async/await
    icon: cloud_download
  - title: Handle errors and parse JSON responses
    icon: data_object
</SummaryCard>

---

### 簡介

本教學所實作的整體架構模式稱為 _Model-View-ViewModel_，簡稱 _MVVM_。
MVVM 是一種用於用戶端應用程式的[架構模式 (architectural pattern)][architectural pattern]，
它將你的應用程式分為三個層次：

- **Model**：負責資料操作。
- **View**：負責顯示使用者介面。
- **ViewModel**：負責管理狀態並連接前兩者。

MVVM（以及許多其他模式）的核心原則是*關注點分離 (separation of concerns)*。
在獨立的類別中管理狀態（在 UI 元件 (Widget) 之外），
可以讓你的程式碼更易於測試、重用，以及維護。

你應用程式中的每個功能都包含 MVVM 的三個組成部分。
在本教學中，除了 Flutter 的元件之外，
你還會建立 `ArticleModel`、`ArticleViewModel` 以及 `ArticleView`。

[architectural pattern]: /app-architecture/guide

### 定義 Model

Model 是應用程式資料的唯一真實來源，並負責低層次的任務，
例如發出 HTTP 請求、快取資料，或管理 Flutter 插件 (plugin) 所使用的系統資源。
Model 通常不需要匯入 Flutter 函式庫。

在你的 `main.dart` 檔案中建立一個空的 `ArticleModel` 類別：

<?code-excerpt "fwe/wikipedia_reader/lib/step2a_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  // Properties and methods will be added here.
}
```

### 建置 HTTP 請求

Wikipedia 提供了一個 REST API，可回傳有關文章的 JSON 資料。
在這個應用程式中，你將使用回傳隨機文章摘要的端點 (endpoint)。

```text
https://en.wikipedia.org/api/rest_v1/page/random/summary
```

新增一個方法來擷取隨機的 Wikipedia 文章摘要：

<?code-excerpt "fwe/wikipedia_reader/lib/step2b_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    // TODO: Add error handling and JSON parsing.
    throw UnimplementedError();
  }
}
```

使用 [`async` 與 `await`][`async` and `await`] 關鍵字來處理非同步 (asynchronous) 操作。
`async` 關鍵字將方法標記為非同步，
而 `await` 則等待回傳 [`Future`][] 的運算式完成。

`Uri.https` 建構式透過處理編碼和格式化，能安全地建置 URL。
這種方式比字串串接更可靠，
尤其是在處理特殊字元或查詢參數時。

[`async` and `await`]: {{site.dart-site}}/language/async
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html

### 處理網路錯誤

發出 HTTP 請求時，請務必處理錯誤。
狀態碼 **200** 表示成功，其他代碼則表示發生錯誤。
若狀態碼不是 **200**，Model 就會拋出錯誤，讓 UI 顯示給使用者。

<?code-excerpt "fwe/wikipedia_reader/lib/step2c_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw const HttpException('Failed to update resource');
    }

    // TODO: Parse JSON and return Summary.
    throw UnimplementedError();
  }
}
```

### 解析 Wikipedia 的 JSON 資料

[Wikipedia API][] 回傳 [JSON][] 資料，
你需要將其解碼為 `Summary` 類別。
完成 `getRandomArticleSummary` 方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step2_main.dart (ArticleModel)"?>
```dart
class ArticleModel {
  Future<Summary> getRandomArticleSummary() async {
    final uri = Uri.https(
      'en.wikipedia.org',
      '/api/rest_v1/page/random/summary',
    );
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw const HttpException('Failed to update resource');
    }

    return Summary.fromJson(jsonDecode(response.body) as Map<String, Object?>);
  }
}
```

`Summary` 類別定義在 `summary.dart` 中。
若你對 JSON 解析不熟悉，
請參閱 [Getting started with Dart][] 教學。

[Wikipedia API]: https://en.wikipedia.org/api/rest_v1/
[JSON]: {{site.dart-site}}/tutorial/json
[Getting started with Dart]: {{site.dart-site}}/tutorial

### 回顧

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Understood the MVVM architecture pattern
    icon: layers
    details: >-
      MVVM separates your app into Model (data operations),
      View (user interface), and ViewModel (state management).
      This separation of concerns makes your code more
      testable, reusable, and easier to maintain.
  - title: Built an HTTP request to fetch Wikipedia data
    icon: cloud_download
    details: >-
      You created an `ArticleModel` class with a method that
      uses `async` and `await` to fetch data from the Wikipedia API.
      To safely build the URLs for the requests,
      you used the `Uri.https` constructor which
      handles encoding and special characters for you.
  - title: Handled errors and parsed JSON responses
    icon: data_object
    details: >-
      You checked the HTTP status code to detect errors and
      used `jsonDecode` to parse the response body.
      Then to convert the raw JSON into a typed Dart object,
      you used the `Summary.fromJson` named constructor.
</SummaryCard>

### 自我測驗

<Quiz title="HTTP Requests Quiz">
- question: "What do the `async` and `await` keywords do in Dart?"
  options:
    - text: They make code run on a separate thread.
      correct: false
      explanation: Dart is single-threaded; async/await handles asynchronous operations without threads.
    - text: They mark a function as asynchronous and pause execution until a Future completes.
      correct: true
      explanation: "The `async` keyword marks a function as asynchronous, and `await` pauses execution until the Future resolves."
    - text: They automatically cache the results of function calls.
      correct: false
      explanation: Caching requires separate implementation; async/await is for handling asynchronous operations.
    - text: They convert synchronous code to run in the background.
      correct: false
      explanation: They don't move code to the background; they manage asynchronous execution flow.
- question: "Why is `Uri.https` preferred over string concatenation when building URLs in Dart?"
  options:
    - text: It makes the code shorter.
      correct: false
      explanation: Code length isn't the main benefit; proper encoding is.
    - text: It safely handles encoding and formatting, especially for special characters and query parameters.
      correct: true
      explanation: Uri.https properly encodes special characters and formats URLs, preventing common errors.
    - text: It's required by the http package.
      correct: false
      explanation: You can use strings, but Uri.https is safer and more reliable.
    - text: It automatically validates that the URL exists.
      correct: false
      explanation: Uri.https builds the URL; it doesn't check if the endpoint exists.
</Quiz>
