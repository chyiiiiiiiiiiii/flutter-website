# 將 MaterialState 重新命名為 WidgetState

> MaterialState 及其相關 API 已移出 Material 函式庫， 並重新命名為 WidgetState。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`MaterialState` 及其相關 API 已從 Material 函式庫中移除，
並重新命名為 `WidgetState`。

## 背景

過去，`MaterialState` 提供了處理元件（Widget）可擁有的多種不同狀態的邏輯，
例如「滑鼠懸停（hovered）」、「獲得焦點（focused）」以及「已停用（disabled）」等。
由於這項功能在 Material 函式庫之外也很有用，
特別是在基礎 Widgets 層和 Cupertino，
因此決定將其移出 Material 函式庫。
作為這次調整的一部分，並為了避免未來產生混淆，
不同的 `MaterialState` 類別已重新命名為 `WidgetState`。
兩者的行為完全相同。

| 調整前                          | 調整後                           |
|---------------------------------|-------------------------------|
| `MaterialState`                 | `WidgetState`                 |
| `MaterialStatePropertyResolver` | `WidgetStatePropertyResolver` |
| `MaterialStateColor`            | `WidgetStateColor`            |
| `MaterialStateMouseCursor`      | `WidgetStateColorMouseCursor` |
| `MaterialStateBorderSide`       | `WidgetStateBorderSide`       |
| `MaterialStateOutlinedBorder`   | `WidgetStateOutlinedBorder`   |
| `MaterialStateTextStyle`        | `WidgetStateTextStyle`        |
| `MaterialStateProperty`         | `WidgetStateProperty`         |
| `MaterialStatePropertyAll`      | `WidgetStatePropertyAll`      |
| `MaterialStatesController`      | `WidgetStatesController`      |

`MaterialStateOutlineInputBorder` 和
`MaterialStateUnderlineInputBorder` 這兩個類別仍保留在 Material 函式庫中，
且沒有對應的 `WidgetState`，因為它們是 Material Design 專屬的。

## 遷移指南

提供了一個 [Flutter fix][]，可協助將 `MaterialState`
類別遷移至 `WidgetState`。

若要遷移，請將 `MaterialState` 替換為 `WidgetState`。

遷移前的程式碼：

```dart
MaterialState selected = MaterialState.selected;

final MaterialStateProperty<Color> backgroundColor;

class _MouseCursor extends MaterialStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final MaterialPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<MaterialState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = MaterialStateBorderSide.resolveWith((Set<MaterialState> states) {
  if (states.contains(MaterialState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

遷移後的程式碼：

```dart
WidgetState selected = WidgetState.selected;

final WidgetStateProperty<Color> backgroundColor;

class _MouseCursor extends WidgetStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final WidgetPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<WidgetState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = WidgetStateBorderSide.resolveWith((Set<WidgetState> states) {
  if (states.contains(WidgetState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

## 時程

合併於版本：3.21.0-11.0.pre<br>
進入穩定版：3.22.0

## 參考資料

相關議題（issues）：

* [Create widgets level support for State][]

相關 PR：

* [Widget State Properties][]

[Create widgets level support for State]: https://github.com/flutter/flutter/issues/138270
[Flutter fix]: /tools/flutter-fix
[Widget State Properties]: https://github.com/flutter/flutter/pull/142151

