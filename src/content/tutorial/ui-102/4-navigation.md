---
title: 基於堆疊的導覽
description: 學習如何在 Flutter 應用程式中從一個頁面導覽到另一個頁面
permalink: /tutorial/stack-based-navigation/
---
現在你已經了解 sliver 和滾動（scrolling），可以開始實作螢幕之間的導覽功能。在本課程中，你將會更新小螢幕（small-screen）檢視，讓使用者在點擊聯絡人群組（contact group）時，能夠導覽至該群組的聯絡人清單頁面。

首先，請將 adaptive layout 元件（widget）中的變更還原，讓其在小螢幕上預設顯示 `ContactGroupsPage`。

```dart
// lib/screens/adaptive_layout.dart

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
          return const ContactGroupsPage(); // Reverted
        }
      },
    );
  }
}
```

## 為聯絡人群組新增導覽功能

`ContactGroupsPage` 已經使用了 `_ContactGroupsView`，
並且為其提供了一個回呼函式。這個回呼函式需要更新，
讓它在點擊群組時進行導覽，而不是僅將群組資訊輸出到
主控台。

請確保在 `lib/screens/contact_groups.dart` 中的 `onListSelected` 回呼函式
實作如下：

```dart
// lib/screens/contact_groups.dart

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      onListSelected: (list) => Navigator.of(context).push(
        CupertinoPageRoute(
          title: list.title,
          builder: (context) => ContactListsPage(listId: list.id),
        ),
      ),
    );
  }
}
```

這個小型程式碼區塊包含了本頁最重要的新資訊。

`Navigator.of(context)` 從元件樹（widget tree）中取得最近的 `Navigator` 元件（Widget）。`push` 方法會將新的 Route 加入 navigator 的堆疊（stack），並顯示從 `builder` 屬性返回的元件（Widget）。

這是最基本的堆疊式導覽（stack-based navigation）實作方式，新螢幕會被推到目前螢幕之上。若要返回上一個螢幕，可以使用 `Navigator.pop` 方法。

`CupertinoPageRoute` 創建具備以下功能的 iOS 風格頁面轉場效果：
- 從右側滑入的動畫（slide-in animation）。
- 自動支援返回按鈕。
- 正確的標題處理。
- 支援滑動返回（swipe-to-go-back）手勢。

## 為大螢幕建立側邊欄元件

針對大螢幕，你需要一個不會導覽、而是更新主內容區域的側邊欄。由於前一步已經重構，建立這個元件就變得很簡單。請將此元件加到 `lib/screens/contact_groups.dart` 的底部：

```dart
// lib/screens/contact_groups.dart

// ...

/// A sidebar component for selecting contact groups, designed for large screens.
class ContactGroupsSidebar extends StatelessWidget {
  const ContactGroupsSidebar({
    super.key,
    required this.selectedListId,
    required this.onListSelected,
  });

  final int selectedListId;
  final Function(int) onListSelected;

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: selectedListId,
      onListSelected: (list) => onListSelected(list.id),
    );
  }
}
```

這個側邊欄元件（sidebar component）重複使用了`_ContactGroupsView`，並提供了不同的 callback。它不是用來導覽（navigate），而是呼叫`onListSelected`，並傳入被點擊清單的 ID。此外，它也會將`selectedListId`傳遞給`_ContactGroupsView`，以便可以高亮顯示選取的項目。

## 為大螢幕建立詳細檢視（detail view）

針對大螢幕的版面配置，你需要一個不顯示導覽控制項的詳細檢視。就像側邊欄一樣，這可以很容易地透過重複使用`_ContactListView`來實現。請將這個元件（widget）加到你的`contacts.dart`檔案底部：

```dart
// lib/screens/contacts.dart

// ...

/// A detail view component for showing contacts in a specific list.
class ContactListDetail extends StatelessWidget {
  const ContactListDetail({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(
      listId: listId,
      automaticallyImplyLeading: false,
    );
  }
}
```

詳細檢視會重複使用 `_ContactListView`，並設定
`automaticallyImplyLeading: false` 來隱藏返回按鈕，因為
導覽已由側邊欄處理。

## 將側邊欄連接到自適應版面配置

現在，將側邊欄連接到你的自適應版面配置。更新你的
`adaptive_layout.dart`，以匯入必要的檔案並更新
大螢幕的版面配置：

```dart
// lib/screens/adaptive_layout.dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/screens/contact_groups.dart';
import 'package:rolodex/screens/contacts.dart';
```

然後更新 `_buildLargeScreenLayout` 方法：

```dart
// lib/screens/adaptive_layout.dart

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
          Container(
            width: 1,
            color: CupertinoColors.separator,
          ),
          Expanded(
            child: ContactListDetail(listId: selectedListId),
          ),
        ],
      ),
    ),
  );
}
```

這段程式碼建立了經典的選單-細節（menu-detail）版面配置，側邊欄（sidebar）控制細節區域的內容。

## 測試自適應導覽行為

熱重載（hot reload）你的應用程式並測試導覽功能：

**小螢幕（寬度 < 600px）：**
- 點擊聯絡人群組以導覽至聯絡人詳細資料。
- 使用返回按鈕或滑動手勢返回上一頁。
- 這是經典的堆疊式（stack-based）導覽流程。

**大螢幕（寬度 > 600px）：**
- 在側邊欄點擊聯絡人群組以更新細節檢視區。
- 沒有導覽堆疊，選取項目會直接更新內容區域。
- 這是主從（master-detail）介面模式。

應用程式會根據螢幕尺寸自動選擇合適的導覽模式，讓手機和平板裝置都能獲得最佳體驗。