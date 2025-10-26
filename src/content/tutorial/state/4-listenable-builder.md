---
title: 狀態變更時重建 UI
description: 如何使用 ChangeNotifiers 管理狀態的說明。
permalink: /tutorial/listenables/
---

View layer 指的是你的 UI，在 Flutter 中，這就是你的應用程式元件（Widgets）。在本教學中，重點在於將 UI 與 ViewModel 的資料變更連接起來，讓 UI 能夠對資料變動做出回應。
[`ListenableBuilder`][`ListenableBuilder`] 是一個可以「監聽」`ChangeNotifier` 的元件，當它所提供的 `ChangeNotifier` 呼叫 `notifyListeners()` 時，會自動重新建構。

## 建立 ArticleView 元件

建立 `ArticleView` 元件，負責整個頁面的版面配置與狀態處理。請從基本的類別結構與元件開始：

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: const Center(
        child: Text('UI will update here'),
      ),
    );
  }
}
```

## 建立 ViewModel

在此元件（Widget）中建立 ViewModel。

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: const Center(
        child: Text('UI will update here'),
      ),
    );
  }
}
```

## 新增 ListenableBuilder

將你的 UI 包裹在 `ListenableBuilder` 中，以監聽狀態變化，並傳入一個 `ChangeNotifier` 物件。在這個例子中，`ArticleViewModel` 是繼承自 `ChangeNotifier` 的。

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
      ),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return const Center(child: Text('UI will update here'));
        },
      ),
    );
  }
}
```

`ListenableBuilder` 採用了 *builder*（建構器）模式，這種模式需要一個 callback（回呼函式），而不是 `child` 元件（Widget）來建構其下方的元件樹。這類元件（Widgets）非常靈活，因為你可以在 callback 內執行各種操作。

## 使用 switch 運算式處理所有狀態

回想一下 `ArticleViewModel`，它有三個 UI 會關注的屬性：
* `Summary? summary`
* `bool loading`
* `String? errorMessage`

UI 需要根據這三個屬性的狀態組合來顯示不同的元件（Widgets）。你可以使用 Dart 的 switch 運算式，以乾淨且易讀的方式處理所有可能的組合：

```dart
class ArticleView extends StatelessWidget {
  ArticleView({super.key});

  final ArticleViewModel viewModel = ArticleViewModel(ArticleModel());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wikipedia Flutter'),
        actions: [],
      ),
      body: ListenableBuilder(
        listenable: viewModel,
        builder: (context, child) {
          return switch ((
            viewModel.loading,
            viewModel.summary,
            viewModel.errorMessage,
          )) {
            (true, _, _) => CircularProgressIndicator(),
            (false, _, String message) => Center(child: Text(message)),
            (false, null, null) => Center(
              child: Text('An unknown error has occurred'),
            ),
            // summary must be non-null in this swich case
            (false, Summary _, null) => ArticlePage(
              summary: viewModel.summary!,
              onPressed: viewModel.getRandomArticleSummary,
            ),
          };
        },
      ),
    );
  }
}
```

這是一個極佳的範例，展示了像 Flutter 這樣的宣告式、反應式框架與 MVVM 模式如何協同運作：UI 會根據狀態進行渲染，並在狀態變更時自動更新，但 UI 本身不會管理任何狀態，也不會自行處理更新流程。商業邏輯與畫面渲染是完全分離的。

## 完成 UI

現在只剩下使用 ViewModel 所提供的屬性與方法。

接下來，建立`ArticlePage`元件（Widget），用來顯示實際的文章內容。這個可重複使用的元件會接收摘要資料與一個回呼函式（callback function）。

建立一個簡單的元件，並接受所需的參數：

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
    return Center(child: Text('Article content will be displayed here'));
  }
}
```

## 新增可捲動的版面配置

將占位符替換為可捲動的直向欄位（column）版面配置：

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
    return SingleChildScrollView(
      child: Column(
        children: [
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

## 新增文章內容與按鈕

使用文章元件（Widget）與導覽按鈕，完成整體版面配置：

```dart
class ArticlePage extends StatelessWidget {
  const ArticlePage({
    super.key,
    required this.summary,
    required this.onPressed,
  });

  final Summary summary;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Flexible(
            child: ArticleWidget(
              summary: summary,
            ),
          ),
          ElevatedButton(
            onPressed: nextArticleCallback,
            child: Text('Next random article'),
          ),
        ],
      ),
    );
  }
}
```

## 建立 ArticleWidget

`ArticleWidget` 負責以適當的樣式顯示實際的文章內容，並進行條件式渲染。

## 建立 ArticleWidget 的基本結構

首先建立一個接受 summary 參數的元件（Widget）：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Text('Article content will be displayed here');
  }
}
```

## 加入內距與欄位版面配置

將內容包裹在適當的內距與版面配置中：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

## 新增條件式圖片顯示

新增僅在有圖片時才顯示的文章圖片：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          if (summary.hasImage)
            Image.network(
              summary.originalImage!.source,
            ),
          Text('Article content will be displayed here'),
        ],
      ),
    );
  }
}
```

## 使用具備樣式的文字內容完成

將占位符替換為正確設計樣式的標題、描述，以及摘要內容：

```dart
class ArticleWidget extends StatelessWidget {
  const ArticleWidget({super.key, required this.summary});

  final Summary summary;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 10.0,
        children: [
          if (summary.hasImage)
            Image.network(
              summary.originalImage!.source,
            ),
          Text(
            summary.titles.normalized,
            overflow: TextOverflow.ellipsis,
            style: TextTheme.of(context).displaySmall,
          ),
          if (summary.description != null)
            Text(
              summary.description!,
              overflow: TextOverflow.ellipsis,
              style: TextTheme.of(context).bodySmall,
            ),
          Text(
            summary.extract,
          ),
        ],
      ),
    );
  }
}
```

這個元件（Widget）展示了以下幾個重要的 UI 概念：

- **條件渲染**：`if` 敘述僅在內容可用時顯示內容。
- **文字樣式**：不同的文字樣式運用 Flutter 的主題系統（theming）來建立視覺階層。
- **適當間距**：`spacing` 參數提供一致的垂直間距。
- **溢位處理**：`TextOverflow.ellipsis` 可防止文字破壞版面配置。

## 更新 MainApp 以使用 ArticleView

將所有內容串連起來，請更新你的 `MainApp`，改為使用完整的 `ArticleView`。

請將你現有的 `MainApp` 替換為以下這個更新版本：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ArticleView(),
    );
  }
}
```

這項變更將測試方式從以主控台為基礎，切換為完整的 UI 體驗，並具備正確的狀態管理。

## 執行完整應用程式

最後再進行一次熱重載（hot reload）。你現在應該會看到：

1. 在初始文章載入時顯示一個載入中的旋轉圖示（loading spinner）
2. 顯示包含標題、描述與完整內文的文章內容
3. 若文章有圖片則會顯示圖片
4. 一個按鈕，可載入另一篇隨機文章

點擊「下一篇隨機文章」按鈕，即可看到響應式 UI 的實際運作。應用程式會顯示載入狀態、擷取新資料，並自動更新畫面。

[`ListenableBuilder`]: https://api.flutter.dev/flutter/widgets/ListenableBuilder-class.html
[widget]: https://docs.flutter.dev/ui/widgets-intro
[`ListView`]: https://api.flutter.dev/flutter/widgets/ListView-class.html
[try-catch block]: https://dart.dev/language/error-handling
