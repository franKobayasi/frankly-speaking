import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BackLink from '@src/components/BackLink';
import ArticleHeader from '@src/components/ArticleHeader';
import MarkdownContent from '@src/components/MarkdownContent';
import { parseArticleMetadata } from '@src/utils/metadata';

const fs = require('fs');
const path = require('path');

interface ArticlePageProps {
  content: string;
  metadata: ReturnType<typeof parseArticleMetadata>;
  slug: string;
}

export default function ArticlePage({ content, metadata, slug }: ArticlePageProps) {
  const router = useRouter();
  
  // 防止 SSG 期間的閃爍
  if (router.isFallback) {
    return <div className="p-8">Loading...</div>;
  }

  const title = metadata.title || slug;

  return (
    <>
      <Head>
        <title>{title} | frankly-speaking</title>
        <meta name="description" content={metadata.summary || title} />
      </Head>
      
      <div className="min-h-screen bg-stripe-background">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-12">
          {/* 返回連結 */}
          <BackLink />
          
          {/* 文章標題和元數據 */}
          <ArticleHeader title={title} metadata={metadata} />
          
          {/* 文章內容 */}
          <MarkdownContent content={content} />
          
          {/* 底部返回連結 */}
          <div className="mt-12 pt-8 border-t border-stripe-border">
            <BackLink />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  const articleDir = path.join(process.cwd(), 'src/articles');
  const articleFiles = fs.readdirSync(articleDir)
    .filter((article: string) => article !== '.DS_Store' && article.endsWith('.md'));
  
  const paths = articleFiles.map((article: string) => ({
    params: {
      article: article.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async function (context) {
  const articleDir = path.join(process.cwd(), 'src/articles');
  const slug = context.params?.article as string;
  const filepath = path.join(articleDir, `${slug}.md`);
  
  const content = fs.readFileSync(filepath, { encoding: 'utf8' });
  const metadata = parseArticleMetadata(content);

  return {
    props: {
      content,
      metadata,
      slug,
    },
  };
};
