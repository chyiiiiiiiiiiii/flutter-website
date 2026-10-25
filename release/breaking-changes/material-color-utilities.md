# Flutter 中 Material Color Utilities 更新

> 最新版 Material Color Utilities 已套用至 Flutter Material 函式庫。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

此版本將 `package:material_color_utilities` 從
`v0.11.1` 升級至 `0.13.0`。
此更新套件包含與 [Material 3 Token 更新][Material 3 tokens update] 對齊的
演算法變更。

演算法變更影響相同的屬性：

* `onPrimaryContainer`
* `onSecondaryContainer`
* `onTertiaryContainer`
* `onErrorContainer`

這些變更將在使用以下方式產生配色方案時反映出來：

* `ColorScheme.fromSeed`
* `ColorScheme.fromImageProvider`
* `ThemeData(colorScheme:..)`

[Material 3 tokens update]: /release/breaking-changes/material-design-3-token-update

## 遷移指南

一般而言，我們相信所產生的顏色將更易讀且在視覺上更吸引人，但若您在升級後希望維持先前的顏色，則需要在產生後手動將這些屬性設定為所需的顏色。

## 時間軸

導入版本：3.39.0-1.0.pre-250<br>
穩定版本：3.41

## 參考資料

* [手動更換 material_color_utilities][Manually roll material_color_utilities]

[Manually roll material_color_utilities]: https://github.com/flutter/flutter/pull/170000

