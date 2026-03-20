import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { parseArticleMetadata } from '../utils/metadata'

const postsDirectory = path.join(process.cwd(), 'src/articles')

export interface Post {
  id: string
  title: string
  date: string
  author: string
  tags: string[]
  summary: string
  content: string
  slug: string
}

export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // 嘗試從 frontmatter 取得 metadata
      let metadata = {
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [] as string[],
        summary: data.summary || '',
        author: data.author || '',
      }

      // 如果 frontmatter 沒有完整資訊，嘗試從內文解析
      if (!metadata.title || !metadata.date || metadata.tags.length === 0) {
        const bodyMetadata = parseArticleMetadata(content)
        metadata = {
          title: metadata.title || bodyMetadata.title,
          date: metadata.date || bodyMetadata.date,
          tags: metadata.tags.length > 0 ? metadata.tags : bodyMetadata.tags,
          summary: metadata.summary || bodyMetadata.summary,
          author: metadata.author || bodyMetadata.author,
        }
      }

      // 如果仍然沒有 tags，嘗試從標題推斷
      let finalTags = metadata.tags || []
      if (finalTags.length === 0 && metadata.title) {
        // 從標題關鍵字推斷 tags
        const titleLower = metadata.title.toLowerCase()
        if (titleLower.includes('typescript') || titleLower.includes('ts')) {
          finalTags.push('TypeScript')
        }
        if (titleLower.includes('styled') || titleLower.includes('component')) {
          finalTags.push('React')
        }
        if (titleLower.includes('react')) {
          finalTags.push('React')
        }
        if (titleLower.includes('node') || titleLower.includes('next')) {
          finalTags.push('Next.js')
        }
        // 預設標籤
        if (finalTags.length === 0) {
          finalTags.push('技術筆記')
        }
      }

      return {
        id: slug,
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        author: metadata.author || 'Frank',
        tags: finalTags,
        summary: metadata.summary || '',
        content: content,
        slug: slug,
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 嘗試從 frontmatter 取得 metadata
  let metadata = {
    title: data.title || '',
    date: data.date || '',
    tags: data.tags || [] as string[],
    summary: data.summary || '',
    author: data.author || '',
  }

  // 如果 frontmatter 沒有完整資訊，嘗試從內文解析
  if (!metadata.title || !metadata.date || metadata.tags.length === 0) {
    const bodyMetadata = parseArticleMetadata(content)
    metadata = {
      title: metadata.title || bodyMetadata.title,
      date: metadata.date || bodyMetadata.date,
      tags: metadata.tags.length > 0 ? metadata.tags : bodyMetadata.tags,
      summary: metadata.summary || bodyMetadata.summary,
      author: metadata.author || bodyMetadata.author,
    }
  }

  return {
    id: slug,
    title: metadata.title || 'Untitled',
    date: metadata.date || new Date().toISOString().split('T')[0],
    author: metadata.author || 'Frank',
    tags: metadata.tags || [],
    summary: metadata.summary || '',
    content: content,
    slug: slug,
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const allTags = Array.from(
  new Set(getAllPosts().flatMap((post) => post.tags))
).sort()

export function filterPostsByTags(selectedTags: string[]): Post[] {
  const posts = getAllPosts()
  if (selectedTags.length === 0) return posts
  return posts.filter((post) =>
    selectedTags.some((tag) => post.tags.includes(tag))
  )
}
