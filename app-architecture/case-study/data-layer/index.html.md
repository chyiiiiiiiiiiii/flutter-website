# 資料層

> 逐步介紹一個實作 MVVM 架構的應用程式之資料層設計。



應用程式的資料層，在 MVVM（Model-View-ViewModel）術語中稱為 *model*（模型），
是所有應用程式資料的真實來源（source of truth）。
作為資料的唯一真實來源，
應用程式資料僅應在此處進行更新。

資料層負責從各種外部 API 取得資料，
將這些資料提供給 UI，
處理來自 UI 需要更新資料的事件，
並在需要時向這些外部 API 發送更新請求。

本指南中的資料層包含兩個主要元件，
分別是 [repositories][repositories]（儲存庫）與 [services][services]（服務）。

![一張突顯應用程式資料層元件的圖表。](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png)

* **Repositories（儲存庫）** 是應用程式資料的真實來源，並包含與該資料相關的邏輯，例如根據新的使用者事件來更新資料，或從服務輪詢資料。Repositories 負責在支援離線功能時同步資料、管理重試邏輯，以及快取資料。
* **Services（服務）** 是無狀態的 Dart 類別，負責與 API 互動，例如 HTTP 伺服器與平台插件。任何應用程式所需、但不是在應用程式程式碼內部產生的資料，都應該透過 service 類別來取得。

## 定義 service

service 類別是所有架構元件中最不具歧義性的。
它是無狀態的，其函式不會產生副作用。
它唯一的工作是包裝外部 API。
通常每個資料來源會有一個對應的 service 類別，
例如一個 client HTTP 伺服器或平台插件。

![一張顯示 service 物件輸入與輸出的圖表。](/assets/images/docs/app-architecture/case-study/mvvm-case-study-services-architecture.png)

以 Compass 應用程式為例，其中有一個 [`APIClient`][`APIClient`] service，
負責處理與面向客戶端伺服器的 CRUD 呼叫。

```dart title=api_client.dart
class ApiClient {
  // Some code omitted for demo purposes.

  Future<Result<List<ContinentApiModel>>> getContinents() async { /* ... */ }

  Future<Result<List<DestinationApiModel>>> getDestinations() async { /* ... */ }

  Future<Result<List<ActivityApiModel>>> getActivityByDestination(String ref) async { /* ... */ }

  Future<Result<List<BookingApiModel>>> getBookings() async { /* ... */ }

  Future<Result<BookingApiModel>> getBooking(int id) async { /* ... */ }

  Future<Result<BookingApiModel>> postBooking(BookingApiModel booking) async { /* ... */ }

  Future<Result<void>> deleteBooking(int id) async { /* ... */ }

  Future<Result<UserApiModel>> getUser() async { /* ... */ }
}
```

這個 service 本身是一個類別，
每個方法都包裝了一個不同的 API 端點，
並且對外提供非同步的回應物件。
延續前面刪除已儲存預訂的範例，
`deleteBooking` 方法會回傳 `Future<Result<void>>`。

:::note
有些方法會回傳專門用來處理 API 原始資料的資料類別，
例如 `BookingApiModel` 類別。
如你即將看到的，repository 會擷取資料，
並以不同的格式對外提供。
:::


## 定義 repository

repository（資料儲存庫）的唯一職責是管理應用程式資料。
repository 是單一類型應用程式資料的真實來源（source of truth），
並且應該是唯一可以變更該資料類型的地方。
repository 負責從外部來源輪詢（polling）新資料、
處理重試邏輯、管理快取資料，
以及將原始資料轉換為領域模型（domain models）。

![一個突顯應用程式中 repository 元件的圖示。](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Repository-highlighted.png)

你的應用程式中，每一種不同類型的資料都應該有獨立的 repository。
例如，Compass 應用程式就有名為 `UserRepository`、
`BookingRepository`、`AuthRepository`、`DestinationRepository` 等多個 repository。

以下範例是 Compass 應用程式中的 `BookingRepository`，
展示了一個 repository 的基本結構。

```dart title=booking_repository_remote.dart
class BookingRepositoryRemote implements BookingRepository {
  BookingRepositoryRemote({
    required ApiClient apiClient,
  }) : _apiClient = apiClient;

  final ApiClient _apiClient;
  List<Destination>? _cachedDestinations;

  Future<Result<void>> createBooking(Booking booking) async {...}
  Future<Result<Booking>> getBooking(int id) async {...}
  Future<Result<List<BookingSummary>>> getBookingsList() async {...}
  Future<Result<void>> delete(int id) async {...}
}
```

:::note 開發環境與測試環境
前面範例中的類別是 `BookingRepositoryRemote`，
它繼承了一個名為 `BookingRepository` 的抽象類別。
這個基底類別用於為不同環境建立 repository。
例如，compass 應用程式還有一個名為 `BookingRepositoryLocal` 的類別，
它用於本地開發。

你可以在
[GitHub 上查看 `BookingRepository` 類別的差異][`BookingRepository` classes on GitHub]。
:::

`BookingRepository` 會將 `ApiClient` service 作為輸入，
並利用它從伺服器取得與更新原始資料。
這個 service 必須是私有成員，
以防止 UI 層繞過 repository 而直接呼叫 service。

透過 `ApiClient` service，
repository 可以輪詢伺服器端使用者已儲存預訂的更新，
並發送 `POST` 請求來刪除已儲存的預訂。

repository 轉換為應用程式模型的原始資料可以來自
多個來源與多個 service，
因此 repository 與 service 之間是多對多的關係。
一個 service 可以被任意多個 repository 使用，
而一個 repository 也可以使用多個 service。

![一個突顯應用程式資料層元件的圖示。](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-Data-highlighted.png)

### 領域模型（Domain models）

`BookingRepository` 會輸出 `Booking` 和 `BookingSummary` 物件，
這些都是*領域模型（domain models）*。
所有的 repository 都會輸出對應的領域模型。
這些資料模型與 API 模型不同，因為它們只包含
應用程式其他部分所需的資料。
API 模型包含的原始資料通常需要過濾、
合併或刪除，才能對應用程式的 view model 有用。
repository 會將原始資料精煉後，以領域模型形式輸出。

在範例應用程式中，領域模型會透過
像 `BookingRepository.getBooking` 這樣的方法回傳值來公開。
`getBooking` 方法負責從
`ApiClient` service 取得原始資料，並轉換成 `Booking` 物件。
它會結合多個 service endpoint 的資料來完成這個動作。

```dart title=booking_repository_remote.dart highlightLines=14-21
// This method was edited for brevity.
Future<Result<Booking>> getBooking(int id) async {
  try {
    // Get the booking by ID from server.
    final resultBooking = await _apiClient.getBooking(id);
    if (resultBooking is Error<BookingApiModel>) {
      return Result.error(resultBooking.error);
    }
    final booking = resultBooking.asOk.value;

    final destination = _apiClient.getDestination(booking.destinationRef);
    final activities = _apiClient.getActivitiesForBooking(
            booking.activitiesRef);

    return Result.ok(
      Booking(
        startDate: booking.startDate,
        endDate: booking.endDate,
        destination: destination,
        activity: activities,
      ),
    );
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

:::note
在 Compass 應用程式中，service 類別會回傳 `Result` 物件。
`Result` 是一個工具類別，用來包裝非同步呼叫，
讓處理錯誤與管理依賴非同步呼叫的 UI 狀態變得更加容易。

這種模式是推薦做法，但不是強制要求。
本指南推薦的架構也可以不採用這個模式來實作。

你可以在 [Result cookbook recipe][Result cookbook recipe] 中了解這個類別。
:::

### 完整事件循環

在本頁的說明中，你已經看到使用者如何刪除已儲存的預訂，
這個流程從一個事件開始——使用者在 `Dismissible` 元件（Widget）上滑動。
view model 會處理這個事件，並將實際的資料變更委派給 `BookingRepository`。
以下程式碼片段展示了 `BookingRepository.deleteBooking` 方法。

```dart title=booking_repository_remote.dart
Future<Result<void>> delete(int id) async {
  try {
    return _apiClient.deleteBooking(id);
  } on Exception catch (e) {
    return Result.error(e);
  }
}
```

repository 會使用 `_apiClient.deleteBooking` 方法向 API client 發送 `POST` 請求，並回傳 `Result`。
`HomeViewModel` 會消費 `Result` 及其所包含的資料，
最終呼叫 `notifyListeners`，完成整個循環。

[repositories]: /app-architecture/guide#repositories
[services]:  /app-architecture/guide#services
[`APIClient`]: https://github.com/flutter/samples/blob/main/compass_app/app/lib/data/services/api/api_client.dart
[`sealed`]: https://dart.dev/language/class-modifiers#sealed
[`BookingRepository` classes on GitHub]: https://github.com/flutter/samples/tree/main/compass_app/app/lib/data/repositories/booking
[Result cookbook recipe]: /app-architecture/design-patterns/result

## 意見回饋

由於本網站的此區塊仍在持續演進中，
我們[歡迎您的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/data-layer"

