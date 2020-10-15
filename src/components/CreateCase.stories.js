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
    <div>
      <CreateCase {...args} />
    </div>
  );
};

export const ValgAfPost = Template.bind({});
ValgAfPost.args = {};

export const AnmelderOgAfregning = Template.bind({});
AnmelderOgAfregning.args = {
  identifier:"1234"
};

export const FindAnmelder = Template.bind({});
FindAnmelder.args = {
  identifier:"1234",
  show:"reviewer"
};