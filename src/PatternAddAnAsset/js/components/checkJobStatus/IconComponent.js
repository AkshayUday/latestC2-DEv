/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class IconComponent - It is reusable component which will be useful to 
 * render images to web pages 
 * @author Udhayakumar Gururaj
 **/
import React, { Component, PropTypes } from 'react';

class IconComponent extends Component{

/**
* @default render method is used for returning the DOM to the parent page
*/
render(){
	const img = this.props.src;
	return(
			<div>
				<img alt="alt text" src={img}/>
			</div>

		);
}
}

IconComponent.propTypes = {
src : PropTypes.string
}
export default IconComponent;
