# 使用 flutter_soloud 播放或串流音效與音樂

> 學習如何在 Flutter 應用程式中使用 flutter_soloud 套件 播放或串流音訊。



本教學示範如何將 [`flutter_soloud` 套件][]整合至您的 Flutter 應用程式，
以低延遲播放音效與背景音樂。
請依照下列步驟開始使用此套件：

[`flutter_soloud` 套件]: https://pub.dev/packages/flutter_soloud

## 1. 新增套件相依性

若要將 `package:flutter_soloud` 加入相依套件，請使用 `flutter pub add`：

```console
$ flutter pub add flutter_soloud
```

## 2. 初始化 `SoLoud`

在播放任何音訊之前，您需要初始化 `SoLoud` 實例。
您也可以設定播放參數，例如取樣率、緩衝區大小與聲道數量。

```dart
import 'package:flutter_soloud/flutter_soloud.dart';

// 使用預設設定初始化。
await SoLoud.instance.init();

// 或使用自訂設定初始化。
await SoLoud.instance.init(
  sampleRate: 44100,
  bufferSize: 2048,
  channels: Channels.stereo,
);
```

## 3. 載入音訊

`flutter_soloud` 套件支援多種音訊格式，包括 MP3、WAV、OGG 及 FLAC。
您可以從不同來源載入音訊。

從本機檔案載入：

```dart
final sound = await SoLoud.instance.loadFile('path/to/sound.mp3');
```

從應用程式資源 (asset) 載入：

```dart
final sound = await SoLoud.instance.loadAsset('assets/sound.mp3');
```

從網路 URL 載入：

```dart
final sound = await SoLoud.instance.loadUrl(
  'https://example.com/sound.mp3',
  mode: LoadMode.memory,
);
```

從記憶體中的位元組載入：

```dart
// TODO: 請替換成您實際的音訊資料。
final soundBytes = Uint8List.fromList([]);

final sound = await SoLoud.instance.loadMem(
  'reference_name.mp3',
  soundBytes,
  mode: LoadMode.memory,
);
```

## 4. 播放音訊

音訊載入完成後，
您可以使用 `SoLoud.instance.play` 播放它。
您也可以設定無縫循環播放。

```dart
// 播放音效。
var handle = await SoLoud.instance.play(sound);

// 啟用無縫循環播放。
handle = await SoLoud.instance.play(
  sound,
  looping: true,
  loopingStartAt: Duration(seconds: 1),
);
```

`play` 方法會回傳一個控制代碼 (handle)，用來參照目前正在播放的音效實例。
您可以使用此控制代碼來控制播放行為。

## 5. 控制播放

透過 `play` 回傳的控制代碼，
您可以執行各種操作，例如暫停或繼續播放：

```dart
// 切換暫停狀態。
SoLoud.instance.pauseSwitch(handle);
```

跳轉至特定時間戳：

```dart
SoLoud.instance.seek(handle, Duration(seconds: 5));
```

設定播放速度：

```dart
// 以兩倍速播放。
SoLoud.instance.setRelativePlaySpeed(handle, 2.0);
```

調整播放音量：

```dart
// 將播放音量設為 50%。
SoLoud.instance.setVolume(handle, 0.5);
```

淡化音訊音量：

```dart
SoLoud.instance.fadeVolume(
  handle,
  0.0, // 淡化的目標音量。
  Duration(seconds: 2), // 淡化持續時間。
);
```

停止播放：

```dart
await SoLoud.instance.stop(handle);
```

## 6. 釋放音效來源

當您使用完音效來源後，
請記得將其釋放以回收資源。

```dart
await SoLoud.instance.disposeSource(sound);
```

## 7. [選用] 串流音訊

`flutter_soloud` 套件也支援即時串流音訊資料。

初始化並設定緩衝區串流：

```dart
final stream = SoLoud.instance.setBufferStream(
  bufferingType: BufferingType.released,
  sampleRate: 24000,
  channels: Channels.mono,
  format: BufferType.s16le, // pcm16bits
);
```

播放串流：

```dart
final handle = await SoLoud.instance.play(stream);
```

當應用程式接收到音訊資料時，將其加入串流：

```dart
// TODO: 請替換成您實際的音訊資料。
final audioChunk = Uint8List.fromList([]);

SoLoud.instance.addAudioDataStream(
  stream,
  audioChunk,
);
```

當音訊串流結束時，將其標記為完成：

```dart
SoLoud.instance.setDataIsEnded(stream);
```

## 更多資訊

如需更詳細的資訊與範例，
請前往 pub.dev 上的 [`flutter_soloud` 套件][]，
或參考 `flutter_soloud` Package of the Week 影片。

<div class="video-wrapper">
  <YouTubeEmbed id="2t6Bt04EyLw" title="flutter_soloud - Package of the Week"></YouTubeEmbed>
</div>

