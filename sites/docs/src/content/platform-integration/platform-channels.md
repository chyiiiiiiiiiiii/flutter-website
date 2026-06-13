---
title: 撰寫自訂平台專屬程式碼
shortTitle: 平台專屬程式碼
description: 學習如何在你的應用程式中撰寫自訂平台專屬程式碼。
---

<?code-excerpt path-base="platform_integration"?>

本指南說明如何在 Flutter 中使用自訂平台專屬程式碼。

## 概述

你可以在 Flutter 應用程式中使用平台專屬程式碼。
常見的幾種方式包括：

* 使用 Flutter 的平台通道（platform channel）API，在 Flutter 與你所需的平台之間傳遞訊息。
  更多資訊請參閱[使用平台通道呼叫平台專屬程式碼](#example)。

* 使用 `Pigeon` 套件來產生型別安全的
  平台專屬程式碼。更多資訊請參閱[使用 Pigeon 套件呼叫平台專屬程式碼](#pigeon)。

Flutter 支援下列平台及其平台專屬語言：

* **Android**：Kotlin、Java
* **iOS**：Swift、Objective-C
* **Windows**：C++
* **macOS**：Objective-C
* **Linux**：C

:::note
* 本頁內容適用於大多數平台，但網頁（Web）平台的專屬程式碼通常會使用
  [JS 互操作性（JS interoperability）][JS interoperability]。

* 本指南主要說明當你需要在非 Dart 語言中使用平台 API 時，如何透過平台通道機制來實現。
  不過，你也可以在 Flutter 應用程式中，透過檢查
  [`defaultTargetPlatform`][] 屬性來撰寫 Dart 層級的平台專屬程式碼。
  [平台自動適配][Platform adaptations] 列出了一些 Flutter 框架
  自動為你處理的平台專屬適配。
:::

[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html

## 平台通道架構總覽 {:#architecture}

訊息會透過平台通道（platform channels）在客戶端（UI）
與主機（平台）之間傳遞，如下圖所示：

![平台通道架構](/assets/images/docs/PlatformChannels.png){:width="100%"}

在上述圖中，訊息與回應皆以非同步方式透過通道傳遞，以確保使用者介面維持回應能力。在客戶端，
[Flutter 的 `MethodChannel`][`MethodChannel` for Flutter]
可用於傳送對應於方法呼叫的訊息。在平台端，
[Android 的 `MethodChannel`][`MethodChannel` for Android] 以及
[iOS 的 `FlutterMethodChannel`][`FlutterMethodChannel` for iOS]
可用於接收方法呼叫並回傳結果。這些類別讓你能以極少的 _樣板程式碼（boilerplate）_
開發平台插件（plugin）。

:::note
* 即使 Flutter 以非同步方式在 Dart 與平台間傳遞訊息，
  你每次呼叫通道方法時，都必須在平台的主執行緒（main thread）上執行該方法。
  詳情請參閱[執行緒相關章節][section on threading]。
* 如果有需要，也可以反向傳送方法呼叫，讓平台端作為客戶端，呼叫 Dart 實作的方法。
  具體範例請參考 [`quick_actions`][] 插件。
:::

## 支援的資料型別 {:#codec}

標準平台通道 API 與 Pigeon 套件
皆使用一種稱為 [`StandardMessageCodec`][] 的標準訊息編解碼器（message codec），
能有效率地將類似 JSON 的簡單值（如布林值、數字、字串、位元組緩衝區、List 與 Map）進行二進位序列化。
當你傳送與接收資料時，這些值的序列化與反序列化會自動完成。

下表顯示 Dart 值在平台端的對應型別，反之亦然：

<Tabs key="platform-channel-language">
<Tab name="Kotlin">

| Dart              | Kotlin        |
| ----------------- | ------------- |
| `null`            | `null`        |
| `bool`            | `Boolean`     |
| `int` (<=32 bits) | `Int`         |
| `int` (>32 bits)  | `Long`        |
| `double`          | `Double`      |
| `String`          | `String`      |
| `Uint8List`       | `ByteArray`   |
| `Int32List`       | `IntArray`    |
| `Int64List`       | `LongArray`   |
| `Float32List`     | `FloatArray`  |
| `Float64List`     | `DoubleArray` |
| `List`            | `List`        |
| `Map`             | `HashMap`     |

{:.table .table-striped}

</Tab>
<Tab name="Java">

| Dart              | Java                  |
| ----------------- | --------------------- |
| `null`            | `null`                |
| `bool`            | `java.lang.Boolean`   |
| `int` (<=32 bits) | `java.lang.Integer`   |
| `int` (>32 bits)  | `java.lang.Long`      |
| `double`          | `java.lang.Double`    |
| `String`          | `java.lang.String`    |
| `Uint8List`       | `byte[]`              |
| `Int32List`       | `int[]`               |
| `Int64List`       | `long[]`              |
| `Float32List`     | `float[]`             |
| `Float64List`     | `double[]`            |
| `List`            | `java.util.ArrayList` |
| `Map`             | `java.util.HashMap`   |

{:.table .table-striped}

</Tab>
<Tab name="Swift">

| Dart              | Swift                                     |
| ----------------- | ----------------------------------------- |
| `null`            | `nil`（巢狀時為 `NSNull`）                |
| `bool`            | `NSNumber(value: Bool)`                   |
| `int` (<=32 bits) | `NSNumber(value: Int32)`                  |
| `int` (>32 bits)  | `NSNumber(value: Int)`                    |
| `double`          | `NSNumber(value: Double)`                 |
| `String`          | `String`                                  |
| `Uint8List`       | `FlutterStandardTypedData(bytes: Data)`   |
| `Int32List`       | `FlutterStandardTypedData(int32: Data)`   |
| `Int64List`       | `FlutterStandardTypedData(int64: Data)`   |
| `Float32List`     | `FlutterStandardTypedData(float32: Data)` |
| `Float64List`     | `FlutterStandardTypedData(float64: Data)` |
| `List`            | `Array`                                   |
| `Map`             | `Dictionary`                              |

{:.table .table-striped}

</Tab>
<Tab name="Obj-C">

| Dart              | Objective-C                                      |
| ----------------- | ------------------------------------------------ |
| `null`            | `nil`（巢狀時為 `NSNull`）                       |
| `bool`            | `NSNumber numberWithBool:`                       |
| `int` (<=32 bits) | `NSNumber numberWithInt:`                        |
| `int` (>32 bits)  | `NSNumber numberWithLong:`                       |
| `double`          | `NSNumber numberWithDouble:`                     |
| `String`          | `NSString`                                       |
| `Uint8List`       | `FlutterStandardTypedData typedDataWithBytes:`   |
| `Int32List`       | `FlutterStandardTypedData typedDataWithInt32:`   |
| `Int64List`       | `FlutterStandardTypedData typedDataWithInt64:`   |
| `Float32List`     | `FlutterStandardTypedData typedDataWithFloat32:` |
| `Float64List`     | `FlutterStandardTypedData typedDataWithFloat64:` |
| `List`            | `NSArray`                                        |
| `Map`             | `NSDictionary`                                   |

{:.table .table-striped}

</Tab>
<Tab name="C++" id="cpp">

| Dart               | C++                                                        |
| ------------------ | ---------------------------------------------------------- |
| `null`             | `EncodableValue()`                                         |
| `bool`             | `EncodableValue(bool)`                                     |
| `int` (<=32 bits)  | `EncodableValue(int32_t)`                                  |
| `int` (>32 bits)   | `EncodableValue(int64_t)`                                  |
| `double`           | `EncodableValue(double)`                                   |
| `String`           | `EncodableValue(std::string)`                              |
| `Uint8List`        | `EncodableValue(std::vector<uint8_t>)`                     |
| `Int32List`        | `EncodableValue(std::vector<int32_t>)`                     |
| `Int64List`        | `EncodableValue(std::vector<int64_t>)`                     |
| `Float32List`      | `EncodableValue(std::vector<float>)`                       |
| `Float64List`      | `EncodableValue(std::vector<double>)`                      |
| `List`             | `EncodableValue(std::vector<EncodableValue>)`              |
| `Map`              | `EncodableValue(std::map<EncodableValue, EncodableValue>)` |

{:.table .table-striped}

</Tab>
<Tab name="C">

| Dart               | C (GObject)                 |
| ------------------ | --------------------------- |
| `null`             | `FlValue()`                 |
| `bool`             | `FlValue(bool)`             |
| `int`              | `FlValue(int64_t)`          |
| `double`           | `FlValue(double)`           |
| `String`           | `FlValue(gchar*)`           |
| `Uint8List`        | `FlValue(uint8_t*)`         |
| `Int32List`        | `FlValue(int32_t*)`         |
| `Int64List`        | `FlValue(int64_t*)`         |
| `Float32List`      | `FlValue(float*)`           |
| `Float64List`      | `FlValue(double*)`          |
| `List`             | `FlValue(FlValue)`          |
| `Map`              | `FlValue(FlValue, FlValue)` |

{:.table .table-striped}

</Tab>
</Tabs>

[MessageCodec]: https://api.flutter.dev/flutter/services/MessageCodec-class.html

## 使用平台通道呼叫平台專屬程式碼 {:#example}

以下程式碼展示如何呼叫平台專屬 API 來取得並顯示
目前的電池電量。它分別使用
Android 的 `BatteryManager` API、
iOS 的 `device.batteryLevel` API、
Windows 的 `GetSystemPowerStatus` API，
以及 Linux 的 `UPower` API，並透過單一
平台訊息 `getBatteryLevel()` 來實現。

此範例將平台專屬程式碼直接寫在
主應用程式中。如果你想要在多個應用程式中重複使用這些
平台專屬程式碼，專案建立步驟會略有不同
（請參閱[開發套件][plugins]），
但平台通道的程式碼
寫法仍然相同。

:::note
本範例的完整可執行原始碼可在
[`/examples/platform_channel/`][]
取得，涵蓋 Android（Java）、iOS（Objective-C）、
Windows（C++）、Linux（C）。
若需 iOS（Swift）版本，
請參閱 [`/examples/platform_channel_swift/`][]。
:::

### 步驟 1：建立新應用程式專案 {:#example-project}

首先建立一個新的應用程式：

* 在終端機執行：`flutter create batterylevel`

預設情況下，範本支援以 Kotlin 撰寫 Android 程式碼，
或以 Swift 撰寫 iOS 程式碼。若要使用 Java 或 Objective-C，
請加上 `-i` 和/或 `-a` 參數：

* 在終端機執行：`flutter create -i objc -a java batterylevel`

### 步驟 2：建立 Flutter 平台端客戶端 {:#example-client}

應用程式的 `State` 類別負責維護目前的應用狀態（state）。
你可以擴充它以儲存目前的電池狀態。

首先，建立通道。使用一個帶有單一
平台方法的 `MethodChannel`，該方法會回傳電池電量。

通道的客戶端與主機端會透過
在通道建構函式中傳入的通道名稱進行連接。
同一個應用程式中所有通道名稱必須
唯一；建議在通道名稱前加上獨特的「網域前綴（domain prefix）」，例如：`samples.flutter.dev/battery`。

<?code-excerpt "platform_channels/lib/platform_channels.dart (import)"?>
```dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
```

<?code-excerpt "platform_channels/lib/platform_channels.dart (my-home-page-state)"?>
```dart
class _MyHomePageState extends State<MyHomePage> {
  static const platform = MethodChannel('samples.flutter.dev/battery');
  // Get battery level.
```

接下來，透過 method channel（方法通道）呼叫一個方法，並使用 `String` 識別符
指定要呼叫的具體方法 `getBatteryLevel`。
這個呼叫有可能會失敗&mdash;例如，
當平台不支援該平台 API（像是在模擬器中執行時），
因此請將 `invokeMethod` 呼叫包裹在 try-catch 陳述式中。

使用回傳的結果，在 `setState` 內的 `_batteryLevel` 中更新使用者介面狀態（state）。

<?code-excerpt "platform_channels/lib/platform_channels.dart (get-battery)"?>
```dart
// Get battery level.
String _batteryLevel = 'Unknown battery level.';

Future<void> _getBatteryLevel() async {
  String batteryLevel;
  try {
    final result = await platform.invokeMethod<int>('getBatteryLevel');
    batteryLevel = 'Battery level at $result % .';
  } on PlatformException catch (e) {
    batteryLevel = "Failed to get battery level: '${e.message}'.";
  }

  setState(() {
    _batteryLevel = batteryLevel;
  });
}
```

最後，將範本中的 `build` 方法替換為包含一個小型使用者介面，
該介面會以字串形式顯示電池狀態，並提供一個按鈕用於重新整理該數值。

<?code-excerpt "platform_channels/lib/platform_channels.dart (build)"?>
```dart
@override
Widget build(BuildContext context) {
  return Material(
    child: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ElevatedButton(
            onPressed: _getBatteryLevel,
            child: const Text('Get Battery Level'),
          ),
          Text(_batteryLevel),
        ],
      ),
    ),
  );
}
```

### 步驟 3：新增 Android 平台專屬實作

<Tabs key="android-language">
<Tab name="Kotlin">

首先，請在 Android Studio 中開啟你的 Flutter 應用程式的 Android 主機端部分：

1. 啟動 Android Studio

1. 選擇選單項目 **File > Open...**

1. 導航至你的 Flutter 應用程式所在的目錄，並選擇其中的 **android** 資料夾。點擊 **OK**。

1. 在專案檢視的 **kotlin** 資料夾中，開啟檔案 `MainActivity.kt`。

在 `configureFlutterEngine()` 方法內，建立一個 `MethodChannel` 並呼叫
`setMethodCallHandler()`。請確保使用與 Flutter 客戶端端相同的 channel 名稱。

```kotlin title="MainActivity.kt"
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
  private val CHANNEL = "samples.flutter.dev/battery"

  override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
    super.configureFlutterEngine(flutterEngine)
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      call, result ->
      // This method is invoked on the main thread.
      // TODO
    }
  }
}
```

新增使用 Android battery API 來取得電池電量的 Android Kotlin 程式碼。
這段程式碼與你在原生 Android 應用程式中撰寫的內容完全相同。

首先，在檔案頂部加入所需的 import：

```kotlin title="MainActivity.kt"
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
```

接下來，請在 `MainActivity` 類別中，於 `configureFlutterEngine()` 方法的下方新增以下方法：

```kotlin title="MainActivity.kt"
  private fun getBatteryLevel(): Int {
    val batteryLevel: Int
    if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
      val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    } else {
      val intent = ContextWrapper(applicationContext).registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
      batteryLevel = intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 / intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
    }

    return batteryLevel
  }
```

最後，請完成前面新增的 `setMethodCallHandler()` 方法。
你需要處理單一的平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。
這個平台方法的實作會呼叫前一步所撰寫的 Android 程式碼，並透過 `result` 參數，
分別在成功與錯誤的情況下回傳對應的回應。
如果收到未知的方法呼叫，則回報該情況。

請移除以下程式碼：

```kotlin title="MainActivity.kt"
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      call, result ->
      // This method is invoked on the main thread.
      // TODO
    }
```

並替換為以下內容：

```kotlin title="MainActivity.kt"
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      // This method is invoked on the main thread.
      call, result ->
      if (call.method == "getBatteryLevel") {
        val batteryLevel = getBatteryLevel()

        if (batteryLevel != -1) {
          result.success(batteryLevel)
        } else {
          result.error("UNAVAILABLE", "Battery level not available.", null)
        }
      } else {
        result.notImplemented()
      }
    }
```

</Tab>
<Tab name="Java">

首先，請在 Android Studio 中開啟你的 Flutter 應用程式的 Android 主機端部分：

1. 啟動 Android Studio

1. 選擇選單項目 **File > Open...**

1. 導航至存放你的 Flutter 應用程式的目錄，並選擇其中的 **android** 資料夾。點擊 **OK**。

1. 在專案檢視（Project view）中，開啟 **java** 資料夾下的 `MainActivity.java` 檔案。

接下來，請建立一個 `MethodChannel`，並在 `configureFlutterEngine()` 方法內設置一個 `MethodCallHandler`。
請確保使用與 Flutter 客戶端端相同的 channel 名稱。

```java title="MainActivity.java"
import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
  private static final String CHANNEL = "samples.flutter.dev/battery";

  @Override
  public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
    super.configureFlutterEngine(flutterEngine);
    new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
        .setMethodCallHandler(
          (call, result) -> {
            // This method is invoked on the main thread.
            // TODO
          }
        );
  }
}
```

新增使用 Android 電池 API 來取得電池電量的 Android Java 程式碼。
這段程式碼與你在原生 Android 應用程式中撰寫的內容完全相同。

首先，在檔案頂部加入所需的 import：

```java title="MainActivity.java"
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
```

然後，請在 activity 類別中新增以下方法，放在 `configureFlutterEngine()` 方法的下方：

```java title="MainActivity.java"
  private int getBatteryLevel() {
    int batteryLevel = -1;
    if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
      BatteryManager batteryManager = (BatteryManager) getSystemService(BATTERY_SERVICE);
      batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
    } else {
      Intent intent = new ContextWrapper(getApplicationContext()).
          registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
      batteryLevel = (intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100) /
          intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
    }

    return batteryLevel;
  }
```

最後，請完成前面新增的 `setMethodCallHandler()` 方法。
你只需要處理單一的平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。這個平台方法的實作會呼叫你在前一步撰寫的 Android 程式碼，
並透過 `result` 參數回傳成功或錯誤的回應。
如果呼叫的是未知的方法，則應回報該情況。

請移除以下程式碼：

```java title="MainActivity.java"
      new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
        .setMethodCallHandler(
          (call, result) -> {
            // This method is invoked on the main thread.
            // TODO
          }
      );
```

並替換為以下內容：

```java title="MainActivity.java"
      new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
        .setMethodCallHandler(
          (call, result) -> {
            // This method is invoked on the main thread.
            if (call.method.equals("getBatteryLevel")) {
              int batteryLevel = getBatteryLevel();

              if (batteryLevel != -1) {
                result.success(batteryLevel);
              } else {
                result.error("UNAVAILABLE", "Battery level not available.", null);
              }
            } else {
              result.notImplemented();
            }
          }
      );
```

</Tab>
</Tabs>

你現在應該可以在 Android 上執行這個應用程式。如果使用的是 Android
模擬器，請在工具列上的 **...** 按鈕進入 Extended Controls 面板，設定電池電量。

### 步驟 4：新增 iOS 平台專屬實作

<Tabs key="darwin-language">
<Tab name="Swift">

首先，請在 Xcode 中開啟你的 Flutter 應用程式的 iOS 主機部分：

1. 啟動 Xcode。

1. 選擇選單項目 **File > Open...**。

1. 導覽到存放你的 Flutter 應用程式的目錄，然後選取其中的 **ios**
資料夾。點選 **OK**。

在使用 Objective-C 的標準範本設定中加入對 Swift 的支援：

1. 在專案導覽器中**展開 Runner > Runner**。

1. 在專案導覽器的 **Runner > Runner** 下，開啟檔案 `AppDelegate.swift`。

覆寫 `application:didFinishLaunchingWithOptions:` 函式，並建立一個與頻道名稱
`samples.flutter.dev/battery` 綁定的 `FlutterMethodChannel`：

:::note
如果你的應用程式採用 `UISceneDelegate` 生命週期（Flutter 3.41+ 的預設值），
`window` 在 `application(_:didFinishLaunchingWithOptions:)` 期間將為 `nil`。
為了避免崩潰，請使用 `FlutterImplicitEngineDelegate` 協定，
並在 `didInitializeImplicitFlutterEngine` 方法中建立你的 `FlutterMethodChannel`。
:::

```swift title="AppDelegate.swift"
@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {
   
  func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
    GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

    let batteryChannel = FlutterMethodChannel(
      name: "samples.flutter.dev/battery",
      binaryMessenger: engineBridge.applicationRegistrar.messenger()
    )

    batteryChannel.setMethodCallHandler({
      [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
      // This method is invoked on the UI thread.
      // Handle battery messages.
    })
  }
}
```

接下來，新增使用 iOS 電池 API 來取得電池電量的 iOS Swift 程式碼。
這段程式碼與你在原生 iOS 應用程式中撰寫的方式完全相同。

請將以下內容作為新方法，加入至 `AppDelegate.swift` 的底部：

```swift title="AppDelegate.swift"
private func receiveBatteryLevel(result: FlutterResult) {
  let device = UIDevice.current
  device.isBatteryMonitoringEnabled = true
  if device.batteryState == UIDevice.BatteryState.unknown {
    result(FlutterError(code: "UNAVAILABLE",
                        message: "Battery level not available.",
                        details: nil))
  } else {
    result(Int(device.batteryLevel * 100))
  }
}
```

最後，請完成前面新增的 `setMethodCallHandler()` 方法。
你只需要處理單一的平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。
這個平台方法的實作會呼叫你在前一步撰寫的 iOS 程式碼。如果呼叫到未知的方法，
則應回報該情況。

```swift title="AppDelegate.swift"
batteryChannel.setMethodCallHandler({
  [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
  // This method is invoked on the UI thread.
  guard call.method == "getBatteryLevel" else {
    result(FlutterMethodNotImplemented)
    return
  }
  self?.receiveBatteryLevel(result: result)
})
```

</Tab>
<Tab name="Objective-C">

首先，在 Xcode 中開啟 Flutter 應用程式的 iOS 主機端部分：

1. 啟動 Xcode。

1. 選擇選單項目 **File > Open...**。

1. 導航到存放你的 Flutter 應用程式的目錄，然後選擇其中的 **ios** 資料夾。點擊 **OK**。

1. 確認 Xcode 專案可以無錯誤地建置（build）。

1. 在 Project navigator 中，開啟位於 **Runner > Runner** 下的 `AppDelegate.m` 檔案。

在 `application
didFinishLaunchingWithOptions:` 方法內建立一個 `FlutterMethodChannel`，並加入一個 handler。
請確保使用與 Flutter 客戶端端相同的 channel 名稱。

:::note
如果你的應用程式採用 `UISceneDelegate` 生命週期（Flutter 3.41+ 的預設值），
`window` 在 `application:didFinishLaunchingWithOptions:` 期間將為 `nil`。
為了避免崩潰，請使用 `FlutterImplicitEngineDelegate` 協定，
並在 `didInitializeImplicitFlutterEngine` 方法中建立你的 `FlutterMethodChannel`。
:::

```objc title="AppDelegate.m"
#import <Flutter/Flutter.h>
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate

- (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
  [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];

  FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
                                        methodChannelWithName:@"samples.flutter.dev/battery"
                                        binaryMessenger:engineBridge.applicationRegistrar.messenger];

  [batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
    // This method is invoked on the UI thread.
    // TODO
  }];
}
@end
```

接下來，新增使用 iOS 電池 API 來取得電池電量的 iOS ObjectiveC 程式碼。
這段程式碼與你在原生 iOS 應用程式中撰寫的方式完全相同。

請在 `AppDelegate` 類別中，於 `@end` 之前加入以下方法：

```objc title="AppDelegate.m"
- (int)getBatteryLevel {
  UIDevice* device = UIDevice.currentDevice;
  device.batteryMonitoringEnabled = YES;
  if (device.batteryState == UIDeviceBatteryStateUnknown) {
    return -1;
  } else {
    return (int)(device.batteryLevel * 100);
  }
}
```

最後，請完成前面新增的 `setMethodCallHandler()` 方法。
你需要處理單一平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。這個平台方法的實作會呼叫前一個步驟所撰寫的 iOS 程式碼，
並且透過 `result` 參數回傳成功或錯誤的結果。如果收到未知的方法呼叫，則回報該情況。

```objc title="AppDelegate.m"
__weak typeof(self) weakSelf = self;
[batteryChannel setMethodCallHandler:^(FlutterMethodCall* call, FlutterResult result) {
  // This method is invoked on the UI thread.
  if ([@"getBatteryLevel" isEqualToString:call.method]) {
    int batteryLevel = [weakSelf getBatteryLevel];

    if (batteryLevel == -1) {
      result([FlutterError errorWithCode:@"UNAVAILABLE"
                                 message:@"Battery level not available."
                                 details:nil]);
    } else {
      result(@(batteryLevel));
    }
  } else {
    result(FlutterMethodNotImplemented);
  }
}];
```

</Tab>
</Tabs>

你現在應該可以在 iOS 上執行這個應用程式了。
如果你使用的是 iOS 模擬器（Simulator），
請注意它不支援電池相關 API，
因此應用程式會顯示「Battery level not available」（電池電量無法取得）。

### 步驟 5：新增 Windows 平台專屬實作

首先，請在 Visual Studio 中開啟你的 Flutter 應用程式的 Windows 主機端部分：

1. 在你的專案目錄下執行 `flutter build windows` 一次，以產生
   Visual Studio 的解決方案檔案（solution file）。

1. 啟動 Visual Studio。

1. 選擇 **Open a project or solution**（開啟專案或解決方案）。

1. 導航至你的 Flutter 應用程式所在的目錄，然後進入 **build**
   資料夾，再進入 **windows** 資料夾，接著選取 `batterylevel.sln` 檔案。
   點擊 **Open**（開啟）。

新增平台通道（platform channel）方法的 C++ 實作：

1. 在方案總管（Solution Explorer）中展開 **batterylevel > Source Files**。

1. 開啟檔案 `flutter_window.cpp`。

首先，在檔案頂部、緊接在 `#include "flutter_window.h"` 之後，加入必要的 include：

```cpp title="flutter_window.cpp"
#include <flutter/event_channel.h>
#include <flutter/event_sink.h>
#include <flutter/event_stream_handler_functions.h>
#include <flutter/method_channel.h>
#include <flutter/standard_method_codec.h>
#include <windows.h>

#include <memory>
```

編輯 `FlutterWindow::OnCreate` 方法，並建立一個與頻道名稱
`samples.flutter.dev/battery` 綁定的 `flutter::MethodChannel`：

```cpp title="flutter_window.cpp"
bool FlutterWindow::OnCreate() {
  // ...
  RegisterPlugins(flutter_controller_->engine());

  flutter::MethodChannel<> channel(
      flutter_controller_->engine()->messenger(), "samples.flutter.dev/battery",
      &flutter::StandardMethodCodec::GetInstance());
  channel.SetMethodCallHandler(
      [](const flutter::MethodCall<>& call,
         std::unique_ptr<flutter::MethodResult<>> result) {
        // TODO
      });

  SetChildContent(flutter_controller_->view()->GetNativeWindow());
  return true;
}
```

接下來，新增使用 Windows 電池 API 來取得電池電量的 C++ 程式碼。
這段程式碼與你在原生 Windows 應用程式中撰寫的方式完全相同。

請在 `flutter_window.cpp` 的最上方、`#include` 區段之後，新增以下作為一個新函式：

```cpp title="flutter_window.cpp"
static int GetBatteryLevel() {
  SYSTEM_POWER_STATUS status;
  if (GetSystemPowerStatus(&status) == 0 || status.BatteryLifePercent == 255) {
    return -1;
  }
  return status.BatteryLifePercent;
}
```

最後，完成先前新增的 `setMethodCallHandler()` 方法。
你需要處理單一的平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。
這個平台方法的實作會呼叫前一步所撰寫的 Windows 程式碼。如果呼叫到未知的方法，
則應回報該情況。

請移除以下程式碼：

```cpp title="flutter_window.cpp"
  channel.SetMethodCallHandler(
      [](const flutter::MethodCall<>& call,
         std::unique_ptr<flutter::MethodResult<>> result) {
        // TODO
      });
```

並替換為以下內容：

```cpp title="flutter_window.cpp"
  channel.SetMethodCallHandler(
      [](const flutter::MethodCall<>& call,
         std::unique_ptr<flutter::MethodResult<>> result) {
        if (call.method_name() == "getBatteryLevel") {
          int battery_level = GetBatteryLevel();
          if (battery_level != -1) {
            result->Success(battery_level);
          } else {
            result->Error("UNAVAILABLE", "Battery level not available.");
          }
        } else {
          result->NotImplemented();
        }
      });
```

你現在應該可以在 Windows 上執行這個應用程式了。
如果你的裝置沒有電池，
則會顯示「Battery level not available」。

### 步驟 6：新增 macOS 平台專屬實作

首先，請在 Xcode 中開啟 Flutter 應用程式的 macOS 主機端部分：

1. 啟動 Xcode。

1. 選擇選單項目 **File > Open...**。

1. 導航至存放你的 Flutter 應用程式的目錄，並選取其中的 **macos**
資料夾。點選 **OK**。

新增平台通道方法的 Swift 實作：

1. 在專案導覽器中，**展開 Runner > Runner**。

1. 在專案導覽器的 **Runner > Runner** 下，開啟檔案 `MainFlutterWindow.swift`。

首先，在檔案頂部、緊接在 `import FlutterMacOS` 之後，加入必要的 import：

```swift title="MainFlutterWindow.swift"
import IOKit.ps
```

在 `awakeFromNib` 方法中，建立一個與頻道名稱
`samples.flutter.dev/battery` 綁定的 `FlutterMethodChannel`：

```swift title="MainFlutterWindow.swift"
  override func awakeFromNib() {
    // ...
    self.setFrame(windowFrame, display: true)

    let batteryChannel = FlutterMethodChannel(
      name: "samples.flutter.dev/battery",
      binaryMessenger: flutterViewController.engine.binaryMessenger)
    batteryChannel.setMethodCallHandler { (call, result) in
      // This method is invoked on the UI thread.
      // Handle battery messages.
    }

    RegisterGeneratedPlugins(registry: flutterViewController)

    super.awakeFromNib()
  }
}
```

接下來，新增 macOS Swift 程式碼，該程式碼會使用 IOKit 電池 API 來取得電池電量。
這段程式碼與你在原生 macOS 應用程式中撰寫的方式完全相同。

請將以下內容作為新方法，加入至 `MainFlutterWindow.swift` 的底部：

```swift title="MainFlutterWindow.swift"
private func getBatteryLevel() -> Int? {
  let info = IOPSCopyPowerSourcesInfo().takeRetainedValue()
  let sources: Array<CFTypeRef> = IOPSCopyPowerSourcesList(info).takeRetainedValue() as Array
  if let source = sources.first {
    let description =
      IOPSGetPowerSourceDescription(info, source).takeUnretainedValue() as! [String: AnyObject]
    if let level = description[kIOPSCurrentCapacityKey] as? Int {
      return level
    }
  }
  return nil
}
```

最後，完成先前新增的 `setMethodCallHandler` 方法。
你需要處理單一的平台方法 `getBatteryLevel()`，
因此請在 `call` 參數中進行判斷。
這個平台方法的實作會呼叫
你在前一個步驟中撰寫的 macOS 程式碼。如果呼叫到未知的方法，
則應回報該情況。

```swift title="MainFlutterWindow.swift"
batteryChannel.setMethodCallHandler { (call, result) in
  switch call.method {
  case "getBatteryLevel":
    guard let level = getBatteryLevel() else {
      result(
        FlutterError(
          code: "UNAVAILABLE",
          message: "Battery level not available",
          details: nil))
     return
    }
    result(level)
  default:
    result(FlutterMethodNotImplemented)
  }
}
```

你現在應該可以在 macOS 上執行這個應用程式了。
如果你的裝置沒有電池，
它會顯示「Battery level not available」。

### 步驟 7：新增 Linux 平台專屬實作

在這個範例中，你需要安裝 `upower` 開發標頭（developer headers）。
這通常可以透過你的發行版取得，例如可以使用：

```console
sudo apt install libupower-glib-dev
```

首先，請在你選擇的編輯器中開啟 Flutter 應用程式的 Linux 主機端部分。以下說明以安裝有「C/C++」與「CMake」擴充功能的 Visual Studio Code 為例，但你也可以依照其他 IDE 進行調整。

1. 啟動 Visual Studio Code。

1. 開啟專案中的 **linux** 目錄。

1. 在出現詢問「`Would you like to configure project "linux"?`」的提示時，選擇 **Yes**。
   這將啟用 C++ 自動補全功能。

1. 開啟檔案 `runner/my_application.cc`。

首先，在檔案頂部、緊接在 `#include <flutter_linux/flutter_linux.h>` 之後，加入必要的 include：

```c title="runner/my_application.cc"
#include <math.h>
#include <upower.h>
```

在 `_MyApplication` 結構體中新增一個 `FlMethodChannel`：

```c title="runnner/my_application.cc"
struct _MyApplication {
  GtkApplication parent_instance;
  char** dart_entrypoint_arguments;
  FlMethodChannel* battery_channel;
};
```

請確保在 `my_application_dispose` 中進行清理：

```c title="runner/my_application.cc"
static void my_application_dispose(GObject* object) {
  MyApplication* self = MY_APPLICATION(object);
  g_clear_pointer(&self->dart_entrypoint_arguments, g_strfreev);
  g_clear_object(&self->battery_channel);
  G_OBJECT_CLASS(my_application_parent_class)->dispose(object);
}
```

編輯 `my_application_activate` 方法，並在呼叫 `fl_register_plugins` 之後，
使用頻道名稱 `samples.flutter.dev/battery` 來初始化 `battery_channel`：

```c title="runner/my_application.cc"
static void my_application_activate(GApplication* application) {
  // ...
  fl_register_plugins(FL_PLUGIN_REGISTRY(self->view));

  g_autoptr(FlStandardMethodCodec) codec = fl_standard_method_codec_new();
  self->battery_channel = fl_method_channel_new(
      fl_engine_get_binary_messenger(fl_view_get_engine(view)),
      "samples.flutter.dev/battery", FL_METHOD_CODEC(codec));
  fl_method_channel_set_method_call_handler(
      self->battery_channel, battery_method_call_handler, self, nullptr);

  gtk_widget_grab_focus(GTK_WIDGET(self->view));
}
```

接下來，新增使用 Linux battery API 來取得電池電量的 C 程式碼。
這段程式碼與你在原生 Linux 應用程式中撰寫的內容完全相同。

請將以下程式碼作為一個新函式，新增在 `my_application.cc` 檔案頂部、
緊接在 `G_DEFINE_TYPE` 這一行之後：

```c title="runner/my_application.cc"
static FlMethodResponse* get_battery_level() {
  // Find the first available battery and report that.
  g_autoptr(UpClient) up_client = up_client_new();
  g_autoptr(GPtrArray) devices = up_client_get_devices2(up_client);
  if (devices->len == 0) {
    return FL_METHOD_RESPONSE(fl_method_error_response_new(
        "UNAVAILABLE", "Device does not have a battery.", nullptr));
  }

  UpDevice* device = UP_DEVICE(g_ptr_array_index(devices, 0));
  double percentage = 0;
  g_object_get(device, "percentage", &percentage, nullptr);

  g_autoptr(FlValue) result =
      fl_value_new_int(static_cast<int64_t>(round(percentage)));
  return FL_METHOD_RESPONSE(fl_method_success_response_new(result));
}
```

最後，請加入前面在呼叫 `fl_method_channel_set_method_call_handler` 時所參考的
`battery_method_call_handler` 函式。
你只需要處理一個平台方法 `getBatteryLevel`，
因此請在 `method_call` 參數中進行檢查。
這個函式的實作會呼叫前一步所撰寫的 Linux 程式碼。如果收到未知的方法呼叫，則回報該情況。

請將以下程式碼加入在 `get_battery_level` 函式之後：

```cpp title="runner/my_application.cpp"
static void battery_method_call_handler(FlMethodChannel* channel,
                                        FlMethodCall* method_call,
                                        gpointer user_data) {
  g_autoptr(FlMethodResponse) response = nullptr;
  if (strcmp(fl_method_call_get_name(method_call), "getBatteryLevel") == 0) {
    response = get_battery_level();
  } else {
    response = FL_METHOD_RESPONSE(fl_method_not_implemented_response_new());
  }

  g_autoptr(GError) error = nullptr;
  if (!fl_method_call_respond(method_call, response, &error)) {
    g_warning("Failed to send response: %s", error->message);
  }
}
```

你現在應該可以在 Linux 上執行這個應用程式了。
如果你的裝置沒有電池，
則會顯示「Battery level not available」。

## 使用 Pigeon 套件呼叫平台專屬程式碼 {:#pigeon}

你可以使用 [`Pigeon`][] 套件，
作為 Flutter 的平台通道（platform channel）API 的替代方案，
以產生能夠以結構化且型別安全方式傳遞訊息的程式碼。Pigeon 的工作流程如下：

  * Flutter 應用程式會透過平台通道，
    將結構化且型別安全的訊息傳送給其 _host_（非 Dart 部分的應用程式）。

  * _host_ 會在平台通道上監聽並接收訊息，然後使用原生程式語言呼叫任意數量的
    平台專屬 API，並將回應傳回給 _client_（應用程式中的 Flutter 部分）。

使用這個套件可以免除 host 與 client 之間在訊息名稱與資料型別上對應字串的需求。
它支援巢狀類別、將訊息分組為 API、產生非同步包裝程式碼，以及雙向傳遞訊息。
產生的程式碼可讀性高，並保證不同版本的多個 client 之間不會產生衝突。

透過 Pigeon，你可以用 Dart 的子集來定義訊息協定，然後產生適用於
Android、iOS、macOS 或 Windows 的訊息傳遞程式碼。例如：

<?code-excerpt "pigeon/lib/pigeon_source.dart (search)"?>
```dart title="pigeon_source.dart"
import 'package:pigeon/pigeon.dart';

class SearchRequest {
  final String query;

  SearchRequest({required this.query});
}

class SearchReply {
  final String result;

  SearchReply({required this.result});
}

@HostApi()
abstract class Api {
  @async
  SearchReply search(SearchRequest request);
}
```

<?code-excerpt "pigeon/lib/use_pigeon.dart (use-api)"?>
```dart title="use_pigeon.dart"
import 'generated_pigeon.dart';

Future<void> onClick() async {
  SearchRequest request = SearchRequest(query: 'test');
  Api api = SomeApi();
  SearchReply reply = await api.search(request);
  print('reply: ${reply.result}');
}
```

你可以在 pub.dev 的 [`pigeon`][] 頁面找到完整範例與更多資訊。

## 通道與平台執行緒

當你在平台端呼叫要傳送給 Flutter 的通道時，請在平台的主執行緒（main thread）上執行。
當你在 Flutter 中呼叫要傳送給平台端的通道時，可以在任何作為根 `Isolate` 的 `Isolate`，
_或_ 已註冊為背景 `Isolate` 的 `Isolate` 上執行。
平台端的處理程序可以在平台的主執行緒上執行，也可以在使用 Task Queue 時於背景執行緒上執行。
你可以在任何執行緒上非同步呼叫平台端的處理程序。

:::note
在 Android 上，平台的主執行緒有時被稱為「main thread」，但技術上定義為
[UI 執行緒][the UI thread]。需要在 UI 執行緒上執行的方法，請加上 `@UiThread` 註解。
在 iOS 上，這條執行緒正式稱為[主執行緒][the main thread]。
:::

### 從背景 isolate 使用插件與通道 {: #using-plugins-and-channels-from-background-isolates }

插件與通道可以被任何 `Isolate` 使用，但該 `Isolate` 必須是根 `Isolate`（由 Flutter 建立的），
或已註冊為根 `Isolate` 的背景 `Isolate`。

以下範例展示如何註冊一個背景 `Isolate`，以便從背景 `Isolate` 使用插件。

```dart
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

void _isolateMain(RootIsolateToken rootIsolateToken) async {
  BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  print(sharedPreferences.getBool('isDebug'));
}

void main() {
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;
  Isolate.spawn(_isolateMain, rootIsolateToken);
}
```

### 在背景執行緒上執行 channel handler（Android） {: #executing-channel-handlers-on-background-threads }

若要讓 channel 的平台端 handler 能在 Android 應用程式中於背景執行緒上執行，
你必須使用 Task Queue API。

<Tabs key="lang-tabs">

<Tab name="Kotlin">

```kotlin
override fun onAttachedToEngine(@NonNull flutterPluginBinding: FlutterPlugin.FlutterPluginBinding) {
  val taskQueue =
      flutterPluginBinding.binaryMessenger.makeBackgroundTaskQueue()
  channel = MethodChannel(flutterPluginBinding.binaryMessenger,
                          "com.example.foo",
                          StandardMethodCodec.INSTANCE,
                          taskQueue)
  channel.setMethodCallHandler(this)
}
```

</Tab>

<Tab name="Java">

```java
@Override
public void onAttachedToEngine(@NonNull FlutterPluginBinding binding) {
  BinaryMessenger messenger = binding.getBinaryMessenger();
  BinaryMessenger.TaskQueue taskQueue =
      messenger.makeBackgroundTaskQueue();
  channel =
      new MethodChannel(
          messenger,
          "com.example.foo",
          StandardMethodCodec.INSTANCE,
          taskQueue);
  channel.setMethodCallHandler(this);
}
```

</Tab>

</Tabs>

### 在背景執行緒上執行 channel handler（iOS）

若要讓某個 channel 的平台端 handler 能夠在 iOS 應用程式的背景執行緒上執行，
必須使用 Task Queue API。

<Tabs key="lang-tabs">

<Tab name="Swift">

```swift
public static func register(with registrar: FlutterPluginRegistrar) {
  let taskQueue = registrar.messenger().makeBackgroundTaskQueue?()
  let channel = FlutterMethodChannel(name: "com.example.foo",
                                     binaryMessenger: registrar.messenger(),
                                     codec: FlutterStandardMethodCodec.sharedInstance(),
                                     taskQueue: taskQueue)
  let instance = MyPlugin()
  registrar.addMethodCallDelegate(instance, channel: channel)
}
```

</Tab>

<Tab name="Objective-C">

```objc
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  NSObject<FlutterTaskQueue>* taskQueue =
      [[registrar messenger] makeBackgroundTaskQueue];
  FlutterMethodChannel* channel =
      [FlutterMethodChannel methodChannelWithName:@"com.example.foo"
                                  binaryMessenger:[registrar messenger]
                                            codec:[FlutterStandardMethodCodec sharedInstance]
                                        taskQueue:taskQueue];
  MyPlugin* instance = [[MyPlugin alloc] init];
  [registrar addMethodCallDelegate:instance channel:channel];
}
```

</Tab>

</Tabs>

### 切換至 UI 執行緒（Android） {: #jumping-to-the-ui-thread-in-android }

為了符合 channels 的 UI 執行緒需求，
你可能需要從背景執行緒切換到 Android 的 UI 執行緒，
以執行 channel 方法。
在 Android 中，你可以透過 `post()` 一個
`Runnable` 到 Android 的 UI 執行緒 `Looper`，
這樣會讓 `Runnable` 在主執行緒於下一個可用時機執行。

<Tabs key="lang-tabs">

<Tab name="Kotlin">

```kotlin
Handler(Looper.getMainLooper()).post {
  // Call the desired channel message here.
}
```

</Tab>

<Tab name="Java">

```java
new Handler(Looper.getMainLooper()).post(new Runnable() {
  @Override
  public void run() {
    // Call the desired channel message here.
  }
});
```

</Tab>

</Tabs>

### 跳轉至主執行緒（iOS） {: #jumping-to-the-main-thread-in-ios }

為了符合 channel 的主執行緒要求，
你可能需要從背景執行緒跳轉到
iOS 的主執行緒來執行 channel 方法。
你可以透過在 iOS 的主 [dispatch queue][] 上執行一個
[block][] 來達成這個目的：

<Tabs key="lang-tabs">

<Tab name="Objective-C">

```objc
dispatch_async(dispatch_get_main_queue(), ^{
  // Call the desired channel message here.
});
```

</Tab>

<Tab name="Swift">

```swift
DispatchQueue.main.async {
  // Call the desired channel message here.
}
```

</Tab>

</Tabs>

## 補充說明

### 常見的通道與編解碼器 {:#codec2}

以下列出了一些常見的平台通道 API，可用於撰寫平台專屬程式碼：

* [`MethodChannel`][]（Flutter）：一個具名通道，可用於透過非同步方法呼叫與平台插件進行溝通。
  預設情況下，此通道使用 [`StandardMessageCodec`][] 編解碼器。
  此通道並非型別安全，這表示訊息的呼叫與接收需依賴主端與客戶端雙方宣告相同的參數與資料型別，
  訊息才能正確傳遞。

* [`BasicMessageChannel`][]（Flutter）：一個具名通道，支援基本的非同步訊息傳遞，
  並可使用支援的訊息編解碼器。並非型別安全。

* [Engine Embedder APIs][]（各平台）：這些平台專屬 API 包含了平台專屬的通道 API。

你可以自行建立編解碼器，或使用現有的編解碼器。以下是一些可用於平台專屬程式碼的現有編解碼器：

* [`StandardMessageCodec`][]：一個常用的訊息編解碼器，能將各種資料型別編碼與解碼為
  平台無關的二進位格式，方便在平台通道間傳輸。當你傳送與接收值時，值的序列化與反序列化會自動進行。
  支援的資料型別請參見[平台通道資料型別支援](#codec)。

* [`BinaryCodec`][]：一種訊息編解碼器，用於在 Flutter 應用程式的 Dart 端與原生平台端之間
  傳遞原始二進位資料。不會對資料結構進行更高階的編碼或解碼。

* [`StringCodec`][]：一種訊息編解碼器，使用 UTF-8 編碼來編碼與解碼字串。

* [`JSONMessageCodec`][]：一種訊息編解碼器，使用 UTF-8 編碼來編碼與解碼 JSON 格式的資料。

* [`FirestoreMessageCodec`][]：一種訊息編解碼器，專門處理 Flutter 應用程式與原生
  Firebase Firestore SDK（Android 與 iOS）之間，透過平台通道傳送的訊息交換。

[MessageCodec]: {{site.api}}/flutter/services/MessageCodec-class.html

### 將平台專屬程式碼與 UI 程式碼分離 {:#separate}

如果你預期在多個 Flutter 應用程式中重複使用平台專屬程式碼，建議將這些程式碼分離，
建立於主應用程式外部目錄中的平台插件。詳情請參見[開發套件][developing packages]。

### 以套件形式發佈平台專屬程式碼 {:#publish}

若要與 Flutter 生態系中的其他開發者分享你的平台專屬程式碼，請參見[發佈套件][publishing packages]。

[`BasicMessageChannel`]: {{site.api}}/flutter/services/BasicMessageChannel-class.html
[`BinaryCodec`]: {{site.api}}/flutter/services/BinaryCodec-class.html
[block]: {{site.apple-dev}}/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithBlocks/WorkingwithBlocks.html
[`FirestoreMessageCodec`]: {{site.github}}/firebase/flutterfire/blob/master/packages/cloud_firestore/cloud_firestore_platform_interface/lib/src/method_channel/utils/firestore_message_codec.dart
[developing packages]: /packages-and-plugins/developing-packages
[Engine Embedder APIs]: {{site.dart.api}}/index.html#more-documentation
[`Pigeon`]: {{site.pub-pkg}}/pigeon
[plugins]: /packages-and-plugins/developing-packages#plugin
[dispatch queue]: {{site.apple-dev}}/documentation/dispatch/dispatchqueue
[`/examples/platform_channel/`]: {{site.repo.flutter}}/tree/main/examples/platform_channel
[`/examples/platform_channel_swift/`]: {{site.repo.flutter}}/tree/main/examples/platform_channel_swift
[JS interoperability]: {{site.dart-site}}/web/js-interop
[`JSONMessageCodec`]: {{site.api}}/flutter/services/JSONMessageCodec-class.html
[`MethodChannel`]: {{site.api}}/flutter/services/MethodChannel-class.html
[`MethodChannel` for Flutter]: {{site.api}}/flutter/services/MethodChannel-class.html
[`MethodChannel` for Android]: {{site.api}}/javadoc/io/flutter/plugin/common/MethodChannel.html
[`FlutterMethodChannel` for iOS]: {{site.api}}/ios-embedder/interface_flutter_method_channel.html
[Platform adaptations]: /platform-integration/platform-adaptations
[publishing packages]: /packages-and-plugins/developing-packages#publish
[`quick_actions`]: {{site.pub}}/packages/quick_actions
[section on threading]: #channels-and-platform-threading
[`StandardMessageCodec`]: {{site.api}}/flutter/services/StandardMessageCodec-class.html
[`StringCodec`]: {{site.api}}/flutter/services/StringCodec-class.html
[the main thread]: {{site.apple-dev}}/documentation/uikit?language=objc
[the UI thread]: {{site.android-dev}}/guide/components/processes-and-threads#Threads
