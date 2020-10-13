import React from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export function DBCButtonGroup(props) {
    return (
    <ButtonGroup aria-label={props.ARIAlabel}>
        {props.children}
    </ButtonGroup>
    )
}
DBCButton.propTypes = {
    children: PropTypes.array.isRequired, // Array with one or more DBCButtons
    ARIAlabel: PropTypes.string // 
};

export default function DBCButton(props) {
    return (
    <Button variant={props.variant || "primary"}
            onClick={props.onClick}>
                {props.children}</Button>
    )
}

DBCButton.propTypes = {
    children: PropTypes.string.isRequired, // button label
    variant: PropTypes.string, // button variant (color) [default: primary]
    onClick: PropTypes.func, // button onClick handler
};