# 觸控板手勢可觸發 GestureRecognizer

> 現在大多數平台上的觸控板手勢會傳送 `PointerPanZoom` 序列，並可觸發平移、拖曳及縮放的 `GestureRecognizer` 回呼（callback）。




:::important
這些重大變更文件在其發布的版本時是準確的。隨著時間推移，這裡描述的
因應措施可能會變得不準確。一般而言，我們不會在每個版本發布時同步更新這些重大變更文件。

[重大變更索引檔案](/release/breaking-changes)列出了每個版本所建立的文件。
:::


## 摘要

現在大多數平台上的觸控板手勢會傳送 `PointerPanZoom` 序列，並可觸發平移、拖曳及縮放的 `GestureRecognizer` 回呼（callback）。

## 背景

在 Flutter Desktop 3.3.0 版本之前，滾動操作是透過 `PointerScrollEvent` 訊息來表示離散的滾動增量。這套系統對於滑鼠滾輪運作良好，但並不適合觸控板滾動。觸控板滾動預期會產生動量，這不僅取決於滾動增量，也與手指何時離開觸控板的時機有關。
此外，觸控板的雙指縮放（pinch-to-zoom）也無法被表示。

現已引入三種新的 `PointerEvent`：`PointerPanZoomStartEvent`、`PointerPanZoomUpdateEvent` 以及 `PointerPanZoomEndEvent`。
相關的 `GestureRecognizer` 也已更新，可註冊對觸控板手勢序列的關注，並在觸控板上有兩指或以上移動時，發出 `onDrag`、`onPan` 和／或 `onScale` 回呼（callback）。

這代表，僅設計給觸控互動的程式碼現在可能會因觸控板互動而被觸發；而原本設計來處理所有桌面滾動的程式碼，現在可能只會因滑鼠滾動而觸發，不會因觸控板滾動而觸發。

## 變更說明

Flutter 引擎已在所有可能的平台上更新，能辨識觸控板手勢並將其作為 `PointerPanZoom` 事件傳送給框架，而非以 `PointerScrollSignal` 事件傳送。`PointerScrollSignal` 事件仍會用於表示滑鼠滾輪的滾動。

根據平台及特定觸控板型號，若平台 API 提供給 Flutter 引擎的資料不足，則可能不會使用新系統。這包括 Windows 平台（觸控板手勢支援取決於觸控板驅動程式），以及 Web 平台（瀏覽器 API 提供的資料不足），因此觸控板滾動仍必須使用舊的 `PointerScrollSignal` 系統。

開發者應準備好同時處理這兩種類型的事件，並確保其應用程式或套件能以適當方式處理。

`Listener` 現在新增了三個回呼（callback）：`onPointerPanZoomStart`、`onPointerPanZoomUpdate` 以及 `onPointerPanZoomEnd`，可用於觀察觸控板的滾動與縮放事件。

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('mouse scrolled ${event.scrollDelta}');
        }
      },
      onPointerPanZoomStart: (PointerPanZoomStartEvent event) {
        debugPrint('trackpad scroll started');
      },
      onPointerPanZoomUpdate: (PointerPanZoomUpdateEvent event) {
        debugPrint('trackpad scrolled ${event.panDelta}');
      },
      onPointerPanZoomEnd: (PointerPanZoomEndEvent event) {
        debugPrint('trackpad scroll ended');
      },
      child: Container()
    );
  }
}
```

`PointerPanZoomUpdateEvent` 包含一個 `pan` 欄位，用於表示當前手勢的累積平移（pan），
一個 `panDelta` 欄位，用於表示自上次事件以來的平移差異，
一個 `scale` 事件，用於表示當前手勢的累積縮放（zoom），
以及一個 `rotation` 事件，用於表示當前手勢的累積旋轉（以弧度為單位）。

`GestureRecognizer` 現在具有方法，可以從一次連續的觸控板手勢中取得所有觸控板事件。
對 `GestureRecognizer` 呼叫 `addPointerPanZoom` 方法並傳入 `PointerPanZoomStartEvent`，將會讓辨識器（recognizer）註冊其對該觸控板互動的關注，
並在多個可能回應此手勢的 `GestureRecognizer` 之間解決衝突。

以下範例展示如何正確使用 `Listener` 和 `GestureRecognizer` 來回應觸控板互動。

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      onPointerPanZoomStart: recognizer.addPointerPanZoom,
      child: Container()
    );
  }
}
```

當使用 `GestureDetector` 時，這個動作會自動完成，因此像下列範例這樣的程式碼，會在偵測到觸控或觸控板（trackpad）平移時，都觸發其手勢更新回呼（gesture update callbacks）。

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

## 遷移指南

遷移步驟取決於你是否希望應用程式中的每個手勢互動都能透過觸控板（trackpad）使用，或是僅限於觸控和滑鼠操作。

### 適合觸控板（trackpad）使用的手勢互動

#### 使用 `GestureDetector`

無需任何更動，`GestureDetector` 會自動處理觸控板手勢事件，並在辨識到時觸發回呼（callback）。

#### 使用 `GestureRecognizer` 和 `Listener`

請確保 `onPointerPanZoomStart` 有從 `Listener` 傳遞到每個辨識器（recognizer）。
`GestureRecognizer` 的 `addPointerPanZoom` 方法必須被呼叫，才能表明有興趣並開始追蹤每個觸控板手勢。

遷移前的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      child: Container()
    );
  }
}
```

遷移後的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      onPointerPanZoomStart: recognizer.addPointerPanZoom,
      child: Container()
    );
  }
}
```

#### 使用原始 `Listener`

以下使用 PointerScrollSignal 的程式碼將不再於所有桌面滾動時被呼叫。應改為捕捉 `PointerPanZoomUpdate` 事件，以接收觸控板手勢資料。

遷移前的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('scroll wheel event');
        }
      }
      child: Container()
    );
  }
}
```

遷移後的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerSignal: (PointerSignalEvent event) {
        if (event is PointerScrollEvent) {
          debugPrint('scroll wheel event');
        }
      },
      onPointerPanZoomUpdate: (PointerPanZoomUpdateEvent event) {
        debugPrint('trackpad scroll event');
      }
      child: Container()
    );
  }
}
```

請注意：以這種方式使用原始的 `Listener` 可能會與其他手勢互動產生衝突，因為它不會參與手勢消歧場（gesture disambiguation arena）。

### 對於不適合觸控板（trackpad）使用的手勢互動

#### 使用 `GestureDetector`

如果你使用的是 Flutter 3.3.0，可以使用 `RawGestureDetector` 來取代 `GestureDetector`，以確保由 `GestureDetector` 所建立的每個 `GestureRecognizer` 都會將 `supportedDevices` 設定為排除 `PointerDeviceKind.trackpad`。
從 3.4.0 版本開始，`GestureDetector` 上直接提供了 `supportedDevices` 參數。

遷移前的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

遷移後的程式碼（Flutter 3.3.0）：

```dart
// Example of code after the change.
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(
            supportedDevices: {
              PointerDeviceKind.touch,
              PointerDeviceKind.mouse,
              PointerDeviceKind.stylus,
              PointerDeviceKind.invertedStylus,
              // Do not include PointerDeviceKind.trackpad
            }
          ),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

遷移後的程式碼：（Flutter 3.4.0）：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      supportedDevices: {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.stylus,
        PointerDeviceKind.invertedStylus,
        // Do not include PointerDeviceKind.trackpad
      },
      onPanStart: (details) {
        debugPrint('onStart');
      },
      onPanUpdate: (details) {
        debugPrint('onUpdate');
      },
      onPanEnd: (details) {
        debugPrint('onEnd');
      }
      child: Container()
    );
  }
}
```

#### 使用 `RawGestureRecognizer`

請明確確保 `supportedDevices`
不包含 `PointerDeviceKind.trackpad`。

遷移前的程式碼：

```dart
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

遷移後的程式碼：

```dart
// Example of code after the change.
void main() => runApp(Foo());

class Foo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawGestureDetector(
      gestures: {
        PanGestureRecognizer:
            GestureRecognizerFactoryWithHandlers<PanGestureRecognizer>(
          () => PanGestureRecognizer(
            supportedDevices: {
              PointerDeviceKind.touch,
              PointerDeviceKind.mouse,
              PointerDeviceKind.stylus,
              PointerDeviceKind.invertedStylus,
              // Do not include PointerDeviceKind.trackpad
            }
          ),
          (recognizer) {
            recognizer
              ..onStart = (details) {
                debugPrint('onStart');
              }
              ..onUpdate = (details) {
                debugPrint('onUpdate');
              }
              ..onEnd = (details) {
                debugPrint('onEnd');
              };
          },
        ),
      },
      child: Container()
    );
  }
}
```

#### 使用 `GestureRecognizer` 和 `Listener`

升級至 Flutter 3.3.0 之後，行為不會有變化，因為必須在每個 `GestureRecognizer` 上呼叫 `addPointerPanZoom`，才能讓其追蹤手勢。當使用觸控板捲動時，下列程式碼將不會收到平移（pan）手勢的回呼（callback）：

```dart
void main() => runApp(Foo());

class Foo extends StatefulWidget {
  late final PanGestureRecognizer recognizer;

  @override
  void initState() {
    super.initState();
    recognizer = PanGestureRecognizer()
    ..onStart = _onPanStart
    ..onUpdate = _onPanUpdate
    ..onEnd = _onPanEnd;
  }

  void _onPanStart(DragStartDetails details) {
    debugPrint('onStart');
  }

  void _onPanUpdate(DragUpdateDetails details) {
    debugPrint('onUpdate');
  }

  void _onPanEnd(DragEndDetails details) {
    debugPrint('onEnd');
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: recognizer.addPointer,
      // recognizer.addPointerPanZoom is not called
      child: Container()
    );
  }
}
```

## 時程

合併於版本：3.3.0-0.0.pre<br>
正式版釋出：3.3.0

## 參考資料

API 文件：

* [`GestureDetector`][]
* [`RawGestureDetector`][]
* [`GestureRecognizer`][]

設計文件：

* [Flutter Trackpad Gestures][]

相關議題：

* [Issue 23604][]

相關 PR：

* [Support trackpad gestures in framework][]
* [iPad trackpad gestures][]
* [Linux trackpad gestures][]
* [Mac trackpad gestures][]
* [Win32 trackpad gestures][]
* [ChromeOS/Android trackpad gestures][]

[`GestureDetector`]: https://api.flutter.dev/flutter/widgets/GestureDetector-class.html
[`GestureRecognizer`]: https://api.flutter.dev/flutter/gestures/GestureRecognizer-class.html
[`RawGestureDetector`]: https://api.flutter.dev/flutter/widgets/RawGestureDetector-class.html
[Flutter Trackpad Gestures]: https://docs.google.com/document/d/1oRvebwjpsC3KlxN1gOYnEdxtNpQDYpPtUFAkmTUe-K8
[Issue 23604]: https://github.com/flutter/flutter/issues/23604
[Support trackpad gestures in framework]: https://github.com/flutter/flutter/pull/89944
[iPad trackpad gestures]: https://github.com/flutter/engine/pull/31591
[Linux trackpad gestures]: https://github.com/flutter/engine/pull/31592
[Mac trackpad gestures]: https://github.com/flutter/engine/pull/31593
[Win32 trackpad gestures]: https://github.com/flutter/engine/pull/31594
[ChromeOS/Android trackpad gestures]: https://github.com/flutter/engine/pull/34060

