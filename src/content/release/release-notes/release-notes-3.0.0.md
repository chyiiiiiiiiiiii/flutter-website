---
title: Flutter 3.0.0 發行說明
shortTitle: 3.0.0 發行說明
description: Flutter 3.0.0 的發行說明。
---

本頁提供 3.0.0 版本的發行說明。
如需後續錯誤修正版本的相關資訊，
請參閱我們的 [CHANGELOG][CHANGELOG]。

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## 如果你看到關於 bindings 的警告

當你遷移至 Flutter 3 時，
你可能會看到如下的警告訊息：

```plaintext
Warning: Operand of null-aware operation '!' has type 'SchedulerBinding' which excludes null.
```

這些問題是由於 API 的簡化（bindings 上的 `instance` 屬性現在為 non-nullable），再加上編譯器會積極回報任何在不需要時使用的多餘 null-aware 運算子（例如 `!` 和 `?.`）所導致。

如果發生這種情況，可能有幾種不同的原因與對應的解決方法：

### 相依套件

如果你的相依套件（dependencies）有使用 bindings，它們可能需要更新才能消除這些警告。除了會出現冗長的警告訊息外，你的建置（builds）應該不會受到影響。你目前可以選擇忽略這些警告（也可以考慮聯絡相依套件的開發者，建議他們進行更新）。

### 你的程式碼

如果問題出現在你自己的程式碼中，你可以透過執行 `dart fix --apply` 來進行更新。這應該可以解決所有警告。

如果你的程式碼需要同時支援 Flutter 3 以及更早的版本（例如你的程式碼是一個函式庫），那麼你可以將對 `binding.instance` 的呼叫包裝在如下的方法中：

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

當你不再需要支援 Flutter 3.0.0 之前的版本時，可以將這段移除，並以以下內容取代：

```dart
SchedulerBinding.instance.addPostFrameCallback(...);
```

### 框架相關問題

如果錯誤訊息並未指向你的某個相依套件，
且`dart fix --apply`無法修復問題，
或如果警告為致命錯誤
（例如你的應用程式拒絕執行），請
[提交錯誤回報]({{site.repo.flutter}}/issues/new/choose)。

## 變更內容

本次版本包含以下變更：

### 框架（Framework）

* 回復 "[Fonts] Update icons"（由 @guidezpl 貢獻，見https://github.com/flutter/flutter/pull/95966）
* 改善 iOS 上`barrierColor`及全螢幕 Cupertino 頁面轉場邊緣裝飾的擬真度（由 @willlockwood 貢獻，見https://github.com/flutter/flutter/pull/95537）
* [Fonts] 更新 icons（由 @guidezpl 貢獻，見https://github.com/flutter/flutter/pull/96115）
* 允許`Checkbox`於`DataTable`中繼承`CheckboxTheme`的顏色（由 @willlockwood 貢獻，見https://github.com/flutter/flutter/pull/96007）
* 修正自動填充資格檢查（由 @LongCatIsLooong 貢獻，見https://github.com/flutter/flutter/pull/95210）
* [DropdownButtonFormField] 新增 borderRadius 屬性（由 @dheerajv09 貢獻，見https://github.com/flutter/flutter/pull/95944）
* 修正`DataTable` `_SortArrow`在狀態更新時方向改變的問題（由 @markusaksli-nc 貢獻，見https://github.com/flutter/flutter/pull/94455）
* 修正拼字錯誤（由 @goderbauer 貢獻，見https://github.com/flutter/flutter/pull/96195）
* RawKeyboard 重複事件與 SingleActivator.includeRepeats（由 @dkwingsmt 貢獻，見https://github.com/flutter/flutter/pull/96154）
* InteractiveViewer scaleFactor（由 @justinmc 貢獻，見https://github.com/flutter/flutter/pull/95224）
* 重新上線 "確保 engineLayer 在 OpacityLayer 被停用時正確釋放"（由 @dnfield 貢獻，見https://github.com/flutter/flutter/pull/96295）
* 當`obscureText`設於`TextField`時，禁止複製與剪下（由 @gspencergoog 貢獻，見https://github.com/flutter/flutter/pull/96233）
* 回復 "當`obscureText`設於`TextField`時，禁止複製與剪下 (#96233)"（由 @gspencergoog 貢獻，見https://github.com/flutter/flutter/pull/96308）
* 修正`paints..something`與`paints..everything`在應該失敗時卻成功的問題（由 @willlockwood 貢獻，見https://github.com/flutter/flutter/pull/95993）
* 修正當`TabBar.tabs`長度變更時的`RangeError`錯誤（由 @werainkhatri 貢獻，見https://github.com/flutter/flutter/pull/94623）
* 使`FocusNode.traversalChildren`不受父層`canRequestFocus`影響（由 @gspencergoog 貢獻，見https://github.com/flutter/flutter/pull/95061）
* 修正 scrollbar 錯誤（由 @xu-baolin 貢獻，見https://github.com/flutter/flutter/pull/95894）
* 在 LeaderLayer.applyTransform 經過保留渲染後不再當機（由 @goderbauer 貢獻，見https://github.com/flutter/flutter/pull/96144）
* LayerLink 暫時允許多個 leader（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/95977）
* TextEditingValue 預設選取文件（由 @justinmc 貢獻，見https://github.com/flutter/flutter/pull/96245）
* 新增將子樹標記為不可遍歷的能力（由 @werainkhatri 貢獻，見https://github.com/flutter/flutter/pull/94626）
* 若 onTapDown 不為 null，則 InkResponse 啟用（由 @markusaksli-nc 貢獻，見https://github.com/flutter/flutter/pull/96224）
* InkWell.overlayColor 現在會根據 MaterialState.pressed 解譯（由 @HansMuller 貢獻，見https://github.com/flutter/flutter/pull/96435）
* 支援 Scribble 手寫（由 @fbcouch 貢獻，見https://github.com/flutter/flutter/pull/75472）
* [RenderListWheelViewport] 更新內容尺寸以防止 scroll offset 變動（由 @xu-baolin 貢獻，見https://github.com/flutter/flutter/pull/96102）
* 修正 Dialog 對齊文件（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/96388）
* 啟用 no_leading_underscores_for_library_prefixes（由 @goderbauer 貢獻，見https://github.com/flutter/flutter/pull/96420）
* 在 RawKeyEventDataWeb 中公開 keyCode 欄位（由 @b-luk 貢獻，見https://github.com/flutter/flutter/pull/96483）
* 為 LeaderLayer 啟用更多保留渲染機會（由 @goderbauer 貢献，見https://github.com/flutter/flutter/pull/96486）
* 將 FloatingActionButton 遷移至 Material 3（由 @darrenaustin 貢獻，見https://github.com/flutter/flutter/pull/94486）
* 使`DraggableScrollableController`成為`ChangeNotifier`（由 @caseycrogers 貢獻，見https://github.com/flutter/flutter/pull/96089）
* 啟用 unnecessary_late（由 @goderbauer 貢獻，見https://github.com/flutter/flutter/pull/96417）
* 修正 NestedScrollView 的 scroll 通知（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/96482）
* MaterialStateProperty 文件（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/96532）
* 新增 onPointerHover 的 debug 屬性（由 @WasserEsser 貢獻，見https://github.com/flutter/flutter/pull/96555）
* 日期選擇器年份選擇器應以「按鈕」對無障礙框架宣告（由 @darrenaustin 貢獻，見https://github.com/flutter/flutter/pull/96546）
* 回復 "支援 Scribble 手寫"（由 @LongCatIsLooong 貢獻，見https://github.com/flutter/flutter/pull/96615）
* 為 TapGestureRecognizer 新增支援裝置清單（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/96560）
* 修正 UNUSED_ELEMENT_PARAMETER 用於欄位初始化器（由 @scheglov 貢獻，見https://github.com/flutter/flutter/pull/96553）
* Mac cmd + shift + 左/右（由 @justinmc 貢獻，見https://github.com/flutter/flutter/pull/95948）
* 模組化 ReorderableListView 自動捲動邏輯（由 @chunhtai 貢献，見https://github.com/flutter/flutter/pull/96563）
* Slider: 新增可主題化的滑鼠游標 v2（由 @HansMuller 貢獻，見https://github.com/flutter/flutter/pull/96623）
* 登陸設置 "basic" 滑鼠游標於停用按鈕，PR #89346（由 @HansMuller 貢獻，見https://github.com/flutter/flutter/pull/96561）
* 修正 [_ViewportElement] RenderObjectChild 更新錯誤（由 @xu-baolin 貢獻，見https://github.com/flutter/flutter/pull/96377）
* 提供 Appbar 的`foregroundColor`給套件授權頁標題使用（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/95685）
* 新增 CustomMultiChildLayout 範例（由 @gspencergoog 貢獻，見https://github.com/flutter/flutter/pull/96632）
* PopupMenu: 新增可主題化的滑鼠游標 v2（由 @HansMuller 貢獻，見https://github.com/flutter/flutter/pull/96567）
* 新增 TabBar.splashFactory、TabBarTheme.splashFactory、overlayColor（由 @HansMuller 貢獻，見https://github.com/flutter/flutter/pull/96252）
* [framework] 在 _debugVerifyIllFatedPopulation 不要 null assert（由 @jonahwilliams 貢獻，見https://github.com/flutter/flutter/pull/96551）
* 當文字欄位為遮蔽狀態時禁止複製與剪下（由 @gspencergoog 貢獻，見https://github.com/flutter/flutter/pull/96309）
* feat: 增加更多 YouTube 參考於元件 docstring（由 @albertodev01 貢獻，見https://github.com/flutter/flutter/pull/96484）
* 更新 adaptive slider 文件（由 @maheshmnj 貢獻，見https://github.com/flutter/flutter/pull/96599）
* 修正 UNUSED_ELEMENT_PARAMETER 用於未使用的欄位初始化參數（由 @scheglov 貢獻，見https://github.com/flutter/flutter/pull/96684）
* feat: PopupMenuButton 新增自訂 padding（由 @arafaysaleem 貢獻，見https://github.com/flutter/flutter/pull/96657）
* [framework] 移除 Element 的 hashcode 覆寫（由 @jonahwilliams 貢獻，見https://github.com/flutter/flutter/pull/96644）
* 初始化 element tree 時不再過早分配 inherited widget 快取（由 @jonahwilliams 貢獻，見https://github.com/flutter/flutter/pull/95596）
* 回復 "feat: PopupMenuButton 新增自訂 padding (#96657)"（由 @gspencergoog 貢献，見https://github.com/flutter/flutter/pull/96781）
* 修正 animate to curve 參數（由 @caseycrogers 貢獻，見https://github.com/flutter/flutter/pull/96627）
* 清理滑鼠區域程式碼（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/96636）
* 防止 DropdownButton 將 borderRadius 屬性套用於清單的第一與最後一個元素（由 @chinmoy12c 貢獻，見https://github.com/flutter/flutter/pull/96695）
* 為 TabPageSelector 新增 BorderStyle 屬性（由 @chinmoy12c 貢獻，見https://github.com/flutter/flutter/pull/92436）
* 移除重複的 hashCode 值並補上遺漏的逗號（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/96844）
* 日期選擇器的下/上個月按鈕語意移除日期（由 @darrenaustin 貢獻，見https://github.com/flutter/flutter/pull/96876）
* chore: docstring 新增 YouTube 參考（由 @albertodev01 貢獻，見https://github.com/flutter/flutter/pull/96880）
* chore(flutter_test): 更新 'matchesGoldenFile' 文件（由 @albertodev01 貢献，見https://github.com/flutter/flutter/pull/96194）
* 使用 strict-raw-types 分析取代 no-implicit-dynamic（由 @srawlins 貢獻，見https://github.com/flutter/flutter/pull/96296）
* [Keyboard] 派發單一合成`KeyEvent`（由 @dkwingsmt 貢獻，見https://github.com/flutter/flutter/pull/96874）
* [web] 驗證 WebDriver 回應（由 @yjbanov 貢獻，見https://github.com/flutter/flutter/pull/96884）
* 若 image stream listener 非同步加入則非同步呼叫（由 @WasserEsser 貢獻，見https://github.com/flutter/flutter/pull/95525）
* chore: didUpdateWidget 呼叫提前（由 @albertodev01 貢獻，見https://github.com/flutter/flutter/pull/96944）
* 說明 MaterialApp 在無 Material Widget 時如何渲染文字樣式（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/96530）
* 啟用 no_leading_underscores_for_local_identifiers（由 @goderbauer 貢獻，見https://github.com/flutter/flutter/pull/96422）
* 新增控制`AnimatedCrossFade`中底部子元件焦點是否可排除的能力（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/96593）
* ScaffoldState 新增 closeDrawer 與 closeEndDrawer（由 @pedromassango 貢獻，見https://github.com/flutter/flutter/pull/96960）
* PageView 捲動物理行為與 Android 一致（由 @nt4f04uNd 貢獻，見https://github.com/flutter/flutter/pull/95423）
* ListTile: 新增可主題化滑鼠游標（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/96740）
* 新增`CheckboxListTile.checkboxShape`（由 @werainkhatri 貢獻，見https://github.com/flutter/flutter/pull/95714）
* 允許 layerlink 的現有 leader 在前一個 leader 之前分離（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/96810）
* 匯出陰影至`Icon` API（由 @mateusfccp 貢獻，見https://github.com/flutter/flutter/pull/83638）
* Scrollbar isAlwaysShown 棄用，改用 thumbVisibility（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/96957）
* 文字輸入連線重啟後顯示鍵盤（由 @LongCatIsLooong 貢獻，見https://github.com/flutter/flutter/pull/96541）
* 回復 "PageView 捲動物理行為與 Android 一致"（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/97150）
* [framework] 移除多餘型別轉換（由 @jonahwilliams 貢獻，見https://github.com/flutter/flutter/pull/97155）
* CupertinoPickerDefaultSelectionOverlay 新增 direction（由 @Dan-Crane 貢獻，見https://github.com/flutter/flutter/pull/92959）
* 放寬 routerReportsNewRouteInformation 函式簽章（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/97154）
* 新增`CommonFinders.bySubtype<T extends Widget>()` finder（由 @lrhn 貢獻，見https://github.com/flutter/flutter/pull/91415）
* ScrollsToTop 使用更合適的 curve（由 @SuhwanCha 貢獻，見https://github.com/flutter/flutter/pull/96574）
* Scrollbar hoverThickness 與 showTrackOnHover 棄用（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/97173）
* PopupMenuButton 新增 splashRadius（由 @Moluram 貢獻，見https://github.com/flutter/flutter/pull/91148）
* [framework] 使 HitTestEntry 泛型化（由 @jonahwilliams 貢獻，見https://github.com/flutter/flutter/pull/97175）
* _AnimatedIconPainter 先鏡像再縮放（由 @Amir-P 貢獻，見https://github.com/flutter/flutter/pull/93312）
* Flutter web 支援 NetworkImage headers（由 @jonas-martinez 貢獻，見https://github.com/flutter/flutter/pull/85954）
* 重新上線 "支援 Scribble 手寫" (#96615)（由 @fbcouch 貢獻，見https://github.com/flutter/flutter/pull/96881）
* 回復 Scribble 重新上線（由 @justinmc 貢獻，見https://github.com/flutter/flutter/pull/97405）
* 更新 RawScrollbar 以支援 track（由 @Piinks 貢獻，見https://github.com/flutter/flutter/pull/97335）
* Chips 棄用`useDeleteButtonTooltip`（由 @RoyARG02 貢獻，見https://github.com/flutter/flutter/pull/96174）
* `RefreshIndicator`: 新增互動範例（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/97254）
* 新增`CupertinoTimerPicker`互動範例（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/93621）
* 修正`DropdownButtonFormField`可點擊區域並將`InkWell`新增至`DropdownButton`（由 @TahaTesser 貢獻，見https://github.com/flutter/flutter/pull/95906）
* 修正 navigator 能處理具有重複 page key 的路由（由 @chunhtai 貢獻，見https://github.com/flutter/flutter/pull/97394）
* 更新`PopupMenuButton`範例（由 @TahaTesser 貢献，見https://github.com/flutter/flutter/pull/96681）
* [Icons] 避免替換後出現雙底線（由 @guidezpl 貢獻，見https://github.com/flutter/flutter/pull/96904）
* 改善測試 dart fix 文件（由 @werainkhatri 貢獻，見https://github.com/flutter/flutter/pull/97493）
* PointerDeviceKind 與 ui.PointerChange 前向相容性（由 @moffatman 貢獻，見https://github.com/flutter/flutter/pull/97350）
* 重新上線 "支援 Scribble 手寫
