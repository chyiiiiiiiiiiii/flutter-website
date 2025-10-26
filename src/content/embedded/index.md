---
title: Flutter 的嵌入式支援
description: >
  關於 Flutter 如何支援建立嵌入式體驗的詳細說明。
---

如果你想要將 Flutter 引擎嵌入到汽車、冰箱、恆溫器……你可以這麼做！例如，你可以在以下情境中嵌入 Flutter：

* 在「嵌入式裝置」上使用 Flutter，這類裝置通常是低功耗的硬體設備，例如智慧顯示器、恆溫器或類似裝置。
* 將 Flutter 嵌入到新的作業系統或環境中，例如全新的行動平台或作業系統。

嵌入 Flutter 的能力雖然已經穩定，但它使用的是低階 API，_不_ 適合初學者。除了下方列出的資源外，你也可以考慮加入 [Discord][Discord]，Flutter 開發者（包含 Google 工程師）會在那裡討論 Flutter 的各種面向。Flutter 的 [社群][community]頁面也有更多社群資源的資訊。

* [自訂 Flutter 引擎嵌入器（Custom Flutter Engine Embedders）][Custom Flutter Engine Embedders]，位於 Flutter wiki。
* GitHub 上 [Flutter engine `embedder.h` 檔案][Flutter engine `embedder.h` file]中的文件註解。
* docs.flutter.dev 上的 [Flutter 架構總覽（Flutter architectural overview）][Flutter architectural overview]。
* Flutter engine GitHub 儲存庫中的一個小型、獨立的 [Flutter Embedder Engine GLFW 範例][Flutter Embedder Engine GLFW example]。
* 透過實作 Flutter 的自訂嵌入器 API，探索 [在終端機中嵌入 Flutter][embedding Flutter in a terminal]。
* [Issue 31043][Issue 31043]：_將 Flutter engine 移植到新作業系統的相關問題_ 也可能對你有所幫助。


[community]: {{site.main-url}}/community
[Discord]: https://discord.com/invite/N7Yshp4
[Custom Flutter Engine Embedders]: {{site.repo.flutter}}/blob/main/docs/engine/Custom-Flutter-Engine-Embedders.md
[Flutter architectural overview]: /resources/architectural-overview
[Flutter engine `embedder.h` file]: {{site.repo.flutter}}/blob/main/engine/src/flutter/shell/platform/embedder/embedder.h
[Flutter Embedder Engine GLFW example]: {{site.repo.flutter}}/tree/main/engine/src/flutter/examples/glfw#flutter-embedder-engine-glfw-example
[embedding Flutter in a terminal]: https://github.com/jiahaog/flt
[Issue 31043]: {{site.repo.flutter}}/issues/31043


