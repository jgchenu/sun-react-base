## Switch

### 默认

```tsx
import React from 'react';
import { Switch } from 'sun-react-ui';

export default () => <Switch defaultChecked />;
```

### 禁用

```tsx
import React from 'react';
import { Switch } from 'sun-react-ui';

export default () => <Switch disabled defaultChecked />;
```

### 自定义内容

```tsx
import React from 'react';
import { Switch } from 'sun-react-ui';

export default () => <Switch checkedChildren="on" unCheckedChildren="off" />;
```
