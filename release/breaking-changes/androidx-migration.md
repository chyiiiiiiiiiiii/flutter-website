# AndroidX 遷移

> 如何將現有的 Flutter 專案遷移至 AndroidX。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


:::note
如果 Flutter 偵測到您的專案尚未使用 AndroidX，您可能會被導向此頁面。
:::

[AndroidX][] 是對原有 Android 支援函式庫（Android Support Library）的一項重大改進。

它提供了 `androidx.*` 套件函式庫，這些函式庫已從平台 API 中獨立出來。這代表它能夠向下相容，並且比 Android 平台更頻繁地獲得更新。

[AndroidX]: https://developer.android.com/jetpack/androidx

## 常見問題

### 如何將現有的應用程式、插件（plugin）或可編輯主機模組（host-editable module）專案遷移至 AndroidX？

_您需要安裝 Android Studio 3.2 或更高版本。
如果尚未安裝，您可以從
[Android Studio][] 網站下載最新版。_

1. 開啟 Android Studio。
2. 選擇 **Open an existing Android Studio Project**（開啟現有的 Android Studio 專案）。
3. 開啟您應用程式中的 `android` 目錄。
4. 等待專案成功同步。
   （當您開啟專案時會自動進行同步，但如果沒有，請從 **File** 選單選擇 **Sync Project with Gradle Files**。）
5. 從 Refactor（重構）選單中選擇 **Migrate to AndroidX**（遷移至 AndroidX）。
6. 如果系統要求您在繼續前備份專案，請勾選 **Backup project as Zip file**（將專案備份為 Zip 檔案），然後點擊 **Migrate**（遷移）。
   最後，將 zip 檔案儲存到您偏好的位置。
   <img width="500" src="/assets/images/docs/androidx/migrate_prompt.png" alt="Select backup project as zip file" />
7. 重構預覽會顯示變更清單。
   最後，點擊 **Do Refactor**（執行重構）：
   <img width="600" src="/assets/images/docs/androidx/do_androidx_refactor.png" alt="An animation of the bottom-up page transition on Android" />
8. 完成！您已成功將專案遷移至 AndroidX。

最後，如果您遷移的是插件（plugin），請將新的 AndroidX 版本發佈到 pub，並更新您的 `CHANGELOG.md`，以標示此新版本已支援 AndroidX。

[Android Studio]: https://developer.android.com/studio

### 如果我無法使用 Android Studio 怎麼辦？

您可以使用 Flutter 工具建立新專案，然後將 Dart 程式碼與資源（assets）移至新專案。

要建立新專案，請執行：

```console
flutter create -t <project-type> <new-project-path>
```

### 加入至應用程式

如果你的 Flutter 專案是用於整合到現有 Android 應用程式的模組類型，並且包含 `.android` 目錄，請在 `pubspec.yaml` 中加入以下這一行：

```yaml
 module:
   ...
    androidX: true # Add this line.
```

最後，執行 `flutter clean`。

如果你的模組包含的是 `android` 目錄，
請依照前一節的步驟操作。

### 如何判斷我的專案是否使用 AndroidX？

從 Flutter v1.12.13 開始，使用
`flutter create -t <project-type>`
建立的新專案預設即採用 AndroidX。

在此 Flutter 版本之前建立的專案，
不得依賴任何[舊的建置產物][old build artifact]或
[舊的 Support Library 類別][old Support Library class]。

[old build artifact]: https://developer.android.com/jetpack/androidx/migrate/artifact-mappings
[old Support Library class]: https://developer.android.com/jetpack/androidx/migrate/class-mappings

在應用程式或模組專案中，
檔案 `android/gradle.properties`
或 `.android/gradle.properties`
必須包含下列內容：

```properties
android.useAndroidX=true
android.enableJetifier=true
```

### 如果我沒有將我的應用程式或模組遷移到 AndroidX 會怎樣？

你的應用程式可能仍然可以運作。然而，
不建議同時混用 AndroidX 和 Support 套件，
因為這可能導致相依性衝突或
其他類型的 Gradle 錯誤。
隨著越來越多的插件遷移到 AndroidX，
依賴 Android 核心函式庫的插件
很可能會導致建置失敗。

### 如果我的應用程式已經遷移到 AndroidX，但我使用的插件還沒全部遷移怎麼辦？

Flutter 工具會使用 Jetifier 自動
將使用 Support Library 的 Flutter 插件
轉換為 AndroidX，因此即使這些插件
尚未遷移到 AndroidX，你仍然可以繼續使用它們。

### 我在遷移到 AndroidX 時遇到問題

[在 GitHub 上提交 issue][Open an issue on GitHub]，並在 issue 標題中加入 `[androidx-migration]`。

[Open an issue on GitHub]: https://github.com/flutter/flutter/issues/new/choose

