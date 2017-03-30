import React, { Component, PropTypes } from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import Upload from './uploadInProgress';
import Accordion from '../../../common/components/Accordion';
import AccordionSection from '../../../common/components/AccordionSection';
import ReactTabs from 'react-tabs';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from './checkJobStatus/IconComponent.js';


class uploadInProgress extends Component {

	constructor(props){
	super(props);
    this.displayName = 'uploadInProgress';
	}

  render(){

      const{name,file,error} = this.props;

      let content = '';

      let spanStyle = {
		color: 'red'
		};

      if(error){
      	      return (<div className="pe-status">
              <div className="upload-status">
              <h2>Upload in progress</h2>
              <b>Uploading:</b> {name}
              <div className="pe-jobstatus-link"><span>Check <Link to="/CheckJobStatus">
              Job Status Page</Link> for upload status</span></div>
              <div>
<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;&nbsp;
Error: upload failed.&nbsp;<span><Link to="/">Please try again</Link>.</span></div>
              </div>
            </div>)

       }else{
       	      return (<div className="pe-status">
              <div className="upload-status">
              <h2>Upload in progress</h2>
              <b>Uploading:</b> {name}
              <div className="pe-jobstatus-link"><span>Check <Link to="/CheckJobStatus">
              Job Status Page</Link> for upload status</span></div>
              <div><span className='parentImg'><Image src={'/images/accept.png'}/></span>
              <span>Upload Success</span></div>
              </div>
            </div>)

    }

    }
}

uploadInProgress.propTypes = {
  name: PropTypes.string,
  file: PropTypes.string,
  error: PropTypes.string
}

module.exports =uploadInProgress;
