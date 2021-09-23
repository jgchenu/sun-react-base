## Button

### 不同主题

```tsx
import React from 'react';
import { Button } from 'sun-react-ui';

export default () => (
  <div>
    <Button type="default">default button</Button>
    <Button type="primary">primary button</Button>
    <Button type="danger">danger button</Button>
    <Button type="link" href="https://baidu.com">
      link button
    </Button>
  </div>
);
```

### 禁用

```tsx
import React from 'react';
import { Button } from 'sun-react-ui';

export default () => (
  <Button onClick={() => alert('click')} disabled>
    disabled button
  </Button>
);
```

### 不同大小

```tsx
import React from 'react';
import { Button } from 'sun-react-ui';

export default () => (
  <div>
    <Button size="large">large button</Button>
    <Button size="small">small button</Button>
  </div>
);
```
