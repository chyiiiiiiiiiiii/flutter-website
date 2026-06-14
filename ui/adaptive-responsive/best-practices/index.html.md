# 自適應設計最佳實踐

> 自適應設計的一些最佳實踐總結。



自適應設計的推薦最佳實踐包括：

## 設計考量

### 拆解你的元件 (Widgets)

在設計應用程式時，盡量將大型、複雜的元件 (Widgets) 拆解為更小、更簡單的元件。

重構元件 (Widgets) 可以透過共用核心程式碼片段，降低採用自適應 UI 的複雜度。這麼做還有其他好處：

* 就效能而言，擁有大量小型 `const` 元件 (Widgets) 比起大型、複雜的元件 (Widgets) 能提升重建速度。
* Flutter 可以重複使用 `const` 元件 (Widget) 實例，而大型複雜元件在每次重建時都必須重新建立。
* 從程式碼健康性的角度來看，將 UI 組織成小型、易於管理的片段，有助於降低每個 `Widget` 的複雜度。較不複雜的 `Widget` 更易於閱讀、重構，也較不容易出現意外行為。

想進一步了解，請參考 [General approach][General approach] 中的自適應設計三步驟。

[General approach]: /ui/adaptive-responsive/general

### 針對各種裝置型態發揮優勢設計

除了螢幕尺寸外，你也應該花時間考慮不同裝置型態的獨特優勢與限制。多平台應用程式不一定要在所有平台都提供完全相同的功能。請思考在某些裝置類別上，是否更適合聚焦於特定功能，甚至移除某些功能。

舉例來說，行動裝置具備可攜性且有相機，但不適合進行細緻的創意工作。有鑑於此，你可以在行動裝置 UI 上著重於內容擷取與地點標記，而在平板或桌面 UI 上則專注於內容的整理與操作。

另一個例子是善用網頁平台極低的分享門檻。如果你要部署網頁應用程式，請決定要支援哪些[深層連結 (deep links)][deep links]，並以此設計你的導覽路由。

這裡的重點是思考每個平台最擅長的地方，並尋找是否有獨特的能力可以加以利用。

[deep links]: /ui/navigation/deep-linking

### 先解決觸控體驗

打造優秀的觸控 UI 往往比傳統桌面 UI 更具挑戰性，部分原因在於缺乏右鍵、滾輪或鍵盤快捷鍵等輸入加速器。

面對這個挑戰，一個方法是先專注於設計出優良的觸控導向 UI。你仍然可以利用桌面目標平台進行大部分測試，以加快迭代速度。但請記得經常切換到行動裝置，確認一切操作體驗都正確。

當觸控介面打磨完善後，你可以針對滑鼠使用者調整視覺密度，並逐步加入其他輸入方式。將這些輸入方式視為加速器——讓任務執行更快的替代方案。最重要的是，考慮使用者在使用特定輸入裝置時的預期，並在你的應用程式中體現這些預期。

## 實作細節

### 不要鎖定應用程式的螢幕方向

自適應應用程式應該能在不同尺寸與形狀的視窗下有良好表現。雖然在手機上將應用程式鎖定為直向模式有助於縮小最小可行產品（MVP）的範圍，但這會增加日後讓應用程式自適應的難度。

例如，假設手機只會以全螢幕直向模式顯示你的應用程式，這並非保證。多視窗應用程式支援已越來越普遍，摺疊裝置也有許多最佳使用情境是多個應用程式並排運作。

如果你真的必須將應用程式鎖定為直向模式（但不建議這麼做），請使用 `Display` API，而非像 `MediaQuery` 這類方法來取得螢幕的實體尺寸。

總結如下：

  * 鎖定螢幕方向可能對某些使用者造成[無障礙問題][an accessibility issue]
  * Android 大尺寸裝置分級在[最低層級][lowest level]就要求支援直向與橫向
  * Android 裝置可以[覆寫鎖定螢幕][override a locked screen]
  * Apple 指南建議[盡量同時支援兩種方向][aim to support both orientations]

[an accessibility issue]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[aim to support both orientations]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[lowest level]:  https://developer.android.com/docs/quality-guidelines/large-screen-app-quality#T3-8
[override a locked screen]: https://developer.android.com/guide/topics/large-screens/large-screen-compatibility-mode#per-app_overrides

### 避免以裝置方向為基礎的版面配置

避免使用 `MediaQuery` 的 orientation 欄位，或在元件樹頂層附近使用 `OrientationBuilder` 來切換不同的應用程式版面配置。這與不建議檢查裝置類型來判斷螢幕尺寸的原則類似。裝置的方向並不一定能告訴你應用程式視窗實際擁有多少空間。

請改用 `MediaQuery` 的 `sizeOf` 或 `LayoutBuilder`，如 [General approach][General approach] 頁面所述。然後使用像 [Material][Material] 推薦的自適應斷點。

[General approach]: /ui/adaptive-responsive/general#
[Material]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

### 不要佔滿所有水平空間

應用程式若將視窗的全部寬度用於顯示方塊或文字欄位，在大螢幕上體驗會很差。

想了解如何避免這種情況，請參考 [Layout with GridView][Layout with GridView]。

[Layout with GridView]: /ui/adaptive-responsive/large-screens#layout-with-gridview

### 避免檢查硬體類型

在做版面配置決策時，避免撰寫檢查當前裝置是「手機」還是「平板」或其他類型裝置的程式碼。

你的應用程式實際獲得的顯示空間，並不一定等於裝置的全螢幕尺寸。Flutter 可以在許多不同平台上執行，你的應用程式可能在 ChromeOS 上的可調整大小視窗中執行，也可能在平板的多視窗模式下與其他應用程式並排，甚至在手機上的子母畫面（picture-in-picture）中。因此，裝置類型與應用程式視窗大小並沒有強烈的關聯。

請改用 `MediaQuery` 來取得應用程式目前運行視窗的尺寸。

這不僅對 UI 程式碼有幫助。想了解如何將裝置能力抽象化，有助於你的業務邏輯程式碼，請參考 2022 年 Google I/O 的演講：[Flutter lessons for federated plugin development][Flutter lessons for federated plugin development]。

[Flutter lessons for federated plugin development]: https://youtube.com/watch?v=GAnSNplNpCA

### 支援多種輸入裝置

應用程式應該支援基本的滑鼠、觸控板與鍵盤快捷鍵。最常見的使用流程應支援鍵盤導覽，以確保無障礙性。特別是在大型裝置上，你的應用程式應遵循鍵盤無障礙最佳實踐。

Material 函式庫提供了對觸控、滑鼠與鍵盤互動的優異預設行為元件 (Widgets)。

想了解如何為自訂元件 (Widgets) 加入這些支援，請參考 [User input & accessibility][User input & accessibility]。

[User input & accessibility]: /ui/adaptive-responsive/input

### 還原清單狀態

若要在裝置方向改變時，維持清單的捲動位置（前提是清單版面配置未改變），請使用 [`PageStorageKey`][] 類別。[`PageStorageKey`][] 會在元件 (Widget) 被銷毀後將元件狀態持久化到儲存空間，並在重新建立時還原狀態。

你可以在 [Wonderous app][Wonderous app] 中看到這個用法的範例，其將清單狀態儲存在 `SingleChildScrollView` 元件 (Widget) 中。

如果 `List` 元件 (Widget) 在裝置方向改變時會改變版面配置，你可能需要做一些運算（[範例][example]）來在螢幕旋轉時調整捲動位置。

[example]: https://github.com/gskinnerTeam/flutter-wonderous-app/blob/34e49a08084fbbe69ed67be948ab00ef23819313/lib/ui/screens/collection/widgets/_collection_list.dart#L39
[`PageStorageKey`]: https://api.flutter.dev/flutter/widgets/PageStorageKey-class.html
[Wonderous app]: https://github.com/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/screens/wonder_events/widgets/_events_list.dart#L64

## 儲存應用程式狀態

當裝置旋轉、改變視窗大小，或摺疊/展開時，應用程式應保留或還原[應用程式狀態][app state]。
預設情況下，應用程式應維持狀態。

如果你的應用程式在裝置設定變更時遺失狀態，請確認你所使用的插件與原生擴充元件支援該裝置類型，例如大型螢幕。有些原生擴充元件在裝置位置變更時可能會遺失狀態。

想了解實際案例，請參考 Medium 免費文章 [Developing Flutter apps for Large screens][article] 中的
[Problem: Folding/unfolding causes state loss][state-loss]。

[app state]: https://developer.android.com/jetpack/compose/state#store-state
[article]: https://blog.flutter.dev/developing-flutter-apps-for-large-screens-53b7b0e17f10
[state-loss]: https://blog.flutter.dev/developing-flutter-apps-for-large-screens-53b7b0e17f10#:~:text=Problem%3A%20Folding/Unfolding%20causes%20state%2Dloss

