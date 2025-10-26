---
title: 升級 Flutter
shortTitle: 升級
description: 學習如何升級 Flutter 以及切換至其他頻道。
---

無論你追蹤的是哪一個 Flutter 發行頻道（release channel），你都可以使用 `flutter` 指令來升級你的 Flutter SDK 或是你的應用程式所依賴的套件。

<a id="upgrading-the-flutter-sdk" aria-hidden="true"></a>

## 升級 Flutter SDK

若要更新 Flutter SDK，請使用 `flutter upgrade` 指令：

```console
$ flutter upgrade
```

此指令會取得你目前 Flutter 頻道上可用的最新 Flutter SDK 版本。

如果你正在使用 **stable**（穩定）頻道，並希望獲得更近期的 Flutter SDK 版本，可以使用 `flutter channel beta` 切換至 **beta**（測試）頻道，然後執行 `flutter upgrade`。

<a id="keep-informed" aria-hidden="true"></a>

### 保持資訊更新

我們會針對已知的重大變更發布 [遷移指南][migration guides]。

我們也會將這些變更的公告發送到
[Flutter 公告郵件清單][flutter-announce]。

為了避免未來 Flutter 版本造成破壞，建議你將測試提交到我們的 [測試註冊表][test registry]。


## 切換 Flutter 頻道

Flutter 有兩個發行頻道：
**stable**（穩定）和 **beta**（測試）。

### **stable**（穩定）頻道

我們建議新手以及用於正式發佈的應用程式選擇 **stable** 頻道。
團隊大約每三個月會更新此頻道一次。
若遇到高嚴重性或高影響力的問題，此頻道也可能會收到臨時修正（hot fix）。

Flutter 團隊的插件與套件持續整合測試（CI）會針對最新的 **stable** 版本進行測試。

**stable** 分支的最新文件位於：<https://api.flutter.dev>

### **beta**（測試）頻道

**beta** 頻道擁有最新的穩定發行版本。
這是我們經過大量測試的 Flutter 最新版本。
此頻道已通過所有公開測試，並已針對使用 Flutter 的 Google 產品測試套件驗證，同時也經過 [社群貢獻的私有測試套件][test registry] 驗證。
**beta** 頻道會定期收到臨時修正（hot fix），以解決新發現的重要問題。

**beta** 頻道本質上與 **stable** 頻道相同，但更新頻率為每月一次，而非每季一次。
事實上，當 **stable** 頻道更新時，會同步到最新的 **beta** 發行版本。

### 其他頻道

目前我們還有另一個頻道，**main**（先前稱為 **master**）。
[貢獻 Flutter 的開發者][contribute to Flutter] 會使用這個頻道。

此頻道的測試不如 **beta** 和 **stable** 頻道嚴格。

我們不建議使用此頻道，因為它更有可能包含嚴重的回歸問題。

**main** 分支的最新文件位於：<https://main-api.flutter.dev>

<a id="changing-channels" aria-hidden="true"></a>

### 切換頻道

要查看你目前所處的頻道，請使用以下指令：

```console
$ flutter channel
```

若要切換到其他頻道，請使用 `flutter channel <channel-name>`。
切換頻道後，請使用 `flutter upgrade`
來下載該頻道最新的 Flutter SDK（Flutter 軟體開發套件）及其相依套件。
例如：

```console
$ flutter channel beta
$ flutter upgrade
```

<a id="switching-to-a-specific-flutter-version" aria-hidden="true"></a>

## 切換至特定 Flutter 版本

若要切換至特定的 Flutter 版本：

1. 在 [Flutter SDK archive][Flutter SDK archive] 上找到你想要的 **Flutter 版本**。

1. 前往 Flutter SDK 目錄：

   ```console
   $ cd /path/to/flutter
   ```

   :::tip
   你可以使用 `flutter doctor --verbose` 來查找 Flutter SDK（Flutter 軟體開發套件）的路徑。
   :::

1. 使用 `git checkout` 切換到你想要的 **Flutter 版本（Flutter version）**：

   ```console
   $ git checkout <Flutter version>
   ```

<a id="upgrading-packages" aria-hidden="true"></a>

## 升級套件

如果你已經修改了 `pubspec.yaml` 檔案，或是你只想更新應用程式所依賴的套件（而不是同時更新套件和 Flutter 本身），那麼請使用其中一個 `flutter pub` 指令。

若要將 `pubspec.yaml` 檔案中列出的所有相依套件，更新到_最新相容版本_，請使用 `upgrade` 指令：

```console
$ flutter pub upgrade
```

若要將 `pubspec.yaml` 檔案中列出的所有相依套件（dependencies）更新到_最新可用版本_，請使用 `upgrade --major-versions` 指令：

```console
$ flutter pub upgrade --major-versions
```

這也會自動更新 `pubspec.yaml` 檔案中的相依條件（constraints）。

若要辨識過時的套件相依性並取得更新建議，請使用 `outdated` 指令。詳情請參閱 Dart [`pub outdated` 文件]({{site.dart-site}}/tools/pub/cmd/pub-outdated)。

```console
$ flutter pub outdated
```

[Flutter SDK archive]: /install/archive  
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce  
[pubspec.yaml]: {{site.dart-site}}/tools/pub/pubspec  
[test registry]: {{site.repo.organization}}/tests  
[contribute to Flutter]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md  
[migration guides]: /release/breaking-changes
