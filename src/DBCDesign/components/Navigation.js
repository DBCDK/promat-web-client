import React from 'react'
import PropTypes from 'prop-types'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";

const Navigation = ({sitename,siteroot,...props}) => (
<Navbar bg="dark" variant="dark">
<Navbar.Brand><Link to={siteroot}>{sitename}</Link></Navbar.Brand>
    <Nav className="mr-auto">
    {
        props.children.filter((c) => c.to !== "/").map((c,i) => (
            <Nav.Link key={i}><Link to={c.to}>{c.label}</Link></Nav.Link>
        ))
    }
    </Nav>
    {
        props.search && (
            <Form inline onSubmit={() => props.onSearch}>
            <FormControl type="text" placeholder="Søg her..." className="mr-sm-2" />
            <Button variant="outline-info">Søg</Button>
            </Form>
        )
    }
    
</Navbar>
)

Navigation.defaultProps = {
    sitename:"Promat",
    siteroot:"/",
    children: []
}
Navigation.propTypes = {
    sitename: PropTypes.string, // name of the site
    siteroot: PropTypes.string, // url to root [default: "/"]
    search: PropTypes.bool, // show or hide search
    onSearch: PropTypes.func, // callback function receives ({query:string})
    children: PropTypes.array, // button onClick handler
}
export default Navigation