# TASK.md - frankly-speaking Blog Redesign

## 任務總覽

將 frankly-speaking 部落格重新設計為 Stripe Blog 風格的卡片式 UI。

---

## Phase 1: 準備工作

### T1.1 安裝依賴
- [x] 安裝 Tailwind CSS (如尚未安裝)
- [x] 安裝 Headless UI: `npm install @headlessui/react`
- [x] 安裝 Shiki 相關套件:
  - `npm install shiki rehype-pretty-code`
- [x] 安裝 Markdown 處理:
  - `npm install react-markdown remark-gfm`
- [x] 安裝相關類型定義

### T1.2 Tailwind 配置
- [x] 配置 Tailwind 主題色彩 (Stripe 調色板)
- [x] 添加自定義字體 (Inter, Caliste/Georgia)

### T1.3 建立共用工具
- [x] 建立 `src/utils/metadata.ts` - 文章 metadata 解析函數
- [x] 測試解析現有文章格式

---

## Phase 2: 部落格列表頁面 (Stripe 風格)

### T2.1 建立文章卡片組件
- [x] 建立 `src/components/ArticleCard.tsx`
- [x] 實作卡片結構 (標題、日期、作者、描述)
- [x] 實作卡片樣式 (Stripe 風格: 圓角 8px、#E3E8EE 邊框、柔和陰影)
- [x] 實作懸停效果 (陰影加深)
- [x] 實作 RWD 響應式

### T2.2 實作卡片展開功能 (Headless UI Disclosure)
- [x] 使用 Headless UI Disclosure 組件
- [x] 展開顯示 Summary (從 metadata 解析)
- [x] 展開顯示 Tags (膠囊樣式)
- [x] 實作展開動畫 (Transition: fade + slide)
- [x] 實作 Chevron 圖標旋轉

### T2.3 建立文章網格組件
- [x] 建立 `src/components/ArticleGrid.tsx`
- [x] 實作 CSS Grid 佈局 (響應式: 1/2/3 列)
- [x] 設定間距 (gap: 24px)
- [x] 設定最大寬度 (max-width: 1200px)

### T2.4 更新文章列表頁面
- [x] 修改 `src/pages/blog/index.tsx`
- [x] 實作文章 metadata 解析
- [x] 整合 ArticleCard 和 ArticleGrid 組件
- [x] 設定頁面背景色 (#F7F9FC)

---

## Phase 3: 文章詳情頁面

### T3.1 建立 Markdown 渲染組件
- [x] 建立 `src/components/MarkdownContent.tsx`
- [x] 整合 react-markdown + remark-gfm
- [x] 配置 rehype-pretty-code (Shiki)
- [x] 設定程式碼區塊主題 (vitesse-light 或 github-light)

### T3.2 建立返回按鈕
- [x] 建立 `src/components/BackLink.tsx`
- [x] 文字: "← All Articles"
- [x] 連結到 /blog

### T3.3 建立文章 Header 組件
- [x] 建立 `src/components/ArticleHeader.tsx`
- [x] 顯示標題、日期、作者
- [x] 顯示 Tags (膠囊樣式)

### T3.4 更新文章詳情頁面
- [x] 修改 `src/pages/blog/[article].tsx`
- [x] 實作文章 metadata 解析
- [x] 整合 MarkdownContent、BackLink、ArticleHeader
- [x] 設定內容區域樣式 (max-width: 720px, 行高: 1.75)

---

## Phase 4: 測試與優化

### T4.1 驗收測試
- [x] Build 測試通過
- [ ] 測試部落格列表卡片顯示 (Stripe 風格)
- [ ] 測試卡片懸停效果
- [ ] 測試卡片展開/收合功能
- [ ] 測試 Summary + Tags 顯示
- [ ] 測試文章詳情頁渲染
- [ ] 測試程式碼區塊高亮 (Shiki)
- [ ] 測試 RWD 響應式 (手機/平板/桌面)

### T4.2 現有文章相容性
- [x] 確認 style-components.md 正常顯示
- [x] 確認 typescript-note.md 正常顯示
- [x] 確認 metadata 解析正確

### T4.3 效能優化
- [x] 確認 Shiki 在 build 時預渲染
- [x] 確認無客戶端運行時語法高亮負擔

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

### Headless UI Disclosure 使用範例

```tsx
import { Disclosure } from '@headlessui/react'

<Disclosure>
  <Disclosure.Button>Click me</Disclosure.Button>
  <Disclosure.Panel>Content here</Disclosure.Panel>
</Disclosure>
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

### 環境變數

由於 Node.js v22 與 Next.js 10 的兼容性問題，需要設置：
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```
