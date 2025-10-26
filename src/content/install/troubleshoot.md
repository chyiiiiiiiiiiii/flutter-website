---
title: 安裝疑難排解
shortTitle: 疑難排解
description: >-
  協助新手 Flutter 開發者解決常見的安裝問題。
---

本頁說明了一些新手 Flutter 使用者常見的安裝問題，並提供解決建議。

如果你在參考本頁內容後仍然遇到問題，請考慮透過[社群支援管道][community support channels]中的任一資源尋求協助。
若你想新增主題或修正內容，可以[提交 issue][file an issue]或在 GitHub 上送出 [pull request][pull request]。

[community support channels]: #社群支援
[file an issue]: {{site.github}}/flutter/website/issues/new
[pull request]: {{site.github}}/flutter/website/pulls

## 取得 Flutter SDK

### 找不到 `flutter` 指令

__這個問題會怎麼顯示？__

當你嘗試執行 `flutter` 指令時，
終端機無法找到該指令。
錯誤訊息通常如下所示：

```plaintext
'flutter' is not recognized as an internal or external command operable program or batch file
```

在 macOS 和 Linux 上的錯誤訊息可能會與 Windows 上顯示的略有不同。

__說明與建議__

你是否已經將 Flutter 加入你平台的 `PATH` 環境變數中？
在 Windows 上，請依照這份[將指令加入路徑的說明][windows path]操作。

如果你已經[設定好 VS Code 以進行 Flutter 開發][set up VS Code]，
可以利用 Flutter 擴充功能的 **Locate SDK** 提示
來確認你的 `flutter` 資料夾位置。

另請參考：[Configuring PATH and Environment Variables - Dart Code][config path]

[windows path]: https://www.wikihow.com/Change-the-PATH-Environment-Variable-on-Windows
[set up VS Code]: /tools/vs-code#setup
[config path]: https://dartcode.org/docs/configuring-path-and-environment-variables/

### Flutter 放在特殊資料夾中

__這個問題會是什麼樣子？__

執行你的 Flutter 專案時，會出現類似以下的錯誤訊息：

```plaintext
The Flutter SDK is installed in a protected folder and may not function correctly.
Please move the SDK to a location that is user-writable without Administration permissions and restart.
```

__說明與建議__

在 Windows 上，這通常發生於將 Flutter 安裝在像是
`C:\Program Files\` 這類需要提升權限的目錄中。
請嘗試將 Flutter 移動到其他資料夾，
例如 `C:\src\flutter`。

## Android 設定

### 安裝多個 Java 版本

__這個問題會出現什麼狀況？__

執行 `flutter doctor --android-licenses` 指令時會失敗。
執行 `flutter doctor --verbose` 時，會出現類似以下的錯誤訊息：

```plaintext
java.lang.UnsupportedClassVersionError: com/android/prefs/AndroidLocationsProvider
has been compiled by a more recent version of the Java Runtime (class file version 55.0),
this version of the Java Runtime only recognizes class file versions up to 52.0
```

__說明與建議__

當你的電腦上安裝了較舊版本的
Java Development Kit（JDK）
時，會發生此錯誤。

如果你不需要多個版本的 Java，
請從你的電腦中解除安裝現有的 JDK。
Flutter 會自動使用 Android Studio 內建的 JDK。

如果你確實需要其他版本的 Java，
請參考
[這個 GitHub issue][java binary path]
中描述的暫時解決方法，直到有長期解決方案為止。
欲了解更多資訊，
請參閱 [Android Java Gradle 遷移指南][Android Java Gradle migration guide]
或 [flutter doctor --android-licenses 無法執行，因為
    java.lang.UnsupportedClassVersionError - Stack Overflow][so java version]。

[java binary path]: {{site.repo.flutter}}/issues/106416#issuecomment-1522198064
[Android Java Gradle migration guide]: /release/breaking-changes/android-java-gradle-migration-guide
[so java version]: {{site.so}}/questions/75328050/

### `cmdline-tools` component is missing

__這個問題會出現什麼狀況？__

`flutter doctor` 指令會顯示
`cmdline-tools` 在 Android 工具鏈中遺失的錯誤訊息。
例如：

```plaintext noHighlight
[!] Android toolchain - develop for Android devices (Android SDK version 33.0.2)
    • Android SDK at C:\Users\My PC\AppData\Local\Android\sdk
    X cmdline-tools component is missing
```

__說明與建議__

取得 cmdline-tools 最簡單的方式是透過 Android Studio 的 SDK Manager。
請依照以下步驟操作：

1. 在 Android Studio 中，從選單列選擇 **Tools > SDK Manager** 開啟 SDK Manager。
2. 選取最新的 Android SDK（或您的應用程式所需的特定版本）、Android SDK Command-line Tools，以及 Android SDK Build-Tools。
3. 點擊 **Apply** 以安裝所選的元件。

![Android Studio SDK Manager](/assets/images/docs/get-started/install_android_tools.png)

如果您沒有使用 Android Studio，
也可以透過 [sdkmanager][sdkmanager] 命令列工具來下載這些工具。

[sdkmanager]: {{site.android-dev}}/studio/command-line/sdkmanager

## macOS 設定

### SocketException: Send failed, OS Error: No route to host, errno = 65

__這個問題會是什麼樣子？__

在 macOS 上，執行 `flutter run` 指令時會出現如下錯誤：

```plaintext
$ flutter run
Launching lib/main.dart in debug mode...
...
Installing and launching...
Oops; flutter has exited unexpectedly: "SocketException: Send failed (OS Error: No route to host, errno = 65), address = 0.0.0.0, port = 5353".
```

__說明與建議__

此問題與 macOS 權限有關。

要修復此問題，請依照下列步驟操作：

1. 將你的 Flutter SDK 升級到最新版本。

2. 開啟 **系統設定** > **隱私權與安全性** > **本機網路**。
   將你用來啟動 Flutter 應用程式的所有程式碼編輯器與終端機的權限切換為開啟。
   你可能需要重新啟動你的程式碼編輯器、終端機，以及實體裝置。

## 其他問題

### Exit code 69

__這個問題會出現什麼狀況？__

執行 `flutter` 指令時，會出現 "exit code: 69" 錯誤，
如下例所示：

```plaintext
Running "flutter pub get" in flutter_tools...
Resolving dependencies in .../flutter/packages/flutter_tools... (28.0s)
Got TLS error trying to find package test at https://pub.dev/.
pub get failed
command:
".../flutter/bin/cache/dart-sdk/bin/
dart __deprecated_pub --color --directory
.../flutter/packages/flutter_tools get --example"
pub env: {
  "FLUTTER_ROOT": ".../flutter",
  "PUB_ENVIRONMENT": "flutter_cli:get",
  "PUB_CACHE": ".../.pub-cache",
}
exit code: 69
```

__說明與建議__

此問題與網路連線有關。
請嘗試以下步驟進行故障排除：

* 檢查您的網際網路連線。
  請確保您已連接至網際網路，且連線穩定。
* 重新啟動您的裝置，包括電腦與網路設備。
* 嘗試使用 VPN，以協助繞過可能阻止您連線至網路的限制。
* 如果您已嘗試上述所有步驟仍然出現錯誤，請使用 `flutter doctor -v` 指令列印詳細日誌，並在其中一個[社群支援管道][community support channels]尋求協助。

[community support channels]: #社群支援

## 社群支援

Flutter 社群非常熱心且友善。
如果上述建議皆無法解決您的安裝問題，請考慮透過以下其中一個管道尋求協助：

* Reddit 上的 [/r/flutterhelp](https://www.reddit.com/r/flutterhelp/)
* Discord 上的 [/r/flutterdev](https://discord.gg/rflutterdev)，
  特別是此伺服器中的 `install-and-setup` 頻道。
* [StackOverflow][StackOverflow]，
  尤其是標記有 [#flutter][#flutter] 或 [#dart][#dart] 的問題。

為了尊重大家的時間，請在發佈新問題前，先搜尋過往紀錄是否已有類似問題。

[StackOverflow]: {{site.so}}
[#dart]: {{site.so}}/questions/tagged/dart
[#flutter]: {{site.so}}/questions/tagged/flutter
