# 啟用 Android 14 非線性字型縮放

> Android 14 的全新非線性字型縮放功能已於 Flutter v3.14 之後啟用。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

Android 14 引入了最高可達 200% 的非線性字型縮放功能。
當使用者在系統偏好設定中調整無障礙文字縮放時，這可能會改變您的應用程式外觀。

## 背景

[Android 14 非線性字型縮放][Android 14 nonlinear font scaling]功能可防止無障礙字型縮放過度，當使用者在系統偏好設定中提高文字縮放值時，較大的文字會以較低的比例縮放。

## 遷移指南

如同
[Android 14 功能概覽][Android 14 nonlinear font scaling]所建議，
請在啟用最大字型大小（`200%`）的情況下測試您的 UI。
這可以驗證您的應用程式是否能正確套用字型大小，並能在不影響可用性的前提下容納較大的字型。

若要在您的應用程式與自訂元件（Widgets）中採用非線性字型縮放，請考慮從 `textScaleFactor` 遷移至 `TextScaler`。
如需瞭解如何遷移至 `TextScaler`，
請參考
[Deprecate `textScaleFactor` in favor of `TextScaler`][Deprecate `textScaleFactor` in favor of `TextScaler`] 遷移指南。

**暫時選擇退出**

若您希望在完成遷移前暫時於 Android 14 上停用非線性文字縮放，
請在應用程式的元件樹（widget tree）頂部加入修改後的 `MediaQuery`：

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

這會使用已被棄用的 `textScaleFactor` API。
當該 API 從 Flutter API 中移除後，此功能將無法再運作。

## 時程表

合併於版本：3.14.0-11.0.pre<br>
進入穩定版本：3.16

## 參考資料

API 文件：

* [`TextScaler`][`TextScaler`]

相關議題：

* [新字型縮放系統（Issue 116231）][New font scaling system (Issue 116231)]

相關 PR：

* [實作 TextScaler 以支援非線性文字縮放][Implementing TextScaler for nonlinear text scaling]

另請參閱：

* [棄用 `textScaleFactor`，改用 `TextScaler`][Deprecate `textScaleFactor` in favor of `TextScaler`]

[Android 14 nonlinear font scaling]: https://developer.android.com/about/versions/14/features#non-linear-font-scaling
[Deprecate `textScaleFactor` in favor of `TextScaler`]: /release/breaking-changes/deprecate-textscalefactor
[`TextScaler`]: https://api.flutter.dev/flutter/painting/TextScaler-class.html
[New font scaling system (Issue 116231)]: https://github.com/flutter/flutter/issues/116231
[Implementing TextScaler for nonlinear text scaling]: https://github.com/flutter/engine/pull/44907

