---
title: forgetChild() 方法必須呼叫 super
description: >
    任何覆寫 forgetChild 的元素子類別都必須呼叫 super。
---

{% render docs/breaking-changes.md %}

## 摘要

近期針對全域 key 重複偵測的重構，現在要求所有覆寫 `forgetChild()` 的 `Element` 子類別必須呼叫 `super()`。

## 背景說明

當遇到一個全域 key 重複的情況，且該情況會在元素重建（rebuild）時被清理時，
我們不應該回報全域 key 重複。
先前的實作方式是在偵測到重複時立即拋出錯誤，
而不會等待重建（即使具有重複全域 key 的元素會被重建）。

新的實作會在一次建構（build）週期內追蹤所有全域 key 重複情況，
並只會在該週期結束時才驗證全域 key 是否重複，而不是立即拋出錯誤。
在這次重構過程中，我們實作了一個機制，
如果發生重建，則會在 `forgetChild` 中移除先前的全域 key 重複紀錄。
然而，這需要所有覆寫 `forgetChild` 的 `Element` 子類別都必須呼叫 `super` 方法。

## 變更說明

抽象類別 `Element` 的 `forgetChild` 提供了移除全域 key 保留的基礎實作，
並且透過 `@mustCallSuper` meta 標籤強制執行。
所有覆寫該方法的子類別都必須呼叫 `super`；
否則，分析器會顯示 lint 錯誤，且全域 key 重複偵測可能會拋出非預期錯誤。

## 遷移指南

在以下範例中，一個應用程式的 `Element` 子類別覆寫了 `forgetChild` 方法。

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

合併於版本：1.16.3<br>  
進入穩定版本：1.17

## 參考資料

API 文件：

* [`Element`][`Element`]
* [`forgetChild()`][`forgetChild()`]

相關議題：

* [Issue 43780][Issue 43780]

相關 PR：

* [PR 43790: Fix global key error][PR 43790: Fix global key error]


[`Element`]: {{site.api}}/flutter/widgets/Element-class.html
[`forgetChild()`]: {{site.api}}/flutter/widgets/Element/forgetChild.html
[Issue 43780]: {{site.repo.flutter}}/issues/43780
[PR 43790: Fix global key error]: {{site.repo.flutter}}/pull/46183
