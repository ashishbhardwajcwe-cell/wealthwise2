import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Progressive scroll-reveal for elements tagged className="reveal".
// Additive only: content is fully visible without JS / for crawlers — the
// hidden initial state applies once we add `.js-reveal` to <html>. Re-scans
// on every route change so client-side navigations keep working.
export default function ScrollReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('js-reveal')
    let io
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
      if (!els.length) return
      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'))
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              io.unobserve(e.target)
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
      )
      els.forEach((el) => io.observe(el))
    })
    return () => {
      cancelAnimationFrame(raf)
      if (io) io.disconnect()
    }
  }, [pathname])
  return null
}
