import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import ArticleList from '../components/ArticleList'
import { getAllPosts, allTags } from '../lib/posts'
import { useState } from 'react'

interface HomePageProps {
  posts: any[]
  allTags: string[]
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function HomePage({ posts: initialPosts, allTags: tags, darkMode, toggleDarkMode }: HomePageProps) {
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    setMounted(true)
    // Redirect to /blog
    router.push('/blog')
  }, [router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlTags = params.get('tags')
    if (urlTags) {
      setSelectedTags(urlTags.split(','))
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
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />

      <main className="main-content">
        <div className="blog-page max-w-[900px]" style={{ marginTop: '24px' }}>
          {/* Tag Filter */}
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
