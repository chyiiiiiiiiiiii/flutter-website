---
title: "離線優先支援"
description: 為應用程式中的一個功能實作離線優先支援。
contentTags:
  - data
  - user experience
  - repository pattern
iconPath: /assets/images/docs/app-architecture/design-patterns/offline-first-icon.svg
order: 3
---

<?code-excerpt path-base="app-architecture/offline_first"?>

離線優先（offline-first）應用程式是一種即使在斷線狀態下，仍能提供大部分或全部功能的應用程式。離線優先應用程式通常依賴已儲存的資料，讓使用者能暫時存取原本僅能線上取得的資料。

有些離線優先應用程式能無縫結合本地與遠端資料，而有些應用程式則會在使用快取資料時通知使用者。同樣地，有些應用程式會在背景自動同步資料，而有些則需要使用者明確執行同步。這一切取決於應用程式的需求與所提供的功能，由開發者決定哪種實作方式最符合需求。

在本指南中，你將學習如何在 Flutter 中，依循 [Flutter 架構指引](/app-architecture)，實作不同的離線優先應用程式方案。

## 離線優先架構

如常見架構概念指南所述，repository（儲存庫）扮演單一真實資料來源（single source of truth）的角色。它們負責呈現本地或遠端資料，並且應該是唯一能修改資料的地方。在離線優先應用程式中，repository 會結合不同的本地與遠端資料來源，無論裝置的連線狀態如何，都能在單一存取點提供資料。

本範例使用 `UserProfileRepository`，這是一個支援離線優先的 repository，可用來取得與儲存 `UserProfile` 物件。

`UserProfileRepository` 使用了兩種不同的資料服務：一種處理遠端資料，另一種則操作本地資料庫。

API client `ApiClientService` 會透過 HTTP REST 呼叫連接至遠端服務。

<?code-excerpt "lib/data/services/api_client_service.dart (ApiClientService)"?>
```dart
class ApiClientService {
  /// performs GET network request to obtain a UserProfile
  Future<UserProfile> getUserProfile() async {
    // ···
  }

  /// performs PUT network request to update a UserProfile
  Future<void> putUserProfile(UserProfile userProfile) async {
    // ···
  }
}
```

資料庫服務 `DatabaseService` 使用 SQL 來儲存資料，
這與 [Persistent Storage Architecture: SQL](/app-architecture/design-patterns/sql) 教學中的實作方式類似。

<?code-excerpt "lib/data/services/database_service.dart (DatabaseService)"?>
```dart
class DatabaseService {
  /// Fetches the UserProfile from the database.
  /// Returns null if the user profile is not found.
  Future<UserProfile?> fetchUserProfile() async {
    // ···
  }

  /// Update UserProfile in the database.
  Future<void> updateUserProfile(UserProfile userProfile) async {
    // ···
  }
}
```

本範例同樣使用了 `UserProfile` 資料類別（data class），該類別是透過 [`freezed`]({{site.pub}}/packages/freezed) 套件建立的。

<?code-excerpt "lib/domain/model/user_profile.dart (UserProfile)" remove="@Default(false) bool synchronized,"?>
```dart
@freezed
abstract class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String name,
    required String photoUrl,
  }) = _UserProfile;
}
```

在具有複雜資料的應用程式中，
例如當遠端資料包含的欄位比 UI 所需的還要多時，
你可能會希望為 API 和資料庫服務使用一個資料類別，
而為 UI 使用另一個資料類別。
舉例來說，
資料庫實體可以使用 `UserProfileLocal`，
API 回應物件可以使用 `UserProfileRemote`，
而 UI 資料模型類別則可以使用 `UserProfile`。
`UserProfileRepository` 則負責在需要時將資料進行相互轉換。

這個範例同時也包含了 `UserProfileViewModel`，
這是一個 view model（檢視模型），它會使用 `UserProfileRepository`
來在元件 (Widget) 上顯示 `UserProfile`。

<?code-excerpt "lib/ui/user_profile/user_profile_viewmodel.dart (UserProfileViewModel)"?>
```dart
class UserProfileViewModel extends ChangeNotifier {
  // ···
  final UserProfileRepository _userProfileRepository;

  UserProfile? get userProfile => _userProfile;
  // ···

  /// Load the user profile from the database or the network
  Future<void> load() async {
    // ···
  }

  /// Save the user profile with the new name
  Future<void> save(String newName) async {
    // ···
  }
}
```

## 讀取資料

讀取資料是任何依賴遠端 API 服務的應用程式中，最基本的部分之一。

在離線優先（offline-first）應用程式中，
你希望確保存取這些資料的速度盡可能快，
並且不會因為裝置是否連線而影響到向使用者提供資料。
這與[樂觀狀態設計模式](/app-architecture/design-patterns/optimistic-state)類似。

在本節中，
你將學習兩種不同的方法：
一種是將資料庫作為備援，
另一種則是使用 `Stream` 結合本地與遠端資料。

### 使用本地資料作為備援

作為第一種方法，
你可以透過備援機制來實作離線支援，
以因應使用者離線或網路請求失敗的情況。

在這種情境下，`UserProfileRepository` 會嘗試透過 `ApiClientService`
從遠端 API 伺服器取得 `UserProfile`。
如果這個請求失敗，
則會從 `DatabaseService` 返回本地儲存的 `UserProfile`。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfileFallback)" replace="/Fallback//g"?>
```dart
Future<UserProfile> getUserProfile() async {
  try {
    // Fetch the user profile from the API
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);

    return apiUserProfile;
  } catch (e) {
    // If the network call failed,
    // fetch the user profile from the database
    final databaseUserProfile = await _databaseService.fetchUserProfile();

    // If the user profile was never fetched from the API
    // it will be null, so throw an  error
    if (databaseUserProfile != null) {
      return databaseUserProfile;
    } else {
      // Handle the error
      throw Exception('User profile not found');
    }
  }
}
```

### 使用 Stream

一個更好的替代方案是使用 `Stream` 來呈現資料。
在最佳情況下，
`Stream` 會發出兩個值，
分別是本地儲存的資料以及來自伺服器的資料。

首先，stream 會透過 `DatabaseService` 發出本地儲存的資料。
這個呼叫通常比網路請求更快且較不容易出錯，
而且先執行這個步驟可以讓 view model 已經能夠顯示資料給使用者。

如果資料庫中沒有任何快取資料，
那麼 `Stream` 就會完全依賴網路請求，
只會發出一個值。

接著，該方法會使用 `ApiClientService` 進行網路請求，
以取得最新的資料。
如果請求成功，
它會用新取得的資料更新資料庫，
然後再將該值傳遞給 view model，
以便顯示給使用者。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfile)"?>
```dart
Stream<UserProfile> getUserProfile() async* {
  // Fetch the user profile from the database
  final userProfile = await _databaseService.fetchUserProfile();
  // Returns the database result if it exists
  if (userProfile != null) {
    yield userProfile;
  }

  // Fetch the user profile from the API
  try {
    final apiUserProfile = await _apiClientService.getUserProfile();
    //Update the database with the API result
    await _databaseService.updateUserProfile(apiUserProfile);
    // Return the API result
    yield apiUserProfile;
  } catch (e) {
    // Handle the error
  }
}
```

view model 必須訂閱此 `Stream`，並等待其完成。
為此，請以 `Subscription` 物件呼叫 `asFuture()`，並等待結果。

對於每一個取得的值，
請更新 view model 的資料，並呼叫 `notifyListeners()`，
以便 UI 顯示最新資料。

<?code-excerpt "lib/ui/user_profile/user_profile_viewmodel.dart (load)"?>
```dart
Future<void> load() async {
  await _userProfileRepository
      .getUserProfile()
      .listen(
        (userProfile) {
          _userProfile = userProfile;
          notifyListeners();
        },
        onError: (error) {
          // handle error
        },
      )
      .asFuture<void>();
}
```
### 僅使用本機資料

另一種可行的方法是針對讀取操作僅使用本機儲存的資料。
這種做法要求資料必須在某個時刻預先載入至資料庫，
並且需要有一套同步機制來確保資料能夠隨時保持最新狀態。


<?code-excerpt "lib/data/repositories/user_profile_repository.dart (getUserProfileLocal)" replace="/Local//g;/Read//g"?>
```dart
Future<UserProfile> getUserProfile() async {
  // Fetch the user profile from the database
  final userProfile = await _databaseService.fetchUserProfile();

  // Return the database result if it exists
  if (userProfile == null) {
    throw Exception('Data not found');
  }

  return userProfile;
}

Future<void> sync() async {
  try {
    // Fetch the user profile from the API
    final userProfile = await _apiClientService.getUserProfile();

    // Update the database with the API result
    await _databaseService.updateUserProfile(userProfile);
  } catch (e) {
    // Try again later
  }
}
```

這種方法適用於不需要隨時與伺服器同步資料的應用程式。
例如，一個天氣應用程式，其天氣資料每天只更新一次。

同步可以由使用者手動執行，例如下拉重新整理（pull-to-refresh）動作，進而呼叫 `sync()` 方法，
或是由 `Timer` 或背景程序定期執行。
你可以在「同步狀態」的章節中學習如何實作同步任務。

## 寫入資料

在離線優先（offline-first）應用程式中，寫入資料的方式根本上取決於應用程式的使用情境。

有些應用程式可能需要使用者輸入的資料能夠立即在伺服器端取得，
而其他應用程式則可能較為彈性，允許資料暫時不同步。

本節將說明兩種在離線優先應用程式中實作資料寫入的不同方法。

### 僅限線上寫入（Online-only writing）

在離線優先應用程式中，一種資料寫入的方法是強制必須在線上狀態下才能寫入資料。
雖然這聽起來有些違反直覺，但這可以確保使用者所修改的資料
能夠完全與伺服器同步，應用程式的狀態不會與伺服器不同步。

在這種情況下，你會先嘗試將資料傳送到 API 服務，
如果請求成功，再將資料儲存到資料庫中。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (updateUserProfileOnline)" replace="/Online//g"?>
```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Only if the API call was successful
    // update the database with the user profile
    await _databaseService.updateUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

在這種情況下的缺點是，離線優先（offline-first）功能僅適用於讀取（read）操作，
但不適用於寫入（write）操作，因為寫入操作需要使用者處於線上狀態。

### 離線優先寫入（Offline-first writing）

第二種做法則相反。
應用程式不是先執行網路呼叫，
而是先將新資料儲存到資料庫中，
然後在本地儲存完成後，再嘗試將其傳送到 API 服務。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (updateUserProfileOffline)" replace="/Offline//g"?>
```dart
Future<void> updateUserProfile(UserProfile userProfile) async {
  // Update the database with the user profile
  await _databaseService.updateUserProfile(userProfile);

  try {
    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);
  } catch (e) {
    // Handle the error
  }
}
```

這種做法允許使用者即使在應用程式離線時，也能將資料儲存在本地端。
然而，若網路請求失敗，本地資料庫與 API 服務將不再同步。
在下一節中，你將學習如何處理本地與遠端資料同步的不同方法。

## 同步狀態

保持本地與遠端資料同步是離線優先（offline-first）應用程式中非常重要的一環，
因為本地所做的變更需要複製到遠端服務。
應用程式也必須確保，當使用者回到應用程式時，
本地儲存的資料與遠端服務中的資料一致。


### 撰寫同步任務

有多種方法可以在背景任務中實作同步機制。

一個簡單的解決方案是在 `UserProfileRepository` 中建立 `Timer`，
讓它定期執行，例如每五分鐘一次。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (Timer)"?>
```dart
Timer.periodic(const Duration(minutes: 5), (timer) => sync());
```

`sync()` 方法接著會從資料庫擷取 `UserProfile`，
如果需要同步，則會將其傳送至 API 服務。

<?code-excerpt "lib/data/repositories/user_profile_repository.dart (sync)"?>
```dart
Future<void> sync() async {
  try {
    // Fetch the user profile from the database
    final userProfile = await _databaseService.fetchUserProfile();

    // Check if the user profile requires synchronization
    if (userProfile == null || userProfile.synchronized) {
      return;
    }

    // Update the API with the user profile
    await _apiClientService.putUserProfile(userProfile);

    // Set the user profile as synchronized
    await _databaseService.updateUserProfile(
      userProfile.copyWith(synchronized: true),
    );
  } catch (e) {
    // Try again later
  }
}
```

一個更複雜的解決方案是使用像 [`workmanager`]({{site.pub}}/packages/workmanager) 這樣的背景處理插件。
這允許你的應用程式即使在未執行時，也能在背景中執行同步處理程序。

:::note
持續執行背景作業會大幅消耗裝置電池電量，
且有些裝置會限制背景處理的能力，
因此這種做法需要根據應用程式需求進行調整，
一種解決方案未必適用所有情境。
:::

同時建議僅在網路可用時執行同步任務。
例如，你可以使用 [`connectivity_plus`]({{site.pub}}/packages/connectivity_plus) 插件來檢查裝置是否已連接至 WiFi。
你也可以利用 [`battery_plus`]({{site.pub}}/packages/battery_plus) 來確認裝置電量是否充足。

在前面的範例中，同步任務每 5 分鐘執行一次。
在某些情況下，這可能過於頻繁，而在其他情境下則可能不夠頻繁。
實際的同步週期時間需依你的應用程式需求而定，這部分需要你自行決定。

### 儲存同步旗標（synchronization flag）

為了判斷資料是否需要同步，可以在資料類別中新增一個旗標（flag），
用來指示該變更是否需要同步。

例如，`bool synchronized`：

<?code-excerpt "lib/domain/model/user_profile.dart (UserProfile)"?>
```dart
@freezed
abstract class UserProfile with _$UserProfile {
  const factory UserProfile({
    required String name,
    required String photoUrl,
    @Default(false) bool synchronized,
  }) = _UserProfile;
}
```

你的同步邏輯應該僅在 `synchronized` 旗標為 `false` 時，才嘗試將資料傳送到 API 服務。
如果請求成功，則將其狀態改為 `true`。

### 從伺服器推送資料

另一種同步方式是使用推播服務（push service）將最新資料提供給應用程式。
在這種情況下，是伺服器在資料變更時主動通知應用程式，
而不是由應用程式主動查詢更新。

例如，你可以使用 [Firebase messaging]({{site.firebase}}/docs/cloud-messaging/flutter/client)，
將小型資料負載推送到裝置，
同時也能透過背景訊息（background messages）遠端觸發同步任務。

與其讓同步任務在背景持續執行，
不如讓伺服器在儲存的資料需要更新時，
透過推播通知（push notification）主動通知應用程式。

你也可以將這兩種方式結合，
同時執行背景同步任務並利用背景推播訊息，
以確保應用程式資料庫與伺服器保持同步。

## 綜合應用

撰寫一個離線優先（offline-first）應用程式
需要針對讀取、寫入與同步操作的實作方式做出決策，
這些決策會依你正在開發的應用程式需求而有所不同。

重點整理如下：

- 讀取資料時，
你可以使用 `Stream`，將本地儲存資料與遠端資料結合。
- 寫入資料時，
請決定是否需要在線上或離線狀態下執行，
以及是否需要稍後再同步資料。
- 實作背景同步任務時，
請考量裝置狀態與應用程式需求，
因為不同應用程式可能有不同的需求。

[Flutter Architecture guidelines]:/app-architecture
[Persistent Storage Architecture: SQL]:/app-architecture/design-patterns/sql
[`freezed`]:{{site.pub}}/packages/freezed
[Optimistic State design pattern]:/app-architecture/design-patterns/optimistic-state
[`workmanager`]:{{site.pub}}/packages/workmanager
[`connectivity_plus`]:{{site.pub}}/packages/connectivity_plus
[`battery_plus`]:{{site.pub}}/packages/battery_plus
[Firebase messaging]:{{site.firebase}}/docs/cloud-messaging/flutter/client
