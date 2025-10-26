---
title: LayoutBuilder 與自適應版面配置
description: 學習如何使用 LayoutBuilder 元件 (Widget)
permalink: /tutorial/adaptive-layouts/
---

現代應用程式需要在各種尺寸的螢幕上都能良好運作。在本頁中，你將學會如何建立能夠根據不同螢幕寬度自動調整的版面配置。本範例應用程式會在大螢幕上顯示側邊欄，在小螢幕上則採用導覽式介面。具體來說，這個應用程式會針對兩種螢幕尺寸進行處理：

* **大螢幕（平板、桌面）**：同時並排顯示聯絡人群組與聯絡人詳細資料。
* **小螢幕（手機）**：透過導覽在聯絡人群組與詳細資料之間切換。

## 建立聯絡人群組頁面

首先，為你的聯絡人群組畫面建立 `ContactGroupsPage` 元件 (Widget) 的基本結構。建立 `lib/screens/contact_groups.dart`，並加入以下基本結構：

```dart
import 'package:flutter/cupertino.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(
        child: Text('Contact Groups will go here'),
      ),
    );
  }
}
```

## 建立聯絡人頁面

同樣地，建立`lib/screens/contacts.dart`，以便最終顯示個別聯絡人：

```dart
import 'package:flutter/cupertino.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(
        child: Text('Lists of contacts will go here'),
      ),
    );
  }
}
```

`ContaactsListPage` 元件（Widget）和 `ContactGroupsPage` 元件（Widget）是
實作自適應版面配置元件（adaptive layout widget）時所需的
佔位頁面，接下來你將會進行這個實作。

## 建立自適應版面配置的基礎

建立 `lib/screens/adaptive_layout.dart`，
並從以下的基本結構開始：

```dart
import 'package:flutter/cupertino.dart';

import 'contract_groups.dart';

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
    return const ContactGroupsPage(); // Temporary placeholder
  }
}

```

這是一個`StatefulWidget`，因為自適應版面配置（adaptive layout）最終會管理目前選取的聯絡人群組（contact group）。

接下來，新增螢幕尺寸偵測邏輯：

```dart
import 'package:flutter/cupertino.dart';
import 'contact_groups.dart';

// New
const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
    // Replace from here
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLargeScreen = constraints.maxWidth > largeScreenMinWidth;

        if (isLargeScreen) {
          return const Text('Large screen layout'); // Temporary
        } else {
          return const ContactGroupsPage();
        }
      },
    );
  }
}
```

`LayoutBuilder` 元件（Widget）可提供關於父元件尺寸限制的資訊。在 `builder` 回呼（callback）中，你會收到一個 `BoxConstraints` 物件，該物件會告訴你可用的最大寬度與高度。

你可以透過檢查 `constraints.maxWidth > largeScreenMinWidth` 來決定要顯示哪一種版面配置。600 像素的臨界值是常見的斷點，用來區分手機尺寸螢幕與平板尺寸螢幕。

## 更新主應用程式

請更新 `main.dart` 以使用自適應版面配置（adaptive layout），這樣你就能看到你的變更。

```dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';
import 'package:rolodex/screens/adaptive_layout.dart';

final contactGroupsModel = ContactGroupsModel();

void main() {
  runApp(const RolodexApp());
}

class RolodexApp extends StatelessWidget {
  const RolodexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'Rolodex',
      theme: CupertinoThemeData(
        barBackgroundColor: CupertinoDynamicColor.withBrightness(
          color: Color(0xFFF9F9F9),
          darkColor: Color(0xFF1D1D1D),
        ),
      ),
      home: AdaptiveLayout(), // New
    );
  }
}
```

如果你正在 Chrome 瀏覽器中執行，可以調整瀏覽器視窗大小來查看版面配置的變化。

## 新增清單選取功能

大型螢幕版面配置需要追蹤目前選取的聯絡人群組。請使用以下程式碼更新 state 物件：

```dart
import 'package:flutter/cupertino.dart';

import 'contract_groups.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}


class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  // New 
  int selectedListId = 0;

  // New
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
          return const Text('Large screen layout');
        } else {
          return const ContactGroupsPage();
        }
      },
    );
  }
}
```

`selectedListId` 變數用來追蹤目前所選擇的聯絡人群組，
而 `_onContactListSelected` 則會在使用者做出選擇時更新這個值。

## 建立大螢幕版面配置

現在，請為大螢幕實作並排的版面配置。首先，
將暫時的文字替換為包含正確版面配置的元件（Widget）。

```dart
import 'package:flutter/cupertino.dart';

import 'contract_groups.dart';

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
          return _buildLargeScreenLayout(); // New 
        } else {
          // For small screens, use the original, navigation-style approach
          return const ContactGroupsPage();
        }
      },
    );
  }

  // New 
  Widget _buildLargeScreenLayout() {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: SafeArea(
        child: Row(
          children: [
            // Contact groups list
            Text('Sidebar'),
            // List detail view
            Text('Details'),
          ],
        ),
      ),
    );
  }
}

```

大螢幕版面配置使用 `Row`，將側邊欄與詳細內容並排顯示。`SafeArea` 可確保內容不會與系統 UI 元素（如狀態列）重疊。

現在，請設定這兩個面板的尺寸，並加入一個視覺分隔線：

```dart
Widget _buildLargeScreenLayout() {
  return CupertinoPageScaffold(
    backgroundColor: CupertinoColors.extraLightBackgroundGray,
    child: SafeArea(
      child: Row(
        children: [
          // Contact groups list
          SizedBox(
            width: 320,
            child: Text('Sidebar placeholder'), // Temporary
          ),
          // Divider
          Container(
            width: 1,
            color: CupertinoColors.separator,
          ),
          // List detail view
          Expanded(
            child: Text('Details placeholder'), // Temporary
          ),
        ],
      ),
    ),
  );
}
```

此版面配置會建立以下內容：
* 一個固定寬度（320 像素）的側邊欄，用於顯示聯絡人群組。
* 兩個面板之間有 1 像素的分隔線。
* 一個詳細資料面板，使用 `Expanded` 元件（Widget）來填滿剩餘空間。

## 測試自適應版面配置

請使用 hot reload 重新載入你的應用程式，並測試其響應式（responsiveness）行為。如果你是在 Chrome 執行，可以調整瀏覽器視窗大小來觀察版面配置的變化：

* **寬視窗（> 600px）**：側邊欄和詳細資料會並排顯示，並呈現預留文字。
* **窄視窗（< 600px）**：只顯示聯絡人群組頁面。

目前側邊欄和主要內容區都會顯示預留文字。

在下一課，你將會實作 sliver 來填充聯絡人清單的內容。
