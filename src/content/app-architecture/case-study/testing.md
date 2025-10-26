---
title: 測試每一層
shortTitle: 測試
description: >-
  如何測試實作 MVVM 架構的應用程式。
prev:
  title: 依賴注入
  path: /app-architecture/case-study/dependency-injection
---

## 測試 UI 層

判斷你的架構是否健全的一種方式，是考慮應用程式是否容易測試。
由於 view model 與 view（檢視）有明確定義的輸入，
它們的依賴可以輕鬆地被 mock（模擬）或 fake（偽造），
因此很容易撰寫單元測試。

### ViewModel 單元測試

為了測試 view model 的 UI 邏輯，你應該撰寫不依賴 Flutter 函式庫或測試框架的單元測試。

Repository 是 view model 唯一的依賴
（除非你有實作 [use-cases][use-cases]），
而對 repository 進行 `mocks` 或 `fakes`
就是你所需的唯一測試前置作業。
在這個範例測試中，使用了一個名為 `FakeBookingRepository` 的 fake（偽造物件）。

```dart title=home_screen_test.dart
void main() {
  group('HomeViewModel tests', () {
    test('Load bookings', () {
      // HomeViewModel._load is called in the constructor of HomeViewModel.
      final viewModel = HomeViewModel(
        bookingRepository: FakeBookingRepository()
          ..createBooking(kBooking),
        userRepository: FakeUserRepository(),
      );

      expect(viewModel.bookings.isNotEmpty, true);
    });
  });
}
```

[`FakeBookingRepository`][`FakeBookingRepository`] 類別實作了 [`BookingRepository`][`BookingRepository`]。
在本案例研究的 [data layer section][data layer section] 中，
對 `BookingRepository` 類別有詳細的說明。

```dart title=fake_booking_repository.dart
class FakeBookingRepository implements BookingRepository {
  List<Booking> bookings = List.empty(growable: true);

  @override
  Future<Result<void>> createBooking(Booking booking) async {
    bookings.add(booking);
    return Result.ok(null);
  }
  // ...
}
```

:::note
如果你在這個架構中使用了 [use-cases][use-cases]，同樣也需要對這些 use-cases 進行假資料（fake）處理。
:::

### View 元件（Widget）測試

當你已經為 view model 撰寫了測試後，
你也已經建立了撰寫元件（Widget）測試所需的假資料（fakes）。
以下範例展示了如何使用 `HomeViewModel` 以及所需的 repositories 來設定 `HomeScreen` 元件（Widget）測試：

```dart title=home_screen_test.dart
void main() {
  group('HomeScreen tests', () {
    late HomeViewModel viewModel;
    late MockGoRouter goRouter;
    late FakeBookingRepository bookingRepository;

    setUp(() {
      bookingRepository = FakeBookingRepository()
        ..createBooking(kBooking);
      viewModel = HomeViewModel(
        bookingRepository: bookingRepository,
        userRepository: FakeUserRepository(),
      );
      goRouter = MockGoRouter();
      when(() => goRouter.push(any())).thenAnswer((_) => Future.value(null));
    });

    // ...
  });
}
```

這個設定會建立兩個所需的假資料庫（fake repositories），
並將它們傳遞給`HomeViewModel`物件。
這個類別本身不需要被模擬（faked）。

:::note
這段程式碼同時也定義了一個`MockGoRouter`。
路由器（router）則是使用[`package:mocktail`][`package:mocktail`]進行模擬（mock），
這部分不在本案例研究（case-study）的討論範圍內。
你可以在[Flutter 的測試文件][Flutter's testing documentation]中找到一般的測試指引。
:::

在定義好 view model 及其相依項目之後，
就需要建立要進行測試的元件樹（Widget tree）。
在`HomeScreen`的測試中，會定義一個`loadWidget`方法。

```dart title=home_screen_test.dart highlightLines=11-23
void main() {
  group('HomeScreen tests', () {
    late HomeViewModel viewModel;
    late MockGoRouter goRouter;
    late FakeBookingRepository bookingRepository;

    setUp(
      // ...
    );

    void loadWidget(WidgetTester tester) async {
      await testApp(
        tester,
        ChangeNotifierProvider.value(
          value: FakeAuthRepository() as AuthRepository,
          child: Provider.value(
            value: FakeItineraryConfigRepository() as ItineraryConfigRepository,
            child: HomeScreen(viewModel: viewModel),
          ),
        ),
        goRouter: goRouter,
      );
    }

    // ...
  });
}
```

這個方法會再去呼叫 `testApp`，
這是一個在 compass app 中用於所有元件測試（widget tests）的通用方法。
其內容如下：

```dart title=testing/app.dart
void testApp(
  WidgetTester tester,
  Widget body, {
  GoRouter? goRouter,
}) async {
  tester.view.devicePixelRatio = 1.0;
  await tester.binding.setSurfaceSize(const Size(1200, 800));
  await mockNetworkImages(() async {
    await tester.pumpWidget(
      MaterialApp(
        localizationsDelegates: [
          GlobalWidgetsLocalizations.delegate,
          GlobalMaterialLocalizations.delegate,
          AppLocalizationDelegate(),
        ],
        theme: AppTheme.lightTheme,
        home: InheritedGoRouter(
          goRouter: goRouter ?? MockGoRouter(),
          child: Scaffold(
            body: body,
          ),
        ),
      ),
    );
  });
}
```

這個函式的唯一工作，就是建立一個可以進行測試的元件樹（widget tree）。

`loadWidget` 方法會傳入元件樹中要進行測試的獨特部分。
在這個例子中，包含了 `HomeScreen` 及其 view model，
還有一些在元件樹較高層級的額外假造（faked）repository。

最重要的重點是，只要你的架構設計良好，
view 和 view model 的測試只需要對 repository 進行 mock（模擬）。

## 測試資料層

和 UI 層類似，資料層的元件也有明確定義的輸入與輸出，
因此兩端都可以被 fake（模擬）。
若要為某個 repository 撰寫單元測試，
只需 mock（模擬）它所依賴的 service。
以下範例展示了針對 `BookingRepository` 的單元測試。

```dart title=booking_repository_remote_test.dart
void main() {
  group('BookingRepositoryRemote tests', () {
    late BookingRepository bookingRepository;
    late FakeApiClient fakeApiClient;

    setUp(() {
      fakeApiClient = FakeApiClient();
      bookingRepository = BookingRepositoryRemote(
        apiClient: fakeApiClient,
      );
    });

    test('should get booking', () async {
      final result = await bookingRepository.getBooking(0);
      final booking = result.asOk.value;
      expect(booking, kBooking);
    });
  });
}
```

想進一步了解如何撰寫 mock 和 fake，
請參考 [Compass App `testing` 目錄][Compass App `testing` directory] 中的範例，
或閱讀 [Flutter 的測試文件][Flutter's testing documentation]。

[use-cases]: /app-architecture/guide#optional-domain-layer
[`FakeBookingRepository`]: https://github.com/flutter/samples/blob/main/compass_app/app/testing/fakes/repositories/fake_booking_repository.dart
[`BookingRepository`]: https://github.com/flutter/samples/tree/main/compass_app/app/lib/data/repositories/booking
[data layer section]: /app-architecture/case-study/data-layer
[`package:mocktail`]: {{site.pub-pkg}}/mocktail
[Flutter's testing documentation]: /testing/overview
[Compass App `testing` directory]: https://github.com/flutter/samples/tree/main/compass_app/app/testing

## 意見回饋

由於本網站的此區塊仍在持續優化中，
我們[歡迎您的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/testing"
