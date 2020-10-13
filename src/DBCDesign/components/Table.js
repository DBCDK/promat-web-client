import React from 'react'
import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types';

export default class DBCTable extends React.Component {
    render() {
        return (
            <Table responsive>
            <thead>
                <tr>
                {this.props.headers.map((el, index) => (
                    <th key={index}>{el.label}</th>
                ))}
                </tr>
            </thead>
            <tbody>

                {this.props.children.map((el,i) => {
                    return (
                        <tr key={i} onClick={() => this.props.onClickRow(el)}>
                            {this.props.headers.reduce((sorted, key, index) => {
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

DBCTable.propTypes = {
    header: PropTypes.array,
    data: PropTypes.array,
    onClickRow: PropTypes.func
  };