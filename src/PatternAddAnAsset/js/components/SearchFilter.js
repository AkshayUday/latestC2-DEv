/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file searchFilter
 * @author TDC
 *
*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Label from'../../../common/components/Label';

class SearchFilter extends Component{
    /**
  * @constructor defines states of the search Filter Component
  */
        constructor(props){
        super(props);
            this.state = {
        showToggle: true
    }
         this.ShowContextSpecific =  this.ShowContextSpecific.bind(this);
         this.filterSearch = props.filterSearch.bind(this);
    }
    /** @function ShowAsserts -
 * This function is used to show and hide of search filter component
  */
    ShowContextSpecific(e){
   this.setState({showToggle: !this.state.showToggle})
    }

    componentWillReceiveProps(nextProps) {
      this.props = nextProps;
    }
/**
 * @function render -
 * When called, it will render the search filter component
 * @return {string}
 * HTML markup of the component
*/
        // render(){
        //      let Filters = this.props.Filters;
        //      let self = this;
        //     return (
        //             <div id="section">
        //                 <Label className="LabelHead" for="Description" text="Search Filters"/>
        //                 <Label className="LabelBold" for="Description" text="Difficulty Level"/>
        //                 <div className='searchFilterList'>
        //                     <ul>
        //                         {Filters.map(function (filter, index){
        //                         let selected = '';
        //                         if(filter.checked){
        //                           selected = 'filterChecked';
        //                         }
        //                         return <li className={selected} key={ index }><a href='#' id={filter.id} onClick={self.props.filterSearch}>{filter.name}</a></li>;
        //                         })}
        //                     </ul>
        //                 </div>
        //             </div>
        //         )
        //     }
        render(){
          return(
            <div></div>
            )
        }
    }

SearchFilter.propTypes ={
  Filters: PropTypes.array,  
  filterSearch: PropTypes.func,
}


module.exports= SearchFilter;
