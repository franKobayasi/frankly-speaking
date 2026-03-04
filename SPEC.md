# SPEC.md - frankly-speaking Blog Redesign

## 1. 專案概述

- **專案名稱**: frankly-speaking 部落格重新設計
- **專案類型**: Next.js 個人部落格網站
- **核心功能**: 將現有陽春的部落格列表改為現代卡片式 UI，參考 Stripe Developer Blog 風格
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
| Markdown 渲染 | react-markdown + remark-gfm |
| 代碼高亮 | **Shiki** (with rehype-pretty-code) |

---

## 3. UI/UX 規格 (Stripe Blog 風格)

### 3.1 設計風格

參考 **Stripe Developer Blog** (https://stripe.dev/blog)：

- **Header（導航欄）**：極簡風格，左側對齊，無背景色，無 logo
- **Page Title（頁面標題）**：左側對齊，大字體，粗體
- **卡片式佈局**：每個文章預覽為獨立白色卡片
- **圓角邊框**：border-radius: 8px
- **柔和陰影**：細緻的投影效果
- **間距整齊**：gap: 24px
- **色彩簡潔**：淺灰背景 (#F7F9FC)、白卡片 (#FFFFFF)
- **懸停效果**：陰影加深 + 輕微上浮
- **點擊展開**：卡片可展開顯示 Summary + Tags

### 3.2 色彩系統

```
Primary:      #1A1F36 (標題文字 - Stripe 深色)
Secondary:    #5E6E82 (次要文字/日期)
Accent:       #635BFF (Stripe 紫 - 按鈕/連結)
Accent Hover: #0A2540 (深色 hover)
Background:   #F7F9FC (頁面背景 - Stripe 淺灰)
Card BG:      #FFFFFF (卡片背景)
Border:       #E3E8EE (卡片邊框)
Hover BG:     #F6F9FC (懸停背景)
Tag BG:       #E0E7FF (標籤背景 - 淺紫)
Tag Text:     #635BFF (標籤文字)
Header Link:  #697386 (Header 連結文字)
Header Divider:#E3E8EE (Header 分割線)
```

### 3.3 Header 風格規格 (Stripe 極簡風)

**當前問題**：現有 header.tsx 使用 styled-components，風格不符合 Stripe 風格：
- 有灰色背景 (#eee)
- Logo 在左側
- 導航在右側（靠右）

**Stripe 風格 Header 規格**：

```tsx
// Header 結構
<HeaderWrapper>
  <HeaderDivider />
  <NavContainer>
    <NavLinks>
      <NavLink>Docs</NavLink>
      <NavLink>Learn</NavLink>
      <NavLink>Support</NavLink>
      <NavLink>Blog</NavLink>
    </NavLinks>
  </NavContainer>
</HeaderWrapper>
```

| 元素 | 樣式規格 |
|------|----------|
| Header 背景 | 透明 (無背景色) |
| Header 高度 | 56px |
| 分割線 | 1px solid #E3E8EE，底部 |
| 導航容器 | max-width: 1200px, margin: 0 auto, padding: 0 24px |
| 導航連結對齊 | 左側對齊 (flex-start) |
| 導航連結間距 | gap: 24px |
| 連結字體 | Inter, -apple-system, sans-serif |
| 連結字體大小 | 14px |
| 連結字體顏色 | #697386 |
| 連結 hover 顏色 | #1A1F36 |
| 移除 Logo | 完全移除 |
| 移除背景色 | 設定為透明或移除 background-color |

### 3.4 Page Title 風格規格

**Stripe 風格 Page Title 規格**：

| 元素 | 樣式規格 |
|------|----------|
| 標題內容 | "Blog" |
| 對齊方式 | 左側對齊 |
| 字體 | Inter, -apple-system, sans-serif |
| 字體大小 | 40px (桌面) / 32px (手機) |
| 字體粗細 | 700 (bold) |
| 字體顏色 | #1A1F36 |
| 位置 | Header 下方，獨立區塊 |
| 上方間距 | 32px |
| 下方間距 | 24px |

```tsx
// Page Title 結構
<PageTitleWrapper>
  <PageTitle>Blog</PageTitle>
</PageTitleWrapper>
```

```css
/* PageTitle 樣式 */
.page-title {
  font-size: 40px;
  font-weight: 700;
  color: #1A1F36;
  text-align: left;
  margin-top: 32px;
  margin-bottom: 24px;
}
```

### 3.5 字體系統

```
Heading:    "Caliste", "Georgia", serif (Stripe 風格標題)
Body:       "Inter", -apple-system, sans-serif
Code:       "Fira Code", "JetBrains Mono", monospace
```

### 3.6 響應式斷點

| 斷點 | 寬度 | 卡片排列 |
|------|------|----------|
| Mobile | < 640px | 1 列 |
| Tablet | 640px - 1024px | 2 列 |
| Desktop | > 1024px | 2-3 列 (max-width: 1200px) |

---

## 4. 功能規格

### F1: 部落格列表卡片 (Stripe 風格)

#### 卡片內容 (預設顯示)
- **標題**: 文章標題 (H3，字體加粗，#1A1F36)
- **日期**: 發布日期 (格式: YYYY/MM/DD，#5E6E82)
- **作者**: 作者名稱 (格式: By Author)
- **簡短描述**: 從文章開頭擷取前 80-100 字

#### 卡片樣式
- 背景: 白色 (#FFFFFF)
- 邊框: 1px solid #E3E8EE
- 圓角: 8px
- 陰影: 0 1px 2px rgba(0,0,0,0.04)
- 內邊距: 24px
- 最小高度: 160px

#### 懸停效果
- 陰影加深: 0 4px 12px rgba(0,0,0,0.08)
- 邊框變色: #635BFF (輕微)
- 過渡時間: 0.2s ease

#### 展開功能 (點擊卡片或 + 按鈕)
- **Summary**: 顯示完整摘要 (從 > **Summary：** 解析)
- **Tags**: 顯示文章標籤 (膠囊樣式)
- 展開動畫: Headless UI Transition (fade + slide)
- 展開狀態指示: 圖標旋轉 (chevron rotate)

### F2: 文章詳情頁

#### 頁面結構
1. **Header 區域**
   - 返回連結 (← All Articles)
   - 文章標題 (H1)
   - 發布日期 + 作者
   - Tags 標籤

2. **內容區域**
   - 最大寬度: 720px
   - 水平置中
   - 行高: 1.75
   - 字體大小: 17px
   - 段落間距: 1.5em

3. **程式碼區塊**
   - 使用 Shiki + rehype-pretty-code
   - 主題: Vitesse Light 或 GitHub Light
   - 行號顯示 (可選)
   - 語言標籤

4. **返回按鈕**
   - 位置: 內容區域頂部
   - 文字: "← All Articles"
   - 連結到 /blog

### F3: RWD 響應式

- 卡片網格自適應列數
- 文章內容區域在行動裝置上留邊距 (padding: 16px)
- 導航欄在行動裝置上保持可用

### F4: 分類/標籤

- 從文章 metadata 解析 Tags
- 標籤樣式: 膠囊形 (pill)，淺紫背景 (#E0E7FF)，紫色文字 (#635BFF)
- 標籤間距: gap: 8px

### F5: Header 改造 (Stripe 極簡風)

**改造目標**：將現有 styled-components Header 改為 Tailwind CSS + Stripe 極簡風格

**現有問題 (src/components/layout/header.tsx)**：
- 使用 styled-components（需改為 Tailwind）
- 有灰色背景 #eee（需移除）
- Logo 在左側（需移除）
- 導航靠右對齊（需改為左側對齊）

**Stripe 風格 Header 實作**：

```tsx
// 使用 Tailwind CSS 的 Header 實作
export default function Header() {
  return (
    <header className="w-full">
      {/* 底部分割線 */}
      <div className="border-b border-[#E3E8EE]"></div>
      
      {/* 導航容器 */}
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">
        {/* 導航連結 - 左側對齊 */}
        <nav className="flex gap-6">
          <Link href="/" className="text-sm text-[#697386] hover:text-[#1A1F36] transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-sm text-[#697386] hover:text-[#1A1F36] transition-colors">
            Blog
          </Link>
          <Link href="/portfolio" className="text-sm text-[#697386] hover:text-[#1A1F36] transition-colors">
            Portfolio
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

**改造清單**：
- [ ] 移除 styled-components，改用 Tailwind CSS
- [ ] 移除 Logo 圖片和相關程式碼
- [ ] 移除背景色 (background-color)
- [ ] 將導航從右側改為左側對齊
- [ ] 加入底部分割線 (1px solid #E3E8EE)
- [ ] 設定連結顏色為 #697386，hover 為 #1A1F36
- [ ] 導航項目調整為：Home, Blog, Portfolio

---

## 5. 頁面規格

### 5.1 部落格列表頁 (src/pages/blog/index.tsx)

```tsx
// 結構
<PageWrapper bg="#F7F9FC">
  <Header>導航</Header>
  <Container maxW="1200px">
    <PageTitle>Articles</PageTitle>
    <CardGrid>
      {articles.map(article => (
        <ArticleCard 
          key={slug}
          article={article}
          // 可展開狀態管理
          // 顯示 Summary + Tags
        />
      ))}
    </CardGrid>
  </Container>
</PageWrapper>
```

### 5.2 文章詳情頁 (src/pages/blog/[article].tsx)

```tsx
// 結構
<PageWrapper>
  <Header>導航</Header>
  <ArticleContainer maxW="720px">
    <BackLink>← All Articles</BackLink>
    <ArticleHeader>
      <Title>{title}</Title>
      <Meta>
        <Date>{formattedDate}</Date>
        <Separator>|</Separator>
        <Author>{author}</Author>
      </Meta>
      <Tags>
        {tags.map(tag => <Tag>{tag}</Tag>)}
      </Tags>
    </ArticleHeader>
    <MarkdownContent>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
> Tags：tag1, tag2, tag3
```

解析規則:
- **標題**: 第一個 `# ` 後的文字
- **Summary**: `> **Summary：**` 後到下一個 `>` 前的文字
- **作者**: `> Author：` 後的文字
- **日期**: `> Date：` 後的文字
- **標籤**: `> Tags：` 後的文字 (逗號分隔)
- **分類**: `> Category：` 後的文字

---

## 7. 技術決策

### 7.1 Headless UI: Accordion

**選擇理由:**
- **Accordion 組件**: 適合卡片展開/收合功能
- **Transition**: 流暢的展開動畫
- **與 Tailwind 完美配合**: 官方推薦組合
- **無障礙支援**: 內建 ARIA 支持

### 7.2 程式碼高亮: Shiki

**選擇理由:**
- **高品質**: 使用 VS Code 同款語法引擎
- **SSG 友好**: Build 時預渲染，客戶端零 JS 負擔
- **主題豐富**: 內建數十個主題
- **精確高亮**: 支持 VS Code 語法和 THDM

**使用方式:**
- 配合 `rehype-pretty-code` 在 Markdown 中使用
- Build 時生成 HTML，客戶端無需運行時計算
- 主題建議: `vitesse-light` 或 `github-light`

### 7.3 Markdown 處理

```bash
npm install react-markdown remark-gfm rehype-pretty-code shiki
```

---

## 8. 驗收標準

### 視覺驗收
- [ ] 部落格列表頁面使用 Stripe 風格卡片設計
- [ ] 卡片有圓角邊框 (#E3E8EE) 和柔和陰影
- [ ] 懸停時有陰影加深效果
- [ ] 色彩符合 Stripe 調色板 (淺灰背景 #F7F9FC、紫 #635BFF)
- [ ] 響應式設計支援手機/平板/桌面

### 功能驗收
- [ ] Header 改造 - 移除灰色背景，改為透明
- [ ] Header 改造 - 移除 Logo 圖片
- [ ] Header 改造 - 導航改為左側對齊
- [ ] Header 改造 - 加入底部分割線 (#E3E8EE)
- [ ] Header 改造 - 連結顏色 #697386，hover #1A1F36
- [ ] Page Title "Blog" 左側對齊，大字體 (40px)，粗體
- [ ] 卡片可點擊展開顯示 Summary + Tags
- [ ] 展開有流暢動畫 (Headless UI Transition)
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
- UI 風格參考 (Stripe) 清晰明確
- 現有程式碼結構簡單，改造風險低

### 潛在風險
- 需要正確解析現有文章的 metadata 格式
- Shiki 配置需要正確設定 (rehype-pretty-code)
- 卡片展開狀態管理

### 建議
- 優先實作核心卡片列表 (含展開功能) 和文章詳情頁
- 分類/標籤功能可視情況延後

---

## 10. 參考資源

- Stripe Developer Blog: https://stripe.dev/blog
- Headless UI Accordion: https://headlessui.com/react/accordion
- Shiki + rehype-pretty-code: https://rehype-pretty-code.netlify.app
