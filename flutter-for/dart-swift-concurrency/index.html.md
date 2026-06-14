# 給 Swift 開發者的 Flutter 並行處理指南

> 運用你對 Swift 並行處理的知識，學習 Flutter 與 Dart。



<?code-excerpt path-base="resources/dart_swift_concurrency"?>

Dart 與 Swift 都支援並行（concurrent）程式設計。
本指南將協助你了解 Dart 中的並行處理運作方式，以及它與 Swift 的比較。
透過這些知識，你可以打造高效能的 iOS 應用程式。

在 Apple 生態系統開發時，
有些任務可能需要較長時間才能完成。
這些任務包括擷取或處理大量資料。
iOS 開發者通常會使用 Grand Central Dispatch（GCD）
來透過共享執行緒池排程任務。
使用 GCD 時，開發者將任務加入 dispatch queue，
GCD 會決定要在哪一條執行緒上執行這些任務。

然而，GCD 會啟動多條執行緒來
處理剩餘的工作項目。
這代表你最終可能會有大量執行緒，
導致系統資源過度分配。
自從 Swift 採用結構化並行（structured concurrency）模型後，
減少了執行緒數量與上下文切換。
現在，每個核心僅有一條執行緒。

Dart 採用單執行緒（single-threaded）執行模型，
並支援 `Isolates`、事件迴圈（event loop）與非同步（asynchronous）程式碼。
`Isolate` 是 Dart 實作的輕量級執行緒。
除非你主動建立 `Isolate`，否則 Dart 程式碼會在
由事件迴圈驅動的主 UI 執行緒上執行。
Flutter 的事件迴圈
等同於 iOS 的主迴圈（main loop）——換句話說，
就是附加在主執行緒上的 Looper。

Dart 的單執行緒模型並不代表
你必須將所有操作都設為阻塞式，導致 UI 停滯。
相反地，你可以善用 Dart 語言提供的非同步
功能，例如 `async`/`await`。

## 非同步程式設計

非同步操作允許其他操作
在其完成之前先行執行。
Dart 與 Swift 都支援使用 `async` 與 `await` 關鍵字來撰寫非同步函式。
在這兩種語言中，`async` 標記某個函式
會執行非同步工作，
`await` 則告訴系統要等待該函式的結果。這代表 Dart VM _可能_
會在必要時暫停該函式。
想深入了解非同步程式設計，請參閱
[Concurrency in Dart](https://dart.dev/guides/language/concurrency)。

### 善用主執行緒／isolate

在 Apple 作業系統中，主要（也稱為主）
執行緒是應用程式啟動時運行的地方。
使用者介面的渲染永遠在主執行緒上進行。
Swift 與 Dart 之間的一個差異是
Swift 可能會針對不同任務使用不同的執行緒，
而且 Swift 並不保證會使用哪一條執行緒。
因此，在 Swift 中進行 UI 更新時，
你可能需要確保該操作發生在主執行緒上。

假設你想撰寫一個非同步擷取天氣
並顯示結果的函式。

在 GCD 中，若要手動將處理派送到主執行緒，
你可能會這樣做：

首先，定義 `Weather` `enum`：

```swift
enum Weather: String {
    case rainy, sunny
}
```

接下來，定義 view model，並將其標記為 [`@Observable`][]，
該 view model 會發佈型別為 `Weather?` 的 `result`。
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
為了確保工作在主執行緒上執行，請定義一個標記為 `@MainActor` 的 view model 類別，
並在其中建立一個 `load()` 函式，該函式會在內部透過 `Task` 呼叫非同步函式。

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

接下來，使用 `@State` 將 view model 定義為一個狀態，
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
要在 Dart 中實作相同的範例，
首先，建立 `Weather` `enum`：

<?code-excerpt "lib/async_weather.dart (weather)"?>
```dart
enum Weather { rainy, windy, sunny }
```

接下來，定義一個簡單的 view model（類似於在 SwiftUI 中建立的），
用來取得天氣資料。在 Dart 中，`Future` 物件代表一個未來會提供的值。
`Future` 與 Swift 的 `@Observable` 類似。
在這個範例中，view model 內的一個函式
會回傳一個 `Future<Weather>` 物件：

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
換句話說，你不需要在被標記為 `async` 的函式內手動建立 `Future` 實例。

最後一步，顯示天氣數值。
在 Flutter 中，[`FutureBuilder`](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html) 和
[`StreamBuilder`](https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html)
元件 (Widget) 用於在 UI 中顯示 Future 的結果。
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

完整範例請參考 GitHub 上的 [async_weather][] 檔案。

[async_weather]: https://github.com/flutter/website/blob/main/examples/resources/dart_swift_concurrency/lib/async_weather.dart

### 善用背景執行緒／isolate

Flutter 應用程式可在多種多核心硬體上執行，
包含運行 macOS 與 iOS 的裝置。
為了提升這些應用程式的效能，
有時你必須讓任務在不同核心上同時（concurrently）執行。
這點尤其重要，能避免長時間運算導致 UI 渲染被阻塞。

在 Swift 中，你可以利用 GCD 在全域佇列（global queues）上執行任務，
並指定不同的服務品質等級（quality of service class, qos）屬性。
這代表該任務的優先權。

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

在 Dart 中，你可以將運算工作卸載到 worker isolate（通常稱為背景工作者）。
一個常見的情境是啟動一個簡單的 worker isolate，並在該 worker 結束時，透過訊息傳回結果。
你可以使用 `Isolate.run()` 來啟動 isolate 並執行運算：

```dart
void main() async {
  // Read some data.
  final jsonData = await Isolate.run(() => jsonDecode(jsonString) as Map<String, dynamic>);`

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

在 Flutter 中，你也可以使用 `compute` 函式來啟動一個 isolate，執行回呼（callback）函式：

```dart
final jsonData = await compute(getNumberOfKeys, jsonString);
```

在這個例子中，回呼（callback）函式是一個頂層函式，如下所示：

```dart
Map<String, dynamic> getNumberOfKeys(String jsonString) {
 return jsonDecode(jsonString);
}
```

你可以在 [Learning Dart as a Swift developer][] 找到更多關於 Dart 的資訊，
而關於 Flutter 的更多資訊，請參考
[Flutter for SwiftUI developers][] 或
[Flutter for UIKit developers][]。

[Learning Dart as a Swift developer]: https://dart.dev/guides/language/coming-from/swift-to-dart
[Flutter for SwiftUI developers]: /flutter-for/swiftui-devs
[Flutter for UIKit developers]: /flutter-for/uikit-devs
[`@Observable`]: https://developer.apple.com/documentation/observation/observable()

