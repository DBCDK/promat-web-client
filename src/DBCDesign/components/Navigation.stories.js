/* eslint-disable no-unused-vars */
import React from 'react';
import Navigation from './Navigation';
import NavigationReadme from './Navigation.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    readme: {
      sidebar: NavigationReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div>
      <Navigation {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};