---
title: Flutter 1.9.1 變更日誌
shortTitle: 1.9.1 變更日誌
description: Flutter 1.9.1 變更日誌，包含本次發行合併的所有 PR 列表。
---



## 本次 flutter/flutter 發行關閉的 PR

從 2019 年 6 月 21 日（五）22:31:55 -0400 至 2019 年 8 月 18 日（日）12:22:00 -0700

[28090](https://github.com/flutter/flutter/pull/28090) 確保快取目錄與檔案擁有適當權限（cla: yes, tool）

[29489](https://github.com/flutter/flutter/pull/29489) 進行了一些語法修正（cla: yes, team）

[32511](https://github.com/flutter/flutter/pull/32511) Widget 層級的渲染錯誤若有根本原因，應包含對應 widget 的參考（cla: yes, customer: countless, customer: headline, framework）

[32770](https://github.com/flutter/flutter/pull/32770) 按下任意按鍵即可關閉模態視窗（a: desktop, cla: yes, framework）

[32816](https://github.com/flutter/flutter/pull/32816) 新增 flutter assemble 初始實作（cla: yes, tool）

[33140](https://github.com/flutter/flutter/pull/33140) 支援 flutter/tests（cla: yes, team）

[33281](https://github.com/flutter/flutter/pull/33281) 更新 TextStyle 與 StrutStyle 的 height 文件（a: typography, cla: yes, d: api docs, framework, severe: API break）

[33688](https://github.com/flutter/flutter/pull/33688) 第一部分：Skia Gold 測試（a: tests, cla: yes, framework）

[33936](https://github.com/flutter/flutter/pull/33936) RawGestureDetector 新增參數以自訂語意對應（cla: yes, f: gestures, framework）

[34019](https://github.com/flutter/flutter/pull/34019) 可選取文字（Selectable Text）（a: text input, cla: yes, customer: amplify, customer: fuchsia, framework, severe: API break）

[34202](https://github.com/flutter/flutter/pull/34202) 從 `_TableElement` 移除 `_debugWillReattachChildren` 斷言（cla: yes, customer: payouts, framework）

[34252](https://github.com/flutter/flutter/pull/34252) 整合 dwds 進 flutter tool 以支援 Web（cla: yes, tool, ☸ platform-web）

[34298](https://github.com/flutter/flutter/pull/34298) 保持 SafeArea：第 2 部分（cla: yes, customer: solaris, framework, severe: customer critical, waiting for tree to go green）

[34301](https://github.com/flutter/flutter/pull/34301) 允許覆寫 FLUTTER_TEST 環境變數（a: tests, cla: yes, customer: mulligan (g3), team, tool）

[34515](https://github.com/flutter/flutter/pull/34515) OutlineInputBorder 調整過大 borderRadius（a: text input, cla: yes, f: material design, framework）

[34516](https://github.com/flutter/flutter/pull/34516) [flutter_tool] 補全 Fuchsia 版本字串（cla: yes, tool）

[34573](https://github.com/flutter/flutter/pull/34573) 確保 flutter jar 加入所有 plugin 專案的 build type（cla: yes, t: gradle, tool, waiting for tree to go green）

[34597](https://github.com/flutter/flutter/pull/34597) [Material] 更新 slider gallery demo，包含 range slider（cla: yes, f: material design, framework）

[34599](https://github.com/flutter/flutter/pull/34599) [Material] ToggleButtons（cla: yes, f: material design, framework, severe: new feature）

[34624](https://github.com/flutter/flutter/pull/34624) 拆解 flutter doctor 驗證與結果（cla: yes, t: flutter doctor, tool）

[34626](https://github.com/flutter/flutter/pull/34626) AsyncSnapshot.data 若有錯誤或無資料則拋出例外（cla: yes, framework）

[34660](https://github.com/flutter/flutter/pull/34660) 為 Windows 與 Linux 新增 --target 支援（cla: yes, tool）

[34665](https://github.com/flutter/flutter/pull/34665) 修正選取控制柄位置偏移（a: text input, cla: yes, framework, severe: API break）

[34669](https://github.com/flutter/flutter/pull/34669) 封裝 iOS 相依套件（cla: yes, tool）

[34676](https://github.com/flutter/flutter/pull/34676) 預設啟用密碼欄位選取功能，並公開 API 以...（a: text input, cla: yes, f: cupertino, f: material design, framework）

[34712](https://github.com/flutter/flutter/pull/34712) 修正 FocusTraversalPolicy 造成焦點遺失（a: desktop, cla: yes, framework）

[34723](https://github.com/flutter/flutter/pull/34723) CupertinoTextField 垂直對齊（cla: yes, f: cupertino, framework）

[34752](https://github.com/flutter/flutter/pull/34752) [linux] 從 GLFW 接收未修改字元（a: desktop, cla: yes, framework）

[34785](https://github.com/flutter/flutter/pull/34785) 微調模擬器顯示名稱（cla: yes, tool）

[34794](https://github.com/flutter/flutter/pull/34794) 為 daemon 裝置新增 `emulatorID` 欄位（cla: yes, tool）

[34823](https://github.com/flutter/flutter/pull/34823) 引入圖片載入效能測試（a: tests, cla: yes, framework）

[34869](https://github.com/flutter/flutter/pull/34869) [Material] 正確呼叫 Range Slider 的 onChangeStart 與 onChangeEnd（cla: yes, f: material design, framework）

[34870](https://github.com/flutter/flutter/pull/34870) 為 Flutter Issue #27677 新增測試案例作為效能基準（cla: yes, engine, framework, severe: performance）

[34872](https://github.com/flutter/flutter/pull/34872) [Material] `OutlineButton` 支援 hovered、focused、pressed 邊框顏色（cla: yes, f: material design, framework）

[34877](https://github.com/flutter/flutter/pull/34877) 增加更多 shards（a: tests, cla: yes, team, waiting for tree to go green）

[34885](https://github.com/flutter/flutter/pull/34885) 重新上線：重新命名 web 裝置（cla: yes, tool）

[34895](https://github.com/flutter/flutter/pull/34895) 移除 flutter_tools 對舊 AOT 快照的支援（cla: yes）

[34896](https://github.com/flutter/flutter/pull/34896) 允許多根目錄 Web 建置（cla: yes, tool）

[34906](https://github.com/flutter/flutter/pull/34906) 修正 [showLicensePage] 的 [applicationIcon] 屬性未使用

[34907](https://github.com/flutter/flutter/pull/34907) 修正 LicensePage 在載入前關閉頁面會導致錯誤（cla: yes, f: material design, framework, severe: crash）

[34919](https://github.com/flutter/flutter/pull/34919) 移除重複的錯誤部分（cla: yes, framework, waiting for tree to go green）

[34932](https://github.com/flutter/flutter/pull/34932) TextFormField 新增 onChanged 屬性（cla: yes, f: material design, framework）

[34964](https://github.com/flutter/flutter/pull/34964) CupertinoTextField.onTap（cla: yes, f: cupertino）

[35017](https://github.com/flutter/flutter/pull/35017) 同步 lint 清單（cla: yes）

[35046](https://github.com/flutter/flutter/pull/35046) 為 API 文件新增自動產生的 Icon 圖解（cla: yes, d: api docs, d: examples, framework）

[35055](https://github.com/flutter/flutter/pull/35055) 啟用 lint avoid_bool_literals_in_conditional_expressions（cla: yes）

[35056](https://github.com/flutter/flutter/pull/35056) 啟用 lint use_full_hex_values_for_flutter_colors（cla: yes）

[35059](https://github.com/flutter/flutter/pull/35059) 為 prefer_final_fields lint 更新做準備（cla: yes）

[35063](https://github.com/flutter/flutter/pull/35063) 新增 conic path 不支援的文件說明（a: platform-views, cla: yes, d: api docs, framework, plugin）

[35066](https://github.com/flutter/flutter/pull/35066) 手動引擎升級，更新 goldens，改善波浪狀文字裝飾 0f9e297ad..185087a65f（a: typography, cla: yes, engine）

[35074](https://github.com/flutter/flutter/pull/35074) 嘗試啟用工具覆蓋率 redux（a: tests, cla: yes, tool）

[35075](https://github.com/flutter/flutter/pull/35075) 允許自訂 SnackBar 內容 TextStyle 於主題中（cla: yes, f: material design, framework）

[35084](https://github.com/flutter/flutter/pull/35084) 將 findTargetDevices 移至 DeviceManager（cla: yes, tool）

[35092](https://github.com/flutter/flutter/pull/35092) 新增 FlutterProjectFactory 以便內部覆寫（cla: yes, tool）

[35110](https://github.com/flutter/flutter/pull/35110) 永遠測試語意（a: accessibility, a: tests, cla: yes, framework, severe: API break）

[35129](https://github.com/flutter/flutter/pull/35129) [Material] 將 Flutter Gallery 的 Expansion Panel Slider 包裝於帶內距的 Container，以預留 Value Indicator 空間（cla: yes, f: material design, framework, severe: regression）

[35130](https://github.com/flutter/flutter/pull/35130) 為 release_smoke_tests 傳遞新用戶（a: tests, cla: yes, team）

[35132](https://github.com/flutter/flutter/pull/35132) 透過重複使用矩陣以減少 _transformRect 的配置（cla: yes）

[35136](https://github.com/flutter/flutter/pull/35136) 更新 Dark Theme 的 disabledColor 為 White38（cla: yes, f: material design, framework, severe: API break）

[35143](https://github.com/flutter/flutter/pull/35143) 更多 HttpClientResponse Uint8List 修正（cla: yes）

[35149](https://github.com/flutter/flutter/pull/35149) 更多 `HttpClientResponse implements Stream<Uint8List>` 修正（cla: yes）

[35150](https://github.com/flutter/flutter/pull/35150) 將 didUpdateConfig 改為 didUpdateWidget（cla: yes, d: api docs, framework）

[35157](https://github.com/flutter/flutter/pull/35157) 移除工具覆蓋率的 skip 條件（cla: yes, team）

[35160](https://github.com/flutter/flutter/pull/35160) 將 flutter create 測試移至記憶體檔案系統（a: tests, cla: yes, tool）

[35164](https://github.com/flutter/flutter/pull/35164) 更新 reassemble 文件（cla: yes, customer: product, d: api docs, framework, severe: customer critical）

[35186](https://github.com/flutter/flutter/pull/35186) 讓工具覆蓋率收集能對 sentinel 覆蓋資料有韌性（cla: yes, tool）

[35188](https://github.com/flutter/flutter/pull/35188) 確保在收集覆蓋率前暫停測試 isolate（cla: yes, tool）

[35189](https://github.com/flutter/flutter/pull/35189) 啟用 lints prefer_spread_collections 與 prefer_inlined_adds（cla: yes）

[35192](https://github.com/flutter/flutter/pull/35192) 不要讓任何 presubmit 阻擋於覆蓋率（cla: yes, tool）

[35197](https://github.com/flutter/flutter/pull/35197) [flutter_tool] 更新 Fuchsia SDK（cla: yes, tool）

[35206](https://github.com/flutter/flutter/pull/35206) 強制升級套件相依（cla: yes）

[35207](https://github.com/flutter/flutter/pull/35207) 將 selection handlers 拆分（a: text input, cla: yes, customer: amplify, customer: fuchsia, framework）

[35211](https://github.com/flutter/flutter/pull/35211) Ink 與 Ink.image 的 `child` 參數文件更新（cla: yes, d: api docs, f: material design, framework）

[35217](https://github.com/flutter/flutter/pull/35217) 新增 flutter build aar（a: build, cla: yes, tool, waiting for tree to go green）

[35219](https://github.com/flutter/flutter/pull/35219) 文字選取選單顯示/隱藏情境（a: text input, cla: yes, f: material design, framework）

[35221](https://github.com/flutter/flutter/pull/35221) 調整 bit 以排除 dev 與 beta 於桌面與 Web（cla: yes, tool）

[35223](https://github.com/flutter/flutter/pull/35223) Navigator pushAndRemoveUntil 修正（cla: yes, customer: mulligan (g3), f: routes, framework, severe: crash, waiting for tree to go green）

[35225](https://github.com/flutter/flutter/pull/35225) 新增 AnimatedContainer 範例程式碼（a: animation, cla: yes, d: api docs, d: examples, framework）

[35231](https://github.com/flutter/flutter/pull/35231) 修正覆蓋率收集（cla: yes, tool）

[35232](https://github.com/flutter/flutter/pull/35232) 新效能基準：Gesture semantics（cla: yes, waiting for tree to go green）

[35233](https://github.com/flutter/flutter/pull/35233) 若工具未變更則嘗試跳過覆蓋率 shard（cla: yes）

[35237](https://github.com/flutter/flutter/pull/35237) 還原「手動引擎升級，更新 goldens，改善波浪狀文字裝飾 0f9e297ad..185087a65f」（cla: yes）

[35242](https://github.com/flutter/flutter/pull/35242) 重新上線「手動引擎升級，更新 goldens，改善波浪狀文字裝飾 0f9e297ad..185087a65f」（cla: yes）

[35245](https://github.com/flutter/flutter/pull/35245) 為 HttpClientResponse 實作 Uint8List 做更多準備（cla: yes）

[35246](https://github.com/flutter/flutter/pull/35246) 嘗試讓 post commit 不跳過覆蓋率（cla: yes）

[35263](https://github.com/flutter/flutter/pull/35263) 移除不必要的 ..toList()（cla: yes）

[35276](https://github.com/flutter/flutter/pull/35276) 還原「[Material] `OutlineButton` 支援 hovered、focused、pressed 邊框顏色」（cla: yes）

[35278](https://github.com/flutter/flutter/pull/35278) 重新上線「[Material] `OutlineButton` 支援 hovered、focused、pressed 邊框顏色」（cla: yes）

[35280](https://github.com/flutter/flutter/pull/35280) benchmarkWidgets.semanticsEnabled 預設為 false（cla: yes）

[35282](https://github.com/flutter/flutter/pull/35282) Ink build 方法新增 Container 備援（cla: yes, f: material design, framework）

[35288](https://github.com/flutter/flutter/pull/35288) 正確套用覆蓋率跳過計算（cla: yes）

[35290](https://github.com/flutter/flutter/pull/35290) about page 測試（cla: yes）

[35297](https://github.com/flutter/flutter/pull/35297) 修正 tracing 與 driver 的首幀邏輯（cla: yes, engine, framework, severe: performance, team）

[35303](https://github.com/flutter/flutter/pull/35303) 修正預設 artifacts，排除 iOS 與 Android（cla: yes, tool）

[35307](https://github.com/flutter/flutter/pull/35307) 清理 host_app_ephemeral Profile build 設定（a: existing-apps, cla: yes, t: xcode, tool, ⌺‬ platform-ios）

[35335](https://github.com/flutter/flutter/pull/35335) 使用自訂例外類別處理網路載入錯誤（a: images, cla: yes, framework）

[35367](https://github.com/flutter/flutter/pull/35367) 產生的測試程式碼中為 StreamChannel 加上型別（cla: yes, tool）

[35392](https://github.com/flutter/flutter/pull/35392) 新增計時器檢查與 Fake http client 至 testbed（cla: yes, tool）

[35393](https://github.com/flutter/flutter/pull/35393) 更多 ui-as-code（cla: yes, team）

[35406](https://github.com/flutter/flutter/pull/35406) 從 resident runner 重構 signal 與命令列處理（cla: yes, team, tool）

[35407](https://github.com/flutter/flutter/pull/35407) 手動引擎升級（cla: yes, engine, team）

[35408](https://github.com/flutter/flutter/pull/35408) 移除 print（cla: yes）

[35423](https://github.com/flutter/flutter/pull/35423) v1.7.8 hotfixes（cla: yes）

[35424](https://github.com/flutter/flutter/pull/35424) 新增 image_list 效能基準，於 jit(debug) build 執行（a: images, a: tests, cla: yes, framework）

[35464](https://github.com/flutter/flutter/pull/35464) 手動升級 engine 45b66b7...ffba2f6（cla: yes, team）

[35465](https://github.com/flutter/flutter/pull/35465) 將 update-packages 標記為非實驗性（cla: yes, tool）

[35467](https://github.com/flutter/flutter/pull/35467) 將 update-packages 標記為非實驗性（cla: yes, tool）

[35468]⟦L108

