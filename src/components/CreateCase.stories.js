/* eslint-disable no-unused-vars */
import React from 'react';
import CreateCase from './CreateCase';
// import AppReadme from './App.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'App/Admin/Opret sag',
  component: CreateCase,
  parameters: {
    readme: {
    //   sidebar: AppReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div style={{ background: '#f1f1f1' }}>
      <CreateCase {...args} />
    </div>
  );
};

export const Overblik = Template.bind({});
Overblik.args = {};