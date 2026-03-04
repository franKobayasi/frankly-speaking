import { useState } from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import { ArticleMetadata, getExcerpt } from '@src/utils/metadata';

interface ArticleCardProps {
  slug: string;
  content: string;
  metadata: ArticleMetadata;
}

export default function ArticleCard({ slug, content, metadata }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const excerpt = getExcerpt(content, 100);

  return (
    <div
      className={`
        bg-stripe-card rounded-card border border-stripe-border
        shadow-card transition-all duration-200 ease-out
        min-h-[160px] flex flex-col
        ${isHovered ? 'shadow-card-hover border-stripe-accent' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full text-left p-6 focus:outline-none flex items-start justify-between">
              <div className="flex-1 pr-4">
                {/* 標題 */}
                <h3 className="text-lg font-heading font-semibold text-stripe-primary mb-2 leading-tight">
                  {metadata.title || slug}
                </h3>
                
                {/* 日期和作者 */}
                <div className="flex items-center text-sm text-stripe-secondary mb-3">
                  {metadata.date && (
                    <>
                      <span>{metadata.date}</span>
                      {metadata.author && (
                        <>
                          <span className="mx-2">|</span>
                          <span>By {metadata.author}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                {/* 簡短描述 - 預設顯示 */}
                <p className="text-stripe-secondary text-sm leading-relaxed">
                  {excerpt}
                </p>
              </div>
              
              {/* 展開圖標 */}
              <div className="ml-2 flex-shrink-0 mt-1">
                <svg 
                  className={`w-5 h-5 text-stripe-secondary transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </Disclosure.Button>
            
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-6 pb-6 pt-0">
                <div className="border-t border-stripe-border pt-4 mt-2">
                  {/* Summary */}
                  {metadata.summary && (
                    <div className="mb-4">
                      <p className="text-stripe-primary text-sm leading-relaxed">
                        {metadata.summary}
                      </p>
                    </div>
                  )}
                  
                  {/* Tags */}
                  {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {metadata.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-stripe-tag-bg text-stripe-tag-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 閱讀更多連結 */}
                  <Link href={`/blog/${slug}`}>
                    <a className="inline-flex items-center text-sm font-medium text-stripe-accent hover:text-stripe-accent-hover transition-colors">
                      Read more →
                    </a>
                  </Link>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
