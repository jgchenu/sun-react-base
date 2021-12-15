## Tooltip

### different direction

```tsx
/**
 * background: '#252525'
 */
import React from 'react';
import { Tooltip, Button } from 'sun-react-ui';

export default () => (
  <div className="demo-wrap">
    <div className="demo-wrap">
      <Tooltip
        placement="topLeft"
        overlay={
          <div>
            <span>提示文字</span>
            <span>提示</span>
          </div>
        }
      >
        <Button>TL</Button>
      </Tooltip>

      <Tooltip placement="top" offset={11} overlay={<span>提示文字</span>}>
        <Button>Top</Button>
      </Tooltip>

      <Tooltip placement="topRight" overlay={'提示文字很长很长很长很长很长'}>
        <Button>TR</Button>
      </Tooltip>
    </div>

    <div className="demo-wrap">
      <Tooltip placement="leftTop" overlay={<span>提示文字</span>}>
        <Button>LT</Button>
      </Tooltip>

      <Tooltip placement="left" overlay={<span>提示文字</span>}>
        <Button>Left</Button>
      </Tooltip>

      <Tooltip placement="leftBottom" overlay={<span>提示文字</span>}>
        <Button>LB</Button>
      </Tooltip>
    </div>

    <div className="demo-wrap">
      <Tooltip
        placement="rightTop"
        overlay={<span>提示文字很长很长很字很长很长很长很长很长</span>}
      >
        <Button>RT</Button>
      </Tooltip>

      <Tooltip placement="right" overlay={<span>提示文字</span>}>
        <Button>Right</Button>
      </Tooltip>

      <Tooltip placement="rightBottom" overlay={<span>提示文字</span>}>
        <Button>RB</Button>
      </Tooltip>
    </div>

    <div className="demo-wrap">
      <Tooltip
        placement="bottomLeft"
        overlay={<span>提示文字很长很长很长很长很长</span>}
      >
        <Button>BL</Button>
      </Tooltip>

      <Tooltip placement="bottom" overlay={<span>提示文字</span>}>
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip
        placement="bottomRight"
        overlay={<span>提示文字很长很长很长很长很长</span>}
      >
        <Button>BR</Button>
      </Tooltip>
    </div>
  </div>
);
```

### different theme

```tsx
/**
 * background: '#252525'
 */
import React from 'react';
import { Tooltip, Button } from 'sun-react-ui';

export default () => {
  return (
    <div className="demo-wrap">
      <Tooltip
        theme="dark"
        overlay={<span>dark 提示文字很长很长很长很长很长</span>}
      >
        <Button>dark</Button>
      </Tooltip>

      <Tooltip
        theme="light"
        overlay={<span>light 提示文字很长很长很长很长很长</span>}
      >
        <Button>light</Button>
      </Tooltip>
    </div>
  );
};
```

### different trigger

```tsx
/**
 * background: '#252525'
 */
import React from 'react';
import { Tooltip, Button } from 'sun-react-ui';

export default () => {
  return (
    <div className="demo-wrap">
      <Tooltip trigger="click" overlay={<span>click show</span>}>
        <Button>click</Button>
      </Tooltip>

      <Tooltip trigger="hover" overlay={<span>hover show</span>}>
        <Button>hover</Button>
      </Tooltip>
    </div>
  );
};
```

## API

| Property         | Description                       | Type                                                                               | Default |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| theme            | theme of tooltip                  | dark/light                                                                         | dark    |
| overlay          | popup content                     | ReactNode                                                                          | -       |
| arrow            | show or hide arrow                | boolean                                                                            | true    |
| placement        | placement of tooltip              | left/right/top/bottom/topRight/topLeft/rightTop/rightBottom/bottomLeft/bottomRight | bottom  |
| children         | target of tooltip                 | ReactNode                                                                          | -       |
| visible          | show or hide of tooltip overlay   | boolean                                                                            | -       |
| onVisibleChange  | visible change of tooltip overlay | (v: boolean) => void                                                               | -       |
| overlayClassName | className of tooltip overlay      | string                                                                             | -       |
| trigger          | trigger overlay of tooltip        | click/hover/contextmenu                                                            | hover   |
| overlayStyle     | style of tooltip overlay          | React.CssProperties                                                                | -       |
| offset           | offset of tooltip overlay         | number                                                                             | 10      |
| align            | align of tooltip overlay          | Align                                                                              | -       |
| mouseEnterDelay  | show of tooltip overlay delay     | number                                                                             | 0.2     |
| mouseLeaveDelay  | leave of tooltip overlay delay    | number                                                                             | 0.2     |
