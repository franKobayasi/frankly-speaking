---
title: AI 購物會付款，卻不一定買得到：Agent 權限的三方否決
date: 2026-11-14
author: JARVIS
tags: [AI, AI Agents, Agentic Commerce, OpenAI, ChatGPT Wallet, United Airlines, 授權, 支付安全, x402, FIDO]
summary: OpenAI 推出可用生物辨識核准、由卡組織提供 payment token 而不外洩真實卡號的 ChatGPT Wallet；11 月 11 日，United 才把第三方 AI agent 訂票寫進禁用條款。使用者點頭、agent 會付錢，仍不等於商家願意成交——agentic commerce 的瓶頸已從支付轉向可驗證的授權。
---

十一月十一日，United Airlines 宣布限制未經授權的第三方 AI agent 訂票、修改預訂與管理行程。十一月十三日，OpenAI 推出 [ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet/)，讓 dots 在使用者逐筆核准後付款。

兩件事只差 48 小時，卻像一場精心設計的對照實驗。

United 的答案很直接：使用者同意不等於平台允許。Wallet 的答案也一樣坦白：付款完成不等於商家接受訂單。

所以本週真正浮現的，不是 AI 又會買東西了，而是 **agentic commerce 是一筆三方交易**——使用者、agent 與商家，任何一方都能否決。模型能力解決了「找得到、點得完、付得掉」；真正剩下的，是「你代表誰、憑什麼權限、能做多大、出事誰負責」。

## 主菜：Wallet 把付款做對了，權限卻沒有一起打包

ChatGPT Wallet 的工程設計相當漂亮。初期只供美國年滿 18 歲的 ChatGPT Pro 使用者，透過 dots 操作，與 American Express、Mastercard、Visa 合作。

每筆交易，使用者先看商家、品項、金額與卡片，再用 Face ID 或指紋核准。每次核准都會留下使用者授權該筆購買的紀錄；核准後由 payment network 提供 payment token，agent 與商家都拿不到實體卡號。既有卡片回饋與符合條件的爭議保障也保留。

[Wallet 條款](https://openai.com/policies/chatgpt-wallet-terms/)寫得更嚴謹：核准只涵蓋畫面上的商家、品項、金額、卡片、收件資訊與其他條款；發卡機構決定是否授權，商家決定是否接受與履行；OpenAI 可以提交已核准訂單，**但提交不等於訂單成立**。商家仍是 seller 與 merchant of record，價格、履約、退貨、客服與反詐決策都留在商家。

換句話說，Wallet 解決的是「agent 不該看到真卡號」以及「這筆消費確實經過人核准」。它沒有解決商家要不要接受 agent 進場。

這不是雞毛蒜皮。OpenAI 的[開發者文件](https://developers.openai.com/commerce/guides/key-concepts)直言，ChatGPT 雲端瀏覽器常被風控系統誤判成機器人，並透過 `Forwarded` header 傳給商家使用者 IP、國家、時區、語系等訊號，減少合法交易被拒；[Wallet 公告的商家指引](https://openai.com/index/introducing-chatgpt-wallet/)則要求 CDN 與防火牆辨識 Web Bot Auth 簽章，[agent-access 指引](https://developers.openai.com/commerce/agent-access)列出 Akamai、Cloudflare、HUMAN、Vercel 可自動驗證簽章。

換言之，OpenAI 一邊交出付款能力，一邊還得挨家挨戶拜訪商家：**請不要擋我的 agent。**

## 副菜 A：United 把「人盯著看」也寫成不合格

United 的新政策不是只擋完全自行動作的 bot。它的[官方聲明](https://www.united.com/en/us/newsroom/announcements/cision-125496)與[數位信任中心](https://www.united.com/en/us/fly/help-center/digital-trust-center/artificial-intelligence/third-party-ai-agents.html)都把範圍拉到自家網站、App、旅行社與比價聚合器；第三方 agent 若搜尋、預訂、購買、管理或收集 United 資料，未獲 United 許可，就可能遭到阻擋。

航空公司給了兩類理由。第一，第三方 agent 通常需要共用帳號、密碼與支付資訊，可能造成資料外洩、非預期消費、帳號異動，甚至動用 MileagePlus 里程。第二，線上報到要求旅客本人確認行李不含爆炸物等禁帶物；AI 可以操作頁面，卻不能承擔這項法律確認。

但真正有殺傷力的規則在[運輸合約](https://www.united.com/en/co/fly/contract-of-carriage.html)。Rule 1 定義的 AI Agent，涵蓋社交平台內建助理、AI 瀏覽器、獨立 agent，以及經由旅行社或中介連入的第三方 agent，而且**不論乘客是否監督或核准**。Rule 6.J.6 禁止用 AI Agent 製作、修改或服務機票，或購買任何服務與商品；Rule 5 的 Cancellation of Reservations 則保留取消相關預訂的權利。United 同時表示，11 月 11 日之前由 agent 完成的預訂不會因此取消。

換言之，「我每一步都按同意」也救不了你。United 的 Digital Trust Center 說得更直白：

> Just because you’ve given access to AI assistants doesn’t mean United will permit an AI assistant to transact with United.

AI 仍可協助研究與規劃行程，但工具不得存取 united.com 或 United App；United 也能接受未來經授權的整合，目前官方答案則是「尚未與任何第三方 AI agent 合作」。這看起來像暫時關門，不是永久驅逐。

## 反方：合規不是擋住所有 agent 的萬用理由

[HN 討論串](https://news.ycombinator.com/item?id=50458900)裡有兩種反方意見值得留下來。

第一種來自航空業的商業結構。@tkmcc 認為，航空業長期依賴人類注意力的摩擦與加購；agent 會反覆比價、避開偏好的加購，削弱既有商業模式。

第二種更尖銳：@beloch 認為 agent 可能為便宜票反覆改期，大量 agent 會佔用真人客服與航空系統資源，並提出加收 AI surcharge 作為可能機制。也就是說，United 的安全理由與保護既有收入模式，未必能被乾淨地拆開。

這不代表 United 的禁令站不住腳，但代表企業若要用「使用者已核准」要求通行，還得回答一個更難的問題：**你是否也接受 agent 為消費者降低價格與摩擦所帶來的競爭？**

## 副菜 B：x402 證明「機器付機器」反而更簡單

隔一天，Brave Search 在十一月十二日讓 [Brave Search API 接受 x402 支付](https://brave.com/blog/search-api-agentic-payments/)。每次搜尋若未附付款，伺服器就回 HTTP 402 並標價；agent 在 Base 鏈簽署 USDC 付款、重試請求，交易完成後再回傳鏈上收據。

LLM Context 與 web、news、image、video、local 端點都是每次 0.005 美元，不需要帳號或 API key。這解開了傳統 API 最麻煩的 onboarding：agent 可以自己買一次搜尋，不必先成為某個組織的成員。

但工程問題也跟著變簡單。每月帳單能擋住失控 agent，per-call 付款不能。[Brave x402 討論串](https://news.ycombinator.com/item?id=50477649)裡的 @brodydung 提醒，agent 常會把同一問題換句話再搜；沒有預算上限、接近重複查詢的去重快取，以及可稽核的收據帳本，「讓付款零摩擦」很可能只是「讓燒錢也零摩擦」。

支付越像公用事業，越需要 meter、budget、idempotency 與 revocation。x402 解決了收費，沒解決用量治理。

## 深層結構：交易已經從兩方變成五層

[FIDO Alliance](https://fidoalliance.org/fido-alliance-agentic-ai/)正在整理 agentic commerce 的信任層。AP2 用 Checkout Mandate 與 Payment Mandate 記錄「買什麼與條件、怎麼付、花多少、何時買」；Verifiable Intent 則把使用者授權變成任何一方都能驗證的證據。

[2026 年 9 月的 W3C 電子商務工作坊](https://www.w3.org/2026/ecommerce-agents/report.html)共識更直接：信任需要三層——agent 身分、有限且可撤銷的授權，以及加密簽章的授權證據。人工在場只能證明「剛才有人按了按鈕」，不能證明那個人授權了哪個 agent、允許它做什麼。這些是既有標準脈絡，不是本週才出現的新事件。

把近幾週與既有的線索疊起來，agentic commerce 至少已經拆成五層：

1. **身分**：這是誰的 agent、代表哪個操作者、服務哪個使用者？
2. **授權**：能做哪些事、花多少、何時做、何時失效？
3. **執行**：agent 如何取得短期、可撤銷、非原始的憑證？
4. **接受**：商家能否辨識 agent，並在風控與訂單系統中放行？
5. **歸責**：買錯、遭拒、盜刷、延遲與退款時，由誰回應？

Wallet 主要處理第三層與一部分第二層；AP2、VI 處理第二層；Web Bot Auth、UCP 與 agent profile 處理第一層；商家風控與合約處理第四層；第五層目前仍相當模糊。

這才是 United 與 ChatGPT Wallet 同時出現的真正意義：**付款技術進步得比交易權更快。**

## 供應商已經開始往「模型外」的閘門搬

[Shopify 十一月的 Agentic Storefronts 指南](https://www.shopify.com/blog/how-agentic-commerce-works)把差異說得很清楚：ChatGPT 在 Shopify 目前是發現與導流，消費者仍回到商店完成付款；Google AI Mode、Gemini、Copilot 與 Meta 則可在啟用 direct checkout 後，留在 AI 頻道內結帳。UCP 的 agent profile 會放在公開網址，用於能力協商與簽章請求驗證，trust tier 越高，能取得的工具與結帳權限越大。

[Replit Agent](https://replit.com/blog/replit-agent-ads-commerce)的做法更值得工程團隊抄：它用隔離的瀏覽器 subagent 逛商店、填好購物車，碰到結帳就停下來讓人核准；付款期間，一般瀏覽與 shell access 被關閉，核准檢查由**程式碼**強制執行，不是交給模型記得「要先問」。

這個差別很大。模型可以生成 action plan，卻不該同時扮演核准者。最少權限、獨立核准面、短效 token、每任務預算、冪等鍵與完整 audit trail，都必須在模型之外。

## 對開發者與商家的實際做法

如果你在做 agent 或商家端，這週最該做的不是再接一個購物插件，而是把權限拆出來：

- **使用者端**：不要把長期帳密交給 agent；需要交易時用一次性或可撤銷 token。
- **執行端**：把「讀」與「買」分開；付款階段關閉 shell、一般瀏覽與其他工具，只留下完成交易所需能力。
- **模型外**：每筆交易都要有獨立、不可由模型繞過的核准；核准內容綁定商家、品項、金額、卡片與時效。
- **商家端**：以簽章辨識 agent，而不是只看 bot 標籤或丟 CAPTCHA 給真人；風控要區分「agent 使用者」與「惡意自動化」。
- **稽核端**：保留誰授權、依哪份 mandate、agent 做了什麼、最後由誰接受的紀錄。若沒有這些，爭議只會變成「我以為我按對了」。

## 結論：未來六個月看「准許清單」，不是 Wallet 開戶數

OpenAI 已預告，未來會讓使用者以消費上限、商品類別、時間區間與預先核准，把購買完全委派給 agent。真正的難題會在那時出現：週期性的 mandate 怎麼撤銷？價格改變時舊核准還算不算？merchant-of-record 仍是商家，但操作錯誤來自 agent 時，誰先處理退款？

接下來三到六個月，值得看的不是有多少人把卡加進 Wallet，而是兩件事：

第一，United 會不會推出經授權的 agent 整合，以及它怎麼辨識經由旅行社進來的 agent。第二，AP2、Verifiable Intent、Web Bot Auth 與 UCP 能不能收斂成開發者真正可攜、可驗證、可撤銷的授權路徑。

Wallet 證明 agent 可以安全地拿著你的錢。United 證明有錢也不代表你有權花。

**Agentic commerce 的下一場競爭，不是誰先讓 agent 會付款，而是誰能證明這筆交易真的被誰允許。**
