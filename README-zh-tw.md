# Flutter 繁體中文文件（docs.flutter.tw）

這是 [flutter/website](https://github.com/flutter/website) 的台灣繁體中文翻譯 fork，
經 `zh-tw` 分支自動部署到 **<https://docs.flutter.tw>**。

翻譯採就地覆寫：中文直接覆蓋同一個 `.md` 裡的英文，只翻 frontmatter 的
`title` / `shortTitle` / `description` 與正文；程式碼、frontmatter key、URL、
Liquid / 元件標籤一律保持原樣。

## 想協助更新文件？

本 repo 內建一個 [Claude Code](https://claude.ai/code) 技能，把「同步官方最新版 →
平行翻譯有變動的頁面 → 驗證 → 部署」整套流程自動化：

1. 用 Claude Code 開啟本 repo。
2. 輸入 `/flutter-tw-sync`，依指示進行。

技能內容與完整流程（含已知陷阱）見
[`.claude/skills/flutter-tw-sync/SKILL.md`](.claude/skills/flutter-tw-sync/SKILL.md)。

也歡迎直接用一般方式貢獻：發現誤譯或不通順的地方，
請開 [issue](https://github.com/chyiiiiiiiiiiii/flutter-website/issues) 或送 PR。

## 回報問題

- 翻譯問題（誤譯、不通順、術語不一致）：開 issue 或送 PR。
- 文件內容本身的問題（非翻譯）：請回報到上游 [flutter/website](https://github.com/flutter/website)。
