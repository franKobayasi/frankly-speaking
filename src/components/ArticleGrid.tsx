import { ReactNode } from 'react';

interface ArticleGridProps {
  children: ReactNode;
}

export default function ArticleGrid({ children }: ArticleGridProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
