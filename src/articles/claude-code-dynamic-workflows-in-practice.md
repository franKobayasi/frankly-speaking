---
title: Claude Code Dynamic Workflows 實戰指南：什麼時候該召喚軍團、什麼時候不該
date: 2026-06-02
author: Frank Lin
tags:
  - Claude Code
  - AI Agent
  - Dynamic Workflows
  - Best Practice
  - Token Cost
summary: 第一篇解析了 Dynamic Workflows 的概念與運作原理，這篇聚焦實戰——怎麼用、成本怎麼算、何時該用、何時不該用，並提供一份可直接套用的決策樹。
---

第一篇文章把 Dynamic Workflows 的概念、運作機制、和 Skill/Subagent/Agent team 的差異講清楚了。這篇進入實戰——**怎麼用、成本怎麼控、什麼時候該用、什麼時候不該用**。

## 前置準備

在開始之前，請先確認以下條件：

- Claude Code **v2.1.154** 以上（2026-05-28 之後的版本）
- 訂閱方案：Pro / Max / Team / Enterprise，或透過 Claude API、Amazon Bedrock、Vertex AI、Microsoft Foundry 存取
- Enterprise 方案：管理員需在 Claude Code admin settings 開啟 Dynamic workflows
- Pro 方案：在 `/config` 的 Dynamic workflows 那一列手動開啟

驗證方式：

```bash
# 在 Claude Code CLI 內
/workflows
```

如果看到 workflow 列表介面，代表已啟用。

---

## 三種使用方式（由淺入深）

### 方式一：用內建 workflow 體驗

`/deep-research` 是 Claude Code 預設的內建 workflow，會自動展開多角度搜尋、交叉查證、產出引用報告。

```text
/deep-research 比較 PostgreSQL 15、16、17 的 logical replication 行為差異
```

第一次跑時，Claude Code 會顯示即將展開的計畫並請求你確認。批准後就在背景跑，主 session 維持可操作。

### 方式二：讓 Claude 為你的任務寫 workflow

針對你自己的任務描述，要求 Claude 為它寫一個 workflow：

```text
幫我對 src/auth/ 目錄做一次安全稽核，
找出所有 input validation 不充分、SQL injection 風險、
以及不安全的 session handling。
（Create a workflow）
```

Claude 會動態生成一段 JavaScript 編排腳本，定義要分幾個 phase、每個 phase 派幾個 agent、agent 之間如何傳遞結果。你可以在執行前看到這份腳本。

**進階技巧：存成可重複使用的指令**

跑完後，如果你覺得這份 workflow 值得重複用，可以存起來：

1. 跑 `/workflows`
2. 選取要存的 run
3. 按 `s` 開啟存檔對話框
4. Tab 切換存檔位置：
   - **`.claude/workflows/`** in project：跟著 repo 走，團隊共享
   - **`~/.claude/workflows/`** in home：跨專案可用，只有你看得到
5. 命名後按 Enter 儲存

之後在任何 session 用 `/<你取的名字>` 就能呼叫同一份 workflow。

**同名衝突的優先順序**：如果專案裡的 workflow 和個人 workflow **撞名**，**專案的優先執行**。

**傳入參數的範例**：

```text
> Run /triage-issues on issues 1024, 1025, and 1030
```

存起來的 workflow 可以接收 `args` 全域變數——你 prompt 裡給的東西會以結構化資料傳進 script，script 可以直接對 `args` 做 array/object 操作，不用先 parse。

> 來源：[code.claude.com/docs/en/workflows](https://code.claude.com/docs/en/workflows) 的 *Save the workflow for reuse* 段落。

### 方式三：開 ultracode 讓 Claude 自動判斷

進入 `/effort` 選單，選 **ultracode**：

- 自動把 effort 設為 `xhigh`
- Claude 會**自己判斷**什麼時候適合啟動 workflow，不需要你明確指示

這是最無腦也最昂貴的方式。適合你完全把「該用什麼策略」交給 Claude 決策的場景。

**注意**：在 **v2.1.160**（2026-06-02 發布）的 release 中，Anthropic 把動態觸發的關鍵字從 `workflow` 改成 `ultracode`。2.1.154-2.1.159 期間「workflow」仍會觸發；更新到 v2.1.160 之後，直接打「workflow」這個詞**不會**觸發——用 ultracode 設定，或用自己的話描述任務。

---

## 監看執行中的 Run

啟動後有兩種方式監看：

```text
# 方法一：/workflows 檢視器
/workflows
# 上下選取 run、Enter 展開進度
# 每個 phase 顯示 agent 數、token 總量、經過時間
# 進入 phase 可看到個別 agent 找到什麼

# 方法二：task panel（輸入框下方）
# 一行進度摘要，按 ↓ 聚焦後 Enter 展開
```

**可用的操作**：

| 按鍵 | 動作 |
|---|---|
| `p` | Resume 一個暫停的 run（完成的 agent 用 cache 結果，沒完成的 live 重跑）|
| `s` | 把 run 存成可重複使用的指令 |
| 進入 phase | 看每個 agent 的發現 |

**Resume 的限制**：Resume 只在**同一個 Claude Code session** 內有效。如果你退出 Claude Code 再重開，下次再開 workflow 就是全新的。

> 來源：[code.claude.com/docs/en/workflows](https://code.claude.com/docs/en/workflows) 的 *Resume after a pause* 段落。

---

## 成本：怎麼算、怎麼控

這是大家最在意的部分。Dynamic Workflows 的成本模型有幾個明確的規則。

### 計入用量與速率限制

Workflow run **計入你方案的標準用量**——和一般 session 一樣。但因為 spawn 大量 agent，**單次 run 的 token 用量會比一般對話明顯多很多**。官方公告原話是：

> "Dynamic workflows can consume substantially more tokens than a typical Claude Code session, so we recommend starting on a scoped task to get a feel for usage in your work."
> — [claude.com/blog/.../dynamic-workflows](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)

### 兩道安全閥

官方 runtime 內建兩道防失控的設計：

| 限制 | 數值 | 用途 |
|---|---|---|
| **並行 agent 上限** | 16 個（CPU 少的機器更少）| 限制本地資源消耗 |
| **每 run 總 agent 上限** | 1,000 個 | 防止腳本失控進入無限迴圈 |

> 來源：[code.claude.com/docs/en/workflows](https://code.claude.com/docs/en/workflows) 的 *Behavior and limits* 段落。

「數十到數百」是官方公告的行銷用語；**實際硬上限是 1,000**。

**另一個關鍵安全設計**：workflow script 本身**不能直接存取 filesystem 或執行 shell**——所有 I/O 都必須透過 agent 執行。這是它和 Subagent 的根本差異：subagent 可以自己讀寫檔，workflow 是「純編排者」，所有實作細節交給 agent。

### 控制成本的 4 個實戰作法

| 策略 | 怎麼做 |
|---|---|
| **1. 先在小範圍試跑** | 跑一個目錄而非整個 repo；問一個窄問題而非廣泛主題。`/workflows` 檢視器會即時顯示每個 agent 的 token 用量 |
| **2. 切換到較小的模型** | 大型 run 前先 `/model` 切到較小模型；或請 Claude 在描述任務時，明確要求「不需最強模型的 stage 用小模型」 |
| **3. 隨時停 run** | `/workflows` 檢視器裡可以隨時停止，**完成的 agent 工作不會遺失** |
| **4. 把 workflow 拆階段** | 如果任務需要中途 sign-off，**不能在一個 run 中插入使用者輸入**——只能拆成多個 workflow，每階段獨立確認 |

第 4 點特別重要：runtime **不支援 mid-run user input**。需要中途決策的場景，必須自己拆 workflow。

### 一個粗略的成本心智模型

雖然官方沒有給精確的單位成本，但根據官方文案與社群測試，可以建立這個心智模型：

```
一般對話 session     ──┐
                       ├── 1x
                       │
多 agent subagent  ────┼── 3-10x
                       │
Dynamic Workflow    ──┘── 10-100x+
```

具體倍數取決於 phase 數、agent 數、是否用 Opus 4.8 xhigh、是否啟用 adversarial review。**強烈建議第一次用時盯著 `/workflows` 的 token 計數，建立自己的基準**。

---

## 何時用、何時不用：實戰決策樹

這是這篇文章最實用的部分。

### 用 Dynamic Workflow 的場景

```
任務滿足以下大部分條件 → 考慮 Dynamic Workflow
─────────────────────────────────────────
□ 涉及 ≥ 50 個檔案或大量平行工作量
□ 需要多個獨立視角交叉驗證
□ 對錯誤成本敏感（安全、遷移、金流相關）
□ 你有時間等（背景執行，主 session 不卡）
□ 預算容許較高 token 消耗
```

**典型用例**：

- 整個 codebase 的安全稽核（auth、input validation、unsafe patterns）
- 框架 / 語言的大型遷移（數百到數千檔案）
- Codebase-wide dead code 掃描與清理機會識別
- 多源交叉查證的研究問題
- 高風險架構決策的多角度提案 + 互評

### 不該用的場景

```
任務符合以下任一條件 → 不要用 Dynamic Workflow
─────────────────────────────────────────
□ 範圍小（< 10 個檔案）
□ 任務線性、無平行機會
□ 需要大量 mid-run 互動
□ 預算敏感且無監控
□ 你還在探索需求、答案不明
```

**典型反例**：

- 修一個 bug：直接對話更快
- 寫一個新功能：skill + subagent 足夠
- 學習新技術：直接問即可，不需要軍團
- 還沒定義清楚的成功條件：先寫 spec，再用 workflow

### 和其他工具的組合策略

Dynamic Workflows 不是要取代其他工具——它們是**不同層次的抽象**。實戰上常見的組合：

| 場景 | 推薦組合 |
|---|---|
| 大型遷移 + 風控 | Dynamic Workflow 跑主流程 + Skill 提供框架知識 + Subagent 處理局部 |
| 安全稽核 | Dynamic Workflow 平行掃描 + Adversarial review 模式 + Human sign-off 分階段 |
| 研究報告 | `/deep-research` workflow（內建就夠）+ Skill 提供領域術語表 |
| 反覆跑的標準流程 | 存成 `.claude/workflows/` 共用 workflow + 傳入 `args` |

---

## 關閉與企業管理

### 個人關閉（任選一種）

```bash
# 方法一：/config 互動切換（跨 session 持久）
/config
# 找到 Dynamic workflows 那列，toggle off

# 方法二：settings.json
# 在 ~/.claude/settings.json 加入：
{
  "disableWorkflows": true
}

# 方法三：環境變數
export CLAUDE_CODE_DISABLE_WORKFLOWS=1
```

### 企業層級關閉

管理員可以：

- 在 [managed settings](https://code.claude.com/docs/en/server-managed-settings) 設 `"disableWorkflows": true`
- 或在 [Claude Code admin settings](https://claude.ai/admin-settings/claude-code) 頁面切換 toggle

關閉後：內建 workflow 指令（如 `/deep-research`）不可用、`ultracode` 從 `/effort` 選單消失、`workflow` 關鍵字不再觸發 run。

---

## 我自己會怎麼用

給有緣看到這裡的讀者一個我自己的判斷框架——什麼時候我真的會啟用 Dynamic Workflow：

1. **範圍已經固定**：任務範圍和成功條件都清楚，workflow 只是把執行規模化
2. **錯誤成本高於 token 成本**：例如處理 production 的安全稽核，跑錯一次比多燒 token 貴太多
3. **會反覆跑**：用一次就丟不划算，存成 `.claude/workflows/` 共用 workflow 後續才能 reuse

**反過來說**，對我大多數日常工作——寫功能、修 bug、code review——Dynamic Workflow 都太重了。Subagent + Skill 對我來說是甜蜜點。

---

## 小結：給開發者的行動建議

如果你想開始用 Dynamic Workflows，建議這個路徑：

1. **第一步**：跑 `/deep-research` 一個你有興趣的問題，觀察 workflow 怎麼展開
2. **第二步**：用 `/workflows` 檢視器觀察 token 用量，建立自己的成本基準
3. **第三步**：挑一個「範圍固定、有 cross-check 價值」的任務，試著讓 Claude 為你寫 workflow
4. **第四步**：如果會反覆用，存成 `.claude/workflows/` 共用 workflow
5. **第五步**：跑幾次後再決定要不要開 ultracode 自動模式——多數人不會想無腦全開

**不要**第一週就對 production 開 ultracode。除非你想要的就是「讓 Claude 燒 token 燒到爽」。

Dynamic Workflows 不是萬靈丹，但它確實補上 Claude Code 最後一塊拼圖——**當任務規模大到對話視窗無法承擔時，把計畫搬出 context window 的能力**。其他工具適合 90% 的日常工作；剩下 10% 的大場面，就是 Dynamic Workflows 的主場。

---

**參考資料**

- [Introducing dynamic workflows in Claude Code（官方公告，2026-05-28）](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)
- [Orchestrate subagents at scale with dynamic workflows（官方文檔）](https://code.claude.com/docs/en/workflows)
- [Claude Code Release Notes](https://docs.claude.com/en/release-notes/claude-code)
