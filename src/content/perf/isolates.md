---
title: 並行與 isolates
description: 在 Flutter 中使用 Dart isolates 進行多執行緒處理。
---

<?code-excerpt path-base="perf/concurrency/isolates/"?>

所有 Dart 程式碼都在 [isolates]({{site.dart-site}}/language/concurrency)（隔離區）中執行，
isolates 類似於執行緒（threads），
但不同之處在於 isolates 擁有各自獨立的記憶體空間。
它們之間完全不共享狀態，
只能透過訊息傳遞進行溝通。
預設情況下，
Flutter 應用程式的所有工作都在單一 isolate——
也就是主 isolate（main isolate）上執行。
在大多數情況下，這種模型讓程式設計更簡單，
而且速度足夠快，不會讓應用程式的 UI 變得無回應。

不過有時候，
應用程式需要執行非常大量的運算，
這可能導致「UI 卡頓」（jank，畫面不順暢）。
如果你的應用因為這個原因產生卡頓，
你可以將這些運算移到輔助 isolate 執行。
這樣可以讓底層執行環境
同時處理運算與主 UI isolate 的工作，
並充分利用多核心裝置的效能。

每個 isolate 都有自己的記憶體
以及自己的事件迴圈（event loop）。
事件迴圈會依照事件加入事件佇列（event queue）的順序來處理它們。
在主 isolate 上，
這些事件可能包括處理使用者在 UI 上的點擊、
執行某個函式、
或是在螢幕上繪製一個畫面（frame）。
下圖展示了一個事件佇列的範例，
有 3 個事件正在等待處理。

![The main isolate diagram](/assets/images/docs/development/concurrency/basics-main-isolate.png){:width="50%" .diagram-wrap}

為了讓畫面渲染流暢，
Flutter 會在事件佇列中每秒加入 60 次「繪製畫面」（paint frame）事件（針對 60Hz 裝置）。
如果這些事件未能及時處理，
應用程式就會出現 UI 卡頓，
甚至更嚴重時，
整個應用會變得無回應。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

每當某個處理無法在兩個畫面之間的間隔（frame gap）內完成時，
建議將這項工作移到另一個 isolate 執行，
以確保主 isolate 能夠維持每秒 60 幀（frames）。
當你在 Dart 中建立一個新的 isolate 時，
它可以與主 isolate 並行處理工作，
而不會阻塞主 isolate。

你可以在 Dart 官方文件的
[concurrency page][concurrency page]
進一步了解 isolates 與事件迴圈的運作方式。

[concurrency page]: {{site.dart-site}}/language/concurrency

{% ytEmbed 'vl_AaCgudcY', 'Isolates and the event loop | Flutter in Focus' %}

## isolates 的常見使用情境

只有一個明確的規則需要遵守：當大量運算導致 Flutter 應用程式
出現 UI 卡頓時，就應該考慮使用 isolates。
這種卡頓發生在任何運算超過 Flutter 畫面間隔（frame gap）時。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

任何處理程序都有可能需要較長時間才能完成，
這取決於實作方式
以及輸入資料，
因此無法列出所有需要考慮使用 isolates 的完整情境。

儘管如此，isolates 常見的應用包括：

- 從本地資料庫讀取資料
- 發送推播通知（push notifications）
- 解析與解碼大型資料檔案
- 處理或壓縮照片、音訊檔與影片檔
- 轉換音訊與影片檔案
- 使用 FFI 時需要非同步支援
- 對複雜清單或檔案系統進行過濾處理

## isolates 之間的訊息傳遞

Dart 的 isolates 是 [Actor model][Actor model]（演員模型）的實作。
它們只能透過訊息傳遞來互相溝通，
這是透過 [`Port` 物件][`Port` objects] 來完成的。
當訊息在 isolates 之間「傳遞」時，
通常會將訊息從發送 isolate 複製到
接收 isolate。
這表示任何傳遞給 isolate 的值，
即使在該 isolate 上被修改，
也不會影響原本 isolate 上的值。

唯一[在傳遞時不會被複製的物件][objects that aren't copied when passed]
是不可變物件（immutable objects），
例如 String 或不可修改的位元組（byte）。
當你在 isolates 之間傳遞不可變物件時，
會將該物件的參考（reference）透過 port 傳遞，
而不是複製物件本身，
以提升效能。
由於不可變物件無法被修改，
這仍然符合演員模型的行為。

[`Port` objects]: {{site.dart.api}}/dart-isolate/ReceivePort-class.html
[objects that aren't copied when passed]: {{site.dart.api}}/dart-isolate/SendPort/send.html

這條規則的例外情況是
當 isolate 使用 `Isolate.exit` 方法發送訊息並結束時。
因為發送 isolate 在發送訊息後就不再存在，
它可以將訊息的所有權從一個 isolate 轉移到另一個 isolate，
確保只有一個 isolate 能夠存取該訊息。

最底層的兩個訊息傳遞原語是 `SendPort.send`，
它會在傳送時複製可變訊息，
以及 `Isolate.exit`，
它會傳遞訊息的參考。
`Isolate.run` 和 `compute`
在底層都是使用 `Isolate.exit` 實作的。

## 短暫存在的 isolates

在 Flutter 中，將處理程序移到 isolate 最簡單的方法是使用
`Isolate.run` 方法。
這個方法會建立一個新的 isolate，
將回呼函式（callback）傳給新建立的 isolate 執行運算，
運算完成後回傳結果，
並在運算完成時關閉該 isolate。
這一切都會與主 isolate 並行進行，
不會阻塞主 isolate。

![Isolate diagram](/assets/images/docs/development/concurrency/isolate-bg-worker.png){:width="70%" .diagram-wrap}

`Isolate.run` 方法需要一個參數，
也就是一個回呼函式，
這個函式會在新的 isolate 上執行。
這個回呼函式的簽名必須有且僅有
一個必要且未命名的參數。
當運算完成時，
會將回呼函式的回傳值傳回主 isolate，
並結束新建立的 isolate。

舉例來說，
以下這段程式碼會從檔案載入一個大型 JSON blob，
並將該 JSON 轉換為自訂的 Dart 物件。
如果 JSON 解碼過程沒有被移到新的 isolate 執行，
這個方法可能會導致 UI
在數秒內無法回應。

<?code-excerpt "lib/main.dart (isolate-run)"?>
```dart
// Produces a list of 211,640 photo objects.
// (The JSON file is ~20MB.)
Future<List<Photo>> getPhotos() async {
  final String jsonString = await rootBundle.loadString('assets/photos.json');
  final List<Photo> photos = await Isolate.run<List<Photo>>(() {
    final List<Object?> photoData = jsonDecode(jsonString) as List<Object?>;
    return photoData.cast<Map<String, Object?>>().map(Photo.fromJson).toList();
  });
  return photos;
}
```

如需完整的 Isolates 背景解析 JSON 的操作步驟，請參考[這個 cookbook 範例][this cookbook recipe]。

[this cookbook recipe]: /cookbook/networking/background-parsing

## 有狀態、長時間存活的 isolates

短生命週期的 isolate 使用起來相當方便，
但每次建立新 isolate 以及在不同 isolate 間複製物件都會有額外的效能負擔。
如果你需要重複使用 `Isolate.run` 進行相同的運算，
那麼建立不會立即結束的 isolate，效能可能會更好。

要達成這個目的，你可以使用一些較低階的 isolate 相關 API，
這些 API 是被 `Isolate.run` 所抽象化的：

- [`Isolate.spawn()`][`Isolate.spawn()`] 和 [`Isolate.exit()`][`Isolate.exit()`]
- [`ReceivePort`][`ReceivePort`] 和 [`SendPort`][`SendPort`]
- [`send()`][`send()`] 方法

當你使用 `Isolate.run` 方法時，
新建立的 isolate 會在向主 isolate 傳回單一訊息後立即關閉。
有時候，你會需要長時間存活的 isolate，
讓它們能夠在一段時間內彼此傳遞多個訊息。
在 Dart 中，你可以透過 Isolate API 以及 Port 來實現這個需求。
這類長時間存活的 isolate 通常被稱為 _背景工作者_（background workers）。

長時間存活的 isolate 特別適合需要在應用程式生命週期內重複執行的特定程序，
或是需要在一段時間內執行並多次將結果回傳給主 isolate 的處理流程。

另外，你也可以使用 [worker_manager][worker_manager] 來管理長時間存活的 isolate。

[worker_manager]: {{site.pub-pkg}}/worker_manager

### ReceivePorts 與 SendPorts

要在 isolates 之間建立長時間的通訊，可以透過兩個類別
（除了 Isolate 之外）：
[`ReceivePort`][`ReceivePort`] 和 [`SendPort`][`SendPort`]。
這些 port 是 isolates 之間唯一能夠互相通訊的方式。

`Ports` 的行為類似於 `Streams`，
也就是 `StreamController`
或 `Sink` 會在一個 isolate 中被建立，
而監聽器則會在另一個 isolate 中設置。
在這個比喻中，
`StreamConroller` 被稱為 `SendPort`，
你可以透過 `send()` 方法「新增」訊息。
`ReceivePort` 則是監聽端，
當這些監聽器收到新訊息時，
會以該訊息作為參數呼叫預先提供的 callback。

如需詳細說明如何在主 isolate 與工作 isolate 之間建立雙向通訊，
請參考 [Dart 文件][Dart documentation] 中的範例。

[Dart documentation]: {{site.dart-site}}/language/concurrency

## 在 isolates 中使用平台插件

自 Flutter 3.7 起，你可以在背景 isolate 中使用平台插件。
這讓你有更多可能性，能將需要大量運算且依賴平台的處理流程，移到不會阻塞 UI 的 isolate 執行。
舉例來說，假設你要使用原生主機 API 進行資料加密
（例如在 Android 上使用 Android API、在 iOS 上使用 iOS API 等）。
過去，[將資料封送（marshaling data）][marshaling data] 到主平台會浪費 UI 執行緒的時間，
現在則可以在背景 isolate 中完成。

平台通道 isolate 會使用 [`BackgroundIsolateBinaryMessenger`][`BackgroundIsolateBinaryMessenger`] API。
以下程式片段展示了如何在背景 isolate 中
使用 `shared_preferences` 套件的範例。

<?code-excerpt "lib/isolate_binary_messenger.dart"?>
```dart
import 'dart:isolate';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  // Identify the root isolate to pass to the background isolate.
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;
  Isolate.spawn(_isolateMain, rootIsolateToken);
}

Future<void> _isolateMain(RootIsolateToken rootIsolateToken) async {
  // Register the background isolate with the root isolate.
  BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);

  // You can now use the shared_preferences plugin.
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();

  print(sharedPreferences.getBool('isDebug'));
}
```

## Isolate 的限制

如果你是從具有多執行緒（multithreading）功能的語言轉向 Dart，你可能會預期 isolates（隔離區）會像執行緒一樣運作，但實際上並非如此。每個 isolate 都有自己的全域欄位，並且只能透過訊息傳遞來進行溝通，這確保了某個 isolate 中的可變物件只會在單一 isolate 內被存取。因此，isolate 只能存取自己的記憶體。舉例來說，如果你的應用程式有一個名為 `configuration` 的全域可變變數，當你建立新的 isolate 時，它會被複製為該 isolate 的新全域欄位。如果你在新建立的 isolate 內變更這個變數，主 isolate 內的變數則不會受到影響。即使你將 `configuration` 物件作為訊息傳遞給新 isolate，這個情況依然成立。這正是 isolates 的設計原理，因此在考慮使用 isolates 時，請務必記住這一點。

### Web 平台與 compute

Dart 的 Web 平台（包含 Flutter Web）並不支援 isolates。如果你的 Flutter 應用程式目標是 Web，可以使用 `compute` 方法來確保你的程式碼能順利編譯。[`compute()`][`compute()`] 方法會在 Web 上於主執行緒執行運算，但在行動裝置上則會建立新執行緒。在行動裝置與桌面平台上，`await compute(fun, message)` 等同於 `await Isolate.run(() => fun(message))`。

若需進一步了解 Web 上的並行處理，請參閱 dart.dev 上的 [concurrency documentation][concurrency documentation]。

[concurrency documentation]: {{site.dart-site}}/language/concurrency

### 無法存取 `rootBundle` 或呼叫 `dart:ui` 方法

所有 UI 任務以及 Flutter 本身都與主 isolate 綁定。因此，你無法在新建立的 isolates 中使用 `rootBundle` 來存取資源（Assets），也無法在這些 isolates 內進行任何元件（Widget）或 UI 相關的操作。

### 從主機平台到 Flutter 的 plugin 訊息有限

透過背景 isolate 的平台通道（platform channels），你可以在 isolates 中使用平台通道向主機平台（例如 Android 或 iOS）傳送訊息，並接收這些訊息的回應。然而，你無法從主機平台接收未經請求的訊息。

舉例來說，你無法在背景 isolate 中建立長時間運作的 Firestore 監聽器，因為 Firestore 會使用平台通道主動推送更新給 Flutter，這類訊息屬於未經請求的訊息。不過，你仍然可以在背景中查詢 Firestore 以取得回應。

## 更多資訊

若需進一步了解 isolates，請參考以下資源：

- 如果你需要使用多個 isolates，請考慮 Flutter 中的 [IsolateNameServer][IsolateNameServer] 類別，或是針對非 Flutter Dart 應用程式使用提供相同功能的 pub 套件。
- Dart 的 isolates 是 [Actor model][Actor model] 的一種實作。
- [isolate_agents][isolate_agents] 是一個將 Port 抽象化、讓建立長時間運作的 isolates 更容易的套件。
- 閱讀更多關於 `BackgroundIsolateBinaryMessenger` API 的[公告][announcement]。

[announcement]: {{site.flutter-medium}}/introducing-background-isolate-channels-7a299609cad8
[Actor model]: https://en.wikipedia.org/wiki/Actor_model
[isolate_agents]: {{site.medium}}/@gaaclarke/isolate-agents-easy-isolates-for-flutter-6d75bf69a2e7
[marshaling data]: https://en.wikipedia.org/wiki/Marshalling_(computer_science)
[`compute()`]: {{site.api}}/flutter/foundation/compute.html
[`Isolate.spawn()`]: {{site.dart.api}}/dart-isolate/Isolate/spawn.html
[`Isolate.exit()`]: {{site.dart.api}}/dart-isolate/Isolate/exit.html
[`ReceivePort`]: {{site.dart.api}}/dart-isolate/ReceivePort-class.html
[`SendPort`]: {{site.dart.api}}/dart-isolate/SendPort-class.html
[`send()`]: {{site.dart.api}}/dart-isolate/SendPort/send.html
[`BackgroundIsolateBinaryMessenger`]: {{site.api}}/flutter/services/BackgroundIsolateBinaryMessenger-class.html
[IsolateNameServer]: {{site.api}}/flutter/dart-ui/IsolateNameServer-class.html
