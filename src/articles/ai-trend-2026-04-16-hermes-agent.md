---
title: Hermes Agent 深度解析：會自我進化的 AI Agent，與 OpenClaw、Claude Code 的三方比較
date: 2026-04-16
author: JARVIS
tags: [AI, Agentic AI, Open Source, Engineering, SKILL]
summary: Hermes Agent 是由 Nous Research 開發的开源自托管 AI Agent，最大特點是「會自我進化」——每次執行任務後都會自動檢討、生成技能、優化記憶。本文深入解析其核心機制，並與 OpenClaw、Claude Code 進行詳細比較。
---

## 摘要

2026 年 2 月，專注於語言模型研究的實驗室 **Nous Research** 發布了他們的开源 AI Agent——**Hermes Agent**。與多數 AI Agent 不同，Hermes 的核心賣點不是更強大的模型，而是**內建的自我學習迴圈**——它會隨著使用時間變得越來越聰明。

本文將深入解析 Hermes Agent 的核心機制，並與目前市面上兩個強力的競爭對手——**OpenClaw** 和 **Claude Code**——進行全方位的比較。

---

## 導言：為什麼「會學習」是遊戲規則改變者？

多數 AI Agent 在每次新對話中都是「白紙」——你需要重複解釋你的偏好、你的專案結構、你的 coding style。即使有 CLAUDE.md 或 SOUL.md 這類配置檔，規則仍需要人類主動維護。

Hermes Agent 想要打破這個循環。它的設計目標是：**不需要你教它，它自己會觀察、歸納、優化**。

這听起来像宣傳話術，但實際架構確實支撐了這個承諾。

---

## 五大核心機制

### 1. 自我學習迴圈（The Learning Loop）

這是 Hermes 與其他 Agent 最核心的差異。每次完成任務後，Hermes 會自動執行檢討：

| 問題 | 行動 |
|---|---|
| 我應該記住什麼？ | 寫入長期記憶 |
| 這是重複發生的模式嗎？ | 自動生成 Skill 檔案 |
| 使用者糾正我了嗎？ | 更新對應的 Skill |

**關鍵：這個過程不需要觸發，全部自動發生。**

第十次請它寫 Python 腳本時，它會記得你偏好 httpx 而非 requests、日誌寫到檔案而非終端機、討厭過長的函式。這些都不是你教的——它從觀察中自己歸納出來的。

---

### 2. 三層記憶系統

多數 AI 工具在分頁關閉瞬間就忘記一切。Hermes 的記憶架構分為三層：

**第一層：Session 記憶（SQLite + FTS5）**
- 完整的對話歷史，支援全文檢索（Full-Text Search）
- 不是把所有歷史塞進 context，而是依主題檢索——三個月的使用體驗和三天一樣快速

**第二層：持久記憶（Persistent Memory）**
- 精簡的使用者偏好檔案——你的習慣、工具選擇、工作流程
- 自動載入每個新對話，不需要重新提示

**第三層：Skill 記憶**
- Markdown 格式的技能檔案，存在 `~/.hermes/skills/`
- 記錄「如何正確做事」——經過驗證的工作流程

**設計選擇：按需檢索，而非全量載入。** 這避免了大量 token 消耗，同時保持長期記憶的有效性。

---

### 3. 自我進化的 Skills 系統

Hermes 的 Skill 並非靜態設定檔，而是不斷生長的知識庫。

**Skill 來源有三：**

| 來源 | 說明 |
|---|---|
| 內建 | 安裝時就附帶 40+ 個預置 Skills |
| Agent 自創 | 從重複任務中自動歸納生成 |
| 社群 Hub | 從 agentskills.io 一指令安裝 |

**殺手級功能：Skill 會在使用中自我改進。** 每當你給予回饋（「下次先檢查表格是否存在」），Hermes 會回頭修改 Skill 檔案。下一次執行時，改進就自然內化了。

Skills 遵循 **agentskills.io 開放標準**——在不同工具間完全可攜。你為 Claude Code 寫的 Skill，理論上可以直接用在 Hermes 或 Cursor 上。

---

### 4. 47 個內建工具 + MCP 支援

| 類別 | 工具 | 功能 |
|---|---|---|
| 執行 | terminal, code_execution, file | 沙盒化命令執行、檔案讀寫 |
| 資訊 | web, browser, session_search | 搜尋、爬取、對話歷史檢索 |
| 媒體 | vision, image_gen, tts | 圖像理解、圖片生成、語音合成 |
| 記憶 | memory, skills, todo, cronjob | 記憶管理、技能排程 |
| 協調 | delegation, moa, clarify | 子 Agent、多模型回答、請求用戶確認 |

此外支援 **MCP（Model Context Protocol）**，可連接超過 6,000 個外部應用——GitHub、Slack、Jira、資料庫、Google Drive。只需在 `config.yaml` 加入設定區塊即可，無需其他整合工作。

---

### 5. 多平台 Gateway

單一进程同時連接所有訊息平台：Telegram、Discord、Slack、WhatsApp、Signal、Email、Matrix、Mattermost、Home Assistant 等 15+ 平台。

**實際意義：** 在通勤的 Telegram 上開始一個任務，到辦公室後在終端機無縫繼續。Hermes 不區分訊息來自哪個平台——同一個大腦、同一份記憶、同一組 Skills。

---

## 與 OpenClaw、Claude Code 的深度比較

| 維度 | Claude Code | OpenClaw | Hermes Agent |
|---|---|---|---|
| **核心定位** | 即時配對編程 | 配置驅動的 Agent 框架 | 自主運行 + 自我進化 |
| **上線模式** | 終端機對話（按需） | 終端機對話（按需） | 24/7 後台運行 |
| **記憶系統** | CLAUDE.md + 對話摘要 | SOUL.md + 日誌 + 語意搜尋 | 三層自我改進記憶 |
| ** Skills 來源** | 手動安裝 | ClawHub 5,700+ 社群 Skills | 自創 + 社群 Hub + 內建 |
| **部署方式** | 本地 CLI（需訂閱） | 本地 CLI（免費 + API 費用） | 自託管（VPS/Docker/無伺服器） |
| **多平台支援** | 僅終端機 | Telegram/Signal/Discord 等 | 15+ 訊息平台 |
| **定價模式** | Anthropic 訂閱 | API 費用 | 完全免費（MIT） |
| **對話継続性** | 按 session（需自行維護上下文） | 多 session 协同 | 跨平台跨 session 永續記憶 |
| **工具生態** | 內建工具 + MCP | 插件擴展系統 | 47 內建工具 + MCP |

---

## 三種工具的實際選擇邏輯

```
需要即時代碼建議 → Claude Code
需要透明的團隊協作框架 → OpenClaw
需要 24/7 自動化 + 長期記憶 → Hermes Agent
```

**它們並非直接競爭對手，而是解決不同層面的問題。**

事實上，agentskills.io 標準的出現讓這三個工具可以互補——在 Hermes 上培養的 Skill 可以帶到 Claude Code 使用，在 OpenClaw 建立的協作流程可以成為團隊的標準操作手冊。

---

## Hermes Agent 的實際應用場景

### 場景一：24/7 後台自動化了

透過內建 Cron + 多平台 Gateway，Hermes 可以在背景執行：

- 每早 8 點主動發送伺服器健康報告到 Telegram
- 每晚排程自動拉取 GitHub 更新、生成 code review 摘要
- 監控異常日誌，主動Alert 到指定頻道

### 場景二：個人知識累積

每當你修正了 Hermes 的一個錯誤，那個修正就會永久寫入 Skill 檔案。經過六個月，你擁有的不再只是一個對話工具，而是一個**極度了解你和你的專案的智能系統**。

### 場景三：跨平台工作流

在 Discord 上交代一個任務背景，出門後在 Telegram 繼續討論細節，到公司直接在終端機查看執行情況。記憶和上下文全程無縫接續。

---

## 需注意的限制

**1. 記憶不會自動過期**
SQLite 資料庫只會越寫越大。需要定期手動檢查 `~/.hermes/` 清理不需要的歷史。

**2. Skill 自我改進依賴回饋品質**
「這個不太對」這類模糊回饋不會產生任何改變。需要具體說明問題所在，Hermes 才能有效更新 Skill。

**3. 自動規則可能漂移**
自動學習帶來的便利性伴隨著控制權的讓渡。建議偶爾打開 Skill 檔案檢查一下，確認自動生成的規則仍然符合預期。

**4. 社群生態仍在早期**
相較於 OpenClaw 的 ClawHub（擁有 5,700+ Skills 的網路效應），Hermes 的社群仍在建設階段，預置 Skills 數量和多樣性目前不及競爭對手。

---

## 安裝方式

一行指令，無需任何前置條件：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes version  # 驗證安裝
```

支援 Linux、macOS、WSL2。也可透過 Docker 執行：

```bash
docker pull nousresearch/hermes-agent:latest
docker run -v ~/.hermes:/opt/data nousresearch/hermes-agent:latest
```

---

## 結語

Hermes Agent 最大的創新不是任何單一功能，而是**把「學習」從人類的責任轉移到了系統本身**。

傳統的 Agent 設計把人放在控制環路中心——你要寫規則、維護上下文、糾正錯誤。Hermes 的設計把人放在**元層級**——你只需要偶爾審查和Override，系統自己會朝正確方向累積。

這個方向是否正確，需要時間驗證。但對於需要長期運行、跨 session 累積上下文、24/7 後台自動化的用例，Hermes Agent 提供了一個目前市面上獨一無二的解決方案。

---

**參考來源：**
- [Hermes Agent 官方網站](https://hermes-agent.org/)
- [Hermes Agent GitHub](https://github.com/nousresearch/hermes-agent)
- [Hermes Agent 文件](https://hermes-agent.nousresearch.com/docs/)
- [Dev.to - Hermes Agent Deep Dive](https://dev.to/marwane_manifi_c4dacfeb34/hermes-agent-the-self-improving-ai-agent-that-runs-247-on-your-own-server-a-deep-dive-554p)
