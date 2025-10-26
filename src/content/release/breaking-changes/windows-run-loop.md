---
title: 將 Windows 專案遷移至慣用的 run loop
description: 如何將 Windows 專案更新為使用慣用的 run loop
---

{% render docs/breaking-changes.md %}

Flutter 2.5 將 Windows 應用程式的 run loop 替換為慣用的 Windows 訊息泵（message pump），以降低 CPU 使用率。

在 Flutter 2.5 之前建立的專案，需要進行遷移才能獲得這項改進。如果你的專案中存在 `windows/runner/run_loop.h` 檔案，請依照以下遷移步驟操作。

## 遷移步驟

:::note
在這次遷移過程中，你必須重新建立 Windows 專案，這會覆蓋 `windows/runner` 目錄下所有檔案的自訂變更。以下步驟已包含針對這種情況的指引。
:::

你可以按照以下步驟更新專案：

1. 使用 `flutter --version` 確認你目前的 Flutter 版本為 2.5 或更新版本
2. 如有需要，使用 `flutter upgrade` 將 Flutter SDK 更新至最新版本
3. 使用 git（或你偏好的版本控制系統）備份你的專案，因為你需要在後續步驟中重新套用任何本地變更（如果有的話）
4. 刪除 `windows/runner` 目錄下的所有檔案
5. 執行 `flutter create --platforms=windows .` 以重新建立 Windows 專案
6. 檢查 `windows/runner` 目錄下檔案的變更內容
7. 將這次遷移前對 `windows/runner` 目錄下檔案的自訂變更重新套用
8. 使用 `flutter build windows` 確認你的應用程式可以成功建置
