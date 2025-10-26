---
title: 區分短暫狀態與應用程式狀態
description: 如何分辨短暫狀態與應用程式狀態。
prev:
  title: 開始以宣告式思維設計
  path: /data-and-backend/state-mgmt/declarative
next:
  title: 簡單的應用程式狀態管理
  path: /data-and-backend/state-mgmt/simple
---

_本文件介紹應用程式狀態（app state）、短暫狀態（ephemeral state），以及你可以如何在 Flutter 應用程式中管理這兩者。_

從最廣義的角度來看，應用程式的狀態是指當應用程式執行時，所有存在於記憶體中的內容。這包括應用程式的資源（assets）、Flutter 框架所維護的所有與 UI 相關的變數、動畫狀態、紋理、字型等等。雖然這種最廣義的狀態定義是正確的，但對於應用程式架構設計來說並不太實用。

首先，有些狀態（例如紋理）你根本不需要自行管理，這些由框架自動處理。因此，更實用的狀態定義是：「你在任何時刻需要用來重建 UI 的資料」。其次，你自己需要管理的狀態又可以分為兩種概念型態：短暫狀態（ephemeral state）與應用程式狀態（app state）。

## 短暫狀態（Ephemeral state）

短暫狀態（有時也稱為 _UI 狀態_ 或 _本地狀態_）是指你可以完全包在單一元件（Widget）內部的狀態。

這個定義本身比較模糊，因此以下舉幾個例子：

* [`PageView`][`PageView`] 中的目前頁面
* 複雜動畫的目前進度
* `BottomNavigationBar` 中目前選取的分頁

元件樹（widget tree）的其他部分很少需要存取這類狀態。不需要將其序列化，且其變化也不複雜。

換句話說，這類狀態不需要使用狀態管理技術（如 ScopedModel、Redux 等）來處理。你只需要一個 `StatefulWidget` 即可。

下方範例展示了如何將底部導覽列（bottom navigation bar）中目前選取的項目，儲存在 `_MyHomepageState` 類別的 `_index` 欄位中。在這個例子中，`_index` 就是短暫狀態（ephemeral state）。

<?code-excerpt "state_mgmt/simple/lib/src/set_state.dart (ephemeral)" plaster="// ... items ..."?>
```dart
class MyHomepage extends StatefulWidget {
  const MyHomepage({super.key});

  @override
  State<MyHomepage> createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

在這裡，使用 `setState()` 以及在 StatefulWidget 的 State 類別中的欄位是非常自然的。你的應用程式中沒有其他部分需要存取 `_index`。這個變數只會在 `MyHomepage` 元件（Widget）內部變動。而且，如果使用者關閉並重新啟動應用程式，你也不會介意 `_index` 會重設為零。

## 應用程式狀態（App state）

如果某個狀態不是暫時性的（ephemeral），你希望在應用程式的多個部分之間共享，並且希望能夠在使用者多次開啟應用程式時保留，那麼這就稱為應用程式狀態（application state，有時也稱為 shared state）。

應用程式狀態的範例：

* 使用者偏好設定
* 登入資訊
* 社群網路應用程式中的通知
* 電子商務應用程式中的購物車
* 新聞應用程式中文章的已讀／未讀狀態

要管理應用程式狀態，你需要研究各種可用方案。你的選擇取決於應用程式的複雜度與特性、團隊過往的經驗，以及許多其他因素。請繼續閱讀下文。

## 沒有明確的規則

需要說明的是，你 _可以_ 使用 `State` 和 `setState()` 來管理應用程式中的所有狀態。事實上，Flutter 團隊在許多簡單的應用程式範例（包括每個 `flutter create` 所附的入門範例）中就是這麼做的。

反過來說，也有不同的情況。例如，你可能會認為——在你的特定應用程式情境下——底部導覽列（bottom navigation bar）中被選取的分頁並 _不是_ 暫時性狀態。你可能需要從類別外部變更它、在多次啟動應用程式時保留它，等等。在這種情況下，`_index` 變數就是應用程式狀態。

沒有明確、通用的規則可以區分某個變數究竟是暫時性狀態還是應用程式狀態。有時候，你需要將一種狀態重構為另一種。例如，你一開始可能將某些狀態設計為明顯的暫時性狀態，但隨著應用程式功能的增長，它可能需要被移動到應用程式狀態中。

因此，請對下方這張圖保持高度保留態度：

<img src='/assets/images/docs/development/data-and-backend/state-mgmt/ephemeral-vs-app-state.png' width="100%" class="diagram-wrap" alt="A flow chart. Start with 'Data'. 'Who needs it?'. Three options: 'Most widgets', 'Some widgets' and 'Single widget'. The first two options both lead to 'App state'. The 'Single widget' option leads to 'Ephemeral state'.">

{% comment %}
上方 png 的原始繪圖來源：: https://docs.google.com/drawings/d/1p5Bvuagin9DZH8bNrpGfpQQvKwLartYhIvD0WKGa64k/edit?usp=sharing
{% endcomment %}

當被問到 React 的 setState 與 Redux 的 store 有何不同時，Redux 的作者 Dan Abramov 回答：

> 「經驗法則是：[選擇較不尷尬的做法][Do whatever is less awkward]。」

總結來說，在任何 Flutter 應用程式中，概念上有兩種類型的狀態。暫時性狀態（ephemeral state）可以透過 `State` 和 `setState()` 來實作，通常只屬於單一元件（Widget）本地。其餘的則屬於你的應用程式狀態。這兩種狀態在 Flutter 應用程式中各有其位置，兩者的劃分取決於你的偏好以及應用程式的複雜度。

[Do whatever is less awkward]: {{site.github}}/reduxjs/redux/issues/1287#issuecomment-175351978
[`PageView`]: {{site.api}}/flutter/widgets/PageView-class.html
