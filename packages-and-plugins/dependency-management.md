# 套件相依性管理

> 了解 Flutter 與 Dart 如何解析套件相依性， 以及如何處理版本衝突。



在建置 Flutter 應用程式時，
你經常會使用外部套件來擴充功能。
每個套件又可能依賴其他套件，形成一棵相依性樹。
了解 Dart 與 Flutter 如何管理這些相依性，
有助於你解決版本衝突，並讓應用程式保持穩定。

## 相依性解析的運作方式

你的 Flutter 專案會在 `pubspec.yaml` 檔案中指定相依性。
當你執行 `flutter pub get` 時，
套件管理工具會解析這些相依性，
並將確切的版本記錄在 `pubspec.lock` 檔案中。

### 直接與傳遞相依性

相依性可以是直接的，也可以是傳遞的：

**直接相依性 (Direct dependencies)**
: 你明確列在 `pubspec.yaml` 檔案的 `dependencies` 或
  `dev_dependencies` 區段中的套件。

**傳遞相依性 (Transitive dependencies)**
: 你的直接相依套件所依賴的套件。
  你不會把這些套件列在 `pubspec.yaml` 檔案中，
  但專案需要它們才能編譯。

### pubspec.lock 檔案

`pubspec.lock` 檔案包含專案中使用的每個直接與
傳遞相依套件的確切版本。
這個檔案可確保團隊中的每位開發者以及建置伺服器，
都使用完全相同的套件版本。
應用程式專案請將 `pubspec.lock` 檔案提交到版本控制，
套件專案則不需要。

:::note 使用版本範圍，而非確切版本
由於 `pubspec.lock` 一律會鎖定確切版本以確保建置可預測，
你應該在 `pubspec.yaml` 檔案中使用版本範圍
（可以使用下方介紹的插入符號語法）。
這讓版本解析器能找到
相容的傳遞相依套件版本，
也讓你可以透過 `flutter pub upgrade` 安全地更新相依套件。
:::

## 版本解析器的角色

與某些套件管理工具不同，
Dart 套件管理工具 (`pub`) 只允許應用程式的編譯樹中
每個套件僅存在單一版本。

這項限制有幾個原因：

1.  **型別安全：**
    如果應用程式使用同一個套件的兩個版本，
    可能會出現型別不符的錯誤。
    例如，若某套件的 `v1` 與 `v2` 都定義了 `User` 類別，
    Dart 編譯器會將它們視為兩個不同的型別。
    你無法把 `v1.User` 傳給需要 `v2.User` 的方法。
1.  **二進位檔大小：**
    包含同一個套件的多個版本
    會增加應用程式的大小。
1.  **全域狀態：**
    許多套件使用全域變數或單例 (singleton)。
    同時存在多份套件副本可能
    導致狀態不一致或產生錯誤。

版本解析器的工作是檢視
你的直接與傳遞相依套件的所有版本限制，
並為每個套件找出一個能滿足所有限制的具體版本。

## 了解版本限制

在 `pubspec.yaml` 中宣告相依套件時，
你會指定一個版本限制。
Dart 套件採用[語意化版本][Semantic Versioning] (SemVer)。
版本號碼由三個部分組成：`major.minor.patch`（例如 `2.1.4`）。

你可以在 `pubspec.yaml` 檔案中
使用不同的語法來定義版本限制：

[Semantic Versioning]: https://semver.org/spec/v2.0.0-rc.1.html

### 插入符號語法

插入符號語法 (`^`) 是定義版本限制最常見的方式。
它會告訴解析器使用任何與指定版本
相容的版本。

* 對於穩定版本（1.0.0 以上），
  插入符號允許不變更主版本號的更新：
  * `^1.2.3` 等同於 `>=1.2.3 <2.0.0`
* 對於預發行版本或 1.0.0 之前的版本，
  次版本號或修訂版本號的任何變更都可能帶來破壞性變更。
  因此，插入符號限制會更嚴格：
  * `^0.8.0` 等同於 `>=0.8.0 <0.9.0`
  * `^0.0.3` 等同於 `>=0.0.3 <0.0.4`

### 傳統範圍

你可以使用比較運算子來定義明確的版本範圍：

```yaml
dependencies:
  url_launcher: '>=5.4.0 <6.0.0'
```

### 任意版本

如果你沒有指定版本限制，或使用 `any`，
解析器可以選擇任何版本：

```yaml
dependencies:
  url_launcher: any
```

:::note 避免使用 `any`
我們不建議使用 `any`，因為套件日後的更新可能
引入破壞性變更，導致建置失敗。
:::

## 了解相依性衝突

當相依性樹中的兩個套件要求
同一個傳遞相依套件的不相容版本時，就會發生相依性衝突。

請思考以下範例情境：

1.  你的應用程式有兩個直接相依套件：`package_a` 與 `package_b`。
1.  `package_a` 依賴 `foo: ^1.0.0`。
1.  `package_b` 依賴 `foo: ^2.0.0`。

![版本解析器衝突](/assets/images/docs/development/packages-and-plugins/version-solver.png)

由於 `foo` 不可能同時是 `^1.0.0`（即 `<2.0.0`）與
`^2.0.0`（即 `>=2.0.0`），版本解析器會失敗。

當你執行 `flutter pub get` 或嘗試建置應用程式時，
解析器會印出一則錯誤訊息：

```console
Because every version of package_a depends on foo ^1.0.0 and
every version of package_b depends on foo ^2.0.0,
package_a is incompatible with package_b.
So, because my_app depends on both package_a ^1.0.0
and package_b ^1.0.0, version solving failed.
```

要解讀這則錯誤訊息，請在相依性圖中
由下往上追蹤衝突：

1.  找出發生衝突的套件 (`foo`)。
1.  找出哪些套件要求了互相衝突的版本。
    例如，`package_a` 要求 `foo: ^1.0.0`，而
    `package_b` 要求 `foo: ^2.0.0`。
1.  檢查是哪些直接相依套件引入了這些衝突的套件。
    例如，`my_app` 同時依賴
    `package_a: ^1.0.0` 與 `package_b: ^1.0.0`。

## 解決相依性衝突

你可以依照以下步驟來解決相依性衝突。

### 升級套件版本

在進行手動變更之前，先檢查是否有更新且
相容的相依套件版本。
執行以下指令，將套件升級到
`pubspec.yaml` 限制所允許的最新版本：

```bash
flutter pub upgrade
```

若要查看哪些套件在目前的限制之外
還有更新的版本，請執行：

```bash
flutter pub outdated
```

若要升級到較新的主要版本，
請執行 `flutter pub upgrade --major-versions`。
這個指令會更新 `pubspec.yaml` 檔案中的限制，
以允許最新可解析的版本，然後
執行 `flutter pub get` 來取得這些升級後的相依套件。

### 使用相依性覆寫

如果因為其中一個套件尚未更新而找不到相容的版本，
你可以強制版本解析器使用特定版本。
在 `pubspec.yaml` 檔案中加入 `dependency_overrides` 區段：

```yaml
dependencies:
  package_a: ^1.0.0
  package_b: ^1.0.0

dependency_overrides:
  foo: ^2.0.0
```

這會覆寫 `foo` 的所有限制，
並強制版本解析器使用 `^2.0.0`。

:::warning
相依性覆寫只應作為暫時的解決方式。
如果這些套件實際上並不相容，
繞過版本解析器可能造成
編譯錯誤或執行階段當機（例如 `NoSuchMethodError`）。
套用覆寫後，請徹底測試你的應用程式。
:::

:::note
相依性覆寫只會套用於根套件。
如果你正在開發要發布到 pub.dev 的套件，
請不要在 `pubspec.yaml` 檔案中包含 `dependency_overrides`，因為
依賴你套件的其他專案會忽略它們。
:::

### 支持生態系

如果某個套件沒人維護或更新緩慢，
你可以協助解決問題：

1.  **提出 issue：**
    在該套件的儲存庫中搜尋既有的 issue，或
    提出新的 issue 通知維護者。
1.  **提交 pull request：**
    如果你能修正衝突，請 fork 該套件的儲存庫、
    更新限制，並提交 pull request。
1.  **使用 git 或 path 相依性：**
    在等待維護者合併你的 pull request 時，
    你可以讓 `pubspec.yaml` 指向你的 fork 或本機副本：

    ```yaml
    dependencies:
      package_a:
        git:
          url: https://github.com/your-username/package_a.git
          ref: update-foo-dependency
    ```

## 了解更多

如需更多關於 Dart 如何管理相依性的資訊，
請參考以下資源：

* dart.dev 上的[套件版本管理][Package versioning]
* dart.dev 上的[Pub 相依性][Pub dependencies]
* dart.dev 上的[相依性覆寫][Dependency overrides]

[Dependency overrides]: https://dart.dev/tools/pub/dependencies#dependency-overrides
[Package versioning]: https://dart.dev/tools/pub/versioning
[Pub dependencies]: https://dart.dev/tools/pub/dependencies

