### 在 Xcode 中連結並嵌入框架 {:#method-b .no_toc}

#### 做法 {:#method-b-approach}

在第二種方法中，請編輯現有的 Xcode 專案、
產生所需的框架，並將其嵌入應用程式中。
Flutter 會為 Flutter 本身、已編譯的 Dart 程式碼，以及每個 Flutter 插件
產生對應的 iOS 框架。
請嵌入這些框架，並更新現有應用程式的建置設定。

#### 需求 {:#method-b-reqs}

此方法無需額外的軟體或硬體需求。
在下列情況下請使用此方法：

* 團隊成員無法安裝 Flutter SDK 與 CocoaPods
* 您不想在現有 iOS 應用程式中使用 CocoaPods 作為相依套件管理工具

#### 限制 {:#method-b-limits}

{% render "docs/add-to-app/ios-project/limits-common-deps.md" %}

#### 範例專案結構 {:#method-b-structure}

{% render "docs/add-to-app/ios-project/embed-framework-directory-tree.md" %}

#### 操作步驟

在 Xcode 中，如何將產生的框架連結、嵌入或同時進行兩者，
取決於框架的類型。

* 連結並嵌入動態框架。
* 連結靜態框架。[切勿嵌入靜態框架][static-framework]。

{% render "docs/add-to-app/ios-project/link-and-embed.md" %}

[static-framework]: https://developer.apple.com/library/archive/technotes/tn2435/_index.html
