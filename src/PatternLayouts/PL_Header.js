import React from 'react';
import HeaderStyles from './csscomponents/HeaderStyles.css'
const PL_Header = (props) => {
    return(
    		<div className={HeaderStyles.header}>
    			<div className={HeaderStyles.title}>{props.title}</div>
    		</div>
    	)
}

PL_Header.propTypes = {
	title: React.PropTypes.string
}
export default PL_Header;
