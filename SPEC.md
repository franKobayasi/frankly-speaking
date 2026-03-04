# SPEC.md - frankly-speaking Blog Redesign

## 1. 專案概述

- **專案名稱**: frankly-speaking 部落格重新設計
- **專案類型**: Next.js 個人部落格網站
- **核心功能**: 將現有陽春的部落格列表改為現代卡片式 UI，提供更好的閱讀體驗
- **目標用戶**: 訪問者、讀者

---

## 2. 技術栈

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 10 |
| UI 函式庫 | React 17 |
| 樣式方案 | **Tailwind CSS** |
| Headless UI | **Headless UI** (by Tailwind Labs) |
| 語言 | TypeScript |
| Markdown 渲染 | react-markdown |
| 代碼高亮 | **Shiki** (with rehype-pretty-code) |

---

## 3. UI/UX 規格

### 3.1 設計風格

參考 OpenClaw subagent 列表頁面的卡片式設計：
- 卡片式佈局，每個文章預覽為獨立卡片
- 圓角邊框 (border-radius: 12px 或 8px)
- 柔和陰影效果 (box-shadow)
- 整齊的間距 (gap: 24px)
- 簡潔的色彩 (淺灰背景、白卡片)
- 懸停效果 (陰影加深/輕微放大)

### 3.2 色彩系統

```
Primary:     #333333 (文字)
Secondary:  #666666 (次要文字)
Accent:     #3B82F6 (連結/強調)
Background: #F8FAFC (頁面背景)
Card BG:    #FFFFFF (卡片背景)
Border:     #E2E8F0 (邊框)
Hover:      #F1F5F9 (懸停背景)
```

### 3.3 字體系統

```
Heading:    "Inter", -apple-system, sans-serif
Body:       "Inter", -apple-system, sans-serif
Code:       "Fira Code", "JetBrains Mono", monospace
```

### 3.4 響應式斷點

| 斷點 | 寬度 | 卡片排列 |
|------|------|----------|
| Mobile | < 640px | 1 列 |
| Tablet | 640px - 1024px | 2 列 |
| Desktop | > 1024px | 3 列 |

---

## 4. 功能規格

### F1: 部落格列表卡片

#### 卡片內容
- **標題**: 文章標題 (H2，字體加粗)
- **日期**: 發布日期 (格式: YYYY/MM/DD)
- **摘要**: 從文章開頭擷取前 100-150 字
- **分類標籤** (可選): 文章分類

#### 卡片樣式
- 背景: 白色 (#FFFFFF)
- 邊框: 1px solid #E2E8F0
- 圓角: 12px
- 陰影: 0 1px 3px rgba(0,0,0,0.1)
- 內邊距: 24px
- 最小高度: 180px

#### 懸停效果
- 陰影加深: 0 4px 12px rgba(0,0,0,0.15)
- 輕微上浮: transform: translateY(-2px)
- 過渡時間: 0.2s ease

### F2: 文章詳情頁

#### 頁面結構
1. **Header 區域**
   - 文章標題
   - 發布日期
   - 分類標籤 (可選)

2. **內容區域**
   - 最大寬度: 750px
   - 水平置中
   - 行高: 1.8
   - 字體大小: 18px

3. **程式碼區塊**
   - 使用 Shiki (rehype-pretty-code)
   - 主題: 淺色主題 (如 GitHub Light 或 Vitesse Light)
   - 行號顯示
   - 複製按鈕 (可選)

4. **返回按鈕**
   - 位置: 內容區域頂部左側
   - 文字: "← 返回文章列表"
   - 連結到 /blog

### F3: RWD 響應式

- 卡片網格自適應列數
- 文章內容區域在行動裝置上留邊距
- 導航欄在行動裝置上保持可用

### F4: 分類/標籤 (可選)

- 從文章 metadata 解析分類
- 列表頁支援分類篩選 (可選)

---

## 5. 頁面規格

### 5.1 部落格列表頁 (src/pages/blog/index.tsx)

```tsx
// 結構
<PageWrapper>
  <Header>導航</Header>
  <PageTitle>Blog</PageTitle>
  <CardGrid>
    {articles.map(article => (
      <ArticleCard>
        <CardTitle>{title}</CardTitle>
        <CardDate>{date}</CardDate>
        <CardExcerpt>{excerpt}</CardExcerpt>
      </ArticleCard>
    ))}
  </CardGrid>
</PageWrapper>
```

### 5.2 文章詳情頁 (src/pages/blog/[article].tsx)

```tsx
// 結構
<PageWrapper>
  <Header>導航</Header>
  <ArticleContainer>
    <BackLink>← 返回文章列表</BackLink>
    <ArticleHeader>
      <Title>{title}</Title>
      <Meta>{date} | {category}</Meta>
    </ArticleHeader>
    <MarkdownContent>
      <ReactMarkdown>{content}</ReactMarkdown>
    </MarkdownContent>
  </ArticleContainer>
</PageWrapper>
```

---

## 6. 元數據解析

文章 markdown 格式 (現有):
```markdown
# 標題
> **Summary：** 摘要內容
> Author：作者
> Date：2020/5/29
> Category：分類
```

解析規則:
- 第一個 `#` 後的文字為標題
- `> **Summary：**` 後的文字為摘要
- `> Date：` 後的文字為日期

---

## 7. 技術決策

### 7.1 Headless UI Library: Headless UI

**選擇理由:**
- **Tailwind Labs 官方出品**: 與 Tailwind CSS 無縫整合
- **輕量級**: 體積極小，無多餘樣式
- **完全免費開源**: MIT License
- **組件實用**: Dialog, Dropdown Menu, Listbox, Transition, Popover 等常用組件
- **與 Tailwind 完美配合**: 官方推薦的 Headless UI 庫
- **易於上手**: API 設計簡潔直觀

**替代方案考慮:**
- Radix UI: 組件更齊全，但需要額外配置與 Tailwind 整合

### 7.2 程式碼高亮: Shiki

**選擇理由:**
- **高品質**: 使用 VS Code 同款語法引擎
- **SSG 友好**: Build 時預渲染，客戶端零 JS 負擔
- **主題豐富**: 內建數十個主題
- **精確高亮**: 支持 VS Code 語法和 THDM (TextMate Grammar)

**使用方式:**
- 配合 `rehype-pretty-code` 在 MDX/Markdown 中使用
- Build 時生成 HTML，客戶端無需運行時計算

**替代方案考慮:**
- Prism.js / highlight.js: 客戶端運行，品質較低
- react-syntax-highlighter: 套件較大

---

## 8. 驗收標準

- [ ] 部落格列表頁面使用卡片式設計
- [ ] 卡片有圓角邊框和陰影效果
- [ ] 懸停時有陰影加深/上浮效果
- [ ] 響應式設計支援手機/平板/桌面
- [ ] 文章詳情頁有乾淨的閱讀體驗
- [ ] 程式碼區塊有語法高亮 (Shiki)
- [ ] 有返回列表按鈕
- [ ] 現有文章正常顯示

---

## 9. 信心指數評估

**信心指數: 9/10**

### 信心來源
- Tailwind CSS + Headless UI 是 Tailwind 官方推薦的 UI 組合
- Shiki 配合 Next.js SSG 是最佳實踐
- UI 風格參考清晰明確
- 現有程式碼結構簡單，改造風險低

### 潛在風險
- 需要解析文章 metadata (現有格式較簡單)
- Shiki 配置需要正確設定

### 建議
- 優先實作核心卡片列表和文章詳情頁
- 分類/標籤功能可視情況延後
