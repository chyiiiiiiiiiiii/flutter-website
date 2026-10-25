# DevTools 2.26.1 發行說明

> Dart 與 Flutter DevTools 2.26.1 版本的發行說明。



Dart 與 Flutter DevTools 2.26.1 版本
包含以下變更及其他一般性改進。
想進一步了解 DevTools，請參閱
[DevTools overview](https://docs.flutter.dev/tools/devtools)。

## 一般更新

- 在 DevTools 中新增了全新的「首頁」螢幕，根據
  目前的連線狀態，會顯示「連線」對話框
  或已連線應用程式的摘要資訊。
  請持續關注此螢幕，未來將會有更多新功能加入。
  此變更同時也讓 DevTools 支援靜態工具
  （不需要連接應用程式即可使用的工具）-
  [#6010](https://github.com/flutter/devtools/pull/6010)

  ![home screen](/assets/images/docs/tools/devtools/release-notes/images-2.26.1/home_screen.png "DevTools home screen")

- 修正了覆蓋式通知，現在會正確
  遮蔽其背景所阻擋的區域 -
  [#5975](https://github.com/flutter/devtools/pull/5975)

## 記憶體相關更新

- 在堆積快照（heap snapshot）清單中新增右鍵選單，可重新命名或刪除快照 -
  [#5997](https://github.com/flutter/devtools/pull/5997)
- 當 HTTP 日誌可能影響應用程式記憶體使用時，提醒使用者注意 -
  [#5998](https://github.com/flutter/devtools/pull/5998)

## 除錯器相關更新

- 改進了在程式碼檢視、主控台及變數視窗中的
  文字選取與複製行為 -
  [#6020](https://github.com/flutter/devtools/pull/6020)

## 網路分析器相關更新

- 新增選擇器，可自訂文字與 JSON 回應的顯示類型
  （感謝 @hhacker1999 的貢獻！）-
  [#5816](https://github.com/flutter/devtools/pull/5816)

## 完整提交記錄

若需查閱自上一版本以來的完整變更列表，
請參閱
[the diff on GitHub](https://github.com/flutter/devtools/compare/v2.25.0...v2.26.1)。

