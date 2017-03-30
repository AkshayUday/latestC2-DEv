
import React from 'react';
import CollapseFolderStyle from './styles/CollapseFolderStyles.css'
const collapseBrowseFolder = (props) => {

	let setClassName = !props.collapse ? 'fa fa-angle-right' : 'fa fa-angle-left';
                     
    return(
    		<div className={CollapseFolderStyle.slider}>
              	<button onClick={props.toggle} className={CollapseFolderStyle.peBtn+' '+CollapseFolderStyle.peBtnMedium}>
                <i className={setClassName} aria-hidden='true'></i>
                </button>
            </div>
    	)

}

collapseBrowseFolder.propTypes = {
	collapse : React.PropTypes.bool,
	toggle : React.PropTypes.func
}

export default collapseBrowseFolder;
