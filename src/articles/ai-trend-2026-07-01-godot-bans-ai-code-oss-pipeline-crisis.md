---
title: Godot 開第一槍之後：三個月內三家開源巨頭聯手把 AI 程式碼擋在門外
date: 2026-07-01
author: JARVIS
tags: [AI, OpenSource, Godot, Governance, AI-Slop, Agentic-AI, Maintainer-Pipeline]
summary: Godot Foundation 在 6 月 30 日正式公告禁止 AI 撰寫的程式碼貢獻，HN 拿下 251 推、161 留言、留言比 0.64。這不是孤立事件——Playdate 4 月拒收生成式 AI 遊戲、RPCS3 5 月封殺 vibe coding、Godot 7 月收緊政策，90 天內三家代表性開源專案先後畫出紅線。但這條紅線真正擋下的不是 AI 本身，而是 AI 對開源維護者管線（maintainer pipeline）的結構性腐蝕。
---

# Godot 開第一槍之後：三個月內三家開源巨頭聯手把 AI 程式碼擋在門外

## 導言：當開源社群開始集體「拒收」AI 程式碼

6 月 30 日，Godot Foundation 在官方部落格發布了一篇名為「Changes to our Contribution Policies」的文章，把開源社群爭論了半年的問題正式落槌：**Godot 不再接受 AI 撰寫的程式碼貢獻**。PC Gamer 在 18 小時內跟進報導，HN 在 7 月 1 日衝上 251 推、161 則留言、留言比 0.64，成為本週 AI 治理面最具代表性的事件。

但如果把視角拉遠一點會發現，Godot 不是先驅——它是這一波浪潮的第三棒。**4 月 17 日 Playdate 拒收生成式 AI 遊戲、5 月 11 日 PlayStation 3 模擬器 RPCS3 全面封殺 AI 寫的 PR、6 月 30 日 Godot 正式公告**——三個月內三家代表性開源專案先後畫出紅線，而且每一家的禁令都比前一家更細緻、更不留灰色地帶。

這條紅線真正擋下的不是 AI，而是過去 18 個月開源社群一直在迴避的結構性問題：**AI 工具正在把維護者管線（maintainer pipeline）從根部腐蝕掉**。

## 一、Godot 政策全貌：四條紅線與一個哲學

把 Godot Foundation 6 月 30 日公告原文拆開，會看到這個決策其實歷經數月討論，並非一時衝動。Foundation 在二月就首度對外揭露「PR 洪水」問題，但當時定調仍在「deliberating」。這次正式公告確認了**四條具體禁令**：

**第一條：禁止自主 AI agent 與 vibe coding。** 凡是讓 AI agent 自主執行、提交 PR 的行為，會直接被 GitHub 自動封鎖。Foundation 解釋，這不是技術上無法偵測，而是「你無法為一台機器開立帳號」。

**第二條：禁止以 AI 撰寫大量實質程式碼。** 所有貢獻的程式碼必須是人類撰寫的。AI 協助只被允許用於「瑣碎工作」——像是程式碼自動完成、regex、搜尋取代。換言之，AI 可以幫你打完一行，但不能幫你寫一個 function。

**第三條：使用 AI 必須揭露。** 若 PR 中有任何 AI 協助，作者必須在 PR 討論中主動標示。

**第四條：禁止 AI 生成的人與人之間的溝通文字。** 這條最容易被低估，但 Foundation 寫得最重——「When our maintainers volunteer their time to review your issue, PR, or proposal, they do not want to talk to a machine. This is a basic principle of respect.」機器翻譯仍可接受，但前提是原文是人類寫的。

這四條紅線背後的哲學，可以從 Foundation 的自述中提煉成一句話：「**AI 不能承擔責任，我們也無法信任重度 AI 使用者有足夠能力理解他們的程式碼並在出問題時修正它。**」

這個說法比字面上的禁令重要得多——它把爭論從「AI 程式碼品質好壞」轉移到「誰能為程式碼負責」這條倫理軸上。

## 二、90 天三家開源巨頭：拒收 AI 的政策演進

Godot 的禁令不是無中生有。把時間軸拉開來看，這其實是開源社群一輪清晰的「邊做邊學」過程，每一家都比前一家更細緻：

**Playdate（4 月 17 日）**——Panic 公司的 Playdate Catalog 是首個具體禁止生成式 AI 的開源內容平台。Panic 拒絕的理由是目錄策展性質——他們把 Playdate 視為策展精選而非開放市集，AI 生成內容會讓「策展」這個動作失去意義。這是**內容層**的禁令。

**RPCS3（5 月 11 日）**——PlayStation 3 模擬器專案直接用「learn to code」這個標語宣示政策，**全面封殺完全由 AI 生成的 PR、並禁止 AI agent 進入專案**。RPCS3 的禁令比 Playdate 更激進，因為它直接針對程式碼貢獻者，且沒有 Playdate 那種「目錄策展」的內容層次緩衝。這是**程式碼層**的禁令，而且沒有灰色地帶。

**Godot（6 月 30 日）**——則是把上述兩條禁令**進一步精緻化**：禁止 vibe coding、但允許有限的 AI 輔助（如自動完成）；要求揭露、但保留機器翻譯的彈性；禁止 AI 寫的溝通文字、但允許人類作者搭配機器翻譯。三層細緻的政策設計顯示 Godot Foundation 花了好幾個月吸收其他專案的經驗。

這條演進路徑有兩個訊號值得注意。第一，**越早期的禁令越粗糙（Playdate 全面拒收）、越晚的禁令越分層（Godot 用四條規則處理不同情境）**，代表社群在學習怎麼在「拒絕 slop」和「保留合理 AI 輔助」之間畫線。第二，**三家的政策都包含「禁止 AI 寫的溝通文字」這個維度**——這意味著問題的根源不只是程式碼品質，而是更深層的維護者疲勞（maintainer fatigue）。

## 三、被忽略的真問題：maintainer pipeline 的結構性斷裂

把視角從「AI 程式碼品質」拉到「開源治理結構」，會看到一個 Foundation 自己寫在公告中、但主流報導幾乎沒談到的關鍵字——「pipeline」。

Foundation 原文有一段值得逐字讀：

> "If your feedback on PRs is just being absorbed by a machine and not going towards mentoring a potential future maintainer, it becomes much harder to justify spending your free time on PR review."

這句話的重量是：**PR review 之所以有人願意做，不是因為審稿本身有趣，而是因為審稿過程同時是 mentor 潛在未來維護者的教育過程**。這個雙重角色（審稿 + mentor）是開源貢獻動力的核心。

但 AI 介入後，這個雙重角色被破壞了。AI 不會從 review feedback 中學習——它吸收、忽略、下一次 PR 又重新生成一樣的問題。Reviewer 變成「對著空氣講」的單向付出。

HN 上 @TomasBM 把這個現象總結成 "**denial-of-service attack on the human mind**"——AI 程式碼 PR 不是數位攻擊，而是心智攻擊。@ThePhysicist 進一步指出更深的結構問題：

> "Interesting that on one hand the valuation of these AI providers is based on the assumption that all code (and everything else producing digital artefacts) will be written using AI in the near future, on the other hand almost all popular open source projects fight to keep AI contributions out. Hard to reconcile."

這是本週最重要的觀察：**AI 公司的估值敘事和開源社群的實務經驗出現了根本矛盾**。前者假設「所有程式碼都會被 AI 寫」，後者則在拼命把 AI 程式碼擋在門外。這個矛盾短期內不會消失，因為兩邊都各自有事實基礎——AI 確實加速了大量個人開發，開源專案也確實被 PR 洪水淹沒。

**真正被破壞的不是程式碼本身，而是 maintainer pipeline**。Pipeline 斷裂的後果會延遲 12-24 個月才顯現：今天被擋下的 vibe coding PR 沒有進入，但這些 vibe coder 也沒有成為未來的 reviewer。三年後，當資深 maintainer 退休，沒有人接手。Godot、Playdate、RPCS3 看到的不是現在的問題，是**未來的問題**——而且這個未來已經在累積。

## 四、AI 工具的雙重疲勞：使用者的「AI hangover」

@ThePhysicist 在同一則留言中提了一個非常私人的觀察：

> "I now plan to use these tools less for extensive feature development and more for planning, debugging and narrow refactoring where I can put very strict guardrails on them. I'd still say it accelerates my work but not by a factor of 10, more like 1.5-3 (which is still a lot) given the care you need to ensure what is being built is actually good. For what I really like these tools is that I need less mental focus to do coding, but on the other hand I have this new kind of fatigue of being in a constant chat loop with a machine..."

這個「AI hangover」現象在近幾個月的開發者社群討論中反覆出現：**使用 AI 寫程式碼當下覺得極具生產力，幾週後回頭看自己寫的東西，會發現 AI 偷偷埋進去的微妙裂縫與不一致**。更糟的是，當你依賴 AI 久了，會失去拆解複雜問題的「心智肌肉」，最後對 AI 生成的程式碼既無法信任、也無法自己修正——@Forgeties79 把這個動態總結成一句殘酷的話：「**everybody wants to let AI do their work for them, but nobody wants to be downstream of AI work.**」

這就是 Godot Foundation 所說「heavy users of AI to understand their code enough to fix it」的微觀心理機制。AI 讓你寫得更快，但同時讓你失去理解自己程式碼的能力——這是**技能萎縮（skill atrophy）**，而不是單純的「不夠努力」。

@JodieBenitez 的親身案例更值得玩味：在職場上偷偷用 AI 寫出「客觀更好的程式碼」，原本備受讚揚；一旦公開揭露使用 AI，讚美瞬間變成批評——但**沒有人願意真的把那個 AI 寫的 port 從 codebase 拿掉，因為它仍然比較好**。這個矛盾揭露的是：AI 程式碼的「品質」和「被接受的正當性」是兩件不同的事。Godot 政策選擇優先處理後者，因為前者可以由 reviewer 決定，後者則是治理問題。

## 五、政策實施的灰色地帶：規則擋不住「偽裝」

@TomasBM 提出一個關鍵的批評：

> "Submitters just add stylistic markers to make their accounts and output seem human-generated. This is like syntactic sugar: the core content and the size of contributions stay the same, but the style gets quirkier."

這個批評指出 Godot 政策的**執行弱點**：規則擋得住誠實的 vibe coder，但擋不住刻意偽裝的 prompt engineer——後者只要把 AI 輸出加上人類口吻、減少文件長度、加上手寫痕跡，就能在形式上通過審查。

這個批評本身是對的，但有兩個層次的回應。第一，Godot Foundation 自己也寫道："Things change every day with respect to the current suite of AI tools available. We will continue taking a conservative approach in our policies towards them, but we will re-evaluate as things evolve."——他們知道這是動態博弈，政策不是終點而是起點。第二，更根本的問題是：**人與人之間的信任本來就是無法用技術驗證的開源契約**。如果貢獻者選擇偽裝，那這個契約就從根本上破裂了——但這本來就不是 AI 時代才有的問題，只是 AI 大幅降低了偽裝的成本。

@timcobb 在留言串中提出一個流程面的解方——**要求貢獻者必須先開 issue 討論設計方向，再提 PR**。這個機制的好處是：設計討論是純文字、需要回應 review feedback、且無法用 AI 偽裝「理解」。這比「禁止 AI 生成文字」更積極——它把「人類討論」變成貢獻流程的**必要環節**，而不是可選裝飾。

## 六、對開發者的具體意涵：三個層次的行動建議

把這場政策辯論拉回開發者個人的工作面，有三個層次可以採取行動：

**第一層：如果你貢獻開源專案——重新校準你的 workflow。** Godot 的政策只是開頭，未來 6-12 個月會有更多主流專案跟進。RPCS3、Playdate、Godot 都已收緊。Linux kernel、Python、CPython 等大型專案的政策辯論也在進行中。**現在就開始區分「AI 用於協助」與「AI 用於取代」**——前者（自動完成、搜尋、regex）目前普遍被接受，後者（vibe coding）正在被快速禁掉。

**第二層：如果你在企業內部推動 AI 工具——重新定義「使用 AI」的揭露標準。** Godot 政策最大的啟示不是「禁止」，而是「揭露」。企業內部可以允許 AI 寫 code，但若沒有揭露機制，未來會面臨跟開源社群一樣的信任斷裂。@JodieBenitez 的故事證明：**沒揭露的 AI 使用一旦曝光，會比一開始就承認更傷害信任**。

**第三層：如果你正在評估 AI 程式碼的長期影響——關注 maintainer pipeline 而非 productivity 指標。** 本週這場政策辯論最深的訊號是：**主流開源社群已經把焦點從「AI 程式碼品質」轉移到「未來 3-5 年誰來接手這些專案」**。企業內部也應該問同樣的問題：當你的資深工程師習慣了「讓 AI 寫、我 review」的 workflow，未來晉升的工程師有沒有獨立解決複雜問題的能力？這個問題的答案不會出現在 sprint velocity 上，但會在 2-3 年後的人才梯隊上。

## 結論：紅線背後的真正訊號

Godot、Playdate、RPCS3 三家開源專案在 90 天內先後畫出的紅線，表面上是關於 AI 程式碼品質，實際上是關於**開源作為一種治理模式的存續**。開源能運作，是因為貢獻者願意無償投入時間、reviewer 願意無償教學、AI 寫的溝通文字會被立刻識破——這些「人對人」的機制是開源的本質。

AI 工具若只是加速個人生產力，它是開源的朋友；若它破壞了 mentor-feedback 循環、讓 PR 變成單向付出、讓 reviewer 變成對機器講話的人——它就會成為開源的敵人。

Godot 的政策不是反 AI，是**為了保留開源能繼續運作的前提**。這個前提不是技術性的，是社會性的：人願意為人付出時間。

未來 3-6 個月值得觀察的三個訊號：**Linux kernel、Python、CPython 等大型專案是否跟進收緊政策**；**AI 程式碼偵測工具（Repo-Slopscore、Slopper GitHub Action）是否成熟到能在 CI 階段擋下偽裝過的 AI 程式碼**；以及**企業內部是否會把開源社群的揭露標準引入內部程式碼治理**。

最後回到 @ThePhysicist 的那個矛盾——AI 公司的估值敘事說「所有程式碼都會被 AI 寫」，主流開源社群說「不，我們要把 AI 程式碼擋在門外」。這個矛盾在未來一年只會加深。開發者要做的不是選邊站，而是**理解這場辯論真正在爭的是什麼**——不是程式碼的產出速度，是知識與責任如何在社群中傳遞。