# flutter：Flutter 命令列工具 (Command Line Interface)

> 在終端機視窗中使用 'flutter' 的參考頁面。



`flutter` 命令列工具 (Command Line Interface) 是開發者（或 IDE 代表開發者）與 Flutter 互動的方式。若需執行 Dart 相關指令，您可以使用 [`dart`][] 命令列工具。

以下說明如何使用 `flutter` 工具來建立、分析、測試及執行應用程式：

```console
$ flutter create my_app
$ cd my_app
$ flutter analyze
$ flutter test
$ flutter run lib/main.dart
```

要使用 `flutter` 工具執行 [`pub`][`dart pub`] 指令：

```console
$ flutter pub get
$ flutter pub outdated
$ flutter pub upgrade
```

要查看 `flutter` 支援的所有指令：

```console
$ flutter --help --verbose
```

若要取得目前 Flutter SDK（包含其 framework、engine 及工具）的版本資訊，請執行以下操作：

```console
$ flutter --version
```

## `flutter` 指令

下表列出了你可以搭配 `flutter` 工具使用的指令：

| 指令             | 使用範例                                         | 更多資訊                                                                             |
|------------------|--------------------------------------------------|--------------------------------------------------------------------------------------|
| analyze          | `flutter analyze -d <DEVICE_ID>`               | 分析專案的 Dart 原始碼。<br>請改用 [`dart analyze`][]。                           |
| assemble         | `flutter assemble -o <DIRECTORY>`              | 組建並建置 Flutter 資源。                                                           |
| attach           | `flutter attach -d <DEVICE_ID>`                | 連接到正在執行的應用程式。                                                          |
| bash-completion  | `flutter bash-completion`                      | 輸出命令列 Shell 自動補全設定腳本。                                                 |
| build            | `flutter build <BUILD_TARGET>`                 | 建置特定目標的套件組合。                                                            |
| channel          | `flutter channel <CHANNEL_NAME>`               | 列出或切換 Flutter 頻道。                                                            |
| clean            | `flutter clean`                                | 刪除 `build/` 與 `.dart_tool/` 目錄。                                               |
| config           | `flutter config --build-dir=<DIRECTORY>`       | 設定 Flutter 相關設定。若要移除設定，請將其設為空字串。                              |
| create           | `flutter create <DIRECTORY>`                   | 建立新專案。                                                                        |
| custom-devices   | `flutter custom-devices list`                  | 新增、刪除、列出與重設自訂裝置。                                                     |
| devices          | `flutter devices -d <DEVICE_ID>`               | 列出所有已連接的裝置。                                                               |
| doctor           | `flutter doctor`                               | 顯示已安裝工具的相關資訊。                                                           |
| downgrade        | `flutter downgrade`                            | 將 Flutter 降級至目前頻道的上一次使用版本。                                          |
| drive            | `flutter drive`                                | 執行目前專案的 Flutter Driver 測試。                                                 |
| emulators        | `flutter emulators`                            | 列出、啟動與建立模擬器。                                                             |
| gen-l10n         | `flutter gen-l10n <DIRECTORY>`                 | 為 Flutter 專案產生在地化檔案。                                                      |
| install          | `flutter install -d <DEVICE_ID>`               | 將 Flutter 應用程式安裝到已連接的裝置上。                                            |
| logs             | `flutter logs`                                 | 顯示正在執行的 Flutter 應用程式的日誌輸出。                                         |
| precache         | `flutter precache <ARGUMENTS>`                 | 預先下載 Flutter 工具所需的二進位資源到快取中。                                      |
| pub              | `flutter pub <PUB_COMMAND>`                    | 套件管理相關操作。<br>請改用 [`dart pub`][]。                                        |
| run              | `flutter run <DART_FILE>`                      | 執行 Flutter 程式。                                                                 |
| screenshot       | `flutter screenshot`                           | 從已連接裝置擷取 Flutter 應用程式的螢幕截圖。                                       |
| symbolize        | `flutter symbolize --input=<STACK_TRACK_FILE>` | 將 AOT 編譯後的 Flutter 應用程式堆疊追蹤進行符號化。                                |
| test             | `flutter test [<DIRECTORYDART_FILE>]`          | 執行此套件中的測試。<br>請改用 [`dart test`][`dart test`]。                           |
| upgrade          | `flutter upgrade`                              | 升級你的 Flutter 版本。                                                              |

{:.table .table-striped .nowrap}

如需任何指令的進一步協助，請輸入 `flutter help <command>`
或參考 **更多資訊** 欄中的連結。
你也可以取得 `pub` 指令的詳細說明，例如：
`flutter help pub outdated`。

[`dart`]: https://dart.dev/tools/dart-tool
[`dart analyze`]: https://dart.dev/tools/dart-analyze
[`dart format`]: https://dart.dev/tools/dart-format
[`dart pub`]: https://dart.dev/tools/dart-pub
[`dart test`]: https://dart.dev/tools/dart-test

