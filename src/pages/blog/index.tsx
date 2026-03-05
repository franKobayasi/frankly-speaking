import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ArticleList from '../../components/ArticleList'
import { getAllPosts, filterPostsByTags, allTags } from '../../lib/posts'

interface BlogPageProps {
  posts: any[]
  allTags: string[]
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function BlogPage({ posts: initialPosts, allTags: tags, darkMode, toggleDarkMode }: BlogPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    setPosts(filterPostsByTags(selectedTags))
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
        allTags={tags}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <h1 className="text-2xl font-bold mb-6 text-text-primary dark:text-text-dark-primary">
          All Posts
        </h1>
        <ArticleList posts={posts} />
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
