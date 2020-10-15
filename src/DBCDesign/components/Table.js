import React from 'react'
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import {Row, Col} from 'react-bootstrap'

export default class DBCTable extends React.Component {
    render() {
        return (
            <Row>
                <Col sm={8}></Col>
                
                {
                    this.props.searchable && (
                        <Col sm={4}>
                            <Form.Control type="text" placeholder="Filtrer på anmeldere" />
                        </Col>
                    )
                }
                
                <Col sm={12}>
                <Table responsive>
                <thead>
                    <tr>
                    {this.props.header.map((el, index) => (
                        <th key={index} className="font-bold">{el.label}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>

                {this.props.data.map((el,i) => {
                    return (
                        <tr key={i} {...this.props.rowCheckbox ? ({onClick:(e) => this.props.onClickRow(e)}) : {}}>
                            {this.props.header.reduce((sorted, key, index) => {
                                sorted.push(el[key.name])
                                return sorted
                            },[]).map((e, index) => index === 0 && this.props.rowCheckbox ? (
                                <th key={index}><Form.Check type={this.props.rowCheckboxAs || "checkbox"} onChange={() => this.props.onClickRow(e)} label={e} /></th>
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
}
DBCTable.defaultProps = {
    header: [],
    data: []
}
DBCTable.propTypes = {
    header: PropTypes.array, // header array of {} 
    data: PropTypes.array, // data array of []
    onClickRow: PropTypes.func // onClick handler on row click
  };