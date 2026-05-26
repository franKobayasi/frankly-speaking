---
title: Claude Code 新一代 Workflow 全解析：Ultrareview、Ultraplan、Routines 與 Agent Teams
date: 2026-05-26
author: Frank Lin
tags:
  - Claude Code
  - AI Agent
  - Developer Tools
  - Workflow Automation
summary: 系統性解析 Claude Code 最新的 workflow 功能——Ultrareview、Ultraplan、Routines、Agent Teams 與 /goal——涵蓋核心概念、使用方式與適用場景，幫助開發者理解這些新能力能如何提升研發效率。
---

Claude Code 在 2026 年快速演進，除了持續優化的核心功能，更推出了一系列讓人眼睛一亮的新工作流程。這篇文章聚焦在五個最具代表性的新能力：**Ultrareview**、**Ultraplan**、**Routines**、**Agent Teams** 與 **`/goal`**。

我不是官網文件，我是一個實際用它們解決問題的工程師。以下是我的理解。

---

## 1. Ultrareview：雲端多Agent程式碼審查

**Ultrareview** 是一個深度程式碼審查工具，透過在雲端沙盒中啟動一群審查 Agent 來找出 Bugs。

### 核心差異：/review vs Ultrareview

傳統的 `/review` 在本地 Session 執行，是單一模式、速度較快。而 Ultrareview 的做法完全不同：在你的 PR 或 Branch 上，同時啟動多個 Agent 平行探索程式碼，每個發現都會被獨立的驗證 Agent 再次確認，最後只回傳**已驗證的 Bugs**。

| | `/review` | Ultrareview |
|--|-----------|------------|
| 執行位置 | 本地 Session | 雲端沙盒 |
| 深度 | 單次審查 | 多Agent fleet + 獨立驗證 |
| 時間 | 秒級到幾分鐘 | 約 5-10 分鐘 |
| 成本 | 一般用量 | 3次免費，之後約 $5-20/次 |
| 適用時機 | 快速回饋 | 重大變更前的信心建立 |

### 如何使用

```bash
# 審查當前分支與預設分支的差異
/ultrareview

# 審查特定 PR
/ultrareview 1234
```

Ultrareview 有三個免費額度（Pro/Max 帳戶），之後按用量計費。每個發現都附有檔案位置與問題說明，你可以直接要求 Claude 修復。

### 適合的使用情境

- 需要合併一個stantial 的功能分支
- 重構影響多個元件
- 接手不熟悉的 Codebase
- 重要 release 前的最後把關

---

## 2. Ultraplan：雲端規劃，本地執行

**Ultraplan** 的核心用法是：把你的規劃任務交給雲端 Session，Claude 在雲端完成詳細規劃，你在瀏覽器中審查、提問、修訂，批准後再決定要雲端執行或跳回本地終端機執行。

### 為什麼需要它？

傳統 `/plan` 在本地執行，輸出格式受限，審查體驗不好。Ultraplan 解決了三件事：

1. **Terminal 保持空閒**：規劃在雲端跑，本地可以繼續其他工作
2. **瀏覽器審查**：可以對規劃的每個章節分行评论、打 emoji 表達意見
3. **彈性執行**：批准後可以在雲端完成，或跳回本地終端

### 三種觸發方式

```bash
# 方式一：直接指令
/ultraplan migrate the auth service from sessions to JWTs

# 方式二：在 prompt 中包含 ultraplan 關鍵字
#「我想 migrat the auth service to JWTs — ultraplan」

# 方式三：本地 plan 完成後，選擇「No, refine with Ultraplan on the web」
```

### 執行方式的選擇

批准計劃後，你可以選擇：

- **在 Web 上執行**：雲端完成直接開 PR
- **發回本地終端**：下載計劃，在本地有完整環境存取權的情況下執行

---

## 3. Routines：讓 Claude 排程自動化

**Routines** 是把 Claude Code 變成自動化助理的關鍵功能。你可以定義一個 Routine（包含 Prompt、程式碼存放位置、 connectors），然後設定觸發條件——排程、API 呼叫、或 GitHub 事件。

### 三種觸發類型

| 觸發類型 | 說明 |
|---------|------|
| **Schedule** | 每小時、每天、每週、或自訂 cron 表達式 |
| **GitHub** | PR opened、PR merged、Release published 等 |
| **API** | 對 per-routine 端點發送 HTTP POST |

### 實際應用範例

**Backlog maintenance**：每個工作日晚上執行，自動標記問題、分配負責人、Slack 回報。

**Alert triage**：當監控系統偵測到 error threshold 被突破，自動拉取 stack trace、關聯最近 commits、開發 draft PR。

**PR review chatbot**：GitHub trigger，在每一次 PR opened 時自動套用團隊審查清單、留 inline comments。

**Deploy verification**：CD pipeline 觸發 routine，執行 smoke test、掃描 error logs，發布 go/no-go 到 release channel。

### 建立方式

```bash
# CLI 建立排程 Routine
/schedule daily PR review at 9am

# 或在 Web UI 建立
# 訪問 claude.ai/code/routines
```

Routines 執行於 Anthropic 管理的雲端基礎設施，所以你的筆電關機也能跑。

---

## 4. Agent Teams：多 Agent 協作開發

**Agent Teams** 讓你可以協調多個 Claude Code 实例同時工作一個共享任務。每個成員有自己獨立的 Context Window，可以互相傳訊、共同協作。

### 與 Subagents 的核心差異

Subagents 只回傳結果給主要的 Caller，彼此不對話。Agent Teams 成員之間可以直接通訊，共享任務清單、自我分工。

| | Subagents | Agent Teams |
|-----------|-----------|
| Context | 隔離，結果摘要回 Caller | 各自獨立，可以互相傳訊 |
| 通訊 | 只 report 回 main agent | 成員間直接訊息溝通 |
| 協調方式 | Main agent 管理所有工作 | 共享 task list + 自我協調 |
| Token 成本 | 較低 | 較高（每個成員都是獨立 Claude 实例） |

### 適合的使用情境

- **研究與審查**：多個成員同時調查不同面向，最後彙整
- **新模組或功能開發**：每個成員獨立擁有不同區塊
- **Debugging 假設競合**：多個成員平行測試不同理論，收斂更快
- **跨層級變更**：front-end、back-end、tests 各由不同成員負責

### 啟動方式

```bash
# 需要先啟用 experimental flag
# 在 settings.json 中加入：
# { "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }

# 描述任務與團隊結構
I'm designing a CLI tool that tracks TODO comments across codebase.
Create an agent team: one teammate on UX,
one on technical architecture, one playing devil's advocate.
```

---

## 5. /goal：讓 Claude 自己判斷何時完成

**`/goal`** 是我最喜歡的功能之一。它讓你設定一個完成條件，Claude 在每個 Turn 以後自動檢查條件是否滿足，沒滿足就繼續執行，不需要你每個 Turn 都輸入指令。

### 核心機制

`/goal` 在每個 Turn 結束後，一個單獨的 fast model 會檢查條件是否滿足。如果沒滿足，Claude 自動開始下一個 Turn，而不是把控制權還給你。

```bash
# 設定目標
/goal all tests in test/auth pass and the lint step is clean

# 檢查狀態
/goal

# 清除目標
/goal clear
```

### 有效的 condition 怎麼寫？

條件需要是 Claude 的輸出能夠證明的。例如：

- ✅ `all tests in test/auth pass and the lint step is clean`
- ✅ `the migration script runs without errors`
- ❌ `the database schema is correct`（Claude 無法自己驗證這個）

### 與其他自動化模式的比較

| 模式 | 觸發下一個 Turn 的時機 | 停止時機 |
|------|----------------------|---------|
| `/goal` | 前一個 Turn 結束 | Model 斷定條件滿足 |
| `/loop` | 時間間距經過 | 你停止，或 Claude 判定工作完成 |
| Stop Hook | 前一個 Turn 結束 | 你的腳本或 prompt 決定 |

`/goal` 和 Stop hook 都是每 turn 觸發，但 `/goal` 是 session 作用域的捷徑，Stop hook 則寫入設定檔、適用於所有 sessions。

---

## 這些功能之間的關係

簡單來說，這些功能構成一個完整的「AI 賦能開發工作流程」：

```
日常開發：/goal（持續目標） + /review（快速審查）
    ↓
重大變更：Ultraplan（雲端規劃） → Ultrareview（雲端審查）
    ↓
自動化：Routines（排程/事件觸發）
    ↓
複雜協作：Agent Teams（多 Agent 平行開發）
```

---

## 我的使用建議

一個實務建議：如果你是個人開發者或小型團隊，不必全部用上。從最實用的開始：

1. **`/goal`**：任何需要多個步驟完成的任務，先設 goal。節省你反覆輸入指令的時間。
2. **Ultrareview**：重大 PR merges 前跑一次，5-10 分鐘換一個安心。
3. **Ultraplan**：複雜重構或遷移專案，用它做詳細規劃。
4. **Routines**：適合團隊有標準化流程的，例如每晚的測試、每週的 dependency audit。
5. **Agent Teams**：實驗性功能，一般開發場景 Subagents 已經足夠。

---

## 總結

Claude Code 的這些新 Workflow 功能，代表 AI 輔助開發正在從「回應指令」走向「自主持續工作」。`/goal` 和 Routines 讓 Claude 能自己判斷完成時機；Ultrareview 和 Ultraplan 把重負擔工作移到雲端；Agent Teams 讓複雜問題可以用多 Agent 協作處理。

這些能力的出現，正在改變「人與 AI 協作」的定义——從「你說他做」，到「你定目標，他持續推進直到達成」。
