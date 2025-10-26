---
title: 處理使用者輸入
description: 學習如何在 Flutter 中處理使用者輸入。
prev:
  title: 狀態管理
  path: /get-started/fundamentals/state-management
next:
  title: 網路與資料
  path: /get-started/fundamentals/networking
---

現在你已經知道如何在 Flutter 應用程式中管理狀態，那麼要如何讓使用者與你的應用互動並改變其狀態呢？

## 處理使用者輸入簡介

作為一個多平台的 UI 框架，使用者有許多不同的方式可以與 Flutter 應用程式互動。本節的資源將介紹一些常見的元件（Widgets），這些元件可用於在你的應用中啟用使用者互動。

某些使用者輸入機制，例如[滾動][scrolling]，已在[版面配置][Layouts]中介紹過。

:::secondary 關於設計系統支援
Flutter 隨 SDK 提供了兩種設計系統的預建元件，分別是 [Material][Material] 和 [Cupertino][Cupertino]。
為了教學目的，本頁著重於 Material 元件（Widgets），這些元件依據 [Material 3 設計語言][Material 3 design language]規範進行樣式設計。

Flutter 社群在 [pub.dev][pub.dev]（Dart 與 Flutter 的套件倉庫）上，創建並支援了其他設計語言，例如 [Fluent UI][Fluent UI]、[macOS UI][macOS UI]等。如果現有的設計系統元件無法完全滿足你的需求，Flutter 也允許你自行建立自訂元件，本節最後會介紹相關內容。
無論你選擇哪種設計系統，本頁所述的原則皆適用。
:::

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **參考資料**：  
> [元件目錄][widget catalog]列出了 [Material][Material] 與 [Cupertino][Cupertino] 函式庫中常用的元件（Widgets）。

接下來，我們將介紹幾個 Material 元件（Widgets），這些元件支援在 Flutter 應用程式中處理常見的使用者輸入情境。

[scrolling]: /get-started/fundamentals/layout#scrolling-widgets
[pub.dev]: {{site.pub}}
[Layouts]: /get-started/fundamentals/layout
[Material]: /ui/widgets/material
[Material 3 design language]: https://m3.material.io/
[Cupertino]: /ui/widgets/cupertino
[widget catalog]: /ui/widgets#design-systems
[Fluent UI]: {{site.pub}}/packages/fluent_ui
[macOS UI]: {{site.pub}}/packages/macos_ui

## 按鈕

![一組 Material 3 按鈕。](/assets/images/docs/fwe/user-input/material-buttons.png)

按鈕讓使用者可以透過點擊或輕觸，在 UI 中觸發動作。Material 函式庫提供了多種按鈕類型，這些按鈕在功能上相似，但針對不同用途有不同的樣式，包括：

- `ElevatedButton`：具有立體感的按鈕。可用於為原本較為平面的版面配置增添層次感。
- `FilledButton`：實心填色的按鈕，適合用於重要且最終的動作，例如 **儲存**、**立即加入** 或 **確認**。
- `Tonal Button`：介於 `FilledButton` 與 `OutlinedButton` 之間的按鈕。
  適用於需要比外框按鈕更強調、但又不是最高優先順序的情境，例如 **下一步**。
- `OutlinedButton`：帶有文字與明顯邊框的按鈕。
  這類按鈕通常用於重要但非主要動作。
- `TextButton`：可點擊的文字，沒有邊框。
  由於文字按鈕沒有明顯的邊框，必須依賴其在內容中的位置來提供語境。
- `IconButton`：帶有圖示的按鈕。
- `FloatingActionButton`：懸浮於內容之上的圖示按鈕，用於強調主要動作。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**：  
> [FloatingActionButton（本週元件）][FloatingActionButton (Widget of the Week)]

通常在建構一個按鈕時會有三個主要面向：樣式、回呼（callback）以及其子元件（child），如下方 `ElevatedButton` 範例程式碼所示：


{% comment %}
TODO(khanhnwin):
WidgetStateProperty 與設計區段的樣式化（theming）。
當然，按鈕的外觀可以根據其狀態而改變。
你可以使用 `WidgetStateProperty` 根據按鈕狀態進行樣式設計。
{% endcomment %}

- 按鈕的回呼函式 `onPressed`，決定當按鈕被點擊時會發生什麼事，因此這個函式通常是你更新應用程式狀態的地方。
  如果回呼設為 `null`，則按鈕會被停用，使用者按下時不會有任何反應。

- 按鈕的 `child`，即顯示於按鈕內容區域的元件，通常是文字或圖示，用來說明按鈕的用途。

- 最後，按鈕的 `style` 控制其外觀，例如顏色、邊框等。


{% render docs/code-and-image.md,
image:"fwe/user-input/ElevatedButton.webp",
caption: "此圖顯示一個帶有 \"Enabled\" 文字的 ElevatedButton 被點擊。",
alt: "一個帶有 \"Enabled\" 文字的 ElevatedButton 動態圖示"
code:"
```dart
int count = 0;

@override
Widget build(BuildContext context) {
  return ElevatedButton(
    style: ElevatedButton.styleFrom(
      textStyle: const TextStyle(fontSize: 20),
    ),
    onPressed: () {
      setState(() {
        count += 1;
      });
    },
    child: const Text('Enabled'),
  );
}
```
" %}


<br>

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**：
> 完成這個教學，學習如何建立一個
> 「收藏」按鈕：[為你的 Flutter 應用程式新增互動功能][Add interactivity to your Flutter app]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件**：[`ElevatedButton`][`ElevatedButton`] • [`FilledButton`][`FilledButton`] • [`OutlinedButton`][`OutlinedButton`] • [`TextButton`][`TextButton`] • [`IconButton`][`IconButton`] • [`FloatingActionButton`][`FloatingActionButton`]

[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`FilledButton`]: {{site.api}}/flutter/material/FilledButton-class.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[FloatingActionButton (Widget of the Week)]: {{site.youtube-site}}/watch/2uaoEDOgk_I?si=MQZcSp24oRaS_kiY
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[Add interactivity to your Flutter app]: /ui/interactivity

## 文字

有多種元件（Widgets）支援文字輸入。

### `SelectableText`

Flutter 的 `Text` 元件會在螢幕上顯示文字，
但不允許使用者反白或複製文字。
`SelectableText` 則會顯示一串_可由使用者選取_的文字。

{% render docs/code-and-image.md,
image:"fwe/user-input/SelectableText.webp",
caption: "此圖顯示游標正在反白一段文字字串。"
alt: '一個游標反白段落中兩行文字的 GIF 動畫。'
code:"
```dart
@override
Widget build(BuildContext context) {
  return const SelectableText('''
Two households, both alike in dignity,
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes''');
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [SelectableText（本週元件 Widget of the Week）][SelectableText (Widget of the Week)]

[SelectableText (Widget of the Week)]: {{site.youtube-site}}/watch?v=ZSU3ZXOs6hc

### `RichText`

`RichText` 可讓你在應用程式中顯示一串豐富格式的文字（rich text）。
`TextSpan` 類似於 `RichText`，可以讓你顯示具有不同文字樣式的部分文字。
它並不是用來處理使用者輸入，但如果你允許使用者編輯和格式化文字時會很有用。

{% render docs/code-and-image.md,
image:"fwe/user-input/RichText.png",
caption: "此圖顯示一串使用不同文字樣式格式化的文字。",
alt: '螢幕截圖顯示文字 "Hello bold world!"，其中 "bold" 以粗體顯示。',
code:"
```dart
@override
Widget build(BuildContext context) {
  return RichText(
    text: TextSpan(
      text: 'Hello ',
      style: DefaultTextStyle.of(context).style,
      children: const <TextSpan>[
        TextSpan(text: 'bold', style: TextStyle(fontWeight: FontWeight.bold)),
        TextSpan(text: ' world!'),
      ],
    ),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [Rich Text (Widget of the Week)][Rich Text (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **程式碼**： 
> [Rich Text Editor code][Rich Text Editor code]

[Rich Text (Widget of the Week)]: {{site.youtube-site}}/watch?v=rykDVh-QFfw
[Rich Text Editor code]: {{site.github}}/flutter/samples/tree/main/simplistic_editor

### `TextField`

`TextField` 讓使用者可以透過實體鍵盤或螢幕鍵盤，在文字方塊中輸入文字。

`TextField` 擁有許多不同的屬性與設定方式，以下是幾個重點：

- `InputDecoration` 決定文字欄位（text field）的外觀，例如顏色與邊框。
- `controller`：`TextEditingController` 用來控制正在編輯的文字。為什麼你可能需要一個 controller 呢？
  預設情況下，應用程式的使用者可以在文字欄位中輸入內容，但如果你希望以程式方式控制 `TextField` 並清除其值，例如，你就需要一個 `TextEditingController`。
- `onChanged`：當使用者更改文字欄位的值（例如插入或刪除文字）時，這個 callback 函式會被觸發。
- `onSubmitted`：當使用者表示已完成該欄位的文字編輯時，這個 callback 會被觸發；例如，當文字欄位取得焦點時，點擊「enter」鍵。

這個類別還支援其他可設定的屬性，例如
`obscureText`，可在輸入時將每個字母顯示為 `readOnly` 圓點，
以及 `readOnly`，可防止使用者更改文字內容。

{% render docs/code-and-image.md,
image:"fwe/user-input/TextField.webp",
caption: "此圖顯示正在於具有選中邊框與標籤的 TextField 中輸入文字。",
alt: "一個帶有標籤「Mascot Name」、紫色焦點邊框，並輸入「Dash the hummingbird」的文字欄位 GIF 動畫。",
code:"
```dart
final TextEditingController _controller = TextEditingController();

@override
Widget build(BuildContext context) {
  return TextField(
    controller: _controller,
    decoration: const InputDecoration(
      border: OutlineInputBorder(),
      labelText: 'Mascot Name',
    ),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**：  
> 完成這個四部曲的 cookbook 系列，帶你一步步學會如何建立文字欄位 (text field)、  
> 取得其值，並更新你的應用程式狀態：  
> 1. [建立並設計文字欄位][Create and style a text field]  
> 1. [取得文字欄位的值][Retrieve the value of a text field]  
> 1. [處理文字欄位的變更][Handle changes to a text field]  
> 1. [焦點與文字欄位][Focus and text fields]。

[Create and style a text field]: /cookbook/forms/text-input
[Retrieve the value of a text field]: /cookbook/forms/retrieve-input
[Handle changes to a text field]: /cookbook/forms/text-field-changes
[Focus and text fields]: /cookbook/forms/focus

### Form

`Form` 是一個可選的容器，用於將多個  
表單欄位元件（如 `TextField`）分組在一起。

每個獨立的表單欄位都應包裹在 `FormField`  
元件中，並以 `Form` 元件作為共同的祖先。  
有些便利元件已經預先將表單欄位元件包裹在  
`FormField` 中。  
例如，`TextField` 的 `Form` 元件版本就是 `TextFormField`。

使用 `Form` 可以取得 `FormState`，  
讓你能夠儲存、重設及驗證每個從此 `Form`  
繼承下來的 `FormField`。  
你也可以提供 `GlobalKey` 來識別特定的表單，  
如下方程式碼所示：

```dart
final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

@override
Widget build(BuildContext context) {
  return Form(
    key: _formKey,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        TextFormField(
          decoration: const InputDecoration(
            hintText: 'Enter your email',
          ),
          validator: (String? value) {
            if (value == null || value.isEmpty) {
              return 'Please enter some text';
            }
            return null;
          },
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: ElevatedButton(
            onPressed: () {
              // Validate returns true if the form is valid, or false otherwise.
              if (_formKey.currentState!.validate()) {
                // Process data.
              }
            },
            child: const Text('Submit'),
          ),
        ),
      ],
    ),
  );
}
```

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**：
> 完成本教學以學習如何[建立具有驗證功能的表單][build a form with validation]。

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **展示**： 
> [表單應用程式][Form app]

> <span class="material-symbols" aria-hidden="true" translate="no">code</span> **程式碼**： 
> [表單應用程式程式碼][Form app code]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件**： [`TextField`][`TextField`] • [`RichText`][`RichText`] • [`SelectableText`][`SelectableText`] • [`Form`][`Form`]

[Build a form with validation]: /cookbook/forms/validation
[Form app]: https://github.com/flutter/samples/tree/main/form_app/
[Form app code]: {{site.github}}/flutter/samples/tree/main/form_app
[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`RichText`]: {{site.api}}/flutter/widgets/RichText-class.html
[`SelectableText`]: {{site.api}}/flutter/material/SelectableText-class.html

## 從一組選項中選擇值

提供使用者從多個選項中選擇的方法。

### SegmentedButton

`SegmentedButton` 讓使用者可以從 2-5 個精簡的項目中選擇。

資料型別 `<T>` 可以是內建型別，例如
`int`、`String`、`bool`，或是 enum（列舉）。
`SegmentedButton` 有幾個相關屬性：

- `segments`，一個 `ButtonSegment` 的清單，每個代表一個「區段」
   或使用者可選擇的選項。
   在視覺上，每個 `ButtonSegment` 可以有圖示、文字標籤，或兩者皆有。

- `multiSelectionEnabled` 指示是否允許使用者
   選擇多個選項。此屬性預設為 false。

- `selected` 用來識別目前所選的值。
   **注意：** `selected` 的型別為 `Set<T>`，因此如果只允許
   使用者選擇一個值，該值必須以
  僅有一個元素的`Set`提供。

- 當使用者選擇任何區段時，`onSelectionChanged` 回呼會被觸發。
  它會提供已選擇區段的清單，讓你可以更新應用程式狀態。

- 其他樣式參數可讓你調整按鈕的外觀。
  例如，`style` 接受 `ButtonStyle`，
  提供設定 `selectedIcon` 的方式。

{% render docs/code-and-image.md,
image:"fwe/user-input/segmented-button.webp",
caption: "此圖顯示了一個 SegmentedButton，每個區段都有圖示與文字，代表其值。"
alt: "一個 SegmentedButton 的 GIF，包含 4 個區段：Day、Week、Month 和 Year。
每個區段都有一個日曆圖示和文字標籤。
先選擇 Day，接著選擇 week 和 month，最後選擇 year。"
code:"

```dart
enum Calendar { day, week, month, year }

// StatefulWidget...
Calendar calendarView = Calendar.day;

@override
Widget build(BuildContext context) {
  return SegmentedButton<Calendar>(
    segments: const <ButtonSegment<Calendar>>[
      ButtonSegment<Calendar>(
          value: Calendar.day,
          label: Text('Day'),
          icon: Icon(Icons.calendar_view_day)),
      ButtonSegment<Calendar>(
          value: Calendar.week,
          label: Text('Week'),
          icon: Icon(Icons.calendar_view_week)),
      ButtonSegment<Calendar>(
          value: Calendar.month,
          label: Text('Month'),
          icon: Icon(Icons.calendar_view_month)),
      ButtonSegment<Calendar>(
          value: Calendar.year,
          label: Text('Year'),
          icon: Icon(Icons.calendar_today)),
    ],
    selected: <Calendar>{calendarView},
    onSelectionChanged: (Set<Calendar> newSelection) {
      setState(() {
        Suggested change
        // By default there is only a single segment that can be
        // selected at one time, so its value is always the first
        // By default, only a single segment can be
        // selected at one time, so its value is always the first
        calendarView = newSelection.first;
      });
    },
  );
}
```
" %}


### Chip

`Chip` 是一種精簡的方式，用於在特定情境下表示屬性、文字、實體或動作。
針對不同的使用情境，還有專門的 `Chip` 元件（Widgets）：

- [InputChip][InputChip] 以精簡的形式，代表一個複雜的資訊片段，例如實體（人物、地點或事物），或對話文字。
- [ChoiceChip][ChoiceChip] 允許從一組選項中選擇一個。Choice chips 內含相關的描述文字或分類。
- [FilterChip][FilterChip] 使用標籤或描述性文字來篩選內容。
- [ActionChip][ActionChip] 代表與主要內容相關的動作。

每個 `Chip` 元件都需要一個 `label`。
它也可以選擇性地包含 `avatar`（例如圖示或使用者的大頭貼圖片）以及 `onDeleted` 回呼函式，這會顯示一個刪除圖示，當觸發時會刪除該 chip。
`Chip` 元件的外觀也可以透過設定多個選用參數（如 `shape`、`color` 和 `iconTheme`）來自訂。

你通常會使用 `Wrap`，這是一個能將其子元件（children）分布在多個水平或垂直行的元件，以確保你的 chips 能自動換行，不會在應用程式邊緣被截斷。

{% render docs/code-and-image.md,
image:"fwe/user-input/chip.png",
caption: "此圖顯示了兩排 Chip 元件（Widgets），每個都包含一個圓形的前置大頭貼圖片和內容文字。",
alt: "螢幕截圖顯示 4 個 Chip，分成兩排，每個都有一個圓形前置大頭貼圖片和內容文字。",
code:"
```dart
@override
Widget build(BuildContext context) {
  return const SizedBox(
    width: 500,
    child: Wrap(
      alignment: WrapAlignment.center,
      spacing: 8,
      runSpacing: 4,
      children: [
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_chef.png')),
          label: Text('Chef Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage:
                  AssetImage('assets/images/dash_firefighter.png')),
          label: Text('Firefighter Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_musician.png')),
          label: Text('Musician Dash'),
        ),
        Chip(
          avatar: CircleAvatar(
              backgroundImage: AssetImage('assets/images/dash_artist.png')),
          label: Text('Artist Dash'),
        ),
      ],
    ),
  );
}
```
" %}

[InputChip]: {{site.api}}/flutter/material/InputChip-class.html
[ChoiceChip]: {{site.api}}/flutter/material/ChoiceChip-class.html
[FilterChip]: {{site.api}}/flutter/material/FilterChip-class.html
[ActionChip]: {{site.api}}/flutter/material/ActionChip-class.html


### `DropdownMenu`

`DropdownMenu` 讓使用者可以從選單中選擇一個選項，並將所選的文字放入 `TextField` 中。
它同時允許使用者根據文字輸入來篩選選單項目。

可設定的參數包括以下內容：

- `dropdownMenuEntries` 提供一個 `DropdownMenuEntry` 清單，
  用於描述每個選單項目。
  選單可能包含如文字標籤，以及前置或後置圖示等資訊。
  （這也是唯一必填的參數。）
- `TextEditingController` 允許以程式方式控制 `TextField`。
- 當使用者選擇某個選項時，`onSelected` 回呼函式會被觸發。
- `initialSelection` 允許你設定預設值。
- 另外還有其他參數可用於
  自訂元件（Widget）的外觀與行為。

{% render docs/code-and-image.md,
image:"fwe/user-input/dropdownmenu.webp",
caption: "此圖顯示一個 DropdownMenu 元件（Widget），包含 5 個可選值。每個選項的文字顏色都以其對應的顏色值來呈現。",
alt: "一個已被選取的 DropdownMenu 元件（Widget）的 GIF，顯示 5 個選項：Blue、Pink、Green、Orange 和 Grey。每個選項的文字以其對應的顏色顯示。",
code:"
```dart
enum ColorLabel {
  blue('Blue', Colors.blue),
  pink('Pink', Colors.pink),
  green('Green', Colors.green),
  orange('Orange', Colors.orange),
  grey('Grey', Colors.grey);

  const ColorLabel(this.label, this.color);
  final String label;
  final Color color;
}

// StatefulWidget...
@override
Widget build(BuildContext context) {
  return DropdownMenu<ColorLabel>(
    initialSelection: ColorLabel.green,
    controller: colorController,
    // requestFocusOnTap is enabled/disabled by platforms when it is null.
    // On mobile platforms, this is false by default. Setting this to true will
    // trigger focus request on the text field and virtual keyboard will appear
    // afterward. On desktop platforms however, this defaults to true.
    requestFocusOnTap: true,
    label: const Text('Color'),
    onSelected: (ColorLabel? color) {
      setState(() {
        selectedColor = color;
      });
    },
    dropdownMenuEntries: ColorLabel.values
      .map<DropdownMenuEntry<ColorLabel>>(
          (ColorLabel color) {
            return DropdownMenuEntry<ColorLabel>(
              value: color,
              label: color.label,
              enabled: color.label != 'Grey',
              style: MenuItemButton.styleFrom(
                foregroundColor: color.color,
              ),
            );
      }).toList(),
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [DropdownMenu（本週元件 Widget of the Week）][DropdownMenu (Widget of the Week)]

[DropdownMenu (Widget of the Week)]: {{site.youtube-site}}/watch?v=giV9AbM2gd8?si=E23hjg72cjMTe_mz

### Slider

`Slider` 元件讓使用者可以透過移動指示器來調整數值，
例如音量條。

`Slider` 元件的設定參數：

- `value` 代表目前的滑桿數值
- `onChanged` 是當滑桿被移動時會觸發的回呼函式
- `min` 和 `max` 設定滑桿允許的最小與最大值
- `divisions` 設定使用者可沿著軌道移動滑桿把手的離散間隔

{% render docs/code-and-image.md,
image:"fwe/user-input/slider.webp",
caption: "此圖顯示一個滑桿元件，其數值範圍從 0.0 到 5.0，
並分為 5 個區間。當拖曳滑桿時，會以標籤顯示目前的數值。",
alt: "一個滑桿的 GIF，滑桿把手以 1 為單位從 0.0 向右拖曳到 5.0",
code:"
```dart
double _currentVolume = 1;

@override
Widget build(BuildContext context) {
  return Slider(
    value: _currentVolume,
    max: 5,
    divisions: 5,
    label: _currentVolume.toString(),
    onChanged: (double value) {
      setState(() {
        _currentVolume = value;
      });
    },
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**：  
> [Slider, RangeSlider, CupertinoSlider（本週元件 Widget of the Week）][Slider, RangeSlider, CupertinoSlider (Widget of the Week)]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件：** [`SegmentedButton`][`SegmentedButton`] • [`DropdownMenu`][`DropdownMenu`] • [`Slider`][`Slider`] • [`Chip`][`Chip`]

[Slider, RangeSlider, CupertinoSlider (Widget of the Week)]: {{site.youtube-site}}/watch?v=ufb4gIPDmEss
[`SegmentedButton`]: {{site.api}}/flutter/material/SegmentedButton-class.html
[`DropdownMenu`]: {{site.api}}/flutter/material/DropdownMenu-class.html
[`Slider`]: {{site.api}}/flutter/material/Slider-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html

## 在多個值之間切換

你的 UI 可以透過多種方式實現值的切換。

### Checkbox、Switch 與 Radio

提供一個選項，讓單一值可以開啟或關閉。  
這三種元件（Widgets）在功能邏輯上是一致的，  
因為它們都建立於 `ToggleableStateMixin` 之上，但  
每一種在呈現方式上略有不同：

- `Checkbox` 是一個容器，當為 false 時為空，  
  當為 true 時則會顯示勾選符號。
- `Switch` 有一個把手，當為 false 時在左側，  
  當為 true 時會滑到右側。
- `Radio` 類似於 `Checkbox`，都是一個容器，  
  當為 false 時為空，當為 true 時則會被填滿。

`Checkbox` 與 `Switch` 的設定包含：

- 一個 `value`，其值為 `true` 或 `false`
- 以及一個 `onChanged` 回呼（callback），當  
  使用者切換元件時會觸發

### Checkbox

{% render docs/code-and-image.md,
image:"fwe/user-input/checkbox.webp",
caption: "此圖顯示一個核取方塊（checkbox）被勾選與取消勾選的過程。",
alt: "一個 GIF 動畫，顯示指標點擊核取方塊，然後再次點擊以取消勾選。",
code:"
```dart
bool isChecked = false;

@override
Widget build(BuildContext context) {
  return Checkbox(
    checkColor: Colors.white,
    value: isChecked,
    onChanged: (bool? value) {
      setState(() {
        isChecked = value!;
      });
    },
  );
}
```
" %}

### Switch

{% render docs/code-and-image.md,
image:"fwe/user-input/Switch.webp",
caption: "此圖顯示一個 Switch 元件（Switch widget），可切換開啟與關閉狀態。",
alt: "一個 Switch 元件的 GIF，展示其開啟與關閉的切換效果。在關閉狀態時，呈現灰色並帶有深灰色邊框；在開啟狀態時，則為紅色並帶有淺紅色邊框。",
code:"
```dart
bool light = true;

@override
Widget build(BuildContext context) {
  return Switch(
    // This bool value toggles the switch.
    value: light,
    activeColor: Colors.red,
    onChanged: (bool value) {
      // This is called when the user toggles the switch.
      setState(() {
        light = value;
      });
    },
  );
}
```
" %}

### Radio

一組`Radio`按鈕，讓使用者在互斥的值之間進行選擇。當使用者在同一組中選取某個 radio 按鈕時，其他 radio 按鈕會自動取消選取。

- 某個特定`Radio`按鈕的`value`代表該按鈕的值，
- 一組 radio 按鈕中被選取的值，會由`groupValue`參數來識別。
- `Radio`也有`onChanged`回呼函式（callback），當使用者點擊時會觸發，這點與`Switch`和`Checkbox`類似

{% render docs/code-and-image.md,
image:"fwe/user-input/Radio.webp",
caption: "此圖顯示一個由多個 ListTile 組成的直欄，每個 ListTile 內含一個 radio 按鈕和標籤，且同一時間僅能選取一個 radio 按鈕。",
alt: "一個 GIF，顯示四個 ListTile 以直欄排列，每個都包含一個前置的 Radio 按鈕和標題文字。Radio 按鈕會依序從上到下被選取。",
code:"
```dart
enum Character { musician, chef, firefighter, artist }

class RadioExample extends StatefulWidget {
  const RadioExample({super.key});

  @override
  State<RadioExample> createState() => _RadioExampleState();
}

class _RadioExampleState extends State<RadioExample> {
  Character? _character = Character.musician;

  void setCharacter(Character? value) {
    setState(() {
      _character = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          title: const Text('Musician'),
          leading: Radio<Character>(
            value: Character.musician,
            groupValue: _character,
            onChanged: setCharacter,
          ),
        ),
        ListTile(
          title: const Text('Chef'),
          leading: Radio<Character>(
            value: Character.chef,
            groupValue: _character,
            onChanged: setCharacter,
          ),
        ),
        ListTile(
          title: const Text('Firefighter'),
          leading: Radio<Character>(
            value: Character.firefighter,
            groupValue: _character,
            onChanged: setCharacter,
          ),
        ),
        ListTile(
          title: const Text('Artist'),
          leading: Radio<Character>(
            value: Character.artist,
            groupValue: _character,
            onChanged: setCharacter,
          ),
        ),
      ],
    );
  }
}
```
" %}

#### 加碼：CheckboxListTile 與 SwitchListTile

這些便利元件（Widgets）與一般的 checkbox 和 switch 元件相同，
但額外支援標籤（作為`ListTile`）。

{% render docs/code-and-image.md,
image:"fwe/user-input/SpecialListTiles.webp",
caption: "此圖顯示一個包含 CheckboxListTile 與 SwitchListTile 的 column，正在切換狀態。",
alt: "一個 ListTile，左側有圖示，中間有標題文字，右側有核取方塊（checkbox）可勾選與取消勾選。下方還有一個 ListTile，左側有圖示，中間有標題文字，右側有開關（switch）可切換開啟與關閉。",
code:"
```dart
double timeDilation = 1.0;
bool _lights = false;

@override
Widget build(BuildContext context) {
  return Column(
    children: [
      CheckboxListTile(
        title: const Text('Animate Slowly'),
        value: timeDilation != 1.0,
        onChanged: (bool? value) {
          setState(() {
            timeDilation = value! ? 10.0 : 1.0;
          });
        },
        secondary: const Icon(Icons.hourglass_empty),
      ),
      SwitchListTile(
        title: const Text('Lights'),
        value: _lights,
        onChanged: (bool value) {
          setState(() {
            _lights = value;
          });
        },
        secondary: const Icon(Icons.lightbulb_outline),
      ),
    ],
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [CheckboxListTile（本週元件 Widget of the Week）][CheckboxListTile (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [SwitchListTile（本週元件 Widget of the Week）][SwitchListTile (Widget of the Week)]

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件**： 
[`Checkbox`][`Checkbox`] • [`CheckboxListTile`][`CheckboxListTile`] • [`Switch`][`Switch`] • [`SwitchListTile`][`SwitchListTile`] • 
[`Radio`][`Radio`]

[CheckboxListTile (Widget of the Week)]: {{site.youtube-site}}/watch?v=RkSqPAn9szs
[SwitchListTile (Widget of the Week)]: {{site.youtube-site}}/watch?v=0igIjvtEWNU

[`Checkbox`]: {{site.api}}/flutter/material/Checkbox-class.html
[`CheckboxListTile`]: {{site.api}}/flutter/material/CheckboxListTile-class.html
[`Switch`]: {{site.api}}/flutter/material/Switch-class.html
[`SwitchListTile`]: {{site.api}}/flutter/material/SwitchListTile-class.html
[`Radio`]: {{site.api}}/flutter/material/Radio-class.html

## 選擇日期或時間

元件（Widgets）可讓使用者選擇日期與時間。

有一組對話框可讓使用者選擇日期或時間，
如以下章節所示。
除了日期型別不同外——
`DateTime` 用於日期，`TimeOfDay` 用於時間——
這些對話框的運作方式類似，您可以透過提供以下參數來設定：

- 預設的 `initialDate` 或 `initialTime`
- 或 `initialEntryMode`，用來決定顯示哪種選擇器 UI。

### DatePickerDialog

此對話框允許使用者選擇單一天或一段日期範圍。
可透過呼叫 `showDatePicker` 函式來啟動，
該函式會回傳 `Future<DateTime>`，
因此請記得要使用 await 等待這個非同步函式的結果！

{% render docs/code-and-image.md,
image:"fwe/user-input/DatePicker.webp",
caption: "此圖顯示當點擊「Pick a date」按鈕時所顯示的 DatePicker。"
alt: "一個 GIF，顯示指標點擊標有「Pick a date」的按鈕，接著出現日期選擇器。選擇了 8 月 30 日（星期五），並點擊了「OK」按鈕。"
code:"
```dart
DateTime? selectedDate;

@override
Widget build(BuildContext context) {
  var date = selectedDate;

  return Column(children: [
    Text(
      date == null
          ? \"You haven\'t picked a date yet.\"
          : DateFormat('MM-dd-yyyy').format(date),
    ),
    ElevatedButton.icon(
      icon: const Icon(Icons.calendar_today),
      onPressed: () async {
        var pickedDate = await showDatePicker(
          context: context,
          initialEntryMode: DatePickerEntryMode.calendarOnly,
          initialDate: DateTime.now(),
          firstDate: DateTime(2019),
          lastDate: DateTime(2050),
        );

        setState(() {
          selectedDate = pickedDate;
        });
      },
      label: const Text('Pick a date'),
    )
  ]);
}
```
" %}

### TimePickerDialog

`TimePickerDialog` 是一個用於顯示時間選擇器的對話框（Dialog）。
你可以透過呼叫 `showTimePicker()` 函式來啟動它。
與回傳 `Future<DateTime>` 不同，
`showTimePicker` 則會回傳 `Future<TimeOfDay>`。
同樣地，別忘了要對這個函式呼叫使用 `await`！

{% render docs/code-and-image.md,
image:"fwe/user-input/TimePicker.webp",
caption: "此圖顯示當點擊「Pick a time」按鈕時所顯示的 TimePicker。",
alt: "一個 GIF，顯示指標點擊「Pick a time」按鈕後，彈出時間選擇器。時間選擇器顯示一個圓形時鐘，游標先移動時針，再移動分針，接著選擇 PM，最後點擊「OK」按鈕。",
code:"
```dart
TimeOfDay? selectedTime;

@override
Widget build(BuildContext context) {
  var time = selectedTime;

  return Column(children: [
    Text(
      time == null ? \"You haven't picked a time yet.\" : time.format(context),
    ),
    ElevatedButton.icon(
      icon: const Icon(Icons.calendar_today),
      onPressed: () async {
        var pickedTime = await showTimePicker(
          context: context,
          initialEntryMode: TimePickerEntryMode.dial,
          initialTime: TimeOfDay.now(),
        );

        setState(() {
          selectedTime = pickedTime;
        });
      },
      label: const Text('Pick a time'),
    )
  ]);
}
```
" %}

:::tip
呼叫 `showDatePicker()` 和 `showTimePicker()`
等同於分別以 `DatePickerDialog()` 和 `TimePickerDialog()` 作為參數呼叫 `showDialog()`。
在內部，這兩個函式都會搭配各自的 `Dialog` 元件（Widget），使用 `showDialog()` 函式。
若要啟用狀態還原，您也可以直接將 `DatePickerDialog()` 和 `TimePickerDialog()`
推入 `Navigator` 堆疊中。
:::

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件:** 
[`showDatePicker`][`showDatePicker`] • [`showTimePicker`][`showTimePicker`]

[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html
[`showTimePicker`]: {{site.api}}/flutter/material/showTimePicker.html

## 滑動與滑出

### [`Dismissible`][`Dismissible`]

`Dismissible` 是一個元件（Widget），可讓使用者透過滑動來將其移除。
它有多項可設定參數，包括：

- 一個 `child` 元件（Widget）
- 當使用者滑動時會觸發的 `onDismissed` 回呼（callback）
- 例如 `background` 等樣式參數
- 請務必同時包含一個 `key` 物件，以便能在元件樹中與其他同層的 `Dismissible` 元件區分開來。

{% render docs/code-and-image.md,
image:"fwe/user-input/Dismissible.webp",
caption: "此圖顯示了一個由多個 Dismissible 元件（Widget）組成的清單，每個元件都包含一個 ListTile。當滑動 ListTile 時，會顯示綠色背景並讓該項目消失。",
alt: "三個元件的螢幕截圖，彼此間距均勻。"
code:"
```dart
List<int> items = List<int>.generate(100, (int index) => index);

@override
Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: items.length,
    padding: const EdgeInsets.symmetric(vertical: 16),
    itemBuilder: (BuildContext context, int index) {
      return Dismissible(
        background: Container(
          color: Colors.green,
        ),
        key: ValueKey<int>(items[index]),
        onDismissed: (DismissDirection direction) {
          setState(() {
            items.removeAt(index);
          });
        },
        child: ListTile(
          title: Text(
            'Item ${items[index]}',
          ),
        ),
      );
    },
  );
}
```
" %}

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [Dismissible (Widget of the Week)][Dismissible (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**： 
> 完成這個教學，學習如何使用
> dismissible 元件來[實作滑動以關閉][implement swipe to dismiss]。

<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件：**
[`Dismissible`][`Dismissible`]

[Dismissible (Widget of the Week)]: {{site.youtube-site}}/watch?v=iEMgjrfuc58?si=f0S7IdaA9PIWIYvl
[Implement swipe to dismiss]: /cookbook/gestures/dismissible
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html

## 想找更多元件（Widgets）嗎？

本頁僅介紹了幾個常用的 Material 元件（Widgets），
你可以在 Flutter 應用程式中用來處理使用者輸入（Input）。
請參考 [Material Widget library][Material Widget library] 及
[Material Library API 文件][Material Library API docs]，取得完整的元件清單。

> <span class="material-symbols" aria-hidden="true" translate="no">flutter</span> **範例展示**： 
> 參考 Flutter 的 [Material 3 Demo][Material 3 Demo]，其中精選了 Material 函式庫中
> 可用的使用者輸入元件（Widgets）範例。

如果 Material 與 Cupertino 函式庫沒有你需要的元件，
可以到 [pub.dev][pub.dev] 搜尋 Flutter 與 Dart 社群維護的套件。
例如，[`flutter_slidable`][`flutter_slidable`] 套件提供了
比前一節介紹的 `Dismissible` 元件更可自訂化的 `Slidable` 元件。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [flutter_slidable (Package of the Week)][flutter_slidable (Package of the Week)]

[Material Widget Library]: /ui/widgets/material
[Material Library API docs]: {{site.api}}/flutter/material/material-library.html
[Material 3 Demo]: https://github.com/flutter/samples/tree/main/material_3_demo

[`flutter_slidable`]: {{site.pub}}/packages/flutter_slidable
[flutter_slidable (Package of the Week)]: {{site.youtube-site}}/watch?v=QFcFEpFmNJ8

## 使用 GestureDetector 建立互動元件

你已經翻遍元件函式庫、pub.dev、問過寫程式的朋友，
還是找不到符合你想要的使用者互動方式的元件嗎？
你可以自行建立自訂元件，並使用 `GestureDetector` 讓它具備互動性。

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**： 
> 以這份教學為起點，建立你自己的_自訂_按鈕元件，
> 並能[處理點擊事件][handle taps]。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [GestureDetector (Widget of the Week)][GestureDetector (Widget of the Week)]

> <span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **參考資料**： 
> 參考 [Taps, drags, and other gestures][Taps, drags, and other gestures]，瞭解如何在 Flutter 中監聽
> 並回應各種手勢。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **加碼影片**： 
> 想知道 Flutter 的 `GestureArena` 如何將原始的使用者互動資料
> 轉換成人類可辨識的點擊、拖曳與縮放等概念嗎？
> 請參考這部影片：[GestureArena (Decoding Flutter)][GestureArena (Decoding Flutter)]

[handle taps]: /cookbook/gestures/handling-taps
[GestureDetector (Widget of the Week)]: {{site.youtube-site}}/watch?v=WhVXkCFPmK4
[Taps, drags, and other gestures]: /ui/interactivity/gestures#gestures
[GestureArena (Decoding Flutter)]: {{site.youtube-site}}/watch?v=Q85LBtBdi0U

### 別忘了無障礙設計！

如果你正在建立自訂元件，
請使用 `Semantics` 元件來標註其語意。
它能為螢幕閱讀器與其他基於語意分析的工具
提供描述與中繼資料。

> <span class="material-symbols" aria-hidden="true" translate="no">slideshow</span> **影片**： 
> [Semantics (Flutter Widget of the Week)][Semantics (Flutter Widget of the Week)]


<br>

<span class="material-symbols" aria-hidden="true" translate="no">menu_book</span> **API 文件**：
[`GestureDetector`][`GestureDetector`] • [`Semantics`][`Semantics`]

[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html

## 測試

當你完成應用程式的使用者互動設計後，
別忘了撰寫測試，確保一切如預期運作！

以下教學將帶你一步步撰寫模擬使用者互動的測試：

> <span class="material-symbols" aria-hidden="true" translate="no">star</span> **檢查點**： 
> 依照這篇 [點擊、拖曳與輸入文字][tap, drag, and enter text] 教學，學習如何
> 使用 `WidgetTester` 在你的應用程式中模擬並測試使用者互動。

> <span class="material-symbols" aria-hidden="true" translate="no">bookmark</span> **加碼教學**： 
> [處理滾動][handle scrolling] 教學將示範如何透過元件測試
> 滾動列表，驗證元件清單是否包含預期內容。

[Semantics (Flutter Widget of the Week)]: {{site.youtube-site}}/watch?v=NvtMt_DtFrQ?si=o79BqAg9NAl8EE8_
[Tap, drag, and enter text]: /cookbook/testing/widget/tap-drag
[Handle scrolling]: /cookbook/testing/widget/scrolling

## 下一步：網路功能

本頁介紹了如何處理使用者輸入。
現在你已經學會如何處理來自應用程式使用者的輸入，
可以進一步讓你的應用程式更有趣——加入外部資料。
在下一節中，你將學習如何透過網路為你的應用程式取得資料、
如何進行 JSON 轉換、驗證，以及其他網路相關功能。

## 意見回饋

由於本網站區塊仍在持續演進中，
我們[歡迎你的意見回饋][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="user-input"
