---
title: 以 Claude Code 為基礎的維運輔助 Agent 實作：OptiSentry
date: 2026-03-23
description: 分享我如何用 Claude Code 打造一個 SRE 維運輔助 Agent，自動調查生產環境問題
author: Frank Lin
tags:
  - Claude Code
  - SRE
  - DevOps
  - AI Agent
---

# 以 Claude Code 為基礎的維運輔助 Agent 實作：OptiSentry

身為一名 Software Engineer，平時除了開發功能外，最頭痛的莫過於處理生產環境的突發狀況。每當系統出問題，SRE 需要在最短時間內找到 Root Cause並修復，但這個過程往往充滿了各種折騰：切換畫面查 Log、連線進 DB 撈資料、比對程式碼版本... 如果有一個 AI Agent 能幫我自動完成這些繁瑣的調查工作，那該有多好？

這篇文章，我要分享我如何用 **Claude Code** 打造一個維運輔助 Agent — **OptiSentry**。

---

## 為什麼要做這個？

傳統的維運調查流程通常是這樣的：

1. 收到 Alert 或 User 回報
2. 打開 GCP Console 查 Cloud Logging
3. 切到另一個 Tab 連線 MongoDB
4. 再開一個 Terminal 看 Git commit history
5. 試圖在腦中把這些片段組合成 Root Cause

這個過程非常瑣碎，而且很容易遺漏重要線索。有時候查一個問題要折騰好幾個小時，問題是找到了，但寶貴的時間也浪費掉了。

我想如果有一個 Agent，可以：

- 自動去查 Log
- 自動連線 DB 撈資料
- 自動追蹤程式碼版本
- 最後給我一份 Root Cause 分析報告

那該有多好？於是 OptiSentry 就誕生了。

---

## OptiSentry 是什麼？

OptiSentry 是一個基於 **Claude Code** 的 SRE 維運輔助平台，它包含兩個主要的 Agent：

| Agent | 功能 |
|-------|------|
| **investigate** | SRE 調查員 — 自主蒐集 Log / DB / Code 證據，分析 Root Cause |
| **admin** | 服務管理員 — 新增/編輯服務定義、管理 Skill 設定 |

簡單來說，當生產環境出問題時，你只要告訴 investigate agent「我們的 XXX 服務好像掛了」，它就會自動幫你完成調查，最後給你一份完整的分析報告。

---

## 核心設計

### 1. 職責分離

我把維運工作分成兩個明確的角色：

- **investigate agent**：專門負責調查，不做管理
- **admin agent**：專門負責管理，不做調查

這樣的好處是避免 Agent 越權操作，造成不必要的風險。

### 2. 服務定義標準化

每個服務用一個 `.md` 檔案定義，包含 Deployment 和 Database 設定：

```yaml
---
name: ad-management
display_name: Ad Management
service_type: CloudRun
cloud_run_service: ad-management
cloud_run_region: asia-east1
cloud_run_project: my-gcp-project
databases:
  - type: mongodb
    env: MONGODB_CONN_STR
    enabled: true
---
```

investigate agent 會自動讀取這些設定，判斷要查哪些 Log、哪些 DB。

### 3. 安全防護

這是最重要的一點。Agent 需要有足夠的權限才能調查，但權限太大又很危險。我設計了幾層保護：

- **ADC Credential Override**：所有 GCP 指令都使用指定的 credential，避免用錯帳號
- **MongoDB Safe Wrapper**：只能讀取、不能寫入，每次查詢上限 50 筆
- **Git Read-Only**：對 Code Repo 只能 clone/fetch/worktree，不能 push

---

## 調查流程

investigate agent 的調查方法論如下：

```
1. 了解服務 → 讀取 services/{service}/service.md
2. 判讀 Project 設定 → 根據 frontmatter 決定可用工具
3. 收集 Log → 執行 scripts/query-logs.sh
4. 查詢 DB → 執行 skills/query-mongodb/safe-mongosh.sh
5. 定位部署版本 → 查詢 Cloud Run 取得 commit SHA
6. 追蹤程式碼 → 用 git worktree checkout 到對應版本
7. 交叉比對 → 結合所有證據產出分析結果
```

最後，它會用以下格式回覆：

- **Root Cause**：根因分析
- **Impact**：影響範圍
- **Suggestions**：可執行的處理步驟
- **Confidence**：信心度
- **Evidence**：關鍵證據（Log entries、Trace IDs、Code reference）

---

## 技術堆疊

- **Agent Framework**：Claude Code（使用 Pi agent 架構）
- **Deployment**：GCP Cloud Run / GKE / Cloud Function
- **Database**：MongoDB / PostgreSQL / MSSQL
- **Log**：Cloud Logging
- **Incident Management**：Azure DevOps（自動建維運單）
- **Notification**：Slack

---

## 實際使用情境

假設今天 Ad Management 服務的回應時間變長，你只需要對 Agent 說：

> 「帮我查一下 ad-management 服务最近的错误」

Agent 就會自動：

1. 讀取 ad-management 的服務定義
2. 查詢 Cloud Logging 的 ERROR logs
3. （如果有設定）連線 MongoDB 查詢相關資料
4. 取得 Cloud Run 的部署版本
5. 用 git worktree 切到對應 commit 分析程式碼
6. 產出 Root Cause 分析報告

整個過程不需要你手動切換任何畫面。

---

## 總結

OptiSentry 是我用 Claude Code 打造的第一個維運輔助工具，目標是讓 SRE 能更有效率地調查生產問題。目前它已經可以自動完成大部分的調查工作，未來我還計畫加入：

- Sentry 錯誤報告自動串接
- 自動生成維運報告
- 更多資料庫支援
- MCP 對外暴露，讓其他工具也能使用

如果你對這個專案有興趣，歡迎一起討論！也歡迎在我的部落格留言，分享你的維運經驗。

---

*作者：Frank Lin — 一個熱愛自動化、相信 AI 可以讓維運更輕鬆的工程師*
