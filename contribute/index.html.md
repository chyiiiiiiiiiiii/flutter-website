# 貢獻於 Flutter

> 了解如何為 Flutter 專案及其周邊生態系統做出貢獻。



![Dash 和她的朋友們對你的貢獻感到興奮](/assets/images/dash/dash-contribute.png){:height="160px" style="float: right;"}

如果你希望為 Flutter 專案及其周邊生態系統做出貢獻，
我們非常歡迎你的加入！

Flutter 是一個開源專案，仰賴社群的貢獻而蓬勃發展。
無論你是在修復錯誤、提出新功能、改進文件，還是協助其他社群成員，
你的努力都非常寶貴且值得感謝。

本頁提供了你可以參與的方式（非詳盡列表）。
如果你在貢獻過程中需要協助，或想獲得更多入門建議，
歡迎加入 [Flutter 貢獻者 Discord][Flutter contributors Discord] 聯絡我們。

:::important
在開始你的 Flutter 貢獻之旅前，
請務必閱讀並遵守 Flutter 的[行為準則][Code of conduct]。

同時，也可以進一步了解 Flutter 的[包容文化][culture of inclusivity]及[核心價值][core values]。
:::

[Flutter contributors Discord]: https://flutter.dev/chat
[Code of conduct]: https://github.com/flutter/flutter/blob/main/CODE_OF_CONDUCT.md
[culture of inclusivity]: https://flutter.dev/culture
[core values]: https://github.com/flutter/flutter/blob/main/docs/about/Values.md

<div class="card-grid">
  <a class="card outlined-card" href="#使用-flutter-開發">
    <div class="card-header">
      <span class="card-title">使用 Flutter</span>
    </div>
    <div class="card-content">
      <p>用 Flutter 開發你自己的應用程式並提供寶貴回饋。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#貢獻程式碼">
    <div class="card-header">
      <span class="card-title">貢獻程式碼</span>
    </div>
    <div class="card-content">
      <p>直接貢獻 Flutter 底層的程式碼。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#撰寫文件">
    <div class="card-header">
      <span class="card-title">撰寫文件</span>
    </div>
    <div class="card-content">
      <p>透過撰寫文件提升 Flutter 的學習體驗。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#議題分類">
    <div class="card-header">
      <span class="card-title">議題分類</span>
    </div>
    <div class="card-content">
      <p>確保 Flutter 貢獻者能發揮最大影響力。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#strengthen-the-package-ecosystem">
    <div class="card-header">
      <span class="card-title">開發套件</span>
    </div>
    <div class="card-content">
      <p>壯大 Dart 與 Flutter 的套件生態系。</p>
    </div>
  </a>
  <a class="card outlined-card" href="#support-the-community">
    <div class="card-header">
      <span class="card-title"><span>支持社群</span></span>
    </div>
    <div class="card-content">
      <p>協助其他 Flutter 開發者受益於你的專業知識。</p>
    </div>
  </a>
</div>

## 使用 Flutter 開發

即使只是單純使用 Flutter 並提供回饋，也是非常有價值的貢獻！

### 提供回饋

分享你的回饋與經驗，有助於 Flutter 團隊
了解並釐清開發者的需求與痛點。

你可以透過多種方式提供寶貴的回饋，包括：

- 為現有議題投票

  如果你遇到已被回報的問題，
  可以為該議題投票，協助 Flutter 團隊了解其重要性。

  請避免僅留下空白的讚、+1 或類似的留言。
  不過，如果你有額外資訊，
  例如重現步驟或其他版本資訊，
  請考慮在新留言中提供這些細節。
- 回報新錯誤

  如果你遇到尚未被回報的 Flutter 錯誤，
  請[建立新議題][open a new issue]並提供重現資訊。
- 提出功能需求

  如果你認為 Flutter 應該新增或實作某個功能，
  但尚未有人提出，請[建立新議題][open a new issue]，
  並提供所有相關資訊及你的使用情境。
- 參與問卷調查

  Flutter 團隊會不定期進行開發者問卷與研究。
  為了更了解痛點並改善 Flutter 開發者體驗，
  請盡可能詳盡地回覆問卷與提供意見。

  若想參加未來的 UX 研究，
  請造訪 [flutter.dev/research-signup][uxr-signup]。
- 參與提案討論

  Flutter 的重大變更通常會透過[設計文件][design documents]討論。
  請考慮閱讀並針對與你或你的應用程式相關的提案提供意見。

  若要查找目前的設計文件與提案，
  請參閱 GitHub 議題資料庫中
  [帶有 `design doc` 標籤的議題][design-doc-issues]。
- 審查 pull requests

  如果你熟悉 Flutter 某個領域，
  或某個議題的解決方案對你很重要，
  可以協助審查開放中的 pull request、在你的應用程式中測試，
  並提供相關回饋。

[open a new issue]: https://github.com/flutter/flutter/issues/new
[uxr-signup]: https://flutter.dev/research-signup
[design documents]: https://github.com/flutter/flutter/blob/main/docs/contributing/Design-Documents.md
[design-doc-issues]: https://github.com/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3A%22design+doc%22

### 嘗試 beta 頻道

為了確保 Flutter 的穩定性並提升即將推出的功能，
請協助測試尚未進入穩定頻道的預發布版本。

建議在 `beta` 頻道上測試新版本，
無論是一般開發還是測試你的應用程式相容性。

若你有任何回饋或遇到回歸問題，
請務必[回報給 Flutter 團隊][report-bugs]。

立即[切換][switch-channels]至 [`beta` 頻道][beta-channel]，
並注意[必要的遷移事項][necessary migrations]，開始體驗吧！

[switch-channels]: /install/upgrade#change-channels
[beta-channel]: /install/upgrade#the-beta-channel
[report-bugs]: https://github.com/flutter/flutter/issues/new/choose
[necessary migrations]: /release/breaking-changes

## 貢獻程式碼

直接改善 Flutter 的程式碼庫及相關工具。

### Flutter framework

發現內建元件 (Widget) 有 bug、對新元件有想法、
熱愛撰寫測試，或對 Flutter 內部運作有興趣嗎？
歡迎直接貢獻 Flutter framework，
讓 Flutter 的核心更好、造福所有人。

想了解如何貢獻 Flutter framework，
請參閱 Flutter [貢獻指南][framework-contribute]。

[framework-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md

### Flutter engine

對實作 Flutter 底層原語或平台整合有興趣，
或擅長圖形程式設計嗎？
歡迎貢獻 Flutter engine，
讓 Flutter 更具可攜性、效能與強大功能。

想了解如何貢獻 Flutter engine，
請參閱 Flutter [貢獻指南][framework-contribute]
以及[設定 engine 開發環境][engine-setup]。

[framework-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md
[engine-setup]: https://github.com/flutter/flutter/blob/main/docs/engine/contributing/Setting-up-the-Engine-development-environment.md

### Flutter 套件

貢獻由 Flutter 團隊維護的第一方套件。
這些套件為應用程式提供必要功能，
並封裝各種平台專屬功能。

想了解如何貢獻第一方套件，
請參閱 Flutter [貢獻指南][framework-contribute]
以及套件專屬的[貢獻指南][packages-contribute]。

[framework-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md
[packages-contribute]: https://github.com/flutter/packages/blob/main/CONTRIBUTING.md

### DevTools

貢獻 [Dart 與 Flutter DevTools][]
是入門貢獻的絕佳選擇，因為其設置成本較低。
改進與修正能大幅提升 Flutter 開發者體驗，
也或許能幫助你開發自己的應用程式。

想開始貢獻，請參閱
[DevTools `CONTRIBUTING.md` 指南][devtools-contribute]。

[Dart 與 Flutter DevTools]: /tools/devtools
[devtools-contribute]: https://github.com/flutter/devtools/blob/master/CONTRIBUTING.md

### 網站基礎建設

修復錯誤、提升無障礙性，或為 Dart 與 Flutter 官方網站新增功能。

如果你熟悉網頁開發或網站產生器，
貢獻 Dart 與 Flutter 官方網站是提升 Flutter 開發者學習體驗的好方式。

根據你的興趣，你可以選擇貢獻於：

- pub.dev 網站
  - **正式網站：** [`pub.dev`](https://pub.dev)
  - **程式碼庫：** [`dart-lang/pub-dev`](https://github.com/dart-lang/pub-dev)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/dart-lang/pub-dev/blob/master/CONTRIBUTING.md)
- Flutter 文件網站
  - **正式網站：** [`docs.flutter.dev`](https://docs.flutter.tw)
  - **程式碼庫：** [`flutter/website`](https://github.com/flutter/website)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/flutter/website/blob/main/CONTRIBUTING.md)
- Dart 文件網站
  - **正式網站：** [`dart.dev`](https://dart.dev)
  - **程式碼庫：** [`dart-lang/site-www`](https://github.com/dart-lang/site-www)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/dart-lang/site-www/blob/main/CONTRIBUTING.md)
- DartPad
  - **正式網站：** [`dartpad.dev`](https://dartpad.dev)
  - **程式碼庫：** [`dart-lang/dart-pad`](https://github.com/dart-lang/dart-pad)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/dart-lang/dart-pad/blob/main/CONTRIBUTING.md)
- `dartdoc` 工具
  - **正式網站：** [`api.flutter.dev`](https://api.flutter.dev)
  - **程式碼庫：** [`dart-lang/dartdoc`](https://github.com/dart-lang/dartdoc)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/dart-lang/dartdoc/blob/main/CONTRIBUTING.md)

### Dart SDK

貢獻於 Dart 語言及其相關工具，
讓這個為客戶端優化的語言更強大，
進一步奠定 Flutter 優異開發體驗的基礎。

Dart 的貢獻流程略有不同，
有興趣者請務必參閱其
[貢獻指南][dart-contribute]與[建置指南][dart-build]。

[dart-contribute]: https://github.com/dart-lang/sdk/blob/main/CONTRIBUTING.md
[dart-build]: https://github.com/dart-lang/sdk/blob/main/docs/Building.md

### 程式碼範例

改進或新增展示 Flutter 功能的範例，
幫助偏好透過範例學習的開發者。

你可以隨時分享自己的範例或模板，
也可以貢獻至 Flutter 維護的範例：

- 完整專案範例
  - **位置：** [`flutter/samples`](https://github.com/flutter/samples)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/flutter/samples/blob/main/CONTRIBUTING.md)
- API 文件範例
  - **位置：** [`flutter/flutter/packages/flutter`](https://github.com/flutter/flutter/tree/main/packages/flutter)
  - **貢獻指南：** [`README.md`](https://github.com/flutter/flutter/tree/main/dev/snippets)
- 網站程式碼片段
  - **位置：** [`flutter/website/examples`](https://github.com/flutter/website/tree/main/examples)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/flutter/website/blob/main/CONTRIBUTING.md)
- Flutter 原始碼庫範例
  - **位置：** [`flutter/flutter/examples`](https://github.com/flutter/flutter/tree/main/examples)
  - **貢獻指南：** [`CONTRIBUTING.md`](https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md)

## 撰寫文件

無論形式為何，貢獻 Flutter 文件
都是你能協助 Flutter 最具影響力的方式之一。

### Flutter API 文件

API 文件是許多 Flutter 開發者在網路上與編輯器中
高度依賴的資源。

無論你想撰寫新文件、更新現有內容、
新增相關程式碼片段，甚至創建新視覺素材（例如圖表），
你對 API 文件的貢獻都會受到每位 Flutter 開發者的感謝。

想開始貢獻，請參閱
[Flutter SDK 貢獻指南][flutter-contribute]，
特別是其中的 [API 文件][flutter-api-contribute]章節。

[flutter-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md
[flutter-api-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md#api-documentation

### 文件網站

歡迎貢獻本網站內容，
協助開發者學習與探索 Flutter。

想了解如何貢獻 Flutter 文件網站，
請參閱網站的[貢獻文件][website-contribute]。

你也可以貢獻於 [Dart 官方網站][Dart website]，
強化這個為客戶端優化語言的文件，
這正是 Flutter 的基礎。
想了解如何貢獻，
請參閱 [`dart-lang/site-www` 貢獻文件][dart-dev-contribute]。

[website-contribute]: https://github.com/flutter/website/blob/main/CONTRIBUTING.md
[Dart website]: https://dart.dev
[dart-dev-contribute]: https://github.com/dart-lang/site-www/tree/main?tab=readme-ov-file#getting-started

## 議題分類

協助 Flutter 團隊分類新進的錯誤回報與功能需求。

在 [Flutter 議題資料庫][flutter-issues]中有許多協助方式，包括但不限於：

- 判斷議題是否有效
- 確保議題可執行
- 記錄受影響的版本
- 補充重現步驟
- 辨識重複或已解決的議題
- 解決或導引支援問題

想開始協助議題分類，
請閱讀[協助議題資料庫][issue-contribute]相關說明，
並了解 Flutter 處理
[議題分類][issue triage]與[議題衛生][issue hygiene]的方式。

[flutter-issues]: https://github.com/flutter/flutter/issues
[issue-contribute]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md#helping-out-in-the-issue-database
[issue triage]: https://github.com/flutter/flutter/blob/main/docs/triage/README.md
[issue hygiene]: https://github.com/flutter/flutter/tree/main/docs/contributing/issue_hygiene

## Strengthen the package ecosystem

協助拓展並支持 [pub.dev](https://pub.dev/) 上可用的 Dart 與 Flutter 套件集合。

### 貢獻你正在使用的套件

為你所依賴的套件做出回饋，也有機會協助改善你自己的應用程式——
找出你依賴的套件並回饋貢獻。

若要貢獻某個套件，
請前往 [pub.dev 網站][pub.dev site]上的套件頁面，
並在頁面側邊欄找到連結的程式碼庫。

在貢獻之前，請確認遵循每個套件的貢獻指南、
與維護者討論你的貢獻，
並留意 Flutter 的[行為準則][Code of conduct]。

[pub.dev site]: https://pub.dev
[Code of conduct]: https://github.com/flutter/flutter/blob/main/CODE_OF_CONDUCT.md

### 將應用程式中的可重用功能開源

如果你在應用程式中建置了一個很棒的通用元件或工具，
考慮將它提取成套件並發布至 pub.dev。

想開始，請了解
[建立 Dart 套件][Creating Dart packages]與[開發 Flutter 套件][Developing Flutter packages]。
當你準備好將套件發布至 [pub.dev 網站][pub.dev site]時，
請遵循[發布套件][Publishing packages]的指南與最佳實踐。

[Creating Dart packages]: https://dart.dev/tools/pub/create-packages
[Developing Flutter packages]: /packages-and-plugins/developing-packages
[pub.dev site]: https://pub.dev
[Publishing packages]: https://dart.dev/tools/pub/publishing

### 為熱門 SDK 新增 Dart 或 Flutter 支援

建立或貢獻封裝原生 SDK 或網頁 API 的套件。

在建立新套件之前，
請先嘗試在 [pub.dev 網站][pub.dev site]上
尋找是否有你可以使用或貢獻的既有封裝。

根據 SDK 和平台的不同，
你可能需要[撰寫平台特定程式碼][Write platform-specific code]、
使用 [JS 互通性][JS interop]、使用 [`package:http`][] 封裝 REST API，
或以 Dart 重新實作所需功能。

如果你計畫建立新套件，請了解
[建立 Dart 套件][Creating Dart packages]與[開發 Flutter 套件][Developing Flutter packages]。
當你準備好將套件發布至 [pub.dev 網站][pub.dev site]時，
請遵循[發布套件][Publishing packages]的指南與最佳實踐。

[pub.dev site]: https://pub.dev
[Write platform-specific code]: /platform-integration/platform-channels
[JS interop]: https://dart.dev/interop/js-interop
[`package:http`]: https://pub.dev/packages/http

## Support the community

協助其他開發者學習 Flutter，
並在建置自己的應用程式時取得成功。

### 協助其他開發者

分享你的 Flutter 知識與專業，
協助你的 Flutter 同伴取得成功。

這可以採取多種形式，從在你的公司建立 Flutter 求助頻道，
到在公開論壇回答問題都可以。

Flutter 開發者常尋求協助的地點包括：

- [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- [Flutter Dev Discord](https://discord.com/invite/rflutterdev)
- [Dart Community Discord](https://discord.com/invite/Qt6DgfAWWx)
- [Reddit 上的 r/FlutterDev](https://www.reddit.com/r/FlutterDev)
- [GitHub issues](https://github.com/flutter/flutter/issues)
- [Flutter Forum](https://forum.itsallwidgets.com/)

### 舉辦活動

與其他 Flutter 愛好者交流，
組織在地、全國甚至線上活動。
活動可以是讀書會、簡單的聚會，
乃至工作坊和黑客松。

如需靈感與支持，
請參閱現有的 [Flutter 活動][Flutter events]、
進一步了解 [Flutter 社群][Flutter community]，
並探索 [Flutter Meetup 網路][Flutter Meetup Network]。

[Flutter events]: https://flutter.dev/events
[Flutter community]: https://flutter.dev/community
[Flutter Meetup Network]: https://www.meetup.com/pro/flutter/

### 發文分享 Flutter

與更廣泛的 Flutter 社群分享你的見解與專案。

分享 Flutter 並與開發者社群連結的方式多不勝數。
常見的管道包括：

- 部落格文章
- 影片教學
- 短文貼文
- 論壇討論串
- GitHub 討論
- 連結聚合版板

分享你熱衷的任何主題，
但如果你不確定要發什麼，
可以考慮分享開發者常詢問的話題。

如果你使用的平台支援標籤，
請考慮加上 `#Flutter` 和 `#FlutterDev` 標籤，
幫助其他開發者找到你的內容。

