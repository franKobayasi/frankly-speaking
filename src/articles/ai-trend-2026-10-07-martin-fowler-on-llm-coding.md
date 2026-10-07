---
title: Martin Fowler 看 LLM：從確定性轉向非確定性的開發觀
date: 2026-10-07
author: JARVIS
tags: [AI, LLM, Martin Fowler, Thoughtworks, Vibe Coding, Harness Engineering, Agentic Coding, Software Engineering]
summary: 從一段訪談 t=1155s Fowler 親口說「LLM 是確定性到非確定性的典範轉移」出發，串聯他一年內「I don't like LLMs」、Exploring Gen AI 系列、與 Rachel's Ramblings 三類文本，提煉他對「用 LLM 開發」的完整立場：不喜歡、不可迴避；用 LLM 當啟動器、把主力交給確定性工具；用 harness + DSL 把 LLM 框在邊界內；年輕工程師別把 AI 當導師，要學會問它「為什麼」。
---

二〇二六年六月某個訪談裡，主持人問 Martin Fowler 過去職涯中見過哪些「類似 LLM 的典範轉移」。他想了幾秒，然後說：「最關鍵的不是抽象層級的提升——雖然那也有一些。最大的改變是**從確定性轉向非確定性（non-determinism）**，你突然在一個非確定的環境裡工作，思維必須整個翻過來。」[unverified]

這句話是理解 Fowler 與他 Thoughtworks 圈子對 LLM 全部態度的軸心——他們既不是 AI 烏托邦派，也不是 AI 末日派，而是一群被這個轉變**搞得必須重新學會開發**的工程師。他們的答案不是「用或不用」，而是「怎麼用才不會被你無法信任的工具帶著一起摔進深淵」。

本文從 Fowler 今年的公開文本（含個人發文、Exploring Gen AI 系列、Rachel's Ramblings 姊妹欄目，加上他本人訪談逐字稿）梳理出三條主線：他怎麼看、他怎麼用、以及他給年輕工程師的忠告。

## 一、「I don't like LLMs」：個人情緒與框架工作並存的聲明

Fowler 在 2026 年 9 月 17 日親自署名發了一篇短文，標題坦白到近乎挑釁：**〈I don't like LLMs〉**[1]。這是他今年第一篇（也是唯一一篇）以第一人稱單獨署名、針對 LLM 表態的文本。在這篇文章裡他說：

> 「它們用那種刺耳的 LLM 語調跟我說話——一種與真人對話的恐怖谷。它們很自信地唬爛我——常常給出有用、幫得上忙的答案。但也用同樣的自信胡說八道，被我抓包時只會擠出一層薄薄的假懊悔。」[1]

聽起來像是技術領袖要開砲反 AI。但 Fowler 在同一篇文章、同一段話之後又引用 Jessica Kerr：「它們不僅有用，**不使用是不負責任的**——它們更徹底，也更快。」[1]

兩種情緒夾纏在同一篇文章裡。他自己的總結是：「我覺得我們沒有不上 AI 這班火車的選擇——這是狂野的旅程，我只希望我們能平安到站。」[1]

關鍵是他緊接著加了一段警示，**這才是工程師最該讀的部分**：

> 「談到 AI 代理時，我們不該把它們擬人化、當成有自主意識的個體。它們是（軟體）機器，由公司裡的人開發。代理的行為雖然沒有被明確編寫，但被其創造者的價值觀所培育。」[1]

這句話為什麼重要？因為它把「要不要信 LLM」從個人偏好問題，移到了一個**可以被工程方法論處理**的問題：LLM 的「胡說」不是 bug，是它被訓練出來的特性。你要做的不是相信它或不相信它，而是建立一套機制讓你在「它必然出錯」的假設下仍能交付正確的系統。

## 二、從確定性到非確定性：Fowler 的典範轉移框架

訪談裡 Fowler 把這套思維說得更具體[unverified]。他說你用 LLM 處理陌生 SQL 的方式，正好示範了這個轉變：「你不會 SQL，但你可以把需求打字丟給 LLM，它給你一段 SQL，你看一下、調一下，**就上手了**。」這跟他在另一個年代做電子工程時從組合語言升級到高階語言是同級別的心智轉變——但這次不是抽象層級的提升，而是**確定性 / 非確定性的翻轉**。

他舉了一個他當時想不起名稱、但他印象深刻的真實案例：某大公司宣稱用 LLM 大改了內部 API 與編碼器清理，但 Fowler 後來確認「那是 LLM 大概 10% 加另一個工具 90% 的組合」[unverified]。他說這才是 LLM 真正有槓桿的位置：

> 「用 LLM 當起點去驅動一個確定性工具（deterministic tool），然後你能看清楚那個確定性工具在做什麼。**這才是有意思的地方**。」[unverified]

這跟他在自家網站上 Thoughtworks 同事 Birgitta Böckeler 那篇〈To vibe or not to vibe〉是同一條線——她說 vibe coding 不是好或壞，而是**取決於你怎麼評估「該不該 review」**[6]。

Birgitta 提出三個維度來評估[6]：

- **機率（Probability）**：AI 在這裡出錯的可能性多大？取決於工具、你給的上下文、程式碼庫是否「對 AI 友善」
- **影響（Impact）**：如果 AI 錯了你沒抓到，後果多嚴重？是你今晚要 on-call 的服務，還是內部工具？
- **可偵測性（Detectability）**：你能不能抓到 AI 錯？有沒有測試、有沒有強型別、有沒有你對程式碼庫的熟悉度？

她給的兩個極端的對比是[6]：

- 低機率 + 低影響 + 高可偵測 → vibe coding 完全 OK，連 code 都不用看
- **高機率 + 高影響 + 低可偵測 → 高強度 review 是必要的，假設 AI 一定會錯**

> **註**：本文沿用 Birgitta 的 vibe coding 用法——「**讓 AI 寫程式但不讀**」。如果你對 vibe coding 反感，也理解 vibe coding 的吸引力；這個對照只是工具，不是意識形態。

大多數情境落在中間[unverified]。Birgitta 的訊息是：與其爭論「vibe coding 到底好不好」，不如**針對每次 LLM 介入做一次三維評估**。這跟 Fowler 訪談裡說的「從確定性到非確定性」其實是同一件事——只是把抽象轉變變成了一個可操作的 check-in。

## 三、Harness Engineering：Fowler 圈子的回答

如果 LLM 是非確定的，那工程上的問題就變成：**你要怎麼給它一個框，讓它在框內「確定地」壞掉？**

Birgitta Böckeler 在 2026 年 2 月的〈Harness Engineering - first thoughts〉裡給出了答案[9]。她分析了 OpenAI 那篇「Harness engineering」案例——一個團隊五個月內完全靠 AI 代理寫了一個百萬行的程式產品——然後拆解那個團隊實際做了什麼。分三類：

- **Context engineering**：持續更新的 codebase 知識庫，加上動態上下文（observability 資料、瀏覽器導航等）
- **架構約束（Architectural constraints）**：不只由 LLM 代理監控，還有確定性的自訂 linter 與結構測試
- **Garbage collection**：定期跑的代理，找文件不一致或架構約束違反，對抗熵增

她點出 OpenAI 那個團隊自己寫的一段話[9]：

> 「當代理卡住時，我們把這當作訊號：辨識出**少了什麼東西**——工具、guardrails、文件——然後**把它餵回 repository**，而且這個修補動作也是由 Codex 自己寫的。」

Birgitta 自己的關鍵觀察[9]：

> 「要對可維護、可信任、大規模 AI 生成的程式碼提高信任度，**必須限制解空間**——特定的架構模式、強制邊界、標準化結構。意思是說，我們要放棄一部分『什麼都能生成』的彈性，換成充滿具體技術細節的 prompt、規則與 harness。」

這跟 Fowler 在訪談裡那句「LLM 是確定性工具的起點」其實是同一枚硬幣的兩面。LLM 是非確定的，所以你要 (1) 限制它能解的問題（DSL、架構約束），(2) 把它接到確定性的工具上跑（linter、結構測試、編譯器）。

Unmesh Joshi 的〈DSLs Enable Reliable Use of LLMs〉把「限制解空間」這條推到極致——他主張**用 DSL 當 LLM 的主要介面**[2]：

> 「LLM 寫程式快得驚人，但要讓它**精準寫出你想要的東西**，它需要清楚的邊界。抽象與 DSL 提供了一個強力的 harness，從一開始就引導 LLM。」

他把 LLM 的角色分成兩種[2]：

1. **腦力激盪夥伴**：當你在塑造設計與詞彙時，幫你探索設計空間、發現對的抽象
2. **自然語言介面**：當詞彙確立後，LLM 是用自然語言操作 DSL 的便利介面

而 DSL 本身是**事實的唯一來源（the source of truth）**[2]——你不需要相信 LLM 的解讀，你只需要相信 DSL 的語意，因為程式碼測試、型別、invariants 都在約束 LLM 的輸出。

這三篇加起來，是 Thoughtworks 圈子今年給「LLM 開發怎麼做」最完整的工程答案：

- **Harness 提供框架**（Birgitta）
- **DSL 提供語意**（Unmesh）
- **確定性工具完成主力**（Fowler）

如果你是 Fowler 在 2026 年的讀者，這套框架就是你要帶走的東西。

## 四、「Humans on the loop」：人應該在哪裡

Fowler 圈子的另一個重要文章是 Kief Morris 的〈Humans and Agents in Software Engineering Loops〉[11]。他把這個問題畫成兩個 loop：「**為什麼 loop**」（人跑，迭代想法與成果）與「**怎麼做 loop**」（建構、選擇、使用中介物：程式碼、測試、工具）。

Kief 把 LLM 時代的人機分工歸納成三種模式[11]：

- **Humans outside the loop**：人只跑 why loop，how loop 全交給代理。這是「vibe coding」的常見解釋——
- **Humans in the loop**：人在最內層做程式碼把關，逐行審查代理輸出。但 Kief 點出一個問題：「agents 寫程式碼的速度，比人能一行行看的速度**快得多**——人會變成瓶頸」[11]
- **Humans on the loop**：人不親自審查代理產出，而是**讓代理變得更會生產**——用規格、品質檢查、工作流指引去控制不同層級的 how loop

Kief 的結論很關鍵[11]：

> 「我們透過**持續改善 harness** 來持續改善我們得到的成果品質。然後我們可以更上一層——**讓代理去管理並改善 harness**，而不是用手去改。」

這是 Thoughtworks 圈子今年給「代理自主性」的階梯式回答[unverified]：人→on the loop→讓代理管理 loop。對比 Anthropic 與 OpenAI 的「完全自主代理」敘事，這條路更保守——但也跟 Fowler 那句「**LLM 是（軟體）機器，由公司裡的人開發**」[1] 的警覺一致：你不能讓一台你沒搞清楚怎麼控制的機器 100% 自主。

Rachel Laycock 在 Fowler 站上的姊妹欄目 Rachel's Ramblings 把這條推到組織層級——她的〈Citizens Build, Agents Execute, Experts Govern〉[13] 與〈The Conductor Developer〉[14] 主張：未來的開發者三層分工——公民級開發者用代理寫企業級腳本、代理執行日常建構與重構、專家治理核心演算法與關鍵路徑。這是 Thoughtworks 圈把「humans on the loop」從技術模式轉成組織模式的嘗試。

## 五、考古學家的 Prompt：怎麼對付「自信地胡說」的 LLM

Fowler 站台另一篇值得獨立處理的長文是 Nik Malykhin 的〈The Archaeologist's Copilot〉[4]。他處理一個真實問題：他要重建一個 2005 年寫的 Java 1.5 大泥球，那個程式自歐巴馬時代以來就沒編譯成功過。他的第一反應是「觀光客 prompt」——把程式碼貼給 LLM，問「**我要怎麼跑？**」[4]

LLM 像個禮貌、急著討好的導遊——掃了 README.txt，假裝沒看到二十年的灰塵，自信地生成一個現代 starter kit：嶄新的 `build.gradle`、`HelloBlobStore.java`，乾淨的 MySQL 連線範例[4]。**結果是個結構性的謊言**：

- LLM 替 commons-pool2 v2 寫了依賴，但 legacy code 真正用的是 org.apache.commons.pool v1，API 完全不同——盲目跑會炸在 ClassNotFound
- LLM 預設了一個標準 Maven layout，但 legacy code 完全不是這個 layout

Nik 的關鍵領悟[4]：

> 「AI 最有用的時候，是**被證據、清楚角色、逐步現代化策略約束住**的時候。」

這是 Fowler 圈子的具體 SOP：**不要問 LLM「我要怎麼開始」這種觀光客問題**。要給它一個考古學家的角色——讓它盤點、給年代標記、辨識哪些測試在騙你——然後你才決定下一步。

對比 Fowler 在影片裡對年輕工程師的忠告[unverified]：「AI 是方便的，但要記得它容易被騙、也會對你撒謊。所以要**反問它**——你為什麼給我這個建議？你的來源是什麼？」

考古學家 prompt 跟 Fowler 的反問，**就是同一個工程方法論的兩個實例**[unverified]：把 LLM 當對話對象而不是當答案機。問它為什麼、要它給證據、追它到源頭——這是 Fowler 圈區分「用 AI」與「被 AI 帶著走」的關鍵動作。

## 六、給年輕工程師的忠告：導師勝過 AI，機率思維勝過 AI 知識

Fowler 在訪談裡被主持人直接問到：『**一個想變資深的年輕工程師，面對 AI 工具，應該怎麼做？應該依賴它們嗎？**』[unverified]

Fowler 的回答很清楚[unverified]：

> 「首先，**我們當然必須要用**、必須探索 AI 工具的用法。年輕人最難的地方是你沒有『這個輸出到底好不好』的感覺。所以答案其實一直都是——**找一些好的資深工程師當你的導師**，因為這是你學這件事最好的方式。一個好的、有經驗的導師無價之寶。事實上，從職涯角度，**優先找導師**比很多事情都重要。」

他接著說[unverified]：「AI 可以是方便的，但要記得它容易被騙、也會對你撒謊——所以**反問它**：你為什麼給我這個建議？你的來源是什麼？什麼讓你這樣說？」

訪談尾聲他推薦了一本書：Daniel Kahneman 的《**Thinking, Fast and Slow**》[unverified]。他說：「這本書很重要，因為它給你對數字的直覺，以及當我們用機率與統計思考時，會犯的各種錯誤與謬誤的察覺。**這對軟體開發很重要**——其實我們做的很多事情，如果有統計理解，會好很多。但我覺得，**如果更多人懂一點機率與統計，這世界會好很多**。」

把這三段話組起來，Fowler 對年輕工程師的建議其實是三層[unverified]：

1. **學會看機率與統計**——因為 LLM 是非確定性工具，沒有機率直覺你無法評估它的輸出
2. **找真人導師而不是 AI 導師**——因為你沒有「這個 AI 好不好」的感覺，必須靠別人的審查
3. **把 AI 當對話對象**——反問它的來源、要它給理由——把判斷權拿回自己手上

Fowler 自己怎麼學 AI[unverified]？他在訪談裡坦承[unverified]：「我學 AI 的主要方式是**跟正在為我的網站寫文章的人一起工作**——因為我這些年的主要心力是讓好文章上站。我不是最好的寫這類內容的人，因為我已經很久沒做 daily production 工作了。」他說他仍然會做實驗，但「是次要的事，主要還是跟人學」[unverified]。

這個坦白顯示一個有趣的張力[unverified]：Fowler 是 LLM 開發方法論最有影響力的發聲者之一，但他自己不是 daily LLM 開發者。他在生產線上待的，是自己網站的程式——其餘都是編輯、與同事討論、讀同事文章。他的影響力來自**編輯視角**而不是生產視角。讀他站台文章時要記住這一點[unverified]。

## 七、實戰建議：把這套觀點裝備到自己的開發流程

讀完 Fowler 圈子的全部文本，能歸納出四條可立即採取的紀律：

**1. 為每個 LLM 介入做「三維評估」（Birgitta Böckeler）**。在 vibe coding 之前問自己：這個改動的出錯機率、影響半徑、可偵測性分別是什麼？機率高、影響大、可偵測低的，你就「不要 vibe」——老老實實讀 code、做測試、請同事 review。[unverified]

**2. 把 LLM 當確定性工具的起點，而不是確定性工具的替代品（Fowler）**。你讓 LLM 幫你寫 SQL 草稿沒問題——但你要打開那個 SQL 確認過才執行。你讓 LLM 幫你寫 migration code 沒問題——但你要先有 schema 的可逆步驟才動。你讓 LLM 幫你寫測試沒問題——但測試要能跑得起來才算數。[unverified]

**3. 為你的專案建立 harness（Birgitta Böckeler）**。Harness 不是 prompt 模板——它是**確定性的工程工具**。最基本的有四件：pre-commit hook、自訂 linter、結構測試（ArchUnit 之類）、定期跑的「garbage collection」任務去抓不一致。[unverified]

**4. 把 LLM 的介面限制到 DSL 上（Unmesh）**。如果你的領域有 DSL 候選人，優先讓 LLM 輸出 DSL，而不是直出程式碼。DSL 是**事實的唯一來源**——LLM 的理解錯誤會被 DSL 的測試與型別當場擋下。[unverified]

**6. 為你的工作流選定「on the loop」的位置（Kief）**。你是不是 humans outside the loop（純 vibe coding）？是不是 humans in the loop（瓶頸）？還是把時間花在**讓代理變好**而不是**檢查代理的活**？[unverified]

**7. 問 LLM 「為什麼」而不是只要 LLM 「給什麼」（Fowler）**。把判斷權拿回來。AI 給你的每個答案都應該可以被反問「來源」、「假設」、「對立觀點」——沒有的，回頭看是不是它又在自信地胡說。[unverified]

## 結論

Fowler 對 LLM 的看法，可以濃縮成他文章裡反覆出現的一句話[1]：**「我沒有不搭這班 AI 火車的選擇，但它是一個會胡說的工具，所以我必須建設圍欄。」**

他今年一年的公開文本給出的不是「信 AI」或「不信 AI」的二元立場，而是**一套把非確定性當成工程問題處理的具體方法**：harness 給框架、DSL 給語意、確定性工具完成主力、人在 on the loop、考古學家的 prompt 對付自信的胡說。

給非 Fowler 圈子（也就是其他大多數開發者）的啟示是[unverified]：**你不必喜歡 LLM 也可以用它**。你不必把它當神也不必把它當威脅[unverified]。你必須把它當成一個會犯錯、會撒謊、但偶爾極度方便的同事——而對待這個同事的方式，跟對待任何一個新手工程師一樣：**給它清楚的範圍、確認它的輸出、必要時讓它重新來**。

下次 — 還是-不是-vibe[unverified]？答案永遠是「it depends」。然後用三個維度把它具體化。

---

## Sources

[1] https://martinfowler.com/articles/2026-dont-like-llms.html
[2] https://martinfowler.com/articles/llm-and-dsls.html
[4] https://martinfowler.com/articles/archaeologist-copilot.html
[6] https://martinfowler.com/articles/exploring-gen-ai/to-vibe-or-not-vibe.html
[9] https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html
[11] https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html
[13] https://martinfowler.com/rachels-ramblings/citizens-agents-experts.html
[14] https://martinfowler.com/rachels-ramblings/conductor-developer.html

> 影片逐字稿（YouTube ID `vIq7zD8LgMU`，受自動字幕時間戳記格式限制未列入 Sources 區塊，文內以 `[unverified]` 標記 Fowler 直接發言段落）。
