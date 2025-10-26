---
title: 安全性
description: >-
  Flutter 團隊的安全性理念與流程概述。
showBreadcrumbs: false
---

Flutter 團隊非常重視 Flutter 及其所創建應用程式的安全性。本頁說明如何回報您發現的任何安全性漏洞，並列出最佳實踐，以降低引入漏洞的風險。

## 安全性理念

Flutter 的安全策略建立在五大支柱之上：

* **識別（Identify）**：透過識別核心資產、主要威脅與漏洞，追蹤並優先處理關鍵安全風險。
* **偵測（Detect）**：利用漏洞掃描、靜態應用程式安全測試與模糊測試等技術與工具，偵測並識別漏洞。
* **防護（Protect）**：透過緩解已知漏洞來消除風險，並保護關鍵資產免受來源威脅。
* **回應（Respond）**：定義回報、分級與回應漏洞或攻擊的流程。
* **復原（Recover）**：建立能力，以在事件發生時將影響降至最低並進行復原。

## 回報漏洞

在回報靜態分析工具發現的安全性漏洞前，請考慮先檢查我們的[已知誤判清單][known false positives]。

請將安全性漏洞回報至
[https://g.co/vulnz](https://g.co/vulnz)，並包含問題描述、您產生該問題的步驟、受影響的版本，以及（若已知）該問題的緩解措施。我們使用 g.co/vulnz 作為回報入口，並在 GitHub 進行協調與揭露（包含使用 GitHub Security Advisory）。Google 安全團隊會在您於 g.co/vulnz 提交報告後 5 個工作天內回覆。

您也可以透過我們的公開 Discord 聊天頻道聯繫團隊；但請務必同時將漏洞回報至 g.co/vulnz，並避免在公開場合透露可能讓用戶處於風險的漏洞資訊。

在我們處理您回報的安全性漏洞時，您可以預期會有密切的合作。若您在上述 5 個工作天內未收到 g.co/vulnz 回覆，請僅在此情況下聯絡 security@flutter.dev。

如需我們處理安全性漏洞的詳細資訊，請參閱我們的[安全政策][security policy]。

[Discord chat channels]: {{site.repo.flutter}}/blob/main/docs/contributing/Chat.md
[known false positives]: /reference/security-false-positives
[security policy]: {{site.repo.flutter}}/security/policy

## 將現有問題標記為安全性相關

如果您認為現有的 GitHub 問題與安全性有關，請同時將該問題回報至 g.co/vulnz，並發送電子郵件至 security@flutter.dev。郵件內容應包含 GitHub 問題 ID 及簡短說明，說明為何該問題應依本安全政策處理。

安全性回報不會在 GitHub 問題資料庫中明確追蹤。我們會使用 GitHub 的安全性公告功能來追蹤未結案的安全性回報。

## 支援的版本

我們承諾會為當前 `stable` 分支上的 Flutter 版本發布安全性更新。

## 處理預期

我們將安全性回報視為 P0 優先等級。這表示我們會盡快修復這些問題。根據我們的發佈時程，若在最新穩定版 SDK 發現重大安全性問題，我們會釋出新的 beta 版本或穩定版 hotfix，以最快的方式進行修復。

針對如 docs.flutter.dev 等 Flutter 網站回報的漏洞，無需發佈新版本，會直接於網站本身修正。

## 漏洞獎勵計畫（Bug Bounty programs）

非 Google 團隊若使用或貢獻 Flutter，也歡迎將 Flutter 納入其漏洞獎勵計畫（Bug Bounty programs）範圍。若您希望將您的計畫列入清單，請聯絡 `security@flutter.dev`。

Google 將 Flutter 納入
[Google 開源軟體漏洞獎勵計畫（Google Open Source Software Vulnerability Reward Program）][google-oss-vrp] 的範圍內。

[google-oss-vrp]: https://bughunters.google.com/open-source-security

## 接收安全性更新

獲取安全性更新的最佳方式是訂閱
[flutter-announce][flutter-announce] 郵件清單，或關注
[Discord 頻道][Discord channel] 的更新。我們也會在技術發佈部落格文章中公告安全性更新。

[Discord channel]: https://discord.gg/BS8KZyg
[flutter-announce]: {{site.groups}}/forum/#!forum/flutter-announce

## 最佳實踐

* **保持 Flutter SDK 為最新版本。**
  我們會定期更新 Flutter，這些更新可能修正先前版本發現的安全性缺陷。

* **保持應用程式相依套件為最新。**
  請確保您[升級套件相依性][upgrade your package dependencies]，以維持相依套件的最新狀態。避免將相依套件鎖定於特定版本；若有鎖定，請定期檢查這些套件是否有安全性更新，並相應更新鎖定版本。

* **保持您的 Flutter 副本為最新。**
  私有或自訂版本的 Flutter 容易落後於官方版本，可能不包含重要的安全性修正與增強功能。建議定期更新您的 Flutter 副本。如果您有針對 Flutter 進行改進，請務必同步更新您的分支，並考慮將您的修改貢獻給社群。

[upgrade your package dependencies]: /install/upgrade

