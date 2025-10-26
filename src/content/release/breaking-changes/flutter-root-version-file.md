---
title: $FLUTTER_ROOT/bin/cache/flutter.version.json 取代 $FLUTTER_ROOT/version
description: >-
  已淘汰的 `$FLUTTER_ROOT/version` 工具檔案輸出已被
  `$FLUTTER_ROOT/bin/cache/flutter.version.json` 取代，所有建置腳本或相關引用也必須一併更新。
---

{% render docs/breaking-changes.md %}

## 摘要

`flutter` 工具將不再
輸出 `$FLUTTER_ROOT/version` 中繼資料檔案，
僅會輸出 `$FLUTTER_ROOT/bin/cache/flutter.version.json`。

依賴 `$FLUTTER_ROOT/version`
存在的工具與建置腳本需要進行更新。

## 背景

[在 2023 年][PR 124558]，`$FLUTTER_ROOT/bin/cache/fluttter.version.json` 被新增為
取代 `$FLUTTER_ROOT/version` 的較新檔案格式。

因此，原本看起來像這樣的檔案：

```plaintext title="version"
3.33.0-1.0.pre-1070
```

已被類似以下內容所取代：

```json title="flutter.version.json"
{
  "frameworkVersion": "3.33.0-1.0.pre-1070",
  "channel": "master",
  "repositoryUrl": "unknown source",
  "frameworkRevision": "be9526fbaaaab9474e95d196b70c41297eeda2d0",
  "frameworkCommitDate": "2025-07-22 11:34:11 -0700",
  "engineRevision": "be9526fbaaaab9474e95d196b70c41297eeda2d0",
  "engineCommitDate": "2025-07-22 18:34:11.000Z",
  "engineContentHash": "70fb28dde094789120421d4e807a9c37a0131296",
  "engineBuildDate": "2025-07-22 11:47:42.829",
  "dartSdkVersion": "3.10.0 (build 3.10.0-15.0.dev)",
  "devToolsVersion": "2.48.0",
  "flutterVersion": "3.33.0-1.0.pre-1070"
}
```

同時產生這兩個檔案會造成技術債務。

## 遷移指南

大多數 Flutter 開發者並不會解析或使用這個檔案，但
自訂工具或 CI（持續整合）設定可能會用到。

例如，Flutter 團隊自己的 `api.flutter.dev` 產生腳本：

```dart title="post_processe_docs.dart"
final File versionFile = File('version');
final String version = versionFile.readAsStringSync();
```

已在 [172601][PR 172601] 中更新為：

```dart
final File versionFile = File(path.join(checkoutPath, 'bin', 'cache', 'flutter.version.json'));
final String version = () {
  final Map<String, Object?> json =
      jsonDecode(versionFile.readAsStringSync()) as Map<String, Object?>;
  return json['flutterVersion']! as String;
}();
```

若要暫時讓`$FLUTTER_ROOT/version`繼續被輸出（暫時取消其停止輸出），請執行以下操作：

```sh
flutter config --no-enable-omit-legacy-version-file
```

## 時程表

納入版本：3.33.0-1.0.pre-1416<br>  
穩定版發布：_尚未發布_

在此變更納入後的一個穩定版中，  
`--no-enable-omit-legacy-version-file` 將會被移除。

## 參考資料

相關議題：

- [Issue 171900][Issue 171900]，`FLUTTER_ROOT/version` 預計將被移除

相關 PR：

- [PR 124558][PR 124558]，`flutter.version.json` 被新增為新的格式
- [PR 172601][PR 172601]，展示如何將腳本遷移至使用 `flutter.version.json`

[Issue 171900]: {{site.repo.flutter}}/issues/171900
[PR 124558]: {{site.repo.flutter}}/pull/124558
[PR 172601]: {{site.repo.flutter}}/pull/172601
