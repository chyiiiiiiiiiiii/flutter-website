# FontWeight 也會控制可變字體的 weight 屬性

> 套用至文字樣式的 FontWeight 值，現在也會設定可變字體的 weight 屬性。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

文字樣式中的 `FontWeight` 現在也會設定可變字體 (variable fonts) 的 weight 屬性。不再需要另外使用 `FontVariation` 來控制這些字體的粗細。

## 背景

文字樣式可以指定 `FontWeight` 值，用來設定繪製文字時筆畫的粗細。`FontWeight` 會從隸屬同一字體家族的一組字體檔案中，選擇最接近的粗細。

然而，部分字體以[可變字體](https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts)的形式發行，單一字體檔案即可調整粗細等屬性。對於可變字體，應用程式還需要使用 `FontVariation` API 來設定所選字體檔案中 weight 變化軸的數值。

Flutter 現在已改變 `FontWeight` 的行為，使其在選取最接近的字體檔案的同時，也會設定可變字體的 weight 屬性。

## 變更說明

設定 `TextStyle` 等物件的 `fontWeight` 屬性，現在也會同時設定支援該屬性之字體的 `wght` 變化軸數值。Flutter 會在內部自動套用等同於在樣式中加入 `FontVariation('wght')` 屬性的效果，其數值與 `FontWeight` 相同。

`FontWeight` 實例現在可使用 1 到 1000 之間的任意整數值來建構。這使得可以使用超出 `FontWeight.w100` 到 `FontWeight.w900` 範圍、且非 100 倍數的粗細值。這也意味著使用 `FontWeight.lerp` 對字體進行線性插值時，可能產生 `FontWeight.w100` 到 `w900` 以外的數值。

`FontWeight.index` 屬性現已棄用，因為它只能識別 `FontWeight.w100` 到 `w900` 的粗細。應用程式應改用 `FontWeight.value` 來取得字體的粗細等級。

## 遷移指南

若應用程式使用了可變字體，並在文字樣式中指定了 `FontWeight` 但未搭配對應的 `FontVariation('wght')` 值，則可能會看到文字渲染結果的變化。

若不希望出現這些變化，應用程式應將 `FontWeight` 調整為能達到預期渲染效果的值。例如，若要還原字體的預設粗細，請將 `fontWeight` 設為 `FontWeight.normal`。

## 時程

引入版本：3.39.0-0.0.pre<br>
穩定版本：3.41

## 參考資料

API 文件：

* [`FontWeight`][]

相關 issue：

* [Issue 148026][]

相關 PR：

* [PR 175771][]

[`FontWeight`]: https://api.flutter.dev/flutter/dart-ui/FontWeight-class.html
[Issue 148026]: https://github.com/flutter/flutter/issues/148026
[PR 175771]: https://github.com/flutter/flutter/pull/175771

