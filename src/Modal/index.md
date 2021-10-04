## Modal

### 受控 modal

```tsx
import React, { useState } from 'react';
import { Button, Modal } from 'sun-react-ui';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <section>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        显示Modal
      </Button>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>显示的内容</div>
      </Modal>
    </section>
  );
};
```

### 标题内容 modal

```tsx
import React, { useState } from 'react';
import { Button, Modal } from 'sun-react-ui';

export default () => {
  const title = <div>这是个标题</div>;
  const [visible, setVisible] = useState(false);
  return (
    <section>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setVisible(true);
        }}
      >
        显示Title-Content-Footer
      </Button>
      <Modal
        title={title}
        visible={visible}
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          console.log('点击了取消');
          setVisible(false);
        }}
        onOk={() => {
          console.log('点击了确认');
          setVisible(false);
        }}
      >
        <div>显示的内容</div>
      </Modal>
    </section>
  );
};
```

### 静态方法打开

```tsx
import React from 'react';
import { Button, Modal } from 'sun-react-ui';

export default () => {
  const title = <div>这是个标题</div>;
  const content = <div>这是内容</div>;
  return (
    <section>
      <Button
        onClick={async () => {
          const ok = await Modal.open({
            title,
            content,
            okText: '确认',
            cancelText: '取消',
          });
          console.log('点击ok', ok);
        }}
      >
        Modal.open 打开
      </Button>
    </section>
  );
};
```
