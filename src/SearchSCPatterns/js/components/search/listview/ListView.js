import React, {Component} from 'react';
import ListColumn from './ListColumns'
import ListRow from './ListRows'
import PL_Scroll from '../../../../../common/components/PL_ScrollBar'
import ListStyles from './ListViewStyles.css'
class ListView extends Component{
	constructor(props){
		super(props);
	}
	render(){ 
		let area = this.props.flag ? ListStyles.filterArea : ListStyles.area;
		return(
			<div className='table'>
				<ListColumn columns={this.props.columns}
				            onColumnSort={this.props.onColumnSort}
				            columnsort = {this.props.columnsort}
				            clickedItem = {this.props.clickedItem}/>
			<PL_Scroll classname={area}>
				<ListRow rows={this.props.rows} 
						 zibraRows={this.props.zibraRows}
						 radioHandler={this.props.radioHandler}/>
			</PL_Scroll>
			</div>
		)
	}
	
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
