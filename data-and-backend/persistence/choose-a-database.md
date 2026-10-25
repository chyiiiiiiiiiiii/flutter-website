# 為你的 Flutter 應用程式選擇資料庫

> 比較 Cloud Firestore、Firebase SQL Connect、SQLite 與 鍵值儲存，為你的 Flutter 應用程式挑選合適的資料庫。



Flutter 並未內建資料庫，因此你可以依據資料的形態以及
資料需要存放的位置來選擇。
對大多數 Flutter 應用程式而言，可以從下列選項開始：

* **Cloud Firestore**：適用於可擴充的 NoSQL 資料，
  並能在多個裝置之間即時同步。
* **Firebase SQL Connect**：適用於需要結構化 SQL 結構描述 (schema) 的
  關聯式資料。
* **裝置端 SQLite** 或 **鍵值儲存**：適用於預設
  不需要雲端後端的本機資料。

## 比較資料庫選項

以下簡要說明各選項如何儲存與同步資料：

| 選項 | 資料模型 | 資料位置 | 即時更新 | 離線存取 |
|---|---|---|---|---|
| [Cloud Firestore][] | NoSQL 文件與集合 | 雲端，並附本機快取 | 是 | 內建（讀取與寫入） |
| [Firebase SQL Connect][] | 關聯式 (PostgreSQL) | 雲端 | 是 | 可選的查詢快取 |
| [裝置端 SQLite][sqlite-recipe] | 關聯式 | 預設位於裝置 | 本機串流（搭配 `drift`） | 一律在本機 |
| [鍵值儲存][key-value-recipe] | 鍵值對 | 僅限裝置 | 否 | 一律在本機 |

{:.table .table-striped}

## 以 Cloud Firestore 處理 NoSQL 資料

當你的應用程式需要可擴充的雲端資料庫，
並讓資料在使用者與裝置之間保持同步時，
例如聊天應用程式、協作工具、即時多人遊戲，
或需要離線快取的現場服務與檢查應用程式，
建議預設選擇 [Cloud Firestore][]。
它以文件的形式儲存資料，並將文件組織成集合，
而 [`cloud_firestore`][] 套件讓你的 Flutter 應用程式
能直接從用戶端程式碼讀取與寫入資料，
並以 [Cloud Firestore Security Rules][firestore-rules] 保護資料安全。

當你的應用程式需要以下特性時，Cloud Firestore 會是很好的選擇：

* **即時同步：** 監聽單一文件或查詢，
  並在資料變更時重新建置 UI，
  例如搭配 `StreamBuilder` 元件 (Widget)。
* **離線支援：** 裝置離線時仍可讀取與寫入快取資料，
  並在連線恢復後自動同步變更，
  無須自行建置離線佇列。離線持久化功能
  在 Android 與 Apple 平台上預設啟用，
  在 Web 上也可以啟用。
* **彈性且可演進的資料：** 無須預先定義結構描述，
  就能儲存巢狀或半結構化的資料。
* **自動擴充：** 在流量成長時無須
  佈建或管理伺服器。

若要將 Cloud Firestore 加入專案，請執行：

```console
$ flutter pub add cloud_firestore
```

接著依照 [Cloud Firestore 快速入門][firestore-quickstart]
來設定你的資料庫。

:::note
對於新的應用程式，Firebase 建議使用 Cloud Firestore 作為 NoSQL 資料庫，
而非 [Firebase Realtime Database][realtime-db]，
除非你的應用程式只需要對小型、頻繁的狀態更新
（例如在線狀態指示器）進行低延遲同步。
:::

## 以 Firebase SQL Connect 處理 SQL 資料

對於結構化的關聯式資料，例如電商店面、
預約系統、個人財務追蹤工具或庫存系統，
建議預設選擇 [Firebase SQL Connect][]（前身為 Firebase Data Connect）。
SQL Connect 以 Cloud SQL 上完全託管的
PostgreSQL 資料庫作為後盾。你以 GraphQL 定義結構描述、查詢
與變更操作 (mutation)，將它們部署到伺服器，
再透過由 [`firebase_data_connect`][] 套件驅動、
自動產生且型別安全的 Dart SDK，從 Flutter 應用程式呼叫。

主要功能包括：

* **關聯式資料：** 為具有關聯的實體（例如使用者、訂單與商品）建立模型，
  並跨實體進行查詢。
* **嚴格的結構描述：** 在資料庫中強制執行資料型別、關聯式約束
  與外部索引鍵 (foreign key)。
* **型別安全的產生式 SDK：** 針對每個預先定義的
  伺服器查詢與變更操作呼叫產生的 Dart 方法，無須撰寫原始查詢
  或手動重複定義資料模型。由於 SQL Connect 直接依據你的後端結構描述
  產生用戶端 SDK，你的 Flutter 應用程式
  能與資料庫保持同步，不會出現跨語言的結構描述偏移。
* **即時更新：** 訂閱查詢，在資料變更時
  自動或依設定重新整理。
* **可選的查詢快取：** 在用戶端快取查詢回應，
  以減少網路請求，並在離線時讀取快取結果。
* **向量搜尋：** 在你的關聯式資料之上，
  建置由 AI 驅動的功能，例如語意搜尋。

若要將 SQL Connect 插件加入專案，請執行：

```console
$ flutter pub add firebase_data_connect
```

接著，請依照指南，在 SQL Connect 中
[使用產生的 Flutter SDK][sql-connect-flutter]。

## 在本機使用 SQLite 或鍵值儲存

如果你的資料不需要離開裝置，
就可以在沒有雲端後端的情況下將它儲存在本機：

* **SQLite：** 在裝置上儲存並查詢大量結構化的關聯式
  資料。直接使用 SQL 查詢時可用 [`sqflite`][]；
  若需要型別安全的 Dart 查詢、響應式資料串流，以及
  跨行動、桌面與 Web 的結構描述遷移，可用
  [`drift`][]。想看逐步範例，請參考
  [使用 SQLite 持久化資料][sqlite-recipe]，或閱讀
  [持久化儲存架構：SQL][sql-architecture]，了解
  如何在較大型的應用程式中規劃本機資料庫層。
* **鍵值儲存：** 以
  [`shared_preferences`][] 套件儲存少量的簡單資料，
  例如使用者偏好設定。你可以從
  [將鍵值資料儲存到磁碟][key-value-recipe] 這份食譜開始，或參考
  [持久化儲存架構：鍵值資料][key-value-architecture]。
  若要儲存驗證權杖或加密紀錄等敏感資料，
  請改用 [`flutter_secure_storage`][]。

預設情況下，裝置端的 SQLite 與鍵值套件只會把資料儲存在
本機裝置上，因此資料不會跨裝置同步，
若使用者解除安裝你的應用程式，且沒有備份或同步服務，資料也不會保留。
如果使用者期望能跨裝置，或在更換手機後
自動取得自己的資料，請改用 Cloud Firestore 或
Firebase SQL Connect 這類雲端資料庫。

## 結合雲端與本機儲存

你不需要只選擇一種選項。
例如，你的應用程式可以使用 Cloud Firestore 或 Firebase SQL Connect
處理共享、同步的資料，同時以 `shared_preferences` 儲存
裝置專屬的設定，像是深色模式開關。
若想了解如何結合本機與遠端資料來源，讓應用程式在沒有網路連線時
仍能正常運作，請參考
[離線優先支援][offline-first]。

Cloud Firestore 與 Firebase SQL Connect 也都能搭配
其他 Firebase 服務使用，包括
[Firebase Authentication][firebase-auth]（[`firebase_auth`][]）、
[Cloud Storage for Firebase][firebase-storage]（[`firebase_storage`][]）
以及 [Firebase AI Logic][firebase-ai]（[`firebase_ai`][]）。
例如，你的應用程式可以拍攝收據或檢查照片、
上傳到 Cloud Storage、以 Firebase AI Logic 擷取結構化欄位，
再將產生的紀錄同步到 Cloud Firestore
或 SQL Connect，全部都在同一個專案內完成。

如果你的應用程式需要自訂的後端邏輯，也可以撰寫
[以 Dart 開發的 Cloud Functions for Firebase 或後端伺服器][dart-server]，
並在 Flutter 用戶端與後端之間，共用同一個 Dart 套件
來處理資料模型、序列化與驗證邏輯。

## 後續步驟

若要開始使用雲端資料庫進行開發，請參考以下資源：

* [將 Firebase 加入你的 Flutter 應用程式][firebase-setup]
* [Flutter 的 Firebase][firebase-page]
* [Cloud Firestore 入門][firestore-quickstart]
* [適用於 Flutter 的 Firebase SQL Connect][sql-connect-flutter]

[Cloud Firestore]: https://firebase.google.com/docs/firestore
[`cloud_firestore`]: https://pub.dev/packages/cloud_firestore
[dart-server]: https://dart.dev/server#sharing-code-between-flutter-apps-and-dart-backends
[`drift`]: https://pub.dev/packages/drift
[firebase-ai]: https://firebase.google.com/docs/ai-logic/get-started
[`firebase_ai`]: https://pub.dev/packages/firebase_ai
[firebase-auth]: https://firebase.google.com/docs/auth/flutter/start
[`firebase_auth`]: https://pub.dev/packages/firebase_auth
[`firebase_data_connect`]: https://pub.dev/packages/firebase_data_connect
[firebase-page]: /data-and-backend/firebase
[firebase-setup]: https://firebase.google.com/docs/flutter/setup
[Firebase SQL Connect]: https://firebase.google.com/docs/sql-connect
[firebase-storage]: https://firebase.google.com/docs/storage/flutter/start
[`firebase_storage`]: https://pub.dev/packages/firebase_storage
[firestore-quickstart]: https://firebase.google.com/docs/firestore/quickstart
[firestore-rules]: https://firebase.google.com/docs/firestore/security/get-started
[`flutter_secure_storage`]: https://pub.dev/packages/flutter_secure_storage
[key-value-architecture]: /app-architecture/design-patterns/key-value-data
[key-value-recipe]: /cookbook/persistence/key-value
[offline-first]: /app-architecture/design-patterns/offline-first
[realtime-db]: https://firebase.google.com/docs/database/flutter/start
[`shared_preferences`]: https://pub.dev/packages/shared_preferences
[`sqflite`]: https://pub.dev/packages/sqflite
[sql-architecture]: /app-architecture/design-patterns/sql
[sql-connect-flutter]: https://firebase.google.com/docs/sql-connect/flutter-sdk
[sqlite-recipe]: /cookbook/persistence/sqlite

