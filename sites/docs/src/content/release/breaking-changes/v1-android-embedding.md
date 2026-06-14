---
title: 移除 v1 Android embedding Java API
description: >-
  瞭解如何因應 Android v1 embedding API 的移除。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Android 的 v1 embedding 已於 Flutter 3.29.0 中被移除。
這是延續
[Android v1 embedding app and plugin creation deprecation][]
所描述的淘汰公告。
以下為被移除的所有類別完整清單。

```text
io.flutter.app.FlutterActivity
io.flutter.app.FlutterActivityDelegate
io.flutter.app.FlutterActivityEvents
io.flutter.app.FlutterApplication
io.flutter.app.FlutterFragmentActivity
io.flutter.app.FlutterPlayStoreSplitApplication
io.flutter.app.FlutterPluginRegistry

io.flutter.embedding.engine.plugins.shim.ShimPluginRegistry
io.flutter.embedding.engine.plugins.shim.ShimRegistrar

io.flutter.view.FlutterMain
io.flutter.view.FlutterNativeView
io.flutter.view.FlutterView
```

如果您的專案有參考到上述任何類別，請參考下方清單以獲取遷移指引。

* `io.flutter.app.FlutterActivity` 已被
   `io.flutter.embedding.android.FlutterActivity` 取代。
* `io.flutter.app.FlutterActivityDelegate` 已被
   `io.flutter.embedding.android.FlutterActivityAndFragmentDelegate` 取代。
* `io.flutter.app.FlutterActivityEvents` 已被移除。
* `io.flutter.app.FlutterApplication` 已被移除。
   如果 Flutter 專案有自訂 `Application` 的實作，應改為繼承基礎的 `android.app.Application`。
* `io.flutter.app.FlutterFragmentActivity` 已被
  `io.flutter.embedding.android.FlutterFragmentActivity` 取代。
* `io.flutter.app.FlutterPlayStoreSplitApplication` 已被
  `io.flutter.embedding.android.FlutterPlayStoreSplitApplication` 取代。
* `io.flutter.app.FlutterPluginRegistry` 已被移除，
   因其僅用於讓套件支援使用 v1 embedding 的應用程式。
* `io.flutter.embedding.engine.plugins.shim.ShimPluginRegistry` 已被移除，
   因其僅用於讓套件支援使用 v1 embedding 的應用程式。
* `io.flutter.embedding.engine.plugins.shim.ShimRegistrar` 已被移除，
   因其僅用於讓套件支援使用 v1 embedding 的應用程式。
* `io.flutter.view.FlutterMain` 已被
   `io.flutter.embedding.engine.loader.FlutterLoader` 取代。
* `io.flutter.view.FlutterNativeView` 已被
   `io.flutter.embedding.android.FlutterView` 取代。
* `io.flutter.view.FlutterView` 已被
   `io.flutter.embedding.android.FlutterView` 取代。

[Android v1 embedding app and plugin creation deprecation]: /release/breaking-changes/android-v1-embedding-create-deprecation

## 套件作者

套件應從其 `FlutterPlugin` 介面的實作中移除 `registerWith` 方法：

```java
public static void registerWith(@NonNull io.flutter.plugin.common.PluginRegistry.Registrar registrar);
```

如需此遷移的範例，
請參考 Flutter 團隊所擁有的插件移除此方法的 pull request：[flutter/packages#6494][]。

[flutter/packages#6494]: {{site.github}}/flutter/packages/pull/6494

## 時程表

合併於版本：3.28.0-0.1.pre<br>
穩定版釋出：3.29
