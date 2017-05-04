import React from 'react';
import HyperLink from '../../../../common/components/HyperLink';
const SavedSearch = (props) => {

let saveSearch = props.enableFromConfig ? <HyperLink onClick={props.onSaveClick} 
													  name='save search'/> : ''
let imgTag;
		if(props.saveSearchFromState){
			imgTag = <img src='./images/accept.png'/>
    			document.getElementById('successIcon').style.display='block';
				setTimeout(function () {
        			document.getElementById('successIcon').style.display='none';
        			props.disableSaveImage(false);
    			}.bind(this), 2000);
    	}
let saveSearchDOM = (
		<div className={props.className}>
		<div id="successIcon">
        	{imgTag}
        </div>
        	{saveSearch}
        </div>
	)
	return (saveSearchDOM);
}
SavedSearch.propTypes = {
	enableFromConfig : React.PropTypes.bool,
	onSaveClick : React.PropTypes.func
}

export default SavedSearch;
