import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export const UIContext = createContext<{ theme?: Theme; rtl?: boolean }>({
  theme: 'dark',
  rtl: false,
});
