import React, {Component} from 'react';
import ListColumn from './ListColumns'
import ListRow from './ListRows'
import PL_Scroll from '../../../../../common/components/PL_ScrollBar'
import ListStyles from './ListViewStyles.css'
const ListView = (props) => {
	
		// let area = props.flag ? ListStyles.filterArea : ListStyles.area;
		return(
			<div className={ListStyles.listViewTable}>
				<ListColumn columns={props.columns}
				            onColumnSort={props.onColumnSort}
				            columnsort = {props.columnsort}
				            clickedItem = {props.clickedItem}/>
			<PL_Scroll classname={ListStyles.area}>
				<ListRow rows={props.rows} 
						 zibraRows={props.zibraRows}
						 radioHandler={props.radioHandler}/>
			</PL_Scroll>
			</div>
		)
	
	
}
ListView.propTypes = {
	flag : React.PropTypes.bool,
	columns: React.PropTypes.object,
	zibraRows: React.PropTypes.bool,
	rows:React.PropTypes.array,
	radioHandler: React.PropTypes.func,
	onColumnSort: React.PropTypes.func,
	columnsort: React.PropTypes.bool,
	clickedItem: React.PropTypes.string
}
export default ListView;
