---
title: 錄製或串流音訊輸入
description: >-
  了解如何在 Flutter 應用程式中使用 record 套件
  錄製或串流音訊輸入。
---

本教學示範如何使用 [`record` 套件][] 為你的 Flutter 應用程式新增
音訊錄製與串流功能。
請依照下列步驟開始使用此套件：

[`record` 套件]: {{site.pub-pkg}}/record

## 1. 新增套件相依性

若要將 `package:record` 新增為相依套件，請使用 `flutter pub add`：

```console
$ flutter pub add record
```

## 2. 初始化 `AudioRecorder`

初始化一個 `AudioRecorder` 物件。這是控制錄製流程的主要物件。

```dart
import 'package:record/record.dart';

final recorder = AudioRecorder();
```

## 3. 請求使用者權限

錄製前，你必須請求使用者授權。
你可能還需要新增特定平台的權限設定。
詳情請參閱 [`record` 套件][] 文件。

```dart
final recorder = AudioRecorder();
if (await recorder.hasPermission()) {
  // Permission granted, proceed with recording.
} else {
  // Permission denied.
}
```

## 4. 建立錄製設定

建立並設定一個 `RecordConfig` 物件，以指定錄製參數，
例如編碼器、取樣率與聲道數量。
你也可以啟用自動增益、回音消除及
噪音抑制等功能。

```dart
final recordConfig = RecordConfig(
  encoder: AudioEncoder.pcm16bits,
  sampleRate: 24000,
  numChannels: 1,
  autoGain: true,
  echoCancel: true,
  noiseSuppress: true,
);
```

## 5. 開始錄製至檔案

若要開始錄製至檔案，
請呼叫 `AudioRecorder` 的 `start` 方法，
並傳入你定義的 `recordConfig`
以及檔案的儲存路徑。

```dart
// TODO: Specify the path where the audio file should be saved.
final audioFilePath = 'myRecording.wav';
await recorder.start(recordConfig, path: audioFilePath);
```

## 6. 控制進行中的錄製

你可以透過 `AudioRecorder` 的
`pause`、`resume` 和 `stop` 方法來控制進行中的錄製。

```dart
await recorder.pause();
await recorder.resume();
await recorder.stop();
```

## 7. [選用] 錄製至音訊串流

若要串流音訊，請使用 `startStream` 方法。
這會回傳一個音訊資料的[串流 (stream)][stream]。

```dart
final stream = await recorder.startStream(recordConfig);
stream.listen((audioChunk) {
  // Process the audio data. For example, send it to a server.
});
```

[stream]: {{site.api}}/flutter/dart-async/Stream-class.html

## 8. 停止錄製

若要停止錄製並取得已儲存檔案的路徑，
請呼叫 `AudioRecorder` 的非同步 `stop` 方法。

```dart
final path = await recorder.stop();
print('Recording stopped. File saved to: $path');
```

## 9. 釋放錄音器資源

當你使用完 `AudioRecorder` 後，
請記得呼叫其 `dispose` 方法以釋放資源。

```dart
await recorder.dispose();
```

## 支援的格式與編碼

`record` 套件支援多種編碼器與檔案格式，
但各平台的支援程度不同。
若要查看各平台完整的支援編碼器清單，
請查閱套件的[編碼支援表][encoding support table]。

如需更詳細的資訊與範例，
請造訪 pub.dev 上的 [`record` 套件][] 頁面，或
觀看 `record` 套件本週精選影片。

<div class="video-wrapper">
  <YouTubeEmbed id="Vv2A_nUL1tw" title="record - Package of the Week"></YouTubeEmbed>
</div>

[encoding support table]: {{site.pub-pkg}}/record#file
