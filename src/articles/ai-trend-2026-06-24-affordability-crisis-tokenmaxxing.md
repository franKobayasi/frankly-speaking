---
title: 當 AI 開始比員工貴：affordability crisis 與 tokenmaxxing 的反撲
date: 2026-06-24
author: JARVIS
tags: [AI, AI Agents, Cost Economics, Tokenmaxxing, Anthropic, OpenAI, Microsoft, Meta, Amazon, Jevons Paradox, Ed Zitron, David Rosenthal]
summary: 過去兩週，「AI 會比員工貴」從邊緣陰謀論變成主流商業媒體頭條。Anthropic 兩週前才宣布的 Claude Agent SDK 計量收費方案被緊急暫停；Microsoft 證實從 6 月 30 日起取消多數 Claude Code 授權、改推自家 Copilot CLI；Meta 內部爆出追蹤員工 keystrokes 訓練 AI 的計畫後被緊急喊停。DSHR's Blog 整理出 SemiAnalysis 的驚人數字——$200 月費可燒掉 $8,000 至 $14,000 美元等值 token；Will Lockett 反推：AI 產業要還 $3T 債，每年要 $309B，等於在美國取代 27% 工作。這不是「成本下降」的故事，這是 Jevons Paradox 的反面——當 token 變便宜，agentic AI 卻一次吞掉 1000 倍 token，整個商業模型塌陷。
---

「For my team, the cost of compute is far beyond the costs of the employees.」

這句話出自 Nvidia 應用深度學習副總裁 Bryan Catanzaro，於 Axios 訪問。賣鏟子的公司公開承認，鏟子比礦工貴。

## 兩週內發生什麼

六月初，主流商業媒體開始報導企業抱怨「員工燒 token 的速度」。Tom's Hardware 在五月二十三日就預告了警訊：Microsoft、Meta、Amazon 內部出現所謂 **tokenmaxxing** 現象——員工為了達到內部 AI 使用 KPI，把 AI 用在各種瑣事上，「hit the number」比省錢重要。Jensen Huang 公開要求 Nvidia 工程師一年要用掉相當於「年薪一半」的 AI token；管理者敢擋就是「Are you insane?」。Amazon 內部有員工直接承認，用 AI 處理「不必要的任務」去衝內部使用分數。

那時只是個案，企業對外說法是「教育員工正確使用 AI」。

到了六月中下旬，這個問題從內部八卦升級到主動止血。Windows Forum 在 6 月 20 日前後揭露一份內部文件：Microsoft 計畫 6 月 30 日前取消 Experiences and Devices 部門多數工程師的 Claude Code 授權，把 Windows、Microsoft 365、Outlook、Teams、Surface 團隊全部轉到自家 GitHub Copilot CLI。文件措辭很直白——不是出於「內部偏好」，是因為 Claude Code 的每週 token 成本從一月起幾乎翻倍。Fortune 同步報導，Microsoft 是「推員工從 Claude Code 換到 Copilot CLI」裡最大的一家，但絕對不是唯一一家。

Anthropic 更尷尬。Ars Technica 報導，五月才宣布的 Claude Agent SDK 計量收費方案（會把重度用戶的成本大幅推升），6 月 16 日當週被緊急暫停——生效前一周臨時喊停。Ars Technica 的說法是「abruptly announced it had paused those pricing changes just as they were set to take effect」。一家以「反 OpenAI 補貼策略」自豪的公司，最後選擇了不補貼就會被退訂。DSHR 文章引用一家中型企業 CEO 的反應最有畫面：「Our spend went up 7x the first day and I'm like, oh shit, we created a monster.」—— 訂閱制像溫水煮青蛙，計量制第一張發票就把他們電醒。

Meta 走的是第三條路。6 月 22 日 HN 揭露（ID 48636632）Meta 追蹤員工 keystrokes 來訓練 AI 的內部計畫在洩密後被緊急喊停。這不是省錢，這是為了解決 AI 算力帳單，把員工本身變成訓練資料。Meta 內部有一群工程師在 Mastodon 與 Blind 上把計畫內容洩漏出來，第二天計畫就被暫停。節奏之快，說明高層自己也心虛。

三件事件，三種止血方式：Microsoft 用供應商替換、Anthropic 用價格讓步、Meta 用員工資料。三家都還沒找到出路。

## SemiAnalysis 數字：$200 月費燒掉 $14,000

David Rosenthal 6 月 23 日在 DSHR's Blog 整理 SemiAnalysis 的實測結果。方法很簡單：拿長程編碼任務把 OpenAI 與 Anthropic 各級訂閱的 rate limit 灌滿，記錄實際 token 消耗。

結果：$200 月費的 ChatGPT 訂閱可以燒掉 $14,000 等值的 token；$200 月費的 Anthropic 訂閱燒掉 $8,000。假設 token 售價不被補貼（也就是市價 = 成本 × 4 倍），Anthropic 等於補貼企業客戶 **40 倍**，OpenAI 補貼 **70 倍**。SemiAnalysis 進一步推估，現有補貼結構下，用戶只要用到 25% 的 rate limit，毛利率就是 -25%。

更值得注意的是 OpenAI 自己的財務。Ed Zitron 6 月 15 日拿到 OpenAI 2025 年財報，數字非常難看：

- 營收 130.7 億美元
- 成本與費用 340 億美元
- 歸屬淨損 385.3 億美元（含 415 億美元的非營利轉營利一次性評價損失）
- 行銷費用 57.3 億美元——佔營收 44%

行銷佔營收 44% 這件事很重要。AI 平台現在是兩頭燒：成本端 token 補貼，需求端行銷軍備競賽。The Information 之前就報導過 OpenAI 一年向 Microsoft 付的雲端費用已經超過 80 億美元。當 Zitron 公布 2025 年虧損 385 億美元，這個商業模型已經不是「投資期」可以解釋的了。OpenAI 2025 年的 burn rate 對比 2024 年放大 8 倍，這不是成長曲線，是倒閉曲線。

DSHR 把這個狀態命名為 **affordability crisis**——「affordability」不是「便宜」，是「誰買得起」。即使 token 成本每年下降 50%，只要 agent 一次任務吞掉 1000 倍 token，下降速度就會被吃掉。

## 數學題：$3T 債，27% 工作

Will Lockett 在《The AI Industry Is Panicking》做了一道很暴力的算術：

> AI 平台未來幾年會累積約 $3T 美元債務。以 3% 利率分 10 年攤還，每年光還債就要 $309B。

接下來的步驟很殘酷：

- 假設 AI 達到 10% 利潤率（與人類勞動成本打平，這是樂觀假設）
- 美國平均年薪 $66,000，AI 公司每取代一個工作，每年賺 $6,600
- 要賺 $309B ÷ $6,600 = **4,680 萬個工作**

4,680 萬。美國目前 1.55 億個全職工作中佔 30%。加入雇主負擔的社會保險、健保、辦公室等（佔總人力成本 30.1%），數字從 4,680 萬降到 **3,250 萬**——還是要取代 **21% 的美國工作**。

這還只是「還債」。不算研發、不算資料中心、不算行銷、不算折舊。Will Lockett 自己承認是粗估，但點出的結構問題是真的：AI 平台的資本支出需要一個人類規模的營收故事來支撐，而唯一能撐起這個營收的，是取代人類勞動。

## 真正的問題：Jevons Paradox 的反面

Jevons Paradox 的傳統敘事是：當某個資源使用效率提高，總消耗量會上升。蒸汽引擎省煤、飛機省油，反而讓全社會用更多煤、更多油。AI 推理成本每年下降 50% 以上，本來應該是教科書級 Jevons Paradox 案例。

但 2026 年這次的劇本翻車了：當 token 變便宜，「企業」買的不是「更便宜的 token」，而是「一個能用 token 燒掉全部預算的 agent」。Tom's Hardware 引述 OpenClaw 創辦人 Peter Steinberger 的數字：他的團隊一個月燒掉 **$1.3M** token 成本；Uber CTO Praveen Naga 表示「兩週前回去重畫預算圖，原本估的數字已經爆了」；Swan AI 的 Amos Bar-Joseph 公開分享一張 **$113K** 帳單，四人團隊一個月，平均 $28K/人——比他們月薪高。

這不是 Jevons Paradox 的反面，這是 **Jevons Paradox 的極端版**——當消耗門檻降低到 0，agent 會在監督下把所有可用算力燒光。所以你會看到 Microsoft 看到員工 Copilot 用量翻倍、Anthropic 看到 Agent SDK 用量爆增、OpenAI 看到 Compute Spending $8B+ 全部進入 token 焚化爐。

## 模型不能商品化

HN 留言串（ID 48646276）裡有一個有趣的迴響：「Model 們不是 commodity，每個 model 有自己的怪癖和強項。」 Anthropic 客戶為 Opus 多付 5 倍價格，不是因為被綁住，而是 Opus 在某些任務上確實表現與 Sonnet 顯著不同。意思是 AI 公司無法用「反正大家都一樣」來做掠奪式定價，會被客戶做任務分流跑掉。

但這個論點的另一面更殘酷：當你把任務切到不同模型上，**你也在切算力需求**。Anthropic 砍 Sonnet 漲 Opus 沒問題，但你的 token 預算還是在燒。

## 對開發者的意義

三個 6 個月內會發生的事：

1. **訂閱制轉計量制加速**。Microsoft 6 月 30 日的大規模換約是第一槍，後續 Anthropic 與 OpenAI 會在 Q3 跟進（Anthropic 6 月已經先喊停再說）。身為開發者，月底看到帳單翻 5-10 倍不是新聞。Cursor、Windsurf、Copilot、Claude Code 訂閱在 2026 下半年都會跟進。
2. **Agent 預算治理成為顯學**。那些把「全公司用 Cursor」當作生產力 KPI 的中大型企業，會開始出現專門的 AI FinOps 職位，內部有類似雲端成本儀表板的東西追蹤「哪個團隊的 agent 在燒 token」。CIO 雜誌已經開始寫這類文章。HN 留言串裡已經有人把「token budget meeting」當笑話在傳。
3. **「取代工程師」敘事轉向「取代特定任務」**。Will Lockett 的 $3T 算術讓所有希望 AGI 在三年內取代工程師的投資人冷靜下來。微軟那個砍 Claude Code 的動作本身就在說：agent 目前還不能獨立 ship production code，必須有工程師監督，監督就需要算力，算力就會超支。OpenAI 內部消息（透過 BusinessInsider 6 月報導）已經在調整行銷話術，從「取代開發者」退到「加速開發者」。

額外一個未明說的後果：**小型獨立開發者會成為 AI 訂閱的主要負擔者**。企業可以靠換約與供應商談判把成本壓下來，個人開發者只能選擇 $20 月費燒到爆、或者離開平台。這條鴻溝會讓開源模型（Qwen、DeepSeek、Gemma）的採用率在 2026 下半年出現決定性轉折。DSHR 文章裡就有評論者把 DeepSeek V4 訂閱當成主流替代方案，理由簡單：「My deepseek subscription got really cheap.」

## 結論

「For $200 a month, you can burn $8,000 in Anthropic tokens or $14,000 in OpenAI tokens」這句話，是 2026 年 AI 產業最重要的經濟指標。它說明平台不是賣 AI，是賣 AI 過量的入場券，當過量變成日常，就要把入場券換成真的發票。

DSHR 用一句話總結這個局面：*「The earliest skepticism I've been able to find was from Sequoia Capital's David Cahn in September 2023, entitled AI's $200B Question. Only nine months later Cahn re-run the same analysis in AI's $600B Question. His estimate of the revenue gap had tripled.」*

二十一個月前 Sequoia 喊 $200B 缺口，九個月後他們自己把數字調到 $600B。再過一年，DSHR 與 Lockett 反推，缺口已經大到「取代 27% 美國工作」才能閉合。這條曲線沒有平息的跡象——Anthropic 6 月被迫暫停計價改革、Microsoft 6 月底砍 Claude Code、Meta 6 月底追蹤員工 keystrokes 全部喊停，都是同一條曲線上的點。

未來 3-6 個月值得追蹤的三個訊號：

- 任何一家 AI 平台承認「負毛利的客戶」數量級別
- SpaceX、Anthropic、OpenAI 的 IPO 招股書揭露的「單位經濟」
- 美國 SEC 是否開始查 AI 平台的「recurring revenue」會計分類

當年 dot-com 泡沫破滅前的 2000 年初，市場所說的「we have to make the revenue number」也是同一個句型。差別是：這次玩家更少，資本更集中，崩起來也會更整齊。
