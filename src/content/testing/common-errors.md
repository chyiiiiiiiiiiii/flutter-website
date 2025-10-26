---
title: 常見 Flutter 錯誤
description: 如何辨識並解決常見的 Flutter 框架錯誤。
---

<?code-excerpt path-base="testing/common_errors"?>

## 簡介

本頁說明了多個經常遇到的 Flutter 框架錯誤（包含版面配置錯誤），並提供解決建議。
這是一份持續更新的文件，未來會加入更多錯誤內容，歡迎您的貢獻。
如果您有建議，歡迎[提出 issue][open an issue] 或[提交 pull request][submit a pull request]，
讓這個頁面對您及 Flutter 社群更有幫助。

[open an issue]: {{site.repo.this}}/issues/new/choose
[submit a pull request]: {{site.repo.this}}/pulls

## 執行應用程式時出現純紅色或灰色螢幕

這通常被稱為「死亡紅（或灰）螢幕」（red/grey screen of death），
這是 Flutter 用來告知您發生錯誤的一種方式。

當應用程式在 debug 或 profile 模式下執行時，會出現紅色螢幕；
而在 release 模式下執行時，則可能出現灰色螢幕。

一般來說，這些錯誤發生的原因是有未捕捉的例外（您可能需要額外的 try-catch 區塊），
或者是發生了繪製（Rendering）錯誤，例如溢位（overflow）錯誤。

以下文章提供了針對這類錯誤除錯的實用見解：

* [Flutter errors demystified][Flutter errors demystified]，作者 Abishek
* [Understanding and addressing the grey screen in Flutter][Understanding and addressing the grey screen in Flutter]，作者 Christopher Nwosu-Madueke
* [Flutter stuck on white screen][Flutter stuck on white screen]，作者 Kesar Bhimani

[Flutter errors demystified]: {{site.medium}}/@hpatilabhi10/flutter-errors-demystified-red-screen-errors-vs-debug-console-errors-acb3b8ed2625
[Flutter stuck on white screen]: https://www.dhiwise.com/post/flutter-stuck-on-white-screen-understanding-and-fixing
[Understanding and addressing the grey screen in Flutter]: {{site.medium}}/@LordChris/understanding-and-addressing-the-grey-screen-in-flutter-5e72c31f408f

## 'A RenderFlex overflowed…'

RenderFlex 溢位（overflow）是 Flutter 框架中最常見的錯誤之一，
您很可能已經遇過。

**這個錯誤長什麼樣子？**

發生時，應用程式 UI 會出現黃黑相間的條紋，標示出溢位的區域。
此外，debug 主控台也會顯示錯誤訊息：

```plaintext
The following assertion was thrown during layout:
A RenderFlex overflowed by 1146 pixels on the right.

The relevant error-causing widget was

    Row      lib/errors/renderflex_overflow_column.dart:23

The overflowing RenderFlex has an orientation of Axis.horizontal.
The edge of the RenderFlex that is overflowing has been marked in the rendering 
with a yellow and black striped pattern. This is usually caused by the contents 
being too big for the RenderFlex.
(Additional lines of this message omitted)
```

**你可能會在什麼情況下遇到這個錯誤？**

這個錯誤通常發生在`Column`或`Row`中，其子元件（Widget）沒有受到尺寸上的限制。
舉例來說，以下的程式碼片段就展示了一個常見的情境：

<?code-excerpt "lib/renderflex_overflow.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      const Icon(Icons.message),
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Title', style: Theme.of(context).textTheme.headlineMedium),
          const Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed '
            'do eiusmod tempor incididunt ut labore et dolore magna '
            'aliqua. Ut enim ad minim veniam, quis nostrud '
            'exercitation ullamco laboris nisi ut aliquip ex ea '
            'commodo consequat.',
          ),
        ],
      ),
    ],
  );
}
```

在上述範例中，
`Column` 嘗試比其父元件（Widget）`Row`
所能分配給它的空間還要寬，導致溢位（overflow）錯誤。
為什麼 `Column` 會這麼做呢？
要理解這個版面配置（layout）行為，你需要了解
Flutter 框架是如何進行版面配置的：

「_為了進行版面配置，Flutter 會以深度優先遍歷的方式走訪 render tree，
並**自父元件向下傳遞尺寸限制（size constraints）**……子元件會
**在父元件設定的限制內，回傳一個尺寸**給其父元件。_」– [Flutter architectural overview][Flutter architectural overview]

在這個案例中，`Row` 元件（Widget）並沒有對其子元件
進行尺寸限制，`Column` 元件也沒有。
由於缺乏來自父元件的限制，第二個
`Text` 元件會嘗試變得足夠寬，以容納它需要顯示的所有字元。
`Text` 元件自訂的寬度接著會被 `Column` 採用，
而這個寬度又與其父元件 `Row`
所能提供的最大水平空間產生衝突。

[Flutter architectural overview]: /resources/architectural-overview#layout-and-rendering

**該如何修正？**

你需要確保 `Column` 不會嘗試變得比它所能擁有的空間還寬。
為了達到這個目的，你需要對它的寬度加以限制。
其中一種做法是將 `Column` 包裹在 `Expanded` 元件中：

<?code-excerpt "lib/renderflex_overflow.dart (solution)"?>
```dart
return const Row(
  children: [
    Icon(Icons.message),
    Expanded(
      child: Column(
        // code omitted
      ),
    ),
  ],
);
```

另一種方式是將`Column`包裹在`Flexible`元件（Widget）中，並指定`flex`係數（factor）。事實上，`Expanded`元件等同於`Flexible`元件，且`flex`係數為 1.0，正如[其原始碼][its source code]所示。若想進一步了解如何在 Flutter 版面配置中使用`Flex`元件，請參考這支 90 秒的 Widget of the Week 影片：[this 90-second Widget of the Week video][flexible-video]，主題為`Flexible`元件。

**進一步資訊：**

以下連結資源提供了更多關於此錯誤的資訊。

* [Flexible (Flutter Widget of the Week)][flexible-video]
* [How to debug layout issues with the Flutter Inspector][medium-article]
* [Understanding constraints][Understanding constraints]

[its source code]: {{site.repo.flutter}}/blob/c8e42b47f5ea8b5ff7bf2f2b0a2a8e765f1aa51d/packages/flutter/lib/src/widgets/basic.dart#L5166-L5174
[flexible-video]: {{site.yt.watch}}?v=CI7x0mAZiY0
[medium-article]: {{site.flutter-medium}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db#738b
[Understanding constraints]: /ui/layout/constraints

## 'RenderBox was not laid out'

雖然這個錯誤相當常見，但它通常是渲染流程中較早發生的主要錯誤所導致的副作用。

**這個錯誤訊息長什麼樣子？**

此錯誤所顯示的訊息如下所示：

```plaintext
RenderBox was not laid out: 
RenderViewport#5a477 NEEDS-LAYOUT NEEDS-PAINT NEEDS-COMPOSITING-BITS-UPDATE
```

**你可能會在什麼情況下遇到這個錯誤？**

通常，這個問題與違反 box constraints（盒子約束）有關，
需要透過提供更多資訊給 Flutter，
讓其知道你希望如何約束相關的元件（Widgets）來解決。
你可以在 [Understanding constraints][Understanding constraints] 頁面深入了解
Flutter 中 constraints（約束）的運作方式。

`RenderBox was not laid out` 錯誤通常是由以下兩種其他錯誤之一所引起：

* 'Vertical viewport was given unbounded height'
* 'An InputDecorator...cannot have an unbounded width'

<a id="unbounded"></a>

## 'Vertical viewport was given unbounded height'

這是你在建立 Flutter 應用程式 UI 時
可能會遇到的另一個常見版面配置錯誤。

**這個錯誤訊息長什麼樣子？**

錯誤訊息顯示如下：

```plaintext
The following assertion was thrown during performResize():
Vertical viewport was given unbounded height.

Viewports expand in the scrolling direction to fill their container. 
In this case, a vertical viewport was given an unlimited amount of 
vertical space in which to expand. This situation typically happens when a 
scrollable widget is nested inside another scrollable widget.
(Additional lines of this message omitted)
```

**你可能會在什麼情況下遇到這個錯誤？**

這個錯誤通常發生在將 `ListView`
（或其他類型的滾動元件 (Scrolling Widgets)，例如 `GridView`）
放在 `Column` 內時。`ListView` 會佔據
所有可用的垂直空間，
除非其父元件對其加以限制。
然而，`Column` 預設並不會對其子元件的高度施加任何限制。
這兩種行為結合起來，導致無法確定
`ListView` 的尺寸。

<?code-excerpt "lib/unbounded_height.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        ListView(
          children: const <Widget>[
            ListTile(leading: Icon(Icons.map), title: Text('Map')),
            ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
          ],
        ),
      ],
    ),
  );
}
```

**如何修正？**

要修正此錯誤，請指定 `ListView` 的高度。
若要讓它填滿 `Column` 中剩餘的空間，
請使用 `Expanded` 元件（Widget）將其包裹（如下範例所示）。
否則，請使用 `SizedBox` 元件（Widget）來指定絕對高度，
或使用 `Flexible` 元件（Widget）來指定相對高度。

<?code-excerpt "lib/unbounded_height.dart (solution)"?>
```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        Expanded(
          child: ListView(
            children: const <Widget>[
              ListTile(leading: Icon(Icons.map), title: Text('Map')),
              ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
            ],
          ),
        ),
      ],
    ),
  );
}
```

**進一步資訊：**

以下連結資源提供了關於此錯誤的更多資訊。

* [如何使用 Flutter Inspector 偵錯版面配置問題][medium-article]
* [理解約束（constraints）][Understanding constraints]

## 「An InputDecorator...cannot have an unbounded width」

此錯誤訊息表示它同樣與方塊約束（box constraints）有關，而理解這些約束對於避免許多常見的 Flutter 框架錯誤至關重要。

**這個錯誤長什麼樣子？**

該錯誤顯示的訊息如下所示：

```plaintext
The following assertion was thrown during performLayout():
An InputDecorator, which is typically created by a TextField, cannot have an 
unbounded width.
This happens when the parent widget does not provide a finite width constraint. 
For example, if the InputDecorator is contained by a `Row`, then its width must 
be constrained. An `Expanded` widget or a SizedBox can be used to constrain the 
width of the InputDecorator or the TextField that contains it.
(Additional lines of this message omitted)
```

**你可能會在什麼情況下遇到此錯誤？**

例如，當`Row`中包含`TextFormField`或`TextField`，但後者沒有寬度限制時，就會發生此錯誤。

<?code-excerpt "lib/unbounded_width.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: const Row(children: [TextField()]),
    ),
  );
}
```

**如何修正？**

如錯誤訊息所建議，
請透過使用 `Expanded` 或 `SizedBox` 元件（Widget）來限制該文字欄位（text field），
即可修正此錯誤。
以下範例展示了如何使用 `Expanded` 元件：

<?code-excerpt "lib/unbounded_width.dart (solution)"?>
```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: Row(children: [Expanded(child: TextFormField())]),
    ),
  );
}
```

## 「ParentData widget 使用錯誤」

此錯誤是因為缺少預期的父層元件（Widget）所導致。

**這個錯誤訊息長什麼樣子？**

錯誤所顯示的訊息如下所示：

```plaintext
The following assertion was thrown while looking for parent data:
Incorrect use of ParentDataWidget.
(Some lines of this message omitted)
Usually, this indicates that at least one of the offending ParentDataWidgets 
listed above is not placed directly inside a compatible ancestor widget.
```

**你可能會如何遇到這個錯誤？**

雖然 Flutter 的元件（Widgets）在 UI 組合上通常非常靈活，
但其中有一小部分元件會預期有特定的父元件。
當你的元件樹無法滿足這個預期時，
你很可能就會遇到這個錯誤。

以下是 Flutter 框架中，預期有特定父元件的元件（不完整清單）。
如果你想擴充這份清單，歡迎提交 PR（可點擊頁面右上角的文件圖示）。

| 元件（Widget）                        |  預期的父元件（Expected parent widget(s)） |
|:--------------------------------------|---------------------------:|
| `Flexible`                            | `Row`、`Column` 或 `Flex` |
| `Expanded`（`Flexible` 的特殊化）      | `Row`、`Column` 或 `Flex` |
| `Positioned`                          |                    `Stack` |
| `TableCell`                           |                    `Table` |

**如何修正？**

當你知道缺少哪個父元件時，修正方法應該就很明顯了。

## 'setState called during build'

在你的 Flutter 程式碼中，`build` 方法並不是
直接或間接呼叫 `setState` 的好地方。

**這個錯誤會長什麼樣子？**

當發生此錯誤時，
主控台會顯示以下訊息：

```plaintext
The following assertion was thrown building DialogPage(dirty, dependencies: 
[_InheritedTheme, _LocalizationsScope-[GlobalKey#59a8e]], 
state: _DialogPageState#f121e):
setState() or markNeedsBuild() called during build.

This Overlay widget cannot be marked as needing to build because the framework 
is already in the process of building widgets.
(Additional lines of this message omitted)
```

**你可能會在什麼情況下遇到這個錯誤？**

一般來說，當在 `build` 方法內呼叫 `setState` 方法時，就會發生這個錯誤。

這個錯誤常見的情境之一，是嘗試在 `build` 方法中觸發 `Dialog`。這麼做通常是希望能立即向使用者顯示資訊，
但 `setState` 絕對不應該從 `build` 方法中呼叫。

以下程式碼片段是此錯誤常見的肇因：

<?code-excerpt "lib/set_state_build.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  // Don't do this.
  showDialog(
    context: context,
    builder: (context) {
      return const AlertDialog(title: Text('Alert Dialog'));
    },
  );

  return const Center(
    child: Column(children: <Widget>[Text('Show Material Dialog')]),
  );
}
```

這段程式碼並未直接呼叫 `setState`，
但它會被 `showDialog` 呼叫。
`build` 方法並不是呼叫 `showDialog` 的正確位置，因為 `build` 可能會在每一個畫面更新（frame）時由框架（framework）呼叫，例如在動畫（Animation）期間。

**該如何修正？**

避免此錯誤的一種方式是使用 `Navigator` API，
將對話框（dialog）作為路由（Route）觸發。在以下範例中，
有兩個頁面。第二個頁面在進入時會顯示一個
對話框（dialog）。
當使用者在第一個頁面點擊按鈕請求進入第二個頁面時，
`Navigator` 會推入兩個路由（Route）——
一個是第二個頁面，另一個則是對話框（dialog）。

<?code-excerpt "lib/set_state_build.dart (solution)"?>
```dart
class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Launch screen'),
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
            // Immediately show a dialog upon loading the second screen.
            Navigator.push(
              context,
              PageRouteBuilder(
                barrierDismissible: true,
                opaque: false,
                pageBuilder: (_, anim1, anim2) => const MyDialog(),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

## `The ScrollController is attached to multiple scroll views`

當多個滾動元件 (Scrolling Widgets)（例如 `ListView`）同時出現在螢幕上時，可能會發生此錯誤。在 Web 或桌面應用程式上，比在行動應用程式上更容易遇到這個錯誤，因為在行動裝置上出現這種情境的機率較低。

如需更多資訊及修正方法，請參考以下關於 [`PrimaryScrollController`][controller-video] 的影片：

{% ytEmbed '33_0ABjFJUU', 'PrimaryScrollController | Decoding Flutter' %}

[controller-video]: {{site.api}}/flutter/widgets/PrimaryScrollController-class.html

## 參考資料

若想進一步瞭解如何除錯錯誤，特別是在 Flutter 中的版面配置錯誤，請參考以下資源：

* [如何使用 Flutter Inspector 除錯版面配置問題][medium-article]
* [理解 constraints（約束）][Understanding constraints]
* [Flutter 架構總覽][Flutter architectural overview]

[Flutter architectural overview]: /resources/architectural-overview#layout-and-rendering
