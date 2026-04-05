import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import ArticleList from '../../components/ArticleList'
import { getAllPosts, allTags } from '../../lib/posts'

interface BlogPageProps {
  posts: any[]
  allTags: string[]
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function BlogPage({ posts: initialPosts, allTags: tags, darkMode, toggleDarkMode }: BlogPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    setMounted(true)
    const params = new URLSearchParams(window.location.search)
    const tags = params.get('tags')
    if (tags) {
      setSelectedTags(tags.split(','))
    }
  }, [])

  useEffect(() => {
    if (selectedTags.length === 0) {
      setPosts(initialPosts)
    } else {
      setPosts(initialPosts.filter((post: any) => selectedTags.some(tag => post.tags.includes(tag))))
    }
  }, [selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
      
      const url = new URL(window.location.href)
      if (newTags.length > 0) {
        url.searchParams.set('tags', newTags.join(','))
      } else {
        url.searchParams.delete('tags')
      }
      window.history.pushState({}, '', url.toString())
      
      return newTags
    })
  }

  const handleClearAll = () => {
    setSelectedTags([])
    const url = new URL(window.location.href)
    url.searchParams.delete('tags')
    window.history.pushState({}, '', url.toString())
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>Blog | frankly-speaking</title>
        <meta name="description" content="A personal blog about technology, development, and thoughts" />
        <meta name="keywords" content="technology, development, programming, AI, software engineering" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | frankly-speaking" />
        <meta property="og:description" content="A personal blog about technology, development, and thoughts" />
        <meta property="og:url" content="https://franklin0407.github.io/frankly-speaking/blog" />
        <meta property="og:site_name" content="frankly-speaking" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog | frankly-speaking" />
        <meta name="twitter:description" content="A personal blog about technology, development, and thoughts" />
      </Head>

      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />

      <main className="main-content">
        <div className="blog-page" style={{ marginTop: '24px' }}>

          
          {/* Tag Filter - Always visible on page */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag: string) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1 rounded-full text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear
              </button>
            )}
          </div>
        )}
        
        <ArticleList posts={posts} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()
  const tags = allTags

  return {
    props: {
      posts,
      allTags: tags,
    },
  }
}
