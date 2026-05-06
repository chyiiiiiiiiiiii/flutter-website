# 繁中版貢獻指南（docs.flutter.tw）

> 🇹🇼 本文件給想協助改善 [docs.flutter.tw](https://docs.flutter.tw/) 翻譯品質的人。
> 若你要貢獻到上游 [flutter/website](https://github.com/flutter/website)（英文版），請參考下方原文。

## 我可以怎麼幫忙

### 最輕量：回報問題
看到翻譯怪、連結失效、缺中文，[開 issue](https://github.com/chyiiiiiiiiiiii/flutter-website/issues/new/choose) 即可。

### 中等：直接送 PR 修小東西
typo、語句不通、譯名統一這類，**不用先開 issue 討論**，直接送 PR 比較快。

### 大型：補譯整個章節
建議**先開 issue 對齊範圍**，避免重複工作或方向不對。

## 開發流程

### 第一次設定環境

```bash
# 1. Fork 本 repo（GitHub UI 點 Fork 按鈕）

# 2. Clone 你的 fork
git clone https://github.com/<你的帳號>/flutter-website.git
cd flutter-website

# 3. 切到 zh-tw 分支
git checkout zh-tw

# 4. 安裝依賴（需要 Node 22+）
corepack enable    # 第一次才需要
pnpm install
```

### 改一次內容

```bash
# 1. 從 zh-tw 開新 branch
git checkout zh-tw
git pull
git checkout -b fix/typo-in-widget-intro

# 2. 啟動本機 dev server
pnpm run serve
# 開 http://localhost:4000/ 看本機預覽（改檔案會自動 reload）

# 3. 改檔案（內容主要在 src/content/）

# 4. Commit + push
git add .
git commit -m "fix: 修正 widget intro 頁面 typo"
git push -u origin fix/typo-in-widget-intro

# 5. 在 GitHub 開 PR，base 選 zh-tw
```

PR 合進 `zh-tw` 後 5-10 分鐘自動部署到 docs.flutter.tw。

## 翻譯慣例

### 譯名

| 英文 | 繁中 |
|---|---|
| widget | widget（不譯） |
| state | 狀態 |
| build | 建構 |
| navigator | 導航器 |
| route | 路由 |
| stateful / stateless | 有狀態 / 無狀態 |
| immutable | 不可變 |
| package | 套件 |
| plugin | 套件（同 package） |
| platform channel | 平台通道 |

**關鍵原則**：

- 程式碼、API 名稱、type 名稱**永遠保留英文**（`StatefulWidget` 不翻成「有狀態 widget」）
- 第一次出現的英文術語可加括號中文：`Widget（元件）`
- 用台灣用法：軟體 ✕ 软件、影片 ✕ 视频、套件 ✕ 包

### 風格

- 第二人稱用「你」
- 標點用全形（。，：；！？）
- 程式碼跟標題不翻譯
- 連結文字翻譯，但 URL 不動

### 不要動

- `gh-pages` 分支（機器自動產生，手動改會被覆蓋）
- `.github/workflows/`（除非你知道在改什麼）
- `eleventy.config.ts`、`package.json`（除非在做工具升級）
- 程式碼範例的邏輯（只翻譯註解）

## 與上游同步

本專案採「快照模式」，**不即時追 upstream**。Flutter 大版本（4.x、5.x）發布時才整批同步。想協助 sync 流程請先開 issue 討論。

---

# Original (upstream) contributing guide

_以下為原 flutter/website 的 contributing 內容（給想貢獻到上游英文版的人參考）。_

If you would like to contribute to the Flutter project,
we’re happy to have your help! Anyone can contribute, whether you’re new to
the project or you’ve been around a long time, and whether you self-identify
as a developer, an end user, or someone who just can’t stand seeing typos.

If you aren't familiar with how GitHub works, see [Introduction to
GitHub](https://services.github.com/on-demand/intro-to-github/).
We have many [repos in the Flutter project](https://github.com/flutter),
but two of the primary repos are the
[Flutter SDK](https://github.com/flutter/flutter), and this repo, the
[Flutter website](https://github.com/flutter/website).
To contribute a fix to a repo, submit a [pull request
(PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

For information on contributing code or API docs to the Flutter SDK, see
[Contributing to
Flutter](https://github.com/flutter/flutter/blob/main/CONTRIBUTING.md)
in the [Flutter SDK](https://github.com/flutter/flutter) repo.

We are also happy to accept your PRs to the
[Flutter documentation website](https://github.com/flutter/website/) repo,
even if it's just to fix a typo.

For ways to get involved in the Flutter community or to learn about us,
visit the [Flutter community](https://flutter.dev/community) page.

# Ways to contribute

We encourage you to reach out and join the conversation.

An easy way to send feedback is to "thumbs up" issues important to you
in either the issue tracker for the [Flutter SDK and API docs][issues],
or the [docs.flutter.dev website][doc-issues].

Other ways you can contribute:

* [Ask HOW-TO questions that can be answered with specific solutions][so]
* [Live chat with Flutter engineers and users][chat]
* [Discuss Flutter, best practices, app design, and more on our
   mailing list][mailinglist]
* [Report bugs and request features][issues]
* [Report API docs bugs][issues]
* [Submit PRs to the Flutter SDK][PRs]
* [Request docs for docs.flutter.dev][doc-issues]
* [Submit PRs to docs.flutter.dev][doc-PRs]
* [Follow us on Twitter: @flutterdev](https://twitter.com/flutterdev/)
* [Read the Flutter Publication on Medium](https://blog.flutter.dev)
* [Sign up to Future UX Studies on Flutter](https://flutter.dev/research-signup)
* [Join the subreddit to keep up with the latest in the Flutter
   community][reddit]
* [Join the Discord to connect with other developers
   and discuss Flutter][discord]

Happy Fluttering!

[issues]: https://github.com/flutter/flutter/issues
[PRs]: https://github.com/flutter/flutter/pulls
[discord]: https://discord.gg/rflutterdev
[doc-issues]: https://github.com/flutter/website/issues
[doc-PRs]: https://github.com/flutter/website/pulls
[so]: https://stackoverflow.com/tags/flutter
[mailinglist]: https://groups.google.com/d/forum/flutter-dev
[chat]: https://github.com/flutter/flutter/blob/main/docs/contributing/Chat.md
[reddit]: https://www.reddit.com/r/FlutterDev
