import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import DBCButton from './Button'

// function canRenderElement(element) {
//     if ( ! element || element && ! element.type) return null
//     return ["text","select","checkbox",""]
// }

export default function DBCForm(props) {

    const [state, setState] = useState({})
    
    const mapFormContent = (child, i) => {
        const wrapChild = (childComp) => (
            <div key={i}>
                <Form.Label>{child.label}</Form.Label>
                {childComp}
            </div>
        )
        switch (child.type) {
            case "select": return wrapChild(
                <Form.Control
                    as={child.type}
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    onChange={props.onChange}
                    custom>
                    {
                        child.options
                        ? child.options.map((op) => (<option key={op.value} value={op.value}>{op.label}</option>))
                        : []
                    }
                </Form.Control>
            )
            case "checkbox": return (
                <Form.Check type={child.type} onChange={() => props.onSelect(child)} label={child.label} />
            )
            case "textarea": return wrapChild(
                <Form.Control as="textarea" placeholder={child.placeholder} onChange={(e) => setState({
                    ...state,
                    [child.name]: e.target.value,
                })}></Form.Control>
            )
            default: return wrapChild(<Form.Control type={child.type} placeholder={child.placeholder} onChange={(e) => setState({
                ...state,
                [child.name]: e.target.value,
            })} />)
        }
    }
    return (
        <Form className={props.className} onSubmit={(e) => e.preventDefault() || props.onSubmit(state)}>
            <Form.Group controlId="x">
            {
                props.elements.map(mapFormContent)
            }
            {
                Object.keys(state).length > 0 && props.onSubmit && (
                <DBCButton variant="primary" type="submit" onClick={(e) => e.preventDefault() || props.onSubmit(state)}>
                    {props.submitLabel}
                </DBCButton>
                )
            }
            </Form.Group>

        </Form>
    )
}
DBCForm.defaultProps = {
    className:"",
    elements: [],
    submitLabel: "Gem",
}
DBCForm.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({type:PropTypes.oneOf(["text","textarea","date","number","email","password"])})), // button label
    submitLabel:PropTypes.string, // submit button label
    onSubmit: PropTypes.func, // onSubmit event -> (e)
};