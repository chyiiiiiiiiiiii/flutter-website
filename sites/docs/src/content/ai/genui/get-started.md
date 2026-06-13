--- 
title: 開始使用 Flutter 的 GenUI SDK
sidenav: ai
shortTitle: 開始使用 GenUI SDK
breadcrumb: Get started
description: >-
  了解如何使用 Flutter 的 GenUI SDK，並將其加入
  現有的 Flutter 應用程式。
next:
  title: Input and events
  path: /ai/genui/input-events
prev:
  title: GenUI SDK main components & concepts
  path: /ai/genui/components
---

本指南說明如何開始使用 Flutter 的 GenUI SDK 及其系列套件。
SDK 的主要元件 (Widget) 說明請參閱[主要元件][]頁面。

:::experimental
`genui` 套件目前處於 alpha 階段，可能會有所變動。
:::

請依照下列說明將 [`genui`][] 加入您的 Flutter 應用程式。
程式碼範例示範如何在透過執行 [`flutter create`][] 建立的全新應用程式上進行操作，
但您也可以依照相同步驟操作現有的 Flutter 應用程式。

[`genui`]: {{site.pub-pkg}}/genui
[主要元件]: /ai/genui/components
[`flutter create`]: /reference/create-new-app

## 設定您的代理提供者

`genui` 套件可連接至多種代理提供者。
可用的提供者包括：

**Firebase AI Logic**
: 適用於所有與 LLM 互動皆在 Flutter 用戶端進行、無需伺服器的正式版應用程式。
  Firebase 也讓您能更安全地發布 AI 功能，因為 Firebase 會負責管理您的 Gemini API 金鑰。

**GenUI A2UI**
: 適用於代理在伺服器上執行的用戶端/伺服器架構。

**自行建置**
: 您也可以自行建置轉接器，以連接您偏好的 LLM 提供者。
  期待我們與社群很快帶來更多選項。

<Tabs key="agent-provider" wrapped="true">

<Tab name="Firebase AI Logic">

若要使用 Firebase 的 Vertex AI SDK 連接至 Gemini，請依照下列說明操作：

 1. 使用 Firebase 主控台[建立新的 Firebase 專案][]。

 2. 為該專案[啟用 Gemini API][]。

 3. 依照 [Firebase 的 Flutter 設定指南][]中的前三個步驟，將 Firebase 加入您的應用程式。

 4. 使用 `dart pub add` 將 `genui` 和 `firebase_vertex_ai` 新增為
    `pubspec.yaml` 檔案中的相依套件：

    ```console
    $ dart pub add genui firebase_vertex_ai
    ```

 5. 在應用程式的 `main` 方法中，確保已初始化 Widget 框架繫結（WidgetsFlutterBinding），然後初始化 Firebase：

    ```dart
    import 'package:flutter/material.dart';
    import 'package:firebase_core/firebase_core.dart';
    import 'firebase_options.dart';

    void main() async {
      WidgetsFlutterBinding.ensureInitialized();
      await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform,
      );
      runApp(const MyApp());
    }
    ```

 6. 建立 Firebase 的 Vertex AI 生成模型執行個體，並以
    `SurfaceController` 和 `A2uiTransportAdapter` 包裝：

    ```dart
    import 'package:genui/genui.dart';
    import 'package:firebase_vertex_ai/firebase_vertex_ai.dart';

    final catalog = Catalog(components: [
      // ...
    ]);
    final catalogs = [catalog];

    final surfaceController = SurfaceController(catalogs: catalogs);
    
    final promptBuilder = PromptBuilder.chat(
      catalog: catalog,
      systemPromptFragments: ['You are a helpful assistant.'],
    );

    final model = FirebaseVertexAI.instance.generativeModel(
      model: 'gemini-2.5-flash',
      systemInstruction: Content.system(promptBuilder.systemPromptJoined()),
    );

    // The Conversation wires transport -> controller internally.
    late final A2uiTransportAdapter transportAdapter;
    transportAdapter = A2uiTransportAdapter(onSend: (message) async {
      // final stream = model.generateContentStream(...);
      // await for (final chunk in stream) {
      //   transportAdapter.addChunk(chunk.text ?? '');
      // }
    });

    final conversation = Conversation(
      controller: surfaceController,
      transport: transportAdapter,
    );
    ```

[建立新的 Firebase 專案]: https://support.google.com/appsheet/answer/10104995
[啟用 Gemini API]: https://firebase.google.com/docs/gemini-in-firebase/set-up-gemini
[Firebase 的 Flutter 設定指南]: https://firebase.google.com/docs/flutter/setup
[`firebase_ai_logic`]: {{site.pub-pkg}}/firebase_ai_logic

</Tab>

<Tab name="GenUI A2UI">

這是 [`genui`][] 與 [A2UI 串流 UI 協定][A2UI Streaming UI Protocol] 的整合套件。
此套件可讓 Flutter 應用程式連接至 Agent-to-Agent (A2UI)
伺服器，並使用 `genui` 框架渲染由 AI 代理生成的動態使用者介面。

此套件的主要元件包括：

* `A2uiAgentConnector`：
  處理與 A2A 伺服器的底層 web socket 通訊，
  包括傳送訊息及解析串流事件。
* `AgentCard`：
  儲存已連接 AI 代理中繼資料的資料類別。

請依照下列說明操作：

 1. 設定相依套件：
    使用 `dart pub add` 將 `genui`、`genui_a2a` 及 `a2a` 新增為
    `pubspec.yaml` 檔案中的相依套件。

    ```console
    $ dart pub add genui genui_a2a a2a
    ```

 2. 初始化 `SurfaceController`：
    以您的元件 (Widget) `Catalog` 設定 `SurfaceController`。

 3. 建立 `A2uiTransportAdapter`：
    實例化 `A2uiTransportAdapter` 以解析訊息。

 4. 建立 `A2uiAgentConnector`：
    實例化 `A2uiAgentConnector`，並提供 A2A 伺服器 URI。

 5. 建立 `Conversation`：
    將轉接器和控制器傳入 `Conversation`。

 6. 使用 `Surface` 渲染：
    在 UI 中使用 `Surface` 元件 (Widget) 來顯示
    代理生成的內容。

 7. 傳送訊息：
    使用 `connector.connectAndSend` 或 `Conversation.sendMessage` 將使用者輸入
    傳送至代理生成的內容。

    ```dart
    import 'package:flutter/material.dart';
    import 'package:genui/genui.dart';
    import 'package:genui_a2a/genui_a2a.dart';
    import 'package:logging/logging.dart';

    void main() {
      // Setup logging.
      Logger.root.level = Level.ALL;
      Logger.root.onRecord.listen((record) {
        print('${record.level.name}: ${record.time}: ${record.message}');
        if (record.error != null) {
          print(record.error);
        }
        if (record.stackTrace != null) {
          print(record.stackTrace);
        }
      });

      runApp(const GenUIExampleApp());
    }

    class GenUIExampleApp extends StatelessWidget {
      const GenUIExampleApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'A2UI Example',
          theme: ThemeData(
            primarySwatch: Colors.blue,
          ),
          home: const ChatScreen(),
        );
      }
    }

    class ChatScreen extends StatefulWidget {
      const ChatScreen({super.key});

      @override
      State<ChatScreen> createState() => _ChatScreenState();
    }

    class _ChatScreenState extends State<ChatScreen> {
      final TextEditingController _textController = TextEditingController();
      final SurfaceController _surfaceController =
          SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);
      late final A2uiTransportAdapter _transportAdapter;
      late final Conversation _uiAgent;
      late final A2uiAgentConnector _connector;
      final List<ChatMessage> _messages = [];

      @override
      void initState() {
        super.initState();
        
        // The Conversation wires transport -> controller internally.
        _transportAdapter = A2uiTransportAdapter(onSend: (message) async {
          // Implement sending to LLM if needed, or handled by connector
        });
        
        _connector = A2uiAgentConnector(
          // TODO: Replace with your A2A server URL.
          url: Uri.parse('http://localhost:8080'),
        );
        _uiAgent = Conversation(
          controller: _surfaceController,
          transport: _transportAdapter,
        );

        // Listen for messages from the remote agent.
        _connector.stream.listen(_surfaceController.handleMessage);

      }

      @override
      void dispose() {
        _textController.dispose();
        _uiAgent.dispose();
        _transportAdapter.dispose();
        _surfaceController.dispose();
        _connector.dispose();
        super.dispose();
      }

      void _handleSubmitted(String text) async {
        if (text.isEmpty) return;
        _textController.clear();
        final message = ChatMessage.user(TextPart(text));
        setState(() {
          _messages.insert(0, message);
        });
        
        final responseText = await _connector.connectAndSend(
            message,
            clientCapabilities: A2uiClientCapabilities(supportedProtocols: ['a2ui/0.9.0'])
        );
        
        // Handling response depends on your app's logic
      }

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('A2UI Example'),
          ),
          body: Column(
            children: <Widget>[
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(8.0),
                  reverse: true,
                  itemBuilder: (_, int index) =>
                      _buildMessage(_messages[index]),
                  itemCount: _messages.length,
                ),
              ),
              const Divider(height: 1.0),
              Container(
                decoration: BoxDecoration(color: Theme.of(context).cardColor),
                child: _buildTextComposer(),
              ),
              // Surface for the main AI-generated UI:
              SizedBox(
                height: 300,
                child: Surface(
                  surfaceController: _surfaceController,
                  surfaceId: 'main_surface',
                ),
              ),
            ],
          ),
        );
      }

      Widget _buildMessage(ChatMessage message) {
        return Container(
          margin: const EdgeInsets.symmetric(vertical: 10.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(right: 16.0),
                child: CircleAvatar(child: Text(message.role == Role.user ? 'U' : 'A')),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(message.role == Role.user ? 'User' : 'Agent',
                        style: const TextStyle(fontWeight: FontWeight.bold)),
                    Container(
                      margin: const EdgeInsets.only(top: 5.0),
                      child: Text(message.parts.whereType<TextPart>().map((e) => e.text).join('\n')),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }

      Widget _buildTextComposer() {
        return IconTheme(
          data: IconThemeData(color: Theme.of(context).colorScheme.secondary),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              children: <Widget>[
                Flexible(
                  child: TextField(
                    controller: _textController,
                    onSubmitted: _handleSubmitted,
                    decoration:
                        const InputDecoration.collapsed(hintText: 'Send a message'),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4.0),
                  child: IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: () => _handleSubmitted(_textController.text),
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }
    ```

pub.dev 上的 [example][] 目錄包含示範如何使用此套件的完整應用程式。

[example]: {{site.pub-pkg}}/genui_a2a/example
[A2UI Streaming UI Protocol]: https://a2ui.org/

</Tab>

<Tab name="Build your own">

若要將 `genui` 與其他代理提供者搭配使用，
請依照該提供者的 SDK 文件實作連線，
並將其結果串流至 `A2uiTransportAdapter`。

:::warning
`PromptBuilder.chat()` 生成的系統提示可能長達
**3,000–5,000+ 個 token**，可能超過
裝置端或小型模型的上下文視窗。
若您的目標是裝置端 LLM，請考慮：

- 撰寫只涵蓋 A2UI `createSurface` 到 `updateComponents` 流程的精簡自訂系統提示。
- 使用 `systemPromptFragments`，只傳入您的使用案例所需的 schema 部分。
:::

</Tab>

</Tabs>

## 建立與代理的連線

若您要為 iOS 或 macOS 建置 Flutter 專案，
請在 `{ios,macos}/Runner/*.entitlements` 檔案中加入下列金鑰，
以啟用對外網路請求：

```xml
<dict>
...
<key>com.apple.security.network.client</key>
<true/>
</dict>
```

接下來，請依照下列說明將您的應用程式連接至所選的代理提供者。

 1. 建立 `SurfaceController`，並提供您要讓代理使用的元件 (Widget) 目錄 (catalog)。
    建立 `A2uiTransportAdapter` 以解析訊息並與其連接。

 2. 建立 `PromptBuilder`，並提供系統指令及工具（您希望代理能夠呼叫的函式）。
    您應始終包含 `SurfaceController` 提供的工具，但也可以自行加入其他工具。
    將此內容加入您的 LLM 系統提示。

 3. 使用 `SurfaceController` 和 `A2uiTransportAdapter` 的執行個體建立 `Conversation`。
    您的應用程式主要透過此物件完成各項操作。

    範例：

    ```dart
    class _MyHomePageState extends State<MyHomePage> {
      late final SurfaceController _surfaceController;
      late final A2uiTransportAdapter _transportAdapter;
      late final Conversation _conversation;

      @override
      void initState() {
        super.initState();

        // Create a SurfaceController with a widget catalog.
        // The BasicCatalogItems contain basic widgets for text, markdown, and images.
        _surfaceController = SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);

        // The Conversation wires transport -> controller internally.
        _transportAdapter = A2uiTransportAdapter(onSend: (message) async {
          // Implement sending to LLM and pipe chunks back.
        });

        final catalog = BasicCatalogItems.asCatalog();
        final promptBuilder = PromptBuilder.chat(
          catalog: catalog,
          systemPromptFragments: [
            '''
            You are an expert in creating funny riddles. Every time I give you a word,
            you should generate UI that displays one new riddle related to that word.
            Each riddle should have both a question and an answer.
            '''
          ],
        );

        // ... initialize your LLM Client of choice using promptBuilder.systemPromptJoined()

        // Create the Conversation to orchestrate everything.
        _conversation = Conversation(
          controller: _surfaceController,
          transport: _transportAdapter,
        );
        
        // Listen for surface lifecycle events:
        _conversation.events.listen((event) {
          if (event is ConversationSurfaceAdded) {
            _onSurfaceAdded(event);
          } else if (event is ConversationSurfaceRemoved) {
            _onSurfaceDeleted(event);
          }
        });
      }

      @override
      void dispose() {
        _textController.dispose();
        _conversation.dispose();
        _transportAdapter.dispose();
    
        super.dispose();
      }
    }
    ```
   
## 傳送訊息並顯示代理的回應

使用 `Conversation` 類別中的 `sendRequest` 方法傳送請求至代理，
或直接串流至您的 LLM 用戶端，
並使用 `_transportAdapter.addChunk` 將結果串流傳至轉接器。

若要接收並顯示生成的 UI：

  1. 監聽 `Conversation` 中的 `events` 串流，以追蹤 UI 表面 (surface) 的新增與移除。
     這些事件會為每個表面包含一個 _surface ID_。

  2. 使用上一步驟接收到的 surface ID，為每個活躍表面建置 `Surface` 元件 (Widget)。

     範例：

     ```dart
     class _MyHomePageState extends State<MyHomePage> {
       // ...

       final _textController = TextEditingController();
       final _surfaceIds = <String>[];

       // Send a request containing the user's [text] to the agent.
       void _sendMessage(String text) async {
         if (text.trim().isEmpty) return;
         // await _conversation.sendRequest(ChatMessage.user(TextPart(text)));
       }

       // Invoked by the events stream listener when a new
       // UI surface is generated. Here, the ID is stored so the
       // build method can create a Surface to display it.
       void _onSurfaceAdded(ConversationSurfaceAdded update) {
         setState(() {
           _surfaceIds.add(update.surfaceId);
         });
       }

       // Invoked by the events stream listener when a UI surface is removed.
       void _onSurfaceDeleted(ConversationSurfaceRemoved update) {
         setState(() {
           _surfaceIds.remove(update.surfaceId);
         });
       }

       @override
       Widget build(BuildContext context) {
         return Scaffold(
           appBar: AppBar(
             backgroundColor: Theme.of(context).colorScheme.inversePrimary,
             title: Text(widget.title),
           ),
           body: Column(
             children: [
               Expanded(
                 child: ListView.builder(
                   itemCount: _surfaceIds.length,
                   itemBuilder: (context, index) {
                     // For each surface, create a Surface to display it.
                     final id = _surfaceIds[index];
                     return Surface(surfaceContext: _surfaceController.contextFor(id));
                   },
                 ),
               ),
               SafeArea(
                 child: Padding(
                   padding: const EdgeInsets.symmetric(horizontal: 16.0),
                   child: Row(
                     children: [
                       Expanded(
                         child: TextField(
                           controller: _textController,
                           decoration: const InputDecoration(
                             hintText: 'Enter a message',
                           ),
                         ),
                       ),
                       const SizedBox(width: 16),
                       ElevatedButton(
                         onPressed: () {
                           // Send the user's text to the agent.
                           _sendMessage(_textController.text);
                           _textController.clear();
                         },
                         child: const Text('Send'),
                       ),
                     ],
                   ),
                 ),
               ),
             ],
           ),
         );
       }
     }
     ```

## 將自訂元件加入目錄 {:#custom-widgets}

為了方便起見，您可以使用提供的核心元件 (Widget) 目錄。
不過，大多數正式版應用程式都會想要定義自訂元件目錄。

若要加入自訂元件，請依照下列說明操作。

 1. 相依於 `json_schema_builder` 套件

    使用 `dart pub add` 將 `json_schema_builder` 新增為
    `pubspec.yaml` 檔案中的相依套件：
   
    ```console
    $ dart pub add json_schema_builder
    ```

 2. 建立新元件的 schema

    每個目錄項目都需要一個 schema 來定義填入所需的資料。
    使用 `json_schema_builder` 套件，為新元件定義 schema。

    ```dart
    import 'package:json_schema_builder/json_schema_builder.dart';
    import 'package:flutter/material.dart';
    import 'package:genui/genui.dart';

    final _schema = S.object(
      properties: {
        'question': S.string(description: 'The question part of a riddle.'),
        'answer': S.string(description: 'The answer part of a riddle.'),
      },
      required: ['question', 'answer'],
    );
    ```

 3. 建立 `CatalogItem`

    每個 `CatalogItem` 代表代理被允許生成的一種元件 (Widget) 類型。
    為此，它結合了名稱、schema，以及產生組成生成 UI 之元件的建置函式。

    ```dart
    final riddleCard = CatalogItem(
      name: 'RiddleCard',
      dataSchema: _schema,
      widgetBuilder:
          ({
            required data,
            required id,
            required buildChild,
            required dispatchEvent,
            required context,
            required dataContext,
          }) {
            final json = data as Map<String, Object?>;
            final question = json['question'] as String;
            final answer = json['answer'] as String;

            return Container(
              constraints: const BoxConstraints(maxWidth: 400),
              decoration: BoxDecoration(border: Border.all()),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(question, style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(height: 8.0),
                  Text(answer, style: Theme.of(context).textTheme.headlineSmall),
                ],
              ),
            );
          },
    );
    ```

 4. 將 `CatalogItem` 加入目錄

     在實例化 `SurfaceController` 時，加入您的目錄項目。

    ```dart
    _surfaceController = SurfaceController(
      catalogs: [BasicCatalogItems.asCatalog().copyWith([riddleCard])],
    );
    ```

 5. 更新系統指令以使用新元件

    為了確保代理知道要使用您的新元件，
    請在系統指令中告知使用方式與時機。
    執行時請提供 `CatalogItem` 中的名稱。

    ```dart
    final promptBuilder = PromptBuilder.chat(
      catalog: catalog,
      systemPromptFragments: [
        '''
        You are an expert in creating funny riddles. Every time I give you a word,
        generate a RiddleCard that displays one new riddle related to that word.
        Each riddle should have both a question and an answer.
        '''
      ],
    );
    
    // Pass promptBuilder.systemPromptJoined() to your LLM Config
    ```

{:.steps}

## 資料模型與資料繫結

`genui` 的核心概念是 `DataModel`，這是一個集中式、
可觀測的存放區，用於儲存所有動態 UI 狀態 (state)。
每個元件的狀態不由自身管理，而是儲存在 `DataModel` 中。

元件 (Widget) 會與此模型中的資料進行_繫結_。
當模型中的資料變更時，只有相依於該特定資料的元件才會重新建置 (rebuild)。
這是透過傳遞給每個元件建置函式的 `DataContext` 物件來實現的。

### 繫結至資料模型

若要將元件的屬性繫結至資料模型，
請在 AI 傳送的資料中指定一個特殊的 JSON 物件。
此物件可包含標準 JSON 基本型別（用於靜態值），
或含有 `path` 屬性的物件（用於繫結至資料模型中的值）。

舉例來說，若要在 `Text` 元件中顯示使用者名稱，AI 會生成：

```json
{
  "component": "Text",
  "text": "Welcome to GenUI",
  "variant": "h1"
}
```

### 圖片

```json
{
  "component": "Image",
  "url": "https://example.com/image.png",
  "variant": "mediumFeature"
}
```

### 更新資料模型

輸入元件（例如 `TextField`）會直接更新 DataModel。
當使用者在繫結至 `/user/name` 的文字欄位中輸入內容時，
`DataModel` 會更新，任何繫結至相同路徑的其他元件
都會自動重新建置以顯示新值。

這種反應式資料流簡化了狀態管理 (state management)，並在
使用者、UI 與 AI 之間建立了強大的高頻寬互動迴圈。

## 後續步驟

請參閱 `genui` 儲存庫中包含的[範例][]。
[旅遊應用程式][travel app]示範如何定義代理可用於生成特定領域 UI 的自訂元件目錄。

若有任何不清楚或遺漏之處，請[建立 issue][]。

[範例]: {{site.repo.organization}}/genui/blob/main/examples
[travel app]: {{site.repo.organization}}/genui/blob/main/examples/travel_app
[建立 issue]: {{site.repo.organization}}/genui/issues/new/choose

## 系統指令

`genui` 套件提供 LLM 一組可用於生成 UI 的工具。
若要讓 LLM 使用這些工具，
透過 `PromptBuilder` 提供的系統指令必須
明確告知它這樣做。

這就是為什麼[先前的範例][instruction-example]包含
代理的系統指令，其中有「每當我給您一個單字時，您應生成顯示...的 UI」這一行：

```dart highlightLines=4-5
final promptBuilder = PromptBuilder.chat(
  catalog: catalog,
  instructions: '''
    You are an expert in creating funny riddles.
    Every time I give you a word, you should generate UI that
    displays one new riddle related to that word.
    Each riddle should have both a question and an answer.
    ''',
);
```

[instruction-example]: /ai/genui/get-started#create-the-connection-to-an-agent

## 疑難排解/常見問題 {:#troubleshoot}

### 如何設定記錄 (logging)？

若要觀察應用程式與代理之間的通訊，
請在 `main` 方法中啟用記錄。

```dart
import 'package:logging/logging.dart';
import 'package:genui/genui.dart';

final logger = configureGenUiLogging(level: Level.ALL);

void main() async {
  logger.onRecord.listen((record) {
    debugPrint('${record.loggerName}: ${record.message}');
  });

  // Additional initialization of bindings and Firebase.
}
```

### 我在 macOS/iOS 最低版本方面遇到錯誤。

Firebase 對 Apple 平台有[最低版本需求][]，
可能高於 Flutter 的預設值。
請檢查您的 `Podfile`（iOS 用）和 `CMakeLists.txt`（macOS 用），
確保目標版本符合或超過 Firebase 的需求。

[建立新的 Firebase 專案]: https://support.google.com/appsheet/answer/10104995
[建立 issue]: {{site.repo.organization}}/genui/issues/new/choose
[啟用 Gemini API]: https://firebase.google.com/docs/gemini-in-firebase/set-up-gemini
[範例]: {{site.repo.organization}}/genui/blob/main/examples
[Firebase 的 Flutter 設定指南]: https://firebase.google.com/docs/flutter/setup
[`genui`]: {{site.pub-pkg}}/genui
[最低版本需求]: https://firebase.google.com/support/release-notes/ios
