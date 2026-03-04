# TASK.md - frankly-speaking Blog Redesign

## 任務總覽

將 frankly-speaking 部落格重新設計為 Stripe Blog 風格的卡片式 UI。

---

## Phase 1: 準備工作

### T1.1 安裝依賴
- [ ] 安裝 Tailwind CSS (如尚未安裝)
- [ ] 安裝 Headless UI: `npm install @headlessui/react`
- [ ] 安裝 Shiki 相關套件:
  - `npm install shiki rehype-pretty-code`
- [ ] 安裝 Markdown 處理:
  - `npm install react-markdown remark-gfm`
- [ ] 安裝相關類型定義

### T1.2 Tailwind 配置
- [ ] 配置 Tailwind 主題色彩 (Stripe 調色板)
- [ ] 添加自定義字體 (Inter, Caliste/Georgia)

### T1.3 建立共用工具
- [ ] 建立 `src/utils/metadata.ts` - 文章 metadata 解析函數
- [ ] 測試解析現有文章格式

---

## Phase 2: 部落格列表頁面 (Stripe 風格)

### T2.1 建立文章卡片組件
- [ ] 建立 `src/components/ArticleCard.tsx`
- [ ] 實作卡片結構 (標題、日期、作者、描述)
- [ ] 實作卡片樣式 (Stripe 風格: 圓角 8px、#E3E8EE 邊框、柔和陰影)
- [ ] 實作懸停效果 (陰影加深)
- [ ] 實作 RWD 響應式

### T2.2 實作卡片展開功能 (Headless UI Accordion)
- [ ] 使用 Headless UI Accordion 組件
- [ ] 展開顯示 Summary (從 metadata 解析)
- [ ] 展開顯示 Tags (膠囊樣式)
- [ ] 實作展開動畫 (Transition: fade + slide)
- [ ] 實作 Chevron 圖標旋轉

### T2.3 建立文章網格組件
- [ ] 建立 `src/components/ArticleGrid.tsx`
- [ ] 實作 CSS Grid 佈局 (響應式: 1/2/3 列)
- [ ] 設定間距 (gap: 24px)
- [ ] 設定最大寬度 (max-width: 1200px)

### T2.4 更新文章列表頁面
- [ ] 修改 `src/pages/blog/index.tsx`
- [ ] 實作文章 metadata 解析
- [ ] 整合 ArticleCard 和 ArticleGrid 組件
- [ ] 設定頁面背景色 (#F7F9FC)

---

## Phase 3: 文章詳情頁面

### T3.1 建立 Markdown 渲染組件
- [ ] 建立 `src/components/MarkdownContent.tsx`
- [ ] 整合 react-markdown + remark-gfm
- [ ] 配置 rehype-pretty-code (Shiki)
- [ ] 設定程式碼區塊主題 (vitesse-light 或 github-light)

### T3.2 建立返回按鈕
- [ ] 建立 `src/components/BackLink.tsx`
- [ ] 文字: "← All Articles"
- [ ] 連結到 /blog

### T3.3 建立文章 Header 組件
- [ ] 建立 `src/components/ArticleHeader.tsx`
- [ ] 顯示標題、日期、作者
- [ ] 顯示 Tags (膠囊樣式)

### T3.4 更新文章詳情頁面
- [ ] 修改 `src/pages/blog/[article].tsx`
- [ ] 實作文章 metadata 解析
- [ ] 整合 MarkdownContent、BackLink、ArticleHeader
- [ ] 設定內容區域樣式 (max-width: 720px, 行高: 1.75)

---

## Phase 4: 測試與優化

### T4.1 驗收測試
- [ ] 測試部落格列表卡片顯示 (Stripe 風格)
- [ ] 測試卡片懸停效果
- [ ] 測試卡片展開/收合功能
- [ ] 測試 Summary + Tags 顯示
- [ ] 測試文章詳情頁渲染
- [ ] 測試程式碼區塊高亮 (Shiki)
- [ ] 測試 RWD 響應式 (手機/平板/桌面)

### T4.2 現有文章相容性
- [ ] 確認 style-components.md 正常顯示
- [ ] 確認 typescript-note.md 正常顯示
- [ ] 確認 metadata 解析正確

### T4.3 效能優化
- [ ] 確認 Shiki 在 build 時預渲染
- [ ] 確認無客戶端運行時語法高亮負擔

---

## Phase 5: 可選功能 (視情況)

### T5.1 分類過濾
- [ ] 在列表頁加入分類篩選器
- [ ] 支援點擊標籤過濾文章

### T5.2 程式碼區塊優化
- [ ] 加入語言標籤顯示
- [ ] 加入複製按鈕 (可選)

---

## 預估工時

| Phase | 預估時間 |
|-------|----------|
| Phase 1: 準備工作 | 1 小時 |
| Phase 2: 列表頁面 (含展開) | 2.5 小時 |
| Phase 3: 詳情頁面 | 1.5 小時 |
| Phase 4: 測試優化 | 1 小時 |
| **總計** | **~6 小時** |

---

## 技術筆記

### 文章 Metadata 解析範例

現有文章格式:
```markdown
# Styled component 中文筆記
> **Summary：**本文是針對 Styled Component v5.1.0 版本...
> Author：Frank Lin
> Date：2020/5/29
> Tags：React, CSS, Styled Components
```

解析規則:
- **標題**: 讀取第一個 `# ` 後的文字
- **Summary**: 讀取 `> **Summary：**` 後到下一個 `>` 前的文字
- **作者**: 讀取 `> Author：` 後的文字
- **日期**: 讀取 `> Date：` 後的文字
- **Tags**: 讀取 `> Tags：` 後的文字 (逗號分隔)

### 依賴安裝指令

```bash
# Core
npm install @headlessui/react

# Markdown + Syntax Highlighting
npm install react-markdown remark-gfm rehype-pretty-code shiki
```

### Headless UI Accordion 使用範例

```tsx
import { Accordion } from '@headlessui/react'

<Accordion>
  <Accordion.Panel>
    <Summary>{summary}</Summary>
    <Tags>
      {tags.map(tag => <Tag>{tag}</Tag>)}
    </Tags>
  </Accordion.Panel>
</Accordion>
```

### Shiki + rehype-pretty-code 配置

```javascript
// next.config.js 或 md-components 配置
{
  remarkPlugins: [[rehypePrettyCode, {
    theme: 'vitesse-light',
    keepBackground: true,
  }]]
}
```
