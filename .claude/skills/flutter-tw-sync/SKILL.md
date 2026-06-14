---
name: flutter-tw-sync
description: Sync the Taiwan Traditional-Chinese Flutter docs fork (docs.flutter.tw) with upstream flutter/website, then translate changed/new pages and deploy. Use when the user wants to update docs.flutter.tw to the latest official version, sync the translation fork with upstream, catch up on官方文件, or asks how to bring the Taiwan Flutter docs up to date. Triggers on 同步官方文件, 更新台灣文件, flutter docs sync, docs.flutter.tw 更新, sync upstream flutter website.
---

# flutter-tw-sync

Sync the Taiwan zh-tw Flutter docs fork with upstream `flutter/website`, translate the delta with parallel Sonnet agents, verify, and deploy to `docs.flutter.tw`.

## Context you must know first

- **Fork chain**: `flutter/website` (official, English, latest) → `doggy8088/flutter-website` (original TW) → `chyiiiiiiiiiiii/flutter-website` (the **live source** of docs.flutter.tw). The user's fork is the main line; `doggy8088` may be behind.
- **Deploy path**: push to `zh-tw` branch on the user's fork → GitHub Actions (`.github/workflows/deploy-to-gh-pages.yml`) → builds with `dart run dash_site --site=docs build` → publishes `_site` to `gh-pages` → `docs.flutter.tw` (CNAME).
- **Translation style**: inline — Chinese overwrites English in the same `.md`. Only `title` / `shortTitle` / `description` in frontmatter + body prose are translated; code, frontmatter keys, URLs, Liquid/JSX component tags stay as-is.
- **Build system (current upstream)**: Dart pub workspace + `dash_site` (Jaspr). Needs Flutter/Dart SDK (`sdk: ^3.12.0`). Build: `dart run dash_site --site=docs build`. Local serve: `dart run dash_site serve`. Checks: `check-link-references`, `check-links` (the latter needs a recent firebase-tools).

## Step 0 — Diagnose BEFORE acting (non-negotiable)

Do NOT `git merge` upstream blindly. First quantify whether this is a **content** lag or an **architecture** lag.

```bash
cd <repo>
git remote add official https://github.com/flutter/website.git 2>/dev/null
git fetch official --no-tags -q
git fetch upstream --no-tags -q   # doggy8088
# divergence
git rev-list --left-right --count official/main...zh-tw
# what changed, categorized
MB=$(git merge-base official/main zh-tw)
git diff --name-status $MB official/main > /tmp/syncdiff.txt
cut -f1 /tmp/syncdiff.txt | sed -E 's/[0-9]+//' | sort | uniq -c   # R/A/D/M counts
git ls-tree official/main --name-only | head -40                  # top-level layout — did it restructure?
```

If `git ls-tree official/main` shows the content moved (e.g. `sites/docs/src/content/` instead of `src/content/`) → **architecture migration**, go to Step 1A. If layout is the same → simpler content sync, skip to Step 2 against the existing structure.

Classify the content `.md` work-list:
```bash
grep -E '^R100' /tmp/syncdiff.txt | grep 'src/content/.*\.md$' | wc -l   # pure moves: reuse old translation verbatim
grep -E '^R0[0-9][0-9]' /tmp/syncdiff.txt | grep 'src/content/.*\.md$' | wc -l  # English changed: re-translate, old as reference
grep -E '^A' /tmp/syncdiff.txt | grep 'src/content/.*\.md$' | wc -l    # brand new: translate fresh
```

## Step 1A — Rebase onto upstream monorepo (architecture migration)

Strategy: **adopt the new upstream structure as the base, overlay Taiwan customizations + translations.** Long-term sustainable (future syncs become normal merges) vs band-aid backport (permanent divergence). Default to rebase unless the user wants otherwise.

```bash
# isolated worktree on upstream's new structure
git worktree add -b sync-monorepo /tmp/fw-sync official/main
cd /tmp/fw-sync && dart pub get
# DE-RISK FIRST: confirm the new structure builds + deploy works BEFORE translating
dart run dash_site --site=docs build   # must be green
```

Port Taiwan-specific files into the new layout (from `zh-tw`):
- `CNAME` (`docs.flutter.tw`)
- `.github/ISSUE_TEMPLATE/*` (translation issue templates)
- `.github/workflows/deploy-to-gh-pages.yml` — **rewrite for Dart**: `dart-lang/setup-dart@v1` → `dart pub get` → `dart run dash_site --site=docs build` → `cp CNAME _site/CNAME` → publish `_site` to `gh-pages` via `peaceiris/actions-gh-pages@v4`. (Matches official's build job, which uses setup-dart only — no Flutter needed on CI.)

Carry over reusable translations + extract references:
```bash
# R100 (English unchanged) → copy old translation to new path
grep -E '^R100' /tmp/syncdiff.txt | grep 'sites/docs/src/content/.*\.md$' | while IFS=$'\t' read -r st oldp newp; do
  mkdir -p "/tmp/fw-sync/$(dirname "$newp")"; git show "zh-tw:$oldp" > "/tmp/fw-sync/$newp"; done
# R<100 → extract old translation as reference for the translator agents
#   write to /tmp/fw-ref/<newpath> via `git show zh-tw:<oldpath>`
```
Rebuild to confirm overlay didn't break anything.

## Step 2 — Translate the delta (parallel Sonnet workflow)

Reusable workflow scripts (Workflow tool, `model: 'sonnet'`, one agent per file):
- **Translate**: see `references/translate-workflow.js` in this skill dir. Args = JSON array of file paths. Each agent reads English at `/tmp/fw-sync/<path>`, reads old translation at `/tmp/fw-ref/<path>` if present (reuse its wording, only update the delta), writes Traditional Chinese back to `/tmp/fw-sync/<path>`.
- **Review**: see `references/review-workflow.js`. Args = JSON array. Each agent compares translation vs `git show official/main:<path>`, flags accuracy/readability/link issues.

Glossary (lock terminology): Widget→元件（首次「元件 (Widget)」）, package→套件, plugin→插件, build→建置, app→應用程式, state→狀態, async→非同步, callback→回呼（callback）, dependency→相依套件, layout→版面配置, padding→內距（padding）, example→範例, tutorial→教學.

**Priority batching — ship high-traffic first**: v1 `install/get-started/learn/ui/ai/app-architecture` → v2 `cookbook/platform-integration/testing/perf/deployment/...` → v3 `tools/reference/resources/contribute` → v4 `release` (archive). Translate by tier, deploy after the high-traffic tiers, finish the rest after.

**Session-limit resilience**: if a batch dies on "session limit", DON'T re-run everything. Re-scan for untranslated files and only do the remainder:
```bash
# files in the work-list whose body still has NO CJK = not yet translated
grep -LP '[\x{4e00}-\x{9fff}]' $(cat /tmp/nt_exist.txt) > /tmp/fw-remaining.txt
```

## Step 3 — Verify (4 layers; tools are the source of truth, not agent self-reports)

1. **Build**: `dart run dash_site --site=docs build` must be green.
2. **Structural integrity** (deterministic, free): for each translated file, compare heading count + fenced-code-block count vs `official/main` version. Any diff = content drift → investigate.
3. **Link references**: `dart run dash_site --site=docs check-link-references`.
4. **Internal link targets**: scan `_site/**/*.html` for `href="/..."`; ignore `/go/*` (firebase redirects, ~500 of them), `/assets`, `/api`. Cross-check survivors against `firebase.json` redirects and whether the same link exists in untranslated English pages (= upstream, not your regression).
5. **LLM review** (optional, thorough): run the review workflow per file.

## Step 4 — Deploy (with safety net)

```bash
cd <repo>
git branch zh-tw-backup-old-structure zh-tw          # local backup
git push --force origin zh-tw-backup-old-structure   # remote backup
git checkout zh-tw && git reset --hard sync-monorepo # zh-tw := synced commit
git push --force origin zh-tw                         # triggers deploy
```
Then watch CI and confirm live:
```bash
gh run watch <run-id> --repo chyiiiiiiiiiiii/flutter-website --exit-status   # note: pass --repo, gh may default to upstream
curl -s -L https://docs.flutter.tw/install | grep -o '安裝 Flutter'
```
Untranslated tiers show latest **English** after deploy (accurate, just not yet translated) — confirm that's acceptable with the user before deploying.

## Known traps (prevention baked into the workflow prompts)

1. **Embedded YAML in components** (`<Quiz>`, etc.): if a translated YAML value starts with `'`/`"` or contains `:` / `#`, wrap the WHOLE value in double quotes. A value starting with an unclosed single quote breaks `dash_site build`. (Does NOT apply to Dart string literals inside ``` code fences.)
2. **`<ExpansionList>` aggregated pages don't carry sub-page reference-link definitions.** English `[text][]` collapsed refs degrade gracefully; translated `[中文][label]` full refs render as literal broken brackets. Fix: convert those reference-style links to **inline** `[text](url)` in the sub-pages.
3. **Never trust an agent's "it's a false positive / no problem."** Re-run the build/checker yourself. The tool output is ground truth.
4. **`gh` may resolve to the upstream repo** (doggy8088). Always pass `--repo chyiiiiiiiiiiii/flutter-website` for run/PR commands.
5. **macOS** has no `timeout`; zsh reserves `$status` (use another var name); `grep -P` for CJK is `[\x{4e00}-\x{9fff}]`.

## Future syncs are easy now

Once rebased onto the monorepo, the worktree base IS upstream's structure. A normal `git merge official/main` then re-translate only the new delta (Step 0 → 2 → 3 → 4). No more big migration.
