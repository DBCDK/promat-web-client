/* eslint-disable no-unused-vars */
import React from 'react';
import Form from './Form';
import FormReadme from './Form.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    readme: {
      sidebar: FormReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div>
      <Form {...args} />
    </div>
  );
};

export const Eksempel = Template.bind({});
Eksempel.args = {
  elements: [
    {type:"text",label:"Ugekode",placeholder:"UU"},
    {type:"select",label:"Ugekode",placeholder:"UU",options:[
      {value:"1",label:"1"},
      {value:"2",label:"2"},
    ]},
    {type:"text",label:"Måned",placeholder:"MM"},
    {type:"text",label:"År",placeholder:"ÅÅÅÅ"},
  ]
};
export const Tekstfelter = Template.bind({});
Tekstfelter.args = {
  elements: [
    {type:"text",label:"Ugekode",placeholder:"UU"},
    {type:"text",label:"Dag",placeholder:"DD"},
    {type:"text",label:"Måned",placeholder:"MM"},
  ]
};
export const DatoFelter = Template.bind({});
DatoFelter.args = {
  elements: [
    {type:"date",label:"Dato",placeholder:"ÅÅÅÅ"}
  ]
};
export const SelectFelter = Template.bind({});
SelectFelter.args = {
  elements: [
    {type:"select",label:"Ugekode",placeholder:"UU",options:[
      {value:"1",label:"1"},
      {value:"2",label:"2"},
    ]}
  ]
};