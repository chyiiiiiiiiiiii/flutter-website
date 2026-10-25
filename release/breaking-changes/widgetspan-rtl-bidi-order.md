# 從右至左文字中的 WidgetSpan 順序

> WidgetSpan 現在會在從右至左的文字中遵循雙向 (bidirectional) 視覺順序。 請移除先前用來補償舊版版面配置的因應做法。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

在從右至左 (RTL) 與混合方向的文字中，
`WidgetSpan` 元件 (Widget) 現在會遵循
Unicode 雙向演算法 (bidirectional algorithm) 所決定的視覺順序。
曾針對先前錯誤順序做補償的應用程式，
升級後可能會讓行內元件顯示在錯誤的位置。

## 背景

Skia 的段落版面配置先前會依原始順序放置行內元件的預留位置 (placeholder)，
即使周圍的文字在視覺上已重新排序也一樣。
這導致阿拉伯文、希伯來文與混合方向文字中的行內元件
出現在錯誤的位置。

段落版面配置現在會依雙向視覺順序放置行內元件的預留位置。
在你的 Dart 程式碼中，`WidgetSpan` 的子元件仍維持邏輯閱讀順序，
而版面配置會回傳帶有修正後視覺座標的預留位置方塊。
公開 API 的簽章沒有任何變動。

下列範例顯示混合方向文字中，行內元件修正後的位置：

| 變更前 | 變更後 |
| :---: | :---: |
| ![Incorrect widget order][before] | ![Correct widget order][after] |

## 遷移指南

如果你的應用程式使用 `WidgetSpan` 元件，且沒有針對舊版版面配置做補償，
則不需要變更任何程式碼。
否則，請移除專為此問題而加入的因應做法：

* 使用 `Transform.translate` 位移量或 `GlobalKey` 量測，
  來平移或對調同一行上的元件。
* 為 RTL 文字反轉 `WidgetSpan` 元件的原始順序。
  請讓 span 維持內容的邏輯順序，
  並交由文字版面配置決定其視覺位置。
* 在自訂版面配置程式碼中鏡射預留位置方塊的 x 座標。
  請直接使用回傳的座標。

例如，移除用來補償舊版 RTL 順序的平移。
此處的 `rtlSwapOffset` 是由應用程式的因應做法所計算出的位移量，
而 `inlineWidget` 是嵌入在文字中的元件。

遷移前的程式碼：

```dart
WidgetSpan(
  child: Transform.translate(
    offset: rtlSwapOffset,
    child: inlineWidget,
  ),
)
```

遷移後的程式碼：

```dart
WidgetSpan(child: inlineWidget)
```

同時也請移除計算補償位移量的程式碼。
檢查 RTL 與混合方向的文字（包含換行後的行），
並更新擷取了錯誤版面配置的 golden 測試。

## 時間軸

合併於版本：3.50.0-0.1.pre<br>
穩定版釋出：尚未

## 參考資料

GitHub issue：

* [Issue 54400][]

相關 PR：

* [Skia CL 1366676][]

[after]: /assets/images/docs/breaking-changes/widgetspan-rtl-after.webp
[before]: /assets/images/docs/breaking-changes/widgetspan-rtl-before.webp
[Issue 54400]: https://github.com/flutter/flutter/issues/54400
[Skia CL 1366676]: https://skia-review.googlesource.com/c/skia/+/1366676

