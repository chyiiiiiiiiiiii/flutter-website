---
title: 支援的部署平台
shortTitle: 支援的平台
description: Flutter 支援的平台及其對應的作業系統版本。
---

截至 Flutter {{site.currentFlutterVersion}}，
Flutter 支援在下列硬體架構與作業系統版本的組合上部署應用程式。
這些組合稱為 _平台_（platforms）。

Flutter 依照下列方式對平台進行分類：

* **支援（Supported）**：Flutter 團隊官方支援的平台與版本。
* **CI 測試（CI-tested）**：Flutter 團隊在每次提交時都會針對這些平台進行測試。
* **不支援（Unsupported）**：Flutter 團隊不會針對這些平台進行測試或支援。

根據這些分類，
Flutter 支援部署至下列平台。

{% assign opsys = platforms %}

| 目標平台 | 目標架構 | 支援的版本 | CI 測試版本 | 不支援的版本 |
|---|:---:|:---:|:---:|:---:|
{%- for platform in opsys %}
  | {{platform.platform}} | {{platform.target-arch}} | {{platform.supported}} | {{platform.ci-tested}} | {{platform.unsupported}} |
{%- endfor %}

{:.table .table-striped}
