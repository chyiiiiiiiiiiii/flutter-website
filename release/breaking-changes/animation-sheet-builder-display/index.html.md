# 將 AnimationSheetBuilder.display 替換為 collate

> AnimationSheetBuilder.display 與 sheetSize 已棄用，請改用 collate。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`AnimationSheetBuilder.display` 和 `sheetSize` 方法已被棄用，應改為使用 `AnimationSheetBuilder.collate`。

## 背景說明

[`AnimationSheetBuilder`][] 是一個測試工具類別，用於記錄動畫元件 (Widget) 的各個畫格，並將這些畫格組合成單一動畫圖表（animation sheet），以進行 [golden testing][]。舊的組合方式是透過 `display`，將多張圖片以表格形式排列到一個類似表格的元件（Widget）中，並利用 `sheetSize` 調整測試畫布大小，最後擷取該表格元件進行比對。新的方式 `collate`，則是直接將所有畫格合併成一張圖片進行比對，這樣不僅減少樣板程式碼（boilerplate），也能產生更小的圖片檔案，且畫質不受影響。因此，舊有的 API 已被棄用。

`collate` 之所以能產生更小的圖片，是因為舊方法會在像素比（pixel ratio）為 3.0 的測試畫布上擷取圖片，這代表每個實際像素會以 3x3 相同顏色的像素區塊呈現，導致圖片大小比實際需求大 9 倍（PNG 壓縮前）。

## 變更說明

[`AnimationSheetBuilder`][] 類別做出了以下變更：

* 'display' 已被棄用，請勿再使用
* 'sheetSize' 已被棄用，請勿再使用

## 遷移指南

要遷移至新 API，請將設定畫布大小與顯示元件（Widget）的流程，改為使用 [`AnimationSheetBuilder.collate`][]。

### 計算每列的畫格數量

`collate` 需要明確指定 `cellsPerRow` 參數，也就是輸出圖片每列的畫格（frame）數量。這個數量可以手動計算，或者依下列方式計算：

* 找出畫格的寬度，這個值是在建立 `AnimationSheetBuilder` 時指定的。例如，以下程式碼片段中為 80：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(80, 30));
```

* 找出 surface size（表面尺寸）的寬度，這個值是在設定 surface size 時指定的；預設值為 800。
  例如，在以下程式碼片段中，此值為 600：

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

遷移後的程式碼（`cellsPerRow` 為 20，來源為 800 / 40）：

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

預期相關的 golden test 參考圖片會失效，這些圖片都應該更新。新的圖片除了縮放為原來的 1/3 外，應該與舊圖片完全相同。

## 時程

合併於版本：v2.3.0-13.0.pre<br>
穩定版釋出：2.5

## 參考資料

API 文件：

* [`AnimationSheetBuilder`][]
* [`AnimationSheetBuilder.collate`][]

相關 PR：

* [Test WidgetTester handling test pointers][]

[`AnimationSheetBuilder`]: https://api.flutter.dev/flutter/flutter_test/AnimationSheetBuilder-class.html
[`AnimationSheetBuilder.collate`]: https://api.flutter.dev/flutter/flutter_test/AnimationSheetBuilder/collate.html
[golden testing]: https://api.flutter.dev/flutter/flutter_test/matchesGoldenFile.html
[Test WidgetTester handling test pointers]: https://github.com/flutter/flutter/pull/83337

