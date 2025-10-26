---
title: 效能
description: 從多個角度評估您的應用程式效能。
---

{% ytEmbed 'PKGguGUwSYE', 'Flutter performance tips | Flutter in Focus' %}

:::note
如果您的應用程式出現效能問題，並且您正在嘗試進行除錯，請參考 DevTool 的[效能檢視使用方式][Using the Performance view]頁面。
:::

[Using the Performance view]: /tools/devtools/performance

什麼是效能？為什麼效能很重要？我要如何提升效能？

我們的目標是回答這三個問題（主要是第三個），以及與這些問題相關的所有事項。本文件應作為所有效能相關問題的單一入口點，或是資源樹的根節點，協助您找到解答。

前兩個問題的答案大多偏向哲學層面，對於許多帶著特定效能問題前來的開發者來說，幫助有限。因此，這兩個問題的答案已放在[附錄](/perf/appendix)中。

要提升效能，首先需要有指標：一些可量測的數據來驗證問題與改善成效。在[效能指標](/perf/metrics)頁面中，您可以看到目前常用的效能指標，以及可用來取得這些指標的工具與 API。

我們也整理了一份[常見問題集](/perf/faq)，方便您查詢自己遇到的問題是否已經有人提出過，或是否已有現成的解決方案。（另外，您也可以在 Flutter GitHub 問題資料庫中，使用[performance][performance]標籤進行查詢。）

最後，效能問題分為四大類，這也對應到 Flutter GitHub 問題資料庫中所使用的四個標籤：「[perf: speed][speed]」、「[perf: memory][memory]」、「[perf: app size][size]」、「[perf: energy][energy]」。

後續內容將依據這四個類別進行組織與說明。

{% comment %}
我們將「速度」（渲染）放在最前面，因為它是最常見的效能問題類別。
{% endcomment -%}

## 速度（Speed）

您的動畫是否卡頓、不流暢？學習如何評估並修正渲染相關問題。

[提升渲染效能](/perf/rendering-performance)

{% comment %}
您的應用程式啟動很慢嗎？我們也會在未來的頁面中介紹啟動速度相關議題。
{% endcomment -%}

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>)：重新引入這篇文章並補上連結。

## 記憶體（Memory）

[善用記憶體資源](/perf/memory)

{% endcomment -%}

## 應用程式大小（App size）

如何測量您的應用程式大小。應用程式越小，下載速度越快。

[測量您的應用程式大小][Measuring your app's size]

{% comment %}

TODO(<https://github.com/flutter/website/issues/8249>)：重新引入這篇文章並補上連結。

## 能源（Energy）

如何確保您的應用程式運行時能延長電池壽命。

[延長電池續航力](/perf/power)

{% endcomment -%}

[Measuring your app's size]: /perf/app-size

[speed]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+speed%22+sort%3Aupdated-asc+
[energy]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+energy%22+sort%3Aupdated-asc+
[memory]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+memory%22+sort%3Aupdated-asc+
[size]: {{site.repo.flutter}}/issues?q=is%3Aopen+label%3A%22perf%3A+app+size%22+sort%3Aupdated-asc+
[performance]: {{site.repo.flutter}}/issues?q=+label%3A%22severe%3A+performance%22
