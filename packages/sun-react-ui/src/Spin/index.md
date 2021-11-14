## Spin

### 默认

```tsx
import React from 'react';
import { Spin } from 'sun-react-ui';

export default () => <Spin />;
```

### Loading 包裹组件

```tsx
import React from 'react';
import { Spin } from 'sun-react-ui';

export default () => (
  <Spin tip="温馨提示">
    <div style={{ padding: '100px', backgroundColor: 'lightblue' }}>
      this is content
    </div>
  </Spin>
);
```

### 不同大小的 Loading 组件

```tsx
import React from 'react';
import { Spin } from 'sun-react-ui';

export default () => (
  <>
    <Spin size="small" />
    <Spin size="default" />
    <Spin size="large" />
  </>
);
```

### 自定义图标组件

```tsx
import React from 'react';
import { Spin } from 'sun-react-ui';
import { X, XCircle } from 'sun-react-icons';

export default () => (
  <>
    <Spin indicator={<X />} />
    <Spin indicator={<XCircle />} />
  </>
);
```
