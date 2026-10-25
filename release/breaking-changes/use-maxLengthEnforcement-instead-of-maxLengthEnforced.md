# 請改用 maxLengthEnforcement 取代 maxLengthEnforced

> 介紹 MaxLengthEnforcement 列舉型別。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

若要控制 `maxLength` 在 `LengthLimitingTextInputFormatter` 中的行為，請改用 `maxLengthEnforcement`，取代現已棄用的 `maxLengthEnforced`。

## 背景說明

過去會使用 `maxLengthEnforced` 參數來決定，當文字欄位（text field）達到 `maxLength` 限制時，是否要截斷輸入值，或是在（`TextField` 與 `TextFormField`）超過 `maxLength` 時，於字元計數顯示警告訊息。

然而，輸入 CJK（中日韓）字元時，部分輸入法需要使用者先輸入一連串拉丁字母，然後將這些字母轉換為所需的 CJK 字元（這個過程稱為 *文字組成*，text composition）。拉丁字母序列通常會比最終產生的 CJK 字元還要長，因此若對文字欄位設置嚴格的最大字元數限制，可能會導致使用者因 `maxLength` 字元限制而無法正常完成文字組成。

某些輸入法也會利用文字組成來標示高亮區域內的文字正在被編輯，即使是在輸入拉丁字母時也是如此。例如，Android 上的 Gboard 英文鍵盤（以及許多其他 Android 輸入法）會將目前輸入的單字放在組成區域（composing region）中。

為了提升這些情境下的輸入體驗，新增了一個三態列舉型別（enum）`MaxLengthEnforcement`。其各個值描述了在套用 `LengthLimitingTextInputFormatter` 時，針對正在進行組成區域的處理策略。文字欄位新增了一個採用此列舉型別的新 `maxLengthEnforcement` 參數，以取代原本的布林值 `maxLengthEnforced` 參數。透過這個新的列舉型別參數，開發者可以根據文字欄位預期的內容類型，選擇不同的處理策略。

如需更多資訊，請參閱 [`maxLength`][] 與 [`MaxLengthEnforcement`][] 的文件。

`maxLengthEnforcement` 參數的預設值會根據應用程式的 `TargetPlatform` 自動推斷，以符合各平台的慣例：

## 變更說明

* 新增 `maxLengthEnforcement` 參數，採用新的列舉型別 `MaxLengthEnforcement`，以取代現已棄用的布林值 `maxLengthEnforced` 參數，適用於 `TextField`、`TextFormField`、`CupertinoTextField` 與 `LengthLimitingTextInputFormatter` 類別。

## 遷移指南

_建議使用目前平台的預設行為，因為這通常是使用者最熟悉的體驗。_

### `maxLengthEnforcement` 的預設值

* Android、Windows：`MaxLengthEnforcement.enforced`。
  這些平台會強制執行原生行為，無論是否正在進行組成，輸入值都會被截斷。
* iOS、macOS：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  這些平台本身沒有「最大長度」功能，因此需要開發者自行實作。這些平台尚未形成標準慣例。我們選擇允許組成內容超過最大長度，以避免影響 CJK 輸入。
* Web 與 Linux：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  這些平台沒有標準（且有許多實作行為互相衝突），但普遍慣例是預設允許組成內容超過最大長度。
* Fuchsia：`MaxLengthEnforcement.truncateAfterCompositionEnds`。
  此平台尚無慣例，因此我們選擇預設為最不可能造成資料遺失的方式。

### 永遠強制限制

若要在每次達到限制時都截斷輸入值（例如輸入驗證碼時），請於可編輯文字欄位中使用 `MaxLengthEnforcement.enforced`。

_若與依賴文字組成的輸入法搭配使用，此選項可能會造成不佳的使用體驗。當文字欄位預期會輸入任意內容（可能包含 CJK 字元）時，建議改用 `truncateAfterCompositionEnds` 選項。詳情請參閱[背景說明](#背景說明)章節。_

遷移前的程式碼：

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

### 若不強制限制

若要在 `TextField` 中顯示最大長度錯誤，
但在超過限制時**不**截斷內容，
請使用 `MaxLengthEnforcement.none`，而非
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

對於 `CupertinoTextField`，由於無法顯示錯誤訊息，
只需不要設定 `maxLength` 值即可。

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

若要在使用者進行組字輸入時避免截斷文字，請指定
`MaxLengthEnforcement.truncateAfterCompositionEnds`。
這種行為允許使用組字區域（composing region）大於最終結果文字的輸入法（例如中文、日文和韓文（CJK）輸入法），在編輯完成前可以暫時忽略限制。

_Android 上的 Gboard 英文鍵盤
（以及許多其他 Android 輸入法）
會在輸入單字時建立一個組字區域。
當用於 `truncateAfterCompositionEnds` 文字欄位時，
使用者不會在達到 `maxLength` 限制時立即被阻止。
如果您確信該文字欄位不會搭配會暫時產生較長組字區域的輸入法（如 CJK 輸入法）使用，
可以考慮 `enforced` 選項。_

實作程式碼如下：

```dart
TextField(
  maxLength: 6,
  maxLengthEnforcement: MaxLengthEnforcement.truncateAfterCompositionEnds, // Temporarily lifts the limit.
)
```

### 請注意不要假設輸入不會使用組字區域

當針對特定語系時，很容易假設所有使用者都會滿足於該語系的輸入。例如，針對英文社群的論壇軟體，可能會被認為只需要處理英文文字。然而，這類假設往往是錯誤的。例如，英文論壇的參與者可能會想討論日本動漫或越南料理；也可能有參與者是韓國人，並希望用母語漢字來表達自己的名字。因此，自由格式欄位（freeform fields）應該很少使用 `enforced` 值，而應盡可能優先考慮使用 `truncateAfterCompositionEnds` 值。

## 時程

合併於版本：v1.26.0-1.0.pre<br>
正式版釋出：2.0.0

## 參考資料

設計文件：

* [`MaxLengthEnforcement` design doc][]

API 文件：

* [`MaxLengthEnforcement`][]
* [`LengthLimitingTextInputFormatter`][]
* [`maxLength`][]

相關議題：

* [Issue 63753][]
* [Issue 67898][]

相關 PR：

* [PR 63754][]：修正 TextField 在組字及設定 maxLength 時崩潰的問題
* [PR 68086][]：導入 `MaxLengthEnforcement`

[`MaxLengthEnforcement` design doc]: /go/max-length-enforcement
[`MaxLengthEnforcement`]: https://api.flutter.dev/flutter/services/MaxLengthEnforcement.html
[`LengthLimitingTextInputFormatter`]: https://api.flutter.dev/flutter/services/LengthLimitingTextInputFormatter-class.html
[`maxLength`]: https://api.flutter.dev/flutter/services/LengthLimitingTextInputFormatter/maxLength.html
[Issue 63753]: https://github.com/flutter/flutter/issues/63753
[Issue 67898]: https://github.com/flutter/flutter/issues/67898
[PR 63754]: https://github.com/flutter/flutter/pull/63754
[PR 68086]: https://github.com/flutter/flutter/pull/68086

