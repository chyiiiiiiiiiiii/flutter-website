---
title: Google APIs
description: 如何在 Flutter 中使用 Google APIs。
---

<?code-excerpt path-base="googleapis/"?>

[Google APIs 套件][Google APIs package] 提供了數十種可供 Dart 專案使用的 Google 服務。

本頁將說明如何透過 Google 認證來使用與終端使用者資料互動的 API。

屬於用戶資料類型的 API 範例包括
[Calendar][Calendar]、[Gmail][Gmail]、[YouTube][YouTube] 以及 Firebase。

:::note
你應該直接在 Flutter 專案中使用的 API，僅限於那些透過 Google 認證存取使用者資料的 API。

需要 [服務帳戶（service accounts）][service accounts] 的 API **不應該**
直接在 Flutter 應用程式中使用。
這麼做會導致你必須將服務憑證隨應用程式一同發佈，這樣做並不安全。
若要使用這類 API，
建議你建立一個中介服務來處理。
:::

若要在 Firebase 中明確加入認證功能，請參考
[使用 FirebaseUI 為 Flutter 應用程式加入使用者認證流程][fb-lab]
教學，以及
[在 Flutter 上開始使用 Firebase Authentication][fb-auth] 文件。
 
[fb-lab]: {{site.firebase}}/codelabs/firebase-auth-in-flutter-apps
[Calendar]: {{site.pub-api}}/googleapis/latest/calendar_v3/calendar_v3-library.html
[fb-auth]: {{site.firebase}}/docs/auth/flutter/start
[Gmail]: {{site.pub-api}}/googleapis/latest/gmail_v1/gmail_v1-library.html
[Google APIs package]: {{site.pub-pkg}}/googleapis
[service accounts]: https://cloud.google.com/iam/docs/service-account-overview
[YouTube]: {{site.pub-api}}/googleapis/latest/youtube_v3/youtube_v3-library.html

## 概覽

要使用 Google APIs，請依照以下步驟操作：

1. 選擇想要使用的 API
1. 啟用該 API
1. 進行認證並取得目前使用者
1. 取得已認證的 HTTP 用戶端
1. 建立並使用所需的 API 類別

## 1. 選擇想要使用的 API

[`package:googleapis` 的文件][`package:googleapis`]
將每個 API 都列為獨立的 Dart 函式庫&emdash;以
`name_version` 格式呈現。
你可以參考 [`youtube_v3`][`youtube_v3`] 作為範例。

每個函式庫可能會提供多種類型，
但都會有一個以 `Api` 結尾的 _root_ 類別。
以 YouTube 為例，就是 [`YouTubeApi`][`YouTubeApi`]。

`Api` 類別不僅是你需要
實體化（請見步驟 3）的類別，同時也
公開了代表使用該 API 所需權限的 scopes。
舉例來說，
`YouTubeApi` 類別的 [Constants 區段][Constants section]
列出了可用的 scopes。
若你只需要讀取（而非寫入）終端使用者的 YouTube 資料，
請以 [`youtubeReadonlyScope`][`youtubeReadonlyScope`] 進行使用者認證。

<?code-excerpt "lib/main.dart (youtube-import)"?>
```dart
/// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

[Constants section]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi-class.html#constants
[`package:googleapis`]: {{site.pub-api}}/googleapis
[`youtube_v3`]: {{site.pub-api}}/googleapis/latest/youtube_v3/youtube_v3-library.html
[`YouTubeApi`]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi-class.html
[`youtubeReadonlyScope`]: {{site.pub-api}}/googleapis/latest/youtube_v3/YouTubeApi/youtubeReadonlyScope-constant.html

## 2. 啟用 API

要使用 Google API，您必須擁有 Google 帳戶以及一個 Google 專案。
您還需要啟用所需的 API。

本範例啟用了 [YouTube Data API v3][YouTube Data API v3]。
詳細資訊請參閱 [入門說明][getting started instructions]。

[getting started instructions]: https://cloud.google.com/apis/docs/getting-started
[YouTube Data API v3]: https://console.cloud.google.com/apis/library/youtube.googleapis.com

## 3. 驗證並判斷目前使用者

使用 [google_sign_in][gsi-pkg] 套件，
以 Google 身分驗證使用者。
請針對您想支援的每個平台進行登入設定。

<?code-excerpt "lib/main.dart (google-import)"?>
```dart
/// Provides the `GoogleSignIn` class.
import 'package:google_sign_in/google_sign_in.dart';
```

這個套件的功能是透過 [`GoogleSignIn`][`GoogleSignIn`] 類別的靜態實例來存取的。
在與該實例互動之前，
必須先呼叫 `initialize` 方法並等待其完成。

<?code-excerpt "lib/main.dart (init)"?>
```dart
final _googleSignIn = GoogleSignIn.instance;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize();
  // ···
}
```

初始化完成後，但在使用者驗證之前，
請監聽驗證事件，以判斷使用者是否已登入。

<?code-excerpt "lib/main.dart (post-init)" plaster="none"?>
```dart highlightLines=1,7,9-12
GoogleSignInAccount? _currentUser;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    _googleSignIn.authenticationEvents.listen((event) {
      setState(() {
        _currentUser = switch (event) {
          GoogleSignInAuthenticationEventSignIn() => event.user,
          _ => null,
        };
      });
    });
  });
}
```

一旦你開始監聽任何相關的驗證事件後，就可以嘗試對先前已登入的使用者進行驗證。

```dart highlightLines=5-6
void initState() {
  super.initState();
  _googleSignIn.initialize().then((_) {
    // ...
    // Attempt to authenticate a previously signed in user.
    _googleSignIn.attemptLightweightAuthentication();
  });
}
```

若要允許新用戶進行驗證，請依照 [`package:google_sign_in`][gsi-pkg] 所提供的指示操作。

當用戶已完成驗證後，你必須取得一個已驗證的 HTTP 用戶端。

[gsi-pkg]: {{site.pub-pkg}}/google_sign_in
[`GoogleSignIn`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html

## 4. 取得已驗證的 HTTP 用戶端

當你有已登入的用戶後，請使用 [`authorizationForScopes`][`authorizationForScopes`] 來為你的應用程式所需的 API 權限範圍（scopes）請求相關的用戶端授權權杖（authorization tokens）。

<?code-excerpt "lib/main.dart (scope-authorize)"?>
```dart
const relevantScopes = [YouTubeApi.youtubeReadonlyScope];
final authorization = await currentUser.authorizationClient
    .authorizationForScopes(relevantScopes);
```

:::note
如果你的 scope 需要使用者互動，
你需要從互動處理器（interaction handler）中使用 [`authorizeScopes`][`authorizeScopes`]，
而不是 `authorizationForScopes`。
:::

取得相關授權憑證（authorization tokens）後，
請使用 [`authClient`][`authClient`] 擴充功能（extension），
搭配 [`package:extension_google_sign_in_as_googleapis_auth`][`package:extension_google_sign_in_as_googleapis_auth`]，
建立一個已套用相關憑證的驗證 HTTP 用戶端（authenticated HTTP client）。

<?code-excerpt "lib/main.dart (auth-import)"?>
```dart
import 'package:extension_google_sign_in_as_googleapis_auth/extension_google_sign_in_as_googleapis_auth.dart';
```

<?code-excerpt "lib/main.dart (auth-client)"?>
```dart
final authenticatedClient = authorization!.authClient(
  scopes: relevantScopes,
);
```

[`authorizationForScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizationForScopes.html
[`authorizeScopes`]: {{site.pub-api}}/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizeScopes.html
[`authClient`]: {{site.pub-api}}/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authClient.html
[`package:extension_google_sign_in_as_googleapis_auth`]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth

## 5. 建立並使用所需的 API 類別

使用 API 來建立所需的 API 類型並呼叫方法。
例如：

<?code-excerpt "lib/main.dart (playlist)"?>
```dart
final youTubeApi = YouTubeApi(authenticatedClient);

final favorites = await youTubeApi.playlistItems.list(
  ['snippet'],
  playlistId: 'LL', // Liked List
);
```

## 更多資訊

您可能會想參考以下內容：

* [`extension_google_sign_in_as_googleapis_auth` 範例][auth-ex]
  是本頁所述概念的實作範例。

[auth-ex]: {{site.pub-pkg}}/extension_google_sign_in_as_googleapis_auth/example
