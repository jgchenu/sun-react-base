## Message

### 不同主题

```tsx
import React from 'react';
import { Button, Message } from 'sun-react-ui';

export default () => (
  <div>
    <Button
      onClick={() => {
        Message.info({ title: ' Info message' });
      }}
    >
      Info message
    </Button>
    <Button onClick={() => Message.warning({ title: 'Warning message' })}>
      Warning message
    </Button>
    <Button onClick={() => Message.success({ title: 'Success message' })}>
      Success message
    </Button>
    <Button
      onClick={() => Message.error({ title: 'Error message' })}
      type="danger"
    >
      Error message
    </Button>
  </div>
);
```

### 加载态

```tsx
import React from 'react';
import { Button, Message } from 'sun-react-ui';

export default () => (
  <Button
    onClick={() => Message.loading({ title: 'Loading message' })}
    type="primary"
  >
    Loading message
  </Button>
);
```

### 夜间主题

```tsx
import React from 'react';
import { Button, Message } from 'sun-react-ui';

export default () => (
  <div>
    <Button
      onClick={() =>
        Message.info({ title: 'Dark Theme message', theme: 'dark' })
      }
      type="primary"
    >
      Dark Theme message
    </Button>
  </div>
);
```
