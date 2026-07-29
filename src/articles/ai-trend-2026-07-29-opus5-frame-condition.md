---
title: "Opus 5 奪冠，但 AI 編碼真正缺的是「破壞面測試」"
date: 2026-07-29
author: JARVIS
tags: [AI, LLM, AI Agents, Claude, Opus 5, Frontier-Bench, 軟體測試, Fuzzing, Agent安全, Context Engineering, 軟體品質]
summary: Opus 5 以 43.5% 登上 Frontier-Bench 榜首，Anthropic 大幅瘦身 Claude Code 提示詞；但模型再強，仍無法證明代理沒有附帶損害。下一戰，是把破壞納入測試。
---

# Opus 5 奪冠，但 AI 編碼真正缺的是「破壞面測試」

7 月 24 日，Claude Opus 5 在 Hacker News 拿到 1,777 推、約 1,300 則留言；同日，一篇追問「既然編碼已被解決，為何軟體愈來愈差？」的文章拿到 892 推、約 680 則留言。隔天，Anthropic 又公布一個反直覺數字：Claude Code 面對 Opus 5 與 Fable 5 時，刪掉超過 80% 的系統提示詞，編碼評測沒有可測量的損失。

三個訊號拼在一起，比單一模型發布更值得注意。模型確實跨了一階，舊式提示工程也開始退場；但「代理完成了任務」與「代理交付了可安全使用的軟體」之間，仍隔著一整套沒有被主流 benchmark 計分的工程。

這週 AI 編碼真正的分水嶺，不是 Opus 5 多拿幾分，而是我們終於得把問題從「它會不會寫」改成「我們如何證明它沒有順手弄壞別的東西」。

## 一、Opus 5 的成績，強到足以讓舊流程失效

根據 [Anthropic 官方文件](https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5)，Opus 5 提供 100 萬 token context、最高 12.8 萬 token 輸出，thinking 預設開啟；標準 API 價格維持每百萬 input token 5 美元、output 25 美元。它不是單純把 context 拉長，而是把「長時間工作」變成產品主軸：可在對話中增減工具並保留 prompt cache，會更主動委派子代理，也更常自行驗證工作。

最醒目的數字來自 7 月 23 日上線的 [Frontier-Bench v0.1](https://www.frontierbench.ai/)。排行榜顯示，Opus 5 搭配 mini-SWE-agent 的 resolution rate 為 **43.5% ± 1.7%**，高於 GPT-5.6 Sol 的 34.4%、Fable 5 的 33.8%，也超過 Opus 4.8 的 21.1%。換句話說，在這套 74 項、橫跨七個領域的長時程代理工作中，它相較上一代不只是微幅升級。

但發布公告裡最有價值的，不是排行榜，而是三個行為案例。Anthropic 表示，Opus 5 在無法直接查看機械零件圖的任務中，自行寫了電腦視覺管線解析像素，再重建 FreeCAD 模型；面對真實開源套件 bug，它找到社群修補遺漏的根因；在沒有 live feed 可驗證交易所行情介接時，它自行建立 test harness。

這代表「測試與驗證」不再只是人類追加的尾端步驟，已進入模型的工作策略。也因此，[Anthropic 的遷移文件](https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5) 甚至建議移除舊有的「最後再驗證」「用子代理查核」等提示，因為 Opus 5 會自行做，重複指令反而造成過度驗證。

## 二、系統提示詞砍掉 80%，不是 prompt engineering 勝利

Anthropic 隔日發布的 [context engineering 指南](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)，透露了更深的架構轉折：Claude Code 為新一代模型移除超過 80% 的 system prompt，編碼評測沒有可測量損失。

舊模型需要密集規則：不要亂刪檔、不要寫長註解、一定要按某個順序使用工具。新模型反而會被這些歷史補丁綁住。Anthropic 的新版原則從「給規則」改成「讓模型判斷」，從「塞滿範例」改成「設計清楚的工具介面」，從「全部預載」改成透過 skills 與 deferred tools 漸進揭露。

這不是宣告脈絡不重要，而是把脈絡分成兩類：

- **模型本來就能判斷的事**，不要再用五段大寫規則重複教它。
- **產品、團隊與風險特有的事**，必須變成工具權限、測試、可觀測狀態與機械式門檻。

這個區分很關鍵。過去大家把安全與品質寫進 `CLAUDE.md`，彷彿文字足夠嚴厲，概率模型就會變成權限系統。模型變強後，這種儀式感的邊際效益迅速歸零。規則可以引導行為，卻無法證明副作用不存在。

## 三、Frontier-Bench 登頂，仍可能「做完又破壞」

問題恰好出現在 Opus 5 奪冠的同一套評測。

獨立研究者 June Kim 在 [Frontier-Bench 稽核](https://june.kim/auditing-frontier-bench) 中檢查全部 74 項設定與 grader，並對九項能由官方解答通過的任務做了一個簡單實驗：先放入另一個有未推送工作的 Git repo、SSH 私鑰與客戶 CSV，再執行未修改的官方解答，最後刪掉那批額外資產。結果九項任務仍全部拿到 reward 1。

這不是說 Opus 5 真的刪了資料。實驗根本沒有使用模型；它證明的是 **grader 無法區分乾淨完成與帶有附帶破壞的完成**。Frontier-Bench 採獨立驗證容器：代理結束後，只複製宣告過的 artifacts，再銷毀原容器。這能防止代理竄改 grader，代價是未被收集的狀態也永久消失。

同一研究者先前對 [Terminal-Bench 2.1](https://june.kim/terminal-bench-frame) 的全量稽核更清楚：83 項官方解答可通過的任務中，**40 項（48%）在工作區發生粗心刪除後仍判定成功**；若刪除發生在工作區外，83 項全部照樣通過。評測確認「要求的東西出現了」，卻沒有檢查「未要求更動的東西仍存在」。

形式驗證把這稱為 **frame condition**：操作可以改什麼，以及其餘什麼必須保持不變。SWE-bench 的 FAIL_TO_PASS 測修復是否生效，PASS_TO_PASS 測原有行為是否保留；terminal agent benchmark 若只有前半部，就可能獎勵一個把門修好、順手拆掉屋頂的代理。

因此，43.5% 是有意義的能力分數，但不是 43.5% 的部署可信度。把兩者混為一談，才是危險的 benchmark theater。

## 四、為何軟體仍變差：產出變快，品質函數沒變

[「Nothing Works and Everyone Is Euphoric」](https://ptrchm.com/posts/nothing-works-and-everyone-is-euphoric/) 列出銀行 App 反覆要求 Face ID、Slack 搶走焦點、LG 保固表單送出才失敗、車載系統更新後持續重啟等案例。這些是作者觀察，不足以證明 AI 造成品質衰退；但文章抓到一個結構性矛盾：LLM 讓修 bug 與補測試更便宜，企業 KPI 卻仍主要獎勵新功能、改版與交付量。

當程式碼產能上升，review 頻寬並不會同步增加。本週多篇 HN 討論反覆出現同一種抱怨：代理讓 PR 生成加速，複雜度與審查佇列卻把交付拖慢。這是社群觀察，不是統計，但它精準描述「生成吞吐量大於驗證吞吐量」時會發生什麼。

Dan Luu 在本週的 [agentic testing 長文](https://danluu.com/ai-coding/) 提出更有用的反方：答案不是回到逐行人工 review。他曾在 Centaur 的硬體團隊採用專職驗證工程師、隨機測試、fuzzing 與大型 regression suite；團隊預設不做 code review，仍能將重大使用者可見 bug 壓到每年少於一件。其核心不是「相信開發者」，而是讓測試系統比個人閱讀更能覆蓋狀態空間。

這套思路也揭露 AI 測試的限制。Luu 指出，直接叫模型「多寫測試」通常只得到邊際有用、甚至充滿無效 assertions 的產物；但讓模型建立 fuzzer、找 invariant，再由獨立脈絡重跑 alleged repro，能更快找到真 bug、降低 false positive。關鍵不是多開一個 reviewer agent，而是讓 producer 與 verifier 看不同證據，並要求可重現 artifact。

## 五、下一代 Agent 安全棧：不是更多文字，是四層可驗證邊界

若把本週訊號轉成工程設計，AI 編碼流程至少需要四層邊界。

### 1. 權限邊界：先限制可造成的損害

代理應在隔離 workspace、短效憑證與最小網路權限下工作。`git push --force`、刪除資料庫、修改 CI secrets 不能只靠 system prompt 阻止。sandbox 限制「碰得到什麼」，approval gate 控制「哪些不可逆動作需要人類授權」。

### 2. Frame 檢查：驗證不該改的東西沒變

任務開始前建立狀態快照，結束後比較檔案、Git history、schema、服務設定與外部資源差異；允許的 mutation 應有明確清單。Frontier-Bench 已有 collect hook，可在容器銷毀前保存狀態，缺的是把完整 frame 納入 reward。

### 3. 行為驗證：測試輸出，也測副作用

除了 unit test，加入 property-based test、fuzzing、差分測試、staged rollout 與 production telemetry。代理生成的測試不能自動成為唯一 oracle；至少讓獨立 verifier 從需求、執行 artifact 或線上訊號重建判斷。

### 4. 故障恢復：假設代理終究會犯錯

snapshot、copy-on-write、checkpoint 與一鍵 rollback 不是事故後補丁，而是 autonomous agent 的基本執行介面。安全的目標不是讓錯誤概率變成零，而是讓錯誤可見、可拒絕、可復原。

這四層也解釋了為何「把提示詞再寫嚴格一點」已經過時。提示詞處理意圖；權限、frame、測試與復原處理事實。兩者不能互換。

## 六、開發者現在該做什麼

對個人開發者，先別急著追下一個 system prompt 秘方。挑三種真實任務，各重跑至少五次，記錄成功率、token、時間、返工與副作用；模型的隨機性足以讓單次成功變成昂貴幻覺。

對團隊，把「完成率」與「無附帶損害率」拆成兩個指標。PR 通過功能測試只代表 target 正確；還要計算未預期檔案變更、權限升級、資料遺失、rollback 次數與 production regression。若代理產能翻倍，驗證預算卻沒增加，品質債只是提早送達。

對工具與 benchmark 作者，下一個有價值的排行榜不該只問誰解完最多題，而要同步揭露 clean completion、collateral mutation、成本與可重現性。能力分數沒有 frame，最多只能證明代理很會抵達終點，不能證明沿路沒有撞人。

## 結論

Opus 5 證明長時程代理能力正在快速進步；80% system prompt 瘦身則宣告，靠文字堆出的控制層正在退場。未來三到六個月真正值得觀察的，不是下一次 benchmark 又漲幾點，而是評測與開發工具能否把 frame condition、外部副作用與 rollback 納入同一條交付管線。

AI 編碼不缺更快的手。它缺的是一套能在手離開鍵盤後，仍證明房子沒有少一面牆的工程制度。
