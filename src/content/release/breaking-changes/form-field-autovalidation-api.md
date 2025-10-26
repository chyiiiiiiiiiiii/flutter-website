---
title: 全新 Form、FormField 自動驗證 API
description: 提供更靈活的控制方式，決定如何自動驗證 Form 和 FormField。
---

{% render docs/breaking-changes.md %}

## 摘要

先前針對 `Form` 和 `FormField` 元件（Widgets）的自動驗證 API，無法控制自動驗證發生的時機。因此，這些元件的自動驗證總是在第一次建構（build）時，也就是元件首次對使用者可見時就會執行，且無法由開發者自行控制自動驗證的觸發時機。

## 背景說明

由於原本的 API 無法讓開發者調整自動驗證的行為，例如僅在使用者與表單欄位互動時才進行驗證，因此我們新增了新的 API，讓開發者可以自行設定 `Form` 和 `FormField` 元件（Widgets）自動驗證的行為。

## 變更內容說明

此次變更包含以下內容：

* `autovalidate` 參數已被棄用。
* 新增了一個名為 `autovalidateMode` 的參數，
  這是一個列舉型別（Enum），可接受 `AutovalidateMode`
  列舉類別（Enum class）中的值。

## 遷移指南

若要遷移至新的自動驗證 API，您需要將已棄用的 `autovalidate`
參數替換為新的 `autovalidateMode` 參數。
如果您希望維持原有的行為，可以使用：
`autovalidateMode = AutovalidateMode.always`。
這樣您的 `Form` 和 `FormField` 元件（Widgets）將會在第一次建構時及每次變更時自動驗證。

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
正式版釋出：1.22

## 參考資料

API 文件：

* [`AutovalidateMode`]({{site.api}}/flutter/widgets/AutovalidateMode.html)

相關議題：

* [Issue 56363]({{site.repo.flutter}}/issues/56363)
* [Issue 18885]({{site.repo.flutter}}/issues/18885)
* [Issue 15404]({{site.repo.flutter}}/issues/15404)
* [Issue 36154]({{site.repo.flutter}}/issues/36154)
* [Issue 48876]({{site.repo.flutter}}/issues/48876)

相關 PR：

* [PR 56365: FormField 應僅在內容變更時自動驗證]({{site.github}}/flutter/pull/56365)
* [PR 59766: FormField 應僅在內容變更時自動驗證
  （修正版）]({{site.repo.flutter}}/pull/59766)
