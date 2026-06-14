# 將 Windows 專案遷移以支援深色標題列

> 如何更新 Windows 專案以支援深色標題列




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


在 Flutter 3.7 之前建立的專案，即使 Windows 主題為深色模式，標題列仍然是淺色。這些在 Flutter 3.7 之前建立的專案需要進行遷移，以支援深色標題列。

## 遷移步驟

您可以依照以下步驟更新您的專案：

1. 使用 `flutter --version` 確認您的 Flutter 版本為 3.7 或更新版本
2. 如有需要，使用 `flutter upgrade` 將 Flutter SDK 更新至最新版本
3. 備份您的專案，可使用 git 或其他版本控制系統
4. 刪除以下檔案：
    1. `windows/runner/CMakeLists.txt`
    2. `windows/runner/win32_window.cpp`
    3. `windows/runner/win32_window.h`
5. 執行 `flutter create --platforms=windows .`
6. 檢查以下檔案的變更內容：
    1. `windows/runner/CMakeLists.txt`
    2. `windows/runner/win32_window.cpp`
    3. `windows/runner/win32_window.h`
7. 使用 `flutter build windows` 驗證您的應用程式是否可以成功建置

:::note
如果建置時出現以下錯誤訊息，請參考 [run loop migration guide][] 進行處理。

```console
flutter_window.obj : error LNK2019: unresolved external symbol "public: void __cdecl RunLoop::RegisterFlutterInstance(class flutter::FlutterEngine *)" (?RegisterFlutterInstance@RunLoop@@QEAAXPEAVFlutterEngine@flutter@@@Z) referenced in function "protected: virtual bool __cdecl FlutterWindow::OnCreate(void)" (?OnCreate@FlutterWindow@@MEAA_NXZ)
```
:::

## 範例

[PR 862][] 展示了
[Flutter Gallery][] 應用程式的遷移作業。

[run loop migration guide]: /release/breaking-changes/windows-run-loop
[PR 862]: https://github.com/flutter/gallery/pull/862/files
[Flutter Gallery]: https://flutter-gallery-archive.web.app

