import React, { Component, PropTypes } from 'react';
import {includes} from 'lodash';
import Style from './styles/FilterType.css';


class FilterType extends React.Component {
   constructor(props) {
    super(props); 

    this.state = {
         filters : [],
         showFilterType:false
    }

    // console.log(this.props.filterTypeData);
    // console.log([...this.props.filterTypeData['multiSelect']]);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentWillMount(){
    this.selectedCheckboxes = new Set();
    this.singleselect = new Map();

    let initialfilterTypeVal = window.tdc.patConfig.patSetup.filterType;
    if(initialfilterTypeVal !=''){
      for(let i=0; i<initialfilterTypeVal.length; i++){
          this.selectedCheckboxes.add(initialfilterTypeVal[i]);
      }
      this.props.setFilterTypeValue([...this.selectedCheckboxes]);
    }

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.filterTypeData.length);
    if(nextProps.filterTypeData.length > 0) {
      if(nextProps.filterTypeData.length != this.props.filters[0]['options'].length){
         this.props.filters[0]['options'] = nextProps.filterTypeData;
         this.setState({filters:this.props.filters,showFilterType:false});
         // this.props.getAssetsWithManifestation();
         this.props.getValue(this.props.hostfilename);
      }
     
    }else{

         this.props.filters[0]['options'] = nextProps.filterTypeData;
         this.setState({filters:this.props.filters,showFilterType:false})
    }
    
  }

  componentDidUpdate(){
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillUpdate(){

  }

  componentDidMount(){

  }
  
  componentWillUnmount(){
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick(e) {   
    let filterType = this.refs.filterType;
    if (!filterType.contains(e.target)) {
      this.setState({showFilterType:false})
    }
  }


  toggleCheckbox(ev){
   // console.log([...this.props.filmultiSelect]);


   if(this.state.filters[0]['multiSelect'] == true) {
    if (this.selectedCheckboxes.has(ev.target.value)) {
      this.selectedCheckboxes.delete(ev.target.value);
    } else {
      this.selectedCheckboxes.add(ev.target.value);
    }
   }

   // if(this.state.filters[0]['multiSelect'] == true){
   //  if(this.props.filterTypeData['multiSelect'].has(ev.target.value)) {
   //    this.props.filterTypeData['multiSelect'].delete(ev.target.value);
   //  } else {
   //    this.props.filterTypeData['multiSelect'].add(ev.target.value);
   //  }
   // }

   //  console.log([...this.props.filterTypeData['multiSelect']]);


    if(this.state.filters[0]['multiSelect'] == false) {
      if(this.singleselect.get('value') == ev.target.value) {
      this.singleselect.set('value','');
      }else{
        this.singleselect.set('value', ev.target.value);
      }
    }
    

    // console.log([...this.selectedCheckboxes]);
    

    if(this.state.filters[0]['multiSelect'] == true) {
      this.props.setFilterTypeValue([...this.selectedCheckboxes]);
    }else{
      this.props.setFilterTypeValue(this.singleselect.get('value'));
    }

    this.setState({showFilterType: this.state.showFilterType});


  }



  createCheckbox(label,key){
    let checked;
    
    if(this.state.filters[0]['multiSelect'] == true) {
     checked = includes([...this.selectedCheckboxes], label.display)?true:false;
    }
    
    if(this.state.filters[0]['multiSelect'] == false) {
     checked  = (this.singleselect.get('value') == label.display)?true:false;
    }

    return( <div key={key}><label>
      <input type="checkbox" id={'filterType' + key} name={'filterType' + key}
      value={label.display} onChange={this.toggleCheckbox}  checked={checked} />{label.display}</label></div>)
    

  }

  createCheckboxes(){
   // console.log(this.state.filters[0]['options']);
   
   return(<div id="filterOption" className={Style.filterOption}>
    {this.state.filters[0]['options'].map(this.createCheckbox)}
   </div>)

   // return this.state.filters[0]['options'].map(this.createCheckbox);
  }

  onClick(ev){
    ev.preventDefault();
    this.setState({showFilterType: !this.state.showFilterType});
    this.props.filterStatus(this.state.showFilterType);
  }
    

  render() {

   // console.log(this.props);

    let toggleIcon = this.state.showFilterType?'fa-chevron-down':'fa-chevron-up';

    return (      
      <div ref="filterType">
        <div id="filterType">
        <label>Filter: Type <a onClick={this.onClick} href='#' style={{color:'black'}}><i className={'fa ' + toggleIcon} aria-hidden="true"></i></a></label>
         </div>
        {this.state.showFilterType && this.createCheckboxes()}
      </div>
    );
  }
}

FilterType.propTypes = {
  filterStatus: React.PropTypes.func,
  filters : React.PropTypes.array,
  filterTypeData:React.PropTypes.array,
  setFilterTypeValue : React.PropTypes.func,
  getAssetsWithManifestation : React.PropTypes.func,
  getValue : React.PropTypes.func,
  hostfilename: React.PropTypes.string
}


export default FilterType;
