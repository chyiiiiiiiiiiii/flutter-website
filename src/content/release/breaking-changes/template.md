---
title: 請以重大變更標題取代
description: >-
  簡要描述，內容類似下方的「context」區段。
  文字長度應控制在 80 字元以內。
---

{% render docs/breaking-changes.md %}

{% comment %}
  請閱讀以下一般指引：
  * 所有文字行長應為 80 字元以內。
    作者強烈建議使用語意斷行：
    https://github.com/dart-lang/site-shared/blob/main/doc/writing-for-dart-and-flutter-websites.md#semantic-line-breaks
  * 請勿提前數週提交 PR。
    這樣會導致網站儲存庫內容過時，且通常會在索引檔產生衝突。
    最理想的做法是，當你已確認
    重大變更落在哪個版本時再提交 PR。
  * 此範本中最重要的部分之一是 *時間軸* 區段。
    例如：`Landed in version: 1.21.0-5.0.pre<br>`。
    請勿在此區段列出 PR。若尚未發佈穩定版，
    也不要填寫「穩定版」相關資訊。
    發佈穩定版後，我們會確認
    更新已進入穩定版，然後再
    更新重大變更與索引檔。
  * 此頁面內容應以回顧過去的角度撰寫，
    因此請以過去式描述先前行為，
    而非未來式。讀者通常是在數月後
    重大變更已進入穩定版時才會閱讀這份文件，
    而不是今天。請勿寫「一個月後」或
    提及你下週的計畫。
    請假設你已完成變更，讀者是回頭查詢
    如何遷移其程式碼。
  * 標題與標題請使用句子式大小寫。
    (`## Migration guide`，而非 `Migration Guide`)
  * 請勿使用縮寫 `i.e.` 或 `e.g.`。
    請使用「例如」或「像是」等類似詞語。
  * 連結請盡可能使用巨集。
    請參考本範本結尾的範例，
    但請勿在 URL 中使用 "github.com"、"api.flutter.dev" 或
    "pub.dev"。請使用 {{site.github}}、
    {{site.api}} 或 {{site.pub}} 巨集。
  * 儘量避免使用「will」，也就是說，
    請以現在式撰寫。例如：
    錯誤：「當遇到 xxx 值時，
          程式會拋出例外。」
    正確：「當遇到 xxx 值時，
           程式會拋出例外。」
    「will」的正確用法：「在 2.0 版中，xxx API
          將會被棄用。」
  * 最後，請在最終 PR 中刪除註解標籤與文字。
{% endcomment %}

## 摘要

{% comment %}
  一段至三段的簡要摘要，說明變更內容，
  讓讀者在瀏覽重大變更索引時能夠找到，
  最好包含尚未遷移時可能出現的錯誤訊息等關鍵字。
{% endcomment %}

## 背景

{% comment %}
  針對變更的 API 及其原因進行高層次描述。
  內容應足夠清楚，即使對此重大變更
  毫無背景知識的讀者（例如不了解底層 API 的人）也能理解。
  此區段也應回答「是什麼問題導致考慮進行重大變更？」。

  請包含實際技術變更的描述，
  並附上 API 變更前後的程式碼範例。

  請舉例說明尚未遷移程式碼會產生的錯誤訊息。
  這有助於搜尋引擎在使用者搜尋這些
  錯誤訊息時找到遷移指南。這對於能見度非常重要！
{% endcomment %}

## 遷移指南

{% comment %}
  說明如何進行遷移。
  若有遷移工具，請於此處說明。
  即使有工具，也必須提供手動遷移的說明。
  此區段需提供遷移前後的程式碼範例，且必須與開發者相關。
{% endcomment %}

遷移前的程式碼：

```dart
// Example of code before the change.
```

遷移後的程式碼：

```dart
// Example of code after the change.
```

{% comment %}
  請確保你已經搜尋過網路上使用舊版 API 的舊教學。
  聯繫這些作者，並告知他們應該如何更新內容。
  請留言指出 API 已經變更，並附上本指南的連結。
{% endcomment %}

## 時程

{% comment %}
  此變更於哪個 SDK 版本中引入。
  如果有棄用（deprecation）期間，請標註我們保證維持舊 API 的版本號。
  請使用下方範本：

  如果某個破壞性變更在後續版本中被還原，請將該項目移至 index.md 檔案的「已還原（Reverted）」區段。
  並且新增「Reverted in version」這一行（如下方所示，為選填，若未使用請刪除）。
{% endcomment %}

已納入版本：xxx<br>  
穩定版釋出：尚未  
還原於版本：xxx  （選填，若未使用請刪除）

## 參考資料

{% comment %}
  這些連結預設為註解，因為它們會導致 GitHubActions (GHA) 的連結檢查失敗。
  當你填入實際連結後，請移除註解標籤。
  僅當連結指向 "main-api.flutter.dev" 時才使用 "main-api" include；
  若有可能，請優先使用我們的穩定版文件。

{% render docs/main-api.md, site: site %}

API 文件：

* [`ClassName`][`ClassName`]

相關議題（issues）：

* [Issue xxxx][Issue xxxx]
* [Issue yyyy][Issue yyyy]

相關 PR：

* [PR title #1][PR title #1]
* [PR title #2][PR title #2]
{% endcomment %}

{% comment %}
  請將連結依字母順序加在檔案結尾。
  下方連結預設為註解，因為它們會讓 GitHubActions (GHA) 的連結檢查誤判為失效連結，
  但請在提交前移除註解標籤！

  如果你分享的是尚未進入穩定頻道的新 API，請使用 main channel 連結。
  若要連結到 main channel 的文件，
  請加入下方說明，並確保 URL 包含 main 連結（如下所示）。

  這裡是定義穩定版（site.api）連結與 main channel（main-api）連結的範例。

<!-- 穩定頻道連結： -->
[`ClassName`]: {{site.api}}/flutter/[link_to_relevant_page].html

<!-- 主分支頻道連結： -->
{% render docs/main-api.md, site: site %}

[`ClassName`]: {{site.main-api}}/flutter/[link_to_relevant_page].html

[Issue xxxx]: {{site.repo.flutter}}/issues/[link_to_actual_issue]
[Issue yyyy]: {{site.repo.flutter}}/issues/[link_to_actual_issue]
[PR title #1]: {{site.repo.flutter}}/pull/[link_to_actual_pr]
[PR title #2]: {{site.repo.flutter}}/pull/[link_to_actual_pr]
{% endcomment %}
