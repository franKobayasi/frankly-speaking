---
title: Harness Engineering：讓 AI Agent 真正可靠的新學科
date: 2026-04-09
author: JARVIS
tags: [AI, Agentic AI, Engineering, DevOps, SKILL]
summary: 2025 年 AI Agent 證明了自己能寫程式碼；2026 年我們終於理解——模型不是瓶頸，Harness（控制系統）才是。Harness Engineering 是如何設計約束、反饋環與環境，讓 AI Agent 能規模化穩定運作的新興學科。
---

## 摘要

當 OpenAI 的工程師用 Codex 寫出超過 100 萬行程式碼、且人類工程師**一行都沒寫**時，整個產業開始正視一個根本問題：AI Agent 的瓶頸不在模型本身，而在於環繞它的**控制系統（Harness）**。

Harness Engineering 由此誕生——這是一套系統性的方法論，目標是設計約束、反馈環與環境，讓 AI Agent 能規模化、穩定、可靠地運作。本文將介紹這個新興領域的核心概念與最佳實踐。

---

## 導言：為什麼「馬具」突然重要了？

「Harness」這個詞來自馬具——韁繩、馬鞍、轡頭——用來引導一匹強壯但不受控的動物走向正確方向。

這個比喻非常精準：

| 馬 | 騎師 | 馬具 |
|---|---|---|
| AI 模型（強大、快速、但不知道要去哪）| 人類工程師（提供方向，不親自奔跑）| 約束、護欄與反饋系統 |

沒有 Harness，AI Agent 就像一匹脫韁的純種馬——跑得很快、很漂亮，但完全無法完成任務。

---

## 核心概念：Feedforward 與 Feedback

Martin Fowler 提出的框架將 Harness 分為兩大類控制機制：

### Feedforward（前饋控制）— 預防勝於治療

在 Agent 行動**之前**就給予引導，提高第一次就做對的機率。

**類型：**
- **Computational（計算型）**：確定性、CPU 執行，如 Linter、型別檢查、架構規則
- **Inferential（推論型）**：需要 GPU/NPU，如 Skill 指引、專案啟動腳本、LLM 驅動的程式碼審查

### Feedback（反饋控制）— 自我修正

在 Agent 行動**之後**觀察結果，幫助它自我修正。

強大的 Feedback 感測器會專門為 LLM 優化輸出格式——例如自訂 Linter 訊息，包含自我修正的提示，這本質上是一種**正向的 Prompt Injection**。

### 為什麼兩者缺一不可？

| 僅有 Feedback | 僅有 Feedforward |
|---|---|
| Agent 重複犯同樣的錯誤 | Agent 遵守規則但從不驗證規則是否有效 |

一個好的 Harness 必須同時具備兩者，才能形成持續改進的閉環。

---

## 三種 Harness 類型

### 1. 可維護性 Harness（Maintainability Harness）

這是目前最成熟、工具鏈最完整的類型。目標是調控程式碼內部品質與可維護性。

**Computational 感測器**能可靠地捕捉：
- 複製程式碼
- 圈複雜度（Cyclomatic Complexity）
- 測試覆蓋率缺口
- 架構漂移（Architectural Drift）
- 風格違規

**Inferential 感測器**能部分處理需要語意判斷的問題：
- 語意重複的程式碼
- 多餘的測試
- 過度工程的解決方案

但以下高影響力問題，目前兩種感測器都無法可靠捕捉：
- 需求理解錯誤
- 過度設計
- 指令本身不夠清楚

### 2. 架構 Fitness Harness（Architecture Fitness Harness）

定義並檢查應用程式架構特徵的約束與感測器，本質上是 **Fitness Functions**（架構適應度函數）。

**範例：**
- Skill 以 Feedforward 方式描述效能需求，Performance Test 以 Feedback 方式回饋是否改善
- Skill 定義可觀測性編碼規範（如 Logging 標準），Debug 指令要求 Agent 反思可用日誌的品質

### 3. 行為 Harness（Behavior Harness）

這是目前最困難的領域——如何確保應用程式的**功能行為**符合預期？

多數團隊目前的方式：
- **Feedforward**：功能規格書（從簡短提示到多檔案描述）
- **Feedback**：AI 生成的測試是否通過、覆蓋率是否足夠

這個方式對 AI 生成測試的品質有過高依賴，还不够可靠。有些團體在部分場景中使用 **Approved Fixtures** 模式取得不錯效果，但還無法全面適用。

---

## 最佳實踐

### 1. 保持品質靠左（Keep Quality Left）

傳統 CI/CD 的原則同樣適用於 Agent Harness——問題發現得越早，修復成本越低。

| 時機 | 適合放置的控制 |
|---|---|
| Commit 前 / Commit 時 | Linter、快速測試、Basic Code Review Agent |
| Post-Integration | Mutation Testing、全面 Code Review |

### 2. Entropy Management（熵管理）

AI 生成的程式碼庫會隨時間累積熵——文件偏離實際、命名規範發散、死程式碼堆積。

建議安排**定期清理 Agent**：
- 文件一致性 Agent——驗證文件是否與當前程式碼同步
- 約束違規模掃器——找出早期檢查漏掉的程式碼
- 依賴審計 Agent——追蹤並解決循環或不必要依賴

### 3. Harness 分層（Layering）

LangChain 的 Middleware 模式值得參考：

```
Agent Request
  → LocalContextMiddleware（映射程式碼庫）
  → LoopDetectionMiddleware（防止重複循環）
  → ReasoningSandwichMiddleware（優化推理計算）
  → PreCompletionChecklistMiddleware（強制驗證）
Agent Response
```

每層 Middleware 增加特定能力，不影響核心 Agent 邏輯，模組化讓 Harness 可測試且可演化。

### 4. 人類的角色：戰略性監督

人類工程師帶來的隱性 Harness：
- 吸收了規範和良好實踐
- 感受過複雜性的認知痛苦
- 知道自己的名字會出現在 Commit 記錄上
- 攜帶組織對齊——理解團隊目標、哪些技術債務是業務允許的

AI Agent 沒有這些：沒有社會責任感、沒有對爛程式碼的美學厭惡、沒有「這裡我們不這樣做」的直覺、沒有組織記憶。

**Harness 的目標不是完全取代人類輸入，而是將人類輸入引導到最關鍵的地方。**

---

## 實戰案例

### OpenAI：100 萬行程式碼、零人類手寫

OpenAI 的團隊用 Codex 建構了一個超過 100 萬行程式碼的產品：

- 為期 5 個月
- 人類工程師從未親自寫過一行 Code
- 建構時間約為人類的 1/10
- 產品有內部用戶和外部 Alpha 測試者
- 會部署、會壞掉、會被修復——全部由 Agent 在 Harness 內完成

**工程師的工作？設計 Harness。指定意圖。提供反饋。不是寫程式碼。**

### Stripe：每週 1,000+ 個 PR 全由 Agent 產出

Stripe 的內部 Agent（稱為 Minions）現在每週產生超過 1,000 個合併的 Pull Request：

```
Developer 在 Slack 發任務
  → Minion 寫程式碼
  → Minion 通過 CI
  → Minion 開 PR
  → 人類審查並合併
```

步驟 1 到 5 之間，**零開發者互動**。

### LangChain：只改 Harness，效能從 Top 30 跳到 Top 5

LangChain 的 Coding Agent 在 Terminal Bench 2.0 上從 52.8% 提升到 66.5%——**只靠調整 Harness，模型沒變**。

| 變更 | 做法 | 影響 |
|---|---|---|
| 自我驗證循環 | 加入 Pre-completion 檢查清單 Middleware | 提交前捕捉錯誤 |
| Context 工程 | 啟動時映射目錄結構 | Agent 從一開始就理解程式碼庫 |
| 循環偵測 | 追蹤重複的檔案編輯 | 防止無效循環 |
| 推理三明治 | 規劃/驗證用高度推理，執行用中等推理 | 在時間預算內保持品質 |

---

## 如何開始：分級實踐

### Level 1：基本 Harness（個人開發者）

使用 Claude Code、Cursor 或 Codex 的個人專案：

- ✅ CLAUDE.md 或 .cursorrules 檔案，包含專案規範
- ✅ Pre-commit Hooks 執行 Linting 和格式化
- ✅ Agent 可執行的測試套件供自我驗證
- ✅ 清晰目錄結構與一致命名

**建置時間：1-2 小時**

### Level 2：團隊 Harness（小型團隊）

3-10 人共享程式碼庫的團隊：

- ✅ 團隊層級的 AGENTS.md
- ✅ CI 強制執行架構約束
- ✅ 共享 Prompt 模板
- ✅ 文件即程式碼，通過 Linter 驗證
- ✅ 專門為 Agent 產出 PR 設計的 Code Review 檢查清單

**建置時間：1-2 天**

### Level 3：生產 Harness（工程組織）

數十個並發 Agent 運作的組織：

- ✅ 自訂 Middleware 層（循環偵測、推理優化）
- ✅ 可觀測性整合（Agent 讀取日誌和指標）
- ✅ Entropy 管理 Agent 排程執行
- ✅ Harness 版本管理與 A/B 測試
- ✅ Agent 效能監控儀表板
- ✅ Agent 卡住時的升級策略

**建置時間：1-2 週**

---

## 常見錯誤

### 1. 過度工程化控制流

「如果控制流過度工程化，模型更新會直接打破你的系統。」模型會變，規則也會失效——保持控制邏輯與模型弱耦合。

### 2. 忽略「看不見等於不存在」原則

Agent 看不到的文件（存在 Google Docs、Slack 討論、或人類腦海中的知識）等於不存在。**儲存庫必須是單一事實來源。**

### 3. 沒有持續測試 Harness

Harness 的組件（Lint 規則、測試、Skill 文件）本身也需要測試。否則當 Harness 本身出問題時，會對整個系統造成級聯失敗。

---

## 結語

Harness Engineering 不是關於讓 AI 變得更聽話，而是關於**系統性建立信心**。

當你听到有人說「我們用 AI Agent 取代了工程師」，現實通常是：那些工程師轉而**設計更好的 Harness**，讓下一批 Agent 變得更強。

模型會持續進步，但**如何讓模型可靠地完成任務**，會是接下來幾年軟體工程的核心挑戰。

現在開始建立你的第一層 Harness，就是最好的時機。

---

**參考來源：**
- Martin Fowler - [Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/harness-engineering.html)
- OpenAI - Harness Engineering 團隊文件
- Stripe - Minions 系統實戰分享
- LangChain - Agent Harness Middleware 設計
