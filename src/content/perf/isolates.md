---
title: 並行與 isolates
description: 在 Flutter 中使用 Dart isolates 進行多執行緒處理。
---

<?code-excerpt path-base="perf/concurrency/isolates/"?>

所有 Dart 程式碼都在 [isolate]({{site.dart-site}}/language/concurrency) 中執行，
其概念類似於執行緒（threads），
但不同之處在於 isolates 擁有各自獨立的記憶體空間。
它們之間不會以任何方式共享狀態，
只能透過訊息傳遞進行溝通。
預設情況下，
Flutter 應用程式的所有工作都在單一 isolate——
也就是主 isolate——上執行。
在大多數情況下，這種模型讓程式設計更簡單，
而且速度足夠快，不會讓應用程式的 UI 變得沒有回應。

不過有時候，
應用程式需要執行特別龐大的運算，
這可能會導致「UI 卡頓」（畫面不順暢）。
如果你的應用程式因為這個原因而出現卡頓，
你可以將這些運算移到輔助 isolate 執行。
這樣可以讓底層執行環境
將運算與主 UI isolate 的工作同時進行，
並善用多核心裝置的效能。

每個 isolate 都有自己的記憶體
以及自己的事件迴圈（event loop）。
事件迴圈會依照事件加入事件佇列（event queue）的順序來處理事件。
在主 isolate 上，
這些事件可能包含處理使用者在 UI 上的點擊、
執行某個函式、
或是在螢幕上繪製一個畫面等。
下圖展示了一個事件佇列的範例，
有三個事件正在等待被處理。

![The main isolate diagram](/assets/images/docs/development/concurrency/basics-main-isolate.png){:width="50%" .diagram-wrap}

為了讓畫面順暢渲染，
Flutter 會每秒 60 次（針對 60Hz 裝置）將「繪製畫面」事件加入事件佇列。
如果這些事件未能及時被處理，
應用程式就會出現 UI 卡頓，
甚至更嚴重時，
整個應用程式會變得完全沒有回應。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

每當某個處理無法在兩個畫面之間的間隔（frame gap）內完成時，
就建議將這項工作移到另一個 isolate 執行，
以確保主 isolate 能夠維持每秒 60 幀的產出。
當你在 Dart 中產生（spawn）一個 isolate 時，
它可以與主 isolate 同時處理工作，
而不會阻塞主 isolate。

你可以在 Dart 文件的
[concurrency page][concurrency page]
閱讀更多關於 isolates 與事件迴圈運作的細節。

[concurrency page]: {{site.dart-site}}/language/concurrency

{% ytEmbed 'vl_AaCgudcY', 'Isolates and the event loop | Flutter in Focus' %}

## isolates 的常見使用情境

只有一個明確的規則需要遵守：當龐大的運算導致你的 Flutter 應用程式
出現 UI 卡頓時，就應該使用 isolates。
這種卡頓發生在任何運算超過
Flutter 畫面間隔（frame gap）時。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

任何處理過程都有可能花費較長時間完成，
這取決於實作方式
以及輸入資料，
因此無法列出所有
你需要考慮使用 isolates 的完整情境。

話雖如此，isolates 常見於以下用途：

- 從本地資料庫讀取資料
- 發送推播通知
- 解析與解碼大型資料檔案
- 處理或壓縮照片、音訊檔案與影片檔案
- 轉換音訊與影片檔案
- 當你在使用 FFI 時需要非同步支援
- 對複雜的清單或檔案系統進行過濾處理

## isolates 之間的訊息傳遞

Dart 的 isolates 是 [Actor model][Actor model] 的一種實作。
它們只能透過訊息傳遞來彼此溝通，
這是透過 [`Port` 物件][`Port` objects] 來完成的。
當訊息在 isolates 之間「傳遞」時，
通常會將訊息從發送 isolate 複製到
接收 isolate。
這代表任何傳遞給 isolate 的值，
即使在該 isolate 上被修改，
也不會影響原本 isolate 上的值。

唯一[在傳遞時不會被複製的物件][objects that aren't copied when passed]
是不可變物件（immutable objects），
例如 String 或不可修改的位元組。
當你在 isolates 之間傳遞不可變物件時，
會將該物件的參考（reference）透過 port 傳遞，
而不是複製整個物件，
以提升效能。
由於不可變物件無法被修改，
這也有效地維持了 actor model 的行為。

[`Port` objects]: {{site.dart.api}}/dart-isolate/ReceivePort-class.html
[objects that aren't copied when passed]: {{site.dart.api}}/dart-isolate/SendPort/send.html

這個規則的例外情況是
當 isolate 在使用 `Isolate.exit` 方法傳送訊息時結束執行。
因為發送 isolate 在傳送訊息後就不再存在，
它可以將訊息的擁有權從一個 isolate 轉移到另一個 isolate，
確保只有一個 isolate 能夠存取該訊息。

最底層的兩個訊息傳遞原語是 `SendPort.send`，
它會在傳送時複製可變訊息，
以及 `Isolate.exit`，
它會傳送訊息的參考。
`Isolate.run` 和 `compute`
在底層都使用 `Isolate.exit`。

## 短生命週期的 isolates

在 Flutter 中，將處理移至 isolate 最簡單的方法是使用
`Isolate.run` 方法。
這個方法會產生一個 isolate，
將回呼函式傳遞給新產生的 isolate 以啟動某項運算，
運算完成後回傳結果，
並在運算結束時關閉該 isolate。
這一切都會與主 isolate 同時進行，
不會阻塞主 isolate。

![Isolate diagram](/assets/images/docs/development/concurrency/isolate-bg-worker.png){:width="70%" .diagram-wrap}

`Isolate.run` 方法需要一個參數，
也就是回呼函式，
該函式會在新 isolate 上執行。
這個回呼函式的簽名必須有且僅有
一個必要且未命名的參數。
當運算完成時，
會將回呼的結果回傳給主 isolate，
並結束新產生的 isolate。

舉例來說，
以下這段程式碼會從檔案載入一個大型 JSON 檔案，
並將該 JSON 轉換為自訂的 Dart 物件。
如果 JSON 解碼過程沒有被移到新的 isolate 執行，
這個方法會導致 UI
在數秒內沒有回應。

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

若想完整了解如何使用 Isolates 在背景解析 JSON，請參考[這份 cookbook 範例][this cookbook recipe]。

[this cookbook recipe]: /cookbook/networking/background-parsing

## 有狀態、長時間存活的 isolates

短暫存活的 isolates 使用起來相當方便，
但建立新 isolate 以及在 isolates 之間複製物件都會有額外的效能開銷。
如果你需要重複使用 `Isolate.run` 進行相同的運算，
建立不會立即結束的 isolates，可能會帶來更好的效能表現。

為此，你可以使用一些較低階的 isolate 相關 API，
這些 API 是由 `Isolate.run` 所抽象出來的：

- [`Isolate.spawn()`][`Isolate.spawn()`] 與 [`Isolate.exit()`][`Isolate.exit()`]
- [`ReceivePort`][`ReceivePort`] 與 [`SendPort`][`SendPort`]
- [`send()`][`send()`] 方法

當你使用 `Isolate.run` 方法時，
新建立的 isolate 在傳回一則訊息給主 isolate 後會立即關閉。
有時候，你會需要長時間存活的 isolates，
讓它們能夠隨著時間彼此傳遞多則訊息。
在 Dart 中，你可以透過 Isolate API 與 Ports 來達成這個目的。
這類長時間存活的 isolates 通常被稱為 _背景工作者_（background workers）。

長時間存活的 isolates 特別適合用於需要在應用程式生命週期內重複執行的特定程序，
或是那些需運行一段時間、並多次將結果回傳給主 isolate 的程序。

另外，你也可以使用 [worker_manager][worker_manager] 來管理長時間存活的 isolates。

[worker_manager]: {{site.pub-pkg}}/worker_manager

### ReceivePorts 與 SendPorts

要在 isolates 之間建立長時間的通訊，可以使用兩個類別
（除了 Isolate 之外）：
[`ReceivePort`][`ReceivePort`] 與 [`SendPort`][`SendPort`]。
這些 port 是 isolates 之間唯一能夠互相通訊的方式。

`Ports` 的行為類似於 `Streams`，
也就是 `StreamController`
或 `Sink` 在一個 isolate 中建立，
而監聽端則設置在另一個 isolate 中。
在這個比喻中，
`StreamConroller` 被稱為 `SendPort`，
你可以透過 `send()` 方法「加入」訊息。
`ReceivePort` 則是監聽者，
當這些監聽者收到新訊息時，
會以該訊息作為參數呼叫預設的 callback。

若想深入了解如何在主 isolate 與 worker isolate 之間
建立雙向通訊，
請參考 [Dart 文件][Dart documentation] 中的範例。

[Dart documentation]: {{site.dart-site}}/language/concurrency

## 在 isolates 中使用平台插件

自 Flutter 3.7 起，你可以在背景 isolates 中使用平台插件。
這讓你有更多可能性，能將繁重且依賴平台的運算交由不會阻塞 UI 的 isolate 處理。
舉例來說，假設你要使用原生主機 API 進行資料加密
（例如在 Android 上使用 Android API、在 iOS 上使用 iOS API 等）。
過去，[將資料傳遞][marshaling data] 到主機平台會浪費 UI 執行緒的時間，
但現在可以在背景 isolate 中完成這件事。

平台通道 isolates 使用 [`BackgroundIsolateBinaryMessenger`][`BackgroundIsolateBinaryMessenger`] API。
以下程式片段展示如何在背景 isolate 中
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

如果你是從具有多執行緒（multithreading）功能的語言轉換到 Dart，你可能會預期 isolates 的行為類似於執行緒（thread），但實際上並非如此。每個 isolate 都有自己的全域欄位，並且只能透過訊息傳遞進行溝通，這確保了 isolate 中的可變物件只會在單一 isolate 內被存取。因此，isolate 只能存取自己的記憶體，這也成為其限制之一。例如，假設你的應用程式有一個名為 `configuration` 的全域可變變數，當你產生新的 isolate 時，它會被複製為該 isolate 的新全域欄位。如果你在新產生的 isolate 中變更這個變數，主 isolate 中的變數則不會受到影響。即使你將 `configuration` 物件作為訊息傳遞給新的 isolate，這一點依然成立。這正是 isolates 的設計運作方式，因此在考慮使用 isolates 時，請務必牢記這一點。

### Web 平台與 compute

Dart 的 Web 平台（包含 Flutter web）並不支援 isolates。如果你的 Flutter 應用程式目標是 Web，可以使用 `compute` 方法來確保程式碼可以順利編譯。[`compute()`][`compute()`] 方法會在 Web 上於主執行緒執行運算，但在行動裝置上則會產生新執行緒。在行動裝置與桌面平台上，`await compute(fun, message)` 等同於 `await Isolate.run(() => fun(message))`。

如需更多有關 Web 上並行（concurrency）的資訊，請參閱 dart.dev 上的 [concurrency documentation][concurrency documentation]。

[concurrency documentation]: {{site.dart-site}}/language/concurrency

### 無法存取 `rootBundle` 或呼叫 `dart:ui` 方法

所有 UI 任務以及 Flutter 本身都與主 isolate 綁定。因此，你無法在產生的 isolates 中使用 `rootBundle` 存取資源（Assets），也無法在這些 isolates 中執行任何元件（Widget）或 UI 相關的操作。

### 從主機平台到 Flutter 的插件訊息有限

使用背景 isolate 平台通道（platform channels）時，你可以在 isolates 中透過平台通道向主機平台（例如 Android 或 iOS）傳送訊息，並接收這些訊息的回應。然而，你無法從主機平台接收未經請求的訊息。

舉例來說，你無法在背景 isolate 中設置長時間運作的 Firestore 監聽器，因為 Firestore 會透過平台通道主動推送更新給 Flutter，這屬於未經請求的訊息。不過，你仍然可以在背景中查詢 Firestore 並取得回應。

## 更多資訊

如需更多有關 isolates 的資訊，請參考以下資源：

- 如果你需要使用多個 isolates，請考慮 Flutter 的 [IsolateNameServer][IsolateNameServer] 類別，或是用於非 Flutter Dart 應用程式的同功能 pub 套件。
- Dart 的 isolates 是 [Actor model][Actor model] 的一種實作。
- [isolate_agents][isolate_agents] 是一個將 Port 抽象化、方便建立長時間運作 isolates 的套件。
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
