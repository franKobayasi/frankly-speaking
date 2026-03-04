import { GetStaticProps } from 'next';
import ArticleCard from '@src/components/ArticleCard';
import ArticleGrid from '@src/components/ArticleGrid';
import { parseArticleMetadata } from '@src/utils/metadata';
import Head from 'next/head';

const fs = require('fs');
const path = require('path');

interface Article {
  slug: string;
  content: string;
  metadata: ReturnType<typeof parseArticleMetadata>;
}

interface BlogProps {
  articles: Article[];
}

function Blog({ articles }: BlogProps) {
  return (
    <>
      <Head>
        <title>Articles | frankly-speaking</title>
        <meta name="description" content="Frank Lin's blog articles" />
      </Head>
      
      <div className="min-h-screen bg-stripe-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 頁面標題 */}
          <h1 className="text-[40px] sm:text-[32px] font-bold text-[#1A1F36] mt-8 mb-6 text-left">
            Blog
          </h1>
          
          {/* 文章網格 */}
          <ArticleGrid>
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                content={article.content}
                metadata={article.metadata}
              />
            ))}
          </ArticleGrid>
          
          {/* 空狀態 */}
          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stripe-secondary">No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;

export const getStaticProps: GetStaticProps = async function (context) {
  const articleDir = path.join(process.cwd(), 'src/articles');
  const articleFiles = fs.readdirSync(articleDir)
    .filter((article: string) => article !== '.DS_Store' && article.endsWith('.md'));
  
  const articles: Article[] = articleFiles.map((filename: string) => {
    const filepath = path.join(articleDir, filename);
    const content = fs.readFileSync(filepath, { encoding: 'utf8' });
    const slug = filename.replace(/\.md$/, '');
    const metadata = parseArticleMetadata(content);
    
    return {
      slug,
      content,
      metadata,
    };
  });
  
  // 按日期排序 (新到舊)
  articles.sort((a, b) => {
    const dateA = a.metadata.date || '';
    const dateB = b.metadata.date || '';
    return dateB.localeCompare(dateA);
  });

  return {
    props: {
      articles,
    },
  };
};
