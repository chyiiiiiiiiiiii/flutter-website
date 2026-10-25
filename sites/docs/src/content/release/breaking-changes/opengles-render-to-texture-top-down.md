---
title: OpenGL ES 的 render-to-texture 內容改為由上而下儲存
description: >-
  Impeller 的 OpenGL ES 後端現在與 Metal 和 Vulkan 一致，
  以由上而下的方式儲存 render-to-texture 內容，
  這可能會影響過去為了補償舊的由下而上方向而做了處理的
  fragment shader 與 Flutter GPU 應用程式。
---

{% render "docs/breaking-changes.md" %}

## 摘要

Impeller 的 OpenGL ES 後端現在與 Metal 和 Vulkan 後端相同，
以由上而下 (top-down) 的方式儲存 render-to-texture 內容。
如果 fragment shader 或 Flutter GPU 應用程式在 OpenGL ES 上取樣 render-target 紋理，
並且加入了垂直翻轉來補償舊的由下而上 (bottom-up) 方向，
那麼現在該內容會被渲染成上下顛倒。

## 背景

OpenGL ES 後端過去與 Metal 和 Vulkan 後端不同，
是以由下而上的方式儲存 render-to-texture 內容。
渲染器會在每一次紋理取樣時，透過每個 sampler 的 Y 座標縮放，
來處理這個方向上的差異。
Impeller 現在改為在頂點階段 (vertex stage) 一次性吸收這個差異，
因此在所有後端上，render-target 紋理都是以由上而下的方式儲存。

這項變更對框架以及 Flutter 的 2D 渲染來說是無感的。
應用程式碼只能透過 `FragmentShader` API，
以及 Flutter GPU（實驗性的 `flutter_gpu` 套件）
觀察到舊的方向，
也就是 shader 直接取樣 render-target 紋理的情況。

## 遷移指南

為 OpenGL ES 撰寫的 shader 常會在 `IMPELLER_TARGET_OPENGLES` 區塊內翻轉
Y 座標，讓 render-target 紋理與其他後端一致。
現在 render-target 紋理在所有後端上都是由上而下，
因此不再需要這個翻轉。

遷移前的程式碼：

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#ifdef IMPELLER_TARGET_OPENGLES
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

如果 shader 只需要在包含此變更的 Flutter 版本上執行，
請移除該翻轉。

遷移後的程式碼：

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
  fragColor = texture(u_texture, uv);
}
```

若要讓同一份原始碼在不同版本間都能運作，
請使用 `IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED` 巨集來保護該翻轉。
只有在以由上而下方式儲存 render-target 紋理的版本上，才會定義該巨集，
因此在仍需要翻轉的舊版本上，翻轉仍會執行。

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#if defined(IMPELLER_TARGET_OPENGLES) && !defined(IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED)
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

## 時程

合併於版本：3.46.0-0.1.pre<br>
穩定版發布：3.47

## 參考資料

GitHub issue：

* [Issue 186554][]

相關 PR：

* [PR 186556][]
* [PR 187316][]

[Issue 186554]: {{site.repo.flutter}}/issues/186554
[PR 186556]: {{site.repo.flutter}}/pull/186556
[PR 187316]: {{site.repo.flutter}}/pull/187316
