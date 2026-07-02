import { useState, useEffect } from 'react'
import { event } from '../lib/analytics'

interface ShareButtonProps {
  /** 文章完整 URL（含 origin + path） */
  url: string
  /** 文章 slug — 用於 UTM content */
  slug: string
  /** 文章標題 — 用於 GA event label */
  title?: string
}

export default function ShareButton({ url, slug, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!copied && !error) return
    const timer = setTimeout(() => {
      setCopied(false)
      setError(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [copied, error])

  const buildShareUrl = (origin: string, path: string): string => {
    const sep = path.includes('?') ? '&' : '?'
    return `${origin}${path}${sep}utm_source=share_btn&utm_medium=copy_link&utm_campaign=article_share&utm_content=${encodeURIComponent(slug)}`
  }

  const handleShare = async () => {
    // 1) 組出帶 UTM 的分享 URL
    // window.location 在 GitHub Pages 上會是 https://franklin0407.github.io/frankly-speaking/blog/[slug]
    const shareUrl = buildShareUrl(window.location.origin + window.location.pathname.replace(/\/$/, ''), window.location.search)

    // 2) 送 GA event — 使用者按下「分享」這件事本身就是事件
    event('share_btn', {
      article_slug: slug,
      article_title: title,
      share_url: shareUrl,
      share_method: 'copy_link',
    })

    // 3) 複製到剪貼簿
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        // Fallback：舊瀏覽器 / 非 HTTPS
        const textarea = document.createElement('textarea')
        textarea.value = shareUrl
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setError(false)
    } catch (e) {
      console.error('[ShareButton] copy failed:', e)
      setError(true)
    }
  }

  return (
    <div className="share-button-wrapper relative inline-flex">
      <button
        type="button"
        onClick={handleShare}
        className="share-btn"
        aria-label="Copy share link to clipboard"
        title="Copy share link"
      >
        {/* Icon: link/chain */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span>Share</span>
      </button>

      {/* Toast */}
      {(copied || error) && (
        <div
          className={`share-toast ${error ? 'share-toast--error' : ''}`}
          role="status"
          aria-live="polite"
        >
          {error ? 'Copy failed' : 'Copied!'}
        </div>
      )}
    </div>
  )
}