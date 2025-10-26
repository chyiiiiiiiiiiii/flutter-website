---
title: DevTools 擴充功能
description: 學習如何使用與建立 DevTools 擴充功能。
---

## 什麼是 DevTools 擴充功能？

[DevTools extensions][DevTools extensions]（DevTools 擴充功能）是由第三方套件所提供的開發者工具，並且與 DevTools 工具套件緊密整合。擴充功能會作為 pub 套件的一部分進行發佈，當使用者在除錯應用程式時，這些擴充功能會動態載入到 DevTools 中。
[DevTools extensions]: {{site.pub-pkg}}/devtools_extensions

## 使用 DevTools 擴充功能

如果你的應用程式依賴於提供 DevTools 擴充功能的套件，當你開啟 DevTools 時，該擴充功能會自動顯示於新的分頁中。

### 設定擴充功能啟用狀態

你需要在第一次載入擴充功能前手動啟用它。在啟用前，請確保該擴充功能來自你信任的來源。

當你第一次開啟擴充功能時，會看到提示你啟用擴充功能的對話框：

![Screenshot of extension enablement prompt](/assets/images/docs/tools/devtools/extension_enable_prompt.png)

你可以隨時從 DevTools Extensions 對話框中修改此設定：

![Screenshot of DevTools Extensions dialog button](/assets/images/docs/tools/devtools/extension_dialog_button.png)

![Screenshot of extension enablement dialog](/assets/images/docs/tools/devtools/extension_dialog.png)

> 注意：如果該擴充功能需要連線至正在執行的應用程式，你將不會看到啟用提示或啟用設定，直到 DevTools 已連線到正在執行的應用程式為止。

擴充功能的啟用狀態會儲存在使用者專案根目錄下的 `devtools_options.yaml` 檔案中（類似於 `analysis_options.yaml`）。

```yaml
description: This file stores settings for Dart & Flutter DevTools.
documentation: https://docs.flutter.dev/tools/devtools/extensions#configure-extension-enablement-states
extensions:
  - provider: true
  - shared_preferences: true
  - foo: false
```

此檔案用於儲存 DevTools 的每個專案（或可選的，每個使用者）設定。

如果此檔案**有被提交到版本控制**，
則指定的選項會為整個專案進行設定。
這代表任何拉取專案原始碼並參與開發的人，
都會使用相同的設定。

如果此檔案**未被提交到版本控制**，
例如在 `.gitignore` 檔案中加入 `devtools_options.yaml` 作為一個條目，則指定的選項
會為每個使用者分別設定。
由於每位專案的使用者或貢獻者
在這種情況下都會使用本機的 `devtools_options.yaml` 檔案副本，
因此指定的選項可能會因專案貢獻者而異。

## 建立 DevTools 擴充套件

如果你想深入了解如何建立 DevTools 擴充套件，
請參考 [Dart and Flutter DevTools extensions][article]，
這是一篇免費的 Medium 文章。

想進一步了解如何撰寫與使用 DevTools 擴充套件，
可以觀看以下影片：

{% ytEmbed 'gOrSc4s4RWY', 'Building DevTools extensions | Flutter Build Show' %}

[article]: {{site.flutter-medium}}/dart-flutter-devtools-extensions-c8bc1aaf8e5f
