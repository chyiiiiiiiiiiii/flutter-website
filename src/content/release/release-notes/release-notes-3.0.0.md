---
title: Flutter 3.0.0 發行說明
shortTitle: 3.0.0 發行說明
description: Flutter 3.0.0 的發行說明。
---

本頁為 3.0.0 版本的發行說明。
如需後續錯誤修正版本的相關資訊，
請參閱我們的 [CHANGELOG][CHANGELOG]。

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## 如果你看到有關 bindings 的警告

當你遷移至 Flutter 3 時，
你可能會看到如下的警告訊息：

```plaintext
Warning: Operand of null-aware operation '!' has type 'SchedulerBinding' which excludes null.
```

這些問題是由於 API 的簡化（bindings 上的 `instance` 屬性現在為 non-nullable），再加上編譯器會積極回報任何多餘的 null-aware 運算子（例如 `!` 和 `?.`）在不需要時被使用所導致。

如果發生這種情況，可能有幾個不同的原因與對應的解決方法：

### 相依套件

如果你的相依套件（dependencies）有使用 bindings，它們可能需要更新以消除這些警告。除了冗長的警告訊息外，你的建置（builds）應該不會受到影響。你目前可以先忽略這些警告（也可以聯絡相依套件的開發者，建議他們進行更新）。

### 你的程式碼

如果問題是出現在你自己的程式碼中，你可以執行 `dart fix --apply` 來進行更新。這應該可以解決所有警告。

如果你的程式碼需要同時支援 Flutter 3 和更早的版本（例如你的程式碼是一個函式庫），那麼你可以將對 `binding.instance` 的呼叫包裝在如下的方法中：

```dart
/// This allows a value of type T or T?
/// to be treated as a value of type T?.
///
/// We use this so that APIs that have become
/// non-nullable can still be used with `!` and `?`
/// to support older versions of the API as well.
T? _ambiguate<T>(T? value) => value;
```

例如，請勿使用以下寫法：

```dart
SchedulerBinding.instance!.addPostFrameCallback(...);
```

你可以使用：

```dart
_ambiguate(SchedulerBinding.instance)!.addPostFrameCallback(...);
```

當你不再需要支援 Flutter 3.0.0 之前的版本時，你可以將這段移除，並以以下內容取代：

```dart
SchedulerBinding.instance.addPostFrameCallback(...);
```

### Framework 問題

如果錯誤訊息沒有指向你的某個相依套件，
且`dart fix --apply`無法解決問題，
或者警告為致命錯誤
（例如，應用程式拒絕執行），請
[回報錯誤]({{site.repo.flutter}}/issues/new/choose)。

## 變更內容

本次版本包含以下變更：

### Framework

* 還原「[Fonts] 更新 icons」@guidezpl 於 https://github.com/flutter/flutter/pull/95537
* 改善 iOS 上 `barrierColor` 及全螢幕 Cupertino 頁面轉場的邊緣裝飾擬真度 @willlockwood 於 https://github.com/flutter/flutter/pull/96115
* [Fonts] 更新 icons @guidezpl 於 https://github.com/flutter/flutter/pull/96007
* 允許 `Checkbox`es 在 `DataTable`s 中從 `CheckboxTheme` 繼承顏色 @willlockwood 於 https://github.com/flutter/flutter/pull/95210
* 修正自動填充資格檢查 @LongCatIsLooong 於 https://github.com/flutter/flutter/pull/95944
* [DropdownButtonFormField] 新增 borderRadius 屬性 @dheerajv09 於 https://github.com/flutter/flutter/pull/94455
* 修正 `DataTable` `_SortArrow` 在狀態更新時改變方向的問題 @markusaksli-nc 於 https://github.com/flutter/flutter/pull/96195
* 修正拼字錯誤 @goderbauer 於 https://github.com/flutter/flutter/pull/96154
* RawKeyboard 重複事件，以及 SingleActivator.includeRepeats @dkwingsmt 於 https://github.com/flutter/flutter/pull/95224
* InteractiveViewer scaleFactor @justinmc 於 https://github.com/flutter/flutter/pull/96295
* 再次提交「確保 engineLayer 在 OpacityLayer 被禁用時正確釋放」@dnfield 於 https://github.com/flutter/flutter/pull/96233
* 當 `obscureText` 設定於 `TextField` 時，禁止複製與剪下 @gspencergoog 於 https://github.com/flutter/flutter/pull/96308
* 還原「當 `obscureText` 設定於 `TextField` 時，禁止複製與剪下 (#96233)」@gspencergoog 於 https://github.com/flutter/flutter/pull/95993
* 修正 `paints..something` 與 `paints..everything` 在應該失敗時卻成功的問題 @willlockwood 於 https://github.com/flutter/flutter/pull/94623
* 修正當 `TabBar.tabs` 長度變更時的 `RangeError` 錯誤 @werainkhatri 於 https://github.com/flutter/flutter/pull/95061
* 讓 `FocusNode.traversalChildren` 不受父層 `canRequestFocus` 影響 @gspencergoog 於 https://github.com/flutter/flutter/pull/95894
* 修正 scrollbar 錯誤 @xu-baolin 於 https://github.com/flutter/flutter/pull/96144
* 保留渲染後，LeaderLayer.applyTransform 不再導致崩潰 @goderbauer 於 https://github.com/flutter/flutter/pull/95977
* LayerLink 可暫時允許多個 leader @chunhtai 於 https://github.com/flutter/flutter/pull/96245
* TextEditingValue 預設選取範圍文件 @justinmc 於 https://github.com/flutter/flutter/pull/94626
* 新增標記子樹為不可遍歷的能力 @werainkhatri 於 https://github.com/flutter/flutter/pull/96224
* InkResponse 當 onTapDown 不為 null 時啟用 @markusaksli-nc 於 https://github.com/flutter/flutter/pull/96435
* InkWell.overlayColor 現在會根據 MaterialState.pressed 解析 @HansMuller 於 https://github.com/flutter/flutter/pull/75472
* 支援 Scribble 手寫輸入 @fbcouch 於 https://github.com/flutter/flutter/pull/96102
* [RenderListWheelViewport] 更新內容尺寸以防止 scroll offset 變動 @xu-baolin 於 https://github.com/flutter/flutter/pull/96388
* 修正 Dialog 對齊文件 @TahaTesser 於 https://github.com/flutter/flutter/pull/96420
* 啟用 no_leading_underscores_for_library_prefixes @goderbauer 於 https://github.com/flutter/flutter/pull/96483
* 在 RawKeyEventDataWeb 中公開 keyCode 欄位 @b-luk 於 https://github.com/flutter/flutter/pull/96486
* 為 LeaderLayer 啟用更多保留渲染機會 @goderbauer 於 https://github.com/flutter/flutter/pull/94486
* 將 FloatingActionButton 遷移至 Material 3 @darrenaustin 於 https://github.com/flutter/flutter/pull/96089
* 讓 `DraggableScrollableController` 成為 `ChangeNotifier` @caseycrogers 於 https://github.com/flutter/flutter/pull/96417
* 啟用 unnecessary_late @goderbauer 於 https://github.com/flutter/flutter/pull/96482
* 修正 NestedScrollView 的 scroll 通知 @Piinks 於 https://github.com/flutter/flutter/pull/96532
* MaterialStateProperty 文件 @Piinks 於 https://github.com/flutter/flutter/pull/96555
* 新增 onPointerHover 的 debug 屬性 @WasserEsser 於 https://github.com/flutter/flutter/pull/96546
* Date Picker 年份選擇器應以「按鈕」對無障礙框架宣告 @darrenaustin 於 https://github.com/flutter/flutter/pull/96615
* 還原「支援 Scribble 手寫輸入」@LongCatIsLooong 於 https://github.com/flutter/flutter/pull/96560
* 在 TapGestureRecognizer 新增支援裝置列表 @chunhtai 於 https://github.com/flutter/flutter/pull/96553
* 修正 UNUSED_ELEMENT_PARAMETER 於欄位初始化器 @scheglov 於 https://github.com/flutter/flutter/pull/95948
* Mac cmd + shift + 左/右鍵 @justinmc 於 https://github.com/flutter/flutter/pull/96563
* 將 ReorderableListView 自動捲動邏輯模組化 @chunhtai 於 https://github.com/flutter/flutter/pull/96623
* Slider: 新增可主題化滑鼠游標 v2 @HansMuller 於 https://github.com/flutter/flutter/pull/96561
* 設定 disabled 按鈕的「基本」滑鼠游標，PR #89346 @HansMuller 於 https://github.com/flutter/flutter/pull/96377
* 修正 [_ViewportElement] RenderObjectChild 更新錯誤 @xu-baolin 於 https://github.com/flutter/flutter/pull/95685
* 提供 Appbar 的 `foregroundColor` 給套件授權頁面標題 @TahaTesser 於 https://github.com/flutter/flutter/pull/96632
* 新增 CustomMultiChildLayout 範例 @gspencergoog 於 https://github.com/flutter/flutter/pull/96567
* PopupMenu: 新增可主題化滑鼠游標 v2 @HansMuller 於 https://github.com/flutter/flutter/pull/96252
* 新增 TabBar.splashFactory、TabBarTheme.splashFactory、overlayColor @HansMuller 於 https://github.com/flutter/flutter/pull/96551
* [framework] _debugVerifyIllFatedPopulation 不再進行 null 斷言 @jonahwilliams 於 https://github.com/flutter/flutter/pull/96309
* 當文字欄位為隱藏狀態時，禁止複製與剪下 @gspencergoog 於 https://github.com/flutter/flutter/pull/96484
* feat: 小工具文件新增更多 YouTube 參考 @albertodev01 於 https://github.com/flutter/flutter/pull/96599
* 更新 adaptive slider 文件 @maheshmnj 於 https://github.com/flutter/flutter/pull/96684
* 修正 UNUSED_ELEMENT_PARAMETER 於未使用欄位初始化參數 @scheglov 於 https://github.com/flutter/flutter/pull/96657
* feat: PopupMenuButton 新增自訂 padding @arafaysaleem 於 https://github.com/flutter/flutter/pull/96644
* [framework] 移除 Element 的 hashcode 覆寫 @jonahwilliams 於 https://github.com/flutter/flutter/pull/95596
* 初始化 element tree 時不再過早分配繼承元件快取 @jonahwilliams 於 https://github.com/flutter/flutter/pull/96781
* 還原「feat: PopupMenuButton 新增自訂 padding (#96657)」@gspencergoog 於 https://github.com/flutter/flutter/pull/96627
* 修正 animate to curve 參數 @caseycrogers 於 https://github.com/flutter/flutter/pull/96636
* 清理滑鼠區域程式碼 @chunhtai 於 https://github.com/flutter/flutter/pull/96695
* 防止 DropdownButton 將 borderRadius 屬性套用於清單首尾元素 @chinmoy12c 於 https://github.com/flutter/flutter/pull/92436
* TabPageSelector 新增 BorderStyle 屬性 @chinmoy12c 於 https://github.com/flutter/flutter/pull/96844
* 移除重複的 hashCode 值並補上缺少的逗號 @TahaTesser 於 https://github.com/flutter/flutter/pull/96876
* Date Picker 的下/上一個月按鈕語意移除日期 @darrenaustin 於 https://github.com/flutter/flutter/pull/96880
* chore: 文件註解新增 YouTube 參考 @albertodev01 於 https://github.com/flutter/flutter/pull/96194
* chore(flutter_test): 更新 'matchesGoldenFile' 文件 @albertodev01 於 https://github.com/flutter/flutter/pull/96296
* 使用 strict-raw-types 分析取代 no-implicit-dynamic @srawlins 於 https://github.com/flutter/flutter/pull/96874
* [Keyboard] 派發單一合成的 `KeyEvent` @dkwingsmt 於 https://github.com/flutter/flutter/pull/96884
* [web] 驗證 WebDriver 回應 @yjbanov 於 https://github.com/flutter/flutter/pull/95525
* 當圖片串流監聽器異步加入時，異步呼叫監聽器 @WasserEsser 於 https://github.com/flutter/flutter/pull/96944
* chore: didUpdateWidget 呼叫順序提前 @albertodev01 於 https://github.com/flutter/flutter/pull/96530
* 說明 MaterialApp 在無 Material Widget 時如何渲染文字樣式 @TahaTesser 於 https://github.com/flutter/flutter/pull/96422
* 啟用 no_leading_underscores_for_local_identifiers @goderbauer 於 https://github.com/flutter/flutter/pull/96593
* 新增控制 `AnimatedCrossFade` 是否可排除底層子元件焦點的能力 @TahaTesser 於 https://github.com/flutter/flutter/pull/96960
* ScaffoldState 新增 closeDrawer 與 closeEndDrawer @pedromassango 於 https://github.com/flutter/flutter/pull/95423
* PageView 捲動物理行為與 Android 一致 @nt4f04uNd 於 https://github.com/flutter/flutter/pull/96740
* ListTile: 新增可主題化滑鼠游標 @TahaTesser 於 https://github.com/flutter/flutter/pull/95714
* 新增 `CheckboxListTile.checkboxShape` @werainkhatri 於 https://github.com/flutter/flutter/pull/96810
* 允許 layerlink 的現有 leader 在前一個 leader 分離前可先分離 @chunhtai 於 https://github.com/flutter/flutter/pull/83638
* 將陰影導出至 `Icon` API @mateusfccp 於 https://github.com/flutter/flutter/pull/96957
* Scrollbar isAlwaysShown 棄用，改為 thumbVisibility @Piinks 於 https://github.com/flutter/flutter/pull/96541
* 文字輸入連線重啟後顯示鍵盤 @LongCatIsLooong 於 https://github.com/flutter/flutter/pull/97150
* 還原「PageView 捲動物理行為與 Android 一致」@Piinks 於 https://github.com/flutter/flutter/pull/97155
* [framework] 移除多餘的型別轉換 @jonahwilliams 於 https://github.com/flutter/flutter/pull/92959
* CupertinoPickerDefaultSelectionOverlay 新增 direction @Dan-Crane 於 https://github.com/flutter/flutter/pull/97154
* 放寬 routerReportsNewRouteInformation 函式簽名限制 @chunhtai 於 https://github.com/flutter/flutter/pull/91415
* 新增 `CommonFinders.bySubtype<T extends Widget>()` finder @lrhn 於 https://github.com/flutter/flutter/pull/96574
* ScrollsToTop 使用更合適的曲線 @SuhwanCha 於 https://github.com/flutter/flutter/pull/97173
* Scrollbar hoverThickness 與 showTrackOnHover 棄用 @Piinks 於 https://github.com/flutter/flutter/pull/91148
* PopupMenuButton 新增 splashRadius @Moluram 於 https://github.com/flutter/flutter/pull/97175
* [framework] 讓 HitTestEntry 支援泛型 @jonahwilliams 於 https://github.com/flutter/flutter/pull/93312
* _AnimatedIconPainter 先鏡像再縮放 @Amir-P 於 https://github.com/flutter/flutter/pull/85954
* Flutter web 新增 NetworkImage headers 支援 @jonas-martinez 於 https://github.com/flutter/flutter/pull/96881
* 再次提交「支援 Scribble 手寫輸入 (#96615)」@fbcouch 於 https://github.com/flutter/flutter/pull/97405
* 還原 Scribble reland @justinmc 於 https://github.com/flutter/flutter/pull/97335
* 更新 RawScrollbar 支援 track @Piinks 於 https://github.com/flutter/flutter/pull/96174
* Chips 棄用 `useDeleteButtonTooltip` @RoyARG02 於 https://github.com/flutter/flutter/pull/97254
* `RefreshIndicator`：新增互動範例 @TahaTesser 於 https://github.com/flutter/flutter/pull/93621
* 新增 `CupertinoTimerPicker` 互動範例 @TahaTesser 於 https://github.com/flutter/flutter/pull/95906
* 修正 `DropdownButtonFormField` 點擊區域並將 `InkWell` 加入 `DropdownButton` @TahaTesser 於 https://github.com/flutter/flutter/pull/97394
* 修正 navigator 可處理重複 page key 的 route @chunhtai 於 https://github.com/flutter/flutter/pull/96681
* 更新 `PopupMenuButton` 範例 @TahaTesser 於 https://github.com/flutter/flutter/pull/96904
* [Icons] 防止替換後出現雙底線 @guidezpl 於 https://github.com/flutter/flutter/pull/97493
* 改善 dart fix 測試文件 @werainkhatri 於 https://github.com/flutter/flutter/pull/97350
* PointerDeviceKind 與 ui.PointerChange 前向相容 @moffatman 於 https://github.com/flutter/flutter/pull/97437
* 再次提交「支援 Scribble 手寫輸入 (#96615)」@fbcouch 於 https://github.com/flutter/flutter/pull/96736
* BottomNavigationBar: 新增可主題化滑鼠游標 @TahaTesser 於 https://github.com/flutter/flutter/pull/96597
* 修正 VisualDensity 的垂直 lerp 實作 @WasserEsser 於 https://github.com/flutter/flutter/pull/97245
* chore: 更新 AutofillContextAction 文件 @albertodev01 於 https://github.com/flutter/flutter/pull/97596
* 更新 gen_defaults 以使用 Material token 資料庫的新 JSON 輸出 @darrenaustin 於 https://github.com/flutter/flutter/pull/95593
* 允許 Clip.none 作為有效的 clipBehavior @Piinks 於 https://github.com/flutter/flutter/pull/92907
* 新增 DisplayFeatureSubScreen 元件 @andreidiaconu 於 https://github.com/flutter/flutter/pull/97677
* 更新 FAB 預設值，僅對計算值使用函式覆寫 @darrenaustin 於 https://github.com/flutter/flutter/pull/97673
* 新增橫向 scrollbar 文件 @Piinks 於 https://github.com/flutter/flutter/pull/97674
* 更新 SliverChildDelegate 文件 @Piinks 於 https://github.com/flutter/flutter/pull/97204
* TabBar 新增 splashBorderRadius @nayeemtby 於 https://github.com/flutter/flutter/pull/97446
* 重新排版時使 TextPainter 的行度量快取失效 @jason-simmons 於 https://github.com/flutter/flutter/pull/97171
* 修正 RouterObserver 在 reverseTransitionDuratio... 時未呼叫 didPop @chunhtai 於 https://github.com/flutter/flutter/pull/97705
* 修正 Local `SwitchTheme` 未被 `Switch` 元件繼承 @TahaTesser 於 https://github.com/flutter/flutter/pull/89451
* 清理 bindings API @Hixie 於 https://github.com/flutter/flutter/pull/97715
* 修正 Local `CheckBoxTheme` 未被 `CheckBox` 元件繼承 @TahaTesser 於 https://github.com/flutter/flutter/pull/97713
* 修正 Local `RadioTheme` 未被 `Radio` 元件繼承 @TahaTesser 於 https://github.com/flutter/flutter/pull/97763
* 修正 `PopupMenuButton` 範例標籤 @TahaTesser 於 https://github.com/flutter/flutter/pull/88470
* 準備 flutter.material.RawMaterialButton.mouseCursor 文件模板以支援可主題化滑鼠游標 @jpnurmi 於 ⟦L125⟧
* 文字編輯
