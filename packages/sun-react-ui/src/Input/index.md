## Input

### 默认输入框

```tsx
import { Input } from 'sun-react-ui';
import React from 'react';

export default () => (
  <Input
    style={{ width: 200 }}
    placeholder="placeholder"
    onChange={console.log}
  />
);
```

### 受控输入框

```tsx
import { Input } from 'sun-react-ui';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
```

### 禁用输入框

```tsx
import { Input } from 'sun-react-ui';
import React from 'react';

export default () => (
  <Input style={{ width: 300 }} placeholder="disabled input" disabled />
);
```

### 图标输入框

```tsx
import { Input } from 'sun-react-ui';
import { Search } from 'sun-react-icons';

import React from 'react';

export default () => (
  <Input
    style={{ width: 300 }}
    placeholder="input with icon"
    icon={<Search />}
  />
);
```

### 前缀跟后缀输入框

```tsx
import { Input } from 'sun-react-ui';

import React from 'react';

export default () => (
  <div>
    <Input
      style={{ width: 300 }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input style={{ width: '300px' }} defaultValue="google" append=".com" />
  </div>
);
```

### 不同大小的输入框

```tsx
import { Input } from 'sun-react-ui';

import React from 'react';

export default () => (
  <div>
    <Input style={{ width: 300 }} defaultValue="large size" size="large" />
    <Input style={{ width: 300 }} placeholder="small size" size="small" />
  </div>
);
```
