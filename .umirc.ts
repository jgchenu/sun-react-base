import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'sun-react-ui',
  favicon:
    'https://api2.mubu.com/v3/document_image/d3984d6e-47db-46ab-b7f6-4773b2e48d0f-2898889.jpg',
  logo: 'https://api2.mubu.com/v3/document_image/d3984d6e-47db-46ab-b7f6-4773b2e48d0f-2898889.jpg',
  outputPath: 'docs-dist',
  resolve: {
    includes: ['docs', 'packages/sun-react-ui/src', 'packages/sun-react-icons'],
  },
  // more config: https://d.umijs.org/config
});
