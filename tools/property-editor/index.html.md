# Flutter 屬性編輯器

> 學習如何使用 Flutter 屬性編輯器來檢視與修改元件的屬性。



:::note
Flutter 屬性編輯器需要 Flutter 3.32 或更高版本。
:::

## 什麼是 Flutter 屬性編輯器？

Flutter 屬性編輯器（Flutter Property Editor）是一個功能強大的 IDE 工具，可讓你直接從視覺化介面檢視與修改元件 (Widget) 的屬性。

它能讓你快速發現並修改元件現有及可用的建構函式參數（constructor arguments），無需跳轉至定義或手動編輯原始碼。此外，該工具與 Flutter 檢查器（inspector）及熱重載（hot reload）整合，讓你能即時預覽變更，加速 UI 開發與迭代。

![Flutter Property Editor](/assets/images/docs/tools/devtools/property-editor-text-widget.png){:width="500px"}

## 如何存取 Flutter 屬性編輯器

1.  在你支援的 IDE（[VS Code][]、[Android Studio/IntelliJ][]）中開啟 Flutter 屬性編輯器。

2.  在 Flutter 程式碼中找到一個[元件建構函式呼叫][widget constructor invocation]。

3.  將游標移動到該元件建構函式呼叫的任意位置。

    例如，在下列 `build` 方法中，將游標放在 `Text` 的 `T` 與 `TextOverflow.clip` 後的結尾括號 `)` 之間的任意位置：

    ```dart
    @override
    Widget build(BuildContext context) {
        return Text(
            'Hello World!',
            overflow: TextOverflow.clip,
        );
    }
    ```

4.  Flutter 屬性編輯器面板會自動更新，顯示你游標所在元件 (Widget) 的屬性。

[VS Code]: /tools/vs-code#property-editor
[Android Studio/IntelliJ]: /tools/android-studio#property-editor
[widget constructor invocation]: /learn/pathway/tutorial/widget-fundamentals

### 執行階段使用方式

#### 與 Flutter inspector 整合

Flutter 屬性編輯器可以與 [Flutter inspector][] 搭配使用，讓你能同時在兩個工具中檢查你的元件 (Widgets)。

1.  在你偏好的 IDE 中，執行並除錯你的 Flutter 應用程式。
    * [VS Code 使用說明][VS Code instructions]
    * [Android Studio/IntelliJ 使用說明][Android Studio/IntelliJ instructions]

2.  在你的 IDE 中開啟 [Flutter inspector][]。

你可以透過以下任一方式，使用 Flutter inspector 在 Flutter 屬性編輯器中載入元件 (Widget)：

1. 在樹狀結構中選取元件：
    * 點擊 [inspector 的元件樹][inspector's widget tree] 中的元件。

2. 在你的應用程式中選取元件：
    * 在 inspector 中啟用 ["Select Widget Mode"][]。
    * 點擊你執行中的應用程式裡的元件。

這兩種操作都會自動：
- 跳至該元件在原始碼中的宣告位置。
- 在 Flutter 屬性編輯器中載入所選元件。

[VS Code instructions]: /tools/devtools/vscode/#run-and-debug
[Android Studio/IntelliJ instructions]: /tools/devtools/android-studio/#run-and-debug
[Flutter inspector]: /tools/devtools/inspector
[inspector's widget tree]: /tools/devtools/inspector#flutter-widget-tree
["Select Widget Mode"]: /tools/devtools/inspector#inspecting-a-widget

#### 與 hot reload 整合

Flutter 屬性編輯器可以搭配 hot reload 使用，即時查看變更。

1. 在你偏好的 IDE 中，啟用自動儲存與儲存時 hot reload。

    **VS Code**

    在你的 `.vscode/settings.json` 檔案中加入以下內容：

    ```json
    "files.autoSave": "afterDelay",
    "dart.flutterHotReloadOnSave": "all",
    ```

    **Android Studio 和 IntelliJ**

    * 開啟 `Settings > Tools > Actions on Save` 並選擇
     `Configure autosave options`。
        - 勾選 `Save files if the IDE is idle for X seconds` 選項。
        - **建議：** 設定較短的延遲時間，例如 2 秒。

    * 開啟 `Settings > Languages & Frameworks > Flutter`。
        - 勾選 `Perform hot reload on save` 選項。

2.  執行並除錯你的 Flutter 應用程式。
    * [VS Code 使用說明][VS Code instructions]
    * [Android Studio/IntelliJ 使用說明][Android Studio/IntelliJ instructions]

3.  你在 Flutter 屬性編輯器中所做的任何變更，都會自動反映在執行中的應用程式上。

## 功能集

Flutter 屬性編輯器具備多項功能，旨在加速開發流程。

### 檢視元件 (Widget) 文件

當你在 Flutter 屬性編輯器中選取某個元件 (Widget) 時，其文件會顯示在頂部。這讓你能快速閱讀該元件的文件，無需跳轉到定義處或線上搜尋。

預設情況下，元件文件會被截斷。點擊「Show more」可展開完整的元件文件。

:::tip
若要在 Flutter 屬性編輯器中查看你應用程式自訂元件 (Widget) 的文件，請務必遵循 [Dart 風格指南][Dart style guide]。
:::

![Flutter Property Editor gif displaying the documentation for a Text widget](/assets/images/docs/tools/devtools/property-editor-documentation.gif)

[Dart style guide]: https://dart.dev/effective-dart/documentation

### 編輯元件 (Widget) 屬性

Flutter 屬性編輯器針對每個建構函式參數的型別，提供了相應的輸入欄位。

- **string、double 和 int 屬性：**
    * 這些會以文字輸入欄位呈現。
    * 只需在欄位中輸入新值即可。
    * 按下 ••Tab•• 或 ••Enter••，即可將編輯內容直接套用到原始程式碼中。

- **boolean 和 enum 屬性：**
    * 這些會以下拉選單呈現。
    * 點擊下拉選單可查看可用選項（`true`/`false` 對於 boolean，或各種 enum 值）。
    * 從清單中選擇想要的值，即可套用到你的程式碼。

- **object 屬性（例如 `TextStyle`、`EdgeInsets`、`Color`）：**
    * 目前尚未支援。Flutter 屬性編輯器尚不允許直接編輯複雜的 object 屬性。你需要在原始程式碼中直接編輯這些屬性。

### 了解屬性輸入欄位

Flutter 屬性編輯器中的每個屬性輸入欄位都會附帶相關資訊，協助你理解其用途。

- **型別與名稱：** 建構函式參數的**型別**（例如 `StackFit`）與**名稱**（例如 `fit`）會作為每個輸入欄位的標籤顯示。

    ![Type and name label for a property input](/assets/images/docs/tools/devtools/property-editor-name-type.png){:width="500px"}

- **資訊提示（ⓘ）：**
    * 將滑鼠懸停在屬性輸入欄位旁的資訊圖示上，會顯示提示視窗。
    * 提示內容包括：
        * 若元件建構函式有定義預設值，則顯示該屬性的預設值。
        * 該屬性的相關文件說明。

    ![Info tooltip for a property input](/assets/images/docs/tools/devtools/property-editor-tooltip.png){:width="600px"}

* **「set」與「default」標籤：**
    * 若該屬性已在原始程式碼中明確設定，輸入欄位旁會顯示 **「set」** 標籤。這表示在元件建構函式呼叫時有提供對應的參數。
    * 若目前屬性值與元件中定義的預設參數值相同，則會顯示 **「default」** 標籤。

    :::tip
    如果某個屬性輸入欄位同時出現「set」與「default」標籤，代表你已在程式碼中明確給定了值，但這個值與元件的預設值相同。在這種情況下，你可以放心地將該參數從程式碼中移除，使程式碼更簡潔，因為元件仍會使用預設值。
    :::

    !["Set" and "default" labels for a property input](/assets/images/docs/tools/devtools/property-editor-labels.png){:width="500px"}

### 篩選屬性

對於擁有大量屬性的元件 (Widgets)，篩選列可以協助你快速找到感興趣的屬性。

* **以文字篩選：**
    * 只需在篩選列中輸入文字，屬性清單會動態更新，只顯示符合你輸入內容的屬性。
    * 你可以依據屬性的名稱、目前值或型別進行篩選。例如：
        * 輸入「main」會篩選出名稱中包含「main」的 `mainAxisAlignment`、`mainAxisSize` 或其他屬性。
        * 輸入「true」會篩選出目前設定為 `true` 的所有布林屬性。
        * 輸入「double」會篩選出所有型別為 `double` 的屬性。

    ![Filter input with filtering by text highlighted](/assets/images/docs/tools/devtools/property-editor-filter-text.png){:width="500px"}

* **以「已設定」屬性篩選：**
    * 使用篩選選單按鈕開啟篩選選項，勾選「Only include properties that are set in the code.」。
    * 這會隱藏所有未在你的程式碼中明確設定的屬性，讓你能專注於你已明確設定的屬性。

    ![Filter input with filter menu button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-menu-button.png){:width="500px"}

* **以正則表達式 (regex) 篩選：**
    * 正則表達式切換按鈕（`*` 圖示按鈕）可讓你為篩選輸入框啟用或關閉正則表達式模式。
    * 啟用後，你輸入的篩選文字將會以正則表達式來解讀。

    ![Filter input with regex toggle highlighted](/assets/images/docs/tools/devtools/property-editor-filter-regex-toggle.png){:width="500px"}

* **清除目前的篩選條件：**
    * 清除按鈕（`X` 圖示按鈕）會清除所有作用中的篩選條件，重新顯示該元件 (Widget) 的所有屬性。

    ![Filter input with clear button highlighted](/assets/images/docs/tools/devtools/property-editor-filter-clear-button.png){:width="500px"}

