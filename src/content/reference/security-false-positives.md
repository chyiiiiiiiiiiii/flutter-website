```markdown
---
title: 安全性誤報
description: 自動化靜態分析工具錯誤回報的安全性漏洞
---

## 簡介

我們偶爾會收到針對 Dart 與 Flutter 應用程式的安全性漏洞誤報，這些報告通常是由為其他類型應用程式（例如 Java 或 C++ 編寫的應用程式）所設計的工具所產生。本文件提供我們認為不正確的報告資訊，並說明為何這些疑慮是多慮的。

## 常見疑慮

### 共用物件應使用強化（fortified）函式

> 此共用物件未包含任何強化（fortified）函式。  
> 強化函式可針對 glibc 常見的不安全函式（如 `strcpy`、`gets` 等）提供緩衝區溢位檢查。  
> 請使用編譯器選項 `-D_FORTIFY_SOURCE=2` 以強化函式。

當這項建議針對 Dart 編譯後的程式碼（例如 Flutter 應用程式中的 `libapp.so` 檔案）時，這其實是誤導性的，因為 Dart 程式碼並不會直接呼叫 libc 函式；所有 Dart 程式碼都會經過 Dart 標準函式庫。

（一般來說，MobSF 在這裡會產生誤報，是因為它檢查是否有使用帶有 `_chk` 字尾的函式，但 Dart 根本不會用到這些函式，因此也不會有帶或不帶該字尾的呼叫，MobSF 便將這段程式碼視為包含未強化呼叫。）

### 共用物件應使用 RELRO

> `libapp.so` 二進位檔未發現 RELRO

Dart 完全不使用一般的程序連結表（Procedure Linkage Table, PLT）或全域偏移表（Global Offsets Table, GOT）機制，因此「重定位唯讀（RELRO）」技術對 Dart 來說並不適用。

Dart 對應 GOT 的設計是 pool pointer，不同於 GOT，pool pointer 會被放在隨機位置，因此更難被利用。

理論上，當你使用 Dart FFI 時，仍有可能產生易受攻擊的程式碼，但只要你與本身正確使用 RELRO 的 C 程式碼搭配，正常使用 Dart FFI 也不太會有這類問題。

### 共用物件應使用 Stack Canary 值

> `libapp.so` 二進位檔未發現 stack canary

> 此共用物件未在堆疊中加入 stack canary 值。  
> Stack canary 用於偵測並防止利用覆寫 return address 的攻擊。  
> 請使用選項 -fstack-protector-all 以啟用 stack canary。

Dart 不會產生 stack canary，因為與 C++ 不同，Dart 並沒有堆疊配置的陣列（這是 C/C++ 中堆疊破壞的主要來源）。

當你撰寫純 Dart 程式（未使用 `dart:ffi`）時，已經有比任何 C++ 緩解措施更強的隔離保證，因為純 Dart 程式屬於受管理語言，像是緩衝區溢位這類問題根本不存在。

理論上，當你使用 Dart FFI 時，仍有可能產生易受攻擊的程式碼，但只要你與本身正確使用 stack canary 的 C 程式碼搭配，正常使用 Dart FFI 也不太會有這類問題。

### 程式碼應避免使用 `_sscanf`、`_strlen` 和 `_fopen` API

> 此二進位檔可能包含下列不安全 API：`_sscanf`、`_strlen`、`_fopen`。

回報這類問題的工具通常在掃描時過於簡化；例如，只要發現有同名的自訂函式，就假設它們是標準函式庫中的函式。許多 Flutter 第三方相依套件中有名稱類似的函式，會誤觸這些檢查。有些情況確實可能是合理的疑慮，但由於這些工具產生大量誤報，僅從工具輸出結果無法判斷是否為真實問題。

### 記憶體配置應使用 `calloc`（而非 `_malloc`）

> 此二進位檔可能使用 `_malloc` 函式，而非 `calloc`。

記憶體配置是一個細緻的議題，必須在效能與安全性韌性間取得平衡。僅僅因為使用 `malloc`，並不代表一定有安全性漏洞。若有具體案例（見下方）指出應優先使用 `calloc`，我們非常歡迎，但在實務上，並不適合將所有 `malloc` 呼叫一律替換為 `calloc`。

### iOS 二進位檔設有 Runpath Search Path（`@rpath`）

> 此二進位檔設有 Runpath Search Path（`@rpath`）。  
> 在某些情況下，攻擊者可濫用此功能以執行任意程式碼並提升權限。  
> 請移除編譯器選項 `-rpath` 以移除 `@rpath`。

在應用程式建置時，Runpath Search Path 指的是 linker 搜尋應用程式所需動態函式庫（dylibs）的路徑。預設情況下，iOS 應用程式會設為 `@executable_path/Frameworks`，代表 linker 會在應用程式 bundle 內，app 二進位檔相對的 `Frameworks` 目錄下搜尋 dylibs。`Flutter.framework` 引擎與大多數嵌入式框架或 dylib 一樣，會正確複製到這個目錄。當應用程式執行時，會載入該函式庫二進位檔。

Flutter 應用程式使用 iOS 預設建置設定（`LD_RUNPATH_SEARCH_PATHS=@executable_path/Frameworks`）。

與 `@rpath` 相關的漏洞在行動裝置情境下並不適用，因為攻擊者無法存取檔案系統，也無法隨意替換這些框架。即使攻擊者真的「能」替換為惡意框架，應用程式也會因簽章驗證失敗而在啟動時崩潰。

### CBC 搭配 PKCS5/PKCS7 填充之漏洞

我們曾收到模糊的報告，指出某些 Flutter 套件存在「CBC with PKCS5/PKCS7 padding vulnerability」。

據我們了解，這是因為 ExoPlayer 的 HLS 實作（`com.google.android.exoplayer2.source.hls.Aes128DataSource` 類別）所觸發。HLS 是 Apple 的串流格式，規範了 DRM 必須使用的加密方式；這並不是漏洞，因為 DRM 並非用來保護使用者的機器或資料，而只是為了混淆，限制使用者完整使用其軟硬體的能力。

### 應用程式可讀寫外部儲存空間

> 應用程式可讀寫外部儲存空間。任何應用程式都能讀取寫入外部儲存空間的資料。

> 如同處理任何不受信任來源的資料時，處理外部儲存空間資料時應進行輸入驗證。我們強烈建議不要在動態載入前，將可執行檔或 class 檔案儲存在外部儲存空間。如果您的應用程式會從外部儲存空間取得可執行檔，這些檔案應在動態載入前進行簽章與加密驗證。

我們收到的報告指出，有些漏洞掃描工具將圖片選取器（image picker）外掛可讀寫外部儲存空間的能力視為威脅。

從本地儲存空間讀取圖片正是這些外掛的用途；這並不是漏洞。

### 應用程式使用 file.delete() 刪除資料

> 當你使用 file.delete 刪除檔案時，僅移除檔案在檔案系統表中的參考。  
> 檔案實體仍存在於磁碟上，直到被其他資料覆寫，因此可能被復原。

有些漏洞掃描工具將相機外掛在錄製完資料後刪除暫存檔案的行為視為安全性漏洞。由於影片是由使用者錄製，且儲存在使用者自己的硬體上，因此實際上並無風險。

## 已過時的疑慮

本節內容為舊版 Dart 與 Flutter 可能出現的合理訊息，但在新版中應已不會再出現。如果你在舊版 Dart 或 Flutter 中看到這些訊息，請升級至最新穩定版。如果你在目前穩定版仍看到這些訊息，請回報給我們（詳見本文末段）。

### 堆疊應設為 NX bit

> 此共用物件未設為 NX bit。  
> NX bit 可防止記憶體損毀漏洞被利用，方法是將記憶體頁標記為不可執行。  
> 請使用選項 `--noexecstack` 或 `-z noexecstack` 將堆疊標記為不可執行。

（MobSF 的訊息有誤導性；它其實是在檢查堆疊是否被標記為不可執行，而不是共用物件本身。）

在舊版 Dart 與 Flutter 中，ELF 產生器曾有一個 bug，未正確產生帶有 `~X` 權限的 `gnustack` 區段，但這個問題現已修正。

## 回報真實疑慮

雖然自動化漏洞掃描工具會產生如上所述的誤報，我們仍無法排除確實存在值得關注的真實問題。如果你發現你認為是真正的安全性漏洞，非常歡迎你回報給我們：

* [Flutter 安全性政策](/security)
* [Dart 安全性政策]({{site.dart-site}}/security)
```
