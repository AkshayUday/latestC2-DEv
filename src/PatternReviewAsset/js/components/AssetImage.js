import React from 'react';
import Image from './Image';
const AssetImage = (props) => { 

	return(<div className="pe-input pe-input--horizontal">
            <Image name={props.url} alt="Smiley face" height="300" width="300"/>
                </div>)
}

AssetImage.propTypes = {
	url:React.PropTypes.string
}

export default AssetImage;
