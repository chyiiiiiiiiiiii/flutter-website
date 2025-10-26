---
title: 將 Windows 專案遷移以設定版本資訊
description: 如何更新 Windows 專案以設定版本資訊
---

{% render docs/breaking-changes.md %}

Flutter 3.3 新增了從 `pubspec.yaml` 檔案，或透過 `--build-name` 與 `--build-number`
建置參數設定 Windows 應用程式版本的支援。更多資訊請參閱
[建置與發佈 Windows 應用程式][Build and release a Windows app] 文件。

在 Flutter 3.3 之前建立的專案需要進行遷移，以支援版本設定。

## 遷移步驟

你可以依照以下步驟更新你的專案：

1. 使用 `flutter --version` 確認你目前的 Flutter 版本為 3.3 或更新版本
2. 如有需要，使用 `flutter upgrade` 將 Flutter SDK（Flutter 軟體開發套件）更新到最新版本
3. 備份你的專案，可以使用 git 或其他版本控制系統
4. 刪除 `windows/runner/CMakeLists.txt` 與 `windows/runner/Runner.rc`
檔案
5. 執行 `flutter create --platforms=windows .`
6. 檢查 `windows/runner/CMakeLists.txt` 與
`windows/runner/Runner.rc` 檔案的變更內容
7. 使用 `flutter build windows` 驗證你的應用程式是否能正常建置

:::note
如果建置時出現以下錯誤訊息，請依照 [run loop 遷移指南][run loop migration guide] 操作

```console
flutter_window.obj : error LNK2019: unresolved external symbol "public: void __cdecl RunLoop::RegisterFlutterInstance(class flutter::FlutterEngine *)" (?RegisterFlutterInstance@RunLoop@@QEAAXPEAVFlutterEngine@flutter@@@Z) referenced in function "protected: virtual bool __cdecl FlutterWindow::OnCreate(void)" (?OnCreate@FlutterWindow@@MEAA_NXZ)
```
:::

## 範例

[PR 721][PR 721] 展示了
[Flutter Gallery][Flutter Gallery] 應用程式的遷移作業。

[Build and release a Windows app]: /deployment/windows#updating-the-apps-version-number
[run loop migration guide]: /release/breaking-changes/windows-run-loop
[PR 721]: {{site.repo.gallery-archive}}/pull/721/files
[Flutter Gallery]: {{site.gallery-archive}}
