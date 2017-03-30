import React, { Component, PropTypes } from 'react';
import Label from '../../../common/components/Label';
import TextBox from '../../../common/components/TextBox';
import TextArea from '../../../common/components/TextArea';
import TagElem from '../../../common/components/TagElem';

import {reduxForm} from 'redux-form';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import {injectIntl, intlShape} from 'react-intl';
import {messages} from './ReviewAssetMetadataDefaultMessages';
import { Link, browserHistory, hashHistory } from 'react-router';
import {removeUnkownProps} from '../../../PatternAddAnAsset/js/utils/util'
import bean from 'bean';
import AssetVideo from './AssetVideo';
import AssetAudio from './AssetAudio';
import AssetImage from './AssetImage';

export const fields = ['alignmentObjective',
						'filename',
						'ContentType',
						'pafId',
						'difficultyLevel',
						'contextSpecificAltText',
						'nameAltText',
						'diffLevel'];
const instanceReadOnlyfalse = function (ev) {
	let editor = ev.editor;
	editor.setReadOnly(false);	
}

const instanceReadOnlyTrue = function (ev) {
	let editor = ev.editor;
	editor.setReadOnly( true );	
}

const ckeditConfig = {
  	extraPlugins: 'sharedspace,sourcedialog',			
	sharedSpaces: {
	top: 'ckContainer',				
	},
	toolbarGroups: [
	{'name':'basicstyles','groups':['basicstyles']},				
	{'name':'insert','groups':['Specialchar']},				
	],			
	removeButtons: 'Image,Anchor,Styles,Specialchar,Table,HorizontalRule'
}


class ReviewAssetMetadata extends React.Component {

   constructor(props) {
    super(props);    
    this.displayName = 'ReviewAssetMetadata';
    
    this.componentWillMount = props.componentWillMount;
    this.onSave = props.onSave;    
    this.state = {
        showToggle: true,
        showHide:'block', //table-row
        diffLevel : this.props.difficultyLevel == '' ? 'Choose difficulty Level':this.props.difficultyLevel,
        OnCancel: false,
       _disabled : {disabled:'disabled'}       
    }

    this.ShowContextSpecific =  this.ShowContextSpecific.bind(this);
    this.HideContextSpecific =  this.HideContextSpecific.bind(this);  
    

  }

	ShowContextSpecific(e){      
		this.setState({showToggle: !this.state.showToggle})
	}

	HideContextSpecific(e){  
		this.setState({showToggle: !this.state.showToggle});  		
		this.props.fields.contextSpecific.value = '';
	}

	showHide(){    
		if(this.state.showHide == 'none'){
			this.setState({showHide:'block'});	
		}else{	
			this.setState({showHide:'none'});	
		}   
	}


 componentWillReceiveProps(nextProps) {
	 if(nextProps.errMsg === 'Save Success'){
	      bean.fire(this.props.patConfig, this.props.patConfig.eventId,nextProps);
	      //console.log(this.props.patConfig);
	      document.getElementById('loader').style.display = 'none';	
	      this.setState({OnCancel:true});
	      this.props.closeModal();
	      this.props.OnCancel();		      
	      //hashHistory.push('/');
     }    
 }

componentDidMount() {
  const  CKEditior = ['altTextCk','CaptionCk','nameCk','copyRightCk'];	
  
  ckeditConfig.enterMode = CKEDITOR.ENTER_BR;
   ckeditConfig.shiftEnterMode = CKEDITOR.ENTER_P ;
   for(let key in CKEditior){  
		CKEDITOR.inline(CKEditior[key], ckeditConfig ).on('focus', instanceReadOnlyfalse);	        
		CKEDITOR.instances[CKEditior[key]].on('blur', instanceReadOnlyTrue);
		CKEDITOR.instances[CKEditior[key]].on('instanceReady', instanceReadOnlyTrue);
		CKEDITOR.instances[CKEditior[key]].on('change', ((ev) => {
			if(CKEDITOR.instances[ev.sender.name].readOnly == false){			   
			  
               let _formData = Object.create(Object.prototype);
               
               let _props = _.cloneDeep(this.props);

               
                _props.name = CKEDITOR.instances['nameCk'].getData();
                _props.Caption = CKEDITOR.instances['CaptionCk'].getData();
                _props.altText = CKEDITOR.instances['altTextCk'].getData();
                _props.copyRightInfo = CKEDITOR.instances['copyRightCk'].getData();
                
                if(CKEDITOR.instances['TranscriptCk']){ 
 					_props.Transcript = CKEDITOR.instances['TranscriptCk'].getData();
                }
                if(CKEDITOR.instances['ClosedCaptionCk']){ 
 					_props.ClosedCaption = CKEDITOR.instances['ClosedCaptionCk'].getData();
                } 


               for(let val in _props ){ 
               	if(typeof(_props[val]) == 'string' && val != 'errMsg' 
               		&& val !== 'uuid' && val != 'ContentType' && val != 'mimetype' && val !='nodeRef'
               		&& val !='path' && val !='contextSpecificAltText' && val !='nameAltText' && val != 'url'
               		&& val != 'filename' && val != 'pafId' && val !='ticket') {                	     
               	     _formData[val] = _props[val];
               	}                	
               }
               
			   //bean.fire(this.props.patConfig, this.props.patConfig.resultsEventId,_formData);	
			}
			
		}).bind(this));	 	
	}
	//console.log('componentDidMount');
}

shouldComponentUpdate(nextProps, nextState){
	
	if(nextState.OnCancel == true){
		//console.log('OnCancel');
		return false;	
	}else if(nextProps.mimetype != ''){		
		//console.log('nextProps');
		this.setState({_disabled:''});

		return true;	
	}else if(nextProps.errMsg == 'Not Found'){
		//console.log('Not Found');
		return true;
	}else{		
		//console.log('else');
		return false;
	}
}

componentWillUpdate(nextProps, nextState){
    
    if(CKEDITOR.instances['nameCk'].getData() == ''){
    	CKEDITOR.instances['nameCk'].setData(nextProps.name,function (){ this.updateElement()});	
    }else{
    	//nextProps.fields.filename.value = CKEDITOR.instances['nameCk'].getData();
    }
	
	if(CKEDITOR.instances['altTextCk'].getData() == ''){
    	CKEDITOR.instances['altTextCk'].setData(nextProps.altText,function (){ this.updateElement()});
    }

	if(CKEDITOR.instances['CaptionCk'].getData() == ''){
	    	CKEDITOR.instances['CaptionCk'].setData(nextProps.Caption,function (){ this.updateElement()});
	    }

	if(CKEDITOR.instances['copyRightCk'].getData() == ''){
	    	CKEDITOR.instances['copyRightCk'].setData(nextProps.copyRightInfo,function (){ this.updateElement()});
	}	
	
}

componentDidUpdate(nextProps, nextState){

    //flowplayer.conf.embed = false;    		

    if(nextProps.mimetype !== undefined){

			if(nextProps.mimetype.split('/')[0] == 'audio'){

				//console.log('Audio');
				
				/*$('#reviewAssestAudio').flowplayer({					
				buffer: 15.43,
				buffered: false,
				splash: true,
				flashls: {
						startfromlevel: 0
					},
				playlist: [{
					sources: [		        
				        	{ type: 'audio/mpeg', src: 'https://qaarc.pearsoncms.com/alfresco/api/-default-/public/cmis/versions/1.1/browser/root?objectId=eaff7487-ddd8-4269-9cd7-7a358122a2a2&alf_ticket='+ nextProps.ticket}
				      	]	
				}]
				
				}); */ 
				/*$('#reviewAssestAudio').flowplayer({					
				splash: true,
				flashls: {
						startfromlevel: 0
					},
				audioOnly: true,
    			clip: {				
					sources: [
					{  type: nextProps.mimetype, src: nextProps.url +'&alf_ticket='+ nextProps.ticket}
					]
			    }
				
				});*/
            if(flowplayer('audioplayer') == null || flowplayer('audioplayer').isLoaded() == false){
            	flowplayer('audioplayer', 'http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf', { 					
					plugins:  {			
						controls: {						
						height: 30,	        
						fullscreen: false,             
						autoHide: false
						},
						audio: {
							url: 'flowplayer.audio-3.2.11.swf'  
						}
					},
					play: null,
					clip: {																					
						provider: 'audio',
						url: nextProps.url +'&alf_ticket='+ nextProps.ticket
					}			
				});
            }

			}


			if(nextProps.mimetype.split('/')[0] == 'video'){
				let videoExist = $('#reviewAssestVideo').data('flowplayer');
				if(videoExist == undefined){
				    //console.log('Video');
				    //let _type = nextProps['mimetype'];
					/*$('#reviewAssestVideo').flowplayer({
					    playlist: [
					      [        
					        { mp4:   nextProps.url +'&alf_ticket='+ nextProps.ticket},
					        { webm:  nextProps.url +'&alf_ticket='+ nextProps.ticket},					
							{ ogv : nextProps.url +'&alf_ticket='+ nextProps.ticket},
							{ m3u8 : nextProps.url +'&alf_ticket='+ nextProps.ticket},
							{ hls : nextProps.url +'&alf_ticket='+ nextProps.ticket},
							{ m4v  : nextProps.url +'&alf_ticket='+ nextProps.ticket},
							{ mov : nextProps.url +'&alf_ticket='+ nextProps.ticket},
							{ '3gp' : nextProps.url +'&alf_ticket='+ nextProps.ticket},
						    {  _type : nextProps.url +'&alf_ticket='+ nextProps.ticket}					

					      ] 
					    ]
					  });*/
            

			if(flowplayer('videoplayer') == null || flowplayer('videoplayer').isLoaded() == false){
				flowplayer('videoplayer', 'http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf', { 
					clip: {			
						url: nextProps.url +'&alf_ticket='+ nextProps.ticket,
					},
					plugins:  {			
						controls: {
						/*backgroundColor:'#002200',*/
						height: 30,	        
						fullscreen: true,            
						autoHide: false
						},
						audio: {
						url: 'flowplayer.audio-3.2.11.swf'  
						}
					}
				});
			}		
		}
	}


		    

		    if(nextProps.mimetype.split('/')[0] == 'video' ||  nextProps.mimetype.split('/')[0] == 'audio'){    	
		   	 	
		   	 	 
		   	 	 //if(!CKEDITOR.instances['TranscriptCk']  || !CKEDITOR.instances['ClosedCaptionCk']){
		   	 	 	  	ckeditConfig.enterMode = CKEDITOR.ENTER_BR;
   	                    ckeditConfig.shiftEnterMode = CKEDITOR.ENTER_P ;
   	                    const  CKEditior = ['TranscriptCk','ClosedCaptionCk'];
  						for(let key in CKEditior){ 
						if(CKEDITOR.instances[CKEditior[key]]){
						    CKEDITOR.instances[CKEditior[key]].destroy(true);
						}   	 	       	
						CKEDITOR.inline(CKEditior[key], ckeditConfig ).on('focus', instanceReadOnlyfalse);	        
						CKEDITOR.instances[CKEditior[key]].on('blur', instanceReadOnlyTrue);	
						CKEDITOR.instances[CKEditior[key]].on('instanceReady', instanceReadOnlyTrue);
						CKEDITOR.instances[CKEditior[key]].on('change', ((ev) => {
								if(CKEDITOR.instances[ev.sender.name].readOnly == false){

								let _formData = Object.create(Object.prototype);               
								let _props = _.cloneDeep(this.props);
								_props.name = CKEDITOR.instances['nameCk'].getData();
								_props.Caption = CKEDITOR.instances['CaptionCk'].getData();
								_props.altText = CKEDITOR.instances['altTextCk'].getData();
								_props.copyRightInfo = CKEDITOR.instances['copyRightCk'].getData();

								_props.Transcript =  CKEDITOR.instances['TranscriptCk'].getData(); 
								_props.ClosedCaption = CKEDITOR.instances['ClosedCaptionCk'].getData(); 

								for(let val in _props ){ 
									if(typeof(_props[val]) == 'string' && val != 'errMsg' 
									&& val !== 'uuid' && val != 'ContentType' && val != 'mimetype' && val !='nodeRef'
									&& val !='path' && val !='contextSpecificAltText' && val !='nameAltText' 
									&& val != 'url' && val != 'filename' && val != 'pafId' && val !='ticket') { 										
										_formData[val] = _props[val];
									}                	
								}

								//bean.fire(this.props.patConfig, this.props.patConfig.resultsEventId,_formData);

								}

						}).bind(this));

						}

						if(CKEDITOR.instances['TranscriptCk'].getData() == ''){
						CKEDITOR.instances['TranscriptCk'].setData(nextProps.Transcript,function (){ this.updateElement()});
						}

						if(CKEDITOR.instances['ClosedCaptionCk'].getData() == ''){
						CKEDITOR.instances['ClosedCaptionCk'].setData(nextProps.ClosedCaption,function (){ this.updateElement()});
						}	
		   	 	 //}
		    }
    }
}

onChange(event, { newValue }) {
    //console.log(event);
    //console.log(newValue);
}

handleCancelOnClick(event){
	
	CKEDITOR.instances['nameCk'].setData('',function (){ this.updateElement()});	
	CKEDITOR.instances['altTextCk'].setData('',function (){ this.updateElement()});
	CKEDITOR.instances['CaptionCk'].setData('',function (){ this.updateElement()});
	CKEDITOR.instances['copyRightCk'].setData('',function (){ this.updateElement()});

	/*CKEDITOR.instances['nameCk'].destroy(true);	
	CKEDITOR.instances['altTextCk'].destroy(true);
	CKEDITOR.instances['CaptionCk'].destroy(true);
	CKEDITOR.instances['copyRightCk'].destroy(true);
    */
	
	if(this.props.mimetype.split('/')[0] == 'video' || this.props.mimetype.split('/')[0] == 'audio'){
		
		CKEDITOR.instances['TranscriptCk'].setData('',function (){ this.updateElement()});
		CKEDITOR.instances['ClosedCaptionCk'].setData('',function (){ this.updateElement()});		
		/*CKEDITOR.instances['TranscriptCk'].destroy(true);
		CKEDITOR.instances['ClosedCaptionCk'].destroy(true);*/
	}

	if(this.props.mimetype.split('/')[0] == 'video'){		
	  flowplayer('videoplayer','');
	}

	if(this.props.mimetype.split('/')[0] == 'audio'){		
	  flowplayer('audioplayer','');
	}

	//CKEDITOR.instances[CKEditior[key]].destroy(true);
	//CKEDITOR.instances[CKEditior[key]].destroy(true);	

	//bean.fire(this.props.patConfig, this.props.patConfig.eventId,this.props);
	this.setState({OnCancel:true});	

	this.props.OnCancel();
	//elementClass(document.body).remove('ReactModal__Body--open');	
	//hashHistory.push('/');
	this.props.closeModal();

}
getDifficultyLevel(event){ 
	//console.log(event);	
	//this.setState({diffLevel:event.target.value});
}
getDiffLevelValues(difficultyLevel,diffLevel){
	let diffValues = '';
	
	/*if(difficultyLevel !== 'undefined' && difficultyLevel !== ''){
		diffValues = difficultyLevel.map(function (value){
			return <option value={value.name} id={value.id}  selected={(diffLevel == value.name)?'selected':''}>{value.name}</option>
		});
	}*/

	if(difficultyLevel !== 'undefined' && difficultyLevel !== ''){
		diffValues = difficultyLevel.map(function (data){
			return <option value={data.value} id={data.value}  selected={(diffLevel == data.value)?'selected':''}>{data.value}</option>
		});
	}

	return diffValues;
}

componentWillUnmount(){
	//console.log('componentWillUnmount');
}

render() {   
  	const {formatMessage} = this.props.intl;
  	   const {
		    fields:{alignmentObjective, filename,ContentType,pafId,difficultyLevel, Caption, altText,
		    copyRightInfo,diffLevel,contextSpecificAltText,nameAltText},
		      handleSubmit
		    } = this.props;

		   
	const divName = {
					display:'table-cell',
					verticalAlign:'middle'
					};
    let displayAssestVideo = '';
    let displayAssestAudio  = '';
    let displayAssestImage	= '';
    let getContentType = '';
    
    if(this.props.mimetype !== undefined && this.props.mimetype != ''){	     
	     displayAssestVideo  = (this.props.mimetype.split('/')[0] == 'video')?<AssetVideo url={this.props.url +'&alf_ticket='+ this.props.ticket} mtype={this.props.mimetype} />:'';
	     displayAssestAudio  = (this.props.mimetype.split('/')[0] == 'audio')?<AssetAudio url={this.props.url +'&alf_ticket='+ this.props.ticket} mtype={this.props.mimetype} />:'';
		 displayAssestImage	= (this.props.mimetype.split('/')[0] == 'image')?<AssetImage url={this.props.url  +'&alf_ticket='+ this.props.ticket}/>:''; 
	     getContentType = this.props.mimetype.split('/')[0] || this.props.mimetype;
    }

    /*
    displayAssestAudio  = <AssetAudio url={'https://qaarc.pearsoncms.com/alfresco/api/-default-/public/cmis/versions/1.1/browser/root?objectId=eaff7487-ddd8-4269-9cd7-7a358122a2a2&alf_ticket='+ this.props.ticket}/>;
    */

    

    let setTranscript = (getContentType == 'video' || getContentType == 'audio')?
    <div className="pe-input pe-input--horizontal">
				<Label for="Transcript" text={formatMessage(messages.Transcript)}/>                         
				<div contentEditable="true" className="cke_editable_inline" id="TranscriptCk" >
				</div>
				</div>:'';

    let setClosedCaption = (getContentType == 'video' || getContentType == 'audio')?<div 
    className="pe-input pe-input--horizontal">
				<Label for="ClosedCaption" text={formatMessage(messages.ClosedCaption)}/>                         
				<div contentEditable="true" className="cke_editable_inline" id="ClosedCaptionCk" ></div>   
				</div>:''; 
    
    /*console.log(ContentType);*/
    let _ContentType = Object.assign({}, {...ContentType});
    _ContentType = removeUnkownProps(_ContentType);
    {/*<option value={contentOption} key={contentOption} selected={(ContentType == contentOption)?'selected':''}>{contentOption}</option>*/}
	let contentTypeBox = (
             
		<div className="pe-input pe-input--horizontal" style={{display:this.state.showHide}}>
                        <Label for="contentType" text={formatMessage(messages.Type)}/>                           
						<select id="ContentType" {..._ContentType} value={ContentType.value} disabled={Boolean(true)}>
						<option value=""></option>						
				 	  {['Audio', 'Video', 'Image'].map(contentOption => 							
						<option value={contentOption} key={contentOption}>{contentOption}</option>)}
						</select>
                </div>)

  {/*<option value={data} key={data} selected={(diffLevel == data)?'selected':''} >{data}</option>*/}
    let diffOptions = '';	
	if(this.props.difficultyLevel !== 'undefined' && this.props.difficultyLevel !== ''){
		 //console.log(this.props.difficultyLevel);
		 //let diffvalue = _.chain(this.props.difficultyLevel).map('value').value();
		 let diffvalue = this.props.difficultyLevel;
         //console.log(diffLevel);
         let _diffLevel = Object.assign({}, {...diffLevel});
         _diffLevel = removeUnkownProps(_diffLevel);
		 diffOptions = (			 
		 	   <div className="pe-input pe-input--horizontal">
                 <Label for="DifficultyLevel" text={'Difficulty Level'} />                  
					<select  {..._diffLevel} value={diffLevel.value} id="difficultyLevel" >
						<option value="Choose Difficulty Level" id="Choose_Difficulty_Level">Choose Difficulty Level</option>
						{diffvalue.map(data => 
							<option value={data} key={data}>{data}</option>)}						
					</select>
                </div>)
	}
   
 
   
    let viewAsset = (
    <div>
    <div className="loader" id="loader"></div>
        <form>
         <div className="pe-assetmetadata" style={{padding: 10}}>
         <section>
            <div className="pe-input pe-input--horizontal" >
            <Label />
            <h2>{formatMessage(messages.Review_Asset_MetaData)}</h2>                       
            </div>
			
			<div className="pe-input pe-input--horizontal" >
			<Label />
			{displayAssestVideo}
			{displayAssestAudio}
			{displayAssestImage}		
			</div>

			<div className="pe-input pe-input--horizontal" >
			<Label />
			 <div id="ckContainer" style={{width:600}}>		
			</div>  	   

			</div>

		     <div className="pe-input pe-input--horizontal" >
			 <Label />
			 <h2>{formatMessage(messages.Asset_Metadata)}</h2>
			 </div>

			 <div className="pe-input pe-input--horizontal" >
			 <Label />
			 <div><span style={{color:'red'}} id='errorDisplay'>{this.props.errMsg}</span></div>
			 </div>

                
                <div  className="pe-metadata-mvm">
                <div className="pe-metadata-name-div">
				<div className="pe-input pe-input--horizontal" >
				<div className="pe-metadata-name">
					<Label for="assetName" text={formatMessage(messages.Asset_Name)}  />                      
					<div contentEditable="true" id="nameCk"></div>
				</div>	
					<div className="pe-metadata-name-img" style={divName} >
					{/*
					<img className="pe-metadata-name-img-icon" onClick={this.showHide.bind(this)} 
					 src="images/Link.PNG" alt="Smiley face" height="50" width="50"/>
					*/}
					</div>
				   
				</div>
				</div>

               {/*<div className="pe-input pe-input--horizontal" style={{display:this.state.showHide}}>
					<div className="pe-metadata-namealttext-div" style={{display:this.state.showHide}}> 		
						<div className="pe-input pe-input--horizontal" >		
							<div className="pe-metadata-namealttext">		
								<Label for="nameAltText" text={formatMessage(messages.Alternate_Name)}  />                      									
								<TextBox id="nameAltText" type="text" placeholder={formatMessage(messages.Alternate_Name)}		
								value={nameAltText}  />		
							</div>			
							<div className="pe-metadata-namealttext-img" style={divName} >
                               {/*

								<img className="pe-metadata-namealttext-img-icon"   src="images/delete.PNG" alt="Smiley face" height="50" width="50"/>		
							   */
							  } 

				{/*			</div>		
						</div>		
				</div>
				</div>
			  */}

                <div className="pe-input pe-input--horizontal" style={{display:this.state.showHide}}>
                        <Label for="fileName" text={formatMessage(messages.Original_File_Name)}/>
                        <TextBox id="filename" disabled={Boolean(true)}  placeholder={formatMessage(messages.Original_File_Name)}
                          value={filename} />
                </div> 

                {contentTypeBox}
 
                <div className="pe-input pe-input--horizontal" style={{display:this.state.showHide}}>
                        <Label for="PAFID" text='PAF ID'/>
                        <TextBox id="pafId" disabled={Boolean(true)} placeholder="" 
                         value={pafId} />

                </div>

                <div className="pe-input pe-input--horizontal">
                         <Label for="ObjectiveAlignment" text={formatMessage
                         	(messages.ObjectiveAlignment)} />
                         <TextBox id="alignmentObjective" disabled={Boolean(false)}
                          placeholder="Add in Learning Objective URI" value={alignmentObjective}/>
                </div>
                {diffOptions}
                
               {/*

			<div className="pe-input pe-input--horizontal">
                 <Label for="DifficultyLevel" text={'Difficulty Level'} />                     
					<select {...diffLevel} id="difficultyLevel" value={this.state.diffLevel} onChange={this.getDifficultyLevel}>
						<option value="Choose Difficulty Level" id="Choose_Difficulty_Level" >Choose Difficulty Level</option>
						{this.getDiffLevelValues(this.props.difficultyLevel,this.props.diffLevel)}
						
					</select>

                </div>        

               */}
                
                                 
                {/*<div className="pe-input pe-input--horizontal">
	                 <Label for ="altText" text={formatMessage(messages.Alt_Text)}/>                         
	                 <div contentEditable="true" id="altTextCk" ></div>
                     
                </div>*/}

                <div className="pe-metadata-alttext-div">		
					<div className="pe-input pe-input--horizontal" >		
						<div className="pe-metadata-alttext">		
							<Label for="altText" text={formatMessage(messages.Alt_Text)}  />                      		
							<div contentEditable="true" id="altTextCk"></div>		
						</div>			
						<div className="pe-metadata-alttext-img" style={divName} >		
							{/*<img className="pe-metadata-alttext-img-icon"   src="images/Link.PNG" alt="Smiley face" height="50" width="50"/>*/}		
						</div>		
					</div>		
				</div>
				{/*
				<div className="pe-metadata-csalttext-div">		
					<div className="pe-input pe-input--horizontal" >		
						<div className="pe-metadata-csalttext">		
							<Label for="altText" text={formatMessage(messages.Context_Specfic_Alt_Text)}  />                      									
							<TextBox id="contextSpecificAltText" type="text" placeholder={formatMessage(messages.Context_Specfic_Alt_Text)}		
							 value={contextSpecificAltText}  />		
						</div>			
						<div className="pe-metadata-csalttext-img" style={divName} >
						{/*		
							<img className="pe-metadata-csalttext-img-icon"   src="images/delete.PNG" alt="Smiley face" height="50" width="50"/>		
						*/}
							
				{/*		</div>		
					</div>		
				</div>	
			   */}


 
                 <div className="pe-input pe-input--horizontal">
                         <Label for="Caption" text={formatMessage(messages.Caption)}/>                         
                         <div contentEditable="true" id="CaptionCk" ></div>
                </div>          
                <div className="pe-input pe-input--horizontal navcontainer">
                         <Label for ="copyRight" text={formatMessage(messages.Copy_Right)}/>                         
                        <div contentEditable="true" id="copyRightCk" ></div>
                </div>
               {setTranscript}

               {setClosedCaption}				
        
                
  			</div>     
  			<div className="pe-input pe-input--horizontal" style={{textAlign:'right',background:'#E6E6E6'}}>
                  <span style={{color:'#D00218',fontSize:12}}>If you cancel you will lose any unsaved data. Do you wish to cancel?</span>
                  <button onClick={handleSubmit(this.handleCancelOnClick.bind(this))} style={{marginTop:0,marginRight:20,marginBottom:20,marignLeft:0}}>
                  {formatMessage(messages.Cancel)}
                  </button>
				  <button onClick={handleSubmit(this.onSave)} style={{marginTop:10}} {...this.state._disabled}>
				{formatMessage(messages.Save_Import)}
				  </button>
       </div>  
        </section>

            </div>
        </form>
    </div>
    )		  

    return (
    	<div>
    	 	{viewAsset}
    	 </div>
         )
  }
}

ReviewAssetMetadata.propTypes = {    
				intl: intlShape.isRequired,
				componentWillMount:React.PropTypes.func,
				onSave:React.PropTypes.func,				
			    filename:React.PropTypes.string,
			    fields:React.PropTypes.object,
			    handleSubmit:React.PropTypes.func,
			    mimetype: React.PropTypes.string,
			    url:React.PropTypes.string,
			    errMsg:React.PropTypes.string,
			    patConfig:React.PropTypes.object,
			    difficultyLevel: React.PropTypes.any,
			    ticket:PropTypes.string,
			    diffLevel:PropTypes.string,
			    OnCancel:React.PropTypes.func,
			    closeModal:React.PropTypes.func
			    
			}
ReviewAssetMetadata = reduxForm({
    form: 'ReviewAssetMetadata',
    fields
  })(ReviewAssetMetadata);

export default injectIntl(ReviewAssetMetadata);
