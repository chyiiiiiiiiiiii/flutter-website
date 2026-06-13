---
title: 使用 Result 物件進行錯誤處理
description: "透過 Result 物件提升跨類別的錯誤處理能力。"
contentTags:
  - error handling
  - services
iconPath: /assets/images/docs/app-architecture/design-patterns/result-icon.svg
order: 5
---

<?code-excerpt path-base="app-architecture/result"?>

Dart 提供了內建的錯誤處理機制，
能夠拋出與捕捉例外（exceptions）。

如同在 [錯誤處理文件](https://dart.dev/language/error-handling) 中所提到，
Dart 的例外屬於未處理例外（unhandled exceptions）。
這表示會拋出例外的方法不需要宣告這些例外，
而呼叫這些方法的程式碼也不強制要求一定要捕捉它們。

這可能導致例外沒有被妥善處理的情況。
在大型專案中，
開發者可能會忘記捕捉例外，
而應用程式的不同層或元件
也可能會拋出未被記錄的例外。
這會導致錯誤發生甚至應用程式崩潰。

在本指南中，
你將會了解這項限制，
以及如何透過 _result_（結果）模式來改善。

## Flutter 應用程式中的錯誤流程

遵循 [Flutter 架構指引](/app-architecture) 的應用程式
通常由 view model、repository、service 等組件構成。
當這些元件中的某個函式發生失敗時，
應該將錯誤資訊傳遞給呼叫端元件。

通常這會透過例外來完成。
舉例來說，
當 API client service 無法與遠端伺服器溝通時，
可能會拋出 HTTP Error Exception。
呼叫端元件（例如 Repository），
必須選擇要捕捉這個例外，
或者忽略它並讓呼叫的 view model 處理。

這可以從以下範例觀察到。請參考這些類別：

- 一個 service，`ApiClientService`，負責對遠端服務進行 API 呼叫。
- 一個 repository，`UserProfileRepository`，
  提供由 `ApiClientService` 所提供的 `UserProfile`。
- 一個 view model，`UserProfileViewModel`，使用 `UserProfileRepository`。

`ApiClientService` 包含一個方法 `getUserProfile`，
在特定情境下會拋出例外：

- 當回應碼不是 200 時，該方法會拋出 `HttpException`。
- 若回應的 JSON 格式不正確，解析方法會拋出例外。
- HTTP client 也可能因網路問題而拋出例外。

以下程式碼測試了多種可能發生的例外情境：

<?code-excerpt "lib/no_result.dart (ApiClientService)"?>
```dart
class ApiClientService {
  // ···

  Future<UserProfile> getUserProfile() async {
    try {
      final request = await client.get(_host, _port, '/user');
      final response = await request.close();
      if (response.statusCode == 200) {
        final stringData = await response.transform(utf8.decoder).join();
        return UserProfile.fromJson(jsonDecode(stringData));
      } else {
        throw const HttpException('Invalid response');
      }
    } finally {
      client.close();
    }
  }
}
```

`UserProfileRepository` 不需要處理來自 `ApiClientService` 的例外狀況。
在這個範例中，它只會回傳 API Client 的值。

<?code-excerpt "lib/no_result.dart (UserProfileRepository)"?>
```dart
class UserProfileRepository {
  // ···

  Future<UserProfile> getUserProfile() async {
    return await _apiClientService.getUserProfile();
  }
}
```

最後，`UserProfileViewModel`
應該捕捉所有例外並處理錯誤。

這可以透過將對 `UserProfileRepository` 的呼叫包裹在 try-catch 中來完成：

<?code-excerpt "lib/no_result.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  Future<void> load() async {
    try {
      _userProfile = await userProfileRepository.getUserProfile();
      notifyListeners();
    } on Exception catch (exception) {
      // handle exception
    }
  }
}
```

實際上，開發人員有時可能會忘記正確捕捉例外（exception），導致出現如下的程式碼。
這段程式碼可以編譯並執行，但如果發生前面提到的其中一種例外時，應用程式就會當機：

<?code-excerpt "lib/no_result.dart (UserProfileViewModelNoTryCatch)" replace="/NoTryCatch//g"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  Future<void> load() async {
    _userProfile = await userProfileRepository.getUserProfile();
    notifyListeners();
  }
}
```

你可以嘗試透過撰寫 `ApiClientService` 的文件，來提醒可能會拋出的例外（exception）。然而，由於 view model 並未直接使用該 service，其他在此程式碼庫中工作的開發者可能會忽略這些資訊。

## 使用 result pattern

另一種替代拋出例外的方式，是將函式的輸出包裝在 `Result` 物件中。

當函式成功執行時，`Result` 會包含回傳的值；但如果函式未能成功完成，`Result` 物件則會包含錯誤資訊。

`Result` 是一個 [`sealed`]({{site.dart-site}}/language/class-modifiers#sealed) 類別，可以繼承 `Ok` 或 `Error` 類別。若要回傳成功的值，請使用 `Ok` 子類別；若要回傳捕獲到的錯誤，則使用 `Error` 子類別。

以下程式碼展示了一個簡化版的 `Result` 類別範例，僅用於展示。完整實作請參考本頁底部。

<?code-excerpt "lib/simple_result.dart"?>
```dart
/// Utility class that simplifies handling errors.
///
/// Return a [Result] from a function to indicate success or failure.
///
/// A [Result] is either an [Ok] with a value of type [T]
/// or an [Error] with an [Exception].
///
/// Use [Result.ok] to create a successful result with a value of type [T].
/// Use [Result.error] to create an error result with an [Exception].
sealed class Result<T> {
  const Result();

  /// Creates an instance of Result containing a value
  factory Result.ok(T value) => Ok(value);

  /// Create an instance of Result containing an error
  factory Result.error(Exception error) => Error(error);
}

/// Subclass of Result for values
final class Ok<T> extends Result<T> {
  const Ok(this.value);

  /// Returned value in result
  final T value;
}

/// Subclass of Result for errors
final class Error<T> extends Result<T> {
  const Error(this.error);

  /// Returned error in result
  final Exception error;
}
```

在這個範例中，
`Result` 類別使用泛型型別 `T` 來表示任何回傳值，
這個值可以是像 `String` 這樣的 Dart 原始型別，或是 `int`，也可以是像 `UserProfile` 這樣的自訂類別。

### 建立 `Result` 物件

對於使用 `Result` 類別來回傳值的函式，
函式不再直接回傳值，
而是回傳一個包含該值的 `Result` 物件。

例如，在 `ApiClientService` 中，
`getUserProfile` 會改為回傳 `Result`：

<?code-excerpt "lib/main.dart (ApiClientService1)"?>
```dart
class ApiClientService {
  // ···

  Future<Result<UserProfile>> getUserProfile() async {
    // ···
  }
}
```

與其直接回傳 `UserProfile`，
它會回傳一個包含 `UserProfile` 的 `Result` 物件。

為了方便使用 `Result` 類別，
它包含了兩個具名建構函式：`Result.ok` 和 `Result.error`。
可依照所需的輸出，使用它們來建立 `Result`。
同時，捕捉程式碼中拋出的任何例外，
並將其包裝到 `Result` 物件中。

例如，下方的 `getUserProfile()` 方法
已經修改為使用 `Result` 類別：

<?code-excerpt "lib/main.dart (ApiClientService2)"?>
```dart
class ApiClientService {
  // ···

  Future<Result<UserProfile>> getUserProfile() async {
    try {
      final request = await client.get(_host, _port, '/user');
      final response = await request.close();
      if (response.statusCode == 200) {
        final stringData = await response.transform(utf8.decoder).join();
        return Result.ok(UserProfile.fromJson(jsonDecode(stringData)));
      } else {
        return const Result.error(HttpException('Invalid response'));
      }
    } on Exception catch (exception) {
      return Result.error(exception);
    } finally {
      client.close();
    }
  }
}
```

原本的 return 陳述式已被替換為使用 `Result.ok` 回傳值的陳述式。
`throw HttpException()` 也被替換為回傳 `Result.error(HttpException())` 的陳述式，並將錯誤包裝在 `Result` 中。
此外，該方法也以 `try-catch` 區塊包裹，以捕捉由 Http client 或 JSON parser 所拋出的任何例外，並將其包裝成 `Result.error`。

repository 類別同樣需要修改，現在不再直接回傳 `UserProfile`，而是回傳 `Result<UserProfile>`。

<?code-excerpt "lib/main.dart (getUserProfile1)" replace="/1//g"?>
```dart
Future<Result<UserProfile>> getUserProfile() async {
  return await _apiClientService.getUserProfile();
}
```

### 解包 Result 物件

現在，view model 不再直接接收 `UserProfile`，
而是接收一個包含 `UserProfile` 的 `Result`。

這會強制實作 view model 的開發者
必須先解包 `Result` 才能取得 `UserProfile`，
並能避免未捕捉的例外發生。

<?code-excerpt "lib/main.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···

  UserProfile? userProfile;

  Exception? error;

  Future<void> load() async {
    final result = await userProfileRepository.getUserProfile();
    switch (result) {
      case Ok<UserProfile>():
        userProfile = result.value;
      case Error<UserProfile>():
        error = result.error;
    }
    notifyListeners();
  }
}
```

`Result` 類別是透過 `sealed` 類別實作的，
這表示它只能是 `Ok` 或 `Error` 其中一種類型。
這讓程式碼可以使用
[switch result or expression]({{site.dart-site}}/language/branches#switch-statements) 來判斷結果。

在 `Ok<UserProfile>` 的情況下，
可以透過 `value` 屬性取得值。

在 `Error<UserProfile>` 的情況下，
可以透過 `error` 屬性取得錯誤物件。

## 改善控制流程

將程式碼包裹在 `try-catch` 區塊中可以確保
拋出的例外會被捕捉，而不會傳遞到程式碼的其他部分。

請參考以下程式碼。

<?code-excerpt "lib/no_result.dart (UserProfileRepository2)" replace="/2//g"?>
```dart
class UserProfileRepository {
  // ···

  Future<UserProfile> getUserProfile() async {
    try {
      return await _apiClientService.getUserProfile();
    } catch (e) {
      try {
        return await _databaseService.createTemporaryUser();
      } catch (e) {
        throw Exception('Failed to get user profile');
      }
    }
  }
}
```

在此方法中，`UserProfileRepository` 會嘗試使用 `ApiClientService` 來取得 `UserProfile`。
如果失敗，則會嘗試在 `DatabaseService` 中建立一個暫時性的使用者。

由於這兩個服務方法都可能失敗，
因此程式碼必須在這兩種情況下都捕捉例外（exceptions）。

這可以透過採用 `Result` 模式來改進：


<?code-excerpt "lib/main.dart (getUserProfile)"?>
```dart
Future<Result<UserProfile>> getUserProfile() async {
  final apiResult = await _apiClientService.getUserProfile();
  if (apiResult is Ok) {
    return apiResult;
  }

  final databaseResult = await _databaseService.createTemporaryUser();
  if (databaseResult is Ok) {
    return databaseResult;
  }

  return Result.error(Exception('Failed to get user profile'));
}
```

在這段程式碼中，如果 `Result` 物件是 `Ok` 的實例，
則該函式會回傳該物件；
否則，會回傳 `Result.Error`。

## 整合總結

在本指南中，你已經學會
如何使用 `Result` 類別來回傳結果值。

重點整理如下：

- `Result` 類別會強制呼叫方法檢查錯誤，
  減少因未捕捉例外而產生的錯誤數量。
- `Result` 類別相較於 try-catch 區塊，有助於改善控制流程。
- `Result` 類別是 `sealed`，且只能回傳 `Ok` 或 `Error` 的實例，
  讓程式碼可以透過 switch 敘述來解包它們。

下方可以看到完整的 `Result` 類別，
這是在 [Compass App example]({{site.repo.samples}}/tree/main/compass_app)
針對 [Flutter architecture guidelines](/app-architecture) 所實作的版本。

:::note
你也可以在 [pub.dev]({{site.pub}}) 上找到不同現成可用的
`Result` 類別實作，
例如 [`result_dart`]({{site.pub-pkg}}/result_dart)、[`result_type`]({{site.pub-pkg}}/result_type) 與 [`multiple_result`]({{site.pub-pkg}}/multiple_result) 套件。
:::

<?code-excerpt "lib/result.dart (Result)"?>
```dart
/// Utility class that simplifies handling errors.
///
/// Return a [Result] from a function to indicate success or failure.
///
/// A [Result] is either an [Ok] with a value of type [T]
/// or an [Error] with an [Exception].
///
/// Use [Result.ok] to create a successful result with a value of type [T].
/// Use [Result.error] to create an error result with an [Exception].
///
/// Evaluate the result using a switch statement:
/// ```dart
/// switch (result) {
///   case Ok(): {
///     print(result.value);
///   }
///   case Error(): {
///     print(result.error);
///   }
/// }
/// ```
sealed class Result<T> {
  const Result();

  /// Creates a successful [Result], completed with the specified [value].
  const factory Result.ok(T value) = Ok._;

  /// Creates an error [Result], completed with the specified [error].
  const factory Result.error(Exception error) = Error._;
}

/// A successful [Result] with a returned [value].
final class Ok<T> extends Result<T> {
  const Ok._(this.value);

  /// The returned value of this result.
  final T value;

  @override
  String toString() => 'Result<$T>.ok($value)';
}

/// An error [Result] with a resulting [error].
final class Error<T> extends Result<T> {
  const Error._(this.error);

  /// The resulting error of this result.
  final Exception error;

  @override
  String toString() => 'Result<$T>.error($error)';
}
```

[Error handling documentation]: https://dart.dev/language/error-handling
[Flutter architecture guidelines]: /app-architecture
[Compass App example]: {{site.repo.samples}}/tree/main/compass_app
[pub.dev]: {{site.pub}}
[`result_dart`]: {{site.pub-pkg}}/result_dart
[`result_type`]: {{site.pub-pkg}}/result_type
[`multiple_result`]: {{site.pub-pkg}}/multiple_result
[`sealed`]: {{site.dart-site}}/language/class-modifiers#sealed
[switch result or expression]: {{site.dart-site}}/language/branches#switch-statements
