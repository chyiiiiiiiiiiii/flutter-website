# DevTools 2.28.1 發行說明

Dart 與 Flutter DevTools 2.28.1 版本
包含以下變更及其他一般性改進。
想了解更多有關 DevTools 的資訊，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

* 新增支援 DevTools 擴充功能。
  這表示如果你正在除錯一個依賴於 `package:foo` 的應用程式，
  且 `package:foo` 提供了 DevTools 擴充功能，
  你將會在 DevTools 中看到一個「Foo」分頁，
  可用來協助你除錯應用程式。
  若要為你的 pub 套件提供 DevTools 擴充功能，
  請參考
  [package:devtools_extensions](https://pub.dev/packages/devtools_extensions)
  的入門指南！

![DevTools 擴充功能範例](/assets/images/docs/tools/devtools/release-notes/images-2.28.1/example_devtools_extension.png "Example DevTools extension for package:foo_package")

* 修正 isolate 選擇器的主題化（theming）錯誤 -
  [#6403](https://github.com/flutter/devtools/pull/6403)
* 修正 isolate 錯誤，主 isolate 在 hot restart 時未重新選取 -
  [#6436](https://github.com/flutter/devtools/pull/6436)
* 對支援 hot reload 的 Dart server 應用程式顯示 hot reload 按鈕 -
  [#6341](https://github.com/flutter/devtools/pull/6341)
* 修正 hot restart 時發生的例外狀況 -
  [#6451](https://github.com/flutter/devtools/pull/6451)、
  [#6450](https://github.com/flutter/devtools/pull/6450)

## Inspector 更新

* 修正 inspector 服務呼叫是在選定的 isolate 上執行，
  而非主 isolate 的問題 -
  [#6434](https://github.com/flutter/devtools/pull/6434)

## Logging 更新

* 改善 Logging 檢視畫面頂部工具列的響應式（responsiveness） -
  [#6281](https://github.com/flutter/devtools/pull/6281)

* 新增複製篩選後日誌的功能 -
  [#6260](https://github.com/flutter/devtools/pull/6260)

  ![Logging 檢視畫面中篩選工具右側的複製按鈕](/assets/images/docs/tools/devtools/release-notes/images-2.28.1/logger_copy.png "The Logging view copy button")

## 完整提交紀錄

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.28.1)。
