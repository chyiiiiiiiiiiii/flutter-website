---
title: UI 設計與樣式
description: 關於 Flutter 無障礙支援的資訊。
---

為了打造無障礙的應用程式，請在設計 UI 時考慮無障礙需求。
本頁將介紹無障礙 UI 設計與樣式的重點。

## 大字體

Android 與 iOS 都提供系統設定，讓使用者可以調整應用程式所使用的字體大小。Flutter 的文字元件 (Text Widgets) 會根據作業系統的設定來決定字體大小。

Flutter 會自動根據作業系統的設定計算字體大小。不過，身為開發者，您應確保版面配置在字體放大時仍有足夠空間顯示所有內容。
例如，您可以在設定為最大字體的螢幕較小裝置上測試應用程式的所有部分。

若要調整字體大小：在 iOS 上，前往
設定 > 輔助使用 > 顯示與文字大小；
在 Android 上，前往 設定 > 字體大小。

### 範例

下方兩張螢幕截圖分別顯示標準 Flutter 應用程式範本在 iOS 預設字體設定下，以及在 iOS 輔助使用設定中選擇最大字體時的呈現效果。

<div class="wrapping-row">
  <DashImage figure image="a11y/app-regular-fonts.png" caption="預設字體設定" img-class="simple-border" img-style="max-height: 480px;" />
  <DashImage figure image="a11y/app-large-fonts.png" caption="最大無障礙字體設定" img-class="simple-border" img-style="max-height: 480px;" />
</div>


## 足夠的對比度

足夠的色彩對比能讓文字與圖片更容易閱讀。
除了能幫助有各種視覺障礙的使用者外，足夠的色彩對比也有助於所有使用者在極端光線環境下瀏覽介面，
例如在強烈陽光下或螢幕亮度較低時。

[W3C 建議][W3C recommends]：

* 小字體（18 點以下一般字體或 14 點以下粗體）至少 4.5:1
* 大字體（18 點及以上一般字體或 14 點及以上粗體）至少 3.0:1

您可以使用 Flutter 的 [Accessibility Guideline API][Accessibility Guideline API] 來測試對比度。
更多測試細節，請參考 [無障礙測試頁面](/ui/accessibility/accessibility-testing/)。

[W3C recommends]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html

## 點擊目標大小

過小的控制元件會讓許多人難以操作與選取。
請確保互動元素有足夠大的點擊目標，方便使用者輕鬆點擊。

[Android][Android] 與 [iOS][iOS] 分別建議最小點擊目標尺寸為 48x48 dp 與 44x44 pts。

[W3C] 建議最小目標尺寸為 44 x 44 CSS 像素。

您可以使用 Flutter 的 [Accessibility Guideline API][Accessibility Guideline API] 來測試點擊目標大小。
更多測試細節，請參考 [無障礙測試頁面](/ui/accessibility/accessibility-testing/)。

[Android]: https://developer.android.com/guide/topics/ui/accessibility/apps#large-controls
[iOS]: https://developer.apple.com/design/human-interface-guidelines/accessibility#Mobility
[W3C]: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html

[Accessibility Guideline API]: {{site.api}}/flutter/flutter_test/AccessibilityGuideline-class.html

## 其他無障礙功能

您可以參考 [AccessibilityFeatures] 類別，瞭解平台可能啟用的其他無障礙功能，
例如粗體文字、高對比與反轉顏色等。

[AccessibilityFeatures]: https://api.flutter.dev/flutter/dart-ui/AccessibilityFeatures-class.html
