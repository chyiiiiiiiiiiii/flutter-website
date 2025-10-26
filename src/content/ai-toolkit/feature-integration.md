---
title: 功能整合
description: >
  如何與其他 Flutter 功能進行整合。
prev:
  title: 使用者體驗
  path: /ai-toolkit/user-experience
next:
  title: 自訂大型語言模型 (LLM) 供應商
  path: /ai-toolkit/custom-llm-providers
---

除了 [`LlmChatView`][`LlmChatView`] 自動提供的功能之外，
還有多個整合點可讓您的應用程式
與其他功能無縫結合，提供更多擴充能力：

* **歡迎訊息**：顯示給使用者的初始問候語。
* **建議提示**：提供預設提示，引導使用者互動。
* **系統指令**：為大型語言模型 (LLM) 提供特定輸入，以影響其回應。
* **停用附件與語音輸入**：移除聊天 UI 的選用部分。
* **管理取消或錯誤行為**：自訂使用者取消或 LLM 發生錯誤時的行為。
* **管理歷史紀錄**：每個 LLM 供應商都支援管理聊天歷史紀錄，
  這對於清除、動態變更或在不同工作階段間儲存歷史紀錄都很有用。
* **聊天序列化／反序列化**：在應用程式不同工作階段間儲存與讀取對話內容。
* **自訂回應元件 (Widgets)**：導入專屬的 UI 元件來呈現 LLM 回應。
* **自訂樣式**：定義獨特的視覺風格，讓聊天外觀與整體應用程式一致。
* **無 UI 聊天**：可直接與 LLM 供應商互動，不影響使用者目前的聊天工作階段。
* **自訂 LLM 供應商**：建立您自己的 LLM 供應商，將聊天整合至您的模型後端。
* **提示訊息重新導向**：可用於除錯、記錄或動態重新導向發送給供應商的訊息，以追蹤問題或動態路由提示。

[`LlmChatView`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html

## 歡迎訊息

聊天畫面允許您提供自訂歡迎訊息，
以便為使用者設定情境：

![範例歡迎訊息](/assets/images/docs/ai-toolkit/example-of-welcome-message.png)

您可以透過設定 `welcomeMessage` 參數，
在初始化 `LlmChatView` 時加入歡迎訊息：

```dart
class ChatPage extends StatelessWidget {
 const ChatPage({super.key});

 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: const Text(App.title)),
       body: LlmChatView(
         welcomeMessage: 'Hello and welcome to the Flutter AI Toolkit!',
         provider: GeminiProvider(
           model: GenerativeModel(
             model: 'gemini-2.0-flash',
             apiKey: geminiApiKey,
           ),
         ),
       ),
     );
}
```

若要查看設定歡迎訊息的完整範例，請參考 [welcome example][welcome example]。

[welcome example]: {{site.github}}/flutter/ai/blob/main/example/lib/welcome/welcome.dart

## 建議提示語

你可以提供一組建議提示語，讓使用者了解這個聊天會話已針對哪些用途進行最佳化：

![Example suggested prompts](/assets/images/docs/ai-toolkit/example-of-suggested-prompts.png)

這些建議僅會在沒有現有聊天紀錄時顯示。點擊其中一個建議會將文字複製到使用者的提示編輯區。若要設定建議清單，請使用 `LlmChatView` 並搭配 `suggestions` 參數來建構：

```dart
class ChatPage extends StatelessWidget {
 const ChatPage({super.key});

 @override
 Widget build(BuildContext context) => Scaffold(
       appBar: AppBar(title: const Text(App.title)),
       body: LlmChatView(
         suggestions: [
           'I\'m a Star Wars fan. What should I wear for Halloween?',
           'I\'m allergic to peanuts. What candy should I avoid at Halloween?',
           'What\'s the difference between a pumpkin and a squash?',
         ],
         provider: GeminiProvider(
           model: GenerativeModel(
             model: 'gemini-2.0-flash',
             apiKey: geminiApiKey,
           ),
         ),
       ),
     );
}
```

若要查看為使用者設定建議功能的完整範例，請參考 [suggestions example][suggestions example]。

[suggestions example]: {{site.github}}/flutter/ai/blob/main/example/lib/suggestions/suggestions.dart

## 大型語言模型 (LLM) 指令

為了根據您的應用程式需求最佳化大型語言模型 (LLM) 的回應，您需要為其提供指令。例如，[recipes example app][recipes example app] 會使用 `GenerativeModel` 類別的 `systemInstructions` 參數，來讓 LLM 根據使用者的指示專注於提供食譜內容：

```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => GeminiProvider(
      history: history,
        ...,
        model: GenerativeModel(
          model: 'gemini-2.0-flash',
          apiKey: geminiApiKey,
          ...,
          systemInstruction: Content.system('''
You are a helpful assistant that generates recipes based on the ingredients and 
instructions provided as well as my food preferences, which are as follows:
${Settings.foodPreferences.isEmpty ? 'I don\'t have any food preferences' : Settings.foodPreferences}

You should keep things casual and friendly. You may generate multiple recipes in a single response, but only if asked. ...
''',
          ),
        ),
      );
  ...
}
```

設定系統指令（system instructions）對每個提供者來說都是獨特的；  
`GeminiProvider` 和 `VertexProvider` 都允許你透過 `systemInstruction` 參數來提供這些指令。

請注意，在這個例子中，我們將使用者偏好設定納入  
傳遞給 `LlmChatView` 建構子的 大型語言模型 (LLM) 提供者的建立過程中。  
每當使用者變更偏好設定時，我們都會在建立過程中設定指令。  
這個食譜應用程式允許使用者透過 scaffold 上的抽屜（drawer）來變更食物偏好：

![Example of refining prompt](/assets/images/docs/ai-toolkit/setting-food-preferences.png)

每當使用者變更食物偏好時，  
食譜應用程式就會建立一個新的模型來套用新的偏好設定：

```dart
class _HomePageState extends State<HomePage> {
  ...
  void _onSettingsSave() => setState(() {
        // move the history over from the old provider to the new one
        final history = _provider.history.toList();
        _provider = _createProvider(history);
      });
}
```

## 停用附件與語音輸入

如果你希望停用附件（**+** 按鈕）或語音輸入（麥克風按鈕），
可以透過將 `enableAttachments` 和 `enableVoiceNotes` 參數
傳入 `LlmChatView` 建構子來達成：

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    // ...

    return Scaffold(
      appBar: AppBar(title: const Text('Restricted Chat')),
      body: LlmChatView(
        // ...
        enableAttachments: false,
        enableVoiceNotes: false,
      ),
    );
  }
}
```

這兩個旗標的預設值皆為 `true`。

## 管理取消或錯誤行為

預設情況下，當使用者取消大型語言模型 (LLM) 請求時，LLM 的回應會附加字串 "CANCEL"，並且會跳出訊息提示使用者已取消請求。同樣地，若發生 LLM 錯誤（例如網路連線中斷），LLM 的回應會附加字串 "ERROR"，並且會彈出包含錯誤詳細資訊的警示對話框。

你可以透過 `cancelMessage`、`errorMessage`、`onCancelCallback` 和 `onErrorCallback` 這些 `LlmChatView` 的參數來覆寫取消與錯誤行為。例如，下列程式碼會取代預設的取消處理行為：

```dart
class ChatPage extends StatelessWidget {
  // ...

  void _onCancel(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Chat cancelled')));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text(App.title)),
    body: LlmChatView(
      // ...
      onCancelCallback: _onCancel,
      cancelMessage: 'Request cancelled',
    ),
  );
}
```

你可以覆寫這些參數中的任意一個或全部，`LlmChatView` 會對你未覆寫的部分使用其預設值。

## 管理歷史紀錄

[定義所有可插入聊天視圖之大型語言模型 (LLM) 提供者的標準介面][providerIF]
包含了取得與設定該提供者歷史紀錄的能力：

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

[providerIF]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

當 provider 的歷史紀錄發生變化時，
它會呼叫由 `Listenable` 基底類別所公開的 `notifyListener` 方法。這表示你可以手動
透過 `add` 和 `remove` 方法來訂閱／取消訂閱，
或用來建立 `ListenableBuilder` 類別的實例。

`generateStream` 方法會呼叫底層的大型語言模型 (LLM)，
但不會影響歷史紀錄。而呼叫 `sendMessageStream`
方法則會在回應完成時，於 provider 的歷史紀錄中
新增兩則訊息——一則為使用者訊息，一則為 LLM 回應。聊天視圖在處理使用者聊天提示時會使用
`sendMessageStream`，在處理使用者語音輸入時則會使用
`generateStream`。

若要查看或設定歷史紀錄，你可以存取 `history` 屬性：

```dart
void _clearHistory() => _provider.history = [];
```

當你需要在重建 provider 並同時保留歷史紀錄時，能夠存取 provider 的歷史紀錄也非常有用：

```dart
class _HomePageState extends State<HomePage> {
  ...
  void _onSettingsSave() => setState(() {
        // move the history over from the old provider to the new one
        final history = _provider.history.toList();
        _provider = _createProvider(history);
      });
}
```

`_createProvider` 方法會建立一個新的 provider，這個 provider 同時保留了前一個 provider 的歷史紀錄，以及新的使用者偏好設定。  
對使用者來說，這個過程是無縫的；他們可以繼續對話，但現在大型語言模型 (LLM) 會根據他們新的飲食偏好來回應。  
例如：


```dart
class _HomePageState extends State<HomePage> {
  ...
  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) =>
    GeminiProvider(
      history: history,
      ...
    );
  ...
}
```

要實際體驗歷史紀錄功能，
請參考 [recipes example app][recipes example app] 和 [history example app][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart
[recipes example app]: {{site.github}}/flutter/ai/tree/main/example/lib/recipes

## 聊天序列化／反序列化

若要在應用程式的不同工作階段之間儲存與還原聊天歷史紀錄，
就需要具備序列化與反序列化每個使用者提示（包含附件）以及每個大型語言模型 (LLM) 回應的能力。這兩種類型的訊息
（使用者提示與 LLM 回應），
都會在 `ChatMessage` 類別中公開。
序列化可以透過每個 `ChatMessage` 實例的 `toJson`
方法來完成。

```dart
Future<void> _saveHistory() async {
  // get the latest history
  final history = _provider.history.toList();

  // write the new messages
  for (var i = 0; i != history.length; ++i) {
    // skip if the file already exists
    final file = await _messageFile(i);
    if (file.existsSync()) continue;

    // write the new message to disk
    final map = history[i].toJson();
    final json = JsonEncoder.withIndent('  ').convert(map);
    await file.writeAsString(json);
  }
}
```

同樣地，若要進行反序列化，請使用 `ChatMessage` 類別的靜態 `fromJson` 方法：

```dart
Future<void> _loadHistory() async {
  // read the history from disk
  final history = <ChatMessage>[];
  for (var i = 0;; ++i) {
    final file = await _messageFile(i);
    if (!file.existsSync()) break;

    final map = jsonDecode(await file.readAsString());
    history.add(ChatMessage.fromJson(map));
  }

  // set the history on the controller
  _provider.history = history;
}
```

為了確保序列化時能夠快速回應，我們建議每則使用者訊息只寫入一次。否則，使用者必須等待您的應用程式每次都重新寫入所有訊息，尤其在有二進位附件的情況下，這可能會花費較長時間。

若要查看實際運作方式，請參考 [history example app][history example app]。

[history example app]: {{site.github}}/flutter/ai/blob/main/example/lib/history/history.dart

## 自訂回應元件 (Custom response widgets)

預設情況下，聊天視圖所顯示的大型語言模型 (LLM) 回應會以 Markdown 格式呈現。然而，在某些情境下，您可能希望建立自訂元件 (Widget)，以顯示與您的應用程式高度整合且專屬的大型語言模型 (LLM) 回應。例如，當使用者在 [recipes example app][recipes example app] 中請求食譜時，LLM 回應會用來建立一個專門用於顯示食譜的元件 (Widget)，就像應用程式其他部分一樣，並且提供一個 **新增** 按鈕，讓使用者可以將食譜加入他們的資料庫：

![Add recipe button](/assets/images/docs/ai-toolkit/add-recipe-button.png)

這是透過在 `LlmChatView` 建構函式中設定 `responseBuilder` 參數來實現的：

```dart
LlmChatView(
  provider: _provider,
  welcomeMessage: _welcomeMessage,
  responseBuilder: (context, response) => RecipeResponseView(
    response,
  ),
),
```

在這個特定範例中，`RecipeReponseView`
元件（Widget）是以大型語言模型 (LLM) 提供者的回應文字來建構，
並利用該回應來實作其 `build` 方法：

```dart
class RecipeResponseView extends StatelessWidget {
  const RecipeResponseView(this.response, {super.key});
  final String response;

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    String? finalText;

    // created with the response from the LLM as the response streams in, so
    // many not be a complete response yet
    try {
      final map = jsonDecode(response);
      final recipesWithText = map['recipes'] as List<dynamic>;
      finalText = map['text'] as String?;

      for (final recipeWithText in recipesWithText) {
        // extract the text before the recipe
        final text = recipeWithText['text'] as String?;
        if (text != null && text.isNotEmpty) {
          children.add(MarkdownBody(data: text));
        }

        // extract the recipe
        final json = recipeWithText['recipe'] as Map<String, dynamic>;
        final recipe = Recipe.fromJson(json);
        children.add(const Gap(16));
        children.add(Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(recipe.title, style: Theme.of(context).textTheme.titleLarge),
            Text(recipe.description),
            RecipeContentView(recipe: recipe),
          ],
        ));

        // add a button to add the recipe to the list
        children.add(const Gap(16));
        children.add(OutlinedButton(
          onPressed: () => RecipeRepository.addNewRecipe(recipe),
          child: const Text('Add Recipe'),
        ));
        children.add(const Gap(16));
      }
    } catch (e) {
      debugPrint('Error parsing response: $e');
    }

    ...

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: children,
    );
  }
}
```

這段程式碼會解析文字，從大型語言模型（LLM）中擷取介紹文字與食譜，並將它們與一個 **Add Recipe** 按鈕一起打包，顯示在原本 Markdown 的位置。

請注意，我們是將 LLM 的回應內容作為 JSON 來解析。  
通常會將提供者設為 JSON 模式，並提供一個 schema（結構描述），以限制其回應格式，確保我們能夠解析出需要的內容。

每個提供者都以自己的方式提供這項功能，  
但 `GeminiProvider` 和 `VertexProvider` 這兩個類別，都能透過 `GenerationConfig` 物件來啟用這項功能，  
而食譜範例的用法如下所示：

```dart
class _HomePageState extends State<HomePage> {
  ...

  // create a new provider with the given history and the current settings
  LlmProvider _createProvider([List<ChatMessage>? history]) => GeminiProvider(
        ...
        model: GenerativeModel(
          ...
          generationConfig: GenerationConfig(
            responseMimeType: 'application/json',
            responseSchema: Schema(...),
          systemInstruction: Content.system('''
...
Generate each response in JSON format
with the following schema, including one or more "text" and "recipe" pairs as
well as any trailing text commentary you care to provide:

{
  "recipes": [
    {
      "text": "Any commentary you care to provide about the recipe.",
      "recipe":
      {
        "title": "Recipe Title",
        "description": "Recipe Description",
        "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        "instructions": ["Instruction 1", "Instruction 2", "Instruction 3"]
      }
    }
  ],
  "text": "any final commentary you care to provide",
}
''',
          ),
        ),
      );
  ...
}
```

這段程式碼會初始化 `GenerationConfig` 物件，
將 `responseMimeType` 參數設為 `'application/json'`，
並將 `responseSchema` 參數設為 `Schema` 類別的實例，
該類別定義了你準備解析的 JSON 結構。此外，
建議在系統指令中同時要求回傳 JSON，
並提供該 JSON schema 的描述——這裡我們已經這麼做了。

想要實際體驗，請參考 [recipes example app][recipes example app]。

## 自訂樣式

聊天視圖（chat view）預設提供了一組
背景、文字欄位（text field）、按鈕、圖示、建議等元件的樣式。
你可以透過在 `LlmChatView` 建構函式中設定 `style` 參數，
完全自訂這些樣式：

```dart
LlmChatView(
  provider: GeminiProvider(...),
  style: LlmChatViewStyle(...),
),
```

例如，[custom styles example app][custom-ex]
就利用這個功能實作了一個具有萬聖節主題的應用程式：

![Halloween-themed demo app](/assets/images/docs/ai-toolkit/demo-app.png)

若要查看`LlmChatViewStyle`類別中可用樣式的完整清單，請參閱[reference documentation][reference documentation]。
想要實際了解自訂樣式的運作方式，
除了可以參考[custom styles example][custom-ex]之外，
也可以參考[dark mode example][dark mode example]以及[demo app][demo app]。

[custom-ex]: {{site.github}}/flutter/ai/blob/main/example/lib/custom_styles/custom_styles.dart
[dark mode example]: {{site.github}}/flutter/ai/blob/main/example/lib/dark_mode/dark_mode.dart
[demo app]: {{site.github}}/flutter/ai#online-demo
[reference documentation]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatViewStyle-class.html

## 無 UI 的聊天功能

你不一定要使用聊天視圖（chat view）來存取底層提供者的功能。
除了可以直接透過其專屬介面呼叫之外，
你也可以搭配[LlmProvider interface][LlmProvider interface]來使用。

[LlmProvider interface]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmProvider-class.html

舉例來說，recipes example app 在編輯食譜頁面上提供了一個
Magic 按鈕。這個按鈕的目的是根據你目前的飲食偏好，
更新資料庫中的現有食譜。
按下這個按鈕後，你可以預覽推薦的變更內容，
並決定是否要套用這些變更：

![User decides whether to update recipe in database](/assets/images/docs/ai-toolkit/apply-changes-decision.png)

與應用程式聊天區塊所使用的 provider 不同，
如果直接用同一個 provider，會將多餘的使用者訊息與
大型語言模型 (LLM) 回應插入使用者的聊天記錄中，
因此 Edit Recipe 頁面會建立自己的 provider，
並直接加以使用：

```dart
class _EditRecipePageState extends State<EditRecipePage> {
  ...
  final _provider = GeminiProvider(...);
  ...
  Future<void> _onMagic() async {
    final stream = _provider.sendMessageStream(
      'Generate a modified version of this recipe based on my food preferences: '
      '${_ingredientsController.text}\n\n${_instructionsController.text}',
    );
    var response = await stream.join();
    final json = jsonDecode(response);

    try {
      final modifications = json['modifications'];
      final recipe = Recipe.fromJson(json['recipe']);

      if (!context.mounted) return;
      final accept = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(recipe.title),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Modifications:'),
              const Gap(16),
              Text(_wrapText(modifications)),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => context.pop(true),
              child: const Text('Accept'),
            ),
            TextButton(
              onPressed: () => context.pop(false),
              child: const Text('Reject'),
            ),
          ],
        ),
      );
      ...
    } catch (ex) {
      ...
      }
    }
  }
}
```

對 `sendMessageStream` 的呼叫會在提供者（provider）的歷史紀錄中建立條目，但由於這些條目沒有與聊天檢視（chat view）關聯，因此不會顯示出來。如果方便的話，你也可以透過呼叫 `generateStream` 來達到相同的效果，這樣可以重複使用現有的 provider，同時不會影響聊天歷史紀錄。

若想實際了解其運作方式，請參考 recipes 範例中的 [Edit Recipe page][Edit Recipe page]。

[Edit Recipe page]: {{site.github}}/flutter/ai/blob/main/example/lib/recipes/pages/edit_recipe_page.dart

## 重新導向提示（Rerouting prompts）

如果你希望除錯、記錄或操作聊天檢視（chat view）與底層 provider 之間的連線，可以實作一個 [`LlmStreamGenerator`][`LlmStreamGenerator`] 函式來達成。然後，將該函式傳遞給 `LlmChatView` 的 `messageSender` 參數：

[`LlmStreamGenerator`]: {{site.pub-api}}/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmStreamGenerator.html

```dart
class ChatPage extends StatelessWidget {
  final _provider = GeminiProvider(...);

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text(App.title)),
      body: LlmChatView(
        provider: _provider,
        messageSender: _logMessage,
      ),
    );

  Stream<String> _logMessage(
    String prompt, {
    required Iterable<Attachment> attachments,
  }) async* {
    // log the message and attachments
    debugPrint('# Sending Message');
    debugPrint('## Prompt\n$prompt');
    debugPrint('## Attachments\n${attachments.map((a) => a.toString())}');

    // forward the message on to the provider
    final response = _provider.sendMessageStream(
      prompt,
      attachments: attachments,
    );

    // log the response
    final text = await response.join();
    debugPrint('## Response\n$text');

    // return it
    yield text;
  }
}
```

此範例會記錄使用者提示與大型語言模型 (LLM) 回應的來回過程。當你將函式作為`messageSender`提供時，你需要自行呼叫底層的服務提供者。如果你沒有這麼做，訊息將不會被傳遞。這項能力讓你可以進行更進階的操作，例如動態路由到不同的服務提供者，或實作檢索增強生成（Retrieval Augmented Generation, RAG）。

若想實際體驗，請參考 [logging example app][logging example app]。

[logging example app]: {{site.github}}/flutter/ai/blob/main/example/lib/logging/logging.dart 
