```markdown
---
title: 安全性誤報
description: 自動化靜態分析工具錯誤回報的安全性漏洞
---

## 簡介

我們偶爾會收到針對 Dart 和 Flutter 應用程式的安全性漏洞誤報，這些報告通常是由為其他類型應用程式（例如 Java 或 C++ 編寫的應用程式）所設計的工具產生的。本文件說明我們認為不正確的報告，並解釋為何這些疑慮是多餘的。

## 常見疑慮

### 共用物件應使用強化（fortified）函式

> 共用物件未包含任何強化函式。強化函式可針對 glibc 常見的不安全函式（如 `strcpy`、`gets` 等）提供緩衝區溢位檢查。請使用編譯器選項 `-D_FORTIFY_SOURCE=2` 來強化函式。

當這個建議針對已編譯的 Dart 程式碼（例如 Flutter 應用程式中的 `libapp.so` 檔案）時，這是不正確的建議，因為 Dart 程式碼並不會直接呼叫 libc 函式；所有 Dart 程式碼都會經過 Dart 標準函式庫。

（一般來說，MobSF 會在這裡產生誤報，因為它會檢查任何帶有 `_chk` 字尾的函式，但 Dart 根本不會使用這些函式，因此也不會有帶或不帶該字尾的呼叫，MobSF 就會將程式碼視為包含未強化呼叫。）

### 共用物件應使用 RELRO

> `libapp.so` 二進位檔未發現 RELRO

Dart 完全不使用一般的 Procedure Linkage Table（PLT）或 Global Offsets Table（GOT）機制，因此 Relocation Read-Only（RELRO）技術對 Dart 來說並不適用。

Dart 的 GOT 等價物是 pool pointer，與 GOT 不同的是，它位於隨機化的位置，因此更難被利用。

理論上，當使用 Dart FFI 時仍有可能產生易受攻擊的程式碼，但正常使用 Dart FFI 時，只要搭配本身正確使用 RELRO 的 C 程式碼，也不太會有這類問題。

### 共用物件應使用 stack canary 值

> `libapp.so` 二進位檔未發現 canary

> 此共用物件未在堆疊上加入 stack canary 值。stack canary 用於偵測並防止利用覆寫返回位址的攻擊。請使用選項 -fstack-protector-all 以啟用 stack canary。

Dart 不會產生 stack canary，因為與 C++ 不同，Dart 沒有堆疊配置的陣列（這是 C/C++ 中堆疊破壞的主要來源）。

當你撰寫純 Dart（未使用 `dart:ffi`）時，本身就有比任何 C++ 緩解措施更強的隔離保證，因為純 Dart 程式碼屬於受管理語言，不會出現緩衝區溢位等問題。

理論上，當使用 Dart FFI 時仍有可能產生易受攻擊的程式碼，但正常使用 Dart FFI 時，只要搭配本身正確使用 stack canary 的 C 程式碼，也不太會有這類問題。

### 程式碼應避免使用 `_sscanf`、`_strlen` 和 `_fopen` API

> 二進位檔可能包含下列不安全的 API：`_sscanf`、`_strlen`、`_fopen`。

這些工具在掃描時通常過於簡化；例如，僅僅因為發現名稱相同的自訂函式，就假設它們是標準函式庫的函式。許多 Flutter 的第三方相依套件中有名稱類似的函式，會觸發這些檢查。有些情況確實可能是真正的疑慮，但由於這些工具產生大量誤報，僅從輸出結果無法判斷是否為真。

### 記憶體配置應使用 `calloc`（而非 `_malloc`）

> 二進位檔可能使用 `_malloc` 函式而非 `calloc`。

記憶體配置是一個需要在效能與安全性韌性間取捨的複雜議題。僅僅因為使用 `malloc`，並不代表一定有安全性漏洞。我們歡迎具體的回報（見下方），如果有情境下使用 `calloc` 會更合適，但實務上，將所有 `malloc` 呼叫統一替換為 `calloc` 並不恰當。

### iOS 二進位檔設有 Runpath Search Path（`@rpath`）

> 二進位檔設有 Runpath Search Path（`@rpath`）。在某些情況下，攻擊者可濫用此功能來執行任意程式碼或提升權限。請移除編譯器選項 `-rpath` 以移除 `@rpath`。

在應用程式建置時，Runpath Search Path 指的是 linker 搜尋應用程式使用的動態函式庫（dylibs）時會參考的路徑。預設情況下，iOS 應用程式會設為 `@executable_path/Frameworks`，這代表 linker 會在 app bundle 內相對於 app 二進位檔的 `Frameworks` 目錄中搜尋 dylibs。`Flutter.framework` 引擎（engine）與多數嵌入式框架或 dylib 一樣，會正確地複製到這個目錄。當應用程式執行時，會載入該函式庫二進位檔。

Flutter 應用程式會使用 iOS 的預設建置設定（`LD_RUNPATH_SEARCH_PATHS=@executable_path/Frameworks`）。

涉及 `@rpath` 的漏洞在行動裝置環境下並不適用，因為攻擊者無法存取檔案系統，也無法任意替換這些框架。即使攻擊者真的能夠替換為惡意框架，應用程式也會因為簽章驗證失敗而在啟動時崩潰。

### CBC 搭配 PKCS5/PKCS7 填充的漏洞

我們收到一些模糊的報告，指出某些 Flutter 套件存在「CBC 搭配 PKCS5/PKCS7 填充的漏洞」。

就我們所知，這是因為 ExoPlayer 的 HLS 實作（`com.google.android.exoplayer2.source.hls.Aes128DataSource` 類別）所觸發。HLS 是 Apple 的串流格式，規範了 DRM 必須使用的加密類型；這並不是漏洞，因為 DRM 並非用來保護使用者的裝置或資料，而只是為了混淆，限制使用者對軟硬體的完整使用權。

### 應用程式可讀寫外部儲存空間

> 應用程式可讀寫外部儲存空間。任何應用程式都能讀取寫入到外部儲存空間的資料。

> 如同處理任何不受信任來源的資料時，當處理來自外部儲存空間的資料時，應進行輸入驗證。我們強烈建議不要在動態載入前，將可執行檔或 class 檔案儲存在外部儲存空間。如果你的應用程式確實會從外部儲存空間取得可執行檔，這些檔案在動態載入前應進行簽章與加密驗證。

我們收到的報告指出，有些漏洞掃描工具將圖片選取插件（image picker plugins）能夠讀寫外部儲存空間視為威脅。

從本地儲存空間讀取圖片正是這些插件的用途；這並不是漏洞。

### 應用程式使用 file.delete() 刪除資料

> 當你使用 file.delete 刪除檔案時，僅會從檔案系統表中移除該檔案的參考。檔案實際上仍存在於磁碟上，直到被其他資料覆寫，這期間有被復原的風險。

有些漏洞掃描工具將相機插件錄製資料後刪除暫存檔案的行為，解讀為安全性漏洞。由於影片是由使用者錄製，且儲存在使用者自己的硬體上，實際上並無風險。

## 已過時的疑慮

本節包含可能在舊版 Dart 和 Flutter 中出現的有效訊息，但在新版中應該不會再出現。如果你在舊版 Dart 或 Flutter 中看到這些訊息，請升級至最新穩定版本。如果你在目前穩定版中仍看到這些訊息，請回報給我們（詳見本文件最後的說明）。

### 堆疊應設定 NX bit

> 共用物件未設定 NX bit。NX bit 可透過將記憶體頁面標記為不可執行，防止記憶體損毀漏洞被利用。請使用選項 `--noexecstack` 或 `-z noexecstack` 將堆疊標記為不可執行。

（MobSF 的訊息有誤導性；它實際上是在檢查堆疊是否被標記為不可執行，而不是共用物件本身。）

在舊版 Dart 和 Flutter 中，ELF 產生器有個 bug，未正確產生帶有 `~X` 權限的 `gnustack` 區段，但這個問題現已修正。

## 回報真正的疑慮

雖然自動化漏洞掃描工具會產生如上所示的誤報，我們仍無法排除存在值得關注的真正問題。如果你發現認為是真正的安全性漏洞，非常歡迎你回報給我們：

* [Flutter 安全性政策](/security)
* [Dart 安全性政策]({{site.dart-site}}/security)
```
