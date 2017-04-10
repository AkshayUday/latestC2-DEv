import React, { Component, PropTypes } from 'react';
import styles from './styles/PL_PaginationStyles.css';


const Pagination = (props) => {
        return (
          <div className={styles.paginationContainer}>
          <ul className={styles.pagination}>
           <li className={props.pageNumber==1 ? styles.disabled : ''}>
                <a onClick={ (e) => {
                    e.preventDefault();{
                  if(props.pageNumber>1)
                    props.onChange(props.pageNumber-1);
                  }
                }} href='#'>
                   «
                </a>
            </li>
            <li className={styles.active}><a href='#'>{props.pageNumber}</a></li>
            <li className={props.lastPage ? styles.disabled : ''}><a onClick={ (e) => {
                    e.preventDefault();
                    if(!props.lastPage){
                      props.onChange(props.pageNumber+1);
                   }
                }} href='#'>
                    »
                </a></li>
          </ul>
          </div>
        )
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  pageNumber: PropTypes.number,
  lastPage: PropTypes.bool
}


export default Pagination;
