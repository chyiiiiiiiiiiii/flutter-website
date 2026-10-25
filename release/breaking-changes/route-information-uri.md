# `RouteInformation.location` 的遷移指南

> RouteInformation.location 及其相關 API 的棄用說明。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`RouteInformation.location` 及相關 API 已被棄用，
建議改用 `RouteInformation.uri`。

## 背景說明

[`RouteInformation`][] 需要 authority 資訊，
以處理來自不同網域的行動裝置深層連結 (deep links)。
在 `RouteInformation` 中新增了 `uri` 欄位，
用於完整記錄深層連結資訊，並將與路由相關的參數
轉換為完整的 [`Uri`][] 格式。
因此，與之不相容的 API 已被棄用。

## 變更說明

* `RouteInformation.location` 已由 `RouteInformation.uri` 取代。
* `WidgetBindingObserver.didPushRoute` 已被棄用。
* `SystemNavigator.routeInformationUpdated` 的 `location` 參數
  已被新加入的 `uri` 參數取代。

## 遷移指南

遷移前的程式碼：

```dart
const RouteInformation myRoute = RouteInformation(location: '/myroute');
```

遷移後的程式碼：

```dart
final RouteInformation myRoute = RouteInformation(uri: Uri.parse('/myroute'));
```

遷移前的程式碼：

```dart
final String myPath = myRoute.location;
```

遷移後的程式碼：

```dart
final String myPath = myRoute.uri.path;
```

遷移前的程式碼：

```dart
class MyObserverState extends State<MyWidget> with WidgetsBindingObserver {
  @override
  Future<bool> didPushRoute(String route) => _handleRoute(route);
}
```

遷移後的程式碼：

```dart
class MyObserverState extends State<MyWidget> with WidgetsBindingObserver {
  @override
  Future<bool> didPushRouteInformation(RouteInformation routeInformation) => _handleRoute(
    Uri.decodeComponent(
      Uri(
        path: uri.path.isEmpty ? '/' : uri.path,
        queryParameters: uri.queryParametersAll.isEmpty ? null : uri.queryParametersAll,
        fragment: uri.fragment.isEmpty ? null : uri.fragment,
      ).toString(),
    )
  );
}
```

遷移前的程式碼：

```dart
SystemNavigator.routeInformationUpdated(location: '/myLocation');
```

遷移後的程式碼：

```dart
SystemNavigator.routeInformationUpdated(uri: Uri.parse('/myLocation'));
```

## 時程

合併於版本：3.10.0-13.0.pre<br>
正式版發佈於：3.13.0

## 參考資料

相關 PR：

* [PR 119968][]：為 RouteInformation 及 didPushRouteInformation 實作 URL 支援。

[PR 119968]: https://github.com/flutter/flutter/pull/119968
[`RouteInformation`]: https://api.flutter.dev/flutter/widgets/RouteInformation-class.html
[`Uri`]: https://api.flutter.dev/flutter/dart-core/Uri-class.html

