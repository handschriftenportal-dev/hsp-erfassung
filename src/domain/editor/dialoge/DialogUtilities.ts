import type { Link } from 'src/types/Link'

function isSafeWebUrl(url: string) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

function openInNewTab(url: string): boolean {
  if (!isSafeWebUrl(url)) {
    console.error('Attempted to open unsafe URL', url)
    return false
  }
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) {
    newWindow.opener = null
  }
  return !!newWindow
}

function isValidLink(link: Link): boolean {
  return link.text.trim() !== '' && isSafeWebUrl(link.href)
}

export const DialogUtilities = Object.freeze({
  isSafeWebUrl,
  isValidLink,
  openInNewTab,
})
