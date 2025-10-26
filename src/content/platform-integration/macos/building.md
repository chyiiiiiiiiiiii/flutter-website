---
title: 使用 Flutter 建置 macOS 應用程式
description: 使用 Flutter 為 macOS 建置應用程式時需注意的平台專屬事項。
shortTitle: macOS 開發
---

本頁將說明使用 Flutter 建置 macOS 應用程式時的專屬考量，包括 shell 整合，以及透過 Apple Store 發佈 macOS 應用程式的相關事項。

## 與 macOS 外觀與操作體驗整合

雖然你可以使用任何視覺風格或主題來建置 macOS 應用程式，但你可能會希望讓你的應用程式更貼近 macOS 的外觀與操作體驗。Flutter 內建了 [Cupertino] 元件 (Widgets) 集合，提供符合當前 iOS 設計語言的一系列元件。這些元件中有許多（例如滑桿、切換開關和分段控制器）同樣適合在 macOS 上使用。

另外，你也可以考慮使用 [macos_ui][macos_ui] 套件。這個套件提供實作 macOS 設計語言的元件與主題，包括 `MacosWindow` 框架與 scaffold、工具列、下拉與彈出按鈕，以及模態對話框等。

[Cupertino]: /ui/widgets/cupertino
[macos_ui]: {{site.pub}}/packages/macos_ui

## 建置 macOS 應用程式

你可以選擇[透過 macOS App Store 發佈你的應用程式][distribute it through the macOS App Store]，或直接分發 `.app`（例如從你自己的網站）。如果你要在 macOS App Store 以外分發應用程式，必須先對 macOS 應用程式進行公證（notarize）。

上述兩種流程的第一步，都是在 Xcode 中操作你的應用程式。若要能在 Xcode 內編譯你的應用程式，首先需要使用 `flutter build` 指令將應用程式建置為發行版本，然後開啟 Flutter 的 macOS Runner 應用程式。

```bash
flutter build macos
open macos/Runner.xcworkspace
```

進入 Xcode 之後，請依照 Apple 的
[macOS 應用程式公證相關文件][documentation on notarizing macOS Applications]，
或
[透過 App Store 發佈應用程式相關文件][on distributing an application through the App Store]
進行操作。
你也應該閱讀下方的
[macOS 專屬支援](#權限-entitlements-與-app-sandbox)
章節，以瞭解權限（entitlements）、App Sandbox 以及 Hardened Runtime
如何影響你的可發佈應用程式。

[建置與發佈 macOS 應用程式][Build and release a macOS app] 提供了更詳細的
逐步教學，說明如何將 Flutter 應用程式發佈到 App Store。

[distribute it through the macOS App Store]: {{site.apple-dev}}/macos/submit/
[documentation on notarizing macOS Applications]:{{site.apple-dev}}/documentation/xcode/notarizing_macos_software_before_distribution
[on distributing an application through the App Store]: https://help.apple.com/xcode/mac/current/#/dev067853c94
[Build and release a macOS app]: /deployment/macos

## 權限（Entitlements）與 App Sandbox

macOS 專案預設會進行簽章，
並啟用 App Sandbox。
這表示如果你希望讓 macOS 應用程式具備特定
能力或服務，例如：

* 存取網際網路
* 從內建相機擷取影片與圖片
* 存取檔案

那麼你必須在 Xcode 中設定特定的 _權限（entitlements）_。
以下章節將說明如何進行設定。

### 設定權限（entitlements）

管理 sandbox 設定是在
`macos/Runner/*.entitlements` 檔案中完成。編輯
這些檔案時，不應移除原有的
`Runner-DebugProfile.entitlements` 例外設定
（這些例外支援傳入網路連線與 JIT），
因為這對 `debug` 和 `profile`
模式的正確運作是必要的。

如果你習慣透過
**Xcode 的 capabilities UI** 管理權限檔案，請注意 capabilities
編輯器只會更新兩個檔案中的其中一個，或在某些情況下，會建立全新的權限檔案，並將專案切換為所有組態都使用該檔案。
這兩種情況都可能導致問題。我們建議你
直接編輯檔案。除非有非常特別的理由，否則應該對兩個檔案進行相同的修改。

如果你保留啟用 App Sandbox（若你計劃將應用程式發佈到 [App Store][App Store] 則為必要），
當你新增某些套件（plugin）或其他原生功能時，就需要為你的應用程式管理權限。
例如，使用 [`file_chooser`][`file_chooser`] 套件
時，必須新增
`com.apple.security.files.user-selected.read-only` 或
`com.apple.security.files.user-selected.read-write` 權限。
另一個常見的權限是
`com.apple.security.network.client`，
如果你的應用程式有任何網路請求，就必須新增此權限。

例如，若沒有 `com.apple.security.network.client` 權限，
網路請求會失敗，並出現類似以下的訊息：

```console
flutter: SocketException: Connection failed
(OS Error: Operation not permitted, errno = 1),
address = example.com, port = 443
```

:::important
`com.apple.security.network.server` 權限（entitlement）允許傳入網路連線，預設僅針對 `debug` 和 `profile` 建置啟用，以便 Flutter 工具與執行中的應用程式之間進行通訊。如果你的應用程式需要允許傳入的網路請求，你必須同時在 `Runner-Release.entitlements` 中新增 `com.apple.security.network.server` 權限，否則你的應用程式在 debug 或 profile 測試時可以正常運作，但在 release 建置時將會失敗。
:::

如需更多相關資訊，請參閱 Apple Developer 網站上的 [App Sandbox][App Sandbox] 與 [Entitlements][Entitlements]。

[App Sandbox]: {{site.apple-dev}}/documentation/security/app_sandbox
[App Store]: {{site.apple-dev}}/app-store/submissions/
[Entitlements]: {{site.apple-dev}}/documentation/bundleresources/entitlements
[`file_chooser`]: {{site.github}}/google/flutter-desktop-embedding/tree/master/plugins/file_chooser

## 強化執行環境（Hardened Runtime）

如果你選擇在 App Store 以外發佈你的應用程式，則需要對你的應用程式進行公證（notarize），以確保與 macOS 相容。這需要啟用 Hardened Runtime（強化執行環境）選項。啟用後，你必須擁有有效的簽署憑證才能進行建置。

預設情況下，entitlements 檔案允許 debug 建置使用 JIT，但如同 App Sandbox，你可能需要管理其他權限（entitlements）。如果同時啟用了 App Sandbox 與 Hardened Runtime，則可能需要針對同一資源新增多個權限。例如，麥克風存取權就同時需要 `com.apple.security.device.audio-input`（針對 Hardened Runtime）以及 `com.apple.security.device.microphone`（針對 App Sandbox）。

如需更多相關資訊，請參閱 Apple Developer 網站上的 [Hardened Runtime][Hardened Runtime]。

[Hardened Runtime]: {{site.apple-dev}}/documentation/security/hardened_runtime
