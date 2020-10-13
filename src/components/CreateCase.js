import React, { useState } from 'react';

import DBCTable from '../DBCDesign/components/Table'
import DBCButton, {DBCButtonGroup} from '../DBCDesign/components/Button'
import DBCModal from '../DBCDesign/components/Modal'
import DBCForm from '../DBCDesign/components/Form'

const headers = [
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


const SourceRepresentation = {
  title:"Titel",
  series:"Serie",
  author:"Forfatter",
  pubhouse:"Forlag",
  materialeType:"Materialetype",
  isbn:"ISBN",
  faust:"Faustnr",
  assigned:"Tilknyttede",
  weekcode:"Ugekode",
  status:"Status",
  assignDate:"Tidelt dato",
  pageNumber:"Sideantal",
  editor:"Redaktør",
  reviewer:"Anmelder",
}
function MaterialeSourceRepresentation() {
  return (
    <dl>
      {
        Object.keys(SourceRepresentation).map((key, i) => (
          <React.Fragment>
            <dt key={key}>{SourceRepresentation[key]}</dt>
            <dt key={i}>–</dt>
          </React.Fragment>
        ))
      }
    </dl>
  )
}

function SetDeadline(props) {
  return (
    <div className="set-deadline">
  <PureDBCForm form={[
    {type:"text",label:"Ugekode",placeholder:"UU"},
    {type:"text",label:"Dag",placeholder:"DD"},
    {type:"text",label:"Måned",placeholder:"MM"},
    {type:"text",label:"År",placeholder:"ÅÅÅÅ"},
    {type:"date",label:"Vælg dato"},
  ]} />
  </div>
  )
}

const subjectsList = [
    {value:"181",label:"Voksen > 00-07 > Bibliografi"},
    {value:"182",label:"Voksen > 00-07 > Biblioteks- og arkivvæsen"},
    {value:"183",label:"Voksen > 00-07 > Leksika"},
    {value:"184",label:"Voksen > 00-07 > Museumsvæsen"},
    {value:"185",label:"Voksen > 00-07 > Filosofi"},
]

function AssignCase(props) {
    const [show, setShow] = useState(false);

  if ( ! show) return (
    <DBCButton className="margin-bottom-20" onClick={() => setShow(true)}>Vælg anmelder</DBCButton>
  )
  return (
    <DBCModal title="Anmelder" size="lg" onClose={() => setShow(false)}>
      <PureDBCForm onSelect={props.onSelect} form={[
        {type:"select",label:"Vælg emneområder",placeholder:"Søg eller vælg emneområde",options:subjectsList.map((e) => e.label)},
      ]} />
        <DBCTable headers={headers} onClickRow={(row) => props.onSelect(row)}>{data.slice(0,5)}</DBCTable>

    </DBCModal>
  )
}

const casesContainTypes = ["BKM vurdering","Metakompas","Emneord","Bibliografisk note","Alder","Genre","Niveau / målgruppe"]
function CaseContains(props) {
    return (
         <PureDBCForm onSelect={props.onSelect} form={
            casesContainTypes.map((el, key) => ({
                type:"checkbox",label:el
            }))} />
    )
}


const standardMessageText = [
    "Standard besked #1",
    "Standard besked #2",
    "Standard besked #3",
]
function CaseMessage(props) {
    return (
        <PureDBCForm onSelect={props.onSelect} form={[
            {type:"select",options:standardMessageText,label:"tilføj en standardtest"},
            {type:"textarea",label:"Besked på mail til anmelder"}
        ]}></PureDBCForm>
    )
}

const billingCodes = ["0-99 sider","100-199 sider","200-499 sider","500´+ sider","BKM-vurdering","Note uden anmeldese"]
function BillingCodes(props) {
    return (
        <DBCButtonGroup>
        {
            billingCodes.map((code, key) => (
            <DBCButton key={key} variant={props.selected === code ? "primary" : "secondary"} onClick={() => props.onSelect(code)}>{code}</DBCButton>
            ))
        }
        </DBCButtonGroup>
    )
}

function CreateCase(props) {
    const [newCase, setNewCase] = useState({})
  return (
    <div style={{marginBottom:"500px"}}>
      <h1>Opret sag</h1>
      {
        MaterialeSourceRepresentation()
      }

      <h1>Afleveringsfrist</h1>
      <SetDeadline onSelect={(date) => setNewCase({...newCase, deadline:date})} />

      <h1>Anmelder</h1>
      <AssignCase onSelect={(assignee) => setNewCase({...newCase, assignedTo:assignee})} />

      <h1>Anmeldelsens indhold</h1>
      <CaseContains onSelect={(caseIncludes) => setNewCase({...newCase, caseIncludes:newCase.caseIncludes ? newCase.caseIncludes.includes(caseIncludes) ? newCase.caseIncludes.filter((b) => b !== caseIncludes) : [...newCase.caseIncludes, caseIncludes] : [caseIncludes]})} />

      <h1>Betalingskoder</h1>
      <BillingCodes selected={newCase && newCase.billingCode} onSelect={(billingCode) => setNewCase({...newCase, billingCode})} />

      <h1>Besked</h1>
      <CaseMessage onSelect={(message) => setNewCase({...newCase, message})} />
    </div>
  )
}

export default function StartCreateCase(props) {
  const [show, setShow] = useState(false);
  const [materialeSource, setMaterialeSource] = useState(false);

  if ( ! show) return (
    <DBCButton className="margin-bottom-20" onClick={() => setShow(true)}>Opret sag</DBCButton>
  )

  if (show === "createCase") {
    return <CreateCase materialeSource={materialeSource} />
  }

  if (show === "pickMaterialSource") {
    return (
      <div style={{marginBottom:"500px"}}>
        <h1>Opret sag</h1>
        <p>Du har valgt nummer [{materialeSource}]</p>
        <DBCTable headers={headers} onClickRow={(row) => setShow("createCase")}>{data.slice(0,1)}</DBCTable>
      </div>
    )
  }

  return (
  <DBCModal title="Opret ny sag" onClose={() => setShow(false)}>
    <DBCForm onSubmit={(e) => setShow("pickMaterialSource") || setMaterialeSource(e)} />
  </DBCModal>
  );
}