export function getScroll(
  target: HTMLElement | Window | null,
  top: boolean,
): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow
    ? (target as Window)[prop]
    : (target as HTMLElement)[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = (document.documentElement as HTMLElement)[method];
  }

  return ret;
}

export function getDefaultTarget() {
  return window;
}

export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
}
