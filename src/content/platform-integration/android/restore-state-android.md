--- 
title: "在 Android 上還原狀態"
description: "如何在 Android 應用程式被作業系統終止後還原其狀態。"
---

當使用者執行行動應用程式，然後選擇切換至其他
應用程式時，第一個應用程式會被移至背景，
也就是「背景執行」。作業系統（包含 iOS 和 Android）
可能會終止背景中的應用程式，以釋放記憶體並
提升前景應用程式的效能。

當使用者再次選擇該應用程式，將其
帶回前景時，作業系統會重新啟動它。
但除非你事先建立了保存
應用程式狀態的機制，否則
原本的狀態將會遺失，應用程式會從頭開始執行。
這會讓使用者失去預期的連續體驗，
顯然並不理想。
（想像你正在填寫一個冗長的表單，在按下 **提交** 之前
被電話中斷。）

那麼，如何還原應用程式的狀態，讓它
看起來就像被移到背景之前一樣？

Flutter 針對此提供了解決方案，
可使用 [`RestorationManager`][`RestorationManager`] (and related classes)
於 [services][services] 函式庫中。
透過 `RestorationManager`，Flutter 框架
會在狀態變更時即時將狀態資料提供給引擎，
讓應用程式在作業系統發出即將終止的訊號時，
能在短暫的準備時間內完成狀態保存。

:::secondary Instance state vs long-lived state
  什麼時候應該使用 `RestorationManager`，
  什麼時候又該將狀態保存至長期儲存？
  _Instance state_
  （也稱為 _短期_ 或 _暫時性_ 狀態），
  包含尚未提交的表單欄位值、目前選取的分頁等。
  在 Android 上，這類狀態限制為 1 MB，
  若超過此限制，應用程式會因原生程式碼中的 `TransactionTooLargeException`
  錯誤而崩潰。
:::

[state]: /data-and-backend/state-mgmt/ephemeral-vs-app

## 概覽

只需完成幾個步驟，即可啟用狀態還原：

1. 為像 `CupertinoApp`、`MaterialApp` 或 `WidgetsApp`
   這類類別定義 `restorationScopeId`。

2. 為支援的元件（Widgets）定義 `restorationId`，
   例如 [`TextField`][`TextField`] 和 [`ScrollView`][`ScrollView`]。
   這會自動啟用這些元件的內建狀態還原功能。

3. 對於自訂元件（Widgets），
   你必須決定要還原哪些狀態，
   並將這些狀態存放於 [`RestorableProperty`][`RestorableProperty`] 中。
   （Flutter API 提供多種子類別以支援不同資料型態。）
   在使用 [`RestorationMixin`][`RestorationMixin`] 的 `State` 類別中
   定義這些 `RestorableProperty` 元件。
   並在 `restoreState` 方法中向 mixin 註冊這些元件。

4. 如果你使用任何 Navigator API（如 `push`、`pushNamed` 等），
   請遷移至名稱中包含 "restorable" 的 API
   （如 `restorablePush`、`restorablePushNamed` 等），
   以還原導覽堆疊。

其他注意事項：

* 為 `MaterialApp`、`CupertinoApp` 或 `WidgetsApp`
  提供 `restorationScopeId` 時，
  會自動啟用狀態還原，並注入 `RootRestorationScope`。
  若需在 app class 之上還原狀態，
  請手動注入 `RootRestorationScope`。

* **`restorationId` 與 `restorationScopeId` 的差異：** 接受
  `restorationScopeId` 的元件會建立新的 `restorationScope`
  （新的 `RestorationBucket`），所有子元件都將狀態存入其中。
  `restorationId` 則表示該元件（及其子元件）會將資料存入外層 bucket。

[a bit of extra setup]: {{site.api}}/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[`restorationId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationId.html
[`restorationScopeId`]: {{site.api}}/flutter/widgets/RestorationScope/restorationScopeId.html
[`RestorationMixin`]: {{site.api}}/flutter/widgets/RestorationMixin-mixin.html
[`RestorationScope`]: {{site.api}}/flutter/widgets/RestorationScope-class.html
[`restoreState`]: {{site.api}}/flutter/widgets/RestorationMixin/restoreState.html
[VeggieSeasons]: https://github.com/flutter/demos/tree/main/veggieseasons

## 還原導覽（navigation）狀態

如果你希望應用程式能回到使用者最近瀏覽的特定路由
（例如購物車頁面），則必須為導覽（navigation）實作
狀態還原。

若你直接使用 Navigator API，
請將標準方法遷移至可還原狀態的方法（名稱中有 "restorable"）。
例如，將 `push` 替換為 [`restorablePush`][`restorablePush`]。

## 測試狀態還原

要測試狀態還原功能，請將你的行動裝置設定為
在應用程式進入背景後不保存狀態。
如需在 iOS 和 Android 上設定的方法，
請參考 [Testing state restoration][Testing state restoration]
於 [`RestorationManager`][`RestorationManager`] 頁面。

:::warning
測試完成後，請記得重新啟用
裝置的狀態儲存功能！
:::

[Testing state restoration]: {{site.api}}/flutter/services/RestorationManager-class.html#testing-state-restoration
[`RestorationBucket`]: {{site.api}}/flutter/services/RestorationBucket-class.html
[`RestorationManager`]: {{site.api}}/flutter/services/RestorationManager-class.html
[services]: {{site.api}}/flutter/services/services-library.html

## 其他資源

如需更多狀態還原相關資訊，
請參考以下資源：

* 想了解短期與長期狀態的差異，
  請參考 [Differentiate between ephemeral state
  and app state][state]。

* 你也可以在 pub.dev 上尋找支援狀態還原的套件，
  例如 [`statePersistence`][`statePersistence`]。

* 若需更多導覽（navigation）及
  [`go_router`][`go_router`] 套件的資訊，請參考 [Navigation and routing][Navigation and routing]
  以及 pub.dev 上的 [State restoration][State restoration] 主題。

[`go_router`]: {{site.pub}}/packages/go_router
[State restoration]: {{site.pub-api}}/go_router/latest/topics/State%20restoration-topic.html
[Navigation and routing]: /ui/navigation
[`RestorableProperty`]: {{site.api}}/flutter/widgets/RestorableProperty-class.html
[`restorablePush`]: {{site.api}}/flutter/widgets/Navigator/restorablePush.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView/restorationId.html
[`statePersistence`]: {{site.pub-pkg}}/state_persistence
[`TextField`]: {{site.api}}/flutter/material/TextField/restorationId.html
