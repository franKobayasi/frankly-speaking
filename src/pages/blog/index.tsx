import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ArticleList from '../../components/ArticleList'
import { posts, filterPostsByTags } from '../../data/posts'

interface BlogPageProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function BlogPage({ darkMode, toggleDarkMode }: BlogPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read tags from URL query params
    const params = new URLSearchParams(window.location.search)
    const tags = params.get('tags')
    if (tags) {
      setSelectedTags(tags.split(','))
    }
  }, [])

  const filteredPosts = filterPostsByTags(selectedTags)

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
      
      // Update URL
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
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={handleClearAll}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <h1 className="text-2xl font-bold mb-6 text-text-primary dark:text-text-dark-primary">
          All Posts
        </h1>
        <ArticleList posts={filteredPosts} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      posts: posts
    }
  }
}
