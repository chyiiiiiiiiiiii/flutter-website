---
title: 效能
description: 從多個角度評估您的應用程式效能。
---

{% ytEmbed 'PKGguGUwSYE', 'Flutter performance tips | Flutter in Focus' %}

:::note
如果您的應用程式出現效能問題，並且您正在嘗試偵錯，請參考 DevTool 的[效能檢視使用方式][Using the Performance view]頁面。
:::

[Using the Performance view]: /tools/devtools/performance

什麼是效能？為什麼效能很重要？要如何提升效能？

我們的目標是回答這三個問題（主要是第三個），以及與這些問題相關的所有內容。本文件應作為所有效能相關問題的單一入口點，或是資源樹的根節點，協助您找到關於效能的解答。

前兩個問題的答案大多偏向哲學層面，對於許多帶著特定效能問題前來的開發者來說，幫助有限。因此，這兩個問題的答案放在[附錄](/perf/appendix)中。

若要提升效能，首先需要有指標：一些可量化的數據，用來驗證問題與改善成效。在[效能指標](/perf/metrics)頁面中，您可以看到目前使用的指標，以及可用來取得這些指標的工具與 API。

我們也整理了一份[常見問題集](/perf/faq)，方便您查找目前遇到的問題或疑問是否已經有解答，或是否有現成的解決方案。（另外，您也可以在 Flutter GitHub 問題資料庫中，使用[performance][performance]標籤進行查詢。）

最後，效能問題分為四大類別。這四類也對應到 Flutter GitHub 問題資料庫所使用的四個標籤：「[perf: speed][speed]」、「[perf: memory][memory]」、「[perf: app size][size]」、「[perf: energy][energy]」。

後續內容將依照這四個類別進行組織。

{% comment %}
將「速度」（渲染）放在最前面，因為這是最常見的效能問題類別。
{% endcomment -%}

## 速度

您的動畫是否卡頓、不順暢？了解如何評估並修正渲染相關問題。

[提升渲染效能](/perf/rendering-performance)

{% comment %}
您的應用程式啟動時間是否過長？我們也會在未來的頁面中介紹啟動速度相關議題。
{% endcomment -%}

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>)：重新引入這篇文章並補上此連結。

## 記憶體

[善用記憶體](/perf/memory)

{% endcomment -%}

## 應用程式大小

如何測量您的應用程式大小。檔案越小，下載速度越快。

[測量應用程式大小][Measuring your app's size]

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>)：重新引入這篇文章並補上此連結。

## 能源

如何確保您的應用程式運作時能延長電池續航力。

[延長電池續航力](/perf/power)

{% endcomment -%}

[Measuring your app's size]: /perf/app-size

[speed]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+speed%22+sort%3Aupdated-asc+
[energy]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+energy%22+sort%3Aupdated-asc+
[memory]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+memory%22+sort%3Aupdated-asc+
[size]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+app+size%22+sort%3Aupdated-asc+
[performance]: {{site.repo.flutter}}/issues?q=+label%3A%22severe%3A+performance%22
