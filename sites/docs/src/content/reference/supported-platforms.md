---
title: 支援的部署平台
shortTitle: 支援的平台
description: Flutter 依平台版本支援的各目標平台。
showBreadcrumbs: false
---

從 Flutter {{site.documentedFlutterVersion}} 開始，
Flutter 支援在以下硬體架構與作業系統版本組合上部署應用程式。
這些組合統稱為 _平台 (platforms)_。

Flutter 將平台分為以下幾類：

* **已支援 (Supported)**：Flutter 團隊提供支援的平台與版本。
* **CI 測試 (CI-tested)**：Flutter 團隊在每次提交時都會測試這些平台。
* **不支援 (Unsupported)**：Flutter 團隊不測試也不支援這些平台。

根據這些分類，
Flutter 支援部署至以下平台。

## 行動裝置平台 {:#mobile-platforms}

<PlatformsGrid>
  <PlatformCard
    name="Android"
    icon="mobile"
    arch="x64, Arm32, Arm64"
    supported="24 to 37"
    ci-tested="24 to 36"
    unsupported="23 and earlier"
    deploy-to-link="/deployment/android"
  />
  <PlatformCard
    name="iOS"
    icon="mobile"
    arch="Arm64"
    supported="15 to 27"
    ci-tested="18 and 26"
    unsupported="14 and earlier"
    deploy-to-link="/deployment/ios"
  />
</PlatformsGrid>

## 桌面平台 {:#desktop-platforms}

:::warning macOS Intel (x64) deprecation
隨著 Apple 逐步淘汰 Intel 架構的 Mac，
Flutter 也正逐步停止支援 Intel (x64) 硬體。
關於時程與影響的詳細資訊，
請參閱 [macOS Intel deprecation strategy][]。

[macOS Intel deprecation strategy]: {{site.main-url}}/go/macos-intel-deprecation
:::

<PlatformsGrid>
  <PlatformCard
    name="Windows"
    icon="desktop_windows"
    arch="x64, Arm64"
    supported="10, 11"
    ci-tested="10"
    unsupported="8 and earlier"
    deploy-to-link="/deployment/windows"
  />
  <PlatformCard
    name="macOS"
    icon="laptop_mac"
    arch="x64, Arm64"
    supported="Monterey (12) to Golden Gate (27)"
    ci-tested="Sequoia (15)"
    unsupported="Big Sur (11) and earlier"
    deploy-to-link="/deployment/macos"
  />
  <PlatformCard
    name="Debian (Linux)"
    icon="computer"
    arch="x64, Arm64"
    deploy-to="Linux"
    supported="10 to 13"
    ci-tested="12"
    unsupported="9 and earlier"
    deploy-to-link="/deployment/linux"
  />
  <PlatformCard
    name="Ubuntu (Linux)"
    icon="computer"
    arch="x64, Arm64"
    deploy-to="Linux"
    supported="20.04 LTS to 24.04 LTS"
    ci-tested="22.04 LTS"
    unsupported="25.10 and earlier non-LTS"
    deploy-to-link="/deployment/linux"
  />
</PlatformsGrid>

## Web 平台 {:#web-platforms}

<PlatformsGrid>
  <PlatformCard
    name="Chrome"
    icon="language"
    arch="JavaScript, WebAssembly"
    deploy-to="web"
    supported="[Latest 2](https://chromereleases.googleblog.com/search/label/Stable%20updates)"
    ci-tested="145"
    unsupported="95 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Firefox"
    icon="language"
    arch="JavaScript"
    deploy-to="web"
    supported="[Latest 2](https://www.mozilla.org/en-US/firefox/releases/)"
    ci-tested="148"
    unsupported="98 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Safari"
    icon="language"
    arch="JavaScript"
    deploy-to="web"
    supported="15.6 and newer"
    ci-tested="18.6"
    unsupported="15.5 and earlier"
    deploy-to-link="/deployment/web"
  />
  <PlatformCard
    name="Edge"
    icon="language"
    arch="JavaScript, WebAssembly"
    deploy-to="web"
    supported="[Latest 2](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel)"
    ci-tested="145"
    unsupported="95 and earlier"
    deploy-to-link="/deployment/web"
  />
</PlatformsGrid>

## 先前的 Flutter 版本 {:#previous-flutter-versions}

若想了解先前 Flutter 版本的支援狀況，
請參閱以下資源：

*   [Flutter SDK 版本資訊][Flutter SDK release notes]。
    可依版本查看重大變更與支援更新。
*   [支援平台頁面的歷史紀錄][supported-platforms-history]。
    若要查看過往的支援矩陣，
    請檢視此頁面的先前版本。

[Flutter SDK release notes]: /release/release-notes
[supported-platforms-history]: {{site.repo.this}}/commits/main/sites/docs/src/content/reference/supported-platforms.md
