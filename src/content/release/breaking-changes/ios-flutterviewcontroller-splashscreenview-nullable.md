---
title: iOS FlutterViewController splashScreenView 改為可為 null
description: >
  FlutterViewController 的 splashScreenView 屬性從 nonnull 改為 nullable。
---

{% render docs/breaking-changes.md %}

## 摘要

`FlutterViewController` 屬性 `splashScreenView`
已從 `nonnull` 變更為 `nullable`。

`splashScreenView` 的舊宣告如下：

```objc
@property(strong, nonatomic) UIView* splashScreenView;
```

`splashScreenView` 的新宣告如下：

```objc
@property(strong, nonatomic, nullable) UIView* splashScreenView;
```

## 背景

在此變更之前，於 iOS 上，`splashScreenView` 屬性在未設定 splash screen view（啟動畫面視圖）時會回傳 `nil`，而將該屬性設為 `nil` 則會移除 splash screen view。然而，`splashScreenView` API 被錯誤地標記為 `nonnull`。此屬性最常用於 iOS add-to-app（將 Flutter 加入現有 iOS 應用程式）場景中，於切換至 Flutter 視圖時使用。

## 變更說明

雖然在 Objective-C 中，可以透過將 `splashScreenView` 設為 `nil` `UIView` 來繞過錯誤的 `nonnull` 標註，但在 Swift 中這會導致編譯錯誤：

```plaintext
error build: Value of optional type 'UIView?' must be unwrapped to a value of type 'UIView'
```

[PR #34743][PR #34743] 將屬性屬性（property attribute）更新為 `nullable`。
它現在可以回傳 `nil`，並且可以設為 `nil`，
以在 Objective-C 和 Swift 中移除該 view。

## 遷移指南

如果 `splashScreenView` 在 Swift 中被儲存在 `UIView` 變數中，
請更新為可選型別 `UIView?`。

遷移前的程式碼：

```swift
  var splashScreenView = UIView()
  var flutterEngine = FlutterEngine(name: "my flutter engine")
  let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
  splashScreenView = flutterViewController.splashScreenView // compilation error: Value of optional type 'UIView?' must be unwrapped to a value of type 'UIView'
```

遷移後的程式碼：

```swift
  var splashScreenView : UIView? = UIView()
  var flutterEngine = FlutterEngine(name: "my flutter engine")
  let flutterViewController = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
  let splashScreenView = flutterViewController.splashScreenView // compiles successfully
  if let splashScreenView = splashScreenView {
  }
```

## 時程

穩定版發佈於：3.7

## 參考資料

相關 PR：

* [讓 FlutterViewController 的 splashScreenView 可為 nullable][Make splashScreenView of FlutterViewController nullable]

[Make splashScreenView of FlutterViewController nullable]: {{site.repo.engine}}/pull/34743
[PR #34743]: {{site.repo.engine}}/pull/34743
