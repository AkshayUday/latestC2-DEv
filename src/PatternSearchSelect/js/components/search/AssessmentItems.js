import React, { Component, PropTypes } from 'react';
import {includes} from 'lodash';
// import Style from './styles/AssessmentItem.css';
import ListView from './listview/ListView'
import SearchStyles from './styles/SearchSpec.css'

class AssessmentItem extends React.Component {
   constructor(props) {
    super(props); 

    this.state = {
         // filters : [],
         // showFilterType:false,
         // localForFilterType: [],
         // items:[{id:'1',title:'Test',dateModified:'Mar 2 2017'},{id:'2',title:'Test1',dateModified:'Mar 2 2017'},
         // {id:'3',title:'Test2',dateModified:'Mar 2 2017'},{id:'4',title:'Test3',dateModified:'Mar 2 2017'},
         // {id:'5',title:'Test4',dateModified:'Mar 2 2017'}],
         items:[],
         config : this.props.componentConfig,
         title :''
    }

    // this.state={
    //   filterStatus : false,
    //   config : this.props.componentConfig,
    //   pageNo:1,
    //   pageLimit:25,
    //   columnsort : isSortEnabled,
    //   clickedItem : sortLocalTitle,
    //   freeText: '',
    //   actionTypes: new Map(),
    //   sugSaveVal: '',
    //   displayCount :'',
    //   isSuccess: false
    // }


    
    // this.createOption = this.createOption.bind(this);
    // this.createItemOption = this.createItemOption.bind(this);
    // this.onClick = this.onClick.bind(this);
    // this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.componentWillMount = this.props.componentWillMount.bind(this);
    this.componentDidMount = this.props.componentDidMount.bind(this);
    this.onItemsRadioBtnClick = this.onItemsRadioBtnClick.bind(this);
  }

  componentWillMount(){
    debugger;
    // this.selectedCheckboxes = new Set();
    console.log('componentWillMount');


  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    console.log(nextProps);

    this.setState({items : nextProps.hasPartItems});
    if(nextProps.assessmentItems['name']){
      this.setState({title : nextProps.assessmentItems['name']['en']});
    }
  }

  componentDidUpdate(){
    
  }

  componentWillUpdate(){

  }

  componentDidMount(){
     debugger;
     console.log('componentDidMount');
  }
  
  componentWillUnmount(){
    
  }

  onItemsRadioBtnClick(selectedRecord){
    debugger;
    console.log(selectedRecord);
    this.props.getItemsCallBackData(selectedRecord);
  }

  // handleDocumentClick(e) {   

  // }


  // createOption(label,key){
  //   // let checked;
    
  //   // if(this.state.filters[0]['multiSelect'] == true) {
  //   //  checked = includes([...this.selectedCheckboxes], label.display)?true:false;
  //   // }
    
  //   // if(this.state.filters[0]['multiSelect'] == false) {
  //   //  checked  = (this.singleselect.get('value') == label.display)?true:false;
  //   // }

  //   return( <div key={key}><label>
  //     <input type="radio"  id={'itemOption' + key} name={'itemOption'}
  //     value={label.name} />{label.name}</label></div>)
    

  // }

  // createItemOption(){
  
  //  return(<div id="itemOption" >
  //   {this.state.item.map(this.createOption)}
  //  </div>)
  // }

  // onClick(ev){
  //   // ev.preventDefault();
  //   // this.setState({showFilterType: !this.state.showFilterType});
  //   // this.props.filterStatus(this.state.showFilterType);
  // }
    

  render() {

    const {itemcolumns, zibraRows} = this.state.config;
    let title = '';

    if(this.props.assessmentData['title']){
       title = this.props.assessmentData['title'];
    }

    if(this.state['title']){
       title =  this.state['title'];
    }
    

    return (      
      <div ref="assessmentItems">
      <div id="errorDisplay" className={SearchStyles.errorDisplay}>
                {this.props.error}
        </div>

        <div id="assessmentItems">
        <br/>
        <div id="assessmentName">
          <label><b>Assessment:</b>{title}</label>
        </div>
        <hr />
        <div>
        <center>
        <label><b>Assessment Items</b></label>
        </center>
        </div>
        </div>
       
            <ListView  
                panel = {'assessmentItems'}
                columns={itemcolumns}
                zibraRows={zibraRows} rows={this.state.items}
                radioHandler={this.onItemsRadioBtnClick}
                onColumnSort = {() => { console.log('onColumnSort') } }
                columnsort = {''}
                clickedItem = {''}
                />

      </div>
    );
  }
}

AssessmentItem.propTypes = {
  // filterStatus: React.PropTypes.func,
  // filters : React.PropTypes.array,
  // filterTypeData:React.PropTypes.array,
  // setFilterTypeValue : React.PropTypes.func,
  // getAssetsWithManifestation : React.PropTypes.func,
  // getValue : React.PropTypes.func,
  // hostfilename: React.PropTypes.string,
  // localForData : React.PropTypes.object,
     componentConfig : React.PropTypes.object,
     componentWillMount : React.PropTypes.func,
     assessmentData :React.PropTypes.object,
     componentDidMount : React.PropTypes.func,
     getItemsCallBackData : React.PropTypes.func,
     error : React.PropTypes.string
}


export default AssessmentItem;
