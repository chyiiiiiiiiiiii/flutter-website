### 在 Xcode 中使用框架並以 podspec 方式使用 Flutter 框架 {:#method-c .no_toc}

#### 方法說明 {:#method-c-approach}

此方法將 Flutter 產生為 CocoaPods 的 podspec，
而非將龐大的 `Flutter.xcframework` 分發給其他開發者、
機器或持續整合系統。
Flutter 仍會為已編譯的 Dart 程式碼
以及每個 Flutter 插件產生 iOS 框架。
嵌入這些框架並更新現有應用程式的建置設定。

#### 需求 {:#method-c-reqs}

此方法不需要額外的軟體或硬體需求。
在以下使用情境中採用此方法：

* 團隊成員無法安裝 Flutter SDK 與 CocoaPods
* 你不想在現有的 iOS 應用程式中使用 CocoaPods 作為相依套件管理工具

#### 限制 {:#method-c-limits}

{% render "docs/add-to-app/ios-project/limits-common-deps.md" %}

此方法僅適用於 `beta` 或 `stable` [發布頻道][release channels]。

[release channels]: /install/upgrade#switching-flutter-channels

#### 範例專案結構 {:#method-c-structure}

{% render "docs/add-to-app/ios-project/embed-framework-directory-tree.md" %}

#### 將 Flutter 引擎加入 Podfile

使用 CocoaPods 的宿主應用程式可以將 Flutter 引擎加入其 Podfile。

```ruby title="MyApp/Podfile"
pod 'Flutter', :podspec => '/path/to/MyApp/Flutter/[![build mode]!]/Flutter.podspec'
```

:::note
你必須將 `[build mode]` 的值寫死。
例如，若需要使用 `flutter attach` 請使用 `Debug`，
準備好發布時則使用 `Release`。
:::

#### 連結並嵌入應用程式與插件框架

{% render "docs/add-to-app/ios-project/link-and-embed.md" %}
