# Firebase

> 將你的 Flutter 應用程式連接到 Firebase，使用驗證、Cloud Firestore、 Firebase SQL Connect、雲端儲存、AI 功能，以及無伺服器 Dart 函式。



Firebase 是 Google 的應用程式開發平台，
為行動、網頁與桌面平台的 Flutter 應用程式提供託管的後端服務。
每項 Firebase 服務都是 pub.dev 上獨立的 Firebase Flutter 插件，
因此你可以只加入應用程式需要的服務：

| 服務 | 使用情境 | 套件 |
|---|---|---|
| [Cloud Firestore][] | 具備即時同步與內建離線快取的 NoSQL 文件資料庫 | [`cloud_firestore`][] |
| [Firebase SQL Connect][] | 託管的 PostgreSQL 資料庫，並產生型別安全的 Dart SDK | [`firebase_data_connect`][] |
| [Firebase Authentication][firebase-auth] | 使用電子郵件、電話，以及 Google 或 Apple 等供應商登入 | [`firebase_auth`][] |
| [Cloud Storage for Firebase][firebase-storage] | 上傳與下載使用者的照片、影片與文件 | [`firebase_storage`][] |
| [Firebase AI Logic][firebase-ai] | 從用戶端直接存取 Gemini 與 Imagen 模型 | [`firebase_ai`][] |
| [Cloud Functions for Firebase][firebase-functions-dart] | 以 JavaScript、TypeScript、Python 或 Dart（實驗性）撰寫的無伺服器後端邏輯 | [`cloud_functions`][]（用戶端）、[`firebase_functions`][]（伺服器端） |
| [Firebase Crashlytics][crashlytics] | 即時崩潰回報與診斷 | [`firebase_crashlytics`][] |

{:.table .table-striped}

如需完整的支援套件與平台可用性清單，
請參考 [Available Firebase Flutter plugins][Firebase plugins]。

## 將 Flutter 應用程式連接到 Firebase

若要將你的 Flutter 應用程式註冊到 Firebase 專案並產生
各平台的設定檔，請使用 Firebase CLI 與 FlutterFire CLI：

1. 安裝 [Firebase CLI][]，並登入你的 Google 帳戶：

   ```console
   $ firebase login
   ```

2. 全域安裝 FlutterFire CLI：

   ```console
   $ dart pub global activate flutterfire_cli
   ```

3. 在 Flutter 專案的根目錄中，加入核心插件並執行設定流程：

   ```console
   $ flutter pub add firebase_core
   $ flutterfire configure
   ```

   此指令會在你的 Firebase 專案中註冊各平台的應用程式，
   並產生 `lib/firebase_options.dart`。

4. 在呼叫 `runApp()` 之前，於 `lib/main.dart` 中初始化 Firebase：

   ```dart
   import 'package:firebase_core/firebase_core.dart';
   import 'package:flutter/material.dart';
   import 'firebase_options.dart';

   void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     await Firebase.initializeApp(
       options: DefaultFirebaseOptions.currentPlatform,
     );
     runApp(const MyApp());
   }
   ```

如需詳細的平台設定說明，請參考
[Add Firebase to your Flutter app][started]。

## 使用 Firebase Authentication 驗證使用者

[Firebase Authentication][firebase-auth] 支援以電子郵件與密碼、
電話號碼、匿名工作階段，以及 Google、Apple 與 GitHub 等
聯合身分供應商登入。

若要在應用程式中加入 Firebase Authentication，請安裝 [`firebase_auth`][]：

```console
$ flutter pub add firebase_auth
```

你可以搭配 `StreamBuilder` 監聽 `FirebaseAuth.instance.authStateChanges()`，
在使用者登入或登出時做出回應：

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasData) {
          return HomeScreen(user: snapshot.data!);
        }
        // Your own sign-in UI.
        return const SignInScreen();
      },
    );
  }
}

Future<UserCredential> signInWithEmail(String email, String password) {
  return FirebaseAuth.instance.signInWithEmailAndPassword(
    email: email,
    password: password,
  );
}
```

想進一步了解，請參考
[Get started with Firebase Authentication on Flutter][firebase-auth]，或
[FirebaseUI authentication codelab][auth-codelab]。

## 使用 Cloud Firestore 儲存並同步 NoSQL 資料

當你的應用程式需要可擴充的 NoSQL 資料庫，能在多個裝置間即時同步資料，
並提供離線快取與持久化時，例如聊天應用程式、協作工具，
或需要在不穩定連線下持續運作的現場服務應用程式，
[Cloud Firestore][] 是建議的預設選擇。若要比較 Cloud Firestore 與
關聯式及本機儲存選項，請參考
[Choose a database for your Flutter app][choose-db]。

若要將 Cloud Firestore 加入專案，請執行：

```console
$ flutter pub add cloud_firestore
```

以下範例會在 `tasks` 集合中新增一份任務文件，
並將即時查詢結果以串流方式顯示在 `ListView` 中：

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

Future<void> addTask(String title) {
  return FirebaseFirestore.instance.collection('tasks').add({
    'title': title,
    'completed': false,
    'createdAt': FieldValue.serverTimestamp(),
  });
}

class TaskList extends StatefulWidget {
  const TaskList({super.key});

  @override
  State<TaskList> createState() => _TaskListState();
}

class _TaskListState extends State<TaskList> {
  // Create the stream once so that it isn't recreated on every rebuild.
  final Stream<QuerySnapshot<Map<String, dynamic>>> _tasksStream =
      FirebaseFirestore.instance
          .collection('tasks')
          .orderBy('createdAt', descending: true)
          .snapshots();

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
      stream: _tasksStream,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const Center(child: Text('Something went wrong.'));
        }
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        final docs = snapshot.data!.docs;
        return ListView.builder(
          itemCount: docs.length,
          itemBuilder: (context, index) {
            final data = docs[index].data();
            return ListTile(
              title: Text(data['title'] as String? ?? ''),
            );
          },
        );
      },
    );
  }
}
```

離線持久化在 Android 與 Apple 平台上預設啟用（在網頁上可選擇啟用），
因此你的應用程式可以在沒有網路連線時讀取與寫入快取的文件，
並在連線恢復時自動同步變更。若要開始使用，請參考
[Cloud Firestore quickstart][firestore-quickstart]。

## 使用 Firebase SQL Connect 查詢關聯式 SQL 資料

如果你的應用程式需要關聯式資料庫，[Firebase SQL Connect][]
（前身為 Firebase Data Connect）提供託管的 PostgreSQL 資料庫，
並產生以 [`firebase_data_connect`][] 套件為基礎的型別安全 Dart SDK。

若要安裝此插件，請執行：

```console
$ flutter pub add firebase_data_connect
```

若要比較 SQL Connect、Cloud Firestore 與本機 SQLite，請參考
[Choose a database for your Flutter app][choose-db]。若要設定
SQL Connect 後端並從 Flutter 呼叫它，請依照
[use generated Flutter SDKs][sql-connect-flutter] 的指南操作。

## 與無伺服器 Firebase 後端共用 Dart 程式碼

當你的應用程式需要自訂的伺服器端邏輯、背景觸發器，
或對 Firebase 服務的管理存取權時，你可以使用
[`firebase_functions`][] 與 [`firebase_admin_sdk`][] 套件，
撰寫 [Cloud Functions for Firebase in Dart][firebase-functions-dart]。

:::note
Cloud Functions for Firebase 的 Dart 支援目前為實驗性功能。
在執行 `firebase init functions` 之前，
你必須先在 Firebase CLI 中啟用 `dartfunctions` 實驗功能，
且 API 可能在穩定版發布前有所變動。
:::

在 Flutter 前端與 Firebase 後端都使用 Dart，
讓你可以在用戶端與伺服器之間共用單一 Dart 套件，
包含資料模型、JSON 序列化與驗證規則。若要了解如何
建構共用套件的工作區，請參考
[Sharing code between Flutter apps and Dart backends][dart-server]。

## Flutter 與 Firebase 資源

想進一步了解如何使用 Firebase 建置 Flutter 應用程式，
請參考以下官方與社群資源。

### 文件與 codelab

* [Add Firebase to your Flutter app][started]
* [Choose a database for your Flutter app][choose-db]
* [Get to know Firebase for Flutter codelab][codelab1]
* [Add a user authentication flow using FirebaseUI][auth-codelab]
* [Firebase AI Logic documentation][firebase-ai]
* [Use Firebase to host your Flutter app on the web][article]

### 影片

* [Get to know Firebase for Flutter video workshop][workshop]
* [Using Firestore as a backend to your Flutter app][video]
* [Live Coding Firebase Authentication with Flutter][video2]

[article]: https://blog.flutter.dev/must-try-use-firebase-to-host-your-flutter-app-on-the-web-852ee533a469
[auth-codelab]: https://firebase.google.com/codelabs/firebase-auth-in-flutter-apps
[choose-db]: /data-and-backend/persistence/choose-a-database
[Cloud Firestore]: https://firebase.google.com/docs/firestore
[`cloud_firestore`]: https://pub.dev/packages/cloud_firestore
[`cloud_functions`]: https://pub.dev/packages/cloud_functions
[codelab1]: https://codelabs.developers.google.com/codelabs/firebase-get-to-know-flutter
[crashlytics]: https://firebase.google.com/docs/crashlytics/flutter/get-started
[dart-server]: https://dart.dev/server#sharing-code-between-flutter-apps-and-dart-backends
[firebase-ai]: https://firebase.google.com/docs/ai-logic/get-started
[`firebase_ai`]: https://pub.dev/packages/firebase_ai
[`firebase_admin_sdk`]: https://pub.dev/packages/firebase_admin_sdk
[firebase-auth]: https://firebase.google.com/docs/auth/flutter/start
[`firebase_auth`]: https://pub.dev/packages/firebase_auth
[Firebase CLI]: https://firebase.google.com/docs/cli
[`firebase_crashlytics`]: https://pub.dev/packages/firebase_crashlytics
[`firebase_data_connect`]: https://pub.dev/packages/firebase_data_connect
[firebase-functions-dart]: https://firebase.google.com/docs/functions/start-dart
[`firebase_functions`]: https://pub.dev/packages/firebase_functions
[Firebase plugins]: https://firebase.google.com/docs/flutter/setup#available-plugins
[Firebase SQL Connect]: https://firebase.google.com/docs/sql-connect
[firebase-storage]: https://firebase.google.com/docs/storage/flutter/start
[`firebase_storage`]: https://pub.dev/packages/firebase_storage
[firestore-quickstart]: https://firebase.google.com/docs/firestore/quickstart
[sql-connect-flutter]: https://firebase.google.com/docs/sql-connect/flutter-sdk
[started]: https://firebase.google.com/docs/flutter/setup
[video]: https://www.youtube.com/watch/DqJ_KjFzL9I&t#38s
[video2]: https://www.youtube.com/watch/OlcYP6UXlm8
[workshop]: https://www.youtube.com/watch/4wunbF29Kkg

