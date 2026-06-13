---
title: 進階捲動與 Slivers
description: 學習如何使用 slivers 實作高效能捲動。
layout: tutorial
---

<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

在本課程中，你將學習 slivers，
這是一種特殊的元件 (Widget)，可以充分利用
Flutter 強大且可組合的捲動系統。
Slivers 讓你能夠建立複雜的捲動效果，
包括可收合的標頭、搜尋整合，以及自訂捲動行為。
在本節結束時，你將了解如何
使用 `CustomScrollView`、建立可收合的導覽列，
以及在可捲動區段中組織內容。

<SummaryCard>
title: 你將完成的事項
items:
  - title: 了解 slivers 與元件的差異
    icon: view_day
  - title: 使用 CustomScrollView 建置可捲動版面配置
    icon: unfold_more
  - title: 建立含搜尋功能的可收合導覽列
    icon: search
  - title: 依字母順序將聯絡人組織成區段
    icon: sort_by_alpha
</SummaryCard>

---

### Slivers 與元件

Slivers 是可捲動的區域，可以組合在一起放入
`CustomScrollView` 或其他捲動視圖中。
你可以把 slivers 想像成積木，每個都為
整體可捲動內容貢獻一部分。

雖然 slivers 和元件都是 Flutter 的基礎概念，
但它們用途不同，無法相互替換。

- **元件 (Widget)** 是通用的 UI 建構模組，
  可在元件樹的任何地方使用。
- **Slivers** 是專門為可捲動版面配置設計的特殊元件，
  具有以下限制：

- Slivers **只能**作為捲動視圖的直接子元件，例如
  `CustomScrollView` 和 `NestedScrollView`。
- 部分捲動視圖**只**接受 slivers 作為子元件。
  你無法將一般元件傳入 `CustomScrollView.slivers`。
- 若要在 sliver 環境中使用一般元件，
  請將其包裝在 `SliverToBoxAdapter` 或 `SliverFillRemaining` 中。

這種架構上的區分讓 Flutter 在維持不同類型
UI 元件之間清晰邊界的同時，能夠最佳化捲動效能。

### 為聯絡人群組新增基本 sliver 結構

首先，替換聯絡人群組頁面中的佔位內容。
為了避免在手機版面配置和平板側邊欄之間重複程式碼，
你可以建立一個私有且可重複使用的元件。

更新 `lib/screens/contact_groups.dart`，
在檔案底部加入 `_ContactGroupsView`。

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups_v1.dart (contact_groups_view)"?>
```dart
import 'package:flutter/cupertino.dart';

import '../data/contact_group.dart';
import '../main.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        debugPrint(list.toString());
      },
    );
  }
}

// ···
class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({required this.onListSelected, this.selectedListId});

  final int? selectedListId;
  final void Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(largeTitle: Text('Lists')),
          SliverFillRemaining(
            child: ValueListenableBuilder<List<ContactGroup>>(
              valueListenable: contactGroupsModel.listsNotifier,
              builder: (context, contactLists, child) {
                return CupertinoListSection.insetGrouped(
                  header: const Text('iPhone'),
                  children: [
                    for (final ContactGroup contactList in contactLists)
                      CupertinoListTile(
                        title: Text(contactList.label),
                        onTap: () => onListSelected(contactList),
                      ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

這個私有元件包含用於顯示聯絡人群組清單的共用 UI。
在小螢幕上，它將作為頁面使用；在
大螢幕上，它將用於填滿左欄。

此元件介紹了幾種 slivers：

- `CupertinoSliverNavigationBar`：
  一個有固定風格的導覽列，會在頁面捲動時收合。
- `SliverList`：
  一個可捲動的項目清單。
- `SliverFillRemaining`：
  一個佔用捲動區域剩餘空間的 sliver，
  其子元件為非 sliver 元件。

它接受一個回呼（callback）函式 `onListSelected` 來處理點擊，
使其能夠同時適用於導覽和側邊欄選取。

現在，更新 `lib/screens/contact_groups.dart` 中的 `ContactGroupsPage`，
使用你新建立的 `_ContactGroupsView` 元件：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups_v1.dart (contact_groups_page)"?>
```dart
class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        debugPrint(list.toString());
      },
    );
  }
}
```

這個結構讓 `ContactGroupsPage` 保持簡潔，
並專注於其主要職責：導覽——
你將在本教學的下一節中學到相關內容。

### 使用圖示和視覺元素豐富清單

現在，加入圖示和聯絡人數量，讓清單更具資訊性。
在 `lib/screens/contact_groups.dart` 的
`_ContactGroupsView` 類別中新增以下 `_buildTrailing` 輔助方法：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups.dart (build_trailing)"?>
```dart
Widget _buildTrailing(List<Contact> contacts, BuildContext context) {
  final TextStyle style = CupertinoTheme.of(
    context,
  ).textTheme.textStyle.copyWith(color: CupertinoColors.systemGrey);

  return Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Text(contacts.length.toString(), style: style),
      const Icon(
        CupertinoIcons.forward,
        color: CupertinoColors.systemGrey3,
        size: 18,
      ),
    ],
  );
}
```

這個輔助方法為每個清單項目建立尾端內容，
顯示聯絡人數量和向前箭頭。

現在，更新 `_ContactGroupsView` 中的 `CupertinoListSection`，
使用圖示和尾端輔助方法。更新 `build` 方法中
`ValueListenableBuilder.builder` 回呼（callback）內的程式碼：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contact_groups.dart (cupertino_list_section)"?>
```dart
child: ValueListenableBuilder<List<ContactGroup>>(
  valueListenable: contactGroupsModel.listsNotifier,
  builder: (context, contactLists, child) {
    const groupIcon = Icon(
      CupertinoIcons.group,
      weight: 900,
      size: 32,
    );

    const pairIcon = Icon(
      CupertinoIcons.person_2,
      weight: 900,
      size: 24,
    );

    return CupertinoListSection.insetGrouped(
      header: const Text('iPhone'),
      children: [
        for (final ContactGroup contactList in contactLists)
          CupertinoListTile(
            leading: contactList.id == 0 ? groupIcon : pairIcon,
            title: Text(contactList.label),
            trailing: _buildTrailing(contactList.contacts, context),
            onTap: () => onListSelected(contactList),
          ),
      ],
    );
  },
),
```

更新後的程式碼現在會顯示圖示，以區分
主要的「All iPhone」群組和使用者建立的群組，
並附有聯絡人數量和導覽指示。

### 為聯絡人建立進階捲動

接下來，你將實作聯絡人清單頁面。

在下一課中，你將實作小螢幕的導覽功能。
在此期間，為了查看聯絡人清單頁面的進度，
先更新 `lib/screens/adaptive_layout.dart` 以顯示聯絡人清單頁面：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/adaptive_layout.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contacts.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

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
          return const ContactListsPage(listId: 0); // New, temporary
        }
      },
    );
  }

  Widget _buildLargeScreenLayout() {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: SafeArea(
        child: Row(
          children: [
            const SizedBox(width: 320, child: Text('Sidebar placeholder')),
            Container(width: 1, color: CupertinoColors.separator),
            const Expanded(child: Text('Details placeholder')),
          ],
        ),
      ),
    );
  }
}
```

更新 `lib/screens/contacts.dart`，在檔案底部加入 `_ContactListView`：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v1.dart (contact_list_view)"?>
```dart
class _ContactListView extends StatelessWidget {
  const _ContactListView({
    required this.listId,
    this.automaticallyImplyLeading = true,
  });

  final int listId;
  final bool automaticallyImplyLeading;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final contactList = contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(contactList.title),
                automaticallyImplyLeading: automaticallyImplyLeading,
              ),
              SliverFillRemaining(
                child: Center(
                  child: Text(
                    '${contactList.contacts.length} contacts in ${contactList.label}',
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

現在，更新 `ContactListsPage` 以使用此視圖：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v1.dart (contact_lists_page)"?>
```dart
class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId);
  }
}
```

這個基本實作示範了如何在可重複使用的元件中
搭配動態資料使用 slivers。

### 使用 slivers 加入搜尋整合

現在，為聯絡人頁面加入整合式搜尋功能 UI。
更新 `_ContactListView` 中的 `CustomScrollView`，
改用 `CupertinoSliverNavigationBar.search` 建構式，
取代預設的 `CupertinoSliverNavigationBar` 建構式：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts_v2.dart (search)"?>
```dart
class _ContactListView extends StatelessWidget {
  // ···
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final contactList = contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              // Now using a search bar:
              CupertinoSliverNavigationBar.search(
                largeTitle: Text(contactList.title),
                searchField: const CupertinoSearchTextField(
                  suffixIcon: Icon(CupertinoIcons.mic_fill),
                  suffixMode: OverlayVisibilityMode.always,
                ),
              ),
              SliverFillRemaining(
                child: Center(
                  child: Text(
                    '${contactList.contacts.length} contacts in ${contactList.label}',
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
```


`CupertinoSliverNavigationBar.search` 建構式提供
整合式搜尋功能。當你向下捲動時，
搜尋欄會平滑地轉換進入已收合的導覽列。

### 建立依字母排序的聯絡人區段

現實世界的聯絡人應用程式會依字母順序組織聯絡人。
為此，為每個字母建立區段。
在你的 `contacts.dart` 檔案底部加入以下元件。
此元件不包含任何 slivers。

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts.dart (contact_list_section)"?>
```dart
class ContactListSection extends StatelessWidget {
  const ContactListSection({
    super.key,
    required this.lastInitial,
    required this.contacts,
  });

  final String lastInitial;
  final List<Contact> contacts;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsetsDirectional.fromSTEB(20, 0, 20, 0),
      child: Column(
        children: [
          const SizedBox(height: 15),
          Align(
            alignment: AlignmentDirectional.bottomStart,
            child: Text(
              lastInitial,
              style: const TextStyle(
                color: CupertinoColors.systemGrey,
                fontSize: 15,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          CupertinoListSection(
            backgroundColor: CupertinoColors.systemBackground,
            dividerMargin: 0,
            additionalDividerMargin: 0,
            topMargin: 4,
            children: [
              for (final Contact contact in contacts)
                CupertinoListTile(
                  padding: const EdgeInsets.all(0),
                  title: Text('${contact.firstName} ${contact.lastName}'),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
```

此元件建立了你在 iOS 聯絡人應用程式中看到的
熟悉依字母排序的區段。

### 使用 `SliverList` 呈現依字母排序的區段

現在，將 `_ContactListView` 中的佔位內容替換為
依字母排序的區段：

<?code-excerpt "fwe/rolodex/lib/step3_slivers/screens/contacts.dart (alphabetized)"?>
```dart
class _ContactListView extends StatelessWidget {
  // ···
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final contactList = contactGroupsModel.findContactList(listId);

          final contacts = contactList.alphabetizedContacts;

          return CustomScrollView(
            slivers: [
              CupertinoSliverNavigationBar.search(
                largeTitle: Text(contactList.title),
                automaticallyImplyLeading: automaticallyImplyLeading,
                searchField: const CupertinoSearchTextField(
                  suffixIcon: Icon(CupertinoIcons.mic_fill),
                  suffixMode: OverlayVisibilityMode.always,
                ),
              ),
              SliverList.list(
                children: [
                  const SizedBox(height: 20),
                  ...contacts.keys.map(
                    (initial) => ContactListSection(
                      lastInitial: initial,
                      contacts: contacts[initial]!,
                    ),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}
```

`SliverList.list` 讓你能夠提供一個元件清單，
使其成為可捲動內容的一部分。這是
將一般元件清單加入可捲動 sliver 區域最簡單的方式。

在下一課中，你將學習基於堆疊的導覽，
並更新小螢幕上的 UI，以便在
聯絡人清單視圖和聯絡人視圖之間進行導覽。

### 回顧

<SummaryCard>
title: 你完成了什麼
subtitle: 以下是你在本課程中建置和學習內容的摘要。
completed: true
items:
  - title: 了解 slivers 與元件的差異
    icon: view_day
    details: >-
      Slivers 是專為可捲動版面配置設計的特殊元件。
      它們只能作為捲動視圖（如 `CustomScrollView`）的直接子元件。
      在 `CustomScrollView` 和其他 sliver 環境中，一般元件必須
      包裝在 `SliverToBoxAdapter` 或 `SliverFillRemaining` 中。
  - title: 使用 CustomScrollView 建置可捲動版面配置
    icon: unfold_more
    details: >-
      `CustomScrollView` 讓你能夠將多個 slivers 組合在一起。
      你使用了 `CupertinoSliverNavigationBar`、`SliverFillRemaining`
      和 `SliverList` 來建立複雜的可捲動介面。
  - title: 建立含搜尋功能的可收合導覽列
    icon: search
    details: >-
      你使用了 `CupertinoSliverNavigationBar.search` 建構式，
      建立了帶有整合式搜尋功能的可收合導覽列。
  - title: 依字母順序將聯絡人組織成區段
    icon: sort_by_alpha
    details: >-
      你建立了依姓氏首字母分組的 `ContactListSection` 元件，
      然後使用 `SliverList.list` 將它們加入可捲動區域。
      這模擬了熟悉的 iOS 聯絡人應用程式體驗。
</SummaryCard>

### 自我測驗

<Quiz title="Slivers 測驗">
- question: Slivers 和一般元件之間的主要差異是什麼？
  options:
    - text: Slivers 的渲染速度比一般元件快。
      correct: false
      explanation: 兩者都有經過最佳化；差異在於它們的用途和環境。
    - text: Slivers 是專為可捲動版面配置設計的特殊元件，只能作為捲動視圖的直接子元件。
      correct: true
      explanation: Slivers 在 CustomScrollView 等捲動視圖中運作；一般元件可以在任何地方使用。
    - text: Slivers 可以有無限數量的子元件。
      correct: false
      explanation: 像 SliverList 這樣的 slivers 可以有很多子元件，但這並不是區分它們的特點。
    - text: Slivers 自動處理使用者手勢。
      correct: false
      explanation: 手勢處理是分開的；slivers 是關於可捲動版面配置的組合。
- question: 如何在 CustomScrollView 的 slivers 清單中使用一般元件？
  options:
    - text: 直接加入即可；CustomScrollView 接受任何元件。
      correct: false
      explanation: CustomScrollView 只接受 slivers；一般元件必須先包裝。
    - text: 將其包裝在 SliverToBoxAdapter 或 SliverFillRemaining 中。
      correct: true
      explanation: 這些轉接元件可將一般元件轉換為 slivers，以便在 sliver 環境中使用。
    - text: "透過呼叫元件上的 `.toSliver()` 將其轉換為 sliver。"
      correct: false
      explanation: "沒有 `.toSliver()` 方法；你應使用 SliverToBoxAdapter 等轉接元件。"
    - text: "將其傳入 `child` 屬性而非 `slivers`。"
      correct: false
      explanation: CustomScrollView 使用 slivers 屬性；沒有用於此目的的 child 屬性。
</Quiz>
