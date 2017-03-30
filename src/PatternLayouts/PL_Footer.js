import React from 'react';
import FooterStyles from './csscomponents/FooterStyles.css'
const PL_Footer = (props) => {
	return(	
		<div className={FooterStyles.holder}>
			{props.children}
		</div>
		
		)
}
PL_Footer.propTypes = {
	children: React.PropTypes.any	
}

export default PL_Footer;
