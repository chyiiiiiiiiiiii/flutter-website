---
title: 無障礙技術
description: >-
  提供給 Flutter 開發者的無障礙技術相關資訊。
---

## 摘要

輔助技術（Assistive technologies）對於讓數位內容能被身心障礙者無障礙存取至關重要。本文將介紹兩大類與 Flutter 開發密切相關的輔助技術：針對視覺障礙者的螢幕閱讀器（screen readers），以及協助動作障礙者操作的輔助工具。透過瞭解並使用這些技術進行測試，您可以確保您的 Flutter 應用程式為所有人提供更具包容性與友善的使用體驗。

## 螢幕閱讀器（Screen readers）

在行動裝置上，螢幕閱讀器（如 [TalkBack][]、[VoiceOver][]）能讓視障使用者透過語音回饋瞭解螢幕內容，並可藉由手勢（行動裝置）或鍵盤快速鍵（桌面裝置）與 UI 互動。請在您的行動裝置上開啟 VoiceOver 或 TalkBack，並在您的應用程式中進行瀏覽。

**若要在您的裝置上開啟螢幕閱讀器，請依照下列步驟操作：**

<Tabs key="screen-reader-os" wrapped="true">

<Tab name="Android">

1. 在您的裝置上開啟 **設定**。
2. 選擇 **無障礙設定**，然後選擇 **TalkBack**。
3. 開啟或關閉「使用 TalkBack」。
4. 選擇確定。

若想瞭解如何尋找並自訂 Android 的無障礙功能，請參考以下影片。

<YouTubeEmbed id="FQyj_XTl01w" title="Customize Pixel and Android accessibility features" />

</Tab>
<Tab name="iOS or iPadOS">

1. 在您的裝置上開啟 **設定 > 輔助使用 > VoiceOver**
2. 開啟或關閉 VoiceOver 設定

若想瞭解如何尋找並自訂 iOS 的無障礙功能，請參考以下影片。

<YouTubeEmbed id="ROIe49kXOc8" title="How to navigate your iPhone or iPad with VoiceOver" />

</Tab>
<Tab name="Browsers">

在網頁端，目前支援以下螢幕閱讀器：

行動瀏覽器：

* iOS - VoiceOver
* Android - TalkBack

桌面瀏覽器：

* macOS - VoiceOver
* Windows - JAWs & NVDA

網頁上的螢幕閱讀器使用者必須切換「啟用無障礙功能」按鈕，以建立語意樹（semantics tree）。
如果您透過 API 程式化自動啟用應用程式的無障礙功能，則使用者可以略過這個步驟。

```dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  SemanticsBinding.instance.ensureSemantics();
}
```

</Tab>
<Tab name="Desktop">

Windows 內建有一個螢幕閱讀器稱為 Narrator，但有些開發者推薦使用更受歡迎的 NVDA 螢幕閱讀器。若想了解如何使用 NVDA 測試 Windows 應用程式，請參考
[Screen Readers 101 For Front-End Developers (Windows)][nvda]。

[nvda]: https://evinced.com/blog/screen-readers-101-for-front-end-developers-windows

在 Mac 上，你可以使用 macOS 內建的 VoiceOver 桌面版。

<YouTubeEmbed id="5R-6WvAihms" title="Screen reader basics: VoiceOver" />

在 Linux 上，較受歡迎的螢幕閱讀器為 Orca。部分發行版預先安裝了 Orca，也可於如 `apt` 等套件庫取得。若想了解如何使用 Orca，請參考 [Getting started with Orca screen reader on Gnome desktop][orca]。

[orca]: https://www.a11yproject.com/posts/getting-started-with-orca

</Tab>
</Tabs>

<br/>

你可以參考以下的 [影片示範][video demo]，了解如何在現已存檔的 [Flutter Gallery][Flutter Gallery] 網頁應用程式中使用 VoiceOver。

Flutter 的標準元件 (Widget) 會自動產生無障礙樹。不過，如果你的應用程式有不同需求，可以透過 [`Semantics` 元件][`Semantics` widget] 進行自訂。

當你的應用程式中有需要以特定語音朗讀的文字時，請呼叫 [`TextSpan.locale`][]，告知螢幕閱讀器應使用哪一種語音。
`MaterialApp.locale` 和 `Localizations.override`
將自 Flutter 3.38 版本起影響螢幕閱讀器的語音選擇。一般情況下，螢幕閱讀器會使用系統語音，除非你明確以 `TextSpan.locale` 設定。

[Flutter Gallery]: {{site.gallery-archive}}
[`TextSpan.locale`]: {{site.api}}/flutter/painting/TextSpan/locale.html
[`Semantics` widget]: {{site.api}}/flutter/widgets/Semantics-class.html
[TalkBack]: https://support.google.com/accessibility/android/answer/6283677?hl=en
[VoiceOver]: https://www.apple.com/lae/accessibility/iphone/vision/
[video demo]: {{site.yt.watch}}?v=A6Sx0lBP8PI

## 行動力支援

對於手部靈活度或力量有限的使用者，行動力支援功能非常有幫助。Android 與 iOS 都提供多種輔助工具，協助用戶更容易地操作與控制裝置。
這些功能讓使用者能透過外接開關、語音指令，或簡化的螢幕選單來操作裝置。

Android 提供 Switch Access、Voice Access 及 Accessibility Menu，而 iOS 則有 Switch Control、Voice Control 和 AssistiveTouch。了解這些工具有助於打造適合各種身體能力使用者的應用程式。

<table class="table table-striped">
  <thead>
    <tr>
      <th>作業系統 (OS)</th>
      <th>功能 (Features) </th>
      <th>功能說明 (Functions)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Android</td>
      <td><strong>Switch Access</strong> </td>
      <td>可作為替代輸入方式，支援 Switch Access 與 Camera Switches</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Voice Access</strong> </td>
      <td>以語音控制裝置</td>
    </tr>
    <tr>
      <td>Android</td>
      <td><strong>Accessibility Menu</strong> </td>
      <td>浮動於螢幕上的選單，提供簡化按鈕以控制主要手機功能。</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Switch Control</strong> </td>
      <td>以開關作為替代輸入方式</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>Voice Control</strong> </td>
      <td>以語音控制裝置</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td><strong>AssistiveTouch</strong> </td>
      <td>使用 AssistiveTouch 取代多指手勢或硬體按鍵操作</td>
    </tr>
  </tbody>
</table>
