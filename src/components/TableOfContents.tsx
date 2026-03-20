import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseHeadings(content: string): TocItem[] {
  const lines = content.split('\n');
  const items: TocItem[] = [];
  const slugCount: Record<string, number> = {};

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[`*_[\]]/g, '').trim();
      let id = slugify(text);

      // handle duplicate slugs the same way github-slugger does
      if (slugCount[id] !== undefined) {
        slugCount[id]++;
        id = `${id}-${slugCount[id]}`;
      } else {
        slugCount[id] = 0;
      }

      items.push({ id, text, level });
    }
  }
  return items;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = parseHeadings(content);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-nav">
      <p className="toc-title">$ toc</p>
      <ul className="toc-list">
        {headings.map((item) => (
          <li
            key={item.id}
            className={`toc-item toc-level-${item.level}${activeId === item.id ? ' toc-active' : ''}`}
          >
            <a href={`#${item.id}`} className="toc-link">
              {item.level === 2 ? '▸ ' : '  └ '}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
