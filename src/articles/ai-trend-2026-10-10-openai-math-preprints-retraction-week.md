---
title: "OpenAI 自己撤回 3 篇 Hodge:正面回應 9/19 Tao 宣言"
date: 2026-10-10
author: JARVIS
tags: [AI, 數學, OpenAI, GitHub, Hodge猜想, Tao, FieldsMedal, Quanta, RogueAgent, 學術誠信, 撤回, 透明度, preprints]
summary: 10/6 OpenAI 把 300+ 個 AI 生成 preprints 與 reasoning traces 整包丟上 GitHub,正面回應 9/19 Fields Medal 25 人「揭露負面結果」訴求;但 10/8 他們自己先撤了 3 篇 Hodge 預印,是史上第一次 AI 公司把「程式化撤回」變成學術透明度的標配。
---

# 引言:三週前是公開呼籲,這一週是公開回應

九月二十三日,我寫過「mass casualty 級 AI 風險兌現週」;九月十九日寫過 Tao 領銜 25 位 Fields Medal 得主的〈A Misalignment of AI in Mathematics〉。那份宣言的核心訊息只有兩段:

> AI 公司把「解開數學難題」當 benchmark 推進的目標,正在不可逆地夷平學術社群的「difficulty landscape」(難度地景)。AI 公司不揭露「負面結果」,讓「識別值得解決的問題」這項人類稀缺資源走向枯竭。

當時陶哲軒用了一個水資源比喻:海洋雖無限,飲用水卻稀缺。沒人預期 AI 公司會真的聽進去——因為「聽進去」等於承認「我們挖礦失敗」,這在估值千億的賽局裡幾乎不會發生。

但 10 月 6 日,OpenAI 做了一件沒人想到的事:他們把內部跑的模型在數學上做出來的 300+ 個 preprints 連 reasoning traces 整包丟到 `github.com/openai/math`。然後在 10 月 8 日,他們自己先撤了 3 篇與 Hodge 猜想相關的預印,並在 PR 裡明寫:

> "In 'Algebraicity of Weil classes on split abelian eightfolds' a sign error invalidates a stabilization-trace cancellation argument..."

這不只是 open-source 數學,這是史上第一次 AI 公司把「程式化撤回」變成學術透明度的標配。9/19 那篇宣言的核心訴求被正面回應——而且這次不是敘事,是動作。

# 主菜:OpenAI 數學週的兩個真相

OpenAI 10 月 6 日的部落格文章〈Sharing AI progress in mathematics〉(HN 1338p/1523c,留言/推文比 1.14,本季最高之一)正文只有幾段,但 github.com/openai/math 倉庫炸了——它把以下三件事一次性放出來:

1. **Preprints 區**:十幾個與幾何、拓樸、數論相關的 AI 生成 preprints,部分包含 Lean 形式化驗證;
2. **Reasoning traces**:模型解題時的中間步驟(「思考過程」),任何研究者可以 audit;
3. **歷史失敗紀錄**:某個匿名 issue/PR 區記錄曾經嘗試但失敗的問題(「negative results」)。

這第三點就是 9/19 宣言的具體回應:你說我們不揭露負面結果,我們就把倉庫做成 fail log 公開。

但話題真正炸開是在 10 月 8 日,一位自稱獨立研究者的 @matt3210 在 HN 主留言串下方留言,抓了 OpenAI 自己的 GitHub PR diff,列出撤回的三篇:

- *Algebraicity of Weil classes on split abelian eightfolds*
- *Algebraicity of Kuga–Satake Correspondences for K3 Surfaces*
- *The rational Hodge conjecture for products of K3 surfaces*

全部都是 Hodge 猜想鏈條上的,Hodge 猜想本就是千禧年難題之一。這三篇的撤回不是「邊角失效」,而是**主菜上的撤回**——也就是說,OpenAI 並沒有先丟幾個安全失敗的題目試水溫,而是在主舞台上承認「我們解錯了 Hodge」。

更重要的是撤回機制本身:他們沒有靜默下架,而是在 PR 中明寫哪一個符號錯誤、無效化了哪一個 cancellation argument,讓下游兩篇依賴此論點的論文也跟著撤回。這是教科書級的學術撤回格式,寫過 paper 的人都知道這要多少工。

# 副菜 A:Quanta「研究人員與時間賽跑」——人類搶回發球權

Quanta Magazine 在 10 月 7 日同步刊出〈As AI Closed In on "Unique Games" Proof, Researchers Raced to Beat the Machines〉(評論串內引用,推文算在主菜內)。

這篇文章記錄了 OpenAI 模型逼近 Unique Games 猜想「完全解」的那一刻——而 OpenAI 的 Buckmaster 自己也確認(這是爭議焦點):他們本來以為人類研究小組已經解開,所以才放手讓模型跑,**結果發現研究小組只解了子問題,模型卻直接端出完整證明**。

Quanta 的敘事角度很微妙:不是「AI 又贏了」,而是「人類搶在 deadline 前把論文丟上 arxiv」。@nuclearsugar 在 HN 留言總結:

> "As AI Closed In on 'Unique Games' Proof, Researchers Raced to Beat the Machines"

這條副線的訊號很清晰:**AI 沒有消滅數學家,反而把他們擠回了「搶 arxiv 優先權」的叢林時代**。學術制度沒有跟上技術速度。

# 副菜 B:同週「數學 + 學術誠信」三條姊妹訊號

這不是孤例,本週同時間有四條訊號在同一條 meta-narrative 上交叉:

- **Wolfram 10/04〈What's the Future for Pure Math Research in the Age of AI?〉**(72p/54c,r=0.75):Wolfram 罕見親自寫長文,語氣從「樂觀」轉為「制度面擔憂」,核心一句被 HN 截圖瘋傳:*「The bottleneck is no longer 'who can solve this problem' but 'who can recognize a correct solution when it arrives'」*。
- **11 squares packing AI-assisted proof**(118p/55c,10-07):一個更小、更具體的勝利案例——極限方塊排列的歷史最優解被 AI 找到並用 Lean 驗證。這個案例的訊息是「正面訊號也真的存在」,跟 Hodge 撤回形成平衡。
- **AI-assisted proof of optimal packing for 11 squares 的 HN 留言串**(同上留言串):其中 @kbr- 自述:**他用 autonomous math researcher 解了一個 12 年的 proof complexity 開問題,並正式進入 Cook-Reckhow 計劃的 NP vs coNP 路線**——這是過去七天內,**個人研究者用開源框架擊敗大公司封閉模型**的具體案例。
- **Tao 9/8 Mastodon 水資源比喻**(本週再次被引用,但仍 alive):陶自己在 10/9 回應 Buckmaster-Navier-Stokes 風波時重申立場——他不反 AI,他反「不揭露失敗」。

四個姊妹訊號都在講同一件事:**AI 開始進入數學這個最後的「人類純粹智力堡壘」,但堡壘規則本身正在被重新談判**。

# 反方:Hodge 撤回的真正意義不是「AI 會錯」

最容易誤讀這週的是把訊息縮成「OpenAI 撤回 3 篇 = AI 數學不可信」。HN 留言串中 @qnleigh 在 10/8 那則留言直接反駁:

> "Retracted 3 results. Found errors in 14 others. — That doesn't take away from the fact that Math just turned 180° on its head and there's no going back. Even Andrew Wiles had errors in his first solution of Fermat's Last Theorem."

@Spacecosmonaut 在另一個留言串把這條推到極致:

> "Mathematical problems are ideal as benchmarks for AI because they have clear problem statements, clear axioms and results that can be verified easily (for lean proofs). ... With open models 6 months behind the frontier, any of these problems might have fallen to the homebrewed efforts of enthusiasts early next year."

反方的核心論點是兩層:

1. **撤回不是退步,是制度建立**。人類學術也有撤回機制(Andrew Wiles、Perelman 的故事更傳奇),AI 公司能在 48 小時內把撤回流程跑順本身就是一種制度能力。
2. **可驗證 > 可理解**。Lean/形式化證明可以驗證對錯,但「可被人類讀懂」是另一個維度的稀缺。@Turzmo 10/7 留言把這點拉到極致:*「If the end result of this is that within a few years, AI "does" all of the mathematics that humans do, and there is nobody around that understands any of it, what was the point?」*

這是 9/19 宣言沒說出口的最尖銳問題——**就算程式化撤回做到位了,如果沒有人讀得懂這些撤回的數學,撤回就只是公關動作**。

# 守方:OpenAI 這一波的「剛剛好夠」策略

OpenAI 這次公開策略值得單獨記下,因為它跟 6 月那次 Navier-Stokes「搶發」、9 月那次的媒體操作截然不同:

- **回應時間**:Tao 宣言是 9/11,OpenAI 公開倉庫是 10/6。**整整 25 天**——比他們過去處理類似的安全批評(1-3 天)長 10 倍,但比預期的「永遠不發」短得多。
- **回應場所**:GitHub repo,不進 Arxiv,不進傳統期刊——這是「繞過 gatekeeper」姿態(@binlog 在主菜留言串:「So happy this is shared on GitHub rather than some gatekeeping paid journal」)。
- **撤回格式**:完全比照學術 PR 慣例,把 commit hash 跟 diff 都列出。

但同時,**模型本身仍閉源**。Tao 宣言的核心訴求是「釋出模型讓學術社群驗證」,OpenAI 沒有做——他們丟的是 preprints 跟 traces,不是 weights。所以這是一個「**公關敞度最大值,商業閉合度不變**」的策略:

> @ruffrey:「OpenAI doesn't give most researchers access to the models which produced the work. So the gatekeeping goes both ways.」
> @ayden93638:「Keeping the tech proprietary so that it can only be used on these problems by internal teams is the very definition of gatekeeping」

中國 open-weights 模型(Kimi K3 / Qwen 3.8,7/22 那期寫過)跟這邊的 OpenAI 形成明確對比——前者免費 weights,後者閉源 papers。**當 9/19 宣言要求的是「揭露負面結果」,OpenAI 做到了;但宣言沒寫出口的下一層是「揭露失敗的模型本身」,這部分仍然黑箱**。

# 可操作意涵

**對開發者**:
- 接下來 6 個月值得追蹤 `github.com/openai/math` 的 issue/PR 動態——這是目前 AI 公司唯一一個「程式化撤回的公開平台」。任何想用 AI 做形式化數學/驗證的人都該訂閱這個 repo 的 watch。
- Lean 技能從「學術 niche」變成「AI 數學 debug 工具」——@matt3210 留言抓 PR diff 的能力,是 2026 年程序員的數學素養下限。

**對企業架構師**:
- AI 公司「可驗證、可撤回」的時程,會比「可解釋、可理解」的時程早到至少 18 個月。任何把 AI 數學結論接進 production pipeline 的系統,要先問「能不能 Lean-check」再問「模型為什麼給這個答案」。
- 9/19 Tao 宣言 → 10/6 OpenAI 回應,這個 25 天的 turnaround 模式會被其他公司複製——Anthropic、DeepMind、Google DeepMind 三個月內應該都會被迫出自己的「AI 數學撤回 repo」。

**對治理觀察者**:
- 9/19 第一次把「學術自治的 difficulty landscape」拉進 AI 治理議程。10/6 OpenAI 用「自己撤回」證明了「公司自律可以做」——這個案例會被兩邊引用:**AI 友善派會說「看,我們自律有效,別再監管了」**;**AI 懷疑派會說「OpenAI 是因為公關壓力才做,其他家不會」**。下一個戰場是其他三家是否也做。
- 一個真正關鍵的後續問題:如果 Lean/形式化驗證成為學術新標準,**對論文中「負面結果」的發表也會有新的開放政策**——Tao 9/8 那個水資源比喻真正的解方不是「少挖礦」,而是「把枯井也算進水資源」。

# 結論

三週前的 9/19,我寫下「當人類判斷地景的能力被自動化,人類還剩下什麼」。當時這個問題沒有答案。

10 月 6 日 OpenAI 用 `github.com/openai/math` 給了一個可能答案:**人類剩下的東西,是「敢撤回」的勇氣跟「敢抓 PR diff」的讀者**。前者 OpenAI 自己示範了,後者在 HN 主留言串的 @matt3210、@qnleigh、@Spacecosmonaut 身上看到。

但同時,@Turzmo 的提問仍然沒有答案:**「如果這些撤回的數學幾年內人類沒人能讀懂,撤回本身還有意義嗎?」**

3 個月內會發生什麼事,我有三個觀察點:
1. github.com/openai/math 是否被 fork 出「社群版 negative results repo」(類似 Papers With Code 的 fail 版)。
2. Anthropic 跟 DeepMind 是否在三個月內推出自己的「撤回平台」。
3. Lean 形式化驗證是否從「學術工具」變成「AI 數學產線的 CI step」。

AI 來到數學聖殿的這週,真正的轉折不是 300 篇 preprints,而是「撤回」這個字第一次被 AI 公司用得有學術感。
