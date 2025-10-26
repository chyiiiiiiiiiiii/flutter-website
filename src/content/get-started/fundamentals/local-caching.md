---
title: 本地快取
description: 學習如何在本地持久化資料。
prev:
  title: 網路與資料
  path: /get-started/fundamentals/networking
next:
  title: 深入學習
  path: /get-started/learn-flutter
---

現在你已經學會如何透過網路從伺服器載入資料，你的 Flutter 應用程式應該會感覺更加生動。然而，僅僅因為你*可以*從遠端伺服器載入資料，並不代表你總是*應該*這麼做。有時候，重新渲染上一次網路請求取得的資料，比重複發送請求並讓使用者等待結果來得更好。這種保留應用程式資料以便未來再次顯示的技術稱為*快取*（caching），本頁將介紹如何在你的 Flutter 應用程式中實現這項任務。

## 快取簡介

在最基本的層面，所有快取策略都可歸結為相同的三步驟操作，以下以偽程式碼表示：

```dart
Data? _cachedData;

Future<Data> get data async {
    // Step 1: Check whether your cache already contains the desired data
    if (_cachedData == null) {
        // Step 2: Load the data if the cache was empty
        _cachedData = await _readData();
    }
    // Step 3: Return the value in the cache
    return _cachedData!;
}
```

這個策略有許多有趣的變化方式，包括快取的位置、你主動將資料寫入（或稱「預熱」）快取的程度，以及其他方法。

## 常見快取術語

快取有其專屬的術語，部分術語定義如下：

**Cache hit（快取命中）**
: 當應用程式在快取中已經擁有所需資訊，無需從實際的資料來源載入時，就稱為快取命中（cache hit）。

**Cache miss（快取未命中）**
: 當應用程式的快取為空，必須從實際的資料來源載入所需資料，並將其儲存到快取中以供未來讀取時，稱為快取未命中（cache miss）。

## 快取資料的風險

當實際資料來源的內容已經變更，而快取中的資料尚未更新時，應用程式就會出現**過時快取（stale cache）**，這會導致應用程式有顯示舊資料、過時資訊的風險。

所有快取策略都可能面臨保存過時資料的風險。不幸的是，驗證快取是否為最新的動作，通常所需時間與完整載入資料差不多。因此，大多數應用程式只有在執行階段信任資料為最新、且不進行驗證時，才會真正受益於快取。

為了解決這個問題，大多數快取系統會為每一筆快取資料設定時效限制。當超過這個時限後，原本可能發生的快取命中會被視為快取未命中，直到載入最新資料為止。

在電腦科學領域有個著名的笑話：「電腦科學中最難的兩件事是快取失效（cache invalidation）、命名事物，以及 off-by-one 錯誤。」😄

儘管有這些風險，世界上幾乎每個應用程式都大量使用資料快取。接下來將介紹多種在 Flutter 應用程式中快取資料的方法，但請注意，這些方法都可以根據你的需求進行調整或組合使用。

## 在本地記憶體中快取資料

最簡單且效能最佳的快取策略就是記憶體內快取（in-memory cache）。這種策略的缺點是，因為快取只儲存在系統記憶體中，當前執行階段結束後，快取資料就不會被保留。（當然，這個「缺點」同時也有自動解決大多數過時快取問題的優點！）

由於其簡單性，記憶體內快取的實作方式與上方的偽程式碼非常類似。不過，建議你還是採用經過驗證的設計原則，例如 [repository pattern][repository pattern]，來組織你的程式碼，避免像上述的快取檢查散佈在整個程式碼庫中。

假設有一個 `UserRepository` 類別，同時負責將使用者快取在記憶體中，以避免重複的網路請求。它的實作可能如下所示：

```dart
class UserRepository {
  UserRepository(this.api);
  
  final Api api;
  final Map<int, User?> _userCache = {};

  Future<User?> loadUser(int id) async {
    if (!_userCache.containsKey(id)) {
      final response = await api.get(id);
      if (response.statusCode == 200) {
        _userCache[id] = User.fromJson(response.body);
      } else {
        _userCache[id] = null;
      }
    }
    return _userCache[id];
  }
}
```

這個 `UserRepository` 遵循多項經過驗證的設計原則，包括：

* [依賴注入（dependency injection）][dependency injection]，有助於測試
* [鬆耦合（loose coupling）][loose coupling]，可保護周邊程式碼不受其實作細節影響，以及
* [關注點分離（separation of concerns）][separation of concerns]，可避免其實作同時處理過多責任。

最棒的是，無論使用者在單一工作階段內於你的 Flutter 應用程式中造訪多少次載入特定使用者資料的頁面，`UserRepository` 類別僅會透過網路載入該資料 *一次*。

然而，使用者可能最終會厭倦每次重新啟動應用程式時都要等待資料載入。針對這種情況，你應該從下方介紹的持久化快取策略中選擇一種來實作。

[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection
[loose coupling]: https://en.wikipedia.org/wiki/Loose_coupling
[repository Pattern]: https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30
[separation of concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns

## 持久化快取

將資料快取於記憶體中，快取的生命週期永遠不會超過單一使用者工作階段。
若要在應用程式重新啟動時也能享受快取命中（cache hit）帶來的效能提升，你需要將資料快取於裝置的硬碟中。

### 使用 `shared_preferences` 快取資料

[`shared_preferences`][`shared_preferences`] 是一個 Flutter 套件，包裝了所有六大 Flutter 目標平台的
平台專屬 [鍵值儲存（key-value storage）][key-value storage]。
雖然這些底層平台的鍵值儲存設計用於小型資料，但對大多數應用來說，仍然適合作為快取策略。
完整指南請參考我們其他關於使用鍵值儲存的資源。

* 實作範例（Cookbook）：[將鍵值資料儲存至磁碟][Store key-value data on disk]
* 影片：[本週套件：`shared_preferences`][Package of the Week: `shared_preferences`]

[key-value storage]: https://en.wikipedia.org/wiki/Key%E2%80%93value_database
[Package of the Week: `shared_preferences`]: https://www.youtube.com/watch?v=sa_U0jffQII
[`shared_preferences`]: {{site.pub-pkg}}/shared_preferences
[Store key-value data on disk]: /cookbook/persistence/key-value

### 使用檔案系統快取資料

如果你的 Flutter 應用程式已超出 `shared_preferences` 適合的低吞吐量場景，你可以考慮使用裝置的檔案系統來快取資料。
更詳細的指南請參考我們其他關於檔案系統快取的資源。

* 實作範例（Cookbook）：[讀取與寫入檔案][Read and write files]

[Read and write files]: /cookbook/persistence/reading-writing-files

### 使用裝置端資料庫快取資料

本地資料快取的最終進階方案，是採用正規資料庫來讀寫資料的策略。
有多種選擇，包括關聯式資料庫與非關聯式資料庫。
所有方法都能在處理大型資料集時，帶來遠優於單純檔案的效能提升。
更詳細的指南請參考以下資源：

* 實作範例（Cookbook）：[使用 SQLite 儲存資料][Persist data with SQLite]
* SQLite 替代方案：[`sqlite3` 套件][`sqlite3` package]
* Drift（關聯式資料庫）：[`drift` 套件][`drift` package]
* Hive CE（非關聯式資料庫）：[`hive_ce` 套件][`hive_ce` package]
* Remote Caching（API 回應輕量快取系統）：[`remote_caching` 套件][`remote_caching` package]

[`drift` package]: {{site.pub-pkg}}/drift
[`hive_ce` package]: {{site.pub-pkg}}/hive_ce
[`remote_caching` package]: {{site.pub-pkg}}/remote_caching

[Persist data with SQLite]: /cookbook/persistence/sqlite
[`sqlite3` package]: {{site.pub-pkg}}/sqlite3

## 圖片快取

圖片快取與一般資料快取屬於相似的問題領域，但有一套通用解決方案。
若要讓你的 Flutter 應用程式使用檔案系統來儲存圖片，請使用 [`cached_network_image` 套件][`cached_network_image` package]。

* 影片：[本週套件：`cached_network_image`][Package of the Week: `cached_network_image`]

{% comment %}
TODO: 我的理解是我們現在推薦使用 `Image.network`，而不是 cache_network_image。
{% endcomment %}

[`cached_network_image` package]: {{site.pub-pkg}}/cached_network_image
[Package of the Week: `cached_network_image`]: https://www.youtube.com/watch?v=fnHr_rsQwDA

## 狀態還原（State restoration）

除了應用程式資料外，你可能還希望持久化使用者工作階段的其他面向，例如導覽堆疊、捲動位置，甚至是填寫表單的部分進度。這種模式稱為「狀態還原（state restoration）」，並已內建於 Flutter。

狀態還原的運作方式，是指示 Flutter 框架將其 Element 樹中的資料與 Flutter 引擎同步，然後將這些資料快取到平台專屬的儲存空間，以便未來工作階段使用。若要在 Android 和 iOS 上啟用 Flutter 的狀態還原功能，請參考以下文件：

* Android 文件：[Android 狀態還原][Android state restoration]
* iOS 文件：[iOS 狀態還原][iOS state restoration]

[Android state restoration]: /platform-integration/android/restore-state-android
[iOS state restoration]: /platform-integration/ios/restore-state-ios

## 意見回饋

由於本網站區塊仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="local-caching"
