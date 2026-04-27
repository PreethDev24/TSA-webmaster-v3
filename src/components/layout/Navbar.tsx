import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/resources', label: 'Resources' },
  { path: '/mental-health', label: 'Mental Health' },
  { path: '/events', label: 'Events' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/programs', label: 'Programs' },
  { path: '/references', label: 'References' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useDarkText, setUseDarkText] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileOpen(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      window.addEventListener('keydown', onEscape);
    }

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const markerTop = () => {
      const marker = document.getElementById('nav-dark-start');
      if (!marker) return window.innerHeight * 0.72;
      return marker.getBoundingClientRect().top + window.scrollY;
    };

    const updateNavTone = () => {
      const triggerY = markerTop();
      const navOffset = window.scrollY + 88;
      setUseDarkText(navOffset >= triggerY);
    };

    const onScroll = () => updateNavTone();
    const onResize = () => updateNavTone();

    rafId = window.requestAnimationFrame(updateNavTone);
    timeoutId = setTimeout(updateNavTone, 180);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-surface focus:text-ink focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-b from-white/24 via-white/12 to-white/8 shadow-[0_24px_60px_rgba(2,10,24,0.45)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.45),transparent_36%),radial-gradient(circle_at_82%_130%,rgba(34,211,238,0.22),transparent_40%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70"
        />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center shrink-0 group">
              <span
                className={`font-outfit font-semibold text-[1.2rem] sm:text-[1.45rem] leading-none tracking-[-0.01em] ${
                  useDarkText ? 'text-[#0d1b2d]' : 'text-white'
                }`}
              >
                Tracy Center
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 rounded-xl border border-white/20 bg-white/6 px-1.5 py-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-lg px-3 py-2 text-[15px] font-semibold tracking-[0.01em] transition-all duration-200 ${
                      isActive
                        ? `shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_20px_rgba(8,21,44,0.3)] ${
                            useDarkText ? 'bg-black/10' : 'bg-white/25'
                          }`
                        : 'hover:bg-white/14'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`relative z-10 ${
                        useDarkText
                          ? isActive
                            ? 'text-[#0d1b2d]'
                            : 'text-[#0d1b2d]/90 hover:text-[#0d1b2d]'
                          : isActive
                            ? 'text-white'
                            : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:988"
                className={`hidden sm:inline-flex items-center gap-2 rounded-lg border bg-white/10 text-sm font-semibold px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all hover:bg-white/20 ${
                  useDarkText ? 'border-black/20 text-[#0d1b2d]' : 'border-white/30 text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                Get Help
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden rounded-lg border bg-white/10 p-2 transition-colors hover:bg-white/20 ${
                  useDarkText ? 'border-black/20 text-[#0d1b2d]' : 'border-white/20 text-white'
                }`}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />
        <div
          id="mobile-nav-drawer"
          className={`absolute right-0 top-0 h-[100dvh] w-80 max-w-[90vw] bg-surface border-l border-black/10  transform transition-transform duration-300 overflow-y-auto ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-black/10 bg-surface">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-neutral-700">Navigation</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-neutral-800" />
            </button>
          </div>
          <div className="p-5 pb-8 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`px-3 py-3 text-[1.02rem] font-semibold border-b border-black/10 transition-colors ${
                  location.pathname === link.path
                    ? 'text-neutral-950 bg-neutral-100 border-l-4 border-l-neutral-900'
                    : 'text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:988"
              onClick={closeMobileMenu}
              className="mt-5 flex items-center justify-center gap-2 bg-neutral-900 text-ink font-semibold px-4 py-3 hover:bg-black transition-colors"
            >
              <Phone className="w-4 h-4" />
              Get Help Now — 988
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
