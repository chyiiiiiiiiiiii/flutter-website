---
title: Flutter 應用程式的國際化
shortTitle: i18n
description: 如何為你的 Flutter 應用程式進行國際化。
---

<?code-excerpt path-base="internationalization"?>

:::secondary 你將學到什麼
* 如何追蹤裝置的語系（使用者偏好的語言）。
* 如何啟用特定語系的 Material 或 Cupertino 元件 (Widgets)。
* 如何管理特定語系的應用程式數值。
* 如何定義應用程式支援的語系。
:::

如果你的應用程式可能會部署給使用其他語言的使用者，那麼你就需要對其進行國際化。這表示你需要以一種方式撰寫應用程式，使其可以針對每個應用程式支援的語言或語系，在文字與版面配置等數值上進行在地化。Flutter 提供了協助國際化的元件 (Widget) 與類別，而且 Flutter 函式庫本身也已經國際化。

本頁將介紹使用 `MaterialApp` 和 `CupertinoApp` 類別來在地化 Flutter 應用程式所需的概念與工作流程，因為大多數應用程式都是以這種方式撰寫。然而，若是使用較低階的 `WidgetsApp` 類別撰寫的應用程式，也可以用相同的類別與邏輯來進行國際化。

## Flutter 國際化簡介

本節將教你如何建立並國際化一個新的 Flutter 應用程式，以及目標平台可能需要的額外設定。

你可以在 [`gen_l10n_example`][] 找到這個範例的原始碼。

[`gen_l10n_example`]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/gen_l10n_example

### 設定國際化應用程式：Flutter<wbr>_localizations 套件 {:#setting-up}

預設情況下，Flutter 只提供美式英語（US English）的國際化內容。若要新增對其他語言的支援，應用程式必須指定額外的 `MaterialApp`（或 `CupertinoApp`）屬性，並且引入名為 `flutter_localizations` 的套件。

首先，請在你選擇的目錄中，使用 `flutter create` 指令建立一個新的 Flutter 應用程式。

```console
$ flutter create <name_of_flutter_app>
```

要使用 `flutter_localizations`，請將該套件新增為 `pubspec.yaml` 檔案的相依套件，同時也要加入 `intl` 套件：

```console
$ flutter pub add flutter_localizations --sdk=flutter
$ flutter pub add intl:any
```

這會建立一個 `pubspec.yml` 檔案，內容包含以下項目：

<?code-excerpt "gen_l10n_example/pubspec.yaml (flutter-localizations)"?>
```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any
```

然後匯入 `flutter_localizations` 函式庫，並為你的 `MaterialApp` 或 `CupertinoApp` 指定 `localizationsDelegates` 和 `supportedLocales`：

<?code-excerpt "gen_l10n_example/lib/main.dart (localization-delegates-import)"?>
```dart
import 'package:flutter_localizations/flutter_localizations.dart';
```

<?code-excerpt "gen_l10n_example/lib/main.dart (material-app)" remove="AppLocalizations.delegate"?>
```dart
return const MaterialApp(
  title: 'Localizations Sample App',
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    Locale('en'), // English
    Locale('es'), // Spanish
  ],
  home: MyHomePage(),
);
```

在引入 `flutter_localizations` 套件並加入前述程式碼後，`Material` 與 `Cupertino` 套件現在應該能正確地根據支援的語系進行在地化。元件（Widget）應該會根據在地化訊息自動調整，同時呈現正確的由左至右或由右至左版面配置。

請嘗試將目標平台的語系切換為西班牙語（`es`），訊息就會自動在地化。

基於 `WidgetsApp` 的應用程式也類似，只是 `GlobalMaterialLocalizations.delegate` 並非必要。

建議使用完整的 `Locale.fromSubtags` 建構函式，因為它支援 [`scriptCode`][]，但 `Locale` 的預設建構函式依然完全有效。

[`scriptCode`]: {{site.api}}/flutter/package-intl_locale/Locale/scriptCode.html

`localizationsDelegates` 清單中的元素是用來產生在地化值集合的工廠。`GlobalMaterialLocalizations.delegate` 提供 Material Components 函式庫所需的在地化字串及其他值。`GlobalWidgetsLocalizations.delegate` 則定義元件（Widget）函式庫的預設文字方向，無論是由左至右還是由右至左。

關於這些應用程式屬性、它們所依賴的型別，以及 Flutter 應用程式在國際化時的典型結構，會在本頁進一步說明。

[language-count]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html

<a id="overriding-locale"></a>
### 覆寫語系

`Localizations.override` 是 `Localizations` 元件的工廠建構函式，適用於（通常較少見的）應用程式某一區塊需要使用與裝置設定語系不同的語系時。

若要觀察此行為，請加入對 `Localizations.override` 的呼叫，以及一個簡單的 `CalendarDatePicker`：

<?code-excerpt "gen_l10n_example/lib/examples.dart (date-picker)"?>
```dart
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: Text(widget.title)),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          // Add the following code
          Localizations.override(
            context: context,
            locale: const Locale('es'),
            // Using a Builder to get the correct BuildContext.
            // Alternatively, you can create a new widget and Localizations.override
            // will pass the updated BuildContext to the new widget.
            child: Builder(
              builder: (context) {
                // A toy example for an internationalized Material widget.
                return CalendarDatePicker(
                  initialDate: DateTime.now(),
                  firstDate: DateTime(1900),
                  lastDate: DateTime(2100),
                  onDateChanged: (value) {},
                );
              },
            ),
          ),
        ],
      ),
    ),
  );
}
```

熱重載（Hot reload）應用程式後，`CalendarDatePicker` 元件（Widget）應該會以西班牙文重新渲染。

<a id="adding-localized-messages"></a>
### 新增自訂在地化訊息

在加入 `flutter_localizations` 套件後，你可以開始設定在地化功能。若要將在地化文字加入你的應用程式，請依照以下步驟操作：

1. 將 `intl` 套件加入為相依套件，並使用由 `flutter_localizations` 所指定的版本：

   ```console
   $ flutter pub add intl:any
   ```

2. 開啟 `pubspec.yaml` 檔案並啟用 `generate` 旗標。此旗標位於 pubspec 檔案的 `flutter` 區段中。

   <?code-excerpt "gen_l10n_example/pubspec.yaml (generate)"?>
   ```yaml
   # The following section is specific to Flutter.
   flutter:
     generate: true # Add this line
   ```

3. 在 Flutter 專案的根目錄新增一個 yaml 檔案。將此檔案命名為 `l10n.yaml`，並包含以下內容：

   <?code-excerpt "gen_l10n_example/l10n.yaml"?>
   ```yaml
   arb-dir: lib/l10n
   template-arb-file: app_en.arb
   output-localization-file: app_localizations.dart
   ```

   此檔案用於設定在地化工具。在本範例中，你已完成以下事項：

   * 將 [App Resource Bundle][] (`.arb`) 輸入檔案放在 `${FLUTTER_PROJECT}/lib/l10n`。`.arb` 提供你的應用程式在地化資源。
   * 將英文範本設定為 `app_en.arb`。
   * 告訴 Flutter 在 `app_localizations.dart` 檔案中產生在地化內容。

4. 在 `${FLUTTER_PROJECT}/lib/l10n` 中，加入 `app_en.arb` 範本檔案。例如：

   <?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb" take="5" replace="/},/}\n}/g"?>
   ```json
   {
     "helloWorld": "Hello World!",
     "@helloWorld": {
       "description": "The conventional newborn programmer greeting"
     }
   }
   ```

5. 在相同目錄下新增另一個 bundle 檔案，名稱為 `app_es.arb`。在這個檔案中，加入相同訊息的西班牙文翻譯。

   <?code-excerpt "gen_l10n_example/lib/l10n/app_es.arb"?>
   ```json
   {
       "helloWorld": "¡Hola Mundo!"
   }
   ```

6. 現在，執行 `flutter pub get` 或 `flutter run`，codegen（程式碼產生）會自動進行。你應該可以在你透過 `arb-dir` 或 `output-dir` 選項所指定的目錄中找到產生出來的檔案。或者，你也可以執行 `flutter gen-l10n`，以在不啟動應用程式的情況下產生相同的檔案。

7. 在 `app_localizations.dart` 和 `AppLocalizations.delegate` 呼叫 `MaterialApp` 的建構函式時，加入 import 陳述式：

   <?code-excerpt "gen_l10n_example/lib/main.dart (app-localizations-import)"?>
   ```dart
   import 'l10n/app_localizations.dart';
   ```

   <?code-excerpt "gen_l10n_example/lib/main.dart (material-app)"?>
   ```dart
   return const MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: [
       AppLocalizations.delegate, // Add this line
       GlobalMaterialLocalizations.delegate,
       GlobalWidgetsLocalizations.delegate,
       GlobalCupertinoLocalizations.delegate,
     ],
     supportedLocales: [
       Locale('en'), // English
       Locale('es'), // Spanish
     ],
     home: MyHomePage(),
   );
   ```

   `AppLocalizations` 類別同時也會自動產生 `localizationsDelegates` 和 `supportedLocales` 清單。你可以直接使用這些清單，而不需要手動提供。

   <?code-excerpt "gen_l10n_example/lib/examples.dart (material-app)"?>
   ```dart
   const MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: AppLocalizations.localizationsDelegates,
     supportedLocales: AppLocalizations.supportedLocales,
   );
   ```

8. 一旦 Material 應用程式啟動後，你就可以在應用程式的任何地方使用 `AppLocalizations`：

   <?code-excerpt "gen_l10n_example/lib/main.dart (internationalized-title)"?>
   ```dart
   appBar: AppBar(
     // The [AppBar] title text should update its message
     // according to the system locale of the target platform.
     // Switching between English and Spanish locales should
     // cause this text to update.
     title: Text(AppLocalizations.of(context)!.helloWorld),
   ),
   ```

:::note
必須實際啟動 Material 應用程式，才能初始化 `AppLocalizations`。如果應用程式尚未啟動，`AppLocalizations.of(context)!.helloWorld` 會導致 null 例外。
:::

   此程式碼會產生一個 `Text` 元件（Widget），當目標裝置的地區設定為英文時，顯示 "Hello World!"，若地區設定為西班牙文，則顯示 "¡Hola Mundo!"。在 `arb` 檔案中，每個項目的 key 會作為 getter 的方法名稱，而該項目的 value 則包含在地化訊息。

[`gen_l10n_example`][] 使用了這個工具。

若要在你的裝置應用程式描述中進行在地化，請將在地化字串傳遞給 [`MaterialApp.onGenerateTitle`][]：

<?code-excerpt "intl_example/lib/main.dart (app-title)"?>
```dart
return MaterialApp(
  onGenerateTitle: (context) => DemoLocalizations.of(context).title,
```

[App Resource Bundle]: {{site.github}}/google/app-resource-bundle
[`gen_l10n_example`]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/gen_l10n_example
[`MaterialApp.onGenerateTitle`]: {{site.api}}/flutter/material/MaterialApp/onGenerateTitle.html

### 占位符、複數與選擇

:::tip
當你使用 VS Code 時，建議安裝 [arb-editor extension][]。這個擴充功能會為 `.arb` 樣板檔案提供語法高亮、程式碼片段、診斷提示與快速修正，協助你編輯。
:::

[arb-editor extension]: https://marketplace.visualstudio.com/items?itemName=Google.arb-editor

你也可以在訊息中包含應用程式的值，透過特殊語法使用_占位符_（placeholder）來產生方法，而非 getter。占位符必須是有效的 Dart 識別字名稱，並會在產生的 `AppLocalizations` 程式碼中成為該方法的位置參數。你可以將占位符名稱用大括號包起來，定義方式如下：

```json
"{placeholderName}"
```

在應用程式的 `.arb` 檔案中，於 `placeholders` 物件內定義每個占位符（placeholder）。例如，若要定義一個帶有 `userName` 參數的 hello 訊息，請將以下內容加入 `lib/l10n/app_en.arb`：

<?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb" skip="5" take="10" replace="/},$/}/g"?>
```json
"hello": "Hello {userName}",
"@hello": {
  "description": "A message with a single parameter",
  "placeholders": {
    "userName": {
      "type": "String",
      "example": "Bob"
    }
  }
}
```

這段程式碼片段為 `AppLocalizations.of(context)` 物件新增了一個 `hello` 方法呼叫，該方法接受一個 `String` 型別的參數；`hello` 方法會回傳一個字串。請重新產生 `AppLocalizations` 檔案。

請將傳入 `Builder` 的程式碼替換為以下內容：

<?code-excerpt "gen_l10n_example/lib/main.dart (placeholder)" remove="/wombat|Wombats|he'|they|pronoun/"?>
```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    // Returns 'Hello John'
    Text(AppLocalizations.of(context)!.hello('John')),
  ],
);
```

你也可以使用數值型占位符來指定多個值。不同語言在複數化單詞時有不同的方式。這個語法同時支援指定單詞應該「如何」進行複數化。一個「複數化」訊息必須包含 `num` 參數，用來指示在不同情境下如何複數化該單詞。例如，英文會將 "person" 複數化為 "people"，但這還不夠全面。`message0` 複數可能是 "no people" 或 "zero people"。`messageFew` 複數可能是 "several people"、"some people" 或 "a few people"。`messageMany` 複數可能是 "most people"、"many people" 或 "a crowd"。只有較為通用的 `messageOther` 欄位是必須的。以下範例展示了可用的選項：

```json
"{countPlaceholder, plural, =0{message0} =1{message1} =2{message2} few{messageFew} many{messageMany} other{messageOther}}"
```

先前的運算式會被替換為與 `countPlaceholder` 的值對應的訊息變體（`message0`、`message1`、...）。其中僅需提供 `messageOther` 欄位。

以下範例定義了一則訊息，用來將 "wombat" 這個單字進行複數化處理：

{% raw %}
<?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb" skip="15" take="10" replace="/},$/}/g"?>
```json
"nWombats": "{count, plural, =0{no wombats} =1{1 wombat} other{{count} wombats}}",
"@nWombats": {
  "description": "A plural message",
  "placeholders": {
    "count": {
      "type": "num",
      "format": "compact"
    }
  }
}
```
{% endraw %}

使用 plural 方法，並傳入 `count` 參數：

<?code-excerpt "gen_l10n_example/lib/main.dart (placeholder)" remove="/John|he|she|they|pronoun/" replace="/\[/[\n    .../g"?>
```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    ...
    // Returns 'no wombats'
    Text(AppLocalizations.of(context)!.nWombats(0)),
    // Returns '1 wombat'
    Text(AppLocalizations.of(context)!.nWombats(1)),
    // Returns '5 wombats'
    Text(AppLocalizations.of(context)!.nWombats(5)),
  ],
);
```

類似於複數處理，你也可以根據 `String` 占位符來選擇不同的值。這通常用於支援有性別區分的語言。語法如下：

```json
"{selectPlaceholder, select, case{message} ... other{messageOther}}"
```

下一個範例定義了一個訊息，根據性別選擇適當的代名詞：

{% raw %}
<?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb" skip="25" take="9" replace="/},$/}/g"?>
```json
"pronoun": "{gender, select, male{he} female{she} other{they}}",
"@pronoun": {
  "description": "A gendered message",
  "placeholders": {
    "gender": {
      "type": "String"
    }
  }
}
```
{% endraw %}

使用此功能時，請將 gender 字串作為參數傳遞：

<?code-excerpt "gen_l10n_example/lib/main.dart (placeholder)" remove="/'He|hello|ombat/" replace="/\[/[\n    .../g"?>
```dart
// Examples of internationalized strings.
return Column(
  children: <Widget>[
    ...
    // Returns 'he'
    Text(AppLocalizations.of(context)!.pronoun('male')),
    // Returns 'she'
    Text(AppLocalizations.of(context)!.pronoun('female')),
    // Returns 'they'
    Text(AppLocalizations.of(context)!.pronoun('other')),
  ],
);
```

請注意，當使用 `select` 陳述式時，參數與實際值之間的比較會區分大小寫。也就是說，`AppLocalizations.of(context)!.pronoun("Male")` 預設會進入 "other" 情況，並回傳 "they"。

### 跳脫語法

有時候，你需要將像是 `{` 和 `}` 這類的標記，當作一般字元來使用。若要讓這些標記不被解析，請啟用 `use-escaping` 旗標，方法是在 `l10n.yaml` 中加入以下內容：

```yaml
use-escaping: true
```

剖析器會忽略任何用一對單引號包裹的字元字串。若要使用一般的單引號字元，請使用連續兩個單引號。例如，下列文字會被轉換為 Dart `String`：

```json
{
  "helloWorld": "Hello! '{Isn''t}' this a wonderful day?"
}
```

產生的字串如下：

```dart
"Hello! {Isn't} this a wonderful day?"
```

### 含有數字與貨幣的訊息

數字（包括代表貨幣價值的數字）在不同的地區語系（locale）中顯示方式差異很大。`flutter_localizations` 的在地化產生工具會使用 [`NumberFormat`]({{site.api}}/flutter/package-intl_intl/NumberFormat-class.html) 類別（class），該類別屬於 `intl` 套件，用來根據地區語系與所需格式來格式化數字。

`int`、`double` 和 `num` 類型可以使用下列任一個 `NumberFormat` 建構函式（constructor）：

| Message "format" value   | 1200000 的輸出結果 |
|--------------------------|--------------------|
| `compact`                | "1.2M"             |
| `compactCurrency`*       | "$1.2M"            |
| `compactSimpleCurrency`* | "$1.2M"            |
| `compactLong`            | "1.2 million"      |
| `currency`*              | "USD1,200,000.00"  |
| `decimalPattern`         | "1,200,000"        |
| `decimalPatternDigits`*  | "1,200,000"        |
| `decimalPercentPattern`* | "120,000,000%"     |
| `percentPattern`         | "120,000,000%"     |
| `scientificPattern`      | "1E6"              |
| `simpleCurrency`*        | "$1,200,000"       |

{:.table .table-striped}

表格中帶有星號的 `NumberFormat` 建構函式提供可選的具名參數（named parameters）。這些參數可以作為 placeholder 的 `optionalParameters` 物件的值來指定。例如，若要為 `compactCurrency` 指定可選的 `decimalDigits` 參數，請對 `lib/l10n/app_en.arb` 檔案做以下修改：

{% raw %}
<?code-excerpt "gen_l10n_example/lib/l10n/app_en.arb" skip="34" take="13" replace="/},$/}/g"?>
```json
"numberOfDataPoints": "Number of data points: {value}",
"@numberOfDataPoints": {
  "description": "A message with a formatted int parameter",
  "placeholders": {
    "value": {
      "type": "int",
      "format": "compactCurrency",
      "optionalParameters": {
        "decimalDigits": 2
      }
    }
  }
}
```
{% endraw %}

### 含有日期的訊息

日期字串的格式會根據不同的地區（locale）以及應用程式的需求有多種不同的呈現方式。

型別為 `DateTime` 的占位符值，會使用 `intl` 套件中的 [`DateFormat`][] 來進行格式化。

目前共有 41 種格式變化，這些格式是由 `DateFormat` 工廠建構函式（factory constructors）的名稱來識別。在下列範例中，出現在 `helloWorldOn` 訊息中的 `DateTime` 值，會以 `DateFormat.yMd` 的格式進行格式化：

```json
"helloWorldOn": "Hello World on {date}",
"@helloWorldOn": {
  "description": "A message with a date parameter",
  "placeholders": {
    "date": {
      "type": "DateTime",
      "format": "yMd"
    }
  }
}
```

在一個語系為美式英文（US English）的應用程式中，下列運算式會產生 "7/9/1959"。而在俄文語系下，則會產生 "9.07.1959"。

```dart
AppLocalizations.of(context).helloWorldOn(DateTime.utc(1959, 7, 9))
```

[`DateFormat`]: {{site.api}}/flutter/package-intl_intl/DateFormat-class.html

<a id="ios-specifics"></a>
### 為 iOS 在地化：更新 iOS 應用程式 bundle

雖然在地化是由 Flutter 處理的，但你仍需在 Xcode 專案中加入支援的語言。這樣才能確保你的 App Store 條目正確顯示所支援的語言。

若要設定你的應用程式所支援的語言區域（locale），請依照以下步驟操作：

1. 開啟你的專案中的 `ios/Runner.xcodeproj` Xcode 檔案。

2. 在 **Project Navigator** 中，選取 **Projects** 下的 `Runner` 專案檔案。

4. 在專案編輯器中選擇 `Info` 分頁。

5. 在 **Localizations** 區塊中，點擊 `Add` 按鈕（`+`），將支援的語言與地區加入你的專案。當系統詢問你選擇檔案與參考語言時，只需選擇 `Finish`。

7. Xcode 會自動建立空的 `.strings` 檔案並更新 `ios/Runner.xcodeproj/project.pbxproj` 檔案。這些檔案會被 App Store 用來判斷你的應用程式支援哪些語言與地區。

<a id="advanced-customization"></a>
## 進階主題：更進一步的自訂

本節介紹如何進一步自訂 Flutter 應用程式的在地化功能。

<a id="advanced-locale"></a>
### 進階語言區域（locale）定義

有些語言因為有多種變體，僅用語言代碼無法正確區分。

例如，要完整區分所有中文變體，需要同時指定語言代碼、字體（script）代碼以及國家代碼。這是因為中文有簡體與繁體之分，即使同為繁體或簡體，不同地區的字形也會有所差異。

為了完整表達國家代碼為 `CN`、`TW` 和 `HK` 的所有中文變體，支援的語言區域（locales）列表應包含：

<?code-excerpt "gen_l10n_example/lib/examples.dart (supported-locales)"?>
```dart
supportedLocales: [
  Locale.fromSubtags(languageCode: 'zh'), // generic Chinese 'zh'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hans',
  ), // generic simplified Chinese 'zh_Hans'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
  ), // generic traditional Chinese 'zh_Hant'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hans',
    countryCode: 'CN',
  ), // 'zh_Hans_CN'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
    countryCode: 'TW',
  ), // 'zh_Hant_TW'
  Locale.fromSubtags(
    languageCode: 'zh',
    scriptCode: 'Hant',
    countryCode: 'HK',
  ), // 'zh_Hant_HK'
],
```

這種明確且完整的定義可確保你的應用程式能夠區分所有這些國家代碼的組合，並為其提供細緻入微的在地化內容。如果使用者的偏好語系未被明確指定，Flutter 會選擇最接近的匹配項，這很可能會與使用者的預期有所不同。Flutter 只會解析在 `supportedLocales` 中定義的語系，並針對常用語言提供以 scriptCode 區分的在地化內容。關於支援語系與偏好語系如何解析的詳細資訊，請參閱 [`Localizations`][]。

雖然中文是主要範例，其他語言如法文（`fr_FR`、`fr_CA`）也應該完整區分，以實現更細緻的在地化。

[`Localizations`]: {{site.api}}/flutter/widgets/WidgetsApp/supportedLocales.html

<a id="tracking-locale"></a>
### 追蹤語系：Locale 類別與 Localizations 元件

[`Locale`][] 類別用於識別使用者的語言。行動裝置支援為所有應用程式設定語系，通常可透過系統設定選單進行。國際化應用程式會根據語系顯示特定內容。例如，若使用者將裝置語系從英文切換為法文，則原本顯示 "Hello World" 的 `Text` 元件會重新建構為 "Bonjour le monde"。

[`Localizations`][widgets-global] 元件定義了其子元件的語系，以及子元件所依賴的在地化資源。[`WidgetsApp`][] 元件會建立 `Localizations` 元件，並在系統語系變更時重新建構它。

你隨時可以透過 `Localizations.localeOf()` 查詢應用程式目前的語系：

<?code-excerpt "gen_l10n_example/lib/examples.dart (my-locale)"?>
```dart
Locale myLocale = Localizations.localeOf(context);
```

[`Locale`]: {{site.api}}/flutter/dart-ui/Locale-class.html
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[widgets-global]: {{site.api}}/flutter/flutter_localizations/GlobalWidgetsLocalizations-class.html

<a id="specifying-supportedlocales" aria-hidden="true"></a>

### 指定應用程式的 supported&shy;Locales 參數

雖然 `flutter_localizations` 函式庫支援多種語言及語言變體，但預設僅提供英文翻譯。開發者需自行決定要支援哪些語言。

`MaterialApp` [`supportedLocales`][] 參數會限制語系切換。當使用者在其裝置上更改語系設定時，應用程式的 `Localizations` 元件（Widget）僅會在新語系屬於此清單成員時才跟隨變更。如果找不到與裝置語系完全相符的項目，則會使用第一個與 [`languageCode`][] 相符的支援語系。如果仍無法匹配，則會使用 `supportedLocales` 清單中的第一個元素。

若應用程式希望採用不同的「語系解析」方法，可以提供 [`localeResolutionCallback`][]。例如，若你希望應用程式無條件接受使用者所選的任何語系：

<?code-excerpt "gen_l10n_example/lib/examples.dart (locale-resolution)"?>
```dart
MaterialApp(
  localeResolutionCallback: (locale, supportedLocales) {
    return locale;
  },
);
```

[`languageCode`]: {{site.api}}/flutter/dart-ui/Locale/languageCode.html
[`localeResolutionCallback`]: {{site.api}}/flutter/widgets/LocaleResolutionCallback.html
[`supportedLocales`]: {{site.api}}/flutter/material/MaterialApp/supportedLocales.html

### 設定 l10n.yaml 檔案

`l10n.yaml` 檔案可讓你設定 `gen-l10n` 工具，以指定下列項目：

* 所有輸入檔案的位置
* 所有輸出檔案應該建立的位置
* 指定本地化 delegate 的 Dart 類別名稱

如需完整選項列表，可以在命令列執行 `flutter gen-l10n --help`，或參考下表：

| 選項                                  | 說明 |
| ------------------------------------| ------------------ |
| `arb-dir`                           | 範本與翻譯後的 arb 檔案所在的目錄。預設為 `lib/l10n`。|
| `output-dir`                        | 產生的本地化類別寫入的目錄。僅當你希望將本地化程式碼產生在 Flutter 專案的其他位置時，此選項才有意義。你也需要將 `synthetic-package` 旗標設為 false。<br /><br />應用程式必須從此目錄匯入 `output-localization-file` 選項指定的檔案。若未指定，則預設與 `arb-dir` 指定的輸入目錄相同。|
| `template-arb-file`                 | 用於產生 Dart 本地化與訊息檔案的範本 arb 檔案。預設為 `app_en.arb`。|
| `output-localization-file`          | 輸出本地化與本地化 delegate 類別的檔名。預設為 `app_localizations.dart`。|
| `untranslated-messages-file`        | 尚未翻譯的本地化訊息描述檔案的位置。使用此選項會在目標位置建立一個 JSON 檔案，格式如下：<br /><br />`"locale": ["message_1", "message_2" ... "message_n"]`<br /><br />若未指定此選項，則未翻譯訊息的摘要會顯示在命令列上。|
| `output-class`                      | 輸出本地化與本地化 delegate 類別所使用的 Dart 類別名稱。預設為 `AppLocalizations`。|
| `preferred-supported-locales`       | 應用程式偏好的支援語系清單。預設情況下，工具會依字母順序產生支援語系清單。使用此旗標可將預設語系設為其他語系。<br /><br />例如，傳入 `[ en_US ]`，若裝置支援，則預設為美式英文。|
| `header`                            | 要加在產生的 Dart 本地化檔案開頭的標頭。此選項接受字串。<br /><br />例如，傳入 `"/// All localized files."`，即可將此字串加到產生的 Dart 檔案開頭。<br /><br />另外，也可以參考 `header-file` 選項，傳入文字檔以加入較長的標頭。|
| `header-file`                       | 要加在產生的 Dart 本地化檔案開頭的標頭。此選項的值為包含標頭文字的檔案名稱，該文字會插入在每個產生的 Dart 檔案頂端。<br /><br />另外，也可以參考 `header` 選項，傳入字串作為較簡單的標頭。<br /><br />此檔案應放在 `arb-dir` 指定的目錄中。|
| `[no-]use-deferred-loading`         | 指定是否以 deferred 方式匯入語系，讓 Flutter web 可延遲載入各語系的 Dart 本地化檔案。<br /><br />這可減少網頁應用程式的初始啟動時間，因為 JavaScript bundle 的大小會變小。當此旗標設為 true 時，特定語系的訊息僅在 Flutter 應用程式需要時才會下載與載入。對於有大量語系與本地化字串的專案，延遲載入可提升效能；對於語系較少的專案，差異不大，甚至可能比將所有本地化與應用程式一起打包還慢。<br /><br />請注意，此旗標不會影響行動裝置或桌面等其他平台。|
| `gen-inputs-and-outputs-list`      | 指定時，工具會產生一個名為 `gen_l10n_inputs_and_outputs.json` 的 JSON 檔案，內容包含工具的輸入與輸出。<br /><br />這有助於追蹤 Flutter 專案在產生最新本地化時所用的檔案。例如，Flutter 工具的建置系統會利用此檔案來判斷何時在 hot reload 時呼叫 gen_l10n。<br /><br />此選項的值為產生 JSON 檔案的目錄。若為 null，則不會產生 JSON 檔案。|
| `synthetic-package`                 | 決定產生的輸出檔案是以合成套件（synthetic package）方式產生，還是產生在 Flutter 專案指定目錄。此旗標預設為 `true`。當 `synthetic-package` 設為 `false` 時，預設會在 `arb-dir` 指定的目錄產生本地化檔案。若指定 `output-dir`，則會產生在該處。|
| `project-dir`                       | 指定時，工具會將此選項傳入的路徑作為 Flutter 專案根目錄。<br /><br />若為 null，則使用目前工作目錄的相對路徑。|
| `[no-]required-resource-attributes` | 要求所有資源 ID 必須包含對應的資源屬性。<br /><br />預設情況下，簡單訊息不需要額外的中繼資料，但強烈建議加上，因為這能提供訊息意義的上下文給閱讀者。<br /><br />複數訊息仍然需要資源屬性。|
| `[no-]nullable-getter`              | 指定本地化類別的 getter 是否為 nullable。<br /><br />預設為 true，因此 `Localizations.of(context)` 會回傳可為 null 的值，以維持相容性。若設為 false，則會對 `Localizations.of(context)` 的回傳值進行 null 檢查，使用者程式碼就不需再做 null 檢查。|
| `[no-]format`                       | 指定時，產生本地化檔案後會執行 `dart format` 指令。|
| `use-escaping`                      | 指定是否啟用單引號作為跳脫語法。|
| `[no-]suppress-warnings`            | 指定時，會隱藏所有警告訊息。|
| `[no-]relax-syntax`                 | 指定時，語法會放寬，未跟隨有效佔位符的「{」會被視為字串，未關閉前一個特殊「{」的「}」也會被視為字串。|
| `[no-]use-named-parameters`         | 是否對產生的本地化方法使用具名參數。|

{:.table .table-striped}


## Flutter 國際化的運作方式

本節說明 Flutter 本地化的技術細節。如果你打算支援自訂的本地化訊息，以下內容會很有幫助。否則，你可以略過本節。

<a id="loading-and-retrieving"></a>
### 載入與取得本地化值

`Localizations` 元件（Widget）用於載入並查找包含本地化值集合的物件。應用程式會透過 [`Localizations.of(context,type)`][] 來參考這些物件。如果裝置的語系變更，`Localizations` 元件會自動載入新語系的值，並重新建構使用該元件的元件（Widget）。這是因為 `Localizations` 的運作方式類似 [`InheritedWidget`][]。當 build 函式參考到 inherited widget 時，會自動建立對該 inherited widget 的依賴。當 inherited widget 發生變化（例如 `Localizations` 元件的語系變更時），其依賴的 context 會被重建。

本地化值由 `Localizations` 元件的 [`LocalizationsDelegate`][] 清單載入。每個 delegate 必須定義一個非同步的 [`load()`][] 方法，該方法會產生一個封裝本地化值集合的物件。通常這些物件會針對每個本地化值定義一個方法。

在大型應用程式中，不同模組或套件可能會包含自己的本地化內容。因此，`Localizations` 元件會管理一個物件表格，每個 `LocalizationsDelegate` 對應一個物件。若要取得某個 `LocalizationsDelegate` 的 `load` 方法所產生的物件，請指定 `BuildContext` 及該物件的型別。

舉例來說，Material 元件（Material Components）的本地化字串由 [`MaterialLocalizations`][] 類別定義。此類別的實例由 [`MaterialApp`][] 類別提供的 `LocalizationDelegate` 建立。你可以透過 `Localizations.of()` 來取得這些實例：

```dart
Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
```

這個特定的 `Localizations.of()` 表達式經常被使用，因此 `MaterialLocalizations` 類別提供了一個方便的簡寫方式：

```dart
static MaterialLocalizations of(BuildContext context) {
  return Localizations.of<MaterialLocalizations>(context, MaterialLocalizations);
}

/// References to the localized values defined by MaterialLocalizations
/// are typically written like this:

tooltip: MaterialLocalizations.of(context).backButtonTooltip,
```

[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[`load()`]: {{site.api}}/flutter/widgets/LocalizationsDelegate/load.html
[`LocalizationsDelegate`]: {{site.api}}/flutter/widgets/LocalizationsDelegate-class.html
[`Localizations.of(context,type)`]: {{site.api}}/flutter/widgets/Localizations/of.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`MaterialLocalizations`]: {{site.api}}/flutter/material/MaterialLocalizations-class.html

<a id="defining-class"></a>
### 為應用程式的在地化資源定義類別

建立一個國際化的 Flutter 應用程式，通常會從封裝應用程式在地化值的類別開始。以下的範例就是這類類別的典型寫法。

本應用程式的 [`intl_example`][] 完整原始碼。

本範例是基於 [`intl`][] 套件所提供的 API 和工具。若想了解不依賴 `intl` 套件的寫法，請參考[應用程式在地化資源的替代類別](#alternative-class)章節中的[範例][an example]。

`DemoLocalizations` 類別（於下方程式碼片段中定義）包含了應用程式支援的各個語系（locale）所對應的字串（本範例僅有一個字串）。它會使用 Dart [`intl`][] 套件所產生的 `initializeMessages()` 函式，[`Intl.message()`][]，來查詢這些字串。

<?code-excerpt "intl_example/lib/main.dart (demo-localizations)"?>
```dart
class DemoLocalizations {
  DemoLocalizations(this.localeName);

  static Future<DemoLocalizations> load(Locale locale) {
    final String name =
        locale.countryCode == null || locale.countryCode!.isEmpty
        ? locale.languageCode
        : locale.toString();
    final String localeName = Intl.canonicalizedLocale(name);

    return initializeMessages(localeName).then((_) {
      return DemoLocalizations(localeName);
    });
  }

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
  }

  final String localeName;

  String get title {
    return Intl.message(
      'Hello World',
      name: 'title',
      desc: 'Title for the Demo application',
      locale: localeName,
    );
  }
}
```

一個基於 `intl` 套件的類別會匯入一個產生的訊息目錄（message catalog），該目錄提供 `initializeMessages()` 函式以及每個語系（locale）對應的 `Intl.message()` 後端儲存區（backing store）。這個訊息目錄是由 [`intl` 工具](#dart-tools) 產生，該工具會分析包含 `Intl.message()` 呼叫的類別原始碼。在這個例子中，只有 `DemoLocalizations` 類別會被分析。

[an example]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/minimal
[`intl`]: {{site.pub-pkg}}/intl
[`Intl.message()`]: {{site.pub-api}}/intl/latest/intl/Intl/message.html

<a id="adding-language"></a>
### 新增支援新語言

如果應用程式需要支援 [`GlobalMaterialLocalizations`][] 中未包含的語言，則需要額外處理：必須為該語系（locale）提供約 70 個單字或片語的翻譯（「在地化」），以及日期格式與符號。

以下範例說明如何為挪威新挪威語（Norwegian Nynorsk）新增支援。

新的 `GlobalMaterialLocalizations` 子類別會定義 Material 函式庫所依賴的在地化內容。還必須定義一個新的 `LocalizationsDelegate` 子類別，作為 `GlobalMaterialLocalizations` 子類別的工廠（factory）。

以下是完整 [`add_language`][] 範例的原始碼（不含實際的新挪威語翻譯內容）。

特定語系的 `GlobalMaterialLocalizations` 子類別名稱為 `NnMaterialLocalizations`，而 `LocalizationsDelegate` 子類別名稱為 `_NnMaterialLocalizationsDelegate`。`NnMaterialLocalizations.delegate` 的值是一個 delegate 實例，這就是應用程式使用這些在地化內容所需的全部。

delegate 類別包含基本的日期與數字格式在地化。所有其他在地化內容則由 `String` 型別的屬性 getter 在 `NnMaterialLocalizations` 中定義，如下所示：

<?code-excerpt "add_language/lib/nn_intl.dart (getters)"?>
```dart
@override
String get moreButtonTooltip => r'More';

@override
String get aboutListTileTitleRaw => r'About $applicationName';

@override
String get alertDialogLabel => r'Alert';
```

這些當然是英文翻譯。要完成這項工作，你需要將每個 getter 的回傳值改為適當的 Nynorsk 字串。

這些 getter 會回傳帶有 `r` 前綴的「原始」Dart 字串，例如 `r'About $applicationName'`，因為有時這些字串中會包含帶有 `$` 前綴的變數。這些變數會由參數化的在地化方法展開：

<?code-excerpt "add_language/lib/nn_intl.dart (raw)"?>
```dart
@override
String get pageRowsInfoTitleRaw => r'$firstRow–$lastRow of $rowCount';

@override
String get pageRowsInfoTitleApproximateRaw =>
    r'$firstRow–$lastRow of about $rowCount';
```

還需要指定該地區的日期格式樣式（date patterns）與符號（symbols），這些內容在原始碼中定義如下：

{% comment %}
RegEx adds last two lines with commented out code and closing bracket.
{% endcomment %}

<?code-excerpt "add_language/lib/nn_intl.dart (date-patterns)" replace="/  'LLL': 'LLL',/  'LLL': 'LLL',\n  \/\/ ...\n}/g"?>
```dart
const nnLocaleDatePatterns = {
  'd': 'd.',
  'E': 'ccc',
  'EEEE': 'cccc',
  'LLL': 'LLL',
  // ...
}
```

{% comment %}
RegEx adds last two lines with commented out code and closing bracket.
{% endcomment %}

<?code-excerpt "add_language/lib/nn_intl.dart (date-symbols)" replace="/  ],/  ],\n  \/\/ ...\n}/g"?>
```dart
const Map<String, Object?> nnDateSymbols = {
  'NAME': 'nn',
  'ERAS': <dynamic>['f.Kr.', 'e.Kr.'],
```

這些值需要根據在地語系（locale）進行調整，以正確使用日期格式。不過，由於 `intl` 函式庫在數字格式化方面沒有同樣的彈性，因此在 `_NnMaterialLocalizationsDelegate` 中必須以現有語系的格式作為替代：

<?code-excerpt "add_language/lib/nn_intl.dart (delegate)"?>
```dart
class _NnMaterialLocalizationsDelegate
    extends LocalizationsDelegate<MaterialLocalizations> {
  const _NnMaterialLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) => locale.languageCode == 'nn';

  @override
  Future<MaterialLocalizations> load(Locale locale) async {
    final String localeName = intl.Intl.canonicalizedLocale(locale.toString());

    // The locale (in this case `nn`) needs to be initialized into the custom
    // date symbols and patterns setup that Flutter uses.
    date_symbol_data_custom.initializeDateFormattingCustom(
      locale: localeName,
      patterns: nnLocaleDatePatterns,
      symbols: intl.DateSymbols.deserializeFromMap(nnDateSymbols),
    );

    return SynchronousFuture<MaterialLocalizations>(
      NnMaterialLocalizations(
        localeName: localeName,
        // The `intl` library's NumberFormat class is generated from CLDR data
        // (see https://github.com/dart-lang/i18n/blob/main/pkgs/intl/lib/number_symbols_data.dart).
        // Unfortunately, there is no way to use a locale that isn't defined in
        // this map and the only way to work around this is to use a listed
        // locale's NumberFormat symbols. So, here we use the number formats
        // for 'en_US' instead.
        decimalFormat: intl.NumberFormat('#,##0.###', 'en_US'),
        twoDigitZeroPaddedFormat: intl.NumberFormat('00', 'en_US'),
        // DateFormat here will use the symbols and patterns provided in the
        // `date_symbol_data_custom.initializeDateFormattingCustom` call above.
        // However, an alternative is to simply use a supported locale's
        // DateFormat symbols, similar to NumberFormat above.
        fullYearFormat: intl.DateFormat('y', localeName),
        compactDateFormat: intl.DateFormat('yMd', localeName),
        shortDateFormat: intl.DateFormat('yMMMd', localeName),
        mediumDateFormat: intl.DateFormat('EEE, MMM d', localeName),
        longDateFormat: intl.DateFormat('EEEE, MMMM d, y', localeName),
        yearMonthFormat: intl.DateFormat('MMMM y', localeName),
        shortMonthDayFormat: intl.DateFormat('MMM d'),
      ),
    );
  }

  @override
  bool shouldReload(_NnMaterialLocalizationsDelegate old) => false;
}
```

如需有關在地化字串的更多資訊，請參閱 [flutter_localizations README][]。

當你已經實作了語言專屬的 `GlobalMaterialLocalizations` 和 `LocalizationsDelegate` 子類別後，你需要將該語言及其 delegate 實例加入你的應用程式中。以下程式碼將應用程式的語言設定為 Nynorsk，並將 `NnMaterialLocalizations` delegate 實例加入應用程式的 `localizationsDelegates` 清單中：

<?code-excerpt "add_language/lib/main.dart (material-app)"?>
```dart
const MaterialApp(
  localizationsDelegates: [
    GlobalWidgetsLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    NnMaterialLocalizations.delegate, // Add the newly created delegate
  ],
  supportedLocales: [Locale('en', 'US'), Locale('nn')],
  home: Home(),
),
```

[`add_language`]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/add_language/lib/main.dart

[flutter_localizations README]: {{site.repo.flutter}}/blob/main/packages/flutter_localizations/lib/src/l10n/README.md
[`GlobalMaterialLocalizations`]: {{site.api}}/flutter/flutter_localizations/GlobalMaterialLocalizations-class.html

<a id="alternative-internationalization-workflows"></a>
## 替代的國際化工作流程

本節說明不同的方式來為你的 Flutter 應用程式進行國際化。

<a id="alternative-class"></a>
### 用於應用程式在地化資源的替代類別

前面的範例是以 Dart `intl` 套件為基礎所定義。你可以根據簡化需求，或是為了整合其他 i18n 框架，自行選擇管理在地化值的方法。

完整原始碼請參考 [`minimal`][] 應用程式。

在以下範例中，`DemoLocalizations` 類別將所有翻譯直接以每個語言的 Map 方式包含在內：


<?code-excerpt "minimal/lib/main.dart (demo)"?>
```dart
class DemoLocalizations {
  DemoLocalizations(this.locale);

  final Locale locale;

  static DemoLocalizations of(BuildContext context) {
    return Localizations.of<DemoLocalizations>(context, DemoLocalizations)!;
  }

  static const _localizedValues = <String, Map<String, String>>{
    'en': {'title': 'Hello World'},
    'es': {'title': 'Hola Mundo'},
  };

  static List<String> languages() => _localizedValues.keys.toList();

  String get title {
    return _localizedValues[locale.languageCode]!['title']!;
  }
}
```

在 minimal 應用程式中，`DemoLocalizationsDelegate` 有些許不同。它的 `load` 方法會回傳 [`SynchronousFuture`][]，因為不需要進行任何非同步 (asynchronous) 載入。

<?code-excerpt "minimal/lib/main.dart (delegate)"?>
```dart
class DemoLocalizationsDelegate
    extends LocalizationsDelegate<DemoLocalizations> {
  const DemoLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) =>
      DemoLocalizations.languages().contains(locale.languageCode);

  @override
  Future<DemoLocalizations> load(Locale locale) {
    // Returning a SynchronousFuture here because an async "load" operation
    // isn't needed to produce an instance of DemoLocalizations.
    return SynchronousFuture<DemoLocalizations>(DemoLocalizations(locale));
  }

  @override
  bool shouldReload(DemoLocalizationsDelegate old) => false;
}
```

[`SynchronousFuture`]: {{site.api}}/flutter/foundation/SynchronousFuture-class.html

<a id="dart-tools"></a>
### 使用 Dart intl 工具

在使用 Dart [`intl`][] 套件來建構 API 之前，請先閱讀 `intl` 套件的文件。以下列表簡要說明了依賴 `intl` 套件的應用程式在在地化（localization）時的流程：

此範例應用程式依賴一個名為 `l10n/messages_all.dart` 的產生來源檔案，該檔案定義了應用程式中所有可在地化的字串。

重新產生 `l10n/messages_all.dart` 需要兩個步驟。

 1. 以應用程式的根目錄作為目前目錄，從 `lib/main.dart` 產生 `l10n/intl_messages.arb`：

    ```console
    $ dart run intl_translation:extract_to_arb --output-dir=lib/l10n lib/main.dart
    ```

    `intl_messages.arb` 檔案是一個 JSON 格式的對應表，對於在 `main.dart` 中定義的每個 `Intl.message()` 函式，都有一個對應的項目。此檔案作為英文與西班牙文翻譯（`intl_en.arb` 與 `intl_es.arb`）的範本。這些翻譯需由你（開發者）來建立。

 2. 以應用程式的根目錄為當前目錄，為每個 `intl_<locale>.arb` 檔案和 `intl_messages_all.dart` 產生 `intl_messages_<locale>.dart`，`intl_messages_all.dart` 會匯入所有訊息檔案：

    ```console
    $ dart run intl_translation:generate_from_arb \
        --output-dir=lib/l10n --no-use-deferred-loading \
        lib/main.dart lib/l10n/intl_*.arb
    ```

    ***Windows 不支援檔案名稱萬用字元（wildcarding）。*** 請改為列出由 `intl_translation:extract_to_arb` 指令所產生的 .arb 檔案。

    ```console
    $ dart run intl_translation:generate_from_arb \
        --output-dir=lib/l10n --no-use-deferred-loading \
        lib/main.dart \
        lib/l10n/intl_en.arb lib/l10n/intl_fr.arb lib/l10n/intl_messages.arb
    ```

    `DemoLocalizations` 類別會使用產生的 `initializeMessages()` 函式（定義於 `intl_messages_all.dart`）來載入在地化訊息，並透過 `Intl.message()` 查詢這些訊息。

## 更多資訊

如果你習慣透過閱讀程式碼學習，請參考以下範例。

* [`minimal`][]<br>
  `minimal` 範例設計得盡可能簡單。
* [`intl_example`][]<br>
  使用 [`intl`][] 套件所提供的 API 與工具。

如果你對 Dart 的 `intl` 套件還不熟悉，請參考[使用 Dart intl 工具](#dart-tools)。

[`intl_example`]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/intl_example
[`minimal`]: {{site.repo.this}}/tree/{{site.branch}}/examples/internationalization/minimal
