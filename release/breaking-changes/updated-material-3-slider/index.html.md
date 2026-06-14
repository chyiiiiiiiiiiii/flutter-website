# 已更新的 Material 3 `Slider`

> `Slider` 元件（Widget）已更新，以符合 Material 3 Design（Material 3 設計）規範。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

`Slider` 已更新，以符合 Material 3 Design（Material 3 設計）規範。

`Slider` 的變更包括更新的高度、
主動與非主動軌道之間的間隙，以及
一個用於顯示非主動軌道結束值的停止指示器。
按下滑塊（thumb）時會調整其寬度，軌道也會調整形狀。
新的值指示器（value indicator）形狀為圓角矩形。
部分 `Slider` 形狀也引入了新的顏色對應。

## 背景

Material 3 Design（Material 3 設計）規範針對 `Slider` 於 2023 年 12 月進行了更新。
若要選用 2024 年的設計規範，請將 `Slider.year2023` 旗標設為 `false`。
這麼做是為了確保現有應用程式不會受到
新設計規範的影響。

## 變更說明

`Slider` 元件（Widget）具有 `year2023` 旗標，可設為 `false`
以採用更新後的設計規範。
`year2023` 旗標的預設值為 `true`，
這表示 `Slider` 會使用先前 2023 年的設計規範。

當 [`Slider.year2023`][] 設為 `false` 時，
滑桿（slider）將會使用更新後的設計規範。

## 遷移指南

若要讓 `Slider` 採用更新後的設計規範，
請將 `year2023` 旗標設為 `false`：

```dart highlightLines=2
Slider(
  year2023: false,
  value: _value,
  onChanged: (value) {
    setState(() {
      _value = value;
    });
  },
),
```

若要將整個應用程式更新為使用新版的 `Slider` 設計，請在 `MaterialApp` 中將
`SliderThemeData.year2023` 屬性設為 `false`：

```dart highlightLines=2
return MaterialApp(
  theme: ThemeData(sliderTheme: const SliderThemeData(year2023: false)),
        // ...
        Slider(
          value: _value,
          onChanged: (value) {
            setState(() {
              _value = value;
            });
          },
        ),
        // ...
```

## 時程

合併於版本：3.28.0-0.1.pre<br>
正式版本：3.29

## 參考資料

API 文件：

* [`Slider`][]
* [`Slider.year2023`][]

相關議題：

* [Update `Slider` for Material 3 redesign][]

相關 PR：

* [Introduce new Material 3 `Slider` shapes][]

[`Slider`]: https://main-api.flutter.dev/flutter/material/Slider-class.html
[`Slider.year2023`]: https://main-api.flutter.dev/flutter/material/Slider/year2023.html
[Update `Slider` for Material 3 redesign]: https://github.com/flutter/flutter/issues/141842
[Introduce new Material 3 `Slider` shapes]: https://github.com/flutter/flutter/pull/152237

