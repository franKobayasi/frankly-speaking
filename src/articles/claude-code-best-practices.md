---
title: Claude Code、AI Agents 與 SKILL 撰寫最佳實踐指南
date: 2026-03-20
author: JARVIS
tags: AI, Claude Code, Agent, SKILL, Context Engineering, 最佳實踐
summary: 本指南彙整了 Claude Code、AI Agents 與 SKILL 撰寫的最佳實踐原則
---

# Claude Code、AI Agents 與 SKILL 撰寫最佳實踐指南

> **Summary：** 本指南彙整了 Claude Code、AI Agents 與 SKILL 撰寫的最佳實踐原則，涵蓋 Context Engineering 核心概念、CLAUDE.md/AGENTS.md 撰寫規範、Sub-agent 設計模式，以及 SKILL 開發進階技巧。內容綜合 50+ 篇 Anthropic 官方文件、GitHub Blog 與社群實戰經驗。
> Author：Claude Code 官方指南
> Date：2026-03-20
> Tags：AI, Claude Code, Agent, SKILL, Context Engineering, 最佳實踐

---

## 目錄

- [一、核心心智模型：Context Engineering](#一核心心智模型context-engineering)
  - [1.1 Context Window 是稀缺資源](#11-context-window-是稀缺資源)
  - [1.2 指令遵循有極限](#12-指令遵循有極限)
  - [1.3 Progressive Disclosure 原則](#13-progressive-disclosure-原則)
- [二、CLAUDE.md（AGENTS.md）最佳實踐](#二claudeagentsmd-最佳實踐)
  - [2.1 定位與原則](#21-定位與原則)
  - [2.2 WHY / WHAT / HOW 架構](#22-why--what--how-架構)
  - [2.3 應該放入的內容](#23-應該放入的內容)
  - [2.4 不應該放入的內容](#24-不應該放入的內容)
  - [2.5 Monorepo 策略](#25-monorepo-策略)
  - [2.6 進階技巧](#26-進階技巧)
- [三、Sub-agent .md 撰寫最佳實踐](#三sub-agent-md-撰寫最佳實踐)
  - [3.1 定位與架構](#31-定位與架構)
  - [3.2 .md 檔案結構](#32-md-檔案結構)
  - [3.3 Frontmatter 欄位詳解](#33-frontmatter-欄位詳解)
  - [3.4 工具權限設計原則](#34-工具權限設計原則)
  - [3.5 Description 的撰寫技巧](#35-description-的撰寫技巧)
  - [3.6 System Prompt 撰寫原則](#36-system-prompt-撰寫原則)
  - [3.7 Routing 策略](#37-routing-策略)
  - [3.8 Pipeline 模式](#38-pipeline-模式)
  - [3.9 Memory 機制](#39-memory-機制)
  - [3.10 Skills 注入](#310-skills-注入)
  - [3.11 關鍵限制與注意事項](#311-關鍵限制與注意事項)
  - [3.12 迭代改進流程](#312-迭代改進流程)
- [四、SKILL.md 最佳實踐](#四skillmd-最佳實踐)
  - [4.1 定位與架構](#41-定位與架構)
  - [4.2 Frontmatter 寫法](#42-frontmatter-寫法)
  - [4.3 SKILL.md Body 原則](#43-skillmd-body-原則)
  - [4.4 三種 Skill Pattern](#44-三種-skill-pattern)
  - [4.5 Validation Loop Pattern](#45-validation-loop-pattern)
  - [4.6 Skill 的開發與測試流程](#46-skill-的開發與測試流程)
  - [4.7 不要在 Skill 中做的事](#47-不要在-skill-中做的事)
- [五、跨檔案的通用最佳實踐](#五跨檔案的通用最佳實踐)
  - [5.1 撰寫風格](#51-撰寫風格)
  - [5.2 迭代而非一次完成](#52-迭代而非一次完成)
  - [5.3 工具搭配策略](#53-工具搭配策略)
  - [5.4 Context 管理心法](#54-context-管理心法)
  - [5.5 CLAUDE.md vs Sub-agent .md vs SKILL.md 選擇](#55-claude-md-vs-sub-agent-md-vs-skill-md-選擇)

---

## 一、核心心智模型：Context Engineering

Context Engineering（上下文工程）是由 Andrej Karpathy 和 Shopify CEO Tobi Lütke 等人推廣的術語。如果說 Prompt Engineering 聚焦在「怎麼寫好一條指令」，Context Engineering 則是更廣義的學科——管理 LLM 在推理時看到的所有 token（包括系統 prompt、對話歷史、工具結果、記憶等），使其在每一 step 都擁有最優的上下文組合。

> **類比理解：** LLM 是 CPU，Context Window 是 RAM。Context Engineering 就像作業系統管理記憶體——決定什麼時候載入什麼資料、什麼時候釋放空間。

在深入個別檔案前，先理解一個關鍵概念：**這些檔案不是文檔，而是 Context Injection（上下文注入）檔案**。你不是在寫檔案給人看，而是在工程化地管理 LLM 的工作記憶。

### 三種檔案的分功

| 檔案類型 | 說明 | 類比 |
|----------|------|------|
| AGENT.md（CLAUDE.md / AGENTS.md） | 每次 session 都載入的全域指引 | 員工手冊 |
| Sub-Agent.md（.claude/agents/*.md） | 定義獨立 agent 角⾊的設定檔 | 各職位的 JD |
| SKILL.md（.claude/skills/*/SKILL.md） | 按需觸發的知識模組 | 工具間裡的專業手冊 |

---

### 1.1 Context Window 是稀缺資源

Context Window（上下文窗口）是 LLM 單次推理能「看到」的 token 總量上限。包括系統 prompt、CLAUDE.md 內容、對話歷史、讀取的檔案內容、工具輸出等——全部共享同一個固定大小的視窗。Claude 目前的 context window 為 **200k tokens**。

> **Token 估算：** Token ≈ 一個英文單字或 0.5–1 個中文字。200k tokens 大約等於一本 300 頁的書。

**關鍵概念：**

- **Context Pollution（上下文污染）**：當 context 中充斥無關資訊時，模型對重要指令的注意力被稀釋，效能顯著下降
- **Context Poisoning（上下文中毒）**：當幻覺或錯誤資訊進入 context 並影響後續推理
- **Context Rot**：隨著 input token 增長，模型效能逐漸退化的現象（Chroma 技術報告證實所有模型都有此現象）

**實際影響：**

- LLM 的 context window 類似 CPU 的 RAM——有限且共享
- CLAUDE.md 的每一行都會消耗 token 預算，擠壓實際工作的空間
- 一個 monorepo 的 CLAUDE.md 光系統 prompt 就佔 ~20k tokens（約 10%），剩餘 180k 才是你的工作空間

---

### 1.2 指令遵循有極限

- **Frontier thinking models** 能可靠遵循約 **150–200 條指令**
- Claude Code 的系統 prompt 本身已包含 ~50 條指令
- 隨著指令數增加，遵循品質均勻下降（不是只忽略後面的，而是全部都開始忽略）
- 指令在 prompt 邊緣（最前和最後）的遵循率最高

> **Frontier thinking models：** 指各家最頂尖、具備「思考」（extended thinking / chain-of-thought）能力的模型，如 Claude Opus、OpenAI o1/o3 等。

---

### 1.3 Progressive Disclosure 原則

Progressive Disclosure（漸進式揭露）源自 UI/UX 設計的概念，意指不一次展示所有資訊，而是根據使用者（在此為 AI agent）的當前需求，逐層提供越來越詳細的內容。在 agent context 的語境中，這解決了「context window 一次全部塞滿會稀釋注意力」的問題。

> **類比理解：** 就像一本書有目錄 → 章節摘要 → 完整內容。Agent 先看目錄決定要不要翻開某章，而不是一開始就把整本書塞進腦中。

**三層漸進式揭露架構：**

1. **Metadata 層**：名稱與描述（永遠載入，用於判斷是否相關）
2. **主檔案層**：核心指令（觸發時載入）
3. **支援檔案層**：參考文件、腳本（按需載入）

---

## 二、CLAUDE.md（AGENTS.md）最佳實踐

### 2.1 定位與原則

| 原則 | 說明 |
|------|------|
| **不是文檔** | 是 context injection file，每個 session 都會載入 |
| **刪減測試** | 對每一行問：「拿掉這行，Claude 會犯錯嗎？」否則刪除 |
| **目標行數** | 官方建議 < 200 行；HumanLayer 建議 < 60 行 |
| **不要自動產生** | /init 只是起點，自動產生的檔案優先全面性而非精簡性 |
| **不是 linter** | 程式風格交給 linter/formatter，別浪費 LLM 的指令預算 |

---

### 2.2 WHY / WHAT / HOW 架構

WHY / WHAT / HOW Pattern 是一種 CLAUDE.md 的資訊分層結構，模擬你向一位資深工程師做 onboarding 的流程——先告訴他專案目的（WHY），再說明技術棧和結構（WHAT），最後是具體的工作方式（HOW）。這個順序讓 Claude 從大局觀開始建立心智模型，而非一上來就淹沒在細節中。

```markdown
# Project Name

SaaS 文件自動化平台。TypeScript monorepo：backend (Express), frontend (React)

## Commands

npm run dev     # 啟動開發伺服器
npm run test    # 執行 Jest 測試
npm run build   # 建構生產版本

## Project Structure

src/routes/    # API 端點
src/models/     # DB models
src/handlers/  # 商業邏輯

## Conventions

- 使用 Zustand 管理狀態，絕不用 Redux
- 所有 API 回應使用 { success, data, error } 格式

## Reference Documents

### API Architecture — @docs/api-architecture.md
**Read when:** 新增或修改 API 端點
```

---

### 2.3 應該放入的內容

1. **Build / test / lint / deploy 指令**：必須精確，包含 flags 和 options
2. **與常見模式相反的架構決策**：如果你用 bun 而非 npm，要明確說
3. **「永遠不要」清單**：不要 commit .env、不要直接改 /migrations/ 等
4. **非顯而易見的陷阱**：如 test runner 需要 `--no-cache --forceExit`
5. **Compaction 存活指令**：「compact 時，永遠保留修改的檔案清單和測試指令」

---

### 2.4 不應該放入的內容

1. **程式風格指南**：交給 linter，或放在 hook 裡自動執行
2. **Claude 本來就會做對的事**：移除不會改變行為的指令
3. **人格設定**：「像資深工程師一樣思考」浪費指令預算
4. **會過時的資訊**：避免硬編碼的檔案路徑，改用能力描述
5. **過長的程式碼片段**：改用 file:line 參考指向原始碼

---

### 2.5 Monorepo 策略

Monorepo（單一倉庫）是將多個相關專案（前端、後端、共用套件等）放在同一個 Git repository 中管理的策略。Monorepo 對 CLAUDE.md 的挑戰在於：不同子專案需要不同的 context，但全部塞進 root CLAUDE.md 會爆炸。

**推薦結構：**

```
your-project/
├── CLAUDE.md              # 共享慣例（指令、專案概覽、團隊流程）
├── packages/
│   ├── frontend/
│   │   └── CLAUDE.md       # 前端特定 context
│   ├── backend/
│   │   └── CLAUDE.md       # 後端特定 context
│   └── core/
│       └── CLAUDE.md       # 核心服務 context
```

**策略原則：**

- Root CLAUDE.md 放共享慣例；子目錄放特定 context
- Claude 在子目錄工作時會同時載入 root + child
- 一個實際案例：47k 字降到 9k 字，透過拆分前後端 context
- 專業 monorepo 的 CLAUDE.md 可達 13KB，但嚴格管控每個工具的 token 配額

---

### 2.6 進階技巧

#### 使用 .claude/rules/ 目錄

Rules 目錄是 Claude Code 提供的另一個 context 載入點。與 CLAUDE.md 的差異在於：rules/ 下的每個 markdown 檔案獨立維護但自動載入，適合團隊中不同角色（前端、後端、QA）各自管理自己的規則，而不會互相踩踏。

```
.claude/
├── CLAUDE.md
└── rules/
    ├── code-style.md
    ├── testing.md
    └── security.md
```

> **注意：** rules/ 下的檔案與 CLAUDE.md 具有相同的優先級且全部自動載入，所以它不節省 token——只是組織方式更好。要節省 token 就得用 Skill 的按需載入機制。

#### 使用 Hooks 取代格式化規則

Hooks（鉤子）是 Claude Code 提供的確定性事件處理機制。可在特定事件（如檔案儲存、指令提交前後）自動執行腳本。與 CLAUDE.md 的「建議性」指令不同，Hook 是程式化執行的，100% 會觸發。

**設定 Stop hook 自動執行 formatter & linter：**

- CLAUDE.md 負責「should-do」
- Hooks 負責「must-do」

#### 迭代式改進飛輪

觀察 Claude 犯錯 → 更新 CLAUDE.md → 觀察改善 → 持續改進

**進階做法：** 用腳本分析 Claude Code 的 GHA（GitHub Actions）logs，自動找出常見錯誤模式，再據此更新 CLAUDE.md。

---

## 三、Sub-agent .md 撰寫最佳實踐

### 3.1 定位與架構

Sub-agent（子代理）是 Claude Code 中的專門化 AI 助手，每個 sub-agent 擁有獨立的 context window、自訂 system prompt、特定的工具權限。主 agent 遇到匹配的任務時會自動委派給 sub-agent，後者獨立工作後只回傳結果。這解決了「所有工作都在同一個 context 裡導致爆滿」的核心問題。

> **類比理解：** 主 agent 是專案經理，sub-agent 是各領域的專家顧問。經理把研究工作交給顧問，顧問做完後只交回一頁摘要，經理的桌面不會被堆滿。

**與 AGENTS.md 的區別：**

- AGENTS.md 是跨工具的開放標準（類似 CLAUDE.md 的定位，是全域 context 注入檔）
- Sub-agent 的 .md 是指 .claude/agents/*.md —— 定義個別 sub-agent 角色的設定檔

**存放位置與優先級：**

- 專案級：`.claude/agents/*.md`（最高優先級，可 version control 共享給團隊）
- 用戶級：`~/.claude/agents/*.md`（個人使用，跨所有專案可用）
- 同名時，專案級覆蓋用戶級

---

### 3.2 .md 檔案結構

Sub-agent 定義檔是 Markdown + YAML Frontmatter 格式：

```yaml
---
name: code-reviewer
description: Expert code review specialist. Use PROACTIVELY after code changes
to check security, style, and maintainability.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer.

When invoked:
1. Run `git diff` to identify modified files
2. Focus review on changed code paths
3. List security issues, probable false positives, and suggested fixes
4. Provide a short, prioritized action list

Return results in JSON with fields: summary, issues.
```

---

### 3.3 Frontmatter 欄位詳解

| 欄位 | 必填 | 說明 |
|------|------|------|
| `name` | 是 | 唯一識別名，用於 @agent-<name> 呼叫 |
| `description` | 是 | 觸發條件描述——Claude 據此決定何時自動委派 |
| `tools` | 否 | 工具白名單（省略則繼承主 agent 的所有工具） |
| `disallowedTools` | 否 | 工具黑名單 |
| `model` | 否 | 模型選擇：sonnet / opus / haiku / inherit（預設繼承） |
| `memory` | 否 | 記憶範圍：project / user / local |
| `skills` | 否 | 預載入的 Skill 列表（完整內容注入 sub-agent context） |

---

### 3.4 工具權限設計原則

**Least Privilege（最小權限）：** 每個 sub-agent 只應被授予完成其任務所需的最少工具。這不只是安全考量——減少可用工具也減少了 agent 的「動作空間」，讓它更聚焦、更少犯錯。

**常見的工具權限模式：**

| Agent 類型 | 工具權限 |
|------------|----------|
| Read-only agents（審查者、稽核者） | Read, Grep, Glob |
| Research agents（分析師、研究者） | Read, Grep, Glob, WebFetch, WebSearch |
| Code writers（開發者） | Read, Write, Edit, Bash, Glob, Grep |
| Documentation agents（文件撰寫者） | Read, Write, Edit, Glob, Grep, WebFetch, WebSearch |

> **MCP 工具權限：** 如果 sub-agent 需要使用 MCP server 的工具，必須在 tools 欄位中明確授權。

---

### 3.5 Description 的撰寫技巧

Description 是 Claude 決定何時自動委派的唯一依據，與 SKILL.md 的 description 同等關鍵：

```yaml
# 壞——太模糊，Claude 不知道何時委派
description: Helps with code review

# 好——具體觸發條件 + 稍微積極
description: >
  Expert code review specialist. Use PROACTIVELY after
  writing or modifying code to check for security vulnerabilities,
  code style issues, and maintainability concerns.
```

**進階技巧：** 在 description 中加入觸發範例：

```yaml
description: >
  Reviews code for quality and best practices.
  Examples:
    Context: User just finished implementing a feature.
    user: 'Can you review my changes?'
    assistant: 'Let me use the code-reviewer agent.'
```

---

### 3.6 System Prompt 撰寫原則

Frontmatter 之後的 Markdown 內容就是 sub-agent 的 system prompt——它完全取代 Claude Code 的預設 system prompt。

**關鍵原則：**

1. **角色定義要具體**：不是 "You are helpful"，而是 "You are a senior code reviewer with expertise in security, performance, and best practices"
2. **給明確的工作流程**：列出步驟，但保持彈性（避免 railroading）
3. **指定輸出格式**：如 "Return results in JSON with fields: summary, issues"，方便主 agent 解析
4. **包含正面和負面範例**：LLM 擅長模式識別，範例比規則描述更有效
5. **CLAUDE.md 仍然生效**：sub-agent 的 system prompt 取代預設 prompt，但 CLAUDE.md 和 project memory 仍然透過正常訊息流載入

---

### 3.7 Routing 策略

**Routing（路由）：** 主 agent 決定「把什麼任務交給哪個 sub-agent、以什麼順序」的策略。沒有明確的路由規則，主 agent 只能猜——而且經常猜錯。

**建議將路由規則寫在 CLAUDE.md 中：**

```markdown
## Sub-Agent Routing Rules

**Parallel dispatch（平行）**——所有條件都須滿足：
- 3+ 個無關任務或獨立領域
- 任務之間無共享狀態
- 清楚的檔案邊界，無重疊

**Sequential dispatch（序列）**——任一條件觸發：
- 任務有依賴關係（B 需要 A 的輸出）
- 共享檔案或狀態（合併衝突風險）
- 範圍不清楚（需要先理解才能繼續）

**Background dispatch（背景）：**
- 研究或分析任務（不修改檔案）
- 結果不阻塞當前工作
```

---

### 3.8 Pipeline 模式

Pipeline（管線）是將多個 sub-agent 串聯成一條生產線，每個 agent 處理一個階段，透過 hooks 自動觸發下一個。類似軟體工廠的流水線。

**實際案例（PubNub 團隊）：**

```
pm-spec         → 讀需求、寫規格、問釐清問題、設狀態 READY_FOR_ARCH
                ↓
architect-review → 驗證設計、考慮效能/成本、產出 ADR、設狀態 READY_FOR_BUILD
                ↓
implementer     → 根據規格實作、寫測試、驗證
```

---

### 3.9 Memory 機制

Sub-agent 可配置 memory 欄位，讓它跨 session 累積知識：

```yaml
---
name: code-reviewer
description: Reviews code for quality and best practices
memory: project
---

You are a code reviewer. As you review code, update your agent memory
with patterns, conventions, and recurring issues you discover.
```

**Agent Memory：** sub-agent 的持久記憶系統。配置後，sub-agent 的 system prompt 會自動包含讀寫 MEMORY.md 的指令，以及前 200 行的現有記憶內容。

**三種範圍：**

- `project`（可 version control 共享）
- `user`（跨專案個人記憶）
- `local`（不進版控）

> **推薦：** 預設用 project ——讓 sub-agent 的學習成果可以透過 Git 與團隊共享。

---

### 3.10 Skills 注入

Sub-agent 可透過 skills 欄位預載 Skill 的完整內容：

```yaml
---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---

Implement API endpoints. Follow the conventions and patterns
from the preloaded skills.
```

列出的 Skill 完整內容會在啟動時注入到 sub-agent 的 context 中——sub-agent 不需要自己去找這些 Skill，它們已經被載入。

---

### 3.11 關鍵限制與注意事項

1. **無計劃模式**：sub-agent 目前不支援逐步計劃，接到任務就立即開始執行
2. **無中途對話**：你不能在 sub-agent 運行中問它問題或調整方向——是黑盒執行，完成後才能看到結果
3. **狀態丟失**：如果你拒絕 sub-agent 的結果，主 agent 會派生全新的 sub-agent，之前的 context 消失
4. **Context 隔離的雙面性**：隔離保護主 context 不被污染，但也意味著 sub-agent 無法看到主對話的完整脈絡
5. **模型切換的成本**：如果 sub-agent 用不同模型（如從 Opus 切到 Haiku），需要重建 prompt cache，可能比沿用同一模型更貴

---

### 3.12 迭代改進流程

Sub-agent 的 .md 檔是可 version control 的，這使得系統性改進成為可能：

1. **觀察失敗**：sub-agent 做錯了什麼？
2. **提供結構化 context**：告訴 Claude「sub-agent 做了 X，但應該做 Y」
3. **傳入 .md 檔**：讓 Claude 分析並建議修改
4. **更新並 commit**：每次改進都有 audit trail

這讓 sub-agent 隨時間變得越來越專精——特別是當開發者主動辨識工作流程中的失敗點，並提供結構化 context 給 Claude 來改進時。

---

## 四、SKILL.md 最佳實踐

### 4.1 定位與架構

Skill 是 Claude 的漸進式揭露擴展系統。

**Skill（技能）** 是 Claude 的可組合知識模組。與 CLAUDE.md（每次都載入的全域 context）不同，Skill 是按需觸發的——啟動時只載入 name 和 description 到系統 prompt，只有當 Claude 判斷某個 Skill 與當前任務相關時，才會讀取完整的 SKILL.md 內容。這使得你可以擁有大量 Skill 而不會爆掉 context window。

> **類比理解：** CLAUDE.md 是入職第一天就發的員工手冊（永遠帶在身上）；Skill 是工具間裡的專業工具（知道它在哪裡，需要時才去拿）。

**Skill 目錄結構：**

```
my-skill/
├── SKILL.md          # 核心 prompt（必要）
├── scripts/          # 可執行腳本（按需執行）
├── references/       # 參考文件（按需載入 context）
└── assets/          # 模板、圖示（用於輸出）
```

---

### 4.2 Frontmatter 寫法

YAML Frontmatter 是 Markdown 檔案最上方用 `---` 包裹的 YAML 格式 metadata 區塊。在 SKILL.md 中，frontmatter 是 Claude 判斷「要不要載入這個 Skill」的唯一依據——它被注入到系統 prompt 中，而 body 內容只在觸發後才讀取。

> **這就是為什麼 description 的品質至關重要：** 寫得不好 = Claude 不會觸發你的 Skill = 等於沒寫。

**Name 規則：**

- 使用動名詞形式（gerund）：`pdf-processing`、`commit-formatting`
- 只能使用小寫字母、數字和連字符號

**Description 規則（最關鍵的部分）：**

- 這是**觸發器**，不是摘要——寫的時候想「什麼時候該啟動？」
- 永遠用第三人稱：「Processes Excel files」而非「You can use this to…」
- 包含具體的觸發詞和場景
- Claude 有「under-trigger」傾向，所以描述要稍微積極一點

```yaml
# 壞的描述
description: This skill helps with PDFs and documents.

# 好的描述
description: >
  Comprehensive PDF manipulation toolkit for extracting text and tables,
  creating new PDFs, merging/splitting documents, and handling forms.
  Use when working with PDF files or when the user mentions PDFs,
  forms, or document extraction.
```

---

### 4.3 SKILL.md Body 原則

1. **只加 Claude 不知道的東西**：Claude 已經很聰明，挑戰每條資訊的必要性
2. **保持 < 500 行**：超過就拆分到 references/
3. **結構清晰**：overview → prerequisites → execution steps → examples → error handling
4. **包含具體範例**：展示正確的輸入輸出
5. **指定不能做的事**：管理期望，防止誤用

---

### 4.4 三種 Skill Pattern

**選擇 Pattern 的決策原則：**

- Claude 的語言判斷力足以完成嗎？ → Pattern A
- 如果需要確定性的計算或驗證 → Pattern B
- 如果需要大量領域知識 → Pattern C
- 有疑問時從 A 開始，之後再演進

**Pattern A：純指令型（Claude 的判斷力足以完成）**

```yaml
---
name: commit-formatting
description: Format commit messages following Conventional Commits 1.0.0.
---

# Commit Message Formatter

## Format
<type>(<scope>): <description>

## Rules
- Imperative mood, lowercase, no period, max 72 chars
- Breaking changes: add `!` after type/scope

## Example
Input: "added user auth with JWT"
Output: `feat(auth): implement JWT-based authentication`
```

**Pattern B：指令 + 腳本型（需要確定性的資料處理）**

```
data-analysis-skill/
├── SKILL.md
└── scripts/
    ├── analyze.py
    └── validate_schema.js
```

**Pattern C：指令 + 參考文件型（需要領域知識）**

```
pdf/
├── SKILL.md              # 主要指令 + 目錄
├── FORMS.md              # 表單填寫指南（按需載入）
├── reference.md          # API 參考（按需載入）
└── examples.md           # 使用範例（按需載入）
```

---

### 4.5 Validation Loop Pattern

**Validation Loop（驗證迴圈）** 在 Skill 流程中嵌入「執行 → 驗證 → 修正 → 再驗證」的循環模式。這借鑑了 TDD（測試驅動開發）的概念，但應用在 agent 的工作流程中——讓 Claude 不只是「做完就算」，而是每一步都有確定性的品質關卡。

> **為什麼有效？** LLM 擅長創造但容易忽略邊界情況。驗證腳本是確定性的程式碼，能精確捕捉 LLM 的疏忽。兩者結合 = 創造力 + 嚴謹性。

**在 Skill 中嵌入驗證迴圈：**

```markdown
## 處理流程

1. 進行編輯
2. **立即驗證**: `python scripts/validate.py output_dir/`
3. 如果驗證失敗：
   - 仔細閱讀錯誤訊息
   - 修正問題
   - 重新驗證
4. **只有驗證通過才繼續**
```

> **技巧：** 讓驗證腳本的錯誤訊息盡可能詳細具體，如：`"Field 'signature_date' not found. Available fields: customer_name, order_total, signature_date_signed"`

---

### 4.6 Skill 的開發與測試流程

**雙 Claude 迭代法（Claude A/B Testing）：**

Anthropic 官方推薦的 Skill 開發模式。用兩個獨立的 Claude 實例分工：

1. **Claude A（專家）**：幫你撰寫和改進 SKILL.md
2. **Claude B（使用者）**：用真實任務測試 Skill

**循環：** Claude A 寫 Skill → Claude B 使用 → 觀察行為 → 回到 Claude A 改進

> **為什麼不能只用一個 Claude 測試？** 因為寫 Skill 的 Claude 已經有完整 context，它可能「作弊」地做對了——但真正使用 Skill 的 Claude 沒有這些 context，所以行為可能完全不同。

**測試用的 prompt 要像真人說話：**

```markdown
# 好的測試 prompt（貼近真實）
「老闆剛寄了一個 XLSX（在 Downloads 裡，叫什麼 Q4 sales final FINAL v2.xlsx），
她要我加一欄利潤率百分比，revenue 在 column C，costs 在 column D 好像」

# 壞的測試 prompt（太乾淨）
"Please analyze the sales data in the uploaded Excel file and add a profit margin column"
```

---

### 4.7 不要在 Skill 中做的事

- **不要陳述顯而易見的事**：聚焦在推動 Claude 偏離預設行為的指令
- **不要寫死步驟**：給目標和約束，而非逐步指令
- **不要包含會過時的資訊**：避免日期相關的條件邏輯
- **不要重複 Claude 已知的知識**：例如不需要解釋什麼是 win rate

---

## 五、跨檔案的通用最佳實踐

### 5.1 撰寫風格

| 做 | 不做 |
|----|------|
| 子彈點和短句 | 長段落 |
| 具體的指令 | 模糊的描述 |
| 一個真實的程式碼片段 | 三段文字解釋 |
| 用範例展示邊界 | 只用「不要做 X」 |
| 指向檔案而非複製內容 | 把程式碼片段嵌入 |

---

### 5.2 迭代而非一次完成

1. **起點最小化**：先寫最關鍵的幾行
2. **第二次看到同樣錯誤才加規則**：不要預防性地加
3. **讓 Claude 幫忙演進**：遇到 TypeScript 錯誤後，請 Claude 更新檔案
4. **定期審查和刪減**：如果 Claude 已經在沒有某指令的情況下做對了，刪除它

---

### 5.3 工具搭配策略

以下展示 Claude Code 生態中各種工具的分功定位。核心思想：**把確定性的工作交給確定性工具，只把需要判斷力的工作留給 LLM。**

| 工具 | 用途 |
|------|------|
| **CLAUDE.md / AGENTS.md** | 「should-do」指引（軟性，LLM 可能偶爾忽略） |
| **Hooks** | 「must-do」規則（硬性，程式化執行，100% 觸發） |
| **Linter / Formatter** | 程式風格（完全確定性，如 ESLint、Prettier、Biome） |
| **Skills** | 領域知識和專業化流程（按需載入的知識模組） |
| **Slash Commands** | 常用 prompt 的捷徑（如 /pr、/catchup） |
| **Sub-agents** | Context 隔離和平行處理（獨立 context window） |

---

### 5.4 Context 管理心法

- **Compaction（壓縮）**：當 context window 接近上限時，Claude Code 會自動（或手動觸發）將對話內容摘要壓縮，釋放空間繼續工作。風險在於自動壓縮可能丟掉重要細節。
- **Sub-agent（子代理）**：Claude Code 可以派生獨立的子 agent，各自擁有自己的 context window 處理子任務。主要好處是 context 隔離——子 agent 的研究過程不會汙染主 context，主 agent 只拿到最終結果。代價是 token用量可能多 15 倍。

**實用技巧：**

- 一個任務一個 session：不同任務之間用 `/clear`
- 失敗兩次就重來： `/clear` 後用更好的初始 prompt
- 複雜任務寫計劃到檔案： plan.md 作為跨 session 的工作記憶（「Document & Clear」模式）
- 手動 compact 在 50% 時：避免自動 compaction 的不可控
- 用 sub-agent 做研究：不要讓探索任務汙染主 context

---

### 5.5 CLAUDE.md vs Sub-agent .md vs SKILL.md 選擇

| 需求 | 建議 |
|------|------|
| 全專案通用的慣例和指令 | CLAUDE.md |
| 特定領域的專業化角色（獨立 context） | Sub-agent .md（.claude/agents/） |
| 可重用的知識模組（按需載入） | SKILL.md（.claude/skills/） |
| 確定性的事件攔截和自動化 | Hooks |
| 常用 prompt 的快捷方式 | Slash Commands / Skills |

---

## 參考來源

本指南綜合以下 50+ 篇來源整理而成：

**官方文件：**

- Best Practices for Claude Code — Anthropic
- Skill authoring best practices — Anthropic
- Using CLAUDE.MD files — Anthropic
- How to create Skills for Claude — Anthropic
- Effective context engineering for AI agents — Anthropic

**GitHub / AGENTS.md 生態：**

- How to write a great agents.md — GitHub Blog
- AGENTS.md Official Site — agents.md

**深度指南與實戰：**

- Writing a good CLAUDE.md — HumanLayer
- How to Write a Good CLAUDE.md File — Builder.io
- How to Write a CLAUDE.md That Actually Works — TurboDocx

**Context Engineering 理論：**

- Context Engineering — LangChain
- Context Engineering Guide — Prompt Engineering Guide
