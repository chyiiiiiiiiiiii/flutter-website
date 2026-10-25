# 在 Android 上請求區域網路權限

> 了解如何在 Flutter 中開啟 Dart socket 之前，宣告並請求 Android 區域網路 (LAN) 權限。



從 Android 17（API level 37）開始，Android 預設會封鎖區域網路存取。
目標版本為 Android 17 或更高的應用程式，
若要探索、掃描區域網路上的裝置或與其連線，
必須宣告並請求 `ACCESS_LOCAL_NETWORK` 執行階段權限。

:::note
雖然此限制僅對目標版本為 Android 17（API level 37）以上的應用程式強制執行，
但你可以在 Android 16（API level 36）上選擇啟用此行為來進行測試。
:::

## 了解對 Dart socket 的影響

標準的 `dart:io` 函式庫提供低階的 socket 網路功能，
包含 [`Socket`][socket-class]、[`RawSocket`][raw-socket-class]
以及 [`ServerSocket`][server-socket-class]。
這些 socket 類別在系統層級運作，
不會與 Android 應用程式框架的 UI 互動。

由於 Dart socket 無法顯示 Android 權限提示，
任何在沒有必要權限的情況下連線到區域 IP 位址的嘗試，
都會失敗並擲出 `SocketException`。
為避免連線失敗，
請在初始化或連接 Dart socket 之前，
先在 Flutter 中請求執行階段權限。

## 在 Android 中宣告權限

在執行階段請求權限之前，
必須先在 Android manifest 中宣告該權限。

1. 開啟 `android/app/src/main/AndroidManifest.xml`。
1. 在 `<manifest>` 標籤內加入 `ACCESS_LOCAL_NETWORK` 權限：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.ACCESS_LOCAL_NETWORK" />
    <application
        ...
    </application>
</manifest>
```

## 加入 permission_handler 套件

若要從 Dart 請求 Android 執行階段權限，
請使用 [pub.dev][] 上的 [`permission_handler`][] 插件。

將 `permission_handler` 加入 Flutter 專案的相依套件：

```bash
flutter pub add permission_handler
```

## 在連接 socket 之前請求權限

在開啟 Dart socket 連線之前，
先呼叫 `Permission.accessLocalNetwork.request()`。

以下範例示範如何檢查平台、
請求區域網路權限，
並開啟 socket 連線：

```dart
import 'dart:io';
import 'package:material_ui/material_ui.dart';
import 'package:permission_handler/permission_handler.dart';

Future<void> connectToLocalDevice({
  required String host,
  required int port,
}) async {
  // Check and request runtime permission on Android.
  if (Platform.isAndroid) {
    final status = await Permission.accessLocalNetwork.request();

    if (status.isPermanentlyDenied) {
      // The user opted not to grant permission and checked "Don't ask again".
      // In a real app, show an explanation dialog before calling openAppSettings().
      debugPrint('Permission permanently denied. Please enable it in settings.');
      return;
    }

    if (!status.isGranted) {
      // Handle the case where the user denied permission.
      debugPrint('Local network permission was denied.');
      return;
    }
  }

  // Connect the Dart socket after the permission is granted.
  try {
    final socket = await Socket.connect(
      host,
      port,
      timeout: const Duration(seconds: 5),
    );

    debugPrint(
      'Connected to ${socket.remoteAddress.address}:${socket.remotePort}',
    );

    // Use the socket...

    await socket.close();
  } on SocketException catch (e) {
    debugPrint('Failed to connect: $e');
  }
}
```

## 處理權限狀態

`Permission.accessLocalNetwork.request()` 方法
會回傳 `PermissionStatus` enum，用來表示結果：

* `PermissionStatus.granted`：使用者已授予區域網路存取權限。
  你可以繼續連接 Dart socket。
* `PermissionStatus.denied`：使用者拒絕了這次請求的權限。
  在再次請求權限之前，請先向使用者說明原因。
* `PermissionStatus.permanentlyDenied`：使用者永久拒絕了權限。
  呼叫 `openAppSettings()`，協助使用者在系統設定中啟用權限。

:::tip
在一次應用程式工作階段中，你只需要取得一次權限，
但在建立 socket 連線之前先檢查狀態，
可確保網路呼叫更可靠。
:::

## 更多資訊

若要進一步了解區域網路權限與 socket 程式設計，
請參考以下資源：

* Android 開發者指南：[Local network permission][android-local-network]
* pub.dev 上的 [`permission_handler`][] 套件
* Dart [`Socket` 類別文件][socket-class]
* [GitHub 上的 Issue #184859][flutter-issue-184859]

[android-local-network]: https://developer.android.com/privacy-and-security/local-network-permission#android-17-enforcement
[`permission_handler`]: https://pub.dev/packages/permission_handler
[pub.dev]: https://pub.dev
[socket-class]: https://api.dart.dev/dart-io/Socket-class.html
[raw-socket-class]: https://api.dart.dev/dart-io/RawSocket-class.html
[server-socket-class]: https://api.dart.dev/dart-io/ServerSocket-class.html
[flutter-issue-184859]: https://github.com/flutter/flutter/issues/184859

