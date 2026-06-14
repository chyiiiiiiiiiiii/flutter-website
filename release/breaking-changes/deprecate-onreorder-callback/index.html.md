# 棄用 onReorder 回呼（callback）

> onReorder 回呼（callback）已被棄用， 改以新的回呼（callback）onReorderItem 取代。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`ReorderableListView`、`ReorderableListView.builder`、
`ReorderableList` 及 `SliverReorderableList` 元件 (Widget) 中的
`onReorder` 回呼（callback）已被新的回呼（callback）`onReorderItem` 取代，
後者為 `newIndex` 提供了更直覺的行為。

## 背景

`ReorderableListView`、`ReorderableListView.builder`、
`ReorderableList` 及 `SliverReorderableList` 元件中的 `onReorder` 回呼（callback），
在 `oldIndex` 位於 `newIndex` 之前的情況下，
需要對第二個參數 `newIndex` 進行手動修正，
因為此時項目清單會縮短一個元素。

```dart
void handleReorder(int oldIndex, int newIndex) {
  if (oldIndex < newIndex) {
    // Removing the item at oldIndex shortens the list by 1.
    newIndex -= 1;
  }

  // Handle the actual reorder behavior...
}

ReorderableListView(
  onReorder: handleReorder,
)
```

新的回呼（callback）`onReorderItem` 透過自動進行修正來解決此問題。

```dart
void handleReorder(int oldIndex, int newIndex) {
  // Handle the actual reorder behavior...
}

ReorderableListView(
  onReorderItem: handleReorder,
)
```

## 遷移指南

`ReorderableListView`、`ReorderableListView.builder`、
`ReorderableList` 及 `SliverReorderableList` 元件
共用相同的排序邏輯。
相同的遷移步驟適用於上述每個元件。

本遷移指南以 `ReorderableListView` 作為範例。

### 情況一：簡單的回呼（callback） {: #case-1-simple-callbacks }

遷移前的程式碼：

```dart
ReorderableListView(
  onReorder: (int oldIndex, int newIndex) {
    if (oldIndex < newIndex) {
      newIndex -= 1;
    }

    // Handle reorder ...
  }
)
```

遷移後的程式碼：

```dart diff
  ReorderableListView(
-   onReorder: (int oldIndex, int newIndex) {
-     if (oldIndex < newIndex) {
-       newIndex -= 1;
-     }
-
+   onReorderItem: (int oldIndex, int newIndex) {
      // Handle reorder ...
    }
  )
```

### 情況二：針對複雜 `onReorder` 實作的退出方案 {: #case-2-opt-out }

在某些情況下，例如所提供的回呼（callback）較為複雜時，
遷移至新的 `onReorderItem` 回呼（callback）可能並不直觀。

在這些情況下，若要退出新的行為，
請調整 `newIndex` 以符合舊有行為。

遷移前的程式碼：

```dart
void handleSomeComplexReorder(int oldIndex, int newIndex) {
  // Handle reorder ...
}

ReorderableListView(
  onReorder: (int oldIndex, int newIndex) {
    handleSomeComplexReorder(oldIndex, newIndex);
  }
)
```

遷移後的程式碼：

```dart diff
  void handleSomeComplexReorder(int oldIndex, int newIndex) {
    // Handle reorder ...
  }

  ReorderableListView(
-   onReorder: (int oldIndex, int newIndex) {
+   onReorderItem: (int oldIndex, int newIndex) {
+     // To get the equivalent of the old newIndex:
+     if (oldIndex < newIndex) {
+       newIndex += 1;
+     }
+
      return handleSomeComplexReorder(oldIndex, newIndex);
    }
  )
```

:::important
由於第二個回呼（callback）參數的語意已有所變更，
此遷移不支援 `dart fix`。
:::

## 時間表

版本導入：3.41.0-1.0.pre-364<br>
穩定版發布：3.44

## 參考資料

API 文件：

* [`ReorderCallback`][]
* [`ReorderableList`][]
* [`ReorderableListView`][]
* [`SliverReorderableList`][]

相關 Issue：

* [The index parameter for ReorderableListView's onReorderCallback is confusing][issue-127901]
* [SliverReorderableList newIndex arg off by one on drag down list][issue-169878]

相關 PR：

* [Deprecate onReorder callback][]

[`ReorderCallback`]: https://api.flutter.dev/flutter/widgets/ReorderCallback.html
[`ReorderableList`]: https://api.flutter.dev/flutter/widgets/ReorderableList-class.html
[`ReorderableListView`]: https://api.flutter.dev/flutter/material/ReorderableListView-class.html
[`SliverReorderableList`]: https://api.flutter.dev/flutter/widgets/SliverReorderableList-class.html

[issue-127901]: https://github.com/flutter/flutter/issues/127901
[issue-169878]: https://github.com/flutter/flutter/issues/169878
[Deprecate onReorder callback]: https://github.com/flutter/flutter/pull/178242

