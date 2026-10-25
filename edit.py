import sys
def ed(path, pairs):
    s=open(path,encoding='utf-8').read()
    for a,b in pairs:
        if a not in s: print("MISSING",path,repr(a[:60])); continue
        s=s.replace(a,b)
    open(path,'w',encoding='utf-8').write(s)
M='{{site.material_ui}}'
ed('release/breaking-changes/supplemental-maybeOf-migration.md',[
 ('{{site.api}}/flutter/material/DefaultTabController/',M+'/DefaultTabController/'),
 ('{{site.api}}/flutter/material/Material/',M+'/Material/')])
ed('release/breaking-changes/updated-material-3-progress-indicators.md',[
 ('{{site.main-api}}/flutter/material/',M+'/')])
ed('testing/common-errors.md',[
 ('{{site.medium}}/@','https://medium.com/@'),
 ('  showDialog(\n','  showDialog<void>(\n'),
 ('              PageRouteBuilder(\n','              PageRouteBuilder<void>(\n')])
ed('ui/adaptive-responsive/best-practices.md',[
 ('{{site.youtube-site}}/watch?v=GAnSNplNpCA','{{site.yt.watch}}?v=GAnSNplNpCA'),
 ('{{site.github}}/gskinnerTeam/flutter-wonderous-app','{{site.repo.wonderous}}'),
 ('Medium 免費文章','Flutter 部落格文章')])
ed('ui/design/text/typography.md',[
 ('https://api.flutter.dev/flutter/material/TextTheme-class.html',M+'/TextTheme-class.html'),
 ('https://api.flutter.dev/flutter/painting/TextStyle-class.html','{{site.api}}/flutter/painting/TextStyle-class.html'),
 ('https://api.flutter.dev/flutter/material/Typography-class.html',M+'/Typography-class.html'),
 ('這是一篇免費的 Medium 文章。','這是一篇 Flutter 部落格文章。')])
ed('ui/layout/constraints.md',[
 ('{{site.github}}/','https://github.com/'),
 ('{{site.medium}}/flutter-community','https://medium.com/flutter-community')])
ed('cookbook/testing/widget/scrolling.md',[
 ('若要在整合測試（integration tests）中捲動清單，','若要在元件測試（widget tests）中捲動清單，'),
 ('於整合測試中互動','於元件測試（widget tests）中互動')])
ed('release/breaking-changes/template.md',[
 ('''    請參考本範本結尾的範例，
    但勿在 URL 中直接使用 "github.com"、"api.flutter.dev" 或
    "pub.dev"。請使用 {{site.github}}、{{site.api}} 或 {{site.pub}} 巨集。
''','''    請參考本範本結尾的範例。
    GitHub 連結請在有對應儲存庫巨集時使用該巨集；
    否則請使用原始的 `https://github.com` URL。
    請勿在 URL 中使用 "api.flutter.dev" 或 "pub.dev"。
    請使用 {{site.api}} 或 {{site.pub}} 巨集。
''')])
ed('release/release-notes/index.md',[
 ('* 3.44.0\n  * [3.44.0 發行說明','''* 3.47.0
  * [3.47.0 公告][3.47.0 announcement]
  * [3.47.0 發行說明與變更記錄][3.47.0 release notes & change log]
  * [3.47.0 重大變更與遷移指引][3.47.0 breaking changes & migrations]
* 3.44.0
  * [3.44.0 公告][3.44.0 announcement]
  * [3.44.0 發行說明'''),
 ('[3.44.0 release notes & change log]: /release','''[3.47.0 announcement]: {{site.main-url}}/blog/whats-new-in-flutter-3-47
[3.47.0 release notes & change log]: /release/release-notes/release-notes-3.47.0
[3.47.0 breaking changes & migrations]: /release/breaking-changes#released-in-flutter-3-47
[3.44.0 announcement]: {{site.flutter-blog}}/whats-new-in-flutter-3-44-b0cc1ad3c527
[3.44.0 release notes & change log]: /release''')])
ed('add-to-app/performance.md',[
 (''':::note
有些套件允許您將原生應用程式的圖片與字型共用到 Flutter 螢幕。例如：
* [native_font]({{site.pub-pkg}}/native_font)
* [ios_platform_images]({{site.pub-pkg}}/ios_platform_images)
:::

''',''),
 ('{{site.github}}/dart-lang/sdk','{{site.repo.dart-sdk}}')])
ed('ai/ai-toolkit/user-experience.md',[
 ('title: 使用者體驗\nsidenav: ai\n','title: 使用者體驗\n'),
 ('[Cupertino app]: {{site.api}}/flutter/cupertino/','[Cupertino app]: {{site.cupertino_ui}}/'),
 ('[`CupertinoTextField`]:\n    {{site.api}}/flutter/cupertino/','[`CupertinoTextField`]: {{site.cupertino_ui}}/'),
 ('{{site.api}}/flutter/material/',M+'/')])
ed('learn/pathway/tutorial/slivers.md',[
 ("import 'package:flutter/cupertino.dart';","import 'package:cupertino_ui/cupertino_ui.dart';"),
 ('''  final TextStyle style = CupertinoTheme.of(
    context,
  ).textTheme.textStyle.copyWith(color: CupertinoColors.systemGrey);''','''  final TextStyle style = CupertinoTheme.of(context).textTheme.textStyle
      .copyWith(color: CupertinoColors.systemGrey);''')])
ed('cookbook/testing/widget/scrolling.md',[
 ("import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp(","import 'package:material_ui/material_ui.dart';\n\nvoid main() {\n  runApp(MyApp("),
 ("import 'package:flutter/material.dart';\nimport 'package:flutter_test/flutter_test.dart';\n\nimport 'package:scrolling/main.dart';","import 'package:flutter_test/flutter_test.dart';\nimport 'package:material_ui/material_ui.dart';\nimport 'package:scrolling/main.dart';")])
