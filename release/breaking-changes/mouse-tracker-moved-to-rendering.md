# MouseTracker 移至 rendering

> MouseTracker 及相關符號已移至 rendering 套件。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

[`MouseTracker`][] 及相關符號已從 `gestures` 套件移除，這將導致出現未定義類別或方法等錯誤訊息。請改為從 `rendering` 套件匯入這些符號。

## 背景說明

在此變更之前，[`MouseTracker`][] 屬於 `gestures` 套件。當我們發現與 [`MouseTracker`][] 相關的程式碼經常需要從 `rendering` 套件匯入時，這帶來了一些困擾。

由於 [`MouseTracker`][] 與 `rendering` 的關聯性高於 `gestures`，因此我們已將其及相關程式碼移至 `rendering`。

## 變更說明

`mouse_tracking.dart` 檔案已從 `gestures` 套件移動到 `rendering`。該檔案中的所有符號皆已移動，且未保留向下相容性。

## 遷移指南

如果你遇到以下符號出現「未定義類別」或「未定義名稱」的錯誤：

* [`MouseDetectorAnnotationFinder`][]
* [`MouseTracker`][]
* [`MouseTrackerAnnotation`][]
* [`PointerEnterEventListener`][]
* [`PointerExitEventListener`][]
* [`PointerHoverEventListener`][]

請加入以下匯入語句：

```dart
import 'package:flutter/rendering.dart';
```

## 時程

合併於版本：1.16.3<br>
正式版本：1.17

## 參考資料

API 文件：

* [`MouseDetectorAnnotationFinder`][]
* [`MouseTracker`][]
* [`MouseTrackerAnnotation`][]
* [`PointerEnterEventListener`][]
* [`PointerExitEventListener`][]
* [`PointerHoverEventListener`][]

相關議題：

* [將滑鼠事件轉換為本地座標系統][Transform mouse events to the local coordinate system]
* [將註解移至獨立樹狀結構][Move annotations to a separate tree]

相關 PR：

* [將 mouse_tracking.dart 移至 rendering][Move mouse_tracking.dart to rendering]

[Move annotations to a separate tree]: https://github.com/flutter/flutter/issues/49568
[Move mouse_tracking.dart to rendering]: https://github.com/flutter/flutter/pull/52781
[Transform mouse events to the local coordinate system]: https://github.com/flutter/flutter/issues/33675
[`MouseDetectorAnnotationFinder`]: https://api.flutter.dev/flutter/gestures/MouseDetectorAnnotationFinder.html
[`MouseTracker`]: https://api.flutter.dev/flutter/gestures/MouseTracker-class.html
[`MouseTrackerAnnotation`]: https://api.flutter.dev/flutter/gestures/MouseTrackerAnnotation-class.html
[`PointerEnterEventListener`]: https://api.flutter.dev/flutter/gestures/PointerEnterEventListener.html
[`PointerExitEventListener`]: https://api.flutter.dev/flutter/gestures/PointerExitEventListener.html
[`PointerHoverEventListener`]: https://api.flutter.dev/flutter/gestures/PointerHoverEventListener.html

