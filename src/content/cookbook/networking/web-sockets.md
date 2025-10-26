---
title: 使用 WebSockets 通訊
description: 如何連接到 WebSocket。
---

<?code-excerpt path-base="cookbook/networking/web_sockets/"?>

除了一般的 HTTP 請求之外，
你也可以使用 `WebSockets` 來連接到伺服器。
`WebSockets` 允許你與伺服器進行雙向通訊，
而不需要輪詢（polling）。

在這個範例中，將會連接到
[由 Lob.com 贊助的測試 WebSocket 伺服器][test WebSocket server sponsored by Lob.com]。
該伺服器會回傳你所傳送的相同訊息。
本教學食譜包含以下步驟：

  1. 連接到 WebSocket 伺服器。
  2. 監聽來自伺服器的訊息。
  3. 傳送資料到伺服器。
  4. 關閉 WebSocket 連線。

## 1. 連接到 WebSocket 伺服器

[`web_socket_channel`][`web_socket_channel`] 套件提供了
你需要用來連接 WebSocket 伺服器的工具。

這個套件提供了一個 `WebSocketChannel`，
讓你可以同時監聽來自伺服器的訊息，
並向伺服器推送訊息。

在 Flutter 中，可以使用以下程式碼
建立一個連接到伺服器的 `WebSocketChannel`：

<?code-excerpt "lib/main.dart (connect)" replace="/_channel/channel/g"?>
```dart
final channel = WebSocketChannel.connect(
  Uri.parse('wss://echo.websocket.events'),
);
```

## 2. 監聽來自伺服器的訊息

現在你已經建立了連線，
接下來要監聽來自伺服器的訊息。

當你傳送訊息到測試伺服器後，
伺服器會將相同的訊息回傳給你。

在這個範例中，使用 [`StreamBuilder`][`StreamBuilder`]
元件（Widget）來監聽新訊息，並用
[`Text`][`Text`] 元件（Widget）來顯示這些訊息。

<?code-excerpt "lib/main.dart (StreamBuilder)" replace="/_channel/channel/g"?>
```dart
StreamBuilder(
  stream: channel.stream,
  builder: (context, snapshot) {
    return Text(snapshot.hasData ? '${snapshot.data}' : '');
  },
),
```

### 工作原理說明

`WebSocketChannel` 提供來自伺服器的
[`Stream`][`Stream`] 訊息串流。

`Stream` 類別是 `dart:async` 套件中的基礎組件。
它提供了一種方式，可以從資料來源監聽非同步事件。
與 `Future` 只回傳單一非同步回應不同，
`Stream` 類別能夠在一段時間內傳遞多個事件。

[`StreamBuilder`][`StreamBuilder`] 元件（Widget）會連接到 `Stream`，
並在每次收到事件時，透過指定的 `builder()` 函式
要求 Flutter 重新建構畫面。

## 3. 傳送資料到伺服器

若要將資料傳送到伺服器，
請將訊息`add()`到由 `WebSocketChannel`
所提供的 `sink`。

<?code-excerpt "lib/main.dart (add)" replace="/_channel/channel/g;/_controller.text/'Hello!'/g"?>
```dart
channel.sink.add('Hello!');
```

### 運作原理

`WebSocketChannel` 提供了一個
[`StreamSink`][`StreamSink`]，可用來將訊息推送到伺服器。

`StreamSink` 類別則提供了一種通用方式，能將同步或非同步事件加入資料來源。

## 4. 關閉 WebSocket 連線

當你完成 WebSocket 的使用後，請關閉連線：

<?code-excerpt "lib/main.dart (close)" replace="/_channel/channel/g"?>
```dart
channel.sink.close();
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'WebSocket Demo';
    return const MaterialApp(
      title: title,
      home: MyHomePage(title: title),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _controller = TextEditingController();
  final _channel = WebSocketChannel.connect(
    Uri.parse('wss://echo.websocket.events'),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Form(
              child: TextFormField(
                controller: _controller,
                decoration: const InputDecoration(labelText: 'Send a message'),
              ),
            ),
            const SizedBox(height: 24),
            StreamBuilder(
              stream: _channel.stream,
              builder: (context, snapshot) {
                return Text(snapshot.hasData ? '${snapshot.data}' : '');
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _sendMessage,
        tooltip: 'Send message',
        child: const Icon(Icons.send),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      _channel.sink.add(_controller.text);
    }
  }

  @override
  void dispose() {
    _channel.sink.close();
    _controller.dispose();
    super.dispose();
  }
}
```
![Web sockets demo](/assets/images/docs/cookbook/web-sockets.webp){:.site-mobile-screenshot}


[`Stream`]: {{site.api}}/flutter/dart-async/Stream-class.html
[`StreamBuilder`]: {{site.api}}/flutter/widgets/StreamBuilder-class.html
[`StreamSink`]: {{site.api}}/flutter/dart-async/StreamSink-class.html
[test WebSocket server sponsored by Lob.com]: https://www.lob.com/blog/websocket-org-is-down-here-is-an-alternative
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`web_socket_channel`]: {{site.pub-pkg}}/web_socket_channel
