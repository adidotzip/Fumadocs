import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { ThemeSwitch } from '@/components/theme-switch';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      themeSwitch={{ enabled: true }}
      slots={{ themeSwitch: ThemeSwitch }}
    >
      {children}
    </DocsLayout>
  );
}
