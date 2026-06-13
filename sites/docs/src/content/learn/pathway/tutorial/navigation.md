---
title: 基於堆疊的導覽
description: 學習如何在 Flutter 應用程式中從一個頁面導覽至另一個頁面。
layout: tutorial
---

學習使用 Navigator.push 在畫面之間導覽，並為不同螢幕尺寸實作自適應導覽模式 (adaptive navigation patterns)。

<SummaryCard>
title: 你將完成的目標
items:
  - title: 使用 Navigator.push 在畫面之間導覽
    icon: open_in_new
  - title: 使用 CupertinoPageRoute 實現 iOS 風格的轉場效果
    icon: swipe_right
  - title: 為不同螢幕尺寸建立不同的導覽模式
    icon: devices
</SummaryCard>

---

### 簡介

現在你已經了解 sliver 與捲動的概念，可以開始實作畫面之間的導覽了。在本課程中，你將更新小螢幕視圖，使其在點擊聯絡人群組時，導覽至該群組的聯絡人清單。

首先，還原自適應版面配置元件 (Widget) 中的變更，使其在小螢幕上預設顯示 `ContactGroupsPage`。

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (reverted-state)"?>
```dart
class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  int selectedListId = 0;

  void _onContactListSelected(int listId) {
    setState(() {
      selectedListId = listId;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLargeScreen = constraints.maxWidth > largeScreenMinWidth;

        if (isLargeScreen) {
          return _buildLargeScreenLayout();
        } else {
          return const ContactGroupsPage(); // 已還原
        }
      },
    );
  }
  // ···
}
```

### 為聯絡人群組加入導覽功能

`ContactGroupsPage` 已使用 `_ContactGroupsView` 並提供了一個回呼（callback）。該回呼需要更新為在點擊群組時進行導覽，而非將群組印出至主控台。

確認 `lib/screens/contact_groups.dart` 中的 `onListSelected` 回呼（callback）與匯入設定如下：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contact_groups.dart (contact_groups_page)"?>
```dart title="lib/screens/contact_groups.dart"
import 'contacts.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      onListSelected: (list) => Navigator.of(context).push(
        CupertinoPageRoute<void>(
          title: list.title,
          builder: (context) => ContactListsPage(listId: list.id),
        ),
      ),
    );
  }
}
```

這小段程式碼包含了本頁最重要的新知識。

`Navigator.of(context)` 會從元件樹中取得最近的 `Navigator` 元件（Widget）。`push` 方法會將新路由加入導覽器的堆疊，並顯示從 `builder` 屬性回傳的元件（Widget）。

這是基於堆疊的導覽最基本的實作方式，新畫面會被推疊在目前畫面的上方。若要返回上一個畫面，可使用 `Navigator.pop` 方法。

`CupertinoPageRoute` 可建立 iOS 風格的頁面轉場效果，具備以下功能：

- 從右側滑入的動畫效果。
- 自動支援返回按鈕。
- 正確的標題處理。
- 支援向右滑動返回的手勢。

### 為大螢幕建立側邊欄元件

對於大螢幕，你需要一個不進行導覽、而是更新主要內容區域的側邊欄。得益於上一步的重構，建立此元件更為直觀。將此元件（Widget）加入 `lib/screens/contact_groups.dart` 的底部：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contact_groups.dart (contact_groups_sidebar)"?>
```dart
/// 用於在大螢幕上選取聯絡人群組的側邊欄元件。
class ContactGroupsSidebar extends StatelessWidget {
  const ContactGroupsSidebar({
    super.key,
    required this.selectedListId,
    required this.onListSelected,
  });

  final int selectedListId;
  final void Function(int) onListSelected;

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: selectedListId,
      onListSelected: (list) => onListSelected(list.id),
    );
  }
}
```

此側邊欄元件重複使用了 `_ContactGroupsView`，並提供了不同的回呼（callback）。它不進行導覽，而是以點擊清單的 ID 呼叫 `onListSelected`。它同時將 `selectedListId` 傳遞給 `_ContactGroupsView`，以便對已選取的項目進行高亮顯示。

### 為大螢幕建立詳細視圖

對於大螢幕版面配置，你需要一個不顯示導覽控制項的詳細視圖。就像側邊欄一樣，可以透過重複使用 `_ContactListView` 來重新建立。將此元件（Widget）加入你的 `contacts.dart` 檔案底部：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/contacts.dart (contact_list_detail)"?>
```dart
class ContactListDetail extends StatelessWidget {
  const ContactListDetail({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId, automaticallyImplyLeading: false);
  }
}
```

詳細視圖重複使用了 `_ContactListView`，並將 `automaticallyImplyLeading` 參數設為 `false` 以隱藏返回按鈕，因為導覽是由側邊欄來控制的。

### 將側邊欄連接至自適應版面配置

現在，將側邊欄連接至你的自適應版面配置。更新你的 `adaptive_layout.dart` 檔案以匯入必要的檔案，並更新大螢幕版面配置：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (imports)"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';
import 'contacts.dart';
```

然後更新 `_buildLargeScreenLayout` 方法：

<?code-excerpt "fwe/rolodex/lib/step4_navigation/screens/adaptive_layout.dart (build_large_screen)"?>
```dart
Widget _buildLargeScreenLayout() {
  return CupertinoPageScaffold(
    backgroundColor: CupertinoColors.extraLightBackgroundGray,
    child: SafeArea(
      child: Row(
        children: [
          SizedBox(
            width: 320,
            child: ContactGroupsSidebar(
              selectedListId: selectedListId,
              onListSelected: _onContactListSelected,
            ),
          ),
          Container(width: 1, color: CupertinoColors.separator),
          Expanded(child: ContactListDetail(listId: selectedListId)),
        ],
      ),
    ),
  );
}
```

此程式碼建立了經典的選單-詳細版面配置，由側邊欄控制詳細區域的內容。

### 測試自適應導覽行為

對應用程式執行熱重載（Hot reload）並測試導覽功能：

**小螢幕（寬度 &lt;600px）：**

- 點擊聯絡人群組以導覽至聯絡人詳細資訊。
- 使用返回按鈕或向右滑動手勢來返回。
- 這是典型的基於堆疊的導覽流程。

**大螢幕（寬度 &gt;600px）：**

- 在側邊欄中點擊聯絡人群組以更新詳細視圖。
- 沒有導覽堆疊，選取動作會更新內容區域。
- 這是主從式介面 (master-detail interface) 模式。

應用程式會根據螢幕尺寸自動選擇適合的導覽模式，為手機和平板電腦提供最佳使用體驗。

:::note
若你在聯絡人詳細頁面上將應用程式從小螢幕調整為大螢幕，然後按下返回按鈕，可能會看到 `Hero` 標籤例外錯誤。這是因為 `Navigator` 仍保存著推入的小螢幕路由，而大螢幕版面配置同時渲染了詳細視圖，導致在轉場過程中元件樹中出現重複的元件（Widget）（例如導覽列）。對於這個簡單的架構而言，這是預期中的邊緣情況，在本學習路徑的目的範圍內可以忽略。
:::

### 回顧


<SummaryCard>
title: 你完成的目標
subtitle: 以下是你在本課程中建置與學習的摘要。
completed: true
items:
  - title: 使用 Navigator.push 在畫面之間導覽
    icon: open_in_new
    details: >-
      `Navigator.of(context).push` 會將新路由加入導覽堆疊。
      這是基於堆疊的導覽的基礎，畫面彼此堆疊推入，再彈出以返回上一頁。
  - title: 使用 CupertinoPageRoute 實現 iOS 風格的轉場效果
    icon: swipe_right
    details: >-
      `CupertinoPageRoute` 提供對 iOS 原生導覽功能的支援：
      從右側滑入的動畫效果、自動返回按鈕、
      正確的標題處理，以及向右滑動返回的手勢支援。
  - title: 實作自適應導覽模式
    icon: devices
    details: >-
      你為小螢幕和大螢幕設定了不同的導覽模式。
      小螢幕使用基於堆疊的導覽，點擊群組會推入新畫面。
      大螢幕使用主從式 (master-detail) 模式，選取群組會更新詳細面板而不進行導覽。
  - title: 完成 Rolodex 應用程式
    icon: celebration
    details: >-
      你已建置了一個完整的 iOS 風格聯絡人應用程式，
      具備自適應版面配置、進階捲動功能、
      可折疊的搜尋標題列，以及響應式導覽。
      這些都是正式應用程式中常用的模式！
</SummaryCard>

### 自我測驗

<Quiz title="導覽測驗">
- question: "`Navigator.of(context).push` 的作用是什麼？"
  options:
    - text: 以新畫面取代目前的畫面。
      correct: false
      explanation: "Push 是將畫面加入堆疊；`pushReplacement` 才是取代目前畫面。"
    - text: 將新路由加入導覽堆疊，並顯示在目前畫面的上方。
      correct: true
      explanation: Push 會將新路由加入堆疊，讓使用者可以返回上一個畫面。
    - text: 從導覽堆疊中移除目前畫面。
      correct: false
      explanation: "那是 `pop` 的作用；push 是加入新畫面。"
    - text: 在目前畫面上方開啟一個對話方塊。
      correct: false
      explanation: "對話方塊使用 `showDialog`；Navigator.push 是導覽至完整畫面。"
- question: "`Navigator.of(context).pop()` 的作用是什麼？"
  options:
    - text: 關閉整個應用程式。
      correct: false
      explanation: Pop 只移除目前路由，不會關閉應用程式。
    - text: 從導覽堆疊中移除目前路由，返回上一個畫面。
      correct: true
      explanation: Pop 會從堆疊頂端移除路由，顯示其下方的畫面。
    - text: 清除所有路由並顯示首頁畫面。
      correct: false
      explanation: 那需要 popUntil 或 pushAndRemoveUntil；pop 只移除最上層的路由。
    - text: 以新資料重新整理目前畫面。
      correct: false
      explanation: Pop 是返回導覽；若要重新整理，你需要使用 setState 或其他狀態管理方式。
</Quiz>
