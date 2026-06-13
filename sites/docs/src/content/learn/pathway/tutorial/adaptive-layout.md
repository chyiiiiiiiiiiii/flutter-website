---
title: LayoutBuilder 與自適應版面配置
description: 了解如何使用 LayoutBuilder 元件。
layout: tutorial
---

<?code-excerpt replace="/ *\/\/\s+ignore_for_file:[^\n]+\n//g;"?>

了解如何建立能適應不同螢幕寬度的版面配置。

<SummaryCard>
title: 你將完成的事項
items:
  - title: 使用 LayoutBuilder 建立響應式版面配置
    icon: fit_screen
  - title: 偵測螢幕大小以選擇不同的版面配置
    icon: devices
  - title: 為大螢幕建置側邊欄與詳細內容的版面配置
    icon: view_sidebar
</SummaryCard>

---

### 簡介

現代應用程式需要在各種尺寸的螢幕上都能良好運作。
在本頁中，你將學習如何建立能適應不同螢幕寬度的版面配置。
此應用程式在大螢幕上會顯示側邊欄，
在小螢幕上則使用以導覽為基礎的使用者介面。
具體而言，此應用程式處理兩種螢幕尺寸：

- **大螢幕（平板電腦、桌上型電腦）**：
  並排顯示聯絡人群組與聯絡人詳細資料。
- **小螢幕（手機）**：
  使用導覽在聯絡人群組與詳細資料之間切換。

### 建立聯絡人群組頁面

首先，為你的聯絡人群組畫面建立 `ContactGroupsPage` 元件 (Widget) 的基本結構。
建立 `lib/screens/contact_groups.dart` 並加入以下基本結構：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/contact_groups.dart"?>
```dart
import 'package:flutter/cupertino.dart';

class ContactGroupsPage extends StatelessWidget {
  const ContactGroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(child: Text('Contact Groups will go here')),
    );
  }
}
```

### 建立聯絡人頁面

同樣地，建立 `lib/screens/contacts.dart`，
以便日後顯示個別聯絡人：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/contacts.dart"?>
```dart
import 'package:flutter/cupertino.dart';

class ContactListsPage extends StatelessWidget {
  const ContactListsPage({super.key, required this.listId});

  final int listId;

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: Center(child: Text('Lists of contacts will go here')),
    );
  }
}
```

`ContaactsListPage` 元件與 `ContactGroupsPage` 元件是
實作自適應版面配置元件所需的佔位頁面，
你接下來將進行這項實作。

### 建置自適應版面配置的基礎

建立 `lib/screens/adaptive_layout.dart`
並從以下基本結構開始：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v1.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

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

這是一個 `StatefulWidget`，因為自適應版面配置最終
需要管理目前選取的聯絡人群組。

接下來，將螢幕大小偵測邏輯加入 `lib/screens/adaptive_layout.dart`：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v2.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

const largeScreenMinWidth = 600;

class AdaptiveLayout extends StatefulWidget {
  const AdaptiveLayout({super.key});

  @override
  State<AdaptiveLayout> createState() => _AdaptiveLayoutState();
}

class _AdaptiveLayoutState extends State<AdaptiveLayout> {
  @override
  Widget build(BuildContext context) {
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

`LayoutBuilder` 元件提供了父元件尺寸限制的相關資訊。
在 `builder` 回呼（callback）中，你會收到一個 `BoxConstraints` 物件，
告訴你可用的最大寬度與高度。

透過檢查 `constraints.maxWidth > largeScreenMinWidth`，
你可以決定要顯示哪種版面配置。
600 像素的閾值是常見的斷點，
用來區分手機尺寸與平板電腦尺寸的螢幕。

### 更新主應用程式

更新 `main.dart` 以使用自適應版面配置，
讓你可以看到變更效果：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/main.dart"?>
```dart
import 'package:flutter/cupertino.dart';

import 'data/contact_group.dart';
import 'screens/adaptive_layout.dart';

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
      home: AdaptiveLayout(),
    );
  }
}
```

如果你在 Chrome 中執行，可以調整瀏覽器視窗大小來
觀察版面配置的變化。

### 加入清單選取功能

大螢幕版面配置需要追蹤目前選取的聯絡人群組。
使用以下程式碼更新 `lib/screens/adaptive_layout.dart` 中的狀態物件：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v3.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

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
          return const Text('Large screen layout');
        } else {
          return const ContactGroupsPage();
        }
      },
    );
  }
}
```

`selectedListId` 變數追蹤目前選取的聯絡人群組，
而 `_onContactListSelected` 則在使用者做出選擇時更新此值。

### 建置大螢幕版面配置

現在，在 `lib/screens/adaptive_layout.dart` 中實作大螢幕的並排版面配置。
首先，將暫時的文字替換為包含正確版面配置的元件。

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout_v4.dart"?>
```dart

import 'package:flutter/cupertino.dart';

import 'contact_groups.dart';

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
          // For small screens, use the original, navigation-style approach.
          return const ContactGroupsPage();
        }
      },
    );
  }

  Widget _buildLargeScreenLayout() {
    return const CupertinoPageScaffold(
      backgroundColor: CupertinoColors.extraLightBackgroundGray,
      child: SafeArea(child: Row(children: [Text('Sidebar'), Text('Details')])),
    );
  }
}
```

大螢幕版面配置使用 `Row` 來
並排放置側邊欄與詳細資料。
`SafeArea` 確保內容不會與
狀態列等系統 UI 元素重疊。

現在，設定兩個面板的大小，
並在 `lib/screens/adaptive_layout.dart` 中加入視覺分隔線：

<?code-excerpt "fwe/rolodex/lib/step2_adaptive_layout/screens/adaptive_layout.dart (panel-and-divider)"?>
```dart
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
```

此版面配置建立了以下結構：

- 固定寬度的側邊欄（320 像素），用於顯示聯絡人群組。
- 面板之間 1 像素的分隔線。
- 詳細資料面板使用 `Expanded` 元件佔用剩餘空間。

### 測試自適應版面配置

熱重載你的應用程式並測試響應式行為。
如果你在 Chrome 中執行，可以調整瀏覽器視窗大小來
觀察版面配置變化：

- **寬視窗（> 600px）**：
  並排顯示側邊欄與詳細資料的佔位文字。
- **窄視窗（< 600px）**：
  僅顯示聯絡人群組頁面。

側邊欄與主要內容區域目前都顯示佔位文字。

在下一課中，你將實作 sliver 來填入
聯絡人清單內容。

### 回顧

<SummaryCard>
title: 你完成了什麼
subtitle: 以下是你在本課中建置與學習的摘要。
completed: true
items:
  - title: 使用 LayoutBuilder 建立響應式版面配置
    icon: fit_screen
    details: >-
      `LayoutBuilder` 在其 builder 回呼中提供父元件的尺寸限制。
      透過檢查 `constraints.maxWidth`，
      你可以根據可用空間決定要顯示哪種版面配置。
  - title: 偵測螢幕大小以選擇不同的版面配置
    icon: devices
    details: >-
      你使用了 600 像素的斷點來
      區分手機尺寸與平板電腦尺寸的螢幕。
      這個常用閾值幫助你的應用程式調整其使用者介面，
      為每台裝置提供最佳體驗。
  - title: 為大螢幕建置側邊欄與詳細內容的版面配置
    icon: view_sidebar
    details: >-
      在大螢幕上，你使用 `Row` 並排顯示固定寬度的側邊欄
      與 `Expanded` 詳細資料面板。
      這個經典模式在平板電腦與桌上型電腦上最大化了螢幕空間的運用。
</SummaryCard>

### 自我測驗

<Quiz title="自適應版面配置測驗">
- question: LayoutBuilder 向其 builder 回呼提供了什麼資訊？
  options:
    - text: 裝置的作業系統與螢幕方向。
      correct: false
      explanation: LayoutBuilder 提供尺寸限制，而非作業系統或方向資訊。
    - text: 父元件的尺寸限制，包含最大寬度與高度。
      correct: true
      explanation: LayoutBuilder 的 builder 接收 BoxConstraints，告訴你來自父元件的可用空間。
    - text: 目前的主題顏色與排版。
      correct: false
      explanation: 主題資料來自 Theme.of(context)，而非 LayoutBuilder。
    - text: 元件樹中子元件的數量。
      correct: false
      explanation: LayoutBuilder 提供版面配置限制，而非元件樹資訊。
- question: 在大螢幕版面配置中，哪個元件可用於並排放置側邊欄與詳細資料面板？
  options:
    - text: Column
      correct: false
      explanation: Column 垂直排列元件，而非並排。
    - text: Row
      correct: true
      explanation: Row 水平排列其子元件，非常適合並排放置側邊欄與詳細資料面板。
    - text: Stack
      correct: false
      explanation: Stack 將元件堆疊重疊，而非並排。
    - text: ListView
      correct: false
      explanation: ListView 用於可捲動的清單，而非並排版面配置。
</Quiz>
