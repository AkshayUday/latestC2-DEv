import React from 'react';
import SingleFileFolderContainer from '../container/SingleFileFolderContainer';
import { Link, browserHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
const SingleFileUploadHeader = () => { 
    /*let msg = '';
    if(props.parentId){
      msg = 'Please Select Subfolder to Upload Asset';
      <div>{msg}</div>
      SingleFileUploadHeader.propTypes = {
        parentId : React.PropTypes.bool
    }
    }*/
  return (
    <div>
     <p className="pe-uploadfor--text">Uploading to the asset library for :
         <span className="pe-uploadfor--title"> The Humanities: Culture, Continuity and
         Change, Volume II</span></p>
         {/*<button className="pe-btn">Change</button>*/}
          <div className="pe-jobstatus">
          <Link to="CheckJobStatus">Check Job Statuses</Link>
          </div>
          
          <div className="left-wrapper">
             <div className="folderTree">
                <h4>Select upload location</h4>
                <Scrollbars style={{ height: 500 }}>
                    <SingleFileFolderContainer />
                 </Scrollbars>
              </div>
          </div>
	     </div>
		)
}

export default SingleFileUploadHeader;
