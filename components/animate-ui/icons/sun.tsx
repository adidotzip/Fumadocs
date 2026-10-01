'use client';

import { motion, type Variants } from 'motion/react';
import { getVariants, useAnimateIconContext, IconWrapper, type IconProps } from './icon';

type SunProps = IconProps<keyof typeof animations>;
const animations = {
  default: {
    rays: {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: [0, 1], scale: [0.85, 1], transition: { duration: 0.6, ease: 'easeInOut' } },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: SunProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      initial="initial" animate={controls} {...props}>
      <circle cx="12" cy="12" r="4" />
      <motion.g variants={variants.rays} initial="initial" animate={controls}>
        <path d="M12 2v2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M22 12h-2" />
        <path d="m19.07 19.07-1.41-1.41" /><path d="M12 22v-2" /><path d="m4.93 19.07 1.41-1.41" />
        <path d="M2 12h2" /><path d="m4.93 4.93 1.41 1.41" />
      </motion.g>
    </motion.svg>
  );
}

export function Sun(props: SunProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
export { Sun as SunIcon };
export type { SunProps };
