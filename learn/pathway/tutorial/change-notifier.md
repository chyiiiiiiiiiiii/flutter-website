# Flutter 中的狀態管理

> 說明如何使用 ChangeNotifier 管理狀態的操作指南。



學習如何使用 ChangeNotifier 建立 ViewModel，並管理載入中、成功及錯誤等狀態。

<SummaryCard>
title: 你將完成的事項
items:
  - title: Create a ViewModel with ChangeNotifier
    icon: layers
  - title: Manage loading, success, and error states
    icon: toggle_on
  - title: Signal UI updates with notifyListeners
    icon: notifications_active
</SummaryCard>

---

### 簡介

當開發者談到 Flutter 中的狀態管理 (state management) 時，
本質上是在討論應用程式更新所需資料以正確渲染、
再通知 Flutter 使用新資料重新渲染 UI 的模式。

在 MVVM 架構中，這項職責由 ViewModel 層負責，
它位於 UI 與 Model 層之間並將兩者連接起來。
在 Flutter 中，ViewModel 使用 Flutter 的 `ChangeNotifier` 類別
在資料變更時通知 UI。

若要使用 [`ChangeNotifier`][]，請在狀態管理類別中繼承它，
以取得 `notifyListeners()` 方法的存取權，
呼叫該方法時會觸發 UI 重新建置。

[`ChangeNotifier`]: https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html

### 建立基本的 ViewModel 結構

建立 `ArticleViewModel` 類別及其基本結構與狀態屬性：

<?code-excerpt "fwe/wikipedia_reader/lib/step3a_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model);
}
```

`ArticleViewModel` 持有三個狀態：

- `summary`：目前的 Wikipedia 文章資料。
- `error`：資料擷取期間發生的任何錯誤。
- `isLoading`：用來顯示進度指示器的旗標。

### 新增建構式初始化

更新建構式，讓 `ArticleViewModel` 建立時自動擷取內容：

<?code-excerpt "fwe/wikipedia_reader/lib/step3b_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  // Methods will be added next.
  Future<void> fetchArticle() async {}
}
```

這個建構式初始化在 `ArticleViewModel` 物件建立時即可立即提供內容。
由於建構式無法為非同步，
因此它將初始內容的擷取委派給獨立的方法。

### 設定 `fetchArticle` 方法

新增 `fetchArticle` 方法，用來擷取資料並管理狀態更新：

<?code-excerpt "fwe/wikipedia_reader/lib/step3c_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  Future<void> fetchArticle() async {
    isLoading = true;
    notifyListeners();

    // TODO: Add data fetching logic

    isLoading = false;
    notifyListeners();
  }
}
```

ViewModel 更新 `isLoading` 屬性並呼叫 `notifyListeners()`
以通知 UI 此次更新。
操作完成後，會將該屬性切換回去。
當你建置 UI 時，將使用此 `isLoading` 屬性
在擷取新文章時顯示載入指示器。

### 從 `ArticleModel` 擷取文章

完善 `fetchArticle` 方法以擷取文章摘要。
使用 [try-catch 區塊][try-catch block] 優雅地處理網路錯誤，
並儲存 UI 可顯示給使用者的錯誤訊息。
該方法在成功時清除先前的錯誤，
在發生錯誤時清除先前的文章摘要，以維持一致的狀態。

<?code-excerpt "fwe/wikipedia_reader/lib/step3d_main.dart (ArticleViewModel)"?>
```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  Exception? error;
  bool isLoading = false;

  ArticleViewModel(this.model) {
    fetchArticle();
  }

  Future<void> fetchArticle() async {
    isLoading = true;
    notifyListeners();
    try {
      summary = await model.getRandomArticleSummary();
      error = null; // Clear any previous errors.
    } on HttpException catch (e) {
      error = e;
      summary = null;
    }
    isLoading = false;
    notifyListeners();
  }
}
```

[try-catch block]: https://dart.dev/language/error-handling#catch

### 測試 ViewModel

在建置完整 UI 之前，先透過將結果印到主控台來測試 HTTP 請求是否正常運作。
首先，更新 `fetchArticle` 方法以印出結果：

<?code-excerpt "fwe/wikipedia_reader/lib/step3e_main.dart (fetchArticle)"?>
```dart
Future<void> fetchArticle() async {
  isLoading = true;
  notifyListeners();
  try {
    summary = await model.getRandomArticleSummary();
    print('Article loaded: ${summary!.titles.normalized}'); // Temporary
    error = null; // Clear any previous errors.
  } on HttpException catch (e) {
    print('Error loading article: ${e.message}'); // Temporary
    error = e;
    summary = null;
  }
  isLoading = false;
  notifyListeners();
}
```

接著，更新 `MainApp` 元件 (Widget) 以建立 `ArticleViewModel`，
它會在建立時呼叫 `fetchArticle` 方法：

<?code-excerpt "fwe/wikipedia_reader/lib/step3f_main.dart (MainApp)"?>
```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Instantiate your `ArticleViewModel` to test its HTTP requests.
    final viewModel = ArticleViewModel(ArticleModel());

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Wikipedia Flutter')),
        body: const Center(child: Text('Check console for article data')),
      ),
    );
  }
}
```

熱重載應用程式並查看主控台輸出。
你應該會看到文章標題或錯誤訊息，
這確認了你的 Model 與 ViewModel 已正確連接。

### 回顧

<SummaryCard>
title: 你完成了什麼
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Created the ArticleViewModel with ChangeNotifier
    icon: layers
    details: >-
      The ViewModel sits between your UI and Model,
      managing state and connecting the two layers.
      By extending `ChangeNotifier`, your ViewModel gains the ability to
      notify listeners when data changes.
  - title: Managed loading, success, and error states
    icon: toggle_on
    details: >-
      Your ViewModel tracks three pieces of state:
      `isLoading`, `summary`, and `error`.
      Using `try` and `catch`, you handle network errors gracefully and
      maintain consistent state for each possible outcome.
  - title: Used notifyListeners to signal UI updates
    icon: notifications_active
    details: >-
      Calling `notifyListeners()` tells any listening widgets to rebuild.
      You call it after setting `loading = true` and again
      after the operation completes.
      This is how you can implement reactive UI updates in Flutter.
</SummaryCard>

### 測試自己

<Quiz title="狀態管理測驗">
- question: ChangeNotifier 是什麼？
  options:
    - text: 一個向使用者顯示通知的元件。
      correct: false
      explanation: ChangeNotifier 不是元件，它是用於管理狀態的類別。
    - text: 一個能在資料變更時通知監聽者、實現響應式 UI 更新的類別。
      correct: true
      explanation: ChangeNotifier 提供 notifyListeners 方法，用來在狀態變更時通知元件重新建置。
    - text: Dart 內建用於發送推播通知的類別。
      correct: false
      explanation: ChangeNotifier 用於應用程式內部的狀態管理，而非推播通知。
    - text: Flutter 中的一種動畫控制器類型。
      correct: false
      explanation: 動畫控制器是獨立的；ChangeNotifier 是用於狀態管理。
- question: "在 ChangeNotifier 中呼叫 `notifyListeners()` 會做什麼？"
  options:
    - text: 將目前狀態儲存至本機儲存空間。
      correct: false
      explanation: "`notifyListeners()` 發出 UI 更新訊號；持久化需要另行實作。"
    - text: 通知所有監聽的元件重新建置並反映新狀態。
      correct: true
      explanation: "呼叫 `notifyListeners()` 會觸發所有監聽此 ChangeNotifier 的元件重新建置。"
    - text: 將狀態變更記錄到主控台以便偵錯。
      correct: false
      explanation: 它不會記錄任何內容；它只是發出訊號通知監聽者重新建置。
    - text: 將所有狀態屬性重設為預設值。
      correct: false
      explanation: "`notifyListeners()` 不會修改狀態；它只是發出訊號表示狀態已變更。"
</Quiz>

