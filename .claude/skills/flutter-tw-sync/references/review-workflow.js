export const meta = {
  name: 'flutter-tw-review',
  description: 'Review translated Flutter docs for accuracy/readability/links vs English source',
  phases: [{ title: 'Review', detail: 'one Sonnet agent per file, parallel' }],
}

const files = Array.isArray(args) ? args : JSON.parse(args)
// Worktree path created in Step 1 of the skill (a git worktree of this repo,
// so it shares the object store and can resolve `official/main` directly).
const SYNC = '/tmp/fw-sync'

function buildPrompt(rel) {
  const zh = `${SYNC}/${rel}`
  return `你是 Flutter 繁體中文（台灣）文件的審查者。審查一個已翻譯檔的「準確性、可讀性、連結」。

繁中譯檔：${zh}
取得對應英文原文：用 Bash 執行 \`git -C ${SYNC} show "official/main:${rel}"\`

審查三面向（只回報「真正的問題」，不要吹毛求疵、不要為了湊數）：
1. 準確性：對照英文原文，是否有誤譯、語意相反、數字/版本/API 名稱錯誤、漏譯整段、自行新增原文沒有的內容。
2. 可讀性：是否有不通順的中文、生硬直譯、術語不一致（Widget=元件、package=套件、plugin=插件、build=建置）、整句英文殘留、中英文間缺半形空格、標題/列表斷裂。
3. 連結：可見連結文字是否合理；明顯壞掉的連結語法（如 [文字][label] 但無對應定義、URL 被誤譯）。

規則：
- 程式碼區塊、frontmatter key、檔名、指令、URL 路徑本來就不該翻譯 → 不是問題。
- 技術名詞保留英文或「中文 (English)」格式 → 不是問題。
- 只回報 severity high/medium 的真問題；low 的細節可略。
- 每個問題給：類型(accuracy/readability/link)、位置(行號或章節)、簡述、建議修法。

回報這個檔的審查結果。`
}

const SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    ok: { type: 'boolean', description: '無 high/medium 問題則 true' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['accuracy', 'readability', 'link'] },
          severity: { type: 'string', enum: ['high', 'medium'] },
          location: { type: 'string' },
          desc: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['type', 'severity', 'desc'],
      },
    },
  },
  required: ['file', 'ok'],
}

log(`審查 ${files.length} 個檔（Sonnet 平行）`)

const results = await parallel(files.map((rel) => () =>
  agent(buildPrompt(rel), {
    label: `rev:${rel.replace('sites/docs/src/content/', '')}`,
    phase: 'Review',
    model: 'sonnet',
    schema: SCHEMA,
  })
))

const done = results.filter(Boolean)
const withIssues = done.filter((r) => r.issues && r.issues.length)
const allIssues = []
for (const r of withIssues) for (const i of r.issues) allIssues.push({ file: r.file, ...i })
const high = allIssues.filter((i) => i.severity === 'high')

log(`完成：${done.length}/${files.length} 審完，${withIssues.length} 檔有問題，${high.length} 個 high`)

return {
  total: files.length,
  reviewed: done.length,
  files_with_issues: withIssues.length,
  high_count: high.length,
  medium_count: allIssues.length - high.length,
  high_issues: high,
  medium_issues: allIssues.filter((i) => i.severity !== 'high'),
}
