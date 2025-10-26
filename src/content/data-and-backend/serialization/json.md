---
title: JSON 與序列化
shortTitle: JSON
description: 如何在 Flutter 中使用 JSON。
---

<?code-excerpt path-base="data-and-backend/json/"?>

很難想像有哪個行動應用程式不需要在某個階段與 Web 伺服器通訊，或是輕鬆地儲存結構化資料。當你開發需要網路連線的應用程式時，幾乎遲早都會需要處理經典的 JSON。

本指南將介紹在 Flutter 中使用 JSON 的各種方式，並說明在不同情境下該選擇哪一種 JSON 解決方案，以及原因。

:::note 術語說明
_Encoding_（編碼）與 _serialization_（序列化）是同一件事——將資料結構轉換成字串。
_Decoding_（解碼）與 _deserialization_（反序列化）則是相反的過程——將字串轉換回資料結構。
不過，_serialization_（序列化）通常也泛指將資料結構轉換為更易於閱讀格式的整個過程。

為避免混淆，本文在描述整體流程時使用「序列化」（serialization），而在特指這些過程時則分別使用「編碼」（encoding）與「解碼」（decoding）。
:::

{% ytEmbed 'ngsxzZt5DoY', 'dart:convert (Technique of the Week)' %}

## 我該選擇哪種 JSON 序列化方式？

本文涵蓋了兩種常見的 JSON 處理策略：

* 手動序列化
* 透過程式碼產生器自動序列化

不同的專案有不同的複雜度與使用情境。對於較小的概念驗證（proof-of-concept）專案或快速原型，使用程式碼產生器可能有點大材小用。而如果你的應用程式有多個較為複雜的 JSON 模型，手動編碼很快就會變得繁瑣、重複，且容易出現許多小錯誤。

### 小型專案建議使用手動序列化

手動 JSON 解碼是指使用 `dart:convert` 內建的 JSON 解碼器。這種方式是將原始 JSON 字串傳給 `jsonDecode()` 函式，然後在產生的 `Map<String, dynamic>` 中查找你需要的值。
這種方法無需額外依賴或特殊設定流程，非常適合快速製作概念驗證。

但當你的專案規模變大時，手動解碼的效能就會變差。手動撰寫解碼邏輯會變得難以維護且容易出錯。如果你在存取不存在的 JSON 欄位時拼錯字，程式會在執行階段拋出錯誤。

如果你的專案中 JSON 模型不多，且只是想快速驗證概念，手動序列化會是很好的起點。手動編碼的範例請參考
[使用 dart:convert 手動序列化 JSON][Serializing JSON manually using dart:convert]。

:::tip
想要實際練習 JSON 反序列化並善用 Dart 3 的新功能嗎？
歡迎參加 [深入探索 Dart 的 pattern 與 record][Dive into Dart's patterns and records] codelab。
:::

### 中大型專案建議使用程式碼產生器

利用程式碼產生器進行 JSON 序列化，代表你可以透過外部函式庫自動產生編碼樣板程式碼。經過初步設定後，你可以啟動檔案監控工具，根據你的模型類別自動產生相關程式碼。例如 [`json_serializable`][`json_serializable`] 和 [`built_value`][`built_value`] 都是這類型的函式庫。

這種方式非常適合大型專案。你不需要手寫樣板程式碼，且在存取 JSON 欄位時的拼字錯誤會在編譯階段就被發現。缺點是需要一些初始設定，且產生的原始碼檔案可能會讓專案導覽視窗變得雜亂。

當你的專案屬於中型或大型時，建議使用程式碼產生器來進行 JSON 序列化。程式碼產生器相關範例請參考 [使用程式碼產生器套件序列化 JSON][Serializing JSON using code generation libraries]。

## Flutter 有沒有像 GSON/<wbr>Jackson/<wbr>Moshi 這類的函式庫？

簡單來說，沒有。

這類函式庫需要使用執行階段 [reflection（反射）][reflection]，但 Flutter 並不支援反射。執行階段反射會干擾 [tree shaking（樹狀優化）][tree shaking]，而 Dart 已經支援 tree shaking 很長一段時間。透過 tree shaking，你可以在發佈版本時「搖掉」未使用的程式碼，大幅優化應用程式的體積。

由於反射會讓所有程式碼預設都被視為「有用」，這會讓 tree shaking 變得困難。工具無法知道哪些部分在執行時沒被用到，因此冗餘程式碼很難被移除。使用反射時，應用程式的體積就很難最佳化。

雖然 Flutter 不能用執行階段反射，但有些函式庫提供了同樣易用的 API，底層則是透過程式碼產生器實作。這種方式會在[程式碼產生器套件][code generation libraries]章節中有更詳細的說明。

<a id="manual-encoding"></a>
## 使用 dart:convert 手動序列化 JSON

在 Flutter 中進行基本的 JSON 序列化非常簡單。Flutter 內建的 `dart:convert` 函式庫就包含了簡單易用的 JSON 編碼器與解碼器。

以下這個範例 JSON 實作了一個簡單的使用者模型。

<?code-excerpt "lib/manual/main.dart (multiline-json)" skip="1" take="4"?>
```json
{
  "name": "John Smith",
  "email": "john@example.com"
}
```

使用 `dart:convert`，
你可以用兩種方式序列化這個 JSON 模型。

### 內嵌序列化 JSON

參考 [`dart:convert`][`dart:convert`] 文件，
你會發現可以透過呼叫
`jsonDecode()` 函式，並將 JSON 字串作為方法參數，
來解碼 JSON。

<?code-excerpt "lib/manual/main.dart (manual)"?>
```dart
final user = jsonDecode(jsonString) as Map<String, dynamic>;

print('Howdy, ${user['name']}!');
print('We sent the verification link to ${user['email']}.');
```

不幸的是，`jsonDecode()` 會回傳一個 `dynamic`，這表示你無法在編譯時得知值的型別，只能在執行時期才知道。採用這種方式，會失去大部分靜態型別語言的特性：型別安全、自動補全，以及最重要的，編譯時期的例外檢查。你的程式碼將會變得更容易出錯。

舉例來說，當你存取 `name` 或 `email` 欄位時，很容易因為打錯字而產生錯誤。這種錯誤編譯器無法察覺，因為 JSON 是存在於 map 結構中。

### 在模型類別中序列化 JSON

為了解決上述問題，可以引入一個簡單的模型類別，在這個範例中稱為 `User`。在 `User` 類別中，你會看到：

* 一個 `User.fromJson()` 建構函式，用來從 map 結構建立新的 `User` 實例。
* 一個 `toJson()` 方法，將 `User` 實例轉換成 map。

使用這種方式，_呼叫端程式碼_ 可以享有型別安全、`name` 和 `email` 欄位的自動補全，以及編譯時期的例外檢查。如果你打錯字，或是把欄位當成 `int` 而不是 `String` 來處理，應用程式將無法編譯，而不是在執行時才發生錯誤。

**user.dart**

<?code-excerpt "lib/manual/user.dart"?>
```dart
class User {
  final String name;
  final String email;

  User(this.name, this.email);

  User.fromJson(Map<String, dynamic> json)
    : name = json['name'] as String,
      email = json['email'] as String;

  Map<String, dynamic> toJson() => {'name': name, 'email': email};
}
```

解碼邏輯的責任現在已經移到模型本身內部。採用這種新方法後，你可以更輕鬆地解碼一個使用者。

<?code-excerpt "lib/manual/main.dart (from-json)"?>
```dart
final userMap = jsonDecode(jsonString) as Map<String, dynamic>;
final user = User.fromJson(userMap);

print('Howdy, ${user.name}!');
print('We sent the verification link to ${user.email}.');
```

要編碼一個使用者，請將 `User` 物件傳遞給 `jsonEncode()` 函式。
你不需要呼叫 `toJson()` 方法，因為 `jsonEncode()`
已經幫你處理好了。

<?code-excerpt "lib/manual/main.dart (json-encode)" skip="1"?>
```dart
String json = jsonEncode(user);
```

使用這種方式，呼叫端的程式碼完全不需要擔心 JSON 序列化的問題。然而，模型類別本身仍然必須處理這部分。在正式的應用程式中，你會希望確保序列化功能能夠正確運作。實務上，`User.fromJson()` 和 `User.toJson()` 方法都需要有單元測試來驗證其正確行為。

:::note
Cookbook 中有[更完整的 JSON 模型類別範例][json background parsing]，示範如何使用 isolate 在背景執行緒解析 JSON 檔案。如果你需要在解碼 JSON 檔案時讓應用程式保持回應，這種做法非常理想。
:::

然而，實際情境往往沒那麼單純。有時候，JSON API 回應會更加複雜，例如包含巢狀的 JSON 物件，這些物件必須透過各自的模型類別來解析。

如果有工具能幫你自動處理 JSON 的編碼與解碼，那就太好了。幸運的是，確實有這樣的工具！

<a id="code-generation"></a>
## 使用程式碼產生器套件進行 JSON 序列化

雖然市面上有其他套件可用，本指南將使用 [`json_serializable`][`json_serializable`]，這是一個自動化的原始碼產生器，能為你自動產生 JSON 序列化的樣板程式碼。

:::note 選擇套件
你可能已經注意到在 pub.dev 上有兩個 [Flutter Favorite][Flutter Favorite] 套件可以產生 JSON 序列化程式碼，分別是 [`json_serializable`][`json_serializable`] 和 [`built_value`][`built_value`]。
那該如何選擇這些套件呢？
`json_serializable` 套件允許你透過註解讓一般類別具備可序列化的能力，而 `built_value` 套件則提供更高階的方式來定義不可變的值類別，這些類別同樣可以序列化為 JSON。
:::

由於序列化程式碼不再需要手動撰寫或維護，你可以大幅降低在執行階段遇到 JSON 序列化例外的風險。

### 在專案中設定 json_serializable

若要在你的專案中加入 `json_serializable`，你需要一個一般相依套件，以及兩個 _dev dependencies_（開發相依套件）。簡單來說，_dev dependencies_ 是不會被包含在應用程式原始碼中的相依套件——它們只在開發環境中使用。

要加入這些相依套件，請執行 `flutter pub add`：

```console
$ flutter pub add json_annotation dev:build_runner dev:json_serializable
```

在你的專案根目錄下執行 `flutter pub get`
（或在你的編輯器中點擊 **Packages get**），
即可讓這些新相依套件在你的專案中可用。

### 以 json_serializable 方式建立模型類別

以下說明如何將 `User` 類別轉換為
`json_serializable` 類別。為了簡化說明，
這段程式碼使用了前面範例中的簡化 JSON 模型。

**user.dart**

<?code-excerpt "lib/serializable/user.dart"?>
```dart
import 'package:json_annotation/json_annotation.dart';

/// This allows the `User` class to access private members in
/// the generated file. The value for this is *.g.dart, where
/// the star denotes the source file name.
part 'user.g.dart';

/// An annotation for the code generator to know that this class needs the
/// JSON serialization logic to be generated.
@JsonSerializable()
class User {
  User(this.name, this.email);

  String name;
  String email;

  /// A necessary factory constructor for creating a new User instance
  /// from a map. Pass the map to the generated `_$UserFromJson()` constructor.
  /// The constructor is named after the source class, in this case, User.
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  /// `toJson` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method `_$UserToJson`.
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

有了這樣的設定，原始碼產生器會自動產生從 JSON 編碼與解碼 `name` 和 `email` 欄位的程式碼。

如果有需要，也很容易自訂命名策略。
例如，若 API 回傳的物件使用的是 _snake_case_，而你希望在模型中使用 _lowerCamelCase_，你可以搭配 `@JsonKey` 註解與 name 參數來實現：

```dart
/// Tell json_serializable that "registration_date_millis" should be
/// mapped to this property.
@JsonKey(name: 'registration_date_millis')
final int registrationDateMillis;
```

建議伺服器與客戶端都遵循相同的命名策略。  
`@JsonSerializable()` 提供 `fieldRename` 列舉（enum），可將 Dart 欄位完全轉換為 JSON 鍵。

修改 `@JsonSerializable(fieldRename: FieldRename.snake)` 等同於
為每個欄位加上 `@JsonKey(name: '<snake_case>')`。

有時伺服器端資料不確定，因此在客戶端驗證與保護資料是必要的。  
其他常用的 `@JsonKey` 註解還包括： 

```dart
/// Tell json_serializable to use "defaultValue" if the JSON doesn't
/// contain this key or if the value is `null`.
@JsonKey(defaultValue: false)
final bool isAdult;

/// When `true` tell json_serializable that JSON must contain the key, 
/// If the key doesn't exist, an exception is thrown.
@JsonKey(required: true)
final String id;

/// When `true` tell json_serializable that generated code should 
/// ignore this field completely. 
@JsonKey(ignore: true)
final String verificationCode;
```

### 執行程式碼產生工具

當你第一次建立`json_serializable`類別時，
你會遇到類似以下的錯誤訊息：

```plaintext
Target of URI hasn't been generated: 'user.g.dart'.
```

這些錯誤完全是正常現象，原因只是因為模型類別的產生程式碼尚未建立。要解決這個問題，請執行程式碼產生器，以產生序列化所需的樣板程式碼。

有兩種方式可以執行程式碼產生器。

#### 一次性產生程式碼

在專案根目錄執行 `dart run build_runner build --delete-conflicting-outputs`，
即可在需要時為你的模型產生 JSON 序列化程式碼。
這會觸發一次性的建置，掃描原始檔案、挑選相關檔案，並為其產生必要的序列化程式碼。

雖然這樣很方便，但如果每次修改模型類別時都必須手動執行建置，會顯得有些麻煩。

#### 持續產生程式碼

_watcher_（監控器）讓我們的原始碼產生流程更加便利。它會監控專案檔案的變動，並在需要時自動建置必要的檔案。你可以在專案根目錄執行
`dart run build_runner watch --delete-conflicting-outputs` 來啟動 watcher。

你可以只啟動一次 watcher，並讓它在背景執行，這是安全的。

### 使用 json_serializable 模型

要以 `json_serializable` 方式解碼 JSON 字串，
其實不需要對我們先前的程式碼做任何修改。

<?code-excerpt "lib/serializable/main.dart (from-json)"?>
```dart
final userMap = jsonDecode(jsonString) as Map<String, dynamic>;
final user = User.fromJson(userMap);
```
編碼（encoding）也是一樣。呼叫的 API 與之前相同。

<?code-excerpt "lib/serializable/main.dart (json-encode)" skip="1"?>
```dart
String json = jsonEncode(user);
```

有了 `json_serializable`，
你可以不用再手動為 `User` 類別進行 JSON 序列化。
原始碼產生器會建立一個名為 `user.g.dart` 的檔案，
其中包含所有必要的序列化邏輯。
你不再需要撰寫自動化測試來確保
序列化功能正常運作——現在這已經是
_函式庫的責任_，確保序列化能夠正確執行。

## 為巢狀類別產生程式碼

有時你的程式碼會在一個類別中包含巢狀（nested）類別。
如果遇到這種情況，並且你嘗試將該類別以 JSON 格式
作為參數傳遞給某個服務（例如 Firebase），
你可能會遇到 `Invalid argument` 錯誤。

請參考以下的 `Address` 類別：

<?code-excerpt "lib/nested/address.dart"?>
```dart
import 'package:json_annotation/json_annotation.dart';
part 'address.g.dart';

@JsonSerializable()
class Address {
  String street;
  String city;

  Address(this.street, this.city);

  factory Address.fromJson(Map<String, dynamic> json) =>
      _$AddressFromJson(json);
  Map<String, dynamic> toJson() => _$AddressToJson(this);
}
```

`Address` 類別是巢狀在 `User` 類別中的：

<?code-excerpt "lib/nested/user.dart" replace="/explicitToJson: true//g"?>
```dart
import 'package:json_annotation/json_annotation.dart';

import 'address.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  User(this.name, this.address);

  String name;
  Address address;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

在終端機執行
`dart run build_runner build --delete-conflicting-outputs`
會產生
`*.g.dart` 檔案，但私有的 `_$UserToJson()` 函式
大致如下所示：

```dart
Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
  'name': instance.name,
  'address': instance.address,
};
```

現在看起來一切都沒問題，但如果你對 user 物件執行 print()：

<?code-excerpt "lib/nested/main.dart (print)"?>
```dart
Address address = Address('My st.', 'New York');
User user = User('John', address);
print(user.toJson());
```

結果如下：

```json
{name: John, address: Instance of 'address'}
```

你很可能想要的輸出結果如下：

```json
{name: John, address: {street: My st., city: New York}}
```

為了讓這項功能運作，請在類別宣告上方的 `@JsonSerializable()` 註解中傳入 `explicitToJson: true`。現在，`User` 類別如下所示：

<?code-excerpt "lib/nested/user.dart"?>
```dart
import 'package:json_annotation/json_annotation.dart';

import 'address.dart';

part 'user.g.dart';

@JsonSerializable(explicitToJson: true)
class User {
  User(this.name, this.address);

  String name;
  Address address;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

如需更多資訊，請參閱 [`explicitToJson`][`explicitToJson`]，該內容位於 [`json_annotation`][`json_annotation`] 套件的 [`JsonSerializable`][`JsonSerializable`] 類別中。

## 進一步參考

如需更多資訊，請參考以下資源：

* [`dart:convert`][`dart:convert`] 與 [`JsonCodec`][`JsonCodec`] 文件
* pub.dev 上的 [`json_serializable`][`json_serializable`] 套件
* GitHub 上的 [`json_serializable` 範例][`json_serializable` examples]
* [Dive into Dart's patterns and records][Dive into Dart's patterns and records] codelab
* 這份關於 [如何在 Dart/Flutter 中解析 JSON 的終極指南][how to parse JSON in Dart/Flutter]

[`built_value`]: {{site.pub}}/packages/built_value
[code generation libraries]: #code-generation
[`dart:convert`]: {{site.dart.api}}/dart-convert
[`explicitToJson`]: {{site.pub}}/documentation/json_annotation/latest/json_annotation/JsonSerializable/explicitToJson.html
[Flutter Favorite]: /packages-and-plugins/favorites
[json background parsing]: /cookbook/networking/background-parsing
[`JsonCodec`]: {{site.dart.api}}/dart-convert/JsonCodec-class.html
[`JsonSerializable`]: {{site.pub}}/documentation/json_annotation/latest/json_annotation/JsonSerializable-class.html
[`json_annotation`]: {{site.pub}}/packages/json_annotation
[`json_serializable`]: {{site.pub}}/packages/json_serializable
[`json_serializable` examples]: {{site.github}}/google/json_serializable.dart/blob/master/example/lib/example.dart
[pubspec file]: https://raw.githubusercontent.com/google/json_serializable.dart/master/example/pubspec.yaml
[reflection]: https://en.wikipedia.org/wiki/Reflection_(computer_programming)
[Serializing JSON manually using dart:convert]: #manual-encoding
[Serializing JSON using code generation libraries]: #code-generation
[tree shaking]: https://en.wikipedia.org/wiki/Tree_shaking
[Dive into Dart's patterns and records]: {{site.codelabs}}/codelabs/dart-patterns-records
[how to parse JSON in Dart/Flutter]: https://codewithandrea.com/articles/parse-json-dart/
