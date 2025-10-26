---
title: Flutter 屬性編輯器
description: 學習如何使用 Flutter 屬性編輯器來檢視與修改元件（Widgets）的屬性。
---

:::note
Flutter 屬性編輯器需要 Flutter 3.32 或更高版本。
:::

## 什麼是 Flutter 屬性編輯器？

Flutter 屬性編輯器是一個功能強大的 IDE 工具，讓你可以直接從視覺化介面檢視與修改元件（Widgets）的屬性。

它讓你能夠快速發現並修改元件（Widgets）現有與可用的建構子參數，無需跳轉至定義或手動編輯原始碼。此外，該工具與 Flutter 檢查器（inspector）和熱重載（hot reload）整合，讓你能即時查看變更，加速 UI 開發與迭代。

![Flutter Property Editor](/assets/images/docs/tools/devtools/property-editor-text-widget.png){:width="500px"}

## 如何存取 Flutter 屬性編輯器

1.  在支援的 IDE（[VS Code][VS Code]、[Android Studio/IntelliJ][Android Studio/IntelliJ]）中開啟 Flutter 屬性編輯器。

2.  在 Flutter 程式碼中找到一個[元件建構子呼叫][widget constructor invocation]。

3.  將游標移動到元件建構子呼叫的任意位置。

    例如，在以下 `build` 方法中，將游標放在 `Text` 的 `T` 與 `TextOverflow.clip` 後方的結尾括號 `)` 之間的任意位置：

    ```dart
    @override
    Widget build(BuildContext context) {
        return Text(
            'Hello World!',
            overflow: TextOverflow.clip,
        );
    }
    ```

4.  Flutter Property Editor 面板會自動更新，顯示游標所在元件（Widget）的屬性。

[VS Code]: /tools/vs-code#property-editor
[Android Studio/IntelliJ]: /tools/android-studio#property-editor
[widget constructor invocation]: /get-started/fundamentals/widgets

### 執行時使用方式

#### 與 Flutter inspector 的整合

Flutter Property Editor 可以與 [Flutter inspector][Flutter inspector] 搭配使用，讓你能同時在兩個工具中檢查你的元件（Widgets）。

1.  在你偏好的 IDE 中，執行並除錯你的 Flutter 應用程式。
    * [VS Code 指引][VS Code instructions]
    * [Android Studio/IntelliJ 指引][Android Studio/IntelliJ instructions]

2.  在你的 IDE 中開啟 [Flutter inspector][Flutter inspector]。

你可以透過以下任一方式，使用 Flutter inspector 將元件載入至 Flutter Property Editor：

1. 在樹狀結構中選取元件：
    * 點擊 [inspector 的元件樹][inspector's widget tree] 中的某個元件。

2. 在你的應用程式中選取元件：
    * 在 inspector 中啟用 ["Select Widget Mode"]["Select Widget Mode"]。
    * 點擊你執行中應用程式裡的某個元件。

這兩種操作都會自動：
- 跳至原始碼中該元件的宣告處。
- 在 Flutter Property Editor 中載入所選元件。


[VS Code instructions]: /tools/devtools/vscode/#run-and-debug
[Android Studio/IntelliJ instructions]: /tools/devtools/android-studio/#run-and-debug
[Flutter inspector]: /tools/devtools/inspector
[inspector's widget tree]: /tools/devtools/inspector#flutter-widget-tree
["Select Widget Mode"]: /tools/devtools/inspector#inspecting-a-widget

#### 與 hot reload 的整合

Flutter Property Editor 可以與 hot reload 搭配使用，即時查看變更效果。

1. 在你偏好的 IDE 中，啟用自動儲存與儲存時自動 hot reload。

    **VS Code**

    在你的 `.vscode/settings.json` 檔案中加入以下內容：

    ```json
    "files.autoSave": "afterDelay",
    "dart.flutterHotReloadOnSave": "all",
    ```

    **Android Studio 與 IntelliJ**

    * 開啟 `Settings > Tools > Actions on Save` 並選擇
     `Configure autosave options`。
        - 勾選 `Save files if the IDE is idle for X seconds` 選項。
        - **建議：** 設定較短的延遲時間，例如 2 秒。
    
    * 開啟 `Settings > Languages & Frameworks > Flutter`。
        - 勾選 `Perform hot reload on save` 選項。

2. 執行並除錯你的 Flutter 應用程式。
    * [VS Code 操作說明][VS Code instructions]
    * [Android Studio/IntelliJ 操作說明][Android Studio/IntelliJ instructions]

3. 你在 Flutter Property Editor 中所做的任何變更，都會自動反映在正在執行的應用程式中。

## 功能集

Flutter Property Editor 配備多項設計來加速開發流程的功能。

### 檢視元件（Widget）文件

當你在 Flutter Property Editor 選取某個元件（Widget）時，其文件會顯示在頂端。這讓你可以快速閱讀該元件的文件，無需跳轉到定義或在網路上搜尋。

預設情況下，元件文件會被截斷。點擊「顯示更多」即可展開完整文件。

:::tip
若要在 Flutter Property Editor 中看到你應用程式自訂元件的文件，請務必遵循 [Dart 風格指南][Dart style guide]。
:::

![Flutter Property Editor gif displaying the documentation for a Text widget](/assets/images/docs/tools/devtools/property-editor-documentation.gif)

[Dart style guide]: {{site.dart-site}}/effective-dart/documentation

### 編輯元件（Widget）屬性

Flutter Property Editor 針對每個建構函式參數的型別，提供專屬的輸入欄位。

- **string、double 與 int 屬性：**
    * 這些會以文字輸入欄位的形式呈現。
    * 只需在欄位中輸入新值即可。
    * 按下 ••Tab•• 或 ••Enter••，即可將編輯內容直接套用到原始碼。

- **boolean 與 enum 屬性：**
    * 這些會以下拉選單的形式呈現。
    * 點擊下拉選單即可查看可用選項（`true`/`false` 代表 boolean，或各種 enum 值）。
    * 從清單中選擇想要的值，即可套用到你的程式碼。

- **object 屬性（例如 `TextStyle`、`EdgeInsets`、`Color`）：**
    * 目前尚未支援。Flutter Property Editor 尚不支援直接編輯複雜的 object 屬性。你需要直接在原始碼中進行編輯。

### 了解屬性輸入欄位

Flutter Property Editor 中的每個屬性輸入欄位，都會附帶相關資訊，協助你理解其用途。

- **型別與名稱：** 建構函式參數的**型別**（例如 `StackFit`）與**名稱**（例如 `fit`）會作為每個輸入欄位的標籤顯示。

    ![Type and name label for a property input](/assets/images/docs/tools/devtools/property-editor-name-type.png){:width="500px"}

- **資訊提示（ⓘ）：**
    * 將滑鼠游標懸停在屬性輸入欄位旁的資訊圖示上時，會顯示提示視窗。
    * 提示內容包含：
        * 若元件建構函式有定義預設值，則會顯示該屬性的預設值。
        * 該屬性的相關文件說明。

    ![Info tooltip for a property input](/assets/images/docs/tools/devtools/property-editor-tooltip.png){:width="600px"}

* **「set」與「default」標籤：**
    * 若屬性已在原始碼中明確設定，則輸入欄位旁會顯示 **「set」** 標籤。這代表在元件建構函式呼叫時有傳入對應參數。
    * 若目前屬性值與元件中定義的預設參數值相同，則會顯示 **「default」** 標籤。

    :::tip
    若某個屬性輸入欄位同時有「set」與「default」標籤，表示你在程式碼中明確提供了值，但這個值與元件的預設值相同。在這種情況下，你可以安全地將這個參數從程式碼中移除，以讓程式更簡潔，因為元件仍會使用預設值。
    :::

    !["Set" and "default" labels for a property input](/assets/images/docs/tools/devtools/property-editor-labels.png){:width="500px"}

### 篩選屬性

對於具有大量屬性的元件（Widgets），篩選列（filter bar）可以協助你快速找到感興趣的屬性。

* **以文字篩選：**
    * 只需在篩選列中輸入文字，屬性列表會動態更新，只顯示符合你輸入內容的屬性。
    * 你可以依據屬性的名稱、目前值或型別進行篩選。例如：
        * 輸入「main」會篩選出`mainAxisAlignment`、`mainAxisSize`，或名稱中包含「main」的其他屬性。
        * 輸入「true」會篩選出目前設為`true`的所有布林（boolean）屬性。
        * 輸入「double」會篩選出所有型別為`double`的屬性。

    ![以文字篩選時，篩選輸入列被標示](/assets/images/docs/tools/devtools/property-editor-filter-text.png){:width="500px"}   

* **以「已設定」屬性篩選：**
    * 使用篩選選單按鈕打開篩選選項，勾選「只包含在程式碼中已設定的屬性」。
    * 這會隱藏所有未在你的程式碼中明確設定的屬性，讓你能專注於你已明確設定的屬性。

    ![以「已設定」屬性篩選時，篩選選單按鈕被標示](/assets/images/docs/tools/devtools/property-editor-filter-menu-button.png){:width="500px"}   

* **以正規表示式（regex）篩選：**
    * regex 切換按鈕（`*` 圖示按鈕）可讓你開啟或關閉篩選輸入的正規表示式模式。
    * 啟用後，你的篩選文字會被當作正規表示式來解讀。

    ![以正規表示式篩選時，regex 切換按鈕被標示](/assets/images/docs/tools/devtools/property-editor-filter-regex-toggle.png){:width="500px"} 

* **清除目前篩選條件：**
    * 清除按鈕（`X` 圖示按鈕）可清除所有作用中的篩選條件，重新顯示該元件（Widget）的所有屬性。

    ![清除篩選時，清除按鈕被標示](/assets/images/docs/tools/devtools/property-editor-filter-clear-button.png){:width="500px"}
