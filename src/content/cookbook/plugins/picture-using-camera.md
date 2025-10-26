---
title: 使用相機拍照
description: 如何在行動裝置上使用相機外掛程式。
---

<?code-excerpt path-base="cookbook/plugins/picture_using_camera/"?>

許多應用程式都需要透過裝置的相機來拍攝照片與錄製影片。Flutter 提供了 [`camera`][`camera`] 外掛程式來達成這個目的。`camera` 外掛程式提供了取得可用相機清單、顯示特定相機預覽畫面，以及拍攝照片或錄影的相關工具。

:::note
[`camera_android_camerax`][`camera_android_camerax`] 外掛程式建立於 [CameraX][CameraX] Android 函式庫之上，
可根據裝置能力自動選擇解析度，提升影像品質。
此外掛程式也協助處理 _裝置特殊狀況_，
也就是指某些相機硬體可能無法如預期運作的情況。

如需更多資訊，請參考 Google I/O 2024 的演講：[Building picture perfect camera experiences in Flutter with CameraX][camerax-video]。
:::

[`camera_android_camerax`]: {{site.pub-pkg}}/camera_android_camerax
[CameraX]: https://developer.android.com/training/camerax
[camerax-video]: {{site.youtube-site}}/watch?v=d1sRCa5k2Sg&t=1s

本教學將示範如何使用 `camera` 外掛程式來顯示預覽畫面、拍照並顯示照片，步驟如下：

  1. 新增所需的相依套件。
  2. 取得可用相機的清單。
  3. 建立並初始化 `CameraController`。
  4. 使用 `CameraPreview` 顯示相機畫面。
  5. 透過 `CameraController` 拍攝照片。
  6. 使用 `Image` 元件顯示照片。

## 1. 新增所需的相依套件

完成本教學需在應用程式中加入三個相依套件：

[`camera`][`camera`]
: 提供操作裝置相機的相關工具。

[`path_provider`][`path_provider`]
: 用於尋找儲存圖片的正確路徑。

[`path`][`path`]
: 建立可在任何平台運作的路徑。

要將這些套件加入相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add camera path_provider path
```

:::tip
- 對於 Android，您必須將 `minSdkVersion` 更新為 21（或更高）。
- 在 iOS 上，必須在 `ios/Runner/Info.plist` 內加入以下幾行，以存取相機與麥克風。

  ```xml
  <key>NSCameraUsageDescription</key>
  <string>Explanation on why the camera access is needed.</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>Explanation on why the microphone access is needed.</string>
  ```
:::

## 2. 取得可用相機的清單

接下來，使用 `camera` 插件來取得可用相機的清單。

<?code-excerpt "lib/main.dart (init)"?>
```dart
// Ensure that plugin services are initialized so that `availableCameras()`
// can be called before `runApp()`
WidgetsFlutterBinding.ensureInitialized();

// Obtain a list of the available cameras on the device.
final cameras = await availableCameras();

// Get a specific camera from the list of available cameras.
final firstCamera = cameras.first;
```

## 3. 建立並初始化 `CameraController`

當你擁有相機後，請依照以下步驟來建立並初始化 `CameraController`。
這個流程會建立與裝置相機的連線，讓你可以控制相機，
並顯示相機畫面的預覽。

  1. 使用一個配套的 `State` 類別建立 `StatefulWidget`。
  2. 在 `State` 類別中新增一個變數來儲存 `CameraController`。
  3. 在 `State` 類別中新增一個變數來儲存從 `CameraController.initialize()` 回傳的 `Future`。
  4. 在 `initState()` 方法中建立並初始化控制器。
  5. 在 `dispose()` 方法中釋放控制器資源。

<?code-excerpt "lib/main_step3.dart (controller)" remove="ignore:"?>
```dart
// A screen that allows users to take a picture using a given camera.
class TakePictureScreen extends StatefulWidget {
  const TakePictureScreen({super.key, required this.camera});

  final CameraDescription camera;

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next steps.
    return Container();
  }
}
```

:::warning
如果你沒有初始化 `CameraController`，  
你*無法*使用相機來顯示預覽畫面並拍照。
:::

## 4. 使用 `CameraPreview` 來顯示相機的畫面

接下來，使用 `camera` 套件中的 `CameraPreview` 元件（Widget），  
來顯示相機畫面的預覽。

:::note 注意
你必須等到控制器初始化完成後，才能操作相機。因此，  
你必須等候前一步建立的 `_initializeControllerFuture()` 完成後，才能顯示 `CameraPreview`。
:::

這正是 [`FutureBuilder`][`FutureBuilder`] 的用途。

<?code-excerpt "lib/main.dart (FutureBuilder)" replace="/body: //g;/^\),$/)/g"?>
```dart
// You must wait until the controller is initialized before displaying the
// camera preview. Use a FutureBuilder to display a loading spinner until the
// controller has finished initializing.
FutureBuilder<void>(
  future: _initializeControllerFuture,
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.done) {
      // If the Future is complete, display the preview.
      return CameraPreview(_controller);
    } else {
      // Otherwise, display a loading indicator.
      return const Center(child: CircularProgressIndicator());
    }
  },
)
```

## 5. 使用 `CameraController` 拍攝照片

你可以使用 `CameraController` 來拍攝照片，透過 [`takePicture()`][`takePicture()`] 方法，該方法會回傳一個 [`XFile`][`XFile`]，這是一個跨平台、簡化的 `File` 抽象層。
在 Android 和 iOS 上，新的圖片會儲存在各自的快取目錄中，`path` 會將該位置的路徑回傳於 `XFile`。

在這個範例中，建立一個 `FloatingActionButton`，當使用者點擊按鈕時，會透過 `CameraController` 拍攝一張照片。

拍攝照片需要兩個步驟：

  1. 確認相機已經初始化。
  2. 使用 controller 拍攝照片，並確保它回傳一個 `Future<XFile>`。

建議將這些操作包裹在 `try / catch` 區塊中，以處理可能發生的錯誤。

<?code-excerpt "lib/main_step5.dart (FAB)" replace="/^floatingActionButton: //g;/^\),$/)/g"?>
```dart
FloatingActionButton(
  // Provide an onPressed callback.
  onPressed: () async {
    // Take the Picture in a try / catch block. If anything goes wrong,
    // catch the error.
    try {
      // Ensure that the camera is initialized.
      await _initializeControllerFuture;

      // Attempt to take a picture and then get the location
      // where the image file is saved.
      final image = await _controller.takePicture();
    } catch (e) {
      // If an error occurs, log the error to the console.
      print(e);
    }
  },
  child: const Icon(Icons.camera_alt),
)
```
## 6. 使用 `Image` 元件（Widget）顯示圖片

如果你已成功拍攝圖片，接下來可以使用 `Image` 元件（Widget）來顯示儲存的圖片。在這個案例中，圖片是以檔案的形式儲存在裝置上。

因此，你必須將 `File` 傳遞給 `Image.file` 建構函式。你可以將前一步驟產生的路徑傳入，建立 `File` 類別的實例。

<?code-excerpt "lib/image_file.dart (ImageFile)" replace="/^return\ //g"?>
```dart
Image.file(File('path/to/my/picture.png'));
```

## 完整範例

<?code-excerpt "lib/main.dart"?>
```dart
import 'dart:async';
import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

Future<void> main() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.
  final firstCamera = cameras.first;

  runApp(
    MaterialApp(
      theme: ThemeData.dark(),
      home: TakePictureScreen(
        // Pass the appropriate camera to the TakePictureScreen widget.
        camera: firstCamera,
      ),
    ),
  );
}

// A screen that allows users to take a picture using a given camera.
class TakePictureScreen extends StatefulWidget {
  const TakePictureScreen({super.key, required this.camera});

  final CameraDescription camera;

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();
    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera,
      // Define the resolution to use.
      ResolutionPreset.medium,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Take a picture')),
      // You must wait until the controller is initialized before displaying the
      // camera preview. Use a FutureBuilder to display a loading spinner until the
      // controller has finished initializing.
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the Future is complete, display the preview.
            return CameraPreview(_controller);
          } else {
            // Otherwise, display a loading indicator.
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        // Provide an onPressed callback.
        onPressed: () async {
          // Take the Picture in a try / catch block. If anything goes wrong,
          // catch the error.
          try {
            // Ensure that the camera is initialized.
            await _initializeControllerFuture;

            // Attempt to take a picture and get the file `image`
            // where it was saved.
            final image = await _controller.takePicture();

            if (!context.mounted) return;

            // If the picture was taken, display it on a new screen.
            await Navigator.of(context).push(
              MaterialPageRoute<void>(
                builder: (context) => DisplayPictureScreen(
                  // Pass the automatically generated path to
                  // the DisplayPictureScreen widget.
                  imagePath: image.path,
                ),
              ),
            );
          } catch (e) {
            // If an error occurs, log the error to the console.
            print(e);
          }
        },
        child: const Icon(Icons.camera_alt),
      ),
    );
  }
}

// A widget that displays the picture taken by the user.
class DisplayPictureScreen extends StatelessWidget {
  final String imagePath;

  const DisplayPictureScreen({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Display the Picture')),
      // The image is stored as a file on the device. Use the `Image.file`
      // constructor with the given path to display the image.
      body: Image.file(File(imagePath)),
    );
  }
}
```


[`camera`]: {{site.pub-pkg}}/camera  
[`FutureBuilder`]: {{site.api}}/flutter/widgets/FutureBuilder-class.html  
[`path`]: {{site.pub-pkg}}/path  
[`path_provider`]: {{site.pub-pkg}}/path_provider  
[`takePicture()`]: {{site.pub}}/documentation/camera/latest/camera/CameraController/takePicture.html  
[`XFile`]:  {{site.pub}}/documentation/cross_file/latest/cross_file/XFile-class.html
