---
title: Claude Code Dynamic Workflows 深度解析：當 AI 學會自己寫「軍團作戰計畫」
date: 2026-06-02
author: Frank Lin
tags:
  - Claude Code
  - AI Agent
  - Dynamic Workflows
  - Anthropic
  - LLM Orchestration
summary: 解析 Anthropic 2026-05-28 隨 Opus 4.8 發布的 Dynamic Workflows——它如何讓 Claude 自己寫 JavaScript 編排腳本，調度數十到數百個 subagent 平行協作，並與 Skill、Subagent、Agent team 做出明確區隔。
---

過去一年，Claude Code 從「對談式助手」一路演進到 Subagent、Skill、Agent team，但 Anthropic 在 2026-05-28 推出了一個**本質上不同**的新功能：**Dynamic Workflows**。

它的官方宣告很直白——

> "Work you'd normally plan in quarters now finishes in days. Claude dynamically writes orchestration scripts that run tens to hundreds of parallel subagents in a single session, checking its work before anything reaches you."
> — [Introducing dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)

這篇文章，我會把這個功能的「它是什麼、怎麼運作、和過去工具有什麼差」一次講清楚。實戰面的決策與成本分析，留到第二篇。

## 什麼是 Dynamic Workflows？

Dynamic Workflows 是 Claude Code 在 v2.1.154 版本新增的 **Research Preview** 功能，與 Claude Opus 4.8 同步發布。它的核心定義在官方文檔中只有一句話：

> "A dynamic workflow is a JavaScript script that orchestrates subagents at scale. Claude writes the script for the task you describe, and a runtime executes it in the background while your session stays responsive."
> — [code.claude.com/docs/en/workflows](https://code.claude.com/docs/en/workflows)

把這句話拆開來看，會得到三個關鍵詞：

- **JavaScript script**：整個編排邏輯不是寫在 prompt 裡，而是寫成可讀、可改、可重跑的 JS 腳本。
- **Claude writes**：腳本由 Claude 動態生成，根據你的任務描述量身打造。
- **Background runtime**：執行在背景的 runtime 中，你的主 session 不會被卡住。

一句話濃縮：**把「做事計畫」從 Claude 的腦中搬進程式碼**。

## 為什麼這個功能值得關注？

在 Dynamic Workflows 出現之前，Claude Code 的多步驟任務仰賴三種工具：Subagent、Skill、Agent team。它們的共同特徵是**Claude 自己當指揮官**——每一輪對話決定下一步派誰、做完之後把結果塞回 context window 繼續推理。

這個模式有個根本限制：**當任務需要的代理人數量超過一個對話視窗能協調的程度時，品質就會崩潰**。例如：

- 在 500 個檔案裡找所有 auth 漏洞
- 把整個 framework 從 Vue 2 升級到 Vue 3
- 從數十個來源交叉驗證一個研究問題
- 為一個架構決策草擬多份獨立提案再互評

這些任務的共同點是：**需要「軍團級」的平行協作，而且每一步都不能出錯**。

Dynamic Workflows 把指揮權交給了「腳本」。Claude 寫好腳本後，runtime 就在背景照表操課，Claude 主 session 只負責最後給你看結果。這就是官方說的「**moves the plan into code**」。

## 運作原理：四個角色，一個迴圈

理解 Dynamic Workflows 的關鍵，是把它的執行模型拆成四個角色：

```
┌──────────────────────────────────────────────────┐
│  1. 你（使用者）                                  │
│     描述任務、給出觸發指令                          │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  2. Claude（規劃者）                              │
│     動態生成 JavaScript orchestration script      │
│     script 定義：分幾個 phase、每個 phase 派幾個     │
│     agent、agent 之間怎麼傳結果、失敗怎麼處理        │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  3. Runtime（背景執行環境）                         │
│     讀 script → 平行派 spawn subagents            │
│     把 intermediate result 存在 script 變數中      │
│     支援 resumable（同 session 暫停後可接續）      │
└──────────────────┬───────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│  4. Subagents（執行單位）                          │
│     每個 agent 讀檔、寫檔、跑 shell、查資料          │
│     完成的結果回到 runtime 的變數中                  │
└──────────────────────────────────────────────────┘
                   ▼
              回傳給 Claude 整理、最終報告給你
```

**關鍵設計**：intermediate result 不再擠進 Claude 的 context window，而是存在 **script 變數** 裡。這意味著即使有 100 個 agent 同時跑，Claude 的 context 也不會被洗版。

另一個關鍵設計是**自我檢查機制**：script 可以安排「獨立驗證 agent」去 review 其他 agent 的發現——例如先派 10 個 agent 找 bug，再派 3 個 agent 專門去挑戰那些「找到的 bug 是否真的成立」。官方把這個模式稱為「adversarial review」，在對成本敏感、對正確性要求高的任務上特別有用。

## 與 Skill、Subagent、Agent team 的差異

這是很多人最困惑的地方。官方文檔其實給了一張很清楚的比較表，我直接忠實翻譯並加上白話註解：

| 比較維度 | **Subagents** | **Skills** | **Agent teams** | **Dynamic Workflows** |
|---|---|---|---|---|
| **它是什麼** | Claude 生成的工人 | Claude 遵循的指令集 | 一個 lead agent 監督對等 session | Runtime 執行的腳本 |
| **下一步由誰決定** | Claude，每輪決定 | Claude，照 prompt 執行 | Lead agent，每輪決定 | **腳本** |
| **中間結果存在哪** | Claude 的 context window | Claude 的 context window | 共享的 task list | **Script 變數** |
| **可重複的部分** | Worker 定義本身 | 指令本身 | Team 定義本身 | **整個編排本身** |
| **規模** | 每輪幾個委派任務 | 同 Subagent | 少量長期 peers | **每次 run 數十到數百 agent** |
| **中斷後** | 重新開始該輪 | 重新開始該輪 | Peers 繼續跑 | **同 session 可 resumable** |

*資料來源：[code.claude.com/docs/en/workflows](https://code.claude.com/docs/en/workflows)*

把這張表濃縮成一句話：

> **Subagent 和 Skill 是「Claude 自己當工頭」；Agent team 是「Claude 派一個工頭當工頭」；Dynamic Workflow 是「把工頭的工作寫成 SOP，交給另一個執行室跑」。**

**規模差異是最實用的判斷依據**：

- Subagent / Skill：同一輪對話裡派幾個任務
- Agent team：少量（個位數）長期運作的對等 agent
- Dynamic Workflow：**數十到數百**個 agent 在同一個 run 裡平行跑

## 如何觸發 Dynamic Workflow？

官方提供三條路徑，由淺入深：

### 路徑一：用內建 workflow 先體驗

`/deep-research` 是 Claude Code 預設內建的工作流，會自動展開多角度網搜、交叉查證、產出引用報告。

```bash
/deep-research Node.js v20 到 v22 權限模型改了什麼？
```

這是上手成本最低的方式——你只要問問題，workflow 自己會安排 agent 跑。

### 路徑二：直接要求 Claude 創建

在 prompt 中明確說「Create a workflow」即可：

```text
幫我對 src/ 目錄做一次完整的安全稽核，
找出所有 input validation 不充分的地方。
（Create a workflow）
```

第一次觸發時，Claude Code 會**顯示即將跑的內容並請求你確認**（這是研究預覽的保護機制），批准後就會在背景跑。

### 路徑三：開啟 ultracode 自動觸發

進入 `/effort` 選單，選 **ultracode**：

- 自動把 effort 設為 `xhigh`
- Claude 會**自己判斷**什麼時候適合啟動 workflow，不需要你明確說「Create a workflow」

這是最低摩擦的使用方式，但成本也最高（後面談）。

**注意一個重要更新**：在 **v2.1.160**（2026-06-02 發布）的 release notes 中，Anthropic 把動態觸發的關鍵字從 `workflow` 改成 `ultracode`。2.1.154-2.1.159 期間「workflow」仍會觸發；更新到 v2.1.160 之後，直接打「workflow」這個詞**不會**觸發——要用 ultracode 設定，或用自己的話描述任務。

## 它能做什麼？官方案例

最震撼的案例是 **Bun 從 Zig 移植到 Rust**：

> "Jarred Sumner used dynamic workflows to port Bun from Zig to Rust with 99.8% of the existing test suite passing, roughly 750,000 lines of Rust, and eleven days from first commit to merge."
> — [claude.com/blog/.../dynamic-workflows](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)

整個流程由三個 workflow 串成：

1. **對應 workflow**：替 Zig 程式碼裡每個 struct 欄位找出正確的 Rust lifetime
2. **移植 workflow**：把每個 `.zig` 檔案改寫成行為一致的 `.rs` 檔案，**數百個 agent 平行跑，每個檔案配兩個 reviewer**
3. **修復 workflow**：跑 build + test 套件，失敗就回去修，直到全部通過

移植完成後還有一個**夜間 workflow** 專門處理「不必要的資料複製」，開出一個 PR。

除了 Bun 這種巨型任務，官方也列出幾類適合的場景：

| 任務類型 | 為什麼適合 |
|---|---|
| **Codebase-wide bug 掃描** | 平行搜尋 + adversarial 驗證，避免誤報 |
| **大型遷移** | 數百檔案平行處理，每檔配 reviewer |
| **安全稽核** | 獨立 agent + 交叉檢查，比單次掃描可靠 |
| **多角度研究** | 多源交叉查證，最後給你引用報告 |
| **高成本決策草擬** | 從多個獨立角度提案，再互相評比 |

## 現階段的限制

Dynamic Workflows 目前有幾個明確的邊界，必須知道：

- **Research Preview**：API、行為、啟用介面**都可能變動**
- **Enterprise 預設關閉**：需要管理員從 Claude Code 設定開啟
- **Token 消耗大**：官方明言「can consume substantially more tokens than a typical Claude Code session」，建議從範圍明確的小任務開始試
- **需要 Claude Code v2.1.154 以上**
- **可用的方案/平台**：Max、Team、Enterprise（管理員啟用）、Claude API、Amazon Bedrock、Google Cloud Vertex AI、Microsoft Foundry；Pro 方案需要在 `/config` 的 Dynamic workflows 那一列手動開啟

## 小結

Dynamic Workflows 改變的不是「agent 變多了」，而是「**計畫的載體變了**」。

過去所有多步驟任務，計畫都住在 Claude 的腦中、寫在 context window 裡。現在，計畫被寫成 JavaScript 腳本，runtime 照表執行，Claude 只負責最後總結。這帶來三個根本差異：

1. **可重現**：同一個 script 可以重跑，產生可比較的結果
2. **可規模化**：intermediate result 存在 script 變數中，數百 agent 也不會撐爆 context
3. **可審計**：你可以打開 script 看 Claude 怎麼規劃，必要時自己修改後重跑

它和 Subagent、Skill、Agent team 不是「新版取代舊版」的關係，而是「**不同規模與不同容錯需求**下的不同工具」。**什麼時候該用、什麼時候不該用、成本怎麼算、怎麼和現有工具組合**——這些實戰決策，我會在第二篇文章展開。

---

**參考資料**

- [Introducing dynamic workflows in Claude Code（官方公告，2026-05-28）](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)
- [Orchestrate subagents at scale with dynamic workflows（官方文檔）](https://code.claude.com/docs/en/workflows)
- [Claude Code Release Notes](https://docs.claude.com/en/release-notes/claude-code)
