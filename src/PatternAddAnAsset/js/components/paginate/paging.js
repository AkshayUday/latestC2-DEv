import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Pagination from './Pagination';
import {DEFAULT_PAGE_NO,DEFAULT_MAX_RESULTS} from '../../constants/paginationConstants';
//require('bootstrap/less/bootstrap.less');
import pagingStyles from './styles/paging.css';

class Paginate extends Component {
  constructor(props) {
    super();
    this.state = {
      activePage: 1
    };
    //this.handlePageChange = ::this._handlePageChange;
  }

  render() {
    const pageDetails = this.props.pageDetails
    let pageLimit = DEFAULT_MAX_RESULTS;
    let noDataPageNo = 0;
    if(this.props.pageDetails.totalRecords==0){
      noDataPageNo = this.props.pageDetails.pageNo;
    }
    if(this.props.pageDetails.pageLimit){
      pageLimit = this.props.pageDetails.pageLimit;
    }
    let libData='';
      if(this.props.productName && this.props.pageDetails.totalRecords>0){
      libData = this.props.productName;
    }

    let pageDetailContent= ' ';
     if(!this.props.pageDetails.isSavedSearch){
     if(this.props.pageDetails.totalRecords>0){
        pageDetailContent = 'Showing '+(pageDetails.index+1)+'-'+(pageDetails.index+pageDetails.totalRecords)+' results in product library: ';
      }
    }
    return (
    <div className={pagingStyles.pagingdiv}>
      <div className={pagingStyles.row}>
        <div className={pagingStyles.libDataDiv}>
        <span className='textContent'>{pageDetailContent}</span><span className={pagingStyles.libDataStyle}>{libData}</span>
        </div>
         <div className={pagingStyles.paginationDiv}>
          <Pagination 
          activePage={pageDetails.pageNo} 
          itemsCountPerPage={pageLimit} 
          totalItemsCount={pageDetails.numberFound} 
          pageRangeDisplayed={5}
          noDataPageNo={noDataPageNo}
          onChange={this.props.handlePageChange}/>
        </div>
      </div>
    </div>
    );
  }
}

Paginate.propTypes = {
  pageDetails: PropTypes.object,
  handlePageChange:PropTypes.func,
  productName:PropTypes.string
}

module.exports = Paginate;
