import React, {Component} from 'react';
const PL_RightPanel = (props) =>{
		return(<div>
					{props.children}
				</div>
			)
}

PL_RightPanel.propTypes = {
	children: React.PropTypes.element
}
export default PL_RightPanel;
