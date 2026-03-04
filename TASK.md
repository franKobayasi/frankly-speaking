# TASK.md - frankly-speaking Blog Redesign

## 任務總覽

將 frankly-speaking 部落格重新設計為卡片式 UI。

---

## Phase 1: 準備工作

### T1.1 安裝依賴
- [ ] 安裝 `react-syntax-highlighter` (用於程式碼高亮)
- [ ] 安裝相關類型定義 `@types/react-syntax-highlighter`

### T1.2 建立共用樣式檔案
- [ ] 建立 `src/styles/theme.ts` - 主題色彩變數
- [ ] 建立 `src/styles/GlobalStyles.ts` - 全域樣式 (重置 CSS)

---

## Phase 2: 部落格列表頁面

### T2.1 建立文章卡片組件
- [ ] 建立 `src/components/BlogCard.tsx`
- [ ] 實作卡片結構 (標題、日期、摘要)
- [ ] 實作卡片樣式 (圓角、陰影、懸停效果)
- [ ] 實作 RWD 響應式

### T2.2 建立文章網格組件
- [ ] 建立 `src/components/BlogGrid.tsx`
- [ ] 實作 CSS Grid 佈局
- [ ] 實作響應式斷點

### T2.3 更新文章列表頁面
- [ ] 修改 `src/pages/blog/index.tsx`
- [ ] 實作文章 metadata 解析 (從 markdown 擷取標題、日期、摘要)
- [ ] 整合 BlogCard 和 BlogGrid 組件

---

## Phase 3: 文章詳情頁面

### T3.1 建立文章內容組件
- [ ] 建立 `src/components/ArticleContent.tsx`
- [ ] 整合 react-markdown
- [ ] 整合 react-syntax-highlighter
- [ ] 實作文章內容樣式 (行高、字體、間距)

### T3.2 建立返回按鈕
- [ ] 建立 `src/components/BackLink.tsx`
- [ ] 連結回 /blog

### T3.3 更新文章詳情頁面
- [ ] 修改 `src/pages/blog/[article].tsx`
- [ ] 實作文章 metadata 解析
- [ ] 整合 ArticleContent 和 BackLink 組件

---

## Phase 4: 測試與優化

### T4.1 驗收測試
- [ ] 測試部落格列表卡片顯示
- [ ] 測試卡片懸停效果
- [ ] 測試文章詳情頁渲染
- [ ] 測試程式碼區塊高亮
- [ ] 測試 RWD 響應式 (手機/平板/桌面)

### T4.2 現有文章相容性
- [ ] 確認 style-components.md 正常顯示
- [ ] 確認 typescript-note.md 正常顯示

---

## Phase 5: 可選功能 (視情況)

### T5.1 分類/標籤功能
- [ ] 從文章 metadata 解析分類
- [ ] 在卡片上顯示分類標籤
- [ ] 列表頁支援分類篩選

### T5.2 程式碼區塊優化
- [ ] 加入複製按鈕
- [ ] 顯示語言標籤

---

## 預估工時

| Phase | 預估時間 |
|-------|----------|
| Phase 1: 準備工作 | 30 分鐘 |
| Phase 2: 列表頁面 | 2 小時 |
| Phase 3: 詳情頁面 | 1.5 小時 |
| Phase 4: 測試優化 | 1 小時 |
| **總計** | **~5 小時** |

---

## 技術筆記

### 文章 Metadata 解析範例

現有文章格式:
```markdown
# Styled component 中文筆記
> **Summary：**本文是針對 Styled Component v5.1.0 版本...
> Author：Frank Lin
> Status：已完成（2020/5/29）
```

解析方式:
- 標題: 讀取第一個 `# ` 後的文字
- 摘要: 讀取 `> **Summary：**` 後到下一個 `>` 前的文字
- 日期: 讀取 `> Date：` 或 `Status：` 中的日期

### 依賴安裝指令

```bash
npm install react-syntax-highlighter
npm install --save-dev @types/react-syntax-highlighter
```
