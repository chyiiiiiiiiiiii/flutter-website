---
title: 適用於 Swift 開發者的 Flutter 並行處理
description: >
  運用你在 Swift 並行處理上的知識，學習 Flutter 與 Dart。
---

<?code-excerpt path-base="resources/dart_swift_concurrency"?>

Dart 與 Swift 都支援並行（concurrent）程式設計。
本指南將協助你理解 Dart 中的並行處理運作方式，以及它與 Swift 的比較。
有了這些知識，你就能打造高效能的 iOS 應用程式。

在 Apple 生態系統開發時，
有些任務可能需要較長的時間才能完成，
例如擷取或處理大量資料。
iOS 開發者通常會使用 Grand Central Dispatch（GCD）
來透過共用執行緒池排程任務。
利用 GCD，開發者可以將任務加入 dispatch queue，
而 GCD 會決定要在哪個執行緒上執行這些任務。

然而，GCD 會啟動新的執行緒來
處理剩餘的工作項目。
這代表你最終可能會有大量的執行緒，
導致系統資源過度分配。
自從 Swift 採用結構化並行（structured concurrency）模型後，
減少了執行緒數量與上下文切換。
現在，每個核心只會有一個執行緒。

Dart 採用單執行緒執行模型，
並支援 `Isolates`、事件迴圈（event loop）與非同步程式碼。
`Isolate` 是 Dart 實作的輕量級執行緒。
除非你自行產生 `Isolate`，否則 Dart 程式碼會在
由事件迴圈驅動的主 UI 執行緒上執行。
Flutter 的事件迴圈
等同於 iOS 的主迴圈（main loop）——換句話說，
就是附加在主執行緒的 Looper。

Dart 的單執行緒模型並不代表
你必須將所有操作都以阻塞方式執行，導致 UI 停滯。
相反地，你可以善用 Dart 語言所提供的非同步
功能，例如 `async`/`await`。

## 非同步程式設計

非同步操作允許其他操作在其完成前先行執行。
Dart 與 Swift 都支援使用 `async` 與 `await` 關鍵字來撰寫非同步函式。
在兩者中，`async` 用來標記函式會執行非同步工作，
而 `await` 則告訴系統要等待函式的結果。
這表示 Dart VM _可以_ 在必要時暫停該函式。
想了解更多非同步程式設計細節，請參考
[Concurrency in Dart]({{site.dart-site}}/guides/language/concurrency)。

### 善用主執行緒／isolate

在 Apple 作業系統中，主要（也稱為主）執行緒是應用程式開始執行的地方。
UI 的繪製總是在主執行緒上進行。
Swift 與 Dart 之間的一個差異在於，
Swift 可能會針對不同任務使用不同的執行緒，
而且 Swift 並不保證會用哪一條執行緒。
因此，在 Swift 中進行 UI 更新時，
你可能需要確保相關工作是在主執行緒上執行。

假設你想撰寫一個能夠非同步取得天氣資訊並
顯示結果的函式。

在 GCD 中，若要手動將處理程序派發到主執行緒，
你可能會這麼做：

首先，定義 `Weather` `enum`：

```swift
enum Weather: String {
    case rainy, sunny
}
```

接下來，定義 view model，並將其標記為 [`@Observable`][`@Observable`]，  
用來發布型別為 `Weather?` 的 `result`。  
使用 GCD 建立背景 `DispatchQueue`，  
將工作派送到執行緒池，然後再切回主執行緒以更新 `result`。 

```swift
@Observable class ContentViewModel {
    private(set) var result: Weather?

    private let queue = DispatchQueue(label: "weather_io_queue")
    func load() {
        // Mimic 1 second network delay.
        queue.asyncAfter(deadline: .now() + 1) { [weak self] in
            DispatchQueue.main.async {
                self?.result = .sunny
            }
        }
    }
}
```

最後，顯示結果：

```swift
struct ContentView: View {
    @State var viewModel = ContentViewModel()
    var body: some View {
        Text(viewModel.result?.rawValue ?? "Loading...")
            .onAppear {
                viewModel.load()
        }
    }
}
```

最近，Swift 引入了 _actors_（行為者）來支援對共享可變狀態的同步處理。  
為了確保工作在主執行緒（main thread）上執行，請定義一個標記為 `@MainActor` 的 view model 類別，  
並在其中建立一個 `load()` 函式，該函式會在內部使用 `Task` 呼叫非同步函式。   

```swift
@MainActor @Observable class ContentViewModel {
  private(set) var result: Weather?
  
  func load() async {
    // Mimic 1 second network delay.
    try? await Task.sleep(nanoseconds: 1_000_000_000)
    self.result = .sunny
  }
}
```

接下來，使用 `@State` 將 view model 定義為一個 state，  
並提供一個可由 view model 呼叫的 `load()` 函式：

```swift
struct ContentView: View {
  @State var viewModel = ContentViewModel()
  var body: some View {
    Text(viewModel.result?.rawValue ?? "Loading...")
      .task {
        await viewModel.load()
      }
  }
}
```

在 Dart 中，所有工作預設都在主 isolate 上執行。
若要在 Dart 中實作相同的範例，
首先，建立 `Weather` `enum`：

<?code-excerpt "lib/async_weather.dart (weather)"?>
```dart
enum Weather { rainy, windy, sunny }
```

接下來，定義一個簡單的 view model（類似於在 SwiftUI 中建立的），用來取得天氣資料。在 Dart 中，`Future` 物件代表一個未來會提供的值。`Future` 類似於 Swift 的 `@Observable`。在這個範例中，view model 內的一個函式會回傳一個 `Future<Weather>` 物件：

<?code-excerpt "lib/async_weather.dart (home-page-view-model)"?>
```dart
@immutable
class HomePageViewModel {
  const HomePageViewModel();
  Future<Weather> load() async {
    await Future.delayed(const Duration(seconds: 1));
    return Weather.sunny;
  }
}
```

本範例中的 `load()` 函式與 Swift 程式碼有相似之處。  
Dart 函式會標記為 `async`，因為它使用了 `await` 關鍵字。

此外，被標記為 `async` 的 Dart 函式會自動回傳 `Future`。  
換句話說，你不需要在標記為 `async` 的函式內手動建立 `Future` 實例。

最後一步，顯示天氣數值。  
在 Flutter 中，[`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html) 與 [`StreamBuilder`]({{site.api}}/flutter/widgets/StreamBuilder-class.html)  
元件 (Widgets) 可用來在 UI 中顯示 Future 的結果。  
以下範例使用了 `FutureBuilder`：

<?code-excerpt "lib/async_weather.dart (home-page-widget)"?>
```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  final HomePageViewModel viewModel = const HomePageViewModel();

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      // Feed a FutureBuilder to your widget tree.
      child: FutureBuilder<Weather>(
        // Specify the Future that you want to track.
        future: viewModel.load(),
        builder: (context, snapshot) {
          // A snapshot is of type `AsyncSnapshot` and contains the
          // state of the Future. By looking if the snapshot contains
          // an error or if the data is null, you can decide what to
          // show to the user.
          if (snapshot.hasData) {
            return Center(child: Text(snapshot.data.toString()));
          } else {
            return const Center(child: CupertinoActivityIndicator());
          }
        },
      ),
    );
  }
}
```

完整範例請參考 GitHub 上的 [async_weather][async_weather] 檔案。

[async_weather]: {{site.repo.this}}/examples/resources/dart_swift_concurrency/lib/async_weather.dart

### 善用背景執行緒／isolate

Flutter 應用程式（Flutter apps）可在各種多核心硬體上執行，包括運行 macOS 和 iOS 的裝置。  
為了提升這些應用程式的效能，有時必須在不同核心上同時執行任務（concurrently）。這一點尤其重要，可以避免長時間執行的操作阻塞 UI 繪製。

在 Swift 中，你可以利用 GCD（Grand Central Dispatch）在具有不同服務品質（quality of service，qos）屬性的全域佇列（global queues）上執行任務。  
這代表了任務的優先順序。

```swift
func parse(string: String, completion: @escaping ([String:Any]) -> Void) {
  // Mimic 1 sec delay.
  DispatchQueue(label: "data_processing_queue", qos: .userInitiated)
    .asyncAfter(deadline: .now() + 1) {
      let result: [String:Any] = ["foo": 123]
      completion(result)
    }
  }
}
```

在 Dart 中，你可以將運算工作分派給 worker isolate，這通常被稱為背景工作者。

一個常見的情境是啟動一個簡單的 worker isolate，並在 worker 結束時以訊息回傳結果。

自 Dart 2.19 起，你可以使用 `Isolate.run()` 來啟動 isolate 並執行運算：

```dart
void main() async {
  // Read some data.
  final jsonData = await Isolate.run(() => jsonDecode(jsonString) as Map<String, dynamic>);`

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

在 Flutter 中，你也可以使用 `compute` 函式來啟動一個 isolate，執行回呼函式（callback function）：

```dart
final jsonData = await compute(getNumberOfKeys, jsonString);
```

在這個例子中，回呼函式（callback function）是一個頂層函式，如下所示：

```dart
Map<String, dynamic> getNumberOfKeys(String jsonString) {
 return jsonDecode(jsonString);
}
```

你可以在 [Learning Dart as a Swift developer][Learning Dart as a Swift developer] 取得更多關於 Dart 的資訊，並可在 [Flutter for SwiftUI developers][Flutter for SwiftUI developers] 或 [Flutter for UIKit developers][Flutter for UIKit developers] 了解更多 Flutter 相關內容。

[Learning Dart as a Swift developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart
[Flutter for SwiftUI developers]: /get-started/flutter-for/swiftui-devs
[Flutter for UIKit developers]: /get-started/flutter-for/uikit-devs
[`@Observable`]: https://developer.apple.com/documentation/observation/observable()
