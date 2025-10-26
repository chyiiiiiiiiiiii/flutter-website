```markdown
---
title: 請改用 maxLengthEnforcement 取代 maxLengthEnforced
description: 介紹 MaxLengthEnforcement 列舉型別。
---

{% render docs/breaking-changes.md %}

## 摘要

若要控制`maxLength`在`LengthLimitingTextInputFormatter`中的行為，請改用`maxLengthEnforcement`，取代現已棄用的`maxLengthEnforced`。

## 背景說明

以往會使用`maxLengthEnforced`參數來決定文字欄位 (text field) 在輸入值達到`maxLength`上限時，是否要截斷輸入值，或是在（針對`TextField`和`TextFormField`）當使用者輸入長度超過`maxLength`時，於字元計數處顯示警告訊息。

然而，輸入 CJK（中日韓）文字時，一些輸入法需要使用者先在文字欄位中輸入一串拉丁字母，然後再將這串字母轉換成所需的 CJK 字元（這個過程稱為 *文字組成*，text composition）。這串拉丁字母通常會比最終產生的 CJK 字元還長，因此如果對文字欄位設置嚴格的最大字元數限制，可能會導致使用者因`maxLength`字元上限而無法正常完成文字組成。

某些輸入法在輸入拉丁字母時，也會利用文字組成來標示目前高亮區域內的文字正在被編輯。例如，Android 上的 Gboard 英文鍵盤（以及許多其他 Android 輸入法）會將目前輸入的單字放在組成區域內。

為了改善這些情境下的輸入體驗，新增了一個三態列舉型別`MaxLengthEnforcement`。其各個值描述了在套用`LengthLimitingTextInputFormatter`時，針對活躍組成區域（active composing regions）所支援的處理策略。文字欄位新增了一個採用此列舉型別的新參數`maxLengthEnforcement`，以取代原本的布林值`maxLengthEnforced`參數。有了新的列舉型別參數，開發者可以根據文字欄位預期內容的型態，選擇不同的策略。

如需更多資訊，請參閱 [`maxLength`][`maxLength`] 與 [`MaxLengthEnforcement`][`MaxLengthEnforcement`] 的文件。

`maxLengthEnforcement`參數的預設值會根據應用程式的`TargetPlatform`自動推斷，以符合各平台慣例：

## 變更說明

* 新增`maxLengthEnforcement`參數，採用新的列舉型別`MaxLengthEnforcement`，以取代現已棄用的布林值`maxLengthEnforced`參數，適用於`TextField`、`TextFormField`、`CupertinoTextField`及`LengthLimitingTextInputFormatter`等類別。

## 遷移指南

_建議使用目前平台的預設行為，因為這通常最符合使用者的習慣。_

### `maxLengthEnforcement` 的預設值

* Android、Windows：`MaxLengthEnforcement.enforced`。
  這些平台會強制執行原生行為，不論是否使用組成輸入，輸入值都會被截斷。
* iOS、macOS：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  這些平台並無「最大長度」功能，因此需要開發者自行實作相關行為。這些平台尚未形成明確的標準慣例。我們選擇允許組成內容超過最大長度，以避免影響 CJK 輸入。
* Web 與 Linux：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  這些平台雖然沒有標準（且有許多實作行為互有衝突），但常見慣例是預設允許組成內容超過最大長度。
* Fuchsia：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  目前此平台尚無相關慣例，因此我們選擇預設採用最不容易造成資料遺失的方式。

### 若需始終強制限制

若要始終強制在達到上限時截斷輸入值（例如輸入驗證碼時），請於可編輯文字欄位中使用`MaxLengthEnforcement.enforced`。

_此選項在依賴文字組成的輸入法下，可能會造成不佳的使用體驗。若文字欄位預期接收任意使用者輸入（可能包含 CJK 字元），建議考慮使用`truncateAfterCompositionEnds`選項。詳情請參閱[背景說明](#context)章節。_

遷移前的程式碼：
```

```dart
TextField(maxLength: 6)
```

或：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforced: true,
)
```

遷移後的程式碼：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.enforced,
)
```

### 不強制限制

若要在`TextField`中顯示最大長度錯誤，
但在超過限制時**不**截斷內容，
請使用`MaxLengthEnforcement.none`來取代
`maxLengthEnforced: false`。

遷移前的程式碼：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforced: false,
)
```

遷移後的程式碼：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.none,
)
```

對於`CupertinoTextField`，由於無法顯示錯誤訊息，
只需不要設定`maxLength`值即可。

遷移前的程式碼：

```dart
CupertinoTextField(
  maxLength: 6,
  maxLengthEnforced: false,
)
```

遷移後的程式碼：

```dart
CupertinoTextField()
```

### 強制限制，但不影響組字輸入

若想在使用者透過組字（composition）輸入文字時避免截斷內容，請指定
`MaxLengthEnforcement.truncateAfterCompositionEnds`。
這種行為允許那些在輸入過程中會產生比最終文字更長的組字區域的輸入法（如中文、日文、韓文（CJK）輸入法），在編輯完成前暫時忽略限制。

_在 Android 上，Gboard 的英文鍵盤（以及許多其他 Android 輸入法）會為正在輸入的單字建立組字區域。
當這些輸入法用於 `truncateAfterCompositionEnds` 文字欄位（text field）時，使用者不會在達到 `maxLength` 限制時立即被阻止。
如果你確信該文字欄位不會搭配會暫時產生長組字區域的輸入法（例如 CJK 輸入法）使用，可以考慮 `enforced` 選項。_

實作範例程式碼如下：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.truncateAfterCompositionEnds, // Temporarily lifts the limit.
)
```

### 請注意不要假設輸入不會使用組字區域（composing regions）

當針對特定語系時，很容易假設所有使用者都會滿足於該語系的輸入。例如，針對英文社群的論壇軟體，可能會被認為只需要處理英文文字。然而，這類假設往往是不正確的。例如，英文論壇的參與者可能會想討論日本動畫或越南料理；又或者其中有一位參與者是韓國人，並且希望用母語漢字來表達自己的名字。因此，自由輸入欄位（freeform fields）應該很少使用`enforced`值，而應盡可能優先選擇`truncateAfterCompositionEnds`值。

## 時程

合併於版本：v1.26.0-1.0.pre<br>  
正式版發布：2.0.0

## 參考資料

設計文件：

* [`MaxLengthEnforcement` design doc][`MaxLengthEnforcement` design doc]

API 文件：

* [`MaxLengthEnforcement`][`MaxLengthEnforcement`]
* [`LengthLimitingTextInputFormatter`][`LengthLimitingTextInputFormatter`]
* [`maxLength`][`maxLength`]

相關議題：

* [Issue 63753][Issue 63753]
* [Issue 67898][Issue 67898]

相關 PR：

* [PR 63754][PR 63754]：修正 TextField 在組字與設定 maxLength 時發生崩潰
* [PR 68086][PR 68086]：導入`MaxLengthEnforcement`

[`MaxLengthEnforcement` design doc]: /go/max-length-enforcement
[`MaxLengthEnforcement`]: {{site.api}}/flutter/services/MaxLengthEnforcement.html
[`LengthLimitingTextInputFormatter`]: {{site.api}}/flutter/services/LengthLimitingTextInputFormatter-class.html
[`maxLength`]: {{site.api}}/flutter/services/LengthLimitingTextInputFormatter/maxLength.html
[Issue 63753]: {{site.repo.flutter}}/issues/63753
[Issue 67898]: {{site.repo.flutter}}/issues/67898
[PR 63754]: {{site.github}}/flutter/flutter/pull/63754
[PR 68086]: {{site.repo.flutter}}/pull/68086
