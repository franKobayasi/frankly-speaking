# frankly-speaking

Personal website, blog and portfolio built with Next.js.

**Blog:** https://frankobayasi.github.io/frankly-speaking/blog/

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shiki (syntax highlighting)
- React 19

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

## Project Structure

```
src/
├── articles/           # Blog articles (Markdown)
├── components/         # React components
├── pages/             # Next.js pages
│   ├── blog/          # Blog listing and article pages
│   ├── about.tsx
│   ├── portfolio.tsx
│   └── projects.tsx
├── data/              # Post metadata
├── lib/               # Utilities
├── style/             # Global styles
└── types/             # TypeScript types
```

## Articles

- [Claude Code、AI Agents 與 SKILL 撰寫最佳實踐指南](./src/articles/claude-code-best-practices.md)
- [TypeScript 筆記](./src/articles/typescript-note.md)
- [Styled Components 筆記](./src/articles/style-components.md)
