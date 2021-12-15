## Skeleton

### Components

```tsx
/**
 * title: Paragraph
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.Paragraph lines={3} />
  </div>
);
```

```tsx
/**
 * title: title
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.Title />
  </div>
);
```

```tsx
/**
 * title: avatar
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.Avatar style={{ width: 32, height: 32 }} />
  </div>
);
```

```tsx
/**
 * title: Video Cover
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.VideoCover />
  </div>
);
```

```tsx
/**
 * title: Button
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.Button />
  </div>
);
```

```tsx
/**
 * title: Text Box
 */
import React from 'react';
import { Skeleton } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <Skeleton.TextBox />
  </div>
);
```

## API

| Property                | Description                | Type    | Default |
| ----------------------- | -------------------------- | ------- | ------- |
| className               | Customized CSS class       | string  | -       |
| style                   | Customized style of button | boolean | false   |
| Skeleton.TextBox        |                            |         |         |
| Skeleton.Avatar         |                            |         |         |
| Skeleton.VideoCover     |                            |         |         |
| Skeleton.Button         |                            |         |         |
| Skeleton.Paragraph line | count of line to render    | number  | 1       |
