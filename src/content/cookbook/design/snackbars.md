---
title: 顯示 snackbar
description: 如何實作 snackbar 來顯示訊息。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/design/snackbars/"?>

在某些操作發生時，短暫地通知使用者是很有幫助的。例如，當使用者在清單中滑動刪除一則訊息時，你可能會想要告知他們該訊息已被刪除。你甚至可能想要提供一個讓他們復原該操作的選項。

在 Material Design 中，這正是 [`SnackBar`][`SnackBar`] 的用途。本教學將透過以下步驟來實作 snackbar：

  1. 建立 `Scaffold`。
  2. 顯示 `SnackBar`。
  3. 提供可選的操作。

## 1. 建立 `Scaffold`

當你開發遵循 Material Design 指南的應用程式時，應確保應用程式具有一致的視覺結構。在這個範例中，將 `SnackBar` 顯示在螢幕底部，且不會與其他重要元件（Widgets）重疊，例如 `FloatingActionButton`。

[`Scaffold`][`Scaffold`] 元件，來自 [material library][material library]，可建立這種視覺結構，並確保重要元件不會互相重疊。

<?code-excerpt "lib/partial.dart (Scaffold)"?>
```dart
return MaterialApp(
  title: 'SnackBar Demo',
  home: Scaffold(
    appBar: AppBar(title: const Text('SnackBar Demo')),
    body: const SnackBarPage(),
  ),
);
```

## 2. 顯示 `SnackBar`

在有了 `Scaffold` 之後，顯示 `SnackBar`。
首先，建立一個 `SnackBar`，然後使用 `ScaffoldMessenger` 來顯示它。

<?code-excerpt "lib/partial.dart (DisplaySnackBar)"?>
```dart
const snackBar = SnackBar(content: Text('Yay! A SnackBar!'));

// Find the ScaffoldMessenger in the widget tree
// and use it to show a SnackBar.
ScaffoldMessenger.of(context).showSnackBar(snackBar);
```

:::note
想了解更多內容，請觀看這段關於`ScaffoldMessenger`元件（Widget）的短片 Widget of the Week：

{% ytEmbed 'lytQi-slT5Y', 'ScaffoldMessenger | Flutter widget of the week' %}
:::

## 3. 提供可選的操作

當 SnackBar 顯示時，你可能會希望提供一個操作給使用者。
例如，若使用者不小心刪除了訊息，他們可以透過 SnackBar 中的可選操作來恢復該訊息。

以下是一個為`SnackBar`元件（Widget）提供額外`action`的範例：

<?code-excerpt "lib/main.dart (SnackBarAction)"?>
```dart
final snackBar = SnackBar(
  content: const Text('Yay! A SnackBar!'),
  action: SnackBarAction(
    label: 'Undo',
    onPressed: () {
      // Some code to undo the change.
    },
  ),
);
```

## 互動範例

:::note
在這個範例中，當使用者點擊按鈕時，SnackBar 會顯示出來。
如需更多關於處理使用者輸入（Input）的資訊，
請參閱 cookbook 的 [Gestures][Gestures] 章節。
:::

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter snackbar hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const SnackBarDemo());

class SnackBarDemo extends StatelessWidget {
  const SnackBarDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SnackBar Demo',
      home: Scaffold(
        appBar: AppBar(title: const Text('SnackBar Demo')),
        body: const SnackBarPage(),
      ),
    );
  }
}

class SnackBarPage extends StatelessWidget {
  const SnackBarPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () {
          final snackBar = SnackBar(
            content: const Text('Yay! A SnackBar!'),
            action: SnackBarAction(
              label: 'Undo',
              onPressed: () {
                // Some code to undo the change.
              },
            ),
          );

          // Find the ScaffoldMessenger in the widget tree
          // and use it to show a SnackBar.
          ScaffoldMessenger.of(context).showSnackBar(snackBar);
        },
        child: const Text('Show SnackBar'),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/snackbar.webp" alt="SnackBar 範例" class="site-mobile-screenshot" />
</noscript>

[Gestures]: /cookbook/gestures
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html
[material library]: {{site.api}}/flutter/material/material-library.html
