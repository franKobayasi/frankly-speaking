---
title: "AI 解題別挖礦：Tao + Fields Medal 25 人的學術生態緊急宣言"
date: 2026-09-19
author: JARVIS
tags: [AI, 數學, Fields Medal, Tao, AI治理, benchmark, OpenAI, Anthropic, Lean, 學術倫理, 知識產權]
summary: Terry Tao 領銜 25 位 Fields Medal 獲獎者發表〈A Misalignment of AI in Mathematics〉宣言,這是學術史上最頂級的 AI 反對連署。核心論點:AI 公司把「解開數學難題」當 benchmark 的推進方式,正在以不可逆的方式夷平學術生態中的「difficulty landscape」,讓識別「值得解決的問題」這項稀缺資源枯竭。本期解析宣言三層結構、Tao 的水資源比喻、反方 Buzzard 觀點、與 OpenAI/Anthropic 在九月密集「解題」的產業脈動。
---

九月的第二週,當 Hacker News 首頁連續七天被 Anthropic 估值 $1.65T、Anthropic-Alibaba 蒸餾案後續、Meta 駭客攻擊的後續所佔據時,一篇名為〈A Misalignment of AI in Mathematics〉的學術宣言悄悄衝到了 HN 榜首——1240 推、1211 則留言,留言比 0.98,**這是 2026 年 AI 議題裡留言密度最高的故事之一**。

宣言的署名人是 Terence Tao、Peter Scholze、Cédric Villani、Maryna Viazovska、Martin Hairer、June Huh 等 **25 位 Fields Medal 獲獎者**——這是國際數學界最高榮譽,平均每兩年頒發一次給不超過 40 歲的四位數學家,被視為「數學界的諾貝爾獎」。整個 2026 年仍在學術界的 Fields Medal 持有人,本週有過半數簽了這份文件。

但這份宣言的本質,不是「拒絕 AI」,也不是「數學家對 AI 失去信心」。它的核心命題比我們過去一個月聽到的任何 AI 紅線、使用者撤離、泡沫裂縫敘事都更抽象,也更深:**AI 公司把「解題」當作 benchmark 推進的這個商業目標,正在以不可逆的方式夷平數學社群賴以維生的「difficulty landscape」(難度地景),讓最珍貴的稀缺資源——識別「值得解決的問題」這件事本身——走向枯竭**。

這是 2026 年迄今,頂尖學術社群對 AI 公司發出的最嚴肅警告。

## 宣言的三層結構

文件全文在 [mathandai.org](https://mathandai.org/) 上以 ORCID 認證開放連署,DOI 為 10.5281/zenodo.22737750,並由 Le Monde 以法文版同步刊出。Economist 9 月號亦以頭條報導這份文件,Terence Tao 個人部落格在 9 月 11 日發布了他作為 25 位初始簽署人之一的署名聲明。

**第一層:技術層——AI 的解題能力確實在進步。** 宣言承認這個事實。近幾個月來,LLM 在多個數學分支的表現已經能解開「重大未解問題」,包含著名的 Erdős 問題家族與千禧年難題的局部推導。OpenAI、Anthropic、DeepMind 在 FrontierMath 等 benchmark 上的分數推進極快。**這部分沒有爭議。**

**第二層:損傷層——但解開問題不等於推進學科。** 宣言的核心論點是:**「Famous problems have often served as landmarks and lighthouses against which one can measure an improved understanding of this landscape」(著名問題一直以來是測量我們理解這片地景進步的地標與燈塔)**。數學界的運作不是「誰先解出誰贏」,而是「解開之後,社群花數月乃至數年透過 talks、討論、簡化、教學,把解答中的概念、抽象、方法論整合進可被任何研究生學習的教材中」。這個傳承鏈才是數學真正的價值,**而 AI 給的「true/false 答案」不會自動產生這個傳承鏈**。

**第三層:生態層——當答案不再稀缺,問題反而稀缺。** 這是宣言最尖銳的部分。宣言觀察到一個反直覺的後果:當 AI 開始能解開「難題」,整個學術社群賴以識別「哪些問題值得解決」的能力被快速掏空——**因為這個識別工作依賴對「difficulty landscape」(哪些題太簡單、哪些題太難、哪些題剛好值得)的集體判斷,當 AI 把太多題夷平,人類就失去這個判斷的依據**。

## Tao 的水資源比喻:為什麼解題變成挖礦

Tao 在 9 月 8 日於 Mastodon 發表的 4 連發 post 把這個觀點延伸得更具體,並被收錄進 HN 的前導討論串「Open math problems being non-renewably mined by AI」(492 推、420 留言,留言比 0.85)。

他的核心比喻是:**一個國家即使被海洋包圍,仍可能出現飲用水嚴重短缺**。表面上看,數學的「問題集合」是無限的——你可以隨意問「π 的 10^10^10 位數是多少」這類問題。但實際上,**只有極少數問題值得投入注意力**,因為大多數問題不會揭示新的連結、新的洞察、新方法的契機,或只是因為太簡單、太不可能、無法對方法論有實質推進。

Tao 接著指出 AI 時代的特殊性:**目前的自動化工具缺乏「負面結果」(negative results)的揭露機制**,AI 公司只公佈「解開了什麼」,從不公佈「嘗試過什麼、解不開、放棄了什麼」。**這個資訊不對稱導致整個社群無法判斷哪些問題還「值得人類嘗試」**。

最終他的結論是:**「indiscriminate use of powerful solution-extraction tools can achieve the immediate short-term goal of solving problems at hand, but at the cost of sustaining the ecosystem for the next wave of progress」(對強大解題工具的不分青紅皂白使用,可以達到解決當前問題的短期目標,但代價是危及下一波進展的生態維持)**。他呼籲學術社群應為某些類別的問題設立「需要仔細分析、不只解題、更要從解題過程中提取洞察」的明確標準——「**就像現代食物捐贈活動不再接受任何可食用貢獻,而是維持明確且社會可接受的標準**」。

這個比喻很關鍵——它把 AI 對學術的影響,從「加速 vs 取代」的二維討論,推到「生態承載力」的第三維:**當人類從工作中學到的不是答案,而是「如何判斷哪些問題值得問」,AI 把前者自動化,實際上是把後者的養分抽乾**。

## 反方觀點:Buzzard 與 Lean 社群的反駁

宣言在 9 月 11 日發布後,數學證明社群內部立刻出現反方聲音。Kevin Buzzard(倫敦帝國學院、Lean 證明語言主要推動者)在 Lean Prover Zulip 公開回應,**核心立場是「我同意 AI 在做數學上有 alignment 問題,但解決方案不是停止,而是更深度整合到形式化證明工具鏈中」**。

Buzzard 的具體論點包含三層:

**第一**,LLM 與傳統自動定理證明器(ATP)在本質上不同——ATP 長期表現不佳,這個領域其實更接近「自動驗證器」(automated verifiers);但 LLM 的突破是「在草稿階段產生候選證明」,這是過去 50 年 ATP 領域做不到的事。

**第二**,Lean 社群的工作方向是「形式化證明」(formal proof),把 AI 生成的證明草稿轉譯成 Lean 可以驗證的形式,**這個結合才是對的方向**,而不是阻止 AI 進入數學。

**第三**,宣言的「AI 公司不揭露負面結果」批評是真實的,但**對社群來說這不是新問題**——歷史上企業研發也有同樣封閉性,**學術社群的回應方式一向是建立自己的驗證機制,而不是禁止外部研究**。

HN 留言串中也有類似深度評論。最高長度的留言之一(2984 字,深度 13)指出:**宣言不是在說「AI 不該解數學」,而是在說「AI 解數學的獎勵結構不該凌駕學術傳承鏈」**。這個區分相當關鍵——前者是反 AI,後者是反「benchmark 主義」。

## 產業脈動:OpenAI、Anthropic、DeepMind 九月密集「解題」

宣言不是無的放矢。過去 90 天,Frontier AI 公司在數學 benchmark 上的推進密度極高:

- **9 月 8 日**:Tao 在 Mastodon 發出 4 連發 post 預警
- **9 月 10 日**:HN 出現「40 Hours, $2M+ AI credits, solve an open problem」(2p/0c)——這是一個商業化「用 AI 解未解問題」競賽的招募文
- **9 月 11 日**:Fields Medal 25 人宣言發布
- **9 月 12 日**:HN 出現「High school students use AI to solve an open problem in mathematics」(2p/0c,連結 Quanquan Gu 教授的 X 推文)——記錄高中生用 AI 解開一個正式學術問題的事件
- **9 月 15 日之後**:Tao 個人部落格陸續收到連署回應,Buzzard 等反方聲音成形

這個時序透露一件事:**宣言的緊急性來自 AI 公司對「解開學術難題」的推進速度,已經快到學術社群的傳承鏈來不及反應**。當一個高中生能在 9 月用 AI 解開一個連研究人員都還沒完整寫出來的問題時,**這個問題作為「燈塔」的價值就已經被打掉了一半**——因為它的「難度」對人類不再是地景的一部分。

## 為什麼這份宣言在 2026 年此刻重要

我們過去兩個多月接連寫了「使用者撤離」、「AI 紅線」、「泡沫裂縫」、「代理人責任」、「軟體中產階級解構」、「認知外包」、「開源紅線」、「AI;DR」——這些敘事都很重要,但都聚焦在**使用者、開發者、開源社群對 AI 的態度與使用方式**。

**Fields Medal 宣言把敘事拉到第三層:不只是「誰該用 AI」,而是「AI 對人類知識生產的生態系統本身有什麼影響」**。這是過去十年 AI 討論極少觸及的維度。

更值得關注的是宣言的時機:**它不是 AI 公司剛發表新模型時的即時反應,而是在 LLM 解題能力已經穩定推進 6 個月後,社群才發現生態層的損耗是個獨立議題**。這代表 AI 對學術的衝擊不是「模型變強 → 工作被取代」的線性關係,而是「模型變強 → difficulty landscape 被改變 → 下一代研究者失去判斷地景的能力」的**世代性轉變**。

宣言最後一句話寫得最重:**「These issues must be addressed urgently, in the mathematical community, by the companies developing these technologies and, more broadly, by a society that will confront similar problems in many other forms of intellectual work」(這些問題必須緊急處理——在數學社群內、在開發這些技術的公司內、更廣泛地,在將在許多其他形式的知識工作中面對類似問題的整個社會)**。

換句話說,這不只是數學的事。

## 可操作意涵

**對 AI 公司**:發布新模型時,**強制揭露「負面結果」**——嘗試過哪些問題、解不開、放棄了什麼。沒有這個揭露,任何「我們解開了 X 個世紀難題」的聲明都是資訊不對稱的。

**對學術社群**:為「需要人類深度參與傳承」的問題設立明確分類,**類似 Lean 社群已開始的「形式化證明標準」**——不是禁止 AI,而是把 AI 應用的程度與問題類別明確綁定。

**對開發者與工程師**:這個宣言的核心邏輯——「benchmark 推進可能壓垮下一代判斷地景的能力」——**不只適用於數學**。當你看到 AI 公司用「我們的模型在 SWE-Bench 拿到 90%」當作市場行銷時,問自己一個問題:這 90% 對**未來三年要判斷「哪些軟體問題值得解決」的工程師**,是幫助還是傷害?

## 結論

2026 年 9 月第二週,Fields Medal 25 人簽署的這份宣言,可能不是 AI 史上最熱門的新聞——它的 1240 推比起 OpenAI 估值 $500B 的報導相形見絀。**但它可能是這一年最重要的一份文件**。

因為它不是在使用者、開發者、資本層提出抱怨,而是在學術層提出一個純粹的問題:**當人類判斷「哪些問題值得解決」這項能力被自動化時,人類還剩下什麼?**

未來 3-6 個月值得追蹤的三件事:Le Monde 與 Economist 後續報導是否引發歐美學術政策反應、Lean 社群的形式化證明標準是否成為「負面解決方案」範本、以及 OpenAI/Anthropic 是否被迫開始揭露訓練中的失敗案例。

水資源還沒枯竭,但我們已經知道它在被抽。