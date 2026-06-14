# 當狀態變更時重建 UI

> 說明如何使用 ChangeNotifier 管理狀態的指南。



<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

學習使用 ListenableBuilder 自動重建 UI，並以 switch 運算式處理所有可能的狀態。

<SummaryCard>
title: 你將完成的事項
items:
  - title: 使用 ListenableBuilder 自動重建 UI
    icon: sync
  - title: 以 switch 運算式處理所有可能的狀態
    icon: alt_route
  - title: 建置具備適當樣式的完整 View 層
    icon: article
</SummaryCard>

---

### 介紹

View 層是你的 UI，在 Flutter 中，這指的是應用程式的元件 (Widget)。
就本教學而言，重要的部分在於將 UI 與 ViewModel 的資料變更連結起來，使其能夠回應。
[`ListenableBuilder`][] 是一個能夠「監聽」[`ChangeNotifier`][] 的元件，當所提供的 `ChangeNotifier` 呼叫 `notifyListeners()` 時，它會自動重建。

[`ListenableBuilder`]: https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html
[`ChangeNotifier`]: https://api.flutter.dev/flutter/foundation/ChangeNotifier-class.html

### 建立文章 View 元件

建立 `ArticleView` 元件，用來管理頁面的版面配置和 ViewModel 的生命週期。
由於它必須在渲染之前明確初始化資料擷取，因此將其實作為 `StatefulWidget`。

從建立基本的有狀態結構開始：

<?code-excerpt "fwe/wikipedia_reader/lib/step4a_main.dart"?>
```dart
import 'package:flutter/material.dart';

class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  // The view model will be instantiated here next.

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: const Center(child: Text('Loading...')),
    );
  }
}
```

### 實例化文章 View Model

接著，初始化 `ArticleViewModel` 並將其對應到狀態的生命週期。
在 `initState()` 中提供 ViewModel 並執行 `fetchArticle()`：

<?code-excerpt "fwe/wikipedia_reader/lib/step4b_main.dart (view-model)"?>
```dart highlightLines=2-8
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: const Center(child: Text('Loading...')),
    );
  }
}
```

### 更新應用程式以加入文章 View

透過更新 `MainApp` 以加入已完成的 `ArticleView`，將所有部分串聯在一起。

用以下更新後的版本取代現有的 `MainApp`：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (main-app)"?>
```dart highlightLines=6
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: ArticleView());
  }
}
```

這個變更將從基於主控台的測試切換到具備適當狀態管理的完整 UI 體驗。

### 監聽狀態變更

將 UI 包覆在 [`ListenableBuilder`][] 中以監聽狀態變更，並傳入一個 `ChangeNotifier` 物件。
在此範例中，`ArticleViewModel` 繼承了 `ChangeNotifier`。

<?code-excerpt "fwe/wikipedia_reader/lib/step4c_main.dart (view-model)"?>
```dart highlightLines=21-26
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return const Center(child: Text('Loading...'));
        },
      ),
    );
  }
}
```

`ListenableBuilder` 使用*建構器 (builder)* 模式，
這個模式需要一個回呼（callback）而非 `child` 元件來建置其下方的元件樹。
這些元件非常靈活，因為你可以在回呼（callback）中執行操作，
根據狀態建置不同的元件。

[`ListenableBuilder`]: https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html

### 處理 View Model 的可能狀態

回想 `ArticleViewModel`，它有三個 UI 會關注的屬性：

- `Summary? summary`
- `bool isLoading`
- `Exception? error`

根據這些屬性的組合狀態，UI 可以顯示不同的元件。
使用 Dart 對 [switch 運算式][switch expressions]的支援，
以簡潔、易讀的方式處理所有可能的組合：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (view-model)"?>
```dart
class ArticleView extends StatefulWidget {
  const ArticleView({super.key});

  @override
  State<ArticleView> createState() => _ArticleViewState();
}

class _ArticleViewState extends State<ArticleView> {
  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  void initState() {
    super.initState();
    viewModel.fetchArticle();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wikipedia Flutter')),
      body: Center(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return switch ((
              viewModel.isLoading,
              viewModel.summary,
              viewModel.error,
            )) {
              (true, _, _) => const CircularProgressIndicator(),
              (_, _, final Exception e) => Text('Error: $e'),
              (_, final summary?, _) => ArticlePage(
                summary: summary,
                nextArticleCallback: viewModel.fetchArticle,
              ),
              _ => const Text('Something went wrong!'),
            };
          },
        ),
      ),
    );
  }
}
```

這是一個很好的範例，說明像 Flutter 這樣的宣告式、響應式框架
和像 MVVM 這樣的模式如何相互配合：
UI 根據狀態渲染，並在狀態需要時自動更新，
但 UI 本身不管理任何狀態或更新自身的過程。
商業邏輯與渲染完全分離。

[switch expressions]: https://dart.dev/language/branches#switch-expressions

### 完成 UI

剩下的唯一工作是使用 View Model 提供的屬性和方法來建置 UI。

現在建立一個 `ArticlePage` 元件，用於顯示實際的文章內容。
這個可重複使用的元件接受摘要資料和一個回呼（callback）函式：

<?code-excerpt "fwe/wikipedia_reader/lib/step4d_main.dart (page)"?>
```dart
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Article content will be displayed here...'),
    );
  }
}
```

### 加入可捲動的版面配置

用可捲動的直欄版面配置取代佔位符：

<?code-excerpt "fwe/wikipedia_reader/lib/step4e_main.dart (page)"?>
```dart highlightLines=13-16
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      child: Column(
        children: [Text('Article content will be displayed here...')],
      ),
    );
  }
}
```

### 加入文章內容與按鈕

以文章元件和導覽按鈕完成版面配置：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (page)"?>
```dart highlightLines=16-20
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.nextArticleCallback,
  });

  final Summary summary;
  final VoidCallback nextArticleCallback;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          ArticleWidget(summary: summary),
          ElevatedButton(
            onPressed: nextArticleCallback,
            child: const Text('Next random article'),
          ),
        ],
      ),
    );
  }
}
```

### 建立 `ArticleWidget`

`ArticleWidget` 負責以適當的樣式和條件式渲染來顯示實際的文章內容。

#### 設定基本文章結構

從接受 `summary` 參數的元件開始：

<?code-excerpt "fwe/wikipedia_reader/lib/step4f_main.dart (article)"?>
```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return const Text('Article content will be displayed here...');
  }
}
```

#### 加入內距（padding）和直欄版面配置

將內容包覆在適當的內距（padding）和版面配置中：

<?code-excerpt "fwe/wikipedia_reader/lib/step4g_main.dart (article)"?>
```dart highlightLines=8-14
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [const Text('Article content will be displayed here...')],
      ),
    );
  }
}
```

#### 加入條件式圖片顯示

加入只在有圖片時才顯示的文章圖片：

<?code-excerpt "fwe/wikipedia_reader/lib/step4h_main.dart (article)"?>
```dart highlightLines=13
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [
          if (summary.hasImage) Image.network(summary.originalImage!.source),
          const Text('Article content will be displayed here...'),
        ],
      ),
    );
  }
}
```

#### 以樣式化文字內容完成

以具備適當樣式的標題、描述和摘錄取代佔位符文字：

<?code-excerpt "fwe/wikipedia_reader/lib/step4_main.dart (article)"?>
```dart highlightLines=14-25
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Column(
        spacing: 10,
        children: [
          if (summary.hasImage) Image.network(summary.originalImage!.source),
          Text(
            summary.titles.normalized,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.displaySmall,
          ),
          if (summary.description != null)
            Text(
              summary.description!,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          Text(summary.extract),
        ],
      ),
    );
  }
}
```

這個元件展示了幾個重要的 UI 概念：

- **條件式渲染**：
  `if` 陳述式只在內容可用時才顯示。
- **文字樣式**：
  不同的文字樣式利用 Flutter 的主題系統建立視覺層次。
- **適當的間距**：
  `spacing` 參數提供一致的垂直間距。
- **溢位處理**：
  `TextOverflow.ellipsis` 防止文字破壞版面配置。

### 執行完整的應用程式

最後一次熱重載應用程式。你現在應該會看到：

1.  初始文章載入時的讀取轉圈動畫。
1.  文章的標題、描述和摘要摘錄。
1.  圖片（如果文章有的話）。
1.  載入另一篇隨機文章的按鈕。

要查看響應式 UI 的實際運作，
請點擊 **Next random article** 按鈕。
應用程式會顯示載入狀態，擷取新資料，並自動更新畫面。

### 回顧

<SummaryCard>
title: 你完成了什麼
subtitle: 以下是你在本課程中建置和學習內容的摘要。
completed: true
items:
  - title: 使用 ListenableBuilder 自動重建 UI
    icon: sync
    details: >-
      `ListenableBuilder` 監聽你的 ViewModel，並在每次呼叫 `notifyListeners()` 時自動重建其子元件。
      在 MVVM 模式中，這是 ViewModel 與 View 之間的關鍵連結。
  - title: 以 switch 運算式處理所有可能的狀態
    icon: alt_route
    details: >-
      使用 switch 運算式，你為所有可能的狀態組合提供了適當的使用者介面，
      條件式地顯示載入轉圈動畫、錯誤訊息，
      或實際的文章內容。
      有了這樣的處理，UI 現在更加健全且完整。
  - title: 建置具備適當樣式的完整 View 層
    icon: article
    details: >-
      你建立了具備條件式渲染、文字樣式、
      適當間距和溢位處理的 `ArticleView`、`ArticlePage` 和
      `ArticleWidget`。
      這些是你在每個 Flutter 應用程式中都會用到的核心 UI 模式。
  - title: 完成 MVVM 架構
    icon: celebration
    details: >-
      你已建置了一個具備 Model（資料操作）、
      ViewModel（狀態管理）和 View（響應式 UI）層的完整應用程式。
      這種關注點分離有助於讓你的程式碼更易於測試、維護和擴展。
</SummaryCard>

### 自我測試

<Quiz title="ListenableBuilder 測驗">
- question: ListenableBuilder 在 Flutter 中的用途是什麼？
  options:
    - text: 根據 ChangeNotifier 建立動畫。
      correct: false
      explanation: ListenableBuilder 是在狀態變更時重建 UI，而非專門用於動畫。
    - text: "監聽 ChangeNotifier，並在 `notifyListeners()` 被呼叫時自動重建其子元件。"
      correct: true
      explanation: ListenableBuilder 監聽一個 Listenable，並在收到通知時重建其 builder 函式。
    - text: 手動控制元件何時應該重建。
      correct: false
      explanation: 當 notifyListeners() 被呼叫時，重建會自動發生；你無法手動控制它。
    - text: 快取元件建置以提升效能。
      correct: false
      explanation: ListenableBuilder 是關於響應式更新，而非快取。
- question: ListenableBuilder 何時會重建其子元件？
  options:
    - text: 每次應用程式的畫面更新時。
      correct: false
      explanation: ListenableBuilder 只在收到通知時重建，而非每一幀都重建。
    - text: 當它所監聽的 Listenable 呼叫 notifyListeners() 時。
      correct: true
      explanation: "ListenableBuilder 訂閱 Listenable，並在每次呼叫 `notifyListeners()` 時重建其 builder 函式。"
    - text: 只在元件首次掛載時。
      correct: false
      explanation: "它在每次 `notifyListeners()` 被呼叫時都會重建，不只是在掛載時。"
    - text: 當父元件重建時。
      correct: false
      explanation: "ListenableBuilder 根據 Listenable 重建，而非根據父元件的重建。"
</Quiz>

