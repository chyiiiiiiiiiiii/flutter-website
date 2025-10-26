---
title: 開始用宣告式思維
description: 如何以宣告式程式設計的角度思考。
prev:
  title: Intro
  path: /data-and-backend/state-mgmt
next:
  title: Ephemeral versus app state
  path: /data-and-backend/state-mgmt/ephemeral-vs-app
---

如果你是從命令式框架（例如 Android SDK 或 iOS UIKit）轉換到 Flutter，你需要開始用全新的角度來思考應用程式開發。

你過去的一些假設在 Flutter 上並不適用。例如，在 Flutter 中，從頭重建部分 UI 是沒問題的，而不是直接修改它。Flutter 的效能足夠，即使每一幀都重建也沒問題。

Flutter 採用**宣告式**（declarative）方式。這代表 Flutter 會根據應用程式目前的狀態來建構使用者介面：

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/ui-equals-function-of-state.png' width="100%" class="diagram-wrap" alt="A mathematical formula of UI = f(state). 'UI' is the layout on the screen. 'f' is your build methods. 'state' is the application state.">

{% comment %}
Source drawing for the png above: : https://docs.google.com/drawings/d/1RDcR5LyFtzhpmiT5-UupXBeos2Ban5cUTU0-JujS3Os/edit?usp=sharing
{% endcomment %}

當你的應用程式狀態改變時
（例如，使用者在設定畫面切換了一個開關），
你只需要改變狀態，這就會觸發 UI 的重新繪製。
你不需要用命令式的方式直接改變 UI
（像是 `widget.setText`）——你只需改變狀態，
UI 就會從頭重建。

你可以在[get started guide][get started guide]中深入了解宣告式 UI 程式設計的方式。

宣告式 UI 程式設計有許多優點。
最顯著的是，任何 UI 狀態都只有一條程式碼路徑。
你只需描述一次，當狀態為某個值時 UI 應該長什麼樣子——就這麼簡單。

一開始，
這種程式設計風格可能不像命令式那麼直覺。
這也是本節存在的原因。請繼續閱讀。


[get started guide]: /get-started/flutter-for/declarative
