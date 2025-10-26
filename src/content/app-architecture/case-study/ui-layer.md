---
title: UI 層案例研究
shortTitle: UI 層
description: >-
  以一個實作 MVVM 架構的應用程式為例，逐步說明其 UI 層設計。
prev:
  title: 案例研究總覽
  path: /app-architecture/case-study
next:
  title: 資料層
  path: /app-architecture/case-study/data-layer
---

每個 Flutter 應用程式中各個功能的 [UI 層][UI layer]，應由兩個元件組成：**[`View`][`View`]** 和 **[`ViewModel`][`ViewModel`]**。

![Compass app 預約螢幕的截圖。](/assets/images/docs/app-architecture/case-study/mvvm-case-study-ui-layer-highlighted.png)

一般來說，view model 負責管理 UI 狀態，而 view 則負責顯示 UI 狀態。
view 和 view model 之間是一對一的關係；
每個 view 都有一個對應的 view model 來管理該 view 的狀態。
每一組 view 與 view model 構成單一功能的 UI。
例如，一個應用程式可能有名為 `LogOutView` 和 `LogOutViewModel` 的類別。

## 定義 view model

view model 是一個負責處理 UI 邏輯的 Dart 類別。
view model 以領域資料模型（domain data models）作為輸入，並將這些資料以 UI 狀態的形式暴露給其對應的 view。
它們封裝了 view 可以綁定到事件處理器（例如按鈕點擊）的邏輯，並負責將這些事件傳送到應用程式的資料層，進行資料變更。

以下程式碼片段為名為 `HomeViewModel` 的 view model 類別宣告。
其輸入為提供資料的 [repositories][repositories]。
在此情境下，
view model 依賴於 `BookingRepository` 和 `UserRepository` 作為參數。

```dart title=home_viewmodel.dart
class HomeViewModel {
  HomeViewModel({
    required BookingRepository bookingRepository,
    required UserRepository userRepository,
  }) :
    // Repositories are manually assigned because they're private members.
    _bookingRepository = bookingRepository,
    _userRepository = userRepository;

  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;
  // ...
}
```

View model（檢視模型）總是依賴於資料儲存庫（repository），而這些儲存庫會作為參數傳遞給 view model 的建構函式。view model 與 repository 之間是多對多的關係，大多數的 view model 會依賴多個 repository。

如同先前 `HomeViewModel` 範例宣告所示，repository 應該作為 view model 的私有成員，否則 view 就能直接存取應用程式的資料層。

### UI 狀態

view model 的輸出是 view 所需用來渲染的資料，通常稱為 **UI 狀態（UI State）**，或簡稱狀態（state）。UI 狀態是一個不可變的資料快照，包含完整渲染 view 所需的所有資料。

![A screenshot of the booking screen of the compass app.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-ui-state-highlighted.png)

view model 會將狀態作為公開成員對外暴露。在下方的程式碼範例中，view model 所暴露的資料是一個 `User` 物件，以及使用者儲存的行程，這部分則以 `List<BookingSummary>` 型別的物件對外提供。

```dart title=home_viewmodel.dart
class HomeViewModel {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository;
 
  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
 
  /// Items in an [UnmodifiableListView] can't be directly modified,
  /// but changes in the source list can be modified. Since _bookings
  /// is private and bookings is not, the view has no way to modify the
  /// list directly.
  UnmodifiableListView<BookingSummary> get bookings => UnmodifiableListView(_bookings);

  // ...
}
```

如前所述，UI 狀態應該是不可變的。  
這是打造無錯誤軟體的關鍵之一。

Compass 應用程式使用 [`package:freezed`][`package:freezed`] 來強制資料類別（data classes）不可變。舉例來說，以下程式碼展示了 `User` 類別的定義。`freezed` 提供了深層不可變性，並自動產生像是 `copyWith` 和 `toJson` 等實用方法的實作。

```dart title=user.dart
@freezed
class User with _$User {
  const factory User({
    /// The user's name.
    required String name,

    /// The user's picture URL.
    required String picture,
  }) = _User;

  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);
}
```

:::note
在 view model 的範例中，
需要兩個物件來渲染畫面（view）。
隨著任一模型的 UI 狀態變得越來越複雜，
一個 view model 可能會有更多來自
更多資料儲存庫（repositories）的資料片段暴露給畫面使用。
在某些情況下，
你可能會想要建立專門代表 UI 狀態的物件。
例如，你可以建立一個名為 `HomeUiState` 的類別。
:::

### 更新 UI 狀態

除了儲存狀態之外，
view model 也需要在資料層提供新狀態時，
通知 Flutter 重新渲染畫面。
在 Compass 應用程式中，view model 會繼承 [`ChangeNotifier`][`ChangeNotifier`] 來達成這個目的。

```dart title=home_viewmodel.dart
class HomeViewModel [!extends ChangeNotifier!] {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository;
  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
  List<BookingSummary> get bookings => _bookings;

  // ...
}
```

`HomeViewModel.user` 是一個公開成員，供 view（檢視）所依賴。
當有新資料從資料層流入，且需要發出新狀態時，會呼叫 [`notifyListeners`][`notifyListeners`]。

<figure>

![A screenshot of the booking screen of the compass app.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-update-ui-steps.png)

    <figcaption>
下圖從高層次說明了當 Repository 中有新資料時，
這些資料如何向上傳遞到 UI 層，並觸發 Flutter 元件（Widgets）的重新建構。

1. Repository 提供新的狀態給 view model。
2. view model 更新其 UI 狀態以反映新資料。
3. 呼叫 `ViewModel.notifyListeners`，通知 View 有新的 UI 狀態。
4. View（元件）重新渲染。

舉例來說，當使用者導覽到 Home 螢幕並建立 view model 時，會呼叫 `_load` 方法。
在此方法完成之前，UI 狀態是空的，畫面會顯示載入指示器。
當 `_load` 方法完成後，如果成功，view model 中就會有新資料，
此時必須通知 view 有新資料可用。

```dart title=home_viewmodel.dart highlightLines=19
class HomeViewModel extends ChangeNotifier {
  // ...

 Future<Result> _load() async {
    try {
      final userResult = await _userRepository.getUser();
      switch (userResult) {
        case Ok<User>():
          _user = userResult.value;
          _log.fine('Loaded user');
        case Error<User>():
          _log.warning('Failed to load user', userResult.error);
      }

      // ...

      return userResult;
    } finally {
      notifyListeners();
    }
  }
}
```

:::note
`ChangeNotifier` 和 [`ListenableBuilder`][`ListenableBuilder`] (discussed later on this page) 都是 Flutter SDK（Flutter 軟體開發套件）的一部分，能夠在狀態變更時，為 UI 更新提供良好的解決方案。你也可以選擇使用更強大的第三方狀態管理解決方案，例如 [package:riverpod][package:riverpod]、[package:flutter_bloc][package:flutter_bloc] 或 [package:signals][package:signals]。這些函式庫提供了不同的工具來處理 UI 更新。你可以在我們的 [state-management documentation][state-management documentation] 了解更多關於使用 `ChangeNotifier` 的資訊。
:::

## 定義一個 view

View 是應用程式中的一個元件（Widget）。通常，一個 view 代表應用程式中的一個螢幕，擁有自己的路由，並且會在元件子樹的頂部包含一個 [`Scaffold`][`Scaffold`]，例如 `HomeScreen`，但這並非絕對。

有時候，view 也可以是單一的 UI 元素，封裝了需要在整個應用程式中重複使用的功能。例如，Compass 應用程式有一個名為 `LogoutButton` 的 view，可以放在元件樹中的任何地方，讓使用者在期望看到登出按鈕的位置都能找到它。`LogoutButton` view 有自己的 view model，稱為 `LogoutViewModel`。而在較大的螢幕上，畫面上可能會同時出現多個 view，這些 view 在手機上會各自佔據整個螢幕。

:::note
「View」是一個抽象術語，一個 view 不等於一個元件（Widget）。元件是可組合的，可以將多個元件組合成一個 view。因此，view model 並非與單一元件一對一對應，而是與一組元件（*collection* of widgets）一對一對應。
:::

一個 view 中的元件（Widgets）有三個主要責任：

* 顯示來自 view model 的資料屬性。
* 監聽 view model 的更新，並在有新資料時重新渲染。
* 將 view model 的回呼函式（callback）綁定到事件處理器（event handler），如果適用的話。

![A diagram showing a view's relationship to a view model.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-View-highlighted.png)

以 Home 功能為例，以下程式碼展示了 `HomeScreen` view 的定義。

```dart title=home_screen.dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.viewModel});

  final HomeViewModel viewModel;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
    );
  }
}
```

大多數情況下，一個 view（檢視）的唯一輸入應該是 `key`，
這是所有 Flutter 元件（Widgets）都可選擇性接收的參數，
以及該 view 對應的 view model（檢視模型）。

### 在 view 中顯示 UI 資料

一個 view 會依賴 view model 來取得其狀態。在 Compass 應用程式中，
view model 會作為參數傳遞到 view 的建構子（constructor）中。
以下範例程式碼片段來自 `HomeScreen` 元件（Widget）。

```dart title=home_screen.dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, [!required this.viewModel!]});

  [!final HomeViewModel viewModel;!]

  @override
  Widget build(BuildContext context) {
    // ...
  }
}
```

在該元件（Widget）中，你可以透過`viewModel`存取傳遞進來的預訂資料（bookings）。
在下方程式碼中，
`booking`屬性被提供給子元件（sub-widget）。

```dart title=home_screen.dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      // Some code was removed for brevity.
      body: SafeArea(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return CustomScrollView(
              slivers: [
                SliverToBoxAdapter(...),
                SliverList.builder(
                   itemCount: [!viewModel.bookings.length!],
                    itemBuilder: (_, index) => _Booking(
                      key: ValueKey([!viewModel.bookings[index].id!]),
                      booking:viewModel.bookings[index],
                      onTap: () => context.push(Routes.bookingWithId(
                         viewModel.bookings[index].id)),
                      onDismissed: (_) => viewModel.deleteBooking.execute(
                           viewModel.bookings[index].id,
                         ),
                    ),
                ),
              ],
            );
          },
        ),
      ),
```

### 更新 UI

`HomeScreen` 元件會透過 [`ListenableBuilder`][`ListenableBuilder`] 元件（Widget）來監聽來自 view model 的更新。
在 `ListenableBuilder` 元件之下的元件子樹中，當所提供的 [`Listenable`][`Listenable`] 發生變化時，所有內容都會重新渲染。
在這個案例中，所提供的 `Listenable` 就是 view model。
請記得，view model 的型別是 [`ChangeNotifier`][`ChangeNotifier`]，而它是 `Listenable` 型別的子型別。

```dart title=home_screen.dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    // Some code was removed for brevity.
      body: SafeArea(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return CustomScrollView(
              slivers: [
                SliverToBoxAdapter(),
                SliverList.builder(
                  itemCount: viewModel.bookings.length,
                  itemBuilder: (_, index) =>
                      _Booking(
                        key: ValueKey(viewModel.bookings[index].id),
                        booking: viewModel.bookings[index],
                        onTap: () =>
                            context.push(Routes.bookingWithId(
                                viewModel.bookings[index].id)
                            ),
                        onDismissed: (_) =>
                            viewModel.deleteBooking.execute(
                              viewModel.bookings[index].id,
                            ),
                      ),
                ),
              ],
            );
          }
        )
      )
  );
}
```

### 處理使用者事件

最後，view（檢視）需要監聽來自使用者的*事件*，以便 view model（檢視模型）能夠處理這些事件。這通常是透過在 view model 類別上公開一個 callback（回呼）方法來實現，該方法封裝了所有相關邏輯。

![A diagram showing a view's relationship to a view model.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-UI-highlighted.png)

在`HomeScreen`中，使用者可以透過滑動 [`Dismissible`][`Dismissible`] 元件（Widget）來刪除先前預訂的事件。

請回想前面程式碼片段中的這段程式碼：

{% render docs/code-and-image.md,
image:"app-architecture/case-study/dismissible.webp",
img-style:"max-height: 480px; border-radius: 12px; border: black 2px solid;",
alt: "A clip that demonstrates the 'dismissible' functionality of the Compass app."
code:"
```dart title=home_screen.dart highlightLines=9-10
SliverList.builder(
  itemCount: widget.viewModel.bookings.length,
  itemBuilder: (_, index) => _Booking(
    key: ValueKey(viewModel.bookings[index].id),
    booking: viewModel.bookings[index],
    onTap: () => context.push(
      Routes.bookingWithId(viewModel.bookings[index].id)
    ),
    onDismissed: (_) =>
      viewModel.deleteBooking.execute(widget.viewModel.bookings[index].id),
  ),
),
```
" %}

在`HomeScreen`上，使用者儲存的行程會由`_Booking`元件（Widget）表示。當`_Booking`被關閉（dismissed）時，會執行`viewModel.deleteBooking`方法。

已儲存的預訂（booking）屬於應用程式狀態（application state），這種狀態會在一個工作階段（session）或檢視（view）生命週期之外持續存在，且只有 repository（儲存庫）應該修改這類應用程式狀態。因此，`HomeViewModel.deleteBooking`方法會進一步呼叫資料層中由 repository 所公開的方法，如下方程式碼片段所示。

```dart title=home_viewmodel.dart highlightLines=3
Future<Result<void>> _deleteBooking(int id) async {
  try {
    final resultDelete = await _bookingRepository.delete(id);
    switch (resultDelete) {
      case Ok<void>():
        _log.fine('Deleted booking $id');
      case Error<void>():
        _log.warning('Failed to delete booking $id', resultDelete.error);
        return resultDelete;
    }

    // Some code was omitted for brevity.
    // final  resultLoadBookings = ...;

    return resultLoadBookings;
  } finally {
    notifyListeners();
  }
}
```

在 Compass 應用程式中，
這些處理使用者事件的方法被稱為 **commands**（指令）。

### Command 物件

Command 物件負責從 UI 層開始並回流至資料層的互動。在這個應用程式中，
`Command` 也是一種協助安全更新 UI 的型別，
無論回應時間或內容為何都能確保安全。

`Command` 類別包裝了一個方法，
並協助處理該方法的不同狀態，
例如 `running`、`complete` 和 `error`。
這些狀態讓顯示不同的 UI 變得容易，
像是在 `Command.running` 為 true 時顯示載入指示器。

以下是 `Command` 類別的程式碼片段。
部分程式碼為了展示目的已被省略。

```dart title=command.dart
abstract class Command<T> extends ChangeNotifier {
  Command();
  bool running = false;
  Result<T>? _result;

  /// true if action completed with error
  bool get error => _result is Error;

  /// true if action completed successfully
  bool get completed => _result is Ok;

  /// Internal execute implementation
  Future<void> _execute(action) async {
    if (_running) return;

    // Emit running state - e.g. button shows loading state
    _running = true;
    _result = null;
    notifyListeners();

    try {
      _result = await action();
    } finally {
      _running = false;
      notifyListeners();
    }
  }
}
```

`Command` 類別本身是繼承自 `ChangeNotifier`，
並且在 `Command.execute` 方法中，
會多次呼叫 `notifyListeners`。
這讓 view（檢視）可以用非常少的邏輯來處理不同的狀態，
稍後你會在本頁看到相關範例。

你可能也注意到 `Command` 是一個抽象類別（abstract class）。
它會由具體實作的類別來實現，例如 `Command0` `Command1`。
類別名稱中的整數代表
底層方法所期望的參數數量。
你可以在 Compass 應用程式的 [`utils` 目錄][`utils` directory]
中看到這些實作類別的範例。

:::tip 套件建議
與其自行撰寫 `Command` 類別，
建議使用 [`flutter_command`][`flutter_command`] 套件，
這是一個健全的函式庫，已經實作了這類型的類別。
:::


### 確保 view 能在資料尚未存在時就能渲染

在 view model 類別中，指令（command）會在建構子（constructor）中建立。

```dart title=home_viewmodel.dart highlightLines=8-9,15-16,24-30
class HomeViewModel extends ChangeNotifier {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository {
    // Load required data when this screen is built.
    load = Command0(_load)..execute();
    deleteBooking = Command1(_deleteBooking);
  }

  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  late Command0 load;
  late Command1<void, int> deleteBooking;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
  List<BookingSummary> get bookings => _bookings;

  Future<Result> _load() async {
    // ...
  }

  Future<Result<void>> _deleteBooking(int id) async {
    // ...
  }

  // ...
}
```

`Command.execute` 方法是非同步的，因此無法保證當畫面（view）需要渲染時，資料已經可用。這正是 Compass 應用程式會使用 `Commands` 的原因所在。在 view 的 `Widget.build` 方法中，該指令會用來有條件地渲染不同的元件（Widgets）。

```dart title=home_screen.dart
// ...
child: ListenableBuilder(
  listenable: [!viewModel.load!],
  builder: (context, child) {
    if ([!viewModel.load.running!]) {
      return const Center(child: CircularProgressIndicator());
    }

    if ([!viewModel.load.error!]) {
      return ErrorIndicator(
        title: AppLocalization.of(context).errorWhileLoadingHome,
        label: AppLocalization.of(context).tryAgain,
          onPressed: viewModel.load.execute,
        );
     }

    // The command has completed without error.
    // Return the main view widget.
    return child!;
  },
),

// ...
```

由於 `load` 指令是一個存在於 view model 上的屬性，而不是暫時性的東西，
因此無論何時呼叫 `load` 方法或何時其被解決都沒有關係。
例如，如果 load 指令在 `HomeScreen` 元件（Widget）尚未建立之前就已經完成，
這也不是問題，因為 `Command` 物件仍然存在，
並且會暴露出正確的狀態。

這種模式標準化了解決應用程式中常見 UI 問題的方式，
讓你的程式碼庫更不容易出錯且更具擴展性，
但這並不是每個應用程式都會想要實作的模式。
是否要採用這種模式，很大程度上取決於
你做出的其他架構選擇。
許多協助你管理狀態的函式庫都有
自己的工具來解決這些問題。
舉例來說，如果你在應用程式中使用
[streams][streams] 和 [`StreamBuilders`][`StreamBuilders`]，
Flutter 提供的 [`AsyncSnapshot`][`AsyncSnapshot`] 類別就內建了這項功能。

:::note 真實案例
在開發 Compass 應用程式時，我們發現了一個透過 Command 模式解決的 bug。[在 GitHub 上閱讀相關內容][Read about it on GitHub]。
:::

[UI layer]: /app-architecture/guide#ui-layer
[`View`]: /app-architecture/guide#views
[`ViewModel`]: /app-architecture/guide#view-models
[repositories]: /app-architecture/guide#repositories
[commands]: /app-architecture/guide#command-objects
[`package:freezed`]: {{site.pub-pkg}}/freezed
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`notifyListeners`]: {{site.api}}/flutter/foundation/ChangeNotifier/notifyListeners.html
[state-management documentation]: /get-started/fundamentals/state-management
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html
[`utils` directory]: https://github.com/flutter/samples/blob/main/compass_app/app/lib/utils/command.dart
[`flutter_command`]: {{site.pub-pkg}}/flutter_command
[streams]: {{site.api}}/flutter/dart-async/Stream-class.html
[`StreamBuilders`]: {{site.api}}/flutter/widgets/StreamBuilder-class.html
[`AsyncSnapshot`]: {{site.api}}/flutter/widgets/AsyncSnapshot-class.html
[Read about it on GitHub]: https://github.com/flutter/samples/pull/2449#pullrequestreview-2328333146
[package:riverpod]: {{site.pub-pkg}}/riverpod
[package:flutter_bloc]: {{site.pub-pkg}}/flutter_bloc
[package:signals]: {{site.pub-pkg}}/signals

## 意見回饋

由於本網站的這個部分仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/ui-layer"
