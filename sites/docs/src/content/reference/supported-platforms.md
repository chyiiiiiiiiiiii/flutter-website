---
title: 支援的部署平台
shortTitle: 支援的平台
description: Flutter 依平台版本支援的各目標平台。
showBreadcrumbs: false
---

從 Flutter {{site.currentFlutterVersion}} 開始，
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
    supported="24 to 36"
    ci-tested="24 to 36"
    unsupported="23 and earlier"
    deploy-to-link="/deployment/android"
  />
  <PlatformCard
    name="iOS"
    icon="mobile"
    arch="Arm64"
    supported="13 to 26"
    ci-tested="18"
    unsupported="12 and earlier"
    deploy-to-link="/deployment/ios"
  />
</PlatformsGrid>

## 桌面平台 {:#desktop-platforms}

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
    supported="Catalina (10.15) to Tahoe (26)"
    ci-tested="Sequoia (15)"
    unsupported="Mojave (10.14) and earlier"
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
