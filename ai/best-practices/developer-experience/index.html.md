# 開發者體驗

> 了解如何使用規格驅動開發 (Spec-Driven Development) 與 Gemini 規劃、撰寫程式碼， 並持續改進高品質的 Flutter 應用程式。





生成式 AI (Generative AI) 不只對在應用程式中實作功能有所助益，對於產生實作這些功能所需的程式碼同樣大有幫助。

遺憾的是，提示 AI 編程代理人「建置一個能解填字遊戲的 Flutter 應用程式」是再容易不過的事。我相信這個提示確實能產生些什麼，但我很懷疑它能否帶來 Crossword Companion 所提供的那種強大的 AI 輔助、經使用者驗證的組合。

然而，透過更好的提示方式，這個範例應用程式主要功能是以 Gemini 2.5 Pro 實作，最後的修飾則使用 Gemini 3 Pro Preview 完成。從兩個模型獲得最佳成果的流程是相同的：

- 規劃 (Plan)
- 撰寫程式碼 (Code)
- 驗證 (Validate)
- 反覆改進 (Iterate)

### 規劃 {:#plan}

規劃流程的目標是在開始撰寫程式碼之前，提供足夠的細節，讓代理人了解你的構想。Crossword Companion 的規劃流程是以下列提示作為起點：

```plaintext
I'd like to create a file called requirements.md in the plans folder at the root of the project. here's a description of the project:

The application will be an open-source sample hosted on GitHub in the flutter/demos directory. It aims to demonstrate the use of Flutter, Firebase AI Logic, and Gemini to produce an agentic workflow that can solve a small crossword puzzle (one with a size under 10x10)....lots more description of the app along with a sample puzzle screenshot...
Ask any questions you may have before you get started.
```

這個提示，加上少量的問答、人工手動編輯，以及在撰寫程式碼過程中的一些更新，最終產生了[需求規格文件][requirements]。

在進入架構設計之前，先要求 Gemini CLI 初始化 GEMINI.md 規則文件，然後以一組架構原則來更新它：

```plaintext
DRY (Don't Repeat Yourself) – eliminate duplicated logic by extracting shared utilities and modules.

Separation of Concerns – each module should handle one distinct responsibility.

Single Responsibility Principle (SRP) – every class/module/function/file should have exactly one reason to change.

Clear Abstractions & Contracts – expose intent through small, stable interfaces and hide implementation details.

Low Coupling, High Cohesion – keep modules self-contained, minimize cross-dependencies.

Scalability & Statelessness – design components to scale horizontally and prefer stateless services when possible.

Observability & Testability – build in logging, metrics, tracing, and ensure components can be unit/integration tested.

KISS (Keep It Simple, Sir) - keep solutions as simple as possible.

YAGNI (You're Not Gonna Need It) – avoid speculative complexity or over-engineering.
```

GEMINI.md 文件會在每次使用 Gemini 建立新提示時載入，它提供了一組規則，讓 Gemini 在任何活動中都能記住並遵循。由於 Gemini 是在一個空白的 Flutter 應用程式專案中執行，因此 `/init` 指令會記錄如何建置、測試及執行該專案，這在撰寫程式碼時非常有用。

如果你正在建置的不只是一個範例，我也建議加入測試驅動開發 (Test-Driven Development) 的相關說明：

```markdown
- **TDD (Test-Driven Development)** - write the tests first; the implementation
  code isn't done until the tests pass.
```

這有助於建立防護措施，確保編程代理人能隨著時間持續撰寫穩健的程式碼。

有了需求規格和規則之後，接著就是提示生成 design.md 文件：

```plaintext
great. i'd like to work on the design with you to be created in a design.md file to be stored in the plans folder. please use the @GEMINI.md and @requirements.md files as input. ask any questions you may have before you get started.
```

在檢視並編輯生成的應用程式設計後，接著提示 Gemini 將其拆解為[任務清單][tasks-spec]：

```plaintext
please read the files in the @specs folder and create a corresponding tasks.md file in the same folder that lays out a set of tasks and subtasks representing the functionality of this app. lay out the top-level tasks as minimal new functionality that the user can see in the running app, step-by-step as each top-level task is completed. each top-level task should include sub-tasks for creating and running tests and updating the @README.md with a description of the current functionality of the app. ask any questions you may have before you get started.
```

以上所有步驟都在撰寫任何程式碼之前完成。你不必將所有內容拆分到不同的文件中，但透過仔細考量需求規格、設計與任務拆解，你能幫助代理人提供符合你期望的成果。這稱為「規格驅動開發 (Spec-Driven Development)」，目前是我們所知將開發流程從「氛圍編程 (vibe coding)」提升至「AI 輔助軟體開發」的最佳方式。

此外，「ask any questions you may have before you get started」（開始之前請提出任何疑問）這句話非常實用，它讓代理人能釐清任何不明白的地方，而不是自行臆測答案。這對於幫助你決定一些原本可能未曾考慮的細節也很有幫助。

### 撰寫程式碼 {:#code}

有了需求規格、規則、設計和任務清單之後，啟動撰寫程式碼的部分就很容易了：

```plaintext
Read the @tasks.md file and implement the first milestone.
```

你可以觀察編程代理人的運作過程，在它作業時隨時介入修正，或者直接讓它自行完成。無論如何，當它完成後，就是檢查其成果的時候了。

### 驗證 {:#validate}

此時，你已經有了一些程式碼，以及（在範例以外的真實世界中）一些測試。為了進行驗證，請自問以下幾個問題：

- 分析器顯示程式碼沒有錯誤嗎？沒有警告嗎？
- 應用程式能正常執行嗎？
- 它具備你要求的功能嗎？這些功能正常運作嗎？
- 測試通過了嗎？
- 程式碼通過你的審查了嗎？

這些問題的答案將作為下一個階段的輸入。

### 反覆改進 {:#iterate}

收集需要處理的問題，將需要修正的部分交回給編程代理人，在代理人撰寫程式碼與你進行驗證之間反覆循環，直到在功能面達到一個良好的狀態。

接著，從架構原則的角度再次進行驗證，啟動一個新的代理人來審查程式碼。透過清除代理人的上下文 (context)，你消除了原始代理人在最初選擇要撰寫哪些程式碼時所累積的偏見。為了讓它專注於代理人剛才所做的程式碼變更，可以使用如下的提示：

```plaintext
Use git diff to find the new code and check it against the architectural principles listed here: @GEMINI.md. Make recommendations for important improvements.
```

多做幾次這樣的操作，能讓程式碼對 AI 代理人和人類開發者而言都保持良好的狀態。


[requirements]: https://github.com/flutter/demos/blob/main/crossword_companion/specs/requirements.md
[tasks-spec]: https://github.com/flutter/demos/blob/main/crossword_companion/specs/tasks.md

