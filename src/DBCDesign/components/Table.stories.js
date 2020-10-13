/* eslint-disable no-unused-vars */
import React from 'react';
import Table from './Table';
import TableReadme from './Table.readme.md';
import 'bootstrap/dist/css/bootstrap.css'


export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    readme: {
      sidebar: TableReadme
    },
    options: {}
  }
};

const Template = (args) => {
  return (
    <div>
      <Table {...args} />
    </div>
  );
};

export const Tom = Template.bind({});
Tom.args = {};

export const MedHeader = Template.bind({});
MedHeader.args = {
    header: [
        {label:"Titel",name:"title"},
        {label:"Detaljer",name:"details"},
        {label:"Anmelder",name:"assignTo"},
        {label:"Faustnr",name:"faustNo"},
        {label:"Tildelt",name:"assignDate"},
        {label:"Frist",name:"deadline"},
        {label:"Ugekode",name:"weekcode"},
        {label:"Status",name:"status"},
      ]
};

export const MedHeaderOgData = Template.bind({});
MedHeaderOgData.args = {
    header: [
        {label:"Titel",name:"title"},
        {label:"Detaljer",name:"details"},
        {label:"Anmelder",name:"assignTo"},
        {label:"Faustnr",name:"faustNo"},
        {label:"Tildelt",name:"assignDate"},
        {label:"Frist",name:"deadline"},
        {label:"Ugekode",name:"weekcode"},
        {label:"Status",name:"status"},
      ],
      data: [
        {
            title:"Doktor kold og eventyrspejlet",
            details:"Hestevej 22",
            assignTo:"Julie Arndrup",
            faustNo:"54330022",
            assignDate:"03-08-2020",
            deadline:"17-08-2020",
            weekcode:"LEK202040",
            status:"Overskredet frist",
          },
          {
            title:"Doktor kold og eventyrspejlet",
            details:"Hestevej 22",
            assignTo:"Julie Arndrup",
            faustNo:"54330022",
            assignDate:"03-08-2020",
            deadline:"17-08-2020",
            weekcode:"LEK202040",
            status:"Overskredet frist",
          },
          {
            title:"Doktor kold og eventyrspejlet",
            details:"Hestevej 22",
            assignTo:"Julie Arndrup",
            faustNo:"54330022",
            assignDate:"03-08-2020",
            deadline:"17-08-2020",
            weekcode:"LEK202040",
            status:"Overskredet frist",
          }
      ]
};