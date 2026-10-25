# 升級 Flutter

> 學習如何升級 Flutter 以及切換至其他頻道。



無論你追蹤哪一個 Flutter 發行頻道（release channel），你都可以使用 `flutter` 指令來升級你的 Flutter SDK 或應用程式所依賴的套件。

<a id="upgrading-the-flutter-sdk" aria-hidden="true"></a>

## 升級 Flutter SDK

若要更新 Flutter SDK，請使用 `flutter upgrade` 指令：

```console
$ flutter upgrade
```

此指令會取得目前 Flutter channel 上可用的最新 Flutter SDK（Flutter 軟體開發套件）版本。

如果你正在使用 **stable** channel，並希望獲得更近期的 Flutter SDK 版本，請使用 `flutter channel beta` 切換到 **beta** channel，然後執行 `flutter upgrade`。

<a id="keep-informed" aria-hidden="true"></a>

### 保持資訊更新

我們會針對已知的重大變更發布 [遷移指南][migration guides]。

我們也會將這些變更的公告寄送到
[Flutter 公告郵件清單][flutter-announce]。

為了避免未來 Flutter 版本造成破壞，建議你將測試提交到我們的 [測試登錄中心][test registry]。


## 切換 Flutter channel

Flutter 目前有兩個發行 channel：
**stable** 與 **beta**。

### **stable** channel

我們建議新手或正式上線的應用程式使用 **stable** channel。
團隊大約每三個月會更新一次這個 channel。
若遇到高嚴重性或高影響性的問題，這個 channel 也可能會收到臨時修復（hot fix）。

Flutter 團隊的插件與套件在持續整合（CI）時，會針對最新的 **stable** 版本進行測試。

**stable** 分支的最新文件在：<https://api.flutter.dev>

### **beta** channel

**beta** channel 擁有最新的穩定版本。
這是我們經過大量測試的 Flutter 最新版本。
此 channel 已通過我們所有公開測試，並經過使用 Flutter 的 Google 產品測試套件驗證，也經過 [社群貢獻的私有測試套件][test registry] 驗證。
**beta** channel 會定期收到 hot fix，以解決新發現的重要問題。

**beta** channel 基本上與 **stable** channel 相同，但每月更新，而非每季更新。
事實上，當 **stable** channel 更新時，會直接升級到最新的 **beta** 版本。

### 其他 channel

目前我們還有一個 channel，**main**（先前稱為 **master**）。
[貢獻 Flutter 的開發者][contribute to Flutter] 會使用這個 channel。

這個 channel 的測試不如 **beta** 與 **stable** channel 完善。

我們不建議使用這個 channel，因為它更有可能包含嚴重的回歸問題。

**main** 分支的最新文件在：<https://main-api.flutter.dev>

<a id="changing-channels" aria-hidden="true"></a>

### 切換 channel

要查看你目前所使用的 channel，請使用以下指令：

```console
$ flutter channel
```

若要切換至其他頻道，請使用 `flutter channel <channel-name>`。
切換頻道後，請使用 `flutter upgrade`
以下載該頻道的最新 Flutter SDK 及其相依套件。
例如：

```console
$ flutter channel beta
$ flutter upgrade
```

<a id="switching-to-a-specific-flutter-version" aria-hidden="true"></a>

## 切換至特定 Flutter 版本

若要切換至特定的 Flutter 版本，請依照下列步驟操作：

1. 在 [Flutter SDK archive][Flutter SDK archive] 上找到你想要的 **Flutter 版本**。

1. 前往 Flutter SDK：

   ```console
   $ cd /path/to/flutter
   ```

   :::tip
   你可以使用 `flutter doctor --verbose` 來查找 Flutter SDK 的路徑。
   :::

1. 使用 `git checkout` 切換到你想要的 **Flutter 版本**：

   ```console
   $ git checkout <Flutter version>
   ```

<a id="upgrading-packages" aria-hidden="true"></a>

## 升級套件

如果你已經修改了 `pubspec.yaml` 檔案，或是你只想更新應用程式所依賴的套件（而不是同時更新套件和 Flutter 本身），那麼請使用其中一個 `flutter pub` 指令。

若要將 `pubspec.yaml` 檔案中列出的所有相依套件，升級到_最新相容版本_，請使用 `upgrade` 指令：

```console
$ flutter pub upgrade
```

若要將 `pubspec.yaml` 檔案中列出的所有相依套件（dependencies）更新至_最新可用版本_，請使用 `upgrade --major-versions` 指令：

```console
$ flutter pub upgrade --major-versions
```

這也會自動更新 `pubspec.yaml` 檔案中的約束條件（constraints）。

若要識別過時的套件相依性並取得如何更新的建議，請使用 `outdated` 指令。詳情請參閱 Dart [`pub outdated` 文件](https://dart.dev/tools/pub/cmd/pub-outdated)。

```console
$ flutter pub outdated
```

## 疑難排解

### Windows：「檔案名稱過長」錯誤

在 Windows 上執行 `flutter upgrade` 時，你可能會遇到如下錯誤：

```text
error: unable to create file ...: Filename too long
```

這是因為 Flutter SDK 中某個檔案的路徑超過了 Windows 預設的最大路徑長度限制。

若要解決此問題，建議將 Flutter SDK 安裝至較短的路徑。例如，將 Flutter 安裝至
`C:\Flutter`，而非像 `C:\Users\<user name>\Documents\flutter` 這樣較長的路徑。

若無法縮短路徑，請依照下列步驟操作：

1. 在 Git 中啟用長路徑支援：

   ```console
   $ git config --system core.longpaths true
   ```

   若指令因權限錯誤而失敗，請嘗試以系統管理員身份執行終端機。

1. 在 Windows 中啟用長路徑：

   ```console
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```

   此指令需要系統管理員權限。

[Flutter SDK archive]: /install/archive
[flutter-announce]: https://groups.google.com/forum/#!forum/flutter-announce
[pubspec.yaml]: https://dart.dev/tools/pub/pubspec
[test registry]: https://github.com/flutter/tests
[contribute to Flutter]: https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md
[migration guides]: /release/breaking-changes

