# DevTools 2.42.3 發行說明

Dart 與 Flutter DevTools 2.42.3 版本
包含了以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](/tools/devtools/overview)。

## 一般更新

* 在「關於」對話框中新增了「檢視授權」捷徑。- [#8610](https://github.com/flutter/devtools/pull/8610)

* 降低 wasm 最佳化等級，以解決 dart2wasm 構建時的崩潰問題。- [#8814](https://github.com/flutter/devtools/pull/8814)

## Inspector 更新

* 預設啟用新版 Inspector。你可以在 Inspector 設定中停用此功能。- [#8650](https://github.com/flutter/devtools/pull/8650)
    ![Legacy inspector setting](/assets/images/docs/tools/devtools/release-notes/images-2.42.3/legacy_inspector_setting.png "Legacy inspector setting")
* 修正當 [新版 Inspector](https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.40.1#inspector-updates) 隱藏實作元件 (Widgets) 時，在裝置上選取實作元件 (Widgets) 會顯示錯誤的問題。- [#8625](https://github.com/flutter/devtools/pull/8625)
* 預設啟用在熱重載與導覽事件時自動重新整理元件樹 (widget tree)。你可以在 Inspector 設定中停用此功能。- [#8646](https://github.com/flutter/devtools/pull/8646)
    ![Auto-refresh setting](/assets/images/docs/tools/devtools/release-notes/images-2.42.3/inspector_auto_refresh_setting.png "Inspector auto-refresh setting")

## 網路分析器 (Network profiler) 更新

* 修正當 DevTools 與應用程式透過較慢的網路連線通訊時，HTTP 請求有時無法正確顯示的問題。- [#8860](https://github.com/flutter/devtools/pull/8860)

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.42.3)。
