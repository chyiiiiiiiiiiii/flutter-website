---
title: 使用原生語言除錯器
shortTitle: 除錯器
description: 如何將原生除錯器連接到正在執行的 Flutter 應用程式。
---

<?code-excerpt path-base="testing/native_debugging"?>

:::note
本指南假設你已了解一般除錯流程，
已安裝 Flutter 與 git，並且熟悉 Dart 語言以及下列其中一種語言：Java、Kotlin、Swift 或 Objective-C。
:::

如果你僅使用 Dart 程式碼開發 Flutter 應用程式，
可以直接使用你的 IDE 除錯器進行除錯。
Flutter 團隊推薦使用 VS Code。

如果你開發平台專屬的插件（plugin）或
使用平台專屬的函式庫，
則可以使用原生除錯器來除錯這部分的程式碼。

- 若要除錯以 Swift 或 Objective-C 撰寫的 iOS 或 macOS 程式碼，
  可以使用 Xcode。
- 若要除錯以 Java 或 Kotlin 撰寫的 Android 程式碼，
  可以使用 Android Studio。
- 若要除錯以 C++ 撰寫的 Windows 程式碼，可以使用 Visual Studio。

本指南將說明如何為你的 Dart 應用程式同時連接「兩個」除錯器，一個用於 Dart，另一個用於原生程式碼。

## 除錯 Dart 程式碼

本指南將介紹如何使用 VS Code 來除錯你的 Flutter 應用程式。
你也可以使用你偏好的 IDE，只要已安裝並設定好 Flutter 與 Dart 插件即可。

## 使用 VS Code 除錯 Dart 程式碼

以下步驟說明如何使用 Dart 除錯器
來除錯預設的 Flutter 範例應用程式。
在 VS Code 中介紹的功能元件，在你除錯自己的 Flutter 專案時同樣適用且會顯示。

1. 建立一個基本的 Flutter 應用程式。

    ```console
    $ flutter create my_app
    ```

    ```console
    Creating project my_app...
    Resolving dependencies in my_app... 
    Got dependencies in my_app.
    Wrote 129 files.

    All done!
    You can find general documentation for Flutter at: https://docs.flutter.dev/
    Detailed API documentation is available at: https://api.flutter.dev/
    If you prefer video documentation, consider: https://www.youtube.com/c/flutterdev

    In order to run your application, type:

      $ cd my_app
      $ flutter run

    Your application code is in my_app/lib/main.dart.
    ```

    ```console
    $ cd my_app
    ```

1. 在 Flutter 應用程式中使用 VS Code 開啟 `lib\main.dart` 檔案。

1. 點擊錯誤偵錯圖示
   (![VS Code 的錯誤偵錯圖示，可啟動 Flutter 應用程式的偵錯模式](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png))。
   這會在 VS Code 中開啟以下面板：

   - **Debug**
   - **Debug Console**
   - **Widget Inspector**

   第一次執行偵錯工具時，所需時間會比較長。

   {% comment %}
   ![VS Code 視窗，已開啟偵錯面板](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-debugger.png){:width="100%"}
   {% endcomment %}

1. 測試偵錯工具。

   a. 在 `main.dart` 中，點擊這一行：

      ```dart
      _counter++;
      ```

   b. 按下 <kbd>Shift</kbd> + <kbd>F9</kbd>。
      這會在
      `_counter` 變數遞增的位置新增一個中斷點。

   c. 在應用程式中，點擊 **+** 按鈕
      以遞增計數器。應用程式會暫停。

      {% comment %}
      ![Flutter test app paused](/assets/images/docs/testing/debugging/native/macos/basic-app.png){:width="50%"}
      <div class="figure-caption">

      預設 Flutter 應用程式於 macOS 上的顯示畫面。

      </div>
      {% endcomment %}

    d. 此時，VS Code 會顯示：

      - 在 **編輯器群組（Editor Groups）** 中：
        - `main.dart` 中被標示的中斷點
        - Flutter 應用程式的元件階層（widget hierarchy），
          顯示於 **Widget Inspector** 的 **Widget Tree**
      - 在 **側邊欄（side bar）** 中：
        - **Call Stack** 區段中的應用程式狀態
        - **Variables** 區段中的 `this` 區域變數值
      - 在 **面板（panel）** 中：
        - **Debug console** 中 Flutter 應用程式的日誌

      {% comment %}
      ![VS Code window with Flutter app paused](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-debugger-paused.png){:width="100%"}
      {% endcomment %}

### VS Code Flutter 除錯器

Flutter 外掛程式會為 VS Code 增加多項元件，
擴充 VS Code 的使用者介面。

#### VS Code 介面變更

啟動後，Flutter 除錯器會將除錯工具加入
VS Code 介面。

下方螢幕截圖與表格說明各項工具的用途。

![VS Code with the Flutter plugin UI additions](/assets/images/docs/testing/debugging/vscode-ui/screens/debugger-parts.png)

| 螢幕截圖標示顏色           | 列、面板或分頁         | 內容說明                                                                              |
|----------------------------|------------------------|---------------------------------------------------------------------------------------|
| **黃色**                   | Variables              | Flutter 應用程式中目前變數的值清單                                                    |
|                            | Watch                  | 你選擇追蹤的 Flutter 應用程式項目清單                                                |
|                            | Call Stack             | Flutter 應用程式中作用中子常式（subroutine）堆疊                                     |
|                            | Breakpoints            | 你所設定的例外與中斷點清單                                                           |
| **綠色**                   | `<Flutter files>`                  | 你正在編輯的檔案                                                                      |
| **粉紅色**                 | Widget Inspector       | 執行中 Flutter 應用程式的元件階層                                                    |
| **藍色**                   | Layout Explorer        | Flutter 如何在 Widget Inspector 中放置你所選元件的視覺化呈現                          |
|                            | Widget Details Tree    | Widget Inspector 中所選元件的屬性清單                                                |
| **橘色**                   | Problems               | Dart 分析器在目前 Dart 檔案中發現的問題清單                                           |
|                            | Output                 | Flutter 應用程式在建置時回傳的回應                                                    |
|                            | Debug Console          | Flutter 應用程式在除錯時產生的日誌或錯誤訊息                                          |
|                            | Terminal               | VS Code 內建的系統命令列提示                                                         |

{:.table .table-striped}

若要變更 VS Code 中面板（**橘色**）的位置，
請前往 **檢視（View）** > **外觀（Appearance）** > **面板位置（Panel Position）**。

#### VS Code Flutter 除錯工具列

工具列允許你使用任何除錯器進行除錯。
你可以單步執行（Step In/Out/Over）Dart 陳述式、熱重載（Hot Reload）、或繼續執行應用程式。

![Flutter debugger toolbar in VS Code](/assets/images/docs/testing/debugging/vscode-ui/screens/debug-toolbar.png)

| 圖示                                              | 動作說明                | 預設鍵盤快捷鍵                                         |
|---------------------------------------------------|-------------------------|--------------------------------------------------------|
| {% render docs/vscode-flutter-bar/play.md %}        | 啟動或繼續執行          | <kbd>F5</kbd>                                         |
| {% render docs/vscode-flutter-bar/pause.md %}       | 暫停                    | <kbd>F6</kbd>                                         |
| {% render docs/vscode-flutter-bar/step-over.md %}   | 單步跳過（Step Over）   | <kbd>F10</kbd>                                        |
| {% render docs/vscode-flutter-bar/step-into.md %}   | 單步執行（Step Into）   | <kbd>F11⟧L17⟧                                        |
| {% render docs/vscode-flutter-bar/step-out.md %}    | 單步跳出（Step Out）    | <kbd>Shift</kbd> + <kbd>F11</kbd>                     |
| {% render docs/vscode-flutter-bar/hot-reload.md %}  | 熱重載（Hot Reload）    | <kbd>Ctrl</kbd> + <kbd>F5</kbd>                       |
| {% render docs/vscode-flutter-bar/hot-restart.md %} | 熱重啟（Hot Restart）   | <kbd>Shift</kbd> + <kbd>Special</kbd> + <kbd>F5</kbd> |
| {% render docs/vscode-flutter-bar/stop.md %}        | 停止執行                | <kbd>Shift</kbd> + <kbd>F5</kbd>                      |
| {% render docs/vscode-flutter-bar/inspector.md %}   | 開啟 Widget Inspector   |                                                        |

{:.table .table-striped}

## 更新測試用 Flutter 應用程式

在本指南的後續步驟中，你需要更新
測試用 Flutter 應用程式。這次更新會新增可供除錯的原生程式碼。

1. 使用你偏好的 IDE 開啟 `lib/main.dart` 檔案。

1. 將 `main.dart` 的內容替換為下列程式碼。

    <details>
    <summary>展開以檢視本範例的 Flutter 程式碼</summary>

    ```dart title="lib/main.dart"
    // Copyright 2023 The Flutter Authors. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.

    import 'package:flutter/material.dart';
    import 'package:url_launcher/url_launcher.dart';

    void main() {
      runApp(const MyApp());
    }

    class MyApp extends StatelessWidget {
      const MyApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'URL Launcher',
          theme: ThemeData(
            colorSchemeSeed: Colors.purple,
            brightness: Brightness.light,
          ),
          home: const MyHomePage(title: 'URL Launcher'),
        );
      }
    }

    class MyHomePage extends StatefulWidget {
      const MyHomePage({super.key, required this.title});
      final String title;

      @override
      State<MyHomePage> createState() => _MyHomePageState();
    }

    class _MyHomePageState extends State<MyHomePage> {
      Future<void>? _launched;

      Future<void> _launchInBrowser(Uri url) async {
        if (!await launchUrl(
          url,
          mode: LaunchMode.externalApplication,
        )) {
          throw Exception('Could not launch $url');
        }
      }

      Future<void> _launchInWebView(Uri url) async {
        if (!await launchUrl(
          url,
          mode: LaunchMode.inAppWebView,
        )) {
          throw Exception('Could not launch $url');
        }
      }

      Widget _launchStatus(BuildContext context, AsyncSnapshot<void> snapshot) {
        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          return const Text('');
        }
      }

      @override
      Widget build(BuildContext context) {
        final Uri toLaunch = Uri(
            scheme: 'https',
            host: 'docs.flutter.dev',
            path: 'testing/native-debugging');
        return Scaffold(
          appBar: AppBar(
            title: Text(widget.title),
          ),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(toLaunch.toString()),
                ),
                FilledButton(
                  onPressed: () => setState(() {
                    _launched = _launchInBrowser(toLaunch);
                  }),
                  child: const Text('Launch in browser'),
                ),
                const Padding(padding: EdgeInsets.all(16)),
                FilledButton(
                  onPressed: () => setState(() {
                    _launched = _launchInWebView(toLaunch);
                  }),
                  child: const Text('Launch in app'),
                ),
                const Padding(padding: EdgeInsets.all(16.0)),
                FutureBuilder<void>(future: _launched, builder: _launchStatus),
              ],
            ),
          ),
        );
      }
    }
    ```

    </details>

1. 若要將 `url_launcher` 套件新增為相依套件，
   請執行 `flutter pub add`：

    ```console
    $ flutter pub add url_launcher
    ```

    ```console
    Resolving dependencies... 
      collection 1.17.1 (1.17.2 available)
    + flutter_web_plugins 0.0.0 from sdk flutter
      matcher 0.12.15 (0.12.16 available)
      material_color_utilities 0.2.0 (0.8.0 available)
    + plugin_platform_interface 2.1.4
      source_span 1.9.1 (1.10.0 available)
      stream_channel 2.1.1 (2.1.2 available)
      test_api 0.5.1 (0.6.1 available)
    + url_launcher 6.1.11
    + url_launcher_android 6.0.36
    + url_launcher_ios 6.1.4
    + url_launcher_linux 3.0.5
    + url_launcher_macos 3.0.5
    + url_launcher_platform_interface 2.1.3
    + url_launcher_web 2.0.17
    + url_launcher_windows 3.0.6
    Changed 10 dependencies!
    ```

1. 檢查程式碼庫有何變動：

   {: type="a"}
   1. 在 Linux 或 macOS 上，執行此 `find` 指令。

      ```console
      $ find ./ -mmin -120 
      ```

      ```console
      ./ios/Flutter/Debug.xcconfig
      ./ios/Flutter/Release.xcconfig
      ./linux/flutter/generated_plugin_registrant.cc
      ./linux/flutter/generated_plugins.cmake
      ./macos/Flutter/Flutter-Debug.xcconfig
      ./macos/Flutter/Flutter-Release.xcconfig
      ./macos/Flutter/GeneratedPluginRegistrant.swift
      ./pubspec.lock
      ./pubspec.yaml
      ./windows/flutter/generated_plugin_registrant.cc
      ./windows/flutter/generated_plugins.cmake
      ```
   1. 在 Windows 中，請在命令提示字元視窗執行以下指令。

      ```powershell
      Get-ChildItem C:\dev\example\ -Rescurse | Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-1)}
      ```

      ```powershell
      C:\dev\example\ios\Flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                Debug.xcconfig
                      8/1/2025   9:15 AM                Release.xcconfig

      C:\dev\example\linux\flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                generated_plugin_registrant.cc
                      8/1/2025   9:15 AM                generated_plugins.cmake

      C:\dev\example\macos\Flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                Flutter-Debug.xcconfig
                      8/1/2025   9:15 AM                Flutter-Release.xcconfig
                      8/1/2025   9:15 AM                GeneratedPluginRegistrant.swift

      C:\dev\example\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                pubspec.lock
                      8/1/2025   9:15 AM                pubspec.yaml

      C:\dev\example\windows\flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                generated_plugin_registrant.cc
                      8/1/2025   9:15 AM                generated_plugins.cmake
      ```

安裝 `url_launcher` 會在 Flutter 應用程式目錄中為所有目標平台新增設定檔與程式碼檔案。

## 同時偵錯 Dart 與原生語言程式碼

本節說明如何同時使用 Flutter 的熱重載（hot reload）功能，來偵錯 Flutter 應用程式中的 Dart 程式碼，以及使用原生偵錯工具來偵錯原生程式碼。這項功能讓你在編輯原生程式碼時，也能善用 Flutter 的熱重載。

### 使用 Android Studio 偵錯 Dart 與 Android 程式碼

若要偵錯原生 Android 程式碼，你需要一個包含 Android 程式碼的 Flutter 應用程式。在本節中，你將學習如何將 Dart、Java 和 Kotlin 偵錯工具連接到你的應用程式。你不需要 VS Code 來同時偵錯 Dart 和 Android 程式碼。本指南包含 VS Code 的相關說明，以便與 Xcode 和 Visual Studio 的指南保持一致。

本節使用在 [Update test Flutter app](#更新測試用-flutter-應用程式) 中建立的相同 Flutter `url_launcher` 範例應用程式。

{% render docs/debug/debug-flow-android.md %}

### 使用 Xcode 偵錯 Dart 與 iOS 程式碼

若要偵錯 iOS 程式碼，你需要一個包含 iOS 程式碼的 Flutter 應用程式。在本節中，你將學習如何將兩個偵錯工具連接到你的應用程式：分別是透過 VS Code 的 Flutter 偵錯工具，以及 Xcode。你需要同時執行 VS Code 和 Xcode。

本節使用在 [Update test Flutter app](#更新測試用-flutter-應用程式) 中建立的相同 Flutter `url_launcher` 範例應用程式。

{% render docs/debug/debug-flow-ios.md %}

### 使用 Xcode 偵錯 Dart 與 macOS 程式碼

若要偵錯 macOS 程式碼，你需要一個包含 macOS 程式碼的 Flutter 應用程式。在本節中，你將學習如何將兩個偵錯工具連接到你的應用程式：分別是透過 VS Code 的 Flutter 偵錯工具，以及 Xcode。你需要同時執行 VS Code 和 Xcode。

本節使用在 [Update test Flutter app](#更新測試用-flutter-應用程式) 中建立的相同 Flutter `url_launcher` 範例應用程式。

{% render docs/debug/debug-flow-macos.md %}

### 使用 Visual Studio 偵錯 Dart 與 C++ 程式碼

若要偵錯 C++ 程式碼，你需要一個包含 C++ 程式碼的 Flutter 應用程式。在本節中，你將學習如何將兩個偵錯工具連接到你的應用程式：分別是透過 VS Code 的 Flutter 偵錯工具，以及 Visual Studio。你需要同時執行 VS Code 和 Visual Studio。

本節使用在 [Update test Flutter app](#更新測試用-flutter-應用程式) 中建立的相同 Flutter `url_launcher` 範例應用程式。

{% render docs/debug/debug-flow-windows.md %}

## 相關資源

你可以參考以下關於 Flutter、iOS、Android、macOS 和 Windows 偵錯的資源：

### Flutter

- [Debugging Flutter apps][Debugging Flutter apps]
- [Flutter inspector][Flutter inspector] 以及 [DevTools][DevTools] 文件
- [Performance profiling][Performance profiling]

[Debugging Flutter apps]: /testing/debugging
[Performance profiling]: /perf/ui-performance

### Android

你可以在 [developer.android.com][developer.android.com] 找到以下偵錯資源。

- [Debug your app][Debug your app]
- [Android Debug Bridge (adb)][Android Debug Bridge (adb)]

### iOS 與 macOS

你可以在 [developer.apple.com][developer.apple.com] 找到以下偵錯資源。

- [Debugging][Debugging]
- [Instruments Help][Instruments Help]

### Windows

你可以在 [Microsoft Learn][Microsoft Learn] 找到 Windows 偵錯相關資源。

- [Visual Studio Debugger][Visual Studio Debugger]
- [Learn to debug C++ code using Visual Studio][Learn to debug C++ code using Visual Studio]

[Android Debug Bridge (adb)]: {{site.android-dev}}/studio/command-line/adb
[Debug your app]: {{site.android-dev}}/studio/debug
[Debugging]: {{site.apple-dev}}/support/debugging/
[developer.android.com]: {{site.android-dev}}
[developer.apple.com]: {{site.apple-dev}}
[DevTools]: /tools/devtools
[Flutter inspector]: /tools/devtools/inspector
[Instruments Help]: https://help.apple.com/instruments/mac/current/
[Microsoft Learn]: https://learn.microsoft.com/visualstudio/
[Visual Studio Debugger]: https://learn.microsoft.com/visualstudio/debugger/?view=vs-2022
[Learn to debug C++ code using Visual Studio]: https://learn.microsoft.com/visualstudio/debugger/getting-started-with-the-debugger-cpp?view=vs-2022
