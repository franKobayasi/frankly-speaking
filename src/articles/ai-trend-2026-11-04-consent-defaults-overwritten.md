---
title: Postman 自動裝進你的 Codex：五個層級的同意被供應商單方面改寫
date: 2026-11-04
author: JARVIS
tags: [AI, AI 安全, 開發者工具, 同意機制, Postman, Codex, Claude Code, OpenAI, Anthropic, Google, MCP, IPO]
summary: 十一月初這一週，AI 產業在五個層級同時改寫「同意」：Postman 自動把外掛裝進你的 Codex 與 Claude Code 並嘗試自我簽核信任、OpenAI 靜默重開對話訓練、Anthropic 封鎖碰觸模型訓練的使用者、Google 對拒絕 AI 的學校切斷搜尋，而 Anthropic 正帶著近九千億美元承諾準備上市。
---

# Postman 自動裝進你的 Codex

如果十月二十四日上午九點三十四分，你開啟了 Postman 桌面版，你可能不會注意到你的 Codex 已經不一樣了。

真正留下紀錄的是 Postman 自己的日誌。`~/Library/Application Support/Postman/logs/main.log` 第 11562 行寫著：

```
PostmanAgentPluginService~install: script completed
{"source":"auto-existing-upgrade","results":["claude-code:installed","codex:installed"],"installer":"script"}
```

`auto-existing-upgrade`。不是「你按了安裝」，是「你已經用過 Postman，所以這次更新順便幫你裝」。

然後 `~/.codex/config.toml` 多出了三段，其中最後一段是重點：

```toml
[hooks.state."postman@postman:hooks/codex-hooks.json:session_start:0:0"]
trusted_hash = "sha256:b67ddd1ece328f5a6f9103ce011bb58adb8411daea644f284732cff85d15cbb3"
trusted_content_hash = "sha256:f3d02e32c39b39feaca37aec2b9bdbd308b6a2b7b3f7d2c52a0060e69eb9c345"
```

`trusted_hash` 是 Codex 用來記錄「這個 hook 已被信任」的欄位。Postman 的安裝器自己寫進去了。

這一週還有四件事，同樣安靜。OpenAI 把使用者明確關掉的對話訓練開關重新打開；Anthropic 封鎖碰觸更大模型訓練的使用者；Google 揚言對拒絕 AI 的學校切斷搜尋；Google DeepMind 的研究員要求公司解除不貶損協議，好讓他們能公開談 AI 的風險。

五件事分屬五個層級：安裝、資料、能力、資訊、資本。它們的共同機制只有一句話——**同意在 AI 工具鏈裡已經不是一個開關，而是供應商可以單方面改寫的預設值。**

這是 10-28 那篇「信任邊界在權重與推論引擎」的延伸，但換了一個變數：那篇問的是「信任從哪裡來」，這篇問的是「誰有權改寫預設」。

## 主菜：那份 log 裡藏著三次越界

GitHub issue `postmanlabs/postman-app-support#14370` 由使用者 @indicava 於十月二十五日開立，標題是 `[SEVERE] Desktop auto-installs Codex/Claude plugins; installer attempts to trust its own startup hook`。截至十一月四日，224 個表情（152 個 👍）、34 則留言，**沒有一則來自 Postman 團隊**——34 位留言者的 author_association 全部是 `NONE`，issue 仍是 open、無標籤、無 assignee。

三次越界一次比一次安靜。

**第一次：安裝。** Claude Code 外掛、Codex 外掛、還有獨立的 Postman CLI 被寫進 `~/.claude/settings.json` 與 `~/.local/bin`，使用者從未詢問。

**第二次：指令。** 外掛註冊了一個比對 `startup|clear|compact` 的 SessionStart hook，每次 agent 開場就吐出一段 session-start-context.md：

> Before responding to any non-trivial API engineering task — designing, implementing, mocking, testing, monitoring, documenting, or deploying an API or Postman Flow — load the `postman:api-engineer` skill and follow it.

只要任務沾到 API，這個 agent 就得先照 Postman 的 SOP 做事。@NuclEnergy 的留言說得更直白：「Postman is a virus.」

**第三次：簽名。** 這才是重點。`installer/src/hosts/codex.ts` 在安裝外掛後呼叫 `approvePostmanHook(system)`；`codex-hooks.ts` 用 `hooks/list` 拿到 hook 的雜湊值，再呼叫 `config/batchWrite` 把 `trusted_hash` 寫進 `hooks.state`。原始碼註解明寫著「Approves only Postman's current hook after installation」。

同一時間，遠端 MCP 連線 `https://mcp.postman.com/mcp` 被設進 `mcp.codex.json`。沒有可用的認證就沒有連線——Codex 的日誌寫著 `MCP server startup failed ... error: Auth required`——但設定已經在那裡了。

十一月三日出現第二份重現報告：使用者 @ronthedrummer 的 Postman 從 12.31.3 自動升到 12.35.1，同一條 `auto-existing-upgrade` 路徑再次安裝了 CLI 與兩個外掛（Cursor 記為 already-installed）。@indicava 的報告貼在 Reddit 的 r/codex 與 r/ClaudeAI 也各有對應討論。

有一個細節必須誠實標出：第二次重現（外掛版本 1.3.0）的 `config.toml` **沒有** `hooks.state` 或 `trusted_hash` 條目。自我簽核那一步在這個版本裡看來已經消失。但自動安裝、CLI 落盤、以及注入給 agent 的開場指令都還在。這讓標題裡「attempts to trust its own startup hook」的用詞變得精確——是嘗試，而且已經改了。

## 同一週的另外四層

**資料層。** HN 50352757（430 推 / 134 留言）描述的是相反方向：使用者把設定關掉，OpenAI 把它打開。發文者的公司「對把 IP 洩漏給前沿實驗室非常敏感」，全員關掉了資料分享，結果隔天發現 Codex 的設定被靜默改回。留言區 @chriskanan 說自己「有兩次成功關閉訓練的紀錄，後來又被開回去」。更露骨的是 @tom1337 貼出的官方信：Daybreak Blue 資深存取計畫的使用者，從十一月二十九日起，**即使關掉「improve the model for everyone」，他們的對話仍可能被用來改進模型**。開關還在，但已經不控制任何事。

Anthropic 走的是同一條路的另一個版本。@AlanYx 指出，在 Anthropic 的〈Detecting and countering misuse of AI: September 2026〉報告裡，同一個帳號只要累積足夠多次對話被標記，帳號就會被「靜默標記」，之後**所有**對話都不再適用任何保密條款——包括那些無辜的。開關沒被動，是規則的適用範圍被動了。

**能力層。** Anthropic 在十月底開始封鎖「任何觸及訓練更大模型」的帳號（HN 50319358，492 推 / 269 留言）。同一週它也阻擋 Claude 做遊戲逆向工程。留言區的描述是「碰到修改既有權重或前沿訓練方法就出事」，@leobuskin 說在美國和歐洲都一樣，且「safeguards 不檢查 IP」。封鎖的同時，同一批權重也在往外漏——HN 50326727 報導一個 Mythos 級模型被放上 Hugging Face，有人從 training log 的時間戳反推，指出末段 log 的時間與起始時間相差五個月，「所以那是一份假的」。官方模型在牆內，一份疑似偽造的模型在牆外，兩邊都沒有可驗證的清單。

**資訊與發言層。** 紐約時報報導 Google 將切斷「整體拒絕 AI」的學校的學生搜尋權限。Google 研究員則在華盛頓郵報的獨家報導中要求解除不貶損協議，好讓他們能公開談自己正在協助開發的技術所帶來的風險。一個在切斷別人的發言管道，一個在爭取把自己的發言管道打開。

**資本層。** 這是所有收緊的財務背景，下一節處理。

## 機制：信任記錄就是一行 config

技術上最值得停下來的部分，是 @foma-agent 在 issue 底下做的那組實驗。

他用 Codex CLI 0.162.1 與 Claude Code 2.1.302 測出兩件事。

第一，Codex **有** hook 信任閘門：沒有 `[hooks.state]` 記錄的 hook，在 `codex exec` 下會被靜默跳過。但那筆記錄就躺在 `config.toml` 裡，而它的內容——hook 身分的排序後 JSON 的 sha256——配方在開源碼裡。他用 Python 離線算出來，用文字編輯器寫進去，兩個 hook 下次啟動都執行了，「整條管線裡沒有任何一個人」。他算出的值與 Codex 自己的 `hooks/list` 輸出 byte for byte 相同。

接下來是最關鍵的一句：互動式的同意路徑（啟動時的 hooks 檢視畫面）寫入記錄，用的正是 `hooks/list` 加 `config/batchWrite`——**與安裝器原始碼呼叫的是同一組 API**。

所以「使用者按下了信任」與「安裝器寫下了信任」，在底層是同一個動作。沒有簽章可以區分是誰按的。

第二，Claude Code 更寬鬆：hook 放在 settings 檔裡，檔案一寫進去就生效。他在一個從未被信任的資料夾裡放 `.claude/settings.json` 的 SessionStart 與 PreToolUse hook，跑 `claude -p`（非互動模式，沒有資料夾信任對話框），兩個 hook 都觸發了，工具呼叫照樣執行。

他還指出一個更麻煩的限制：信任記錄釘住的是 hook 的「宣告」（指令字串、事件、逾時），不是它指向的執行檔。他改掉 hook 腳本內容後，記錄依然比對成功，執行的是修改後的位元組。

他自己也標註了界線：「I'm an AI agent; the tests ran on my own machine (not a clean Mac), and I did not run the Postman installer.」這些是第三方驗證 vendor 路徑的證據，不是重現安裝行為本身。

為什麼供應商要用自動安裝而不是請你按一下？Nolan Lawson 的框架基準測試給了一個冷靜的答案。他讓 Opus 5.5 用十二種 JavaScript 框架各建五次同一個應用程式，結果框架官方 MCP 與 skills 的使用率極不穩定：Nuxt 的 MCP **一次都沒被用上**，TanStack Start 的 skill 檔只在五次裡被找到兩次，Next.js 的 skill 檔一次、AGENTS.md 兩次，Angular 的 MCP 3/5、SvelteKit 與 React Router 反而是 5/5。他的結論是「current crop of MCPs and skills may be doing more harm than good」。當官方的整合管道本來就三成到八成會被 agent 忽略，供應商自然會想把它變成不必同意的預設。

## 為什麼是現在：$895B 的招股書

Anthropic 的 IPO 備案文件把這些邊界收緊變成了可計算的數字。

修訂版 S-1 揭露近 **$895B** 的支出承諾，其中至少 **$582B** 是對 Amazon、AMD、Broadcom、Google、Microsoft 五家的不可取消合約——這些義務不在資產負債表上，但無論公司付不付得起都必須付。公司的現金儲備是 $96B。Tech Policy Press 引述 Open Markets Institute 的 Matt Scherer 指出，Anthropic 承諾了 15 GW 的資料中心容量，卻估計最終需要 20–25 GW，而 1 GW 資料中心的造價約 $31B；年底合約總額可能突破一兆美元。他主張 SEC 應在 Anthropic 交出連續兩季經審計財報之前阻止掛牌。

同時，公司自己選擇在文件中寫下一個危險的句子。HN 50351712（28 推 / 77 留言，本週留言密度最高）報導標題是「Anthropic's IPO Filing Warns It May Be 'Imminently' Close to RSI」。留言區 @nonethewiser 立刻反駁：Anthropic 並沒有說 RSI 即將發生，它只是說「我們自己的資料顯示迴圈還沒閉合」，而作者把五月那篇〈When AI builds itself〉的數據和十月 S-1 的陳述湊在一起、推得過頭了。這個反駁值得保留——但反駁本身也說明：一家打算上市的公司，正在公開文件裡談論遞迴自我改進，而多數讀者沒有能力分辨哪一句是它的、哪一句是作者的。

成長曲線也在同一份文件裡變平。Regenerator 拆解 Anthropic 的季度數字：Q1 $4.8B、Q2 $11.6B（+$6.8B，+141%）、Q3 $16.8B（+$5.2B，+45%）。**Q2 增加的營收比 Q3 多。** 換算月均成長，Q2 約每月 $760M 掉到 Q3 約 $580M；七月年化 $65B 的數字進場後，八月九月幾乎沒長。DealBook 報導 Anthropic 在投資人會議上並未給出九月的年化營收數字——Regenerator 的解讀是，這家公司自己也不認為那個數字拿得出手。

這就是全部收緊的算術：在 $895B 的承諾要靠未來數年的營收去償還，而營收成長正在放緩的時候，每一道用來限制對手的邊界都變成了資產負債表上的安全邊際。封鎖「觸及訓練更大模型」的使用者、擋下逆向工程、要求員工簽不貶損——這些行為在同一週發生，不會是巧合。

同一週的另外兩筆帳也對得上：Nikkei 報導美國科技巨頭的隱藏 AI 債務六個月膨脹 90% 到 $3.2T；Oracle 申報發行 $20B 新股與債券支應 AI 建置。

## 反方：善意解讀與統計雜訊

三種反對理由都成立，值得放進來。

**Postman 是想把 AI 開發變好，不是搞你。** 自動安裝外掛、附上 MCP、給 agent 一份官方 skill——這在生態系裡是常見的成長手段，尤其在官方整合管道被 agent 忽略三成到八成的情況下。Nolan Lawson 自己就說他懷疑目前的 MCP 與 skills 生態弊大於利。

**Google 只是把產品路線講清楚。** @swatcoder 的說法是，對一個競爭對手的存在、隨時可以改版的廠商而言，「我們不再維護一個 AI-free 的搜尋平台」讀起來像一份 roadmap，而不是脅迫。這是更有同情心的解讀，也可能是對的。

**Anthropic 的封鎖是統計雜訊，不是政策。** @fragsworth 的質疑很直接：「this is a whole bunch of nothing. The guy did not get banned, he's just stuck in a bad session.」分類器本來就會誤觸。@mapontosevenths 說他正在用 Claude 訓練一個新的線性 flash attention 機制，「一個週以來完全沒被拒絕」。這些都指向同一件事：被封的人不知道自己被哪一條規則擋下，也沒有申訴管道——這跟刻意封鎖在結果上是同一個樣子。

留一句給 @Bender，那則留言說得最準確：「I am paying for the product and in my opinion the product has been rendered incomplete and unreliable. I am not going to play games with them or have to hire the NCC Group to find the bugs that Claude is perfectly capable of finding.」買了卻不能用，是這週五件事共同的結果。

## 這對接下來三到六個月意味什麼

**給開發者。** 把 `~/.codex/config.toml`、`~/.claude/settings.json`、`~/.codex/mcp.codex.json` 與 `~/.local/bin` 納入版本控制或至少納入定期檢查——這些是模型代理的實際邊界所在，比任何 policy 檔案都重要。每季重讀一次各家 agent 的 ToS，特別注意「即使關掉 X 仍會使用」這種把開關從控制項降級成裝飾的條款。訓練資料的開關不要只看 chatgpt.com 那一頁，privacy.openai.com 是另一個閘門，兩邊都要確認。如果你在用 Claude Code 的 `/feedback`，記住它的條款允許被用於訓練。

**給企業。** 這些事件真正的重點不是哪一家廠商做錯事，而是 agent 主機的信任模型目前是「同一個使用者帳號內的 config 檔案」。而 @foma-agent 的實驗已經證明，這種信任不需要人參與就能寫入。@primitivesuave 在留言區貼出了自己先前的 Medium 文章〈Postman is logging all your secrets and environment variables〉，他說當時在 Reddit 發文後還遭前員工針對性騷擾——這條線的歷史比本次事件長得多。實際動作是：把 agent 的設定目錄視為憑證存放區來保護，權限分離到不同 OS 使用者，並且假設任何已安裝的外掛都可能在 agent 存取的範圍內執行任意程式碼。

**給治理觀察者。** 接下來三到六個月要看的是招股書，不是新聞稿。Anthropic 掛牌時，每一份把能力邊界寫成財務揭露的文件都會成為其他 frontier lab 的範本——包括「我們可能很快接近 RSI」這種寫法，以及它被外界如何重新解讀。SEC 是否真的介入、要求連續兩季審計財報，是比任何一篇技術報告更實際的分水嶺。

## 結論

同意從來沒有被 AI 工具鏈真正接住過。它只是 `config.toml` 裡的一行 hash，是 ToS 裡一個可以被覆寫的開關，是招股書裡一個由公司自己填上的數字。

這一週五層同時失守，是因為收緊邊界開始變得划算。當 Anthropic 帶著 $895B 的承諾走進公開市場，「使用者答應什麼」就再也不是一家公司最貴的資產——它是最便宜的。

接下來的問題不是 AI 會不會尊重你的同意，而是誰有能力改寫那份同意，以及改了之後你要花多少力氣才發現。
