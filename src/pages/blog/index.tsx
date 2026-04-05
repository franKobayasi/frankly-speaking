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
  const [tagExpanded, setTagExpanded] = useState(false)

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

          
          {/* Tag Filter - Collapsible */}
        {tags && tags.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setTagExpanded(!tagExpanded)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                tagExpanded
                  ? 'bg-accent text-white border-accent'
                  : selectedTags.length > 0
                  ? 'bg-accent/10 text-accent border-accent/30 dark:bg-accent/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
              {selectedTags.length > 0 && (
                <span className={`px-1 py-0.5 rounded-full text-xs ${tagExpanded ? 'bg-white/20' : 'bg-accent text-white'}`}>
                  {selectedTags.length}
                </span>
              )}
            </button>

            {tagExpanded && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
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
                    className="px-2.5 py-1 rounded-full text-xs text-accent hover:underline underline-offset-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
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
