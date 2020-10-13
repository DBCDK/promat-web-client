/* eslint-disable no-unused-vars */
import React from 'react';
import AdminOverview from './AdminOverview';
// import AppReadme from './App.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'App/Admin/Admin Overblik',
  component: AdminOverview,
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
      <AdminOverview {...args} />
    </div>
  );
};

export const Overblik = Template.bind({});
Overblik.args = {};