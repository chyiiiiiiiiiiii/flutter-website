---
title: 狀態管理
description: 學習如何在 Flutter 中管理狀態。
prev:
  title: 版面配置
  path: /get-started/fundamentals/layout
next:
  title: 處理使用者輸入
  path: /get-started/fundamentals/user-input
---

Flutter 應用程式的 _狀態_ 指的是它用來顯示 UI 或管理系統資源的所有物件。
狀態管理則是我們如何組織應用程式，
以最有效的方式存取這些物件，
並在不同元件（Widgets）之間共享它們的方法。

本頁將探討狀態管理的多個面向，包括：

* 使用 [`StatefulWidget`][`StatefulWidget`]
* 透過建構函式、[`InheritedWidget`][`InheritedWidget`] 以及回呼函式（callback）在元件之間共享狀態
* 使用 [`Listenable`][`Listenable`] 來在狀態變化時通知其他元件
* 為你的應用程式架構採用 Model-View-ViewModel（MVVM）

如果你想了解更多狀態管理的入門資源，請參考以下內容：

* 影片：[Managing state in Flutter][managing-state-video]。
  此影片展示如何使用 [riverpod][riverpod] 套件。

<i class="material-symbols" aria-hidden="true" translate="no">flutter_dash</i> 教學：
[State management][State management]。
這裡展示如何搭配 [provider][provider] 套件使用 `ChangeNotifer`。

本指南不使用如 provider 或 Riverpod 等第三方套件，
而是僅使用 Flutter 框架中提供的基本功能。

## 使用 StatefulWidget

管理狀態最簡單的方法是使用 `StatefulWidget`，
它會將狀態儲存在自身之中。
例如，請參考以下元件：

```dart
class MyCounter extends StatefulWidget {
  const MyCounter({super.key});

  @override
  State<MyCounter> createState() => _MyCounterState();
}

class _MyCounterState extends State<MyCounter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        TextButton(
          onPressed: () {
            setState(() {
              count++;
            });
          },
          child: Text('Increment'),
        )
      ],
    );
  }
}
```

這段程式碼說明了在思考狀態管理時的兩個重要概念：

* **封裝（Encapsulation）**
: 使用 `MyCounter` 的元件（Widget）無法存取底層的 `count` 變數，
  也沒有任何方式可以存取或更改它。
* **物件生命週期（Object lifecycle）**
: `_MyCounterState` 物件及其 `count` 變數會在 `MyCounter` 第一次被建立時產生，
  並且會一直存在直到它從螢幕上被移除。
  這就是 _短暫狀態（ephemeral state）_ 的範例。

你可能會覺得以下資源很有幫助：

* 文章：[Ephemeral state and app state][ephemeral-state]
* API 文件：[StatefulWidget][StatefulWidget]

## 在元件（Widgets）之間共享狀態

應用程式需要儲存狀態的情境包括：

* **更新** 共享狀態並通知應用程式的其他部分
* **監聽** 共享狀態的變化，並在狀態改變時重建 UI

本節將探討如何在應用程式中不同的元件（Widgets）之間有效地共享狀態。
最常見的模式有：

* **使用元件建構子（widget constructors）**
  （在其他框架中有時稱為「prop drilling」）
* **使用 `InheritedWidget`**（或類似的 API，例如 [provider][provider] 套件）。
* **使用回呼函式（callbacks）** 通知父元件有狀態變更

### 使用元件建構子（widget constructors）

由於 Dart 物件是以參考（reference）方式傳遞，
元件（Widgets）通常會在其建構子中定義所需使用的物件。
任何你傳遞到元件建構子的狀態，都可以用來建立其 UI：

```dart
class MyCounter extends StatelessWidget {
  final int count;
  const MyCounter({super.key, required this.count});

  @override
  Widget build(BuildContext context) {
    return Text('$count');
  }
}
```

這樣一來，其他使用你元件（Widget）的使用者就能清楚知道，他們需要提供哪些內容才能使用它：

```dart
Column(
  children: [
    MyCounter(
      count: count,
    ),
    MyCounter(
      count: count,
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        setState(() {
          count++;
        });
      },
    )
  ],
)
```

透過元件（widget）建構子傳遞應用程式中的共用資料，可以讓閱讀程式碼的人清楚知道有哪些共用的相依性。這是一種常見的設計模式，稱為 _依賴注入（dependency injection）_，許多框架都會利用這種模式，或提供工具來簡化實作。

### 使用 InheritedWidget

手動將資料一層層往下傳遞到元件樹中，可能會讓程式碼變得冗長，並產生不必要的樣板程式碼，因此 Flutter 提供了 _`InheritedWidget`_，它能有效地在父元件中託管資料，讓子元件可以存取這些資料，而不需要將資料存成欄位。

要使用 `InheritedWidget`，請繼承 `InheritedWidget` 類別，並實作靜態方法 `dependOnInheritedWidgetOfExactType`，使用 `of()`。  
在 build 方法中呼叫 `of()` 的元件，會建立一個由 Flutter 框架管理的相依關係，因此，所有依賴此 `InheritedWidget` 的元件，當該元件以新資料重新建構且 `updateShouldNotify` 回傳 true 時，這些元件也會重新建構。

```dart
class MyState extends InheritedWidget {
  const MyState({
    super.key,
    required this.data,
    required super.child,
  });

  final String data;

  static MyState of(BuildContext context) {
    // This method looks for the nearest `MyState` widget ancestor.
    final result = context.dependOnInheritedWidgetOfExactType<MyState>();

    assert(result != null, 'No MyState found in context');

    return result!;
  }

  @override
  // This method should return true if the old widget's data is different
  // from this widget's data. If true, any widgets that depend on this widget
  // by calling `of()` will be re-built.
  bool updateShouldNotify(MyState oldWidget) => data != oldWidget.data;
}
```

接下來，請在需要存取共享狀態的元件（Widget）的`build()`方法中，呼叫`of()`方法：

```dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var data = MyState.of(context).data;
    return Scaffold(
      body: Center(
        child: Text(data),
      ),
    );
  }
}
```


### 使用回呼函式（callbacks）

你可以透過公開一個回呼函式（callback），在數值變更時通知其他元件（Widgets）。
Flutter 提供了 `ValueChanged` 類型，
這個類型宣告了一個帶有單一參數的函式回呼：

```dart
typedef ValueChanged<T> = void Function(T value);
```

透過在元件（Widget）的建構函式中公開 `onChanged`，  
你就為任何使用此元件的其他元件，  
提供了一種方式，能夠在你的元件呼叫 `onChanged` 時做出回應。

```dart
class MyCounter extends StatefulWidget {
  const MyCounter({super.key, required this.onChanged});

  final ValueChanged<int> onChanged;

  @override
  State<MyCounter> createState() => _MyCounterState();
}
```

例如，這個元件（Widget）可能會處理 `onPressed` 回呼（callback），並以其最新的內部狀態呼叫 `onChanged`，將 `count` 變數的值傳遞出去：

```dart
TextButton(
  onPressed: () {
    widget.onChanged(count++);
  },
),
```

### 更深入了解

若想進一步瞭解如何在元件（Widgets）之間共享狀態，請參考以下資源：

* 文章：[Flutter Architectural Overview—State management][architecture-state]
* 影片：[Pragmatic state management][Pragmatic state management]
* 影片：[InheritedWidgets][inherited-widget-video]
* 影片：[A guide to Inherited Widgets][A guide to Inherited Widgets]
* 範例：[Provider shopper][Provider shopper]
* 範例：[Provider counter][Provider counter]
* API 文件：[`InheritedWidget`][`InheritedWidget`]

## 使用 listenables

現在你已經選擇了在應用程式中如何共享狀態，那麼當狀態改變時，該如何更新 UI 呢？又該如何以能夠通知應用程式其他部分的方式來變更共享狀態？

Flutter 提供了一個名為 `Listenable` 的抽象類別，可以用來更新一個或多個監聽者（listeners）。一些常見的 listenables 使用方式如下：

* 使用 `ChangeNotifier`，並透過 `ListenableBuilder` 來訂閱它
* 搭配 `ValueNotifier` 與 `ValueListenableBuilder` 使用

### ChangeNotifier

若要使用 `ChangeNotifier`，請建立一個繼承自它的類別，並在需要通知監聽者時呼叫 `notifyListeners`。

```dart
class CounterNotifier extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
```

然後將其傳遞給 `ListenableBuilder`，
以確保每當 `ChangeNotifier` 更新其監聽器時，
由 `builder` 函式所回傳的子樹會被重新建構。

```dart
Column(
  children: [
    ListenableBuilder(
      listenable: counterNotifier,
      builder: (context, child) {
        return Text('counter: ${counterNotifier.count}');
      },
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        counterNotifier.increment();
      },
    ),
  ],
)
```

### ValueNotifier

[`ValueNotifier`][`ValueNotifier`] 是 `ChangeNotifier` 的簡化版本，
它只儲存單一數值。
它實作了 `ValueListenable` 和 `Listenable` 介面，
因此可以與像是 `ListenableBuilder` 和 `ValueListenableBuilder` 這類元件（Widget）相容。
要使用時，只需以初始值建立一個 `ValueNotifier` 實例：

```dart
ValueNotifier<int> counterNotifier = ValueNotifier(0);
```

然後，使用 `value` 欄位來讀取或更新數值，並通知所有監聽者該數值已變更。
由於 `ValueNotifier` 繼承自 `ChangeNotifier`，
它同時也是一個 `Listenable`，因此可以搭配 `ListenableBuilder` 使用。
不過，你也可以使用 `ValueListenableBuilder`，
它會在 `builder` 回呼（callback）中提供該數值：

```dart
Column(
  children: [
    ValueListenableBuilder(
      valueListenable: counterNotifier,
      builder: (context, value, child) {
        return Text('counter: $value');
      },
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        counterNotifier.value++;
      },
    ),
  ],
)
```

### 深入探討

若想進一步了解 `Listenable` 物件，請參考以下資源：

* API 文件: [`Listenable`][`Listenable`]
* API 文件: [`ValueNotifier`][`ValueNotifier`]
* API 文件: [`ValueListenable`][`ValueListenable`]
* API 文件: [`ChangeNotifier`][`ChangeNotifier`]
* API 文件: [`ListenableBuilder`][`ListenableBuilder`]
* API 文件: [`ValueListenableBuilder`][`ValueListenableBuilder`]
* API 文件: [`InheritedNotifier`][`InheritedNotifier`]

## 為應用程式架構導入 MVVM

現在我們已經了解如何共享狀態，
以及當狀態變化時如何通知應用程式的其他部分，
接下來可以開始思考如何組織應用中的有狀態物件。

本節將說明如何實作一種非常適合與 Flutter 等反應式框架搭配使用的設計模式，
稱為 _Model-View-ViewModel_（MVVM，模型-檢視-檢視模型）。

### 定義 Model

Model（模型）通常是一個 Dart 類別，負責執行底層任務，
例如發送 HTTP 請求、
快取資料，或管理像外掛程式這類的系統資源。
Model 通常不需要匯入 Flutter 函式庫。

舉例來說，以下是一個利用 HTTP 用戶端載入或更新計數器狀態的 Model：

```dart
import 'package:http/http.dart';

class CounterData {
  CounterData(this.count);

  final int count;
}

class CounterModel {
  Future<CounterData> loadCountFromServer() async {
    final uri = Uri.parse('https://myfluttercounterapp.net/count');
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw ('Failed to update resource');
    }

    return CounterData(int.parse(response.body));
  }

  Future<CounterData> updateCountOnServer(int newCount) async {
    // ...
  }
}
```

這個模型不使用任何 Flutter 原生功能（primitives），也不對其運行的平台做任何假設；  
它唯一的工作就是透過其 HTTP client 來取得或更新計數值。  
這樣的設計讓模型在單元測試中可以用 Mock 或 Fake 來實作，  
並且明確劃分了應用程式中低階元件與建構完整應用所需的高階 UI 元件之間的界線。

`CounterData` 類別定義了資料的結構，是我們應用程式真正的「模型」（Model）。  
模型層通常負責應用程式所需的核心演算法與資料結構。  
如果你對其他定義模型的方式有興趣，例如使用不可變值類型（immutable value types），  
可以參考 pub.dev 上的 [freezed][freezed] 或 [build_collection][build_collection] 套件。

### 定義 ViewModel

`ViewModel` 負責將 _View_ 與 _Model_ 綁定。  
它保護模型不被 View 直接存取，並確保資料流是從模型的變更開始。  
資料流由 `ViewModel` 處理，該類別使用 `notifyListeners` 來通知 View 有資料變動。  
`ViewModel` 就像餐廳的服務生，負責廚房（model）與顧客（views）之間的溝通。

```dart
import 'package:flutter/foundation.dart';

class CounterViewModel extends ChangeNotifier {
  final CounterModel model;
  int? count;
  String? errorMessage;
  CounterViewModel(this.model);

  Future<void> init() async {
    try {
      count = (await model.loadCountFromServer()).count;
    } catch (e) {
      errorMessage = 'Could not initialize counter';
    }
    notifyListeners();
  }

  Future<void> increment() async {
    final currentCount = count;
    if (currentCount == null) {
      throw('Not initialized');
    }
    try {
      final incrementedCount = currentCount + 1;
      await model.updateCountOnServer(incrementedCount);
      count = incrementedCount;
    } catch(e) {
      errorMessage = 'Could not update count';
    }
    notifyListeners();
  }
}
```

請注意，當 `ViewModel` 從 Model 收到錯誤時，會儲存一個 `errorMessage`。  
這樣可以保護 View 不會遇到未處理的執行階段錯誤，這些錯誤可能導致應用程式當機。  
相反地，`errorMessage` 欄位可以讓 View 用來顯示一個對使用者友善的錯誤訊息。

---

### 定義 View

由於我們的 `ViewModel` 是一個 `ChangeNotifier`，  
任何持有其參考的元件（widget）都可以使用 `ListenableBuilder` 來重建其 widget tree，  
當 `ViewModel` 通知其監聽者時：

```dart
ListenableBuilder(
  listenable: viewModel,
  builder: (context, child) {
    return Column(
      children: [
        if (viewModel.errorMessage != null)
          Text(
            'Error: ${viewModel.errorMessage}',
            style: Theme.of(context)
                .textTheme
                .labelSmall
                ?.apply(color: Colors.red),
          ),
        Text('Count: ${viewModel.count}'),
        TextButton(
          onPressed: () {
            viewModel.increment();
          },
          child: Text('Increment'),
        ),
      ],
    );
  },
)
```

這種模式允許您的應用程式商業邏輯
與 UI 邏輯以及 Model 層執行的底層操作分離。

## 進一步了解狀態管理

本頁僅簡要介紹狀態管理，
實際上有許多方式可以組織與管理
您的 Flutter 應用程式的狀態。
如果您想進一步學習，請參考以下資源：

* 文章：[List of state management approaches][List of state management approaches]
* 程式碼庫：[Flutter Architecture Samples][Flutter Architecture Samples]

[A guide to Inherited Widgets]: {{site.youtube-site}}/watch?v=Zbm3hjPjQMk
[build_collection]: {{site.pub-pkg}}/built_collection
[Flutter Architecture Samples]: https://fluttersamples.com/
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[List of state management approaches]: /data-and-backend/state-mgmt/options
[Pragmatic state management]: {{site.youtube-site}}/watch?v=d_m5csmrf7I
[Provider counter]: https://github.com/flutter/samples/tree/main/provider_counter
[Provider shopper]: https://github.com/flutter/samples/tree/main/provider_shopper
[State management]: /data-and-backend/state-mgmt/intro
[StatefulWidget]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`InheritedNotifier`]: {{site.api}}/flutter/widgets/InheritedNotifier-class.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ValueListenableBuilder`]: {{site.api}}/flutter/widgets/ValueListenableBuilder-class.html
[`ValueListenable`]: {{site.api}}/flutter/foundation/ValueListenable-class.html
[`ValueNotifier`]: {{site.api}}/flutter/foundation/ValueNotifier-class.html
[architecture-state]: /resources/architectural-overview#state-management
[ephemeral-state]: /data-and-backend/state-mgmt/ephemeral-vs-app
[freezed]: {{site.pub-pkg}}/freezed
[inherited-widget-video]: {{site.youtube-site}}/watch?v=og-vJqLzg2c
[managing-state-video]: {{site.youtube-site}}/watch?v=vU9xDLdEZtU
[provider]: {{site.pub-pkg}}/provider
[riverpod]: {{site.pub-pkg}}/riverpod

## 意見回饋

由於本網站區塊仍在持續發展中，
我們[歡迎您的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="state-management"
