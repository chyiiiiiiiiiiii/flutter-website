# forgetChild() 方法必須呼叫 super

> 任何覆寫 forgetChild 的元素子類別都必須呼叫 super。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

近期針對全域 key 重複偵測的重構，現在要求
`Element` 子類別若有覆寫 `forgetChild()`，必須呼叫 `super()`。

## 背景說明

當遇到全域 key 重複且該問題會在元素重建時被清除時，
我們不應回報全域 key 重複。
先前的實作在偵測到重複時會立即拋出錯誤，
而不會等待重建（即使該重複的全域 key 元素即將被重建）。

新的實作會在一次建構週期內追蹤所有全域 key 重複情形，
並僅在該週期結束時才驗證全域 key 是否重複，
而不是立即拋出錯誤。作為重構的一部分，
我們實作了一套機制，若發生重建，則會在 `forgetChild` 中移除先前的全域 key 重複紀錄。
然而，這需要所有覆寫 `forgetChild` 的 `Element` 子類別
都必須呼叫 `super` 方法。

## 變更說明

抽象類別 `Element` 的 `forgetChild` 具有基礎實作，
用於移除全域 key 保留，
並透過 `@mustCallSuper` meta 標籤強制執行。
所有覆寫該方法的子類別都必須呼叫 `super`；
否則，分析器會顯示 lint 錯誤，
且全域 key 重複偵測可能會拋出非預期錯誤。

## 遷移指南

以下範例中，某個應用程式的 `Element`
子類別覆寫了 `forgetChild` 方法。

遷移前的程式碼：

```dart
class CustomElement extends Element {

    @override
    void forgetChild(Element child) {
        ...
    }
}
```

遷移後的程式碼：

```dart
class CustomElement extends Element {

    @override
    void forgetChild(Element child) {
        ...
        super.forgetChild(child);
    }
}
```

## 時程

納入版本：1.16.3<br>
穩定版發行：1.17

## 參考資料

API 文件：

* [`Element`][]
* [`forgetChild()`][]

相關議題：

* [Issue 43780][]

相關 PR：

* [PR 43790: Fix global key error][]


[`Element`]: https://api.flutter.dev/flutter/widgets/Element-class.html
[`forgetChild()`]: https://api.flutter.dev/flutter/widgets/Element/forgetChild.html
[Issue 43780]: https://github.com/flutter/flutter/issues/43780
[PR 43790: Fix global key error]: https://github.com/flutter/flutter/pull/46183

