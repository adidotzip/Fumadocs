import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { ThemeSwitch } from '@/components/theme-switch';
import { DocsSidebar } from '@/components/docs-sidebar';
import { SidebarProvider, SidebarTrigger, useSidebar } from 'fumadocs-ui/components/sidebar/base';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      themeSwitch={{ enabled: true }}
      slots={{
        themeSwitch: ThemeSwitch,
        sidebar: {
          provider: SidebarProvider,
          root: DocsSidebar,
          trigger: SidebarTrigger,
          useSidebar,
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
