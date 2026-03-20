import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import MarkdownContent from '../../components/MarkdownContent'
import TableOfContents from '../../components/TableOfContents'
import { getAllPosts, getPostBySlug, markdownToHtml } from '../../lib/posts'

interface ArticlePageProps {
  post: {
    id: string
    title: string
    date: string
    author: string
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
            <Link href="/blog" className="text-accent hover:underline">← Back to Blog</Link>
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

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <meta name="description" content={post.summary} />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content w-full" style={{ marginLeft: 0, maxWidth: '100%' }}>
        <div className="article-with-toc">
          <TableOfContents content={post.content} />

          <article className="article-detail">
            <Link href="/blog" className="back-link">← Back to Blog</Link>

            <header className="article-detail-header">
              <h1 className="article-detail-title">{post.title}</h1>
              <p className="article-detail-date">{formatDate(post.date)} • {post.author}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="article-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="article-detail-content">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const slugs = posts.map((post) => post.slug)

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      props: {
        post: null,
      },
    }
  }

  return {
    props: {
      post: post,
    },
  }
}
