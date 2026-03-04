import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import { getPostBySlug, posts } from '../../data/posts'

interface ArticlePageProps {
  post: {
    id: string
    title: string
    date: string
    tags: string[]
    summary: string
    content: string
    slug: string
  } | null
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function ArticlePage({ post, darkMode, toggleDarkMode }: ArticlePageProps) {
  if (!post) {
    return (
      <>
        <Head>
          <title>404 - Post Not Found</title>
        </Head>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog">
              <a className="text-accent hover:underline">← Back to Blog</a>
            </Link>
          </div>
        </main>
      </>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: JSX.Element[] = []
    let inCodeBlock = false
    let codeContent = ''
    let codeLanguage = ''

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
          codeContent = ''
        } else {
          inCodeBlock = false
          elements.push(
            <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto my-4 text-sm">
              <code>{codeContent.trim()}</code>
            </pre>
          )
        }
        return
      }

      if (inCodeBlock) {
        codeContent += line + '\n'
        return
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-text-primary dark:text-text-dark-primary">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-text-primary dark:text-text-dark-primary">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-text-primary dark:text-text-dark-primary">
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-4 text-text-secondary dark:text-text-dark-secondary">
            {line.slice(2)}
          </li>
        )
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        elements.push(
          <li key={index} className="ml-4 text-text-secondary dark:text-text-dark-secondary list-decimal">
            {line.slice(3)}
          </li>
        )
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-accent pl-4 my-4 italic text-text-secondary dark:text-text-dark-secondary">
            {line.slice(2)}
          </blockquote>
        )
      } else if (line.trim() === '') {
        elements.push(<br key={index} />)
      } else {
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/)
        elements.push(
          <p key={index} className="my-3 text-text-secondary dark:text-text-dark-secondary">
            {parts.map((part, i) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code key={i} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                    {part.slice(1, -1)}
                  </code>
                )
              }
              return part
            })}
          </p>
        )
      }
    })

    return elements
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.summary} />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <article className="article-detail">
          <Link href="/blog">
            <a className="back-link">← Back to Blog</a>
          </Link>

          <header className="article-detail-header">
            <h1 className="article-detail-title">{post.title}</h1>
            <p className="article-detail-date">{formatDate(post.date)}</p>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="article-detail-content">
            {renderContent(post.content)}
          </div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)

  return {
    props: {
      post: post || null,
      posts: posts
    }
  }
}
