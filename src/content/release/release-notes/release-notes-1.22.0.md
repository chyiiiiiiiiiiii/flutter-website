---
title: Flutter 1.22.0 發行說明
shortTitle: 1.22.0 發行說明
description: Flutter 1.22.0 的發行說明。
---

本頁為 1.22.0 的發行說明。
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG][CHANGELOG]

[CHANGELOG]: https://github.com/flutter/flutter/blob/master/CHANGELOG.md

## 依標籤分類的合併 PR（`flutter/flutter`）

### framework - 428 個 pull request

[56413](https://github.com/flutter/flutter/pull/56413) 當指定的 Rect 已經可見時，防止 viewport.showOnScreen 捲動 viewport。（cla: yes, f: material design, f: scrolling, framework, 嚴重：API 變更, 等待樹狀結構綠燈）

[58245](https://github.com/flutter/flutter/pull/58245) 針對較大的文字縮放因子，自動縮小 Dialog 的 padding（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[58640](https://github.com/flutter/flutter/pull/58640) 跳過審核 - Rendering Library（a: quality, a: tests, cla: yes, framework, team, 等待樹狀結構綠燈）

[58731](https://github.com/flutter/flutter/pull/58731) 自動填充儲存（a: text input, cla: yes, framework）

[59127](https://github.com/flutter/flutter/pull/59127) 【文字縮放】[Material] 更新 BottomNavigationBar，長按時顯示提示工具（tooltip）。（cla: yes, f: cupertino, f: material design, framework, team）

[59623](https://github.com/flutter/flutter/pull/59623) 降低 iOS 列表中不同項目大小的滾動阻尼（a: fidelity, cla: yes, f: scrolling, framework, platform-ios, 等待樹狀結構綠燈）

[59702](https://github.com/flutter/flutter/pull/59702) 新按鈕宇宙（New Button Universe）（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[59766](https://github.com/flutter/flutter/pull/59766) FormField 僅在內容變更時自動驗證（已修正）（a: text input, cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[60174](https://github.com/flutter/flutter/pull/60174) 為 DragTarget 新增額外的 builder，每次 Draggable 事件都會觸發（cla: yes, framework, 等待樹狀結構綠燈）

[60177](https://github.com/flutter/flutter/pull/60177) 滑鼠點擊時不要移動到單字邊緣（a: mouse, a: text input, cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[60179](https://github.com/flutter/flutter/pull/60179) 實作 iOS14 新的活動指示器（cla: yes, f: cupertino, framework）

[60299](https://github.com/flutter/flutter/pull/60299) 實作 Router 元件與 widgets app API（cla: yes, f: cupertino, f: material design, framework, 等待樹狀結構綠燈）

[60337](https://github.com/flutter/flutter/pull/60337) 新增 ThemeData.shadowColor（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[60375](https://github.com/flutter/flutter/pull/60375) Restoration Framework（a: tests, cla: yes, framework, 等待樹狀結構綠燈）

[60446](https://github.com/flutter/flutter/pull/60446) 移除私有函式未使用的可選參數。（a: tests, cla: yes, f: material design, framework, team, 等待樹狀結構綠燈）

[60479](https://github.com/flutter/flutter/pull/60479) 修正 tooltip 位置，使用正確的 overlay 計算 render box 位置。（a: layout, cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[60501](https://github.com/flutter/flutter/pull/60501) 讓 Scrollable 的自由滾動初始速度與 iOS 一致（a: fidelity, cla: yes, f: scrolling, framework, platform-ios, 等待樹狀結構綠燈）

[60558](https://github.com/flutter/flutter/pull/60558) Pointer event resampler (#41118)（cla: yes, f: scrolling, framework, platform-android, platform-fuchsia, platform-ios, 等待樹狀結構綠燈）

[60640](https://github.com/flutter/flutter/pull/60640) 為 showModalBottomSheet 公開 route settings（cla: yes, f: material design, f: routes, framework, 等待樹狀結構綠燈）

[60655](https://github.com/flutter/flutter/pull/60655) 清理 hero controller scope（cla: yes, f: cupertino, f: material design, framework, 等待樹狀結構綠燈）

[60796](https://github.com/flutter/flutter/pull/60796) WidgetTester 新增支援多個輸入陣列（a: animation, a: tests, cla: yes, f: gestures, framework）

[60931](https://github.com/flutter/flutter/pull/60931) 新增所有系統游標（framework）（a: desktop, a: mouse, cla: yes, framework, 等待樹狀結構綠燈）

[60940](https://github.com/flutter/flutter/pull/60940) 跳過審核 - 最後剩餘項目（a: quality, a: tests, cla: yes, f: cupertino, f: material design, framework, team, 等待樹狀結構綠燈）

[60990](https://github.com/flutter/flutter/pull/60990) 在 WidgetInspector overlay 中使用正確的 Transform（#59566）（cla: yes, f: inspector, framework, 等待樹狀結構綠燈）

[61048](https://github.com/flutter/flutter/pull/61048) 重新上線「調整 Material Chip 無障礙語意以符合按鈕（#60141）」功能（a: accessibility, cla: yes, customer: money (g3), f: material design, framework, 等待樹狀結構綠燈）

[61071](https://github.com/flutter/flutter/pull/61071) 【API 文件】更新 ListTile.subtitle 文件，說明 TextStyle 如何決定（cla: yes, d: api docs, f: material design, framework, 等待樹狀結構綠燈）

[61086](https://github.com/flutter/flutter/pull/61086) 在 OutlineButton 建構子中新增 materialTapTargetSize（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61104](https://github.com/flutter/flutter/pull/61104) 文件補充 LRM 與 RLM 字元的新增（cla: yes, framework, 等待樹狀結構綠燈）

[61123](https://github.com/flutter/flutter/pull/61123) 修正表單欄位範例中的錯誤（cla: yes, d: api docs, f: material design, framework, 等待樹狀結構綠燈）

[61136](https://github.com/flutter/flutter/pull/61136) 重新上線 AnimatedAlign 公開 height 與 width factor（a: animation, cla: yes, framework, 等待樹狀結構綠燈）

[61138](https://github.com/flutter/flutter/pull/61138) 修正 HttpClientRequest 即將發生的破壞性變更的修補（a: tests, cla: yes, framework）

[61171](https://github.com/flutter/flutter/pull/61171) 修正 FloatingActionButtonLocation 額外測試案例（a: quality, f: material design, framework, 等待樹狀結構綠燈）

[61180](https://github.com/flutter/flutter/pull/61180) 【Material】允許自訂 Snack bar 的 margin、padding 與寬度（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61185](https://github.com/flutter/flutter/pull/61185) 依名稱而非類別過濾 profiling 事件（a: tests, cla: yes, framework, 嚴重：效能）

[61188](https://github.com/flutter/flutter/pull/61188) foundation 遷移至 null safety（cla: yes, framework）

[61190](https://github.com/flutter/flutter/pull/61190) 滑鼠事件回報正確的 local 位置（cla: yes, framework, 等待樹狀結構綠燈）

[61199](https://github.com/flutter/flutter/pull/61199) 移除 LICENSE/NOTICES 的 workaround（cla: yes, framework, 等待樹狀結構綠燈）

[61209](https://github.com/flutter/flutter/pull/61209) 可選擇性反轉過大的圖片（a: debugging, a: error message, a: images, cla: yes, framework, tool）

[61216](https://github.com/flutter/flutter/pull/61216) 若 InkDecoration 所屬樹未被繪製則不繪製（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61258](https://github.com/flutter/flutter/pull/61258) 為 popup menu item 新增語意資訊（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61262](https://github.com/flutter/flutter/pull/61262) 將 ContainedButton 等名稱改為 ElevatedButton 等（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61266](https://github.com/flutter/flutter/pull/61266) 為 LiveWidgetController 實作 handlePointerEventRecord（a: tests, cla: yes, framework, 等待樹狀結構綠燈）

[61268](https://github.com/flutter/flutter/pull/61268) 更新 Table 文件，說明橫向滾動（cla: yes, d: api docs, documentation, f: scrolling, framework, 等待樹狀結構綠燈）

[61323](https://github.com/flutter/flutter/pull/61323) 更新 Row API 文件，說明 textDirection 的 RTL（cla: yes, d: api docs, documentation, framework, 等待樹狀結構綠燈）

[61347](https://github.com/flutter/flutter/pull/61347) 【ListTile】新增自訂 tile 顏色的屬性（cla: yes, f: material design, framework, 嚴重：新功能, 等待樹狀結構綠燈）

[61356](https://github.com/flutter/flutter/pull/61356) 更新 dataTable API 文件，明確指明排序（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61368](https://github.com/flutter/flutter/pull/61368) 文件新增 widget of the week 影片（cla: yes, f: cupertino, f: material design, framework, 等待樹狀結構綠燈）

[61370](https://github.com/flutter/flutter/pull/61370) 移除 GameButtonB 的預設快捷鍵對應（cla: yes, framework, 等待樹狀結構綠燈）

[61371](https://github.com/flutter/flutter/pull/61371) 使 ThemeData.shadowColor 成為 TextButton 等的預設 shadowColor（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61375](https://github.com/flutter/flutter/pull/61375) 修正 61346 問題：route 可於同一幀內新增與釋放（cla: yes, framework, 等待樹狀結構綠燈）

[61377](https://github.com/flutter/flutter/pull/61377) 回退「為 popup menu item 新增語意資訊（#61258）」功能（cla: yes, f: material design, framework）

[61385](https://github.com/flutter/flutter/pull/61385) 重新上線「為 popup menu item 新增語意資訊（#61258）」功能（a: accessibility, cla: yes, f: material design, framework, team, 等待樹狀結構綠燈）

[61386](https://github.com/flutter/flutter/pull/61386) 修正 NestedScrollView 內部彈道活動於 0 速度時的問題（a: quality, cla: yes, f: scrolling, framework, 等待樹狀結構綠燈）

[61388](https://github.com/flutter/flutter/pull/61388) benchmarkLive：新增裝置上基準測試 `LiveTestWidgetsFlutterBindingFramePolicy`（a: tests, cla: yes, framework, team, 等待樹狀結構綠燈）

[61392](https://github.com/flutter/flutter/pull/61392) 更新 Card 範例及 shadowColor 預設值（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61394](https://github.com/flutter/flutter/pull/61394) 更新 Scaffold 範例，使用新按鈕類別（cla: yes, f: material design, framework）

[61398](https://github.com/flutter/flutter/pull/61398) 防止 material switch 在變為 disabled 時重建 render object（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61399](https://github.com/flutter/flutter/pull/61399) 文件說明 Windows 與 Linux 系統滑鼠游標對應（a: desktop, a: mouse, cla: yes, framework）

[61400](https://github.com/flutter/flutter/pull/61400) 修正 route 的 didadd 方法中的程式註解（cla: yes, framework, 等待樹狀結構綠燈）

[61401](https://github.com/flutter/flutter/pull/61401) 讓 scrollbar thickness 與 radius 可自訂（cla: yes, f: cupertino, f: material design, framework）

[61406](https://github.com/flutter/flutter/pull/61406) 更新 golden image comparator，支援唯讀 image ByteData 檢視（a: tests, cla: yes, framework, 等待樹狀結構綠燈）

[61413](https://github.com/flutter/flutter/pull/61413) 【flutter_tools】更新 fastReassemble 方法，支援單一元件重載（cla: yes, framework, tool）

[61424](https://github.com/flutter/flutter/pull/61424) 更新文件（cla: yes, f: material design, framework）

[61425](https://github.com/flutter/flutter/pull/61425) Flex 的 textBaseline 預設為 alphabetic（cla: yes, framework, 等待樹狀結構綠燈）

[61439](https://github.com/flutter/flutter/pull/61439) 為 Range Slider 各 thumb 新增語意（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61455](https://github.com/flutter/flutter/pull/61455) 改善 RenderObject visitChildren 錯誤回報（cla: yes, framework）

[61457](https://github.com/flutter/flutter/pull/61457) Table 新增 assert，檢查有 null children 的 row（cla: yes, framework）

[61474](https://github.com/flutter/flutter/pull/61474) 修正 Border.symmetric：階段 1（cla: yes, framework, 等待樹狀結構綠燈）

[61479](https://github.com/flutter/flutter/pull/61479) 更新 MaterialState API 文件（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61485](https://github.com/flutter/flutter/pull/61485) 修正 widget span 的 intrinsic height 與 width（cla: yes, framework, 等待樹狀結構綠燈）

[61489](https://github.com/flutter/flutter/pull/61489) 日期選擇器改用新 TextButton 取代 FlatButton（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61492](https://github.com/flutter/flutter/pull/61492) 時間選擇器改用新 TextButton 取代 FlatButton（cla: yes, f: material design, framework）

[61502](https://github.com/flutter/flutter/pull/61502) 更新 IntrinsicWidth 與 IntrinsicHeight 文件（cla: yes, d: api docs, documentation, framework）

[61503](https://github.com/flutter/flutter/pull/61503) 為 `showGeneralDialog()` 新增預設值（cla: yes, framework）

[61509](https://github.com/flutter/flutter/pull/61509) 新增基於 E2E 的效能測試案例（a: tests, cla: yes, framework, team, 等待樹狀結構綠燈）

[61516](https://github.com/flutter/flutter/pull/61516) showDialog 方法允許透明 barrierColor（cla: yes, framework）

[61532](https://github.com/flutter/flutter/pull/61532) 【ListTileTheme】新增主題層級自訂 tile 顏色屬性（cla: yes, f: material design, framework, 等待樹狀結構綠燈）

[61540](https://github.com/flutter/flutter/pull/61540) 將 WidgetTester.ensureVisible 提升至 WidgetController（a: tests, cla: yes, framework）

[61556](https://github.com/flutter/flutter/pull/61556) 修正 web 構建時的型別錯誤（cla: yes, cp: 1.20, cp: 1.20 completed, framework）

[61570](https://github.com/flutter/flutter/pull/61570) scheduler 遷移至 null safety（cla: yes, framework, 等待樹狀結構綠燈）

[61572](https://github.com/flutter/flutter/pull/61572) 移除


