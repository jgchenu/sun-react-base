# BackTop

## 默认

```tsx
import React from 'react';
import { BackTop } from 'sun-react-ui';

export default () => <BackTop />;
```

## 设置阀值跟位置:

```tsx
import React from 'react';
import { BackTop } from 'sun-react-ui';

export default () => (
  <section style={{ height: 500 }}>
    滚动导航，往下滑动就有了
    <BackTop
      visibilityHeight={200}
      style={{
        right: 100,
        bottom: 200,
      }}
    />
  </section>
);
```

## 自定义图标

```tsx
import React from 'react';
import { BackTop, Button } from 'sun-react-ui';

export default () => (
  <BackTop
    style={{
      right: 200,
    }}
  >
    <Button>返回顶部</Button>
  </BackTop>
);
```
