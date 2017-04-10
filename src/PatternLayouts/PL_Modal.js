import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

const PL_Modal =(props) => {
  
    return (
        <Modal open={props.open} overlayClassName={props.overlayClassName}  modalClassName={props.modalClassName} 
               onClose={props.modalClose} closeOnOverlayClick={false}  modalStyle={{maxWidth:900}} little>
      				{props.children}         
        </Modal>
    );

}
PL_Modal.propTypes = {
  children: React.PropTypes.any,
  open : React.PropTypes.func,
  modalClose: React.PropTypes.func,
  overlayClassName: React.PropTypes.string,
  modalClassName: React.PropTypes.string
}

export default PL_Modal;
