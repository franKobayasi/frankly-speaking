# frankly-speaking Blog Specification

## 1. Project Overview

**Project Name:** frankly-speaking  
**Type:** Static Personal Blog Website  
**Core Functionality:** A minimalist, engineering-themed blog with tag filtering, article listings, and dark mode support  
**Target Users:** Developers, tech enthusiasts, readers interested in the author's thoughts

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Desktop Layout (≥1024px)**
- Fixed header: 64px height
- Main content: Two-column layout
  - Left sidebar: 240px fixed width
  - Right content: Flexible (calc(100% - 240px))
- Max content width: 1200px, centered

**Tablet Layout (768px - 1023px)**
- Header: Fixed, 56px height
- Sidebar: Collapsible, slides from left (280px width)
- Content: Full width with 16px padding

**Mobile Layout (<768px)**
- Header: Fixed, 48px height
- Sidebar: Hidden, toggle button in header
- Content: Full width with 16px padding
- Accordion cards: Full width

### 2.2 Visual Design

**Color Palette**

| Role | Light Mode | Dark Mode |
|------|-------------|------------|
| Background | #FFFFFF | #0D0D0D |
| Surface/Card | #FFFFFF | #1A1A1A |
| Text Primary | #1A1F36 | #F5F5F5 |
| Text Secondary | #697386 | #9CA3AF |
| Border | #E5E7EB | #2D2D2D |
| Accent | #1A1F36 | #F5F5F5 |
| Hover Background | rgba(241, 249, 241, 0.5) | rgba(241, 249, 241, 0.1) |

**Typography**

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Site Title | JetBrains Mono | 28px | 700 |
| Page Title | JetBrains Mono | 32px | 700 |
| Navigation | JetBrains Mono | 14px | 500 |
| Article Title | JetBrains Mono | 18px | 600 |
| Article Date | JetBrains Mono | 13px | 400 |
| Body Text | JetBrains Mono | 15px | 400 |
| Tags | JetBrains Mono | 12px | 500 |

**Spacing System**
- Base unit: 4px
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

**Visual Effects**
- Card shadow (light): `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)`
- Card shadow (dark): `0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`
- Card hover shadow: `0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)`
- Border radius: 8px (cards), 4px (buttons/tags)
- Transition duration: 200ms ease-out

### 2.3 Components

#### Header/Navigation
- **Structure:** Flexbox, justify-between, align-center
- **Logo:** Left-aligned, "Blog" text
- **Nav Items:** Blog, About, Projects (right-aligned)
- **Mobile Toggle:** Hamburger icon (left), triggers sidebar slide

**Nav Item States**
- Default: color #697386, no background
- Hover: RGB animated background (500ms loop)
- Active/Selected: color #1A1F36, background transparent

**RGB Animation Specification**
```
@keyframes rgbShift {
  0%   { background-color: rgb(241, 249, 241); }
  25%  { background-color: rgb(249, 249, 241); }
  50%  { background-color: rgb(249, 241, 241); }
  75%  { background-color: rgb(249, 241, 249); }
  100% { background-color: rgb(241, 249, 241); }
}
```
- Duration: 500ms
- Timing: linear
- Iteration: infinite (while hovered)
- Border radius: 4px
- Padding: 8px 12px

#### Left Sidebar (Filter Panel)
- **Width:** 240px (desktop), 280px (tablet slide)
- **Sections:**
  - Title: "Filter by Tags"
  - Tag list: Checkbox-style multi-select
  - Active filters: Removable chips
- **Mobile:** Hidden by default, overlay with close button

**Tag Component**
- Checkbox + Label layout
- Padding: 8px 12px
- Border radius: 4px
- Hover: Light background tint
- Selected: Checked icon, accent color text

#### Article List (Right Panel)
- **Layout:** Vertical stack of cards
- **Card Structure:**
  - Header row: Date (left) + Expand icon (right)
  - Title: Below date
  - Summary: Collapsible, animated height
  - Tags: Bottom row, horizontal wrap

**Accordion Card**
- Min height: 60px
- Expanded: Shows summary (max 200px height)
- Animation: 200ms ease-out height transition
- Chevron rotation: 180deg on expand
- Click anywhere on card to toggle

#### Article Detail Page
- **Layout:** Single column, max-width 720px, centered
- **Header:**
  - Title: 32px, bold
  - Date: 14px, secondary color
  - Tags: Horizontal list
- **Content:** Prose styling, code blocks with syntax highlighting
- **Back link:** Top left, "← Back to Blog"

#### About Page
- **Layout:** Single column, max-width 720px, centered
- **Sections:**
  - Profile image (optional, 120px circle)
  - Name/Title
  - Bio text
  - Social links (GitHub, Twitter, Email icons)
  - Contact information

#### Dark Mode Toggle
- **Position:** Header right side
- **Icon:** Sun (light mode) / Moon (dark mode)
- **Size:** 20px
- **Behavior:** Toggle class on root element, persist to localStorage

---

## 3. Functionality Specification

### 3.1 Core Features

**Article Data Management**
- Store in TypeScript file: `data/posts.ts`
- Interface:
```typescript
interface Post {
  id: string;
  title: string;
  date: string; // ISO format: "2024-01-15"
  tags: string[];
  summary: string;
  content: string; // Markdown or HTML
  slug: string;
}
```

**Tag Filtering**
- Multi-select from available tags
- Filter logic: Show posts that have ANY selected tag (OR operation)
- URL state: Query param `?tags=react,typescript`
- Clear all button when filters active

**Article Expansion**
- Default: All collapsed
- Single expansion mode (one open at a time)
- Click to expand/collapse
- Show first 150 chars of summary when collapsed, full when expanded

**Navigation Routing**
- `/` - Home (filtered article list)
- `/post/[slug]` - Article detail
- `/about` - About page
- `/projects` - Projects page (simple list)

### 3.2 User Interactions

| Action | Behavior |
|--------|----------|
| Click nav item | Navigate to page, update active state |
| Hover nav item | RGB animation starts |
| Click tag checkbox | Toggle filter, update list |
| Click article card | Expand/collapse summary |
| Click article title | Navigate to detail page |
| Click dark mode toggle | Switch theme, persist preference |
| Mobile: Click hamburger | Open sidebar overlay |
| Mobile: Click overlay | Close sidebar |

### 3.3 Data Handling

**Sample Posts (5-6 articles)**

1. "Hello World: Starting My Blog Journey"
   - Tags: [Personal, Introduction]
   - Date: 2024-01-15

2. "TypeScript Best Practices in 2024"
   - Tags: [TypeScript, Development]
   - Date: 2024-02-20

3. "Building React Components That Scale"
   - Tags: [React, Development]
   - Date: 2024-03-10

4. "The Beauty of Minimalist Design"
   - Tags: [Design, Thoughts]
   - Date: 2024-04-05

5. "My Terminal Setup for Productivity"
   - Tags: [Tools, Development]
   - Date: 2024-05-18

6. "Understanding Next.js App Router"
   - Tags: [Next.js, Development]
   - Date: 2024-06-22

**Available Tags:**
- Personal
- Introduction
- TypeScript
- Development
- React
- Design
- Thoughts
- Tools
- Next.js

### 3.4 Edge Cases

- No posts match filter: Show "No articles found" message
- Empty tag list: Show all posts
- Invalid slug: Show 404 page
- Dark mode: Respect system preference on first visit
- Long titles: Truncate with ellipsis (max 2 lines)
- Long summaries: Show "Read more" link to detail

---

## 4. Technical Specification

### 4.1 Project Structure

```
frankly-speaking/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home (article list)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   ├── projects/
│   │   │   └── page.tsx        # Projects page
│   │   └── post/
│   │       └── [slug]/
│   │           └── page.tsx    # Article detail
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Sidebar.tsx         # Filter sidebar
│   │   ├── ArticleCard.tsx     # Accordion card
│   │   ├── ArticleList.tsx     # Article list container
│   │   ├── DarkModeToggle.tsx  # Theme switcher
│   │   └── TagFilter.tsx       # Tag checkbox list
│   ├── data/
│   │   └── posts.ts            # Post array
│   ├── hooks/
│   │   └── useTheme.ts         # Dark mode hook
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/
│   └── ...                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript config
└── package.json
```

### 4.2 Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

### 4.3 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          light: '#FFFFFF',
          dark: '#1A1A1A',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0D0D0D',
        },
        text: {
          primary: '#1A1F36',
          secondary: '#697386',
        },
        'text-dark': {
          primary: '#F5F5F5',
          secondary: '#9CA3AF',
        },
      },
      animation: {
        'rgb-shift': 'rgbShift 500ms linear infinite',
      },
      keyframes: {
        rgbShift: {
          '0%': { backgroundColor: 'rgb(241, 249, 241)' },
          '25%': { backgroundColor: 'rgb(249, 249, 241)' },
          '50%': { backgroundColor: 'rgb(249, 241, 241)' },
          '75%': { backgroundColor: 'rgb(249, 241, 249)' },
          '100%': { backgroundColor: 'rgb(241, 249, 241)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 5. Acceptance Criteria

### Visual Checkpoints

- [ ] Header displays "Blog" title and three nav links
- [ ] Nav items show gray color (#697386) when not selected
- [ ] Nav item shows black color (#1A1F36) when selected
- [ ] Hover on nav item triggers RGB animation (500ms loop)
- [ ] Left sidebar shows tag checkboxes
- [ ] Right side shows article cards with date + title
- [ ] Cards have white background, 8px border radius, subtle shadow
- [ ] Clicking card expands to show summary
- [ ] Dark mode toggle switches theme
- [ ] Mobile: Hamburger menu reveals sidebar
- [ ] Mobile: Sidebar overlays content

### Functional Checkpoints

- [ ] Clicking tag checkbox filters article list
- [ ] Multiple tags can be selected (OR logic)
- [ ] Clicking article title navigates to detail page
- [ ] Detail page shows full article content
- [ ] About page displays bio and contact info
- [ ] Dark mode preference persists across sessions
- [ ] All 5-6 sample posts display correctly
- [ ] 404 page shows for invalid slugs

### Responsive Checkpoints

- [ ] Desktop: Two-column layout (sidebar + content)
- [ ] Tablet: Collapsible sidebar
- [ ] Mobile: Full-width cards, hidden sidebar

---

## 6. Implementation Notes

### RGB Animation Implementation

The nav item hover effect uses a specific animation sequence:
- Start: `rgb(241, 249, 241)` - light green tint
- 25%: `rgb(249, 249, 241)` - red increases (241→249)
- 50%: `rgb(249, 241, 241)` - green decreases (249→241)
- 75%: `rgb(249, 241, 249)` - blue increases (241→249)
- 100%: Back to start (loop)

Apply class `animate-rgb-shift` on hover:
```tsx
<a 
  className="px-3 py-2 rounded transition-colors duration-200
    hover:animate-rgb-shift"
>
  Blog
</a>
```

### Dark Mode Implementation

Use Tailwind's `dark:` variant with class-based strategy:
```tsx
// In layout.tsx
useEffect(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
}, [])
```

### Font Loading

Add to `layout.tsx` head:
```tsx
<link 
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
  rel="stylesheet" 
/>
```

---

*End of Specification*
