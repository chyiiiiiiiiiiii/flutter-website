export const meta = {
  name: 'flutter-tw-translate-v1',
  description: 'Translate v1 high-traffic Flutter docs (install/get-started/learn/ui/ai/app-architecture) to Traditional Chinese in the new monorepo worktree',
  phases: [{ title: 'Translate', detail: 'one Sonnet agent per file, parallel' }],
}

const files = Array.isArray(args) ? args : JSON.parse(args)
const SYNC = '/tmp/fw-sync'
const REF = '/tmp/fw-ref'

const GLOSSARY = `術語慣例（沿用 flutter.tw）：
- Widget → 元件（首次出現寫「元件 (Widget)」）
- package → 套件 ；plugin → 插件
- build(動詞) → 建置 ；app/application → 應用程式
- state → 狀態 ；state management → 狀態管理
- async/asynchronous → 非同步 ；callback → 回呼（callback）
- dependency → 相依套件/相依性 ；render → 渲染
- layout → 版面配置 ；padding → 內距（padding）；alignment → 對齊
- composition → 組合 ；tutorial → 教學 ；example → 範例 ；documentation → 文件`

const RULES = `翻譯規則（嚴格遵守）：
1. frontmatter 只翻 title / shortTitle / description 三個值；其餘 key（sidenav, layout, js, toc, dart-tag, show-breadcrumbs 等）與其值原封不動。
2. 完整保留所有 code block(\`\`\`...\`\`\`)、inline code(\`...\`)、HTML 標籤、Jekyll/liquid 標籤({% ... %})、圖片/檔案路徑、終端指令、URL，全部不譯不動。
3. Markdown reference-style link 定義行（如 [Widget]: /ui/widgets）的 URL 不動；可見連結文字可譯。
4. 標題(##)文字可譯，保持 # 層級與既有 {:#anchor} 結構不變。
5. 繁體中文（台灣用語）；中文與半形英數之間加半形空格。
6. 技術名詞首次出現用「中文 (English)」格式。
7. 逐段對應翻譯，不新增/刪除/重排內容。
8. 已是中文的內容（若檔案部分已翻）保持並融入。
9. 【嵌入式 YAML 區塊 — 重要】<Quiz>、<SummaryCard> 等元件內部是 YAML 語法（如 question:/explanation:/title:/text: 等 key）。翻譯這些 value 時，若譯文「以引號(' 或 ")開頭」或「含半形冒號 :」或「含 # 」，必須把整個 value 用雙引號 " 包起來（value 內的反引號 \` 不需跳脫）。例：explanation: "\`autofocus\` 屬性只在初始建置時有效。" 絕對不要產生以單引號開頭但未閉合的 YAML value（會導致 build 失敗）。注意這只適用於元件內 YAML，不適用於 \`\`\` 程式碼區塊內的 Dart 字面值。`

function buildPrompt(rel) {
  const eng = `${SYNC}/${rel}`
  const ref = `${REF}/${rel}`
  return `你是 Flutter 官方文件的繁體中文（台灣）譯者。把一個英文 Markdown 文件翻成繁體中文，**直接覆寫原檔**。

英文原檔（要翻譯並覆寫）：${eng}
舊版翻譯參考（可能存在，若存在請沿用其既有譯詞與風格、只更新英文有變動處；用 Read 嘗試讀取，讀不到代表是全新頁，從頭翻）：${ref}

${GLOSSARY}

${RULES}

步驟：
1. 用 Read 讀英文原檔 ${eng}。
2. 用 Read 嘗試讀 ${ref}（讀不到就略過）。
3. 產生完整繁體中文版本（保留所有非散文結構）。
4. 用 Write 把翻譯結果完整寫回 ${eng}（覆寫）。
5. 回報結果。

注意：務必 Write 回 ${eng} 這個確切路徑。只翻譯，不要改動程式碼/路徑/連結 URL。`
}

const SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    status: { type: 'string', enum: ['ok', 'error'] },
    had_reference: { type: 'boolean' },
    notes: { type: 'string', description: '任何異常或需人工檢查處，沒有就空字串' },
  },
  required: ['file', 'status'],
}

log(`開始翻譯 ${files.length} 個 v1 檔案（Sonnet 平行）`)

const results = await parallel(files.map((rel) => () =>
  agent(buildPrompt(rel), {
    label: `tr:${rel.replace('sites/docs/src/content/', '')}`,
    phase: 'Translate',
    model: 'sonnet',
    schema: SCHEMA,
  })
))

const done = results.filter(Boolean)
const ok = done.filter((r) => r.status === 'ok')
const errs = done.filter((r) => r.status !== 'ok')
const flagged = done.filter((r) => r.notes && r.notes.trim())

log(`完成：${ok.length}/${files.length} ok，${errs.length} error，${results.length - done.length} null`)

return {
  total: files.length,
  ok: ok.length,
  error: errs.length,
  null_count: results.length - done.length,
  errors: errs.map((r) => ({ file: r.file, notes: r.notes })),
  flagged: flagged.map((r) => ({ file: r.file, notes: r.notes })),
}
