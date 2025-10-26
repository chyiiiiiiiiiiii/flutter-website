---
title: 休閒遊戲工具包
description: >-
  了解如何使用 Flutter 進行免費且開源的多平台 2D 遊戲開發。
---

Flutter 休閒遊戲工具包（Casual Games Toolkit）整合了全新與現有的資源，
協助你加速在行動平台上開發遊戲。

:::recommend
立即查看 [Flutter 3.22 的最新遊戲更新與資源](#updates)！
:::

本頁將說明你可以在哪裡找到這些可用資源。

## 為什麼選擇 Flutter 開發遊戲？

Flutter 框架能為六大目標平台打造高效能應用程式，
涵蓋桌面、行動裝置與網頁。

憑藉 Flutter 跨平台開發、高效能與開源授權的優勢，非常適合用於遊戲開發。

休閒遊戲大致可分為兩類：回合制遊戲（turn-based games）
與即時遊戲（real-time games）。
你可能對這兩種類型的遊戲都不陌生，
只是過去未曾以這種方式思考過。

_回合制遊戲_ 指的是面向大眾市場、規則與玩法簡單的遊戲。
這類遊戲包含桌遊、紙牌遊戲、益智遊戲與策略遊戲。
這些遊戲通常只需簡單的使用者輸入，
例如點擊卡牌或輸入數字、字母。
這類遊戲非常適合用 Flutter 開發。

_即時遊戲_ 則是指一連串動作需即時反應的遊戲。
例如無盡奔跑（endless runner）、賽車等遊戲。
你可能想打造具備進階功能的遊戲，例如碰撞偵測、
攝影機視角、遊戲主迴圈等。
這類遊戲可以考慮使用基於 Flutter 打造的開源遊戲引擎
[Flame 遊戲引擎][Flame game engine]。

## 工具包內容

休閒遊戲工具包提供以下免費資源：

* 一個儲存庫，內含三個全新遊戲範本，作為開發休閒遊戲的起點。

  1. 一個 [基礎遊戲範本][basic-template]，
     內容包含：

     * 主選單
     * 導覽
     * 設定
     * 關卡選擇
     * 玩家進度
     * 遊戲場次管理
     * 音效
     * 主題

  1. 一個 [紙牌遊戲範本][card-template]，
     包含基礎範本的所有內容，並額外提供：

     * 拖放功能
     * 遊戲狀態管理
     * 多人遊戲整合介面

  1. 一個與開源遊戲引擎 Flame 合作開發的
     [無盡奔跑（endless runner）範本][runner-template]。其實作內容包括：

     * FlameGame 基礎範本
     * 玩家操控
     * 碰撞偵測
     * 視差效果
     * 物件生成
     * 多種視覺特效

  1. 一款基於無盡奔跑範本開發的範例遊戲
     ——SuperDash。你可以在 iOS、Android 或 [網頁][web]上遊玩，
     [瀏覽其開源程式碼儲存庫][view the open source code repo]，或
     [閱讀該遊戲如何於 6 週內完成開發][read how the game was created in 6 weeks]。

* 整合所需服務的開發者指南。
* [Flame Discord][game-discord] 頻道連結。
  若你已有 Discord 帳號，可使用此 [直接連結][discord-direct]。

這些遊戲範本與 Cookbook 範例已做出特定選擇以加速開發。
它們包含了如 `provider`、`google_mobile_ads`、
`in_app_purchase`、`audioplayers`、`crashlytics`、`games_services` 等套件。
若你偏好其他套件，也可自行修改程式碼替換。

Flutter 團隊了解未來你可能會考慮遊戲變現，
因此已新增廣告與應用程式內購（in-app purchases）的 Cookbook 範例。

如 [Games][Games] 頁面所述，
當你將 Google 服務（如 [Cloud、Firebase][Cloud, Firebase] 與 [Ads][Ads]）整合進遊戲時，
可享有高達 $900 美元的優惠。

:::important
你必須將 Firebase 與 GCP 帳戶連結，才能使用 Firebase 服務的額度，
並於註冊時驗證你的商務電子郵件，以獲得額外 $100 美元（原本 $300 額度之外）。
有關廣告優惠，請[查詢你所在區域的資格][check your region's eligibility]。
:::

## 開始使用

準備好了嗎？開始步驟如下：

1. 若尚未安裝，請先[安裝 Flutter][install Flutter]。
1. [複製（clone）遊戲儲存庫][game-repo]。
1. 檢視你想建立的第一種遊戲類型的 `README` 檔案。

   * [基礎遊戲][basic-template-readme]
   * [紙牌遊戲][card-template-readme]
   * [奔跑遊戲][runner-template-readme]

1. [加入 Flame 社群 Discord 頻道][game-discord]
   (use the [direct link][discord-direct] if you already
   have a Discord account)。
1. 閱讀 Codelab 與 Cookbook 範例。

   * {{recipeIcon}} 使用 Cloud Firestore 建立 [多人遊戲][multiplayer-recipe]。
   * {{codelab}} 使用 Flutter 建立 [文字拼圖遊戲][word puzzle]。—**全新**
   * {{codelab}} 使用 Flutter 與 Flame 建立 [2D 物理遊戲][2D physics game]。—**全新**
   * {{codelab}} 使用 SoLoud [為你的 Flutter 遊戲加入音效與音樂][Add sound and music]。—**全新**
   * {{recipeIcon}} 讓你的遊戲更有趣，
     加入 [排行榜與成就][leaderboard-recipe]。
   * 透過 {{recipeIcon}}[遊戲內廣告][ads-recipe]
     與 {{codelab}} [應用程式內購][iap-recipe] 變現你的遊戲。
   * 使用
     {{recipeIcon}} [Firebase Authentication][firebase-auth] 為遊戲加入用戶驗證流程。
   * 透過
     {{recipeIcon}} [Firebase Crashlytics][firebase-crashlytics] 收集遊戲內崩潰與錯誤的分析資料。

1. 視需求註冊 AdMob、Firebase 與 Cloud 帳戶。
1. 開始撰寫你的遊戲！
1. 發佈到 Google Play 與 Apple Store。

[Add sound and music]: {{site.codelabs}}/codelabs/flutter-codelab-soloud
[2D physics game]: {{site.codelabs}}/codelabs/flutter-flame-forge2d
[word puzzle]: {{site.codelabs}}/codelabs/flutter-word-puzzle

## 範例遊戲

在 Google I/O 2022，Flutter 團隊
與 Very Good Ventures（VGV）都創作了新遊戲。

* VGV 使用 Flame 引擎開發了 [I/O Pinball 遊戲][pinball-game]。
  想了解這款遊戲，
  可參考 Medium 上的 [I/O Pinball Powered by Flutter and Firebase][I/O Pinball Powered by Flutter and Firebase]
  並[直接在瀏覽器遊玩][pinball-game]。

* Flutter 團隊則開發了 [I/O Flip][flip-game]，一款虛擬 [CCG] 遊戲。
  想進一步了解 I/O Flip，
  可參考 Google Developers Blog 上的
  [How It's Made: I/O FLIP adds a twist to a classic card game with generative AI][flip-blog]
  並[直接在瀏覽器遊玩][flip-game]。

## 其他資源

當你已熟悉這些遊戲範本後，
可探索社群推薦的其他資源。

{% assign pkgIcon = '<span class="material-symbols" aria-label="Package" translate="no">package_2</span>' %}
{% assign apiIcon = '<span class="material-symbols" aria-label="API documentation" translate="no">api</span>' %}
{% assign docIcon = '<span class="material-symbols" aria-label="Guide" translate="no">quick_reference_all</span>' %}
{% assign codelab = '<span class="material-symbols" aria-label="Codelab" translate="no">science</span>' %}
{% assign engine = '<span class="material-symbols" aria-label="Game engine" translate="no">manufacturing</span>' %}
{% assign toolIcon = '<span class="material-symbols" aria-label="Desktop application" translate="no">handyman</span>' %}
{% assign recipeIcon = '<span class="material-symbols" aria-label="Cookbook recipe" translate="no">book_5</span>' %}
{% assign assetsIcon = '<span class="material-symbols" aria-label="Game assets" translate="no">photo_album</span>' %}

:::secondary
{{pkgIcon}} Flutter 套件<br>
{{apiIcon}} API 文件<br>
{{codelab}} Codelab<br>
{{recipeIcon}} Cookbook 範例<br>
{{toolIcon}} 桌面應用程式<br>
{{assetsIcon}} 遊戲資源<br>
{{docIcon}} 指南<br>
:::

<table class="table table-striped">
<tr>
<th>功能</th>
<th>資源</th>
</tr>

<tr>
<td>動畫與精靈</td>
<td>

{{recipeIcon}} [特效][Special effects]<br>
{{toolIcon}} [Spriter Pro][Spriter Pro]<br>
{{pkgIcon}} [rive][rive]<br>
{{pkgIcon}} [spriteWidget][spriteWidget]

</td>
</tr>

<tr>
<td>應用程式評分</td>
<td>

{{pkgIcon}} [app_review][app_review]

</td>
</tr>

<tr>
<td>音訊</td>
<td>

{{pkgIcon}} [audioplayers][audioplayers]<br>
{{pkgIcon}} [flutter_soloud][flutter_soloud]—**全新**<br>
{{codelab}}  [使用 SoLoud 為你的 Flutter 遊戲加入音效與音樂][Add sound and music to your Flutter game with SoLoud]—**全新**

</td>
</tr>

<tr>
<td>驗證</td>
<td>

{{codelab}} [使用 Firebase 進行用戶驗證][firebase-auth]

</td>
</tr>

<tr>
<td>雲端服務</td>
<td>

{{codelab}} [將 Firebase 加入你的 Flutter 遊戲][Add Firebase to your Flutter game]

</td>
</tr>

<tr>
<td>除錯</td>
<td>

{{docIcon}} [Firebase Crashlytics 概覽][firebase-crashlytics]<br>
{{pkgIcon}} [firebase_crashlytics][firebase_crashlytics]

</td>
</tr>

<tr>
<td>驅動程式</td>
<td>

{{pkgIcon}} [win32_gamepad][win32_gamepad]

</td>
</tr>

<tr>
<td>遊戲資源<br>與資源工具</td>
<td>

{{assetsIcon}} [CraftPix][CraftPix]<br>
{{assetsIcon}} [Game Developer Studio][Game Developer Studio]<br>
{{toolIcon}} [GIMP][GIMP]

</td>
</tr>

<tr>
<td>遊戲引擎</td>
<td>

{{pkgIcon}} [Flame][flame-pkg]<br>
{{pkgIcon}} [Bonfire][bonfire-pkg]<br>
{{pkgIcon}} [forge2d][forge2d]

</td>
</tr>

<tr>
<td>遊戲功能</td>
<td>

{{recipeIcon}} [為你的遊戲加入成就與排行榜][leaderboard-recipe]<br>
{{recipeIcon}} [為你的遊戲加入多人連線支援][multiplayer-recipe]

</td>
</tr>

<tr>
<td>遊戲服務整合</td>
<td>

{{pkgIcon}} [games_services][game-svc-pkg]

</td>
</tr>

<tr>
<td>舊有程式碼</td>
<td>

{{codelab}} [在 Flutter 套件中使用 Foreign Function Interface][Use the Foreign Function Interface in a Flutter plugin]

</td>
</tr>

<tr>
<td>關卡編輯器</td>
<td>

{{toolIcon}} [Tiled][Tiled]

</td>
</tr>

<tr>
<td>變現</td>
<td>

{{recipeIcon}} [為你的 Flutter 遊戲加入廣告][ads-recipe]<br>
{{codelab}}  [為 Flutter 應用程式加入 AdMob 廣告][Add AdMob ads to a Flutter app]<br>
{{codelab}}  [為 Flutter
