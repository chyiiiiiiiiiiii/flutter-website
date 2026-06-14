# 顯示 Cupertino sheet

> 如何實作 Cupertino sheet 來顯示訊息與內容。



<?code-excerpt path-base="cookbook/design/cupertino_sheets/"?>

Cupertino sheet 是一種 iOS 風格的模態底部 sheet，
用於呈現內容或選項。
它從螢幕底部向上滑入，
並可向下拉動以關閉。

在 Flutter 中，這項功能由 [`showCupertinoSheet`][] 負責處理。
本教學使用以下步驟實作 Cupertino sheet：

  1. 建立 `CupertinoApp` 或 `MaterialApp`。
  2. 顯示 sheet 內容。

## 1. 建立 `CupertinoApp`

建立遵循 iOS 設計規範的應用程式時，
可以使用 `CupertinoApp`。
以下範例在螢幕中央提供一個按鈕，
用來觸發模態視窗。

<?code-excerpt "lib/main.dart (CupertinoSheetDemo)"?>
```dart
class CupertinoSheetDemo extends StatelessWidget {
  const CupertinoSheetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'CupertinoSheet Demo',
      home: CupertinoSheetPage(),
    );
  }
}
```

## 2. 顯示 sheet 內容

完成基本應用程式結構後，顯示 sheet。
呼叫 `showCupertinoSheet` 並提供 `scrollableBuilder`，
它會回傳 sheet 的內容，例如 `SingleChildScrollView`。

<?code-excerpt "lib/main.dart (ShowCupertinoSheet)"?>
```dart
showCupertinoSheet(
  context: context,
  scrollableBuilder: (context, scrollController) {
    return SingleChildScrollView(
      controller: scrollController,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const SizedBox(height: 100),
            const Text('This is a Cupertino sheet'),
            const SizedBox(height: 20),
            CupertinoButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  },
);
```

## 互動範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter CupertinoSheet hands-on example in DartPad" run="true"
import 'package:flutter/cupertino.dart';

void main() => runApp(const CupertinoSheetDemo());

class CupertinoSheetDemo extends StatelessWidget {
  const CupertinoSheetDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return const CupertinoApp(
      title: 'CupertinoSheet Demo',
      home: CupertinoSheetPage(),
    );
  }
}

class CupertinoSheetPage extends StatelessWidget {
  const CupertinoSheetPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('CupertinoSheet Demo'),
      ),
      child: Center(
        child: CupertinoButton.filled(
          onPressed: () {
            showCupertinoSheet(
              context: context,
              scrollableBuilder: (context, scrollController) {
                return SingleChildScrollView(
                  controller: scrollController,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        const SizedBox(height: 100),
                        const Text('This is a Cupertino sheet'),
                        const SizedBox(height: 20),
                        CupertinoButton(
                          child: const Text('Close'),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          },
          child: const Text('Show Sheet'),
        ),
      ),
    );
  }
}
```

[`showCupertinoSheet`]: https://api.flutter.dev/flutter/cupertino/showCupertinoSheet.html

