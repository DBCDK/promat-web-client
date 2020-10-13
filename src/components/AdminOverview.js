import React from 'react'
import DBCTable from '../DBCDesign/components/Table'
import DBCButton, {DBCButtonGroup} from '../DBCDesign/components/Button'
import {Link} from "react-router-dom";

const header = [
    {label:"Titel",name:"title"},
    {label:"Detaljer",name:"details"},
    {label:"Anmelder",name:"assignTo"},
    {label:"Faustnr",name:"faustNo"},
    {label:"Tildelt",name:"assignDate"},
    {label:"Frist",name:"deadline"},
    {label:"Ugekode",name:"weekcode"},
    {label:"Status",name:"status"},
  ]
  
  const data = [
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
  ]

function OverviewTable(props) {
    return (
    <div className="promat-container">
        <div className="promat-container-header">
        <h3>{props.label} – {data.length}</h3>

          <DBCButtonGroup>
            <DBCButton>Bøger</DBCButton>
            <DBCButton>Film</DBCButton>
            <DBCButton>Multimedier</DBCButton>
          </DBCButtonGroup>
              
        </div>
        
        <DBCTable header={header} data={data} />
      </div>
    )
}

export default function AdminOverview(props) {
    return (
        <div>
            <h1>Admin overblik</h1>
            <Link to="/create-case"><DBCButton>Start ny sag</DBCButton></Link>
            {["Afventer godkendelse","Afviste anmeldelser","Afventer"].map((key) => (
                <OverviewTable label={key}></OverviewTable>
            ))}
        </div>
    )
}