/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // 移除 metadata 部分，只保留正文
  const cleanContent = removeMetadata(content);

  // 使用 remark-gfm（支援表格）
  const remarkPlugins = [[gfm as any, {}]];

  return (
    <div className="prose prose-stripe max-w-none">
      <ReactMarkdown
        // @ts-ignore
        remarkPlugins={remarkPlugins}
        components={{
          // 自定義標題樣式
          h1: ({ children }: any) => (
            <h1 className="text-3xl font-heading font-bold text-stripe-primary dark:text-gray-100 mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }: any) => (
            <h2 className="text-2xl font-heading font-semibold text-stripe-primary dark:text-gray-100 mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }: any) => (
            <h3 className="text-xl font-heading font-semibold text-stripe-primary dark:text-gray-100 mt-6 mb-3">
              {children}
            </h3>
          ),
          // 自定義連結樣式
          a: ({ href, children }: any) => (
            <a 
              href={href as string} 
              className="text-stripe-accent dark:text-blue-300 hover:text-stripe-accent dark:text-blue-300-hover underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // 自定義程式碼區塊樣式
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return (
                <code 
                  className="px-1.5 py-0.5 bg-stripe-hover-bg rounded text-sm font-code text-stripe-accent dark:text-blue-300"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            
            return (
              <code className={`${className} text-sm`} {...props}>
                {children}
              </code>
            );
          },
          // 自定義區塊引用
          blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-stripe-accent pl-4 my-4 text-stripe-secondary dark:text-gray-300 dark:text-gray-200 italic">
              {children}
            </blockquote>
          ),
          // 自定義列表
          ul: ({ children }: any) => (
            <ul className="list-disc list-inside my-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }: any) => (
            <ol className="list-decimal list-inside my-4 space-y-2">
              {children}
            </ol>
          ),
          // 自定義表格
          table: ({ children }: any) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-stripe-border rounded-card">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: any) => (
            <thead className="bg-stripe-hover-bg">
              {children}
            </thead>
          ),
          tbody: ({ children }: any) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }: any) => (
            <tr className="hover:bg-stripe-hover-bg transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }: any) => (
            <th className="border border-stripe-border px-4 py-2 text-left font-semibold text-stripe-primary dark:text-gray-100">
              {children}
            </th>
          ),
          td: ({ children }: any) => (
            <td className="border border-stripe-border px-4 py-2 text-stripe-secondary dark:text-gray-300 dark:text-gray-200">
              {children}
            </td>
          ),
          p: ({ children }: any) => (
            <p className="my-4 text-stripe-secondary dark:text-gray-300 dark:text-gray-200">
              {children}
            </p>
          ),
          li: ({ children }: any) => (
            <li className="text-stripe-secondary dark:text-gray-300 dark:text-gray-200">
              {children}
            </li>
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}

/**
 * 移除 markdown 中的 metadata 區塊
 */
function removeMetadata(content: string): string {
  const lines = content.split('\n');
  let inMetadata = false;
  let metadataEnded = false;
  const resultLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // 開始於第一個 # 標題後 (跳過 # 標題本身，開始解析後面的 metadata)
    if (trimmed.startsWith('# ')) {
      inMetadata = true;
      resultLines.push(line);
      continue;
    }
    
    // 如果在 metadata 區塊內
    if (inMetadata) {
      // 遇到非 > 開頭的行，說明 metadata 結束
      if (trimmed && !trimmed.startsWith('>') && !trimmed.startsWith('#')) {
        inMetadata = false;
        metadataEnded = true;
      }
    }
    
    // 只有在 metadata 結束後才加入結果
    if (metadataEnded || !inMetadata) {
      resultLines.push(line);
    }
  }
  
  return resultLines.join('\n');
}
