'use client';

import * as Base from 'fumadocs-ui/components/sidebar/base';
import { cn } from 'fumadocs-ui/utils/cn';
import { type ComponentProps, type ReactNode, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { createPageTreeRenderer, type SidebarPageTreeComponents } from 'fumadocs-ui/components/sidebar/page-tree';
import { createLinkItemRenderer } from 'fumadocs-ui/components/sidebar/link-item';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ChevronDown, Languages } from 'lucide-react';
import { mergeRefs } from 'fumadocs-ui/utils/merge-refs';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { LinkItem } from 'fumadocs-ui/layouts/shared';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { PanelLeft } from '@/components/animate-ui/icons/panel-left';

const itemVariants = cva(
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        link: 'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors',
        button: 'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none',
      },
      highlight: {
        true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5",
      },
    },
  },
);

export interface DocsSidebarProps extends ComponentProps<'aside'> {
  components?: Partial<SidebarPageTreeComponents>;
  banner?: ReactNode;
  footer?: ReactNode;
  collapsible?: boolean;
}

export function DocsSidebar({ footer, banner, collapsible = true, components, ...rest }: DocsSidebarProps) {
  const { menuItems, slots, props: { tabs, nav, tabMode } } = useDocsLayout();
  const iconLinks = menuItems.filter((item) => item.type === 'icon');

  const viewport = (
    <Base.SidebarViewport>
      <div className="flex flex-col gap-0.5">
        {menuItems.filter((v) => v.type !== 'icon').map((item, i, list) => (
          <SidebarLinkItem key={i} item={item} className={cn(i === list.length - 1 && 'mb-4')} />
        ))}
        <SidebarPageTree {...components} />
      </div>
    </Base.SidebarViewport>
  );

  return (
    <>
      <SidebarContent {...rest}>
        <div className="flex flex-col gap-3 p-4 pb-2">
          <div className="flex">
            {slots.navTitle && <slots.navTitle className="inline-flex text-[0.9375rem] items-center gap-2.5 font-medium me-auto" />}
            {nav?.children}
            {collapsible && (
              <Base.SidebarCollapseTrigger
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm', className: 'mb-auto text-fd-muted-foreground' }))}
              >
                <PanelLeft size={16} animateOnHover />
              </Base.SidebarCollapseTrigger>
            )}
          </div>
          {slots.searchTrigger && <slots.searchTrigger.full hideIfDisabled />}
          {tabs.length > 0 && (
            <SidebarTabsDropdown
              options={tabMode === 'auto' ? tabs : tabs.filter((tab) => typeof tab.$folder?.root === 'string')}
            />
          )}
          {banner}
        </div>
        {viewport}
        {(slots.languageSelect || iconLinks.length > 0 || slots.themeSwitch || footer) && (
          <div className="flex flex-col p-4 pt-2">
            {slots.languageSelect && (
              <slots.languageSelect.root variant="secondary" className="text-fd-muted-foreground text-start justify-start bg-fd-secondary/50 mb-2">
                <Languages className="size-4.5" />
                <slots.languageSelect.text />
                <ChevronDown className="ms-auto size-3.5" />
              </slots.languageSelect.root>
            )}
            <div className="flex text-fd-muted-foreground items-center border bg-fd-secondary/50 p-0.5 pe-0 rounded-lg empty:hidden">
              {iconLinks.map((item, i) => (
                <LinkItem key={i} item={item} className={cn(buttonVariants({ size: 'icon-sm', variant: 'ghost' }))} aria-label={item.label}>
                  {item.icon}
                </LinkItem>
              ))}
              {slots.themeSwitch && <slots.themeSwitch className="px-1 py-0 border-y-0 border-e-0 rounded-none ms-auto *:rounded-md" />}
            </div>
            {footer}
          </div>
        )}
      </SidebarContent>

      <Base.SidebarDrawer>
        <div className="flex flex-col gap-3 p-4 pb-2">
          <div className="flex text-fd-muted-foreground items-center gap-1.5">
            <div className="flex flex-1">
              {iconLinks.map((item, i) => (
                <LinkItem key={i} item={item} className={cn(buttonVariants({ size: 'icon-sm', variant: 'ghost', className: 'p-2' }))} aria-label={item.label}>
                  {item.icon}
                </LinkItem>
              ))}
            </div>
            {slots.languageSelect && (
              <slots.languageSelect.root>
                <Languages className="size-4.5" />
                <slots.languageSelect.text />
              </slots.languageSelect.root>
            )}
            {slots.themeSwitch && <slots.themeSwitch className="p-0" />}
            <Base.SidebarTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm', className: 'p-2' }))}>
              <PanelLeft size={16} animateOnHover />
            </Base.SidebarTrigger>
          </div>
          {tabs.length > 0 && <SidebarTabsDropdown options={tabs} />}
          {banner}
        </div>
        {viewport}
        <div className="flex flex-col border-t p-4 pt-2 empty:hidden">{footer}</div>
      </Base.SidebarDrawer>
    </>
  );
}

function SidebarContent({ ref: refProp, className, children, ...props }: ComponentProps<'aside'>) {
  const ref = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({ collapsed, hovered, ref: asideRef, ...rest }) => (
        <>
          <div data-sidebar-placeholder="" className="sticky top-(--fd-docs-row-1) z-20 [grid-area:sidebar] pointer-events-none *:pointer-events-auto h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] md:max-xl:hidden max-md:hidden">
            {collapsed && <div className="absolute inset-s-0 inset-y-0 w-4" {...rest} />}
            <aside id="nd-sidebar" ref={mergeRefs(ref, refProp, asideRef)} data-collapsed={collapsed} data-hovered={collapsed && hovered} inert={collapsed && !hovered}
              className={cn('absolute flex flex-col w-full inset-s-0 inset-y-0 items-end bg-fd-card text-sm border-e duration-250 *:w-(--fd-sidebar-width)', collapsed && ['inset-y-2 rounded-xl transition-transform border w-(--fd-sidebar-width)', hovered ? 'shadow-lg translate-x-2 rtl:-translate-x-2' : '-translate-x-(--fd-sidebar-width) rtl:translate-x-full'], className)} {...props} {...rest}>
              {children}
            </aside>
          </div>
          <div data-sidebar-panel="" className={cn('fixed flex top-[calc(--spacing(4)+var(--fd-docs-row-3))] inset-s-4 shadow-lg transition-opacity rounded-xl p-0.5 border bg-fd-muted text-fd-muted-foreground z-10', (!collapsed || hovered) && 'pointer-events-none opacity-0')} inert={!collapsed || hovered}>
            <Base.SidebarCollapseTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm', className: 'rounded-lg' }))}>
              <PanelLeft size={16} animateOnHover />
            </Base.SidebarCollapseTrigger>
            <SearchTrigger className="rounded-lg" hideIfDisabled />
          </div>
        </>
      )}
    </Base.SidebarContent>
  );
}

const SidebarFolder = (props: ComponentProps<typeof Base.SidebarFolder>) => <Base.SidebarFolder {...props} />;
const SidebarFolderContent = ({ className, children, ...props }: ComponentProps<typeof Base.SidebarFolderContent>) => {
  const depth = Base.useFolderDepth();
  return <Base.SidebarFolderContent className={(state) => cn('relative flex flex-col gap-0.5 pt-0.5', depth === 1 && "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:inset-s-2.5", typeof className === 'function' ? className(state) : className)} {...props}>{children}</Base.SidebarFolderContent>;
};
const SidebarFolderLink = ({ className, style, ...props }: ComponentProps<typeof Base.SidebarFolderLink>) => {
  const depth = Base.useFolderDepth();
  return <Base.SidebarFolderLink className={cn(itemVariants({ variant: 'link', highlight: depth > 1 }), 'w-full', className)} style={{ paddingInlineStart: getItemOffset(depth - 1), ...style }} {...props}>{props.children}</Base.SidebarFolderLink>;
};
const SidebarFolderTrigger = ({ className, style, ...props }: ComponentProps<typeof Base.SidebarFolderTrigger>) => {
  const { depth, collapsible } = Base.useFolder()!;
  return <Base.SidebarFolderTrigger className={(state) => cn(itemVariants({ variant: collapsible ? 'button' : null }), 'w-full', typeof className === 'function' ? className(state) : className)} style={{ paddingInlineStart: getItemOffset(depth - 1), ...style }} {...props}>{props.children}</Base.SidebarFolderTrigger>;
};
const SidebarItem = ({ className, style, ...props }: ComponentProps<typeof Base.SidebarItem>) => {
  const depth = Base.useFolderDepth();
  return <Base.SidebarItem className={cn(itemVariants({ variant: 'link', highlight: depth >= 1 }), className)} style={{ paddingInlineStart: getItemOffset(depth), ...style }} {...props}>{props.children}</Base.SidebarItem>;
};
const SidebarSeparator = ({ className, style, ...props }: ComponentProps<typeof Base.SidebarSeparator>) => {
  const depth = Base.useFolderDepth();
  return <Base.SidebarSeparator className={cn('inline-flex items-center gap-2 mb-1 px-2 mt-6 empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0', depth === 0 && 'first:mt-0', className)} style={{ paddingInlineStart: getItemOffset(depth), ...style }} {...props} />;
};
const SidebarPageTree = createPageTreeRenderer({ SidebarFolder, SidebarFolderContent, SidebarFolderLink, SidebarFolderTrigger, SidebarItem, SidebarSeparator });
const SidebarLinkItem = createLinkItemRenderer({ SidebarFolder, SidebarFolderContent, SidebarFolderLink, SidebarFolderTrigger, SidebarItem, SidebarSeparator });

function getItemOffset(depth: number) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}
