import React, { Component, PropTypes } from 'react';
import styles from './styles/PL_PaginationStyles.css';


class Pagination extends Component {
    constructor(props, context) {
        super(props, context)
        
    }

    render(){
        return (
          <div className={styles.paginationContainer}>
          <ul className={styles.pagination}>
           <li className={this.props.pageNumber==1 ? styles.disabled : ''}>
                <a onClick={ (e) => {
                    e.preventDefault();{
                  if(this.props.pageNumber>1)
                    this.props.onChange(this.props.pageNumber-1);
                  }
                }} href='#'>
                   «
                </a>
            </li>
            <li className={styles.active}><a href='#'>{this.props.pageNumber}</a></li>
            <li className={this.props.lastPage ? styles.disabled : ''}><a onClick={ (e) => {
                    e.preventDefault();
                    if(!this.props.lastPage){
                      this.props.onChange(this.props.pageNumber+1);
                   }
                }} href='#'>
                    »
                </a></li>
          </ul>
          </div>
        )
    }
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  pageNumber: PropTypes.number,
  lastPage: PropTypes.bool
}


export default Pagination;
