#### 在終端機中建置 Flutter 應用程式的 Android 版本

若要產生所需的 Android 平台相依套件，
請執行 `flutter build` 指令。

```console
flutter build appbundle --debug
```

```console
Running Gradle task 'bundleDebug'...                               27.1s
✓ Built build/app/outputs/bundle/debug/app-debug.aab.
```


<Tabs key="android-debug-flow">
<Tab name="Start from VS Code">

#### 先從 VS Code 開始除錯 {:#from-vscode-to-android-studio}

如果你大多使用 VS Code 來除錯程式碼，請從本節開始。

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

#### 在 Android Studio 中附加至 Flutter 程序

{% render "docs/debug/debug-android-attach-process.md" %}

</Tab>
<Tab name="Start from Android Studio">

#### 先從 Android Studio 開始除錯 {:#from-android-studio}

如果你大多使用 Android Studio 來除錯程式碼，請從本節開始。

{% render "docs/debug/debug-flow-androidstudio-as-start.md" %}

{% render "docs/debug/debug-android-attach-process.md" %}

</Tab>
</Tabs>
