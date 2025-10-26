---
title: 將 Windows 專案遷移以確保視窗顯示
description: 如何更新 Windows 專案以確保視窗顯示
---

{% render docs/breaking-changes.md %}

Flutter 3.13 修復了一個[錯誤][bug]，該錯誤可能導致視窗無法顯示。
使用 Flutter 3.7 或 Flutter 3.10 建立的 Windows 專案需要進行遷移，
以修正此問題。

[bug]: {{site.repo.flutter}}/issues/119415

## 遷移步驟

請使用 `flutter --version` 確認你目前使用的是 Flutter 3.13 或更新版本。
如有需要，請使用 `flutter upgrade` 更新至最新版本的
Flutter SDK（Flutter 軟體開發套件）。

尚未修改過 `windows/runner/flutter_window.cpp` 檔案的專案，
將會由 `flutter run` 或 `flutter build windows` 自動完成遷移。

已經修改過 `windows/runner/flutter_window.cpp` 檔案的專案，
則可能需要手動遷移。

遷移前的程式碼：

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

[PR 995][PR 995] 展示了
[Flutter Gallery][Flutter Gallery] 應用程式的遷移作業。

[PR 995]: {{site.repo.gallery-archive}}/pull/995/files
[Flutter Gallery]: {{site.gallery-archive}}
