import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ThemeSwitch } from '@/components/theme-switch';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      themeSwitch={{ enabled: true }}
      slots={{ themeSwitch: ThemeSwitch }}
    >
      {children}
    </HomeLayout>
  );
}
