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
  // 避免 hydration mismatch — 預設黑圖，等 mount 後切換
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    const shareUrl = buildShareUrl(
      window.location.origin + window.location.pathname.replace(/\/$/, ''),
      window.location.search
    )

    event('share_btn', {
      article_slug: slug,
      article_title: title,
      share_url: shareUrl,
      share_method: 'copy_link',
    })

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
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

  // mounted 前一律用黑圖（避免 dark mode 初始 flash）
  // mounted 後依目前 .dark class 切換
  const isDark = mounted && typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const iconSrc = isDark ? '/icons/share-white.png' : '/icons/share-black.png'

  return (
    <div className="share-button-wrapper relative inline-flex">
      <button
        type="button"
        onClick={handleShare}
        className="share-icon-btn"
        aria-label="Copy share link to clipboard"
        title="Copy share link"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt=""
          width="20"
          height="20"
          aria-hidden="true"
        />
      </button>

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