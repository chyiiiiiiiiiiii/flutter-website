```markdown
---
title: 將 Windows 專案遷移至慣用的 run loop
description: 如何將 Windows 專案更新為使用慣用的 run loop
---

{% render docs/breaking-changes.md %}

Flutter 2.5 將 Windows 應用程式的 run loop 替換為慣用的 Windows 訊息泵（message pump），以降低 CPU 使用率。

在 Flutter 2.5 之前建立的專案需要進行遷移，才能獲得這項改進。如果你的專案中存在 `windows/runner/run_loop.h` 檔案，請依照下方的遷移步驟進行。

## 遷移步驟

:::note
在本次遷移過程中，你必須重新建立 Windows 專案，這會覆蓋 `windows/runner` 資料夾中的所有自訂變更。下列步驟已包含針對這種情況的說明。
:::

你可以依照以下步驟更新你的專案：

1. 使用 `flutter --version` 確認你目前的 Flutter 版本為 2.5 或更新版本
2. 如有需要，請使用 `flutter upgrade` 將 Flutter SDK（Flutter 軟體開發套件）更新至最新版
3. 使用 git（或你偏好的版本控制系統）備份你的專案，因為你稍後需要重新套用你對專案所做的任何本地變更（如果有的話）
4. 刪除 `windows/runner` 資料夾下的所有檔案
5. 執行 `flutter create --platforms=windows .` 以重新建立 Windows 專案
6. 檢查 `windows/runner` 資料夾中的檔案變更
7. 將本次遷移前對 `windows/runner` 資料夾中檔案所做的自訂變更重新套用
8. 使用 `flutter build windows` 確認你的應用程式可以順利建置
```
