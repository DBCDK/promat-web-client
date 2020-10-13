import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import DBCButton from './Button'

// function canRenderElement(element) {
//     if ( ! element || element && ! element.type) return null
//     return ["text","select","checkbox",""]
// }

export default function DBCForm(props) {
    return (
        <Form>
            <Form.Group controlId="x">
            {
                props.elements && props.elements.filter(Boolean).map((child, index) => child.type === "button" ? (
                    <DBCButton variant="primary" onClick={() => props.onSubmit()}>{child.label}</DBCButton>

                ) : child.type === "select" ? (
                    <div key={index}>
                    <Form.Label>{child.label}</Form.Label>
                    <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                    >
                        {
                            child.options
                            ? child.options.map((op) => (<option key={op.value} value={op.value}>{op.label}</option>))
                            : []
                        }
                    </Form.Control>
                    </div>
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
                    {props.submitLabel}
                </DBCButton>
                )
            }
        </Form>
    )
}
DBCForm.defaultProps = {
    elements: [],
    submitLabel: "Gem",
}
DBCForm.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({type:PropTypes.oneOf(["text","textarea","date","number","email","password"])})), // button label
    submitLabel:PropTypes.string, // submit button label
    onSubmit: PropTypes.func, // onSubmit event -> (e)
};