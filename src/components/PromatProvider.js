import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
const resources = {
    cases:`http://localhost:3001/cases`,
    reviewers:`http://localhost:3001/reviewers`,
}

import {CaseStatus} from '../@promat/shared/types/case'
import {MediaType} from '../@promat/shared/types/general'
  

export default class PromatProvider extends React.Component {
    constructor() {
        super()
        this.fetch = async () => {
            const {resource} = this.props
            const rsp = await fetch(resources[resource])
            const data = await rsp.json()
            this.setState({[this.props.resource]:data.data})
        }
    }
    componentDidMount() {
        if (this.props.resource) {
            this.fetch()
        }
    }
    render() {
        if (this.state && this.state[this.props.resource]) {
            // merge mock status
            const mockStatus = this.state[this.props.resource].map((d) => ({...d, mediaType:Object.keys(MediaType)[Math.floor(Math.random() * 4)], status:Object.keys(CaseStatus)[Math.floor(Math.random() * 11)]}))
            
            const mergedProps = {...this.props, [this.props.resource]:mockStatus}
            return React.cloneElement(this.props.children, mergedProps)
        }
        return (
            <div>
            <Spinner animation="border" role="status">
            <span className="sr-only">Henter...</span>
            </Spinner>
            {this.props.loading && this.props.loading()}
            </div>
        )
    }
}