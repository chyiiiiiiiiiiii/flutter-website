---
title: 將 AnimationSheetBuilder.display 替換為 collate
description: >
  AnimationSheetBuilder.display 與 sheetSize
  已棄用，建議改用 collate。
---

{% render docs/breaking-changes.md %}

## 摘要

`AnimationSheetBuilder.display` 與 `sheetSize`
方法已被棄用，應改為使用
`AnimationSheetBuilder.collate`。

## 背景說明

[`AnimationSheetBuilder`][`AnimationSheetBuilder`] 是一個測試工具類別，
用於記錄動畫元件（Widget）的每一幀，
並將這些幀合成為一張動畫圖表（animation sheet），
以進行 [golden testing][golden testing]。舊的合成方式是利用 `display`
將圖片以表格形式排列到類似表格的元件中，
並透過 `sheetSize` 調整測試畫布大小，
最後擷取該表格元件進行比對。新的方式 `collate`
則是直接將所有幀合併成一張圖片進行比對，
這樣不僅減少了樣板程式碼，產生的圖片也更小，
而且畫質不受影響。因此，舊有的 API 已被棄用。

`collate` 之所以能產生更小的圖片，
是因為舊方式會在像素比例為 3.0 的測試畫布上擷取，
也就是說，會用 3x3 的相同顏色像素區塊來表示 1 個實際像素，
導致產生的圖片大小是必要的 9 倍（PNG 壓縮前）。

## 變更說明

[`AnimationSheetBuilder`][`AnimationSheetBuilder`] 類別做了以下變更：

* 'display' 已被棄用，請勿再使用
* 'sheetSize' 已被棄用，請勿再使用

## 遷移指南

若要遷移至新 API，請將設定畫布大小與顯示元件的流程，
改為使用 [`AnimationSheetBuilder.collate`][`AnimationSheetBuilder.collate`]。

### 計算每列格數（cells per row）

`collate` 需要明確指定 `cellsPerRow`
參數，也就是輸出圖片中每列的幀數。
這個數值可以手動計算，
也可以依下列方式計算：

* 找出建構 `AnimationSheetBuilder` 時所設定的單幀寬度。
  例如，下方程式片段中設定為 80：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(80, 30));
```

* 找出 surface size（表面尺寸）的寬度，這個值是在設定 surface size 時指定的；預設值為 800。
  例如，在以下程式碼片段中，它的值是 600：

```dart
tester.binding.setSurfaceSize(animationSheet.sheetSize(600));
```

* 每列的 frame 數應該是將這兩個數字相除後，向下取整的結果。例如，
  600 / 80 = 7（向下取整），因此

```dart
animationSheet.collate(7)
```

### 遷移程式碼

遷移前的程式碼：

```dart
  testWidgets('Indeterminate CircularProgressIndicator', (WidgetTester tester) async {
    final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(40, 40));

    await tester.pumpFrames(animationSheet.record(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: Padding(
          padding: EdgeInsets.all(4),
          child: CircularProgressIndicator(),
        ),
      ),
    ), const Duration(seconds: 2));

    // The code starting here needs migration.

    tester.binding.setSurfaceSize(animationSheet.sheetSize());

    final Widget display = await animationSheet.display();
    await tester.pumpWidget(display);

    await expectLater(
      find.byWidget(display),
      matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
    );
  }, skip: isBrowser); // https://github.com/flutter/flutter/issues/42767
```

遷移後的程式碼（`cellsPerRow` 為 20，來源自 800 / 40）：

```dart
  testWidgets('Indeterminate CircularProgressIndicator', (WidgetTester tester) async {
    final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(40, 40));

    await tester.pumpFrames(animationSheet.record(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: Padding(
          padding: EdgeInsets.all(4),
          child: CircularProgressIndicator(),
        ),
      ),
    ), const Duration(seconds: 2));

    await expectLater(
      animationSheet.collate(20),
      matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
    );
  }, skip: isBrowser); // https://github.com/flutter/flutter/issues/42767
```

預期相關的 golden test 參考圖片會失效，這些圖片都應該更新。新產生的圖片除了縮放為原來的 1/3 外，應與舊圖片完全相同。

## 時程

合併於版本：v2.3.0-13.0.pre<br>  
穩定版發行：2.5

## 參考資料

API 文件：

* [`AnimationSheetBuilder`][`AnimationSheetBuilder`]
* [`AnimationSheetBuilder.collate`][`AnimationSheetBuilder.collate`]

相關 PR：

* [Test WidgetTester handling test pointers][Test WidgetTester handling test pointers]

[`AnimationSheetBuilder`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder-class.html
[`AnimationSheetBuilder.collate`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder/collate.html
[golden testing]: {{site.api}}/flutter/flutter_test/matchesGoldenFile.html
[Test WidgetTester handling test pointers]: {{site.repo.flutter}}/pull/83337
