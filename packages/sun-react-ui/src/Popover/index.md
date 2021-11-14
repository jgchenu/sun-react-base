## Popover

### 默认 popover

```tsx
import React from 'react';
import { Popover } from 'sun-react-ui';

export default () => (
  <Popover
    title={<span>Popover title</span>}
    content={<div style={{ padding: '40px' }}>Popover content</div>}
  >
    <span style={{ margin: '10px' }}>默认 Popover</span>
  </Popover>
);
```

### 不同定位的 popover

```tsx
import React from 'react';
import { Popover } from 'sun-react-ui';

export default () => (
  <>
    <Popover
      title={<span>Popover title</span>}
      placement="bottomLeft"
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>bottomLeft</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>bottom</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      placement="bottomRight"
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>bottomRight</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="topLeft"
    >
      <span style={{ margin: '10px' }}>topLeft</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="top"
    >
      <span style={{ margin: '10px' }}>top</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="topRight"
    >
      <span style={{ margin: '10px' }}>topRight</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="leftTop"
    >
      <span style={{ margin: '10px' }}>leftTop</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="left"
    >
      <span style={{ margin: '10px' }}>left</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      content={<div style={{ padding: '40px' }}>Popover content</div>}
      placement="leftBottom"
    >
      <span style={{ margin: '10px' }}>leftBottom</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      placement="rightTop"
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>rightTop</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      placement="right"
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>right</span>
    </Popover>
    <Popover
      title={<span>Popover title</span>}
      placement="rightBottom"
      content={<div style={{ padding: '40px' }}>Popover content</div>}
    >
      <span style={{ margin: '10px' }}>rightBottom</span>
    </Popover>
  </>
);
```

### 不同触发方式 popover

```tsx
import React from 'react';
import { Popover } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        content={<div style={{ padding: '40px' }}>Popover content</div>}
      >
        <span>hover Popover</span>
      </Popover>
    </div>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        content={<div style={{ padding: '40px' }}>Popover content</div>}
        trigger="click"
      >
        <span>click Popover</span>
      </Popover>
    </div>
  </>
);
```

### 延迟出现跟消失的 Popover

```tsx
import React from 'react';
import { Popover } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        mouseEnterDelay={1000}
        content={<div style={{ padding: '40px' }}>Popover content</div>}
      >
        <span style={{ margin: '10px' }}>延迟出现 Popover</span>
      </Popover>
    </div>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        mouseLeaveDelay={1000}
        content={<div style={{ padding: '40px' }}>Popover content</div>}
      >
        <span style={{ margin: '10px' }}>延迟消失 Popover</span>
      </Popover>
    </div>
  </>
);
```

### 不同主题 Popover

```tsx
import React from 'react';
import { Popover } from 'sun-react-ui';

export default () => (
  <>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        theme="dark"
        content={<div style={{ padding: '40px' }}>Popover content</div>}
      >
        <span style={{ margin: '10px' }}>深色 Popover</span>
      </Popover>
    </div>
    <div
      style={{ margin: '20px 60px', width: '200px', display: 'inline-block' }}
    >
      <Popover
        title={<span>Popover title</span>}
        theme="light"
        content={<div style={{ padding: '40px' }}>Popover content</div>}
      >
        <span style={{ margin: '10px' }}>浅色 Popover</span>
      </Popover>
    </div>
  </>
);
```
