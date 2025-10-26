---
title: Windows 建置路徑已變更，新增目標架構
description: >-
  為了支援 Windows on Arm64，
  Windows 的建置路徑已更新，現在會包含目標架構。
---

{% render docs/breaking-changes.md %}

## 摘要

Flutter Windows 應用程式所建置出的可執行檔，現在會依照架構放置於不同的資料夾中。

## 背景說明

為了支援 Windows on Arm64，Windows 的建置路徑已更新，現在會加入建置時的目標架構。

過去，Flutter 在 Windows 上建置時，預設目標架構為 x64。

## 移轉指南

你可能需要更新你的基礎設施，以使用新的 Flutter Windows 建置路徑。

遷移前的建置路徑範例：

```plaintext
build\windows\runner\Release\hello_world.exe
```

遷移後，若目標為 x64，則範例建置路徑如下：

```plaintext
build\windows\x64\runner\Release\hello_world.exe
```

如果遷移後以 Arm64 為目標，範例建置路徑如下：

```plaintext
build\windows\arm64\runner\Release\hello_world.exe
```

如果你使用 [`package:msix`][`package:msix`]，請更新至 3.16.7 或更新版本。

[`package:msix`]: {{site.pub-pkg}}/msix

## 時程

合併於版本：3.15.0-0.0.pre<br>  
正式版本：3.16

## 參考資料

設計文件：

* [flutter.dev/go/windows-arm64][flutter.dev/go/windows-arm64]

相關的 pull request：

* [Introduce architecture subdirectory for Windows build][Introduce architecture subdirectory for Windows build]

[flutter.dev/go/windows-arm64]: {{site.main-url}}/go/windows-arm64
[Introduce architecture subdirectory for Windows build]: {{site.repo.flutter}}/pull/131843
