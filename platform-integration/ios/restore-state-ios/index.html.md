# 在 iOS 上還原狀態

> 說明如何在 iOS 應用程式被作業系統終止後還原其狀態。



當使用者執行行動應用程式，然後切換到其他應用程式時，
第一個應用程式會被移至背景，也就是所謂的 _背景執行_。
作業系統（無論是 iOS 或 Android）經常會為了釋放記憶體或
提升前景應用程式的效能，而終止背景執行的應用程式。

你可以使用 [`RestorationManager`][] (and related)
這些類別來處理狀態還原。
iOS 應用程式需要在 Xcode 進行[額外的設定][a bit of extra setup]，
但狀態還原相關的類別在 iOS 和 Android 上的運作方式基本相同。

如需更多資訊，請參考 [Android 上的狀態還原][State restoration on Android]。

[a bit of extra setup]: https://api.flutter.dev/flutter/services/RestorationManager-class.html#state-restoration-on-ios
[`RestorationManager`]: https://api.flutter.dev/flutter/services/RestorationManager-class.html
[State restoration on Android]: /platform-integration/android/restore-state-android

