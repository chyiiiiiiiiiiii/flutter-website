# 輸入與事件

> 如何在 GenUI 應用程式中處理輸入與事件。



本指南說明使用者互動在 GenUI 套件中的處理方式，從最初的元件 (Widget) 互動，到 AI agent 接收事件的完整流程。

:::experimental
`genui` 套件目前處於 alpha 階段，未來可能有所變動。
:::

## 概覽 {:#overview}

在 GenUI 架構中，UI 由 AI 驅動，但使用者互動（例如點擊按鈕或提交表單）必須回傳給 AI agent。這讓 agent 能夠根據使用者輸入來更新 UI 或執行相對應的動作。

事件的流程如下：

1. **互動**：使用者與元件互動，例如點擊按鈕。
2. **捕捉**：元件實作傳送（dispatch）一個 `UiEvent`。
3. **處理**：框架加入上下文資訊（例如 `surfaceId` 或資料模型值），並轉發事件。
4. **傳輸**：Flutter 元件產生事件，加入適當的上下文，並透過 `ContentGenerator` 將其路由至 AI，`ContentGenerator` 再將其轉發給 AI agent。

## 定義事件 {:#defining-events}

### 協定層級 {:#protocol-level}

A2UI 協定定義了用於回報事件的 `action` 訊息。一個 `action` 包含：

* `name`：動作的名稱（由 AI 在產生元件時定義）。
* `surfaceId`：發生事件的 UI surface ID。
* `sourceComponentId`：觸發事件的元件 ID。
* `context`：包含事件相關資料的 JSON 物件。
* `timestamp`：事件發生的時間。

### Dart 實作 {:#dart-implementation}

在 [`package:genui`][] 中，使用者事件以 `UiEvent` 擴充型別（extension type）及其具體實作 `UserActionEvent` 來表示。

[`package:genui`]: https://pub.dev/packages/genui

以下結構定義於 `lib/src/model/ui_models.dart`：

```dart title="lib/src/model/ui_models.dart"
/// A data object that represents a user interaction event in the UI.
extension type UiEvent.fromMap(JsonMap _json) { ... }

/// A UI event that represents a user action.
extension type UserActionEvent.fromMap(JsonMap _json) implements UiEvent {
  UserActionEvent({
    String? surfaceId,
    required String name,
    required String sourceComponentId,
    JsonMap? context,
    // ...
  }) : ...
}
```

## 在元件中捕捉事件 {:#capturing-events-in-widgets}

GenUI 中的元件定義於 `Catalog` 內，其中包含該元件可傳送給 AI 的事件資訊。AI 接著可以傳回關於如何回傳這些事件的資訊。當你實作自訂元件（或使用標準元件）時，需使用 `CatalogItemContext` 中的 `dispatchEvent` 方法來傳送事件。

### 範例：Button 實作 {: #button-example}

以下範例展示 `Button` 元件如何捕捉點擊並傳送事件。它從屬性中取得動作定義（由 AI 提供），解析上下文中的資料繫結（data binding），並傳送事件。

```dart
// Inside a CatalogItem widgetBuilder:
widgetBuilder: (itemContext) {
  // 1. Extract action data from the component properties.
  final buttonData = _ButtonData.fromMap(itemContext.data as JsonMap);
  final JsonMap actionData = buttonData.action;
  final actionName = actionData['name'] as String;

  // 2. Extract context definition (which data to send back).
  final List<Object?> contextDefinition =
      (actionData['context'] as List<Object?>?) ?? <Object?>[];

  return ElevatedButton(
    onPressed: () {
      // 3. Resolve the context values from the data model.
      final JsonMap resolvedContext = resolveContext(
        itemContext.dataContext,
        contextDefinition,
      );

      // 4. Dispatch the event.
      itemContext.dispatchEvent(
        UserActionEvent(
          name: actionName,
          sourceComponentId: itemContext.id,
          context: resolvedContext,
        ),
      );
    },
    child: /* ... */
  );
},
```

## 事件處理管線 {:#event-processing-pipeline}

一旦呼叫 `dispatchEvent`，事件便會經過 GenUI 核心層的處理。

### Surface {:#surface}

`Surface` 元件（位於 `lib/src/core/surface.dart`）包裹了已渲染的元件，並提供 `dispatchEvent` 回呼（callback）的實作。

當呼叫 `_dispatchEvent` 時：

1. 它會自動將 `surfaceId` 注入事件，確保 AI 知道互動來自哪個 surface。
2. 它將處理委派給 `SurfaceHost`（由 `SurfaceController` 實作）。

```dart
// Surface implementation details
void _dispatchEvent(UiEvent event) {
  // ...
  final Map<String, Object?> eventMap = {
    ...event.toMap(),
    surfaceIdKey: widget.surfaceId, // Inject surfaceId
  };
  final UiEvent newEvent = UserActionEvent.fromMap(eventMap);
  widget.host.handleUiEvent(newEvent);
}
```

### SurfaceController {:#surfacecontroller}

`SurfaceController`（位於 `lib/src/core/surface_controller.dart`）是管理 UI 狀態的核心樞紐。

當呼叫 `handleUiEvent` 時，它會執行以下步驟：

1.  驗證事件型別。
2.  將事件包裝在協定所需的 `action` JSON 封裝中。
3.  在其 `onSubmit` 串流上發出一個 `UserUiInteractionMessage`。

```dart
// SurfaceController implementation details
@override
void handleUiEvent(UiEvent event) {
  if (event is! UserActionEvent) return;

  // Wrap in protocol 'action' envelope
  final String eventJsonString = jsonEncode({'action': event.toMap()});

  // Emit for listeners (like Conversation)
  _onSubmit.add(UserUiInteractionMessage.text(eventJsonString));
}
```

## 傳輸至 AI {:#transmission-to-ai}

最後一個步驟是將事件傳送給 AI Agent。這通常由 `Conversation`（位於 `lib/src/facade/conversation.dart`）處理。`Conversation` 監聽來自訊息處理器的 `onSubmit` 串流。

```dart
// Conversation constructor
_userEventSubscription = surfaceController.onSubmit.listen(sendRequest);
```

當接收到事件時，`sendRequest` 方法會：

1. 將 `UserUiInteractionMessage` 包裝後回傳給開發者的用戶端程式碼。
2. 自訂整合或預定義的傳輸轉接器將訊息轉發至 LLM agent 的網路傳輸層。

AI Agent 接收此 JSON 訊息，處理使用者動作，並可能串流回新的 `surfaceUpdate` 或 `dataModelUpdate` 訊息來修改 UI，或執行其他動作，完成完整的互動迴圈。

