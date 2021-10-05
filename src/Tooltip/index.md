## Tooltip

### 默认

```tsx
import React from 'react';
import { Tooltip } from 'sun-react-ui';

export default () => (
  <Tooltip title={<span>tooltip title</span>}>
    <span style={{ margin: '10px' }}>默认 Tooltip</span>
  </Tooltip>
);
```

### 不同触发方式

```tsx
import React from 'react';
import { Tooltip } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>}>
        <span>hover Tooltip</span>
      </Tooltip>
    </div>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>} trigger="click">
        <span>click Tooltip</span>
      </Tooltip>
    </div>
  </>
);
```

### 不同位置

```tsx
import React from 'react';
import { Tooltip } from 'sun-react-ui';

export default () => (
  <>
    <Tooltip title={<span>tooltip title</span>} placement="bottomLeft">
      <span style={{ margin: '10px' }}>bottomLeft</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>}>
      <span style={{ margin: '10px' }}>bottom</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="bottomRight">
      <span style={{ margin: '10px' }}>bottomRight</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="topLeft">
      <span style={{ margin: '10px' }}>topLeft</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="top">
      <span style={{ margin: '10px' }}>top</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="topRight">
      <span style={{ margin: '10px' }}>topRight</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="leftBottom">
      <span style={{ margin: '10px' }}>leftBottom</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="left">
      <span style={{ margin: '10px' }}>left</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="leftTop">
      <span style={{ margin: '10px' }}>leftTop</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="rightBottom">
      <span style={{ margin: '10px' }}>rightBottom</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="right">
      <span style={{ margin: '10px' }}>right</span>
    </Tooltip>
    <Tooltip title={<span>tooltip title</span>} placement="rightTop">
      <span style={{ margin: '10px' }}>right</span>
    </Tooltip>
  </>
);
```

### 延迟消失跟出现

```tsx
import React from 'react';
import { Tooltip } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>} mouseEnterDelay={1000}>
        <span style={{ margin: '10px' }}>延迟出现 Tooltip</span>
      </Tooltip>
    </div>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>} mouseLeaveDelay={1000}>
        <span style={{ margin: '10px' }}>延迟消失 Tooltip</span>
      </Tooltip>
    </div>
  </>
);
```

### 不同主题

```tsx
import React from 'react';
import { Tooltip } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>} theme="dark">
        <span style={{ margin: '10px' }}>深色 Tooltip</span>
      </Tooltip>
    </div>

    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Tooltip title={<span>tooltip title</span>} theme="light">
        <span style={{ margin: '10px' }}>浅色 Tooltip</span>
      </Tooltip>
    </div>
  </>
);
```
