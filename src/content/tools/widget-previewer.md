---
title: Flutter 元件預覽器 (Flutter Widget Previewer)
description: >-
  瞭解如何使用 Flutter 元件預覽器 (Flutter Widget Previewer)，
  讓你能在不啟動完整應用程式的情況下，即時預覽元件的渲染效果。
---

在本指南中，你將學會如何使用
Flutter 元件預覽器 (Flutter Widget Previewer)。

## 概覽

透過 Flutter 元件預覽器，你可以在 Chrome 瀏覽器中，
即時預覽你的元件（Widget）渲染效果，且不需啟動完整的應用程式。
若要啟動預覽器、在其中顯示元件，以及自訂預覽內容，
請參考以下章節。

:::version-note
Flutter 元件預覽功能需要 Flutter 3.35 或以上版本。

請注意，這是一項**實驗性功能**，
目前於 Flutter 穩定版頻道提供。
相關 API 尚未穩定，*未來將會變動*。
本指南針對目前的早期體驗版本，未來更新可能會帶來重大變更。
:::

## 啟動預覽器

若要啟動 Flutter 元件預覽器，請在終端機中
切換到你的 Flutter 專案根目錄，並執行以下指令。
這將啟動本地伺服器，並於 Chrome 瀏覽器中開啟元件預覽環境，
當你對專案進行變更時，預覽畫面會自動更新。

```shell
flutter widget-preview start
```

## 預覽元件（Widget）

啟動預覽器後，若要查看某個元件（Widget），
你必須使用定義於
`package:flutter/widget_previews.dart` 的 [`@Preview`][`@Preview`] 標註（annotation）。
此標註可應用於：

*   **頂層函式**，其回傳值為 `Widget` 或
    `WidgetBuilder`。
*   **類別中的靜態方法**，其回傳值為 `Widget` 或
    `WidgetBuilder`。
*   **公開的元件（Widget）建構子與工廠方法**，且無需傳入必要參數。

以下是一個基本範例，說明如何使用
`@Preview` 標註來預覽 `Text` 元件（Widget）：

```dart
import 'package:flutter/widget_previews.dart';
import 'package:flutter/material.dart'; // For Material widgets

@Preview(name: 'My Sample Text')
Widget mySampleText() {
  return const Text('Hello, World!');
}
```

![Sample widget in Flutter Widget Previewer](/assets/images/docs/tools/widget-previewer/widget-previewer.png "Example widget"){:width="50%"}

每個預覽實例都提供多種控制項，讓你可以與預覽中的元件（Widget）互動。從左到右分別為：

*   **放大（Zoom in）：** 放大預覽中的元件。

*   **縮小（Zoom out）：** 縮小預覽中的元件。

*   **重設縮放（Reset zoom）：** 將元件預覽恢復至預設縮放等級。

*   **切換明暗模式（Toggle between light and dark mode）：** 在明亮與深色主題之間切換預覽的配色方案。

*   **對個別預覽執行熱重啟（Perform a hot restart for the individual preview）：** 只重啟特定的元件預覽，讓變更能快速套用，而不需重啟整個應用程式。

當全域狀態已被修改時（例如，靜態初始化器已變更），可以使用環境右上角的按鈕，對整個元件預覽器（Widget Previewer）執行熱重啟。

## 自訂預覽

[`@Preview`][`@Preview`] 註解（annotation）有多個參數，可用來自訂預覽內容：

*   **`name`**：預覽的描述性名稱。

*   **`size`**：使用 `Size` 物件設定的人工尺寸限制。
  
*   **`textScaleFactor`**：自訂字體縮放比例。

*   **`wrapper`**：將你的預覽元件包裹在特定元件樹中的函式（例如，使用 `InheritedWidget` 將應用程式狀態注入元件樹）。
  
*   **`theme`**：提供 Material 與 Cupertino 主題資料的函式。
  
*   **`brightness`**：初始主題亮度設定。

*   **`localizations`**：套用在地化（localization）設定的函式。

[`@Preview`]: {{site.api}}/flutter/widget_previews/Preview-class.html

## 限制與注意事項

Flutter Widget Previewer 有一些限制，請特別留意：

*   **公開常數（Public constants）：** 所有傳遞給 `@Preview` 註解的參數必須是公開且為常數。這是為了讓預覽器的程式碼產生機制能正確運作。未來版本將放寬對公開變數名稱的要求，但函式參數仍必須始終使用公開名稱。  

*   **不支援的 API（Unsupported APIs）：** 不支援原生插件與 `dart:io` 函式庫中的任何 API。這是因為元件預覽器是以 Flutter Web 建構，無法存取底層原生平台 API。雖然在 Chrome 上使用 Web 插件可能可行，但無法保證在其他環境（如 IDE 內嵌時）也能正常運作。  

*   **資源路徑（Asset paths）：** 當使用 `fromAsset` API 從 `dart:ui` 載入資源時，必須使用**基於套件（package-based）的路徑**，而非直接的本地路徑。這樣才能確保資源在預覽器的 Web 環境下能正確定位與載入。例如，請使用 `'packages/my_package_name/assets/my_image.png'`，而不要用 `'assets/my_image.png'`。  

*   **瀏覽器支援（Browser support）：** 目前預覽器僅支援 Chrome，因為需要熱重載（hot reload）功能。未來版本將計畫支援 Web 伺服器與 IDE 的相關功能。  

*   **無限制元件（Unconstrained widgets）：** 無限制的元件會自動被限制在約為元件預覽器一半的高度與寬度。此行為未來可能會變動，因此建議盡可能使用 `size` 參數來設定限制。
