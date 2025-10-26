---
title: 簡單動畫
description: 學習在 Flutter 中實作動畫的最簡單方式。
permalink: /tutorial/animations/
---

Flutter 提供了豐富的動畫 (Animation) API，而最簡單開始使用這些 API 的方式，就是透過**隱式動畫 (implicit animations)**。所謂「隱式動畫」，是指一組元件 (Widgets)，當其屬性發生變化時，會自動對變化進行動畫處理，而無需你自行管理動畫行為。

在本課程中，你將學習到其中一個最常見且多功能的隱式動畫元件 (Widgets)：[`AnimatedContainer`][`AnimatedContainer`]。只需多寫兩行程式碼，每個 `Tile` 的背景顏色就會在約半秒內以動畫方式變換為新顏色。

## 將 `Container` 轉換為 `AnimatedContainer`

目前，`Tile.build` 方法會回傳一個 `Container` 來顯示一個字母。當 `hitType` 發生變化時，例如從 `HitType.none` 變為 `HitType.hit`，該方塊的背景顏色會立即變化（在此範例中，從白色變為綠色）。

以下是目前 `Tile` 元件 (Widget) 的程式碼，供你參考：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (type) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.char.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

為了讓顏色變化能夠平滑地產生動畫，請將`Container`元件（Widget）替換為`AnimatedContainer`。

`AnimatedContainer`類似於`Container`，但它會在指定的`duration`內，自動對其屬性的變化產生動畫效果。當像是`color`、`height`、`width`、`decoration`或`alignment`這些屬性發生變化時，`AnimatedContainer`會在舊值與新值之間進行插值，產生平滑的過渡效果。

請依下列方式修改你的`Tile`元件（Widget）：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.char.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

**`duration`** 是一個必填屬性，用來指定動畫（Animation）所需的時間長度。在這個範例中，`Duration(milliseconds: 500)` 表示顏色的漸變將會持續半秒鐘。你也可以指定秒、分鐘，或其他多種時間單位。

現在，當 `hitType` 發生變化並且 `Tile` 元件（Widget）重新建構（因為在 `GamePage` 中呼叫了 `setState`），這個方塊的顏色會在指定的時間內，從舊顏色平滑地過渡到新顏色。

## 調整曲線（curve）

你可以透過傳遞一個 [`Curve`][`Curve`]，為隱式動畫加入一些自訂效果。不同的曲線（curve）會在動畫的不同階段改變動畫的速度。

{%- comment %} TODO(ewindmill) diagram {%- endcomment %}

若要變更這個動畫的 `Curve`，請將程式碼更新如下：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;


  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
	    curve: Curves.decelerate, // NEW
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          LetterType.hit => Colors.green,
          LetterType.partial => Colors.yellow,
          LetterType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.char.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

Flutter SDK（Flutter 軟體開發套件）中定義了許多不同的曲線，因此你可以嘗試將不同類型傳遞給 `AnimatedContainer.curve` 屬性來體驗各種效果。

像 `AnimatedContainer` 這樣的隱式動畫（implicit animations）非常強大，因為你只需要告訴元件（Widget）新的狀態應該是什麼，其餘動畫「如何執行」的細節都會自動處理。對於複雜或自訂的動畫（Animation），你也可以自行撰寫自訂的動畫元件（animated widgets）。如果你感到好奇，可以參考 [animations tutorial](https://docs.flutter.dev/ui/animations/tutorial)。

[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[`Curve`]: {{site.curve}}/flutter/animation/Curves-class.html
[animations tutorial]: /ui/animations/tutorial.
