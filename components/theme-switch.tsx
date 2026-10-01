'use client';

import { useTheme } from 'fumadocs-ui/provider/base';
import { useSyncExternalStore } from 'react';
import { MoonStar } from '@/components/animate-ui/icons/moon-star';
import { Sun } from '@/components/animate-ui/icons/sun';
import { cn } from '@/lib/cn';

const noop = () => () => {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ThemeSwitch({ className, ...props }: any) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const theme = mounted ? resolvedTheme : null;
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  function handleThemeChange() {
    const update = () => setTheme(nextTheme);
    if (document.startViewTransition) document.startViewTransition(update);
    else update();
  }

  const Icon = theme === 'light' ? Sun : MoonStar;

  return (
    <button type="button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={handleThemeChange}
      className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring', className)}
      {...props}>
      <Icon size={16} animate />
    </button>
  );
}
