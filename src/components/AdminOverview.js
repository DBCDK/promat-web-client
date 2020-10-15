import React from 'react'
import DBCTable from '../DBCDesign/components/Table'
import DBCButton, {DBCButtonGroup} from '../DBCDesign/components/Button'
import {Container, Row, Col} from 'react-bootstrap'
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
      <Row noGutters={true}>
        <Col sm={8} className="promat-container-header">
          <h3>{props.label}</h3>
        </Col>
        <Col sm={4} className="align-right">
        <DBCButtonGroup>
          <DBCButton>Bøger</DBCButton>
          <DBCButton>Film</DBCButton>
          <DBCButton>Multimedier</DBCButton>
        </DBCButtonGroup>
        </Col>
        <Col className="margin-top-20">
        
        <DBCTable header={header} data={data} />
        
        </Col>
      </Row>
    </div>
    )
}

export default function AdminOverview(props) {
  return (
      <Container>
        <Row>
          <Col sm={8}>
            <h1>Forside</h1>
          </Col>
          <Col sm={4} className="align-right"><Link to="/create-case"><DBCButton>Opret sag</DBCButton></Link></Col>
          <Col>
          
          {["Afventer godkendelse","Afviste anmeldelser","Afventer"].map((key) => (
              <OverviewTable label={key}></OverviewTable>
          ))}
          
          </Col>
        </Row>
      </Container>
  )
}