---
title: Flutter 1.22.0 發行說明
shortTitle: 1.22.0 發行說明
description: Flutter 1.22.0 的發行說明。
---

本頁為 1.22.0 的發行說明。
如需後續錯誤修正版本的資訊，請參閱我們的 [CHANGELOG]⟦L3067⟧
⟦L3066⟧

## 依標籤分類的合併 PR 一覽（`flutter/flutter`）

### framework - 428 個 pull request

[56413](https://github.com/flutter/flutter/pull/56413) 當指定的 Rect 已經可見時，防止 viewport.showOnScreen 捲動 viewport。（cla: yes, f: material design, f: scrolling, framework, severe: API break, waiting for tree to go green）

[58245](https://github.com/flutter/flutter/pull/58245) 當文字縮放比例較大時，自動縮小 Dialog 的 padding（cla: yes, f: material design, framework, waiting for tree to go green）

[58640](https://github.com/flutter/flutter/pull/58640) 跳過稽核 - Rendering Library（a: quality, a: tests, cla: yes, framework, team, waiting for tree to go green）

[58731](https://github.com/flutter/flutter/pull/58731) Autofill 儲存（a: text input, cla: yes, framework）

[59127](https://github.com/flutter/flutter/pull/59127) [文字縮放] 更新 BottomNavigationBar，長按時顯示工具提示。（cla: yes, f: cupertino, f: material design, framework, team）

[59623](https://github.com/flutter/flutter/pull/59623) 降低 iOS 上不同大小項目列表的滾動阻尼（a: fidelity, cla: yes, f: scrolling, framework, platform-ios, waiting for tree to go green）

[59702](https://github.com/flutter/flutter/pull/59702) 新 Button Universe（cla: yes, f: material design, framework, waiting for tree to go green）

[59766](https://github.com/flutter/flutter/pull/59766) FormField 僅在內容變更時自動驗證（已修正）（a: text input, cla: yes, f: material design, framework, waiting for tree to go green）

[60174](https://github.com/flutter/flutter/pull/60174) 為 DragTarget 新增一個 builder，每次 Draggable 事件都會觸發（cla: yes, framework, waiting for tree to go green）

[60177](https://github.com/flutter/flutter/pull/60177) 滑鼠點擊時不要移動到單字邊緣（a: mouse, a: text input, cla: yes, f: material design, framework, waiting for tree to go green）

[60179](https://github.com/flutter/flutter/pull/60179) 實作 iOS14 新的活動指示器（cla: yes, f: cupertino, framework）

[60299](https://github.com/flutter/flutter/pull/60299) 實作 Router widget 及 widgets app API（cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green）

[60337](https://github.com/flutter/flutter/pull/60337) 新增 ThemeData.shadowColor（cla: yes, f: material design, framework, waiting for tree to go green）

[60375](https://github.com/flutter/flutter/pull/60375) Restoration Framework（a: tests, cla: yes, framework, waiting for tree to go green）

[60446](https://github.com/flutter/flutter/pull/60446) 移除私有函式未使用的可選參數（a: tests, cla: yes, f: material design, framework, team, waiting for tree to go green）

[60479](https://github.com/flutter/flutter/pull/60479) 修正 tooltip 位置，使用正確的 overlay 計算 render box 位置（a: layout, cla: yes, f: material design, framework, waiting for tree to go green）

[60501](https://github.com/flutter/flutter/pull/60501) 讓 Scrollable 的自由滾動初始速度與 iOS 一致（a: fidelity, cla: yes, f: scrolling, framework, platform-ios, waiting for tree to go green）

[60558](https://github.com/flutter/flutter/pull/60558) Pointer event resampler (#41118)（cla: yes, f: scrolling, framework, platform-android, platform-fuchsia, platform-ios, waiting for tree to go green）

[60640](https://github.com/flutter/flutter/pull/60640) 對 showModalBottomSheet 公開 route settings（cla: yes, f: material design, f: routes, framework, waiting for tree to go green）

[60655](https://github.com/flutter/flutter/pull/60655) 清理 hero controller 範圍（cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green）

[60796](https://github.com/flutter/flutter/pull/60796) WidgetTester 支援多個輸入陣列（a: animation, a: tests, cla: yes, f: gestures, framework）

[60931](https://github.com/flutter/flutter/pull/60931) 新增所有系統游標（framework）（a: desktop, a: mouse, cla: yes, framework, waiting for tree to go green）

[60940](https://github.com/flutter/flutter/pull/60940) 跳過稽核 - 最後遺留（a: quality, a: tests, cla: yes, f: cupertino, f: material design, framework, team, waiting for tree to go green）

[60990](https://github.com/flutter/flutter/pull/60990) 在 WidgetInspector overlay 中使用正確的 Transform（#59566）（cla: yes, f: inspector, framework, waiting for tree to go green）

[61048](https://github.com/flutter/flutter/pull/61048) 重新上線「調整 Material Chip 無障礙語意以符合按鈕（#60141）」功能（a: accessibility, cla: yes, customer: money (g3), f: material design, framework, waiting for tree to go green）

[61071](https://github.com/flutter/flutter/pull/61071) [API 文件] 更新 ListTile.subtitle 文件，說明 TextStyle 如何決定（cla: yes, d: api docs, f: material design, framework, waiting for tree to go green）

[61086](https://github.com/flutter/flutter/pull/61086) 為 OutlineButton 建構子新增 materialTapTargetSize（cla: yes, f: material design, framework, waiting for tree to go green）

[61104](https://github.com/flutter/flutter/pull/61104) 文件補充 LRM 與 RLM 字元的新增（cla: yes, framework, waiting for tree to go green）

[61123](https://github.com/flutter/flutter/pull/61123) 修正表單欄位範例錯誤（cla: yes, d: api docs, f: material design, framework, waiting for tree to go green）

[61136](https://github.com/flutter/flutter/pull/61136) 重新上線 AnimatedAlign 公開 height 與 width factor（a: animation, cla: yes, framework, waiting for tree to go green）

[61138](https://github.com/flutter/flutter/pull/61138) 修正 HttpClientRequest 即將到來的破壞性變更的 patch（a: tests, cla: yes, framework）

[61171](https://github.com/flutter/flutter/pull/61171) 修正 FloatingActionButtonLocation 額外測試案例（a: quality, f: material design, framework, waiting for tree to go green）

[61180](https://github.com/flutter/flutter/pull/61180) [Material] 允許自訂 Snack bar 的 margin、padding 與寬度（cla: yes, f: material design, framework, waiting for tree to go green）

[61185](https://github.com/flutter/flutter/pull/61185) 依名稱而非類別過濾 profiling 事件（a: tests, cla: yes, framework, severe: performance）

[61188](https://github.com/flutter/flutter/pull/61188) foundation 遷移至 null safety（cla: yes, framework）

[61190](https://github.com/flutter/flutter/pull/61190) Mouse 事件回報正確的 local position（cla: yes, framework, waiting for tree to go green）

[61199](https://github.com/flutter/flutter/pull/61199) 移除 LICENSE/NOTICES workaround（cla: yes, framework, waiting for tree to go green）

[61209](https://github.com/flutter/flutter/pull/61209) 可選擇性反轉過大的圖片（a: debugging, a: error message, a: images, cla: yes, framework, tool）

[61216](https://github.com/flutter/flutter/pull/61216) 若 InkDecoration 所屬的樹節點未被繪製則不進行繪製（cla: yes, f: material design, framework, waiting for tree to go green）

[61258](https://github.com/flutter/flutter/pull/61258) 為 popup menu item 增加 semantics 資訊（cla: yes, f: material design, framework, waiting for tree to go green）

[61262](https://github.com/flutter/flutter/pull/61262) 將 ContainedButton 等名稱改為 ElevatedButton 等（cla: yes, f: material design, framework, waiting for tree to go green）

[61266](https://github.com/flutter/flutter/pull/61266) 為 LiveWidgetController 實作 handlePointerEventRecord（a: tests, cla: yes, framework, waiting for tree to go green）

[61268](https://github.com/flutter/flutter/pull/61268) Table 文件更新，說明水平滾動（cla: yes, d: api docs, documentation, f: scrolling, framework, waiting for tree to go green）

[61323](https://github.com/flutter/flutter/pull/61323) Row API 文件更新，說明 textDirection 的 RTL（cla: yes, d: api docs, documentation, framework, waiting for tree to go green）

[61347](https://github.com/flutter/flutter/pull/61347) [ListTile] 新增自訂 tile 顏色的屬性（cla: yes, f: material design, framework, severe: new feature, waiting for tree to go green）

[61356](https://github.com/flutter/flutter/pull/61356) 更新 dataTable API 文件，明確指出排序（cla: yes, f: material design, framework, waiting for tree to go green）

[61368](https://github.com/flutter/flutter/pull/61368) 文件加入 widget of the week 影片（cla: yes, f: cupertino, f: material design, framework, waiting for tree to go green）

[61370](https://github.com/flutter/flutter/pull/61370) 移除 GameButtonB 的預設快捷鍵對應（cla: yes, framework, waiting for tree to go green）

[61371](https://github.com/flutter/flutter/pull/61371) 使 ThemeData.shadowColor 成為 TextButton 等的預設 shadowColor（cla: yes, f: material design, framework, waiting for tree to go green）

[61375](https://github.com/flutter/flutter/pull/61375) 修正 route 可於同一 frame 新增與釋放（cla: yes, framework, waiting for tree to go green）

[61377](https://github.com/flutter/flutter/pull/61377) 還原「為 popup menu item 增加 semantics 資訊（#61258）」功能（cla: yes, f: material design, framework）

[61385](https://github.com/flutter/flutter/pull/61385) 重新上線「為 popup menu item 增加 semantics 資訊（#61258）」功能（a: accessibility, cla: yes, f: material design, framework, team, waiting for tree to go green）

[61386](https://github.com/flutter/flutter/pull/61386) 修正 NestedScrollView 當 velocity 為 0 的 inner ballistic activity（a: quality, cla: yes, f: scrolling, framework, waiting for tree to go green）

[61388](https://github.com/flutter/flutter/pull/61388) benchmarkLive：新增裝置上的基準測試 `LiveTestWidgetsFlutterBindingFramePolicy`（a: tests, cla: yes, framework, team, waiting for tree to go green）

[61392](https://github.com/flutter/flutter/pull/61392) 更新 Card 範例與 shadowColor 預設值（cla: yes, f: material design, framework, waiting for tree to go green）

[61394](https://github.com/flutter/flutter/pull/61394) 更新 Scaffold 範例，使用新按鈕類別（cla: yes, f: material design, framework）

[61398](https://github.com/flutter/flutter/pull/61398) 防止 material switch 在變為 disabled 時重建 render object（cla: yes, f: material design, framework, waiting for tree to go green）

[61399](https://github.com/flutter/flutter/pull/61399) 文件說明 Windows 與 Linux 系統滑鼠游標的對應（a: desktop, a: mouse, cla: yes, framework）

[61400](https://github.com/flutter/flutter/pull/61400) 修正 route 的 didadd 方法中的程式註解（cla: yes, framework, waiting for tree to go green）

[61401](https://github.com/flutter/flutter/pull/61401) 讓 scrollbar 的厚度與圓角可自訂（cla: yes, f: cupertino, f: material design, framework）

[61406](https://github.com/flutter/flutter/pull/61406) golden image comparator 更新，支援唯讀 image ByteData view（a: tests, cla: yes, framework, waiting for tree to go green）

[61413](https://github.com/flutter/flutter/pull/61413) [flutter_tools] 更新 fastReassemble 方法，支援單一 widget reload（cla: yes, framework, tool）

[61424](https://github.com/flutter/flutter/pull/61424) 更新文件（cla: yes, f: material design, framework）

[61425](https://github.com/flutter/flutter/pull/61425) Flex 預設 textBaseline 為 alphabetic（cla: yes, framework, waiting for tree to go green）

[61439](https://github.com/flutter/flutter/pull/61439) 為 Range Slider 每個 thumb 增加語意（cla: yes, f: material design, framework, waiting for tree to go green）

[61455](https://github.com/flutter/flutter/pull/61455) 改善 RenderObject visitChildren 錯誤回報（cla: yes, framework）

[61457](https://github.com/flutter/flutter/pull/61457) Table 新增 assert，檢查 row 是否有 null child（cla: yes, framework）

[61474](https://github.com/flutter/flutter/pull/61474) 修正 Border.symmetric：第一階段（cla: yes, framework, waiting for tree to go green）

[61479](https://github.com/flutter/flutter/pull/61479) 更新 MaterialState API 文件（cla: yes, f: material design, framework, waiting for tree to go green）

[61485](https://github.com/flutter/flutter/pull/61485) 修正 widget span 的 intrinsic height 與 width（cla: yes, framework, waiting for tree to go green）

[61489](https://github.com/flutter/flutter/pull/61489) 日期選擇器改用新的 TextButton 取代 FlatButton（cla: yes, f: material design, framework, waiting for tree to go green）

[61492](https://github.com/flutter/flutter/pull/61492) 時間選擇器改用新的 TextButton 取代 FlatButton（cla: yes, f: material design, framework）

[61502](https://github.com/flutter/flutter/pull/61502) IntrinsicWidth 與 IntrinsicHeight 文件更新（cla: yes, d: api docs, documentation, framework）

[61503](https://github.com/flutter/flutter/pull/61503) 為 `showGeneralDialog()` 新增預設值（cla: yes, framework）

[61509](https://github.com/flutter/flutter/pull/61509) 新增 E2E 為基礎的效能測試案例（a: tests, cla: yes, framework, team, waiting for tree to go green）

[61516](https://github.com/flutter/flutter/pull/61516) showDialog 方法允許透明 barrierColor（cla: yes, framework）

[61532](https://github.com/flutter/flutter/pull/61532) [ListTileTheme] 新增主題層級自訂 tile 顏色屬性（cla: yes, f: material design, framework, waiting for tree to go green）

[61540](https://github.com/flutter/flutter/pull/61540) WidgetTester.ensureVisible 升級至 WidgetController（a: tests, cla: yes, framework）

[61556](https://github.com/flutter/flutter/pull/61556) 修正 web build 的型別錯誤（cla: yes, cp: 1.20, cp: 1.20 completed, framework）

[61570](https://github.com/flutter/flutter/pull/61570) scheduler 遷移至 null safety（cla: yes, framework, waiting for tree to go green）

[61572](https://github.com/flutter/flutter/pull/61572) widget_inspector 私有方法移除未使用參數（cla: yes, framework, waiting for tree to go green）

[61576](https://github.com/flutter/flutter/pull/61576) 修正 TextButton、ElevatedButton、OutlinedButton 的 splash 顏色（cla: yes, f: material design, framework, waiting for tree to go green）

[61578](https://github.com/flutter/flutter/pull/61578) Scaffold、IconButton 更新為新按鈕參考（cla: yes, f: material design, framework）

[61579](https://github.com/flutter/flutter/pull/61579) 移除未使用的 FlutterErrorDetails 子類別（a: debugging, a: error message, a: quality, a: tests, cla: yes, framework, waiting for tree to go green）

[61581](https://github.com/flutter/flutter/pull/61581) 為 describeEnum 提供更好的錯誤訊息（a: error message, cla: yes, f: inspector, framework, waiting for tree to go green）

[61582](https://github.com/flutter/flutter/pull/61582) Remote returns for function expression inferred return type void.（cla: yes, framework, tool, waiting for tree to go green）

[61587](https://github.com/flutter/flutter/pull/61587) 在 web 上更準確地判斷目標平台（cla: yes, framework, waiting for tree to go green）

[61623](https://github.com/flutter/flutter/pull/61623) 修正垂直 stepper 標題/副標題過長導致溢位問題（cla: yes, f: material design, framework, waiting for tree to go green）

[61632](https://github.com/flutter/flutter/pull/61632) 1.20.0-7.2.pre framework cherrypicks（cla: yes, engine, framework, team）

[61636]⟦L90


