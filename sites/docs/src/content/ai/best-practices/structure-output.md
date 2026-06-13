---
title: 結構化輸入與輸出
sidenav: ai
description: >
  瞭解如何使用結構化輸入與輸出 schema，以從 LLM 取得可靠、
  可解析的 JSON 資料。
prev:
  title: Prompting
  path: /ai/best-practices/prompting
next:
  title: Tool calls (aka function calls)
  path: /ai/best-practices/tool-calls
---


在針對 LLM 撰寫程式時，你會希望提供明確的輸入，並取得明確的輸出。

### 結構化輸入 {:#structured-input}

作為輸入，LLM 幾乎可以接受任何能以文字呈現的內容。這包含自由格式文字與半結構化文字（例如 Markdown），也包含 CSV、JSON 和 XML 等結構化格式。如果你的資料本身具有結構，請以該結構來格式化資料，LLM 就能給你更好的結果。

除了結構化文字輸入之外，你也可以傳入二進位資料，例如圖片或 PDF。在範例應用程式中，該應用程式會將填字遊戲的截圖傳給 Gemini，讓它推斷格線資料：

```dart
final imageParts = <Part>[];
for (final image in images) {
  final imageBytes = await image.readAsBytes();
  final mimeType = lookupMimeType(image.path, headerBytes: imageBytes)!;
  imageParts.add(InlineDataPart(mimeType, imageBytes));
}

final content = [
  Content.multi([
    TextPart(_crosswordPrompt),
    ...imageParts,
  ]),
];

final response = await _crosswordModel.generateContent(content);
...
```

這段程式碼會將提示與圖片作為同一個請求的一部分傳給 Gemini。

### 結構化輸出 {:#structured-output}

相較於結構化輸入，LLM 在結構化輸出方面可能更加困難。當你要求模型輸出 JSON 時，必須表達得清楚且完整，才能確保你拿到的資料在應用程式中可以被可靠地解析。

首先，在初始化模型實例時傳入你預期的輸出格式：

```dart
// the schema for the clue solver output
static final _crosswordSchema = Schema(
  SchemaType.object,
  properties: {
    'width': Schema(SchemaType.integer),
    'height': Schema(SchemaType.integer),
    'grid': Schema(
      SchemaType.array,
      items: Schema(
        SchemaType.array,
        items: Schema(
          SchemaType.object,
          properties: {
            'color': Schema(SchemaType.string),
            'clueNumber': Schema(SchemaType.integer, nullable: true),
          },
        ),
      ),
    ),
    'clues': Schema(
      SchemaType.object,
      properties: {
        'across': Schema(
          SchemaType.array,
          items: Schema(
            SchemaType.object,
            properties: {
              'number': Schema(SchemaType.integer),
              'text': Schema(SchemaType.string),
            },
          ),
        ),
        'down': Schema(
          SchemaType.array,
          items: Schema(
            SchemaType.object,
            properties: {
              'number': Schema(SchemaType.integer),
              'text': Schema(SchemaType.string),
            },
          ),
        ),
      },
    ),
  },
);

// The model for inferring crossword data from images.
_crosswordModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-pro',
  generationConfig: GenerationConfig(
    responseMimeType: 'application/json',
    responseSchema: _crosswordSchema,
  ),
);
```

雖然這樣或許已經足夠，但若同時在系統指令中指定輸出 schema，通常能獲得最可靠的結果：

```dart
final _crosswordPrompt =
'''
Analyze the following crossword puzzle images and return a JSON object
representing the grid size, contents, and clues. The images may contain
different parts of the same puzzle (e.g., the grid the across clues, the down
clues). Combine them to form a complete puzzle.

The JSON schema is as follows: ${jsonEncode(_crosswordSchema.toJson())}
'''
```

現在你就可以將模型回傳的文字解析為 JSON：

```dart
final response = await _crosswordModel.generateContent(content);

final json = jsonDecode(response.text!);
final width = json['width'] as int;
final height = json['height'] as int;
final gridData = json['grid'] as List;
final cluesData = json['clues'] as Map<String, dynamic>;
...
```

來自模型的可靠 JSON 輸出，正是讓你能夠將 AI 整合進應用程式的關鍵所在。資料的內容不一定完全正確，但至少會以你的應用程式可以處理的格式呈現。
