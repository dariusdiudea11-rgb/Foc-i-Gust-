import { useState, useEffect } from 'react'

// Small matchMedia hook so the inline-styled layouts can collapse on phones.
export function useIsMobile(maxWidth = 820) {
  const query = `(max-width:${maxWidth}px)`
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return isMobile
}
