/* eslint-disable no-unused-vars */
import React from 'react';
import Button from './Button';
import ButtonReadme from './Button.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    readme: {
      sidebar: ButtonReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div style={{ width: '30%' }}>
      <Button {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: 'Knappen'
};

// export const WithPrefix = Template.bind({});
// WithPrefix.args = {
//   placeholder: 'Input with icon for prefix'
// };