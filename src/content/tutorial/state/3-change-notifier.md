---
title: Flutter 的狀態管理
description: 說明如何使用 ChangeNotifier 進行狀態管理。
permalink: /tutorial/change-notifier/
---

當開發者討論 Flutter 的狀態管理（state-management）時，基本上指的是應用程式如何更新其所需的資料，以正確地呈現畫面，並在資料變更時通知 Flutter 重新渲染 UI。

在 MVVM 架構中，這個責任屬於 ViewModel 層，該層位於 UI 與 Model 層之間，並連接兩者。在 Flutter 中，ViewModel 會使用 Flutter 的 `ChangeNotifier` 類別，當資料變更時通知 UI。

要使用 [ChangeNotifier][ChangeNotifier]，只需在你的狀態管理類別中繼承它，即可取得 `notifyListeners()` 方法的存取權。當呼叫此方法時，會觸發 UI 重新建構。

## 建立基本的 ViewModel 結構

建立 `ArticleViewModel` 類別，並加入其基本結構與狀態屬性：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model);
}
```

ViewModel 包含三個狀態：

- `summary`：目前的 Wikipedia 條目資料。
- `errorMessage`：在資料擷取過程中發生的任何錯誤。
- `loading`：用於顯示進度指示器的旗標。

## 新增建構函式初始化

更新建構函式，讓 ViewModel 在建立時自動擷取內容：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  // Method will be added next
}
```

這個建構函式初始化在建立 ViewModel 時即提供即時內容。由於建構函式無法是非同步的，因此它會將初始內容的擷取委派給另一個方法來處理。

## 建立 getRandomArticleSummary 方法

新增一個用於擷取資料並管理狀態更新的方法：

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  Future<void> getRandomArticleSummary() async {
    loading = true;
    notifyListeners();
    
    // TODO: Add data fetching logic
    
    loading = false;
    notifyListeners();
  }
}
```
ViewModel 會更新 `loading` 屬性並呼叫 `notifyListeners()` 來通知 UI。  
當操作完成時，它會將該屬性切換回原本的狀態。  
當你建構 UI 時，你將會使用這個 `loading` 屬性，在抓取新文章時顯示載入指示器。

## 從 ArticleModel 取得文章

請完成 `getRandomArticleSummary` 方法來抓取文章摘要。  
請使用 [try-catch 區塊][try-catch block] 來優雅地處理網路錯誤，並儲存 UI 可以顯示給使用者的錯誤訊息。  
此方法在成功時會清除先前的錯誤，發生錯誤時則會清除先前的文章摘要，以維持狀態一致性。

```dart
class ArticleViewModel extends ChangeNotifier {
  final ArticleModel model;
  Summary? summary;
  String? errorMessage;
  bool loading = false;

  ArticleViewModel(this.model) {
    getRandomArticleSummary();
  }

  Future<void> getRandomArticleSummary() async {
    loading = true;
    notifyListeners();
    try {
      summary = await model.getRandomArticleSummary();
      errorMessage = null; // Clear any previous errors
    } on HttpException catch (error) {
      errorMessage = error.message;
      summary = null;
    }
    loading = false;
    notifyListeners();
  }
}
```

## 測試 ViewModel

在建立完整的 UI 之前，請先透過在主控台列印結果來測試你的 HTTP 請求是否正常運作。首先，請更新你的 `ArticleViewModel` 的 `getRandomArticleSummary` 方法，讓它能夠列印結果：

```dart
Future<void> getRandomArticleSummary() async {
  loading = true;
  notifyListeners();
  try {
    summary = await model.getRandomArticleSummary();
    print('Article loaded: ${summary!.titles.normalized}'); // Temporary 
    errorMessage = null;
  } on HttpException catch (error) {
    print('Error loading article: ${error.message}'); // Temporary 
    errorMessage = error.message;
    summary = null;
  }
  loading = false;
  notifyListeners();
}
```

然後，更新 `MainApp` 元件（Widget），以建立 ViewModel，並在建立時呼叫 `getRandomArticleSummary` 方法：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Create ViewModel to test HTTP requests
    final viewModel = ArticleViewModel(ArticleModel());
    
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Wikipedia Flutter'),
        ),
        body: const Center(
          child: Text('Check console for article data'),
        ),
      ),
    );
  }
}
```

熱重載（Hot reload）你的應用程式，並檢查主控台輸出。你應該會看到文章標題或錯誤訊息，這代表你的 Model 和 ViewModel 已正確連接。

[ChangeNotifier]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[try-catch block]: {{site.dart-site}}/language/error-handling