---
title: 實作滑動以刪除
description: 如何實作滑動以刪除或移除項目。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/gestures/dismissible"?>

「滑動以刪除」（swipe to dismiss）是一個在許多行動應用程式中常見的設計模式。
舉例來說，當你開發一個電子郵件應用程式時，
你可能會希望讓使用者能夠透過滑動的方式，
將郵件訊息從清單中刪除。

Flutter 透過提供 [`Dismissible`][`Dismissible`] 元件（Widget），讓這項任務變得非常簡單。
請依照下列步驟學習如何實作滑動以刪除：

  1. 建立一個項目清單。
  2. 將每個項目包裹在 `Dismissible` 元件（Widget）中。
  3. 提供「滑動後顯示」的指示器。

## 1. 建立項目清單

首先，建立一個項目清單。若需詳細說明如何建立清單，
請參考 [Working with long lists][Working with long lists] 教學。

### 建立資料來源

在這個範例中，
你需要 20 個範例項目來進行操作。
為了簡化流程，直接產生一個字串清單即可。

<?code-excerpt "lib/main.dart (Items)"?>
```dart
final items = List<String>.generate(20, (i) => 'Item ${i + 1}');
```

### 將資料來源轉換為清單

將每個項目顯示在螢幕上。使用者目前還無法將這些項目滑動移除。

<?code-excerpt "lib/step1.dart (ListView)" replace="/^body: //g;/^\),$/)/g"?>
```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(title: Text(items[index]));
  },
)
```

## 2. 將每個項目包裹在 Dismissible 元件中

在這個步驟中，
讓使用者能夠透過 [`Dismissible`][`Dismissible`] 元件，將清單中的項目滑動移除。

當使用者滑動移除該項目後，
請從清單中移除該項目，並顯示一個 snackbar。
在實際的應用程式中，你可能需要執行更複雜的邏輯，
例如從網路服務或資料庫中移除該項目。

請更新 `itemBuilder()` 函式，使其回傳一個 `Dismissible` 元件：

<?code-excerpt "lib/step2.dart (Dismissible)"?>
```dart
itemBuilder: (context, index) {
  final item = items[index];
  return Dismissible(
    // Each Dismissible must contain a Key. Keys allow Flutter to
    // uniquely identify widgets.
    key: Key(item),
    // Provide a function that tells the app
    // what to do after an item has been swiped away.
    onDismissed: (direction) {
      // Remove the item from the data source.
      setState(() {
        items.removeAt(index);
      });

      // Then show a snackbar.
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('$item dismissed')));
    },
    child: ListTile(title: Text(item)),
  );
},
```

## 3. 提供「殘留」指示器

目前為止，
應用程式允許使用者將項目滑動移出清單，但並沒有
在滑動時給予任何視覺上的提示。
為了讓使用者知道項目已被移除，
可以在他們將項目滑出螢幕時，顯示一個「殘留」指示器。
在這個範例中，
這個指示器是一個紅色背景。

要加入這個指示器，
請在`Dismissible`中提供`background`參數。


```dart diff
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('$item dismissed')));
  },
+ // Show a red background as the item is swiped away.
+ background: Container(color: Colors.red),
  child: ListTile(
    title: Text(item),
  ),
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Swipe to Dismiss hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

// MyApp is a StatefulWidget. This allows updating the state of the
// widget when an item is removed.
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  MyAppState createState() {
    return MyAppState();
  }
}

class MyAppState extends State<MyApp> {
  final items = List<String>.generate(20, (i) => 'Item ${i + 1}');

  @override
  Widget build(BuildContext context) {
    const title = 'Dismissing Items';

    return MaterialApp(
      title: title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) {
            final item = items[index];
            return Dismissible(
              // Each Dismissible must contain a Key. Keys allow Flutter to
              // uniquely identify widgets.
              key: Key(item),
              // Provide a function that tells the app
              // what to do after an item has been swiped away.
              onDismissed: (direction) {
                // Remove the item from the data source.
                setState(() {
                  items.removeAt(index);
                });

                // Then show a snackbar.
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text('$item dismissed')));
              },
              // Show a red background as the item is swiped away.
              background: Container(color: Colors.red),
              child: ListTile(title: Text(item)),
            );
          },
        ),
      ),
    );
  }
}
```

<img src="/assets/images/docs/cookbook/dismissible.webp" alt="Dismissible Demo" class="site-mobile-screenshot" />
