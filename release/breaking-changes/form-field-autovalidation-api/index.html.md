# 全新 Form、FormField 自動驗證 API

> 提供更靈活的控制方式，決定何時自動驗證 Form 與 FormField。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

先前針對 `Form` 與 `FormField` 元件 (Widget) 的自動驗證 API，無法控制自動驗證發生的時機。因此，這些元件的自動驗證總是在元件首次建立並對使用者可見時發生，且無法由開發者控制自動驗證的觸發時機。

## 背景

由於原本的 API 不允許開發者調整自動驗證行為（例如僅在使用者與表單欄位互動時才驗證），我們新增了新的 API，讓開發者可以針對 `Form` 與 `FormField` 元件自訂自動驗證的行為。

## 變更說明

本次變更內容如下：

* `autovalidate` 參數已被棄用。
* 新增一個名為 `autovalidateMode` 的參數，
  這是一個列舉型別（Enum），可接受來自 `AutovalidateMode`
  列舉類別（Enum class）的值。

## 遷移指南

若要遷移至全新的自動驗證 API，您需要將原本已棄用的 `autovalidate`
參數，改為使用新的 `autovalidateMode` 參數。
如果您希望維持與過去相同的行為，可以使用：
`autovalidateMode = AutovalidateMode.always`。
這樣您的 `Form` 與 `FormField` 元件將會在首次建立以及每次變動時自動驗證。

遷移前的程式碼：

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FormField(
      autovalidate: true,
      builder: (FormFieldState state) {
        return Container();
      },
    );
  }
}
```

遷移後的程式碼：

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FormField(
      autovalidateMode: AutovalidateMode.always,
      builder: (FormFieldState state) {
        return Container();
      },
    );
  }
}
```

## 時程

已於版本：1.21.0-5.0.pre<br>
正式版發佈於：1.22

## 參考資料

API 文件：

* [`AutovalidateMode`](https://api.flutter.dev/flutter/widgets/AutovalidateMode.html)

相關議題：

* [Issue 56363](https://github.com/flutter/flutter/issues/56363)
* [Issue 18885](https://github.com/flutter/flutter/issues/18885)
* [Issue 15404](https://github.com/flutter/flutter/issues/15404)
* [Issue 36154](https://github.com/flutter/flutter/issues/36154)
* [Issue 48876](https://github.com/flutter/flutter/issues/48876)

相關 PR：

* [PR 56365: FormField 應僅在內容變更時自動驗證](https://github.com/flutter/pull/56365)
* [PR 59766: FormField 應僅在內容變更時自動驗證（修正）](https://github.com/flutter/flutter/pull/59766)

