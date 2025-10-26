---
title: 理解約束（constraints）
description: Flutter 的元件（Widgets）約束、尺寸、定位模型及其互動方式。
showToc: false
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="layout/constraints/"?>

<img src='/assets/images/docs/ui/layout/article-hero-image.png' alt="文章主圖">

:::note
如果你遇到特定的版面配置錯誤，可以參考 [常見 Flutter 錯誤][Common Flutter errors]。
:::

[Common Flutter errors]: /testing/common-errors

當學習 Flutter 的人問你，為什麼某個帶有 `width: 100` 的元件（Widget）不是 100 像素寬時，
你是不是習慣性地建議他把該元件包在 `Center` 裡面？

**請不要這麼做。**

如果你這麼做，他們會一再回來問你，
為什麼某個 `FittedBox` 沒有效果，
為什麼那個 `Column` 溢出了，或者
`IntrinsicWidth` 應該是做什麼用的。

正確的做法是，先告訴他們 Flutter 的版面配置和 HTML 的版面配置（他們很可能來自這個背景）非常不同，
然後讓他們牢記以下這條規則：

<center><font size="+2">
<b>約束向下傳遞，尺寸向上回報，父元件決定位置。</b>
</font></center>

不了解這條規則，就無法真正理解 Flutter 的版面配置，因此 Flutter 開發者應該盡早學會它。

詳細來說：

* 元件（Widget）會從**父元件**那裡獲得自己的**約束（constraints）**。
  一個 _約束_ 就是四個 double 數值的集合：
  最小和最大寬度，以及最小和最大高度。
* 然後，該元件會遍歷自己的**子元件**列表。
  它會一個個地告訴子元件它們的**約束**（每個子元件的約束可以不同），
  然後詢問每個子元件它想要多大。
* 接著，該元件會為自己的**子元件**定位
  （在 `x` 軸上為水平，`y` 軸上為垂直），
  一個個地進行。
* 最後，該元件會告訴父元件自己的**尺寸**
  （當然是在原本的約束範圍內）。

舉例來說，假設一個組合元件包含一個帶有內距（padding）的 column，
並希望以下列方式排列它的兩個子元件：

<img src='/assets/images/docs/ui/layout/children.png' alt="視覺化版面配置">

協商過程大致如下：

**元件**：「嗨，父元件，我的約束是什麼？」

**父元件**：「你必須寬度在 `0` 到 `300` 像素之間，
   高度在 `0` 到 `85` 之間。」

**元件**：「嗯，因為我想要有 `5` 像素的內距，
   那我的子元件最多只能有 `290` 像素的寬度
   和 `75` 像素的高度。」

**元件**：「嗨，第一個子元件，你必須寬度在 `0` 到 `290` 像素之間，
   高度在 `0` 到 `75` 之間。」

**第一個子元件**：「OK，那我希望寬度為 `290` 像素，
   高度為 `20` 像素。」

**元件**：「嗯，因為我要把第二個子元件放在第一個的下方，
   所以只剩下 `55` 像素的高度給第二個子元件。」

**元件**：「嗨，第二個子元件，你必須寬度在 `0` 到 `290` 之間，
   高度在 `0` 到 `55` 之間。」

**第二個子元件**：「OK，我希望寬度為 `140` 像素，
   高度為 `30` 像素。」

**元件**：「很好。我的第一個子元件的位置是 `x: 5` 和 `y: 5`，
   第二個子元件的位置是 `x: 80` 和 `y: 25`。」

**元件**：「嗨，父元件，我決定我的尺寸是 `300` 像素寬，
   `60` 像素高。」

## 限制

Flutter 的版面配置引擎設計為單次遍歷（one-pass）流程。
這代表 Flutter 能非常有效率地排列元件，
但也帶來一些限制：

* 元件只能在父元件給定的約束內決定自己的尺寸。
  這表示元件通常
  **不能隨意設定任何想要的尺寸**。

* 元件**無法得知也無法決定自己在螢幕上的位置**，
  因為是父元件決定它的位置。

* 由於父元件的尺寸和位置又取決於它的父元件，
  所以若不考慮整棵元件樹（widget tree），
  就無法精確定義任何元件的尺寸和位置。

* 如果子元件想要的尺寸和父元件不同，
  而父元件又沒有足夠資訊來對齊它，
  那麼子元件的尺寸可能會被忽略。
  **定義對齊方式時請具體明確。**

在 Flutter 中，元件是由其底層的
[`RenderBox`][`RenderBox`] 物件來渲染的。Flutter 中的許多盒子（box），
特別是那些只包含單一子元件的盒子，
會將自己的約束傳遞給子元件。

一般來說，根據處理約束的方式，盒子可分為三類：

* 嘗試盡可能大的盒子。
  例如，[`Center`][`Center`] 和
  [`ListView`][`ListView`] 使用的盒子。
* 嘗試與子元件一樣大的盒子。
  例如，[`Transform`][`Transform`] 和
  [`Opacity`][`Opacity`] 使用的盒子。
* 嘗試成為特定尺寸的盒子。
  例如，[`Image`][`Image`] 和
  [`Text`][`Text`] 使用的盒子。

有些元件，例如 [`Container`][`Container`]，
會根據建構函式（constructor）的參數不同而有所變化。
[`Container`][`Container`] 建構函式預設會嘗試盡可能大，
但如果你給它一個 `width`，它就會嘗試遵循並成為那個特定尺寸。

其他元件，例如 [`Row`][`Row`] 和 [`Column`][`Column`] (flex boxes)，
則會根據它們獲得的約束而有所不同，
詳情請參見 [Flex](#flex) 章節。
  
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Image`]: {{site.api}}/flutter/dart-ui/Image-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`Opacity`]: {{site.api}}/flutter/widgets/Opacity-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`Transform`]: {{site.api}}/flutter/widgets/Transform-class.html

## 範例

想要互動式體驗，請使用下方的 DartPad。
使用帶編號的水平捲動條，可以切換 29 個不同的範例。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Constraints DartPad hands-on example" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const HomePage());

const red = Colors.red;
const green = Colors.green;
const blue = Colors.blue;
const big = TextStyle(fontSize: 30);

//////////////////////////////////////////////////

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const FlutterLayoutArticle([
      Example1(),
      Example2(),
      Example3(),
      Example4(),
      Example5(),
      Example6(),
      Example7(),
      Example8(),
      Example9(),
      Example10(),
      Example11(),
      Example12(),
      Example13(),
      Example14(),
      Example15(),
      Example16(),
      Example17(),
      Example18(),
      Example19(),
      Example20(),
      Example21(),
      Example22(),
      Example23(),
      Example24(),
      Example25(),
      Example26(),
      Example27(),
      Example28(),
      Example29(),
    ]);
  }
}

//////////////////////////////////////////////////

abstract class Example extends StatelessWidget {
  const Example({super.key});

  String get code;

  String get explanation;
}

//////////////////////////////////////////////////

class FlutterLayoutArticle extends StatefulWidget {
  const FlutterLayoutArticle(this.examples, {super.key});

  final List<Example> examples;

  @override
  State<FlutterLayoutArticle> createState() => _FlutterLayoutArticleState();
}

//////////////////////////////////////////////////

class _FlutterLayoutArticleState extends State<FlutterLayoutArticle> {
  late int count;
  late Widget example;
  late String code;
  late String explanation;

  @override
  void initState() {
    count = 1;
    code = const Example1().code;
    explanation = const Example1().explanation;

    super.initState();
  }

  @override
  void didUpdateWidget(FlutterLayoutArticle oldWidget) {
    super.didUpdateWidget(oldWidget);
    var example = widget.examples[count - 1];
    code = example.code;
    explanation = example.explanation;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Layout Article',
      home: SafeArea(
        child: Material(
          color: Colors.black,
          child: FittedBox(
            child: Container(
              width: 400,
              height: 670,
              color: const Color(0xFFCCCCCC),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints.tightFor(
                        width: double.infinity,
                        height: double.infinity,
                      ),
                      child: widget.examples[count - 1],
                    ),
                  ),
                  Container(
                    height: 50,
                    width: double.infinity,
                    color: Colors.black,
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          for (int i = 0; i < widget.examples.length; i++)
                            Container(
                              width: 58,
                              padding: const EdgeInsets.only(left: 4, right: 4),
                              child: button(i + 1),
                            ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    height: 273,
                    color: Colors.grey[50],
                    child: Scrollbar(
                      child: SingleChildScrollView(
                        key: ValueKey(count),
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: [
                              Center(child: Text(code)),
                              const SizedBox(height: 15),
                              Text(
                                explanation,
                                style: TextStyle(
                                  color: Colors.blue[900],
                                  fontStyle: FontStyle.italic,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget button(int exampleNumber) {
    return Button(
      key: ValueKey('button$exampleNumber'),
      isSelected: count == exampleNumber,
      exampleNumber: exampleNumber,
      onPressed: () {
        showExample(
          exampleNumber,
          widget.examples[exampleNumber - 1].code,
          widget.examples[exampleNumber - 1].explanation,
        );
      },
    );
  }

  void showExample(int exampleNumber, String code, String explanation) {
    setState(() {
      count = exampleNumber;
      this.code = code;
      this.explanation = explanation;
    });
  }
}

//////////////////////////////////////////////////

class Button extends StatelessWidget {
  final bool isSelected;
  final int exampleNumber;
  final VoidCallback onPressed;

  const Button({
    super.key,
    required this.isSelected,
    required this.exampleNumber,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      style: TextButton.styleFrom(
        foregroundColor: Colors.white,
        backgroundColor: isSelected ? Colors.grey : Colors.grey[800],
      ),
      child: Text(exampleNumber.toString()),
      onPressed: () {
        Scrollable.ensureVisible(
          context,
          duration: const Duration(milliseconds: 350),
          curve: Curves.easeOut,
          alignment: 0.5,
        );
        onPressed();
      },
    );
  }
}
//////////////////////////////////////////////////

class Example1 extends Example {
  const Example1({super.key});

  @override
  final code = 'Container(color: red)';

  @override
  final explanation =
      'The screen is the parent of the Container, '
      'and it forces the Container to be exactly the same size as the screen.'
      '\n\n'
      'So the Container fills the screen and paints it red.';

  @override
  Widget build(BuildContext context) {
    return Container(color: red);
  }
}

//////////////////////////////////////////////////

class Example2 extends Example {
  const Example2({super.key});

  @override
  final code = 'Container(width: 100, height: 100, color: red)';
  @override
  final String explanation =
      'The red Container wants to be 100x100, but it can\'t, '
      'because the screen forces it to be exactly the same size as the screen.'
      '\n\n'
      'So the Container fills the screen.';

  @override
  Widget build(BuildContext context) {
    return Container(width: 100, height: 100, color: red);
  }
}

//////////////////////////////////////////////////

class Example3 extends Example {
  const Example3({super.key});

  @override
  final code =
      'Center(\n'
      '   child: Container(width: 100, height: 100, color: red))';
  @override
  final String explanation =
      'The screen forces the Center to be exactly the same size as the screen, '
      'so the Center fills the screen.'
      '\n\n'
      'The Center tells the Container that it can be any size it wants, but not bigger than the screen.'
      'Now the Container can indeed be 100x100.';

  @override
  Widget build(BuildContext context) {
    return Center(child: Container(width: 100, height: 100, color: red));
  }
}

//////////////////////////////////////////////////

class Example4 extends Example {
  const Example4({super.key});

  @override
  final code =
      'Align(\n'
      '   alignment: Alignment.bottomRight,\n'
      '   child: Container(width: 100, height: 100, color: red))';
  @override
  final String explanation =
      'This is different from the previous example in that it uses Align instead of Center.'
      '\n\n'
      'Align also tells the Container that it can be any size it wants, but if there is empty space it won\'t center the Container. '
      'Instead, it aligns the Container to the bottom-right of the available space.';

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: Container(width: 100, height: 100, color: red),
    );
  }
}

//////////////////////////////////////////////////

class Example5 extends Example {
  const Example5({super.key});

  @override
  final code =
      'Center(\n'
      '   child: Container(\n'
      '              color: red,\n'
      '              width: double.infinity,\n'
      '              height: double.infinity))';
  @override
  final String explanation =
      'The screen forces the Center to be exactly the same size as the screen, '
      'so the Center fills the screen.'
      '\n\n'
      'The Center tells the Container that it can be any size it wants, but not bigger than the screen.'
      'The Container wants to be of infinite size, but since it can\'t be bigger than the screen, it just fills the screen.';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: double.infinity,
        height: double.infinity,
        color: red,
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example6 extends Example {
  const Example6({super.key});

  @override
  final code = 'Center(child: Container(color: red))';
  @override
  final String explanation =
      'The screen forces the Center to be exactly the same size as the screen, '
      'so the Center fills the screen.'
      '\n\n'
      'The Center tells the Container that it can be any size it wants, but not bigger than the screen.'
      '\n\n'
      'Since the Container has no child and no fixed size, it decides it wants to be as big as possible, so it fills the whole screen.'
      '\n\n'
      'But why does the Container decide that? '
      'Simply because that\'s a design decision by those who created the Container widget. '
      'It could have been created differently, and you have to read the Container documentation to understand how it behaves, depending on the circumstances. ';

  @override
  Widget build(BuildContext context) {
    return Center(child: Container(color: red));
  }
}

//////////////////////////////////////////////////

class Example7 extends Example {
  const Example7({super.key});

  @override
  final code =
      'Center(\n'
      '   child: Container(color: red\n'
      '      child: Container(color: green, width: 30, height: 30)))';
  @override
  final String explanation =
      'The screen forces the Center to be exactly the same size as the screen, '
      'so the Center fills the screen.'
      '\n\n'
      'The Center tells the red Container that it can be any size it wants, but not bigger than the screen.'
      'Since the red Container has no size but has a child, it decides it wants to be the same size as its child.'
      '\n\n'
      'The red Container tells its child that it can be any size it wants, but not bigger than the screen.'
      '\n\n'
      'The child is a green Container that wants to be 30x30.'
      '\n\n'
      'Since the red `Container` has no size but has a child, it decides it wants to be the same size as its child. '
      'The red color isn\'t visible, since the green Container entirely covers all of the red Container.';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: red,
        child: Container(color: green, width: 30, height: 30),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example8 extends Example {
  const Example8({super.key});

  @override
  final code =
      'Center(\n'
      '   child: Container(color: red\n'
      '      padding: const EdgeInsets.all(20),\n'
      '      child: Container(color: green, width: 30, height: 30)))';
  @override
  final String explanation =
      'The red Container sizes itself to its children size, but it takes its own padding into consideration. '
      'So it is also 30x30 plus padding. '
      'The red color is visible because of the padding, and the green Container has the same size as in the previous example.';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(20),
        color: red,
        child: Container(color: green, width: 30, height: 30),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example9 extends Example {
  const Example9({super.key});

  @override
  final code =
      'ConstrainedBox(\n'
      '   constraints: BoxConstraints(\n'
      '              minWidth: 70, minHeight: 70,\n'
      '              maxWidth: 150, maxHeight: 150),\n'
      '      child: Container(color: red, width: 10, height: 10)))';
  @override
  final String explanation =
      'You might guess that the Container has to be between 70 and 150 pixels, but you would be wrong. '
      'The ConstrainedBox only imposes ADDITIONAL constraints from those it receives from its parent.'
      '\n\n'
      'Here, the screen forces the ConstrainedBox to be exactly the same size as the screen, '
      'so it tells its child Container to also assume the size of the screen, '
      'thus ignoring its \'constraints\' parameter.';

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(
        minWidth: 70,
        minHeight: 70,
        maxWidth: 150,
        maxHeight: 150,
      ),
      child: Container(color: red, width: 10, height: 10),
    );
  }
}

//////////////////////////////////////////////////

class Example10 extends Example {
  const Example10({super.key});

  @override
  final code =
      'Center(\n'
      '   child: ConstrainedBox(\n'
      '      constraints: BoxConstraints(\n'
      '                 minWidth: 70, minHeight: 70,\n'
      '                 maxWidth: 150, maxHeight: 150),\n'
      '        child: Container(color: red, width: 10, height: 10))))';
  @override
  final String explanation =
      'Now, Center allows ConstrainedBox to be any size up to the screen size.'
      '\n\n'
      'The ConstrainedBox imposes ADDITIONAL constraints from its \'constraints\' parameter onto its child.'
      '\n\n'
      'The Container must be between 70 and 150 pixels. It wants to have 10 pixels, so it will end up having 70 (the MINIMUM).';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(
          minWidth: 70,
          minHeight: 70,
          maxWidth: 150,
          maxHeight: 150,
        ),
        child: Container(color: red, width: 10, height: 10),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example11 extends Example {
  const Example11({super.key});

  @override
  final code =
      'Center(\n'
      '   child: ConstrainedBox(\n'
      '      constraints: BoxConstraints(\n'
      '                 minWidth: 70, minHeight: 70,\n'
      '                 maxWidth: 150, maxHeight: 150),\n'
      '        child: Container(color: red, width: 1000, height: 1000))))';
  @override
  final String explanation =
      'Center allows ConstrainedBox to be any size up to the screen size.'
      'The ConstrainedBox imposes ADDITIONAL constraints from its \'constraints\' parameter onto its child'
      '\n\n'
      'The Container must be between 70 and 150 pixels. It wants to have 1000 pixels, so it ends up having 150 (the MAXIMUM).';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(
          minWidth: 70,
          minHeight: 70,
          maxWidth: 150,
          maxHeight: 150,
        ),
        child: Container(color: red, width: 1000, height: 1000),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example12 extends Example {
  const Example12({super.key});

  @override
  final code =
      'Center(\n'
      '   child: ConstrainedBox(\n'
      '      constraints: BoxConstraints(\n'
      '                 minWidth: 70, minHeight: 70,\n'
      '                 maxWidth: 150, maxHeight: 150),\n'
      '        child: Container(color: red, width: 100, height: 100))))';
  @override
  final String explanation =
      'Center allows ConstrainedBox to be any size up to the screen size.'
      'ConstrainedBox imposes ADDITIONAL constraints from its \'constraints\' parameter onto its child.'
      '\n\n'
      'The Container must be between 70 and 150 pixels. It wants to have 100 pixels, and that\'s the size it has, since that\'s between 70 and 150.';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(
          minWidth: 70,
          minHeight: 70,
          maxWidth: 150,
          maxHeight: 150,
        ),
        child: Container(color: red, width: 100, height: 100),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example13 extends Example {
  const Example13({super.key});

  @override
  final code =
      'UnconstrainedBox(\n'
      '   child: Container(color: red, width: 20, height: 50));';
  @override
  final String explanation =
      'The screen forces the UnconstrainedBox to be exactly the same size as the screen.'
      'However, the UnconstrainedBox lets its child Container be any size it wants.';

  @override
  Widget build(BuildContext context) {
    return UnconstrainedBox(
      child: Container(color: red, width: 20, height: 50),
    );
  }
}

//////////////////////////////////////////////////

class Example14 extends Example {
  const Example14({super.key});

  @override
  final code =
      'UnconstrainedBox(\n'
      '   child: Container(color: red, width: 4000, height: 50));';
  @override
  final String explanation =
      'The screen forces the UnconstrainedBox to be exactly the same size as the screen, '
      'and UnconstrainedBox lets its child Container be any size it wants.'
      '\n\n'
      'Unfortunately, in this case the Container has 4000 pixels of width and is too big to fit in the UnconstrainedBox, '
      'so the UnconstrainedBox displays the much dreaded "overflow warning".';

  @override
  Widget build(BuildContext context) {
    return UnconstrainedBox(
      child: Container(color: red, width: 4000, height: 50),
    );
  }
}

//////////////////////////////////////////////////

class Example15 extends Example {
  const Example15({super.key});

  @override
  final code =
      'OverflowBox(\n'
      '   minWidth: 0,'
      '   minHeight: 0,'
      '   maxWidth: double.infinity,'
      '   maxHeight: double.infinity,'
      '   child: Container(color: red, width: 4000, height: 50));';
  @override
  final String explanation =
      'The screen forces the OverflowBox to be exactly the same size as the screen, '
      'and OverflowBox lets its child Container be any size it wants.'
      '\n\n'
      'OverflowBox is similar to UnconstrainedBox, and the difference is that it won\'t display any warnings if the child doesn\'t fit the space.'
      '\n\n'
      'In this case the Container is 4000 pixels wide, and is too big to fit in the OverflowBox, '
      'but the OverflowBox simply shows as much as it can, with no warnings given.';

  @override
  Widget build(BuildContext context) {
    return OverflowBox(
      minWidth: 0,
      minHeight: 0,
      maxWidth: double.infinity,
      maxHeight: double.infinity,
      child: Container(color: red, width: 4000, height: 50),
    );
  }
}

//////////////////////////////////////////////////

class Example16 extends Example {
  const Example16({super.key});

  @override
  final code =
      'UnconstrainedBox(\n'
      '   child: Container(color: Colors.red, width: double.infinity, height: 100));';
  @override
  final String explanation =
      'This won\'t render anything, and you\'ll see an error in the console.'
      '\n\n'
      'The UnconstrainedBox lets its child be any size it wants, '
      'however its child is a Container with infinite size.'
      '\n\n'
      'Flutter can\'t render infinite sizes, so it throws an error with the following message: '
      '"BoxConstraints forces an infinite width."';

  @override
  Widget build(BuildContext context) {
    return UnconstrainedBox(
      child: Container(color: Colors.red, width: double.infinity, height: 100),
    );
  }
}

//////////////////////////////////////////////////

class Example17 extends Example {
  const Example17({super.key});

  @override
  final code =
      'UnconstrainedBox(\n'
      '   child: LimitedBox(maxWidth: 100,\n'
      '      child: Container(color: Colors.red,\n'
      '                       width: double.infinity, height: 100));';
  @override
  final String explanation =
      'Here you won\'t get an error anymore, '
      'because when the LimitedBox is given an infinite size by the UnconstrainedBox, '
      'it passes a maximum width of 100 down to its child.'
      '\n\n'
      'If you swap the UnconstrainedBox for a Center widget, '
      'the LimitedBox won\'t apply its limit anymore (since its limit is only applied when it gets infinite constraints), '
      'and the width of the Container is allowed to grow past 100.'
      '\n\n'
      'This explains the difference between a LimitedBox and a ConstrainedBox.';

  @override
  Widget build(BuildContext context) {
    return UnconstrainedBox(
      child: LimitedBox(
        maxWidth: 100,
        child: Container(
          color: Colors.red,
          width: double.infinity,
          height: 100,
        ),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example18 extends Example {
  const Example18({super.key});

  @override
  final code =
      'FittedBox(\n'
      '   child: Text(\'Some Example Text.\'));';
  @override
  final String explanation =
      'The screen forces the FittedBox to be exactly the same size as the screen.'
      'The Text has some natural width (also called its intrinsic width) that depends on the amount of text, its font size, and so on.'
      '\n\n'
      'The FittedBox lets the Text be any size it wants, '
      'but after the Text tells its size to the FittedBox, '
      'the FittedBox scales the Text until it fills all of the available width.';

  @override
  Widget build(BuildContext context) {
    return const FittedBox(child: Text('Some Example Text.'));
  }
}

//////////////////////////////////////////////////

class Example19 extends Example {
  const Example19({super.key});

  @override
  final code =
      'Center(\n'
      '   child: FittedBox(\n'
      '      child: Text(\'Some Example Text.\')));';
  @override
  final String explanation =
      'But what happens if you put the FittedBox inside of a Center widget? '
      'The Center lets the FittedBox be any size it wants, up to the screen size.'
      '\n\n'
      'The FittedBox then sizes itself to the Text, and lets the Text be any size it wants.'
      '\n\n'
      'Since both FittedBox and the Text have the same size, no scaling happens.';

  @override
  Widget build(BuildContext context) {
    return const Center(child: FittedBox(child: Text('Some Example Text.')));
  }
}

////////////////////////////////////////////////////

class Example20 extends Example {
  const Example20({super.key});

  @override
  final code =
      'Center(\n'
      '   child: FittedBox(\n'
      '      child: Text(\'…\')));';
  @override
  final String explanation =
      'However, what happens if FittedBox is inside of a Center widget, but the Text is too large to fit the screen?'
      '\n\n'
      'FittedBox tries to size itself to the Text, but it can\'t be bigger than the screen. '
      'It then assumes the screen size, and resizes Text so that it fits the screen, too.';

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: FittedBox(
        child: Text(
          'This is some very very very large text that is too big to fit a regular screen in a single line.',
        ),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example21 extends Example {
  const Example21({super.key});

  @override
  final code =
      'Center(\n'
      '   child: Text(\'…\'));';
  @override
  final String explanation =
      'If, however, you remove the FittedBox, '
      'the Text gets its maximum width from the screen, '
      'and breaks the line so that it fits the screen.';

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'This is some very very very large text that is too big to fit a regular screen in a single line.',
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example22 extends Example {
  const Example22({super.key});

  @override
  final code =
      'FittedBox(\n'
      '   child: Container(\n'
      '      height: 20, width: double.infinity));';
  @override
  final String explanation =
      'FittedBox can only scale a widget that is BOUNDED (has non-infinite width and height).'
      'Otherwise, it won\'t render anything, and you\'ll see an error in the console.';

  @override
  Widget build(BuildContext context) {
    return FittedBox(
      child: Container(height: 20, width: double.infinity, color: Colors.red),
    );
  }
}

//////////////////////////////////////////////////

class Example23 extends Example {
  const Example23({super.key});

  @override
  final code =
      'Row(children:[\n'
      '   Container(color: red, child: Text(\'Hello!\'))\n'
      '   Container(color: green, child: Text(\'Goodbye!\'))]';
  @override
  final String explanation =
      'The screen forces the Row to be exactly the same size as the screen.'
      '\n\n'
      'Just like an UnconstrainedBox, the Row won\'t impose any constraints onto its children, '
      'and instead lets them be any size they want.'
      '\n\n'
      'The Row then puts them side-by-side, and any extra space remains empty.';

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          color: red,
          child: const Text('Hello!', style: big),
        ),
        Container(
          color: green,
          child: const Text('Goodbye!', style: big),
        ),
      ],
    );
  }
}

//////////////////////////////////////////////////

class Example24 extends Example {
  const Example24({super.key});

  @override
  final code =
      'Row(children:[\n'
      '   Container(color: red, child: Text(\'…\'))\n'
      '   Container(color: green, child: Text(\'Goodbye!\'))]';
  @override
  final String explanation =
      'Since the Row won\'t impose any constraints onto its children, '
      'it\'s quite possible that the children might be too big to fit the available width of the Row.'
      'In this case, just like an UnconstrainedBox, the Row displays the "overflow warning".';

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          color: red,
          child: const Text(
            'This is a very long text that '
            'won\'t fit the line.',
            style: big,
          ),
        ),
        Container(
          color: green,
          child: const Text('Goodbye!', style: big),
        ),
      ],
    );
  }
}

//////////////////////////////////////////////////

class Example25 extends Example {
  const Example25({super.key});

  @override
  final code =
      'Row(children:[\n'
      '   Expanded(\n'
      '       child: Container(color: red, child: Text(\'…\')))\n'
      '   Container(color: green, child: Text(\'Goodbye!\'))]';
  @override
  final String explanation =
      'When a Row\'s child is wrapped in an Expanded widget, the Row won\'t let this child define its own width anymore.'
      '\n\n'
      'Instead, it defines the Expanded width according to the other children, and only then the Expanded widget forces the original child to have the Expanded\'s width.'
      '\n\n'
      'In other words, once you use Expanded, the original child\'s width becomes irrelevant, and is ignored.';

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Center(
            child: Container(
              color: red,
              child: const Text(
                'This is a very long text that won\'t fit the line.',
                style: big,
              ),
            ),
          ),
        ),
        Container(
          color: green,
          child: const Text('Goodbye!', style: big),
        ),
      ],
    );
  }
}

//////////////////////////////////////////////////

class Example26 extends Example {
  const Example26({super.key});

  @override
  final code =
      'Row(children:[\n'
      '   Expanded(\n'
      '       child: Container(color: red, child: Text(\'…\')))\n'
      '   Expanded(\n'
      '       child: Container(color: green, child: Text(\'Goodbye!\'))]';
  @override
  final String explanation =
      'If all of Row\'s children are wrapped in Expanded widgets, each Expanded has a size proportional to its flex parameter, '
      'and only then each Expanded widget forces its child to have the Expanded\'s width.'
      '\n\n'
      'In other words, Expanded ignores the preferred width of its children.';

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Container(
            color: red,
            child: const Text(
              'This is a very long text that won\'t fit the line.',
              style: big,
            ),
          ),
        ),
        Expanded(
          child: Container(
            color: green,
            child: const Text('Goodbye!', style: big),
          ),
        ),
      ],
    );
  }
}

//////////////////////////////////////////////////

class Example27 extends Example {
  const Example27({super.key});

  @override
  final code =
      'Row(children:[\n'
      '   Flexible(\n'
      '       child: Container(color: red, child: Text(\'…\')))\n'
      '   Flexible(\n'
      '       child: Container(color: green, child: Text(\'Goodbye!\'))]';
  @override
  final String explanation =
      'The only difference if you use Flexible instead of Expanded, '
      'is that Flexible lets its child be SMALLER than the Flexible width, '
      'while Expanded forces its child to have the same width of the Expanded.'
      '\n\n'
      'But both Expanded and Flexible ignore their children\'s width when sizing themselves.'
      '\n\n'
      'This means that it\'s IMPOSSIBLE to expand Row children proportionally to their sizes. '
      'The Row either uses the exact child\'s width, or ignores it completely when you use Expanded or Flexible.';

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Flexible(
          child: Container(
            color: red,
            child: const Text(
              'This is a very long text that won\'t fit the line.',
              style: big,
            ),
          ),
        ),
        Flexible(
          child: Container(
            color: green,
            child: const Text('Goodbye!', style: big),
          ),
        ),
      ],
    );
  }
}

//////////////////////////////////////////////////

class Example28 extends Example {
  const Example28({super.key});

  @override
  final code =
      'Scaffold(\n'
      '   body: Container(color: blue,\n'
      '   child: Column(\n'
      '      children: [\n'
      '         Text(\'Hello!\'),\n'
      '         Text(\'Goodbye!\')])))';

  @override
  final String explanation =
      'The screen forces the Scaffold to be exactly the same size as the screen, '
      'so the Scaffold fills the screen.'
      '\n\n'
      'The Scaffold tells the Container that it can be any size it wants, but not bigger than the screen.'
      '\n\n'
      'When a widget tells its child that it can be smaller than a certain size, '
      'we say the widget supplies "loose" constraints to its child. More on that later.';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: blue,
        child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
      ),
    );
  }
}

//////////////////////////////////////////////////

class Example29 extends Example {
  const Example29({super.key});

  @override
  final code =
      'Scaffold(\n'
      '   body: Container(color: blue,\n'
      '   child: SizedBox.expand(\n'
      '      child: Column(\n'
      '         children: [\n'
      '            Text(\'Hello!\'),\n'
      '            Text(\'Goodbye!\')]))))';

  @override
  final String explanation =
      'If you want the Scaffold\'s child to be exactly the same size as the Scaffold itself, '
      'you can wrap its child with SizedBox.expand.'
      '\n\n'
      'When a widget tells its child that it must be of a certain size, '
      'we say the widget supplies "tight" constraints to its child. More on that later.';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox.expand(
        child: Container(
          color: blue,
          child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
        ),
      ),
    );
  }
}

//////////////////////////////////////////////////
```

如果你願意，也可以從
[這個 GitHub 儲存庫][this GitHub repo] 取得程式碼。

這些範例會在接下來的章節中說明。

[this GitHub repo]: {{site.github}}/marcglasberg/flutter_layout_article

### 範例 1

<img src='/assets/images/docs/ui/layout/layout-1.png' alt="範例 1 版面配置">

<?code-excerpt "lib/main.dart (Example1)" replace="/(return |;)//g"?>
```dart
Container(color: red)
```

螢幕是`Container`的父元件，並且
強制`Container`的尺寸必須與螢幕完全相同。

因此，`Container`會填滿整個螢幕並將其塗成紅色。

### 範例 2

<img src='/assets/images/docs/ui/layout/layout-2.png' alt="範例 2 版面配置">

<?code-excerpt "lib/main.dart (Example2)" replace="/(return |;)//g"?>
```dart
Container(width: 100, height: 100, color: red)
```

紅色的 `Container` 想要成為 100 × 100，
但它做不到，因為螢幕強制它
必須和螢幕的尺寸完全一樣。

因此，`Container` 會填滿整個螢幕。

### 範例 3

<img src='/assets/images/docs/ui/layout/layout-3.png' alt="範例 3 版面配置">

<?code-excerpt "lib/main.dart (Example3)" replace="/(return |;)//g"?>
```dart
Center(child: Container(width: 100, height: 100, color: red))
```

螢幕會強制`Center`的尺寸與螢幕完全相同，因此`Center`會填滿整個螢幕。

`Center`告訴`Container`它可以是任何想要的尺寸，但不能比螢幕大。現在`Container`確實可以是 100 × 100。

### 範例 4

<img src='/assets/images/docs/ui/layout/layout-4.png' alt="Example 4 layout">

<?code-excerpt "lib/main.dart (Example4)" replace="/(return |;)//g"?>
```dart
Align(
  alignment: Alignment.bottomRight,
  child: Container(width: 100, height: 100, color: red),
)
```

這與前一個範例不同之處在於它使用了`Align`，而不是`Center`。

`Align`同樣告訴`Container`它可以是任何想要的大小，但如果有多餘的空間，`Container`不會被置中。相反地，它會將容器對齊到可用空間的右下角。

### 範例 5

<img src='/assets/images/docs/ui/layout/layout-5.png' alt="Example 5 layout">

<?code-excerpt "lib/main.dart (Example5)" replace="/(return |;)//g"?>
```dart
Center(
  child: Container(
    width: double.infinity,
    height: double.infinity,
    color: red,
  ),
)
```

螢幕會強制將`Center`設為與螢幕完全相同的尺寸，因此`Center`會填滿整個螢幕。

`Center`告訴`Container`它可以是任何想要的尺寸，但不能超過螢幕的大小。`Container`希望自己有無限大，但由於不能超過螢幕，因此它只會填滿螢幕。

### 範例 6

<img src='/assets/images/docs/ui/layout/layout-6.png' alt="Example 6 layout">

<?code-excerpt "lib/main.dart (Example6)" replace="/(return |;)//g"?>
```dart
Center(child: Container(color: red))
```

螢幕會強制將`Center`設為與螢幕完全相同的尺寸，因此`Center`會填滿整個螢幕。

`Center`告訴`Container`它可以是任何想要的尺寸，但不能超過螢幕的大小。由於`Container`沒有子元件，也沒有固定尺寸，因此它決定要盡可能大，所以會填滿整個螢幕。

但為什麼`Container`會這樣決定呢？
這純粹是因為設計`Container`元件的人所做的設計決策。它本來也可以有不同的設計方式，你必須閱讀[`Container`][`Container`] API 文件，才能根據不同情境了解它的行為。

### 範例 7

<img src='/assets/images/docs/ui/layout/layout-7.png' alt="範例 7 版面配置">

<?code-excerpt "lib/main.dart (Example7)" replace="/(return |;)//g"?>
```dart
Center(
  child: Container(
    color: red,
    child: Container(color: green, width: 30, height: 30),
  ),
)
```

螢幕會強制`Center`的尺寸與螢幕完全相同，因此`Center`會填滿整個螢幕。

`Center`告訴紅色的`Container`它可以是任何想要的尺寸，但不能超過螢幕的大小。由於紅色的`Container`本身沒有尺寸，但有一個子元件（child），因此它決定要和它的子元件一樣大。

紅色的`Container`告訴它的子元件可以是任何想要的尺寸，但不能超過螢幕的大小。

這個子元件是一個綠色的`Container`，它希望自己的尺寸是 30 × 30。由於紅色的`Container`會將自己的尺寸設為與子元件相同，因此它的尺寸也是 30 × 30。紅色區塊不會被看到，因為綠色的`Container`完全覆蓋了紅色的`Container`。

### 範例 8

<img src='/assets/images/docs/ui/layout/layout-8.png' alt="Example 8 layout">

<?code-excerpt "lib/main.dart (Example8)" replace="/(return |;)//g"?>
```dart
Center(
  child: Container(
    padding: const EdgeInsets.all(20),
    color: red,
    child: Container(color: green, width: 30, height: 30),
  ),
)
```

紅色的 `Container` 會根據其子元件 (children) 的尺寸來決定自身大小，
但同時也會考慮到自己的 padding。
因此，它的尺寸為 30 × 30 再加上 padding。
由於有 padding，紅色區域會顯示出來，
而綠色的 `Container` 尺寸則與前一個範例相同。

### 範例 9

<img src='/assets/images/docs/ui/layout/layout-9.png' alt="範例 9 版面配置">

<?code-excerpt "lib/main.dart (Example9)" replace="/(return |;)//g"?>
```dart
ConstrainedBox(
  constraints: const BoxConstraints(
    minWidth: 70,
    minHeight: 70,
    maxWidth: 150,
    maxHeight: 150,
  ),
  child: Container(color: red, width: 10, height: 10),
)
```

你可能會猜測 `Container` 必須介於 70 到 150 像素之間，但這樣的想法是錯誤的。`ConstrainedBox` 只會在它從父元件 (parent) 接收到的限制上，**額外**加上自己的限制。

在這裡，螢幕強制要求 `ConstrainedBox` 必須和螢幕本身的尺寸完全相同，因此它會告訴它的子元件 `Container` 也要採用螢幕的尺寸，這樣就會忽略它的 `constraints` 參數。

### 範例 10

<img src='/assets/images/docs/ui/layout/layout-10.png' alt="範例 10 版面配置">

<?code-excerpt "lib/main.dart (Example10)" replace="/(return |;)//g"?>
```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 10, height: 10),
  ),
)
```

現在，`Center` 允許 `ConstrainedBox` 的尺寸可以是任意大小，最大不超過螢幕尺寸。`ConstrainedBox` 會根據其 `constraints` 參數，對其子元件施加**額外**的限制。

這個 Container 必須介於 70 到 150 像素之間。它希望只有 10 像素，因此最後會有 70 像素（也就是最小值）。

### 範例 11

<img src='/assets/images/docs/ui/layout/layout-11.png' alt="Example 11 layout">

<?code-excerpt "lib/main.dart (Example11)" replace="/(return |;)//g"?>
```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 1000, height: 1000),
  ),
)
```

`Center` 允許 `ConstrainedBox` 的尺寸可以是任意大小，最大不超過螢幕尺寸。`ConstrainedBox` 會根據其 `constraints` 參數，對其子元件施加**額外**的限制。

`Container` 必須介於 70 到 150 像素之間。它希望有 1000 像素，因此最終會有 150（最大值）。

### 範例 12

<img src='/assets/images/docs/ui/layout/layout-12.png' alt="Example 12 layout">

<?code-excerpt "lib/main.dart (Example12)" replace="/(return |;)//g"?>
```dart
Center(
  child: ConstrainedBox(
    constraints: const BoxConstraints(
      minWidth: 70,
      minHeight: 70,
      maxWidth: 150,
      maxHeight: 150,
    ),
    child: Container(color: red, width: 100, height: 100),
  ),
)
```

`Center` 允許 `ConstrainedBox` 的尺寸可以是任意大小，最大不超過螢幕尺寸。`ConstrainedBox` 會根據其 `constraints` 參數，對其子元件施加**額外**的限制。

`Container` 的尺寸必須介於 70 到 150 像素之間。它希望擁有 100 像素的大小，而這正是它實際擁有的尺寸，因為 100 介於 70 和 150 之間。

### 範例 13

<img src='/assets/images/docs/ui/layout/layout-13.png' alt="Example 13 layout">

<?code-excerpt "lib/main.dart (Example13)" replace="/(return |;)//g"?>
```dart
UnconstrainedBox(
  child: Container(color: red, width: 20, height: 50),
)
```

螢幕會強制 `UnconstrainedBox` 的大小
與螢幕完全相同。然而，`UnconstrainedBox`
則允許其子元件 `Container` 擁有任何它想要的大小。

### 範例 14

<img src='/assets/images/docs/ui/layout/layout-14.png' alt="Example 14 layout">

<?code-excerpt "lib/main.dart (Example14)" replace="/(return |;)//g"?>
```dart
UnconstrainedBox(
  child: Container(color: red, width: 4000, height: 50),
)
```

螢幕會強制 `UnconstrainedBox` 的大小
與螢幕完全相同，而 `UnconstrainedBox`
則允許其子元件 `Container`
可以是任何想要的大小。

不幸的是，在這個例子中，`Container`
寬度為 4000 像素，太大而無法
放入 `UnconstrainedBox`，因此 `UnconstrainedBox`
顯示了令人頭痛的「溢出警告」。

### 範例 15

<img src='/assets/images/docs/ui/layout/layout-15.png' alt="Example 15 layout">

<?code-excerpt "lib/main.dart (Example15)" replace="/(return |;)//g"?>
```dart
OverflowBox(
  minWidth: 0,
  minHeight: 0,
  maxWidth: double.infinity,
  maxHeight: double.infinity,
  child: Container(color: red, width: 4000, height: 50),
)
```

螢幕會強制 `OverflowBox` 的尺寸與螢幕完全相同，而 `OverflowBox` 則允許其子元件 `Container` 可以是任意尺寸。

`OverflowBox` 與 `UnconstrainedBox` 類似；不同之處在於，如果子元件無法符合空間，`OverflowBox` 不會顯示任何警告。

在這個例子中，`Container` 的寬度為 4000 像素，對於 `OverflowBox` 來說太大無法容納，但 `OverflowBox` 只會盡可能顯示內容，不會產生任何警告。

### 範例 16

<img src='/assets/images/docs/ui/layout/layout-16.png' alt="Example 16 layout">

<?code-excerpt "lib/main.dart (Example16)" replace="/(return |;)//g"?>
```dart
UnconstrainedBox(
  child: Container(color: Colors.red, width: double.infinity, height: 100),
)
```

這段程式碼不會渲染任何內容，並且你會在主控台看到一個錯誤訊息。

`UnconstrainedBox` 允許其子元件（child）擁有任意大小，
然而它的子元件是一個具有無限大小的 `Container`。

Flutter 無法渲染無限大小，因此會拋出一個錯誤，
錯誤訊息如下：`BoxConstraints forces an infinite width.`

### 範例 17

<img src='/assets/images/docs/ui/layout/layout-17.png' alt="範例 17 版面配置">

<?code-excerpt "lib/main.dart (Example17)" replace="/(return |;)//g"?>
```dart
UnconstrainedBox(
  child: LimitedBox(
    maxWidth: 100,
    child: Container(
      color: Colors.red,
      width: double.infinity,
      height: 100,
    ),
  ),
)
```

這裡你將不會再遇到錯誤，
因為當`LimitedBox`被`UnconstrainedBox`給予無限大小時，
它會將最大寬度 100 傳遞給其子元件。

如果你將`UnconstrainedBox`換成`Center`元件，
`LimitedBox`將不再套用其限制
（因為它的限制只會在獲得無限約束時才會套用），而`Container`
的寬度就可以超過 100。

這說明了`LimitedBox`
和`ConstrainedBox`之間的差異。

### 範例 18

<img src='/assets/images/docs/ui/layout/layout-18.png' alt="Example 18 layout">

<?code-excerpt "lib/main.dart (Example18)" replace="/(return |;)//g"?>
```dart
const FittedBox(child: Text('Some Example Text.'))
```

螢幕會強制`FittedBox`的尺寸與螢幕完全相同。`Text`有其自然寬度（也稱為其本質寬度），這取決於文字的長度、字型大小等等。

`FittedBox`允許`Text`可以是任何想要的尺寸，但當`Text`將其尺寸告訴`FittedBox`後，`FittedBox`會將 Text 元件縮放，直到填滿所有可用的寬度為止。

### 範例 19

<img src='/assets/images/docs/ui/layout/layout-19.png' alt="Example 19 layout">

<?code-excerpt "lib/main.dart (Example19)" replace="/(return |;)//g"?>
```dart
const Center(child: FittedBox(child: Text('Some Example Text.')))
```

但是，如果你將`FittedBox`放在`Center`元件 (Widget) 裡會發生什麼事呢？`Center`允許`FittedBox`可以是任何它想要的大小，最大不超過螢幕尺寸。

接著，`FittedBox`會根據`Text`來決定自己的大小，並讓`Text`可以是任何它想要的大小。由於`FittedBox`和`Text`的大小相同，因此不會發生縮放。

### 範例 20

<img src='/assets/images/docs/ui/layout/layout-20.png' alt="Example 20 layout">

<?code-excerpt "lib/main.dart (Example20)" replace="/(return |;)//g"?>
```dart
const Center(
  child: FittedBox(
    child: Text(
      'This is some very very very large text that is too big to fit a regular screen in a single line.',
    ),
  ),
)
```

然而，如果`FittedBox`位於`Center`元件 (Widget) 內部，但`Text`的尺寸太大，無法容納在螢幕上時，會發生什麼情況呢？

`FittedBox`會嘗試將自身尺寸設為`Text`，
但它的大小不能超過螢幕。
於是它會假設自己的尺寸為螢幕大小，
並且將`Text`的尺寸也調整為適合螢幕。

### 範例 21

<img src='/assets/images/docs/ui/layout/layout-21.png' alt="Example 21 layout">

<?code-excerpt "lib/main.dart (Example21)" replace="/(return |;)//g"?>
```dart
const Center(
  child: Text(
    'This is some very very very large text that is too big to fit a regular screen in a single line.',
  ),
)
```

然而，如果你移除了`FittedBox`，`Text`
就會從螢幕獲得其最大寬度，
並自動換行以適應螢幕。

### 範例 22

<img src='/assets/images/docs/ui/layout/layout-22.png' alt="範例 22 版面配置">

<?code-excerpt "lib/main.dart (Example22)" replace="/(return |;)//g"?>
```dart
FittedBox(
  child: Container(height: 20, width: double.infinity, color: Colors.red),
)
```

`FittedBox` 只能縮放具有邊界（即寬度和高度都不是無限大）的元件 (Widgets)。否則，它將不會渲染任何內容，並且你會在主控台中看到錯誤訊息。

### 範例 23

<img src='/assets/images/docs/ui/layout/layout-23.png' alt="範例 23 版面配置">

<?code-excerpt "lib/main.dart (Example23)" replace="/(return |;)//g"?>
```dart
Row(
  children: [
    Container(
      color: red,
      child: const Text('Hello!', style: big),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

螢幕會強制`Row`的大小與螢幕完全相同。

就像`UnconstrainedBox`一樣，`Row`不會對其子元件（children）施加任何限制，
而是讓它們可以有任何想要的大小。
接著`Row`會將它們並排排列，
多餘的空間則會保持為空白。

### 範例 24

<img src='/assets/images/docs/ui/layout/layout-24.png' alt="Example 24 layout">

<?code-excerpt "lib/main.dart (Example24)" replace="/(return |;)//g"?>
```dart
Row(
  children: [
    Container(
      color: red,
      child: const Text(
        'This is a very long text that '
        'won\'t fit the line.',
        style: big,
      ),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

由於`Row`不會對其子元件施加任何限制，因此其子元件很有可能會超出`Row`可用的寬度。在這種情況下，就像`UnconstrainedBox`一樣，`Row`會顯示「溢出警告」。

### 範例 25

<img src='/assets/images/docs/ui/layout/layout-25.png' alt="Example 25 layout">

<?code-excerpt "lib/main.dart (Example25)" replace="/(return |;)//g"?>
```dart
Row(
  children: [
    Expanded(
      child: Center(
        child: Container(
          color: red,
          child: const Text(
            'This is a very long text that won\'t fit the line.',
            style: big,
          ),
        ),
      ),
    ),
    Container(
      color: green,
      child: const Text('Goodbye!', style: big),
    ),
  ],
)
```

當`Row`的子元件（child）被包裹在`Expanded`元件（Widget）中時，`Row`將不再允許這個子元件自行定義其寬度。

取而代之的是，它會根據其他子元件來決定`Expanded`的寬度，然後`Expanded`元件才會強制原本的子元件擁有`Expanded`的寬度。

換句話說，一旦你使用了`Expanded`，原本子元件的寬度就變得無關緊要，並且會被忽略。

### 範例 26

<img src='/assets/images/docs/ui/layout/layout-26.png' alt="Example 26 layout">

<?code-excerpt "lib/main.dart (Example26)" replace="/(return |;)//g"?>
```dart
Row(
  children: [
    Expanded(
      child: Container(
        color: red,
        child: const Text(
          'This is a very long text that won\'t fit the line.',
          style: big,
        ),
      ),
    ),
    Expanded(
      child: Container(
        color: green,
        child: const Text('Goodbye!', style: big),
      ),
    ),
  ],
)
```

如果所有 `Row` 的子元件（children）都包裹在 `Expanded` 元件（Widgets）中，
每個 `Expanded` 的大小會根據其 flex 參數按比例分配，
之後每個 `Expanded` 元件會強制其子元件擁有
`Expanded` 的寬度。

換句話說，`Expanded` 會忽略其子元件的偏好寬度。

### 範例 27

<img src='/assets/images/docs/ui/layout/layout-27.png' alt="Example 27 layout">

<?code-excerpt "lib/main.dart (Example27)" replace="/(return |;)//g"?>
```dart
Row(
  children: [
    Flexible(
      child: Container(
        color: red,
        child: const Text(
          'This is a very long text that won\'t fit the line.',
          style: big,
        ),
      ),
    ),
    Flexible(
      child: Container(
        color: green,
        child: const Text('Goodbye!', style: big),
      ),
    ),
  ],
)
```

如果你使用 `Flexible` 取代 `Expanded`，唯一的差別在於 `Flexible` 允許其子元件（child）擁有與 `Flexible` 本身相同或更小的寬度，而 `Expanded` 則強制其子元件的寬度必須與 `Expanded` 完全相同。不過，`Expanded` 和 `Flexible` 在決定自身尺寸時，會忽略其子元件的寬度。

:::note
這表示無法根據子元件的尺寸，按比例擴展 `Row` 的子元件。`Row` 不是完全採用子元件的寬度，就是在你使用 `Expanded` 或 `Flexible` 時完全忽略它。
:::

### 範例 28

<img src='/assets/images/docs/ui/layout/layout-28.png' alt="Example 28 layout">

<?code-excerpt "lib/main.dart (Example28)" replace="/(return |;)//g"?>
```dart
Scaffold(
  body: Container(
    color: blue,
    child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
  ),
)
```

螢幕會強制 `Scaffold` 的大小必須與螢幕完全相同，因此 `Scaffold` 會填滿整個螢幕。
`Scaffold` 則告訴 `Container` 它可以是任何想要的大小，但不能超過螢幕的尺寸。

:::note
當一個元件 (Widget) 告訴其子元件可以比某個特定尺寸還小時，我們稱這個元件對其子元件提供了 _寬鬆_ 的限制（loose constraints）。之後會有更詳細的說明。
:::

### 範例 29

<img src='/assets/images/docs/ui/layout/layout-29.png' alt="Example 29 layout">

<?code-excerpt "lib/main.dart (Example29)" replace="/(return |;)//g"?>
```dart
Scaffold(
  body: SizedBox.expand(
    child: Container(
      color: blue,
      child: const Column(children: [Text('Hello!'), Text('Goodbye!')]),
    ),
  ),
)
```

如果你希望 `Scaffold` 的子元件（child）與 `Scaffold` 本身完全相同大小，你可以將其子元件包裹在 `SizedBox.expand` 中。

## 緊約束（Tight）與寬鬆約束（Loose Constraints）

你可能常常聽到某個約束是「緊的（tight）」或「寬鬆的（loose）」，那這到底是什麼意思呢？

### 緊約束（Tight Constraints）

_緊約束_ 只提供一種可能性，也就是一個確切的尺寸。換句話說，緊約束的最大寬度等於最小寬度，最大高度也等於最小高度。

舉個例子，`App` 元件（Widget），它被 [`RenderView`][`RenderView`] 類別所包含：應用程式的 [`build`][`build`] 函式所回傳的子元件所使用的方塊，會被給予一個約束，強制其完全填滿應用程式的內容區域（通常是整個螢幕）。

另一個例子：如果你在應用程式的 render tree 根部將一堆方塊彼此巢狀包裹，它們都會被緊約束強制，彼此完全貼合。

如果你打開 Flutter 的 `box.dart` 檔案並搜尋 `BoxConstraints` 建構子，你會找到以下內容：

```dart
BoxConstraints.tight(Size size)
   : minWidth = size.width,
     maxWidth = size.width,
     minHeight = size.height,
     maxHeight = size.height;
```

如果你回顧 [範例 2](#範例-2)，
畫面會強制紅色的 `Container`
與螢幕完全相同的尺寸。
螢幕之所以能做到這一點，是因為它將緊約束（tight constraints）
傳遞給 `Container`。

### 寬鬆約束（Loose constraints）

_寬鬆約束_ 指的是最小值為零且最大值不為零的約束。

有些盒子（box）會_放寬_傳入的約束，
也就是說會保留最大值，但移除最小值，
因此元件（Widget）可以有
**最小**寬度和高度都等於**零**。

最終，`Center` 的目的是將它從父元件
（螢幕）接收到的緊約束轉換為子元件
（`Container`）的寬鬆約束。

如果你回顧 [範例 3](#範例-3)，
`Center` 允許紅色的 `Container` 變得更小，
但不能比螢幕更大。

[`build`]: {{site.api}}/flutter/widgets/State/build.html
[`RenderView`]: {{site.api}}/flutter/rendering/RenderView-class.html

<a id="unbounded"></a>

## 無界約束（Unbounded constraints）

:::note
如果框架偵測到與盒子約束有關的問題，
你可能會被導向這裡。
下方的 `Flex` 章節也可能適用。
:::

在某些情況下，
盒子的約束是_無界_的，或稱為無限大。
這表示最大寬度或最大高度被設為 [`double.infinity`][`double.infinity`]。

當一個盒子嘗試盡可能變大時，
若遇到無界約束，將無法正常運作，
在偵錯模式下會拋出例外。

最常見的情況是，
一個 render box 在 flex box
（[`Row`][`Row`] 或 [`Column`][`Column`]）內，
**且在可捲動區域內**
（例如 [`ListView`][`ListView`] 及其他 [`ScrollView`][`ScrollView`] 子類別）時，
會遇到無界約束。

舉例來說，[`ListView`][`ListView`]
會嘗試在交叉方向上展開以填滿可用空間
（也許它是一個垂直捲動的區塊，並嘗試與父元件一樣寬）。
如果你將一個垂直捲動的 [`ListView`][`ListView`]
巢狀放在一個水平捲動的 `ListView` 內，
內層清單會嘗試變得盡可能寬，
而這個寬度是無限寬，
因為外層在那個方向上是可捲動的。

下一節將說明你可能在 `Flex` 元件遇到
無界約束時會遇到的錯誤。

## Flex

Flex 盒子（[`Row`][`Row`] 和 [`Column`][`Column`]）的行為
會根據其主要方向上的約束是有界還是無界而有所不同。

如果 flex 盒子在主要方向上有有界約束，
它會嘗試變得盡可能大。

如果 flex 盒子在主要方向上是無界約束，
它會嘗試將子元件放進那個空間內。
每個子元件的 `flex` 值必須設為零，
也就是說，當 flex 盒子位於另一個 flex 盒子或可捲動元件內時，
你不能使用 [`Expanded`][`Expanded`]；
否則會拋出例外。

_交叉_方向
（對 [`Column`][`Column`] 來說是寬度，對 [`Row`][`Row`] 來說是高度），
**絕對不能**是無界的，
否則將無法合理地對齊其子元件。

[`double.infinity`]: {{site.api}}/flutter/dart-core/double/infinity-constant.html
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html

## 學習特定元件的排版規則

了解一般的排版規則是必要的，但還不夠。

每個元件在應用一般規則時都有很大的自由度，
所以光看元件名稱是無法知道它的行為的。

如果你嘗試猜測，很可能會猜錯。
除非你讀過它的文件或研究過原始碼，
否則你無法確切知道某個元件的行為。

排版相關的原始碼通常很複雜，
所以閱讀文件可能會更好。
不過，如果你決定研究排版原始碼，
可以利用 IDE 的導覽功能輕鬆找到。

以下是一個範例：

* 在你的程式碼中找到一個 `Column`，並導覽到它的
  原始碼。你可以在 Android Studio 或 IntelliJ 中使用 `command+B`（macOS）
  或 `control+B`（Windows/Linux）來做到這一點。
  這會帶你到 `basic.dart` 檔案。
  由於 `Column` 繼承自 `Flex`，請再導覽到 `Flex`
  的原始碼（同樣在 `basic.dart`）。

* 向下捲動直到你找到名為
  `createRenderObject()` 的方法。如你所見，
  這個方法會回傳一個 `RenderFlex`。
  這就是 `Column` 的 render-object。
  現在導覽到 `RenderFlex` 的原始碼，
  你會來到 `flex.dart` 檔案。

* 向下捲動直到你找到名為
  `performLayout()` 的方法。這個方法
  就是負責 `Column` 排版的地方。

<img src='/assets/images/docs/ui/layout/layout-final.png' alt="A goodbye layout">

---

原文作者：Marcelo Glasberg

Marcelo 最初在 Medium 上發表了這篇內容，
標題為
[Flutter: The Advanced Layout Rule Even Beginners Must Know][article]。
我們非常喜歡這篇文章，並徵得他的同意後，
將其發表在 docs.flutter.dev。感謝 Marcelo！
你可以在 [GitHub][GitHub] 和 [pub.dev][pub.dev] 找到 Marcelo。

同時也感謝 [Simon Lightfoot][Simon Lightfoot]
為本文頂部設計了標題圖片。

[article]: {{site.medium}}/flutter-community/flutter-the-advanced-layout-rule-even-beginners-must-know-edc9516d1a2
[GitHub]: {{site.github}}/marcglasberg
[pub.dev]: {{site.pub}}/publishers/glasberg.dev/packages
[Simon Lightfoot]: {{site.github}}/slightfoot

:::note
若想更深入了解 Flutter 如何實作排版約束，
請參考以下 5 分鐘的影片：

{% ytEmbed 'jckqXR5CrPI', 'Decoding Flutter: Unbounded height and width' %}
:::
