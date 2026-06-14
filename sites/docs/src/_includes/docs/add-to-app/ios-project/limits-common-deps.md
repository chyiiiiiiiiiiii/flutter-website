
Flutter 無法處理 [xcframeworks 的共用相依套件][common]。
若宿主應用程式與 Flutter 模組的插件定義了相同的 Pod 相依套件，
且你使用此選項整合 Flutter 模組，將會產生錯誤。
這些錯誤包括 `Multiple commands produce
'CommonDependency.framework'` 之類的問題。

若要解決此問題，請在宿主應用程式的 `Podfile` 中，
將 Flutter 模組內每個插件原始碼連結到其 `podspec` 檔案。
請連結原始碼，而非插件的 `xcframework` 框架。
下一節將說明如何[產生該框架][ios-framework]。

若要防止共用相依套件存在時發生的錯誤，
請使用帶有 `--no-plugins` 旗標的 `flutter build ios-framework` 指令。

[common]: https://github.com/flutter/flutter/issues/130220
[ios-framework]: https://github.com/flutter/flutter/issues/114692
