export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  summary: string
  content: string
  slug: string
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Hello World: Starting My Blog Journey',
    date: '2024-01-15',
    tags: ['Personal', 'Introduction'],
    summary: 'Welcome to my new blog! In this post, I want to share why I decided to start writing about my experiences in tech, what you can expect from this space, and my goals for the upcoming year.',
    content: `
# Hello World: Starting My Blog Journey

Welcome to my new blog! In this post, I want to share why I decided to start writing about my experiences in tech, what you can expect from this space, and my goals for the upcoming year.

## Why I Started This Blog

After years of working in software development, I've accumulated a wealth of knowledge that I think could benefit others. Rather than keeping all these insights to myself, I decided to create a space where I can share:

- Technical tutorials and best practices
- Personal reflections on working in tech
- Project showcases and code snippets
- Thoughts on software design and architecture

## What to Expect

This blog will cover a wide range of topics, including:

1. **Web Development** - React, TypeScript, Next.js, and modern frontend tools
2. **Backend Systems** - API design, databases, serverless architectures
3. **DevOps** - CI/CD pipelines, containerization, cloud infrastructure
4. **Career Growth** - Interview tips, portfolio building, professional development

## My Goals for This Year

- Publish at least one article per week
- Build a small community of like-minded developers
- Create comprehensive tutorials that help beginners
- Learn new technologies and share my findings

I'm excited to start this journey and I hope you'll join me!
    `,
    slug: 'hello-world'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices in 2024',
    date: '2024-02-20',
    tags: ['TypeScript', 'Development'],
    summary: 'TypeScript continues to evolve, and so do the best practices for using it effectively. In this article, I share the most important patterns and practices that have emerged in 2024.',
    content: `
# TypeScript Best Practices in 2024

TypeScript continues to evolve, and so do the best practices for using it effectively. In this article, I share the most important patterns and practices that have emerged in 2024.

## Strict Mode is Non-Negotiable

Always enable strict mode in your \`tsconfig.json\`. It catches more errors at compile time and makes your code more reliable.

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
\`\`\`

## Use the 'as const' Assertion

When you have literal types that shouldn't change, use \`as const\`:

\`\`\`typescript
const routes = {
  home: '/',
  about: '/about',
  blog: '/blog'
} as const
\`\`\`

## Discriminated Unions for State Management

Model your application state with discriminated unions:

\`\`\`typescript
type RequestState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
\`\`\`

## Template Literal Types

Use template literal types for type-safe string operations:

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`
type Handler = \`handle\${Capitalize<string>}\`
\`\`\`

These are just a few of the practices that will make your TypeScript code more robust in 2024.
    `,
    slug: 'typescript-best-practices-2024'
  },
  {
    id: '3',
    title: 'Building React Components That Scale',
    date: '2024-03-10',
    tags: ['React', 'Development'],
    summary: 'Creating React components that are maintainable and scalable requires thoughtful design patterns. Learn about compound components, render props, and custom hooks.',
    content: `
# Building React Components That Scale

Creating React components that are maintainable and scalable requires thoughtful design patterns. In this article, we'll explore several approaches that have proven effective.

## Compound Components

Compound components allow you to create expressive and flexible APIs:

\`\`\`tsx
function Menu({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  return (
    <MenuContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  )
}

Menu.Item = function Item({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(MenuContext)
  return (
    <div 
      onClick={() => setActiveIndex(index)}
      className={activeIndex === index ? 'active' : ''}
    >
      {children}
    </div>
  )
}
\`\`\`

## Custom Hooks for Logic Reuse

Extract complex logic into custom hooks:

\`\`\`tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    return localStorage.getItem(key) ?? initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])
  
  return [value, setValue]
}
\`\`\`

## Performance Optimization

Use \`React.memo\`, \`useMemo\`, and \`useCallback\` wisely:

- Memoize expensive computations
- Prevent unnecessary re-renders
- But don't over-optimize!

Building scalable components is about finding the right balance between flexibility, performance, and maintainability.
    `,
    slug: 'building-react-components-that-scale'
  },
  {
    id: '4',
    title: 'The Beauty of Minimalist Design',
    date: '2024-04-05',
    tags: ['Design', 'Thoughts'],
    summary: 'Minimalism in design isn\'t about removing things until there\'s nothing left. It\'s about intentional reduction to let what remains shine. Here\'s my take on minimalist design principles.',
    content: `
# The Beauty of Minimalist Design

Minimalism in design isn't about removing things until there's nothing left. It's about intentional reduction to let what remains shine.

## Less But Better

The famous Dieter Rams principle applies to all forms of design:

> "Good design is as little design as possible."

This doesn't mean creating bare-bones interfaces. Instead, it means:

1. **Every element must serve a purpose** - If it doesn't help the user accomplish something, remove it
2. **Whitespace is your friend** - Give your content room to breathe
3. **Typography carries weight** - With fewer elements, each one matters more

## Color in Minimalism

Minimalist designs often use:

- A single accent color
- Monochromatic palettes
- High contrast for accessibility

The key is restraint. Use color to guide attention, not to decorate.

## The White Space Paradox

White space (or negative space) isn't empty—it's active. It:

- Creates visual hierarchy
- Improves readability
- Makes your design feel premium
- Gives users room to think

## Conclusion

Minimalist design requires more thought, not less. Every decision becomes more critical when you have fewer elements to work with. Embrace constraint as a creative tool.
    `,
    slug: 'beauty-of-minimalist-design'
  },
  {
    id: '5',
    title: 'My Terminal Setup for Productivity',
    date: '2024-05-18',
    tags: ['Tools', 'Development'],
    summary: 'A well-configured terminal can significantly boost your productivity as a developer. Here\'s my current setup including the shell, prompt, and essential tools.',
    content: `
# My Terminal Setup for Productivity

A well-configured terminal can significantly boost your productivity as a developer. Here's my current setup.

## The Shell: zsh with Oh My Zsh

I use zsh with Oh My Zsh for plugin management and themes. Key plugins:

- **git** - Git aliases and branch display
- **zsh-autosuggestions** - Command history suggestions
- **zsh-syntax-highlighting** - Real-time syntax checking
- **fzf** - Fuzzy finding for commands and files

## The Prompt: Starship

Starship is a cross-shell prompt that shows:

- Current directory
- Git branch and status
- Node/Rust/Python versions
- Command execution time

## Essential Tools

### Navigation
- **fzf** - Fuzzy file finder
- **zoxide** - Smarter cd command
- **bat** - Better cat with syntax highlighting
- **exa** - Modern ls replacement

### Development
- **tmux** - Terminal multiplexer
- **neovim** - My editor of choice
- **direnv** - Environment variables per directory

## Aliases That Save Time

\`\`\`bash
alias g="git"
alias gc="git commit -m"
alias gp="git push"
alias ll="eza -la"
alias cat="bat"
alias find="fd"
\`\`\`

A good terminal setup is personal—find what works for you and keep refining it!
    `,
    slug: 'terminal-setup-productivity'
  },
  {
    id: '6',
    title: 'Understanding Next.js App Router',
    date: '2024-06-22',
    tags: ['Next.js', 'Development'],
    summary: 'The App Router in Next.js 14+ represents a fundamental shift in how we build React applications. Let\'s dive deep into its concepts and learn how to migrate effectively.',
    content: `
# Understanding Next.js App Router

The App Router in Next.js 14+ represents a fundamental shift in how we build React applications. Let's explore its key concepts.

## Server Components by Default

In the App Router, all components are Server Components by default:

\`\`\`tsx
// This runs on the server
async function BlogPage() {
  const posts = await fetchPosts()
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Client Components

Add \`"use client"\` for interactive components:

\`\`\`tsx
"use client"

import { useState } from 'react'

export function SearchInput() {
  const [query, setQuery] = useState('')
  
  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
\`\`\`

## Data Fetching

Server Components support async/await:

\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
\`\`\`

## Layouts

Share UI across routes with layouts:

\`\`\`tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>{children}</nav>
      </body>
    </html>
  )
}
\`\`\`

## Migration Tips

1. Start with new routes, not migration
2. Use Server Components where possible
3. Be careful with \`useEffect\` and \`useState\`
4. Learn the new routing conventions

The App Router is the future of Next.js—embrace it!
    `,
    slug: 'understanding-nextjs-app-router'
  },
  {
    id: '7',
    title: '以 Claude Code 為基礎的維運輔助 Agent 實作：OptiSentry',
    date: '2026-03-23',
    tags: ['Claude Code', 'SRE', 'DevOps', 'AI Agent'],
    summary: '分享作者如何利用 Claude Code 打造一個 SRE 維運輔助 Agent，自動調查生產環境問題，大幅提升維運效率。',
    content: 'optisentry-claude-code-sre-agent',
    slug: 'optisentry-claude-code-sre-agent'
  }
]

export const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort()

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}

export function filterPostsByTags(selectedTags: string[]): Post[] {
  if (selectedTags.length === 0) return posts
  return posts.filter(post => 
    selectedTags.some(tag => post.tags.includes(tag))
  )
}
