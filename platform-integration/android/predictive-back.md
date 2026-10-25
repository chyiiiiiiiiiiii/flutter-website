# 新增預測返回（predictive back）手勢

> 瞭解如何在 Flutter 中啟用並處理 Android 預測返回（predictive back）手勢。



Android 預測返回（predictive back）手勢讓使用者在確認或取消返回手勢之前，
可以預覽返回後將前往的位置，
無論是上一個畫面還是主畫面。

## 概覽

從 Android 14（API level 34）開始，
當應用程式支援時，
系統手勢的預測返回動畫預設為啟用。
Flutter 針對預設的頁面 Route 轉場與自訂的 pop 處理，
內建支援預測返回動畫。

## 在 Android 中啟用預測返回

若要在 Android 13 或更新版本上，
讓你的 Flutter 應用程式支援預測返回手勢：

1. 開啟 `android/app/src/main/AndroidManifest.xml`。
1. 將 `android:enableOnBackInvokedCallback="true"` 加入 `<application>` 標籤：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="my_app"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:enableOnBackInvokedCallback="true">
        <!-- ... -->
    </application>
</manifest>
```

## 使用 PopScope 處理返回手勢

若要自訂返回導覽，或避免使用者
不小心離開某個畫面，
請使用 [`PopScope`][] 元件 (Widget)。
`PopScope` 取代了已棄用的 `WillPopScope` 元件，
並支援預測返回手勢。

### 回呼（callback）參數

`PopScope` 使用 `onPopInvokedWithResult` 回呼：

* `didPop`：布林值，表示 pop 操作是否成功。
  如果 `canPop` 為 `false`，則 `didPop` 為 `false`。
* `result`：在 pop Route 時傳入的選用回傳內容
  （例如使用 `Navigator.pop(context, result)`）。

### 範例：攔截返回導覽

```dart
PopScope(
  canPop: false,
  onPopInvokedWithResult: (bool didPop, Object? result) async {
    if (didPop) {
      return;
    }
    final shouldLeave = await _showExitConfirmationDialog(context);
    if (shouldLeave && context.mounted) {
      Navigator.of(context).pop(result);
    }
  },
  child: Scaffold(
    appBar: AppBar(title: const Text('Form Screen')),
    body: const Center(child: Text('Complete the form before leaving.')),
  ),
)
```

## 更多資訊

若想瞭解 API 遷移的更多細節，
請參閱 [Android 預測返回遷移指南][Android predictive back migration guide]。

[`PopScope`]: https://api.flutter.dev/flutter/widgets/PopScope-class.html
[Android predictive back migration guide]: /release/breaking-changes/android-predictive-back

