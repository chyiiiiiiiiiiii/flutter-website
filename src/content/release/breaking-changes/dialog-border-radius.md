---
title: Dialogs 的預設 BorderRadius
description: Dialog 元件 (Widgets) 的預設 BorderRadius 即將變更。
---

{% render docs/breaking-changes.md %}

## 摘要

`Dialog` 的實例，以及
`SimpleDialog`、`AlertDialog` 和 `showTimePicker`，
現在預設的形狀 (shape) 為 `RoundedRectangleBorder`，
其 `BorderRadius` 為 4.0 像素。
這與目前的 Material Design 規範一致。
在此變更之前，
`Dialog.shape` 的 `BorderRadius` 預設為 2.0 像素。

## 背景說明

`Dialog` 及其相關子類別
（`SimpleDialog`、`AlertDialog` 和 `showTimePicker`），
因為邊框圓角變大，外觀會略有不同。
如果你有 master golden file 圖片，內容為
先前 2.0 像素邊框圓角的 `Dialog` 渲染結果，
你的元件測試將會失敗。
這些 golden file 圖片可以更新為新的渲染結果，
或者你也可以更新程式碼以維持原有行為。

`showDatePicker` dialog 已經符合此規範，因此不受這次變更影響。

## 遷移指南

如果你希望維持舊有的形狀，可以使用
`Dialog` 的 shape 屬性，指定原本的 2 像素圓角。

將 Dialog shape 設為原始圓角值：

```dart
import 'package:flutter/material.dart';

void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        floatingActionButton: FloatingActionButton(onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                content: Text('Alert!'),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(2))),
              );
            },
          );
        }),
      ),
    );
  }
}
```

如果你偏好新的行為，且 golden file 測試失敗，
可以使用以下指令來更新你的主 golden file：

```console
flutter test --update-goldens
```

## 時程

合併於版本：1.20.0-0.0.pre<br>  
正式版釋出：1.20

## 參考資料

API 文件：

* [`Dialog`][`Dialog`]
* [`SimpleDialog`][`SimpleDialog`]
* [`AlertDialog`][`AlertDialog`]
* [`showTimePicker`][`showTimePicker`]
* [`showDatePicker`][`showDatePicker`]

相關 PR：

* [PR 58829: Matching Material Spec for Dialog shape][PR 58829: Matching Material Spec for Dialog shape]

[`Dialog`]: {{site.api}}/flutter/material/Dialog-class.html
[`SimpleDialog`]: {{site.api}}/flutter/material/SimpleDialog-class.html
[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[`showTimePicker`]: {{site.api}}/flutter/material/showTimePicker.html
[`showDatePicker`]: {{site.api}}/flutter/material/showDatePicker.html
[PR 58829: Matching Material Spec for Dialog shape]: {{site.repo.flutter}}/pull/58829
