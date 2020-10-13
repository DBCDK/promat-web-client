import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";

export default function Navigation({sitename,siteroot, children, ...props}) {
return (
<Navbar bg="dark" variant="dark">
<Navbar.Brand><Link to={siteroot || "/"}>{sitename || Promate}</Link></Navbar.Brand>
    <Nav className="mr-auto">
    {
        children.filter((c) => c.to !== "/").map((c,i) => (
        <Nav.Link key={i}><Link to={c.to}>{c.label}</Link></Nav.Link>
        ))
    }
    </Nav>
    <Form inline>
    <FormControl type="text" placeholder="Søg her..." className="mr-sm-2" />
    <Button variant="outline-info">Søg</Button>
    </Form>
</Navbar>
)
}
Navigation.propTypes = {
    sitename: PropTypes.string, // name of the site
    siteroot: PropTypes.string, // url to root [default: "/"]
    children: PropTypes.array, // button onClick handler
};