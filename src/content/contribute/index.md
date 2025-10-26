---
title: 貢獻於 Flutter
shortTitle: 貢獻
description: >-
  了解如何為 Flutter 專案及其周邊生態系統做出貢獻。
showBreadcrumbs: false
---

![Dash 和她的朋友們對你的貢獻感到興奮](/assets/images/dash/dash-contribute.png){:height="160px" style="float: right;"}

如果你希望為 Flutter 專案及其周邊生態系統做出貢獻，
我們非常歡迎你的加入！

Flutter 是一個開源專案，仰賴社群的貢獻而蓬勃發展。
無論你是在修復錯誤、提出新功能、改進文件，還是協助其他社群成員，
你的努力都非常寶貴且值得感謝。

本頁提供了你可以參與的方式（非詳盡列表）。
如果你在貢獻過程中需要協助，或想獲得更多入門建議，
歡迎加入 [Flutter 貢獻者 Discord][flutter-contribute] 聯絡我們。

:::important
在開始你的 Flutter 貢獻之旅前，
請務必閱讀並遵守 Flutter 的 [行為準則][flutter-api-contribute]。

同時，也可以進一步了解 Flutter 的 [包容文化][website-contribute] 及 [核心價值][Dart website]。
:::
[design-doc-issues]: {{site.repo.flutter}}/issues?q=is%3Aopen+is%3Aissue+label%3A%22design+doc%22

[switch-channels]: /install/upgrade#change-channels
[beta-channel]: /install/upgrade#the-beta-channel
[report-bugs]: {{site.github}}/flutter/flutter/issues/new/choose

<div class="card-grid">
  <a class="card outlined-card" href="#使用-flutter-開發">
    <div class="card-header">
      <span class="card-title">使用 Flutter⟦L123⟧
    ⟦L124⟧
    <div class="card-content">
      ⟦L125⟧用 Flutter 開發你的應用程式並提供寶貴回饋。⟦L126⟧
    ⟦L127⟧
  ⟦L128⟧
  <a class="card outlined-card" href="#貢獻程式碼">
    <div class="card-header">
      <span class="card-title">貢獻程式碼⟦L129⟧
    ⟦L130⟧
    <div class="card-content">
      ⟦L131⟧直接貢獻 Flutter 底層的程式碼。⟦L132⟧
    ⟦L133⟧
  ⟦L134⟧
  <a class="card outlined-card" href="#撰寫文件">
    <div class="card-header">
      <span class="card-title">撰寫文件⟦L135⟧
    ⟦L136⟧
    <div class="card-content">
      ⟦L137⟧透過撰寫文件提升 Flutter 的學習體驗。⟦L138⟧
    ⟦L139⟧
  ⟦L140⟧
  <a class="card outlined-card" href="#議題分類">
    <div class="card-header">
      <span class="card-title">議題分類⟦L141⟧
    ⟦L142⟧
    <div class="card-content">
      ⟦L143⟧確保 Flutter 貢獻者能發揮最大影響力。⟦L144⟧
    ⟦L145⟧
  ⟦L146⟧
  <a class="card outlined-card" href="#strengthen-the-package-ecosystem">
    <div class="card-header">
      <span class="card-title">開發套件⟦L147⟧
    ⟦L148⟧
    <div class="card-content">
      ⟦L149⟧壯大 Dart 與 Flutter 的套件生態系。⟦L150⟧
    ⟦L151⟧
  ⟦L152⟧
  <a class="card outlined-card" href="#support-the-community">
    <div class="card-header">
      <span class="card-title">⟦L153⟧支持社群⟦L154⟧⟦L155⟧
    ⟦L156⟧
    <div class="card-content">
      ⟦L157⟧協助其他 Flutter 開發者受益於你的專業知識。⟦L158⟧
    ⟦L159⟧
  ⟦L160⟧
⟦L161⟧

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
  請[建立新議題][dart-dev-contribute]並提供重現資訊。
- 提出功能需求

  如果你認為 Flutter 應該新增或實作某個功能，
  但尚未有人提出，請[建立新議題][flutter-issues]，
  並提供所有相關資訊及你的使用情境。
- 參與問卷調查

  Flutter 團隊會不定期進行開發者問卷與研究。
  為了更了解痛點並改善 Flutter 開發者體驗，
  請盡可能詳盡地回覆問卷與提供意見。

  若想參加未來的 UX 研究，
  請造訪 [flutter.dev/research-signup][issue-contribute]。
- 參與提案討論

  Flutter 的重大變更通常會透過 [設計文件][issue triage] 討論。
  請考慮閱讀並針對與你或你的應用程式相關的提案提供意見。

  若要查找目前的設計文件與提案，
  請參閱 GitHub 議題資料庫中
  [帶有 `design doc` 標籤的議題][issue hygiene]。
- 審查 pull requests

  如果你熟悉 Flutter 某個領域，
  或某個議題的解決方案對你很重要，
  可以協助審查開放中的 pull request，於你的應用程式中測試，
  並提供相關回饋。
[necessary migrations]: /release/breaking-changes

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[engine-setup]: {{site.repo.flutter}}/blob/main/engine/src/flutter/docs/contributing/Setting-up-the-Engine-development-environment.md

### 嘗試 beta 頻道

為了確保 Flutter 的穩定性並提升即將推出的功能，
請協助測試尚未進入穩定頻道的預發布版本。

建議在 `beta` 頻道上測試新版本，
無論是一般開發還是測試你的應用程式相容性。

若你有任何回饋或遇到回歸問題，
請務必[回報給 Flutter 團隊]</span>。

立即[切換]</div>到[`beta` 頻道]<p>
並注意[必要的遷移事項]</p>，開始體驗吧！

[framework-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[packages-contribute]: {{site.repo.packages}}/blob/main/CONTRIBUTING.md

[Dart and Flutter DevTools]: /tools/devtools
[devtools-contribute]: {{site.repo.organization}}/devtools/blob/master/CONTRIBUTING.md

## 貢獻程式碼

直接改善 Flutter 的程式碼庫及相關工具。

### Flutter framework

發現內建元件（Widget）有 bug、對新元件有想法、
熱愛撰寫測試，或對 Flutter 內部運作有興趣嗎？
歡迎直接貢獻 Flutter framework，
讓 Flutter 的核心更好、造福所有人。

想了解如何貢獻 Flutter framework，
請參閱 Flutter [貢獻指南]</div>。

[dart-contribute]: {{site.github}}/dart-lang/sdk/blob/main/CONTRIBUTING.md

### Flutter engine

對實作 Flutter 底層原語或平台整合有興趣，
或擅長圖形程式設計嗎？
歡迎貢獻 Flutter engine，
讓 Flutter 更具可攜性、效能與強大功能。

想了解如何貢獻 Flutter engine，
請參閱 Flutter [貢獻指南]</a>
以及[設定 engine 開發環境]</span>。
[dart-build]: {{site.github}}/dart-lang/sdk/blob/main/docs/Building.md

[flutter-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Flutter 套件

貢獻由 Flutter 團隊維護的第一方套件。
這些套件為應用程式提供必要功能，
並封裝各種平台專屬功能。

想了解如何貢獻第一方套件，
請參閱 Flutter [貢獻指南]</div>
以及套件專屬的[貢獻指南]<p>。
[flutter-api-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#api-documentation

[website-contribute]: {{site.repo.this}}/blob/main/CONTRIBUTING.md

### DevTools

貢獻 [Dart 與 Flutter DevTools]</p>
是入門貢獻的絕佳選擇，因為其設置成本較低。
改進與修正 DevTools 能大幅提升 Flutter 開發者體驗，
也或許能幫助你開發自己的應用程式。

想開始貢獻，請參閱
[DevTools `CONTRIBUTING.md` 指南]</div>。
[Dart website]: {{site.dart-site}}
[dart-dev-contribute]: {{site.github}}/dart-lang/site-www/tree/main?tab=readme-ov-file#getting-started

### 網站基礎建設

修復錯誤、提升無障礙性，或為 Dart 與 Flutter 官方網站新增功能。

如果你熟悉網頁開發或網站產生器，
貢獻 Dart 與 Flutter 官方網站是提升 Flutter 開發者學習體驗的好方式。

根據你的興趣，你可以選擇貢獻於：

- pub.dev 網站
  - **正式網站：** [`pub.dev`]({{site.pub}})
  - **程式碼庫：** [`dart-lang/pub-dev`]({{site.github}}/dart-lang/pub-dev)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/pub-dev/blob/master/CONTRIBUTING.md)
- Flutter 文件網站
  - **正式網站：** [`docs.flutter.dev`]({{site.url}})
  - **程式碼庫：** [`flutter/website`]({{site.repo.this}})
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.github}}/flutter/website/blob/main/CONTRIBUTING.md)
- Dart 文件網站
  - **正式網站：** [`dart.dev`]({{site.dart-site}})
  - **程式碼庫：** [`dart-lang/site-www`]({{site.github}}/dart-lang/site-www)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/site-www/blob/main/CONTRIBUTING.md)
- DartPad
  - **正式網站：** [`dartpad.dev`]({{site.dartpad}})
  - **程式碼庫：** [`dart-lang/dart-pad`]({{site.github}}/dart-lang/dart-pad)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dart-pad/blob/main/CONTRIBUTING.md)
- `dartdoc` 工具
  - **正式網站：** [`api.flutter.dev`]({{site.api}})
  - **程式碼庫：** [`dart-lang/dartdoc`]({{site.github}}/dart-lang/dartdoc)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.github}}/dart-lang/dartdoc/blob/main/CONTRIBUTING.md)

### Dart SDK

貢獻於 Dart 語言及其相關工具，
讓這個為客戶端優化的語言更強大，
進一步奠定 Flutter 優異開發體驗的基礎。

Dart 的貢獻流程略有不同，
有興趣者請務必參閱其
[貢獻指南]</a> 與 [建置指南]</span>。

[flutter-issues]: {{site.repo.flutter}}/issues
[issue-contribute]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md#helping-out-in-the-issue-database

### 程式碼範例

改進或新增展示 Flutter 功能的範例，
幫助偏好透過範例學習的開發者。

你可以隨時分享自己的範例或模板，
也可以貢獻至 Flutter 維護的範例：

- 完整專案範例
  - **位置：** [`flutter/samples`]({{site.repo.samples}})
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.repo.samples}}/blob/main/CONTRIBUTING.md)
- API 文件範例
  - **位置：** [`flutter/flutter/packages/flutter`]({{site.repo.flutter}}/tree/main/packages/flutter)
  - **貢獻指南：** [`README.md`]({{site.repo.flutter}}/tree/main/dev/snippets)
- 網站程式碼片段
  - **位置：** [`flutter/website/examples`]({{site.repo.this}}/tree/main/examples)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.repo.this}}/blob/main/CONTRIBUTING.md)
- Flutter 原始碼庫範例
  - **位置：** [`flutter/flutter/examples`]({{site.repo.flutter}}/tree/main/examples)
  - **貢獻指南：** [`CONTRIBUTING.md`]({{site.repo.flutter}}/blob/main/CONTRIBUTING.md)

## 撰寫文件

無論形式為何，貢獻 Flutter 文件
都是你能協助 Flutter 最具影響力的方式之一。

### Flutter API 文件

API 文件是許多 Flutter 開發者在網路上與編輯器中
高度依賴的資源。

無論你想撰寫新文件、更新現有內容、
新增相關程式碼片段，甚至創建新圖示或圖表，
你對 API 文件的貢獻都會受到每位 Flutter 開發者的感謝。

想開始貢獻，請參閱
[Flutter SDK 貢獻指南]</div>，
特別是其中的 [API 文件]<p> 章節。
[Flutter contributors Discord]
[Code of conduct]

### 文件網站

歡迎貢獻本網站內容，
協助開發者學習與探索 Flutter。

想了解如何貢獻 Flutter 文件網站，
請參閱網站的[貢獻文件]</p>。

你也可以貢獻於 [Dart 官方網站]</div>，
強化這個為客戶端優化語言的文件，
這正是 Flutter 的基礎。
想了解如何貢獻，
請參閱 [`dart-lang/site-www` 貢獻文件]</a>。
[culture of inclusivity]
[core values]
[open a new issue]

## 議題分類

協助 Flutter 團隊分類新進的錯誤回報與功能需求。

在 [Flutter 議題資料庫]</span> 中有許多協助方式，包括但不限於：

- 判斷議題是否有效
- 確保議題可執行
- 記錄受影響的版本
- 補充重現步驟
- 辨識重複或已解決的議題
- 解決或導引支援問題

想開始協助議題分類，
請閱讀[協助議題資料庫]</div> 相關說明，
並了解 Flutter 處理
[議題分類]<p> 與 [議題衛生]</p> 的方式。
[open a new issue]
⟦L59
