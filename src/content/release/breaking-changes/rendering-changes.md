---
title: v3.7 之後值得注意的渲染與版面配置變更
description: Flutter v3.7 之後，非 API 相關的重大變更。
---

{% render docs/breaking-changes.md %}

## 變更內容

本節列出了值得注意的非 API 重大變更。

### （僅影響測試）`FlutterTest` 現為預設測試字型

`FlutterTest` 字型已取代 `Ahem`，成為測試中的預設字型：當未指定 `fontFamily`，或指定的字型家族未註冊時，測試將使用 `FlutterTest` 字型來渲染文字。如果在測試中指定為 `fontFamily` 使用，`Ahem` 字型仍然可用。

`FlutterTest` 字型能夠產生比 `Ahem` 更精確的字型與字形（glyph）度量，且這些度量通常與字型引擎無關。
如需有關測試字型的更多細節，請參閱 [Flutter Test Fonts][Flutter Test Fonts]
Wiki 頁面。

**差異說明**

`FlutterTest` 字型在外觀上與舊的預設字型 `Ahem` 幾乎相同：大多數字元的字形是填滿 em 方格的方塊。`FlutterTest` 字型與 `Ahem` 字型之間的主要差異如下：

**1. 不同的基線位置**

`FlutterTest` 字型的上升線（ascent）與下降線（descent）分別為 0.75 em 與 0.25 em，而 `Ahem` 則分別為 0.8 em 與 0.2 em。

在下方的 golden image 範例變更中，白色區塊為使用 `Ahem` 與 `FlutterTest` 渲染的文字。由於新字型的下降線較大，第二個字元會更高。

| 變更前（`Ahem`） | 變更後 |               動畫差異               |
| :---: | :---: |:-----------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_masterImage.png) | ![after](/assets/images/docs/breaking-changes/material.ink_sparkle.bottom_right.0_testImage.png) | ![baseline_animated](/assets/images/docs/breaking-changes/baseline.gif) |

**2. 不同的裝飾線位置**

`FlutterTest` 的底線（underline）位置略高於 `Ahem`。

在下方的 golden image 範例變更中，三行白色區塊為使用 `Ahem` 與 `FlutterTest` 渲染的文字。藍色虛線分別標示了 [TextDecoration.overline]、[TextDecoration.lineThrough]、[TextDecoration.underline] 在每一行的位置。

| 變更前（`Ahem`） | 變更後 |               動畫差異                |
| :---: | :---: |:------------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_masterImage.png) | ![after](/assets/images/docs/breaking-changes/widgets.text_golden.Decoration.1_testImage.png) | ![baseline_animated](/assets/images/docs/breaking-changes/underline.gif) |

**3. 未對應字元的字形略有不同**

未對應的字元在兩種字型中皆以中空方框顯示，但細節略有不同：

| 變更前（`Ahem`） | 變更後 |                  差異                   |
| :---: | :---: |:---------------------------------------:|
| ![before](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_masterImage.png) | ![after](/assets/images/docs/breaking-changes/material.floating_action_button_test.clip_testImage.png) | ![not_def_animated](/assets/images/docs/breaking-changes/not_def.gif) |

## 參考資料

相關 PR：

* `FlutterTest` 字型新增於：[Add new test font]({{site.repo.engine}}/pull/39809)
* `FlutterTest` 字型成為預設於：[Make FlutterTest the default test font]({{site.repo.engine}}/pull/40188)

Wiki 頁面：

* [Flutter Test Fonts][Flutter Test Fonts]

[Flutter Test Fonts]: {{site.repo.flutter}}/blob/main/docs/contributing/testing/Flutter-Test-Fonts.md
[TextDecoration.underline]: {{site.api}}/flutter/dart-ui/TextDecoration/underline-constant.html
[TextDecoration.overline]: {{site.api}}/flutter/dart-ui/TextDecoration/overline-constant.html
[TextDecoration.lineThrough]: {{site.api}}/flutter/dart-ui/TextDecoration/lineThrough-constant.html
