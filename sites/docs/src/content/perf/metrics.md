---
title: 效能指標
description: Flutter 指標，以及取得這些指標所使用的工具與 API
---

* 啟動至第一幀所需時間
  * 檢查
    [WidgetsBinding.instance.firstFrameRasterized][firstFrameRasterized]
    為 true 的時間點。
  * 請參閱
    [perf dashboard](https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3DtimeToFirstFrameRasterizedMicros)。

* 幀的 buildDuration、rasterDuration 與 totalSpan
  * 請參閱 API 文件中的 [`FrameTiming`]({{site.api}}/flutter/dart-ui/FrameTiming-class.html)。

* 幀 `buildDuration`（`*_frame_build_time_millis`）的統計數據
  * 建議監控四個統計值：平均值、第 90 百分位、第 99 百分位，以及最差幀建構時間。
  * 例如，請參閱 `flutter_gallery__transition_perf` 測試的 [metrics][transition_build]。

* 幀 `rasterDuration`（`*_frame_build_time_millis`）的統計數據
  * 建議監控四個統計值：平均值、第 90 百分位、第 99 百分位，以及最差幀建構時間。
  * 例如，請參閱 `flutter_gallery__transition_perf` 測試的 [metrics][transition_raster]。

* CPU/GPU 使用率（可作為能耗的良好近似值）
  * 目前僅能透過追蹤事件取得使用率。請參閱 [profiling_summarizer.dart][profiling_summarizer]。
  * 請參閱 `simple_animation_perf_ios` 測試的 [metrics][cpu_gpu]。

* release_size_bytes：大致測量 Flutter 應用程式的大小
  * 請參閱 [basic_material_app_android][]、[basic_material_app_ios][]、
    [hello_world_android][]、[hello_world_ios][]、[flutter_gallery_android][]，
    以及 [flutter_gallery_ios][] 測試。
  * 請參閱儀表板中的 [metrics][size_perf]。
  * 如需更精確測量應用程式大小的方法，
    請參閱 [app size](/perf/app-size) 頁面。

如需 Flutter 每次提交所量測的完整效能指標清單，請造訪下列網站，點擊 **Query**，並篩選 **test** 與
**sub_result** 欄位：

  * [https://flutter-flutter-perf.skia.org/e/](https://flutter-flutter-perf.skia.org/e/)
  * [https://flutter-engine-perf.skia.org/e/](https://flutter-engine-perf.skia.org/e/)

[firstFrameRasterized]: {{site.api}}/flutter/widgets/WidgetsBinding/firstFrameRasterized.html

[transition_build]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3D90th_percentile_frame_build_time_millis%26sub_result%3D99th_percentile_frame_build_time_millis%26sub_result%3Daverage_frame_build_time_millis%26sub_result%3Dworst_frame_build_time_millis%26test%3Dflutter_gallery__transition_perf

[transition_raster]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3D90th_percentile_frame_rasterizer_time_millis%26sub_result%3D99th_percentile_frame_rasterizer_time_millis%26sub_result%3Daverage_frame_rasterizer_time_millis%26sub_result%3Dworst_frame_rasterizer_time_millis%26test%3Dflutter_gallery__transition_perf

[profiling_summarizer]: {{site.repo.flutter}}/blob/main/packages/flutter_driver/lib/src/driver/profiling_summarizer.dart

[cpu_gpu]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3Daverage_cpu_usage%26sub_result%3Daverage_gpu_usage%26test%3Dsimple_animation_perf_ios

[basic_material_app_android]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/basic_material_app_android__compile.dart

[basic_material_app_ios]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/basic_material_app_ios__compile.dart

[hello_world_android]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/hello_world_android__compile.dart

[hello_world_ios]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/hello_world_ios__compile.dart

[flutter_gallery_android]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/flutter_gallery_android__compile.dart

[flutter_gallery_ios]: {{site.repo.flutter}}/blob/main/dev/devicelab/bin/tasks/flutter_gallery_ios__compile.dart

[size_perf]: https://flutter-flutter-perf.skia.org/e/?queries=sub_result%3Drelease_size_bytes%26test%3Dbasic_material_app_android__compile%26test%3Dbasic_material_app_ios__compile%26test%3Dhello_world_android__compile%26test%3Dhello_world_ios__compile%26test%3Dflutter_gallery_ios__compile%26test%3Dflutter_gallery_android__compile
