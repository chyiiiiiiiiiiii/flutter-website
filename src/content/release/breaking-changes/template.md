---
title: 請以此處替換為重大變更標題
description: >-
  簡要描述，內容類似於下方「背景」區段。
  文字應保持每行 80 字元以內。
---

{% render docs/breaking-changes.md %}

{% comment %}
  請閱讀以下一般性說明：
  * 所有文字行應保持 80 字元以內。
    編輯者強烈建議使用語意斷行：
    https://github.com/dart-lang/site-shared/blob/main/doc/writing-for-dart-and-flutter-websites.md#semantic-line-breaks
  * 請勿在重大變更尚未確定的情況下，提前數週提交 PR。
    這樣會導致網站儲存庫內容過時，並且通常會在索引檔產生衝突。
    理想情況下，請在確認重大變更所屬版本號後再提交 PR。
  * 此範本中最重要的部分之一是 *時間軸* 區段。
    例如：`Landed in version: 1.21.0-5.0.pre<br>`。
    請勿在此區段列出 PR。若尚未發佈至穩定版，
    也請勿填寫「穩定版」相關資訊。
    在發佈穩定版後，我們會確認更新已進入穩定版，
    並同步更新重大變更及索引檔。
  * 本頁內容應以回顧過往為主，
    請以過去式描述先前行為，而非未來式。
    使用者閱讀本頁時，重大變更很可能已進入穩定版，
    而非今日。請勿寫「一個月後」或描述下週的計畫。
    請假設變更已完成，讀者是為了回顧如何遷移程式碼。
  * 標題與標頭請使用句首大寫（sentence case）。
    （`## Migration guide`，而非 `Migration Guide`）
  * 請勿使用縮寫 `i.e.` 或 `e.g.`。
    請改用「例如」或「像是」等類似表達。
  * 連結請盡可能使用巨集。
    請參考本範本結尾的範例，
    但勿在 URL 中直接使用 "github.com"、"api.flutter.dev" 或
    "pub.dev"。請使用 {{site.github}}、{{site.api}} 或 {{site.pub}} 巨集。
  * 請盡量避免使用 "will"，也就是說，
    儘量以現在式描述。例如：
    不佳：「遇到 xxx 值時，程式碼將會拋出例外。」
    佳：「遇到 xxx 值時，程式碼會拋出例外。」
    佳（適當使用 "will"）：「在 2.0 版中，xxx API
          將會被棄用。」
  * 最後，請在提交最終 PR 前，刪除註解標籤與說明文字。
{% endcomment %}

## 摘要

{% comment %}
  一段簡短（1 至 3 行）的摘要，說明變更內容，
  讓使用者在瀏覽重大變更索引時能快速找到，
  最好包含尚未遷移時可能出現的錯誤訊息關鍵字。
{% endcomment %}

## 背景

{% comment %}
  高層次描述 API 變更內容及原因。
  內容應清楚易懂，即使讀者對此重大變更毫無背景知識，
  例如不瞭解底層 API 也能理解。
  此區段也應回答「是什麼問題促使我們考慮進行重大變更？」

  請包含實際技術變更說明，
  並以程式碼範例展示 API 如何變動。

  請提供尚未遷移程式碼產生的錯誤訊息範例。
  這有助於搜尋引擎在使用者搜尋錯誤訊息時找到遷移指南。
  這對於可發現性非常重要！
{% endcomment %}

## 遷移指南

{% comment %}
  描述如何進行遷移。
  若有遷移工具，請於此處說明。
  即使有工具，也必須提供手動遷移的說明。
  此區段需提供遷移前後的程式碼範例，並與開發者實際情境相關。
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
  請確保你已經搜尋過網路上舊有的教學，這些教學可能還在使用舊的 API。請聯絡這些作者，告知他們應該如何更新內容。也請在相關頁面留言，指出 API 已經變更，並附上此指南的連結。
{% endcomment %}

## 時程

{% comment %}
  此變更於哪個 SDK 版本中引入。如果有棄用（deprecation）緩衝期，請標明我們保證維護舊 API 的版本號。請使用以下範本：

  如果某個重大變更在後續版本中被還原，請將該項目移至 index.md 檔案的「已還原（Reverted）」區段。
  同時新增「Reverted in version」這一行，如下方所示（如未使用請刪除）。
{% endcomment %}

已納入版本：xxx<br>  
穩定版釋出：尚未  
於版本 xxx 還原：xxx（選填，若未使用請刪除）

## 參考資料

{% comment %}
  這些連結目前已註解，因為它們會導致 GitHubActions（GHA）連結檢查失敗。
  當你填入實際連結後，請移除註解標籤。只有當你連結到 "main-api.flutter.dev" 時才使用 "main-api" include；如有可能，請優先使用我們的穩定版文件。

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
  下方連結已註解，因為它們會讓 GitHubActions（GHA）連結檢查工具誤判為失效連結，
  但在提交前請移除註解標籤！

  如果你要分享尚未進入穩定頻道的新 API，請使用 main 頻道的連結。
  若要連結到 main 頻道的文件，請加上以下說明，並確保 URL 包含 main 連結（如下所示）。

  這裡是定義穩定（site.api）連結和 main 頻道（main-api）連結的範例。

<!-- 穩定頻道連結： -->
[`ClassName`]: {{site.api}}/flutter/[link_to_relevant_page].html

<!-- 主分支（main channel）連結： -->
{% render docs/main-api.md, site: site %}

[`ClassName`]: {{site.main-api}}/flutter/[link_to_relevant_page].html

[Issue xxxx]: {{site.repo.flutter}}/issues/[link_to_actual_issue]
[Issue yyyy]: {{site.repo.flutter}}/issues/[link_to_actual_issue]
[PR title #1]: {{site.repo.flutter}}/pull/[link_to_actual_pr]
[PR title #2]: {{site.repo.flutter}}/pull/[link_to_actual_pr]
{% endcomment %}
