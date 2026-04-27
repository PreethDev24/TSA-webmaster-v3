'use client';

import { useEffect, useRef } from 'react';

interface ScrollySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ScrollySection({ children, className = '', id }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!elements || elements.length === 0) return;

    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px) scale(0.98)';
      el.style.transition = `opacity 520ms ease-out ${i * 70}ms, transform 520ms ease-out ${i * 70}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(el);
        });
      },
      { root: null, threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}