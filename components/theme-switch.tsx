'use client';

import type { ComponentProps } from 'react';
import { useTheme } from 'fumadocs-ui/provider/base';
import { useSyncExternalStore } from 'react';
import { MoonStar } from '@/components/animate-ui/icons/moon-star';
import { Sun } from '@/components/animate-ui/icons/sun';
import { cn } from '@/lib/cn';

const noop = () => () => {};

export function ThemeSwitch({ className, ...props }: ComponentProps<'button'>) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const theme = mounted ? resolvedTheme : null;

  function handleThemeChange() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const update = () => setTheme(nextTheme);
    if (document.startViewTransition) document.startViewTransition(update);
    else update();
  }

  const Icon = theme === 'light' ? Sun : MoonStar;
  const sidebarMode = Boolean(className);

  return (
    <button
      type="button"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={handleThemeChange}
      className={cn(
        'inline-flex items-center justify-center text-fd-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring',
        sidebarMode ? 'size-8 rounded-md hover:bg-fd-accent hover:text-fd-accent-foreground' : 'size-8 rounded-md',
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-6 items-center justify-center p-1 transition-colors">
        <Icon size={16} animate />
      </span>
    </button>
  );
}
