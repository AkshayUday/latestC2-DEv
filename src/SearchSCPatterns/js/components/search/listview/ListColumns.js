import React, {Component} from 'react';
import ListStyles from './ListViewStyles.css'
const ListColumns = (props) => { 
	
		let self= this;
 		let headerArr = [];
 		let columnProp = props.columns;
 		let sortImage = '';
 		for(let i=0;i<columnProp.length;i++){
 			// clicked item and not clicked item, condition determines ASC/DES
 			if(columnProp[i].sort){
	 			if(props.clickedItem === columnProp[i].property){
	 				if(props.columnsort){ 
	 				sortImage = <i className='fa fa-sort-asc' aria-hidden='true'></i>
	 				}else{
	 					sortImage = <i className='fa fa-sort-desc' aria-hidden='true'></i>
	 				} 
	 			}else{ 
	 				sortImage = <i className='fa fa-sort' aria-hidden='true'></i>
	 			}
 			}else{
 				sortImage = '';
 			}


 			headerArr.push(
	 		  <div className='column' onClick={props.onColumnSort.bind(self, columnProp[i].property)}>
			  {columnProp[i].display}<span className={ListStyles.spaceBetween}>{sortImage}
			  </span></div>
		  );
 		}
 		return(<div className={ListStyles.columnHeader}>
				{headerArr}
			</div>)
 }

ListColumns.propTypes = {
	columns : React.PropTypes.array,
	onColumnSort : React.PropTypes.func,
	columnsort: React.PropTypes.bool,
	clickedItem: React.PropTypes.string
}
export default ListColumns;
