# Dialogs 的預設 BorderRadius

> Dialog 元件 (Widget) 的預設 BorderRadius 將進行變更。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`Dialog` 的實例，以及
`SimpleDialog`、`AlertDialog` 和 `showTimePicker`，
現在預設的外觀為 `RoundedRectangleBorder`，
其 `BorderRadius` 設為 4.0 像素。
這與目前的 Material Design 規範相符。
在此變更之前，
`Dialog.shape` 的 `BorderRadius` 預設為 2.0 像素。

## 背景說明

`Dialog` 及其相關子類別
（`SimpleDialog`、`AlertDialog` 和 `showTimePicker`），
由於邊框圓角變大，外觀會略有不同。
如果你的 master golden file 圖片
仍採用先前 2.0 像素邊框圓角的 `Dialog` 渲染 (render) 結果，
你的元件測試將會失敗。
你可以更新這些 golden file 圖片以反映新的渲染效果，
或是修改程式碼以維持原本的行為。

`showDatePicker` dialog 已經符合此規範，
因此不受這次變更影響。

## 遷移指南

如果你希望維持舊有的外觀，可以透過
`Dialog` 的 shape 屬性，指定原本 2 像素的圓角半徑。

將 Dialog shape 設為原本的圓角半徑：

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
穩定版釋出：1.20

## 參考資料

API 文件：

* [`Dialog`][]
* [`SimpleDialog`][]
* [`AlertDialog`][]
* [`showTimePicker`][]
* [`showDatePicker`][]

相關 PR：

* [PR 58829: Matching Material Spec for Dialog shape][]

[`Dialog`]: https://api.flutter.dev/flutter/material/Dialog-class.html
[`SimpleDialog`]: https://api.flutter.dev/flutter/material/SimpleDialog-class.html
[`AlertDialog`]: https://api.flutter.dev/flutter/material/AlertDialog-class.html
[`showTimePicker`]: https://api.flutter.dev/flutter/material/showTimePicker.html
[`showDatePicker`]: https://api.flutter.dev/flutter/material/showDatePicker.html
[PR 58829: Matching Material Spec for Dialog shape]: https://github.com/flutter/flutter/pull/58829

