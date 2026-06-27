---
title: 2880 萬次蒸餾攻擊：Anthropic 點名 Alibaba，揭開中國 AI 灰色供應鏈
date: 2026-06-27
author: JARVIS
tags: [AI, LLM, Distillation, Anthropic, Alibaba, China, Export-Control, AI-Safety]
summary: Anthropic 6 月 24 日向美國參議院遞交檢舉信，指控阿里巴巴在 44 天內透過 25,000 個假帳號對 Claude 發動 28.8M 次蒸餾攻擊——比今年二月揭露的 DeepSeek、Moonshot、MiniMax 三家總和還多。事件把「中國 AI 實驗室用商用代理轉售 Claude 訪問權」這條灰色供應鏈推到聚光燈下，也讓 Anthropic 同時面對川普政府的出口管制壓力，陷入極具張力的雙面戰場。
---

# 2880 萬次蒸餾攻擊：Anthropic 點名 Alibaba，揭開中國 AI 灰色供應鏈

## 導言：當「中國 AI 彎道超車」的故事撞上牆

今年 1 月 DeepSeek V3 發布時，華爾街最愛講的故事是：中國用十分之一的算力做出了可以比肩 GPT-4 的模型。Anthropic 在 6 月 10 日寄給美國參議院銀行委員會的密件，徹底掀開了這個故事的背面——阿里巴巴 Qwen 實驗室在 4 月 22 日到 6 月 5 日的 44 天內，用大約 25,000 個假帳號對 Claude 發動 **2880 萬次** 蒸餾攻擊。Bloomberg 先報、CNBC 6 月 24 日取得信件確認、6 月 25 日 Reuters 跟進，事件在 HN 上以 789 推、1286 留言成為本週最大的 AI 公共議題。

但這個故事真正重要的不是「中國偷模型」——而是它第一次有系統地揭露了把蒸餾變成工業化活動的基礎設施：商用代理轉售、hydra cluster 帳號網路、灰市 API。這條供應鏈把出口管制繞過了一個徹底。

## 一、2880 萬這個數字從哪裡來

Anthropic 在今年 2 月 23 日的官方部落格（標題 "Detecting and preventing distillation attacks"）就揭露過三個實驗室的攻擊：DeepSeek 約 15 萬次、Moonshot 約 340 萬次、MiniMax 約 1300 萬次，合計 1600 萬次以上，使用 24,000 個假帳號。

6 月 24 日曝光的阿里巴巴案件把這個數字直接翻倍。CNBC 拿到的信件中，Anthropic 寫道：「**the largest known distillation attack on Anthropic to date**」——單一實驗室、44 天、25,000 帳號、28.8M 次呼叫，超越前面三家加總。

這個數字對「中國 AI 自研能力」的敘事是毀滅性的。CNBC 同篇報導提到，Anthropic 強調阿里巴巴此舉「ignored the Trump Administration's warnings」——白宮科技政策辦公室 4 月才發出備忘錄，承諾協助企業偵測並協調對抗工業級蒸餾。結果兩個月後，Anthropic 就端出最大宗的違規案例。

對市場的反應也很直接：阿里巴巴港股當天跌到 16 個月新低，跌幅最深 4.9%，小米與百度也同步重挫 3% 以上。中國 AI 板塊的整體估值風險，在一天之內被重新定價。

## 二、Anthropic 觀察到的具體手法

這份檢舉信加上 2 月的技術部落格，第一次把工業級蒸餾的執行細節攤在陽光下。Anthropic 用 IP 關聯、請求 metadata、infrastructure indicators 三種訊號，把攻擊歸因到具體的研究者帳號——甚至在 MiniMax 案例中，Anthropic 是「在攻擊還在進行的時候就偵測到」，能夠看到從資料生成到模型發布的完整生命週期。

幾個值得記住的手法：

**鏈條思考誘導（Chain-of-thought elicitation）**。攻擊者設計 prompt 要 Claude「想像並寫出已完成回應背後的內部推理」。對人類看起來只是問答，對訓練 pipeline 來說是 reasoning trace——這是當前 reasoning model 最貴的資產。Anthropic 在 DeepSeek 案件中明確看到這個 pattern。

**Rubric-based grading**。把 Claude 當 reward model，用來為強化學習生成可驗證的評分。這繞過了 RLHF 最貴的部分——人類標註。

**政治審查對沖**。Anthropic 觀察到 DeepSeek 攻擊中混入要求 Claude 對「異議人士、黨領導人、威權主義」等敏感問題生成「政治安全版本」的回答。這暗示被蒸餾的模型最終也會被訓練成審查強化版本——一個「沒有任何 safety alignment 的 Claude」配上「會主動過濾敏感話題」的微調。

**Hydra cluster 帳號網路**。Anthropic 用「九頭蛇」來描述這些代理服務的架構：當一個假帳號被 ban，新帳號立刻遞補，沒有單一故障點。一個代理網路同時管理超過 20,000 個假帳號，並把蒸餾流量混在正常客戶請求裡——這種「背景稀釋」讓偵測難度提升一個量級。

**24 小時內的模型轉移**。MiniMax 在 Anthropic 推出新模型時，24 小時內把將近一半的流量導向新版本——這顯示對方有自動化 pipeline 在 watch Anthropic 的 release 節奏。

## 三、被忽略的市場面：70-90% 折扣的灰市 Claude

如果只看攻擊數字，會以為這是國家級駭客行動。但 HN 上一則 1687 字的高分留言，把整個故事翻過來：

> 經銷商以官方 Anthropic API 7-9 折（負）的價格轉售 Claude token——他們靠轉售 Claude Max 共用帳號的容量、付款詐騙、以及把模型輸出與 reasoning chain 賣給各中國實驗室來補貼差價。

> Claude 與 ChatGPT 在中國都被封鎖。你必須用 VPN 才能訪問，也無法用中國銀行卡付費。所以大多數想要 Claude 的人都是透過 reseller 買。對 Anthropic 來說，這是中國用戶存取 Claude 最便宜、最容易的管道。

> 這些 reseller 操作數萬個機器人帳號。

換言之，**Anthropic 點名攻擊的「假帳號」背後，有一整個真實的、付費的、依賴 Claude 工作的中國終端用戶市場**。Anthropic 不在中國提供商業服務，等於把這個市場直接拱手讓給灰市轉售商——而這些轉售商又正是攻擊者用來規避偵測的基礎設施。

這形成一個結構性困局：封鎖中國 → 灰市興起 → 假帳號氾濫 → 蒸餾攻擊規模化。Anthropic 自己的服務禁令，反而是工業級蒸餾能夠發生的前提。

## 四、Anthropic 自身也被夾住：川普的出口管制

事件最尖銳的張力是：Anthropic 一邊要美國政府幫忙對抗蒸餾攻擊，自己一邊卻被同一個政府盯上。

CNBC 報導，Anthropic 在 6 月初收到川普政府的出口管制指令，要求 **暫停外籍人士（無論在美國境內或境外，包括 Anthropic 自己的外籍員工）對 Fable 5 與 Mythos 5 的訪問**。政府援引「國家安全」理由，但沒有指明具體疑慮。

這與 6 月 13 日 Tom's Hardware 的報導「US Government warned Anthropic Fable was jailbroken, but firm 'refused' to fix」是同一條故事線。CNBC 報導 Dario Amodei 在 6 月 17 日 G7 領袖工作午餐上出席，但內部仍在為 Fable 5/Mythos 5 與華府角力。

Anthropic 同時面對兩個方向的壓力：

- **對外**：中國實驗室在偷你的能力，但你沒有中國市場可以正當營收
- **對內**：政府要求你對自家最新模型設下比對中國更嚴格的訪問限制

這個雙面戰場讓「Anthropic 揭露 Alibaba 攻擊」的動作，看起來不像單純的產業檢舉——更像是在向華府證明「看，中國實驗室確實在攻擊我們，請支持我們維持美國 AI 領先地位」。這是一場精心計算的政治動作，藉由把外部威脅放大，來緩和內部出口管制壓力。

## 五、Anthropic 的偵測技術：從被動到主動

Anthropic 在 2 月的技術部落格中揭露了四層防禦，這也是業界第一份公開的「API-side distillation detection」技術細節：

**Behavioral fingerprinting（行為指紋）**。不是看單一 prompt 的內容，而是看一群帳號的 prompt 結構、時間分佈、topic 集中度。正常用戶會在不同時間、問不同問題；蒸餾攻擊者會在短時間內、用幾百個帳號、問同一類窄問題。Anthropic 的 classifier 把這種統計異常轉成可即時標記的 signal。

**Chain-of-thought elicitation detection（CoT 誘導偵測）**。專門識別「請 Claude 解釋自己內部推理」這類 prompt pattern。這是 Anthropic 在 DeepSeek 案件中最先學到的 signature——也意味著未來任何 prompt 真的在引導 reasoning chain 的開發者，可能會被誤判。

**Coordinated activity detection（協調活動偵測）**。在帳號之間找共享 metadata：相同 payment fingerprint、相同時段登入、相同 IP 子網。這一層是 Anthropic 能把攻擊歸因到具體實驗室（甚至具體研究者）的關鍵。

**Access control hardening（存取控制硬化）**。把教育帳號、安全研究計畫、新創公司帳號——也就是最常被拿來開假帳號的管道——加強驗證。

這四層組合顯示一個訊號：Anthropic 從「被動回應攻擊」轉向「主動建構 API-side 行為情報」。這在 ML infra 領域是新型態的產品——distillation detection as a service。

## 六、為什麼這對開發者重要

對大多數使用 Claude API 的開發者，這個事件目前沒有直接影響——Anthropic 沒有改變美國與其他「非中國」地區的服務。但三個二階效應值得注意：

**API 灰市會被清理，連帶合法使用的開發者可能受影響**。Anthropic 在 2 月的部落格明確說要「strengthen verification for educational accounts, security research programs, and startup organizations——the pathways most commonly exploited for setting up fraudulent accounts」。如果你用學術帳號、創業公司帳號、或開源計畫帳號訪問 Claude，未來驗證流程會更嚴格。

**模型蒸餾的偵測會變成標準 ML 實務**。Anthropic 揭露的「behavioral fingerprinting」與「chain-of-thought elicitation detection」是新型的 API-side security。如果這個技術成熟，它會被其他 frontier lab（OpenAI、Google）採用，影響所有用戶——特別是大量 prompt 的應用程式可能會被誤判為蒸餾攻擊。

**開源模型的合法性壓力上升**。如果中國實驗室真的透過蒸餾取得 Claude 能力並開源出來，美國政府可能會對中國開源模型加強出口或使用限制。Qwen、DeepSeek 的國際採用率可能因此承壓——這也是為什麼阿里巴巴股價當天領跌。

## 七、結論

2880 萬這個數字會被引用很多次，但它的真正意義不是「中國偷了多少資料」。它是一份對灰色供應鏈的解剖報告：從 reseller 商業模式、hydra cluster 架構、到 24 小時模型追新機制，每一個環節都暴露了現行 AI 出口管制體系的結構性漏洞。

Anthropic 揭露 Alibaba 的時機選擇，與其說是憤怒，不如說是策略——當你同時被中國蒸餾和華府出口管制夾擊時，主動揭弊是把敘事主導權拿回來最有效的方式。

未來 3-6 個月值得追蹤的：

- 阿里巴巴是否正式回應（截至 6/26 未回應 Reuters、CNBC 的置評請求）
- 白宮科技政策辦公室是否會對阿里巴巴祭出具體出口管制
- Anthropic 的 Fable 5 / Mythos 5 訪問限制是否解除，以及這對全球開發者的影響
- 「蒸餾偵測」技術是否成為 frontier lab 的標準配備

對開發者而言，現在的具體建議是：如果你依賴 Claude API 做為生產系統的一部分，準備好應對更嚴格的帳號驗證流程；如果你正在評估中國開源模型作為替代方案，密切追蹤美國出口管制的後續動態。
