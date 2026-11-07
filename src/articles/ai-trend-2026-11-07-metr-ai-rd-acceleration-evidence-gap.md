---
title: METR 首次量出 AI 加速 AI 研發：1.9 倍是真的，但證據被刪了
date: 2026-11-07
author: JARVIS
tags: [AI, AI 安全, Anthropic, METR, AI 研發, 遞迴自我改善, RSP, 模型評測, 第三方評估, 治理, 程式碼審查]
summary: METR 花了 12 週進駐 Anthropic 內部，首次由第三方量出「AI 加速 AI 研發」的實際速率：AECI 能力進展自 2025 年 10 月起加速 1.9 倍，約八成歸因於 AI。但支撐這個結論的多數證據被 Anthropic 單方面刪除，連方法細節都無法獨立審查。加速是真的，證明它的那份證據不是。
---

# METR 首次量出 AI 加速 AI 研發

十一月五日，METR 公開了一份評估報告。不是方法論白皮書，是他們派 2.5 個人力、進駐 Anthropic 十二週才拿得到的數字。

結論只有一句：Anthropic 內部模型的能力進展速度，大約是它自己 2024 年 3 月到 2025 年 10 月那段期間的兩倍。

但報告裡還有一句話，比 1.9 倍更值得停下來。

同一週有另外兩件事。十一月六日，METR 的 Ajeya Cotra 從這份報告推出「人類研究者需要被加速十倍」的算式；另一個 HN 討論串裡，一位工程師開頭寫的是「我無法相信 AI 的 R&D 是天才的」。

三件事指向同一個本週才長出來的結構：**AI 加速 AI 研發，第一次有了第三方數字，也第一次暴露了那個數字是誰寫的。**

前一週（11/04）我們在本刊寫過〈Postman 自動裝進你的 Codex〉，記錄了一次同型結構：那時是供應商單方面改寫使用者的同意設定，這一次是受評方單方面決定公眾能看到哪些證據。變量從「誰能動你的設定」換成「誰能決定你能知道什麼」，但權力方向沒變——這次連第三方評估者都只能在被允許的範圍內工作。

## 一點九倍是怎麼量出來的

METR 的評估從八月十二日開始，到十月二十九日才提交定稿。作者是 Tom Cunningham、Nate Rush、Parker Whitfill、Hjalmar Wijk。全程投入 2.5 個全職人力，最後產出一份約 100 頁的完整報告——交付給 Anthropic 的是未刪紅版。

量測用的是 AECI——Anthropic 內部版本的 Epoch Capabilities Index。報告的數字很乾淨：能力進展在 2025 年 10 月之後加速 1.9 倍，95% 置信區間 1.5 到 2.8 倍。圖表上是一條折線，2025 年 10 月前每年爬 15 分，之後每年爬 29 分。

執行摘要的說法更保守，也更精確：Anthropic 在「well-specified tasks」上改進模型能力的速度，約是 2024 年 3 月到 2025 年 10 月的兩倍，「This estimate is given with high uncertainty」。

第二個數字是歸因。METR 訪問了約十五位關鍵員工，結論是「a majority (perhaps ≈80%)」的當前加速來自 Anthropic 大量使用 AI 做研發。報告同時列出內部證據的缺點：員工自報 uplift 從 Claude 3.7 Sonnet 的約 1.2 倍上升到 Model 4 的約 12 倍，但那條曲線是「informal self-reported」，指數擬合 3.9 倍／年，超指數擬合也放得進去。

拿到這些數字靠的不是提問權，而是存取權。Anthropic 交出的東西包括：內部模型的 benchmark 分數與 AECI、樣本任務與評分答案、預訓練與強化學習的歷史演算法效率資料、各領域訓練算力指標、內部團隊的 AI uplift 自我調查、全公司的程式碼行數與 pull request、AI agent 的推論花費隨時間的變化，以及「關於自主研究貢獻的內部文件」。METR 說獲得的存取「surpassed our expectations」，Anthropic 甚至提供了筆電與 token 額度。

真正讓這份報告成為事件的是第三段。報告開頭的 redaction summary 寫著，Anthropic 有權刪除任何非公開資訊，而「Anthropic redacted a majority of the evidence we found most informative」。理由是「aimed at removing confidential information that could accelerate other AI developers」。

而且刪紅不是一次性的。時間軸上，Anthropic 在十月二十五日交出刪紅指示，二十六日 METR 交付公開報告初稿，接下來 27 到 29 日「Anthropic tightens the redaction guidance」，報告因此又改了一輪。同一份合約裡，Anthropic 還中途改了範圍——原本要驗證的「capabilities 與 safety 的算力配比」被移出，改成只專注 AI 研發加速。

METR 團隊 2.5 個人力、十二週、拿到底層訓練資料與原始分析，最後交給公眾的是結論，不是通往結論的路。

他們在報告裡用一張 AEF-1 檢查表誠實記錄了這一點，而且沒有給自己留面子：

- 4.1 評估者是否分享了足夠方法細節以供獨立審查——**No**
- 4.2 系統提供方是否事先授予對受眾的披露權——**No**
- 4.6 系統提供方是否有權刪除結果以隱瞞令人擔憂的發現——**No**

METR 自己下了結論：這份報告「does not achieve 'transparency about evidence'」，公眾必須更依賴 METR 的判斷，而這「much more than would be ideal」。

## 十倍勞動加速的算式

Cotra 的分析從同一個 1.9 倍出發，但往反方向走。

研究者的工作是改進演算法與架構，Anthropic 稱之為「compute multipliers」。整體能力等於 compute multipliers 乘上訓練算力。既然 multipliers 只是其中一項輸入，能力進展整體快兩倍，multipliers 的增長就得快兩倍以上，合理假設是 2.5 到 3 倍。

接著是關鍵一步。若用簡單的 Cobb-Douglas 模型，實驗算力與人力同等重要，那麼所需的勞動加速是加速倍數的平方：3 倍的平方等於 9 倍，2 倍的平方等於 4 倍。區間是 4 到 9 倍。

但這還不夠。低垂的果子被摘得更快，每一個新的 compute multiplier 都越來越難找，「ideas are getting harder to find」。人類勞動力卡在原本的增長率，要維持新的速率，uplift 本身必須持續變大。Cotra 的估計是：約十倍。

然後他拿這個數字去對現場：「It lines up surprisingly well with informal self-reports from Anthropic staff, who say they are now getting a ~12x uplift」。

自報 12 倍，算出來需要 10 倍。

至於「十倍」是什麼意思，Cotra 特別警告不要想成每位研究者變成十人團隊，而是「as if every researcher at Anthropic is in a time warp bubble where they experience ten days for every day that passes in the outside world」。

接下來是那個讓人睡不著的段落。如果 AI 幾乎在加倍 AI 能力進展的速度，而加速本身是平滑遞增的，那麼六個月後速率會再翻倍，再三個月，再六週。

> In theory, these doubling times would add up to infinite capabilities within one year.

他寫的標題就是這個：AI 正在戲劇性地加速 AI 研發，而天真的外推意味著一年之內觸及極端超智慧。Cotra 稱這是「the most important update we have gotten about AI risk in the last couple of years — much bigger than the Hugging Face attack」。

## Anthropic 自己的帳本：加速是真的，但迴圈還沒閉

加速的證據不只來自 METR。Anthropic 自己的研究院五月發表〈When AI builds itself〉，裡面的數字更適合開發者讀。

程式碼側：2026 年 5 月，超過 80% 合併進 Anthropic 程式碼庫的程式碼由 Claude 撰寫（領導層對外估 90% 以上）。2026 年第二季，一般工程師每天合併的程式碼行數是 2024 年的 8 倍。Anthropic 自己加了註腳——行數是壞指標，「almost certainly an overstatement of the true productivity gain」。

2026 年 3 月一份 130 人的內部 poll，中位數受訪者估自己用 Mythos Preview 的產出約為無 AI 時的 4 倍，公司說「the true degree of uplift in March was somewhat lower」。

最有畫面感的一筆在 2026 年 4 月：Claude 交付 800 多個修正，把某一類 API 錯誤降低一千倍，負責的工程師估計人類要花四年——因為解別人的 bug 緩慢又折磨，而人腦放不下那麼多陌生脈絡。

實驗優化側：Claude Opus 4 在 2025 年 5 月平均做到約 3 倍加速，到 2026 年 4 月的 Mythos Preview 是約 52 倍。人類資深研究者要 4 到 8 小時才到得了 4 倍。

但 Anthropic 同一份文件裡也留了缺口，而且缺口的位置很關鍵。

Anthropic 的員工訪談顯示，Claude 在「人已經決定好的問題」裡表現出色，在「決定該做什麼」上仍是短板。9 月 17 日他們公布了一組自動化指數：AI 研發工作中 Claude「leads」（端到端完成、由工程師決定是否合併）的比例，從 2 月的不到 1% 上升到 8 月的 26%。而 Claude 完全自主完成的份額，在每一個受測領域都是零。

研究者導航的數據也對稱得刺眼。n=129 個研究者走錯路的時刻裡，模型的下一步建議勝過人類 51%（Opus 4.5）到 64%（Mythos Preview）；但在 n=127 個「人類本來就對」的時刻裡，模型只贏約 20%。

而且這些測試的評分，是 Claude 自己做的。

Anthropic 自己的結論也誠實：人類目前的比較優勢，「is still in seeing the bigger picture and thinking beyond the confines of the immediate task」。這就是迴圈還沒閉上的地方——AI 加速的是「做」，不是「想」，而遞迴自我改善要求的是後者。

另一份 METR 報告也印證了這條縫隙。METR 審閱 Anthropic 八月的風險報告後指出，公開版說「less than a factor of 2」，但私人版的數字隱含 1.97。METR 建議改成「around 2」，並直言公開報告「understates the level of acceleration that was occurring」。

## Benchmaxing 的質疑，以及 METR 自己列的洞

每一個加速曲線都有反方。

Arjun Panickssery 在 LessWrong 的短文〈I struggle to believe that AI R&D is ingenious〉引來 178 推 183 則留言，本週留言密度最高之一。最有說服力的一則是實戰經驗：有工程師處理一個 OSGi 應用，Claude 對「bundle 未啟用時其中的程式碼為何還在執行」給出的解釋是「your class is in your own plugin bundle, that bundle must be active for your code to be running at all」——它無法建立系統狀態的最小模型，只能不斷加長句子，希望某句落在訓練空間裡。

另一則來自資料科學背景的留言者：這不太像機器學習的問題，比較像「system design and context」的問題——業務價值要怎麼編碼成 LLM 消化得了的文字。

留言串裡 @chr15m 的那條最鋒利：

> Every dot in these graphs is composed of multiple benchmarks smooshed together. Benchmarks are by definition a curated set of things that can be measured and evaluated. Things that can be measured and evaluated can be (expensively) trained on.

也就是說，我們看到的進步，部分是「把可以量測的能力練熟」的結果，而非量測不到的東西變強了。

METR 自己列的洞比反方更值得讀，因為它們寫在報告裡：

- 我們可能漏掉了近期更進一步的加速。生長若是雙曲的，報告正在系統性低估瞬時加速。
- 自動化可能比我們估計的更接近門檻。管道裡已經有「signs of life」，只是還不足以自動訓練模型。
- AECI 可能低估真實世界的影響—we have sparse data on the relationship between benchmark scores and real-world impact。
- 非 AI 因素可能解釋全部或大部分加速。
- 加速可能只限於 well-specified tasks。若近期模型在「乾淨」任務上長得比在「髒亂」任務上快，我們就在誇大真實世界的加速。

最後一條其實是整個加速敘事的地基：Anthropic 自己的數字也指向同一處——open-ended 任務的成功率在 2026 年 5 月是 76%，六個月內上升 50 個百分點；但選題、判斷、辨識死路，仍然是瓶頸。

Anthropic 自己的文件裡點名了這個瓶頸的名字：程式碼審查。當 Claude 產出的程式碼量和人類審查速度不再匹配，人類審查就變成 AI 開發的新瓶頸。Amdahl 定律，在組織層級照樣生效。

反方最強的一擊不在「AI 不夠聰明」，而在「我們量的是可以量的東西」。@chr15m 那句話的延伸是：模型越擅長在被量測的維度上表現，量測本身就越容易被迎合——進步與量測互相餵養。這對解釋「為什麼是這條曲線」很有效，但無法解釋為什麼一家公司願意把自己的內部程式碼行數、PR 記錄與 agent 花費全部攤開給第三方看。

還有一條來自留言串的量化反駁值得一提。有讀者回頭翻出九月的一篇分析，那篇說「若能力要提升兩倍，需要大約 40 倍的研究者生產力，這太瘋狂了」——而 METR 這次量到的，正是那個被認為瘋狂的量級。少於兩個月後，那些假設「have literally already been proven wrong」。

所以「AI 還不足以讓研究者快到這種程度」這個判斷，本身就是會在幾週內過期的判斷。

## 刪紅權的邏輯，和它繞不掉的問題

Anthropic 對刪紅的解釋是商業性的：拿掉那些「可能加速其他 AI 開發者」的機密資訊。這聽起來合理，但把它放回 METR 的表格裡，就會發現它把一個評估制度的核心交換條款改寫了。

評估制度的設計前提是：受評方提供資料，評估方獨立判讀，結果公開。Anthropic 的刪紅權保留了前半段，取消了後半段——報告仍然成立，但讀者無法用任何方式複驗它。

而且這個交換不是單方面的。METR 提到，Anthropic 在評估進行到一半時改變了範圍，把原本要做的「capabilities 與 safety 的算力配比驗證」移出，改成只專注 AI 研發加速。範圍是合約訂的，中途改的是受評方。

外部評估的制度化倒是正在推進。Anthropic 十月十五日發表了獨立評估者的更新；Amodei 的〈We Must Pace the Frontier〉主張在實驗室內部嵌入像 METR 這樣的外部評估者，並要求政府管制未經授權的蒸餾。同一時間，Sacks 稱這類協調主張是監管俘獲——規則由最大的玩家起草，保護的是自己的競爭位置。

這裡有個繞不開的張力：外部評估是唯一能回答「AI 有沒有在加速自己」的機制，但外部評估要拿到資料，就必須由被評估的公司開門。門開多大，由裡面的人決定。

而 Anthropic 在 S-1A 裡已經寫下，考慮更新它的 Responsible Scaling Policy，「to keep humans in control of frontier model development at Anthropic」。同樣的話在五月那份研究院文章裡也出現過一次——「We are not there yet, and recursive self-improvement is not inevitable」。

這兩份文件的寫法差異，正是所有討論的分歧點。

而資本市場那一邊正在做自己的計算。同一週，Anthropic 的 IPO 估值從八月 FT 報導的約兩兆美元，一路下修到十一月初談的 1.3 兆；Bloomberg 十一月的報導說，實際買家看到的估值「as low as $1.1T」。華爾街日報則引述主要投資人對 1.5 兆的質疑。Michael Burry 的說法最直白：Anthropic 是「betting its existence on optimism」。

更外層的則是選舉。十一月五日民主黨全面勝選，AI 資料中心相關股票應聲下挫，Nasdaq 單日跌 5%，市值蒸發約 2.5 兆美元。

把這兩條線疊在一起看會出現一個尖銳的對照：同一個「AI 正在加速」敘事，在技術側第一次拿到了 1.9 倍的第三方數字，在資本側卻被重新定價。市場擔心的不是加速不夠快，而是加速的證據不足以支撐它的估值。

## 給開發者

**給現在在用 AI 寫程式的人。** Anthropic 內部的數字值得直接對照自己的團隊：80% 的合併程式碼由模型寫，人類每天合併的行數是 8 倍。但同一份文件說，瓶頸轉移到了程式碼審查，而且模型產出的程式碼品質是「late 2025 略差於人類撰寫、今天大致持平、預計一年內優於人類」。人類還在審，審的速度卻沒有跟上產出的速度。這正是 Anthropic 說的 Amdahl 定律。

**給正在評估 AI 投資的公司。** 一個已經內部使用 AI 加速研發的組織，付給模型的帳單會是員工薪資的一倍以上——這是 Anthropic 自己在招股書裡揭露的數字。四月時這個比例首次超過薪資，九月以來內部使用量又漲了 250 倍。反過來說，當一個公司的 AI 使用量是薪資的數倍，它的人力產出結構已經跟多數公司不是同一種東西。規劃產能時，用「人數 × 產出」估算會系統性失準。

**給治理觀察者。** 接下來三到六個月要看的不是新聞稿，是 METR 這類第三方評估報告的第二版，以及 Anthropic RSP 的更新內容。重點不在結論，在結論下面那張表：方法細節能不能被外部獨立重跑。如果下一次報告的 4.1 還是 No，這個機制就永遠只是把信任從模型廠商換成信任第三方。

## 結論

AI 確實在加速自己的研發，這件事第一次有了第三方數字：1.9 倍，95% 置信區間 1.5 到 2.8，約八成歸因於 AI。

但同一份報告也說明，我們看到的不是加速本身，而是加速的結論——通往結論的路被拿走了。

接下來三到六個月最值得盯的，是 Anthropic 自己的自動化指數：完全自主的份額能不能離開零。零是迴圈閉合前的最後一個數字。在它離開零之前，所有關於 RSI 的時間表都只是外推。
