---
title: "Flutter 中的點縮寫語法"
description: "學習如何使用 Dart 的點縮寫語法（dot shorthands），撰寫更簡潔的 Flutter 程式碼。"
---

**點縮寫語法 (dot shorthands)** 功能讓你在存取靜態成員、建構子或列舉值時，可以省略明確的型別名稱，前提是編譯器能從周圍的上下文中推斷出型別。

:::note
關於此功能的技術概觀，請參閱 Dart 文件中的
[Dot Shorthands guide](https://dart.dev/language/dot-shorthand)。
:::

## 點縮寫語法的重要性 {:#why-dot-shorthands-matter}

在 Flutter 中建置版面配置時，通常會涉及深度巢狀的元件 (Widget) 樹狀結構。
過去，這意味著要為顏色、字體排版和對齊等屬性反覆輸入明確的類別名稱和列舉名稱。點縮寫語法減少了這類樣板程式碼，讓程式碼更易於閱讀、撰寫也更快速。

以下是建置一個簡單 `Container` 的對照比較：

### 不使用點縮寫語法
```dart
Container(
  alignment: Alignment.center,
  padding: const EdgeInsets.all(16.0),
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: FontWeight.bold,
        ),
      ),
    ],
  ),
);
```

### 使用點縮寫語法
```dart
Container(
  alignment: .center, // Instead of Alignment.center,
  padding: const .all(16.0), // Instead of EdgeInsets.all(16.0)
  child: Column(
    mainAxisAlignment: .center, // Instead of MainAxisAlignment.center
    crossAxisAlignment: .start, // Instead of CrossAxisAlignment.start
    children: [
      Text(
        'Hello World',
        style: TextStyle(
          fontWeight: .bold, // Instead of FontWeight.bold
        ),
      ),
    ],
  ),
);
```

## 適用場合 {:#where-to-use-dot-shorthands}

只要 Dart 編譯器有明確的「上下文型別 (context type)」，也就是確切知道它所期望的型別，就可以使用點縮寫語法。在 Flutter 中，這幾乎涵蓋了元件屬性列表內的所有位置。

Flutter 中最常見的點縮寫語法使用目標為：

*   **列舉 (Enums)**：`MainAxisAlignment`、`CrossAxisAlignment`、`BoxFit`、`TextDirection`。
*   **靜態屬性與方法**：`FontWeight`（如 `.bold` 等常數）。
*   **建構子**：`EdgeInsets.all()`、`BorderRadius.circular()`。

### 範例：列舉

當屬性期望一個列舉 (enum) 值（例如 `mainAxisAlignment`）時，你可以省略列舉的名稱，只需在值前加上點（`.`）：

```dart
Row(
  mainAxisAlignment: .spaceEvenly, // Infers MainAxisAlignment.spaceEvenly
  children: [ /* ... */ ],
)
```

### 範例：靜態屬性

當上下文型別恰好是定義該屬性的類別時，靜態屬性就能使用點縮寫語法。常見的範例是使用 `FontWeight` 設定文字樣式：

```dart
Text(
  'Feature highlights',
  style: TextStyle(
    fontWeight: .bold, // Infers FontWeight.bold
  ),
)
```

### 範例：建構子

你也可以對具名建構子使用點縮寫語法。許多 Flutter 版面配置屬性接受 `EdgeInsetsGeometry` 等基底類別。為了支援點縮寫語法，Flutter 在這些基底類別中新增了重新導向建構子，並指向適當的子類別。

```dart
Padding(
  padding: .symmetric(horizontal: 16.0, vertical: 8.0), // Infers EdgeInsetsGeometry.symmetric
  child: Text('Spaced out text'),
)
```

你甚至可以使用 `.new` 呼叫未具名建構子，不過這在標準元件樹中較為少見：

```dart
class _MyState extends State<MyWidget> {
  final ScrollController _scrollController = .new(); // Infers ScrollController()
  // ...
}
```
