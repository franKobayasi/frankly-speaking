import { ArticleMetadata } from '@src/utils/metadata';

interface ArticleHeaderProps {
  title: string;
  metadata: ArticleMetadata;
}

export default function ArticleHeader({ title, metadata }: ArticleHeaderProps) {
  return (
    <div className="mb-8">
      {/* 標題 */}
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-stripe-primary mb-4">
        {title}
      </h1>
      
      {/* 元數據 */}
      <div className="flex flex-wrap items-center text-stripe-secondary text-sm mb-4">
        {metadata.date && (
          <>
            <span>{metadata.date}</span>
            <span className="mx-2">|</span>
          </>
        )}
        {metadata.author && (
          <span>By {metadata.author}</span>
        )}
      </div>
      
      {/* Tags */}
      {metadata.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm font-medium rounded-full bg-stripe-tag-bg text-stripe-tag-text"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
