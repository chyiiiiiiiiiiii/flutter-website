---
title: 用於渲染至 Surface 的 Android 插件新 API
description: >-
  在 Android 嵌入 API 中新增了一個名為 SurfaceProducer 的新 API，
  可不透明地處理插件的 `Surface` 創建與管理。
  對於 Impeller，建議使用此 API。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Flutter 的 Android 嵌入層引入了一個新的 API，[`SurfaceProducer`][]，
允許插件渲染至 `Surface`，而無需管理其底層實作。
使用舊有 [`createSurfaceTexture`][] API 的插件，在下個穩定版發佈後仍可與 [Impeller][] 搭配運作，
但建議遷移至新 API。

## 背景

Android 的 [`SurfaceTexture`][] 是 [`Surface`][] 的底層實作，
其使用 [OpenGLES][] 紋理作為底層儲存區。

舉例來說，某個插件可能會顯示來自 _camera_ 插件的畫面：

![Flowchart](https://camo.githubusercontent.com/cdb52c5d371b4f1d5573b650a0eddb0871e5e8be1012d290e008f41bc71b2580/68747470733a2f2f736f757263652e616e64726f69642e636f6d2f7374617469632f646f63732f636f72652f67726170686963732f696d616765732f636f6e74696e756f75735f636170747572655f61637469766974792e706e67)

在較新版本的 Android API（>= 29）中，Android 引入了一個
與後端無關的 [`HardwareBuffer`][]，這也正好是 Flutter 嘗試使用 [Vulkan][]
渲染器的最低版本。為此，Android 嵌入 API 需要更新，以支援更通用的 `Surface`
創建 API，不再依賴於 OpenGLES。

## 遷移指南

如果你正在使用舊的 [`createSurfaceTexture`][] API，建議遷移至
新的 [`createSurfaceProducer`][] API。新 API 更具彈性，允許 Flutter 引擎
不透明地為當前平台與 API 等級選擇最佳實作。

1. 請改為建立 `SurfaceProducer`，而非 `SurfaceTextureEntry`：

   ```java diff
   - TextureRegistry.SurfaceTextureEntry entry = textureRegistry.createSurfaceTexture();
   + TextureRegistry.SurfaceProducer producer = textureRegistry.createSurfaceProducer();
   ```

1. 請改為在 `SurfaceProducer` 上呼叫 [`getSurface()`][]，而不是建立 `new Surface(...)`：

   ```java diff
   - Surface surface = new Surface(entry.surfaceTexture());
   + Surface surface = producer.getSurface();
   ```

為了在應用程式於背景暫停時節省記憶體，Android 和 Flutter _可能_ 會在畫面不再可見時銷毀 surface（表面）。為了確保當應用程式回到前景時能正確重新建立 surface，你應該使用提供的 [`setCallback`][] 方法來監聽 surface 生命週期事件：

```java
surfaceProducer.setCallback(
   new TextureRegistry.SurfaceProducer.Callback() {
      @Override
      public void onSurfaceAvailable() {
         // Do surface initialization here, and draw the current frame.
      }

      @Override
      public void onSurfaceCleanup() {
         // Do surface cleanup here, and stop drawing frames.
      }
   }
);
```

可以在 [PR 6989][] 中找到一個完整使用此新 API 的範例，該範例針對 `video_player_android` 插件。

:::version-note
如果你使用的是 Flutter 3.26 或更早版本，
請覆寫 `onSurfaceCreated`，而不是 `onSurfaceAvailable`。
不過請注意，即使原始 surface 沒有被銷毀，Flutter 也會呼叫 `onSurfaceCreated`。

如果你使用的是 Flutter 3.28 或更早版本，
請覆寫 `onSurfaceDestroyed`，而不是 `onSurfaceCleanup`。
不過請注意，Flutter 會在 surface 被銷毀並失效之後才呼叫 `onSurfaceDestroyed`，
因此無法在此之前提供停止渲染的時間。
:::

## 關於相機預覽的注意事項

如果你的插件實作了相機預覽功能，遷移時可能還需要修正預覽畫面的旋轉。這是因為由 `SurfaceProducer` 所產生的 `Surface` 可能不包含 Android 函式庫自動正確旋轉預覽所需的轉換資訊。

為了修正旋轉，你需要根據相機感測器方向與裝置方向，依照下列公式對預覽畫面進行旋轉：

```plaintext
rotation = (sensorOrientationDegrees - deviceOrientationDegrees * sign + 360) % 360
```

其中 `deviceOrientationDegrees` 代表逆時針旋轉的角度，`sign` 則為 1 表示前置相機，-1 表示後置相機。

要計算這個旋轉角度時：

- 使用 [`SurfaceProducer.handlesCropAndRotation`][] 來檢查底層 `Surface` 是否處理了旋轉（如果為 `false`，你可能需要自行處理旋轉）。
- 取得感測器方向的角度，方法是讀取 [`CameraCharacteristics.SENSOR_ORIENTATION`][] 的值。
- 取得裝置方向的角度，可參考 [Android orientation calculation documentation][] 中所述的任一方法。

要套用這個旋轉，你可以使用 [`RotatedBox`][] 元件 (Widget)。

如需此計算的更多資訊，請參考 [Android orientation calculation documentation][]。若需完整修正範例，請參考 [this `camera_android_camerax` PR][]。

## 時程

導入版本：3.22<br>
穩定版：3.24

:::note
此功能在 Flutter 3.22 中導入，但尚未能正常運作。
遷移至此 API 的插件應將 `3.24` 設為最低版本限制。
:::

在 Flutter 3.27 中，
`onSurfaceCreated` 已被棄用，改用 `onSurfaceAvailable`，
並新增了 `SurfaceProducer.handlesCropAndRotation`。

在 Flutter 3.29 中，
`onSurfaceDestroyed` 已被棄用，改用 `onSurfaceCleanup`。

## 參考資料

API 文件：

- [`SurfaceProducer`][]
- [`createSurfaceProducer`][]
- [`createSurfaceTexture`][]

相關議題：

- [Issue 139702][]
- [Issue 145930][]

相關 PR：

- [PR 51061][]，於 engine 測試中測試新 API。
- [PR 6456][]，將 `video_player` 插件遷移至新 API。
- [PR 6461][]，將 `camera_android` 插件遷移至新 API。
- [PR 6989][]，於 `video_player_android` 插件中新增完整的新 API 使用範例。
- [PR 160937][]，新增 `onSurfaceCleanup` 並棄用 `onSurfaceDestroyed`。

[Impeller]: /perf/impeller
[OpenGLES]: https://www.khronos.org/opengles/
[Vulkan]: https://source.android.com/docs/core/graphics/arch-vulkan
[`HardwareBuffer`]: https://developer.android.com/reference/android/hardware/HardwareBuffer
[`Surface`]: https://developer.android.com/reference/android/view/Surface
[`SurfaceProducer`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html
[`SurfaceProducer.handlesCropAndRotation`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#handlesCropAndRotation()
[`SurfaceTexture`]: https://source.android.com/docs/core/graphics/arch-st
[`createSurfaceProducer`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html#createSurfaceProducer()
[`createSurfaceTexture`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html#createSurfaceTexture()
[`getSurface()`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#getSurface()
[`setCallback`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.SurfaceProducer.html#setCallback(io.flutter.view.TextureRegistry.SurfaceProducer.Callback)
[`CameraCharacteristics.SENSOR_ORIENTATION`]: {{site.android-dev}}/reference/android/hardware/camera2/CameraCharacteristics#SENSOR_ORIENTATION
[`RotatedBox`]: {{site.api}}/flutter/widgets/RotatedBox-class.html
[Android orientation calculation documentation]: {{site.android-dev}}/media/camera/camera2/camera-preview#orientation_calculation
[this `camera_android_camerax` PR]: {{site.repo.packages}}/pull/7044
[Issue 139702]: {{site.repo.flutter}}/issues/139702
[Issue 145930]: {{site.repo.flutter}}/issues/145930
[PR 51061]: {{site.repo.engine}}/pull/51061
[PR 6456]: {{site.repo.packages}}/pull/6456
[PR 6461]: {{site.repo.packages}}/pull/6461
[PR 6989]: {{site.repo.packages}}/pull/6989
[PR 160937]: {{site.repo.flutter}}/pull/160937
