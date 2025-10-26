---
title: 用於渲染至 Surface 的 Android 插件新 API
description: >-
  在 Android embedding API 中新增了一個名為 SurfaceProducer 的 API，
  這個 API 能夠不透明地處理插件的 `Surface` 建立與管理。
  對於 Impeller，建議使用此 API。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 的 Android 嵌入層（embedder）引入了一個新的 API，[`SurfaceProducer`][`SurfaceProducer`]，
允許插件渲染至 `Surface`，而無需自行管理底層實作細節。
使用舊有 [`createSurfaceTexture`][`createSurfaceTexture`] API 的插件，在 _下一個_ 穩定版發布後，
仍可繼續與 [Impeller][Impeller] 搭配運作，但建議遷移至新 API。

## 背景

Android 的 [`SurfaceTexture`][`SurfaceTexture`] 是 [`Surface`][`Surface`] 的底層實作，
其使用 [OpenGLES][OpenGLES] 紋理作為底層儲存區。

舉例來說，一個插件可能會顯示來自 _camera_ 插件的畫面：

![Flowchart](https://camo.githubusercontent.com/cdb52c5d371b4f1d5573b650a0eddb0871e5e8be1012d290e008f41bc71b2580/68747470733a2f2f736f757263652e616e64726f69642e636f6d2f7374617469632f646f63732f636f72652f67726170686963732f696d616765732f636f6e74696e756f75735f636170747572655f61637469766974792e706e67)

在較新版本的 Android API（>= 29）中，Android 引入了一個
與後端無關的 [`HardwareBuffer`][`HardwareBuffer`]，這也正好是 Flutter 嘗試使用 [Vulkan][Vulkan]
渲染器的最低版本門檻。為了支援更通用的 `Surface` 建立 API，
Android embedding API 也必須更新，不再依賴 OpenGLES。

## 遷移指南

如果你正在使用舊的 [`createSurfaceTexture`][`createSurfaceTexture`] API，建議遷移至
新的 [`createSurfaceProducer`][`createSurfaceProducer`] API。新 API 更具彈性，
允許 Flutter 引擎根據當前平台與 API 等級，自動選擇最佳實作。

1. 請改為建立 `SurfaceProducer`，而非 `SurfaceTextureEntry`：

   ```java diff
   - TextureRegistry.SurfaceTextureEntry entry = textureRegistry.createSurfaceTexture();
   + TextureRegistry.SurfaceProducer producer = textureRegistry.createSurfaceProducer();
   ```

1. 現在請不要建立`new Surface(...)`，而是要在`SurfaceProducer`上呼叫 [`getSurface()`][`getSurface()`]：

   ```java diff
   - Surface surface = new Surface(entry.surfaceTexture());
   + Surface surface = producer.getSurface();
   ```

為了在應用程式於背景暫停時節省記憶體，Android 和 Flutter _可能_ 會在畫面不再可見時銷毀 surface（表面）。為確保當應用程式回到前景時能重新建立 surface，您應該使用提供的 [`setCallback`][`setCallback`] 方法來監聽 surface 生命週期事件：

```java
surfaceProducer.setCallback(
   new TextureRegistry.SurfaceProducer.Callback() {
      @Override
      public void onSurfaceAvailable() {
         // Do surface initialization here, and draw the current frame.
      }

      @Override
      public void onSurfaceDestroyed() {
         // Do surface cleanup here, and stop drawing frames.
      }
   }
);
```

可以在 [PR 6989][PR 6989] 中找到一個完整的使用此新 API 的範例，針對 `video_player_android` 外掛（plugin）。

:::note
在此 API 的早期版本中，回呼函式名稱為 `onSurfaceCreated`，且即使原始 surface 未被銷毀也會被呼叫。這個問題已在最新（待 3.27 釋出）版本的 API 中修正。
:::

## 關於相機預覽的注意事項

如果你的外掛（plugin）實作了相機預覽功能，遷移時可能還需要修正預覽畫面的旋轉。這是因為由 `SurfaceProducer` 所產生的 `Surface` 可能不包含 Android 函式庫自動正確旋轉預覽所需的轉換資訊。

為了修正旋轉，你需要根據相機感測器方向與裝置方向，依照下列公式對預覽畫面進行旋轉：

```plaintext
rotation = (sensorOrientationDegrees - deviceOrientationDegrees * sign + 360) % 360
```

其中 `deviceOrientationDegrees` 代表逆時針旋轉的角度，`sign` 則為 1（前置鏡頭）或 -1（後置鏡頭）。

要計算此旋轉角度，請依下列步驟操作：

- 使用 [`SurfaceProducer.handlesCropAndRotation`][`SurfaceProducer.handlesCropAndRotation`] 檢查底層 `Surface` 是否處理旋轉（如果 `false`，你可能需要自行處理旋轉）。
- 取得感測器方向的角度，可透過取得 [`CameraCharacteristics.SENSOR_ORIENTATION`][`CameraCharacteristics.SENSOR_ORIENTATION`] 的值來獲得。
- 取得裝置方向的角度，可參考 [Android orientation calculation documentation][Android orientation calculation documentation] 中所述的任一方法。

要套用此旋轉角度，你可以使用 [`RotatedBox`][`RotatedBox`] 元件（Widget）。

如需此計算方式的更多資訊，請參考 [Android orientation calculation documentation][Android orientation calculation documentation]。若需完整修正範例，請參考 [this `camera_android_camerax` PR][this `camera_android_camerax` PR]。

## 時程

導入版本：3.22

:::note
此功能於 SDK 的「前一個」版本已導入，但當時尚未可用；遷移至此 API 的插件，應將 `3.24` 設為最低版本限制。
:::

在穩定版發佈：3.24

在即將發佈的穩定版 3.27 中，`onSurfaceCreated` 將被棄用，並新增 `onSurfaceAvailable` 與 `handlesCropAndRotation`。

## 參考資料

API 文件：

- [`SurfaceProducer`][`SurfaceProducer`]
- [`createSurfaceProducer`][`createSurfaceProducer`]
- [`createSurfaceTexture`][`createSurfaceTexture`]

相關議題：

- [Issue 139702][Issue 139702]
- [Issue 145930][Issue 145930]

相關 PR：

- [PR 51061][PR 51061]，在此我們於 engine 測試中測試新 API。
- [PR 6456][PR 6456]，在此我們將 `video_player` 插件遷移至新 API。
- [PR 6461][PR 6461]，在此我們將 `camera_android` 插件遷移至新 API。
- [PR 6989][PR 6989]，在此我們於 `video_player_android` 插件中新增完整的新 API 使用範例。

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
