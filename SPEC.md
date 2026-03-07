# SPEC: Frankly Speaking Blog - Nav & Tag Filter Optimization

## 1. 專案概述

- **專案名稱**: frankly-speaking
- **類型**: Next.js 15 個人部落格
- **目標**: 優化 Header Nav Hover 對比度 + 將 Tag Filter 從全域移至 Blog 頁面

---

## 2. 技術棧

- Next.js 15
- TypeScript
- Tailwind CSS
- **不使用 styled-components**

---

## 3. 變更詳細說明

### 3.1 Header Nav Hover 對比度修復

#### 3.1.1 目標檔案
`src/style/global.css`

#### 3.1.2 現有程式碼（行號 71-89）
```css
.header-link:hover {
  animation: rgbShift 500ms linear infinite !important;
  color: #1A1F36 !important;
}

.dark .header-link:hover {
  color: #F5F5F5 !important;
}

/* RGB Animation */
@keyframes rgbShift {
  0% { background-color: rgb(241, 249, 241); }
  25% { background-color: rgb(249, 249, 241); }
  50% { background-color: rgb(249, 241, 241); }
  75% { background-color: rgb(249, 241, 249); }
  100% { background-color: rgb(241, 249, 241); }
}
```

#### 3.1.3 問題
| 模式 | 問題 |
|------|------|
| Light Mode | `rgb(241, 249, 241)` 背景太淡，幾乎看不見 |
| Dark Mode | 沒有設定背景，文字 `#F5F5F5` 與動畫背景融合 |

#### 3.1.4 RGB 動畫邏輯

**動畫規則：**
- 起始值：`RGB(241, 249, 241)`
- 每 500ms 變化一次
- 三個 channel 輪流遞增/遞減（遞增到 249 後開始遞減）

**完整 CSS 動畫（Light Mode）：**
```css
@keyframes rgbShift {
  0% { background-color: rgb(241, 249, 241); }
  5% { background-color: rgb(242, 249, 241); }
  10% { background-color: rgb(243, 249, 241); }
  15% { background-color: rgb(244, 249, 241); }
  20% { background-color: rgb(245, 249, 241); }
  25% { background-color: rgb(246, 249, 241); }
  30% { background-color: rgb(247, 249, 241); }
  35% { background-color: rgb(248, 249, 241); }
  40% { background-color: rgb(249, 249, 241); }
  45% { background-color: rgb(249, 248, 241); }
  50% { background-color: rgb(249, 247, 241); }
  55% { background-color: rgb(249, 246, 241); }
  60% { background-color: rgb(249, 245, 241); }
  65% { background-color: rgb(249, 244, 241); }
  70% { background-color: rgb(249, 243, 241); }
  75% { background-color: rgb(249, 242, 241); }
  80% { background-color: rgb(249, 241, 242); }
  85% { background-color: rgb(249, 241, 243); }
  90% { background-color: rgb(249, 241, 244); }
  95% { background-color: rgb(249, 241, 245); }
  100% { background-color: rgb(249, 241, 246); }
}
```

**Dark Mode 動畫：**
- 文字顏色：`#FFFFFF`
- 背景改用 `rgba(255, 255, 255, alpha)` 形式（alpha 值同上）

---

### 3.2 移除全域 Menu 按鈕

#### 3.2.1 目標檔案
`src/components/Header.tsx`

#### 3.2.2 現有程式碼（行號 31-39）
```tsx
<button 
  className="mobile-menu-btn md:hidden" 
  onClick={onMenuToggle}
  aria-label="Toggle menu"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary dark:text-text-dark-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
```

#### 3.2.3 修改內容
- **刪除**: 第 31-39 行（整個 button 區塊）
- **刪除**: `onMenuToggle` prop（如果 Header.tsx 中沒有其他地方使用）

---

### 3.3 Tag Filter 搬遷至 Blog 頁面

#### 3.3.1 目標檔案
- `src/pages/index.tsx`
- `src/pages/blog/index.tsx`

#### 3.3.2 現有架構
- Header 有 mobile menu button，點擊開啟 Sidebar
- Sidebar 包含 tag filter 功能

#### 3.3.3 目標架構
- 移除 Header 的 menu button
- 在 Blog 頁面添加 tag filter（always visible，非僅 mobile）
- 位置：頁面標題下方、文章列表上方

#### 3.3.4 修改內容

**在 Blog 頁面添加:**
```tsx
{/* Tag Filter - 放在標題下方 */}
<div className="flex gap-2 mb-6">
  {allTags.map((tag) => (
    <button
      key={tag}
      onClick={() => handleTagToggle(tag)}
      className={`px-3 py-1 rounded-full text-sm ${
        selectedTags.includes(tag)
          ? 'bg-accent text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
      }`}
    >
      {tag}
    </button>
  ))}
</div>
```

**狀態管理:**
- 從全域 Context 改為 local useState
- 儲存於 `src/pages/blog/index.tsx` 或 `src/pages/index.tsx`

---

## 4. 驗收標準

| 項目 | 標準 |
|------|------|
| Light Mode Nav Hover | RGB 動畫背景明顯可見，不刺眼 |
| Dark Mode Nav Hover | 文字純白 #FFFFFF，背景可區分 |
| Menu 按鈕 | 從 Header 完全移除 |
| Tag Filter 位置 | Blog 頁面標題下方、文章列表上方 |
| Tag Filter 可見性 | Always visible（不限 mobile）|
| Tag Filter 功能 | 點擊標籤可篩選文章 |
| 狀態管理 | 使用 local state，非全域 |

---

## 5. 預期檔案變更

| 檔案 | 變更 |
|------|------|
| `src/style/global.css` | 修改 rgbShift、新增 rgbShiftDark |
| `src/components/Header.tsx` | 刪除行 31-39 |
| `src/pages/index.tsx` | 添加 tag filter 組件 |
| `src/pages/blog/index.tsx` | 添加 tag filter 組件 + local state |
