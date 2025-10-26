---
title: 為你的 iOS 應用程式新增啟動畫面
shortTitle: 啟動畫面
description: 學習如何為你的 iOS 應用程式新增啟動畫面。
showToc: false
---

{% comment %}
考慮在這裡加入一張類似於 Android splash-screen 的圖片：
https://github.com/flutter/website/issues/8357
{% endcomment -%}

[啟動畫面][Launch screens] 在你的 iOS 應用程式載入時，提供一個簡單的初始體驗。
它們為你的應用程式鋪陳開場，同時讓 app engine 有時間載入並初始化你的應用程式。

[Launch screens]: {{site.apple-dev}}/design/human-interface-guidelines/launching#Launch-screens

所有提交到 Apple App Store 的應用程式
[必須提供一個啟動畫面][apple-requirement]，
並且需使用 Xcode storyboard 製作。

## 自訂啟動畫面

預設的 Flutter 範本包含一個名為 `LaunchScreen.storyboard` 的 Xcode storyboard，
你可以用自己的資源 (Assets) 來自訂它。
預設情況下，storyboard 會顯示一張空白圖片，
但你可以更改這個設定。為此，
請在你的應用程式根目錄下輸入 `open ios/Runner.xcworkspace`
以開啟 Flutter 應用程式的 Xcode 專案。
然後在 Project Navigator 中選擇 `Runner/Assets.xcassets`，
並將你想要的圖片拖曳到 `LaunchImage` image set 中。

Apple 在 [人機介面指引（Human Interface Guidelines）][Human Interface Guidelines]
中針對啟動畫面提供了詳細的設計指引。

[apple-requirement]: {{site.apple-dev}}/documentation/xcode/specifying-your-apps-launch-screen
[Human Interface Guidelines]: {{site.apple-dev}}/design/human-interface-guidelines/patterns/launching#launch-screens
