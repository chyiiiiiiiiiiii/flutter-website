---
title: 設定網頁開發組態檔
short-title: 網頁開發組態
description: >-
  集中管理網頁開發設定，包括開發代理伺服器
---

# 設定網頁開發組態檔
**作者：Sydney Bao**

Flutter 網頁（Flutter web）內建一個開發伺服器，預設會在`localhost`網域，使用 HTTP 並隨機分配埠號來提供您的應用程式服務。雖然命令列參數（command-line arguments）可以快速修改伺服器行為，本文件將著重於更有結構化的方法：透過集中管理的`web_dev_config.yaml`檔案來定義伺服器行為。這個組態檔讓您能夠自訂伺服器設定——主機（host）、埠號（port）、HTTPS 設定，以及代理規則（proxy rules）——確保開發環境的一致性。

## 建立組態檔

在您的 Flutter 專案根目錄新增一個`web_dev_config.yaml`檔案。如果您尚未建立 Flutter 專案，請參考 [Building a web application with Flutter][Building a web application with Flutter] 開始操作。

[Building a web application with Flutter]: /platform-integration/web/building

## 新增組態設定

### 基本伺服器組態

您可以為開發伺服器定義主機（host）、埠號（port）以及 HTTPS 設定。

```yaml title="web_dev_config.yaml"
server:
  host: "0.0.0.0" # Defines the binding address <string>
  port: 8080 # Specifies the port <int> for the development server
  https: 
    cert-path: "/path/to/cert.pem" # Path <string> to your TLS certificate
    cert-key-path: "/path/to/key.pem" # Path <string> to TLS certificate key
```

### 自訂標頭

你也可以將自訂 HTTP 標頭（custom HTTP headers）注入到開發伺服器的回應中。

```yaml title="web_dev_config.yaml"
server:
  headers:
    - name: "X-Custom-Header" # Name <string> of the HTTP header
      value: "MyValue" # Value <string> of the HTTP header
    - name: "Cache-Control"
      value: "no-cache, no-store, must-revalidate"
```

### Proxy 設定

請求會依照 `web_dev_config.yaml` 檔案中的順序進行比對。

#### 基本字串代理（Basic string proxy）

若需進行簡單的路徑前綴比對，請使用 `prefix` 欄位。

```yaml title="web_dev_config.yaml"
server:
  proxy:
    - target: "http://localhost:5000/" # Base URL <string> of your backend
      prefix: "/users/" # Path <string>
    - target: "http://localhost:3000/"
      prefix: "/data/"
      replace: "/report/" # Replacement <string> of path in redirected URL (optional)
    - target: "http://localhost:4000/"
      prefix: "/products/"
      replace: ""
```

**說明：**

*   對 `/users/names` 的請求會被轉發至 `http://localhost:5000/users/names`。
*   對 `/data/2023/` 的請求會被轉發至 `http://localhost:3000/report/2023`，因為 `replace: “/report/”` 會將 `/data/` 前綴取代。
*   對 `/products/item/123` 的請求會被轉發至 `http://localhost:4000/item/123`，因為 `replace: ""` 會將 `/products/` 前綴移除（取代為空字串）。

#### 進階正則表達式代理（Advanced regex proxy）

你也可以使用 `regex` 欄位，以進行更靈活且複雜的匹配。

```yaml title="web_dev_config.yaml"
server:
  proxy:
    - target: "http://localhost:5000/"
      regex: "/users/(\d+)/$" # Path <string> matches requests like /users/123/
    - target: "http://localhost:4000/"
      regex: "^/api/(v\d+)/(.*)" # Matches requests like /api/v1/users
      replace: "/$2?apiVersion=$1" # Allows capture groups (optional)
```

**說明：**

*   對 `/users/123/` 的請求會完全符合第一條規則，因此會被轉發到 `http://localhost:5000/users/123/`。
*   對 `/api/v1/users/profile/` 的請求以第二條規則的路徑開頭，因此會被轉發到 `http://localhost:4000/users/profile/?apiVersion=v1`。

## 設定優先順序

請記得設定的優先順序如下：

1. **命令列參數 (Command-line arguments)**（例如 `--web-hostname`、`--web-port`）
2. **`web_dev_config.yaml` 設定**
3. **內建預設值**
