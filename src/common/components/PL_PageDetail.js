import React, { Component, PropTypes } from 'react';

 import PaginStyles from './styles/PL_PagingDetail.css';


const PL_PageDetail = (props) => {
       let pageDetails = props.pageDetails;
       let Content = 'Showing '+(pageDetails.index+1)+'-'+(pageDetails.index+pageDetails.totalRecords);
       if(pageDetails.searchText){
        Content = Content+'results in product library: '+pageDetails.searchText;
       }
        return (
            <div className={PaginStyles.pagingText}>
              <span>{Content}</span> 
           </div>
        )
}

PL_PageDetail.propTypes= {
    pageDetails: PropTypes.object
}

export default PL_PageDetail;
