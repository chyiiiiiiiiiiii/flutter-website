---
title: 進階滾動與 sliver
description: 學習如何使用 sliver 實現高效能滾動效果。
permalink: /tutorial/slivers/
---

在本課程中，你將學習 sliver，它是一種特殊的元件（Widget），
能夠充分利用 Flutter 強大且可組合的滾動系統。
sliver 讓你可以打造各種進階的滾動效果，
包括可收合的標頭、搜尋整合，以及自訂滾動行為。
在本節結束時，你將了解如何使用 `CustomScrollView`，
建立可收合的導覽列（Navigation Bar），
並將內容組織在可滾動的區段中。

## Sliver 與元件（Widget）

sliver 是可以組合在 `CustomScrollView` 或其他滾動檢視（scroll view）中的可滾動區域。
你可以將 sliver 想像成構成整體可滾動內容的積木。

雖然 sliver 與元件（Widget）都是 Flutter 的基本概念，
但它們用途不同，且不可互換。

- **元件（Widget）** 是一般的 UI 建構區塊，可以在元件樹中的任何地方使用。
- **sliver** 則是專為可滾動版面設計的特殊元件，有以下限制：

- sliver **只能** 作為滾動檢視（scroll view）的直接子元件，例如 `CustomScrollView` 和 `NestedScrollView`。
- 有些滾動檢視 **只** 接受 sliver 作為子元件。你不能將一般元件傳給 `CustomScrollView.slivers`。
- 若要在 sliver 環境中使用一般元件，請將它們包裝在 `SliverToBoxAdapter` 或 `SliverFillRemaining` 中。

這種架構上的區隔，讓 Flutter 能夠優化滾動效能，
同時維持不同 UI 元件類型之間的明確界線。

## 為聯絡人群組加入基本 sliver 結構

首先，請將聯絡人群組頁面中的預設內容替換掉。
為了避免在手機版面與平板側邊欄之間重複程式碼，
你可以建立一個私有且可重複使用的元件。

請更新 `lib/screens/contact_groups.dart`，在檔案底部加入 `_ContactGroupsView`。

```dart
// lib/screens/contact_groups.dart

// New imports
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

// ... ContactGroupsPage widget ...

// New
class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({
    required this.onListSelected,
    this.selectedListId,
  });

  final int? selectedListId;
  final Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(
            largeTitle: Text('Lists'),
          ),
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

這個私有元件（Widget）包含了用於顯示聯絡人群組清單的共用 UI。在小螢幕上，它會作為一個頁面使用；在大螢幕上，則會用來填滿 leftColumn（左側欄位）。

這個元件引入了數個 sliver：
- `CupertinoSliverNavigationBar`：一個具備意見導向的導覽列（NavigationBar），會隨著頁面捲動而收合。
- `SliverList`：一個可捲動的項目清單。
- `SliverFillRemaining`：一個會佔據捲動區域剩餘空間的 sliver，其子元件是一個非 sliver 元件（Widget）。

它接收一個回呼函式（callback function）`onListSelected`來處理點擊事件，使其能夠同時適用於導覽與側邊欄選取。

現在，請更新 `ContactGroupsPage` 以使用這個新的私有元件（Widget）：

```dart
// lib/screens/contact_groups.dart
class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        // TODO: Implement navigation lesson.
        debugPrint(list.toString());
      },
    );
  }
}
// ... _ContactGroupsView from above
```

這樣的結構讓 `ContactGroupsPage` 保持簡潔，並專注於其主要職責：導覽（navigation），你將在本教學的下一節學習相關內容。

## 以圖示與視覺元素強化清單

現在，加入圖示與聯絡人數量，讓清單資訊更豐富。請將以下輔助方法新增至你的 `_ContactGroupsView` 類別中：

```dart
// In lib/screens/contact_groups.dart, inside _ContactGroupsView

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

這個輔助函式會建立每個清單項目的尾端內容。它會顯示聯絡人數量以及一個前進箭頭。

現在，請在`_ContactGroupsView`中的`CupertinoListSection`進行更新，改用圖示以及這個尾端輔助函式。在`build`方法中的`ListenableBuilder.builder`回呼內更新程式碼。

```dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return _ContactGroupsView(
      selectedListId: 0,
      onListSelected: (list) {
        // TODO: Implement navigation lesson.
        debugPrint(list.toString());
      },
    );
  }
}

class _ContactGroupsView extends StatelessWidget {
  const _ContactGroupsView({
    required this.onListSelected,
    this.selectedListId,
  });

  final int? selectedListId;
  final Function(ContactGroup) onListSelected;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: CustomScrollView(
        slivers: [
          const CupertinoSliverNavigationBar(
            largeTitle: Text('Lists'),
          ),
          SliverFillRemaining(
            child: ValueListenableBuilder<List<ContactGroup>>(
              valueListenable: contactGroupsModel.listsNotifier,
              builder: (context, contactLists, child) {

                // New from here
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
          ),
        ],
      ),
    );
  }

  Widget _buildTrailing(List<Contact> contacts, BuildContext context) {
    //...
  }
    
}
```

現在，更新後的程式碼會顯示不同的圖示，以區分主要的「All iPhone」群組與使用者自訂群組，並同時顯示聯絡人數量與導覽指示器。

## 為聯絡人頁面建立進階捲動效果

接下來，來處理聯絡人頁面。就像之前一樣，你將建立一個私有且可重複使用的 view，以避免程式碼重複。

在下一課，你會實作小螢幕的導覽功能。在此之前，若想先查看聯絡人清單頁面的進度，請將`AdaptiveLayout`更新為顯示聯絡人清單頁面。


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
          return const ContactsListPage(listId: 0); // New, temporary
        }
      },
    );
  }
}
```


在 `lib/screens/contacts.dart` 的檔案底部加入 `_ContactListView` 來進行更新：

```dart
// lib/screens/contacts.dart
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
          final ContactGroup contactList =
              contactGroupsModel.findContactList(listId);

          return CustomScrollView(
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(contactList.title),
                automaticallyImplyLeading: automaticallyImplyLeading,
              ),
              SliverFillRemaining(
                child: Center(
                  child: Text(
                      '${contactList.contacts.length} contacts in ${contactList.label}'),
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

現在，將 `ContactListsPage` 更新為使用這個 view：

```dart
// lib/screens/contacts.dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/main.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return _ContactListView(listId: listId);
  }
}

// ... _ContactListView from above.
```

這個基本實作展示了如何在可重複使用的元件中，將 sliver 與動態資料結合使用。

## 使用 sliver 加入搜尋整合

`CupertinoSliverNavigationBar.search` 建構函式提供了整合式搜尋功能。當你向下捲動時，搜尋欄位會順暢地轉換成收合的導覽列（navigation bar）。

現在，請為聯絡人頁面（contacts page）加入整合式搜尋功能的 UI。請在 `_ContactListView` 中更新 `CustomScrollView`：

```dart
class _ContactListView extends StatelessWidget {
  const _ContactListView({
    required this.listId,
  });

  final int listId;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: ValueListenableBuilder<List<ContactGroup>>(
        valueListenable: contactGroupsModel.listsNotifier,
        builder: (context, contactGroups, child) {
          final ContactGroup contactList = contactGroupsModel.findContactList(
            listId,
          );

          return CustomScrollView(
            slivers: [
              // New
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

`CupertinoSliverNavigationBar.search` 建構函式提供了整合式搜尋功能。當你向下捲動時，搜尋欄位會順暢地過渡到收合的導覽列中。

## 建立依字母排序的聯絡人區段

在實際應用中，聯絡人 App 會依字母順序整理聯絡人。為了達成這個目的，請為每個字母建立一個區段。將以下元件（Widget）新增到你的 `contacts.dart` 檔案底部。這個元件不包含任何 sliver。  

```dart
// lib/screens/contacts.dart

// ...

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
                  padding: EdgeInsets.all(0),
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

這個元件（Widget）會建立你在 iOS 通訊錄中常見的字母排序區塊。

## 使用 `SliverList` 來建立字母排序區塊

現在，請將 `_ContactListView` 中的佔位內容替換為字母排序區塊：

```dart
// In lib/screens/contacts.dart, inside _ContactListView's builder

final AlphabetizedContactMap contacts = contactList.alphabetizedContacts;

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
          (String initial) => ContactListSection(
            lastInitial: initial,
            contacts: contacts[initial]!,
          ),
        ),
      ],
    ),
  ],
);
```

`SliverList.list` 允許你提供一個元件（Widget）清單，這些元件會成為可滾動內容的一部分。這是將一般元件清單加入可滾動 sliver 區域中最簡單的方法。

在下一課中，你將學習基於堆疊（stack-based）的導覽方式，並在小螢幕上更新 UI，以便在聯絡人清單檢視與聯絡人檢視之間進行導覽。
