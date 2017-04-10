import React, { Component, PropTypes } from 'react';
import Radio from '../../../../common/components/Radio';
import PE_tooltip from '../../../../common/components/pe-tooltip';
import {injectIntl} from 'react-intl';
import {getModifiedOn,trimFolderName} from '../../../../common/components/browseAssetUtil';
import ReactDOM from 'react-dom';
import AssetStyles from './styles/AssetsStyles.css'

class assets extends Component {

  assetSelectedEvent(me, isTrue=true) {
    if (isTrue) {
      this.customFn(this.props.record);
    }
    else {
      this.customFn({});
    }
  }

  changeRadioButton(event) {
    if (event.target.type !== 'radio') {
      let radioComponent = ReactDOM.findDOMNode(this.refs.radioComp);

      radioComponent.checked = !radioComponent.checked;
      this.refs.radioComp.assetSelectedEvent('', radioComponent.checked);
    }
    //let selectBtn = document.getElementsByClassName('selectBtn')[0];
    let selectBtn = document.getElementById('assetSelectBtn');
    
    if(selectBtn.getAttribute('disabled') == 'true'){
      selectBtn.removeAttribute('disabled');
    }
    
  }

  render() {
    const {formatDate} = this.props.intl;
     let item = this.props.productTemp,
        selectedRecord = this.props.selectedRecord,
        checked = false, fileSize, fileType = 'KB',
        setSelectedItem = this.props.setSelectedItem,
        resType,
        listView = this.props.listViewStyle;

        fileSize = parseFloat(item.size/1024).toFixed(2);
        if (fileSize >= 1024) {
          fileSize = parseFloat(fileSize/1024).toFixed(2);
          fileType = 'MB'
        }
         if(item.mimetype.indexOf('image') >= 0){
       // if(item.mimetype.includes('image')===true){
        item.url = item.url + '?c=queue&ph=true';
        item.IconClass = 'fa-image';
        resType = 'Image'
       }
        else if(item.mimetype.indexOf('video') >= 0){
       //else if(item.mimetype.includes('video')===true){
        item.url = item.url + '?c=queue&ph=true';
         item.IconClass = 'fa-video-camera';
         resType = 'Video'
       }
       else if(item.mimetype.indexOf('audio') >= 0){
       //else if(item.mimetype.includes('audio')===true){
         //item.url = item.url + '?c=queue&ph=true';
         item.url = item.url + '?c=queue&ph=true';
         item.IconClass = 'fa-volume-down';
         resType = 'Audio'
       }
       else{
        item.url = item.url + '?c=queue&ph=true';
        item.IconClass = 'fa-file';
        resType = 'Others'
       }

       if (selectedRecord && selectedRecord.nodeRef === item.nodeRef) {
          checked = true;
       }
       let modFileName;
       let fileName;
       let lengthOfChar;
       if(item.title){
        modFileName = item.title;
       }else{
       let splitName = item.name.split('.');
       modFileName = splitName[0];
      }
      
      modFileName = item.fileName;

      let modify = item.modifiedBy !== undefined ? 'Uploaded by: '+item.modifiedBy : '';
      let fileInfo = item.size !== undefined ? ' File size: '+ fileSize + fileType : '';
       let pageRender;
       let radioBtn = <Radio name='assetsCheckbox' className={AssetStyles.PlRadio} ref='radioComp' record={item} checked= {checked} customFn = {setSelectedItem} parent = {this.assetSelectedEvent}/>
       let imgTag = <img src={item.url} alt='product image' />
       let self = this;
       if(this.props.pageView === 'grid-view'){
        lengthOfChar = 47;
       fileName = trimFolderName(modFileName,lengthOfChar);
              pageRender = (
            <div onClick={self.changeRadioButton.bind(self)} key={item.nodeRef}
                className={AssetStyles.searchResultBox +' card-item1 '}>
              <div className={AssetStyles.assetRadioBtn}>{radioBtn}</div>
              <div className={AssetStyles.assetImage}>
                {imgTag}
              </div>
              <footer className={AssetStyles.assetFooter}>
              <div className={AssetStyles.nameIcon}>
                <PE_tooltip className='assetNameToolTip' position='right' content={modFileName}>
                <label><a className={AssetStyles.ellipsisInline}><strong>{fileName}</strong></a></label>
                </PE_tooltip>
              </div>
                <div className={AssetStyles.footerIcon}>
                    <i className= {AssetStyles.browseTooltip +' fa ' + item.IconClass}></i>
                      <PE_tooltip className='assetDetailToolTip' position='right'
                      content={ modify +' Date uploaded: '
                      +formatDate(getModifiedOn(item.modifiedOn))+ fileInfo}>
                        <i className='fa fa-info-circle'></i>
                      </PE_tooltip>
                </div>
              </footer>
              </div>)
            
         }else{
            let fileNameStyle = '';
            if(listView === 'browListViewWidth'){
              fileNameStyle = 'fileNameStyle';
              listView = AssetStyles.browListViewWidth;
              lengthOfChar = 25;
              fileName = trimFolderName(modFileName,lengthOfChar);
            }else{
              listView = AssetStyles.listWidth;
              lengthOfChar = 44;
              fileName = trimFolderName(modFileName,lengthOfChar);
            }
              pageRender = (<div
                onClick={self.changeRadioButton.bind(self)} className={listView}>
             <div className={AssetStyles.listView}>
                <div className='col-md-1 radio-box'>{radioBtn}</div>
                <div className={AssetStyles.listImageSize}>{imgTag}</div>
                <div className={AssetStyles.listViewNameStyle}>
                <PE_tooltip className='assetNameToolTip' position='right' content={modFileName}>
                  <span className={'fileName '+ AssetStyles.fileNameStyle}>{fileName}</span>
                </PE_tooltip>
                </div>
              </div>
              <div className={AssetStyles.resourceType}>{resType}</div>
              <div className={AssetStyles.addedBy}>{item.modifiedBy}</div>
              <div className={AssetStyles.dateModified}>{getModifiedOn(item.modifiedOn)}</div>
              </div>)
            
         }

     return (pageRender);
  }
}

assets.propTypes = {
      intl: PropTypes.object,
      assetSelectedEvent: PropTypes.func,
      record: PropTypes.object,
      productTemp: PropTypes.object,
      setSelectedItem: PropTypes.func,
      selectedRecord: PropTypes.object,
      pageView: PropTypes.string,
      listViewStyle: PropTypes.string
  }
export default injectIntl(assets);
