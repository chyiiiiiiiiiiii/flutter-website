---
title: 為多平台開發與整合
shortTitle: 平台整合
description: >-
  學習如何在 Flutter 應用程式中，針對不同平台開發並整合平台專屬功能。
---

Flutter 讓你能夠從單一程式碼庫建構、測試與部署美觀、原生編譯的多平台應用程式。

## 概覽

Flutter 及其核心套件通常會自動支援並整合 Flutter 官方[支援的平台][supported platforms]。
部分平台可能需要你[額外設定開發工具](#setup)，
但只要你的開發環境設定完成，
Flutter 應用程式通常能夠直接在多平台上運作。

有時你會需要整合平台專屬的功能。
例如，你可能想要使用僅在 iOS 與 iPadOS 上可用的原生函式庫。
針對許多使用情境，你可以找到並使用 Flutter 團隊及優秀社群所提供的[Flutter 套件 (plugins)][Flutter plugins]。
若這些套件都無法滿足你的需求，你也可以
[撰寫平台專屬程式碼][write platform-specific code]，甚至[建立自己的套件 (plugin)][create your own plugin]。

:::tip
如果你正在探索為多平台建構應用程式，也請考慮以[自適應與響應式設計][adaptive and responsive design]來打造你的 UI。
:::

[supported platforms]: /reference/supported-platforms
[Flutter plugins]: /packages-and-plugins/using-packages
[write platform-specific code]: /platform-integration/platform-channels
[create your own plugin]: /packages-and-plugins/developing-packages
[adaptive and responsive design]: /ui/adaptive-responsive/

## 設定平台開發環境 {:#setup}

雖然 Flutter 應用程式可以針對多種[支援的平台][supported platforms]建構，
且幾乎不需修改程式碼，
但當你要針對新平台開發時，開發環境可能需要額外設定。

若要為額外的平台設定開發環境，請從下方選擇平台：

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/android/setup">
    <div class="card-header">
      <span class="card-title">目標 Android</span>
      <span class="card-subtitle">適用於任何裝置</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於 Android 的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/setup">
    <div class="card-header">
      <span class="card-title">目標 iOS</span>
      <span class="card-subtitle">僅限 macOS</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於 iOS 的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/setup">
    <div class="card-header">
      <span class="card-title">目標 Web</span>
      <span class="card-subtitle">適用於任何裝置</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於網頁的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/windows/setup">
    <div class="card-header">
      <span class="card-title">目標 Windows</span>
      <span class="card-subtitle">僅限 Windows</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於 Windows 的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/macos/setup">
    <div class="card-header">
      <span class="card-title">目標 macOS</span>
      <span class="card-subtitle">僅限 macOS</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於 macOS 的 Flutter 應用程式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/linux/setup">
    <div class="card-header">
      <span class="card-title">目標 Linux</span>
      <span class="card-subtitle">僅限 Linux</span>
    </div>
    <div class="card-content">
      <p>設定你的開發環境，以建構適用於 Linux 的 Flutter 應用程式。</p>
    </div>
  </a>
</div>

## 與各平台整合 {:#integrate}

如果你要解決的情境並未被現有的[Flutter 套件 (plugin)][Flutter plugin]涵蓋，
請參考下列指南，瞭解如何與各支援平台整合。

[Flutter plugin]: /packages-and-plugins/using-packages#searching-for-packages

### 與 Android 整合 {:#android}

學習如何將自訂整合加入你的 Flutter 應用程式中的 Android。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/android/splash-screen">
    <div class="card-header">
      <span class="card-title">新增啟動畫面</span>
    </div>
    <div class="card-content">
      <p>學習如何在 Android 上為你的應用程式新增啟動畫面。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/predictive-back">
    <div class="card-header">
      <span class="card-title">支援預測返回</span>
    </div>
    <div class="card-content">
      <p>學習如何在 Android 上為你的應用程式新增預測返回手勢。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/call-jetpack-apis">
    <div class="card-header">
      <span class="card-title">呼叫 JetPack API</span>
    </div>
    <div class="card-content">
      <p>學習如何從 Dart 在你的應用程式中呼叫最新的 Android API。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/c-interop">
    <div class="card-header">
      <span class="card-title">綁定原生程式碼</span>
    </div>
    <div class="card-content">
      <p>學習如何在 Android 上從你的應用程式綁定原生 C 程式碼。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/platform-views">
    <div class="card-header">
      <span class="card-title">嵌入 Android 視圖</span>
    </div>
    <div class="card-content">
      <p>學習如何在你的應用程式中承載原生 Android 視圖。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/compose-activity">
    <div class="card-header">
      <span class="card-title">啟動 Compose 活動</span>
    </div>
    <div class="card-content">
      <p>學習如何從你的應用程式啟動 Jetpack Compose 活動。</p>
    </div>
  </a>
</div>

### 與 iOS 整合 {:#ios}

學習如何將自訂整合加入你的 Flutter 應用程式中的 iOS。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/ios/launch-screen">
    <div class="card-header">
      <span class="card-title">新增啟動畫面</span>
    </div>
    <div class="card-content">
      <p>學習如何在 iOS 上為你的應用程式新增啟動畫面。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/apple-frameworks">
    <div class="card-header">
      <span class="card-title">善用系統 Framework</span>
    </div>
    <div class="card-content">
      <p>瞭解支援原生 iOS framework 功能的套件 (plugin)。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/c-interop">
    <div class="card-header">
      <span class="card-title">綁定原生程式碼</span>
    </div>
    <div class="card-content">
      <p>學習如何從你的應用程式綁定原生 C、Objective-C 與 Swift 程式碼。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/platform-views">
    <div class="card-header">
      <span class="card-title">嵌入 iOS 視圖</span>
    </div>
    <div class="card-content">
      <p>學習如何在你的應用程式中承載原生 iOS 視圖。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/app-extensions">
    <div class="card-header">
      <span class="card-title">新增 App Extension</span>
    </div>
    <div class="card-content">
      <p>學習如何在你的應用程式中新增 iOS App Extension。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/ios-latest">
    <div class="card-header">
      <span class="card-title">支援 iOS 新功能</span>
    </div>
    <div class="card-content">
      <p>瞭解 Flutter 對於 iOS 新功能或即將推出功能的支援情形。</p>
    </div>
  </a>
</div>

### 與 Web 整合 {:#web}

學習如何將自訂整合加入你的 Flutter 應用程式中的 Web 平台。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/web/initialization">
    <div class="card-header">
      <span class="card-title">自訂應用程式初始化</span>
    </div>
    <div class="card-content">
      <p>自訂你的 Flutter 應用程式在 Web 上的初始化方式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/c-interop">
    <div class="card-header">
      <span class="card-title">綁定原生程式碼</span>
    </div>
    <div class="card-content">
      <p>學習如何在 Android 上從你的應用程式綁定原生 C 程式碼。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/web-content-in-flutter">
    <div class="card-header">
      <span class="card-title">嵌入網頁內容</span>
    </div>
    <div class="card-content">
      <p>學習如何在你的應用程式中嵌入原生網頁內容。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web">
    <div class="card-header">
      <span class="card-title">嵌入你的應用程式</span>
    </div>
    <div class="card-content">
      <p>學習如何將你的 Flutter 應用程式嵌入其他網頁應用程式中。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/wasm/">
    <div class="card-header">
      <span class="card-title">編譯為 WebAssembly</span>
    </div>
    <div class="card-content">
      <p>學習如何在你的 Flutter Web 應用程式中善用 WebAssembly。</p>
    </div>
  </a>
  <a class="card outlined-card" href="{{site.dart-site}}/interop/js-interop" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span>與 JavaScript 互通</span>
        <span class="material-symbols" aria-hidden="true" style="font-size: 1rem;" translate="no">open_in_new</span>
      </span>
    </div>
    <div class="card-content">
      <p>學習如何從 Dart 程式碼與 JavaScript 整合。</p>
    </div>
  </a>
</div>

### 與 Windows 整合 {:#windows}

學習如何
