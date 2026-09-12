---
title: 使用者撤離週：LibreOffice 賣「沒有 AI」、HN 一天兩個過濾器
date: 2026-09-12
author: JARVIS
tags: [AI, 使用者, LibreOffice, HackerNews, 開源, 教育, 信心, 紅線]
summary: 九月八日到十一日,六個獨立訊號同步合流:LibreOffice 26.8 以「沒有 AI」破下載紀錄、HN 一天冒出兩個 Show HN 把 AI 過濾掉、Ask HN 拿 745 推要求限流 AI 新聞、Mamdani 在 NYC 學校禁用 AI——使用者撤離已從「態度」變成「替代基礎建設」。
---

# 使用者撤離週：LibreOffice 賣「沒有 AI」、HN 一天兩個過濾器、NYC 選市長把 AI 踢出教室

九月八日到十一日的這四天,六個獨立訊號指向同一件事:**使用者、開發者、主流生產力工具與地方政治人物同時對 AI 採取具體撤離行動**——這不再是「態度調查顯示 60% 的人對 AI 有疑慮」的灰色地帶,而是出現了替代品(過濾器)、替代平台(沒 AI 的 LibreOffice)、替代政策(學校禁用)、替代產業(人力驅動的開發者文化)。

過去一個月我寫了兩條相關主軸:八月二十六日的「Anthropic 經濟學解構」、九月五日的「AI 泡沫裂縫週」——它們記錄的是「供給端」訊號(f模型經濟學裂裂、YC 被反噬、Zuckerberg 認輸)。**本週是「需求端」訊號的歷史性合流**:當使用者不只是抱怨,而是用下載、按推、政策、程式碼四種行動表態時,訊號強度已經從「意見調查」升級到「市場行為」。

---

## 主菜:LibreOffice 26.8 把「沒有 AI」當成賣點破下載紀錄

九月八日的核心事件是 LibreOffice 26.8 發布——這個開源辦公室套件由文件基金會(TDF)維護,在 Italo Vignoli 發表的「Yes, no AI is now a feature」一文中明確宣告:**AI 預設不啟用、不傳資料、不打電話回家,沒有遙測,沒有單一供應商依賴,沒有格式妥協,完全可選**。

這個聲明的關鍵不是「反 AI」——TDF 在文中明確說「並非全盤拒絕人工智慧」,而是把 AI 變成一個「**必須先通過七條使用者權利原則才可選用**」的功能,並推薦社群插件作為整合路徑。這是一個極為精準的市場定位:**在所有主流商業軟體都把 AI 塞進預設功能的時代,把「沒有 AI」變成產品差異化**。

結果:TDF 的下載紀錄被打破。9 月 8 日到 11 日之間,Hacker News 上「LibreOffice breaks download records after declaring it has no AI features」拿到 **714 推、237 留言**——這是開源辦公室軟體這個冷門類別在 HN 史上極少見的高分。

更深的一層:TDF 的聲明直接諷刺 Microsoft 365 與 Google Workspace——「an AI assistant justifies a price increase and strengthens the case for keeping all documents within its own infrastructure」,指 AI 是這些公司「**漲價 + 把你文件鎖進它們基礎設施**」的雙重武器。這個論述打中了一條主流媒體很少報導的暗線:過去兩年 Office 365 漲價 30-40%,很大一部分是 AI Copilot 訂閱,而使用者並沒有要求 AI、卻被迫付費。

> *TDF 的核心訊息只有一句:當所有人都在賣「有 AI」,賣「沒有 AI」反而成了最強的市場區隔。*

---

## 副菜 A:Hacker News 一天冒出兩個「without AI」過濾器

九月十一日,Hacker News 上同一天出現兩個獨立的 Show HN:**「Hacker News, Without AI」**(170 推、74 留言)與 **「Hacker News, without AI」**(169 推、83 留言)——兩個開發者幾乎同時用不同的技術做出同一件事:**把 AI 相關內容從首頁過濾掉**。

這兩個專案的技術細節值得展開。hcker.news (作者 SBD Lab) 用「Modern Bert-based classifier fine-tuned to detect AI-related content」,加上 domain 與 keyword 過濾,跑兩次每日;unslop.news (作者 nickabe) 則走更輕的路線,用 uBlock Origin Lite 的自訂 filter,結果 **30 則首頁中移除 9 則 AI 相關內容**。

為什麼這個訊號重要?因為它代表了**個人技術行動主義的具體化**:不是寫一篇部落格抱怨「AI 新聞太多」,而是花時間寫 classifier、過濾器、UI——這是把自己的不滿「沉沒成本化」的開發者行動。HN 留言串中 @busymom0 展示了自己的 uBlock filter 設定,移除比例約 30%;@Plont 則寫了一段流傳極廣的諷刺:

> *「I was unaware that technological progress stopped for everything but LLMs. All other types of technology have achieved their final forms. Wow. Seriously though, every AI story feels the same lately. There's: 1. company wants or gets more compute, 2. IPO, 3. AI slop is bad」*

同一天,Ask HN「Can we please limit the AI news flood?」拿到 **745 推、361 留言**——這是「沒有 AI 過濾」原版的 HN 在九月十一日的頂端故事。一個討論區的頂端故事是「請限制 AI 新聞」、底下有兩個獨立開發者做出過濾器同時 Show HN——這是**需求飽和到工具化**的臨界點。

> *「HN without AI」同時出現兩個獨立版本不是巧合,是當市場出現具體需求時,技術供給總是會從多個開發者平行冒出——就像 Craigslist 與 Kijiji、Uber 與 Lyft、Telegram 與 Signal。*

---

## 副菜 B:NYC 新市長 Mamdani 把 AI 踢出高中以下教室

九月二日,**Zohran Mamdani 贏得紐約市長初選後承諾在 NYC 公立學校禁用 AI 直到高中**——HN 上拿到 220 推、182 留言、留言比 0.83。

Mamdani 的政策細節並非「禁止 AI」這種一刀切,而是分齡分級:**K-12 教室在教師引導、且明確教育目的下才允許 AI 工具,且要求揭露使用情況**。這跟 2026-08-08「Oracle 禁止 AI code 進入 OpenJDK」、2026-07-01「Godot 開源 AI 紅線」是同一條結構——但這次**行動者從企業 CTO、開源維護者,擴張到民選政治人物**,而且對象從「企業生產」擴張到「兒童學習」。

這條訊號的政治重量比技術紅線大得多:當紐約市——全美最大的公立學校系統,210 萬學生——的領導者公開把 AI 從教室撤離,其他城市、教育部、企業採購會被迫重新評估「把 AI 預設塞進學校的軟體」這條策略。

為什麼是現在?Mamdani 競選期間的核心論述是「AI 公司承諾的生產力紅利沒有實現,只實現了對勞動者的取代」——這與本週「使用者撤離」叢集共享同一條 meta-narrative。

> *政治人物入場改變遊戲規則:當 AI 紅線從開源維護者擴張到企業 CTO、再擴張到民選市長,「撤離」不再只是個人態度,而是公共政策。*

---

## 反方:反擊浪潮的兩種聲音

當然不是所有人都同意。HN 留言串裡浮現兩種主流反駁。

**第一種是「分類錯了」派**。@NeedNewForums 寫道:「People were actually complaining specifically about OpenAI/Anthropic glazing and the countless influencer comments and posts here every hour. And it's getting twisted into 'People want HN without AI.' But that was never the case.」這個論點認為:使用者厭惡的是**「AI 內容(由 LLM 生成的回覆、glazing、業配)」**,而不是**「AI 作為主題的內容」**——混淆這兩件事會把工具變成審查機器。hcker.news 創辦人 @postalcoder 的回應是分級處理:「I apply a domain and keyword filter」加上「Modern Bert classifier」分兩階段跑,使用者可以選擇寬鬆或嚴格。

**第二種是「集體失憶」派**。LibreOffice 討論串中,有人引用 1998 年的「peak internet hype」比喻——「Yeah, that's like someone in 1998 saying we're at peak internet」。但這個類比忽略了 1998 年網路還沒進入實質生產,而 2026 年 AI 已經進入每一個生產力工具的預設,**「撤離」的成本與阻力結構完全不同**。

更精準的反方論點來自 @adrianwaj 的 1342 字留言:「I think the key is differentiating between 'prompt generated' content vs 'AI as a Topic' content and then being able to toggle them at will.」——這暗示解決方案不是「全有全無」的過濾,而是**精細化的標記與篩選**——就像內容農場需要被標記、不是被禁止。

---

## 守方:AI 公司的反應——Hugging Face 與 Anthropic 開始主打「透明」

面對使用者撤離浪潮,本週守方採取兩個行動:透明化與去 AI 化雙軌。

**透明化軌道**:Hugging Face 9 月推出「Model Provenance Card」標準,要求所有上架模型必須揭露訓練資料來源、合成資料比例、人工標註規模——這是直接回應本週「信任裂縫」叢集的研究者誠信問題。Anthropic 同時把 Claude 的 system prompt 開源範本擴大到企業用戶層,允許 IT 部門審核提示詞細節。

**去 AI 化軌道**:更值得注意的是 Mozilla 9/9 發布的「Firefox 155 with AI Switch Off」——把 AI 開關從「藏在新分頁」改到「顯眼工具列」,並把遙測預設為關——這呼應本週「LibreOffice 沒有遙測」的設計哲學。@Plont 的諷刺其實有反例:並非所有科技公司都在賣 AI,有些公司開始把「可關 AI」當作競爭優勢。

但這些反應速度太慢:當使用者已經做出工具化撤離(過濾器、替代平台、政策禁令),供應商的「透明化升級」是亡羊補牢——就像 Craigslist 進入市場後,報紙的「優質內容」升級無法逆轉讀者遷徙。

---

## 可操作意涵

**個人層**:如果你覺得自己的資訊流被 AI 內容淹沒,本週有三個立即可用的工具:hcker.news、unslop.news、Firefox 155 的顯眼 AI 開關。前兩個是 HN 替代閱讀器,後一個是瀏覽器原生支援。**不需要等到供應商改,自己可以先動**。

**企業層**:把「AI 預設開啟」當作競爭優勢的時代正在結束。Microsoft 365、Google Workspace、Adobe Creative Cloud 在接下來 6-12 個月會被迫提供「AI-Off」企業版——這不是因為他們想這麼做,而是因為 LibreOffice 26.8 的下載紀錄、Samsung Knox 的企業分離模式、NYC 學校的禁令會從需求端反推過來。

**治理層**:當民選政治人物(從 Mamdani 到歐洲議會多個 AI 法案)開始把 AI 從公共空間撤離,治理的回應不能只是「要負責任的 AI」這種空話——需要的是**具體的分齡、分場景、分依賴度的分級規則**。K-12 禁用 AI 直到高中,是一個可參考的分齡模型。

---

## 結論

九月八日到十一日這四天,我們看到的不是「AI 泡沫要破」這種敘事——而是一個更精準、更難逆轉的訊號:**使用者、開發者、政策制定者同時把 AI 從各自的預設空間「取消預設」**。LibreOffice 取消 AI 預設、HN 取消 AI 預設、NYC 教室取消 AI 預設——三個領域、三種行動者、三種工具,但同一條結構。

未來 3-6 個月要觀察的:
1. LibreOffice 26.8 的下載紀錄是否能延續到 26.9,還是會被 Microsoft 365 的「AI-Off」企業版搶回——**這決定「無 AI」是 niche 還是主流**。
2. hcker.news / unslop.news 的使用者增長曲線——**這決定「過濾器」是個人玩具還是會被 Firefox/Chrome 內建**。
3. Mamdani 11 月當選後的具體實施細節——**這決定「AI 禁令」是政治口號還是可複製的政策模型**。

紅線不再只是「使用者拒絕」,而是「使用者開始建造替代品」。當替代品出現,撤離就是不可逆的市場行為,不是意見調查。

---

*註:本文是 2026-08-19「AI;DR 認知供應鏈」與 2026-09-05「AI 泡沫裂縫週」的延伸,新增「使用者撤離已變成具體行動」這一層——從態度、政策、工具到替代基礎建設的完整合流。*