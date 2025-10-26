--- 
title: "在 Android 上還原狀態"
description: "說明如何在 Android 作業系統終止應用程式後，還原您的 Android 應用程式狀態。"
---

當使用者執行行動應用程式，然後切換到其他應用程式時，
第一個應用程式會被移到背景執行，稱為 _背景化_（backgrounded）。
作業系統（無論是 iOS 或 Android）都可能會為了釋放記憶體並提升前景應用程式的效能，
而終止這個背景化的應用程式。

當使用者再次選擇該應用程式，將其帶回前景時，作業系統會重新啟動它。
但如果您沒有在應用程式被終止前，設定好儲存應用程式狀態的方法，
那麼這些狀態就會遺失，應用程式會從頭開始。
這會導致使用者失去他們預期的連續體驗，這顯然不是理想的情況。
（想像一下，在填寫一個冗長表單時，還沒點擊 **提交** 前就被電話打斷。）

那麼，該如何還原應用程式的狀態，讓它看起來就像被送到背景前一樣呢？

Flutter 針對這個問題提供了解決方案，
可透過 [`RestorationManager`][`RestorationManager`] (and related classes)
於 [services][services] 函式庫中實現。
利用 `RestorationManager`，Flutter 框架會在狀態變更時即時將狀態資料提供給引擎，
因此當作業系統發出即將終止應用程式的訊號時，
應用程式能在短暫時間內完成準備。

:::secondary Instance state vs long-lived state
  什麼時候該使用 `RestorationManager`，
  什麼時候又該將狀態儲存到長期儲存空間？
  _Instance state_（也稱為 _短期_ 或 _暫態_ 狀態），
  包括尚未提交的表單欄位值、目前選取的分頁等。
  在 Android 上，這類狀態限制為 1 MB，
  若超過此限制，應用程式會在原生程式碼中發生 `TransactionTooLargeException`
  錯誤而當機。
:::

[state]: /data-and-backend/state-mgmt/ephemeral-vs-app

## 概覽

您只需完成幾個步驟，即可啟用狀態還原功能：

1. 為像是 `CupertinoApp`、`MaterialApp` 或 `WidgetsApp` 這類類別
   定義 `restorationScopeId`。

2. 對於支援的元件（Widget），如 [`TextField`][`TextField`] 和 [`ScrollView`][`ScrollView`]，
   定義 `restorationId`。這會自動啟用這些元件的內建狀態還原功能。

3. 對於自訂元件（Widget），
   您必須決定要還原哪些狀態，並將該狀態存放於 [`RestorableProperty`][`RestorableProperty`] 中。
   （Flutter API 提供了多種不同資料型態的子類別。）
   在使用 [`RestorationMixin`][`RestorationMixin`] 的 `State` 類別中
   定義這些 `RestorableProperty` 元件。
   並在 `restoreState` 方法中，將這些元件註冊到 mixin。

4. 如果您有使用任何 Navigator API（如 `push`、`pushNamed` 等），
   請遷移至名稱中帶有 "restorable" 的 API
   （如 `restorablePush`、`restorablePushNamed` 等），以還原導覽堆疊。

其他注意事項：

* 提供 `restorationScopeId` 給
  `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`
  會自動透過注入 `RootRestorationScope` 啟用狀態還原功能。
  若您需要在 app class 之上還原狀態，
  請手動注入 `RootRestorationScope`。

* **`restorationId` 與 `restorationScopeId` 的差異：** 接受 `restorationScopeId` 的元件
  會建立一個新的 `restorationScope`（新的 `RestorationBucket`），
  其所有子元件都會將狀態儲存於其中。
  `restorationId` 則表示該元件（及其子元件）會將資料儲存在外層的 bucket。

[a bit of extra setup]: {{site.api}}/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[`restorationId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationId.html
[`restorationScopeId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationScopeId.html
[`RestorationMixin`]: {{site.api}}/flutter/widgets/RestorationMixin-mixin.html
[`RestorationScope`]: {{site.api}}/flutter/widgets/RestorationScope-class.html
[`restoreState`]: {{site.api}}/flutter/widgets/RestorationMixin/restoreState.html
[VeggieSeasons]: https://github.com/flutter/demos/tree/main/veggieseasons

## 還原導覽狀態

如果您希望應用程式返回使用者最近瀏覽的特定路由
（例如購物車頁面），那麼您也必須為導覽實作狀態還原。

如果您直接使用 Navigator API，
請將標準方法遷移至帶有 "restorable" 的方法。
例如，將 `push` 替換為 [`restorablePush`][`restorablePush`]。

## 測試狀態還原

要測試狀態還原功能，請將您的行動裝置設定為
在應用程式進入背景後不再儲存狀態。
若要了解如何在 iOS 與 Android 上進行設定，
請參考 [Testing state restoration][Testing state restoration]，
該內容位於 [`RestorationManager`][`RestorationManager`] 頁面。

:::warning
測試完畢後，別忘了重新啟用
裝置的狀態儲存功能！
:::

[Testing state restoration]: {{site.api}}/flutter/services/RestorationManager-class.html#testing-state-restoration
[`RestorationBucket`]: {{site.api}}/flutter/services/RestorationBucket-class.html
[`RestorationManager`]: {{site.api}}/flutter/services/RestorationManager-class.html
[services]: {{site.api}}/flutter/services/services-library.html

## 其他資源

如需更多有關狀態還原的資訊，
請參考以下資源：

* 若想進一步了解短期與長期狀態的差異，
  請參閱 [Differentiate between ephemeral state
  and app state][state]。

* 您也可以在 pub.dev 上尋找支援狀態還原的套件，例如 [`statePersistence`][`statePersistence`]。

* 若需更多有關導覽與 [`go_router`][`go_router`] 套件的資訊，
  請參考 [Navigation and routing][Navigation and routing]
  以及 pub.dev 上的 [State restoration][State restoration] 主題。

[`go_router`]: {{site.pub}}/packages/go_router
[State restoration]: {{site.pub-api}}/go_router/latest/topics/State%20restoration-topic.html
[Navigation and routing]: /ui/navigation
[`RestorableProperty`]: {{site.api}}/flutter/widgets/RestorableProperty-class.html
[`restorablePush`]: {{site.api}}/flutter/widgets/Navigator/restorablePush.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView/restorationId.html
[`statePersistence`]: {{site.pub-pkg}}/state_persistence
[`TextField`]: {{site.api}}/flutter/material/TextField/restorationId.html
