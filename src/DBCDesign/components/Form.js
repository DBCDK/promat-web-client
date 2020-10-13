import React from 'react'
import Form from 'react-bootstrap/Form'
import DBCButton from './Button'

export function DBCForm(props) {
    return (
        <Form>
            <Form.Group controlId="x">
            {
                props.children.map((child, index) => child.type === "button" ? (
                    <DBCButton variant="primary" onClick={() => props.onSubmit()}>{child.label}</DBCButton>

                ) : child.type === "select" ? (
                    <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                    >
                    {(child.options || []).map((op) => (<option value={op}>{op}</option>))}
                    </Form.Control>
                ) : child.type === "checkbox" ? (
                    <Form.Check type="checkbox" onChange={() => props.onSelect(child.label)} label={child.label} />
                ) : (
                    <div key={index}>
                    <Form.Label>{child.label}</Form.Label>
                    {
                        child.type === "text" && (
                            <Form.Control type={child.type} placeholder={child.placeholder} />
                        )
                    }
                    {
                        child.type === "textarea" && (
                            <Form.Control type={child.type} placeholder={child.placeholder} />
                        )
                    }
                    {
                        child.type === "date" && (
                            <Form.Control type={child.type} placeholder={child.placeholder} />
                        )
                    }
                    </div>
                ))
            }
            </Form.Group>
            {
                props.onSubmit && (
                <DBCButton variant="primary" onClick={() => props.onSubmit()}>
                    Gem
                </DBCButton>
                )
            }
        </Form>
    )
}
DBCForm.propTypes = {
    children: PropTypes.array(PropTypes.shape({type:PropTypes.oneOf(["text","textarea","date","number","email","password"])})), // button label
    submitLabel:PropTypes.string, // submit button label
    onSubmit: PropTypes.func, // onSubmit event -> (e)
};