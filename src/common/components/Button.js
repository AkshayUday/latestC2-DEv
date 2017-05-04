import React from 'react';

class ButtonComponent extends React.Component{

	constructor(props) {
	    super(props);
	    this.displayName = 'Button';
 	}

 	render() {
 		return(
		<div className="buttonComponent">
 			<button onClick={this.props.onClick} 
 			className={this.props.className}
 			type={this.props.buttonType}
 			disabled={this.props.disabled}>
 			{this.props.buttonText}
 			</button>
		</div>
 		)
 	}

}


ButtonComponent.propTypes= {
	buttonText:React.PropTypes.string,
   	className:React.PropTypes.string,
   	onClick: React.PropTypes.func,
   	buttonType:React.PropTypes.string,
   	disabled: React.PropTypes.bool
}


module.exports = ButtonComponent;

