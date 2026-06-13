---
title: 程式碼格式化
description: >-
  Flutter 的程式碼格式化工具會依照建議的風格指南自動格式化你的程式碼。
---

雖然你的程式碼可以遵循任何偏好的風格，但根據我們的經驗，開發團隊會發現以下做法更有效率：

* 採用單一且共用的程式碼風格，並且
* 透過自動格式化來強制執行這個風格。

否則，團隊經常會在程式碼審查時陷入冗長的格式討論，而這些時間其實更應該花在討論程式行為而非程式風格上。

## 在 VS Code 中自動格式化程式碼

安裝 `Flutter` 擴充套件（請參閱 [VS Code setup][VS Code setup]），即可在 VS Code 中自動格式化程式碼。

若要自動格式化目前原始碼視窗中的程式碼，請在程式碼視窗中按右鍵，然後選擇 `Format Document`。
你也可以在 VS Code **偏好設定**中為此功能新增鍵盤快捷鍵。

若要在每次儲存檔案時自動格式化程式碼，請將 `editor.formatOnSave` 設定設為 `true`。

[VS Code setup]: /tools/vs-code#setup

## 在 Android Studio 和 IntelliJ 中自動格式化程式碼

安裝 `Dart` 外掛程式（請參閱 [Android Studio and IntelliJ setup][Android Studio and IntelliJ setup]），即可在 Android Studio 和 IntelliJ 中自動格式化程式碼。
若要格式化目前原始碼視窗中的程式碼：

* 在 macOS 上，請按下 <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>L</kbd>。
* 在 Windows 和 Linux 上，請按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>L</kbd>。

Android Studio 和 IntelliJ 也在 macOS 的 **偏好設定**或 Windows 和 Linux 的 **設定**中的 Flutter 頁面，提供名為 **Format code on save** 的勾選框。
啟用此選項後，每當你儲存檔案時，會自動修正目前檔案的格式。

[Android Studio and IntelliJ setup]: /tools/android-studio#setup

## 使用 `dart` 指令自動格式化程式碼

若要在命令列介面（Command Line Interface）中修正程式碼格式，請執行 `dart format` 指令：

```console
$ dart format path1 path2 [...]
```

若想進一步瞭解 Dart formatter，請參閱 dart.dev 文件中的 [`dart format`][`dart format`]。

[`dart format`]: {{site.dart-site}}/tools/dart-format
