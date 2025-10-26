---
title: DevTools 發行說明
description: 了解 Dart 與 Flutter DevTools 的最新變更。
showToc: false
---

本頁整理了 DevTools 官方穩定版的變更摘要。  
若需查看完整的變更清單，請參閱  
[DevTools git log]({{site.repo.organization}}/devtools/commits/master)。

Dart 與 Flutter SDK（軟體開發套件）均已內建 DevTools。  
若要檢查您目前的 DevTools 版本，  
請在命令列執行以下指令：

```console
$ dart devtools --version
```

### 發行說明

{% comment %}
在新增新版 DevTools 發行說明時，
請務必將版本號加入位於 `/src/_data/devtools_releases.yml` 的清單中。
{% endcomment -%}

{% assign releases = devtools_releases.releases %}

{% for release in releases -%}
* [{{release}} 發行說明](/tools/devtools/release-notes/release-notes-{{release}})
{% endfor -%}
