import React from 'react';
import Styles from './styles/HyperLink.css';

class HyperLink extends React.Component{

	constructor(props) {
	    super(props);
	    this.displayName = 'HyperLink';
 	}
 	onClick(){debugger

 	}
 	render() {
 		return(
 			<div>
 				<a href="#" className={Styles.hyperStyle} onClick={this.props.onClick}>{this.props.name}</a>
 			</div>
 		)
 	}

};
HyperLink.propTypes= {
    name:React.PropTypes.string,
    onClick: React.PropTypes.func
}
module.exports = HyperLink;
