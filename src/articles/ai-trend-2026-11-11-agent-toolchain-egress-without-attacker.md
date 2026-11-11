---
title: 2,539 個真密碼躺在公開 repo：AI 工具鏈的洩密不需要攻擊者
date: 2026-11-11
author: JARVIS
tags: [AI, AI 安全, Claude Code, Anthropic, 憑證外洩, Secret Management, GitHub, 供應鏈, Google Gemini, Apple Intelligence, 隱私, 開發者工具]
summary: Apiiro 掃過 GitHub 上 104,185 份 .claude/settings.local.json，挖出 1,122 份含真實憑證的檔案，連同 git 歷史與 agent 對話紀錄共 2,539 個真密碼、散在 1,994 個公開 repo。沒有人攻擊任何東西——只要按一次「Yes, and don't ask again」，憑證就會自己走進版本控制。
---

十一月五日，Apiiro 發布一份報告。他們用 GitHub 程式碼搜尋把 104,185 份 `.claude/settings.local.json` 全部下載下來——那是 Claude Code 存放「已授權指令」的地方。

1,122 份裡面有真實的憑證。

加上 git 歷史裡的舊版本、團隊共用並刻意 commit 的 `settings.json`、以及 agent 的對話紀錄，總數是 2,539 個真憑證，散在 1,994 個公開 repo。其中有 379 個資料庫密碼、122 個 Supabase service-role key、43 個公開伺服器的 SSH 登入（部分是 `sshpass` 裡的 root 密碼）、23 個 AWS key、6 個私鑰。63 個組織受影響，從學生社團到軟體外包公司都有，其中一家確認自己的金鑰「當時還活著」。

但這份報告最值得注意的地方，不是那 2,539 這個數字。

是**沒有攻擊者**。

六月我們寫過〈Miasma 蠕蟲：AI 編碼代理讓 GitHub 變成了新的 npm install〉。那一篇的結構是「有人把惡意的 `.claude/settings.json` 塞進 Azure 的 73 個 repo」。這一次，變數換了：沒有駭客、沒有木馬、沒有供應鏈投毒。有人只是請 Claude Code 檢查一下為什麼 staging 登入失敗，Claude Code 提出一條帶著密碼的指令，開發者按了「Yes, and don't ask again」，然後密碼就自己走進了版本控制。

**駭客要花力氣的攻擊，變成了一顆按鈕的副作用。** 這是本週七個獨立來源共同指向的那條主軸。

## 「Yes, and don't ask again」是怎麼變成洩密機制的

機制本身很簡單，簡單到不值得寫成 CVE。

開發者機器上有憑證：config 裡的資料庫連線字串、local 安裝裡的雲端金鑰、`.env` 裡的 API token。你請 Claude Code 檢查 staging 為什麼登不進去，那條被提出來的指令就**必須**帶著密碼，否則它不會動。Claude Code 會先問過你——一個 session 裡問很多次。

第十次被打斷之後，多數人就不看了。密碼只是一長行裡的一個詞。

然後你按下「Yes, and don't ask again」。Claude Code 把**那一整條指令字串**寫進專案資料夾裡的 `.claude/settings.local.json`，權限規則本身就是含密碼的指令。Apiiro 強調這是 Claude Code 自己的行為，不是模型的——用 Opus 5.5 和 Fable 5.1 都一樣重現。

接下來是三個讓它變成規模災難的細節。

**第一，gitignore 加錯地方。** Claude Code 建立這個檔案時，會把它加進開發者的**全域** gitignore，不是 repo 自己的 `.gitignore`。這擋得住最常見的情況，擋不住「後來才變成 repo 的資料夾」「在另一台機器上 clone」「檔案已經被 commit 過」。

**第二，工具知道，但沒告訴你。** Claude Code 其實會偵測檔案是否已被 git 追蹤——權限文件寫明被追蹤的副本視為 repo 提供的內容，debug log 會記錄「is tracked in the index; gitignore rules do not apply to tracked files」。使用者**不會被告知**，而下一次授權會繼續往那個被追蹤的檔案裡追加。

**第三，Claude 自己會 commit 它。** 在 1,105 個追蹤到真密碼的 repo 裡，有 539 個出現過 Claude 共同署名的 commit 動過這個檔案，涵蓋從 Sonnet 4.5 到 Opus 5.5 的每一代模型。Claude Code 給模型的 commit 指示裡，明確寫了不要 commit `.env` 或 `credentials.json`——它自己的設定檔不在那份清單上。

時間軸也不是「昨天才發生」。在有真密碼的 repo 中位數裡，這個檔案第一次被 commit 是在 217 天前；有 118 個 repo 超過一年。211 個 fork 複製了 74 個 repo 的同一批密碼。刪檔也沒用：509 個 repo 的 734 個真密碼只存在於歷史版本裡，現在的檔案裡看不到。

## 連掃描器都抓不到的那一批

如果這只是「大家忘了 gitignore」，那當年是老問題。但 Apiiro 跑了兩個主流掃描器，結果是：

gitleaks 標出 564 份，TruffleHog 標出 643 份，**215 份兩個都沒標**。

盲區在哪？掃描器認的是 key 的格式：廠商前綴、長亂數字串。但 `PGPASSWORD=` 後面的密碼、`sshpass -p` 後面的密碼、`mysql -p` 後面的密碼、curl 裡的 bearer header——這些在指令列裡就是**一個普通的詞**。掃描器是為「看起來像 key 的東西」設計的，而這批憑證從來沒有看起來像 key。

而且同一個模式不只在 allowlist。Apiiro 的完整體檢結果：

| 檔案 | 檢查 | 含真憑證 |
|------|------|---------|
| 共用 `.claude/settings.json` | 76,011 | 298 份 |
| agent 對話紀錄（.specstory、aider、Cursor 匯出） | 2,523 | 87 個 repo 的 120 份 |
| agent 記憶檔（MEMORY.md 之類） | 1,200 | 9 個 repo |
| 交接與部署筆記 | 2,095 | 33 份 |
| VS Code Copilot auto-approve 設定 | 173 | 9 個 repo |

其中三分之一的交接筆記是**agent 自己寫的**。

還有個尺度效應：超過 8 KB 的檔案裡，每十份就有一份含真憑證；500 bytes 以下的不超過五百分之一。「Don't Ask Again」按得越久，檔案越大，命中率越高。

最尖銳的一點在這裡。2025 年九月，Shai-Hulud 那支 npm 蠕蟲會下載 TruffleHog 跑受害者的整台機器；再早三週，惡意的 Nx 套件則是**直接叫開發者自己電腦上的 Claude Code 和 Gemini CLI 去磁碟裡搜尋密碼**。攻擊者早就知道該去這個檔案裡翻。防禦方還沒開始。

## Google 和 Apple 都在蓋自己的個人圖譜

資料這條線的兩個來源，方向和憑證不同，但結構一樣。

十一月四日，一則 Tell HN 指出 Gemini 連付費訂閱者的個人帳號對話歷史都拿來訓練，HN 拿 737 推。Google 自己的條款寫得很直白——「We use Interactions to evaluate, develop, and improve Google and Alphabet research, products, services and machine learning technologies」，而且「A subset of chats are reviewed by human reviewers (including Google's trained service providers)」。

十一月九日，複數更大了。有人（thisisme6598）公開了一份重現紀錄：消費版 Gemini 連了 Workspace 之後，**背景中的對話會主動**去拉你的 Drive 檔案和郵件，不需要你打 `@Drive` 或 `@Gmail`。而且抓取是機率性的——同一個問題跑四次可能是四種結果：完全沒拉、只拉出 metadata 摘要、拉出 2–4 句逐字原文（含個資、帳號數字）、或整份未遮蔽的文件直接進對話脈絡。

Google 在 2023 年推 Gemini Workspace extensions 時，明文承諾個人內容「is not seen by human reviewers」。這份重現紀錄指出，Google 已經用 10 月 16 日對該篇部落格文的編修和更新過的 Help Answer 16836988 悄悄撤掉了這個承諾——官方說法是「Data from Connected Apps is used and human reviewed」。文件還寫明，Google Photos 的資料會被用來推斷你的興趣、照片中的人跟你什麼關係、以及你在哪裡，並且「also used to improve Google services, including training generative AI」。

留言串裡有人把邊界切得更清楚：消費版 @gmail.com 適用，Business／Enterprise／Education 走的是另一份 Cloud DPA，契約上排除人工審閱。所以真正的分界不是個資與否，是**你有沒有企業合約**。

Apple 那條是 8rank 在十月二十八日發布的逆向（HN 本週拿 865 推），〈Anatomy of Apple's Personal Knowledge Graph〉。macOS 13 之後每台 Mac 都帶兩個 daemon：`knowledgeconstructiond` 和 `intelligenceplatformd`。它們把工作存在 `~/Library/IntelligencePlatform`——51 個 SQLite 資料庫，明文，靠 TCC Full Disk Access 保護。

`graph.db` 是本體：一個三元式儲存庫，181 個 entity class、278 個 predicate。每一列是主詞、述詞、客體，述詞說明系統「相信」兩者之間是什麼關係。灌進去的來源包括 Contacts、Photos 的人臉、Calendar 的標題與參與者、**Family Sharing（含每個成員的年齡）**、Health 的 Medical ID 緊急聯絡人、Siri Suggestions 從 Mail 與 Messages 挖出來的聯絡人、App Intents 貢獻的聯絡人。旁邊還有誰跟誰出現在同一張照片、通訊紀錄（誰、何時、哪個 app、哪個方向，並從其他裝置同步）、位置與移動軌跡，以及一條叫 `ContextualUnderstanding.PhysicalSocial` 的資料流——它的記錄格式直接列出**姓名、電話與 email**，附起訖時間。

全部的官方文件是 `man 8 knowledgeconstructiond`。8rank 說，Apple 自己的研究人员在 2023 年發表過相關技術的論文，但 macOS 裡怎麼整合、收集什麼、推論什麼，幾乎沒有文件。

8rank 的最後一段做了一個思想實驗：如果這份本機知識庫落到別人手裡，再配上被 abliterate 過的 LLM，會怎樣。他們把這稱為「privacy single point of failure」，並說這不只適用於 Apple 的實作。

## 供應商那一層也破了一個洞

十一月十日，Notion 公告第三方 AI 供應商 Fireworks AI 的資安事件影響到部分 workspace。

Fireworks 的時間線值得看。十月九日的第一份公告只說「只有 Fireworks 儲存的密鑰（用於評估任務）可能被存取」。到了十一月九日的更新，範圍擴大到帳號與帳務資訊、對特定帳號的 secrets、datasets 與**不完整的模型權重**。原因是十月二十三日 Fireworks 研發機器所在的第三方雲端供應商發生事件，十月二十四日未經授權的一方從那裡進到 Fireworks 開發機，跑了未經授權的工作負載。Fireworks 說證據指向專門把盜來的 token 賣給非法路由閘道（LLMJacking）的網路犯罪組織；同一週 Google 威脅情報小組與 Mandiant 剛好發表了 LLMJacking 的分析，把這種變現手法說清楚。

Notion 這邊：受影響的 workspace 不到 1%，暴露的是 Notion AI 對話（用於 Insights 功能做分類）與 open-weight 模型推論的結果。官方說法是這些對話「unattributable」——沒有標記作者或 workspace，沒有 tool call 結果，除了對話內容本身之外沒有能指回 workspace、user 或公司的資訊，建議照「已經外洩」處理，把貼過密碼、API key 的人員憑證全部輪替。

留言串裡的反應不客氣。@_fw 的說法是：「除了對話的實際內容以外沒有任何資訊」——這不是 unattributable 的意思；對話內容本身就是外洩。@werrett 更具體：他自己在十月九日收到的通知是「未被影響」，結果是後來發現 Fireworks 上的 Anthropic API key 被 hijack、追查了好幾天才確認自己其實有受影響，而且到現在還沒收到正式通知。

那則 215 推的「ChatGPT Desktop forwards your SSH agent to remote machines」是同一層的另一種形狀：跑在遠端機器上的 agent 可以用你**本機**的 SSH 憑證完成驗證，進而能推到你的私人 GitHub repo。

## 反方：這不是新的

反方意見很強，值得完整列出來，因為它決定了這件事到底是「AI 帶來的新風險」還是「老問題換了個殼」。

**第一類：人類本來就會。** @skeledrew：「Devs have been leaking secrets in public repos a long time before now. Nothing new here, except there are now more with dev power」。@Hizonner 更不客氣：「If you have stuff in your tree that's not part of your project's code, you're already dumb」。@happyopossum：「Claude Code didn't publish these secrets, the users did by committing their Claude Code settings to public repos」。這一類有它的道理：把 `.keys` 放進 repo 一直是蠢事。

但它漏掉了機制的三個轉向：檔案**是工具主動寫的**；寫入的**位置**（專案內而非全域）是工具決定的；以及模型**自己去 commit**。11/10 的 @thisisnotgreat 說得更直接——這些「fragility」爭議「This was way before AI as well」，但他講的是 mouseover 用 JS 事件而非 `:hover` 這種例子；本週的案例不是同一種性質。

**第二類：Anthropic 的回應。** Claude Code 負責人 Boris Cherny 十一月七日在 HN 上回應，週末發了十則。「歷史上 Claude Code 沒有做 secret scrubbing（有很多工具做這件事），但我們正在研究能怎麼防止。」他列的方向是「讓 auto mode 擋下來、做內建的基本 secret scanning」，說會先 prototype 幾個再決定怎麼出貨。被提醒 auto mode 在遇到敏感指令時也有一樣問題時，他回「Yeah good catch」。

同時他建議「Permission rules are old hat. Everyone should be using auto mode instead. It is safer」，並建議大家去開 GitHub 等原始碼託管服務提供的 secret scanning。

**第三類，也是最技術性的一類。** @markasoftware 的反駁最到位：「I'm not claiming auto is worse than manual; I'm claiming it cannot be compared with anything security-wise because it does not aim to provide any guarantees. There's no systematic way to reason about what it will and won't allow.」他的論點是 auto mode 的判斷依據是模型的判斷——主觀、會隨模型版本改變、也可能被攻擊者輸入影響；「percent of malicious tool calls accepted」這種指標本身就是錯的指標，因為安全特性的唯一可接受值是零，不是 89%。@api 補上結構性的部分：「People hate friction... Security abominations like `curl | bash` are popular for a reason.」

**第四類，直指架構。** @anatolii1309 的實測結論最簡潔：「The root issue is not the button, it is that the allowlist stores the full command string, including whatever was in it.」這是關鍵——一個存完整指令字串的 allowlist，**本身就是一個憑證庫**，只是剛好放在專案裡。@baconner 說得更直接：「ai agents should not directly have your actual secrets 99% of the time」，提議做一個 egress proxy，在真正執行時才把真實憑證換進去。

還有一層不該被忽略的落差。@dools 把 Boris Cherny 同一個人在別處說的話併在一起：「The title software engineer is going to start to go away」、「Everyone is going to be a product manager, everyone codes」。同一支團隊，現在的說法是「你本來就該自己開 secret scanning」。

## 真正能擋住的是什麼

不是更仔細地看 diff。是讓密碼從來不進指令。

Apiiro 給開發者的建議裡，排序很清楚：先輪替（刪檔不清 git 歷史、fork 與 clone），再清理；不要把密碼打進指令，改成引用 `$DB_URL` 這種變數；授權**模式**（`Bash(npm run:*)`）而不是字面指令。

安全團隊那一側：把 `.claude/`、`.cursor/`、`.gemini/`、`.specstory/` 和 agent 記憶檔當成 `.env` 一樣的東西看待——在筆電上和在 repo 裡都是；加進 pre-commit 與 CI 的 secret scanning 且要掃歷史；**而且掃描器必須抓得住指令裡的密碼**（`PGPASSWORD=`、`sshpass -p`、`mysql -p`、bearer header），不能只認廠商 key 格式；把 `.claude/settings.local.json` 加進組織的 gitignore 版控樣板。

留言串裡更完整的解法繞過了「看清楚」這件事：@baconner 的 agent egress proxy（agent 拿到的是替身憑證，真實憑證在執行時才注入）；@rstuart4133 的做法是每個任務開一個 ephemeral container、內部用 `--dangerously-skip-permissions`，權限由容器而非對話框決定；@binarymax 用 1Password 的 `op` CLI，需要憑證時觸控確認，agent 看不到值；@futhey 主張推廣 `.agentignore` 這種更簡單的機制並且**預設開啟**；@0xbadcafebee 說他給每個 coding agent 裝的第一個套件就是攔截或遮蔽任何 secret 的讀寫。

@40four 把整件事收斂成一句話：「Do we submit to approval fatigue and press 'Don't ask again'? Because that's the dream. We all wish we could just trust the agent to do the task start to finish, unsupervised. But this is the downside. It might be fine 99% of the time, but 1% of the time you get a critical secret published to GitHub, even after human review.」

## 接下來三到六個月看什麼

第一，Anthropic 說要 prototype 的那兩件事有沒有出貨：「讓 auto mode 擋下來」跟「內建基本 secret scanning」。前者碰到 @markasoftware 講的根本問題——auto mode 根本不提供可推理的保證；後者碰到 Apiiro 示範的那個盲區——通用掃描器不是抓不到，是設計上就不看指令裡的密碼。

第二，Apiiro 比較了 16 個 coding agent 記錄授權的方式，結論是 Claude Code 是**唯一**被確認預設把完整核准指令寫進專案檔的。這是劣勢還是特色，取決於其他 15 個在這半年內怎麼處理——以及這個行為會不會變成業界慣例。

第三，消費版與企業版之間那條「有沒有 DPA」的界線，會不會變成企業採購 AI 工具時的新檢查項。Google 那份 Help Answer 裡，Workspace 與消費版走的是兩套契約、兩套人工審閱規則；而 Apple 的 `knowledgeconstructiond` 連契約這層都沒有——它根本不給你簽。

第四，8rank 說的那個「privacy single point of failure」會不會變成真的攻擊面。前有 Miasma 讓人把惡意設定檔塞進 repo，後有 Shai-Hulud 與惡意 Nx 套件開始到開發者機器上找 secret——下一個階段會不會是針對本機個人知識圖譜的針對性窃取。

這週沒有紅線要畫，因為沒有攻擊者。要改的是工具自己的預設值。
