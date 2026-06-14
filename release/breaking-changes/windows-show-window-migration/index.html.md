# 將 Windows 專案遷移以確保視窗顯示

> 如何更新 Windows 專案以確保視窗顯示




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


Flutter 3.13 修正了一個[錯誤][bug]，該錯誤可能導致視窗無法顯示。
使用 Flutter 3.7 或 Flutter 3.10 建立的 Windows 專案需要進行遷移，
以修復此問題。

[bug]: https://github.com/flutter/flutter/issues/119415

## 遷移步驟

請使用 `flutter --version` 確認你目前的 Flutter 版本為 3.13 或更新版本。
如有需要，請使用 `flutter upgrade` 將 Flutter SDK（Flutter 軟體開發套件）更新至最新版。

尚未修改過 `windows/runner/flutter_window.cpp` 檔案的專案，
將會由 `flutter run` 或 `flutter build windows` 自動完成遷移。

若專案已修改過 `windows/runner/flutter_window.cpp` 檔案，
則可能需要手動進行遷移。

遷移前的程式碼如下：

```cpp
flutter_controller_->engine()->SetNextFrameCallback([&]() {
  this->Show();
});
```

遷移後的程式碼：

```cpp
flutter_controller_->engine()->SetNextFrameCallback([&]() {
  this->Show();
});

// Flutter can complete the first frame before the "show window" callback is
// registered. The following call ensures a frame is pending to ensure the
// window is shown. It is a no-op if the first frame hasn't completed yet.
flutter_controller_->ForceRedraw();
```

## 範例

[PR 995][] 展示了
[Flutter Gallery][] 應用程式的遷移作業。

[PR 995]: https://github.com/flutter/gallery/pull/995/files
[Flutter Gallery]: https://flutter-gallery-archive.web.app

