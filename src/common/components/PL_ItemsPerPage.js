/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a Items display per page component.
 * This component operates as a "Controller-View".
 *
 * @module MediaAssets
 * @file itemsPerPage
 * @author TDC
 *
*/

import React, { Component, PropTypes } from 'react';
import SelectBox from './SelectBox';
import itemsPerPageStyles from './styles/PL_ItemsPerPage.css';

/**
 * @augments React.Component
*/

class ItemsPerPage extends Component {
/**
  * @constructor defines state of the SortAssets Component
  */
  constructor(props) {
    super(props);

    };

/**
 * @function render -
 * When called, it will render the items per page select box
 * @return {string}
 * HTML markup of the component
*/
  render() {
    let itemsPerPageListData=[
      {
         'value':'25',
         'text':'25'
      },
      {
         'value':'50',
         'text':'50'
      },
      {
         'value':'75',
         'text':'75'
      }
   ];

    let itemsPerPageThumbData=[
      {
         'value':'9',
         'text':'9'
      },
      {
         'value':'18',
         'text':'18'
      },
      {
         'value':'27',
         'text':'27'
      }
   ];

   let itemsPerPageData;
   if(this.props.pageView==='grid-view'){
    itemsPerPageData = itemsPerPageThumbData;
  }else{
   itemsPerPageData = itemsPerPageListData;
  }

    let itemsPerPageDetails = this.props.itemsPerPageDetails;
    let TotalCount = itemsPerPageDetails.numberFound;
    let displayItemCount = itemsPerPageDetails.displayItemCount;
    let SearchValue;
    let forText;
    if(this.props.searchValue!==''&&this.props.searchValue!==undefined){
      SearchValue = this.props.searchValue;
      forText = 'for ';
    }
    /*let itmPageDiv;
    itmPageDiv.perPageContainer = itemsPerPageStyles.perPageContainer;
    itmPageDiv.displayStyle = itemsPerPageStyles.displayStyle;*/

    return (
        <div className = {itemsPerPageStyles.perPageContainer}>
          Display&nbsp;
          <SelectBox id='itemPerPageSelectBox'
          value={displayItemCount}
          className={itemsPerPageStyles.itemPerPageSelectBox} options={itemsPerPageData}
          onChange={this.props.onChange}/>
          <span> results <span>{forText}</span><span className={itemsPerPageStyles.resultText}>{SearchValue}</span></span>
        </div>
    );
  }
}

ItemsPerPage.propTypes ={
  pageView: PropTypes.string,
  onChange: PropTypes.func,
  itemsPerPageDetails:PropTypes.object,
  searchValue:PropTypes.string
}

module.exports = ItemsPerPage;
