/* eslint-disable no-unused-vars */
import React from 'react';
import App from './App';
// import AppReadme from './App.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'App/Admin',
  component: App,
  parameters: {
    readme: {
    //   sidebar: AppReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div>
      <App {...args} />
    </div>
  );
};

export const Forside = Template.bind({});
Forside.args = {};