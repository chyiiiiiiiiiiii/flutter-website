---
title: Form 元件（Widget）不再支援作為 sliver 使用
description: >-
  Form 元件（Widget）現在內含 semantics 元件，
  因此無法再直接作為 sliver 使用。
---

{% render docs/breaking-changes.md %}

## 摘要

過去，Form 元件（Widget）本質上只是直接包裹其子元件（child）。這樣的設計允許一個包含 sliver 子元件的 Form（例如：Form(child: 其他 sliver)）在 CustomScrollView 或其他類似可滾動父元件中，被當作 sliver 使用。

然而，此 PR 在 Form 元件的內部結構中新增了一個 semantics 元件。這項變更改變了其渲染行為，意味著 Form 不再能直接作為 sliver 運作。

## 背景

這項變更是持續提升 Flutter 元件（Widgets）無障礙性與語意理解能力的努力之一。透過直接在 Form 內嵌 semantics 元件，框架能夠向無障礙服務提供更完善的資訊。

## 變更說明

這次的核心變動是在 Form 元件的 build 方法中整合了一個 semantics 元件。

## 遷移指南

如果您的應用程式目前沒有直接將 Form 元件作為 sliver 放在可滾動清單中
（例如：直接作為 CustomScrollView 的 slivers 屬性的子元件），則無需進行任何修改。

如果您的應用程式有將 Form 作為 sliver 使用，您需要將 Form 元件包裹在 SliverToBoxAdapter 內。SliverToBoxAdapter 是一個可包含單一 box 元件的 sliver，能將一般元件轉換為可放入 CustomScrollView 的 sliver。

遷移前的程式碼：

```dart
sliver: Form(
    key: controller.formKey,
    child: SomeWidgetWithFormFields(),
)
```

遷移後的程式碼：

```dart
sliver: SliverToBoxAdapter(
    child: Form(
        key: controller.formKey,
        child: SomeWidgetWithFormFields(),
    )
)
```

## 時程

已於版本：3.35.0-pre<br>
正式版本釋出：3.35

## 參考資料

API 文件：

* [`Form`]({{site.api}}/flutter/widgets/Form-class.html)

相關議題：

* [Issue 161628]({{site.repo.flutter}}/issues/161628)

相關 PR：

* [PR 170709: Add semantics role for form]({{site.repo.flutter}}/pull/170709)
