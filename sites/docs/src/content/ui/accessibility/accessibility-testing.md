---
title: 無障礙測試
description: 關於 Flutter 無障礙測試的相關資訊。
---

## 無障礙法規

為確保您的應用程式具備無障礙性，請依據公開標準進行檢查，例如
[Web Content Accessibility Guidelines (WCAG) 2][]、[EN 301 549][]，
並可利用 [Voluntary Product Accessibility Template (VPAT)][]
等資源自行評估您的產品。更多這些法規的詳細資訊，請參閱主要的[無障礙頁面](/ui/accessibility)。


[Web Content Accessibility Guidelines (WCAG) 2]: https://www.w3.org/WAI/standards-guidelines/wcag/
[EN 301 549]: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf
[Voluntary Product Accessibility Template (VPAT)]: https://www.itic.org/policy/accessibility/vpat

## 檢查無障礙支援

我們建議您使用自動化無障礙掃描工具來測試以下項目：

* Android 平台：
    1. 安裝 Android 的 [Accessibility Scanner][]
    1. 於 **Android 設定 > 無障礙 > Accessibility Scanner > 開啟**，啟用 Accessibility Scanner。
    1. 點選 Accessibility Scanner 的「勾選框」圖示按鈕以開始掃描。

* iOS 平台：
    1. 在 Xcode 中開啟您的 Flutter 應用程式的 `iOS` 資料夾。
    1. 選擇模擬器作為目標，然後點擊 **Run** 按鈕。
    1. 在 Xcode 中選擇
       **Xcode > Open Developer Tools > Accessibility Inspector**。
    1. 在 Accessibility Inspector 中，
       選擇 **Inspection > Enable Point to Inspect**，
       然後選取您正在執行的 Flutter 應用程式中的各種使用者介面元件，
       以檢查其無障礙屬性。
    1. 在 Accessibility Inspector 中，
       點選工具列上的 **Audit**，然後
       選擇 **Run Audit** 以取得潛在問題的報告。

* Web 平台：
    1. 開啟 Chrome DevTools（或其他瀏覽器的類似工具）。
    2. 檢查語意主機（semantics host）下的 HTML 樹狀結構，其中包含 Flutter 產生的 ARIA 屬性。
    3. 在 Chrome 的「Elements」分頁中，有一個「Accessibility」子分頁，
       可用於檢查匯出到語意樹的資料。


## 在行動裝置上測試無障礙

請使用 Flutter 的 [Accessibility Guideline API][] 測試您的應用程式。
此 API 會檢查您的應用程式 UI 是否符合 Flutter 的無障礙建議。
這些建議涵蓋文字對比、目標大小與目標標籤等項目。

以下程式碼片段展示如何在名為 `AccessibleApp` 的範例元件 (Widget) 上使用 Guideline API：

<?code-excerpt "accessibility/test/a11y_test.dart"?>
```dart title="test/a11y_test.dart"
import 'package:flutter_test/flutter_test.dart';
import 'package:your_accessible_app/main.dart';

void main() {
  testWidgets('Follows a11y guidelines', (tester) async {
    final SemanticsHandle handle = tester.ensureSemantics();
    await tester.pumpWidget(const AccessibleApp());

    // Checks that tappable nodes have a minimum size of 48 by 48 pixels
    // for Android.
    await expectLater(tester, meetsGuideline(androidTapTargetGuideline));

    // Checks that tappable nodes have a minimum size of 44 by 44 pixels
    // for iOS.
    await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));

    // Checks that touch targets with a tap or long press action are labeled.
    await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));

    // Checks whether semantic nodes meet the minimum text contrast levels.
    // The recommended text contrast is 3:1 for larger text
    // (18 point and above regular).
    await expectLater(tester, meetsGuideline(textContrastGuideline));
    handle.dispose();
  });
}
```

要嘗試這些測試，請在[以 `flutter create` 建立的新應用程式][create-new-app]上執行它們。
該應用程式主畫面上的每個按鈕都作為可點擊的目標，並以 18 點字型渲染文字。

您可以將 Guideline API 測試與其他[元件測試][widget tests]一起新增，
或是放在獨立的檔案中，例如本範例中的 `test/a11y_test.dart`。

[Accessibility Guideline API]: {{site.api}}/flutter/flutter_test/AccessibilityGuideline-class.html
[create-new-app]: /reference/create-new-app
[widget tests]: /testing/overview#widget-tests

## 在網頁上測試無障礙功能

您可以透過視覺化網頁應用程式所建立的語意節點來進行無障礙功能除錯，
方法是在 profile 與 release 模式下使用以下命令列旗標：

```console
flutter run -d chrome --profile --dart-define=FLUTTER_WEB_DEBUG_SHOW_SEMANTICS=true
```

啟用該旗標後，語意節點會顯示在元件（Widget）上方；
您可以驗證語意元素是否正確地放置在應有的位置。
如果語意節點放置不正確，請[提交錯誤回報][file a bug report]。

[Accessibility Scanner]: https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en
[file a bug report]: https://goo.gle/flutter_web_issue
