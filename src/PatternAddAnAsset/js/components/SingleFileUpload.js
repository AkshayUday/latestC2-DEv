import React, { Component, PropTypes } from 'react';
import ReactTabs from 'react-tabs';
import { reduxForm } from 'redux-form'
export const fields = ['name']
import Accordion from '../../../common/components/Accordion';
import AccordionSection from '../../../common/components/AccordionSection';
import Label from'../../../common/components/Label';
import TextBox from '../../../common/components/TextBox';
import ChooseFile from '../../../common/components/FileProcessor';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PE_tooltip from '../../../common/components/pe-tooltip';
import FolderTree from '../container/TreePaneContainer';
import SingleFileFolderContainer from '../container/SingleFileFolderContainer';
import PL_Scroll from '../../../common/components/PL_ScrollBar';
import BrowseAsset from './Styles/BrowseStyles.css';
//import Scroll from 'react-scrollbar';
import PL_SiteDetail from '../../../common/components/PL_SiteDetail';
//import PL_ScrollBarStyes from '../../../common/components/styles/PL_ScrollBarStyes.css';
import ButtonComponent from '../../../common/components/Button';
import {injectIntl, intlShape} from 'react-intl';

import {messages} from './SingleFileUploadDefaultMessages';
// import LeftWrapper from './SingleFileUploadHeader'
import {validateuploadForm}  from './Validate';

import Styles from './singlefileupload.css';

class SingleFileUpload extends Component {

  constructor(props) {
    super(props);
    this.state={
      file : '',
      fileName : '',
      errDisplay : '',
      enable: 'true'
    }
    this.onSave = this.onSave.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.componentWillMount = this.props.componentWillMount.bind(this);
    this.handleNameFieldChange = this.handleNameFieldChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.values){
      if(nextProps.values.name){
        this.handleNameFieldChange(nextProps.values.name);
      }else{
        this.setState({enable: 'true'})
      }
    }

  }
  handleFile(files){ 
    this.setState({fileName:files[0].name});
    this.setState({file:files});
    this.setState({errDisplay : ''});
    //this.setState({show:true})

  }
   _tooltipClick(e){
        e.preventDefault()
    }
    onSave(values){
       values.file = this.state.file;
       let vStatus = validateuploadForm(values);
       if(this.props.isParent){
        this.setState({errDisplay : 'Please Select a Subfolder to Upload'})
       } else 
       
      
       if(vStatus.file){       
          let msg = this.getErrMsg(vStatus.name)+' '+this.getErrMsg(vStatus.file);
          this.setState({errDisplay : msg});
       }else{
         this.props.onSave(values)
        
       }

    }

    getErrMsg(messages){
      return messages !== undefined ? messages : '';
    }
    handleNameFieldChange(e){
      if (/\S/.test(e)) {
        // string is not empty and not just whitespace
        this.setState({enable: 'true'})
      }else{
        this.setState({enable: 'true'})
       }     
    }
    
    onClick(event){
  
    }
  render() { 
    const {asyncValidating, fields: { file, name}, handleSubmit, isParent} = this.props
    const sliderRes = this.state.toggleFolder? {width: '25%'}: {width: '4%'};
    const {formatMessage} = this.props.intl;
    let message = this.state.errDisplay;
     
     if(this.state.errDisplay === ' Error: wrong file type'){
        message = (<span><i className='fa fa-exclamation-triangle' aria-hidden='true'></i>
                    {this.state.errDisplay}</span>);
     }
     //let scrollbarStyles = {borderRadius: 5};
  let isBoolean = true;
  //let btnText ="save and upload";
  let style = {color : '#0C65A5', cursor : 'pointer'}
    return (
        <div id={Styles.assetSingleFileUploadSection}>
          <PL_SiteDetail siteLabel='Uploading to the asset library for : ' siteTitle={this.props.productName}/>
          <div className={Styles.peJobstatus}>
          <label className={Styles.jobstatuslabel} style={style} onClick={this.props.mJobStatus}>Check Job Statuses</label>
          </div>
          
          <div className={Styles.leftWrapper}>  
             <div className={Styles.folderTree}> 
                <h4>Select upload location</h4>
                
                <div className={BrowseAsset.filterContainer1} style={sliderRes}>
                     <PL_Scroll classname={BrowseAsset.area1} contentName={BrowseAsset.scroll1} >
                        <SingleFileFolderContainer clearModal={this.props.clearModal} />
                     </PL_Scroll>
                  </div>  
                 
              </div>
          </div>
          <div className={Styles.rightWrapper}>
            <div id="top2" style={{width:280}}></div>
         <Accordion selected="2">
            <AccordionSection title={formatMessage(messages.Single_File_Upload)} id="2">
             <div className={Styles.peSingleuploadWrapper}>
                   <div className={Styles.peInput}>
                    <div className='errDisplay'>{message}</div>
                   <ChooseFile choosefileclass= {Styles.peChooseFile} 
                    selectedFile={this.handleFile} name="filedata" id='filedata' value={file}/> 
                    <div className={Styles.fileNameDisp}>{this.state.fileName}</div>
                   </div>
                    <div className={Styles.colFull}>
                      <PE_tooltip className='fileTypesToolTip' position="right" 
                      content="jpg, jpeg, gif, png, tiff, mp4, mp3, doc, docx, xls, xlsx, ppt, pptx, txt, pdf, csv, odg, odp, odt, ods, ebk, wdgt">
                      <a href="#" onClick={this._tooltipClick.bind(this)}>file formats</a>
                      </PE_tooltip>
                    </div>
                  <form onSubmit={handleSubmit(this.onSave)}>
                    <div className={Styles.peInput + ' ' + Styles.text}>
                        <Label for="name" text={formatMessage(messages.Name)}/>
                        <TextBox className={Styles.formControl} maxLength="60" placeholder="Name" 
                        value={name} autocomplete="off"/>
                    </div>
                     <div className={Styles.peButtonbar +' '+ Styles.peClear}>
                        <div className={Styles.pePullRight}>

                          <ButtonComponent className={Styles.peBtn + ' ' + Styles.peBtnLarge + ' ' + Styles.peBtnPrimary} 
                           buttonText={formatMessage(messages.Save_Upload)} buttonType="submit" disabled={!this.state.file} />

                           
                        </div>
                     </div>
                  </form>
               </div>
            </AccordionSection>
            </Accordion>
        </div>
        </div>
    )
  }
}

SingleFileUpload.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  asyncValidating: PropTypes.bool,
  intl: PropTypes.object,
  isParent : PropTypes.bool,
  
  productName:PropTypes.string,
  clearModal : PropTypes.func,
  componentWillMount : PropTypes.func,
  mJobStatus: PropTypes.func,
  onClick: PropTypes.func,
  buttonText:PropTypes.string,
  buttonType:PropTypes.string,
}

module.exports= injectIntl(reduxForm({
  form: 'synchronousValidation',
  fields
})(SingleFileUpload))


