---
title: 自適應設計最佳實踐
description: >-
  自適應設計的一些最佳實踐總結。
shortTitle: 最佳實踐
---

自適應設計的推薦最佳實踐包括：

## 設計考量

### 拆解你的元件 (Widgets)

在設計應用程式時，請嘗試將大型、複雜的元件拆解為更小、更簡單的元件。

重構元件可以透過共用核心程式碼片段，降低採用自適應 UI 的複雜度。這樣做還有其他好處：

* 在效能方面，擁有大量小型 `const` 元件比起大型複雜元件，能提升重建（rebuild）速度。
* Flutter 可以重複利用 `const` 元件實例，而大型複雜元件則每次重建都必須重新建立。
* 就程式碼健康度而言，將 UI 組織成較小的單元，有助於降低每個 `Widget` 的複雜度。較不複雜的 `Widget` 更易於閱讀、重構，也較不容易出現意外行為。

想了解更多，請參考 [General approach][General approach] 中的自適應設計三步驟。

[General approach]: /ui/adaptive-responsive/general

### 針對各種裝置型態發揮優勢設計

除了螢幕尺寸之外，你也應該花時間考慮不同裝置型態的獨特優勢與限制。你的多平台應用程式不一定要在所有平台上提供完全相同的功能。請思考在某些裝置類型上，是否更適合聚焦於特定能力，甚至移除某些功能。

舉例來說，行動裝置具備可攜性且有相機，但不適合進行細緻的創作工作。基於這一點，你可以讓行動版 UI 著重於內容擷取與地點標記，而平板或桌面版 UI 則著重於內容的整理或操作。

另一個例子是善用網頁平台極低的分享門檻。如果你要部署 Web 應用程式，請決定要支援哪些 [深層連結 (deep links)][deep links]，並以此設計你的導覽路由。

重點是思考每個平台最擅長什麼，並找出能否善用其獨特能力。

[deep links]: /ui/navigation/deep-linking

### 先解決觸控體驗

打造優秀的觸控 UI 往往比傳統桌面 UI 更具挑戰，部分原因在於缺乏像右鍵、滾輪或鍵盤快捷鍵等輸入加速器。

面對這個挑戰，一個方法是先專注於設計出色的觸控導向 UI。你仍然可以利用桌面目標平台進行大部分測試，以加快迭代速度。但請記得經常切換到行動裝置，確認實際操作體驗是否合適。

當觸控介面調整完善後，你可以針對滑鼠使用者微調視覺密度，然後再逐步加入其他輸入方式。將這些其他輸入方式視為加速器——讓任務完成更快的替代方案。最重要的是思考使用者在使用特定輸入裝置時的預期行為，並在應用程式中反映這些預期。

## 實作細節

### 不要鎖定應用程式的螢幕方向

自適應應用程式應該能在不同大小與形狀的視窗中有良好表現。雖然在手機上鎖定直向模式有助於縮小 MVP（最小可行產品）的範圍，但未來要讓應用程式自適應時，反而會增加開發難度。

舉例來說，假設手機只會以全螢幕直向模式顯示你的應用程式，這並非保證。多視窗應用支援已越來越普遍，摺疊裝置也有許多最佳使用情境是多個應用程式並排運作。

如果你真的必須鎖定直向模式（但建議不要），請使用 `Display` API，而非像 `MediaQuery` 這類方式來取得螢幕的實體尺寸。

總結如下：

  * 鎖定螢幕方向可能對某些使用者造成[無障礙問題][an accessibility issue]
  * Android 大尺寸裝置要求最低層級必須同時支援直向與橫向[詳見說明][lowest level]
  * Android 裝置可以[覆寫鎖定螢幕][override a locked screen]
  * Apple 指南建議[盡量支援雙向螢幕][aim to support both orientations] 

[an accessibility issue]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[aim to support both orientations]: https://www.w3.org/WAI/WCAG21/Understanding/orientation.html
[lowest level]:  {{site.android-dev}}/docs/quality-guidelines/large-screen-app-quality#T3-8
[override a locked screen]: {{site.android-dev}}/guide/topics/large-screens/large-screen-compatibility-mode#per-app_overrides

### 避免以裝置方向為基礎的版面配置

請避免在元件樹頂層使用 `MediaQuery` 的 orientation 欄位或 `OrientationBuilder` 來切換不同的應用程式版面配置。這與不建議檢查裝置型態來判斷螢幕大小的原則相同。裝置的方向（orientation）並不一定能告訴你應用程式視窗實際擁有多少空間。

建議改用 `MediaQuery` 的 `sizeOf` 或 `LayoutBuilder`，如 [General approach][General approach] 頁面所述。然後再依據 [Material][Material] 推薦的自適應斷點（breakpoints）進行設計。

[General approach]: /ui/adaptive-responsive/general#
[Material]: https://m3.material.io/foundations/layout/applying-layout/window-size-classes

### 不要佔滿所有水平空間

應用程式若將視窗的全部寬度都用來顯示方塊或文字欄位，當在大螢幕上執行時，體驗會不佳。

想了解如何避免此問題，請參考 [Layout with GridView][Layout with GridView]。

[Layout with GridView]: /ui/adaptive-responsive/large-screens#layout-with-gridview

### 避免檢查硬體型態

在做版面配置決策時，請避免撰寫檢查當前裝置是否為「手機」或「平板」等型態的程式碼。

應用程式實際獲得的顯示空間，並不總是與裝置的全螢幕尺寸綁定。Flutter 可以在多種平台上運行，你的應用程式可能在 ChromeOS 上以可調整大小的視窗執行、在平板的多視窗模式下與其他應用程式並排，甚至在手機上的子母畫面（picture-in-picture）中運作。因此，裝置型態與應用程式視窗大小並沒有強烈關聯。

建議改用 `MediaQuery` 來取得應用程式目前運行視窗的大小。

這不僅對 UI 程式碼有幫助。想了解如何將裝置能力抽象化以協助商業邏輯程式碼，請參考 2022 Google I/O 的演講：[Flutter lessons for federated plugin development][Flutter lessons for federated plugin development]。
 
[Flutter lessons for federated plugin development]: {{site.youtube-site}}/watch?v=GAnSNplNpCA

### 支援多種輸入裝置

應用程式應支援基本的滑鼠、觸控板與鍵盤快捷鍵。最常見的使用流程應支援鍵盤導覽，以確保無障礙性。特別是在大型裝置上，應用程式應遵循鍵盤無障礙最佳實踐。

Material 函式庫提供了對觸控、滑鼠和鍵盤互動的優秀預設行為元件。

想了解如何將這些支援加入自訂元件，請參考 [User input & accessibility][User input & accessibility]。

[User input & accessibility]: /ui/adaptive-responsive/input

### 還原清單狀態

若要在裝置方向改變時，維持版面配置不變的清單捲動位置，請使用 [`PageStorageKey`][`PageStorageKey`] 類別。[`PageStorageKey`][`PageStorageKey`] 會在元件銷毀後將狀態儲存至儲存空間，並在重新建立時還原狀態。

你可以在 [Wonderous app][Wonderous app] 範例中看到這個做法，其將清單狀態儲存在 `SingleChildScrollView` 元件中。

如果 `List` 元件在裝置方向改變時會變更版面配置，你可能需要做一些運算（[範例][example]）來在螢幕旋轉時調整捲動位置。

[example]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/34e49a08084fbbe69ed67be948ab00ef23819313/lib/ui/screens/collection/widgets/_collection_list.dart#L39
[`PageStorageKey`]: {{site.api}}/flutter/widgets/PageStorageKey-class.html
[Wonderous app]: {{site.github}}/gskinnerTeam/flutter-wonderous-app/blob/8a29d6709668980340b1b59c3d3588f123edd4d8/lib/ui/screens/wonder_events/widgets/_events_list.dart#L64

## 儲存應用程式狀態

應用程式應在裝置旋轉、視窗大小變更或摺疊/展開時，保留或還原[應用程式狀態][app state]。  
預設情況下，應用程式應維持狀態。

如果你的應用程式在裝置配置變更時遺失狀態，請確認應用程式所使用的插件與原生擴充是否支援該裝置型態（例如大螢幕）。部分原生擴充在裝置位置變更時可能會遺失狀態。

想了解真實案例，請參考 Medium 上免費文章 [Developing Flutter apps for Large screens][article] 中的  
[Problem: Folding/unfolding causes state loss][state-loss]。

[app state]: {{site.android-dev}}/jetpack/compose/state#store-state
[article]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10
[state-loss]: {{site.flutter-medium}}/developing-flutter-apps-for-large-screens-53b7b0e17f10#:~:text=Problem%3A%20Folding/Unfolding%20causes%20state%2Dloss
