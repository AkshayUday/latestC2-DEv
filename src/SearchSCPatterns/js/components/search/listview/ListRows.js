import React, {Component} from 'react';
import ListStyles from './ListViewStyles.css'
import RadioBtn from '../../../../../common/components/Radio'

class ListRows extends Component{

	constructor(props){ 
		super(props);
		this.setSelectedItem = this.setSelectedItem.bind(this);
		this.state = { setSelectedItemId: ''};

	}
	setSelectedItem(selectedItem){ 

		this.props.radioHandler(selectedItem);
		this.setState({setSelectedItemId:selectedItem.id});

	}

    assetSelectedEvent(me, isTrue=true) {
	    if (isTrue) {
	      this.customFn(this.props.record);
	    }
	    else {
	      this.customFn({});
	    }
   }


	render(){
		let self = this;
		let isZibra = this.props.zibraRows ? ListStyles.zibrarows : ListStyles.noZibraRows;
		let rowContent = 'No Results Found';
		if(this.props.rows.length > 0){
			rowContent = this.props.rows.map(function (row){
            let checked = false;

		    if(self.state.setSelectedItemId == row.id && self.state.setSelectedItemId != ''){
              checked = true;
		    }



			return (
					<div className={ListStyles.rowContent}>

						<div className={ListStyles.rowTitleWrapper}>			
							<div className={ListStyles.rowRadioBtn}>
							<RadioBtn name='radiobtn' record={row} 
									  parent={self.assetSelectedEvent}
									  customFn={self.setSelectedItem} checked={checked}/>
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
	radioHandler: React.PropTypes.func,
	record : React.PropTypes.object
}
export default ListRows;
