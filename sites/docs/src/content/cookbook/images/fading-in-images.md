---
title: 使用佔位圖淡入圖片
description: 如何讓圖片以淡入方式顯示。
---

<?code-excerpt path-base="cookbook/images/fading_in_images"?>

當你使用預設的 `Image` 元件（Widget）來顯示圖片時，
你可能會注意到圖片載入時會直接出現在螢幕上。
這種方式可能會讓使用者感覺視覺上有些突兀。

那麼，是否可以一開始先顯示一個佔位圖，
等圖片載入完成後再以淡入效果顯示呢？你可以使用
[`FadeInImage`][`FadeInImage`] 元件（Widget）來達成這個目的。

`FadeInImage` 可以搭配各種類型的圖片使用：記憶體內、在地資源（assets），
或來自網路的圖片都可以。

## 記憶體內圖片

若要使用單一像素的透明 PNG 作為佔位圖，
請完成以下步驟：

1.  **建立透明圖片資料。**

    匯入 `dart:convert` 與 `dart:typed_data`，
    然後從 Base64 編碼的字串解碼出圖片：

    <?code-excerpt "lib/memory_main.dart (TransparentImage)" plaster="none"?>
    ```dart
    import 'dart:convert';
    import 'dart:typed_data';
    final Uint8List transparentImage = base64Decode(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4'
      'nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    );
    ```

1.  **將圖片資料作為佔位圖。**

    將解碼後的圖片資料傳入 `placeholder` 參數：

    <?code-excerpt "lib/memory_main.dart (MemoryNetwork)" replace="/^child\: //g"?>
    ```dart
    FadeInImage.memoryNetwork(
      placeholder: transparentImage,
      image: 'https://picsum.photos/250?image=9',
    ),
    ```

{:.steps}

### 完整範例

<?code-excerpt "lib/memory_main.dart"?>
```dart
import 'dart:convert';
import 'dart:typed_data';

import 'package:material_ui/material_ui.dart';

final Uint8List transparentImage = base64Decode(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4'
  'nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Stack(
          children: <Widget>[
            const Center(child: CircularProgressIndicator()),
            Center(
              child: FadeInImage.memoryNetwork(
                placeholder: transparentImage,
                image: 'https://picsum.photos/250?image=9',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

![Fading In Image Demo](/assets/images/docs/cookbook/fading-in-images.webp){:.site-mobile-screenshot}

## 從資源包（asset bundle）載入

若要使用本地圖片資源（asset）作為佔位圖，
請完成以下步驟：

1.  **將佔位圖加入資源包。**

    在專案的 `assets` 目錄中加入一張佔位圖，
    例如 `assets/loading.gif`。
    接著在專案的 `pubspec.yaml` 檔案中宣告該資源。
    更多細節請參考 [Adding assets and images][Adding assets and images]。

    ```yaml diff
      flutter:
        assets:
    +     - assets/loading.gif
    ```

1.  **將資源作為佔位圖。**

    將資源路徑傳入
    [`FadeInImage.assetNetwork`][`FadeInImage.assetNetwork`] 建構函式（constructor）的 `placeholder` 參數：

    <?code-excerpt "lib/asset_main.dart (AssetNetwork)" replace="/^child\: //g"?>
    ```dart
    FadeInImage.assetNetwork(
      placeholder: 'assets/loading.gif',
      image: 'https://picsum.photos/250?image=9',
    ),
    ```

{:.steps}

### 完整範例

<?code-excerpt "lib/asset_main.dart"?>
```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Center(
          child: FadeInImage.assetNetwork(
            placeholder: 'assets/loading.gif',
            image: 'https://picsum.photos/250?image=9',
          ),
        ),
      ),
    );
  }
}
```

![資源淡入](/assets/images/docs/cookbook/fading-in-asset-demo.webp){:.site-mobile-screenshot}


[Adding assets and images]: /ui/assets/assets-and-images
[`FadeInImage`]: {{site.api}}/flutter/widgets/FadeInImage-class.html
[`FadeInImage.assetNetwork`]: {{site.api}}/flutter/widgets/FadeInImage/FadeInImage.assetNetwork.html
