import { useState } from 'react'
import Link from 'next/link'
import { Post } from '../lib/posts'

interface ArticleCardProps {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <article 
      className="article-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="article-card-header">
        <span className="article-date">{formatDate(post.date)}</span>
        <span className="article-date ml-2">• {post.author}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`article-expand-icon ${expanded ? 'expanded' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      <Link href={`/blog/${post.slug}`} className="article-title hover:underline" onClick={(e) => e.stopPropagation()}>
        {post.title}
      </Link>

      <div 
        className="accordion-content"
        style={{ 
          maxHeight: expanded ? '200px' : '0',
          opacity: expanded ? 1 : 0
        }}
      >
        <p className="article-summary mt-2">
          {post.summary}
        </p>
      </div>

      <div className="article-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="article-tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
