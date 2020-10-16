import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import {Row, Col} from 'react-bootstrap'

export default function DBCTable(props) {
    const [queryTable, setQueryTable] = useState(false)

    const filterData = (child) => props.searchableCol
        ? child[props.searchableCol].toLowerCase().includes(queryTable)
        : false

    const data = queryTable ? props.data.filter(filterData) : props.data
    
    return (
        <Row>
            <Col sm={8}></Col>
            
            {
                props.searchable && (
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Filtrer på anmeldere" onChange={(e) => setQueryTable(e.target.value.toLowerCase())} />
                    </Col>
                )
            }
            
            <Col sm={12}>
            <Table responsive>
            <thead>
                <tr>
                {props.header.map((el, index) => (
                    <th key={index} className="font-bold">{el.label}</th>
                ))}
                </tr>
            </thead>
            <tbody>

            {data.map((el,i) => {
                return (
                    <tr key={i} {...props.rowCheckbox ? ({onClick:(e) => props.onClickRow(e)}) : {}}>
                        {props.header.reduce((sorted, key, index) => {
                            sorted.push(el[key.name])
                            return sorted
                        },[]).map((e, index) => index === 0 && props.rowCheckbox ? (
                            <th key={index}><Form.Check type={props.rowCheckboxAs || "checkbox"} onChange={() => props.onClickRow(e)} label={e} /></th>
                        ) : (
                            <th key={index}>{e}</th>
                        ))}
                    </tr>
                )
            })}

            </tbody>
            </Table>
            </Col>
        </Row>
    )
}
DBCTable.defaultProps = {
    header: [],
    data: []
}
DBCTable.propTypes = {
    header: PropTypes.array, // header array of {} 
    data: PropTypes.array, // data array of []
    searchable: PropTypes.bool, // Is the table searchable? (input will appear in the top right)
    searchableCol: PropTypes.string, // What column in the table should we search?
    onClickRow: PropTypes.func // onClick handler on row click
  };