import { configure, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';

// function loadStories() {
//   const req = require.context('../src/', true, /\.stories\.js$/);
//   req.keys().forEach(fname => req(fname));  
// }
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src", true, /\.stories\.js?$/));
}

addDecorator(addReadme);
configure(loadStories, module);
