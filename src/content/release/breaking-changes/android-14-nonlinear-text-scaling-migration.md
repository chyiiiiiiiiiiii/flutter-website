---
title: 啟用 Android 14 非線性字體縮放
description: >-
  Flutter 在 v3.14 之後已啟用 Android 14 的全新非線性字體縮放功能。
---

{% render docs/breaking-changes.md %}

## 摘要

Android 14 引入了最高可達 200% 的非線性字體縮放功能。
當使用者在系統偏好設定中調整無障礙文字縮放時，
這可能會改變您的應用程式外觀。

## 背景

[Android 14 非線性字體縮放][Android 14 nonlinear font scaling] 功能可防止
無障礙字體縮放過度，當使用者在系統偏好設定中提高文字縮放值時，
較大的文字會以較低的比例縮放。

## 遷移指南

如同
[Android 14 功能總覽][Android 14 nonlinear font scaling] 所建議，
請在啟用最大字體大小（`200%`）的情況下測試您的 UI。
這應該可以驗證您的應用程式是否能正確套用字體大小，
並且在字體變大時不會影響可用性。

若要在您的應用程式與自訂元件（Widgets）中採用非線性字體縮放，
請考慮從 `textScaleFactor` 遷移至 `TextScaler`。
若想了解如何遷移至 `TextScaler`，
請參考
[棄用 `textScaleFactor`，改用 `TextScaler`][Deprecate `textScaleFactor` in favor of `TextScaler`] 遷移指南。

**暫時選擇退出**

若您希望在遷移應用程式之前，暫時在 Android 14 上停用非線性文字縮放，
請在應用程式元件樹的頂層加入修改過的 `MediaQuery`：

```dart 
runApp(
  Builder(builder: (context) {
    final mediaQueryData = MediaQuery.of(context);
    final mediaQueryDataWithLinearTextScaling = mediaQueryData
      .copyWith(textScaler: TextScaler.linear(mediaQueryData.textScaler.textScaleFactor));
    return MediaQuery(data: mediaQueryDataWithLinearTextScaling, child: realWidgetTree);
  }),
);
```

這個功能使用了已被棄用的 `textScaleFactor` API。
一旦該 API 從 Flutter API 中移除，這項功能將無法繼續運作。

## 時程

合併進版本：3.14.0-11.0.pre<br>
穩定版釋出：3.16

## 參考資料

API 文件：

* [`TextScaler`][`TextScaler`]

相關議題：

* [New font scaling system (Issue 116231)][New font scaling system (Issue 116231)]

相關 PR：

* [Implementing TextScaler for nonlinear text scaling][Implementing TextScaler for nonlinear text scaling]

另請參閱：

* [Deprecate `textScaleFactor` in favor of `TextScaler`][Deprecate `textScaleFactor` in favor of `TextScaler`]

[Android 14 nonlinear font scaling]: {{site.android-dev}}/about/versions/14/features#non-linear-font-scaling
[Deprecate `textScaleFactor` in favor of `TextScaler`]: /release/breaking-changes/deprecate-textscalefactor
[`TextScaler`]: {{site.api}}/flutter/painting/TextScaler-class.html
[New font scaling system (Issue 116231)]: {{site.repo.flutter}}/issues/116231
[Implementing TextScaler for nonlinear text scaling]: {{site.repo.engine}}/pull/44907
