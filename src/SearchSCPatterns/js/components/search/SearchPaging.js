import React, { Component, PropTypes } from 'react';
import PageDetail from '../../../../common/components/PL_PageDetail'
import Pagination from '../../../../common/components/PL_pagination'
import SearchPagingStyles from './styles/SearchPaging.css';
// import styles from './styles/PL_SiteDetailStyles.css';

const SearchPaging = (props) => {
      let pageDetailComp = '';
      let pageDetails = props.pageDetails;
      pageDetails.index = (pageDetails.pageNo*pageDetails.pageLimit)-pageDetails.pageLimit;
      if(pageDetails.totalRecords>0){
        pageDetails.lastPage = false;
        pageDetailComp = (<PageDetail pageDetails = {pageDetails}/>);
      }
      let paginationComp = (<Pagination pageNumber={pageDetails.pageNo} lastPage={pageDetails.lastPage} onChange={props.handlePageChange}/>);
        return (
            <div className={SearchPagingStyles.pagingContainer}>
              {pageDetailComp}
              {paginationComp}
           </div>
        )
}

SearchPaging.propTypes= {
    pageDetails: PropTypes.object,
    handlePageChange: PropTypes.func
}

export default SearchPaging;
