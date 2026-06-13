---
title: 根據您的需求設定 Flutter
shortTitle: 自訂安裝
description: >-
  安裝並設定 Flutter 以符合您偏好的
  開發環境與目標平台。
showBanner: false
sitemap: false
---

若要開始使用 Flutter 進行開發，
請依照下列步驟安裝並設定 Flutter，
以符合您偏好的開發環境與目標平台。

如果您打算使用 VS Code 或其他以 Code - OSS 為基礎的編輯器（例如 Antigravity），
建議改為參考 [Flutter 快速入門][Flutter quick start]。

[Flutter quick start]: /install/quick

## 安裝並設定 Flutter {: #install}

若要開始使用 Flutter 開發應用程式，
請將 Flutter SDK 安裝到您的開發裝置上。
請選擇以下其中一種安裝方式：

<div class="card-grid">
  <a class="card outlined-card" href="/install/with-vs-code">
    <div class="card-header">
      <span class="card-title">使用 VS Code 安裝</span>
      <span class="card-subtitle">推薦</span>
    </div>
    <div class="card-content">
      <p>使用 VS Code 快速建立您的 Flutter 開發環境。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/install/manual">
    <div class="card-header">
      <span class="card-title">手動安裝</span>
      <span class="card-subtitle">指定版本適用</span>
    </div>
    <div class="card-content">
      <p>手動安裝並設定指定版本的 Flutter SDK。</p>
    </div>
  </a>
</div>

## 設定 IDE 或編輯器 {: #editor}

為了獲得最佳的 Flutter 開發體驗，
請安裝支援 Dart 與 Flutter 的 IDE 或編輯器。
常見選項包括 VS Code、Antigravity、
Android Studio 以及其他基於 Code OSS 的編輯器。

<div class="card-grid wide">
 <a class="card outlined-card" href="/tools/vs-code#setup">
   <div class="card-header">
     <span class="card-title">VS Code</span>
   </div>
   <div class="card-content">
     <p>在 VS Code 中設定 Flutter 支援。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/tools/android-studio#setup">
   <div class="card-header">
     <span class="card-title">Android Studio</span>
   </div>
   <div class="card-content">
     <p>在 Android Studio 中設定 Flutter 支援。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/tools/android-studio#setup">
   <div class="card-header">
     <span class="card-title">IntelliJ</span>
   </div>
   <div class="card-content">
     <p>在 IntelliJ 系列 IDE 中設定 Flutter 支援。</p>
   </div>
 </a>
</div>

## 設定目標平台 {: #target-platform}

成功安裝 Flutter 後，
請至少設定一個目標平台的開發環境，
以繼續您的 Flutter 學習之旅。

我們建議您優先[開發 Web 平台][web-setup]，
因為除了安裝合適的瀏覽器外，無需額外設定。
您隨時可以再設定其他目標平台的開發環境。

<div class="card-grid wide">
 <a class="card outlined-card" href="/platform-integration/android/setup">
   <div class="card-header">
     <span class="card-title">目標 Android</span>
     <span class="card-subtitle">適用於任何裝置</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 Android 平台的 Flutter 應用程式。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/ios/setup">
   <div class="card-header">
     <span class="card-title">目標 iOS</span>
     <span class="card-subtitle">僅限 macOS</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 iOS 平台的 Flutter 應用程式。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/web/setup">
   <div class="card-header">
     <span class="card-title">目標 Web</span>
     <span class="card-subtitle">適用於任何裝置</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 Web 平台的 Flutter 應用程式。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/windows/setup">
   <div class="card-header">
     <span class="card-title">目標 Windows</span>
     <span class="card-subtitle">僅限 Windows</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 Windows 桌面平台的 Flutter 應用程式。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/macos/setup">
   <div class="card-header">
     <span class="card-title">目標 macOS</span>
     <span class="card-subtitle">僅限 macOS</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 macOS 桌面平台的 Flutter 應用程式。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/linux/setup">
   <div class="card-header">
     <span class="card-title">目標 Linux</span>
     <span class="card-subtitle">僅限 Linux</span>
   </div>
   <div class="card-content">
     <p>設定您的開發環境以建置 Linux 桌面平台的 Flutter 應用程式。</p>
   </div>
 </a>
</div>

[web-setup]: /platform-integration/web/setup

## 繼續您的 Flutter 之旅 {: #next-steps}

**恭喜您！**
現在您已經完成 Flutter 的安裝、IDE 或編輯器的設定，
並且為目標平台建立了開發環境，
可以繼續展開您的 Flutter 學習之旅。

請參考 [Flutter 學習路徑][Flutter learning pathway]，
設定[其他目標平台][additional target platform]的開發環境，
或探索下列其他學習資源。

{% render "docs/get-started/setup-next-steps.html", site: site %}

[Flutter learning pathway]: /learn/pathway
[additional target platform]: /platform-integration#setup
