---
title: Flutter 1.20.0 發行說明
shortTitle: 1.20.0 發行說明
description: Flutter 1.20.0 的發行說明。
---

##  依標籤彙總的已合併 Pull Request

### `flutter/flutter` 依標籤彙總的已合併 PR

#### tool - 共 435 個 pull request

[50581](https://github.com/flutter/flutter/pull/50581) 為 `devices` 指令實作 --machine 旗標 (cla: yes, tool)

[51126](https://github.com/flutter/flutter/pull/51126) [flutter_tools] 修正包含 watchOS companion app 專案的建置問題 (cla: yes, tool)

[52507](https://github.com/flutter/flutter/pull/52507) 啟用 avoid_equals_and_hash_code_on_mutable_classes (a: tests, cla: yes, d: examples, f: cupertino, f: material design, framework, team, team: gallery, tool, waiting for tree to go green)

[52791](https://github.com/flutter/flutter/pull/52791) 從 gradle.properties 讀取自訂 app 專案名稱 (cla: yes, team, tool)

[53374](https://github.com/flutter/flutter/pull/53374) [gen_l10n] 未翻譯訊息的備援機制 (a: internationalization, cla: yes, team, tool, waiting for tree to go green)

[53381](https://github.com/flutter/flutter/pull/53381) Characters 套件 (a: text input, cla: yes, f: material design, framework, team, tool, waiting for tree to go green)

[53422](https://github.com/flutter/flutter/pull/53422) 將 API 文件中的 GPU 執行緒名稱改為 raster 執行緒 (a: tests, cla: yes, framework, team, tool, waiting for tree to go green)

[53600](https://github.com/flutter/flutter/pull/53600) 重構 Windows app 範本 (cla: yes, team, tool)

[53715](https://github.com/flutter/flutter/pull/53715) 支援舊版與新版 git 發行標籤格式 (cla: yes, tool)

[53765](https://github.com/flutter/flutter/pull/53765) [flutter_tools] 重新啟用 debug extension (cla: yes, tool, waiting for tree to go green)

[53773](https://github.com/flutter/flutter/pull/53773) [flutter_tools] 精確移除 shared 目錄下的輸出檔案 (cla: yes, tool, waiting for tree to go green)

[53785](https://github.com/flutter/flutter/pull/53785) [flutter_tools] 若未定義 pluginClass，則不產生 native registrant 類別 (cla: yes, tool, waiting for tree to go green)

[53809](https://github.com/flutter/flutter/pull/53809) [flutter_tools] 升級至 vm_service 套件：electric boogaloo (cla: yes, team, tool)

[53824](https://github.com/flutter/flutter/pull/53824) [gen_l10n] 為 Web 新增延遲載入選項 (a: internationalization, cla: yes, team, tool, waiting for tree to go green)

[53848](https://github.com/flutter/flutter/pull/53848) [flutter_tools] 不再計算已知資源的雜湊值 (cla: yes, tool)

[53853](https://github.com/flutter/flutter/pull/53853) [flutter_tools] 移除 App.framework 產生的間接層 (cla: yes, tool)

[53859](https://github.com/flutter/flutter/pull/53859) [flutter_tools] 將 SkSL 檔案寫入本地檔案 (cla: yes, tool)

[53868](https://github.com/flutter/flutter/pull/53868) [gen_l10n] 新增 scriptCode 處理 (a: internationalization, cla: yes, severe: new feature, team, tool)

[53876](https://github.com/flutter/flutter/pull/53876) 更新 Windows 與 Linux plugin 範本 (cla: yes, tool)

[53882](https://github.com/flutter/flutter/pull/53882) 移除 GitHub reporter 相似議題 URL 的縮網址功能 (a: triage improvements, cla: yes, tool)

[53902](https://github.com/flutter/flutter/pull/53902) [flutter_tools] 使用 'v' 啟動 DevTools (cla: yes, tool, waiting for tree to go green)

[53928](https://github.com/flutter/flutter/pull/53928) [macos] build: 新增 build-number 與 build-name 參數 (cla: yes, tool, waiting for tree to go green)

[53936](https://github.com/flutter/flutter/pull/53936) 清理傳送至 GitHub crash reporter 的錯誤訊息 (a: triage improvements, cla: yes, tool)

[53944](https://github.com/flutter/flutter/pull/53944) [flutter_tools] 更新資產清單，改用 package_config 取代 package_map (cla: yes, tool)

[53949](https://github.com/flutter/flutter/pull/53949) [flutter_tools] 也監聽 web stderr stream (cla: yes, tool)

[53951](https://github.com/flutter/flutter/pull/53951) 還原 "[flutter_tools] 升級至 vm_service 套件：electric boogaloo" (cla: yes, team, tool)

[53954](https://github.com/flutter/flutter/pull/53954) [gen_l10n] 修正翻譯訊息的複數解析 (a: internationalization, cla: yes, team, tool, waiting for tree to go green)

[53956](https://github.com/flutter/flutter/pull/53956) 還原 "[flutter_tools] 精確移除 shared 目錄下的輸出檔案" (cla: yes, tool)

[53957](https://github.com/flutter/flutter/pull/53957) [flutter_tools] 遷移至 vm service 3（重推）：electric boogaloo (cla: yes, team, tool)

[53960](https://github.com/flutter/flutter/pull/53960) [flutter_tools] 在執行 hot reload 前刷新 VM 狀態 (cla: yes, tool, waiting for tree to go green)

[53962](https://github.com/flutter/flutter/pull/53962) [flutter_tools] 精確移除 shared 目錄下的輸出檔案 (cla: yes, tool)

[54083](https://github.com/flutter/flutter/pull/54083) 新增使用 WebSockets 作為 web debug proxy 的開關 (cla: yes, tool, waiting for tree to go green)

[54114](https://github.com/flutter/flutter/pull/54114) 還原 "[flutter_tools] 遷移至 vm service 3（重推）：electric boogaloo" (cla: yes, team, tool)

[54123](https://github.com/flutter/flutter/pull/54123) [flutter_tools] devfs 傳輸壓縮使用 gzip level 1 (cla: yes, tool, waiting for tree to go green)

[54131](https://github.com/flutter/flutter/pull/54131) flutter/flutter 1.17.0-dev.3.1 cherrypicks (CQ+1, cla: yes, framework, tool)

[54132](https://github.com/flutter/flutter/pull/54132) [flutter_tools] 遷移至 package:vm_service 4：trigonometric boogaloo (cla: yes, team, tool)

[54133](https://github.com/flutter/flutter/pull/54133) [flutter_tools] 確保工具在 Windows 上能找到 SDK manager (cla: yes, tool, waiting for customer response)

[54152](https://github.com/flutter/flutter/pull/54152) [flutter_tools] 從測試中移除 fromPlatform (cla: yes, team, tool, waiting for tree to go green)

[54154](https://github.com/flutter/flutter/pull/54154) 將 iOS 模擬器 log 讀取器轉為 simctl，並使用統一的日誌過濾器 (cla: yes, platform-ios, tool, waiting for tree to go green)

[54176](https://github.com/flutter/flutter/pull/54176) 修正新報告的 prefer_const_constructors lint 問題 (a: internationalization, cla: yes, d: examples, team, tool)

[54185](https://github.com/flutter/flutter/pull/54185) [gen_l10n] 處理字串中的單引號、雙引號與 $ 符號 (cla: yes, team, tool, waiting for tree to go green)

[54208](https://github.com/flutter/flutter/pull/54208) [flutter_tools] 遷移 engine 位置檢查 (a: null-safety, cla: yes, tool)

[54217](https://github.com/flutter/flutter/pull/54217) 修正 flutter doctor 與 usage 的 `frameworkVersionFor` (cla: yes, tool, waiting for tree to go green)

[54228](https://github.com/flutter/flutter/pull/54228) [flutter_tools] 允許傳遞非 config 輸入 (cla: yes, tool)

[54233](https://github.com/flutter/flutter/pull/54233) [flutter_tools] 若資產檔案缺失則建置失敗 (cla: yes, tool)

[54294](https://github.com/flutter/flutter/pull/54294) [flutter_tools] 移除多餘的相同 repo 檢查 (cla: yes, tool)

[54299](https://github.com/flutter/flutter/pull/54299) [flutter_tools] 將 devfs web 遷移至 package_config (a: null-safety, cla: yes, tool)

[54301](https://github.com/flutter/flutter/pull/54301) [flutter_tools] 移除 packageMap 用法並更新 package_config (a: null-safety, cla: yes, tool)

[54313](https://github.com/flutter/flutter/pull/54313) [flutter_tools] 修正 routing 測試 (cla: yes, tool)

[54314](https://github.com/flutter/flutter/pull/54314) [gen_l10n] 擴充整合測試 (a: internationalization, cla: yes, tool, waiting for tree to go green)

[54320](https://github.com/flutter/flutter/pull/54320) [flutter_tools] 讓 macOS 詳細建置資訊實際可見 (cla: yes, tool)

[54328](https://github.com/flutter/flutter/pull/54328) [flutter_tools] apk 使用新的輸出路徑 (cla: yes, tool, waiting for tree to go green)

[54337](https://github.com/flutter/flutter/pull/54337) [flutter_tools] 將 service 方法移至 VmService 擴充方法 (cla: yes, tool)

[54374](https://github.com/flutter/flutter/pull/54374) [flutter_tools] 基準測試切換為 isolate runnable (cla: yes, tool)

[54389](https://github.com/flutter/flutter/pull/54389) [flutter_tools] 在 devices 測試中停用快取 (cla: yes, tool)

[54407](https://github.com/flutter/flutter/pull/54407) 在 settings.gradle 中不匯入不支援 android 的 plugin (a: accessibility, cla: yes, d: examples, team, tool, waiting for tree to go green)

[54414](https://github.com/flutter/flutter/pull/54414) [flutter_tools] 嘗試修正 benchmark mode 測試 (cla: yes, tool)

[54428](https://github.com/flutter/flutter/pull/54428) 將 .last_build_id 加入 gitignore (cla: yes, tool, waiting for tree to go green)

[54467](https://github.com/flutter/flutter/pull/54467) [flutter_tools] 編譯流程改用 package config (a: null-safety, cla: yes, tool)

[54478](https://github.com/flutter/flutter/pull/54478) 修正 doctor_test 的環境變數外洩 (cla: yes, team, team: flakes, team: infra, tool)

[54488](https://github.com/flutter/flutter/pull/54488) 從 iOS 專案檔案移除 Finder 擴充屬性 (cla: yes, platform-ios, tool)

[54555](https://github.com/flutter/flutter/pull/54555) [flutter_tools] 將 FlutterManifest 重構為無 context (cla: yes, tool, waiting for tree to go green)

[54613](https://github.com/flutter/flutter/pull/54613) [flutter_tools] flutter analyze 支援 enable-experiment (a: null-safety, cla: yes, tool, waiting for tree to go green)

[54617](https://github.com/flutter/flutter/pull/54617) [flutter_tools] 初步支援 enable experiment、run、apk、ios、macos (a: null-safety, cla: yes, team, tool)

[54645](https://github.com/flutter/flutter/pull/54645) 移除過時的 build_runner 指令說明 (cla: yes, tool, waiting for tree to go green)

[54679](https://github.com/flutter/flutter/pull/54679) [flutter_tools] 處理 Windows 上空的 gzip 檔案 (cla: yes, tool)

[54682](https://github.com/flutter/flutter/pull/54682) [flutter_tools] coverage collector 改用 vmservice api (cla: yes, tool, waiting for tree to go green)

[54691](https://github.com/flutter/flutter/pull/54691) 遷移 Runner 專案的 base 設定 (cla: yes, d: examples, t: xcode, team, tool)

[54692](https://github.com/flutter/flutter/pull/54692) [flutter_tools] 同時支援 machine 與 coverage（真正可用）(cla: yes, tool, waiting for tree to go green)

[54700](https://github.com/flutter/flutter/pull/54700) [flutter_tools] 移除 runFromSource，將 runInView 移至 vm_service 擴充 (cla: yes, tool, waiting for tree to go green)

[54715](https://github.com/flutter/flutter/pull/54715) [flutter_tools] 支援 any 作為特殊 web-hostname (cla: yes, tool, waiting for tree to go green)

[54717](https://github.com/flutter/flutter/pull/54717) [flutter_tools] fallback 測試時不流逝真實時間 (cla: yes, tool)

[54756](https://github.com/flutter/flutter/pull/54756) 修正／設定 mocks 預設值 (cla: yes, tool, waiting for tree to go green)

[54783](https://github.com/flutter/flutter/pull/54783) [flutter_tools] 修正 roll dev script，新增測試 (cla: yes, team, tool, waiting for tree to go green)

[54786](https://github.com/flutter/flutter/pull/54786) [flutter_tools] 修正 flutterVersion、flutterMemoryInfo 的回應格式 (cla: yes, tool)

[54805](https://github.com/flutter/flutter/pull/54805) [flutter_tools] 不要壓制 re-entrant macos build 的分析數據 (cla: yes, tool, waiting for tree to go green)

[54881](https://github.com/flutter/flutter/pull/54881) 為 Windows 範本新增 COM 初始化 (cla: yes, tool)

[54884](https://github.com/flutter/flutter/pull/54884) [flutter_tools] 子指令說明文字中提供全域選項 (cla: yes, tool)

[54909](https://github.com/flutter/flutter/pull/54909) [flutter_tools] 修正 flutter tooling 與 web 的多重 defines 問題 (cla: yes, team, tool)

[54912](https://github.com/flutter/flutter/pull/54912) 將 doctor 移至 globals (cla: yes, team, tool)

[54916](https://github.com/flutter/flutter/pull/54916) 表達式運算例外轉為錯誤 (cla: yes, team, tool, waiting for tree to go green)

[54918](https://github.com/flutter/flutter/pull/54918) [flutter_tools] 確保 EventPrinter 能處理 null parent (cla: yes, tool, waiting for tree to go green)

[54920](https://github.com/flutter/flutter/pull/54920) [flutter_tools] 移除 vm_service 方法的 Isolate 實作 (cla: yes, tool)

[54923](https://github.com/flutter/flutter/pull/54923) [flutter_tools] 預設啟用 tree-shake-icons 並提升效能 (cla: yes, tool)

[54924](https://github.com/flutter/flutter/pull/54924) CrashReportSender 相依性注入 (cla: yes, team, tool)

[54959](https://github.com/flutter/flutter/pull/54959) 修正包含 watchOS companion 的專案 flutter run 問題 (cla: yes, tool)

[54967](https://github.com/flutter/flutter/pull/54967) 還原 "[flutter_tools] 修正 flutter tooling 與 web 的多重 defines 問題" (cla: yes, team, tool)

[54973](https://github.com/flutter/flutter/pull/54973) [flutter_tools] 再次修正多重 dart defines (cla: yes, team, tool)

[54987](https://github.com/flutter/flutter/pull/54987) git pull --ff-only (cla: yes, tool, waiting for tree to go green)

[54989](https://github.com/flutter/flutter/pull/54989) 支援 armv7s 架構 (cla: yes, platform-ios, tool)

[55002](https://github.com/flutter/flutter/pull/55002) 將 GitHubTemplateCreator 移至 reporting 函式庫 (cla: yes, team, tool)

[55003](https://github.com/flutter/flutter/pull/55003) 新增啟用 Web 表達式運算的旗標 (cla: yes, tool)

[55012](https://github.com/flutter/flutter/pull/55012) vm service 重構再進化 (cla: yes, tool)

[55085](https://github.com/flutter/flutter/pull/55085) [flutter_tools] 檢查是否有定義 requireloader (cla: yes, tool, waiting for tree to go green)

[55125](https://github.com/flutter/flutter/pull/55125) 美化 flutter web bootstrap 檔案 (cla: yes, tool)

[55141](https://github.com/flutter/flutter/pull/55141) testWidgets 支援 tags (a: tests, cla: yes, framework, tool, waiting for tree to go green)

[55152](https://github.com/flutter/flutter/pull/55152) 從命令列執行測試時支援 tags (cla: yes, team, tool)

[55160](https://github.com/flutter/flutter/pull/55160) [flutter_tools] 重構 Chrome 啟動邏輯，移除 globals/statics (cla: yes, tool)

[55187](https://github.com/flutter/flutter/pull/55187) [flutter_tools] 將 windows 遷移至 assemble (cla: yes, tool)

[55212](https://github.com/flutter/flutter/pull/55212) [flutter_tools] 修正 symbolize 的型別錯誤 (cla: yes, tool, waiting for tree to

