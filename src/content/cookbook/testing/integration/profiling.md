---
title: 使用整合測試量測效能
description: 如何為 Flutter 應用程式進行效能分析。
---

<?code-excerpt path-base="cookbook/testing/integration/profiling/"?>

對於行動應用程式來說，效能對使用者體驗至關重要。
使用者期望應用程式能夠順暢滾動，並擁有流暢且無卡頓或掉幀（俗稱「jank」）的動畫。
那麼，如何確保你的應用程式在各種裝置上都能避免 jank 呢？

有兩種選擇：首先，可以在不同裝置上手動測試應用程式。
這種方式對於小型應用程式或許可行，但隨著應用程式規模擴大，這種做法會變得越來越繁瑣。
另一種方式是執行一個整合測試，讓它執行特定任務並記錄效能時序（performance timeline）。
然後，檢查結果以判斷應用程式的特定區段是否需要優化。

在本教學中，你將學會如何撰寫一個測試，在執行特定任務時記錄效能時序，並將結果摘要儲存到本機檔案中。

:::note
效能時序記錄不支援 Web 平台。
如需在 Web 上進行效能分析，請參閱
[Debugging performance for web apps][Debugging performance for web apps]
:::

本教學包含以下步驟：

  1. 撰寫一個測試，滾動瀏覽一個項目清單。
  2. 記錄應用程式的效能。
  3. 將結果儲存到磁碟。
  4. 執行測試。
  5. 檢視結果。

## 1. 撰寫一個滾動瀏覽項目清單的測試

在本教學中，將記錄應用程式在滾動瀏覽項目清單時的效能。
為了專注於效能分析，本教學是以元件測試（widget tests）中的 [Scrolling][Scrolling] 教學為基礎。

請依照該教學的指示建立應用程式，並撰寫測試以驗證一切如預期運作。

## 2. 記錄應用程式的效能

接下來，記錄應用程式在滾動瀏覽清單時的效能。
你可以使用 [`traceAction()`][`traceAction()`] 方法，該方法由 [`IntegrationTestWidgetsFlutterBinding`][`IntegrationTestWidgetsFlutterBinding`] 類別提供。

此方法會執行所提供的函式，並記錄一個 [`Timeline`][`Timeline`]，
其中包含應用程式效能的詳細資訊。
本範例提供了一個函式，用來滾動瀏覽項目清單，確保特定項目被顯示。
當該函式執行完畢時，`traceAction()` 會建立一個包含 `Timeline` 的報告資料 `Map`。

當你要執行多個 `traceAction` 時，請指定 `reportKey`。
預設情況下，所有 `Timelines` 都會以鍵值 `timeline` 儲存，
在本範例中，`reportKey` 被更改為 `scrolling_timeline`。

<?code-excerpt "integration_test/scrolling_test.dart (traceAction)"?>
```dart
await binding.traceAction(() async {
  // Scroll until the item to be found appears.
  await tester.scrollUntilVisible(
    itemFinder,
    500.0,
    scrollable: listFinder,
  );
}, reportKey: 'scrolling_timeline');
```

## 3. 將結果儲存到磁碟

現在你已經擷取了效能時序（performance timeline），接下來需要一種方式來檢視這些資料。
`Timeline` 物件會提供所有事件的詳細資訊，
但它本身並沒有提供方便檢視結果的方式。

因此，請將 `Timeline` 轉換為 [`TimelineSummary`][`TimelineSummary`]。
`TimelineSummary` 可以執行兩項任務，讓你更容易檢視結果：

  1. 將摘要資料寫入磁碟上的 JSON 文件，內容來自 `Timeline`。
     此摘要包含略過的畫格數量、最慢的建構時間等資訊。
  2. 將完整的 `Timeline` 以 JSON 檔案形式儲存到磁碟。
     這個檔案可以使用 Chrome 瀏覽器的
     tracing 工具（可在 `chrome://tracing` 找到）開啟。

要擷取結果，請在 `test_driver` 資料夾中建立一個名為 `perf_driver.dart` 的檔案，
並加入以下程式碼：

<?code-excerpt "test_driver/perf_driver.dart"?>
```dart
import 'package:flutter_driver/flutter_driver.dart' as driver;
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() {
  return integrationDriver(
    responseDataCallback: (data) async {
      if (data != null) {
        final timeline = driver.Timeline.fromJson(
          data['scrolling_timeline'] as Map<String, dynamic>,
        );

        // Convert the Timeline into a TimelineSummary that's easier to
        // read and understand.
        final summary = driver.TimelineSummary.summarize(timeline);

        // Then, write the entire timeline to disk in a json format.
        // This file can be opened in the Chrome browser's tracing tools
        // found by navigating to chrome://tracing.
        // Optionally, save the summary to disk by setting includeSummary
        // to true
        await summary.writeTimelineToFile(
          'scrolling_timeline',
          pretty: true,
          includeSummary: true,
        );
      }
    },
  );
}
```

`integrationDriver` 函式具有 `responseDataCallback`，您可以自訂其行為。  
預設情況下，它會將結果寫入 `integration_response_data.json` 檔案，  
但您也可以像本範例一樣自訂，產生摘要報告。

## 4. 執行測試

在設定測試以擷取效能 `Timeline` 並將結果摘要儲存到磁碟後，請使用下列指令執行測試：

```console
flutter drive \
  --driver=test_driver/perf_driver.dart \
  --target=integration_test/scrolling_test.dart \
  --profile
```

`--profile` 選項代表將應用程式以「profile 模式」編譯，而非「debug 模式」，這樣基準測試的結果會更接近最終用戶實際體驗的情況。

:::note
當你在行動裝置或模擬器上執行時，請加上 `--no-dds` 執行指令。
這個選項會停用 Dart Development Service (DDS)，因為從你的電腦將無法存取 DDS。
:::

## 5. 檢視結果

當測試成功完成後，專案根目錄下的 `build` 目錄會包含兩個檔案：

  1. `scrolling_summary.timeline_summary.json` 包含摘要。你可以使用任何文字編輯器開啟這個檔案，檢視其中的資訊。如果有更進階的設定，你可以在每次測試執行時都儲存一份摘要，並繪製結果圖表。
  2. `scrolling_timeline.timeline.json` 則包含完整的時間軸資料。
     請使用 Chrome 瀏覽器的追蹤工具（tracing tools）開啟這個檔案，該工具位於 `chrome://tracing`。追蹤工具提供方便的介面，讓你檢查時間軸資料，進而找出效能問題的來源。

### 摘要範例

```json
{
  "average_frame_build_time_millis": 4.2592592592592595,
  "worst_frame_build_time_millis": 21.0,
  "missed_frame_build_budget_count": 2,
  "average_frame_rasterizer_time_millis": 5.518518518518518,
  "worst_frame_rasterizer_time_millis": 51.0,
  "missed_frame_rasterizer_budget_count": 10,
  "frame_count": 54,
  "frame_build_times": [
    6874,
    5019,
    3638
  ],
  "frame_rasterizer_times": [
    51955,
    8468,
    3129
  ]
}
```

## 完整範例

**integration_test/scrolling_test.dart**

<?code-excerpt "integration_test/scrolling_test.dart" replace="/your_integration_test/your_package/g;"?>
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:your_package/main.dart';

void main() {
  final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Counter increments smoke test', (tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MyApp(items: List<String>.generate(10000, (i) => 'Item $i')),
    );

    final listFinder = find.byType(Scrollable);
    final itemFinder = find.byKey(const ValueKey('item_50_text'));

    await binding.traceAction(() async {
      // Scroll until the item to be found appears.
      await tester.scrollUntilVisible(
        itemFinder,
        500.0,
        scrollable: listFinder,
      );
    }, reportKey: 'scrolling_timeline');
  });
}
```

**test_driver/perf_driver.dart**

<?code-excerpt "test_driver/perf_driver.dart"?>
```dart
import 'package:flutter_driver/flutter_driver.dart' as driver;
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() {
  return integrationDriver(
    responseDataCallback: (data) async {
      if (data != null) {
        final timeline = driver.Timeline.fromJson(
          data['scrolling_timeline'] as Map<String, dynamic>,
        );

        // Convert the Timeline into a TimelineSummary that's easier to
        // read and understand.
        final summary = driver.TimelineSummary.summarize(timeline);

        // Then, write the entire timeline to disk in a json format.
        // This file can be opened in the Chrome browser's tracing tools
        // found by navigating to chrome://tracing.
        // Optionally, save the summary to disk by setting includeSummary
        // to true
        await summary.writeTimelineToFile(
          'scrolling_timeline',
          pretty: true,
          includeSummary: true,
        );
      }
    },
  );
}
```


[`IntegrationTestWidgetsFlutterBinding`]: {{site.api}}/flutter/package-integration_test_integration_test/IntegrationTestWidgetsFlutterBinding-class.html  
[Scrolling]: /cookbook/testing/widget/scrolling  
[`Timeline`]: {{site.api}}/flutter/flutter_driver/Timeline-class.html  
[`TimelineSummary`]: {{site.api}}/flutter/flutter_driver/TimelineSummary-class.html  
[`traceAction()`]: {{site.api}}/flutter/flutter_driver/FlutterDriver/traceAction.html  
[Debugging performance for web apps]: /perf/web-performance
