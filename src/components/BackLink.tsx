import Link from 'next/link';

interface BackLinkProps {
  href?: string;
}

export default function BackLink({ href = '/blog' }: BackLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center text-stripe-accent hover:text-stripe-accent-hover transition-colors mb-6">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        All Articles
    </Link>
  );
}
