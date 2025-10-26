---
title: 為你的手機遊戲加入成就與排行榜
description: >
  如何使用 games_services 套件為你的遊戲新增相關功能。
---

<?code-excerpt path-base="cookbook/games/achievements_leaderboards"?>

玩家玩遊戲的動機多種多樣。
大致來說，主要有四大動機：
[沉浸、成就、合作與競爭][immersion, achievement, cooperation, and competition]。
無論你打造什麼樣的遊戲，總有些玩家追求*成就*。
這可能是贏得獎盃或解鎖秘密。
有些玩家則想要*競爭*。
這可能是創下高分或完成速通。
這兩個想法分別對應到*成就*與*排行榜*這兩個概念。

![一個簡單圖示，代表上述四種動機](/assets/images/docs/cookbook/types-of-gamer-motivations.png){:.site-illustration}

像 App Store 和 Google Play 這樣的生態系統，
都提供了成就與排行榜的集中式服務。
玩家可以在同一個地方查看所有遊戲的成就，
而開發者也不需要為每款遊戲重複實作這些功能。

本教學將示範如何使用 [`games_services` 套件][`games_services` package]
為你的手機遊戲加入成就與排行榜功能。

[`games_services` package]: {{site.pub-pkg}}/games_services
[immersion, achievement, cooperation, and competition]: https://meditations.metavert.io/p/game-player-motivations

## 1. 啟用平台服務

要啟用遊戲服務，請在 iOS 上設定 *Game Center*，
在 Android 上設定 *Google Play Games Services*。

### iOS

在 iOS 上啟用 Game Center（GameKit）的方法如下：

1.  在 Xcode 中開啟你的 Flutter 專案。
    開啟 `ios/Runner.xcworkspace`

2.  選取最上層的 **Runner** 專案。

3.  前往 **Signing & Capabilities** 分頁。

4.  點擊 `+` 按鈕，新增 **Game Center** 作為一項能力（capability）。

5.  關閉 Xcode。

6.  如果你還沒註冊，
    請到 [App Store Connect][App Store Connect] 註冊你的遊戲，
    並在 **My App** 區塊按下 `+` 圖示。

    ![App Store Connect 中 + 按鈕的螢幕截圖](/assets/images/docs/cookbook/app-store-add-app-button.png)

7.  仍在 App Store Connect 中，尋找 *Game Center* 區塊。
    目前你可以在 **Services** 裡找到它。在 **Game
    Center** 頁面上，你可以根據遊戲需求設定排行榜與多個成就。
    請記下你所建立的排行榜與成就的 ID。

[App Store Connect]: https://appstoreconnect.apple.com/

### Android

在 Android 上啟用 *Play Games Services*：

1.  如果你還沒註冊，請到 [Google Play Console][Google Play Console]
    並在那裡註冊你的遊戲。
    
    ![Google Play Console 中「建立應用程式」按鈕的螢幕截圖](/assets/images/docs/cookbook/google-play-create-app.png)

2.  仍在 Google Play Console，從導覽選單選擇 *Play Games Services* → *Setup
    and management* → *Configuration*，並依照指示操作。

      * 這個流程需要花費不少時間與耐心。
        其中一個步驟是你需要在 Google Cloud Console
        設定 OAuth 同意畫面。
        如果你在任何步驟感到困惑，請參考官方
        [Play Games Services 指南][Play Games Services guide]。
         
        ![Google Play Console 中 Games Services 區塊的螢幕截圖](/assets/images/docs/cookbook/play-console-play-games-services.png)

3.  完成後，你可以在
    **Play Games Services** → **Setup and management** 中開始新增排行榜與成就。
    請建立與 iOS 端完全相同的一組內容，並記下 ID。

4.  前往 **Play Games Services → Setup and management → Publishing**。

5.  點擊 **Publish**。不用擔心，這並不會真的發佈你的遊戲。
    它只會發佈成就與排行榜。例如，一旦排行榜以這種方式發佈後，就無法取消發佈。

6.  前往 **Play Games Services** **→ Setup and management →
    Configuration → Credentials**。

7.  找到 **Get resources** 按鈕。
    它會回傳一個包含 Play Games Services ID 的 XML 檔案。

    ```xml
    <!-- THIS IS JUST AN EXAMPLE -->
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <!--app_id-->
        <string name="app_id" translatable="false">424242424242</string>
        <!--package_name-->
        <string name="package_name" translatable="false">dev.flutter.tictactoe</string>
        <!--achievement First win-->
        <string name="achievement_first_win" translatable="false">sOmEiDsTrInG</string>
        <!--leaderboard Highest Score-->
        <string name="leaderboard_highest_score" translatable="false">sOmEiDsTrInG</string>
    </resources>
    ```

8.  在`android/app/src/main/res/values/games-ids.xml`新增一個檔案，
    並將你在前一步驟取得的 XML 內容放入該檔案中。

[Google Play Console]: https://play.google.com/console/
[Play Games Services guide]: {{site.developers}}/games/services/console/enabling

## 2. 登入遊戲服務

現在你已經設定好 *Game Center* 和 *Play Games Services*，
並且準備好了成就與排行榜 ID，終於可以開始寫 Dart 程式碼了。

1.  在 [`games_services` 套件]({{site.pub-pkg}}/games_services) 中新增相依性。

    ```console
    $ flutter pub add games_services
    ```

2.  在你進行其他操作之前，必須先將玩家登入到遊戲服務。

    <?code-excerpt "lib/various.dart (signIn)"?>
    ```dart
    try {
      await GamesServices.signIn();
    } on PlatformException catch (e) {
      // ... deal with failures ...
    }
    ```

登入會在背景執行。這個過程需要幾秒鐘，因此請不要在`runApp()`之前呼叫`signIn()`，否則玩家每次啟動你的遊戲時都會被迫盯著空白畫面。

對`games_services` API 的呼叫可能因多種原因而失敗。因此，每一次呼叫都應該像前述範例一樣包在 try-catch 區塊中。為了簡潔起見，接下來的教學將省略例外處理。

:::tip
建立一個 controller 是個好習慣。這個 controller 可以是一個`ChangeNotifier`、一個 bloc，或是其他包裝`games_services` plugin 原始功能的邏輯元件。
:::


## 3. 解鎖成就

1.  請先在 Google Play Console 和 App Store Connect 註冊成就，並記下它們的 ID。現在你可以在 Dart 程式碼中頒發這些成就：

    <?code-excerpt "lib/various.dart (unlock)"?>
    ```dart
    await GamesServices.unlock(
      achievement: Achievement(
        androidID: 'your android id',
        iOSID: 'your ios id',
      ),
    );
    ```

    玩家在 Google Play Games 或 Apple Game Center 上的帳號現在會顯示該成就。

2.  若要從您的遊戲中顯示成就 UI，請呼叫 `games_services` API：

    <?code-excerpt "lib/various.dart (showAchievements)"?>
    ```dart
    await GamesServices.showAchievements();
    ```

    這會將平台成就（achievements）UI 以疊加層（overlay）的方式顯示在你的遊戲上。

3.  若要在你自己的 UI 中顯示成就，請使用
    [`GamesServices.loadAchievements()`][`GamesServices.loadAchievements()`]。
    
[`GamesServices.loadAchievements()`]: {{site.pub-api}}/games_services/latest/games_services/GamesServices/loadAchievements.html

## 4. 提交分數

當玩家完成一次遊戲流程後，你的遊戲可以將該次遊玩結果提交到一個或多個排行榜（leaderboards）。

例如，像 Super Mario 這樣的平台遊戲，可以將最終分數以及完成關卡所花費的時間，分別提交到兩個不同的排行榜。

1.  在第一步中，你已在 Google Play Console 和 App Store Connect 註冊了排行榜，並記下了其 ID。使用這個 ID，你可以為玩家提交新的分數：

    <?code-excerpt "lib/various.dart (submitScore)"?>
    ```dart
    await GamesServices.submitScore(
      score: Score(
        iOSLeaderboardID: 'some_id_from_app_store',
        androidLeaderboardID: 'sOmE_iD_fRoM_gPlAy',
        value: 100,
      ),
    );
    ```

    你不需要檢查新分數是否為玩家的最高分。平台遊戲服務會自動為你處理這部分。

2.  若要在遊戲中以覆蓋層（overlay）方式顯示排行榜（leaderboard），請呼叫下列方法：

    <?code-excerpt "lib/various.dart (showLeaderboards)"?>
    ```dart
    await GamesServices.showLeaderboards(
      iOSLeaderboardID: 'some_id_from_app_store',
      androidLeaderboardID: 'sOmE_iD_fRoM_gPlAy',
    );
    ```

3.  如果你想在自己的 UI 中顯示排行榜分數，可以使用 [`GamesServices.loadLeaderboardScores()`][`GamesServices.loadLeaderboardScores()`] 來取得分數。
    
[`GamesServices.loadLeaderboardScores()`]: {{site.pub-api}}/games_services/latest/games_services/GamesServices/loadLeaderboardScores.html

## 5. 下一步

`games_services` 外掛還有更多功能。透過這個外掛，你可以：

- 取得玩家的頭像、名稱或唯一 ID
- 儲存與載入遊戲狀態
- 登出遊戲服務

有些成就可以是累進式的。例如：「你已收集所有 10 塊 McGuffin。」

每款遊戲對遊戲服務的需求都不同。

你可以考慮先建立這個 controller，
將所有成就與排行榜的邏輯集中管理：

<?code-excerpt "lib/games_services_controller.dart"?>
```dart
import 'dart:async';

import 'package:games_services/games_services.dart';
import 'package:logging/logging.dart';

/// Allows awarding achievements and leaderboard scores,
/// and also showing the platforms' UI overlays for achievements
/// and leaderboards.
///
/// A facade of `package:games_services`.
class GamesServicesController {
  static final Logger _log = Logger('GamesServicesController');

  final Completer<bool> _signedInCompleter = Completer();

  Future<bool> get signedIn => _signedInCompleter.future;

  /// Unlocks an achievement on Game Center / Play Games.
  ///
  /// You must provide the achievement ids via the [iOS] and [android]
  /// parameters.
  ///
  /// Does nothing when the game isn't signed into the underlying
  /// games service.
  Future<void> awardAchievement({
    required String iOS,
    required String android,
  }) async {
    if (!await signedIn) {
      _log.warning('Trying to award achievement when not logged in.');
      return;
    }

    try {
      await GamesServices.unlock(
        achievement: Achievement(androidID: android, iOSID: iOS),
      );
    } catch (e) {
      _log.severe('Cannot award achievement: $e');
    }
  }

  /// Signs into the underlying games service.
  Future<void> initialize() async {
    try {
      await GamesServices.signIn();
      // The API is unclear so we're checking to be sure. The above call
      // returns a String, not a boolean, and there's no documentation
      // as to whether every non-error result means we're safely signed in.
      final signedIn = await GamesServices.isSignedIn;
      _signedInCompleter.complete(signedIn);
    } catch (e) {
      _log.severe('Cannot log into GamesServices: $e');
      _signedInCompleter.complete(false);
    }
  }

  /// Launches the platform's UI overlay with achievements.
  Future<void> showAchievements() async {
    if (!await signedIn) {
      _log.severe('Trying to show achievements when not logged in.');
      return;
    }

    try {
      await GamesServices.showAchievements();
    } catch (e) {
      _log.severe('Cannot show achievements: $e');
    }
  }

  /// Launches the platform's UI overlay with leaderboard(s).
  Future<void> showLeaderboard() async {
    if (!await signedIn) {
      _log.severe('Trying to show leaderboard when not logged in.');
      return;
    }

    try {
      await GamesServices.showLeaderboards(
        // TODO: When ready, change both these leaderboard IDs.
        iOSLeaderboardID: 'some_id_from_app_store',
        androidLeaderboardID: 'sOmE_iD_fRoM_gPlAy',
      );
    } catch (e) {
      _log.severe('Cannot show leaderboard: $e');
    }
  }

  /// Submits [score] to the leaderboard.
  Future<void> submitLeaderboardScore(int score) async {
    if (!await signedIn) {
      _log.warning('Trying to submit leaderboard when not logged in.');
      return;
    }

    _log.info('Submitting $score to leaderboard.');

    try {
      await GamesServices.submitScore(
        score: Score(
          // TODO: When ready, change these leaderboard IDs.
          iOSLeaderboardID: 'some_id_from_app_store',
          androidLeaderboardID: 'sOmE_iD_fRoM_gPlAy',
          value: score,
        ),
      );
    } catch (e) {
      _log.severe('Cannot submit leaderboard score: $e');
    }
  }
}
```

## 更多資訊

Flutter Casual Games Toolkit 包含以下範本：

* [basic][basic]：基本入門遊戲
* [card][card]：入門紙牌遊戲
* [endless runner][endless runner]：入門型無盡奔跑遊戲（使用 Flame），玩家將不斷奔跑，避開陷阱並獲取獎勵

[basic]: {{site.github}}/flutter/games/tree/main/templates/basic#readme
[card]: {{site.github}}/flutter/games/tree/main/templates/card#readme
[endless runner]: {{site.github}}/flutter/games/tree/main/templates/endless_runner#readme
