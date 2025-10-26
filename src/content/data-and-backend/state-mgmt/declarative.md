---
title: 開始以宣告式思維進行開發
description: 如何以宣告式程式設計的角度思考。
prev:
  title: 介紹
  path: /data-and-backend/state-mgmt
next:
  title: 短暫狀態與應用程式狀態
  path: /data-and-backend/state-mgmt/ephemeral-vs-app
---

如果你是從命令式框架（例如 Android SDK 或 iOS UIKit）轉換到 Flutter，則需要以全新的角度來思考應用程式開發。

你可能原本的一些假設在 Flutter 中並不適用。例如，在 Flutter 中，直接從頭重建部分 UI 是沒問題的，而不是去修改它。Flutter 的效能足夠，即使每一幀都重建，也不成問題。

Flutter 採用**宣告式**（declarative）方式。這表示 Flutter 會根據你應用程式的當前狀態來建構使用者介面：

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/ui-equals-function-of-state.png' width="100%" class="diagram-wrap" alt="A mathematical formula of UI = f(state). 'UI' is the layout on the screen. 'f' is your build methods. 'state' is the application state.">

{% comment %}
Source drawing for the png above: : https://docs.google.com/drawings/d/1RDcR5LyFtzhpmiT5-UupXBeos2Ban5cUTU0-JujS3Os/edit?usp=sharing
{% endcomment %}

當你的應用程式狀態改變時
（例如，使用者在設定畫面切換了一個開關），
你只需要改變狀態，這就會觸發使用者介面的重新繪製。
你不需要命令式地去改變 UI 本身
（如 `widget.setText`）——你只需改變狀態，
UI 就會從頭開始重建。

你可以在[get started guide][get started guide]中閱讀更多關於宣告式 UI 程式設計的方法。

宣告式的 UI 程式設計風格有許多優點。
最顯著的是，對於 UI 的任何狀態，都只有一條程式碼路徑。
你只需描述一次，當狀態為某個值時 UI 應該長什麼樣子——就這麼簡單。

一開始，
這種程式設計風格可能不像命令式那樣直觀。
這也是本節存在的原因。請繼續閱讀。


[get started guide]: /get-started/flutter-for/declarative
