---
title: 播放與暫停影片
description: 如何使用 video_player 套件。
js:
  - defer: true
    url: /assets/js/inject_dartpad.dart.js
---

<?code-excerpt path-base="cookbook/plugins/play_video/"?>

在應用程式開發中，播放影片是一項常見的任務，Flutter 應用程式也不例外。為了播放影片，Flutter 團隊提供了 [`video_player`][`video_player`] 套件。你可以使用 `video_player` 套件來播放儲存在檔案系統、本地資源（asset）或網路上的影片。

:::warning
目前，`video_player` 套件尚不支援 Linux 與 Windows 平台。想了解更多資訊，請參考 [`video_player`][`video_player`] 套件。
:::

在 iOS 上，`video_player` 套件會利用 [`AVPlayer`][`AVPlayer`] 來處理播放；而在 Android 上，則使用 [`ExoPlayer`][`ExoPlayer`]。

本教學將示範如何使用 `video_player` 套件，透過下列步驟，串流播放網路上的影片，並實作基本的播放與暫停控制：

  1. 新增 `video_player` 相依套件。
  2. 為你的應用程式新增權限。
  3. 建立並初始化 `VideoPlayerController`。
  4. 顯示影片播放器。
  5. 播放與暫停影片。

## 1. 新增 `video_player` 相依套件

本教學依賴一個 Flutter 套件：`video_player`。
首先，請將此相依套件加入你的專案中。

若要將 `video_player` 套件作為相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add video_player
```

## 2. 為你的應用程式新增權限

接下來，請更新你的 `android` 與 `ios` 設定，確保你的應用程式擁有從網際網路串流影片所需的正確權限。

### Android

請在 `AndroidManifest.xml` 檔案中，於 `<application>` 定義之後加入以下權限。`AndroidManifest.xml` 檔案位於 `<project root>/android/app/src/main/AndroidManifest.xml`。

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application ...>

    </application>

    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

### iOS

對於 iOS，請將以下內容加入位於 `<project root>/ios/Runner/Info.plist` 的 `Info.plist` 檔案中。

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

:::warning
`video_player` 插件只能在 iOS 模擬器中播放資源影片（asset videos）。
你必須在實體 iOS 裝置上測試網路託管的影片。
:::

### macOS

如果你使用網路型影片，請
[新增 `com.apple.security.network.client` 權限][mac-entitlement]。

### Web

Flutter Web **不支援** `dart:io`，
因此請避免在插件中使用 `VideoPlayerController.file` 建構函式。
使用此建構函式會嘗試建立一個`VideoPlayerController.file`，
並拋出 `UnimplementedError`。

不同的網頁瀏覽器可能有不同的影片播放能力，
例如支援的格式或自動播放（autoplay）。
請參考 [video_player_web] 套件以獲得更多針對 Web 的資訊。

`VideoPlayerOptions.mixWithOthers` 選項目前無法在 Web 上實作。
如果你在 Web 使用這個選項，將會被靜默忽略。

## 3. 建立並初始化 `VideoPlayerController`

現在你已經安裝好 `video_player` 插件並設置好正確的
權限，可以建立 `VideoPlayerController` 了。
`VideoPlayerController` 類別允許你連接不同類型的影片並控制播放。

在你能播放影片之前，也必須先`initialize`控制器。
這會建立與影片的連線並準備控制器進行播放。

要建立並初始化 `VideoPlayerController`，請依照下列步驟：

  1. 建立一個 `StatefulWidget`，並搭配一個 `State` 類別
  2. 在 `State` 類別中新增一個變數來儲存 `VideoPlayerController`
  3. 在 `State` 類別中新增一個變數來儲存從
  `VideoPlayerController.initialize` 回傳的 `Future`
  4. 在 `initState` 方法中建立並初始化控制器
  5. 在 `dispose` 方法中釋放控制器

<?code-excerpt "lib/main_step3.dart (VideoPlayerScreen)"?>
```dart
class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({super.key});

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.networkUrl(
      Uri.parse(
        'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
      ),
    );

    _initializeVideoPlayerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Ensure disposing of the VideoPlayerController to free up resources.
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Complete the code in the next step.
    return Container();
  }
}
```

## 4. 顯示影片播放器

現在，來顯示影片。`video_player` 套件提供了 [`VideoPlayer`][`VideoPlayer`] 元件（Widget），用來顯示由 `VideoPlayerController` 初始化的影片。
預設情況下，`VideoPlayer` 元件會佔據盡可能多的空間。
這通常對於影片來說並不理想，因為影片通常需要以特定的長寬比顯示，例如 16x9 或 4x3。

因此，請將 `VideoPlayer` 元件包裹在 [`AspectRatio`][`AspectRatio`] 元件中，以確保影片能維持正確的比例。

此外，必須在 `_initializeVideoPlayerFuture()` 完成後才顯示 `VideoPlayer` 元件。可以使用 `FutureBuilder` 來在控制器初始化完成前顯示載入中的旋轉圖示（loading spinner）。
注意：初始化控制器並不會開始播放影片。

<?code-excerpt "lib/main.dart (FutureBuilder)" replace="/body: //g;/^\),$/)/g"?>
```dart
// Use a FutureBuilder to display a loading spinner while waiting for the
// VideoPlayerController to finish initializing.
FutureBuilder(
  future: _initializeVideoPlayerFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.done) {
      // If the VideoPlayerController has finished initialization, use
      // the data it provides to limit the aspect ratio of the video.
      return AspectRatio(
        aspectRatio: _controller.value.aspectRatio,
        // Use the VideoPlayer widget to display the video.
        child: VideoPlayer(_controller),
      );
    } else {
      // If the VideoPlayerController is still initializing, show a
      // loading spinner.
      return const Center(child: CircularProgressIndicator());
    }
  },
)
```

## 5. 播放與暫停影片

預設情況下，影片會以暫停狀態開始。若要開始播放，請呼叫 `VideoPlayerController` 所提供的 [`play()`][`play()`] 方法。
若要暫停播放，請呼叫 [`pause()`][`pause()`] 方法。

在本範例中，請在你的應用程式中加入一個 `FloatingActionButton`，根據當前狀態顯示播放或暫停圖示。
當使用者點擊按鈕時，
如果影片目前是暫停狀態則播放影片，
如果影片正在播放則暫停影片。

<?code-excerpt "lib/main.dart (FAB)" replace="/^floatingActionButton: //g;/^\),$/)/g"?>
```dart
FloatingActionButton(
  onPressed: () {
    // Wrap the play or pause in a call to `setState`. This ensures the
    // correct icon is shown.
    setState(() {
      // If the video is playing, pause it.
      if (_controller.value.isPlaying) {
        _controller.pause();
      } else {
        // If the video is paused, play it.
        _controller.play();
      }
    });
  },
  // Display the correct icon depending on the state of the player.
  child: Icon(
    _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
  ),
)
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter video player hands-on example in DartPad" run="true"
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

void main() => runApp(const VideoPlayerApp());

class VideoPlayerApp extends StatelessWidget {
  const VideoPlayerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Video Player Demo',
      home: VideoPlayerScreen(),
    );
  }
}

class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({super.key});

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.networkUrl(
      Uri.parse(
        'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
      ),
    );

    // Initialize the controller and store the Future for later use.
    _initializeVideoPlayerFuture = _controller.initialize();

    // Use the controller to loop the video.
    _controller.setLooping(true);
  }

  @override
  void dispose() {
    // Ensure disposing of the VideoPlayerController to free up resources.
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Butterfly Video')),
      // Use a FutureBuilder to display a loading spinner while waiting for the
      // VideoPlayerController to finish initializing.
      body: FutureBuilder(
        future: _initializeVideoPlayerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the VideoPlayerController has finished initialization, use
            // the data it provides to limit the aspect ratio of the video.
            return AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              // Use the VideoPlayer widget to display the video.
              child: VideoPlayer(_controller),
            );
          } else {
            // If the VideoPlayerController is still initializing, show a
            // loading spinner.
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Wrap the play or pause in a call to `setState`. This ensures the
          // correct icon is shown.
          setState(() {
            // If the video is playing, pause it.
            if (_controller.value.isPlaying) {
              _controller.pause();
            } else {
              // If the video is paused, play it.
              _controller.play();
            }
          });
        },
        // Display the correct icon depending on the state of the player.
        child: Icon(
          _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
        ),
      ),
    );
  }
}
```


[`AspectRatio`]: {{site.api}}/flutter/widgets/AspectRatio-class.html  
[`AVPlayer`]: {{site.apple-dev}}/documentation/avfoundation/avplayer  
[`ExoPlayer`]: https://google.github.io/ExoPlayer/  
[`pause()`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayerController/pause.html  
[`play()`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayerController/play.html  
[`video_player`]: {{site.pub-pkg}}/video_player  
[`VideoPlayer`]: {{site.pub-api}}/video_player/latest/video_player/VideoPlayer-class.html  
[mac-entitlement]: {{site.url}}/platform-integration/macos/building#entitlements-and-the-app-sandbox  
[video_player_web]: {{site.pub-pkg}}/video_player_web
