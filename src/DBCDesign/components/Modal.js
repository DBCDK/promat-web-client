import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import DBCButton from './Button'

export default function DBCModal(props) {
    const {onClose} = props
    return (
        <Modal show={true} onHide={onClose} size={props.size || "md"}>
            <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
            <DBCButton variant="secondary" onClick={onClose}>
                Luk
            </DBCButton>
            </Modal.Footer>
        </Modal>
    )
}
Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.array,
    onClose: PropTypes.func,
};