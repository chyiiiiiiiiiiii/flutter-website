---
title: Impeller 繪圖引擎
description: 什麼是 Impeller？如何啟用它？
---

:::note
自 3.27 版本起，Impeller 已成為 iOS 與 Android API 29+ 的預設
繪圖引擎。  
若需查看 Impeller 目前支援平台的_詳細_資訊，請參考 [Can I use Impeller?][Can I use Impeller?] 頁面。
:::

[Can I use Impeller?]: {{site.main-url}}/go/can-i-use-impeller

## 什麼是 Impeller？

Impeller 為 Flutter 提供了一個全新的繪圖執行時引擎。  
Impeller 會在引擎建置階段預先編譯一組[更小且更簡單的著色器 (shaders)][smaller, simpler set of shaders]，
因此這些著色器不會在執行階段編譯。

[smaller, simpler set of shaders]: {{site.repo.flutter}}/issues/77412

若想觀看 Impeller 的影片介紹，請參考以下來自 Google I/O 2023 的演講。

{% ytEmbed 'vd5NqS01rlA', 'Introducing Impeller, Flutter\'s new rendering engine' %}

Impeller 的設計目標如下：

* **可預測的效能**：  
  Impeller 會在建置階段離線編譯所有著色器與反射，並預先建立所有管線狀態物件。  
  引擎會主動控制快取並明確地進行快取管理。
* **可監控性（Instrumentable）**：  
  Impeller 會為所有圖形資源（如紋理與緩衝區）加上標籤與標記。  
  它可以擷取動畫並將其儲存到磁碟，且不會影響每幀繪製效能。
* **可攜性（Portable）**：  
  Flutter 並未將 Impeller 綁定於特定的客戶端繪圖 API。  
  您可以只撰寫一次著色器，必要時再轉換為後端專屬格式。
* **善用現代圖形 API**：  
  Impeller 利用（但不依賴）現代 API（如 Metal 與 Vulkan）所提供的功能。
* **善用並行處理**：  
  Impeller 可視需要將單一幀的工作負載分配至多個執行緒。

## 支援狀態

Impeller 可以在哪裡使用？如需_詳細_資訊，請參考 [Can I use Impeller?][Can I use Impeller?] 頁面。

### iOS

自 [Flutter 3.29](https://blog.flutter.dev/whats-new-in-flutter-3-29-f90c380c2317) 起，Impeller 已成為 **iOS 的預設引擎**，且無法切換回 Skia。

### Android

Impeller **在 Android API 29+ 預設啟用且可用**。  
在執行較舊版本 Android 或不支援 Vulkan 的裝置上，Impeller 會自動回退至傳統的 OpenGL 繪圖引擎。  
這種回退行為無需您額外操作。

* 若在除錯時想_停用_ Impeller，請在 `flutter run` 指令中傳入 `--no-enable-impeller`。

  ```console
  flutter run --no-enable-impeller
  ```

* 若要在部署應用程式時**停用** Impeller，
  請在專案的 `AndroidManifest.xml` 檔案中的 `<application>` 標籤下加入以下設定：

```xml
<meta-data
    android:name="io.flutter.embedding.android.EnableImpeller"
    android:value="false" />
```

### Web

Flutter 在 Web 上提供了[兩種渲染器][two renderers] ——`canvaskit` 和 `skwasm`——目前這兩種渲染器皆使用 Skia。未來它們有可能會改用 Impeller。
[two renderers]: /platform-integration/web/renderers#renderers

### macOS

你可以在 macOS 上透過啟用旗標（flag）來試用 Impeller。在未來的版本中，將會移除選擇不使用 Impeller 的能力。

若要在 macOS 偵錯時啟用 Impeller，請在 `flutter run` 指令中加入 `--enable-impeller` 參數。

```console
flutter run --enable-impeller
```

若要在 macOS 部署應用程式時啟用 Impeller，請在應用程式的 `Info.plist` 檔案中，於最上層的 `<dict>` 標籤下新增以下標籤。

```xml
  <key>FLTEnableImpeller</key>
  <true />
```

### 錯誤與問題回報

團隊持續改進 Impeller 的支援。
如果你在任何平台上遇到 Impeller 的效能或畫面品質問題，
請在 [GitHub tracker][file-issue] 上提交問題。
請在問題標題前加上 `[Impeller]`，
並附上一個可重現的小型測試案例。

提交 Impeller 問題時，請包含以下資訊：

* 你所使用的裝置，包括晶片相關資訊。
* 任何可見問題的螢幕截圖或錄影。
* [效能追蹤檔案的匯出][export of the performance trace]。
  請將檔案壓縮後，附加於 GitHub 問題中。

[export of the performance trace]:/tools/devtools/performance#import-and-export
[file-issue]: {{site.github}}/flutter/flutter/issues/new/choose
[Impeller project board]: {{site.github}}/orgs/flutter/projects/21

## 架構

若想進一步了解 Impeller 的設計與架構，
請參閱原始碼樹中的 [README.md][README.md] 檔案。

[README.md]: {{site.repo.flutter}}/blob/main/engine/src/flutter/impeller/README.md

## 其他資訊

* [常見問題集][impeller-faq]
* [Impeller 的座標系統][impeller-coords]
* [如何設定 Xcode 以配合 metal 進行 GPU 幀擷取][impeller-xcode-capture]
* [學習閱讀 GPU 幀擷取紀錄][impeller-read-capture]
* [如何為命令列應用程式啟用 metal 驗證][impeller-metal-validation]
* [Impeller 如何因應 Open GL ES 2.0 缺乏 uniform buffers 的問題][impeller-ubo-gles2]
* [撰寫高效著色器的指引][impeller-shader-optimization]
* [Impeller 中的顏色混合運作方式][impeller-blending]

[impeller-faq]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/faq.md
[impeller-coords]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/coordinate_system.md
[impeller-xcode-capture]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/xcode_frame_capture.md
[impeller-read-capture]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/read_frame_captures.md
[impeller-metal-validation]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/metal_validation.md
[impeller-ubo-gles2]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/ubo_gles2.md
[impeller-shader-optimization]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/shader_optimization.md
[impeller-blending]: {{site.repo.flutter}}/blob/main/docs/engine/impeller/docs/blending.md  
