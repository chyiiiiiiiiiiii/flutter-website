# DevTools 2.28.5 發行說明

Dart 與 Flutter DevTools 2.28.5 版本
包含了以下變更以及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

本次為 DevTools 2.28.4 之上的 cherry-pick 版本。
若想了解 DevTools 2.28.4 所包含的改進，請閱讀
[release notes](/tools/devtools/release-notes/release-notes-2.28.4)。

## Inspector 更新

* 僅快取使用者新增的 pub root 目錄。- [#6897](https://github.com/flutter/devtools/pull/6897)

* 若 Flutter pub root 不小心被快取則移除。- [#6911](https://github.com/flutter/devtools/pull/6911)

## DevTools Extension 更新

* 修正了數個導致 Dart server 應用程式無法連接至 DevTools 擴充功能的錯誤。- [#6982](https://github.com/flutter/devtools/pull/6982), [#6993](https://github.com/flutter/devtools/pull/6993)

## 完整提交歷史

如需本次發行的完整變更清單，請參閱
[DevTools git log](https://github.com/flutter/devtools/tree/v2.28.5)。
