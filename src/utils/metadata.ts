/**
 * 解析文章 markdown 的 metadata
 */
export interface ArticleMetadata {
  title: string;
  summary: string;
  author: string;
  date: string;
  tags: string[];
  category: string | null;
}

/**
 * 解析文章內容中的 metadata
 * 格式:
 * # 標題
 * > **Summary：** 摘要內容
 * > Author：作者
 * > Date：2020/5/29
 * > Category：分類
 * > Tags：tag1, tag2, tag3
 */
export function parseArticleMetadata(content: string): ArticleMetadata {
  const lines = content.split('\n');
  
  let title = '';
  let summary = '';
  let author = '';
  let date = '';
  let tags: string[] = [];
  let category: string | null = null;
  
  let inSummary = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // 解析標題 (# 標題)
    if (trimmedLine.startsWith('# ') && !title) {
      title = trimmedLine.substring(2).trim();
      continue;
    }
    
    // 解析 Summary (> **Summary：** xxx)
    if (trimmedLine.includes('**Summary：**') || trimmedLine.includes('**Summary：**')) {
      inSummary = true;
      const summaryMatch = trimmedLine.match(/\*\*Summary：[：**](.*)/);
      if (summaryMatch) {
        summary = summaryMatch[1].trim();
      }
      continue;
    }
    
    // 在 Summary 區塊內 (多行)
    if (inSummary && trimmedLine.startsWith('>') && !trimmedLine.includes('**')) {
      const summaryContent = trimmedLine.substring(1).trim();
      if (summaryContent && !summaryContent.includes('：') && !summaryContent.includes(':')) {
        summary += ' ' + summaryContent;
      } else {
        inSummary = false;
      }
    }
    
    // 解析 Author (> Author：xxx)
    if (trimmedLine.startsWith('> Author：') || trimmedLine.startsWith('> Author:')) {
      const match = trimmedLine.match(/>\s*Author[：:]\s*(.+)/);
      if (match) {
        author = match[1].trim();
      }
      continue;
    }
    
    // 解析 Date (> Date：xxx)
    if (trimmedLine.startsWith('> Date：') || trimmedLine.startsWith('> Date:')) {
      const match = trimmedLine.match(/>\s*Date[：:]\s*(.+)/);
      if (match) {
        date = match[1].trim();
      }
      continue;
    }
    
    // 解析 Tags (> Tags：xxx)
    if (trimmedLine.startsWith('> Tags：') || trimmedLine.startsWith('> Tags:')) {
      const match = trimmedLine.match(/>\s*Tags[：:]\s*(.+)/);
      if (match) {
        const tagsStr = match[1].trim();
        tags = tagsStr.split(',').map(t => t.trim()).filter(t => t);
      }
      continue;
    }
    
    // 解析 Category (> Category：xxx)
    if (trimmedLine.startsWith('> Category：') || trimmedLine.startsWith('> Category:')) {
      const match = trimmedLine.match(/>\s*Category[：:]\s*(.+)/);
      if (match) {
        category = match[1].trim();
      }
      continue;
    }
    
    // 遇到非 > 開頭的行，結束 metadata 解析
    if (trimmedLine && !trimmedLine.startsWith('>') && !trimmedLine.startsWith('#')) {
      break;
    }
  }
  
  return {
    title,
    summary,
    author,
    date,
    tags,
    category,
  };
}

/**
 * 取得文章的簡短描述 (用於卡片預覽)
 */
export function getExcerpt(content: string, maxLength: number = 100): string {
  const metadata = parseArticleMetadata(content);
  
  // 如果有 Summary，使用 Summary
  if (metadata.summary) {
    return metadata.summary.length > maxLength 
      ? metadata.summary.substring(0, maxLength) + '...'
      : metadata.summary;
  }
  
  // 否則從內容中擷取
  const lines = content.split('\n');
  let excerpt = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    // 跳過標題、metadata、空白行
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('>') || trimmed.startsWith('```')) {
      continue;
    }
    
    // 移除 markdown 語法
    const cleanLine = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 連結
      .replace(/[*_`]/g, '') // 斜體、粗體、程式碼標記
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, ''); // 圖片
    
    if (cleanLine) {
      excerpt += (excerpt ? ' ' : '') + cleanLine;
      if (excerpt.length > maxLength) {
        break;
      }
    }
  }
  
  return excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt;
}
