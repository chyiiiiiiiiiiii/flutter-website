---
title: 進階 UI 功能
description: |
  進階 UI 功能的溫和入門：自適應版面、sliver、滾動、導覽。
permalink: /tutorial/set-up-ui-102/
---

在這個 Flutter 教學系列的第三部分，你將會使用
Flutter 的 Cupertino 函式庫，打造一個 iOS
聯絡人（Contacts）App 的部分複製版。

<img src='/assets/images/docs/tutorial/rolodex_complete.png'
width="100%" alt="完成的 Rolodex 聯絡人管理應用程式截圖，顯示按字母順序排列的聯絡人清單。">

完成本教學後，你將學會如何建立
自適應版面、實作完整的主題化、建構導覽模式，以及運用進階的滾動技巧。

## 你將學到什麼

本教學將探討以下主題：

* 使用 `LayoutBuilder` 建立響應式版面。
* 運用 sliver 與搜尋實現進階滾動效果。
* 實作基於堆疊的導覽模式。
* 利用 `CupertinoThemeData` 建立完整主題。
* 支援明亮與深色主題。
* 使用 Cupertino 元件 (Widgets) 創建 iOS 風格的 UI。

本教學假設你已完成前面的 Flutter 教學，
並且熟悉基本的元件（Widget）組合、狀態管理，
以及 Flutter 專案結構。

## 建立新的 Flutter 專案

要建立 Flutter 應用程式，首先需要一個 Flutter 專案。你可以
使用 [Flutter CLI tool][Flutter CLI tool]（隨 Flutter SDK 一併安裝）
來建立新的應用程式。

請打開終端機或命令提示字元，並執行以下指令來
建立新的 Flutter 專案：

```shell
$ flutter create rolodex --empty
```

此指令會建立一個使用最小「空白」範本的 Flutter 專案。

## 新增 Cupertino Icons 相依套件

此專案會使用 [`cupertino_icons` 套件][`cupertino_icons` package]，這是官方的 Flutter 套件。請執行以下指令，將其新增為相依套件：

```shell
$ flutter pub add cupertino_icons
```

## 建立專案結構

首先，為你的應用程式建立基本的目錄結構。在你的專案
`lib` 目錄下，建立以下資料夾：

```shell
$ cd rolodex
$ mkdir lib/data lib/screens lib/theme
```

此指令會建立資料夾，將你的程式碼依照邏輯區塊進行組織：資料模型（data models）、螢幕元件（screen widgets），以及主題設定（theme configuration）。

## 取代起始程式碼

在你的 IDE 中，開啟 `lib/main.dart` 檔案，並將其全部內容替換為以下的起始程式碼：

```dart
import 'package:flutter/cupertino.dart';

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
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello Rolodex!'),
        ),
      ),
    );
  }
}
```

與前兩個教學不同，本範例應用程式使用`CupertinoApp`，而非`MaterialApp`。Cupertino 設計系統提供了 iOS 風格的元件（Widgets）與樣式，非常適合打造在 Apple 裝置上具有原生體驗的應用程式。

## 執行你的應用程式

在終端機中，於你的 Flutter 應用程式根目錄下，執行以下指令：

```shell
$ flutter run -d chrome
```

應用程式會在新的 Chrome 實例中建置並啟動。畫面中央會顯示
「Hello Rolodex!」。

## 建立資料模型

在開始建立 UI 之前，請先建立應用程式將會使用的資料結構與範例資料。本節僅做簡要說明，因為這不是本教學的重點。

### `Contact` 資料

建立一個新檔案 `lib/data/contact.dart`，並新增基本的 `Contact` 類別：

```dart
// lib/data/contact.dart
class Contact {
  Contact({
    required this.id,
    required this.firstName,
    this.middleName,
    required this.lastName,
    this.suffix,
  });

  final int id;
  final String firstName;
  final String lastName;
  final String? middleName;
  final String? suffix;
}

final johnAppleseed = Contact(id: 0, firstName: 'John', lastName: 'Appleseed');
final kateBell = Contact(id: 1, firstName: 'Kate', lastName: 'Bell');
final annaHaro = Contact(id: 2, firstName: 'Anna', lastName: 'Haro');
final danielHiggins = Contact(
  id: 3,
  firstName: 'Daniel',
  lastName: 'Higgins',
  suffix: 'Jr.',
);
final davidTaylor = Contact(id: 4, firstName: 'David', lastName: 'Taylor');
final hankZakroff = Contact(
  id: 5,
  firstName: 'Hank',
  middleName: 'M.',
  lastName: 'Zakroff',
);

final alexAnderson = Contact(id: 6, firstName: 'Alex', lastName: 'Anderson');
final benBrown = Contact(id: 7, firstName: 'Ben', lastName: 'Brown');
final carolCarter = Contact(id: 8, firstName: 'Carol', lastName: 'Carter');
final dianaDevito = Contact(id: 9, firstName: 'Diana', lastName: 'Devito');
final emilyEvans = Contact(id: 10, firstName: 'Emily', lastName: 'Evans');
final frankFisher = Contact(id: 11, firstName: 'Frank', lastName: 'Fisher');
final graceGreen = Contact(id: 12, firstName: 'Grace', lastName: 'Green');
final henryHall = Contact(id: 13, firstName: 'Henry', lastName: 'Hall');
final isaacIngram = Contact(id: 14, firstName: 'Isaac', lastName: 'Ingram');
final juliaJackson = Contact(id: 15, firstName: 'Julia', lastName: 'Jackson');
final kevinKelly = Contact(id: 16, firstName: 'Kevin', lastName: 'Kelly');
final lindaLewis = Contact(id: 17, firstName: 'Linda', lastName: 'Lewis');
final michaelMiller = Contact(id: 18, firstName: 'Michael', lastName: 'Miller');
final nancyNewman = Contact(id: 19, firstName: 'Nancy', lastName: 'Newman');
final oliverOwens = Contact(id: 20, firstName: 'Oliver', lastName: 'Owens');
final penelopeParker = Contact(
  id: 21,
  firstName: 'Penelope',
  lastName: 'Parker',
);
final quentinQuinn = Contact(id: 22, firstName: 'Quentin', lastName: 'Quinn');
final rachelReed = Contact(id: 23, firstName: 'Rachel', lastName: 'Reed');
final samuelSmith = Contact(id: 24, firstName: 'Samuel', lastName: 'Smith');
final tessaTurner = Contact(id: 25, firstName: 'Tessa', lastName: 'Turner');
final umbertoUpton = Contact(id: 26, firstName: 'Umberto', lastName: 'Upton');
final victoriaVance = Contact(id: 27, firstName: 'Victoria', lastName: 'Vance');
final williamWilson = Contact(id: 28, firstName: 'William', lastName: 'Wilson');
final xavierXu = Contact(id: 29, firstName: 'Xavier', lastName: 'Xu');
final yasmineYoung = Contact(id: 30, firstName: 'Yasmine', lastName: 'Young');
final zacharyZimmerman = Contact(
  id: 31,
  firstName: 'Zachary',
  lastName: 'Zimmerman',
);
final elizabethMJohnson = Contact(
  id: 32,
  firstName: 'Elizabeth',
  middleName: 'M.',
  lastName: 'Johnson',
);
final robertLWilliamsSr = Contact(
  id: 33,
  firstName: 'Robert',
  middleName: 'L.',
  lastName: 'Williams',
  suffix: 'Sr.',
);
final margaretAnneDavis = Contact(
  id: 34,
  firstName: 'Margaret',
  middleName: 'Anne',
  lastName: 'Davis',
);
final williamJamesBrownIII = Contact(
  id: 35,
  firstName: 'William',
  middleName: 'James',
  lastName: 'Brown',
  suffix: 'III',
);
final maryElizabethClark = Contact(
  id: 36,
  firstName: 'Mary',
  middleName: 'Elizabeth',
  lastName: 'Clark',
);
final drSarahWatson = Contact(
  id: 37,
  firstName: 'Dr. Sarah',
  lastName: 'Watson',
);
final jamesRSmithEsq = Contact(
  id: 38,
  firstName: 'James',
  middleName: 'R.',
  lastName: 'Smith',
  suffix: 'Esq.',
);
final mariaCruz = Contact(id: 39, firstName: 'Maria', lastName: 'Cruz');
final pierreMartin = Contact(id: 40, firstName: 'Pierre', lastName: 'Martin');
final yukiTanaka = Contact(id: 41, firstName: 'Yuki', lastName: 'Tanaka');
final hansSchmidt = Contact(id: 42, firstName: 'Hans', lastName: 'Schmidt');
final priyaPatel = Contact(id: 43, firstName: 'Priya', lastName: 'Patel');
final carlosGarcia = Contact(id: 44, firstName: 'Carlos', lastName: 'Garcia');
final ninaVolkova = Contact(id: 45, firstName: 'Nina', lastName: 'Volkova');
final jenniferAdams = Contact(id: 46, firstName: 'Jennifer', lastName: 'Adams');
final michaelBaker = Contact(id: 47, firstName: 'Michael', lastName: 'Baker');
final sarahCooper = Contact(id: 48, firstName: 'Sarah', lastName: 'Cooper');
final christopherDaniel = Contact(
  id: 49,
  firstName: 'Christopher',
  lastName: 'Daniel',
);
final jessicaEdwards = Contact(
  id: 50,
  firstName: 'Jessica',
  lastName: 'Edwards',
);

final Set<Contact> allContacts = <Contact>{
  johnAppleseed,
  kateBell,
  annaHaro,
  danielHiggins,
  davidTaylor,
  hankZakroff,
  alexAnderson,
  benBrown,
  carolCarter,
  dianaDevito,
  emilyEvans,
  frankFisher,
  graceGreen,
  henryHall,
  isaacIngram,
  juliaJackson,
  kevinKelly,
  lindaLewis,
  michaelMiller,
  nancyNewman,
  oliverOwens,
  penelopeParker,
  quentinQuinn,
  rachelReed,
  samuelSmith,
  tessaTurner,
  umbertoUpton,
  victoriaVance,
  williamWilson,
  xavierXu,
  yasmineYoung,
  zacharyZimmerman,
  elizabethMJohnson,
  robertLWilliamsSr,
  margaretAnneDavis,
  williamJamesBrownIII,
  maryElizabethClark,
  drSarahWatson,
  jamesRSmithEsq,
  mariaCruz,
  pierreMartin,
  yukiTanaka,
  hansSchmidt,
  priyaPatel,
  carlosGarcia,
  ninaVolkova,
  jenniferAdams,
  michaelBaker,
  sarahCooper,
  christopherDaniel,
  jessicaEdwards,
};

```

這份範例資料包含了有中間名和字尾、以及沒有中間名和字尾的聯絡人。這樣可以讓你在建立 UI 時，擁有多樣化的資料可供操作。

### `ContactGroup` 資料

現在，請建立聯絡人群組，將你的聯絡人組織成清單。  
請建立一個新檔案 `lib/data/contact_group.dart`，並新增 `ContactGroup` 類別：

```dart
// lib/data/contact_group.dart
import 'dart:collection';
import 'package:flutter/cupertino.dart';
import 'contact.dart';

class ContactGroup {
  factory ContactGroup({
    required int id,
    required String label,
    bool permanent = false,
    String? title,
    List<Contact>? contacts,
  }) {
    final contactsCopy = contacts ?? <Contact>[];
    _sortContacts(contactsCopy);
    return ContactGroup._internal(
      id: id,
      label: label,
      permanent: permanent,
      title: title,
      contacts: contactsCopy,
    );
  }

  ContactGroup._internal({
    required this.id,
    required this.label,
    this.permanent = false,
    String? title,
    List<Contact>? contacts,
  })  : title = title ?? label,
        _contacts = contacts ?? const <Contact>[];

  final int id;
  final bool permanent;
  final String label;
  final String title;
  final List<Contact> _contacts;

  List<Contact> get contacts => _contacts;

  AlphabetizedContactMap get alphabetizedContacts {
    final AlphabetizedContactMap contactsMap = AlphabetizedContactMap();
    for (final Contact contact in _contacts) {
      final String lastInitial = contact.lastName[0].toUpperCase();
      if (contactsMap.containsKey(lastInitial)) {
        contactsMap[lastInitial]!.add(contact);
      } else {
        contactsMap[lastInitial] = [contact];
      }
    }
    return contactsMap;
  }
}
```

`ContactGroup` 代表一組聯絡人集合，例如「所有聯絡人」或「我的最愛」。

請將以下輔助程式碼與範例資料加入同一個檔案中：

```dart
// lib/data/contact_group.dart

// ... ContactGroup class from above

typedef AlphabetizedContactMap = SplayTreeMap<String, List<Contact>>;

/// Sorts a list of contacts alphabetically by last name, then first name, then middle name.
/// If names are identical, sorts by contact ID to ensure consistent ordering.
void _sortContacts(List<Contact> contacts) {
  contacts.sort((Contact a, Contact b) {
    final int checkLastName = a.lastName.compareTo(b.lastName);
    if (checkLastName != 0) {
      return checkLastName;
    }
    final int checkFirstName = a.firstName.compareTo(b.firstName);
    if (checkFirstName != 0) {
      return checkFirstName;
    }
    if (a.middleName != null && b.middleName != null) {
      final int checkMiddleName = a.middleName!.compareTo(b.middleName!);
      if (checkMiddleName != 0) {
        return checkMiddleName;
      }
    } else if (a.middleName != null || b.middleName != null) {
      return a.middleName != null ? 1 : -1;
    }
    // If both contacts have the exact same name, order by first created.
    return a.id.compareTo(b.id);
  });
}

final allPhone = ContactGroup(
  id: 0,
  permanent: true,
  label: 'All iPhone',
  title: 'iPhone',
  contacts: allContacts.toList(),
);

final friends = ContactGroup(
  id: 1,
  label: 'Friends',
  contacts: [allContacts.elementAt(3)],
);

final work = ContactGroup(id: 2, label: 'Work');

List<ContactGroup> generateSeedData() {
  return [allPhone, friends, work];
}
```

這段程式碼建立了三個範例群組，以及一個用於產生應用程式初始資料的函式。

最後，新增一個用來管理狀態變化的類別：

```dart
// lib/data/contact_group.dart

// ...

class ContactGroupsModel {
  ContactGroupsModel() : _listsNotifier = ValueNotifier(generateSeedData());

  final ValueNotifier<List<ContactGroup>> _listsNotifier;

  ValueNotifier<List<ContactGroup>> get listsNotifier => _listsNotifier;

  List<ContactGroup> get lists => _listsNotifier.value;

  ContactGroup findContactList(int id) {
    return lists[id];
  }

  void dispose() {
    _listsNotifier.dispose();
  }
}
```

如果你尚未熟悉`ValueNotifier`，建議你在繼續之前先[完成前一個教學][complete the previous tutorial]，該教學涵蓋了狀態管理。

## 將資料連接到你的應用程式

請更新你的`main.dart`，以納入全域狀態並匯入新的資料檔案：

```dart
// lib/main.dart
import 'package:flutter/cupertino.dart';
import 'package:rolodex/data/contact_group.dart';

final contactGroupsModel = ContactGroupsModel();

void main() {
  runApp(const RolodexApp());
}

class RolodexApp extends StatelessWidget {
  const RolodexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Rolodex',
      theme: const CupertinoThemeData(
        barBackgroundColor: CupertinoDynamicColor.withBrightness(
          color: Color(0xFFF9F9F9),
          darkColor: Color(0xFF1D1D1D),
        ),
      ),
      home: CupertinoPageScaffold(child: Center(child: Text('Hello Rolodex!'))),
    );
  }
}
```

現在所有多餘的程式碼都已經清除，在下一課中，你將正式開始建立這個應用程式。

[Flutter CLI tool]: /reference/flutter-cli
[complete the previous tutorial]: /tutorial/set-up-state-app
[`cupertino_icons` package]: https://pub.dev/packages/cupertino_icons