---
title: 移除 AssetManifest.json
description: >-
    建置後的 Flutter 應用程式將不再包含 AssetManifest.json 資源檔案。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter 應用程式曾包含名為 `AssetManifest.json` 的資源檔案。
此檔案實際上包含了一份資源清單。
應用程式程式碼可以透過 [`AssetBundle`][`AssetBundle`] API 來讀取它，
以便在執行期間判斷有哪些資源可用。

`AssetManifest.json` 檔案屬於未公開的實作細節。
目前 Flutter 框架已不再使用它，並計畫在未來的 Flutter 版本中停止產生此檔案。
如果您的應用程式程式碼需要取得可用資源的清單，
請改用 [`AssetManifest`][`AssetManifest`] API。

## 移轉指南

### 從 Flutter 應用程式程式碼讀取資源清單

之前：

```dart
import 'dart:convert';
import 'package:flutter/services.dart';

void readAssetList() async {
  final assetManifestContent = await rootBundle.loadString('AssetManifest.json');
  final decodedAssetManifest =
      json.decode(assetManifestContent) as Map<String, Object?>;
  final assets = decodedAssetManifest.keys.toList().cast<String>();
}
```

After:

```dart
import 'package:flutter/services.dart';

void readAssetList() async {
  final assetManifest = await AssetManifest.loadFromAssetBundle(rootBundle);
  final assets = assetManifest.listAssets();
}
```

### 從 Flutter 應用程式外部的 Dart 程式碼讀取資源清單資訊

`flutter` 命令列介面 (Command Line Interface) 工具會產生一個新檔案 `AssetManifest.bin`。
這取代了 `AssetManifest.json`。
這個檔案包含與 `AssetManifest.json` 相同的資訊，
但格式不同。
如果你需要從不是 Flutter 應用程式的程式碼中讀取這個檔案，因此無法使用 [`AssetManifest`][`AssetManifest`] API，
你仍然可以自行解析這個檔案。

可以使用 [`standard_message_codec`][`standard_message_codec`] 套件來解析其內容。

```dart
import 'dart:io';
import 'dart:typed_data';

import 'package:standard_message_codec/standard_message_codec.dart';

void main() {
  // The path to AssetManifest.bin depends on the target platform.
  final pathToAssetManifest = './build/web/assets/AssetManifest.bin';
  final manifest = File(pathToAssetManifest).readAsBytesSync();
  final decoded = const StandardMessageCodec()
      .decodeMessage(ByteData.sublistView(manifest));
  final assets = decoded.keys.cast<String>().toList();
}
```

請注意，`AssetManifest.bin` 是 Flutter 的實作細節。
讀取此檔案並不是官方支援的工作流程。
該檔案的內容或格式在未來的 Flutter 版本中可能會有所變動，且不會另行公告。

## 時程

`AssetManifest.json` 將自 3.19 之後的第四個穩定版，或 3.19 發布一年後（以較晚者為準）起，不再產生。

## 參考資料

相關議題：

* 當建置 Flutter 應用程式時，flutter 工具會產生一個
  `AssetManifest.json` 檔案，但該檔案並未被框架使用 [(Issue #143577)][(Issue #143577)]

相關 PR：

* [移除已棄用的 `AssetManifest.json` 檔案][PR 172594]

[`AssetBundle`]: {{site.api}}/flutter/services/AssetBundle-class.html
[`AssetManifest`]: {{site.api}}/flutter/services/AssetManifest-class.html
[(Issue #143577)]: {{site.repo.flutter}}/issues/143577
[`standard_message_codec`]: {{site.pub-pkg}}/standard_message_codec
[PR 172594]: {{site.repo.flutter}}/pull/172594
