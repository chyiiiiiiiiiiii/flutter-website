# 排程器層與服務層之間的相依性反轉

> 服務層現在依賴於排程器層。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


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

Landed in version: 1.18.0<br>
In stable release: 1.20

## 參考資料

API 文件：

* [`ServicesBinding`][]
* [`SchedulerBinding`][]

相關 PR：

* [Reverse dependency between services and scheduler][]
* [Revert bindings dependency workaround][]

[Reverse dependency between services and scheduler]: https://github.com/flutter/flutter/pull/54212
[Revert bindings dependency workaround]: https://github.com/flutter/flutter/pull/54286
[`SchedulerBinding`]: https://api.flutter.dev/flutter/scheduler/SchedulerBinding-mixin.html
[`ServicesBinding`]: https://api.flutter.dev/flutter/scheduler/ServicesBinding-mixin.html

