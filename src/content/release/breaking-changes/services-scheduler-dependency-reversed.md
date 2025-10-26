---
title: 調整 scheduler 與 services 層之間的依賴關係
description: 現在 services 層會依賴 scheduler 層。
---

{% render docs/breaking-changes.md %}

## 摘要

現在 services 層會依賴 scheduler 層。
在此之前，依賴關係是相反的。如果你有定義自訂綁定（custom bindings）來覆寫 Flutter 的 `SchedulerBinding` 或 `ServicesBinding`，
這項變更可能會影響到你。

## 背景說明

在此變更之前，scheduler 層是依賴 services 層的。這次調整反轉了依賴鏈，讓 services 層可以使用 scheduler 層中的排程原件（scheduling primitives）。
例如，services 層中的服務現在可以透過 `SchedulerBinding.scheduleTask` 來排程任務。

## 變更內容說明

這項變更僅影響那些基於 Flutter 的 `SchedulerBinding` 和 `ServicesBinding` 定義自訂綁定（custom bindings）的使用者。

## 移轉指南

在此變更之前，`ServiceBinding` 必須在 `SchedulerBinding` 之前定義。現在則相反：

移轉前的程式碼：

```dart
class FooBinding extends BindingBase with ServicesBinding, SchedulerBinding {
 // ...
}
```

遷移後的程式碼：

```dart
class FooBinding extends BindingBase with SchedulerBinding, ServicesBinding {
 // ...
}
```

## 時程

引入版本：1.18.0<br>  
穩定版發佈：1.20

## 參考資料

API 文件：

* [`ServicesBinding`][`ServicesBinding`]
* [`SchedulerBinding`][`SchedulerBinding`]

相關 PR：

* [Reverse dependency between services and scheduler][Reverse dependency between services and scheduler]
* [Revert bindings dependency workaround][Revert bindings dependency workaround]

[Reverse dependency between services and scheduler]: {{site.repo.flutter}}/pull/54212
[Revert bindings dependency workaround]: {{site.repo.flutter}}/pull/54286
[`SchedulerBinding`]: {{site.api}}/flutter/scheduler/SchedulerBinding-mixin.html
[`ServicesBinding`]: {{site.api}}/flutter/scheduler/ServicesBinding-mixin.html
