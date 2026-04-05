import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '../../components/Header'
import MarkdownContent from '../../components/MarkdownContent'
import TableOfContents from '../../components/TableOfContents'
import { getAllPosts, getPostBySlug, markdownToHtml } from '../../lib/posts'
import { pageview } from '../../lib/analytics'

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
  const router = useRouter()

  // GA4 pageview tracking
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="author" content={post.author} />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:url" content={`https://franklin0407.github.io/frankly-speaking/blog/${post.slug}`} />
        <meta property="og:site_name" content="frankly-speaking" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:tag" content={post.tags.join(', ')} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.summary,
              author: {
                '@type': 'Person',
                name: post.author,
              },
              datePublished: post.date,
              tags: post.tags,
              url: `https://franklin0407.github.io/frankly-speaking/blog/${post.slug}`,
            }),
          }}
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
