---
title: GenUI SDK 主要元件與概念
sidenav: ai
breadcrumb: Main components & concepts
description: >-
  熟悉 Flutter GenUI SDK 的主要元件與概念。
prev:
  title: GenUI SDK overview
  path: /ai/genui
next:
  title: Get started with the GenUI SDK
  path: /ai/genui/get-started
---

:::experimental
`genui` 套件目前處於 alpha 階段，可能會有所變動。
:::

## 主要元件

[`genui`][] 套件圍繞以下主要元件建置：

`Conversation`
: 套件的主要門面 (facade) 與進入點。
  它包含 `SurfaceController` 類別，
  管理對話歷史，
  並協調整個生成式 UI 流程。

`Catalog`
: 由 `CatalogItem` 物件組成的集合，定義了
  AI 可使用的元件 (Widget) 集合。
  `SurfaceController` 支援多個 catalog，
  讓你能將元件組織成邏輯群組。
  每個 `CatalogItem` 指定元件的名稱（供 AI 參照）、
  屬性的資料綱要 (schema)，以及
  用來渲染 Flutter 元件的建置器函式。

`DataModel`
: 集中式、可觀察的動態 UI 狀態儲存庫。
  元件會_綁定_到此模型中的資料。當資料變更時，
  僅會重建依賴該特定資料的元件。

`A2uiTransportAdapter`
: 將來自 LLM 的原始文字串流解析為
  `A2uiMessage` 命令，傳遞給 `SurfaceController` 的橋接器。

`A2uiMessage`
: 由 AI 發送（經 `A2uiTransportAdapter` 解析）給 UI 的訊息，
  指示 UI 執行如 `createSurface`、
  `surfaceUpdate`、`dataModelUpdate` 或 `deleteSurface` 等操作。

`SurfaceController`
: 負責處理 `A2uiMessage`，
  管理 `DataModel`，並維護 UI 表面的狀態。


## 運作方式

`Conversation` 管理互動循環：

 1. **使用者輸入**

    使用者提供提示詞（例如透過文字輸入框）。
    應用程式呼叫 `conversation.sendMessage()`。

 2. **呼叫 AI**

    `Conversation` 將使用者的訊息傳送至 LLM SDK。

 3. **AI 回應**

    LLM 在系統提示詞中提供的元件綱要引導下，
    回傳回應內容。

 4. **串流處理**

    來自 LLM SDK 的文字串流會被送入 `A2uiTransportAdapter`。

 5. **UI 狀態更新**

    adapter 解析後的 `A2uiMessages` 會傳遞給
    `SurfaceController.handleMessage()`，
    進而更新 UI 狀態與 `DataModel`。

 6. **UI 渲染**

    `SurfaceController` 廣播更新，
    所有監聽該 surface ID 的 `Surface` 元件將會重建。
    元件綁定至 `DataModel`，因此當資料變更時會自動更新。

 7. **回呼（callback）**

    文字回應與錯誤會觸發 `Conversation` 上的回呼（callback），
    或由你特定的 LLM 整合流程處理。

 8. **使用者互動**

    使用者與新生成的 UI 互動
    （例如在文字輸入框中輸入）。此互動會直接
    更新 `DataModel`。若互動是一個動作（如按下按鈕），
    `Surface` 會捕捉該事件並轉發給
    `SurfaceController`，後者會自動建立
    一則包含目前資料模型狀態的新 `UserMessage`，
    並重新啟動循環。

{:.steps}

如需 Flutter GenUI SDK 實作的更詳細資訊，
請參閱 [design doc][]。

下一節將引導你將 `genui` 加入你的應用程式。

[design doc]: {{site.repo.organization}}/genui/blob/main/packages/genui/DESIGN.md
[`genui`]: {{site.pub-pkg}}/genui
