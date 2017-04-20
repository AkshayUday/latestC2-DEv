import React, { Component, PropTypes } from 'react';
import PageDetail from '../../../common/components/PL_PageDetail'
import Pagination from '../../../common/components/PL_pagination'
import paginationStyles from './Styles/Pagination.css';
// import styles from './styles/PL_SiteDetailStyles.css';

const SearchPaging = (props) => {
      let pageDetailComp = '';
      let pageDetails = props.pageDetails;
      pageDetails.siteName = props.productName;
      if(pageDetails.totalRecords>0){
        pageDetailComp = (<PageDetail pageDetails = {pageDetails}/>);
      }
      let paginationComp = (<Pagination pageNumber={pageDetails.pageNo} lastPage={pageDetails.lastPage} onChange={props.handlePageChange}/>);
       
      if(pageDetails.pageNo==1 && pageDetails.totalRecords==0){
          paginationComp = '';
      } 

        return (
            <div className={paginationStyles.paginationContainer}>
              {pageDetailComp}
              {paginationComp}
           </div>
        )
}

SearchPaging.propTypes= {
    pageDetails: PropTypes.object,
    handlePageChange: PropTypes.func,
    productName: PropTypes.string
}

export default SearchPaging;
