# ListTile 在偵錯模式下被有色元件包裹時會回報錯誤

> ListTile 現在會在偵錯模式下，當它被具有不透明背景色的中間元件包裹時回報錯誤。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

當一個具有不透明背景色的元件 (Widget)，例如設定了 `color` 的 `Container` 或 `ColoredBox`，位於 `ListTile` 與其最近的 `Material` 祖先之間時，框架現在會回報錯誤。

## 背景

`ListTile` 會在最近的 `Material` 祖先上繪製背景色與墨水濺射效果 (ink splashes)。當一個具有不透明背景色的元件被放置在 `ListTile` 與其 `Material` 祖先之間時，這個元件會遮蔽這些視覺效果，使使用者看不到它們。

為了避免您不小心引入此錯誤並困惑於 `ListTile` 的背景或墨水濺射效果為何未顯示，框架現在會在開發過程中回報一個斷言錯誤 (assertion error)。

若您的程式碼在 `ListTile` 與 `Material` 元件之間有一個中間有色元件，您現在將會看到類似以下的錯誤：

```text
ListTile background color or ink splashes may be invisible.
The ListTile is wrapped in a Container that has a background color.
Because ListTile paints its background and ink splashes on
the nearest Material ancestor, this Container will hide those effects.
To fix this, wrap the ListTile in its own Material widget, or
remove the background color from the intermediate Container.
```

## 遷移指南

若要修正此錯誤，請移除中間元件的背景色，或將 `ListTile` 包裹在其專屬的 `Material` 元件中。

遷移前的程式碼：

```dart
// The colored Container hides the ink splashes from the ListTile.
Material(
  child: Container(
    color: Colors.pink,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

遷移後的程式碼：

```dart
// Use a Material widget directly for the background color.
Material(
  color: Colors.pink,
  child: Container(
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

或者，將 `ListTile` 包裹在其專屬的 `Material` 元件中：

```dart
Container(
  color: Colors.blue,
  child: Material(
    type: MaterialType.transparency,
    child: ListTile(
      title: const Text('Title'),
      onTap: () {},
    ),
  ),
)
```

## 時間軸

導入版本：3.43.0-0.1.pre<br>
穩定版本：3.44

## 參考資料

API 文件：

* [`ListTile`][]
* [`Material`][]

相關議題：

* [`ListTile.selectedTileColor` not visible when parent `Container` has explicit background color][issue-174366]

相關 PR：

* [Add warning when there is a widget with color between `Material` and `ListTile`][pr-181402]

[`ListTile`]: https://api.flutter.dev/flutter/material/ListTile-class.html
[`Material`]: https://api.flutter.dev/flutter/material/Material-class.html
[issue-174366]: https://github.com/flutter/flutter/issues/174366
[pr-181402]: https://github.com/flutter/flutter/pull/181402

