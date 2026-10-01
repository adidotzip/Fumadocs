import { source } from '@/lib/source';
import { GlassLayout } from 'fumadocs-ui/layouts/glass';
import { baseOptions } from '@/lib/layout.shared';
import { ThemeSwitch } from '@/components/theme-switch';
import { PageTransition } from '@/components/page-transition';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <GlassLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      slots={{ themeSwitch: ThemeSwitch }}
    >
      <PageTransition>{children}</PageTransition>
    </GlassLayout>
  );
}
