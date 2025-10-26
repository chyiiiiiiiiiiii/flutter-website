---
title: 使用 Network 檢視畫面
description: 如何使用 DevTools 的 network 檢視畫面。
---

:::note
network 檢視畫面可用於所有 Flutter 與 Dart 應用程式。
:::

## 什麼是 Network 檢視畫面？

Network 檢視畫面可讓你檢查來自 Dart 或 Flutter 應用程式的 HTTP、HTTPS 與 WebSocket 流量。

![Network 螢幕截圖](/assets/images/docs/tools/devtools/network_screenshot.png){:width="100%"}

## 會記錄哪些網路流量？

所有來自 `dart:io`（例如 [`HttpClient`][HttpClient] 類別）發出的網路流量都會被記錄，包括 [`dio`][dio] 套件。此外，所有使用 [`http_profile`][http_profile] 套件記錄的網路流量，也會顯示在 network 請求表格中。這包括來自 [`cupertino_http`][cupertino_http]、[`cronet_http`][cronet_http] 以及 [`ok_http`][ok_http] 套件的網路流量。

對於使用瀏覽器發送請求的 Web 應用程式，我們建議使用瀏覽器內建的工具（如 [Chrome DevTools][Chrome DevTools]）來檢查網路流量。

## 如何使用

當你開啟 Network 頁面時，DevTools 會立即開始記錄網路流量。你可以使用左上角的 **Pause**（暫停）與 **Resume**（繼續）按鈕來暫停或恢復記錄。

當你的應用程式發送網路請求時，該請求會顯示在左側的 network 請求表格中。在收到完整回應前，狀態會顯示為「Pending」（待處理）。

從左側表格中選取一筆網路請求，即可在右側檢視詳細資訊。你可以檢查該請求的一般資訊、時序資訊，以及回應與請求的標頭與主體內容。有些資料會在收到回應後才會顯示。

### 搜尋與篩選

你可以使用搜尋與篩選控制項，快速找到特定請求，或將不需要的請求從請求表格中過濾掉。

![Network 螢幕截圖](/assets/images/docs/tools/devtools/network_search_and_filter.png)

要套用篩選條件，請點擊搜尋列右側的篩選按鈕。此時會跳出篩選對話框：

![Network 螢幕截圖](/assets/images/docs/tools/devtools/network_filter_dialog.png)

篩選語法會在對話框中說明。你可以依下列鍵值來篩選網路請求：
* `method`、`m`：此篩選條件對應「Method」欄位的值
* `status`、`s`：此篩選條件對應「Status」欄位的值
* `type`、`t`：此篩選條件對應「Type」欄位的值

任何未與可用篩選鍵配對的文字，會同時在所有類別（method、URI、status、type）中查詢。

範例篩選查詢：

```plaintext
my-endpoint m:get t:json s:200
```

```plaintext
https s:404
```

### 在應用程式啟動時錄製網路請求

若要在應用程式啟動時錄製網路流量，你可以讓應用程式以暫停狀態啟動，然後在 DevTools 中開始錄製網路流量，最後再繼續執行你的應用程式。

1. 以暫停狀態啟動你的應用程式：
    * `flutter run --start-paused ...`
    * `dart run --pause-isolates-on-start --observe ...`
2. 從你啟動應用程式的 IDE 開啟 DevTools，或如果你是從命令列介面 (Command Line Interface) 啟動的，則從命令列中顯示的連結開啟 DevTools。
3. 前往 Network 螢幕，並確保已開始錄製。
4. 繼續執行你的應用程式。
   ![Screenshot of the app resumption experience on the Network screen](/assets/images/docs/tools/devtools/network_startup_resume.png){:width="100%"}
5. Network profiler 現在會錄製你應用程式的所有網路流量，包括應用程式啟動時的流量。

## 其他資源

HTTP 和 HTTPS 請求也會以非同步時間軸事件的形式顯示在 [`Timeline`][timeline] 中。如果你想查看 HTTP 流量與應用程式或 Flutter 框架中其他事件的對應關係，則可以在時間軸中檢視網路活動。

若要學習如何使用 DevTools 監控應用程式的網路流量並檢查不同類型的請求，請參考這份有導引的 [Network View 教學][network-tutorial]。該教學也會示範如何利用此檢視來找出導致應用程式效能不佳的網路活動。

[HttpClient]: {{site.api}}/dart-io/HttpClient-class.html
[dio]: https://pub.dev/packages/dio
[http_profile]: {{site.pub-pkg}}/http_profile
[cupertino_http]: {{site.pub-pkg}}/cupertino_http
[cronet_http]: {{site.pub-pkg}}/cronet_http
[ok_http]: {{site.pub-pkg}}/ok_http
[Chrome DevTools]: https://developer.chrome.com/docs/devtools/network
[timeline]: /tools/devtools/performance#timeline-events-tab
[network-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-network-view-part-4-of-8-afce2463687c
