# Android Java Gradle 遷移指南

> 如果你在執行或建置 Android 應用程式時遇到 Gradle 的錯誤， 本文將說明如何進行遷移。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

如果你最近將 Android Studio 升級到 Flamingo 版本，並且在執行或建置現有的 Android 應用程式時，可能會遇到類似以下的錯誤：

```sh
Caused by: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
```

此錯誤在終端機輸出的訊息類似如下：


```sh
FAILURE: Build failed with an exception.

* Where:
Build file '…/example/android/build.gradle'
* What went wrong:
Could not compile build file '…/example/android/build.gradle'.
> startup failed:
  General error during conversion: Unsupported class file major version 61

  java.lang.IllegalArgumentException: Unsupported class file major version 61
  	at groovyjarjarasm.asm.ClassReader.<init>(ClassReader.java:189)
  	at groovyjarjarasm.asm.ClassReader.<init>(ClassReader.java:170)
  	[…
  	 …
  	 … 209 more lines of Groovy and Gradle stack trace …
  	 …
  	 …]
  	at java.base/java.lang.Thread.run(Thread.java:833)
```

此錯誤發生的原因是 Android Studio Flamingo
將其內建的 Java SDK 從 11 升級至 17。
Flutter 會使用 Android Studio 內建的 Java 版本
來建置 Android 應用程式。
Gradle 版本 [7.3 之前][prior to 7.3] 無法在
使用 Java 17 時執行。

**你可以透過升級 Gradle 專案至相容版本（包含 7.3 至 7.6.1）
來修正此錯誤，方法如下所示。**

[prior to 7.3]: https://docs.gradle.org/current/userguide/compatibility.html#java

## 解法一：使用 Android Studio 引導修復

請依下列步驟在 Android Studio Flamingo 中
升級 Gradle 版本：

1. 在 Android Studio 中，開啟 `android` 資料夾。
   這將會顯示以下對話框：

   ![Dialog prompting you to upgrade Gradle](/assets/images/docs/releaseguide/android-studio-flamingo-upgrade-alert.png){:width="50%"}

   請將 Gradle 更新至 7.3 至 7.6.1 之間的版本（包含 7.3 與 7.6.1）。

1. 依照引導式流程完成 Gradle 更新。

   ![Workflow to upgrade Gradle](/assets/images/docs/releaseguide/android-studio-flamingo-gradle-upgrade.png){:width="85%"}

## 解法二：在命令列手動修復

請在你的 Flutter 專案根目錄下執行以下步驟。

1. 進入專案的 Android 目錄。

   ```console
   $ cd android
   ```

1. 將 Gradle 更新至建議版本。請選擇 7.3 至 7.6.1（含）之間的版本。

   ```console
   $ ./gradlew wrapper --gradle-version=7.6.1
   ```

## 你尚未更新 Android Studio 且出現 Java 錯誤
該錯誤看起來類似於 `Unsupported class file major version 65`。
這表示你目前使用的 Java 版本比你執行的 Gradle 所能支援的版本還要新。
AGP（Android Gradle Plugin）、Java 與 Gradle 之間有一組不太明顯的相依性 (dependency)。

### 解決方案 1：Android Studio
最簡單的解決方式是使用 Android Studio 的 AGP 升級助手（AGP Upgrade Assistant）。
在 Android Studio 中選擇你的頂層 `build.gradle` 檔案，然後選擇
「工具（Tools）」->「AGP Upgrade Assistant」。

### 解決方案 2：命令列
執行 `flutter analyze --suggestions` 來檢查你的 AGP、Java 與 Gradle 版本是否相容。
如果需要更新 Gradle，可以使用 `./gradlew wrapper --gradle-version=SOMEGRADLEVERSION` 來升級，
其中 SOMEGRADLEVERSION 是版本號（你可以選擇 `flutter analyze` 建議的較新版本）。

要查詢目前使用的 Java 版本，請執行 `flutter doctor`。
在 macOS 上，你可以透過 `/usr/libexec/java_home -V` 查詢作業系統已知的 Java 版本。
若要設定所有 Flutter 專案使用的 Java 版本，請執行 `flutter config --jdk-dir=SOMEJAVAPATH`，
其中 SOMEJAVAPATH 是像 `/opt/homebrew/Cellar/openjdk@17/17.0.13/libexec/openjdk.jdk/Contents/Home` 這樣的 Java 版本路徑。

## 注意事項

請留意以下幾點：

* 每個受影響的 Android 應用程式都需要重複這個步驟。
* 這個問題可能會發生在那些
  _沒有_ 透過 Android Studio 下載 Java 與 Android SDK 的使用者身上。
  如果你手動將 Java SDK 升級到 17 版，但尚未升級 Gradle，
  也會遇到這個問題。解決方法相同：
  將 Gradle 升級到 7.3 至 7.6.1 之間的版本。
* 你的開發機器 _可能_ 會有多個 Java SDK 副本：
  * Android Studio 應用程式內含一個 Java 版本，Flutter 預設會使用這個版本。
  * 如果你沒有安裝 Android Studio，
    Flutter 會依賴 shell 腳本中 `JAVA_HOME` 環境變數所指定的版本。
  * 如果未定義 `JAVA_HOME`，Flutter 會在你的路徑中尋找任何 `java` 可執行檔。
    `flutter doctor -v` 指令會顯示目前使用的 Java 版本。
* 如果你將 Gradle 升級到 _高於_ 7.6.1 的版本，
  你可能（雖然機率不高）會遇到因 Gradle 變動而產生的問題，例如
  [已棄用的 Gradle 類別][deprecated Gradle classes]，或是 Android 檔案結構的變更。
  如果發生這種情況，請將 Gradle 降級到 7.3 至 7.6.1 之間的版本。
* 升級到 Flutter 3.10 並不會解決這個問題。

[deprecated Gradle classes]: https://docs.gradle.org/7.6/javadoc/deprecated-list.html
[issue 122609]: https://github.com/flutter/flutter/issues/122609

