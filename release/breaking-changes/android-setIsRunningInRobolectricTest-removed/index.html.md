# 移除 Android 上的 FlutterMain.setIsRunningInRobolectricTest

> 僅供測試用途的 FlutterMain.setIsRunningInRobolectricTest API 已在 Android 引擎中整合至 FlutterInjector。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

如果你針對 Flutter 引擎的 Java 嵌入（embedding）進行 Java JUnit 測試（例如 Robolectric 測試），並且使用了
`FlutterMain.setIsRunningInRobolectricTest(true)` API，
請改用以下方式：

```java
FlutterJNI mockFlutterJNI = mock(FlutterJNI.class);
FlutterInjector.setInstance(
        new FlutterInjector.Builder()
            .setFlutterLoader(new FlutterLoader(mockFlutterJNI))
            .build());
```

這種情況應該非常罕見。

## 背景

`FlutterMain` 類別本身已經被棄用，並由 `FlutterInjector` 類別取代。`FlutterMain` 類別使用了許多靜態變數和函式，這使得測試變得困難。`FlutterMain.setIsRunningInRobolectricTest()` 是一種臨時的靜態機制，用來讓測試能在主機上的 JVM 執行，而不需要載入無法在主機上執行的 `libflutter.so` 原生函式庫。

為了避免這類一次性的解決方案，Flutter 在 Android/Java 引擎嵌入層中，所有測試所需的相依性注入（dependency injections）現在都已移至 [`FlutterInjector`] 類別。

[`FlutterInjector`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/FlutterInjector.java

在 `FlutterInjector` 類別中，`setFlutterLoader()` Builder 函式允許控制 [`FlutterLoader`][] 類別如何定位與載入 `libflutter.so` 函式庫。

[`FlutterLoader`]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/engine/loader/FlutterLoader.java

## 變更說明

這個 [engine commit][] 移除了 `FlutterMain.setIsRunningInRobolectricTest()` 測試函式；而接下來的 [commit][] 則新增了一個 `FlutterInjector` 類別來協助測試。[PR 20473][] 進一步重構了 `FlutterLoader` 和 `FlutterJNI`，以便支援更多的 mock 與測試。

[commit]: https://github.com/flutter/engine/commit/15f5696c4139a21e1fc54014ce17d01f6ad1737c#diff-f928557f2d60773a8435366400fa42ed
[engine commit]: https://github.com/flutter/engine/commit/15f5696c4139a21e1fc54014ce17d01f6ad1737c#diff-599e1d64442183ead768757cca6805c3L154
[PR 20473]: https://github.com/flutter/engine/pull/20473
以支援更多的 mock/測試。

## 遷移指南

遷移前的程式碼：

```java
FlutterMain.setIsRunningInRobolectricTest(true);
```

遷移後的程式碼：

```java
FlutterJNI mockFlutterJNI = mock(FlutterJNI.class);
FlutterInjector.setInstance(
        new FlutterInjector.Builder()
            .setFlutterLoader(new FlutterLoader(mockFlutterJNI))
            .build());
```

## 時程

合併於版本：1.22.0-2.0.pre.133<br>
進入穩定版：2.0.0

