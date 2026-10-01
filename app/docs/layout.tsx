import { source } from '@/lib/source';
import { GlassLayout } from 'fumadocs-ui/layouts/glass';
import { baseOptions } from '@/lib/layout.shared';
import { ThemeSwitch } from '@/components/theme-switch';
import { PageTransition } from '@/components/page-transition';
import favicon from '@/src/images/favicon.png';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options = baseOptions();

  return (
    <GlassLayout
      tree={source.getPageTree()}
      {...options}
      nav={{
        ...options.nav,
        title: (
          <span className="docs-sidebar-brand">
            <img
              src={favicon.src}
              alt=""
              className="docs-sidebar-brand-icon"
            />
            <span className="docs-sidebar-brand-copy">
              <span className="docs-sidebar-brand-name">AntamScript</span>
              <span className="docs-sidebar-brand-description">
                The AntamScript docs
              </span>
            </span>
          </span>
        ),
      }}
      slots={{ themeSwitch: ThemeSwitch }}
    >
      <PageTransition>{children}</PageTransition>
    </GlassLayout>
  );
}
