---
title: 貢獻文件
shortTitle: 文件
description: >-
  了解如何為 Dart 與 Flutter 文件網站做出貢獻。
---

:::warning
本文檔仍在持續編輯中。
:::

## 貢獻指南

- [寫作](/contribute/docs/writing)
- [Markdown](/contribute/docs/markdown)
- [Frontmatter](/contribute/docs/frontmatter)
- [程式碼區塊](/contribute/docs/code-blocks)
- [程式碼摘錄](/contribute/docs/excerpts)
- [元件](/contribute/docs/components)
- [側邊導覽](/contribute/docs/sidenav)
- [發行版本](/contribute/docs/releases)
- [命令列工具](/contribute/docs/cli)

## 儲存庫結構

- `.github/`

  GitHub [actions][gh-actions]、議題與 PR [範本][gh-templates]，以及 [dependabot][dependabot] 的設定。
- `cloud_build/`

  用於網站預備與部署的 Google [Cloud Build][Cloud Build] 設定。
- `diagrams/`

  網站上所使用圖表的原始檔案。
- `examples/`

  文件程式碼區塊中所用的 [程式碼摘錄][code excerpts] 原始檔案。
- `src/`
  - `_11ty/`

    [11ty][11ty]、[Liquid][Liquid] 與 Markdown 的自訂擴充功能。
    - `plugins/`
    - `syntax/`

      用於語法高亮的 [Shiki][Shiki] 主題。
    - `filters.ts`
    - `shortcodes.ts`
  - `_data/`

    用於全站模板資料的 YAML 與 JSON 檔案。
  - `_includes/`

    由 liquid [render 與 include][render and include] 指令所使用的片段檔案。
  - `_layouts/`

    網站頁面所使用的版型模板。
  - `_sass/`

    以 [sass][sass] 撰寫的產生文件樣式。
  - `content/`

    網站內容的根目錄。
    - `assets/`

      網站所用資源（包含圖片）的目錄。
    - `...`

      其他存放網站內容的目錄。
- `tool/`
  - `flutter_site/` 和 `dash_site/`

    `dash_site` 工具的實作目錄。
- `dash_site`

  網站命令列工具的進入點腳本。
- `eleventy.config.ts`

  網站 [11ty][11ty] 靜態網站產生設定的進入點。
- `firebase.json`

  用於預備與部署網站的 [Firebase Hosting][Firebase Hosting] 設定。
- `package.json`

  所用 [npm][npm] 相依套件的設定。

[gh-actions]: https://docs.github.com/actions
[gh-templates]: https://docs.github.com/communities/using-templates-to-encourage-useful-issues-and-pull-requests
[dependabot]: https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide

[Cloud Build]: https://cloud.google.com/build
[code excerpts]: /contribute/docs/excerpts

[Shiki]: https://shiki.style/
[render and include]: https://liquidjs.com/tags/render.html
[sass]: https://sass-lang.com/

[Liquid]: https://liquidjs.com/
[11ty]: https://www.11ty.dev/
[Firebase Hosting]: https://firebase.google.com/docs/hosting
[npm]: https://www.npmjs.com/
