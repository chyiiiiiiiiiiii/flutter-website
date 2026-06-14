# Google APIs

> 如何在 Flutter 中使用 Google APIs。



<?code-excerpt path-base="googleapis/"?>

[Google APIs 套件][Google APIs package] 提供數十種 Google
服務，您可以在 Dart 專案中使用。

本頁說明如何透過 Google 驗證，使用與
終端使用者資料互動的 API。

屬於使用者資料 API 的範例包括
[Calendar][Calendar]、[Gmail][Gmail]、[YouTube][YouTube] 以及 Firebase。

:::note
您應該直接在 Flutter 專案中使用的 API，
僅限於那些透過 Google 驗證存取使用者資料的 API。

需要 [服務帳戶（service accounts）][service accounts] 的 API **不應該**
直接在 Flutter 應用程式中使用。
這麼做會導致服務憑證隨應用程式一同發佈，這是不安全的。
若需使用這類 API，
建議您建立一個中介服務來處理。
:::

若要明確地為 Firebase 加入驗證功能，請參考
[使用 FirebaseUI 為 Flutter 應用程式新增使用者驗證流程][fb-lab]
教學，以及
[在 Flutter 上開始使用 Firebase Authentication][fb-auth] 文件。

[fb-lab]: https://firebase.google.com/codelabs/firebase-auth-in-flutter-apps
[Calendar]: https://pub.dev/documentation/googleapis/latest/calendar_v3/calendar_v3-library.html
[fb-auth]: https://firebase.google.com/docs/auth/flutter/start
[Gmail]: https://pub.dev/documentation/googleapis/latest/gmail_v1/gmail_v1-library.html
[Google APIs package]: https://pub.dev/packages/googleapis
[service accounts]: https://cloud.google.com/iam/docs/service-account-overview
[YouTube]: https://pub.dev/documentation/googleapis/latest/youtube_v3/youtube_v3-library.html

## 概覽

要使用 Google APIs，請依照下列步驟：

1. 選擇所需的 API
1. 啟用該 API
1. 驗證並取得目前使用者
1. 取得已驗證的 HTTP 用戶端
1. 建立並使用所需的 API 類別

## 1. 選擇所需的 API

[`package:googleapis`][`package:googleapis`] 的文件
將每個 API 視為獨立的 Dart 函式庫&emdash;以
`name_version` 格式呈現。
可參考 [`youtube_v3`][`youtube_v3`] 作為範例。

每個函式庫可能會提供多種型別，
但會有一個結尾為 _`Api`_ 的「根」類別（root class）。
以 YouTube 為例，根類別是 [`YouTubeApi`][`YouTubeApi`]。

`Api` 類別不僅是您需要
實例化的類別（請參考步驟 3），同時也
提供了代表使用該 API 所需權限的 scopes。
舉例來說，
`YouTubeApi` 類別的 [常數區段（Constants section）][Constants section]
列出了可用的 scopes。
如果您只需讀取（但不寫入）終端使用者的
YouTube 資料，請以
[`youtubeReadonlyScope`][`youtubeReadonlyScope`] 進行使用者驗證。

<?code-excerpt "lib/main.dart (youtube-import)"?>
```dart
/// Provides the `YouTubeApi` class.
import 'package:googleapis/youtube/v3.dart';
```

[Constants section]: https://pub.dev/documentation/googleapis/latest/youtube_v3/YouTubeApi-class.html#constants
[`package:googleapis`]: https://pub.dev/documentation/googleapis
[`youtube_v3`]: https://pub.dev/documentation/googleapis/latest/youtube_v3/youtube_v3-library.html
[`YouTubeApi`]: https://pub.dev/documentation/googleapis/latest/youtube_v3/YouTubeApi-class.html
[`youtubeReadonlyScope`]: https://pub.dev/documentation/googleapis/latest/youtube_v3/YouTubeApi/youtubeReadonlyScope-constant.html

## 2. 啟用 API

要使用 Google API，您必須擁有 Google 帳戶以及一個 Google 專案。
您也需要啟用您想要使用的 API。

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

此套件的功能可透過
[`GoogleSignIn`][`GoogleSignIn`] 類別的靜態實例來存取。
在與該實例互動之前，
必須先呼叫 `initialize` 方法並等待其完成。

<?code-excerpt "lib/main.dart (init)"?>
```dart
final GoogleSignIn _googleSignIn = GoogleSignIn.instance;

@override
void initState() {
  super.initState();
  _googleSignIn.initialize();
  // ···
}
```

初始化完成後，但在使用者驗證（authentication）之前，請監聽驗證事件，以判斷使用者是否已登入。

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

一旦你開始監聽任何相關的驗證事件後，你就可以嘗試對先前已登入的使用者進行驗證。

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

若要同時允許新使用者進行驗證，請依照 [`package:google_sign_in`][gsi-pkg] 所提供的指示操作。

當使用者已完成驗證後，您必須取得一個已驗證的 HTTP 用戶端。

[gsi-pkg]: https://pub.dev/packages/google_sign_in
[`GoogleSignIn`]: https://pub.dev/documentation/google_sign_in/latest/google_sign_in/GoogleSignIn-class.html

## 4. 取得已驗證的 HTTP 用戶端

當您有已登入的使用者後，請使用 [`authorizationForScopes`][`authorizationForScopes`] 來為您的應用程式所需的 API 權限範圍請求相關的用戶端授權權杖。

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
請使用 [`authClient`][`authClient`] 擴充套件（extension），
搭配 [`package:extension_google_sign_in_as_googleapis_auth`][`package:extension_google_sign_in_as_googleapis_auth`]，
建立一個已套用相關憑證的已驗證 HTTP 用戶端（authenticated HTTP client）。

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

[`authorizationForScopes`]: https://pub.dev/documentation/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizationForScopes.html
[`authorizeScopes`]: https://pub.dev/documentation/google_sign_in/latest/google_sign_in/GoogleSignInAuthorizationClient/authorizeScopes.html
[`authClient`]: https://pub.dev/documentation/extension_google_sign_in_as_googleapis_auth/latest/extension_google_sign_in_as_googleapis_auth/GoogleApisGoogleSignInAuth/authClient.html
[`package:extension_google_sign_in_as_googleapis_auth`]: https://pub.dev/packages/extension_google_sign_in_as_googleapis_auth

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

[auth-ex]: https://pub.dev/packages/extension_google_sign_in_as_googleapis_auth/example

