---
title: Flutter 3.29.0 發行說明
shortTitle: 3.29.0 發行說明
description: Flutter 3.29.0 的發行說明。
---

本頁為 3.29.0 版本的發行說明。
如需後續錯誤修正版本的資訊，
請參閱 Flutter [CHANGELOG][CHANGELOG]。

[CHANGELOG]: {{site.repo.flutter}}/blob/main/CHANGELOG.md

## Flutter 框架

### 框架

* 移除 `gradle_deprecated_settings` 測試應用，並從 lockfile 排除 yaml 中移除相關引用 by @gmackall in 161622
* 檢查 stocks app 的在地化檔案是否為最新 by @goderbauer in 161608
* [deps] 移除不再使用的 repo 相依套件 by @devoncarew in 161605
* 修正 `showLicensePage` 未繼承環境中的 `Theme` by @TahaTesser in 161599
* 將 Packages 從 3c3bc6832b39 滾動到 d1fd6232ec33（4 次修訂）by @engine-flutter-autoroll in 161597
* 移除未使用的方法 by @robert-ancell in 161572
* 為 3.27.2 版本更新 changelog by @christopherfujino in 161569
* Dart 滾動至 3.7.0-323.0.dev 版本 by @a-siva in 161567
* 為 3.27.2 版本更新 changelog by @christopherfujino in 161566
* 以 `gclient sync` 取代 `fetch `。by @matanlurey in 161565
* [Impeller] 修正 AHB swapchains 問題 by @jonahwilliams in 161562
* 最後一次 Engine<>Framework lint 同步 by @goderbauer in 161560
* 還原「將 CupertinoPageTransitionsBuilder 動畫時長與 CupertinoPageRoute 對齊 (#160241)」by @auto-submit[bot] in 161555
* [DisplayList] 移除 DL utils 中已過時的 Skia 幾何物件用法 by @flar in 161553
* 將 `Mac_mokey microbenchmarks` 標記為 flakey by @jtmcdole in 161550
* 使用萬用字元 by @goderbauer in 161548
* [canvaskit] 修正 GIF 解碼失敗問題 by @harryterkelsen in 161536
* 將 `linux_host_engine` 複製為 `linux_host_engine_test`，移除 `archives: [...]`。by @matanlurey in 161532
* 移除最後兩個 Cirrus CI 的引用 by @matanlurey in 161530
* 移除對 `cirrus` 的引用，主要在文件註解中 by @matanlurey in 161529
* 為 CupertinoSheetRoute 新增 route settings by @MitchellGoodwin in 161528
* 移除 `WEB_SHARD_COUNT`，該項目在 Cirrus 移除後已不存在 by @matanlurey in 161527
* 更新套件修訂至最新版 by @bkonyi in 161525
* [flutter_releases] Flutter stable 3.27.2 Framework Cherrypicks by @christopherfujino in 161524
* 將 Packages 從 65547511c004 滾動到 3c3bc6832b39（16 次修訂）by @engine-flutter-autoroll in 161515
* 修正執行 clang-tidy 處理 git diffs 時的路徑問題 by @flar in 161496
* [SwiftPM] 讓 'flutter build ios-framework' 產生空的 Package.swift by @loic-sharma in 161464
* 將 DisplayList 單元測試遷移至 DL/Impeller 幾何類別 by @flar in 161453
* 當 `flutter drive` 被呼叫時傳遞環境變數 by @matanlurey in 161452
* 釐清 context menu button callback 的文件 by @justinmc in 161451
* 更明確說明如何使用 `flutter drive`/其作用 by @matanlurey in 161450
* [android_engine_test] 移除 surface texture trampoline 測試中的 background/foreground by @jonahwilliams in 161441
* [Impeller] 移除 SurfaceControl 測試的 API 30 限制 by @jonahwilliams in 161438
* FixForward：方法已重新命名 by @jtmcdole in 161431
* 更新 InputDecoration.border 文件說明 by @bleroux in 161415
* [Engine] 支援非對稱圓角超橢圓 by @dkwingsmt in 161409
* 更新 third_party 目錄相關文件說明 by @jtmcdole in 161407
* 將 analyzer_benchmark 移至 Mac arm64 devicelab bots by @jason-simmons in 161405
* integration_test：將 golden image 加入 gitignore by @cbracken in 161404
* 修正 CONTRIBUTING.md 中 engine docs 連結 by @goderbauer in 161401
* 現已無獨立 engine repo by @matanlurey in 161400
* 從 Flutter goldens 移除 Cirrus CI by @matanlurey in 161396
* Dart 滾動至 3.7.0-312.0.dev 版本 by @a-siva in 161394
* 以 `numberOfProcessors` 取代總是省略的 `CPU` 環境變數 by @matanlurey in 161392
* 從我所知的情況下，移除 `CIRRUS_TASK_NAME`，該變數在 `LUCI` 上總是被省略 by @matanlurey in 161391
* 移除一些雜項的 Cirrus 相關引用 by @matanlurey in 161390
* 移除看似已過時的 web Cirrus 及「Web Installer」指引 by @matanlurey in 161389
* 移除未使用的 `accept_android_sdk_licenses.sh` by @matanlurey in 161388
* 將 Packages 從 3fc6b7ace3ff 滾動到 65547511c004（11 次修訂）by @engine-flutter-autoroll in 161379
* 修正於多視窗 Windows Flutter 關閉帶有 `Alt+F4` 的視窗時發生的當機問題 by @hbatagelo in 161375
* [web:a11y] 將空的 tappables 視為按鈕 by @yjbanov in 161360
* 提供螢幕監控資訊 by @robert-ancell in 161359
* 排除 `*texture*` 作為 `a: text input` 的匹配 by @matanlurey in 161354
* [Impeller] 新增 SurfaceControl 測試的選用旗標 by @jonahwilliams in 161353
* 新增虛擬顯示（VD）平台視圖測試，並重構部分測試 by @matanlurey in 161349
* 從 snippet tool 移除 formatter by @goderbauer in 161347
* 更新 Style-guide-for-Flutter-repo.md by @goderbauer in 161344
* [Android] 實際上從發行版本中移除 dev 相依套件 by @camsim99 in 161343
* 還原「[SwiftPM] 為應用遷移新增獨立功能旗標 (#158897)」by @loic-sharma in 161342
* git ignore .ccls-cache by @flar in 161340
* 還原「[SwiftPM] 預設啟用 (#161275)」by @auto-submit[bot] in 161339
* [Impeller] 修正將 GLES 紋理 trampoline 匯入 Vulkan 時的縮放問題 by @jonahwilliams in 161331
* [CP-stable] 還原「修正 keyboardDismissBehavior 在未拖曳時滾動無效」by @victorsanni in 161329
* [Impeller] reland：修正 porterduff shader 並處理 GLES 後端優化後的紋理綁定問題 by @jonahwilliams in 161326
* 還原「[Impeller] Adreno GPU 的 porter duff workaround (#161273)」by @auto-submit[bot] in 161318
* 將 Linux analyzer_benchmark 標記為 flaky by @fluttergithubbot in 161307
* 將 Linux linux_desktop_impeller 標記為 unflaky by @fluttergithubbot in 161302
* 還原「使用 package:uuid 的 uuid 取代 package:usage」by @jiahaog in 161292
* [Impeller] 重新啟用 Adreno 630 by @jonahwilliams in 161287
* Dart 滾動至 3.7.0-307.0.dev 版本 by @a-siva in 161278
* 還原「修正 keyboardDismissBehavior 在未拖曳時滾動無效」by @victorsanni in 161277
* 支援 DDC library bundle 格式並移除 DDC module 格式支援 by @srujzs in 161276
* [SwiftPM] 預設啟用 by @loic-sharma in 161275
* [Impeller] 在 Adreno 630 及更舊機型上停用 input attachment / self dependency by @jonahwilliams in 161274
* [Impeller] Adreno GPU 的 porter duff workaround by @jonahwilliams in 161273
* 讓 `YamlNode` 編碼為 `String` 更為明確 by @matanlurey in 161270
* 離開選取模式時清除選取狀態 by @elliette in 161267
* 將 `native_driver` 重新命名為 `android_{driver_extensions|engine_test}` by @matanlurey in 161263
* 新增 semantics role 與 tab by @chunhtai in 161260
* [Impeller] 在 Adreno 上停用執行時 mipmap 產生 by @jonahwilliams in 161257
* 為 fat width arcs 新增特殊處理 by @gaaclarke in 161255
* [Impeller] 更新 Android 上預覽狀態的 README by @chinmaygarde in 161253
* 調整 `onSurfaceDestroyed` 的時機以符合 `onSurfaceCleanup` by @matanlurey in 161252
* [Impeller] 更新預建產物指引 by @chinmaygarde in 161251
* 將 `.ci.yaml` 的驗證邏輯移至 `flutter/flutter` by @matanlurey in 161249
* [deps] 移除對已封存 repo 的引用 by @devoncarew in 161248
* 將 Packages 從 07ae98c5aff9 滾動到 3fc6b7ace3ff（3 次修訂）by @engine-flutter-autoroll in 161244
* 為驗證 engine Skia Gold 是否正常，標記 golden files by @matanlurey in 161240
* 修正 `create` 指令在 Gradle 或 AGP 版本不相容時重複字串問題 by @kishan-dhankecha in 161223
* 將 engine labeler 移至頂層 by @jmagman in 161212
* 從 `canvas_test.dart` 移除 `verbose: true` by @matanlurey in 161211
* [flutter_tools] 忽略 viewpost ime 及 samsung spam 訊息 by @jonahwilliams in 161199
* 提案棄用 `webGoldenComparator` by @matanlurey in 161196
* [Impeller] 不產生最終 1x1 mip level 以繞過 Adreno GPU 的 bug by @jonahwilliams in 161192
* 以 1 / DPR 比例縮放任何 clip path by @eyebrowsoffire in 161190
* 將 `shellPath` 重新命名為 `flutterTesterBinPath` by @matanlurey in 161189
* 將 `_FlutterTestRunnerImpl` 合併進 `FlutterTestRunner` by @matanlurey in 161188
* [Engine] 當分支不是 `main` 或 `master` 時，讓 `SkiaGoldClient` 成為 NOP by @matanlurey in 161187
* 為 monorepo 更新 engine 指引 by @justinmc in 161184
* 更新 golden canary by @Piinks in 161183
* 更新 eglConfigChoose 錯誤訊息及錯誤條件 by @gaaclarke in 161178
* [CP-stable] 還原「修正 DropdownMenu 在 entries 變更時不會重新匹配 initialSelection」by @nate-thegrate in 161177
* 將 Packages 從 eb7358231e43 滾動到 07ae98c5aff9（29 次修訂）by @engine-flutter-autoroll in 161174
* [Impeller] 以 render ready semaphore 保護 onscreen cmd buffer by @jonahwilliams in 161140
* 修正 README 中 Hot Reload gif 的連結 by @bartekpacia in 161113
* 預設使用 in-tree engine 當使用 `--local-engine` 或 `--local-web-sdk` by @eyebrowsoffire in 161110
* 正規化 color matrix 的 translation 欄位 by @eyebrowsoffire in 161109
* 從 test fixture 中抽取 analyze test 預期結果 by @LongCatIsLooong in 161108
* 移除 normalized 字樣，移除 minimum/maximum by @matanlurey in 161106
* 將 `flutter_template_images` 更新為 `5.0.0` by @matanlurey in 161105
* 使用 package:uuid 的 uuid 取代 package:usage by @devoncarew in 161102
* 更新 repo 以相容 shelf_web_socket v3.0 by @devoncarew in 161101
* 更新當 leading/trailing width 超過 `ListTile` width 時的錯誤訊息，並補上測試 by @TahaTesser in 161091
* [native_assets] 過濾 hook environment by @dcharkes in 161084
* [Android] 將 `.cxx` 目錄加入 app template `.gitignore` by @gmackall in 161069
* 更新 dart-lang/http 至最新版並移除舊版 http_multi_server 引用 by @devoncarew in 161067
* 提升 characters、collection、meta 套件版本 by @goderbauer in 161066
* 將 firebase_release_smoke_test 標記為 unflaky by @jmagman in 161006
* 更新 Create Pull Request GitHub workflow reviewers by @jmagman in 161005
* 將 peter-evans/create-pull-request 從 7.0.5 升級到 7.0.6（all-github-actions group）by @dependabot[bot] in 161001
* 將 hot_mode_dev_cycle_macos_target__benchmark 標記為 unflaky by @jmagman in 161000
* 將 integration_ui_test_test_macos 標記為 unflaky by @jmagman in 160999
* 將 hello_world_macos__compile 標記為 unflaky by @jmagman in 160998
* 將 complex_layout_scroll_perf_macos__timeline_summary 標記為 unflaky by @jmagman in 160997
* 將 animated_complex_opacity_perf_macos__e2e_summary 標記為 unflaky by @jmagman in 160996
* 更新 GitHub URL 以修正 android_semantics_integration_test bringup 失敗 by @jmagman in 160993
* 將 analyzer_benchmark 標記為 unflaky by @jmagman in 160991
* 將 flavors_test_macos 標記為 unflaky by @jmagman in 160990
* 將 platform_channel_sample_test_macos 標記為 unflaky by @jmagman in 160989
* 移除現已不需要的 `felt analyze` 指令 by @matanlurey in 160986
* 手動 pub bump by @g
