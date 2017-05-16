/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * @module AssessmentMetadata
 * @author 547305
 * @file MVM - This component operates as a "Controller-View".  It listens for changes in the AssessmentMetadata Store and passes the new data to its children.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Label from'../../../../common/components/Label';
import TextBox from '../../../../common/components/TextBox';
//import Heading from '../../../../common/components/Heading';
import SelectBox from '../../../../common/components/SelectBox';
import TextArea from '../../../../common/components/TextArea';
import TagElem from '../../../../common/components/TagElem';
import TimePicker from'../../../../common/components/TimePicker';
import HoursComponent from '../../../../common/components/HoursComponent';
import MinutesComponent from '../../../../common/components/MinutesComponent';
import SecondsComponent from '../../../../common/components/SecondsComponent';
import {reduxForm} from 'redux-form';
import FormMessages from 'redux-form-validation';
import {generateValidation} from 'redux-form-validation';
import Autosuggest from '../../container/autoCompleteContainer';
import {injectIntl, intlShape} from 'react-intl';
import {messages} from './MVMDefaultMessages';
import bean from 'bean';
import styles from './styles/MVMStyles.css';
import {fetchMetaData, saveMetaData} from '../../action/MetadataAction';
export const fields = ['uuid','filename', 'name', 'urn', 'isbn','modNo','chapNo','author','contentType', 'planId','audience',
                       'difficultyLevel','knowledgeLevel','publisher','discipline', 'goalAlignment','objAlign','metadataType',
                       'timeReq','desc','keywords','prodKeywords','goalKeywords','hours','mins','secs','copyrightInfo','adaptiveFlag','eTag'];
/**
 * The validations value.
 * @type {object}
*/
let validations = {
     'name': false,
     'filename': false,
     'uuid': false,
     'urn': false,
     'contentType': false,
     'audience': false,
     'difficultyLevel': false,
     'knowledgeLevel': false,
     'discipline': false,
     'publisher': false,
     'objAlign': false,
     'timeReq': false,
     'goalAlignment': false,
     'desc': false,
     'isbn' : false,
     'modNo' : false,
     'planId': false,
     'chapNo': false,
     'author': false,
     'keywords': false,
     'prodKeywords': false,
     'goalKeywords': false,
     //'product':false,
     'hours':false,
     'mins':false,
     'secs':false,
     'copyrightInfo':false,
     'adaptiveFlag':false,
     'eTag':false,
     'metadataType':false
};
/**
 * @augments React.Component
*/
class MVMComponent extends React.Component{
/**
 *  @param {object} props - The propery object.
 *  @param  {function}  props.componentWillMount
 *  @param  {function}  props.onSave
 *  @param  {function}  props.onChange
 *  @param  {function}  props.onSuggestionsUpdateRequested
*/
constructor(props) {
   super(props);
/**
 * The displayName MVMComponent.
 * @type {string}
*/
    this.displayName = 'MVMComponent';
    this.componentWillMount = props.componentWillMount;
    this.onSave = props.onSave;
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.setErrMsg = props.setErrMsg;
    this.handleChange = this.handleChange.bind(this);

     this.state = {
      contentTypeData: [],
      audienceRolesData: [],
      difficultyLevelData: [],
      knowledgeLevelData: [],
      alignmentTypeData: [],
      disciplineData: [],
      goalAlignmentData: []  ,
      //suggest: [],
      prodSuggest: [],
      //goalSuggest: [],
      languages: [],
      value: '',
      isChecked: false,
      suggestions: this.getSuggestions('')
    }
}

componentDidMount(){

   /*let textArea=$('.textarea-wrapper Textarea');
   let textAreaWrapper=$('.textarea-wrapper');
   textAreaWrapper.mCustomScrollbar({
          scrollInertia:0,
          advanced:{autoScrollOnFocus:false}
    });
   //let hiddenDiv=jquery(document.createElement('div'));
  // let content=null;
   //hiddenDiv.addClass('hiddendiv');
   //jquery('body').prepend(hiddenDiv);*/
}

handleChange(tags,src){
  if(tags === 'adaptiveFlag'){
    this.setState({isChecked: !this.state.isChecked});
    this.props.handleChange(tags,!this.state.isChecked);
  }else{
    this.props.handleChange(tags,src);
  }
  
  }

componentWillReceiveProps(nextProps) {
    //bean.fire(this.props.patConfig, this.props.patConfig.resultsEventId,nextProps);
    if(nextProps.errMsg==='Save Success'){
      bean.fire(this.props.patConfig.patSetup, this.props.patConfig.eventId,nextProps);
      this.setErrMsg('');
    }
    if (nextProps.contentTypeData) {
      this.state.contentTypeData = nextProps.contentTypeData;
    }
    if (nextProps.audienceRolesData) {
      this.state.audienceRolesData = nextProps.audienceRolesData;
    }
     if (nextProps.difficultyLevelData) {
      this.state.difficultyLevelData = nextProps.difficultyLevelData;
    }
    if (nextProps.knowledgeLevelData) {
      this.state.knowledgeLevelData = nextProps.knowledgeLevelData;
    }
    if (nextProps.alignmentTypeData) {
      this.state.alignmentTypeData = nextProps.alignmentTypeData;
    }
    if(nextProps.disciplineData){
      this.state.disciplineData = nextProps.disciplineData;
    }
    if(nextProps.goalAlignmentData){
      this.state.goalAlignmentData = nextProps.goalAlignmentData;
    }
    if(nextProps.languages){
      this.state.languages = nextProps.languages;
    }
    /*if(nextProps.suggestions){
      this.state.suggest = nextProps.suggestions;
    }*/
    if(nextProps.prodSuggestions){
      this.state.prodSuggest = nextProps.prodSuggestions;
    }
    //if(nextProps.adaptiveFlag){
      this.state.isChecked = nextProps.adaptiveFlag;
    //}
}
/** An event. Its name is module:AssessmentMetadata.event:onBlur.
 * @event module:AssessmentMetadata.event:onBlur
 * @returns {boolean}
*/
onBlur(e) {
  return true;
}
/** An event. Its name is module:AssessmentMetadata.event:onChange.
 * @event module:AssessmentMetadata.event:onChange
 * @returns {boolean}
*/
onChange(e) {
  return true;
}
/** An event. Its name is module:AssessmentMetadata.event:_onChange.
 * @event module:AssessmentMetadata.event:_onChange
*/
_onChange(e){
        let val = e.target.value,
            name = e.target.name
        for(let key in this.state.fields){
            let field = this.state.fields[key]
            if(field.name == name){
                field.value = val
            }
        }
        this.setState(this.state)
    }
/** An event. Its name is module:AssessmentMetadata.event:onChange.
 * @event module:AssessmentMetadata.event:onChange
*/
onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }
/**
  *This function will get called when request for suggestions update came.
 */
onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }
/**
 * This method is used to get suggestions.
 * @param {string} value - Whatever entered by user
 * @returns {object}
 * Array of Suggestions
*/
 getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : this.state.languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
}
/**
 * Whenever user selects some suggestion, this method will get called and it will tell
 * name of that selection.
 * @param {object} suggestion - Whatever suggestion selected by user
 * @returns {string} Name
 * Value of that suggestion
*/
 getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}
/**
 * This method is used to render suggestion name with the help of span HTML tag.
 * @param {object} suggestion - Whatever suggestion selected by user
 * @returns {string}
 * HTML markup
*/
 renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/

render() {

 
  const {formatMessage} = this.props.intl;
  let self = this
  let title = '';
  //const languagesData = this.state.languages || [];
  if(this.props.patConfig.patSetup.selector === '#assesmentComp'){
    title = 'Assessment Metadata';
  }else if(this.props.patConfig.patSetup.selector === '#bankComp'){
    title = 'Bank Metadata';
  }else{
    title = 'Question Metadata';
  }
  //const languagesData = this.state.languages || [];
  const contentTypeData = this.state.contentTypeData || [];
  const audienceRolesData = this.state.audienceRolesData || [];
  const difficultyLevelData = this.state.difficultyLevelData || [];
  const knowledgeLevelData = this.state.knowledgeLevelData || [];
  const alignmentTypeData = this.state.alignmentTypeData || [];
  const disciplineData = this.state.disciplineData || [];
  const goalAlignmentData = this.state.goalAlignmentData || [];
 // const suggest = this.state.suggest || [];
  const prodSuggest = this.state.prodSuggest || [];
 // const goalSuggest = this.state.goalSuggest || [];
  const { value, suggestions } = this.state;
  const inputProps = {
      placeholder: 'Type a product',
      value,
      onChange: this.onChange
  };
  const{
    fields : {uuid, filename,name,urn,contentType,audience,modNo,author,planId,chapNo,difficultyLevel,
              knowledgeLevel,copyrightInfo,discipline,publisher,isbn,goalAlignment,objAlign,timeReq,desc,keywords,
              prodKeywords,goalKeywords,hours,mins,secs,eTag,adaptiveFlag,metadataType},
    handleSubmit
  }= this.props;
    return (
            <form>
            <div id='ext_AssessmentMetaData' className={styles.containerMetaData+' ext_AssessmentMetaData'}>
            <section>
              <h2>{title}</h2>
              <div  className={styles.assessmentMetaData}>

                <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal} >
                    <Label for ="URI" text={formatMessage(messages.MVM_URN)}/>
                    <TextBox value = {urn} disabled={Boolean(true)} placeholder="System entered canonical URI for asset"/>
                </div>

                <div className={styles.containerMetaData+' '+styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal} >
                    <Label for="Description" text={formatMessage(messages.MVM_Desc)}/>
                    <div className="textarea-wrapper">
                    <TextArea id="description" value={desc} placeholder = "Summary description of the resource"/>
                    </div>
                </div>

                <div className={styles.assessmentFieldHorizontal} >
                  <Label for ="keywords" text={formatMessage(messages.MVM_Keywords)}/>
                  <TagElem tags={keywords.value} update={this.handleChange.bind(this,'keywords')}/>
                </div>
               <div className={styles.assessmentInput+' '+ styles.assessmentFieldHorizontal+' '+styles.assessmentTimer}>
                <Label for="timeReq" text={formatMessage(messages.Time_Required)}/>
                  <HoursComponent id="hours" hours={hours}/>
                  <MinutesComponent id="minutes" mins={mins}/>
                  <SecondsComponent id="secs" secs={secs}/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="Alignment Type" text={formatMessage(messages.Publisher)}/>
                    <TextBox value={publisher} placeholder="Add publisher"/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="Discipline" text={formatMessage(messages.Discipline)}/>
                    <SelectBox id="discipline"   value={discipline} onChange= {this.onChange}   onBlur= {this.onBlur} options={disciplineData}/>
                </div>
                <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for="EnablingObejctive" text={formatMessage(messages.Objective_Alignment)}/>
                    <TextBox value = {objAlign} placeholder="Add in Learning Objective URI"/>
                </div>
                <div className={styles.assessmentFieldHorizontal}>
                    <Label for ="Goal Alignment" text={formatMessage(messages.Goal_Alignment)}/>
                    <TagElem tags={goalKeywords.value} update={this.handleChange.bind(this,'goalKeywords')}/>
                </div>
                <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="Difficulty Level" text={formatMessage(messages.Difficulty_Level)}/>
                    <SelectBox id="difficultLevel"  value={difficultyLevel} onChange= {this.onChange}   onBlur= {this.onBlur} options={difficultyLevelData}/>
                </div>
                <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="Audience Role" text={formatMessage(messages.Audience_Role)}/>
                    <SelectBox id="audienceRole"  value={audience} onChange= {this.onChange}   onBlur= {this.onBlur} options={audienceRolesData}/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal} >
                    <Label for ="ISBN" text={formatMessage(messages.MVM_ISBN)}/>
                    <TextBox value = {isbn} placeholder="Enter the ISBN-10 or ISBN-13"/>
                </div>
                <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal} >
                    <Label for ="ModNo" text={formatMessage(messages.MVM_Module_No)}/>
                    <TextBox value = {modNo} placeholder="Add the corresponding Module number"/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal} >
                    <Label for ="chapNo" text={formatMessage(messages.MVM_Chapter_No)}/>
                    <TextBox value = {chapNo} placeholder="Add the corresponding Chapter number"/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="author" text={formatMessage(messages.MVM_Author)}/>
                    <TextBox value = {author} placeholder="Add the Author(s) name"/>
                </div>
                 <div className={styles.assessmentMetaData+' '+styles.assessmentInput+' '+ styles.assessmentFieldHorizontal}>
                    <Label for ="copyrightInfo " text={formatMessage(messages.MVM_copyrightInfo)}/>
                    <TextBox value = {copyrightInfo } placeholder="Add the copyright information"/>
                </div>
                <div className={styles.assessmentCheckbox}>
                      <label> Adaptive Flag </label>
                      <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChange.bind(this,'adaptiveFlag')}/>
                      
                 </div>
               </div>
            </section>
            </div>
            </form>
        )
    }
};

MVMComponent.propTypes = {
        intl: intlShape.isRequired,
        componentWillMount:React.PropTypes.func,
        onSave:React.PropTypes.func,
        contentType: React.PropTypes.string,
        //suggest: React.PropTypes.array,
        prodSuggest: React.PropTypes.array,
        //goalSuggest: React.PropTypes.array,
        publisher: React.PropTypes.string,
        discipline: React.PropTypes.string,
        goalAlignment: React.PropTypes.string,
        difficultyLevel: React.PropTypes.string,
        adaptiveFlag: React.PropTypes.bool,
        audience: React.PropTypes.string,
        knowledgeLevel: React.PropTypes.string,
        fields: React.PropTypes.object,
        handleSubmit: React.PropTypes.func,
        patConfig:React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        setErrMsg: React.PropTypes.func,
        handleChange: React.PropTypes.func,
}

MVMComponent = reduxForm({
    form: 'mvm',
     fields: ['uuid', 'filename','name','urn','isbn','planId','modNo','chapNo','author','contentType','audience','difficultyLevel',
              'knowledgeLevel','publisher','copyrightInfo','discipline','goalAlignment','objAlign','timeReq','desc','keywords',
              'prodKeywords','goalKeywords','hours','mins','secs','eTag','adaptiveFlag','metadataType'],
     ...generateValidation(validations)
  })(MVMComponent);

//module.exports = MVMComponent;
export default injectIntl(MVMComponent, {withRef: true});
