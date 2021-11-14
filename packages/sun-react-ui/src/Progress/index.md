## Progress

### 默认 Progress

```tsx
import React from 'react';
import { Progress } from 'sun-react-ui';

export default () => <Progress percent={10} />;
```

### 隐藏 Text Progress

```tsx
import React from 'react';
import { Progress } from 'sun-react-ui';
export default () => <Progress percent={10} showText={false} />;
```

### 不同主题的 Progress

```tsx
import React from 'react';
import { Progress } from 'sun-react-ui';
export default () => (
  <>
    <Progress percent={10} showText={false} theme="primary" />
    <br />
    <Progress percent={10} showText={false} theme="info" />
    <br />
    <Progress percent={10} showText={false} theme="danger" />
    <br />
    <Progress percent={10} showText={false} theme="warning" />
    <br />
    <Progress percent={10} showText={false} theme="success" />
  </>
);
```
