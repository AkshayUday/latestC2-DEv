import React,{Component} from 'react';
import layouts from './csscomponents/layoutStyles.css'
import PL_Modal from './PL_Modal'
import PL_Header from './PL_Header'
import PL_Body from './PL_Body'
import PL_Footer from './PL_Footer';
import Spinner from '../common/components/spinner/Spinner';

const PL_Layout = (props) => { 
		let layout =(
			<PL_Modal modalClassName={props.modalClass} open={props.open}
				modalClose={props.modalClose}>
				<PL_Header title={props.modalTitle}/>
			    <Spinner>
				<PL_Body>
					{props.children}
				</PL_Body>
				</Spinner>
			</PL_Modal>
			)

		return(layout)
}

PL_Layout.propTypes = {
	children: React.PropTypes.any
}
export default PL_Layout;
