import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import DBCTable from '../DBCDesign/components/Table'
import DBCButton, {DBCButtonGroup} from '../DBCDesign/components/Button'
import DBCModal from '../DBCDesign/components/Modal'
import DBCForm from '../DBCDesign/components/Form'
import {Container, Row, Col} from 'react-bootstrap'

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
    <div className="set-deadline column-count-4">
      <DBCForm elements={[
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
    <DBCModal title="Anmelder" size="xl" onClose={() => setShow(false)}>
      <SelectReviewer />
    </DBCModal>
  )
}

const casesContainTypes = ["BKM vurdering","Metakompas","Emneord","Bibliografisk note","Alder","Genre","Niveau / målgruppe"]
function CaseContains(props) {
    return (
         <DBCForm onSelect={props.onSelect} elements={
            casesContainTypes.map((el, key) => ({
                type:"checkbox",label:el
            }))} />
    )
}


const standardMessageText = [
    "Standard besked #1",
    "Standard besked #2 xx",
    "Standard besked #3",
]
function CaseMessage(props) {
    return (
        <DBCForm onSelect={props.onSelect} elements={[
            {type:"select",options:standardMessageText,label:"tilføj en standardtest"},
            {type:"textarea",label:"Besked på mail til anmelder"}
        ]}></DBCForm>
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

// function CreateCase(props) {
//     const [newCase, setNewCase] = useState({})
//   return (
//     <div style={{marginBottom:"500px"}}>
//       <h1>Opret sag</h1>
//       {
//         MaterialeSourceRepresentation()
//       }

//       <h1>Afleveringsfrist</h1>
//       <SetDeadline onSelect={(date) => setNewCase({...newCase, deadline:date})} />

//       <h1>Anmelder</h1>
//       <AssignCase onSelect={(assignee) => setNewCase({...newCase, assignedTo:assignee})} />

//       <h1>Anmeldelsens indhold</h1>
//       <CaseContains onSelect={(caseIncludes) => setNewCase({...newCase, caseIncludes:newCase.caseIncludes ? newCase.caseIncludes.includes(caseIncludes) ? newCase.caseIncludes.filter((b) => b !== caseIncludes) : [...newCase.caseIncludes, caseIncludes] : [caseIncludes]})} />

//       <h1>Betalingskoder</h1>
//       <BillingCodes selected={newCase && newCase.billingCode} onSelect={(billingCode) => setNewCase({...newCase, billingCode})} />

//       <h1>Besked</h1>
//       <CaseMessage onSelect={(message) => setNewCase({...newCase, message})} />
//     </div>
//   )
// }
// export function xStartCreateCase(props) {
//   const [show, setShow] = useState(true);
//   const [materialeSource, setMaterialeSource] = useState(false);

//   if (show === "createCase") {
//     return <CreateCase materialeSource={materialeSource} />
//   }

//   if (show === "pickMaterialSource") {
//     return (
//       <div style={{marginBottom:"500px"}}>
//         <h1>Opret sag</h1>
//         <p>Du har valgt nummer [{materialeSource}]</p>
//         <DBCTable headers={headers} onClickRow={(row) => setShow("createCase")}>{data.slice(0,1)}</DBCTable>
//       </div>
//     )
//   }

//   return (
//     <Container>
//       <Row>
//         <Col sm={8}>
//           <h1>Opret sag</h1>
//         </Col>
//         <Col sm={4} className="align-right"><Link to="/create-case"><DBCButton>Opret sag</DBCButton></Link></Col>
//         <Col>
        
//         {/* {["Afventer godkendelse","Afviste anmeldelser","Afventer"].map((key) => (
//             <OverviewTable label={key}></OverviewTable>
//         ))} */}
        
//         </Col>
//       </Row>
//     </Container>
//   )

//   return (
//   <DBCModal title="Opret ny sag" onClose={() => setShow(false)}>
//     <DBCForm onSubmit={(e) => setShow("pickMaterialSource") || setMaterialeSource(e)} />
//   </DBCModal>
//   );
// }


function SearchOpenSearch(query) {
  return new Promise((resolve,reject) => {
    const url = "https://cors-anywhere.herokuapp.com/https://oss-services.dbc.dk/opensearch/5.2/?action=getObject&identifier=870970-basis:28692765&agency=100200&profile=test&outputType=json"

    //https://oss-services.dbc.dk/opensearch/5.2/?action=getObject&identifier=870970-basis:28692765&agency=100200&profile=test
    fetch(url).then((rsp) => rsp.json()).then((str) => {
      console.log(str)
      const res = str.searchResponse.result.searchResult
      resolve(res.map((result) => result.collection.object[0].record).reduce((res, entry) => {
          res = Object.keys(entry).reduce((sorted, key) => {
          sorted = Object.assign({}, sorted, ({[key]:Array.isArray(entry[key]) ? entry[key].map((k) => k["$"])[0] : entry[key]}))
          return sorted
          }, {})
      })
      )
  })
})}

function MaterialMetadata(props) {
  const metafields = [
    {
      label:"Titel",
      name:"title",
      value:"Dokter Kold og eventyr"
    },
    {
      label:"Serie",
      name:"series",
      value:"–"
    },
    {
      label:"Forfatter",
      name:"author",
      value:"–"
    },
    {
      label:"Forlag",
      name:"publisher",
      value:"–"
    },
    {
      label:"Materialetype",
      name:"materialType",
      value:"–"
    },
    {
      label:"ISBN",
      name:"isbn",
      value:"–"
    },
    {
      label:"Faustnr",
      name:"faust",
      value:"–"
    },
    {
      label:"Ugekode",
      name:"weekcode",
      value:"–"
    },
    {
      label:"Status",
      name:"status",
      value:"–"
    },
    {
      label:"Tildelt dato",
      name:"assignedDate",
      value:"–"
    },
    {
      label:"Sideantal",
      name:"pageCount",
      value:"–"
    },
    {
      label:"Redaktør",
      name:"editor",
      value:"–"
    },
    {
      label:"Anmelder",
      name:"reviewer",
      value:"–"
    }
  ]
  return (
    <dl className="row padding-20">
      {
        metafields.map((field,i) => (
          <>
            <dt className="col-sm-3">{field.label}</dt>
            <dd className="col-sm-3">{field.value}</dd>
          </>
        ))
      }
    </dl>
  )
}

function SelectReviewer(props) {
  return (
    
    <Container>
      <Row>
        
        <Col sm={12}>
          <h1>Anmelder</h1>
        </Col>

        <Col sm={6}>
          <p>Vælg område</p>
          <DBCButtonGroup>
            <DBCButton>Voksen</DBCButton>
            <DBCButton>Børn / skole</DBCButton>
            <DBCButton>Voksen og børn</DBCButton>
          </DBCButtonGroup>
        </Col>

        <Col sm={6}>
          <DBCForm elements={[
            {type:"select", label:"Emne", placeholder:"Søg eller vælg emne", options:[
              {value:"a",label:"a"},
              {value:"b",label:"b"},
              {value:"c",label:"c"},
            ]}
          ]}></DBCForm>
        </Col>

        <Col sm={12}>
          <div className="create-case-reviewer-query bg-light-grey padding-20">
            {
              [
                {label:"Voksen > 00-07 > 01 Bibliografi",value:"00-07-01"}
              ].map((el,i) => (
              <DBCButton>{el.label} &times;</DBCButton>
              ))
            }
          </div>
        </Col>

        <Col sm={12}>
          <DBCForm className="inline-form-elements" elements={[
            {type:"checkbox",name:"modtager-expres",label:"Modtager expres"},
            {type:"checkbox",name:"modtager-ebooks",label:"Modtager ebøger"},
            {type:"checkbox",name:"modtager-bkm",label:"Modtager BKM"},
            {type:"checkbox",name:"show-ferie",label:"Vis anmeldere på ferie"},
            {type:"checkbox",name:"show-exceeded-quote",label:"Vis anmeldere med max kvote"},
          ]}></DBCForm>
        </Col>

        <Col sm={12}>
          <DBCTable searchable={true} rowCheckbox={true} rowCheckboxAs={"radio"} onClickRow={(row) => console.log(row)} header={[
            {name:"reviewer",label:"Anmelder"},
            {name:"quote",label:"Kvote"},
            {name:"ebooks",label:"Ebøger"},
            {name:"express",label:"Ekspres"},
            {name:"bkm",label:"BKM"},
            {name:"notes",label:"Noter"},
            {name:"profile",label:"Se profil"},
          ]} data={[
            {
              reviewer:"Agger, Maybrit",
              quote:"1 bog mere",
              ebooks:"",
              express:"",
              bkm:"Ja",
              notes:"Ikke fra Gyldendal"
            },
            {
              reviewer:"Agger, Maybrit",
              quote:"1 bog mere",
              ebooks:"",
              express:"",
              bkm:"Ja",
              notes:"Ikke fra Gyldendal"
            },
            {
              reviewer:"Agger, Maybrit",
              quote:"1 bog mere",
              ebooks:"",
              express:"",
              bkm:"Ja",
              notes:"Ikke fra Gyldendal"
            }
          ]} />
        </Col>

        <Col>
          <DBCButton>Vælg anmelder</DBCButton>
        </Col>
      
      </Row>
    </Container>
  )
}

function CreateCaseWithMaterial(props) {
  return (
    <Container>
    <Row>
      
      <Col sm={12}>
        <h1>Opret sag – Anmelder og afregning</h1>
      </Col>
      
      
      <Col sm={12} className="bg-light-grey">
        <MaterialMetadata />
      </Col>

      <Col sm={12} className="padding-20">
        <h2>Afleveringsfrist</h2>
        <SetDeadline />
      </Col>

      <Col sm={12} className="bg-light-grey padding-20">
        <h2>Anmelder</h2>
        <AssignCase />
      </Col>


      <Col sm={12} className="padding-20">
        <h2>Anmeldelsens indhold</h2>
        <CaseContains />
      </Col>

      <Col sm={12} className="bg-light-grey padding-20">
        <h2>Betalingskoder</h2>
        <BillingCodes />
      </Col>

      <Col sm={12} className="padding-20">
        <h2>Besked</h2>
        <CaseMessage />
      </Col>

      <Col sm={12}>
        <DBCButton>Opret sag</DBCButton>
      </Col>
     
    
    </Row>
  </Container>
  )
}

export default function StartCreateCase(props) {
  
  const [query, setQuery] = useState(false);
  const [results, setResults] = useState(false);
  const [materialeSource, setMaterialeSource] = useState(false);

  if (props.identifier) {
    if (props.show === "reviewer") {
      return (
        <SelectReviewer {...props} />
      )
    }
    return <CreateCaseWithMaterial {...props} />
  }

  return (
    <Container>
      <Row>
        
        <Col sm={6}>
          <h1>Opret sag – Valg af post</h1>
            <DBCForm elements={[
              {type:"text",name:"identifier",label:"Faustnr. / ISBN / Stregkode"}
            ]} submitLabel={"Søg efter materiale"} onSubmit={(formData) => {
              const queryId = formData && formData.identifier
              SearchOpenSearch(queryId).then((rsp) => setResults(rsp))
            }}></DBCForm>
        </Col>
        
        <Col sm={6} className="align-right">
          <DBCForm elements={[
              {type:"text", name:"author",label:"Forfatter", placeholder:"Hovedforfatter eller medforfattere"}, 
              {type:"text", name:"title", label:"Titel", placeholder:"Hele titlen eller dele af den"}
            ]} onSubmit={(formData) => {}}></DBCForm>
        </Col>

        {
          results && (
            <Col>

            <DBCTable rowCheckbox={true} onClickRow={(row) => setMaterialeSource(row)} header={[
              {label:"Titel",name:"title"},
              {label:"Forfatter",name:"author"},
              {label:"Faustnr",name:"faust"},
              {label:"Materialetype",name:"materialType"},
              {label:"Status",name:"status"},
            ]} data={[
              {
                title:"test",
                author:"Ditlev",
                faust:"12912929",
                materialType:"BOG",
                status:"Mangler"
              }
            ]}></DBCTable>

            <p>Vælg de poster, som skal indgå i sagen</p>
            
            <Link to={"/create-case/"+"28692765"}><DBCButton>Start oprettelse af sag</DBCButton></Link>
            
            </Col>
          )
        }
        
       
      
      </Row>
    </Container>
  )

  return (
  <DBCModal title="Opret ny sag" onClose={() => setShow(false)}>
    <DBCForm onSubmit={(e) => setShow("pickMaterialSource") || setMaterialeSource(e)} />
  </DBCModal>
  );
}