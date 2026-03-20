import { Post } from '../lib/posts'
import ArticleCard from './ArticleCard'

interface ArticleListProps {
  posts: Post[]
}

export default function ArticleList({ posts }: ArticleListProps) {
  if (posts.length === 0) {
    return (
      <div className="no-posts-message">
        <p>No articles found matching your filters.</p>
        <p className="mt-2">Try selecting different tags or clear all filters.</p>
      </div>
    )
  }

  return (
    <div>
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}
