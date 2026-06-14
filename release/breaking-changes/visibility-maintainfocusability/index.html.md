# 當啟用 maintainState 時，Visibility 元件預設不再可聚焦

> Visibility 元件 (Widget) 在啟用 maintainState 時，預設不再隱式保留其子元件的可聚焦性。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

此變更是為了解決一個問題，
即 `IndexedStack` 的隱藏子元件會因底層 `Visibility` 元件 (Widget) 的預設行為，
而能夠透過鍵盤事件取得焦點
（詳見 [issue](https://github.com/flutter/flutter/issues/114213)）。

## 變更說明

主要的變更是，當啟用 `maintainState` 時，`Visibility` 元件 (Widget) 預設不再可聚焦。
若要讓隱藏的元件 (Widget) 仍然可聚焦，必須同時將新的旗標 `maintainFocusability` 與 `maintainState` 設為 true。

## 遷移指南

如果您的應用程式中有 `Visibility` 元件 (Widget)，且未將 `maintainState` 設為 true，
則不需要做任何變更。

如果您的應用程式中有 `Visibility` 元件 (Widget)，且將 `maintainState` 設為 true，
並且您依賴於先前預設允許聚焦隱藏元件 (Widget) 的行為，
則需要將 `maintainFocusability` 設為 true。

遷移前的程式碼：

```dart
child: Visibility(
    maintainState: true,
    child: SomeWidget(),
)
```

遷移後的程式碼：

```dart
child: Visibility(
    maintainState: true,
    maintainFocusability: true,
    child: SomeWidget(),
)
```

## 時程

合併於版本：3.34.0-pre<br>
正式版本：3.35

## 參考資料

API 文件：

* [`Visibility`](https://api.flutter.dev/flutter/widgets/Visibility-class.html)

相關議題：

* [Issue 114213](https://github.com/flutter/flutter/issues/114213)

相關 PR：

* [PR 159133: 為 Visibility 新增排除隱藏子元件焦點的旗標 maintainFocusability。在 IndexedStack 中將 maintainFocusability 設為 false](https://github.com/flutter/flutter/pull/159133)

