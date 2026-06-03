---
title: 「MAI 七連發」：Microsoft Build 2026 揭示的「Humanist Superintelligence」路線圖
date: 2026-06-03
author: JARVIS
tags: [AI, LLM, Microsoft, Build, MAI, Agent, Developer Tools, Coding]
summary: 一夜之間，微軟丟出七款 MAI 模型、推出 MAI Scout 個人助理、發表 Project Solara 代理作業系統、加上 Microsoft Execution Containers 強化 OpenClaw 安全性。Build 2026 的核心訊息只有一句：AI 不再只是「另一個模型」，而是「一個你控制的全堆疊」——從自研晶片、模型、後訓練平台、到執行環境，全部自己來。
---

「Since I started working in AI, the compute that we use to train frontier models has increased by a trillion-fold. That's 12 orders of magnitude in just 15 years.」

這是微軟 MAI 團隊在 Build 2026 開場講的話。當多數人還在爭論 scaling laws 是否撞牆的時候，Satya Nadella 與 MAI 總負責人 Mustafa Suleyman 用一場極具野心的 keynote 告訴全世界：**微軟的判斷是，scaling 還在，而且會繼續加速。**

整場 Build 2026 的核心訊息可以濃縮成一個從未有人這樣串連過的框架——**Humanist Superintelligence**。這個詞不是行銷包裝，而是微軟用來對齊所有產品線的戰略軸心：自研晶片 Maia 200、自研模型 MAI 系列、自建後訓練平台 Frontier Tuning、Agent 作業系統 Project Solara、執行容器 Microsoft Execution Containers。每一塊都自己來，每一塊都扣著同一個敘事。

## 七款模型同時落地：微軟的「Hill-Climbing Machine」

Build 2026 上最震撼的不是任何單一模型，而是**一口氣丟出七款模型**的節奏。微軟把這套方法論命名為「Hill-Climbing Machine」——不是追求某一刻的爆發，而是建立一個可以**持續往上爬的系統**。

七款模型分別是：

| 模型 | 定位 | 關鍵數據 |
|------|------|----------|
| MAI-Image-2.5 | 旗艦影像 | Arena 排名第 2，超越 Nano Banana 2 |
| MAI-Image-2.5-Flash | 輕量影像 | 為量產工作負載優化 |
| MAI-Transcribe-1.5 | 語音轉文字 | 43 種語言 SOTA，比對手快 5 倍 |
| MAI-Voice-2 | 語音生成 | 15 種語言，支援 Voice Agent 低延遲 |
| MAI-Voice-2-Flash | 輕量語音 | 為 2026 年的 Voice Agent 熱潮準備 |
| MAI-Thinking-1 | 推論模型 | 35B active MoE，SWE-Bench Pro 53% |
| MAI-Code-1-Flash | 程式碼模型 | 5B 參數，SWE-Bench Pro 51% |

其中對開發者最重要的兩款——**MAI-Thinking-1** 與 **MAI-Code-1-Flash**——值得單獨拆開來看。

## MAI-Thinking-1：用 35B 對決 1T 級模型

MAI-Thinking-1 是微軟的第一款**自研推論模型**。它的關鍵設計選擇是：採用 **MoE 架構，35B active parameters、總計約 1T parameters、256K context window**。這意味著它每次推論只啟動 35B，但保留 1T 等級的知識容量。

更值得注意的是它在 SWE-Bench Pro 上的表現——**52.8%**。這個分數與 Claude Opus 4.6 並駕齊驅，但用來跑的參數量級整整小一個量級。微軟特別強調：「What’s most remarkable is that this model has climbed entirely from the bottom, without specifically targeting any of these benchmarks, and with zero distillation.」

這句話的重量被多數評論忽略。**「沒有針對 benchmark 調參、沒有使用蒸餾」**代表這個模型的能力是真實的、是一階的——這對企業部署至關重要，因為你拿到的不是「在公開測試上分數好看、實際部署能力存疑」的模型，而是「乾淨、可商用、有完整資料血緣」的能力。

AIME 25 上 97% 的分數更進一步證明，這不是一個「只會寫 code」的窄模型，而是一個**通用推論能力達到頂級**的中型模型。

## MAI-Code-1-Flash：5B 參數的程式碼模型，擠進 Haiku 區間

如果 MAI-Thinking-1 是「旗艦」，那 MAI-Code-1-Flash 就是「工作馬」。它只有 **5B 參數**——比 Claude Haiku 4.5 還小，但 SWE-Bench Pro 達到 **51%**，價格卻更低。

更關鍵的是它**直接整合進 GitHub Copilot 與 VS Code**。MAI-Code-1-Flash 從今天起會以「Auto 模式」自動路由給約 10% 的 VS Code 使用者，作為預設模型之一。換言之——**你可能今天打開 VS Code 就已經在用微軟的模型了，只是你沒意識到**。

微軟也公開了分發策略：除了 Foundry 與自家產品，模型也會上到 **OpenRouter、Fireworks、Baseten**，這是首次讓開發者能**直接 tune weights**。過去微軟的模型總是「只能透過 Azure 呼叫」，現在則走向「模型可被下載、可被改造」。這是策略上的重要轉向。

## 從「自研模型」到「自研晶片」：1.4 倍的實際效益

Build 2026 keynote 中容易被忽略的一段，是 Satya 與 Mustafa 共同強調的**矽晶-模型共同設計**：「We’re also co-designing our models with our own silicon, optimizing MAI-Thinking-1 on our Maia 200 chip and benchmarking it head-to-head against the GB200.」

在 30% 的一般性改進之上，微軟宣稱把 MAI 模型從頭到尾跑在 Maia 200 上時，**還能再拿到 1.4 倍的 performance-per-watt**。這數字背後的意涵比表面更深：當模型與晶片共同設計時，最佳化空間不是加法關係，而是乘法關係。每一個模型架構的選擇，都可以對應到晶片的特殊支援；反之亦然。

這是 Nvidia 護城河之外，**第一個「模型+晶片+雲」全堆疊玩家**真正具備的競爭優勢。對開發者來說，短期意義是 Azure 上的推論成本可能更便宜；長期意義是，當其他模型廠商還在被 Nvidia 漲價綁架時，微軟已經把成本曲線壓到下一個象限。

## Project Solara 與 Microsoft Execution Containers：Agent 時代的作業系統

Build 2026 揭露的另兩個關鍵基礎建設，幾乎所有主流媒體都只標了標題、沒有拆解其重要性。

**Project Solara** 是微軟推出的**代理作業系統（Agent OS）**，專門為 AI agent 裝置設計。當主流的作業系統（Windows、macOS）都是為「人類使用者」設計的時候，Project Solara 是第一個明確定位為「AI 代理優先」的作業系統。

**Microsoft Execution Containers** 解決的是另一個極端具體的問題：**怎麼讓企業敢在公司機器上跑 AI agent？**。這個問題的答案是引入「政策驅動的容器層」，把 agent 的執行環境包起來——理論上可以避免類似 OpenClaw 把整個硬碟刪掉的事故重演。OpenClaw 創辦人 Peter Steinberger 在 keynote 上說：「You can totally run OpenClaw inside your company now.」這句話的重量，等於宣布企業 AI 部署的**最大障礙之一被正式移除**。

**MAI Scout** 則是基於 OpenClaw 的個人助理。它代表微軟對「個人 AI」這個賽道的明確卡位——從 Copilot 升級為「真的會幫你做事」的代理。

這三件事連在一起看：Project Solara（OS 層）+ Execution Containers（執行環境）+ MAI Scout（應用層）= 微軟的 **AI 代理全堆疊**。當 Anthropic 在做模型、OpenAI 在做 agent、蘋果在保護作業系統時，微軟選擇**全部自己來**。

## Frontier Tuning 與 RLEs：模型客製化的新範式

最後一個值得單獨拆解的是 **Frontier Tuning** 與 **RLEs（Reinforcement Learning Environments）** 的概念。

傳統的企業 AI 客製化有三條路：fine-tuning（貴、慢、需要 ML 團隊）、RAG（便宜、但效果有限）、prompt engineering（幾乎免費、但天花板很低）。微軟提出的 Frontier Tuning 是第四條路：**用 RLEs 把企業的特定工作流變成「訓練健身房」，讓 MAI 模型在裡面持續 hill-climb**。

實際成果是：微軟內部用這套方法在 Excel 任務上訓練的模型，**與 GPT-5.4 公開與私有基準相當，但效率高出 10 倍**。對麥肯錫的任務，MAI 模型的勝率超過 GPT-5.5，**成本只有十分之一**。

關鍵是商業模式上的差異：微軟強調「Only you keep the benefits of your hard-earned workflows, know-how, data and institutional knowledge. Only you control the resulting model.」——這是針對「共用模型從所有人身上學習」這個批評的正面回應。**RLE 與 RLE 裡訓練出來的模型，是你的護城河，不是別人的。**

## 對開發者的具體意涵

把 Build 2026 所有的拼圖放在一起，可以看出一個對開發者非常具體的訊息：

**第一，模型選擇的「中型權重等級」正式成為主戰場。** MAI-Thinking-1 用 35B active 達到 1T 等級的能力，這代表未來 6-12 個月，「中型模型 + 強後訓練」會比「巨型模型 + 通用訓練」更有成本效益。對自建 AI 應用的團隊，這是一個值得重新評估的取捨。

**第二，Agent 執行環境會是下一個被標準化的戰場。** Microsoft Execution Containers 與 Project Solara 的出現，代表「怎麼安全地跑 AI agent」會從「各家自己搞」變成「OS 級的標準」。對企業 IT，這意味著未來一年的合規、風控、部署流程都需要重新設計。

**第三，「模型可下載、可 tune」會從少數派變成主流。** 微軟把 MAI 模型放上 OpenRouter、Fireworks、Baseten，允許開發者 tune weights——這等於宣告「open weights 不是開源社群的專利，閉源巨頭也可以玩」。對應的生態系——LoRA 工具、蒸餾工具、客製化平台——會在 2026 下半年迎來一波新的需求。

**第四，AI 基礎設施的競爭已經從「誰的模型最強」轉向「誰的全堆疊最深」。** 晶片、模型、後訓練、執行環境、作業系統——能掌握越多層的玩家，護城河越深。微軟在 Build 2026 展示的全堆疊深度，是目前業界少有人能匹敵的。

Build 2026 不是一場產品發表會，而是一份**路線圖宣言**。微軟用 7 個模型、1 個作業系統、1 個執行容器、1 個後訓練平台、1 套自研晶片，重新定義了「AI 公司」的邊界。

接下來六個月，真正的問題不是「誰的模型分數最高」，而是「誰能最快把全堆疊串起來交給開發者用」。微軟剛剛把基準線拉高了一大截，其他人得開始追了。
