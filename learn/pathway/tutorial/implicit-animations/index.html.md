# 簡單動畫

> 學習在 Flutter 中實作動畫的最簡單方式。



Flutter 提供了豐富的動畫 API，其中最簡單的入門方式是使用**隱含動畫 (implicit animations)**。
「隱含動畫」指的是一組元件 (Widget)，能夠在屬性發生變化時自動產生動畫效果，無需你手動管理任何中間行為。

<SummaryCard>
title: 你將完成的事
items:
  - title: 探索 Flutter 中的隱含動畫
    icon: auto_awesome
  - title: 使用 AnimatedContainer 為屬性變化添加動畫
    icon: animation
  - title: 以 duration 和曲線自訂動畫時間
    icon: timeline
</SummaryCard>

在本課程中，你將學習最常用且最靈活的隱含動畫元件之一：[`AnimatedContainer`][]。
只需額外增加兩行程式碼，每個 `Tile` 的背景顏色就能在約半秒內以動畫方式切換為新顏色。

[`AnimatedContainer`]: https://api.flutter.dev/flutter/widgets/AnimatedContainer-class.html

---

### 將 `Container` 轉換為 `AnimatedContainer`

目前，`Tile.build` 方法回傳一個 `Container` 來顯示字母。
當 `hitType` 發生變化時（例如從 `HitType.none` 變為 `HitType.hit`），
方塊的背景顏色會立即切換。
例如，從 `HitType.none` 到 `HitType.hit` 時，顏色會從白色變為綠色。

以下是 `Tile` 元件的目前實作供參考：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

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
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

若要讓顏色變化以平滑的方式呈現，
請將 `Container` 元件替換為 `AnimatedContainer`。

`AnimatedContainer` 與 `Container` 類似，但它能夠在指定的 `duration`（持續時間）內，
自動為屬性的變化添加動畫效果。
當 `color`、`height`、`width`、`decoration` 或 `alignment` 等屬性發生變化時，
`AnimatedContainer` 會在舊值與新值之間進行插值，產生平滑的過渡效果。

請按照以下方式修改你的 `Tile` 元件：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

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
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

**`duration`** 是一個必填屬性，用於指定動畫的執行時間。
在此範例中，傳入 `Duration(milliseconds: 500)` 表示顏色過渡將花費半秒。
你也可以指定秒、分鐘以及許多其他時間單位。

現在，當 `hitType` 發生變化並且 `Tile` 元件重新建置時
（因為 `GamePage` 中呼叫了 `setState`），
方塊的顏色會在指定的持續時間內，從舊顏色平滑地過渡到新顏色。

### 調整動畫曲線

若要為隱含動畫添加一些自訂效果，
你可以傳入不同的 [`Curve`][]（曲線）。
不同的曲線會在動畫進行的各個時間點改變動畫的速度。

例如，Flutter 動畫的預設曲線是 `Curves.linear`。以下 gif 展示了此動畫曲線的行為：

<img src="/assets/images/docs/tutorial/linear_curve.gif" width="320px"
alt="A gif that shows a linear curve.">

與之相比，以下是另一種常用曲線 `Curve.bounceIn`：

<img src="/assets/images/docs/tutorial/bounce_in_curve.gif" width="320px"
alt="A gif that shows a bounce-in curve">



若要變更此動畫的 `Curve`，請將程式碼更新如下：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
      curve: Curves.bounceIn, // NEW
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
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

Flutter SDK 提供了許多不同的曲線，
歡迎透過傳入不同的類型至 `curve` 參數來嘗試。

像 `AnimatedContainer` 這樣的隱含動畫非常強大，
因為你只需告訴元件新的狀態應該是什麼，
它就會自行處理動畫的「如何執行」。

對於複雜的自訂動畫，你可以自行編寫動畫元件。
如果你有興趣，可以在[動畫教學][]中嘗試看看。

[`Curve`]: https://api.flutter.dev/flutter/animation/Curves-class.html
[動畫教學]: /ui/animations/tutorial

### 複習

<SummaryCard>
title: 你完成了什麼
subtitle: 以下是你在本課程中建置與學習的摘要。
completed: true
items:
  - title: 探索了隱含動畫
    icon: auto_awesome
    details: >-
      隱含動畫是能自動為屬性變化添加動畫的元件。
      你只需指定新的狀態，元件就會為你處理動畫，
      無需手動管理動畫。
  - title: 使用 AnimatedContainer 為方塊添加動畫
    icon: animation
    details: >-
      透過將 `Container` 替換為 `AnimatedContainer` 並加入 `duration`，
      你的方塊現在能夠在顏色之間平滑過渡。
      只需兩行程式碼，你就為應用程式增添了專業感！
  - title: 以 duration 和曲線自訂動畫時間
    icon: timeline
    details: >-
      `duration` 屬性控制動畫花費的時間，
      而 `curve` 則改變動畫的感覺。
      你嘗試了 `Curves.decelerate`，也可以試試其他值，
      例如 `Curves.easeIn`、`Curves.bounceOut` 或 `Curves.elasticIn`。
  - title: 完成了 Birdle 遊戲
    icon: celebration
    details: >-
      你已建置了一個完整的 Wordle 風格遊戲，包含自訂元件、
      動態版面配置、使用者輸入、狀態管理以及平滑動畫。
      你現在擁有建置自己的 Flutter 應用程式所需的基礎技能！
</SummaryCard>

### 自我測驗

<Quiz title="隱含動畫測驗">
- question: 你可以使用哪個元件來自動為顏色、大小和裝飾等屬性的變化添加動畫？
  options:
    - text: Container
      correct: false
      explanation: Container 不會產生動畫；屬性變化會立即發生。
    - text: AnimatedContainer
      correct: true
      explanation: AnimatedContainer 會在指定的持續時間內自動為其屬性的變化添加動畫。
    - text: AnimationController
      correct: false
      explanation: AnimationController 用於顯式動畫；AnimatedContainer 對於基本動畫更為簡單。
    - text: TransitionContainer
      correct: false
      explanation: 沒有 TransitionContainer 元件；請使用 AnimatedContainer 來實作隱含動畫。
- question: "在 AnimatedContainer 中，`duration` 屬性控制什麼？"
  options:
    - text: 元件在消失前停留在螢幕上的時間。
      correct: false
      explanation: duration 控制的是動畫時間，而非元件的可見性。
    - text: 動畫從舊值過渡到新值所需的時間。
      correct: true
      explanation: duration 指定了屬性變化以動畫呈現的時間長度。
    - text: 動畫開始前的延遲時間。
      correct: false
      explanation: duration 關係到動畫的長度；延遲需要另外設定。
    - text: 動畫重複的次數。
      correct: false
      explanation: 隱含動畫在每次狀態變化時執行一次；重複播放需要使用顯式動畫控制器。
</Quiz>

