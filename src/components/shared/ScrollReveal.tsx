'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animClass = visible
    ? direction === 'left'
      ? 'animate-drift-in-left'
      : direction === 'right'
        ? 'animate-drift-in-right'
        : 'animate-drift-in-up'
    : 'opacity-0';

  const Component = Tag as unknown as 'div';
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ animationDelay: `${delay}ms` }}
      className={`${animClass} ${className}`}
    >
      {children}
    </Component>
  );
}
