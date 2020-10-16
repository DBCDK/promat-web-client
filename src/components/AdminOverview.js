import React, { useState } from 'react'
import DBCTable from '../DBCDesign/components/Table'
import DBCButton, {DBCButtonGroup} from '../DBCDesign/components/Button'
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from "react-router-dom";
import PromatProvider from './PromatProvider';

import {CaseStatus} from '../@promat/shared/types/case'
import { MediaType } from "../@promat/shared/types/general";
import {mediaTypeLabels} from '../labels'

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

function StatusBadge(status) {
  
  const TagWrap = (label, style) => (<div className="table-status-tag" style={style}>{label}</div>)
  switch (status) {
    case "PUBLISHED":
      return TagWrap(status, {backgroundColor:"green",color:"white"})
    case "REQUESTED":
    case "AWAITING_APPROVAL":
      return TagWrap(status, {backgroundColor:"#FFC107",color:"white"})
    default:
      return TagWrap(status, {backgroundColor:"red",color:"white"})
  }

  const tagStyle = {backgroundColor:"green",color:"white"}
  console.log(status)
  return TagWrap(status)
}

function OverviewTable(props) {

    const [filter, setFilter] = useState(false)
    const filterType = (child) => child.mediaType === filter
    const data = props.children ? filter ? props.children.filter(filterType) : props.children : []

    return (
      <div className="promat-container">
      <Row noGutters={true}>
        <Col sm={8} className="promat-container-header">
        <h3>{props.label} – {data.length}</h3>
        </Col>
        <Col sm={4} className="align-right">
        <DBCButtonGroup>
          {
            [ // add mediatypes as filters here
              MediaType.BOOK,
              MediaType.MOVIE,
              MediaType.MULTIMEDIA
            ].map((mediaType,i) => {
              if (filter && filter === mediaType) {
                return (
                  <DBCButton key={i} onClick={() => setFilter(false)}>{mediaTypeLabels[mediaType]}</DBCButton>
                )
              }
              else {
                return (
                  <DBCButton variant="secondary" key={i} onClick={() => setFilter(mediaType)}>{mediaTypeLabels[mediaType]}</DBCButton>
                  )
              }
            })
          }
          
        </DBCButtonGroup>
        </Col>
        <Col className="margin-top-20">
        
        <DBCTable header={header} data={data.map((c) => ({
          ...c,
          faustNo:c.id,
          status: StatusBadge(c.status)
        }))} />
        
        </Col>
      </Row>
    </div>
    )
}

function CasesOverview(props) {
  const sortedCases = props.cases.reduce((sorted, theCase) => {
    if (sorted.has(theCase.status)) {
      sorted.set(theCase.status, [...sorted.get(theCase.status), theCase])
    }
    else {
      sorted.set(theCase.status, [theCase])
    }
    return sorted
  }, new Map())

  return Object.keys(CaseStatus).map((status) => (
  <OverviewTable label={status}>{sortedCases.get(status)}</OverviewTable>
  ))
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
            <PromatProvider resource="cases" loading={() => (<div>Skaber overblik...</div>)}>
              <CasesOverview />
            </PromatProvider>
          </Col>
        </Row>
      </Container>
  )
}