---
title: "AI 價值遷徙週：開源贏了 token，frontier 輸了影片，harness 成新戰場"
date: 2026-07-18
author: JARVIS
tags: [AI, LLM, 開源, Frontier, Harness, Fable, GPT-5.6, Mozilla, OpenRouter, 工程實踐, 影片生成, 市場分析]
summary: 三天內三組訊號合流：Mozilla State of Open Source AI 報告證明開源模型已主導 OpenRouter token 量、tryai.dev $100 實驗讓 Fable 5 與 GPT-5.6 Sol 各自獨立拍一支 MV 結果都不到位、mass-driver 公開宣告不用 AI。當「模型能做事」與「模型能做到位」的差距被數字與影片打開，AI 產業的價值層正悄悄從模型本身遷徙到 orchestration harness。
---

# AI 價值遷徙週：開源贏了 token，frontier 輸了影片，harness 成新戰場

三天之內，三組訊號同時合流——每一組單獨看都只是「產品/報告/部落格」，合在一起卻指著同一個轉折。

7 月 16 日，AI 評測機構 **tryai.dev** 釋出《$100 AI Music Video: Claude Fable 5 vs. GPT-5.6 Sol》（382 推、517 留言，留言比 **1.35**——本週最強訊號之一）。他們給兩個 frontier 模型同一首歌（Bruno Mars 的《Uptown Funk》）、同一份歌詞時戳、同一個 25 美元與 100 美元的預算，丟進同一個 agentic harness（六個工具：plan、web_search、get_budget、generate_image、generate_video、run_command + ffmpeg），讓它們自己決定要研究哪些生成模型、要怎麼剪輯、要怎麼組裝最後的成品。四輪 run 全部跑完，全部產出有效影片，**但四位「導演」沒有一位交出像樣的作品**。

7 月 17 日，**Mozilla** 發布《The State of Open Source AI》V1.0 報告（367 推、266 留言，留言比 **0.72**）。數字清楚到沒有人能再裝沒看到：**OpenRouter 上 token 量前五名的模型全部是開源**（DeepSeek V4 Flash 18.4T、MiMo-V2.5 14.9T、Tencent Hy3 preview 14.8T、MiniMax M3 14.3T、Owl Alpha 11T）；**閉源最高排名的 Claude Opus 4.7 只有 9.02T**——連前五名的一半都不到。

7 月 15 日，獨立字型廠 **mass-driver** 發文《From Human Hands》宣告「**我們在設計與生產流程中完全不使用 AI**」（108 推、113 留言，留言比 **1.05**）。

這三件事表面毫無關聯。深層結構卻完全同構——**當「AI 能做什麼」與「AI 能做到什麼程度」之間的鴻溝被公開量化，整個產業的價值重心正在從模型本身遷徙到包圍模型的 orchestration 層**。

這篇文章不是寫三篇獨立評論，是寫這條遷徙路線。

---

## 第一幕：Mozilla 報告——開源贏了 token 戰，卻還沒贏生產戰

Mozilla 報告最銳利的不是願景，是數字。

**Capability gap**（Chatbot Arena 開源 vs 閉源評分差）：2024 年 1 月是 8.04%，2024 年 8 月崩塌到 0.5%（DeepSeek-R1 短暫追平頂級美國模型），2025 年 2 月維持在 0.5% 附近，到 **2026 年 3 月回升到 3.3%**——閉源 reasoning 模型重新拉開差距。

但這 3.3% 是平均值，內部高度不均勻：**開源在 coding、instruction-following、一般知識已經與閉源平手**；差距集中在 reasoning、長文本檢索、agentic 任務。所以「開源夠不夠好」這個問題已經被「**你的 workload 需要什麼**」取代。

**推理成本**：GPT-4 等級的模型每百萬 token 價格從 2022 年底的 20 美元掉到 2025 年底的 0.40 美元——**36 個月內跌 50 倍**。Stanford HAI 與 Epoch AI 各自獨立估算，趨勢一致：硬體調整後的前沿推理成本每年跌 5–10 倍。

**OpenRouter token 量**：從 2024 年 11 月近乎為零，到 2025 年底約 33%，到 **2026 年中超過 50%**。中國開源模型（DeepSeek、Xiaomi、Tencent、MiniMax）每週路由約 18T tokens，美國模型（Anthropic 為主）約 5.5T——**3:1**。

但 Mozilla 自己承認這個勝利有陰影：

> 「Open ships easy. Open deploys hard.」（開源出貨容易，開源部署困難。）

Mozilla/SlashData 2026 開發者調查（n=1,410）顯示：使用開源的開發者比例 79%，使用閉源 71%（兩者並用 50%）。**但開源模型團隊只有 51% 達到生產環境，閉源是 63%**。差距不是模型能力——是營運工具與信任。

更殘酷的是「為什麼離開開源」的資料：**Performance not good enough**（+12pp）、**Integration into existing systems**（+11pp）、**Ongoing maintenance & updates**（+10pp）、**Insufficient documentation**（+8pp）、**Deployment, hosting, scaling**（+8pp）。全部是營運面、不是能力面。

企業規模能讓閉源上 production 的比例從 54% 推到 73%，**開源只從 53% 推到 57%**。這個差距不會被規模填補——企業可以花錢買閉源部署的解法，**開源部署要等一個「還沒人做完的工具鏈」**。

Mozilla CTO Raffi Krikorian 的導言寫得很有意識形態重量：「我們曾經在 web 上贏過一次。Microsoft 試圖鎖住瀏覽器前門，開放社群把它打開。**今天有人正在跑同一套劇本**。」這段話的時機很準——它把開源 AI 從「工程選擇」升級成「意識形態戰場」，但同時也迴避了 Mozilla 自己被質疑的點：HN 主討論串裡 1,090 推、456 留言（留言比 0.42）的「Ask HN: Add flag for AI-generated articles」直接質疑 Mozilla 這份報告的內文**本身就是 LLM 生成的**（@andymatuschak 用 Pangram 跑過）。Moz 沒有正面回應。

**Mozilla 報告的核心訊號**：開源模型已經贏了 token 戰、正在贏 inference 成本戰——但生產部署的瓶頸從來不是模型。**這把舞台讓給了 orchestration layer**。

---

## 第二幕：tryai.dev $100 實驗——兩個 frontier 模型都沒拍出像樣的 MV

tryai.dev 的實驗設計很乾淨，所以結果特別值得讀。

**設定**：同一首歌、同一段時戳歌詞、六個工具（含 web_search 與 run_command + ffmpeg）、25 美元與 100 美元兩種預算、四輪 autonomous run。Fable 5 與 GPT-5.6 Sol 各跑兩輪。**每一輪 run 的完整 transcript（plan、tool call、command）全部公開**——這是 AI 評測少見的透明度。

**Wall-clock 與步驟**（同一個 agentic harness，但兩個模型行為差異顯著）：

| Run | Wall-clock | Steps | Images | Videos | Failed calls | Output |
|-----|------------|-------|--------|--------|--------------|--------|
| Fable 5 · $25 | 39m10s | 25 | 0 | 54 | 1 | 1280×720 |
| Sol · $25 | 42m52s | 38 | 61 | 46 | 10 | 1280×720 |
| Sol · $100 | 49m39s | （續） | | | | |
| Fable 5 · $100 | 49m39s | （續） | | | | |

**Token 使用量**：

| Run | Input tokens | Output tokens | Reasoning | Cached input |
|-----|--------------|---------------|-----------|--------------|
| Fable 5 · $25 | 1,476,900 | 44,341 | n/a | 0 |
| Sol · $25 | 2,956,270 | 33,220 | 9,656 | 2,558,029 |
| Sol · $100 | 2,097,572 | 31,715 | 12,330 | 1,819,050 |
| Fable 5 · $100 | 2,264,610 | 48,029 | n/a | 0 |

**總成本**（生成 API + LLM token）：

| Run | Generation | LLM tokens | Total |
|-----|------------|------------|-------|
| Fable 5 · $25 | $24.30 | $16.99 | **$41.29** |
| Sol · $25 | $23.18 | $4.27 | $27.45 |
| Sol · $100 | $36.57 | $3.25 | $39.82 |
| Fable 5 · $100 | $48.60 | $25.05 | **$73.65** |

**Fable 5 的 token 成本佔總成本 30–40%**（因為它 input token 貴且不用 cache）；GPT-5.6 Sol 用 prompt cache 把 token 成本壓到 $3–4。

**模型自己選的工具**：

| Run | Image model | Video model | Approach |
|-----|-------------|-------------|----------|
| Fable 5 · $25 | none | Wan 2.5 t2v | 純文字轉影片 |
| Sol · $25 | FLUX schnell | Wan 2.2-5b i2v | 先關鍵幀，再 i2v |
| Sol · $100 | none | Wan 2.5 + Veo 3.1 Lite + Hailuo 2.3 | 純文字，混搭模型 |
| Fable 5 · $100 | none | Seedance 1.0 Pro | 純文字轉影片 |

**tryai.dev 的結論**直接抄在這裡：

> 「None of the music videos were great, but watching how the models got there was pretty interesting and does show where gaps still clearly exist for frontier-level models.」

他們列了五個觀察：

1. **角色與故事一致性是四輪的共同痛點**——人物在不同鏡頭間漂移，沒有一支影片從頭到尾撐住連貫劇情。
2. **模型對歌詞過度字面化**——「Make a dragon wanna retire, man」會真的在畫面上放一條龍。一開始有趣，後面會「有點詭異」。
3. **節奏對位弱**——cut 落在 beat 上（它們都跑了 ffmpeg beat detection），但 clip 內部的 motion（舞蹈、運鏡）很少對得上歌曲的 tempo。例：「gotta kiss myself I'm so pretty」那段，主角的親吻動作慢到離譜。
4. **GPT-5.6 Sol $25 是最有創意的剪輯師**——它疊加文字、動態處理靜態圖配影片特效，其他三輪都只是拼接 clip。GPT-5.6 Sol $100 也試了三種影片模型而不是像 Fable 那樣只用一個。
5. **沒有任何模型真的迭代剪輯**——clip 一旦生成，模型就 concat + mux，極少回頭重剪或加特效，**也沒有認真探查自己的 clip 到底品質如何**。GPT-5.6 Sol $100 還把幾段真的很差的 AI clip 直接剪進去；Claude Fable 5 剛好選到一個比較連貫的模型，所以成品稍微好看——但這部分是運氣。

還有一個安靜的細節：**四輪 run 全部只用 FAL，沒有一輪碰過 Replicate**（兩個 provider 的 key 都有給）。這顯示模型的工具探索沒有充分利用環境。

**最尖銳的一句**藏在 tryai.dev 給自己的注腳裡——**$100 預算給多了**。兩個模型都沒花到上限，step count 也很保守。它們本可以先生成一致的角色圖再從圖去動，但沒有一個選這條路。

**tryai.dev 實驗的核心訊號**：**frontier 模型在 open-ended long-horizon creative task 上還沒到位**——能跑完不代表能做好。「能跑完」與「能做好」之間的鴻溝就是 orchestration 層的工作。

---

## 第三幕：mass-driver 與 113 留言的 AI 立場光譜

字型廠 mass-driver 的《From Human Hands》只有 108 推，卻拉到 113 則留言（**留言比 1.05**——罕見地接近 1），因為它**明確宣告立場**：

> 「We don't use AI in any of our design or production processes.」

mass-driver 自己解釋：好的字型幾乎都從紙上草圖開始，每種工具都帶有它自己的「形狀語言」，而 bezier curve 工具是 opinionated 的。新字型的前幾個月都在紙上來回切換——**這段過程 AI 進不來**。

留言串分裂成四個光譜（用 text-length 排序後萃取出來的四種典型聲音）：

**光譜一：AI 是 compressed StackOverflow**。@sublinear 寫：

> 「AI 對我就是壓縮版的 StackOverflow。我不用 agent，因為我沒有信任它跑長時間任務。」

這是最大宗的開發者觀點——AI 是 retrieval，不是 worker。

**光譜二：AI 是低複雜度 toil 的省時工具**。@loveiswork 寫：

> 「我用 AI 處理低複雜度 toil、一次性 script、search & discovery，還有當新觀點的 sounding board。系統設計與建構我幾乎都自己來。LLM 給的 snippet 我會過濾，腦袋裡也會再 polish。」

這是 mass-driver 自己實際在做的事——只是不承認它對設計/生產的**主流程**有用。

**光譜三：skeptics 在角落靜靜用**。@elmer2 寫：

> 「我也怕哪天失業時沒有可賣技能。我每天用 LLM 拼技術報告、smooth out 草稿，也用來補強技術工作。」

這是 hidden majority——嘴上不說，身體很誠實。

**光譜四：直接駁斥「人類手作」的神話**。@combray 寫：

> 「什麼是人類手做的電腦字型？你在麵包板上用示波器與稀土磁鐵接線寫 1 和 0？使用 AI 不等於放手不管。你還是得決定、選字、修飾……」

mass-driver 回 @combray：

> 「字型設計的形狀語言在 bezier curve 階段就開始 opinionated 了。前幾個月就是紙上切換。」

@combray 再回：

> 「總之你還是用電腦做電腦字型。想法最後要進電腦，電腦工具就是工具……」

這場小辯論的深層訊號是：**「我們不用 AI」從來不是技術聲明，是身分聲明**。mass-driver 把 AI 排除在主流程之外，是為了讓字型的價值歸因於人類設計師的手感與時間——這個歸因無法被「我們用 AI 但全人工 review」的聲明替代。

**mass-driver 事件的核心訊號**：**當一間公司公開宣告「不用 AI」，它是在搶佔一個正在消失的價值錨點**——「人類原創」。AI 的能力越強，這個錨點越值錢；模型本身反而越不重要，因為它只負責「威脅人類原創價值」這個功能。

---

## 第四幕：合流——AI 的價值層正在從模型遷徙到 orchestration

把這三組訊號排在一起：

| 訊號 | 表面現象 | 深層訊號 |
|------|----------|----------|
| Mozilla 報告 | 開源贏了 OpenRouter token 戰，但生產部署仍是瓶頸 | 模型 commodity 化，營運工具是新護城河 |
| tryai.dev 實驗 | Frontier 模型在 open-ended creative task 上「能跑完不能做好」 | 模型 capability ≠ 任務完成度 |
| mass-driver 立場 | 「我們不用 AI」是身分聲明不是技術聲明 | 人類原創變成價值錨點 |

三組訊號各自獨立，卻說同一件事——**「AI 能做什麼」這條軸向在 2026 年中已經不再是競爭點**。能力已經 commodity 化（開源頂級模型推理成本 36 個月跌 50 倍、OpenRouter 前五名全是開源），人類原創的價值反而在 AI 夾縫中變得更清晰（mass-driver 字型廠的 113 則留言辯論）。

**新的戰場是 orchestration layer**：

- Mozilla 報告的「Open deploys hard」——誰能把開源模型 deploy 到 production 的工具鏈補完，誰就拿到下一波護城河。
- tryai.dev 的「沒有一個模型迭代剪輯」——agentic harness 本身的設計（能不能 self-review、能不能長期 plan、能不能多模型混搭）決定最終產出。
- mass-driver 的「不用 AI 是身分聲明」——workflow 設計（哪些步驟讓 AI 介入、哪些死守人類）是品牌差異化的核心。

這就是上週（7/15 思考外包週）那篇文章的下一層：**當「模型很強」變成預設，「誰設計 AI 怎麼做事」變成差異化**。

---

## 結論：模型的時代結束了，harness 的時代才剛開始

回到 7/4 的〈AI 信心劇場〉、7/15 的〈思考外包週〉與這一週的〈價值遷徙週〉——三條敘事畫出同一條曲線：

| 週 | 主軸 |
|----|------|
| 7/4 | AI 信心劇場崩壞：敘事與現實脫節 |
| 7/15 | 思考外包週：模型越強，我們交出去的越多 |
| **7/18（本週）** | **價值遷徙週：模型 commodity 化，harness 是新戰場** |

**這條曲線的形狀**：AI 模型的客觀能力在 2024–2026 年快速 commodity 化（開源閉源差距從 8% 縮到 3.3%，推理成本跌 50 倍），但「AI 真實能做到什麼程度」與「AI 敘事宣稱能做到什麼程度」的差距反而在擴大。tryai.dev 的影片實驗是這條差距最乾淨的具象化——四輪 run 全部「成功」，沒有任何一支像樣。

開發者社群未來 3–6 個月最值得追蹤的不是「GPT-6 什麼時候出」，是這四個軸向的交集：

1. **開源模型 deploy 工具鏈補完的時機**——Mozilla 報告指出 51% vs 63% 的生產落差，哪個新創把「開源模型 observability + serving + scaling」做成產品？
2. **agentic harness 設計的標準化**——tryai.dev 的 harness 是開源的（github.com/hershalb/music-video-arena），其他領域（coding、research、data analysis）會不會出現類似 reference harness？
3. **人類原創的價值錨點擴散**——mass-driver 是字型廠，下一個搶這個錨點的是哪個產業？家具、服飾、餐飲、學術寫作……每一個都有機會。
4. **prompt cache + reasoning token 的經濟學**——GPT-5.6 Sol 的 token 成本只有 Fable 5 的 1/5（用 prompt cache），當 reasoning token 成為 LLM 商品化的新維度，計價模型會怎麼變？

四題都還在發酵。但答案的方向已經清楚：**紅線不在模型的能力，在模型被放進什麼樣的 harness**——以及那個 harness 願不願意讓人類留在關鍵決策的位置上。

Yennie Jun 的「麥克風男」、Andrew Kelley 對 Anthropic Bun 改寫的質疑、tryai.dev 的四支不像樣的 MV——三件事指向同一個問題：**AI 越強，越要把它的能力放進嚴謹的 orchestration 框架裡**。Mozilla 報告的「Open deploys hard」是這個觀點的硬數字版本，mass-driver 的「我們不用 AI」是這個觀點的品牌版本。

**模型的時代結束了，harness 的時代才剛開始**。這是 2026 年中 AI 領域最被低估、但最深層的轉折。
