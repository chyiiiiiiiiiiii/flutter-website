---
title: 排程器層與服務層之間的相依性反轉
description: 服務層現在依賴於排程器層。
---

{% render docs/breaking-changes.md %}

## 摘要

服務層現在依賴於排程器層。
過去則是相反。如果你有自訂綁定（custom bindings）覆寫了 Flutter 的 `SchedulerBinding` 或 `ServicesBinding`，這項變更可能會影響到你。

## 背景

在這項變更之前，排程器層是依賴服務層的。這次變更反轉了相依鏈，讓服務層可以使用排程器層中的排程原語（scheduling primitives）。例如，服務層中的服務現在可以透過 `SchedulerBinding.scheduleTask` 來排程任務。

## 變更說明

這項變更僅影響那些基於 Flutter 的 `SchedulerBinding` 和 `ServicesBinding` 定義自訂綁定（custom bindings）的使用者。

## 遷移指南

在這項變更之前，必須先定義 `ServiceBinding`，再定義 `SchedulerBinding`。而現在則相反：

遷移前的程式碼：

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
穩定版本：1.20

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
