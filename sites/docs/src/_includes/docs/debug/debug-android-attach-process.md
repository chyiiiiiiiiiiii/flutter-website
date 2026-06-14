1. 點擊 **Attach debugger to Android process** 按鈕。
   (![微型綠色蟲圖示上疊加淺灰色箭頭](/assets/images/docs/testing/debugging/native/android-studio/attach-process-button.png))

    :::tip
    若此按鈕未出現在 **Projects** 選單列中，請確認你開啟的是 Flutter _應用程式_專案，而_非 Flutter 插件_。
    :::

1. **process** 對話框會為每個已連接的裝置各顯示一個項目。
   選取 **show all processes** 可顯示每個裝置的所有可用處理程序。

1. 選擇你要附加的處理程序。
   在本指南中，請使用 **Emulator Pixel_5_API_33**
   選取 `com.example.my_app` 處理程序。

{% comment %}

   @atsansone - 2023-07-24

   These screenshots were commented out for two reasons known for most docs:

   1. The docs should stand on their own.
   2. These screenshots would be painful to maintain.

   If reader feedback urges their return, these will be uncommented.

   ![Attach to Process dialog box open in Android Studio](/assets/images/docs/testing/debugging/native/android-studio/attach-process-dialog.png)
   <div class="figure-caption">

   Flutter app in Android device displaying two buttons.

   </div>
{% endcomment %}

1. 在 **Debug** 面板中找到 **Android Debugger** 分頁。

1. 在 **Project** 面板中，展開
   **my_app_android** <span aria-label="and then">></span>
   **android** <span aria-label="and then">></span>
   **app** <span aria-label="and then">></span>
   **src** <span aria-label="and then">></span>
   **main** <span aria-label="and then">></span>
   **java** <span aria-label="and then">></span>
   **io.flutter plugins**。

1. 雙擊 **GeneratedProjectRegistrant** 以在 **Edit** 面板中開啟
   Java 程式碼。

{% comment %}
   !['The Android Project view highlighting the GeneratedPluginRegistrant.java file.'](/assets/images/docs/testing/debugging/native/android-studio/debug-open-java-code.png){:width="100%"}
   <div class="figure-caption">

   The Android Project view highlighting the `GeneratedPluginRegistrant.java` file.

   </div>
{% endcomment %}

完成此程序後，Dart 與 Android 除錯器會同時與同一個處理程序互動。
你可以使用其中一個或兩者同時使用，以設定中斷點、檢查堆疊、繼續執行
等各項操作，也就是進行除錯！

{% comment %}
![The Dart debug pane with two breakpoints set in `lib/main.dart`](/assets/images/docs/testing/debugging/native/dart-debugger.png){:width="100%"}
<div class="figure-caption">

The Dart debug pane with two breakpoints set in `lib/main.dart`.

</div>
{% endcomment %}

{% comment %}
!['The Android debug pane with one breakpoint set in GeneratedPluginRegistrant.java.'](/assets/images/docs/testing/debugging/native/android-studio/debugger-active.png)
<div class="figure-caption">

The Android debug pane with one breakpoint set in GeneratedPluginRegistrant.java.

</div>
{% endcomment %}
