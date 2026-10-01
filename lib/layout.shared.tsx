import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import logo from '../src/images/logo.png';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <img
          src={logo.src}
          alt={appName}
          className="h-7 w-auto max-w-[180px] object-contain"
        />
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
