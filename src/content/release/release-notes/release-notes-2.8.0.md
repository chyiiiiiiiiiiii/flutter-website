---
title: Flutter 2.8.0 發行說明
shortTitle: 2.8.0 發行說明
description: Flutter 2.8.0 的發行說明。
---
本頁為 2.8.0 的發行說明。
關於後續錯誤修正版本，請參閱我們的 [CHANGELOG][CHANGELOG]

[CHANGELOG]: https://github.com/flutter/flutter/blob/master/CHANGELOG.md

## 依標籤分類的已合併 PR（`flutter/flutter`）




#### cla: yes - 1080 個 Pull Request

[65015](https://github.com/flutter/flutter/pull/65015) PageView 從零尺寸 viewport 調整大小時不應遺失狀態（framework, f: material design, f: scrolling, cla: yes, waiting for tree to go green, a: state restoration）


[75110](https://github.com/flutter/flutter/pull/75110) 在適用處使用 FadeTransition 取代 Opacity（framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green）


[79350](https://github.com/flutter/flutter/pull/79350) 指明僅支援實體 iOS 裝置（team, cla: yes, waiting for tree to go green）


[82670](https://github.com/flutter/flutter/pull/82670) 預設啟用 Android Q 過場動畫（framework, f: material design, cla: yes, waiting for tree to go green）


[83028](https://github.com/flutter/flutter/pull/83028) 修正註解（framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green, documentation）


[83047](https://github.com/flutter/flutter/pull/83047) [Material 3] 新增 Navigation Bar 元件至 flutter framework（framework, f: material design, cla: yes, waiting for tree to go green）


[84307](https://github.com/flutter/flutter/pull/84307) 在 `EditableText.onSubmitted` 之後重啟 input connection（a: text input, platform-android, platform-ios, framework, f: material design, a: fidelity, cla: yes, waiting for tree to go green）


[84394](https://github.com/flutter/flutter/pull/84394) 為 DraggableScrollableSheet 新增吸附行為（Snapping Behavior）（severe: new feature, team, framework, f: scrolling, cla: yes, d: examples, waiting for tree to go green）


[84611](https://github.com/flutter/flutter/pull/84611) 為 integration_test 新增原生 iOS 截圖（team, platform-ios, cla: yes, waiting for tree to go green, integration_test）


[84707](https://github.com/flutter/flutter/pull/84707) [integration_test] 修正 example 中的路徑（cla: yes, waiting for tree to go green）


[84946](https://github.com/flutter/flutter/pull/84946) 修正已停用 IconButton 的滑鼠游標（framework, f: material design, cla: yes）


[84993](https://github.com/flutter/flutter/pull/84993) 修正：保留橫向 stepper 的狀態（framework, f: material design, cla: yes, waiting for tree to go green）


[85482](https://github.com/flutter/flutter/pull/85482) 修正 pending analyzer 變更對 avoid_renaming_method_parameters 的影響（team, framework, f: material design, a: internationalization, cla: yes, waiting for tree to go green）


[85652](https://github.com/flutter/flutter/pull/85652) [新功能] RawScrollbar.shape 支援（severe: new feature, framework, f: scrolling, cla: yes, waiting for tree to go green）


[85653](https://github.com/flutter/flutter/pull/85653) 鍵盤文字選取與自動換行（a: text input, framework, cla: yes）


[85718](https://github.com/flutter/flutter/pull/85718) 修正 scale delta 文件與計算（framework, cla: yes）


[85743](https://github.com/flutter/flutter/pull/85743) 可覆寫的 action（framework, cla: yes, waiting for tree to go green）


[85968](https://github.com/flutter/flutter/pull/85968) 將 localEngineOut 改為 local-engine-out（tool, cla: yes）


[86067](https://github.com/flutter/flutter/pull/86067) 為垂直 stepper 新增 margin（framework, f: material design, cla: yes, waiting for tree to go green）


[86312](https://github.com/flutter/flutter/pull/86312) [autofill] 改為 opt-out 而非 opt-in（framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green）


[86555](https://github.com/flutter/flutter/pull/86555) ImageInfo 新增 sizeBytes getter，解耦 ImageCache 與 ui.Image（severe: new feature, framework, cla: yes, a: images）


[86736](https://github.com/flutter/flutter/pull/86736) 文字編輯模型重構（framework, f: material design, cla: yes, f: cupertino, work in progress; do not review）


[86796](https://github.com/flutter/flutter/pull/86796) [EditableText] 失去焦點時保留選取/組成範圍（framework, f: material design, cla: yes, waiting for tree to go green）


[86821](https://github.com/flutter/flutter/pull/86821) 減少測試集執行時的 tag 支援（a: tests, team, tool, framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green, tech-debt）


[86844](https://github.com/flutter/flutter/pull/86844) [gen_l10n] 處理任意 DateFormat pattern（waiting for customer response, tool, cla: yes）


[86986](https://github.com/flutter/flutter/pull/86986) 遷移文字選取操作（framework, cla: yes）


[87022](https://github.com/flutter/flutter/pull/87022) [tools] 在非 verbose 模式下於 Flutter doctor 顯示 Xcode 版本（tool, cla: yes, waiting for tree to go green）


[87076](https://github.com/flutter/flutter/pull/87076) 為 scroll position 新增 hook，當尺寸變更時通知滾動 context（a: tests, framework, a: accessibility, f: scrolling, cla: yes, waiting for tree to go green）


[87109](https://github.com/flutter/flutter/pull/87109) TextField.autofocus 應跳過從未 layout 的元素（framework, f: material design, cla: yes, waiting for tree to go green）


[87172](https://github.com/flutter/flutter/pull/87172) DataRow 新增 onLongPress（framework, f: material design, cla: yes）


[87197](https://github.com/flutter/flutter/pull/87197) find.text() 新增 RichText 支援（a: tests, severe: new feature, framework, cla: yes）


[87231](https://github.com/flutter/flutter/pull/87231) 文件產生切換為 snippets 套件（team, framework, f: material design, cla: yes, f: cupertino）


[87264](https://github.com/flutter/flutter/pull/87264) 修正 BuildableMacOSApp 傳遞 no projectBundleId 至 super 錯誤（tool, cla: yes, waiting for tree to go green）


[87280](https://github.com/flutter/flutter/pull/87280) 範例程式碼抽出至 examples/api（team, framework, f: material design, cla: yes, f: cupertino, d: examples）


[87294](https://github.com/flutter/flutter/pull/87294) Linux 支援 Home/End 鍵（framework, cla: yes）


[87297](https://github.com/flutter/flutter/pull/87297) 再嘗試：於 test binding 的 postTest 還原 surface size 與 view configuration（a: tests, framework, cla: yes）


[87329](https://github.com/flutter/flutter/pull/87329) 使 kMaterialEdges 為 const（framework, f: material design, cla: yes）


[87404](https://github.com/flutter/flutter/pull/87404) 修正 _RenderDecoration 的 computeMinIntrinsicHeight（framework, f: material design, cla: yes, waiting for tree to go green）


[87430](https://github.com/flutter/flutter/pull/87430) 更新 TabPageSelector 無障礙語意標籤在地化（framework, f: material design, a: internationalization, cla: yes, waiting for tree to go green）


[87557](https://github.com/flutter/flutter/pull/87557) [NNBD] 更新 dart preamble 程式碼（framework, f: material design, cla: yes）


[87595](https://github.com/flutter/flutter/pull/87595) 新增 time picker entry mode callback 與測試（framework, f: material design, cla: yes）


[87604](https://github.com/flutter/flutter/pull/87604) 滾動視圖使用裝置專屬手勢設定（a: tests, framework, cla: yes, waiting for tree to go green）


[87607](https://github.com/flutter/flutter/pull/87607) 等待 module UI 測試按鈕可點擊後再點擊（team, cla: yes, team: flakes, waiting for tree to go green）


[87618](https://github.com/flutter/flutter/pull/87618) 修正 AnimatedCrossFade 會聚焦於隱藏元件的問題（framework, a: animation, cla: yes, f: focus）


[87619](https://github.com/flutter/flutter/pull/87619) 新專案不再設定 SplashScreenDrawable（tool, cla: yes, waiting for tree to go green）


[87638](https://github.com/flutter/flutter/pull/87638) 不顯示空的提示訊息（Tooltip，當 `message` 屬性為空時）（framework, f: material design, cla: yes, waiting for tree to go green）


[87678](https://github.com/flutter/flutter/pull/87678) hasStrings 支援消除剪貼簿通知（framework, f: material design, cla: yes, f: cupertino）


[87692](https://github.com/flutter/flutter/pull/87692) 更新至最新發佈的 DevTools 2.5.0（cla: yes）


[87693](https://github.com/flutter/flutter/pull/87693) 還原「update ScrollMetricsNotification」（framework, cla: yes, f: cupertino）


[87694](https://github.com/flutter/flutter/pull/87694) [ci.yaml] 新增相依套件（cla: yes, waiting for tree to go green）


[87698](https://github.com/flutter/flutter/pull/87698) 當有導向的 scroll controller 時，防止 Scrollbar 軸翻轉（framework, f: scrolling, cla: yes, a: quality, waiting for tree to go green, a: error message）


[87700](https://github.com/flutter/flutter/pull/87700) 更新 rendering 目錄的跳過測試（team, framework, cla: yes, tech-debt, skip-test）


[87701](https://github.com/flutter/flutter/pull/87701) Roll Engine 從 a0d89b1a543d 到 36eb9a67a8ff（1 次修訂）（cla: yes, waiting for tree to go green）


[87703](https://github.com/flutter/flutter/pull/87703) Roll Engine 從 36eb9a67a8ff 到 f3ca5fd71537（5 次修訂）（cla: yes, waiting for tree to go green）


[87705](https://github.com/flutter/flutter/pull/87705) Roll Engine 從 f3ca5fd71537 到 22a29ac9b38c（2 次修訂）（cla: yes, waiting for tree to go green）


[87706](https://github.com/flutter/flutter/pull/87706) Roll Engine 從 22a29ac9b38c 到 c3739afe0af6（1 次修訂）（cla: yes, waiting for tree to go green）


[87707](https://github.com/flutter/flutter/pull/87707) `showModalBottomSheet` 不應釋放使用者提供的 controller（framework, f: material design, cla: yes, waiting for tree to go green）


[87711](https://github.com/flutter/flutter/pull/87711) Roll Engine 從 c3739afe0af6 到 381d54e4c78c（1 次修訂）（cla: yes, waiting for tree to go green）


[87713](https://github.com/flutter/flutter/pull/87713) Roll Engine 從 381d54e4c78c 到 72250a6c87a1（1 次修訂）（cla: yes, waiting for tree to go green）


[87716](https://github.com/flutter/flutter/pull/87716) Roll Engine 從 72250a6c87a1 到 2c45b6e652bf（1 次修訂）（cla: yes, waiting for tree to go green）


[87726](https://github.com/flutter/flutter/pull/87726) Roll Engine 從 2c45b6e652bf 到 f1a759d98ad3（1 次修訂）（cla: yes, waiting for tree to go green）


[87731](https://github.com/flutter/flutter/pull/87731) [flutter_tools] 再上線「升級僅支援標準遠端」功能（tool, cla: yes, waiting for tree to go green）


[87740](https://github.com/flutter/flutter/pull/87740) 更新 MaterialScrollBehavior.buildScrollbar 以支援橫向軸（framework, f: material design, a: fidelity, f: scrolling, cla: yes, waiting for tree to go green）


[87746](https://github.com/flutter/flutter/pull/87746) Roll Engine 從 f1a759d98ad3 到 07ec4b82c71c（3 次修訂）（cla: yes, waiting for tree to go green）


[87747](https://github.com/flutter/flutter/pull/87747) 將 flutter tool 指令分類（tool, cla: yes, waiting for tree to go green）


[87750](https://github.com/flutter/flutter/pull/87750) [ci.yaml] 為 devicelab host only targets 新增 gradle 快取（cla: yes, waiting for tree to go green）


[87751](https://github.com/flutter/flutter/pull/87751) Roll Engine 從 07ec4b82c71c 到 4092390a6c29（1 次修訂）（cla: yes, waiting for tree to go green）


[87752](https://github.com/flutter/flutter/pull/87752) Roll Engine 從 4092390a6c29 到 431ac604da1b（1 次修訂）（cla: yes, waiting for tree to go green）


[87756](https://github.com/flutter/flutter/pull/87756) [flutter_conductor] 美化 state JSON 檔案輸出（team, cla: yes）


[87759](https://github.com/flutter/flutter/pull/87759) Python 呼叫遷移至 python3（team, cla: yes）


[87763](https://github.com/flutter/flutter/pull/87763) Roll Engine 從 431ac604da1b 到 c0e59bc7b65e（1 次修訂）（cla: yes, waiting for tree to go green）


[87767](https://github.com/flutter/flutter/pull/87767) Notification 文件修正（framework, cla: yes, waiting for tree to go green）


[87775](https://github.com/flutter/flutter/pull/87775) 修正 showBottomSheet controller 記憶體洩漏（framework, a: animation, f: material design, cla: yes, a: quality, waiting for tree to go green, perf: memory）


[87786](https://github.com/flutter/flutter/pull/87786) 從 API 文件移除 fuchsia_remote_debug_protocol（team, cla: yes）


[87792](https://github.com/flutter/flutter/pull/87792) 將 hitTest 簽名改為 non-nullable（framework, f: material design, cla: yes, f: cupertino, waiting for tree to go green）


[87801](https://github.com/flutter/flutter/pull/87801) 修正 NestedScrollView 的精度誤差（framework, f: scrolling, cla: yes, waiting for tree to go green）


[87813](https://github.com/flutter/flutter/pull/87813) [ci.yaml] 空提交以驗證 LUCI 設定（cla: yes）


[87814](https://github.com/flutter/flutter/pull/87814) [ci.yaml] 修正 firebase recipe、xcode 版本與 web_benchmarks（cla: yes, waiting for tree to go green）


[87818](https://github.com/flutter/flutter/pull/87818) 再上線「update ScrollMetricsNotification (#87421)」（framework, cla: yes, f: cupertino）


[87824](https://github.com/flutter/flutter/pull/87824) 修正 page getter 內容維度的 null 檢查（framework, cla: yes, waiting for tree to go green）


[87829](https://github.com/flutter/flutter/pull/87829) Roll Engine 從 c0e59bc7b65e 到 4fef55db1031（12 次修訂）（cla: yes, waiting for tree to go green）


[87839](https://github.com/flutter/flutter/pull/87839) Android 12 超出滾動拉伸效果（severe: new feature, platform-android, framework, f: material design, f: scrolling, cla: yes, f: cupertino, f: gestures, customer: crowd, waiting for tree to go green, customer: money (g3), will affect goldens, e: OS Version specific）


[87859](https://github.com/flutter/flutter/pull/87859) 在 UWP 範本中以 `{{projectName}}` 作為 BINARY_NAME 與 CMake 專案名稱（tool, cla: yes, waiting for tree to go green, e: uwp）


[87872](https://github.com/flutter/flutter/pull/87872) 修正 SliverAppBar 範例程式碼的編譯錯誤（framework, f: material design, cla: yes, waiting for tree to go green）


[87873](https://github.com/flutter/flutter/pull/87873) 更新 scheduler 目錄的跳過測試（team, framework, cla: yes, tech-debt, skip-test）


[87874](https://github.com/flutter/flutter/pull/87874) 更新 services 目錄的跳過測試（team, framework, cla: yes, tech-debt, skip-test）


[87879](https://github.com/flutter/flutter/pull/87879) 更新 widgets 目錄的跳過測試（team, framework, cla: yes, will affect goldens, tech-debt, skip-test）


[87880](https://github.com/flutter/flutter/pull/87880) 更新 flutter_test



