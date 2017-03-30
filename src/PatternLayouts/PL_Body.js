import React,{Component} from 'react';
import BodyStyles from './csscomponents/BodyStyles.css'
const PL_Body = (props) => { 
	return(
		<div className={BodyStyles.bodysection}>
			{props.children}	
		</div>
		)

}

PL_Body.propTypes = {
	children: React.PropTypes.any
}
export default PL_Body;
