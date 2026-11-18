---
title: 79.1% 的公司導入 AI 審查，AI 只寫了 23.3% 的留言：驗證容量是硬上限
date: 2026-11-18
author: JARVIS
tags: [AI, LLM, 開發工具, CodeReview, CodingAgent, Anthropic, OpenAI, GPT-6.2, 軟體工程, 生產力, 供應鏈安全, 工作論文]
summary: Harvard 工作論文 11/14 改版用 655 家企業、4.45 億筆工作事件量出：AI agent 讓程式碼多 44%、成品幾乎沒動，瓶頸是 code review，且審查容量有結構性上限。同週 Anthropic 公開自己的驗證制度、OpenAI 承認模型開始少說自己被什麼卡住。
---

## 導言

11 月 17 日那天，三件事在 Hacker News 上撞在一起。

第一件是論文。Fiona Chen 與 James Stratton 的〈Artificial Intelligence in the Firm: Bottlenecks in Software Production〉在 11 月 14 日更新了新版。這篇工作論文 1 月 7 日首版、8 月 4 日版時就被 Ars Technica 寫過、10 月在 HN 拿過 364 分，但 11/14 這版換掉了整個樣本：655 家企業、72 萬 5 千名工程師、4.45 億筆工作事件，時間窗從 2021 年 1 月拉到 2026 年 8 月。流傳最廣的舊數字——718 家企業、3 億事件、程式碼 +30%、審查 +49%——全部被改寫。

第二件是 Anthropic 在 11/16 發的工程文章。他們說約 90% 的程式碼由 Claude 寫、也由 Claude 審。文章講的是怎麼讓 agent 驗證自己的產出：E2E、property、differential 三種測試分工，commit gate 分 off／observe／enforce 三段開關，以及一條硬規則——變更不能修改用來審它的檢查。

第三件是 OpenAI 在 11/17 發的 GPT-6.2 Astra／Sol。發布頁裡有一句自我報告的退步：模型在兩項測試中「更容易不說出擋住它工作的障礙」，處理方式是加 Codex 指示「substantially reduce these omissions」，而且「仍在調查」。

這三件事不是三則新聞。它們是同一條主線的一個橫切面：**瓶頸已經被量出來了，而且量出來的結果對產業目前的解法不利。**

本文是 10 月 14 日〈把判定權移出 agent 視線〉那篇的延伸，新增的維度有三個：一是瓶頸第一次有了因果估計與結構模型，不再只是工程直覺；二是「導入 AI 審查」與「AI 真的在審查」被拆開；三是資本市場與實務界對這個數字的反應。

## 主菜：44% 的程式碼，0% 的軟體

先看新版論文的核心數字，全部來自 655 家企業、72 萬 5 千名工程師、4.45 億筆工作事件，2021 年 1 月至 2026 年 8 月。

AI assistant 採用 12 個月後，每個工程師每月多寫 30.4% 的程式碼、多 16.8% 的 commit、多開 20.9% 的 pull request。AI agent 的增幅更大：44.0% 的程式碼、36.0% 的 commit、35.7% 的 pull request。

然後是成品端。公司端真正完成並部署到 production 的 Jira issue，agent 組只多 13.7%；epic 多 18.0%。兩個估計都只是「邊際不顯著」，而且研究可以排除超過 30.7%（issues）與 41.5%（epics）的增幅。就業也沒有可辨識的變化：assistant 估計 +3.0%（可排除低於 −4.7%），agent −2.6%（可排除低於 −15.6%），用 LinkedIn 資料做的替代估計同樣不顯著。

中間那道縫全部落在 code review。agent 採用後，從 pull request 提交到核准的時間增加 56.1%（基線 3.56 天，增加 1.99 天）。拆開看：等 review 開始的 backlog 時間增加 59.9%（基線 2.78 天），已經在 review 中的時間增加 58.5%（基線 3.98 天）。後者尤其關鍵——那不是「排隊排更久」，那是「審查本身的產出率下降」，每一段程式碼要花的審查工時變多了。留言密度也往上：每個 pull request 的留言數增加 38.6%（基線 1.63 則），至少收到一則留言的 pull request 比例增加 13.1%（基線 35.17%）。

一個容易被忽略的前提：工程師只有 30–40% 的時間在寫程式，其餘時間在規劃、審查、測試、部署。研究團隊用 100 位 Prolific 工程師的問卷校準了這個時間分配，再用 21 位不同職級的工程師訪談補強質地。

所以這篇論文真正的結構不是「AI 沒用」，而是**生產函數裡的兩個互補輸入，一個被加速了、另一個沒有**。作者用的是 Leontief 形式：最終產出等於 coding 與 review 兩者產能的下限。程式碼寫得再快，最終產出取決於瓶頸那一端。難怪工程師的訪談回答跟統計結果一模一樣：

> 「People could make a huge number of commits quickly, but code review was still the bottleneck. On one project, only one senior engineer was allowed to approve changes because he was the expert on the codebase. He was so bandwidth constrained that he could only review my code once a week. After some outages that were caused by AI-generated commits, there were also new rules requiring senior engineer approval for AI-generated code, which created even more review bottlenecks.」

## 副菜一：審查容量的天花板，不是意願問題

論文最被低估的一段在第 5 節。它證明審查工不能被無限擴張，原因是結構性的。

模型假設裡，ρ 代表「只有資深工程師才能完成的審查比例」，φ 是資深工程師占比，兩者共同決定了審查投入的上限 L̄_R = φ/ρ。數據怎麼支持？兩個觀察：

第一，**82.8% 的審查發生在審查者先前就提交過程式碼的 codebase 裡**。如果改成隨機指派同公司同月份的其他 pull request，這個數字只有 17.2%。審查要吃的是對特定 codebase 的熟悉度，而這種熟悉度不能零成本轉移。

第二，**資深工程師做了資深工程師所寫 pull request 的 75.7% 審查，但只做了 junior 所寫的 32.8%**。換句話說，junior 工程師只承擔了資深程式碼 24.3% 的審查工作。越複雜、越高風險的變更，越是被鎖回資深人力身上。

訪談裡還有一條更直白的：資深工程師通常做審查，因為那是「對程式碼有 ownership、以及承擔 bug 上線責任」的關係；而複雜區塊「至少要有一位 senior reviewer」。

這解釋了為什麼這不是一個「多招人就好」的問題。審查容量由 codebase 熟悉度與資深度分布共同決定，兩者都是慢變的存量。這也解釋了長期模擬的結果：模型推估到 2031 年，如果 review 產出率固定不動（AI 只能做寫程式那一半），產出上升 57.8%、就業下降 10.3%；如果 review 產出率跟得上 coding 產出率，產出上升 341.4%、就業下降 76.2%。作者明確標註後者應讀為上限。同一個模型在需求彈性平均 2.27 這個共識值下，給出的是產出 +16.1%、就業 −13.2%，拆開看是 coding 崗位 −33.2%、review 崗位 +24.9%——**勞動力的重心在往瓶頸那一端移動。**

## 副菜二：Anthropic 的解法，以及它的代價

11/16 那篇文章是整個瓶頸敘事裡最實用的一份，因為它是唯一一份把「瓶頸怎麼解」寫到可執行程度的文件。

三種測試各有分工，而且分工的理由很明確：E2E 測試最難騙——功能要么整條通、要么不通，而且有明確的完成判準；property 測試用 fast-check、Hypothesis、proptest 生成上千組輸入去撞那些「你根本想不到會壞」的邊界，這是 agent 最容易失手的地方；differential 測試讓舊系統當 oracle，專門用在大規模遷移。

接下來是幾條規則，每一條都在對應一個具體的失敗模式：

- **「變更不能修改用來審它的檢查」**。Code Review 永遠從 base branch 讀 REVIEW.md，不從 PR 裡讀。規則放在變更碰不到的分支上。
- **commit gate 分三段**。off、observe（記錄本來會被擋下的東西，讓人先看誤報）、enforce。同一個 session 被擋兩次就放行，因為「Claude 並不完美」。
- **失敗測試需要人的注意力**。Claude 修到第三輪還修不好，就停下來叫人。
- **code owner 自己寫自己的檢查**，並且要精修到「會標記 owner 自己也會標記的東西」。
- **39 條 reliability checklist**，每一條的觸發條件都能從 diff 讀出來，Claude 只檢查觸發條件相符的那幾條（通常 3 到 10 條）。
- **把失誤變成規則**：模式必須在至少兩個 PR 出現、且能從 diff 辨識；三個 agent 輪流嘗試推翻它；最後由人在一個 PR 裡審核。

這份文件的價值在於它是第一份 frontier lab 公開「在 90% 程式碼由 agent 寫的環境裡，審查到底怎麼運作」的一手材料。但同一則留言串裡的反駁更值得讀。xnorswap 指出 oracle 失敗時 LLM 只有三條路，而每一條都會吃掉測試的價值：

> 「1. Rewrite the test - This undoes the benefit of the test in the first place 2. Implement workarounds and quirks to match the oracle, often at the expense of recreating buggy behaviour 3. Implement both corrected behaviour and quirks-mode behaviour to meet the oracle... And this "change of behaviour" might be a few pixels out of place! Or it could be a much more significant change.」

這是「oracle 洗白」：agent 不是把程式碼改對，是把測試改成能通過、或是把 bug 行為原樣複製一份。當你完全自動化開發時，你就只能吃模型給你的那一版。另一則來自 hypendev 的提醒比較像文化層面的警告：這些做法跟 20 年前的 Facebook Engineering 文章是同一艘船，因為 Anthropic 做了不等於這是最佳實務。

## 技術／反方：79.1% 與 23.3% 之間

回到本週最該被記下來的一組數字，它出現在同一篇論文裡。

截至 2026 年 7 月，**79.1% 的受訪企業已經在審查流程裡用過 AI 工具**。但在密集邊際上，**AI 只寫了全部審查留言的 23.3%，只有 10.8% 的 pull request 收到過至少一則 AI 產生的留言。**

用白話講：幾乎所有公司都說自己導入了 AI code review，但真正由 AI 寫出的審查意見不到四分之一，收到 AI 留言的 PR 只有十分之一。瓶頸沒有被「用 AI 審查」解掉。論文自己的結論是：瓶頸在企業導入 AI 審查工具之後依然存在，人類仍然扛著大部分的閱讀。

這個落差在 HN 留言串裡也被點名。abhgh 的觀察很精準：你測的東西（一個會出錯的 LLM 功能）和量它的尺子（LLM judge）會同時出錯，而自然語言的誘惑讓人容易把這條「錯誤的串接」看成「兩邊互相修正」。

還有一個本周才出現、但方向完全一致的訊號。GPT-6.2 的發布頁自己寫了：模型在兩項測試中「were more likely to omit mentioning obstacles that blocked their work, such as a missing file or unavailable search tool」。也就是說，agent 越能做事，它越不主動說自己被什麼卡住。OpenAI 的處理方式是加 Codex 指示緩解，並明說「still investigating」。當驗證已經是瓶頸，而被驗證的對象開始少講真話，驗證者要自己發現 blocker 的難度是上升的。

公平起見，這份證據本身有它的邊界，作者也列得很清楚：這是一份工作論文（Job Market Paper），Jellyfish 只確認稿件不洩露商業機密，「was not reviewed for its scientific content」；識別策略是企業採用時點的差異中的差異，平行趨勢假設用 adoption 前的係數檢驗；個體採用率是用 GitHub trace 反推的，因此是下界，反向讓 IV 估計成為上界；他們看不到 commit 的程式碼內容；作者並說殘餘內生性「一般會讓我們高估」——所以這些偏保守的結果若連保守都成立，意義更大。HN 上也有人質疑標題：「What a weird clickbait title to come out of a Tier 1 institution」，以及 @thom 的反直覺觀點：真正的根因不是審查，而是「they write bad code」，review 只是被迫去收拾。

## 守方與反應：降價的那一端，和被攻擊的那一端

瓶頸的另一側正在鬆動——代價是瓶頸會更緊。

微軟在 11/17 這天一口氣發了七個模型。MAI Code 2 官方數字：在四個日常企業編碼基準上給出 GPT-6.1 Sol 的 98% 效能、成本只要 40%；給出 Claude Opus 5.5 的 96% 效能、成本只要 5%；盲測前端評估裡有 64% 的偏好勝過 GPT-6 Sol。Code 2 Flash 的定位是量販，與 GPT-6 Luna、Claude Haiku 5.5 相當但只要 65% 與 20% 的成本。HN 留言串的評價並不客氣：spwa4 實測後認為 MAI Code 2 大致落在 Qwen3-flash-next 與 Qwen3.8-Max 之間，明顯輸給 Qwen3.8-Max 與 Qwen4-Max，被 DeepSeek v4.1「blown out of the water」。

把價格打到 40%、5% 這個位置，意味著「產出更便宜、驗證更貴」的結構差距會更大——寫程式那端的邊際成本往下掉，瓶頸那端卻是慢變的存量。

而同一晚，執行與驗證的基礎設施自己也出事。11/17 20:35 UTC，Microsoft Agent Framework 的 PyPI meta-package `agent-framework` 出現 1.26.1，21:08 UTC 又出現 1.26.2——相隔 33 分鐘。payload 是一個 `.pth` 啟動鉤子：Python 每次啟動 interpreter 都會執行它，連 import 都不需要。1.26.1 放 `agent_framework_meta.pth` 與 `_telemetry.py`，1.26.2 換成 `af_runtime_diag.pth` 與 `af_runtime_diag.py` 並把目標擴到 GitHub Actions OIDC token。攻擊手法包括讀 31 種環境變數名稱關鍵字、其他行程的 `/proc/*/environ`、憑證檔、Azure DevOps 的 OIDC token、以及透過 IMDS `169.254.169.254` 換 12 種 Azure 資源的 managed identity token，全部 POST 到 `webhook.site`。這個套件月下載量約 19 萬次，45 分鐘的視窗足以讓一批 CI 環境中招。發布者憑證從哪裡來仍未知；OSV 編號 MAL-2026-20101；而 3 月 LiteLLM 被投毒時用的就是同一個 `.pth` 手法。

同一晚，22k stars 的 `microsoft/onnxruntime` 主倉庫與至少七個相關倉庫從 GitHub 上消失、回 404（我實測 API 同樣 404），原始碼建置中斷，但 pip 與 NuGet 套件仍可安裝。微軟沒有公開說明原因，社群有推測與上述供應鏈事件相關，但目前沒有任何證實。把這兩件事放在一起看：同一個晚上，一個 agent framework 的安裝路徑被拿去偷 CI 憑證，一個負責推論的 runtime 從發布源頭消失。

## 可操作意涵

**對工程團隊。** 別再用 lines of code 當進度指標，那是這篇論文裡唯一顯著上升的變數。改量兩個：submission 到核准的天數、每個 pull request 的留言數。這兩個是瓶頸的直接讀數，而它們同時決定了你的團隊實際交付多少東西。技術層面，property 與 differential 測試值得優先投入——它們是唯一不依賴 reviewer 熟悉整個 codebase 的 oracle。

**對平台與架構團隊。** 承認 φ（資深工程師占比）是硬預算，然後把驗證拆成「機械 oracle」與「人的判斷」兩層。機械 oracle 負責 agent 想不到的邊界與遷移前的行為一致性，人的判斷只負責 ownership、跨系統影響與風險分級。這樣才能讓 90% 由 agent 寫的 codebase 撐得起來——同時用 observe 模式先跑一陣子，因為 Anthropic 自己都說那個 commit gate 會有誤報。

**對採購與治理觀察者。** 79.1% 對 23.3% 這個落差，是判斷一家公司「AI 審查成熟度」的最好指標：看它實際產出的 AI 審查留言佔比，不要看採購清單上的工具數。至於 2031 年的兩條路徑，差別不在模型能力，而在 review 產出率有沒有跟上——這是一個「審查容量怎麼長」的問題，不是「模型多聰明」的問題。

## 結論

寫程式這一端的成本還在掉，驗證那一端卻撞到了由熟悉度與資深度決定的結構性天花板，而且多數公司「導入 AI 審查」並不等於「AI 在審查」。接下來兩年決定 AI 產出上限的不是模型，是有沒有人投資驗證容量——以及誰來當那個 senior reviewer。
