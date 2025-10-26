---
title: 程式碼格式化
description: >-
  Flutter 的程式碼格式化工具會依照建議的風格指引來格式化你的程式碼。
---

雖然你的程式碼可以依照任何偏好的風格撰寫，但根據我們的經驗，開發團隊通常會發現以下做法更有效率：

* 採用單一且共用的程式碼風格，以及
* 透過自動格式化來強制執行這種風格。

否則，團隊在程式碼審查（code review）時，常常會因為格式問題而爭論不休，浪費了本可用於討論程式行為的寶貴時間。

## 在 VS Code 中自動格式化程式碼

安裝 `Flutter` 擴充套件（請參考 [VS Code setup][VS Code setup]），即可在 VS Code 中自動格式化程式碼。

若要自動格式化目前原始碼視窗中的程式碼，請在程式碼視窗中按右鍵，然後選擇 `Format Document`。
你也可以在 VS Code 的 **Preferences** 中為此功能新增鍵盤快捷鍵。

若要在每次儲存檔案時自動格式化程式碼，請將 `editor.formatOnSave` 設定設為 `true`。

[VS Code setup]: /tools/vs-code#setup

## 在 Android Studio 與 IntelliJ 中自動格式化程式碼

安裝 `Dart` 外掛（請參考 [Android Studio and IntelliJ setup][Android Studio and IntelliJ setup]），即可在 Android Studio 與 IntelliJ 中自動格式化程式碼。
若要格式化目前原始碼視窗中的程式碼：

* 在 macOS 上，
  請按下 <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>L</kbd>。
* 在 Windows 與 Linux 上，
  請按下 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>L</kbd>。

Android Studio 與 IntelliJ 也在 macOS 的 **Preferences** 或 Windows、Linux 的 **Settings** 中的 Flutter 頁面，提供名為 **Format code on save** 的勾選框。
啟用此選項後，每當你儲存檔案時，系統會自動修正目前檔案的格式。

[Android Studio and IntelliJ setup]: /tools/android-studio#setup

## 使用 `dart` 指令自動格式化程式碼

若要在命令列介面（Command Line Interface）中修正程式碼格式，請執行 `dart format` 指令：

```console
$ dart format path1 path2 [...]
```

若想進一步瞭解 Dart formatter，請參閱 dart.dev 文件中的[`dart format`][`dart format`]。

[`dart format`]: {{site.dart-site}}/tools/dart-format
