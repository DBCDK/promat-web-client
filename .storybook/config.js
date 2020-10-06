import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => req(fname));  
}

configure(loadStories, module);
