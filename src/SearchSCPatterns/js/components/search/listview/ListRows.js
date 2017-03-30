import React, {Component} from 'react';
import ListStyles from './ListViewStyles.css'
import RadioBtn from '../../../../../common/components/Radio'

class ListRows extends Component{

	constructor(props){ 
		super(props);
		this.setSelectedItem = this.setSelectedItem.bind(this);
	}
	setSelectedItem(selectedItem){ 
		this.props.radioHandler(selectedItem);
	}

	render(){ 
		let self = this;
		let isZibra = this.props.zibraRows ? ListStyles.zibrarows : '';
		let rowContent = 'No Results Found';
		if(this.props.rows.length > 0){
			rowContent = this.props.rows.map(function (row){
			return (
					<div className={ListStyles.rowContent}>

						<div className={ListStyles.rowTitleWrapper}>			
							<div className={ListStyles.rowRadioBtn}>
							<RadioBtn name='radiobtn' record={row} 
									  parent={self.setSelectedItem.bind(this, row)}
									  customFn={self.setSelectedItem.bind(this,row)}/>
							</div>
							<div className='rowTitle'>
								{row.title}
							</div>
						</div>
						<div className='rowType'>{row.type}</div>
						<div className='rowDatemodified'>{row.dateModified}</div>
					</div>
				
					)
		});

		}
		

		return(<div className={isZibra}>
				{rowContent}
				</div>
			   )
	}
}

ListRows.propTypes = {
	rows: React.PropTypes.array,
	zibraRows: React.PropTypes.bool,
	radioHandler: React.PropTypes.func
}
export default ListRows;
