'use client';

import * as React from 'react';
import { motion, useAnimation, type LegacyAnimationControls, type SVGMotionProps, type Variants } from 'motion/react';

export type IconProps<T = string> = Omit<SVGMotionProps<SVGSVGElement>, 'animate'> & {
  size?: number;
  animate?: boolean | T;
  animateOnHover?: boolean | T;
  animation?: T;
};

type Context = { controls: LegacyAnimationControls; animation: string };
const IconContext = React.createContext<Context | null>(null);

export function useAnimateIconContext() {
  return React.useContext(IconContext) ?? { controls: undefined, animation: 'default' };
}

export function getVariants<T extends Record<string, Variants>>(animations: T): T {
  const { animation } = useAnimateIconContext();
  return (animations[animation as keyof T] ?? animations.default) as T;
}

export function IconWrapper<T extends string>({
  icon: Icon,
  size = 28,
  animate,
  animateOnHover,
  animation = 'default',
  ...props
}: IconProps<T> & { icon: React.ComponentType<IconProps<T>> }) {
  const controls = useAnimation();
  const [active, setActive] = React.useState(Boolean(animate));

  React.useEffect(() => {
    setActive(Boolean(animate));
    void controls.start(animate ? 'animate' : 'initial');
  }, [animate, controls]);

  const start = () => {
    if (animateOnHover !== undefined) {
      setActive(true);
      void controls.start('animate');
    }
  };

  const stop = () => {
    if (animateOnHover !== undefined) {
      setActive(false);
      void controls.start('initial');
    }
  };

  return (
    <motion.span
      className="inline-flex"
      onMouseEnter={start}
      onMouseLeave={stop}
      aria-hidden="true"
    >
      <IconContext.Provider value={{ controls, animation: String(animation) }}>
        <Icon size={size} {...props} />
      </IconContext.Provider>
    </motion.span>
  );
}
