import React from 'react'
import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types';
import DBCButton from './Button';

export default class DBCTable extends React.Component {
    render() {
        return (
            <Table responsive>
            <thead>
                <tr>
                {this.props.header.map((el, index) => (
                    <th key={index}>{el.label}</th>
                ))}
                </tr>
            </thead>
            <tbody>

                {this.props.data.map((el,i) => {
                    return (
                        <tr key={i} onClick={() => this.props.onClickRow(el)}>
                            {this.props.header.reduce((sorted, key, index) => {
                                sorted.push(el[key.name])
                                return sorted
                            },[]).map((e, index) => (
                                <th key={index}>{e}</th>
                            ))}
                        </tr>
                    )
                })}

            </tbody>
            </Table>
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